// https://stackoverflow.com/a/22429679
const hashMini =  x => {
	const json = `${JSON.stringify(x)}`
	const hash = json.split('').reduce((hash, char, i) => {
		return Math.imul(31, hash) + json.charCodeAt(i) | 0
	}, 0x811c9dc5)
	return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
}

// instance id
const instanceId = hashMini(crypto.getRandomValues(new Uint32Array(10)))

// https://stackoverflow.com/a/53490958
// https://stackoverflow.com/a/43383990
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
const hashify = (x, algorithm = 'SHA-256') => {
	const json = `${JSON.stringify(x)}`
	const jsonBuffer = new TextEncoder().encode(json)
	return crypto.subtle.digest(algorithm, jsonBuffer).then(hashBuffer => {
		const hashArray = Array.from(new Uint8Array(hashBuffer))
		const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')
		return hashHex
	})
}


const getBotHash = (fp, imports) => {

	const { getFeaturesLie, computeWindowsRelease } = imports
	const outsideFeaturesVersion = getFeaturesLie(fp)
	const workerScopeIsBlocked = !fp.workerScope || !fp.workerScope.userAgent
	const liedWorkerScope = !!(fp.workerScope && fp.workerScope.lied)
	let liedPlatformVersion = false
	if (fp.workerScope && fp.fonts) {
		const { platformVersion, platform } = fp.workerScope.userAgentData || {}
		const { platformVersion: fontPlatformVersion } = fp.fonts || {}
		const windowsRelease = computeWindowsRelease({
			platform,
			platformVersion,
			fontPlatformVersion
		})
		liedPlatformVersion = (
			windowsRelease &&
			fp.fonts.platformVersion &&
			!(''+windowsRelease).includes(fontPlatformVersion)
		)
	}

	const { totalLies } = fp.lies || {}
	const maxLieCount = 100
	const extremeLieCount = (totalLies || 0) > maxLieCount

	const { stealth } = fp.headless || {}
	const functionToStringHasProxy = (
		!!( stealth || {})['Function.prototype.toString has invalid TypeError'] ||
		!!( stealth || {})['Function.prototype.toString leaks Proxy behavior']
	)

	// Pattern conditions that warrant rejection
	const botPatterns = {
		// custom order is important
		liedWorkerScope, // lws
		liedPlatformVersion, // lpv
		functionToStringHasProxy, // ftp
		outsideFeaturesVersion, // ofv
		extremeLieCount, // elc
		excessiveLooseFingerprints: false, // elf (compute on server)
		workerScopeIsBlocked, // wsb
		crowdBlendingScoreIsLow: false, // csl
	}

	const botHash = Object.keys(botPatterns)
		.map(key => botPatterns[key] ? '1' : '0').join('')
	return { botHash, badBot: Object.keys(botPatterns).find(key => botPatterns[key]) }
}

const getFuzzyHash = async fp => {
	// requires update log (below) when adding new keys to fp
	const metricKeys = [
		'canvas2d.blob',
		'canvas2d.blobOffscreen',
		'canvas2d.dataURI',
		'canvas2d.emojiSet',
		'canvas2d.imageData',
		'canvas2d.liedTextMetrics',
		'canvas2d.mods',
		'canvas2d.points',
		'canvas2d.textMetricsSystemSum',
		'canvasWebgl.dataURI',
		'canvasWebgl.dataURI2',
		'canvasWebgl.extensions',
		'canvasWebgl.gpu',
		'canvasWebgl.parameterOrExtensionLie',
		'canvasWebgl.parameters',
		'canvasWebgl.pixels',
		'canvasWebgl.pixels2',
		'capturedErrors.data',
		'clientRects.elementBoundingClientRect',
		'clientRects.elementClientRects',
		'clientRects.emojiFonts',
		'clientRects.emojiSet',
		'clientRects.rangeBoundingClientRect',
		'clientRects.rangeClientRects',
		'consoleErrors.errors',
		'css.computedStyle',
		'css.system',
		'cssMedia.importCSS',
		'cssMedia.matchMediaCSS',
		'cssMedia.mediaCSS',
		'cssMedia.screenQuery',
		'features.cssFeatures',
		'features.cssVersion',
		'features.jsFeatures',
		'features.jsFeaturesKeys',
		'features.jsVersion',
		'features.version',
		'features.versionRange',
		'features.windowFeatures',
		'features.windowVersion',
		'fonts.apps',
		'fonts.emojiSet',
		'fonts.fontFaceLoadFonts',
		'fonts.originFonts',
		'fonts.pixelFonts',
		'fonts.platformVersion',
		'headless.chromium',
		'headless.headless',
		'headless.headlessRating',
		'headless.likeHeadless',
		'headless.likeHeadlessRating',
		'headless.stealth',
		'headless.stealthRating',
		'htmlElementVersion.keys',
		'intl.dateTimeFormat',
		'intl.displayNames',
		'intl.listFormat',
		'intl.locale',
		'intl.numberFormat',
		'intl.pluralRules',
		'intl.relativeTimeFormat',
		'lies.data',
		'lies.totalLies',
		'maths.data',
		'media.mediaDevices',
		'media.mimeTypes',
		'navigator.appVersion',
		'navigator.bluetoothAvailability',
		'navigator.device',
		'navigator.deviceMemory',
		'navigator.doNotTrack',
		'navigator.globalPrivacyControl',
		'navigator.hardwareConcurrency',
		'navigator.keyboard',
		'navigator.language',
		'navigator.maxTouchPoints',
		'navigator.mediaCapabilities',
		'navigator.mimeTypes',
		'navigator.oscpu',
		'navigator.permissions',
		'navigator.platform',
		'navigator.plugins',
		'navigator.properties',
		'navigator.system',
		'navigator.uaPostReduction',
		'navigator.userAgent',
		'navigator.userAgentData',
		'navigator.userAgentParsed',
		'navigator.vendor',
		'navigator.webgpu',
		'offlineAudioContext.binsSample',
		'offlineAudioContext.compressorGainReduction',
		'offlineAudioContext.copySample',
		'offlineAudioContext.floatFrequencyDataSum',
		'offlineAudioContext.floatTimeDomainDataSum',
		'offlineAudioContext.noise',
		'offlineAudioContext.sampleSum',
		'offlineAudioContext.totalUniqueSamples',
		'offlineAudioContext.values',
		'resistance.engine',
		'resistance.extension',
		'resistance.extensionHashPattern',
		'resistance.mode',
		'resistance.privacy',
		'resistance.security',
		'screen.availHeight',
		'screen.availWidth',
		'screen.colorDepth',
		'screen.device',
		'screen.height',
		'screen.outerHeight',
		'screen.outerWidth',
		'screen.pixelDepth',
		'screen.width',
		'svg.bBox',
		'svg.computedTextLength',
		'svg.emojiFonts',
		'svg.emojiSet',
		'svg.extentOfChar',
		'svg.subStringLength',
		'timezone.location',
		'timezone.locationEpoch',
		'timezone.locationMeasured',
		'timezone.offset',
		'timezone.offsetComputed',
		'timezone.zone',
		'trash.trashBin',
		'voices.defaults',
		'voices.languages',
		'voices.local',
		'voices.remote',
		'webRTC.audio',
		'webRTC.extensions',
		'webRTC.ipaddress',
		'webRTC.video',
		'windowFeatures.apple',
		'windowFeatures.keys',
		'windowFeatures.moz',
		'windowFeatures.webkit',
		'workerScope.canvas2d',
		'workerScope.device',
		'workerScope.deviceMemory',
		'workerScope.engineCurrencyLocale',
		'workerScope.fontFaceSetFonts',
		'workerScope.fontListLen',
		'workerScope.fontSystemClass',
		'workerScope.gpu',
		'workerScope.hardwareConcurrency',
		'workerScope.language',
		'workerScope.languages',
		'workerScope.lies',
		'workerScope.locale',
		'workerScope.localeEntropyIsTrusty',
		'workerScope.localeIntlEntropyIsTrusty',
		'workerScope.mediaCapabilities',
		'workerScope.permissions',
		'workerScope.platform',
		'workerScope.scope',
		'workerScope.scopeKeys',
		'workerScope.system',
		'workerScope.systemCurrencyLocale',
		'workerScope.textMetrics',
		'workerScope.textMetricsSystemClass',
		'workerScope.textMetricsSystemSum',
		'workerScope.timezoneLocation',
		'workerScope.timezoneOffset',
		'workerScope.type',
		'workerScope.userAgent',
		'workerScope.userAgentData',
		'workerScope.userAgentDataVersion',
		'workerScope.userAgentEngine',
		'workerScope.userAgentVersion',
		'workerScope.webglRenderer',
		'workerScope.webglVendor',
	]
	// construct map of all metrics
	const metricsAll = Object.keys(fp).sort().reduce((acc, sectionKey) => {
		const section = fp[sectionKey]
		const sectionMetrics = Object.keys(section || {}).sort().reduce((acc, key) => {
			if (key == '$hash' || key == 'lied') {
				return acc
			}
			return {...acc, [`${sectionKey}.${key}`]: section[key] }
		}, {})
		return {...acc, ...sectionMetrics}
	}, {})

	// reduce to 64 bins
	const maxBins = 64
	const metricKeysReported = Object.keys(metricsAll)
	const binSize = Math.ceil(metricKeys.length/maxBins)
	
	// update log
	if (''+metricKeysReported != ''+metricKeys) {
		const newKeys = metricKeysReported.filter(key => !metricKeys.includes(key))
		console.warn('fuzzy key(s) missing:\n', newKeys.join('\n'))
	}
	//console.log(metricKeysReported.length) // 172
	//console.log(metricKeysReported.map(x => `'${x}',`).join('\n'))

	// compute fuzzy fingerprint master
	const fuzzyFpMaster = metricKeys.reduce((acc, key, index) => {
		if (!index || ((index % binSize) == 0)) {
			const keySet = metricKeys.slice(index, index + binSize)
			return {...acc, [''+keySet]: keySet.map(key => metricsAll[key]) }
		}
		return acc
	}, {})

	// hash each bin
	await Promise.all(
		Object.keys(fuzzyFpMaster).map(key => hashify(fuzzyFpMaster[key]).then(hash => {
			fuzzyFpMaster[key] = hash // swap values for hash
			return hash
		}))
	)

	// create fuzzy hash
	const fuzzyBits = 64
	const fuzzyFingerprint = Object.keys(fuzzyFpMaster)
		.map(key => fuzzyFpMaster[key][0])
		.join('')
		.padEnd(fuzzyBits, '0')

	return fuzzyFingerprint
}

export { hashMini, instanceId, hashify, getBotHash, getFuzzyHash }