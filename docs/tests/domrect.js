(async () => {

const hashMini = str => {
	const json = `${JSON.stringify(str)}`
	let i, len, hash = 0x811c9dc5
	for (i = 0, len = json.length; i < len; i++) {
		hash = Math.imul(31, hash) + json.charCodeAt(i) | 0
	}
	return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
}

// ie11 fix for template.content
function templateContent(template) {
	// template {display: none !important} /* add css if template is in dom */
	if ('content' in document.createElement('template')) {
		return document.importNode(template.content, true)
	} else {
		const frag = document.createDocumentFragment()
		const children = template.childNodes
		for (let i = 0, len = children.length; i < len; i++) {
			frag.appendChild(children[i].cloneNode(true))
		}
		return frag
	}
}

// tagged template literal (JSX alternative)
const patch = (oldEl, newEl, fn = null) => {
	oldEl.parentNode.replaceChild(newEl, oldEl)
	return typeof fn === 'function' ? fn() : true
}
const html = (stringSet, ...expressionSet) => {
	const template = document.createElement('template')
	template.innerHTML = stringSet.map((str, i) => `${str}${expressionSet[i] || ''}`).join('')
	return templateContent(template) // ie11 fix for template.content
}

const start = performance.now()
const el = document.getElementById('fingerprint-data')
patch(el, html`
<div id="rect-test">
	<style>
	#rect1 {
		width: 10px;
		height: 10px;
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(45deg);
		background: #9165ca87;
	}
	#rect1.shift {
		margin-left: 1px;
	}
	#rect1.matrix {
		transform: matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
	}
	/*
	width: 1000%;
	height: 1000%;
	max-width: 1000%;
	padding: 3.98px;
	transform: skewY(23.1753218deg) rotate3d(10.00099, 90, 0.100000000000009, 60000000000008.00000009deg);
	border: solid 2.89px;
	transform: skewY(-23.1753218deg) scale(1099.0000000099, 1.89) matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
	transform: matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
	padding: 4.4545px;
	margin-left: 42.395pt;
	transform: perspective(12890px) translateZ(101.5px);
	margin-top: -150.552px;
	margin-top: -110.552px;
	margin-left: 15.0000009099rem;
	*/
	</style>
	<div id="rect1"></div>
</div>
`)

const rectElem = document.getElementById('rect1')
const rect = rectElem.getClientRects()[0]
const { x, y, top, bottom, right, left, height, width } = rect
rectElem.classList.add('shift')
rectElem.classList.remove('shift')
const {
	x: unShiftX,
	y: unShiftY,
	top: unShiftTop,
	bottom: unShiftBottom,
	right: unShiftRight,
	left: unShiftLeft,
	height: unShiftHeight,
	width: unShiftWidth
} = document.getElementById('rect1').getClientRects()[0]
rectElem.classList.add('matrix')
const {
	x: matrixX,
	y: matrixY,
	top: matrixTop,
	bottom: matrixBottom,
	right: matrixRight,
	left: matrixLeft,
	height: matrixHeight,
	width: matrixWidth
} = document.getElementById('rect1').getClientRects()[0]

const valid = {
	matrix: (
		(matrixRight - matrixLeft) == matrixWidth && (matrixRight - matrixX) == matrixWidth &&
		(matrixBottom - matrixTop) == matrixHeight && (matrixBottom - matrixY) == matrixHeight
	),
	dimensions: (
		x == y && x == top && x == left &&
		bottom == right && height == width
	),
	unshift: (
		unShiftX == x &&
		unShiftY == y &&
		unShiftTop == top &&
		unShiftBottom == bottom &&
		unShiftRight == right &&
		unShiftLeft == left &&
		unShiftHeight == height &&
		unShiftWidth == width
	)
}

const lieLen = Object.keys(valid).filter(key => !valid[key]).length
const score = (100/(1+lieLen)).toFixed(0)
const lieHash = hashMini(valid)
const rectHash = hashMini({ x, y, top, bottom, right, left, height, width })

const perf = performance.now() - start 

const styleResult = valid => valid ? `<span class="pass">&#10004;</span>` : `<span class="fail">&#10006;</span>`
const rectEl = document.getElementById('rect-test')
patch(rectEl, html`
	<div id="fingerprint-data">
		<style>
		#fingerprint-data > .visitor-info > .jumbo {
			font-size: 32px !important;
		}
		.pass, .fail {
			margin: 0 10px 0 0;
			padding: 1px 5px;
			border-radius: 3px;
		}
		.pass {
			color: #2da568;
			background: #2da5681a;
		}
		.fail {
			color: #ca656e;
			background: #ca656e0d;
		}
		.rect {
			margin-left: 10px;
			display: inline-block;
			width: 10px;
			height: 10px;
			top:0;
			left:0;
			background: #9165ca87;
			transform: rotate(45deg);
		}
		</style>
		<div class="visitor-info">
			<span class="aside-note">${perf.toFixed(2)}ms</span>
			<strong>DOMRect</strong><span class="rect"></span>
			<div>score: <span class="${score == 100 ? 'pass' : 'fail'}">${score}%</span></div>
		</div>
		<div class="results">
			<div>rect: ${rectHash}</div>
			<div>lie pattern: <span class="${!lieLen ? 'pass' : 'fail'}">${lieLen ? lieHash : 'none'}</span></div>
			<div>${styleResult(valid.unshift)}valid unshift</div>
			<div>${styleResult(valid.dimensions)}valid dimensions</div>
			<div>${styleResult(valid.matrix)}valid matrix coordinates</div>
			<div>${'x'.padStart(10,'.')}: ${''+x}</div>
			<div>${'y'.padStart(10,'.')}: ${''+y}</div>
			<div>${'top'.padStart(10,'.')}: ${''+top}</div>
			<div>${'left'.padStart(10,'.')}: ${''+left}</div>
			<div>${'bottom'.padStart(10,'.')}: ${''+bottom}</div>
			<div>${'right'.padStart(10,'.')}: ${''+right}</div>
			<div>${'height'.padStart(10,'.')}: ${''+height}</div>
			<div>${'width'.padStart(10,'.')}: ${''+width}</div>
		</div>
	</div>
`)

})()