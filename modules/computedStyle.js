const computeStyle = (type, { require: [ hashify, captureError ] }) => {
	return new Promise(async resolve => {
		try {
			// get CSSStyleDeclaration
			const cssStyleDeclaration = (
				type == 'getComputedStyle' ? getComputedStyle(document.body) :
				type == 'HTMLElement.style' ? document.body.style :
				type == 'CSSRuleList.style' ? document.styleSheets[0].cssRules[0].style :
				undefined
			)
			if (!cssStyleDeclaration) {
				throw new TypeError('invalid argument string')
			}
			// get properties
			const prototype = Object.getPrototypeOf(cssStyleDeclaration)
			const prototypeProperties = Object.getOwnPropertyNames(prototype)
			const ownEnumerablePropertyNames = []
			const cssVar = /^--.*$/
			Object.keys(cssStyleDeclaration).forEach(key => {
				const numericKey = !isNaN(key)
				const value = cssStyleDeclaration[key]
				const customPropKey = cssVar.test(key)
				const customPropValue = cssVar.test(value)
				if (numericKey && !customPropValue) {
					return ownEnumerablePropertyNames.push(value)
				} else if (!numericKey && !customPropKey) {
					return ownEnumerablePropertyNames.push(key)
				}
				return
			})
			// get properties in prototype chain (required only in chrome)
			const propertiesInPrototypeChain = {}
			const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
			const uncapitalize = str => str.charAt(0).toLowerCase() + str.slice(1)
			const removeFirstChar = str => str.slice(1)
			const caps = /[A-Z]/g
			ownEnumerablePropertyNames.forEach(key => {
				if (propertiesInPrototypeChain[key]) {
					return
				}
				// determine attribute type
				const isNamedAttribute = key.indexOf('-') > -1
				const isAliasAttribute = caps.test(key)
				// reduce key for computation
				const firstChar = key.charAt(0)
				const isPrefixedName = isNamedAttribute && firstChar == '-'
				const isCapitalizedAlias = isAliasAttribute && firstChar == firstChar.toUpperCase()
				key = (
					isPrefixedName ? removeFirstChar(key) :
					isCapitalizedAlias ? uncapitalize(key) :
					key
				)
				// find counterpart in CSSStyleDeclaration object or its prototype chain
				if (isNamedAttribute) {
					const aliasAttribute = key.split('-').map((word, index) => index == 0 ? word : capitalize(word)).join('')
					if (aliasAttribute in cssStyleDeclaration) {
						propertiesInPrototypeChain[aliasAttribute] = true
					} else if (capitalize(aliasAttribute) in cssStyleDeclaration) {
						propertiesInPrototypeChain[capitalize(aliasAttribute)] = true
					}
				} else if (isAliasAttribute) {
					const namedAttribute = key.replace(caps, char => '-' + char.toLowerCase())
					if (namedAttribute in cssStyleDeclaration) {
						propertiesInPrototypeChain[namedAttribute] = true
					} else if (`-${namedAttribute}` in cssStyleDeclaration) {
						propertiesInPrototypeChain[`-${namedAttribute}`] = true
					}
				}
				return
			})
			// compile keys
			const keys = [
				...new Set([
					...prototypeProperties,
					...ownEnumerablePropertyNames,
					...Object.keys(propertiesInPrototypeChain)
				])
			]
			// checks
			const moz = keys.filter(key => (/moz/i).test(key)).length
			const webkit = keys.filter(key => (/webkit/i).test(key)).length
			const apple = keys.filter(key => (/apple/i).test(key)).length
			const prototypeName = (''+prototype).match(/\[object (.+)\]/)[1]
		
			const data = { keys: keys.sort(), moz, webkit, apple, prototypeName }
			const $hash = await hashify(data)
			return resolve({ ...data, $hash })
		}
		catch (error) {
			captureError(error)
			return resolve(undefined)
		}
	})
}

const getSystemStyles = (instanceId, { require: [ hashify, captureError ] }) => {
	return new Promise(async resolve => {
		try {
			const colors = [
				'ActiveBorder',
				'ActiveCaption',
				'ActiveText',
				'AppWorkspace',
				'Background',
				'ButtonBorder',
				'ButtonFace',
				'ButtonHighlight',
				'ButtonShadow',
				'ButtonText',
				'Canvas',
				'CanvasText',
				'CaptionText',
				'Field',
				'FieldText',
				'GrayText',
				'Highlight',
				'HighlightText',
				'InactiveBorder',
				'InactiveCaption',
				'InactiveCaptionText',
				'InfoBackground',
				'InfoText',
				'LinkText',
				'Mark',
				'MarkText',
				'Menu',
				'MenuText',
				'Scrollbar',
				'ThreeDDarkShadow',
				'ThreeDFace',
				'ThreeDHighlight',
				'ThreeDLightShadow',
				'ThreeDShadow',
				'VisitedText',
				'Window',
				'WindowFrame',
				'WindowText'
			]
			const fonts = [
				'caption',
				'icon',
				'menu',
				'message-box',
				'small-caption',
				'status-bar'
			]
			const id = 'creep-system-styles'
			const el = document.createElement('div')
			el.setAttribute('id', id)
			document.body.append(el)
			const rendered = document.getElementById(id)
			const system = {
				colors: [],
				fonts: []
			}
			system.colors = colors.map(color => {
				rendered.setAttribute('style', `background-color: ${color} !important`)
				return {
					[color]: getComputedStyle(rendered).backgroundColor
				}
			})
			fonts.forEach(font => {
				rendered.setAttribute('style', `font: ${font} !important`)
				system.fonts.push({
					[font]: getComputedStyle(rendered).font
				})
			})
			rendered.parentNode.removeChild(rendered)
			const $hash = await hashify(system)
			return resolve({...system, $hash})
		}
		catch (error) {
			captureError(error)
			return resolve(undefined)
		}
	})
}

export const getCSSStyleDeclarationVersion = imports => {

	const {
		require: {
			instanceId,
			hashMini,
			hashify,
			patch,
			html,
			note,
			modal,
			decryptKnown,
			captureError
		}
	} = imports

	return new Promise(async resolve => {
		try {
			const [
				computedStyle,
				htmlElementStyle,
				cssRuleListstyle,
				system
			] = await Promise.all([
				computeStyle('getComputedStyle', { require: [ hashify, captureError ] }),
				computeStyle('HTMLElement.style', { require: [ hashify, captureError ] }),
				computeStyle('CSSRuleList.style', { require: [ hashify, captureError ] }),
				getSystemStyles(instanceId, { require: [ hashify, captureError ] })
			]).catch(error => {
				console.error(error.message)
			})
			
			const data = {
				['getComputedStyle']: computedStyle,
				['HTMLElement.style']: htmlElementStyle,
				['CSSRuleList.style']: cssRuleListstyle,
				system,
				matching: (
					''+computedStyle.keys == ''+htmlElementStyle.keys &&
					''+htmlElementStyle.keys == ''+cssRuleListstyle.keys
				)
			}
			const $hash = await hashify(data)
			resolve({ ...data, $hash })
			const id = 'creep-css-style-declaration-version'
			const el = document.getElementById(id)
			const { prototypeName } = htmlElementStyle
			return patch(el, html`
			<div>
				<strong>Computed Style</strong><span class="hash">${hashMini($hash)}</span>
				<div>system: ${decryptKnown(system.$hash)}</div>
				<div>engine: ${
					prototypeName == 'CSS2Properties' ? 'Gecko' :
					prototypeName == 'CSS2PropertiesPrototype' ? 'Gecko (like Goanna)' :
					prototypeName == 'MSCSSPropertiesPrototype' ? 'Trident' :
					prototypeName == 'CSSStyleDeclaration' ? 'Blink' :
					prototypeName == 'CSSStyleDeclarationPrototype' ? 'Webkit' :
					'unknown'
				}</div>
				<div>browser: ${decryptKnown(computedStyle.$hash)}</div>
				<div>prototype: ${prototypeName}</div>
				${
					Object.keys(data).map(key => {
						const value = data[key]
						return (
							key != 'matching' && key != 'system' ?
							`<div>${key}:${
								value ? `<span class="sub-hash">${hashMini(value.$hash)}</span>` : ` ${note.blocked}`
							}</div>` : 
							''
						)
					}).join('')
				}
				<div>keys: ${computedStyle.keys.length}, ${htmlElementStyle.keys.length}, ${cssRuleListstyle.keys.length}
				</div>
				<div>moz: ${''+computedStyle.moz}, ${''+htmlElementStyle.moz}, ${''+cssRuleListstyle.moz}
				</div>
				<div>webkit: ${''+computedStyle.webkit}, ${''+htmlElementStyle.webkit}, ${''+cssRuleListstyle.webkit}
				</div>
				<div>apple: ${''+computedStyle.apple}, ${''+htmlElementStyle.apple}, ${''+cssRuleListstyle.apple}
				</div>
				<div>matching: ${''+data.matching}</div>
				<div>system styles:<span class="sub-hash">${hashMini(system.$hash)}</span></div>
				<div>system styles rendered: ${
					system && system.colors ? modal(
						`${id}-system-styles`,
						[
							...system.colors.map(color => {
								const key = Object.keys(color)[0]
								const val = color[key]
								return `
									<div><span style="display:inline-block;border:1px solid #eee;border-radius:3px;width:12px;height:12px;background:${val}"></span> ${key}: ${val}</div>
								`
							}),
							...system.fonts.map(font => {
								const key = Object.keys(font)[0]
								const val = font[key]
								return `
									<div>${key}: <span style="border:1px solid #eee;background:#f9f9f9;padding:0 5px;border-radius:3px;font:${val}">${val}</span></div>
								`
							}),
						].join('')
					) : note.blocked
				}</div>
			</div>
			`)
		}
		catch (error) {
			captureError(error)
			return resolve(undefined)
		}
	})
}