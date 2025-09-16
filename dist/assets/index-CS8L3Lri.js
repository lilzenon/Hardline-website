const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-BAFQsRA5.js","assets/vendor-BwJ0PBRo.js","assets/usePerformantResize-KUTU5QnQ.js","assets/beacon-r5K5QvzQ.js","assets/mobileOptimization-DxuCIEdC.js","assets/sanitizer-B9Z30L2G.js","assets/SocialMediaButtons-1Pqixyl3.js","assets/AdminLoginFigma-DGLxUStp.js","assets/AboutPage-BSNcwysW.js","assets/ContactPage-INIKkXY-.js","assets/NotFoundPage-zuIyJ7mG.js","assets/NotFoundPage-Dsu-tIjE.css"])))=>i.map(i=>d[i]);
function e(){function e(e){var n="https://react.dev/errors/"+e
if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1])
for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var n=e,t=e
if(e.alternate)for(;n.return;)n=n.return
else{e=n
do{!!(4098&(n=e).flags)&&(t=n.return),e=n.return}while(e)}return 3===n.tag?t:null}function u(e){if(13===e.tag){var n=e.memoizedState
if(null===n&&null!==(e=e.alternate)&&(n=e.memoizedState),null!==n)return n.dehydrated}return null}function o(n){if(l(n)!==n)throw Error(e(188))}function a(e){var n=e.tag
if(5===n||26===n||27===n||6===n)return e
for(e=e.child;null!==e;){if(null!==(n=a(e)))return n
e=e.sibling}return null}function i(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Ia&&e[Ia]||e["@@iterator"])?e:null}function c(e){if(null==e)return null
if("function"==typeof e)return e.$$typeof===ja?null:e.displayName||e.name||null
if("string"==typeof e)return e
switch(e){case Ea:return"Fragment"
case Sa:return"Profiler"
case xa:return"StrictMode"
case Ma:return"Suspense"
case Fa:return"SuspenseList"
case Ra:return"Activity"}if("object"==typeof e)switch(e.$$typeof){case ga:return"Portal"
case Oa:return(e.displayName||"Context")+".Provider"
case _a:return(e.t.displayName||"Context")+".Consumer"
case Ta:var n=e.render
return(e=e.displayName)||(e=""!==(e=n.displayName||n.name||"")?"ForwardRef("+e+")":"ForwardRef"),e
case La:return null!==(n=e.displayName||null)?n:c(e.type)||"Memo"
case Da:n=e.l,e=e.u
try{return c(e(n))}catch(t){}}return null}function p(e){return{current:e}}function v(e){0>Ha||(e.current=Ua[Ha],Ua[Ha]=null,Ha--)}function h(e,n){Ha++,Ua[Ha]=e.current,e.current=n}function y(e,n){switch(h(Wa,n),h(Va,e),h(za,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?fo(e):0
break
default:if(e=n.tagName,n=n.namespaceURI)e=po(n=fo(n),e)
else switch(e){case"svg":e=1
break
case"math":e=2
break
default:e=0}}v(za),h(za,e)}function m(){v(za),v(Va),v(Wa)}function g(e){null!==e.memoizedState&&h(Ka,e)
var n=za.current,t=po(n,e.type)
n!==t&&(h(Va,e),h(za,t))}function E(e){Va.current===e&&(v(za),v(Va)),Ka.current===e&&(v(Ka),Sd.o=$a)}function x(e){if("function"==typeof ui&&oi(e),ii&&"function"==typeof ii.setStrictMode)try{ii.setStrictMode(ai,e)}catch(n){}}function S(e){var n=42&e
if(0!==n)return n
switch(e&-e){case 1:return 1
case 2:return 2
case 4:return 4
case 8:return 8
case 16:return 16
case 32:return 32
case 64:return 64
case 128:return 128
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&e
case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e
case 67108864:return 67108864
case 134217728:return 134217728
case 268435456:return 268435456
case 536870912:return 536870912
case 1073741824:return 0
default:return e}}function C(e,n,t){var r=e.pendingLanes
if(0===r)return 0
var l=0,u=e.suspendedLanes,o=e.pingedLanes
e=e.warmLanes
var a=134217727&r
return 0!==a?0!==(r=a&~u)?l=S(r):0!==(o&=a)?l=S(o):t||0!==(t=a&~e)&&(l=S(t)):0!==(a=r&~u)?l=S(a):0!==o?l=S(o):t||0!==(t=r&~e)&&(l=S(t)),0===l?0:0!==n&&n!==l&&0===(n&u)&&((u=l&-l)>=(t=n&-n)||32===u&&4194048&t)?n:l}function _(e,n){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)}function O(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250
case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3
default:return-1}}function T(){var e=di
return!(4194048&(di<<=1))&&(di=256),e}function M(){var e=pi
return!(62914560&(pi<<=1))&&(pi=4194304),e}function F(e){for(var n=[],t=0;31>t;t++)n.push(e)
return n}function L(e,n){e.pendingLanes|=n,268435456!==n&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function D(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n
var r=31-ci(n)
e.entangledLanes|=n,e.entanglements[r]=1073741824|e.entanglements[r]|4194090&t}function R(e,n){var t=e.entangledLanes|=n
for(e=e.entanglements;t;){var r=31-ci(t),l=1<<r
l&n|e[r]&n&&(e[r]|=n),t&=~l}}function P(e){switch(e){case 2:e=1
break
case 8:e=4
break
case 32:e=16
break
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128
break
case 268435456:e=134217728
break
default:e=0}return e}function I(e){return 2<(e&=-e)?8<e?134217727&e?32:268435456:8:2}function j(){var e=Na.p
return 0!==e?e:void 0===(e=window.event)?32:na(e.type)}function A(e){delete e[hi],delete e[yi],delete e[bi],delete e[wi],delete e[ki]}function B(e){var n=e[hi]
if(n)return n
for(var t=e.parentNode;t;){if(n=t[mi]||t[hi]){if(t=n.alternate,null!==n.child||null!==t&&null!==t.child)for(e=go(e);null!==e;){if(t=e[hi])return t
e=go(e)}return n}t=(e=t).parentNode}return null}function N(e){if(e=e[hi]||e[mi]){var n=e.tag
if(5===n||6===n||13===n||26===n||27===n||3===n)return e}return null}function $(n){var t=n.tag
if(5===t||26===t||27===t||6===t)return n.stateNode
throw Error(e(33))}function U(e){var n=e[gi]
return n||(n=e[gi]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function H(e){e[Ei]=!0}function z(e,n){V(e,n),V(e+"Capture",n)}function V(e,n){for(Si[e]=n,e=0;e<n.length;e++)xi.add(n[e])}function W(e,n,t){if(l=n,Xa.call(Oi,l)||!Xa.call(_i,l)&&(Ci.test(l)?Oi[l]=!0:(_i[l]=!0,0)))if(null===t)e.removeAttribute(n)
else{switch(typeof t){case"undefined":case"function":case"symbol":return e.removeAttribute(n),void 0
case"boolean":var r=n.toLowerCase().slice(0,5)
if("data-"!==r&&"aria-"!==r)return e.removeAttribute(n),void 0}e.setAttribute(n,""+t)}var l}function K(e,n,t){if(null===t)e.removeAttribute(n)
else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":return e.removeAttribute(n),void 0}e.setAttribute(n,""+t)}}function X(e,n,t,r){if(null===r)e.removeAttribute(t)
else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return e.removeAttribute(t),void 0}e.setAttributeNS(n,t,""+r)}}function G(e){if(void 0===pa)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/)
pa=n&&n[1]||"",va=-1<t.stack.indexOf("\n    at")?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+pa+e+va}function Y(e,n){if(!e||Ti)return""
Ti=!0
var t=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var r={DetermineComponentFrameRoot:function(){try{if(n){var t=function(){throw Error()}
if(Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(l){var r=l}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}}else{try{throw Error()}catch(o){r=o}(t=e())&&"function"==typeof t.catch&&t.catch(function(){})}}catch(a){if(a&&r&&"string"==typeof a.stack)return[a.stack,r.stack]}return[null,null]}}
r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var l=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name")
l&&l.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=r.DetermineComponentFrameRoot(),o=u[0],a=u[1]
if(o&&a){var i=o.split("\n"),c=a.split("\n")
for(l=r=0;r<i.length&&!i[r].includes("DetermineComponentFrameRoot");)r++
for(;l<c.length&&!c[l].includes("DetermineComponentFrameRoot");)l++
if(r===i.length||l===c.length)for(r=i.length-1,l=c.length-1;1<=r&&0<=l&&i[r]!==c[l];)l--
for(;1<=r&&0<=l;r--,l--)if(i[r]!==c[l]){if(1!==r||1!==l)do{if(r--,0>--l||i[r]!==c[l]){var s="\n"+i[r].replace(" at new "," at ")
return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=r&&0<=l)
break}}}finally{Ti=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?G(t):""}function q(e){switch(e.tag){case 26:case 27:case 5:return G(e.type)
case 16:return G("Lazy")
case 13:return G("Suspense")
case 19:return G("SuspenseList")
case 0:case 15:return Y(e.type,!1)
case 11:return Y(e.type.render,!1)
case 1:return Y(e.type,!0)
case 31:return G("Activity")
default:return""}}function J(e){try{var n=""
do{n+=q(e),e=e.return}while(e)
return n}catch(t){return"\nError generating stack: "+t.message+"\n"+t.stack}}function Q(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e
default:return""}}function Z(e){var n=e.type
return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===n||"radio"===n)}function ee(e){e.i||(e.i=function(e){var n=Z(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n]
if(!e.hasOwnProperty(n)&&void 0!==t&&"function"==typeof t.get&&"function"==typeof t.set){var l=t.get,u=t.set
return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(e){r=""+e,u.call(this,e)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e.i=null,delete e[n]}}}}(e))}function ne(e){if(!e)return!1
var n=e.i
if(!n)return!0
var t=n.getValue(),r=""
return e&&(r=Z(e)?e.checked?"true":"false":e.value),(e=r)!==t&&(n.setValue(e),!0)}function te(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null
try{return e.activeElement||e.body}catch(n){return e.body}}function re(e){return e.replace(Mi,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function le(e,n,t,r,l,u,o,a){e.name="",null!=o&&"function"!=typeof o&&"symbol"!=typeof o&&"boolean"!=typeof o?e.type=o:e.removeAttribute("type"),null!=n?"number"===o?(0===n&&""===e.value||e.value!=n)&&(e.value=""+Q(n)):e.value!==""+Q(n)&&(e.value=""+Q(n)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=n?oe(e,o,Q(n)):null!=t?oe(e,o,Q(t)):null!=r&&e.removeAttribute("value"),null==l&&null!=u&&(e.defaultChecked=!!u),null!=l&&(e.checked=l&&"function"!=typeof l&&"symbol"!=typeof l),null!=a&&"function"!=typeof a&&"symbol"!=typeof a&&"boolean"!=typeof a?e.name=""+Q(a):e.removeAttribute("name")}function ue(e,n,t,r,l,u,o,a){if(null!=u&&"function"!=typeof u&&"symbol"!=typeof u&&"boolean"!=typeof u&&(e.type=u),null!=n||null!=t){if(("submit"===u||"reset"===u)&&null==n)return
t=null!=t?""+Q(t):"",n=null!=n?""+Q(n):t,a||n===e.value||(e.value=n),e.defaultValue=n}r="function"!=typeof(r=null!=r?r:l)&&"symbol"!=typeof r&&!!r,e.checked=a?e.checked:!!r,e.defaultChecked=!!r,null!=o&&"function"!=typeof o&&"symbol"!=typeof o&&"boolean"!=typeof o&&(e.name=o)}function oe(e,n,t){"number"===n&&te(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function ae(e,n,t,r){if(e=e.options,n){n={}
for(var l=0;l<t.length;l++)n["$"+t[l]]=!0
for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Q(t),n=null,l=0;l<e.length;l++){if(e[l].value===t)return e[l].selected=!0,r&&(e[l].defaultSelected=!0),void 0
null!==n||e[l].disabled||(n=e[l])}null!==n&&(n.selected=!0)}}function ie(e,n,t){if(null!=n&&((n=""+Q(n))!==e.value&&(e.value=n),null==t))return e.defaultValue!==n&&(e.defaultValue=n),void 0
e.defaultValue=null!=t?""+Q(t):""}function ce(n,t,r,l){if(null==t){if(null!=l){if(null!=r)throw Error(e(92))
if(Aa(l)){if(1<l.length)throw Error(e(93))
l=l[0]}r=l}null==r&&(r=""),t=r}r=Q(t),n.defaultValue=r,(l=n.textContent)===r&&""!==l&&null!==l&&(n.value=l)}function se(e,n){if(n){var t=e.firstChild
if(t&&t===e.lastChild&&3===t.nodeType)return t.nodeValue=n,void 0}e.textContent=n}function fe(e,n,t){var r=0===n.indexOf("--")
null==t||"boolean"==typeof t||""===t?r?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="":r?e.setProperty(n,t):"number"!=typeof t||0===t||Fi.has(n)?"float"===n?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function de(n,t,r){if(null!=t&&"object"!=typeof t)throw Error(e(62))
if(n=n.style,null!=r){for(var l in r)!r.hasOwnProperty(l)||null!=t&&t.hasOwnProperty(l)||(0===l.indexOf("--")?n.setProperty(l,""):"float"===l?n.cssFloat="":n[l]="")
for(var u in t)l=t[u],t.hasOwnProperty(u)&&r[u]!==l&&fe(n,u,l)}else for(var o in t)t.hasOwnProperty(o)&&fe(n,o,t[o])}function pe(e){if(-1===e.indexOf("-"))return!1
switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1
default:return!0}}function ve(e){return Di.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function he(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function ye(n){var t=N(n)
if(t&&(n=t.stateNode)){var r=n[yi]||null
e:switch(n=t.stateNode,t.type){case"input":if(le(n,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=n;r.parentNode;)r=r.parentNode
for(r=r.querySelectorAll('input[name="'+re(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var l=r[t]
if(l!==n&&l.form===n.form){var u=l[yi]||null
if(!u)throw Error(e(90))
le(l,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<r.length;t++)(l=r[t]).form===n.form&&ne(l)}break e
case"textarea":ie(n,r.value,r.defaultValue)
break e
case"select":null!=(t=r.value)&&ae(n,!!r.multiple,t,!1)}}}function me(e,n,t){if(ji)return e(n,t)
ji=!0
try{return e(n)}finally{if(ji=!1,(null!==Pi||null!==Ii)&&(cu(),Pi&&(n=Pi,e=Ii,Ii=Pi=null,ye(n),e)))for(n=0;n<e.length;n++)ye(e[n])}}function be(n,t){var r=n.stateNode
if(null===r)return null
var l=r[yi]||null
if(null===l)return null
r=l[t]
e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(l=!("button"===(n=n.type)||"input"===n||"select"===n||"textarea"===n)),n=!l
break e
default:n=!1}if(n)return null
if(r&&"function"!=typeof r)throw Error(e(231,t,typeof r))
return r}function we(){if(Wi)return Wi
var e,n,t=Vi,r=t.length,l="value"in zi?zi.value:zi.textContent,u=l.length
for(e=0;e<r&&t[e]===l[e];e++);var o=r-e
for(n=1;n<=o&&t[r-n]===l[u-n];n++);return Wi=l.slice(e,1<n?1-n:void 0)}function ke(e){var n=e.keyCode
return"charCode"in e?0===(e=e.charCode)&&13===n&&(e=13):e=n,10===e&&(e=13),32<=e||13===e?e:0}function ge(){return!0}function Ee(){return!1}function xe(e){function n(n,t,r,l,u){for(var o in this.v=n,this.h=r,this.type=t,this.nativeEvent=l,this.target=u,this.currentTarget=null,e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(l):l[o])
return this.isDefaultPrevented=(null!=l.defaultPrevented?l.defaultPrevented:!1===l.returnValue)?ge:Ee,this.isPropagationStopped=Ee,this}return ba(n.prototype,{preventDefault:function(){this.defaultPrevented=!0
var e=this.nativeEvent
e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=ge)},stopPropagation:function(){var e=this.nativeEvent
e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=ge)},persist:function(){},isPersistent:ge}),n}function Se(e){var n=this.nativeEvent
return n.getModifierState?n.getModifierState(e):!!(e=uc[e])&&!!n[e]}function Ce(){return Se}function _e(e,n){switch(e){case"keyup":return-1!==dc.indexOf(n.keyCode)
case"keydown":return 229!==n.keyCode
case"keypress":case"mousedown":case"focusout":return!0
default:return!1}}function Oe(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}function Te(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return"input"===n?!!kc[e.type]:"textarea"===n}function Me(e,n,t,r){Pi?Ii?Ii.push(r):Ii=[r]:Pi=r,0<(n=no(n,"onChange")).length&&(t=new Xi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}function Fe(e){Gu(e,0)}function Le(e){if(ne($(e)))return e}function De(e,n){if("change"===e)return n}function Re(){gc&&(gc.detachEvent("onpropertychange",Pe),Ec=gc=null)}function Pe(e){if("value"===e.propertyName&&Le(Ec)){var n=[]
Me(n,Ec,e,he(e)),me(Fe,n)}}function Ie(e,n,t){"focusin"===e?(Re(),Ec=t,(gc=n).attachEvent("onpropertychange",Pe)):"focusout"===e&&Re()}function je(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Le(Ec)}function Ae(e,n){if("click"===e)return Le(n)}function Be(e,n){if("input"===e||"change"===e)return Le(n)}function Ne(e,n){if(Oc(e,n))return!0
if("object"!=typeof e||null===e||"object"!=typeof n||null===n)return!1
var t=Object.keys(e),r=Object.keys(n)
if(t.length!==r.length)return!1
for(r=0;r<t.length;r++){var l=t[r]
if(!Xa.call(n,l)||!Oc(e[l],n[l]))return!1}return!0}function $e(e){for(;e&&e.firstChild;)e=e.firstChild
return e}function Ue(e,n){var t,r=$e(e)
for(e=0;r;){if(3===r.nodeType){if(t=e+r.textContent.length,e<=n&&t>=n)return{node:r,offset:n-e}
e=t}e:{for(;r;){if(r.nextSibling){r=r.nextSibling
break e}r=r.parentNode}r=void 0}r=$e(r)}}function He(e,n){return!(!e||!n)&&(e===n||(!e||3!==e.nodeType)&&(n&&3===n.nodeType?He(e,n.parentNode):"contains"in e?e.contains(n):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(n))))}function ze(e){for(var n=te((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);n instanceof e.HTMLIFrameElement;){try{var t="string"==typeof n.contentWindow.location.href}catch(r){t=!1}if(!t)break
n=te((e=n.contentWindow).document)}return n}function Ve(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return n&&("input"===n&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===n||"true"===e.contentEditable)}function We(e,n,t){var r=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument
Dc||null==Mc||Mc!==te(r)||(r="selectionStart"in(r=Mc)&&Ve(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Lc&&Ne(Lc,r)||(Lc=r,0<(r=no(Fc,"onSelect")).length&&(n=new Xi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Mc)))}function Ke(e,n){var t={}
return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}function Xe(e){if(Pc[e])return Pc[e]
if(!Rc[e])return e
var n,t=Rc[e]
for(n in t)if(t.hasOwnProperty(n)&&n in Ic)return Pc[e]=t[n]
return e}function Ge(e,n){zc.set(e,n),z(n,[e])}function Ye(e,n){if("object"==typeof e&&null!==e){var t=Wc.get(e)
return void 0!==t?t:(n={value:e,source:n,stack:J(n)},Wc.set(e,n),n)}return{value:e,source:n,stack:J(n)}}function qe(){for(var e=Xc,n=Gc=Xc=0;n<e;){var t=Kc[n]
Kc[n++]=null
var r=Kc[n]
Kc[n++]=null
var l=Kc[n]
Kc[n++]=null
var u=Kc[n]
if(Kc[n++]=null,null!==r&&null!==l){var o=r.pending
null===o?l.next=l:(l.next=o.next,o.next=l),r.pending=l}0!==u&&en(t,l,u)}}function Je(e,n,t,r){Kc[Xc++]=e,Kc[Xc++]=n,Kc[Xc++]=t,Kc[Xc++]=r,Gc|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Qe(e,n,t,r){return Je(e,n,t,r),nn(e)}function Ze(e,n){return Je(e,null,null,n),nn(e)}function en(e,n,t){e.lanes|=t
var r=e.alternate
null!==r&&(r.lanes|=t)
for(var l=!1,u=e.return;null!==u;)u.childLanes|=t,null!==(r=u.alternate)&&(r.childLanes|=t),22===u.tag&&(null===(e=u.stateNode)||1&e.k||(l=!0)),e=u,u=u.return
return 3===e.tag?(u=e.stateNode,l&&null!==n&&(l=31-ci(t),null===(r=(e=u.hiddenUpdates)[l])?e[l]=[n]:r.push(n),n.lane=536870912|t),u):null}function nn(n){if(50<Gf)throw Gf=0,Yf=null,Error(e(185))
for(var t=n.return;null!==t;)t=(n=t).return
return 3===n.tag?n.stateNode:null}function tn(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rn(e,n,t,r){return new tn(e,n,t,r)}function ln(e){return!(!(e=e.prototype)||!e.isReactComponent)}function un(e,n){var t=e.alternate
return null===t?((t=rn(e.tag,n,e.key,e.mode)).elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=65011712&e.flags,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function on(e,n){e.flags&=65011714
var t=e.alternate
return null===t?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function an(n,t,r,l,u,o){var a=0
if(l=n,"function"==typeof n)ln(n)&&(a=1)
else if("string"==typeof n)a=function(e,n,t){if(1===t||null!=n.itemProp)return!1
switch(e){case"meta":case"title":return!0
case"style":if("string"!=typeof n.precedence||"string"!=typeof n.href||""===n.href)break
return!0
case"link":if("string"!=typeof n.rel||"string"!=typeof n.href||""===n.href||n.onLoad||n.onError)break
return"stylesheet"!==n.rel||(e=n.disabled,"string"==typeof n.precedence&&null==e)
case"script":if(n.async&&"function"!=typeof n.async&&"symbol"!=typeof n.async&&!n.onLoad&&!n.onError&&n.src&&"string"==typeof n.src)return!0}return!1}(n,r,za.current)?26:"html"===n||"head"===n||"body"===n?27:5
else e:switch(n){case Ra:return(n=rn(31,r,t,u)).elementType=Ra,n.lanes=o,n
case Ea:return cn(r.children,u,o,t)
case xa:a=8,u|=24
break
case Sa:return(n=rn(12,r,t,2|u)).elementType=Sa,n.lanes=o,n
case Ma:return(n=rn(13,r,t,u)).elementType=Ma,n.lanes=o,n
case Fa:return(n=rn(19,r,t,u)).elementType=Fa,n.lanes=o,n
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case Ca:case Oa:a=10
break e
case _a:a=9
break e
case Ta:a=11
break e
case La:a=14
break e
case Da:a=16,l=null
break e}a=29,r=Error(e(130,null===n?"null":typeof n,"")),l=null}return(t=rn(a,r,t,u)).elementType=n,t.type=l,t.lanes=o,t}function cn(e,n,t,r){return(e=rn(7,e,r,n)).lanes=t,e}function sn(e,n,t){return(e=rn(6,e,null,n)).lanes=t,e}function fn(e,n,t){return(n=rn(4,null!==e.children?e.children:[],e.key,n)).lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function dn(e,n){qc[Jc++]=Zc,qc[Jc++]=Qc,Qc=e,Zc=n}function pn(e,n,t){es[ns++]=rs,es[ns++]=ls,es[ns++]=ts,ts=e
var r=rs
e=ls
var l=32-ci(r)-1
r&=~(1<<l),t+=1
var u=32-ci(n)+l
if(30<u){var o=l-l%5
u=(r&(1<<o)-1).toString(32),r>>=o,l-=o,rs=1<<32-ci(n)+l|t<<l|r,ls=u+e}else rs=1<<u|t<<l|r,ls=e}function vn(e){null!==e.return&&(dn(e,1),pn(e,1,0))}function hn(e){for(;e===Qc;)Qc=qc[--Jc],qc[Jc]=null,Zc=qc[--Jc],qc[Jc]=null
for(;e===ts;)ts=es[--ns],es[ns]=null,ls=es[--ns],es[ns]=null,rs=es[--ns],es[ns]=null}function yn(n){throw En(Ye(Error(e(418,"")),n)),ss}function mn(e){var n=e.stateNode,t=e.type,r=e.memoizedProps
switch(n[hi]=e,n[yi]=r,t){case"dialog":Yu("cancel",n),Yu("close",n)
break
case"iframe":case"object":case"embed":Yu("load",n)
break
case"video":case"audio":for(t=0;t<ld.length;t++)Yu(ld[t],n)
break
case"source":Yu("error",n)
break
case"img":case"image":case"link":Yu("error",n),Yu("load",n)
break
case"details":Yu("toggle",n)
break
case"input":Yu("invalid",n),ue(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),ee(n)
break
case"select":Yu("invalid",n)
break
case"textarea":Yu("invalid",n),ce(n,r.value,r.defaultValue,r.children),ee(n)}"string"!=typeof(t=r.children)&&"number"!=typeof t&&"bigint"!=typeof t||n.textContent===""+t||!0===r.suppressHydrationWarning||uo(n.textContent,t)?(null!=r.popover&&(Yu("beforetoggle",n),Yu("toggle",n)),null!=r.onScroll&&Yu("scroll",n),null!=r.onScrollEnd&&Yu("scrollend",n),null!=r.onClick&&(n.onclick=oo),n=!0):n=!1,n||yn(e)}function bn(e){for(us=e.return;us;)switch(us.tag){case 5:case 13:return cs=!1,void 0
case 27:case 3:return cs=!0,void 0
default:us=us.return}}function wn(n){if(n!==us)return!1
if(!as)return bn(n),as=!0,!1
var t,r=n.tag
if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=n.type)&&"button"!==t)||vo(n.type,n.memoizedProps)),t=!t),t&&os&&yn(n),bn(n),13===r){if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(e(317))
e:{for(n=n.nextSibling,r=0;n;){if(8===n.nodeType)if("/$"===(t=n.data)){if(0===r){os=ko(n.nextSibling)
break e}r--}else"$"!==t&&"$!"!==t&&"$?"!==t||r++
n=n.nextSibling}os=null}}else 27===r?(r=os,yo(n.type)?(n=yd,yd=null,os=n):os=r):os=us?ko(n.stateNode.nextSibling):null
return!0}function kn(){os=us=null,as=!1}function gn(){var e=is
return null!==e&&(null===If?If=e:If.push.apply(If,e),is=null),e}function En(e){null===is?is=[e]:is.push(e)}function xn(e,n,t){h(fs,n.o),n.o=t}function Sn(e){e.o=fs.current,v(fs)}function Cn(e,n,t){for(;null!==e;){var r=e.alternate
if((e.childLanes&n)!==n?(e.childLanes|=n,null!==r&&(r.childLanes|=n)):null!==r&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break
e=e.return}}function _n(n,t,r,l){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var o=u.dependencies
if(null!==o){var a=u.child
o=o.firstContext
e:for(;null!==o;){var i=o
o=u
for(var c=0;c<t.length;c++)if(i.context===t[c]){o.lanes|=r,null!==(i=o.alternate)&&(i.lanes|=r),Cn(o.return,r,n),l||(a=null)
break e}o=i.next}}else if(18===u.tag){if(null===(a=u.return))throw Error(e(341))
a.lanes|=r,null!==(o=a.alternate)&&(o.lanes|=r),Cn(a,r,n),a=null}else a=u.child
if(null!==a)a.return=u
else for(a=u;null!==a;){if(a===n){a=null
break}if(null!==(u=a.sibling)){u.return=a.return,a=u
break}a=a.return}u=a}}function On(n,t,r,l){n=null
for(var u=t,o=!1;null!==u;){if(!o)if(524288&u.flags)o=!0
else if(262144&u.flags)break
if(10===u.tag){var a=u.alternate
if(null===a)throw Error(e(387))
if(null!==(a=a.memoizedProps)){var i=u.type
Oc(u.pendingProps.value,a.value)||(null!==n?n.push(i):n=[i])}}else if(u===Ka.current){if(null===(a=u.alternate))throw Error(e(387))
a.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(Sd):n=[Sd])}u=u.return}null!==n&&_n(t,n,r,l),t.flags|=262144}function Tn(e){for(e=e.firstContext;null!==e;){if(!Oc(e.context.o,e.memoizedValue))return!0
e=e.next}return!1}function Mn(e){ds=e,ps=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fn(e){return Dn(ds,e)}function Ln(e,n){return null===ds&&Mn(e),Dn(e,n)}function Dn(n,t){var r=t.o
if(t={context:t,memoizedValue:r,next:null},null===ps){if(null===n)throw Error(e(308))
ps=t,n.dependencies={lanes:0,firstContext:t},n.flags|=524288}else ps=ps.next=t
return r}function Rn(){return{controller:new vs,data:new Map,refCount:0}}function Pn(e){e.refCount--,0===e.refCount&&hs(ys,function(){e.controller.abort()})}function In(){if(0===--ws&&null!==bs){null!==gs&&(gs.status="fulfilled")
var e=bs
bs=null,ks=0,gs=null
for(var n=0;n<e.length;n++)(0,e[n])()}}function jn(){var e=xs.current
return null!==e?e:wf.pooledCache}function An(e,n){h(xs,null===n?xs.current:n.pool)}function Bn(){var e=jn()
return null===e?null:{parent:ms.o,pool:e}}function Nn(e){return"fulfilled"===(e=e.status)||"rejected"===e}function $n(){}function Un(n,t,r){switch(void 0===(r=n[r])?n.push(t):r!==t&&(t.then($n,$n),t=r),t.status){case"fulfilled":return t.value
case"rejected":throw zn(n=t.reason),n
default:if("string"==typeof t.status)t.then($n,$n)
else{if(null!==(n=wf)&&100<n.shellSuspendCounter)throw Error(e(482));(n=t).status="pending",n.then(function(e){if("pending"===t.status){var n=t
n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t
n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value
case"rejected":throw zn(n=t.reason),n}throw Ts=t,Ss}}function Hn(){if(null===Ts)throw Error(e(459))
var n=Ts
return Ts=null,n}function zn(n){if(n===Ss||n===_s)throw Error(e(483))}function Vn(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wn(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Kn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xn(e,n,t){var r=e.updateQueue
if(null===r)return null
if(r=r.shared,2&bf){var l=r.pending
return null===l?n.next=n:(n.next=l.next,l.next=n),r.pending=n,n=nn(e),en(e,null,t),n}return Je(e,r,n,t),nn(e)}function Gn(e,n,t){if(null!==(n=n.updateQueue)&&(n=n.shared,4194048&t)){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,R(e,t)}}function Yn(e,n){var t=e.updateQueue,r=e.alternate
if(null!==r&&t===(r=r.updateQueue)){var l=null,u=null
if(null!==(t=t.firstBaseUpdate)){do{var o={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null}
null===u?l=u=o:u=u.next=o,t=t.next}while(null!==t)
null===u?l=u=n:u=u.next=n}else l=u=n
return t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},e.updateQueue=t,void 0}null===(e=t.lastBaseUpdate)?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function qn(){if(Fs&&null!==gs)throw gs}function Jn(e,n,t,r){Fs=!1
var l=e.updateQueue
Ms=!1
var u=l.firstBaseUpdate,o=l.lastBaseUpdate,a=l.shared.pending
if(null!==a){l.shared.pending=null
var i=a,c=i.next
i.next=null,null===o?u=c:o.next=c,o=i
var s=e.alternate
null!==s&&(a=(s=s.updateQueue).lastBaseUpdate)!==o&&(null===a?s.firstBaseUpdate=c:a.next=c,s.lastBaseUpdate=i)}if(null!==u){var f=l.baseState
for(o=0,s=c=i=null,a=u;;){var d=-536870913&a.lane,p=d!==a.lane
if(p?(gf&d)===d:(r&d)===d){0!==d&&d===ks&&(Fs=!0),null!==s&&(s=s.next={lane:0,tag:a.tag,payload:a.payload,callback:null,next:null})
e:{var v=e,h=a
d=n
var y=t
switch(h.tag){case 1:if("function"==typeof(v=h.payload)){f=v.call(y,f,d)
break e}f=v
break e
case 3:v.flags=-65537&v.flags|128
case 0:if(null==(d="function"==typeof(v=h.payload)?v.call(y,f,d):v))break e
f=ba({},f,d)
break e
case 2:Ms=!0}}null!==(d=a.callback)&&(e.flags|=64,p&&(e.flags|=8192),null===(p=l.callbacks)?l.callbacks=[d]:p.push(d))}else p={lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===s?(c=s=p,i=f):s=s.next=p,o|=d
if(null===(a=a.next)){if(null===(a=l.shared.pending))break
a=(p=a).next,p.next=null,l.lastBaseUpdate=p,l.shared.pending=null}1}null===s&&(i=f),l.baseState=i,l.firstBaseUpdate=c,l.lastBaseUpdate=s,null===u&&(l.shared.lanes=0),Mf|=o,e.lanes=o,e.memoizedState=f}}function Qn(n,t){if("function"!=typeof n)throw Error(e(191,n))
n.call(t)}function Zn(e,n){var t=e.callbacks
if(null!==t)for(e.callbacks=null,e=0;e<t.length;e++)Qn(t[e],n)}function et(e,n){h(Ds,e=Of),h(Ls,n),Of=e|n.baseLanes}function nt(){h(Ds,Of),h(Ls,Ls.current)}function tt(){Of=Ds.current,v(Ls),v(Ds)}function rt(){throw Error(e(321))}function lt(e,n){if(null===n)return!1
for(var t=0;t<n.length&&t<e.length;t++)if(!Oc(e[t],n[t]))return!1
return!0}function ut(e,n,t,r,l,u){return Rs=u,Ps=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Ba.H=null===e||null===e.memoizedState?Ws:Ks,Ns=!1,u=t(r,l),Ns=!1,Bs&&(u=at(n,t,r,l)),ot(e),u}function ot(n){Ba.H=Vs
var t=null!==Is&&null!==Is.next
if(Rs=0,js=Is=Ps=null,As=!1,Us=0,Hs=null,t)throw Error(e(300))
null===n||lf||null!==(n=n.dependencies)&&Tn(n)&&(lf=!0)}function at(n,t,r,l){Ps=n
var u=0
do{if(Bs&&(Hs=null),Us=0,Bs=!1,25<=u)throw Error(e(301))
if(u+=1,js=Is=null,null!=n.updateQueue){var o=n.updateQueue
o.lastEffect=null,o.events=null,o.stores=null,null!=o.memoCache&&(o.memoCache.index=0)}Ba.H=Xs,o=t(r,l)}while(Bs)
return o}function it(){var e=Ba.H,n=e.useState()[0]
return n="function"==typeof n.then?vt(n):n,e=e.useState()[0],(null!==Is?Is.memoizedState:null)!==e&&(Ps.flags|=1024),n}function ct(){var e=0!==$s
return $s=0,e}function st(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function ft(e){if(As){for(e=e.memoizedState;null!==e;){var n=e.queue
null!==n&&(n.pending=null),e=e.next}As=!1}Rs=0,js=Is=Ps=null,Bs=!1,Us=$s=0,Hs=null}function dt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===js?Ps.memoizedState=js=e:js=js.next=e,js}function pt(){if(null===Is){var n=Ps.alternate
n=null!==n?n.memoizedState:null}else n=Is.next
var t=null===js?Ps.memoizedState:js.next
if(null!==t)js=t,Is=n
else{if(null===n){if(null===Ps.alternate)throw Error(e(467))
throw Error(e(310))}n={memoizedState:(Is=n).memoizedState,baseState:Is.baseState,baseQueue:Is.baseQueue,queue:Is.queue,next:null},null===js?Ps.memoizedState=js=n:js=js.next=n}return js}function vt(e){var n=Us
return Us+=1,null===Hs&&(Hs=[]),e=Un(Hs,e,n),n=Ps,null===(null===js?n.memoizedState:js.next)&&(n=n.alternate,Ba.H=null===n||null===n.memoizedState?Ws:Ks),e}function ht(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return vt(n)
if(n.$$typeof===Oa)return Fn(n)}throw Error(e(438,String(n)))}function yt(e){var n=null,t=Ps.updateQueue
if(null!==t&&(n=t.memoCache),null==n){var r=Ps.alternate
null!==r&&null!==(r=r.updateQueue)&&null!=(r=r.memoCache)&&(n={data:r.data.map(function(e){return e.slice()}),index:0})}if(null==n&&(n={data:[],index:0}),null===t&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Ps.updateQueue=t),t.memoCache=n,void 0===(t=n.data[n.index]))for(t=n.data[n.index]=Array(e),r=0;r<e;r++)t[r]=Pa
return n.index++,t}function mt(e,n){return"function"==typeof n?n(e):n}function bt(e){return wt(pt(),Is,e)}function wt(n,t,r){var l=n.queue
if(null===l)throw Error(e(311))
l.lastRenderedReducer=r
var u=n.baseQueue,o=l.pending
if(null!==o){if(null!==u){var a=u.next
u.next=o.next,o.next=a}t.baseQueue=u=o,l.pending=null}if(o=n.baseState,null===u)n.memoizedState=o
else{var i=a=null,c=null,s=t=u.next,f=!1
do{var d=-536870913&s.lane
if(d!==s.lane?(gf&d)===d:(Rs&d)===d){var p=s.revertLane
if(0===p)null!==c&&(c=c.next={lane:0,revertLane:0,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}),d===ks&&(f=!0)
else{if((Rs&p)===p){s=s.next,p===ks&&(f=!0)
continue}d={lane:0,revertLane:s.revertLane,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},null===c?(i=c=d,a=o):c=c.next=d,Ps.lanes|=p,Mf|=p}d=s.action,Ns&&r(o,d),o=s.hasEagerState?s.eagerState:r(o,d)}else p={lane:d,revertLane:s.revertLane,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},null===c?(i=c=p,a=o):c=c.next=p,Ps.lanes|=d,Mf|=d
s=s.next}while(null!==s&&s!==t)
if(null===c?a=o:c.next=i,!Oc(o,n.memoizedState)&&(lf=!0,f&&null!==(r=gs)))throw r
n.memoizedState=o,n.baseState=a,n.baseQueue=c,l.lastRenderedState=o}return null===u&&(l.lanes=0),[n.memoizedState,l.dispatch]}function kt(n){var t=pt(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var l=r.dispatch,u=r.pending,o=t.memoizedState
if(null!==u){r.pending=null
var a=u=u.next
do{o=n(o,a.action),a=a.next}while(a!==u)
Oc(o,t.memoizedState)||(lf=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),r.lastRenderedState=o}return[o,l]}function gt(n,t,r){var l=Ps,u=pt(),o=as
if(o){if(void 0===r)throw Error(e(407))
r=r()}else r=t()
var a=!Oc((Is||u).memoizedState,r)
if(a&&(u.memoizedState=r,lf=!0),u=u.queue,Vt(2048,8,St.bind(null,l,u,n),[n]),u.getSnapshot!==t||a||null!==js&&1&js.memoizedState.tag){if(l.flags|=2048,Ut(9,{destroy:void 0,resource:void 0},xt.bind(null,l,u,r,t),null),null===wf)throw Error(e(349))
o||124&Rs||Et(l,t,r)}return r}function Et(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},null===(n=Ps.updateQueue)?(n={lastEffect:null,events:null,stores:null,memoCache:null},Ps.updateQueue=n,n.stores=[e]):null===(t=n.stores)?n.stores=[e]:t.push(e)}function xt(e,n,t,r){n.value=t,n.getSnapshot=r,Ct(n)&&_t(e)}function St(e,n,t){return t(function(){Ct(n)&&_t(e)})}function Ct(e){var n=e.getSnapshot
e=e.value
try{var t=n()
return!Oc(e,t)}catch(r){return!0}}function _t(e){var n=Ze(e,2)
null!==n&&lu(n,0,2)}function Ot(e){var n=dt()
if("function"==typeof e){var t=e
if(e=t(),Ns){x(!0)
try{t()}finally{x(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:e},n}function Tt(e,n,t,r){return e.baseState=t,wt(e,Is,"function"==typeof r?r:mt)}function Mt(n,t,r,l,u){if(hr(n))throw Error(e(485))
if(null!==(n=t.action)){var o={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}}
null!==Ba.T?r(!0):o.isTransition=!1,l(o),null===(r=t.pending)?(o.next=t.pending=o,Ft(t,o)):(o.next=r.next,t.pending=r.next=o)}}function Ft(e,n){var t=n.action,r=n.payload,l=e.state
if(n.isTransition){var u=Ba.T,o={}
Ba.T=o
try{var a=t(l,r),i=Ba.S
null!==i&&i(o,a),Lt(e,n,a)}catch(c){Rt(e,n,c)}finally{Ba.T=u}}else try{Lt(e,n,u=t(l,r))}catch(s){Rt(e,n,s)}}function Lt(e,n,t){null!==t&&"object"==typeof t&&"function"==typeof t.then?t.then(function(t){Dt(e,n,t)},function(t){return Rt(e,n,t)}):Dt(e,n,t)}function Dt(e,n,t){n.status="fulfilled",n.value=t,Pt(n),e.state=t,null!==(n=e.pending)&&((t=n.next)===n?e.pending=null:(t=t.next,n.next=t,Ft(e,t)))}function Rt(e,n,t){var r=e.pending
if(e.pending=null,null!==r){r=r.next
do{n.status="rejected",n.reason=t,Pt(n),n=n.next}while(n!==r)}e.action=null}function Pt(e){e=e.listeners
for(var n=0;n<e.length;n++)(0,e[n])()}function It(e,n){return n}function jt(e,n){if(as){var t=wf.formState
if(null!==t){e:{var r=Ps
if(as){if(os){n:{for(var l=os,u=cs;8!==l.nodeType;){if(!u){l=null
break n}if(null===(l=ko(l.nextSibling))){l=null
break n}}l="F!"===(u=l.data)||"F"===u?l:null}if(l){os=ko(l.nextSibling),r="F!"===l.data
break e}}yn(r)}r=!1}r&&(n=t[0])}}return(t=dt()).memoizedState=t.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:It,lastRenderedState:n},t.queue=r,t=dr.bind(null,Ps,r),r.dispatch=t,r=Ot(!1),u=vr.bind(null,Ps,!1,r.queue),l={state:n,dispatch:null,action:e,pending:null},(r=dt()).queue=l,t=Mt.bind(null,Ps,l,u,t),l.dispatch=t,r.memoizedState=e,[n,t,!1]}function At(e){return Bt(pt(),Is,e)}function Bt(e,n,t){if(n=wt(e,n,It)[0],e=bt(mt)[0],"object"==typeof n&&null!==n&&"function"==typeof n.then)try{var r=vt(n)}catch(o){if(o===Ss)throw _s
throw o}else r=n
var l=(n=pt()).queue,u=l.dispatch
return t!==n.memoizedState&&(Ps.flags|=2048,Ut(9,{destroy:void 0,resource:void 0},Nt.bind(null,l,t),null)),[r,u,e]}function Nt(e,n){e.action=n}function $t(e){var n=pt(),t=Is
if(null!==t)return Bt(n,t,e)
pt(),n=n.memoizedState
var r=(t=pt()).queue.dispatch
return t.memoizedState=e,[n,r,!1]}function Ut(e,n,t,r){return e={tag:e,create:t,deps:r,inst:n,next:null},null===(n=Ps.updateQueue)&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Ps.updateQueue=n),null===(t=n.lastEffect)?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e),e}function Ht(){return pt().memoizedState}function zt(e,n,t,r){var l=dt()
r=void 0===r?null:r,Ps.flags|=e,l.memoizedState=Ut(1|n,{destroy:void 0,resource:void 0},t,r)}function Vt(e,n,t,r){var l=pt()
r=void 0===r?null:r
var u=l.memoizedState.inst
null!==Is&&null!==r&&lt(r,Is.memoizedState.deps)?l.memoizedState=Ut(n,u,t,r):(Ps.flags|=e,l.memoizedState=Ut(1|n,u,t,r))}function Wt(e,n){zt(8390656,8,e,n)}function Kt(e,n){Vt(2048,8,e,n)}function Xt(e,n){return Vt(4,2,e,n)}function Gt(e,n){return Vt(4,4,e,n)}function Yt(e,n){if("function"==typeof n){e=e()
var t=n(e)
return function(){"function"==typeof t?t():n(null)}}if(null!=n)return e=e(),n.current=e,function(){n.current=null}}function qt(e,n,t){t=null!=t?t.concat([e]):null,Vt(4,4,Yt.bind(null,n,e),t)}function Jt(){}function Qt(e,n){var t=pt()
n=void 0===n?null:n
var r=t.memoizedState
return null!==n&&lt(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Zt(e,n){var t=pt()
n=void 0===n?null:n
var r=t.memoizedState
if(null!==n&&lt(n,r[1]))return r[0]
if(r=e(),Ns){x(!0)
try{e()}finally{x(!1)}}return t.memoizedState=[r,n],r}function er(e,n,t){return void 0===t||1073741824&Rs?e.memoizedState=n:(e.memoizedState=t,e=ru(),Ps.lanes|=e,Mf|=e,t)}function nr(e,n,t,r){return Oc(t,n)?t:null!==Ls.current?(e=er(e,t,r),Oc(e,n)||(lf=!0),e):42&Rs?(e=ru(),Ps.lanes|=e,Mf|=e,n):(lf=!0,e.memoizedState=t)}function tr(e,n,t,r,l){var u=Na.p
Na.p=0!==u&&8>u?u:8
var o=Ba.T,a={}
Ba.T=a,vr(e,!1,n,t)
try{var i=l(),c=Ba.S
null!==c&&c(a,i),null!==i&&"object"==typeof i&&"function"==typeof i.then?pr(e,n,function(e,n){var t=[],r={status:"pending",value:null,reason:null,then:function(e){t.push(e)}}
return e.then(function(){r.status="fulfilled",r.value=n
for(var e=0;e<t.length;e++)(0,t[e])(n)},function(e){for(r.status="rejected",r.reason=e,e=0;e<t.length;e++)(0,t[e])(void 0)}),r}(i,r),tu()):pr(e,n,r,tu())}catch(s){pr(e,n,{then:function(){},status:"rejected",reason:s},tu())}finally{Na.p=u,Ba.T=o}}function rr(){}function lr(n,t,r,l){if(5!==n.tag)throw Error(e(476))
var u=ur(n).queue
tr(n,u,t,$a,null===r?rr:function(){return or(n),r(l)})}function ur(e){var n=e.memoizedState
if(null!==n)return n
var t={}
return(n={memoizedState:$a,baseState:$a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:$a},next:null}).next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:t},next:null},e.memoizedState=n,null!==(e=e.alternate)&&(e.memoizedState=n),n}function or(e){pr(e,ur(e).next.queue,{},tu())}function ar(){return Fn(Sd)}function ir(){return pt().memoizedState}function cr(){return pt().memoizedState}function sr(e){for(var n=e.return;null!==n;){switch(n.tag){case 24:case 3:var t=tu(),r=Xn(n,e=Kn(t),t)
return null!==r&&(lu(r,0,t),Gn(r,n,t)),n={cache:Rn()},e.payload=n,void 0}n=n.return}}function fr(e,n,t){var r=tu()
t={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null},hr(e)?yr(n,t):null!==(t=Qe(e,n,t,r))&&(lu(t,0,r),mr(t,n,r))}function dr(e,n,t){pr(e,n,t,tu())}function pr(e,n,t,r){var l={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null}
if(hr(e))yr(n,l)
else{var u=e.alternate
if(0===e.lanes&&(null===u||0===u.lanes)&&null!==(u=n.lastRenderedReducer))try{var o=n.lastRenderedState,a=u(o,t)
if(l.hasEagerState=!0,l.eagerState=a,Oc(a,o))return Je(e,n,l,0),null===wf&&qe(),!1}catch(i){}if(null!==(t=Qe(e,n,l,r)))return lu(t,0,r),mr(t,n,r),!0}return!1}function vr(n,t,r,l){if(l={lane:2,revertLane:Wu(),action:l,hasEagerState:!1,eagerState:null,next:null},hr(n)){if(t)throw Error(e(479))}else null!==(t=Qe(n,r,l,2))&&lu(t,0,2)}function hr(e){var n=e.alternate
return e===Ps||null!==n&&n===Ps}function yr(e,n){Bs=As=!0
var t=e.pending
null===t?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function mr(e,n,t){if(4194048&t){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,R(e,t)}}function br(e){var n=Ys
return Ys+=1,null===Gs&&(Gs=[]),Un(Gs,e,n)}function wr(e,n){n=n.props.ref,e.ref=void 0!==n?n:null}function kr(n,t){if(t.$$typeof===wa)throw Error(e(525))
throw n=Object.prototype.toString.call(t),Error(e(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n))}function gr(e){return(0,e.u)(e.l)}function Er(n){function t(e,t){if(n){var r=e.deletions
null===r?(e.deletions=[t],e.flags|=16):r.push(t)}}function r(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function l(e){for(var n=new Map;null!==e;)null!==e.key?n.set(e.key,e):n.set(e.index,e),e=e.sibling
return n}function u(e,n){return(e=un(e,n)).index=0,e.sibling=null,e}function o(e,t,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<t?(e.flags|=67108866,t):r:(e.flags|=67108866,t):(e.flags|=1048576,t)}function a(e){return n&&null===e.alternate&&(e.flags|=67108866),e}function c(e,n,t,r){return null===n||6!==n.tag?((n=sn(t,e.mode,r)).return=e,n):((n=u(n,t)).return=e,n)}function s(e,n,t,r){var l=t.type
return l===Ea?d(e,n,t.props.children,r,t.key):null!==n&&(n.elementType===l||"object"==typeof l&&null!==l&&l.$$typeof===Da&&gr(l)===n.type)?(wr(n=u(n,t.props),t),n.return=e,n):(wr(n=an(t.type,t.key,t.props,null,e.mode,r),t),n.return=e,n)}function f(e,n,t,r){return null===n||4!==n.tag||n.stateNode.containerInfo!==t.containerInfo||n.stateNode.implementation!==t.implementation?((n=fn(t,e.mode,r)).return=e,n):((n=u(n,t.children||[])).return=e,n)}function d(e,n,t,r,l){return null===n||7!==n.tag?((n=cn(t,e.mode,r,l)).return=e,n):((n=u(n,t)).return=e,n)}function p(e,n,t){if("string"==typeof n&&""!==n||"number"==typeof n||"bigint"==typeof n)return(n=sn(""+n,e.mode,t)).return=e,n
if("object"==typeof n&&null!==n){switch(n.$$typeof){case ka:return wr(t=an(n.type,n.key,n.props,null,e.mode,t),n),t.return=e,t
case ga:return(n=fn(n,e.mode,t)).return=e,n
case Da:return p(e,n=(0,n.u)(n.l),t)}if(Aa(n)||i(n))return(n=cn(n,e.mode,t,null)).return=e,n
if("function"==typeof n.then)return p(e,br(n),t)
if(n.$$typeof===Oa)return p(e,Ln(e,n),t)
kr(e,n)}return null}function v(e,n,t,r){var l=null!==n?n.key:null
if("string"==typeof t&&""!==t||"number"==typeof t||"bigint"==typeof t)return null!==l?null:c(e,n,""+t,r)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case ka:return t.key===l?s(e,n,t,r):null
case ga:return t.key===l?f(e,n,t,r):null
case Da:return v(e,n,t=(l=t.u)(t.l),r)}if(Aa(t)||i(t))return null!==l?null:d(e,n,t,r,null)
if("function"==typeof t.then)return v(e,n,br(t),r)
if(t.$$typeof===Oa)return v(e,n,Ln(e,t),r)
kr(e,t)}return null}function h(e,n,t,r,l){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return c(n,e=e.get(t)||null,""+r,l)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case ka:return s(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case ga:return f(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case Da:return h(e,n,t,r=(0,r.u)(r.l),l)}if(Aa(r)||i(r))return d(n,e=e.get(t)||null,r,l,null)
if("function"==typeof r.then)return h(e,n,t,br(r),l)
if(r.$$typeof===Oa)return h(e,n,t,Ln(n,r),l)
kr(n,r)}return null}function y(c,s,f,d){if("object"==typeof f&&null!==f&&f.type===Ea&&null===f.key&&(f=f.props.children),"object"==typeof f&&null!==f){switch(f.$$typeof){case ka:e:{for(var m=f.key;null!==s;){if(s.key===m){if((m=f.type)===Ea){if(7===s.tag){r(c,s.sibling),(d=u(s,f.props.children)).return=c,c=d
break e}}else if(s.elementType===m||"object"==typeof m&&null!==m&&m.$$typeof===Da&&gr(m)===s.type){r(c,s.sibling),wr(d=u(s,f.props),f),d.return=c,c=d
break e}r(c,s)
break}t(c,s),s=s.sibling}f.type===Ea?((d=cn(f.props.children,c.mode,d,f.key)).return=c,c=d):(wr(d=an(f.type,f.key,f.props,null,c.mode,d),f),d.return=c,c=d)}return a(c)
case ga:e:{for(m=f.key;null!==s;){if(s.key===m){if(4===s.tag&&s.stateNode.containerInfo===f.containerInfo&&s.stateNode.implementation===f.implementation){r(c,s.sibling),(d=u(s,f.children||[])).return=c,c=d
break e}r(c,s)
break}t(c,s),s=s.sibling}(d=fn(f,c.mode,d)).return=c,c=d}return a(c)
case Da:return y(c,s,f=(m=f.u)(f.l),d)}if(Aa(f))return function(e,u,a,i){for(var c=null,s=null,f=u,d=u=0,y=null;null!==f&&d<a.length;d++){f.index>d?(y=f,f=null):y=f.sibling
var m=v(e,f,a[d],i)
if(null===m){null===f&&(f=y)
break}n&&f&&null===m.alternate&&t(e,f),u=o(m,u,d),null===s?c=m:s.sibling=m,s=m,f=y}if(d===a.length)return r(e,f),as&&dn(e,d),c
if(null===f){for(;d<a.length;d++)null!==(f=p(e,a[d],i))&&(u=o(f,u,d),null===s?c=f:s.sibling=f,s=f)
return as&&dn(e,d),c}for(f=l(f);d<a.length;d++)null!==(y=h(f,e,d,a[d],i))&&(n&&null!==y.alternate&&f.delete(null===y.key?d:y.key),u=o(y,u,d),null===s?c=y:s.sibling=y,s=y)
return n&&f.forEach(function(n){return t(e,n)}),as&&dn(e,d),c}(c,s,f,d)
if(i(f)){if("function"!=typeof(m=i(f)))throw Error(e(150))
return function(u,a,i,c){if(null==i)throw Error(e(151))
for(var s=null,f=null,d=a,y=a=0,m=null,b=i.next();null!==d&&!b.done;y++,b=i.next()){d.index>y?(m=d,d=null):m=d.sibling
var w=v(u,d,b.value,c)
if(null===w){null===d&&(d=m)
break}n&&d&&null===w.alternate&&t(u,d),a=o(w,a,y),null===f?s=w:f.sibling=w,f=w,d=m}if(b.done)return r(u,d),as&&dn(u,y),s
if(null===d){for(;!b.done;y++,b=i.next())null!==(b=p(u,b.value,c))&&(a=o(b,a,y),null===f?s=b:f.sibling=b,f=b)
return as&&dn(u,y),s}for(d=l(d);!b.done;y++,b=i.next())null!==(b=h(d,u,y,b.value,c))&&(n&&null!==b.alternate&&d.delete(null===b.key?y:b.key),a=o(b,a,y),null===f?s=b:f.sibling=b,f=b)
return n&&d.forEach(function(e){return t(u,e)}),as&&dn(u,y),s}(c,s,f=m.call(f),d)}if("function"==typeof f.then)return y(c,s,br(f),d)
if(f.$$typeof===Oa)return y(c,s,Ln(c,f),d)
kr(c,f)}return"string"==typeof f&&""!==f||"number"==typeof f||"bigint"==typeof f?(f=""+f,null!==s&&6===s.tag?(r(c,s.sibling),(d=u(s,f)).return=c,c=d):(r(c,s),(d=sn(f,c.mode,d)).return=c,c=d),a(c)):r(c,s)}return function(e,n,t,r){try{Ys=0
var l=y(e,n,t,r)
return Gs=null,l}catch(o){if(o===Ss||o===_s)throw o
var u=rn(29,o,null,e.mode)
return u.lanes=r,u.return=e,u}}}function xr(e){var n=e.alternate
h(ef,1&ef.current),h(Qs,e),null===Zs&&(null===n||null!==Ls.current||null!==n.memoizedState)&&(Zs=e)}function Sr(e){if(22===e.tag){if(h(ef,ef.current),h(Qs,e),null===Zs){var n=e.alternate
null!==n&&null!==n.memoizedState&&(Zs=e)}}else Cr()}function Cr(){h(ef,ef.current),h(Qs,Qs.current)}function _r(e){v(Qs),Zs===e&&(Zs=null),v(ef)}function Or(e){for(var n=e;null!==n;){if(13===n.tag){var t=n.memoizedState
if(null!==t&&(null===(t=t.dehydrated)||"$?"===t.data||wo(t)))return n}else if(19===n.tag&&void 0!==n.memoizedProps.revealOrder){if(128&n.flags)return n}else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return null
n=n.return}n.sibling.return=n.return,n=n.sibling}return null}function Tr(e,n,t,r){t=null==(t=t(r,n=e.memoizedState))?n:ba({},n,t),e.memoizedState=t,0===e.lanes&&(e.updateQueue.baseState=t)}function Mr(e,n,t,r,l,u,o){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,u,o):!(n.prototype&&n.prototype.isPureReactComponent&&Ne(t,r)&&Ne(l,u))}function Fr(e,n,t,r){e=n.state,"function"==typeof n.componentWillReceiveProps&&n.componentWillReceiveProps(t,r),"function"==typeof n.UNSAFE_componentWillReceiveProps&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&nf.enqueueReplaceState(n,n.state,null)}function Lr(e,n){var t=n
if("ref"in n)for(var r in t={},n)"ref"!==r&&(t[r]=n[r])
if(e=e.defaultProps)for(var l in t===n&&(t=ba({},t)),e)void 0===t[l]&&(t[l]=e[l])
return t}function Dr(e){tf(e)}function Rr(e){void 0}function Pr(e){tf(e)}function Ir(e,n){try{(0,e.onUncaughtError)(n.value,{componentStack:n.stack})}catch(t){setTimeout(function(){throw t})}}function jr(e,n,t){try{(0,e.onCaughtError)(t.value,{componentStack:t.stack,errorBoundary:1===n.tag?n.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Ar(e,n,t){return(t=Kn(t)).tag=3,t.payload={element:null},t.callback=function(){Ir(e,n)},t}function Br(e){return(e=Kn(e)).tag=3,e}function Nr(e,n,t,r){var l=t.type.getDerivedStateFromError
if("function"==typeof l){var u=r.value
e.payload=function(){return l(u)},e.callback=function(){jr(n,t,r)}}var o=t.stateNode
null!==o&&"function"==typeof o.componentDidCatch&&(e.callback=function(){jr(n,t,r),"function"!=typeof l&&(null===$f?$f=new Set([this]):$f.add(this))
var e=r.stack
this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}function $r(e,n,t,r){n.child=null===e?Js(n,null,t,r):qs(n,e.child,t,r)}function Ur(e,n,t,r,l){t=t.render
var u=n.ref
if("ref"in r){var o={}
for(var a in r)"ref"!==a&&(o[a]=r[a])}else o=r
return Mn(n),r=ut(e,n,t,o,u,l),a=ct(),null===e||lf?(as&&a&&vn(n),n.flags|=1,$r(e,n,r,l),n.child):(st(e,n,l),ol(e,n,l))}function Hr(e,n,t,r,l){if(null===e){var u=t.type
return"function"!=typeof u||ln(u)||void 0!==u.defaultProps||null!==t.compare?((e=an(t.type,null,r,n,n.mode,l)).ref=n.ref,e.return=n,n.child=e):(n.tag=15,n.type=u,zr(e,n,u,r,l))}if(u=e.child,!al(e,l)){var o=u.memoizedProps
if((t=null!==(t=t.compare)?t:Ne)(o,r)&&e.ref===n.ref)return ol(e,n,l)}return n.flags|=1,(e=un(u,r)).ref=n.ref,e.return=n,n.child=e}function zr(e,n,t,r,l){if(null!==e){var u=e.memoizedProps
if(Ne(u,r)&&e.ref===n.ref){if(lf=!1,n.pendingProps=r=u,!al(e,l))return n.lanes=e.lanes,ol(e,n,l)
131072&e.flags&&(lf=!0)}}return Xr(e,n,t,r,l)}function Vr(e,n,t){var r=n.pendingProps,l=r.children,u=null!==e?e.memoizedState:null
if("hidden"===r.mode){if(128&n.flags){if(r=null!==u?u.baseLanes|t:t,null!==e){for(l=n.child=e.child,u=0;null!==l;)u=u|l.lanes|l.childLanes,l=l.sibling
n.childLanes=u&~r}else n.childLanes=0,n.child=null
return Wr(e,n,r,t)}if(!(536870912&t))return n.lanes=n.childLanes=536870912,Wr(e,n,null!==u?u.baseLanes|t:t,t)
n.memoizedState={baseLanes:0,cachePool:null},null!==e&&An(0,null!==u?u.cachePool:null),null!==u?et(n,u):nt(),Sr(n)}else null!==u?(An(0,u.cachePool),et(n,u),Cr(),n.memoizedState=null):(null!==e&&An(0,null),nt(),Cr())
return $r(e,n,l,t),n.child}function Wr(e,n,t,r){var l=jn()
return l=null===l?null:{parent:ms.o,pool:l},n.memoizedState={baseLanes:t,cachePool:l},null!==e&&An(0,null),nt(),Sr(n),null!==e&&On(e,n,r,!0),null}function Kr(n,t){var r=t.ref
if(null===r)null!==n&&null!==n.ref&&(t.flags|=4194816)
else{if("function"!=typeof r&&"object"!=typeof r)throw Error(e(284))
null!==n&&n.ref===r||(t.flags|=4194816)}}function Xr(e,n,t,r,l){return Mn(n),t=ut(e,n,t,r,void 0,l),r=ct(),null===e||lf?(as&&r&&vn(n),n.flags|=1,$r(e,n,t,l),n.child):(st(e,n,l),ol(e,n,l))}function Gr(e,n,t,r,l,u){return Mn(n),n.updateQueue=null,t=at(n,r,t,l),ot(e),r=ct(),null===e||lf?(as&&r&&vn(n),n.flags|=1,$r(e,n,t,u),n.child):(st(e,n,u),ol(e,n,u))}function Yr(e,n,t,r,l){if(Mn(n),null===n.stateNode){var u=Yc,o=t.contextType
"object"==typeof o&&null!==o&&(u=Fn(o)),u=new t(r,u),n.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=nf,n.stateNode=u,u._=n,(u=n.stateNode).props=r,u.state=n.memoizedState,u.refs={},Vn(n),o=t.contextType,u.context="object"==typeof o&&null!==o?Fn(o):Yc,u.state=n.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(Tr(n,t,o,r),u.state=n.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(o=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),o!==u.state&&nf.enqueueReplaceState(u,u.state,null),Jn(n,r,u,l),qn(),u.state=n.memoizedState),"function"==typeof u.componentDidMount&&(n.flags|=4194308),r=!0}else if(null===e){u=n.stateNode
var a=n.memoizedProps,i=Lr(t,a)
u.props=i
var c=u.context,s=t.contextType
o=Yc,"object"==typeof s&&null!==s&&(o=Fn(s))
var f=t.getDerivedStateFromProps
s="function"==typeof f||"function"==typeof u.getSnapshotBeforeUpdate,a=n.pendingProps!==a,s||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(a||c!==o)&&Fr(n,u,r,o),Ms=!1
var d=n.memoizedState
u.state=d,Jn(n,r,u,l),qn(),c=n.memoizedState,a||d!==c||Ms?("function"==typeof f&&(Tr(n,t,f,r),c=n.memoizedState),(i=Ms||Mr(n,t,i,r,d,c,o))?(s||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(n.flags|=4194308)):("function"==typeof u.componentDidMount&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=c),u.props=r,u.state=c,u.context=o,r=i):("function"==typeof u.componentDidMount&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,Wn(e,n),s=Lr(t,o=n.memoizedProps),u.props=s,f=n.pendingProps,d=u.context,c=t.contextType,i=Yc,"object"==typeof c&&null!==c&&(i=Fn(c)),(c="function"==typeof(a=t.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o!==f||d!==i)&&Fr(n,u,r,i),Ms=!1,d=n.memoizedState,u.state=d,Jn(n,r,u,l),qn()
var p=n.memoizedState
o!==f||d!==p||Ms||null!==e&&null!==e.dependencies&&Tn(e.dependencies)?("function"==typeof a&&(Tr(n,t,a,r),p=n.memoizedState),(s=Ms||Mr(n,t,s,r,d,p,i)||null!==e&&null!==e.dependencies&&Tn(e.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(r,p,i),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(r,p,i)),"function"==typeof u.componentDidUpdate&&(n.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(n.flags|=1024)):("function"!=typeof u.componentDidUpdate||o===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=p),u.props=r,u.state=p,u.context=i,r=s):("function"!=typeof u.componentDidUpdate||o===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),r=!1)}return u=r,Kr(e,n),r=!!(128&n.flags),u||r?(u=n.stateNode,t=r&&"function"!=typeof t.getDerivedStateFromError?null:u.render(),n.flags|=1,null!==e&&r?(n.child=qs(n,e.child,null,l),n.child=qs(n,null,t,l)):$r(e,n,t,l),n.memoizedState=u.state,e=n.child):e=ol(e,n,l),e}function qr(e,n,t,r){return kn(),n.flags|=256,$r(e,n,t,r),n.child}function Jr(e){return{baseLanes:e,cachePool:Bn()}}function Qr(e,n,t){return e=null!==e?e.childLanes&~t:0,n&&(e|=Df),e}function Zr(n,t,r){var l,u=t.pendingProps,o=!1,a=!!(128&t.flags)
if((l=a)||(l=(null===n||null!==n.memoizedState)&&!!(2&ef.current)),l&&(o=!0,t.flags&=-129),l=!!(32&t.flags),t.flags&=-33,null===n){if(as){if(o?xr(t):Cr(),as){var i,c=os
if(i=c){e:{for(i=c,c=cs;8!==i.nodeType;){if(!c){c=null
break e}if(null===(i=ko(i.nextSibling))){c=null
break e}}c=i}null!==c?(t.memoizedState={dehydrated:c,treeContext:null!==ts?{id:rs,overflow:ls}:null,retryLane:536870912,hydrationErrors:null},(i=rn(18,null,null,0)).stateNode=c,i.return=t,t.child=i,us=t,os=null,i=!0):i=!1}i||yn(t)}if(null!==(c=t.memoizedState)&&null!==(c=c.dehydrated))return wo(c)?t.lanes=32:t.lanes=536870912,null
_r(t)}return c=u.children,u=u.fallback,o?(Cr(),c=nl({mode:"hidden",children:c},o=t.mode),u=cn(u,o,r,null),c.return=t,u.return=t,c.sibling=u,t.child=c,(o=t.child).memoizedState=Jr(r),o.childLanes=Qr(n,l,r),t.memoizedState=uf,u):(xr(t),el(t,c))}if(null!==(i=n.memoizedState)&&null!==(c=i.dehydrated)){if(a)256&t.flags?(xr(t),t.flags&=-257,t=tl(n,t,r)):null!==t.memoizedState?(Cr(),t.child=n.child,t.flags|=128,t=null):(Cr(),o=u.fallback,c=t.mode,u=nl({mode:"visible",children:u.children},c),(o=cn(o,c,r,null)).flags|=2,u.return=t,o.return=t,u.sibling=o,t.child=u,qs(t,n.child,null,r),(u=t.child).memoizedState=Jr(r),u.childLanes=Qr(n,l,r),t.memoizedState=uf,t=o)
else if(xr(t),wo(c)){if(l=c.nextSibling&&c.nextSibling.dataset)var s=l.dgst
l=s,(u=Error(e(419))).stack="",u.digest=l,En({value:u,source:null,stack:null}),t=tl(n,t,r)}else if(lf||On(n,t,r,!1),l=0!==(r&n.childLanes),lf||l){if(null!==(l=wf)&&0!==(u=0!==((u=42&(u=r&-r)?1:P(u))&(l.suspendedLanes|r))?0:u)&&u!==i.retryLane)throw i.retryLane=u,Ze(n,u),lu(l,0,u),rf
"$?"===c.data||hu(),t=tl(n,t,r)}else"$?"===c.data?(t.flags|=192,t.child=n.child,t=null):(n=i.treeContext,os=ko(c.nextSibling),us=t,as=!0,is=null,cs=!1,null!==n&&(es[ns++]=rs,es[ns++]=ls,es[ns++]=ts,rs=n.id,ls=n.overflow,ts=t),(t=el(t,u.children)).flags|=4096)
return t}return o?(Cr(),o=u.fallback,c=t.mode,s=(i=n.child).sibling,(u=un(i,{mode:"hidden",children:u.children})).subtreeFlags=65011712&i.subtreeFlags,null!==s?o=un(s,o):(o=cn(o,c,r,null)).flags|=2,o.return=t,u.return=t,u.sibling=o,t.child=u,u=o,o=t.child,null===(c=n.child.memoizedState)?c=Jr(r):(null!==(i=c.cachePool)?(s=ms.o,i=i.parent!==s?{parent:s,pool:s}:i):i=Bn(),c={baseLanes:c.baseLanes|r,cachePool:i}),o.memoizedState=c,o.childLanes=Qr(n,l,r),t.memoizedState=uf,u):(xr(t),n=(r=n.child).sibling,(r=un(r,{mode:"visible",children:u.children})).return=t,r.sibling=null,null!==n&&(null===(l=t.deletions)?(t.deletions=[n],t.flags|=16):l.push(n)),t.child=r,t.memoizedState=null,r)}function el(e,n){return(n=nl({mode:"visible",children:n},e.mode)).return=e,e.child=n}function nl(e,n){return(e=rn(22,e,null,n)).lanes=0,e.stateNode={k:1,O:null,F:null,R:null},e}function tl(e,n,t){return qs(n,e.child,null,t),(e=el(n,n.pendingProps.children)).flags|=2,n.memoizedState=null,e}function rl(e,n,t){e.lanes|=n
var r=e.alternate
null!==r&&(r.lanes|=n),Cn(e.return,n,t)}function ll(e,n,t,r,l){var u=e.memoizedState
null===u?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(u.isBackwards=n,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=t,u.tailMode=l)}function ul(e,n,t){var r=n.pendingProps,l=r.revealOrder,u=r.tail
if($r(e,n,r.children,t),2&(r=ef.current))r=1&r|2,n.flags|=128
else{if(null!==e&&128&e.flags)e:for(e=n.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&rl(e,t,n)
else if(19===e.tag)rl(e,t,n)
else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break e
for(;null===e.sibling;){if(null===e.return||e.return===n)break e
e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(h(ef,r),l){case"forwards":for(t=n.child,l=null;null!==t;)null!==(e=t.alternate)&&null===Or(e)&&(l=t),t=t.sibling
null===(t=l)?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),ll(n,!1,l,t,u)
break
case"backwards":for(t=null,l=n.child,n.child=null;null!==l;){if(null!==(e=l.alternate)&&null===Or(e)){n.child=l
break}e=l.sibling,l.sibling=t,t=l,l=e}ll(n,!0,t,null,u)
break
case"together":ll(n,!1,null,null,void 0)
break
default:n.memoizedState=null}return n.child}function ol(n,t,r){if(null!==n&&(t.dependencies=n.dependencies),Mf|=t.lanes,0===(r&t.childLanes)){if(null===n)return null
if(On(n,t,r,!1),0===(r&t.childLanes))return null}if(null!==n&&t.child!==n.child)throw Error(e(153))
if(null!==t.child){for(r=un(n=t.child,n.pendingProps),t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=un(n,n.pendingProps)).return=t
r.sibling=null}return t.child}function al(e,n){return 0!==(e.lanes&n)||!(null===(e=e.dependencies)||!Tn(e))}function il(n,t,r){if(null!==n)if(n.memoizedProps!==t.pendingProps)lf=!0
else{if(!(al(n,r)||128&t.flags))return lf=!1,function(e,n,t){switch(n.tag){case 3:y(n,n.stateNode.containerInfo),xn(0,ms,e.memoizedState.cache),kn()
break
case 27:case 5:g(n)
break
case 4:y(n,n.stateNode.containerInfo)
break
case 10:xn(0,n.type,n.memoizedProps.value)
break
case 13:var r=n.memoizedState
if(null!==r)return null!==r.dehydrated?(xr(n),n.flags|=128,null):0!==(t&n.child.childLanes)?Zr(e,n,t):(xr(n),null!==(e=ol(e,n,t))?e.sibling:null)
xr(n)
break
case 19:var l=!!(128&e.flags)
if((r=0!==(t&n.childLanes))||(On(e,n,t,!1),r=0!==(t&n.childLanes)),l){if(r)return ul(e,n,t)
n.flags|=128}if(null!==(l=n.memoizedState)&&(l.rendering=null,l.tail=null,l.lastEffect=null),h(ef,ef.current),r)break
return null
case 22:case 23:return n.lanes=0,Vr(e,n,t)
case 24:xn(0,ms,e.memoizedState.cache)}return ol(e,n,t)}(n,t,r)
lf=!!(131072&n.flags)}else lf=!1,as&&1048576&t.flags&&pn(t,Zc,t.index)
switch(t.lanes=0,t.tag){case 16:e:{n=t.pendingProps
var l=t.elementType,u=l.u
if(l=u(l.l),t.type=l,"function"!=typeof l){if(null!=l){if((u=l.$$typeof)===Ta){t.tag=11,t=Ur(null,t,l,n,r)
break e}if(u===La){t.tag=14,t=Hr(null,t,l,n,r)
break e}}throw t=c(l)||l,Error(e(306,t,""))}ln(l)?(n=Lr(l,n),t.tag=1,t=Yr(null,t,l,n,r)):(t.tag=0,t=Xr(null,t,l,n,r))}return t
case 0:return Xr(n,t,t.type,t.pendingProps,r)
case 1:return Yr(n,t,l=t.type,u=Lr(l,t.pendingProps),r)
case 3:e:{if(y(t,t.stateNode.containerInfo),null===n)throw Error(e(387))
l=t.pendingProps
var o=t.memoizedState
u=o.element,Wn(n,t),Jn(t,l,null,r)
var a=t.memoizedState
if(l=a.cache,xn(0,ms,l),l!==o.cache&&_n(t,[ms],r,!0),qn(),l=a.element,o.isDehydrated){if(o={element:l,isDehydrated:!1,cache:a.cache},t.updateQueue.baseState=o,t.memoizedState=o,256&t.flags){t=qr(n,t,l,r)
break e}if(l!==u){En(u=Ye(Error(e(424)),t)),t=qr(n,t,l,r)
break e}for(n=9===(n=t.stateNode.containerInfo).nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n,os=ko(n.firstChild),us=t,as=!0,is=null,cs=!0,r=Js(t,null,l,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(kn(),l===u){t=ol(n,t,r)
break e}$r(n,t,l,r)}t=t.child}return t
case 26:return Kr(n,t),null===n?(r=_o(t.type,null,t.pendingProps,null))?t.memoizedState=r:as||(r=t.type,n=t.pendingProps,(l=so(Wa.current).createElement(r))[hi]=t,l[yi]=n,co(l,r,n),H(l),t.stateNode=l):t.memoizedState=_o(t.type,n.memoizedProps,t.pendingProps,n.memoizedState),null
case 27:return g(t),null===n&&as&&(l=t.stateNode=Eo(t.type,t.pendingProps,Wa.current),us=t,cs=!0,u=os,yo(t.type)?(yd=u,os=ko(l.firstChild)):os=u),$r(n,t,t.pendingProps.children,r),Kr(n,t),null===n&&(t.flags|=4194304),t.child
case 5:return null===n&&as&&((u=l=os)&&(null!==(l=function(e,n,t,r){for(;1===e.nodeType;){var l=t
if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Ei])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break
return e
case"link":if("stylesheet"===(u=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break
if(u!==l.rel||e.getAttribute("href")!==(null==l.href||""===l.href?null:l.href)||e.getAttribute("crossorigin")!==(null==l.crossOrigin?null:l.crossOrigin)||e.getAttribute("title")!==(null==l.title?null:l.title))break
return e
case"style":if(e.hasAttribute("data-precedence"))break
return e
case"script":if(((u=e.getAttribute("src"))!==(null==l.src?null:l.src)||e.getAttribute("type")!==(null==l.type?null:l.type)||e.getAttribute("crossorigin")!==(null==l.crossOrigin?null:l.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break
return e
default:return e}}else{if("input"!==n||"hidden"!==e.type)return e
var u=null==l.name?null:""+l.name
if("hidden"===l.type&&e.getAttribute("name")===u)return e}if(null===(e=ko(e.nextSibling)))break}return null}(l,t.type,t.pendingProps,cs))?(t.stateNode=l,us=t,os=ko(l.firstChild),cs=!1,u=!0):u=!1),u||yn(t)),g(t),u=t.type,o=t.pendingProps,a=null!==n?n.memoizedProps:null,l=o.children,vo(u,o)?l=null:null!==a&&vo(u,a)&&(t.flags|=32),null!==t.memoizedState&&(u=ut(n,t,it,null,null,r),Sd.o=u),Kr(n,t),$r(n,t,l,r),t.child
case 6:return null===n&&as&&((n=r=os)&&(null!==(r=function(e,n,t){if(""===n)return null
for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null
if(null===(e=ko(e.nextSibling)))return null}return e}(r,t.pendingProps,cs))?(t.stateNode=r,us=t,os=null,n=!0):n=!1),n||yn(t)),null
case 13:return Zr(n,t,r)
case 4:return y(t,t.stateNode.containerInfo),l=t.pendingProps,null===n?t.child=qs(t,null,l,r):$r(n,t,l,r),t.child
case 11:return Ur(n,t,t.type,t.pendingProps,r)
case 7:return $r(n,t,t.pendingProps,r),t.child
case 8:case 12:return $r(n,t,t.pendingProps.children,r),t.child
case 10:return l=t.pendingProps,xn(0,t.type,l.value),$r(n,t,l.children,r),t.child
case 9:return u=t.type.t,l=t.pendingProps.children,Mn(t),l=l(u=Fn(u)),t.flags|=1,$r(n,t,l,r),t.child
case 14:return Hr(n,t,t.type,t.pendingProps,r)
case 15:return zr(n,t,t.type,t.pendingProps,r)
case 19:return ul(n,t,r)
case 31:return l=t.pendingProps,r=t.mode,l={mode:l.mode,children:l.children},null===n?((r=nl(l,r)).ref=t.ref,t.child=r,r.return=t,t=r):((r=un(n.child,l)).ref=t.ref,t.child=r,r.return=t,t=r),t
case 22:return Vr(n,t,r)
case 24:return Mn(t),l=Fn(ms),null===n?(null===(u=jn())&&(u=wf,o=Rn(),u.pooledCache=o,o.refCount++,null!==o&&(u.pooledCacheLanes|=r),u=o),t.memoizedState={parent:l,cache:u},Vn(t),xn(0,ms,u)):(0!==(n.lanes&r)&&(Wn(n,t),Jn(t,null,null,r),qn()),u=n.memoizedState,o=t.memoizedState,u.parent!==l?(u={parent:l,cache:l},t.memoizedState=u,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=u),xn(0,ms,l)):(l=o.cache,xn(0,ms,l),l!==u.cache&&_n(t,[ms],r,!0))),$r(n,t,t.pendingProps.children,r),t.child
case 29:throw t.pendingProps}throw Error(e(156,t.tag))}function cl(e){e.flags|=4}function sl(e,n){if("stylesheet"!==n.type||4&n.state.loading)e.flags&=-16777217
else if(e.flags|=16777216,!Bo(n)){if(null!==(n=Qs.current)&&((4194048&gf)===gf?null!==Zs:(62914560&gf)!==gf&&!(536870912&gf)||n!==Zs))throw Ts=Os,Cs
e.flags|=8192}}function fl(e,n){null!==n&&(e.flags|=4),16384&e.flags&&(n=22!==e.tag?M():536870912,e.lanes|=n,Rf|=n)}function dl(e,n){if(!as)switch(e.tailMode){case"hidden":n=e.tail
for(var t=null;null!==n;)null!==n.alternate&&(t=n),n=n.sibling
null===t?e.tail=null:t.sibling=null
break
case"collapsed":t=e.tail
for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling
null===r?n||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function pl(e){var n=null!==e.alternate&&e.alternate.child===e.child,t=0,r=0
if(n)for(var l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=65011712&l.subtreeFlags,r|=65011712&l.flags,l.return=e,l=l.sibling
else for(l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling
return e.subtreeFlags|=r,e.childLanes=t,n}function vl(n,t,r){var l=t.pendingProps
switch(hn(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return pl(t),null
case 3:return r=t.stateNode,l=null,null!==n&&(l=n.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Sn(ms),m(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==n&&null!==n.child||(wn(t)?cl(t):null===n||n.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,gn())),pl(t),null
case 26:return r=t.memoizedState,null===n?(cl(t),null!==r?(pl(t),sl(t,r)):(pl(t),t.flags&=-16777217)):r?r!==n.memoizedState?(cl(t),pl(t),sl(t,r)):(pl(t),t.flags&=-16777217):(n.memoizedProps!==l&&cl(t),pl(t),t.flags&=-16777217),null
case 27:E(t),r=Wa.current
var u=t.type
if(null!==n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if(!l){if(null===t.stateNode)throw Error(e(166))
return pl(t),null}n=za.current,wn(t)?mn(t):(n=Eo(u,l,r),t.stateNode=n,cl(t))}return pl(t),null
case 5:if(E(t),r=t.type,null!==n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if(!l){if(null===t.stateNode)throw Error(e(166))
return pl(t),null}if(n=za.current,wn(t))mn(t)
else{switch(u=so(Wa.current),n){case 1:n=u.createElementNS("http://www.w3.org/2000/svg",r)
break
case 2:n=u.createElementNS("http://www.w3.org/1998/Math/MathML",r)
break
default:switch(r){case"svg":n=u.createElementNS("http://www.w3.org/2000/svg",r)
break
case"math":n=u.createElementNS("http://www.w3.org/1998/Math/MathML",r)
break
case"script":(n=u.createElement("div")).innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)
break
case"select":n="string"==typeof l.is?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?n.multiple=!0:l.size&&(n.size=l.size)
break
default:n="string"==typeof l.is?u.createElement(r,{is:l.is}):u.createElement(r)}}n[hi]=t,n[yi]=l
e:for(u=t.child;null!==u;){if(5===u.tag||6===u.tag)n.appendChild(u.stateNode)
else if(4!==u.tag&&27!==u.tag&&null!==u.child){u.child.return=u,u=u.child
continue}if(u===t)break e
for(;null===u.sibling;){if(null===u.return||u.return===t)break e
u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=n
e:switch(co(n,r,l),r){case"button":case"input":case"select":case"textarea":n=!!l.autoFocus
break e
case"img":n=!0
break e
default:n=!1}n&&cl(t)}}return pl(t),t.flags&=-16777217,null
case 6:if(n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if("string"!=typeof l&&null===t.stateNode)throw Error(e(166))
if(n=Wa.current,wn(t)){if(n=t.stateNode,r=t.memoizedProps,l=null,null!==(u=us))switch(u.tag){case 27:case 5:l=u.memoizedProps}n[hi]=t,(n=!!(n.nodeValue===r||null!==l&&!0===l.suppressHydrationWarning||uo(n.nodeValue,r)))||yn(t)}else(n=so(n).createTextNode(l))[hi]=t,t.stateNode=n}return pl(t),null
case 13:if(l=t.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=wn(t),null!==l&&null!==l.dehydrated){if(null===n){if(!u)throw Error(e(318))
if(!(u=null!==(u=t.memoizedState)?u.dehydrated:null))throw Error(e(317))
u[hi]=t}else kn(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4
pl(t),u=!1}else u=gn(),null!==n&&null!==n.memoizedState&&(n.memoizedState.hydrationErrors=u),u=!0
if(!u)return 256&t.flags?(_r(t),t):(_r(t),null)}if(_r(t),128&t.flags)return t.lanes=r,t
if(r=null!==l,n=null!==n&&null!==n.memoizedState,r){u=null,null!==(l=t.child).alternate&&null!==l.alternate.memoizedState&&null!==l.alternate.memoizedState.cachePool&&(u=l.alternate.memoizedState.cachePool.pool)
var o=null
null!==l.memoizedState&&null!==l.memoizedState.cachePool&&(o=l.memoizedState.cachePool.pool),o!==u&&(l.flags|=2048)}return r!==n&&r&&(t.child.flags|=8192),fl(t,t.updateQueue),pl(t),null
case 4:return m(),null===n&&Ju(t.stateNode.containerInfo),pl(t),null
case 10:return Sn(t.type),pl(t),null
case 19:if(v(ef),null===(u=t.memoizedState))return pl(t),null
if(l=!!(128&t.flags),null===(o=u.rendering))if(l)dl(u,!1)
else{if(0!==Tf||null!==n&&128&n.flags)for(n=t.child;null!==n;){if(null!==(o=Or(n))){for(t.flags|=128,dl(u,!1),n=o.updateQueue,t.updateQueue=n,fl(t,n),t.subtreeFlags=0,n=r,r=t.child;null!==r;)on(r,n),r=r.sibling
return h(ef,1&ef.current|2),t.child}n=n.sibling}null!==u.tail&&Qa()>Bf&&(t.flags|=128,l=!0,dl(u,!1),t.lanes=4194304)}else{if(!l)if(null!==(n=Or(o))){if(t.flags|=128,l=!0,n=n.updateQueue,t.updateQueue=n,fl(t,n),dl(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!as)return pl(t),null}else 2*Qa()-u.renderingStartTime>Bf&&536870912!==r&&(t.flags|=128,l=!0,dl(u,!1),t.lanes=4194304)
u.isBackwards?(o.sibling=t.child,t.child=o):(null!==(n=u.last)?n.sibling=o:t.child=o,u.last=o)}return null!==u.tail?(t=u.tail,u.rendering=t,u.tail=t.sibling,u.renderingStartTime=Qa(),t.sibling=null,n=ef.current,h(ef,l?1&n|2:1&n),t):(pl(t),null)
case 22:case 23:return _r(t),tt(),l=null!==t.memoizedState,null!==n?null!==n.memoizedState!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?!!(536870912&r)&&!(128&t.flags)&&(pl(t),6&t.subtreeFlags&&(t.flags|=8192)):pl(t),null!==(r=t.updateQueue)&&fl(t,r.retryQueue),r=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(r=n.memoizedState.cachePool.pool),l=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(l=t.memoizedState.cachePool.pool),l!==r&&(t.flags|=2048),null!==n&&v(xs),null
case 24:return r=null,null!==n&&(r=n.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Sn(ms),pl(t),null
case 25:case 30:return null}throw Error(e(156,t.tag))}function hl(n,t){switch(hn(t),t.tag){case 1:return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 3:return Sn(ms),m(),65536&(n=t.flags)&&!(128&n)?(t.flags=-65537&n|128,t):null
case 26:case 27:case 5:return E(t),null
case 13:if(_r(t),null!==(n=t.memoizedState)&&null!==n.dehydrated){if(null===t.alternate)throw Error(e(340))
kn()}return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 19:return v(ef),null
case 4:return m(),null
case 10:return Sn(t.type),null
case 22:case 23:return _r(t),tt(),null!==n&&v(xs),65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 24:return Sn(ms),null
default:return null}}function yl(e,n){switch(hn(n),n.tag){case 3:Sn(ms),m()
break
case 26:case 27:case 5:E(n)
break
case 4:m()
break
case 13:_r(n)
break
case 19:v(ef)
break
case 10:Sn(n.type)
break
case 22:case 23:_r(n),tt(),null!==e&&v(xs)
break
case 24:Sn(ms)}}function ml(e,n){try{var t=n.updateQueue,r=null!==t?t.lastEffect:null
if(null!==r){var l=r.next
t=l
do{if((t.tag&e)===e){r=void 0
var u=t.create,o=t.inst
r=u(),o.destroy=r}t=t.next}while(t!==l)}}catch(a){Du(n,n.return,a)}}function bl(e,n,t){try{var r=n.updateQueue,l=null!==r?r.lastEffect:null
if(null!==l){var u=l.next
r=u
do{if((r.tag&e)===e){var o=r.inst,a=o.destroy
if(void 0!==a){o.destroy=void 0,l=n
var i=t,c=a
try{c()}catch(s){Du(l,i,s)}}}r=r.next}while(r!==u)}}catch(s){Du(n,n.return,s)}}function wl(e){var n=e.updateQueue
if(null!==n){var t=e.stateNode
try{Zn(n,t)}catch(r){Du(e,e.return,r)}}}function kl(e,n,t){t.props=Lr(e.type,e.memoizedProps),t.state=e.memoizedState
try{t.componentWillUnmount()}catch(r){Du(e,n,r)}}function gl(e,n){try{var t=e.ref
if(null!==t){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode
break
default:r=e.stateNode}"function"==typeof t?e.refCleanup=t(r):t.current=r}}catch(l){Du(e,n,l)}}function El(e,n){var t=e.ref,r=e.refCleanup
if(null!==t)if("function"==typeof r)try{r()}catch(l){Du(e,n,l)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"==typeof t)try{t(null)}catch(u){Du(e,n,u)}else t.current=null}function xl(e){var n=e.type,t=e.memoizedProps,r=e.stateNode
try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&r.focus()
break e
case"img":t.src?r.src=t.src:t.srcSet&&(r.srcset=t.srcSet)}}catch(l){Du(e,e.return,l)}}function Sl(n,t,r){try{var l=n.stateNode
!function(n,t,r,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break
case"input":var u=null,o=null,a=null,i=null,c=null,s=null,f=null
for(v in r){var d=r[v]
if(r.hasOwnProperty(v)&&null!=d)switch(v){case"checked":case"value":break
case"defaultValue":c=d
default:l.hasOwnProperty(v)||ao(n,t,v,null,l,d)}}for(var p in l){var v=l[p]
if(d=r[p],l.hasOwnProperty(p)&&(null!=v||null!=d))switch(p){case"type":o=v
break
case"name":u=v
break
case"checked":s=v
break
case"defaultChecked":f=v
break
case"value":a=v
break
case"defaultValue":i=v
break
case"children":case"dangerouslySetInnerHTML":if(null!=v)throw Error(e(137,t))
break
default:v!==d&&ao(n,t,p,v,l,d)}}return le(n,a,i,c,s,f,o,u),void 0
case"select":for(o in v=a=i=p=null,r)if(c=r[o],r.hasOwnProperty(o)&&null!=c)switch(o){case"value":break
case"multiple":v=c
default:l.hasOwnProperty(o)||ao(n,t,o,null,l,c)}for(u in l)if(o=l[u],c=r[u],l.hasOwnProperty(u)&&(null!=o||null!=c))switch(u){case"value":p=o
break
case"defaultValue":i=o
break
case"multiple":a=o
default:o!==c&&ao(n,t,u,o,l,c)}return t=i,r=a,l=v,null!=p?ae(n,!!r,p,!1):!!l!=!!r&&(null!=t?ae(n,!!r,t,!0):ae(n,!!r,r?[]:"",!1)),void 0
case"textarea":for(i in v=p=null,r)if(u=r[i],r.hasOwnProperty(i)&&null!=u&&!l.hasOwnProperty(i))switch(i){case"value":case"children":break
default:ao(n,t,i,null,l,u)}for(a in l)if(u=l[a],o=r[a],l.hasOwnProperty(a)&&(null!=u||null!=o))switch(a){case"value":p=u
break
case"defaultValue":v=u
break
case"children":break
case"dangerouslySetInnerHTML":if(null!=u)throw Error(e(91))
break
default:u!==o&&ao(n,t,a,u,l,o)}return ie(n,p,v),void 0
case"option":for(var h in r)p=r[h],r.hasOwnProperty(h)&&null!=p&&!l.hasOwnProperty(h)&&("selected"===h?n.selected=!1:ao(n,t,h,null,l,p))
for(c in l)p=l[c],v=r[c],!l.hasOwnProperty(c)||p===v||null==p&&null==v||("selected"===c?n.selected=p&&"function"!=typeof p&&"symbol"!=typeof p:ao(n,t,c,p,l,v))
return
case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in r)p=r[y],r.hasOwnProperty(y)&&null!=p&&!l.hasOwnProperty(y)&&ao(n,t,y,null,l,p)
for(s in l)if(p=l[s],v=r[s],l.hasOwnProperty(s)&&p!==v&&(null!=p||null!=v))switch(s){case"children":case"dangerouslySetInnerHTML":if(null!=p)throw Error(e(137,t))
break
default:ao(n,t,s,p,l,v)}return
default:if(pe(t)){for(var m in r)p=r[m],r.hasOwnProperty(m)&&void 0!==p&&!l.hasOwnProperty(m)&&io(n,t,m,void 0,l,p)
for(f in l)p=l[f],v=r[f],!l.hasOwnProperty(f)||p===v||void 0===p&&void 0===v||io(n,t,f,p,l,v)
return}}for(var b in r)p=r[b],r.hasOwnProperty(b)&&null!=p&&!l.hasOwnProperty(b)&&ao(n,t,b,null,l,p)
for(d in l)p=l[d],v=r[d],!l.hasOwnProperty(d)||p===v||null==p&&null==v||ao(n,t,d,p,l,v)}(l,n.type,r,t),l[yi]=t}catch(u){Du(n,n.return,u)}}function Cl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&yo(e.type)||4===e.tag}function _l(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Cl(e.return))return null
e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&yo(e.type))continue e
if(2&e.flags)continue e
if(null===e.child||4===e.tag)continue e
e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function Ol(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?(9===t.nodeType?t.body:"HTML"===t.nodeName?t.ownerDocument.body:t).insertBefore(e,n):((n=9===t.nodeType?t.body:"HTML"===t.nodeName?t.ownerDocument.body:t).appendChild(e),null!=(t=t.P)||null!==n.onclick||(n.onclick=oo))
else if(4!==r&&(27===r&&yo(e.type)&&(t=e.stateNode,n=null),null!==(e=e.child)))for(Ol(e,n,t),e=e.sibling;null!==e;)Ol(e,n,t),e=e.sibling}function Tl(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e)
else if(4!==r&&(27===r&&yo(e.type)&&(t=e.stateNode),null!==(e=e.child)))for(Tl(e,n,t),e=e.sibling;null!==e;)Tl(e,n,t),e=e.sibling}function Ml(e){var n=e.stateNode,t=e.memoizedProps
try{for(var r=e.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0])
co(n,r,t),n[hi]=e,n[yi]=t}catch(u){Du(e,e.return,u)}}function Fl(e,n,t){var r=t.flags
switch(t.tag){case 0:case 11:case 15:$l(e,t),4&r&&ml(5,t)
break
case 1:if($l(e,t),4&r)if(e=t.stateNode,null===n)try{e.componentDidMount()}catch(o){Du(t,t.return,o)}else{var l=Lr(t.type,n.memoizedProps)
n=n.memoizedState
try{e.componentDidUpdate(l,n,e.I)}catch(a){Du(t,t.return,a)}}64&r&&wl(t),512&r&&gl(t,t.return)
break
case 3:if($l(e,t),64&r&&null!==(e=t.updateQueue)){if(n=null,null!==t.child)switch(t.child.tag){case 27:case 5:case 1:n=t.child.stateNode}try{Zn(e,n)}catch(o){Du(t,t.return,o)}}break
case 27:null===n&&4&r&&Ml(t)
case 26:case 5:$l(e,t),null===n&&4&r&&xl(t),512&r&&gl(t,t.return)
break
case 12:$l(e,t)
break
case 13:$l(e,t),4&r&&Pl(e,t),64&r&&null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)&&function(e,n){var t=e.ownerDocument
if("$?"!==e.data||"complete"===t.readyState)n()
else{var r=function(){n(),t.removeEventListener("DOMContentLoaded",r)}
t.addEventListener("DOMContentLoaded",r),e.j=r}}(e,t=ju.bind(null,t))
break
case 22:if(!(r=null!==t.memoizedState||of)){n=null!==n&&null!==n.memoizedState||af,l=of
var u=af
of=r,(af=n)&&!u?Hl(e,t,!!(8772&t.subtreeFlags)):$l(e,t),of=l,af=u}break
case 30:break
default:$l(e,t)}}function Ll(e){var n=e.alternate
null!==n&&(e.alternate=null,Ll(n)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&null!==(n=e.stateNode)&&A(n),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Dl(e,n,t){for(t=t.child;null!==t;)Rl(e,n,t),t=t.sibling}function Rl(e,n,t){if(ii&&"function"==typeof ii.onCommitFiberUnmount)try{ii.onCommitFiberUnmount(ai,t)}catch(u){}switch(t.tag){case 26:af||El(t,n),Dl(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode).parentNode.removeChild(t)
break
case 27:af||El(t,n)
var r=df,l=pf
yo(t.type)&&(df=t.stateNode,pf=!1),Dl(e,n,t),xo(t.stateNode),df=r,pf=l
break
case 5:af||El(t,n)
case 6:if(r=df,l=pf,df=null,Dl(e,n,t),pf=l,null!==(df=r))if(pf)try{(9===df.nodeType?df.body:"HTML"===df.nodeName?df.ownerDocument.body:df).removeChild(t.stateNode)}catch(o){Du(t,n,o)}else try{df.removeChild(t.stateNode)}catch(o){Du(t,n,o)}break
case 18:null!==df&&(pf?(mo(9===(e=df).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,t.stateNode),sa(e)):mo(df,t.stateNode))
break
case 4:r=df,l=pf,df=t.stateNode.containerInfo,pf=!0,Dl(e,n,t),df=r,pf=l
break
case 0:case 11:case 14:case 15:af||bl(2,t,n),af||bl(4,t,n),Dl(e,n,t)
break
case 1:af||(El(t,n),"function"==typeof(r=t.stateNode).componentWillUnmount&&kl(t,n,r)),Dl(e,n,t)
break
case 21:Dl(e,n,t)
break
case 22:af=(r=af)||null!==t.memoizedState,Dl(e,n,t),af=r
break
default:Dl(e,n,t)}}function Pl(e,n){if(null===n.memoizedState&&null!==(e=n.alternate)&&null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))try{sa(e)}catch(t){Du(n,n.return,t)}}function Il(n,t){var r=function(n){switch(n.tag){case 13:case 19:var t=n.stateNode
return null===t&&(t=n.stateNode=new sf),t
case 22:return null===(t=(n=n.stateNode).F)&&(t=n.F=new sf),t
default:throw Error(e(435,n.tag))}}(n)
t.forEach(function(e){var t=Au.bind(null,n,e)
r.has(e)||(r.add(e),e.then(t,t))})}function jl(n,t){var r=t.deletions
if(null!==r)for(var l=0;l<r.length;l++){var u=r[l],o=n,a=t,i=a
e:for(;null!==i;){switch(i.tag){case 27:if(yo(i.type)){df=i.stateNode,pf=!1
break e}break
case 5:df=i.stateNode,pf=!1
break e
case 3:case 4:df=i.stateNode.containerInfo,pf=!0
break e}i=i.return}if(null===df)throw Error(e(160))
Rl(o,a,u),df=null,pf=!1,null!==(o=u.alternate)&&(o.return=null),u.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Al(t,n),t=t.sibling}function Al(n,t){var r=n.alternate,l=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:jl(t,n),Bl(n),4&l&&(bl(3,n,n.return),ml(3,n),bl(5,n,n.return))
break
case 1:jl(t,n),Bl(n),512&l&&(af||null===r||El(r,r.return)),64&l&&of&&null!==(n=n.updateQueue)&&null!==(l=n.callbacks)&&(r=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===r?l:r.concat(l))
break
case 26:var u=vf
if(jl(t,n),Bl(n),512&l&&(af||null===r||El(r,r.return)),4&l){var o=null!==r?r.memoizedState:null
if(l=n.memoizedState,null===r)if(null===l)if(null===n.stateNode){e:{l=n.type,r=n.memoizedProps,u=u.ownerDocument||u
n:switch(l){case"title":(!(o=u.getElementsByTagName("title")[0])||o[Ei]||o[hi]||"http://www.w3.org/2000/svg"===o.namespaceURI||o.hasAttribute("itemprop"))&&(o=u.createElement(l),u.head.insertBefore(o,u.querySelector("head > title"))),co(o,l,r),o[hi]=n,H(o),l=o
break e
case"link":var a=jo("link","href",u).get(l+(r.href||""))
if(a)for(var i=0;i<a.length;i++)if((o=a[i]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&o.getAttribute("rel")===(null==r.rel?null:r.rel)&&o.getAttribute("title")===(null==r.title?null:r.title)&&o.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){a.splice(i,1)
break n}co(o=u.createElement(l),l,r),u.head.appendChild(o)
break
case"meta":if(a=jo("meta","content",u).get(l+(r.content||"")))for(i=0;i<a.length;i++)if((o=a[i]).getAttribute("content")===(null==r.content?null:""+r.content)&&o.getAttribute("name")===(null==r.name?null:r.name)&&o.getAttribute("property")===(null==r.property?null:r.property)&&o.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&o.getAttribute("charset")===(null==r.charSet?null:r.charSet)){a.splice(i,1)
break n}co(o=u.createElement(l),l,r),u.head.appendChild(o)
break
default:throw Error(e(468,l))}o[hi]=n,H(o),l=o}n.stateNode=l}else Ao(u,n.type,n.stateNode)
else n.stateNode=Do(u,l,n.memoizedProps)
else o!==l?(null===o?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):o.count--,null===l?Ao(u,n.type,n.stateNode):Do(u,l,n.memoizedProps)):null===l&&null!==n.stateNode&&Sl(n,n.memoizedProps,r.memoizedProps)}break
case 27:jl(t,n),Bl(n),512&l&&(af||null===r||El(r,r.return)),null!==r&&4&l&&Sl(n,n.memoizedProps,r.memoizedProps)
break
case 5:if(jl(t,n),Bl(n),512&l&&(af||null===r||El(r,r.return)),32&n.flags){u=n.stateNode
try{se(u,"")}catch(v){Du(n,n.return,v)}}4&l&&null!=n.stateNode&&Sl(n,u=n.memoizedProps,null!==r?r.memoizedProps:u),1024&l&&(cf=!0)
break
case 6:if(jl(t,n),Bl(n),4&l){if(null===n.stateNode)throw Error(e(162))
l=n.memoizedProps,r=n.stateNode
try{r.nodeValue=l}catch(v){Du(n,n.return,v)}}break
case 3:if(gd=null,u=vf,vf=So(t.containerInfo),jl(t,n),vf=u,Bl(n),4&l&&null!==r&&r.memoizedState.isDehydrated)try{sa(t.containerInfo)}catch(v){Du(n,n.return,v)}cf&&(cf=!1,Nl(n))
break
case 4:l=vf,vf=So(n.stateNode.containerInfo),jl(t,n),Bl(n),vf=l
break
case 12:default:jl(t,n),Bl(n)
break
case 13:jl(t,n),Bl(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==r&&null!==r.memoizedState)&&(Af=Qa()),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,Il(n,l))
break
case 22:u=null!==n.memoizedState
var c=null!==r&&null!==r.memoizedState,s=of,f=af
if(of=s||u,af=f||c,jl(t,n),af=f,of=s,Bl(n),8192&l)e:for(t=n.stateNode,t.k=u?-2&t.k:1|t.k,u&&(null===r||c||of||af||Ul(n)),r=null,t=n;;){if(5===t.tag||26===t.tag){if(null===r){c=r=t
try{if(o=c.stateNode,u)"function"==typeof(a=o.style).setProperty?a.setProperty("display","none","important"):a.display="none"
else{i=c.stateNode
var d=c.memoizedProps.style,p=null!=d&&d.hasOwnProperty("display")?d.display:null
i.style.display=null==p||"boolean"==typeof p?"":(""+p).trim()}}catch(v){Du(c,c.return,v)}}}else if(6===t.tag){if(null===r){c=t
try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(v){Du(c,c.return,v)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===n)&&null!==t.child){t.child.return=t,t=t.child
continue}if(t===n)break e
for(;null===t.sibling;){if(null===t.return||t.return===n)break e
r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&l&&null!==(l=n.updateQueue)&&null!==(r=l.retryQueue)&&(l.retryQueue=null,Il(n,r))
break
case 19:jl(t,n),Bl(n),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,Il(n,l))
case 30:case 21:}}function Bl(n){var t=n.flags
if(2&t){try{for(var r,l=n.return;null!==l;){if(Cl(l)){r=l
break}l=l.return}if(null==r)throw Error(e(160))
switch(r.tag){case 27:var u=r.stateNode
Tl(n,_l(n),u)
break
case 5:var o=r.stateNode
32&r.flags&&(se(o,""),r.flags&=-33),Tl(n,_l(n),o)
break
case 3:case 4:var a=r.stateNode.containerInfo
Ol(n,_l(n),a)
break
default:throw Error(e(161))}}catch(i){Du(n,n.return,i)}n.flags&=-3}4096&t&&(n.flags&=-4097)}function Nl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var n=e
Nl(n),5===n.tag&&1024&n.flags&&n.stateNode.reset(),e=e.sibling}}function $l(e,n){if(8772&n.subtreeFlags)for(n=n.child;null!==n;)Fl(e,n.alternate,n),n=n.sibling}function Ul(e){for(e=e.child;null!==e;){var n=e
switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Ul(n)
break
case 1:El(n,n.return)
var t=n.stateNode
"function"==typeof t.componentWillUnmount&&kl(n,n.return,t),Ul(n)
break
case 27:xo(n.stateNode)
case 26:case 5:El(n,n.return),Ul(n)
break
case 22:null===n.memoizedState&&Ul(n)
break
default:Ul(n)}e=e.sibling}}function Hl(e,n,t){for(t=t&&!!(8772&n.subtreeFlags),n=n.child;null!==n;){var r=n.alternate,l=e,u=n,o=u.flags
switch(u.tag){case 0:case 11:case 15:Hl(l,u,t),ml(4,u)
break
case 1:if(Hl(l,u,t),"function"==typeof(l=(r=u).stateNode).componentDidMount)try{l.componentDidMount()}catch(c){Du(r,r.return,c)}if(null!==(l=(r=u).updateQueue)){var a=r.stateNode
try{var i=l.shared.hiddenCallbacks
if(null!==i)for(l.shared.hiddenCallbacks=null,l=0;l<i.length;l++)Qn(i[l],a)}catch(c){Du(r,r.return,c)}}t&&64&o&&wl(u),gl(u,u.return)
break
case 27:Ml(u)
case 26:case 5:Hl(l,u,t),t&&null===r&&4&o&&xl(u),gl(u,u.return)
break
case 12:Hl(l,u,t)
break
case 13:Hl(l,u,t),t&&4&o&&Pl(l,u)
break
case 22:null===u.memoizedState&&Hl(l,u,t),gl(u,u.return)
break
case 30:break
default:Hl(l,u,t)}n=n.sibling}}function zl(e,n){var t=null
null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(t=e.memoizedState.cachePool.pool),e=null,null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(e=n.memoizedState.cachePool.pool),e!==t&&(null!=e&&e.refCount++,null!=t&&Pn(t))}function Vl(e,n){e=null,null!==n.alternate&&(e=n.alternate.memoizedState.cache),(n=n.memoizedState.cache)!==e&&(n.refCount++,null!=e&&Pn(e))}function Wl(e,n,t,r){if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Kl(e,n,t,r),n=n.sibling}function Kl(e,n,t,r){var l=n.flags
switch(n.tag){case 0:case 11:case 15:Wl(e,n,t,r),2048&l&&ml(9,n)
break
case 1:case 13:default:Wl(e,n,t,r)
break
case 3:Wl(e,n,t,r),2048&l&&(e=null,null!==n.alternate&&(e=n.alternate.memoizedState.cache),(n=n.memoizedState.cache)!==e&&(n.refCount++,null!=e&&Pn(e)))
break
case 12:if(2048&l){Wl(e,n,t,r),e=n.stateNode
try{var u=n.memoizedProps,o=u.id,a=u.onPostCommit
"function"==typeof a&&a(o,null===n.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(i){Du(n,n.return,i)}}else Wl(e,n,t,r)
break
case 23:break
case 22:u=n.stateNode,o=n.alternate,null!==n.memoizedState?2&u.k?Wl(e,n,t,r):Gl(e,n):2&u.k?Wl(e,n,t,r):(u.k|=2,Xl(e,n,t,r,!!(10256&n.subtreeFlags))),2048&l&&zl(o,n)
break
case 24:Wl(e,n,t,r),2048&l&&Vl(n.alternate,n)}}function Xl(e,n,t,r,l){for(l=l&&!!(10256&n.subtreeFlags),n=n.child;null!==n;){var u=e,o=n,a=t,i=r,c=o.flags
switch(o.tag){case 0:case 11:case 15:Xl(u,o,a,i,l),ml(8,o)
break
case 23:break
case 22:var s=o.stateNode
null!==o.memoizedState?2&s.k?Xl(u,o,a,i,l):Gl(u,o):(s.k|=2,Xl(u,o,a,i,l)),l&&2048&c&&zl(o.alternate,o)
break
case 24:Xl(u,o,a,i,l),l&&2048&c&&Vl(o.alternate,o)
break
default:Xl(u,o,a,i,l)}n=n.sibling}}function Gl(e,n){if(10256&n.subtreeFlags)for(n=n.child;null!==n;){var t=e,r=n,l=r.flags
switch(r.tag){case 22:Gl(t,r),2048&l&&zl(r.alternate,r)
break
case 24:Gl(t,r),2048&l&&Vl(r.alternate,r)
break
default:Gl(t,r)}n=n.sibling}}function Yl(e){if(e.subtreeFlags&hf)for(e=e.child;null!==e;)ql(e),e=e.sibling}function ql(n){switch(n.tag){case 26:Yl(n),n.flags&hf&&null!==n.memoizedState&&function(n,t,r){if(null===Ed)throw Error(e(475))
var l=Ed
if(!("stylesheet"!==t.type||"string"==typeof r.media&&!1===matchMedia(r.media).matches||4&t.state.loading)){if(null===t.instance){var u=Oo(r.href),o=n.querySelector(To(u))
if(o)return null!==(n=o.B)&&"object"==typeof n&&"function"==typeof n.then&&(l.count++,l=$o.bind(l),n.then(l,l)),t.state.loading|=4,t.instance=o,H(o),void 0
o=n.ownerDocument||n,r=Mo(r),(u=md.get(u))&&Po(r,u),H(o=o.createElement("link"))
var a=o
a.B=new Promise(function(e,n){a.onload=e,a.onerror=n}),co(o,"link",r),t.instance=o}null===l.stylesheets&&(l.stylesheets=new Map),l.stylesheets.set(t,n),(n=t.state.preload)&&!(3&t.state.loading)&&(l.count++,t=$o.bind(l),n.addEventListener("load",t),n.addEventListener("error",t))}}(vf,n.memoizedState,n.memoizedProps)
break
case 5:default:Yl(n)
break
case 3:case 4:var t=vf
vf=So(n.stateNode.containerInfo),Yl(n),vf=t
break
case 22:null===n.memoizedState&&(null!==(t=n.alternate)&&null!==t.memoizedState?(t=hf,hf=16777216,Yl(n),hf=t):Yl(n))}}function Jl(e){var n=e.alternate
if(null!==n&&null!==(e=n.child)){n.child=null
do{n=e.sibling,e.sibling=null,e=n}while(null!==e)}}function Ql(e){var n=e.deletions
if(16&e.flags){if(null!==n)for(var t=0;t<n.length;t++){var r=n[t]
ff=r,nu(r,e)}Jl(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)Zl(e),e=e.sibling}function Zl(e){switch(e.tag){case 0:case 11:case 15:Ql(e),2048&e.flags&&bl(9,e,e.return)
break
case 3:case 12:default:Ql(e)
break
case 22:var n=e.stateNode
null!==e.memoizedState&&2&n.k&&(null===e.return||13!==e.return.tag)?(n.k&=-3,eu(e)):Ql(e)}}function eu(e){var n=e.deletions
if(16&e.flags){if(null!==n)for(var t=0;t<n.length;t++){var r=n[t]
ff=r,nu(r,e)}Jl(e)}for(e=e.child;null!==e;){switch((n=e).tag){case 0:case 11:case 15:bl(8,n,n.return),eu(n)
break
case 22:2&(t=n.stateNode).k&&(t.k&=-3,eu(n))
break
default:eu(n)}e=e.sibling}}function nu(e,n){for(;null!==ff;){var t=ff
switch(t.tag){case 0:case 11:case 15:bl(8,t,n)
break
case 23:case 22:if(null!==t.memoizedState&&null!==t.memoizedState.cachePool){var r=t.memoizedState.cachePool.pool
null!=r&&r.refCount++}break
case 24:Pn(t.memoizedState.cache)}if(null!==(r=t.child))r.return=t,ff=r
else e:for(t=e;null!==ff;){var l=(r=ff).sibling,u=r.return
if(Ll(r),r===t){ff=null
break e}if(null!==l){l.return=u,ff=l
break e}ff=u}}}function tu(){return 2&bf&&0!==gf?gf&-gf:null!==Ba.T?0!==ks?ks:Wu():j()}function ru(){0===Df&&(Df=536870912&gf&&!as?536870912:T())
var e=Qs.current
return null!==e&&(e.flags|=32),Df}function lu(e,n,t){(e!==wf||2!==Ef&&9!==Ef)&&null===e.cancelPendingCommit||(fu(e,0),iu(e,gf,Df,!1)),L(e,t),2&bf&&e===wf||(e===wf&&(!(2&bf)&&(Ff|=t),4===Tf&&iu(e,gf,Df,!1)),Bu(e))}function uu(n,t,r){if(6&bf)throw Error(e(327))
for(var l=!r&&!(124&t)&&0===(t&n.expiredLanes)||_(n,t),u=l?function(n,t){var r=bf
bf|=2
var l=pu(),u=vu()
wf!==n||gf!==t?(Nf=null,Bf=Qa()+500,fu(n,t)):Cf=_(n,t)
e:for(;;){try{if(0!==Ef&&null!==kf){t=kf
var o=xf
n:switch(Ef){case 1:Ef=0,xf=null,gu(n,t,o,1)
break
case 2:case 9:if(Nn(o)){Ef=0,xf=null,ku(t)
break}t=function(){2!==Ef&&9!==Ef||wf!==n||(Ef=7),Bu(n)},o.then(t,t)
break e
case 3:Ef=7
break e
case 4:Ef=5
break e
case 7:Nn(o)?(Ef=0,xf=null,ku(t)):(Ef=0,xf=null,gu(n,t,o,7))
break
case 5:var a=null
switch(kf.tag){case 26:a=kf.memoizedState
case 5:case 27:var i=kf
if(!a||Bo(a)){Ef=0,xf=null
var c=i.sibling
if(null!==c)kf=c
else{var s=i.return
null!==s?(kf=s,Eu(s)):kf=null}break n}}Ef=0,xf=null,gu(n,t,o,5)
break
case 6:Ef=0,xf=null,gu(n,t,o,6)
break
case 8:su(),Tf=6
break e
default:throw Error(e(462))}}bu()
break}catch(f){du(n,f)}1}return ps=ds=null,Ba.H=l,Ba.A=u,bf=r,null!==kf?0:(wf=null,gf=0,qe(),Tf)}(n,t):yu(n,t,!0),o=l;;){if(0===u){Cf&&!l&&iu(n,t,0,!1)
break}if(r=n.current.alternate,!o||au(r)){if(2===u){if(o=t,n.errorRecoveryDisabledLanes&o)var a=0
else a=0!=(a=-536870913&n.pendingLanes)?a:536870912&a?536870912:0
if(0!==a){t=a
e:{var i=n
u=Pf
var c=i.current.memoizedState.isDehydrated
if(c&&(fu(i,a).flags|=256),2!==(a=yu(i,a,!1))){if(_f&&!c){i.errorRecoveryDisabledLanes|=o,Ff|=o,u=4
break e}o=If,If=u,null!==o&&(null===If?If=o:If.push.apply(If,o))}u=a}if(o=!1,2!==u)continue}}if(1===u){fu(n,0),iu(n,t,0,!0)
break}e:{switch(l=n,o=u){case 0:case 1:throw Error(e(345))
case 4:if((4194048&t)!==t)break
case 6:iu(l,t,Df,!Sf)
break e
case 2:If=null
break
case 3:case 5:break
default:throw Error(e(329))}if((62914560&t)===t&&10<(u=Af+300-Qa())){if(iu(l,t,Df,!Sf),0!==C(l,0,!0))break e
l.timeoutHandle=dd(ou.bind(null,l,r,If,Nf,jf,t,Df,Ff,Rf,Sf,o,2,-0,0),u)}else ou(l,r,If,Nf,jf,t,Df,Ff,Rf,Sf,o,0,-0,0)}break}u=yu(n,t,!1),o=!1}Bu(n)}function ou(n,t,r,l,u,o,a,i,c,s,f,d,p,v){if(n.timeoutHandle=-1,(8192&(d=t.subtreeFlags)||!(16785408&~d))&&(Ed={stylesheets:null,count:0,unsuspend:No},ql(t),null!==(d=function(){if(null===Ed)throw Error(e(475))
var n=Ed
return n.stylesheets&&0===n.count&&Uo(n,n.stylesheets),0<n.count?function(e){var t=setTimeout(function(){if(n.stylesheets&&Uo(n,n.stylesheets),n.unsuspend){var e=n.unsuspend
n.unsuspend=null,e()}},6e4)
return n.unsuspend=e,function(){n.unsuspend=null,clearTimeout(t)}}:null}())))return n.cancelPendingCommit=d(Su.bind(null,n,t,o,r,l,u,a,i,c,f,1,p,v)),iu(n,o,a,!s),void 0
Su(n,t,o,r,l,u,a,i,c)}function au(e){for(var n=e;;){var t=n.tag
if((0===t||11===t||15===t)&&16384&n.flags&&null!==(t=n.updateQueue)&&null!==(t=t.stores))for(var r=0;r<t.length;r++){var l=t[r],u=l.getSnapshot
l=l.value
try{if(!Oc(u(),l))return!1}catch(o){return!1}}if(t=n.child,16384&n.subtreeFlags&&null!==t)t.return=n,n=t
else{if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return!0
n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function iu(e,n,t,r){n&=~Lf,n&=~Ff,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes
for(var l=n;0<l;){var u=31-ci(l),o=1<<u
r[u]=-1,l&=~o}0!==t&&D(e,t,n)}function cu(){return!!(6&bf)||(Nu(0),!1)}function su(){if(null!==kf){if(0===Ef)var e=kf.return
else ps=ds=null,ft(e=kf),Gs=null,Ys=0,e=kf
for(;null!==e;)yl(e.alternate,e),e=e.return
kf=null}}function fu(e,n){var t=e.timeoutHandle;-1!==t&&(e.timeoutHandle=-1,pd(t)),null!==(t=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,t()),su(),wf=e,kf=t=un(e.current,null),gf=n,Ef=0,xf=null,Sf=!1,Cf=_(e,n),_f=!1,Rf=Df=Lf=Ff=Mf=Tf=0,If=Pf=null,jf=!1,8&n&&(n|=32&n)
var r=e.entangledLanes
if(0!==r)for(e=e.entanglements,r&=n;0<r;){var l=31-ci(r),u=1<<l
n|=e[l],r&=~u}return Of=n,qe(),t}function du(e,n){Ps=null,Ba.H=Vs,n===Ss||n===_s?(n=Hn(),Ef=3):n===Cs?(n=Hn(),Ef=4):Ef=n===rf?8:null!==n&&"object"==typeof n&&"function"==typeof n.then?6:1,xf=n,null===kf&&(Tf=1,Ir(e,Ye(n,e.current)))}function pu(){var e=Ba.H
return Ba.H=Vs,null===e?Vs:e}function vu(){var e=Ba.A
return Ba.A=yf,e}function hu(){Tf=4,Sf||(4194048&gf)!==gf&&null!==Qs.current||(Cf=!0),!(134217727&Mf)&&!(134217727&Ff)||null===wf||iu(wf,gf,Df,!1)}function yu(e,n,t){var r=bf
bf|=2
var l=pu(),u=vu()
wf===e&&gf===n||(Nf=null,fu(e,n)),n=!1
var o=Tf
e:for(;;){try{if(0!==Ef&&null!==kf){var a=kf,i=xf
switch(Ef){case 8:su(),o=6
break e
case 3:case 2:case 9:case 6:null===Qs.current&&(n=!0)
var c=Ef
if(Ef=0,xf=null,gu(e,a,i,c),t&&Cf){o=0
break e}break
default:c=Ef,Ef=0,xf=null,gu(e,a,i,c)}}mu(),o=Tf
break}catch(s){du(e,s)}1}return n&&e.shellSuspendCounter++,ps=ds=null,bf=r,Ba.H=l,Ba.A=u,null===kf&&(wf=null,gf=0,qe()),o}function mu(){for(;null!==kf;)wu(kf)}function bu(){for(;null!==kf&&!qa();)wu(kf)}function wu(e){var n=il(e.alternate,e,Of)
e.memoizedProps=e.pendingProps,null===n?Eu(e):kf=n}function ku(e){var n=e,t=n.alternate
switch(n.tag){case 15:case 0:n=Gr(t,n,n.pendingProps,n.type,void 0,gf)
break
case 11:n=Gr(t,n,n.pendingProps,n.type.render,n.ref,gf)
break
case 5:ft(n)
default:yl(t,n),n=il(t,n=kf=on(n,Of),Of)}e.memoizedProps=e.pendingProps,null===n?Eu(e):kf=n}function gu(n,t,r,l){ps=ds=null,ft(t),Gs=null,Ys=0
var u=t.return
try{if(function(n,t,r,l,u){if(r.flags|=32768,null!==l&&"object"==typeof l&&"function"==typeof l.then){if(null!==(t=r.alternate)&&On(t,r,u,!0),null!==(r=Qs.current)){switch(r.tag){case 13:return null===Zs?hu():null===r.alternate&&0===Tf&&(Tf=3),r.flags&=-257,r.flags|=65536,r.lanes=u,l===Os?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([l]):t.add(l),Ru(n,l,u)),!1
case 22:return r.flags|=65536,l===Os?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([l]):r.add(l),Ru(n,l,u)),!1}throw Error(e(435,r.tag))}return Ru(n,l,u),hu(),!1}if(as)return null!==(t=Qs.current)?(!(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=u,l!==ss&&En(Ye(n=Error(e(422),{cause:l}),r))):(l!==ss&&En(Ye(t=Error(e(423),{cause:l}),r)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,l=Ye(l,r),Yn(n,u=Ar(n.stateNode,l,u)),4!==Tf&&(Tf=2)),!1
var o=Error(e(520),{cause:l})
if(o=Ye(o,r),null===Pf?Pf=[o]:Pf.push(o),4!==Tf&&(Tf=2),null===t)return!0
l=Ye(l,r),r=t
do{switch(r.tag){case 3:return r.flags|=65536,n=u&-u,r.lanes|=n,Yn(r,n=Ar(r.stateNode,l,n)),!1
case 1:if(t=r.type,o=r.stateNode,!(128&r.flags||"function"!=typeof t.getDerivedStateFromError&&(null===o||"function"!=typeof o.componentDidCatch||null!==$f&&$f.has(o))))return r.flags|=65536,u&=-u,r.lanes|=u,Nr(u=Br(u),n,r,l),Yn(r,u),!1}r=r.return}while(null!==r)
return!1}(n,u,t,r,gf))return Tf=1,Ir(n,Ye(r,n.current)),kf=null,void 0}catch(o){if(null!==u)throw kf=u,o
return Tf=1,Ir(n,Ye(r,n.current)),kf=null,void 0}32768&t.flags?(as||1===l?n=!0:Cf||536870912&gf?n=!1:(Sf=n=!0,(2===l||9===l||3===l||6===l)&&null!==(l=Qs.current)&&13===l.tag&&(l.flags|=16384)),xu(t,n)):Eu(t)}function Eu(e){var n=e
do{if(32768&n.flags)return xu(n,Sf),void 0
e=n.return
var t=vl(n.alternate,n,Of)
if(null!==t)return kf=t,void 0
if(null!==(n=n.sibling))return kf=n,void 0
kf=n=e}while(null!==n)
0===Tf&&(Tf=5)}function xu(e,n){do{var t=hl(e.alternate,e)
if(null!==t)return t.flags&=32767,kf=t,void 0
if(null!==(t=e.return)&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&null!==(e=e.sibling))return kf=e,void 0
kf=e=t}while(null!==e)
Tf=6,kf=null}function Su(n,t,r,l,u,o,a,i,c){n.cancelPendingCommit=null
do{Mu()}while(0!==Uf)
if(6&bf)throw Error(e(327))
if(null!==t){if(t===n.current)throw Error(e(177))
if(o=t.lanes|t.childLanes,function(e,n,t,r,l,u){var o=e.pendingLanes
e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0
var a=e.entanglements,i=e.expirationTimes,c=e.hiddenUpdates
for(t=o&~t;0<t;){var s=31-ci(t),f=1<<s
a[s]=0,i[s]=-1
var d=c[s]
if(null!==d)for(c[s]=null,s=0;s<d.length;s++){var p=d[s]
null!==p&&(p.lane&=-536870913)}t&=~f}0!==r&&D(e,r,0),0!==u&&0===l&&0!==e.tag&&(e.suspendedLanes|=u&~(o&~n))}(n,r,o|=Gc,a,i,c),n===wf&&(kf=wf=null,gf=0),zf=t,Hf=n,Vf=r,Wf=o,Kf=u,Xf=l,10256&t.subtreeFlags||10256&t.flags?(n.callbackNode=null,n.callbackPriority=0,Ga(ti,function(){return Fu(),null})):(n.callbackNode=null,n.callbackPriority=0),l=!!(13878&t.flags),13878&t.subtreeFlags||l){l=Ba.T,Ba.T=null,u=Na.p,Na.p=2,a=bf,bf|=4
try{!function(n,t){if(n=n.containerInfo,cd=Cd,Ve(n=ze(n))){if("selectionStart"in n)var r={start:n.selectionStart,end:n.selectionEnd}
else{var l=(r=(r=n.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection()
if(l&&0!==l.rangeCount){r=l.anchorNode
var u=l.anchorOffset,o=l.focusNode
l=l.focusOffset
var a=0,i=-1,c=-1,s=0,f=0,d=n,p=null
e:for(;;){for(var v;d!==r||0!==u&&3!==d.nodeType||(i=a+u),d!==o||0!==l&&3!==d.nodeType||(c=a+l),3===d.nodeType&&(a+=d.nodeValue.length),null!==(v=d.firstChild);)p=d,d=v
for(;;){if(d===n)break e
if(p===r&&++s===u&&(i=a),p===o&&++f===l&&(c=a),null!==(v=d.nextSibling))break
p=(d=p).parentNode}d=v}r=-1===i||-1===c?null:{start:i,end:c}}else r=null}r=r||{start:0,end:0}}else r=null
for(sd={focusedElem:n,selectionRange:r},Cd=!1,ff=t;null!==ff;)if(n=(t=ff).child,1024&t.subtreeFlags&&null!==n)n.return=t,ff=n
else for(;null!==ff;){switch(o=(t=ff).alternate,n=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&n&&null!==o){n=void 0,r=t,u=o.memoizedProps,o=o.memoizedState,l=r.stateNode
try{var h=Lr(r.type,u)
n=l.getSnapshotBeforeUpdate(h,o),l.I=n}catch(y){Du(r,r.return,y)}}break
case 3:if(1024&n)if(9===(r=(n=t.stateNode.containerInfo).nodeType))bo(n)
else if(1===r)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":bo(n)
break
default:n.textContent=""}break
default:if(1024&n)throw Error(e(163))}if(null!==(n=t.sibling)){n.return=t.return,ff=n
break}ff=t.return}}(n,t)}finally{bf=a,Na.p=u,Ba.T=l}}Uf=1,Cu(),_u(),Ou()}}function Cu(){if(1===Uf){Uf=0
var e=Hf,n=zf,t=!!(13878&n.flags)
if(13878&n.subtreeFlags||t){t=Ba.T,Ba.T=null
var r=Na.p
Na.p=2
var l=bf
bf|=4
try{Al(n,e)
var u=sd,o=ze(e.containerInfo),a=u.focusedElem,i=u.selectionRange
if(o!==a&&a&&a.ownerDocument&&He(a.ownerDocument.documentElement,a)){if(null!==i&&Ve(a)){var c=i.start,s=i.end
if(void 0===s&&(s=c),"selectionStart"in a)a.selectionStart=c,a.selectionEnd=Math.min(s,a.value.length)
else{var f=a.ownerDocument||document,d=f&&f.defaultView||window
if(d.getSelection){var p=d.getSelection(),v=a.textContent.length,h=Math.min(i.start,v),y=void 0===i.end?h:Math.min(i.end,v)
!p.extend&&h>y&&(o=y,y=h,h=o)
var m=Ue(a,h),b=Ue(a,y)
if(m&&b&&(1!==p.rangeCount||p.anchorNode!==m.node||p.anchorOffset!==m.offset||p.focusNode!==b.node||p.focusOffset!==b.offset)){var w=f.createRange()
w.setStart(m.node,m.offset),p.removeAllRanges(),h>y?(p.addRange(w),p.extend(b.node,b.offset)):(w.setEnd(b.node,b.offset),p.addRange(w))}}}}for(f=[],p=a;p=p.parentNode;)1===p.nodeType&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop})
for("function"==typeof a.focus&&a.focus(),a=0;a<f.length;a++){var k=f[a]
k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Cd=!!cd,sd=cd=null}finally{bf=l,Na.p=r,Ba.T=t}}e.current=n,Uf=2}}function _u(){if(2===Uf){Uf=0
var e=Hf,n=zf,t=!!(8772&n.flags)
if(8772&n.subtreeFlags||t){t=Ba.T,Ba.T=null
var r=Na.p
Na.p=2
var l=bf
bf|=4
try{Fl(e,n.alternate,n)}finally{bf=l,Na.p=r,Ba.T=t}}Uf=3}}function Ou(){if(4===Uf||3===Uf){Uf=0,Ja()
var e=Hf,n=zf,t=Vf,r=Xf
10256&n.subtreeFlags||10256&n.flags?Uf=5:(Uf=0,zf=Hf=null,Tu(e,e.pendingLanes))
var l=e.pendingLanes
if(0===l&&($f=null),I(t),n=n.stateNode,ii&&"function"==typeof ii.onCommitFiberRoot)try{ii.onCommitFiberRoot(ai,n,void 0,!(128&~n.current.flags))}catch(i){}if(null!==r){n=Ba.T,l=Na.p,Na.p=2,Ba.T=null
try{for(var u=e.onRecoverableError,o=0;o<r.length;o++){var a=r[o]
u(a.value,{componentStack:a.stack})}}finally{Ba.T=n,Na.p=l}}3&Vf&&Mu(),Bu(e),l=e.pendingLanes,4194090&t&&42&l?e===Yf?Gf++:(Gf=0,Yf=e):Gf=0,Nu(0)}}function Tu(e,n){0===(e.pooledCacheLanes&=n)&&null!=(n=e.pooledCache)&&(e.pooledCache=null,Pn(n))}function Mu(e){return Cu(),_u(),Ou(),Fu()}function Fu(){if(5!==Uf)return!1
var n=Hf,t=Wf
Wf=0
var r=I(Vf),l=Ba.T,u=Na.p
try{Na.p=32>r?32:r,Ba.T=null,r=Kf,Kf=null
var o=Hf,a=Vf
if(Uf=0,zf=Hf=null,Vf=0,6&bf)throw Error(e(331))
var i=bf
if(bf|=4,Zl(o.current),Kl(o,o.current,a,r),bf=i,Nu(0),ii&&"function"==typeof ii.onPostCommitFiberRoot)try{ii.onPostCommitFiberRoot(ai,o)}catch(c){}return!0}finally{Na.p=u,Ba.T=l,Tu(n,t)}}function Lu(e,n,t){n=Ye(t,n),null!==(e=Xn(e,n=Ar(e.stateNode,n,2),2))&&(L(e,2),Bu(e))}function Du(e,n,t){if(3===e.tag)Lu(e,e,t)
else for(;null!==n;){if(3===n.tag){Lu(n,e,t)
break}if(1===n.tag){var r=n.stateNode
if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===$f||!$f.has(r))){e=Ye(t,e),null!==(r=Xn(n,t=Br(2),2))&&(Nr(t,r,n,e),L(r,2),Bu(r))
break}}n=n.return}}function Ru(e,n,t){var r=e.pingCache
if(null===r){r=e.pingCache=new mf
var l=new Set
r.set(n,l)}else void 0===(l=r.get(n))&&(l=new Set,r.set(n,l))
l.has(t)||(_f=!0,l.add(t),e=Pu.bind(null,e,n,t),n.then(e,e))}function Pu(e,n,t){var r=e.pingCache
null!==r&&r.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,wf===e&&(gf&t)===t&&(4===Tf||3===Tf&&(62914560&gf)===gf&&300>Qa()-Af?!(2&bf)&&fu(e,0):Lf|=t,Rf===gf&&(Rf=0)),Bu(e)}function Iu(e,n){0===n&&(n=M()),null!==(e=Ze(e,n))&&(L(e,n),Bu(e))}function ju(e){var n=e.memoizedState,t=0
null!==n&&(t=n.retryLane),Iu(e,t)}function Au(n,t){var r=0
switch(n.tag){case 13:var l=n.stateNode,u=n.memoizedState
null!==u&&(r=u.retryLane)
break
case 19:l=n.stateNode
break
case 22:l=n.stateNode.F
break
default:throw Error(e(314))}null!==l&&l.delete(t),Iu(n,r)}function Bu(e){e!==Jf&&null===e.next&&(null===Jf?qf=Jf=e:Jf=Jf.next=e),Zf=!0,Qf||(Qf=!0,hd(function(){6&bf?Ga(ei,$u):Uu()}))}function Nu(e,n){if(!ed&&Zf){ed=!0
do{for(var t=!1,r=qf;null!==r;){if(0!==e){var l=r.pendingLanes
if(0===l)var u=0
else{var o=r.suspendedLanes,a=r.pingedLanes
u=(1<<31-ci(42|e)+1)-1,u=201326741&(u&=l&~(o&~a))?201326741&u|1:u?2|u:0}0!==u&&(t=!0,Vu(r,u))}else u=gf,!(3&(u=C(r,r===wf?u:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||_(r,u)||(t=!0,Vu(r,u))
r=r.next}}while(t)
ed=!1}}function $u(){Uu()}function Uu(){Zf=Qf=!1
var e=0
0!==nd&&(function(){var e=window.event
return e&&"popstate"===e.type?e!==fd&&(fd=e,!0):(fd=null,!1)}()&&(e=nd),nd=0)
for(var n=Qa(),t=null,r=qf;null!==r;){var l=r.next,u=Hu(r,n)
0===u?(r.next=null,null===t?qf=l:t.next=l,null===l&&(Jf=t)):(t=r,(0!==e||3&u)&&(Zf=!0)),r=l}Nu(e)}function Hu(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,u=-62914561&e.pendingLanes;0<u;){var o=31-ci(u),a=1<<o,i=l[o];-1===i?0!==(a&t)&&0===(a&r)||(l[o]=O(a,n)):i<=n&&(e.expiredLanes|=a),u&=~a}if(t=gf,t=C(e,e===(n=wf)?t:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===t||e===n&&(2===Ef||9===Ef)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&Ya(r),e.callbackNode=null,e.callbackPriority=0
if(!(3&t)||_(e,t)){if((n=t&-t)===e.callbackPriority)return n
switch(null!==r&&Ya(r),I(t)){case 2:case 8:t=ni
break
case 32:default:t=ti
break
case 268435456:t=li}return r=zu.bind(null,e),t=Ga(t,r),e.callbackPriority=n,e.callbackNode=t,n}return null!==r&&null!==r&&Ya(r),e.callbackPriority=2,e.callbackNode=null,2}function zu(e,n){if(0!==Uf&&5!==Uf)return e.callbackNode=null,e.callbackPriority=0,null
var t=e.callbackNode
if(Mu()&&e.callbackNode!==t)return null
var r=gf
return 0===(r=C(e,e===wf?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(uu(e,r,n),Hu(e,Qa()),null!=e.callbackNode&&e.callbackNode===t?zu.bind(null,e):null)}function Vu(e,n){if(Mu())return null
uu(e,n,!0)}function Wu(){return 0===nd&&(nd=T()),nd}function Ku(e){return null==e||"symbol"==typeof e||"boolean"==typeof e?null:"function"==typeof e?e:ve(""+e)}function Xu(e,n){var t=n.ownerDocument.createElement("input")
return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Gu(e,n){n=!!(4&n)
for(var t=0;t<e.length;t++){var r=e[t],l=r.event
r=r.listeners
e:{var u=void 0
if(n)for(var o=r.length-1;0<=o;o--){var a=r[o],i=a.instance,c=a.currentTarget
if(a=a.listener,i!==u&&l.isPropagationStopped())break e
u=a,l.currentTarget=c
try{u(l)}catch(s){tf(s)}l.currentTarget=null,u=i}else for(o=0;o<r.length;o++){if(i=(a=r[o]).instance,c=a.currentTarget,a=a.listener,i!==u&&l.isPropagationStopped())break e
u=a,l.currentTarget=c
try{u(l)}catch(s){tf(s)}l.currentTarget=null,u=i}}}}function Yu(e,n){var t=n[bi]
void 0===t&&(t=n[bi]=new Set)
var r=e+"__bubble"
t.has(r)||(Qu(n,e,2,!1),t.add(r))}function qu(e,n,t){var r=0
n&&(r|=4),Qu(t,e,r,n)}function Ju(e){if(!e[od]){e[od]=!0,xi.forEach(function(n){"selectionchange"!==n&&(ud.has(n)||qu(n,!1,e),qu(n,!0,e))})
var n=9===e.nodeType?e:e.ownerDocument
null===n||n[od]||(n[od]=!0,qu("selectionchange",!1,n))}}function Qu(e,n,t,r){switch(na(n)){case 2:var l=qo
break
case 8:l=Jo
break
default:l=Qo}t=l.bind(null,n,t,e),l=void 0,!Bi||"touchstart"!==n&&"touchmove"!==n&&"wheel"!==n||(l=!0),r?void 0!==l?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):void 0!==l?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function Zu(e,n,t,r,u){var o=r
if(!(1&n||2&n||null===r))e:for(;;){if(null===r)return
var a=r.tag
if(3===a||4===a){var i=r.stateNode.containerInfo
if(i===u)break
if(4===a)for(a=r.return;null!==a;){var c=a.tag
if((3===c||4===c)&&a.stateNode.containerInfo===u)return
a=a.return}for(;null!==i;){if(null===(a=B(i)))return
if(5===(c=a.tag)||6===c||26===c||27===c){r=o=a
continue e}i=i.parentNode}}r=r.return}me(function(){var r=o,u=he(t),a=[]
e:{var i=zc.get(e)
if(void 0!==i){var c=Xi,s=e
switch(e){case"keypress":if(0===ke(t))break e
case"keydown":case"keyup":c=oc
break
case"focusin":s="focus",c=Zi
break
case"focusout":s="blur",c=Zi
break
case"beforeblur":case"afterblur":c=Zi
break
case"click":if(2===t.button)break e
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=Ji
break
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=Qi
break
case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=ic
break
case jc:case Ac:case Bc:c=ec
break
case Hc:c=cc
break
case"scroll":case"scrollend":c=Yi
break
case"wheel":c=sc
break
case"copy":case"cut":case"paste":c=nc
break
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=ac
break
case"toggle":case"beforetoggle":c=fc}var f=!!(4&n),d=!f&&("scroll"===e||"scrollend"===e),p=f?null!==i?i+"Capture":null:i
f=[]
for(var v,h=r;null!==h;){var y=h
if(v=y.stateNode,5!==(y=y.tag)&&26!==y&&27!==y||null===v||null===p||null!=(y=be(h,p))&&f.push(eo(h,y,v)),d)break
h=h.return}0<f.length&&(i=new c(i,s,null,t,u),a.push({event:i,listeners:f}))}}if(!(7&n)){if(c="mouseout"===e||"pointerout"===e,(!(i="mouseover"===e||"pointerover"===e)||t===Ri||!(s=t.relatedTarget||t.fromElement)||!B(s)&&!s[mi])&&(c||i)&&(i=u.window===u?u:(i=u.ownerDocument)?i.defaultView||i.parentWindow:window,c?(c=r,null!==(s=(s=t.relatedTarget||t.toElement)?B(s):null)&&(d=l(s),f=s.tag,s!==d||5!==f&&27!==f&&6!==f)&&(s=null)):(c=null,s=r),c!==s)){if(f=Ji,y="onMouseLeave",p="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(f=ac,y="onPointerLeave",p="onPointerEnter",h="pointer"),d=null==c?i:$(c),v=null==s?i:$(s),(i=new f(y,h+"leave",c,t,u)).target=d,i.relatedTarget=v,y=null,B(u)===r&&((f=new f(p,h+"enter",s,t,u)).target=v,f.relatedTarget=d,y=f),d=y,c&&s)e:{for(p=s,h=0,v=f=c;v;v=to(v))h++
for(v=0,y=p;y;y=to(y))v++
for(;0<h-v;)f=to(f),h--
for(;0<v-h;)p=to(p),v--
for(;h--;){if(f===p||null!==p&&f===p.alternate)break e
f=to(f),p=to(p)}f=null}else f=null
null!==c&&ro(a,i,c,f,!1),null!==s&&null!==d&&ro(a,d,s,f,!0)}if("select"===(c=(i=r?$(r):window).nodeName&&i.nodeName.toLowerCase())||"input"===c&&"file"===i.type)var m=De
else if(Te(i))if(xc)m=Be
else{m=je
var b=Ie}else!(c=i.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==i.type&&"radio"!==i.type?r&&pe(r.elementType)&&(m=De):m=Ae
switch(m&&(m=m(e,r))?Me(a,m,t,u):(b&&b(e,i,r),"focusout"===e&&r&&"number"===i.type&&null!=r.memoizedProps.value&&oe(i,"number",i.value)),b=r?$(r):window,e){case"focusin":(Te(b)||"true"===b.contentEditable)&&(Mc=b,Fc=r,Lc=null)
break
case"focusout":Lc=Fc=Mc=null
break
case"mousedown":Dc=!0
break
case"contextmenu":case"mouseup":case"dragend":Dc=!1,We(a,t,u)
break
case"selectionchange":if(Tc)break
case"keydown":case"keyup":We(a,t,u)}var w
if(pc)e:{switch(e){case"compositionstart":var k="onCompositionStart"
break e
case"compositionend":k="onCompositionEnd"
break e
case"compositionupdate":k="onCompositionUpdate"
break e}k=void 0}else wc?_e(e,t)&&(k="onCompositionEnd"):"keydown"===e&&229===t.keyCode&&(k="onCompositionStart")
k&&(yc&&"ko"!==t.locale&&(wc||"onCompositionStart"!==k?"onCompositionEnd"===k&&wc&&(w=we()):(Vi="value"in(zi=u)?zi.value:zi.textContent,wc=!0)),0<(b=no(r,k)).length&&(k=new tc(k,e,null,t,u),a.push({event:k,listeners:b}),(w||null!==(w=Oe(t)))&&(k.data=w))),(w=hc?function(e,n){switch(e){case"compositionend":return Oe(n)
case"keypress":return 32!==n.which?null:(bc=!0,mc)
case"textInput":return(e=n.data)===mc&&bc?null:e
default:return null}}(e,t):function(e,n){if(wc)return"compositionend"===e||!pc&&_e(e,n)?(e=we(),Wi=Vi=zi=null,wc=!1,e):null
switch(e){case"paste":default:return null
case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char
if(n.which)return String.fromCharCode(n.which)}return null
case"compositionend":return yc&&"ko"!==n.locale?null:n.data}}(e,t))&&0<(k=no(r,"onBeforeInput")).length&&(b=new tc("onBeforeInput","beforeinput",null,t,u),a.push({event:b,listeners:k}),b.data=w),function(e,n,t,r,l){if("submit"===n&&t&&t.stateNode===l){var u=Ku((l[yi]||null).action),o=r.submitter
o&&null!==(n=(n=o[yi]||null)?Ku(n.formAction):o.getAttribute("formAction"))&&(u=n,o=null)
var a=new Xi("action","action",null,r,l)
e.push({event:a,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==nd){var e=o?Xu(l,o):new FormData(l)
lr(t,{pending:!0,data:e,method:l.method,action:u},null,e)}}else"function"==typeof u&&(a.preventDefault(),e=o?Xu(l,o):new FormData(l),lr(t,{pending:!0,data:e,method:l.method,action:u},u,e))},currentTarget:l}]})}}(a,e,r,t,u)}Gu(a,n)})}function eo(e,n,t){return{instance:e,listener:n,currentTarget:t}}function no(e,n){for(var t=n+"Capture",r=[];null!==e;){var l=e,u=l.stateNode
if(5!==(l=l.tag)&&26!==l&&27!==l||null===u||(null!=(l=be(e,t))&&r.unshift(eo(e,l,u)),null!=(l=be(e,n))&&r.push(eo(e,l,u))),3===e.tag)return r
e=e.return}return[]}function to(e){if(null===e)return null
do{e=e.return}while(e&&5!==e.tag&&27!==e.tag)
return e||null}function ro(e,n,t,r,l){for(var u=n.v,o=[];null!==t&&t!==r;){var a=t,i=a.alternate,c=a.stateNode
if(a=a.tag,null!==i&&i===r)break
5!==a&&26!==a&&27!==a||null===c||(i=c,l?null!=(c=be(t,u))&&o.unshift(eo(t,c,i)):l||null!=(c=be(t,u))&&o.push(eo(t,c,i))),t=t.return}0!==o.length&&e.push({event:n,listeners:o})}function lo(e){return("string"==typeof e?e:""+e).replace(ad,"\n").replace(id,"")}function uo(e,n){return n=lo(n),lo(e)===n}function oo(){}function ao(n,t,r,l,u,o){switch(r){case"children":"string"==typeof l?"body"===t||"textarea"===t&&""===l||se(n,l):("number"==typeof l||"bigint"==typeof l)&&"body"!==t&&se(n,""+l)
break
case"className":K(n,"class",l)
break
case"tabIndex":K(n,"tabindex",l)
break
case"dir":case"role":case"viewBox":case"width":case"height":K(n,r,l)
break
case"style":de(n,l,o)
break
case"data":if("object"!==t){K(n,"data",l)
break}case"src":case"href":if(""===l&&("a"!==t||"href"!==r)){n.removeAttribute(r)
break}if(null==l||"function"==typeof l||"symbol"==typeof l||"boolean"==typeof l){n.removeAttribute(r)
break}l=ve(""+l),n.setAttribute(r,l)
break
case"action":case"formAction":if("function"==typeof l){n.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')")
break}if("function"==typeof o&&("formAction"===r?("input"!==t&&ao(n,t,"name",u.name,u,null),ao(n,t,"formEncType",u.formEncType,u,null),ao(n,t,"formMethod",u.formMethod,u,null),ao(n,t,"formTarget",u.formTarget,u,null)):(ao(n,t,"encType",u.encType,u,null),ao(n,t,"method",u.method,u,null),ao(n,t,"target",u.target,u,null))),null==l||"symbol"==typeof l||"boolean"==typeof l){n.removeAttribute(r)
break}l=ve(""+l),n.setAttribute(r,l)
break
case"onClick":null!=l&&(n.onclick=oo)
break
case"onScroll":null!=l&&Yu("scroll",n)
break
case"onScrollEnd":null!=l&&Yu("scrollend",n)
break
case"dangerouslySetInnerHTML":if(null!=l){if("object"!=typeof l||!("N"in l))throw Error(e(61))
if(null!=(r=l.N)){if(null!=u.children)throw Error(e(60))
n.innerHTML=r}}break
case"multiple":n.multiple=l&&"function"!=typeof l&&"symbol"!=typeof l
break
case"muted":n.muted=l&&"function"!=typeof l&&"symbol"!=typeof l
break
case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break
case"xlinkHref":if(null==l||"function"==typeof l||"boolean"==typeof l||"symbol"==typeof l){n.removeAttribute("xlink:href")
break}r=ve(""+l),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r)
break
case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=l&&"function"!=typeof l&&"symbol"!=typeof l?n.setAttribute(r,""+l):n.removeAttribute(r)
break
case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&"function"!=typeof l&&"symbol"!=typeof l?n.setAttribute(r,""):n.removeAttribute(r)
break
case"capture":case"download":!0===l?n.setAttribute(r,""):!1!==l&&null!=l&&"function"!=typeof l&&"symbol"!=typeof l?n.setAttribute(r,l):n.removeAttribute(r)
break
case"cols":case"rows":case"size":case"span":null!=l&&"function"!=typeof l&&"symbol"!=typeof l&&!isNaN(l)&&1<=l?n.setAttribute(r,l):n.removeAttribute(r)
break
case"rowSpan":case"start":null==l||"function"==typeof l||"symbol"==typeof l||isNaN(l)?n.removeAttribute(r):n.setAttribute(r,l)
break
case"popover":Yu("beforetoggle",n),Yu("toggle",n),W(n,"popover",l)
break
case"xlinkActuate":X(n,"http://www.w3.org/1999/xlink","xlink:actuate",l)
break
case"xlinkArcrole":X(n,"http://www.w3.org/1999/xlink","xlink:arcrole",l)
break
case"xlinkRole":X(n,"http://www.w3.org/1999/xlink","xlink:role",l)
break
case"xlinkShow":X(n,"http://www.w3.org/1999/xlink","xlink:show",l)
break
case"xlinkTitle":X(n,"http://www.w3.org/1999/xlink","xlink:title",l)
break
case"xlinkType":X(n,"http://www.w3.org/1999/xlink","xlink:type",l)
break
case"xmlBase":X(n,"http://www.w3.org/XML/1998/namespace","xml:base",l)
break
case"xmlLang":X(n,"http://www.w3.org/XML/1998/namespace","xml:lang",l)
break
case"xmlSpace":X(n,"http://www.w3.org/XML/1998/namespace","xml:space",l)
break
case"is":W(n,"is",l)
break
case"innerText":case"textContent":break
default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&W(n,r=Li.get(r)||r,l)}}function io(n,t,r,l,u,o){switch(r){case"style":de(n,l,o)
break
case"dangerouslySetInnerHTML":if(null!=l){if("object"!=typeof l||!("N"in l))throw Error(e(61))
if(null!=(r=l.N)){if(null!=u.children)throw Error(e(60))
n.innerHTML=r}}break
case"children":"string"==typeof l?se(n,l):("number"==typeof l||"bigint"==typeof l)&&se(n,""+l)
break
case"onScroll":null!=l&&Yu("scroll",n)
break
case"onScrollEnd":null!=l&&Yu("scrollend",n)
break
case"onClick":null!=l&&(n.onclick=oo)
break
case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break
default:Si.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(u=r.endsWith("Capture"),t=r.slice(2,u?r.length-7:void 0),"function"==typeof(o=null!=(o=n[yi]||null)?o[r]:null)&&n.removeEventListener(t,o,u),"function"!=typeof l)?r in n?n[r]=l:!0===l?n.setAttribute(r,""):W(n,r,l):("function"!=typeof o&&null!==o&&(r in n?n[r]=null:n.hasAttribute(r)&&n.removeAttribute(r)),n.addEventListener(t,l,u)))}}function co(n,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break
case"img":Yu("error",n),Yu("load",n)
var l,u=!1,o=!1
for(l in r)if(r.hasOwnProperty(l)){var a=r[l]
if(null!=a)switch(l){case"src":u=!0
break
case"srcSet":o=!0
break
case"children":case"dangerouslySetInnerHTML":throw Error(e(137,t))
default:ao(n,t,l,a,r,null)}}return o&&ao(n,t,"srcSet",r.srcSet,r,null),u&&ao(n,t,"src",r.src,r,null),void 0
case"input":Yu("invalid",n)
var i=l=a=o=null,c=null,s=null
for(u in r)if(r.hasOwnProperty(u)){var f=r[u]
if(null!=f)switch(u){case"name":o=f
break
case"type":a=f
break
case"checked":c=f
break
case"defaultChecked":s=f
break
case"value":l=f
break
case"defaultValue":i=f
break
case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(e(137,t))
break
default:ao(n,t,u,f,r,null)}}return ue(n,l,i,c,s,a,o,!1),ee(n),void 0
case"select":for(o in Yu("invalid",n),u=a=l=null,r)if(r.hasOwnProperty(o)&&null!=(i=r[o]))switch(o){case"value":l=i
break
case"defaultValue":a=i
break
case"multiple":u=i
default:ao(n,t,o,i,r,null)}return t=l,r=a,n.multiple=!!u,null!=t?ae(n,!!u,t,!1):null!=r&&ae(n,!!u,r,!0),void 0
case"textarea":for(a in Yu("invalid",n),l=o=u=null,r)if(r.hasOwnProperty(a)&&null!=(i=r[a]))switch(a){case"value":u=i
break
case"defaultValue":o=i
break
case"children":l=i
break
case"dangerouslySetInnerHTML":if(null!=i)throw Error(e(91))
break
default:ao(n,t,a,i,r,null)}return ce(n,u,o,l),ee(n),void 0
case"option":for(c in r)r.hasOwnProperty(c)&&null!=(u=r[c])&&("selected"===c?n.selected=u&&"function"!=typeof u&&"symbol"!=typeof u:ao(n,t,c,u,r,null))
return
case"dialog":Yu("beforetoggle",n),Yu("toggle",n),Yu("cancel",n),Yu("close",n)
break
case"iframe":case"object":Yu("load",n)
break
case"video":case"audio":for(u=0;u<ld.length;u++)Yu(ld[u],n)
break
case"image":Yu("error",n),Yu("load",n)
break
case"details":Yu("toggle",n)
break
case"embed":case"source":case"link":Yu("error",n),Yu("load",n)
case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(s in r)if(r.hasOwnProperty(s)&&null!=(u=r[s]))switch(s){case"children":case"dangerouslySetInnerHTML":throw Error(e(137,t))
default:ao(n,t,s,u,r,null)}return
default:if(pe(t)){for(f in r)r.hasOwnProperty(f)&&void 0!==(u=r[f])&&io(n,t,f,u,r,void 0)
return}}for(i in r)r.hasOwnProperty(i)&&null!=(u=r[i])&&ao(n,t,i,u,r,null)}function so(e){return 9===e.nodeType?e:e.ownerDocument}function fo(e){switch(e){case"http://www.w3.org/2000/svg":return 1
case"http://www.w3.org/1998/Math/MathML":return 2
default:return 0}}function po(e,n){if(0===e)switch(n){case"svg":return 1
case"math":return 2
default:return 0}return 1===e&&"foreignObject"===n?0:e}function vo(e,n){return"textarea"===e||"noscript"===e||"string"==typeof n.children||"number"==typeof n.children||"bigint"==typeof n.children||"object"==typeof n.dangerouslySetInnerHTML&&null!==n.dangerouslySetInnerHTML&&null!=n.dangerouslySetInnerHTML.N}function ho(e){setTimeout(function(){throw e})}function yo(e){return"head"===e}function mo(e,n){var t=n,r=0,l=0
do{var u=t.nextSibling
if(e.removeChild(t),u&&8===u.nodeType)if("/$"===(t=u.data)){if(0<r&&8>r){t=r
var o=e.ownerDocument
if(1&t&&xo(o.documentElement),2&t&&xo(o.body),4&t)for(xo(t=o.head),o=t.firstChild;o;){var a=o.nextSibling,i=o.nodeName
o[Ei]||"SCRIPT"===i||"STYLE"===i||"LINK"===i&&"stylesheet"===o.rel.toLowerCase()||t.removeChild(o),o=a}}if(0===l)return e.removeChild(u),sa(n),void 0
l--}else"$"===t||"$?"===t||"$!"===t?l++:r=t.charCodeAt(0)-48
else r=0
t=u}while(t)
sa(n)}function bo(e){var n=e.firstChild
for(n&&10===n.nodeType&&(n=n.nextSibling);n;){var t=n
switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":bo(t),A(t)
continue
case"SCRIPT":case"STYLE":continue
case"LINK":if("stylesheet"===t.rel.toLowerCase())continue}e.removeChild(t)}}function wo(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function ko(e){for(;null!=e;e=e.nextSibling){var n=e.nodeType
if(1===n||3===n)break
if(8===n){if("$"===(n=e.data)||"$!"===n||"$?"===n||"F!"===n||"F"===n)break
if("/$"===n)return null}}return e}function go(e){e=e.previousSibling
for(var n=0;e;){if(8===e.nodeType){var t=e.data
if("$"===t||"$!"===t||"$?"===t){if(0===n)return e
n--}else"/$"===t&&n++}e=e.previousSibling}return null}function Eo(n,t,r){switch(t=so(r),n){case"html":if(!(n=t.documentElement))throw Error(e(452))
return n
case"head":if(!(n=t.head))throw Error(e(453))
return n
case"body":if(!(n=t.body))throw Error(e(454))
return n
default:throw Error(e(451))}}function xo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0])
A(e)}function So(e){return"function"==typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}function Co(e,n,t){var r=kd
if(r&&"string"==typeof n&&n){var l=re(n)
l='link[rel="'+e+'"][href="'+l+'"]',"string"==typeof t&&(l+='[crossorigin="'+t+'"]'),bd.has(l)||(bd.add(l),e={rel:e,crossOrigin:t,href:n},null===r.querySelector(l)&&(co(n=r.createElement("link"),"link",e),H(n),r.head.appendChild(n)))}}function _o(n,t,r,l){var u,o,a,i,c=(c=Wa.current)?So(c):null
if(!c)throw Error(e(446))
switch(n){case"meta":case"title":return null
case"style":return"string"==typeof r.precedence&&"string"==typeof r.href?(t=Oo(r.href),(l=(r=U(c).hoistableStyles).get(t))||(l={type:"style",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null}
case"link":if("stylesheet"===r.rel&&"string"==typeof r.href&&"string"==typeof r.precedence){n=Oo(r.href)
var s=U(c).hoistableStyles,f=s.get(n)
if(f||(c=c.ownerDocument||c,f={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(n,f),(s=c.querySelector(To(n)))&&!s.B&&(f.instance=s,f.state.loading=5),md.has(n)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},md.set(n,r),s||(u=c,o=n,a=r,i=f.state,void(u.querySelector('link[rel="preload"][as="style"]['+o+"]")?i.loading=1:(o=u.createElement("link"),i.preload=o,o.addEventListener("load",function(){return i.loading|=1}),o.addEventListener("error",function(){return i.loading|=2}),co(o,"link",a),H(o),u.head.appendChild(o)))))),t&&null===l)throw Error(e(528,""))
return f}if(t&&null!==l)throw Error(e(529,""))
return null
case"script":return t=r.async,"string"==typeof(r=r.src)&&t&&"function"!=typeof t&&"symbol"!=typeof t?(t=Fo(r),(l=(r=U(c).hoistableScripts).get(t))||(l={type:"script",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null}
default:throw Error(e(444,n))}}function Oo(e){return'href="'+re(e)+'"'}function To(e){return'link[rel="stylesheet"]['+e+"]"}function Mo(e){return ba({},e,{"data-precedence":e.precedence,precedence:null})}function Fo(e){return'[src="'+re(e)+'"]'}function Lo(e){return"script[async]"+e}function Do(n,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var l=n.querySelector('style[data-href~="'+re(r.href)+'"]')
if(l)return t.instance=l,H(l),l
var u=ba({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null})
return H(l=(n.ownerDocument||n).createElement("style")),co(l,"style",u),Ro(l,r.precedence,n),t.instance=l
case"stylesheet":u=Oo(r.href)
var o=n.querySelector(To(u))
if(o)return t.state.loading|=4,t.instance=o,H(o),o
l=Mo(r),(u=md.get(u))&&Po(l,u),H(o=(n.ownerDocument||n).createElement("link"))
var a=o
return a.B=new Promise(function(e,n){a.onload=e,a.onerror=n}),co(o,"link",l),t.state.loading|=4,Ro(o,r.precedence,n),t.instance=o
case"script":return o=Fo(r.src),(u=n.querySelector(Lo(o)))?(t.instance=u,H(u),u):(l=r,(u=md.get(o))&&Io(l=ba({},r),u),H(u=(n=n.ownerDocument||n).createElement("script")),co(u,"link",l),n.head.appendChild(u),t.instance=u)
case"void":return null
default:throw Error(e(443,t.type))}else"stylesheet"===t.type&&!(4&t.state.loading)&&(l=t.instance,t.state.loading|=4,Ro(l,r.precedence,n))
return t.instance}function Ro(e,n,t){for(var r=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=r.length?r[r.length-1]:null,u=l,o=0;o<r.length;o++){var a=r[o]
if(a.dataset.precedence===n)u=a
else if(u!==l)break}u?u.parentNode.insertBefore(e,u.nextSibling):(n=9===t.nodeType?t.head:t).insertBefore(e,n.firstChild)}function Po(e,n){null==e.crossOrigin&&(e.crossOrigin=n.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),null==e.title&&(e.title=n.title)}function Io(e,n){null==e.crossOrigin&&(e.crossOrigin=n.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),null==e.integrity&&(e.integrity=n.integrity)}function jo(e,n,t){if(null===gd){var r=new Map,l=gd=new Map
l.set(t,r)}else(r=(l=gd).get(t))||(r=new Map,l.set(t,r))
if(r.has(e))return r
for(r.set(e,null),t=t.getElementsByTagName(e),l=0;l<t.length;l++){var u=t[l]
if(!(u[Ei]||u[hi]||"link"===e&&"stylesheet"===u.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==u.namespaceURI){var o=u.getAttribute(n)||""
o=e+o
var a=r.get(o)
a?a.push(u):r.set(o,[u])}}return r}function Ao(e,n,t){(e=e.ownerDocument||e).head.insertBefore(t,"title"===n?e.querySelector("head > title"):null)}function Bo(e){return!!("stylesheet"!==e.type||3&e.state.loading)}function No(){}function $o(){if(this.count--,0===this.count)if(this.stylesheets)Uo(this,this.stylesheets)
else if(this.unsuspend){var e=this.unsuspend
this.unsuspend=null,e()}}function Uo(e,n){e.stylesheets=null,null!==e.unsuspend&&(e.count++,xd=new Map,n.forEach(Ho,e),xd=null,$o.call(e))}function Ho(e,n){if(!(4&n.state.loading)){var t=xd.get(e)
if(t)var r=t.get(null)
else{t=new Map,xd.set(e,t)
for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<l.length;u++){var o=l[u]
"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(t.set(o.dataset.precedence,o),r=o)}r&&t.set(null,r)}o=(l=n.instance).getAttribute("data-precedence"),(u=t.get(o)||r)===r&&t.set(null,l),t.set(o,l),this.count++,r=$o.bind(this),l.addEventListener("load",r),l.addEventListener("error",r),u?u.parentNode.insertBefore(l,u.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(l,e.firstChild),n.state.loading|=4}}function zo(e,n,t,r,l,u,o,a){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=F(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=F(0),this.hiddenUpdates=F(null),this.identifierPrefix=r,this.onUncaughtError=l,this.onCaughtError=u,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=a,this.incompleteTransitions=new Map}function Vo(e,n,t,r,l,u,o,a,i,c,s,f){return e=new zo(e,n,t,o,a,i,c,f),n=1,!0===u&&(n|=24),u=rn(3,null,null,n),e.current=u,u.stateNode=e,(n=Rn()).refCount++,e.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:t,cache:n},Vn(u),e}function Wo(e){return e?e=Yc:Yc}function Ko(e,n,t,r,l,u){l=Wo(l),null===r.context?r.context=l:r.pendingContext=l,(r=Kn(n)).payload={element:t},null!==(u=void 0===u?null:u)&&(r.callback=u),null!==(t=Xn(e,r,n))&&(lu(t,0,n),Gn(t,e,n))}function Xo(e,n){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var t=e.retryLane
e.retryLane=0!==t&&t<n?t:n}}function Go(e,n){Xo(e,n),(e=e.alternate)&&Xo(e,n)}function Yo(e){if(13===e.tag){var n=Ze(e,67108864)
null!==n&&lu(n,0,67108864),Go(e,67108864)}}function qo(e,n,t,r){var l=Ba.T
Ba.T=null
var u=Na.p
try{Na.p=2,Qo(e,n,t,r)}finally{Na.p=u,Ba.T=l}}function Jo(e,n,t,r){var l=Ba.T
Ba.T=null
var u=Na.p
try{Na.p=8,Qo(e,n,t,r)}finally{Na.p=u,Ba.T=l}}function Qo(e,n,t,r){if(Cd){var l=Zo(r)
if(null===l)Zu(e,n,r,_d,t),ta(e,r)
else if(function(e,n,t,r,l){switch(n){case"focusin":return Td=ra(Td,e,n,t,r,l),!0
case"dragenter":return Md=ra(Md,e,n,t,r,l),!0
case"mouseover":return Fd=ra(Fd,e,n,t,r,l),!0
case"pointerover":var u=l.pointerId
return Ld.set(u,ra(Ld.get(u)||null,e,n,t,r,l)),!0
case"gotpointercapture":return u=l.pointerId,Dd.set(u,ra(Dd.get(u)||null,e,n,t,r,l)),!0}return!1}(l,e,n,t,r))r.stopPropagation()
else if(ta(e,r),4&n&&-1<Pd.indexOf(e)){for(;null!==l;){var u=N(l)
if(null!==u)switch(u.tag){case 3:if((u=u.stateNode).current.memoizedState.isDehydrated){var o=S(u.pendingLanes)
if(0!==o){var a=u
for(a.pendingLanes|=2,a.entangledLanes|=2;o;){var i=1<<31-ci(o)
a.entanglements[1]|=i,o&=~i}Bu(u),!(6&bf)&&(Bf=Qa()+500,Nu(0))}}break
case 13:null!==(a=Ze(u,2))&&lu(a,0,2),cu(),Go(u,2)}if(null===(u=Zo(r))&&Zu(e,n,r,_d,t),u===l)break
l=u}null!==l&&r.stopPropagation()}else Zu(e,n,r,null,t)}}function Zo(e){return ea(e=he(e))}function ea(e){if(_d=null,null!==(e=B(e))){var n=l(e)
if(null===n)e=null
else{var t=n.tag
if(13===t){if(null!==(e=u(n)))return e
e=null}else if(3===t){if(n.stateNode.current.memoizedState.isDehydrated)return 3===n.tag?n.stateNode.containerInfo:null
e=null}else n!==e&&(e=null)}}return _d=e,null}function na(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8
case"message":switch(Za()){case ei:return 2
case ni:return 8
case ti:case ri:return 32
case li:return 268435456
default:return 32}default:return 32}}function ta(e,n){switch(e){case"focusin":case"focusout":Td=null
break
case"dragenter":case"dragleave":Md=null
break
case"mouseover":case"mouseout":Fd=null
break
case"pointerover":case"pointerout":Ld.delete(n.pointerId)
break
case"gotpointercapture":case"lostpointercapture":Dd.delete(n.pointerId)}}function ra(e,n,t,r,l,u){return null===e||e.nativeEvent!==u?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:u,targetContainers:[l]},null!==n&&null!==(n=N(n))&&Yo(n),e):(e.eventSystemFlags|=r,n=e.targetContainers,null!==l&&-1===n.indexOf(l)&&n.push(l),e)}function la(e){var n=B(e.target)
if(null!==n){var t=l(n)
if(null!==t)if(13===(n=t.tag)){if(null!==(n=u(t)))return e.blockedOn=n,function(e){var n=Na.p
try{return Na.p=e,function(){if(13===t.tag){var e=tu()
e=P(e)
var n=Ze(t,e)
null!==n&&lu(n,0,e),Go(t,e)}}()}finally{Na.p=n}}(e.priority),void 0}else if(3===n&&t.stateNode.current.memoizedState.isDehydrated)return e.blockedOn=3===t.tag?t.stateNode.containerInfo:null,void 0}e.blockedOn=null}function ua(e){if(null!==e.blockedOn)return!1
for(var n=e.targetContainers;0<n.length;){var t=Zo(e.nativeEvent)
if(null!==t)return null!==(n=N(t))&&Yo(n),e.blockedOn=t,!1
var r=new(t=e.nativeEvent).constructor(t.type,t)
Ri=r,t.target.dispatchEvent(r),Ri=null,n.shift()}return!0}function oa(e,n,t){ua(e)&&t.delete(n)}function aa(){Od=!1,null!==Td&&ua(Td)&&(Td=null),null!==Md&&ua(Md)&&(Md=null),null!==Fd&&ua(Fd)&&(Fd=null),Ld.forEach(oa),Dd.forEach(oa)}function ia(e,n){e.blockedOn===n&&(e.blockedOn=null,Od||(Od=!0,ha.unstable_scheduleCallback(ha.unstable_NormalPriority,aa)))}function ca(e){Id!==e&&(Id=e,ha.unstable_scheduleCallback(ha.unstable_NormalPriority,function(){Id===e&&(Id=null)
for(var n=0;n<e.length;n+=3){var t=e[n],r=e[n+1],l=e[n+2]
if("function"!=typeof r){if(null===ea(r||t))continue
break}var u=N(t)
null!==u&&(e.splice(n,3),n-=3,lr(u,{pending:!0,data:l,method:t.method,action:r},r,l))}}))}function sa(e){function n(n){return ia(n,e)}null!==Td&&ia(Td,e),null!==Md&&ia(Md,e),null!==Fd&&ia(Fd,e),Ld.forEach(n),Dd.forEach(n)
for(var t=0;t<Rd.length;t++){var r=Rd[t]
r.blockedOn===e&&(r.blockedOn=null)}for(;0<Rd.length&&null===(t=Rd[0]).blockedOn;)la(t),null===t.blockedOn&&Rd.shift()
if(null!=(t=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<t.length;r+=3){var l=t[r],u=t[r+1],o=l[yi]||null
if("function"==typeof u)o||ca(t)
else if(o){var a=null
if(u&&u.hasAttribute("formAction")){if(l=u,o=u[yi]||null)a=o.formAction
else if(null!==ea(l))continue}else a=o.action
"function"==typeof a?t[r+1]=a:(t.splice(r,3),r-=3),ca(t)}}}function fa(e){this.$=e}function da(e){this.$=e}if(d)return b
d=1
var pa,va,ha=r(),ya=t(),ma=function(){return f||(f=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),w.exports=function(){function e(e){var n="https://react.dev/errors/"+e
if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1])
for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}function r(e,n){return"font"===e?"":"string"==typeof n?"use-credentials"===n?n:"":void 0}if(s)return k
s=1
var l=t(),u={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal"),a=l.U
return k.V=u,k.createPortal=function(n,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null
if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(e(299))
return function(e,n,t){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:o,key:null==r?null:""+r,children:e,containerInfo:n,implementation:t}}(n,t,null,r)},k.flushSync=function(e){var n=a.T,t=u.p
try{if(a.T=null,u.p=2,e)return e()}finally{a.T=n,u.p=t,u.d.f()}},k.preconnect=function(e,n){"string"==typeof e&&(n=n?"string"==typeof(n=n.crossOrigin)?"use-credentials"===n?n:"":void 0:null,u.d.C(e,n))},k.prefetchDNS=function(e){"string"==typeof e&&u.d.D(e)},k.preinit=function(e,n){if("string"==typeof e&&n&&"string"==typeof n.as){var t=n.as,l=r(t,n.crossOrigin),o="string"==typeof n.integrity?n.integrity:void 0,a="string"==typeof n.fetchPriority?n.fetchPriority:void 0
"style"===t?u.d.S(e,"string"==typeof n.precedence?n.precedence:void 0,{crossOrigin:l,integrity:o,fetchPriority:a}):"script"===t&&u.d.X(e,{crossOrigin:l,integrity:o,fetchPriority:a,nonce:"string"==typeof n.nonce?n.nonce:void 0})}},k.preinitModule=function(e,n){if("string"==typeof e)if("object"==typeof n&&null!==n){if(null==n.as||"script"===n.as){var t=r(n.as,n.crossOrigin)
u.d.M(e,{crossOrigin:t,integrity:"string"==typeof n.integrity?n.integrity:void 0,nonce:"string"==typeof n.nonce?n.nonce:void 0})}}else null==n&&u.d.M(e)},k.preload=function(e,n){if("string"==typeof e&&"object"==typeof n&&null!==n&&"string"==typeof n.as){var t=n.as,l=r(t,n.crossOrigin)
u.d.L(e,t,{crossOrigin:l,integrity:"string"==typeof n.integrity?n.integrity:void 0,nonce:"string"==typeof n.nonce?n.nonce:void 0,type:"string"==typeof n.type?n.type:void 0,fetchPriority:"string"==typeof n.fetchPriority?n.fetchPriority:void 0,referrerPolicy:"string"==typeof n.referrerPolicy?n.referrerPolicy:void 0,imageSrcSet:"string"==typeof n.imageSrcSet?n.imageSrcSet:void 0,imageSizes:"string"==typeof n.imageSizes?n.imageSizes:void 0,media:"string"==typeof n.media?n.media:void 0})}},k.preloadModule=function(e,n){if("string"==typeof e)if(n){var t=r(n.as,n.crossOrigin)
u.d.m(e,{as:"string"==typeof n.as&&"script"!==n.as?n.as:void 0,crossOrigin:t,integrity:"string"==typeof n.integrity?n.integrity:void 0})}else u.d.m(e)},k.requestFormReset=function(e){u.d.r(e)},k.unstable_batchedUpdates=function(e,n){return e(n)},k.useFormState=function(e,n,t){return a.H.useFormState(e,n,t)},k.useFormStatus=function(){return a.H.useHostTransitionStatus()},k.version="19.1.1",k}()),w.exports}(),ba=Object.assign,wa=Symbol.for("react.element"),ka=Symbol.for("react.transitional.element"),ga=Symbol.for("react.portal"),Ea=Symbol.for("react.fragment"),xa=Symbol.for("react.strict_mode"),Sa=Symbol.for("react.profiler"),Ca=Symbol.for("react.provider"),_a=Symbol.for("react.consumer"),Oa=Symbol.for("react.context"),Ta=Symbol.for("react.forward_ref"),Ma=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),La=Symbol.for("react.memo"),Da=Symbol.for("react.lazy"),Ra=Symbol.for("react.activity"),Pa=Symbol.for("react.memo_cache_sentinel"),Ia=Symbol.iterator,ja=Symbol.for("react.client.reference"),Aa=Array.isArray,Ba=ya.U,Na=ma.V,$a={pending:!1,data:null,method:null,action:null},Ua=[],Ha=-1,za=p(null),Va=p(null),Wa=p(null),Ka=p(null),Xa=Object.prototype.hasOwnProperty,Ga=ha.unstable_scheduleCallback,Ya=ha.unstable_cancelCallback,qa=ha.unstable_shouldYield,Ja=ha.unstable_requestPaint,Qa=ha.unstable_now,Za=ha.unstable_getCurrentPriorityLevel,ei=ha.unstable_ImmediatePriority,ni=ha.unstable_UserBlockingPriority,ti=ha.unstable_NormalPriority,ri=ha.unstable_LowPriority,li=ha.unstable_IdlePriority,ui=ha.log,oi=ha.unstable_setDisableYieldValue,ai=null,ii=null,ci=Math.clz32?Math.clz32:function(e){return 0==(e>>>=0)?32:31-(si(e)/fi|0)|0},si=Math.log,fi=Math.LN2,di=256,pi=4194304,vi=Math.random().toString(36).slice(2),hi="__reactFiber$"+vi,yi="__reactProps$"+vi,mi="__reactContainer$"+vi,bi="__reactEvents$"+vi,wi="__reactListeners$"+vi,ki="__reactHandles$"+vi,gi="__reactResources$"+vi,Ei="__reactMarker$"+vi,xi=new Set,Si={},Ci=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_i={},Oi={},Ti=!1,Mi=/[\n"\\]/g,Fi=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")),Li=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Di=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,Ri=null,Pi=null,Ii=null,ji=!1,Ai=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),Bi=!1
if(Ai)try{var Ni={}
Object.defineProperty(Ni,"passive",{get:function(){Bi=!0}}),window.addEventListener("test",Ni,Ni),window.removeEventListener("test",Ni,Ni)}catch(Nd){Bi=!1}var $i,Ui,Hi,zi=null,Vi=null,Wi=null,Ki={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xi=xe(Ki),Gi=ba({},Ki,{view:0,detail:0}),Yi=xe(Gi),qi=ba({},Gi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ce,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Hi&&(Hi&&"mousemove"===e.type?($i=e.screenX-Hi.screenX,Ui=e.screenY-Hi.screenY):Ui=$i=0,Hi=e),$i)},movementY:function(e){return"movementY"in e?e.movementY:Ui}}),Ji=xe(qi),Qi=xe(ba({},qi,{dataTransfer:0})),Zi=xe(ba({},Gi,{relatedTarget:0})),ec=xe(ba({},Ki,{animationName:0,elapsedTime:0,pseudoElement:0})),nc=xe(ba({},Ki,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),tc=xe(ba({},Ki,{data:0})),rc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},oc=xe(ba({},Gi,{key:function(e){if(e.key){var n=rc[e.key]||e.key
if("Unidentified"!==n)return n}return"keypress"===e.type?13===(e=ke(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?lc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ce,charCode:function(e){return"keypress"===e.type?ke(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?ke(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),ac=xe(ba({},qi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ic=xe(ba({},Gi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ce})),cc=xe(ba({},Ki,{propertyName:0,elapsedTime:0,pseudoElement:0})),sc=xe(ba({},qi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),fc=xe(ba({},Ki,{newState:0,oldState:0})),dc=[9,13,27,32],pc=Ai&&"CompositionEvent"in window,vc=null
Ai&&"documentMode"in document&&(vc=document.documentMode)
var hc=Ai&&"TextEvent"in window&&!vc,yc=Ai&&(!pc||vc&&8<vc&&11>=vc),mc=String.fromCharCode(32),bc=!1,wc=!1,kc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},gc=null,Ec=null,xc=!1
if(Ai){var Sc
if(Ai){var Cc="oninput"in document
if(!Cc){var _c=document.createElement("div")
_c.setAttribute("oninput","return;"),Cc="function"==typeof _c.oninput}Sc=Cc}else Sc=!1
xc=Sc&&(!document.documentMode||9<document.documentMode)}var Oc="function"==typeof Object.is?Object.is:function(e,n){return e===n&&(0!==e||1/e==1/n)||e!=e&&n!=n},Tc=Ai&&"documentMode"in document&&11>=document.documentMode,Mc=null,Fc=null,Lc=null,Dc=!1,Rc={animationend:Ke("Animation","AnimationEnd"),animationiteration:Ke("Animation","AnimationIteration"),animationstart:Ke("Animation","AnimationStart"),transitionrun:Ke("Transition","TransitionRun"),transitionstart:Ke("Transition","TransitionStart"),transitioncancel:Ke("Transition","TransitionCancel"),transitionend:Ke("Transition","TransitionEnd")},Pc={},Ic={}
Ai&&(Ic=document.createElement("div").style,"AnimationEvent"in window||(delete Rc.animationend.animation,delete Rc.animationiteration.animation,delete Rc.animationstart.animation),"TransitionEvent"in window||delete Rc.transitionend.transition)
var jc=Xe("animationend"),Ac=Xe("animationiteration"),Bc=Xe("animationstart"),Nc=Xe("transitionrun"),$c=Xe("transitionstart"),Uc=Xe("transitioncancel"),Hc=Xe("transitionend"),zc=new Map,Vc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ")
Vc.push("scrollEnd")
var Wc=new WeakMap,Kc=[],Xc=0,Gc=0,Yc={},qc=[],Jc=0,Qc=null,Zc=0,es=[],ns=0,ts=null,rs=1,ls="",us=null,os=null,as=!1,is=null,cs=!1,ss=Error(e(519)),fs=p(null),ds=null,ps=null,vs="undefined"!=typeof AbortController?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(n,t){e.push(t)}}
this.abort=function(){n.aborted=!0,e.forEach(function(e){return e()})}},hs=ha.unstable_scheduleCallback,ys=ha.unstable_NormalPriority,ms={$$typeof:Oa,Consumer:null,Provider:null,o:null,W:null,K:0},bs=null,ws=0,ks=0,gs=null,Es=Ba.S
Ba.S=function(e,n){"object"==typeof n&&null!==n&&"function"==typeof n.then&&function(e,n){if(null===bs){var t=bs=[]
ws=0,ks=Wu(),gs={status:"pending",value:void 0,then:function(e){t.push(e)}}}return ws++,n.then(In,In),n}(0,n),null!==Es&&Es(e,n)}
for(var xs=p(null),Ss=Error(e(460)),Cs=Error(e(474)),_s=Error(e(542)),Os={then:function(){}},Ts=null,Ms=!1,Fs=!1,Ls=p(null),Ds=p(0),Rs=0,Ps=null,Is=null,js=null,As=!1,Bs=!1,Ns=!1,$s=0,Us=0,Hs=null,zs=0,Vs={readContext:Fn,use:ht,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useLayoutEffect:rt,useInsertionEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useSyncExternalStore:rt,useId:rt,useHostTransitionStatus:rt,useFormState:rt,useActionState:rt,useOptimistic:rt,useMemoCache:rt,useCacheRefresh:rt},Ws={readContext:Fn,use:ht,useCallback:function(e,n){return dt().memoizedState=[e,void 0===n?null:n],e},useContext:Fn,useEffect:Wt,useImperativeHandle:function(e,n,t){t=null!=t?t.concat([e]):null,zt(4194308,4,Yt.bind(null,n,e),t)},useLayoutEffect:function(e,n){return zt(4194308,4,e,n)},useInsertionEffect:function(e,n){zt(4,2,e,n)},useMemo:function(e,n){var t=dt()
n=void 0===n?null:n
var r=e()
if(Ns){x(!0)
try{e()}finally{x(!1)}}return t.memoizedState=[r,n],r},useReducer:function(e,n,t){var r=dt()
if(void 0!==t){var l=t(n)
if(Ns){x(!0)
try{t(n)}finally{x(!1)}}}else l=n
return r.memoizedState=r.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},r.queue=e,e=e.dispatch=fr.bind(null,Ps,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},dt().memoizedState=e},useState:function(e){var n=(e=Ot(e)).queue,t=dr.bind(null,Ps,n)
return n.dispatch=t,[e.memoizedState,t]},useDebugValue:Jt,useDeferredValue:function(e,n){return er(dt(),e,n)},useTransition:function(){var e=Ot(!1)
return e=tr.bind(null,Ps,e.queue,!0,!1),dt().memoizedState=e,[!1,e]},useSyncExternalStore:function(n,t,r){var l=Ps,u=dt()
if(as){if(void 0===r)throw Error(e(407))
r=r()}else{if(r=t(),null===wf)throw Error(e(349))
124&gf||Et(l,t,r)}u.memoizedState=r
var o={value:r,getSnapshot:t}
return u.queue=o,Wt(St.bind(null,l,o,n),[n]),l.flags|=2048,Ut(9,{destroy:void 0,resource:void 0},xt.bind(null,l,o,r,t),null),r},useId:function(){var e=dt(),n=wf.identifierPrefix
if(as){var t=ls
n="\xab"+n+"R"+(t=(rs&~(1<<32-ci(rs)-1)).toString(32)+t),0<(t=$s++)&&(n+="H"+t.toString(32)),n+="\xbb"}else n="\xab"+n+"r"+(t=zs++).toString(32)+"\xbb"
return e.memoizedState=n},useHostTransitionStatus:ar,useFormState:jt,useActionState:jt,useOptimistic:function(e){var n=dt()
n.memoizedState=n.baseState=e
var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return n.queue=t,n=vr.bind(null,Ps,!0,t),t.dispatch=n,[e,n]},useMemoCache:yt,useCacheRefresh:function(){return dt().memoizedState=sr.bind(null,Ps)}},Ks={readContext:Fn,use:ht,useCallback:Qt,useContext:Fn,useEffect:Kt,useImperativeHandle:qt,useInsertionEffect:Xt,useLayoutEffect:Gt,useMemo:Zt,useReducer:bt,useRef:Ht,useState:function(){return bt(mt)},useDebugValue:Jt,useDeferredValue:function(e,n){return nr(pt(),Is.memoizedState,e,n)},useTransition:function(){var e=bt(mt)[0],n=pt().memoizedState
return["boolean"==typeof e?e:vt(e),n]},useSyncExternalStore:gt,useId:ir,useHostTransitionStatus:ar,useFormState:At,useActionState:At,useOptimistic:function(e,n){return Tt(pt(),0,e,n)},useMemoCache:yt,useCacheRefresh:cr},Xs={readContext:Fn,use:ht,useCallback:Qt,useContext:Fn,useEffect:Kt,useImperativeHandle:qt,useInsertionEffect:Xt,useLayoutEffect:Gt,useMemo:Zt,useReducer:kt,useRef:Ht,useState:function(){return kt(mt)},useDebugValue:Jt,useDeferredValue:function(e,n){var t=pt()
return null===Is?er(t,e,n):nr(t,Is.memoizedState,e,n)},useTransition:function(){var e=kt(mt)[0],n=pt().memoizedState
return["boolean"==typeof e?e:vt(e),n]},useSyncExternalStore:gt,useId:ir,useHostTransitionStatus:ar,useFormState:$t,useActionState:$t,useOptimistic:function(e,n){var t=pt()
return null!==Is?Tt(t,0,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:yt,useCacheRefresh:cr},Gs=null,Ys=0,qs=Er(!0),Js=Er(!1),Qs=p(null),Zs=null,ef=p(0),nf={enqueueSetState:function(e,n,t){e=e._
var r=tu(),l=Kn(r)
l.payload=n,null!=t&&(l.callback=t),null!==(n=Xn(e,l,r))&&(lu(n,0,r),Gn(n,e,r))},enqueueReplaceState:function(e,n,t){e=e._
var r=tu(),l=Kn(r)
l.tag=1,l.payload=n,null!=t&&(l.callback=t),null!==(n=Xn(e,l,r))&&(lu(n,0,r),Gn(n,e,r))},enqueueForceUpdate:function(e,n){e=e._
var t=tu(),r=Kn(t)
r.tag=2,null!=n&&(r.callback=n),null!==(n=Xn(e,r,t))&&(lu(n,0,t),Gn(n,e,t))}},tf="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e})
if(!window.dispatchEvent(n))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",e),void 0
void 0},rf=Error(e(461)),lf=!1,uf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},of=!1,af=!1,cf=!1,sf="function"==typeof WeakSet?WeakSet:Set,ff=null,df=null,pf=!1,vf=null,hf=8192,yf={getCacheForType:function(e){var n=Fn(ms),t=n.data.get(e)
return void 0===t&&(t=e(),n.data.set(e,t)),t}},mf="function"==typeof WeakMap?WeakMap:Map,bf=0,wf=null,kf=null,gf=0,Ef=0,xf=null,Sf=!1,Cf=!1,_f=!1,Of=0,Tf=0,Mf=0,Ff=0,Lf=0,Df=0,Rf=0,Pf=null,If=null,jf=!1,Af=0,Bf=1/0,Nf=null,$f=null,Uf=0,Hf=null,zf=null,Vf=0,Wf=0,Kf=null,Xf=null,Gf=0,Yf=null,qf=null,Jf=null,Qf=!1,Zf=!1,ed=!1,nd=0,td=0;td<Vc.length;td++){var rd=Vc[td]
Ge(rd.toLowerCase(),"on"+(rd[0].toUpperCase()+rd.slice(1)))}Ge(jc,"onAnimationEnd"),Ge(Ac,"onAnimationIteration"),Ge(Bc,"onAnimationStart"),Ge("dblclick","onDoubleClick"),Ge("focusin","onFocus"),Ge("focusout","onBlur"),Ge(Nc,"onTransitionRun"),Ge($c,"onTransitionStart"),Ge(Uc,"onTransitionCancel"),Ge(Hc,"onTransitionEnd"),V("onMouseEnter",["mouseout","mouseover"]),V("onMouseLeave",["mouseout","mouseover"]),V("onPointerEnter",["pointerout","pointerover"]),V("onPointerLeave",["pointerout","pointerover"]),z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),z("onBeforeInput",["compositionend","keypress","textInput","paste"]),z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "))
var ld="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ud=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ld)),od="_reactListening"+Math.random().toString(36).slice(2),ad=/\r\n?/g,id=/\u0000|\uFFFD/g,cd=null,sd=null,fd=null,dd="function"==typeof setTimeout?setTimeout:void 0,pd="function"==typeof clearTimeout?clearTimeout:void 0,vd="function"==typeof Promise?Promise:void 0,hd="function"==typeof queueMicrotask?queueMicrotask:void 0!==vd?function(e){return vd.resolve(null).then(e).catch(ho)}:dd,yd=null,md=new Map,bd=new Set,wd=Na.d
Na.d={f:function(){var e=wd.f(),n=cu()
return e||n},r:function(e){var n=N(e)
null!==n&&5===n.tag&&"form"===n.type?or(n):wd.r(e)},D:function(e){wd.D(e),Co("dns-prefetch",e,null)},C:function(e,n){wd.C(e,n),Co("preconnect",e,n)},L:function(e,n,t){wd.L(e,n,t)
var r=kd
if(r&&e&&n){var l='link[rel="preload"][as="'+re(n)+'"]'
"image"===n&&t&&t.imageSrcSet?(l+='[imagesrcset="'+re(t.imageSrcSet)+'"]',"string"==typeof t.imageSizes&&(l+='[imagesizes="'+re(t.imageSizes)+'"]')):l+='[href="'+re(e)+'"]'
var u=l
switch(n){case"style":u=Oo(e)
break
case"script":u=Fo(e)}md.has(u)||(e=ba({rel:"preload",href:"image"===n&&t&&t.imageSrcSet?void 0:e,as:n},t),md.set(u,e),null!==r.querySelector(l)||"style"===n&&r.querySelector(To(u))||"script"===n&&r.querySelector(Lo(u))||(co(n=r.createElement("link"),"link",e),H(n),r.head.appendChild(n)))}},m:function(e,n){wd.m(e,n)
var t=kd
if(t&&e){var r=n&&"string"==typeof n.as?n.as:"script",l='link[rel="modulepreload"][as="'+re(r)+'"][href="'+re(e)+'"]',u=l
switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Fo(e)}if(!md.has(u)&&(e=ba({rel:"modulepreload",href:e},n),md.set(u,e),null===t.querySelector(l))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(Lo(u)))return}co(r=t.createElement("link"),"link",e),H(r),t.head.appendChild(r)}}},X:function(e,n){wd.X(e,n)
var t=kd
if(t&&e){var r=U(t).hoistableScripts,l=Fo(e),u=r.get(l)
u||((u=t.querySelector(Lo(l)))||(e=ba({src:e,async:!0},n),(n=md.get(l))&&Io(e,n),H(u=t.createElement("script")),co(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}},S:function(e,n,t){wd.S(e,n,t)
var r=kd
if(r&&e){var l=U(r).hoistableStyles,u=Oo(e)
n=n||"default"
var o=l.get(u)
if(!o){var a={loading:0,preload:null}
if(o=r.querySelector(To(u)))a.loading=5
else{e=ba({rel:"stylesheet",href:e,"data-precedence":n},t),(t=md.get(u))&&Po(e,t)
var i=o=r.createElement("link")
H(i),co(i,"link",e),i.B=new Promise(function(e,n){i.onload=e,i.onerror=n}),i.addEventListener("load",function(){a.loading|=1}),i.addEventListener("error",function(){a.loading|=2}),a.loading|=4,Ro(o,n,r)}o={type:"stylesheet",instance:o,count:1,state:a},l.set(u,o)}}},M:function(e,n){wd.M(e,n)
var t=kd
if(t&&e){var r=U(t).hoistableScripts,l=Fo(e),u=r.get(l)
u||((u=t.querySelector(Lo(l)))||(e=ba({src:e,async:!0,type:"module"},n),(n=md.get(l))&&Io(e,n),H(u=t.createElement("script")),co(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}}}
var kd="undefined"==typeof document?null:document,gd=null,Ed=null,xd=null,Sd={$$typeof:Oa,Provider:null,Consumer:null,o:$a,W:$a,K:0},Cd=!0,_d=null,Od=!1,Td=null,Md=null,Fd=null,Ld=new Map,Dd=new Map,Rd=[],Pd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "),Id=null
da.prototype.render=fa.prototype.render=function(n){var t=this.$
if(null===t)throw Error(e(409))
Ko(t.current,tu(),n,t,null,null)},da.prototype.unmount=fa.prototype.unmount=function(){var e=this.$
if(null!==e){this.$=null
var n=e.containerInfo
Ko(e.current,2,null,e,null,null),cu(),n[mi]=null}},da.prototype.unstable_scheduleHydration=function(e){if(e){var n=j()
e={blockedOn:null,target:e,priority:n}
for(var t=0;t<Rd.length&&0!==n&&n<Rd[t].priority;t++);Rd.splice(t,0,e),0===t&&la(e)}}
var jd=ya.version
if("19.1.1"!==jd)throw Error(e(527,jd,"19.1.1"))
Na.findDOMNode=function(n){var t=n._
if(void 0===t){if("function"==typeof n.render)throw Error(e(188))
throw n=Object.keys(n).join(","),Error(e(268,n))}return n=function(n){var t=n.alternate
if(!t){if(null===(t=l(n)))throw Error(e(188))
return t!==n?null:n}for(var r=n,u=t;;){var a=r.return
if(null===a)break
var i=a.alternate
if(null===i){if(null!==(u=a.return)){r=u
continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return o(a),n
if(i===u)return o(a),t
i=i.sibling}throw Error(e(188))}if(r.return!==u.return)r=a,u=i
else{for(var c=!1,s=a.child;s;){if(s===r){c=!0,r=a,u=i
break}if(s===u){c=!0,u=a,r=i
break}s=s.sibling}if(!c){for(s=i.child;s;){if(s===r){c=!0,r=i,u=a
break}if(s===u){c=!0,u=i,r=a
break}s=s.sibling}if(!c)throw Error(e(189))}}if(r.alternate!==u)throw Error(e(190))}if(3!==r.tag)throw Error(e(188))
return r.stateNode.current===r?n:t}(t),null===(n=null!==n?a(n):null)?null:n.stateNode}
var Ad={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:Ba,reconcilerVersion:"19.1.1"}
if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Bd=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(!Bd.isDisabled&&Bd.supportsFiber)try{ai=Bd.inject(Ad),ii=Bd}catch($d){}}return b.createRoot=function(t,r){if(!n(t))throw Error(e(299))
var l=!1,u="",o=Dr,a=Rr,i=Pr
return null!=r&&(!0===r.unstable_strictMode&&(l=!0),void 0!==r.identifierPrefix&&(u=r.identifierPrefix),void 0!==r.onUncaughtError&&(o=r.onUncaughtError),void 0!==r.onCaughtError&&(a=r.onCaughtError),void 0!==r.onRecoverableError&&(i=r.onRecoverableError),void 0!==r.unstable_transitionCallbacks&&r.unstable_transitionCallbacks),r=Vo(t,1,!1,null,0,l,u,o,a,i,0,null),t[mi]=r.current,Ju(t),new fa(r)},b.hydrateRoot=function(t,r,l){if(!n(t))throw Error(e(299))
var u=!1,o="",a=Dr,i=Rr,c=Pr,s=null
return null!=l&&(!0===l.unstable_strictMode&&(u=!0),void 0!==l.identifierPrefix&&(o=l.identifierPrefix),void 0!==l.onUncaughtError&&(a=l.onUncaughtError),void 0!==l.onCaughtError&&(i=l.onCaughtError),void 0!==l.onRecoverableError&&(c=l.onRecoverableError),void 0!==l.unstable_transitionCallbacks&&l.unstable_transitionCallbacks,void 0!==l.formState&&(s=l.formState)),(r=Vo(t,1,!0,r,0,u,o,a,i,c,0,s)).context=Wo(null),l=r.current,(o=Kn(u=P(u=tu()))).callback=null,Xn(l,o,u),l=u,r.current.lanes=l,L(r,l),Bu(r),t[mi]=r.current,Ju(t),new da(r)},b.version="19.1.1",b}async function n(e,n={}){const t=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const n=document.cookie.split(";")
for(let t of n){const[e,n]=t.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(n)}return null}(),r={...n,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...t&&{"X-CSRF-Token":t},...n.headers}}
if(r.body&&"string"==typeof r.body)try{const e=JSON.parse(r.body)
e.G=Date.now(),r.body=JSON.stringify(e)}catch(l){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const n=await fetch(e,r)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(n=>!e.headers.get(n)).length>0,0}(n),n}catch(u){throw void 0,u}}import{r as t,a as r,b as l,R as u}from"./vendor-BwJ0PBRo.js"
!function(){function e(e){if(e.ep)return
e.ep=!0
const n=function(e){const n={}
return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?n.credentials="include":"anonymous"===e.crossOrigin?n.credentials="omit":n.credentials="same-origin",n}(e)
fetch(e.href,n)}const n=document.createElement("link").relList
if(!(n&&n.supports&&n.supports("modulepreload"))){for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n)
new MutationObserver(n=>{for(const t of n)if("childList"===t.type)for(const n of t.addedNodes)"LINK"===n.tagName&&"modulepreload"===n.rel&&e(n)}).observe(document,{childList:!0,subtree:!0})}}()
const o={},a=function(e,n,t){function r(e){const n=new Event("vite:preloadError",{cancelable:!0})
if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e}let l=Promise.resolve()
if(n&&n.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))}
document.getElementsByTagName("link")
const t=document.querySelector("meta[property=csp-nonce]"),r=t?.nonce||t?.getAttribute("nonce")
l=e(n.map(e=>{if((e=function(e){return"/"+e}(e))in o)return
o[e]=!0
const n=e.endsWith(".css"),t=n?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${e}"]${t}`))return
const l=document.createElement("link")
return l.rel=n?"stylesheet":"modulepreload",n||(l.as="script"),l.crossOrigin="",l.href=e,r&&l.setAttribute("nonce",r),document.head.appendChild(l),n?new Promise((n,t)=>{l.addEventListener("load",n),l.addEventListener("error",()=>t(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return l.then(n=>{for(const e of n||[])"rejected"===e.status&&r(e.reason)
return e().catch(r)})}
var i,c,s,f,d,p,v={exports:{}},h={},y=function(){return c||(c=1,v.exports=function(){function e(e,t,r){var l=null
if(void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),"key"in t)for(var u in r={},t)"key"!==u&&(r[u]=t[u])
else r=t
return t=r.ref,{$$typeof:n,type:e,key:l,ref:void 0!==t?t:null,props:r}}if(i)return h
i=1
var n=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment")
return h.Fragment=t,h.jsx=e,h.jsxs=e,h}()),v.exports}(),m={exports:{}},b={},w={exports:{}},k={},g=function(){return p||(p=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),m.exports=e()),m.exports}()
class E{constructor(e={}){this.failureThreshold=e.failureThreshold||5,this.resetTimeout=e.resetTimeout||6e4,this.monitoringPeriod=e.monitoringPeriod||1e4,this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests=new Map}async execute(e,n=null,t=null){if(n&&this.pendingRequests.has(n))return void 0,this.pendingRequests.get(n)
const r=this.Y(e,t)
return n&&(this.pendingRequests.set(n,r),r.finally(()=>{setTimeout(()=>{this.pendingRequests.delete(n)},1e3)})),r}async Y(e,n){if("OPEN"===this.state){if(!(Date.now()-this.lastFailureTime>this.resetTimeout)){if(void 0,n)return n
throw new Error("Circuit breaker is OPEN")}this.state="HALF_OPEN",this.successCount=0}try{const n=await e()
return this.q(),n}catch(t){if(this.J(),n)return void 0,n
throw t}}q(){this.failureCount=0,"HALF_OPEN"===this.state&&(this.successCount++,this.successCount>=3&&(this.state="CLOSED"))}J(){this.failureCount++,this.lastFailureTime=Date.now(),this.failureCount>=this.failureThreshold&&(this.state="OPEN")}getState(){return{state:this.state,failureCount:this.failureCount,lastFailureTime:this.lastFailureTime,successCount:this.successCount}}reset(){this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests.clear()}}new E({failureThreshold:3,resetTimeout:3e4,monitoringPeriod:5e3})
const x=new E({failureThreshold:5,resetTimeout:6e4,monitoringPeriod:1e4}),S=new E({failureThreshold:10,resetTimeout:3e4,monitoringPeriod:5e3}),C=new class{constructor(){const e="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname
this.config={baseURL:e?"/api":"https://admin.b2b.click/api",timeout:1e4,retries:3,retryDelay:1e3,enableFallbacks:!0,enableCircuitBreaker:!0},this.fallbackCache=new Map}async fetchWithRetry(e,n={},t=1){const r=e.startsWith("http")?e:`${this.config.baseURL}${e}`,l={...n,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n.headers},credentials:"include"},u=new AbortController,o=setTimeout(()=>u.abort(),this.config.timeout)
l.signal=u.signal
try{void 0
const e=await fetch(r,l)
return clearTimeout(o),e}catch(a){if(clearTimeout(o),"AbortError"===a.name||"TypeError"===a.name&&a.message.includes("Failed to fetch"),t<this.config.retries){const r=this.config.retryDelay*t
return void 0,await new Promise(e=>setTimeout(e,r)),this.fetchWithRetry(e,n,t+1)}throw a}}async get(e){const n=`get:${e}`,t=e=>e.includes("/settings/seo")?{success:!0,settings:{default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",maintenance_mode:!1}}:e.includes("/maintenance-status")?{success:!0,maintenance_mode:!1,maintenance_message:"Service temporarily unavailable"}:null,r=async()=>{if(this.config.enableFallbacks&&this.fallbackCache.has(n)){const e=this.fallbackCache.get(n)
if(e.expires>Date.now())return void 0,{success:!0,data:e.data,cached:!0,fallback:!0}
this.fallbackCache.delete(n)}const t=await this.fetchWithRetry(e)
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
const r=await t.json()
return this.config.enableFallbacks&&r.success&&this.fallbackCache.set(n,{data:r,expires:Date.now()+3e5}),{success:!0,data:r}}
if(this.config.enableCircuitBreaker)try{return await x.execute(r,n,t(e))}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}try{return await r()}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}}async post(e,n){try{const t=await this.fetchWithRetry(e,{method:"POST",body:JSON.stringify(n)})
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
return{success:!0,data:await t.json()}}catch(t){return void 0,{success:!1,error:t.message}}}async getSEOSettings(){return this.get("/settings/seo")}async getMaintenanceStatus(){return this.get("/settings/maintenance-status")}async trackAnalytics(e){const n=async()=>{if(navigator.sendBeacon){const n=`${this.config.baseURL}/analytics/track`,t=new Blob([JSON.stringify(e)],{type:"application/json"})
if(!navigator.sendBeacon(n,t))throw new Error("Beacon failed to send")
void 0}else await this.post("/analytics/track",e)}
try{this.config.enableCircuitBreaker?await S.execute(n):await n()}catch(t){void 0}}clearCache(){this.fallbackCache.clear()}getCacheStats(){return{size:this.fallbackCache.size,keys:Array.from(this.fallbackCache.keys())}}},_={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"https://b2b.click/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let O=null,T=0
const M=async()=>{try{const e=Date.now(),n=e-T
if(O&&n<36e4)return void 0,n>288e3&&setTimeout(()=>async function(){try{return O=null,T=0,await M()}catch(e){O=oldCache,T=oldTimestamp}}(),100),O
void 0
const t=await C.getSEOSettings()
if(!t.success)throw new Error(t.error||"Failed to fetch SEO settings")
const r=t.data
if(r.success&&r.settings)return O={..._,...r.settings},T=e,O
throw void 0,new Error("Invalid API response format")}catch(e){return O?(void 0,O):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,_)}},F=async()=>{try{void 0
const e=await C.getMaintenanceStatus()
if(!e.success)return void 0,{maintenance_mode:!1}
const n=e.data
return void 0!==n.success?(void 0,{maintenance_mode:n.maintenance_mode||!1,maintenance_message:n.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:n.estimated_downtime||"2 hours",contact_information:n.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},L="seo_settings_cache",D=()=>{try{localStorage.removeItem(L)}catch(e){void 0}},R=e=>{try{const n={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},t=JSON.stringify(n)
t.length>5e4&&(void 0,D()),localStorage.setItem(L,t)}catch(n){if("QuotaExceededError"===n.name){void 0,D()
try{const n={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(L,JSON.stringify(n))}catch(t){void 0}}else void 0}},P=l.createContext(),I=({children:e})=>{const[n,t]=l.useState(_),[r,u]=l.useState({maintenance_mode:!1}),[o,a]=l.useState(!0),[i,c]=l.useState(null),[s,f]=l.useState({isMobile:!1,deviceType:"unknown"}),d=async(e=!0)=>{try{if(a(!0),e){const e=(()=>{try{const e=localStorage.getItem(L)
if(e){const{data:n,timestamp:t}=JSON.parse(e)
if(Date.now()-t<3e4)return void 0,n}}catch(e){void 0,D()}return null})()
if(e)return t(e),a(!1),p(),void 0}await p()}catch(n){void 0,t(_)}finally{a(!1)}},p=async()=>{try{void 0
const[e,n]=await Promise.all([M(),F()])
t(e),u(n),c(new Date),R(e)}catch(e){void 0}}
l.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n),r=e<=768||t
let l="desktop"
r&&(l=e<=480?"mobile":"tablet"),f({isMobile:r,deviceType:l})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),l.useEffect(()=>{d()},[]),l.useEffect(()=>{const e=setInterval(()=>{void 0,p()},3e5)
return()=>clearInterval(e)},[])
const v=l.useMemo(()=>n?(void 0,((e,n={})=>{const t={..._,...e},{isMobile:r=!1}=n,l=(u=t.default_og_image)&&""!==u.trim()?u.startsWith("http")?u:u.startsWith("/uploads/")||u.startsWith("/static/uploads/")?`https://admin.b2b.click${u}`:u.startsWith("/images/")||u.startsWith("/static/images/")?`https://b2b.click${u}`:`https://b2b.click${u.startsWith("/")?u:"/"+u}`:"https://b2b.click/images/og-image.png"
var u
const o=[{name:"description",content:t.default_description},{name:"keywords",content:t.default_keywords},{name:"author",content:t.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:t.default_title},{property:"og:description",content:t.default_description},{property:"og:image",content:l},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${t.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:t.twitter_handle},{name:"twitter:creator",content:t.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:t.default_title},{name:"twitter:description",content:t.default_description},{name:"twitter:image",content:l},{name:"twitter:image:alt",content:`${t.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&o.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:t.default_title,meta:o,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(n,s)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[n,s]),h={seoSettings:n,maintenanceStatus:r,metaTags:v,isLoading:o,lastUpdated:i,deviceInfo:s,refreshSEOSettings:async()=>{void 0,await d(!1)},updateSEOSetting:(e,n)=>{t(t=>{const r={...t,[e]:n}
return R(r),r}),c(new Date)},clearCache:()=>{D()},loadSEOSettings:d,isMaintenanceMode:()=>r.maintenance_mode}
return y.jsxs(P.Provider,{value:h,children:[y.jsx("title",{children:v.title}),v.meta.map((e,n)=>e.name?y.jsx("meta",{name:e.name,content:e.content},`meta-${n}`):e.property?y.jsx("meta",{property:e.property,content:e.content},`meta-${n}`):null),v.link.map((e,n)=>y.jsx("link",{...e},`link-${n}`)),e]})},j=()=>{const e=l.useContext(P)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},A=()=>(j(),l.useState(!0),null),B=()=>{const{maintenanceStatus:e}=j(),[n,t]=l.useState(!1)
if(l.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
t(e<=768||r)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:n?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:n?"20px":"40px",overflow:"hidden"},u={fontSize:n?"64px":"96px",marginBottom:n?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},o={fontSize:n?"28px":"48px",marginBottom:n?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},a={fontSize:n?"16px":"20px",marginBottom:n?"24px":"32px",maxWidth:n?"320px":"600px",lineHeight:1.6,opacity:.9},i={fontSize:n?"14px":"18px",marginBottom:n?"20px":"24px",opacity:.8,padding:n?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:n?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},c={fontSize:n?"12px":"16px",opacity:.6,marginTop:n?"20px":"32px"}
return y.jsxs("div",{style:r,children:[y.jsx("div",{style:u,children:"\ud83d\udd27"}),y.jsx("h1",{style:o,children:e.maintenance_title||"Site Under Maintenance"}),y.jsx("p",{style:a,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&y.jsxs("div",{style:i,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&y.jsxs("p",{style:c,children:["Questions? Contact us: ",e.contact_information]}),y.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:n?"80px":"120px",height:n?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),y.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:n?"60px":"100px",height:n?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})}
class N extends u.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,n){void 0,this.setState({error:e,errorInfo:n}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:e.message,error_stack:e.stack,component_stack:n.componentStack}})}render(){return this.state.hasError?y.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[y.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),y.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),y.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}const $=({message:e="Loading...",showMessage:n=!1,fullScreen:t=!0,minDisplayTime:r=800})=>{const[u,o]=l.useState(!0),[a,i]=l.useState(!0),[c,s]=l.useState(!1)
l.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches
i(!e)},[]),l.useEffect(()=>{const e=setTimeout(()=>{s(!0),setTimeout(()=>{o(!1)},300)},r)
return()=>clearTimeout(e)},[r]),l.useEffect(()=>{if(r>0){const e=setTimeout(()=>{o(!0)},r)
return()=>clearTimeout(e)}},[r])
const f={position:t?"fixed":"absolute",top:0,left:0,width:"100%",height:t?"100vh":"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:9999,fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:c?0:1,transition:a?"opacity 0.3s ease-out, transform 0.3s ease-out":"none",transform:c?"scale(0.95)":"scale(1)",pointerEvents:c?"none":"auto"},d={position:"relative",marginBottom:"0",transform:a&&!c?"scale(1)":"scale(0.9)",animation:a&&!c?"brandedLoaderPulse 2.5s ease-in-out infinite":"none",transition:a?"transform 0.3s ease-out":"none"},p={width:"120px",height:"auto",transition:a?"transform 0.3s ease":"none"},v={color:"rgba(255, 255, 255, 0.9)",fontSize:"16px",fontWeight:"500",letterSpacing:"0.5px",textAlign:"center",marginTop:"8px",opacity:n?1:0,transition:a?"opacity 0.3s ease":"none"},h={display:"inline-block",animation:a?"brandedLoaderDots 1.5s ease-in-out infinite":"none"}
return l.useEffect(()=>{if(!a)return
const e=document.createElement("style")
return e.textContent="\n      @keyframes brandedLoaderPulse {\n        0%, 100% {\n          transform: scale(1);\n        }\n        50% {\n          transform: scale(1.03);\n        }\n      }\n\n      @keyframes brandedLoaderDots {\n        0%, 20% {\n          opacity: 0;\n          transform: translateY(2px);\n        }\n        50% {\n          opacity: 1;\n          transform: translateY(0);\n        }\n        80%, 100% {\n          opacity: 0;\n          transform: translateY(-2px);\n        }\n      }\n\n      @keyframes brandedLoaderFadeIn {\n        0% {\n          opacity: 0;\n          transform: scale(0.9) translateY(10px);\n        }\n        100% {\n          opacity: 1;\n          transform: scale(1) translateY(0);\n        }\n      }\n\n      .branded-loader-container {\n        animation: brandedLoaderFadeIn 0.4s ease-out;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    ",document.head.appendChild(e),()=>{document.head.contains(e)&&document.head.removeChild(e)}},[a]),y.jsxs("div",{style:f,className:a?"branded-loader-container":"",children:[y.jsx("div",{style:d,children:y.jsx("img",{src:"/images/SMALL_B2BLOGO_WHITE.svg",alt:"Bounce2Bounce Logo",style:{...p,width:"120px",height:"auto",maxWidth:"100%"},"aria-label":"Bounce2Bounce Logo"})}),n&&y.jsxs("div",{style:v,children:[e,y.jsx("span",{style:h,children:"..."})]})]})},U=l.lazy(()=>a(()=>import("./HomePage-BAFQsRA5.js").then(e=>e.H),__vite__mapDeps([0,1,2,3,4,5,6]))),H=l.lazy(()=>a(()=>import("./AdminLoginFigma-DGLxUStp.js"),__vite__mapDeps([7,1,5])));(async()=>{const[{initializeAnalytics:e},{initializeCleanup:n},{initializeMobileOptimizations:t}]=await Promise.all([a(()=>import("./beacon-r5K5QvzQ.js"),[]),a(()=>import("./cleanup-CAYISNkO.js"),[]),a(()=>import("./mobileOptimization-DxuCIEdC.js"),[])])
n(),t(),e({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1}),a(()=>import("./memoryMonitor-B-PApq0Q.js"),[])})()
const z=l.lazy(()=>a(()=>import("./AboutPage-BSNcwysW.js").then(e=>e.A),__vite__mapDeps([8,1,2]))),V=l.lazy(()=>a(()=>import("./ContactPage-INIKkXY-.js"),__vite__mapDeps([9,1,2]))),W=l.lazy(()=>a(()=>import("./NotFoundPage-zuIyJ7mG.js"),__vite__mapDeps([10,1,11]))),K=()=>y.jsx($,{fullScreen:!0,minDisplayTime:500,showMessage:!1}),X=()=>{const[e,n]=l.useState(!1),[t,r]=l.useState(window.location.pathname)
l.useEffect(()=>{void 0},[t])
const u=l.useCallback(e=>{n(!0),setTimeout(()=>{window.history.pushState({},"",e),r(e),n(!1)},150)},[])
return l.useEffect(()=>(window.navigateWithTransition=u,()=>{delete window.navigateWithTransition}),[u]),l.useEffect(()=>{const e=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)},[]),y.jsxs(I,{children:[y.jsx(B,{}),(()=>{if(e)return y.jsx(K,{})
switch(t){case"/":return y.jsx(l.Suspense,{fallback:y.jsx(K,{}),children:y.jsx(U,{})})
case"/about":return y.jsx(l.Suspense,{fallback:y.jsx(K,{}),children:y.jsx(z,{})})
case"/contact":return y.jsx(l.Suspense,{fallback:y.jsx(K,{}),children:y.jsx(V,{})})
case"/admin/login":return y.jsx(l.Suspense,{fallback:y.jsx(K,{}),children:y.jsx(H,{})})
default:return y.jsx(l.Suspense,{fallback:y.jsx(K,{}),children:y.jsx(W,{})})}})(),y.jsx(A,{})]})},G=document.getElementById("root")
if(G)try{g.createRoot(G).render(y.jsx(N,{children:y.jsx(X,{})}))}catch(Y){void 0}void document.addEventListener("securitypolicyviolation",e=>{const t={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&n("/api/security/csp-violation",{method:"POST",body:JSON.stringify(t)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const e=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const n=window.parent.location.origin
e.includes(n)||(void 0,window.top.location=window.location)}catch(Y){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()}))
export{$ as B,a as _,y as j,n as s,j as u}
