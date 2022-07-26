/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { captureError } from '../errors'
import { IS_BLINK, IS_WEBKIT, IS_GECKO, hashSlice } from '../utils/helpers'
import { modal } from '../utils/html'

// warm up while we detect lies
try {
	speechSynthesis.getVoices()
} catch (err) {}

// Collect lies detected
function createLieRecords() {
	const records: Record<string, string[]> = {}
	return {
		getRecords: () => records,
		documentLie: (name: string, lie: string | string[]) => {
			const isArray = lie instanceof Array
			if (records[name]) {
				if (isArray) {
					return (records[name] = [...records[name], ...lie])
				}
				return records[name].push(lie)
			}
			return isArray ? (records[name] = lie) : (records[name] = [lie])
		},
	}
}

const lieRecords = createLieRecords()
const { documentLie } = lieRecords

const GHOST = `
	height: 100vh;
	width: 100vw;
	position: absolute;
	left:-10000px;
	visibility: hidden;
`
function getRandomValues() {
	return (
		String.fromCharCode(Math.random() * 26 + 97) +
		Math.random().toString(36).slice(-7)
	)
}

function getBehemothIframe(win: Window): Window | null {
	try {
		if (!IS_BLINK) return win

		const div = win.document.createElement('div')
		div.setAttribute('id', getRandomValues())
		div.setAttribute('style', GHOST)
		div.innerHTML = `<div><iframe></iframe></div>`
		win.document.body.appendChild(div)
		const iframe = [...[...div.childNodes][0].childNodes][0] as HTMLIFrameElement

		if (!iframe) return null

		const { contentWindow } = iframe || {}
		if (!contentWindow) return null

		const div2 = contentWindow.document.createElement('div')
		div2.innerHTML = `<div><iframe></iframe></div>`
		contentWindow.document.body.appendChild(div2)
		const iframe2 = [...[...div2.childNodes][0].childNodes][0] as HTMLIFrameElement
		return iframe2.contentWindow
	} catch (error) {
		captureError(error, 'client blocked behemoth iframe')
		return win
	}
}

interface Phantom {
	iframeWindow: Window
	div?: HTMLDivElement | undefined
}
function getPhantomIframe(): Phantom {
	try {
		const numberOfIframes = window.length
		const frag = new DocumentFragment()
		const div = document.createElement('div')
		const id = getRandomValues()
		div.setAttribute('id', id)
		frag.appendChild(div)
		div.innerHTML = `<div style="${GHOST}"><iframe></iframe></div>`
		document.body.appendChild(frag)
		const iframeWindow = window[numberOfIframes]
		const phantomWindow = getBehemothIframe(iframeWindow)
		return { iframeWindow: phantomWindow || window, div }
	} catch (error) {
		captureError(error, 'client blocked phantom iframe')
		return { iframeWindow: window }
	}
}
const { iframeWindow: PHANTOM_DARKNESS, div: PARENT_PHANTOM } = getPhantomIframe() || {}

function getPrototypeLies(scope: Window & typeof globalThis) {
	const RAND = getRandomValues()
	const HAS_REFLECT = 'Reflect' in self

	const failsTypeError = (fn: Function, final?: Function): boolean => {
		try {
			fn()
			throw Error()
		} catch (err: any) {
			return err.constructor.name != 'TypeError'
		} finally {
			final && final()
		}
	}

	const failsWithError = (fn: Function): boolean => {
		try {
			fn()
			return false
		} catch (err: any) {
			return true
		}
	}

	const hasKnownToString = (name: string) => ({
		[`function ${name}() { [native code] }`]: true,
		[`function get ${name}() { [native code] }`]: true,
		[`function () { [native code] }`]: true,
		[`function ${name}() {${'\n'}    [native code]${'\n'}}`]: true,
		[`function get ${name}() {${'\n'}    [native code]${'\n'}}`]: true,
		[`function () {${'\n'}    [native code]${'\n'}}`]: true,
	})

	// calling toString() on an object created from the function should throw a TypeError
	const getNewObjectToStringTypeErrorLie = (apiFunction: Function): boolean => {
		try {
			const you = () => Object.create(apiFunction).toString()
			const cant = () => you()
			const hide = () => cant()
			hide()
			// error must throw
			return true
		} catch (err: any) {
			const stackLines = err.stack.split('\n')
			const validScope = !/at Object\.apply/.test(stackLines[1])
			// Stack must be valid
			const validStackSize = (
				err.constructor.name == 'TypeError' && stackLines.length >= 5
			)
			// Chromium must throw error 'at Function.toString'... and not 'at Object.apply'
			if (validStackSize && IS_BLINK && (
				!validScope ||
				!/at Function\.toString/.test(stackLines[1]) ||
				!/at you/.test(stackLines[2]) ||
				!/at cant/.test(stackLines[3]) ||
				!/at hide/.test(stackLines[4])
			)) {
				return true
			}
			return !validStackSize
		}
	}

	// checking proxy instanceof proxy should throw a valid TypeError
	const hasValidStack = (err: any, type = 'Function') => {
		const { message, name, stack } = err
		const validName = name == 'TypeError'
		const validMessage = message == `Function has non-object prototype 'undefined' in instanceof check`
		const targetStackLine = ((stack || '').split('\n') || [])[1]
		const validStackLine = (
			targetStackLine.startsWith(`    at ${type}.[Symbol.hasInstance]`) ||
			targetStackLine.startsWith('    at [Symbol.hasInstance]') // Chrome 102
		)
		return validName && validMessage && validStackLine
	}
	const getInstanceofCheckLie = (apiFunction: Function): boolean => {
		const proxy = new Proxy(apiFunction, {})
		if (!IS_BLINK) return false

		try {
			proxy instanceof proxy
			return true // failed to throw
		} catch (error) {
			// expect Proxy.[Symbol.hasInstance]
			if (!hasValidStack(error, 'Proxy')) {
				return true
			}
			try {
				apiFunction instanceof apiFunction
				return true // failed to throw
			} catch (error) {
				// expect Function.[Symbol.hasInstance]
				return !hasValidStack(error)
			}
		}
	}

	// API Function Test
	interface LiesConfig {
		apiFunction: Function
		proto: any
		obj: any
		lieProps: Record<string, string[]>
	}
	interface LieResult {
    lied: number
    lieTypes: string[]
	}
	const getLies = ({ apiFunction, proto, obj, lieProps }: LiesConfig): LieResult => {
		if (typeof apiFunction != 'function') {
			return {
				lied: 0,
				lieTypes: [],
			}
		}
		const name = apiFunction.name.replace(/get\s/, '')
		const objName = obj?.name
		const nativeProto = Object.getPrototypeOf(apiFunction)
		let lies: Record<string, boolean> = {
			// custom lie string names
			[`failed illegal error`]: !!obj && failsTypeError(() => obj.prototype[name]),
			[`failed undefined properties`]: (
				!!obj && /^(screen|navigator)$/i.test(objName) && !!(
					Object.getOwnPropertyDescriptor(self[objName.toLowerCase()], name) || (
						HAS_REFLECT &&
						Reflect.getOwnPropertyDescriptor(self[objName.toLowerCase()], name)
					)
				)
			),
			[`failed call interface error`]: failsTypeError(() => {
				// @ts-expect-error
				new apiFunction(); apiFunction.call(proto)
			}),
			[`failed apply interface error`]: failsTypeError(() => {
				// @ts-expect-error
				new apiFunction(); apiFunction.apply(proto)
			}),
			// @ts-expect-error
			[`failed new instance error`]: failsTypeError(() => new apiFunction()),
			[`failed class extends error`]: !IS_WEBKIT && failsTypeError(() => {
				// @ts-expect-error
				class Fake extends apiFunction { }
			}),
			[`failed null conversion error`]: failsTypeError(() => {
				Object.setPrototypeOf(apiFunction, null).toString()
			}, () => Object.setPrototypeOf(apiFunction, nativeProto)),
			[`failed toString`]: (
				!hasKnownToString(name)[scope.Function.prototype.toString.call(apiFunction)] ||
				!hasKnownToString('toString')[scope.Function.prototype.toString.call(apiFunction.toString)]
			),
			[`failed "prototype" in function`]: 'prototype' in apiFunction,
			[`failed descriptor`]: !!(
				Object.getOwnPropertyDescriptor(apiFunction, 'arguments') ||
				Reflect.getOwnPropertyDescriptor(apiFunction, 'arguments') ||
				Object.getOwnPropertyDescriptor(apiFunction, 'caller') ||
				Reflect.getOwnPropertyDescriptor(apiFunction, 'caller') ||
				Object.getOwnPropertyDescriptor(apiFunction, 'prototype') ||
				Reflect.getOwnPropertyDescriptor(apiFunction, 'prototype') ||
				Object.getOwnPropertyDescriptor(apiFunction, 'toString') ||
				Reflect.getOwnPropertyDescriptor(apiFunction, 'toString')
			),
			[`failed own property`]: !!(
				apiFunction.hasOwnProperty('arguments') ||
				apiFunction.hasOwnProperty('caller') ||
				apiFunction.hasOwnProperty('prototype') ||
				apiFunction.hasOwnProperty('toString')
			),
			[`failed descriptor keys`]: (
				Object.keys(Object.getOwnPropertyDescriptors(apiFunction)).sort().toString() != 'length,name'
			),
			[`failed own property names`]: (
				Object.getOwnPropertyNames(apiFunction).sort().toString() != 'length,name'
			),
			[`failed own keys names`]: HAS_REFLECT && (
				Reflect.ownKeys(apiFunction).sort().toString() != 'length,name'
			),
			[`failed object toString error`]: getNewObjectToStringTypeErrorLie(apiFunction),
			// Proxy Detection
			[`failed at incompatible proxy error`]: failsTypeError(() => {
				apiFunction.arguments; apiFunction.caller
			}),
			[`failed at toString incompatible proxy error`]: failsTypeError(() => {
				apiFunction.toString.arguments
				apiFunction.toString.caller
			}),
			[`failed at too much recursion error`]: failsTypeError(() => {
				Object.setPrototypeOf(apiFunction, Object.create(apiFunction)).toString()
			}, () => Object.setPrototypeOf(apiFunction, nativeProto)),
		}

		// conditionally increase difficulty
		const detectProxies = (
			name == 'toString' ||
			!!lieProps['Function.toString'] ||
			!!lieProps['Permissions.query']
		)
		if (detectProxies) {
			const proxy1 = new Proxy(apiFunction, {})
			const proxy2 = new Proxy(apiFunction, {})
			const proxy3 = new Proxy(apiFunction, {})

			lies = {
				...lies,
				// Advanced Proxy Detection
				[`failed at too much recursion __proto__ error`]: !failsTypeError(() => {
					// @ts-expect-error
					apiFunction.__proto__ = proxy
					// @ts-expect-error
					apiFunction++
				}, () => Object.setPrototypeOf(apiFunction, nativeProto)),
				[`failed at chain cycle error`]: !failsTypeError(() => {
					Object.setPrototypeOf(proxy1, Object.create(proxy1)).toString()
				}, () => Object.setPrototypeOf(proxy1, nativeProto)),
				[`failed at chain cycle __proto__ error`]: !failsTypeError(() => {
					// @ts-expect-error
					proxy2.__proto__ = proxy2
					// @ts-expect-error
					proxy2++
				}, () => Object.setPrototypeOf(proxy2, nativeProto)),
				[`failed at reflect set proto`]: HAS_REFLECT && !failsTypeError(() => {
					Reflect.setPrototypeOf(apiFunction, Object.create(apiFunction))
					RAND in apiFunction
				}, () => Object.setPrototypeOf(apiFunction, nativeProto)),
				[`failed at reflect set proto proxy`]: HAS_REFLECT && !failsTypeError(() => {
					Reflect.setPrototypeOf(proxy3, Object.create(proxy3))
					RAND in proxy3
				}, () => Object.setPrototypeOf(proxy3, nativeProto)),
				[`failed at instanceof check error`]: getInstanceofCheckLie(apiFunction),
				[`failed at define properties`]: IS_BLINK && HAS_REFLECT && failsWithError(() => {
					Object.defineProperty(apiFunction, '', { configurable: true }).toString()
					Reflect.deleteProperty(apiFunction, '')
				}),
			}
		}
		const lieTypes = Object.keys(lies).filter((key) => !!lies[key])
		return {
			lied: lieTypes.length,
			lieTypes,
		}
	}

	// Lie Detector
	interface SearchConfig {
			target?: string[] | undefined
			ignore?: string[] | undefined
	}
	const createLieDetector = () => {
		const isSupported = (obj: any) => typeof obj != 'undefined' && !!obj
		const props: Record<string, string[]> = {} // lie list and detail
		const propsSearched: string[] = [] // list of properties searched
		return {
			getProps: () => props,
			getPropsSearched: () => propsSearched,
			searchLies: (fn: Function, config?: SearchConfig): void => {
				const { target, ignore } = config || {}
				let obj: any
				// check if api is blocked or not supported
				try {
					obj = fn()
					if (!isSupported(obj)) {
						return
					}
				} catch (error) {
					return
				}

				const interfaceObject = !!obj.prototype ? obj.prototype : obj
				Object.getOwnPropertyNames(interfaceObject)
					;[...new Set([
						...Object.getOwnPropertyNames(interfaceObject),
						...Object.keys(interfaceObject), // backup
					])].sort().forEach((name) => {
						const skip = (
							name == 'constructor' ||
							(!new Set(target).has(name)) ||
							(new Set(ignore).has(name))
						)
						if (skip) {
							return
						}
						const objectNameString = /\s(.+)\]/
						const apiName = `${
							// @ts-ignore
							obj.name ? obj.name : objectNameString.test(obj) ? objectNameString.exec(obj)[1] : undefined
							}.${name}`
						propsSearched.push(apiName)
						try {
							const proto = obj.prototype ? obj.prototype : obj
							let res // response from getLies

							// search if function
							try {
								const apiFunction = proto[name] // may trigger TypeError
								if (typeof apiFunction == 'function') {
									res = getLies({
										apiFunction: proto[name],
										proto,
										obj: null,
										lieProps: props,
									})
									if (res.lied) {
										documentLie(apiName, res.lieTypes)
										return (props[apiName] = res.lieTypes)
									}
									return
								}
								// since there is no TypeError and the typeof is not a function,
								// handle invalid values and ignore name, length, and constants
								if (
									name != 'name' &&
									name != 'length' &&
									name[0] !== name[0].toUpperCase()) {
									const lie = [`failed descriptor.value undefined`]
									documentLie(apiName, lie)
									return (
										props[apiName] = lie
									)
								}
							} catch (error) { }
							// else search getter function
							// @ts-ignore
							const getterFunction = Object.getOwnPropertyDescriptor(proto, name).get!
							res = getLies({
								apiFunction: getterFunction,
								proto,
								obj,
								lieProps: props,
							}) // send the obj for special tests

							if (res.lied) {
								documentLie(apiName, res.lieTypes)
								return (props[apiName] = res.lieTypes)
							}
							return
						} catch (error) {
							const lie = `failed prototype test execution`
							documentLie(apiName, lie)
							return (
								props[apiName] = [lie]
							)
						}
					})
			},
		}
	}

	const lieDetector = createLieDetector()
	const {
		searchLies,
	} = lieDetector

	// search lies: remove target to search all properties
	// test Function.toString first to determine the depth of the search
	searchLies(() => Function, {
		target: [
			'toString',
		],
		ignore: [
			'caller',
			'arguments',
		],
	})
	// other APIs
	searchLies(() => AnalyserNode)
	searchLies(() => AudioBuffer, {
		target: [
			'copyFromChannel',
			'getChannelData',
		],
	})
	searchLies(() => BiquadFilterNode, {
		target: [
			'getFrequencyResponse',
		],
	})
	searchLies(() => CanvasRenderingContext2D, {
		target: [
			'getImageData',
			'getLineDash',
			'isPointInPath',
			'isPointInStroke',
			'measureText',
			'quadraticCurveTo',
			'fillText',
			'strokeText',
			'font',
		],
	})
	searchLies(() => CSSStyleDeclaration, {
		target: [
			'setProperty',
		],
	})
	// @ts-ignore
	searchLies(() => CSS2Properties, { // Gecko
		target: [
			'setProperty',
		],
	})
	searchLies(() => Date, {
		target: [
			'getDate',
			'getDay',
			'getFullYear',
			'getHours',
			'getMinutes',
			'getMonth',
			'getTime',
			'getTimezoneOffset',
			'setDate',
			'setFullYear',
			'setHours',
			'setMilliseconds',
			'setMonth',
			'setSeconds',
			'setTime',
			'toDateString',
			'toJSON',
			'toLocaleDateString',
			'toLocaleString',
			'toLocaleTimeString',
			'toString',
			'toTimeString',
			'valueOf',
		],
	})
	searchLies(() => Intl.DateTimeFormat, {
		target: [
			'format',
			'formatRange',
			'formatToParts',
			'resolvedOptions',
		],
	})
	searchLies(() => Document, {
		target: [
			'createElement',
			'createElementNS',
			'getElementById',
			'getElementsByClassName',
			'getElementsByName',
			'getElementsByTagName',
			'getElementsByTagNameNS',
			'referrer',
			'write',
			'writeln',
		],
		ignore: [
			// Firefox returns undefined on getIllegalTypeErrorLie test
			'onreadystatechange',
			'onmouseenter',
			'onmouseleave',
		],
	})
	searchLies(() => DOMRect)
	searchLies(() => DOMRectReadOnly)
	searchLies(() => Element, {
		target: [
			'append',
			'appendChild',
			'getBoundingClientRect',
			'getClientRects',
			'insertAdjacentElement',
			'insertAdjacentHTML',
			'insertAdjacentText',
			'insertBefore',
			'prepend',
			'replaceChild',
			'replaceWith',
			'setAttribute',
		],
	})
	searchLies(() => FontFace, {
		target: [
			'family',
			'load',
			'status',
		],
	})
	searchLies(() => HTMLCanvasElement)
	searchLies(() => HTMLElement, {
		target: [
			'clientHeight',
			'clientWidth',
			'offsetHeight',
			'offsetWidth',
			'scrollHeight',
			'scrollWidth',
		],
		ignore: [
			// Firefox returns undefined on getIllegalTypeErrorLie test
			'onmouseenter',
			'onmouseleave',
		],
	})
	searchLies(() => HTMLIFrameElement, {
		target: [
			'contentDocument',
			'contentWindow',
		],
	})
	searchLies(() => IntersectionObserverEntry, {
		target: [
			'boundingClientRect',
			'intersectionRect',
			'rootBounds',
		],
	})
	searchLies(() => Math, {
		target: [
			'acos',
			'acosh',
			'asinh',
			'atan',
			'atan2',
			'atanh',
			'cbrt',
			'cos',
			'cosh',
			'exp',
			'expm1',
			'log',
			'log10',
			'log1p',
			'sin',
			'sinh',
			'sqrt',
			'tan',
			'tanh',
		],
	})
	searchLies(() => MediaDevices, {
		target: [
			'enumerateDevices',
			'getDisplayMedia',
			'getUserMedia',
		],
	})
	searchLies(() => Navigator, {
		target: [
			'appCodeName',
			'appName',
			'appVersion',
			'buildID',
			'connection',
			'deviceMemory',
			'getBattery',
			'getGamepads',
			'getVRDisplays',
			'hardwareConcurrency',
			'language',
			'languages',
			'maxTouchPoints',
			'mimeTypes',
			'oscpu',
			'platform',
			'plugins',
			'product',
			'productSub',
			'sendBeacon',
			'serviceWorker',
			'userAgent',
			'vendor',
			'vendorSub',
		],
	})
	searchLies(() => Node, {
		target: [
			'appendChild',
			'insertBefore',
			'replaceChild',
		],
	})
	// @ts-ignore
	searchLies(() => OffscreenCanvas, {
		target: [
			'convertToBlob',
			'getContext',
		],
	})
	// @ts-ignore
	searchLies(() => OffscreenCanvasRenderingContext2D, {
		target: [
			'getImageData',
			'getLineDash',
			'isPointInPath',
			'isPointInStroke',
			'measureText',
			'quadraticCurveTo',
			'font',
		],
	})

	searchLies(() => Permissions, {
		target: [
			'query',
		],
	})

	searchLies(() => Range, {
		target: [
			'getBoundingClientRect',
			'getClientRects',
		],
	})
	// @ts-expect-error
	searchLies(() => Intl.RelativeTimeFormat, {
		target: [
			'resolvedOptions',
		],
	})
	searchLies(() => Screen)
	searchLies(() => speechSynthesis, {
		target: [
			'getVoices',
		],
	})
	searchLies(() => String, {
		target: [
			'fromCodePoint',
		],
	})
	searchLies(() => SVGRect)
	searchLies(() => TextMetrics)
	searchLies(() => WebGLRenderingContext, {
		target: [
			'bufferData',
			'getParameter',
			'readPixels',
		],
	})
	searchLies(() => WebGL2RenderingContext, {
		target: [
			'bufferData',
			'getParameter',
			'readPixels',
		],
	})

    /* potential targets:
    	RTCPeerConnection
    	Plugin
    	PluginArray
    	MimeType
    	MimeTypeArray
    	Worker
    	History
    */

	// return lies list and detail
	const props = lieDetector.getProps()
	const propsSearched = lieDetector.getPropsSearched()
	return {
		lieDetector,
		lieList: Object.keys(props).sort(),
		lieDetail: props,
		lieCount: Object.keys(props).reduce((acc, key) => acc + props[key].length, 0),
		propsSearched,
	}
}

// start program
const start = performance.now()
const {
	lieDetector,
	lieList,
	lieDetail,
	// lieCount,
	propsSearched,
} = getPrototypeLies(PHANTOM_DARKNESS as Window & typeof globalThis) // execute and destructure the list and detail

// disregard Function.prototype.toString lies when determining if the API can be trusted
const getNonFunctionToStringLies = (x: string[]) => !x ? x : x.filter((x) => !/object toString|toString incompatible proxy/.test(x)).length

const lieProps = (() => {
	const props = lieDetector.getProps()
	return Object.keys(props).reduce((acc, key) => {
		acc[key] = getNonFunctionToStringLies(props[key])
		return acc
	}, {} as Record<string, number>)
})()

const prototypeLies = JSON.parse(JSON.stringify(lieDetail))
const perf = performance.now() - start


console.log(`${propsSearched.length} API properties analyzed in ${(perf).toFixed(2)}ms (${lieList.length} corrupted)`)

const getPluginLies = (plugins: PluginArray, mimeTypes: MimeTypeArray) => {
	const lies = [] // collect lie types
	const pluginsOwnPropertyNames = Object.getOwnPropertyNames(plugins).filter((name) => isNaN(+name))
	const mimeTypesOwnPropertyNames = Object.getOwnPropertyNames(mimeTypes).filter((name) => isNaN(+name))

	// cast to array
	const pluginsList = [...plugins] as Plugin[]
	const mimeTypesList = [...mimeTypes] as MimeType[]

	// get initial trusted mimeType names
	const trustedMimeTypes = new Set(mimeTypesOwnPropertyNames)

	// get initial trusted plugin names
	const excludeDuplicates = (arr: any[]) => [...new Set(arr)]
	const mimeTypeEnabledPlugins = excludeDuplicates(
		mimeTypesList.map((mimeType) => mimeType.enabledPlugin),
	)
	const trustedPluginNames = new Set(pluginsOwnPropertyNames)
	const mimeTypeEnabledPluginsNames = mimeTypeEnabledPlugins.map((plugin) => plugin && plugin.name)
	const trustedPluginNamesArray = [...trustedPluginNames]
	trustedPluginNamesArray.forEach((name) => {
		const validName = new Set(mimeTypeEnabledPluginsNames).has(name)
		if (!validName) {
			trustedPluginNames.delete(name)
		}
	})

	// 3. Expect MimeType object in plugins
	const invalidPlugins = pluginsList.filter((plugin) => {
		try {
			const validMimeType = Object.getPrototypeOf(plugin[0]).constructor.name == 'MimeType'
			if (!validMimeType) {
				trustedPluginNames.delete(plugin.name)
			}
			return !validMimeType
		} catch (error) {
			trustedPluginNames.delete(plugin.name)
			return true // sign of tampering
		}
	})
	if (invalidPlugins.length) {
		lies.push('missing mimetype')
	}

	// 4. Expect valid MimeType(s) in plugin
	const pluginMimeTypes = pluginsList
		.map((plugin) => Object.values(plugin)).flat()
	const pluginMimeTypesNames = pluginMimeTypes.map((mimetype: MimeType) => mimetype.type)
	pluginMimeTypesNames.forEach((name) => {
		const validName = trustedMimeTypes.has(name)
		if (!validName) {
			trustedMimeTypes.delete(name)
		}
	})

	pluginsList.forEach((plugin) => {
		const pluginMimeTypes = Object.values(plugin).map((mimetype) => mimetype.type)
		return pluginMimeTypes.forEach((mimetype) => {
			if (!trustedMimeTypes.has(mimetype)) {
				lies.push('invalid mimetype')
				return trustedPluginNames.delete(plugin.name)
			}
			return
		})
	})

	return {
		validPlugins: pluginsList.filter((plugin) => trustedPluginNames.has(plugin.name)),
		validMimeTypes: mimeTypesList.filter((mimeType) => trustedMimeTypes.has(mimeType.type)),
		lies: [...new Set(lies)], // remove duplicates
	}
}

const getLies = () => {
	const records = lieRecords.getRecords()
	const totalLies = Object.keys(records).reduce((acc, key) => {
		acc += records[key].length
		return acc
	}, 0)
	return { data: records, totalLies }
}

interface LiesFingerprint {
	lies: {
		data: Record<string, string[]>,
		totalLies: number,
		$hash: string
	}
}
function liesHTML(fp: LiesFingerprint, pointsHTML: string): string {
	const { lies: { data, totalLies, $hash } } = fp
	return `
	<div class="${totalLies ? ' lies' : ''}">lies (${!totalLies ? '0' : '' + totalLies}): ${
		!totalLies ? 'none' : modal(
			'creep-lies',
			Object.keys(data).sort().map((key) => {
				const lies = data[key]
				return `
					<br>
					<div style="padding:5px">
						<strong>${key}</strong>:
						${lies.map((lie) => `<div>- ${lie}</div>`).join('')}
					</div>
					`
			}).join(''),
			hashSlice($hash),
		)
	}${pointsHTML}</div>`
}

export { documentLie, PHANTOM_DARKNESS, PARENT_PHANTOM, lieProps, prototypeLies, lieRecords, getLies, getPluginLies, liesHTML }
