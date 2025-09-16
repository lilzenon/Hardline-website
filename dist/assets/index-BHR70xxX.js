const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CL15ClAe.js","assets/vendor-quiY1y6M.js","assets/usePerformantResize-B__c1Oqo.js","assets/beacon-r5K5QvzQ.js","assets/mobileOptimization-DxuCIEdC.js","assets/sanitizer-DK8y3Tb9.js","assets/SocialMediaButtons-DrJbO3_f.js","assets/AdminLoginFigma-4q8MRIYU.js","assets/AboutPage-BkSd-xI9.js","assets/ContactPage-BKJ6R-Qb.js","assets/NotFoundPage-Z3g9JszE.js","assets/NotFoundPage-Dsu-tIjE.css"])))=>i.map(i=>d[i]);
function e(){function e(e){var n="https://react.dev/errors/"+e
if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1])
for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function t(e){var n=e,t=e
if(e.alternate)for(;n.return;)n=n.return
else{e=n
do{!!(4098&(n=e).flags)&&(t=n.return),e=n.return}while(e)}return 3===n.tag?t:null}function r(e){if(13===e.tag){var n=e.memoizedState
if(null===n&&null!==(e=e.alternate)&&(n=e.memoizedState),null!==n)return n.dehydrated}return null}function l(n){if(t(n)!==n)throw Error(e(188))}function u(e){var n=e.tag
if(5===n||26===n||27===n||6===n)return e
for(e=e.child;null!==e;){if(null!==(n=u(e)))return n
e=e.sibling}return null}function a(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=jo&&e[jo]||e["@@iterator"])?e:null}function c(e){if(null==e)return null
if("function"==typeof e)return e.$$typeof===Po?null:e.displayName||e.name||null
if("string"==typeof e)return e
switch(e){case Eo:return"Fragment"
case xo:return"Profiler"
case So:return"StrictMode"
case Mo:return"Suspense"
case Fo:return"SuspenseList"
case Do:return"Activity"}if("object"==typeof e)switch(e.$$typeof){case go:return"Portal"
case _o:return(e.displayName||"Context")+".Provider"
case To:return(e.t.displayName||"Context")+".Consumer"
case Oo:var n=e.render
return(e=e.displayName)||(e=""!==(e=n.displayName||n.name||"")?"ForwardRef("+e+")":"ForwardRef"),e
case Ao:return null!==(n=e.displayName||null)?n:c(e.type)||"Memo"
case Lo:n=e.l,e=e.u
try{return c(e(n))}catch(t){}}return null}function s(e){return{current:e}}function f(e){0>Uo||(e.current=No[Uo],No[Uo]=null,Uo--)}function d(e,n){Uo++,No[Uo]=e.current,e.current=n}function p(e,n){switch(d(Wo,n),d(Vo,e),d(zo,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?fi(e):0
break
default:if(e=n.tagName,n=n.namespaceURI)e=di(n=fi(n),e)
else switch(e){case"svg":e=1
break
case"math":e=2
break
default:e=0}}f(zo),d(zo,e)}function h(){f(zo),f(Vo),f(Wo)}function v(e){null!==e.memoizedState&&d(Ko,e)
var n=zo.current,t=di(n,e.type)
n!==t&&(d(Vo,e),d(zo,t))}function y(e){Vo.current===e&&(f(zo),f(Vo)),Ko.current===e&&(f(Ko),xd.i=Ho)}function k(e){if("function"==typeof ua&&ia(e),aa&&"function"==typeof aa.setStrictMode)try{aa.setStrictMode(oa,e)}catch(n){}}function g(e){var n=42&e
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
default:return e}}function E(e,n,t){var r=e.pendingLanes
if(0===r)return 0
var l=0,u=e.suspendedLanes,i=e.pingedLanes
e=e.warmLanes
var o=134217727&r
return 0!==o?0!==(r=o&~u)?l=g(r):0!==(i&=o)?l=g(i):t||0!==(t=o&~e)&&(l=g(t)):0!==(o=r&~u)?l=g(o):0!==i?l=g(i):t||0!==(t=r&~e)&&(l=g(t)),0===l?0:0!==n&&n!==l&&0===(n&u)&&((u=l&-l)>=(t=n&-n)||32===u&&4194048&t)?n:l}function S(e,n){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)}function x(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250
case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3
default:return-1}}function C(){var e=da
return!(4194048&(da<<=1))&&(da=256),e}function T(){var e=pa
return!(62914560&(pa<<=1))&&(pa=4194304),e}function F(e){for(var n=[],t=0;31>t;t++)n.push(e)
return n}function A(e,n){e.pendingLanes|=n,268435456!==n&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function L(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n
var r=31-ca(n)
e.entangledLanes|=n,e.entanglements[r]=1073741824|e.entanglements[r]|4194090&t}function D(e,n){var t=e.entangledLanes|=n
for(e=e.entanglements;t;){var r=31-ca(t),l=1<<r
l&n|e[r]&n&&(e[r]|=n),t&=~l}}function R(e){switch(e){case 2:e=1
break
case 8:e=4
break
case 32:e=16
break
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128
break
case 268435456:e=134217728
break
default:e=0}return e}function j(e){return 2<(e&=-e)?8<e?134217727&e?32:268435456:8:2}function P(){var e=Bo.p
return 0!==e?e:void 0===(e=window.event)?32:eo(e.type)}function I(e){delete e[va],delete e[ya],delete e[ba],delete e[wa],delete e[ka]}function $(e){var n=e[va]
if(n)return n
for(var t=e.parentNode;t;){if(n=t[ma]||t[va]){if(t=n.alternate,null!==n.child||null!==t&&null!==t.child)for(e=ki(e);null!==e;){if(t=e[va])return t
e=ki(e)}return n}t=(e=t).parentNode}return null}function B(e){if(e=e[va]||e[ma]){var n=e.tag
if(5===n||6===n||13===n||26===n||27===n||3===n)return e}return null}function H(n){var t=n.tag
if(5===t||26===t||27===t||6===t)return n.stateNode
throw Error(e(33))}function N(e){var n=e[ga]
return n||(n=e[ga]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function U(e){e[Ea]=!0}function z(e,n){V(e,n),V(e+"Capture",n)}function V(e,n){for(xa[e]=n,e=0;e<n.length;e++)Sa.add(n[e])}function W(e,n,t){if(l=n,Xo.call(_a,l)||!Xo.call(Ta,l)&&(Ca.test(l)?_a[l]=!0:(Ta[l]=!0,0)))if(null===t)e.removeAttribute(n)
else{switch(typeof t){case"undefined":case"function":case"symbol":return e.removeAttribute(n),void 0
case"boolean":var r=n.toLowerCase().slice(0,5)
if("data-"!==r&&"aria-"!==r)return e.removeAttribute(n),void 0}e.setAttribute(n,""+t)}var l}function K(e,n,t){if(null===t)e.removeAttribute(n)
else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":return e.removeAttribute(n),void 0}e.setAttribute(n,""+t)}}function X(e,n,t,r){if(null===r)e.removeAttribute(t)
else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return e.removeAttribute(t),void 0}e.setAttributeNS(n,t,""+r)}}function q(e){if(void 0===po)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/)
po=n&&n[1]||"",ho=-1<t.stack.indexOf("\n    at")?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+po+e+ho}function G(e,n){if(!e||Oa)return""
Oa=!0
var t=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var r={DetermineComponentFrameRoot:function(){try{if(n){var t=function(){throw Error()}
if(Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(l){var r=l}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}}else{try{throw Error()}catch(i){r=i}(t=e())&&"function"==typeof t.catch&&t.catch(function(){})}}catch(o){if(o&&r&&"string"==typeof o.stack)return[o.stack,r.stack]}return[null,null]}}
r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var l=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name")
l&&l.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=r.DetermineComponentFrameRoot(),i=u[0],o=u[1]
if(i&&o){var a=i.split("\n"),c=o.split("\n")
for(l=r=0;r<a.length&&!a[r].includes("DetermineComponentFrameRoot");)r++
for(;l<c.length&&!c[l].includes("DetermineComponentFrameRoot");)l++
if(r===a.length||l===c.length)for(r=a.length-1,l=c.length-1;1<=r&&0<=l&&a[r]!==c[l];)l--
for(;1<=r&&0<=l;r--,l--)if(a[r]!==c[l]){if(1!==r||1!==l)do{if(r--,0>--l||a[r]!==c[l]){var s="\n"+a[r].replace(" at new "," at ")
return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=r&&0<=l)
break}}}finally{Oa=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?q(t):""}function Y(e){switch(e.tag){case 26:case 27:case 5:return q(e.type)
case 16:return q("Lazy")
case 13:return q("Suspense")
case 19:return q("SuspenseList")
case 0:case 15:return G(e.type,!1)
case 11:return G(e.type.render,!1)
case 1:return G(e.type,!0)
case 31:return q("Activity")
default:return""}}function J(e){try{var n=""
do{n+=Y(e),e=e.return}while(e)
return n}catch(t){return"\nError generating stack: "+t.message+"\n"+t.stack}}function Q(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e
default:return""}}function Z(e){var n=e.type
return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===n||"radio"===n)}function ee(e){e.o||(e.o=function(e){var n=Z(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n]
if(!e.hasOwnProperty(n)&&void 0!==t&&"function"==typeof t.get&&"function"==typeof t.set){var l=t.get,u=t.set
return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(e){r=""+e,u.call(this,e)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e.o=null,delete e[n]}}}}(e))}function ne(e){if(!e)return!1
var n=e.o
if(!n)return!0
var t=n.getValue(),r=""
return e&&(r=Z(e)?e.checked?"true":"false":e.value),(e=r)!==t&&(n.setValue(e),!0)}function te(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null
try{return e.activeElement||e.body}catch(n){return e.body}}function re(e){return e.replace(Ma,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function le(e,n,t,r,l,u,i,o){e.name="",null!=i&&"function"!=typeof i&&"symbol"!=typeof i&&"boolean"!=typeof i?e.type=i:e.removeAttribute("type"),null!=n?"number"===i?(0===n&&""===e.value||e.value!=n)&&(e.value=""+Q(n)):e.value!==""+Q(n)&&(e.value=""+Q(n)):"submit"!==i&&"reset"!==i||e.removeAttribute("value"),null!=n?ie(e,i,Q(n)):null!=t?ie(e,i,Q(t)):null!=r&&e.removeAttribute("value"),null==l&&null!=u&&(e.defaultChecked=!!u),null!=l&&(e.checked=l&&"function"!=typeof l&&"symbol"!=typeof l),null!=o&&"function"!=typeof o&&"symbol"!=typeof o&&"boolean"!=typeof o?e.name=""+Q(o):e.removeAttribute("name")}function ue(e,n,t,r,l,u,i,o){if(null!=u&&"function"!=typeof u&&"symbol"!=typeof u&&"boolean"!=typeof u&&(e.type=u),null!=n||null!=t){if(("submit"===u||"reset"===u)&&null==n)return
t=null!=t?""+Q(t):"",n=null!=n?""+Q(n):t,o||n===e.value||(e.value=n),e.defaultValue=n}r="function"!=typeof(r=null!=r?r:l)&&"symbol"!=typeof r&&!!r,e.checked=o?e.checked:!!r,e.defaultChecked=!!r,null!=i&&"function"!=typeof i&&"symbol"!=typeof i&&"boolean"!=typeof i&&(e.name=i)}function ie(e,n,t){"number"===n&&te(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function oe(e,n,t,r){if(e=e.options,n){n={}
for(var l=0;l<t.length;l++)n["$"+t[l]]=!0
for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Q(t),n=null,l=0;l<e.length;l++){if(e[l].value===t)return e[l].selected=!0,r&&(e[l].defaultSelected=!0),void 0
null!==n||e[l].disabled||(n=e[l])}null!==n&&(n.selected=!0)}}function ae(e,n,t){if(null!=n&&((n=""+Q(n))!==e.value&&(e.value=n),null==t))return e.defaultValue!==n&&(e.defaultValue=n),void 0
e.defaultValue=null!=t?""+Q(t):""}function ce(n,t,r,l){if(null==t){if(null!=l){if(null!=r)throw Error(e(92))
if(Io(l)){if(1<l.length)throw Error(e(93))
l=l[0]}r=l}null==r&&(r=""),t=r}r=Q(t),n.defaultValue=r,(l=n.textContent)===r&&""!==l&&null!==l&&(n.value=l)}function se(e,n){if(n){var t=e.firstChild
if(t&&t===e.lastChild&&3===t.nodeType)return t.nodeValue=n,void 0}e.textContent=n}function fe(e,n,t){var r=0===n.indexOf("--")
null==t||"boolean"==typeof t||""===t?r?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="":r?e.setProperty(n,t):"number"!=typeof t||0===t||Fa.has(n)?"float"===n?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function de(n,t,r){if(null!=t&&"object"!=typeof t)throw Error(e(62))
if(n=n.style,null!=r){for(var l in r)!r.hasOwnProperty(l)||null!=t&&t.hasOwnProperty(l)||(0===l.indexOf("--")?n.setProperty(l,""):"float"===l?n.cssFloat="":n[l]="")
for(var u in t)l=t[u],t.hasOwnProperty(u)&&r[u]!==l&&fe(n,u,l)}else for(var i in t)t.hasOwnProperty(i)&&fe(n,i,t[i])}function pe(e){if(-1===e.indexOf("-"))return!1
switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1
default:return!0}}function he(e){return La.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ve(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function ye(n){var t=B(n)
if(t&&(n=t.stateNode)){var r=n[ya]||null
e:switch(n=t.stateNode,t.type){case"input":if(le(n,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=n;r.parentNode;)r=r.parentNode
for(r=r.querySelectorAll('input[name="'+re(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var l=r[t]
if(l!==n&&l.form===n.form){var u=l[ya]||null
if(!u)throw Error(e(90))
le(l,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<r.length;t++)(l=r[t]).form===n.form&&ne(l)}break e
case"textarea":ae(n,r.value,r.defaultValue)
break e
case"select":null!=(t=r.value)&&oe(n,!!r.multiple,t,!1)}}}function me(e,n,t){if(Pa)return e(n,t)
Pa=!0
try{return e(n)}finally{if(Pa=!1,(null!==Ra||null!==ja)&&(cu(),Ra&&(n=Ra,e=ja,ja=Ra=null,ye(n),e)))for(n=0;n<e.length;n++)ye(e[n])}}function be(n,t){var r=n.stateNode
if(null===r)return null
var l=r[ya]||null
if(null===l)return null
r=l[t]
e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(l=!("button"===(n=n.type)||"input"===n||"select"===n||"textarea"===n)),n=!l
break e
default:n=!1}if(n)return null
if(r&&"function"!=typeof r)throw Error(e(231,t,typeof r))
return r}function we(){if(Wa)return Wa
var e,n,t=Va,r=t.length,l="value"in za?za.value:za.textContent,u=l.length
for(e=0;e<r&&t[e]===l[e];e++);var i=r-e
for(n=1;n<=i&&t[r-n]===l[u-n];n++);return Wa=l.slice(e,1<n?1-n:void 0)}function ke(e){var n=e.keyCode
return"charCode"in e?0===(e=e.charCode)&&13===n&&(e=13):e=n,10===e&&(e=13),32<=e||13===e?e:0}function ge(){return!0}function Ee(){return!1}function Se(e){function n(n,t,r,l,u){for(var i in this.h=n,this.v=r,this.type=t,this.nativeEvent=l,this.target=u,this.currentTarget=null,e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(l):l[i])
return this.isDefaultPrevented=(null!=l.defaultPrevented?l.defaultPrevented:!1===l.returnValue)?ge:Ee,this.isPropagationStopped=Ee,this}return bo(n.prototype,{preventDefault:function(){this.defaultPrevented=!0
var e=this.nativeEvent
e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=ge)},stopPropagation:function(){var e=this.nativeEvent
e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=ge)},persist:function(){},isPersistent:ge}),n}function xe(e){var n=this.nativeEvent
return n.getModifierState?n.getModifierState(e):!!(e=uc[e])&&!!n[e]}function Ce(){return xe}function Te(e,n){switch(e){case"keyup":return-1!==dc.indexOf(n.keyCode)
case"keydown":return 229!==n.keyCode
case"keypress":case"mousedown":case"focusout":return!0
default:return!1}}function _e(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}function Oe(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return"input"===n?!!kc[e.type]:"textarea"===n}function Me(e,n,t,r){Ra?ja?ja.push(r):ja=[r]:Ra=r,0<(n=ni(n,"onChange")).length&&(t=new Xa("onChange","change",null,t,r),e.push({event:t,listeners:n}))}function Fe(e){qu(e,0)}function Ae(e){if(ne(H(e)))return e}function Le(e,n){if("change"===e)return n}function De(){gc&&(gc.detachEvent("onpropertychange",Re),Ec=gc=null)}function Re(e){if("value"===e.propertyName&&Ae(Ec)){var n=[]
Me(n,Ec,e,ve(e)),me(Fe,n)}}function je(e,n,t){"focusin"===e?(De(),Ec=t,(gc=n).attachEvent("onpropertychange",Re)):"focusout"===e&&De()}function Pe(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Ae(Ec)}function Ie(e,n){if("click"===e)return Ae(n)}function $e(e,n){if("input"===e||"change"===e)return Ae(n)}function Be(e,n){if(_c(e,n))return!0
if("object"!=typeof e||null===e||"object"!=typeof n||null===n)return!1
var t=Object.keys(e),r=Object.keys(n)
if(t.length!==r.length)return!1
for(r=0;r<t.length;r++){var l=t[r]
if(!Xo.call(n,l)||!_c(e[l],n[l]))return!1}return!0}function He(e){for(;e&&e.firstChild;)e=e.firstChild
return e}function Ne(e,n){var t,r=He(e)
for(e=0;r;){if(3===r.nodeType){if(t=e+r.textContent.length,e<=n&&t>=n)return{node:r,offset:n-e}
e=t}e:{for(;r;){if(r.nextSibling){r=r.nextSibling
break e}r=r.parentNode}r=void 0}r=He(r)}}function Ue(e,n){return!(!e||!n)&&(e===n||(!e||3!==e.nodeType)&&(n&&3===n.nodeType?Ue(e,n.parentNode):"contains"in e?e.contains(n):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(n))))}function ze(e){for(var n=te((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);n instanceof e.HTMLIFrameElement;){try{var t="string"==typeof n.contentWindow.location.href}catch(r){t=!1}if(!t)break
n=te((e=n.contentWindow).document)}return n}function Ve(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return n&&("input"===n&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===n||"true"===e.contentEditable)}function We(e,n,t){var r=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument
Lc||null==Mc||Mc!==te(r)||(r="selectionStart"in(r=Mc)&&Ve(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Ac&&Be(Ac,r)||(Ac=r,0<(r=ni(Fc,"onSelect")).length&&(n=new Xa("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Mc)))}function Ke(e,n){var t={}
return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}function Xe(e){if(Rc[e])return Rc[e]
if(!Dc[e])return e
var n,t=Dc[e]
for(n in t)if(t.hasOwnProperty(n)&&n in jc)return Rc[e]=t[n]
return e}function qe(e,n){zc.set(e,n),z(n,[e])}function Ge(e,n){if("object"==typeof e&&null!==e){var t=Wc.get(e)
return void 0!==t?t:(n={value:e,source:n,stack:J(n)},Wc.set(e,n),n)}return{value:e,source:n,stack:J(n)}}function Ye(){for(var e=Xc,n=qc=Xc=0;n<e;){var t=Kc[n]
Kc[n++]=null
var r=Kc[n]
Kc[n++]=null
var l=Kc[n]
Kc[n++]=null
var u=Kc[n]
if(Kc[n++]=null,null!==r&&null!==l){var i=r.pending
null===i?l.next=l:(l.next=i.next,i.next=l),r.pending=l}0!==u&&en(t,l,u)}}function Je(e,n,t,r){Kc[Xc++]=e,Kc[Xc++]=n,Kc[Xc++]=t,Kc[Xc++]=r,qc|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Qe(e,n,t,r){return Je(e,n,t,r),nn(e)}function Ze(e,n){return Je(e,null,null,n),nn(e)}function en(e,n,t){e.lanes|=t
var r=e.alternate
null!==r&&(r.lanes|=t)
for(var l=!1,u=e.return;null!==u;)u.childLanes|=t,null!==(r=u.alternate)&&(r.childLanes|=t),22===u.tag&&(null===(e=u.stateNode)||1&e.k||(l=!0)),e=u,u=u.return
return 3===e.tag?(u=e.stateNode,l&&null!==n&&(l=31-ca(t),null===(r=(e=u.hiddenUpdates)[l])?e[l]=[n]:r.push(n),n.lane=536870912|t),u):null}function nn(n){if(50<qf)throw qf=0,Gf=null,Error(e(185))
for(var t=n.return;null!==t;)t=(n=t).return
return 3===n.tag?n.stateNode:null}function tn(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rn(e,n,t,r){return new tn(e,n,t,r)}function ln(e){return!(!(e=e.prototype)||!e.isReactComponent)}function un(e,n){var t=e.alternate
return null===t?((t=rn(e.tag,n,e.key,e.mode)).elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=65011712&e.flags,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function on(e,n){e.flags&=65011714
var t=e.alternate
return null===t?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function an(n,t,r,l,u,i){var o=0
if(l=n,"function"==typeof n)ln(n)&&(o=1)
else if("string"==typeof n)o=function(e,n,t){if(1===t||null!=n.itemProp)return!1
switch(e){case"meta":case"title":return!0
case"style":if("string"!=typeof n.precedence||"string"!=typeof n.href||""===n.href)break
return!0
case"link":if("string"!=typeof n.rel||"string"!=typeof n.href||""===n.href||n.onLoad||n.onError)break
return"stylesheet"!==n.rel||(e=n.disabled,"string"==typeof n.precedence&&null==e)
case"script":if(n.async&&"function"!=typeof n.async&&"symbol"!=typeof n.async&&!n.onLoad&&!n.onError&&n.src&&"string"==typeof n.src)return!0}return!1}(n,r,zo.current)?26:"html"===n||"head"===n||"body"===n?27:5
else e:switch(n){case Do:return(n=rn(31,r,t,u)).elementType=Do,n.lanes=i,n
case Eo:return cn(r.children,u,i,t)
case So:o=8,u|=24
break
case xo:return(n=rn(12,r,t,2|u)).elementType=xo,n.lanes=i,n
case Mo:return(n=rn(13,r,t,u)).elementType=Mo,n.lanes=i,n
case Fo:return(n=rn(19,r,t,u)).elementType=Fo,n.lanes=i,n
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case Co:case _o:o=10
break e
case To:o=9
break e
case Oo:o=11
break e
case Ao:o=14
break e
case Lo:o=16,l=null
break e}o=29,r=Error(e(130,null===n?"null":typeof n,"")),l=null}return(t=rn(o,r,t,u)).elementType=n,t.type=l,t.lanes=i,t}function cn(e,n,t,r){return(e=rn(7,e,r,n)).lanes=t,e}function sn(e,n,t){return(e=rn(6,e,null,n)).lanes=t,e}function fn(e,n,t){return(n=rn(4,null!==e.children?e.children:[],e.key,n)).lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function dn(e,n){Yc[Jc++]=Zc,Yc[Jc++]=Qc,Qc=e,Zc=n}function pn(e,n,t){es[ns++]=rs,es[ns++]=ls,es[ns++]=ts,ts=e
var r=rs
e=ls
var l=32-ca(r)-1
r&=~(1<<l),t+=1
var u=32-ca(n)+l
if(30<u){var i=l-l%5
u=(r&(1<<i)-1).toString(32),r>>=i,l-=i,rs=1<<32-ca(n)+l|t<<l|r,ls=u+e}else rs=1<<u|t<<l|r,ls=e}function hn(e){null!==e.return&&(dn(e,1),pn(e,1,0))}function vn(e){for(;e===Qc;)Qc=Yc[--Jc],Yc[Jc]=null,Zc=Yc[--Jc],Yc[Jc]=null
for(;e===ts;)ts=es[--ns],es[ns]=null,ls=es[--ns],es[ns]=null,rs=es[--ns],es[ns]=null}function yn(n){throw En(Ge(Error(e(418,"")),n)),ss}function mn(e){var n=e.stateNode,t=e.type,r=e.memoizedProps
switch(n[va]=e,n[ya]=r,t){case"dialog":Gu("cancel",n),Gu("close",n)
break
case"iframe":case"object":case"embed":Gu("load",n)
break
case"video":case"audio":for(t=0;t<ld.length;t++)Gu(ld[t],n)
break
case"source":Gu("error",n)
break
case"img":case"image":case"link":Gu("error",n),Gu("load",n)
break
case"details":Gu("toggle",n)
break
case"input":Gu("invalid",n),ue(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),ee(n)
break
case"select":Gu("invalid",n)
break
case"textarea":Gu("invalid",n),ce(n,r.value,r.defaultValue,r.children),ee(n)}"string"!=typeof(t=r.children)&&"number"!=typeof t&&"bigint"!=typeof t||n.textContent===""+t||!0===r.suppressHydrationWarning||ui(n.textContent,t)?(null!=r.popover&&(Gu("beforetoggle",n),Gu("toggle",n)),null!=r.onScroll&&Gu("scroll",n),null!=r.onScrollEnd&&Gu("scrollend",n),null!=r.onClick&&(n.onclick=ii),n=!0):n=!1,n||yn(e)}function bn(e){for(us=e.return;us;)switch(us.tag){case 5:case 13:return cs=!1,void 0
case 27:case 3:return cs=!0,void 0
default:us=us.return}}function wn(n){if(n!==us)return!1
if(!os)return bn(n),os=!0,!1
var t,r=n.tag
if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=n.type)&&"button"!==t)||pi(n.type,n.memoizedProps)),t=!t),t&&is&&yn(n),bn(n),13===r){if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(e(317))
e:{for(n=n.nextSibling,r=0;n;){if(8===n.nodeType)if("/$"===(t=n.data)){if(0===r){is=wi(n.nextSibling)
break e}r--}else"$"!==t&&"$!"!==t&&"$?"!==t||r++
n=n.nextSibling}is=null}}else 27===r?(r=is,vi(n.type)?(n=yd,yd=null,is=n):is=r):is=us?wi(n.stateNode.nextSibling):null
return!0}function kn(){is=us=null,os=!1}function gn(){var e=as
return null!==e&&(null===jf?jf=e:jf.push.apply(jf,e),as=null),e}function En(e){null===as?as=[e]:as.push(e)}function Sn(e,n,t){d(fs,n.i),n.i=t}function xn(e){e.i=fs.current,f(fs)}function Cn(e,n,t){for(;null!==e;){var r=e.alternate
if((e.childLanes&n)!==n?(e.childLanes|=n,null!==r&&(r.childLanes|=n)):null!==r&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break
e=e.return}}function Tn(n,t,r,l){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var i=u.dependencies
if(null!==i){var o=u.child
i=i.firstContext
e:for(;null!==i;){var a=i
i=u
for(var c=0;c<t.length;c++)if(a.context===t[c]){i.lanes|=r,null!==(a=i.alternate)&&(a.lanes|=r),Cn(i.return,r,n),l||(o=null)
break e}i=a.next}}else if(18===u.tag){if(null===(o=u.return))throw Error(e(341))
o.lanes|=r,null!==(i=o.alternate)&&(i.lanes|=r),Cn(o,r,n),o=null}else o=u.child
if(null!==o)o.return=u
else for(o=u;null!==o;){if(o===n){o=null
break}if(null!==(u=o.sibling)){u.return=o.return,o=u
break}o=o.return}u=o}}function _n(n,t,r,l){n=null
for(var u=t,i=!1;null!==u;){if(!i)if(524288&u.flags)i=!0
else if(262144&u.flags)break
if(10===u.tag){var o=u.alternate
if(null===o)throw Error(e(387))
if(null!==(o=o.memoizedProps)){var a=u.type
_c(u.pendingProps.value,o.value)||(null!==n?n.push(a):n=[a])}}else if(u===Ko.current){if(null===(o=u.alternate))throw Error(e(387))
o.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(xd):n=[xd])}u=u.return}null!==n&&Tn(t,n,r,l),t.flags|=262144}function On(e){for(e=e.firstContext;null!==e;){if(!_c(e.context.i,e.memoizedValue))return!0
e=e.next}return!1}function Mn(e){ds=e,ps=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fn(e){return Ln(ds,e)}function An(e,n){return null===ds&&Mn(e),Ln(e,n)}function Ln(n,t){var r=t.i
if(t={context:t,memoizedValue:r,next:null},null===ps){if(null===n)throw Error(e(308))
ps=t,n.dependencies={lanes:0,firstContext:t},n.flags|=524288}else ps=ps.next=t
return r}function Dn(){return{controller:new hs,data:new Map,refCount:0}}function Rn(e){e.refCount--,0===e.refCount&&vs(ys,function(){e.controller.abort()})}function jn(){if(0===--ws&&null!==bs){null!==gs&&(gs.status="fulfilled")
var e=bs
bs=null,ks=0,gs=null
for(var n=0;n<e.length;n++)(0,e[n])()}}function Pn(){var e=Ss.current
return null!==e?e:wf.pooledCache}function In(e,n){d(Ss,null===n?Ss.current:n.pool)}function $n(){var e=Pn()
return null===e?null:{parent:ms.i,pool:e}}function Bn(e){return"fulfilled"===(e=e.status)||"rejected"===e}function Hn(){}function Nn(n,t,r){switch(void 0===(r=n[r])?n.push(t):r!==t&&(t.then(Hn,Hn),t=r),t.status){case"fulfilled":return t.value
case"rejected":throw zn(n=t.reason),n
default:if("string"==typeof t.status)t.then(Hn,Hn)
else{if(null!==(n=wf)&&100<n.shellSuspendCounter)throw Error(e(482));(n=t).status="pending",n.then(function(e){if("pending"===t.status){var n=t
n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t
n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value
case"rejected":throw zn(n=t.reason),n}throw Os=t,xs}}function Un(){if(null===Os)throw Error(e(459))
var n=Os
return Os=null,n}function zn(n){if(n===xs||n===Ts)throw Error(e(483))}function Vn(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wn(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Kn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xn(e,n,t){var r=e.updateQueue
if(null===r)return null
if(r=r.shared,2&bf){var l=r.pending
return null===l?n.next=n:(n.next=l.next,l.next=n),r.pending=n,n=nn(e),en(e,null,t),n}return Je(e,r,n,t),nn(e)}function qn(e,n,t){if(null!==(n=n.updateQueue)&&(n=n.shared,4194048&t)){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,D(e,t)}}function Gn(e,n){var t=e.updateQueue,r=e.alternate
if(null!==r&&t===(r=r.updateQueue)){var l=null,u=null
if(null!==(t=t.firstBaseUpdate)){do{var i={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null}
null===u?l=u=i:u=u.next=i,t=t.next}while(null!==t)
null===u?l=u=n:u=u.next=n}else l=u=n
return t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},e.updateQueue=t,void 0}null===(e=t.lastBaseUpdate)?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Yn(){if(Fs&&null!==gs)throw gs}function Jn(e,n,t,r){Fs=!1
var l=e.updateQueue
Ms=!1
var u=l.firstBaseUpdate,i=l.lastBaseUpdate,o=l.shared.pending
if(null!==o){l.shared.pending=null
var a=o,c=a.next
a.next=null,null===i?u=c:i.next=c,i=a
var s=e.alternate
null!==s&&(o=(s=s.updateQueue).lastBaseUpdate)!==i&&(null===o?s.firstBaseUpdate=c:o.next=c,s.lastBaseUpdate=a)}if(null!==u){var f=l.baseState
for(i=0,s=c=a=null,o=u;;){var d=-536870913&o.lane,p=d!==o.lane
if(p?(gf&d)===d:(r&d)===d){0!==d&&d===ks&&(Fs=!0),null!==s&&(s=s.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null})
e:{var h=e,v=o
d=n
var y=t
switch(v.tag){case 1:if("function"==typeof(h=v.payload)){f=h.call(y,f,d)
break e}f=h
break e
case 3:h.flags=-65537&h.flags|128
case 0:if(null==(d="function"==typeof(h=v.payload)?h.call(y,f,d):h))break e
f=bo({},f,d)
break e
case 2:Ms=!0}}null!==(d=o.callback)&&(e.flags|=64,p&&(e.flags|=8192),null===(p=l.callbacks)?l.callbacks=[d]:p.push(d))}else p={lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},null===s?(c=s=p,a=f):s=s.next=p,i|=d
if(null===(o=o.next)){if(null===(o=l.shared.pending))break
o=(p=o).next,p.next=null,l.lastBaseUpdate=p,l.shared.pending=null}1}null===s&&(a=f),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=s,null===u&&(l.shared.lanes=0),Mf|=i,e.lanes=i,e.memoizedState=f}}function Qn(n,t){if("function"!=typeof n)throw Error(e(191,n))
n.call(t)}function Zn(e,n){var t=e.callbacks
if(null!==t)for(e.callbacks=null,e=0;e<t.length;e++)Qn(t[e],n)}function et(e,n){d(Ls,e=_f),d(As,n),_f=e|n.baseLanes}function nt(){d(Ls,_f),d(As,As.current)}function tt(){_f=Ls.current,f(As),f(Ls)}function rt(){throw Error(e(321))}function lt(e,n){if(null===n)return!1
for(var t=0;t<n.length&&t<e.length;t++)if(!_c(e[t],n[t]))return!1
return!0}function ut(e,n,t,r,l,u){return Ds=u,Rs=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,$o.H=null===e||null===e.memoizedState?Ws:Ks,Bs=!1,u=t(r,l),Bs=!1,$s&&(u=ot(n,t,r,l)),it(e),u}function it(n){$o.H=Vs
var t=null!==js&&null!==js.next
if(Ds=0,Ps=js=Rs=null,Is=!1,Ns=0,Us=null,t)throw Error(e(300))
null===n||lf||null!==(n=n.dependencies)&&On(n)&&(lf=!0)}function ot(n,t,r,l){Rs=n
var u=0
do{if($s&&(Us=null),Ns=0,$s=!1,25<=u)throw Error(e(301))
if(u+=1,Ps=js=null,null!=n.updateQueue){var i=n.updateQueue
i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}$o.H=Xs,i=t(r,l)}while($s)
return i}function at(){var e=$o.H,n=e.useState()[0]
return n="function"==typeof n.then?ht(n):n,e=e.useState()[0],(null!==js?js.memoizedState:null)!==e&&(Rs.flags|=1024),n}function ct(){var e=0!==Hs
return Hs=0,e}function st(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function ft(e){if(Is){for(e=e.memoizedState;null!==e;){var n=e.queue
null!==n&&(n.pending=null),e=e.next}Is=!1}Ds=0,Ps=js=Rs=null,$s=!1,Ns=Hs=0,Us=null}function dt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===Ps?Rs.memoizedState=Ps=e:Ps=Ps.next=e,Ps}function pt(){if(null===js){var n=Rs.alternate
n=null!==n?n.memoizedState:null}else n=js.next
var t=null===Ps?Rs.memoizedState:Ps.next
if(null!==t)Ps=t,js=n
else{if(null===n){if(null===Rs.alternate)throw Error(e(467))
throw Error(e(310))}n={memoizedState:(js=n).memoizedState,baseState:js.baseState,baseQueue:js.baseQueue,queue:js.queue,next:null},null===Ps?Rs.memoizedState=Ps=n:Ps=Ps.next=n}return Ps}function ht(e){var n=Ns
return Ns+=1,null===Us&&(Us=[]),e=Nn(Us,e,n),n=Rs,null===(null===Ps?n.memoizedState:Ps.next)&&(n=n.alternate,$o.H=null===n||null===n.memoizedState?Ws:Ks),e}function vt(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return ht(n)
if(n.$$typeof===_o)return Fn(n)}throw Error(e(438,String(n)))}function yt(e){var n=null,t=Rs.updateQueue
if(null!==t&&(n=t.memoCache),null==n){var r=Rs.alternate
null!==r&&null!==(r=r.updateQueue)&&null!=(r=r.memoCache)&&(n={data:r.data.map(function(e){return e.slice()}),index:0})}if(null==n&&(n={data:[],index:0}),null===t&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Rs.updateQueue=t),t.memoCache=n,void 0===(t=n.data[n.index]))for(t=n.data[n.index]=Array(e),r=0;r<e;r++)t[r]=Ro
return n.index++,t}function mt(e,n){return"function"==typeof n?n(e):n}function bt(e){return wt(pt(),js,e)}function wt(n,t,r){var l=n.queue
if(null===l)throw Error(e(311))
l.lastRenderedReducer=r
var u=n.baseQueue,i=l.pending
if(null!==i){if(null!==u){var o=u.next
u.next=i.next,i.next=o}t.baseQueue=u=i,l.pending=null}if(i=n.baseState,null===u)n.memoizedState=i
else{var a=o=null,c=null,s=t=u.next,f=!1
do{var d=-536870913&s.lane
if(d!==s.lane?(gf&d)===d:(Ds&d)===d){var p=s.revertLane
if(0===p)null!==c&&(c=c.next={lane:0,revertLane:0,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}),d===ks&&(f=!0)
else{if((Ds&p)===p){s=s.next,p===ks&&(f=!0)
continue}d={lane:0,revertLane:s.revertLane,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},null===c?(a=c=d,o=i):c=c.next=d,Rs.lanes|=p,Mf|=p}d=s.action,Bs&&r(i,d),i=s.hasEagerState?s.eagerState:r(i,d)}else p={lane:d,revertLane:s.revertLane,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},null===c?(a=c=p,o=i):c=c.next=p,Rs.lanes|=d,Mf|=d
s=s.next}while(null!==s&&s!==t)
if(null===c?o=i:c.next=a,!_c(i,n.memoizedState)&&(lf=!0,f&&null!==(r=gs)))throw r
n.memoizedState=i,n.baseState=o,n.baseQueue=c,l.lastRenderedState=i}return null===u&&(l.lanes=0),[n.memoizedState,l.dispatch]}function kt(n){var t=pt(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var l=r.dispatch,u=r.pending,i=t.memoizedState
if(null!==u){r.pending=null
var o=u=u.next
do{i=n(i,o.action),o=o.next}while(o!==u)
_c(i,t.memoizedState)||(lf=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),r.lastRenderedState=i}return[i,l]}function gt(n,t,r){var l=Rs,u=pt(),i=os
if(i){if(void 0===r)throw Error(e(407))
r=r()}else r=t()
var o=!_c((js||u).memoizedState,r)
if(o&&(u.memoizedState=r,lf=!0),u=u.queue,Vt(2048,8,xt.bind(null,l,u,n),[n]),u.getSnapshot!==t||o||null!==Ps&&1&Ps.memoizedState.tag){if(l.flags|=2048,Nt(9,{destroy:void 0,resource:void 0},St.bind(null,l,u,r,t),null),null===wf)throw Error(e(349))
i||124&Ds||Et(l,t,r)}return r}function Et(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},null===(n=Rs.updateQueue)?(n={lastEffect:null,events:null,stores:null,memoCache:null},Rs.updateQueue=n,n.stores=[e]):null===(t=n.stores)?n.stores=[e]:t.push(e)}function St(e,n,t,r){n.value=t,n.getSnapshot=r,Ct(n)&&Tt(e)}function xt(e,n,t){return t(function(){Ct(n)&&Tt(e)})}function Ct(e){var n=e.getSnapshot
e=e.value
try{var t=n()
return!_c(e,t)}catch(r){return!0}}function Tt(e){var n=Ze(e,2)
null!==n&&lu(n,0,2)}function _t(e){var n=dt()
if("function"==typeof e){var t=e
if(e=t(),Bs){k(!0)
try{t()}finally{k(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:e},n}function Ot(e,n,t,r){return e.baseState=t,wt(e,js,"function"==typeof r?r:mt)}function Mt(n,t,r,l,u){if(vr(n))throw Error(e(485))
if(null!==(n=t.action)){var i={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}}
null!==$o.T?r(!0):i.isTransition=!1,l(i),null===(r=t.pending)?(i.next=t.pending=i,Ft(t,i)):(i.next=r.next,t.pending=r.next=i)}}function Ft(e,n){var t=n.action,r=n.payload,l=e.state
if(n.isTransition){var u=$o.T,i={}
$o.T=i
try{var o=t(l,r),a=$o.S
null!==a&&a(i,o),At(e,n,o)}catch(c){Dt(e,n,c)}finally{$o.T=u}}else try{At(e,n,u=t(l,r))}catch(s){Dt(e,n,s)}}function At(e,n,t){null!==t&&"object"==typeof t&&"function"==typeof t.then?t.then(function(t){Lt(e,n,t)},function(t){return Dt(e,n,t)}):Lt(e,n,t)}function Lt(e,n,t){n.status="fulfilled",n.value=t,Rt(n),e.state=t,null!==(n=e.pending)&&((t=n.next)===n?e.pending=null:(t=t.next,n.next=t,Ft(e,t)))}function Dt(e,n,t){var r=e.pending
if(e.pending=null,null!==r){r=r.next
do{n.status="rejected",n.reason=t,Rt(n),n=n.next}while(n!==r)}e.action=null}function Rt(e){e=e.listeners
for(var n=0;n<e.length;n++)(0,e[n])()}function jt(e,n){return n}function Pt(e,n){if(os){var t=wf.formState
if(null!==t){e:{var r=Rs
if(os){if(is){n:{for(var l=is,u=cs;8!==l.nodeType;){if(!u){l=null
break n}if(null===(l=wi(l.nextSibling))){l=null
break n}}l="F!"===(u=l.data)||"F"===u?l:null}if(l){is=wi(l.nextSibling),r="F!"===l.data
break e}}yn(r)}r=!1}r&&(n=t[0])}}return(t=dt()).memoizedState=t.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jt,lastRenderedState:n},t.queue=r,t=dr.bind(null,Rs,r),r.dispatch=t,r=_t(!1),u=hr.bind(null,Rs,!1,r.queue),l={state:n,dispatch:null,action:e,pending:null},(r=dt()).queue=l,t=Mt.bind(null,Rs,l,u,t),l.dispatch=t,r.memoizedState=e,[n,t,!1]}function It(e){return $t(pt(),js,e)}function $t(e,n,t){if(n=wt(e,n,jt)[0],e=bt(mt)[0],"object"==typeof n&&null!==n&&"function"==typeof n.then)try{var r=ht(n)}catch(i){if(i===xs)throw Ts
throw i}else r=n
var l=(n=pt()).queue,u=l.dispatch
return t!==n.memoizedState&&(Rs.flags|=2048,Nt(9,{destroy:void 0,resource:void 0},Bt.bind(null,l,t),null)),[r,u,e]}function Bt(e,n){e.action=n}function Ht(e){var n=pt(),t=js
if(null!==t)return $t(n,t,e)
pt(),n=n.memoizedState
var r=(t=pt()).queue.dispatch
return t.memoizedState=e,[n,r,!1]}function Nt(e,n,t,r){return e={tag:e,create:t,deps:r,inst:n,next:null},null===(n=Rs.updateQueue)&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Rs.updateQueue=n),null===(t=n.lastEffect)?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e),e}function Ut(){return pt().memoizedState}function zt(e,n,t,r){var l=dt()
r=void 0===r?null:r,Rs.flags|=e,l.memoizedState=Nt(1|n,{destroy:void 0,resource:void 0},t,r)}function Vt(e,n,t,r){var l=pt()
r=void 0===r?null:r
var u=l.memoizedState.inst
null!==js&&null!==r&&lt(r,js.memoizedState.deps)?l.memoizedState=Nt(n,u,t,r):(Rs.flags|=e,l.memoizedState=Nt(1|n,u,t,r))}function Wt(e,n){zt(8390656,8,e,n)}function Kt(e,n){Vt(2048,8,e,n)}function Xt(e,n){return Vt(4,2,e,n)}function qt(e,n){return Vt(4,4,e,n)}function Gt(e,n){if("function"==typeof n){e=e()
var t=n(e)
return function(){"function"==typeof t?t():n(null)}}if(null!=n)return e=e(),n.current=e,function(){n.current=null}}function Yt(e,n,t){t=null!=t?t.concat([e]):null,Vt(4,4,Gt.bind(null,n,e),t)}function Jt(){}function Qt(e,n){var t=pt()
n=void 0===n?null:n
var r=t.memoizedState
return null!==n&&lt(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Zt(e,n){var t=pt()
n=void 0===n?null:n
var r=t.memoizedState
if(null!==n&&lt(n,r[1]))return r[0]
if(r=e(),Bs){k(!0)
try{e()}finally{k(!1)}}return t.memoizedState=[r,n],r}function er(e,n,t){return void 0===t||1073741824&Ds?e.memoizedState=n:(e.memoizedState=t,e=ru(),Rs.lanes|=e,Mf|=e,t)}function nr(e,n,t,r){return _c(t,n)?t:null!==As.current?(e=er(e,t,r),_c(e,n)||(lf=!0),e):42&Ds?(e=ru(),Rs.lanes|=e,Mf|=e,n):(lf=!0,e.memoizedState=t)}function tr(e,n,t,r,l){var u=Bo.p
Bo.p=0!==u&&8>u?u:8
var i=$o.T,o={}
$o.T=o,hr(e,!1,n,t)
try{var a=l(),c=$o.S
null!==c&&c(o,a),null!==a&&"object"==typeof a&&"function"==typeof a.then?pr(e,n,function(e,n){var t=[],r={status:"pending",value:null,reason:null,then:function(e){t.push(e)}}
return e.then(function(){r.status="fulfilled",r.value=n
for(var e=0;e<t.length;e++)(0,t[e])(n)},function(e){for(r.status="rejected",r.reason=e,e=0;e<t.length;e++)(0,t[e])(void 0)}),r}(a,r),tu()):pr(e,n,r,tu())}catch(s){pr(e,n,{then:function(){},status:"rejected",reason:s},tu())}finally{Bo.p=u,$o.T=i}}function rr(){}function lr(n,t,r,l){if(5!==n.tag)throw Error(e(476))
var u=ur(n).queue
tr(n,u,t,Ho,null===r?rr:function(){return ir(n),r(l)})}function ur(e){var n=e.memoizedState
if(null!==n)return n
var t={}
return(n={memoizedState:Ho,baseState:Ho,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:Ho},next:null}).next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mt,lastRenderedState:t},next:null},e.memoizedState=n,null!==(e=e.alternate)&&(e.memoizedState=n),n}function ir(e){pr(e,ur(e).next.queue,{},tu())}function or(){return Fn(xd)}function ar(){return pt().memoizedState}function cr(){return pt().memoizedState}function sr(e){for(var n=e.return;null!==n;){switch(n.tag){case 24:case 3:var t=tu(),r=Xn(n,e=Kn(t),t)
return null!==r&&(lu(r,0,t),qn(r,n,t)),n={cache:Dn()},e.payload=n,void 0}n=n.return}}function fr(e,n,t){var r=tu()
t={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null},vr(e)?yr(n,t):null!==(t=Qe(e,n,t,r))&&(lu(t,0,r),mr(t,n,r))}function dr(e,n,t){pr(e,n,t,tu())}function pr(e,n,t,r){var l={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null}
if(vr(e))yr(n,l)
else{var u=e.alternate
if(0===e.lanes&&(null===u||0===u.lanes)&&null!==(u=n.lastRenderedReducer))try{var i=n.lastRenderedState,o=u(i,t)
if(l.hasEagerState=!0,l.eagerState=o,_c(o,i))return Je(e,n,l,0),null===wf&&Ye(),!1}catch(a){}if(null!==(t=Qe(e,n,l,r)))return lu(t,0,r),mr(t,n,r),!0}return!1}function hr(n,t,r,l){if(l={lane:2,revertLane:Wu(),action:l,hasEagerState:!1,eagerState:null,next:null},vr(n)){if(t)throw Error(e(479))}else null!==(t=Qe(n,r,l,2))&&lu(t,0,2)}function vr(e){var n=e.alternate
return e===Rs||null!==n&&n===Rs}function yr(e,n){$s=Is=!0
var t=e.pending
null===t?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function mr(e,n,t){if(4194048&t){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,D(e,t)}}function br(e){var n=Gs
return Gs+=1,null===qs&&(qs=[]),Nn(qs,e,n)}function wr(e,n){n=n.props.ref,e.ref=void 0!==n?n:null}function kr(n,t){if(t.$$typeof===wo)throw Error(e(525))
throw n=Object.prototype.toString.call(t),Error(e(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n))}function gr(e){return(0,e.u)(e.l)}function Er(n){function t(e,t){if(n){var r=e.deletions
null===r?(e.deletions=[t],e.flags|=16):r.push(t)}}function r(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function l(e){for(var n=new Map;null!==e;)null!==e.key?n.set(e.key,e):n.set(e.index,e),e=e.sibling
return n}function u(e,n){return(e=un(e,n)).index=0,e.sibling=null,e}function i(e,t,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<t?(e.flags|=67108866,t):r:(e.flags|=67108866,t):(e.flags|=1048576,t)}function o(e){return n&&null===e.alternate&&(e.flags|=67108866),e}function c(e,n,t,r){return null===n||6!==n.tag?((n=sn(t,e.mode,r)).return=e,n):((n=u(n,t)).return=e,n)}function s(e,n,t,r){var l=t.type
return l===Eo?d(e,n,t.props.children,r,t.key):null!==n&&(n.elementType===l||"object"==typeof l&&null!==l&&l.$$typeof===Lo&&gr(l)===n.type)?(wr(n=u(n,t.props),t),n.return=e,n):(wr(n=an(t.type,t.key,t.props,null,e.mode,r),t),n.return=e,n)}function f(e,n,t,r){return null===n||4!==n.tag||n.stateNode.containerInfo!==t.containerInfo||n.stateNode.implementation!==t.implementation?((n=fn(t,e.mode,r)).return=e,n):((n=u(n,t.children||[])).return=e,n)}function d(e,n,t,r,l){return null===n||7!==n.tag?((n=cn(t,e.mode,r,l)).return=e,n):((n=u(n,t)).return=e,n)}function p(e,n,t){if("string"==typeof n&&""!==n||"number"==typeof n||"bigint"==typeof n)return(n=sn(""+n,e.mode,t)).return=e,n
if("object"==typeof n&&null!==n){switch(n.$$typeof){case ko:return wr(t=an(n.type,n.key,n.props,null,e.mode,t),n),t.return=e,t
case go:return(n=fn(n,e.mode,t)).return=e,n
case Lo:return p(e,n=(0,n.u)(n.l),t)}if(Io(n)||a(n))return(n=cn(n,e.mode,t,null)).return=e,n
if("function"==typeof n.then)return p(e,br(n),t)
if(n.$$typeof===_o)return p(e,An(e,n),t)
kr(e,n)}return null}function h(e,n,t,r){var l=null!==n?n.key:null
if("string"==typeof t&&""!==t||"number"==typeof t||"bigint"==typeof t)return null!==l?null:c(e,n,""+t,r)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case ko:return t.key===l?s(e,n,t,r):null
case go:return t.key===l?f(e,n,t,r):null
case Lo:return h(e,n,t=(l=t.u)(t.l),r)}if(Io(t)||a(t))return null!==l?null:d(e,n,t,r,null)
if("function"==typeof t.then)return h(e,n,br(t),r)
if(t.$$typeof===_o)return h(e,n,An(e,t),r)
kr(e,t)}return null}function v(e,n,t,r,l){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return c(n,e=e.get(t)||null,""+r,l)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case ko:return s(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case go:return f(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case Lo:return v(e,n,t,r=(0,r.u)(r.l),l)}if(Io(r)||a(r))return d(n,e=e.get(t)||null,r,l,null)
if("function"==typeof r.then)return v(e,n,t,br(r),l)
if(r.$$typeof===_o)return v(e,n,t,An(n,r),l)
kr(n,r)}return null}function y(c,s,f,d){if("object"==typeof f&&null!==f&&f.type===Eo&&null===f.key&&(f=f.props.children),"object"==typeof f&&null!==f){switch(f.$$typeof){case ko:e:{for(var m=f.key;null!==s;){if(s.key===m){if((m=f.type)===Eo){if(7===s.tag){r(c,s.sibling),(d=u(s,f.props.children)).return=c,c=d
break e}}else if(s.elementType===m||"object"==typeof m&&null!==m&&m.$$typeof===Lo&&gr(m)===s.type){r(c,s.sibling),wr(d=u(s,f.props),f),d.return=c,c=d
break e}r(c,s)
break}t(c,s),s=s.sibling}f.type===Eo?((d=cn(f.props.children,c.mode,d,f.key)).return=c,c=d):(wr(d=an(f.type,f.key,f.props,null,c.mode,d),f),d.return=c,c=d)}return o(c)
case go:e:{for(m=f.key;null!==s;){if(s.key===m){if(4===s.tag&&s.stateNode.containerInfo===f.containerInfo&&s.stateNode.implementation===f.implementation){r(c,s.sibling),(d=u(s,f.children||[])).return=c,c=d
break e}r(c,s)
break}t(c,s),s=s.sibling}(d=fn(f,c.mode,d)).return=c,c=d}return o(c)
case Lo:return y(c,s,f=(m=f.u)(f.l),d)}if(Io(f))return function(e,u,o,a){for(var c=null,s=null,f=u,d=u=0,y=null;null!==f&&d<o.length;d++){f.index>d?(y=f,f=null):y=f.sibling
var m=h(e,f,o[d],a)
if(null===m){null===f&&(f=y)
break}n&&f&&null===m.alternate&&t(e,f),u=i(m,u,d),null===s?c=m:s.sibling=m,s=m,f=y}if(d===o.length)return r(e,f),os&&dn(e,d),c
if(null===f){for(;d<o.length;d++)null!==(f=p(e,o[d],a))&&(u=i(f,u,d),null===s?c=f:s.sibling=f,s=f)
return os&&dn(e,d),c}for(f=l(f);d<o.length;d++)null!==(y=v(f,e,d,o[d],a))&&(n&&null!==y.alternate&&f.delete(null===y.key?d:y.key),u=i(y,u,d),null===s?c=y:s.sibling=y,s=y)
return n&&f.forEach(function(n){return t(e,n)}),os&&dn(e,d),c}(c,s,f,d)
if(a(f)){if("function"!=typeof(m=a(f)))throw Error(e(150))
return function(u,o,a,c){if(null==a)throw Error(e(151))
for(var s=null,f=null,d=o,y=o=0,m=null,b=a.next();null!==d&&!b.done;y++,b=a.next()){d.index>y?(m=d,d=null):m=d.sibling
var w=h(u,d,b.value,c)
if(null===w){null===d&&(d=m)
break}n&&d&&null===w.alternate&&t(u,d),o=i(w,o,y),null===f?s=w:f.sibling=w,f=w,d=m}if(b.done)return r(u,d),os&&dn(u,y),s
if(null===d){for(;!b.done;y++,b=a.next())null!==(b=p(u,b.value,c))&&(o=i(b,o,y),null===f?s=b:f.sibling=b,f=b)
return os&&dn(u,y),s}for(d=l(d);!b.done;y++,b=a.next())null!==(b=v(d,u,y,b.value,c))&&(n&&null!==b.alternate&&d.delete(null===b.key?y:b.key),o=i(b,o,y),null===f?s=b:f.sibling=b,f=b)
return n&&d.forEach(function(e){return t(u,e)}),os&&dn(u,y),s}(c,s,f=m.call(f),d)}if("function"==typeof f.then)return y(c,s,br(f),d)
if(f.$$typeof===_o)return y(c,s,An(c,f),d)
kr(c,f)}return"string"==typeof f&&""!==f||"number"==typeof f||"bigint"==typeof f?(f=""+f,null!==s&&6===s.tag?(r(c,s.sibling),(d=u(s,f)).return=c,c=d):(r(c,s),(d=sn(f,c.mode,d)).return=c,c=d),o(c)):r(c,s)}return function(e,n,t,r){try{Gs=0
var l=y(e,n,t,r)
return qs=null,l}catch(i){if(i===xs||i===Ts)throw i
var u=rn(29,i,null,e.mode)
return u.lanes=r,u.return=e,u}}}function Sr(e){var n=e.alternate
d(ef,1&ef.current),d(Qs,e),null===Zs&&(null===n||null!==As.current||null!==n.memoizedState)&&(Zs=e)}function xr(e){if(22===e.tag){if(d(ef,ef.current),d(Qs,e),null===Zs){var n=e.alternate
null!==n&&null!==n.memoizedState&&(Zs=e)}}else Cr()}function Cr(){d(ef,ef.current),d(Qs,Qs.current)}function Tr(e){f(Qs),Zs===e&&(Zs=null),f(ef)}function _r(e){for(var n=e;null!==n;){if(13===n.tag){var t=n.memoizedState
if(null!==t&&(null===(t=t.dehydrated)||"$?"===t.data||bi(t)))return n}else if(19===n.tag&&void 0!==n.memoizedProps.revealOrder){if(128&n.flags)return n}else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return null
n=n.return}n.sibling.return=n.return,n=n.sibling}return null}function Or(e,n,t,r){t=null==(t=t(r,n=e.memoizedState))?n:bo({},n,t),e.memoizedState=t,0===e.lanes&&(e.updateQueue.baseState=t)}function Mr(e,n,t,r,l,u,i){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,u,i):!(n.prototype&&n.prototype.isPureReactComponent&&Be(t,r)&&Be(l,u))}function Fr(e,n,t,r){e=n.state,"function"==typeof n.componentWillReceiveProps&&n.componentWillReceiveProps(t,r),"function"==typeof n.UNSAFE_componentWillReceiveProps&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&nf.enqueueReplaceState(n,n.state,null)}function Ar(e,n){var t=n
if("ref"in n)for(var r in t={},n)"ref"!==r&&(t[r]=n[r])
if(e=e.defaultProps)for(var l in t===n&&(t=bo({},t)),e)void 0===t[l]&&(t[l]=e[l])
return t}function Lr(e){tf(e)}function Dr(e){void 0}function Rr(e){tf(e)}function jr(e,n){try{(0,e.onUncaughtError)(n.value,{componentStack:n.stack})}catch(t){setTimeout(function(){throw t})}}function Pr(e,n,t){try{(0,e.onCaughtError)(t.value,{componentStack:t.stack,errorBoundary:1===n.tag?n.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Ir(e,n,t){return(t=Kn(t)).tag=3,t.payload={element:null},t.callback=function(){jr(e,n)},t}function $r(e){return(e=Kn(e)).tag=3,e}function Br(e,n,t,r){var l=t.type.getDerivedStateFromError
if("function"==typeof l){var u=r.value
e.payload=function(){return l(u)},e.callback=function(){Pr(n,t,r)}}var i=t.stateNode
null!==i&&"function"==typeof i.componentDidCatch&&(e.callback=function(){Pr(n,t,r),"function"!=typeof l&&(null===Hf?Hf=new Set([this]):Hf.add(this))
var e=r.stack
this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}function Hr(e,n,t,r){n.child=null===e?Js(n,null,t,r):Ys(n,e.child,t,r)}function Nr(e,n,t,r,l){t=t.render
var u=n.ref
if("ref"in r){var i={}
for(var o in r)"ref"!==o&&(i[o]=r[o])}else i=r
return Mn(n),r=ut(e,n,t,i,u,l),o=ct(),null===e||lf?(os&&o&&hn(n),n.flags|=1,Hr(e,n,r,l),n.child):(st(e,n,l),il(e,n,l))}function Ur(e,n,t,r,l){if(null===e){var u=t.type
return"function"!=typeof u||ln(u)||void 0!==u.defaultProps||null!==t.compare?((e=an(t.type,null,r,n,n.mode,l)).ref=n.ref,e.return=n,n.child=e):(n.tag=15,n.type=u,zr(e,n,u,r,l))}if(u=e.child,!ol(e,l)){var i=u.memoizedProps
if((t=null!==(t=t.compare)?t:Be)(i,r)&&e.ref===n.ref)return il(e,n,l)}return n.flags|=1,(e=un(u,r)).ref=n.ref,e.return=n,n.child=e}function zr(e,n,t,r,l){if(null!==e){var u=e.memoizedProps
if(Be(u,r)&&e.ref===n.ref){if(lf=!1,n.pendingProps=r=u,!ol(e,l))return n.lanes=e.lanes,il(e,n,l)
131072&e.flags&&(lf=!0)}}return Xr(e,n,t,r,l)}function Vr(e,n,t){var r=n.pendingProps,l=r.children,u=null!==e?e.memoizedState:null
if("hidden"===r.mode){if(128&n.flags){if(r=null!==u?u.baseLanes|t:t,null!==e){for(l=n.child=e.child,u=0;null!==l;)u=u|l.lanes|l.childLanes,l=l.sibling
n.childLanes=u&~r}else n.childLanes=0,n.child=null
return Wr(e,n,r,t)}if(!(536870912&t))return n.lanes=n.childLanes=536870912,Wr(e,n,null!==u?u.baseLanes|t:t,t)
n.memoizedState={baseLanes:0,cachePool:null},null!==e&&In(0,null!==u?u.cachePool:null),null!==u?et(n,u):nt(),xr(n)}else null!==u?(In(0,u.cachePool),et(n,u),Cr(),n.memoizedState=null):(null!==e&&In(0,null),nt(),Cr())
return Hr(e,n,l,t),n.child}function Wr(e,n,t,r){var l=Pn()
return l=null===l?null:{parent:ms.i,pool:l},n.memoizedState={baseLanes:t,cachePool:l},null!==e&&In(0,null),nt(),xr(n),null!==e&&_n(e,n,r,!0),null}function Kr(n,t){var r=t.ref
if(null===r)null!==n&&null!==n.ref&&(t.flags|=4194816)
else{if("function"!=typeof r&&"object"!=typeof r)throw Error(e(284))
null!==n&&n.ref===r||(t.flags|=4194816)}}function Xr(e,n,t,r,l){return Mn(n),t=ut(e,n,t,r,void 0,l),r=ct(),null===e||lf?(os&&r&&hn(n),n.flags|=1,Hr(e,n,t,l),n.child):(st(e,n,l),il(e,n,l))}function qr(e,n,t,r,l,u){return Mn(n),n.updateQueue=null,t=ot(n,r,t,l),it(e),r=ct(),null===e||lf?(os&&r&&hn(n),n.flags|=1,Hr(e,n,t,u),n.child):(st(e,n,u),il(e,n,u))}function Gr(e,n,t,r,l){if(Mn(n),null===n.stateNode){var u=Gc,i=t.contextType
"object"==typeof i&&null!==i&&(u=Fn(i)),u=new t(r,u),n.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=nf,n.stateNode=u,u._=n,(u=n.stateNode).props=r,u.state=n.memoizedState,u.refs={},Vn(n),i=t.contextType,u.context="object"==typeof i&&null!==i?Fn(i):Gc,u.state=n.memoizedState,"function"==typeof(i=t.getDerivedStateFromProps)&&(Or(n,t,i,r),u.state=n.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(i=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),i!==u.state&&nf.enqueueReplaceState(u,u.state,null),Jn(n,r,u,l),Yn(),u.state=n.memoizedState),"function"==typeof u.componentDidMount&&(n.flags|=4194308),r=!0}else if(null===e){u=n.stateNode
var o=n.memoizedProps,a=Ar(t,o)
u.props=a
var c=u.context,s=t.contextType
i=Gc,"object"==typeof s&&null!==s&&(i=Fn(s))
var f=t.getDerivedStateFromProps
s="function"==typeof f||"function"==typeof u.getSnapshotBeforeUpdate,o=n.pendingProps!==o,s||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o||c!==i)&&Fr(n,u,r,i),Ms=!1
var d=n.memoizedState
u.state=d,Jn(n,r,u,l),Yn(),c=n.memoizedState,o||d!==c||Ms?("function"==typeof f&&(Or(n,t,f,r),c=n.memoizedState),(a=Ms||Mr(n,t,a,r,d,c,i))?(s||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(n.flags|=4194308)):("function"==typeof u.componentDidMount&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=c),u.props=r,u.state=c,u.context=i,r=a):("function"==typeof u.componentDidMount&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,Wn(e,n),s=Ar(t,i=n.memoizedProps),u.props=s,f=n.pendingProps,d=u.context,c=t.contextType,a=Gc,"object"==typeof c&&null!==c&&(a=Fn(c)),(c="function"==typeof(o=t.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(i!==f||d!==a)&&Fr(n,u,r,a),Ms=!1,d=n.memoizedState,u.state=d,Jn(n,r,u,l),Yn()
var p=n.memoizedState
i!==f||d!==p||Ms||null!==e&&null!==e.dependencies&&On(e.dependencies)?("function"==typeof o&&(Or(n,t,o,r),p=n.memoizedState),(s=Ms||Mr(n,t,s,r,d,p,a)||null!==e&&null!==e.dependencies&&On(e.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(r,p,a),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(r,p,a)),"function"==typeof u.componentDidUpdate&&(n.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(n.flags|=1024)):("function"!=typeof u.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=p),u.props=r,u.state=p,u.context=a,r=s):("function"!=typeof u.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),r=!1)}return u=r,Kr(e,n),r=!!(128&n.flags),u||r?(u=n.stateNode,t=r&&"function"!=typeof t.getDerivedStateFromError?null:u.render(),n.flags|=1,null!==e&&r?(n.child=Ys(n,e.child,null,l),n.child=Ys(n,null,t,l)):Hr(e,n,t,l),n.memoizedState=u.state,e=n.child):e=il(e,n,l),e}function Yr(e,n,t,r){return kn(),n.flags|=256,Hr(e,n,t,r),n.child}function Jr(e){return{baseLanes:e,cachePool:$n()}}function Qr(e,n,t){return e=null!==e?e.childLanes&~t:0,n&&(e|=Lf),e}function Zr(n,t,r){var l,u=t.pendingProps,i=!1,o=!!(128&t.flags)
if((l=o)||(l=(null===n||null!==n.memoizedState)&&!!(2&ef.current)),l&&(i=!0,t.flags&=-129),l=!!(32&t.flags),t.flags&=-33,null===n){if(os){if(i?Sr(t):Cr(),os){var a,c=is
if(a=c){e:{for(a=c,c=cs;8!==a.nodeType;){if(!c){c=null
break e}if(null===(a=wi(a.nextSibling))){c=null
break e}}c=a}null!==c?(t.memoizedState={dehydrated:c,treeContext:null!==ts?{id:rs,overflow:ls}:null,retryLane:536870912,hydrationErrors:null},(a=rn(18,null,null,0)).stateNode=c,a.return=t,t.child=a,us=t,is=null,a=!0):a=!1}a||yn(t)}if(null!==(c=t.memoizedState)&&null!==(c=c.dehydrated))return bi(c)?t.lanes=32:t.lanes=536870912,null
Tr(t)}return c=u.children,u=u.fallback,i?(Cr(),c=nl({mode:"hidden",children:c},i=t.mode),u=cn(u,i,r,null),c.return=t,u.return=t,c.sibling=u,t.child=c,(i=t.child).memoizedState=Jr(r),i.childLanes=Qr(n,l,r),t.memoizedState=uf,u):(Sr(t),el(t,c))}if(null!==(a=n.memoizedState)&&null!==(c=a.dehydrated)){if(o)256&t.flags?(Sr(t),t.flags&=-257,t=tl(n,t,r)):null!==t.memoizedState?(Cr(),t.child=n.child,t.flags|=128,t=null):(Cr(),i=u.fallback,c=t.mode,u=nl({mode:"visible",children:u.children},c),(i=cn(i,c,r,null)).flags|=2,u.return=t,i.return=t,u.sibling=i,t.child=u,Ys(t,n.child,null,r),(u=t.child).memoizedState=Jr(r),u.childLanes=Qr(n,l,r),t.memoizedState=uf,t=i)
else if(Sr(t),bi(c)){if(l=c.nextSibling&&c.nextSibling.dataset)var s=l.dgst
l=s,(u=Error(e(419))).stack="",u.digest=l,En({value:u,source:null,stack:null}),t=tl(n,t,r)}else if(lf||_n(n,t,r,!1),l=0!==(r&n.childLanes),lf||l){if(null!==(l=wf)&&0!==(u=0!==((u=42&(u=r&-r)?1:R(u))&(l.suspendedLanes|r))?0:u)&&u!==a.retryLane)throw a.retryLane=u,Ze(n,u),lu(l,0,u),rf
"$?"===c.data||vu(),t=tl(n,t,r)}else"$?"===c.data?(t.flags|=192,t.child=n.child,t=null):(n=a.treeContext,is=wi(c.nextSibling),us=t,os=!0,as=null,cs=!1,null!==n&&(es[ns++]=rs,es[ns++]=ls,es[ns++]=ts,rs=n.id,ls=n.overflow,ts=t),(t=el(t,u.children)).flags|=4096)
return t}return i?(Cr(),i=u.fallback,c=t.mode,s=(a=n.child).sibling,(u=un(a,{mode:"hidden",children:u.children})).subtreeFlags=65011712&a.subtreeFlags,null!==s?i=un(s,i):(i=cn(i,c,r,null)).flags|=2,i.return=t,u.return=t,u.sibling=i,t.child=u,u=i,i=t.child,null===(c=n.child.memoizedState)?c=Jr(r):(null!==(a=c.cachePool)?(s=ms.i,a=a.parent!==s?{parent:s,pool:s}:a):a=$n(),c={baseLanes:c.baseLanes|r,cachePool:a}),i.memoizedState=c,i.childLanes=Qr(n,l,r),t.memoizedState=uf,u):(Sr(t),n=(r=n.child).sibling,(r=un(r,{mode:"visible",children:u.children})).return=t,r.sibling=null,null!==n&&(null===(l=t.deletions)?(t.deletions=[n],t.flags|=16):l.push(n)),t.child=r,t.memoizedState=null,r)}function el(e,n){return(n=nl({mode:"visible",children:n},e.mode)).return=e,e.child=n}function nl(e,n){return(e=rn(22,e,null,n)).lanes=0,e.stateNode={k:1,O:null,F:null,R:null},e}function tl(e,n,t){return Ys(n,e.child,null,t),(e=el(n,n.pendingProps.children)).flags|=2,n.memoizedState=null,e}function rl(e,n,t){e.lanes|=n
var r=e.alternate
null!==r&&(r.lanes|=n),Cn(e.return,n,t)}function ll(e,n,t,r,l){var u=e.memoizedState
null===u?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(u.isBackwards=n,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=t,u.tailMode=l)}function ul(e,n,t){var r=n.pendingProps,l=r.revealOrder,u=r.tail
if(Hr(e,n,r.children,t),2&(r=ef.current))r=1&r|2,n.flags|=128
else{if(null!==e&&128&e.flags)e:for(e=n.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&rl(e,t,n)
else if(19===e.tag)rl(e,t,n)
else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break e
for(;null===e.sibling;){if(null===e.return||e.return===n)break e
e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(d(ef,r),l){case"forwards":for(t=n.child,l=null;null!==t;)null!==(e=t.alternate)&&null===_r(e)&&(l=t),t=t.sibling
null===(t=l)?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),ll(n,!1,l,t,u)
break
case"backwards":for(t=null,l=n.child,n.child=null;null!==l;){if(null!==(e=l.alternate)&&null===_r(e)){n.child=l
break}e=l.sibling,l.sibling=t,t=l,l=e}ll(n,!0,t,null,u)
break
case"together":ll(n,!1,null,null,void 0)
break
default:n.memoizedState=null}return n.child}function il(n,t,r){if(null!==n&&(t.dependencies=n.dependencies),Mf|=t.lanes,0===(r&t.childLanes)){if(null===n)return null
if(_n(n,t,r,!1),0===(r&t.childLanes))return null}if(null!==n&&t.child!==n.child)throw Error(e(153))
if(null!==t.child){for(r=un(n=t.child,n.pendingProps),t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=un(n,n.pendingProps)).return=t
r.sibling=null}return t.child}function ol(e,n){return 0!==(e.lanes&n)||!(null===(e=e.dependencies)||!On(e))}function al(n,t,r){if(null!==n)if(n.memoizedProps!==t.pendingProps)lf=!0
else{if(!(ol(n,r)||128&t.flags))return lf=!1,function(e,n,t){switch(n.tag){case 3:p(n,n.stateNode.containerInfo),Sn(0,ms,e.memoizedState.cache),kn()
break
case 27:case 5:v(n)
break
case 4:p(n,n.stateNode.containerInfo)
break
case 10:Sn(0,n.type,n.memoizedProps.value)
break
case 13:var r=n.memoizedState
if(null!==r)return null!==r.dehydrated?(Sr(n),n.flags|=128,null):0!==(t&n.child.childLanes)?Zr(e,n,t):(Sr(n),null!==(e=il(e,n,t))?e.sibling:null)
Sr(n)
break
case 19:var l=!!(128&e.flags)
if((r=0!==(t&n.childLanes))||(_n(e,n,t,!1),r=0!==(t&n.childLanes)),l){if(r)return ul(e,n,t)
n.flags|=128}if(null!==(l=n.memoizedState)&&(l.rendering=null,l.tail=null,l.lastEffect=null),d(ef,ef.current),r)break
return null
case 22:case 23:return n.lanes=0,Vr(e,n,t)
case 24:Sn(0,ms,e.memoizedState.cache)}return il(e,n,t)}(n,t,r)
lf=!!(131072&n.flags)}else lf=!1,os&&1048576&t.flags&&pn(t,Zc,t.index)
switch(t.lanes=0,t.tag){case 16:e:{n=t.pendingProps
var l=t.elementType,u=l.u
if(l=u(l.l),t.type=l,"function"!=typeof l){if(null!=l){if((u=l.$$typeof)===Oo){t.tag=11,t=Nr(null,t,l,n,r)
break e}if(u===Ao){t.tag=14,t=Ur(null,t,l,n,r)
break e}}throw t=c(l)||l,Error(e(306,t,""))}ln(l)?(n=Ar(l,n),t.tag=1,t=Gr(null,t,l,n,r)):(t.tag=0,t=Xr(null,t,l,n,r))}return t
case 0:return Xr(n,t,t.type,t.pendingProps,r)
case 1:return Gr(n,t,l=t.type,u=Ar(l,t.pendingProps),r)
case 3:e:{if(p(t,t.stateNode.containerInfo),null===n)throw Error(e(387))
l=t.pendingProps
var i=t.memoizedState
u=i.element,Wn(n,t),Jn(t,l,null,r)
var o=t.memoizedState
if(l=o.cache,Sn(0,ms,l),l!==i.cache&&Tn(t,[ms],r,!0),Yn(),l=o.element,i.isDehydrated){if(i={element:l,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=Yr(n,t,l,r)
break e}if(l!==u){En(u=Ge(Error(e(424)),t)),t=Yr(n,t,l,r)
break e}for(n=9===(n=t.stateNode.containerInfo).nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n,is=wi(n.firstChild),us=t,os=!0,as=null,cs=!0,r=Js(t,null,l,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(kn(),l===u){t=il(n,t,r)
break e}Hr(n,t,l,r)}t=t.child}return t
case 26:return Kr(n,t),null===n?(r=Ci(t.type,null,t.pendingProps,null))?t.memoizedState=r:os||(r=t.type,n=t.pendingProps,(l=si(Wo.current).createElement(r))[va]=t,l[ya]=n,ci(l,r,n),U(l),t.stateNode=l):t.memoizedState=Ci(t.type,n.memoizedProps,t.pendingProps,n.memoizedState),null
case 27:return v(t),null===n&&os&&(l=t.stateNode=gi(t.type,t.pendingProps,Wo.current),us=t,cs=!0,u=is,vi(t.type)?(yd=u,is=wi(l.firstChild)):is=u),Hr(n,t,t.pendingProps.children,r),Kr(n,t),null===n&&(t.flags|=4194304),t.child
case 5:return null===n&&os&&((u=l=is)&&(null!==(l=function(e,n,t,r){for(;1===e.nodeType;){var l=t
if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Ea])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break
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
if("hidden"===l.type&&e.getAttribute("name")===u)return e}if(null===(e=wi(e.nextSibling)))break}return null}(l,t.type,t.pendingProps,cs))?(t.stateNode=l,us=t,is=wi(l.firstChild),cs=!1,u=!0):u=!1),u||yn(t)),v(t),u=t.type,i=t.pendingProps,o=null!==n?n.memoizedProps:null,l=i.children,pi(u,i)?l=null:null!==o&&pi(u,o)&&(t.flags|=32),null!==t.memoizedState&&(u=ut(n,t,at,null,null,r),xd.i=u),Kr(n,t),Hr(n,t,l,r),t.child
case 6:return null===n&&os&&((n=r=is)&&(null!==(r=function(e,n,t){if(""===n)return null
for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null
if(null===(e=wi(e.nextSibling)))return null}return e}(r,t.pendingProps,cs))?(t.stateNode=r,us=t,is=null,n=!0):n=!1),n||yn(t)),null
case 13:return Zr(n,t,r)
case 4:return p(t,t.stateNode.containerInfo),l=t.pendingProps,null===n?t.child=Ys(t,null,l,r):Hr(n,t,l,r),t.child
case 11:return Nr(n,t,t.type,t.pendingProps,r)
case 7:return Hr(n,t,t.pendingProps,r),t.child
case 8:case 12:return Hr(n,t,t.pendingProps.children,r),t.child
case 10:return l=t.pendingProps,Sn(0,t.type,l.value),Hr(n,t,l.children,r),t.child
case 9:return u=t.type.t,l=t.pendingProps.children,Mn(t),l=l(u=Fn(u)),t.flags|=1,Hr(n,t,l,r),t.child
case 14:return Ur(n,t,t.type,t.pendingProps,r)
case 15:return zr(n,t,t.type,t.pendingProps,r)
case 19:return ul(n,t,r)
case 31:return l=t.pendingProps,r=t.mode,l={mode:l.mode,children:l.children},null===n?((r=nl(l,r)).ref=t.ref,t.child=r,r.return=t,t=r):((r=un(n.child,l)).ref=t.ref,t.child=r,r.return=t,t=r),t
case 22:return Vr(n,t,r)
case 24:return Mn(t),l=Fn(ms),null===n?(null===(u=Pn())&&(u=wf,i=Dn(),u.pooledCache=i,i.refCount++,null!==i&&(u.pooledCacheLanes|=r),u=i),t.memoizedState={parent:l,cache:u},Vn(t),Sn(0,ms,u)):(0!==(n.lanes&r)&&(Wn(n,t),Jn(t,null,null,r),Yn()),u=n.memoizedState,i=t.memoizedState,u.parent!==l?(u={parent:l,cache:l},t.memoizedState=u,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=u),Sn(0,ms,l)):(l=i.cache,Sn(0,ms,l),l!==u.cache&&Tn(t,[ms],r,!0))),Hr(n,t,t.pendingProps.children,r),t.child
case 29:throw t.pendingProps}throw Error(e(156,t.tag))}function cl(e){e.flags|=4}function sl(e,n){if("stylesheet"!==n.type||4&n.state.loading)e.flags&=-16777217
else if(e.flags|=16777216,!Ii(n)){if(null!==(n=Qs.current)&&((4194048&gf)===gf?null!==Zs:(62914560&gf)!==gf&&!(536870912&gf)||n!==Zs))throw Os=_s,Cs
e.flags|=8192}}function fl(e,n){null!==n&&(e.flags|=4),16384&e.flags&&(n=22!==e.tag?T():536870912,e.lanes|=n,Df|=n)}function dl(e,n){if(!os)switch(e.tailMode){case"hidden":n=e.tail
for(var t=null;null!==n;)null!==n.alternate&&(t=n),n=n.sibling
null===t?e.tail=null:t.sibling=null
break
case"collapsed":t=e.tail
for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling
null===r?n||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function pl(e){var n=null!==e.alternate&&e.alternate.child===e.child,t=0,r=0
if(n)for(var l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=65011712&l.subtreeFlags,r|=65011712&l.flags,l.return=e,l=l.sibling
else for(l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling
return e.subtreeFlags|=r,e.childLanes=t,n}function hl(n,t,r){var l=t.pendingProps
switch(vn(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return pl(t),null
case 3:return r=t.stateNode,l=null,null!==n&&(l=n.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),xn(ms),h(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==n&&null!==n.child||(wn(t)?cl(t):null===n||n.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,gn())),pl(t),null
case 26:return r=t.memoizedState,null===n?(cl(t),null!==r?(pl(t),sl(t,r)):(pl(t),t.flags&=-16777217)):r?r!==n.memoizedState?(cl(t),pl(t),sl(t,r)):(pl(t),t.flags&=-16777217):(n.memoizedProps!==l&&cl(t),pl(t),t.flags&=-16777217),null
case 27:y(t),r=Wo.current
var u=t.type
if(null!==n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if(!l){if(null===t.stateNode)throw Error(e(166))
return pl(t),null}n=zo.current,wn(t)?mn(t):(n=gi(u,l,r),t.stateNode=n,cl(t))}return pl(t),null
case 5:if(y(t),r=t.type,null!==n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if(!l){if(null===t.stateNode)throw Error(e(166))
return pl(t),null}if(n=zo.current,wn(t))mn(t)
else{switch(u=si(Wo.current),n){case 1:n=u.createElementNS("http://www.w3.org/2000/svg",r)
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
default:n="string"==typeof l.is?u.createElement(r,{is:l.is}):u.createElement(r)}}n[va]=t,n[ya]=l
e:for(u=t.child;null!==u;){if(5===u.tag||6===u.tag)n.appendChild(u.stateNode)
else if(4!==u.tag&&27!==u.tag&&null!==u.child){u.child.return=u,u=u.child
continue}if(u===t)break e
for(;null===u.sibling;){if(null===u.return||u.return===t)break e
u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=n
e:switch(ci(n,r,l),r){case"button":case"input":case"select":case"textarea":n=!!l.autoFocus
break e
case"img":n=!0
break e
default:n=!1}n&&cl(t)}}return pl(t),t.flags&=-16777217,null
case 6:if(n&&null!=t.stateNode)n.memoizedProps!==l&&cl(t)
else{if("string"!=typeof l&&null===t.stateNode)throw Error(e(166))
if(n=Wo.current,wn(t)){if(n=t.stateNode,r=t.memoizedProps,l=null,null!==(u=us))switch(u.tag){case 27:case 5:l=u.memoizedProps}n[va]=t,(n=!!(n.nodeValue===r||null!==l&&!0===l.suppressHydrationWarning||ui(n.nodeValue,r)))||yn(t)}else(n=si(n).createTextNode(l))[va]=t,t.stateNode=n}return pl(t),null
case 13:if(l=t.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=wn(t),null!==l&&null!==l.dehydrated){if(null===n){if(!u)throw Error(e(318))
if(!(u=null!==(u=t.memoizedState)?u.dehydrated:null))throw Error(e(317))
u[va]=t}else kn(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4
pl(t),u=!1}else u=gn(),null!==n&&null!==n.memoizedState&&(n.memoizedState.hydrationErrors=u),u=!0
if(!u)return 256&t.flags?(Tr(t),t):(Tr(t),null)}if(Tr(t),128&t.flags)return t.lanes=r,t
if(r=null!==l,n=null!==n&&null!==n.memoizedState,r){u=null,null!==(l=t.child).alternate&&null!==l.alternate.memoizedState&&null!==l.alternate.memoizedState.cachePool&&(u=l.alternate.memoizedState.cachePool.pool)
var i=null
null!==l.memoizedState&&null!==l.memoizedState.cachePool&&(i=l.memoizedState.cachePool.pool),i!==u&&(l.flags|=2048)}return r!==n&&r&&(t.child.flags|=8192),fl(t,t.updateQueue),pl(t),null
case 4:return h(),null===n&&Ju(t.stateNode.containerInfo),pl(t),null
case 10:return xn(t.type),pl(t),null
case 19:if(f(ef),null===(u=t.memoizedState))return pl(t),null
if(l=!!(128&t.flags),null===(i=u.rendering))if(l)dl(u,!1)
else{if(0!==Of||null!==n&&128&n.flags)for(n=t.child;null!==n;){if(null!==(i=_r(n))){for(t.flags|=128,dl(u,!1),n=i.updateQueue,t.updateQueue=n,fl(t,n),t.subtreeFlags=0,n=r,r=t.child;null!==r;)on(r,n),r=r.sibling
return d(ef,1&ef.current|2),t.child}n=n.sibling}null!==u.tail&&Qo()>$f&&(t.flags|=128,l=!0,dl(u,!1),t.lanes=4194304)}else{if(!l)if(null!==(n=_r(i))){if(t.flags|=128,l=!0,n=n.updateQueue,t.updateQueue=n,fl(t,n),dl(u,!0),null===u.tail&&"hidden"===u.tailMode&&!i.alternate&&!os)return pl(t),null}else 2*Qo()-u.renderingStartTime>$f&&536870912!==r&&(t.flags|=128,l=!0,dl(u,!1),t.lanes=4194304)
u.isBackwards?(i.sibling=t.child,t.child=i):(null!==(n=u.last)?n.sibling=i:t.child=i,u.last=i)}return null!==u.tail?(t=u.tail,u.rendering=t,u.tail=t.sibling,u.renderingStartTime=Qo(),t.sibling=null,n=ef.current,d(ef,l?1&n|2:1&n),t):(pl(t),null)
case 22:case 23:return Tr(t),tt(),l=null!==t.memoizedState,null!==n?null!==n.memoizedState!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?!!(536870912&r)&&!(128&t.flags)&&(pl(t),6&t.subtreeFlags&&(t.flags|=8192)):pl(t),null!==(r=t.updateQueue)&&fl(t,r.retryQueue),r=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(r=n.memoizedState.cachePool.pool),l=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(l=t.memoizedState.cachePool.pool),l!==r&&(t.flags|=2048),null!==n&&f(Ss),null
case 24:return r=null,null!==n&&(r=n.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),xn(ms),pl(t),null
case 25:case 30:return null}throw Error(e(156,t.tag))}function vl(n,t){switch(vn(t),t.tag){case 1:return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 3:return xn(ms),h(),65536&(n=t.flags)&&!(128&n)?(t.flags=-65537&n|128,t):null
case 26:case 27:case 5:return y(t),null
case 13:if(Tr(t),null!==(n=t.memoizedState)&&null!==n.dehydrated){if(null===t.alternate)throw Error(e(340))
kn()}return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 19:return f(ef),null
case 4:return h(),null
case 10:return xn(t.type),null
case 22:case 23:return Tr(t),tt(),null!==n&&f(Ss),65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 24:return xn(ms),null
default:return null}}function yl(e,n){switch(vn(n),n.tag){case 3:xn(ms),h()
break
case 26:case 27:case 5:y(n)
break
case 4:h()
break
case 13:Tr(n)
break
case 19:f(ef)
break
case 10:xn(n.type)
break
case 22:case 23:Tr(n),tt(),null!==e&&f(Ss)
break
case 24:xn(ms)}}function ml(e,n){try{var t=n.updateQueue,r=null!==t?t.lastEffect:null
if(null!==r){var l=r.next
t=l
do{if((t.tag&e)===e){r=void 0
var u=t.create,i=t.inst
r=u(),i.destroy=r}t=t.next}while(t!==l)}}catch(o){Lu(n,n.return,o)}}function bl(e,n,t){try{var r=n.updateQueue,l=null!==r?r.lastEffect:null
if(null!==l){var u=l.next
r=u
do{if((r.tag&e)===e){var i=r.inst,o=i.destroy
if(void 0!==o){i.destroy=void 0,l=n
var a=t,c=o
try{c()}catch(s){Lu(l,a,s)}}}r=r.next}while(r!==u)}}catch(s){Lu(n,n.return,s)}}function wl(e){var n=e.updateQueue
if(null!==n){var t=e.stateNode
try{Zn(n,t)}catch(r){Lu(e,e.return,r)}}}function kl(e,n,t){t.props=Ar(e.type,e.memoizedProps),t.state=e.memoizedState
try{t.componentWillUnmount()}catch(r){Lu(e,n,r)}}function gl(e,n){try{var t=e.ref
if(null!==t){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode
break
default:r=e.stateNode}"function"==typeof t?e.refCleanup=t(r):t.current=r}}catch(l){Lu(e,n,l)}}function El(e,n){var t=e.ref,r=e.refCleanup
if(null!==t)if("function"==typeof r)try{r()}catch(l){Lu(e,n,l)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"==typeof t)try{t(null)}catch(u){Lu(e,n,u)}else t.current=null}function Sl(e){var n=e.type,t=e.memoizedProps,r=e.stateNode
try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&r.focus()
break e
case"img":t.src?r.src=t.src:t.srcSet&&(r.srcset=t.srcSet)}}catch(l){Lu(e,e.return,l)}}function xl(n,t,r){try{var l=n.stateNode
!function(n,t,r,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break
case"input":var u=null,i=null,o=null,a=null,c=null,s=null,f=null
for(h in r){var d=r[h]
if(r.hasOwnProperty(h)&&null!=d)switch(h){case"checked":case"value":break
case"defaultValue":c=d
default:l.hasOwnProperty(h)||oi(n,t,h,null,l,d)}}for(var p in l){var h=l[p]
if(d=r[p],l.hasOwnProperty(p)&&(null!=h||null!=d))switch(p){case"type":i=h
break
case"name":u=h
break
case"checked":s=h
break
case"defaultChecked":f=h
break
case"value":o=h
break
case"defaultValue":a=h
break
case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(e(137,t))
break
default:h!==d&&oi(n,t,p,h,l,d)}}return le(n,o,a,c,s,f,i,u),void 0
case"select":for(i in h=o=a=p=null,r)if(c=r[i],r.hasOwnProperty(i)&&null!=c)switch(i){case"value":break
case"multiple":h=c
default:l.hasOwnProperty(i)||oi(n,t,i,null,l,c)}for(u in l)if(i=l[u],c=r[u],l.hasOwnProperty(u)&&(null!=i||null!=c))switch(u){case"value":p=i
break
case"defaultValue":a=i
break
case"multiple":o=i
default:i!==c&&oi(n,t,u,i,l,c)}return t=a,r=o,l=h,null!=p?oe(n,!!r,p,!1):!!l!=!!r&&(null!=t?oe(n,!!r,t,!0):oe(n,!!r,r?[]:"",!1)),void 0
case"textarea":for(a in h=p=null,r)if(u=r[a],r.hasOwnProperty(a)&&null!=u&&!l.hasOwnProperty(a))switch(a){case"value":case"children":break
default:oi(n,t,a,null,l,u)}for(o in l)if(u=l[o],i=r[o],l.hasOwnProperty(o)&&(null!=u||null!=i))switch(o){case"value":p=u
break
case"defaultValue":h=u
break
case"children":break
case"dangerouslySetInnerHTML":if(null!=u)throw Error(e(91))
break
default:u!==i&&oi(n,t,o,u,l,i)}return ae(n,p,h),void 0
case"option":for(var v in r)p=r[v],r.hasOwnProperty(v)&&null!=p&&!l.hasOwnProperty(v)&&("selected"===v?n.selected=!1:oi(n,t,v,null,l,p))
for(c in l)p=l[c],h=r[c],!l.hasOwnProperty(c)||p===h||null==p&&null==h||("selected"===c?n.selected=p&&"function"!=typeof p&&"symbol"!=typeof p:oi(n,t,c,p,l,h))
return
case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in r)p=r[y],r.hasOwnProperty(y)&&null!=p&&!l.hasOwnProperty(y)&&oi(n,t,y,null,l,p)
for(s in l)if(p=l[s],h=r[s],l.hasOwnProperty(s)&&p!==h&&(null!=p||null!=h))switch(s){case"children":case"dangerouslySetInnerHTML":if(null!=p)throw Error(e(137,t))
break
default:oi(n,t,s,p,l,h)}return
default:if(pe(t)){for(var m in r)p=r[m],r.hasOwnProperty(m)&&void 0!==p&&!l.hasOwnProperty(m)&&ai(n,t,m,void 0,l,p)
for(f in l)p=l[f],h=r[f],!l.hasOwnProperty(f)||p===h||void 0===p&&void 0===h||ai(n,t,f,p,l,h)
return}}for(var b in r)p=r[b],r.hasOwnProperty(b)&&null!=p&&!l.hasOwnProperty(b)&&oi(n,t,b,null,l,p)
for(d in l)p=l[d],h=r[d],!l.hasOwnProperty(d)||p===h||null==p&&null==h||oi(n,t,d,p,l,h)}(l,n.type,r,t),l[ya]=t}catch(u){Lu(n,n.return,u)}}function Cl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&vi(e.type)||4===e.tag}function Tl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Cl(e.return))return null
e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&vi(e.type))continue e
if(2&e.flags)continue e
if(null===e.child||4===e.tag)continue e
e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function _l(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?(9===t.nodeType?t.body:"HTML"===t.nodeName?t.ownerDocument.body:t).insertBefore(e,n):((n=9===t.nodeType?t.body:"HTML"===t.nodeName?t.ownerDocument.body:t).appendChild(e),null!=(t=t.j)||null!==n.onclick||(n.onclick=ii))
else if(4!==r&&(27===r&&vi(e.type)&&(t=e.stateNode,n=null),null!==(e=e.child)))for(_l(e,n,t),e=e.sibling;null!==e;)_l(e,n,t),e=e.sibling}function Ol(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e)
else if(4!==r&&(27===r&&vi(e.type)&&(t=e.stateNode),null!==(e=e.child)))for(Ol(e,n,t),e=e.sibling;null!==e;)Ol(e,n,t),e=e.sibling}function Ml(e){var n=e.stateNode,t=e.memoizedProps
try{for(var r=e.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0])
ci(n,r,t),n[va]=e,n[ya]=t}catch(u){Lu(e,e.return,u)}}function Fl(e,n,t){var r=t.flags
switch(t.tag){case 0:case 11:case 15:Hl(e,t),4&r&&ml(5,t)
break
case 1:if(Hl(e,t),4&r)if(e=t.stateNode,null===n)try{e.componentDidMount()}catch(i){Lu(t,t.return,i)}else{var l=Ar(t.type,n.memoizedProps)
n=n.memoizedState
try{e.componentDidUpdate(l,n,e.P)}catch(o){Lu(t,t.return,o)}}64&r&&wl(t),512&r&&gl(t,t.return)
break
case 3:if(Hl(e,t),64&r&&null!==(e=t.updateQueue)){if(n=null,null!==t.child)switch(t.child.tag){case 27:case 5:case 1:n=t.child.stateNode}try{Zn(e,n)}catch(i){Lu(t,t.return,i)}}break
case 27:null===n&&4&r&&Ml(t)
case 26:case 5:Hl(e,t),null===n&&4&r&&Sl(t),512&r&&gl(t,t.return)
break
case 12:Hl(e,t)
break
case 13:Hl(e,t),4&r&&Rl(e,t),64&r&&null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)&&function(e,n){var t=e.ownerDocument
if("$?"!==e.data||"complete"===t.readyState)n()
else{var r=function(){n(),t.removeEventListener("DOMContentLoaded",r)}
t.addEventListener("DOMContentLoaded",r),e.I=r}}(e,t=Pu.bind(null,t))
break
case 22:if(!(r=null!==t.memoizedState||of)){n=null!==n&&null!==n.memoizedState||af,l=of
var u=af
of=r,(af=n)&&!u?Ul(e,t,!!(8772&t.subtreeFlags)):Hl(e,t),of=l,af=u}break
case 30:break
default:Hl(e,t)}}function Al(e){var n=e.alternate
null!==n&&(e.alternate=null,Al(n)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&null!==(n=e.stateNode)&&I(n),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ll(e,n,t){for(t=t.child;null!==t;)Dl(e,n,t),t=t.sibling}function Dl(e,n,t){if(aa&&"function"==typeof aa.onCommitFiberUnmount)try{aa.onCommitFiberUnmount(oa,t)}catch(u){}switch(t.tag){case 26:af||El(t,n),Ll(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode).parentNode.removeChild(t)
break
case 27:af||El(t,n)
var r=df,l=pf
vi(t.type)&&(df=t.stateNode,pf=!1),Ll(e,n,t),Ei(t.stateNode),df=r,pf=l
break
case 5:af||El(t,n)
case 6:if(r=df,l=pf,df=null,Ll(e,n,t),pf=l,null!==(df=r))if(pf)try{(9===df.nodeType?df.body:"HTML"===df.nodeName?df.ownerDocument.body:df).removeChild(t.stateNode)}catch(i){Lu(t,n,i)}else try{df.removeChild(t.stateNode)}catch(i){Lu(t,n,i)}break
case 18:null!==df&&(pf?(yi(9===(e=df).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,t.stateNode),co(e)):yi(df,t.stateNode))
break
case 4:r=df,l=pf,df=t.stateNode.containerInfo,pf=!0,Ll(e,n,t),df=r,pf=l
break
case 0:case 11:case 14:case 15:af||bl(2,t,n),af||bl(4,t,n),Ll(e,n,t)
break
case 1:af||(El(t,n),"function"==typeof(r=t.stateNode).componentWillUnmount&&kl(t,n,r)),Ll(e,n,t)
break
case 21:Ll(e,n,t)
break
case 22:af=(r=af)||null!==t.memoizedState,Ll(e,n,t),af=r
break
default:Ll(e,n,t)}}function Rl(e,n){if(null===n.memoizedState&&null!==(e=n.alternate)&&null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))try{co(e)}catch(t){Lu(n,n.return,t)}}function jl(n,t){var r=function(n){switch(n.tag){case 13:case 19:var t=n.stateNode
return null===t&&(t=n.stateNode=new sf),t
case 22:return null===(t=(n=n.stateNode).F)&&(t=n.F=new sf),t
default:throw Error(e(435,n.tag))}}(n)
t.forEach(function(e){var t=Iu.bind(null,n,e)
r.has(e)||(r.add(e),e.then(t,t))})}function Pl(n,t){var r=t.deletions
if(null!==r)for(var l=0;l<r.length;l++){var u=r[l],i=n,o=t,a=o
e:for(;null!==a;){switch(a.tag){case 27:if(vi(a.type)){df=a.stateNode,pf=!1
break e}break
case 5:df=a.stateNode,pf=!1
break e
case 3:case 4:df=a.stateNode.containerInfo,pf=!0
break e}a=a.return}if(null===df)throw Error(e(160))
Dl(i,o,u),df=null,pf=!1,null!==(i=u.alternate)&&(i.return=null),u.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Il(t,n),t=t.sibling}function Il(n,t){var r=n.alternate,l=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:Pl(t,n),$l(n),4&l&&(bl(3,n,n.return),ml(3,n),bl(5,n,n.return))
break
case 1:Pl(t,n),$l(n),512&l&&(af||null===r||El(r,r.return)),64&l&&of&&null!==(n=n.updateQueue)&&null!==(l=n.callbacks)&&(r=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===r?l:r.concat(l))
break
case 26:var u=hf
if(Pl(t,n),$l(n),512&l&&(af||null===r||El(r,r.return)),4&l){var i=null!==r?r.memoizedState:null
if(l=n.memoizedState,null===r)if(null===l)if(null===n.stateNode){e:{l=n.type,r=n.memoizedProps,u=u.ownerDocument||u
n:switch(l){case"title":(!(i=u.getElementsByTagName("title")[0])||i[Ea]||i[va]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=u.createElement(l),u.head.insertBefore(i,u.querySelector("head > title"))),ci(i,l,r),i[va]=n,U(i),l=i
break e
case"link":var o=ji("link","href",u).get(l+(r.href||""))
if(o)for(var a=0;a<o.length;a++)if((i=o[a]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&i.getAttribute("rel")===(null==r.rel?null:r.rel)&&i.getAttribute("title")===(null==r.title?null:r.title)&&i.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){o.splice(a,1)
break n}ci(i=u.createElement(l),l,r),u.head.appendChild(i)
break
case"meta":if(o=ji("meta","content",u).get(l+(r.content||"")))for(a=0;a<o.length;a++)if((i=o[a]).getAttribute("content")===(null==r.content?null:""+r.content)&&i.getAttribute("name")===(null==r.name?null:r.name)&&i.getAttribute("property")===(null==r.property?null:r.property)&&i.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&i.getAttribute("charset")===(null==r.charSet?null:r.charSet)){o.splice(a,1)
break n}ci(i=u.createElement(l),l,r),u.head.appendChild(i)
break
default:throw Error(e(468,l))}i[va]=n,U(i),l=i}n.stateNode=l}else Pi(u,n.type,n.stateNode)
else n.stateNode=Ai(u,l,n.memoizedProps)
else i!==l?(null===i?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):i.count--,null===l?Pi(u,n.type,n.stateNode):Ai(u,l,n.memoizedProps)):null===l&&null!==n.stateNode&&xl(n,n.memoizedProps,r.memoizedProps)}break
case 27:Pl(t,n),$l(n),512&l&&(af||null===r||El(r,r.return)),null!==r&&4&l&&xl(n,n.memoizedProps,r.memoizedProps)
break
case 5:if(Pl(t,n),$l(n),512&l&&(af||null===r||El(r,r.return)),32&n.flags){u=n.stateNode
try{se(u,"")}catch(h){Lu(n,n.return,h)}}4&l&&null!=n.stateNode&&xl(n,u=n.memoizedProps,null!==r?r.memoizedProps:u),1024&l&&(cf=!0)
break
case 6:if(Pl(t,n),$l(n),4&l){if(null===n.stateNode)throw Error(e(162))
l=n.memoizedProps,r=n.stateNode
try{r.nodeValue=l}catch(h){Lu(n,n.return,h)}}break
case 3:if(gd=null,u=hf,hf=Si(t.containerInfo),Pl(t,n),hf=u,$l(n),4&l&&null!==r&&r.memoizedState.isDehydrated)try{co(t.containerInfo)}catch(h){Lu(n,n.return,h)}cf&&(cf=!1,Bl(n))
break
case 4:l=hf,hf=Si(n.stateNode.containerInfo),Pl(t,n),$l(n),hf=l
break
case 12:default:Pl(t,n),$l(n)
break
case 13:Pl(t,n),$l(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==r&&null!==r.memoizedState)&&(If=Qo()),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,jl(n,l))
break
case 22:u=null!==n.memoizedState
var c=null!==r&&null!==r.memoizedState,s=of,f=af
if(of=s||u,af=f||c,Pl(t,n),af=f,of=s,$l(n),8192&l)e:for(t=n.stateNode,t.k=u?-2&t.k:1|t.k,u&&(null===r||c||of||af||Nl(n)),r=null,t=n;;){if(5===t.tag||26===t.tag){if(null===r){c=r=t
try{if(i=c.stateNode,u)"function"==typeof(o=i.style).setProperty?o.setProperty("display","none","important"):o.display="none"
else{a=c.stateNode
var d=c.memoizedProps.style,p=null!=d&&d.hasOwnProperty("display")?d.display:null
a.style.display=null==p||"boolean"==typeof p?"":(""+p).trim()}}catch(h){Lu(c,c.return,h)}}}else if(6===t.tag){if(null===r){c=t
try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(h){Lu(c,c.return,h)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===n)&&null!==t.child){t.child.return=t,t=t.child
continue}if(t===n)break e
for(;null===t.sibling;){if(null===t.return||t.return===n)break e
r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&l&&null!==(l=n.updateQueue)&&null!==(r=l.retryQueue)&&(l.retryQueue=null,jl(n,r))
break
case 19:Pl(t,n),$l(n),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,jl(n,l))
case 30:case 21:}}function $l(n){var t=n.flags
if(2&t){try{for(var r,l=n.return;null!==l;){if(Cl(l)){r=l
break}l=l.return}if(null==r)throw Error(e(160))
switch(r.tag){case 27:var u=r.stateNode
Ol(n,Tl(n),u)
break
case 5:var i=r.stateNode
32&r.flags&&(se(i,""),r.flags&=-33),Ol(n,Tl(n),i)
break
case 3:case 4:var o=r.stateNode.containerInfo
_l(n,Tl(n),o)
break
default:throw Error(e(161))}}catch(a){Lu(n,n.return,a)}n.flags&=-3}4096&t&&(n.flags&=-4097)}function Bl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var n=e
Bl(n),5===n.tag&&1024&n.flags&&n.stateNode.reset(),e=e.sibling}}function Hl(e,n){if(8772&n.subtreeFlags)for(n=n.child;null!==n;)Fl(e,n.alternate,n),n=n.sibling}function Nl(e){for(e=e.child;null!==e;){var n=e
switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Nl(n)
break
case 1:El(n,n.return)
var t=n.stateNode
"function"==typeof t.componentWillUnmount&&kl(n,n.return,t),Nl(n)
break
case 27:Ei(n.stateNode)
case 26:case 5:El(n,n.return),Nl(n)
break
case 22:null===n.memoizedState&&Nl(n)
break
default:Nl(n)}e=e.sibling}}function Ul(e,n,t){for(t=t&&!!(8772&n.subtreeFlags),n=n.child;null!==n;){var r=n.alternate,l=e,u=n,i=u.flags
switch(u.tag){case 0:case 11:case 15:Ul(l,u,t),ml(4,u)
break
case 1:if(Ul(l,u,t),"function"==typeof(l=(r=u).stateNode).componentDidMount)try{l.componentDidMount()}catch(c){Lu(r,r.return,c)}if(null!==(l=(r=u).updateQueue)){var o=r.stateNode
try{var a=l.shared.hiddenCallbacks
if(null!==a)for(l.shared.hiddenCallbacks=null,l=0;l<a.length;l++)Qn(a[l],o)}catch(c){Lu(r,r.return,c)}}t&&64&i&&wl(u),gl(u,u.return)
break
case 27:Ml(u)
case 26:case 5:Ul(l,u,t),t&&null===r&&4&i&&Sl(u),gl(u,u.return)
break
case 12:Ul(l,u,t)
break
case 13:Ul(l,u,t),t&&4&i&&Rl(l,u)
break
case 22:null===u.memoizedState&&Ul(l,u,t),gl(u,u.return)
break
case 30:break
default:Ul(l,u,t)}n=n.sibling}}function zl(e,n){var t=null
null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(t=e.memoizedState.cachePool.pool),e=null,null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(e=n.memoizedState.cachePool.pool),e!==t&&(null!=e&&e.refCount++,null!=t&&Rn(t))}function Vl(e,n){e=null,null!==n.alternate&&(e=n.alternate.memoizedState.cache),(n=n.memoizedState.cache)!==e&&(n.refCount++,null!=e&&Rn(e))}function Wl(e,n,t,r){if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Kl(e,n,t,r),n=n.sibling}function Kl(e,n,t,r){var l=n.flags
switch(n.tag){case 0:case 11:case 15:Wl(e,n,t,r),2048&l&&ml(9,n)
break
case 1:case 13:default:Wl(e,n,t,r)
break
case 3:Wl(e,n,t,r),2048&l&&(e=null,null!==n.alternate&&(e=n.alternate.memoizedState.cache),(n=n.memoizedState.cache)!==e&&(n.refCount++,null!=e&&Rn(e)))
break
case 12:if(2048&l){Wl(e,n,t,r),e=n.stateNode
try{var u=n.memoizedProps,i=u.id,o=u.onPostCommit
"function"==typeof o&&o(i,null===n.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(a){Lu(n,n.return,a)}}else Wl(e,n,t,r)
break
case 23:break
case 22:u=n.stateNode,i=n.alternate,null!==n.memoizedState?2&u.k?Wl(e,n,t,r):ql(e,n):2&u.k?Wl(e,n,t,r):(u.k|=2,Xl(e,n,t,r,!!(10256&n.subtreeFlags))),2048&l&&zl(i,n)
break
case 24:Wl(e,n,t,r),2048&l&&Vl(n.alternate,n)}}function Xl(e,n,t,r,l){for(l=l&&!!(10256&n.subtreeFlags),n=n.child;null!==n;){var u=e,i=n,o=t,a=r,c=i.flags
switch(i.tag){case 0:case 11:case 15:Xl(u,i,o,a,l),ml(8,i)
break
case 23:break
case 22:var s=i.stateNode
null!==i.memoizedState?2&s.k?Xl(u,i,o,a,l):ql(u,i):(s.k|=2,Xl(u,i,o,a,l)),l&&2048&c&&zl(i.alternate,i)
break
case 24:Xl(u,i,o,a,l),l&&2048&c&&Vl(i.alternate,i)
break
default:Xl(u,i,o,a,l)}n=n.sibling}}function ql(e,n){if(10256&n.subtreeFlags)for(n=n.child;null!==n;){var t=e,r=n,l=r.flags
switch(r.tag){case 22:ql(t,r),2048&l&&zl(r.alternate,r)
break
case 24:ql(t,r),2048&l&&Vl(r.alternate,r)
break
default:ql(t,r)}n=n.sibling}}function Gl(e){if(e.subtreeFlags&vf)for(e=e.child;null!==e;)Yl(e),e=e.sibling}function Yl(n){switch(n.tag){case 26:Gl(n),n.flags&vf&&null!==n.memoizedState&&function(n,t,r){if(null===Ed)throw Error(e(475))
var l=Ed
if(!("stylesheet"!==t.type||"string"==typeof r.media&&!1===matchMedia(r.media).matches||4&t.state.loading)){if(null===t.instance){var u=Ti(r.href),i=n.querySelector(_i(u))
if(i)return null!==(n=i.$)&&"object"==typeof n&&"function"==typeof n.then&&(l.count++,l=Bi.bind(l),n.then(l,l)),t.state.loading|=4,t.instance=i,U(i),void 0
i=n.ownerDocument||n,r=Oi(r),(u=md.get(u))&&Di(r,u),U(i=i.createElement("link"))
var o=i
o.$=new Promise(function(e,n){o.onload=e,o.onerror=n}),ci(i,"link",r),t.instance=i}null===l.stylesheets&&(l.stylesheets=new Map),l.stylesheets.set(t,n),(n=t.state.preload)&&!(3&t.state.loading)&&(l.count++,t=Bi.bind(l),n.addEventListener("load",t),n.addEventListener("error",t))}}(hf,n.memoizedState,n.memoizedProps)
break
case 5:default:Gl(n)
break
case 3:case 4:var t=hf
hf=Si(n.stateNode.containerInfo),Gl(n),hf=t
break
case 22:null===n.memoizedState&&(null!==(t=n.alternate)&&null!==t.memoizedState?(t=vf,vf=16777216,Gl(n),vf=t):Gl(n))}}function Jl(e){var n=e.alternate
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
case 24:Rn(t.memoizedState.cache)}if(null!==(r=t.child))r.return=t,ff=r
else e:for(t=e;null!==ff;){var l=(r=ff).sibling,u=r.return
if(Al(r),r===t){ff=null
break e}if(null!==l){l.return=u,ff=l
break e}ff=u}}}function tu(){return 2&bf&&0!==gf?gf&-gf:null!==$o.T?0!==ks?ks:Wu():P()}function ru(){0===Lf&&(Lf=536870912&gf&&!os?536870912:C())
var e=Qs.current
return null!==e&&(e.flags|=32),Lf}function lu(e,n,t){(e!==wf||2!==Ef&&9!==Ef)&&null===e.cancelPendingCommit||(fu(e,0),au(e,gf,Lf,!1)),A(e,t),2&bf&&e===wf||(e===wf&&(!(2&bf)&&(Ff|=t),4===Of&&au(e,gf,Lf,!1)),$u(e))}function uu(n,t,r){if(6&bf)throw Error(e(327))
for(var l=!r&&!(124&t)&&0===(t&n.expiredLanes)||S(n,t),u=l?function(n,t){var r=bf
bf|=2
var l=pu(),u=hu()
wf!==n||gf!==t?(Bf=null,$f=Qo()+500,fu(n,t)):Cf=S(n,t)
e:for(;;){try{if(0!==Ef&&null!==kf){t=kf
var i=Sf
n:switch(Ef){case 1:Ef=0,Sf=null,gu(n,t,i,1)
break
case 2:case 9:if(Bn(i)){Ef=0,Sf=null,ku(t)
break}t=function(){2!==Ef&&9!==Ef||wf!==n||(Ef=7),$u(n)},i.then(t,t)
break e
case 3:Ef=7
break e
case 4:Ef=5
break e
case 7:Bn(i)?(Ef=0,Sf=null,ku(t)):(Ef=0,Sf=null,gu(n,t,i,7))
break
case 5:var o=null
switch(kf.tag){case 26:o=kf.memoizedState
case 5:case 27:var a=kf
if(!o||Ii(o)){Ef=0,Sf=null
var c=a.sibling
if(null!==c)kf=c
else{var s=a.return
null!==s?(kf=s,Eu(s)):kf=null}break n}}Ef=0,Sf=null,gu(n,t,i,5)
break
case 6:Ef=0,Sf=null,gu(n,t,i,6)
break
case 8:su(),Of=6
break e
default:throw Error(e(462))}}bu()
break}catch(f){du(n,f)}1}return ps=ds=null,$o.H=l,$o.A=u,bf=r,null!==kf?0:(wf=null,gf=0,Ye(),Of)}(n,t):yu(n,t,!0),i=l;;){if(0===u){Cf&&!l&&au(n,t,0,!1)
break}if(r=n.current.alternate,!i||ou(r)){if(2===u){if(i=t,n.errorRecoveryDisabledLanes&i)var o=0
else o=0!=(o=-536870913&n.pendingLanes)?o:536870912&o?536870912:0
if(0!==o){t=o
e:{var a=n
u=Rf
var c=a.current.memoizedState.isDehydrated
if(c&&(fu(a,o).flags|=256),2!==(o=yu(a,o,!1))){if(Tf&&!c){a.errorRecoveryDisabledLanes|=i,Ff|=i,u=4
break e}i=jf,jf=u,null!==i&&(null===jf?jf=i:jf.push.apply(jf,i))}u=o}if(i=!1,2!==u)continue}}if(1===u){fu(n,0),au(n,t,0,!0)
break}e:{switch(l=n,i=u){case 0:case 1:throw Error(e(345))
case 4:if((4194048&t)!==t)break
case 6:au(l,t,Lf,!xf)
break e
case 2:jf=null
break
case 3:case 5:break
default:throw Error(e(329))}if((62914560&t)===t&&10<(u=If+300-Qo())){if(au(l,t,Lf,!xf),0!==E(l,0,!0))break e
l.timeoutHandle=dd(iu.bind(null,l,r,jf,Bf,Pf,t,Lf,Ff,Df,xf,i,2,-0,0),u)}else iu(l,r,jf,Bf,Pf,t,Lf,Ff,Df,xf,i,0,-0,0)}break}u=yu(n,t,!1),i=!1}$u(n)}function iu(n,t,r,l,u,i,o,a,c,s,f,d,p,h){if(n.timeoutHandle=-1,(8192&(d=t.subtreeFlags)||!(16785408&~d))&&(Ed={stylesheets:null,count:0,unsuspend:$i},Yl(t),null!==(d=function(){if(null===Ed)throw Error(e(475))
var n=Ed
return n.stylesheets&&0===n.count&&Hi(n,n.stylesheets),0<n.count?function(e){var t=setTimeout(function(){if(n.stylesheets&&Hi(n,n.stylesheets),n.unsuspend){var e=n.unsuspend
n.unsuspend=null,e()}},6e4)
return n.unsuspend=e,function(){n.unsuspend=null,clearTimeout(t)}}:null}())))return n.cancelPendingCommit=d(xu.bind(null,n,t,i,r,l,u,o,a,c,f,1,p,h)),au(n,i,o,!s),void 0
xu(n,t,i,r,l,u,o,a,c)}function ou(e){for(var n=e;;){var t=n.tag
if((0===t||11===t||15===t)&&16384&n.flags&&null!==(t=n.updateQueue)&&null!==(t=t.stores))for(var r=0;r<t.length;r++){var l=t[r],u=l.getSnapshot
l=l.value
try{if(!_c(u(),l))return!1}catch(i){return!1}}if(t=n.child,16384&n.subtreeFlags&&null!==t)t.return=n,n=t
else{if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return!0
n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function au(e,n,t,r){n&=~Af,n&=~Ff,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes
for(var l=n;0<l;){var u=31-ca(l),i=1<<u
r[u]=-1,l&=~i}0!==t&&L(e,t,n)}function cu(){return!!(6&bf)||(Bu(0),!1)}function su(){if(null!==kf){if(0===Ef)var e=kf.return
else ps=ds=null,ft(e=kf),qs=null,Gs=0,e=kf
for(;null!==e;)yl(e.alternate,e),e=e.return
kf=null}}function fu(e,n){var t=e.timeoutHandle;-1!==t&&(e.timeoutHandle=-1,pd(t)),null!==(t=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,t()),su(),wf=e,kf=t=un(e.current,null),gf=n,Ef=0,Sf=null,xf=!1,Cf=S(e,n),Tf=!1,Df=Lf=Af=Ff=Mf=Of=0,jf=Rf=null,Pf=!1,8&n&&(n|=32&n)
var r=e.entangledLanes
if(0!==r)for(e=e.entanglements,r&=n;0<r;){var l=31-ca(r),u=1<<l
n|=e[l],r&=~u}return _f=n,Ye(),t}function du(e,n){Rs=null,$o.H=Vs,n===xs||n===Ts?(n=Un(),Ef=3):n===Cs?(n=Un(),Ef=4):Ef=n===rf?8:null!==n&&"object"==typeof n&&"function"==typeof n.then?6:1,Sf=n,null===kf&&(Of=1,jr(e,Ge(n,e.current)))}function pu(){var e=$o.H
return $o.H=Vs,null===e?Vs:e}function hu(){var e=$o.A
return $o.A=yf,e}function vu(){Of=4,xf||(4194048&gf)!==gf&&null!==Qs.current||(Cf=!0),!(134217727&Mf)&&!(134217727&Ff)||null===wf||au(wf,gf,Lf,!1)}function yu(e,n,t){var r=bf
bf|=2
var l=pu(),u=hu()
wf===e&&gf===n||(Bf=null,fu(e,n)),n=!1
var i=Of
e:for(;;){try{if(0!==Ef&&null!==kf){var o=kf,a=Sf
switch(Ef){case 8:su(),i=6
break e
case 3:case 2:case 9:case 6:null===Qs.current&&(n=!0)
var c=Ef
if(Ef=0,Sf=null,gu(e,o,a,c),t&&Cf){i=0
break e}break
default:c=Ef,Ef=0,Sf=null,gu(e,o,a,c)}}mu(),i=Of
break}catch(s){du(e,s)}1}return n&&e.shellSuspendCounter++,ps=ds=null,bf=r,$o.H=l,$o.A=u,null===kf&&(wf=null,gf=0,Ye()),i}function mu(){for(;null!==kf;)wu(kf)}function bu(){for(;null!==kf&&!Yo();)wu(kf)}function wu(e){var n=al(e.alternate,e,_f)
e.memoizedProps=e.pendingProps,null===n?Eu(e):kf=n}function ku(e){var n=e,t=n.alternate
switch(n.tag){case 15:case 0:n=qr(t,n,n.pendingProps,n.type,void 0,gf)
break
case 11:n=qr(t,n,n.pendingProps,n.type.render,n.ref,gf)
break
case 5:ft(n)
default:yl(t,n),n=al(t,n=kf=on(n,_f),_f)}e.memoizedProps=e.pendingProps,null===n?Eu(e):kf=n}function gu(n,t,r,l){ps=ds=null,ft(t),qs=null,Gs=0
var u=t.return
try{if(function(n,t,r,l,u){if(r.flags|=32768,null!==l&&"object"==typeof l&&"function"==typeof l.then){if(null!==(t=r.alternate)&&_n(t,r,u,!0),null!==(r=Qs.current)){switch(r.tag){case 13:return null===Zs?vu():null===r.alternate&&0===Of&&(Of=3),r.flags&=-257,r.flags|=65536,r.lanes=u,l===_s?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([l]):t.add(l),Du(n,l,u)),!1
case 22:return r.flags|=65536,l===_s?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([l]):r.add(l),Du(n,l,u)),!1}throw Error(e(435,r.tag))}return Du(n,l,u),vu(),!1}if(os)return null!==(t=Qs.current)?(!(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=u,l!==ss&&En(Ge(n=Error(e(422),{cause:l}),r))):(l!==ss&&En(Ge(t=Error(e(423),{cause:l}),r)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,l=Ge(l,r),Gn(n,u=Ir(n.stateNode,l,u)),4!==Of&&(Of=2)),!1
var i=Error(e(520),{cause:l})
if(i=Ge(i,r),null===Rf?Rf=[i]:Rf.push(i),4!==Of&&(Of=2),null===t)return!0
l=Ge(l,r),r=t
do{switch(r.tag){case 3:return r.flags|=65536,n=u&-u,r.lanes|=n,Gn(r,n=Ir(r.stateNode,l,n)),!1
case 1:if(t=r.type,i=r.stateNode,!(128&r.flags||"function"!=typeof t.getDerivedStateFromError&&(null===i||"function"!=typeof i.componentDidCatch||null!==Hf&&Hf.has(i))))return r.flags|=65536,u&=-u,r.lanes|=u,Br(u=$r(u),n,r,l),Gn(r,u),!1}r=r.return}while(null!==r)
return!1}(n,u,t,r,gf))return Of=1,jr(n,Ge(r,n.current)),kf=null,void 0}catch(i){if(null!==u)throw kf=u,i
return Of=1,jr(n,Ge(r,n.current)),kf=null,void 0}32768&t.flags?(os||1===l?n=!0:Cf||536870912&gf?n=!1:(xf=n=!0,(2===l||9===l||3===l||6===l)&&null!==(l=Qs.current)&&13===l.tag&&(l.flags|=16384)),Su(t,n)):Eu(t)}function Eu(e){var n=e
do{if(32768&n.flags)return Su(n,xf),void 0
e=n.return
var t=hl(n.alternate,n,_f)
if(null!==t)return kf=t,void 0
if(null!==(n=n.sibling))return kf=n,void 0
kf=n=e}while(null!==n)
0===Of&&(Of=5)}function Su(e,n){do{var t=vl(e.alternate,e)
if(null!==t)return t.flags&=32767,kf=t,void 0
if(null!==(t=e.return)&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&null!==(e=e.sibling))return kf=e,void 0
kf=e=t}while(null!==e)
Of=6,kf=null}function xu(n,t,r,l,u,i,o,a,c){n.cancelPendingCommit=null
do{Mu()}while(0!==Nf)
if(6&bf)throw Error(e(327))
if(null!==t){if(t===n.current)throw Error(e(177))
if(i=t.lanes|t.childLanes,function(e,n,t,r,l,u){var i=e.pendingLanes
e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0
var o=e.entanglements,a=e.expirationTimes,c=e.hiddenUpdates
for(t=i&~t;0<t;){var s=31-ca(t),f=1<<s
o[s]=0,a[s]=-1
var d=c[s]
if(null!==d)for(c[s]=null,s=0;s<d.length;s++){var p=d[s]
null!==p&&(p.lane&=-536870913)}t&=~f}0!==r&&L(e,r,0),0!==u&&0===l&&0!==e.tag&&(e.suspendedLanes|=u&~(i&~n))}(n,r,i|=qc,o,a,c),n===wf&&(kf=wf=null,gf=0),zf=t,Uf=n,Vf=r,Wf=i,Kf=u,Xf=l,10256&t.subtreeFlags||10256&t.flags?(n.callbackNode=null,n.callbackPriority=0,qo(ta,function(){return Fu(),null})):(n.callbackNode=null,n.callbackPriority=0),l=!!(13878&t.flags),13878&t.subtreeFlags||l){l=$o.T,$o.T=null,u=Bo.p,Bo.p=2,o=bf,bf|=4
try{!function(n,t){if(n=n.containerInfo,cd=Cd,Ve(n=ze(n))){if("selectionStart"in n)var r={start:n.selectionStart,end:n.selectionEnd}
else{var l=(r=(r=n.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection()
if(l&&0!==l.rangeCount){r=l.anchorNode
var u=l.anchorOffset,i=l.focusNode
l=l.focusOffset
var o=0,a=-1,c=-1,s=0,f=0,d=n,p=null
e:for(;;){for(var h;d!==r||0!==u&&3!==d.nodeType||(a=o+u),d!==i||0!==l&&3!==d.nodeType||(c=o+l),3===d.nodeType&&(o+=d.nodeValue.length),null!==(h=d.firstChild);)p=d,d=h
for(;;){if(d===n)break e
if(p===r&&++s===u&&(a=o),p===i&&++f===l&&(c=o),null!==(h=d.nextSibling))break
p=(d=p).parentNode}d=h}r=-1===a||-1===c?null:{start:a,end:c}}else r=null}r=r||{start:0,end:0}}else r=null
for(sd={focusedElem:n,selectionRange:r},Cd=!1,ff=t;null!==ff;)if(n=(t=ff).child,1024&t.subtreeFlags&&null!==n)n.return=t,ff=n
else for(;null!==ff;){switch(i=(t=ff).alternate,n=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&n&&null!==i){n=void 0,r=t,u=i.memoizedProps,i=i.memoizedState,l=r.stateNode
try{var v=Ar(r.type,u)
n=l.getSnapshotBeforeUpdate(v,i),l.P=n}catch(y){Lu(r,r.return,y)}}break
case 3:if(1024&n)if(9===(r=(n=t.stateNode.containerInfo).nodeType))mi(n)
else if(1===r)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":mi(n)
break
default:n.textContent=""}break
default:if(1024&n)throw Error(e(163))}if(null!==(n=t.sibling)){n.return=t.return,ff=n
break}ff=t.return}}(n,t)}finally{bf=o,Bo.p=u,$o.T=l}}Nf=1,Cu(),Tu(),_u()}}function Cu(){if(1===Nf){Nf=0
var e=Uf,n=zf,t=!!(13878&n.flags)
if(13878&n.subtreeFlags||t){t=$o.T,$o.T=null
var r=Bo.p
Bo.p=2
var l=bf
bf|=4
try{Il(n,e)
var u=sd,i=ze(e.containerInfo),o=u.focusedElem,a=u.selectionRange
if(i!==o&&o&&o.ownerDocument&&Ue(o.ownerDocument.documentElement,o)){if(null!==a&&Ve(o)){var c=a.start,s=a.end
if(void 0===s&&(s=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(s,o.value.length)
else{var f=o.ownerDocument||document,d=f&&f.defaultView||window
if(d.getSelection){var p=d.getSelection(),h=o.textContent.length,v=Math.min(a.start,h),y=void 0===a.end?v:Math.min(a.end,h)
!p.extend&&v>y&&(i=y,y=v,v=i)
var m=Ne(o,v),b=Ne(o,y)
if(m&&b&&(1!==p.rangeCount||p.anchorNode!==m.node||p.anchorOffset!==m.offset||p.focusNode!==b.node||p.focusOffset!==b.offset)){var w=f.createRange()
w.setStart(m.node,m.offset),p.removeAllRanges(),v>y?(p.addRange(w),p.extend(b.node,b.offset)):(w.setEnd(b.node,b.offset),p.addRange(w))}}}}for(f=[],p=o;p=p.parentNode;)1===p.nodeType&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop})
for("function"==typeof o.focus&&o.focus(),o=0;o<f.length;o++){var k=f[o]
k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}Cd=!!cd,sd=cd=null}finally{bf=l,Bo.p=r,$o.T=t}}e.current=n,Nf=2}}function Tu(){if(2===Nf){Nf=0
var e=Uf,n=zf,t=!!(8772&n.flags)
if(8772&n.subtreeFlags||t){t=$o.T,$o.T=null
var r=Bo.p
Bo.p=2
var l=bf
bf|=4
try{Fl(e,n.alternate,n)}finally{bf=l,Bo.p=r,$o.T=t}}Nf=3}}function _u(){if(4===Nf||3===Nf){Nf=0,Jo()
var e=Uf,n=zf,t=Vf,r=Xf
10256&n.subtreeFlags||10256&n.flags?Nf=5:(Nf=0,zf=Uf=null,Ou(e,e.pendingLanes))
var l=e.pendingLanes
if(0===l&&(Hf=null),j(t),n=n.stateNode,aa&&"function"==typeof aa.onCommitFiberRoot)try{aa.onCommitFiberRoot(oa,n,void 0,!(128&~n.current.flags))}catch(a){}if(null!==r){n=$o.T,l=Bo.p,Bo.p=2,$o.T=null
try{for(var u=e.onRecoverableError,i=0;i<r.length;i++){var o=r[i]
u(o.value,{componentStack:o.stack})}}finally{$o.T=n,Bo.p=l}}3&Vf&&Mu(),$u(e),l=e.pendingLanes,4194090&t&&42&l?e===Gf?qf++:(qf=0,Gf=e):qf=0,Bu(0)}}function Ou(e,n){0===(e.pooledCacheLanes&=n)&&null!=(n=e.pooledCache)&&(e.pooledCache=null,Rn(n))}function Mu(e){return Cu(),Tu(),_u(),Fu()}function Fu(){if(5!==Nf)return!1
var n=Uf,t=Wf
Wf=0
var r=j(Vf),l=$o.T,u=Bo.p
try{Bo.p=32>r?32:r,$o.T=null,r=Kf,Kf=null
var i=Uf,o=Vf
if(Nf=0,zf=Uf=null,Vf=0,6&bf)throw Error(e(331))
var a=bf
if(bf|=4,Zl(i.current),Kl(i,i.current,o,r),bf=a,Bu(0),aa&&"function"==typeof aa.onPostCommitFiberRoot)try{aa.onPostCommitFiberRoot(oa,i)}catch(c){}return!0}finally{Bo.p=u,$o.T=l,Ou(n,t)}}function Au(e,n,t){n=Ge(t,n),null!==(e=Xn(e,n=Ir(e.stateNode,n,2),2))&&(A(e,2),$u(e))}function Lu(e,n,t){if(3===e.tag)Au(e,e,t)
else for(;null!==n;){if(3===n.tag){Au(n,e,t)
break}if(1===n.tag){var r=n.stateNode
if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Hf||!Hf.has(r))){e=Ge(t,e),null!==(r=Xn(n,t=$r(2),2))&&(Br(t,r,n,e),A(r,2),$u(r))
break}}n=n.return}}function Du(e,n,t){var r=e.pingCache
if(null===r){r=e.pingCache=new mf
var l=new Set
r.set(n,l)}else void 0===(l=r.get(n))&&(l=new Set,r.set(n,l))
l.has(t)||(Tf=!0,l.add(t),e=Ru.bind(null,e,n,t),n.then(e,e))}function Ru(e,n,t){var r=e.pingCache
null!==r&&r.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,wf===e&&(gf&t)===t&&(4===Of||3===Of&&(62914560&gf)===gf&&300>Qo()-If?!(2&bf)&&fu(e,0):Af|=t,Df===gf&&(Df=0)),$u(e)}function ju(e,n){0===n&&(n=T()),null!==(e=Ze(e,n))&&(A(e,n),$u(e))}function Pu(e){var n=e.memoizedState,t=0
null!==n&&(t=n.retryLane),ju(e,t)}function Iu(n,t){var r=0
switch(n.tag){case 13:var l=n.stateNode,u=n.memoizedState
null!==u&&(r=u.retryLane)
break
case 19:l=n.stateNode
break
case 22:l=n.stateNode.F
break
default:throw Error(e(314))}null!==l&&l.delete(t),ju(n,r)}function $u(e){e!==Jf&&null===e.next&&(null===Jf?Yf=Jf=e:Jf=Jf.next=e),Zf=!0,Qf||(Qf=!0,vd(function(){6&bf?qo(ea,Hu):Nu()}))}function Bu(e,n){if(!ed&&Zf){ed=!0
do{for(var t=!1,r=Yf;null!==r;){if(0!==e){var l=r.pendingLanes
if(0===l)var u=0
else{var i=r.suspendedLanes,o=r.pingedLanes
u=(1<<31-ca(42|e)+1)-1,u=201326741&(u&=l&~(i&~o))?201326741&u|1:u?2|u:0}0!==u&&(t=!0,Vu(r,u))}else u=gf,!(3&(u=E(r,r===wf?u:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||S(r,u)||(t=!0,Vu(r,u))
r=r.next}}while(t)
ed=!1}}function Hu(){Nu()}function Nu(){Zf=Qf=!1
var e=0
0!==nd&&(function(){var e=window.event
return e&&"popstate"===e.type?e!==fd&&(fd=e,!0):(fd=null,!1)}()&&(e=nd),nd=0)
for(var n=Qo(),t=null,r=Yf;null!==r;){var l=r.next,u=Uu(r,n)
0===u?(r.next=null,null===t?Yf=l:t.next=l,null===l&&(Jf=t)):(t=r,(0!==e||3&u)&&(Zf=!0)),r=l}Bu(e)}function Uu(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,u=-62914561&e.pendingLanes;0<u;){var i=31-ca(u),o=1<<i,a=l[i];-1===a?0!==(o&t)&&0===(o&r)||(l[i]=x(o,n)):a<=n&&(e.expiredLanes|=o),u&=~o}if(t=gf,t=E(e,e===(n=wf)?t:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===t||e===n&&(2===Ef||9===Ef)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&Go(r),e.callbackNode=null,e.callbackPriority=0
if(!(3&t)||S(e,t)){if((n=t&-t)===e.callbackPriority)return n
switch(null!==r&&Go(r),j(t)){case 2:case 8:t=na
break
case 32:default:t=ta
break
case 268435456:t=la}return r=zu.bind(null,e),t=qo(t,r),e.callbackPriority=n,e.callbackNode=t,n}return null!==r&&null!==r&&Go(r),e.callbackPriority=2,e.callbackNode=null,2}function zu(e,n){if(0!==Nf&&5!==Nf)return e.callbackNode=null,e.callbackPriority=0,null
var t=e.callbackNode
if(Mu()&&e.callbackNode!==t)return null
var r=gf
return 0===(r=E(e,e===wf?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(uu(e,r,n),Uu(e,Qo()),null!=e.callbackNode&&e.callbackNode===t?zu.bind(null,e):null)}function Vu(e,n){if(Mu())return null
uu(e,n,!0)}function Wu(){return 0===nd&&(nd=C()),nd}function Ku(e){return null==e||"symbol"==typeof e||"boolean"==typeof e?null:"function"==typeof e?e:he(""+e)}function Xu(e,n){var t=n.ownerDocument.createElement("input")
return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function qu(e,n){n=!!(4&n)
for(var t=0;t<e.length;t++){var r=e[t],l=r.event
r=r.listeners
e:{var u=void 0
if(n)for(var i=r.length-1;0<=i;i--){var o=r[i],a=o.instance,c=o.currentTarget
if(o=o.listener,a!==u&&l.isPropagationStopped())break e
u=o,l.currentTarget=c
try{u(l)}catch(s){tf(s)}l.currentTarget=null,u=a}else for(i=0;i<r.length;i++){if(a=(o=r[i]).instance,c=o.currentTarget,o=o.listener,a!==u&&l.isPropagationStopped())break e
u=o,l.currentTarget=c
try{u(l)}catch(s){tf(s)}l.currentTarget=null,u=a}}}}function Gu(e,n){var t=n[ba]
void 0===t&&(t=n[ba]=new Set)
var r=e+"__bubble"
t.has(r)||(Qu(n,e,2,!1),t.add(r))}function Yu(e,n,t){var r=0
n&&(r|=4),Qu(t,e,r,n)}function Ju(e){if(!e[id]){e[id]=!0,Sa.forEach(function(n){"selectionchange"!==n&&(ud.has(n)||Yu(n,!1,e),Yu(n,!0,e))})
var n=9===e.nodeType?e:e.ownerDocument
null===n||n[id]||(n[id]=!0,Yu("selectionchange",!1,n))}}function Qu(e,n,t,r){switch(eo(n)){case 2:var l=Gi
break
case 8:l=Yi
break
default:l=Ji}t=l.bind(null,n,t,e),l=void 0,!$a||"touchstart"!==n&&"touchmove"!==n&&"wheel"!==n||(l=!0),r?void 0!==l?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):void 0!==l?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function Zu(e,n,r,l,u){var i=l
if(!(1&n||2&n||null===l))e:for(;;){if(null===l)return
var o=l.tag
if(3===o||4===o){var a=l.stateNode.containerInfo
if(a===u)break
if(4===o)for(o=l.return;null!==o;){var c=o.tag
if((3===c||4===c)&&o.stateNode.containerInfo===u)return
o=o.return}for(;null!==a;){if(null===(o=$(a)))return
if(5===(c=o.tag)||6===c||26===c||27===c){l=i=o
continue e}a=a.parentNode}}l=l.return}me(function(){var l=i,u=ve(r),o=[]
e:{var a=zc.get(e)
if(void 0!==a){var c=Xa,s=e
switch(e){case"keypress":if(0===ke(r))break e
case"keydown":case"keyup":c=ic
break
case"focusin":s="focus",c=Za
break
case"focusout":s="blur",c=Za
break
case"beforeblur":case"afterblur":c=Za
break
case"click":if(2===r.button)break e
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=Ja
break
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=Qa
break
case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=ac
break
case Pc:case Ic:case $c:c=ec
break
case Uc:c=cc
break
case"scroll":case"scrollend":c=Ga
break
case"wheel":c=sc
break
case"copy":case"cut":case"paste":c=nc
break
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=oc
break
case"toggle":case"beforetoggle":c=fc}var f=!!(4&n),d=!f&&("scroll"===e||"scrollend"===e),p=f?null!==a?a+"Capture":null:a
f=[]
for(var h,v=l;null!==v;){var y=v
if(h=y.stateNode,5!==(y=y.tag)&&26!==y&&27!==y||null===h||null===p||null!=(y=be(v,p))&&f.push(ei(v,y,h)),d)break
v=v.return}0<f.length&&(a=new c(a,s,null,r,u),o.push({event:a,listeners:f}))}}if(!(7&n)){if(c="mouseout"===e||"pointerout"===e,(!(a="mouseover"===e||"pointerover"===e)||r===Da||!(s=r.relatedTarget||r.fromElement)||!$(s)&&!s[ma])&&(c||a)&&(a=u.window===u?u:(a=u.ownerDocument)?a.defaultView||a.parentWindow:window,c?(c=l,null!==(s=(s=r.relatedTarget||r.toElement)?$(s):null)&&(d=t(s),f=s.tag,s!==d||5!==f&&27!==f&&6!==f)&&(s=null)):(c=null,s=l),c!==s)){if(f=Ja,y="onMouseLeave",p="onMouseEnter",v="mouse","pointerout"!==e&&"pointerover"!==e||(f=oc,y="onPointerLeave",p="onPointerEnter",v="pointer"),d=null==c?a:H(c),h=null==s?a:H(s),(a=new f(y,v+"leave",c,r,u)).target=d,a.relatedTarget=h,y=null,$(u)===l&&((f=new f(p,v+"enter",s,r,u)).target=h,f.relatedTarget=d,y=f),d=y,c&&s)e:{for(p=s,v=0,h=f=c;h;h=ti(h))v++
for(h=0,y=p;y;y=ti(y))h++
for(;0<v-h;)f=ti(f),v--
for(;0<h-v;)p=ti(p),h--
for(;v--;){if(f===p||null!==p&&f===p.alternate)break e
f=ti(f),p=ti(p)}f=null}else f=null
null!==c&&ri(o,a,c,f,!1),null!==s&&null!==d&&ri(o,d,s,f,!0)}if("select"===(c=(a=l?H(l):window).nodeName&&a.nodeName.toLowerCase())||"input"===c&&"file"===a.type)var m=Le
else if(Oe(a))if(Sc)m=$e
else{m=Pe
var b=je}else!(c=a.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==a.type&&"radio"!==a.type?l&&pe(l.elementType)&&(m=Le):m=Ie
switch(m&&(m=m(e,l))?Me(o,m,r,u):(b&&b(e,a,l),"focusout"===e&&l&&"number"===a.type&&null!=l.memoizedProps.value&&ie(a,"number",a.value)),b=l?H(l):window,e){case"focusin":(Oe(b)||"true"===b.contentEditable)&&(Mc=b,Fc=l,Ac=null)
break
case"focusout":Ac=Fc=Mc=null
break
case"mousedown":Lc=!0
break
case"contextmenu":case"mouseup":case"dragend":Lc=!1,We(o,r,u)
break
case"selectionchange":if(Oc)break
case"keydown":case"keyup":We(o,r,u)}var w
if(pc)e:{switch(e){case"compositionstart":var k="onCompositionStart"
break e
case"compositionend":k="onCompositionEnd"
break e
case"compositionupdate":k="onCompositionUpdate"
break e}k=void 0}else wc?Te(e,r)&&(k="onCompositionEnd"):"keydown"===e&&229===r.keyCode&&(k="onCompositionStart")
k&&(yc&&"ko"!==r.locale&&(wc||"onCompositionStart"!==k?"onCompositionEnd"===k&&wc&&(w=we()):(Va="value"in(za=u)?za.value:za.textContent,wc=!0)),0<(b=ni(l,k)).length&&(k=new tc(k,e,null,r,u),o.push({event:k,listeners:b}),(w||null!==(w=_e(r)))&&(k.data=w))),(w=vc?function(e,n){switch(e){case"compositionend":return _e(n)
case"keypress":return 32!==n.which?null:(bc=!0,mc)
case"textInput":return(e=n.data)===mc&&bc?null:e
default:return null}}(e,r):function(e,n){if(wc)return"compositionend"===e||!pc&&Te(e,n)?(e=we(),Wa=Va=za=null,wc=!1,e):null
switch(e){case"paste":default:return null
case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char
if(n.which)return String.fromCharCode(n.which)}return null
case"compositionend":return yc&&"ko"!==n.locale?null:n.data}}(e,r))&&0<(k=ni(l,"onBeforeInput")).length&&(b=new tc("onBeforeInput","beforeinput",null,r,u),o.push({event:b,listeners:k}),b.data=w),function(e,n,t,r,l){if("submit"===n&&t&&t.stateNode===l){var u=Ku((l[ya]||null).action),i=r.submitter
i&&null!==(n=(n=i[ya]||null)?Ku(n.formAction):i.getAttribute("formAction"))&&(u=n,i=null)
var o=new Xa("action","action",null,r,l)
e.push({event:o,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==nd){var e=i?Xu(l,i):new FormData(l)
lr(t,{pending:!0,data:e,method:l.method,action:u},null,e)}}else"function"==typeof u&&(o.preventDefault(),e=i?Xu(l,i):new FormData(l),lr(t,{pending:!0,data:e,method:l.method,action:u},u,e))},currentTarget:l}]})}}(o,e,l,r,u)}qu(o,n)})}function ei(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ni(e,n){for(var t=n+"Capture",r=[];null!==e;){var l=e,u=l.stateNode
if(5!==(l=l.tag)&&26!==l&&27!==l||null===u||(null!=(l=be(e,t))&&r.unshift(ei(e,l,u)),null!=(l=be(e,n))&&r.push(ei(e,l,u))),3===e.tag)return r
e=e.return}return[]}function ti(e){if(null===e)return null
do{e=e.return}while(e&&5!==e.tag&&27!==e.tag)
return e||null}function ri(e,n,t,r,l){for(var u=n.h,i=[];null!==t&&t!==r;){var o=t,a=o.alternate,c=o.stateNode
if(o=o.tag,null!==a&&a===r)break
5!==o&&26!==o&&27!==o||null===c||(a=c,l?null!=(c=be(t,u))&&i.unshift(ei(t,c,a)):l||null!=(c=be(t,u))&&i.push(ei(t,c,a))),t=t.return}0!==i.length&&e.push({event:n,listeners:i})}function li(e){return("string"==typeof e?e:""+e).replace(od,"\n").replace(ad,"")}function ui(e,n){return n=li(n),li(e)===n}function ii(){}function oi(n,t,r,l,u,i){switch(r){case"children":"string"==typeof l?"body"===t||"textarea"===t&&""===l||se(n,l):("number"==typeof l||"bigint"==typeof l)&&"body"!==t&&se(n,""+l)
break
case"className":K(n,"class",l)
break
case"tabIndex":K(n,"tabindex",l)
break
case"dir":case"role":case"viewBox":case"width":case"height":K(n,r,l)
break
case"style":de(n,l,i)
break
case"data":if("object"!==t){K(n,"data",l)
break}case"src":case"href":if(""===l&&("a"!==t||"href"!==r)){n.removeAttribute(r)
break}if(null==l||"function"==typeof l||"symbol"==typeof l||"boolean"==typeof l){n.removeAttribute(r)
break}l=he(""+l),n.setAttribute(r,l)
break
case"action":case"formAction":if("function"==typeof l){n.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')")
break}if("function"==typeof i&&("formAction"===r?("input"!==t&&oi(n,t,"name",u.name,u,null),oi(n,t,"formEncType",u.formEncType,u,null),oi(n,t,"formMethod",u.formMethod,u,null),oi(n,t,"formTarget",u.formTarget,u,null)):(oi(n,t,"encType",u.encType,u,null),oi(n,t,"method",u.method,u,null),oi(n,t,"target",u.target,u,null))),null==l||"symbol"==typeof l||"boolean"==typeof l){n.removeAttribute(r)
break}l=he(""+l),n.setAttribute(r,l)
break
case"onClick":null!=l&&(n.onclick=ii)
break
case"onScroll":null!=l&&Gu("scroll",n)
break
case"onScrollEnd":null!=l&&Gu("scrollend",n)
break
case"dangerouslySetInnerHTML":if(null!=l){if("object"!=typeof l||!("B"in l))throw Error(e(61))
if(null!=(r=l.B)){if(null!=u.children)throw Error(e(60))
n.innerHTML=r}}break
case"multiple":n.multiple=l&&"function"!=typeof l&&"symbol"!=typeof l
break
case"muted":n.muted=l&&"function"!=typeof l&&"symbol"!=typeof l
break
case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break
case"xlinkHref":if(null==l||"function"==typeof l||"boolean"==typeof l||"symbol"==typeof l){n.removeAttribute("xlink:href")
break}r=he(""+l),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r)
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
case"popover":Gu("beforetoggle",n),Gu("toggle",n),W(n,"popover",l)
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
default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&W(n,r=Aa.get(r)||r,l)}}function ai(n,t,r,l,u,i){switch(r){case"style":de(n,l,i)
break
case"dangerouslySetInnerHTML":if(null!=l){if("object"!=typeof l||!("B"in l))throw Error(e(61))
if(null!=(r=l.B)){if(null!=u.children)throw Error(e(60))
n.innerHTML=r}}break
case"children":"string"==typeof l?se(n,l):("number"==typeof l||"bigint"==typeof l)&&se(n,""+l)
break
case"onScroll":null!=l&&Gu("scroll",n)
break
case"onScrollEnd":null!=l&&Gu("scrollend",n)
break
case"onClick":null!=l&&(n.onclick=ii)
break
case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break
default:xa.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(u=r.endsWith("Capture"),t=r.slice(2,u?r.length-7:void 0),"function"==typeof(i=null!=(i=n[ya]||null)?i[r]:null)&&n.removeEventListener(t,i,u),"function"!=typeof l)?r in n?n[r]=l:!0===l?n.setAttribute(r,""):W(n,r,l):("function"!=typeof i&&null!==i&&(r in n?n[r]=null:n.hasAttribute(r)&&n.removeAttribute(r)),n.addEventListener(t,l,u)))}}function ci(n,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break
case"img":Gu("error",n),Gu("load",n)
var l,u=!1,i=!1
for(l in r)if(r.hasOwnProperty(l)){var o=r[l]
if(null!=o)switch(l){case"src":u=!0
break
case"srcSet":i=!0
break
case"children":case"dangerouslySetInnerHTML":throw Error(e(137,t))
default:oi(n,t,l,o,r,null)}}return i&&oi(n,t,"srcSet",r.srcSet,r,null),u&&oi(n,t,"src",r.src,r,null),void 0
case"input":Gu("invalid",n)
var a=l=o=i=null,c=null,s=null
for(u in r)if(r.hasOwnProperty(u)){var f=r[u]
if(null!=f)switch(u){case"name":i=f
break
case"type":o=f
break
case"checked":c=f
break
case"defaultChecked":s=f
break
case"value":l=f
break
case"defaultValue":a=f
break
case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(e(137,t))
break
default:oi(n,t,u,f,r,null)}}return ue(n,l,a,c,s,o,i,!1),ee(n),void 0
case"select":for(i in Gu("invalid",n),u=o=l=null,r)if(r.hasOwnProperty(i)&&null!=(a=r[i]))switch(i){case"value":l=a
break
case"defaultValue":o=a
break
case"multiple":u=a
default:oi(n,t,i,a,r,null)}return t=l,r=o,n.multiple=!!u,null!=t?oe(n,!!u,t,!1):null!=r&&oe(n,!!u,r,!0),void 0
case"textarea":for(o in Gu("invalid",n),l=i=u=null,r)if(r.hasOwnProperty(o)&&null!=(a=r[o]))switch(o){case"value":u=a
break
case"defaultValue":i=a
break
case"children":l=a
break
case"dangerouslySetInnerHTML":if(null!=a)throw Error(e(91))
break
default:oi(n,t,o,a,r,null)}return ce(n,u,i,l),ee(n),void 0
case"option":for(c in r)r.hasOwnProperty(c)&&null!=(u=r[c])&&("selected"===c?n.selected=u&&"function"!=typeof u&&"symbol"!=typeof u:oi(n,t,c,u,r,null))
return
case"dialog":Gu("beforetoggle",n),Gu("toggle",n),Gu("cancel",n),Gu("close",n)
break
case"iframe":case"object":Gu("load",n)
break
case"video":case"audio":for(u=0;u<ld.length;u++)Gu(ld[u],n)
break
case"image":Gu("error",n),Gu("load",n)
break
case"details":Gu("toggle",n)
break
case"embed":case"source":case"link":Gu("error",n),Gu("load",n)
case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(s in r)if(r.hasOwnProperty(s)&&null!=(u=r[s]))switch(s){case"children":case"dangerouslySetInnerHTML":throw Error(e(137,t))
default:oi(n,t,s,u,r,null)}return
default:if(pe(t)){for(f in r)r.hasOwnProperty(f)&&void 0!==(u=r[f])&&ai(n,t,f,u,r,void 0)
return}}for(a in r)r.hasOwnProperty(a)&&null!=(u=r[a])&&oi(n,t,a,u,r,null)}function si(e){return 9===e.nodeType?e:e.ownerDocument}function fi(e){switch(e){case"http://www.w3.org/2000/svg":return 1
case"http://www.w3.org/1998/Math/MathML":return 2
default:return 0}}function di(e,n){if(0===e)switch(n){case"svg":return 1
case"math":return 2
default:return 0}return 1===e&&"foreignObject"===n?0:e}function pi(e,n){return"textarea"===e||"noscript"===e||"string"==typeof n.children||"number"==typeof n.children||"bigint"==typeof n.children||"object"==typeof n.dangerouslySetInnerHTML&&null!==n.dangerouslySetInnerHTML&&null!=n.dangerouslySetInnerHTML.B}function hi(e){setTimeout(function(){throw e})}function vi(e){return"head"===e}function yi(e,n){var t=n,r=0,l=0
do{var u=t.nextSibling
if(e.removeChild(t),u&&8===u.nodeType)if("/$"===(t=u.data)){if(0<r&&8>r){t=r
var i=e.ownerDocument
if(1&t&&Ei(i.documentElement),2&t&&Ei(i.body),4&t)for(Ei(t=i.head),i=t.firstChild;i;){var o=i.nextSibling,a=i.nodeName
i[Ea]||"SCRIPT"===a||"STYLE"===a||"LINK"===a&&"stylesheet"===i.rel.toLowerCase()||t.removeChild(i),i=o}}if(0===l)return e.removeChild(u),co(n),void 0
l--}else"$"===t||"$?"===t||"$!"===t?l++:r=t.charCodeAt(0)-48
else r=0
t=u}while(t)
co(n)}function mi(e){var n=e.firstChild
for(n&&10===n.nodeType&&(n=n.nextSibling);n;){var t=n
switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":mi(t),I(t)
continue
case"SCRIPT":case"STYLE":continue
case"LINK":if("stylesheet"===t.rel.toLowerCase())continue}e.removeChild(t)}}function bi(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function wi(e){for(;null!=e;e=e.nextSibling){var n=e.nodeType
if(1===n||3===n)break
if(8===n){if("$"===(n=e.data)||"$!"===n||"$?"===n||"F!"===n||"F"===n)break
if("/$"===n)return null}}return e}function ki(e){e=e.previousSibling
for(var n=0;e;){if(8===e.nodeType){var t=e.data
if("$"===t||"$!"===t||"$?"===t){if(0===n)return e
n--}else"/$"===t&&n++}e=e.previousSibling}return null}function gi(n,t,r){switch(t=si(r),n){case"html":if(!(n=t.documentElement))throw Error(e(452))
return n
case"head":if(!(n=t.head))throw Error(e(453))
return n
case"body":if(!(n=t.body))throw Error(e(454))
return n
default:throw Error(e(451))}}function Ei(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0])
I(e)}function Si(e){return"function"==typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}function xi(e,n,t){var r=kd
if(r&&"string"==typeof n&&n){var l=re(n)
l='link[rel="'+e+'"][href="'+l+'"]',"string"==typeof t&&(l+='[crossorigin="'+t+'"]'),bd.has(l)||(bd.add(l),e={rel:e,crossOrigin:t,href:n},null===r.querySelector(l)&&(ci(n=r.createElement("link"),"link",e),U(n),r.head.appendChild(n)))}}function Ci(n,t,r,l){var u,i,o,a,c=(c=Wo.current)?Si(c):null
if(!c)throw Error(e(446))
switch(n){case"meta":case"title":return null
case"style":return"string"==typeof r.precedence&&"string"==typeof r.href?(t=Ti(r.href),(l=(r=N(c).hoistableStyles).get(t))||(l={type:"style",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null}
case"link":if("stylesheet"===r.rel&&"string"==typeof r.href&&"string"==typeof r.precedence){n=Ti(r.href)
var s=N(c).hoistableStyles,f=s.get(n)
if(f||(c=c.ownerDocument||c,f={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(n,f),(s=c.querySelector(_i(n)))&&!s.$&&(f.instance=s,f.state.loading=5),md.has(n)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},md.set(n,r),s||(u=c,i=n,o=r,a=f.state,void(u.querySelector('link[rel="preload"][as="style"]['+i+"]")?a.loading=1:(i=u.createElement("link"),a.preload=i,i.addEventListener("load",function(){return a.loading|=1}),i.addEventListener("error",function(){return a.loading|=2}),ci(i,"link",o),U(i),u.head.appendChild(i)))))),t&&null===l)throw Error(e(528,""))
return f}if(t&&null!==l)throw Error(e(529,""))
return null
case"script":return t=r.async,"string"==typeof(r=r.src)&&t&&"function"!=typeof t&&"symbol"!=typeof t?(t=Mi(r),(l=(r=N(c).hoistableScripts).get(t))||(l={type:"script",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null}
default:throw Error(e(444,n))}}function Ti(e){return'href="'+re(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Oi(e){return bo({},e,{"data-precedence":e.precedence,precedence:null})}function Mi(e){return'[src="'+re(e)+'"]'}function Fi(e){return"script[async]"+e}function Ai(n,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var l=n.querySelector('style[data-href~="'+re(r.href)+'"]')
if(l)return t.instance=l,U(l),l
var u=bo({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null})
return U(l=(n.ownerDocument||n).createElement("style")),ci(l,"style",u),Li(l,r.precedence,n),t.instance=l
case"stylesheet":u=Ti(r.href)
var i=n.querySelector(_i(u))
if(i)return t.state.loading|=4,t.instance=i,U(i),i
l=Oi(r),(u=md.get(u))&&Di(l,u),U(i=(n.ownerDocument||n).createElement("link"))
var o=i
return o.$=new Promise(function(e,n){o.onload=e,o.onerror=n}),ci(i,"link",l),t.state.loading|=4,Li(i,r.precedence,n),t.instance=i
case"script":return i=Mi(r.src),(u=n.querySelector(Fi(i)))?(t.instance=u,U(u),u):(l=r,(u=md.get(i))&&Ri(l=bo({},r),u),U(u=(n=n.ownerDocument||n).createElement("script")),ci(u,"link",l),n.head.appendChild(u),t.instance=u)
case"void":return null
default:throw Error(e(443,t.type))}else"stylesheet"===t.type&&!(4&t.state.loading)&&(l=t.instance,t.state.loading|=4,Li(l,r.precedence,n))
return t.instance}function Li(e,n,t){for(var r=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=r.length?r[r.length-1]:null,u=l,i=0;i<r.length;i++){var o=r[i]
if(o.dataset.precedence===n)u=o
else if(u!==l)break}u?u.parentNode.insertBefore(e,u.nextSibling):(n=9===t.nodeType?t.head:t).insertBefore(e,n.firstChild)}function Di(e,n){null==e.crossOrigin&&(e.crossOrigin=n.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),null==e.title&&(e.title=n.title)}function Ri(e,n){null==e.crossOrigin&&(e.crossOrigin=n.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),null==e.integrity&&(e.integrity=n.integrity)}function ji(e,n,t){if(null===gd){var r=new Map,l=gd=new Map
l.set(t,r)}else(r=(l=gd).get(t))||(r=new Map,l.set(t,r))
if(r.has(e))return r
for(r.set(e,null),t=t.getElementsByTagName(e),l=0;l<t.length;l++){var u=t[l]
if(!(u[Ea]||u[va]||"link"===e&&"stylesheet"===u.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==u.namespaceURI){var i=u.getAttribute(n)||""
i=e+i
var o=r.get(i)
o?o.push(u):r.set(i,[u])}}return r}function Pi(e,n,t){(e=e.ownerDocument||e).head.insertBefore(t,"title"===n?e.querySelector("head > title"):null)}function Ii(e){return!!("stylesheet"!==e.type||3&e.state.loading)}function $i(){}function Bi(){if(this.count--,0===this.count)if(this.stylesheets)Hi(this,this.stylesheets)
else if(this.unsuspend){var e=this.unsuspend
this.unsuspend=null,e()}}function Hi(e,n){e.stylesheets=null,null!==e.unsuspend&&(e.count++,Sd=new Map,n.forEach(Ni,e),Sd=null,Bi.call(e))}function Ni(e,n){if(!(4&n.state.loading)){var t=Sd.get(e)
if(t)var r=t.get(null)
else{t=new Map,Sd.set(e,t)
for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<l.length;u++){var i=l[u]
"LINK"!==i.nodeName&&"not all"===i.getAttribute("media")||(t.set(i.dataset.precedence,i),r=i)}r&&t.set(null,r)}i=(l=n.instance).getAttribute("data-precedence"),(u=t.get(i)||r)===r&&t.set(null,l),t.set(i,l),this.count++,r=Bi.bind(this),l.addEventListener("load",r),l.addEventListener("error",r),u?u.parentNode.insertBefore(l,u.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(l,e.firstChild),n.state.loading|=4}}function Ui(e,n,t,r,l,u,i,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=F(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=F(0),this.hiddenUpdates=F(null),this.identifierPrefix=r,this.onUncaughtError=l,this.onCaughtError=u,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function zi(e,n,t,r,l,u,i,o,a,c,s,f){return e=new Ui(e,n,t,i,o,a,c,f),n=1,!0===u&&(n|=24),u=rn(3,null,null,n),e.current=u,u.stateNode=e,(n=Dn()).refCount++,e.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:t,cache:n},Vn(u),e}function Vi(e){return e?e=Gc:Gc}function Wi(e,n,t,r,l,u){l=Vi(l),null===r.context?r.context=l:r.pendingContext=l,(r=Kn(n)).payload={element:t},null!==(u=void 0===u?null:u)&&(r.callback=u),null!==(t=Xn(e,r,n))&&(lu(t,0,n),qn(t,e,n))}function Ki(e,n){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var t=e.retryLane
e.retryLane=0!==t&&t<n?t:n}}function Xi(e,n){Ki(e,n),(e=e.alternate)&&Ki(e,n)}function qi(e){if(13===e.tag){var n=Ze(e,67108864)
null!==n&&lu(n,0,67108864),Xi(e,67108864)}}function Gi(e,n,t,r){var l=$o.T
$o.T=null
var u=Bo.p
try{Bo.p=2,Ji(e,n,t,r)}finally{Bo.p=u,$o.T=l}}function Yi(e,n,t,r){var l=$o.T
$o.T=null
var u=Bo.p
try{Bo.p=8,Ji(e,n,t,r)}finally{Bo.p=u,$o.T=l}}function Ji(e,n,t,r){if(Cd){var l=Qi(r)
if(null===l)Zu(e,n,r,Td,t),no(e,r)
else if(function(e,n,t,r,l){switch(n){case"focusin":return Od=to(Od,e,n,t,r,l),!0
case"dragenter":return Md=to(Md,e,n,t,r,l),!0
case"mouseover":return Fd=to(Fd,e,n,t,r,l),!0
case"pointerover":var u=l.pointerId
return Ad.set(u,to(Ad.get(u)||null,e,n,t,r,l)),!0
case"gotpointercapture":return u=l.pointerId,Ld.set(u,to(Ld.get(u)||null,e,n,t,r,l)),!0}return!1}(l,e,n,t,r))r.stopPropagation()
else if(no(e,r),4&n&&-1<Rd.indexOf(e)){for(;null!==l;){var u=B(l)
if(null!==u)switch(u.tag){case 3:if((u=u.stateNode).current.memoizedState.isDehydrated){var i=g(u.pendingLanes)
if(0!==i){var o=u
for(o.pendingLanes|=2,o.entangledLanes|=2;i;){var a=1<<31-ca(i)
o.entanglements[1]|=a,i&=~a}$u(u),!(6&bf)&&($f=Qo()+500,Bu(0))}}break
case 13:null!==(o=Ze(u,2))&&lu(o,0,2),cu(),Xi(u,2)}if(null===(u=Qi(r))&&Zu(e,n,r,Td,t),u===l)break
l=u}null!==l&&r.stopPropagation()}else Zu(e,n,r,null,t)}}function Qi(e){return Zi(e=ve(e))}function Zi(e){if(Td=null,null!==(e=$(e))){var n=t(e)
if(null===n)e=null
else{var l=n.tag
if(13===l){if(null!==(e=r(n)))return e
e=null}else if(3===l){if(n.stateNode.current.memoizedState.isDehydrated)return 3===n.tag?n.stateNode.containerInfo:null
e=null}else n!==e&&(e=null)}}return Td=e,null}function eo(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8
case"message":switch(Zo()){case ea:return 2
case na:return 8
case ta:case ra:return 32
case la:return 268435456
default:return 32}default:return 32}}function no(e,n){switch(e){case"focusin":case"focusout":Od=null
break
case"dragenter":case"dragleave":Md=null
break
case"mouseover":case"mouseout":Fd=null
break
case"pointerover":case"pointerout":Ad.delete(n.pointerId)
break
case"gotpointercapture":case"lostpointercapture":Ld.delete(n.pointerId)}}function to(e,n,t,r,l,u){return null===e||e.nativeEvent!==u?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:u,targetContainers:[l]},null!==n&&null!==(n=B(n))&&qi(n),e):(e.eventSystemFlags|=r,n=e.targetContainers,null!==l&&-1===n.indexOf(l)&&n.push(l),e)}function ro(e){var n=$(e.target)
if(null!==n){var l=t(n)
if(null!==l)if(13===(n=l.tag)){if(null!==(n=r(l)))return e.blockedOn=n,function(e){var n=Bo.p
try{return Bo.p=e,function(){if(13===l.tag){var e=tu()
e=R(e)
var n=Ze(l,e)
null!==n&&lu(n,0,e),Xi(l,e)}}()}finally{Bo.p=n}}(e.priority),void 0}else if(3===n&&l.stateNode.current.memoizedState.isDehydrated)return e.blockedOn=3===l.tag?l.stateNode.containerInfo:null,void 0}e.blockedOn=null}function lo(e){if(null!==e.blockedOn)return!1
for(var n=e.targetContainers;0<n.length;){var t=Qi(e.nativeEvent)
if(null!==t)return null!==(n=B(t))&&qi(n),e.blockedOn=t,!1
var r=new(t=e.nativeEvent).constructor(t.type,t)
Da=r,t.target.dispatchEvent(r),Da=null,n.shift()}return!0}function uo(e,n,t){lo(e)&&t.delete(n)}function io(){_d=!1,null!==Od&&lo(Od)&&(Od=null),null!==Md&&lo(Md)&&(Md=null),null!==Fd&&lo(Fd)&&(Fd=null),Ad.forEach(uo),Ld.forEach(uo)}function oo(e,n){e.blockedOn===n&&(e.blockedOn=null,_d||(_d=!0,vo.unstable_scheduleCallback(vo.unstable_NormalPriority,io)))}function ao(e){jd!==e&&(jd=e,vo.unstable_scheduleCallback(vo.unstable_NormalPriority,function(){jd===e&&(jd=null)
for(var n=0;n<e.length;n+=3){var t=e[n],r=e[n+1],l=e[n+2]
if("function"!=typeof r){if(null===Zi(r||t))continue
break}var u=B(t)
null!==u&&(e.splice(n,3),n-=3,lr(u,{pending:!0,data:l,method:t.method,action:r},r,l))}}))}function co(e){function n(n){return oo(n,e)}null!==Od&&oo(Od,e),null!==Md&&oo(Md,e),null!==Fd&&oo(Fd,e),Ad.forEach(n),Ld.forEach(n)
for(var t=0;t<Dd.length;t++){var r=Dd[t]
r.blockedOn===e&&(r.blockedOn=null)}for(;0<Dd.length&&null===(t=Dd[0]).blockedOn;)ro(t),null===t.blockedOn&&Dd.shift()
if(null!=(t=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<t.length;r+=3){var l=t[r],u=t[r+1],i=l[ya]||null
if("function"==typeof u)i||ao(t)
else if(i){var o=null
if(u&&u.hasAttribute("formAction")){if(l=u,i=u[ya]||null)o=i.formAction
else if(null!==Zi(l))continue}else o=i.action
"function"==typeof o?t[r+1]=o:(t.splice(r,3),r-=3),ao(t)}}}function so(e){this.N=e}function fo(e){this.N=e}if(w)return _
w=1
var po,ho,vo=o(),yo=i(),mo=function(){return b||(b=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),O.exports=function(){function e(e){var n="https://react.dev/errors/"+e
if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1])
for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}function t(e,n){return"font"===e?"":"string"==typeof n?"use-credentials"===n?n:"":void 0}if(m)return M
m=1
var r=i(),l={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},u=Symbol.for("react.portal"),o=r.U
return M.V=l,M.createPortal=function(n,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null
if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(e(299))
return function(e,n,t){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:u,key:null==r?null:""+r,children:e,containerInfo:n,implementation:t}}(n,t,null,r)},M.flushSync=function(e){var n=o.T,t=l.p
try{if(o.T=null,l.p=2,e)return e()}finally{o.T=n,l.p=t,l.d.f()}},M.preconnect=function(e,n){"string"==typeof e&&(n=n?"string"==typeof(n=n.crossOrigin)?"use-credentials"===n?n:"":void 0:null,l.d.C(e,n))},M.prefetchDNS=function(e){"string"==typeof e&&l.d.D(e)},M.preinit=function(e,n){if("string"==typeof e&&n&&"string"==typeof n.as){var r=n.as,u=t(r,n.crossOrigin),i="string"==typeof n.integrity?n.integrity:void 0,o="string"==typeof n.fetchPriority?n.fetchPriority:void 0
"style"===r?l.d.S(e,"string"==typeof n.precedence?n.precedence:void 0,{crossOrigin:u,integrity:i,fetchPriority:o}):"script"===r&&l.d.X(e,{crossOrigin:u,integrity:i,fetchPriority:o,nonce:"string"==typeof n.nonce?n.nonce:void 0})}},M.preinitModule=function(e,n){if("string"==typeof e)if("object"==typeof n&&null!==n){if(null==n.as||"script"===n.as){var r=t(n.as,n.crossOrigin)
l.d.M(e,{crossOrigin:r,integrity:"string"==typeof n.integrity?n.integrity:void 0,nonce:"string"==typeof n.nonce?n.nonce:void 0})}}else null==n&&l.d.M(e)},M.preload=function(e,n){if("string"==typeof e&&"object"==typeof n&&null!==n&&"string"==typeof n.as){var r=n.as,u=t(r,n.crossOrigin)
l.d.L(e,r,{crossOrigin:u,integrity:"string"==typeof n.integrity?n.integrity:void 0,nonce:"string"==typeof n.nonce?n.nonce:void 0,type:"string"==typeof n.type?n.type:void 0,fetchPriority:"string"==typeof n.fetchPriority?n.fetchPriority:void 0,referrerPolicy:"string"==typeof n.referrerPolicy?n.referrerPolicy:void 0,imageSrcSet:"string"==typeof n.imageSrcSet?n.imageSrcSet:void 0,imageSizes:"string"==typeof n.imageSizes?n.imageSizes:void 0,media:"string"==typeof n.media?n.media:void 0})}},M.preloadModule=function(e,n){if("string"==typeof e)if(n){var r=t(n.as,n.crossOrigin)
l.d.m(e,{as:"string"==typeof n.as&&"script"!==n.as?n.as:void 0,crossOrigin:r,integrity:"string"==typeof n.integrity?n.integrity:void 0})}else l.d.m(e)},M.requestFormReset=function(e){l.d.r(e)},M.unstable_batchedUpdates=function(e,n){return e(n)},M.useFormState=function(e,n,t){return o.H.useFormState(e,n,t)},M.useFormStatus=function(){return o.H.useHostTransitionStatus()},M.version="19.1.1",M}()),O.exports}(),bo=Object.assign,wo=Symbol.for("react.element"),ko=Symbol.for("react.transitional.element"),go=Symbol.for("react.portal"),Eo=Symbol.for("react.fragment"),So=Symbol.for("react.strict_mode"),xo=Symbol.for("react.profiler"),Co=Symbol.for("react.provider"),To=Symbol.for("react.consumer"),_o=Symbol.for("react.context"),Oo=Symbol.for("react.forward_ref"),Mo=Symbol.for("react.suspense"),Fo=Symbol.for("react.suspense_list"),Ao=Symbol.for("react.memo"),Lo=Symbol.for("react.lazy"),Do=Symbol.for("react.activity"),Ro=Symbol.for("react.memo_cache_sentinel"),jo=Symbol.iterator,Po=Symbol.for("react.client.reference"),Io=Array.isArray,$o=yo.U,Bo=mo.V,Ho={pending:!1,data:null,method:null,action:null},No=[],Uo=-1,zo=s(null),Vo=s(null),Wo=s(null),Ko=s(null),Xo=Object.prototype.hasOwnProperty,qo=vo.unstable_scheduleCallback,Go=vo.unstable_cancelCallback,Yo=vo.unstable_shouldYield,Jo=vo.unstable_requestPaint,Qo=vo.unstable_now,Zo=vo.unstable_getCurrentPriorityLevel,ea=vo.unstable_ImmediatePriority,na=vo.unstable_UserBlockingPriority,ta=vo.unstable_NormalPriority,ra=vo.unstable_LowPriority,la=vo.unstable_IdlePriority,ua=vo.log,ia=vo.unstable_setDisableYieldValue,oa=null,aa=null,ca=Math.clz32?Math.clz32:function(e){return 0==(e>>>=0)?32:31-(sa(e)/fa|0)|0},sa=Math.log,fa=Math.LN2,da=256,pa=4194304,ha=Math.random().toString(36).slice(2),va="__reactFiber$"+ha,ya="__reactProps$"+ha,ma="__reactContainer$"+ha,ba="__reactEvents$"+ha,wa="__reactListeners$"+ha,ka="__reactHandles$"+ha,ga="__reactResources$"+ha,Ea="__reactMarker$"+ha,Sa=new Set,xa={},Ca=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ta={},_a={},Oa=!1,Ma=/[\n"\\]/g,Fa=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")),Aa=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),La=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,Da=null,Ra=null,ja=null,Pa=!1,Ia=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),$a=!1
if(Ia)try{var Ba={}
Object.defineProperty(Ba,"passive",{get:function(){$a=!0}}),window.addEventListener("test",Ba,Ba),window.removeEventListener("test",Ba,Ba)}catch(Bd){$a=!1}var Ha,Na,Ua,za=null,Va=null,Wa=null,Ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xa=Se(Ka),qa=bo({},Ka,{view:0,detail:0}),Ga=Se(qa),Ya=bo({},qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ce,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ua&&(Ua&&"mousemove"===e.type?(Ha=e.screenX-Ua.screenX,Na=e.screenY-Ua.screenY):Na=Ha=0,Ua=e),Ha)},movementY:function(e){return"movementY"in e?e.movementY:Na}}),Ja=Se(Ya),Qa=Se(bo({},Ya,{dataTransfer:0})),Za=Se(bo({},qa,{relatedTarget:0})),ec=Se(bo({},Ka,{animationName:0,elapsedTime:0,pseudoElement:0})),nc=Se(bo({},Ka,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),tc=Se(bo({},Ka,{data:0})),rc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},ic=Se(bo({},qa,{key:function(e){if(e.key){var n=rc[e.key]||e.key
if("Unidentified"!==n)return n}return"keypress"===e.type?13===(e=ke(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?lc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ce,charCode:function(e){return"keypress"===e.type?ke(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?ke(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),oc=Se(bo({},Ya,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),ac=Se(bo({},qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ce})),cc=Se(bo({},Ka,{propertyName:0,elapsedTime:0,pseudoElement:0})),sc=Se(bo({},Ya,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),fc=Se(bo({},Ka,{newState:0,oldState:0})),dc=[9,13,27,32],pc=Ia&&"CompositionEvent"in window,hc=null
Ia&&"documentMode"in document&&(hc=document.documentMode)
var vc=Ia&&"TextEvent"in window&&!hc,yc=Ia&&(!pc||hc&&8<hc&&11>=hc),mc=String.fromCharCode(32),bc=!1,wc=!1,kc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},gc=null,Ec=null,Sc=!1
if(Ia){var xc
if(Ia){var Cc="oninput"in document
if(!Cc){var Tc=document.createElement("div")
Tc.setAttribute("oninput","return;"),Cc="function"==typeof Tc.oninput}xc=Cc}else xc=!1
Sc=xc&&(!document.documentMode||9<document.documentMode)}var _c="function"==typeof Object.is?Object.is:function(e,n){return e===n&&(0!==e||1/e==1/n)||e!=e&&n!=n},Oc=Ia&&"documentMode"in document&&11>=document.documentMode,Mc=null,Fc=null,Ac=null,Lc=!1,Dc={animationend:Ke("Animation","AnimationEnd"),animationiteration:Ke("Animation","AnimationIteration"),animationstart:Ke("Animation","AnimationStart"),transitionrun:Ke("Transition","TransitionRun"),transitionstart:Ke("Transition","TransitionStart"),transitioncancel:Ke("Transition","TransitionCancel"),transitionend:Ke("Transition","TransitionEnd")},Rc={},jc={}
Ia&&(jc=document.createElement("div").style,"AnimationEvent"in window||(delete Dc.animationend.animation,delete Dc.animationiteration.animation,delete Dc.animationstart.animation),"TransitionEvent"in window||delete Dc.transitionend.transition)
var Pc=Xe("animationend"),Ic=Xe("animationiteration"),$c=Xe("animationstart"),Bc=Xe("transitionrun"),Hc=Xe("transitionstart"),Nc=Xe("transitioncancel"),Uc=Xe("transitionend"),zc=new Map,Vc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ")
Vc.push("scrollEnd")
var Wc=new WeakMap,Kc=[],Xc=0,qc=0,Gc={},Yc=[],Jc=0,Qc=null,Zc=0,es=[],ns=0,ts=null,rs=1,ls="",us=null,is=null,os=!1,as=null,cs=!1,ss=Error(e(519)),fs=s(null),ds=null,ps=null,hs="undefined"!=typeof AbortController?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(n,t){e.push(t)}}
this.abort=function(){n.aborted=!0,e.forEach(function(e){return e()})}},vs=vo.unstable_scheduleCallback,ys=vo.unstable_NormalPriority,ms={$$typeof:_o,Consumer:null,Provider:null,i:null,W:null,K:0},bs=null,ws=0,ks=0,gs=null,Es=$o.S
$o.S=function(e,n){"object"==typeof n&&null!==n&&"function"==typeof n.then&&function(e,n){if(null===bs){var t=bs=[]
ws=0,ks=Wu(),gs={status:"pending",value:void 0,then:function(e){t.push(e)}}}return ws++,n.then(jn,jn),n}(0,n),null!==Es&&Es(e,n)}
for(var Ss=s(null),xs=Error(e(460)),Cs=Error(e(474)),Ts=Error(e(542)),_s={then:function(){}},Os=null,Ms=!1,Fs=!1,As=s(null),Ls=s(0),Ds=0,Rs=null,js=null,Ps=null,Is=!1,$s=!1,Bs=!1,Hs=0,Ns=0,Us=null,zs=0,Vs={readContext:Fn,use:vt,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useLayoutEffect:rt,useInsertionEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useSyncExternalStore:rt,useId:rt,useHostTransitionStatus:rt,useFormState:rt,useActionState:rt,useOptimistic:rt,useMemoCache:rt,useCacheRefresh:rt},Ws={readContext:Fn,use:vt,useCallback:function(e,n){return dt().memoizedState=[e,void 0===n?null:n],e},useContext:Fn,useEffect:Wt,useImperativeHandle:function(e,n,t){t=null!=t?t.concat([e]):null,zt(4194308,4,Gt.bind(null,n,e),t)},useLayoutEffect:function(e,n){return zt(4194308,4,e,n)},useInsertionEffect:function(e,n){zt(4,2,e,n)},useMemo:function(e,n){var t=dt()
n=void 0===n?null:n
var r=e()
if(Bs){k(!0)
try{e()}finally{k(!1)}}return t.memoizedState=[r,n],r},useReducer:function(e,n,t){var r=dt()
if(void 0!==t){var l=t(n)
if(Bs){k(!0)
try{t(n)}finally{k(!1)}}}else l=n
return r.memoizedState=r.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},r.queue=e,e=e.dispatch=fr.bind(null,Rs,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},dt().memoizedState=e},useState:function(e){var n=(e=_t(e)).queue,t=dr.bind(null,Rs,n)
return n.dispatch=t,[e.memoizedState,t]},useDebugValue:Jt,useDeferredValue:function(e,n){return er(dt(),e,n)},useTransition:function(){var e=_t(!1)
return e=tr.bind(null,Rs,e.queue,!0,!1),dt().memoizedState=e,[!1,e]},useSyncExternalStore:function(n,t,r){var l=Rs,u=dt()
if(os){if(void 0===r)throw Error(e(407))
r=r()}else{if(r=t(),null===wf)throw Error(e(349))
124&gf||Et(l,t,r)}u.memoizedState=r
var i={value:r,getSnapshot:t}
return u.queue=i,Wt(xt.bind(null,l,i,n),[n]),l.flags|=2048,Nt(9,{destroy:void 0,resource:void 0},St.bind(null,l,i,r,t),null),r},useId:function(){var e=dt(),n=wf.identifierPrefix
if(os){var t=ls
n="\xab"+n+"R"+(t=(rs&~(1<<32-ca(rs)-1)).toString(32)+t),0<(t=Hs++)&&(n+="H"+t.toString(32)),n+="\xbb"}else n="\xab"+n+"r"+(t=zs++).toString(32)+"\xbb"
return e.memoizedState=n},useHostTransitionStatus:or,useFormState:Pt,useActionState:Pt,useOptimistic:function(e){var n=dt()
n.memoizedState=n.baseState=e
var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return n.queue=t,n=hr.bind(null,Rs,!0,t),t.dispatch=n,[e,n]},useMemoCache:yt,useCacheRefresh:function(){return dt().memoizedState=sr.bind(null,Rs)}},Ks={readContext:Fn,use:vt,useCallback:Qt,useContext:Fn,useEffect:Kt,useImperativeHandle:Yt,useInsertionEffect:Xt,useLayoutEffect:qt,useMemo:Zt,useReducer:bt,useRef:Ut,useState:function(){return bt(mt)},useDebugValue:Jt,useDeferredValue:function(e,n){return nr(pt(),js.memoizedState,e,n)},useTransition:function(){var e=bt(mt)[0],n=pt().memoizedState
return["boolean"==typeof e?e:ht(e),n]},useSyncExternalStore:gt,useId:ar,useHostTransitionStatus:or,useFormState:It,useActionState:It,useOptimistic:function(e,n){return Ot(pt(),0,e,n)},useMemoCache:yt,useCacheRefresh:cr},Xs={readContext:Fn,use:vt,useCallback:Qt,useContext:Fn,useEffect:Kt,useImperativeHandle:Yt,useInsertionEffect:Xt,useLayoutEffect:qt,useMemo:Zt,useReducer:kt,useRef:Ut,useState:function(){return kt(mt)},useDebugValue:Jt,useDeferredValue:function(e,n){var t=pt()
return null===js?er(t,e,n):nr(t,js.memoizedState,e,n)},useTransition:function(){var e=kt(mt)[0],n=pt().memoizedState
return["boolean"==typeof e?e:ht(e),n]},useSyncExternalStore:gt,useId:ar,useHostTransitionStatus:or,useFormState:Ht,useActionState:Ht,useOptimistic:function(e,n){var t=pt()
return null!==js?Ot(t,0,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:yt,useCacheRefresh:cr},qs=null,Gs=0,Ys=Er(!0),Js=Er(!1),Qs=s(null),Zs=null,ef=s(0),nf={enqueueSetState:function(e,n,t){e=e._
var r=tu(),l=Kn(r)
l.payload=n,null!=t&&(l.callback=t),null!==(n=Xn(e,l,r))&&(lu(n,0,r),qn(n,e,r))},enqueueReplaceState:function(e,n,t){e=e._
var r=tu(),l=Kn(r)
l.tag=1,l.payload=n,null!=t&&(l.callback=t),null!==(n=Xn(e,l,r))&&(lu(n,0,r),qn(n,e,r))},enqueueForceUpdate:function(e,n){e=e._
var t=tu(),r=Kn(t)
r.tag=2,null!=n&&(r.callback=n),null!==(n=Xn(e,r,t))&&(lu(n,0,t),qn(n,e,t))}},tf="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e})
if(!window.dispatchEvent(n))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",e),void 0
void 0},rf=Error(e(461)),lf=!1,uf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},of=!1,af=!1,cf=!1,sf="function"==typeof WeakSet?WeakSet:Set,ff=null,df=null,pf=!1,hf=null,vf=8192,yf={getCacheForType:function(e){var n=Fn(ms),t=n.data.get(e)
return void 0===t&&(t=e(),n.data.set(e,t)),t}},mf="function"==typeof WeakMap?WeakMap:Map,bf=0,wf=null,kf=null,gf=0,Ef=0,Sf=null,xf=!1,Cf=!1,Tf=!1,_f=0,Of=0,Mf=0,Ff=0,Af=0,Lf=0,Df=0,Rf=null,jf=null,Pf=!1,If=0,$f=1/0,Bf=null,Hf=null,Nf=0,Uf=null,zf=null,Vf=0,Wf=0,Kf=null,Xf=null,qf=0,Gf=null,Yf=null,Jf=null,Qf=!1,Zf=!1,ed=!1,nd=0,td=0;td<Vc.length;td++){var rd=Vc[td]
qe(rd.toLowerCase(),"on"+(rd[0].toUpperCase()+rd.slice(1)))}qe(Pc,"onAnimationEnd"),qe(Ic,"onAnimationIteration"),qe($c,"onAnimationStart"),qe("dblclick","onDoubleClick"),qe("focusin","onFocus"),qe("focusout","onBlur"),qe(Bc,"onTransitionRun"),qe(Hc,"onTransitionStart"),qe(Nc,"onTransitionCancel"),qe(Uc,"onTransitionEnd"),V("onMouseEnter",["mouseout","mouseover"]),V("onMouseLeave",["mouseout","mouseover"]),V("onPointerEnter",["pointerout","pointerover"]),V("onPointerLeave",["pointerout","pointerover"]),z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),z("onBeforeInput",["compositionend","keypress","textInput","paste"]),z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "))
var ld="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ud=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ld)),id="_reactListening"+Math.random().toString(36).slice(2),od=/\r\n?/g,ad=/\u0000|\uFFFD/g,cd=null,sd=null,fd=null,dd="function"==typeof setTimeout?setTimeout:void 0,pd="function"==typeof clearTimeout?clearTimeout:void 0,hd="function"==typeof Promise?Promise:void 0,vd="function"==typeof queueMicrotask?queueMicrotask:void 0!==hd?function(e){return hd.resolve(null).then(e).catch(hi)}:dd,yd=null,md=new Map,bd=new Set,wd=Bo.d
Bo.d={f:function(){var e=wd.f(),n=cu()
return e||n},r:function(e){var n=B(e)
null!==n&&5===n.tag&&"form"===n.type?ir(n):wd.r(e)},D:function(e){wd.D(e),xi("dns-prefetch",e,null)},C:function(e,n){wd.C(e,n),xi("preconnect",e,n)},L:function(e,n,t){wd.L(e,n,t)
var r=kd
if(r&&e&&n){var l='link[rel="preload"][as="'+re(n)+'"]'
"image"===n&&t&&t.imageSrcSet?(l+='[imagesrcset="'+re(t.imageSrcSet)+'"]',"string"==typeof t.imageSizes&&(l+='[imagesizes="'+re(t.imageSizes)+'"]')):l+='[href="'+re(e)+'"]'
var u=l
switch(n){case"style":u=Ti(e)
break
case"script":u=Mi(e)}md.has(u)||(e=bo({rel:"preload",href:"image"===n&&t&&t.imageSrcSet?void 0:e,as:n},t),md.set(u,e),null!==r.querySelector(l)||"style"===n&&r.querySelector(_i(u))||"script"===n&&r.querySelector(Fi(u))||(ci(n=r.createElement("link"),"link",e),U(n),r.head.appendChild(n)))}},m:function(e,n){wd.m(e,n)
var t=kd
if(t&&e){var r=n&&"string"==typeof n.as?n.as:"script",l='link[rel="modulepreload"][as="'+re(r)+'"][href="'+re(e)+'"]',u=l
switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Mi(e)}if(!md.has(u)&&(e=bo({rel:"modulepreload",href:e},n),md.set(u,e),null===t.querySelector(l))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(Fi(u)))return}ci(r=t.createElement("link"),"link",e),U(r),t.head.appendChild(r)}}},X:function(e,n){wd.X(e,n)
var t=kd
if(t&&e){var r=N(t).hoistableScripts,l=Mi(e),u=r.get(l)
u||((u=t.querySelector(Fi(l)))||(e=bo({src:e,async:!0},n),(n=md.get(l))&&Ri(e,n),U(u=t.createElement("script")),ci(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}},S:function(e,n,t){wd.S(e,n,t)
var r=kd
if(r&&e){var l=N(r).hoistableStyles,u=Ti(e)
n=n||"default"
var i=l.get(u)
if(!i){var o={loading:0,preload:null}
if(i=r.querySelector(_i(u)))o.loading=5
else{e=bo({rel:"stylesheet",href:e,"data-precedence":n},t),(t=md.get(u))&&Di(e,t)
var a=i=r.createElement("link")
U(a),ci(a,"link",e),a.$=new Promise(function(e,n){a.onload=e,a.onerror=n}),a.addEventListener("load",function(){o.loading|=1}),a.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Li(i,n,r)}i={type:"stylesheet",instance:i,count:1,state:o},l.set(u,i)}}},M:function(e,n){wd.M(e,n)
var t=kd
if(t&&e){var r=N(t).hoistableScripts,l=Mi(e),u=r.get(l)
u||((u=t.querySelector(Fi(l)))||(e=bo({src:e,async:!0,type:"module"},n),(n=md.get(l))&&Ri(e,n),U(u=t.createElement("script")),ci(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(l,u))}}}
var kd="undefined"==typeof document?null:document,gd=null,Ed=null,Sd=null,xd={$$typeof:_o,Provider:null,Consumer:null,i:Ho,W:Ho,K:0},Cd=!0,Td=null,_d=!1,Od=null,Md=null,Fd=null,Ad=new Map,Ld=new Map,Dd=[],Rd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "),jd=null
fo.prototype.render=so.prototype.render=function(n){var t=this.N
if(null===t)throw Error(e(409))
Wi(t.current,tu(),n,t,null,null)},fo.prototype.unmount=so.prototype.unmount=function(){var e=this.N
if(null!==e){this.N=null
var n=e.containerInfo
Wi(e.current,2,null,e,null,null),cu(),n[ma]=null}},fo.prototype.unstable_scheduleHydration=function(e){if(e){var n=P()
e={blockedOn:null,target:e,priority:n}
for(var t=0;t<Dd.length&&0!==n&&n<Dd[t].priority;t++);Dd.splice(t,0,e),0===t&&ro(e)}}
var Pd=yo.version
if("19.1.1"!==Pd)throw Error(e(527,Pd,"19.1.1"))
Bo.findDOMNode=function(n){var r=n._
if(void 0===r){if("function"==typeof n.render)throw Error(e(188))
throw n=Object.keys(n).join(","),Error(e(268,n))}return n=function(n){var r=n.alternate
if(!r){if(null===(r=t(n)))throw Error(e(188))
return r!==n?null:n}for(var u=n,i=r;;){var o=u.return
if(null===o)break
var a=o.alternate
if(null===a){if(null!==(i=o.return)){u=i
continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===u)return l(o),n
if(a===i)return l(o),r
a=a.sibling}throw Error(e(188))}if(u.return!==i.return)u=o,i=a
else{for(var c=!1,s=o.child;s;){if(s===u){c=!0,u=o,i=a
break}if(s===i){c=!0,i=o,u=a
break}s=s.sibling}if(!c){for(s=a.child;s;){if(s===u){c=!0,u=a,i=o
break}if(s===i){c=!0,i=a,u=o
break}s=s.sibling}if(!c)throw Error(e(189))}}if(u.alternate!==i)throw Error(e(190))}if(3!==u.tag)throw Error(e(188))
return u.stateNode.current===u?n:r}(r),null===(n=null!==n?u(n):null)?null:n.stateNode}
var Id={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:$o,reconcilerVersion:"19.1.1"}
if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var $d=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(!$d.isDisabled&&$d.supportsFiber)try{oa=$d.inject(Id),aa=$d}catch(Hd){}}return _.createRoot=function(t,r){if(!n(t))throw Error(e(299))
var l=!1,u="",i=Lr,o=Dr,a=Rr
return null!=r&&(!0===r.unstable_strictMode&&(l=!0),void 0!==r.identifierPrefix&&(u=r.identifierPrefix),void 0!==r.onUncaughtError&&(i=r.onUncaughtError),void 0!==r.onCaughtError&&(o=r.onCaughtError),void 0!==r.onRecoverableError&&(a=r.onRecoverableError),void 0!==r.unstable_transitionCallbacks&&r.unstable_transitionCallbacks),r=zi(t,1,!1,null,0,l,u,i,o,a,0,null),t[ma]=r.current,Ju(t),new so(r)},_.hydrateRoot=function(t,r,l){if(!n(t))throw Error(e(299))
var u=!1,i="",o=Lr,a=Dr,c=Rr,s=null
return null!=l&&(!0===l.unstable_strictMode&&(u=!0),void 0!==l.identifierPrefix&&(i=l.identifierPrefix),void 0!==l.onUncaughtError&&(o=l.onUncaughtError),void 0!==l.onCaughtError&&(a=l.onCaughtError),void 0!==l.onRecoverableError&&(c=l.onRecoverableError),void 0!==l.unstable_transitionCallbacks&&l.unstable_transitionCallbacks,void 0!==l.formState&&(s=l.formState)),(r=zi(t,1,!0,r,0,u,i,o,a,c,0,s)).context=Vi(null),l=r.current,(i=Kn(u=R(u=tu()))).callback=null,Xn(l,i,u),l=u,r.current.lanes=l,A(r,l),$u(r),t[ma]=r.current,Ju(t),new fo(r)},_.version="19.1.1",_}async function n(e,n={}){const t=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const n=document.cookie.split(";")
for(let t of n){const[e,n]=t.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(n)}return null}(),r={...n,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...t&&{"X-CSRF-Token":t},...n.headers}}
if(r.body&&"string"==typeof r.body)try{const e=JSON.parse(r.body)
e.q=Date.now(),r.body=JSON.stringify(e)}catch(l){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const n=await fetch(e,r)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(n=>!e.headers.get(n)).length>0,0}(n),n}catch(u){throw void 0,u}}var t,r,l=Object.defineProperty,u=(e,n,t)=>((e,n,t)=>n in e?l(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t)(e,"symbol"!=typeof n?n+"":n,t)
import{r as i,a as o,g as a,b as c,e as s,i as f,s as d}from"./vendor-quiY1y6M.js"
!function(){function e(e){if(e.ep)return
e.ep=!0
const n=function(e){const n={}
return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?n.credentials="include":"anonymous"===e.crossOrigin?n.credentials="omit":n.credentials="same-origin",n}(e)
fetch(e.href,n)}const n=document.createElement("link").relList
if(!(n&&n.supports&&n.supports("modulepreload"))){for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n)
new MutationObserver(n=>{for(const t of n)if("childList"===t.type)for(const n of t.addedNodes)"LINK"===n.tagName&&"modulepreload"===n.rel&&e(n)}).observe(document,{childList:!0,subtree:!0})}}()
const p={},h=function(e,n,t){function r(e){const n=new Event("vite:preloadError",{cancelable:!0})
if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e}let l=Promise.resolve()
if(n&&n.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))}
document.getElementsByTagName("link")
const t=document.querySelector("meta[property=csp-nonce]"),r=t?.nonce||t?.getAttribute("nonce")
l=e(n.map(e=>{if((e=function(e){return"/"+e}(e))in p)return
p[e]=!0
const n=e.endsWith(".css"),t=n?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${e}"]${t}`))return
const l=document.createElement("link")
return l.rel=n?"stylesheet":"modulepreload",n||(l.as="script"),l.crossOrigin="",l.href=e,r&&l.setAttribute("nonce",r),document.head.appendChild(l),n?new Promise((n,t)=>{l.addEventListener("load",n),l.addEventListener("error",()=>t(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return l.then(n=>{for(const e of n||[])"rejected"===e.status&&r(e.reason)
return e().catch(r)})}
var v,y,m,b,w,k,g,E,S={exports:{}},x={},C=function(){return y||(y=1,S.exports=function(){function e(e,t,r){var l=null
if(void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),"key"in t)for(var u in r={},t)"key"!==u&&(r[u]=t[u])
else r=t
return t=r.ref,{$$typeof:n,type:e,key:l,ref:void 0!==t?t:null,props:r}}if(v)return x
v=1
var n=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment")
return x.Fragment=t,x.jsx=e,x.jsxs=e,x}()),S.exports}(),T={exports:{}},_={},O={exports:{}},M={},F=function(){return k||(k=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),T.exports=e()),T.exports}()
const A=a(function(){function e(u,i){if(u===i)return!0
if(u&&i&&"object"==typeof u&&"object"==typeof i){if(u.constructor!==i.constructor)return!1
var o,a,c,s
if(Array.isArray(u)){if((o=u.length)!=i.length)return!1
for(a=o;0!==a--;)if(!e(u[a],i[a]))return!1
return!0}if(t&&u instanceof Map&&i instanceof Map){if(u.size!==i.size)return!1
for(s=u.entries();!(a=s.next()).done;)if(!i.has(a.value[0]))return!1
for(s=u.entries();!(a=s.next()).done;)if(!e(a.value[1],i.get(a.value[0])))return!1
return!0}if(r&&u instanceof Set&&i instanceof Set){if(u.size!==i.size)return!1
for(s=u.entries();!(a=s.next()).done;)if(!i.has(a.value[0]))return!1
return!0}if(l&&ArrayBuffer.isView(u)&&ArrayBuffer.isView(i)){if((o=u.length)!=i.length)return!1
for(a=o;0!==a--;)if(u[a]!==i[a])return!1
return!0}if(u.constructor===RegExp)return u.source===i.source&&u.flags===i.flags
if(u.valueOf!==Object.prototype.valueOf&&"function"==typeof u.valueOf&&"function"==typeof i.valueOf)return u.valueOf()===i.valueOf()
if(u.toString!==Object.prototype.toString&&"function"==typeof u.toString&&"function"==typeof i.toString)return u.toString()===i.toString()
if((o=(c=Object.keys(u)).length)!==Object.keys(i).length)return!1
for(a=o;0!==a--;)if(!Object.prototype.hasOwnProperty.call(i,c[a]))return!1
if(n&&u instanceof Element)return!1
for(a=o;0!==a--;)if(("_owner"!==c[a]&&"__v"!==c[a]&&"__o"!==c[a]||!u.$$typeof)&&!e(u[c[a]],i[c[a]]))return!1
return!0}return u!=u&&i!=i}if(E)return g
E=1
var n="undefined"!=typeof Element,t="function"==typeof Map,r="function"==typeof Set,l="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return g=function(n,t){try{return e(n,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var L=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(L||{}),D={rel:["amphtml","canonical","alternate"]},R={type:["application/ld+json"]},j={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},P=Object.values(L),I={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},$=Object.entries(I).reduce((e,[n,t])=>(e[t]=n,e),{}),B="data-rh",H=(e,n)=>{for(let t=e.length-1;t>=0;t-=1){const r=e[t]
if(Object.prototype.hasOwnProperty.call(r,n))return r[n]}return null},N=e=>{let n=H(e,"title")
const t=H(e,"titleTemplate")
if(Array.isArray(n)&&(n=n.join("")),t&&n)return t.replace(/%s/g,()=>n)
const r=H(e,"defaultTitle")
return n||r||void 0},U=e=>H(e,"onChangeClientState")||(()=>{}),z=(e,n)=>n.filter(n=>void 0!==n[e]).map(n=>n[e]).reduce((e,n)=>({...e,...n}),{}),V=(e,n)=>n.filter(e=>void 0!==e.base).map(e=>e.base).reverse().reduce((n,t)=>{if(!n.length){const r=Object.keys(t)
for(let l=0;l<r.length;l+=1){const u=r[l].toLowerCase()
if(-1!==e.indexOf(u)&&t[u])return n.concat(t)}}return n},[]),W=(e,n,t)=>{const r={}
return t.filter(n=>!!Array.isArray(n[e])||(void 0!==n[e]&&(n[e],console&&"function"==typeof console.warn,0),!1)).map(n=>n[e]).reverse().reduce((e,t)=>{const l={}
t.filter(e=>{let t
const u=Object.keys(e)
for(let r=0;r<u.length;r+=1){const l=u[r],i=l.toLowerCase();-1===n.indexOf(i)||"rel"===t&&"canonical"===e[t].toLowerCase()||"rel"===i&&"stylesheet"===e[i].toLowerCase()||(t=i),-1===n.indexOf(l)||"innerHTML"!==l&&"cssText"!==l&&"itemprop"!==l||(t=l)}if(!t||!e[t])return!1
const i=e[t].toLowerCase()
return r[t]||(r[t]={}),l[t]||(l[t]={}),!r[t][i]&&(l[t][i]=!0,!0)}).reverse().forEach(n=>e.push(n))
const u=Object.keys(l)
for(let n=0;n<u.length;n+=1){const e=u[n],t={...r[e],...l[e]}
r[e]=t}return e},[]).reverse()},K=(e,n)=>{if(Array.isArray(e)&&e.length)for(let t=0;t<e.length;t+=1)if(e[t][n])return!0
return!1},X=e=>Array.isArray(e)?e.join(""):e,q=(e,n)=>Array.isArray(e)?e.reduce((e,t)=>(((e,n)=>{const t=Object.keys(e)
for(let r=0;r<t.length;r+=1)if(n[t[r]]&&n[t[r]].includes(e[t[r]]))return!0
return!1})(t,n)?e.priority.push(t):e.default.push(t),e),{priority:[],default:[]}):{default:e,priority:[]},G=(e,n)=>({...e,[n]:void 0}),Y=["noscript","script","style"],J=(e,n=!0)=>!1===n?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Q=e=>Object.keys(e).reduce((n,t)=>{const r=void 0!==e[t]?`${t}="${e[t]}"`:`${t}`
return n?`${n} ${r}`:r},""),Z=(e,n={})=>Object.keys(e).reduce((n,t)=>(n[I[t]||t]=e[t],n),n),ee=(e,n)=>n.map((n,t)=>{const r={key:t,[B]:!0}
return Object.keys(n).forEach(e=>{const t=I[e]||e
if("innerHTML"===t||"cssText"===t){const e=n.innerHTML||n.cssText
r.dangerouslySetInnerHTML={B:e}}else r[t]=n[e]}),s.createElement(e,r)}),ne=(e,n,t=!0)=>{switch(e){case"title":return{toComponent:()=>((e,n,t)=>{const r=Z(t,{key:n,[B]:!0})
return[s.createElement("title",r,n)]})(0,n.title,n.titleAttributes),toString:()=>((e,n,t,r)=>{const l=Q(t),u=X(n)
return l?`<${e} ${B}="true" ${l}>${J(u,r)}</${e}>`:`<${e} ${B}="true">${J(u,r)}</${e}>`})(e,n.title,n.titleAttributes,t)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Z(n),toString:()=>Q(n)}
default:return{toComponent:()=>ee(e,n),toString:()=>((e,n,t=!0)=>n.reduce((n,r)=>{const l=r,u=Object.keys(l).filter(e=>!("innerHTML"===e||"cssText"===e)).reduce((e,n)=>{const r=void 0===l[n]?n:`${n}="${J(l[n],t)}"`
return e?`${e} ${r}`:r},""),i=l.innerHTML||l.cssText||"",o=-1===Y.indexOf(e)
return`${n}<${e} ${B}="true" ${u}${o?"/>":`>${i}</${e}>`}`},""))(e,n,t)}}},te=e=>{const{baseTag:n,bodyAttributes:t,encode:r=!0,htmlAttributes:l,noscriptTags:u,styleTags:i,title:o="",titleAttributes:a,prioritizeSeoTags:c}=e
let{linkTags:s,metaTags:f,scriptTags:d}=e,p={toComponent:()=>{},toString:()=>""}
return c&&({priorityMethods:p,linkTags:s,metaTags:f,scriptTags:d}=(({metaTags:e,linkTags:n,scriptTags:t,encode:r})=>{const l=q(e,j),u=q(n,D),i=q(t,R)
return{priorityMethods:{toComponent:()=>[...ee("meta",l.priority),...ee("link",u.priority),...ee("script",i.priority)],toString:()=>`${ne("meta",l.priority,r)} ${ne("link",u.priority,r)} ${ne("script",i.priority,r)}`},metaTags:l.default,linkTags:u.default,scriptTags:i.default}})(e)),{priority:p,base:ne("base",n,r),bodyAttributes:ne("bodyAttributes",t,r),htmlAttributes:ne("htmlAttributes",l,r),link:ne("link",s,r),meta:ne("meta",f,r),noscript:ne("noscript",u,r),script:ne("script",d,r),style:ne("style",i,r),title:ne("title",{title:o,titleAttributes:a},r)}},re=[],le=!("undefined"==typeof window||!window.document||!window.document.createElement),ue=class{constructor(e,n){u(this,"instances",[]),u(this,"canUseDOM",le),u(this,"context"),u(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?re:this.instances,add:e=>{(this.canUseDOM?re:this.instances).push(e)},remove:e=>{const n=(this.canUseDOM?re:this.instances).indexOf(e);(this.canUseDOM?re:this.instances).splice(n,1)}}}),this.context=e,this.canUseDOM=n||!1,n||(e.helmet=te({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ie=s.createContext({}),oe=(t=class extends c.Component{constructor(e){super(e),u(this,"helmetData"),this.helmetData=new ue(this.props.context||{},t.canUseDOM)}render(){return s.createElement(ie.Provider,{value:this.helmetData.value},this.props.children)}},u(t,"canUseDOM",le),t),ae=(e,n)=>{const t=document.head||document.querySelector("head"),r=t.querySelectorAll(`${e}[${B}]`),l=[].slice.call(r),u=[]
let i
return n&&n.length&&n.forEach(n=>{const t=document.createElement(e)
for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))if("innerHTML"===e)t.innerHTML=n.innerHTML
else if("cssText"===e)t.styleSheet?t.styleSheet.cssText=n.cssText:t.appendChild(document.createTextNode(n.cssText))
else{const r=e,l=void 0===n[r]?"":n[r]
t.setAttribute(e,l)}t.setAttribute(B,"true"),l.some((e,n)=>(i=n,t.isEqualNode(e)))?l.splice(i,1):u.push(t)}),l.forEach(e=>e.parentNode?.removeChild(e)),u.forEach(e=>t.appendChild(e)),{oldTags:l,newTags:u}},ce=(e,n)=>{const t=document.getElementsByTagName(e)[0]
if(!t)return
const r=t.getAttribute(B),l=r?r.split(","):[],u=[...l],i=Object.keys(n)
for(const o of i){const e=n[o]||""
t.getAttribute(o)!==e&&t.setAttribute(o,e),-1===l.indexOf(o)&&l.push(o)
const r=u.indexOf(o);-1!==r&&u.splice(r,1)}for(let o=u.length-1;o>=0;o-=1)t.removeAttribute(u[o])
l.length===u.length?t.removeAttribute(B):t.getAttribute(B)!==i.join(",")&&t.setAttribute(B,i.join(","))},se=(e,n)=>{const{baseTag:t,bodyAttributes:r,htmlAttributes:l,linkTags:u,metaTags:i,noscriptTags:o,onChangeClientState:a,scriptTags:c,styleTags:s,title:f,titleAttributes:d}=e
ce("body",r),ce("html",l),((e,n)=>{void 0!==e&&document.title!==e&&(document.title=X(e)),ce("title",n)})(f,d)
const p={baseTag:ae("base",t),linkTags:ae("link",u),metaTags:ae("meta",i),noscriptTags:ae("noscript",o),scriptTags:ae("script",c),styleTags:ae("style",s)},h={},v={}
Object.keys(p).forEach(e=>{const{newTags:n,oldTags:t}=p[e]
n.length&&(h[e]=n),t.length&&(v[e]=p[e].oldTags)}),n&&n(),a(e,h,v)},fe=null,de=class extends c.Component{constructor(){super(...arguments),u(this,"rendered",!1)}shouldComponentUpdate(e){return!d(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context
e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:n}=this.props.context
let t=null
const r=(l=e.get().map(e=>{const n={...e.props}
return delete n.context,n}),{baseTag:V(["href"],l),bodyAttributes:z("bodyAttributes",l),defer:H(l,"defer"),encode:H(l,"encodeSpecialCharacters"),htmlAttributes:z("htmlAttributes",l),linkTags:W("link",["rel","href"],l),metaTags:W("meta",["name","charset","http-equiv","property","itemprop"],l),noscriptTags:W("noscript",["innerHTML"],l),onChangeClientState:U(l),scriptTags:W("script",["src","innerHTML"],l),styleTags:W("style",["cssText"],l),title:N(l),titleAttributes:z("titleAttributes",l),prioritizeSeoTags:K(l,"prioritizeSeoTags")})
var l,u
oe.canUseDOM?(u=r,fe&&cancelAnimationFrame(fe),void(u.defer?fe=requestAnimationFrame(()=>{se(u,()=>{fe=null})}):(se(u),fe=null))):te&&(t=te(r)),n(t)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:e}=this.props.context
e.add(this),this.emitChange()}render(){return this.init(),null}},pe=(r=class extends c.Component{shouldComponentUpdate(e){return!A(G(this.props,"helmetData"),G(e,"helmetData"))}mapNestedChildrenToProps(e,n){if(!n)return null
switch(e.type){case"script":case"noscript":return{innerHTML:n}
case"style":return{cssText:n}
default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,n,t,r){return{...n,[e.type]:[...n[e.type]||[],{...t,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,n,t,r){switch(e.type){case"title":return{...n,[e.type]:r,titleAttributes:{...t}}
case"body":return{...n,bodyAttributes:{...t}}
case"html":return{...n,htmlAttributes:{...t}}
default:return{...n,[e.type]:{...t}}}}mapArrayTypeChildrenToProps(e,n){let t={...n}
return Object.keys(e).forEach(n=>{t={...t,[n]:e[n]}}),t}warnOnInvalidChildren(e,n){return f(P.some(n=>e.type===n),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${P.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),f(!n||"string"==typeof n||Array.isArray(n)&&!n.some(e=>"string"!=typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,n){let t={}
return s.Children.forEach(e,e=>{if(!e||!e.props)return
const{children:r,...l}=e.props,u=Object.keys(l).reduce((e,n)=>(e[$[n]||n]=l[n],e),{})
let{type:i}=e
switch("symbol"==typeof i?i=i.toString():this.warnOnInvalidChildren(e,r),i){case"Symbol(react.fragment)":n=this.mapChildrenToProps(r,n)
break
case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(e,t,u,r)
break
default:n=this.mapObjectTypeChildren(e,n,u,r)}}),this.mapArrayTypeChildrenToProps(t,n)}render(){const{children:e,...n}=this.props
let t={...n},{helmetData:r}=n
return e&&(t=this.mapChildrenToProps(e,t)),!r||r instanceof ue||(r=new ue(r.context,!0),delete t.helmetData),r?s.createElement(de,{...t,context:r.value}):s.createElement(ie.Consumer,null,e=>s.createElement(de,{...t,context:e}))}},u(r,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),r)
class he{constructor(e={}){this.failureThreshold=e.failureThreshold||5,this.resetTimeout=e.resetTimeout||6e4,this.monitoringPeriod=e.monitoringPeriod||1e4,this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests=new Map}async execute(e,n=null,t=null){if(n&&this.pendingRequests.has(n))return void 0,this.pendingRequests.get(n)
const r=this.G(e,t)
return n&&(this.pendingRequests.set(n,r),r.finally(()=>{setTimeout(()=>{this.pendingRequests.delete(n)},1e3)})),r}async G(e,n){if("OPEN"===this.state){if(!(Date.now()-this.lastFailureTime>this.resetTimeout)){if(void 0,n)return n
throw new Error("Circuit breaker is OPEN")}this.state="HALF_OPEN",this.successCount=0}try{const n=await e()
return this.Y(),n}catch(t){if(this.J(),n)return void 0,n
throw t}}Y(){this.failureCount=0,"HALF_OPEN"===this.state&&(this.successCount++,this.successCount>=3&&(this.state="CLOSED"))}J(){this.failureCount++,this.lastFailureTime=Date.now(),this.failureCount>=this.failureThreshold&&(this.state="OPEN")}getState(){return{state:this.state,failureCount:this.failureCount,lastFailureTime:this.lastFailureTime,successCount:this.successCount}}reset(){this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests.clear()}}new he({failureThreshold:3,resetTimeout:3e4,monitoringPeriod:5e3})
const ve=new he({failureThreshold:5,resetTimeout:6e4,monitoringPeriod:1e4}),ye=new he({failureThreshold:10,resetTimeout:3e4,monitoringPeriod:5e3}),me=new class{constructor(){const e="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname
this.config={baseURL:e?"/api":"https://admin.b2b.click/api",timeout:1e4,retries:3,retryDelay:1e3,enableFallbacks:!0,enableCircuitBreaker:!0},this.fallbackCache=new Map}async fetchWithRetry(e,n={},t=1){const r=e.startsWith("http")?e:`${this.config.baseURL}${e}`,l={...n,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n.headers},credentials:"include"},u=new AbortController,i=setTimeout(()=>u.abort(),this.config.timeout)
l.signal=u.signal
try{void 0
const e=await fetch(r,l)
return clearTimeout(i),e}catch(o){if(clearTimeout(i),"AbortError"===o.name||"TypeError"===o.name&&o.message.includes("Failed to fetch"),t<this.config.retries){const r=this.config.retryDelay*t
return void 0,await new Promise(e=>setTimeout(e,r)),this.fetchWithRetry(e,n,t+1)}throw o}}async get(e){const n=`get:${e}`,t=e=>e.includes("/settings/seo")?{success:!0,settings:{default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",maintenance_mode:!1}}:e.includes("/maintenance-status")?{success:!0,maintenance_mode:!1,maintenance_message:"Service temporarily unavailable"}:null,r=async()=>{if(this.config.enableFallbacks&&this.fallbackCache.has(n)){const e=this.fallbackCache.get(n)
if(e.expires>Date.now())return void 0,{success:!0,data:e.data,cached:!0,fallback:!0}
this.fallbackCache.delete(n)}const t=await this.fetchWithRetry(e)
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
const r=await t.json()
return this.config.enableFallbacks&&r.success&&this.fallbackCache.set(n,{data:r,expires:Date.now()+3e5}),{success:!0,data:r}}
if(this.config.enableCircuitBreaker)try{return await ve.execute(r,n,t(e))}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}try{return await r()}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}}async post(e,n){try{const t=await this.fetchWithRetry(e,{method:"POST",body:JSON.stringify(n)})
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
return{success:!0,data:await t.json()}}catch(t){return void 0,{success:!1,error:t.message}}}async getSEOSettings(){return this.get("/settings/seo")}async getMaintenanceStatus(){return this.get("/settings/maintenance-status")}async trackAnalytics(e){const n=async()=>{if(navigator.sendBeacon){const n=`${this.config.baseURL}/analytics/track`,t=new Blob([JSON.stringify(e)],{type:"application/json"})
if(!navigator.sendBeacon(n,t))throw new Error("Beacon failed to send")
void 0}else await this.post("/analytics/track",e)}
try{this.config.enableCircuitBreaker?await ye.execute(n):await n()}catch(t){void 0}}clearCache(){this.fallbackCache.clear()}getCacheStats(){return{size:this.fallbackCache.size,keys:Array.from(this.fallbackCache.keys())}}},be={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"https://b2b.click/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let we=null,ke=0
const ge=async()=>{try{const e=Date.now(),n=e-ke
if(we&&n<36e4)return void 0,n>288e3&&setTimeout(()=>async function(){try{return we=null,ke=0,await ge()}catch(e){we=oldCache,ke=oldTimestamp}}(),100),we
void 0
const t=await me.getSEOSettings()
if(!t.success)throw new Error(t.error||"Failed to fetch SEO settings")
const r=t.data
if(r.success&&r.settings)return we={...be,...r.settings},ke=e,we
throw void 0,new Error("Invalid API response format")}catch(e){return we?(void 0,we):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,be)}},Ee=async()=>{try{void 0
const e=await me.getMaintenanceStatus()
if(!e.success)return void 0,{maintenance_mode:!1}
const n=e.data
return void 0!==n.success?(void 0,{maintenance_mode:n.maintenance_mode||!1,maintenance_message:n.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:n.estimated_downtime||"2 hours",contact_information:n.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},Se="seo_settings_cache",xe=()=>{try{localStorage.removeItem(Se)}catch(e){void 0}},Ce=e=>{try{const n={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},t=JSON.stringify(n)
t.length>5e4&&(void 0,xe()),localStorage.setItem(Se,t)}catch(n){if("QuotaExceededError"===n.name){void 0,xe()
try{const n={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(Se,JSON.stringify(n))}catch(t){void 0}}else void 0}},Te=c.createContext(),_e=({children:e})=>{const[n,t]=c.useState(be),[r,l]=c.useState({maintenance_mode:!1}),[u,i]=c.useState(!0),[o,a]=c.useState(null),[s,f]=c.useState({isMobile:!1,deviceType:"unknown"}),d=async(e=!0)=>{try{if(i(!0),e){const e=(()=>{try{const e=localStorage.getItem(Se)
if(e){const{data:n,timestamp:t}=JSON.parse(e)
if(Date.now()-t<3e4)return void 0,n}}catch(e){void 0,xe()}return null})()
if(e)return t(e),i(!1),p(),void 0}await p()}catch(n){void 0,t(be)}finally{i(!1)}},p=async()=>{try{void 0
const[e,n]=await Promise.all([ge(),Ee()])
t(e),l(n),a(new Date),Ce(e)}catch(e){void 0}}
c.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n),r=e<=768||t
let l="desktop"
r&&(l=e<=480?"mobile":"tablet"),f({isMobile:r,deviceType:l})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),c.useEffect(()=>{d()},[]),c.useEffect(()=>{const e=setInterval(()=>{void 0,p()},3e5)
return()=>clearInterval(e)},[])
const h=c.useMemo(()=>n?(void 0,((e,n={})=>{const t={...be,...e},{isMobile:r=!1}=n,l=(u=t.default_og_image)&&""!==u.trim()?u.startsWith("http")?u:u.startsWith("/uploads/")||u.startsWith("/static/uploads/")?`https://admin.b2b.click${u}`:u.startsWith("/images/")||u.startsWith("/static/images/")?`https://b2b.click${u}`:`https://b2b.click${u.startsWith("/")?u:"/"+u}`:"https://b2b.click/images/og-image.png"
var u
const i=[{name:"description",content:t.default_description},{name:"keywords",content:t.default_keywords},{name:"author",content:t.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:t.default_title},{property:"og:description",content:t.default_description},{property:"og:image",content:l},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${t.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:t.twitter_handle},{name:"twitter:creator",content:t.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:t.default_title},{name:"twitter:description",content:t.default_description},{name:"twitter:image",content:l},{name:"twitter:image:alt",content:`${t.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&i.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:t.default_title,meta:i,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(n,s)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[n,s]),v={seoSettings:n,maintenanceStatus:r,metaTags:h,isLoading:u,lastUpdated:o,deviceInfo:s,refreshSEOSettings:async()=>{void 0,await d(!1)},updateSEOSetting:(e,n)=>{t(t=>{const r={...t,[e]:n}
return Ce(r),r}),a(new Date)},clearCache:()=>{xe()},loadSEOSettings:d,isMaintenanceMode:()=>r.maintenance_mode}
return C.jsx(Te.Provider,{value:v,children:C.jsxs(oe,{children:[C.jsxs(pe,{children:[C.jsx("title",{children:h.title}),h.meta.map((e,n)=>e.name?C.jsx("meta",{name:e.name,content:e.content},`meta-${n}`):e.property?C.jsx("meta",{property:e.property,content:e.content},`meta-${n}`):null),h.link.map((e,n)=>C.jsx("link",{...e},`link-${n}`))]}),e]})})},Oe=()=>{const e=c.useContext(Te)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},Me=()=>(Oe(),c.useState(!0),null),Fe=()=>{const{maintenanceStatus:e}=Oe(),[n,t]=c.useState(!1)
if(c.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
t(e<=768||r)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:n?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:n?"20px":"40px",overflow:"hidden"},l={fontSize:n?"64px":"96px",marginBottom:n?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},u={fontSize:n?"28px":"48px",marginBottom:n?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},i={fontSize:n?"16px":"20px",marginBottom:n?"24px":"32px",maxWidth:n?"320px":"600px",lineHeight:1.6,opacity:.9},o={fontSize:n?"14px":"18px",marginBottom:n?"20px":"24px",opacity:.8,padding:n?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:n?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},a={fontSize:n?"12px":"16px",opacity:.6,marginTop:n?"20px":"32px"}
return C.jsxs("div",{style:r,children:[C.jsx("div",{style:l,children:"\ud83d\udd27"}),C.jsx("h1",{style:u,children:e.maintenance_title||"Site Under Maintenance"}),C.jsx("p",{style:i,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&C.jsxs("div",{style:o,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&C.jsxs("p",{style:a,children:["Questions? Contact us: ",e.contact_information]}),C.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:n?"80px":"120px",height:n?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),C.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:n?"60px":"100px",height:n?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})}
class Ae extends s.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,n){void 0,this.setState({error:e,errorInfo:n}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:e.message,error_stack:e.stack,component_stack:n.componentStack}})}render(){return this.state.hasError?C.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[C.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),C.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),C.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}const Le=({message:e="Loading...",showMessage:n=!1,fullScreen:t=!0,minDisplayTime:r=800})=>{const[l,u]=c.useState(!0),[i,o]=c.useState(!0),[a,s]=c.useState(!1)
c.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches
o(!e)},[]),c.useEffect(()=>{const e=setTimeout(()=>{s(!0),setTimeout(()=>{u(!1)},300)},r)
return()=>clearTimeout(e)},[r]),c.useEffect(()=>{if(r>0){const e=setTimeout(()=>{u(!0)},r)
return()=>clearTimeout(e)}},[r])
const f={position:t?"fixed":"absolute",top:0,left:0,width:"100%",height:t?"100vh":"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:9999,fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:a?0:1,transition:i?"opacity 0.3s ease-out, transform 0.3s ease-out":"none",transform:a?"scale(0.95)":"scale(1)",pointerEvents:a?"none":"auto"},d={position:"relative",marginBottom:"0",transform:i&&!a?"scale(1)":"scale(0.9)",animation:i&&!a?"brandedLoaderPulse 2.5s ease-in-out infinite":"none",transition:i?"transform 0.3s ease-out":"none"},p={width:"120px",height:"auto",transition:i?"transform 0.3s ease":"none"},h={color:"rgba(255, 255, 255, 0.9)",fontSize:"16px",fontWeight:"500",letterSpacing:"0.5px",textAlign:"center",marginTop:"8px",opacity:n?1:0,transition:i?"opacity 0.3s ease":"none"},v={display:"inline-block",animation:i?"brandedLoaderDots 1.5s ease-in-out infinite":"none"}
return c.useEffect(()=>{if(!i)return
const e=document.createElement("style")
return e.textContent="\n      @keyframes brandedLoaderPulse {\n        0%, 100% {\n          transform: scale(1);\n        }\n        50% {\n          transform: scale(1.03);\n        }\n      }\n\n      @keyframes brandedLoaderDots {\n        0%, 20% {\n          opacity: 0;\n          transform: translateY(2px);\n        }\n        50% {\n          opacity: 1;\n          transform: translateY(0);\n        }\n        80%, 100% {\n          opacity: 0;\n          transform: translateY(-2px);\n        }\n      }\n\n      @keyframes brandedLoaderFadeIn {\n        0% {\n          opacity: 0;\n          transform: scale(0.9) translateY(10px);\n        }\n        100% {\n          opacity: 1;\n          transform: scale(1) translateY(0);\n        }\n      }\n\n      .branded-loader-container {\n        animation: brandedLoaderFadeIn 0.4s ease-out;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    ",document.head.appendChild(e),()=>{document.head.contains(e)&&document.head.removeChild(e)}},[i]),C.jsxs("div",{style:f,className:i?"branded-loader-container":"",children:[C.jsx("div",{style:d,children:C.jsx("img",{src:"/images/SMALL_B2BLOGO_WHITE.svg",alt:"Bounce2Bounce Logo",style:{...p,width:"120px",height:"auto",maxWidth:"100%"},"aria-label":"Bounce2Bounce Logo"})}),n&&C.jsxs("div",{style:h,children:[e,C.jsx("span",{style:v,children:"..."})]})]})},De=c.lazy(()=>h(()=>import("./HomePage-CL15ClAe.js").then(e=>e.H),__vite__mapDeps([0,1,2,3,4,5,6]))),Re=c.lazy(()=>h(()=>import("./AdminLoginFigma-4q8MRIYU.js"),__vite__mapDeps([7,1,5])));(async()=>{const[{initializeAnalytics:e},{initializeCleanup:n},{initializeMobileOptimizations:t}]=await Promise.all([h(()=>import("./beacon-r5K5QvzQ.js"),[]),h(()=>import("./cleanup-CAYISNkO.js"),[]),h(()=>import("./mobileOptimization-DxuCIEdC.js"),[])])
n(),t(),e({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1}),h(()=>import("./memoryMonitor-B-PApq0Q.js"),[])})()
const je=c.lazy(()=>h(()=>import("./AboutPage-BkSd-xI9.js").then(e=>e.A),__vite__mapDeps([8,1,2]))),Pe=c.lazy(()=>h(()=>import("./ContactPage-BKJ6R-Qb.js"),__vite__mapDeps([9,1,2]))),Ie=c.lazy(()=>h(()=>import("./NotFoundPage-Z3g9JszE.js"),__vite__mapDeps([10,1,11]))),$e=()=>C.jsx(Le,{fullScreen:!0,minDisplayTime:500,showMessage:!1}),Be=()=>{const[e,n]=c.useState(!1),[t,r]=c.useState(window.location.pathname)
c.useEffect(()=>{void 0},[t])
const l=c.useCallback(e=>{n(!0),setTimeout(()=>{window.history.pushState({},"",e),r(e),n(!1)},150)},[])
return c.useEffect(()=>(window.navigateWithTransition=l,()=>{delete window.navigateWithTransition}),[l]),c.useEffect(()=>{const e=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)},[]),C.jsxs(_e,{children:[C.jsx(Fe,{}),(()=>{if(e)return C.jsx($e,{})
switch(t){case"/":return C.jsx(c.Suspense,{fallback:C.jsx($e,{}),children:C.jsx(De,{})})
case"/about":return C.jsx(c.Suspense,{fallback:C.jsx($e,{}),children:C.jsx(je,{})})
case"/contact":return C.jsx(c.Suspense,{fallback:C.jsx($e,{}),children:C.jsx(Pe,{})})
case"/admin/login":return C.jsx(c.Suspense,{fallback:C.jsx($e,{}),children:C.jsx(Re,{})})
default:return C.jsx(c.Suspense,{fallback:C.jsx($e,{}),children:C.jsx(Ie,{})})}})(),C.jsx(Me,{})]})},He=document.getElementById("root")
if(He)try{F.createRoot(He).render(C.jsx(Ae,{children:C.jsx(Be,{})}))}catch(Ne){void 0}void document.addEventListener("securitypolicyviolation",e=>{const t={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&n("/api/security/csp-violation",{method:"POST",body:JSON.stringify(t)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const e=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const n=window.parent.location.origin
e.includes(n)||(void 0,window.top.location=window.location)}catch(Ne){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()}))
export{Le as B,h as _,C as j,n as s,Oe as u}
