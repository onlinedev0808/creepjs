/*
Steps to update:
0. get beta release desktop/mobile
1. get diffs from template
2. update feature list
3. update stable features object
*/
const getStableFeatures = () => ({
	'Chrome': {
		version: 97,
		windowKeys: `Object, Function, Array, Number, parseFloat, parseInt, Infinity, NaN, undefined, Boolean, String, Symbol, Date, Promise, RegExp, Error, AggregateError, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, globalThis, JSON, Math, console, Intl, ArrayBuffer, Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array, Uint8ClampedArray, BigUint64Array, BigInt64Array, DataView, Map, BigInt, Set, WeakMap, WeakSet, Proxy, Reflect, FinalizationRegistry, WeakRef, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, escape, unescape, eval, isFinite, isNaN, Option, Image, Audio, webkitURL, webkitRTCPeerConnection, webkitMediaStream, WebKitMutationObserver, WebKitCSSMatrix, XPathResult, XPathExpression, XPathEvaluator, XMLSerializer, XMLHttpRequestUpload, XMLHttpRequestEventTarget, XMLHttpRequest, XMLDocument, WritableStreamDefaultWriter, WritableStreamDefaultController, WritableStream, Worker, Window, WheelEvent, WebSocket, WebGLVertexArrayObject, WebGLUniformLocation, WebGLTransformFeedback, WebGLTexture, WebGLSync, WebGLShaderPrecisionFormat, WebGLShader, WebGLSampler, WebGLRenderingContext, WebGLRenderbuffer, WebGLQuery, WebGLProgram, WebGLFramebuffer, WebGLContextEvent, WebGLBuffer, WebGLActiveInfo, WebGL2RenderingContext, WaveShaperNode, VisualViewport, ValidityState, VTTCue, UserActivation, URLSearchParams, URL, UIEvent, TreeWalker, TransitionEvent, TransformStream, TrackEvent, TouchList, TouchEvent, Touch, TimeRanges, TextTrackList, TextTrackCueList, TextTrackCue, TextTrack, TextMetrics, TextEvent, TextEncoderStream, TextEncoder, TextDecoderStream, TextDecoder, Text, TaskAttributionTiming, SyncManager, SubmitEvent, StyleSheetList, StyleSheet, StylePropertyMapReadOnly, StylePropertyMap, StorageEvent, Storage, StereoPannerNode, StaticRange, ShadowRoot, Selection, SecurityPolicyViolationEvent, ScriptProcessorNode, ScreenOrientation, Screen, SVGViewElement, SVGUseElement, SVGUnitTypes, SVGTransformList, SVGTransform, SVGTitleElement, SVGTextPositioningElement, SVGTextPathElement, SVGTextElement, SVGTextContentElement, SVGTSpanElement, SVGSymbolElement, SVGSwitchElement, SVGStyleElement, SVGStringList, SVGStopElement, SVGSetElement, SVGScriptElement, SVGSVGElement, SVGRectElement, SVGRect, SVGRadialGradientElement, SVGPreserveAspectRatio, SVGPolylineElement, SVGPolygonElement, SVGPointList, SVGPoint, SVGPatternElement, SVGPathElement, SVGNumberList, SVGNumber, SVGMetadataElement, SVGMatrix, SVGMaskElement, SVGMarkerElement, SVGMPathElement, SVGLinearGradientElement, SVGLineElement, SVGLengthList, SVGLength, SVGImageElement, SVGGraphicsElement, SVGGradientElement, SVGGeometryElement, SVGGElement, SVGForeignObjectElement, SVGFilterElement, SVGFETurbulenceElement, SVGFETileElement, SVGFESpotLightElement, SVGFESpecularLightingElement, SVGFEPointLightElement, SVGFEOffsetElement, SVGFEMorphologyElement, SVGFEMergeNodeElement, SVGFEMergeElement, SVGFEImageElement, SVGFEGaussianBlurElement, SVGFEFuncRElement, SVGFEFuncGElement, SVGFEFuncBElement, SVGFEFuncAElement, SVGFEFloodElement, SVGFEDropShadowElement, SVGFEDistantLightElement, SVGFEDisplacementMapElement, SVGFEDiffuseLightingElement, SVGFEConvolveMatrixElement, SVGFECompositeElement, SVGFEComponentTransferElement, SVGFEColorMatrixElement, SVGFEBlendElement, SVGEllipseElement, SVGElement, SVGDescElement, SVGDefsElement, SVGComponentTransferFunctionElement, SVGClipPathElement, SVGCircleElement, SVGAnimationElement, SVGAnimatedTransformList, SVGAnimatedString, SVGAnimatedRect, SVGAnimatedPreserveAspectRatio, SVGAnimatedNumberList, SVGAnimatedNumber, SVGAnimatedLengthList, SVGAnimatedLength, SVGAnimatedInteger, SVGAnimatedEnumeration, SVGAnimatedBoolean, SVGAnimatedAngle, SVGAnimateTransformElement, SVGAnimateMotionElement, SVGAnimateElement, SVGAngle, SVGAElement, Response, ResizeObserverSize, ResizeObserverEntry, ResizeObserver, Request, ReportingObserver, ReadableStreamDefaultReader, ReadableStreamDefaultController, ReadableStreamBYOBRequest, ReadableStreamBYOBReader, ReadableStream, ReadableByteStreamController, Range, RadioNodeList, RTCTrackEvent, RTCStatsReport, RTCSessionDescription, RTCSctpTransport, RTCRtpTransceiver, RTCRtpSender, RTCRtpReceiver, RTCPeerConnectionIceEvent, RTCPeerConnectionIceErrorEvent, RTCPeerConnection, RTCIceCandidate, RTCErrorEvent, RTCError, RTCEncodedVideoFrame, RTCEncodedAudioFrame, RTCDtlsTransport, RTCDataChannelEvent, RTCDataChannel, RTCDTMFToneChangeEvent, RTCDTMFSender, RTCCertificate, PromiseRejectionEvent, ProgressEvent, ProcessingInstruction, PopStateEvent, PointerEvent, PluginArray, Plugin, PeriodicWave, PerformanceTiming, PerformanceServerTiming, PerformanceResourceTiming, PerformancePaintTiming, PerformanceObserverEntryList, PerformanceObserver, PerformanceNavigationTiming, PerformanceNavigation, PerformanceMeasure, PerformanceMark, PerformanceLongTaskTiming, PerformanceEventTiming, PerformanceEntry, PerformanceElementTiming, Performance, Path2D, PannerNode, PageTransitionEvent, OverconstrainedError, OscillatorNode, OffscreenCanvasRenderingContext2D, OffscreenCanvas, OfflineAudioContext, OfflineAudioCompletionEvent, NodeList, NodeIterator, NodeFilter, Node, NetworkInformation, Navigator, NamedNodeMap, MutationRecord, MutationObserver, MutationEvent, MouseEvent, MimeTypeArray, MimeType, MessagePort, MessageEvent, MessageChannel, MediaStreamTrackEvent, MediaStreamTrack, MediaStreamEvent, MediaStreamAudioSourceNode, MediaStreamAudioDestinationNode, MediaStream, MediaRecorder, MediaQueryListEvent, MediaQueryList, MediaList, MediaError, MediaEncryptedEvent, MediaElementAudioSourceNode, MediaCapabilities, Location, LayoutShiftAttribution, LayoutShift, LargestContentfulPaint, KeyframeEffect, KeyboardEvent, IntersectionObserverEntry, IntersectionObserver, InputEvent, InputDeviceInfo, InputDeviceCapabilities, ImageData, ImageCapture, ImageBitmapRenderingContext, ImageBitmap, IdleDeadline, IIRFilterNode, IDBVersionChangeEvent, IDBTransaction, IDBRequest, IDBOpenDBRequest, IDBObjectStore, IDBKeyRange, IDBIndex, IDBFactory, IDBDatabase, IDBCursorWithValue, IDBCursor, History, Headers, HashChangeEvent, HTMLVideoElement, HTMLUnknownElement, HTMLUListElement, HTMLTrackElement, HTMLTitleElement, HTMLTimeElement, HTMLTextAreaElement, HTMLTemplateElement, HTMLTableSectionElement, HTMLTableRowElement, HTMLTableElement, HTMLTableColElement, HTMLTableCellElement, HTMLTableCaptionElement, HTMLStyleElement, HTMLSpanElement, HTMLSourceElement, HTMLSlotElement, HTMLSelectElement, HTMLScriptElement, HTMLQuoteElement, HTMLProgressElement, HTMLPreElement, HTMLPictureElement, HTMLParamElement, HTMLParagraphElement, HTMLOutputElement, HTMLOptionsCollection, HTMLOptionElement, HTMLOptGroupElement, HTMLObjectElement, HTMLOListElement, HTMLModElement, HTMLMeterElement, HTMLMetaElement, HTMLMenuElement, HTMLMediaElement, HTMLMarqueeElement, HTMLMapElement, HTMLLinkElement, HTMLLegendElement, HTMLLabelElement, HTMLLIElement, HTMLInputElement, HTMLImageElement, HTMLIFrameElement, HTMLHtmlElement, HTMLHeadingElement, HTMLHeadElement, HTMLHRElement, HTMLFrameSetElement, HTMLFrameElement, HTMLFormElement, HTMLFormControlsCollection, HTMLFontElement, HTMLFieldSetElement, HTMLEmbedElement, HTMLElement, HTMLDocument, HTMLDivElement, HTMLDirectoryElement, HTMLDialogElement, HTMLDetailsElement, HTMLDataListElement, HTMLDataElement, HTMLDListElement, HTMLCollection, HTMLCanvasElement, HTMLButtonElement, HTMLBodyElement, HTMLBaseElement, HTMLBRElement, HTMLAudioElement, HTMLAreaElement, HTMLAnchorElement, HTMLAllCollection, GeolocationPositionError, GeolocationPosition, GeolocationCoordinates, Geolocation, GamepadHapticActuator, GamepadEvent, GamepadButton, Gamepad, GainNode, FormDataEvent, FormData, FontFaceSetLoadEvent, FontFace, FocusEvent, FileReader, FileList, File, FeaturePolicy, External, EventTarget, EventSource, EventCounts, Event, ErrorEvent, ElementInternals, Element, DynamicsCompressorNode, DragEvent, DocumentType, DocumentFragment, Document, DelayNode, DecompressionStream, DataTransferItemList, DataTransferItem, DataTransfer, DOMTokenList, DOMStringMap, DOMStringList, DOMRectReadOnly, DOMRectList, DOMRect, DOMQuad, DOMPointReadOnly, DOMPoint, DOMParser, DOMMatrixReadOnly, DOMMatrix, DOMImplementation, DOMException, DOMError, CustomEvent, CustomElementRegistry, Crypto, CountQueuingStrategy, ConvolverNode, ConstantSourceNode, CompressionStream, CompositionEvent, Comment, CloseEvent, ClipboardEvent, CharacterData, ChannelSplitterNode, ChannelMergerNode, CanvasRenderingContext2D, CanvasPattern, CanvasGradient, CanvasCaptureMediaStreamTrack, CSSVariableReferenceValue, CSSUnparsedValue, CSSUnitValue, CSSTranslate, CSSTransformValue, CSSTransformComponent, CSSSupportsRule, CSSStyleValue, CSSStyleSheet, CSSStyleRule, CSSStyleDeclaration, CSSSkewY, CSSSkewX, CSSSkew, CSSScale, CSSRuleList, CSSRule, CSSRotate, CSSPropertyRule, CSSPositionValue, CSSPerspective, CSSPageRule, CSSNumericValue, CSSNumericArray, CSSNamespaceRule, CSSMediaRule, CSSMatrixComponent, CSSMathValue, CSSMathSum, CSSMathProduct, CSSMathNegate, CSSMathMin, CSSMathMax, CSSMathInvert, CSSKeywordValue, CSSKeyframesRule, CSSKeyframeRule, CSSImportRule, CSSImageValue, CSSGroupingRule, CSSFontFaceRule, CSSCounterStyleRule, CSSConditionRule, CSS, CDATASection, ByteLengthQueuingStrategy, BroadcastChannel, BlobEvent, Blob, BiquadFilterNode, BeforeUnloadEvent, BeforeInstallPromptEvent, BatteryManager, BaseAudioContext, BarProp, AudioWorkletNode, AudioScheduledSourceNode, AudioProcessingEvent, AudioParamMap, AudioParam, AudioNode, AudioListener, AudioDestinationNode, AudioContext, AudioBufferSourceNode, AudioBuffer, Attr, AnimationEvent, AnimationEffect, Animation, AnalyserNode, AbstractRange, AbortSignal, AbortController, window, self, document, name, location, customElements, history, locationbar, menubar, personalbar, scrollbars, statusbar, toolbar, status, closed, frames, length, top, opener, parent, frameElement, navigator, origin, external, screen, innerWidth, innerHeight, scrollX, pageXOffset, scrollY, pageYOffset, visualViewport, screenX, screenY, outerWidth, outerHeight, devicePixelRatio, event, clientInformation, offscreenBuffering, screenLeft, screenTop, defaultStatus, defaultstatus, styleMedia, onsearch, isSecureContext, performance, onappinstalled, onbeforeinstallprompt, crypto, indexedDB, webkitStorageInfo, sessionStorage, localStorage, onbeforexrselect, onabort, onblur, oncancel, oncanplay, oncanplaythrough, onchange, onclick, onclose, oncontextmenu, oncuechange, ondblclick, ondrag, ondragend, ondragenter, ondragleave, ondragover, ondragstart, ondrop, ondurationchange, onemptied, onended, onerror, onfocus, onformdata, oninput, oninvalid, onkeydown, onkeypress, onkeyup, onload, onloadeddata, onloadedmetadata, onloadstart, onmousedown, onmouseenter, onmouseleave, onmousemove, onmouseout, onmouseover, onmouseup, onmousewheel, onpause, onplay, onplaying, onprogress, onratechange, onreset, onresize, onscroll, onsecuritypolicyviolation, onseeked, onseeking, onselect, onslotchange, onstalled, onsubmit, onsuspend, ontimeupdate, ontoggle, onvolumechange, onwaiting, onwebkitanimationend, onwebkitanimationiteration, onwebkitanimationstart, onwebkittransitionend, onwheel, onauxclick, ongotpointercapture, onlostpointercapture, onpointerdown, onpointermove, onpointerup, onpointercancel, onpointerover, onpointerout, onpointerenter, onpointerleave, onselectstart, onselectionchange, onanimationend, onanimationiteration, onanimationstart, ontransitionrun, ontransitionstart, ontransitionend, ontransitioncancel, onafterprint, onbeforeprint, onbeforeunload, onhashchange, onlanguagechange, onmessage, onmessageerror, onoffline, ononline, onpagehide, onpageshow, onpopstate, onrejectionhandled, onstorage, onunhandledrejection, onunload, alert, atob, blur, btoa, cancelAnimationFrame, cancelIdleCallback, captureEvents, clearInterval, clearTimeout, close, confirm, createImageBitmap, fetch, find, focus, getComputedStyle, getSelection, matchMedia, moveBy, moveTo, open, postMessage, print, prompt, queueMicrotask, releaseEvents, reportError, requestAnimationFrame, requestIdleCallback, resizeBy, resizeTo, scroll, scrollBy, scrollTo, setInterval, setTimeout, stop, webkitCancelAnimationFrame, webkitRequestAnimationFrame, Atomics, chrome, WebAssembly, caches, cookieStore, ondevicemotion, ondeviceorientation, ondeviceorientationabsolute, AbsoluteOrientationSensor, Accelerometer, AudioWorklet, Cache, CacheStorage, Clipboard, ClipboardItem, CookieChangeEvent, CookieStore, CookieStoreManager, Credential, CredentialsContainer, CryptoKey, DeviceMotionEvent, DeviceMotionEventAcceleration, DeviceMotionEventRotationRate, DeviceOrientationEvent, FederatedCredential, Gyroscope, Keyboard, KeyboardLayoutMap, LinearAccelerationSensor, Lock, LockManager, MIDIAccess, MIDIConnectionEvent, MIDIInput, MIDIInputMap, MIDIMessageEvent, MIDIOutput, MIDIOutputMap, MIDIPort, MediaDeviceInfo, MediaDevices, MediaKeyMessageEvent, MediaKeySession, MediaKeyStatusMap, MediaKeySystemAccess, MediaKeys, NavigationPreloadManager, NavigatorManagedData, OrientationSensor, PasswordCredential, RTCIceTransport, RelativeOrientationSensor, Sensor, SensorErrorEvent, ServiceWorker, ServiceWorkerContainer, ServiceWorkerRegistration, StorageManager, SubtleCrypto, Worklet, XRDOMOverlayState, XRLayer, XRWebGLBinding, AudioData, EncodedAudioChunk, EncodedVideoChunk, ImageTrack, ImageTrackList, VideoColorSpace, VideoFrame, AudioDecoder, AudioEncoder, ImageDecoder, VideoDecoder, VideoEncoder, AuthenticatorAssertionResponse, AuthenticatorAttestationResponse, AuthenticatorResponse, PublicKeyCredential, Bluetooth, BluetoothCharacteristicProperties, BluetoothDevice, BluetoothRemoteGATTCharacteristic, BluetoothRemoteGATTDescriptor, BluetoothRemoteGATTServer, BluetoothRemoteGATTService, EyeDropper, FileSystemDirectoryHandle, FileSystemFileHandle, FileSystemHandle, FileSystemWritableFileStream, FragmentDirective, GravitySensor, HID, HIDConnectionEvent, HIDDevice, HIDInputReportEvent, IdleDetector, MediaStreamTrackGenerator, MediaStreamTrackProcessor, OTPCredential, PaymentAddress, PaymentRequest, PaymentResponse, PaymentMethodChangeEvent, Presentation, PresentationAvailability, PresentationConnection, PresentationConnectionAvailableEvent, PresentationConnectionCloseEvent, PresentationConnectionList, PresentationReceiver, PresentationRequest, Profiler, Scheduling, Serial, SerialPort, USB, USBAlternateInterface, USBConfiguration, USBConnectionEvent, USBDevice, USBEndpoint, USBInTransferResult, USBInterface, USBIsochronousInTransferPacket, USBIsochronousInTransferResult, USBIsochronousOutTransferPacket, USBIsochronousOutTransferResult, USBOutTransferResult, VirtualKeyboard, WakeLock, WakeLockSentinel, WebTransport, WebTransportBidirectionalStream, WebTransportDatagramDuplexStream, WebTransportError, XRAnchor, XRAnchorSet, XRBoundedReferenceSpace, XRFrame, XRInputSource, XRInputSourceArray, XRInputSourceEvent, XRInputSourcesChangeEvent, XRPose, XRReferenceSpace, XRReferenceSpaceEvent, XRRenderState, XRRigidTransform, XRSession, XRSessionEvent, XRSpace, XRSystem, XRView, XRViewerPose, XRViewport, XRWebGLLayer, XRCPUDepthInformation, XRDepthInformation, XRWebGLDepthInformation, XRHitTestResult, XRHitTestSource, XRRay, XRTransientInputHitTestResult, XRTransientInputHitTestSource, XRLightEstimate, XRLightProbe, showDirectoryPicker, showOpenFilePicker, showSaveFilePicker, originAgentCluster, trustedTypes, speechSynthesis, onpointerrawupdate, crossOriginIsolated, scheduler, AnimationPlaybackEvent, AnimationTimeline, CSSAnimation, CSSTransition, DocumentTimeline, BackgroundFetchManager, BackgroundFetchRecord, BackgroundFetchRegistration, BluetoothUUID, CustomStateSet, DelegatedInkTrailPresenter, Ink, MediaMetadata, MediaSession, MediaSource, SourceBuffer, SourceBufferList, NavigatorUAData, Notification, PaymentInstruments, PaymentManager, PaymentRequestUpdateEvent, PeriodicSyncManager, PermissionStatus, Permissions, PictureInPictureEvent, PictureInPictureWindow, PushManager, PushSubscription, PushSubscriptionOptions, RemotePlayback, Scheduler, TaskController, TaskPriorityChangeEvent, TaskSignal, SharedWorker, SpeechSynthesisErrorEvent, SpeechSynthesisEvent, SpeechSynthesisUtterance, TrustedHTML, TrustedScript, TrustedScriptURL, TrustedTypePolicy, TrustedTypePolicyFactory, URLPattern, VideoPlaybackQuality, VirtualKeyboardGeometryChangeEvent, XSLTProcessor, webkitSpeechGrammar, webkitSpeechGrammarList, webkitSpeechRecognition, webkitSpeechRecognitionError, webkitSpeechRecognitionEvent, openDatabase, webkitRequestFileSystem, webkitResolveLocalFileSystemURL`,
		cssKeys: `cssText, length, parentRule, cssFloat, getPropertyPriority, getPropertyValue, item, removeProperty, setProperty, constructor, accent-color, align-content, align-items, align-self, alignment-baseline, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, app-region, appearance, backdrop-filter, backface-visibility, background-attachment, background-blend-mode, background-clip, background-color, background-image, background-origin, background-position, background-repeat, background-size, baseline-shift, block-size, border-block-end-color, border-block-end-style, border-block-end-width, border-block-start-color, border-block-start-style, border-block-start-width, border-bottom-color, border-bottom-left-radius, border-bottom-right-radius, border-bottom-style, border-bottom-width, border-collapse, border-end-end-radius, border-end-start-radius, border-image-outset, border-image-repeat, border-image-slice, border-image-source, border-image-width, border-inline-end-color, border-inline-end-style, border-inline-end-width, border-inline-start-color, border-inline-start-style, border-inline-start-width, border-left-color, border-left-style, border-left-width, border-right-color, border-right-style, border-right-width, border-start-end-radius, border-start-start-radius, border-top-color, border-top-left-radius, border-top-right-radius, border-top-style, border-top-width, bottom, box-shadow, box-sizing, break-after, break-before, break-inside, buffered-rendering, caption-side, caret-color, clear, clip, clip-path, clip-rule, color, color-interpolation, color-interpolation-filters, color-rendering, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, contain-intrinsic-block-size, contain-intrinsic-height, contain-intrinsic-inline-size, contain-intrinsic-size, contain-intrinsic-width, content, cursor, cx, cy, d, direction, display, dominant-baseline, empty-cells, fill, fill-opacity, fill-rule, filter, flex-basis, flex-direction, flex-grow, flex-shrink, flex-wrap, float, flood-color, flood-opacity, font-family, font-kerning, font-optical-sizing, font-size, font-stretch, font-style, font-synthesis-small-caps, font-synthesis-style, font-synthesis-weight, font-variant, font-variant-caps, font-variant-east-asian, font-variant-ligatures, font-variant-numeric, font-weight, grid-auto-columns, grid-auto-flow, grid-auto-rows, grid-column-end, grid-column-start, grid-row-end, grid-row-start, grid-template-areas, grid-template-columns, grid-template-rows, height, hyphens, image-orientation, image-rendering, inline-size, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start, isolation, justify-content, justify-items, justify-self, left, letter-spacing, lighting-color, line-break, line-height, list-style-image, list-style-position, list-style-type, margin-block-end, margin-block-start, margin-bottom, margin-inline-end, margin-inline-start, margin-left, margin-right, margin-top, marker-end, marker-mid, marker-start, mask-type, max-block-size, max-height, max-inline-size, max-width, min-block-size, min-height, min-inline-size, min-width, mix-blend-mode, object-fit, object-position, offset-distance, offset-path, offset-rotate, opacity, order, orphans, outline-color, outline-offset, outline-style, outline-width, overflow-anchor, overflow-clip-margin, overflow-wrap, overflow-x, overflow-y, overscroll-behavior-block, overscroll-behavior-inline, padding-block-end, padding-block-start, padding-bottom, padding-inline-end, padding-inline-start, padding-left, padding-right, padding-top, paint-order, perspective, perspective-origin, pointer-events, position, r, resize, right, row-gap, ruby-position, rx, ry, scroll-behavior, scroll-margin-block-end, scroll-margin-block-start, scroll-margin-inline-end, scroll-margin-inline-start, scroll-padding-block-end, scroll-padding-block-start, scroll-padding-inline-end, scroll-padding-inline-start, scrollbar-gutter, shape-image-threshold, shape-margin, shape-outside, shape-rendering, speak, stop-color, stop-opacity, stroke, stroke-dasharray, stroke-dashoffset, stroke-linecap, stroke-linejoin, stroke-miterlimit, stroke-opacity, stroke-width, tab-size, table-layout, text-align, text-align-last, text-anchor, text-decoration, text-decoration-color, text-decoration-line, text-decoration-skip-ink, text-decoration-style, text-indent, text-overflow, text-rendering, text-shadow, text-size-adjust, text-transform, text-underline-position, top, touch-action, transform, transform-origin, transform-style, transition-delay, transition-duration, transition-property, transition-timing-function, unicode-bidi, user-select, vector-effect, vertical-align, visibility, white-space, widows, width, will-change, word-break, word-spacing, writing-mode, x, y, z-index, zoom, -webkit-border-horizontal-spacing, -webkit-border-image, -webkit-border-vertical-spacing, -webkit-box-align, -webkit-box-decoration-break, -webkit-box-direction, -webkit-box-flex, -webkit-box-ordinal-group, -webkit-box-orient, -webkit-box-pack, -webkit-box-reflect, -webkit-font-smoothing, -webkit-highlight, -webkit-hyphenate-character, -webkit-line-break, -webkit-line-clamp, -webkit-locale, -webkit-mask-box-image, -webkit-mask-box-image-outset, -webkit-mask-box-image-repeat, -webkit-mask-box-image-slice, -webkit-mask-box-image-source, -webkit-mask-box-image-width, -webkit-mask-clip, -webkit-mask-composite, -webkit-mask-image, -webkit-mask-origin, -webkit-mask-position, -webkit-mask-repeat, -webkit-mask-size, -webkit-print-color-adjust, -webkit-rtl-ordering, -webkit-tap-highlight-color, -webkit-text-combine, -webkit-text-decorations-in-effect, -webkit-text-emphasis-color, -webkit-text-emphasis-position, -webkit-text-emphasis-style, -webkit-text-fill-color, -webkit-text-orientation, -webkit-text-security, -webkit-text-stroke-color, -webkit-text-stroke-width, -webkit-user-drag, -webkit-user-modify, -webkit-writing-mode, accentColor, additiveSymbols, alignContent, alignItems, alignSelf, alignmentBaseline, all, animation, animationDelay, animationDirection, animationDuration, animationFillMode, animationIterationCount, animationName, animationPlayState, animationTimingFunction, appRegion, ascentOverride, aspectRatio, backdropFilter, backfaceVisibility, background, backgroundAttachment, backgroundBlendMode, backgroundClip, backgroundColor, backgroundImage, backgroundOrigin, backgroundPosition, backgroundPositionX, backgroundPositionY, backgroundRepeat, backgroundRepeatX, backgroundRepeatY, backgroundSize, baselineShift, blockSize, border, borderBlock, borderBlockColor, borderBlockEnd, borderBlockEndColor, borderBlockEndStyle, borderBlockEndWidth, borderBlockStart, borderBlockStartColor, borderBlockStartStyle, borderBlockStartWidth, borderBlockStyle, borderBlockWidth, borderBottom, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, borderEndEndRadius, borderEndStartRadius, borderImage, borderImageOutset, borderImageRepeat, borderImageSlice, borderImageSource, borderImageWidth, borderInline, borderInlineColor, borderInlineEnd, borderInlineEndColor, borderInlineEndStyle, borderInlineEndWidth, borderInlineStart, borderInlineStartColor, borderInlineStartStyle, borderInlineStartWidth, borderInlineStyle, borderInlineWidth, borderLeft, borderLeftColor, borderLeftStyle, borderLeftWidth, borderRadius, borderRight, borderRightColor, borderRightStyle, borderRightWidth, borderSpacing, borderStartEndRadius, borderStartStartRadius, borderStyle, borderTop, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderTopStyle, borderTopWidth, borderWidth, boxShadow, boxSizing, breakAfter, breakBefore, breakInside, bufferedRendering, captionSide, caretColor, clipPath, clipRule, colorInterpolation, colorInterpolationFilters, colorRendering, colorScheme, columnCount, columnFill, columnGap, columnRule, columnRuleColor, columnRuleStyle, columnRuleWidth, columnSpan, columnWidth, columns, contain, containIntrinsicBlockSize, containIntrinsicHeight, containIntrinsicInlineSize, containIntrinsicSize, containIntrinsicWidth, contentVisibility, counterIncrement, counterReset, counterSet, descentOverride, dominantBaseline, emptyCells, fallback, fillOpacity, fillRule, flex, flexBasis, flexDirection, flexFlow, flexGrow, flexShrink, flexWrap, floodColor, floodOpacity, font, fontDisplay, fontFamily, fontFeatureSettings, fontKerning, fontOpticalSizing, fontSize, fontStretch, fontStyle, fontSynthesis, fontSynthesisSmallCaps, fontSynthesisStyle, fontSynthesisWeight, fontVariant, fontVariantCaps, fontVariantEastAsian, fontVariantLigatures, fontVariantNumeric, fontVariationSettings, fontWeight, forcedColorAdjust, gap, grid, gridArea, gridAutoColumns, gridAutoFlow, gridAutoRows, gridColumn, gridColumnEnd, gridColumnGap, gridColumnStart, gridGap, gridRow, gridRowEnd, gridRowGap, gridRowStart, gridTemplate, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, imageOrientation, imageRendering, inherits, initialValue, inlineSize, inset, insetBlock, insetBlockEnd, insetBlockStart, insetInline, insetInlineEnd, insetInlineStart, justifyContent, justifyItems, justifySelf, letterSpacing, lightingColor, lineBreak, lineGapOverride, lineHeight, listStyle, listStyleImage, listStylePosition, listStyleType, margin, marginBlock, marginBlockEnd, marginBlockStart, marginBottom, marginInline, marginInlineEnd, marginInlineStart, marginLeft, marginRight, marginTop, marker, markerEnd, markerMid, markerStart, mask, maskType, maxBlockSize, maxHeight, maxInlineSize, maxWidth, maxZoom, minBlockSize, minHeight, minInlineSize, minWidth, minZoom, mixBlendMode, negative, objectFit, objectPosition, offset, offsetDistance, offsetPath, offsetRotate, orientation, outline, outlineColor, outlineOffset, outlineStyle, outlineWidth, overflow, overflowAnchor, overflowClipMargin, overflowWrap, overflowX, overflowY, overscrollBehavior, overscrollBehaviorBlock, overscrollBehaviorInline, overscrollBehaviorX, overscrollBehaviorY, pad, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingBottom, paddingInline, paddingInlineEnd, paddingInlineStart, paddingLeft, paddingRight, paddingTop, page, pageBreakAfter, pageBreakBefore, pageBreakInside, pageOrientation, paintOrder, perspectiveOrigin, placeContent, placeItems, placeSelf, pointerEvents, prefix, quotes, range, rowGap, rubyPosition, scrollBehavior, scrollMargin, scrollMarginBlock, scrollMarginBlockEnd, scrollMarginBlockStart, scrollMarginBottom, scrollMarginInline, scrollMarginInlineEnd, scrollMarginInlineStart, scrollMarginLeft, scrollMarginRight, scrollMarginTop, scrollPadding, scrollPaddingBlock, scrollPaddingBlockEnd, scrollPaddingBlockStart, scrollPaddingBottom, scrollPaddingInline, scrollPaddingInlineEnd, scrollPaddingInlineStart, scrollPaddingLeft, scrollPaddingRight, scrollPaddingTop, scrollSnapAlign, scrollSnapStop, scrollSnapType, scrollbarGutter, shapeImageThreshold, shapeMargin, shapeOutside, shapeRendering, size, sizeAdjust, speakAs, src, stopColor, stopOpacity, strokeDasharray, strokeDashoffset, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeOpacity, strokeWidth, suffix, symbols, syntax, system, tabSize, tableLayout, textAlign, textAlignLast, textAnchor, textCombineUpright, textDecoration, textDecorationColor, textDecorationLine, textDecorationSkipInk, textDecorationStyle, textDecorationThickness, textIndent, textOrientation, textOverflow, textRendering, textShadow, textSizeAdjust, textTransform, textUnderlineOffset, textUnderlinePosition, touchAction, transformBox, transformOrigin, transformStyle, transition, transitionDelay, transitionDuration, transitionProperty, transitionTimingFunction, unicodeBidi, unicodeRange, userSelect, userZoom, vectorEffect, verticalAlign, webkitAlignContent, webkitAlignItems, webkitAlignSelf, webkitAnimation, webkitAnimationDelay, webkitAnimationDirection, webkitAnimationDuration, webkitAnimationFillMode, webkitAnimationIterationCount, webkitAnimationName, webkitAnimationPlayState, webkitAnimationTimingFunction, webkitAppRegion, webkitAppearance, webkitBackfaceVisibility, webkitBackgroundClip, webkitBackgroundOrigin, webkitBackgroundSize, webkitBorderAfter, webkitBorderAfterColor, webkitBorderAfterStyle, webkitBorderAfterWidth, webkitBorderBefore, webkitBorderBeforeColor, webkitBorderBeforeStyle, webkitBorderBeforeWidth, webkitBorderBottomLeftRadius, webkitBorderBottomRightRadius, webkitBorderEnd, webkitBorderEndColor, webkitBorderEndStyle, webkitBorderEndWidth, webkitBorderHorizontalSpacing, webkitBorderImage, webkitBorderRadius, webkitBorderStart, webkitBorderStartColor, webkitBorderStartStyle, webkitBorderStartWidth, webkitBorderTopLeftRadius, webkitBorderTopRightRadius, webkitBorderVerticalSpacing, webkitBoxAlign, webkitBoxDecorationBreak, webkitBoxDirection, webkitBoxFlex, webkitBoxOrdinalGroup, webkitBoxOrient, webkitBoxPack, webkitBoxReflect, webkitBoxShadow, webkitBoxSizing, webkitClipPath, webkitColumnBreakAfter, webkitColumnBreakBefore, webkitColumnBreakInside, webkitColumnCount, webkitColumnGap, webkitColumnRule, webkitColumnRuleColor, webkitColumnRuleStyle, webkitColumnRuleWidth, webkitColumnSpan, webkitColumnWidth, webkitColumns, webkitFilter, webkitFlex, webkitFlexBasis, webkitFlexDirection, webkitFlexFlow, webkitFlexGrow, webkitFlexShrink, webkitFlexWrap, webkitFontFeatureSettings, webkitFontSmoothing, webkitHighlight, webkitHyphenateCharacter, webkitJustifyContent, webkitLineBreak, webkitLineClamp, webkitLocale, webkitLogicalHeight, webkitLogicalWidth, webkitMarginAfter, webkitMarginBefore, webkitMarginEnd, webkitMarginStart, webkitMask, webkitMaskBoxImage, webkitMaskBoxImageOutset, webkitMaskBoxImageRepeat, webkitMaskBoxImageSlice, webkitMaskBoxImageSource, webkitMaskBoxImageWidth, webkitMaskClip, webkitMaskComposite, webkitMaskImage, webkitMaskOrigin, webkitMaskPosition, webkitMaskPositionX, webkitMaskPositionY, webkitMaskRepeat, webkitMaskRepeatX, webkitMaskRepeatY, webkitMaskSize, webkitMaxLogicalHeight, webkitMaxLogicalWidth, webkitMinLogicalHeight, webkitMinLogicalWidth, webkitOpacity, webkitOrder, webkitPaddingAfter, webkitPaddingBefore, webkitPaddingEnd, webkitPaddingStart, webkitPerspective, webkitPerspectiveOrigin, webkitPerspectiveOriginX, webkitPerspectiveOriginY, webkitPrintColorAdjust, webkitRtlOrdering, webkitRubyPosition, webkitShapeImageThreshold, webkitShapeMargin, webkitShapeOutside, webkitTapHighlightColor, webkitTextCombine, webkitTextDecorationsInEffect, webkitTextEmphasis, webkitTextEmphasisColor, webkitTextEmphasisPosition, webkitTextEmphasisStyle, webkitTextFillColor, webkitTextOrientation, webkitTextSecurity, webkitTextSizeAdjust, webkitTextStroke, webkitTextStrokeColor, webkitTextStrokeWidth, webkitTransform, webkitTransformOrigin, webkitTransformOriginX, webkitTransformOriginY, webkitTransformOriginZ, webkitTransformStyle, webkitTransition, webkitTransitionDelay, webkitTransitionDuration, webkitTransitionProperty, webkitTransitionTimingFunction, webkitUserDrag, webkitUserModify, webkitUserSelect, webkitWritingMode, whiteSpace, willChange, wordBreak, wordSpacing, wordWrap, writingMode, zIndex, additive-symbols, ascent-override, aspect-ratio, background-position-x, background-position-y, background-repeat-x, background-repeat-y, border-block, border-block-color, border-block-end, border-block-start, border-block-style, border-block-width, border-bottom, border-color, border-image, border-inline, border-inline-color, border-inline-end, border-inline-start, border-inline-style, border-inline-width, border-left, border-radius, border-right, border-spacing, border-style, border-top, border-width, color-scheme, column-fill, column-rule, content-visibility, counter-increment, counter-reset, counter-set, descent-override, flex-flow, font-display, font-feature-settings, font-synthesis, font-variation-settings, forced-color-adjust, grid-area, grid-column, grid-column-gap, grid-gap, grid-row, grid-row-gap, grid-template, initial-value, inset-block, inset-inline, line-gap-override, list-style, margin-block, margin-inline, max-zoom, min-zoom, overscroll-behavior, overscroll-behavior-x, overscroll-behavior-y, padding-block, padding-inline, page-break-after, page-break-before, page-break-inside, page-orientation, place-content, place-items, place-self, scroll-margin, scroll-margin-block, scroll-margin-bottom, scroll-margin-inline, scroll-margin-left, scroll-margin-right, scroll-margin-top, scroll-padding, scroll-padding-block, scroll-padding-bottom, scroll-padding-inline, scroll-padding-left, scroll-padding-right, scroll-padding-top, scroll-snap-align, scroll-snap-stop, scroll-snap-type, size-adjust, speak-as, text-combine-upright, text-decoration-thickness, text-orientation, text-underline-offset, transform-box, unicode-range, user-zoom, -webkit-align-content, -webkit-align-items, -webkit-align-self, -webkit-animation, -webkit-animation-delay, -webkit-animation-direction, -webkit-animation-duration, -webkit-animation-fill-mode, -webkit-animation-iteration-count, -webkit-animation-name, -webkit-animation-play-state, -webkit-animation-timing-function, -webkit-app-region, -webkit-appearance, -webkit-backface-visibility, -webkit-background-clip, -webkit-background-origin, -webkit-background-size, -webkit-border-after, -webkit-border-after-color, -webkit-border-after-style, -webkit-border-after-width, -webkit-border-before, -webkit-border-before-color, -webkit-border-before-style, -webkit-border-before-width, -webkit-border-bottom-left-radius, -webkit-border-bottom-right-radius, -webkit-border-end, -webkit-border-end-color, -webkit-border-end-style, -webkit-border-end-width, -webkit-border-radius, -webkit-border-start, -webkit-border-start-color, -webkit-border-start-style, -webkit-border-start-width, -webkit-border-top-left-radius, -webkit-border-top-right-radius, -webkit-box-shadow, -webkit-box-sizing, -webkit-clip-path, -webkit-column-break-after, -webkit-column-break-before, -webkit-column-break-inside, -webkit-column-count, -webkit-column-gap, -webkit-column-rule, -webkit-column-rule-color, -webkit-column-rule-style, -webkit-column-rule-width, -webkit-column-span, -webkit-column-width, -webkit-columns, -webkit-filter, -webkit-flex, -webkit-flex-basis, -webkit-flex-direction, -webkit-flex-flow, -webkit-flex-grow, -webkit-flex-shrink, -webkit-flex-wrap, -webkit-font-feature-settings, -webkit-justify-content, -webkit-logical-height, -webkit-logical-width, -webkit-margin-after, -webkit-margin-before, -webkit-margin-end, -webkit-margin-start, -webkit-mask, -webkit-mask-position-x, -webkit-mask-position-y, -webkit-mask-repeat-x, -webkit-mask-repeat-y, -webkit-max-logical-height, -webkit-max-logical-width, -webkit-min-logical-height, -webkit-min-logical-width, -webkit-opacity, -webkit-order, -webkit-padding-after, -webkit-padding-before, -webkit-padding-end, -webkit-padding-start, -webkit-perspective, -webkit-perspective-origin, -webkit-perspective-origin-x, -webkit-perspective-origin-y, -webkit-ruby-position, -webkit-shape-image-threshold, -webkit-shape-margin, -webkit-shape-outside, -webkit-text-emphasis, -webkit-text-size-adjust, -webkit-text-stroke, -webkit-transform, -webkit-transform-origin, -webkit-transform-origin-x, -webkit-transform-origin-y, -webkit-transform-origin-z, -webkit-transform-style, -webkit-transition, -webkit-transition-delay, -webkit-transition-duration, -webkit-transition-property, -webkit-transition-timing-function, -webkit-user-select, word-wrap`,
		jsKeys: "Array.at, Array.concat, Array.copyWithin, Array.entries, Array.every, Array.fill, Array.filter, Array.find, Array.findIndex, Array.findLast, Array.findLastIndex, Array.flat, Array.flatMap, Array.forEach, Array.from, Array.includes, Array.indexOf, Array.isArray, Array.join, Array.keys, Array.lastIndexOf, Array.map, Array.of, Array.pop, Array.push, Array.reduce, Array.reduceRight, Array.reverse, Array.shift, Array.slice, Array.some, Array.sort, Array.splice, Array.toLocaleString, Array.toString, Array.unshift, Array.values, Atomics.add, Atomics.and, Atomics.compareExchange, Atomics.exchange, Atomics.isLockFree, Atomics.load, Atomics.notify, Atomics.or, Atomics.store, Atomics.sub, Atomics.wait, Atomics.waitAsync, Atomics.xor, BigInt.asIntN, BigInt.asUintN, BigInt.toLocaleString, BigInt.toString, BigInt.valueOf, Boolean.toString, Boolean.valueOf, Date.UTC, Date.getDate, Date.getDay, Date.getFullYear, Date.getHours, Date.getMilliseconds, Date.getMinutes, Date.getMonth, Date.getSeconds, Date.getTime, Date.getTimezoneOffset, Date.getUTCDate, Date.getUTCDay, Date.getUTCFullYear, Date.getUTCHours, Date.getUTCMilliseconds, Date.getUTCMinutes, Date.getUTCMonth, Date.getUTCSeconds, Date.getYear, Date.now, Date.parse, Date.setDate, Date.setFullYear, Date.setHours, Date.setMilliseconds, Date.setMinutes, Date.setMonth, Date.setSeconds, Date.setTime, Date.setUTCDate, Date.setUTCFullYear, Date.setUTCHours, Date.setUTCMilliseconds, Date.setUTCMinutes, Date.setUTCMonth, Date.setUTCSeconds, Date.setYear, Date.toDateString, Date.toGMTString, Date.toISOString, Date.toJSON, Date.toLocaleDateString, Date.toLocaleString, Date.toLocaleTimeString, Date.toString, Date.toTimeString, Date.toUTCString, Date.valueOf, Document.URL, Document.activeElement, Document.adoptNode, Document.adoptedStyleSheets, Document.alinkColor, Document.all, Document.anchors, Document.append, Document.applets, Document.bgColor, Document.body, Document.captureEvents, Document.caretRangeFromPoint, Document.characterSet, Document.charset, Document.childElementCount, Document.children, Document.clear, Document.close, Document.compatMode, Document.contentType, Document.cookie, Document.createAttribute, Document.createAttributeNS, Document.createCDATASection, Document.createComment, Document.createDocumentFragment, Document.createElement, Document.createElementNS, Document.createEvent, Document.createExpression, Document.createNSResolver, Document.createNodeIterator, Document.createProcessingInstruction, Document.createRange, Document.createTextNode, Document.createTreeWalker, Document.currentScript, Document.defaultView, Document.designMode, Document.dir, Document.doctype, Document.documentElement, Document.documentURI, Document.domain, Document.elementFromPoint, Document.elementsFromPoint, Document.embeds, Document.evaluate, Document.execCommand, Document.exitFullscreen, Document.exitPictureInPicture, Document.exitPointerLock, Document.featurePolicy, Document.fgColor, Document.firstElementChild, Document.fonts, Document.forms, Document.fragmentDirective, Document.fullscreen, Document.fullscreenElement, Document.fullscreenEnabled, Document.getAnimations, Document.getElementById, Document.getElementsByClassName, Document.getElementsByName, Document.getElementsByTagName, Document.getElementsByTagNameNS, Document.getSelection, Document.hasFocus, Document.head, Document.hidden, Document.images, Document.implementation, Document.importNode, Document.inputEncoding, Document.lastElementChild, Document.lastModified, Document.linkColor, Document.links, Document.onabort, Document.onanimationend, Document.onanimationiteration, Document.onanimationstart, Document.onauxclick, Document.onbeforecopy, Document.onbeforecut, Document.onbeforepaste, Document.onbeforexrselect, Document.onblur, Document.oncancel, Document.oncanplay, Document.oncanplaythrough, Document.onchange, Document.onclick, Document.onclose, Document.oncontextmenu, Document.oncopy, Document.oncuechange, Document.oncut, Document.ondblclick, Document.ondrag, Document.ondragend, Document.ondragenter, Document.ondragleave, Document.ondragover, Document.ondragstart, Document.ondrop, Document.ondurationchange, Document.onemptied, Document.onended, Document.onerror, Document.onfocus, Document.onformdata, Document.onfreeze, Document.onfullscreenchange, Document.onfullscreenerror, Document.ongotpointercapture, Document.oninput, Document.oninvalid, Document.onkeydown, Document.onkeypress, Document.onkeyup, Document.onload, Document.onloadeddata, Document.onloadedmetadata, Document.onloadstart, Document.onlostpointercapture, Document.onmousedown, Document.onmouseenter, Document.onmouseleave, Document.onmousemove, Document.onmouseout, Document.onmouseover, Document.onmouseup, Document.onmousewheel, Document.onpaste, Document.onpause, Document.onplay, Document.onplaying, Document.onpointercancel, Document.onpointerdown, Document.onpointerenter, Document.onpointerleave, Document.onpointerlockchange, Document.onpointerlockerror, Document.onpointermove, Document.onpointerout, Document.onpointerover, Document.onpointerrawupdate, Document.onpointerup, Document.onprogress, Document.onratechange, Document.onreadystatechange, Document.onreset, Document.onresize, Document.onresume, Document.onscroll, Document.onsearch, Document.onsecuritypolicyviolation, Document.onseeked, Document.onseeking, Document.onselect, Document.onselectionchange, Document.onselectstart, Document.onslotchange, Document.onstalled, Document.onsubmit, Document.onsuspend, Document.ontimeupdate, Document.ontoggle, Document.ontransitioncancel, Document.ontransitionend, Document.ontransitionrun, Document.ontransitionstart, Document.onvisibilitychange, Document.onvolumechange, Document.onwaiting, Document.onwebkitanimationend, Document.onwebkitanimationiteration, Document.onwebkitanimationstart, Document.onwebkitfullscreenchange, Document.onwebkitfullscreenerror, Document.onwebkittransitionend, Document.onwheel, Document.open, Document.pictureInPictureElement, Document.pictureInPictureEnabled, Document.plugins, Document.pointerLockElement, Document.prepend, Document.queryCommandEnabled, Document.queryCommandIndeterm, Document.queryCommandState, Document.queryCommandSupported, Document.queryCommandValue, Document.querySelector, Document.querySelectorAll, Document.readyState, Document.referrer, Document.releaseEvents, Document.replaceChildren, Document.rootElement, Document.scripts, Document.scrollingElement, Document.styleSheets, Document.timeline, Document.title, Document.visibilityState, Document.vlinkColor, Document.wasDiscarded, Document.webkitCancelFullScreen, Document.webkitCurrentFullScreenElement, Document.webkitExitFullscreen, Document.webkitFullscreenElement, Document.webkitFullscreenEnabled, Document.webkitHidden, Document.webkitIsFullScreen, Document.webkitVisibilityState, Document.write, Document.writeln, Document.xmlEncoding, Document.xmlStandalone, Document.xmlVersion, Element.after, Element.animate, Element.append, Element.ariaAtomic, Element.ariaAutoComplete, Element.ariaBusy, Element.ariaChecked, Element.ariaColCount, Element.ariaColIndex, Element.ariaColSpan, Element.ariaCurrent, Element.ariaDescription, Element.ariaDisabled, Element.ariaExpanded, Element.ariaHasPopup, Element.ariaHidden, Element.ariaKeyShortcuts, Element.ariaLabel, Element.ariaLevel, Element.ariaLive, Element.ariaModal, Element.ariaMultiLine, Element.ariaMultiSelectable, Element.ariaOrientation, Element.ariaPlaceholder, Element.ariaPosInSet, Element.ariaPressed, Element.ariaReadOnly, Element.ariaRelevant, Element.ariaRequired, Element.ariaRoleDescription, Element.ariaRowCount, Element.ariaRowIndex, Element.ariaRowSpan, Element.ariaSelected, Element.ariaSetSize, Element.ariaSort, Element.ariaValueMax, Element.ariaValueMin, Element.ariaValueNow, Element.ariaValueText, Element.assignedSlot, Element.attachShadow, Element.attributeStyleMap, Element.attributes, Element.before, Element.childElementCount, Element.children, Element.classList, Element.className, Element.clientHeight, Element.clientLeft, Element.clientTop, Element.clientWidth, Element.closest, Element.computedStyleMap, Element.elementTiming, Element.firstElementChild, Element.getAnimations, Element.getAttribute, Element.getAttributeNS, Element.getAttributeNames, Element.getAttributeNode, Element.getAttributeNodeNS, Element.getBoundingClientRect, Element.getClientRects, Element.getElementsByClassName, Element.getElementsByTagName, Element.getElementsByTagNameNS, Element.getInnerHTML, Element.hasAttribute, Element.hasAttributeNS, Element.hasAttributes, Element.hasPointerCapture, Element.id, Element.innerHTML, Element.insertAdjacentElement, Element.insertAdjacentHTML, Element.insertAdjacentText, Element.lastElementChild, Element.localName, Element.matches, Element.namespaceURI, Element.nextElementSibling, Element.onbeforecopy, Element.onbeforecut, Element.onbeforepaste, Element.onfullscreenchange, Element.onfullscreenerror, Element.onsearch, Element.onwebkitfullscreenchange, Element.onwebkitfullscreenerror, Element.outerHTML, Element.part, Element.prefix, Element.prepend, Element.previousElementSibling, Element.querySelector, Element.querySelectorAll, Element.releasePointerCapture, Element.remove, Element.removeAttribute, Element.removeAttributeNS, Element.removeAttributeNode, Element.replaceChildren, Element.replaceWith, Element.requestFullscreen, Element.requestPointerLock, Element.scroll, Element.scrollBy, Element.scrollHeight, Element.scrollIntoView, Element.scrollIntoViewIfNeeded, Element.scrollLeft, Element.scrollTo, Element.scrollTop, Element.scrollWidth, Element.setAttribute, Element.setAttributeNS, Element.setAttributeNode, Element.setAttributeNodeNS, Element.setPointerCapture, Element.shadowRoot, Element.slot, Element.tagName, Element.toggleAttribute, Element.webkitMatchesSelector, Element.webkitRequestFullScreen, Element.webkitRequestFullscreen, Error.captureStackTrace, Error.message, Error.stackTraceLimit, Error.toString, Function.apply, Function.bind, Function.call, Function.toString, Intl.Collator, Intl.DateTimeFormat, Intl.DisplayNames, Intl.ListFormat, Intl.Locale, Intl.NumberFormat, Intl.PluralRules, Intl.RelativeTimeFormat, Intl.Segmenter, Intl.getCanonicalLocales, Intl.v8BreakIterator, JSON.parse, JSON.stringify, Map.clear, Map.delete, Map.entries, Map.forEach, Map.get, Map.has, Map.keys, Map.set, Map.size, Map.values, Math.E, Math.LN10, Math.LN2, Math.LOG10E, Math.LOG2E, Math.PI, Math.SQRT1_2, Math.SQRT2, Math.abs, Math.acos, Math.acosh, Math.asin, Math.asinh, Math.atan, Math.atan2, Math.atanh, Math.cbrt, Math.ceil, Math.clz32, Math.cos, Math.cosh, Math.exp, Math.expm1, Math.floor, Math.fround, Math.hypot, Math.imul, Math.log, Math.log10, Math.log1p, Math.log2, Math.max, Math.min, Math.pow, Math.random, Math.round, Math.sign, Math.sin, Math.sinh, Math.sqrt, Math.tan, Math.tanh, Math.trunc, Number.EPSILON, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, Number.NEGATIVE_INFINITY, Number.NaN, Number.POSITIVE_INFINITY, Number.isFinite, Number.isInteger, Number.isNaN, Number.isSafeInteger, Number.parseFloat, Number.parseInt, Number.toExponential, Number.toFixed, Number.toLocaleString, Number.toPrecision, Number.toString, Number.valueOf, Object.__defineGetter__, Object.__defineSetter__, Object.__lookupGetter__, Object.__lookupSetter__, Object.__proto__, Object.assign, Object.create, Object.defineProperties, Object.defineProperty, Object.entries, Object.freeze, Object.fromEntries, Object.getOwnPropertyDescriptor, Object.getOwnPropertyDescriptors, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, Object.getPrototypeOf, Object.hasOwn, Object.hasOwnProperty, Object.is, Object.isExtensible, Object.isFrozen, Object.isPrototypeOf, Object.isSealed, Object.keys, Object.preventExtensions, Object.propertyIsEnumerable, Object.seal, Object.setPrototypeOf, Object.toLocaleString, Object.toString, Object.valueOf, Object.values, Promise.all, Promise.allSettled, Promise.any, Promise.catch, Promise.finally, Promise.race, Promise.reject, Promise.resolve, Promise.then, Proxy.revocable, Reflect.apply, Reflect.construct, Reflect.defineProperty, Reflect.deleteProperty, Reflect.get, Reflect.getOwnPropertyDescriptor, Reflect.getPrototypeOf, Reflect.has, Reflect.isExtensible, Reflect.ownKeys, Reflect.preventExtensions, Reflect.set, Reflect.setPrototypeOf, RegExp.$&, RegExp.$', RegExp.$+, RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7, RegExp.$8, RegExp.$9, RegExp.$_, RegExp.$`, RegExp.compile, RegExp.dotAll, RegExp.exec, RegExp.flags, RegExp.global, RegExp.hasIndices, RegExp.ignoreCase, RegExp.input, RegExp.lastMatch, RegExp.lastParen, RegExp.leftContext, RegExp.multiline, RegExp.rightContext, RegExp.source, RegExp.sticky, RegExp.test, RegExp.toString, RegExp.unicode, Set.add, Set.clear, Set.delete, Set.entries, Set.forEach, Set.has, Set.keys, Set.size, Set.values, String.anchor, String.at, String.big, String.blink, String.bold, String.charAt, String.charCodeAt, String.codePointAt, String.concat, String.endsWith, String.fixed, String.fontcolor, String.fontsize, String.fromCharCode, String.fromCodePoint, String.includes, String.indexOf, String.italics, String.lastIndexOf, String.link, String.localeCompare, String.match, String.matchAll, String.normalize, String.padEnd, String.padStart, String.raw, String.repeat, String.replace, String.replaceAll, String.search, String.slice, String.small, String.split, String.startsWith, String.strike, String.sub, String.substr, String.substring, String.sup, String.toLocaleLowerCase, String.toLocaleUpperCase, String.toLowerCase, String.toString, String.toUpperCase, String.trim, String.trimEnd, String.trimLeft, String.trimRight, String.trimStart, String.valueOf, Symbol.asyncIterator, Symbol.description, Symbol.for, Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator, Symbol.keyFor, Symbol.match, Symbol.matchAll, Symbol.replace, Symbol.search, Symbol.species, Symbol.split, Symbol.toPrimitive, Symbol.toString, Symbol.toStringTag, Symbol.unscopables, Symbol.valueOf, WeakMap.delete, WeakMap.get, WeakMap.has, WeakMap.set, WeakSet.add, WeakSet.delete, WeakSet.has, WebAssembly.CompileError, WebAssembly.Exception, WebAssembly.Global, WebAssembly.Instance, WebAssembly.LinkError, WebAssembly.Memory, WebAssembly.Module, WebAssembly.RuntimeError, WebAssembly.Table, WebAssembly.Tag, WebAssembly.compile, WebAssembly.compileStreaming, WebAssembly.instantiate, WebAssembly.instantiateStreaming, WebAssembly.validate",
	},
	'Firefox': {
		version: 94,
		windowKeys: `undefined, globalThis, Array, Boolean, JSON, Date, Math, Number, String, RegExp, Error, InternalError, AggregateError, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, ArrayBuffer, Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray, BigInt64Array, BigUint64Array, BigInt, Proxy, WeakMap, Set, DataView, Symbol, Intl, Reflect, WeakSet, Atomics, Promise, ReadableStream, ByteLengthQueuingStrategy, CountQueuingStrategy, WebAssembly, FinalizationRegistry, WeakRef, NaN, Infinity, isNaN, isFinite, parseFloat, parseInt, escape, unescape, decodeURI, encodeURI, decodeURIComponent, encodeURIComponent, TimeRanges, GeolocationCoordinates, HTMLLinkElement, SVGImageElement, RTCTrackEvent, ServiceWorkerContainer, DOMMatrixReadOnly, ResizeObserverSize, Audio, MediaQueryList, MediaStreamTrackAudioSourceNode, HTMLOListElement, PerformanceMeasure, HTMLMetaElement, GamepadPose, MediaStreamAudioDestinationNode, VisualViewport, CSSAnimation, PerformanceMark, RTCDTMFToneChangeEvent, RTCDTMFSender, MediaCapabilities, UIEvent, HashChangeEvent, HTMLParagraphElement, WebSocket, DynamicsCompressorNode, PerformanceResourceTiming, StorageEvent, ResizeObserverEntry, HTMLFieldSetElement, TextDecoder, Option, RTCRtpTransceiver, PerformanceObserver, ChannelSplitterNode, TimeEvent, HTMLIFrameElement, IDBKeyRange, CharacterData, MediaDevices, MediaRecorder, IDBMutableFile, Directory, HTMLSourceElement, MediaKeySession, BeforeUnloadEvent, SVGLength, FileSystem, WebKitCSSMatrix, SVGPolygonElement, HTMLObjectElement, CSSMediaRule, OfflineResourceList, SVGPreserveAspectRatio, IDBRequest, InputEvent, ImageData, DelayNode, VideoPlaybackQuality, HTMLMapElement, XMLDocument, ProgressEvent, TreeWalker, HTMLCollection, HTMLQuoteElement, PerformanceEntry, ValidityState, MediaRecorderErrorEvent, AudioListener, SVGFEColorMatrixElement, SVGAnimatedNumber, HTMLTableSectionElement, MutationEvent, HTMLLabelElement, WebGLRenderingContext, MouseScrollEvent, VRDisplay, DeviceMotionEvent, HTMLBaseElement, FileSystemFileEntry, SVGNumberList, CSSFontFeatureValuesRule, HTMLTimeElement, WebGLFramebuffer, mozRTCSessionDescription, SVGFEDropShadowElement, DeviceOrientationEvent, MessageChannel, RTCSessionDescription, PopStateEvent, Worklet, Plugin, GamepadEvent, RTCDataChannel, Screen, PaintRequestList, SVGLengthList, VRPose, ChannelMergerNode, SVGFEFuncRElement, XPathExpression, GamepadHapticActuator, VRDisplayCapabilities, VRFieldOfView, DOMRect, SharedWorker, HTMLBRElement, MediaDeviceInfo, SpeechSynthesisVoice, WebGLShaderPrecisionFormat, SVGSymbolElement, MessageEvent, AuthenticatorAttestationResponse, HTMLSelectElement, SVGTransformList, MediaList, SVGDefsElement, SVGDescElement, HTMLOptionElement, HTMLMarqueeElement, SubtleCrypto, mozRTCIceCandidate, WebGLVertexArrayObject, PerformanceTiming, U2F, AbstractRange, CSSFontFaceRule, HTMLAllCollection, KeyframeEffect, WebGLTransformFeedback, HTMLOptionsCollection, RTCPeerConnection, SpeechSynthesis, SVGGElement, SVGFEDistantLightElement, SVGAnimatedPreserveAspectRatio, HTMLVideoElement, ImageBitmap, DOMMatrix, SVGUnitTypes, SVGCircleElement, HTMLEmbedElement, SVGScriptElement, HTMLCanvasElement, HTMLModElement, AudioParamMap, CSSTransition, HTMLOutputElement, CustomEvent, ServiceWorker, Animation, WebGLSync, MediaKeyError, MediaKeys, DOMRectList, HTMLElement, Cache, DOMQuad, PaintRequest, Text, Geolocation, RTCDtlsTransport, XSLTProcessor, PerformanceNavigation, NodeIterator, SVGAnimatedBoolean, HTMLLegendElement, CSSRule, Crypto, SVGFETurbulenceElement, XMLSerializer, CacheStorage, SourceBuffer, SVGStopElement, SVGFEMergeElement, DataTransfer, ScrollAreaEvent, SVGFEDiffuseLightingElement, MediaKeyStatusMap, XMLHttpRequest, SVGAnimatedLengthList, IDBDatabase, SVGFEFloodElement, MediaStreamEvent, SVGGraphicsElement, ErrorEvent, Response, KeyboardEvent, SubmitEvent, SVGFEMorphologyElement, MimeTypeArray, HTMLUnknownElement, WebGLBuffer, AbortSignal, Element, SVGElement, MediaError, DOMTokenList, HTMLTrackElement, PerformanceServerTiming, Credential, PageTransitionEvent, Attr, PermissionStatus, IDBVersionChangeEvent, HTMLHeadingElement, FileSystemDirectoryEntry, OfflineAudioContext, AnimationTimeline, CSSMozDocumentRule, SVGMatrix, HTMLTableCaptionElement, SVGMetadataElement, SVGFEImageElement, EventSource, SVGFEFuncAElement, Blob, VRFrameData, HTMLMediaElement, MediaMetadata, SVGRect, BarProp, FocusEvent, SVGAngle, PerformanceEventTiming, WebGLShader, HTMLProgressElement, PublicKeyCredential, IntersectionObserver, IDBCursorWithValue, SVGLinearGradientElement, ScreenOrientation, PushSubscriptionOptions, HTMLImageElement, IIRFilterNode, ConstantSourceNode, IDBFileHandle, TextEncoder, PopupBlockedEvent, DOMPointReadOnly, MediaStream, AuthenticatorResponse, IDBIndex, AnimationEvent, TextTrackCue, webkitURL, HTMLPictureElement, CDATASection, ProcessingInstruction, ResizeObserver, IdleDeadline, DOMRequest, CustomElementRegistry, FileList, WaveShaperNode, XPathResult, MediaKeyMessageEvent, MathMLElement, HTMLFrameElement, SVGMarkerElement, VREyeParameters, RTCRtpReceiver, VRDisplayEvent, FontFaceSet, DocumentFragment, MediaSource, DOMStringMap, HTMLDetailsElement, SVGAnimatedNumberList, Path2D, CompositionEvent, SVGUseElement, StyleSheet, TextTrackList, HTMLTableCellElement, AbortController, AudioScheduledSourceNode, SourceBufferList, RTCPeerConnectionIceEvent, VRStageParameters, XMLHttpRequestEventTarget, FormData, SVGMaskElement, NodeList, DataTransferItemList, FileSystemEntry, IDBTransaction, HTMLSpanElement, TransitionEvent, HTMLTableRowElement, SVGFESpecularLightingElement, HTMLSlotElement, IDBObjectStore, DOMImplementation, CSSImportRule, SVGAnimatedLength, HTMLDListElement, FontFace, HTMLAnchorElement, SVGFEGaussianBlurElement, NodeFilter, WebGLTexture, DOMPoint, MessagePort, SVGAnimatedRect, MediaKeySystemAccess, WheelEvent, AudioDestinationNode, DOMRectReadOnly, IDBCursor, MediaElementAudioSourceNode, History, HTMLHtmlElement, HTMLTableElement, SVGTextContentElement, XMLHttpRequestUpload, IDBOpenDBRequest, MediaStreamTrackEvent, SVGSetElement, FormDataEvent, URLSearchParams, SVGAnimationElement, HTMLTemplateElement, HTMLParamElement, ElementInternals, Selection, SVGLineElement, HTMLScriptElement, MediaStreamTrack, CSSGroupingRule, ScriptProcessorNode, CSSSupportsRule, Range, SVGGeometryElement, MutationRecord, HTMLMenuElement, HTMLUListElement, HTMLTableColElement, HTMLFrameSetElement, SVGFEPointLightElement, CanvasRenderingContext2D, Clipboard, HTMLButtonElement, CSSKeyframesRule, ShadowRoot, SVGEllipseElement, IntersectionObserverEntry, SVGComponentTransferFunctionElement, mozRTCPeerConnection, CSS2Properties, WebGLUniformLocation, PeriodicWave, Gamepad, SVGClipPathElement, HTMLPreElement, SVGPathElement, DataTransferItem, HTMLFormElement, GainNode, SVGFEFuncBElement, RTCIceCandidate, SVGFETileElement, ServiceWorkerRegistration, RadioNodeList, SVGMPathElement, KeyEvent, PointerEvent, SVGFESpotLightElement, Worker, Location, RTCStatsReport, SVGAnimatedString, HTMLDirectoryElement, WebGLQuery, HTMLFormControlsCollection, AudioNode, CaretPosition, SVGStyleElement, HTMLDataListElement, SVGTextPositioningElement, SVGAnimatedInteger, Storage, AuthenticatorAssertionResponse, MimeType, DOMException, AnimationEffect, SVGTextPathElement, GeolocationPositionError, CSSNamespaceRule, SVGPoint, SVGFECompositeElement, SVGGradientElement, SVGAnimatedTransformList, MediaStreamAudioSourceNode, CSS, WebGLRenderbuffer, RTCDataChannelEvent, HTMLLIElement, TextTrackCueList, HTMLTitleElement, MutationObserver, Comment, BroadcastChannel, MediaSession, SVGFEComponentTransferElement, HTMLHRElement, HTMLTextAreaElement, HTMLMeterElement, SVGAnimatedAngle, MediaQueryListEvent, WebGL2RenderingContext, TextTrack, VTTCue, CloseEvent, SpeechSynthesisErrorEvent, Headers, BiquadFilterNode, AudioWorklet, IDBFileRequest, MouseEvent, WebGLContextEvent, IDBFactory, NamedNodeMap, SVGSVGElement, SVGRadialGradientElement, TextMetrics, SVGAnimateMotionElement, PushSubscription, CryptoKey, CredentialsContainer, ClipboardEvent, PerformancePaintTiming, PushManager, OfflineAudioCompletionEvent, DOMStringList, SVGPatternElement, RTCCertificate, DocumentType, Request, DocumentTimeline, SVGTSpanElement, SVGTitleElement, StyleSheetList, RTCRtpSender, GamepadButton, ConvolverNode, HTMLAudioElement, HTMLDataElement, AudioProcessingEvent, StaticRange, SVGAnimateTransformElement, AudioBufferSourceNode, SVGAElement, WebGLActiveInfo, XPathEvaluator, SVGFEConvolveMatrixElement, Navigator, SVGRectElement, URL, CSSKeyframeRule, console, SVGAnimatedEnumeration, AnalyserNode, HTMLInputElement, SVGStringList, SVGFEOffsetElement, PannerNode, File, CSSStyleRule, AudioParam, AudioWorkletNode, SpeechSynthesisUtterance, HTMLFontElement, AudioBuffer, SecurityPolicyViolationEvent, DOMParser, CanvasCaptureMediaStream, PerformanceObserverEntryList, SVGNumber, FileSystemDirectoryReader, GeolocationPosition, BaseAudioContext, CSSStyleSheet, SVGFilterElement, HTMLHeadElement, SVGTransform, MediaCapabilitiesInfo, CSSRuleList, SVGFEMergeNodeElement, HTMLAreaElement, SVGTextElement, SVGSwitchElement, Permissions, AnimationPlaybackEvent, CanvasGradient, VTTRegion, MediaEncryptedEvent, WebGLSampler, CSSPageRule, AudioContext, SVGPathSegList, FileReader, SVGPolylineElement, CSSCounterStyleRule, CSSConditionRule, BlobEvent, DragEvent, ImageBitmapRenderingContext, SVGViewElement, SVGFEBlendElement, PluginArray, SVGFEDisplacementMapElement, HTMLOptGroupElement, HTMLDivElement, PromiseRejectionEvent, CSSStyleDeclaration, SVGAnimateElement, CanvasPattern, WebGLProgram, TrackEvent, SpeechSynthesisEvent, Notification, HTMLBodyElement, HTMLStyleElement, SVGFEFuncGElement, StorageManager, Image, FontFaceSetLoadEvent, SVGPointList, StereoPannerNode, OscillatorNode, SVGForeignObjectElement, Function, Object, eval, EventTarget, Window, close, stop, focus, blur, open, alert, confirm, prompt, print, postMessage, captureEvents, releaseEvents, getSelection, getComputedStyle, matchMedia, moveTo, moveBy, resizeTo, resizeBy, scroll, scrollTo, scrollBy, requestAnimationFrame, cancelAnimationFrame, getDefaultComputedStyle, scrollByLines, scrollByPages, sizeToContent, updateCommands, find, dump, setResizable, requestIdleCallback, cancelIdleCallback, reportError, btoa, atob, setTimeout, clearTimeout, setInterval, clearInterval, queueMicrotask, createImageBitmap, structuredClone, fetch, self, name, history, customElements, locationbar, menubar, personalbar, scrollbars, statusbar, toolbar, status, closed, event, frames, length, opener, parent, frameElement, navigator, clientInformation, external, applicationCache, screen, innerWidth, innerHeight, scrollX, pageXOffset, scrollY, pageYOffset, screenLeft, screenTop, screenX, screenY, outerWidth, outerHeight, performance, mozInnerScreenX, mozInnerScreenY, devicePixelRatio, scrollMaxX, scrollMaxY, fullScreen, ondevicemotion, ondeviceorientation, onabsolutedeviceorientation, content, InstallTrigger, sidebar, onvrdisplayconnect, onvrdisplaydisconnect, onvrdisplayactivate, onvrdisplaydeactivate, onvrdisplaypresentchange, visualViewport, crypto, onabort, onblur, onfocus, onauxclick, onbeforeinput, oncanplay, oncanplaythrough, onchange, onclick, onclose, oncontextmenu, oncuechange, ondblclick, ondrag, ondragend, ondragenter, ondragexit, ondragleave, ondragover, ondragstart, ondrop, ondurationchange, onemptied, onended, onformdata, oninput, oninvalid, onkeydown, onkeypress, onkeyup, onload, onloadeddata, onloadedmetadata, onloadend, onloadstart, onmousedown, onmouseenter, onmouseleave, onmousemove, onmouseout, onmouseover, onmouseup, onwheel, onpause, onplay, onplaying, onprogress, onratechange, onreset, onresize, onscroll, onsecuritypolicyviolation, onseeked, onseeking, onselect, onslotchange, onstalled, onsubmit, onsuspend, ontimeupdate, onvolumechange, onwaiting, onselectstart, onselectionchange, ontoggle, onpointercancel, onpointerdown, onpointerup, onpointermove, onpointerout, onpointerover, onpointerenter, onpointerleave, ongotpointercapture, onlostpointercapture, onmozfullscreenchange, onmozfullscreenerror, onanimationcancel, onanimationend, onanimationiteration, onanimationstart, ontransitioncancel, ontransitionend, ontransitionrun, ontransitionstart, onwebkitanimationend, onwebkitanimationiteration, onwebkitanimationstart, onwebkittransitionend, u2f, onerror, speechSynthesis, onafterprint, onbeforeprint, onbeforeunload, onhashchange, onlanguagechange, onmessage, onmessageerror, onoffline, ononline, onpagehide, onpageshow, onpopstate, onrejectionhandled, onstorage, onunhandledrejection, onunload, ongamepadconnected, ongamepaddisconnected, localStorage, origin, crossOriginIsolated, isSecureContext, indexedDB, caches, sessionStorage, window, document, location, top, netscape, Node, Document, HTMLDocument, EventCounts, Map, Event`,
		cssKeys: `alignContent, align-content, alignItems, align-items, alignSelf, align-self, aspectRatio, aspect-ratio, backfaceVisibility, backface-visibility, borderCollapse, border-collapse, borderImageRepeat, border-image-repeat, boxDecorationBreak, box-decoration-break, boxSizing, box-sizing, breakInside, break-inside, captionSide, caption-side, clear, colorAdjust, color-adjust, colorInterpolation, color-interpolation, colorInterpolationFilters, color-interpolation-filters, columnCount, column-count, columnFill, column-fill, columnSpan, column-span, contain, direction, display, dominantBaseline, dominant-baseline, emptyCells, empty-cells, flexDirection, flex-direction, flexWrap, flex-wrap, cssFloat, float, fontKerning, font-kerning, fontOpticalSizing, font-optical-sizing, fontSizeAdjust, font-size-adjust, fontStretch, font-stretch, fontStyle, font-style, fontSynthesis, font-synthesis, fontVariantCaps, font-variant-caps, fontVariantEastAsian, font-variant-east-asian, fontVariantLigatures, font-variant-ligatures, fontVariantNumeric, font-variant-numeric, fontVariantPosition, font-variant-position, fontWeight, font-weight, gridAutoFlow, grid-auto-flow, hyphens, imageOrientation, image-orientation, imageRendering, image-rendering, imeMode, ime-mode, isolation, justifyContent, justify-content, justifyItems, justify-items, justifySelf, justify-self, lineBreak, line-break, listStylePosition, list-style-position, maskType, mask-type, mixBlendMode, mix-blend-mode, MozBoxAlign, -moz-box-align, MozBoxDirection, -moz-box-direction, MozBoxOrient, -moz-box-orient, MozBoxPack, -moz-box-pack, MozFloatEdge, -moz-float-edge, MozForceBrokenImageIcon, -moz-force-broken-image-icon, MozOrient, -moz-orient, MozTextSizeAdjust, -moz-text-size-adjust, MozUserFocus, -moz-user-focus, MozUserInput, -moz-user-input, MozUserModify, -moz-user-modify, MozWindowDragging, -moz-window-dragging, objectFit, object-fit, offsetRotate, offset-rotate, outlineStyle, outline-style, overflowAnchor, overflow-anchor, overflowWrap, overflow-wrap, paintOrder, paint-order, pointerEvents, pointer-events, position, resize, rubyAlign, ruby-align, rubyPosition, ruby-position, scrollBehavior, scroll-behavior, scrollSnapAlign, scroll-snap-align, scrollSnapType, scroll-snap-type, scrollbarWidth, scrollbar-width, shapeRendering, shape-rendering, strokeLinecap, stroke-linecap, strokeLinejoin, stroke-linejoin, tableLayout, table-layout, textAlign, text-align, textAlignLast, text-align-last, textAnchor, text-anchor, textCombineUpright, text-combine-upright, textDecorationLine, text-decoration-line, textDecorationSkipInk, text-decoration-skip-ink, textDecorationStyle, text-decoration-style, textEmphasisPosition, text-emphasis-position, textJustify, text-justify, textOrientation, text-orientation, textRendering, text-rendering, textTransform, text-transform, textUnderlinePosition, text-underline-position, touchAction, touch-action, transformBox, transform-box, transformStyle, transform-style, unicodeBidi, unicode-bidi, userSelect, user-select, vectorEffect, vector-effect, visibility, webkitLineClamp, WebkitLineClamp, -webkit-line-clamp, whiteSpace, white-space, wordBreak, word-break, writingMode, writing-mode, zIndex, z-index, appearance, breakAfter, break-after, breakBefore, break-before, clipRule, clip-rule, fillRule, fill-rule, fillOpacity, fill-opacity, strokeOpacity, stroke-opacity, MozBoxOrdinalGroup, -moz-box-ordinal-group, order, flexGrow, flex-grow, flexShrink, flex-shrink, MozBoxFlex, -moz-box-flex, strokeMiterlimit, stroke-miterlimit, overflowBlock, overflow-block, overflowInline, overflow-inline, overflowX, overflow-x, overflowY, overflow-y, overscrollBehaviorBlock, overscroll-behavior-block, overscrollBehaviorInline, overscroll-behavior-inline, overscrollBehaviorX, overscroll-behavior-x, overscrollBehaviorY, overscroll-behavior-y, floodOpacity, flood-opacity, opacity, shapeImageThreshold, shape-image-threshold, stopOpacity, stop-opacity, borderBlockEndStyle, border-block-end-style, borderBlockStartStyle, border-block-start-style, borderBottomStyle, border-bottom-style, borderInlineEndStyle, border-inline-end-style, borderInlineStartStyle, border-inline-start-style, borderLeftStyle, border-left-style, borderRightStyle, border-right-style, borderTopStyle, border-top-style, columnRuleStyle, column-rule-style, accentColor, accent-color, animationDelay, animation-delay, animationDirection, animation-direction, animationDuration, animation-duration, animationFillMode, animation-fill-mode, animationIterationCount, animation-iteration-count, animationName, animation-name, animationPlayState, animation-play-state, animationTimingFunction, animation-timing-function, backgroundAttachment, background-attachment, backgroundBlendMode, background-blend-mode, backgroundClip, background-clip, backgroundImage, background-image, backgroundOrigin, background-origin, backgroundPositionX, background-position-x, backgroundPositionY, background-position-y, backgroundRepeat, background-repeat, backgroundSize, background-size, borderImageOutset, border-image-outset, borderImageSlice, border-image-slice, borderImageWidth, border-image-width, borderSpacing, border-spacing, boxShadow, box-shadow, caretColor, caret-color, clipPath, clip-path, color, columnWidth, column-width, content, counterIncrement, counter-increment, cursor, filter, flexBasis, flex-basis, fontFamily, font-family, fontFeatureSettings, font-feature-settings, fontLanguageOverride, font-language-override, fontSize, font-size, fontVariantAlternates, font-variant-alternates, fontVariationSettings, font-variation-settings, gridTemplateAreas, grid-template-areas, letterSpacing, letter-spacing, lineHeight, line-height, listStyleType, list-style-type, maskClip, mask-clip, maskComposite, mask-composite, maskImage, mask-image, maskMode, mask-mode, maskOrigin, mask-origin, maskPositionX, mask-position-x, maskPositionY, mask-position-y, maskRepeat, mask-repeat, maskSize, mask-size, offsetAnchor, offset-anchor, offsetPath, offset-path, perspective, quotes, rotate, scale, scrollbarColor, scrollbar-color, shapeOutside, shape-outside, strokeDasharray, stroke-dasharray, strokeDashoffset, stroke-dashoffset, strokeWidth, stroke-width, tabSize, tab-size, textDecorationThickness, text-decoration-thickness, textEmphasisStyle, text-emphasis-style, textOverflow, text-overflow, textShadow, text-shadow, transitionDelay, transition-delay, transitionDuration, transition-duration, transitionProperty, transition-property, transitionTimingFunction, transition-timing-function, translate, verticalAlign, vertical-align, willChange, will-change, wordSpacing, word-spacing, clip, MozImageRegion, -moz-image-region, objectPosition, object-position, perspectiveOrigin, perspective-origin, fill, stroke, transformOrigin, transform-origin, counterReset, counter-reset, counterSet, counter-set, gridTemplateColumns, grid-template-columns, gridTemplateRows, grid-template-rows, borderImageSource, border-image-source, listStyleImage, list-style-image, gridAutoColumns, grid-auto-columns, gridAutoRows, grid-auto-rows, transform, columnGap, column-gap, rowGap, row-gap, markerEnd, marker-end, markerMid, marker-mid, markerStart, marker-start, gridColumnEnd, grid-column-end, gridColumnStart, grid-column-start, gridRowEnd, grid-row-end, gridRowStart, grid-row-start, maxBlockSize, max-block-size, maxHeight, max-height, maxInlineSize, max-inline-size, maxWidth, max-width, cx, cy, offsetDistance, offset-distance, textIndent, text-indent, x, y, borderBottomLeftRadius, border-bottom-left-radius, borderBottomRightRadius, border-bottom-right-radius, borderEndEndRadius, border-end-end-radius, borderEndStartRadius, border-end-start-radius, borderStartEndRadius, border-start-end-radius, borderStartStartRadius, border-start-start-radius, borderTopLeftRadius, border-top-left-radius, borderTopRightRadius, border-top-right-radius, blockSize, block-size, height, inlineSize, inline-size, minBlockSize, min-block-size, minHeight, min-height, minInlineSize, min-inline-size, minWidth, min-width, width, outlineOffset, outline-offset, scrollMarginBlockEnd, scroll-margin-block-end, scrollMarginBlockStart, scroll-margin-block-start, scrollMarginBottom, scroll-margin-bottom, scrollMarginInlineEnd, scroll-margin-inline-end, scrollMarginInlineStart, scroll-margin-inline-start, scrollMarginLeft, scroll-margin-left, scrollMarginRight, scroll-margin-right, scrollMarginTop, scroll-margin-top, paddingBlockEnd, padding-block-end, paddingBlockStart, padding-block-start, paddingBottom, padding-bottom, paddingInlineEnd, padding-inline-end, paddingInlineStart, padding-inline-start, paddingLeft, padding-left, paddingRight, padding-right, paddingTop, padding-top, r, shapeMargin, shape-margin, rx, ry, scrollPaddingBlockEnd, scroll-padding-block-end, scrollPaddingBlockStart, scroll-padding-block-start, scrollPaddingBottom, scroll-padding-bottom, scrollPaddingInlineEnd, scroll-padding-inline-end, scrollPaddingInlineStart, scroll-padding-inline-start, scrollPaddingLeft, scroll-padding-left, scrollPaddingRight, scroll-padding-right, scrollPaddingTop, scroll-padding-top, borderBlockEndWidth, border-block-end-width, borderBlockStartWidth, border-block-start-width, borderBottomWidth, border-bottom-width, borderInlineEndWidth, border-inline-end-width, borderInlineStartWidth, border-inline-start-width, borderLeftWidth, border-left-width, borderRightWidth, border-right-width, borderTopWidth, border-top-width, columnRuleWidth, column-rule-width, outlineWidth, outline-width, webkitTextStrokeWidth, WebkitTextStrokeWidth, -webkit-text-stroke-width, bottom, insetBlockEnd, inset-block-end, insetBlockStart, inset-block-start, insetInlineEnd, inset-inline-end, insetInlineStart, inset-inline-start, left, marginBlockEnd, margin-block-end, marginBlockStart, margin-block-start, marginBottom, margin-bottom, marginInlineEnd, margin-inline-end, marginInlineStart, margin-inline-start, marginLeft, margin-left, marginRight, margin-right, marginTop, margin-top, right, textUnderlineOffset, text-underline-offset, top, backgroundColor, background-color, borderBlockEndColor, border-block-end-color, borderBlockStartColor, border-block-start-color, borderBottomColor, border-bottom-color, borderInlineEndColor, border-inline-end-color, borderInlineStartColor, border-inline-start-color, borderLeftColor, border-left-color, borderRightColor, border-right-color, borderTopColor, border-top-color, columnRuleColor, column-rule-color, floodColor, flood-color, lightingColor, lighting-color, outlineColor, outline-color, stopColor, stop-color, textDecorationColor, text-decoration-color, textEmphasisColor, text-emphasis-color, webkitTextFillColor, WebkitTextFillColor, -webkit-text-fill-color, webkitTextStrokeColor, WebkitTextStrokeColor, -webkit-text-stroke-color, background, backgroundPosition, background-position, borderColor, border-color, borderStyle, border-style, borderWidth, border-width, borderTop, border-top, borderRight, border-right, borderBottom, border-bottom, borderLeft, border-left, borderBlockStart, border-block-start, borderBlockEnd, border-block-end, borderInlineStart, border-inline-start, borderInlineEnd, border-inline-end, border, borderRadius, border-radius, borderImage, border-image, borderBlockWidth, border-block-width, borderBlockStyle, border-block-style, borderBlockColor, border-block-color, borderInlineWidth, border-inline-width, borderInlineStyle, border-inline-style, borderInlineColor, border-inline-color, borderBlock, border-block, borderInline, border-inline, overflow, transition, animation, overscrollBehavior, overscroll-behavior, pageBreakBefore, page-break-before, pageBreakAfter, page-break-after, pageBreakInside, page-break-inside, offset, columns, columnRule, column-rule, font, fontVariant, font-variant, marker, textEmphasis, text-emphasis, webkitTextStroke, WebkitTextStroke, -webkit-text-stroke, listStyle, list-style, margin, marginBlock, margin-block, marginInline, margin-inline, scrollMargin, scroll-margin, scrollMarginBlock, scroll-margin-block, scrollMarginInline, scroll-margin-inline, outline, padding, paddingBlock, padding-block, paddingInline, padding-inline, scrollPadding, scroll-padding, scrollPaddingBlock, scroll-padding-block, scrollPaddingInline, scroll-padding-inline, flexFlow, flex-flow, flex, gap, gridRow, grid-row, gridColumn, grid-column, gridArea, grid-area, gridTemplate, grid-template, grid, placeContent, place-content, placeSelf, place-self, placeItems, place-items, inset, insetBlock, inset-block, insetInline, inset-inline, mask, maskPosition, mask-position, textDecoration, text-decoration, all, webkitBackgroundClip, WebkitBackgroundClip, -webkit-background-clip, webkitBackgroundOrigin, WebkitBackgroundOrigin, -webkit-background-origin, webkitBackgroundSize, WebkitBackgroundSize, -webkit-background-size, MozBorderStartColor, -moz-border-start-color, MozBorderStartStyle, -moz-border-start-style, MozBorderStartWidth, -moz-border-start-width, MozBorderEndColor, -moz-border-end-color, MozBorderEndStyle, -moz-border-end-style, MozBorderEndWidth, -moz-border-end-width, webkitBorderTopLeftRadius, WebkitBorderTopLeftRadius, -webkit-border-top-left-radius, webkitBorderTopRightRadius, WebkitBorderTopRightRadius, -webkit-border-top-right-radius, webkitBorderBottomRightRadius, WebkitBorderBottomRightRadius, -webkit-border-bottom-right-radius, webkitBorderBottomLeftRadius, WebkitBorderBottomLeftRadius, -webkit-border-bottom-left-radius, MozTransitionDuration, -moz-transition-duration, webkitTransitionDuration, WebkitTransitionDuration, -webkit-transition-duration, MozTransitionTimingFunction, -moz-transition-timing-function, webkitTransitionTimingFunction, WebkitTransitionTimingFunction, -webkit-transition-timing-function, MozTransitionProperty, -moz-transition-property, webkitTransitionProperty, WebkitTransitionProperty, -webkit-transition-property, MozTransitionDelay, -moz-transition-delay, webkitTransitionDelay, WebkitTransitionDelay, -webkit-transition-delay, MozAnimationName, -moz-animation-name, webkitAnimationName, WebkitAnimationName, -webkit-animation-name, MozAnimationDuration, -moz-animation-duration, webkitAnimationDuration, WebkitAnimationDuration, -webkit-animation-duration, MozAnimationTimingFunction, -moz-animation-timing-function, webkitAnimationTimingFunction, WebkitAnimationTimingFunction, -webkit-animation-timing-function, MozAnimationIterationCount, -moz-animation-iteration-count, webkitAnimationIterationCount, WebkitAnimationIterationCount, -webkit-animation-iteration-count, MozAnimationDirection, -moz-animation-direction, webkitAnimationDirection, WebkitAnimationDirection, -webkit-animation-direction, MozAnimationPlayState, -moz-animation-play-state, webkitAnimationPlayState, WebkitAnimationPlayState, -webkit-animation-play-state, MozAnimationFillMode, -moz-animation-fill-mode, webkitAnimationFillMode, WebkitAnimationFillMode, -webkit-animation-fill-mode, MozAnimationDelay, -moz-animation-delay, webkitAnimationDelay, WebkitAnimationDelay, -webkit-animation-delay, MozTransform, -moz-transform, webkitTransform, WebkitTransform, -webkit-transform, MozPerspective, -moz-perspective, webkitPerspective, WebkitPerspective, -webkit-perspective, MozPerspectiveOrigin, -moz-perspective-origin, webkitPerspectiveOrigin, WebkitPerspectiveOrigin, -webkit-perspective-origin, MozBackfaceVisibility, -moz-backface-visibility, webkitBackfaceVisibility, WebkitBackfaceVisibility, -webkit-backface-visibility, MozTransformStyle, -moz-transform-style, webkitTransformStyle, WebkitTransformStyle, -webkit-transform-style, MozTransformOrigin, -moz-transform-origin, webkitTransformOrigin, WebkitTransformOrigin, -webkit-transform-origin, MozAppearance, -moz-appearance, webkitAppearance, WebkitAppearance, -webkit-appearance, webkitBoxShadow, WebkitBoxShadow, -webkit-box-shadow, webkitFilter, WebkitFilter, -webkit-filter, MozFontFeatureSettings, -moz-font-feature-settings, MozFontLanguageOverride, -moz-font-language-override, MozHyphens, -moz-hyphens, webkitTextSizeAdjust, WebkitTextSizeAdjust, -webkit-text-size-adjust, wordWrap, word-wrap, MozTabSize, -moz-tab-size, MozMarginStart, -moz-margin-start, MozMarginEnd, -moz-margin-end, MozPaddingStart, -moz-padding-start, MozPaddingEnd, -moz-padding-end, webkitFlexDirection, WebkitFlexDirection, -webkit-flex-direction, webkitFlexWrap, WebkitFlexWrap, -webkit-flex-wrap, webkitJustifyContent, WebkitJustifyContent, -webkit-justify-content, webkitAlignContent, WebkitAlignContent, -webkit-align-content, webkitAlignItems, WebkitAlignItems, -webkit-align-items, webkitFlexGrow, WebkitFlexGrow, -webkit-flex-grow, webkitFlexShrink, WebkitFlexShrink, -webkit-flex-shrink, webkitAlignSelf, WebkitAlignSelf, -webkit-align-self, webkitOrder, WebkitOrder, -webkit-order, webkitFlexBasis, WebkitFlexBasis, -webkit-flex-basis, MozBoxSizing, -moz-box-sizing, webkitBoxSizing, WebkitBoxSizing, -webkit-box-sizing, gridColumnGap, grid-column-gap, gridRowGap, grid-row-gap, webkitMaskRepeat, WebkitMaskRepeat, -webkit-mask-repeat, webkitMaskPositionX, WebkitMaskPositionX, -webkit-mask-position-x, webkitMaskPositionY, WebkitMaskPositionY, -webkit-mask-position-y, webkitMaskClip, WebkitMaskClip, -webkit-mask-clip, webkitMaskOrigin, WebkitMaskOrigin, -webkit-mask-origin, webkitMaskSize, WebkitMaskSize, -webkit-mask-size, webkitMaskComposite, WebkitMaskComposite, -webkit-mask-composite, webkitMaskImage, WebkitMaskImage, -webkit-mask-image, MozUserSelect, -moz-user-select, webkitUserSelect, WebkitUserSelect, -webkit-user-select, webkitBoxAlign, WebkitBoxAlign, -webkit-box-align, webkitBoxDirection, WebkitBoxDirection, -webkit-box-direction, webkitBoxFlex, WebkitBoxFlex, -webkit-box-flex, webkitBoxOrient, WebkitBoxOrient, -webkit-box-orient, webkitBoxPack, WebkitBoxPack, -webkit-box-pack, webkitBoxOrdinalGroup, WebkitBoxOrdinalGroup, -webkit-box-ordinal-group, MozBorderStart, -moz-border-start, MozBorderEnd, -moz-border-end, webkitBorderRadius, WebkitBorderRadius, -webkit-border-radius, MozBorderImage, -moz-border-image, webkitBorderImage, WebkitBorderImage, -webkit-border-image, MozTransition, -moz-transition, webkitTransition, WebkitTransition, -webkit-transition, MozAnimation, -moz-animation, webkitAnimation, WebkitAnimation, -webkit-animation, webkitFlexFlow, WebkitFlexFlow, -webkit-flex-flow, webkitFlex, WebkitFlex, -webkit-flex, gridGap, grid-gap, webkitMask, WebkitMask, -webkit-mask, webkitMaskPosition, WebkitMaskPosition, -webkit-mask-position, constructor`,
		jsKeys: "Array.at, Array.concat, Array.copyWithin, Array.entries, Array.every, Array.fill, Array.filter, Array.find, Array.findIndex, Array.flat, Array.flatMap, Array.forEach, Array.from, Array.includes, Array.indexOf, Array.isArray, Array.join, Array.keys, Array.lastIndexOf, Array.map, Array.of, Array.pop, Array.push, Array.reduce, Array.reduceRight, Array.reverse, Array.shift, Array.slice, Array.some, Array.sort, Array.splice, Array.toLocaleString, Array.toString, Array.unshift, Array.values, Atomics.add, Atomics.and, Atomics.compareExchange, Atomics.exchange, Atomics.isLockFree, Atomics.load, Atomics.notify, Atomics.or, Atomics.store, Atomics.sub, Atomics.wait, Atomics.wake, Atomics.xor, BigInt.asIntN, BigInt.asUintN, BigInt.toLocaleString, BigInt.toString, BigInt.valueOf, Boolean.toString, Boolean.valueOf, Date.UTC, Date.getDate, Date.getDay, Date.getFullYear, Date.getHours, Date.getMilliseconds, Date.getMinutes, Date.getMonth, Date.getSeconds, Date.getTime, Date.getTimezoneOffset, Date.getUTCDate, Date.getUTCDay, Date.getUTCFullYear, Date.getUTCHours, Date.getUTCMilliseconds, Date.getUTCMinutes, Date.getUTCMonth, Date.getUTCSeconds, Date.getYear, Date.now, Date.parse, Date.setDate, Date.setFullYear, Date.setHours, Date.setMilliseconds, Date.setMinutes, Date.setMonth, Date.setSeconds, Date.setTime, Date.setUTCDate, Date.setUTCFullYear, Date.setUTCHours, Date.setUTCMilliseconds, Date.setUTCMinutes, Date.setUTCMonth, Date.setUTCSeconds, Date.setYear, Date.toDateString, Date.toGMTString, Date.toISOString, Date.toJSON, Date.toLocaleDateString, Date.toLocaleString, Date.toLocaleTimeString, Date.toString, Date.toTimeString, Date.toUTCString, Date.valueOf, Document.URL, Document.activeElement, Document.adoptNode, Document.alinkColor, Document.all, Document.anchors, Document.append, Document.applets, Document.bgColor, Document.body, Document.captureEvents, Document.caretPositionFromPoint, Document.characterSet, Document.charset, Document.childElementCount, Document.children, Document.clear, Document.close, Document.compatMode, Document.contentType, Document.cookie, Document.createAttribute, Document.createAttributeNS, Document.createCDATASection, Document.createComment, Document.createDocumentFragment, Document.createElement, Document.createElementNS, Document.createEvent, Document.createExpression, Document.createNSResolver, Document.createNodeIterator, Document.createProcessingInstruction, Document.createRange, Document.createTextNode, Document.createTreeWalker, Document.currentScript, Document.defaultView, Document.designMode, Document.dir, Document.doctype, Document.documentElement, Document.documentURI, Document.domain, Document.elementFromPoint, Document.elementsFromPoint, Document.embeds, Document.enableStyleSheetsForSet, Document.evaluate, Document.execCommand, Document.exitFullscreen, Document.exitPointerLock, Document.fgColor, Document.firstElementChild, Document.fonts, Document.forms, Document.fullscreen, Document.fullscreenElement, Document.fullscreenEnabled, Document.getAnimations, Document.getElementById, Document.getElementsByClassName, Document.getElementsByName, Document.getElementsByTagName, Document.getElementsByTagNameNS, Document.getSelection, Document.hasFocus, Document.hasStorageAccess, Document.head, Document.hidden, Document.images, Document.implementation, Document.importNode, Document.inputEncoding, Document.lastElementChild, Document.lastModified, Document.lastStyleSheetSet, Document.linkColor, Document.links, Document.mozCancelFullScreen, Document.mozFullScreen, Document.mozFullScreenElement, Document.mozFullScreenEnabled, Document.mozSetImageElement, Document.onabort, Document.onafterscriptexecute, Document.onanimationcancel, Document.onanimationend, Document.onanimationiteration, Document.onanimationstart, Document.onauxclick, Document.onbeforeinput, Document.onbeforescriptexecute, Document.onblur, Document.oncanplay, Document.oncanplaythrough, Document.onchange, Document.onclick, Document.onclose, Document.oncontextmenu, Document.oncopy, Document.oncuechange, Document.oncut, Document.ondblclick, Document.ondrag, Document.ondragend, Document.ondragenter, Document.ondragexit, Document.ondragleave, Document.ondragover, Document.ondragstart, Document.ondrop, Document.ondurationchange, Document.onemptied, Document.onended, Document.onerror, Document.onfocus, Document.onformdata, Document.onfullscreenchange, Document.onfullscreenerror, Document.ongotpointercapture, Document.oninput, Document.oninvalid, Document.onkeydown, Document.onkeypress, Document.onkeyup, Document.onload, Document.onloadeddata, Document.onloadedmetadata, Document.onloadend, Document.onloadstart, Document.onlostpointercapture, Document.onmousedown, Document.onmouseenter, Document.onmouseleave, Document.onmousemove, Document.onmouseout, Document.onmouseover, Document.onmouseup, Document.onmozfullscreenchange, Document.onmozfullscreenerror, Document.onpaste, Document.onpause, Document.onplay, Document.onplaying, Document.onpointercancel, Document.onpointerdown, Document.onpointerenter, Document.onpointerleave, Document.onpointerlockchange, Document.onpointerlockerror, Document.onpointermove, Document.onpointerout, Document.onpointerover, Document.onpointerup, Document.onprogress, Document.onratechange, Document.onreadystatechange, Document.onreset, Document.onresize, Document.onscroll, Document.onsecuritypolicyviolation, Document.onseeked, Document.onseeking, Document.onselect, Document.onselectionchange, Document.onselectstart, Document.onslotchange, Document.onstalled, Document.onsubmit, Document.onsuspend, Document.ontimeupdate, Document.ontoggle, Document.ontransitioncancel, Document.ontransitionend, Document.ontransitionrun, Document.ontransitionstart, Document.onvisibilitychange, Document.onvolumechange, Document.onwaiting, Document.onwebkitanimationend, Document.onwebkitanimationiteration, Document.onwebkitanimationstart, Document.onwebkittransitionend, Document.onwheel, Document.open, Document.plugins, Document.pointerLockElement, Document.preferredStyleSheetSet, Document.prepend, Document.queryCommandEnabled, Document.queryCommandIndeterm, Document.queryCommandState, Document.queryCommandSupported, Document.queryCommandValue, Document.querySelector, Document.querySelectorAll, Document.readyState, Document.referrer, Document.releaseCapture, Document.releaseEvents, Document.replaceChildren, Document.requestStorageAccess, Document.rootElement, Document.scripts, Document.scrollingElement, Document.selectedStyleSheetSet, Document.styleSheetSets, Document.styleSheets, Document.timeline, Document.title, Document.visibilityState, Document.vlinkColor, Document.write, Document.writeln, Element.after, Element.animate, Element.append, Element.assignedSlot, Element.attachShadow, Element.attributes, Element.before, Element.childElementCount, Element.children, Element.classList, Element.className, Element.clientHeight, Element.clientLeft, Element.clientTop, Element.clientWidth, Element.closest, Element.firstElementChild, Element.getAnimations, Element.getAttribute, Element.getAttributeNS, Element.getAttributeNames, Element.getAttributeNode, Element.getAttributeNodeNS, Element.getBoundingClientRect, Element.getClientRects, Element.getElementsByClassName, Element.getElementsByTagName, Element.getElementsByTagNameNS, Element.hasAttribute, Element.hasAttributeNS, Element.hasAttributes, Element.hasPointerCapture, Element.id, Element.innerHTML, Element.insertAdjacentElement, Element.insertAdjacentHTML, Element.insertAdjacentText, Element.lastElementChild, Element.localName, Element.matches, Element.mozMatchesSelector, Element.mozRequestFullScreen, Element.namespaceURI, Element.nextElementSibling, Element.onfullscreenchange, Element.onfullscreenerror, Element.outerHTML, Element.part, Element.prefix, Element.prepend, Element.previousElementSibling, Element.querySelector, Element.querySelectorAll, Element.releaseCapture, Element.releasePointerCapture, Element.remove, Element.removeAttribute, Element.removeAttributeNS, Element.removeAttributeNode, Element.replaceChildren, Element.replaceWith, Element.requestFullscreen, Element.requestPointerLock, Element.scroll, Element.scrollBy, Element.scrollHeight, Element.scrollIntoView, Element.scrollLeft, Element.scrollLeftMax, Element.scrollTo, Element.scrollTop, Element.scrollTopMax, Element.scrollWidth, Element.setAttribute, Element.setAttributeNS, Element.setAttributeNode, Element.setAttributeNodeNS, Element.setCapture, Element.setPointerCapture, Element.shadowRoot, Element.slot, Element.tagName, Element.toggleAttribute, Element.webkitMatchesSelector, Error.message, Error.stack, Error.toString, Function.apply, Function.bind, Function.call, Function.toString, Intl.Collator, Intl.DateTimeFormat, Intl.DisplayNames, Intl.ListFormat, Intl.Locale, Intl.NumberFormat, Intl.PluralRules, Intl.RelativeTimeFormat, Intl.getCanonicalLocales, Intl.supportedValuesOf, JSON.parse, JSON.stringify, Map.clear, Map.delete, Map.entries, Map.forEach, Map.get, Map.has, Map.keys, Map.set, Map.size, Map.values, Math.E, Math.LN10, Math.LN2, Math.LOG10E, Math.LOG2E, Math.PI, Math.SQRT1_2, Math.SQRT2, Math.abs, Math.acos, Math.acosh, Math.asin, Math.asinh, Math.atan, Math.atan2, Math.atanh, Math.cbrt, Math.ceil, Math.clz32, Math.cos, Math.cosh, Math.exp, Math.expm1, Math.floor, Math.fround, Math.hypot, Math.imul, Math.log, Math.log10, Math.log1p, Math.log2, Math.max, Math.min, Math.pow, Math.random, Math.round, Math.sign, Math.sin, Math.sinh, Math.sqrt, Math.tan, Math.tanh, Math.trunc, Number.EPSILON, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, Number.NEGATIVE_INFINITY, Number.NaN, Number.POSITIVE_INFINITY, Number.isFinite, Number.isInteger, Number.isNaN, Number.isSafeInteger, Number.parseFloat, Number.parseInt, Number.toExponential, Number.toFixed, Number.toLocaleString, Number.toPrecision, Number.toString, Number.valueOf, Object.__defineGetter__, Object.__defineSetter__, Object.__lookupGetter__, Object.__lookupSetter__, Object.__proto__, Object.assign, Object.create, Object.defineProperties, Object.defineProperty, Object.entries, Object.freeze, Object.fromEntries, Object.getOwnPropertyDescriptor, Object.getOwnPropertyDescriptors, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, Object.getPrototypeOf, Object.hasOwn, Object.hasOwnProperty, Object.is, Object.isExtensible, Object.isFrozen, Object.isPrototypeOf, Object.isSealed, Object.keys, Object.preventExtensions, Object.propertyIsEnumerable, Object.seal, Object.setPrototypeOf, Object.toLocaleString, Object.toString, Object.valueOf, Object.values, Promise.all, Promise.allSettled, Promise.any, Promise.catch, Promise.finally, Promise.race, Promise.reject, Promise.resolve, Promise.then, Proxy.revocable, Reflect.apply, Reflect.construct, Reflect.defineProperty, Reflect.deleteProperty, Reflect.get, Reflect.getOwnPropertyDescriptor, Reflect.getPrototypeOf, Reflect.has, Reflect.isExtensible, Reflect.ownKeys, Reflect.preventExtensions, Reflect.set, Reflect.setPrototypeOf, RegExp.$&, RegExp.$', RegExp.$+, RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7, RegExp.$8, RegExp.$9, RegExp.$_, RegExp.$`, RegExp.compile, RegExp.dotAll, RegExp.exec, RegExp.flags, RegExp.global, RegExp.hasIndices, RegExp.ignoreCase, RegExp.input, RegExp.lastMatch, RegExp.lastParen, RegExp.leftContext, RegExp.multiline, RegExp.rightContext, RegExp.source, RegExp.sticky, RegExp.test, RegExp.toString, RegExp.unicode, Set.add, Set.clear, Set.delete, Set.entries, Set.forEach, Set.has, Set.keys, Set.size, Set.values, String.anchor, String.at, String.big, String.blink, String.bold, String.charAt, String.charCodeAt, String.codePointAt, String.concat, String.endsWith, String.fixed, String.fontcolor, String.fontsize, String.fromCharCode, String.fromCodePoint, String.includes, String.indexOf, String.italics, String.lastIndexOf, String.link, String.localeCompare, String.match, String.matchAll, String.normalize, String.padEnd, String.padStart, String.raw, String.repeat, String.replace, String.replaceAll, String.search, String.slice, String.small, String.split, String.startsWith, String.strike, String.sub, String.substr, String.substring, String.sup, String.toLocaleLowerCase, String.toLocaleUpperCase, String.toLowerCase, String.toString, String.toUpperCase, String.trim, String.trimEnd, String.trimLeft, String.trimRight, String.trimStart, String.valueOf, Symbol.asyncIterator, Symbol.description, Symbol.for, Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator, Symbol.keyFor, Symbol.match, Symbol.matchAll, Symbol.replace, Symbol.search, Symbol.species, Symbol.split, Symbol.toPrimitive, Symbol.toString, Symbol.toStringTag, Symbol.unscopables, Symbol.valueOf, WeakMap.delete, WeakMap.get, WeakMap.has, WeakMap.set, WeakSet.add, WeakSet.delete, WeakSet.has, WebAssembly.CompileError, WebAssembly.Global, WebAssembly.Instance, WebAssembly.LinkError, WebAssembly.Memory, WebAssembly.Module, WebAssembly.RuntimeError, WebAssembly.Table, WebAssembly.compile, WebAssembly.compileStreaming, WebAssembly.instantiate, WebAssembly.instantiateStreaming, WebAssembly.validate"
	}
})

const getListDiff = ({oldList, newList, removeCamelCase = false} = {}) => {
	const oldSet = new Set(oldList)
	const newSet = new Set(newList)
	newList.forEach(x => oldSet.delete(x))
	oldList.forEach(x => newSet.delete(x))
	const camelCase = /[a-z][A-Z]/
	return {
		removed: !removeCamelCase ? [...oldSet] : [...oldSet].filter(key => !camelCase.test(key)),
		added: !removeCamelCase ? [...newSet] : [...newSet].filter(key => !camelCase.test(key))
	}
}

const getFeaturesBrowser = () => {
	const mathPI = 3.141592653589793
	const blink = (mathPI ** -100) == 1.9275814160560204e-50
	const gecko = (mathPI ** -100) == 1.9275814160560185e-50
	const browser = (
		blink ? 'Chrome' : gecko ? 'Firefox' : ''
	)
	return browser
}

const getEngineMaps = browser => {
	const geckoCSS = {
		'71': ['-moz-column-span'],
		'72': ['offset', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-rotate', 'rotate', 'scale', 'translate'],
		'73': ['overscroll-behavior-block', 'overscroll-behavior-inline'],
		'74-79': ['!-moz-stack-sizing', 'text-underline-position'],
		'80-88': ['appearance'],
		'89-90': ['!-moz-outline-radius', '!-moz-outline-radius-bottomleft', '!-moz-outline-radius-bottomright', '!-moz-outline-radius-topleft', '!-moz-outline-radius-topright', 'aspect-ratio'],
		'91': ['tab-size'],
		'92-94': ['accent-color']
	}

	const blinkCSS = {
		'76': ['backdrop-filter'],
		'77-80': ['overscroll-behavior-block', 'overscroll-behavior-inline'],
		'81': ['color-scheme', 'image-orientation'],
		'83': ['contain-intrinsic-size'],
		'84': ['appearance', 'ruby-position'],
		'85-86': ['content-visibility', 'counter-set', 'inherits', 'initial-value', 'page-orientation', 'syntax'],
		'87': ['ascent-override', 'border-block', 'border-block-color', 'border-block-style', 'border-block-width', 'border-inline', 'border-inline-color', 'border-inline-style', 'border-inline-width', 'descent-override', 'inset', 'inset-block', 'inset-block-end', 'inset-block-start', 'inset-inline', 'inset-inline-end', 'inset-inline-start', 'line-gap-override', 'margin-block', 'margin-inline', 'padding-block', 'padding-inline', 'text-decoration-thickness', 'text-underline-offset'],
		'88': ['aspect-ratio'],
		'89': ['border-end-end-radius', 'border-end-start-radius', 'border-start-end-radius', 'border-start-start-radius', 'forced-color-adjust'],
		'90': ['overflow-clip-margin'],
		'91': ['additive-symbols', 'fallback', 'negative', 'pad', 'prefix', 'range', 'speak-as', 'suffix', 'symbols', 'system'],
		'92': ['size-adjust'],
		'93': ['accent-color'],
		'94': ['scrollbar-gutter'],
		'95-96': ['app-region', 'contain-intrinsic-block-size', 'contain-intrinsic-height', 'contain-intrinsic-inline-size', 'contain-intrinsic-width'],
		'97': ['font-synthesis-small-caps', 'font-synthesis-style', 'font-synthesis-weight', 'font-synthesis']
	}

	const geckoWindow = {
		// disregard: 'reportError','onsecuritypolicyviolation','onslotchange'
		'71': ['MathMLElement', '!SVGZoomAndPan'],
		'72-73': ['!BatteryManager', 'FormDataEvent', 'Geolocation', 'GeolocationCoordinates', 'GeolocationPosition', 'GeolocationPositionError', '!mozPaintCount'],
		'74': ['FormDataEvent', '!uneval'],
		'75': ['AnimationTimeline', 'CSSAnimation', 'CSSTransition', 'DocumentTimeline', 'SubmitEvent'],
		'76-77': ['AudioParamMap', 'AudioWorklet', 'AudioWorkletNode', 'Worklet'],
		'78': ['Atomics'],
		'79-81': ['AggregateError', 'FinalizationRegistry'],
		'82': ['MediaMetadata', 'MediaSession', 'Sanitizer'],
		'83': ['MediaMetadata', 'MediaSession', '!Sanitizer'],
		'84': ['PerformancePaintTiming'],
		'85-86': ['PerformancePaintTiming', '!HTMLMenuItemElement', '!onshow'],
		'87': ['onbeforeinput'],
		'88': ['onbeforeinput', '!VisualViewport'],
		'89-92': ['!ondevicelight', '!ondeviceproximity', '!onuserproximity'],
		'93-94': ['ElementInternals']
	}

	const blinkWindow = {
		// disregard: EyeDropper
		'80': ['CompressionStream', 'DecompressionStream', 'FeaturePolicy', 'FragmentDirective', 'PeriodicSyncManager', 'VideoPlaybackQuality'],
		'81': ['SubmitEvent', 'XRHitTestResult', 'XRHitTestSource', 'XRRay', 'XRTransientInputHitTestResult', 'XRTransientInputHitTestSource'],
		'83': ['BarcodeDetector', 'XRDOMOverlayState', 'XRSystem'],
		'84': ['AnimationPlaybackEvent', 'AnimationTimeline', 'CSSAnimation', 'CSSTransition', 'DocumentTimeline', 'FinalizationRegistry',  'LayoutShiftAttribution', 'ResizeObserverSize', 'WakeLock', 'WakeLockSentinel', 'WeakRef', 'XRLayer'],
		'85': ['AggregateError', 'CSSPropertyRule', 'EventCounts', 'XRAnchor', 'XRAnchorSet'],
		'86': ['RTCEncodedAudioFrame', 'RTCEncodedVideoFrame'],
		'87': ['CookieChangeEvent', 'CookieStore', 'CookieStoreManager', 'Scheduling'],
		'88': ['Scheduling', '!BarcodeDetector'],
		'89': ['ReadableByteStreamController', 'ReadableStreamBYOBReader', 'ReadableStreamBYOBRequest', 'ReadableStreamDefaultController', 'XRWebGLBinding'],
		'90': ['AbstractRange', 'CustomStateSet', 'NavigatorUAData', 'XRCPUDepthInformation', 'XRDepthInformation', 'XRLightEstimate', 'XRLightProbe', 'XRWebGLDepthInformation'],
		'91': ['CSSCounterStyleRule',  'GravitySensor',  'NavigatorManagedData'],
		'92': ['CSSCounterStyleRule','!SharedArrayBuffer'],
		'93': ['WritableStreamDefaultController'],
		'94': ['AudioData', 'AudioDecoder', 'AudioEncoder', 'EncodedAudioChunk', 'EncodedVideoChunk', 'IdleDetector', 'ImageDecoder', 'ImageTrack', 'ImageTrackList', 'VideoColorSpace', 'VideoDecoder', 'VideoEncoder', 'VideoFrame', 'MediaStreamTrackGenerator', 'MediaStreamTrackProcessor', 'Profiler', 'VirtualKeyboard', 'DelegatedInkTrailPresenter', 'Ink', 'Scheduler', 'TaskController', 'TaskPriorityChangeEvent', 'TaskSignal', 'VirtualKeyboardGeometryChangeEvent'],
		'95-96': ['URLPattern'],
		'97': ['WebTransport', 'WebTransportBidirectionalStream', 'WebTransportDatagramDuplexStream', 'WebTransportError']
	}

	const blinkJS = {
		'76': ['Document.onsecuritypolicyviolation','Promise.allSettled'],
		'77': ['Document.onformdata','Document.onpointerrawupdate'],
		'78': ['Element.elementTiming'],
		'79': ['Document.onanimationend','Document.onanimationiteration','Document.onanimationstart','Document.ontransitionend'],
		'80': ['!Document.registerElement','!Element.createShadowRoot','!Element.getDestinationInsertionPoints'],
		'81': ['Document.onwebkitanimationend','Document.onwebkitanimationiteration','Document.onwebkitanimationstart','Document.onwebkittransitionend','Element.ariaAtomic','Element.ariaAutoComplete','Element.ariaBusy','Element.ariaChecked','Element.ariaColCount','Element.ariaColIndex','Element.ariaColSpan','Element.ariaCurrent','Element.ariaDisabled','Element.ariaExpanded','Element.ariaHasPopup','Element.ariaHidden','Element.ariaKeyShortcuts','Element.ariaLabel','Element.ariaLevel','Element.ariaLive','Element.ariaModal','Element.ariaMultiLine','Element.ariaMultiSelectable','Element.ariaOrientation','Element.ariaPlaceholder','Element.ariaPosInSet','Element.ariaPressed','Element.ariaReadOnly','Element.ariaRelevant','Element.ariaRequired','Element.ariaRoleDescription','Element.ariaRowCount','Element.ariaRowIndex','Element.ariaRowSpan','Element.ariaSelected','Element.ariaSort','Element.ariaValueMax','Element.ariaValueMin','Element.ariaValueNow','Element.ariaValueText','Intl.DisplayNames'],
		'83': ['Element.ariaDescription','Element.onbeforexrselect'],
		'84': ['Document.getAnimations','Document.timeline','Element.ariaSetSize','Element.getAnimations'],
		'85': ['Promise.any','String.replaceAll'],
		'86': ['Document.fragmentDirective','Document.replaceChildren','Element.replaceChildren', '!Atomics.wake'],
		'87-89': ['Atomics.waitAsync','Document.ontransitioncancel','Document.ontransitionrun','Document.ontransitionstart','Intl.Segmenter'],
		'90': ['Document.onbeforexrselect','RegExp.hasIndices','!Element.onbeforexrselect'],
		'91': ['Element.getInnerHTML'],
		'92': ['Array.at','String.at'],
		'93': ['Error.cause','Object.hasOwn'],
		'94': ['!Error.cause', 'Object.hasOwn'],
		'95-96': ['WebAssembly.Exception','WebAssembly.Tag'],
		'97': ['Array.findLast', 'Array.findLastIndex', 'Document.onslotchange']
	}

	const geckoJS = {
		'71': ['Promise.allSettled'],
		'72-73': ['Document.onformdata','Element.part'],
		'74': ['!Array.toSource','!Boolean.toSource','!Date.toSource','!Error.toSource','!Function.toSource','!Intl.toSource','!JSON.toSource','!Math.toSource','!Number.toSource','!Object.toSource','!RegExp.toSource','!String.toSource','!WebAssembly.toSource'],
		'75-76': ['Document.getAnimations','Document.timeline','Element.getAnimations','Intl.Locale'],
		'77': ['String.replaceAll'],
		'78': ['Atomics.add','Atomics.and','Atomics.compareExchange','Atomics.exchange','Atomics.isLockFree','Atomics.load','Atomics.notify','Atomics.or','Atomics.store','Atomics.sub','Atomics.wait','Atomics.wake','Atomics.xor','Document.replaceChildren','Element.replaceChildren','Intl.ListFormat','RegExp.dotAll'],
		'79-84': ['Promise.any'],
		'85': ['!Document.onshow','Promise.any'],
		'86': ['Intl.DisplayNames'],
		'87': ['Document.onbeforeinput'],
		'88-89': ['RegExp.hasIndices'],
		'90-91': ['Array.at','String.at'],
		'92': ['Object.hasOwn'],
		'93-94': ['Intl.supportedValuesOf','Document.onsecuritypolicyviolation','Document.onslotchange']
	}

	const isChrome = browser == 'Chrome'
	const isFirefox = browser == 'Firefox'
	const css = (
		isChrome ? blinkCSS : isFirefox ? geckoCSS : {}
	)
	const win = (
		isChrome ? blinkWindow : isFirefox ? geckoWindow : {}
	)
	const js = (
		isChrome ? blinkJS : isFirefox ? geckoJS : {}
	)
	return {
		css,
		win,
		js
	}
}

const getJSCoreFeatures = win => {
	const globalObjects = [
		'Object',
		'Function',
		'Boolean',
		'Symbol',
		'Error',
		'Number',
		'BigInt',
		'Math',
		'Date',
		'String',
		'RegExp',
		'Array',
		'Map',
		'Set',
		'WeakMap',
		'WeakSet',
		'Atomics',
		'JSON',
		'Promise',
		'Reflect',
		'Proxy',
		'Intl',
		'WebAssembly',
		'Document',
		'Element'
	]
	try {
		const features = globalObjects.reduce((acc, name) => {
			const ignore = ['name', 'length', 'constructor', 'prototype', 'arguments', 'caller']
			const descriptorKeys = Object.keys(Object.getOwnPropertyDescriptors(win[name]||{}))
			const descriptorProtoKeys = Object.keys(Object.getOwnPropertyDescriptors((win[name]||{}).prototype||{}))
			const uniques = [...new Set([...descriptorKeys, ...descriptorProtoKeys].filter(key => !ignore.includes(key)))]
			const keys = uniques.map(key => `${name}.${key}`)
			return [...acc, ...keys] 
		}, [])
		return features
	}
	catch (error) {
		console.error(error)
		return []
	}
}

const versionSort = x => x.sort((a, b) => /\d+/.exec(a)[0] - /\d+/.exec(b)[0]).reverse()

// feature firewall
const getFeaturesLie = fp => {
	if (!fp.workerScope || !fp.workerScope.userAgent) {
		return false
	}
	const browser = getFeaturesBrowser()
	const stable = getStableFeatures()
	const { version: maxVersion } = stable[browser] || {}
	const { userAgentVersion: reportedVersion } = fp.workerScope
	
	// let RFP pass
	const { privacy } = fp.resistance || {}
	if (privacy == 'Firefox' || privacy == 'Tor Browser') {
		return false
	}

	const getVersionLie = version => {
		const versionParts = version ? version.split('-') : []
		const versionNotAboveSamples = (+reportedVersion <= maxVersion)
		const validMetrics = reportedVersion && version
		const forgivenessOffset = 0 // 0 is strict (dev and canary builds may fail)
		const outsideOfVersion = (
			versionParts.length == 1 && (
				+reportedVersion > (+versionParts[0]+forgivenessOffset) ||
				+reportedVersion < (+versionParts[0]-forgivenessOffset)
			)
		)
		const outsideOfVersionRange = (
			versionParts.length == 2 && (
				+reportedVersion > (+versionParts[1]+forgivenessOffset) ||
				+reportedVersion < (+versionParts[0]-forgivenessOffset)
			)
		)
		const liedVersion = validMetrics && versionNotAboveSamples && (
			outsideOfVersion || outsideOfVersionRange
		)
		return liedVersion
	}
	const { cssVersion, jsVersion } = fp.features || {}
	const liedVersion = (
		getVersionLie(cssVersion) ||
		getVersionLie(jsVersion)
	)
	return liedVersion
}

const getEngineFeatures = async ({ imports, cssComputed, windowFeaturesComputed }) => {
	const {
		require: {
			captureError,
			phantomDarkness,
			logTestResult
		}
	} = imports

	try {
		const start = performance.now()
		const win = phantomDarkness ? phantomDarkness : window
		if (!cssComputed || !windowFeaturesComputed) {
			logTestResult({ test: 'features', passed: false })
			return
		}
		
		const jsFeaturesKeys = getJSCoreFeatures(win)
		const { keys: computedStyleKeys } = cssComputed.computedStyle || {}
		const { keys: windowFeaturesKeys } = windowFeaturesComputed || {}

		const isNative = (win, x) => (
			/\[native code\]/.test(win[x]+'') &&
			'prototype' in win[x] && 
			win[x].prototype.constructor.name === x
		)

		const browser = getFeaturesBrowser()

		const getFeatures = ({context, allKeys, engineMap, checkNative = false} = {}) => {
			const allKeysSet = new Set(allKeys)
			const features = new Set()
			const match = Object.keys(engineMap || {}).reduce((acc, key) => {
				const version = engineMap[key]
				const versionLen = version.length
				const featureLen = version.filter(prop => {
					const removedFromVersion = prop.charAt(0) == '!'
					if (removedFromVersion) {
						const propName = prop.slice(1)
						return !allKeysSet.has(propName) && features.add(prop)	
					}
					return (
						allKeysSet.has(prop) &&
						(checkNative ? isNative(context, prop) : true) &&
						features.add(prop)
					)
				}).length
				return versionLen == featureLen ? [...acc, key] : acc 
			}, [])
			const version = versionSort(match)[0]
			return {
				version,
				features
			}
		}

		// engine maps
		const {
			css: engineMapCSS,
			win: engineMapWindow,
			js: engineMapJS
		} = getEngineMaps(browser)

		// css version
		const {
			version: cssVersion,
			features: cssFeatures
		} = getFeatures({
			context: win,
			allKeys: computedStyleKeys,
			engineMap: engineMapCSS
		})
		
		// window version
		const {
			version: windowVersion,
			features: windowFeatures
		} = getFeatures({
			context: win,
			allKeys: windowFeaturesKeys,
			engineMap: engineMapWindow,
			checkNative: true
		})

		// js version
		const {
			version: jsVersion,
			features: jsFeatures
		} = getFeatures({
			context: win,
			allKeys: jsFeaturesKeys,
			engineMap: engineMapJS
		})
			
		// determine version based on 3 factors
		const getVersionFromRange = (range, versionCollection) => {
			const exactVersion = versionCollection.find(version => version && !/-/.test(version))
			if (exactVersion) {
				return exactVersion
			}
			const len = range.length
			const first = range[0]
			const last = range[len-1]
			return (
				!len ? '' : 
					len == 1 ? first :
						`${last}-${first}`
			)
		}
		const versionSet = new Set([
			cssVersion,
			windowVersion,
			jsVersion
		])
		versionSet.delete(undefined)
		const versionRange = versionSort(
			[...versionSet].reduce((acc, x) => [...acc, ...x.split('-')], [])
		)
		const version = getVersionFromRange(versionRange, [cssVersion, windowVersion, jsVersion])
		logTestResult({ start, test: 'features', passed: true })
		return {
			versionRange,
			version,
			cssVersion,
			windowVersion,
			jsVersion,
			cssFeatures: [...cssFeatures],
			windowFeatures: [...windowFeatures],
			jsFeatures: [...jsFeatures],
			jsFeaturesKeys
		}
	}
	catch (error) {
		logTestResult({ test: 'features', passed: false })
		captureError(error)
		return
	}
}

const featuresHTML = ({ fp, modal, note, hashMini }) => {
	if (!fp.features) {
		return `
		<div class="col-six undefined">
			<div>Features: ${note.unknown}</div>
			<div>JS/DOM: ${note.unknown}</div>
		</div>
		<div class="col-six undefined">
			<div>CSS: ${note.unknown}</div>
			<div>Window: ${note.unknown}</div>
		</div>`
	}

	const {
		versionRange,
		version,
		cssVersion,
		jsVersion,
		windowVersion,
		cssFeatures,
		windowFeatures,
		jsFeatures,
		jsFeaturesKeys
	} = fp.features || {}

	const { keys: windowFeaturesKeys } = fp.windowFeatures || {}
	const { keys: computedStyleKeys } = fp.css.computedStyle || {}
	const { userAgentVersion } = fp.workerScope || {}
	const browser = getFeaturesBrowser()
	const {
		css: engineMapCSS,
		win: engineMapWindow,
		js: engineMapJS
	} = getEngineMaps(browser)
		

	// logger
	const shouldLogFeatures = (browser, version, userAgentVersion) => {
		const shouldLog = userAgentVersion > version
		return shouldLog
	}
	const log = ({ features, name, diff }) => {
		console.groupCollapsed(`%c ${name} Features %c-${diff.removed.length} %c+${diff.added.length}`, 'color: #4cc1f9', 'color: Salmon', 'color: MediumAquaMarine')
		Object.keys(diff).forEach(key => {
			console.log(`%c${key}:`, `color: ${key == 'added' ? 'MediumAquaMarine' : 'Salmon' }`)
			return console.log(diff[key].join('\n'))
		})
		console.log(features.join(', '))
		return console.groupEnd()
	}
	// modal
	const report = { computedStyleKeys, windowFeaturesKeys, jsFeaturesKeys }
	const getModal = ({id, engineMap, features, browser, report, userAgentVersion }) => {
		// capture diffs from stable release
		const stable = getStableFeatures()
		const { windowKeys, cssKeys, jsKeys, version } = stable[browser] || {}
		const logger = shouldLogFeatures(browser, version, userAgentVersion)
		let diff
		if (id == 'css') {
			const { computedStyleKeys } = report
			diff = !cssKeys ? undefined : getListDiff({
				oldList: cssKeys.split(', '),
				newList: computedStyleKeys,
				removeCamelCase: true
			})
			logger && console.log(`computing ${browser} ${userAgentVersion} diffs from ${browser} ${version}...`)
			logger && log({ features: computedStyleKeys, name: 'CSS', diff })
		}
		else if (id == 'window') {
			const { windowFeaturesKeys } = report
			diff = !windowKeys ? undefined : getListDiff({
				oldList: windowKeys.split(', '),
				newList: windowFeaturesKeys
			})
			logger && log({ features: windowFeaturesKeys, name: 'Window', diff })
		}
		else if (id == 'js') {
			const { jsFeaturesKeys } = report
			diff = !jsKeys ? undefined : getListDiff({
				oldList: jsKeys.split(', '),
				newList: jsFeaturesKeys
			})
			logger && log({ features: jsFeaturesKeys, name: 'JS', diff })
		}

		const header = !version || !diff || (!diff.added.length && !diff.removed.length) ? '' : `
			<strong>diffs from ${version}</strong>:
			<div>
			${
				diff && diff.added.length ? 
					diff.added.map(key => `<div><span>${key}</span></div>`).join('') : ''
			}
			${
				diff && diff.removed.length ? 
					diff.removed.map(key => `<div><span class="unsupport">${key}</span></div>`).join('') : ''
			}
			</div>
			
		`
	
		return modal(`creep-features-${id}`, header + versionSort(Object.keys(engineMap)).map(key => {
			return `
				<strong>${key}</strong>:<br>${
					engineMap[key].map(prop => {
						return `<span class="${!features.has(prop) ? 'unsupport' : ''}">${prop}</span>`
					}).join('<br>')
				}
			`
		}).join('<br>'), hashMini([...features]))
	}

	const cssModal = getModal({
		id: 'css',
		engineMap: engineMapCSS,
		features: new Set(cssFeatures),
		browser,
		report,
		userAgentVersion
	})
	
	const windowModal = getModal({
		id: 'window',
		engineMap: engineMapWindow,
		features: new Set(windowFeatures),
		browser,
		report,
		userAgentVersion
	})

	const jsModal = getModal({
		id: 'js',
		engineMap: engineMapJS,
		features: new Set(jsFeatures),
		browser,
		report,
		userAgentVersion
	})

	const getIcon = name => `<span class="icon ${name}"></span>`
	const browserIcon = (
		!browser ? '' :
			/chrome/i.test(browser) ? getIcon('chrome') :
				/firefox/i.test(browser) ? getIcon('firefox') :
					''
	)

	return `
	<style>
		.unsupport {
			background: #f1f1f1;
			color: #aaa;
		}
		.features-removed {
			background: red;
			color: #fff;
		}
		.features-added {
			background: green;
			color: #fff;
		}
		@media (prefers-color-scheme: dark) {
			.unsupport {
				color: var(--light-grey);
				background: none;
			}
		}
	</style>
	<div class="col-six">
		<div>Features: ${
			versionRange.length ? `${browserIcon}${version}+` :
				note.unknown
		}</div>
		<div>JS/DOM: ${jsVersion ? `${jsModal} (v${jsVersion})` : note.unknown}</div>
	</div>
	<div class="col-six">
		<div>CSS: ${cssVersion ? `${cssModal} (v${cssVersion})` : note.unknown}</div>
		<div>Window: ${windowVersion ? `${windowModal} (v${windowVersion})` : note.unknown}</div>
	</div>
	`
}

export { getFeaturesLie, getEngineFeatures, featuresHTML }