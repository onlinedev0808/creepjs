export const getCanvas2d = imports => {
	
	const {
		require: {
			hashMini,
			captureError,
			lieProps,
			documentLie,
			phantomDarkness,
			dragonOfDeath,
			logTestResult
		}
	} = imports
	
	return new Promise(async resolve => {
		try {
			const start = performance.now()
			const dataLie = lieProps['HTMLCanvasElement.toDataURL']
			const contextLie = lieProps['HTMLCanvasElement.getContext']
			let lied = (dataLie || contextLie) || false
			const doc = phantomDarkness ? phantomDarkness.document : document
			const canvas = doc.createElement('canvas')
			const context = canvas.getContext('2d')
			const str = '!😃🙌🧠👩‍💻👟👧🏻👩🏻‍🦱👩🏻‍🦰👱🏻‍♀️👩🏻‍🦳👧🏼👧🏽👧🏾👧🏿🦄🐉🌊🍧🏄‍♀️🌠🔮♞'
			context.font = '14px Arial'
			context.fillText(str, 0, 50)
			context.fillStyle = 'rgba(100, 200, 99, 0.78)'
			context.fillRect(100, 30, 80, 50)
			const dataURI = canvas.toDataURL()
			if (dragonOfDeath) {
				const result1 = dragonOfDeath.document.createElement('canvas').toDataURL()
				const result2 = document.createElement('canvas').toDataURL()
				if (result1 != result2) {
					lied = true
					const iframeLie = `expected x in nested iframe and got y`
					documentLie(`HTMLCanvasElement.toDataURL`, iframeLie)
				}
			}
			const response = { dataURI, lied }
			logTestResult({ start, test: 'canvas 2d', passed: true })
			return resolve(response)
		}
		catch (error) {
			logTestResult({ test: 'canvas 2d', passed: false })
			captureError(error)
			return resolve()
		}
	})
}