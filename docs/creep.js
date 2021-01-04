(function () {
	'use strict';

	// Detect Browser
	const isChrome = 'chrome' in window;
	const isBrave = 'brave' in navigator;
	const isFirefox = typeof InstallTrigger !== 'undefined';

	// system
	const getOS = userAgent => {
		const os = (
			// order is important
			/windows phone/ig.test(userAgent) ? 'Windows Phone' :
			/win(dows|16|32|64|95|98|nt)|wow64/ig.test(userAgent) ? 'Windows' :
			/android/ig.test(userAgent) ? 'Android' :
			/cros/ig.test(userAgent) ? 'Chrome OS' :
			/linux/ig.test(userAgent) ? 'Linux' :
			/ipad/ig.test(userAgent) ? 'iPad' :
			/iphone/ig.test(userAgent) ? 'iPhone' :
			/ipod/ig.test(userAgent) ? 'iPod' :
			/ios/ig.test(userAgent) ? 'iOS' :
			/mac/ig.test(userAgent) ? 'Mac' :
			'Other'
		);
		return os
	};

	const decryptUserAgent = ({ua, os, isBrave}) => {
	    const apple = /ipad|iphone|ipod|ios|mac/ig.test(os);
	    const isOpera = /OPR\//g.test(ua);
	    const isVivaldi = /Vivaldi/g.test(ua);
	    const isDuckDuckGo = /DuckDuckGo/g.test(ua);
	    const isYandex = /YaBrowser/g.test(ua);
	    const paleMoon = ua.match(/(palemoon)\/(\d+)./i); 
	    const edge = ua.match(/(edgios|edg|edge|edga)\/(\d+)./i);
	    const edgios = edge && /edgios/i.test(edge[1]);
	    const chromium = ua.match(/(crios|chrome)\/(\d+)./i);
	    const firefox = ua.match(/(fxios|firefox)\/(\d+)./i);
	    const likeSafari = (
	        /AppleWebKit/g.test(ua) &&
	        /Safari/g.test(ua)
	    );
	    const safari = (
	        likeSafari &&
	        !firefox &&
	        !chromium &&
	        !edge &&
	        ua.match(/(version)\/(\d+)\.(\d|\.)+\s(mobile|safari)/i)
	    );

	    if (chromium) {
	        const browser = chromium[1];
	        const version = chromium[2];
	        const like = (
	            isOpera ? ' Opera' :
	            isVivaldi ? ' Vivaldi' :
	            isDuckDuckGo ? ' DuckDuckGo' :
	            isYandex ? ' Yandex' :
	            edge ? ' Edge' :
	            isBrave ? ' Brave' : ''
	        );
	        return `${browser} ${version}${like}`
	    } else if (edgios) {
	        const browser = edge[1];
	        const version = edge[2];
	        return `${browser} ${version}`
	    } else if (firefox) {
	        const browser = paleMoon ? paleMoon[1] : firefox[1];
	        const version = paleMoon ? paleMoon[2] : firefox[2];
	        return `${browser} ${version}`
	    } else if (apple && safari) {
	        const browser = 'Safari';
	        const version = safari[2];
	        return `${browser} ${version}`
	    }
	    return 'unknown'
	};


	const nonPlatformParenthesis = /\((khtml|unlike|vizio|like gec|internal dummy|org\.eclipse|openssl|ipv6|via translate|safari|cardamon).+|xt\d+\)/ig;
	const parenthesis = /\((.+)\)/;
	const android = /((android).+)/i;
	const androidNoise = /^(linux|[a-z]|wv|mobile|[a-z]{2}(-|_)[a-z]{2}|[a-z]{2})$|windows|(rv:|trident|webview|iemobile).+/i;
	const androidBuild = /build\/.+\s|\sbuild\/.+/i;
	const androidRelease = /android( |-)\d/i;
	const windows = /((windows).+)/i;
	const windowsNoise = /^(windows|ms(-|)office|microsoft|compatible|[a-z]|x64|[a-z]{2}(-|_)[a-z]{2}|[a-z]{2})$|(rv:|outlook|ms(-|)office|microsoft|trident|\.net|msie|httrack|media center|infopath|aol|opera|iemobile|webbrowser).+/i;
	const windows64bitCPU = /w(ow|in)64/i;
	const cros = /cros/i;
	const crosNoise = /^([a-z]|x11|[a-z]{2}(-|_)[a-z]{2}|[a-z]{2})$|(rv:|trident).+/i;
	const crosBuild = /\d+\.\d+\.\d+/i;
	const linux = /linux|x11|ubuntu|debian/i;
	const linuxNoise = /^([a-z]|x11|unknown|compatible|[a-z]{2}(-|_)[a-z]{2}|[a-z]{2})$|(rv:|java|oracle|\+http|http|unknown|mozilla|konqueror|valve).+/i;
	const apple = /(cpu iphone|cpu os|iphone os|mac os|macos|intel os|ppc mac).+/i;
	const appleNoise = /^([a-z]|macintosh|compatible|mimic|[a-z]{2}(-|_)[a-z]{2}|[a-z]{2}|rv|\d+\.\d+)$|(rv:|silk|valve).+/i;
	const appleRelease = /(ppc |intel |)(mac|mac |)os (x |x|)\d+/i;
	const otherOS = /((symbianos|nokia|blackberry|morphos|mac).+)|\/linux|freebsd|symbos|series \d+|win\d+|unix|hp-ux|bsdi|bsd|x86_64/i;

	const isDevice = (list, device) => list.filter(x => device.test(x)).length;

	const getUserAgentPlatform = ({ userAgent, excludeBuild = true }) => {
		if (!userAgent) {
			return 'unknown'
		}
		userAgent = userAgent.trim().replace(/\s{2,}/, ' ').replace(nonPlatformParenthesis, '');
		if (parenthesis.test(userAgent)) {
			const platformSection = userAgent.match(parenthesis)[0];
			const identifiers = platformSection.slice(1, -1).replace(/,/g, ';').split(';').map(x => x.trim());

			if (isDevice(identifiers, android)) {
				return identifiers
					.map(x => androidRelease.test(x) ? androidRelease.exec(x)[0].replace('-', ' ') : x)
					.filter(x => !(androidNoise.test(x)))
					.join(' ')
					.replace((excludeBuild ? androidBuild : ''), '')
					.trim().replace(/\s{2,}/, ' ')
			} else if (isDevice(identifiers, windows)) {
				return identifiers
					.filter(x => !(windowsNoise.test(x)))
					.join(' ')
					.replace(/\sNT (\d+\.\d+)/, (match, version) => {
						return (
							version == '10.0' ? ' 10' :
							version == '6.3' ? ' 8.1' :
							version == '6.2' ? ' 8' :
							version == '6.1' ? ' 7' :
							version == '6.0' ? ' Vista' :
							version == '5.2' ? ' XP Pro' :
							version == '5.1' ? ' XP' :
							version == '5.0' ? ' 2000' :
							version == '4.0' ? match :
							' ' + version
						)
					})
					.replace(windows64bitCPU, '(64-bit)')
					.trim().replace(/\s{2,}/, ' ')
			} else if (isDevice(identifiers, cros)) {
				return identifiers
					.filter(x => !(crosNoise.test(x)))
					.join(' ')
					.replace((excludeBuild ? crosBuild : ''), '')
					.trim().replace(/\s{2,}/, ' ')
			} else if (isDevice(identifiers, linux)) {
				return identifiers
					.filter(x => !(linuxNoise.test(x)))
					.join(' ')
					.trim().replace(/\s{2,}/, ' ')
			} else if (isDevice(identifiers, apple)) {
				return identifiers
					.map(x => appleRelease.test(x) ? appleRelease.exec(x)[0] : x)
					.filter(x => !(appleNoise.test(x)))
					.join(' ')
					.replace(/\slike mac.+/ig, '')
					.trim().replace(/\s{2,}/, ' ')
			} else {
				const other = identifiers.filter(x => otherOS.test(x));
				if (other.legnth) {
					return other.join(' ').trim().replace(/\s{2,}/, ' ')
				}
				return identifiers.join(' ')
			}
		} else {
			return 'unknown'
		}
	};

	const logTestResult = ({ test, passed, start = false }) => {
		const color = passed ? '#4cca9f' : 'lightcoral';
		const result = passed ? 'passed' : 'failed';
		const symbol = passed ? '✔' : '-';
		return console.log(
			`%c${symbol}${
			start ? ` (${(performance.now() - start).toFixed(2)}ms)` : ''
		} ${test} ${result}`, `color:${color}`
		)
	};

	// ie11 fix for template.content
	function templateContent(template) {
		// template {display: none !important} /* add css if template is in dom */
		if ('content' in document.createElement('template')) {
			return document.importNode(template.content, true)
		} else {
			const frag = document.createDocumentFragment();
			const children = template.childNodes;
			for (let i = 0, len = children.length; i < len; i++) {
				frag.appendChild(children[i].cloneNode(true));
			}
			return frag
		}
	}

	// tagged template literal (JSX alternative)
	const patch = (oldEl, newEl, fn = null) => {
		oldEl.parentNode.replaceChild(newEl, oldEl);
		return typeof fn === 'function' ? fn() : true
	};
	const html = (stringSet, ...expressionSet) => {
		const template = document.createElement('template');
		template.innerHTML = stringSet.map((str, i) => `${str}${expressionSet[i] || ''}`).join('');
		return templateContent(template) // ie11 fix for template.content
	};

	// template helpers
	const note = {
		unsupported: '<span class="blocked">unsupported</span>',
		blocked: '<span class="blocked">blocked</span>',
		lied: '<span class="lies">lied</span>'
	};
	const count = arr => arr && arr.constructor.name === 'Array' ? ''+(arr.length) : '0';

	// modal component
	const modal = (name, result) => {
		if (!result.length) {
			return ''
		}
		return `
		<style>
		.modal-${name}:checked ~ .modal-container {
			visibility: visible;
			opacity: 1;
			animation: show 0.1s linear both;
		}
		.modal-${name}:checked ~ .modal-container .modal-content {
			animation: enter 0.2s ease both
		}
		.modal-${name}:not(:checked) ~ .modal-container {
			visibility: hidden;
		}
		</style>
		<input type="radio" id="toggle-open-${name}" class="modal-${name}" name="modal-${name}"/>
		<label class="modal-open-btn" for="toggle-open-${name}" onclick="">details</label>
		<label class="modal-container" for="toggle-close-${name}" onclick="">
			<label class="modal-content" for="toggle-open-${name}" onclick="">
				<input type="radio" id="toggle-close-${name}" name="modal-${name}"/>
				<label class="modal-close-btn" for="toggle-close-${name}" onclick="">×</label>
				<div>${result}</div>
			</label>
		</label>
	`
	};

	// https://stackoverflow.com/a/22429679
	const hashMini = str => {
		const json = `${JSON.stringify(str)}`;
		let i, len, hash = 0x811c9dc5;
		for (i = 0, len = json.length; i < len; i++) {
			hash = Math.imul(31, hash) + json.charCodeAt(i) | 0;
		}
		return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
	};

	// instance id
	const instanceId = hashMini(crypto.getRandomValues(new Uint32Array(10)));

	// https://stackoverflow.com/a/53490958
	// https://stackoverflow.com/a/43383990
	// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
	const hashify = async (x) => {
		const json = `${JSON.stringify(x)}`;
		const jsonBuffer = new TextEncoder().encode(json);
		const hashBuffer = await crypto.subtle.digest('SHA-256', jsonBuffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
		return hashHex
	};

	const createErrorsCaptured = () => {
		const errors = [];
	  	return {
			getErrors: () => errors,
			captureError: (error, customMessage = null) => {
				const type = {
					Error: true,
					EvalError: true, 
					InternalError: true,
					RangeError: true,
					ReferenceError: true,
					SyntaxError: true,
					TypeError: true,
					URIError: true,
					InvalidStateError: true,
					SecurityError: true
				};
				const hasInnerSpace = s => /.+(\s).+/g.test(s); // ignore AOPR noise
				console.error(error); // log error to educate
				const { name, message } = error;
				const trustedMessage = (
					!hasInnerSpace(message) ? undefined :
					!customMessage ? message :
					`${message} [${customMessage}]`
				);
				const trustedName = type[name] ? name : undefined;
				errors.push(
					{ trustedName, trustedMessage }
				);
				return undefined
			}
		}
	};
	const errorsCaptured = createErrorsCaptured();
	const { captureError } = errorsCaptured;

	const attempt = (fn, customMessage = null) => {
		try {
			return fn()
		} catch (error) {
			if (customMessage) {
				return captureError(error, customMessage)
			}
			return captureError(error)
		}
	};

	const caniuse = (fn, objChainList = [], args = [], method = false) => {
		let api;
		try {
			api = fn();
		} catch (error) {
			return undefined
		}
		let i, len = objChainList.length, chain = api;
		try {
			for (i = 0; i < len; i++) {
				const obj = objChainList[i];
				chain = chain[obj];
			}
		}
		catch (error) {
			return undefined
		}
		return (
			method && args.length ? chain.apply(api, args) :
			method && !args.length ? chain.apply(api) :
			chain
		)
	};

	// Log performance time
	const timer = (logStart) => {
		logStart && console.log(logStart);
		let start = 0;
		try {
			start = performance.now();
		}
		catch (error) {
			captureError(error);
		}
		return logEnd => {
			let end = 0;
			try {
				end = performance.now() - start;
				logEnd && console.log(`${logEnd}: ${end / 1000} seconds`);
				return end
			}
			catch (error) {
				captureError(error);
				return 0
			}
		}
	};

	const getCapturedErrors = imports => {

		const {
			require: {
				hashify,
				errorsCaptured
			}
		} = imports;

		const errors = errorsCaptured.getErrors();

		return new Promise(async resolve => {
			return resolve({data: errors })
		})
	};

	// Detect proxy behavior
	const proxyBehavior = x => typeof x == 'function' ? true : false;

	// Detect gibberish 
	const accept = {'aa': 1, 'ab': 1, 'ac': 1, 'ad': 1, 'ae': 1, 'af': 1, 'ag': 1, 'ah': 1, 'ai': 1, 'aj': 1, 'ak': 1, 'al': 1, 'am': 1, 'an': 1, 'ao': 1, 'ap': 1, 'aq': 1, 'ar': 1, 'as': 1, 'at': 1, 'au': 1, 'av': 1, 'aw': 1, 'ax': 1, 'ay': 1, 'az': 1, 'ba': 1, 'bb': 1, 'bc': 1, 'bd': 1, 'be': 1, 'bf': 1, 'bg': 1, 'bh': 1, 'bi': 1, 'bj': 1, 'bk': 1, 'bl': 1, 'bm': 1, 'bn': 1, 'bo': 1, 'bp': 1, 'br': 1, 'bs': 1, 'bt': 1, 'bu': 1, 'bv': 1, 'bw': 1, 'bx': 1, 'by': 1, 'ca': 1, 'cb': 1, 'cc': 1, 'cd': 1, 'ce': 1, 'cg': 1, 'ch': 1, 'ci': 1, 'ck': 1, 'cl': 1, 'cm': 1, 'cn': 1, 'co': 1, 'cp': 1, 'cq': 1, 'cr': 1, 'cs': 1, 'ct': 1, 'cu': 1, 'cw': 1, 'cy': 1, 'cz': 1, 'da': 1, 'db': 1, 'dc': 1, 'dd': 1, 'de': 1, 'df': 1, 'dg': 1, 'dh': 1, 'di': 1, 'dj': 1, 'dk': 1, 'dl': 1, 'dm': 1, 'dn': 1, 'do': 1, 'dp': 1, 'dq': 1, 'dr': 1, 'ds': 1, 'dt': 1, 'du': 1, 'dv': 1, 'dw': 1, 'dx': 1, 'dy': 1, 'dz': 1, 'ea': 1, 'eb': 1, 'ec': 1, 'ed': 1, 'ee': 1, 'ef': 1, 'eg': 1, 'eh': 1, 'ei': 1, 'ej': 1, 'ek': 1, 'el': 1, 'em': 1, 'en': 1, 'eo': 1, 'ep': 1, 'eq': 1, 'er': 1, 'es': 1, 'et': 1, 'eu': 1, 'ev': 1, 'ew': 1, 'ex': 1, 'ey': 1, 'ez': 1, 'fa': 1, 'fb': 1, 'fc': 1, 'fd': 1, 'fe': 1, 'ff': 1, 'fg': 1, 'fh': 1, 'fi': 1, 'fj': 1, 'fk': 1, 'fl': 1, 'fm': 1, 'fn': 1, 'fo': 1, 'fp': 1, 'fr': 1, 'fs': 1, 'ft': 1, 'fu': 1, 'fw': 1, 'fy': 1, 'ga': 1, 'gb': 1, 'gc': 1, 'gd': 1, 'ge': 1, 'gf': 1, 'gg': 1, 'gh': 1, 'gi': 1, 'gj': 1, 'gk': 1, 'gl': 1, 'gm': 1, 'gn': 1, 'go': 1, 'gp': 1, 'gr': 1, 'gs': 1, 'gt': 1, 'gu': 1, 'gw': 1, 'gy': 1, 'gz': 1, 'ha': 1, 'hb': 1, 'hc': 1, 'hd': 1, 'he': 1, 'hf': 1, 'hg': 1, 'hh': 1, 'hi': 1, 'hj': 1, 'hk': 1, 'hl': 1, 'hm': 1, 'hn': 1, 'ho': 1, 'hp': 1, 'hq': 1, 'hr': 1, 'hs': 1, 'ht': 1, 'hu': 1, 'hv': 1, 'hw': 1, 'hy': 1, 'ia': 1, 'ib': 1, 'ic': 1, 'id': 1, 'ie': 1, 'if': 1, 'ig': 1, 'ih': 1, 'ii': 1, 'ij': 1, 'ik': 1, 'il': 1, 'im': 1, 'in': 1, 'io': 1, 'ip': 1, 'iq': 1, 'ir': 1, 'is': 1, 'it': 1, 'iu': 1, 'iv': 1, 'iw': 1, 'ix': 1, 'iy': 1, 'iz': 1, 'ja': 1, 'jc': 1, 'je': 1, 'ji': 1, 'jj': 1, 'jk': 1, 'jn': 1, 'jo': 1, 'ju': 1, 'ka': 1, 'kb': 1, 'kc': 1, 'kd': 1, 'ke': 1, 'kf': 1, 'kg': 1, 'kh': 1, 'ki': 1, 'kj': 1, 'kk': 1, 'kl': 1, 'km': 1, 'kn': 1, 'ko': 1, 'kp': 1, 'kr': 1, 'ks': 1, 'kt': 1, 'ku': 1, 'kv': 1, 'kw': 1, 'ky': 1, 'la': 1, 'lb': 1, 'lc': 1, 'ld': 1, 'le': 1, 'lf': 1, 'lg': 1, 'lh': 1, 'li': 1, 'lj': 1, 'lk': 1, 'll': 1, 'lm': 1, 'ln': 1, 'lo': 1, 'lp': 1, 'lq': 1, 'lr': 1, 'ls': 1, 'lt': 1, 'lu': 1, 'lv': 1, 'lw': 1, 'lx': 1, 'ly': 1, 'lz': 1, 'ma': 1, 'mb': 1, 'mc': 1, 'md': 1, 'me': 1, 'mf': 1, 'mg': 1, 'mh': 1, 'mi': 1, 'mj': 1, 'mk': 1, 'ml': 1, 'mm': 1, 'mn': 1, 'mo': 1, 'mp': 1, 'mq': 1, 'mr': 1, 'ms': 1, 'mt': 1, 'mu': 1, 'mv': 1, 'mw': 1, 'my': 1, 'na': 1, 'nb': 1, 'nc': 1, 'nd': 1, 'ne': 1, 'nf': 1, 'ng': 1, 'nh': 1, 'ni': 1, 'nj': 1, 'nk': 1, 'nl': 1, 'nm': 1, 'nn': 1, 'no': 1, 'np': 1, 'nq': 1, 'nr': 1, 'ns': 1, 'nt': 1, 'nu': 1, 'nv': 1, 'nw': 1, 'nx': 1, 'ny': 1, 'nz': 1, 'oa': 1, 'ob': 1, 'oc': 1, 'od': 1, 'oe': 1, 'of': 1, 'og': 1, 'oh': 1, 'oi': 1, 'oj': 1, 'ok': 1, 'ol': 1, 'om': 1, 'on': 1, 'oo': 1, 'op': 1, 'oq': 1, 'or': 1, 'os': 1, 'ot': 1, 'ou': 1, 'ov': 1, 'ow': 1, 'ox': 1, 'oy': 1, 'oz': 1, 'pa': 1, 'pb': 1, 'pc': 1, 'pd': 1, 'pe': 1, 'pf': 1, 'pg': 1, 'ph': 1, 'pi': 1, 'pj': 1, 'pk': 1, 'pl': 1, 'pm': 1, 'pn': 1, 'po': 1, 'pp': 1, 'pr': 1, 'ps': 1, 'pt': 1, 'pu': 1, 'pw': 1, 'py': 1, 'pz': 1, 'qa': 1, 'qe': 1, 'qi': 1, 'qo': 1, 'qr': 1, 'qs': 1, 'qt': 1, 'qu': 1, 'ra': 1, 'rb': 1, 'rc': 1, 'rd': 1, 're': 1, 'rf': 1, 'rg': 1, 'rh': 1, 'ri': 1, 'rj': 1, 'rk': 1, 'rl': 1, 'rm': 1, 'rn': 1, 'ro': 1, 'rp': 1, 'rq': 1, 'rr': 1, 'rs': 1, 'rt': 1, 'ru': 1, 'rv': 1, 'rw': 1, 'rx': 1, 'ry': 1, 'rz': 1, 'sa': 1, 'sb': 1, 'sc': 1, 'sd': 1, 'se': 1, 'sf': 1, 'sg': 1, 'sh': 1, 'si': 1, 'sj': 1, 'sk': 1, 'sl': 1, 'sm': 1, 'sn': 1, 'so': 1, 'sp': 1, 'sq': 1, 'sr': 1, 'ss': 1, 'st': 1, 'su': 1, 'sv': 1, 'sw': 1, 'sy': 1, 'sz': 1, 'ta': 1, 'tb': 1, 'tc': 1, 'td': 1, 'te': 1, 'tf': 1, 'tg': 1, 'th': 1, 'ti': 1, 'tj': 1, 'tk': 1, 'tl': 1, 'tm': 1, 'tn': 1, 'to': 1, 'tp': 1, 'tr': 1, 'ts': 1, 'tt': 1, 'tu': 1, 'tv': 1, 'tw': 1, 'tx': 1, 'ty': 1, 'tz': 1, 'ua': 1, 'ub': 1, 'uc': 1, 'ud': 1, 'ue': 1, 'uf': 1, 'ug': 1, 'uh': 1, 'ui': 1, 'uj': 1, 'uk': 1, 'ul': 1, 'um': 1, 'un': 1, 'uo': 1, 'up': 1, 'uq': 1, 'ur': 1, 'us': 1, 'ut': 1, 'uu': 1, 'uv': 1, 'uw': 1, 'ux': 1, 'uy': 1, 'uz': 1, 'va': 1, 'vc': 1, 'vd': 1, 've': 1, 'vg': 1, 'vi': 1, 'vl': 1, 'vn': 1, 'vo': 1, 'vr': 1, 'vs': 1, 'vt': 1, 'vu': 1, 'vv': 1, 'vy': 1, 'vz': 1, 'wa': 1, 'wb': 1, 'wc': 1, 'wd': 1, 'we': 1, 'wf': 1, 'wg': 1, 'wh': 1, 'wi': 1, 'wj': 1, 'wk': 1, 'wl': 1, 'wm': 1, 'wn': 1, 'wo': 1, 'wp': 1, 'wr': 1, 'ws': 1, 'wt': 1, 'wu': 1, 'ww': 1, 'wy': 1, 'wz': 1, 'xa': 1, 'xb': 1, 'xc': 1, 'xe': 1, 'xf': 1, 'xg': 1, 'xh': 1, 'xi': 1, 'xl': 1, 'xm': 1, 'xn': 1, 'xo': 1, 'xp': 1, 'xq': 1, 'xs': 1, 'xt': 1, 'xu': 1, 'xv': 1, 'xw': 1, 'xx': 1, 'xy': 1, 'ya': 1, 'yb': 1, 'yc': 1, 'yd': 1, 'ye': 1, 'yf': 1, 'yg': 1, 'yh': 1, 'yi': 1, 'yj': 1, 'yk': 1, 'yl': 1, 'ym': 1, 'yn': 1, 'yo': 1, 'yp': 1, 'yr': 1, 'ys': 1, 'yt': 1, 'yu': 1, 'yv': 1, 'yw': 1, 'yx': 1, 'yz': 1, 'za': 1, 'zb': 1, 'zc': 1, 'zd': 1, 'ze': 1, 'zg': 1, 'zh': 1, 'zi': 1, 'zj': 1, 'zk': 1, 'zl': 1, 'zm': 1, 'zn': 1, 'zo': 1, 'zp': 1, 'zq': 1, 'zs': 1, 'zt': 1, 'zu': 1, 'zv': 1, 'zw': 1, 'zy': 1, 'zz': 1};

	const gibberish = str => {
		const gibbers = [];
		if (!str) {
			return gibbers
		}

		// test letter case sequence
		const tests = [
			/([A-Z]{3,}[a-z])/g, // ABCd
			/([a-z][A-Z]{3,})/g, // aBCD
			/([a-z][A-Z]{2,}[a-z])/g, // aBC...z
			/([a-z][\d]{2,}[a-z])/g, // a##...b
			/([A-Z][\d]{2,}[a-z])/g, // A##...b
			/([a-z][\d]{2,}[A-Z])/g // a##...B
		];
		tests.forEach(regExp => {
			const match = str.match(regExp);
			if (match) {
				return gibbers.push(match.join(', '))
			}
			return
		});

		// test letter sequence
		const clean = str.toLowerCase().replace(/\d|\W|_/g, ' ').replace(/\s+/g,' ').trim().split(' ').join('_');
		const len = clean.length;
		const arr = [...clean];
		arr.forEach((char, index) => {
			const next = index+1;
			if (arr[next] == '_' || char == '_' || next == len) { return true }
			const combo = char+arr[index+1];
			const acceptable = !!accept[combo];
			!acceptable && gibbers.push(combo);
			return 
		});
		return gibbers
	};

	// validate
	const isInt = (x) => typeof x == 'number' && x % 1 == 0;
	const trustInteger = (name, val) => {
		const trusted = isInt(val); 
		return trusted ? val : sendToTrash(name, val)
	};

	// Collect trash values
	const createTrashBin = () => {
		const bin = [];
	  	return {
			getBin: () => bin,
			sendToTrash: (name, val, response = undefined) => {
				const proxyLike = proxyBehavior(val);
				const value = !proxyLike ? val : 'proxy behavior detected';
				bin.push({ name, value });
				return response
			}
		}
	};

	const trashBin = createTrashBin();
	const { sendToTrash } = trashBin;

	const getTrash = imports => {
		const {
			require: {
				trashBin
			}
		} = imports;
		const bin = trashBin.getBin();
		return new Promise(async resolve => {
			return resolve({ trashBin: bin })
		})
	};

	// Collect lies detected
	const createlieRecords = () => {
		const records = [];
	  	return {
			getRecords: () => records,
			documentLie: (name, lieResult, lieTypes) => {
				return records.push({ name, lieTypes, hash: lieResult, lie: hashMini(lieTypes) })
			}
		}
	};

	const lieRecords = createlieRecords();
	const { documentLie } = lieRecords;

	const ghost = () => `
	height: 100vh;
	width: 100vw;
	position: absolute;
	left:-10000px;
	visibility: hidden;
`;
	const getRandomValues = () => {
		const id = [...crypto.getRandomValues(new Uint32Array(10))]
			.map(n => n.toString(36)).join('');
		return id
	};

	const getPhantomIframe = () => {
		try {
			const numberOfIframes = window.length;
			const frag = new DocumentFragment();
			const div = document.createElement('div');
			const id = getRandomValues();
			div.setAttribute('id', id);
			frag.appendChild(div);
			div.innerHTML = `<div style="${ghost()}"><iframe></iframe></div>`;
			document.body.appendChild(frag);
			const iframeWindow = window[numberOfIframes];
			return { iframeWindow, div }
		}
		catch (error) {
			captureError(error, 'client blocked phantom iframe');
			return { iframeWindow: window, div: undefined }
		}
	};
	const { iframeWindow: phantomDarkness, div: parentPhantom } = getPhantomIframe();

	const getDragonIframe = ({ numberOfNests, kill = false, context = window }) => {
		try {
			let parent, total = numberOfNests;
			return (function getIframeWindow(win, {
				previous = context
			} = {}) {
				if (!win) {
					if (kill) {
						parent.parentNode.removeChild(parent);
					}
					console.log(`\ndragon fire is valid up to ${total - numberOfNests} fiery flames`);
					return { iframeWindow: previous, parent }
				}
				const numberOfIframes = win.length;
				const div = win.document.createElement('div');
				win.document.body.appendChild(div);
				div.innerHTML = '<iframe></iframe>';
				const iframeWindow = win[numberOfIframes];
				if (total == numberOfNests) {
					parent = div;
					parent.setAttribute('style', 'display:none');
				}
				numberOfNests--;
				if (!numberOfNests) {
					if (kill) {
						parent.parentNode.removeChild(parent);
					}
					return { iframeWindow, parent }
				}
				return getIframeWindow(iframeWindow, {
					previous: win
				})
			})(context)
		}
		catch (error) {
			captureError(error, 'client blocked dragon iframe');
			return { iframeWindow: window, parent: undefined }
		}
	};

	const { iframeWindow: dragonFire, parent: parentDragon } = getDragonIframe({ numberOfNests: 2 });

	const { iframeWindow: dragonOfDeath } = getDragonIframe({ numberOfNests: 4, kill: true});

	// detect and fingerprint Function API lies
	const native = (result, str, willHaveBlanks = false) => {
		const chrome = `function ${str}() { [native code] }`;
		const chromeGet = `function get ${str}() { [native code] }`;
		const firefox = `function ${str}() {\n    [native code]\n}`;
		const chromeBlank = `function () { [native code] }`;
		const firefoxBlank = `function () {\n    [native code]\n}`;
		return (
			result == chrome ||
			result == chromeGet ||
			result == firefox || (
				willHaveBlanks && (result == chromeBlank || result == firefoxBlank)
			)
		)
	};

	const testLookupGetter = (proto, name) => {
		if (proto.__lookupGetter__(name)) {
			return {
				[`Expected __lookupGetter__ to return undefined`]: true
			}
		}
		return false
	};

	const testLength = (apiFunction, name) => {
		const apiLen = {
			createElement: [true, 1],
			createElementNS: [true, 2],
			toBlob: [true, 1],
			getImageData: [true, 4],
			measureText: [true, 1],
			toDataURL: [true, 0],
			getContext: [true, 1],
			getParameter: [true, 1],
			getExtension: [true, 1],
			getSupportedExtensions: [true, 0],
			getParameter: [true, 1],
			getExtension: [true, 1],
			getSupportedExtensions: [true, 0],
			getClientRects: [true, 0],
			getChannelData: [true, 1],
			copyFromChannel: [true, 2],
			getTimezoneOffset: [true, 0]
		};
		if (apiLen[name] && apiLen[name][0] && apiFunction.length != apiLen[name][1]) {
			return {
				[`Expected length ${apiLen[name][1]} and got ${apiFunction.length}`]: true
			}
		}
		return false
	};

	const testEntries = apiFunction => {
		const objectFail = {
			entries: 0,
			keys: 0,
			values: 0
		};
		let totalFail = 0;
		const objEntriesLen = Object.entries(apiFunction).length;
		const objKeysLen = Object.keys(apiFunction).length;
		const objKeysValues = Object.values(apiFunction).length;
		if (!!objEntriesLen) {
			totalFail++;
			objectFail.entries = objEntriesLen;
		}
		if (!!objKeysLen) {
			totalFail++;
			objectFail.keys = objKeysLen;
		}
		if (!!objKeysValues) {
			totalFail++;
			objectFail.values = objKeysValues;
		}
		if (totalFail) {
			return {
				[`Expected entries, keys, values [0, 0, 0] and got [${objectFail.entries}, ${objectFail.keys}, ${objectFail.values}]`]: true
			}
		}
		return false
	};

	const testPrototype = apiFunction => {
		if ('prototype' in apiFunction) {
			return {
				[`Unexpected 'prototype' in function`]: true
			}
		} 
		return false
	};

	const testNew = apiFunction => {
		try {
			new apiFunction;
			return {
				['Expected new to throw an Error']: true
			}
		}
		catch (error) {
			// Native throws TypeError
			if (error.constructor.name != 'TypeError') {
				return {
					['Expected new to throw a TypeError']: true
				}
			}
			return false
		}
	};

	const testClassExtends = apiFunction => {
		try { 
			class Fake extends apiFunction { }
			return {
				['Expected class extends to throw an Error']: true
			}
		}
		catch (error) {
			// Native throws error
			if (error.constructor.name != 'TypeError') {
				return {
					['Expected class extends to throw a TypeError']: true
				}
			}
			else if (!/not a constructor/i.test(error.message)) {
				return {
					['Expected class extends to throw TypeError "not a constructor"']: true
				}
			}
			return false
		}
	};

	const testSetPrototypeNull = apiFunction => {
		const nativeProto = Object.getPrototypeOf(apiFunction);
		try { 
			Object.setPrototypeOf(apiFunction, null)+'';
			Object.setPrototypeOf(apiFunction, nativeProto);
			return {
				['Expected set prototype null to throw an error']: true
			}
		}
		catch (error) {
			// Native throws error
			Object.setPrototypeOf(apiFunction, nativeProto);
			return false
		}
	};

	const testName = (apiFunction, name) => {
		const { name: apiName } = apiFunction;
		if (apiName != '' && apiName != name) {
			return {
				[`Expected name "${name}" and got "${apiName}"`]: true
			}
		}
		return false
	};

	const testToString = (apiFunction, fnToStr, phantomDarkness) => {
		const { toString: apiToString } = apiFunction;
		if (apiToString+'' !== fnToStr || apiToString.toString+'' !== fnToStr) {
			return {
				[`Expected toString to match ${phantomDarkness ? 'iframe.' : ''}Function.toString`]: true
			}
		}
		return false
	};

	const testOwnProperty = apiFunction => {
		const notOwnProperties = [];
		if (apiFunction.hasOwnProperty('arguments')) {
			notOwnProperties.push('arguments');
		}
		if (apiFunction.hasOwnProperty('caller')) {
			notOwnProperties.push('caller');
		}
		if (apiFunction.hasOwnProperty('prototype')) {
			notOwnProperties.push('prototype');
		}
		if (apiFunction.hasOwnProperty('toString')) {
			notOwnProperties.push('toString');
		}
		if (!!notOwnProperties.length) {
			return {
				[`Unexpected own property: ${notOwnProperties.join(', ')}`]: true
			}
		}
		return false
	};

	const testOwnPropertyDescriptor = apiFunction => {
		const notDescriptors = [];
		if (!!Object.getOwnPropertyDescriptor(apiFunction, 'arguments') ||
			!!Reflect.getOwnPropertyDescriptor(apiFunction, 'arguments')) {
			notDescriptors.push('arguments');
		}
		if (!!Object.getOwnPropertyDescriptor(apiFunction, 'caller') ||
			!!Reflect.getOwnPropertyDescriptor(apiFunction, 'caller')) {
			notDescriptors.push('caller');
		}
		if (!!Object.getOwnPropertyDescriptor(apiFunction, 'prototype') ||
			!!Reflect.getOwnPropertyDescriptor(apiFunction, 'prototype')) {
			notDescriptors.push('prototype');
		}
		if (!!Object.getOwnPropertyDescriptor(apiFunction, 'toString') ||
			!!Reflect.getOwnPropertyDescriptor(apiFunction, 'toString')) {
			notDescriptors.push('toString');
		}
		if (!!notDescriptors.length) {
			return {
				[`Unexpected descriptor: ${notDescriptors.join(', ')}`]: true
			}
		}
		return
	};

	const testDescriptorKeys = apiFunction => {
		const descriptorKeys = Object.keys(Object.getOwnPropertyDescriptors(apiFunction));
		if (''+descriptorKeys != 'length,name' && ''+descriptorKeys != 'name,length') {
			return {
				['Expected own property descriptor keys [length, name]']: true
			}
		}
		return false
	};

	const testOwnPropertyNames = apiFunction => {
		const ownPropertyNames = Object.getOwnPropertyNames(apiFunction);
		if (''+ownPropertyNames != 'length,name' && ''+ownPropertyNames != 'name,length') {
			return {
				['Expected own property names [length, name]']: true
			}
		}
		return false
	};

	const testOwnKeys = apiFunction => {
		const ownKeys = Reflect.ownKeys(apiFunction);
		if (''+ownKeys != 'length,name' && ''+ownKeys != 'name,length') {
			return {
				['Expected own keys [length, name]']: true
			}
		}
		return false
	};

	const testSpread = apiFunction => {
		const ownPropLen = Object.getOwnPropertyNames({...apiFunction}).length;
		if (ownPropLen) {
			return {
				[`Expected 0 own property names in spread and got ${ownPropLen}`]: true
			}
		}
		return false
	};

	const testDescriptor = (proto, name) => {
		const descriptor = Object.getOwnPropertyDescriptor(proto, name);
		const ownPropLen = Object.getOwnPropertyNames(descriptor).length;
		const ownKeysLen = Reflect.ownKeys(descriptor).length;
		const keysLen = Object.keys(descriptor).length;
		if (ownPropLen != keysLen || ownPropLen != ownKeysLen) {
			return {
				['Expected keys and own property names to match in length']: true
			}
		}
		return false
	};

	const testGetToString = (proto, name) => {
		try {
			Object.getOwnPropertyDescriptor(proto, name).get.toString();
			Reflect.getOwnPropertyDescriptor(proto, name).get.toString();
			return {
				['Expected descriptor.get.toString() to throw an error']: true
			}
		}
		catch (error) {
			// Native throws error
			return false
		}
	};

	const testIllegal = (api, name) => {
		let illegalCount = 0;
		const illegal = [
			'',
			'is',
			'call',
			'seal',
			'keys',
			'bind',
			'apply',
			'assign',
			'freeze',
			'values',
			'entries',
			'toString',
			'isFrozen',
			'isSealed',
			'constructor',
			'isExtensible',
			'getPrototypeOf',
			'preventExtensions',
			'propertyIsEnumerable',
			'getOwnPropertySymbols',
			'getOwnPropertyDescriptors'
		];
		try {
			api[name];
			illegalCount++;
		}
		catch (error) {
			// Native throws error
		}
		illegal.forEach((prop, index) => {
			try {
				!prop ? Object(api[name]) : Object[prop](api[name]);
				illegalCount++;
			}
			catch (error) {
				// Native throws error
			}
		});
		if (illegalCount) {
			const total = illegal.length+1;
			return {
				[`Expected illegal invocation error: ${total-illegalCount} of ${total} passed`]: true
			}
		}
		return false
	};

	const testValue = (obj, name) => {
		try {
			Object.getOwnPropertyDescriptor(obj, name).value;
			Reflect.getOwnPropertyDescriptor(obj, name).value;
			return {
				['Expected descriptor.value to throw an error']: true
			}
		}
		catch (error) {
			// Native throws error
			return false
		}
	};

	let counter = 0;
	const hasLiedAPI = (api, name, obj) => {
		counter++;
		const fnToStr = (
			phantomDarkness ? 
			phantomDarkness.Function.prototype.toString.call(Function.prototype.toString) : // aggressive test
			Function.prototype.toString+''
		);

		let willHaveBlanks = false;
		try {
			willHaveBlanks = obj && (obj+'' == '[object Navigator]' || obj+'' == '[object Document]');
		}
		catch (error) { }

		if (typeof api == 'function') {
			const proto = obj;
			const apiFunction = api;
			try {
				const testResults = new Set(
					[
						testLookupGetter(proto, name),
						testLength(apiFunction, name),
						testEntries(apiFunction),
						testGetToString(proto, name),
						testSpread(apiFunction),
						testSetPrototypeNull(apiFunction),

						// common tests
						testPrototype(apiFunction),
						testNew(apiFunction),
						testClassExtends(apiFunction),
						testName(apiFunction, name),
						testToString(apiFunction, fnToStr, phantomDarkness),
						testOwnProperty(apiFunction),
						testOwnPropertyDescriptor(apiFunction),
						testDescriptorKeys(apiFunction),
						testOwnPropertyNames(apiFunction),
						testOwnKeys(apiFunction),
						testDescriptor(proto, name)
					]
				);
				testResults.delete(false);
				testResults.delete(undefined);
				const lies = [...testResults];

				// collect string conversion result
				const result = (
					phantomDarkness ? 
					phantomDarkness.Function.prototype.toString.call(apiFunction) :
					'' + apiFunction
				);
				
				// fingerprint result if it does not match native code
				let fingerprint = '';
				if (!native(result, name, willHaveBlanks)) {
					fingerprint = result;
				}
				
				return {
					lie: lies.length || fingerprint ? { lies, fingerprint } : false 
				}
			}
			catch (error) {
				captureError(error);
				return false
			}
		}

		if (typeof api == 'object' && caniuse(() => obj[name]) != undefined) {
				
			try {
				const proto = api;
				const apiFunction = Object.getOwnPropertyDescriptor(api, name).get;
				const testResults = new Set(
					[
						testIllegal(api, name),
						testValue(obj, name),
						
						// common tests
						testPrototype(apiFunction),
						testNew(apiFunction),
						testClassExtends(apiFunction),
						testName(apiFunction, `get ${name}`),
						testToString(apiFunction, fnToStr, phantomDarkness),
						testOwnProperty(apiFunction),
						testOwnPropertyDescriptor(apiFunction),
						testDescriptorKeys(apiFunction),
						testOwnPropertyNames(apiFunction),
						testOwnKeys(apiFunction),
						testDescriptor(proto, name)
					]
				);
				testResults.delete(false);
				testResults.delete(undefined);
				const lies = [...testResults];
				// collect string conversion result
				const result = (
					phantomDarkness ? 
					phantomDarkness.Function.prototype.toString.call(apiFunction) :
					'' + apiFunction
				);

				let objlookupGetter, apiProtoLookupGetter, result2, result3;
				if (obj) {
					objlookupGetter = obj.__lookupGetter__(name);
					apiProtoLookupGetter = api.__lookupGetter__(name);
					const iframeResult = (
						typeof objlookupGetter != 'function' ? undefined : 
						attempt(() => phantomDarkness.Function.prototype.toString.call(objlookupGetter))
					);
					result2 = (
						iframeResult ? 
						iframeResult :
						'' + objlookupGetter
					);
					result3 = '' + apiProtoLookupGetter;
				}

				// fingerprint result if it does not match native code
				let fingerprint = '';
				if (!native(result, name, willHaveBlanks)) {
					fingerprint = result;
				}
				else if (obj && !native(result2, name, willHaveBlanks)) {
					fingerprint = result2;
				}
				else if (obj && !native(result3, name, willHaveBlanks)) {
					fingerprint = result3 != 'undefined' ? result3 : '';
				}

				return {
					lie: lies.length || fingerprint ? { lies, fingerprint } : false
				}
			}
			catch (error) {
				captureError(error);
				return false
			}
		}

		return false
	};

	// deep search lies
	const getMethods = (obj, ignore) => {
		if (!obj) {
			return []
		}
		return Object.getOwnPropertyNames(obj).filter(item => {
			if (ignore[item]) {
				// validate critical methods elsewhere
				return false
			}
			try {
				return typeof obj[item] === 'function'
			}
			catch (error) {
				return false
			}
		})
	};
	const getValues = (obj, ignore) => {
		if (!obj) {
			return []
		}
		return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(item => {
			if (ignore[item]) {
				// validate critical methods elsewhere
				return false
			}
			try {
				return (
					typeof obj[item] == 'string' ||
					typeof obj[item] == 'number' ||
					!obj[item]
				)
			}
			catch (error) {
				return false
			}
		})
	};
	const intlConstructors = {
		'Collator': !0,
		'DateTimeFormat': !0,
		'DisplayNames': !0,
		'ListFormat': !0,
		'NumberFormat': !0,
		'PluralRules': !0,
		'RelativeTimeFormat': !0
	};

	const createLieProps = () => {
		const props = {};
	  	return {
			getProps: () => props,
			searchLies: (obj, ignoreProps, { logToConsole = false, proto = null } = {}) => {
				if (!obj) {
					return
				}
				let methods;
				const isMath = (obj+'' == '[object Math]');
				const isTypeofObject = typeof obj == 'object';
				if (isMath) {
					methods = getMethods(obj, ignoreProps);
				}
				else if (isTypeofObject) {
					methods = getValues(obj, ignoreProps);
				}
				else {
					methods = getMethods(obj.prototype, ignoreProps);
				}
				return methods.forEach(name => {
					let domManipLie;
					if (isMath) {
						domManipLie = hasLiedAPI(obj[name], name, obj).lie;
						if (domManipLie) {
							const apiName = `Math.${name}`;
							props[apiName] = true;
							documentLie(apiName, undefined, domManipLie);
						}
					}
					else if (isTypeofObject) {
						domManipLie = hasLiedAPI(proto, name, obj).lie;
						if (domManipLie) {
							const objName = /\s(.+)\]/g.exec(proto)[1];
							const apiName = `${objName}.${name}`;
							props[apiName] = true;
							documentLie(apiName, undefined, domManipLie);
						}
					}
					else {
						domManipLie = hasLiedAPI(obj.prototype[name], name, obj.prototype).lie;
						if (domManipLie) {
							const objName = /\s(.+)\(\)/g.exec(obj)[1];
							const apiName = `${intlConstructors[objName] ? 'Intl.' : ''}${objName}.${name}`;
							props[apiName] = true;
							documentLie(apiName, undefined, domManipLie);
						}
					}
					if (logToConsole) {
						console.log(name, domManipLie);
					}	
				})
			}
		}
	};

	const lieProps = createLieProps();
	const { searchLies } = lieProps;

	const start = performance.now();
	searchLies(Node, {
		constructor: !0,
		appendChild: !0 // opera fix
	});
	searchLies(Element, {
		constructor: !0,
		querySelector: !0, // opera fix
		setAttribute: !0 // opera fix
	});
	searchLies(HTMLElement, {
		constructor: !0,
		requestFullscreen: !0 // in FF mobile, this does not appear native 
	});
	searchLies(HTMLCanvasElement, {
		constructor: !0
	});
	searchLies(Navigator, {
		constructor: !0
	});
	searchLies(navigator, {
		constructor: !0
	}, { logToConsole: false, proto: Navigator.prototype });
	searchLies(Screen, {
		constructor: !0
	});
	searchLies(screen, {
		constructor: !0
	}, { logToConsole: false, proto: Screen.prototype });
	searchLies(Date, {
		constructor: !0,
		toGMTString: !0
	});
	searchLies(Intl.DateTimeFormat, {
		constructor: !0
	});
	searchLies(Intl.RelativeTimeFormat, {
		constructor: !0
	});
	searchLies(caniuse(() => AnalyserNode), {
		constructor: !0
	});
	searchLies(caniuse(() => AudioBuffer), {
		constructor: !0
	});
	searchLies(SVGTextContentElement, {
		constructor: !0
	});
	searchLies(CanvasRenderingContext2D, {
		constructor: !0
	});
	searchLies(caniuse(() => OffscreenCanvasRenderingContext2D), {
		constructor: !0
	});
	searchLies(caniuse(() => WebGLRenderingContext), {
		constructor: !0,
		makeXRCompatible: !0, // ignore
	});
	searchLies(caniuse(() => WebGL2RenderingContext), {
		constructor: !0,
		makeXRCompatible: !0, // ignore
	});
	searchLies(Math, {
		constructor: !0
	});
	searchLies(PluginArray, {
		constructor: !0
	});
	searchLies(Plugin, {
		constructor: !0
	});
	searchLies(Document, {
		constructor: !0,
		createElement: !0, // opera fix
		createTextNode: !0, // opera fix
		querySelector: !0 // opera fix
	});

	console.log(`${counter} API properties analyzed in ${(performance.now() - start).toFixed(2)}ms (${Object.keys(lieProps.getProps()).length} corrupted)`);

	const getPluginLies = (plugins, mimeTypes) => {
		const lies = []; // collect lie types
		const pluginsOwnPropertyNames = Object.getOwnPropertyNames(plugins).filter(name => isNaN(+name));
		const mimeTypesOwnPropertyNames = Object.getOwnPropertyNames(mimeTypes).filter(name => isNaN(+name));

		// cast to array
		plugins = [...plugins];
		mimeTypes = [...mimeTypes];

		// get intitial trusted mimeType names
		const trustedMimeTypes = new Set(mimeTypesOwnPropertyNames);

		// get initial trusted plugin names
		const excludeDuplicates = arr => [...new Set(arr)];
		const mimeTypeEnabledPlugins = excludeDuplicates(
			mimeTypes.map(mimeType => mimeType.enabledPlugin)
		);
		const trustedPluginNames = new Set(pluginsOwnPropertyNames);
		const mimeTypeEnabledPluginsNames = mimeTypeEnabledPlugins.map(plugin => plugin.name);
		const trustedPluginNamesArray = [...trustedPluginNames];
		trustedPluginNamesArray.forEach(name => {
			const validName = new Set(mimeTypeEnabledPluginsNames).has(name);
			if (!validName) {
				trustedPluginNames.delete(name);
			}
		});

		// 1. Expect plugin name to be in plugins own property names
		plugins.forEach(plugin => {
			if (!trustedPluginNames.has(plugin.name)) {
				lies.push('missing plugin name');
			}
		});

		// 2. Expect MimeType Plugins to match Plugins
		const getPluginPropertyValues = plugin => {
			return [
				plugin.description,
				plugin.filename,
				plugin.length,
				plugin.name
			]
		};
		const pluginList = plugins.map(getPluginPropertyValues).sort();
		const enabledpluginList = mimeTypeEnabledPlugins.map(getPluginPropertyValues).sort();
		const mismatchingPlugins = '' + pluginList != '' + enabledpluginList;
		if (mismatchingPlugins) {
			lies.push('mismatching plugins');
		}

		// 3. Expect MimeType object in plugins
		const invalidPlugins = plugins.filter(plugin => {
			try {
				const validMimeType = Object.getPrototypeOf(plugin[0]).constructor.name == 'MimeType';
				if (!validMimeType) {
					trustedPluginNames.delete(plugin.name);
				}
				return !validMimeType
			} catch (error) {
				trustedPluginNames.delete(plugin.name);
				return true // sign of tampering
			}
		});
		if (invalidPlugins.length) {
			lies.push('missing mimetype');
		}

		// 4. Expect valid MimeType(s) in plugin
		const pluginMimeTypes = plugins
			.map(plugin => Object.values(plugin))
			.flat();
		const pluginMimeTypesNames = pluginMimeTypes.map(mimetype => mimetype.type);
		pluginMimeTypesNames.forEach(name => {
			const validName = trustedMimeTypes.has(name);
			if (!validName) {
				trustedMimeTypes.delete(name);
			}
		});

		plugins.forEach(plugin => {
			const pluginMimeTypes = Object.values(plugin).map(mimetype => mimetype.type);
			return pluginMimeTypes.forEach(mimetype => {
				if (!trustedMimeTypes.has(mimetype)) {
					lies.push('invalid mimetype');
					return trustedPluginNames.delete(plugin.name)
				}
			})
		});

		return {
			validPlugins: plugins.filter(plugin => trustedPluginNames.has(plugin.name)),
			validMimeTypes: mimeTypes.filter(mimeType => trustedMimeTypes.has(mimeType.type)),
			lies: [...new Set(lies)] // remove duplicates
		}
	};

	const getLies = imports => {

		const {
			require: {
				lieRecords
			}
		} = imports;

		const records = lieRecords.getRecords();
		return new Promise(async resolve => {
			let totalLies = 0;
			records.forEach(lie => {
				if (!!lie.lieTypes.fingerprint) {
					totalLies++;
				}
				if (!!lie.lieTypes.lies) {
					totalLies += lie.lieTypes.lies.length;
				}
			});
			const data = records
				.map(lie => ({ name: lie.name, lieTypes: lie.lieTypes }))
				.sort((a, b) => (a.name > b.name) ? 1 : -1);
			return resolve({ data, totalLies })
		})
	};

	const getOfflineAudioContext = imports => {
		
		const {
			require: {
				hashMini,
				captureError,
				attempt,
				caniuse,
				sendToTrash,
				documentLie,
				lieProps,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(resolve => {
			try {
				const start = performance.now();
				const win = phantomDarkness ? phantomDarkness : window;
				const audioContext = caniuse(() => win.OfflineAudioContext || win.webkitOfflineAudioContext);
				if (!audioContext) {
					logTestResult({ test: 'audio', passed: false });
					return resolve()
				}
				// detect lies
				const channelDataLie = lieProps['AudioBuffer.getChannelData'];
				const copyFromChannelLie = lieProps['AudioBuffer.copyFromChannel'];
				let lied = (channelDataLie || copyFromChannelLie) || false;
				
				const context = new audioContext(1, 44100, 44100);
				const analyser = context.createAnalyser();
				const oscillator = context.createOscillator();
				const dynamicsCompressor = context.createDynamicsCompressor();
				const biquadFilter = context.createBiquadFilter();

				oscillator.type = 'triangle';
				oscillator.frequency.value = 10000;

				if (dynamicsCompressor.threshold) { dynamicsCompressor.threshold.value = -50; }
				if (dynamicsCompressor.knee) { dynamicsCompressor.knee.value = 40; }
				if (dynamicsCompressor.ratio) { dynamicsCompressor.ratio.value = 12; }
				if (dynamicsCompressor.reduction) { dynamicsCompressor.reduction.value = -20; }
				if (dynamicsCompressor.attack) { dynamicsCompressor.attack.value = 0; }
				if (dynamicsCompressor.release) { dynamicsCompressor.release.value = 0.25; }

				oscillator.connect(dynamicsCompressor);
				dynamicsCompressor.connect(context.destination);
				oscillator.start(0);
				context.startRendering();

				const dataArray = new Float32Array(analyser.frequencyBinCount);
				analyser.getFloatFrequencyData(dataArray);
				const floatFrequencyUniqueDataSize = new Set(dataArray).size;
				if (floatFrequencyUniqueDataSize > 1) {
					lied = true;
					const floatFrequencyDataLie = { fingerprint: '', lies: [{ [`Expected 1 unique frequency and got ${floatFrequencyUniqueDataSize}`]: true }] };
					documentLie(`AnalyserNode.getFloatFrequencyData`, floatFrequencyUniqueDataSize, floatFrequencyDataLie);
				}

				let copySample = [];
				let binsSample = [];
				let matching = false;
				
				const values = {
					['AnalyserNode.channelCount']: attempt(() => analyser.channelCount),
					['AnalyserNode.channelCountMode']: attempt(() => analyser.channelCountMode),
					['AnalyserNode.channelInterpretation']: attempt(() => analyser.channelInterpretation),
					['AnalyserNode.context.sampleRate']: attempt(() => analyser.context.sampleRate),
					['AnalyserNode.fftSize']: attempt(() => analyser.fftSize),
					['AnalyserNode.frequencyBinCount']: attempt(() => analyser.frequencyBinCount),
					['AnalyserNode.maxDecibels']: attempt(() => analyser.maxDecibels),
					['AnalyserNode.minDecibels']: attempt(() => analyser.minDecibels),
					['AnalyserNode.numberOfInputs']: attempt(() => analyser.numberOfInputs),
					['AnalyserNode.numberOfOutputs']: attempt(() => analyser.numberOfOutputs),
					['AnalyserNode.smoothingTimeConstant']: attempt(() => analyser.smoothingTimeConstant),
					['AnalyserNode.context.listener.forwardX.maxValue']: attempt(() => {
						const chain = ['context', 'listener', 'forwardX', 'maxValue'];
						return caniuse(() => analyser, chain)
					}),
					['BiquadFilterNode.gain.maxValue']: attempt(() => biquadFilter.gain.maxValue),
					['BiquadFilterNode.frequency.defaultValue']: attempt(() => biquadFilter.frequency.defaultValue),
					['BiquadFilterNode.frequency.maxValue']: attempt(() => biquadFilter.frequency.maxValue),
					['DynamicsCompressorNode.attack.defaultValue']: attempt(() => dynamicsCompressor.attack.defaultValue),
					['DynamicsCompressorNode.knee.defaultValue']: attempt(() => dynamicsCompressor.knee.defaultValue),
					['DynamicsCompressorNode.knee.maxValue']: attempt(() => dynamicsCompressor.knee.maxValue),
					['DynamicsCompressorNode.ratio.defaultValue']: attempt(() => dynamicsCompressor.ratio.defaultValue),
					['DynamicsCompressorNode.ratio.maxValue']: attempt(() => dynamicsCompressor.ratio.maxValue),
					['DynamicsCompressorNode.release.defaultValue']: attempt(() => dynamicsCompressor.release.defaultValue),
					['DynamicsCompressorNode.release.maxValue']: attempt(() => dynamicsCompressor.release.maxValue),
					['DynamicsCompressorNode.threshold.defaultValue']: attempt(() => dynamicsCompressor.threshold.defaultValue),
					['DynamicsCompressorNode.threshold.minValue']: attempt(() => dynamicsCompressor.threshold.minValue),
					['OscillatorNode.detune.maxValue']: attempt(() => oscillator.detune.maxValue),
					['OscillatorNode.detune.minValue']: attempt(() => oscillator.detune.minValue),
					['OscillatorNode.frequency.defaultValue']: attempt(() => oscillator.frequency.defaultValue),
					['OscillatorNode.frequency.maxValue']: attempt(() => oscillator.frequency.maxValue),
					['OscillatorNode.frequency.minValue']: attempt(() => oscillator.frequency.minValue)
				};
				
				return resolve(new Promise(resolve => {
					context.oncomplete = async event => {
						try {
							const copy = new Float32Array(44100);
							caniuse(() => event.renderedBuffer.copyFromChannel(copy, 0));
							const bins = event.renderedBuffer.getChannelData(0);
							
							copySample = copy ? [...copy].slice(4500, 4600) : [sendToTrash('invalid Audio Sample Copy', null)];
							binsSample = bins ? [...bins].slice(4500, 4600) : [sendToTrash('invalid Audio Sample', null)];
							
							const copyJSON = copy && JSON.stringify([...copy].slice(4500, 4600));
							const binsJSON = bins && JSON.stringify([...bins].slice(4500, 4600));

							matching = binsJSON === copyJSON;
							// detect lie
							const copyFromChannelSupported = ('copyFromChannel' in AudioBuffer.prototype);
							if (copyFromChannelSupported && !matching) {
								lied = true;
								const audioSampleLie = { fingerprint: '', lies: [{ ['data and copy samples mismatch']: false }] };
								documentLie('AudioBuffer', matching, audioSampleLie);
							}

							dynamicsCompressor.disconnect();
							oscillator.disconnect();
							const response = {
								binsSample: binsSample,
								copySample: copyFromChannelSupported ? copySample : [undefined],
								values,
								lied
							};
							logTestResult({ start, test: 'audio', passed: true });
							return resolve({ ...response })
						}
						catch (error) {
							captureError(error, 'AudioBuffer failed or blocked by client');
							dynamicsCompressor.disconnect();
							oscillator.disconnect();
							logTestResult({ test: 'audio', passed: false });
							return resolve()
						}
					};
				}))
			}
			catch (error) {
				logTestResult({ test: 'audio', passed: false });
				captureError(error, 'OfflineAudioContext failed or blocked by client');
				return resolve()
			}
		})
	};

	const getCanvas2d = imports => {
		
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
		} = imports;
		
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const dataLie = lieProps['HTMLCanvasElement.toDataURL'];
				const contextLie = lieProps['HTMLCanvasElement.getContext'];
				let lied = (dataLie || contextLie) || false;
				const doc = phantomDarkness ? phantomDarkness.document : document;
				const canvas = doc.createElement('canvas');
				const context = canvas.getContext('2d');
				const str = '!😃🙌🧠👩‍💻👟👧🏻👩🏻‍🦱👩🏻‍🦰👱🏻‍♀️👩🏻‍🦳👧🏼👧🏽👧🏾👧🏿🦄🐉🌊🍧🏄‍♀️🌠🔮♞';
				context.font = '14px Arial';
				context.fillText(str, 0, 50);
				context.fillStyle = 'rgba(100, 200, 99, 0.78)';
				context.fillRect(100, 30, 80, 50);
				const dataURI = canvas.toDataURL();
				if (dragonOfDeath) {
					const result1 = dragonOfDeath.document.createElement('canvas').toDataURL();
					const result2 = document.createElement('canvas').toDataURL();
					if (result1 != result2) {
						lied = true;
						const iframeLie = { fingerprint: '', lies: [{ [`Expected ${result1} in nested iframe and got ${result2}`]: true }] };
						documentLie(`HTMLCanvasElement.toDataURL`, undefined, iframeLie);
					}
				}
				const response = { dataURI, lied };
				logTestResult({ start, test: 'canvas 2d', passed: true });
				return resolve(response)
			}
			catch (error) {
				logTestResult({ test: 'canvas 2d', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getCanvasWebgl = imports => {

		const {
			require: {
				captureError,
				attempt,
				caniuse,
				gibberish,
				sendToTrash,
				proxyBehavior,
				lieProps,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				// detect lies
				const dataLie = lieProps['HTMLCanvasElement.toDataURL'];
				const contextLie = lieProps['HTMLCanvasElement.getContext'];
				let lied = (
					dataLie ||
					contextLie ||
					lieProps['WebGLRenderingContext.getParameter'] ||
					lieProps['WebGL2RenderingContext.getParameter'] ||
					lieProps['WebGLRenderingContext.getExtension'] ||
					lieProps['WebGL2RenderingContext.getExtension'] ||
					lieProps['WebGLRenderingContext.getSupportedExtensions'] ||
					lieProps['WebGL2RenderingContext.getSupportedExtensions']
				) || false;
				if (phantomDarkness &&
					phantomDarkness.document.createElement('canvas').toDataURL() != document.createElement('canvas').toDataURL()) {
					lied = true;
				}
				// create canvas context
				const doc = (
					phantomDarkness ? phantomDarkness.document : 
					document
				);
				const canvas = doc.createElement('canvas');
				const canvas2 = doc.createElement('canvas');
				const context = (
					canvas.getContext('webgl') ||
					canvas.getContext('experimental-webgl') ||
					canvas.getContext('moz-webgl') ||
					canvas.getContext('webkit-3d')
				);
				const context2 = canvas2.getContext('webgl2') || canvas2.getContext('experimental-webgl2');
				const getSupportedExtensions = context => {
					try {
						if (!context) {
							return { extensions: [] }
						}
						const extensions = caniuse(() => context, ['getSupportedExtensions'], [], true) || [];
						return {
							extensions
						}
					}
					catch (error) {
						captureError(error);
						return {
							extensions: []
						}
					}
				};

				const getSpecs = (webgl, webgl2) => {
					const getShaderPrecisionFormat = (gl, shaderType) => {
						const low = attempt(() => gl.getShaderPrecisionFormat(gl[shaderType], gl.LOW_FLOAT));
						const medium = attempt(() => gl.getShaderPrecisionFormat(gl[shaderType], gl.MEDIUM_FLOAT));
						const high = attempt(() => gl.getShaderPrecisionFormat(gl[shaderType], gl.HIGH_FLOAT));
						const highInt = attempt(() => gl.getShaderPrecisionFormat(gl[shaderType], gl.HIGH_INT));
						return { low, medium, high, highInt }
					};
					const getMaxAnisotropy = gl => {
						const ext = (
							gl.getExtension('EXT_texture_filter_anisotropic') ||
							gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
							gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
						);
						return ext ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : undefined
					};
					
					const getShaderData = (name, shader) => {
						const data = {};
						for (const prop in shader) {
							const obj = shader[prop];
							data[name+'.'+prop+'.precision'] = obj ? attempt(() => obj.precision) : undefined;
							data[name+'.'+prop+'.rangeMax'] = obj ? attempt(() => obj.rangeMax) : undefined;
							data[name+'.'+prop+'.rangeMin'] = obj ? attempt(() => obj.rangeMin) : undefined;
						}
						return data
					};
					const getWebglSpecs = gl => {
						if (!caniuse(() => gl, ['getParameter'])) {
							return undefined
						}
						const data =  {
							VERSION: gl.getParameter(gl.VERSION),
							SHADING_LANGUAGE_VERSION: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
							antialias: gl.getContextAttributes() ? gl.getContextAttributes().antialias : undefined,
							RED_BITS: gl.getParameter(gl.RED_BITS),
							GREEN_BITS: gl.getParameter(gl.GREEN_BITS),
							BLUE_BITS: gl.getParameter(gl.BLUE_BITS),
							ALPHA_BITS: gl.getParameter(gl.ALPHA_BITS),
							DEPTH_BITS: gl.getParameter(gl.DEPTH_BITS),
							STENCIL_BITS: gl.getParameter(gl.STENCIL_BITS),
							MAX_RENDERBUFFER_SIZE: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
							MAX_COMBINED_TEXTURE_IMAGE_UNITS: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
							MAX_CUBE_MAP_TEXTURE_SIZE: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
							MAX_FRAGMENT_UNIFORM_VECTORS: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
							MAX_TEXTURE_IMAGE_UNITS: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
							MAX_TEXTURE_SIZE: gl.getParameter(gl.MAX_TEXTURE_SIZE),
							MAX_VARYING_VECTORS: gl.getParameter(gl.MAX_VARYING_VECTORS),
							MAX_VERTEX_ATTRIBS: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
							MAX_VERTEX_TEXTURE_IMAGE_UNITS: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
							MAX_VERTEX_UNIFORM_VECTORS: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
							ALIASED_LINE_WIDTH_RANGE: [...gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)],
							ALIASED_POINT_SIZE_RANGE: [...gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)],
							MAX_VIEWPORT_DIMS: attempt(() => [...gl.getParameter(gl.MAX_VIEWPORT_DIMS)]),
							MAX_TEXTURE_MAX_ANISOTROPY_EXT: getMaxAnisotropy(gl),
							...getShaderData('VERTEX_SHADER', getShaderPrecisionFormat(gl, 'VERTEX_SHADER')),
							...getShaderData('FRAGMENT_SHADER', getShaderPrecisionFormat(gl, 'FRAGMENT_SHADER')),
							MAX_DRAW_BUFFERS_WEBGL: attempt(() => {
								const buffers = gl.getExtension('WEBGL_draw_buffers');
								return buffers ? gl.getParameter(buffers.MAX_DRAW_BUFFERS_WEBGL) : undefined
							})
						};
						const response = data;
						return response
					};

					const getWebgl2Specs = gl => {
						if (!caniuse(() => gl, ['getParameter'])) {
							return undefined
						}
						const data = {
							MAX_VERTEX_UNIFORM_COMPONENTS: gl.getParameter(gl.MAX_VERTEX_UNIFORM_COMPONENTS),
							MAX_VERTEX_UNIFORM_BLOCKS: gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS),
							MAX_VERTEX_OUTPUT_COMPONENTS: gl.getParameter(gl.MAX_VERTEX_OUTPUT_COMPONENTS),
							MAX_VARYING_COMPONENTS: gl.getParameter(gl.MAX_VARYING_COMPONENTS),
							MAX_FRAGMENT_UNIFORM_COMPONENTS: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_COMPONENTS),
							MAX_FRAGMENT_UNIFORM_BLOCKS: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_BLOCKS),
							MAX_FRAGMENT_INPUT_COMPONENTS: gl.getParameter(gl.MAX_FRAGMENT_INPUT_COMPONENTS),
							MIN_PROGRAM_TEXEL_OFFSET: gl.getParameter(gl.MIN_PROGRAM_TEXEL_OFFSET),
							MAX_PROGRAM_TEXEL_OFFSET: gl.getParameter(gl.MAX_PROGRAM_TEXEL_OFFSET),
							MAX_DRAW_BUFFERS: gl.getParameter(gl.MAX_DRAW_BUFFERS),
							MAX_COLOR_ATTACHMENTS: gl.getParameter(gl.MAX_COLOR_ATTACHMENTS),
							MAX_SAMPLES: gl.getParameter(gl.MAX_SAMPLES),
							MAX_3D_TEXTURE_SIZE: gl.getParameter(gl.MAX_3D_TEXTURE_SIZE),
							MAX_ARRAY_TEXTURE_LAYERS: gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS),
							MAX_TEXTURE_LOD_BIAS: gl.getParameter(gl.MAX_TEXTURE_LOD_BIAS),
							MAX_UNIFORM_BUFFER_BINDINGS: gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS),
							MAX_UNIFORM_BLOCK_SIZE: gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE),
							UNIFORM_BUFFER_OFFSET_ALIGNMENT: gl.getParameter(gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT),
							MAX_COMBINED_UNIFORM_BLOCKS: gl.getParameter(gl.MAX_COMBINED_UNIFORM_BLOCKS),
							MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: gl.getParameter(gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS),
							MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: gl.getParameter(gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS),
							MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: gl.getParameter(gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),
							MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: gl.getParameter(gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS),
							MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: gl.getParameter(gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS),
							MAX_ELEMENT_INDEX: gl.getParameter(gl.MAX_ELEMENT_INDEX),
							MAX_SERVER_WAIT_TIMEOUT: gl.getParameter(gl.MAX_SERVER_WAIT_TIMEOUT)
						};
						const response = data;
						return response
					};
					const data = { webglSpecs: getWebglSpecs(webgl), webgl2Specs: getWebgl2Specs(webgl2) };
					return data
				};

				const getUnmasked = (context, [rendererTitle, vendorTitle]) => {
					try {
						if (!context) {
							return {
								vendor: undefined,
								renderer: undefined
							}
						}
						const extension = caniuse(() => context, ['getExtension'], ['WEBGL_debug_renderer_info'], true);
						const vendor = extension && context.getParameter(extension.UNMASKED_VENDOR_WEBGL);
						const renderer = extension && context.getParameter(extension.UNMASKED_RENDERER_WEBGL);
						const validate = (value, title) => {
							const gibbers = gibberish(value);
							if (!!gibbers.length) {	
								sendToTrash(`${title} contains gibberish`, `[${gibbers.join(', ')}] ${value}`);	
							}
							return (
								!proxyBehavior(value) ? value : 
								sendToTrash(title, 'proxy behavior detected')
							)
						};
						return {
							vendor: validate(vendor, vendorTitle),
							renderer: validate(renderer, rendererTitle)
						}
					}
					catch (error) {
						captureError(error);
						return {
							vendor: undefined,
							renderer: undefined
						}
					}
				};
				const getDataURL = (canvas, context) => {
					try {
						const colorBufferBit = caniuse(() => context, ['COLOR_BUFFER_BIT']);
						caniuse(() => context, ['clearColor'], [0.2, 0.4, 0.6, 0.8], true);
						caniuse(() => context, ['clear'], [colorBufferBit], true);
						const canvasWebglDataURI = canvas.toDataURL();
						const dataURI = canvasWebglDataURI;
						return dataURI
					}
					catch (error) {
						captureError(error);
						return
					}
				};

				const supported = getSupportedExtensions(context);
				const supported2 = getSupportedExtensions(context2);
				const unmasked = getUnmasked(context, ['webgl renderer', 'webgl vendor']);
				const unmasked2 = getUnmasked(context2, ['webgl2 renderer', 'webgl2 vendor']);
				const dataURI = getDataURL(canvas, context);
				const dataURI2 = getDataURL(canvas2, context2);
				const specs = getSpecs(context, context2);

				const data = {
					supported,
					supported2,
					unmasked,
					unmasked2,
					dataURI,
					dataURI2,
					specs,
					lied
				};
				data.matchingUnmasked = JSON.stringify(data.unmasked) === JSON.stringify(data.unmasked2);
				data.matchingDataURI = data.dataURI === data.dataURI2;
				logTestResult({ start, test: 'webgl', passed: true });
				return resolve({ ...data })
			}
			catch (error) {
				logTestResult({ test: 'webgl', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const computeStyle = (type, { require: [ captureError ] }) => {
		try {
			// get CSSStyleDeclaration
			const cssStyleDeclaration = (
				type == 'getComputedStyle' ? getComputedStyle(document.body) :
				type == 'HTMLElement.style' ? document.body.style :
				type == 'CSSRuleList.style' ? document.styleSheets[0].cssRules[0].style :
				undefined
			);
			if (!cssStyleDeclaration) {
				throw new TypeError('invalid argument string')
			}
			// get properties
			const prototype = Object.getPrototypeOf(cssStyleDeclaration);
			const prototypeProperties = Object.getOwnPropertyNames(prototype);
			const ownEnumerablePropertyNames = [];
			const cssVar = /^--.*$/;
			Object.keys(cssStyleDeclaration).forEach(key => {
				const numericKey = !isNaN(key);
				const value = cssStyleDeclaration[key];
				const customPropKey = cssVar.test(key);
				const customPropValue = cssVar.test(value);
				if (numericKey && !customPropValue) {
					return ownEnumerablePropertyNames.push(value)
				} else if (!numericKey && !customPropKey) {
					return ownEnumerablePropertyNames.push(key)
				}
				return
			});
			// get properties in prototype chain (required only in chrome)
			const propertiesInPrototypeChain = {};
			const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
			const uncapitalize = str => str.charAt(0).toLowerCase() + str.slice(1);
			const removeFirstChar = str => str.slice(1);
			const caps = /[A-Z]/g;
			ownEnumerablePropertyNames.forEach(key => {
				if (propertiesInPrototypeChain[key]) {
					return
				}
				// determine attribute type
				const isNamedAttribute = key.indexOf('-') > -1;
				const isAliasAttribute = caps.test(key);
				// reduce key for computation
				const firstChar = key.charAt(0);
				const isPrefixedName = isNamedAttribute && firstChar == '-';
				const isCapitalizedAlias = isAliasAttribute && firstChar == firstChar.toUpperCase();
				key = (
					isPrefixedName ? removeFirstChar(key) :
					isCapitalizedAlias ? uncapitalize(key) :
					key
				);
				// find counterpart in CSSStyleDeclaration object or its prototype chain
				if (isNamedAttribute) {
					const aliasAttribute = key.split('-').map((word, index) => index == 0 ? word : capitalize(word)).join('');
					if (aliasAttribute in cssStyleDeclaration) {
						propertiesInPrototypeChain[aliasAttribute] = true;
					} else if (capitalize(aliasAttribute) in cssStyleDeclaration) {
						propertiesInPrototypeChain[capitalize(aliasAttribute)] = true;
					}
				} else if (isAliasAttribute) {
					const namedAttribute = key.replace(caps, char => '-' + char.toLowerCase());
					if (namedAttribute in cssStyleDeclaration) {
						propertiesInPrototypeChain[namedAttribute] = true;
					} else if (`-${namedAttribute}` in cssStyleDeclaration) {
						propertiesInPrototypeChain[`-${namedAttribute}`] = true;
					}
				}
				return
			});
			// compile keys
			const keys = [
				...new Set([
					...prototypeProperties,
					...ownEnumerablePropertyNames,
					...Object.keys(propertiesInPrototypeChain)
				])
			];
			// checks
			const moz = keys.filter(key => (/moz/i).test(key)).length;
			const webkit = keys.filter(key => (/webkit/i).test(key)).length;
			const apple = keys.filter(key => (/apple/i).test(key)).length;
			const prototypeName = (''+prototype).match(/\[object (.+)\]/)[1];
		
			const data = { keys: keys.sort(), moz, webkit, apple, prototypeName };
			return { ...data }
		}
		catch (error) {
			captureError(error);
			return
		}
	};

	const getSystemStyles = (instanceId, { require: [ captureError, parentPhantom ] }) => {
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
			];
			const fonts = [
				'caption',
				'icon',
				'menu',
				'message-box',
				'small-caption',
				'status-bar'
			];

			let rendered;
			if (!parentPhantom) {
				const id = 'creep-system-styles';
				const el = document.createElement('div');
				el.setAttribute('id', id);
				document.body.append(el);
				rendered = document.getElementById(id);
			}
			else {
				rendered = parentPhantom;
			}
			const system = {
				colors: [],
				fonts: []
			};
			system.colors = colors.map(color => {
				rendered.setAttribute('style', `background-color: ${color} !important`);
				return {
					[color]: getComputedStyle(rendered).backgroundColor
				}
			});
			fonts.forEach(font => {
				rendered.setAttribute('style', `font: ${font} !important`);
				system.fonts.push({
					[font]: getComputedStyle(rendered).font
				});
			});
			if (!parentPhantom) {
				rendered.parentNode.removeChild(rendered);
			}
			return { ...system }
		}
		catch (error) {
			captureError(error);
			return
		}
	};

	const getCSS = imports => {

		const {
			require: {
				instanceId,
				captureError,
				logTestResult,
				parentPhantom
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const computedStyle = computeStyle('getComputedStyle', { require: [ captureError ] });
				const system = getSystemStyles(instanceId, { require: [ captureError, parentPhantom ] });
				const data = {
					['getComputedStyle']: computedStyle,
					system
				};
				logTestResult({ start, test: 'computed style', passed: true });
				return resolve({ ...data })
			}
			catch (error) {
				logTestResult({ test: 'computed style', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const gcd = (a, b) => b == 0 ? a : gcd(b, a%b);

	const getAspectRatio = (width, height) => {
		const r = gcd(width, height);
		const aspectRatio = `${width/r}/${height/r}`;
		return aspectRatio
	};

	const query = ({ body, type, rangeStart, rangeLen }) => {
		body.innerHTML = `
		<style>
			${[...Array(rangeLen)].map((slot,i) => {
				i += rangeStart;
				return `
					@media (device-${type}: ${i}px) {body {--device-${type}: ${i};}}
				`
			}).join('')}
		</style>
	`;
		const style = getComputedStyle(body);
		return style.getPropertyValue(`--device-${type}`).trim()
	};

	const getScreenMedia = body => {
		let i, widthMatched, heightMatched;
		for (i = 0; i < 10; i++) {
			let resWidth, resHeight;
			if (!widthMatched) {
				resWidth = query({ body, type: 'width', rangeStart: i*1000, rangeLen: 1000});
				if (resWidth) {
					widthMatched = resWidth;
				}
			}
			if (!heightMatched) {
				resHeight = query({ body, type: 'height', rangeStart: i*1000, rangeLen: 1000});
				if (resHeight) {
					heightMatched = resHeight;
				}
			}
			if (widthMatched && heightMatched) {
				break
			}	
		}
		return { width: +widthMatched, height: +heightMatched }
	};

	const getScreenMatchMedia = win => {
		let widthMatched, heightMatched;
		for (let i = 0; i < 10; i++) {
			let resWidth, resHeight;
			if (!widthMatched) {
				let rangeStart = i*1000;
				const rangeLen = 1000;
				for (let i = 0; i < rangeLen; i++) {
					if (win.matchMedia(`(device-width:${rangeStart}px)`).matches) {
						resWidth = rangeStart;
						break
					}
					rangeStart++;
				}
				if (resWidth) {
					widthMatched = resWidth;
				}
			}
			if (!heightMatched) {
				let rangeStart = i*1000;
				const rangeLen = 1000;
				for (let i = 0; i < rangeLen; i++) {
					if (win.matchMedia(`(device-height:${rangeStart}px)`).matches) {
						resHeight = rangeStart;
						break
					}
					rangeStart++;
				}
				if (resHeight) {
					heightMatched = resHeight;
				}
			}
			if (widthMatched && heightMatched) {
				break
			}	
		}
		return { width: widthMatched, height: heightMatched }
	};

	const getCSSMedia = imports => {

		const {
			require: {
				captureError,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const win = phantomDarkness.window;
				
				const { body } = win.document;
				const { width, height } = win.screen;
				
				const deviceAspectRatio = getAspectRatio(width, height);
				body.innerHTML = `
			<style>
			/* device */
			@media (prefers-reduced-motion: no-preference) {body {--prefers-reduced-motion: no-preference;}}
			@media (prefers-reduced-motion: reduce) {body {--prefers-reduced-motion: reduce;}}

			@media (prefers-color-scheme: light) {body {--prefers-color-scheme: light;}}
			@media (prefers-color-scheme: dark) {body {--prefers-color-scheme: dark;}}
			
			@media (monochrome) {body {--monochrome: monochrome;}}
			@media (monochrome: 0) {body {--monochrome: non-monochrome;}}

			@media (inverted-colors: inverted) {body {--inverted-colors: inverted;}}
			@media (inverted-colors: none) {body {--inverted-colors: none;}}

			@media (forced-colors: none) {body {--forced-colors: none;}}
			@media (forced-colors: active) {body {--forced-colors: active;}}

			/* input mechanisms */
			@media (any-hover: hover) {body {--any-hover: hover;}}
			@media (any-hover: none) {body {--any-hover: none;}}
			
			@media (hover: hover) {body {--hover: hover;}}
			@media (hover: none) {body {--hover: none;}}
			
			@media (any-pointer: fine) {body {--any-pointer: fine;}}
			@media (any-pointer: coarse) {body {--any-pointer: coarse;}}
			@media (any-pointer: none) {body {--any-pointer: none;}}
			
			@media (pointer: fine) {body {--pointer: fine;}}
			@media (pointer: coarse) {body {--pointer: coarse;}}
			@media (pointer: none) {body {--pointer: none;}}

			@media (device-aspect-ratio: ${deviceAspectRatio}) {body {--device-aspect-ratio: ${deviceAspectRatio};}}
			@media (device-width: ${width}px) and (device-height: ${height}px) {body {--device-screen: ${width} x ${height};}}
			@media (display-mode: fullscreen) {body {--display-mode: fullscreen;}}
			@media (display-mode: standalone) {body {--display-mode: standalone;}}
			@media (display-mode: minimal-ui) {body {--display-mode: minimal-ui;}}
			@media (display-mode: browser) {body {--display-mode: browser;}}

			@media (color-gamut: srgb) {body {--color-gamut: srgb;}}
			@media (color-gamut: p3) {body {--color-gamut: p3;}}
			@media (color-gamut: rec2020) {body {--color-gamut: rec2020;}}

			@media (orientation: landscape) {body {--orientation: landscape;}}
			@media (orientation: portrait) {body {--orientation: portrait;}}

			</style>
			`;
				const matchMediaCSS = {
					reducedMotion: (
						win.matchMedia('(prefers-reduced-motion: no-preference)').matches ?
						'no-preference' :
						win.matchMedia('(prefers-reduced-motion: reduce)').matches ?
						'reduce' : undefined
					),
					colorScheme: (
						win.matchMedia('(prefers-color-scheme: light)').matches ?
						'light' :
						win.matchMedia('(prefers-color-scheme: dark)').matches ?
						'dark' : undefined
					),
					monochrome: (
						win.matchMedia('(monochrome)').matches ?
						'monochrome' :
						win.matchMedia('(monochrome: 0)').matches ?
						'non-monochrome' : undefined
					),
					invertedColors: (
						win.matchMedia('(inverted-colors: inverted)').matches ?
						'inverted' :
						win.matchMedia('(inverted-colors: none)').matches ?
						'none' : undefined
					),
					forcedColors: (
						win.matchMedia('(forced-colors: none)').matches ?
						'none' :
						win.matchMedia('(forced-colors: active)').matches ?
						'active' : undefined
					),
					anyHover: (
						win.matchMedia('(any-hover: hover)').matches ?
						'hover' :
						win.matchMedia('(any-hover: none)').matches ?
						'none' : undefined
					),
					hover: (
						win.matchMedia('(hover: hover)').matches ?
						'hover' :
						win.matchMedia('(hover: none)').matches ?
						'none' : undefined
					),
					anyPointer: (
						win.matchMedia('(any-pointer: fine)').matches ?
						'fine' :
						win.matchMedia('(any-pointer: coarse)').matches ?
						'coarse' :
						win.matchMedia('(any-pointer: none)').matches ?
						'none' : undefined
					),
					pointer: (
						win.matchMedia('(pointer: fine)').matches ?
						'fine' :
						win.matchMedia('(pointer: coarse)').matches ?
						'coarse' :
						win.matchMedia('(pointer: none)').matches ?
						'none' : undefined
					),
					deviceAspectRatio: (
						win.matchMedia(`(device-aspect-ratio: ${deviceAspectRatio})`).matches ?
						deviceAspectRatio : undefined
					),
					deviceScreen: (
						win.matchMedia(`(device-width: ${width}px) and (device-height: ${height}px)`).matches ?
						`${width} x ${height}` : undefined
					),
					displayMode: (
						win.matchMedia('(display-mode: fullscreen)').matches ?
						'fullscreen' :
						win.matchMedia('(display-mode: standalone)').matches ?
						'standalone' :
						win.matchMedia('(display-mode: minimal-ui)').matches ?
						'minimal-ui' :
						win.matchMedia('(display-mode: browser)').matches ?
						'browser' : undefined
					),
					colorGamut: (
						win.matchMedia('(color-gamut: srgb)').matches ?
						'srgb' :
						win.matchMedia('(color-gamut: p3)').matches ?
						'p3' :
						win.matchMedia('(color-gamut: rec2020)').matches ?
						'rec2020' : undefined
					),
					orientation: (
						win.matchMedia('(orientation: landscape)').matches ?
						'landscape' :
						win.matchMedia('(orientation: portrait)').matches ?
						'portrait' : undefined
					),
					screenQuery: getScreenMatchMedia(win)
				};

				const style = getComputedStyle(body);
				const mediaCSS = {
					reducedMotion: style.getPropertyValue('--prefers-reduced-motion').trim() || undefined,
					colorScheme: style.getPropertyValue('--prefers-color-scheme').trim() || undefined,
					monochrome: style.getPropertyValue('--monochrome').trim() || undefined,
					invertedColors: style.getPropertyValue('--inverted-colors').trim() || undefined,
					forcedColors: style.getPropertyValue('--forced-colors').trim() || undefined,
					anyHover: style.getPropertyValue('--any-hover').trim() || undefined,
					hover: style.getPropertyValue('--hover').trim() || undefined,
					anyPointer: style.getPropertyValue('--any-pointer').trim() || undefined,
					pointer: style.getPropertyValue('--pointer').trim() || undefined,
					deviceAspectRatio: style.getPropertyValue('--device-aspect-ratio').trim() || undefined,
					deviceScreen: style.getPropertyValue('--device-screen').trim() || undefined,
					displayMode: style.getPropertyValue('--display-mode').trim() || undefined,
					colorGamut: style.getPropertyValue('--color-gamut').trim() || undefined,
					orientation: style.getPropertyValue('--orientation').trim() || undefined,
					screenQuery: getScreenMedia(body)
				};

				logTestResult({ start, test: 'css media', passed: true });
				return resolve({ mediaCSS, matchMediaCSS })
			}
			catch (error) {
				logTestResult({ test: 'css media', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getErrors = errFns => {
		const errors = [];
		let i, len = errFns.length;
		for (i = 0; i < len; i++) {
			try {
				errFns[i]();
			} catch (err) {
				errors.push(err.message);
			}
		}
		return errors
	};
	const getConsoleErrors = imports => {

		const {
			require: {
				hashify,
				captureError,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const errorTests = [
					() => new Function('alert(")')(),
					() => new Function('const foo;foo.bar')(),
					() => new Function('null.bar')(),
					() => new Function('abc.xyz = 123')(),
					() => new Function('const foo;foo.bar')(),
					() => new Function('(1).toString(1000)')(),
					() => new Function('[...undefined].length')(),
					() => new Function('var x = new Array(-1)')(),
					() => new Function('const a=1; const a=2;')()
				];
				const errors = getErrors(errorTests);
				logTestResult({ start, test: 'console errors', passed: true });
				return resolve({ errors })
			}
			catch (error) {
				logTestResult({ test: 'console errors', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getWindowFeatures = imports => {

		const {
			require: {
				hashify,
				captureError,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const keys = Object.getOwnPropertyNames(phantomDarkness);
				const moz = keys.filter(key => (/moz/i).test(key)).length;
				const webkit = keys.filter(key => (/webkit/i).test(key)).length;
				const apple = keys.filter(key => (/apple/i).test(key)).length;
				const data = { keys, apple, moz, webkit }; 
				logTestResult({ start, test: 'window', passed: true });
				return resolve({ ...data })
			}
			catch (error) {
				logTestResult({ test: 'window', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	// inspired by Lalit Patel's fontdetect.js
	// https://www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3

	const getTextMetrics = (context, font) => {
		context.font = `256px ${font}`;
		const metrics = context.measureText('mmmmmmmmmmlli');
		return {
			ascent: Math.round(metrics.actualBoundingBoxAscent),
			descent: Math.round(metrics.actualBoundingBoxDescent),
			left: Math.round(metrics.actualBoundingBoxLeft),
			right: Math.round(metrics.actualBoundingBoxRight),
			width: Math.round(metrics.width),
			fontAscent: Math.round(metrics.fontBoundingBoxAscent),
			fontDescent: Math.round(metrics.fontBoundingBoxDescent)
		}
	};
	const getFonts = (imports, fonts) => {

		const {
			require: {
				captureError,
				lieProps,
				documentLie,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const win = phantomDarkness ? phantomDarkness : window;
				const doc = win.document;
				const offscreenCanvas = win.OffscreenCanvas;
				const context = (
					('OffscreenCanvas' in window) ?
					new offscreenCanvas(500, 200).getContext('2d') :
					doc.createElement('canvas').getContext('2d')
				);

				if (!context) {
					throw new Error(`Context blocked or not supported`) 
				}

				const baseFonts = ['monospace', 'sans-serif', 'serif'];
				const families = fonts.reduce((acc, font) => {
					baseFonts.forEach(baseFont => acc.push(`'${font}', ${baseFont}`));
					return acc
				}, []);

				const detected = new Set();
				const base = baseFonts.reduce((acc, font) => {
					acc[font] = getTextMetrics(context, font); 
					return acc
				}, {});
				families.forEach(family => {
					const basefont = /, (.+)/.exec(family)[1];
					const dimensions = getTextMetrics(context, family); 
					const font = /\'(.+)\'/.exec(family)[1];
					const support = (
						dimensions.ascent != base[basefont].ascent ||
						dimensions.descent != base[basefont].descent ||
						dimensions.left != base[basefont].left ||
						dimensions.right != base[basefont].right ||
						dimensions.width != base[basefont].width
					);
					const extraSupport = (
						dimensions.fontAscent != base[basefont].fontAscent ||
						dimensions.fontDescent != base[basefont].fontDescent
					);
					if (((!isNaN(dimensions.ascent) && !isNaN(dimensions.fontAscent)) && (support || extraSupport)) ||
						(!isNaN(dimensions.ascent) && support)) {
	                    detected.add(font);
	                }
					return
				});
				const lied = (
					(('OffscreenCanvas' in window) && lieProps['OffscreenCanvasRenderingContext2D.measureText']) ||
					(!('OffscreenCanvas' in window) && lieProps['CanvasRenderingContext2D.measureText'])
				);
				logTestResult({ start, test: 'fonts', passed: true });
				return resolve({ fonts: [...detected], lied })
			} catch (error) {
				logTestResult({ test: 'fonts', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const fontList = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];

	const getHTMLElementVersion = imports => {

		const {
			require: {
				captureError,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const keys = [];
				for (const key in document.documentElement) {
					keys.push(key);
				}
				logTestResult({ start, test: 'html element', passed: true });
				return resolve({ keys })
			}
			catch (error) {
				logTestResult({ test: 'html element', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getMaths = imports => {

		const {
			require: {
				hashMini,
				captureError,
				attempt,
				documentLie,
				lieProps,
				phantomDarkness,
				logTestResult						
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				// detect failed math equality lie
				const check = [
					'acos',
					'acosh',
					'asin',
					'asinh',
					'atan',
					'atanh',
					'atan2',
					'cbrt',
					'cos',
					'cosh',
					'expm1',
					'exp',
					'hypot',
					'log',
					'log1p',
					'log10',
					'sin',
					'sinh',
					'sqrt',
					'tan',
					'tanh',
					'pow'
				];
				let lied = false;
				check.forEach(prop => {
					if (!!lieProps[`Math.${prop}`]) {
						lied = true;
					}
					const test = (
						prop == 'cos' ? [1e308] :
						prop == 'acos' || prop == 'asin' || prop == 'atanh' ? [0.5] :
						prop == 'pow' || prop == 'atan2' ? [Math.PI, 2] : 
						[Math.PI]
					);
					const res1 = Math[prop](...test);
					const res2 = Math[prop](...test);
					const matching = isNaN(res1) && isNaN(res2) ? true : res1 == res2;
					if (!matching) {
						lied = true;
						const mathLie = { fingerprint: '', lies: [{ [`Expected ${res1} and got ${res2}`]: true }] };
						documentLie(`Math.${prop}`, hashMini({res1, res2}), mathLie);
					}
					return
				});
				

				const n = 0.123;
				const bigN = 5.860847362277284e+38;
				const fns = [
					['acos', [n], `acos(${n})`, 1.4474840516030247, NaN, NaN, 1.4474840516030245],
					['acos', [Math.SQRT1_2], 'acos(Math.SQRT1_2)', 0.7853981633974483, NaN, NaN, NaN],
					
					['acosh', [1e308], 'acosh(1e308)', 709.889355822726, NaN, NaN, NaN],
					['acosh', [Math.PI], 'acosh(Math.PI)', 1.811526272460853, NaN, NaN, NaN],
					['acosh', [Math.SQRT2], 'acosh(Math.SQRT2)', 0.881373587019543, NaN, NaN, 0.8813735870195432],

					['asin', [n], `asin(${n})`, 0.12331227519187199, NaN, NaN, NaN],

					['asinh', [1e300], 'asinh(1e308)', 691.4686750787736, NaN, NaN, NaN],
					['asinh', [Math.PI], 'asinh(Math.PI)', 1.8622957433108482, NaN, NaN, NaN],

					['atan', [2], 'atan(2)', 1.1071487177940904, NaN, NaN, 1.1071487177940906],
					['atan', [Math.PI], 'atan(Math.PI)', 1.2626272556789115, NaN, NaN, NaN],

					['atanh', [0.5], 'atanh(0.5)', 0.5493061443340548, NaN, NaN, 0.5493061443340549],

					['atan2', [1e-310, 2], 'atan2(1e-310, 2)', 5e-311, NaN, NaN, NaN],
					['atan2', [Math.PI, 2], 'atan2(Math.PI)', 1.0038848218538872, NaN, NaN, NaN],

					['cbrt', [100], 'cbrt(100)', 4.641588833612779, NaN, NaN, NaN],
					['cbrt', [Math.PI], 'cbrt(Math.PI)', 1.4645918875615231, NaN, NaN, 1.4645918875615234],
					
					['cos', [n], `cos(${n})`, 0.9924450321351935, NaN, NaN, NaN],
					['cos', [Math.PI], 'cos(Math.PI)', -1, NaN, NaN, NaN],
					['cos', [bigN], `cos(${bigN})`, -0.10868049424995659, NaN, -0.9779661551196617, NaN],
					['cos', [-1e308], 'cos(-1e308)', -0.8913089376870335, NaN, 0.99970162388838, NaN],
					['cos', [13*Math.E], 'cos(13*Math.E)', -0.7108118501064331, -0.7108118501064332, NaN, NaN],
					['cos', [57*Math.E], 'cos(57*Math.E)', -0.536911695749024, -0.5369116957490239, NaN, NaN],
					['cos', [21*Math.LN2], 'cos(21*Math.LN2)', -0.4067775970251724, -0.40677759702517235, -0.6534063185820197, NaN],
					['cos', [51*Math.LN2], 'cos(51*Math.LN2)', -0.7017203400855446, -0.7017203400855445, NaN, NaN],
					['cos', [21*Math.LOG2E], 'cos(21*Math.LOG2E)', 0.4362848063618998, 0.43628480636189976, NaN, NaN],
					['cos', [25*Math.SQRT2], 'cos(25*Math.SQRT2)', -0.6982689820462377, -0.6982689820462376, NaN, NaN],
					['cos', [50*Math.SQRT1_2], 'cos(50*Math.SQRT1_2)', -0.6982689820462377, -0.6982689820462376, NaN, NaN],
					['cos', [21*Math.SQRT1_2], 'cos(21*Math.SQRT1_2)', -0.6534063185820198, NaN, NaN, NaN],
					['cos', [17*Math.LOG10E], 'cos(17*Math.LOG10E)', 0.4537557425982784, 0.45375574259827833, NaN, NaN],
					['cos', [2*Math.LOG10E], 'cos(2*Math.LOG10E)', 0.6459044007438142, NaN, 0.6459044007438141, NaN],

					['cosh', [1], 'cosh(1)', 1.5430806348152437, NaN, NaN, NaN],
					['cosh', [Math.PI], 'cosh(Math.PI)', 11.591953275521519, NaN, NaN, NaN],
					['cosh', [492*Math.LOG2E], 'cosh(492*Math.LOG2E)', 9.199870313877772e+307, 9.199870313877774e+307, NaN, NaN],
					['cosh', [502*Math.SQRT2], 'cosh(502*Math.SQRT2)', 1.0469199669023138e+308, 1.046919966902314e+308, NaN, NaN],

					['expm1', [1], 'expm1(1)', 1.718281828459045, NaN, NaN, 1.7182818284590453],
					['expm1', [Math.PI], 'expm1(Math.PI)', 22.140692632779267, NaN, NaN, NaN],

					['exp', [n], `exp(${n})`, 1.1308844209474893, NaN, NaN, NaN],
					['exp', [Math.PI], 'exp(Math.PI)', 23.140692632779267, NaN, NaN, NaN],

					['hypot', [1, 2, 3, 4, 5, 6], 'hypot(1, 2, 3, 4, 5, 6)', 9.539392014169456, NaN, NaN, NaN],
					['hypot', [bigN, bigN], `hypot(${bigN}, ${bigN})`, 8.288489826731116e+38, 8.288489826731114e+38, NaN, NaN],
					['hypot', [2*Math.E, -100], 'hypot(2*Math.E, -100)', 100.14767208675259, 100.14767208675258, NaN, NaN],
					['hypot', [6*Math.PI, -100], 'hypot(6*Math.PI, -100)', 101.76102278593319, 101.7610227859332, NaN, NaN],
					['hypot', [2*Math.LN2, -100], 'hypot(2*Math.LN2, -100)', 100.0096085986525, 100.00960859865252, NaN, NaN],
					['hypot', [Math.LOG2E, -100], 'hypot(Math.LOG2E, -100)', 100.01040630344929, 100.01040630344927, NaN, NaN],
					['hypot', [Math.SQRT2, -100], 'hypot(Math.SQRT2, -100)', 100.00999950004999, 100.00999950005, NaN, NaN],
					['hypot', [Math.SQRT1_2, -100], 'hypot(Math.SQRT1_2, -100)', 100.0024999687508, 100.00249996875078, NaN, NaN],
					['hypot', [2*Math.LOG10E, -100], 'hypot(2*Math.LOG10E, -100)', 100.00377216279416, 100.00377216279418, NaN, NaN],

					['log', [n], `log(${n})`, -2.0955709236097197, NaN, NaN, NaN],
					['log', [Math.PI], 'log(Math.PI)', 1.1447298858494002, NaN, NaN, NaN],

					['log1p', [n], `log1p(${n})`, 0.11600367575630613, NaN, NaN, NaN],
					['log1p', [Math.PI], 'log1p(Math.PI)', 1.4210804127942926, NaN, NaN, NaN],

					['log10', [n], `log10(${n})`, -0.9100948885606021, NaN, NaN, NaN],
					['log10', [Math.PI], 'log10(Math.PI)', 0.4971498726941338, 0.49714987269413385, NaN, NaN],
					['log10', [Math.E], 'log10(Math.E)', 0.4342944819032518, NaN, NaN, NaN],
					['log10', [34*Math.E], 'log10(34*Math.E)', 1.9657733989455068, 1.965773398945507, NaN, NaN],
					['log10', [Math.LN2], 'log10(Math.LN2)', -0.1591745389548616, NaN, NaN, NaN],
					['log10', [11*Math.LN2], 'log10(11*Math.LN2)', 0.8822181462033634, 0.8822181462033635, NaN, NaN],
					['log10', [Math.LOG2E], 'log10(Math.LOG2E)', 0.15917453895486158, NaN, NaN, NaN],
					['log10', [43*Math.LOG2E], 'log10(43*Math.LOG2E)', 1.792642994534448, 1.7926429945344482, NaN, NaN],
					['log10', [Math.LOG10E], 'log10(Math.LOG10E)', -0.36221568869946325, NaN, NaN, NaN],
					['log10', [7*Math.LOG10E], 'log10(7*Math.LOG10E)', 0.4828823513147936, 0.48288235131479357, NaN, NaN],
					['log10', [Math.SQRT1_2], 'log10(Math.SQRT1_2)', -0.15051499783199057, NaN, NaN, NaN],
					['log10', [2*Math.SQRT1_2], 'log10(2*Math.SQRT1_2)', 0.1505149978319906, 0.15051499783199063, NaN, NaN],
					['log10', [Math.SQRT2], 'log10(Math.SQRT2)', 0.1505149978319906, 0.15051499783199063, NaN, NaN],
					
					['sin', [bigN], `sin(${bigN})`, 0.994076732536068, NaN, -0.20876350121720488, NaN],
					['sin', [Math.PI], 'sin(Math.PI)', 1.2246467991473532e-16, NaN, 1.2246063538223773e-16, NaN],

					['sin', [39*Math.E], 'sin(39*Math.E)', -0.7181630308570677, -0.7181630308570678, NaN, NaN],
					['sin', [35*Math.LN2], 'sin(35*Math.LN2)', -0.7659964138980511, -0.765996413898051, NaN, NaN],
					['sin', [110*Math.LOG2E], 'sin(110*Math.LOG2E)', 0.9989410140273756, 0.9989410140273757, NaN, NaN],
					['sin', [7*Math.LOG10E], 'sin(7*Math.LOG10E)', 0.10135692924965616, 0.10135692924965614, NaN, NaN],
					['sin', [35*Math.SQRT1_2], 'sin(35*Math.SQRT1_2)', -0.3746357547858202, -0.37463575478582023, NaN, NaN],
					['sin', [21*Math.SQRT2], 'sin(21*Math.SQRT2)', -0.9892668187780498, -0.9892668187780497, NaN, NaN],

					['sinh', [1], 'sinh(1)', 1.1752011936438014, NaN, NaN, NaN],
					['sinh', [Math.PI], 'sinh(Math.PI)', 11.548739357257748, NaN, NaN, 11.548739357257746],
					['sinh', [Math.E], 'sinh(Math.E)', 7.544137102816975, NaN, NaN, NaN],
					['sinh', [Math.LN2], 'sinh(Math.LN2)', 0.75, NaN, NaN, NaN],
					['sinh', [Math.LOG2E], 'sinh(Math.LOG2E)', 1.9978980091062795, NaN, NaN, NaN],
					['sinh', [492*Math.LOG2E], 'sinh(492*Math.LOG2E)', 9.199870313877772e+307, 9.199870313877774e+307, NaN, NaN],
					['sinh', [Math.LOG10E], 'sinh(Math.LOG10E)', 0.44807597941469024, NaN, NaN, NaN],
					['sinh', [Math.SQRT1_2], 'sinh(Math.SQRT1_2)', 0.7675231451261164, NaN, NaN, NaN],
					['sinh', [Math.SQRT2], 'sinh(Math.SQRT2)', 1.935066822174357, NaN, NaN, 1.9350668221743568],
					['sinh', [502*Math.SQRT2], 'sinh(502*Math.SQRT2)', 1.0469199669023138e+308, 1.046919966902314e+308, NaN, NaN],

					['sqrt', [n], `sqrt(${n})`, 0.3507135583350036, NaN, NaN, NaN],
					['sqrt', [Math.PI], 'sqrt(Math.PI)', 1.7724538509055159, NaN, NaN, NaN],
					
					['tan', [-1e308], 'tan(-1e308)', 0.5086861259107568, NaN, NaN, 0.5086861259107567],
					['tan', [Math.PI], 'tan(Math.PI)', -1.2246467991473532e-16, NaN, NaN, NaN],

					['tan', [6*Math.E], 'tan(6*Math.E)', 0.6866761546452431, 0.686676154645243, NaN, NaN],
					['tan', [6*Math.LN2], 'tan(6*Math.LN2)', 1.6182817135715877, 1.618281713571588, NaN, 1.6182817135715875],
					['tan', [10*Math.LOG2E], 'tan(10*Math.LOG2E)', -3.3537128705376014, -3.353712870537601, NaN, -3.353712870537602],
					['tan', [17*Math.SQRT2], 'tan(17*Math.SQRT2)', -1.9222955461799982, -1.922295546179998, NaN, NaN],
					['tan', [34*Math.SQRT1_2], 'tan(34*Math.SQRT1_2)', -1.9222955461799982, -1.922295546179998, NaN, NaN],
					['tan', [10*Math.LOG10E], 'tan(10*Math.LOG10E)', 2.5824856130712432, 2.5824856130712437, NaN, NaN], 
										
					['tanh', [n], `tanh(${n})`, 0.12238344189440875, NaN, NaN, 0.12238344189440876],
					['tanh', [Math.PI], 'tanh(Math.PI)', 0.99627207622075, NaN, NaN, NaN],

					['pow', [n, -100], `pow(${n}, -100)`, 1.022089333584519e+91, 1.0220893335845176e+91, NaN, NaN],
					['pow', [Math.PI, -100], 'pow(Math.PI, -100)', 1.9275814160560204e-50, 1.9275814160560185e-50, NaN, 1.9275814160560206e-50],
					['pow', [Math.E, -100], 'pow(Math.E, -100)', 3.7200759760208555e-44, 3.720075976020851e-44, NaN, NaN],
					['pow', [Math.LN2, -100], 'pow(Math.LN2, -100)', 8269017203802394, 8269017203802410, NaN, NaN],
					['pow', [Math.LN10, -100], 'pow(Math.LN10, -100)', 6.003867926738829e-37, 6.003867926738811e-37, NaN, NaN],
					['pow', [Math.LOG2E, -100], 'pow(Math.LOG2E, -100)', 1.20933355845501e-16, 1.2093335584550061e-16, NaN, NaN],
					['pow', [Math.LOG10E, -100], 'pow(Math.LOG10E, -100)', 1.6655929347585958e+36, 1.665592934758592e+36, NaN, 1.6655929347585955e+36],
					['pow', [Math.SQRT1_2, -100], 'pow(Math.SQRT1_2, -100)', 1125899906842616.2, 1125899906842611.5, NaN, NaN],
					['pow', [Math.SQRT2, -100], 'pow(Math.SQRT2, -100)', 8.881784197001191e-16, 8.881784197001154e-16, NaN, NaN],
					
					['polyfill', [2e-3 ** -100], 'polyfill pow(2e-3, -100)', 7.888609052210102e+269, 7.888609052210126e+269, NaN, NaN]
				];
				const phantomMath = phantomDarkness ? phantomDarkness.Math : Math;
				const data = {};
				fns.forEach(fn => {
					data[fn[2]] = attempt(() => {
						const result = fn[0] != 'polyfill' ? phantomMath[fn[0]](...fn[1]) : fn[1];
						const chrome = result == fn[3];
						const firefox = fn[4] ? result == fn[4] : false;
						const torBrowser = fn[5] ? result == fn[5] : false;
						const safari = fn[6] ? result == fn[6] : false;
						return { result, chrome, firefox, torBrowser, safari }
					});
				});
				
				logTestResult({ start, test: 'math', passed: true });
				return resolve({ data, lied })
			}
			catch (error) {
				logTestResult({ test: 'math', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getMedia = imports => {

		const {
			require: {
				captureError,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const phantomNavigator = phantomDarkness ? phantomDarkness.navigator : navigator;
				if (!phantomNavigator.mediaDevices ||
					!phantomNavigator.mediaDevices.enumerateDevices) {
					logTestResult({ test: 'media devices', passed: false });
					return resolve()
				}
				let mediaDevicesEnumerated; 
				try {
					mediaDevicesEnumerated = await phantomNavigator.mediaDevices.enumerateDevices();
				}
				catch (error) {
					// since Firefox returns a dead object, try in window context
					mediaDevicesEnumerated = await navigator.mediaDevices.enumerateDevices()
					.catch(error => {
						logTestResult({ test: 'media devices', passed: false });
						captureError(error);
						return resolve()
					});
				}
				const mediaDevices = (
					mediaDevicesEnumerated ? 
					mediaDevicesEnumerated
						.map(({ kind }) => ({ kind }))
						.sort((a, b) => (a.kind > b.kind) ? 1 : -1) :
					undefined
				);
				
				logTestResult({ start, test: 'media', passed: true });
				return resolve({ mediaDevices })
			}
			catch (error) {
				logTestResult({ test: 'media', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	// special thanks to https://arh.antoinevastel.com/reports/stats/menu.html for stats
	const getNavigator = (imports, workerScope) => {

		const {
			require: {
				getOS,
				hashMini,
				captureError,
				attempt,
				caniuse,
				gibberish,
				sendToTrash,
				trustInteger,
				documentLie,
				lieProps,
				phantomDarkness,
				dragonOfDeath,
				getUserAgentPlatform,
				logTestResult,
				getPluginLies
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				let lied = (
					lieProps['Navigator.appVersion'] ||
					lieProps['Navigator.deviceMemory'] ||
					lieProps['Navigator.doNotTrack'] ||
					lieProps['Navigator.hardwareConcurrency'] ||
					lieProps['Navigator.language'] ||
					lieProps['Navigator.languages'] ||
					lieProps['Navigator.maxTouchPoints'] ||
					lieProps['Navigator.platform'] ||
					lieProps['Navigator.userAgent'] ||
					lieProps['Navigator.vendor'] ||
					lieProps['Navigator.plugins'] ||
					lieProps['Navigator.mimeTypes']
				) || false;
				const phantomNavigator = phantomDarkness ? phantomDarkness.navigator : navigator;
				const detectLies = (name, value) => {
					const workerScopeValue = caniuse(() => workerScope, [name]);
					const workerScopeMatchLie = { fingerprint: '', lies: [{ ['does not match worker scope']: false }] };
					if (workerScopeValue) {
						if (name == 'userAgent') {
							const navigatorUserAgent = value;
							const system = getOS(navigatorUserAgent);
							if (workerScope.system != system) {
								lied = true;
								documentLie(`Navigator.${name}`, system, workerScopeMatchLie);
							}
							else if (workerScope.userAgent != navigatorUserAgent) {
								lied = true;
								documentLie(`Navigator.${name}`, navigatorUserAgent, workerScopeMatchLie);
							}
							return value
						}
						else if (name != 'userAgent' && workerScopeValue != value) {
							lied = true;
							documentLie(`Navigator.${name}`, value, workerScopeMatchLie);
							return value
						}
					}
					return value
				};
				const credibleUserAgent = (
					'chrome' in window ? navigator.userAgent.includes(navigator.appVersion) : true
				);

				const data = {
					platform: attempt(() => {
						const { platform } = phantomNavigator;
						const navigatorPlatform = navigator.platform;
						const systems = ['win', 'linux', 'mac', 'arm', 'pike', 'linux', 'iphone', 'ipad', 'ipod', 'android', 'x11'];
						const trusted = typeof navigatorPlatform == 'string' && systems.filter(val => navigatorPlatform.toLowerCase().includes(val))[0];
						detectLies('platform', navigatorPlatform);
						if (!trusted) {
							sendToTrash(`platform`, `${navigatorPlatform} is unusual`);
						}
						if (platform != navigatorPlatform) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected "${navigatorPlatform}" in nested iframe and got "${platform}"`]: true }]
							};
							documentLie(`Navigator.platform`, hashMini({platform, navigatorPlatform}), nestedIframeLie);
						}
						return platform
					}),
					system: attempt(() => getOS(phantomNavigator.userAgent), 'userAgent system failed'),
					device: attempt(() => getUserAgentPlatform({ userAgent: phantomNavigator.userAgent }), 'userAgent device failed'),
					userAgent: attempt(() => {
						const { userAgent } = phantomNavigator;
						const navigatorUserAgent = navigator.userAgent;
						detectLies('userAgent', navigatorUserAgent);
						if (!credibleUserAgent) {
							sendToTrash('userAgent', `${navigatorUserAgent} does not match appVersion`);
						}
						if (/\s{2,}|^\s|\s$/g.test(navigatorUserAgent)) {
							sendToTrash('userAgent', `extra spaces in "${navigatorUserAgent.replace(/\s{2,}|^\s|\s$/g, '[...]')}"`);
						}
						const gibbers = gibberish(navigatorUserAgent);
						if (!!gibbers.length) {	
							sendToTrash(`userAgent contains gibberish`, `[${gibbers.join(', ')}] ${navigatorUserAgent}`);	
						}
						if (userAgent != navigatorUserAgent) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected "${navigatorUserAgent}" in nested iframe and got "${userAgent}"`]: true }]
							};
							documentLie(`Navigator.userAgent`, hashMini({userAgent, navigatorUserAgent}), nestedIframeLie);
						}
						return userAgent.trim().replace(/\s{2,}/, ' ')
					}, 'userAgent failed'),
					appVersion: attempt(() => {
						const { appVersion } = phantomNavigator;
						const navigatorAppVersion = navigator.appVersion;
						detectLies('appVersion', appVersion);
						if (!credibleUserAgent) {
							sendToTrash('appVersion', `${navigatorAppVersion} does not match userAgent`);
						}
						if ('appVersion' in navigator && !navigatorAppVersion) {
							sendToTrash('appVersion', 'Living Standard property returned falsy value');
						}
						if (/\s{2,}|^\s|\s$/g.test(navigatorAppVersion)) {
							sendToTrash('appVersion', `extra spaces in "${navigatorAppVersion.replace(/\s{2,}|^\s|\s$/g, '[...]')}"`);
						}
						if (appVersion != navigatorAppVersion) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected "${navigatorAppVersion}" in nested iframe and got "${appVersion}"`]: true }]
							};
							documentLie(`Navigator.appVersion`, hashMini({appVersion, navigatorAppVersion}), nestedIframeLie);
						}
						return appVersion.trim().replace(/\s{2,}/, ' ')
					}, 'appVersion failed'),
					deviceMemory: attempt(() => {
						if (!('deviceMemory' in navigator)) {
							return undefined
						}
						const { deviceMemory } = phantomNavigator;
						const navigatorDeviceMemory = navigator.deviceMemory;
						const trusted = {
							'0': true,
							'1': true, 
							'2': true,
							'4': true, 
							'6': true, 
							'8': true
						};
						trustInteger('deviceMemory - invalid return type', navigatorDeviceMemory);
						if (!trusted[navigatorDeviceMemory]) {
							sendToTrash('deviceMemory', `${navigatorDeviceMemory} is not within set [0, 1, 2, 4, 6, 8]`);
						}
						if (deviceMemory != navigatorDeviceMemory) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected ${navigatorDeviceMemory} in nested iframe and got ${deviceMemory}`]: true }]
							};
							documentLie(`Navigator.deviceMemory`, hashMini({deviceMemory, navigatorDeviceMemory}), nestedIframeLie);
						}
						return deviceMemory
					}, 'deviceMemory failed'),
					doNotTrack: attempt(() => {
						const { doNotTrack } = phantomNavigator;
						const navigatorDoNotTrack = navigator.doNotTrack;
						const trusted = {
							'1': !0,
							'true': !0, 
							'yes': !0,
							'0': !0, 
							'false': !0, 
							'no': !0, 
							'unspecified': !0, 
							'null': !0,
							'undefined': !0
						};
						if (!trusted[navigatorDoNotTrack]) {
							sendToTrash('doNotTrack - unusual result', navigatorDoNotTrack);
						}
						return doNotTrack
					}, 'doNotTrack failed'),
					globalPrivacyControl: attempt(() => {
						if (!('globalPrivacyControl' in navigator)) {
							return undefined
						}
						const { globalPrivacyControl } = navigator;
						const trusted = {
							'1': !0,
							'true': !0, 
							'yes': !0,
							'0': !0, 
							'false': !0, 
							'no': !0, 
							'unspecified': !0, 
							'null': !0,
							'undefined': !0
						};
						if (!trusted[globalPrivacyControl]) {
							sendToTrash('globalPrivacyControl - unusual result', globalPrivacyControl);
						}
						return globalPrivacyControl
					}, 'globalPrivacyControl failed'),
					hardwareConcurrency: attempt(() => {
						if (!('hardwareConcurrency' in navigator)) {
							return undefined
						}
						const hardwareConcurrency = (
							dragonOfDeath ?
							dragonOfDeath.navigator.hardwareConcurrency :
							phantomNavigator.hardwareConcurrency
						);
						const navigatorHardwareConcurrency = navigator.hardwareConcurrency;
						detectLies('hardwareConcurrency', navigatorHardwareConcurrency);
						trustInteger('hardwareConcurrency - invalid return type', navigatorHardwareConcurrency);
						if (hardwareConcurrency != navigatorHardwareConcurrency) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected ${navigatorHardwareConcurrency} in nested iframe and got ${hardwareConcurrency}`]: true }]
							};
							documentLie(`Navigator.hardwareConcurrency`, hashMini({hardwareConcurrency, navigatorHardwareConcurrency}), nestedIframeLie);
						}
						return hardwareConcurrency
					}, 'hardwareConcurrency failed'),
					language: attempt(() => {
						const { language, languages } = phantomNavigator;
						const navigatorLanguage = navigator.language;
						const navigatorLanguages = navigator.languages;
						detectLies('language', navigatorLanguage);
						detectLies('languages', navigatorLanguages);
						if (language != navigatorLanguage) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected "${navigatorLanguage}" in nested iframe and got "${language}"`]: true }]
							};
							documentLie(`Navigator.language`, hashMini({language, navigatorLanguage}), nestedIframeLie);
						}
						if (navigatorLanguage && navigatorLanguages) {
							const lang = /^.{0,2}/g.exec(navigatorLanguage)[0];
							const langs = /^.{0,2}/g.exec(navigatorLanguages[0])[0];
							if (langs != lang) {
								sendToTrash('language/languages', `${[navigatorLanguage, navigatorLanguages].join(' ')} mismatch`);
							}
							return `${languages.join(', ')} (${language})`
						}
						return `${language} ${languages}`
					}, 'language(s) failed'),
					maxTouchPoints: attempt(() => {
						if (!('maxTouchPoints' in navigator)) {
							return null
						}
						const { maxTouchPoints } = phantomNavigator;
						const navigatorMaxTouchPoints = navigator.maxTouchPoints;	
						if (maxTouchPoints != navigatorMaxTouchPoints) {	
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected ${navigatorMaxTouchPoints} in nested iframe and got ${maxTouchPoints}`]: true }]
							};
							documentLie(`Navigator.maxTouchPoints`, hashMini({maxTouchPoints, navigatorMaxTouchPoints}), nestedIframeLie);	
						}

						return maxTouchPoints
					}, 'maxTouchPoints failed'),
					vendor: attempt(() => {
						const { vendor } = phantomNavigator;
						const navigatorVendor = navigator.vendor;
						if (vendor != navigatorVendor) {
							lied = true;
							const nestedIframeLie = {
								fingerprint: '',
								lies: [{ [`Expected "${navigatorVendor}" in nested iframe and got "${vendor}"`]: true }]
							};
							documentLie(`Navigator.vendor`, hashMini({vendor, navigatorVendor}), nestedIframeLie);
						}
						return vendor
					}, 'vendor failed'),
					mimeTypes: attempt(() => {
						const mimeTypes = phantomNavigator.mimeTypes;
						return mimeTypes ? [...mimeTypes].map(m => m.type) : []
					}, 'mimeTypes failed'),
					plugins: attempt(() => {
						const navigatorPlugins = navigator.plugins;
						const ownProperties = Object.getOwnPropertyNames(navigatorPlugins).filter(name => isNaN(+name));
						const ownPropertiesSet = new Set(ownProperties);
						const plugins = phantomNavigator.plugins;
						const response = plugins ? [...phantomNavigator.plugins]
							.map(p => ({
								name: p.name,
								description: p.description,
								filename: p.filename,
								version: p.version
							})) : [];

						const { lies } = getPluginLies(navigatorPlugins, navigator.mimeTypes);
						if (lies.length) {
							lied = true;
							lies.forEach(lie => {
								const pluginsLie = { fingerprint: '', lies: [{ [lie]: true }] };
								return documentLie(`Navigator.plugins`, hashMini(response), pluginsLie)
							});
						}

						if (!!response.length) {	
							response.forEach(plugin => {	
								const { name, description } = plugin;
								const nameGibbers = gibberish(name);
								const descriptionGibbers = gibberish(description);	
								if (!!nameGibbers.length) {	
									sendToTrash(`plugin name contains gibberish`, `[${nameGibbers.join(', ')}] ${name}`);	
								}
								if (!!descriptionGibbers.length) {	
									sendToTrash(`plugin description contains gibberish`, `[${descriptionGibbers.join(', ')}] ${description}`);
								}	
								return	
							});	
						}
						return response
					}, 'plugins failed'),
					properties: attempt(() => {
						const keys = Object.keys(Object.getPrototypeOf(phantomNavigator));
						return keys
					}, 'navigator keys failed'),
					highEntropyValues: await attempt(async () => { 
						if (!('userAgentData' in phantomNavigator)) {
							return undefined
						}
						const data = await phantomNavigator.userAgentData.getHighEntropyValues(
							['platform', 'platformVersion', 'architecture',  'model', 'uaFullVersion']
						);
						return data
					}, 'highEntropyValues failed')
				};
				logTestResult({ start, test: 'navigator', passed: true });
				return resolve({ ...data, lied })
			}
			catch (error) {
				logTestResult({ test: 'navigator', passed: false });
				captureError(error, 'Navigator failed or blocked by client');
				return resolve(undefined)
			}
		})
	};

	// inspired by
	// https://privacycheck.sec.lrz.de/active/fp_gcr/fp_getclientrects.html
	// https://privacycheck.sec.lrz.de/active/fp_e/fp_emoji.html
	const emojis = [[128512],[128515],[128516],[128513],[128518],[128517],[129315],[128514],[128578],[128579],[128521],[128522],[128519],[129392],[128525],[129321],[128536],[128535],[9786],[128538],[128537],[129394],[128523],[128539],[128540],[129322],[128541],[129297],[129303],[129325],[129323],[129300],[129296],[129320],[128528],[128529],[128566],[128527],[128530],[128580],[128556],[129317],[128524],[128532],[128554],[129316],[128564],[128567],[129298],[129301],[129314],[129326],[129319],[129397],[129398],[129396],[128565],[129327],[129312],[129395],[129400],[128526],[129299],[129488],[128533],[128543],[128577],[9785],[128558],[128559],[128562],[128563],[129402],[128550],[128551],[128552],[128560],[128549],[128546],[128557],[128561],[128534],[128547],[128542],[128531],[128553],[128555],[129393],[128548],[128545],[128544],[129324],[128520],[128127],[128128],[9760],[128169],[129313],[128121],[128122],[128123],[128125],[128126],[129302],[128570],[128568],[128569],[128571],[128572],[128573],[128576],[128575],[128574],[128584],[128585],[128586],[128139],[128140],[128152],[128157],[128150],[128151],[128147],[128158],[128149],[128159],[10083],[128148],[10084],[129505],[128155],[128154],[128153],[128156],[129294],[128420],[129293],[128175],[128162],[128165],[128171],[128166],[128168],[128371],[128163],[128172],[128065,65039,8205,128488,65039],[128488],[128495],[128173],[128164],[128075],[129306],[128400],[9995],[128406],[128076],[129292],[129295],[9996],[129310],[129311],[129304],[129305],[128072],[128073],[128070],[128405],[128071],[9757],[128077],[128078],[9994],[128074],[129307],[129308],[128079],[128588],[128080],[129330],[129309],[128591],[9997],[128133],[129331],[128170],[129470],[129471],[129461],[129462],[128066],[129467],[128067],[129504],[129728],[129729],[129463],[129460],[128064],[128065],[128069],[128068],[128118],[129490],[128102],[128103],[129489],[128113],[128104],[129492],[128104,8205,129456],[128104,8205,129457],[128104,8205,129459],[128104,8205,129458],[128105],[128105,8205,129456],[129489,8205,129456],[128105,8205,129457],[129489,8205,129457],[128105,8205,129459],[129489,8205,129459],[128105,8205,129458],[129489,8205,129458],[128113,8205,9792,65039],[128113,8205,9794,65039],[129491],[128116],[128117],[128589],[128589,8205,9794,65039],[128589,8205,9792,65039],[128590],[128590,8205,9794,65039],[128590,8205,9792,65039],[128581],[128581,8205,9794,65039],[128581,8205,9792,65039],[128582],[128582,8205,9794,65039],[128582,8205,9792,65039],[128129],[128129,8205,9794,65039],[128129,8205,9792,65039],[128587],[128587,8205,9794,65039],[128587,8205,9792,65039],[129487],[129487,8205,9794,65039],[129487,8205,9792,65039],[128583],[128583,8205,9794,65039],[128583,8205,9792,65039],[129318],[129318,8205,9794,65039],[129318,8205,9792,65039],[129335],[129335,8205,9794,65039],[129335,8205,9792,65039],[129489,8205,9877,65039],[128104,8205,9877,65039],[128105,8205,9877,65039],[129489,8205,127891],[128104,8205,127891],[128105,8205,127891],[129489,8205,127979],[128104,8205,127979],[128105,8205,127979],[129489,8205,9878,65039],[128104,8205,9878,65039],[128105,8205,9878,65039],[129489,8205,127806],[128104,8205,127806],[128105,8205,127806],[129489,8205,127859],[128104,8205,127859],[128105,8205,127859],[129489,8205,128295],[128104,8205,128295],[128105,8205,128295],[129489,8205,127981],[128104,8205,127981],[128105,8205,127981],[129489,8205,128188],[128104,8205,128188],[128105,8205,128188],[129489,8205,128300],[128104,8205,128300],[128105,8205,128300],[129489,8205,128187],[128104,8205,128187],[128105,8205,128187],[129489,8205,127908],[128104,8205,127908],[128105,8205,127908],[129489,8205,127912],[128104,8205,127912],[128105,8205,127912],[129489,8205,9992,65039],[128104,8205,9992,65039],[128105,8205,9992,65039],[129489,8205,128640],[128104,8205,128640],[128105,8205,128640],[129489,8205,128658],[128104,8205,128658],[128105,8205,128658],[128110],[128110,8205,9794,65039],[128110,8205,9792,65039],[128373],[128373,65039,8205,9794,65039],[128373,65039,8205,9792,65039],[128130],[128130,8205,9794,65039],[128130,8205,9792,65039],[129399],[128119],[128119,8205,9794,65039],[128119,8205,9792,65039],[129332],[128120],[128115],[128115,8205,9794,65039],[128115,8205,9792,65039],[128114],[129493],[129333],[129333,8205,9794,65039],[129333,8205,9792,65039],[128112],[128112,8205,9794,65039],[128112,8205,9792,65039],[129328],[129329],[128105,8205,127868],[128104,8205,127868],[129489,8205,127868],[128124],[127877],[129334],[129489,8205,127876],[129464],[129464,8205,9794,65039],[129464,8205,9792,65039],[129465],[129465,8205,9794,65039],[129465,8205,9792,65039],[129497],[129497,8205,9794,65039],[129497,8205,9792,65039],[129498],[129498,8205,9794,65039],[129498,8205,9792,65039],[129499],[129499,8205,9794,65039],[129499,8205,9792,65039],[129500],[129500,8205,9794,65039],[129500,8205,9792,65039],[129501],[129501,8205,9794,65039],[129501,8205,9792,65039],[129502],[129502,8205,9794,65039],[129502,8205,9792,65039],[129503],[129503,8205,9794,65039],[129503,8205,9792,65039],[128134],[128134,8205,9794,65039],[128134,8205,9792,65039],[128135],[128135,8205,9794,65039],[128135,8205,9792,65039],[128694],[128694,8205,9794,65039],[128694,8205,9792,65039],[129485],[129485,8205,9794,65039],[129485,8205,9792,65039],[129486],[129486,8205,9794,65039],[129486,8205,9792,65039],[129489,8205,129455],[128104,8205,129455],[128105,8205,129455],[129489,8205,129468],[128104,8205,129468],[128105,8205,129468],[129489,8205,129469],[128104,8205,129469],[128105,8205,129469],[127939],[127939,8205,9794,65039],[127939,8205,9792,65039],[128131],[128378],[128372],[128111],[128111,8205,9794,65039],[128111,8205,9792,65039],[129494],[129494,8205,9794,65039],[129494,8205,9792,65039],[129495],[129495,8205,9794,65039],[129495,8205,9792,65039],[129338],[127943],[9975],[127938],[127948],[127948,65039,8205,9794,65039],[127948,65039,8205,9792,65039],[127940],[127940,8205,9794,65039],[127940,8205,9792,65039],[128675],[128675,8205,9794,65039],[128675,8205,9792,65039],[127946],[127946,8205,9794,65039],[127946,8205,9792,65039],[9977],[9977,65039,8205,9794,65039],[9977,65039,8205,9792,65039],[127947],[127947,65039,8205,9794,65039],[127947,65039,8205,9792,65039],[128692],[128692,8205,9794,65039],[128692,8205,9792,65039],[128693],[128693,8205,9794,65039],[128693,8205,9792,65039],[129336],[129336,8205,9794,65039],[129336,8205,9792,65039],[129340],[129340,8205,9794,65039],[129340,8205,9792,65039],[129341],[129341,8205,9794,65039],[129341,8205,9792,65039],[129342],[129342,8205,9794,65039],[129342,8205,9792,65039],[129337],[129337,8205,9794,65039],[129337,8205,9792,65039],[129496],[129496,8205,9794,65039],[129496,8205,9792,65039],[128704],[128716],[129489,8205,129309,8205,129489],[128109],[128107],[128108],[128143],[128105,8205,10084,65039,8205,128139,8205,128104],[128104,8205,10084,65039,8205,128139,8205,128104],[128105,8205,10084,65039,8205,128139,8205,128105],[128145],[128105,8205,10084,65039,8205,128104],[128104,8205,10084,65039,8205,128104],[128105,8205,10084,65039,8205,128105],[128106],[128104,8205,128105,8205,128102],[128104,8205,128105,8205,128103],[128104,8205,128105,8205,128103,8205,128102],[128104,8205,128105,8205,128102,8205,128102],[128104,8205,128105,8205,128103,8205,128103],[128104,8205,128104,8205,128102],[128104,8205,128104,8205,128103],[128104,8205,128104,8205,128103,8205,128102],[128104,8205,128104,8205,128102,8205,128102],[128104,8205,128104,8205,128103,8205,128103],[128105,8205,128105,8205,128102],[128105,8205,128105,8205,128103],[128105,8205,128105,8205,128103,8205,128102],[128105,8205,128105,8205,128102,8205,128102],[128105,8205,128105,8205,128103,8205,128103],[128104,8205,128102],[128104,8205,128102,8205,128102],[128104,8205,128103],[128104,8205,128103,8205,128102],[128104,8205,128103,8205,128103],[128105,8205,128102],[128105,8205,128102,8205,128102],[128105,8205,128103],[128105,8205,128103,8205,128102],[128105,8205,128103,8205,128103],[128483],[128100],[128101],[129730],[128099],[129456],[129457],[129459],[129458],[128053],[128018],[129421],[129447],[128054],[128021],[129454],[128021,8205,129466],[128041],[128058],[129418],[129437],[128049],[128008],[128008,8205,11035],[129409],[128047],[128005],[128006],[128052],[128014],[129412],[129427],[129420],[129452],[128046],[128002],[128003],[128004],[128055],[128022],[128023],[128061],[128015],[128017],[128016],[128042],[128043],[129433],[129426],[128024],[129443],[129423],[129435],[128045],[128001],[128e3],[128057],[128048],[128007],[128063],[129451],[129428],[129415],[128059],[128059,8205,10052,65039],[128040],[128060],[129445],[129446],[129448],[129432],[129441],[128062],[129411],[128020],[128019],[128035],[128036],[128037],[128038],[128039],[128330],[129413],[129414],[129442],[129417],[129444],[129718],[129449],[129434],[129436],[128056],[128010],[128034],[129422],[128013],[128050],[128009],[129429],[129430],[128051],[128011],[128044],[129453],[128031],[128032],[128033],[129416],[128025],[128026],[128012],[129419],[128027],[128028],[128029],[129714],[128030],[129431],[129715],[128375],[128376],[129410],[129439],[129712],[129713],[129440],[128144],[127800],[128174],[127989],[127801],[129344],[127802],[127803],[127804],[127799],[127793],[129716],[127794],[127795],[127796],[127797],[127806],[127807],[9752],[127808],[127809],[127810],[127811],[127815],[127816],[127817],[127818],[127819],[127820],[127821],[129389],[127822],[127823],[127824],[127825],[127826],[127827],[129744],[129373],[127813],[129746],[129381],[129361],[127814],[129364],[129365],[127805],[127798],[129745],[129362],[129388],[129382],[129476],[129477],[127812],[129372],[127792],[127838],[129360],[129366],[129747],[129384],[129391],[129374],[129479],[129472],[127830],[127831],[129385],[129363],[127828],[127839],[127829],[127789],[129386],[127790],[127791],[129748],[129369],[129478],[129370],[127859],[129368],[127858],[129749],[129379],[129367],[127871],[129480],[129474],[129387],[127857],[127832],[127833],[127834],[127835],[127836],[127837],[127840],[127842],[127843],[127844],[127845],[129390],[127841],[129375],[129376],[129377],[129408],[129438],[129424],[129425],[129450],[127846],[127847],[127848],[127849],[127850],[127874],[127856],[129473],[129383],[127851],[127852],[127853],[127854],[127855],[127868],[129371],[9749],[129750],[127861],[127862],[127870],[127863],[127864],[127865],[127866],[127867],[129346],[129347],[129380],[129483],[129475],[129481],[129482],[129378],[127869],[127860],[129348],[128298],[127994],[127757],[127758],[127759],[127760],[128506],[128510],[129517],[127956],[9968],[127755],[128507],[127957],[127958],[127964],[127965],[127966],[127967],[127963],[127959],[129521],[129704],[129717],[128726],[127960],[127962],[127968],[127969],[127970],[127971],[127972],[127973],[127974],[127976],[127977],[127978],[127979],[127980],[127981],[127983],[127984],[128146],[128508],[128509],[9962],[128332],[128725],[128333],[9961],[128331],[9970],[9978],[127745],[127747],[127961],[127748],[127749],[127750],[127751],[127753],[9832],[127904],[127905],[127906],[128136],[127914],[128642],[128643],[128644],[128645],[128646],[128647],[128648],[128649],[128650],[128669],[128670],[128651],[128652],[128653],[128654],[128656],[128657],[128658],[128659],[128660],[128661],[128662],[128663],[128664],[128665],[128763],[128666],[128667],[128668],[127950],[127949],[128757],[129469],[129468],[128762],[128690],[128756],[128761],[128764],[128655],[128739],[128740],[128738],[9981],[128680],[128677],[128678],[128721],[128679],[9875],[9973],[128758],[128676],[128755],[9972],[128741],[128674],[9992],[128745],[128747],[128748],[129666],[128186],[128641],[128671],[128672],[128673],[128752],[128640],[128760],[128718],[129523],[8987],[9203],[8986],[9200],[9201],[9202],[128368],[128347],[128359],[128336],[128348],[128337],[128349],[128338],[128350],[128339],[128351],[128340],[128352],[128341],[128353],[128342],[128354],[128343],[128355],[128344],[128356],[128345],[128357],[128346],[128358],[127761],[127762],[127763],[127764],[127765],[127766],[127767],[127768],[127769],[127770],[127771],[127772],[127777],[9728],[127773],[127774],[129680],[11088],[127775],[127776],[127756],[9729],[9925],[9928],[127780],[127781],[127782],[127783],[127784],[127785],[127786],[127787],[127788],[127744],[127752],[127746],[9730],[9748],[9969],[9889],[10052],[9731],[9924],[9732],[128293],[128167],[127754],[127875],[127876],[127878],[127879],[129512],[10024],[127880],[127881],[127882],[127883],[127885],[127886],[127887],[127888],[127889],[129511],[127872],[127873],[127895],[127903],[127915],[127894],[127942],[127941],[129351],[129352],[129353],[9917],[9918],[129358],[127936],[127952],[127944],[127945],[127934],[129359],[127923],[127951],[127953],[127954],[129357],[127955],[127992],[129354],[129355],[129349],[9971],[9976],[127907],[129343],[127933],[127935],[128759],[129356],[127919],[129664],[129665],[127921],[128302],[129668],[129535],[127918],[128377],[127920],[127922],[129513],[129528],[129669],[129670],[9824],[9829],[9830],[9827],[9823],[127183],[126980],[127924],[127917],[128444],[127912],[129525],[129697],[129526],[129698],[128083],[128374],[129405],[129404],[129466],[128084],[128085],[128086],[129507],[129508],[129509],[129510],[128087],[128088],[129403],[129649],[129650],[129651],[128089],[128090],[128091],[128092],[128093],[128717],[127890],[129652],[128094],[128095],[129406],[129407],[128096],[128097],[129648],[128098],[128081],[128082],[127913],[127891],[129506],[129686],[9937],[128255],[128132],[128141],[128142],[128263],[128264],[128265],[128266],[128226],[128227],[128239],[128276],[128277],[127932],[127925],[127926],[127897],[127898],[127899],[127908],[127911],[128251],[127927],[129687],[127928],[127929],[127930],[127931],[129685],[129345],[129688],[128241],[128242],[9742],[128222],[128223],[128224],[128267],[128268],[128187],[128421],[128424],[9e3],[128433],[128434],[128189],[128190],[128191],[128192],[129518],[127909],[127902],[128253],[127916],[128250],[128247],[128248],[128249],[128252],[128269],[128270],[128367],[128161],[128294],[127982],[129684],[128212],[128213],[128214],[128215],[128216],[128217],[128218],[128211],[128210],[128195],[128220],[128196],[128240],[128478],[128209],[128278],[127991],[128176],[129689],[128180],[128181],[128182],[128183],[128184],[128179],[129534],[128185],[9993],[128231],[128232],[128233],[128228],[128229],[128230],[128235],[128234],[128236],[128237],[128238],[128499],[9999],[10002],[128395],[128394],[128396],[128397],[128221],[128188],[128193],[128194],[128450],[128197],[128198],[128466],[128467],[128199],[128200],[128201],[128202],[128203],[128204],[128205],[128206],[128391],[128207],[128208],[9986],[128451],[128452],[128465],[128274],[128275],[128271],[128272],[128273],[128477],[128296],[129683],[9935],[9874],[128736],[128481],[9876],[128299],[129667],[127993],[128737],[129690],[128295],[129691],[128297],[9881],[128476],[9878],[129455],[128279],[9939],[129693],[129520],[129522],[129692],[9879],[129514],[129515],[129516],[128300],[128301],[128225],[128137],[129656],[128138],[129657],[129658],[128682],[128727],[129694],[129695],[128719],[128715],[129681],[128701],[129696],[128703],[128705],[129700],[129682],[129524],[129527],[129529],[129530],[129531],[129699],[129532],[129701],[129533],[129519],[128722],[128684],[9904],[129702],[9905],[128511],[129703],[127975],[128686],[128688],[9855],[128697],[128698],[128699],[128700],[128702],[128706],[128707],[128708],[128709],[9888],[128696],[9940],[128683],[128691],[128685],[128687],[128689],[128695],[128245],[128286],[9762],[9763],[11014],[8599],[10145],[8600],[11015],[8601],[11013],[8598],[8597],[8596],[8617],[8618],[10548],[10549],[128259],[128260],[128281],[128282],[128283],[128284],[128285],[128720],[9883],[128329],[10017],[9784],[9775],[10013],[9766],[9770],[9774],[128334],[128303],[9800],[9801],[9802],[9803],[9804],[9805],[9806],[9807],[9808],[9809],[9810],[9811],[9934],[128256],[128257],[128258],[9654],[9193],[9197],[9199],[9664],[9194],[9198],[128316],[9195],[128317],[9196],[9208],[9209],[9210],[9167],[127910],[128261],[128262],[128246],[128243],[128244],[9792],[9794],[9895],[10006],[10133],[10134],[10135],[9854],[8252],[8265],[10067],[10068],[10069],[10071],[12336],[128177],[128178],[9877],[9851],[9884],[128305],[128219],[128304],[11093],[9989],[9745],[10004],[10060],[10062],[10160],[10175],[12349],[10035],[10036],[10055],[169],[174],[8482],[35,65039,8419],[42,65039,8419],[48,65039,8419],[49,65039,8419],[50,65039,8419],[51,65039,8419],[52,65039,8419],[53,65039,8419],[54,65039,8419],[55,65039,8419],[56,65039,8419],[57,65039,8419],[128287],[128288],[128289],[128290],[128291],[128292],[127344],[127374],[127345],[127377],[127378],[127379],[8505],[127380],[9410],[127381],[127382],[127358],[127383],[127359],[127384],[127385],[127386],[127489],[127490],[127543],[127542],[127535],[127568],[127545],[127514],[127538],[127569],[127544],[127540],[127539],[12951],[12953],[127546],[127541],[128308],[128992],[128993],[128994],[128309],[128995],[128996],[9899],[9898],[128997],[128999],[129e3],[129001],[128998],[129002],[129003],[11035],[11036],[9724],[9723],[9726],[9725],[9642],[9643],[128310],[128311],[128312],[128313],[128314],[128315],[128160],[128280],[128307],[128306],[127937],[128681],[127884],[127988],[127987],[127987,65039,8205,127752],[127987,65039,8205,9895,65039],[127988,8205,9760,65039],[127462,127464],[127462,127465],[127462,127466],[127462,127467],[127462,127468],[127462,127470],[127462,127473],[127462,127474],[127462,127476],[127462,127478],[127462,127479],[127462,127480],[127462,127481],[127462,127482],[127462,127484],[127462,127485],[127462,127487],[127463,127462],[127463,127463],[127463,127465],[127463,127466],[127463,127467],[127463,127468],[127463,127469],[127463,127470],[127463,127471],[127463,127473],[127463,127474],[127463,127475],[127463,127476],[127463,127478],[127463,127479],[127463,127480],[127463,127481],[127463,127483],[127463,127484],[127463,127486],[127463,127487],[127464,127462],[127464,127464],[127464,127465],[127464,127467],[127464,127468],[127464,127469],[127464,127470],[127464,127472],[127464,127473],[127464,127474],[127464,127475],[127464,127476],[127464,127477],[127464,127479],[127464,127482],[127464,127483],[127464,127484],[127464,127485],[127464,127486],[127464,127487],[127465,127466],[127465,127468],[127465,127471],[127465,127472],[127465,127474],[127465,127476],[127465,127487],[127466,127462],[127466,127464],[127466,127466],[127466,127468],[127466,127469],[127466,127479],[127466,127480],[127466,127481],[127466,127482],[127467,127470],[127467,127471],[127467,127472],[127467,127474],[127467,127476],[127467,127479],[127468,127462],[127468,127463],[127468,127465],[127468,127466],[127468,127467],[127468,127468],[127468,127469],[127468,127470],[127468,127473],[127468,127474],[127468,127475],[127468,127477],[127468,127478],[127468,127479],[127468,127480],[127468,127481],[127468,127482],[127468,127484],[127468,127486],[127469,127472],[127469,127474],[127469,127475],[127469,127479],[127469,127481],[127469,127482],[127470,127464],[127470,127465],[127470,127466],[127470,127473],[127470,127474],[127470,127475],[127470,127476],[127470,127478],[127470,127479],[127470,127480],[127470,127481],[127471,127466],[127471,127474],[127471,127476],[127471,127477],[127472,127466],[127472,127468],[127472,127469],[127472,127470],[127472,127474],[127472,127475],[127472,127477],[127472,127479],[127472,127484],[127472,127486],[127472,127487],[127473,127462],[127473,127463],[127473,127464],[127473,127470],[127473,127472],[127473,127479],[127473,127480],[127473,127481],[127473,127482],[127473,127483],[127473,127486],[127474,127462],[127474,127464],[127474,127465],[127474,127466],[127474,127467],[127474,127468],[127474,127469],[127474,127472],[127474,127473],[127474,127474],[127474,127475],[127474,127476],[127474,127477],[127474,127478],[127474,127479],[127474,127480],[127474,127481],[127474,127482],[127474,127483],[127474,127484],[127474,127485],[127474,127486],[127474,127487],[127475,127462],[127475,127464],[127475,127466],[127475,127467],[127475,127468],[127475,127470],[127475,127473],[127475,127476],[127475,127477],[127475,127479],[127475,127482],[127475,127487],[127476,127474],[127477,127462],[127477,127466],[127477,127467],[127477,127468],[127477,127469],[127477,127472],[127477,127473],[127477,127474],[127477,127475],[127477,127479],[127477,127480],[127477,127481],[127477,127484],[127477,127486],[127478,127462],[127479,127466],[127479,127476],[127479,127480],[127479,127482],[127479,127484],[127480,127462],[127480,127463],[127480,127464],[127480,127465],[127480,127466],[127480,127468],[127480,127469],[127480,127470],[127480,127471],[127480,127472],[127480,127473],[127480,127474],[127480,127475],[127480,127476],[127480,127479],[127480,127480],[127480,127481],[127480,127483],[127480,127485],[127480,127486],[127480,127487],[127481,127462],[127481,127464],[127481,127465],[127481,127467],[127481,127468],[127481,127469],[127481,127471],[127481,127472],[127481,127473],[127481,127474],[127481,127475],[127481,127476],[127481,127479],[127481,127481],[127481,127483],[127481,127484],[127481,127487],[127482,127462],[127482,127468],[127482,127474],[127482,127475],[127482,127480],[127482,127486],[127482,127487],[127483,127462],[127483,127464],[127483,127466],[127483,127468],[127483,127470],[127483,127475],[127483,127482],[127484,127467],[127484,127480],[127485,127472],[127486,127466],[127486,127481],[127487,127462],[127487,127474],[127487,127484],[127988,917607,917602,917605,917614,917607,917631],[127988,917607,917602,917619,917603,917620,917631],[127988,917607,917602,917623,917612,917619,917631]];

	const getClientRects = imports => {

		const {
			require: {
				instanceId,
				hashMini,
				patch,
				html,
				captureError,
				documentLie,
				lieProps,
				logTestResult,
				phantomDarkness
			}
		} = imports;
		
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const toNativeObject = domRect => {
					return {
						bottom: domRect.bottom,
						height: domRect.height,
						left: domRect.left,
						right: domRect.right,
						width: domRect.width,
						top: domRect.top,
						x: domRect.x,
						y: domRect.y
					}
				};
				let lied = lieProps['Element.getClientRects'] || false; // detect lies
							
				const doc = phantomDarkness ? phantomDarkness.document : document;

				const rectsId = `${instanceId}-client-rects-div`;
				const divElement = document.createElement('div');
				divElement.setAttribute('id', rectsId);
				doc.body.appendChild(divElement);
				const divRendered = doc.getElementById(rectsId);
				
				// patch div
				patch(divRendered, html`
			<div id="${rectsId}">
				<div style="perspective:100px;width:1000.099%;" id="rect-container">
					<style>
					.rects {
						width: 1000%;
						height: 1000%;
						max-width: 1000%;
					}
					.absolute {
						position: absolute;
					}
					#cRect1 {
						border: solid 2.715px;
						border-color: #F72585;
						padding: 3.98px;
						margin-left: 12.12px;
					}
					#cRect2 {
						border: solid 2px;
						border-color: #7209B7;
						font-size: 30px;
						margin-top: 20px;
						padding: 3.98px;
						transform: skewY(23.1753218deg) rotate3d(10.00099, 90, 0.100000000000009, 60000000000008.00000009deg);
					}
					#cRect3 {
						border: solid 2.89px;
						border-color: #3A0CA3;
						font-size: 45px;
						transform: skewY(-23.1753218deg) scale(1099.0000000099, 1.89) matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
						margin-top: 50px;
					}
					#cRect4 {
						border: solid 2px;
						border-color: #4361EE;
						transform: matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
						margin-top: 11.1331px;
						margin-left: 12.1212px;
						padding: 4.4545px;
						left: 239.4141px;
						top: 8.5050px;
					}
					#cRect5 {
						border: solid 2px;
						border-color: #4CC9F0;
						margin-left: 42.395pt;
					}
					#cRect6 {
						border: solid 2px;
						border-color: #F72585;
						transform: perspective(12890px) translateZ(101.5px);
						padding: 12px;
					}
					#cRect7 {
						margin-top: -350.552px;
						margin-left: 0.9099rem;
						border: solid 2px;
						border-color: #4361EE;
					}
					#cRect8 {
						margin-top: -150.552px;
						margin-left: 15.9099rem;
						border: solid 2px;
						border-color: #3A0CA3;
					}
					#cRect9 {
						margin-top: -110.552px;
						margin-left: 15.9099rem;
						border: solid 2px;
						border-color: #7209B7;
					}
					#cRect10 {
						margin-top: -315.552px;
						margin-left: 15.9099rem;
						border: solid 2px;
						border-color: #F72585;
					}
					#cRect11 {
						width: 10px;
						height: 10px;
						margin-left: 15.0000009099rem;
						border: solid 2px;
						border-color: #F72585;
					}
					#cRect12 {
						width: 10px;
						height: 10px;
						margin-left: 15.0000009099rem;
						border: solid 2px;
						border-color: #F72585;
					}
					#rect-container .shift-dom-rect {
						top: 1px !important;
						left: 1px !important;
					}
					</style>
					<div id="cRect1" class="rects"></div>
					<div id="cRect2" class="rects"></div>
					<div id="cRect3" class="rects"></div>
					<div id="cRect4" class="rects absolute"></div>
					<div id="cRect5" class="rects"></div>
					<div id="cRect6" class="rects"></div>
					<div id="cRect7" class="rects absolute"></div>
					<div id="cRect8" class="rects absolute"></div>
					<div id="cRect9" class="rects absolute"></div>
					<div id="cRect10" class="rects absolute"></div>
					<div id="cRect11" class="rects"></div>
					<div id="cRect12" class="rects"></div>
					<div id="emoji" class="emojis"></div>
				</div>
				<div id="emoji-container">
					<style>
					#emoji {
						position: absolute;
						font-size: 200px;
						height: auto;
					}
					</style>
					<div id="emoji" class="emojis"></div>
				</div>
			</div>
			`);

				// get emojis
				const emojiDiv = doc.getElementById('emoji');
				const emojiRects = emojis
					.slice(99, 199) // limit to improve performance
					.map(emoji => String.fromCodePoint(...emoji))
					.map(emoji => {
						emojiDiv.innerHTML = emoji;
						const domRect = emojiDiv.getClientRects()[0];
						return {emoji,...toNativeObject(domRect)}
					});
				
				// get clientRects
				const rectElems = doc.getElementsByClassName('rects');
				const clientRects = [...rectElems].map(el => {
					return toNativeObject(el.getClientRects()[0])
				});

				// detect failed shift calculation
				// inspired by https://arkenfox.github.io/TZP
				let shiftLie = false;
				const rect4 = [...rectElems][3];
				const { top: initialTop } = clientRects[3];
				rect4.classList.add('shift-dom-rect');
				const { top: shiftedTop } = toNativeObject(rect4.getClientRects()[0]);
				rect4.classList.remove('shift-dom-rect');
				const { top: unshiftedTop } = toNativeObject(rect4.getClientRects()[0]);
				const diff = initialTop - shiftedTop;
				shiftLie = diff != (unshiftedTop - shiftedTop);
				if (shiftLie) {
					lied = true;
					shiftLie = { fingerprint: '', lies: [{ ['failed shift calculation']: true }] };
					documentLie('Element.getClientRects', hashMini(clientRects), shiftLie);
				}

				// detect failed math calculation lie
				let mathLie = false;
				clientRects.forEach(rect => {
					const { right, left, width, bottom, top, height, x, y } = rect;
					if (
						right - left != width ||
						bottom - top != height ||
						right - x != width ||
						bottom - y != height
					) {
						lied = true;
						mathLie = { fingerprint: '', lies: [{ ['failed math calculation']: true }] };
					}
					return
				});
				if (mathLie) {
					documentLie('Element.getClientRects', hashMini(clientRects), mathLie);
				}
				
				// detect equal elements mismatch lie
				let offsetLie = false;
				const { right: right1, left: left1 } = clientRects[10];
				const { right: right2, left: left2 } = clientRects[11];
				if (right1 != right2 || left1 != left2) {
					offsetLie = { fingerprint: '', lies: [{ ['equal elements mismatch']: true }] };
					documentLie('Element.getClientRects', hashMini(clientRects), offsetLie);
					lied = true;
				}
							
				logTestResult({ start, test: 'rects', passed: true });
				return resolve({ emojiRects, clientRects, lied })
			}
			catch (error) {
				logTestResult({ test: 'rects', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	// screen (allow some discrepancies otherwise lie detection triggers at random)

	const getDevice = (width, height) => {
		// https://gs.statcounter.com/screen-resolution-stats/
		const resolution = [
			{ width: 360, height: 640, device: 'phone'},
			{ width: 360, height: 720, device: 'phone'},
			{ width: 360, height: 740, device: 'phone'},
			{ width: 360, height: 760, device: 'phone'},
			{ width: 360, height: 780, device: 'phone'},
			{ width: 375, height: 667, device: 'phone'},
			{ width: 375, height: 812, device: 'phone'},
			{ width: 412, height: 732, device: 'phone'},
			{ width: 412, height: 846, device: 'phone'},
			{ width: 412, height: 869, device: 'phone'},
			{ width: 412, height: 892, device: 'phone'},
			{ width: 414, height: 736, device: 'phone'},
			{ width: 414, height: 896, device: 'phone'},
			{ width: 600, height: 1024, device: 'tablet'},
			{ width: 601, height: 962, device: 'tablet'},
			{ width: 768, height: 1024, device: 'desktop or tablet'},
			{ width: 800, height: 1280, device: 'desktop or tablet'},
			{ width: 834, height: 1112, device: 'desktop or tablet'},
			{ width: 962, height: 601, device: 'tablet'},
			{ width: 1000, height: 700, device: 'desktop or tablet'},
			{ width: 1000, height: 1000, device: 'desktop or tablet'},
			{ width: 1024, height: 768, device: 'desktop or tablet'},
			{ width: 1024, height: 1366, device: 'desktop or tablet'},
			{ width: 1280, height: 720, device: 'desktop or tablet'},
			{ width: 1280, height: 800, device: 'desktop or tablet'},
			{ width: 1280, height: 1024, device: 'desktop'},
			{ width: 1366, height: 768, device: 'desktop'},
			{ width: 1440, height: 900, device: 'desktop'},
			{ width: 1536, height: 864, device: 'desktop'},
			{ width: 1600, height: 900, device: 'desktop'},
			{ width: 1920, height: 1080, device: 'desktop'}
		];
		for (const display of resolution) {
			if (
				width == display.width && height == display.height || (
					(display.device == 'phone' || display.device == 'tablet') &&
					height == display.width && width == display.height
				)
			) {
				return display.device
			}
		}
		return 'unknown'
	};

	const getScreen = imports => {

		const {
			require: {
				captureError,
				attempt,
				sendToTrash,
				trustInteger,
				lieProps,
				phantomDarkness,
				logTestResult
			}
		} = imports;
		
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				let lied = (
					lieProps['Screen.width'] ||
					lieProps['Screen.height'] ||
					lieProps['Screen.availWidth'] ||
					lieProps['Screen.availHeight'] ||
					lieProps['Screen.colorDepth'] ||
					lieProps['Screen.pixelDepth']
				) || false;
				const phantomScreen = phantomDarkness ? phantomDarkness.screen : screen;
				const phantomOuterWidth = phantomDarkness ? phantomDarkness.outerWidth : outerWidth;
				const phantomOuterHeight = phantomDarkness ? phantomDarkness.outerHeight : outerHeight;
				
				const { width, height, availWidth, availHeight, colorDepth, pixelDepth } = phantomScreen;
				const {
					width: screenWidth,
					height: screenHeight,
					availWidth: screenAvailWidth,
					availHeight: screenAvailHeight,
					colorDepth: screenColorDepth,
					pixelDepth: screenPixelDepth
				} = screen;

				const matching = (
					width == screenWidth &&
					height == screenHeight &&
					availWidth == screenAvailWidth &&
					availHeight == screenAvailHeight &&
					colorDepth == screenColorDepth &&
					pixelDepth == screenPixelDepth
				);

				if (!matching) {
					sendToTrash('screen', `[${
					[
						screenWidth,
						screenHeight,
						screenAvailWidth,
						screenAvailHeight,
						screenColorDepth,
						screenPixelDepth
					].join(', ')
				}] does not match iframe`);
				}

				if (screenAvailWidth > screenWidth) {
					sendToTrash('screen', `availWidth (${screenAvailWidth}) is greater than width (${screenWidth})`);
				}

				if (screenAvailHeight > screenHeight) {
					sendToTrash('screen', `availHeight (${screenAvailHeight}) is greater than height (${screenHeight})`);
				}
				
				const trusted = {0:!0, 1:!0, 4:!0, 8:!0, 15:!0, 16:!0, 24:!0, 32:!0, 48:!0};
				if (!trusted[screenColorDepth]) {
					sendToTrash('screen', `colorDepth (${screenColorDepth}) is not within set [0, 16, 24, 32]`);
				}
				
				if (!trusted[screenPixelDepth]) {
					sendToTrash('screen', `pixelDepth (${screenPixelDepth}) is not within set [0, 16, 24, 32]`);
				}

				if (screenPixelDepth != screenColorDepth) {
					sendToTrash('screen', `pixelDepth (${screenPixelDepth}) and colorDepth (${screenColorDepth}) do not match`);
				}

				const data = {
					device: getDevice(width, height),
					width: attempt(() => width ? trustInteger('width - invalid return type', width) : undefined),
					outerWidth: attempt(() => phantomOuterWidth ? trustInteger('outerWidth - invalid return type', phantomOuterWidth) : undefined),
					availWidth: attempt(() => availWidth ? trustInteger('availWidth - invalid return type', availWidth) : undefined),
					height: attempt(() => height ? trustInteger('height - invalid return type', height) : undefined),
					outerHeight: attempt(() => phantomOuterHeight ? trustInteger('outerHeight - invalid return type', phantomOuterHeight) : undefined),
					availHeight: attempt(() => availHeight ?  trustInteger('availHeight - invalid return type', availHeight) : undefined),
					colorDepth: attempt(() => colorDepth ? trustInteger('colorDepth - invalid return type', colorDepth) : undefined),
					pixelDepth: attempt(() => pixelDepth ? trustInteger('pixelDepth - invalid return type', pixelDepth) : undefined),
					lied
				};
				logTestResult({ start, test: 'screen', passed: true });
				return resolve({ ...data })
			}
			catch (error) {
				logTestResult({ test: 'screen', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	// inspired by https://arkenfox.github.io/TZP
	// https://github.com/vvo/tzdb/blob/master/time-zones-names.json
	const cities = [
		"UTC",
		"GMT",
		"Etc/GMT+0",
		"Etc/GMT+1",
		"Etc/GMT+10",
		"Etc/GMT+11",
		"Etc/GMT+12",
		"Etc/GMT+2",
		"Etc/GMT+3",
		"Etc/GMT+4",
		"Etc/GMT+5",
		"Etc/GMT+6",
		"Etc/GMT+7",
		"Etc/GMT+8",
		"Etc/GMT+9",
		"Etc/GMT-1",
		"Etc/GMT-10",
		"Etc/GMT-11",
		"Etc/GMT-12",
		"Etc/GMT-13",
		"Etc/GMT-14",
		"Etc/GMT-2",
		"Etc/GMT-3",
		"Etc/GMT-4",
		"Etc/GMT-5",
		"Etc/GMT-6",
		"Etc/GMT-7",
		"Etc/GMT-8",
		"Etc/GMT-9",
		"Etc/GMT",
		"Africa/Abidjan",
		"Africa/Accra",
		"Africa/Addis_Ababa",
		"Africa/Algiers",
		"Africa/Asmara",
		"Africa/Bamako",
		"Africa/Bangui",
		"Africa/Banjul",
		"Africa/Bissau",
		"Africa/Blantyre",
		"Africa/Brazzaville",
		"Africa/Bujumbura",
		"Africa/Cairo",
		"Africa/Casablanca",
		"Africa/Ceuta",
		"Africa/Conakry",
		"Africa/Dakar",
		"Africa/Dar_es_Salaam",
		"Africa/Djibouti",
		"Africa/Douala",
		"Africa/El_Aaiun",
		"Africa/Freetown",
		"Africa/Gaborone",
		"Africa/Harare",
		"Africa/Johannesburg",
		"Africa/Juba",
		"Africa/Kampala",
		"Africa/Khartoum",
		"Africa/Kigali",
		"Africa/Kinshasa",
		"Africa/Lagos",
		"Africa/Libreville",
		"Africa/Lome",
		"Africa/Luanda",
		"Africa/Lubumbashi",
		"Africa/Lusaka",
		"Africa/Malabo",
		"Africa/Maputo",
		"Africa/Maseru",
		"Africa/Mbabane",
		"Africa/Mogadishu",
		"Africa/Monrovia",
		"Africa/Nairobi",
		"Africa/Ndjamena",
		"Africa/Niamey",
		"Africa/Nouakchott",
		"Africa/Ouagadougou",
		"Africa/Porto-Novo",
		"Africa/Sao_Tome",
		"Africa/Tripoli",
		"Africa/Tunis",
		"Africa/Windhoek",
		"America/Adak",
		"America/Anchorage",
		"America/Anguilla",
		"America/Antigua",
		"America/Araguaina",
		"America/Argentina/Buenos_Aires",
		"America/Argentina/Catamarca",
		"America/Argentina/Cordoba",
		"America/Argentina/Jujuy",
		"America/Argentina/La_Rioja",
		"America/Argentina/Mendoza",
		"America/Argentina/Rio_Gallegos",
		"America/Argentina/Salta",
		"America/Argentina/San_Juan",
		"America/Argentina/San_Luis",
		"America/Argentina/Tucuman",
		"America/Argentina/Ushuaia",
		"America/Aruba",
		"America/Asuncion",
		"America/Atikokan",
		"America/Bahia",
		"America/Bahia_Banderas",
		"America/Barbados",
		"America/Belem",
		"America/Belize",
		"America/Blanc-Sablon",
		"America/Boa_Vista",
		"America/Bogota",
		"America/Boise",
		"America/Cambridge_Bay",
		"America/Campo_Grande",
		"America/Cancun",
		"America/Caracas",
		"America/Cayenne",
		"America/Cayman",
		"America/Chicago",
		"America/Chihuahua",
		"America/Costa_Rica",
		"America/Creston",
		"America/Cuiaba",
		"America/Curacao",
		"America/Danmarkshavn",
		"America/Dawson",
		"America/Dawson_Creek",
		"America/Denver",
		"America/Detroit",
		"America/Dominica",
		"America/Edmonton",
		"America/Eirunepe",
		"America/El_Salvador",
		"America/Fort_Nelson",
		"America/Fortaleza",
		"America/Glace_Bay",
		"America/Godthab",
		"America/Goose_Bay",
		"America/Grand_Turk",
		"America/Grenada",
		"America/Guadeloupe",
		"America/Guatemala",
		"America/Guayaquil",
		"America/Guyana",
		"America/Halifax",
		"America/Havana",
		"America/Hermosillo",
		"America/Indiana/Indianapolis",
		"America/Indiana/Knox",
		"America/Indiana/Marengo",
		"America/Indiana/Petersburg",
		"America/Indiana/Tell_City",
		"America/Indiana/Vevay",
		"America/Indiana/Vincennes",
		"America/Indiana/Winamac",
		"America/Inuvik",
		"America/Iqaluit",
		"America/Jamaica",
		"America/Juneau",
		"America/Kentucky/Louisville",
		"America/Kentucky/Monticello",
		"America/Kralendijk",
		"America/La_Paz",
		"America/Lima",
		"America/Los_Angeles",
		"America/Lower_Princes",
		"America/Maceio",
		"America/Managua",
		"America/Manaus",
		"America/Marigot",
		"America/Martinique",
		"America/Matamoros",
		"America/Mazatlan",
		"America/Menominee",
		"America/Merida",
		"America/Metlakatla",
		"America/Mexico_City",
		"America/Miquelon",
		"America/Moncton",
		"America/Monterrey",
		"America/Montevideo",
		"America/Montserrat",
		"America/Nassau",
		"America/New_York",
		"America/Nipigon",
		"America/Nome",
		"America/Noronha",
		"America/North_Dakota/Beulah",
		"America/North_Dakota/Center",
		"America/North_Dakota/New_Salem",
		"America/Ojinaga",
		"America/Panama",
		"America/Pangnirtung",
		"America/Paramaribo",
		"America/Phoenix",
		"America/Port-au-Prince",
		"America/Port_of_Spain",
		"America/Porto_Velho",
		"America/Puerto_Rico",
		"America/Punta_Arenas",
		"America/Rainy_River",
		"America/Rankin_Inlet",
		"America/Recife",
		"America/Regina",
		"America/Resolute",
		"America/Rio_Branco",
		"America/Santarem",
		"America/Santiago",
		"America/Santo_Domingo",
		"America/Sao_Paulo",
		"America/Scoresbysund",
		"America/Sitka",
		"America/St_Barthelemy",
		"America/St_Johns",
		"America/St_Kitts",
		"America/St_Lucia",
		"America/St_Thomas",
		"America/St_Vincent",
		"America/Swift_Current",
		"America/Tegucigalpa",
		"America/Thule",
		"America/Thunder_Bay",
		"America/Tijuana",
		"America/Toronto",
		"America/Tortola",
		"America/Vancouver",
		"America/Whitehorse",
		"America/Winnipeg",
		"America/Yakutat",
		"America/Yellowknife",
		"Antarctica/Casey",
		"Antarctica/Davis",
		"Antarctica/DumontDUrville",
		"Antarctica/Macquarie",
		"Antarctica/Mawson",
		"Antarctica/McMurdo",
		"Antarctica/Palmer",
		"Antarctica/Rothera",
		"Antarctica/Syowa",
		"Antarctica/Troll",
		"Antarctica/Vostok",
		"Arctic/Longyearbyen",
		"Asia/Aden",
		"Asia/Almaty",
		"Asia/Amman",
		"Asia/Anadyr",
		"Asia/Aqtau",
		"Asia/Aqtobe",
		"Asia/Ashgabat",
		"Asia/Atyrau",
		"Asia/Baghdad",
		"Asia/Bahrain",
		"Asia/Baku",
		"Asia/Bangkok",
		"Asia/Barnaul",
		"Asia/Beirut",
		"Asia/Bishkek",
		"Asia/Brunei",
		"Asia/Calcutta",
		"Asia/Chita",
		"Asia/Choibalsan",
		"Asia/Colombo",
		"Asia/Damascus",
		"Asia/Dhaka",
		"Asia/Dili",
		"Asia/Dubai",
		"Asia/Dushanbe",
		"Asia/Famagusta",
		"Asia/Gaza",
		"Asia/Hebron",
		"Asia/Ho_Chi_Minh",
		"Asia/Hong_Kong",
		"Asia/Hovd",
		"Asia/Irkutsk",
		"Asia/Jakarta",
		"Asia/Jayapura",
		"Asia/Jerusalem",
		"Asia/Kabul",
		"Asia/Kamchatka",
		"Asia/Karachi",
		"Asia/Kathmandu",
		"Asia/Khandyga",
		"Asia/Kolkata",
		"Asia/Krasnoyarsk",
		"Asia/Kuala_Lumpur",
		"Asia/Kuching",
		"Asia/Kuwait",
		"Asia/Macau",
		"Asia/Magadan",
		"Asia/Makassar",
		"Asia/Manila",
		"Asia/Muscat",
		"Asia/Nicosia",
		"Asia/Novokuznetsk",
		"Asia/Novosibirsk",
		"Asia/Omsk",
		"Asia/Oral",
		"Asia/Phnom_Penh",
		"Asia/Pontianak",
		"Asia/Pyongyang",
		"Asia/Qatar",
		"Asia/Qostanay",
		"Asia/Qyzylorda",
		"Asia/Riyadh",
		"Asia/Sakhalin",
		"Asia/Samarkand",
		"Asia/Seoul",
		"Asia/Shanghai",
		"Asia/Singapore",
		"Asia/Srednekolymsk",
		"Asia/Taipei",
		"Asia/Tashkent",
		"Asia/Tbilisi",
		"Asia/Tehran",
		"Asia/Thimphu",
		"Asia/Tokyo",
		"Asia/Tomsk",
		"Asia/Ulaanbaatar",
		"Asia/Urumqi",
		"Asia/Ust-Nera",
		"Asia/Vientiane",
		"Asia/Vladivostok",
		"Asia/Yakutsk",
		"Asia/Yangon",
		"Asia/Yekaterinburg",
		"Asia/Yerevan",
		"Atlantic/Azores",
		"Atlantic/Bermuda",
		"Atlantic/Canary",
		"Atlantic/Cape_Verde",
		"Atlantic/Faroe",
		"Atlantic/Madeira",
		"Atlantic/Reykjavik",
		"Atlantic/South_Georgia",
		"Atlantic/St_Helena",
		"Atlantic/Stanley",
		"Australia/Adelaide",
		"Australia/Brisbane",
		"Australia/Broken_Hill",
		"Australia/Currie",
		"Australia/Darwin",
		"Australia/Eucla",
		"Australia/Hobart",
		"Australia/Lindeman",
		"Australia/Lord_Howe",
		"Australia/Melbourne",
		"Australia/Perth",
		"Australia/Sydney",
		"Europe/Amsterdam",
		"Europe/Andorra",
		"Europe/Astrakhan",
		"Europe/Athens",
		"Europe/Belgrade",
		"Europe/Berlin",
		"Europe/Bratislava",
		"Europe/Brussels",
		"Europe/Bucharest",
		"Europe/Budapest",
		"Europe/Busingen",
		"Europe/Chisinau",
		"Europe/Copenhagen",
		"Europe/Dublin",
		"Europe/Gibraltar",
		"Europe/Guernsey",
		"Europe/Helsinki",
		"Europe/Isle_of_Man",
		"Europe/Istanbul",
		"Europe/Jersey",
		"Europe/Kaliningrad",
		"Europe/Kiev",
		"Europe/Kirov",
		"Europe/Lisbon",
		"Europe/Ljubljana",
		"Europe/London",
		"Europe/Luxembourg",
		"Europe/Madrid",
		"Europe/Malta",
		"Europe/Mariehamn",
		"Europe/Minsk",
		"Europe/Monaco",
		"Europe/Moscow",
		"Europe/Oslo",
		"Europe/Paris",
		"Europe/Podgorica",
		"Europe/Prague",
		"Europe/Riga",
		"Europe/Rome",
		"Europe/Samara",
		"Europe/San_Marino",
		"Europe/Sarajevo",
		"Europe/Saratov",
		"Europe/Simferopol",
		"Europe/Skopje",
		"Europe/Sofia",
		"Europe/Stockholm",
		"Europe/Tallinn",
		"Europe/Tirane",
		"Europe/Ulyanovsk",
		"Europe/Uzhgorod",
		"Europe/Vaduz",
		"Europe/Vatican",
		"Europe/Vienna",
		"Europe/Vilnius",
		"Europe/Volgograd",
		"Europe/Warsaw",
		"Europe/Zagreb",
		"Europe/Zaporozhye",
		"Europe/Zurich",
		"Indian/Antananarivo",
		"Indian/Chagos",
		"Indian/Christmas",
		"Indian/Cocos",
		"Indian/Comoro",
		"Indian/Kerguelen",
		"Indian/Mahe",
		"Indian/Maldives",
		"Indian/Mauritius",
		"Indian/Mayotte",
		"Indian/Reunion",
		"Pacific/Apia",
		"Pacific/Auckland",
		"Pacific/Bougainville",
		"Pacific/Chatham",
		"Pacific/Chuuk",
		"Pacific/Easter",
		"Pacific/Efate",
		"Pacific/Enderbury",
		"Pacific/Fakaofo",
		"Pacific/Fiji",
		"Pacific/Funafuti",
		"Pacific/Galapagos",
		"Pacific/Gambier",
		"Pacific/Guadalcanal",
		"Pacific/Guam",
		"Pacific/Honolulu",
		"Pacific/Kiritimati",
		"Pacific/Kosrae",
		"Pacific/Kwajalein",
		"Pacific/Majuro",
		"Pacific/Marquesas",
		"Pacific/Midway",
		"Pacific/Nauru",
		"Pacific/Niue",
		"Pacific/Norfolk",
		"Pacific/Noumea",
		"Pacific/Pago_Pago",
		"Pacific/Palau",
		"Pacific/Pitcairn",
		"Pacific/Pohnpei",
		"Pacific/Port_Moresby",
		"Pacific/Rarotonga",
		"Pacific/Saipan",
		"Pacific/Tahiti",
		"Pacific/Tarawa",
		"Pacific/Tongatapu",
		"Pacific/Wake",
		"Pacific/Wallis"
	];

	const getTimezoneOffset = phantomDate => {
		const [year, month, day] = JSON.stringify(new phantomDate())
			.slice(1,11)
			.split('-');
		const dateString = `${month}/${day}/${year}`;
		const dateStringUTC = `${year}-${month}-${day}`;
		const now = +new phantomDate(dateString);
		const utc = +new phantomDate(dateStringUTC);
		const offset = +((now - utc)/60000);
		return ~~offset 
	};

	const getTimezoneOffsetHistory = ({ year, phantomIntl, phantomDate, city = null }) => {
		const format = {
			timeZone: '',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};
	    const minute = 60000;
	    let formatter, summer;
	    if (city) {
	        const options = {
	            ...format,
	            timeZone: city
	        };
	        formatter = new phantomIntl.DateTimeFormat('en', options);
	        summer = +new phantomDate(formatter.format(new phantomDate(`7/1/${year}`)));
	    } else {
	        summer = +new phantomDate(`7/1/${year}`);
	    }
	    const summerUTCTime = +new phantomDate(`${year}-07-01`);
	    const offset = (summer - summerUTCTime) / minute;
	    return offset
	};

	const binarySearch = (list, fn) => {
	    const end = list.length;
	    const middle = Math.floor(end / 2);
	    const [left, right] = [list.slice(0, middle), list.slice(middle, end)];
	    const found = fn(left);
	    return end == 1 || found.length ? found : binarySearch(right, fn)
	};

	const decryptLocation = ({ year, timeZone, phantomIntl, phantomDate }) => {
		const system = getTimezoneOffsetHistory({ year, phantomIntl, phantomDate});
		const resolvedOptions = getTimezoneOffsetHistory({ year, phantomIntl, phantomDate, city: timeZone});
		const filter = cities => cities
			.filter(city => system == getTimezoneOffsetHistory({ year, phantomIntl, phantomDate, city }));

		// get city region set
		const decryption = (
			system == resolvedOptions ? [timeZone] : binarySearch(cities, filter)
		);

		// reduce set to one city
		const decrypted = (
			decryption.length == 1 ? decryption[0] :
			!new Set(decryption).has(timeZone) ? `Earth/UniqueVille` : timeZone
		);
		return decrypted
	};

	const formatLocation = x => x.replace(/_/, ' ').split('/').join(', '); 

	const getTimezone = imports => {

		const {
			require: {
				captureError,
				lieProps,
				phantomDarkness,
				logTestResult
			}
		} = imports;

		return new Promise(async resolve => {
			try {
				const start = performance.now();
				let lied = (
					lieProps['Date.getTimezoneOffset'] ||
					lieProps['Intl.DateTimeFormat.resolvedOptions'] ||
					lieProps['Intl.RelativeTimeFormat.resolvedOptions']
				) || false;
				const phantomDate = phantomDarkness ? phantomDarkness.Date : Date;
				const phantomIntl = phantomDarkness ? phantomDarkness.Intl : Date;

				const year = 1113;
				const { timeZone } = phantomIntl.DateTimeFormat().resolvedOptions();
				const decrypted = decryptLocation({ year, timeZone, phantomIntl, phantomDate });
				const locationEpoch = +new Date(new Date(`7/1/${year}`));
				const notWithinParentheses = /.*\(|\).*/g;
				const data =  {
					zone: (''+new phantomDate()).replace(notWithinParentheses, ''),
					location: formatLocation(timeZone),
					locationMeasured: formatLocation(decrypted),
					locationEpoch,
					offset: new phantomDate().getTimezoneOffset(),
					offsetComputed: getTimezoneOffset(phantomDate),
					lied
				};
				logTestResult({ start, test: 'timezone', passed: true });
				return resolve({ ...data })
			}
			catch (error) {
				logTestResult({ test: 'timezone', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getVoices = imports => {

		const {
			require: {
				captureError,
				phantomDarkness,
				logTestResult,
				isChrome,
			}
		} = imports;
			
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				const win = phantomDarkness ? phantomDarkness : window;
				if (!('speechSynthesis' in win && 'onvoiceschanged' in speechSynthesis)) {
					logTestResult({ test: 'speech', passed: false });
					return resolve()
				}
				let success = false;
				const awaitVoices = () => {
					const data = win.speechSynthesis.getVoices();
					if (!data.length) {
						return
					}
					success = true;
					const voices = data.map(({ name, lang }) => ({ name, lang }));
					const check = {
						microsoft: voices.filter(key => (/microsoft/i).test(key.name)).length,
						google: voices.filter(key => (/google/i).test(key.name)).length,
						chromeOS: voices.filter(key => (/chrome os/i).test(key.name)).length,
						android: voices.filter(key => (/android/i).test(key.name)).length
					};
					logTestResult({ start, test: 'speech', passed: true });
					return resolve({ voices, ...check, })
				};
				
				awaitVoices();
				win.speechSynthesis.onvoiceschanged = awaitVoices;
				setTimeout(() => {
					return !success ? resolve() : undefined
				}, 10);
			}
			catch (error) {
				logTestResult({ test: 'speech', passed: false });
				captureError(error);
				return resolve()
			}
		})
	};

	const getWebRTCData = imports => {

		const {
			require: {
				isFirefox,
				captureError,
				caniuse,
				phantomDarkness,
				logTestResult
			}
		} = imports;
		
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				let rtcPeerConnection;
				try {
					rtcPeerConnection = (
						phantomDarkness.RTCPeerConnection ||
						phantomDarkness.webkitRTCPeerConnection ||
						phantomDarkness.mozRTCPeerConnection ||
						phantomDarkness.msRTCPeerConnection
					);
				}
				catch (error) {
					rtcPeerConnection = (
						RTCPeerConnection ||
						webkitRTCPeerConnection ||
						mozRTCPeerConnection ||
						msRTCPeerConnection
					);
				}
				
				if (!rtcPeerConnection) {
					logTestResult({ test: 'webrtc', passed: false });
					return resolve()
				}
				const connection = new rtcPeerConnection({
					iceServers: [{
						urls: ['stun:stun.l.google.com:19302?transport=udp']
					}]
				}, {
					optional: [{
						RtpDataChannels: true
					}]
				});
				
				let success = false;
				connection.onicecandidate = async e => { 
					const candidateEncoding = /((udp|tcp)\s)((\d|\w)+\s)((\d|\w|(\.|\:))+)(?=\s)/ig;
					const connectionLineEncoding = /(c=IN\s)(.+)\s/ig;
					if (!e.candidate) {
						return
					}
					const { candidate } = e.candidate;
					const encodingMatch = candidate.match(candidateEncoding);
					if (encodingMatch) {
						success = true;
						const {
							sdp
						} = e.target.localDescription;
						const ipAddress = caniuse(() => e.candidate.address);
						const candidateIpAddress = caniuse(() => encodingMatch[0].split(' ')[2]);
						const connectionLineIpAddress = caniuse(() => sdp.match(connectionLineEncoding)[0].trim().split(' ')[2]);

						const type = caniuse(() => /typ ([a-z]+)/.exec(candidate)[1]);
						const foundation = caniuse(() => /candidate:(\d+)\s/.exec(candidate)[1]);
						const protocol = caniuse(() => /candidate:\d+ \w+ (\w+)/.exec(candidate)[1]);

						const data = {
							['ip address']: ipAddress,
							candidate: candidateIpAddress,
							connection: connectionLineIpAddress,
							type,
							foundation,
							protocol
						};
						
						logTestResult({ start, test: 'webrtc', passed: true });
						return resolve({ ...data })
					} else {
						return
					}
				};
				
				setTimeout(() => {
					if (!success) {
						
						logTestResult({ test: 'webrtc', passed: false });
						captureError(new Error('RTCIceCandidate failed'));
						return resolve()
					}
				}, 1000);
				connection.createDataChannel('creep');
				connection.createOffer()
					.then(e => connection.setLocalDescription(e))
					.catch(error => console.log(error));
			}
			catch (error) {
				logTestResult({ test: 'webrtc', passed: false });
				captureError(error, 'RTCPeerConnection failed or blocked by client');
				return resolve()
			}
		})
	};

	const source = 'creepworker.js';

	const getDedicatedWorker = phantomDarkness => {
		return new Promise(resolve => {
			try {
				if (phantomDarkness && !phantomDarkness.Worker) {
					return resolve()
				}
				else if (
					phantomDarkness && phantomDarkness.Worker.prototype.constructor.name != 'Worker'
				) {
					throw new Error('Worker tampered with by client')
				}
				const worker = (
					phantomDarkness ? phantomDarkness.Worker : Worker
				);
				const dedicatedWorker = new worker(source);
				dedicatedWorker.onmessage = message => {
					dedicatedWorker.terminate();
					return resolve(message.data)
				};
			}
			catch(error) {
				console.error(error);
				captureError(error);
				return resolve()
			}
		})
	};

	const getSharedWorker = phantomDarkness => {
		return new Promise(resolve => {
			try {
				if (phantomDarkness && !phantomDarkness.SharedWorker) {
					return resolve()
				}
				else if (
					phantomDarkness && phantomDarkness.SharedWorker.prototype.constructor.name != 'SharedWorker'
				) {
					throw new Error('SharedWorker tampered with by client')
				}

				const worker = (
					phantomDarkness ? phantomDarkness.SharedWorker : SharedWorker
				);
				const sharedWorker = new worker(source);
				sharedWorker.port.start();
				sharedWorker.port.addEventListener('message', message => {
					sharedWorker.port.close();
					return resolve(message.data)
				});
			}
			catch(error) {
				console.error(error);
				captureError(error);
				return resolve()
			}
		})
	};

	const getServiceWorker = () => {
		return new Promise(async resolve => {
			try {
				if (!('serviceWorker' in navigator)) {
					return resolve()
				}
				else if (navigator.serviceWorker.__proto__.constructor.name != 'ServiceWorkerContainer') {
					throw new Error('ServiceWorkerContainer tampered with by client')
				}

				navigator.serviceWorker.register(source).catch(error => {
					console.error(error);
					return resolve()
				});
				navigator.serviceWorker.ready.then(registration => {
					const broadcast = new BroadcastChannel('creep_service_primary');
					broadcast.onmessage = message => {
						registration.unregister();
						broadcast.close();
						return resolve(message.data)
					};
					return broadcast.postMessage({ type: 'fingerprint'})
				}).catch(error => {
					console.error(error);
					return resolve()
				});
			}
			catch(error) {
				console.error(error);
				captureError(error);
				return resolve()
			}
		})
	};

	const getBestWorkerScope = imports => {	
		const {
			require: {
				getOS,
				captureError,
				caniuse,
				phantomDarkness,
				getUserAgentPlatform,
				logTestResult
			}
		} = imports;
		return new Promise(async resolve => {
			try {
				const start = performance.now();
				let type = 'service'; // loads fast but is not available in frames
				let workerScope = await getServiceWorker()
					.catch(error => console.error(error.message));
				if (!caniuse(() => workerScope.userAgent)) {
					type = 'shared'; // no support in Safari, iOS, and Chrome Android
					workerScope = await getSharedWorker(phantomDarkness)
					.catch(error => console.error(error.message));
				}
				if (!caniuse(() => workerScope.userAgent)) {
					type = 'dedicated'; // simulators & extensions can spoof userAgent
					workerScope = await getDedicatedWorker(phantomDarkness)
					.catch(error => console.error(error.message));
				}
				if (caniuse(() => workerScope.userAgent)) {
					const { canvas2d } = workerScope || {};
					workerScope.system = getOS(workerScope.userAgent);
					workerScope.device = getUserAgentPlatform({ userAgent: workerScope.userAgent });
					workerScope.canvas2d = { dataURI: canvas2d };
					workerScope.type = type;
					logTestResult({ start, test: `${type} worker`, passed: true });
					return resolve({ ...workerScope })
				}
				return resolve()
			}
			catch (error) {
				logTestResult({ test: 'worker', passed: false });
				captureError(error, 'workers failed or blocked by client');
				return resolve()
			}
		})
	};

	const imports = {
		require: {
			// helpers
			isChrome,
			isBrave,
			isFirefox,
			getOS,
			decryptUserAgent,
			getUserAgentPlatform,
			logTestResult,
			// crypto
			instanceId,
			hashMini,
			hashify,
			// html
			patch,
			html,
			note,
			count,
			modal,
			// captureErrors
			captureError,
			attempt,
			caniuse,
			// trash
			sendToTrash,
			proxyBehavior,
			gibberish,
			trustInteger,
			// lies
			documentLie,
			lieProps: lieProps.getProps(),
			// collections
			errorsCaptured,
			trashBin,
			lieRecords,
			phantomDarkness,
			parentPhantom,
			dragonFire,
			dragonOfDeath,
			parentDragon,
			getPluginLies
		}
	}
	// worker.js

	;(async imports => {

		const {
			require: {
				instanceId,
				hashMini,
				patch,
				html,
				note,
				count,
				modal,
				caniuse
			}
		} = imports;
		
		const fingerprint = async () => {
			const timeStart = timer();
			
			/*
			const windowFeaturesComputed = await getWindowFeatures(imports)
			const htmlElementVersionComputed = await getHTMLElementVersion(imports)
			const cssComputed = await getCSS(imports)
			const screenComputed = await getScreen(imports)
			const voicesComputed = await getVoices(imports)
			const canvas2dComputed = await getCanvas2d(imports)
			const canvasWebglComputed = await getCanvasWebgl(imports)
			const mathsComputed = await getMaths(imports)
			const consoleErrorsComputed = await getConsoleErrors(imports)
			const timezoneComputed = await getTimezone(imports)
			const clientRectsComputed = await getClientRects(imports)
			const offlineAudioContextComputed = await getOfflineAudioContext(imports)
			const fontsComputed = await getFonts(imports, [...fontList])
				.catch(error => { console.error(error.message)})
			const workerScopeComputed = await getBestWorkerScope(imports)
			const mediaComputed = await getMedia(imports)
			const webRTCDataComputed = await getWebRTCData(imports)
			const navigatorComputed = await getNavigator(imports, workerScopeComputed)
				.catch(error => console.error(error.message))
			*/
			
			const [
				windowFeaturesComputed,
				htmlElementVersionComputed,
				cssComputed,
				cssMediaComputed,
				screenComputed,
				voicesComputed,
				canvas2dComputed,
				canvasWebglComputed,
				mathsComputed,
				consoleErrorsComputed,
				timezoneComputed,
				clientRectsComputed,
				offlineAudioContextComputed,
				fontsComputed,
				workerScopeComputed,
				mediaComputed,
				webRTCDataComputed
			] = await Promise.all([
				getWindowFeatures(imports),
				getHTMLElementVersion(imports),
				getCSS(imports),
				getCSSMedia(imports),
				getScreen(imports),
				getVoices(imports),
				getCanvas2d(imports),
				getCanvasWebgl(imports),
				getMaths(imports),
				getConsoleErrors(imports),
				getTimezone(imports),
				getClientRects(imports),
				getOfflineAudioContext(imports),
				getFonts(imports, [...fontList]),
				getBestWorkerScope(imports),
				getMedia(imports),
				getWebRTCData(imports)
			]).catch(error => console.error(error.message));

			const navigatorComputed = await getNavigator(imports, workerScopeComputed)
				.catch(error => console.error(error.message));
			
			const [
				liesComputed,
				trashComputed,
				capturedErrorsComputed
			] = await Promise.all([
				getLies(imports),
				getTrash(imports),
				getCapturedErrors(imports)
			]).catch(error => console.error(error.message));

			//const start = performance.now()
			const [
				windowHash,
				htmlHash,
				cssMediaHash,
				cssHash,
				screenHash,
				voicesHash,
				canvas2dHash,
				canvasWebglHash,
				mathsHash,
				consoleErrorsHash,
				timezoneHash,
				rectsHash,
				audioHash,
				fontsHash,
				workerHash,
				mediaHash,
				webRTCHash,
				navigatorHash,
				liesHash,
				trashHash,
				errorsHash
			] = await Promise.all([
				hashify(windowFeaturesComputed),
				hashify(htmlElementVersionComputed.keys),
				hashify(cssMediaComputed),
				hashify(cssComputed),
				hashify(screenComputed),
				hashify(voicesComputed),
				hashify(canvas2dComputed),
				hashify(canvasWebglComputed),
				hashify(mathsComputed.data),
				hashify(consoleErrorsComputed.errors),
				hashify(timezoneComputed),
				hashify(clientRectsComputed),
				hashify(offlineAudioContextComputed),
				hashify(fontsComputed),
				hashify(workerScopeComputed),
				hashify(mediaComputed),
				hashify(webRTCDataComputed),
				hashify(navigatorComputed),
				hashify(liesComputed),
				hashify(trashComputed),
				hashify(capturedErrorsComputed)
			]).catch(error => console.error(error.message));
			//console.log(performance.now()-start)

			const timeEnd = timeStart();

			if (parentPhantom) {
				parentPhantom.parentNode.removeChild(parentPhantom);
			}
			if (parentDragon) {
				parentDragon.parentNode.removeChild(parentDragon);
			}
			
			const fingerprint = {
				workerScope: !workerScopeComputed ? undefined : { ...workerScopeComputed, $hash: workerHash },
				webRTC: !webRTCDataComputed ? undefined : {...webRTCDataComputed, $hash: webRTCHash },
				navigator: !navigatorComputed ? undefined : {...navigatorComputed, $hash: navigatorHash },
				windowFeatures: !windowFeaturesComputed ? undefined : {...windowFeaturesComputed, $hash: windowHash },
				htmlElementVersion: !htmlElementVersionComputed ? undefined : {...htmlElementVersionComputed, $hash: htmlHash },
				cssMedia: !cssMediaComputed ? undefined : {...cssMediaComputed, $hash: cssMediaHash },
				css: !cssComputed ? undefined : {...cssComputed, $hash: cssHash },
				screen: !screenComputed ? undefined : {...screenComputed, $hash: screenHash },
				voices: !voicesComputed ? undefined : {...voicesComputed, $hash: voicesHash },
				media: !mediaComputed ? undefined : {...mediaComputed, $hash: mediaHash },
				canvas2d: !canvas2dComputed ? undefined : {...canvas2dComputed, $hash: canvas2dHash },
				canvasWebgl: !canvasWebglComputed ? undefined : {...canvasWebglComputed, $hash: canvasWebglHash },
				maths: !mathsComputed ? undefined : {...mathsComputed, $hash: mathsHash },
				consoleErrors: !consoleErrorsComputed ? undefined : {...consoleErrorsComputed, $hash: consoleErrorsHash },
				timezone: !timezoneComputed ? undefined : {...timezoneComputed, $hash: timezoneHash },
				clientRects: !clientRectsComputed ? undefined : {...clientRectsComputed, $hash: rectsHash },
				offlineAudioContext: !offlineAudioContextComputed ? undefined : {...offlineAudioContextComputed, $hash: audioHash },
				fonts: !fontsComputed ? undefined : {...fontsComputed, $hash: fontsHash },
				lies: !liesComputed ? undefined : {...liesComputed, $hash: liesHash },
				trash: !trashComputed ? undefined : {...trashComputed, $hash: trashHash },
				capturedErrors: !capturedErrorsComputed ? undefined : {...capturedErrorsComputed, $hash: errorsHash },
			};
			return { fingerprint, timeEnd }
		};
		// fingerprint and render
		const { fingerprint: fp, timeEnd } = await fingerprint().catch(error => console.error(error));

		console.log('%c✔ loose fingerprint passed', 'color:#4cca9f');

		console.groupCollapsed('Loose Fingerprint');
		console.log(fp);
		console.groupEnd();

		console.groupCollapsed('Loose Fingerprint JSON');
		console.log('diff check at https://www.diffchecker.com/diff\n\n', JSON.stringify(fp, null, '\t'));
		console.groupEnd();
		
		// Trusted Fingerprint
		const distrust = { distrust: { brave: isBrave, firefox: isFirefox } };
		const trashLen = fp.trash.trashBin.length;
		const liesLen = !('data' in fp.lies) ? 0 : fp.lies.data.length;
		const errorsLen = fp.capturedErrors.data.length;
		const creep = {
			navigator: ( 
				!fp.navigator || fp.navigator.lied ? undefined : {
					device: fp.navigator.device,
					deviceMemory: isBrave ? distrust : fp.navigator.deviceMemory,
					doNotTrack: fp.navigator.doNotTrack,
					hardwareConcurrency: isBrave ? distrust : fp.navigator.hardwareConcurrency,
					maxTouchPoints: fp.navigator.maxTouchPoints,
					mimeTypes: fp.navigator.mimeTypes,
					plugins: isBrave ? distrust : fp.navigator.plugins,
					platform: fp.navigator.platform,
					system: fp.navigator.system,
					vendor: fp.navigator.vendor
				}
			),
			screen: ( 
				!fp.screen || fp.screen.lied || (!!liesLen && isFirefox) ? undefined : {
					height: fp.screen.height,
					width: fp.screen.width,
					pixelDepth: fp.screen.pixelDepth,
					colorDepth: fp.screen.colorDepth
				}
			),
			workerScope: fp.workerScope ? {
				canvas2d: (
					!!liesLen && (isBrave || isFirefox) ? distrust : 
					fp.workerScope.canvas2d
				),
				deviceMemory: (
					!!liesLen && isBrave ? distrust : 
					fp.workerScope.deviceMemory
				),
				hardwareConcurrency: (
					!!liesLen && isBrave ? distrust : 
					fp.workerScope.hardwareConcurrency
				),
				language: fp.workerScope.language,
				platform: fp.workerScope.platform,
				system: fp.workerScope.system,
				device: fp.workerScope.device,
				timezoneLocation: fp.workerScope.timezoneLocation,
				['webgl renderer']: (
					!!liesLen && isBrave ? distrust : 
					fp.workerScope.webglRenderer
				),
				['webgl vendor']: (
					!!liesLen && isBrave ? distrust : 
					fp.workerScope.webglVendor
				)
			} : undefined,
			media: fp.media,
			canvas2d: ( 
				!fp.canvas2d || fp.canvas2d.lied ? undefined : 
				fp.canvas2d
			),
			canvasWebgl: ( 
				!fp.canvasWebgl || fp.canvasWebgl.lied ? undefined : 
				fp.canvasWebgl
			),
			cssMedia: !fp.cssMedia ? undefined : {
				reducedMotion: caniuse(() => fp.cssMedia.mediaCSS.reducedMotion),
				colorScheme: caniuse(() => fp.cssMedia.mediaCSS.colorScheme),
				monochrome: caniuse(() => fp.cssMedia.mediaCSS.monochrome),
				invertedColors: caniuse(() => fp.cssMedia.mediaCSS.invertedColors),
				forcedColors: caniuse(() => fp.cssMedia.mediaCSS.forcedColors),
				anyHover: caniuse(() => fp.cssMedia.mediaCSS.anyHover),
				hover: caniuse(() => fp.cssMedia.mediaCSS.hover),
				anyPointer: caniuse(() => fp.cssMedia.mediaCSS.anyPointer),
				pointer: caniuse(() => fp.cssMedia.mediaCSS.pointer),
				colorGamut: caniuse(() => fp.cssMedia.mediaCSS.colorGamut),
				screenQuery: caniuse(() => fp.cssMedia.mediaCSS.screenQuery),
			},
			css: !fp.css ? undefined : {
				prototype: caniuse(() => fp.css.getComputedStyle.prototypeName),
				system: caniuse(() => fp.css.system)
			},
			maths: !fp.maths || fp.maths.lied ? undefined : fp.maths,
			consoleErrors: fp.consoleErrors,
			timezone: !fp.timezone || fp.timezone.lied ? undefined : {
				locationMeasured: fp.timezone.locationMeasured
			},
			clientRects: !fp.clientRects || fp.clientRects.lied ? undefined : fp.clientRects,
			offlineAudioContext: (
				!!liesLen && isBrave && !!fp.offlineAudioContext ? fp.offlineAudioContext.values :
				!fp.offlineAudioContext || fp.offlineAudioContext.lied ? undefined :
				fp.offlineAudioContext
			),
			fonts: !fp.fonts || fp.fonts.lied ? undefined : fp.fonts,
			// skip trash since it is random
			lies: !('data' in fp.lies) ? false : !!liesLen,
			capturedErrors: !!errorsLen,
			voices: fp.voices
		};

		console.log('%c✔ stable fingerprint passed', 'color:#4cca9f');

		console.groupCollapsed('Stable Fingerprint');
		console.log(creep);
		console.groupEnd();

		console.groupCollapsed('Stable Fingerprint JSON');
		console.log('diff check at https://www.diffchecker.com/diff\n\n', JSON.stringify(creep, null, '\t'));
		console.groupEnd();

		// get/post request
		const webapp = 'https://creepjs-6bd8e.web.app/fingerprint';

		const [fpHash, creepHash] = await Promise.all([hashify(fp), hashify(creep)])
		.catch(error => { 
			console.error(error.message);
		});
		
		const hasTrash = !!trashLen;
		const { lies: hasLied, capturedErrors: hasErrors } = creep;

		// patch dom	
		const el = document.getElementById('fingerprint-data');
		patch(el, html`
	<div id="fingerprint-data">
		<div class="fingerprint-header-container">
			<div class="fingerprint-header">
				<strong>Your ID:</strong><span class="trusted-fingerprint ellipsis main-hash">${hashMini(creepHash)}</span>
				<div class="ellipsis"><span class="time">${timeEnd.toFixed(2)} ms</span></div>
			</div>
		</div>
		<div id="creep-browser" class="visitor-info">
			<div class="flex-grid">
				<div class="col-six">
					<strong id="loader">Loading...</strong>
					<div>trust score: <span class="blurred">100%</span></div>
					<div>visits: <span class="blurred">1</span></div>
					<div>first: <span class="blurred">##/##/####, 00:00:00 AM</span></div>
					<div>last: <span class="blurred">##/##/####, 00:00:00 AM</span></div>
					<div>persistence: <span class="blurred">0.0 hours/span></div>
				</div>
				<div class="col-six">
					<div>has trash: <span class="blurred">false</span></div>
					<div>has lied: <span class="blurred">false</span></div>
					<div>has errors: <span class="blurred">false</span></div>
					<div>loose fingerprint: <span class="blurred">00000000</span></div>
					<div>loose count: <span class="blurred">1</span></div>
					<div>bot: <span class="blurred">false</span></div>
				</div>
			</div>
			<div id="signature">
			</div>
		</div>
		<div class="flex-grid">
			${(() => {
				const { trash: { trashBin } } = fp;
				const trashLen = trashBin.length;
				return `
				<div class="col-four${trashLen ? ' trash': ''}">
					<strong>Trash</strong>${
						trashLen ? `<span class="hash">${hashMini(trashBin)}</span>` : ''
					}
					<div>gathered (${!trashLen ? '0' : ''+trashLen }): ${
						trashLen ? modal(
							'creep-trash',
							trashBin.map((trash,i) => `${i+1}: ${trash.name}: ${trash.value}`).join('<br>')
						) : ''
					}</div>
				</div>`
			})()}
			${(() => {
				const { lies: { data, totalLies } } = fp; 
				const toJSONFormat = obj => JSON.stringify(obj, null, '\t');
				const sanitize = str => str.replace(/\</g, '&lt;');
				return `
				<div class="col-four${totalLies ? ' lies': ''}">
					<strong>Lies</strong>${totalLies ? `<span class="hash">${hashMini(data)}</span>` : ''}
					<div>unmasked (${!totalLies ? '0' : ''+totalLies }): ${
						totalLies ? modal('creep-lies', Object.keys(data).map(key => {
							const { name, lieTypes: { lies, fingerprint } } = data[key];
							const lieFingerprint = !!fingerprint ? { hash: hashMini(fingerprint), json: sanitize(toJSONFormat(fingerprint)) } : undefined;
							return `
							<div style="padding:5px">
								<strong>${name}</strong>:
								${lies.length ? lies.map(lie => `<br>${Object.keys(lie)[0]}`).join(''): ''}
								${
									lieFingerprint ? `
										<br>Tampering code leaked a fingerprint: ${lieFingerprint.hash}
										<br>Unexpected code: ${lieFingerprint.json}`: 
									''
								}
							</div>
							`
						}).join('')) : ''
					}</div>
				</div>`
			})()}
			${(() => {
				const { capturedErrors: { data } } = fp;
				const len = data.length;
				return `
				<div class="col-four${len ? ' errors': ''}">
					<strong>Errors</strong>${len ? `<span class="hash">${hashMini(data)}</span>` : ''}
					<div>captured (${!len ? '0' : ''+len}): ${
						len ? modal('creep-captured-errors', Object.keys(data).map((key, i) => `${i+1}: ${data[key].trustedName} - ${data[key].trustedMessage} `).join('<br>')) : ''
					}</div>
				</div>
				`
			})()}
		</div>
		<div class="flex-grid">
			${!fp.webRTC ?
				`<div class="col-six">
					<strong>WebRTC</strong>
					<div>ip address: ${note.blocked}</div>
					<div>candidate: ${note.blocked}</div>
					<div>connection: ${note.blocked}</div>
					<div>type: ${note.blocked}</div>
					<div>foundation: ${note.blocked}</div>
					<div>protocol: ${note.blocked}</div>
				</div>` :
			(() => {
				const { webRTC } = fp;
				const { candidate, connection, type, foundation, protocol, $hash } = webRTC;
				const ip = webRTC['ip address'];
				const leak = webRTC['webRTC leak'];
				return `
				<div class="col-six">
					<strong>WebRTC</strong><span class="hash">${hashMini($hash)}</span>
					<div>ip address: ${ip ? ip : note.unsupported}</div>
					<div>candidate: ${candidate ? candidate : note.unsupported}</div>
					<div>connection: ${connection ? connection : note.unsupported}</div>
					<div>type: ${type ? type : note.unsupported}</div>
					<div>foundation: ${foundation ? foundation : note.unsupported}</div>
					<div>protocol: ${protocol ? protocol : note.unsupported}</div>
				</div>
				`
			})()}
			${!fp.timezone ?
				`<div class="col-six">
					<strong>Timezone</strong>
					<div>zone: ${note.blocked}</div>
					<div>offset: ${note.blocked}</div>
					<div>offset computed: ${note.blocked}</div>
					<div>location: ${note.blocked}</div>
					<div>measured: ${note.blocked}</div>
					<div>epoch: ${note.blocked}</div>
				</div>` :
			(() => {
				const {
					timezone: {
						$hash,
						zone,
						location,
						locationMeasured,
						locationEpoch,
						offset,
						offsetComputed,
						lied
					}
				} = fp;
				return `
				<div class="col-six">
					<strong>Timezone</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
					<div>zone: ${zone}</div>
					<div>offset: ${''+offset}</div>
					<div>offset computed: ${''+offsetComputed}</div>
					<div>location: ${location}</div>
					<div>measured: ${locationMeasured}</div>
					<div>epoch: ${locationEpoch}</div>
				</div>
				`
			})()}			
		</div>
		<div id="browser-detection" class="flex-grid">
			<div class="col-eight">
				<strong>Loading...</strong>
				<div>client user agent:</div>
				<div>window object:</div>
				<div>system styles:</div>
				<div>computed styles:</div>
				<div>html element:</div>
				<div>js runtime (math):</div>
				<div>js engine (error):</div>
			</div>
			<div class="col-four icon-container">
			</div>
		</div>
		<div class="flex-grid relative">
		<div class="ellipsis"><span class="aside-note">${
			fp.workerScope && fp.workerScope.type ? fp.workerScope.type : ''
		} worker</span></div>
		${!fp.workerScope ?
			`<div class="col-six">
				<strong>Worker</strong>
				<div>timezone offset: ${note.blocked}</div>
				<div>location: ${note.blocked}</div>
				<div>language: ${note.blocked}</div>
				<div>deviceMemory: ${note.blocked}</div>
				<div>hardwareConcurrency: ${note.blocked}</div>
				<div>js runtime: ${note.blocked}</div>
				<div>platform: ${note.blocked}</div>
				<div>system: ${note.blocked}</div>
				<div>canvas 2d: ${note.blocked}</div>
				<div>webgl vendor: ${note.blocked}</div>
			</div>
			<div class="col-six">
				<div>device:</div>
				<div class="block-text">${note.blocked}</div>
				<div>userAgent:</div>
				<div class="block-text">${note.blocked}</div>
				<div>webgl renderer:</div>
				<div class="block-text">${note.blocked}</div>
			</div>` :
		(() => {
			const { workerScope: data } = fp;
			return `
			<div class="col-six">
				<strong>Worker</strong><span class="hash">${hashMini(data.$hash)}</span>
				<div>timezone offset: ${data.timezoneOffset != undefined ? ''+data.timezoneOffset : note.unsupported}</div>
				<div>location: ${data.timezoneLocation}</div>
				<div>language: ${data.language || note.unsupported}</div>
				<div>deviceMemory: ${data.deviceMemory || note.unsupported}</div>
				<div>hardwareConcurrency: ${data.hardwareConcurrency || note.unsupported}</div>
				<div>js runtime: ${data.jsImplementation}</div>
				<div>platform: ${data.platform || note.unsupported}</div>
				<div>system: ${data.system || note.unsupported}${
					/android/i.test(data.system) && !/arm/i.test(data.platform) && /linux/i.test(data.platform) ?
					' [emulator]' : ''
				}</div>
				<div>canvas 2d:${
					data.canvas2d && data.canvas2d.dataURI ?
					`<span class="sub-hash">${hashMini(data.canvas2d.dataURI)}</span>` :
					` ${note.unsupported}`
				}</div>
				<div>webgl vendor: ${data.webglVendor || note.unsupported}</div>
			</div>
			<div class="col-six">
				<div>device:</div>
				<div class="block-text">
					<div>${data.device || note.unsupported}</div>
				</div>
				<div>userAgent:</div>
				<div class="block-text">
					<div>${data.userAgent || note.unsupported}</div>
				</div>
				<div>webgl renderer:</div>
				<div class="block-text">
					<div>${data.webglRenderer || note.unsupported}</div>
				</div>
			</div>
			`
		})()}
		</div>
		<div class="flex-grid">
		${!fp.canvasWebgl ?
			`<div class="col-six">
				<strong>Canvas webgl</strong>
				<div>matching renderer/vendor: ${note.blocked}</div>
				<div>matching data URI: ${note.blocked}</div>
				<div>webgl: ${note.blocked}</div>
				<div>parameters (0): ${note.blocked}</div>
				<div>extensions (0): ${note.blocked}</div>
				<div>vendor: ${note.blocked}</div>
				<div>renderer: ${note.blocked}</div>
				<div class="block-text">${note.blocked}</div>
			</div>
			<div class="col-six">
				<div>webgl2: ${note.blocked}</div>
				<div>parameters (0): ${note.blocked}</div>
				<div>extensions (0): ${note.blocked}</div>
				<div>vendor: ${note.blocked}</div>
				<div>renderer: ${note.blocked}</div>
				<div class="block-text">${note.blocked}</div>
			</div>` :
		(() => {
			const { canvasWebgl: data } = fp;
			const id = 'creep-canvas-webgl';
			const {
				$hash,
				dataURI,
				dataURI2,
				lied,
				matchingDataURI,
				matchingUnmasked,
				specs: { webglSpecs, webgl2Specs },
				supported,
				supported2,
				unmasked,
				unmasked2
			} = data;
			const webglSpecsKeys = webglSpecs ? Object.keys(webglSpecs) : [];
			const webgl2SpecsKeys = webgl2Specs ? Object.keys(webgl2Specs) : [];
			return `
			<div class="col-six">
				<strong>Canvas webgl</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>matching renderer/vendor: ${''+matchingUnmasked}</div>
				<div>matching data URI: ${''+matchingDataURI}</div>
				<div>webgl:<span class="sub-hash">${hashMini(dataURI)}</span></div>
				<div>parameters (${count(webglSpecsKeys)}): ${
					!webglSpecsKeys.length ? note.unsupported :
					modal(`${id}-p-v1`, webglSpecsKeys.map(key => `${key}: ${webglSpecs[key]}`).join('<br>'))
				}</div>
				<div>extensions (${count(supported.extensions)}): ${
					!caniuse(() => supported, ['extensions', 'length']) ? note.unsupported : modal(`${id}-e-v1`, supported.extensions.join('<br>'))
				}</div>
				<div>vendor: ${!unmasked.vendor ? note.unsupported : unmasked.vendor}</div>
				<div>renderer:</div>
				<div class="block-text">
					<div>${!unmasked.renderer ? note.unsupported : unmasked.renderer}</div>	
				</div>
			</div>
			<div class="col-six">
				<div>webgl2:<span class="sub-hash">${hashMini(dataURI2)}</span></div>
				<div>parameters (${count(webgl2SpecsKeys)}): ${
					!webgl2SpecsKeys.length ? note.unsupported :
					modal(`${id}-p-v2`, webgl2SpecsKeys.map(key => `${key}: ${webgl2Specs[key]}`).join('<br>'))
				}</div>
				<div>extensions (${count(supported2.extensions)}): ${
					!caniuse(() => supported2, ['extensions', 'length']) ? note.unsupported : modal(`${id}-e-v2`, supported2.extensions.join('<br>'))
				}</div>
				<div>vendor: ${!unmasked2.vendor ? note.unsupported : unmasked2.vendor }</div>
				<div>renderer:</div>
				<div class="block-text">
					<div>${!unmasked2.renderer ? note.unsupported : unmasked2.renderer}</div>	
				</div>
			</div>
			`
		})()}
		</div>
		<div class="flex-grid">
		${!fp.canvas2d ?
			`<div class="col-six">
				<strong>Canvas 2d</strong> <span>${note.blocked}</span>
			</div>` :
		(() => {
			const { canvas2d: { lied, $hash } } = fp;
			return `
			<div class="col-six">
				<strong>Canvas 2d</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
			</div>
			`
		})()}
			<div class="col-six">
			</div>
		</div>
		<div class="flex-grid">
		${!fp.offlineAudioContext ?
			`<div class="col-four">
				<strong>Audio</strong>
				<div>sample: ${note.blocked}</div>
				<div>copy: ${note.blocked}</div>
				<div>matching: ${note.blocked}</div>
				<div>values: ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				offlineAudioContext: {
					$hash,
					binsSample,
					copySample,
					lied,
					matching,
					values
				}
			} = fp;
			return `
			<div class="col-four">
				<strong>Audio</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>sample:${''+binsSample[0] == 'undefined' ? ` ${note.unsupported}` : `<span class="sub-hash">${hashMini(binsSample[0])}</span>`}</div>
				<div>copy:${''+copySample[0] == 'undefined' ? ` ${note.unsupported}`  : `<span class="sub-hash">${hashMini(copySample[0])}</span>`}</div>
				<div>values: ${
					modal('creep-offline-audio-context', Object.keys(values).map(key => `<div>${key}: ${values[key]}</div>`).join(''))
				}</div>
			</div>
			`
		})()}
		${!fp.voices ?
			`<div class="col-four">
				<strong>Speech</strong>
				<div>microsoft: ${note.blocked}</div>
				<div>google: ${note.blocked}</div>
				<div>chrome OS: ${note.blocked}</div>
				<div>android: ${note.blocked}</div>
				<div>voices (0): ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				voices: {
					$hash,
					android,
					chromeOS,
					google,
					microsoft,
					voices
				}
			} = fp;
			const voiceList = voices.map(voice => `${voice.name} (${voice.lang})`);
			return `
			<div class="col-four">
				<strong>Speech</strong><span class="hash">${hashMini($hash)}</span>
				<div>microsoft: ${''+microsoft}</div>
				<div>google: ${''+google}</div>
				<div>chrome OS: ${''+chromeOS}</div>
				<div>android: ${''+android}</div>
				<div>voices (${count(voices)}): ${voiceList && voiceList.length ? modal('creep-voices', voiceList.join('<br>')) : note.unsupported}</div>
			</div>
			`
		})()}
		${!fp.media ?
			`<div class="col-four">
				<strong>Media</strong>
				<div>devices (0): ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				media: {
					mediaDevices,
					$hash
				}
			} = fp;

			return `
			<div class="col-four">
				<strong>Media</strong><span class="hash">${hashMini($hash)}</span>
				<div>devices (${count(mediaDevices)}):${mediaDevices && mediaDevices.length ? modal('creep-media-devices', mediaDevices.map(device => device.kind).join('<br>')) : note.blocked}</div>
			</div>
			`
		})()}
		</div>
		
		<div class="flex-grid">
		${!fp.clientRects ?
			`<div class="col-six">
				<strong>DOMRect</strong>
				<div>elements: ${note.blocked}</div>
				<div>results: ${note.blocked}</div>
				<div>emojis v13.0: ${note.blocked}</div>
				<div>results: ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				clientRects: {
					$hash,
					clientRects,
					emojiRects,
					lied
				}
			} = fp;
			const id = 'creep-client-rects';
			return `
			<div class="col-six">
				<strong>DOMRect</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>elements:<span class="sub-hash">${hashMini(clientRects)}</span></div>
				<div>results: ${
					modal(`${id}-elements`, clientRects.map(domRect => Object.keys(domRect).map(key => `<div>${key}: ${domRect[key]}</div>`).join('')).join('<br>') )
				}</div>
				<div>emojis v13.0:<span class="sub-hash">${hashMini(emojiRects)}</span></div>
				<div>results: ${
					modal(`${id}-emojis`, `<span style="font-size: 32px;">${emojiRects.map(rect => rect.emoji).join('')}</span>` )
				}</div>
			</div>
			`
		})()}
		${!fp.fonts ?
			`<div class="col-six">
				<strong>Fonts</strong>
				<div>results (0): ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				fonts: {
					$hash,
					fonts,
					lied
				}
			} = fp;
			return `
			<div class="col-six">
				<strong>Fonts</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>results (${fonts ? count(fonts) : '0'}): ${fonts.length ? modal('creep-fonts', fonts.map(font => `<span style="font-family:'${font}'">${font}</span>`).join('<br>')) : note.blocked}</div>
			</div>
			`
		})()}
		</div>
		<div class="flex-grid">
		${!fp.screen ?
			`<div class="col-six">
				<strong>Screen</strong>
				<div>device: ${note.blocked}</div>
				<div>width: ${note.blocked}</div>
				<div>outerWidth: ${note.blocked}</div>
				<div>availWidth: ${note.blocked}</div>
				<div>height: ${note.blocked}</div>
				<div>outerHeight: ${note.blocked}</div>
				<div>availHeight: ${note.blocked}</div>
				<div>colorDepth: ${note.blocked}</div>
				<div>pixelDepth: ${note.blocked}</div>
			</div>
			<div class="col-six screen-container">
			</div>` :
		(() => {
			const {
				screen: data
			} = fp;
			const {
				device,
				width,
				outerWidth,
				availWidth,
				height,
				outerHeight,
				availHeight,
				colorDepth,
				pixelDepth,
				$hash,
				lied
			} = data;
			const getDeviceDimensions = (width, height, diameter = 180) => {
				const aspectRatio = width / height;
				const isPortrait = height > width;
				const deviceHeight = isPortrait ? diameter : diameter / aspectRatio;
				const deviceWidth = isPortrait ? diameter * aspectRatio : diameter;
				return { deviceHeight, deviceWidth }
			};
			const { deviceHeight, deviceWidth } = getDeviceDimensions(width, height);
			return `
			<div class="col-six">
				<strong>Screen</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>device: ${device ? device : note.blocked}</div>
				<div>width: ${width ? width : note.blocked}</div>
				<div>outerWidth: ${outerWidth ? outerWidth : note.blocked}</div>
				<div>availWidth: ${availWidth ? availWidth : note.blocked}</div>
				<div>height: ${height ? height : note.blocked}</div>
				<div>outerHeight: ${outerHeight ? outerHeight : note.blocked}</div>
				<div>availHeight: ${availHeight ? availHeight : note.blocked}</div>
				<div>colorDepth: ${colorDepth ? colorDepth : note.blocked}</div>
				<div>pixelDepth: ${pixelDepth ? pixelDepth : note.blocked}</div>
			</div>
			<div class="col-six screen-container">
				<div class="screen-frame" style="width:${deviceWidth}px;height:${deviceHeight}px;">
					<div class="screen-glass"></div>
				</div>
			</div>
			`
		})()}
		</div>
		<div class="flex-grid">
			
		${!fp.css ?
			`<div class="col-six">
				<strong>@media</strong>
				<div>screen query: ${note.blocked}</div>
				<div>device aspect ratio: ${note.blocked}</div>
				<div>device screen: ${note.blocked}</div>
				<div>display mode: ${note.unsupported}</div>
				<div>orientation: ${note.unsupported}</div>
				<div>motion: ${note.unsupported}</div>
				<div>hover: ${note.unsupported}</div>
				<div>any hover: ${note.unsupported}</div>
				<div>pointer: ${note.unsupported}</div>
				<div>any pointer: ${note.unsupported}</div>
				<div>monochrome: ${note.unsupported}</div>
				<div>color scheme: ${note.unsupported}</div>
				<div>color gamut: ${note.unsupported}</div>
				<div>forced colors: ${note.unsupported}</div>
				<div>inverted colors: ${note.unsupported}</div>
			</div>
			<div class="col-six">
				<strong>MediaQueryList</strong>
				<div>screen query: ${note.blocked}</div>
				<div>device aspect ratio: ${note.blocked}</div>
				<div>device screen: ${note.blocked}</div>
				<div>display mode: ${note.unsupported}</div>
				<div>orientation: ${note.unsupported}</div>
				<div>motion: ${note.unsupported}</div>
				<div>hover: ${note.unsupported}</div>
				<div>any hover: ${note.unsupported}</div>
				<div>pointer: ${note.unsupported}</div>
				<div>any pointer: ${note.unsupported}</div>
				<div>monochrome: ${note.unsupported}</div>
				<div>color scheme: ${note.unsupported}</div>
				<div>color gamut: ${note.unsupported}</div>
				<div>forced colors: ${note.unsupported}</div>
				<div>inverted colors: ${note.unsupported}</div>
			</div>` :
		(() => {
			const {
				cssMedia: data
			} = fp;
			const {
				$hash,
				mediaCSS,
				matchMediaCSS
			} = data;
			return `
			<div class="col-six">
				<strong>@media</strong><span class="hash">${hashMini(mediaCSS)}</span>
				<div>screen query: ${''+mediaCSS.screenQuery.width} x ${''+mediaCSS.screenQuery.height}</div>
				<div>screen match: ${mediaCSS.deviceScreen || note.blocked}</div>
				<div>device aspect ratio: ${mediaCSS.deviceAspectRatio || note.blocked}</div>
				<div>display mode: ${mediaCSS.displayMode || note.unsupported}</div>
				<div>orientation: ${mediaCSS.orientation  || note.unsupported}</div>
				<div>motion: ${mediaCSS.reducedMotion || note.unsupported}</div>
				<div>hover: ${mediaCSS.hover || note.unsupported}</div>
				<div>any hover: ${mediaCSS.anyHover || note.unsupported}</div>
				<div>pointer: ${mediaCSS.pointer || note.unsupported}</div>
				<div>any pointer: ${mediaCSS.anyPointer || note.unsupported}</div>
				<div>monochrome: ${mediaCSS.monochrome || note.unsupported}</div>
				<div>color scheme: ${mediaCSS.colorScheme || note.unsupported}</div>
				<div>color gamut: ${mediaCSS.colorGamut || note.unsupported}</div>
				<div>forced colors: ${mediaCSS.forcedColors || note.unsupported}</div>
				<div>inverted colors: ${mediaCSS.invertedColors || note.unsupported}</div>
			</div>
			<div class="col-six">
				<strong>MediaQueryList</strong><span class="hash">${hashMini(matchMediaCSS)}</span>
				<div>screen query: ${''+matchMediaCSS.screenQuery.width} x ${''+matchMediaCSS.screenQuery.height}</div>
				<div>screen match: ${matchMediaCSS.deviceScreen || note.blocked}</div>
				<div>device aspect ratio: ${matchMediaCSS.deviceAspectRatio || note.blocked}</div>
				<div>display mode: ${matchMediaCSS.displayMode || note.unsupported}</div>
				<div>orientation: ${matchMediaCSS.orientation || note.unsupported}</div>
				<div>motion: ${matchMediaCSS.reducedMotion || note.unsupported}</div>
				<div>hover: ${matchMediaCSS.hover || note.unsupported}</div>
				<div>any hover: ${matchMediaCSS.anyHover || note.unsupported}</div>
				<div>pointer: ${matchMediaCSS.pointer || note.unsupported}</div>
				<div>any pointer: ${matchMediaCSS.anyPointer || note.unsupported}</div>
				<div>monochrome: ${matchMediaCSS.monochrome || note.unsupported}</div>
				<div>color scheme: ${matchMediaCSS.colorScheme || note.unsupported}</div>
				<div>color gamut: ${matchMediaCSS.colorGamut || note.unsupported}</div>
				<div>forced colors: ${matchMediaCSS.forcedColors || note.unsupported}</div>
				<div>inverted colors: ${matchMediaCSS.invertedColors || note.unsupported}</div>
			</div>
			`
		})()}
		</div>
		<div class="flex-grid">
		${!fp.css ?
			`<div class="col-six">
				<strong>Computed Style</strong>
				<div>getComputedStyle: ${note.blocked}</div>
				<div>keys: ${note.blocked}</div>
				<div>moz: ${note.blocked}</div>
				<div>webkit: ${note.blocked}</div>
				<div>apple: ${note.blocked}</div>
			</div>
			<div class="col-six">
				<div>engine: ${note.blocked}</div>
				<div>prototype: ${note.blocked}</div>
				<div>system styles: ${note.blocked}</div>
				<div>system styles rendered: ${note.blocked}</div>
			</div>` :
		(() => {
			const {
				css: data
			} = fp;
			const {
				$hash,
				getComputedStyle: computedStyle,
				system
			} = data;
			const id = 'creep-css-style-declaration-version';
			const { prototypeName } = computedStyle;
			return `
			<div class="col-six">
				<strong>Computed Style</strong><span class="hash">${hashMini($hash)}</span>
				<div>getComputedStyle:<span class="sub-hash">${hashMini(computedStyle.keys)}</span></div>
				<div>keys: ${computedStyle.keys.length}</div>
				<div>moz: ${''+computedStyle.moz}</div>
				<div>webkit: ${''+computedStyle.webkit}</div>
				<div>apple: ${''+computedStyle.apple}</div>
			</div>
			<div class="col-six">
				<div>engine: ${
					prototypeName == 'CSS2Properties' ? 'Gecko' :
					prototypeName == 'CSS2PropertiesPrototype' ? 'Gecko (like Goanna)' :
					prototypeName == 'MSCSSPropertiesPrototype' ? 'Trident' :
					prototypeName == 'CSSStyleDeclaration' ? 'Blink' :
					prototypeName == 'CSSStyleDeclarationPrototype' ? 'Webkit' :
					'unknown'
				}</div>
				<div>prototype: ${prototypeName}</div>
				<div>system styles:<span class="sub-hash">${hashMini(system)}</span></div>
				<div>system styles rendered: ${
					system && system.colors ? modal(
						`${id}-system-styles`,
						[
							...system.colors.map(color => {
								const key = Object.keys(color)[0];
								const val = color[key];
								return `
									<div><span style="display:inline-block;border:1px solid #eee;border-radius:3px;width:12px;height:12px;background:${val}"></span> ${key}: ${val}</div>
								`
							}),
							...system.fonts.map(font => {
								const key = Object.keys(font)[0];
								const val = font[key];
								return `
									<div>${key}: <span style="border:1px solid #eee;background:#f9f9f9;padding:0 5px;border-radius:3px;font:${val}">${val}</span></div>
								`
							}),
						].join('')
					) : note.blocked
				}</div>
			</div>
			`
		})()}
		</div>
		<div>
			<div class="flex-grid">
			${!fp.maths ?
				`<div class="col-six">
					<strong>Math</strong>
					<div>results: ${note.blocked}</div>
				</div>` :
			(() => {
				const {
					maths: {
						data,
						$hash,
						lied
					}
				} = fp;
				const id = 'creep-maths';
				const header = `<div>Match to Win10 64bit Chromium > Firefox > Tor Browser > Mac10 Safari<br>[CR][FF][TB][SF]</div>`;
				const results = Object.keys(data).map(key => {
					const value = data[key];
					const { result, chrome, firefox, torBrowser, safari } = value;
					return `${chrome ? '[CR]' : '[--]'}${firefox ? '[FF]' : '[--]'}${torBrowser ? '[TB]' : '[--]'}${safari ? '[SF]' : '[--]'} ${key} => ${result}`
				});
				return `
				<div class="col-six">
					<strong>Math</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
					<div>results: ${modal(id, header+results.join('<br>'))}</div>
				</div>
				`
			})()}
			${!fp.consoleErrors ?
				`<div class="col-six">
					<strong>Error</strong>
					<div>results: ${note.blocked}</div>
				</div>` :
			(() => {
				const {
					consoleErrors: {
						$hash,
						errors
					}
				} = fp;
				const results = Object.keys(errors).map(key => {
					const value = errors[key];
					return `${+key+1}: ${value}`
				});
				return `
				<div class="col-six">
					<strong>Error</strong><span class="hash">${hashMini($hash)}</span>
					<div>results: ${modal('creep-console-errors', results.join('<br>'))}</div>
				</div>
				`
			})()}
			</div>
			<div class="flex-grid">
			${!fp.windowFeatures?
				`<div class="col-six">
					<strong>Window</strong>
					<div>keys (0): ${note.blocked}</div>
					<div>moz: ${note.blocked}</div>
					<div>webkit: ${note.blocked}</div>
					<div>apple: ${note.blocked}</div>
				</div>` :
			(() => {
				const {
					windowFeatures: {
						$hash,
						apple,
						keys,
						moz,
						webkit
					}
				} = fp;
				return `
				<div class="col-six">
					<strong>Window</strong><span class="hash">${hashMini($hash)}</span>
					<div>keys (${count(keys)}): ${keys && keys.length ? modal('creep-iframe-content-window-version', keys.join(', ')) : note.blocked}</div>
					<div>moz: ${''+moz}</div>
					<div>webkit: ${''+webkit}</div>
					<div>apple: ${''+apple}</div>
				</div>
				`
			})()}
			${!fp.htmlElementVersion ?
				`<div class="col-six">
					<strong>HTMLElement</strong>
					<div>keys (0): ${note.blocked}</div>
				</div>` :
			(() => {
				const {
					htmlElementVersion: {
						$hash,
						keys
					}
				} = fp;
				return `
				<div class="col-six">
					<strong>HTMLElement</strong><span class="hash">${hashMini($hash)}</span>
					<div>keys (${count(keys)}): ${keys && keys.length ? modal('creep-html-element-version', keys.join(', ')) : note.blocked}</div>
				</div>
				`
			})()}
			</div>
		</div>
		<div class="flex-grid">
		${!fp.navigator ?
			`<div class="col-six">
				<strong>Navigator</strong>
				<div>deviceMemory: ${note.blocked}</div>
				<div>doNotTrack: ${note.blocked}</div>
				<div>globalPrivacyControl:${note.blocked}</div>
				<div>hardwareConcurrency: ${note.blocked}</div>
				<div>language: ${note.blocked}</div>
				<div>maxTouchPoints: ${note.blocked}</div>
				<div>vendor: ${note.blocked}</div>
				<div>plugins (0): ${note.blocked}</div>
				<div>mimeTypes (0): ${note.blocked}</div>
				<div>platform: ${note.blocked}</div>
				<div>system: ${note.blocked}</div>
				<div>ua architecture: ${note.blocked}</div>
				<div>ua model: ${note.blocked}</div>
				<div>ua platform: ${note.blocked}</div>
				<div>ua platformVersion: ${note.blocked}</div>
				<div>ua uaFullVersion: ${note.blocked}</div>
				<div>properties (0): ${note.blocked}</div>
			</div>
			<div class="col-six">
				<div>device:</div>
				<div class="block-text">${note.blocked}</div>
				<div>userAgent:</div>
				<div class="block-text">${note.blocked}</div>
				<div>appVersion:</div>
				<div class="block-text">${note.blocked}</div>
			</div>` :
		(() => {
			const {
				navigator: {
					$hash,
					appVersion,
					deviceMemory,
					doNotTrack,
					globalPrivacyControl,
					hardwareConcurrency,
					highEntropyValues,
					language,
					maxTouchPoints,
					mimeTypes,
					platform,
					plugins,
					properties,
					system,
					device,
					userAgent,
					vendor,
					lied
				}
			} = fp;
			const id = 'creep-navigator';
			const blocked = {
				[null]: !0,
				[undefined]: !0,
				['']: !0
			};
			return `
			<div class="col-six">
				<strong>Navigator</strong><span class="${lied ? 'lies ' : ''}hash">${hashMini($hash)}</span>
				<div>deviceMemory: ${!blocked[deviceMemory] ? deviceMemory : note.blocked}</div>
				<div>doNotTrack: ${''+doNotTrack}</div>
				<div>globalPrivacyControl: ${
					''+globalPrivacyControl == 'undefined' ? note.unsupported : ''+globalPrivacyControl
				}</div>
				<div>hardwareConcurrency: ${!blocked[hardwareConcurrency] ? hardwareConcurrency : note.blocked}</div>
				<div>language: ${!blocked[language] ? language : note.blocked}</div>
				<div>maxTouchPoints: ${!blocked[maxTouchPoints] ? ''+maxTouchPoints : note.blocked}</div>
				<div>vendor: ${!blocked[vendor] ? vendor : note.blocked}</div>
				<div>plugins (${count(plugins)}): ${
					!blocked[''+plugins] ?
					modal(`${id}-plugins`, plugins.map(plugin => plugin.name).join('<br>')) :
					note.blocked
				}</div>
				<div>mimeTypes (${count(mimeTypes)}): ${
					!blocked[''+mimeTypes] ? 
					modal(`${id}-mimeTypes`, mimeTypes.join('<br>')) :
					note.blocked
				}</div>
				<div>platform: ${!blocked[platform] ? platform : note.blocked}</div>
				<div>system: ${system}${
					/android/i.test(system) && !/arm/i.test(platform) && /linux/i.test(platform) ?
					' [emulator]' : ''
				}</div>
				${highEntropyValues ?  
					Object.keys(highEntropyValues).map(key => {
						const value = highEntropyValues[key];
						return `<div>ua ${key}: ${value ? value : note.unsupported}</div>`
					}).join('') :
					`<div>ua architecture: ${note.unsupported}</div>
					<div>ua model: ${note.unsupported}</div>
					<div>ua platform: ${note.unsupported}</div>
					<div>ua platformVersion: ${note.unsupported}</div>
					<div>ua uaFullVersion: ${note.unsupported} </div>`
				}
				<div>properties (${count(properties)}): ${modal(`${id}-properties`, properties.join(', '))}</div>
			</div>
			<div class="col-six">
				<div>device:</div>
				<div class="block-text">
					<div>${!blocked[device] ? device : note.blocked}</div>
				</div>
				<div>userAgent:</div>
				<div class="block-text">
					<div>${!blocked[userAgent] ? userAgent : note.blocked}</div>
				</div>
				<div>appVersion:</div>
				<div class="block-text">
					<div>${!blocked[appVersion] ? appVersion : note.blocked}</div>
				</div>
			</div>
			`
		})()}
		</div>
		<div>
			<strong>Tests</strong>
			<div>
				<a class="tests" href="./tests/workers.html">Workers</a>
				<br><a class="tests" href="./tests/iframes.html">Iframes</a>
				<br><a class="tests" href="./tests/fonts.html">Fonts</a>
				<br><a class="tests" href="./tests/timezone.html">Timezone</a>
				<br><a class="tests" href="./tests/window.html">Window Version</a>
				<br><a class="tests" href="./tests/screen.html">Screen</a>
			</div>
		</div>
	</div>
	`, () => {
			// fetch data from server
			const id = 'creep-browser';
			const visitorElem = document.getElementById(id);
			const fetchVisitorDataTimer = timer();
			const request = `${webapp}?id=${creepHash}&subId=${fpHash}&hasTrash=${hasTrash}&hasLied=${hasLied}&hasErrors=${hasErrors}`;
			
			fetch(request)
			.then(response => response.json())
			.then(async data => {

				console.groupCollapsed('Server Response');
				console.log(JSON.stringify(data, null, '\t'));
				fetchVisitorDataTimer('response time');
				console.groupEnd();
			
				const { firstVisit, lastVisit: latestVisit, looseFingerprints: subIds, visits,looseSwitchCount: switchCount,  hasTrash, hasLied, hasErrors, signature } = data;
				
				const toLocaleStr = str => {
					const date = new Date(str);
					const dateString = date.toLocaleDateString();
					const timeString = date.toLocaleTimeString();
					return `${dateString}, ${timeString}`
				};
				const hoursAgo = (date1, date2) => Math.abs(date1 - date2) / 36e5;
				const hours = hoursAgo(new Date(firstVisit), new Date(latestVisit)).toFixed(1);

				// trust score
				const score = (100-(
					(switchCount < 1 ? 0 : switchCount < 11 ? switchCount * 0.1 : switchCount * 0.2 ) +
					(errorsLen * 5.2) +
					(trashLen * 15.5) +
					(liesLen * 31)
				)).toFixed(0);
				const template = `
				<div class="visitor-info">
					<div class="ellipsis"><span class="aside-note">script modified 2020-12-5</span></div>
					<div class="flex-grid">
						<div class="col-six">
							<strong>Browser</strong>
							<div>trust score: <span class="unblurred">${
								score > 95 ? `${score}% <span class="grade-A">A+</span>` :
								score == 95 ? `${score}% <span class="grade-A">A</span>` :
								score >= 90 ? `${score}% <span class="grade-A">A-</span>` :
								score > 85 ? `${score}% <span class="grade-B">B+</span>` :
								score == 85 ? `${score}% <span class="grade-B">B</span>` :
								score >= 80 ? `${score}% <span class="grade-B">B-</span>` :
								score > 75 ? `${score}% <span class="grade-C">C+</span>` :
								score == 75 ? `${score}% <span class="grade-C">C</span>` :
								score >= 70 ? `${score}% <span class="grade-C">C-</span>` :
								score > 65 ? `${score}% <span class="grade-D">D+</span>` :
								score == 65 ? `${score}% <span class="grade-D">D</span>` :
								score >= 60 ? `${score}% <span class="grade-D">D-</span>` :
								score > 55 ? `${score}% <span class="grade-F">F+</span>` :
								score == 55 ? `${score}% <span class="grade-F">F</span>` :
								`${score < 0 ? 0 : score}% <span class="grade-F">F-</span>`
							}</span></div>
							<div>visits: <span class="unblurred">${visits}</span></div>
							<div class="ellipsis">first: <span class="unblurred">${toLocaleStr(firstVisit)}</span></div>
							<div class="ellipsis">last: <span class="unblurred">${toLocaleStr(latestVisit)}</span></div>
							<div>persistence: <span class="unblurred">${hours} hours</span></div>
						</div>
						<div class="col-six">
							<div>has trash: <span class="unblurred">${
								(''+hasTrash) == 'true' ?
								`true (${hashMini(fp.trash.$hash)})` : 
								'false'
							}</span></div>
							<div>has lied: <span class="unblurred">${
								(''+hasLied) == 'true' ? 
								`true (${hashMini(fp.lies.$hash)})` : 
								'false'
							}</span></div>
							<div>has errors: <span class="unblurred">${
								(''+hasErrors) == 'true' ? 
								`true (${hashMini(fp.capturedErrors.$hash)})` : 
								'false'
							}</span></div>
							<div class="ellipsis">loose fingerprint: <span class="unblurred">${hashMini(fpHash)}</span></div>
							<div class="ellipsis">loose switched: <span class="unblurred">${switchCount}x</span></div>
							<div class="ellipsis">bot: <span class="unblurred">${switchCount > 9 && hours < 48 ? 'true (10 loose in 48 hours)' : 'false'}</span></div>
						</div>
					</div>
					${
						signature ? 
						`
						<div class="fade-right-in" id="signature">
							<div class="ellipsis"><strong>signed</strong>: <span>${signature}</span></div>
						</div>
						` :
						`<form class="fade-right-in" id="signature">
							<input id="signature-input" type="text" placeholder="add a signature to your fingerprint" title="sign your fingerprint" required minlength="4" maxlength="64">
							<input type="submit" value="Sign">
						</form>
						`
					}
				</div>
			`;
				patch(visitorElem, html`${template}`, () => {
					if (signature) {
						return
					}
					const form = document.getElementById('signature');
					form.addEventListener('submit', async () => {
						event.preventDefault();

						
						const input = document.getElementById('signature-input').value;
						const submit = confirm(`Are you sure? This cannot be undone.\n\nsignature: ${input}`);

						if (!submit) {
							return
						}

						const signatureRequest = `https://creepjs-6bd8e.web.app/sign?id=${creepHash}&signature=${input}`;

						// animate out
						form.classList.remove('fade-right-in');
						form.classList.add('fade-down-out');

						// fetch/animate in
						return fetch(signatureRequest)
						.then(response => response.json())
						.then(data => {
							return setTimeout(() => {
								patch(form, html`
								<div class="fade-right-in" id="signature">
									<div class="ellipsis"><strong>signed</strong>: <span>${input}</span></div>
								</div>
							`);
								return console.log('Signed: ', JSON.stringify(data, null, '\t'))
							}, 300)
						})
						.catch(error => {
							patch(form, html`
							<div class="fade-right-in" id="signature">
								<div class="ellipsis"><strong style="color:crimson">${error}</strong></div>
							</div>
						`);
							return console.error('Error!', error.message)
						})
					});
				});
				
				const {
					maths,
					consoleErrors,
					htmlElementVersion,
					windowFeatures,
					css
				} = fp || {};
				const {
					getComputedStyle,
					system
				} = css || {};

				const [
					styleHash,
					systemHash
				] = await Promise.all([
					hashify(getComputedStyle),
					hashify(system)
				]);
					
				const decryptRequest = `https://creepjs-6bd8e.web.app/decrypt?${[
				`isBrave=${isBrave}`,
				`mathId=${maths.$hash}`,
				`errorId=${consoleErrors.$hash}`,
				`htmlId=${htmlElementVersion.$hash}`,
				`winId=${windowFeatures.$hash}`,
				`styleId=${styleHash}`,
				`styleSystemId=${systemHash}`,
				`ua=${encodeURIComponent(caniuse(() => fp.workerScope.userAgent))}`
			].join('&')}`;

				return fetch(decryptRequest)
				.then(response => response.json())
				.then(data => {
					const el = document.getElementById('browser-detection');
					const {
						jsRuntime,
						jsEngine,
						htmlVersion,
						windowVersion,
						styleVersion,
						styleSystem,
					} = data;
					const reportedUserAgent = caniuse(() => navigator.userAgent);
					const reportedSystem = getOS(reportedUserAgent);
					const report = decryptUserAgent({
						ua: reportedUserAgent,
						os: reportedSystem,
						isBrave
					});
					const iconSet = new Set();
					const htmlIcon = cssClass => `<span class="icon ${cssClass}"></span>`;
					const getTemplate = agent => {
						const { decrypted, system } = agent;
						const browserIcon = (
							/edgios|edge/i.test(decrypted) ? iconSet.add('edge') && htmlIcon('edge') :
							/brave/i.test(decrypted) ? iconSet.add('brave') && htmlIcon('brave') :
							/vivaldi/i.test(decrypted) ? iconSet.add('vivaldi') && htmlIcon('vivaldi') :
							/duckduckgo/i.test(decrypted) ? iconSet.add('duckduckgo') && htmlIcon('duckduckgo') :
							/yandex/i.test(decrypted) ? iconSet.add('yandex') && htmlIcon('yandex') :
							/opera/i.test(decrypted) ? iconSet.add('opera') && htmlIcon('opera') :
							/crios|chrome/i.test(decrypted) ? iconSet.add('chrome') && htmlIcon('chrome') :
							/tor browser/i.test(decrypted) ? iconSet.add('tor') && htmlIcon('tor') :
							/palemoon/i.test(decrypted) ? iconSet.add('palemoon') && htmlIcon('palemoon') :
							/fxios|firefox/i.test(decrypted) ? iconSet.add('firefox') && htmlIcon('firefox') :
							/v8/i.test(decrypted) ? iconSet.add('v8') && htmlIcon('v8') :
							/gecko/i.test(decrypted) ? iconSet.add('gecko') && htmlIcon('gecko') :
							/goanna/i.test(decrypted) ? iconSet.add('goanna') && htmlIcon('goanna') :
							/spidermonkey/i.test(decrypted) ? iconSet.add('firefox') && htmlIcon('firefox') :
							/safari/i.test(decrypted) ? iconSet.add('safari') && htmlIcon('safari') :
							/webkit/i.test(decrypted) ? iconSet.add('webkit') && htmlIcon('webkit') :
							/blink/i.test(decrypted) ? iconSet.add('blink') && htmlIcon('blink') : ''
						);
						const systemIcon = (
							/chrome os/i.test(system) ? iconSet.add('cros') && htmlIcon('cros') :
							/linux/i.test(system) ? iconSet.add('linux') && htmlIcon('linux') :
							/android/i.test(system) ? iconSet.add('android') && htmlIcon('android') :
							/ipad|iphone|ipod|ios|mac/i.test(system) ? iconSet.add('apple') && htmlIcon('apple') :
							/windows/i.test(system) ? iconSet.add('windows') && htmlIcon('windows') : ''
						);
						const icons = [
							browserIcon,
							systemIcon
						].join('');
						return (
							system ? `${icons}${decrypted} on ${system}` :
							`${icons}${decrypted}`
						)
					};
					
					const fakeUserAgent = (
						/\d+/.test(windowVersion.decrypted) &&
						windowVersion.decrypted != report
					);

					patch(el, html`
				<div class="flex-grid">
					<div class="col-eight">
						<strong>Version</strong>
						<div>client user agent:
							<span class="${fakeUserAgent ? 'lies' : ''}">${report}${fakeUserAgent ?` (fake)` : ''}</span>
						</div>
						<div class="ellipsis">window object: ${getTemplate(windowVersion)}</div>
						<div class="ellipsis">system styles: ${getTemplate(styleSystem)}</div>
						<div class="ellipsis">computed styles: ${getTemplate(styleVersion)}</div>
						<div class="ellipsis">html element: ${getTemplate(htmlVersion)}</div>
						<div class="ellipsis">js runtime (math): ${getTemplate(jsRuntime)}</div>
						<div class="ellipsis">js engine (error): ${getTemplate(jsEngine)}</div>
					</div>
					<div class="col-four icon-container">
						${[...iconSet].map(icon => {
							return `<div class="icon-item ${icon}"></div>`
						}).join('')}
					</div>
				</div>
				`);
					return console.log(`user agents pending review: ${data.pendingReview}`)
				})
				.catch(error => {
					return console.error('Error!', error.message)
				})
			})
			.catch(error => {
				fetchVisitorDataTimer('Error fetching version data');
				patch(document.getElementById('loader'), html`<strong style="color:crimson">${error}</strong>`);
				return console.error('Error!', error.message)
			});
		});
	})(imports);

}());
