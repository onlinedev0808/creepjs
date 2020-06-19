// detect and fingerprint Function API lies
const native = (x) => `function ${x}() { [native code] }`
function hasLiedStringAPI() {
	let lieTypes = []
	// detect attempts to rewrite Function.prototype.toString conversion APIs
	const { toString } = Function.prototype
	if (toString != native('toString')) {
		lieTypes.push({ fnToStr })
	}

	// The idea of checking new is inspired by https://adtechmadness.wordpress.com/2019/03/23/javascript-tampering-detection-and-stealth/
	try {
		const str_1 = new Function.prototype.toString
		const str_2 = new Function.prototype.toString()
		const str_3 = new Function.prototype.toString.toString
		const str_4 = new Function.prototype.toString.toString()
		lieTypes.push({
			str_1,
			str_2,
			str_3,
			str_4
		})
	} catch (error) {
		const nativeTypeError = 'TypeError: Function.prototype.toString is not a constructor'
		if ('' + error != nativeTypeError) {
			lieTypes.push({ newErr: '' + error })
		}
	}

	return () => lieTypes
}
const stringAPILieTypes = hasLiedStringAPI() // compute and cache result
function hasLiedAPI(api, name) {
	let lieTypes = [...stringAPILieTypes()]
	let fingerprint = ''

	// detect attempts to rename the API and/or rewrite toString
	const { toString: fnToStr } = Function.prototype
	const { name: apiName, toString: apiToString } = api
	if (apiName != name) {
		lieTypes.push({ apiName })
	}
	if (apiToString !== fnToStr || apiToString.toString !== fnToStr) {
		lieTypes.push({ apiToString })
	}

	// collect string conversion result
	const result = '' + api

	// fingerprint result if it does not match native code
	if (result != native(name)) {
		fingerprint = result
	}
	
	return {
		lie: lieTypes.length || fingerprint ? { lieTypes, fingerprint } : false, 
	}
}