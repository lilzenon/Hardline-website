const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FigmaMobile-Xr3IVbAT.js","assets/MobileDrawer-BNnXJQ9H.js"])))=>i.map(i=>d[i]);
function e(e){return e&&e.t&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(){function e(e,n,t){this.props=e,this.context=n,this.refs=E,this.updater=t||M}function n(){}function t(e,n,t){this.props=e,this.context=n,this.refs=E,this.updater=t||M}function r(e,n,t){var r,i={},o=null,l=null
if(null!=n)for(r in void 0!==n.ref&&(l=n.ref),void 0!==n.key&&(o=""+n.key),n)F.call(n,r)&&!j.hasOwnProperty(r)&&(i[r]=n[r])
var a=arguments.length-2
if(1===a)i.children=t
else if(1<a){for(var u=Array(a),s=0;s<a;s++)u[s]=arguments[s+2]
i.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===i[r]&&(i[r]=a[r])
return{$$typeof:c,type:e,key:o,ref:l,props:i,i:D.current}}function i(e){return"object"==typeof e&&null!==e&&e.$$typeof===c}function o(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"}
return"$"+e.replace(/[=:]/g,function(e){return n[e]})}(""+e.key):n.toString(36)}function l(e,n,t,r,a){var u=typeof e
"undefined"!==u&&"boolean"!==u||(e=null)
var s=!1
if(null===e)s=!0
else switch(u){case"string":case"number":s=!0
break
case"object":switch(e.$$typeof){case c:case f:s=!0}}if(s)return a=a(s=e),e=""===r?"."+o(s,0):r,T(a)?(t="",null!=e&&(t=e.replace(A,"$&/")+"/"),l(a,n,t,"",function(e){return e})):null!=a&&(i(a)&&(a=function(e,n){return{$$typeof:c,type:e.type,key:n,ref:e.ref,props:e.props,i:e.i}}(a,t+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(A,"$&/")+"/")+e)),n.push(a)),1
if(s=0,r=""===r?".":r+":",T(e))for(var d=0;d<e.length;d++){var p=r+o(u=e[d],d)
s+=l(u,n,t,p,a)}else if(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=k&&e[k]||e["@@iterator"])?e:null}(e),"function"==typeof p)for(e=p.call(e),d=0;!(u=e.next()).done;)s+=l(u=u.value,n,t,p=r+o(u,d++),a)
else if("object"===u)throw n=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")
return s}function a(e,n,t){if(null==e)return e
var r=[],i=0
return l(e,r,"","",function(e){return n.call(t,e,i++)}),r}function u(e){if(-1===e.o){var n=e.l;(n=n()).then(function(n){0!==e.o&&-1!==e.o||(e.o=1,e.l=n)},function(n){0!==e.o&&-1!==e.o||(e.o=2,e.l=n)}),-1===e.o&&(e.o=0,e.l=n)}if(1===e.o)return e.l.default
throw e.l}function s(){throw Error("act(...) is not supported in production builds of React.")}if(m)return I
m=1
var c=Symbol.for("react.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),v=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),k=Symbol.iterator,M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,E={}
e.prototype.isReactComponent={},e.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.")
this.updater.enqueueSetState(this,e,n,"setState")},e.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},n.prototype=e.prototype
var C=t.prototype=new n
C.constructor=t,S(C,e.prototype),C.isPureReactComponent=!0
var T=Array.isArray,F=Object.prototype.hasOwnProperty,D={current:null},j={key:!0,ref:!0,u:!0,p:!0},A=/\/+/g,$={current:null},z={transition:null},H={ReactCurrentDispatcher:$,ReactCurrentBatchConfig:z,ReactCurrentOwner:D}
return I.Children={map:a,forEach:function(e,n,t){a(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0
return a(e,function(){n++}),n},toArray:function(e){return a(e,function(e){return e})||[]},only:function(e){if(!i(e))throw Error("React.Children.only expected to receive a single React element child.")
return e}},I.Component=e,I.Fragment=d,I.Profiler=h,I.PureComponent=t,I.StrictMode=p,I.Suspense=w,I.h=H,I.act=s,I.cloneElement=function(e,n,t){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".")
var r=S({},e.props),i=e.key,o=e.ref,l=e.i
if(null!=n){if(void 0!==n.ref&&(o=n.ref,l=D.current),void 0!==n.key&&(i=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps
for(u in n)F.call(n,u)&&!j.hasOwnProperty(u)&&(r[u]=void 0===n[u]&&void 0!==a?a[u]:n[u])}var u=arguments.length-2
if(1===u)r.children=t
else if(1<u){a=Array(u)
for(var s=0;s<u;s++)a[s]=arguments[s+2]
r.children=a}return{$$typeof:c,type:e.type,key:i,ref:o,props:r,i:l}},I.createContext=function(e){return(e={$$typeof:v,m:e,v:e,k:0,Provider:null,Consumer:null,I:null,M:null}).Provider={$$typeof:g,S:e},e.Consumer=e},I.createElement=r,I.createFactory=function(e){var n=r.bind(null,e)
return n.type=e,n},I.createRef=function(){return{current:null}},I.forwardRef=function(e){return{$$typeof:b,render:e}},I.isValidElement=i,I.lazy=function(e){return{$$typeof:x,C:{o:-1,l:e},T:u}},I.memo=function(e,n){return{$$typeof:y,type:e,compare:void 0===n?null:n}},I.startTransition=function(e){var n=z.transition
z.transition={}
try{e()}finally{z.transition=n}},I.unstable_act=s,I.useCallback=function(e,n){return $.current.useCallback(e,n)},I.useContext=function(e){return $.current.useContext(e)},I.useDebugValue=function(){},I.useDeferredValue=function(e){return $.current.useDeferredValue(e)},I.useEffect=function(e,n){return $.current.useEffect(e,n)},I.useId=function(){return $.current.useId()},I.useImperativeHandle=function(e,n,t){return $.current.useImperativeHandle(e,n,t)},I.useInsertionEffect=function(e,n){return $.current.useInsertionEffect(e,n)},I.useLayoutEffect=function(e,n){return $.current.useLayoutEffect(e,n)},I.useMemo=function(e,n){return $.current.useMemo(e,n)},I.useReducer=function(e,n,t){return $.current.useReducer(e,n,t)},I.useRef=function(e){return $.current.useRef(e)},I.useState=function(e){return $.current.useState(e)},I.useSyncExternalStore=function(e,n,t){return $.current.useSyncExternalStore(e,n,t)},I.useTransition=function(){return $.current.useTransition()},I.version="18.3.1",I}function t(){return v||(v=1,k.exports=n()),k.exports}function r(){function e(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])
return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(e,n){r(e,n),r(e+"Capture",n)}function r(e,n){for(mo[e]=n,e=0;e<n.length;e++)go.add(n[e])}function i(e,n,t,r,i,o,l){this.acceptsBooleans=2===n||3===n||4===n,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=l}function o(e){return e[1].toUpperCase()}function l(e,n,t,r){var i=ko.hasOwnProperty(n)?ko[n]:null;(null!==i?0!==i.type:r||!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&(function(e,n,t,r){if(null==n||function(e,n,t,r){if(null!==t&&0===t.type)return!1
switch(typeof n){case"function":case"symbol":return!0
case"boolean":return!r&&(null!==t?!t.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e)
default:return!1}}(e,n,t,r))return!0
if(r)return!1
if(null!==t)switch(t.type){case 3:return!n
case 4:return!1===n
case 5:return isNaN(n)
case 6:return isNaN(n)||1>n}return!1}(n,t,i,r)&&(t=null),r||null===i?function(e){return!!bo.call(xo,e)||!bo.call(yo,e)&&(wo.test(e)?xo[e]=!0:(yo[e]=!0,!1))}(n)&&(null===t?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=null===t?3!==i.type&&"":t:(n=i.attributeName,r=i.attributeNamespace,null===t?e.removeAttribute(n):(t=3===(i=i.type)||4===i&&!0===t?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}function a(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Oo&&e[Oo]||e["@@iterator"])?e:null}function u(e){if(void 0===Mo)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/)
Mo=n&&n[1]||""}return"\n"+Mo+e}function s(e,n){if(!e||Zo)return""
Zo=!0
var t=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"==typeof c.stack){for(var i=c.stack.split("\n"),o=r.stack.split("\n"),l=i.length-1,a=o.length-1;1<=l&&0<=a&&i[l]!==o[a];)a--
for(;1<=l&&0<=a;l--,a--)if(i[l]!==o[a]){if(1!==l||1!==a)do{if(l--,0>--a||i[l]!==o[a]){var s="\n"+i[l].replace(" at new "," at ")
return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=l&&0<=a)
break}}}finally{Zo=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?u(e):""}function c(e){switch(e.tag){case 5:return u(e.type)
case 16:return u("Lazy")
case 13:return u("Suspense")
case 19:return u("SuspenseList")
case 0:case 2:case 15:return s(e.type,!1)
case 11:return s(e.type.render,!1)
case 1:return s(e.type,!0)
default:return""}}function f(e){if(null==e)return null
if("function"==typeof e)return e.displayName||e.name||null
if("string"==typeof e)return e
switch(e){case Do:return"Fragment"
case Fo:return"Portal"
case Ao:return"Profiler"
case jo:return"StrictMode"
case Po:return"Suspense"
case Lo:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case zo:return(e.displayName||"Context")+".Consumer"
case $o:return(e.S.displayName||"Context")+".Provider"
case Ho:var n=e.render
return(e=e.displayName)||(e=""!==(e=n.displayName||n.name||"")?"ForwardRef("+e+")":"ForwardRef"),e
case _o:return null!==(n=e.displayName||null)?n:f(e.type)||"Memo"
case Wo:n=e.C,e=e.T
try{return f(e(n))}catch(t){}}return null}function d(e){var n=e.type
switch(e.tag){case 24:return"Cache"
case 9:return(n.displayName||"Context")+".Consumer"
case 10:return(n.S.displayName||"Context")+".Provider"
case 18:return"DehydratedFragment"
case 11:return e=(e=n.render).displayName||e.name||"",n.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef")
case 7:return"Fragment"
case 5:return n
case 4:return"Portal"
case 3:return"Root"
case 6:return"Text"
case 16:return f(n)
case 8:return n===jo?"StrictMode":"Mode"
case 22:return"Offscreen"
case 12:return"Profiler"
case 21:return"Scope"
case 13:return"Suspense"
case 19:return"SuspenseList"
case 25:return"TracingMarker"
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof n)return n.displayName||n.name||null
if("string"==typeof n)return n}return null}function p(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e
default:return""}}function h(e){var n=e.type
return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===n||"radio"===n)}function g(e){e.F||(e.F=function(e){var n=h(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n]
if(!e.hasOwnProperty(n)&&void 0!==t&&"function"==typeof t.get&&"function"==typeof t.set){var i=t.get,o=t.set
return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e.F=null,delete e[n]}}}}(e))}function m(e){if(!e)return!1
var n=e.F
if(!n)return!0
var t=n.getValue(),r=""
return e&&(r=h(e)?e.checked?"true":"false":e.value),(e=r)!==t&&(n.setValue(e),!0)}function v(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null
try{return e.activeElement||e.body}catch(n){return e.body}}function b(e,n){var t=n.checked
return Ro({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=t?t:e.D.initialChecked})}function w(e,n){var t=null==n.defaultValue?"":n.defaultValue,r=null!=n.checked?n.checked:n.defaultChecked
t=p(null!=n.value?n.value:t),e.D={initialChecked:r,initialValue:t,controlled:"checkbox"===n.type||"radio"===n.type?null!=n.checked:null!=n.value}}function y(e,n){null!=(n=n.checked)&&l(e,"checked",n,!1)}function x(e,n){y(e,n)
var t=p(n.value),r=n.type
if(null!=t)"number"===r?(0===t&&""===e.value||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t)
else if("submit"===r||"reset"===r)return e.removeAttribute("value"),void 0
n.hasOwnProperty("value")?I(e,n.type,t):n.hasOwnProperty("defaultValue")&&I(e,n.type,p(n.defaultValue)),null==n.checked&&null!=n.defaultChecked&&(e.defaultChecked=!!n.defaultChecked)}function k(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type
if(!("submit"!==r&&"reset"!==r||void 0!==n.value&&null!==n.value))return
n=""+e.D.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}""!==(t=e.name)&&(e.name=""),e.defaultChecked=!!e.D.initialChecked,""!==t&&(e.name=t)}function I(e,n,t){"number"===n&&v(e.ownerDocument)===e||(null==t?e.defaultValue=""+e.D.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}function M(e,n,t,r){if(e=e.options,n){n={}
for(var i=0;i<t.length;i++)n["$"+t[i]]=!0
for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&r&&(e[t].defaultSelected=!0)}else{for(t=""+p(t),n=null,i=0;i<e.length;i++){if(e[i].value===t)return e[i].selected=!0,r&&(e[i].defaultSelected=!0),void 0
null!==n||e[i].disabled||(n=e[i])}null!==n&&(n.selected=!0)}}function S(n,t){if(null!=t.dangerouslySetInnerHTML)throw Error(e(91))
return Ro({},t,{value:void 0,defaultValue:void 0,children:""+n.D.initialValue})}function E(n,t){var r=t.value
if(null==r){if(r=t.children,t=t.defaultValue,null!=r){if(null!=t)throw Error(e(92))
if(Bo(r)){if(1<r.length)throw Error(e(93))
r=r[0]}t=r}null==t&&(t=""),r=t}n.D={initialValue:p(r)}}function D(e,n){var t=p(n.value),r=p(n.defaultValue)
null!=t&&((t=""+t)!==e.value&&(e.value=t),null==n.defaultValue&&e.defaultValue!==t&&(e.defaultValue=t)),null!=r&&(e.defaultValue=""+r)}function j(e){var n=e.textContent
n===e.D.initialValue&&""!==n&&null!==n&&(e.value=n)}function A(e){switch(e){case"svg":return"http://www.w3.org/2000/svg"
case"math":return"http://www.w3.org/1998/Math/MathML"
default:return"http://www.w3.org/1999/xhtml"}}function $(e,n){return null==e||"http://www.w3.org/1999/xhtml"===e?A(n):"http://www.w3.org/2000/svg"===e&&"foreignObject"===n?"http://www.w3.org/1999/xhtml":e}function L(e,n){if(n){var t=e.firstChild
if(t&&t===e.lastChild&&3===t.nodeType)return t.nodeValue=n,void 0}e.textContent=n}function _(e,n,t){return null==n||"boolean"==typeof n||""===n?"":t||"number"!=typeof n||0===n||Go.hasOwnProperty(e)&&Go[e]?(""+n).trim():n+"px"}function W(e,n){for(var t in e=e.style,n)if(n.hasOwnProperty(t)){var r=0===t.indexOf("--"),i=_(t,n[t],r)
"float"===t&&(t="cssFloat"),r?e.setProperty(t,i):e[t]=i}}function N(n,t){if(t){if(Yo[n]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(e(137,n))
if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(e(60))
if("object"!=typeof t.dangerouslySetInnerHTML||!("j"in t.dangerouslySetInnerHTML))throw Error(e(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(e(62))}}function O(e,n){if(-1===e.indexOf("-"))return"string"==typeof n.is
switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1
default:return!0}}function R(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function Z(n){if(n=In(n)){if("function"!=typeof Ko)throw Error(e(280))
var t=n.stateNode
t&&(t=Sn(t),Ko(n.stateNode,n.type,t))}}function B(e){Qo?Xo?Xo.push(e):Xo=[e]:Qo=e}function U(){if(Qo){var e=Qo,n=Xo
if(Xo=Qo=null,Z(e),n)for(e=0;e<n.length;e++)Z(n[e])}}function G(e,n){return e(n)}function V(){}function Y(e,n,t){if(qo)return e(n,t)
qo=!0
try{return G(e,n,t)}finally{qo=!1,(null!==Qo||null!==Xo)&&(V(),U())}}function J(n,t){var r=n.stateNode
if(null===r)return null
var i=Sn(r)
if(null===i)return null
r=i[t]
e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(i=!("button"===(n=n.type)||"input"===n||"select"===n||"textarea"===n)),n=!i
break e
default:n=!1}if(n)return null
if(r&&"function"!=typeof r)throw Error(e(231,t,typeof r))
return r}function K(e,n,t,r,i,o,l,a,u){var s=Array.prototype.slice.call(arguments,3)
try{n.apply(t,s)}catch(c){this.onError(c)}}function Q(e,n,t,r,i,o,l,a,u){cl=!1,fl=null,K.apply(hl,arguments)}function X(e){var n=e,t=e
if(e.alternate)for(;n.return;)n=n.return
else{e=n
do{!!(4098&(n=e).flags)&&(t=n.return),e=n.return}while(e)}return 3===n.tag?t:null}function q(e){if(13===e.tag){var n=e.memoizedState
if(null===n&&null!==(e=e.alternate)&&(n=e.memoizedState),null!==n)return n.dehydrated}return null}function ee(n){if(X(n)!==n)throw Error(e(188))}function ne(n){return null!==(n=function(n){var t=n.alternate
if(!t){if(null===(t=X(n)))throw Error(e(188))
return t!==n?null:n}for(var r=n,i=t;;){var o=r.return
if(null===o)break
var l=o.alternate
if(null===l){if(null!==(i=o.return)){r=i
continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===r)return ee(o),n
if(l===i)return ee(o),t
l=l.sibling}throw Error(e(188))}if(r.return!==i.return)r=o,i=l
else{for(var a=!1,u=o.child;u;){if(u===r){a=!0,r=o,i=l
break}if(u===i){a=!0,i=o,r=l
break}u=u.sibling}if(!a){for(u=l.child;u;){if(u===r){a=!0,r=l,i=o
break}if(u===i){a=!0,i=l,r=o
break}u=u.sibling}if(!a)throw Error(e(189))}}if(r.alternate!==i)throw Error(e(190))}if(3!==r.tag)throw Error(e(188))
return r.stateNode.current===r?n:t}(n))?te(n):null}function te(e){if(5===e.tag||6===e.tag)return e
for(e=e.child;null!==e;){var n=te(e)
if(null!==n)return n
e=e.sibling}return null}function re(e){switch(e&-e){case 1:return 1
case 2:return 2
case 4:return 4
case 8:return 8
case 16:return 16
case 32:return 32
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e
case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e
case 134217728:return 134217728
case 268435456:return 268435456
case 536870912:return 536870912
case 1073741824:return 1073741824
default:return e}}function ie(e,n){var t=e.pendingLanes
if(0===t)return 0
var r=0,i=e.suspendedLanes,o=e.pingedLanes,l=268435455&t
if(0!==l){var a=l&~i
0!==a?r=re(a):0!==(o&=l)&&(r=re(o))}else 0!==(l=t&~i)?r=re(l):0!==o&&(r=re(o))
if(0===r)return 0
if(0!==n&&n!==r&&0===(n&i)&&((i=r&-r)>=(o=n&-n)||16===i&&4194240&o))return n
if(4&r&&(r|=16&t),0!==(n=e.entangledLanes))for(e=e.entanglements,n&=r;0<n;)i=1<<(t=31-Tl(n)),r|=e[t],n&=~i
return r}function oe(e,n){switch(e){case 1:case 2:case 4:return n+250
case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3
default:return-1}}function le(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function ae(){var e=jl
return!(4194240&(jl<<=1))&&(jl=64),e}function ue(e){for(var n=[],t=0;31>t;t++)n.push(e)
return n}function se(e,n,t){e.pendingLanes|=n,536870912!==n&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[n=31-Tl(n)]=t}function ce(e,n){var t=e.entangledLanes|=n
for(e=e.entanglements;t;){var r=31-Tl(t),i=1<<r
i&n|e[r]&n&&(e[r]|=n),t&=~i}}function fe(e){return 1<(e&=-e)?4<e?268435455&e?16:536870912:4:1}function de(e,n){switch(e){case"focusin":case"focusout":Pl=null
break
case"dragenter":case"dragleave":Ll=null
break
case"mouseover":case"mouseout":_l=null
break
case"pointerover":case"pointerout":Wl.delete(n.pointerId)
break
case"gotpointercapture":case"lostpointercapture":Nl.delete(n.pointerId)}}function pe(e,n,t,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==n&&null!==(n=In(n))&&rl(n),e):(e.eventSystemFlags|=r,n=e.targetContainers,null!==i&&-1===n.indexOf(i)&&n.push(i),e)}function he(e){var n=kn(e.target)
if(null!==n){var t=X(n)
if(null!==t)if(13===(n=t.tag)){if(null!==(n=q(t)))return e.blockedOn=n,ll(e.priority,function(){il(t)}),void 0}else if(3===n&&t.stateNode.current.memoizedState.isDehydrated)return e.blockedOn=3===t.tag?t.stateNode.containerInfo:null,void 0}e.blockedOn=null}function ge(e){if(null!==e.blockedOn)return!1
for(var n=e.targetContainers;0<n.length;){var t=Ie(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent)
if(null!==t)return null!==(n=In(t))&&rl(n),e.blockedOn=t,!1
var r=new(t=e.nativeEvent).constructor(t.type,t)
Jo=r,t.target.dispatchEvent(r),Jo=null,n.shift()}return!0}function me(e,n,t){ge(e)&&t.delete(n)}function ve(){zl=!1,null!==Pl&&ge(Pl)&&(Pl=null),null!==Ll&&ge(Ll)&&(Ll=null),null!==_l&&ge(_l)&&(_l=null),Wl.forEach(me),Nl.forEach(me)}function be(e,n){e.blockedOn===n&&(e.blockedOn=null,zl||(zl=!0,ho.unstable_scheduleCallback(ho.unstable_NormalPriority,ve)))}function we(e){function n(n){return be(n,e)}if(0<Hl.length){be(Hl[0],e)
for(var t=1;t<Hl.length;t++){var r=Hl[t]
r.blockedOn===e&&(r.blockedOn=null)}}for(null!==Pl&&be(Pl,e),null!==Ll&&be(Ll,e),null!==_l&&be(_l,e),Wl.forEach(n),Nl.forEach(n),t=0;t<Ol.length;t++)(r=Ol[t]).blockedOn===e&&(r.blockedOn=null)
for(;0<Ol.length&&null===(t=Ol[0]).blockedOn;)he(t),null===t.blockedOn&&Ol.shift()}function ye(e,n,t,r){var i=$l,o=Zl.transition
Zl.transition=null
try{$l=1,ke(e,n,t,r)}finally{$l=i,Zl.transition=o}}function xe(e,n,t,r){var i=$l,o=Zl.transition
Zl.transition=null
try{$l=4,ke(e,n,t,r)}finally{$l=i,Zl.transition=o}}function ke(e,n,t,r){if(Bl){var i=Ie(e,n,t,r)
if(null===i)sn(e,n,r,Ul,t),de(e,r)
else if(function(e,n,t,r,i){switch(n){case"focusin":return Pl=pe(Pl,e,n,t,r,i),!0
case"dragenter":return Ll=pe(Ll,e,n,t,r,i),!0
case"mouseover":return _l=pe(_l,e,n,t,r,i),!0
case"pointerover":var o=i.pointerId
return Wl.set(o,pe(Wl.get(o)||null,e,n,t,r,i)),!0
case"gotpointercapture":return o=i.pointerId,Nl.set(o,pe(Nl.get(o)||null,e,n,t,r,i)),!0}return!1}(i,e,n,t,r))r.stopPropagation()
else if(de(e,r),4&n&&-1<Rl.indexOf(e)){for(;null!==i;){var o=In(i)
if(null!==o&&tl(o),null===(o=Ie(e,n,t,r))&&sn(e,n,r,Ul,t),o===i)break
i=o}null!==i&&r.stopPropagation()}else sn(e,n,r,null,t)}}function Ie(e,n,t,r){if(Ul=null,null!==(e=kn(e=R(r))))if(null===(n=X(e)))e=null
else if(13===(t=n.tag)){if(null!==(e=q(n)))return e
e=null}else if(3===t){if(n.stateNode.current.memoizedState.isDehydrated)return 3===n.tag?n.stateNode.containerInfo:null
e=null}else n!==e&&(e=null)
return Ul=e,null}function Me(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4
case"message":switch(yl()){case xl:return 1
case kl:return 4
case Il:case Ml:return 16
case Sl:return 536870912
default:return 16}default:return 16}}function Se(){if(Yl)return Yl
var e,n,t=Vl,r=t.length,i="value"in Gl?Gl.value:Gl.textContent,o=i.length
for(e=0;e<r&&t[e]===i[e];e++);var l=r-e
for(n=1;n<=l&&t[r-n]===i[o-n];n++);return Yl=i.slice(e,1<n?1-n:void 0)}function Ee(e){var n=e.keyCode
return"charCode"in e?0===(e=e.charCode)&&13===n&&(e=13):e=n,10===e&&(e=13),32<=e||13===e?e:0}function Ce(){return!0}function Te(){return!1}function Fe(e){function n(n,t,r,i,o){for(var l in this.$=n,this.H=r,this.type=t,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l])
return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?Ce:Te,this.isPropagationStopped=Te,this}return Ro(n.prototype,{preventDefault:function(){this.defaultPrevented=!0
var e=this.nativeEvent
e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Ce)},stopPropagation:function(){var e=this.nativeEvent
e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Ce)},persist:function(){},isPersistent:Ce}),n}function De(e){var n=this.nativeEvent
return n.getModifierState?n.getModifierState(e):!!(e=sa[e])&&!!n[e]}function je(){return De}function Ae(e,n){switch(e){case"keyup":return-1!==va.indexOf(n.keyCode)
case"keydown":return 229!==n.keyCode
case"keypress":case"mousedown":case"focusout":return!0
default:return!1}}function $e(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}function ze(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return"input"===n?!!Sa[e.type]:"textarea"===n}function He(e,n,t,r){B(r),0<(n=fn(n,"onChange")).length&&(t=new Kl("onChange","change",null,t,r),e.push({event:t,listeners:n}))}function Pe(e){rn(e,0)}function Le(e){if(m(Mn(e)))return e}function _e(e,n){if("change"===e)return n}function We(){Ea&&(Ea.detachEvent("onpropertychange",Ne),Ca=Ea=null)}function Ne(e){if("value"===e.propertyName&&Le(Ca)){var n=[]
He(n,Ca,e,R(e)),Y(Pe,n)}}function Oe(e,n,t){"focusin"===e?(We(),Ca=t,(Ea=n).attachEvent("onpropertychange",Ne)):"focusout"===e&&We()}function Re(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Le(Ca)}function Ze(e,n){if("click"===e)return Le(n)}function Be(e,n){if("input"===e||"change"===e)return Le(n)}function Ue(e,n){if(Aa(e,n))return!0
if("object"!=typeof e||null===e||"object"!=typeof n||null===n)return!1
var t=Object.keys(e),r=Object.keys(n)
if(t.length!==r.length)return!1
for(r=0;r<t.length;r++){var i=t[r]
if(!bo.call(n,i)||!Aa(e[i],n[i]))return!1}return!0}function Ge(e){for(;e&&e.firstChild;)e=e.firstChild
return e}function Ve(e,n){var t,r=Ge(e)
for(e=0;r;){if(3===r.nodeType){if(t=e+r.textContent.length,e<=n&&t>=n)return{node:r,offset:n-e}
e=t}e:{for(;r;){if(r.nextSibling){r=r.nextSibling
break e}r=r.parentNode}r=void 0}r=Ge(r)}}function Ye(e,n){return!(!e||!n)&&(e===n||(!e||3!==e.nodeType)&&(n&&3===n.nodeType?Ye(e,n.parentNode):"contains"in e?e.contains(n):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(n))))}function Je(){for(var e=window,n=v();n instanceof e.HTMLIFrameElement;){try{var t="string"==typeof n.contentWindow.location.href}catch(r){t=!1}if(!t)break
n=v((e=n.contentWindow).document)}return n}function Ke(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return n&&("input"===n&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===n||"true"===e.contentEditable)}function Qe(e){var n=Je(),t=e.focusedElem,r=e.selectionRange
if(n!==t&&t&&t.ownerDocument&&Ye(t.ownerDocument.documentElement,t)){if(null!==r&&Ke(t))if(n=r.start,void 0===(e=r.end)&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length)
else if((e=(n=t.ownerDocument||document)&&n.defaultView||window).getSelection){e=e.getSelection()
var i=t.textContent.length,o=Math.min(r.start,i)
r=void 0===r.end?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Ve(t,o)
var l=Ve(t,r)
i&&l&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&((n=n.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}for(n=[],e=t;e=e.parentNode;)1===e.nodeType&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop})
for("function"==typeof t.focus&&t.focus(),t=0;t<n.length;t++)(e=n[t]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}function Xe(e,n,t){var r=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument
La||null==za||za!==v(r)||(r="selectionStart"in(r=za)&&Ke(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Pa&&Ue(Pa,r)||(Pa=r,0<(r=fn(Ha,"onSelect")).length&&(n=new Kl("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=za)))}function qe(e,n){var t={}
return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}function en(e){if(Wa[e])return Wa[e]
if(!_a[e])return e
var n,t=_a[e]
for(n in t)if(t.hasOwnProperty(n)&&n in Na)return Wa[e]=t[n]
return e}function nn(e,t){Ua.set(e,t),n(t,[e])}function tn(n,t,r){var i=n.type||"unknown-event"
n.currentTarget=r,function(n,t,r,i,o,l,a,u,s){if(Q.apply(this,arguments),cl){if(!cl)throw Error(e(198))
var c=fl
cl=!1,fl=null,dl||(dl=!0,pl=c)}}(i,t,void 0,n),n.currentTarget=null}function rn(e,n){n=!!(4&n)
for(var t=0;t<e.length;t++){var r=e[t],i=r.event
r=r.listeners
e:{var o=void 0
if(n)for(var l=r.length-1;0<=l;l--){var a=r[l],u=a.instance,s=a.currentTarget
if(a=a.listener,u!==o&&i.isPropagationStopped())break e
tn(i,a,s),o=u}else for(l=0;l<r.length;l++){if(u=(a=r[l]).instance,s=a.currentTarget,a=a.listener,u!==o&&i.isPropagationStopped())break e
tn(i,a,s),o=u}}}if(dl)throw e=pl,dl=!1,pl=null,e}function on(e,n){var t=n[hu]
void 0===t&&(t=n[hu]=new Set)
var r=e+"__bubble"
t.has(r)||(un(n,e,2,!1),t.add(r))}function ln(e,n,t){var r=0
n&&(r|=4),un(t,e,r,n)}function an(e){if(!e[nu]){e[nu]=!0,go.forEach(function(n){"selectionchange"!==n&&(eu.has(n)||ln(n,!1,e),ln(n,!0,e))})
var n=9===e.nodeType?e:e.ownerDocument
null===n||n[nu]||(n[nu]=!0,ln("selectionchange",!1,n))}}function un(e,n,t,r){switch(Me(n)){case 1:var i=ye
break
case 4:i=xe
break
default:i=ke}t=i.bind(null,n,t,e),i=void 0,!el||"touchstart"!==n&&"touchmove"!==n&&"wheel"!==n||(i=!0),r?void 0!==i?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):void 0!==i?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function sn(e,n,t,r,i){var o=r
if(!(1&n||2&n||null===r))e:for(;;){if(null===r)return
var l=r.tag
if(3===l||4===l){var a=r.stateNode.containerInfo
if(a===i||8===a.nodeType&&a.parentNode===i)break
if(4===l)for(l=r.return;null!==l;){var u=l.tag
if((3===u||4===u)&&((u=l.stateNode.containerInfo)===i||8===u.nodeType&&u.parentNode===i))return
l=l.return}for(;null!==a;){if(null===(l=kn(a)))return
if(5===(u=l.tag)||6===u){r=o=l
continue e}a=a.parentNode}}r=r.return}Y(function(){var r=o,i=R(t),l=[]
e:{var a=Ua.get(e)
if(void 0!==a){var u=Kl,s=e
switch(e){case"keypress":if(0===Ee(t))break e
case"keydown":case"keyup":u=fa
break
case"focusin":s="focus",u=ta
break
case"focusout":s="blur",u=ta
break
case"beforeblur":case"afterblur":u=ta
break
case"click":if(2===t.button)break e
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=ea
break
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=na
break
case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=pa
break
case Oa:case Ra:case Za:u=ra
break
case Ba:u=ha
break
case"scroll":u=Xl
break
case"wheel":u=ma
break
case"copy":case"cut":case"paste":u=oa
break
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=da}var c=!!(4&n),f=!c&&"scroll"===e,d=c?null!==a?a+"Capture":null:a
c=[]
for(var p,h=r;null!==h;){var g=(p=h).stateNode
if(5===p.tag&&null!==g&&(p=g,null!==d&&null!=(g=J(h,d))&&c.push(cn(h,g,p))),f)break
h=h.return}0<c.length&&(a=new u(a,s,null,t,i),l.push({event:a,listeners:c}))}}if(!(7&n)){if(u="mouseout"===e||"pointerout"===e,(!(a="mouseover"===e||"pointerover"===e)||t===Jo||!(s=t.relatedTarget||t.fromElement)||!kn(s)&&!s[pu])&&(u||a)&&(a=i.window===i?i:(a=i.ownerDocument)?a.defaultView||a.parentWindow:window,u?(u=r,null!==(s=(s=t.relatedTarget||t.toElement)?kn(s):null)&&(s!==(f=X(s))||5!==s.tag&&6!==s.tag)&&(s=null)):(u=null,s=r),u!==s)){if(c=ea,g="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=da,g="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==u?a:Mn(u),p=null==s?a:Mn(s),(a=new c(g,h+"leave",u,t,i)).target=f,a.relatedTarget=p,g=null,kn(i)===r&&((c=new c(d,h+"enter",s,t,i)).target=p,c.relatedTarget=f,g=c),f=g,u&&s)e:{for(d=s,h=0,p=c=u;p;p=dn(p))h++
for(p=0,g=d;g;g=dn(g))p++
for(;0<h-p;)c=dn(c),h--
for(;0<p-h;)d=dn(d),p--
for(;h--;){if(c===d||null!==d&&c===d.alternate)break e
c=dn(c),d=dn(d)}c=null}else c=null
null!==u&&pn(l,a,u,c,!1),null!==s&&null!==f&&pn(l,f,s,c,!0)}if("select"===(u=(a=r?Mn(r):window).nodeName&&a.nodeName.toLowerCase())||"input"===u&&"file"===a.type)var m=_e
else if(ze(a))if(Ta)m=Be
else{m=Re
var v=Oe}else(u=a.nodeName)&&"input"===u.toLowerCase()&&("checkbox"===a.type||"radio"===a.type)&&(m=Ze)
switch(m&&(m=m(e,r))?He(l,m,t,i):(v&&v(e,a,r),"focusout"===e&&(v=a.D)&&v.controlled&&"number"===a.type&&I(a,"number",a.value)),v=r?Mn(r):window,e){case"focusin":(ze(v)||"true"===v.contentEditable)&&(za=v,Ha=r,Pa=null)
break
case"focusout":Pa=Ha=za=null
break
case"mousedown":La=!0
break
case"contextmenu":case"mouseup":case"dragend":La=!1,Xe(l,t,i)
break
case"selectionchange":if($a)break
case"keydown":case"keyup":Xe(l,t,i)}var b
if(ba)e:{switch(e){case"compositionstart":var w="onCompositionStart"
break e
case"compositionend":w="onCompositionEnd"
break e
case"compositionupdate":w="onCompositionUpdate"
break e}w=void 0}else Ma?Ae(e,t)&&(w="onCompositionEnd"):"keydown"===e&&229===t.keyCode&&(w="onCompositionStart")
w&&(xa&&"ko"!==t.locale&&(Ma||"onCompositionStart"!==w?"onCompositionEnd"===w&&Ma&&(b=Se()):(Vl="value"in(Gl=i)?Gl.value:Gl.textContent,Ma=!0)),0<(v=fn(r,w)).length&&(w=new la(w,e,null,t,i),l.push({event:w,listeners:v}),(b||null!==(b=$e(t)))&&(w.data=b))),(b=ya?function(e,n){switch(e){case"compositionend":return $e(n)
case"keypress":return 32!==n.which?null:(Ia=!0,ka)
case"textInput":return(e=n.data)===ka&&Ia?null:e
default:return null}}(e,t):function(e,n){if(Ma)return"compositionend"===e||!ba&&Ae(e,n)?(e=Se(),Yl=Vl=Gl=null,Ma=!1,e):null
switch(e){case"paste":default:return null
case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char
if(n.which)return String.fromCharCode(n.which)}return null
case"compositionend":return xa&&"ko"!==n.locale?null:n.data}}(e,t))&&0<(r=fn(r,"onBeforeInput")).length&&(i=new la("onBeforeInput","beforeinput",null,t,i),l.push({event:i,listeners:r}),i.data=b)}rn(l,n)})}function cn(e,n,t){return{instance:e,listener:n,currentTarget:t}}function fn(e,n){for(var t=n+"Capture",r=[];null!==e;){var i=e,o=i.stateNode
5===i.tag&&null!==o&&(i=o,null!=(o=J(e,t))&&r.unshift(cn(e,o,i)),null!=(o=J(e,n))&&r.push(cn(e,o,i))),e=e.return}return r}function dn(e){if(null===e)return null
do{e=e.return}while(e&&5!==e.tag)
return e||null}function pn(e,n,t,r,i){for(var o=n.$,l=[];null!==t&&t!==r;){var a=t,u=a.alternate,s=a.stateNode
if(null!==u&&u===r)break
5===a.tag&&null!==s&&(a=s,i?null!=(u=J(t,o))&&l.unshift(cn(t,u,a)):i||null!=(u=J(t,o))&&l.push(cn(t,u,a))),t=t.return}0!==l.length&&e.push({event:n,listeners:l})}function hn(e){return("string"==typeof e?e:""+e).replace(tu,"\n").replace(ru,"")}function gn(n,t,r){if(t=hn(t),hn(n)!==t&&r)throw Error(e(425))}function mn(){}function vn(e,n){return"textarea"===e||"noscript"===e||"string"==typeof n.children||"number"==typeof n.children||"object"==typeof n.dangerouslySetInnerHTML&&null!==n.dangerouslySetInnerHTML&&null!=n.dangerouslySetInnerHTML.j}function bn(e){setTimeout(function(){throw e})}function wn(e,n){var t=n,r=0
do{var i=t.nextSibling
if(e.removeChild(t),i&&8===i.nodeType)if("/$"===(t=i.data)){if(0===r)return e.removeChild(i),we(n),void 0
r--}else"$"!==t&&"$?"!==t&&"$!"!==t||r++
t=i}while(t)
we(n)}function yn(e){for(;null!=e;e=e.nextSibling){var n=e.nodeType
if(1===n||3===n)break
if(8===n){if("$"===(n=e.data)||"$!"===n||"$?"===n)break
if("/$"===n)return null}}return e}function xn(e){e=e.previousSibling
for(var n=0;e;){if(8===e.nodeType){var t=e.data
if("$"===t||"$!"===t||"$?"===t){if(0===n)return e
n--}else"/$"===t&&n++}e=e.previousSibling}return null}function kn(e){var n=e[fu]
if(n)return n
for(var t=e.parentNode;t;){if(n=t[pu]||t[fu]){if(t=n.alternate,null!==n.child||null!==t&&null!==t.child)for(e=xn(e);null!==e;){if(t=e[fu])return t
e=xn(e)}return n}t=(e=t).parentNode}return null}function In(e){return!(e=e[fu]||e[pu])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function Mn(n){if(5===n.tag||6===n.tag)return n.stateNode
throw Error(e(33))}function Sn(e){return e[du]||null}function En(e){return{current:e}}function Cn(e){0>bu||(e.current=vu[bu],vu[bu]=null,bu--)}function Tn(e,n){bu++,vu[bu]=e.current,e.current=n}function Fn(e,n){var t=e.type.contextTypes
if(!t)return wu
var r=e.stateNode
if(r&&r.P===n)return r.L
var i,o={}
for(i in t)o[i]=n[i]
return r&&((e=e.stateNode).P=n,e.L=o),o}function Dn(e){return null!=e.childContextTypes}function jn(){Cn(xu),Cn(yu)}function An(n,t,r){if(yu.current!==wu)throw Error(e(168))
Tn(yu,t),Tn(xu,r)}function $n(n,t,r){var i=n.stateNode
if(t=t.childContextTypes,"function"!=typeof i.getChildContext)return r
for(var o in i=i.getChildContext())if(!(o in t))throw Error(e(108,d(n)||"Unknown",o))
return Ro({},r,i)}function zn(e){return e=(e=e.stateNode)&&e._||wu,ku=yu.current,Tn(yu,e),Tn(xu,xu.current),!0}function Hn(n,t,r){var i=n.stateNode
if(!i)throw Error(e(169))
r?(n=$n(n,t,ku),i._=n,Cn(xu),Cn(yu),Tn(yu,n)):Cn(xu),Tn(xu,r)}function Pn(e){null===Iu?Iu=[e]:Iu.push(e)}function Ln(){if(!Su&&null!==Iu){Su=!0
var e=0,n=$l
try{var t=Iu
for($l=1;e<t.length;e++){var r=t[e]
do{r=r(!0)}while(null!==r)}Iu=null,Mu=!1}catch(i){throw null!==Iu&&(Iu=Iu.slice(e+1)),gl(xl,Ln),i}finally{$l=n,Su=!1}}return null}function _n(e,n){Eu[Cu++]=Fu,Eu[Cu++]=Tu,Tu=e,Fu=n}function Wn(e,n,t){Du[ju++]=$u,Du[ju++]=zu,Du[ju++]=Au,Au=e
var r=$u
e=zu
var i=32-Tl(r)-1
r&=~(1<<i),t+=1
var o=32-Tl(n)+i
if(30<o){var l=i-i%5
o=(r&(1<<l)-1).toString(32),r>>=l,i-=l,$u=1<<32-Tl(n)+i|t<<i|r,zu=o+e}else $u=1<<o|t<<i|r,zu=e}function Nn(e){null!==e.return&&(_n(e,1),Wn(e,1,0))}function On(e){for(;e===Tu;)Tu=Eu[--Cu],Eu[Cu]=null,Fu=Eu[--Cu],Eu[Cu]=null
for(;e===Au;)Au=Du[--ju],Du[ju]=null,zu=Du[--ju],Du[ju]=null,$u=Du[--ju],Du[ju]=null}function Rn(e,n){var t=Bi(5,null,null,0)
t.elementType="DELETED",t.stateNode=n,t.return=e,null===(n=e.deletions)?(e.deletions=[t],e.flags|=16):n.push(t)}function Zn(e,n){switch(e.tag){case 5:var t=e.type
return null!==(n=1!==n.nodeType||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n)&&(e.stateNode=n,Hu=e,Pu=yn(n.firstChild),!0)
case 6:return null!==(n=""===e.pendingProps||3!==n.nodeType?null:n)&&(e.stateNode=n,Hu=e,Pu=null,!0)
case 13:return null!==(n=8!==n.nodeType?null:n)&&(t=null!==Au?{id:$u,overflow:zu}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},(t=Bi(18,null,null,0)).stateNode=n,t.return=e,e.child=t,Hu=e,Pu=null,!0)
default:return!1}}function Bn(e){return!(!(1&e.mode)||128&e.flags)}function Un(n){if(Lu){var t=Pu
if(t){var r=t
if(!Zn(n,t)){if(Bn(n))throw Error(e(418))
t=yn(r.nextSibling)
var i=Hu
t&&Zn(n,t)?Rn(i,r):(n.flags=-4097&n.flags|2,Lu=!1,Hu=n)}}else{if(Bn(n))throw Error(e(418))
n.flags=-4097&n.flags|2,Lu=!1,Hu=n}}}function Gn(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return
Hu=e}function Vn(n){if(n!==Hu)return!1
if(!Lu)return Gn(n),Lu=!0,!1
var t
if((t=3!==n.tag)&&!(t=5!==n.tag)&&(t="head"!==(t=n.type)&&"body"!==t&&!vn(n.type,n.memoizedProps)),t&&(t=Pu)){if(Bn(n))throw Yn(),Error(e(418))
for(;t;)Rn(n,t),t=yn(t.nextSibling)}if(Gn(n),13===n.tag){if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(e(317))
e:{for(n=n.nextSibling,t=0;n;){if(8===n.nodeType){var r=n.data
if("/$"===r){if(0===t){Pu=yn(n.nextSibling)
break e}t--}else"$"!==r&&"$!"!==r&&"$?"!==r||t++}n=n.nextSibling}Pu=null}}else Pu=Hu?yn(n.stateNode.nextSibling):null
return!0}function Yn(){for(var e=Pu;e;)e=yn(e.nextSibling)}function Jn(){Pu=Hu=null,Lu=!1}function Kn(e){null===_u?_u=[e]:_u.push(e)}function Qn(n,t,r){if(null!==(n=r.ref)&&"function"!=typeof n&&"object"!=typeof n){if(r.i){if(r=r.i){if(1!==r.tag)throw Error(e(309))
var i=r.stateNode}if(!i)throw Error(e(147,n))
var o=i,l=""+n
return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref.W===l?t.ref:((t=function(e){var n=o.refs
null===e?delete n[l]:n[l]=e}).W=l,t)}if("string"!=typeof n)throw Error(e(284))
if(!r.i)throw Error(e(290,n))}return n}function Xn(n,t){throw n=Object.prototype.toString.call(t),Error(e(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n))}function qn(e){return(0,e.T)(e.C)}function et(n){function t(e,t){if(n){var r=e.deletions
null===r?(e.deletions=[t],e.flags|=16):r.push(t)}}function r(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function i(e,n){for(e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function o(e,n){return(e=Gi(e,n)).index=0,e.sibling=null,e}function l(e,t,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<t?(e.flags|=2,t):r:(e.flags|=2,t):(e.flags|=1048576,t)}function u(e){return n&&null===e.alternate&&(e.flags|=2),e}function s(e,n,t,r){return null===n||6!==n.tag?((n=Ki(t,e.mode,r)).return=e,n):((n=o(n,t)).return=e,n)}function c(e,n,t,r){var i=t.type
return i===Do?d(e,n,t.props.children,r,t.key):null!==n&&(n.elementType===i||"object"==typeof i&&null!==i&&i.$$typeof===Wo&&qn(i)===n.type)?((r=o(n,t.props)).ref=Qn(e,n,t),r.return=e,r):((r=Vi(t.type,t.key,t.props,null,e.mode,r)).ref=Qn(e,n,t),r.return=e,r)}function f(e,n,t,r){return null===n||4!==n.tag||n.stateNode.containerInfo!==t.containerInfo||n.stateNode.implementation!==t.implementation?((n=Qi(t,e.mode,r)).return=e,n):((n=o(n,t.children||[])).return=e,n)}function d(e,n,t,r,i){return null===n||7!==n.tag?((n=Yi(t,e.mode,r,i)).return=e,n):((n=o(n,t)).return=e,n)}function p(e,n,t){if("string"==typeof n&&""!==n||"number"==typeof n)return(n=Ki(""+n,e.mode,t)).return=e,n
if("object"==typeof n&&null!==n){switch(n.$$typeof){case To:return(t=Vi(n.type,n.key,n.props,null,e.mode,t)).ref=Qn(e,null,n),t.return=e,t
case Fo:return(n=Qi(n,e.mode,t)).return=e,n
case Wo:return p(e,(0,n.T)(n.C),t)}if(Bo(n)||a(n))return(n=Yi(n,e.mode,t,null)).return=e,n
Xn(e,n)}return null}function h(e,n,t,r){var i=null!==n?n.key:null
if("string"==typeof t&&""!==t||"number"==typeof t)return null!==i?null:s(e,n,""+t,r)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case To:return t.key===i?c(e,n,t,r):null
case Fo:return t.key===i?f(e,n,t,r):null
case Wo:return h(e,n,(i=t.T)(t.C),r)}if(Bo(t)||a(t))return null!==i?null:d(e,n,t,r,null)
Xn(e,t)}return null}function g(e,n,t,r,i){if("string"==typeof r&&""!==r||"number"==typeof r)return s(n,e=e.get(t)||null,""+r,i)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case To:return c(n,e=e.get(null===r.key?t:r.key)||null,r,i)
case Fo:return f(n,e=e.get(null===r.key?t:r.key)||null,r,i)
case Wo:return g(e,n,t,(0,r.T)(r.C),i)}if(Bo(r)||a(r))return d(n,e=e.get(t)||null,r,i,null)
Xn(n,r)}return null}return function s(c,f,d,m){if("object"==typeof d&&null!==d&&d.type===Do&&null===d.key&&(d=d.props.children),"object"==typeof d&&null!==d){switch(d.$$typeof){case To:e:{for(var v=d.key,b=f;null!==b;){if(b.key===v){if((v=d.type)===Do){if(7===b.tag){r(c,b.sibling),(f=o(b,d.props.children)).return=c,c=f
break e}}else if(b.elementType===v||"object"==typeof v&&null!==v&&v.$$typeof===Wo&&qn(v)===b.type){r(c,b.sibling),(f=o(b,d.props)).ref=Qn(c,b,d),f.return=c,c=f
break e}r(c,b)
break}t(c,b),b=b.sibling}d.type===Do?((f=Yi(d.props.children,c.mode,m,d.key)).return=c,c=f):((m=Vi(d.type,d.key,d.props,null,c.mode,m)).ref=Qn(c,f,d),m.return=c,c=m)}return u(c)
case Fo:e:{for(b=d.key;null!==f;){if(f.key===b){if(4===f.tag&&f.stateNode.containerInfo===d.containerInfo&&f.stateNode.implementation===d.implementation){r(c,f.sibling),(f=o(f,d.children||[])).return=c,c=f
break e}r(c,f)
break}t(c,f),f=f.sibling}(f=Qi(d,c.mode,m)).return=c,c=f}return u(c)
case Wo:return s(c,f,(b=d.T)(d.C),m)}if(Bo(d))return function(e,o,a,u){for(var s=null,c=null,f=o,d=o=0,m=null;null!==f&&d<a.length;d++){f.index>d?(m=f,f=null):m=f.sibling
var v=h(e,f,a[d],u)
if(null===v){null===f&&(f=m)
break}n&&f&&null===v.alternate&&t(e,f),o=l(v,o,d),null===c?s=v:c.sibling=v,c=v,f=m}if(d===a.length)return r(e,f),Lu&&_n(e,d),s
if(null===f){for(;d<a.length;d++)null!==(f=p(e,a[d],u))&&(o=l(f,o,d),null===c?s=f:c.sibling=f,c=f)
return Lu&&_n(e,d),s}for(f=i(e,f);d<a.length;d++)null!==(m=g(f,e,d,a[d],u))&&(n&&null!==m.alternate&&f.delete(null===m.key?d:m.key),o=l(m,o,d),null===c?s=m:c.sibling=m,c=m)
return n&&f.forEach(function(n){return t(e,n)}),Lu&&_n(e,d),s}(c,f,d,m)
if(a(d))return function(o,u,s,c){var f=a(s)
if("function"!=typeof f)throw Error(e(150))
if(null==(s=f.call(s)))throw Error(e(151))
for(var d=f=null,m=u,v=u=0,b=null,w=s.next();null!==m&&!w.done;v++,w=s.next()){m.index>v?(b=m,m=null):b=m.sibling
var y=h(o,m,w.value,c)
if(null===y){null===m&&(m=b)
break}n&&m&&null===y.alternate&&t(o,m),u=l(y,u,v),null===d?f=y:d.sibling=y,d=y,m=b}if(w.done)return r(o,m),Lu&&_n(o,v),f
if(null===m){for(;!w.done;v++,w=s.next())null!==(w=p(o,w.value,c))&&(u=l(w,u,v),null===d?f=w:d.sibling=w,d=w)
return Lu&&_n(o,v),f}for(m=i(o,m);!w.done;v++,w=s.next())null!==(w=g(m,o,v,w.value,c))&&(n&&null!==w.alternate&&m.delete(null===w.key?v:w.key),u=l(w,u,v),null===d?f=w:d.sibling=w,d=w)
return n&&m.forEach(function(e){return t(o,e)}),Lu&&_n(o,v),f}(c,f,d,m)
Xn(c,d)}return"string"==typeof d&&""!==d||"number"==typeof d?(d=""+d,null!==f&&6===f.tag?(r(c,f.sibling),(f=o(f,d)).return=c,c=f):(r(c,f),(f=Ki(d,c.mode,m)).return=c,c=f),u(c)):r(c,f)}}function nt(){Uu=Bu=Zu=null}function tt(e){var n=Ru.current
Cn(Ru),e.m=n}function rt(e,n,t){for(;null!==e;){var r=e.alternate
if((e.childLanes&n)!==n?(e.childLanes|=n,null!==r&&(r.childLanes|=n)):null!==r&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break
e=e.return}}function it(e,n){Zu=e,Uu=Bu=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&n)&&(vs=!0),e.firstContext=null)}function ot(n){var t=n.m
if(Uu!==n)if(n={context:n,memoizedValue:t,next:null},null===Bu){if(null===Zu)throw Error(e(308))
Bu=n,Zu.dependencies={lanes:0,firstContext:n}}else Bu=Bu.next=n
return t}function lt(e){null===Gu?Gu=[e]:Gu.push(e)}function at(e,n,t,r){var i=n.interleaved
return null===i?(t.next=t,lt(n)):(t.next=i.next,i.next=t),n.interleaved=t,ut(e,r)}function ut(e,n){e.lanes|=n
var t=e.alternate
for(null!==t&&(t.lanes|=n),t=e,e=e.return;null!==e;)e.childLanes|=n,null!==(t=e.alternate)&&(t.childLanes|=n),t=e,e=e.return
return 3===t.tag?t.stateNode:null}function st(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ct(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ft(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function dt(e,n,t){var r=e.updateQueue
if(null===r)return null
if(r=r.shared,2&js){var i=r.pending
return null===i?n.next=n:(n.next=i.next,i.next=n),r.pending=n,ut(e,t)}return null===(i=r.interleaved)?(n.next=n,lt(r)):(n.next=i.next,i.next=n),r.interleaved=n,ut(e,t)}function pt(e,n,t){if(null!==(n=n.updateQueue)&&(n=n.shared,4194240&t)){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,ce(e,t)}}function ht(e,n){var t=e.updateQueue,r=e.alternate
if(null!==r&&t===(r=r.updateQueue)){var i=null,o=null
if(null!==(t=t.firstBaseUpdate)){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null}
null===o?i=o=l:o=o.next=l,t=t.next}while(null!==t)
null===o?i=o=n:o=o.next=n}else i=o=n
return t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=t,void 0}null===(e=t.lastBaseUpdate)?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function gt(e,n,t,r){var i=e.updateQueue
Vu=!1
var o=i.firstBaseUpdate,l=i.lastBaseUpdate,a=i.shared.pending
if(null!==a){i.shared.pending=null
var u=a,s=u.next
u.next=null,null===l?o=s:l.next=s,l=u
var c=e.alternate
null!==c&&(a=(c=c.updateQueue).lastBaseUpdate)!==l&&(null===a?c.firstBaseUpdate=s:a.next=s,c.lastBaseUpdate=u)}if(null!==o){var f=i.baseState
for(l=0,c=s=u=null,a=o;;){var d=a.lane,p=a.eventTime
if((r&d)===d){null!==c&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null})
e:{var h=e,g=a
switch(d=n,p=t,g.tag){case 1:if("function"==typeof(h=g.payload)){f=h.call(p,f,d)
break e}f=h
break e
case 3:h.flags=-65537&h.flags|128
case 0:if(null==(d="function"==typeof(h=g.payload)?h.call(p,f,d):h))break e
f=Ro({},f,d)
break e
case 2:Vu=!0}}null!==a.callback&&0!==a.lane&&(e.flags|=64,null===(d=i.effects)?i.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===c?(s=c=p,u=f):c=c.next=p,l|=d
if(null===(a=a.next)){if(null===(a=i.shared.pending))break
a=(d=a).next,d.next=null,i.lastBaseUpdate=d,i.shared.pending=null}1}if(null===c&&(u=f),i.baseState=u,i.firstBaseUpdate=s,i.lastBaseUpdate=c,null!==(n=i.shared.interleaved)){i=n
do{l|=i.lane,i=i.next}while(i!==n)}else null===o&&(i.shared.lanes=0)
Ws|=l,e.lanes=l,e.memoizedState=f}}function mt(n,t,r){if(n=t.effects,t.effects=null,null!==n)for(t=0;t<n.length;t++){var i=n[t],o=i.callback
if(null!==o){if(i.callback=null,i=r,"function"!=typeof o)throw Error(e(191,o))
o.call(i)}}}function vt(n){if(n===Yu)throw Error(e(174))
return n}function bt(e,n){switch(Tn(Qu,n),Tn(Ku,e),Tn(Ju,Yu),e=n.nodeType){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:$(null,"")
break
default:n=$(n=(e=8===e?n.parentNode:n).namespaceURI||null,e=e.tagName)}Cn(Ju),Tn(Ju,n)}function wt(){Cn(Ju),Cn(Ku),Cn(Qu)}function yt(e){vt(Qu.current)
var n=vt(Ju.current),t=$(n,e.type)
n!==t&&(Tn(Ku,e),Tn(Ju,t))}function xt(e){Ku.current===e&&(Cn(Ju),Cn(Ku))}function kt(e){for(var n=e;null!==n;){if(13===n.tag){var t=n.memoizedState
if(null!==t&&(null===(t=t.dehydrated)||"$?"===t.data||"$!"===t.data))return n}else if(19===n.tag&&void 0!==n.memoizedProps.revealOrder){if(128&n.flags)return n}else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return null
n=n.return}n.sibling.return=n.return,n=n.sibling}return null}function It(){for(var e=0;e<qu.length;e++)qu[e].N=null
qu.length=0}function Mt(){throw Error(e(321))}function St(e,n){if(null===n)return!1
for(var t=0;t<n.length&&t<e.length;t++)if(!Aa(e[t],n[t]))return!1
return!0}function Et(n,t,r,i,o,l){if(ts=l,rs=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,es.current=null===n||null===n.memoizedState?fs:ds,n=r(i,o),as){l=0
do{if(as=!1,us=0,25<=l)throw Error(e(301))
l+=1,os=is=null,t.updateQueue=null,es.current=ps,n=r(i,o)}while(as)}if(es.current=cs,t=null!==is&&null!==is.next,ts=0,os=is=rs=null,ls=!1,t)throw Error(e(300))
return n}function Ct(){var e=0!==us
return us=0,e}function Tt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===os?rs.memoizedState=os=e:os=os.next=e,os}function Ft(){if(null===is){var n=rs.alternate
n=null!==n?n.memoizedState:null}else n=is.next
var t=null===os?rs.memoizedState:os.next
if(null!==t)os=t,is=n
else{if(null===n)throw Error(e(310))
n={memoizedState:(is=n).memoizedState,baseState:is.baseState,baseQueue:is.baseQueue,queue:is.queue,next:null},null===os?rs.memoizedState=os=n:os=os.next=n}return os}function Dt(e,n){return"function"==typeof n?n(e):n}function jt(n){var t=Ft(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var i=is,o=i.baseQueue,l=r.pending
if(null!==l){if(null!==o){var a=o.next
o.next=l.next,l.next=a}i.baseQueue=o=l,r.pending=null}if(null!==o){l=o.next,i=i.baseState
var u=a=null,s=null,c=l
do{var f=c.lane
if((ts&f)===f)null!==s&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:n(i,c.action)
else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}
null===s?(u=s=d,a=i):s=s.next=d,rs.lanes|=f,Ws|=f}c=c.next}while(null!==c&&c!==l)
null===s?a=i:s.next=u,Aa(i,t.memoizedState)||(vs=!0),t.memoizedState=i,t.baseState=a,t.baseQueue=s,r.lastRenderedState=i}if(null!==(n=r.interleaved)){o=n
do{l=o.lane,rs.lanes|=l,Ws|=l,o=o.next}while(o!==n)}else null===o&&(r.lanes=0)
return[t.memoizedState,r.dispatch]}function At(n){var t=Ft(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var i=r.dispatch,o=r.pending,l=t.memoizedState
if(null!==o){r.pending=null
var a=o=o.next
do{l=n(l,a.action),a=a.next}while(a!==o)
Aa(l,t.memoizedState)||(vs=!0),t.memoizedState=l,null===t.baseQueue&&(t.baseState=l),r.lastRenderedState=l}return[l,i]}function $t(){}function zt(n,t){var r=rs,i=Ft(),o=t(),l=!Aa(i.memoizedState,o)
if(l&&(i.memoizedState=o,vs=!0),i=i.queue,Gt(Lt.bind(null,r,i,n),[n]),i.getSnapshot!==t||l||null!==os&&1&os.memoizedState.tag){if(r.flags|=2048,Ot(9,Pt.bind(null,r,i,o,t),void 0,null),null===As)throw Error(e(349))
30&ts||Ht(r,t,o)}return o}function Ht(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},null===(n=rs.updateQueue)?(n={lastEffect:null,stores:null},rs.updateQueue=n,n.stores=[e]):null===(t=n.stores)?n.stores=[e]:t.push(e)}function Pt(e,n,t,r){n.value=t,n.getSnapshot=r,_t(n)&&Wt(e)}function Lt(e,n,t){return t(function(){_t(n)&&Wt(e)})}function _t(e){var n=e.getSnapshot
e=e.value
try{var t=n()
return!Aa(e,t)}catch(r){return!0}}function Wt(e){var n=ut(e,1)
null!==n&&gi(n,e,1,-1)}function Nt(e){var n=Tt()
return"function"==typeof e&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dt,lastRenderedState:e},n.queue=e,e=e.dispatch=ir.bind(null,rs,e),[n.memoizedState,e]}function Ot(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},null===(n=rs.updateQueue)?(n={lastEffect:null,stores:null},rs.updateQueue=n,n.lastEffect=e.next=e):null===(t=n.lastEffect)?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e),e}function Rt(){return Ft().memoizedState}function Zt(e,n,t,r){var i=Tt()
rs.flags|=e,i.memoizedState=Ot(1|n,t,void 0,void 0===r?null:r)}function Bt(e,n,t,r){var i=Ft()
r=void 0===r?null:r
var o=void 0
if(null!==is){var l=is.memoizedState
if(o=l.destroy,null!==r&&St(r,l.deps))return i.memoizedState=Ot(n,t,o,r),void 0}rs.flags|=e,i.memoizedState=Ot(1|n,t,o,r)}function Ut(e,n){return Zt(8390656,8,e,n)}function Gt(e,n){return Bt(2048,8,e,n)}function Vt(e,n){return Bt(4,2,e,n)}function Yt(e,n){return Bt(4,4,e,n)}function Jt(e,n){return"function"==typeof n?(e=e(),n(e),function(){n(null)}):null!=n?(e=e(),n.current=e,function(){n.current=null}):void 0}function Kt(e,n,t){return t=null!=t?t.concat([e]):null,Bt(4,4,Jt.bind(null,n,e),t)}function Qt(){}function Xt(e,n){var t=Ft()
n=void 0===n?null:n
var r=t.memoizedState
return null!==r&&null!==n&&St(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function qt(e,n){var t=Ft()
n=void 0===n?null:n
var r=t.memoizedState
return null!==r&&null!==n&&St(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function er(e,n,t){return 21&ts?(Aa(t,n)||(t=ae(),rs.lanes|=t,Ws|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,vs=!0),e.memoizedState=t)}function nr(e,n){var t=$l
$l=0!==t&&4>t?t:4,e(!0)
var r=ns.transition
ns.transition={}
try{e(!1),n()}finally{$l=t,ns.transition=r}}function tr(){return Ft().memoizedState}function rr(e,n,t){var r=hi(e)
t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},or(e)?lr(n,t):null!==(t=at(e,n,t,r))&&(gi(t,e,r,pi()),ar(t,n,r))}function ir(e,n,t){var r=hi(e),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null}
if(or(e))lr(n,i)
else{var o=e.alternate
if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=n.lastRenderedReducer))try{var l=n.lastRenderedState,a=o(l,t)
if(i.hasEagerState=!0,i.eagerState=a,Aa(a,l)){var u=n.interleaved
return null===u?(i.next=i,lt(n)):(i.next=u.next,u.next=i),n.interleaved=i,void 0}}catch(s){}null!==(t=at(e,n,i,r))&&(gi(t,e,r,i=pi()),ar(t,n,r))}}function or(e){var n=e.alternate
return e===rs||null!==n&&n===rs}function lr(e,n){as=ls=!0
var t=e.pending
null===t?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function ar(e,n,t){if(4194240&t){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,ce(e,t)}}function ur(e,n){if(e&&e.defaultProps){for(var t in n=Ro({},n),e=e.defaultProps)void 0===n[t]&&(n[t]=e[t])
return n}return n}function sr(e,n,t,r){t=null==(t=t(r,n=e.memoizedState))?n:Ro({},n,t),e.memoizedState=t,0===e.lanes&&(e.updateQueue.baseState=t)}function cr(e,n,t,r,i,o,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,l):!(n.prototype&&n.prototype.isPureReactComponent&&Ue(t,r)&&Ue(i,o))}function fr(e,n,t){var r=!1,i=wu,o=n.contextType
return"object"==typeof o&&null!==o?o=ot(o):(i=Dn(n)?ku:yu.current,o=(r=null!=(r=n.contextTypes))?Fn(e,i):wu),n=new n(t,o),e.memoizedState=null!==n.state&&void 0!==n.state?n.state:null,n.updater=hs,e.stateNode=n,n.O=e,r&&((e=e.stateNode).P=i,e.L=o),n}function dr(e,n,t,r){e=n.state,"function"==typeof n.componentWillReceiveProps&&n.componentWillReceiveProps(t,r),"function"==typeof n.UNSAFE_componentWillReceiveProps&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&hs.enqueueReplaceState(n,n.state,null)}function pr(e,n,t,r){var i=e.stateNode
i.props=t,i.state=e.memoizedState,i.refs={},st(e)
var o=n.contextType
"object"==typeof o&&null!==o?i.context=ot(o):(o=Dn(n)?ku:yu.current,i.context=Fn(e,o)),i.state=e.memoizedState,"function"==typeof(o=n.getDerivedStateFromProps)&&(sr(e,n,o,t),i.state=e.memoizedState),"function"==typeof n.getDerivedStateFromProps||"function"==typeof i.getSnapshotBeforeUpdate||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||(n=i.state,"function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),n!==i.state&&hs.enqueueReplaceState(i,i.state,null),gt(e,t,i,r),i.state=e.memoizedState),"function"==typeof i.componentDidMount&&(e.flags|=4194308)}function hr(e,n){try{var t="",r=n
do{t+=c(r),r=r.return}while(r)
var i=t}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:n,stack:i,digest:null}}function gr(e,n,t){return{value:e,source:null,stack:null!=t?t:null,digest:null!=n?n:null}}function mr(e,n){try{void 0}catch(t){setTimeout(function(){throw t})}}function vr(e,n,t){(t=ft(-1,t)).tag=3,t.payload={element:null}
var r=n.value
return t.callback=function(){Vs||(Vs=!0,Ys=r),mr()},t}function br(e,n,t){(t=ft(-1,t)).tag=3
var r=e.type.getDerivedStateFromError
if("function"==typeof r){var i=n.value
t.payload=function(){return r(i)},t.callback=function(){mr()}}var o=e.stateNode
return null!==o&&"function"==typeof o.componentDidCatch&&(t.callback=function(){mr(),"function"!=typeof r&&(null===Js?Js=new Set([this]):Js.add(this))
var e=n.stack
this.componentDidCatch(n.value,{componentStack:null!==e?e:""})}),t}function wr(e,n,t){var r=e.pingCache
if(null===r){r=e.pingCache=new gs
var i=new Set
r.set(n,i)}else void 0===(i=r.get(n))&&(i=new Set,r.set(n,i))
i.has(t)||(i.add(t),e=_i.bind(null,e,n,t),n.then(e,e))}function yr(e){do{var n
if((n=13===e.tag)&&(n=null===(n=e.memoizedState)||null!==n.dehydrated),n)return e
e=e.return}while(null!==e)
return null}function xr(e,n,t,r,i){return 1&e.mode?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,1===t.tag&&(null===t.alternate?t.tag=17:((n=ft(-1,1)).tag=2,dt(t,n,1))),t.lanes|=1),e)}function kr(e,n,t,r){n.child=null===e?Ou(n,null,t,r):Nu(n,e.child,t,r)}function Ir(e,n,t,r,i){t=t.render
var o=n.ref
return it(n,i),r=Et(e,n,t,r,o,i),t=Ct(),null===e||vs?(Lu&&t&&Nn(n),n.flags|=1,kr(e,n,r,i),n.child):(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Or(e,n,i))}function Mr(e,n,t,r,i){if(null===e){var o=t.type
return"function"!=typeof o||Ui(o)||void 0!==o.defaultProps||null!==t.compare||void 0!==t.defaultProps?((e=Vi(t.type,null,r,n,n.mode,i)).ref=n.ref,e.return=n,n.child=e):(n.tag=15,n.type=o,Sr(e,n,o,r,i))}if(o=e.child,0===(e.lanes&i)){var l=o.memoizedProps
if((t=null!==(t=t.compare)?t:Ue)(l,r)&&e.ref===n.ref)return Or(e,n,i)}return n.flags|=1,(e=Gi(o,r)).ref=n.ref,e.return=n,n.child=e}function Sr(e,n,t,r,i){if(null!==e){var o=e.memoizedProps
if(Ue(o,r)&&e.ref===n.ref){if(vs=!1,n.pendingProps=r=o,0===(e.lanes&i))return n.lanes=e.lanes,Or(e,n,i)
131072&e.flags&&(vs=!0)}}return Tr(e,n,t,r,i)}function Er(e,n,t){var r=n.pendingProps,i=r.children,o=null!==e?e.memoizedState:null
if("hidden"===r.mode)if(1&n.mode){if(!(1073741824&t))return e=null!==o?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,Tn(Ps,Hs),Hs|=e,null
n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:t,Tn(Ps,Hs),Hs|=r}else n.memoizedState={baseLanes:0,cachePool:null,transitions:null},Tn(Ps,Hs),Hs|=t
else null!==o?(r=o.baseLanes|t,n.memoizedState=null):r=t,Tn(Ps,Hs),Hs|=r
return kr(e,n,i,t),n.child}function Cr(e,n){var t=n.ref;(null===e&&null!==t||null!==e&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Tr(e,n,t,r,i){var o=Dn(t)?ku:yu.current
return o=Fn(n,o),it(n,i),t=Et(e,n,t,r,o,i),r=Ct(),null===e||vs?(Lu&&r&&Nn(n),n.flags|=1,kr(e,n,t,i),n.child):(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Or(e,n,i))}function Fr(e,n,t,r,i){if(Dn(t)){var o=!0
zn(n)}else o=!1
if(it(n,i),null===n.stateNode)Nr(e,n),fr(n,t,r),pr(n,t,r,i),r=!0
else if(null===e){var l=n.stateNode,a=n.memoizedProps
l.props=a
var u=l.context,s=t.contextType
s="object"==typeof s&&null!==s?ot(s):Fn(n,s=Dn(t)?ku:yu.current)
var c=t.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof l.getSnapshotBeforeUpdate
f||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(a!==r||u!==s)&&dr(n,l,r,s),Vu=!1
var d=n.memoizedState
l.state=d,gt(n,r,l,i),u=n.memoizedState,a!==r||d!==u||xu.current||Vu?("function"==typeof c&&(sr(n,t,c,r),u=n.memoizedState),(a=Vu||cr(n,t,a,r,d,u,s))?(f||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(n.flags|=4194308)):("function"==typeof l.componentDidMount&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),l.props=r,l.state=u,l.context=s,r=a):("function"==typeof l.componentDidMount&&(n.flags|=4194308),r=!1)}else{l=n.stateNode,ct(e,n),a=n.memoizedProps,s=n.type===n.elementType?a:ur(n.type,a),l.props=s,f=n.pendingProps,d=l.context,u="object"==typeof(u=t.contextType)&&null!==u?ot(u):Fn(n,u=Dn(t)?ku:yu.current)
var p=t.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(a!==f||d!==u)&&dr(n,l,r,u),Vu=!1,d=n.memoizedState,l.state=d,gt(n,r,l,i)
var h=n.memoizedState
a!==f||d!==h||xu.current||Vu?("function"==typeof p&&(sr(n,t,p,r),h=n.memoizedState),(s=Vu||cr(n,t,s,r,d,h,u)||!1)?(c||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,h,u),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,h,u)),"function"==typeof l.componentDidUpdate&&(n.flags|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(n.flags|=1024)):("function"!=typeof l.componentDidUpdate||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=h),l.props=r,l.state=h,l.context=u,r=s):("function"!=typeof l.componentDidUpdate||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),r=!1)}return Dr(e,n,t,r,o,i)}function Dr(e,n,t,r,i,o){Cr(e,n)
var l=!!(128&n.flags)
if(!r&&!l)return i&&Hn(n,t,!1),Or(e,n,o)
r=n.stateNode,ms.current=n
var a=l&&"function"!=typeof t.getDerivedStateFromError?null:r.render()
return n.flags|=1,null!==e&&l?(n.child=Nu(n,e.child,null,o),n.child=Nu(n,null,a,o)):kr(e,n,a,o),n.memoizedState=r.state,i&&Hn(n,t,!0),n.child}function jr(e){var n=e.stateNode
n.pendingContext?An(0,n.pendingContext,n.pendingContext!==n.context):n.context&&An(0,n.context,!1),bt(e,n.containerInfo)}function Ar(e,n,t,r,i){return Jn(),Kn(i),n.flags|=256,kr(e,n,t,r),n.child}function $r(e){return{baseLanes:e,cachePool:null,transitions:null}}function zr(n,t,r){var i,o=t.pendingProps,l=Xu.current,a=!1,u=!!(128&t.flags)
if((i=u)||(i=(null===n||null!==n.memoizedState)&&!!(2&l)),i?(a=!0,t.flags&=-129):null!==n&&null===n.memoizedState||(l|=1),Tn(Xu,1&l),null===n)return Un(t),null!==(n=t.memoizedState)&&null!==(n=n.dehydrated)?(1&t.mode?"$!"===n.data?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(u=o.children,n=o.fallback,a?(o=t.mode,a=t.child,u={mode:"hidden",children:u},1&o||null===a?a=Ji(u,o,0,null):(a.childLanes=0,a.pendingProps=u),n=Yi(n,o,r,null),a.return=t,n.return=t,a.sibling=n,t.child=a,t.child.memoizedState=$r(r),t.memoizedState=bs,n):Hr(t,u))
if(null!==(l=n.memoizedState)&&null!==(i=l.dehydrated))return function(n,t,r,i,o,l,a){if(r)return 256&t.flags?(t.flags&=-257,Pr(n,t,a,i=gr(Error(e(422))))):null!==t.memoizedState?(t.child=n.child,t.flags|=128,null):(l=i.fallback,o=t.mode,i=Ji({mode:"visible",children:i.children},o,0,null),(l=Yi(l,o,a,null)).flags|=2,i.return=t,l.return=t,i.sibling=l,t.child=i,1&t.mode&&Nu(t,n.child,null,a),t.child.memoizedState=$r(a),t.memoizedState=bs,l)
if(!(1&t.mode))return Pr(n,t,a,null)
if("$!"===o.data){if(i=o.nextSibling&&o.nextSibling.dataset)var u=i.dgst
return i=u,Pr(n,t,a,i=gr(l=Error(e(419)),i,void 0))}if(u=0!==(a&n.childLanes),vs||u){if(null!==(i=As)){switch(a&-a){case 4:o=2
break
case 16:o=8
break
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32
break
case 536870912:o=268435456
break
default:o=0}0!==(o=0!==(o&(i.suspendedLanes|a))?0:o)&&o!==l.retryLane&&(l.retryLane=o,ut(n,o),gi(i,n,o,-1))}return Ti(),Pr(n,t,a,i=gr(Error(e(421))))}return"$?"===o.data?(t.flags|=128,t.child=n.child,t=Ni.bind(null,n),o.R=t,null):(n=l.treeContext,Pu=yn(o.nextSibling),Hu=t,Lu=!0,_u=null,null!==n&&(Du[ju++]=$u,Du[ju++]=zu,Du[ju++]=Au,$u=n.id,zu=n.overflow,Au=t),(t=Hr(t,i.children)).flags|=4096,t)}(n,t,u,o,i,l,r)
if(a){a=o.fallback,u=t.mode,i=(l=n.child).sibling
var s={mode:"hidden",children:o.children}
return 1&u||t.child===l?(o=Gi(l,s)).subtreeFlags=14680064&l.subtreeFlags:((o=t.child).childLanes=0,o.pendingProps=s,t.deletions=null),null!==i?a=Gi(i,a):(a=Yi(a,u,r,null)).flags|=2,a.return=t,o.return=t,o.sibling=a,t.child=o,o=a,a=t.child,u=null===(u=n.child.memoizedState)?$r(r):{baseLanes:u.baseLanes|r,cachePool:null,transitions:u.transitions},a.memoizedState=u,a.childLanes=n.childLanes&~r,t.memoizedState=bs,o}return n=(a=n.child).sibling,o=Gi(a,{mode:"visible",children:o.children}),!(1&t.mode)&&(o.lanes=r),o.return=t,o.sibling=null,null!==n&&(null===(r=t.deletions)?(t.deletions=[n],t.flags|=16):r.push(n)),t.child=o,t.memoizedState=null,o}function Hr(e,n){return(n=Ji({mode:"visible",children:n},e.mode,0,null)).return=e,e.child=n}function Pr(e,n,t,r){return null!==r&&Kn(r),Nu(n,e.child,null,t),(e=Hr(n,n.pendingProps.children)).flags|=2,n.memoizedState=null,e}function Lr(e,n,t){e.lanes|=n
var r=e.alternate
null!==r&&(r.lanes|=n),rt(e.return,n,t)}function _r(e,n,t,r,i){var o=e.memoizedState
null===o?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=t,o.tailMode=i)}function Wr(e,n,t){var r=n.pendingProps,i=r.revealOrder,o=r.tail
if(kr(e,n,r.children,t),2&(r=Xu.current))r=1&r|2,n.flags|=128
else{if(null!==e&&128&e.flags)e:for(e=n.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Lr(e,t,n)
else if(19===e.tag)Lr(e,t,n)
else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break e
for(;null===e.sibling;){if(null===e.return||e.return===n)break e
e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Tn(Xu,r),1&n.mode)switch(i){case"forwards":for(t=n.child,i=null;null!==t;)null!==(e=t.alternate)&&null===kt(e)&&(i=t),t=t.sibling
null===(t=i)?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),_r(n,!1,i,t,o)
break
case"backwards":for(t=null,i=n.child,n.child=null;null!==i;){if(null!==(e=i.alternate)&&null===kt(e)){n.child=i
break}e=i.sibling,i.sibling=t,t=i,i=e}_r(n,!0,t,null,o)
break
case"together":_r(n,!1,null,null,void 0)
break
default:n.memoizedState=null}else n.memoizedState=null
return n.child}function Nr(e,n){!(1&n.mode)&&null!==e&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Or(n,t,r){if(null!==n&&(t.dependencies=n.dependencies),Ws|=t.lanes,0===(r&t.childLanes))return null
if(null!==n&&t.child!==n.child)throw Error(e(153))
if(null!==t.child){for(r=Gi(n=t.child,n.pendingProps),t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=Gi(n,n.pendingProps)).return=t
r.sibling=null}return t.child}function Rr(e,n){if(!Lu)switch(e.tailMode){case"hidden":n=e.tail
for(var t=null;null!==n;)null!==n.alternate&&(t=n),n=n.sibling
null===t?e.tail=null:t.sibling=null
break
case"collapsed":t=e.tail
for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling
null===r?n||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Zr(e){var n=null!==e.alternate&&e.alternate.child===e.child,t=0,r=0
if(n)for(var i=e.child;null!==i;)t|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling
else for(i=e.child;null!==i;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling
return e.subtreeFlags|=r,e.childLanes=t,n}function Br(n,t,r){var i=t.pendingProps
switch(On(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Zr(t),null
case 1:case 17:return Dn(t.type)&&jn(),Zr(t),null
case 3:return i=t.stateNode,wt(),Cn(xu),Cn(yu),It(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),null!==n&&null!==n.child||(Vn(t)?t.flags|=4:null===n||n.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,null!==_u&&(wi(_u),_u=null))),Ka(n,t),Zr(t),null
case 5:xt(t)
var o=vt(Qu.current)
if(r=t.type,null!==n&&null!=t.stateNode)Qa(n,t,r,i,o),n.ref!==t.ref&&(t.flags|=512,t.flags|=2097152)
else{if(!i){if(null===t.stateNode)throw Error(e(166))
return Zr(t),null}if(n=vt(Ju.current),Vn(t)){i=t.stateNode,r=t.type
var a=t.memoizedProps
switch(i[fu]=t,i[du]=a,n=!!(1&t.mode),r){case"dialog":on("cancel",i),on("close",i)
break
case"iframe":case"object":case"embed":on("load",i)
break
case"video":case"audio":for(o=0;o<qa.length;o++)on(qa[o],i)
break
case"source":on("error",i)
break
case"img":case"image":case"link":on("error",i),on("load",i)
break
case"details":on("toggle",i)
break
case"input":w(i,a),on("invalid",i)
break
case"select":i.D={wasMultiple:!!a.multiple},on("invalid",i)
break
case"textarea":E(i,a),on("invalid",i)}for(var u in N(r,a),o=null,a)if(a.hasOwnProperty(u)){var s=a[u]
"children"===u?"string"==typeof s?i.textContent!==s&&(!0!==a.suppressHydrationWarning&&gn(i.textContent,s,n),o=["children",s]):"number"==typeof s&&i.textContent!==""+s&&(!0!==a.suppressHydrationWarning&&gn(i.textContent,s,n),o=["children",""+s]):mo.hasOwnProperty(u)&&null!=s&&"onScroll"===u&&on("scroll",i)}switch(r){case"input":g(i),k(i,a,!0)
break
case"textarea":g(i),j(i)
break
case"select":case"option":break
default:"function"==typeof a.onClick&&(i.onclick=mn)}i=o,t.updateQueue=i,null!==i&&(t.flags|=4)}else{u=9===o.nodeType?o:o.ownerDocument,"http://www.w3.org/1999/xhtml"===n&&(n=A(r)),"http://www.w3.org/1999/xhtml"===n?"script"===r?((n=u.createElement("div")).innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):"string"==typeof i.is?n=u.createElement(r,{is:i.is}):(n=u.createElement(r),"select"===r&&(u=n,i.multiple?u.multiple=!0:i.size&&(u.size=i.size))):n=u.createElementNS(n,r),n[fu]=t,n[du]=i,Ja(n,t,!1,!1),t.stateNode=n
e:{switch(u=O(r,i),r){case"dialog":on("cancel",n),on("close",n),o=i
break
case"iframe":case"object":case"embed":on("load",n),o=i
break
case"video":case"audio":for(o=0;o<qa.length;o++)on(qa[o],n)
o=i
break
case"source":on("error",n),o=i
break
case"img":case"image":case"link":on("error",n),on("load",n),o=i
break
case"details":on("toggle",n),o=i
break
case"input":w(n,i),o=b(n,i),on("invalid",n)
break
case"option":default:o=i
break
case"select":n.D={wasMultiple:!!i.multiple},o=Ro({},i,{value:void 0}),on("invalid",n)
break
case"textarea":E(n,i),o=S(n,i),on("invalid",n)}for(a in N(r,o),s=o)if(s.hasOwnProperty(a)){var c=s[a]
"style"===a?W(n,c):"dangerouslySetInnerHTML"===a?null!=(c=c?c.j:void 0)&&Uo(n,c):"children"===a?"string"==typeof c?("textarea"!==r||""!==c)&&L(n,c):"number"==typeof c&&L(n,""+c):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(mo.hasOwnProperty(a)?null!=c&&"onScroll"===a&&on("scroll",n):null!=c&&l(n,a,c,u))}switch(r){case"input":g(n),k(n,i,!1)
break
case"textarea":g(n),j(n)
break
case"option":null!=i.value&&n.setAttribute("value",""+p(i.value))
break
case"select":n.multiple=!!i.multiple,null!=(a=i.value)?M(n,!!i.multiple,a,!1):null!=i.defaultValue&&M(n,!!i.multiple,i.defaultValue,!0)
break
default:"function"==typeof o.onClick&&(n.onclick=mn)}switch(r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus
break e
case"img":i=!0
break e
default:i=!1}}i&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return Zr(t),null
case 6:if(n&&null!=t.stateNode)Xa(n,t,n.memoizedProps,i)
else{if("string"!=typeof i&&null===t.stateNode)throw Error(e(166))
if(r=vt(Qu.current),vt(Ju.current),Vn(t)){if(i=t.stateNode,r=t.memoizedProps,i[fu]=t,(a=i.nodeValue!==r)&&null!==(n=Hu))switch(n.tag){case 3:gn(i.nodeValue,r,!!(1&n.mode))
break
case 5:!0!==n.memoizedProps.suppressHydrationWarning&&gn(i.nodeValue,r,!!(1&n.mode))}a&&(t.flags|=4)}else(i=(9===r.nodeType?r:r.ownerDocument).createTextNode(i))[fu]=t,t.stateNode=i}return Zr(t),null
case 13:if(Cn(Xu),i=t.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(Lu&&null!==Pu&&1&t.mode&&!(128&t.flags))Yn(),Jn(),t.flags|=98560,a=!1
else if(a=Vn(t),null!==i&&null!==i.dehydrated){if(null===n){if(!a)throw Error(e(318))
if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(e(317))
a[fu]=t}else Jn(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4
Zr(t),a=!1}else null!==_u&&(wi(_u),_u=null),a=!0
if(!a)return 65536&t.flags?t:null}return 128&t.flags?(t.lanes=r,t):((i=null!==i)!=(null!==n&&null!==n.memoizedState)&&i&&(t.child.flags|=8192,1&t.mode&&(null===n||1&Xu.current?0===Ls&&(Ls=3):Ti())),null!==t.updateQueue&&(t.flags|=4),Zr(t),null)
case 4:return wt(),Ka(n,t),null===n&&an(t.stateNode.containerInfo),Zr(t),null
case 10:return tt(t.type.S),Zr(t),null
case 19:if(Cn(Xu),null===(a=t.memoizedState))return Zr(t),null
if(i=!!(128&t.flags),null===(u=a.rendering))if(i)Rr(a,!1)
else{if(0!==Ls||null!==n&&128&n.flags)for(n=t.child;null!==n;){if(null!==(u=kt(n))){for(t.flags|=128,Rr(a,!1),null!==(i=u.updateQueue)&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=r,r=t.child;null!==r;)n=i,(a=r).flags&=14680066,null===(u=a.alternate)?(a.childLanes=0,a.lanes=n,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=u.childLanes,a.lanes=u.lanes,a.child=u.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=u.memoizedProps,a.memoizedState=u.memoizedState,a.updateQueue=u.updateQueue,a.type=u.type,n=u.dependencies,a.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext}),r=r.sibling
return Tn(Xu,1&Xu.current|2),t.child}n=n.sibling}null!==a.tail&&wl()>Us&&(t.flags|=128,i=!0,Rr(a,!1),t.lanes=4194304)}else{if(!i)if(null!==(n=kt(u))){if(t.flags|=128,i=!0,null!==(r=n.updateQueue)&&(t.updateQueue=r,t.flags|=4),Rr(a,!0),null===a.tail&&"hidden"===a.tailMode&&!u.alternate&&!Lu)return Zr(t),null}else 2*wl()-a.renderingStartTime>Us&&1073741824!==r&&(t.flags|=128,i=!0,Rr(a,!1),t.lanes=4194304)
a.isBackwards?(u.sibling=t.child,t.child=u):(null!==(r=a.last)?r.sibling=u:t.child=u,a.last=u)}return null!==a.tail?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=wl(),t.sibling=null,r=Xu.current,Tn(Xu,i?1&r|2:1&r),t):(Zr(t),null)
case 22:case 23:return Mi(),i=null!==t.memoizedState,null!==n&&null!==n.memoizedState!==i&&(t.flags|=8192),i&&1&t.mode?!!(1073741824&Hs)&&(Zr(t),6&t.subtreeFlags&&(t.flags|=8192)):Zr(t),null
case 24:case 25:return null}throw Error(e(156,t.tag))}function Ur(n,t){switch(On(t),t.tag){case 1:return Dn(t.type)&&jn(),65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 3:return wt(),Cn(xu),Cn(yu),It(),65536&(n=t.flags)&&!(128&n)?(t.flags=-65537&n|128,t):null
case 5:return xt(t),null
case 13:if(Cn(Xu),null!==(n=t.memoizedState)&&null!==n.dehydrated){if(null===t.alternate)throw Error(e(340))
Jn()}return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 19:return Cn(Xu),null
case 4:return wt(),null
case 10:return tt(t.type.S),null
case 22:case 23:return Mi(),null
default:return null}}function Gr(e,n){var t=e.ref
if(null!==t)if("function"==typeof t)try{t(null)}catch(r){Li(e,n,r)}else t.current=null}function Vr(e,n,t){try{t()}catch(r){Li(e,n,r)}}function Yr(e,n,t){var r=n.updateQueue
if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next
do{if((i.tag&e)===e){var o=i.destroy
i.destroy=void 0,void 0!==o&&Vr(n,t,o)}i=i.next}while(i!==r)}}function Jr(e,n){if(null!==(n=null!==(n=n.updateQueue)?n.lastEffect:null)){var t=n=n.next
do{if((t.tag&e)===e){var r=t.create
t.destroy=r()}t=t.next}while(t!==n)}}function Kr(e){var n=e.ref
if(null!==n){var t=e.stateNode
e.tag,e=t,"function"==typeof n?n(e):n.current=e}}function Qr(e){var n=e.alternate
null!==n&&(e.alternate=null,Qr(n)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&null!==(n=e.stateNode)&&(delete n[fu],delete n[du],delete n[hu],delete n[gu],delete n[mu]),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Xr(e){return 5===e.tag||3===e.tag||4===e.tag}function qr(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Xr(e.return))return null
e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e
if(null===e.child||4===e.tag)continue e
e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ei(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?8===t.nodeType?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(8===t.nodeType?(n=t.parentNode).insertBefore(e,t):(n=t).appendChild(e),null!=(t=t.Z)||null!==n.onclick||(n.onclick=mn))
else if(4!==r&&null!==(e=e.child))for(ei(e,n,t),e=e.sibling;null!==e;)ei(e,n,t),e=e.sibling}function ni(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e)
else if(4!==r&&null!==(e=e.child))for(ni(e,n,t),e=e.sibling;null!==e;)ni(e,n,t),e=e.sibling}function ti(e,n,t){for(t=t.child;null!==t;)ri(e,n,t),t=t.sibling}function ri(e,n,t){if(Cl&&"function"==typeof Cl.onCommitFiberUnmount)try{Cl.onCommitFiberUnmount(El,t)}catch(a){}switch(t.tag){case 5:xs||Gr(t,n)
case 6:var r=Ss,i=Es
Ss=null,ti(e,n,t),Es=i,null!==(Ss=r)&&(Es?(e=Ss,t=t.stateNode,8===e.nodeType?e.parentNode.removeChild(t):e.removeChild(t)):Ss.removeChild(t.stateNode))
break
case 18:null!==Ss&&(Es?(e=Ss,t=t.stateNode,8===e.nodeType?wn(e.parentNode,t):1===e.nodeType&&wn(e,t),we(e)):wn(Ss,t.stateNode))
break
case 4:r=Ss,i=Es,Ss=t.stateNode.containerInfo,Es=!0,ti(e,n,t),Ss=r,Es=i
break
case 0:case 11:case 14:case 15:if(!xs&&null!==(r=t.updateQueue)&&null!==(r=r.lastEffect)){i=r=r.next
do{var o=i,l=o.destroy
o=o.tag,void 0!==l&&(2&o||4&o)&&Vr(t,n,l),i=i.next}while(i!==r)}ti(e,n,t)
break
case 1:if(!xs&&(Gr(t,n),"function"==typeof(r=t.stateNode).componentWillUnmount))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){Li(t,n,a)}ti(e,n,t)
break
case 21:ti(e,n,t)
break
case 22:1&t.mode?(xs=(r=xs)||null!==t.memoizedState,ti(e,n,t),xs=r):ti(e,n,t)
break
default:ti(e,n,t)}}function ii(e){var n=e.updateQueue
if(null!==n){e.updateQueue=null
var t=e.stateNode
null===t&&(t=e.stateNode=new ks),n.forEach(function(n){var r=Oi.bind(null,e,n)
t.has(n)||(t.add(n),n.then(r,r))})}}function oi(n,t){var r=t.deletions
if(null!==r)for(var i=0;i<r.length;i++){var o=r[i]
try{var l=n,a=t,u=a
e:for(;null!==u;){switch(u.tag){case 5:Ss=u.stateNode,Es=!1
break e
case 3:case 4:Ss=u.stateNode.containerInfo,Es=!0
break e}u=u.return}if(null===Ss)throw Error(e(160))
ri(l,a,o),Ss=null,Es=!1
var s=o.alternate
null!==s&&(s.return=null),o.return=null}catch(c){Li(o,t,c)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)li(t,n),t=t.sibling}function li(n,t){var r=n.alternate,i=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:if(oi(t,n),ai(n),4&i){try{Yr(3,n,n.return),Jr(3,n)}catch(v){Li(n,n.return,v)}try{Yr(5,n,n.return)}catch(v){Li(n,n.return,v)}}break
case 1:oi(t,n),ai(n),512&i&&null!==r&&Gr(r,r.return)
break
case 5:if(oi(t,n),ai(n),512&i&&null!==r&&Gr(r,r.return),32&n.flags){var o=n.stateNode
try{L(o,"")}catch(v){Li(n,n.return,v)}}if(4&i&&null!=(o=n.stateNode)){var a=n.memoizedProps,u=null!==r?r.memoizedProps:a,s=n.type,c=n.updateQueue
if(n.updateQueue=null,null!==c)try{"input"===s&&"radio"===a.type&&null!=a.name&&y(o,a),O(s,u)
var f=O(s,a)
for(u=0;u<c.length;u+=2){var d=c[u],p=c[u+1]
"style"===d?W(o,p):"dangerouslySetInnerHTML"===d?Uo(o,p):"children"===d?L(o,p):l(o,d,p,f)}switch(s){case"input":x(o,a)
break
case"textarea":D(o,a)
break
case"select":var h=o.D.wasMultiple
o.D.wasMultiple=!!a.multiple
var g=a.value
null!=g?M(o,!!a.multiple,g,!1):h!==!!a.multiple&&(null!=a.defaultValue?M(o,!!a.multiple,a.defaultValue,!0):M(o,!!a.multiple,a.multiple?[]:"",!1))}o[du]=a}catch(v){Li(n,n.return,v)}}break
case 6:if(oi(t,n),ai(n),4&i){if(null===n.stateNode)throw Error(e(162))
o=n.stateNode,a=n.memoizedProps
try{o.nodeValue=a}catch(v){Li(n,n.return,v)}}break
case 3:if(oi(t,n),ai(n),4&i&&null!==r&&r.memoizedState.isDehydrated)try{we(t.containerInfo)}catch(v){Li(n,n.return,v)}break
case 4:default:oi(t,n),ai(n)
break
case 13:oi(t,n),ai(n),8192&(o=n.child).flags&&(a=null!==o.memoizedState,o.stateNode.isHidden=a,!a||null!==o.alternate&&null!==o.alternate.memoizedState||(Bs=wl())),4&i&&ii(n)
break
case 22:if(d=null!==r&&null!==r.memoizedState,1&n.mode?(xs=(f=xs)||d,oi(t,n),xs=f):oi(t,n),ai(n),8192&i){if(f=null!==n.memoizedState,(n.stateNode.isHidden=f)&&!d&&1&n.mode)for(Is=n,d=n.child;null!==d;){for(p=Is=d;null!==Is;){switch(g=(h=Is).child,h.tag){case 0:case 11:case 14:case 15:Yr(4,h,h.return)
break
case 1:Gr(h,h.return)
var m=h.stateNode
if("function"==typeof m.componentWillUnmount){i=h,r=h.return
try{t=i,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(v){Li(i,r,v)}}break
case 5:Gr(h,h.return)
break
case 22:if(null!==h.memoizedState){fi(p)
continue}}null!==g?(g.return=h,Is=g):fi(p)}d=d.sibling}e:for(d=null,p=n;;){if(5===p.tag){if(null===d){d=p
try{o=p.stateNode,f?"function"==typeof(a=o.style).setProperty?a.setProperty("display","none","important"):a.display="none":(s=p.stateNode,u=null!=(c=p.memoizedProps.style)&&c.hasOwnProperty("display")?c.display:null,s.style.display=_("display",u))}catch(v){Li(n,n.return,v)}}}else if(6===p.tag){if(null===d)try{p.stateNode.nodeValue=f?"":p.memoizedProps}catch(v){Li(n,n.return,v)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===n)&&null!==p.child){p.child.return=p,p=p.child
continue}if(p===n)break e
for(;null===p.sibling;){if(null===p.return||p.return===n)break e
d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break
case 19:oi(t,n),ai(n),4&i&&ii(n)
case 21:}}function ai(n){var t=n.flags
if(2&t){try{e:{for(var r=n.return;null!==r;){if(Xr(r)){var i=r
break e}r=r.return}throw Error(e(160))}switch(i.tag){case 5:var o=i.stateNode
32&i.flags&&(L(o,""),i.flags&=-33),ni(n,qr(n),o)
break
case 3:case 4:var l=i.stateNode.containerInfo
ei(n,qr(n),l)
break
default:throw Error(e(161))}}catch(a){Li(n,n.return,a)}n.flags&=-3}4096&t&&(n.flags&=-4097)}function ui(e,n,t){Is=e,si(e)}function si(e,n,t){for(var r=!!(1&e.mode);null!==Is;){var i=Is,o=i.child
if(22===i.tag&&r){var l=null!==i.memoizedState||ys
if(!l){var a=i.alternate,u=null!==a&&null!==a.memoizedState||xs
a=ys
var s=xs
if(ys=l,(xs=u)&&!s)for(Is=i;null!==Is;)u=(l=Is).child,22===l.tag&&null!==l.memoizedState?di(i):null!==u?(u.return=l,Is=u):di(i)
for(;null!==o;)Is=o,si(o),o=o.sibling
Is=i,ys=a,xs=s}ci(e)}else 8772&i.subtreeFlags&&null!==o?(o.return=i,Is=o):ci(e)}}function ci(n){for(;null!==Is;){var t=Is
if(8772&t.flags){var r=t.alternate
try{if(8772&t.flags)switch(t.tag){case 0:case 11:case 15:xs||Jr(5,t)
break
case 1:var i=t.stateNode
if(4&t.flags&&!xs)if(null===r)i.componentDidMount()
else{var o=t.elementType===t.type?r.memoizedProps:ur(t.type,r.memoizedProps)
i.componentDidUpdate(o,r.memoizedState,i.B)}var l=t.updateQueue
null!==l&&mt(t,l,i)
break
case 3:var a=t.updateQueue
if(null!==a){if(r=null,null!==t.child)switch(t.child.tag){case 5:case 1:r=t.child.stateNode}mt(t,a,r)}break
case 5:var u=t.stateNode
if(null===r&&4&t.flags){r=u
var s=t.memoizedProps
switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&r.focus()
break
case"img":s.src&&(r.src=s.src)}}break
case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break
case 13:if(null===t.memoizedState){var c=t.alternate
if(null!==c){var f=c.memoizedState
if(null!==f){var d=f.dehydrated
null!==d&&we(d)}}}break
default:throw Error(e(163))}xs||512&t.flags&&Kr(t)}catch(p){Li(t,t.return,p)}}if(t===n){Is=null
break}if(null!==(r=t.sibling)){r.return=t.return,Is=r
break}Is=t.return}}function fi(e){for(;null!==Is;){var n=Is
if(n===e){Is=null
break}var t=n.sibling
if(null!==t){t.return=n.return,Is=t
break}Is=n.return}}function di(e){for(;null!==Is;){var n=Is
try{switch(n.tag){case 0:case 11:case 15:var t=n.return
try{Jr(4,n)}catch(u){Li(n,t,u)}break
case 1:var r=n.stateNode
if("function"==typeof r.componentDidMount){var i=n.return
try{r.componentDidMount()}catch(u){Li(n,i,u)}}var o=n.return
try{Kr(n)}catch(u){Li(n,o,u)}break
case 5:var l=n.return
try{Kr(n)}catch(u){Li(n,l,u)}}}catch(u){Li(n,n.return,u)}if(n===e){Is=null
break}var a=n.sibling
if(null!==a){a.return=n.return,Is=a
break}Is=n.return}}function pi(){return 6&js?wl():-1!==nc?nc:nc=wl()}function hi(e){return 1&e.mode?2&js&&0!==zs?zs&-zs:null!==Wu.transition?(0===tc&&(tc=ae()),tc):0!==(e=$l)?e:e=void 0===(e=window.event)?16:Me(e.type):1}function gi(n,t,r,i){if(50<qs)throw qs=0,ec=null,Error(e(185))
se(n,r,i),2&js&&n===As||(n===As&&(!(2&js)&&(Ns|=r),4===Ls&&yi(n,zs)),mi(n,i),1===r&&0===js&&!(1&t.mode)&&(Us=wl()+500,Mu&&Ln()))}function mi(e,n){var t=e.callbackNode
!function(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-Tl(o),a=1<<l,u=i[l];-1===u?0!==(a&t)&&0===(a&r)||(i[l]=oe(a,n)):u<=n&&(e.expiredLanes|=a),o&=~a}}(e,n)
var r=ie(e,e===As?zs:0)
if(0===r)null!==t&&ml(t),e.callbackNode=null,e.callbackPriority=0
else if(n=r&-r,e.callbackPriority!==n){if(null!=t&&ml(t),1===n)0===e.tag?function(e){Mu=!0,Pn(e)}(xi.bind(null,e)):Pn(xi.bind(null,e)),su(function(){!(6&js)&&Ln()}),t=null
else{switch(fe(r)){case 1:t=xl
break
case 4:t=kl
break
case 16:default:t=Il
break
case 536870912:t=Sl}t=Ri(t,vi.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function vi(n,t){if(nc=-1,tc=0,6&js)throw Error(e(327))
var r=n.callbackNode
if(Hi()&&n.callbackNode!==r)return null
var i=ie(n,n===As?zs:0)
if(0===i)return null
if(30&i||0!==(i&n.expiredLanes)||t)t=Fi(n,i)
else{t=i
var o=js
js|=2
var l=Ci()
for(As===n&&zs===t||(Gs=null,Us=wl()+500,Si(n,t));;){try{ji()
break}catch(u){Ei(n,u)}1}nt(),Ts.current=l,js=o,null!==$s?t=0:(As=null,zs=0,t=Ls)}if(0!==t){if(2===t&&0!==(o=le(n))&&(i=o,t=bi(n,o)),1===t)throw r=_s,Si(n,0),yi(n,i),mi(n,wl()),r
if(6===t)yi(n,i)
else{if(o=n.current.alternate,!(30&i||function(e){for(var n=e;;){if(16384&n.flags){var t=n.updateQueue
if(null!==t&&null!==(t=t.stores))for(var r=0;r<t.length;r++){var i=t[r],o=i.getSnapshot
i=i.value
try{if(!Aa(o(),i))return!1}catch(a){return!1}}}if(t=n.child,16384&n.subtreeFlags&&null!==t)t.return=n,n=t
else{if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return!0
n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}(o)||(t=Fi(n,i),2===t&&(l=le(n),0!==l&&(i=l,t=bi(n,l))),1!==t)))throw r=_s,Si(n,0),yi(n,i),mi(n,wl()),r
switch(n.finishedWork=o,n.finishedLanes=i,t){case 0:case 1:throw Error(e(345))
case 2:case 5:zi(n,Zs,Gs)
break
case 3:if(yi(n,i),(130023424&i)===i&&10<(t=Bs+500-wl())){if(0!==ie(n,0))break
if(((o=n.suspendedLanes)&i)!==i){pi(),n.pingedLanes|=n.suspendedLanes&o
break}n.timeoutHandle=lu(zi.bind(null,n,Zs,Gs),t)
break}zi(n,Zs,Gs)
break
case 4:if(yi(n,i),(4194240&i)===i)break
for(t=n.eventTimes,o=-1;0<i;){var a=31-Tl(i)
l=1<<a,(a=t[a])>o&&(o=a),i&=~l}if(i=o,10<(i=(120>(i=wl()-i)?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Cs(i/1960))-i)){n.timeoutHandle=lu(zi.bind(null,n,Zs,Gs),i)
break}zi(n,Zs,Gs)
break
default:throw Error(e(329))}}}return mi(n,wl()),n.callbackNode===r?vi.bind(null,n):null}function bi(e,n){var t=Rs
return e.current.memoizedState.isDehydrated&&(Si(e,n).flags|=256),2!==(e=Fi(e,n))&&(n=Zs,Zs=t,null!==n&&wi(n)),e}function wi(e){null===Zs?Zs=e:Zs.push.apply(Zs,e)}function yi(e,n){for(n&=~Os,n&=~Ns,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Tl(n),r=1<<t
e[t]=-1,n&=~r}}function xi(n){if(6&js)throw Error(e(327))
Hi()
var t=ie(n,0)
if(!(1&t))return mi(n,wl()),null
var r=Fi(n,t)
if(0!==n.tag&&2===r){var i=le(n)
0!==i&&(t=i,r=bi(n,i))}if(1===r)throw r=_s,Si(n,0),yi(n,t),mi(n,wl()),r
if(6===r)throw Error(e(345))
return n.finishedWork=n.current.alternate,n.finishedLanes=t,zi(n,Zs,Gs),mi(n,wl()),null}function ki(e,n){var t=js
js|=1
try{return e(n)}finally{0===(js=t)&&(Us=wl()+500,Mu&&Ln())}}function Ii(e){null!==Qs&&0===Qs.tag&&!(6&js)&&Hi()
var n=js
js|=1
var t=Ds.transition,r=$l
try{if(Ds.transition=null,$l=1,e)return e()}finally{$l=r,Ds.transition=t,!(6&(js=n))&&Ln()}}function Mi(){Hs=Ps.current,Cn(Ps)}function Si(e,n){e.finishedWork=null,e.finishedLanes=0
var t=e.timeoutHandle
if(-1!==t&&(e.timeoutHandle=-1,au(t)),null!==$s)for(t=$s.return;null!==t;){var r=t
switch(On(r),r.tag){case 1:null!=(r=r.type.childContextTypes)&&jn()
break
case 3:wt(),Cn(xu),Cn(yu),It()
break
case 5:xt(r)
break
case 4:wt()
break
case 13:case 19:Cn(Xu)
break
case 10:tt(r.type.S)
break
case 22:case 23:Mi()}t=t.return}if(As=e,$s=e=Gi(e.current,null),zs=Hs=n,Ls=0,_s=null,Os=Ns=Ws=0,Zs=Rs=null,null!==Gu){for(n=0;n<Gu.length;n++)if(null!==(r=(t=Gu[n]).interleaved)){t.interleaved=null
var i=r.next,o=t.pending
if(null!==o){var l=o.next
o.next=i,r.next=l}t.pending=r}Gu=null}return e}function Ei(n,t){for(;;){var r=$s
try{if(nt(),es.current=cs,ls){for(var i=rs.memoizedState;null!==i;){var o=i.queue
null!==o&&(o.pending=null),i=i.next}ls=!1}if(ts=0,os=is=rs=null,as=!1,us=0,Fs.current=null,null===r||null===r.return){Ls=1,_s=t,$s=null
break}e:{var l=n,a=r.return,u=r,s=t
if(t=zs,u.flags|=32768,null!==s&&"object"==typeof s&&"function"==typeof s.then){var c=s,f=u,d=f.tag
if(!(1&f.mode||0!==d&&11!==d&&15!==d)){var p=f.alternate
p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var h=yr(a)
if(null!==h){h.flags&=-257,xr(h,a,u,0,t),1&h.mode&&wr(l,c,t),s=c
var g=(t=h).updateQueue
if(null===g){var m=new Set
m.add(s),t.updateQueue=m}else g.add(s)
break e}if(!(1&t)){wr(l,c,t),Ti()
break e}s=Error(e(426))}else if(Lu&&1&u.mode){var v=yr(a)
if(null!==v){!(65536&v.flags)&&(v.flags|=256),xr(v,a,u,0,t),Kn(hr(s,u))
break e}}l=s=hr(s,u),4!==Ls&&(Ls=2),null===Rs?Rs=[l]:Rs.push(l),l=a
do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t,ht(l,vr(0,s,t))
break e
case 1:u=s
var b=l.type,w=l.stateNode
if(!(128&l.flags||"function"!=typeof b.getDerivedStateFromError&&(null===w||"function"!=typeof w.componentDidCatch||null!==Js&&Js.has(w)))){l.flags|=65536,t&=-t,l.lanes|=t,ht(l,br(l,u,t))
break e}}l=l.return}while(null!==l)}$i(r)}catch(y){t=y,$s===r&&null!==r&&($s=r=r.return)
continue}break}}function Ci(){var e=Ts.current
return Ts.current=cs,null===e?cs:e}function Ti(){0!==Ls&&3!==Ls&&2!==Ls||(Ls=4),null===As||!(268435455&Ws)&&!(268435455&Ns)||yi(As,zs)}function Fi(n,t){var r=js
js|=2
var i=Ci()
for(As===n&&zs===t||(Gs=null,Si(n,t));;){try{Di()
break}catch(o){Ei(n,o)}1}if(nt(),js=r,Ts.current=i,null!==$s)throw Error(e(261))
return As=null,zs=0,Ls}function Di(){for(;null!==$s;)Ai($s)}function ji(){for(;null!==$s&&!vl();)Ai($s)}function Ai(e){var n=ws(e.alternate,e,Hs)
e.memoizedProps=e.pendingProps,null===n?$i(e):$s=n,Fs.current=null}function $i(e){var n=e
do{var t=n.alternate
if(e=n.return,32768&n.flags){if(null!==(t=Ur(t,n)))return t.flags&=32767,$s=t,void 0
if(null===e)return Ls=6,$s=null,void 0
e.flags|=32768,e.subtreeFlags=0,e.deletions=null}else if(null!==(t=Br(t,n,Hs)))return $s=t,void 0
if(null!==(n=n.sibling))return $s=n,void 0
$s=n=e}while(null!==n)
0===Ls&&(Ls=5)}function zi(n,t,r){var i=$l,o=Ds.transition
try{Ds.transition=null,$l=1,function(n,t,r,i){do{Hi()}while(null!==Qs)
if(6&js)throw Error(e(327))
r=n.finishedWork
var o=n.finishedLanes
if(null===r)return null
if(n.finishedWork=null,n.finishedLanes=0,r===n.current)throw Error(e(177))
n.callbackNode=null,n.callbackPriority=0
var l=r.lanes|r.childLanes
if(function(e,n){var t=e.pendingLanes&~n
e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements
var r=e.eventTimes
for(e=e.expirationTimes;0<t;){var i=31-Tl(t),o=1<<i
n[i]=0,r[i]=-1,e[i]=-1,t&=~o}}(n,l),n===As&&($s=As=null,zs=0),!(2064&r.subtreeFlags)&&!(2064&r.flags)||Ks||(Ks=!0,Ri(Il,function(){return Hi(),null})),l=!!(15990&r.flags),15990&r.subtreeFlags||l){l=Ds.transition,Ds.transition=null
var a=$l
$l=1
var u=js
js|=4,Fs.current=null,function(n,t){if(iu=Bl,Ke(n=Je())){if("selectionStart"in n)var r={start:n.selectionStart,end:n.selectionEnd}
else{var i=(r=(r=n.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection()
if(i&&0!==i.rangeCount){r=i.anchorNode
var o=i.anchorOffset,l=i.focusNode
i=i.focusOffset
var a=0,u=-1,s=-1,c=0,f=0,d=n,p=null
e:for(;;){for(var h;d!==r||0!==o&&3!==d.nodeType||(u=a+o),d!==l||0!==i&&3!==d.nodeType||(s=a+i),3===d.nodeType&&(a+=d.nodeValue.length),null!==(h=d.firstChild);)p=d,d=h
for(;;){if(d===n)break e
if(p===r&&++c===o&&(u=a),p===l&&++f===i&&(s=a),null!==(h=d.nextSibling))break
p=(d=p).parentNode}d=h}r=-1===u||-1===s?null:{start:u,end:s}}else r=null}r=r||{start:0,end:0}}else r=null
for(ou={focusedElem:n,selectionRange:r},Bl=!1,Is=t;null!==Is;)if(n=(t=Is).child,1028&t.subtreeFlags&&null!==n)n.return=t,Is=n
else for(;null!==Is;){t=Is
try{var g=t.alternate
if(1024&t.flags)switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break
case 1:if(null!==g){var m=g.memoizedProps,v=g.memoizedState,b=t.stateNode,w=b.getSnapshotBeforeUpdate(t.elementType===t.type?m:ur(t.type,m),v)
b.B=w}break
case 3:var y=t.stateNode.containerInfo
1===y.nodeType?y.textContent="":9===y.nodeType&&y.documentElement&&y.removeChild(y.documentElement)
break
default:throw Error(e(163))}}catch(x){Li(t,t.return,x)}if(null!==(n=t.sibling)){n.return=t.return,Is=n
break}Is=t.return}g=Ms,Ms=!1}(n,r),li(r,n),Qe(ou),Bl=!!iu,ou=iu=null,n.current=r,ui(r),bl(),js=u,$l=a,Ds.transition=l}else n.current=r
if(Ks&&(Ks=!1,Qs=n,Xs=o),0===(l=n.pendingLanes)&&(Js=null),function(e){if(Cl&&"function"==typeof Cl.onCommitFiberRoot)try{Cl.onCommitFiberRoot(El,e,void 0,!(128&~e.current.flags))}catch(t){}}(r.stateNode),mi(n,wl()),null!==t)for(i=n.onRecoverableError,r=0;r<t.length;r++)i((o=t[r]).value,{componentStack:o.stack,digest:o.digest})
if(Vs)throw Vs=!1,n=Ys,Ys=null,n
return!!(1&Xs)&&0!==n.tag&&Hi(),1&(l=n.pendingLanes)?n===ec?qs++:(qs=0,ec=n):qs=0,Ln(),null}(n,t,r,i)}finally{Ds.transition=o,$l=i}return null}function Hi(){if(null!==Qs){var n=fe(Xs),t=Ds.transition,r=$l
try{if(Ds.transition=null,$l=16>n?16:n,null===Qs)var i=!1
else{if(n=Qs,Qs=null,Xs=0,6&js)throw Error(e(331))
var o=js
for(js|=4,Is=n.current;null!==Is;){var l=Is,a=l.child
if(16&Is.flags){var u=l.deletions
if(null!==u){for(var s=0;s<u.length;s++){var c=u[s]
for(Is=c;null!==Is;){var f=Is
switch(f.tag){case 0:case 11:case 15:Yr(8,f,l)}var d=f.child
if(null!==d)d.return=f,Is=d
else for(;null!==Is;){var p=(f=Is).sibling,h=f.return
if(Qr(f),f===c){Is=null
break}if(null!==p){p.return=h,Is=p
break}Is=h}}}var g=l.alternate
if(null!==g){var m=g.child
if(null!==m){g.child=null
do{var v=m.sibling
m.sibling=null,m=v}while(null!==m)}}Is=l}}if(2064&l.subtreeFlags&&null!==a)a.return=l,Is=a
else e:for(;null!==Is;){if(2048&(l=Is).flags)switch(l.tag){case 0:case 11:case 15:Yr(9,l,l.return)}var b=l.sibling
if(null!==b){b.return=l.return,Is=b
break e}Is=l.return}}var w=n.current
for(Is=w;null!==Is;){var y=(a=Is).child
if(2064&a.subtreeFlags&&null!==y)y.return=a,Is=y
else e:for(a=w;null!==Is;){if(2048&(u=Is).flags)try{switch(u.tag){case 0:case 11:case 15:Jr(9,u)}}catch(k){Li(u,u.return,k)}if(u===a){Is=null
break e}var x=u.sibling
if(null!==x){x.return=u.return,Is=x
break e}Is=u.return}}if(js=o,Ln(),Cl&&"function"==typeof Cl.onPostCommitFiberRoot)try{Cl.onPostCommitFiberRoot(El,n)}catch(k){}i=!0}return i}finally{$l=r,Ds.transition=t}}return!1}function Pi(e,n,t){e=dt(e,n=vr(0,n=hr(t,n),1),1),n=pi(),null!==e&&(se(e,1,n),mi(e,n))}function Li(e,n,t){if(3===e.tag)Pi(e,e,t)
else for(;null!==n;){if(3===n.tag){Pi(n,e,t)
break}if(1===n.tag){var r=n.stateNode
if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Js||!Js.has(r))){n=dt(n,e=br(n,e=hr(t,e),1),1),e=pi(),null!==n&&(se(n,1,e),mi(n,e))
break}}n=n.return}}function _i(e,n,t){var r=e.pingCache
null!==r&&r.delete(n),n=pi(),e.pingedLanes|=e.suspendedLanes&t,As===e&&(zs&t)===t&&(4===Ls||3===Ls&&(130023424&zs)===zs&&500>wl()-Bs?Si(e,0):Os|=t),mi(e,n)}function Wi(e,n){0===n&&(1&e.mode?(n=Al,!(130023424&(Al<<=1))&&(Al=4194304)):n=1)
var t=pi()
null!==(e=ut(e,n))&&(se(e,n,t),mi(e,t))}function Ni(e){var n=e.memoizedState,t=0
null!==n&&(t=n.retryLane),Wi(e,t)}function Oi(n,t){var r=0
switch(n.tag){case 13:var i=n.stateNode,o=n.memoizedState
null!==o&&(r=o.retryLane)
break
case 19:i=n.stateNode
break
default:throw Error(e(314))}null!==i&&i.delete(t),Wi(n,r)}function Ri(e,n){return gl(e,n)}function Zi(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bi(e,n,t,r){return new Zi(e,n,t,r)}function Ui(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Gi(e,n){var t=e.alternate
return null===t?((t=Bi(e.tag,n,e.key,e.mode)).elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=14680064&e.flags,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Vi(n,t,r,i,o,l){var a=2
if(i=n,"function"==typeof n)Ui(n)&&(a=1)
else if("string"==typeof n)a=5
else e:switch(n){case Do:return Yi(r.children,o,l,t)
case jo:a=8,o|=8
break
case Ao:return(n=Bi(12,r,t,2|o)).elementType=Ao,n.lanes=l,n
case Po:return(n=Bi(13,r,t,o)).elementType=Po,n.lanes=l,n
case Lo:return(n=Bi(19,r,t,o)).elementType=Lo,n.lanes=l,n
case No:return Ji(r,o,l,t)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case $o:a=10
break e
case zo:a=9
break e
case Ho:a=11
break e
case _o:a=14
break e
case Wo:a=16,i=null
break e}throw Error(e(130,null==n?n:typeof n,""))}return(t=Bi(a,r,t,o)).elementType=n,t.type=i,t.lanes=l,t}function Yi(e,n,t,r){return(e=Bi(7,e,r,n)).lanes=t,e}function Ji(e,n,t,r){return(e=Bi(22,e,r,n)).elementType=No,e.lanes=t,e.stateNode={isHidden:!1},e}function Ki(e,n,t){return(e=Bi(6,e,null,n)).lanes=t,e}function Qi(e,n,t){return(n=Bi(4,null!==e.children?e.children:[],e.key,n)).lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Xi(e,n,t,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ue(0),this.expirationTimes=ue(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ue(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function qi(e,n,t,r,i,o,l,a,u){return e=new Xi(e,n,t,a,u),1===n?(n=1,!0===o&&(n|=8)):n=0,o=Bi(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},st(o),e}function eo(n){if(!n)return wu
e:{if(X(n=n.O)!==n||1!==n.tag)throw Error(e(170))
var t=n
do{switch(t.tag){case 3:t=t.stateNode.context
break e
case 1:if(Dn(t.type)){t=t.stateNode._
break e}}t=t.return}while(null!==t)
throw Error(e(171))}if(1===n.tag){var r=n.type
if(Dn(r))return $n(n,r,t)}return t}function no(e,n,t,r,i,o,l,a,u){return(e=qi(t,r,!0,e,0,o,0,a,u)).context=eo(null),t=e.current,(o=ft(r=pi(),i=hi(t))).callback=null!=n?n:null,dt(t,o,i),e.current.lanes=i,se(e,i,r),mi(e,r),e}function to(e,n,t,r){var i=n.current,o=pi(),l=hi(i)
return t=eo(t),null===n.context?n.context=t:n.pendingContext=t,(n=ft(o,l)).payload={element:e},null!==(r=void 0===r?null:r)&&(n.callback=r),null!==(e=dt(i,n,l))&&(gi(e,i,l,o),pt(e,i,l)),l}function ro(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function io(e,n){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var t=e.retryLane
e.retryLane=0!==t&&t<n?t:n}}function oo(e,n){io(e,n),(e=e.alternate)&&io(e,n)}function lo(e){this.U=e}function ao(e){this.U=e}function uo(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function so(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function co(){}function fo(e,n,t,r,i){var o=t.Z
if(o){var l=o
if("function"==typeof i){var a=i
i=function(){var e=ro(l)
a.call(e)}}to(n,l,e,i)}else l=function(e,n,t,r,i){if(i){if("function"==typeof r){var o=r
r=function(){var e=ro(l)
o.call(e)}}var l=no(n,r,e,0,null,!1,0,"",co)
return e.Z=l,e[pu]=l.current,an(8===e.nodeType?e.parentNode:e),Ii(),l}for(;i=e.lastChild;)e.removeChild(i)
if("function"==typeof r){var a=r
r=function(){var e=ro(u)
a.call(e)}}var u=qi(e,0,!1,null,0,!1,0,"",co)
return e.Z=u,e[pu]=u.current,an(8===e.nodeType?e.parentNode:e),Ii(function(){to(n,u,t,r)}),u}(t,n,e,i,r)
return ro(l)}if(F)return z
F=1
var po=t(),ho=function(){return T||(T=1,H.exports=function(){return C||(C=1,function(e){function n(e,n){var t=e.length
e.push(n)
e:for(;0<t;){var r=t-1>>>1,o=e[r]
if(!(0<i(o,n)))break e
e[r]=n,e[t]=o,t=r}}function t(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null
var n=e[0],t=e.pop()
if(t!==n){e[0]=t
e:for(var r=0,o=e.length,l=o>>>1;r<l;){var a=2*(r+1)-1,u=e[a],s=a+1,c=e[s]
if(0>i(u,t))s<o&&0>i(c,u)?(e[r]=c,e[s]=t,r=s):(e[r]=u,e[a]=t,r=a)
else{if(!(s<o&&0>i(c,t)))break e
e[r]=c,e[s]=t,r=s}}}return n}function i(e,n){var t=e.sortIndex-n.sortIndex
return 0!==t?t:e.id-n.id}function o(e){for(var i=t(m);null!==i;){if(null===i.callback)r(m)
else{if(!(i.startTime<=e))break
r(m),i.sortIndex=i.expirationTime,n(g,i)}i=t(m)}}function l(e){if(k=!1,o(e),!x)if(null!==t(g))x=!0,c(a)
else{var n=t(m)
null!==n&&f(l,n.startTime-e)}}function a(n,i){x=!1,k&&(k=!1,M(F),F=-1),y=!0
var a=w
try{for(o(i),b=t(g);null!==b&&(!(b.expirationTime>i)||n&&!u());){var s=b.callback
if("function"==typeof s){b.callback=null,w=b.priorityLevel
var c=s(b.expirationTime<=i)
i=e.unstable_now(),"function"==typeof c?b.callback=c:b===t(g)&&r(g),o(i)}else r(g)
b=t(g)}if(null!==b)var d=!0
else{var p=t(m)
null!==p&&f(l,p.startTime-i),d=!1}return d}finally{b=null,w=a,y=!1}}function u(){return!(e.unstable_now()-j<D)}function s(){if(null!==T){var n=e.unstable_now()
j=n
var t=!0
try{t=T(!0,n)}finally{t?E():(C=!1,T=null)}}else C=!1}function c(e){T=e,C||(C=!0,E())}function f(n,t){F=I(function(){n(e.unstable_now())},t)}if("object"==typeof performance&&"function"==typeof performance.now){var d=performance
e.unstable_now=function(){return d.now()}}else{var p=Date,h=p.now()
e.unstable_now=function(){return p.now()-h}}var g=[],m=[],v=1,b=null,w=3,y=!1,x=!1,k=!1,I="function"==typeof setTimeout?setTimeout:null,M="function"==typeof clearTimeout?clearTimeout:null,S="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var E,C=!1,T=null,F=-1,D=5,j=-1
if("function"==typeof S)E=function(){S(s)}
else if("undefined"!=typeof MessageChannel){var A=new MessageChannel,$=A.port2
A.port1.onmessage=s,E=function(){$.postMessage(null)}}else E=function(){I(s,0)}
e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){x||y||(x=!0,c(a))},e.unstable_forceFrameRate=function(e){0>e||125<e?void 0:D=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return w},e.unstable_getFirstCallbackNode=function(){return t(g)},e.unstable_next=function(e){switch(w){case 1:case 2:case 3:var n=3
break
default:n=w}var t=w
w=n
try{return e()}finally{w=t}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break
default:e=3}var t=w
w=e
try{return n()}finally{w=t}},e.unstable_scheduleCallback=function(r,i,o){var u=e.unstable_now()
switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?u+o:u,r){case 1:var s=-1
break
case 2:s=250
break
case 5:s=1073741823
break
case 4:s=1e4
break
default:s=5e3}return r={id:v++,callback:i,priorityLevel:r,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>u?(r.sortIndex=o,n(m,r),null===t(g)&&r===t(m)&&(k?(M(F),F=-1):k=!0,f(l,o-u))):(r.sortIndex=s,n(g,r),x||y||(x=!0,c(a))),r},e.unstable_shouldYield=u,e.unstable_wrapCallback=function(e){var n=w
return function(){var t=w
w=n
try{return e.apply(this,arguments)}finally{w=t}}}}(P)),P}()),H.exports}(),go=new Set,mo={},vo=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),bo=Object.prototype.hasOwnProperty,wo=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yo={},xo={},ko={}
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ko[e]=new i(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0]
ko[n]=new i(n,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ko[e]=new i(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ko[e]=new i(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ko[e]=new i(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ko[e]=new i(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ko[e]=new i(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ko[e]=new i(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ko[e]=new i(e,5,!1,e.toLowerCase(),null,!1,!1)})
var Io=/[\-:]([a-z])/g
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Io,o)
ko[n]=new i(n,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Io,o)
ko[n]=new i(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Io,o)
ko[n]=new i(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ko[e]=new i(e,1,!1,e.toLowerCase(),null,!1,!1)}),ko.xlinkHref=new i("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ko[e]=new i(e,1,!1,e.toLowerCase(),null,!0,!0)})
var Mo,So,Eo,Co=po.h,To=Symbol.for("react.element"),Fo=Symbol.for("react.portal"),Do=Symbol.for("react.fragment"),jo=Symbol.for("react.strict_mode"),Ao=Symbol.for("react.profiler"),$o=Symbol.for("react.provider"),zo=Symbol.for("react.context"),Ho=Symbol.for("react.forward_ref"),Po=Symbol.for("react.suspense"),Lo=Symbol.for("react.suspense_list"),_o=Symbol.for("react.memo"),Wo=Symbol.for("react.lazy"),No=Symbol.for("react.offscreen"),Oo=Symbol.iterator,Ro=Object.assign,Zo=!1,Bo=Array.isArray,Uo=(Eo=function(e,n){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=n
else{for((So=So||document.createElement("div")).innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=So.firstChild;e.firstChild;)e.removeChild(e.firstChild)
for(;n.firstChild;)e.appendChild(n.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,n,t,r){MSApp.execUnsafeLocalFunction(function(){return Eo(e,n)})}:Eo),Go={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vo=["Webkit","ms","Moz","O"]
Object.keys(Go).forEach(function(e){Vo.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Go[n]=Go[e]})})
var Yo=Ro({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),Jo=null,Ko=null,Qo=null,Xo=null,qo=!1,el=!1
if(vo)try{var nl={}
Object.defineProperty(nl,"passive",{get:function(){el=!0}}),window.addEventListener("test",nl,nl),window.removeEventListener("test",nl,nl)}catch(Eo){el=!1}var tl,rl,il,ol,ll,al,ul,sl,cl=!1,fl=null,dl=!1,pl=null,hl={onError:function(e){cl=!0,fl=e}},gl=ho.unstable_scheduleCallback,ml=ho.unstable_cancelCallback,vl=ho.unstable_shouldYield,bl=ho.unstable_requestPaint,wl=ho.unstable_now,yl=ho.unstable_getCurrentPriorityLevel,xl=ho.unstable_ImmediatePriority,kl=ho.unstable_UserBlockingPriority,Il=ho.unstable_NormalPriority,Ml=ho.unstable_LowPriority,Sl=ho.unstable_IdlePriority,El=null,Cl=null,Tl=Math.clz32?Math.clz32:function(e){return 0==(e>>>=0)?32:31-(Fl(e)/Dl|0)|0},Fl=Math.log,Dl=Math.LN2,jl=64,Al=4194304,$l=0,zl=!1,Hl=[],Pl=null,Ll=null,_l=null,Wl=new Map,Nl=new Map,Ol=[],Rl="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),Zl=Co.ReactCurrentBatchConfig,Bl=!0,Ul=null,Gl=null,Vl=null,Yl=null,Jl={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kl=Fe(Jl),Ql=Ro({},Jl,{view:0,detail:0}),Xl=Fe(Ql),ql=Ro({},Ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:je,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==sl&&(sl&&"mousemove"===e.type?(al=e.screenX-sl.screenX,ul=e.screenY-sl.screenY):ul=al=0,sl=e),al)},movementY:function(e){return"movementY"in e?e.movementY:ul}}),ea=Fe(ql),na=Fe(Ro({},ql,{dataTransfer:0})),ta=Fe(Ro({},Ql,{relatedTarget:0})),ra=Fe(Ro({},Jl,{animationName:0,elapsedTime:0,pseudoElement:0})),ia=Ro({},Jl,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),oa=Fe(ia),la=Fe(Ro({},Jl,{data:0})),aa={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ua={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sa={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},ca=Ro({},Ql,{key:function(e){if(e.key){var n=aa[e.key]||e.key
if("Unidentified"!==n)return n}return"keypress"===e.type?13===(e=Ee(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?ua[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:je,charCode:function(e){return"keypress"===e.type?Ee(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Ee(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),fa=Fe(ca),da=Fe(Ro({},ql,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),pa=Fe(Ro({},Ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:je})),ha=Fe(Ro({},Jl,{propertyName:0,elapsedTime:0,pseudoElement:0})),ga=Ro({},ql,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ma=Fe(ga),va=[9,13,27,32],ba=vo&&"CompositionEvent"in window,wa=null
vo&&"documentMode"in document&&(wa=document.documentMode)
var ya=vo&&"TextEvent"in window&&!wa,xa=vo&&(!ba||wa&&8<wa&&11>=wa),ka=String.fromCharCode(32),Ia=!1,Ma=!1,Sa={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},Ea=null,Ca=null,Ta=!1
if(vo){var Fa
if(vo){var Da="oninput"in document
if(!Da){var ja=document.createElement("div")
ja.setAttribute("oninput","return;"),Da="function"==typeof ja.oninput}Fa=Da}else Fa=!1
Ta=Fa&&(!document.documentMode||9<document.documentMode)}var Aa="function"==typeof Object.is?Object.is:function(e,n){return e===n&&(0!==e||1/e==1/n)||e!=e&&n!=n},$a=vo&&"documentMode"in document&&11>=document.documentMode,za=null,Ha=null,Pa=null,La=!1,_a={animationend:qe("Animation","AnimationEnd"),animationiteration:qe("Animation","AnimationIteration"),animationstart:qe("Animation","AnimationStart"),transitionend:qe("Transition","TransitionEnd")},Wa={},Na={}
vo&&(Na=document.createElement("div").style,"AnimationEvent"in window||(delete _a.animationend.animation,delete _a.animationiteration.animation,delete _a.animationstart.animation),"TransitionEvent"in window||delete _a.transitionend.transition)
for(var Oa=en("animationend"),Ra=en("animationiteration"),Za=en("animationstart"),Ba=en("transitionend"),Ua=new Map,Ga="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" "),Va=0;Va<Ga.length;Va++){var Ya=Ga[Va]
nn(Ya.toLowerCase(),"on"+(Ya[0].toUpperCase()+Ya.slice(1)))}nn(Oa,"onAnimationEnd"),nn(Ra,"onAnimationIteration"),nn(Za,"onAnimationStart"),nn("dblclick","onDoubleClick"),nn("focusin","onFocus"),nn("focusout","onBlur"),nn(Ba,"onTransitionEnd"),r("onMouseEnter",["mouseout","mouseover"]),r("onMouseLeave",["mouseout","mouseover"]),r("onPointerEnter",["pointerout","pointerover"]),r("onPointerLeave",["pointerout","pointerover"]),n("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),n("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),n("onBeforeInput",["compositionend","keypress","textInput","paste"]),n("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),n("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),n("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "))
var Ja,Ka,Qa,Xa,qa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eu=new Set("cancel close invalid load scroll toggle".split(" ").concat(qa)),nu="_reactListening"+Math.random().toString(36).slice(2),tu=/\r\n?/g,ru=/\u0000|\uFFFD/g,iu=null,ou=null,lu="function"==typeof setTimeout?setTimeout:void 0,au="function"==typeof clearTimeout?clearTimeout:void 0,uu="function"==typeof Promise?Promise:void 0,su="function"==typeof queueMicrotask?queueMicrotask:void 0!==uu?function(e){return uu.resolve(null).then(e).catch(bn)}:lu,cu=Math.random().toString(36).slice(2),fu="__reactFiber$"+cu,du="__reactProps$"+cu,pu="__reactContainer$"+cu,hu="__reactEvents$"+cu,gu="__reactListeners$"+cu,mu="__reactHandles$"+cu,vu=[],bu=-1,wu={},yu=En(wu),xu=En(!1),ku=wu,Iu=null,Mu=!1,Su=!1,Eu=[],Cu=0,Tu=null,Fu=0,Du=[],ju=0,Au=null,$u=1,zu="",Hu=null,Pu=null,Lu=!1,_u=null,Wu=Co.ReactCurrentBatchConfig,Nu=et(!0),Ou=et(!1),Ru=En(null),Zu=null,Bu=null,Uu=null,Gu=null,Vu=!1,Yu={},Ju=En(Yu),Ku=En(Yu),Qu=En(Yu),Xu=En(0),qu=[],es=Co.ReactCurrentDispatcher,ns=Co.ReactCurrentBatchConfig,ts=0,rs=null,is=null,os=null,ls=!1,as=!1,us=0,ss=0,cs={readContext:ot,useCallback:Mt,useContext:Mt,useEffect:Mt,useImperativeHandle:Mt,useInsertionEffect:Mt,useLayoutEffect:Mt,useMemo:Mt,useReducer:Mt,useRef:Mt,useState:Mt,useDebugValue:Mt,useDeferredValue:Mt,useTransition:Mt,useMutableSource:Mt,useSyncExternalStore:Mt,useId:Mt,unstable_isNewReconciler:!1},fs={readContext:ot,useCallback:function(e,n){return Tt().memoizedState=[e,void 0===n?null:n],e},useContext:ot,useEffect:Ut,useImperativeHandle:function(e,n,t){return t=null!=t?t.concat([e]):null,Zt(4194308,4,Jt.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Zt(4194308,4,e,n)},useInsertionEffect:function(e,n){return Zt(4,2,e,n)},useMemo:function(e,n){var t=Tt()
return n=void 0===n?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Tt()
return n=void 0!==t?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=rr.bind(null,rs,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},Tt().memoizedState=e},useState:Nt,useDebugValue:Qt,useDeferredValue:function(e){return Tt().memoizedState=e},useTransition:function(){var e=Nt(!1),n=e[0]
return e=nr.bind(null,e[1]),Tt().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(n,t,r){var i=rs,o=Tt()
if(Lu){if(void 0===r)throw Error(e(407))
r=r()}else{if(r=t(),null===As)throw Error(e(349))
30&ts||Ht(i,t,r)}o.memoizedState=r
var l={value:r,getSnapshot:t}
return o.queue=l,Ut(Lt.bind(null,i,l,n),[n]),i.flags|=2048,Ot(9,Pt.bind(null,i,l,r,t),void 0,null),r},useId:function(){var e=Tt(),n=As.identifierPrefix
if(Lu){var t=zu
n=":"+n+"R"+(t=($u&~(1<<32-Tl($u)-1)).toString(32)+t),0<(t=us++)&&(n+="H"+t.toString(32)),n+=":"}else n=":"+n+"r"+(t=ss++).toString(32)+":"
return e.memoizedState=n},unstable_isNewReconciler:!1},ds={readContext:ot,useCallback:Xt,useContext:ot,useEffect:Gt,useImperativeHandle:Kt,useInsertionEffect:Vt,useLayoutEffect:Yt,useMemo:qt,useReducer:jt,useRef:Rt,useState:function(){return jt(Dt)},useDebugValue:Qt,useDeferredValue:function(e){return er(Ft(),is.memoizedState,e)},useTransition:function(){return[jt(Dt)[0],Ft().memoizedState]},useMutableSource:$t,useSyncExternalStore:zt,useId:tr,unstable_isNewReconciler:!1},ps={readContext:ot,useCallback:Xt,useContext:ot,useEffect:Gt,useImperativeHandle:Kt,useInsertionEffect:Vt,useLayoutEffect:Yt,useMemo:qt,useReducer:At,useRef:Rt,useState:function(){return At(Dt)},useDebugValue:Qt,useDeferredValue:function(e){var n=Ft()
return null===is?n.memoizedState=e:er(n,is.memoizedState,e)},useTransition:function(){return[At(Dt)[0],Ft().memoizedState]},useMutableSource:$t,useSyncExternalStore:zt,useId:tr,unstable_isNewReconciler:!1},hs={isMounted:function(e){return!!(e=e.O)&&X(e)===e},enqueueSetState:function(e,n,t){e=e.O
var r=pi(),i=hi(e),o=ft(r,i)
o.payload=n,null!=t&&(o.callback=t),null!==(n=dt(e,o,i))&&(gi(n,e,i,r),pt(n,e,i))},enqueueReplaceState:function(e,n,t){e=e.O
var r=pi(),i=hi(e),o=ft(r,i)
o.tag=1,o.payload=n,null!=t&&(o.callback=t),null!==(n=dt(e,o,i))&&(gi(n,e,i,r),pt(n,e,i))},enqueueForceUpdate:function(e,n){e=e.O
var t=pi(),r=hi(e),i=ft(t,r)
i.tag=2,null!=n&&(i.callback=n),null!==(n=dt(e,i,r))&&(gi(n,e,r,t),pt(n,e,r))}},gs="function"==typeof WeakMap?WeakMap:Map,ms=Co.ReactCurrentOwner,vs=!1,bs={dehydrated:null,treeContext:null,retryLane:0}
Ja=function(e,n){for(var t=n.child;null!==t;){if(5===t.tag||6===t.tag)e.appendChild(t.stateNode)
else if(4!==t.tag&&null!==t.child){t.child.return=t,t=t.child
continue}if(t===n)break
for(;null===t.sibling;){if(null===t.return||t.return===n)return
t=t.return}t.sibling.return=t.return,t=t.sibling}},Ka=function(){},Qa=function(e,n,t,r){var i=e.memoizedProps
if(i!==r){e=n.stateNode,vt(Ju.current)
var o,l=null
switch(t){case"input":i=b(e,i),r=b(e,r),l=[]
break
case"select":i=Ro({},i,{value:void 0}),r=Ro({},r,{value:void 0}),l=[]
break
case"textarea":i=S(e,i),r=S(e,r),l=[]
break
default:"function"!=typeof i.onClick&&"function"==typeof r.onClick&&(e.onclick=mn)}for(s in N(t,r),t=null,i)if(!r.hasOwnProperty(s)&&i.hasOwnProperty(s)&&null!=i[s])if("style"===s){var a=i[s]
for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else"dangerouslySetInnerHTML"!==s&&"children"!==s&&"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&"autoFocus"!==s&&(mo.hasOwnProperty(s)?l||(l=[]):(l=l||[]).push(s,null))
for(s in r){var u=r[s]
if(a=null!=i?i[s]:void 0,r.hasOwnProperty(s)&&u!==a&&(null!=u||null!=a))if("style"===s)if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(t||(t={}),t[o]="")
for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(t||(t={}),t[o]=u[o])}else t||(l||(l=[]),l.push(s,t)),t=u
else"dangerouslySetInnerHTML"===s?(u=u?u.j:void 0,a=a?a.j:void 0,null!=u&&a!==u&&(l=l||[]).push(s,u)):"children"===s?"string"!=typeof u&&"number"!=typeof u||(l=l||[]).push(s,""+u):"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&(mo.hasOwnProperty(s)?(null!=u&&"onScroll"===s&&on("scroll",e),l||a===u||(l=[])):(l=l||[]).push(s,u))}t&&(l=l||[]).push("style",t)
var s=l;(n.updateQueue=s)&&(n.flags|=4)}},Xa=function(e,n,t,r){t!==r&&(n.flags|=4)}
var ws,ys=!1,xs=!1,ks="function"==typeof WeakSet?WeakSet:Set,Is=null,Ms=!1,Ss=null,Es=!1,Cs=Math.ceil,Ts=Co.ReactCurrentDispatcher,Fs=Co.ReactCurrentOwner,Ds=Co.ReactCurrentBatchConfig,js=0,As=null,$s=null,zs=0,Hs=0,Ps=En(0),Ls=0,_s=null,Ws=0,Ns=0,Os=0,Rs=null,Zs=null,Bs=0,Us=1/0,Gs=null,Vs=!1,Ys=null,Js=null,Ks=!1,Qs=null,Xs=0,qs=0,ec=null,nc=-1,tc=0
ws=function(n,t,r){if(null!==n)if(n.memoizedProps!==t.pendingProps||xu.current)vs=!0
else{if(0===(n.lanes&r)&&!(128&t.flags))return vs=!1,function(e,n,t){switch(n.tag){case 3:jr(n),Jn()
break
case 5:yt(n)
break
case 1:Dn(n.type)&&zn(n)
break
case 4:bt(n,n.stateNode.containerInfo)
break
case 10:var r=n.type.S,i=n.memoizedProps.value
Tn(Ru,r.m),r.m=i
break
case 13:if(null!==(r=n.memoizedState))return null!==r.dehydrated?(Tn(Xu,1&Xu.current),n.flags|=128,null):0!==(t&n.child.childLanes)?zr(e,n,t):(Tn(Xu,1&Xu.current),null!==(e=Or(e,n,t))?e.sibling:null)
Tn(Xu,1&Xu.current)
break
case 19:if(r=0!==(t&n.childLanes),128&e.flags){if(r)return Wr(e,n,t)
n.flags|=128}if(null!==(i=n.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Tn(Xu,Xu.current),r)break
return null
case 22:case 23:return n.lanes=0,Er(e,n,t)}return Or(e,n,t)}(n,t,r)
vs=!!(131072&n.flags)}else vs=!1,Lu&&1048576&t.flags&&Wn(t,Fu,t.index)
switch(t.lanes=0,t.tag){case 2:var i=t.type
Nr(n,t),n=t.pendingProps
var o=Fn(t,yu.current)
it(t,r),o=Et(null,t,i,n,o,r)
var l=Ct()
return t.flags|=1,"object"==typeof o&&null!==o&&"function"==typeof o.render&&void 0===o.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Dn(i)?(l=!0,zn(t)):l=!1,t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,st(t),o.updater=hs,t.stateNode=o,o.O=t,pr(t,i,n,r),t=Dr(null,t,i,!0,l,r)):(t.tag=0,Lu&&l&&Nn(t),kr(null,t,o,r),t=t.child),t
case 16:i=t.elementType
e:{switch(Nr(n,t),n=t.pendingProps,i=(o=i.T)(i.C),t.type=i,o=t.tag=function(e){if("function"==typeof e)return Ui(e)?1:0
if(null!=e){if((e=e.$$typeof)===Ho)return 11
if(e===_o)return 14}return 2}(i),n=ur(i,n),o){case 0:t=Tr(null,t,i,n,r)
break e
case 1:t=Fr(null,t,i,n,r)
break e
case 11:t=Ir(null,t,i,n,r)
break e
case 14:t=Mr(null,t,i,ur(i.type,n),r)
break e}throw Error(e(306,i,""))}return t
case 0:return i=t.type,o=t.pendingProps,Tr(n,t,i,o=t.elementType===i?o:ur(i,o),r)
case 1:return i=t.type,o=t.pendingProps,Fr(n,t,i,o=t.elementType===i?o:ur(i,o),r)
case 3:e:{if(jr(t),null===n)throw Error(e(387))
i=t.pendingProps,o=(l=t.memoizedState).element,ct(n,t),gt(t,i,null,r)
var a=t.memoizedState
if(i=a.element,l.isDehydrated){if(l={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=l,t.memoizedState=l,256&t.flags){t=Ar(n,t,i,r,o=hr(Error(e(423)),t))
break e}if(i!==o){t=Ar(n,t,i,r,o=hr(Error(e(424)),t))
break e}for(Pu=yn(t.stateNode.containerInfo.firstChild),Hu=t,Lu=!0,_u=null,r=Ou(t,null,i,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(Jn(),i===o){t=Or(n,t,r)
break e}kr(n,t,i,r)}t=t.child}return t
case 5:return yt(t),null===n&&Un(t),i=t.type,o=t.pendingProps,l=null!==n?n.memoizedProps:null,a=o.children,vn(i,o)?a=null:null!==l&&vn(i,l)&&(t.flags|=32),Cr(n,t),kr(n,t,a,r),t.child
case 6:return null===n&&Un(t),null
case 13:return zr(n,t,r)
case 4:return bt(t,t.stateNode.containerInfo),i=t.pendingProps,null===n?t.child=Nu(t,null,i,r):kr(n,t,i,r),t.child
case 11:return i=t.type,o=t.pendingProps,Ir(n,t,i,o=t.elementType===i?o:ur(i,o),r)
case 7:return kr(n,t,t.pendingProps,r),t.child
case 8:case 12:return kr(n,t,t.pendingProps.children,r),t.child
case 10:e:{if(i=t.type.S,o=t.pendingProps,l=t.memoizedProps,a=o.value,Tn(Ru,i.m),i.m=a,null!==l)if(Aa(l.value,a)){if(l.children===o.children&&!xu.current){t=Or(n,t,r)
break e}}else for(null!==(l=t.child)&&(l.return=t);null!==l;){var u=l.dependencies
if(null!==u){a=l.child
for(var s=u.firstContext;null!==s;){if(s.context===i){if(1===l.tag){(s=ft(-1,r&-r)).tag=2
var c=l.updateQueue
if(null!==c){var f=(c=c.shared).pending
null===f?s.next=s:(s.next=f.next,f.next=s),c.pending=s}}l.lanes|=r,null!==(s=l.alternate)&&(s.lanes|=r),rt(l.return,r,t),u.lanes|=r
break}s=s.next}}else if(10===l.tag)a=l.type===t.type?null:l.child
else if(18===l.tag){if(null===(a=l.return))throw Error(e(341))
a.lanes|=r,null!==(u=a.alternate)&&(u.lanes|=r),rt(a,r,t),a=l.sibling}else a=l.child
if(null!==a)a.return=l
else for(a=l;null!==a;){if(a===t){a=null
break}if(null!==(l=a.sibling)){l.return=a.return,a=l
break}a=a.return}l=a}kr(n,t,o.children,r),t=t.child}return t
case 9:return o=t.type,i=t.pendingProps.children,it(t,r),i=i(o=ot(o)),t.flags|=1,kr(n,t,i,r),t.child
case 14:return o=ur(i=t.type,t.pendingProps),Mr(n,t,i,o=ur(i.type,o),r)
case 15:return Sr(n,t,t.type,t.pendingProps,r)
case 17:return i=t.type,o=t.pendingProps,o=t.elementType===i?o:ur(i,o),Nr(n,t),t.tag=1,Dn(i)?(n=!0,zn(t)):n=!1,it(t,r),fr(t,i,o),pr(t,i,o,r),Dr(null,t,i,!0,n,r)
case 19:return Wr(n,t,r)
case 22:return Er(n,t,r)}throw Error(e(156,t.tag))}
var rc="function"==typeof reportError?reportError:function(e){void 0}
ao.prototype.render=lo.prototype.render=function(n){var t=this.U
if(null===t)throw Error(e(409))
to(n,t,null,null)},ao.prototype.unmount=lo.prototype.unmount=function(){var e=this.U
if(null!==e){this.U=null
var n=e.containerInfo
Ii(function(){to(null,e,null,null)}),n[pu]=null}},ao.prototype.unstable_scheduleHydration=function(e){if(e){var n=ol()
e={blockedOn:null,target:e,priority:n}
for(var t=0;t<Ol.length&&0!==n&&n<Ol[t].priority;t++);Ol.splice(t,0,e),0===t&&he(e)}},tl=function(e){switch(e.tag){case 3:var n=e.stateNode
if(n.current.memoizedState.isDehydrated){var t=re(n.pendingLanes)
0!==t&&(ce(n,1|t),mi(n,wl()),!(6&js)&&(Us=wl()+500,Ln()))}break
case 13:Ii(function(){var n=ut(e,1)
if(null!==n){var t=pi()
gi(n,e,1,t)}}),oo(e,1)}},rl=function(e){if(13===e.tag){var n=ut(e,134217728)
null!==n&&gi(n,e,134217728,pi()),oo(e,134217728)}},il=function(e){if(13===e.tag){var n=hi(e),t=ut(e,n)
null!==t&&gi(t,e,n,pi()),oo(e,n)}},ol=function(){return $l},ll=function(e,n){var t=$l
try{return $l=e,n()}finally{$l=t}},Ko=function(n,t,r){switch(t){case"input":if(x(n,r),t=r.name,"radio"===r.type&&null!=t){for(r=n;r.parentNode;)r=r.parentNode
for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var i=r[t]
if(i!==n&&i.form===n.form){var o=Sn(i)
if(!o)throw Error(e(90))
m(i),x(i,o)}}}break
case"textarea":D(n,r)
break
case"select":null!=(t=r.value)&&M(n,!!r.multiple,t,!1)}},G=ki,V=Ii
var ic={usingClientEntryPoint:!1,Events:[In,Mn,Sn,B,U,ki]},oc={findFiberByHostInstance:kn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lc={bundleType:oc.bundleType,version:oc.version,rendererPackageName:oc.rendererPackageName,rendererConfig:oc.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Co.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=ne(e))?null:e.stateNode},findFiberByHostInstance:oc.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"}
if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ac=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(!ac.isDisabled&&ac.supportsFiber)try{El=ac.inject(lc),Cl=ac}catch(Eo){}}return z.h=ic,z.createPortal=function(n,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null
if(!uo(t))throw Error(e(200))
return function(e,n,t){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:Fo,key:null==r?null:""+r,children:e,containerInfo:n,implementation:t}}(n,t,null,r)},z.createRoot=function(n,t){if(!uo(n))throw Error(e(299))
var r=!1,i="",o=rc
return null!=t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(i=t.identifierPrefix),void 0!==t.onRecoverableError&&(o=t.onRecoverableError)),t=qi(n,1,!1,null,0,r,0,i,o),n[pu]=t.current,an(8===n.nodeType?n.parentNode:n),new lo(t)},z.findDOMNode=function(n){if(null==n)return null
if(1===n.nodeType)return n
var t=n.O
if(void 0===t){if("function"==typeof n.render)throw Error(e(188))
throw n=Object.keys(n).join(","),Error(e(268,n))}return null===(n=ne(t))?null:n.stateNode},z.flushSync=function(e){return Ii(e)},z.hydrate=function(n,t,r){if(!so(t))throw Error(e(200))
return fo(null,n,t,!0,r)},z.hydrateRoot=function(n,t,r){if(!uo(n))throw Error(e(405))
var i=null!=r&&r.hydratedSources||null,o=!1,l="",a=rc
if(null!=r&&(!0===r.unstable_strictMode&&(o=!0),void 0!==r.identifierPrefix&&(l=r.identifierPrefix),void 0!==r.onRecoverableError&&(a=r.onRecoverableError)),t=no(t,null,n,1,null!=r?r:null,o,0,l,a),n[pu]=t.current,an(n),i)for(n=0;n<i.length;n++)o=(o=(r=i[n]).G)(r.V),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[r,o]:t.mutableSourceEagerHydrationData.push(r,o)
return new ao(t)},z.render=function(n,t,r){if(!so(t))throw Error(e(200))
return fo(null,n,t,!1,r)},z.unmountComponentAtNode=function(n){if(!so(n))throw Error(e(40))
return!!n.Z&&(Ii(function(){fo(null,null,n,!1,function(){n.Z=null,n[pu]=null})}),!0)},z.unstable_batchedUpdates=ki,z.unstable_renderSubtreeIntoContainer=function(n,t,r,i){if(!so(r))throw Error(e(200))
if(null==n||void 0===n.O)throw Error(e(38))
return fo(n,t,r,!1,i)},z.version="18.3.1-next-f1338f8080-20240426",z}function i(){return R}function o(){let e=!1
try{const n=Object.defineProperty({},"passive",{get:()=>(e=!0,!1)})
window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}catch(n){}return e}function l(e){return e&&"string"==typeof e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):""}function a(e,n=rn){if(!e||"string"!=typeof e)return""
if(tn)try{return tn.sanitize(e,n)}catch(t){return void 0,l(e)}return(async()=>{if(!tn){const e=await g(()=>import("./purify.es-DJSf2YwI.js"),[])
tn=e.default}return tn})().then(e=>{void 0}).catch(e=>{void 0}),l(e)}function u(e){return a(e,on)}async function s(e,n={}){const t=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const n=document.cookie.split(";")
for(let t of n){const[e,n]=t.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(n)}return null}(),r={...n,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...t&&{"X-CSRF-Token":t},...n.headers}}
if(r.body&&"string"==typeof r.body)try{const e=JSON.parse(r.body)
e.Y=Date.now(),r.body=JSON.stringify(e)}catch(i){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const n=await fetch(e,r)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(n=>!e.headers.get(n)).length>0,0}(n),n}catch(o){throw void 0,o}}var c,f,d=Object.defineProperty,p=(e,n,t)=>((e,n,t)=>n in e?d(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t)(e,"symbol"!=typeof n?n+"":n,t)
!function(){function e(e){if(e.ep)return
e.ep=!0
const n=function(e){const n={}
return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?n.credentials="include":"anonymous"===e.crossOrigin?n.credentials="omit":n.credentials="same-origin",n}(e)
fetch(e.href,n)}const n=document.createElement("link").relList
if(!(n&&n.supports&&n.supports("modulepreload"))){for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n)
new MutationObserver(n=>{for(const t of n)if("childList"===t.type)for(const n of t.addedNodes)"LINK"===n.tagName&&"modulepreload"===n.rel&&e(n)}).observe(document,{childList:!0,subtree:!0})}}()
const h={},g=function(e,n,t){function r(e){const n=new Event("vite:preloadError",{cancelable:!0})
if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e}let i=Promise.resolve()
if(n&&n.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))}
document.getElementsByTagName("link")
const t=document.querySelector("meta[property=csp-nonce]"),r=t?.nonce||t?.getAttribute("nonce")
i=e(n.map(e=>{if((e=function(e){return"/"+e}(e))in h)return
h[e]=!0
const n=e.endsWith(".css"),t=n?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${e}"]${t}`))return
const i=document.createElement("link")
return i.rel=n?"stylesheet":"modulepreload",n||(i.as="script"),i.crossOrigin="",i.href=e,r&&i.setAttribute("nonce",r),document.head.appendChild(i),n?new Promise((n,t)=>{i.addEventListener("load",n),i.addEventListener("error",()=>t(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return i.then(n=>{for(const e of n||[])"rejected"===e.status&&r(e.reason)
return e().catch(r)})}
var m,v,b,w,y={exports:{}},x={},k={exports:{}},I={},M=function(){return w||(w=1,y.exports=function(){function e(e,n,t){var i,u={},s=null,c=null
for(i in void 0!==t&&(s=""+t),void 0!==n.key&&(s=""+n.key),void 0!==n.ref&&(c=n.ref),n)o.call(n,i)&&!a.hasOwnProperty(i)&&(u[i]=n[i])
if(e&&e.defaultProps)for(i in n=e.defaultProps)void 0===u[i]&&(u[i]=n[i])
return{$$typeof:r,type:e,key:s,ref:c,props:u,i:l.current}}if(b)return x
b=1
var n=t(),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=n.h.ReactCurrentOwner,a={key:!0,ref:!0,u:!0,p:!0}
return x.Fragment=i,x.jsx=e,x.jsxs=e,x}()),y.exports}(),S=t()
const E=e(S)
var C,T,F,D,j,A={},$={exports:{}},z={},H={exports:{}},P={},L=function(){if(j)return A
j=1
var e=function(){return D||(D=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),$.exports=r()),$.exports}()
return A.createRoot=e.createRoot,A.hydrateRoot=e.hydrateRoot,A}()
let _=null
const W=new Map,N=()=>{const[e,n]=S.useState({width:"undefined"!=typeof window?window.innerWidth:0,height:"undefined"!=typeof window?window.innerHeight:0,isMobile:!1,isTablet:!1,isDesktop:!1}),t=S.useCallback(e=>{const{width:t,height:r}=e
n({width:t,height:r,isMobile:t<=768,isTablet:t>768&&t<=1024,isDesktop:t>1024})},[])
return S.useEffect(()=>{let e=null,n=null
const r=()=>{e&&cancelAnimationFrame(e),n&&clearTimeout(n),n=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,n=window.innerHeight
t({width:e,height:n})})},100)}
return window.addEventListener("resize",r,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,n=window.innerHeight
t({width:e,height:n})}),()=>{window.removeEventListener("resize",r),e&&cancelAnimationFrame(e),n&&clearTimeout(n)}},[t]),e}
class O{constructor(e={}){this.hasTrackedPageView=!1,this.sessionId=null
const n=window.location.hostname,t="localhost"===n
let r
r=e.apiEndpoint?e.apiEndpoint:t||window.location.port||window.location.hostname.includes("localhost")||"3001"===window.location.port||window.location.href.includes("localhost")?"/api":"b2b.click"===n||"www.b2b.click"===n||"bounce2bounce.com"===n||"www.bounce2bounce.com"===n?"https://admin.b2b.click/api":"/api",this.config={endpoint:`${r}/analytics/track`,enabled:!1===e.enableGDPR||this.shouldTrack(),debug:e.debug||!1},this.sessionId=this.getSessionId(),this.config.debug}shouldTrack(){if("1"===navigator.doNotTrack||"1"===window.doNotTrack)return!1
const e=navigator.userAgent.toLowerCase()
return!["bot","crawler","spider","scraper","fetcher","googlebot","bingbot","slurp","duckduckbot","facebookexternalhit","twitterbot","linkedinbot","whatsapp","telegrambot","headless","phantom","selenium","puppeteer","playwright"].some(n=>e.includes(n))}getSessionId(){const e=localStorage.getItem("analytics_session_id"),n=localStorage.getItem("analytics_session_expiry"),t=Date.now()
if(e&&n&&t<parseInt(n))return e
const r="sess_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)
localStorage.setItem("analytics_session_id",r)
const i=t+18e5
return localStorage.setItem("analytics_session_expiry",i.toString()),r}getPageInfo(){const e=new URLSearchParams(window.location.search)
return{ts:Date.now(),page_url:window.location.href,page_title:document.title||"",referrer:document.referrer||void 0,utm_source:e.get("utm_source")||void 0,utm_medium:e.get("utm_medium")||void 0,utm_campaign:e.get("utm_campaign")||void 0,viewport_width:window.innerWidth||0,viewport_height:window.innerHeight||0,screen_width:screen.width||0,screen_height:screen.height||0,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||void 0,language:navigator.language||void 0}}async sendData(e){if(!this.config.enabled)return!1
try{const t=JSON.stringify(e)
if(navigator.sendBeacon){const e=new Blob([t],{type:"application/json"})
if(navigator.sendBeacon(this.config.endpoint,e))return this.config.debug,0,!0}const r=await fetch(this.config.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:t,keepalive:!0,mode:"cors"})
if(r.ok||204===r.status)return this.config.debug,0,!0
void 0
try{await r.text()}catch(n){void 0}return!1}catch(t){return"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?(this.config.debug,0):void 0,!1}}async sendPageView(){if(this.hasTrackedPageView)return this.config.debug,0,!1
const e=this.getPageInfo(),n={sessionId:this.getSessionId(),ts:Date.now(),page_url:e.page_url||window.location.href,page_title:e.page_title||document.title||"Homepage",referrer:e.referrer,utm_source:e.utm_source,utm_medium:e.utm_medium,utm_campaign:e.utm_campaign,utm_content:e.utm_content,utm_term:e.utm_term,viewport_width:e.viewport_width,viewport_height:e.viewport_height,screen_width:e.screen_width,screen_height:e.screen_height,timezone:e.timezone,language:e.language},t=await this.sendData(n)
return t&&(this.hasTrackedPageView=!0,this.config.debug),t}async sendEvent(e){if(!this.config.enabled)return!1
const n={sessionId:this.getSessionId(),ts:Date.now(),event_type:e.event||"custom_event",event:e.event||"custom_event",properties:e.properties||{},...e}
return this.config.debug,0,await this.sendData(n)}trackLinkClick(e,n){if(this.config.enabled)try{const t=new URL(e,window.location.href),r=window.location.hostname
t.hostname!==r&&this.sendEvent({page_url:`${window.location.href}#link-click`,page_title:`Link Click: ${n||e}`,referrer:window.location.href})}catch(t){this.config.debug,0}}getConfig(){return{...this.config}}isEnabled(){return this.config.enabled}grantGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","granted"),this.sendPageView()}revokeGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","denied"),this.clearSessionData()}clearSessionData(){localStorage.removeItem("analytics_session_id"),localStorage.removeItem("analytics_session_start"),this.sessionId=null}}let R=null
const Z=()=>{const e=S.useRef(!1)
S.useEffect(()=>{const n=i()
!e.current&&n&&n.isEnabled()&&(e.current=!0)},[])
const n=S.useCallback(e=>{!function(e){R&&R.sendEvent(e)}(e)},[]),t=S.useCallback((e,n="")=>{const t=i()
t&&t.isEnabled()&&t.trackLinkClick(e,n)},[]),r=S.useCallback((e,n={})=>{const t=i()
t&&t.isEnabled()&&t.sendEvent({event:e,properties:n,timestamp:Date.now()})},[]),o=i()
return{track:n,trackLinkClick:t,trackEvent:r,isTrackingEnabled:!!o&&o.isEnabled()}}
var B,U
const G=e(function(){function e(o,l){if(o===l)return!0
if(o&&l&&"object"==typeof o&&"object"==typeof l){if(o.constructor!==l.constructor)return!1
var a,u,s,c
if(Array.isArray(o)){if((a=o.length)!=l.length)return!1
for(u=a;0!==u--;)if(!e(o[u],l[u]))return!1
return!0}if(t&&o instanceof Map&&l instanceof Map){if(o.size!==l.size)return!1
for(c=o.entries();!(u=c.next()).done;)if(!l.has(u.value[0]))return!1
for(c=o.entries();!(u=c.next()).done;)if(!e(u.value[1],l.get(u.value[0])))return!1
return!0}if(r&&o instanceof Set&&l instanceof Set){if(o.size!==l.size)return!1
for(c=o.entries();!(u=c.next()).done;)if(!l.has(u.value[0]))return!1
return!0}if(i&&ArrayBuffer.isView(o)&&ArrayBuffer.isView(l)){if((a=o.length)!=l.length)return!1
for(u=a;0!==u--;)if(o[u]!==l[u])return!1
return!0}if(o.constructor===RegExp)return o.source===l.source&&o.flags===l.flags
if(o.valueOf!==Object.prototype.valueOf&&"function"==typeof o.valueOf&&"function"==typeof l.valueOf)return o.valueOf()===l.valueOf()
if(o.toString!==Object.prototype.toString&&"function"==typeof o.toString&&"function"==typeof l.toString)return o.toString()===l.toString()
if((a=(s=Object.keys(o)).length)!==Object.keys(l).length)return!1
for(u=a;0!==u--;)if(!Object.prototype.hasOwnProperty.call(l,s[u]))return!1
if(n&&o instanceof Element)return!1
for(u=a;0!==u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!o.$$typeof)&&!e(o[s[u]],l[s[u]]))return!1
return!0}return o!=o&&l!=l}if(U)return B
U=1
var n="undefined"!=typeof Element,t="function"==typeof Map,r="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return B=function(n,t){try{return e(n,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var V,Y
const J=e(function(){return Y?V:(Y=1,V=function(e,n,t,r,i,o,l,a){if(!e){var u
if(void 0===n)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var s=[t,r,i,o,l,a],c=0;(u=new Error(n.replace(/%s/g,function(){return s[c++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}})}())
var K,Q
const X=e(function(){return Q?K:(Q=1,K=function(e,n,t,r){var i=t?t.call(r,e,n):void 0
if(void 0!==i)return!!i
if(e===n)return!0
if("object"!=typeof e||!e||"object"!=typeof n||!n)return!1
var o=Object.keys(e),l=Object.keys(n)
if(o.length!==l.length)return!1
for(var a=Object.prototype.hasOwnProperty.bind(n),u=0;u<o.length;u++){var s=o[u]
if(!a(s))return!1
var c=e[s],f=n[s]
if(!1===(i=t?t.call(r,c,f,s):void 0)||void 0===i&&c!==f)return!1}return!0})}())
var q=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(q||{}),ee={rel:["amphtml","canonical","alternate"]},ne={type:["application/ld+json"]},te={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},re=Object.values(q),ie={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},oe=Object.entries(ie).reduce((e,[n,t])=>(e[t]=n,e),{}),le="data-rh",ae=(e,n)=>{for(let t=e.length-1;t>=0;t-=1){const r=e[t]
if(Object.prototype.hasOwnProperty.call(r,n))return r[n]}return null},ue=e=>{let n=ae(e,"title")
const t=ae(e,"titleTemplate")
if(Array.isArray(n)&&(n=n.join("")),t&&n)return t.replace(/%s/g,()=>n)
const r=ae(e,"defaultTitle")
return n||r||void 0},se=e=>ae(e,"onChangeClientState")||(()=>{}),ce=(e,n)=>n.filter(n=>void 0!==n[e]).map(n=>n[e]).reduce((e,n)=>({...e,...n}),{}),fe=(e,n)=>n.filter(e=>void 0!==e.base).map(e=>e.base).reverse().reduce((n,t)=>{if(!n.length){const r=Object.keys(t)
for(let i=0;i<r.length;i+=1){const o=r[i].toLowerCase()
if(-1!==e.indexOf(o)&&t[o])return n.concat(t)}}return n},[]),de=(e,n,t)=>{const r={}
return t.filter(n=>!!Array.isArray(n[e])||(void 0!==n[e]&&(n[e],console&&"function"==typeof console.warn,0),!1)).map(n=>n[e]).reverse().reduce((e,t)=>{const i={}
t.filter(e=>{let t
const o=Object.keys(e)
for(let r=0;r<o.length;r+=1){const i=o[r],l=i.toLowerCase();-1===n.indexOf(l)||"rel"===t&&"canonical"===e[t].toLowerCase()||"rel"===l&&"stylesheet"===e[l].toLowerCase()||(t=l),-1===n.indexOf(i)||"innerHTML"!==i&&"cssText"!==i&&"itemprop"!==i||(t=i)}if(!t||!e[t])return!1
const l=e[t].toLowerCase()
return r[t]||(r[t]={}),i[t]||(i[t]={}),!r[t][l]&&(i[t][l]=!0,!0)}).reverse().forEach(n=>e.push(n))
const o=Object.keys(i)
for(let n=0;n<o.length;n+=1){const e=o[n],t={...r[e],...i[e]}
r[e]=t}return e},[]).reverse()},pe=(e,n)=>{if(Array.isArray(e)&&e.length)for(let t=0;t<e.length;t+=1)if(e[t][n])return!0
return!1},he=e=>Array.isArray(e)?e.join(""):e,ge=(e,n)=>Array.isArray(e)?e.reduce((e,t)=>(((e,n)=>{const t=Object.keys(e)
for(let r=0;r<t.length;r+=1)if(n[t[r]]&&n[t[r]].includes(e[t[r]]))return!0
return!1})(t,n)?e.priority.push(t):e.default.push(t),e),{priority:[],default:[]}):{default:e,priority:[]},me=(e,n)=>({...e,[n]:void 0}),ve=["noscript","script","style"],be=(e,n=!0)=>!1===n?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),we=e=>Object.keys(e).reduce((n,t)=>{const r=void 0!==e[t]?`${t}="${e[t]}"`:`${t}`
return n?`${n} ${r}`:r},""),ye=(e,n={})=>Object.keys(e).reduce((n,t)=>(n[ie[t]||t]=e[t],n),n),xe=(e,n)=>n.map((n,t)=>{const r={key:t,[le]:!0}
return Object.keys(n).forEach(e=>{const t=ie[e]||e
if("innerHTML"===t||"cssText"===t){const e=n.innerHTML||n.cssText
r.dangerouslySetInnerHTML={j:e}}else r[t]=n[e]}),E.createElement(e,r)}),ke=(e,n,t=!0)=>{switch(e){case"title":return{toComponent:()=>((e,n,t)=>{const r=ye(t,{key:n,[le]:!0})
return[E.createElement("title",r,n)]})(0,n.title,n.titleAttributes),toString:()=>((e,n,t,r)=>{const i=we(t),o=he(n)
return i?`<${e} ${le}="true" ${i}>${be(o,r)}</${e}>`:`<${e} ${le}="true">${be(o,r)}</${e}>`})(e,n.title,n.titleAttributes,t)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>ye(n),toString:()=>we(n)}
default:return{toComponent:()=>xe(e,n),toString:()=>((e,n,t=!0)=>n.reduce((n,r)=>{const i=r,o=Object.keys(i).filter(e=>!("innerHTML"===e||"cssText"===e)).reduce((e,n)=>{const r=void 0===i[n]?n:`${n}="${be(i[n],t)}"`
return e?`${e} ${r}`:r},""),l=i.innerHTML||i.cssText||"",a=-1===ve.indexOf(e)
return`${n}<${e} ${le}="true" ${o}${a?"/>":`>${l}</${e}>`}`},""))(e,n,t)}}},Ie=e=>{const{baseTag:n,bodyAttributes:t,encode:r=!0,htmlAttributes:i,noscriptTags:o,styleTags:l,title:a="",titleAttributes:u,prioritizeSeoTags:s}=e
let{linkTags:c,metaTags:f,scriptTags:d}=e,p={toComponent:()=>{},toString:()=>""}
return s&&({priorityMethods:p,linkTags:c,metaTags:f,scriptTags:d}=(({metaTags:e,linkTags:n,scriptTags:t,encode:r})=>{const i=ge(e,te),o=ge(n,ee),l=ge(t,ne)
return{priorityMethods:{toComponent:()=>[...xe("meta",i.priority),...xe("link",o.priority),...xe("script",l.priority)],toString:()=>`${ke("meta",i.priority,r)} ${ke("link",o.priority,r)} ${ke("script",l.priority,r)}`},metaTags:i.default,linkTags:o.default,scriptTags:l.default}})(e)),{priority:p,base:ke("base",n,r),bodyAttributes:ke("bodyAttributes",t,r),htmlAttributes:ke("htmlAttributes",i,r),link:ke("link",c,r),meta:ke("meta",f,r),noscript:ke("noscript",o,r),script:ke("script",d,r),style:ke("style",l,r),title:ke("title",{title:a,titleAttributes:u},r)}},Me=[],Se=!("undefined"==typeof window||!window.document||!window.document.createElement),Ee=class{constructor(e,n){p(this,"instances",[]),p(this,"canUseDOM",Se),p(this,"context"),p(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Me:this.instances,add:e=>{(this.canUseDOM?Me:this.instances).push(e)},remove:e=>{const n=(this.canUseDOM?Me:this.instances).indexOf(e);(this.canUseDOM?Me:this.instances).splice(n,1)}}}),this.context=e,this.canUseDOM=n||!1,n||(e.helmet=Ie({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Ce=E.createContext({}),Te=(c=class extends S.Component{constructor(e){super(e),p(this,"helmetData"),this.helmetData=new Ee(this.props.context||{},c.canUseDOM)}render(){return E.createElement(Ce.Provider,{value:this.helmetData.value},this.props.children)}},p(c,"canUseDOM",Se),c),Fe=(e,n)=>{const t=document.head||document.querySelector("head"),r=t.querySelectorAll(`${e}[${le}]`),i=[].slice.call(r),o=[]
let l
return n&&n.length&&n.forEach(n=>{const t=document.createElement(e)
for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))if("innerHTML"===e)t.innerHTML=n.innerHTML
else if("cssText"===e)t.styleSheet?t.styleSheet.cssText=n.cssText:t.appendChild(document.createTextNode(n.cssText))
else{const r=e,i=void 0===n[r]?"":n[r]
t.setAttribute(e,i)}t.setAttribute(le,"true"),i.some((e,n)=>(l=n,t.isEqualNode(e)))?i.splice(l,1):o.push(t)}),i.forEach(e=>e.parentNode?.removeChild(e)),o.forEach(e=>t.appendChild(e)),{oldTags:i,newTags:o}},De=(e,n)=>{const t=document.getElementsByTagName(e)[0]
if(!t)return
const r=t.getAttribute(le),i=r?r.split(","):[],o=[...i],l=Object.keys(n)
for(const a of l){const e=n[a]||""
t.getAttribute(a)!==e&&t.setAttribute(a,e),-1===i.indexOf(a)&&i.push(a)
const r=o.indexOf(a);-1!==r&&o.splice(r,1)}for(let a=o.length-1;a>=0;a-=1)t.removeAttribute(o[a])
i.length===o.length?t.removeAttribute(le):t.getAttribute(le)!==l.join(",")&&t.setAttribute(le,l.join(","))},je=(e,n)=>{const{baseTag:t,bodyAttributes:r,htmlAttributes:i,linkTags:o,metaTags:l,noscriptTags:a,onChangeClientState:u,scriptTags:s,styleTags:c,title:f,titleAttributes:d}=e
De("body",r),De("html",i),((e,n)=>{void 0!==e&&document.title!==e&&(document.title=he(e)),De("title",n)})(f,d)
const p={baseTag:Fe("base",t),linkTags:Fe("link",o),metaTags:Fe("meta",l),noscriptTags:Fe("noscript",a),scriptTags:Fe("script",s),styleTags:Fe("style",c)},h={},g={}
Object.keys(p).forEach(e=>{const{newTags:n,oldTags:t}=p[e]
n.length&&(h[e]=n),t.length&&(g[e]=p[e].oldTags)}),n&&n(),u(e,h,g)},Ae=null,$e=class extends S.Component{constructor(){super(...arguments),p(this,"rendered",!1)}shouldComponentUpdate(e){return!X(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context
e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:n}=this.props.context
let t=null
const r=(i=e.get().map(e=>{const n={...e.props}
return delete n.context,n}),{baseTag:fe(["href"],i),bodyAttributes:ce("bodyAttributes",i),defer:ae(i,"defer"),encode:ae(i,"encodeSpecialCharacters"),htmlAttributes:ce("htmlAttributes",i),linkTags:de("link",["rel","href"],i),metaTags:de("meta",["name","charset","http-equiv","property","itemprop"],i),noscriptTags:de("noscript",["innerHTML"],i),onChangeClientState:se(i),scriptTags:de("script",["src","innerHTML"],i),styleTags:de("style",["cssText"],i),title:ue(i),titleAttributes:ce("titleAttributes",i),prioritizeSeoTags:pe(i,"prioritizeSeoTags")})
var i,o
Te.canUseDOM?(o=r,Ae&&cancelAnimationFrame(Ae),void(o.defer?Ae=requestAnimationFrame(()=>{je(o,()=>{Ae=null})}):(je(o),Ae=null))):Ie&&(t=Ie(r)),n(t)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:e}=this.props.context
e.add(this),this.emitChange()}render(){return this.init(),null}},ze=(f=class extends S.Component{shouldComponentUpdate(e){return!G(me(this.props,"helmetData"),me(e,"helmetData"))}mapNestedChildrenToProps(e,n){if(!n)return null
switch(e.type){case"script":case"noscript":return{innerHTML:n}
case"style":return{cssText:n}
default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,n,t,r){return{...n,[e.type]:[...n[e.type]||[],{...t,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,n,t,r){switch(e.type){case"title":return{...n,[e.type]:r,titleAttributes:{...t}}
case"body":return{...n,bodyAttributes:{...t}}
case"html":return{...n,htmlAttributes:{...t}}
default:return{...n,[e.type]:{...t}}}}mapArrayTypeChildrenToProps(e,n){let t={...n}
return Object.keys(e).forEach(n=>{t={...t,[n]:e[n]}}),t}warnOnInvalidChildren(e,n){return J(re.some(n=>e.type===n),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${re.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),J(!n||"string"==typeof n||Array.isArray(n)&&!n.some(e=>"string"!=typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,n){let t={}
return E.Children.forEach(e,e=>{if(!e||!e.props)return
const{children:r,...i}=e.props,o=Object.keys(i).reduce((e,n)=>(e[oe[n]||n]=i[n],e),{})
let{type:l}=e
switch("symbol"==typeof l?l=l.toString():this.warnOnInvalidChildren(e,r),l){case"Symbol(react.fragment)":n=this.mapChildrenToProps(r,n)
break
case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(e,t,o,r)
break
default:n=this.mapObjectTypeChildren(e,n,o,r)}}),this.mapArrayTypeChildrenToProps(t,n)}render(){const{children:e,...n}=this.props
let t={...n},{helmetData:r}=n
return e&&(t=this.mapChildrenToProps(e,t)),!r||r instanceof Ee||(r=new Ee(r.context,!0),delete t.helmetData),r?E.createElement($e,{...t,context:r.value}):E.createElement(Ce.Consumer,null,e=>E.createElement($e,{...t,context:e}))}},p(f,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),f)
const He={DASHBOARD_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/seo":"https://admin.b2b.click/api/settings/seo",MAINTENANCE_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/maintenance-status":"https://admin.b2b.click/api/settings/maintenance-status"},Pe={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let Le=null,_e=0
const We=async()=>{try{const e=Date.now(),n=e-_e
if(Le&&n<36e4)return void 0,n>288e3&&setTimeout(()=>async function(){try{return Le=null,_e=0,await We()}catch(e){Le=oldCache,_e=oldTimestamp}}(),100),Le
const t=new AbortController,r=setTimeout(()=>t.abort(),8e3),i=await fetch(He.DASHBOARD_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors",signal:t.signal})
if(clearTimeout(r),!i.ok)throw void 0,new Error(`HTTP ${i.status}: ${i.statusText}`)
const o=i.headers.get("content-type")
if(!o||!o.includes("application/json"))throw void 0,new Error("API returned HTML instead of JSON - possible routing issue")
const l=await i.json()
if(l.success&&l.settings)return Le={...Pe,...l.settings},_e=e,Le
throw void 0,new Error("Invalid API response format")}catch(e){return Le?(void 0,Le):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,Pe)}},Ne=async()=>{try{void 0
const e=await fetch(He.MAINTENANCE_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors"})
if(!e.ok)return void 0,{maintenance_mode:!1}
const n=await e.json()
return void 0!==n.success?(void 0,{maintenance_mode:n.maintenance_mode||!1,maintenance_message:n.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:n.estimated_downtime||"2 hours",contact_information:n.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},Oe="seo_settings_cache",Re=()=>{try{localStorage.removeItem(Oe)}catch(e){void 0}},Ze=e=>{try{const n={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},t=JSON.stringify(n)
t.length>5e4&&(void 0,Re()),localStorage.setItem(Oe,t)}catch(n){if("QuotaExceededError"===n.name){void 0,Re()
try{const n={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(Oe,JSON.stringify(n))}catch(t){void 0}}else void 0}},Be=S.createContext(),Ue=({children:e})=>{const[n,t]=S.useState(Pe),[r,i]=S.useState({maintenance_mode:!1}),[o,l]=S.useState(!0),[a,u]=S.useState(null),[s,c]=S.useState({isMobile:!1,deviceType:"unknown"}),f=async(e=!0)=>{try{if(l(!0),e){const e=(()=>{try{const e=localStorage.getItem(Oe)
if(e){const{data:n,timestamp:t}=JSON.parse(e)
if(Date.now()-t<3e4)return void 0,n}}catch(e){void 0,Re()}return null})()
if(e)return t(e),l(!1),d(),void 0}await d()}catch(n){void 0,t(Pe)}finally{l(!1)}},d=async()=>{try{void 0
const[e,n]=await Promise.all([We(),Ne()])
t(e),i(n),u(new Date),Ze(e)}catch(e){void 0}}
S.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n),r=e<=768||t
let i="desktop"
r&&(i=e<=480?"mobile":"tablet"),c({isMobile:r,deviceType:i})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),S.useEffect(()=>{f()},[]),S.useEffect(()=>{const e=setInterval(()=>{void 0,d()},3e5)
return()=>clearInterval(e)},[])
const p=S.useMemo(()=>n?(void 0,((e,n={})=>{const t={...Pe,...e},{isMobile:r=!1}=n,i=(o=t.default_og_image)?o.startsWith("http")?o:o.startsWith("/uploads/")?`https://admin.b2b.click${o}`:`https://b2b.click${o}`:"https://admin.b2b.click/images/og-image.png"
var o
const l=[{name:"description",content:t.default_description},{name:"keywords",content:t.default_keywords},{name:"author",content:t.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:t.default_title},{property:"og:description",content:t.default_description},{property:"og:image",content:i},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${t.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:t.twitter_handle},{name:"twitter:creator",content:t.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:t.default_title},{name:"twitter:description",content:t.default_description},{name:"twitter:image",content:i},{name:"twitter:image:alt",content:`${t.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&l.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:t.default_title,meta:l,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(n,s)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[n,s]),h={seoSettings:n,maintenanceStatus:r,metaTags:p,isLoading:o,lastUpdated:a,deviceInfo:s,refreshSEOSettings:async()=>{void 0,await f(!1)},updateSEOSetting:(e,n)=>{t(t=>{const r={...t,[e]:n}
return Ze(r),r}),u(new Date)},clearCache:()=>{Re()},loadSEOSettings:f,isMaintenanceMode:()=>r.maintenance_mode}
return M.jsx(Be.Provider,{value:h,children:M.jsxs(Te,{children:[M.jsxs(ze,{children:[M.jsx("title",{children:p.title}),p.meta.map((e,n)=>e.name?M.jsx("meta",{name:e.name,content:e.content},`meta-${n}`):e.property?M.jsx("meta",{property:e.property,content:e.content},`meta-${n}`):null),p.link.map((e,n)=>M.jsx("link",{...e},`link-${n}`))]}),e]})})},Ge=()=>{const e=S.useContext(Be)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},Ve=()=>(Ge(),S.useState(!0),null),Ye=()=>{const{maintenanceStatus:e}=Ge(),[n,t]=S.useState(!1)
if(S.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
t(e<=768||r)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:n?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:n?"20px":"40px",overflow:"hidden"},i={fontSize:n?"64px":"96px",marginBottom:n?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},o={fontSize:n?"28px":"48px",marginBottom:n?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},l={fontSize:n?"16px":"20px",marginBottom:n?"24px":"32px",maxWidth:n?"320px":"600px",lineHeight:1.6,opacity:.9},a={fontSize:n?"14px":"18px",marginBottom:n?"20px":"24px",opacity:.8,padding:n?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:n?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},u={fontSize:n?"12px":"16px",opacity:.6,marginTop:n?"20px":"32px"}
return M.jsxs("div",{style:r,children:[M.jsx("div",{style:i,children:"\ud83d\udd27"}),M.jsx("h1",{style:o,children:e.maintenance_title||"Site Under Maintenance"}),M.jsx("p",{style:l,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&M.jsxs("div",{style:a,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&M.jsxs("p",{style:u,children:["Questions? Contact us: ",e.contact_information]}),M.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:n?"80px":"120px",height:n?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),M.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:n?"60px":"100px",height:n?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})},Je=()=>{const e=navigator.userAgent||"",n=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),t=window.innerWidth<=768,r="ontouchstart"in window||navigator.maxTouchPoints>0
return n||t&&r},Ke=()=>{const e=navigator.userAgent||""
return{isIOS:/iPad|iPhone|iPod/.test(e),isAndroid:/Android/.test(e),isSafari:/Safari/.test(e)&&!/Chrome/.test(e),isChrome:/Chrome/.test(e),isFirefox:/Firefox/.test(e),isMobile:Je(),supportsPassiveEvents:o(),supportsIntersectionObserver:"IntersectionObserver"in window,supportsRequestIdleCallback:"requestIdleCallback"in window}},Qe=(e,n,t=!1)=>{let r
return function(...i){const o=t&&!r,l=Je()?Math.max(n,100):n
clearTimeout(r),r=setTimeout(()=>{r=null,t||e.apply(this,i)},l),o&&e.apply(this,i)}},Xe={forceGC(){window.gc&&window.gc()},getMemoryInfo(){if("memory"in performance){const e=performance.memory
return{used:e.usedJSHeapSize,total:e.totalJSHeapSize,limit:e.jsHeapSizeLimit,usageRatio:e.usedJSHeapSize/e.jsHeapSizeLimit}}return null},isMemoryPressure(){const e=this.getMemoryInfo()
return!!e&&e.usageRatio>.8},cleanupBlobUrls(){void 0}},qe={setMobileViewport(){let e=document.querySelector('meta[name="viewport"]')
e||(e=document.createElement("meta"),e.name="viewport",document.head.appendChild(e)),e.content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},fixIOSViewport(){if(Ke().isIOS){const e=()=>{const e=.01*window.innerHeight
document.documentElement.style.setProperty("--vh",`${e}px`)}
e(),window.addEventListener("resize",Qe(e,100),{passive:!0}),window.addEventListener("orientationchange",Qe(e,100),{passive:!0})}},getSafeAreaInsets(){const e=getComputedStyle(document.documentElement)
return{top:e.getPropertyValue("--sat")||e.getPropertyValue("env(safe-area-inset-top)")||"0px",right:e.getPropertyValue("--sar")||e.getPropertyValue("env(safe-area-inset-right)")||"0px",bottom:e.getPropertyValue("--sab")||e.getPropertyValue("env(safe-area-inset-bottom)")||"0px",left:e.getPropertyValue("--sal")||e.getPropertyValue("env(safe-area-inset-left)")||"0px"}}},en={trackMetrics(){if("performance"in window){const e=performance.getEntriesByType("navigation")[0],n=performance.getEntriesByType("paint")
return void 0,{domContentLoaded:e.domContentLoadedEventEnd-e.domContentLoadedEventStart,loadComplete:e.loadEventEnd-e.loadEventStart,firstPaint:n.find(e=>"first-paint"===e.name)?.startTime||0,firstContentfulPaint:n.find(e=>"first-contentful-paint"===e.name)?.startTime||0,memoryInfo:Xe.getMemoryInfo()}}return null},startMonitoring(){Je()&&setInterval(()=>{Xe.isMemoryPressure()&&(void 0,Xe.forceGC())},3e4)}},nn=()=>{if(Je()){void 0,qe.setMobileViewport(),qe.fixIOSViewport(),en.startMonitoring(),document.documentElement.classList.add("mobile-device")
const e=Ke()
e.isIOS&&document.documentElement.classList.add("ios"),e.isAndroid&&document.documentElement.classList.add("android"),e.isSafari&&document.documentElement.classList.add("safari"),e.isChrome&&document.documentElement.classList.add("chrome")}}
let tn=null
const rn={ALLOWED_TAGS:["p","br","strong","em","u","i","b","span","div","h1","h2","h3","h4","h5","h6","ul","ol","li","a","img","blockquote","code","pre"],ALLOWED_ATTR:["href","title","alt","src","width","height","class","id","style"],ALLOWED_URI_REGEXP:/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,FORBID_TAGS:["script","object","embed","form","input","textarea","select","button"],FORBID_ATTR:["onerror","onload","onclick","onmouseover","onfocus","onblur"],KEEP_CONTENT:!0,RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1,RETURN_DOM_IMPORT:!1,SANITIZE_DOM:!0,WHOLE_DOCUMENT:!1,FORCE_BODY:!1},on={ALLOWED_TAGS:[],ALLOWED_ATTR:[],KEEP_CONTENT:!0,ALLOW_DATA_ATTR:!1},ln=({scaledDimensions:e})=>M.jsxs("div",{style:{display:"flex",width:`${e.textUsWidth}px`,flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:"8px",flexShrink:0,paddingTop:"8px",paddingBottom:"8px"},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*e.scale))}px`,fontWeight:"800",lineHeight:"normal",letterSpacing:"-0.02em",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*e.scale))}px`,display:"flex",alignItems:"center"},children:"Text us"}),M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(10,Math.round(12*e.scale))}px`,fontWeight:"300",lineHeight:"normal",margin:"0",padding:"0",opacity:.8},children:"Exclusive events, contests, and more"}),M.jsx("iframe",{id:"laylo-drop-1nTsX",src:"https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true",style:{width:"calc(100% + 32px)",height:"60px",maxWidth:"calc(1000px + 32px)",border:"none",borderRadius:"8px",background:"transparent",marginLeft:"-16px",marginRight:"-16px",transform:"translateX(0)",overflow:"hidden"},allow:"web-share",title:"Laylo Signup Form"})]}),an=(e,n=null)=>{if(!e)return e
if("string"==typeof e&&e.includes("/api/images/serve/")){void 0
const t=e.match(/\/api\/images\/serve\/([a-f0-9-]{36})(?:\/(\w+))?/)
if(t){const e=t[1]
let r=t[2]||"medium"
return n&&(r=n<=150?"small":n<=400?"medium":"large"),void 0,`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/api/images/serve/${e}/${r}`}}if("string"==typeof e&&e.includes("/images/figma-exact/"))return`/images/optimized/${e.split("/").pop()}`
if("string"==typeof e&&e.startsWith("http")){const t=encodeURIComponent(e),r=`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/images/proxy-optimized?url=${t}`
return n?`${r}&w=${n}`:r}if("string"==typeof e&&e.startsWith("/")&&(e.includes("/api/images/serve/")||!e.includes("/images/"))){void 0
const n=e.match(/([a-f0-9-]{36})/)
if(n){const e=n[1]
return void 0,`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/api/images/serve/${e}/medium`}}if("string"==typeof e&&(e.includes("/images/")||e.includes("/custom/images/"))){const t=e.split("/").pop().replace(/\.[^/.]+$/,"")
return n?`/images/optimized/${t}-${n}w.webp`:`/images/optimized/${t}.webp`}return void 0,e},un=e=>"event"===e?[111,222,333]:"hero"===e?[350,700,1050]:[150,300,600],sn=(e,n="event")=>e?un(n).map(n=>`${an(e,n)} ${n}w`).join(", "):"",cn=(e,n="event")=>{if(!e)return""
if(/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return""
const t=("localhost"===window.location.hostname,"https://admin.b2b.click")
return un(n).map(n=>`${t}/images/proxy-optimized?url=${encodeURIComponent(e)}&w=${n}&format=avif ${n}w`).join(", ")}
if("undefined"!=typeof document){const e=document.createElement("style")
e.textContent="\n    @keyframes spin {\n      from { transform: rotate(0deg); }\n      to { transform: rotate(360deg); }\n    }\n  ",document.head.appendChild(e)}const fn=new Map,dn=new Map,pn=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2M0gwVjB6bTAgNmgyMXYzSDBWNnptMCA2aDIxdjNIMHYtM3oiIGZpbGw9IiNmZmYiLz4KPHBhdGggZD0iTTAgMGgyMXYxSDBWMHptMCAyaDIxdjFIMFYyem0wIDJoMjF2MUgwVjR6bTAgMmgyMXYxSDBWNnptMCA4aDIxdjFIMHYtMXoiIGZpbGw9IiNjZTExMjQiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"20 1234 5678",maxLength:13,digitLength:11},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI2ZmMDAwMCIvPgo8cGF0aCBkPSJNMTAuNSA0bDEgMi41aDIuNWwtMiAyIDEgMi41LTIuNS0xLTIuNSAxIDEtMi41LTItMmgyLjVsMS0yLjV6IiBmaWxsPSIjZmYwMDAwIi8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiMwMDAiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjAwMDAiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZjZTAwIi8+Cjwvc3ZnPg==",pattern:/^\d{10,12}$/,placeholder:"30 12345678",maxLength:15,digitLength:12},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZWQyOTM5Ii8+Cjwvc3ZnPg==",pattern:/^\d{9,10}$/,placeholder:"1 23 45 67 89",maxLength:14,digitLength:10},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxMC41IiBoZWlnaHQ9IjcuNSIgZmlsbD0iIzAxMjE2OSIvPgo8L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"4 1234 5678",maxLength:12,digitLength:9},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjk5MzMiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTM4ODA4Ii8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:13,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+CjxwYXRoIGQ9Ik0xMC41IDJMMTggNy41IDEwLjUgMTMgMyA3LjUgMTAuNSAyeiIgZmlsbD0iI2ZlZGYwMCIvPgo8L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"11 99999-9999",maxLength:15,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjY2UxMTI2Ii8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:13,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjMiIGZpbGw9IiNiYzAwMmQiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"90-1234-5678",maxLength:13,digitLength:11}],hn=(e,n)=>{const t="string"==typeof e?e.replace(/[^\d]/g,""):"",r=pn.find(e=>e.id===n)
if(!r||0===t.length)return t
const i=t.slice(0,r.digitLength)
switch(r.code){case"+1":return i.length<=3?i.length>0?`(${i}`:"":i.length<=6?`(${i.slice(0,3)}) ${i.slice(3)}`:`(${i.slice(0,3)}) ${i.slice(3,6)}-${i.slice(6)}`
case"+44":case"+49":return i.length<=2?i:i.length<=6?`${i.slice(0,2)} ${i.slice(2)}`:`${i.slice(0,2)} ${i.slice(2,6)} ${i.slice(6)}`
case"+33":return i.length<=1?i:i.length<=3?`${i.slice(0,1)} ${i.slice(1)}`:i.length<=5?`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3)}`:i.length<=7?`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3,5)} ${i.slice(5)}`:`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3,5)} ${i.slice(5,7)} ${i.slice(7)}`
default:return i.length<=3?i:i.length<=6?`${i.slice(0,3)} ${i.slice(3)}`:`${i.slice(0,3)} ${i.slice(3,6)} ${i.slice(6)}`}},gn=e=>pn.find(n=>n.id===e)||pn[0]
S.memo(({card:e,scaledDimensions:n})=>(S.useCallback(n=>{n.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(void 0,window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},[e.isRealEvent,e.hasTicketLink,e.ticketsUrl,e.title]),S.useCallback(()=>{e.isRealEvent&&e.hasTicketLink&&(void 0,window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},[e.isRealEvent,e.hasTicketLink,e.ticketsUrl,e.title]),S.useMemo(()=>({onMouseEnter:n=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(n.target.style.transform="scale(1.015) translateY(-2px)",n.target.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)")},onMouseLeave:e=>{e.target.style.transform="scale(1) translateY(0px)",e.target.style.boxShadow="none"},onMouseDown:n=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(n.target.style.transform="scale(0.995) translateY(0px)")},onMouseUp:n=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(n.target.style.transform="scale(1.015) translateY(-2px)")}}),[e.isRealEvent,e.ticketsUrl]),null))
const mn=S.memo(()=>{void 0,S.useEffect(()=>{const e="events-grid-scrollbar-styles"
if(!document.getElementById(e)){const n=document.createElement("style")
n.id=e,n.textContent="\n  .events-grid-scrollable::-webkit-scrollbar {\n    width: 4px;\n  }\n  .events-grid-scrollable::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .events-grid-scrollable::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 2px;\n  }\n  .events-grid-scrollable::-webkit-scrollbar-thumb:hover {\n    background: rgba(255, 255, 255, 0.5);\n  }\n",document.head.appendChild(n)}return()=>{const n=document.getElementById(e)
n&&n.remove()}},[])
const{trackEvent:e}=Z(),[n,t]=S.useState({canScrollUp:!1,canScrollDown:!1,isScrollable:!1}),r=S.useRef(null),i=S.useCallback(()=>{const e=r.current
if(!e)return
const{scrollTop:n,scrollHeight:i,clientHeight:o}=e
t({canScrollUp:n>0,canScrollDown:n<i-o-1,isScrollable:i>o})},[])
S.useEffect(()=>{i()},[i])
const[o,l]=S.useState(!0)
S.useEffect(()=>{l(!0),e("component_load",{component:"FigmaDesktop",viewport_type:"desktop"})},[e]),S.useEffect(()=>{const e=document.createElement("style")
return e.textContent="\n      @keyframes shake {\n        0%, 100% { transform: translateX(0); }\n        25% { transform: translateX(-4px); }\n        75% { transform: translateX(4px); }\n      }\n      .shake {\n        animation: shake 400ms cubic-bezier(0.4, 0, 0.2, 1);\n      }\n    ",document.head.appendChild(e),()=>{document.head.removeChild(e)}},[])
const[a,s]=S.useState(null),[c,f]=S.useState([]),[d,p]=S.useState([]),[h,g]=S.useState(""),[m,v]=S.useState(!0),[b,w]=S.useState(null),[y,x]=S.useState(""),[k,I]=S.useState(!1),[E,C]=S.useState(!1),[T,F]=S.useState("us"),[D,j]=S.useState("normal"),[A,$]=S.useState(!1),[z,H]=S.useState(!1),[P,L]=S.useState(""),[N,O]=S.useState(!1),[R,B]=S.useState(""),[U,G]=S.useState("normal"),[V,Y]=S.useState(0),[J,K]=S.useState(!1),[Q,X]=S.useState(!1),q=S.useRef(null),ee=S.useRef(null),ne=S.useRef(null),te=S.useRef(!0),[re,ie]=S.useState(!1),[oe,le]=S.useState("Events"),[ae,ue]=S.useState(!0),[se,ce]=S.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,scale:1});((e,n=null)=>{const[t,r]=S.useState({width:0,height:0}),i=S.useRef(e),o=S.useRef(n)
i.current=e,o.current=n
const l=S.useCallback(e=>{r(e),i.current&&i.current(e)},[])
return S.useEffect(()=>{void("undefined"==typeof window||_||"ResizeObserver"in window&&(_=new ResizeObserver(e=>{requestAnimationFrame(()=>{e.forEach(e=>{const n=W.get(e.target)
if(n){const{width:t,height:r}=e.contentRect
n.forEach(e=>e({width:t,height:r}))}})})})))
const e=o.current||window
if(_&&e!==window)return W.has(e)||W.set(e,new Set),W.get(e).add(l),_.observe(e),()=>{const n=W.get(e)
n&&(n.delete(l),0===n.size&&(W.delete(e),_.unobserve(e)))}
{let e=null,n=null
const t=()=>{e&&cancelAnimationFrame(e),n&&clearTimeout(n),n=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,n=window.innerHeight
l({width:e,height:n})})},100)}
return window.addEventListener("resize",t,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,n=window.innerHeight
l({width:e,height:n})}),()=>{window.removeEventListener("resize",t),e&&cancelAnimationFrame(e),n&&clearTimeout(n)}}},[l]),t})(e=>{const{width:n}=e,t=n-(n<=360?16:n<=480?24:32),r=Math.max(829,789)
let i=Math.min(t/r,1144/r)
i<.25&&(i=.25),i>1.8&&(i=1.8)
const o={heroWidth:Math.round(299*i*.9),heroHeight:Math.round(299*i*.9),rightHeroWidth:Math.round(498*i),rightHeroHeight:Math.round(299*i),gap:Math.round(32*i),containerWidth:1192,eventsWidth:Math.round(440*i),textUsWidth:Math.round(299*i),eventsTextGap:Math.round(50*i),eventCardWidth:220,eventCardHeight:85,scale:i}
ie(n<=850),ce(o)}),S.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script")
e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=e=>{void 0},e.onload=()=>{void 0},document.head.appendChild(e)}},[]),S.useCallback(e=>{if(!e)return"Asbury Park, NJ"
const n=e.split(",").map(e=>e.trim())
if(n.length>=2){const e=n[0]
return/^\d/.test(e)?n.slice(1,3).join(", "):n.slice(0,2).join(", ")}return e.length>25?e.substring(0,22)+"...":e},[])
const fe=S.useCallback(async()=>{try{v(!0),w(null)
const e="homepage-data-v2",n=fn.get(e)
if(n&&Date.now()-n.timestamp<3e5)return void 0,s(n.data.homeSettings),f(n.data.featuredEvents||[]),p(n.data.homepageEvents||[]),g(n.data.formattedDate||"March 29th, 9:00 P.M."),v(!1),void 0
const t="/api/home-settings/homepage-data"
"localhost"===window.location.hostname
const r=await fetch(t)
if(void 0,!r.ok)throw void 0,new Error(`HTTP ${r.status}: Failed to fetch homepage data`)
const i=await r.json()
if(!i||"object"!=typeof i)throw new Error("Invalid API response format")
const o=i.homeSettings||{}
o.event_title||o.artist_name
const l=Array.isArray(i.featuredEvents)?i.featuredEvents:[],a=Array.isArray(i.homepageEvents)?i.homepageEvents:[]
0===l.length,0
const u=l.filter(e=>!(!e||"object"!=typeof e||(!e.id||!e.title)&&(void 0,1))),c=a.filter(e=>!(!e||"object"!=typeof e||(!e.id||!e.title)&&(void 0,1)))
void 0,fn.set(e,{data:i,timestamp:Date.now()}),s(o),f(u),p(c)
let d=i.formattedDate||"March 29th, 9:00 P.M."
if(u.length>0&&u[0].event_date){const e=new Date(u[0].event_date),n={month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}
d=e.toLocaleDateString("en-US",n).replace(",","th,")}g(d)}catch(e){void 0,w(e.message),s({event_title:"EVENT TITLE",artist_name:"Artist Name",event_address:"101 Address Drive, Asbury Park, NJ",event_image:null,tickets_url:null,instagram_url:null,tiktok_url:null,twitter_url:null,email_url:null}),f([]),p([]),g("March 29th, 9:00 P.M.")}finally{v(!1)}},[])
S.useEffect(()=>{performance.now(),fe().finally(()=>{performance.now()})},[fe]),S.useEffect(()=>(te.current=!0,()=>{te.current=!1,ne.current&&(clearInterval(ne.current),ne.current=null)}),[]),S.useEffect(()=>{!z&&ne.current&&(clearInterval(ne.current),ne.current=null,Y(0),K(!1))},[z])
const de=S.useCallback(()=>{void 0,ne.current&&(clearInterval(ne.current),ne.current=null),Y(60),K(!1),ne.current=setInterval(()=>{if(!te.current)return ne.current&&(clearInterval(ne.current),ne.current=null),void 0
Y(e=>(void 0,e<=1?(void 0,te.current&&K(!0),ne.current&&(clearInterval(ne.current),ne.current=null),0):e-1))},1e3)},[])
S.useEffect(()=>{void 0,void 0,z&&R&&0===V&&!J&&de()},[z,R]),S.useCallback(e=>/^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/.test(e.replace(/\D/g,"")),[])
const pe=S.useCallback(async()=>{const e=y.trim()
if(!e||k)return
if("5555555555"===e.replace(/\D/g,""))return void 0,I(!0),j("loading"),setTimeout(()=>{j("valid"),B(e),I(!1),setTimeout(()=>{H(!0)},200)},800),void 0
const n=gn(T)
if(!((e,n)=>{const t=e.replace(/[^\d]/g,""),r=pn.find(e=>e.id===n)
return r?r.pattern.test(t):t.length>=10&&t.length<=15})(e,T))return void 0,j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400)),void 0
try{I(!0),j("loading")
const t=("localhost"===window.location.hostname,"https://admin.b2b.click"),r=await fetch(`${t}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:n.code})}),i=await r.json()
r.ok&&i.success?(void 0,i.requiresVerification?(void 0,j("valid"),B(e),setTimeout(()=>{H(!0)},500)):(C(!0),j("valid"),x(""),setTimeout(()=>{C(!1),j("normal")},3e3))):(void 0,j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400)))}catch(t){void 0,j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400))}finally{I(!1)}},[y,k,T]),he=S.useCallback(async()=>{const e=P.trim()
if(e&&!N){if(void 0,"5555555555"===R.replace(/\D/g,"")&&4===e.length)return G("valid"),j("valid"),C(!0),setTimeout(()=>{H(!1),L(""),B(""),x(""),C(!1),j("normal"),G("normal"),Y(0),K(!1),ne.current&&(clearInterval(ne.current),ne.current=null)},3e3),void 0
if(!/^\d{4}$/.test(e))return void 0,G("invalid"),j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400)),void 0
try{O(!0),j("loading")
const n=("localhost"===window.location.hostname,"https://admin.b2b.click"),t=await fetch(`${n}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:R,code:e})}),r=await t.json()
t.ok&&r.success?(void 0,G("valid"),j("valid"),C(!0),setTimeout(()=>{H(!1),L(""),B(""),x(""),C(!1),j("normal"),G("normal"),Y(0),K(!1),ne.current&&(clearInterval(ne.current),ne.current=null)},3e3)):(void 0,G("invalid"),j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400)))}catch(n){void 0,j("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),j("normal")},400))}finally{O(!1)}}},[P,N,R]),ge=S.useCallback(async()=>{if(J&&!Q&&R)try{X(!0)
const e=("localhost"===window.location.hostname,"https://admin.b2b.click"),n=await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:R})});(await n.json()).success,void 0,de()}catch(e){void 0,de()}finally{X(!1)}},[J,Q,R])
S.useCallback(()=>{$(!0)},[]),S.useCallback(()=>{$(!1)},[]),S.useCallback(()=>{$(!1)},[])
const me=S.useCallback(e=>{const n=e.target.value.replace(/\D/g,"")
n.length<=4&&(L(n),4===n.length?G("filled"):G("normal"))},[]),ve=S.useCallback(()=>{H(!1),L(""),B(""),j("normal")},[]),be=S.useCallback(e=>{const n=e.target,t=u(n.value),r=gn(T),i=n.selectionStart,o=t.replace(/[^\d]/g,"")
if(o.length>r.digitLength)return e.preventDefault(),void 0
const l=hn(o,T)
let a=i
if(l.length>y.length){const e=y.slice(0,i).replace(/\d/g,"").length,n=l.slice(0,i+(l.length-y.length)).replace(/\d/g,"").length
a=i+(n-e)}a=Math.min(a,l.length),a=Math.max(a,0),x(l),requestAnimationFrame(()=>{n===document.activeElement&&n.setSelectionRange(a,a)})},[T,y]),we=S.useCallback(e=>{if("Backspace"===e.key){const n=e.target,t=n.selectionStart,r=n.value
if(t>0){const i=r[t-1]
if([" ","(",")","-"].includes(i)&&t>1){e.preventDefault()
const i=(r.slice(0,t-2)+r.slice(t)).replace(/[^\d]/g,""),o=hn(i,T)
x(o),requestAnimationFrame(()=>{if(n===document.activeElement){const e=Math.max(0,t-2)
n.setSelectionRange(e,e)}})}}}},[T]),ye=S.useCallback(e=>{const n=e.target.value,t=gn(n)
if(F(n),q.current&&t.flag&&(q.current.src=t.flag,q.current.alt=t.name),y){const e=y.replace(/[^\d]/g,""),t=hn(e,n)
x(t)}void 0},[y]),xe=S.useCallback(e=>{le(e),"About"===e?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":"Contact"===e&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},[]),ke=S.useCallback((e,n)=>{const t=oe===e
return{position:"absolute",left:n,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:t?"#000":"transparent",boxShadow:t?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:t?"scale(1)":"scale(0.95)",opacity:t?1:.8}},[oe]),Ie=S.useCallback(e=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:oe===e?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"}),[oe]),Me=S.useMemo(()=>{const e=[],n=[]
c.forEach((n,t)=>{try{let r=new Date,i="Tue, Sep 02 @ 10:00PM",o="02",l="SEP"
if(n.event_date){const e=n.event_date
let t=dn.get(e)
if(t)({formattedDate:i,day:o,month:l,eventDate:r}=t)
else{const a=new Date(n.event_date)
isNaN(a.getTime())||(r=a,i=r.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit"}).replace(","," @")+" 10:00PM",o=r.getDate().toString().padStart(2,"0"),l=r.toLocaleDateString("en-US",{month:"short"}).toUpperCase(),t={formattedDate:i,day:o,month:l,eventDate:r},dn.set(e,t))}}const a=n.title||n.artist_name||`Event ${t+1}`
let u="Venue Address"
if(n.event_address){const e=n.event_address.split(",").map(e=>e.trim())
e.length>=2?(u=`${e[0]}, ${e[1]}`,u.length>25&&e.length>=3&&(u=`${e[1]}, ${e[2]}`)):u=n.event_address}const s=n.cover_image||"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIyIiBoZWlnaHQ9IjEyNCIgdmlld0JveD0iMCAwIDIyMiAxMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjIiIGhlaWdodD0iMTI0IiBmaWxsPSIjMTYxNjE2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1NjU2IiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTQiPkV2ZW50IEltYWdlPC90ZXh0Pgo8L3N2Zz4K",c=n.external_ticket_url||n.posh_embed_url||"#",f=n.display_tickets&&c&&"#"!==c
void 0,e.push({id:`event-${n.id}`,title:a,date:i,day:o,month:l,location:u,coverImage:s,ticketsUrl:c,hasTicketLink:f,buttonText:n.buy_button_text||"View Event",isRealEvent:!0,showOnHomepage:n.show_on_homepage,eventData:n,eventDate:r})}catch(r){void 0}}),e.sort((e,n)=>{const t=new Date(e.eventDate)
return new Date(n.eventDate).getTime()-t.getTime()})
const t=new Set(c.map(e=>e.id))
d.forEach((e,r)=>{if(!t.has(e.id))try{let t=new Date,r="Tue, Sep 02 @ 10:00PM",i="02"
e.event_date&&(t=new Date(e.event_date),isNaN(t.getTime())||(r=t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit",hour:"numeric",minute:"2-digit",hour12:!0}).replace(","," @"),i=t.getDate().toString().padStart(2,"0")))
const o=e.title||e.artist_name||"Event Title",l=e.event_address||e.venue_name||"Location TBA"
let a=null
e.cover_image&&(a=e.cover_image.startsWith("/")?e.cover_image:`/${e.cover_image}`)
const u=e.external_ticket_url||"#",s="#"!==u&&e.display_tickets
n.push({id:e.id,title:o,artist_name:e.artist_name||"",location:l,date:r,day:i,coverImage:a,ticketsUrl:u,hasTicketLink:s,buttonText:e.buy_button_text||"View Event",isRealEvent:!0,showOnHomepage:e.show_on_homepage,eventData:e,eventDate:t,cardType:"regular"})}catch(i){void 0}}),e.sort((e,n)=>{const t=new Date(e.eventData.created_at||e.eventDate),r=new Date(n.eventData.created_at||n.eventDate)
return t.getTime()-r.getTime()}),n.sort((e,n)=>{const t=new Date(e.eventDate)
return new Date(n.eventDate).getTime()-t.getTime()})
const r=new Date
return r.setHours(0,0,0,0),void 0,{featuredCards:e.filter(e=>{const n=new Date(e.eventDate)
return n.setHours(0,0,0,0),!!ae||n<r}),regularCards:n.filter(e=>{const n=new Date(e.eventDate)
return n.setHours(0,0,0,0),!!ae||n<r})}},[c,d,ae])
S.useEffect(()=>{Me.featuredCards&&Me.featuredCards.length>0&&(void 0,Me.featuredCards.forEach((e,n)=>{if(e.coverImage){const n=document.createElement("link")
n.rel="preload",n.as="image",n.type="image/avif"
const t=("localhost"===window.location.hostname,"https://admin.b2b.click")
n.href=`${t}/images/proxy-optimized?url=${encodeURIComponent(e.coverImage)}&w=111&format=avif`,document.head.appendChild(n)
const r=document.createElement("link")
r.rel="preload",r.as="image",r.type="image/webp",r.href=an(e.coverImage,111),document.head.appendChild(r)}}),Me.regularCards&&Me.regularCards.length>0&&Me.regularCards.slice(0,4).forEach((e,n)=>{if(e.coverImage){const n=new Image
n.src=an(e.coverImage,400),n.onload=()=>{},n.onerror=()=>{}}}))},[Me])
const Se=S.useMemo(()=>Me.featuredCards&&Me.featuredCards.length>0?Me.featuredCards[0]:null,[Me])
return m?M.jsx("div",{className:"homepage-root",children:M.jsx("div",{className:"homepage-content",children:M.jsx("div",{className:"desktop-container",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"},children:M.jsxs("div",{style:{color:"#FFF",fontSize:"18px",fontFamily:"Inter",textAlign:"center"},children:[M.jsx("div",{children:"Loading homepage data..."}),b&&M.jsxs("div",{style:{color:"#FF6B6B",fontSize:"14px",marginTop:"10px",opacity:.8},children:[b,M.jsx("div",{style:{fontSize:"12px",marginTop:"5px",opacity:.7},children:"Falling back to default content..."})]})]})})})}):(b&&!a,0,M.jsx("div",{className:"homepage-root",children:M.jsx("div",{className:"homepage-content",children:M.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${se.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"100vh",padding:"0 20px",boxSizing:"border-box"},children:M.jsxs("div",{style:{width:"100%",position:"relative"},children:[M.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[M.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.filter="brightness(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1.05)"}}),M.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[M.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),M.jsx("div",{style:ke("Events","4.21px"),onClick:()=>xe("Events"),children:M.jsx("span",{style:Ie("Events"),children:"Events"})}),M.jsx("div",{style:ke("About","100.14px"),onClick:()=>xe("About"),children:M.jsx("span",{style:Ie("About"),children:"About"})}),M.jsx("div",{style:ke("Contact","196.07px"),onClick:()=>xe("Contact"),children:M.jsx("span",{style:Ie("Contact"),children:"Contact"})})]})]}),M.jsxs("div",{style:{position:"relative",display:"flex",width:"100%",margin:"24px 0 0 0",padding:"0",flexDirection:se.containerWidth>=1024?"row":"column",gap:se.containerWidth>=1024?`${Math.max(24,Math.round(32*se.scale))}px`:"20px",alignItems:"flex-start"},children:[se.containerWidth>=1024?M.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"stretch",gap:`${Math.max(6,Math.round(8*se.scale))}px`,width:`${se.heroWidth}px`,flexShrink:0},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Up Next"}),M.jsxs("div",{onClick:e=>{void 0,e.preventDefault(),e.stopPropagation(),void 0,Se?.external_ticket_url&&window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")},style:{width:`${se.heroWidth}px`,height:`${se.heroWidth}px`,position:"relative",flexShrink:0,margin:"0",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)",e.currentTarget.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1) translateY(0px)",e.currentTarget.style.boxShadow="none"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[M.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:Se?.cover_image?M.jsxs("picture",{children:[M.jsx("source",{srcSet:cn(Se.cover_image,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),M.jsx("source",{srcSet:sn(Se.cover_image,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),M.jsx("img",{src:an(Se.cover_image,375),alt:`${Se.artist_name||Se.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>{},onError:e=>{void 0,e.target.src="/images/optimized/hero-left-image-375w.jpg"},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):M.jsxs("picture",{children:[M.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),M.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),M.jsx("img",{src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>{},onError:e=>{},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),M.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),M.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px"},children:[M.jsxs("div",{style:{display:"flex",flex:"1",padding:"4px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[M.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"2px"},children:[M.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:M.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),M.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:Se?.event_date?new Date(Se.event_date).toLocaleDateString("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).replace(",","th,"):h})]}),M.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[M.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[M.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),M.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),M.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:Se?.location||a?.event_location||"Asbury Park, NJ"})]})]}),M.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:M.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.stopPropagation(),e.target.style.transform="scale(1.05)",e.target.style.background="rgba(35, 35, 35, 0.98)",e.target.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.stopPropagation(),e.target.style.transform="scale(1)",e.target.style.background="rgba(15, 15, 15, 0.95)",e.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:e=>{e.stopPropagation(),void 0,Se?.external_ticket_url&&window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")},children:M.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:Se?.external_ticket_url?"Get Tickets":"View Event"})})})]}),M.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box"},children:M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:se.heroWidth-24+"px"},children:Se?.artist_name||Se?.title||a?.event_title||"EVENT TITLE"})})]})]}):M.jsx("div",{onClick:e=>{Se?.external_ticket_url?(void 0,window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")):void 0},style:{width:"100%",height:`${se.heroHeight}px`,position:"relative",flexShrink:0,margin:"0",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden",background:"#161616",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)"},onMouseEnter:e=>{e.target.style.transform="scale(1.005)",e.target.style.boxShadow="0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseLeave:e=>{e.target.style.transform="scale(1)",e.target.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)"}}),se.containerWidth>=1024&&M.jsxs("div",{style:{display:"flex",flex:"1",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:`${Math.max(6,Math.round(8*se.scale))}px`,minWidth:`${Math.max(450,Math.round(se.eventsWidth))}px`,maxWidth:`${Math.round(se.eventsWidth+200)}px`,height:`${Math.max(20,Math.round(26*se.scale))+Math.max(6,Math.round(8*se.scale))+se.heroWidth}px`,overflow:"hidden"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"0",padding:"0"},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Events"}),M.jsxs("div",{style:{display:"flex",width:`${Math.max(75,Math.round(95*se.scale))}px`,height:`${Math.max(22,Math.round(28*se.scale))}px`,padding:`${Math.max(1,Math.round(1.5*se.scale))}px`,justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:`${Math.max(6,Math.round(8*se.scale))}px`,background:ae?"rgba(111, 111, 111, 0.49)":"rgba(111, 111, 111, 0.69)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"},onClick:()=>ue(!ae),role:"switch","aria-checked":ae,"aria-label":`Switch to ${ae?"Past":"All"} events`,tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),ue(!ae))},children:[M.jsx("div",{style:{position:"absolute",width:`${Math.max(36,Math.round(46*se.scale))}px`,height:`${Math.max(19,Math.round(24*se.scale))}px`,borderRadius:`${Math.max(4,Math.round(6*se.scale))}px`,border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:ae?`${Math.max(1,Math.round(1.5*se.scale))}px`:`${Math.max(37,Math.round(47*se.scale))}px`,top:`${Math.max(1,Math.round(1.5*se.scale))}px`,transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),M.jsx("div",{style:{display:"flex",padding:`${Math.max(2,Math.round(3*se.scale))}px ${Math.max(7,Math.round(10*se.scale))}px`,alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:`${Math.max(5,Math.round(7*se.scale))}px`,position:"relative",zIndex:2},children:M.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:`${Math.max(9,Math.round(11*se.scale))}px`,fontStyle:"normal",fontWeight:ae?"590":"400",lineHeight:`${Math.max(12,Math.round(15*se.scale))}px`,letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"All"})}),M.jsx("div",{style:{display:"flex",padding:`${Math.max(2,Math.round(3*se.scale))}px ${Math.max(7,Math.round(10*se.scale))}px`,alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:M.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:`${Math.max(9,Math.round(11*se.scale))}px`,fontStyle:"normal",fontWeight:ae?"400":"590",lineHeight:`${Math.max(12,Math.round(15*se.scale))}px`,letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),M.jsx("div",{style:{position:"relative",width:"100%",height:`${se.heroWidth}px`},children:M.jsx("div",{ref:r,className:"events-grid-scrollable",onScroll:i,style:{position:"relative",display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gridAutoRows:"min-content",rowGap:`${Math.max(4,Math.round(8*se.scale))}px`,columnGap:`${Math.max(4,Math.round(8*se.scale))}px`,width:"100%",height:"100%",alignItems:"stretch",overflowY:"auto",overflowX:"hidden",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch",scrollbarWidth:"thin",scrollbarColor:"rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",maskImage:n.isScrollable?`linear-gradient(to bottom, ${n.canScrollUp?"transparent 0%, black 8%":"black 0%"}, black 8%, black 92%, ${n.canScrollDown?"black 92%, transparent 100%":"black 100%"})`:"none",WebkitMaskImage:n.isScrollable?`linear-gradient(to bottom, ${n.canScrollUp?"transparent 0%, black 8%":"black 0%"}, black 8%, black 92%, ${n.canScrollDown?"black 92%, transparent 100%":"black 100%"})`:"none"},children:(()=>{const e=(se.heroWidth-2*Math.max(4,Math.round(8*se.scale)))/3,n=Math.min(1,e/124)
return M.jsx(M.Fragment,{children:0===Me.regularCards.length&&0===Me.featuredCards.length?M.jsxs("div",{style:{gridColumn:"1 / -1",gridRow:"1 / -1",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[M.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:"0.8"},children:"No Events Available"}),M.jsx("div",{style:{fontSize:"14px",fontWeight:"400",opacity:"0.6",maxWidth:"300px",lineHeight:"1.4"},children:'Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.'})]}):[...Me.featuredCards,...Me.regularCards].slice(0,6).map((e,t)=>M.jsx("article",{style:{display:"block",width:"100%",height:"100%",minHeight:"90px",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform",zIndex:1,clear:"both"},children:M.jsxs("div",{style:{width:"100%",height:`${Math.max(87,Math.round(124*n)-6)}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:`${Math.max(6,Math.round(8*n))}px`},children:[M.jsx("div",{style:{position:"absolute",left:`${Math.max(6,Math.round(8*n))}px`,top:`${Math.max(6,Math.round(8*n))}px`,width:`${Math.max(79,Math.round(105*n))}px`,height:`${Math.max(79,Math.round(105*n))}px`,flexShrink:0,borderRadius:`${Math.max(13,Math.round(18*n))}px`,overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:e=>{e.preventDefault(),e.stopPropagation()},children:M.jsx("img",{src:e.coverImage||e.image_url||"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",alt:`${e.title} event cover`,loading:"lazy",onError:e=>{e.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K"},onLoad:e=>{e.target.style.backgroundColor="transparent"},style:{width:"100%",height:"100%",borderRadius:`${Math.max(13,Math.round(18*n))}px`,objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),M.jsxs("div",{style:{display:"flex",width:`calc(100% - ${Math.max(99,Math.round(125*n))}px)`,padding:`${Math.max(1,Math.round(2*n))}px ${Math.max(6,Math.round(8*n))}px ${Math.max(1,Math.round(2*n))}px ${Math.max(6,Math.round(8*n))}px`,flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:`${Math.max(99,Math.round(125*n))}px`,top:`${Math.max(6,Math.round(8*n))}px`,height:`${Math.max(79,Math.round(105*n))}px`,boxSizing:"border-box"},children:[M.jsxs("div",{style:{width:"100%",minHeight:`${Math.max(50,Math.round(84*n))}px`,height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[M.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:`${Math.max(10,Math.round(16*n))}px`,lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:`${Math.max(12,Math.round(20*n))}px`,height:"auto",margin:`0 0 ${Math.max(2,Math.round(4*n))}px 0`,padding:"0",overflow:"visible",textOverflow:"unset",whiteSpace:"normal",wordWrap:"break-word",hyphens:"auto"},children:e.title}),M.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:`${Math.max(3,Math.round(6*n))}px`,padding:`0px 0px 0px ${Math.max(1,Math.round(2*n))}px`},children:[M.jsx("svg",{width:Math.max(7,Math.round(12*n)),height:Math.max(7,Math.round(12*n)),viewBox:"0 0 10 10",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:M.jsx("path",{d:"M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z",fill:"currentColor"})}),M.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:`${Math.max(7,Math.round(12*n))}px`,lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:`${Math.max(8,Math.round(14*n))}px`,margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),M.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:`${Math.max(3,Math.round(6*n))}px`,padding:`0px ${Math.max(1,Math.round(2*n))}px`},children:[M.jsx("svg",{width:Math.max(7,Math.round(12*n)),height:Math.max(7,Math.round(12*n)),viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:M.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),M.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:`${Math.max(7,Math.round(12*n))}px`,lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:`${Math.max(8,Math.round(14*n))}px`,margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),M.jsx("div",{style:{width:"100%",height:`${Math.max(18,Math.round(32*n))}px`,display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:`${Math.max(3,Math.round(6*n))}px`,padding:`0px ${Math.max(1,Math.round(2*n))}px 0px 0px`,position:"absolute",bottom:`calc(100% - ${Math.max(80,Math.round(105*n))}px)`,left:"0px"},children:e.isRealEvent&&e.hasTicketLink?M.jsx("button",{onClick:n=>{n.stopPropagation(),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:`${Math.max(25,Math.round(46*n))}px`,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:`${Math.max(6,Math.round(12*n))}px`,padding:`${Math.max(8,Math.round(16*n))}px ${Math.max(8,Math.round(15*n))}px`,width:`calc(100% - ${Math.max(2,Math.round(4*n))}px)`,height:`${Math.max(18,Math.round(32*n))}px`,border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:`${Math.max(8,Math.round(14*n))}px`,lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.02)",e.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-desktop-${e.id}`))})})()})})]})]}),se.containerWidth>=1024&&M.jsxs("div",{style:{position:"relative",display:"flex",width:"100%",margin:"16px 0 0 0",padding:"0",justifyContent:"flex-start",alignItems:"flex-start",gap:"32px",flexDirection:"row"},children:[M.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:`${Math.max(6,Math.round(8*se.scale))}px`,alignItems:"flex-start"},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",letterSpacing:"-0.02em",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Watch"}),M.jsxs("div",{onClick:()=>window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank"),style:{width:`${Math.round(.75*se.rightHeroWidth)}px`,height:`${Math.round(.75*se.rightHeroHeight)}px`,position:"relative",flexShrink:0,cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"24px"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)",e.currentTarget.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1) translateY(0px)",e.currentTarget.style.boxShadow="none"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.995) translateY(0px)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)"},children:[M.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:`${Math.round(.75*se.rightHeroWidth)}px`,height:`${Math.round(.75*se.rightHeroHeight)}px`,borderRadius:"24px",overflow:"hidden"},children:[M.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"100%",height:"100%",overflow:"hidden"},children:M.jsx("iframe",{src:"https://www.youtube.com/embed/vEHTO3gf1jk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=vEHTO3gf1jk&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&quality=hd720&start=0&enablejsapi=1",title:"Henry Fong YouTube Video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,loading:"eager",style:{position:"absolute",top:"50%",left:"50%",width:"100%",height:"100%",transform:"translate(-50%, -50%) scale(1.5)",border:"none",pointerEvents:"none",opacity:1}})}),M.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"24px",zIndex:1}})]}),M.jsxs("div",{style:{position:"absolute",left:"0px",top:Math.min(Math.round(.75*se.rightHeroHeight),350)-54+"px",display:"flex",width:"100%",height:"44px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"16px",zIndex:2},children:[M.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"4px",flex:"1"},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:(Math.round(.75*se.rightHeroWidth)>=300?Math.round(.75*se.rightHeroWidth)-150:Math.round(.75*se.rightHeroWidth)-60)+"px"},children:"Watch on YouTube"}),M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"10px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live on YouTube"})]}),Math.round(.75*se.rightHeroWidth)>=300&&M.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"112px",height:"44px",justifyContent:"center",alignItems:"center",borderRadius:"22px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.target.style.transform="scale(1.05)",e.target.style.background="rgba(76, 76, 76, 0.90)"},onMouseLeave:e=>{e.target.style.transform="scale(1)",e.target.style.background="rgba(38, 38, 38, 0.80)"},onMouseDown:e=>{e.target.style.transform="scale(0.95)"},onMouseUp:e=>{e.target.style.transform="scale(1.05)"},children:M.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",lineHeight:"1.2",pointerEvents:"none"},children:"Watch now"})})]})]})]}),M.jsx(ln,{scaledDimensions:se,phoneNumber:y,setPhoneNumber:x,phoneSubmitting:k,phoneSubmitted:E,phoneInputState:D,selectedCountryId:T,setSelectedCountryId:F,flagImageRef:q,phoneContainerRef:ee,showVerification:z,verificationPhone:R,verificationCode:P,setVerificationCode:L,verificationSubmitting:N,verificationState:U,resendCountdown:V,canResend:J,resendSubmitting:Q,handlePhoneSubmit:pe,handleVerificationSubmit:he,handleResendCode:ge,handlePhoneChange:be,handlePhoneKeyDown:we,handleCountryChange:ye,handleVerificationChange:me,handleBackToPhone:ve})]}),M.jsx("div",{style:{position:"relative",display:se.containerWidth>=1024?"none":"flex",width:"100%",margin:"8px 0 0 0",padding:"0",justifyContent:"flex-start",alignItems:"flex-start",gap:`${se.eventsTextGap}px`,flexDirection:re?"column":"row"},children:M.jsxs("div",{style:{display:"flex",width:`${se.eventsWidth}px`,flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:"21px",flexShrink:0},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"8px 0 0 0",padding:"0",alignSelf:"stretch"},children:[M.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"normal"},children:"Events"}),M.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:ae?"rgba(111, 111, 111, 0.49)":"rgba(111, 111, 111, 0.69)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"},onClick:()=>ue(!ae),role:"switch","aria-checked":ae,"aria-label":`Switch to ${ae?"Past":"All"} events`,tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),ue(!ae))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[M.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:ae?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),M.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:M.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:ae?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"All"})}),M.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:M.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:ae?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),M.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",rowGap:"16px",columnGap:"16px",alignSelf:"stretch",alignItems:"start",justifyItems:"stretch",width:"100%"},children:0===Me.regularCards.length&&0===Me.featuredCards.length?M.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[M.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:"0.8"},children:"No Events Available"}),M.jsx("div",{style:{fontSize:"14px",fontWeight:"400",opacity:"0.6",maxWidth:"300px",lineHeight:"1.4"},children:'Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.'})]}):[...Me.featuredCards,...Me.regularCards].map((e,n)=>M.jsx("article",{style:{display:"block",width:"100%",minHeight:"128px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform",zIndex:1,clear:"both"},children:M.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[M.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:e=>{e.preventDefault(),e.stopPropagation()},children:M.jsx("img",{src:an(e.coverImage,120),alt:`${e.title} event cover`,loading:"lazy",onError:e=>{void 0,e.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K"},onLoad:e=>{void 0,e.target.style.backgroundColor="transparent"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),M.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[M.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[M.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"visible",textOverflow:"unset",whiteSpace:"normal",wordWrap:"break-word",hyphens:"auto"},children:e.title}),M.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[M.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:M.jsx("path",{d:"M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z",fill:"currentColor"})}),M.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),M.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[M.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:M.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),M.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),M.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?M.jsx("button",{onClick:n=>{n.stopPropagation(),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.02)",e.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`))})]})}),M.jsx("div",{style:{position:"relative",display:"flex",justifyContent:"center",width:"100%",margin:"32px auto 0 auto",padding:"0"},children:M.jsx("img",{src:"/images/figma-exact/b2b-logo-bottom.svg",alt:"B2B LOGO",loading:"lazy",decoding:"async",fetchpriority:"low",style:{width:"100%",maxWidth:"901px",height:"auto",fill:"#101010",filter:"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}})})]})})})}))}),vn=S.lazy(()=>g(()=>import("./FigmaMobile-Xr3IVbAT.js"),__vite__mapDeps([0,1]))),bn=()=>{const[e,n]=S.useState(!1),[t,r]=S.useState(!0),{width:i,isMobile:o}=N(),{trackEvent:l,isTrackingEnabled:a}=Z(),u=(()=>{const[e,n]=S.useState(!document.hidden),[t,r]=S.useState(!0),i=S.useRef(new Set),o=S.useRef(new Set),l=S.useRef(new Map),a=S.useRef(new Set),u=S.useCallback((e,n)=>{const t=setTimeout(()=>{i.current.delete(t),e()},n)
return i.current.add(t),t},[]),s=S.useCallback((n,r)=>{const i=setInterval(()=>{e&&t&&n()},r)
return o.current.add(i),i},[e,t]),c=S.useCallback(e=>{clearTimeout(e),i.current.delete(e)},[]),f=S.useCallback(e=>{clearInterval(e),o.current.delete(e)},[]),d=S.useCallback((e,n,t,r={})=>{const i=`${e.constructor.name}-${n}`
if(l.current.has(i)){const{element:e,event:n,handler:t}=l.current.get(i)
e.removeEventListener(n,t)}return e.addEventListener(n,t,r),l.current.set(i,{element:e,event:n,handler:t}),()=>{e.removeEventListener(n,t),l.current.delete(i)}},[]),p=S.useCallback(e=>(a.current.add(e),()=>a.current.delete(e)),[]),h=S.useCallback(()=>{void 0,r(!1),a.current.forEach(e=>{try{e()}catch(n){void 0}})},[]),g=S.useCallback(()=>{void 0,r(!0)},[]),m=S.useCallback(()=>{void 0,i.current.forEach(e=>clearTimeout(e)),i.current.clear(),o.current.forEach(e=>clearInterval(e)),o.current.clear(),l.current.forEach(({element:e,event:n,handler:t})=>{try{e.removeEventListener(n,t)}catch(r){void 0}}),l.current.clear(),a.current.forEach(e=>{try{e()}catch(n){void 0}}),a.current.clear()},[])
return S.useEffect(()=>{const e=()=>{const e=!document.hidden
n(e),e?(void 0,g()):(void 0,h())},t=()=>{void 0,r(!0),g()},i=()=>{void 0,h()},o=()=>{void 0,h()},l=e=>{void 0,e.persisted,g()}
return document.addEventListener("visibilitychange",e,{passive:!0}),window.addEventListener("focus",t,{passive:!0}),window.addEventListener("blur",i,{passive:!0}),window.addEventListener("pagehide",o,{passive:!0}),window.addEventListener("pageshow",l,{passive:!0}),window.addEventListener("beforeunload",h,{passive:!0}),()=>{document.removeEventListener("visibilitychange",e),window.removeEventListener("focus",t),window.removeEventListener("blur",i),window.removeEventListener("pagehide",o),window.removeEventListener("pageshow",l),window.removeEventListener("beforeunload",h),m()}},[h,g,m]),S.useEffect(()=>{if("memory"in performance){const e=setInterval(()=>{const e=performance.memory
void 0,e.usedJSHeapSize/e.jsHeapSizeLimit>.6&&(m(),void(window.gc&&window.gc()))},6e4)
return()=>clearInterval(e)}},[m]),{isVisible:e,isActive:t,createTimer:u,createInterval:s,clearTimer:c,clearInterval:f,addEventListener:d,registerCleanup:p,pauseBackgroundProcesses:h,resumeBackgroundProcesses:g,cleanupAll:m}})()
return(()=>{const e=Ge()
return{...e,updateTitle:n=>{e.updateSEOSetting("default_title",n)},updateDescription:n=>{e.updateSEOSetting("default_description",n)},updateOGImage:n=>{e.updateSEOSetting("default_og_image",n)},updateSEOSettings:n=>{Object.entries(n).forEach(([n,t])=>{e.updateSEOSetting(n,t)})},getCurrentMetaTags:()=>e.metaTags,isMaintenanceMode:()=>e.maintenanceStatus.maintenance_mode}})(),S.useEffect(()=>{(async()=>{performance.now()
const e=Je()||o
e&&(nn(),u.registerCleanup(()=>{})),n(e),r(!1),a&&setTimeout(()=>{l("device_detection",{device_type:e?"mobile":"desktop",viewport_width:i})},100),performance.now()})()},[i,o]),t?M.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"16px",opacity:.8},children:"Loading..."}):M.jsx(S.Suspense,{fallback:M.jsx("div",{style:{position:"fixed",top:"20px",right:"20px",background:"rgba(0, 0, 0, 0.8)",color:"#FFFFFF",padding:"8px 16px",borderRadius:"20px",fontFamily:"Inter, sans-serif",fontSize:"14px",zIndex:9999,backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)",opacity:.9},children:"Loading..."}),children:e?M.jsx(vn,{}):M.jsx(mn,{})})},wn=()=>{const[e,n]=S.useState({email:"info@bounce2bounce.com",password:"",totpCode:""}),[t,r]=S.useState({}),[i,o]=S.useState(!1),[l,c]=S.useState(!1),[f,d]=S.useState(!0),[p,h]=S.useState("login"),[g,m]=S.useState(""),v={loginFrame:{width:"428px",height:"926px",background:"#FFF",display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 38px 40px 38px",boxSizing:"border-box",margin:"0 auto"},logoContainer:{marginBottom:"80px",display:"flex",justifyContent:"center"},logo:{width:"138.406px",height:"43px"},mainBody:{width:"352px",display:"flex",flexDirection:"column"},loginTitle:{color:"#2A2A2A",textAlign:"left",fontFamily:"Hamon, Inter, sans-serif",fontSize:"30px",fontWeight:"700",lineHeight:"28px",letterSpacing:"0.9px",marginBottom:"8px",margin:"0 0 8px 0"},loginSubtitle:{color:"#666",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"400",lineHeight:"24px",textAlign:"left",marginBottom:"32px"},fieldLabel:{color:"#2A2A2A",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",lineHeight:"25.814px",letterSpacing:"0.821px",marginBottom:"8px",textAlign:"left"},formSection:{width:"352px",display:"flex",flexDirection:"column",marginBottom:"32px"},inputField:{width:"352px",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FDFDFD",fontFamily:"Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",color:"#2A2A2A",padding:"0 20px",outline:"none",boxSizing:"border-box",marginBottom:"16px",letterSpacing:"0.821px"},passwordContainer:{position:"relative",marginBottom:"16px"},forgotPassword:{color:"#2A2A2A",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",lineHeight:"25.814px",letterSpacing:"0.821px",textAlign:"left",textDecoration:"none",marginBottom:"24px",display:"block"},loginButton:{width:"352px",height:"56.325px",borderRadius:"17.601px",background:"#151515",border:"none",color:"#FFF",textAlign:"center",fontFamily:"Hamon, Inter, sans-serif",fontSize:"18.774px",fontWeight:"700",lineHeight:"16.427px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.2s ease",marginBottom:"32px"},socialSection:{width:"352px",display:"flex",flexDirection:"column",gap:"18.774px"},socialButton:{width:"352px",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FDFDFD",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",color:"#2A2A2A",cursor:"pointer",transition:"all 0.2s ease",boxSizing:"border-box"},errorAlert:{backgroundColor:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",padding:"12px 16px",marginBottom:"16px",color:"#DC2626",fontSize:"14px",fontFamily:"Inter, sans-serif"},spinner:{width:"16px",height:"16px",border:"2px solid #ffffff40",borderTop:"2px solid #ffffff",borderRadius:"50%",animation:"spin 1s linear infinite"},totpSection:{width:"352px",textAlign:"center",marginTop:"20px",padding:"24px",backgroundColor:"#FDFDFD",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},totpTitle:{fontFamily:"Hamon, Inter, sans-serif",fontSize:"24px",fontWeight:"700",color:"#2A2A2A",marginBottom:"16px",margin:"0 0 16px 0"},totpDescription:{fontFamily:"Inter, sans-serif",fontSize:"14px",color:"#666",marginBottom:"20px",lineHeight:"1.4",textAlign:"left"},qrCodeContainer:{display:"flex",justifyContent:"center",marginBottom:"20px",padding:"16px",backgroundColor:"#FFF",borderRadius:"12px",border:"1px solid #E0E0E0"},totpInputField:{width:"100%",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px",fontWeight:"600",color:"#2A2A2A",textAlign:"center",letterSpacing:"4px",padding:"0 20px",outline:"none",boxSizing:"border-box",marginBottom:"16px"},totpButton:{width:"100%",height:"56.325px",borderRadius:"17.601px",background:"#151515",border:"none",color:"#FFF",textAlign:"center",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.2s ease"}},b=e=>{const{name:i,value:o}=e.target,l=u(o)
n(e=>({...e,[i]:l})),t[i]&&r(e=>({...e,[i]:""}))},w=e=>{void 0},y=async n=>{n.preventDefault(),o(!0),r({})
try{let n="/api/auth/admin/login"
"totp"===p?n="/api/auth/admin/verify-totp":"setup-totp"===p&&(n="/api/auth/admin/totp/complete")
const i=function(e,n={}){const t={}
return Object.keys(e).forEach(r=>{const i=e[r],o=n[r]||on
"string"==typeof i?t[r]=a(i,o):Array.isArray(i)?t[r]=i.map(e=>"string"==typeof e?a(e,o):e):t[r]=i}),t}(e),o="setup-totp"===p?{totpCode:i.totpCode}:i,l=await s(n,{method:"POST",body:JSON.stringify(o)}),u=await l.json()
if(void 0,l.ok)if(u.requireTotp)void 0,h("totp")
else if(u.success)if(void 0,u.needsTotpSetup){void 0
try{const e=await fetch("/api/auth/admin/totp/generate",{method:"GET",credentials:"include"})
if(void 0,e.ok){const n=await e.json()
void 0,m(n.qrCode),h("setup-totp")}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}}catch(t){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else if("setup-totp"===p&&u.success){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else if("totp"===p&&u.success){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else{const e="string"==typeof u.error?u.error:"string"==typeof u.message?u.message:"Login failed"
r({general:e})}}catch(t){void 0,r({general:"Network error. Please try again."})}finally{o(!1)}}
return M.jsxs("div",{style:v.loginFrame,children:[M.jsx("div",{style:v.logoContainer,children:M.jsx("img",{src:"/images/b2b-logo.svg",alt:"B2B Logo",style:v.logo})}),M.jsxs("div",{style:v.mainBody,children:[M.jsx("h1",{style:v.loginTitle,children:"Login"}),M.jsx("p",{style:v.loginSubtitle,children:"Welcome back! Please enter your details."}),"login"===p&&M.jsxs(M.Fragment,{children:[M.jsx("div",{style:v.formSection,children:M.jsxs("form",{onSubmit:y,children:[t.general&&M.jsx("div",{style:v.errorAlert,children:String(t.general)}),M.jsxs("div",{children:[M.jsx("label",{style:v.fieldLabel,children:"Enter your username"}),M.jsx("input",{type:"email",name:"email",value:e.email,onChange:b,style:v.inputField,placeholder:"Enter your email",disabled:i,autoComplete:"email",required:!0})]}),M.jsxs("div",{style:v.passwordContainer,children:[M.jsx("label",{style:v.fieldLabel,children:"Enter your password"}),M.jsx("input",{type:l?"text":"password",name:"password",value:e.password,onChange:b,style:v.inputField,placeholder:"Enter your password",disabled:i,autoComplete:"current-password",required:!0})]}),M.jsx("a",{href:"#",style:v.forgotPassword,children:"forgot password?"}),M.jsx("button",{type:"submit",style:v.loginButton,disabled:i||!f,children:i?M.jsxs(M.Fragment,{children:[M.jsx("div",{style:v.spinner}),M.jsx("span",{children:"Signing in..."})]}):"Login"})]})}),M.jsxs("div",{style:v.socialSection,children:[M.jsxs("button",{type:"button",onClick:()=>w(),style:v.socialButton,disabled:i,children:[M.jsxs("svg",{width:"28.16",height:"28.162",viewBox:"0 0 24 24",fill:"none",children:[M.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),M.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),M.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),M.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),M.jsx("span",{children:"Continue with Google"})]}),M.jsxs("button",{type:"button",onClick:()=>w(),style:v.socialButton,disabled:i,children:[M.jsx("svg",{width:"23.47",height:"23.47",viewBox:"0 0 24 24",fill:"none",children:M.jsx("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",fill:"#000"})}),M.jsx("span",{children:"Continue with Apple"})]})]})]}),"totp"===p&&M.jsxs("div",{style:v.totpSection,children:[M.jsx("h2",{style:v.totpTitle,children:"Enter Authentication Code"}),M.jsx("p",{style:v.totpDescription,children:"Please enter the 6-digit code from your Google Authenticator app"}),M.jsxs("form",{onSubmit:y,children:[t.general&&M.jsx("div",{style:v.errorAlert,children:String(t.general)}),M.jsx("input",{type:"text",name:"totpCode",value:e.totpCode,onChange:b,style:v.totpInputField,placeholder:"000000",maxLength:"6",pattern:"[0-9]{6}",disabled:i,autoComplete:"one-time-code",required:!0}),M.jsx("button",{type:"submit",style:v.totpButton,disabled:i||6!==e.totpCode.length,children:i?"Verifying...":"Verify Code"})]})]}),"setup-totp"===p&&M.jsxs("div",{style:v.totpSection,children:[M.jsx("h2",{style:v.totpTitle,children:"Setup Two-Factor Authentication"}),M.jsx("p",{style:v.totpDescription,children:"Scan this QR code with your Google Authenticator app, then enter the 6-digit code to complete setup."}),g&&M.jsx("div",{style:v.qrCodeContainer,children:M.jsx("img",{src:g,alt:"QR Code for TOTP setup"})}),M.jsxs("form",{onSubmit:y,children:[t.general&&M.jsx("div",{style:v.errorAlert,children:String(t.general)}),M.jsx("input",{type:"text",name:"totpCode",value:e.totpCode,onChange:b,style:v.totpInputField,placeholder:"000000",maxLength:"6",pattern:"[0-9]{6}",disabled:i,autoComplete:"one-time-code",required:!0}),M.jsx("button",{type:"submit",style:v.totpButton,disabled:i||6!==e.totpCode.length,children:i?"Setting up...":"Complete Setup"})]})]})]})]})}
class yn extends E.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,n){void 0,this.setState({error:e,errorInfo:n}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:e.message,error_stack:e.stack,component_stack:n.componentStack}})}render(){return this.state.hasError?M.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[M.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),M.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),M.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}!function(){try{for(let n=localStorage.length-1;n>=0;n--){const t=localStorage.key(n)
if(t)try{const e=localStorage.getItem(t)
e&&e.includes("blob:")&&(void 0,localStorage.removeItem(t))}catch(e){void 0}}for(let n=sessionStorage.length-1;n>=0;n--){const t=sessionStorage.key(n)
if(t)try{const e=sessionStorage.getItem(t)
e&&e.includes("blob:")&&(void 0,sessionStorage.removeItem(t))}catch(e){void 0}}void 0}catch(e){void 0}}(),void window.addEventListener("error",e=>{if(e.target&&"src"in e.target){const n=e.target.src
n&&n.startsWith("blob:")&&(void 0,e.preventDefault())}},!0),nn(),function(e={}){R?(e.debug,0):(R=new O(e),window.analyticsBeacon=R,window.getAnalyticsTracker=()=>R,!1!==e.enableRealTime&&setTimeout(()=>{R?.sendPageView()},100),e.debug)}({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1})
const xn=S.lazy(()=>g(()=>import("./AboutPage-De7P8RPa.js").then(e=>e.A),[])),kn=S.lazy(()=>g(()=>import("./ContactPage-JRUu9BY_.js"),[])),In=()=>M.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px"},children:"Loading..."}),Mn=()=>{const[e,n]=S.useState(!1),[t,r]=S.useState(window.location.pathname)
S.useEffect(()=>{void 0},[t])
const i=S.useCallback(e=>{n(!0),setTimeout(()=>{window.history.pushState({},"",e),r(e),n(!1)},150)},[])
return S.useEffect(()=>(window.navigateWithTransition=i,()=>{delete window.navigateWithTransition}),[i]),S.useEffect(()=>{const e=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)},[]),M.jsxs(Ue,{children:[M.jsx(Ye,{}),(()=>{if(e)return M.jsx(In,{})
switch(t){case"/about":return M.jsx(S.Suspense,{fallback:M.jsx(In,{}),children:M.jsx(xn,{})})
case"/contact":return M.jsx(S.Suspense,{fallback:M.jsx(In,{}),children:M.jsx(kn,{})})
case"/admin/login":return M.jsx(wn,{})
default:return M.jsx(bn,{})}})(),M.jsx(Ve,{})]})},Sn=document.getElementById("root")
if(Sn)try{L.createRoot(Sn).render(E.createElement(yn,null,E.createElement(Mn)))}catch(En){void 0}void document.addEventListener("securitypolicyviolation",e=>{const n={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&s("/api/security/csp-violation",{method:"POST",body:JSON.stringify(n)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const e=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const n=window.parent.location.origin
e.includes(n)||(void 0,window.top.location=window.location)}catch(En){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()})),window.React=E,window.ReactApp=Mn
export{E as R,g as _,Z as a,M as j,S as r,N as u}
