export const getCanvas2d = imports => {
	
	const {
		require: {
			hashMini,
			hashify,
			patch,
			html,
			note,
			captureError,
			lieProps
		}
	} = imports
	
	return new Promise(async resolve => {
		try {
			const dataLie = lieProps['HTMLCanvasElement.toDataURL']
			const contextLie = lieProps['HTMLCanvasElement.getContext']
			let lied = dataLie || contextLie
			const patchDom = (lied, response) => {
				const { $hash } = response
				const el = document.getElementById('creep-canvas-2d')
				return patch(el, html`
				<div class="col-six">
					<strong>Canvas 2d</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				</div>
				`)
			}
			const canvas = document.createElement('canvas')
			let canvas2dDataURI = ''
			const context = canvas.getContext('2d')
			const str = '!😃🙌🧠👩‍💻👟👧🏻👩🏻‍🦱👩🏻‍🦰👱🏻‍♀️👩🏻‍🦳👧🏼👧🏽👧🏾👧🏿🦄🐉🌊🍧🏄‍♀️🌠🔮♞'
			context.font = '14px Arial'
			context.fillText(str, 0, 50)
			context.fillStyle = 'rgba(100, 200, 99, 0.78)'
			context.fillRect(100, 30, 80, 50)
			canvas2dDataURI = canvas.toDataURL()
			const dataURI = canvas2dDataURI
			const $hash = await hashify(dataURI)
			const response = { dataURI, lied, $hash }
			resolve(response)
			return patchDom(lied, response)
		}
		catch (error) {
			captureError(error)
			return resolve(undefined)
		}
	})
}