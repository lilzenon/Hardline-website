const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-DT3FdyA5.js","assets/usePerformantResize-xNyDCvQQ.js","assets/beacon-r5K5QvzQ.js","assets/mobileOptimization-DxuCIEdC.js","assets/sanitizer-Bhnvuri6.js","assets/SocialMediaButtons-CSqOR-k9.js","assets/AdminLoginFigma-iY3xZ6lH.js","assets/vendor-BkEynug1.js","assets/AboutPage-CzaCY5BU.js","assets/ContactPage-LoFrbTj7.js"])))=>i.map(i=>d[i]);
function e(){function e(e,n,t){this.props=e,this.context=n,this.refs=C,this.updater=t||S}function n(){}function t(e,n,t){this.props=e,this.context=n,this.refs=C,this.updater=t||S}function r(e,n,t){var r,l={},u=null,o=null
if(null!=n)for(r in void 0!==n.ref&&(o=n.ref),void 0!==n.key&&(u=""+n.key),n)F.call(n,r)&&!A.hasOwnProperty(r)&&(l[r]=n[r])
var i=arguments.length-2
if(1===i)l.children=t
else if(1<i){for(var a=Array(i),c=0;c<i;c++)a[c]=arguments[c+2]
l.children=a}if(e&&e.defaultProps)for(r in i=e.defaultProps)void 0===l[r]&&(l[r]=i[r])
return{$$typeof:s,type:e,key:u,ref:o,props:l,t:M.current}}function l(e){return"object"==typeof e&&null!==e&&e.$$typeof===s}function u(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"}
return"$"+e.replace(/[=:]/g,function(e){return n[e]})}(""+e.key):n.toString(36)}function o(e,n,t,r,i){var a=typeof e
"undefined"!==a&&"boolean"!==a||(e=null)
var c=!1
if(null===e)c=!0
else switch(a){case"string":case"number":c=!0
break
case"object":switch(e.$$typeof){case s:case f:c=!0}}if(c)return i=i(c=e),e=""===r?"."+u(c,0):r,O(i)?(t="",null!=e&&(t=e.replace(D,"$&/")+"/"),o(i,n,t,"",function(e){return e})):null!=i&&(l(i)&&(i=function(e,n){return{$$typeof:s,type:e.type,key:n,ref:e.ref,props:e.props,t:e.t}}(i,t+(!i.key||c&&c.key===i.key?"":(""+i.key).replace(D,"$&/")+"/")+e)),n.push(i)),1
if(c=0,r=""===r?".":r+":",O(e))for(var d=0;d<e.length;d++){var p=r+u(a=e[d],d)
c+=o(a,n,t,p,i)}else if(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=x&&e[x]||e["@@iterator"])?e:null}(e),"function"==typeof p)for(e=p.call(e),d=0;!(a=e.next()).done;)c+=o(a=a.value,n,t,p=r+u(a,d++),i)
else if("object"===a)throw n=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")
return c}function i(e,n,t){if(null==e)return e
var r=[],l=0
return o(e,r,"","",function(e){return n.call(t,e,l++)}),r}function a(e){if(-1===e.l){var n=e.u;(n=n()).then(function(n){0!==e.l&&-1!==e.l||(e.l=1,e.u=n)},function(n){0!==e.l&&-1!==e.l||(e.l=2,e.u=n)}),-1===e.l&&(e.l=0,e.u=n)}if(1===e.l)return e.u.default
throw e.u}function c(){throw Error("act(...) is not supported in production builds of React.")}if(h)return k
h=1
var s=Symbol.for("react.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),m=Symbol.for("react.provider"),b=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),x=Symbol.iterator,S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,C={}
e.prototype.isReactComponent={},e.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.")
this.updater.enqueueSetState(this,e,n,"setState")},e.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},n.prototype=e.prototype
var T=t.prototype=new n
T.constructor=t,_(T,e.prototype),T.isPureReactComponent=!0
var O=Array.isArray,F=Object.prototype.hasOwnProperty,M={current:null},A={key:!0,ref:!0,o:!0,i:!0},D=/\/+/g,P={current:null},j={transition:null},$={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:j,ReactCurrentOwner:M}
return k.Children={map:i,forEach:function(e,n,t){i(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0
return i(e,function(){n++}),n},toArray:function(e){return i(e,function(e){return e})||[]},only:function(e){if(!l(e))throw Error("React.Children.only expected to receive a single React element child.")
return e}},k.Component=e,k.Fragment=d,k.Profiler=v,k.PureComponent=t,k.StrictMode=p,k.Suspense=w,k.p=$,k.act=c,k.cloneElement=function(e,n,t){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".")
var r=_({},e.props),l=e.key,u=e.ref,o=e.t
if(null!=n){if(void 0!==n.ref&&(u=n.ref,o=M.current),void 0!==n.key&&(l=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps
for(a in n)F.call(n,a)&&!A.hasOwnProperty(a)&&(r[a]=void 0===n[a]&&void 0!==i?i[a]:n[a])}var a=arguments.length-2
if(1===a)r.children=t
else if(1<a){i=Array(a)
for(var c=0;c<a;c++)i[c]=arguments[c+2]
r.children=i}return{$$typeof:s,type:e.type,key:l,ref:u,props:r,t:o}},k.createContext=function(e){return(e={$$typeof:b,h:e,v:e,m:0,Provider:null,Consumer:null,k:null,S:null}).Provider={$$typeof:m,_:e},e.Consumer=e},k.createElement=r,k.createFactory=function(e){var n=r.bind(null,e)
return n.type=e,n},k.createRef=function(){return{current:null}},k.forwardRef=function(e){return{$$typeof:y,render:e}},k.isValidElement=l,k.lazy=function(e){return{$$typeof:E,C:{l:-1,u:e},T:a}},k.memo=function(e,n){return{$$typeof:g,type:e,compare:void 0===n?null:n}},k.startTransition=function(e){var n=j.transition
j.transition={}
try{e()}finally{j.transition=n}},k.unstable_act=c,k.useCallback=function(e,n){return P.current.useCallback(e,n)},k.useContext=function(e){return P.current.useContext(e)},k.useDebugValue=function(){},k.useDeferredValue=function(e){return P.current.useDeferredValue(e)},k.useEffect=function(e,n){return P.current.useEffect(e,n)},k.useId=function(){return P.current.useId()},k.useImperativeHandle=function(e,n,t){return P.current.useImperativeHandle(e,n,t)},k.useInsertionEffect=function(e,n){return P.current.useInsertionEffect(e,n)},k.useLayoutEffect=function(e,n){return P.current.useLayoutEffect(e,n)},k.useMemo=function(e,n){return P.current.useMemo(e,n)},k.useReducer=function(e,n,t){return P.current.useReducer(e,n,t)},k.useRef=function(e){return P.current.useRef(e)},k.useState=function(e){return P.current.useState(e)},k.useSyncExternalStore=function(e,n,t){return P.current.useSyncExternalStore(e,n,t)},k.useTransition=function(){return P.current.useTransition()},k.version="18.3.1",k}function n(){return v||(v=1,g.exports=e()),g.exports}function t(){function e(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])
return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(e,n){r(e,n),r(e+"Capture",n)}function r(e,n){for(du[e]=n,e=0;e<n.length;e++)fu.add(n[e])}function l(e,n,t,r,l,u,o){this.acceptsBooleans=2===n||3===n||4===n,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=u,this.removeEmptyString=o}function u(e){return e[1].toUpperCase()}function o(e,n,t,r){var l=yu.hasOwnProperty(n)?yu[n]:null;(null!==l?0!==l.type:r||!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&(function(e,n,t,r){if(null==n||function(e,n,t,r){if(null!==t&&0===t.type)return!1
switch(typeof n){case"function":case"symbol":return!0
case"boolean":return!r&&(null!==t?!t.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e)
default:return!1}}(e,n,t,r))return!0
if(r)return!1
if(null!==t)switch(t.type){case 3:return!n
case 4:return!1===n
case 5:return isNaN(n)
case 6:return isNaN(n)||1>n}return!1}(n,t,l,r)&&(t=null),r||null===l?function(e){return!!hu.call(bu,e)||!hu.call(mu,e)&&(vu.test(e)?bu[e]=!0:(mu[e]=!0,!1))}(n)&&(null===t?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=null===t?3!==l.type&&"":t:(n=l.attributeName,r=l.attributeNamespace,null===t?e.removeAttribute(n):(t=3===(l=l.type)||4===l&&!0===t?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}function i(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Lu&&e[Lu]||e["@@iterator"])?e:null}function a(e){if(void 0===gu)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/)
gu=n&&n[1]||""}return"\n"+gu+e}function s(e,n){if(!e||Bu)return""
Bu=!0
var t=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(s){var r=s}Reflect.construct(e,[],n)}else{try{n.call()}catch(s){r=s}e.call(n.prototype)}else{try{throw Error()}catch(s){r=s}e()}}catch(s){if(s&&r&&"string"==typeof s.stack){for(var l=s.stack.split("\n"),u=r.stack.split("\n"),o=l.length-1,i=u.length-1;1<=o&&0<=i&&l[o]!==u[i];)i--
for(;1<=o&&0<=i;o--,i--)if(l[o]!==u[i]){if(1!==o||1!==i)do{if(o--,0>--i||l[o]!==u[i]){var c="\n"+l[o].replace(" at new "," at ")
return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=o&&0<=i)
break}}}finally{Bu=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?a(e):""}function f(e){switch(e.tag){case 5:return a(e.type)
case 16:return a("Lazy")
case 13:return a("Suspense")
case 19:return a("SuspenseList")
case 0:case 2:case 15:return s(e.type,!1)
case 11:return s(e.type.render,!1)
case 1:return s(e.type,!0)
default:return""}}function d(e){if(null==e)return null
if("function"==typeof e)return e.displayName||e.name||null
if("string"==typeof e)return e
switch(e){case Cu:return"Fragment"
case _u:return"Portal"
case Ou:return"Profiler"
case Tu:return"StrictMode"
case Du:return"Suspense"
case Pu:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case Mu:return(e.displayName||"Context")+".Consumer"
case Fu:return(e._.displayName||"Context")+".Provider"
case Au:var n=e.render
return(e=e.displayName)||(e=""!==(e=n.displayName||n.name||"")?"ForwardRef("+e+")":"ForwardRef"),e
case ju:return null!==(n=e.displayName||null)?n:d(e.type)||"Memo"
case $u:n=e.C,e=e.T
try{return d(e(n))}catch(t){}}return null}function p(e){var n=e.type
switch(e.tag){case 24:return"Cache"
case 9:return(n.displayName||"Context")+".Consumer"
case 10:return(n._.displayName||"Context")+".Provider"
case 18:return"DehydratedFragment"
case 11:return e=(e=n.render).displayName||e.name||"",n.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef")
case 7:return"Fragment"
case 5:return n
case 4:return"Portal"
case 3:return"Root"
case 6:return"Text"
case 16:return d(n)
case 8:return n===Tu?"StrictMode":"Mode"
case 22:return"Offscreen"
case 12:return"Profiler"
case 21:return"Scope"
case 13:return"Suspense"
case 19:return"SuspenseList"
case 25:return"TracingMarker"
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof n)return n.displayName||n.name||null
if("string"==typeof n)return n}return null}function h(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e
default:return""}}function v(e){var n=e.type
return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===n||"radio"===n)}function m(e){e.O||(e.O=function(e){var n=v(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n]
if(!e.hasOwnProperty(n)&&void 0!==t&&"function"==typeof t.get&&"function"==typeof t.set){var l=t.get,u=t.set
return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(e){r=""+e,u.call(this,e)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e.O=null,delete e[n]}}}}(e))}function b(e){if(!e)return!1
var n=e.O
if(!n)return!0
var t=n.getValue(),r=""
return e&&(r=v(e)?e.checked?"true":"false":e.value),(e=r)!==t&&(n.setValue(e),!0)}function y(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null
try{return e.activeElement||e.body}catch(n){return e.body}}function w(e,n){var t=n.checked
return Iu({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=t?t:e.F.initialChecked})}function g(e,n){var t=null==n.defaultValue?"":n.defaultValue,r=null!=n.checked?n.checked:n.defaultChecked
t=h(null!=n.value?n.value:t),e.F={initialChecked:r,initialValue:t,controlled:"checkbox"===n.type||"radio"===n.type?null!=n.checked:null!=n.value}}function k(e,n){null!=(n=n.checked)&&o(e,"checked",n,!1)}function E(e,n){k(e,n)
var t=h(n.value),r=n.type
if(null!=t)"number"===r?(0===t&&""===e.value||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t)
else if("submit"===r||"reset"===r)return e.removeAttribute("value"),void 0
n.hasOwnProperty("value")?S(e,n.type,t):n.hasOwnProperty("defaultValue")&&S(e,n.type,h(n.defaultValue)),null==n.checked&&null!=n.defaultChecked&&(e.defaultChecked=!!n.defaultChecked)}function x(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type
if(!("submit"!==r&&"reset"!==r||void 0!==n.value&&null!==n.value))return
n=""+e.F.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}""!==(t=e.name)&&(e.name=""),e.defaultChecked=!!e.F.initialChecked,""!==t&&(e.name=t)}function S(e,n,t){"number"===n&&y(e.ownerDocument)===e||(null==t?e.defaultValue=""+e.F.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}function C(e,n,t,r){if(e=e.options,n){n={}
for(var l=0;l<t.length;l++)n["$"+t[l]]=!0
for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+h(t),n=null,l=0;l<e.length;l++){if(e[l].value===t)return e[l].selected=!0,r&&(e[l].defaultSelected=!0),void 0
null!==n||e[l].disabled||(n=e[l])}null!==n&&(n.selected=!0)}}function T(n,t){if(null!=t.dangerouslySetInnerHTML)throw Error(e(91))
return Iu({},t,{value:void 0,defaultValue:void 0,children:""+n.F.initialValue})}function O(n,t){var r=t.value
if(null==r){if(r=t.children,t=t.defaultValue,null!=r){if(null!=t)throw Error(e(92))
if(Nu(r)){if(1<r.length)throw Error(e(93))
r=r[0]}t=r}null==t&&(t=""),r=t}n.F={initialValue:h(r)}}function F(e,n){var t=h(n.value),r=h(n.defaultValue)
null!=t&&((t=""+t)!==e.value&&(e.value=t),null==n.defaultValue&&e.defaultValue!==t&&(e.defaultValue=t)),null!=r&&(e.defaultValue=""+r)}function M(e){var n=e.textContent
n===e.F.initialValue&&""!==n&&null!==n&&(e.value=n)}function A(e){switch(e){case"svg":return"http://www.w3.org/2000/svg"
case"math":return"http://www.w3.org/1998/Math/MathML"
default:return"http://www.w3.org/1999/xhtml"}}function P(e,n){return null==e||"http://www.w3.org/1999/xhtml"===e?A(n):"http://www.w3.org/2000/svg"===e&&"foreignObject"===n?"http://www.w3.org/1999/xhtml":e}function j(e,n){if(n){var t=e.firstChild
if(t&&t===e.lastChild&&3===t.nodeType)return t.nodeValue=n,void 0}e.textContent=n}function $(e,n,t){return null==n||"boolean"==typeof n||""===n?"":t||"number"!=typeof n||0===n||Hu.hasOwnProperty(e)&&Hu[e]?(""+n).trim():n+"px"}function R(e,n){for(var t in e=e.style,n)if(n.hasOwnProperty(t)){var r=0===t.indexOf("--"),l=$(t,n[t],r)
"float"===t&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}function L(n,t){if(t){if(Vu[n]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(e(137,n))
if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(e(60))
if("object"!=typeof t.dangerouslySetInnerHTML||!("M"in t.dangerouslySetInnerHTML))throw Error(e(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(e(62))}}function I(e,n){if(-1===e.indexOf("-"))return"string"==typeof n.is
switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1
default:return!0}}function B(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function N(n){if(n=gn(n)){if("function"!=typeof Ku)throw Error(e(280))
var t=n.stateNode
t&&(t=En(t),Ku(n.stateNode,n.type,t))}}function U(e){qu?Xu?Xu.push(e):Xu=[e]:qu=e}function H(){if(qu){var e=qu,n=Xu
if(Xu=qu=null,N(e),n)for(e=0;e<n.length;e++)N(n[e])}}function z(e,n){return e(n)}function V(){}function W(e,n,t){if(Yu)return e(n,t)
Yu=!0
try{return z(e,n,t)}finally{Yu=!1,(null!==qu||null!==Xu)&&(V(),H())}}function K(n,t){var r=n.stateNode
if(null===r)return null
var l=En(r)
if(null===l)return null
r=l[t]
e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(l=!("button"===(n=n.type)||"input"===n||"select"===n||"textarea"===n)),n=!l
break e
default:n=!1}if(n)return null
if(r&&"function"!=typeof r)throw Error(e(231,t,typeof r))
return r}function q(e,n,t,r,l,u,o,i,a){var c=Array.prototype.slice.call(arguments,3)
try{n.apply(t,c)}catch(s){this.onError(s)}}function X(e,n,t,r,l,u,o,i,a){oo=!1,io=null,q.apply(so,arguments)}function Y(e){var n=e,t=e
if(e.alternate)for(;n.return;)n=n.return
else{e=n
do{!!(4098&(n=e).flags)&&(t=n.return),e=n.return}while(e)}return 3===n.tag?t:null}function G(e){if(13===e.tag){var n=e.memoizedState
if(null===n&&null!==(e=e.alternate)&&(n=e.memoizedState),null!==n)return n.dehydrated}return null}function J(n){if(Y(n)!==n)throw Error(e(188))}function Q(n){return null!==(n=function(n){var t=n.alternate
if(!t){if(null===(t=Y(n)))throw Error(e(188))
return t!==n?null:n}for(var r=n,l=t;;){var u=r.return
if(null===u)break
var o=u.alternate
if(null===o){if(null!==(l=u.return)){r=l
continue}break}if(u.child===o.child){for(o=u.child;o;){if(o===r)return J(u),n
if(o===l)return J(u),t
o=o.sibling}throw Error(e(188))}if(r.return!==l.return)r=u,l=o
else{for(var i=!1,a=u.child;a;){if(a===r){i=!0,r=u,l=o
break}if(a===l){i=!0,l=u,r=o
break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===r){i=!0,r=o,l=u
break}if(a===l){i=!0,l=o,r=u
break}a=a.sibling}if(!i)throw Error(e(189))}}if(r.alternate!==l)throw Error(e(190))}if(3!==r.tag)throw Error(e(188))
return r.stateNode.current===r?n:t}(n))?Z(n):null}function Z(e){if(5===e.tag||6===e.tag)return e
for(e=e.child;null!==e;){var n=Z(e)
if(null!==n)return n
e=e.sibling}return null}function ee(e){switch(e&-e){case 1:return 1
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
default:return e}}function ne(e,n){var t=e.pendingLanes
if(0===t)return 0
var r=0,l=e.suspendedLanes,u=e.pingedLanes,o=268435455&t
if(0!==o){var i=o&~l
0!==i?r=ee(i):0!==(u&=o)&&(r=ee(u))}else 0!==(o=t&~l)?r=ee(o):0!==u&&(r=ee(u))
if(0===r)return 0
if(0!==n&&n!==r&&0===(n&l)&&((l=r&-r)>=(u=n&-n)||16===l&&4194240&u))return n
if(4&r&&(r|=16&t),0!==(n=e.entangledLanes))for(e=e.entanglements,n&=r;0<n;)l=1<<(t=31-_o(n)),r|=e[t],n&=~l
return r}function te(e,n){switch(e){case 1:case 2:case 4:return n+250
case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3
default:return-1}}function re(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function le(){var e=Oo
return!(4194240&(Oo<<=1))&&(Oo=64),e}function ue(e){for(var n=[],t=0;31>t;t++)n.push(e)
return n}function oe(e,n,t){e.pendingLanes|=n,536870912!==n&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[n=31-_o(n)]=t}function ie(e,n){var t=e.entangledLanes|=n
for(e=e.entanglements;t;){var r=31-_o(t),l=1<<r
l&n|e[r]&n&&(e[r]|=n),t&=~l}}function ae(e){return 1<(e&=-e)?4<e?268435455&e?16:536870912:4:1}function ce(e,n){switch(e){case"focusin":case"focusout":Po=null
break
case"dragenter":case"dragleave":jo=null
break
case"mouseover":case"mouseout":$o=null
break
case"pointerover":case"pointerout":Ro.delete(n.pointerId)
break
case"gotpointercapture":case"lostpointercapture":Lo.delete(n.pointerId)}}function se(e,n,t,r,l,u){return null===e||e.nativeEvent!==u?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:u,targetContainers:[l]},null!==n&&null!==(n=gn(n))&&Zu(n),e):(e.eventSystemFlags|=r,n=e.targetContainers,null!==l&&-1===n.indexOf(l)&&n.push(l),e)}function fe(e){var n=wn(e.target)
if(null!==n){var t=Y(n)
if(null!==t)if(13===(n=t.tag)){if(null!==(n=G(t)))return e.blockedOn=n,to(e.priority,function(){eo(t)}),void 0}else if(3===n&&t.stateNode.current.memoizedState.isDehydrated)return e.blockedOn=3===t.tag?t.stateNode.containerInfo:null,void 0}e.blockedOn=null}function de(e){if(null!==e.blockedOn)return!1
for(var n=e.targetContainers;0<n.length;){var t=ge(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent)
if(null!==t)return null!==(n=gn(t))&&Zu(n),e.blockedOn=t,!1
var r=new(t=e.nativeEvent).constructor(t.type,t)
Wu=r,t.target.dispatchEvent(r),Wu=null,n.shift()}return!0}function pe(e,n,t){de(e)&&t.delete(n)}function he(){Ao=!1,null!==Po&&de(Po)&&(Po=null),null!==jo&&de(jo)&&(jo=null),null!==$o&&de($o)&&($o=null),Ro.forEach(pe),Lo.forEach(pe)}function ve(e,n){e.blockedOn===n&&(e.blockedOn=null,Ao||(Ao=!0,su.unstable_scheduleCallback(su.unstable_NormalPriority,he)))}function me(e){function n(n){return ve(n,e)}if(0<Do.length){ve(Do[0],e)
for(var t=1;t<Do.length;t++){var r=Do[t]
r.blockedOn===e&&(r.blockedOn=null)}}for(null!==Po&&ve(Po,e),null!==jo&&ve(jo,e),null!==$o&&ve($o,e),Ro.forEach(n),Lo.forEach(n),t=0;t<Io.length;t++)(r=Io[t]).blockedOn===e&&(r.blockedOn=null)
for(;0<Io.length&&null===(t=Io[0]).blockedOn;)fe(t),null===t.blockedOn&&Io.shift()}function be(e,n,t,r){var l=Mo,u=No.transition
No.transition=null
try{Mo=1,we(e,n,t,r)}finally{Mo=l,No.transition=u}}function ye(e,n,t,r){var l=Mo,u=No.transition
No.transition=null
try{Mo=4,we(e,n,t,r)}finally{Mo=l,No.transition=u}}function we(e,n,t,r){if(Uo){var l=ge(e,n,t,r)
if(null===l)un(e,n,r,Ho,t),ce(e,r)
else if(function(e,n,t,r,l){switch(n){case"focusin":return Po=se(Po,e,n,t,r,l),!0
case"dragenter":return jo=se(jo,e,n,t,r,l),!0
case"mouseover":return $o=se($o,e,n,t,r,l),!0
case"pointerover":var u=l.pointerId
return Ro.set(u,se(Ro.get(u)||null,e,n,t,r,l)),!0
case"gotpointercapture":return u=l.pointerId,Lo.set(u,se(Lo.get(u)||null,e,n,t,r,l)),!0}return!1}(l,e,n,t,r))r.stopPropagation()
else if(ce(e,r),4&n&&-1<Bo.indexOf(e)){for(;null!==l;){var u=gn(l)
if(null!==u&&Qu(u),null===(u=ge(e,n,t,r))&&un(e,n,r,Ho,t),u===l)break
l=u}null!==l&&r.stopPropagation()}else un(e,n,r,null,t)}}function ge(e,n,t,r){if(Ho=null,null!==(e=wn(e=B(r))))if(null===(n=Y(e)))e=null
else if(13===(t=n.tag)){if(null!==(e=G(n)))return e
e=null}else if(3===t){if(n.stateNode.current.memoizedState.isDehydrated)return 3===n.tag?n.stateNode.containerInfo:null
e=null}else n!==e&&(e=null)
return Ho=e,null}function ke(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4
case"message":switch(bo()){case yo:return 1
case wo:return 4
case go:case ko:return 16
case Eo:return 536870912
default:return 16}default:return 16}}function Ee(){if(Wo)return Wo
var e,n,t=Vo,r=t.length,l="value"in zo?zo.value:zo.textContent,u=l.length
for(e=0;e<r&&t[e]===l[e];e++);var o=r-e
for(n=1;n<=o&&t[r-n]===l[u-n];n++);return Wo=l.slice(e,1<n?1-n:void 0)}function xe(e){var n=e.keyCode
return"charCode"in e?0===(e=e.charCode)&&13===n&&(e=13):e=n,10===e&&(e=13),32<=e||13===e?e:0}function Se(){return!0}function _e(){return!1}function Ce(e){function n(n,t,r,l,u){for(var o in this.D=n,this.P=r,this.type=t,this.nativeEvent=l,this.target=u,this.currentTarget=null,e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(l):l[o])
return this.isDefaultPrevented=(null!=l.defaultPrevented?l.defaultPrevented:!1===l.returnValue)?Se:_e,this.isPropagationStopped=_e,this}return Iu(n.prototype,{preventDefault:function(){this.defaultPrevented=!0
var e=this.nativeEvent
e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Se)},stopPropagation:function(){var e=this.nativeEvent
e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Se)},persist:function(){},isPersistent:Se}),n}function Te(e){var n=this.nativeEvent
return n.getModifierState?n.getModifierState(e):!!(e=oi[e])&&!!n[e]}function Oe(){return Te}function Fe(e,n){switch(e){case"keyup":return-1!==hi.indexOf(n.keyCode)
case"keydown":return 229!==n.keyCode
case"keypress":case"mousedown":case"focusout":return!0
default:return!1}}function Me(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}function Ae(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return"input"===n?!!Ei[e.type]:"textarea"===n}function De(e,n,t,r){U(r),0<(n=an(n,"onChange")).length&&(t=new qo("onChange","change",null,t,r),e.push({event:t,listeners:n}))}function Pe(e){en(e,0)}function je(e){if(b(kn(e)))return e}function $e(e,n){if("change"===e)return n}function Re(){xi&&(xi.detachEvent("onpropertychange",Le),Si=xi=null)}function Le(e){if("value"===e.propertyName&&je(Si)){var n=[]
De(n,Si,e,B(e)),W(Pe,n)}}function Ie(e,n,t){"focusin"===e?(Re(),Si=t,(xi=n).attachEvent("onpropertychange",Le)):"focusout"===e&&Re()}function Be(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return je(Si)}function Ne(e,n){if("click"===e)return je(n)}function Ue(e,n){if("input"===e||"change"===e)return je(n)}function He(e,n){if(Fi(e,n))return!0
if("object"!=typeof e||null===e||"object"!=typeof n||null===n)return!1
var t=Object.keys(e),r=Object.keys(n)
if(t.length!==r.length)return!1
for(r=0;r<t.length;r++){var l=t[r]
if(!hu.call(n,l)||!Fi(e[l],n[l]))return!1}return!0}function ze(e){for(;e&&e.firstChild;)e=e.firstChild
return e}function Ve(e,n){var t,r=ze(e)
for(e=0;r;){if(3===r.nodeType){if(t=e+r.textContent.length,e<=n&&t>=n)return{node:r,offset:n-e}
e=t}e:{for(;r;){if(r.nextSibling){r=r.nextSibling
break e}r=r.parentNode}r=void 0}r=ze(r)}}function We(e,n){return!(!e||!n)&&(e===n||(!e||3!==e.nodeType)&&(n&&3===n.nodeType?We(e,n.parentNode):"contains"in e?e.contains(n):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(n))))}function Ke(){for(var e=window,n=y();n instanceof e.HTMLIFrameElement;){try{var t="string"==typeof n.contentWindow.location.href}catch(r){t=!1}if(!t)break
n=y((e=n.contentWindow).document)}return n}function qe(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase()
return n&&("input"===n&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===n||"true"===e.contentEditable)}function Xe(e){var n=Ke(),t=e.focusedElem,r=e.selectionRange
if(n!==t&&t&&t.ownerDocument&&We(t.ownerDocument.documentElement,t)){if(null!==r&&qe(t))if(n=r.start,void 0===(e=r.end)&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length)
else if((e=(n=t.ownerDocument||document)&&n.defaultView||window).getSelection){e=e.getSelection()
var l=t.textContent.length,u=Math.min(r.start,l)
r=void 0===r.end?u:Math.min(r.end,l),!e.extend&&u>r&&(l=r,r=u,u=l),l=Ve(t,u)
var o=Ve(t,r)
l&&o&&(1!==e.rangeCount||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&((n=n.createRange()).setStart(l.node,l.offset),e.removeAllRanges(),u>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}for(n=[],e=t;e=e.parentNode;)1===e.nodeType&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop})
for("function"==typeof t.focus&&t.focus(),t=0;t<n.length;t++)(e=n[t]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}function Ye(e,n,t){var r=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument
ji||null==Ai||Ai!==y(r)||(r="selectionStart"in(r=Ai)&&qe(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Pi&&He(Pi,r)||(Pi=r,0<(r=an(Di,"onSelect")).length&&(n=new qo("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Ai)))}function Ge(e,n){var t={}
return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}function Je(e){if(Ri[e])return Ri[e]
if(!$i[e])return e
var n,t=$i[e]
for(n in t)if(t.hasOwnProperty(n)&&n in Li)return Ri[e]=t[n]
return e}function Qe(e,n){Hi.set(e,n),t(n,[e])}function Ze(n,t,r){var l=n.type||"unknown-event"
n.currentTarget=r,function(n,t,r,l,u,o,i,a,c){if(X.apply(this,arguments),oo){if(!oo)throw Error(e(198))
var s=io
oo=!1,io=null,ao||(ao=!0,co=s)}}(l,t,void 0,n),n.currentTarget=null}function en(e,n){n=!!(4&n)
for(var t=0;t<e.length;t++){var r=e[t],l=r.event
r=r.listeners
e:{var u=void 0
if(n)for(var o=r.length-1;0<=o;o--){var i=r[o],a=i.instance,c=i.currentTarget
if(i=i.listener,a!==u&&l.isPropagationStopped())break e
Ze(l,i,c),u=a}else for(o=0;o<r.length;o++){if(a=(i=r[o]).instance,c=i.currentTarget,i=i.listener,a!==u&&l.isPropagationStopped())break e
Ze(l,i,c),u=a}}}if(ao)throw e=co,ao=!1,co=null,e}function nn(e,n){var t=n[fa]
void 0===t&&(t=n[fa]=new Set)
var r=e+"__bubble"
t.has(r)||(ln(n,e,2,!1),t.add(r))}function tn(e,n,t){var r=0
n&&(r|=4),ln(t,e,r,n)}function rn(e){if(!e[Qi]){e[Qi]=!0,fu.forEach(function(n){"selectionchange"!==n&&(Ji.has(n)||tn(n,!1,e),tn(n,!0,e))})
var n=9===e.nodeType?e:e.ownerDocument
null===n||n[Qi]||(n[Qi]=!0,tn("selectionchange",!1,n))}}function ln(e,n,t,r){switch(ke(n)){case 1:var l=be
break
case 4:l=ye
break
default:l=we}t=l.bind(null,n,t,e),l=void 0,!Gu||"touchstart"!==n&&"touchmove"!==n&&"wheel"!==n||(l=!0),r?void 0!==l?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):void 0!==l?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function un(e,n,t,r,l){var u=r
if(!(1&n||2&n||null===r))e:for(;;){if(null===r)return
var o=r.tag
if(3===o||4===o){var i=r.stateNode.containerInfo
if(i===l||8===i.nodeType&&i.parentNode===l)break
if(4===o)for(o=r.return;null!==o;){var a=o.tag
if((3===a||4===a)&&((a=o.stateNode.containerInfo)===l||8===a.nodeType&&a.parentNode===l))return
o=o.return}for(;null!==i;){if(null===(o=wn(i)))return
if(5===(a=o.tag)||6===a){r=u=o
continue e}i=i.parentNode}}r=r.return}W(function(){var r=u,l=B(t),o=[]
e:{var i=Hi.get(e)
if(void 0!==i){var a=qo,c=e
switch(e){case"keypress":if(0===xe(t))break e
case"keydown":case"keyup":a=ai
break
case"focusin":c="focus",a=Zo
break
case"focusout":c="blur",a=Zo
break
case"beforeblur":case"afterblur":a=Zo
break
case"click":if(2===t.button)break e
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":a=Jo
break
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":a=Qo
break
case"touchcancel":case"touchend":case"touchmove":case"touchstart":a=si
break
case Ii:case Bi:case Ni:a=ei
break
case Ui:a=fi
break
case"scroll":a=Yo
break
case"wheel":a=pi
break
case"copy":case"cut":case"paste":a=ti
break
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":a=ci}var s=!!(4&n),f=!s&&"scroll"===e,d=s?null!==i?i+"Capture":null:i
s=[]
for(var p,h=r;null!==h;){var v=(p=h).stateNode
if(5===p.tag&&null!==v&&(p=v,null!==d&&null!=(v=K(h,d))&&s.push(on(h,v,p))),f)break
h=h.return}0<s.length&&(i=new a(i,c,null,t,l),o.push({event:i,listeners:s}))}}if(!(7&n)){if(a="mouseout"===e||"pointerout"===e,(!(i="mouseover"===e||"pointerover"===e)||t===Wu||!(c=t.relatedTarget||t.fromElement)||!wn(c)&&!c[sa])&&(a||i)&&(i=l.window===l?l:(i=l.ownerDocument)?i.defaultView||i.parentWindow:window,a?(a=r,null!==(c=(c=t.relatedTarget||t.toElement)?wn(c):null)&&(c!==(f=Y(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(a=null,c=r),a!==c)){if(s=Jo,v="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(s=ci,v="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==a?i:kn(a),p=null==c?i:kn(c),(i=new s(v,h+"leave",a,t,l)).target=f,i.relatedTarget=p,v=null,wn(l)===r&&((s=new s(d,h+"enter",c,t,l)).target=p,s.relatedTarget=f,v=s),f=v,a&&c)e:{for(d=c,h=0,p=s=a;p;p=cn(p))h++
for(p=0,v=d;v;v=cn(v))p++
for(;0<h-p;)s=cn(s),h--
for(;0<p-h;)d=cn(d),p--
for(;h--;){if(s===d||null!==d&&s===d.alternate)break e
s=cn(s),d=cn(d)}s=null}else s=null
null!==a&&sn(o,i,a,s,!1),null!==c&&null!==f&&sn(o,f,c,s,!0)}if("select"===(a=(i=r?kn(r):window).nodeName&&i.nodeName.toLowerCase())||"input"===a&&"file"===i.type)var m=$e
else if(Ae(i))if(_i)m=Ue
else{m=Be
var b=Ie}else(a=i.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===i.type||"radio"===i.type)&&(m=Ne)
switch(m&&(m=m(e,r))?De(o,m,t,l):(b&&b(e,i,r),"focusout"===e&&(b=i.F)&&b.controlled&&"number"===i.type&&S(i,"number",i.value)),b=r?kn(r):window,e){case"focusin":(Ae(b)||"true"===b.contentEditable)&&(Ai=b,Di=r,Pi=null)
break
case"focusout":Pi=Di=Ai=null
break
case"mousedown":ji=!0
break
case"contextmenu":case"mouseup":case"dragend":ji=!1,Ye(o,t,l)
break
case"selectionchange":if(Mi)break
case"keydown":case"keyup":Ye(o,t,l)}var y
if(vi)e:{switch(e){case"compositionstart":var w="onCompositionStart"
break e
case"compositionend":w="onCompositionEnd"
break e
case"compositionupdate":w="onCompositionUpdate"
break e}w=void 0}else ki?Fe(e,t)&&(w="onCompositionEnd"):"keydown"===e&&229===t.keyCode&&(w="onCompositionStart")
w&&(yi&&"ko"!==t.locale&&(ki||"onCompositionStart"!==w?"onCompositionEnd"===w&&ki&&(y=Ee()):(Vo="value"in(zo=l)?zo.value:zo.textContent,ki=!0)),0<(b=an(r,w)).length&&(w=new ri(w,e,null,t,l),o.push({event:w,listeners:b}),(y||null!==(y=Me(t)))&&(w.data=y))),(y=bi?function(e,n){switch(e){case"compositionend":return Me(n)
case"keypress":return 32!==n.which?null:(gi=!0,wi)
case"textInput":return(e=n.data)===wi&&gi?null:e
default:return null}}(e,t):function(e,n){if(ki)return"compositionend"===e||!vi&&Fe(e,n)?(e=Ee(),Wo=Vo=zo=null,ki=!1,e):null
switch(e){case"paste":default:return null
case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char
if(n.which)return String.fromCharCode(n.which)}return null
case"compositionend":return yi&&"ko"!==n.locale?null:n.data}}(e,t))&&0<(r=an(r,"onBeforeInput")).length&&(l=new ri("onBeforeInput","beforeinput",null,t,l),o.push({event:l,listeners:r}),l.data=y)}en(o,n)})}function on(e,n,t){return{instance:e,listener:n,currentTarget:t}}function an(e,n){for(var t=n+"Capture",r=[];null!==e;){var l=e,u=l.stateNode
5===l.tag&&null!==u&&(l=u,null!=(u=K(e,t))&&r.unshift(on(e,u,l)),null!=(u=K(e,n))&&r.push(on(e,u,l))),e=e.return}return r}function cn(e){if(null===e)return null
do{e=e.return}while(e&&5!==e.tag)
return e||null}function sn(e,n,t,r,l){for(var u=n.D,o=[];null!==t&&t!==r;){var i=t,a=i.alternate,c=i.stateNode
if(null!==a&&a===r)break
5===i.tag&&null!==c&&(i=c,l?null!=(a=K(t,u))&&o.unshift(on(t,a,i)):l||null!=(a=K(t,u))&&o.push(on(t,a,i))),t=t.return}0!==o.length&&e.push({event:n,listeners:o})}function fn(e){return("string"==typeof e?e:""+e).replace(Zi,"\n").replace(ea,"")}function dn(n,t,r){if(t=fn(t),fn(n)!==t&&r)throw Error(e(425))}function pn(){}function hn(e,n){return"textarea"===e||"noscript"===e||"string"==typeof n.children||"number"==typeof n.children||"object"==typeof n.dangerouslySetInnerHTML&&null!==n.dangerouslySetInnerHTML&&null!=n.dangerouslySetInnerHTML.M}function vn(e){setTimeout(function(){throw e})}function mn(e,n){var t=n,r=0
do{var l=t.nextSibling
if(e.removeChild(t),l&&8===l.nodeType)if("/$"===(t=l.data)){if(0===r)return e.removeChild(l),me(n),void 0
r--}else"$"!==t&&"$?"!==t&&"$!"!==t||r++
t=l}while(t)
me(n)}function bn(e){for(;null!=e;e=e.nextSibling){var n=e.nodeType
if(1===n||3===n)break
if(8===n){if("$"===(n=e.data)||"$!"===n||"$?"===n)break
if("/$"===n)return null}}return e}function yn(e){e=e.previousSibling
for(var n=0;e;){if(8===e.nodeType){var t=e.data
if("$"===t||"$!"===t||"$?"===t){if(0===n)return e
n--}else"/$"===t&&n++}e=e.previousSibling}return null}function wn(e){var n=e[aa]
if(n)return n
for(var t=e.parentNode;t;){if(n=t[sa]||t[aa]){if(t=n.alternate,null!==n.child||null!==t&&null!==t.child)for(e=yn(e);null!==e;){if(t=e[aa])return t
e=yn(e)}return n}t=(e=t).parentNode}return null}function gn(e){return!(e=e[aa]||e[sa])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function kn(n){if(5===n.tag||6===n.tag)return n.stateNode
throw Error(e(33))}function En(e){return e[ca]||null}function xn(e){return{current:e}}function Sn(e){0>va||(e.current=ha[va],ha[va]=null,va--)}function _n(e,n){va++,ha[va]=e.current,e.current=n}function Cn(e,n){var t=e.type.contextTypes
if(!t)return ma
var r=e.stateNode
if(r&&r.j===n)return r.$
var l,u={}
for(l in t)u[l]=n[l]
return r&&((e=e.stateNode).j=n,e.$=u),u}function Tn(e){return null!=e.childContextTypes}function On(){Sn(ya),Sn(ba)}function Fn(n,t,r){if(ba.current!==ma)throw Error(e(168))
_n(ba,t),_n(ya,r)}function Mn(n,t,r){var l=n.stateNode
if(t=t.childContextTypes,"function"!=typeof l.getChildContext)return r
for(var u in l=l.getChildContext())if(!(u in t))throw Error(e(108,p(n)||"Unknown",u))
return Iu({},r,l)}function An(e){return e=(e=e.stateNode)&&e.R||ma,wa=ba.current,_n(ba,e),_n(ya,ya.current),!0}function Dn(n,t,r){var l=n.stateNode
if(!l)throw Error(e(169))
r?(n=Mn(n,t,wa),l.R=n,Sn(ya),Sn(ba),_n(ba,n)):Sn(ya),_n(ya,r)}function Pn(e){null===ga?ga=[e]:ga.push(e)}function jn(){if(!Ea&&null!==ga){Ea=!0
var e=0,n=Mo
try{var t=ga
for(Mo=1;e<t.length;e++){var r=t[e]
do{r=r(!0)}while(null!==r)}ga=null,ka=!1}catch(l){throw null!==ga&&(ga=ga.slice(e+1)),fo(yo,jn),l}finally{Mo=n,Ea=!1}}return null}function $n(e,n){xa[Sa++]=Ca,xa[Sa++]=_a,_a=e,Ca=n}function Rn(e,n,t){Ta[Oa++]=Ma,Ta[Oa++]=Aa,Ta[Oa++]=Fa,Fa=e
var r=Ma
e=Aa
var l=32-_o(r)-1
r&=~(1<<l),t+=1
var u=32-_o(n)+l
if(30<u){var o=l-l%5
u=(r&(1<<o)-1).toString(32),r>>=o,l-=o,Ma=1<<32-_o(n)+l|t<<l|r,Aa=u+e}else Ma=1<<u|t<<l|r,Aa=e}function Ln(e){null!==e.return&&($n(e,1),Rn(e,1,0))}function In(e){for(;e===_a;)_a=xa[--Sa],xa[Sa]=null,Ca=xa[--Sa],xa[Sa]=null
for(;e===Fa;)Fa=Ta[--Oa],Ta[Oa]=null,Aa=Ta[--Oa],Ta[Oa]=null,Ma=Ta[--Oa],Ta[Oa]=null}function Bn(e,n){var t=Ul(5,null,null,0)
t.elementType="DELETED",t.stateNode=n,t.return=e,null===(n=e.deletions)?(e.deletions=[t],e.flags|=16):n.push(t)}function Nn(e,n){switch(e.tag){case 5:var t=e.type
return null!==(n=1!==n.nodeType||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n)&&(e.stateNode=n,Da=e,Pa=bn(n.firstChild),!0)
case 6:return null!==(n=""===e.pendingProps||3!==n.nodeType?null:n)&&(e.stateNode=n,Da=e,Pa=null,!0)
case 13:return null!==(n=8!==n.nodeType?null:n)&&(t=null!==Fa?{id:Ma,overflow:Aa}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},(t=Ul(18,null,null,0)).stateNode=n,t.return=e,e.child=t,Da=e,Pa=null,!0)
default:return!1}}function Un(e){return!(!(1&e.mode)||128&e.flags)}function Hn(n){if(ja){var t=Pa
if(t){var r=t
if(!Nn(n,t)){if(Un(n))throw Error(e(418))
t=bn(r.nextSibling)
var l=Da
t&&Nn(n,t)?Bn(l,r):(n.flags=-4097&n.flags|2,ja=!1,Da=n)}}else{if(Un(n))throw Error(e(418))
n.flags=-4097&n.flags|2,ja=!1,Da=n}}}function zn(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return
Da=e}function Vn(n){if(n!==Da)return!1
if(!ja)return zn(n),ja=!0,!1
var t
if((t=3!==n.tag)&&!(t=5!==n.tag)&&(t="head"!==(t=n.type)&&"body"!==t&&!hn(n.type,n.memoizedProps)),t&&(t=Pa)){if(Un(n))throw Wn(),Error(e(418))
for(;t;)Bn(n,t),t=bn(t.nextSibling)}if(zn(n),13===n.tag){if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(e(317))
e:{for(n=n.nextSibling,t=0;n;){if(8===n.nodeType){var r=n.data
if("/$"===r){if(0===t){Pa=bn(n.nextSibling)
break e}t--}else"$"!==r&&"$!"!==r&&"$?"!==r||t++}n=n.nextSibling}Pa=null}}else Pa=Da?bn(n.stateNode.nextSibling):null
return!0}function Wn(){for(var e=Pa;e;)e=bn(e.nextSibling)}function Kn(){Pa=Da=null,ja=!1}function qn(e){null===$a?$a=[e]:$a.push(e)}function Xn(n,t,r){if(null!==(n=r.ref)&&"function"!=typeof n&&"object"!=typeof n){if(r.t){if(r=r.t){if(1!==r.tag)throw Error(e(309))
var l=r.stateNode}if(!l)throw Error(e(147,n))
var u=l,o=""+n
return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref.L===o?t.ref:((t=function(e){var n=u.refs
null===e?delete n[o]:n[o]=e}).L=o,t)}if("string"!=typeof n)throw Error(e(284))
if(!r.t)throw Error(e(290,n))}return n}function Yn(n,t){throw n=Object.prototype.toString.call(t),Error(e(31,"[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n))}function Gn(e){return(0,e.T)(e.C)}function Jn(n){function t(e,t){if(n){var r=e.deletions
null===r?(e.deletions=[t],e.flags|=16):r.push(t)}}function r(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function l(e,n){for(e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function u(e,n){return(e=zl(e,n)).index=0,e.sibling=null,e}function o(e,t,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<t?(e.flags|=2,t):r:(e.flags|=2,t):(e.flags|=1048576,t)}function a(e){return n&&null===e.alternate&&(e.flags|=2),e}function c(e,n,t,r){return null===n||6!==n.tag?((n=ql(t,e.mode,r)).return=e,n):((n=u(n,t)).return=e,n)}function s(e,n,t,r){var l=t.type
return l===Cu?d(e,n,t.props.children,r,t.key):null!==n&&(n.elementType===l||"object"==typeof l&&null!==l&&l.$$typeof===$u&&Gn(l)===n.type)?((r=u(n,t.props)).ref=Xn(e,n,t),r.return=e,r):((r=Vl(t.type,t.key,t.props,null,e.mode,r)).ref=Xn(e,n,t),r.return=e,r)}function f(e,n,t,r){return null===n||4!==n.tag||n.stateNode.containerInfo!==t.containerInfo||n.stateNode.implementation!==t.implementation?((n=Xl(t,e.mode,r)).return=e,n):((n=u(n,t.children||[])).return=e,n)}function d(e,n,t,r,l){return null===n||7!==n.tag?((n=Wl(t,e.mode,r,l)).return=e,n):((n=u(n,t)).return=e,n)}function p(e,n,t){if("string"==typeof n&&""!==n||"number"==typeof n)return(n=ql(""+n,e.mode,t)).return=e,n
if("object"==typeof n&&null!==n){switch(n.$$typeof){case Su:return(t=Vl(n.type,n.key,n.props,null,e.mode,t)).ref=Xn(e,null,n),t.return=e,t
case _u:return(n=Xl(n,e.mode,t)).return=e,n
case $u:return p(e,(0,n.T)(n.C),t)}if(Nu(n)||i(n))return(n=Wl(n,e.mode,t,null)).return=e,n
Yn(e,n)}return null}function h(e,n,t,r){var l=null!==n?n.key:null
if("string"==typeof t&&""!==t||"number"==typeof t)return null!==l?null:c(e,n,""+t,r)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case Su:return t.key===l?s(e,n,t,r):null
case _u:return t.key===l?f(e,n,t,r):null
case $u:return h(e,n,(l=t.T)(t.C),r)}if(Nu(t)||i(t))return null!==l?null:d(e,n,t,r,null)
Yn(e,t)}return null}function v(e,n,t,r,l){if("string"==typeof r&&""!==r||"number"==typeof r)return c(n,e=e.get(t)||null,""+r,l)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case Su:return s(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case _u:return f(n,e=e.get(null===r.key?t:r.key)||null,r,l)
case $u:return v(e,n,t,(0,r.T)(r.C),l)}if(Nu(r)||i(r))return d(n,e=e.get(t)||null,r,l,null)
Yn(n,r)}return null}return function c(s,f,d,m){if("object"==typeof d&&null!==d&&d.type===Cu&&null===d.key&&(d=d.props.children),"object"==typeof d&&null!==d){switch(d.$$typeof){case Su:e:{for(var b=d.key,y=f;null!==y;){if(y.key===b){if((b=d.type)===Cu){if(7===y.tag){r(s,y.sibling),(f=u(y,d.props.children)).return=s,s=f
break e}}else if(y.elementType===b||"object"==typeof b&&null!==b&&b.$$typeof===$u&&Gn(b)===y.type){r(s,y.sibling),(f=u(y,d.props)).ref=Xn(s,y,d),f.return=s,s=f
break e}r(s,y)
break}t(s,y),y=y.sibling}d.type===Cu?((f=Wl(d.props.children,s.mode,m,d.key)).return=s,s=f):((m=Vl(d.type,d.key,d.props,null,s.mode,m)).ref=Xn(s,f,d),m.return=s,s=m)}return a(s)
case _u:e:{for(y=d.key;null!==f;){if(f.key===y){if(4===f.tag&&f.stateNode.containerInfo===d.containerInfo&&f.stateNode.implementation===d.implementation){r(s,f.sibling),(f=u(f,d.children||[])).return=s,s=f
break e}r(s,f)
break}t(s,f),f=f.sibling}(f=Xl(d,s.mode,m)).return=s,s=f}return a(s)
case $u:return c(s,f,(y=d.T)(d.C),m)}if(Nu(d))return function(e,u,i,a){for(var c=null,s=null,f=u,d=u=0,m=null;null!==f&&d<i.length;d++){f.index>d?(m=f,f=null):m=f.sibling
var b=h(e,f,i[d],a)
if(null===b){null===f&&(f=m)
break}n&&f&&null===b.alternate&&t(e,f),u=o(b,u,d),null===s?c=b:s.sibling=b,s=b,f=m}if(d===i.length)return r(e,f),ja&&$n(e,d),c
if(null===f){for(;d<i.length;d++)null!==(f=p(e,i[d],a))&&(u=o(f,u,d),null===s?c=f:s.sibling=f,s=f)
return ja&&$n(e,d),c}for(f=l(e,f);d<i.length;d++)null!==(m=v(f,e,d,i[d],a))&&(n&&null!==m.alternate&&f.delete(null===m.key?d:m.key),u=o(m,u,d),null===s?c=m:s.sibling=m,s=m)
return n&&f.forEach(function(n){return t(e,n)}),ja&&$n(e,d),c}(s,f,d,m)
if(i(d))return function(u,a,c,s){var f=i(c)
if("function"!=typeof f)throw Error(e(150))
if(null==(c=f.call(c)))throw Error(e(151))
for(var d=f=null,m=a,b=a=0,y=null,w=c.next();null!==m&&!w.done;b++,w=c.next()){m.index>b?(y=m,m=null):y=m.sibling
var g=h(u,m,w.value,s)
if(null===g){null===m&&(m=y)
break}n&&m&&null===g.alternate&&t(u,m),a=o(g,a,b),null===d?f=g:d.sibling=g,d=g,m=y}if(w.done)return r(u,m),ja&&$n(u,b),f
if(null===m){for(;!w.done;b++,w=c.next())null!==(w=p(u,w.value,s))&&(a=o(w,a,b),null===d?f=w:d.sibling=w,d=w)
return ja&&$n(u,b),f}for(m=l(u,m);!w.done;b++,w=c.next())null!==(w=v(m,u,b,w.value,s))&&(n&&null!==w.alternate&&m.delete(null===w.key?b:w.key),a=o(w,a,b),null===d?f=w:d.sibling=w,d=w)
return n&&m.forEach(function(e){return t(u,e)}),ja&&$n(u,b),f}(s,f,d,m)
Yn(s,d)}return"string"==typeof d&&""!==d||"number"==typeof d?(d=""+d,null!==f&&6===f.tag?(r(s,f.sibling),(f=u(f,d)).return=s,s=f):(r(s,f),(f=ql(d,s.mode,m)).return=s,s=f),a(s)):r(s,f)}}function Qn(){Ha=Ua=Na=null}function Zn(e){var n=Ba.current
Sn(Ba),e.h=n}function et(e,n,t){for(;null!==e;){var r=e.alternate
if((e.childLanes&n)!==n?(e.childLanes|=n,null!==r&&(r.childLanes|=n)):null!==r&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break
e=e.return}}function nt(e,n){Na=e,Ha=Ua=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&n)&&(hc=!0),e.firstContext=null)}function tt(n){var t=n.h
if(Ha!==n)if(n={context:n,memoizedValue:t,next:null},null===Ua){if(null===Na)throw Error(e(308))
Ua=n,Na.dependencies={lanes:0,firstContext:n}}else Ua=Ua.next=n
return t}function rt(e){null===za?za=[e]:za.push(e)}function lt(e,n,t,r){var l=n.interleaved
return null===l?(t.next=t,rt(n)):(t.next=l.next,l.next=t),n.interleaved=t,ut(e,r)}function ut(e,n){e.lanes|=n
var t=e.alternate
for(null!==t&&(t.lanes|=n),t=e,e=e.return;null!==e;)e.childLanes|=n,null!==(t=e.alternate)&&(t.childLanes|=n),t=e,e=e.return
return 3===t.tag?t.stateNode:null}function ot(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function it(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function at(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function ct(e,n,t){var r=e.updateQueue
if(null===r)return null
if(r=r.shared,2&Oc){var l=r.pending
return null===l?n.next=n:(n.next=l.next,l.next=n),r.pending=n,ut(e,t)}return null===(l=r.interleaved)?(n.next=n,rt(r)):(n.next=l.next,l.next=n),r.interleaved=n,ut(e,t)}function st(e,n,t){if(null!==(n=n.updateQueue)&&(n=n.shared,4194240&t)){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,ie(e,t)}}function ft(e,n){var t=e.updateQueue,r=e.alternate
if(null!==r&&t===(r=r.updateQueue)){var l=null,u=null
if(null!==(t=t.firstBaseUpdate)){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null}
null===u?l=u=o:u=u.next=o,t=t.next}while(null!==t)
null===u?l=u=n:u=u.next=n}else l=u=n
return t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:r.shared,effects:r.effects},e.updateQueue=t,void 0}null===(e=t.lastBaseUpdate)?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function dt(e,n,t,r){var l=e.updateQueue
Va=!1
var u=l.firstBaseUpdate,o=l.lastBaseUpdate,i=l.shared.pending
if(null!==i){l.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var s=e.alternate
null!==s&&(i=(s=s.updateQueue).lastBaseUpdate)!==o&&(null===i?s.firstBaseUpdate=c:i.next=c,s.lastBaseUpdate=a)}if(null!==u){var f=l.baseState
for(o=0,s=c=a=null,i=u;;){var d=i.lane,p=i.eventTime
if((r&d)===d){null!==s&&(s=s.next={eventTime:p,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null})
e:{var h=e,v=i
switch(d=n,p=t,v.tag){case 1:if("function"==typeof(h=v.payload)){f=h.call(p,f,d)
break e}f=h
break e
case 3:h.flags=-65537&h.flags|128
case 0:if(null==(d="function"==typeof(h=v.payload)?h.call(p,f,d):h))break e
f=Iu({},f,d)
break e
case 2:Va=!0}}null!==i.callback&&0!==i.lane&&(e.flags|=64,null===(d=l.effects)?l.effects=[i]:d.push(i))}else p={eventTime:p,lane:d,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===s?(c=s=p,a=f):s=s.next=p,o|=d
if(null===(i=i.next)){if(null===(i=l.shared.pending))break
i=(d=i).next,d.next=null,l.lastBaseUpdate=d,l.shared.pending=null}1}if(null===s&&(a=f),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=s,null!==(n=l.shared.interleaved)){l=n
do{o|=l.lane,l=l.next}while(l!==n)}else null===u&&(l.shared.lanes=0)
Rc|=o,e.lanes=o,e.memoizedState=f}}function pt(n,t,r){if(n=t.effects,t.effects=null,null!==n)for(t=0;t<n.length;t++){var l=n[t],u=l.callback
if(null!==u){if(l.callback=null,l=r,"function"!=typeof u)throw Error(e(191,u))
u.call(l)}}}function ht(n){if(n===Wa)throw Error(e(174))
return n}function vt(e,n){switch(_n(Xa,n),_n(qa,e),_n(Ka,Wa),e=n.nodeType){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:P(null,"")
break
default:n=P(n=(e=8===e?n.parentNode:n).namespaceURI||null,e=e.tagName)}Sn(Ka),_n(Ka,n)}function mt(){Sn(Ka),Sn(qa),Sn(Xa)}function bt(e){ht(Xa.current)
var n=ht(Ka.current),t=P(n,e.type)
n!==t&&(_n(qa,e),_n(Ka,t))}function yt(e){qa.current===e&&(Sn(Ka),Sn(qa))}function wt(e){for(var n=e;null!==n;){if(13===n.tag){var t=n.memoizedState
if(null!==t&&(null===(t=t.dehydrated)||"$?"===t.data||"$!"===t.data))return n}else if(19===n.tag&&void 0!==n.memoizedProps.revealOrder){if(128&n.flags)return n}else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return null
n=n.return}n.sibling.return=n.return,n=n.sibling}return null}function gt(){for(var e=0;e<Ga.length;e++)Ga[e].I=null
Ga.length=0}function kt(){throw Error(e(321))}function Et(e,n){if(null===n)return!1
for(var t=0;t<n.length&&t<e.length;t++)if(!Fi(e[t],n[t]))return!1
return!0}function xt(n,t,r,l,u,o){if(Za=o,ec=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ja.current=null===n||null===n.memoizedState?ac:cc,n=r(l,u),lc){o=0
do{if(lc=!1,uc=0,25<=o)throw Error(e(301))
o+=1,tc=nc=null,t.updateQueue=null,Ja.current=sc,n=r(l,u)}while(lc)}if(Ja.current=ic,t=null!==nc&&null!==nc.next,Za=0,tc=nc=ec=null,rc=!1,t)throw Error(e(300))
return n}function St(){var e=0!==uc
return uc=0,e}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===tc?ec.memoizedState=tc=e:tc=tc.next=e,tc}function Ct(){if(null===nc){var n=ec.alternate
n=null!==n?n.memoizedState:null}else n=nc.next
var t=null===tc?ec.memoizedState:tc.next
if(null!==t)tc=t,nc=n
else{if(null===n)throw Error(e(310))
n={memoizedState:(nc=n).memoizedState,baseState:nc.baseState,baseQueue:nc.baseQueue,queue:nc.queue,next:null},null===tc?ec.memoizedState=tc=n:tc=tc.next=n}return tc}function Tt(e,n){return"function"==typeof n?n(e):n}function Ot(n){var t=Ct(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var l=nc,u=l.baseQueue,o=r.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}l.baseQueue=u=o,r.pending=null}if(null!==u){o=u.next,l=l.baseState
var a=i=null,c=null,s=o
do{var f=s.lane
if((Za&f)===f)null!==c&&(c=c.next={lane:0,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}),l=s.hasEagerState?s.eagerState:n(l,s.action)
else{var d={lane:f,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}
null===c?(a=c=d,i=l):c=c.next=d,ec.lanes|=f,Rc|=f}s=s.next}while(null!==s&&s!==o)
null===c?i=l:c.next=a,Fi(l,t.memoizedState)||(hc=!0),t.memoizedState=l,t.baseState=i,t.baseQueue=c,r.lastRenderedState=l}if(null!==(n=r.interleaved)){u=n
do{o=u.lane,ec.lanes|=o,Rc|=o,u=u.next}while(u!==n)}else null===u&&(r.lanes=0)
return[t.memoizedState,r.dispatch]}function Ft(n){var t=Ct(),r=t.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=n
var l=r.dispatch,u=r.pending,o=t.memoizedState
if(null!==u){r.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
Fi(o,t.memoizedState)||(hc=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),r.lastRenderedState=o}return[o,l]}function Mt(){}function At(n,t){var r=ec,l=Ct(),u=t(),o=!Fi(l.memoizedState,u)
if(o&&(l.memoizedState=u,hc=!0),l=l.queue,zt(jt.bind(null,r,l,n),[n]),l.getSnapshot!==t||o||null!==tc&&1&tc.memoizedState.tag){if(r.flags|=2048,It(9,Pt.bind(null,r,l,u,t),void 0,null),null===Fc)throw Error(e(349))
30&Za||Dt(r,t,u)}return u}function Dt(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},null===(n=ec.updateQueue)?(n={lastEffect:null,stores:null},ec.updateQueue=n,n.stores=[e]):null===(t=n.stores)?n.stores=[e]:t.push(e)}function Pt(e,n,t,r){n.value=t,n.getSnapshot=r,$t(n)&&Rt(e)}function jt(e,n,t){return t(function(){$t(n)&&Rt(e)})}function $t(e){var n=e.getSnapshot
e=e.value
try{var t=n()
return!Fi(e,t)}catch(r){return!0}}function Rt(e){var n=ut(e,1)
null!==n&&dl(n,e,1,-1)}function Lt(e){var n=_t()
return"function"==typeof e&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Tt,lastRenderedState:e},n.queue=e,e=e.dispatch=nr.bind(null,ec,e),[n.memoizedState,e]}function It(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},null===(n=ec.updateQueue)?(n={lastEffect:null,stores:null},ec.updateQueue=n,n.lastEffect=e.next=e):null===(t=n.lastEffect)?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e),e}function Bt(){return Ct().memoizedState}function Nt(e,n,t,r){var l=_t()
ec.flags|=e,l.memoizedState=It(1|n,t,void 0,void 0===r?null:r)}function Ut(e,n,t,r){var l=Ct()
r=void 0===r?null:r
var u=void 0
if(null!==nc){var o=nc.memoizedState
if(u=o.destroy,null!==r&&Et(r,o.deps))return l.memoizedState=It(n,t,u,r),void 0}ec.flags|=e,l.memoizedState=It(1|n,t,u,r)}function Ht(e,n){return Nt(8390656,8,e,n)}function zt(e,n){return Ut(2048,8,e,n)}function Vt(e,n){return Ut(4,2,e,n)}function Wt(e,n){return Ut(4,4,e,n)}function Kt(e,n){return"function"==typeof n?(e=e(),n(e),function(){n(null)}):null!=n?(e=e(),n.current=e,function(){n.current=null}):void 0}function qt(e,n,t){return t=null!=t?t.concat([e]):null,Ut(4,4,Kt.bind(null,n,e),t)}function Xt(){}function Yt(e,n){var t=Ct()
n=void 0===n?null:n
var r=t.memoizedState
return null!==r&&null!==n&&Et(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Gt(e,n){var t=Ct()
n=void 0===n?null:n
var r=t.memoizedState
return null!==r&&null!==n&&Et(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Jt(e,n,t){return 21&Za?(Fi(t,n)||(t=le(),ec.lanes|=t,Rc|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,hc=!0),e.memoizedState=t)}function Qt(e,n){var t=Mo
Mo=0!==t&&4>t?t:4,e(!0)
var r=Qa.transition
Qa.transition={}
try{e(!1),n()}finally{Mo=t,Qa.transition=r}}function Zt(){return Ct().memoizedState}function er(e,n,t){var r=fl(e)
t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},tr(e)?rr(n,t):null!==(t=lt(e,n,t,r))&&(dl(t,e,r,sl()),lr(t,n,r))}function nr(e,n,t){var r=fl(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null}
if(tr(e))rr(n,l)
else{var u=e.alternate
if(0===e.lanes&&(null===u||0===u.lanes)&&null!==(u=n.lastRenderedReducer))try{var o=n.lastRenderedState,i=u(o,t)
if(l.hasEagerState=!0,l.eagerState=i,Fi(i,o)){var a=n.interleaved
return null===a?(l.next=l,rt(n)):(l.next=a.next,a.next=l),n.interleaved=l,void 0}}catch(c){}null!==(t=lt(e,n,l,r))&&(dl(t,e,r,l=sl()),lr(t,n,r))}}function tr(e){var n=e.alternate
return e===ec||null!==n&&n===ec}function rr(e,n){lc=rc=!0
var t=e.pending
null===t?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function lr(e,n,t){if(4194240&t){var r=n.lanes
t|=r&=e.pendingLanes,n.lanes=t,ie(e,t)}}function ur(e,n){if(e&&e.defaultProps){for(var t in n=Iu({},n),e=e.defaultProps)void 0===n[t]&&(n[t]=e[t])
return n}return n}function or(e,n,t,r){t=null==(t=t(r,n=e.memoizedState))?n:Iu({},n,t),e.memoizedState=t,0===e.lanes&&(e.updateQueue.baseState=t)}function ir(e,n,t,r,l,u,o){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,u,o):!(n.prototype&&n.prototype.isPureReactComponent&&He(t,r)&&He(l,u))}function ar(e,n,t){var r=!1,l=ma,u=n.contextType
return"object"==typeof u&&null!==u?u=tt(u):(l=Tn(n)?wa:ba.current,u=(r=null!=(r=n.contextTypes))?Cn(e,l):ma),n=new n(t,u),e.memoizedState=null!==n.state&&void 0!==n.state?n.state:null,n.updater=fc,e.stateNode=n,n.B=e,r&&((e=e.stateNode).j=l,e.$=u),n}function cr(e,n,t,r){e=n.state,"function"==typeof n.componentWillReceiveProps&&n.componentWillReceiveProps(t,r),"function"==typeof n.UNSAFE_componentWillReceiveProps&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&fc.enqueueReplaceState(n,n.state,null)}function sr(e,n,t,r){var l=e.stateNode
l.props=t,l.state=e.memoizedState,l.refs={},ot(e)
var u=n.contextType
"object"==typeof u&&null!==u?l.context=tt(u):(u=Tn(n)?wa:ba.current,l.context=Cn(e,u)),l.state=e.memoizedState,"function"==typeof(u=n.getDerivedStateFromProps)&&(or(e,n,u,t),l.state=e.memoizedState),"function"==typeof n.getDerivedStateFromProps||"function"==typeof l.getSnapshotBeforeUpdate||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||(n=l.state,"function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount(),n!==l.state&&fc.enqueueReplaceState(l,l.state,null),dt(e,t,l,r),l.state=e.memoizedState),"function"==typeof l.componentDidMount&&(e.flags|=4194308)}function fr(e,n){try{var t="",r=n
do{t+=f(r),r=r.return}while(r)
var l=t}catch(u){l="\nError generating stack: "+u.message+"\n"+u.stack}return{value:e,source:n,stack:l,digest:null}}function dr(e,n,t){return{value:e,source:null,stack:null!=t?t:null,digest:null!=n?n:null}}function pr(e,n){try{void 0}catch(t){setTimeout(function(){throw t})}}function hr(e,n,t){(t=at(-1,t)).tag=3,t.payload={element:null}
var r=n.value
return t.callback=function(){Vc||(Vc=!0,Wc=r),pr()},t}function vr(e,n,t){(t=at(-1,t)).tag=3
var r=e.type.getDerivedStateFromError
if("function"==typeof r){var l=n.value
t.payload=function(){return r(l)},t.callback=function(){pr()}}var u=e.stateNode
return null!==u&&"function"==typeof u.componentDidCatch&&(t.callback=function(){pr(),"function"!=typeof r&&(null===Kc?Kc=new Set([this]):Kc.add(this))
var e=n.stack
this.componentDidCatch(n.value,{componentStack:null!==e?e:""})}),t}function mr(e,n,t){var r=e.pingCache
if(null===r){r=e.pingCache=new dc
var l=new Set
r.set(n,l)}else void 0===(l=r.get(n))&&(l=new Set,r.set(n,l))
l.has(t)||(l.add(t),e=$l.bind(null,e,n,t),n.then(e,e))}function br(e){do{var n
if((n=13===e.tag)&&(n=null===(n=e.memoizedState)||null!==n.dehydrated),n)return e
e=e.return}while(null!==e)
return null}function yr(e,n,t,r,l){return 1&e.mode?(e.flags|=65536,e.lanes=l,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,1===t.tag&&(null===t.alternate?t.tag=17:((n=at(-1,1)).tag=2,ct(t,n,1))),t.lanes|=1),e)}function wr(e,n,t,r){n.child=null===e?Ia(n,null,t,r):La(n,e.child,t,r)}function gr(e,n,t,r,l){t=t.render
var u=n.ref
return nt(n,l),r=xt(e,n,t,r,u,l),t=St(),null===e||hc?(ja&&t&&Ln(n),n.flags|=1,wr(e,n,r,l),n.child):(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,Ir(e,n,l))}function kr(e,n,t,r,l){if(null===e){var u=t.type
return"function"!=typeof u||Hl(u)||void 0!==u.defaultProps||null!==t.compare||void 0!==t.defaultProps?((e=Vl(t.type,null,r,n,n.mode,l)).ref=n.ref,e.return=n,n.child=e):(n.tag=15,n.type=u,Er(e,n,u,r,l))}if(u=e.child,0===(e.lanes&l)){var o=u.memoizedProps
if((t=null!==(t=t.compare)?t:He)(o,r)&&e.ref===n.ref)return Ir(e,n,l)}return n.flags|=1,(e=zl(u,r)).ref=n.ref,e.return=n,n.child=e}function Er(e,n,t,r,l){if(null!==e){var u=e.memoizedProps
if(He(u,r)&&e.ref===n.ref){if(hc=!1,n.pendingProps=r=u,0===(e.lanes&l))return n.lanes=e.lanes,Ir(e,n,l)
131072&e.flags&&(hc=!0)}}return _r(e,n,t,r,l)}function xr(e,n,t){var r=n.pendingProps,l=r.children,u=null!==e?e.memoizedState:null
if("hidden"===r.mode)if(1&n.mode){if(!(1073741824&t))return e=null!==u?u.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,_n(Pc,Dc),Dc|=e,null
n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==u?u.baseLanes:t,_n(Pc,Dc),Dc|=r}else n.memoizedState={baseLanes:0,cachePool:null,transitions:null},_n(Pc,Dc),Dc|=t
else null!==u?(r=u.baseLanes|t,n.memoizedState=null):r=t,_n(Pc,Dc),Dc|=r
return wr(e,n,l,t),n.child}function Sr(e,n){var t=n.ref;(null===e&&null!==t||null!==e&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function _r(e,n,t,r,l){var u=Tn(t)?wa:ba.current
return u=Cn(n,u),nt(n,l),t=xt(e,n,t,r,u,l),r=St(),null===e||hc?(ja&&r&&Ln(n),n.flags|=1,wr(e,n,t,l),n.child):(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,Ir(e,n,l))}function Cr(e,n,t,r,l){if(Tn(t)){var u=!0
An(n)}else u=!1
if(nt(n,l),null===n.stateNode)Lr(e,n),ar(n,t,r),sr(n,t,r,l),r=!0
else if(null===e){var o=n.stateNode,i=n.memoizedProps
o.props=i
var a=o.context,c=t.contextType
c="object"==typeof c&&null!==c?tt(c):Cn(n,c=Tn(t)?wa:ba.current)
var s=t.getDerivedStateFromProps,f="function"==typeof s||"function"==typeof o.getSnapshotBeforeUpdate
f||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(i!==r||a!==c)&&cr(n,o,r,c),Va=!1
var d=n.memoizedState
o.state=d,dt(n,r,o,l),a=n.memoizedState,i!==r||d!==a||ya.current||Va?("function"==typeof s&&(or(n,t,s,r),a=n.memoizedState),(i=Va||ir(n,t,i,r,d,a,c))?(f||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||("function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount()),"function"==typeof o.componentDidMount&&(n.flags|=4194308)):("function"==typeof o.componentDidMount&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=a),o.props=r,o.state=a,o.context=c,r=i):("function"==typeof o.componentDidMount&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,it(e,n),i=n.memoizedProps,c=n.type===n.elementType?i:ur(n.type,i),o.props=c,f=n.pendingProps,d=o.context,a="object"==typeof(a=t.contextType)&&null!==a?tt(a):Cn(n,a=Tn(t)?wa:ba.current)
var p=t.getDerivedStateFromProps;(s="function"==typeof p||"function"==typeof o.getSnapshotBeforeUpdate)||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(i!==f||d!==a)&&cr(n,o,r,a),Va=!1,d=n.memoizedState,o.state=d,dt(n,r,o,l)
var h=n.memoizedState
i!==f||d!==h||ya.current||Va?("function"==typeof p&&(or(n,t,p,r),h=n.memoizedState),(c=Va||ir(n,t,c,r,d,h,a)||!1)?(s||"function"!=typeof o.UNSAFE_componentWillUpdate&&"function"!=typeof o.componentWillUpdate||("function"==typeof o.componentWillUpdate&&o.componentWillUpdate(r,h,a),"function"==typeof o.UNSAFE_componentWillUpdate&&o.UNSAFE_componentWillUpdate(r,h,a)),"function"==typeof o.componentDidUpdate&&(n.flags|=4),"function"==typeof o.getSnapshotBeforeUpdate&&(n.flags|=1024)):("function"!=typeof o.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=h),o.props=r,o.state=h,o.context=a,r=c):("function"!=typeof o.componentDidUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||i===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),r=!1)}return Tr(e,n,t,r,u,l)}function Tr(e,n,t,r,l,u){Sr(e,n)
var o=!!(128&n.flags)
if(!r&&!o)return l&&Dn(n,t,!1),Ir(e,n,u)
r=n.stateNode,pc.current=n
var i=o&&"function"!=typeof t.getDerivedStateFromError?null:r.render()
return n.flags|=1,null!==e&&o?(n.child=La(n,e.child,null,u),n.child=La(n,null,i,u)):wr(e,n,i,u),n.memoizedState=r.state,l&&Dn(n,t,!0),n.child}function Or(e){var n=e.stateNode
n.pendingContext?Fn(0,n.pendingContext,n.pendingContext!==n.context):n.context&&Fn(0,n.context,!1),vt(e,n.containerInfo)}function Fr(e,n,t,r,l){return Kn(),qn(l),n.flags|=256,wr(e,n,t,r),n.child}function Mr(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ar(n,t,r){var l,u=t.pendingProps,o=Ya.current,i=!1,a=!!(128&t.flags)
if((l=a)||(l=(null===n||null!==n.memoizedState)&&!!(2&o)),l?(i=!0,t.flags&=-129):null!==n&&null===n.memoizedState||(o|=1),_n(Ya,1&o),null===n)return Hn(t),null!==(n=t.memoizedState)&&null!==(n=n.dehydrated)?(1&t.mode?"$!"===n.data?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=u.children,n=u.fallback,i?(u=t.mode,i=t.child,a={mode:"hidden",children:a},1&u||null===i?i=Kl(a,u,0,null):(i.childLanes=0,i.pendingProps=a),n=Wl(n,u,r,null),i.return=t,n.return=t,i.sibling=n,t.child=i,t.child.memoizedState=Mr(r),t.memoizedState=vc,n):Dr(t,a))
if(null!==(o=n.memoizedState)&&null!==(l=o.dehydrated))return function(n,t,r,l,u,o,i){if(r)return 256&t.flags?(t.flags&=-257,Pr(n,t,i,l=dr(Error(e(422))))):null!==t.memoizedState?(t.child=n.child,t.flags|=128,null):(o=l.fallback,u=t.mode,l=Kl({mode:"visible",children:l.children},u,0,null),(o=Wl(o,u,i,null)).flags|=2,l.return=t,o.return=t,l.sibling=o,t.child=l,1&t.mode&&La(t,n.child,null,i),t.child.memoizedState=Mr(i),t.memoizedState=vc,o)
if(!(1&t.mode))return Pr(n,t,i,null)
if("$!"===u.data){if(l=u.nextSibling&&u.nextSibling.dataset)var a=l.dgst
return l=a,Pr(n,t,i,l=dr(o=Error(e(419)),l,void 0))}if(a=0!==(i&n.childLanes),hc||a){if(null!==(l=Fc)){switch(i&-i){case 4:u=2
break
case 16:u=8
break
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:u=32
break
case 536870912:u=268435456
break
default:u=0}0!==(u=0!==(u&(l.suspendedLanes|i))?0:u)&&u!==o.retryLane&&(o.retryLane=u,ut(n,u),dl(l,n,u,-1))}return _l(),Pr(n,t,i,l=dr(Error(e(421))))}return"$?"===u.data?(t.flags|=128,t.child=n.child,t=Ll.bind(null,n),u.N=t,null):(n=o.treeContext,Pa=bn(u.nextSibling),Da=t,ja=!0,$a=null,null!==n&&(Ta[Oa++]=Ma,Ta[Oa++]=Aa,Ta[Oa++]=Fa,Ma=n.id,Aa=n.overflow,Fa=t),(t=Dr(t,l.children)).flags|=4096,t)}(n,t,a,u,l,o,r)
if(i){i=u.fallback,a=t.mode,l=(o=n.child).sibling
var c={mode:"hidden",children:u.children}
return 1&a||t.child===o?(u=zl(o,c)).subtreeFlags=14680064&o.subtreeFlags:((u=t.child).childLanes=0,u.pendingProps=c,t.deletions=null),null!==l?i=zl(l,i):(i=Wl(i,a,r,null)).flags|=2,i.return=t,u.return=t,u.sibling=i,t.child=u,u=i,i=t.child,a=null===(a=n.child.memoizedState)?Mr(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=n.childLanes&~r,t.memoizedState=vc,u}return n=(i=n.child).sibling,u=zl(i,{mode:"visible",children:u.children}),!(1&t.mode)&&(u.lanes=r),u.return=t,u.sibling=null,null!==n&&(null===(r=t.deletions)?(t.deletions=[n],t.flags|=16):r.push(n)),t.child=u,t.memoizedState=null,u}function Dr(e,n){return(n=Kl({mode:"visible",children:n},e.mode,0,null)).return=e,e.child=n}function Pr(e,n,t,r){return null!==r&&qn(r),La(n,e.child,null,t),(e=Dr(n,n.pendingProps.children)).flags|=2,n.memoizedState=null,e}function jr(e,n,t){e.lanes|=n
var r=e.alternate
null!==r&&(r.lanes|=n),et(e.return,n,t)}function $r(e,n,t,r,l){var u=e.memoizedState
null===u?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(u.isBackwards=n,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=t,u.tailMode=l)}function Rr(e,n,t){var r=n.pendingProps,l=r.revealOrder,u=r.tail
if(wr(e,n,r.children,t),2&(r=Ya.current))r=1&r|2,n.flags|=128
else{if(null!==e&&128&e.flags)e:for(e=n.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&jr(e,t,n)
else if(19===e.tag)jr(e,t,n)
else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break e
for(;null===e.sibling;){if(null===e.return||e.return===n)break e
e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(_n(Ya,r),1&n.mode)switch(l){case"forwards":for(t=n.child,l=null;null!==t;)null!==(e=t.alternate)&&null===wt(e)&&(l=t),t=t.sibling
null===(t=l)?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),$r(n,!1,l,t,u)
break
case"backwards":for(t=null,l=n.child,n.child=null;null!==l;){if(null!==(e=l.alternate)&&null===wt(e)){n.child=l
break}e=l.sibling,l.sibling=t,t=l,l=e}$r(n,!0,t,null,u)
break
case"together":$r(n,!1,null,null,void 0)
break
default:n.memoizedState=null}else n.memoizedState=null
return n.child}function Lr(e,n){!(1&n.mode)&&null!==e&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Ir(n,t,r){if(null!==n&&(t.dependencies=n.dependencies),Rc|=t.lanes,0===(r&t.childLanes))return null
if(null!==n&&t.child!==n.child)throw Error(e(153))
if(null!==t.child){for(r=zl(n=t.child,n.pendingProps),t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=zl(n,n.pendingProps)).return=t
r.sibling=null}return t.child}function Br(e,n){if(!ja)switch(e.tailMode){case"hidden":n=e.tail
for(var t=null;null!==n;)null!==n.alternate&&(t=n),n=n.sibling
null===t?e.tail=null:t.sibling=null
break
case"collapsed":t=e.tail
for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling
null===r?n||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nr(e){var n=null!==e.alternate&&e.alternate.child===e.child,t=0,r=0
if(n)for(var l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=14680064&l.subtreeFlags,r|=14680064&l.flags,l.return=e,l=l.sibling
else for(l=e.child;null!==l;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling
return e.subtreeFlags|=r,e.childLanes=t,n}function Ur(n,t,r){var l=t.pendingProps
switch(In(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nr(t),null
case 1:case 17:return Tn(t.type)&&On(),Nr(t),null
case 3:return l=t.stateNode,mt(),Sn(ya),Sn(ba),gt(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),null!==n&&null!==n.child||(Vn(t)?t.flags|=4:null===n||n.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,null!==$a&&(ml($a),$a=null))),qi(n,t),Nr(t),null
case 5:yt(t)
var u=ht(Xa.current)
if(r=t.type,null!==n&&null!=t.stateNode)Xi(n,t,r,l,u),n.ref!==t.ref&&(t.flags|=512,t.flags|=2097152)
else{if(!l){if(null===t.stateNode)throw Error(e(166))
return Nr(t),null}if(n=ht(Ka.current),Vn(t)){l=t.stateNode,r=t.type
var i=t.memoizedProps
switch(l[aa]=t,l[ca]=i,n=!!(1&t.mode),r){case"dialog":nn("cancel",l),nn("close",l)
break
case"iframe":case"object":case"embed":nn("load",l)
break
case"video":case"audio":for(u=0;u<Gi.length;u++)nn(Gi[u],l)
break
case"source":nn("error",l)
break
case"img":case"image":case"link":nn("error",l),nn("load",l)
break
case"details":nn("toggle",l)
break
case"input":g(l,i),nn("invalid",l)
break
case"select":l.F={wasMultiple:!!i.multiple},nn("invalid",l)
break
case"textarea":O(l,i),nn("invalid",l)}for(var a in L(r,i),u=null,i)if(i.hasOwnProperty(a)){var c=i[a]
"children"===a?"string"==typeof c?l.textContent!==c&&(!0!==i.suppressHydrationWarning&&dn(l.textContent,c,n),u=["children",c]):"number"==typeof c&&l.textContent!==""+c&&(!0!==i.suppressHydrationWarning&&dn(l.textContent,c,n),u=["children",""+c]):du.hasOwnProperty(a)&&null!=c&&"onScroll"===a&&nn("scroll",l)}switch(r){case"input":m(l),x(l,i,!0)
break
case"textarea":m(l),M(l)
break
case"select":case"option":break
default:"function"==typeof i.onClick&&(l.onclick=pn)}l=u,t.updateQueue=l,null!==l&&(t.flags|=4)}else{a=9===u.nodeType?u:u.ownerDocument,"http://www.w3.org/1999/xhtml"===n&&(n=A(r)),"http://www.w3.org/1999/xhtml"===n?"script"===r?((n=a.createElement("div")).innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):"string"==typeof l.is?n=a.createElement(r,{is:l.is}):(n=a.createElement(r),"select"===r&&(a=n,l.multiple?a.multiple=!0:l.size&&(a.size=l.size))):n=a.createElementNS(n,r),n[aa]=t,n[ca]=l,Ki(n,t,!1,!1),t.stateNode=n
e:{switch(a=I(r,l),r){case"dialog":nn("cancel",n),nn("close",n),u=l
break
case"iframe":case"object":case"embed":nn("load",n),u=l
break
case"video":case"audio":for(u=0;u<Gi.length;u++)nn(Gi[u],n)
u=l
break
case"source":nn("error",n),u=l
break
case"img":case"image":case"link":nn("error",n),nn("load",n),u=l
break
case"details":nn("toggle",n),u=l
break
case"input":g(n,l),u=w(n,l),nn("invalid",n)
break
case"option":default:u=l
break
case"select":n.F={wasMultiple:!!l.multiple},u=Iu({},l,{value:void 0}),nn("invalid",n)
break
case"textarea":O(n,l),u=T(n,l),nn("invalid",n)}for(i in L(r,u),c=u)if(c.hasOwnProperty(i)){var s=c[i]
"style"===i?R(n,s):"dangerouslySetInnerHTML"===i?null!=(s=s?s.M:void 0)&&Uu(n,s):"children"===i?"string"==typeof s?("textarea"!==r||""!==s)&&j(n,s):"number"==typeof s&&j(n,""+s):"suppressContentEditableWarning"!==i&&"suppressHydrationWarning"!==i&&"autoFocus"!==i&&(du.hasOwnProperty(i)?null!=s&&"onScroll"===i&&nn("scroll",n):null!=s&&o(n,i,s,a))}switch(r){case"input":m(n),x(n,l,!1)
break
case"textarea":m(n),M(n)
break
case"option":null!=l.value&&n.setAttribute("value",""+h(l.value))
break
case"select":n.multiple=!!l.multiple,null!=(i=l.value)?C(n,!!l.multiple,i,!1):null!=l.defaultValue&&C(n,!!l.multiple,l.defaultValue,!0)
break
default:"function"==typeof u.onClick&&(n.onclick=pn)}switch(r){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus
break e
case"img":l=!0
break e
default:l=!1}}l&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return Nr(t),null
case 6:if(n&&null!=t.stateNode)Yi(n,t,n.memoizedProps,l)
else{if("string"!=typeof l&&null===t.stateNode)throw Error(e(166))
if(r=ht(Xa.current),ht(Ka.current),Vn(t)){if(l=t.stateNode,r=t.memoizedProps,l[aa]=t,(i=l.nodeValue!==r)&&null!==(n=Da))switch(n.tag){case 3:dn(l.nodeValue,r,!!(1&n.mode))
break
case 5:!0!==n.memoizedProps.suppressHydrationWarning&&dn(l.nodeValue,r,!!(1&n.mode))}i&&(t.flags|=4)}else(l=(9===r.nodeType?r:r.ownerDocument).createTextNode(l))[aa]=t,t.stateNode=l}return Nr(t),null
case 13:if(Sn(Ya),l=t.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(ja&&null!==Pa&&1&t.mode&&!(128&t.flags))Wn(),Kn(),t.flags|=98560,i=!1
else if(i=Vn(t),null!==l&&null!==l.dehydrated){if(null===n){if(!i)throw Error(e(318))
if(!(i=null!==(i=t.memoizedState)?i.dehydrated:null))throw Error(e(317))
i[aa]=t}else Kn(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4
Nr(t),i=!1}else null!==$a&&(ml($a),$a=null),i=!0
if(!i)return 65536&t.flags?t:null}return 128&t.flags?(t.lanes=r,t):((l=null!==l)!=(null!==n&&null!==n.memoizedState)&&l&&(t.child.flags|=8192,1&t.mode&&(null===n||1&Ya.current?0===jc&&(jc=3):_l())),null!==t.updateQueue&&(t.flags|=4),Nr(t),null)
case 4:return mt(),qi(n,t),null===n&&rn(t.stateNode.containerInfo),Nr(t),null
case 10:return Zn(t.type._),Nr(t),null
case 19:if(Sn(Ya),null===(i=t.memoizedState))return Nr(t),null
if(l=!!(128&t.flags),null===(a=i.rendering))if(l)Br(i,!1)
else{if(0!==jc||null!==n&&128&n.flags)for(n=t.child;null!==n;){if(null!==(a=wt(n))){for(t.flags|=128,Br(i,!1),null!==(l=a.updateQueue)&&(t.updateQueue=l,t.flags|=4),t.subtreeFlags=0,l=r,r=t.child;null!==r;)n=l,(i=r).flags&=14680066,null===(a=i.alternate)?(i.childLanes=0,i.lanes=n,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,n=a.dependencies,i.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext}),r=r.sibling
return _n(Ya,1&Ya.current|2),t.child}n=n.sibling}null!==i.tail&&mo()>Hc&&(t.flags|=128,l=!0,Br(i,!1),t.lanes=4194304)}else{if(!l)if(null!==(n=wt(a))){if(t.flags|=128,l=!0,null!==(r=n.updateQueue)&&(t.updateQueue=r,t.flags|=4),Br(i,!0),null===i.tail&&"hidden"===i.tailMode&&!a.alternate&&!ja)return Nr(t),null}else 2*mo()-i.renderingStartTime>Hc&&1073741824!==r&&(t.flags|=128,l=!0,Br(i,!1),t.lanes=4194304)
i.isBackwards?(a.sibling=t.child,t.child=a):(null!==(r=i.last)?r.sibling=a:t.child=a,i.last=a)}return null!==i.tail?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=mo(),t.sibling=null,r=Ya.current,_n(Ya,l?1&r|2:1&r),t):(Nr(t),null)
case 22:case 23:return kl(),l=null!==t.memoizedState,null!==n&&null!==n.memoizedState!==l&&(t.flags|=8192),l&&1&t.mode?!!(1073741824&Dc)&&(Nr(t),6&t.subtreeFlags&&(t.flags|=8192)):Nr(t),null
case 24:case 25:return null}throw Error(e(156,t.tag))}function Hr(n,t){switch(In(t),t.tag){case 1:return Tn(t.type)&&On(),65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 3:return mt(),Sn(ya),Sn(ba),gt(),65536&(n=t.flags)&&!(128&n)?(t.flags=-65537&n|128,t):null
case 5:return yt(t),null
case 13:if(Sn(Ya),null!==(n=t.memoizedState)&&null!==n.dehydrated){if(null===t.alternate)throw Error(e(340))
Kn()}return 65536&(n=t.flags)?(t.flags=-65537&n|128,t):null
case 19:return Sn(Ya),null
case 4:return mt(),null
case 10:return Zn(t.type._),null
case 22:case 23:return kl(),null
default:return null}}function zr(e,n){var t=e.ref
if(null!==t)if("function"==typeof t)try{t(null)}catch(r){jl(e,n,r)}else t.current=null}function Vr(e,n,t){try{t()}catch(r){jl(e,n,r)}}function Wr(e,n,t){var r=n.updateQueue
if(null!==(r=null!==r?r.lastEffect:null)){var l=r=r.next
do{if((l.tag&e)===e){var u=l.destroy
l.destroy=void 0,void 0!==u&&Vr(n,t,u)}l=l.next}while(l!==r)}}function Kr(e,n){if(null!==(n=null!==(n=n.updateQueue)?n.lastEffect:null)){var t=n=n.next
do{if((t.tag&e)===e){var r=t.create
t.destroy=r()}t=t.next}while(t!==n)}}function qr(e){var n=e.ref
if(null!==n){var t=e.stateNode
e.tag,e=t,"function"==typeof n?n(e):n.current=e}}function Xr(e){var n=e.alternate
null!==n&&(e.alternate=null,Xr(n)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&null!==(n=e.stateNode)&&(delete n[aa],delete n[ca],delete n[fa],delete n[da],delete n[pa]),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yr(e){return 5===e.tag||3===e.tag||4===e.tag}function Gr(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Yr(e.return))return null
e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e
if(null===e.child||4===e.tag)continue e
e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function Jr(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?8===t.nodeType?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(8===t.nodeType?(n=t.parentNode).insertBefore(e,t):(n=t).appendChild(e),null!=(t=t.U)||null!==n.onclick||(n.onclick=pn))
else if(4!==r&&null!==(e=e.child))for(Jr(e,n,t),e=e.sibling;null!==e;)Jr(e,n,t),e=e.sibling}function Qr(e,n,t){var r=e.tag
if(5===r||6===r)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e)
else if(4!==r&&null!==(e=e.child))for(Qr(e,n,t),e=e.sibling;null!==e;)Qr(e,n,t),e=e.sibling}function Zr(e,n,t){for(t=t.child;null!==t;)el(e,n,t),t=t.sibling}function el(e,n,t){if(So&&"function"==typeof So.onCommitFiberUnmount)try{So.onCommitFiberUnmount(xo,t)}catch(i){}switch(t.tag){case 5:yc||zr(t,n)
case 6:var r=Ec,l=xc
Ec=null,Zr(e,n,t),xc=l,null!==(Ec=r)&&(xc?(e=Ec,t=t.stateNode,8===e.nodeType?e.parentNode.removeChild(t):e.removeChild(t)):Ec.removeChild(t.stateNode))
break
case 18:null!==Ec&&(xc?(e=Ec,t=t.stateNode,8===e.nodeType?mn(e.parentNode,t):1===e.nodeType&&mn(e,t),me(e)):mn(Ec,t.stateNode))
break
case 4:r=Ec,l=xc,Ec=t.stateNode.containerInfo,xc=!0,Zr(e,n,t),Ec=r,xc=l
break
case 0:case 11:case 14:case 15:if(!yc&&null!==(r=t.updateQueue)&&null!==(r=r.lastEffect)){l=r=r.next
do{var u=l,o=u.destroy
u=u.tag,void 0!==o&&(2&u||4&u)&&Vr(t,n,o),l=l.next}while(l!==r)}Zr(e,n,t)
break
case 1:if(!yc&&(zr(t,n),"function"==typeof(r=t.stateNode).componentWillUnmount))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(i){jl(t,n,i)}Zr(e,n,t)
break
case 21:Zr(e,n,t)
break
case 22:1&t.mode?(yc=(r=yc)||null!==t.memoizedState,Zr(e,n,t),yc=r):Zr(e,n,t)
break
default:Zr(e,n,t)}}function nl(e){var n=e.updateQueue
if(null!==n){e.updateQueue=null
var t=e.stateNode
null===t&&(t=e.stateNode=new wc),n.forEach(function(n){var r=Il.bind(null,e,n)
t.has(n)||(t.add(n),n.then(r,r))})}}function tl(n,t){var r=t.deletions
if(null!==r)for(var l=0;l<r.length;l++){var u=r[l]
try{var o=n,i=t,a=i
e:for(;null!==a;){switch(a.tag){case 5:Ec=a.stateNode,xc=!1
break e
case 3:case 4:Ec=a.stateNode.containerInfo,xc=!0
break e}a=a.return}if(null===Ec)throw Error(e(160))
el(o,i,u),Ec=null,xc=!1
var c=u.alternate
null!==c&&(c.return=null),u.return=null}catch(s){jl(u,t,s)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)rl(t,n),t=t.sibling}function rl(n,t){var r=n.alternate,l=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:if(tl(t,n),ll(n),4&l){try{Wr(3,n,n.return),Kr(3,n)}catch(b){jl(n,n.return,b)}try{Wr(5,n,n.return)}catch(b){jl(n,n.return,b)}}break
case 1:tl(t,n),ll(n),512&l&&null!==r&&zr(r,r.return)
break
case 5:if(tl(t,n),ll(n),512&l&&null!==r&&zr(r,r.return),32&n.flags){var u=n.stateNode
try{j(u,"")}catch(b){jl(n,n.return,b)}}if(4&l&&null!=(u=n.stateNode)){var i=n.memoizedProps,a=null!==r?r.memoizedProps:i,c=n.type,s=n.updateQueue
if(n.updateQueue=null,null!==s)try{"input"===c&&"radio"===i.type&&null!=i.name&&k(u,i),I(c,a)
var f=I(c,i)
for(a=0;a<s.length;a+=2){var d=s[a],p=s[a+1]
"style"===d?R(u,p):"dangerouslySetInnerHTML"===d?Uu(u,p):"children"===d?j(u,p):o(u,d,p,f)}switch(c){case"input":E(u,i)
break
case"textarea":F(u,i)
break
case"select":var h=u.F.wasMultiple
u.F.wasMultiple=!!i.multiple
var v=i.value
null!=v?C(u,!!i.multiple,v,!1):h!==!!i.multiple&&(null!=i.defaultValue?C(u,!!i.multiple,i.defaultValue,!0):C(u,!!i.multiple,i.multiple?[]:"",!1))}u[ca]=i}catch(b){jl(n,n.return,b)}}break
case 6:if(tl(t,n),ll(n),4&l){if(null===n.stateNode)throw Error(e(162))
u=n.stateNode,i=n.memoizedProps
try{u.nodeValue=i}catch(b){jl(n,n.return,b)}}break
case 3:if(tl(t,n),ll(n),4&l&&null!==r&&r.memoizedState.isDehydrated)try{me(t.containerInfo)}catch(b){jl(n,n.return,b)}break
case 4:default:tl(t,n),ll(n)
break
case 13:tl(t,n),ll(n),8192&(u=n.child).flags&&(i=null!==u.memoizedState,u.stateNode.isHidden=i,!i||null!==u.alternate&&null!==u.alternate.memoizedState||(Uc=mo())),4&l&&nl(n)
break
case 22:if(d=null!==r&&null!==r.memoizedState,1&n.mode?(yc=(f=yc)||d,tl(t,n),yc=f):tl(t,n),ll(n),8192&l){if(f=null!==n.memoizedState,(n.stateNode.isHidden=f)&&!d&&1&n.mode)for(gc=n,d=n.child;null!==d;){for(p=gc=d;null!==gc;){switch(v=(h=gc).child,h.tag){case 0:case 11:case 14:case 15:Wr(4,h,h.return)
break
case 1:zr(h,h.return)
var m=h.stateNode
if("function"==typeof m.componentWillUnmount){l=h,r=h.return
try{t=l,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(b){jl(l,r,b)}}break
case 5:zr(h,h.return)
break
case 22:if(null!==h.memoizedState){al(p)
continue}}null!==v?(v.return=h,gc=v):al(p)}d=d.sibling}e:for(d=null,p=n;;){if(5===p.tag){if(null===d){d=p
try{u=p.stateNode,f?"function"==typeof(i=u.style).setProperty?i.setProperty("display","none","important"):i.display="none":(c=p.stateNode,a=null!=(s=p.memoizedProps.style)&&s.hasOwnProperty("display")?s.display:null,c.style.display=$("display",a))}catch(b){jl(n,n.return,b)}}}else if(6===p.tag){if(null===d)try{p.stateNode.nodeValue=f?"":p.memoizedProps}catch(b){jl(n,n.return,b)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===n)&&null!==p.child){p.child.return=p,p=p.child
continue}if(p===n)break e
for(;null===p.sibling;){if(null===p.return||p.return===n)break e
d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break
case 19:tl(t,n),ll(n),4&l&&nl(n)
case 21:}}function ll(n){var t=n.flags
if(2&t){try{e:{for(var r=n.return;null!==r;){if(Yr(r)){var l=r
break e}r=r.return}throw Error(e(160))}switch(l.tag){case 5:var u=l.stateNode
32&l.flags&&(j(u,""),l.flags&=-33),Qr(n,Gr(n),u)
break
case 3:case 4:var o=l.stateNode.containerInfo
Jr(n,Gr(n),o)
break
default:throw Error(e(161))}}catch(i){jl(n,n.return,i)}n.flags&=-3}4096&t&&(n.flags&=-4097)}function ul(e,n,t){gc=e,ol(e)}function ol(e,n,t){for(var r=!!(1&e.mode);null!==gc;){var l=gc,u=l.child
if(22===l.tag&&r){var o=null!==l.memoizedState||bc
if(!o){var i=l.alternate,a=null!==i&&null!==i.memoizedState||yc
i=bc
var c=yc
if(bc=o,(yc=a)&&!c)for(gc=l;null!==gc;)a=(o=gc).child,22===o.tag&&null!==o.memoizedState?cl(l):null!==a?(a.return=o,gc=a):cl(l)
for(;null!==u;)gc=u,ol(u),u=u.sibling
gc=l,bc=i,yc=c}il(e)}else 8772&l.subtreeFlags&&null!==u?(u.return=l,gc=u):il(e)}}function il(n){for(;null!==gc;){var t=gc
if(8772&t.flags){var r=t.alternate
try{if(8772&t.flags)switch(t.tag){case 0:case 11:case 15:yc||Kr(5,t)
break
case 1:var l=t.stateNode
if(4&t.flags&&!yc)if(null===r)l.componentDidMount()
else{var u=t.elementType===t.type?r.memoizedProps:ur(t.type,r.memoizedProps)
l.componentDidUpdate(u,r.memoizedState,l.V)}var o=t.updateQueue
null!==o&&pt(t,o,l)
break
case 3:var i=t.updateQueue
if(null!==i){if(r=null,null!==t.child)switch(t.child.tag){case 5:case 1:r=t.child.stateNode}pt(t,i,r)}break
case 5:var a=t.stateNode
if(null===r&&4&t.flags){r=a
var c=t.memoizedProps
switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus()
break
case"img":c.src&&(r.src=c.src)}}break
case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break
case 13:if(null===t.memoizedState){var s=t.alternate
if(null!==s){var f=s.memoizedState
if(null!==f){var d=f.dehydrated
null!==d&&me(d)}}}break
default:throw Error(e(163))}yc||512&t.flags&&qr(t)}catch(p){jl(t,t.return,p)}}if(t===n){gc=null
break}if(null!==(r=t.sibling)){r.return=t.return,gc=r
break}gc=t.return}}function al(e){for(;null!==gc;){var n=gc
if(n===e){gc=null
break}var t=n.sibling
if(null!==t){t.return=n.return,gc=t
break}gc=n.return}}function cl(e){for(;null!==gc;){var n=gc
try{switch(n.tag){case 0:case 11:case 15:var t=n.return
try{Kr(4,n)}catch(a){jl(n,t,a)}break
case 1:var r=n.stateNode
if("function"==typeof r.componentDidMount){var l=n.return
try{r.componentDidMount()}catch(a){jl(n,l,a)}}var u=n.return
try{qr(n)}catch(a){jl(n,u,a)}break
case 5:var o=n.return
try{qr(n)}catch(a){jl(n,o,a)}}}catch(a){jl(n,n.return,a)}if(n===e){gc=null
break}var i=n.sibling
if(null!==i){i.return=n.return,gc=i
break}gc=n.return}}function sl(){return 6&Oc?mo():-1!==Qc?Qc:Qc=mo()}function fl(e){return 1&e.mode?2&Oc&&0!==Ac?Ac&-Ac:null!==Ra.transition?(0===Zc&&(Zc=le()),Zc):0!==(e=Mo)?e:e=void 0===(e=window.event)?16:ke(e.type):1}function dl(n,t,r,l){if(50<Gc)throw Gc=0,Jc=null,Error(e(185))
oe(n,r,l),2&Oc&&n===Fc||(n===Fc&&(!(2&Oc)&&(Lc|=r),4===jc&&bl(n,Ac)),pl(n,l),1===r&&0===Oc&&!(1&t.mode)&&(Hc=mo()+500,ka&&jn()))}function pl(e,n){var t=e.callbackNode
!function(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,u=e.pendingLanes;0<u;){var o=31-_o(u),i=1<<o,a=l[o];-1===a?0!==(i&t)&&0===(i&r)||(l[o]=te(i,n)):a<=n&&(e.expiredLanes|=i),u&=~i}}(e,n)
var r=ne(e,e===Fc?Ac:0)
if(0===r)null!==t&&po(t),e.callbackNode=null,e.callbackPriority=0
else if(n=r&-r,e.callbackPriority!==n){if(null!=t&&po(t),1===n)0===e.tag?function(e){ka=!0,Pn(e)}(yl.bind(null,e)):Pn(yl.bind(null,e)),oa(function(){!(6&Oc)&&jn()}),t=null
else{switch(ae(r)){case 1:t=yo
break
case 4:t=wo
break
case 16:default:t=go
break
case 536870912:t=Eo}t=Bl(t,hl.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function hl(n,t){if(Qc=-1,Zc=0,6&Oc)throw Error(e(327))
var r=n.callbackNode
if(Dl()&&n.callbackNode!==r)return null
var l=ne(n,n===Fc?Ac:0)
if(0===l)return null
if(30&l||0!==(l&n.expiredLanes)||t)t=Cl(n,l)
else{t=l
var u=Oc
Oc|=2
var o=Sl()
for(Fc===n&&Ac===t||(zc=null,Hc=mo()+500,El(n,t));;){try{Ol()
break}catch(a){xl(n,a)}1}Qn(),_c.current=o,Oc=u,null!==Mc?t=0:(Fc=null,Ac=0,t=jc)}if(0!==t){if(2===t&&0!==(u=re(n))&&(l=u,t=vl(n,u)),1===t)throw r=$c,El(n,0),bl(n,l),pl(n,mo()),r
if(6===t)bl(n,l)
else{if(u=n.current.alternate,!(30&l||function(e){for(var n=e;;){if(16384&n.flags){var t=n.updateQueue
if(null!==t&&null!==(t=t.stores))for(var r=0;r<t.length;r++){var l=t[r],u=l.getSnapshot
l=l.value
try{if(!Fi(u(),l))return!1}catch(i){return!1}}}if(t=n.child,16384&n.subtreeFlags&&null!==t)t.return=n,n=t
else{if(n===e)break
for(;null===n.sibling;){if(null===n.return||n.return===e)return!0
n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}(u)||(t=Cl(n,l),2===t&&(o=re(n),0!==o&&(l=o,t=vl(n,o))),1!==t)))throw r=$c,El(n,0),bl(n,l),pl(n,mo()),r
switch(n.finishedWork=u,n.finishedLanes=l,t){case 0:case 1:throw Error(e(345))
case 2:case 5:Al(n,Nc,zc)
break
case 3:if(bl(n,l),(130023424&l)===l&&10<(t=Uc+500-mo())){if(0!==ne(n,0))break
if(((u=n.suspendedLanes)&l)!==l){sl(),n.pingedLanes|=n.suspendedLanes&u
break}n.timeoutHandle=ra(Al.bind(null,n,Nc,zc),t)
break}Al(n,Nc,zc)
break
case 4:if(bl(n,l),(4194240&l)===l)break
for(t=n.eventTimes,u=-1;0<l;){var i=31-_o(l)
o=1<<i,(i=t[i])>u&&(u=i),l&=~o}if(l=u,10<(l=(120>(l=mo()-l)?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*Sc(l/1960))-l)){n.timeoutHandle=ra(Al.bind(null,n,Nc,zc),l)
break}Al(n,Nc,zc)
break
default:throw Error(e(329))}}}return pl(n,mo()),n.callbackNode===r?hl.bind(null,n):null}function vl(e,n){var t=Bc
return e.current.memoizedState.isDehydrated&&(El(e,n).flags|=256),2!==(e=Cl(e,n))&&(n=Nc,Nc=t,null!==n&&ml(n)),e}function ml(e){null===Nc?Nc=e:Nc.push.apply(Nc,e)}function bl(e,n){for(n&=~Ic,n&=~Lc,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-_o(n),r=1<<t
e[t]=-1,n&=~r}}function yl(n){if(6&Oc)throw Error(e(327))
Dl()
var t=ne(n,0)
if(!(1&t))return pl(n,mo()),null
var r=Cl(n,t)
if(0!==n.tag&&2===r){var l=re(n)
0!==l&&(t=l,r=vl(n,l))}if(1===r)throw r=$c,El(n,0),bl(n,t),pl(n,mo()),r
if(6===r)throw Error(e(345))
return n.finishedWork=n.current.alternate,n.finishedLanes=t,Al(n,Nc,zc),pl(n,mo()),null}function wl(e,n){var t=Oc
Oc|=1
try{return e(n)}finally{0===(Oc=t)&&(Hc=mo()+500,ka&&jn())}}function gl(e){null!==Xc&&0===Xc.tag&&!(6&Oc)&&Dl()
var n=Oc
Oc|=1
var t=Tc.transition,r=Mo
try{if(Tc.transition=null,Mo=1,e)return e()}finally{Mo=r,Tc.transition=t,!(6&(Oc=n))&&jn()}}function kl(){Dc=Pc.current,Sn(Pc)}function El(e,n){e.finishedWork=null,e.finishedLanes=0
var t=e.timeoutHandle
if(-1!==t&&(e.timeoutHandle=-1,la(t)),null!==Mc)for(t=Mc.return;null!==t;){var r=t
switch(In(r),r.tag){case 1:null!=(r=r.type.childContextTypes)&&On()
break
case 3:mt(),Sn(ya),Sn(ba),gt()
break
case 5:yt(r)
break
case 4:mt()
break
case 13:case 19:Sn(Ya)
break
case 10:Zn(r.type._)
break
case 22:case 23:kl()}t=t.return}if(Fc=e,Mc=e=zl(e.current,null),Ac=Dc=n,jc=0,$c=null,Ic=Lc=Rc=0,Nc=Bc=null,null!==za){for(n=0;n<za.length;n++)if(null!==(r=(t=za[n]).interleaved)){t.interleaved=null
var l=r.next,u=t.pending
if(null!==u){var o=u.next
u.next=l,r.next=o}t.pending=r}za=null}return e}function xl(n,t){for(;;){var r=Mc
try{if(Qn(),Ja.current=ic,rc){for(var l=ec.memoizedState;null!==l;){var u=l.queue
null!==u&&(u.pending=null),l=l.next}rc=!1}if(Za=0,tc=nc=ec=null,lc=!1,uc=0,Cc.current=null,null===r||null===r.return){jc=1,$c=t,Mc=null
break}e:{var o=n,i=r.return,a=r,c=t
if(t=Ac,a.flags|=32768,null!==c&&"object"==typeof c&&"function"==typeof c.then){var s=c,f=a,d=f.tag
if(!(1&f.mode||0!==d&&11!==d&&15!==d)){var p=f.alternate
p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var h=br(i)
if(null!==h){h.flags&=-257,yr(h,i,a,0,t),1&h.mode&&mr(o,s,t),c=s
var v=(t=h).updateQueue
if(null===v){var m=new Set
m.add(c),t.updateQueue=m}else v.add(c)
break e}if(!(1&t)){mr(o,s,t),_l()
break e}c=Error(e(426))}else if(ja&&1&a.mode){var b=br(i)
if(null!==b){!(65536&b.flags)&&(b.flags|=256),yr(b,i,a,0,t),qn(fr(c,a))
break e}}o=c=fr(c,a),4!==jc&&(jc=2),null===Bc?Bc=[o]:Bc.push(o),o=i
do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t,ft(o,hr(0,c,t))
break e
case 1:a=c
var y=o.type,w=o.stateNode
if(!(128&o.flags||"function"!=typeof y.getDerivedStateFromError&&(null===w||"function"!=typeof w.componentDidCatch||null!==Kc&&Kc.has(w)))){o.flags|=65536,t&=-t,o.lanes|=t,ft(o,vr(o,a,t))
break e}}o=o.return}while(null!==o)}Ml(r)}catch(g){t=g,Mc===r&&null!==r&&(Mc=r=r.return)
continue}break}}function Sl(){var e=_c.current
return _c.current=ic,null===e?ic:e}function _l(){0!==jc&&3!==jc&&2!==jc||(jc=4),null===Fc||!(268435455&Rc)&&!(268435455&Lc)||bl(Fc,Ac)}function Cl(n,t){var r=Oc
Oc|=2
var l=Sl()
for(Fc===n&&Ac===t||(zc=null,El(n,t));;){try{Tl()
break}catch(u){xl(n,u)}1}if(Qn(),Oc=r,_c.current=l,null!==Mc)throw Error(e(261))
return Fc=null,Ac=0,jc}function Tl(){for(;null!==Mc;)Fl(Mc)}function Ol(){for(;null!==Mc&&!ho();)Fl(Mc)}function Fl(e){var n=mc(e.alternate,e,Dc)
e.memoizedProps=e.pendingProps,null===n?Ml(e):Mc=n,Cc.current=null}function Ml(e){var n=e
do{var t=n.alternate
if(e=n.return,32768&n.flags){if(null!==(t=Hr(t,n)))return t.flags&=32767,Mc=t,void 0
if(null===e)return jc=6,Mc=null,void 0
e.flags|=32768,e.subtreeFlags=0,e.deletions=null}else if(null!==(t=Ur(t,n,Dc)))return Mc=t,void 0
if(null!==(n=n.sibling))return Mc=n,void 0
Mc=n=e}while(null!==n)
0===jc&&(jc=5)}function Al(n,t,r){var l=Mo,u=Tc.transition
try{Tc.transition=null,Mo=1,function(n,t,r,l){do{Dl()}while(null!==Xc)
if(6&Oc)throw Error(e(327))
r=n.finishedWork
var u=n.finishedLanes
if(null===r)return null
if(n.finishedWork=null,n.finishedLanes=0,r===n.current)throw Error(e(177))
n.callbackNode=null,n.callbackPriority=0
var o=r.lanes|r.childLanes
if(function(e,n){var t=e.pendingLanes&~n
e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements
var r=e.eventTimes
for(e=e.expirationTimes;0<t;){var l=31-_o(t),u=1<<l
n[l]=0,r[l]=-1,e[l]=-1,t&=~u}}(n,o),n===Fc&&(Mc=Fc=null,Ac=0),!(2064&r.subtreeFlags)&&!(2064&r.flags)||qc||(qc=!0,Bl(go,function(){return Dl(),null})),o=!!(15990&r.flags),15990&r.subtreeFlags||o){o=Tc.transition,Tc.transition=null
var i=Mo
Mo=1
var a=Oc
Oc|=4,Cc.current=null,function(n,t){if(na=Uo,qe(n=Ke())){if("selectionStart"in n)var r={start:n.selectionStart,end:n.selectionEnd}
else{var l=(r=(r=n.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection()
if(l&&0!==l.rangeCount){r=l.anchorNode
var u=l.anchorOffset,o=l.focusNode
l=l.focusOffset
var i=0,a=-1,c=-1,s=0,f=0,d=n,p=null
e:for(;;){for(var h;d!==r||0!==u&&3!==d.nodeType||(a=i+u),d!==o||0!==l&&3!==d.nodeType||(c=i+l),3===d.nodeType&&(i+=d.nodeValue.length),null!==(h=d.firstChild);)p=d,d=h
for(;;){if(d===n)break e
if(p===r&&++s===u&&(a=i),p===o&&++f===l&&(c=i),null!==(h=d.nextSibling))break
p=(d=p).parentNode}d=h}r=-1===a||-1===c?null:{start:a,end:c}}else r=null}r=r||{start:0,end:0}}else r=null
for(ta={focusedElem:n,selectionRange:r},Uo=!1,gc=t;null!==gc;)if(n=(t=gc).child,1028&t.subtreeFlags&&null!==n)n.return=t,gc=n
else for(;null!==gc;){t=gc
try{var v=t.alternate
if(1024&t.flags)switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break
case 1:if(null!==v){var m=v.memoizedProps,b=v.memoizedState,y=t.stateNode,w=y.getSnapshotBeforeUpdate(t.elementType===t.type?m:ur(t.type,m),b)
y.V=w}break
case 3:var g=t.stateNode.containerInfo
1===g.nodeType?g.textContent="":9===g.nodeType&&g.documentElement&&g.removeChild(g.documentElement)
break
default:throw Error(e(163))}}catch(k){jl(t,t.return,k)}if(null!==(n=t.sibling)){n.return=t.return,gc=n
break}gc=t.return}v=kc,kc=!1}(n,r),rl(r,n),Xe(ta),Uo=!!na,ta=na=null,n.current=r,ul(r),vo(),Oc=a,Mo=i,Tc.transition=o}else n.current=r
if(qc&&(qc=!1,Xc=n,Yc=u),0===(o=n.pendingLanes)&&(Kc=null),function(e){if(So&&"function"==typeof So.onCommitFiberRoot)try{So.onCommitFiberRoot(xo,e,void 0,!(128&~e.current.flags))}catch(t){}}(r.stateNode),pl(n,mo()),null!==t)for(l=n.onRecoverableError,r=0;r<t.length;r++)l((u=t[r]).value,{componentStack:u.stack,digest:u.digest})
if(Vc)throw Vc=!1,n=Wc,Wc=null,n
return!!(1&Yc)&&0!==n.tag&&Dl(),1&(o=n.pendingLanes)?n===Jc?Gc++:(Gc=0,Jc=n):Gc=0,jn(),null}(n,t,r,l)}finally{Tc.transition=u,Mo=l}return null}function Dl(){if(null!==Xc){var n=ae(Yc),t=Tc.transition,r=Mo
try{if(Tc.transition=null,Mo=16>n?16:n,null===Xc)var l=!1
else{if(n=Xc,Xc=null,Yc=0,6&Oc)throw Error(e(331))
var u=Oc
for(Oc|=4,gc=n.current;null!==gc;){var o=gc,i=o.child
if(16&gc.flags){var a=o.deletions
if(null!==a){for(var c=0;c<a.length;c++){var s=a[c]
for(gc=s;null!==gc;){var f=gc
switch(f.tag){case 0:case 11:case 15:Wr(8,f,o)}var d=f.child
if(null!==d)d.return=f,gc=d
else for(;null!==gc;){var p=(f=gc).sibling,h=f.return
if(Xr(f),f===s){gc=null
break}if(null!==p){p.return=h,gc=p
break}gc=h}}}var v=o.alternate
if(null!==v){var m=v.child
if(null!==m){v.child=null
do{var b=m.sibling
m.sibling=null,m=b}while(null!==m)}}gc=o}}if(2064&o.subtreeFlags&&null!==i)i.return=o,gc=i
else e:for(;null!==gc;){if(2048&(o=gc).flags)switch(o.tag){case 0:case 11:case 15:Wr(9,o,o.return)}var y=o.sibling
if(null!==y){y.return=o.return,gc=y
break e}gc=o.return}}var w=n.current
for(gc=w;null!==gc;){var g=(i=gc).child
if(2064&i.subtreeFlags&&null!==g)g.return=i,gc=g
else e:for(i=w;null!==gc;){if(2048&(a=gc).flags)try{switch(a.tag){case 0:case 11:case 15:Kr(9,a)}}catch(E){jl(a,a.return,E)}if(a===i){gc=null
break e}var k=a.sibling
if(null!==k){k.return=a.return,gc=k
break e}gc=a.return}}if(Oc=u,jn(),So&&"function"==typeof So.onPostCommitFiberRoot)try{So.onPostCommitFiberRoot(xo,n)}catch(E){}l=!0}return l}finally{Mo=r,Tc.transition=t}}return!1}function Pl(e,n,t){e=ct(e,n=hr(0,n=fr(t,n),1),1),n=sl(),null!==e&&(oe(e,1,n),pl(e,n))}function jl(e,n,t){if(3===e.tag)Pl(e,e,t)
else for(;null!==n;){if(3===n.tag){Pl(n,e,t)
break}if(1===n.tag){var r=n.stateNode
if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Kc||!Kc.has(r))){n=ct(n,e=vr(n,e=fr(t,e),1),1),e=sl(),null!==n&&(oe(n,1,e),pl(n,e))
break}}n=n.return}}function $l(e,n,t){var r=e.pingCache
null!==r&&r.delete(n),n=sl(),e.pingedLanes|=e.suspendedLanes&t,Fc===e&&(Ac&t)===t&&(4===jc||3===jc&&(130023424&Ac)===Ac&&500>mo()-Uc?El(e,0):Ic|=t),pl(e,n)}function Rl(e,n){0===n&&(1&e.mode?(n=Fo,!(130023424&(Fo<<=1))&&(Fo=4194304)):n=1)
var t=sl()
null!==(e=ut(e,n))&&(oe(e,n,t),pl(e,t))}function Ll(e){var n=e.memoizedState,t=0
null!==n&&(t=n.retryLane),Rl(e,t)}function Il(n,t){var r=0
switch(n.tag){case 13:var l=n.stateNode,u=n.memoizedState
null!==u&&(r=u.retryLane)
break
case 19:l=n.stateNode
break
default:throw Error(e(314))}null!==l&&l.delete(t),Rl(n,r)}function Bl(e,n){return fo(e,n)}function Nl(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ul(e,n,t,r){return new Nl(e,n,t,r)}function Hl(e){return!(!(e=e.prototype)||!e.isReactComponent)}function zl(e,n){var t=e.alternate
return null===t?((t=Ul(e.tag,n,e.key,e.mode)).elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=14680064&e.flags,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=null===n?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Vl(n,t,r,l,u,o){var i=2
if(l=n,"function"==typeof n)Hl(n)&&(i=1)
else if("string"==typeof n)i=5
else e:switch(n){case Cu:return Wl(r.children,u,o,t)
case Tu:i=8,u|=8
break
case Ou:return(n=Ul(12,r,t,2|u)).elementType=Ou,n.lanes=o,n
case Du:return(n=Ul(13,r,t,u)).elementType=Du,n.lanes=o,n
case Pu:return(n=Ul(19,r,t,u)).elementType=Pu,n.lanes=o,n
case Ru:return Kl(r,u,o,t)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case Fu:i=10
break e
case Mu:i=9
break e
case Au:i=11
break e
case ju:i=14
break e
case $u:i=16,l=null
break e}throw Error(e(130,null==n?n:typeof n,""))}return(t=Ul(i,r,t,u)).elementType=n,t.type=l,t.lanes=o,t}function Wl(e,n,t,r){return(e=Ul(7,e,r,n)).lanes=t,e}function Kl(e,n,t,r){return(e=Ul(22,e,r,n)).elementType=Ru,e.lanes=t,e.stateNode={isHidden:!1},e}function ql(e,n,t){return(e=Ul(6,e,null,n)).lanes=t,e}function Xl(e,n,t){return(n=Ul(4,null!==e.children?e.children:[],e.key,n)).lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Yl(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ue(0),this.expirationTimes=ue(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ue(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Gl(e,n,t,r,l,u,o,i,a){return e=new Yl(e,n,t,i,a),1===n?(n=1,!0===u&&(n|=8)):n=0,u=Ul(3,null,null,n),e.current=u,u.stateNode=e,u.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},ot(u),e}function Jl(n){if(!n)return ma
e:{if(Y(n=n.B)!==n||1!==n.tag)throw Error(e(170))
var t=n
do{switch(t.tag){case 3:t=t.stateNode.context
break e
case 1:if(Tn(t.type)){t=t.stateNode.R
break e}}t=t.return}while(null!==t)
throw Error(e(171))}if(1===n.tag){var r=n.type
if(Tn(r))return Mn(n,r,t)}return t}function Ql(e,n,t,r,l,u,o,i,a){return(e=Gl(t,r,!0,e,0,u,0,i,a)).context=Jl(null),t=e.current,(u=at(r=sl(),l=fl(t))).callback=null!=n?n:null,ct(t,u,l),e.current.lanes=l,oe(e,l,r),pl(e,r),e}function Zl(e,n,t,r){var l=n.current,u=sl(),o=fl(l)
return t=Jl(t),null===n.context?n.context=t:n.pendingContext=t,(n=at(u,o)).payload={element:e},null!==(r=void 0===r?null:r)&&(n.callback=r),null!==(e=ct(l,n,o))&&(dl(e,l,o,u),st(e,l,o)),o}function eu(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function nu(e,n){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var t=e.retryLane
e.retryLane=0!==t&&t<n?t:n}}function tu(e,n){nu(e,n),(e=e.alternate)&&nu(e,n)}function ru(e){this.W=e}function lu(e){this.W=e}function uu(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function ou(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function iu(){}function au(e,n,t,r,l){var u=t.U
if(u){var o=u
if("function"==typeof l){var i=l
l=function(){var e=eu(o)
i.call(e)}}Zl(n,o,e,l)}else o=function(e,n,t,r,l){if(l){if("function"==typeof r){var u=r
r=function(){var e=eu(o)
u.call(e)}}var o=Ql(n,r,e,0,null,!1,0,"",iu)
return e.U=o,e[sa]=o.current,rn(8===e.nodeType?e.parentNode:e),gl(),o}for(;l=e.lastChild;)e.removeChild(l)
if("function"==typeof r){var i=r
r=function(){var e=eu(a)
i.call(e)}}var a=Gl(e,0,!1,null,0,!1,0,"",iu)
return e.U=a,e[sa]=a.current,rn(8===e.nodeType?e.parentNode:e),gl(function(){Zl(n,a,t,r)}),a}(t,n,e,l,r)
return eu(o)}if(_)return D
_=1
var cu=n(),su=c(),fu=new Set,du={},pu=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),hu=Object.prototype.hasOwnProperty,vu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,mu={},bu={},yu={}
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){yu[e]=new l(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0]
yu[n]=new l(n,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){yu[e]=new l(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){yu[e]=new l(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){yu[e]=new l(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){yu[e]=new l(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){yu[e]=new l(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){yu[e]=new l(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){yu[e]=new l(e,5,!1,e.toLowerCase(),null,!1,!1)})
var wu=/[\-:]([a-z])/g
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(wu,u)
yu[n]=new l(n,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(wu,u)
yu[n]=new l(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(wu,u)
yu[n]=new l(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){yu[e]=new l(e,1,!1,e.toLowerCase(),null,!1,!1)}),yu.xlinkHref=new l("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){yu[e]=new l(e,1,!1,e.toLowerCase(),null,!0,!0)})
var gu,ku,Eu,xu=cu.p,Su=Symbol.for("react.element"),_u=Symbol.for("react.portal"),Cu=Symbol.for("react.fragment"),Tu=Symbol.for("react.strict_mode"),Ou=Symbol.for("react.profiler"),Fu=Symbol.for("react.provider"),Mu=Symbol.for("react.context"),Au=Symbol.for("react.forward_ref"),Du=Symbol.for("react.suspense"),Pu=Symbol.for("react.suspense_list"),ju=Symbol.for("react.memo"),$u=Symbol.for("react.lazy"),Ru=Symbol.for("react.offscreen"),Lu=Symbol.iterator,Iu=Object.assign,Bu=!1,Nu=Array.isArray,Uu=(Eu=function(e,n){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=n
else{for((ku=ku||document.createElement("div")).innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=ku.firstChild;e.firstChild;)e.removeChild(e.firstChild)
for(;n.firstChild;)e.appendChild(n.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,n,t,r){MSApp.execUnsafeLocalFunction(function(){return Eu(e,n)})}:Eu),Hu={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zu=["Webkit","ms","Moz","O"]
Object.keys(Hu).forEach(function(e){zu.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Hu[n]=Hu[e]})})
var Vu=Iu({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),Wu=null,Ku=null,qu=null,Xu=null,Yu=!1,Gu=!1
if(pu)try{var Ju={}
Object.defineProperty(Ju,"passive",{get:function(){Gu=!0}}),window.addEventListener("test",Ju,Ju),window.removeEventListener("test",Ju,Ju)}catch(Eu){Gu=!1}var Qu,Zu,eo,no,to,ro,lo,uo,oo=!1,io=null,ao=!1,co=null,so={onError:function(e){oo=!0,io=e}},fo=su.unstable_scheduleCallback,po=su.unstable_cancelCallback,ho=su.unstable_shouldYield,vo=su.unstable_requestPaint,mo=su.unstable_now,bo=su.unstable_getCurrentPriorityLevel,yo=su.unstable_ImmediatePriority,wo=su.unstable_UserBlockingPriority,go=su.unstable_NormalPriority,ko=su.unstable_LowPriority,Eo=su.unstable_IdlePriority,xo=null,So=null,_o=Math.clz32?Math.clz32:function(e){return 0==(e>>>=0)?32:31-(Co(e)/To|0)|0},Co=Math.log,To=Math.LN2,Oo=64,Fo=4194304,Mo=0,Ao=!1,Do=[],Po=null,jo=null,$o=null,Ro=new Map,Lo=new Map,Io=[],Bo="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),No=xu.ReactCurrentBatchConfig,Uo=!0,Ho=null,zo=null,Vo=null,Wo=null,Ko={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qo=Ce(Ko),Xo=Iu({},Ko,{view:0,detail:0}),Yo=Ce(Xo),Go=Iu({},Xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Oe,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==uo&&(uo&&"mousemove"===e.type?(ro=e.screenX-uo.screenX,lo=e.screenY-uo.screenY):lo=ro=0,uo=e),ro)},movementY:function(e){return"movementY"in e?e.movementY:lo}}),Jo=Ce(Go),Qo=Ce(Iu({},Go,{dataTransfer:0})),Zo=Ce(Iu({},Xo,{relatedTarget:0})),ei=Ce(Iu({},Ko,{animationName:0,elapsedTime:0,pseudoElement:0})),ni=Iu({},Ko,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ti=Ce(ni),ri=Ce(Iu({},Ko,{data:0})),li={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ui={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},oi={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},ii=Iu({},Xo,{key:function(e){if(e.key){var n=li[e.key]||e.key
if("Unidentified"!==n)return n}return"keypress"===e.type?13===(e=xe(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?ui[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Oe,charCode:function(e){return"keypress"===e.type?xe(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?xe(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),ai=Ce(ii),ci=Ce(Iu({},Go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),si=Ce(Iu({},Xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Oe})),fi=Ce(Iu({},Ko,{propertyName:0,elapsedTime:0,pseudoElement:0})),di=Iu({},Go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pi=Ce(di),hi=[9,13,27,32],vi=pu&&"CompositionEvent"in window,mi=null
pu&&"documentMode"in document&&(mi=document.documentMode)
var bi=pu&&"TextEvent"in window&&!mi,yi=pu&&(!vi||mi&&8<mi&&11>=mi),wi=String.fromCharCode(32),gi=!1,ki=!1,Ei={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},xi=null,Si=null,_i=!1
if(pu){var Ci
if(pu){var Ti="oninput"in document
if(!Ti){var Oi=document.createElement("div")
Oi.setAttribute("oninput","return;"),Ti="function"==typeof Oi.oninput}Ci=Ti}else Ci=!1
_i=Ci&&(!document.documentMode||9<document.documentMode)}var Fi="function"==typeof Object.is?Object.is:function(e,n){return e===n&&(0!==e||1/e==1/n)||e!=e&&n!=n},Mi=pu&&"documentMode"in document&&11>=document.documentMode,Ai=null,Di=null,Pi=null,ji=!1,$i={animationend:Ge("Animation","AnimationEnd"),animationiteration:Ge("Animation","AnimationIteration"),animationstart:Ge("Animation","AnimationStart"),transitionend:Ge("Transition","TransitionEnd")},Ri={},Li={}
pu&&(Li=document.createElement("div").style,"AnimationEvent"in window||(delete $i.animationend.animation,delete $i.animationiteration.animation,delete $i.animationstart.animation),"TransitionEvent"in window||delete $i.transitionend.transition)
for(var Ii=Je("animationend"),Bi=Je("animationiteration"),Ni=Je("animationstart"),Ui=Je("transitionend"),Hi=new Map,zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" "),Vi=0;Vi<zi.length;Vi++){var Wi=zi[Vi]
Qe(Wi.toLowerCase(),"on"+(Wi[0].toUpperCase()+Wi.slice(1)))}Qe(Ii,"onAnimationEnd"),Qe(Bi,"onAnimationIteration"),Qe(Ni,"onAnimationStart"),Qe("dblclick","onDoubleClick"),Qe("focusin","onFocus"),Qe("focusout","onBlur"),Qe(Ui,"onTransitionEnd"),r("onMouseEnter",["mouseout","mouseover"]),r("onMouseLeave",["mouseout","mouseover"]),r("onPointerEnter",["pointerout","pointerover"]),r("onPointerLeave",["pointerout","pointerover"]),t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),t("onBeforeInput",["compositionend","keypress","textInput","paste"]),t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "))
var Ki,qi,Xi,Yi,Gi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ji=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gi)),Qi="_reactListening"+Math.random().toString(36).slice(2),Zi=/\r\n?/g,ea=/\u0000|\uFFFD/g,na=null,ta=null,ra="function"==typeof setTimeout?setTimeout:void 0,la="function"==typeof clearTimeout?clearTimeout:void 0,ua="function"==typeof Promise?Promise:void 0,oa="function"==typeof queueMicrotask?queueMicrotask:void 0!==ua?function(e){return ua.resolve(null).then(e).catch(vn)}:ra,ia=Math.random().toString(36).slice(2),aa="__reactFiber$"+ia,ca="__reactProps$"+ia,sa="__reactContainer$"+ia,fa="__reactEvents$"+ia,da="__reactListeners$"+ia,pa="__reactHandles$"+ia,ha=[],va=-1,ma={},ba=xn(ma),ya=xn(!1),wa=ma,ga=null,ka=!1,Ea=!1,xa=[],Sa=0,_a=null,Ca=0,Ta=[],Oa=0,Fa=null,Ma=1,Aa="",Da=null,Pa=null,ja=!1,$a=null,Ra=xu.ReactCurrentBatchConfig,La=Jn(!0),Ia=Jn(!1),Ba=xn(null),Na=null,Ua=null,Ha=null,za=null,Va=!1,Wa={},Ka=xn(Wa),qa=xn(Wa),Xa=xn(Wa),Ya=xn(0),Ga=[],Ja=xu.ReactCurrentDispatcher,Qa=xu.ReactCurrentBatchConfig,Za=0,ec=null,nc=null,tc=null,rc=!1,lc=!1,uc=0,oc=0,ic={readContext:tt,useCallback:kt,useContext:kt,useEffect:kt,useImperativeHandle:kt,useInsertionEffect:kt,useLayoutEffect:kt,useMemo:kt,useReducer:kt,useRef:kt,useState:kt,useDebugValue:kt,useDeferredValue:kt,useTransition:kt,useMutableSource:kt,useSyncExternalStore:kt,useId:kt,unstable_isNewReconciler:!1},ac={readContext:tt,useCallback:function(e,n){return _t().memoizedState=[e,void 0===n?null:n],e},useContext:tt,useEffect:Ht,useImperativeHandle:function(e,n,t){return t=null!=t?t.concat([e]):null,Nt(4194308,4,Kt.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Nt(4194308,4,e,n)},useInsertionEffect:function(e,n){return Nt(4,2,e,n)},useMemo:function(e,n){var t=_t()
return n=void 0===n?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=_t()
return n=void 0!==t?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=er.bind(null,ec,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},_t().memoizedState=e},useState:Lt,useDebugValue:Xt,useDeferredValue:function(e){return _t().memoizedState=e},useTransition:function(){var e=Lt(!1),n=e[0]
return e=Qt.bind(null,e[1]),_t().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(n,t,r){var l=ec,u=_t()
if(ja){if(void 0===r)throw Error(e(407))
r=r()}else{if(r=t(),null===Fc)throw Error(e(349))
30&Za||Dt(l,t,r)}u.memoizedState=r
var o={value:r,getSnapshot:t}
return u.queue=o,Ht(jt.bind(null,l,o,n),[n]),l.flags|=2048,It(9,Pt.bind(null,l,o,r,t),void 0,null),r},useId:function(){var e=_t(),n=Fc.identifierPrefix
if(ja){var t=Aa
n=":"+n+"R"+(t=(Ma&~(1<<32-_o(Ma)-1)).toString(32)+t),0<(t=uc++)&&(n+="H"+t.toString(32)),n+=":"}else n=":"+n+"r"+(t=oc++).toString(32)+":"
return e.memoizedState=n},unstable_isNewReconciler:!1},cc={readContext:tt,useCallback:Yt,useContext:tt,useEffect:zt,useImperativeHandle:qt,useInsertionEffect:Vt,useLayoutEffect:Wt,useMemo:Gt,useReducer:Ot,useRef:Bt,useState:function(){return Ot(Tt)},useDebugValue:Xt,useDeferredValue:function(e){return Jt(Ct(),nc.memoizedState,e)},useTransition:function(){return[Ot(Tt)[0],Ct().memoizedState]},useMutableSource:Mt,useSyncExternalStore:At,useId:Zt,unstable_isNewReconciler:!1},sc={readContext:tt,useCallback:Yt,useContext:tt,useEffect:zt,useImperativeHandle:qt,useInsertionEffect:Vt,useLayoutEffect:Wt,useMemo:Gt,useReducer:Ft,useRef:Bt,useState:function(){return Ft(Tt)},useDebugValue:Xt,useDeferredValue:function(e){var n=Ct()
return null===nc?n.memoizedState=e:Jt(n,nc.memoizedState,e)},useTransition:function(){return[Ft(Tt)[0],Ct().memoizedState]},useMutableSource:Mt,useSyncExternalStore:At,useId:Zt,unstable_isNewReconciler:!1},fc={isMounted:function(e){return!!(e=e.B)&&Y(e)===e},enqueueSetState:function(e,n,t){e=e.B
var r=sl(),l=fl(e),u=at(r,l)
u.payload=n,null!=t&&(u.callback=t),null!==(n=ct(e,u,l))&&(dl(n,e,l,r),st(n,e,l))},enqueueReplaceState:function(e,n,t){e=e.B
var r=sl(),l=fl(e),u=at(r,l)
u.tag=1,u.payload=n,null!=t&&(u.callback=t),null!==(n=ct(e,u,l))&&(dl(n,e,l,r),st(n,e,l))},enqueueForceUpdate:function(e,n){e=e.B
var t=sl(),r=fl(e),l=at(t,r)
l.tag=2,null!=n&&(l.callback=n),null!==(n=ct(e,l,r))&&(dl(n,e,r,t),st(n,e,r))}},dc="function"==typeof WeakMap?WeakMap:Map,pc=xu.ReactCurrentOwner,hc=!1,vc={dehydrated:null,treeContext:null,retryLane:0}
Ki=function(e,n){for(var t=n.child;null!==t;){if(5===t.tag||6===t.tag)e.appendChild(t.stateNode)
else if(4!==t.tag&&null!==t.child){t.child.return=t,t=t.child
continue}if(t===n)break
for(;null===t.sibling;){if(null===t.return||t.return===n)return
t=t.return}t.sibling.return=t.return,t=t.sibling}},qi=function(){},Xi=function(e,n,t,r){var l=e.memoizedProps
if(l!==r){e=n.stateNode,ht(Ka.current)
var u,o=null
switch(t){case"input":l=w(e,l),r=w(e,r),o=[]
break
case"select":l=Iu({},l,{value:void 0}),r=Iu({},r,{value:void 0}),o=[]
break
case"textarea":l=T(e,l),r=T(e,r),o=[]
break
default:"function"!=typeof l.onClick&&"function"==typeof r.onClick&&(e.onclick=pn)}for(c in L(t,r),t=null,l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&null!=l[c])if("style"===c){var i=l[c]
for(u in i)i.hasOwnProperty(u)&&(t||(t={}),t[u]="")}else"dangerouslySetInnerHTML"!==c&&"children"!==c&&"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(du.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null))
for(c in r){var a=r[c]
if(i=null!=l?l[c]:void 0,r.hasOwnProperty(c)&&a!==i&&(null!=a||null!=i))if("style"===c)if(i){for(u in i)!i.hasOwnProperty(u)||a&&a.hasOwnProperty(u)||(t||(t={}),t[u]="")
for(u in a)a.hasOwnProperty(u)&&i[u]!==a[u]&&(t||(t={}),t[u]=a[u])}else t||(o||(o=[]),o.push(c,t)),t=a
else"dangerouslySetInnerHTML"===c?(a=a?a.M:void 0,i=i?i.M:void 0,null!=a&&i!==a&&(o=o||[]).push(c,a)):"children"===c?"string"!=typeof a&&"number"!=typeof a||(o=o||[]).push(c,""+a):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&(du.hasOwnProperty(c)?(null!=a&&"onScroll"===c&&nn("scroll",e),o||i===a||(o=[])):(o=o||[]).push(c,a))}t&&(o=o||[]).push("style",t)
var c=o;(n.updateQueue=c)&&(n.flags|=4)}},Yi=function(e,n,t,r){t!==r&&(n.flags|=4)}
var mc,bc=!1,yc=!1,wc="function"==typeof WeakSet?WeakSet:Set,gc=null,kc=!1,Ec=null,xc=!1,Sc=Math.ceil,_c=xu.ReactCurrentDispatcher,Cc=xu.ReactCurrentOwner,Tc=xu.ReactCurrentBatchConfig,Oc=0,Fc=null,Mc=null,Ac=0,Dc=0,Pc=xn(0),jc=0,$c=null,Rc=0,Lc=0,Ic=0,Bc=null,Nc=null,Uc=0,Hc=1/0,zc=null,Vc=!1,Wc=null,Kc=null,qc=!1,Xc=null,Yc=0,Gc=0,Jc=null,Qc=-1,Zc=0
mc=function(n,t,r){if(null!==n)if(n.memoizedProps!==t.pendingProps||ya.current)hc=!0
else{if(0===(n.lanes&r)&&!(128&t.flags))return hc=!1,function(e,n,t){switch(n.tag){case 3:Or(n),Kn()
break
case 5:bt(n)
break
case 1:Tn(n.type)&&An(n)
break
case 4:vt(n,n.stateNode.containerInfo)
break
case 10:var r=n.type._,l=n.memoizedProps.value
_n(Ba,r.h),r.h=l
break
case 13:if(null!==(r=n.memoizedState))return null!==r.dehydrated?(_n(Ya,1&Ya.current),n.flags|=128,null):0!==(t&n.child.childLanes)?Ar(e,n,t):(_n(Ya,1&Ya.current),null!==(e=Ir(e,n,t))?e.sibling:null)
_n(Ya,1&Ya.current)
break
case 19:if(r=0!==(t&n.childLanes),128&e.flags){if(r)return Rr(e,n,t)
n.flags|=128}if(null!==(l=n.memoizedState)&&(l.rendering=null,l.tail=null,l.lastEffect=null),_n(Ya,Ya.current),r)break
return null
case 22:case 23:return n.lanes=0,xr(e,n,t)}return Ir(e,n,t)}(n,t,r)
hc=!!(131072&n.flags)}else hc=!1,ja&&1048576&t.flags&&Rn(t,Ca,t.index)
switch(t.lanes=0,t.tag){case 2:var l=t.type
Lr(n,t),n=t.pendingProps
var u=Cn(t,ba.current)
nt(t,r),u=xt(null,t,l,n,u,r)
var o=St()
return t.flags|=1,"object"==typeof u&&null!==u&&"function"==typeof u.render&&void 0===u.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Tn(l)?(o=!0,An(t)):o=!1,t.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,ot(t),u.updater=fc,t.stateNode=u,u.B=t,sr(t,l,n,r),t=Tr(null,t,l,!0,o,r)):(t.tag=0,ja&&o&&Ln(t),wr(null,t,u,r),t=t.child),t
case 16:l=t.elementType
e:{switch(Lr(n,t),n=t.pendingProps,l=(u=l.T)(l.C),t.type=l,u=t.tag=function(e){if("function"==typeof e)return Hl(e)?1:0
if(null!=e){if((e=e.$$typeof)===Au)return 11
if(e===ju)return 14}return 2}(l),n=ur(l,n),u){case 0:t=_r(null,t,l,n,r)
break e
case 1:t=Cr(null,t,l,n,r)
break e
case 11:t=gr(null,t,l,n,r)
break e
case 14:t=kr(null,t,l,ur(l.type,n),r)
break e}throw Error(e(306,l,""))}return t
case 0:return l=t.type,u=t.pendingProps,_r(n,t,l,u=t.elementType===l?u:ur(l,u),r)
case 1:return l=t.type,u=t.pendingProps,Cr(n,t,l,u=t.elementType===l?u:ur(l,u),r)
case 3:e:{if(Or(t),null===n)throw Error(e(387))
l=t.pendingProps,u=(o=t.memoizedState).element,it(n,t),dt(t,l,null,r)
var i=t.memoizedState
if(l=i.element,o.isDehydrated){if(o={element:l,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,256&t.flags){t=Fr(n,t,l,r,u=fr(Error(e(423)),t))
break e}if(l!==u){t=Fr(n,t,l,r,u=fr(Error(e(424)),t))
break e}for(Pa=bn(t.stateNode.containerInfo.firstChild),Da=t,ja=!0,$a=null,r=Ia(t,null,l,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(Kn(),l===u){t=Ir(n,t,r)
break e}wr(n,t,l,r)}t=t.child}return t
case 5:return bt(t),null===n&&Hn(t),l=t.type,u=t.pendingProps,o=null!==n?n.memoizedProps:null,i=u.children,hn(l,u)?i=null:null!==o&&hn(l,o)&&(t.flags|=32),Sr(n,t),wr(n,t,i,r),t.child
case 6:return null===n&&Hn(t),null
case 13:return Ar(n,t,r)
case 4:return vt(t,t.stateNode.containerInfo),l=t.pendingProps,null===n?t.child=La(t,null,l,r):wr(n,t,l,r),t.child
case 11:return l=t.type,u=t.pendingProps,gr(n,t,l,u=t.elementType===l?u:ur(l,u),r)
case 7:return wr(n,t,t.pendingProps,r),t.child
case 8:case 12:return wr(n,t,t.pendingProps.children,r),t.child
case 10:e:{if(l=t.type._,u=t.pendingProps,o=t.memoizedProps,i=u.value,_n(Ba,l.h),l.h=i,null!==o)if(Fi(o.value,i)){if(o.children===u.children&&!ya.current){t=Ir(n,t,r)
break e}}else for(null!==(o=t.child)&&(o.return=t);null!==o;){var a=o.dependencies
if(null!==a){i=o.child
for(var c=a.firstContext;null!==c;){if(c.context===l){if(1===o.tag){(c=at(-1,r&-r)).tag=2
var s=o.updateQueue
if(null!==s){var f=(s=s.shared).pending
null===f?c.next=c:(c.next=f.next,f.next=c),s.pending=c}}o.lanes|=r,null!==(c=o.alternate)&&(c.lanes|=r),et(o.return,r,t),a.lanes|=r
break}c=c.next}}else if(10===o.tag)i=o.type===t.type?null:o.child
else if(18===o.tag){if(null===(i=o.return))throw Error(e(341))
i.lanes|=r,null!==(a=i.alternate)&&(a.lanes|=r),et(i,r,t),i=o.sibling}else i=o.child
if(null!==i)i.return=o
else for(i=o;null!==i;){if(i===t){i=null
break}if(null!==(o=i.sibling)){o.return=i.return,i=o
break}i=i.return}o=i}wr(n,t,u.children,r),t=t.child}return t
case 9:return u=t.type,l=t.pendingProps.children,nt(t,r),l=l(u=tt(u)),t.flags|=1,wr(n,t,l,r),t.child
case 14:return u=ur(l=t.type,t.pendingProps),kr(n,t,l,u=ur(l.type,u),r)
case 15:return Er(n,t,t.type,t.pendingProps,r)
case 17:return l=t.type,u=t.pendingProps,u=t.elementType===l?u:ur(l,u),Lr(n,t),t.tag=1,Tn(l)?(n=!0,An(t)):n=!1,nt(t,r),ar(t,l,u),sr(t,l,u,r),Tr(null,t,l,!0,n,r)
case 19:return Rr(n,t,r)
case 22:return xr(n,t,r)}throw Error(e(156,t.tag))}
var es="function"==typeof reportError?reportError:function(e){void 0}
lu.prototype.render=ru.prototype.render=function(n){var t=this.W
if(null===t)throw Error(e(409))
Zl(n,t,null,null)},lu.prototype.unmount=ru.prototype.unmount=function(){var e=this.W
if(null!==e){this.W=null
var n=e.containerInfo
gl(function(){Zl(null,e,null,null)}),n[sa]=null}},lu.prototype.unstable_scheduleHydration=function(e){if(e){var n=no()
e={blockedOn:null,target:e,priority:n}
for(var t=0;t<Io.length&&0!==n&&n<Io[t].priority;t++);Io.splice(t,0,e),0===t&&fe(e)}},Qu=function(e){switch(e.tag){case 3:var n=e.stateNode
if(n.current.memoizedState.isDehydrated){var t=ee(n.pendingLanes)
0!==t&&(ie(n,1|t),pl(n,mo()),!(6&Oc)&&(Hc=mo()+500,jn()))}break
case 13:gl(function(){var n=ut(e,1)
if(null!==n){var t=sl()
dl(n,e,1,t)}}),tu(e,1)}},Zu=function(e){if(13===e.tag){var n=ut(e,134217728)
null!==n&&dl(n,e,134217728,sl()),tu(e,134217728)}},eo=function(e){if(13===e.tag){var n=fl(e),t=ut(e,n)
null!==t&&dl(t,e,n,sl()),tu(e,n)}},no=function(){return Mo},to=function(e,n){var t=Mo
try{return Mo=e,n()}finally{Mo=t}},Ku=function(n,t,r){switch(t){case"input":if(E(n,r),t=r.name,"radio"===r.type&&null!=t){for(r=n;r.parentNode;)r=r.parentNode
for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var l=r[t]
if(l!==n&&l.form===n.form){var u=En(l)
if(!u)throw Error(e(90))
b(l),E(l,u)}}}break
case"textarea":F(n,r)
break
case"select":null!=(t=r.value)&&C(n,!!r.multiple,t,!1)}},z=wl,V=gl
var ns={usingClientEntryPoint:!1,Events:[gn,kn,En,U,H,wl]},ts={findFiberByHostInstance:wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rs={bundleType:ts.bundleType,version:ts.version,rendererPackageName:ts.rendererPackageName,rendererConfig:ts.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xu.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Q(e))?null:e.stateNode},findFiberByHostInstance:ts.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"}
if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ls=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(!ls.isDisabled&&ls.supportsFiber)try{xo=ls.inject(rs),So=ls}catch(Eu){}}return D.p=ns,D.createPortal=function(n,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null
if(!uu(t))throw Error(e(200))
return function(e,n,t){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:_u,key:null==r?null:""+r,children:e,containerInfo:n,implementation:t}}(n,t,null,r)},D.createRoot=function(n,t){if(!uu(n))throw Error(e(299))
var r=!1,l="",u=es
return null!=t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(l=t.identifierPrefix),void 0!==t.onRecoverableError&&(u=t.onRecoverableError)),t=Gl(n,1,!1,null,0,r,0,l,u),n[sa]=t.current,rn(8===n.nodeType?n.parentNode:n),new ru(t)},D.findDOMNode=function(n){if(null==n)return null
if(1===n.nodeType)return n
var t=n.B
if(void 0===t){if("function"==typeof n.render)throw Error(e(188))
throw n=Object.keys(n).join(","),Error(e(268,n))}return null===(n=Q(t))?null:n.stateNode},D.flushSync=function(e){return gl(e)},D.hydrate=function(n,t,r){if(!ou(t))throw Error(e(200))
return au(null,n,t,!0,r)},D.hydrateRoot=function(n,t,r){if(!uu(n))throw Error(e(405))
var l=null!=r&&r.hydratedSources||null,u=!1,o="",i=es
if(null!=r&&(!0===r.unstable_strictMode&&(u=!0),void 0!==r.identifierPrefix&&(o=r.identifierPrefix),void 0!==r.onRecoverableError&&(i=r.onRecoverableError)),t=Ql(t,null,n,1,null!=r?r:null,u,0,o,i),n[sa]=t.current,rn(n),l)for(n=0;n<l.length;n++)u=(u=(r=l[n]).K)(r.q),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[r,u]:t.mutableSourceEagerHydrationData.push(r,u)
return new lu(t)},D.render=function(n,t,r){if(!ou(t))throw Error(e(200))
return au(null,n,t,!1,r)},D.unmountComponentAtNode=function(n){if(!ou(n))throw Error(e(40))
return!!n.U&&(gl(function(){au(null,null,n,!1,function(){n.U=null,n[sa]=null})}),!0)},D.unstable_batchedUpdates=wl,D.unstable_renderSubtreeIntoContainer=function(n,t,r,l){if(!ou(r))throw Error(e(200))
if(null==n||void 0===n.B)throw Error(e(38))
return au(n,t,r,!1,l)},D.version="18.3.1-next-f1338f8080-20240426",D}async function r(e,n={}){const t=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const n=document.cookie.split(";")
for(let t of n){const[e,n]=t.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(n)}return null}(),r={...n,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...t&&{"X-CSRF-Token":t},...n.headers}}
if(r.body&&"string"==typeof r.body)try{const e=JSON.parse(r.body)
e.X=Date.now(),r.body=JSON.stringify(e)}catch(l){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const n=await fetch(e,r)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(n=>!e.headers.get(n)).length>0,0}(n),n}catch(u){throw void 0,u}}var l,u,o=Object.defineProperty,i=(e,n,t)=>((e,n,t)=>n in e?o(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t)(e,"symbol"!=typeof n?n+"":n,t)
import{g as a,r as c,i as s,s as f}from"./vendor-BkEynug1.js"
!function(){function e(e){if(e.ep)return
e.ep=!0
const n=function(e){const n={}
return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?n.credentials="include":"anonymous"===e.crossOrigin?n.credentials="omit":n.credentials="same-origin",n}(e)
fetch(e.href,n)}const n=document.createElement("link").relList
if(!(n&&n.supports&&n.supports("modulepreload"))){for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n)
new MutationObserver(n=>{for(const t of n)if("childList"===t.type)for(const n of t.addedNodes)"LINK"===n.tagName&&"modulepreload"===n.rel&&e(n)}).observe(document,{childList:!0,subtree:!0})}}()
const d={},p=function(e,n,t){function r(e){const n=new Event("vite:preloadError",{cancelable:!0})
if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e}let l=Promise.resolve()
if(n&&n.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))}
document.getElementsByTagName("link")
const t=document.querySelector("meta[property=csp-nonce]"),r=t?.nonce||t?.getAttribute("nonce")
l=e(n.map(e=>{if((e=function(e){return"/"+e}(e))in d)return
d[e]=!0
const n=e.endsWith(".css"),t=n?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${e}"]${t}`))return
const l=document.createElement("link")
return l.rel=n?"stylesheet":"modulepreload",n||(l.as="script"),l.crossOrigin="",l.href=e,r&&l.setAttribute("nonce",r),document.head.appendChild(l),n?new Promise((n,t)=>{l.addEventListener("load",n),l.addEventListener("error",()=>t(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return l.then(n=>{for(const e of n||[])"rejected"===e.status&&r(e.reason)
return e().catch(r)})}
var h,v,m,b,y={exports:{}},w={},g={exports:{}},k={},E=function(){return b||(b=1,y.exports=function(){function e(e,n,t){var l,a={},c=null,s=null
for(l in void 0!==t&&(c=""+t),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(s=n.ref),n)u.call(n,l)&&!i.hasOwnProperty(l)&&(a[l]=n[l])
if(e&&e.defaultProps)for(l in n=e.defaultProps)void 0===a[l]&&(a[l]=n[l])
return{$$typeof:r,type:e,key:c,ref:s,props:a,t:o.current}}if(m)return w
m=1
var t=n(),r=Symbol.for("react.element"),l=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,o=t.p.ReactCurrentOwner,i={key:!0,ref:!0,o:!0,i:!0}
return w.Fragment=l,w.jsx=e,w.jsxs=e,w}()),y.exports}(),x=n()
const S=a(x)
var _,C,T,O,F,M={},A={exports:{}},D={},P=function(){if(T)return M
T=1
var e=function(){return C||(C=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){void 0}}(),A.exports=t()),A.exports}()
return M.createRoot=e.createRoot,M.hydrateRoot=e.hydrateRoot,M}()
const j=a(function(){function e(u,o){if(u===o)return!0
if(u&&o&&"object"==typeof u&&"object"==typeof o){if(u.constructor!==o.constructor)return!1
var i,a,c,s
if(Array.isArray(u)){if((i=u.length)!=o.length)return!1
for(a=i;0!==a--;)if(!e(u[a],o[a]))return!1
return!0}if(t&&u instanceof Map&&o instanceof Map){if(u.size!==o.size)return!1
for(s=u.entries();!(a=s.next()).done;)if(!o.has(a.value[0]))return!1
for(s=u.entries();!(a=s.next()).done;)if(!e(a.value[1],o.get(a.value[0])))return!1
return!0}if(r&&u instanceof Set&&o instanceof Set){if(u.size!==o.size)return!1
for(s=u.entries();!(a=s.next()).done;)if(!o.has(a.value[0]))return!1
return!0}if(l&&ArrayBuffer.isView(u)&&ArrayBuffer.isView(o)){if((i=u.length)!=o.length)return!1
for(a=i;0!==a--;)if(u[a]!==o[a])return!1
return!0}if(u.constructor===RegExp)return u.source===o.source&&u.flags===o.flags
if(u.valueOf!==Object.prototype.valueOf&&"function"==typeof u.valueOf&&"function"==typeof o.valueOf)return u.valueOf()===o.valueOf()
if(u.toString!==Object.prototype.toString&&"function"==typeof u.toString&&"function"==typeof o.toString)return u.toString()===o.toString()
if((i=(c=Object.keys(u)).length)!==Object.keys(o).length)return!1
for(a=i;0!==a--;)if(!Object.prototype.hasOwnProperty.call(o,c[a]))return!1
if(n&&u instanceof Element)return!1
for(a=i;0!==a--;)if(("_owner"!==c[a]&&"__v"!==c[a]&&"__o"!==c[a]||!u.$$typeof)&&!e(u[c[a]],o[c[a]]))return!1
return!0}return u!=u&&o!=o}if(F)return O
F=1
var n="undefined"!=typeof Element,t="function"==typeof Map,r="function"==typeof Set,l="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return O=function(n,t){try{return e(n,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var $=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))($||{}),R={rel:["amphtml","canonical","alternate"]},L={type:["application/ld+json"]},I={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},B=Object.values($),N={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},U=Object.entries(N).reduce((e,[n,t])=>(e[t]=n,e),{}),H="data-rh",z=(e,n)=>{for(let t=e.length-1;t>=0;t-=1){const r=e[t]
if(Object.prototype.hasOwnProperty.call(r,n))return r[n]}return null},V=e=>{let n=z(e,"title")
const t=z(e,"titleTemplate")
if(Array.isArray(n)&&(n=n.join("")),t&&n)return t.replace(/%s/g,()=>n)
const r=z(e,"defaultTitle")
return n||r||void 0},W=e=>z(e,"onChangeClientState")||(()=>{}),K=(e,n)=>n.filter(n=>void 0!==n[e]).map(n=>n[e]).reduce((e,n)=>({...e,...n}),{}),q=(e,n)=>n.filter(e=>void 0!==e.base).map(e=>e.base).reverse().reduce((n,t)=>{if(!n.length){const r=Object.keys(t)
for(let l=0;l<r.length;l+=1){const u=r[l].toLowerCase()
if(-1!==e.indexOf(u)&&t[u])return n.concat(t)}}return n},[]),X=(e,n,t)=>{const r={}
return t.filter(n=>!!Array.isArray(n[e])||(void 0!==n[e]&&(n[e],console&&"function"==typeof console.warn,0),!1)).map(n=>n[e]).reverse().reduce((e,t)=>{const l={}
t.filter(e=>{let t
const u=Object.keys(e)
for(let r=0;r<u.length;r+=1){const l=u[r],o=l.toLowerCase();-1===n.indexOf(o)||"rel"===t&&"canonical"===e[t].toLowerCase()||"rel"===o&&"stylesheet"===e[o].toLowerCase()||(t=o),-1===n.indexOf(l)||"innerHTML"!==l&&"cssText"!==l&&"itemprop"!==l||(t=l)}if(!t||!e[t])return!1
const o=e[t].toLowerCase()
return r[t]||(r[t]={}),l[t]||(l[t]={}),!r[t][o]&&(l[t][o]=!0,!0)}).reverse().forEach(n=>e.push(n))
const u=Object.keys(l)
for(let n=0;n<u.length;n+=1){const e=u[n],t={...r[e],...l[e]}
r[e]=t}return e},[]).reverse()},Y=(e,n)=>{if(Array.isArray(e)&&e.length)for(let t=0;t<e.length;t+=1)if(e[t][n])return!0
return!1},G=e=>Array.isArray(e)?e.join(""):e,J=(e,n)=>Array.isArray(e)?e.reduce((e,t)=>(((e,n)=>{const t=Object.keys(e)
for(let r=0;r<t.length;r+=1)if(n[t[r]]&&n[t[r]].includes(e[t[r]]))return!0
return!1})(t,n)?e.priority.push(t):e.default.push(t),e),{priority:[],default:[]}):{default:e,priority:[]},Q=(e,n)=>({...e,[n]:void 0}),Z=["noscript","script","style"],ee=(e,n=!0)=>!1===n?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),ne=e=>Object.keys(e).reduce((n,t)=>{const r=void 0!==e[t]?`${t}="${e[t]}"`:`${t}`
return n?`${n} ${r}`:r},""),te=(e,n={})=>Object.keys(e).reduce((n,t)=>(n[N[t]||t]=e[t],n),n),re=(e,n)=>n.map((n,t)=>{const r={key:t,[H]:!0}
return Object.keys(n).forEach(e=>{const t=N[e]||e
if("innerHTML"===t||"cssText"===t){const e=n.innerHTML||n.cssText
r.dangerouslySetInnerHTML={M:e}}else r[t]=n[e]}),S.createElement(e,r)}),le=(e,n,t=!0)=>{switch(e){case"title":return{toComponent:()=>((e,n,t)=>{const r=te(t,{key:n,[H]:!0})
return[S.createElement("title",r,n)]})(0,n.title,n.titleAttributes),toString:()=>((e,n,t,r)=>{const l=ne(t),u=G(n)
return l?`<${e} ${H}="true" ${l}>${ee(u,r)}</${e}>`:`<${e} ${H}="true">${ee(u,r)}</${e}>`})(e,n.title,n.titleAttributes,t)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>te(n),toString:()=>ne(n)}
default:return{toComponent:()=>re(e,n),toString:()=>((e,n,t=!0)=>n.reduce((n,r)=>{const l=r,u=Object.keys(l).filter(e=>!("innerHTML"===e||"cssText"===e)).reduce((e,n)=>{const r=void 0===l[n]?n:`${n}="${ee(l[n],t)}"`
return e?`${e} ${r}`:r},""),o=l.innerHTML||l.cssText||"",i=-1===Z.indexOf(e)
return`${n}<${e} ${H}="true" ${u}${i?"/>":`>${o}</${e}>`}`},""))(e,n,t)}}},ue=e=>{const{baseTag:n,bodyAttributes:t,encode:r=!0,htmlAttributes:l,noscriptTags:u,styleTags:o,title:i="",titleAttributes:a,prioritizeSeoTags:c}=e
let{linkTags:s,metaTags:f,scriptTags:d}=e,p={toComponent:()=>{},toString:()=>""}
return c&&({priorityMethods:p,linkTags:s,metaTags:f,scriptTags:d}=(({metaTags:e,linkTags:n,scriptTags:t,encode:r})=>{const l=J(e,I),u=J(n,R),o=J(t,L)
return{priorityMethods:{toComponent:()=>[...re("meta",l.priority),...re("link",u.priority),...re("script",o.priority)],toString:()=>`${le("meta",l.priority,r)} ${le("link",u.priority,r)} ${le("script",o.priority,r)}`},metaTags:l.default,linkTags:u.default,scriptTags:o.default}})(e)),{priority:p,base:le("base",n,r),bodyAttributes:le("bodyAttributes",t,r),htmlAttributes:le("htmlAttributes",l,r),link:le("link",s,r),meta:le("meta",f,r),noscript:le("noscript",u,r),script:le("script",d,r),style:le("style",o,r),title:le("title",{title:i,titleAttributes:a},r)}},oe=[],ie=!("undefined"==typeof window||!window.document||!window.document.createElement),ae=class{constructor(e,n){i(this,"instances",[]),i(this,"canUseDOM",ie),i(this,"context"),i(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?oe:this.instances,add:e=>{(this.canUseDOM?oe:this.instances).push(e)},remove:e=>{const n=(this.canUseDOM?oe:this.instances).indexOf(e);(this.canUseDOM?oe:this.instances).splice(n,1)}}}),this.context=e,this.canUseDOM=n||!1,n||(e.helmet=ue({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ce=S.createContext({}),se=(l=class extends x.Component{constructor(e){super(e),i(this,"helmetData"),this.helmetData=new ae(this.props.context||{},l.canUseDOM)}render(){return S.createElement(ce.Provider,{value:this.helmetData.value},this.props.children)}},i(l,"canUseDOM",ie),l),fe=(e,n)=>{const t=document.head||document.querySelector("head"),r=t.querySelectorAll(`${e}[${H}]`),l=[].slice.call(r),u=[]
let o
return n&&n.length&&n.forEach(n=>{const t=document.createElement(e)
for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))if("innerHTML"===e)t.innerHTML=n.innerHTML
else if("cssText"===e)t.styleSheet?t.styleSheet.cssText=n.cssText:t.appendChild(document.createTextNode(n.cssText))
else{const r=e,l=void 0===n[r]?"":n[r]
t.setAttribute(e,l)}t.setAttribute(H,"true"),l.some((e,n)=>(o=n,t.isEqualNode(e)))?l.splice(o,1):u.push(t)}),l.forEach(e=>e.parentNode?.removeChild(e)),u.forEach(e=>t.appendChild(e)),{oldTags:l,newTags:u}},de=(e,n)=>{const t=document.getElementsByTagName(e)[0]
if(!t)return
const r=t.getAttribute(H),l=r?r.split(","):[],u=[...l],o=Object.keys(n)
for(const i of o){const e=n[i]||""
t.getAttribute(i)!==e&&t.setAttribute(i,e),-1===l.indexOf(i)&&l.push(i)
const r=u.indexOf(i);-1!==r&&u.splice(r,1)}for(let i=u.length-1;i>=0;i-=1)t.removeAttribute(u[i])
l.length===u.length?t.removeAttribute(H):t.getAttribute(H)!==o.join(",")&&t.setAttribute(H,o.join(","))},pe=(e,n)=>{const{baseTag:t,bodyAttributes:r,htmlAttributes:l,linkTags:u,metaTags:o,noscriptTags:i,onChangeClientState:a,scriptTags:c,styleTags:s,title:f,titleAttributes:d}=e
de("body",r),de("html",l),((e,n)=>{void 0!==e&&document.title!==e&&(document.title=G(e)),de("title",n)})(f,d)
const p={baseTag:fe("base",t),linkTags:fe("link",u),metaTags:fe("meta",o),noscriptTags:fe("noscript",i),scriptTags:fe("script",c),styleTags:fe("style",s)},h={},v={}
Object.keys(p).forEach(e=>{const{newTags:n,oldTags:t}=p[e]
n.length&&(h[e]=n),t.length&&(v[e]=p[e].oldTags)}),n&&n(),a(e,h,v)},he=null,ve=class extends x.Component{constructor(){super(...arguments),i(this,"rendered",!1)}shouldComponentUpdate(e){return!f(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context
e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:n}=this.props.context
let t=null
const r=(l=e.get().map(e=>{const n={...e.props}
return delete n.context,n}),{baseTag:q(["href"],l),bodyAttributes:K("bodyAttributes",l),defer:z(l,"defer"),encode:z(l,"encodeSpecialCharacters"),htmlAttributes:K("htmlAttributes",l),linkTags:X("link",["rel","href"],l),metaTags:X("meta",["name","charset","http-equiv","property","itemprop"],l),noscriptTags:X("noscript",["innerHTML"],l),onChangeClientState:W(l),scriptTags:X("script",["src","innerHTML"],l),styleTags:X("style",["cssText"],l),title:V(l),titleAttributes:K("titleAttributes",l),prioritizeSeoTags:Y(l,"prioritizeSeoTags")})
var l,u
se.canUseDOM?(u=r,he&&cancelAnimationFrame(he),void(u.defer?he=requestAnimationFrame(()=>{pe(u,()=>{he=null})}):(pe(u),he=null))):ue&&(t=ue(r)),n(t)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:e}=this.props.context
e.add(this),this.emitChange()}render(){return this.init(),null}},me=(u=class extends x.Component{shouldComponentUpdate(e){return!j(Q(this.props,"helmetData"),Q(e,"helmetData"))}mapNestedChildrenToProps(e,n){if(!n)return null
switch(e.type){case"script":case"noscript":return{innerHTML:n}
case"style":return{cssText:n}
default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,n,t,r){return{...n,[e.type]:[...n[e.type]||[],{...t,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,n,t,r){switch(e.type){case"title":return{...n,[e.type]:r,titleAttributes:{...t}}
case"body":return{...n,bodyAttributes:{...t}}
case"html":return{...n,htmlAttributes:{...t}}
default:return{...n,[e.type]:{...t}}}}mapArrayTypeChildrenToProps(e,n){let t={...n}
return Object.keys(e).forEach(n=>{t={...t,[n]:e[n]}}),t}warnOnInvalidChildren(e,n){return s(B.some(n=>e.type===n),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${B.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),s(!n||"string"==typeof n||Array.isArray(n)&&!n.some(e=>"string"!=typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,n){let t={}
return S.Children.forEach(e,e=>{if(!e||!e.props)return
const{children:r,...l}=e.props,u=Object.keys(l).reduce((e,n)=>(e[U[n]||n]=l[n],e),{})
let{type:o}=e
switch("symbol"==typeof o?o=o.toString():this.warnOnInvalidChildren(e,r),o){case"Symbol(react.fragment)":n=this.mapChildrenToProps(r,n)
break
case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(e,t,u,r)
break
default:n=this.mapObjectTypeChildren(e,n,u,r)}}),this.mapArrayTypeChildrenToProps(t,n)}render(){const{children:e,...n}=this.props
let t={...n},{helmetData:r}=n
return e&&(t=this.mapChildrenToProps(e,t)),!r||r instanceof ae||(r=new ae(r.context,!0),delete t.helmetData),r?S.createElement(ve,{...t,context:r.value}):S.createElement(ce.Consumer,null,e=>S.createElement(ve,{...t,context:e}))}},i(u,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),u)
class be{constructor(e={}){this.failureThreshold=e.failureThreshold||5,this.resetTimeout=e.resetTimeout||6e4,this.monitoringPeriod=e.monitoringPeriod||1e4,this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests=new Map}async execute(e,n=null,t=null){if(n&&this.pendingRequests.has(n))return void 0,this.pendingRequests.get(n)
const r=this.Y(e,t)
return n&&(this.pendingRequests.set(n,r),r.finally(()=>{setTimeout(()=>{this.pendingRequests.delete(n)},1e3)})),r}async Y(e,n){if("OPEN"===this.state){if(!(Date.now()-this.lastFailureTime>this.resetTimeout)){if(void 0,n)return n
throw new Error("Circuit breaker is OPEN")}this.state="HALF_OPEN",this.successCount=0}try{const n=await e()
return this.G(),n}catch(t){if(this.J(),n)return void 0,n
throw t}}G(){this.failureCount=0,"HALF_OPEN"===this.state&&(this.successCount++,this.successCount>=3&&(this.state="CLOSED"))}J(){this.failureCount++,this.lastFailureTime=Date.now(),this.failureCount>=this.failureThreshold&&(this.state="OPEN")}getState(){return{state:this.state,failureCount:this.failureCount,lastFailureTime:this.lastFailureTime,successCount:this.successCount}}reset(){this.state="CLOSED",this.failureCount=0,this.lastFailureTime=null,this.successCount=0,this.pendingRequests.clear()}}new be({failureThreshold:3,resetTimeout:3e4,monitoringPeriod:5e3})
const ye=new be({failureThreshold:5,resetTimeout:6e4,monitoringPeriod:1e4}),we=new be({failureThreshold:10,resetTimeout:3e4,monitoringPeriod:5e3}),ge=new class{constructor(){const e="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname
this.config={baseURL:e?"/api":"https://admin.b2b.click/api",timeout:1e4,retries:3,retryDelay:1e3,enableFallbacks:!0,enableCircuitBreaker:!0},this.fallbackCache=new Map}async fetchWithRetry(e,n={},t=1){const r=e.startsWith("http")?e:`${this.config.baseURL}${e}`,l={...n,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n.headers},credentials:"include"},u=new AbortController,o=setTimeout(()=>u.abort(),this.config.timeout)
l.signal=u.signal
try{void 0
const e=await fetch(r,l)
return clearTimeout(o),e}catch(i){if(clearTimeout(o),"AbortError"===i.name||"TypeError"===i.name&&i.message.includes("Failed to fetch"),t<this.config.retries){const r=this.config.retryDelay*t
return void 0,await new Promise(e=>setTimeout(e,r)),this.fetchWithRetry(e,n,t+1)}throw i}}async get(e){const n=`get:${e}`,t=e=>e.includes("/settings/seo")?{success:!0,settings:{default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",maintenance_mode:!1}}:e.includes("/maintenance-status")?{success:!0,maintenance_mode:!1,maintenance_message:"Service temporarily unavailable"}:null,r=async()=>{if(this.config.enableFallbacks&&this.fallbackCache.has(n)){const e=this.fallbackCache.get(n)
if(e.expires>Date.now())return void 0,{success:!0,data:e.data,cached:!0,fallback:!0}
this.fallbackCache.delete(n)}const t=await this.fetchWithRetry(e)
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
const r=await t.json()
return this.config.enableFallbacks&&r.success&&this.fallbackCache.set(n,{data:r,expires:Date.now()+3e5}),{success:!0,data:r}}
if(this.config.enableCircuitBreaker)try{return await ye.execute(r,n,t(e))}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}try{return await r()}catch(l){void 0
const n=t(e)
return n?{success:!0,data:n,fallback:!0}:{success:!1,error:l.message}}}async post(e,n){try{const t=await this.fetchWithRetry(e,{method:"POST",body:JSON.stringify(n)})
if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`)
return{success:!0,data:await t.json()}}catch(t){return void 0,{success:!1,error:t.message}}}async getSEOSettings(){return this.get("/settings/seo")}async getMaintenanceStatus(){return this.get("/settings/maintenance-status")}async trackAnalytics(e){const n=async()=>{if(navigator.sendBeacon){const n=`${this.config.baseURL}/analytics/track`,t=new Blob([JSON.stringify(e)],{type:"application/json"})
if(!navigator.sendBeacon(n,t))throw new Error("Beacon failed to send")
void 0}else await this.post("/analytics/track",e)}
try{this.config.enableCircuitBreaker?await we.execute(n):await n()}catch(t){void 0}}clearCache(){this.fallbackCache.clear()}getCacheStats(){return{size:this.fallbackCache.size,keys:Array.from(this.fallbackCache.keys())}}},ke={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"https://b2b.click/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let Ee=null,xe=0
const Se=async()=>{try{const e=Date.now(),n=e-xe
if(Ee&&n<36e4)return void 0,n>288e3&&setTimeout(()=>async function(){try{return Ee=null,xe=0,await Se()}catch(e){Ee=oldCache,xe=oldTimestamp}}(),100),Ee
void 0
const t=await ge.getSEOSettings()
if(!t.success)throw new Error(t.error||"Failed to fetch SEO settings")
const r=t.data
if(r.success&&r.settings)return Ee={...ke,...r.settings},xe=e,Ee
throw void 0,new Error("Invalid API response format")}catch(e){return Ee?(void 0,Ee):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,ke)}},_e=async()=>{try{void 0
const e=await ge.getMaintenanceStatus()
if(!e.success)return void 0,{maintenance_mode:!1}
const n=e.data
return void 0!==n.success?(void 0,{maintenance_mode:n.maintenance_mode||!1,maintenance_message:n.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:n.estimated_downtime||"2 hours",contact_information:n.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},Ce="seo_settings_cache",Te=()=>{try{localStorage.removeItem(Ce)}catch(e){void 0}},Oe=e=>{try{const n={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},t=JSON.stringify(n)
t.length>5e4&&(void 0,Te()),localStorage.setItem(Ce,t)}catch(n){if("QuotaExceededError"===n.name){void 0,Te()
try{const n={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(Ce,JSON.stringify(n))}catch(t){void 0}}else void 0}},Fe=x.createContext(),Me=({children:e})=>{const[n,t]=x.useState(ke),[r,l]=x.useState({maintenance_mode:!1}),[u,o]=x.useState(!0),[i,a]=x.useState(null),[c,s]=x.useState({isMobile:!1,deviceType:"unknown"}),f=async(e=!0)=>{try{if(o(!0),e){const e=(()=>{try{const e=localStorage.getItem(Ce)
if(e){const{data:n,timestamp:t}=JSON.parse(e)
if(Date.now()-t<3e4)return void 0,n}}catch(e){void 0,Te()}return null})()
if(e)return t(e),o(!1),d(),void 0}await d()}catch(n){void 0,t(ke)}finally{o(!1)}},d=async()=>{try{void 0
const[e,n]=await Promise.all([Se(),_e()])
t(e),l(n),a(new Date),Oe(e)}catch(e){void 0}}
x.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n),r=e<=768||t
let l="desktop"
r&&(l=e<=480?"mobile":"tablet"),s({isMobile:r,deviceType:l})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),x.useEffect(()=>{f()},[]),x.useEffect(()=>{const e=setInterval(()=>{void 0,d()},3e5)
return()=>clearInterval(e)},[])
const p=x.useMemo(()=>n?(void 0,((e,n={})=>{const t={...ke,...e},{isMobile:r=!1}=n,l=(u=t.default_og_image)&&""!==u.trim()?u.startsWith("http")?u:u.startsWith("/uploads/")||u.startsWith("/static/uploads/")?`https://admin.b2b.click${u}`:u.startsWith("/images/")||u.startsWith("/static/images/")?`https://b2b.click${u}`:`https://b2b.click${u.startsWith("/")?u:"/"+u}`:"https://b2b.click/images/og-image.png"
var u
const o=[{name:"description",content:t.default_description},{name:"keywords",content:t.default_keywords},{name:"author",content:t.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:t.default_title},{property:"og:description",content:t.default_description},{property:"og:image",content:l},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${t.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:t.twitter_handle},{name:"twitter:creator",content:t.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:t.default_title},{name:"twitter:description",content:t.default_description},{name:"twitter:image",content:l},{name:"twitter:image:alt",content:`${t.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&o.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:t.default_title,meta:o,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(n,c)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[n,c]),h={seoSettings:n,maintenanceStatus:r,metaTags:p,isLoading:u,lastUpdated:i,deviceInfo:c,refreshSEOSettings:async()=>{void 0,await f(!1)},updateSEOSetting:(e,n)=>{t(t=>{const r={...t,[e]:n}
return Oe(r),r}),a(new Date)},clearCache:()=>{Te()},loadSEOSettings:f,isMaintenanceMode:()=>r.maintenance_mode}
return E.jsx(Fe.Provider,{value:h,children:E.jsxs(se,{children:[E.jsxs(me,{children:[E.jsx("title",{children:p.title}),p.meta.map((e,n)=>e.name?E.jsx("meta",{name:e.name,content:e.content},`meta-${n}`):e.property?E.jsx("meta",{property:e.property,content:e.content},`meta-${n}`):null),p.link.map((e,n)=>E.jsx("link",{...e},`link-${n}`))]}),e]})})},Ae=()=>{const e=x.useContext(Fe)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},De=()=>(Ae(),x.useState(!0),null),Pe=()=>{const{maintenanceStatus:e}=Ae(),[n,t]=x.useState(!1)
if(x.useEffect(()=>{const e=()=>{const e=window.innerWidth,n=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
t(e<=768||r)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:n?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:n?"20px":"40px",overflow:"hidden"},l={fontSize:n?"64px":"96px",marginBottom:n?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},u={fontSize:n?"28px":"48px",marginBottom:n?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},o={fontSize:n?"16px":"20px",marginBottom:n?"24px":"32px",maxWidth:n?"320px":"600px",lineHeight:1.6,opacity:.9},i={fontSize:n?"14px":"18px",marginBottom:n?"20px":"24px",opacity:.8,padding:n?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:n?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},a={fontSize:n?"12px":"16px",opacity:.6,marginTop:n?"20px":"32px"}
return E.jsxs("div",{style:r,children:[E.jsx("div",{style:l,children:"\ud83d\udd27"}),E.jsx("h1",{style:u,children:e.maintenance_title||"Site Under Maintenance"}),E.jsx("p",{style:o,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&E.jsxs("div",{style:i,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&E.jsxs("p",{style:a,children:["Questions? Contact us: ",e.contact_information]}),E.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:n?"80px":"120px",height:n?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),E.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:n?"60px":"100px",height:n?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})}
class je extends S.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,n){void 0,this.setState({error:e,errorInfo:n}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:e.message,error_stack:e.stack,component_stack:n.componentStack}})}render(){return this.state.hasError?E.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[E.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),E.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),E.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}const $e=({message:e="Loading...",showMessage:n=!0,fullScreen:t=!0,minDisplayTime:r=800})=>{const[l,u]=x.useState(!0),[o,i]=x.useState(!0),[a,c]=x.useState(!1)
x.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches
i(!e)},[]),x.useEffect(()=>{const e=setTimeout(()=>{c(!0),setTimeout(()=>{u(!1)},300)},r)
return()=>clearTimeout(e)},[r]),x.useEffect(()=>{if(r>0){const e=setTimeout(()=>{u(!0)},r)
return()=>clearTimeout(e)}},[r])
const s={position:t?"fixed":"absolute",top:0,left:0,width:"100%",height:t?"100vh":"100%",background:"linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(22, 22, 22, 0.98) 100%)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:9999,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:a?0:1,transition:o?"opacity 0.3s ease-out, transform 0.3s ease-out":"none",transform:a?"scale(0.95)":"scale(1)",pointerEvents:a?"none":"auto"},f={position:"relative",marginBottom:n?"32px":"0",transform:o&&!a?"scale(1)":"scale(0.9)",animation:o&&!a?"brandedLoaderPulse 2.5s ease-in-out infinite":"none",transition:o?"transform 0.3s ease-out":"none"},d={width:"120px",height:"auto",filter:"drop-shadow(0 4px 20px rgba(49, 157, 255, 0.3))",transition:o?"filter 0.3s ease":"none"},p={color:"rgba(255, 255, 255, 0.9)",fontSize:"16px",fontWeight:"500",letterSpacing:"0.5px",textAlign:"center",marginTop:"8px",opacity:n?1:0,transition:o?"opacity 0.3s ease":"none"},h={display:"inline-block",animation:o?"brandedLoaderDots 1.5s ease-in-out infinite":"none"}
return x.useEffect(()=>{if(!o)return
const e=document.createElement("style")
return e.textContent="\n      @keyframes brandedLoaderPulse {\n        0%, 100% {\n          transform: scale(1);\n          filter: drop-shadow(0 4px 20px rgba(49, 157, 255, 0.3));\n        }\n        50% {\n          transform: scale(1.03);\n          filter: drop-shadow(0 6px 25px rgba(49, 157, 255, 0.4));\n        }\n      }\n\n      @keyframes brandedLoaderDots {\n        0%, 20% {\n          opacity: 0;\n          transform: translateY(2px);\n        }\n        50% {\n          opacity: 1;\n          transform: translateY(0);\n        }\n        80%, 100% {\n          opacity: 0;\n          transform: translateY(-2px);\n        }\n      }\n\n      @keyframes brandedLoaderFadeIn {\n        0% {\n          opacity: 0;\n          transform: scale(0.9) translateY(10px);\n        }\n        100% {\n          opacity: 1;\n          transform: scale(1) translateY(0);\n        }\n      }\n\n      .branded-loader-container {\n        animation: brandedLoaderFadeIn 0.4s ease-out;\n      }\n\n      @media (prefers-reduced-motion: reduce) {\n        * {\n          animation-duration: 0.01ms !important;\n          animation-iteration-count: 1 !important;\n          transition-duration: 0.01ms !important;\n        }\n      }\n    ",document.head.appendChild(e),()=>{document.head.contains(e)&&document.head.removeChild(e)}},[o]),E.jsxs("div",{style:s,className:o?"branded-loader-container":"",children:[E.jsx("div",{style:f,children:E.jsx("img",{src:"/images/SMALL_B2BLOGO_WHITE.svg",alt:"Bounce2Bounce Logo",style:{...d,width:"120px",height:"auto",maxWidth:"100%"},"aria-label":"Bounce2Bounce Logo"})}),n&&E.jsxs("div",{style:p,children:[e,E.jsx("span",{style:h,children:"..."})]})]})},Re=x.lazy(()=>p(()=>import("./HomePage-DT3FdyA5.js").then(e=>e.H),__vite__mapDeps([0,1,2,3,4,5]))),Le=x.lazy(()=>p(()=>import("./AdminLoginFigma-iY3xZ6lH.js"),__vite__mapDeps([6,4,7])));(async()=>{const[{initializeAnalytics:e},{initializeCleanup:n},{initializeMobileOptimizations:t}]=await Promise.all([p(()=>import("./beacon-r5K5QvzQ.js"),[]),p(()=>import("./cleanup-CAYISNkO.js"),[]),p(()=>import("./mobileOptimization-DxuCIEdC.js"),[])])
n(),t(),e({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1}),p(()=>import("./memoryMonitor-B-PApq0Q.js"),[])})()
const Ie=x.lazy(()=>p(()=>import("./AboutPage-CzaCY5BU.js").then(e=>e.A),__vite__mapDeps([8,1]))),Be=x.lazy(()=>p(()=>import("./ContactPage-LoFrbTj7.js"),__vite__mapDeps([9,1,7]))),Ne=()=>E.jsx($e,{message:"Loading page",fullScreen:!0,minDisplayTime:500}),Ue=()=>{const[e,n]=x.useState(!1),[t,r]=x.useState(window.location.pathname)
x.useEffect(()=>{void 0},[t])
const l=x.useCallback(e=>{n(!0),setTimeout(()=>{window.history.pushState({},"",e),r(e),n(!1)},150)},[])
return x.useEffect(()=>(window.navigateWithTransition=l,()=>{delete window.navigateWithTransition}),[l]),x.useEffect(()=>{const e=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)},[]),E.jsxs(Me,{children:[E.jsx(Pe,{}),(()=>{if(e)return E.jsx(Ne,{})
switch(t){case"/about":return E.jsx(x.Suspense,{fallback:E.jsx(Ne,{}),children:E.jsx(Ie,{})})
case"/contact":return E.jsx(x.Suspense,{fallback:E.jsx(Ne,{}),children:E.jsx(Be,{})})
case"/admin/login":return E.jsx(x.Suspense,{fallback:E.jsx(Ne,{}),children:E.jsx(Le,{})})
default:return E.jsx(x.Suspense,{fallback:E.jsx(Ne,{}),children:E.jsx(Re,{})})}})(),E.jsx(De,{})]})},He=document.getElementById("root")
if(He)try{P.createRoot(He).render(E.jsx(je,{children:E.jsx(Ue,{})}))}catch(ze){void 0}void document.addEventListener("securitypolicyviolation",e=>{const n={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&r("/api/security/csp-violation",{method:"POST",body:JSON.stringify(n)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const e=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const n=window.parent.location.origin
e.includes(n)||(void 0,window.top.location=window.location)}catch(ze){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()}))
export{$e as B,S as R,p as _,E as j,x as r,r as s,Ae as u}
