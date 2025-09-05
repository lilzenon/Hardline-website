const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FigmaMobile-BcM9Mwhi.js","assets/MobileDrawer-BptIc6-W.js"])))=>i.map(i=>d[i]);
function e(e){return e&&e.t&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(){function e(e,t,n){this.props=e,this.context=t,this.refs=S,this.updater=n||I}function t(){}function n(e,t,n){this.props=e,this.context=t,this.refs=S,this.updater=n||I}function r(e,t,n){var r,i={},o=null,l=null
if(null!=t)for(r in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(o=""+t.key),t)A.call(t,r)&&!F.hasOwnProperty(r)&&(i[r]=t[r])
var a=arguments.length-2
if(1===a)i.children=n
else if(1<a){for(var u=Array(a),s=0;s<a;s++)u[s]=arguments[s+2]
i.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===i[r]&&(i[r]=a[r])
return{$$typeof:c,type:e,key:o,ref:l,props:i,i:D.current}}function i(e){return"object"==typeof e&&null!==e&&e.$$typeof===c}function o(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"}
return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function l(e,t,n,r,a){var u=typeof e
"undefined"!==u&&"boolean"!==u||(e=null)
var s=!1
if(null===e)s=!0
else switch(u){case"string":case"number":s=!0
break
case"object":switch(e.$$typeof){case c:case f:s=!0}}if(s)return a=a(s=e),e=""===r?"."+o(s,0):r,C(a)?(n="",null!=e&&(n=e.replace(j,"$&/")+"/"),l(a,t,n,"",function(e){return e})):null!=a&&(i(a)&&(a=function(e,t){return{$$typeof:c,type:e.type,key:t,ref:e.ref,props:e.props,i:e.i}}(a,n+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(j,"$&/")+"/")+e)),t.push(a)),1
if(s=0,r=""===r?".":r+":",C(e))for(var d=0;d<e.length;d++){var p=r+o(u=e[d],d)
s+=l(u,t,n,p,a)}else if(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=k&&e[k]||e["@@iterator"])?e:null}(e),"function"==typeof p)for(e=p.call(e),d=0;!(u=e.next()).done;)s+=l(u=u.value,t,n,p=r+o(u,d++),a)
else if("object"===u)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")
return s}function a(e,t,n){if(null==e)return e
var r=[],i=0
return l(e,r,"","",function(e){return t.call(n,e,i++)}),r}function u(e){if(-1===e.o){var t=e.l;(t=t()).then(function(t){0!==e.o&&-1!==e.o||(e.o=1,e.l=t)},function(t){0!==e.o&&-1!==e.o||(e.o=2,e.l=t)}),-1===e.o&&(e.o=0,e.l=t)}if(1===e.o)return e.l.default
throw e.l}function s(){throw Error("act(...) is not supported in production builds of React.")}if(w)return T
w=1
var c=Symbol.for("react.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),m=Symbol.for("react.provider"),g=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),k=Symbol.iterator,I={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,S={}
e.prototype.isReactComponent={},e.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.")
this.updater.enqueueSetState(this,e,t,"setState")},e.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},t.prototype=e.prototype
var E=n.prototype=new t
E.constructor=n,M(E,e.prototype),E.isPureReactComponent=!0
var C=Array.isArray,A=Object.prototype.hasOwnProperty,D={current:null},F={key:!0,ref:!0,u:!0,p:!0},j=/\/+/g,z={current:null},P={transition:null},_={ReactCurrentDispatcher:z,ReactCurrentBatchConfig:P,ReactCurrentOwner:D}
return T.Children={map:a,forEach:function(e,t,n){a(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0
return a(e,function(){t++}),t},toArray:function(e){return a(e,function(e){return e})||[]},only:function(e){if(!i(e))throw Error("React.Children.only expected to receive a single React element child.")
return e}},T.Component=e,T.Fragment=d,T.Profiler=h,T.PureComponent=n,T.StrictMode=p,T.Suspense=b,T.h=_,T.act=s,T.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".")
var r=M({},e.props),i=e.key,o=e.ref,l=e.i
if(null!=t){if(void 0!==t.ref&&(o=t.ref,l=D.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps
for(u in t)A.call(t,u)&&!F.hasOwnProperty(u)&&(r[u]=void 0===t[u]&&void 0!==a?a[u]:t[u])}var u=arguments.length-2
if(1===u)r.children=n
else if(1<u){a=Array(u)
for(var s=0;s<u;s++)a[s]=arguments[s+2]
r.children=a}return{$$typeof:c,type:e.type,key:i,ref:o,props:r,i:l}},T.createContext=function(e){return(e={$$typeof:g,m:e,v:e,k:0,Provider:null,Consumer:null,I:null,M:null}).Provider={$$typeof:m,S:e},e.Consumer=e},T.createElement=r,T.createFactory=function(e){var t=r.bind(null,e)
return t.type=e,t},T.createRef=function(){return{current:null}},T.forwardRef=function(e){return{$$typeof:v,render:e}},T.isValidElement=i,T.lazy=function(e){return{$$typeof:x,T:{o:-1,l:e},C:u}},T.memo=function(e,t){return{$$typeof:y,type:e,compare:void 0===t?null:t}},T.startTransition=function(e){var t=P.transition
P.transition={}
try{e()}finally{P.transition=t}},T.unstable_act=s,T.useCallback=function(e,t){return z.current.useCallback(e,t)},T.useContext=function(e){return z.current.useContext(e)},T.useDebugValue=function(){},T.useDeferredValue=function(e){return z.current.useDeferredValue(e)},T.useEffect=function(e,t){return z.current.useEffect(e,t)},T.useId=function(){return z.current.useId()},T.useImperativeHandle=function(e,t,n){return z.current.useImperativeHandle(e,t,n)},T.useInsertionEffect=function(e,t){return z.current.useInsertionEffect(e,t)},T.useLayoutEffect=function(e,t){return z.current.useLayoutEffect(e,t)},T.useMemo=function(e,t){return z.current.useMemo(e,t)},T.useReducer=function(e,t,n){return z.current.useReducer(e,t,n)},T.useRef=function(e){return z.current.useRef(e)},T.useState=function(e){return z.current.useState(e)},T.useSyncExternalStore=function(e,t,n){return z.current.useSyncExternalStore(e,t,n)},T.useTransition=function(){return z.current.useTransition()},T.version="18.3.1",T}function n(){return x||(x=1,E.exports=t()),E.exports}function r(){function e(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])
return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(e,t){r(e,t),r(e+"Capture",t)}function r(e,t){for(go[e]=t,e=0;e<t.length;e++)mo.add(t[e])}function i(e,t,n,r,i,o,l){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}function o(e){return e[1].toUpperCase()}function l(e,t,n,r){var i=ko.hasOwnProperty(t)?ko[t]:null;(null!==i?0!==i.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1
switch(typeof t){case"function":case"symbol":return!0
case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e)
default:return!1}}(e,t,n,r))return!0
if(r)return!1
if(null!==n)switch(n.type){case 3:return!t
case 4:return!1===t
case 5:return isNaN(t)
case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!bo.call(xo,e)||!bo.call(wo,e)&&(yo.test(e)?xo[e]=!0:(wo[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}function a(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Wo&&e[Wo]||e["@@iterator"])?e:null}function u(e){if(void 0===Mo)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/)
Mo=t&&t[1]||""}return"\n"+Mo+e}function s(e,t){if(!e||Zo)return""
Zo=!0
var n=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&"string"==typeof c.stack){for(var i=c.stack.split("\n"),o=r.stack.split("\n"),l=i.length-1,a=o.length-1;1<=l&&0<=a&&i[l]!==o[a];)a--
for(;1<=l&&0<=a;l--,a--)if(i[l]!==o[a]){if(1!==l||1!==a)do{if(l--,0>--a||i[l]!==o[a]){var s="\n"+i[l].replace(" at new "," at ")
return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=l&&0<=a)
break}}}finally{Zo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?u(e):""}function c(e){switch(e.tag){case 5:return u(e.type)
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
case Ao:return"Portal"
case jo:return"Profiler"
case Fo:return"StrictMode"
case $o:return"Suspense"
case Ho:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case Po:return(e.displayName||"Context")+".Consumer"
case zo:return(e.S.displayName||"Context")+".Provider"
case _o:var t=e.render
return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e
case Lo:return null!==(t=e.displayName||null)?t:f(e.type)||"Memo"
case Ro:t=e.T,e=e.C
try{return f(e(t))}catch(n){}}return null}function d(e){var t=e.type
switch(e.tag){case 24:return"Cache"
case 9:return(t.displayName||"Context")+".Consumer"
case 10:return(t.S.displayName||"Context")+".Provider"
case 18:return"DehydratedFragment"
case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef")
case 7:return"Fragment"
case 5:return t
case 4:return"Portal"
case 3:return"Root"
case 6:return"Text"
case 16:return f(t)
case 8:return t===Fo?"StrictMode":"Mode"
case 22:return"Offscreen"
case 12:return"Profiler"
case 21:return"Scope"
case 13:return"Suspense"
case 19:return"SuspenseList"
case 25:return"TracingMarker"
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof t)return t.displayName||t.name||null
if("string"==typeof t)return t}return null}function p(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e
default:return""}}function h(e){var t=e.type
return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function m(e){e.D||(e.D=function(e){var t=h(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t]
if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var i=n.get,o=n.set
return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e.D=null,delete e[t]}}}}(e))}function g(e){if(!e)return!1
var t=e.D
if(!t)return!0
var n=t.getValue(),r=""
return e&&(r=h(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function v(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null
try{return e.activeElement||e.body}catch(t){return e.body}}function b(e,t){var n=t.checked
return No({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e.F.initialChecked})}function y(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked
n=p(null!=t.value?t.value:n),e.F={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function w(e,t){null!=(t=t.checked)&&l(e,"checked",t,!1)}function x(e,t){w(e,t)
var n=p(t.value),r=t.type
if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n)
else if("submit"===r||"reset"===r)return e.removeAttribute("value"),void 0
t.hasOwnProperty("value")?I(e,t.type,n):t.hasOwnProperty("defaultValue")&&I(e,t.type,p(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function k(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type
if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return
t=""+e.F.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e.F.initialChecked,""!==n&&(e.name=n)}function I(e,t,n){"number"===t&&v(e.ownerDocument)===e||(null==n?e.defaultValue=""+e.F.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function M(e,t,n,r){if(e=e.options,t){t={}
for(var i=0;i<n.length;i++)t["$"+n[i]]=!0
for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+p(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,r&&(e[i].defaultSelected=!0),void 0
null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function S(t,n){if(null!=n.dangerouslySetInnerHTML)throw Error(e(91))
return No({},n,{value:void 0,defaultValue:void 0,children:""+t.F.initialValue})}function E(t,n){var r=n.value
if(null==r){if(r=n.children,n=n.defaultValue,null!=r){if(null!=n)throw Error(e(92))
if(Bo(r)){if(1<r.length)throw Error(e(93))
r=r[0]}n=r}null==n&&(n=""),r=n}t.F={initialValue:p(r)}}function T(e,t){var n=p(t.value),r=p(t.defaultValue)
null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function C(e){var t=e.textContent
t===e.F.initialValue&&""!==t&&null!==t&&(e.value=t)}function A(e){switch(e){case"svg":return"http://www.w3.org/2000/svg"
case"math":return"http://www.w3.org/1998/Math/MathML"
default:return"http://www.w3.org/1999/xhtml"}}function D(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?A(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}function P(e,t){if(t){var n=e.firstChild
if(n&&n===e.lastChild&&3===n.nodeType)return n.nodeValue=t,void 0}e.textContent=t}function _(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||Go.hasOwnProperty(e)&&Go[e]?(""+t).trim():t+"px"}function $(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=_(n,t[n],r)
"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}function H(t,n){if(n){if(Yo[t]&&(null!=n.children||null!=n.dangerouslySetInnerHTML))throw Error(e(137,t))
if(null!=n.dangerouslySetInnerHTML){if(null!=n.children)throw Error(e(60))
if("object"!=typeof n.dangerouslySetInnerHTML||!("j"in n.dangerouslySetInnerHTML))throw Error(e(61))}if(null!=n.style&&"object"!=typeof n.style)throw Error(e(62))}}function W(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is
switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1
default:return!0}}function N(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}function Z(t){if(t=kt(t)){if("function"!=typeof Ko)throw Error(e(280))
var n=t.stateNode
n&&(n=Mt(n),Ko(t.stateNode,t.type,n))}}function B(e){Qo?Xo?Xo.push(e):Xo=[e]:Qo=e}function U(){if(Qo){var e=Qo,t=Xo
if(Xo=Qo=null,Z(e),t)for(e=0;e<t.length;e++)Z(t[e])}}function G(e,t){return e(t)}function V(){}function Y(e,t,n){if(qo)return e(t,n)
qo=!0
try{return G(e,t,n)}finally{qo=!1,(null!==Qo||null!==Xo)&&(V(),U())}}function J(t,n){var r=t.stateNode
if(null===r)return null
var i=Mt(r)
if(null===i)return null
r=i[n]
e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(i=!("button"===(t=t.type)||"input"===t||"select"===t||"textarea"===t)),t=!i
break e
default:t=!1}if(t)return null
if(r&&"function"!=typeof r)throw Error(e(231,n,typeof r))
return r}function K(e,t,n,r,i,o,l,a,u){var s=Array.prototype.slice.call(arguments,3)
try{t.apply(n,s)}catch(c){this.onError(c)}}function Q(e,t,n,r,i,o,l,a,u){cl=!1,fl=null,K.apply(hl,arguments)}function X(e){var t=e,n=e
if(e.alternate)for(;t.return;)t=t.return
else{e=t
do{!!(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function q(e){if(13===e.tag){var t=e.memoizedState
if(null===t&&null!==(e=e.alternate)&&(t=e.memoizedState),null!==t)return t.dehydrated}return null}function ee(t){if(X(t)!==t)throw Error(e(188))}function te(t){return null!==(t=function(t){var n=t.alternate
if(!n){if(null===(n=X(t)))throw Error(e(188))
return n!==t?null:t}for(var r=t,i=n;;){var o=r.return
if(null===o)break
var l=o.alternate
if(null===l){if(null!==(i=o.return)){r=i
continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===r)return ee(o),t
if(l===i)return ee(o),n
l=l.sibling}throw Error(e(188))}if(r.return!==i.return)r=o,i=l
else{for(var a=!1,u=o.child;u;){if(u===r){a=!0,r=o,i=l
break}if(u===i){a=!0,i=o,r=l
break}u=u.sibling}if(!a){for(u=l.child;u;){if(u===r){a=!0,r=l,i=o
break}if(u===i){a=!0,i=l,r=o
break}u=u.sibling}if(!a)throw Error(e(189))}}if(r.alternate!==i)throw Error(e(190))}if(3!==r.tag)throw Error(e(188))
return r.stateNode.current===r?t:n}(t))?ne(t):null}function ne(e){if(5===e.tag||6===e.tag)return e
for(e=e.child;null!==e;){var t=ne(e)
if(null!==t)return t
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
default:return e}}function ie(e,t){var n=e.pendingLanes
if(0===n)return 0
var r=0,i=e.suspendedLanes,o=e.pingedLanes,l=268435455&n
if(0!==l){var a=l&~i
0!==a?r=re(a):0!==(o&=l)&&(r=re(o))}else 0!==(l=n&~i)?r=re(l):0!==o&&(r=re(o))
if(0===r)return 0
if(0!==t&&t!==r&&0===(t&i)&&((i=r&-r)>=(o=t&-t)||16===i&&4194240&o))return t
if(4&r&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-Cl(t)),r|=e[n],t&=~i
return r}function oe(e,t){switch(e){case 1:case 2:case 4:return t+250
case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3
default:return-1}}function le(e){return 0!=(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function ae(){var e=Fl
return!(4194240&(Fl<<=1))&&(Fl=64),e}function ue(e){for(var t=[],n=0;31>n;n++)t.push(e)
return t}function se(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-Cl(t)]=n}function ce(e,t){var n=e.entangledLanes|=t
for(e=e.entanglements;n;){var r=31-Cl(n),i=1<<r
i&t|e[r]&t&&(e[r]|=t),n&=~i}}function fe(e){return 1<(e&=-e)?4<e?268435455&e?16:536870912:4:1}function de(e,t){switch(e){case"focusin":case"focusout":$l=null
break
case"dragenter":case"dragleave":Hl=null
break
case"mouseover":case"mouseout":Ll=null
break
case"pointerover":case"pointerout":Rl.delete(t.pointerId)
break
case"gotpointercapture":case"lostpointercapture":Ol.delete(t.pointerId)}}function pe(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==t&&null!==(t=kt(t))&&rl(t),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function he(e){var t=xt(e.target)
if(null!==t){var n=X(t)
if(null!==n)if(13===(t=n.tag)){if(null!==(t=q(n)))return e.blockedOn=t,ll(e.priority,function(){il(n)}),void 0}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return e.blockedOn=3===n.tag?n.stateNode.containerInfo:null,void 0}e.blockedOn=null}function me(e){if(null!==e.blockedOn)return!1
for(var t=e.targetContainers;0<t.length;){var n=Ie(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent)
if(null!==n)return null!==(t=kt(n))&&rl(t),e.blockedOn=n,!1
var r=new(n=e.nativeEvent).constructor(n.type,n)
Jo=r,n.target.dispatchEvent(r),Jo=null,t.shift()}return!0}function ge(e,t,n){me(e)&&n.delete(t)}function ve(){Pl=!1,null!==$l&&me($l)&&($l=null),null!==Hl&&me(Hl)&&(Hl=null),null!==Ll&&me(Ll)&&(Ll=null),Rl.forEach(ge),Ol.forEach(ge)}function be(e,t){e.blockedOn===t&&(e.blockedOn=null,Pl||(Pl=!0,ho.unstable_scheduleCallback(ho.unstable_NormalPriority,ve)))}function ye(e){function t(t){return be(t,e)}if(0<_l.length){be(_l[0],e)
for(var n=1;n<_l.length;n++){var r=_l[n]
r.blockedOn===e&&(r.blockedOn=null)}}for(null!==$l&&be($l,e),null!==Hl&&be(Hl,e),null!==Ll&&be(Ll,e),Rl.forEach(t),Ol.forEach(t),n=0;n<Wl.length;n++)(r=Wl[n]).blockedOn===e&&(r.blockedOn=null)
for(;0<Wl.length&&null===(n=Wl[0]).blockedOn;)he(n),null===n.blockedOn&&Wl.shift()}function we(e,t,n,r){var i=zl,o=Zl.transition
Zl.transition=null
try{zl=1,ke(e,t,n,r)}finally{zl=i,Zl.transition=o}}function xe(e,t,n,r){var i=zl,o=Zl.transition
Zl.transition=null
try{zl=4,ke(e,t,n,r)}finally{zl=i,Zl.transition=o}}function ke(e,t,n,r){if(Bl){var i=Ie(e,t,n,r)
if(null===i)ut(e,t,r,Ul,n),de(e,r)
else if(function(e,t,n,r,i){switch(t){case"focusin":return $l=pe($l,e,t,n,r,i),!0
case"dragenter":return Hl=pe(Hl,e,t,n,r,i),!0
case"mouseover":return Ll=pe(Ll,e,t,n,r,i),!0
case"pointerover":var o=i.pointerId
return Rl.set(o,pe(Rl.get(o)||null,e,t,n,r,i)),!0
case"gotpointercapture":return o=i.pointerId,Ol.set(o,pe(Ol.get(o)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation()
else if(de(e,r),4&t&&-1<Nl.indexOf(e)){for(;null!==i;){var o=kt(i)
if(null!==o&&nl(o),null===(o=Ie(e,t,n,r))&&ut(e,t,r,Ul,n),o===i)break
i=o}null!==i&&r.stopPropagation()}else ut(e,t,r,null,n)}}function Ie(e,t,n,r){if(Ul=null,null!==(e=xt(e=N(r))))if(null===(t=X(e)))e=null
else if(13===(n=t.tag)){if(null!==(e=q(t)))return e
e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null
e=null}else t!==e&&(e=null)
return Ul=e,null}function Me(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4
case"message":switch(wl()){case xl:return 1
case kl:return 4
case Il:case Ml:return 16
case Sl:return 536870912
default:return 16}default:return 16}}function Se(){if(Yl)return Yl
var e,t,n=Vl,r=n.length,i="value"in Gl?Gl.value:Gl.textContent,o=i.length
for(e=0;e<r&&n[e]===i[e];e++);var l=r-e
for(t=1;t<=l&&n[r-t]===i[o-t];t++);return Yl=i.slice(e,1<t?1-t:void 0)}function Ee(e){var t=e.keyCode
return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Te(){return!0}function Ce(){return!1}function Ae(e){function t(t,n,r,i,o){for(var l in this.P=t,this._=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(i):i[l])
return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?Te:Ce,this.isPropagationStopped=Ce,this}return No(t.prototype,{preventDefault:function(){this.defaultPrevented=!0
var e=this.nativeEvent
e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Te)},stopPropagation:function(){var e=this.nativeEvent
e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Te)},persist:function(){},isPersistent:Te}),t}function De(e){var t=this.nativeEvent
return t.getModifierState?t.getModifierState(e):!!(e=sa[e])&&!!t[e]}function Fe(){return De}function je(e,t){switch(e){case"keyup":return-1!==va.indexOf(t.keyCode)
case"keydown":return 229!==t.keyCode
case"keypress":case"mousedown":case"focusout":return!0
default:return!1}}function ze(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}function Pe(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase()
return"input"===t?!!Sa[e.type]:"textarea"===t}function _e(e,t,n,r){B(r),0<(t=ct(t,"onChange")).length&&(n=new Kl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}function $e(e){rt(e,0)}function He(e){if(g(It(e)))return e}function Le(e,t){if("change"===e)return t}function Re(){Ea&&(Ea.detachEvent("onpropertychange",Oe),Ta=Ea=null)}function Oe(e){if("value"===e.propertyName&&He(Ta)){var t=[]
_e(t,Ta,e,N(e)),Y($e,t)}}function We(e,t,n){"focusin"===e?(Re(),Ta=n,(Ea=t).attachEvent("onpropertychange",Oe)):"focusout"===e&&Re()}function Ne(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return He(Ta)}function Ze(e,t){if("click"===e)return He(t)}function Be(e,t){if("input"===e||"change"===e)return He(t)}function Ue(e,t){if(ja(e,t))return!0
if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1
var n=Object.keys(e),r=Object.keys(t)
if(n.length!==r.length)return!1
for(r=0;r<n.length;r++){var i=n[r]
if(!bo.call(t,i)||!ja(e[i],t[i]))return!1}return!0}function Ge(e){for(;e&&e.firstChild;)e=e.firstChild
return e}function Ve(e,t){var n,r=Ge(e)
for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e}
e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling
break e}r=r.parentNode}r=void 0}r=Ge(r)}}function Ye(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Ye(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function Je(){for(var e=window,t=v();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break
t=v((e=t.contentWindow).document)}return t}function Ke(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase()
return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function Qe(e){var t=Je(),n=e.focusedElem,r=e.selectionRange
if(t!==n&&n&&n.ownerDocument&&Ye(n.ownerDocument.documentElement,n)){if(null!==r&&Ke(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length)
else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection()
var i=n.textContent.length,o=Math.min(r.start,i)
r=void 0===r.end?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Ve(n,o)
var l=Ve(n,r)
i&&l&&(1!==e.rangeCount||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&((t=t.createRange()).setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop})
for("function"==typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}function Xe(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument
Ha||null==Pa||Pa!==v(r)||(r="selectionStart"in(r=Pa)&&Ke(r)?{start:r.selectionStart,end:r.selectionEnd}:{anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},$a&&Ue($a,r)||($a=r,0<(r=ct(_a,"onSelect")).length&&(t=new Kl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Pa)))}function qe(e,t){var n={}
return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}function et(e){if(Ra[e])return Ra[e]
if(!La[e])return e
var t,n=La[e]
for(t in n)if(n.hasOwnProperty(t)&&t in Oa)return Ra[e]=n[t]
return e}function tt(e,n){Ua.set(e,n),t(n,[e])}function nt(t,n,r){var i=t.type||"unknown-event"
t.currentTarget=r,function(t,n,r,i,o,l,a,u,s){if(Q.apply(this,arguments),cl){if(!cl)throw Error(e(198))
var c=fl
cl=!1,fl=null,dl||(dl=!0,pl=c)}}(i,n,void 0,t),t.currentTarget=null}function rt(e,t){t=!!(4&t)
for(var n=0;n<e.length;n++){var r=e[n],i=r.event
r=r.listeners
e:{var o=void 0
if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],u=a.instance,s=a.currentTarget
if(a=a.listener,u!==o&&i.isPropagationStopped())break e
nt(i,a,s),o=u}else for(l=0;l<r.length;l++){if(u=(a=r[l]).instance,s=a.currentTarget,a=a.listener,u!==o&&i.isPropagationStopped())break e
nt(i,a,s),o=u}}}if(dl)throw e=pl,dl=!1,pl=null,e}function it(e,t){var n=t[hu]
void 0===n&&(n=t[hu]=new Set)
var r=e+"__bubble"
n.has(r)||(at(t,e,2,!1),n.add(r))}function ot(e,t,n){var r=0
t&&(r|=4),at(n,e,r,t)}function lt(e){if(!e[tu]){e[tu]=!0,mo.forEach(function(t){"selectionchange"!==t&&(eu.has(t)||ot(t,!1,e),ot(t,!0,e))})
var t=9===e.nodeType?e:e.ownerDocument
null===t||t[tu]||(t[tu]=!0,ot("selectionchange",!1,t))}}function at(e,t,n,r){switch(Me(t)){case 1:var i=we
break
case 4:i=xe
break
default:i=ke}n=i.bind(null,t,n,e),i=void 0,!el||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ut(e,t,n,r,i){var o=r
if(!(1&t||2&t||null===r))e:for(;;){if(null===r)return
var l=r.tag
if(3===l||4===l){var a=r.stateNode.containerInfo
if(a===i||8===a.nodeType&&a.parentNode===i)break
if(4===l)for(l=r.return;null!==l;){var u=l.tag
if((3===u||4===u)&&((u=l.stateNode.containerInfo)===i||8===u.nodeType&&u.parentNode===i))return
l=l.return}for(;null!==a;){if(null===(l=xt(a)))return
if(5===(u=l.tag)||6===u){r=o=l
continue e}a=a.parentNode}}r=r.return}Y(function(){var r=o,i=N(n),l=[]
e:{var a=Ua.get(e)
if(void 0!==a){var u=Kl,s=e
switch(e){case"keypress":if(0===Ee(n))break e
case"keydown":case"keyup":u=fa
break
case"focusin":s="focus",u=na
break
case"focusout":s="blur",u=na
break
case"beforeblur":case"afterblur":u=na
break
case"click":if(2===n.button)break e
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=ea
break
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=ta
break
case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=pa
break
case Wa:case Na:case Za:u=ra
break
case Ba:u=ha
break
case"scroll":u=Xl
break
case"wheel":u=ga
break
case"copy":case"cut":case"paste":u=oa
break
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=da}var c=!!(4&t),f=!c&&"scroll"===e,d=c?null!==a?a+"Capture":null:a
c=[]
for(var p,h=r;null!==h;){var m=(p=h).stateNode
if(5===p.tag&&null!==m&&(p=m,null!==d&&null!=(m=J(h,d))&&c.push(st(h,m,p))),f)break
h=h.return}0<c.length&&(a=new u(a,s,null,n,i),l.push({event:a,listeners:c}))}}if(!(7&t)){if(u="mouseout"===e||"pointerout"===e,(!(a="mouseover"===e||"pointerover"===e)||n===Jo||!(s=n.relatedTarget||n.fromElement)||!xt(s)&&!s[pu])&&(u||a)&&(a=i.window===i?i:(a=i.ownerDocument)?a.defaultView||a.parentWindow:window,u?(u=r,null!==(s=(s=n.relatedTarget||n.toElement)?xt(s):null)&&(s!==(f=X(s))||5!==s.tag&&6!==s.tag)&&(s=null)):(u=null,s=r),u!==s)){if(c=ea,m="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=da,m="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==u?a:It(u),p=null==s?a:It(s),(a=new c(m,h+"leave",u,n,i)).target=f,a.relatedTarget=p,m=null,xt(i)===r&&((c=new c(d,h+"enter",s,n,i)).target=p,c.relatedTarget=f,m=c),f=m,u&&s)e:{for(d=s,h=0,p=c=u;p;p=ft(p))h++
for(p=0,m=d;m;m=ft(m))p++
for(;0<h-p;)c=ft(c),h--
for(;0<p-h;)d=ft(d),p--
for(;h--;){if(c===d||null!==d&&c===d.alternate)break e
c=ft(c),d=ft(d)}c=null}else c=null
null!==u&&dt(l,a,u,c,!1),null!==s&&null!==f&&dt(l,f,s,c,!0)}if("select"===(u=(a=r?It(r):window).nodeName&&a.nodeName.toLowerCase())||"input"===u&&"file"===a.type)var g=Le
else if(Pe(a))if(Ca)g=Be
else{g=Ne
var v=We}else(u=a.nodeName)&&"input"===u.toLowerCase()&&("checkbox"===a.type||"radio"===a.type)&&(g=Ze)
switch(g&&(g=g(e,r))?_e(l,g,n,i):(v&&v(e,a,r),"focusout"===e&&(v=a.F)&&v.controlled&&"number"===a.type&&I(a,"number",a.value)),v=r?It(r):window,e){case"focusin":(Pe(v)||"true"===v.contentEditable)&&(Pa=v,_a=r,$a=null)
break
case"focusout":$a=_a=Pa=null
break
case"mousedown":Ha=!0
break
case"contextmenu":case"mouseup":case"dragend":Ha=!1,Xe(l,n,i)
break
case"selectionchange":if(za)break
case"keydown":case"keyup":Xe(l,n,i)}var b
if(ba)e:{switch(e){case"compositionstart":var y="onCompositionStart"
break e
case"compositionend":y="onCompositionEnd"
break e
case"compositionupdate":y="onCompositionUpdate"
break e}y=void 0}else Ma?je(e,n)&&(y="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(y="onCompositionStart")
y&&(xa&&"ko"!==n.locale&&(Ma||"onCompositionStart"!==y?"onCompositionEnd"===y&&Ma&&(b=Se()):(Vl="value"in(Gl=i)?Gl.value:Gl.textContent,Ma=!0)),0<(v=ct(r,y)).length&&(y=new la(y,e,null,n,i),l.push({event:y,listeners:v}),(b||null!==(b=ze(n)))&&(y.data=b))),(b=wa?function(e,t){switch(e){case"compositionend":return ze(t)
case"keypress":return 32!==t.which?null:(Ia=!0,ka)
case"textInput":return(e=t.data)===ka&&Ia?null:e
default:return null}}(e,n):function(e,t){if(Ma)return"compositionend"===e||!ba&&je(e,t)?(e=Se(),Yl=Vl=Gl=null,Ma=!1,e):null
switch(e){case"paste":default:return null
case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char
if(t.which)return String.fromCharCode(t.which)}return null
case"compositionend":return xa&&"ko"!==t.locale?null:t.data}}(e,n))&&0<(r=ct(r,"onBeforeInput")).length&&(i=new la("onBeforeInput","beforeinput",null,n,i),l.push({event:i,listeners:r}),i.data=b)}rt(l,t)})}function st(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ct(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode
5===i.tag&&null!==o&&(i=o,null!=(o=J(e,n))&&r.unshift(st(e,o,i)),null!=(o=J(e,t))&&r.push(st(e,o,i))),e=e.return}return r}function ft(e){if(null===e)return null
do{e=e.return}while(e&&5!==e.tag)
return e||null}function dt(e,t,n,r,i){for(var o=t.P,l=[];null!==n&&n!==r;){var a=n,u=a.alternate,s=a.stateNode
if(null!==u&&u===r)break
5===a.tag&&null!==s&&(a=s,i?null!=(u=J(n,o))&&l.unshift(st(n,u,a)):i||null!=(u=J(n,o))&&l.push(st(n,u,a))),n=n.return}0!==l.length&&e.push({event:t,listeners:l})}function pt(e){return("string"==typeof e?e:""+e).replace(nu,"\n").replace(ru,"")}function ht(t,n,r){if(n=pt(n),pt(t)!==n&&r)throw Error(e(425))}function mt(){}function gt(e,t){return"textarea"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.j}function vt(e){setTimeout(function(){throw e})}function bt(e,t){var n=t,r=0
do{var i=n.nextSibling
if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0===r)return e.removeChild(i),ye(t),void 0
r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++
n=i}while(n)
ye(t)}function yt(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType
if(1===t||3===t)break
if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break
if("/$"===t)return null}}return e}function wt(e){e=e.previousSibling
for(var t=0;e;){if(8===e.nodeType){var n=e.data
if("$"===n||"$!"===n||"$?"===n){if(0===t)return e
t--}else"/$"===n&&t++}e=e.previousSibling}return null}function xt(e){var t=e[fu]
if(t)return t
for(var n=e.parentNode;n;){if(t=n[pu]||n[fu]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=wt(e);null!==e;){if(n=e[fu])return n
e=wt(e)}return t}n=(e=n).parentNode}return null}function kt(e){return!(e=e[fu]||e[pu])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function It(t){if(5===t.tag||6===t.tag)return t.stateNode
throw Error(e(33))}function Mt(e){return e[du]||null}function St(e){return{current:e}}function Et(e){0>bu||(e.current=vu[bu],vu[bu]=null,bu--)}function Tt(e,t){bu++,vu[bu]=e.current,e.current=t}function Ct(e,t){var n=e.type.contextTypes
if(!n)return yu
var r=e.stateNode
if(r&&r.$===t)return r.H
var i,o={}
for(i in n)o[i]=t[i]
return r&&((e=e.stateNode).$=t,e.H=o),o}function At(e){return null!=e.childContextTypes}function Dt(){Et(xu),Et(wu)}function Ft(t,n,r){if(wu.current!==yu)throw Error(e(168))
Tt(wu,n),Tt(xu,r)}function jt(t,n,r){var i=t.stateNode
if(n=n.childContextTypes,"function"!=typeof i.getChildContext)return r
for(var o in i=i.getChildContext())if(!(o in n))throw Error(e(108,d(t)||"Unknown",o))
return No({},r,i)}function zt(e){return e=(e=e.stateNode)&&e.L||yu,ku=wu.current,Tt(wu,e),Tt(xu,xu.current),!0}function Pt(t,n,r){var i=t.stateNode
if(!i)throw Error(e(169))
r?(t=jt(t,n,ku),i.L=t,Et(xu),Et(wu),Tt(wu,t)):Et(xu),Tt(xu,r)}function _t(e){null===Iu?Iu=[e]:Iu.push(e)}function $t(){if(!Su&&null!==Iu){Su=!0
var e=0,t=zl
try{var n=Iu
for(zl=1;e<n.length;e++){var r=n[e]
do{r=r(!0)}while(null!==r)}Iu=null,Mu=!1}catch(i){throw null!==Iu&&(Iu=Iu.slice(e+1)),ml(xl,$t),i}finally{zl=t,Su=!1}}return null}function Ht(e,t){Eu[Tu++]=Au,Eu[Tu++]=Cu,Cu=e,Au=t}function Lt(e,t,n){Du[Fu++]=zu,Du[Fu++]=Pu,Du[Fu++]=ju,ju=e
var r=zu
e=Pu
var i=32-Cl(r)-1
r&=~(1<<i),n+=1
var o=32-Cl(t)+i
if(30<o){var l=i-i%5
o=(r&(1<<l)-1).toString(32),r>>=l,i-=l,zu=1<<32-Cl(t)+i|n<<i|r,Pu=o+e}else zu=1<<o|n<<i|r,Pu=e}function Rt(e){null!==e.return&&(Ht(e,1),Lt(e,1,0))}function Ot(e){for(;e===Cu;)Cu=Eu[--Tu],Eu[Tu]=null,Au=Eu[--Tu],Eu[Tu]=null
for(;e===ju;)ju=Du[--Fu],Du[Fu]=null,Pu=Du[--Fu],Du[Fu]=null,zu=Du[--Fu],Du[Fu]=null}function Wt(e,t){var n=Bi(5,null,null,0)
n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function Nt(e,t){switch(e.tag){case 5:var n=e.type
return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,_u=e,$u=yt(t.firstChild),!0)
case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,_u=e,$u=null,!0)
case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==ju?{id:zu,overflow:Pu}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Bi(18,null,null,0)).stateNode=t,n.return=e,e.child=n,_u=e,$u=null,!0)
default:return!1}}function Zt(e){return!(!(1&e.mode)||128&e.flags)}function Bt(t){if(Hu){var n=$u
if(n){var r=n
if(!Nt(t,n)){if(Zt(t))throw Error(e(418))
n=yt(r.nextSibling)
var i=_u
n&&Nt(t,n)?Wt(i,r):(t.flags=-4097&t.flags|2,Hu=!1,_u=t)}}else{if(Zt(t))throw Error(e(418))
t.flags=-4097&t.flags|2,Hu=!1,_u=t}}}function Ut(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return
_u=e}function Gt(t){if(t!==_u)return!1
if(!Hu)return Ut(t),Hu=!0,!1
var n
if((n=3!==t.tag)&&!(n=5!==t.tag)&&(n="head"!==(n=t.type)&&"body"!==n&&!gt(t.type,t.memoizedProps)),n&&(n=$u)){if(Zt(t))throw Vt(),Error(e(418))
for(;n;)Wt(t,n),n=yt(n.nextSibling)}if(Ut(t),13===t.tag){if(!(t=null!==(t=t.memoizedState)?t.dehydrated:null))throw Error(e(317))
e:{for(t=t.nextSibling,n=0;t;){if(8===t.nodeType){var r=t.data
if("/$"===r){if(0===n){$u=yt(t.nextSibling)
break e}n--}else"$"!==r&&"$!"!==r&&"$?"!==r||n++}t=t.nextSibling}$u=null}}else $u=_u?yt(t.stateNode.nextSibling):null
return!0}function Vt(){for(var e=$u;e;)e=yt(e.nextSibling)}function Yt(){$u=_u=null,Hu=!1}function Jt(e){null===Lu?Lu=[e]:Lu.push(e)}function Kt(t,n,r){if(null!==(t=r.ref)&&"function"!=typeof t&&"object"!=typeof t){if(r.i){if(r=r.i){if(1!==r.tag)throw Error(e(309))
var i=r.stateNode}if(!i)throw Error(e(147,t))
var o=i,l=""+t
return null!==n&&null!==n.ref&&"function"==typeof n.ref&&n.ref.R===l?n.ref:((n=function(e){var t=o.refs
null===e?delete t[l]:t[l]=e}).R=l,n)}if("string"!=typeof t)throw Error(e(284))
if(!r.i)throw Error(e(290,t))}return t}function Qt(t,n){throw t=Object.prototype.toString.call(n),Error(e(31,"[object Object]"===t?"object with keys {"+Object.keys(n).join(", ")+"}":t))}function Xt(e){return(0,e.C)(e.T)}function qt(t){function n(e,n){if(t){var r=e.deletions
null===r?(e.deletions=[n],e.flags|=16):r.push(n)}}function r(e,r){if(!t)return null
for(;null!==r;)n(e,r),r=r.sibling
return null}function i(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling
return e}function o(e,t){return(e=Gi(e,t)).index=0,e.sibling=null,e}function l(e,n,r){return e.index=r,t?null!==(r=e.alternate)?(r=r.index)<n?(e.flags|=2,n):r:(e.flags|=2,n):(e.flags|=1048576,n)}function u(e){return t&&null===e.alternate&&(e.flags|=2),e}function s(e,t,n,r){return null===t||6!==t.tag?((t=Ki(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function c(e,t,n,r){var i=n.type
return i===Do?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"==typeof i&&null!==i&&i.$$typeof===Ro&&Xt(i)===t.type)?((r=o(t,n.props)).ref=Kt(e,t,n),r.return=e,r):((r=Vi(n.type,n.key,n.props,null,e.mode,r)).ref=Kt(e,t,n),r.return=e,r)}function f(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Qi(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function d(e,t,n,r,i){return null===t||7!==t.tag?((t=Yi(n,e.mode,r,i)).return=e,t):((t=o(t,n)).return=e,t)}function p(e,t,n){if("string"==typeof t&&""!==t||"number"==typeof t)return(t=Ki(""+t,e.mode,n)).return=e,t
if("object"==typeof t&&null!==t){switch(t.$$typeof){case Co:return(n=Vi(t.type,t.key,t.props,null,e.mode,n)).ref=Kt(e,null,t),n.return=e,n
case Ao:return(t=Qi(t,e.mode,n)).return=e,t
case Ro:return p(e,(0,t.C)(t.T),n)}if(Bo(t)||a(t))return(t=Yi(t,e.mode,n,null)).return=e,t
Qt(e,t)}return null}function h(e,t,n,r){var i=null!==t?t.key:null
if("string"==typeof n&&""!==n||"number"==typeof n)return null!==i?null:s(e,t,""+n,r)
if("object"==typeof n&&null!==n){switch(n.$$typeof){case Co:return n.key===i?c(e,t,n,r):null
case Ao:return n.key===i?f(e,t,n,r):null
case Ro:return h(e,t,(i=n.C)(n.T),r)}if(Bo(n)||a(n))return null!==i?null:d(e,t,n,r,null)
Qt(e,n)}return null}function m(e,t,n,r,i){if("string"==typeof r&&""!==r||"number"==typeof r)return s(t,e=e.get(n)||null,""+r,i)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case Co:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i)
case Ao:return f(t,e=e.get(null===r.key?n:r.key)||null,r,i)
case Ro:return m(e,t,n,(0,r.C)(r.T),i)}if(Bo(r)||a(r))return d(t,e=e.get(n)||null,r,i,null)
Qt(t,r)}return null}return function s(c,f,d,g){if("object"==typeof d&&null!==d&&d.type===Do&&null===d.key&&(d=d.props.children),"object"==typeof d&&null!==d){switch(d.$$typeof){case Co:e:{for(var v=d.key,b=f;null!==b;){if(b.key===v){if((v=d.type)===Do){if(7===b.tag){r(c,b.sibling),(f=o(b,d.props.children)).return=c,c=f
break e}}else if(b.elementType===v||"object"==typeof v&&null!==v&&v.$$typeof===Ro&&Xt(v)===b.type){r(c,b.sibling),(f=o(b,d.props)).ref=Kt(c,b,d),f.return=c,c=f
break e}r(c,b)
break}n(c,b),b=b.sibling}d.type===Do?((f=Yi(d.props.children,c.mode,g,d.key)).return=c,c=f):((g=Vi(d.type,d.key,d.props,null,c.mode,g)).ref=Kt(c,f,d),g.return=c,c=g)}return u(c)
case Ao:e:{for(b=d.key;null!==f;){if(f.key===b){if(4===f.tag&&f.stateNode.containerInfo===d.containerInfo&&f.stateNode.implementation===d.implementation){r(c,f.sibling),(f=o(f,d.children||[])).return=c,c=f
break e}r(c,f)
break}n(c,f),f=f.sibling}(f=Qi(d,c.mode,g)).return=c,c=f}return u(c)
case Ro:return s(c,f,(b=d.C)(d.T),g)}if(Bo(d))return function(e,o,a,u){for(var s=null,c=null,f=o,d=o=0,g=null;null!==f&&d<a.length;d++){f.index>d?(g=f,f=null):g=f.sibling
var v=h(e,f,a[d],u)
if(null===v){null===f&&(f=g)
break}t&&f&&null===v.alternate&&n(e,f),o=l(v,o,d),null===c?s=v:c.sibling=v,c=v,f=g}if(d===a.length)return r(e,f),Hu&&Ht(e,d),s
if(null===f){for(;d<a.length;d++)null!==(f=p(e,a[d],u))&&(o=l(f,o,d),null===c?s=f:c.sibling=f,c=f)
return Hu&&Ht(e,d),s}for(f=i(e,f);d<a.length;d++)null!==(g=m(f,e,d,a[d],u))&&(t&&null!==g.alternate&&f.delete(null===g.key?d:g.key),o=l(g,o,d),null===c?s=g:c.sibling=g,c=g)
return t&&f.forEach(function(t){return n(e,t)}),Hu&&Ht(e,d),s}(c,f,d,g)
if(a(d))return function(o,u,s,c){var f=a(s)
if("function"!=typeof f)throw Error(e(150))
if(null==(s=f.call(s)))throw Error(e(151))
for(var d=f=null,g=u,v=u=0,b=null,y=s.next();null!==g&&!y.done;v++,y=s.next()){g.index>v?(b=g,g=null):b=g.sibling
var w=h(o,g,y.value,c)
if(null===w){null===g&&(g=b)
break}t&&g&&null===w.alternate&&n(o,g),u=l(w,u,v),null===d?f=w:d.sibling=w,d=w,g=b}if(y.done)return r(o,g),Hu&&Ht(o,v),f
if(null===g){for(;!y.done;v++,y=s.next())null!==(y=p(o,y.value,c))&&(u=l(y,u,v),null===d?f=y:d.sibling=y,d=y)
return Hu&&Ht(o,v),f}for(g=i(o,g);!y.done;v++,y=s.next())null!==(y=m(g,o,v,y.value,c))&&(t&&null!==y.alternate&&g.delete(null===y.key?v:y.key),u=l(y,u,v),null===d?f=y:d.sibling=y,d=y)
return t&&g.forEach(function(e){return n(o,e)}),Hu&&Ht(o,v),f}(c,f,d,g)
Qt(c,d)}return"string"==typeof d&&""!==d||"number"==typeof d?(d=""+d,null!==f&&6===f.tag?(r(c,f.sibling),(f=o(f,d)).return=c,c=f):(r(c,f),(f=Ki(d,c.mode,g)).return=c,c=f),u(c)):r(c,f)}}function en(){Uu=Bu=Zu=null}function tn(e){var t=Nu.current
Et(Nu),e.m=t}function nn(e,t,n){for(;null!==e;){var r=e.alternate
if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break
e=e.return}}function rn(e,t){Zu=e,Uu=Bu=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(vs=!0),e.firstContext=null)}function on(t){var n=t.m
if(Uu!==t)if(t={context:t,memoizedValue:n,next:null},null===Bu){if(null===Zu)throw Error(e(308))
Bu=t,Zu.dependencies={lanes:0,firstContext:t}}else Bu=Bu.next=t
return n}function ln(e){null===Gu?Gu=[e]:Gu.push(e)}function an(e,t,n,r){var i=t.interleaved
return null===i?(n.next=n,ln(t)):(n.next=i.next,i.next=n),t.interleaved=n,un(e,r)}function un(e,t){e.lanes|=t
var n=e.alternate
for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return
return 3===n.tag?n.stateNode:null}function sn(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function cn(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function fn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function dn(e,t,n){var r=e.updateQueue
if(null===r)return null
if(r=r.shared,2&Fs){var i=r.pending
return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,un(e,n)}return null===(i=r.interleaved)?(t.next=t,ln(r)):(t.next=i.next,i.next=t),r.interleaved=t,un(e,n)}function pn(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,4194240&n)){var r=t.lanes
n|=r&=e.pendingLanes,t.lanes=n,ce(e,n)}}function hn(e,t){var n=e.updateQueue,r=e.alternate
if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null
if(null!==(n=n.firstBaseUpdate)){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null}
null===o?i=o=l:o=o.next=l,n=n.next}while(null!==n)
null===o?i=o=t:o=o.next=t}else i=o=t
return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n,void 0}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function mn(e,t,n,r){var i=e.updateQueue
Vu=!1
var o=i.firstBaseUpdate,l=i.lastBaseUpdate,a=i.shared.pending
if(null!==a){i.shared.pending=null
var u=a,s=u.next
u.next=null,null===l?o=s:l.next=s,l=u
var c=e.alternate
null!==c&&(a=(c=c.updateQueue).lastBaseUpdate)!==l&&(null===a?c.firstBaseUpdate=s:a.next=s,c.lastBaseUpdate=u)}if(null!==o){var f=i.baseState
for(l=0,c=s=u=null,a=o;;){var d=a.lane,p=a.eventTime
if((r&d)===d){null!==c&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null})
e:{var h=e,m=a
switch(d=t,p=n,m.tag){case 1:if("function"==typeof(h=m.payload)){f=h.call(p,f,d)
break e}f=h
break e
case 3:h.flags=-65537&h.flags|128
case 0:if(null==(d="function"==typeof(h=m.payload)?h.call(p,f,d):h))break e
f=No({},f,d)
break e
case 2:Vu=!0}}null!==a.callback&&0!==a.lane&&(e.flags|=64,null===(d=i.effects)?i.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===c?(s=c=p,u=f):c=c.next=p,l|=d
if(null===(a=a.next)){if(null===(a=i.shared.pending))break
a=(d=a).next,d.next=null,i.lastBaseUpdate=d,i.shared.pending=null}1}if(null===c&&(u=f),i.baseState=u,i.firstBaseUpdate=s,i.lastBaseUpdate=c,null!==(t=i.shared.interleaved)){i=t
do{l|=i.lane,i=i.next}while(i!==t)}else null===o&&(i.shared.lanes=0)
Rs|=l,e.lanes=l,e.memoizedState=f}}function gn(t,n,r){if(t=n.effects,n.effects=null,null!==t)for(n=0;n<t.length;n++){var i=t[n],o=i.callback
if(null!==o){if(i.callback=null,i=r,"function"!=typeof o)throw Error(e(191,o))
o.call(i)}}}function vn(t){if(t===Yu)throw Error(e(174))
return t}function bn(e,t){switch(Tt(Qu,t),Tt(Ku,e),Tt(Ju,Yu),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:D(null,"")
break
default:t=D(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Et(Ju),Tt(Ju,t)}function yn(){Et(Ju),Et(Ku),Et(Qu)}function wn(e){vn(Qu.current)
var t=vn(Ju.current),n=D(t,e.type)
t!==n&&(Tt(Ku,e),Tt(Ju,n))}function xn(e){Ku.current===e&&(Et(Ju),Et(Ku))}function kn(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState
if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(128&t.flags)return t}else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return null
t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function In(){for(var e=0;e<qu.length;e++)qu[e].O=null
qu.length=0}function Mn(){throw Error(e(321))}function Sn(e,t){if(null===t)return!1
for(var n=0;n<t.length&&n<e.length;n++)if(!ja(e[n],t[n]))return!1
return!0}function En(t,n,r,i,o,l){if(ns=l,rs=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,es.current=null===t||null===t.memoizedState?fs:ds,t=r(i,o),as){l=0
do{if(as=!1,us=0,25<=l)throw Error(e(301))
l+=1,os=is=null,n.updateQueue=null,es.current=ps,t=r(i,o)}while(as)}if(es.current=cs,n=null!==is&&null!==is.next,ns=0,os=is=rs=null,ls=!1,n)throw Error(e(300))
return t}function Tn(){var e=0!==us
return us=0,e}function Cn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===os?rs.memoizedState=os=e:os=os.next=e,os}function An(){if(null===is){var t=rs.alternate
t=null!==t?t.memoizedState:null}else t=is.next
var n=null===os?rs.memoizedState:os.next
if(null!==n)os=n,is=t
else{if(null===t)throw Error(e(310))
t={memoizedState:(is=t).memoizedState,baseState:is.baseState,baseQueue:is.baseQueue,queue:is.queue,next:null},null===os?rs.memoizedState=os=t:os=os.next=t}return os}function Dn(e,t){return"function"==typeof t?t(e):t}function Fn(t){var n=An(),r=n.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=t
var i=is,o=i.baseQueue,l=r.pending
if(null!==l){if(null!==o){var a=o.next
o.next=l.next,l.next=a}i.baseQueue=o=l,r.pending=null}if(null!==o){l=o.next,i=i.baseState
var u=a=null,s=null,c=l
do{var f=c.lane
if((ns&f)===f)null!==s&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action)
else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}
null===s?(u=s=d,a=i):s=s.next=d,rs.lanes|=f,Rs|=f}c=c.next}while(null!==c&&c!==l)
null===s?a=i:s.next=u,ja(i,n.memoizedState)||(vs=!0),n.memoizedState=i,n.baseState=a,n.baseQueue=s,r.lastRenderedState=i}if(null!==(t=r.interleaved)){o=t
do{l=o.lane,rs.lanes|=l,Rs|=l,o=o.next}while(o!==t)}else null===o&&(r.lanes=0)
return[n.memoizedState,r.dispatch]}function jn(t){var n=An(),r=n.queue
if(null===r)throw Error(e(311))
r.lastRenderedReducer=t
var i=r.dispatch,o=r.pending,l=n.memoizedState
if(null!==o){r.pending=null
var a=o=o.next
do{l=t(l,a.action),a=a.next}while(a!==o)
ja(l,n.memoizedState)||(vs=!0),n.memoizedState=l,null===n.baseQueue&&(n.baseState=l),r.lastRenderedState=l}return[l,i]}function zn(){}function Pn(t,n){var r=rs,i=An(),o=n(),l=!ja(i.memoizedState,o)
if(l&&(i.memoizedState=o,vs=!0),i=i.queue,Gn(Hn.bind(null,r,i,t),[t]),i.getSnapshot!==n||l||null!==os&&1&os.memoizedState.tag){if(r.flags|=2048,Wn(9,$n.bind(null,r,i,o,n),void 0,null),null===js)throw Error(e(349))
30&ns||_n(r,n,o)}return o}function _n(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=rs.updateQueue)?(t={lastEffect:null,stores:null},rs.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function $n(e,t,n,r){t.value=n,t.getSnapshot=r,Ln(t)&&Rn(e)}function Hn(e,t,n){return n(function(){Ln(t)&&Rn(e)})}function Ln(e){var t=e.getSnapshot
e=e.value
try{var n=t()
return!ja(e,n)}catch(r){return!0}}function Rn(e){var t=un(e,1)
null!==t&&mi(t,e,1,-1)}function On(e){var t=Cn()
return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dn,lastRenderedState:e},t.queue=e,e=e.dispatch=ir.bind(null,rs,e),[t.memoizedState,e]}function Wn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=rs.updateQueue)?(t={lastEffect:null,stores:null},rs.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Nn(){return An().memoizedState}function Zn(e,t,n,r){var i=Cn()
rs.flags|=e,i.memoizedState=Wn(1|t,n,void 0,void 0===r?null:r)}function Bn(e,t,n,r){var i=An()
r=void 0===r?null:r
var o=void 0
if(null!==is){var l=is.memoizedState
if(o=l.destroy,null!==r&&Sn(r,l.deps))return i.memoizedState=Wn(t,n,o,r),void 0}rs.flags|=e,i.memoizedState=Wn(1|t,n,o,r)}function Un(e,t){return Zn(8390656,8,e,t)}function Gn(e,t){return Bn(2048,8,e,t)}function Vn(e,t){return Bn(4,2,e,t)}function Yn(e,t){return Bn(4,4,e,t)}function Jn(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Kn(e,t,n){return n=null!=n?n.concat([e]):null,Bn(4,4,Jn.bind(null,t,e),n)}function Qn(){}function Xn(e,t){var n=An()
t=void 0===t?null:t
var r=n.memoizedState
return null!==r&&null!==t&&Sn(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qn(e,t){var n=An()
t=void 0===t?null:t
var r=n.memoizedState
return null!==r&&null!==t&&Sn(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function er(e,t,n){return 21&ns?(ja(n,t)||(n=ae(),rs.lanes|=n,Rs|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,vs=!0),e.memoizedState=n)}function tr(e,t){var n=zl
zl=0!==n&&4>n?n:4,e(!0)
var r=ts.transition
ts.transition={}
try{e(!1),t()}finally{zl=n,ts.transition=r}}function nr(){return An().memoizedState}function rr(e,t,n){var r=hi(e)
n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},or(e)?lr(t,n):null!==(n=an(e,t,n,r))&&(mi(n,e,r,pi()),ar(n,t,r))}function ir(e,t,n){var r=hi(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null}
if(or(e))lr(t,i)
else{var o=e.alternate
if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var l=t.lastRenderedState,a=o(l,n)
if(i.hasEagerState=!0,i.eagerState=a,ja(a,l)){var u=t.interleaved
return null===u?(i.next=i,ln(t)):(i.next=u.next,u.next=i),t.interleaved=i,void 0}}catch(s){}null!==(n=an(e,t,i,r))&&(mi(n,e,r,i=pi()),ar(n,t,r))}}function or(e){var t=e.alternate
return e===rs||null!==t&&t===rs}function lr(e,t){as=ls=!0
var n=e.pending
null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ar(e,t,n){if(4194240&n){var r=t.lanes
n|=r&=e.pendingLanes,t.lanes=n,ce(e,n)}}function ur(e,t){if(e&&e.defaultProps){for(var n in t=No({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n])
return t}return t}function sr(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:No({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}function cr(e,t,n,r,i,o,l){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,l):!(t.prototype&&t.prototype.isPureReactComponent&&Ue(n,r)&&Ue(i,o))}function fr(e,t,n){var r=!1,i=yu,o=t.contextType
return"object"==typeof o&&null!==o?o=on(o):(i=At(t)?ku:wu.current,o=(r=null!=(r=t.contextTypes))?Ct(e,i):yu),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=hs,e.stateNode=t,t.W=e,r&&((e=e.stateNode).$=i,e.H=o),t}function dr(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&hs.enqueueReplaceState(t,t.state,null)}function pr(e,t,n,r){var i=e.stateNode
i.props=n,i.state=e.memoizedState,i.refs={},sn(e)
var o=t.contextType
"object"==typeof o&&null!==o?i.context=on(o):(o=At(t)?ku:wu.current,i.context=Ct(e,o)),i.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(sr(e,t,o,n),i.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof i.getSnapshotBeforeUpdate||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||(t=i.state,"function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&hs.enqueueReplaceState(i,i.state,null),mn(e,n,i,r),i.state=e.memoizedState),"function"==typeof i.componentDidMount&&(e.flags|=4194308)}function hr(e,t){try{var n="",r=t
do{n+=c(r),r=r.return}while(r)
var i=n}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:i,digest:null}}function mr(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function gr(e,t){try{void 0}catch(n){setTimeout(function(){throw n})}}function vr(e,t,n){(n=fn(-1,n)).tag=3,n.payload={element:null}
var r=t.value
return n.callback=function(){Vs||(Vs=!0,Ys=r),gr()},n}function br(e,t,n){(n=fn(-1,n)).tag=3
var r=e.type.getDerivedStateFromError
if("function"==typeof r){var i=t.value
n.payload=function(){return r(i)},n.callback=function(){gr()}}var o=e.stateNode
return null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){gr(),"function"!=typeof r&&(null===Js?Js=new Set([this]):Js.add(this))
var e=t.stack
this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function yr(e,t,n){var r=e.pingCache
if(null===r){r=e.pingCache=new ms
var i=new Set
r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i))
i.has(n)||(i.add(n),e=Li.bind(null,e,t,n),t.then(e,e))}function wr(e){do{var t
if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e
e=e.return}while(null!==e)
return null}function xr(e,t,n,r,i){return 1&e.mode?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=fn(-1,1)).tag=2,dn(n,t,1))),n.lanes|=1),e)}function kr(e,t,n,r){t.child=null===e?Wu(t,null,n,r):Ou(t,e.child,n,r)}function Ir(e,t,n,r,i){n=n.render
var o=t.ref
return rn(t,i),r=En(e,t,n,r,o,i),n=Tn(),null===e||vs?(Hu&&n&&Rt(t),t.flags|=1,kr(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wr(e,t,i))}function Mr(e,t,n,r,i){if(null===e){var o=n.type
return"function"!=typeof o||Ui(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Vi(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,Sr(e,t,o,r,i))}if(o=e.child,0===(e.lanes&i)){var l=o.memoizedProps
if((n=null!==(n=n.compare)?n:Ue)(l,r)&&e.ref===t.ref)return Wr(e,t,i)}return t.flags|=1,(e=Gi(o,r)).ref=t.ref,e.return=t,t.child=e}function Sr(e,t,n,r,i){if(null!==e){var o=e.memoizedProps
if(Ue(o,r)&&e.ref===t.ref){if(vs=!1,t.pendingProps=r=o,0===(e.lanes&i))return t.lanes=e.lanes,Wr(e,t,i)
131072&e.flags&&(vs=!0)}}return Cr(e,t,n,r,i)}function Er(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null
if("hidden"===r.mode)if(1&t.mode){if(!(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Tt($s,_s),_s|=e,null
t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:n,Tt($s,_s),_s|=r}else t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Tt($s,_s),_s|=n
else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Tt($s,_s),_s|=r
return kr(e,t,i,n),t.child}function Tr(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Cr(e,t,n,r,i){var o=At(n)?ku:wu.current
return o=Ct(t,o),rn(t,i),n=En(e,t,n,r,o,i),r=Tn(),null===e||vs?(Hu&&r&&Rt(t),t.flags|=1,kr(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wr(e,t,i))}function Ar(e,t,n,r,i){if(At(n)){var o=!0
zt(t)}else o=!1
if(rn(t,i),null===t.stateNode)Or(e,t),fr(t,n,r),pr(t,n,r,i),r=!0
else if(null===e){var l=t.stateNode,a=t.memoizedProps
l.props=a
var u=l.context,s=n.contextType
s="object"==typeof s&&null!==s?on(s):Ct(t,s=At(n)?ku:wu.current)
var c=n.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof l.getSnapshotBeforeUpdate
f||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(a!==r||u!==s)&&dr(t,l,r,s),Vu=!1
var d=t.memoizedState
l.state=d,mn(t,r,l,i),u=t.memoizedState,a!==r||d!==u||xu.current||Vu?("function"==typeof c&&(sr(t,n,c,r),u=t.memoizedState),(a=Vu||cr(t,n,a,r,d,u,s))?(f||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||("function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"==typeof l.componentDidMount&&(t.flags|=4194308)):("function"==typeof l.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),l.props=r,l.state=u,l.context=s,r=a):("function"==typeof l.componentDidMount&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,cn(e,t),a=t.memoizedProps,s=t.type===t.elementType?a:ur(t.type,a),l.props=s,f=t.pendingProps,d=l.context,u="object"==typeof(u=n.contextType)&&null!==u?on(u):Ct(t,u=At(n)?ku:wu.current)
var p=n.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof l.getSnapshotBeforeUpdate)||"function"!=typeof l.UNSAFE_componentWillReceiveProps&&"function"!=typeof l.componentWillReceiveProps||(a!==f||d!==u)&&dr(t,l,r,u),Vu=!1,d=t.memoizedState,l.state=d,mn(t,r,l,i)
var h=t.memoizedState
a!==f||d!==h||xu.current||Vu?("function"==typeof p&&(sr(t,n,p,r),h=t.memoizedState),(s=Vu||cr(t,n,s,r,d,h,u)||!1)?(c||"function"!=typeof l.UNSAFE_componentWillUpdate&&"function"!=typeof l.componentWillUpdate||("function"==typeof l.componentWillUpdate&&l.componentWillUpdate(r,h,u),"function"==typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,h,u)),"function"==typeof l.componentDidUpdate&&(t.flags|=4),"function"==typeof l.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!=typeof l.componentDidUpdate||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),l.props=r,l.state=h,l.context=u,r=s):("function"!=typeof l.componentDidUpdate||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof l.getSnapshotBeforeUpdate||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return Dr(e,t,n,r,o,i)}function Dr(e,t,n,r,i,o){Tr(e,t)
var l=!!(128&t.flags)
if(!r&&!l)return i&&Pt(t,n,!1),Wr(e,t,o)
r=t.stateNode,gs.current=t
var a=l&&"function"!=typeof n.getDerivedStateFromError?null:r.render()
return t.flags|=1,null!==e&&l?(t.child=Ou(t,e.child,null,o),t.child=Ou(t,null,a,o)):kr(e,t,a,o),t.memoizedState=r.state,i&&Pt(t,n,!0),t.child}function Fr(e){var t=e.stateNode
t.pendingContext?Ft(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Ft(0,t.context,!1),bn(e,t.containerInfo)}function jr(e,t,n,r,i){return Yt(),Jt(i),t.flags|=256,kr(e,t,n,r),t.child}function zr(e){return{baseLanes:e,cachePool:null,transitions:null}}function Pr(t,n,r){var i,o=n.pendingProps,l=Xu.current,a=!1,u=!!(128&n.flags)
if((i=u)||(i=(null===t||null!==t.memoizedState)&&!!(2&l)),i?(a=!0,n.flags&=-129):null!==t&&null===t.memoizedState||(l|=1),Tt(Xu,1&l),null===t)return Bt(n),null!==(t=n.memoizedState)&&null!==(t=t.dehydrated)?(1&n.mode?"$!"===t.data?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(u=o.children,t=o.fallback,a?(o=n.mode,a=n.child,u={mode:"hidden",children:u},1&o||null===a?a=Ji(u,o,0,null):(a.childLanes=0,a.pendingProps=u),t=Yi(t,o,r,null),a.return=n,t.return=n,a.sibling=t,n.child=a,n.child.memoizedState=zr(r),n.memoizedState=bs,t):_r(n,u))
if(null!==(l=t.memoizedState)&&null!==(i=l.dehydrated))return function(t,n,r,i,o,l,a){if(r)return 256&n.flags?(n.flags&=-257,$r(t,n,a,i=mr(Error(e(422))))):null!==n.memoizedState?(n.child=t.child,n.flags|=128,null):(l=i.fallback,o=n.mode,i=Ji({mode:"visible",children:i.children},o,0,null),(l=Yi(l,o,a,null)).flags|=2,i.return=n,l.return=n,i.sibling=l,n.child=i,1&n.mode&&Ou(n,t.child,null,a),n.child.memoizedState=zr(a),n.memoizedState=bs,l)
if(!(1&n.mode))return $r(t,n,a,null)
if("$!"===o.data){if(i=o.nextSibling&&o.nextSibling.dataset)var u=i.dgst
return i=u,$r(t,n,a,i=mr(l=Error(e(419)),i,void 0))}if(u=0!==(a&t.childLanes),vs||u){if(null!==(i=js)){switch(a&-a){case 4:o=2
break
case 16:o=8
break
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32
break
case 536870912:o=268435456
break
default:o=0}0!==(o=0!==(o&(i.suspendedLanes|a))?0:o)&&o!==l.retryLane&&(l.retryLane=o,un(t,o),mi(i,t,o,-1))}return Ci(),$r(t,n,a,i=mr(Error(e(421))))}return"$?"===o.data?(n.flags|=128,n.child=t.child,n=Oi.bind(null,t),o.N=n,null):(t=l.treeContext,$u=yt(o.nextSibling),_u=n,Hu=!0,Lu=null,null!==t&&(Du[Fu++]=zu,Du[Fu++]=Pu,Du[Fu++]=ju,zu=t.id,Pu=t.overflow,ju=n),(n=_r(n,i.children)).flags|=4096,n)}(t,n,u,o,i,l,r)
if(a){a=o.fallback,u=n.mode,i=(l=t.child).sibling
var s={mode:"hidden",children:o.children}
return 1&u||n.child===l?(o=Gi(l,s)).subtreeFlags=14680064&l.subtreeFlags:((o=n.child).childLanes=0,o.pendingProps=s,n.deletions=null),null!==i?a=Gi(i,a):(a=Yi(a,u,r,null)).flags|=2,a.return=n,o.return=n,o.sibling=a,n.child=o,o=a,a=n.child,u=null===(u=t.child.memoizedState)?zr(r):{baseLanes:u.baseLanes|r,cachePool:null,transitions:u.transitions},a.memoizedState=u,a.childLanes=t.childLanes&~r,n.memoizedState=bs,o}return t=(a=t.child).sibling,o=Gi(a,{mode:"visible",children:o.children}),!(1&n.mode)&&(o.lanes=r),o.return=n,o.sibling=null,null!==t&&(null===(r=n.deletions)?(n.deletions=[t],n.flags|=16):r.push(t)),n.child=o,n.memoizedState=null,o}function _r(e,t){return(t=Ji({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function $r(e,t,n,r){return null!==r&&Jt(r),Ou(t,e.child,null,n),(e=_r(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Hr(e,t,n){e.lanes|=t
var r=e.alternate
null!==r&&(r.lanes|=t),nn(e.return,t,n)}function Lr(e,t,n,r,i){var o=e.memoizedState
null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Rr(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail
if(kr(e,t,r.children,n),2&(r=Xu.current))r=1&r|2,t.flags|=128
else{if(null!==e&&128&e.flags)e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Hr(e,n,t)
else if(19===e.tag)Hr(e,n,t)
else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===t)break e
for(;null===e.sibling;){if(null===e.return||e.return===t)break e
e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Tt(Xu,r),1&t.mode)switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===kn(e)&&(i=n),n=n.sibling
null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Lr(t,!1,i,n,o)
break
case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===kn(e)){t.child=i
break}e=i.sibling,i.sibling=n,n=i,i=e}Lr(t,!0,n,null,o)
break
case"together":Lr(t,!1,null,null,void 0)
break
default:t.memoizedState=null}else t.memoizedState=null
return t.child}function Or(e,t){!(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Wr(t,n,r){if(null!==t&&(n.dependencies=t.dependencies),Rs|=n.lanes,0===(r&n.childLanes))return null
if(null!==t&&n.child!==t.child)throw Error(e(153))
if(null!==n.child){for(r=Gi(t=n.child,t.pendingProps),n.child=r,r.return=n;null!==t.sibling;)t=t.sibling,(r=r.sibling=Gi(t,t.pendingProps)).return=n
r.sibling=null}return n.child}function Nr(e,t){if(!Hu)switch(e.tailMode){case"hidden":t=e.tail
for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling
null===n?e.tail=null:n.sibling=null
break
case"collapsed":n=e.tail
for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling
null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Zr(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0
if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=14680064&i.subtreeFlags,r|=14680064&i.flags,i.return=e,i=i.sibling
else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling
return e.subtreeFlags|=r,e.childLanes=n,t}function Br(t,n,r){var i=n.pendingProps
switch(Ot(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Zr(n),null
case 1:case 17:return At(n.type)&&Dt(),Zr(n),null
case 3:return i=n.stateNode,yn(),Et(xu),Et(wu),In(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),null!==t&&null!==t.child||(Gt(n)?n.flags|=4:null===t||t.memoizedState.isDehydrated&&!(256&n.flags)||(n.flags|=1024,null!==Lu&&(yi(Lu),Lu=null))),Ka(t,n),Zr(n),null
case 5:xn(n)
var o=vn(Qu.current)
if(r=n.type,null!==t&&null!=n.stateNode)Qa(t,n,r,i,o),t.ref!==n.ref&&(n.flags|=512,n.flags|=2097152)
else{if(!i){if(null===n.stateNode)throw Error(e(166))
return Zr(n),null}if(t=vn(Ju.current),Gt(n)){i=n.stateNode,r=n.type
var a=n.memoizedProps
switch(i[fu]=n,i[du]=a,t=!!(1&n.mode),r){case"dialog":it("cancel",i),it("close",i)
break
case"iframe":case"object":case"embed":it("load",i)
break
case"video":case"audio":for(o=0;o<qa.length;o++)it(qa[o],i)
break
case"source":it("error",i)
break
case"img":case"image":case"link":it("error",i),it("load",i)
break
case"details":it("toggle",i)
break
case"input":y(i,a),it("invalid",i)
break
case"select":i.F={wasMultiple:!!a.multiple},it("invalid",i)
break
case"textarea":E(i,a),it("invalid",i)}for(var u in H(r,a),o=null,a)if(a.hasOwnProperty(u)){var s=a[u]
"children"===u?"string"==typeof s?i.textContent!==s&&(!0!==a.suppressHydrationWarning&&ht(i.textContent,s,t),o=["children",s]):"number"==typeof s&&i.textContent!==""+s&&(!0!==a.suppressHydrationWarning&&ht(i.textContent,s,t),o=["children",""+s]):go.hasOwnProperty(u)&&null!=s&&"onScroll"===u&&it("scroll",i)}switch(r){case"input":m(i),k(i,a,!0)
break
case"textarea":m(i),C(i)
break
case"select":case"option":break
default:"function"==typeof a.onClick&&(i.onclick=mt)}i=o,n.updateQueue=i,null!==i&&(n.flags|=4)}else{u=9===o.nodeType?o:o.ownerDocument,"http://www.w3.org/1999/xhtml"===t&&(t=A(r)),"http://www.w3.org/1999/xhtml"===t?"script"===r?((t=u.createElement("div")).innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):"string"==typeof i.is?t=u.createElement(r,{is:i.is}):(t=u.createElement(r),"select"===r&&(u=t,i.multiple?u.multiple=!0:i.size&&(u.size=i.size))):t=u.createElementNS(t,r),t[fu]=n,t[du]=i,Ja(t,n,!1,!1),n.stateNode=t
e:{switch(u=W(r,i),r){case"dialog":it("cancel",t),it("close",t),o=i
break
case"iframe":case"object":case"embed":it("load",t),o=i
break
case"video":case"audio":for(o=0;o<qa.length;o++)it(qa[o],t)
o=i
break
case"source":it("error",t),o=i
break
case"img":case"image":case"link":it("error",t),it("load",t),o=i
break
case"details":it("toggle",t),o=i
break
case"input":y(t,i),o=b(t,i),it("invalid",t)
break
case"option":default:o=i
break
case"select":t.F={wasMultiple:!!i.multiple},o=No({},i,{value:void 0}),it("invalid",t)
break
case"textarea":E(t,i),o=S(t,i),it("invalid",t)}for(a in H(r,o),s=o)if(s.hasOwnProperty(a)){var c=s[a]
"style"===a?$(t,c):"dangerouslySetInnerHTML"===a?null!=(c=c?c.j:void 0)&&Uo(t,c):"children"===a?"string"==typeof c?("textarea"!==r||""!==c)&&P(t,c):"number"==typeof c&&P(t,""+c):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(go.hasOwnProperty(a)?null!=c&&"onScroll"===a&&it("scroll",t):null!=c&&l(t,a,c,u))}switch(r){case"input":m(t),k(t,i,!1)
break
case"textarea":m(t),C(t)
break
case"option":null!=i.value&&t.setAttribute("value",""+p(i.value))
break
case"select":t.multiple=!!i.multiple,null!=(a=i.value)?M(t,!!i.multiple,a,!1):null!=i.defaultValue&&M(t,!!i.multiple,i.defaultValue,!0)
break
default:"function"==typeof o.onClick&&(t.onclick=mt)}switch(r){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus
break e
case"img":i=!0
break e
default:i=!1}}i&&(n.flags|=4)}null!==n.ref&&(n.flags|=512,n.flags|=2097152)}return Zr(n),null
case 6:if(t&&null!=n.stateNode)Xa(t,n,t.memoizedProps,i)
else{if("string"!=typeof i&&null===n.stateNode)throw Error(e(166))
if(r=vn(Qu.current),vn(Ju.current),Gt(n)){if(i=n.stateNode,r=n.memoizedProps,i[fu]=n,(a=i.nodeValue!==r)&&null!==(t=_u))switch(t.tag){case 3:ht(i.nodeValue,r,!!(1&t.mode))
break
case 5:!0!==t.memoizedProps.suppressHydrationWarning&&ht(i.nodeValue,r,!!(1&t.mode))}a&&(n.flags|=4)}else(i=(9===r.nodeType?r:r.ownerDocument).createTextNode(i))[fu]=n,n.stateNode=i}return Zr(n),null
case 13:if(Et(Xu),i=n.memoizedState,null===t||null!==t.memoizedState&&null!==t.memoizedState.dehydrated){if(Hu&&null!==$u&&1&n.mode&&!(128&n.flags))Vt(),Yt(),n.flags|=98560,a=!1
else if(a=Gt(n),null!==i&&null!==i.dehydrated){if(null===t){if(!a)throw Error(e(318))
if(!(a=null!==(a=n.memoizedState)?a.dehydrated:null))throw Error(e(317))
a[fu]=n}else Yt(),!(128&n.flags)&&(n.memoizedState=null),n.flags|=4
Zr(n),a=!1}else null!==Lu&&(yi(Lu),Lu=null),a=!0
if(!a)return 65536&n.flags?n:null}return 128&n.flags?(n.lanes=r,n):((i=null!==i)!=(null!==t&&null!==t.memoizedState)&&i&&(n.child.flags|=8192,1&n.mode&&(null===t||1&Xu.current?0===Hs&&(Hs=3):Ci())),null!==n.updateQueue&&(n.flags|=4),Zr(n),null)
case 4:return yn(),Ka(t,n),null===t&&lt(n.stateNode.containerInfo),Zr(n),null
case 10:return tn(n.type.S),Zr(n),null
case 19:if(Et(Xu),null===(a=n.memoizedState))return Zr(n),null
if(i=!!(128&n.flags),null===(u=a.rendering))if(i)Nr(a,!1)
else{if(0!==Hs||null!==t&&128&t.flags)for(t=n.child;null!==t;){if(null!==(u=kn(t))){for(n.flags|=128,Nr(a,!1),null!==(i=u.updateQueue)&&(n.updateQueue=i,n.flags|=4),n.subtreeFlags=0,i=r,r=n.child;null!==r;)t=i,(a=r).flags&=14680066,null===(u=a.alternate)?(a.childLanes=0,a.lanes=t,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=u.childLanes,a.lanes=u.lanes,a.child=u.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=u.memoizedProps,a.memoizedState=u.memoizedState,a.updateQueue=u.updateQueue,a.type=u.type,t=u.dependencies,a.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),r=r.sibling
return Tt(Xu,1&Xu.current|2),n.child}t=t.sibling}null!==a.tail&&yl()>Us&&(n.flags|=128,i=!0,Nr(a,!1),n.lanes=4194304)}else{if(!i)if(null!==(t=kn(u))){if(n.flags|=128,i=!0,null!==(r=t.updateQueue)&&(n.updateQueue=r,n.flags|=4),Nr(a,!0),null===a.tail&&"hidden"===a.tailMode&&!u.alternate&&!Hu)return Zr(n),null}else 2*yl()-a.renderingStartTime>Us&&1073741824!==r&&(n.flags|=128,i=!0,Nr(a,!1),n.lanes=4194304)
a.isBackwards?(u.sibling=n.child,n.child=u):(null!==(r=a.last)?r.sibling=u:n.child=u,a.last=u)}return null!==a.tail?(n=a.tail,a.rendering=n,a.tail=n.sibling,a.renderingStartTime=yl(),n.sibling=null,r=Xu.current,Tt(Xu,i?1&r|2:1&r),n):(Zr(n),null)
case 22:case 23:return Mi(),i=null!==n.memoizedState,null!==t&&null!==t.memoizedState!==i&&(n.flags|=8192),i&&1&n.mode?!!(1073741824&_s)&&(Zr(n),6&n.subtreeFlags&&(n.flags|=8192)):Zr(n),null
case 24:case 25:return null}throw Error(e(156,n.tag))}function Ur(t,n){switch(Ot(n),n.tag){case 1:return At(n.type)&&Dt(),65536&(t=n.flags)?(n.flags=-65537&t|128,n):null
case 3:return yn(),Et(xu),Et(wu),In(),65536&(t=n.flags)&&!(128&t)?(n.flags=-65537&t|128,n):null
case 5:return xn(n),null
case 13:if(Et(Xu),null!==(t=n.memoizedState)&&null!==t.dehydrated){if(null===n.alternate)throw Error(e(340))
Yt()}return 65536&(t=n.flags)?(n.flags=-65537&t|128,n):null
case 19:return Et(Xu),null
case 4:return yn(),null
case 10:return tn(n.type.S),null
case 22:case 23:return Mi(),null
default:return null}}function Gr(e,t){var n=e.ref
if(null!==n)if("function"==typeof n)try{n(null)}catch(r){Hi(e,t,r)}else n.current=null}function Vr(e,t,n){try{n()}catch(r){Hi(e,t,r)}}function Yr(e,t,n){var r=t.updateQueue
if(null!==(r=null!==r?r.lastEffect:null)){var i=r=r.next
do{if((i.tag&e)===e){var o=i.destroy
i.destroy=void 0,void 0!==o&&Vr(t,n,o)}i=i.next}while(i!==r)}}function Jr(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next
do{if((n.tag&e)===e){var r=n.create
n.destroy=r()}n=n.next}while(n!==t)}}function Kr(e){var t=e.ref
if(null!==t){var n=e.stateNode
e.tag,e=n,"function"==typeof t?t(e):t.current=e}}function Qr(e){var t=e.alternate
null!==t&&(e.alternate=null,Qr(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&null!==(t=e.stateNode)&&(delete t[fu],delete t[du],delete t[hu],delete t[mu],delete t[gu]),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Xr(e){return 5===e.tag||3===e.tag||4===e.tag}function qr(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Xr(e.return))return null
e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e
if(null===e.child||4===e.tag)continue e
e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function ei(e,t,n){var r=e.tag
if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n.Z)||null!==t.onclick||(t.onclick=mt))
else if(4!==r&&null!==(e=e.child))for(ei(e,t,n),e=e.sibling;null!==e;)ei(e,t,n),e=e.sibling}function ti(e,t,n){var r=e.tag
if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e)
else if(4!==r&&null!==(e=e.child))for(ti(e,t,n),e=e.sibling;null!==e;)ti(e,t,n),e=e.sibling}function ni(e,t,n){for(n=n.child;null!==n;)ri(e,t,n),n=n.sibling}function ri(e,t,n){if(Tl&&"function"==typeof Tl.onCommitFiberUnmount)try{Tl.onCommitFiberUnmount(El,n)}catch(a){}switch(n.tag){case 5:xs||Gr(n,t)
case 6:var r=Ss,i=Es
Ss=null,ni(e,t,n),Es=i,null!==(Ss=r)&&(Es?(e=Ss,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):Ss.removeChild(n.stateNode))
break
case 18:null!==Ss&&(Es?(e=Ss,n=n.stateNode,8===e.nodeType?bt(e.parentNode,n):1===e.nodeType&&bt(e,n),ye(e)):bt(Ss,n.stateNode))
break
case 4:r=Ss,i=Es,Ss=n.stateNode.containerInfo,Es=!0,ni(e,t,n),Ss=r,Es=i
break
case 0:case 11:case 14:case 15:if(!xs&&null!==(r=n.updateQueue)&&null!==(r=r.lastEffect)){i=r=r.next
do{var o=i,l=o.destroy
o=o.tag,void 0!==l&&(2&o||4&o)&&Vr(n,t,l),i=i.next}while(i!==r)}ni(e,t,n)
break
case 1:if(!xs&&(Gr(n,t),"function"==typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Hi(n,t,a)}ni(e,t,n)
break
case 21:ni(e,t,n)
break
case 22:1&n.mode?(xs=(r=xs)||null!==n.memoizedState,ni(e,t,n),xs=r):ni(e,t,n)
break
default:ni(e,t,n)}}function ii(e){var t=e.updateQueue
if(null!==t){e.updateQueue=null
var n=e.stateNode
null===n&&(n=e.stateNode=new ks),t.forEach(function(t){var r=Wi.bind(null,e,t)
n.has(t)||(n.add(t),t.then(r,r))})}}function oi(t,n){var r=n.deletions
if(null!==r)for(var i=0;i<r.length;i++){var o=r[i]
try{var l=t,a=n,u=a
e:for(;null!==u;){switch(u.tag){case 5:Ss=u.stateNode,Es=!1
break e
case 3:case 4:Ss=u.stateNode.containerInfo,Es=!0
break e}u=u.return}if(null===Ss)throw Error(e(160))
ri(l,a,o),Ss=null,Es=!1
var s=o.alternate
null!==s&&(s.return=null),o.return=null}catch(c){Hi(o,n,c)}}if(12854&n.subtreeFlags)for(n=n.child;null!==n;)li(n,t),n=n.sibling}function li(t,n){var r=t.alternate,i=t.flags
switch(t.tag){case 0:case 11:case 14:case 15:if(oi(n,t),ai(t),4&i){try{Yr(3,t,t.return),Jr(3,t)}catch(v){Hi(t,t.return,v)}try{Yr(5,t,t.return)}catch(v){Hi(t,t.return,v)}}break
case 1:oi(n,t),ai(t),512&i&&null!==r&&Gr(r,r.return)
break
case 5:if(oi(n,t),ai(t),512&i&&null!==r&&Gr(r,r.return),32&t.flags){var o=t.stateNode
try{P(o,"")}catch(v){Hi(t,t.return,v)}}if(4&i&&null!=(o=t.stateNode)){var a=t.memoizedProps,u=null!==r?r.memoizedProps:a,s=t.type,c=t.updateQueue
if(t.updateQueue=null,null!==c)try{"input"===s&&"radio"===a.type&&null!=a.name&&w(o,a),W(s,u)
var f=W(s,a)
for(u=0;u<c.length;u+=2){var d=c[u],p=c[u+1]
"style"===d?$(o,p):"dangerouslySetInnerHTML"===d?Uo(o,p):"children"===d?P(o,p):l(o,d,p,f)}switch(s){case"input":x(o,a)
break
case"textarea":T(o,a)
break
case"select":var h=o.F.wasMultiple
o.F.wasMultiple=!!a.multiple
var m=a.value
null!=m?M(o,!!a.multiple,m,!1):h!==!!a.multiple&&(null!=a.defaultValue?M(o,!!a.multiple,a.defaultValue,!0):M(o,!!a.multiple,a.multiple?[]:"",!1))}o[du]=a}catch(v){Hi(t,t.return,v)}}break
case 6:if(oi(n,t),ai(t),4&i){if(null===t.stateNode)throw Error(e(162))
o=t.stateNode,a=t.memoizedProps
try{o.nodeValue=a}catch(v){Hi(t,t.return,v)}}break
case 3:if(oi(n,t),ai(t),4&i&&null!==r&&r.memoizedState.isDehydrated)try{ye(n.containerInfo)}catch(v){Hi(t,t.return,v)}break
case 4:default:oi(n,t),ai(t)
break
case 13:oi(n,t),ai(t),8192&(o=t.child).flags&&(a=null!==o.memoizedState,o.stateNode.isHidden=a,!a||null!==o.alternate&&null!==o.alternate.memoizedState||(Bs=yl())),4&i&&ii(t)
break
case 22:if(d=null!==r&&null!==r.memoizedState,1&t.mode?(xs=(f=xs)||d,oi(n,t),xs=f):oi(n,t),ai(t),8192&i){if(f=null!==t.memoizedState,(t.stateNode.isHidden=f)&&!d&&1&t.mode)for(Is=t,d=t.child;null!==d;){for(p=Is=d;null!==Is;){switch(m=(h=Is).child,h.tag){case 0:case 11:case 14:case 15:Yr(4,h,h.return)
break
case 1:Gr(h,h.return)
var g=h.stateNode
if("function"==typeof g.componentWillUnmount){i=h,r=h.return
try{n=i,g.props=n.memoizedProps,g.state=n.memoizedState,g.componentWillUnmount()}catch(v){Hi(i,r,v)}}break
case 5:Gr(h,h.return)
break
case 22:if(null!==h.memoizedState){fi(p)
continue}}null!==m?(m.return=h,Is=m):fi(p)}d=d.sibling}e:for(d=null,p=t;;){if(5===p.tag){if(null===d){d=p
try{o=p.stateNode,f?"function"==typeof(a=o.style).setProperty?a.setProperty("display","none","important"):a.display="none":(s=p.stateNode,u=null!=(c=p.memoizedProps.style)&&c.hasOwnProperty("display")?c.display:null,s.style.display=_("display",u))}catch(v){Hi(t,t.return,v)}}}else if(6===p.tag){if(null===d)try{p.stateNode.nodeValue=f?"":p.memoizedProps}catch(v){Hi(t,t.return,v)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===t)&&null!==p.child){p.child.return=p,p=p.child
continue}if(p===t)break e
for(;null===p.sibling;){if(null===p.return||p.return===t)break e
d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break
case 19:oi(n,t),ai(t),4&i&&ii(t)
case 21:}}function ai(t){var n=t.flags
if(2&n){try{e:{for(var r=t.return;null!==r;){if(Xr(r)){var i=r
break e}r=r.return}throw Error(e(160))}switch(i.tag){case 5:var o=i.stateNode
32&i.flags&&(P(o,""),i.flags&=-33),ti(t,qr(t),o)
break
case 3:case 4:var l=i.stateNode.containerInfo
ei(t,qr(t),l)
break
default:throw Error(e(161))}}catch(a){Hi(t,t.return,a)}t.flags&=-3}4096&n&&(t.flags&=-4097)}function ui(e,t,n){Is=e,si(e)}function si(e,t,n){for(var r=!!(1&e.mode);null!==Is;){var i=Is,o=i.child
if(22===i.tag&&r){var l=null!==i.memoizedState||ws
if(!l){var a=i.alternate,u=null!==a&&null!==a.memoizedState||xs
a=ws
var s=xs
if(ws=l,(xs=u)&&!s)for(Is=i;null!==Is;)u=(l=Is).child,22===l.tag&&null!==l.memoizedState?di(i):null!==u?(u.return=l,Is=u):di(i)
for(;null!==o;)Is=o,si(o),o=o.sibling
Is=i,ws=a,xs=s}ci(e)}else 8772&i.subtreeFlags&&null!==o?(o.return=i,Is=o):ci(e)}}function ci(t){for(;null!==Is;){var n=Is
if(8772&n.flags){var r=n.alternate
try{if(8772&n.flags)switch(n.tag){case 0:case 11:case 15:xs||Jr(5,n)
break
case 1:var i=n.stateNode
if(4&n.flags&&!xs)if(null===r)i.componentDidMount()
else{var o=n.elementType===n.type?r.memoizedProps:ur(n.type,r.memoizedProps)
i.componentDidUpdate(o,r.memoizedState,i.B)}var l=n.updateQueue
null!==l&&gn(n,l,i)
break
case 3:var a=n.updateQueue
if(null!==a){if(r=null,null!==n.child)switch(n.child.tag){case 5:case 1:r=n.child.stateNode}gn(n,a,r)}break
case 5:var u=n.stateNode
if(null===r&&4&n.flags){r=u
var s=n.memoizedProps
switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&r.focus()
break
case"img":s.src&&(r.src=s.src)}}break
case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break
case 13:if(null===n.memoizedState){var c=n.alternate
if(null!==c){var f=c.memoizedState
if(null!==f){var d=f.dehydrated
null!==d&&ye(d)}}}break
default:throw Error(e(163))}xs||512&n.flags&&Kr(n)}catch(p){Hi(n,n.return,p)}}if(n===t){Is=null
break}if(null!==(r=n.sibling)){r.return=n.return,Is=r
break}Is=n.return}}function fi(e){for(;null!==Is;){var t=Is
if(t===e){Is=null
break}var n=t.sibling
if(null!==n){n.return=t.return,Is=n
break}Is=t.return}}function di(e){for(;null!==Is;){var t=Is
try{switch(t.tag){case 0:case 11:case 15:var n=t.return
try{Jr(4,t)}catch(u){Hi(t,n,u)}break
case 1:var r=t.stateNode
if("function"==typeof r.componentDidMount){var i=t.return
try{r.componentDidMount()}catch(u){Hi(t,i,u)}}var o=t.return
try{Kr(t)}catch(u){Hi(t,o,u)}break
case 5:var l=t.return
try{Kr(t)}catch(u){Hi(t,l,u)}}}catch(u){Hi(t,t.return,u)}if(t===e){Is=null
break}var a=t.sibling
if(null!==a){a.return=t.return,Is=a
break}Is=t.return}}function pi(){return 6&Fs?yl():-1!==tc?tc:tc=yl()}function hi(e){return 1&e.mode?2&Fs&&0!==Ps?Ps&-Ps:null!==Ru.transition?(0===nc&&(nc=ae()),nc):0!==(e=zl)?e:e=void 0===(e=window.event)?16:Me(e.type):1}function mi(t,n,r,i){if(50<qs)throw qs=0,ec=null,Error(e(185))
se(t,r,i),2&Fs&&t===js||(t===js&&(!(2&Fs)&&(Os|=r),4===Hs&&wi(t,Ps)),gi(t,i),1===r&&0===Fs&&!(1&n.mode)&&(Us=yl()+500,Mu&&$t()))}function gi(e,t){var n=e.callbackNode
!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-Cl(o),a=1<<l,u=i[l];-1===u?0!==(a&n)&&0===(a&r)||(i[l]=oe(a,t)):u<=t&&(e.expiredLanes|=a),o&=~a}}(e,t)
var r=ie(e,e===js?Ps:0)
if(0===r)null!==n&&gl(n),e.callbackNode=null,e.callbackPriority=0
else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&gl(n),1===t)0===e.tag?function(e){Mu=!0,_t(e)}(xi.bind(null,e)):_t(xi.bind(null,e)),su(function(){!(6&Fs)&&$t()}),n=null
else{switch(fe(r)){case 1:n=xl
break
case 4:n=kl
break
case 16:default:n=Il
break
case 536870912:n=Sl}n=Ni(n,vi.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function vi(t,n){if(tc=-1,nc=0,6&Fs)throw Error(e(327))
var r=t.callbackNode
if(_i()&&t.callbackNode!==r)return null
var i=ie(t,t===js?Ps:0)
if(0===i)return null
if(30&i||0!==(i&t.expiredLanes)||n)n=Ai(t,i)
else{n=i
var o=Fs
Fs|=2
var l=Ti()
for(js===t&&Ps===n||(Gs=null,Us=yl()+500,Si(t,n));;){try{Fi()
break}catch(u){Ei(t,u)}1}en(),Cs.current=l,Fs=o,null!==zs?n=0:(js=null,Ps=0,n=Hs)}if(0!==n){if(2===n&&0!==(o=le(t))&&(i=o,n=bi(t,o)),1===n)throw r=Ls,Si(t,0),wi(t,i),gi(t,yl()),r
if(6===n)wi(t,i)
else{if(o=t.current.alternate,!(30&i||function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue
if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot
i=i.value
try{if(!ja(o(),i))return!1}catch(a){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n
else{if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return!0
t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(o)||(n=Ai(t,i),2===n&&(l=le(t),0!==l&&(i=l,n=bi(t,l))),1!==n)))throw r=Ls,Si(t,0),wi(t,i),gi(t,yl()),r
switch(t.finishedWork=o,t.finishedLanes=i,n){case 0:case 1:throw Error(e(345))
case 2:case 5:Pi(t,Zs,Gs)
break
case 3:if(wi(t,i),(130023424&i)===i&&10<(n=Bs+500-yl())){if(0!==ie(t,0))break
if(((o=t.suspendedLanes)&i)!==i){pi(),t.pingedLanes|=t.suspendedLanes&o
break}t.timeoutHandle=lu(Pi.bind(null,t,Zs,Gs),n)
break}Pi(t,Zs,Gs)
break
case 4:if(wi(t,i),(4194240&i)===i)break
for(n=t.eventTimes,o=-1;0<i;){var a=31-Cl(i)
l=1<<a,(a=n[a])>o&&(o=a),i&=~l}if(i=o,10<(i=(120>(i=yl()-i)?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Ts(i/1960))-i)){t.timeoutHandle=lu(Pi.bind(null,t,Zs,Gs),i)
break}Pi(t,Zs,Gs)
break
default:throw Error(e(329))}}}return gi(t,yl()),t.callbackNode===r?vi.bind(null,t):null}function bi(e,t){var n=Ns
return e.current.memoizedState.isDehydrated&&(Si(e,t).flags|=256),2!==(e=Ai(e,t))&&(t=Zs,Zs=n,null!==t&&yi(t)),e}function yi(e){null===Zs?Zs=e:Zs.push.apply(Zs,e)}function wi(e,t){for(t&=~Ws,t&=~Os,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Cl(t),r=1<<n
e[n]=-1,t&=~r}}function xi(t){if(6&Fs)throw Error(e(327))
_i()
var n=ie(t,0)
if(!(1&n))return gi(t,yl()),null
var r=Ai(t,n)
if(0!==t.tag&&2===r){var i=le(t)
0!==i&&(n=i,r=bi(t,i))}if(1===r)throw r=Ls,Si(t,0),wi(t,n),gi(t,yl()),r
if(6===r)throw Error(e(345))
return t.finishedWork=t.current.alternate,t.finishedLanes=n,Pi(t,Zs,Gs),gi(t,yl()),null}function ki(e,t){var n=Fs
Fs|=1
try{return e(t)}finally{0===(Fs=n)&&(Us=yl()+500,Mu&&$t())}}function Ii(e){null!==Qs&&0===Qs.tag&&!(6&Fs)&&_i()
var t=Fs
Fs|=1
var n=Ds.transition,r=zl
try{if(Ds.transition=null,zl=1,e)return e()}finally{zl=r,Ds.transition=n,!(6&(Fs=t))&&$t()}}function Mi(){_s=$s.current,Et($s)}function Si(e,t){e.finishedWork=null,e.finishedLanes=0
var n=e.timeoutHandle
if(-1!==n&&(e.timeoutHandle=-1,au(n)),null!==zs)for(n=zs.return;null!==n;){var r=n
switch(Ot(r),r.tag){case 1:null!=(r=r.type.childContextTypes)&&Dt()
break
case 3:yn(),Et(xu),Et(wu),In()
break
case 5:xn(r)
break
case 4:yn()
break
case 13:case 19:Et(Xu)
break
case 10:tn(r.type.S)
break
case 22:case 23:Mi()}n=n.return}if(js=e,zs=e=Gi(e.current,null),Ps=_s=t,Hs=0,Ls=null,Ws=Os=Rs=0,Zs=Ns=null,null!==Gu){for(t=0;t<Gu.length;t++)if(null!==(r=(n=Gu[t]).interleaved)){n.interleaved=null
var i=r.next,o=n.pending
if(null!==o){var l=o.next
o.next=i,r.next=l}n.pending=r}Gu=null}return e}function Ei(t,n){for(;;){var r=zs
try{if(en(),es.current=cs,ls){for(var i=rs.memoizedState;null!==i;){var o=i.queue
null!==o&&(o.pending=null),i=i.next}ls=!1}if(ns=0,os=is=rs=null,as=!1,us=0,As.current=null,null===r||null===r.return){Hs=1,Ls=n,zs=null
break}e:{var l=t,a=r.return,u=r,s=n
if(n=Ps,u.flags|=32768,null!==s&&"object"==typeof s&&"function"==typeof s.then){var c=s,f=u,d=f.tag
if(!(1&f.mode||0!==d&&11!==d&&15!==d)){var p=f.alternate
p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var h=wr(a)
if(null!==h){h.flags&=-257,xr(h,a,u,0,n),1&h.mode&&yr(l,c,n),s=c
var m=(n=h).updateQueue
if(null===m){var g=new Set
g.add(s),n.updateQueue=g}else m.add(s)
break e}if(!(1&n)){yr(l,c,n),Ci()
break e}s=Error(e(426))}else if(Hu&&1&u.mode){var v=wr(a)
if(null!==v){!(65536&v.flags)&&(v.flags|=256),xr(v,a,u,0,n),Jt(hr(s,u))
break e}}l=s=hr(s,u),4!==Hs&&(Hs=2),null===Ns?Ns=[l]:Ns.push(l),l=a
do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n,hn(l,vr(0,s,n))
break e
case 1:u=s
var b=l.type,y=l.stateNode
if(!(128&l.flags||"function"!=typeof b.getDerivedStateFromError&&(null===y||"function"!=typeof y.componentDidCatch||null!==Js&&Js.has(y)))){l.flags|=65536,n&=-n,l.lanes|=n,hn(l,br(l,u,n))
break e}}l=l.return}while(null!==l)}zi(r)}catch(w){n=w,zs===r&&null!==r&&(zs=r=r.return)
continue}break}}function Ti(){var e=Cs.current
return Cs.current=cs,null===e?cs:e}function Ci(){0!==Hs&&3!==Hs&&2!==Hs||(Hs=4),null===js||!(268435455&Rs)&&!(268435455&Os)||wi(js,Ps)}function Ai(t,n){var r=Fs
Fs|=2
var i=Ti()
for(js===t&&Ps===n||(Gs=null,Si(t,n));;){try{Di()
break}catch(o){Ei(t,o)}1}if(en(),Fs=r,Cs.current=i,null!==zs)throw Error(e(261))
return js=null,Ps=0,Hs}function Di(){for(;null!==zs;)ji(zs)}function Fi(){for(;null!==zs&&!vl();)ji(zs)}function ji(e){var t=ys(e.alternate,e,_s)
e.memoizedProps=e.pendingProps,null===t?zi(e):zs=t,As.current=null}function zi(e){var t=e
do{var n=t.alternate
if(e=t.return,32768&t.flags){if(null!==(n=Ur(n,t)))return n.flags&=32767,zs=n,void 0
if(null===e)return Hs=6,zs=null,void 0
e.flags|=32768,e.subtreeFlags=0,e.deletions=null}else if(null!==(n=Br(n,t,_s)))return zs=n,void 0
if(null!==(t=t.sibling))return zs=t,void 0
zs=t=e}while(null!==t)
0===Hs&&(Hs=5)}function Pi(t,n,r){var i=zl,o=Ds.transition
try{Ds.transition=null,zl=1,function(t,n,r,i){do{_i()}while(null!==Qs)
if(6&Fs)throw Error(e(327))
r=t.finishedWork
var o=t.finishedLanes
if(null===r)return null
if(t.finishedWork=null,t.finishedLanes=0,r===t.current)throw Error(e(177))
t.callbackNode=null,t.callbackPriority=0
var l=r.lanes|r.childLanes
if(function(e,t){var n=e.pendingLanes&~t
e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements
var r=e.eventTimes
for(e=e.expirationTimes;0<n;){var i=31-Cl(n),o=1<<i
t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}(t,l),t===js&&(zs=js=null,Ps=0),!(2064&r.subtreeFlags)&&!(2064&r.flags)||Ks||(Ks=!0,Ni(Il,function(){return _i(),null})),l=!!(15990&r.flags),15990&r.subtreeFlags||l){l=Ds.transition,Ds.transition=null
var a=zl
zl=1
var u=Fs
Fs|=4,As.current=null,function(t,n){if(iu=Bl,Ke(t=Je())){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd}
else{var i=(r=(r=t.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection()
if(i&&0!==i.rangeCount){r=i.anchorNode
var o=i.anchorOffset,l=i.focusNode
i=i.focusOffset
var a=0,u=-1,s=-1,c=0,f=0,d=t,p=null
e:for(;;){for(var h;d!==r||0!==o&&3!==d.nodeType||(u=a+o),d!==l||0!==i&&3!==d.nodeType||(s=a+i),3===d.nodeType&&(a+=d.nodeValue.length),null!==(h=d.firstChild);)p=d,d=h
for(;;){if(d===t)break e
if(p===r&&++c===o&&(u=a),p===l&&++f===i&&(s=a),null!==(h=d.nextSibling))break
p=(d=p).parentNode}d=h}r=-1===u||-1===s?null:{start:u,end:s}}else r=null}r=r||{start:0,end:0}}else r=null
for(ou={focusedElem:t,selectionRange:r},Bl=!1,Is=n;null!==Is;)if(t=(n=Is).child,1028&n.subtreeFlags&&null!==t)t.return=n,Is=t
else for(;null!==Is;){n=Is
try{var m=n.alternate
if(1024&n.flags)switch(n.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break
case 1:if(null!==m){var g=m.memoizedProps,v=m.memoizedState,b=n.stateNode,y=b.getSnapshotBeforeUpdate(n.elementType===n.type?g:ur(n.type,g),v)
b.B=y}break
case 3:var w=n.stateNode.containerInfo
1===w.nodeType?w.textContent="":9===w.nodeType&&w.documentElement&&w.removeChild(w.documentElement)
break
default:throw Error(e(163))}}catch(x){Hi(n,n.return,x)}if(null!==(t=n.sibling)){t.return=n.return,Is=t
break}Is=n.return}m=Ms,Ms=!1}(t,r),li(r,t),Qe(ou),Bl=!!iu,ou=iu=null,t.current=r,ui(r),bl(),Fs=u,zl=a,Ds.transition=l}else t.current=r
if(Ks&&(Ks=!1,Qs=t,Xs=o),0===(l=t.pendingLanes)&&(Js=null),function(e){if(Tl&&"function"==typeof Tl.onCommitFiberRoot)try{Tl.onCommitFiberRoot(El,e,void 0,!(128&~e.current.flags))}catch(n){}}(r.stateNode),gi(t,yl()),null!==n)for(i=t.onRecoverableError,r=0;r<n.length;r++)i((o=n[r]).value,{componentStack:o.stack,digest:o.digest})
if(Vs)throw Vs=!1,t=Ys,Ys=null,t
return!!(1&Xs)&&0!==t.tag&&_i(),1&(l=t.pendingLanes)?t===ec?qs++:(qs=0,ec=t):qs=0,$t(),null}(t,n,r,i)}finally{Ds.transition=o,zl=i}return null}function _i(){if(null!==Qs){var t=fe(Xs),n=Ds.transition,r=zl
try{if(Ds.transition=null,zl=16>t?16:t,null===Qs)var i=!1
else{if(t=Qs,Qs=null,Xs=0,6&Fs)throw Error(e(331))
var o=Fs
for(Fs|=4,Is=t.current;null!==Is;){var l=Is,a=l.child
if(16&Is.flags){var u=l.deletions
if(null!==u){for(var s=0;s<u.length;s++){var c=u[s]
for(Is=c;null!==Is;){var f=Is
switch(f.tag){case 0:case 11:case 15:Yr(8,f,l)}var d=f.child
if(null!==d)d.return=f,Is=d
else for(;null!==Is;){var p=(f=Is).sibling,h=f.return
if(Qr(f),f===c){Is=null
break}if(null!==p){p.return=h,Is=p
break}Is=h}}}var m=l.alternate
if(null!==m){var g=m.child
if(null!==g){m.child=null
do{var v=g.sibling
g.sibling=null,g=v}while(null!==g)}}Is=l}}if(2064&l.subtreeFlags&&null!==a)a.return=l,Is=a
else e:for(;null!==Is;){if(2048&(l=Is).flags)switch(l.tag){case 0:case 11:case 15:Yr(9,l,l.return)}var b=l.sibling
if(null!==b){b.return=l.return,Is=b
break e}Is=l.return}}var y=t.current
for(Is=y;null!==Is;){var w=(a=Is).child
if(2064&a.subtreeFlags&&null!==w)w.return=a,Is=w
else e:for(a=y;null!==Is;){if(2048&(u=Is).flags)try{switch(u.tag){case 0:case 11:case 15:Jr(9,u)}}catch(k){Hi(u,u.return,k)}if(u===a){Is=null
break e}var x=u.sibling
if(null!==x){x.return=u.return,Is=x
break e}Is=u.return}}if(Fs=o,$t(),Tl&&"function"==typeof Tl.onPostCommitFiberRoot)try{Tl.onPostCommitFiberRoot(El,t)}catch(k){}i=!0}return i}finally{zl=r,Ds.transition=n}}return!1}function $i(e,t,n){e=dn(e,t=vr(0,t=hr(n,t),1),1),t=pi(),null!==e&&(se(e,1,t),gi(e,t))}function Hi(e,t,n){if(3===e.tag)$i(e,e,n)
else for(;null!==t;){if(3===t.tag){$i(t,e,n)
break}if(1===t.tag){var r=t.stateNode
if("function"==typeof t.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Js||!Js.has(r))){t=dn(t,e=br(t,e=hr(n,e),1),1),e=pi(),null!==t&&(se(t,1,e),gi(t,e))
break}}t=t.return}}function Li(e,t,n){var r=e.pingCache
null!==r&&r.delete(t),t=pi(),e.pingedLanes|=e.suspendedLanes&n,js===e&&(Ps&n)===n&&(4===Hs||3===Hs&&(130023424&Ps)===Ps&&500>yl()-Bs?Si(e,0):Ws|=n),gi(e,t)}function Ri(e,t){0===t&&(1&e.mode?(t=jl,!(130023424&(jl<<=1))&&(jl=4194304)):t=1)
var n=pi()
null!==(e=un(e,t))&&(se(e,t,n),gi(e,n))}function Oi(e){var t=e.memoizedState,n=0
null!==t&&(n=t.retryLane),Ri(e,n)}function Wi(t,n){var r=0
switch(t.tag){case 13:var i=t.stateNode,o=t.memoizedState
null!==o&&(r=o.retryLane)
break
case 19:i=t.stateNode
break
default:throw Error(e(314))}null!==i&&i.delete(n),Ri(t,r)}function Ni(e,t){return ml(e,t)}function Zi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bi(e,t,n,r){return new Zi(e,t,n,r)}function Ui(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Gi(e,t){var n=e.alternate
return null===n?((n=Bi(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Vi(t,n,r,i,o,l){var a=2
if(i=t,"function"==typeof t)Ui(t)&&(a=1)
else if("string"==typeof t)a=5
else e:switch(t){case Do:return Yi(r.children,o,l,n)
case Fo:a=8,o|=8
break
case jo:return(t=Bi(12,r,n,2|o)).elementType=jo,t.lanes=l,t
case $o:return(t=Bi(13,r,n,o)).elementType=$o,t.lanes=l,t
case Ho:return(t=Bi(19,r,n,o)).elementType=Ho,t.lanes=l,t
case Oo:return Ji(r,o,l,n)
default:if("object"==typeof t&&null!==t)switch(t.$$typeof){case zo:a=10
break e
case Po:a=9
break e
case _o:a=11
break e
case Lo:a=14
break e
case Ro:a=16,i=null
break e}throw Error(e(130,null==t?t:typeof t,""))}return(n=Bi(a,r,n,o)).elementType=t,n.type=i,n.lanes=l,n}function Yi(e,t,n,r){return(e=Bi(7,e,r,t)).lanes=n,e}function Ji(e,t,n,r){return(e=Bi(22,e,r,t)).elementType=Oo,e.lanes=n,e.stateNode={isHidden:!1},e}function Ki(e,t,n){return(e=Bi(6,e,null,t)).lanes=n,e}function Qi(e,t,n){return(t=Bi(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Xi(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ue(0),this.expirationTimes=ue(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ue(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function qi(e,t,n,r,i,o,l,a,u){return e=new Xi(e,t,n,a,u),1===t?(t=1,!0===o&&(t|=8)):t=0,o=Bi(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},sn(o),e}function eo(t){if(!t)return yu
e:{if(X(t=t.W)!==t||1!==t.tag)throw Error(e(170))
var n=t
do{switch(n.tag){case 3:n=n.stateNode.context
break e
case 1:if(At(n.type)){n=n.stateNode.L
break e}}n=n.return}while(null!==n)
throw Error(e(171))}if(1===t.tag){var r=t.type
if(At(r))return jt(t,r,n)}return n}function to(e,t,n,r,i,o,l,a,u){return(e=qi(n,r,!0,e,0,o,0,a,u)).context=eo(null),n=e.current,(o=fn(r=pi(),i=hi(n))).callback=null!=t?t:null,dn(n,o,i),e.current.lanes=i,se(e,i,r),gi(e,r),e}function no(e,t,n,r){var i=t.current,o=pi(),l=hi(i)
return n=eo(n),null===t.context?t.context=n:t.pendingContext=n,(t=fn(o,l)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=dn(i,t,l))&&(mi(e,i,l,o),pn(e,i,l)),l}function ro(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function io(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane
e.retryLane=0!==n&&n<t?n:t}}function oo(e,t){io(e,t),(e=e.alternate)&&io(e,t)}function lo(e){this.U=e}function ao(e){this.U=e}function uo(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function so(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function co(){}function fo(e,t,n,r,i){var o=n.Z
if(o){var l=o
if("function"==typeof i){var a=i
i=function(){var e=ro(l)
a.call(e)}}no(t,l,e,i)}else l=function(e,t,n,r,i){if(i){if("function"==typeof r){var o=r
r=function(){var e=ro(l)
o.call(e)}}var l=to(t,r,e,0,null,!1,0,"",co)
return e.Z=l,e[pu]=l.current,lt(8===e.nodeType?e.parentNode:e),Ii(),l}for(;i=e.lastChild;)e.removeChild(i)
if("function"==typeof r){var a=r
r=function(){var e=ro(u)
a.call(e)}}var u=qi(e,0,!1,null,0,!1,0,"",co)
return e.Z=u,e[pu]=u.current,lt(8===e.nodeType?e.parentNode:e),Ii(function(){no(t,u,n,r)}),u}(n,t,e,i,r)
return ro(l)}if(z)return L
z=1
var po=n(),ho=function(){return j||(j=1,R.exports=function(){return F||(F=1,function(e){function t(e,t){var n=e.length
e.push(t)
e:for(;0<n;){var r=n-1>>>1,o=e[r]
if(!(0<i(o,t)))break e
e[r]=t,e[n]=o,n=r}}function n(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null
var t=e[0],n=e.pop()
if(n!==t){e[0]=n
e:for(var r=0,o=e.length,l=o>>>1;r<l;){var a=2*(r+1)-1,u=e[a],s=a+1,c=e[s]
if(0>i(u,n))s<o&&0>i(c,u)?(e[r]=c,e[s]=n,r=s):(e[r]=u,e[a]=n,r=a)
else{if(!(s<o&&0>i(c,n)))break e
e[r]=c,e[s]=n,r=s}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex
return 0!==n?n:e.id-t.id}function o(e){for(var i=n(g);null!==i;){if(null===i.callback)r(g)
else{if(!(i.startTime<=e))break
r(g),i.sortIndex=i.expirationTime,t(m,i)}i=n(g)}}function l(e){if(k=!1,o(e),!x)if(null!==n(m))x=!0,c(a)
else{var t=n(g)
null!==t&&f(l,t.startTime-e)}}function a(t,i){x=!1,k&&(k=!1,M(A),A=-1),w=!0
var a=y
try{for(o(i),b=n(m);null!==b&&(!(b.expirationTime>i)||t&&!u());){var s=b.callback
if("function"==typeof s){b.callback=null,y=b.priorityLevel
var c=s(b.expirationTime<=i)
i=e.unstable_now(),"function"==typeof c?b.callback=c:b===n(m)&&r(m),o(i)}else r(m)
b=n(m)}if(null!==b)var d=!0
else{var p=n(g)
null!==p&&f(l,p.startTime-i),d=!1}return d}finally{b=null,y=a,w=!1}}function u(){return!(e.unstable_now()-F<D)}function s(){if(null!==C){var t=e.unstable_now()
F=t
var n=!0
try{n=C(!0,t)}finally{n?E():(T=!1,C=null)}}else T=!1}function c(e){C=e,T||(T=!0,E())}function f(t,n){A=I(function(){t(e.unstable_now())},n)}if("object"==typeof performance&&"function"==typeof performance.now){var d=performance
e.unstable_now=function(){return d.now()}}else{var p=Date,h=p.now()
e.unstable_now=function(){return p.now()-h}}var m=[],g=[],v=1,b=null,y=3,w=!1,x=!1,k=!1,I="function"==typeof setTimeout?setTimeout:null,M="function"==typeof clearTimeout?clearTimeout:null,S="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var E,T=!1,C=null,A=-1,D=5,F=-1
if("function"==typeof S)E=function(){S(s)}
else if("undefined"!=typeof MessageChannel){var j=new MessageChannel,z=j.port2
j.port1.onmessage=s,E=function(){z.postMessage(null)}}else E=function(){I(s,0)}
e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){x||w||(x=!0,c(a))},e.unstable_forceFrameRate=function(e){0>e||125<e?void 0:D=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(m)},e.unstable_next=function(e){switch(y){case 1:case 2:case 3:var t=3
break
default:t=y}var n=y
y=t
try{return e()}finally{y=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break
default:e=3}var n=y
y=e
try{return t()}finally{y=n}},e.unstable_scheduleCallback=function(r,i,o){var u=e.unstable_now()
switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?u+o:u,r){case 1:var s=-1
break
case 2:s=250
break
case 5:s=1073741823
break
case 4:s=1e4
break
default:s=5e3}return r={id:v++,callback:i,priorityLevel:r,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>u?(r.sortIndex=o,t(g,r),null===n(m)&&r===n(g)&&(k?(M(A),A=-1):k=!0,f(l,o-u))):(r.sortIndex=s,t(m,r),x||w||(x=!0,c(a))),r},e.unstable_shouldYield=u,e.unstable_wrapCallback=function(e){var t=y
return function(){var n=y
y=t
try{return e.apply(this,arguments)}finally{y=n}}}}(O)),O}()),R.exports}(),mo=new Set,go={},vo=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),bo=Object.prototype.hasOwnProperty,yo=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,wo={},xo={},ko={}
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ko[e]=new i(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0]
ko[t]=new i(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ko[e]=new i(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ko[e]=new i(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ko[e]=new i(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ko[e]=new i(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ko[e]=new i(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ko[e]=new i(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ko[e]=new i(e,5,!1,e.toLowerCase(),null,!1,!1)})
var Io=/[\-:]([a-z])/g
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Io,o)
ko[t]=new i(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Io,o)
ko[t]=new i(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Io,o)
ko[t]=new i(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ko[e]=new i(e,1,!1,e.toLowerCase(),null,!1,!1)}),ko.xlinkHref=new i("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ko[e]=new i(e,1,!1,e.toLowerCase(),null,!0,!0)})
var Mo,So,Eo,To=po.h,Co=Symbol.for("react.element"),Ao=Symbol.for("react.portal"),Do=Symbol.for("react.fragment"),Fo=Symbol.for("react.strict_mode"),jo=Symbol.for("react.profiler"),zo=Symbol.for("react.provider"),Po=Symbol.for("react.context"),_o=Symbol.for("react.forward_ref"),$o=Symbol.for("react.suspense"),Ho=Symbol.for("react.suspense_list"),Lo=Symbol.for("react.memo"),Ro=Symbol.for("react.lazy"),Oo=Symbol.for("react.offscreen"),Wo=Symbol.iterator,No=Object.assign,Zo=!1,Bo=Array.isArray,Uo=(Eo=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t
else{for((So=So||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=So.firstChild;e.firstChild;)e.removeChild(e.firstChild)
for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction(function(){return Eo(e,t)})}:Eo),Go={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vo=["Webkit","ms","Moz","O"]
Object.keys(Go).forEach(function(e){Vo.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Go[t]=Go[e]})})
var Yo=No({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),Jo=null,Ko=null,Qo=null,Xo=null,qo=!1,el=!1
if(vo)try{var tl={}
Object.defineProperty(tl,"passive",{get:function(){el=!0}}),window.addEventListener("test",tl,tl),window.removeEventListener("test",tl,tl)}catch(Eo){el=!1}var nl,rl,il,ol,ll,al,ul,sl,cl=!1,fl=null,dl=!1,pl=null,hl={onError:function(e){cl=!0,fl=e}},ml=ho.unstable_scheduleCallback,gl=ho.unstable_cancelCallback,vl=ho.unstable_shouldYield,bl=ho.unstable_requestPaint,yl=ho.unstable_now,wl=ho.unstable_getCurrentPriorityLevel,xl=ho.unstable_ImmediatePriority,kl=ho.unstable_UserBlockingPriority,Il=ho.unstable_NormalPriority,Ml=ho.unstable_LowPriority,Sl=ho.unstable_IdlePriority,El=null,Tl=null,Cl=Math.clz32?Math.clz32:function(e){return 0==(e>>>=0)?32:31-(Al(e)/Dl|0)|0},Al=Math.log,Dl=Math.LN2,Fl=64,jl=4194304,zl=0,Pl=!1,_l=[],$l=null,Hl=null,Ll=null,Rl=new Map,Ol=new Map,Wl=[],Nl="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),Zl=To.ReactCurrentBatchConfig,Bl=!0,Ul=null,Gl=null,Vl=null,Yl=null,Jl={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kl=Ae(Jl),Ql=No({},Jl,{view:0,detail:0}),Xl=Ae(Ql),ql=No({},Ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==sl&&(sl&&"mousemove"===e.type?(al=e.screenX-sl.screenX,ul=e.screenY-sl.screenY):ul=al=0,sl=e),al)},movementY:function(e){return"movementY"in e?e.movementY:ul}}),ea=Ae(ql),ta=Ae(No({},ql,{dataTransfer:0})),na=Ae(No({},Ql,{relatedTarget:0})),ra=Ae(No({},Jl,{animationName:0,elapsedTime:0,pseudoElement:0})),ia=No({},Jl,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),oa=Ae(ia),la=Ae(No({},Jl,{data:0})),aa={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ua={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sa={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},ca=No({},Ql,{key:function(e){if(e.key){var t=aa[e.key]||e.key
if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Ee(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?ua[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(e){return"keypress"===e.type?Ee(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Ee(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),fa=Ae(ca),da=Ae(No({},ql,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),pa=Ae(No({},Ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fe})),ha=Ae(No({},Jl,{propertyName:0,elapsedTime:0,pseudoElement:0})),ma=No({},ql,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ga=Ae(ma),va=[9,13,27,32],ba=vo&&"CompositionEvent"in window,ya=null
vo&&"documentMode"in document&&(ya=document.documentMode)
var wa=vo&&"TextEvent"in window&&!ya,xa=vo&&(!ba||ya&&8<ya&&11>=ya),ka=String.fromCharCode(32),Ia=!1,Ma=!1,Sa={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},Ea=null,Ta=null,Ca=!1
if(vo){var Aa
if(vo){var Da="oninput"in document
if(!Da){var Fa=document.createElement("div")
Fa.setAttribute("oninput","return;"),Da="function"==typeof Fa.oninput}Aa=Da}else Aa=!1
Ca=Aa&&(!document.documentMode||9<document.documentMode)}var ja="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},za=vo&&"documentMode"in document&&11>=document.documentMode,Pa=null,_a=null,$a=null,Ha=!1,La={animationend:qe("Animation","AnimationEnd"),animationiteration:qe("Animation","AnimationIteration"),animationstart:qe("Animation","AnimationStart"),transitionend:qe("Transition","TransitionEnd")},Ra={},Oa={}
vo&&(Oa=document.createElement("div").style,"AnimationEvent"in window||(delete La.animationend.animation,delete La.animationiteration.animation,delete La.animationstart.animation),"TransitionEvent"in window||delete La.transitionend.transition)
for(var Wa=et("animationend"),Na=et("animationiteration"),Za=et("animationstart"),Ba=et("transitionend"),Ua=new Map,Ga="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" "),Va=0;Va<Ga.length;Va++){var Ya=Ga[Va]
tt(Ya.toLowerCase(),"on"+(Ya[0].toUpperCase()+Ya.slice(1)))}tt(Wa,"onAnimationEnd"),tt(Na,"onAnimationIteration"),tt(Za,"onAnimationStart"),tt("dblclick","onDoubleClick"),tt("focusin","onFocus"),tt("focusout","onBlur"),tt(Ba,"onTransitionEnd"),r("onMouseEnter",["mouseout","mouseover"]),r("onMouseLeave",["mouseout","mouseover"]),r("onPointerEnter",["pointerout","pointerover"]),r("onPointerLeave",["pointerout","pointerover"]),t("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),t("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),t("onBeforeInput",["compositionend","keypress","textInput","paste"]),t("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),t("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),t("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "))
var Ja,Ka,Qa,Xa,qa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eu=new Set("cancel close invalid load scroll toggle".split(" ").concat(qa)),tu="_reactListening"+Math.random().toString(36).slice(2),nu=/\r\n?/g,ru=/\u0000|\uFFFD/g,iu=null,ou=null,lu="function"==typeof setTimeout?setTimeout:void 0,au="function"==typeof clearTimeout?clearTimeout:void 0,uu="function"==typeof Promise?Promise:void 0,su="function"==typeof queueMicrotask?queueMicrotask:void 0!==uu?function(e){return uu.resolve(null).then(e).catch(vt)}:lu,cu=Math.random().toString(36).slice(2),fu="__reactFiber$"+cu,du="__reactProps$"+cu,pu="__reactContainer$"+cu,hu="__reactEvents$"+cu,mu="__reactListeners$"+cu,gu="__reactHandles$"+cu,vu=[],bu=-1,yu={},wu=St(yu),xu=St(!1),ku=yu,Iu=null,Mu=!1,Su=!1,Eu=[],Tu=0,Cu=null,Au=0,Du=[],Fu=0,ju=null,zu=1,Pu="",_u=null,$u=null,Hu=!1,Lu=null,Ru=To.ReactCurrentBatchConfig,Ou=qt(!0),Wu=qt(!1),Nu=St(null),Zu=null,Bu=null,Uu=null,Gu=null,Vu=!1,Yu={},Ju=St(Yu),Ku=St(Yu),Qu=St(Yu),Xu=St(0),qu=[],es=To.ReactCurrentDispatcher,ts=To.ReactCurrentBatchConfig,ns=0,rs=null,is=null,os=null,ls=!1,as=!1,us=0,ss=0,cs={readContext:on,useCallback:Mn,useContext:Mn,useEffect:Mn,useImperativeHandle:Mn,useInsertionEffect:Mn,useLayoutEffect:Mn,useMemo:Mn,useReducer:Mn,useRef:Mn,useState:Mn,useDebugValue:Mn,useDeferredValue:Mn,useTransition:Mn,useMutableSource:Mn,useSyncExternalStore:Mn,useId:Mn,unstable_isNewReconciler:!1},fs={readContext:on,useCallback:function(e,t){return Cn().memoizedState=[e,void 0===t?null:t],e},useContext:on,useEffect:Un,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,Zn(4194308,4,Jn.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Zn(4194308,4,e,t)},useInsertionEffect:function(e,t){return Zn(4,2,e,t)},useMemo:function(e,t){var n=Cn()
return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Cn()
return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=rr.bind(null,rs,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},Cn().memoizedState=e},useState:On,useDebugValue:Qn,useDeferredValue:function(e){return Cn().memoizedState=e},useTransition:function(){var e=On(!1),t=e[0]
return e=tr.bind(null,e[1]),Cn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(t,n,r){var i=rs,o=Cn()
if(Hu){if(void 0===r)throw Error(e(407))
r=r()}else{if(r=n(),null===js)throw Error(e(349))
30&ns||_n(i,n,r)}o.memoizedState=r
var l={value:r,getSnapshot:n}
return o.queue=l,Un(Hn.bind(null,i,l,t),[t]),i.flags|=2048,Wn(9,$n.bind(null,i,l,r,n),void 0,null),r},useId:function(){var e=Cn(),t=js.identifierPrefix
if(Hu){var n=Pu
t=":"+t+"R"+(n=(zu&~(1<<32-Cl(zu)-1)).toString(32)+n),0<(n=us++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=ss++).toString(32)+":"
return e.memoizedState=t},unstable_isNewReconciler:!1},ds={readContext:on,useCallback:Xn,useContext:on,useEffect:Gn,useImperativeHandle:Kn,useInsertionEffect:Vn,useLayoutEffect:Yn,useMemo:qn,useReducer:Fn,useRef:Nn,useState:function(){return Fn(Dn)},useDebugValue:Qn,useDeferredValue:function(e){return er(An(),is.memoizedState,e)},useTransition:function(){return[Fn(Dn)[0],An().memoizedState]},useMutableSource:zn,useSyncExternalStore:Pn,useId:nr,unstable_isNewReconciler:!1},ps={readContext:on,useCallback:Xn,useContext:on,useEffect:Gn,useImperativeHandle:Kn,useInsertionEffect:Vn,useLayoutEffect:Yn,useMemo:qn,useReducer:jn,useRef:Nn,useState:function(){return jn(Dn)},useDebugValue:Qn,useDeferredValue:function(e){var t=An()
return null===is?t.memoizedState=e:er(t,is.memoizedState,e)},useTransition:function(){return[jn(Dn)[0],An().memoizedState]},useMutableSource:zn,useSyncExternalStore:Pn,useId:nr,unstable_isNewReconciler:!1},hs={isMounted:function(e){return!!(e=e.W)&&X(e)===e},enqueueSetState:function(e,t,n){e=e.W
var r=pi(),i=hi(e),o=fn(r,i)
o.payload=t,null!=n&&(o.callback=n),null!==(t=dn(e,o,i))&&(mi(t,e,i,r),pn(t,e,i))},enqueueReplaceState:function(e,t,n){e=e.W
var r=pi(),i=hi(e),o=fn(r,i)
o.tag=1,o.payload=t,null!=n&&(o.callback=n),null!==(t=dn(e,o,i))&&(mi(t,e,i,r),pn(t,e,i))},enqueueForceUpdate:function(e,t){e=e.W
var n=pi(),r=hi(e),i=fn(n,r)
i.tag=2,null!=t&&(i.callback=t),null!==(t=dn(e,i,r))&&(mi(t,e,r,n),pn(t,e,r))}},ms="function"==typeof WeakMap?WeakMap:Map,gs=To.ReactCurrentOwner,vs=!1,bs={dehydrated:null,treeContext:null,retryLane:0}
Ja=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode)
else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child
continue}if(n===t)break
for(;null===n.sibling;){if(null===n.return||n.return===t)return
n=n.return}n.sibling.return=n.return,n=n.sibling}},Ka=function(){},Qa=function(e,t,n,r){var i=e.memoizedProps
if(i!==r){e=t.stateNode,vn(Ju.current)
var o,l=null
switch(n){case"input":i=b(e,i),r=b(e,r),l=[]
break
case"select":i=No({},i,{value:void 0}),r=No({},r,{value:void 0}),l=[]
break
case"textarea":i=S(e,i),r=S(e,r),l=[]
break
default:"function"!=typeof i.onClick&&"function"==typeof r.onClick&&(e.onclick=mt)}for(s in H(n,r),n=null,i)if(!r.hasOwnProperty(s)&&i.hasOwnProperty(s)&&null!=i[s])if("style"===s){var a=i[s]
for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==s&&"children"!==s&&"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&"autoFocus"!==s&&(go.hasOwnProperty(s)?l||(l=[]):(l=l||[]).push(s,null))
for(s in r){var u=r[s]
if(a=null!=i?i[s]:void 0,r.hasOwnProperty(s)&&u!==a&&(null!=u||null!=a))if("style"===s)if(a){for(o in a)!a.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="")
for(o in u)u.hasOwnProperty(o)&&a[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(l||(l=[]),l.push(s,n)),n=u
else"dangerouslySetInnerHTML"===s?(u=u?u.j:void 0,a=a?a.j:void 0,null!=u&&a!==u&&(l=l||[]).push(s,u)):"children"===s?"string"!=typeof u&&"number"!=typeof u||(l=l||[]).push(s,""+u):"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&(go.hasOwnProperty(s)?(null!=u&&"onScroll"===s&&it("scroll",e),l||a===u||(l=[])):(l=l||[]).push(s,u))}n&&(l=l||[]).push("style",n)
var s=l;(t.updateQueue=s)&&(t.flags|=4)}},Xa=function(e,t,n,r){n!==r&&(t.flags|=4)}
var ys,ws=!1,xs=!1,ks="function"==typeof WeakSet?WeakSet:Set,Is=null,Ms=!1,Ss=null,Es=!1,Ts=Math.ceil,Cs=To.ReactCurrentDispatcher,As=To.ReactCurrentOwner,Ds=To.ReactCurrentBatchConfig,Fs=0,js=null,zs=null,Ps=0,_s=0,$s=St(0),Hs=0,Ls=null,Rs=0,Os=0,Ws=0,Ns=null,Zs=null,Bs=0,Us=1/0,Gs=null,Vs=!1,Ys=null,Js=null,Ks=!1,Qs=null,Xs=0,qs=0,ec=null,tc=-1,nc=0
ys=function(t,n,r){if(null!==t)if(t.memoizedProps!==n.pendingProps||xu.current)vs=!0
else{if(0===(t.lanes&r)&&!(128&n.flags))return vs=!1,function(e,t,n){switch(t.tag){case 3:Fr(t),Yt()
break
case 5:wn(t)
break
case 1:At(t.type)&&zt(t)
break
case 4:bn(t,t.stateNode.containerInfo)
break
case 10:var r=t.type.S,i=t.memoizedProps.value
Tt(Nu,r.m),r.m=i
break
case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Tt(Xu,1&Xu.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Pr(e,t,n):(Tt(Xu,1&Xu.current),null!==(e=Wr(e,t,n))?e.sibling:null)
Tt(Xu,1&Xu.current)
break
case 19:if(r=0!==(n&t.childLanes),128&e.flags){if(r)return Rr(e,t,n)
t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),Tt(Xu,Xu.current),r)break
return null
case 22:case 23:return t.lanes=0,Er(e,t,n)}return Wr(e,t,n)}(t,n,r)
vs=!!(131072&t.flags)}else vs=!1,Hu&&1048576&n.flags&&Lt(n,Au,n.index)
switch(n.lanes=0,n.tag){case 2:var i=n.type
Or(t,n),t=n.pendingProps
var o=Ct(n,wu.current)
rn(n,r),o=En(null,n,i,t,o,r)
var l=Tn()
return n.flags|=1,"object"==typeof o&&null!==o&&"function"==typeof o.render&&void 0===o.$$typeof?(n.tag=1,n.memoizedState=null,n.updateQueue=null,At(i)?(l=!0,zt(n)):l=!1,n.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,sn(n),o.updater=hs,n.stateNode=o,o.W=n,pr(n,i,t,r),n=Dr(null,n,i,!0,l,r)):(n.tag=0,Hu&&l&&Rt(n),kr(null,n,o,r),n=n.child),n
case 16:i=n.elementType
e:{switch(Or(t,n),t=n.pendingProps,i=(o=i.C)(i.T),n.type=i,o=n.tag=function(e){if("function"==typeof e)return Ui(e)?1:0
if(null!=e){if((e=e.$$typeof)===_o)return 11
if(e===Lo)return 14}return 2}(i),t=ur(i,t),o){case 0:n=Cr(null,n,i,t,r)
break e
case 1:n=Ar(null,n,i,t,r)
break e
case 11:n=Ir(null,n,i,t,r)
break e
case 14:n=Mr(null,n,i,ur(i.type,t),r)
break e}throw Error(e(306,i,""))}return n
case 0:return i=n.type,o=n.pendingProps,Cr(t,n,i,o=n.elementType===i?o:ur(i,o),r)
case 1:return i=n.type,o=n.pendingProps,Ar(t,n,i,o=n.elementType===i?o:ur(i,o),r)
case 3:e:{if(Fr(n),null===t)throw Error(e(387))
i=n.pendingProps,o=(l=n.memoizedState).element,cn(t,n),mn(n,i,null,r)
var a=n.memoizedState
if(i=a.element,l.isDehydrated){if(l={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},n.updateQueue.baseState=l,n.memoizedState=l,256&n.flags){n=jr(t,n,i,r,o=hr(Error(e(423)),n))
break e}if(i!==o){n=jr(t,n,i,r,o=hr(Error(e(424)),n))
break e}for($u=yt(n.stateNode.containerInfo.firstChild),_u=n,Hu=!0,Lu=null,r=Wu(n,null,i,r),n.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(Yt(),i===o){n=Wr(t,n,r)
break e}kr(t,n,i,r)}n=n.child}return n
case 5:return wn(n),null===t&&Bt(n),i=n.type,o=n.pendingProps,l=null!==t?t.memoizedProps:null,a=o.children,gt(i,o)?a=null:null!==l&&gt(i,l)&&(n.flags|=32),Tr(t,n),kr(t,n,a,r),n.child
case 6:return null===t&&Bt(n),null
case 13:return Pr(t,n,r)
case 4:return bn(n,n.stateNode.containerInfo),i=n.pendingProps,null===t?n.child=Ou(n,null,i,r):kr(t,n,i,r),n.child
case 11:return i=n.type,o=n.pendingProps,Ir(t,n,i,o=n.elementType===i?o:ur(i,o),r)
case 7:return kr(t,n,n.pendingProps,r),n.child
case 8:case 12:return kr(t,n,n.pendingProps.children,r),n.child
case 10:e:{if(i=n.type.S,o=n.pendingProps,l=n.memoizedProps,a=o.value,Tt(Nu,i.m),i.m=a,null!==l)if(ja(l.value,a)){if(l.children===o.children&&!xu.current){n=Wr(t,n,r)
break e}}else for(null!==(l=n.child)&&(l.return=n);null!==l;){var u=l.dependencies
if(null!==u){a=l.child
for(var s=u.firstContext;null!==s;){if(s.context===i){if(1===l.tag){(s=fn(-1,r&-r)).tag=2
var c=l.updateQueue
if(null!==c){var f=(c=c.shared).pending
null===f?s.next=s:(s.next=f.next,f.next=s),c.pending=s}}l.lanes|=r,null!==(s=l.alternate)&&(s.lanes|=r),nn(l.return,r,n),u.lanes|=r
break}s=s.next}}else if(10===l.tag)a=l.type===n.type?null:l.child
else if(18===l.tag){if(null===(a=l.return))throw Error(e(341))
a.lanes|=r,null!==(u=a.alternate)&&(u.lanes|=r),nn(a,r,n),a=l.sibling}else a=l.child
if(null!==a)a.return=l
else for(a=l;null!==a;){if(a===n){a=null
break}if(null!==(l=a.sibling)){l.return=a.return,a=l
break}a=a.return}l=a}kr(t,n,o.children,r),n=n.child}return n
case 9:return o=n.type,i=n.pendingProps.children,rn(n,r),i=i(o=on(o)),n.flags|=1,kr(t,n,i,r),n.child
case 14:return o=ur(i=n.type,n.pendingProps),Mr(t,n,i,o=ur(i.type,o),r)
case 15:return Sr(t,n,n.type,n.pendingProps,r)
case 17:return i=n.type,o=n.pendingProps,o=n.elementType===i?o:ur(i,o),Or(t,n),n.tag=1,At(i)?(t=!0,zt(n)):t=!1,rn(n,r),fr(n,i,o),pr(n,i,o,r),Dr(null,n,i,!0,t,r)
case 19:return Rr(t,n,r)
case 22:return Er(t,n,r)}throw Error(e(156,n.tag))}
var rc="function"==typeof reportError?reportError:function(e){void 0}
ao.prototype.render=lo.prototype.render=function(t){var n=this.U
if(null===n)throw Error(e(409))
no(t,n,null,null)},ao.prototype.unmount=lo.prototype.unmount=function(){var e=this.U
if(null!==e){this.U=null
var t=e.containerInfo
Ii(function(){no(null,e,null,null)}),t[pu]=null}},ao.prototype.unstable_scheduleHydration=function(e){if(e){var t=ol()
e={blockedOn:null,target:e,priority:t}
for(var n=0;n<Wl.length&&0!==t&&t<Wl[n].priority;n++);Wl.splice(n,0,e),0===n&&he(e)}},nl=function(e){switch(e.tag){case 3:var t=e.stateNode
if(t.current.memoizedState.isDehydrated){var n=re(t.pendingLanes)
0!==n&&(ce(t,1|n),gi(t,yl()),!(6&Fs)&&(Us=yl()+500,$t()))}break
case 13:Ii(function(){var t=un(e,1)
if(null!==t){var n=pi()
mi(t,e,1,n)}}),oo(e,1)}},rl=function(e){if(13===e.tag){var t=un(e,134217728)
null!==t&&mi(t,e,134217728,pi()),oo(e,134217728)}},il=function(e){if(13===e.tag){var t=hi(e),n=un(e,t)
null!==n&&mi(n,e,t,pi()),oo(e,t)}},ol=function(){return zl},ll=function(e,t){var n=zl
try{return zl=e,t()}finally{zl=n}},Ko=function(t,n,r){switch(n){case"input":if(x(t,r),n=r.name,"radio"===r.type&&null!=n){for(r=t;r.parentNode;)r=r.parentNode
for(r=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<r.length;n++){var i=r[n]
if(i!==t&&i.form===t.form){var o=Mt(i)
if(!o)throw Error(e(90))
g(i),x(i,o)}}}break
case"textarea":T(t,r)
break
case"select":null!=(n=r.value)&&M(t,!!r.multiple,n,!1)}},G=ki,V=Ii
var ic={usingClientEntryPoint:!1,Events:[kt,It,Mt,B,U,ki]},oc={findFiberByHostInstance:xt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lc={bundleType:oc.bundleType,version:oc.version,rendererPackageName:oc.rendererPackageName,rendererConfig:oc.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:To.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=te(e))?null:e.stateNode},findFiberByHostInstance:oc.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"}
if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ac=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(!ac.isDisabled&&ac.supportsFiber)try{El=ac.inject(lc),Tl=ac}catch(Eo){}}return L.h=ic,L.createPortal=function(t,n){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null
if(!uo(n))throw Error(e(200))
return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:Ao,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(t,n,null,r)},L.createRoot=function(t,n){if(!uo(t))throw Error(e(299))
var r=!1,i="",o=rc
return null!=n&&(!0===n.unstable_strictMode&&(r=!0),void 0!==n.identifierPrefix&&(i=n.identifierPrefix),void 0!==n.onRecoverableError&&(o=n.onRecoverableError)),n=qi(t,1,!1,null,0,r,0,i,o),t[pu]=n.current,lt(8===t.nodeType?t.parentNode:t),new lo(n)},L.findDOMNode=function(t){if(null==t)return null
if(1===t.nodeType)return t
var n=t.W
if(void 0===n){if("function"==typeof t.render)throw Error(e(188))
throw t=Object.keys(t).join(","),Error(e(268,t))}return null===(t=te(n))?null:t.stateNode},L.flushSync=function(e){return Ii(e)},L.hydrate=function(t,n,r){if(!so(n))throw Error(e(200))
return fo(null,t,n,!0,r)},L.hydrateRoot=function(t,n,r){if(!uo(t))throw Error(e(405))
var i=null!=r&&r.hydratedSources||null,o=!1,l="",a=rc
if(null!=r&&(!0===r.unstable_strictMode&&(o=!0),void 0!==r.identifierPrefix&&(l=r.identifierPrefix),void 0!==r.onRecoverableError&&(a=r.onRecoverableError)),n=to(n,null,t,1,null!=r?r:null,o,0,l,a),t[pu]=n.current,lt(t),i)for(t=0;t<i.length;t++)o=(o=(r=i[t]).G)(r.V),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[r,o]:n.mutableSourceEagerHydrationData.push(r,o)
return new ao(n)},L.render=function(t,n,r){if(!so(n))throw Error(e(200))
return fo(null,t,n,!1,r)},L.unmountComponentAtNode=function(t){if(!so(t))throw Error(e(40))
return!!t.Z&&(Ii(function(){fo(null,null,t,!1,function(){t.Z=null,t[pu]=null})}),!0)},L.unstable_batchedUpdates=ki,L.unstable_renderSubtreeIntoContainer=function(t,n,r,i){if(!so(r))throw Error(e(200))
if(null==t||void 0===t.W)throw Error(e(38))
return fo(t,n,r,!1,i)},L.version="18.3.1-next-f1338f8080-20240426",L}function i(){return G}function o(){let e=!1
try{const t=Object.defineProperty({},"passive",{get:()=>(e=!0,!1)})
window.addEventListener("testPassive",null,t),window.removeEventListener("testPassive",null,t)}catch(t){}return e}function l(e){return function(t){t instanceof RegExp&&(t.lastIndex=0)
for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i]
return ht(e,t,r)}}function a(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:xt
at&&at(e,null)
let r=t.length
for(;r--;){let i=t[r]
if("string"==typeof i){const e=n(i)
e!==i&&(ut(t)||(t[r]=e),i=e)}e[i]=!0}return e}function u(e){for(let t=0;t<e.length;t++)Tt(e,t)||(e[t]=null)
return e}function s(e){const t=pt(null)
for(const[n,r]of lt(e))Tt(e,n)&&(Array.isArray(r)?t[n]=u(r):r&&"object"==typeof r&&r.constructor===Object?t[n]=s(r):t[n]=r)
return t}function c(e,t){for(;null!==e;){const n=ct(e,t)
if(n){if(n.get)return l(n.get)
if("function"==typeof n.value)return l(n.value)}e=st(e)}return function(){return null}}function f(e,t=en){if(!e||"string"!=typeof e)return""
try{return qt.sanitize(e,t)}catch(n){return void 0,""}}function d(e){return f(e,tn)}async function p(e,t={}){const n=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const t=document.cookie.split(";")
for(let n of t){const[e,t]=n.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(t)}return null}(),r={...t,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n&&{"X-CSRF-Token":n},...t.headers}}
if(r.body&&"string"==typeof r.body)try{const e=JSON.parse(r.body)
e.Y=Date.now(),r.body=JSON.stringify(e)}catch(i){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const t=await fetch(e,r)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(t=>!e.headers.get(t)).length>0,0}(t),t}catch(o){throw void 0,o}}var h,m,g=Object.defineProperty,v=(e,t,n)=>((e,t,n)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n)
!function(){function e(e){if(e.ep)return
e.ep=!0
const t=function(e){const t={}
return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e)
fetch(e.href,t)}const t=document.createElement("link").relList
if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t)
new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}}()
const b={},y=function(e,t,n){function r(e){const t=new Event("vite:preloadError",{cancelable:!0})
if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}let i=Promise.resolve()
if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))}
document.getElementsByTagName("link")
const n=document.querySelector("meta[property=csp-nonce]"),r=n?.nonce||n?.getAttribute("nonce")
i=e(t.map(e=>{if((e=function(e){return"/"+e}(e))in b)return
b[e]=!0
const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${e}"]${n}`))return
const i=document.createElement("link")
return i.rel=t?"stylesheet":"modulepreload",t||(i.as="script"),i.crossOrigin="",i.href=e,r&&i.setAttribute("nonce",r),document.head.appendChild(i),t?new Promise((t,n)=>{i.addEventListener("load",t),i.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return i.then(t=>{for(const e of t||[])"rejected"===e.status&&r(e.reason)
return e().catch(r)})}
var w,x,k,I,M={exports:{}},S={},E={exports:{}},T={},C=function(){return I||(I=1,M.exports=function(){function e(e,t,n){var i,u={},s=null,c=null
for(i in void 0!==n&&(s=""+n),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,i)&&!a.hasOwnProperty(i)&&(u[i]=t[i])
if(e&&e.defaultProps)for(i in t=e.defaultProps)void 0===u[i]&&(u[i]=t[i])
return{$$typeof:r,type:e,key:s,ref:c,props:u,i:l.current}}if(k)return S
k=1
var t=n(),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=t.h.ReactCurrentOwner,a={key:!0,ref:!0,u:!0,p:!0}
return S.Fragment=i,S.jsx=e,S.jsxs=e,S}()),M.exports}(),A=n()
const D=e(A)
var F,j,z,P,_,$={},H={exports:{}},L={},R={exports:{}},O={},W=function(){if(_)return $
_=1
var e=function(){return P||(P=1,!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){void 0}}(),H.exports=r()),H.exports}()
return $.createRoot=e.createRoot,$.hydrateRoot=e.hydrateRoot,$}()
let N=null
const Z=new Map,B=()=>{const[e,t]=A.useState({width:"undefined"!=typeof window?window.innerWidth:0,height:"undefined"!=typeof window?window.innerHeight:0,isMobile:!1,isTablet:!1,isDesktop:!1}),n=A.useCallback(e=>{const{width:n,height:r}=e
t({width:n,height:r,isMobile:n<=768,isTablet:n>768&&n<=1024,isDesktop:n>1024})},[])
return A.useEffect(()=>{let e=null,t=null
const r=()=>{e&&cancelAnimationFrame(e),t&&clearTimeout(t),t=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
n({width:e,height:t})})},100)}
return window.addEventListener("resize",r,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
n({width:e,height:t})}),()=>{window.removeEventListener("resize",r),e&&cancelAnimationFrame(e),t&&clearTimeout(t)}},[n]),e}
class U{constructor(e={}){this.hasTrackedPageView=!1,this.sessionId=null
const t=window.location.hostname,n="localhost"===t
let r
r=e.apiEndpoint?e.apiEndpoint:n||window.location.port||window.location.hostname.includes("localhost")||"3001"===window.location.port||window.location.href.includes("localhost")?"/api":"b2b.click"===t||"www.b2b.click"===t||"bounce2bounce.com"===t||"www.bounce2bounce.com"===t?"https://admin.b2b.click/api":"/api",this.config={endpoint:`${r}/analytics/track`,enabled:!1===e.enableGDPR||this.shouldTrack(),debug:e.debug||!1},this.sessionId=this.getSessionId(),this.config.debug}shouldTrack(){if("1"===navigator.doNotTrack||"1"===window.doNotTrack)return!1
const e=navigator.userAgent.toLowerCase()
return!["bot","crawler","spider","scraper","fetcher","googlebot","bingbot","slurp","duckduckbot","facebookexternalhit","twitterbot","linkedinbot","whatsapp","telegrambot","headless","phantom","selenium","puppeteer","playwright"].some(t=>e.includes(t))}getSessionId(){const e=localStorage.getItem("analytics_session_id"),t=localStorage.getItem("analytics_session_expiry"),n=Date.now()
if(e&&t&&n<parseInt(t))return e
const r="sess_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)
localStorage.setItem("analytics_session_id",r)
const i=n+18e5
return localStorage.setItem("analytics_session_expiry",i.toString()),r}getPageInfo(){const e=new URLSearchParams(window.location.search)
return{ts:Date.now(),page_url:window.location.href,page_title:document.title||"",referrer:document.referrer||void 0,utm_source:e.get("utm_source")||void 0,utm_medium:e.get("utm_medium")||void 0,utm_campaign:e.get("utm_campaign")||void 0,viewport_width:window.innerWidth||0,viewport_height:window.innerHeight||0,screen_width:screen.width||0,screen_height:screen.height||0,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||void 0,language:navigator.language||void 0}}async sendData(e){if(!this.config.enabled)return!1
try{const n=JSON.stringify(e)
if(navigator.sendBeacon){const e=new Blob([n],{type:"application/json"})
if(navigator.sendBeacon(this.config.endpoint,e))return this.config.debug,0,!0}const r=await fetch(this.config.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:n,keepalive:!0,mode:"cors"})
if(r.ok||204===r.status)return this.config.debug,0,!0
void 0
try{await r.text()}catch(t){void 0}return!1}catch(n){return"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?(this.config.debug,0):void 0,!1}}async sendPageView(){if(this.hasTrackedPageView)return this.config.debug,0,!1
const e=this.getPageInfo(),t={sessionId:this.getSessionId(),ts:Date.now(),page_url:e.page_url||window.location.href,page_title:e.page_title||document.title||"Homepage",referrer:e.referrer,utm_source:e.utm_source,utm_medium:e.utm_medium,utm_campaign:e.utm_campaign,utm_content:e.utm_content,utm_term:e.utm_term,viewport_width:e.viewport_width,viewport_height:e.viewport_height,screen_width:e.screen_width,screen_height:e.screen_height,timezone:e.timezone,language:e.language},n=await this.sendData(t)
return n&&(this.hasTrackedPageView=!0,this.config.debug),n}async sendEvent(e){if(!this.config.enabled)return!1
const t={sessionId:this.getSessionId(),ts:Date.now(),event_type:e.event||"custom_event",event:e.event||"custom_event",properties:e.properties||{},...e}
return this.config.debug,0,await this.sendData(t)}trackLinkClick(e,t){if(this.config.enabled)try{const n=new URL(e,window.location.href),r=window.location.hostname
n.hostname!==r&&this.sendEvent({page_url:`${window.location.href}#link-click`,page_title:`Link Click: ${t||e}`,referrer:window.location.href})}catch(n){this.config.debug,0}}getConfig(){return{...this.config}}isEnabled(){return this.config.enabled}grantGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","granted"),this.sendPageView()}revokeGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","denied"),this.clearSessionData()}clearSessionData(){localStorage.removeItem("analytics_session_id"),localStorage.removeItem("analytics_session_start"),this.sessionId=null}}let G=null
const V=()=>{const e=A.useRef(!1)
A.useEffect(()=>{const t=i()
!e.current&&t&&t.isEnabled()&&(e.current=!0)},[])
const t=A.useCallback(e=>{!function(e){G&&G.sendEvent(e)}(e)},[]),n=A.useCallback((e,t="")=>{const n=i()
n&&n.isEnabled()&&n.trackLinkClick(e,t)},[]),r=A.useCallback((e,t={})=>{const n=i()
n&&n.isEnabled()&&n.sendEvent({event:e,properties:t,timestamp:Date.now()})},[]),o=i()
return{track:t,trackLinkClick:n,trackEvent:r,isTrackingEnabled:!!o&&o.isEnabled()}}
var Y,J
const K=e(function(){function e(o,l){if(o===l)return!0
if(o&&l&&"object"==typeof o&&"object"==typeof l){if(o.constructor!==l.constructor)return!1
var a,u,s,c
if(Array.isArray(o)){if((a=o.length)!=l.length)return!1
for(u=a;0!==u--;)if(!e(o[u],l[u]))return!1
return!0}if(n&&o instanceof Map&&l instanceof Map){if(o.size!==l.size)return!1
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
if(t&&o instanceof Element)return!1
for(u=a;0!==u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!o.$$typeof)&&!e(o[s[u]],l[s[u]]))return!1
return!0}return o!=o&&l!=l}if(J)return Y
J=1
var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return Y=function(t,n){try{return e(t,n)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var Q,X
const q=e(function(){return X?Q:(X=1,Q=function(e,t,n,r,i,o,l,a){if(!e){var u
if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var s=[n,r,i,o,l,a],c=0;(u=new Error(t.replace(/%s/g,function(){return s[c++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}})}())
var ee,te
const ne=e(function(){return te?ee:(te=1,ee=function(e,t,n,r){var i=n?n.call(r,e,t):void 0
if(void 0!==i)return!!i
if(e===t)return!0
if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1
var o=Object.keys(e),l=Object.keys(t)
if(o.length!==l.length)return!1
for(var a=Object.prototype.hasOwnProperty.bind(t),u=0;u<o.length;u++){var s=o[u]
if(!a(s))return!1
var c=e[s],f=t[s]
if(!1===(i=n?n.call(r,c,f,s):void 0)||void 0===i&&c!==f)return!1}return!0})}())
var re=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(re||{}),ie={rel:["amphtml","canonical","alternate"]},oe={type:["application/ld+json"]},le={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},ae=Object.values(re),ue={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},se=Object.entries(ue).reduce((e,[t,n])=>(e[n]=t,e),{}),ce="data-rh",fe=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const r=e[n]
if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},de=e=>{let t=fe(e,"title")
const n=fe(e,"titleTemplate")
if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t)
const r=fe(e,"defaultTitle")
return t||r||void 0},pe=e=>fe(e,"onChangeClientState")||(()=>{}),he=(e,t)=>t.filter(t=>void 0!==t[e]).map(t=>t[e]).reduce((e,t)=>({...e,...t}),{}),me=(e,t)=>t.filter(e=>void 0!==e.base).map(e=>e.base).reverse().reduce((t,n)=>{if(!t.length){const r=Object.keys(n)
for(let i=0;i<r.length;i+=1){const o=r[i].toLowerCase()
if(-1!==e.indexOf(o)&&n[o])return t.concat(n)}}return t},[]),ge=(e,t,n)=>{const r={}
return n.filter(t=>!!Array.isArray(t[e])||(void 0!==t[e]&&(t[e],console&&"function"==typeof console.warn,0),!1)).map(t=>t[e]).reverse().reduce((e,n)=>{const i={}
n.filter(e=>{let n
const o=Object.keys(e)
for(let r=0;r<o.length;r+=1){const i=o[r],l=i.toLowerCase();-1===t.indexOf(l)||"rel"===n&&"canonical"===e[n].toLowerCase()||"rel"===l&&"stylesheet"===e[l].toLowerCase()||(n=l),-1===t.indexOf(i)||"innerHTML"!==i&&"cssText"!==i&&"itemprop"!==i||(n=i)}if(!n||!e[n])return!1
const l=e[n].toLowerCase()
return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][l]&&(i[n][l]=!0,!0)}).reverse().forEach(t=>e.push(t))
const o=Object.keys(i)
for(let t=0;t<o.length;t+=1){const e=o[t],n={...r[e],...i[e]}
r[e]=n}return e},[]).reverse()},ve=(e,t)=>{if(Array.isArray(e)&&e.length)for(let n=0;n<e.length;n+=1)if(e[n][t])return!0
return!1},be=e=>Array.isArray(e)?e.join(""):e,ye=(e,t)=>Array.isArray(e)?e.reduce((e,n)=>(((e,t)=>{const n=Object.keys(e)
for(let r=0;r<n.length;r+=1)if(t[n[r]]&&t[n[r]].includes(e[n[r]]))return!0
return!1})(n,t)?e.priority.push(n):e.default.push(n),e),{priority:[],default:[]}):{default:e,priority:[]},we=(e,t)=>({...e,[t]:void 0}),xe=["noscript","script","style"],ke=(e,t=!0)=>!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Ie=e=>Object.keys(e).reduce((t,n)=>{const r=void 0!==e[n]?`${n}="${e[n]}"`:`${n}`
return t?`${t} ${r}`:r},""),Me=(e,t={})=>Object.keys(e).reduce((t,n)=>(t[ue[n]||n]=e[n],t),t),Se=(e,t)=>t.map((t,n)=>{const r={key:n,[ce]:!0}
return Object.keys(t).forEach(e=>{const n=ue[e]||e
if("innerHTML"===n||"cssText"===n){const e=t.innerHTML||t.cssText
r.dangerouslySetInnerHTML={j:e}}else r[n]=t[e]}),D.createElement(e,r)}),Ee=(e,t,n=!0)=>{switch(e){case"title":return{toComponent:()=>((e,t,n)=>{const r=Me(n,{key:t,[ce]:!0})
return[D.createElement("title",r,t)]})(0,t.title,t.titleAttributes),toString:()=>((e,t,n,r)=>{const i=Ie(n),o=be(t)
return i?`<${e} ${ce}="true" ${i}>${ke(o,r)}</${e}>`:`<${e} ${ce}="true">${ke(o,r)}</${e}>`})(e,t.title,t.titleAttributes,n)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Me(t),toString:()=>Ie(t)}
default:return{toComponent:()=>Se(e,t),toString:()=>((e,t,n=!0)=>t.reduce((t,r)=>{const i=r,o=Object.keys(i).filter(e=>!("innerHTML"===e||"cssText"===e)).reduce((e,t)=>{const r=void 0===i[t]?t:`${t}="${ke(i[t],n)}"`
return e?`${e} ${r}`:r},""),l=i.innerHTML||i.cssText||"",a=-1===xe.indexOf(e)
return`${t}<${e} ${ce}="true" ${o}${a?"/>":`>${l}</${e}>`}`},""))(e,t,n)}}},Te=e=>{const{baseTag:t,bodyAttributes:n,encode:r=!0,htmlAttributes:i,noscriptTags:o,styleTags:l,title:a="",titleAttributes:u,prioritizeSeoTags:s}=e
let{linkTags:c,metaTags:f,scriptTags:d}=e,p={toComponent:()=>{},toString:()=>""}
return s&&({priorityMethods:p,linkTags:c,metaTags:f,scriptTags:d}=(({metaTags:e,linkTags:t,scriptTags:n,encode:r})=>{const i=ye(e,le),o=ye(t,ie),l=ye(n,oe)
return{priorityMethods:{toComponent:()=>[...Se("meta",i.priority),...Se("link",o.priority),...Se("script",l.priority)],toString:()=>`${Ee("meta",i.priority,r)} ${Ee("link",o.priority,r)} ${Ee("script",l.priority,r)}`},metaTags:i.default,linkTags:o.default,scriptTags:l.default}})(e)),{priority:p,base:Ee("base",t,r),bodyAttributes:Ee("bodyAttributes",n,r),htmlAttributes:Ee("htmlAttributes",i,r),link:Ee("link",c,r),meta:Ee("meta",f,r),noscript:Ee("noscript",o,r),script:Ee("script",d,r),style:Ee("style",l,r),title:Ee("title",{title:a,titleAttributes:u},r)}},Ce=[],Ae=!("undefined"==typeof window||!window.document||!window.document.createElement),De=class{constructor(e,t){v(this,"instances",[]),v(this,"canUseDOM",Ae),v(this,"context"),v(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Ce:this.instances,add:e=>{(this.canUseDOM?Ce:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Ce:this.instances).indexOf(e);(this.canUseDOM?Ce:this.instances).splice(t,1)}}}),this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Te({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Fe=D.createContext({}),je=(h=class extends A.Component{constructor(e){super(e),v(this,"helmetData"),this.helmetData=new De(this.props.context||{},h.canUseDOM)}render(){return D.createElement(Fe.Provider,{value:this.helmetData.value},this.props.children)}},v(h,"canUseDOM",Ae),h),ze=(e,t)=>{const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${e}[${ce}]`),i=[].slice.call(r),o=[]
let l
return t&&t.length&&t.forEach(t=>{const n=document.createElement(e)
for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))if("innerHTML"===e)n.innerHTML=t.innerHTML
else if("cssText"===e)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText))
else{const r=e,i=void 0===t[r]?"":t[r]
n.setAttribute(e,i)}n.setAttribute(ce,"true"),i.some((e,t)=>(l=t,n.isEqualNode(e)))?i.splice(l,1):o.push(n)}),i.forEach(e=>e.parentNode?.removeChild(e)),o.forEach(e=>n.appendChild(e)),{oldTags:i,newTags:o}},Pe=(e,t)=>{const n=document.getElementsByTagName(e)[0]
if(!n)return
const r=n.getAttribute(ce),i=r?r.split(","):[],o=[...i],l=Object.keys(t)
for(const a of l){const e=t[a]||""
n.getAttribute(a)!==e&&n.setAttribute(a,e),-1===i.indexOf(a)&&i.push(a)
const r=o.indexOf(a);-1!==r&&o.splice(r,1)}for(let a=o.length-1;a>=0;a-=1)n.removeAttribute(o[a])
i.length===o.length?n.removeAttribute(ce):n.getAttribute(ce)!==l.join(",")&&n.setAttribute(ce,l.join(","))},_e=(e,t)=>{const{baseTag:n,bodyAttributes:r,htmlAttributes:i,linkTags:o,metaTags:l,noscriptTags:a,onChangeClientState:u,scriptTags:s,styleTags:c,title:f,titleAttributes:d}=e
Pe("body",r),Pe("html",i),((e,t)=>{void 0!==e&&document.title!==e&&(document.title=be(e)),Pe("title",t)})(f,d)
const p={baseTag:ze("base",n),linkTags:ze("link",o),metaTags:ze("meta",l),noscriptTags:ze("noscript",a),scriptTags:ze("script",s),styleTags:ze("style",c)},h={},m={}
Object.keys(p).forEach(e=>{const{newTags:t,oldTags:n}=p[e]
t.length&&(h[e]=t),n.length&&(m[e]=p[e].oldTags)}),t&&t(),u(e,h,m)},$e=null,He=class extends A.Component{constructor(){super(...arguments),v(this,"rendered",!1)}shouldComponentUpdate(e){return!ne(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context
e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:t}=this.props.context
let n=null
const r=(i=e.get().map(e=>{const t={...e.props}
return delete t.context,t}),{baseTag:me(["href"],i),bodyAttributes:he("bodyAttributes",i),defer:fe(i,"defer"),encode:fe(i,"encodeSpecialCharacters"),htmlAttributes:he("htmlAttributes",i),linkTags:ge("link",["rel","href"],i),metaTags:ge("meta",["name","charset","http-equiv","property","itemprop"],i),noscriptTags:ge("noscript",["innerHTML"],i),onChangeClientState:pe(i),scriptTags:ge("script",["src","innerHTML"],i),styleTags:ge("style",["cssText"],i),title:de(i),titleAttributes:he("titleAttributes",i),prioritizeSeoTags:ve(i,"prioritizeSeoTags")})
var i,o
je.canUseDOM?(o=r,$e&&cancelAnimationFrame($e),void(o.defer?$e=requestAnimationFrame(()=>{_e(o,()=>{$e=null})}):(_e(o),$e=null))):Te&&(n=Te(r)),t(n)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:e}=this.props.context
e.add(this),this.emitChange()}render(){return this.init(),null}},Le=(m=class extends A.Component{shouldComponentUpdate(e){return!K(we(this.props,"helmetData"),we(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null
switch(e.type){case"script":case"noscript":return{innerHTML:t}
case"style":return{cssText:t}
default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,r){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,t,n,r){switch(e.type){case"title":return{...t,[e.type]:r,titleAttributes:{...n}}
case"body":return{...t,bodyAttributes:{...n}}
case"html":return{...t,htmlAttributes:{...n}}
default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t}
return Object.keys(e).forEach(t=>{n={...n,[t]:e[t]}}),n}warnOnInvalidChildren(e,t){return q(ae.some(t=>e.type===t),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${ae.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),q(!t||"string"==typeof t||Array.isArray(t)&&!t.some(e=>"string"!=typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let n={}
return D.Children.forEach(e,e=>{if(!e||!e.props)return
const{children:r,...i}=e.props,o=Object.keys(i).reduce((e,t)=>(e[se[t]||t]=i[t],e),{})
let{type:l}=e
switch("symbol"==typeof l?l=l.toString():this.warnOnInvalidChildren(e,r),l){case"Symbol(react.fragment)":t=this.mapChildrenToProps(r,t)
break
case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(e,n,o,r)
break
default:t=this.mapObjectTypeChildren(e,t,o,r)}}),this.mapArrayTypeChildrenToProps(n,t)}render(){const{children:e,...t}=this.props
let n={...t},{helmetData:r}=t
return e&&(n=this.mapChildrenToProps(e,n)),!r||r instanceof De||(r=new De(r.context,!0),delete n.helmetData),r?D.createElement(He,{...n,context:r.value}):D.createElement(Fe.Consumer,null,e=>D.createElement(He,{...n,context:e}))}},v(m,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),m)
const Re={DASHBOARD_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/seo":"https://admin.b2b.click/api/settings/seo",MAINTENANCE_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/maintenance-status":"https://admin.b2b.click/api/settings/maintenance-status"},Oe={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let We=null,Ne=0
const Ze=async()=>{try{const e=Date.now(),t=e-Ne
if(We&&t<36e4)return void 0,t>288e3&&setTimeout(()=>async function(){try{return We=null,Ne=0,await Ze()}catch(e){We=oldCache,Ne=oldTimestamp}}(),100),We
const n=new AbortController,r=setTimeout(()=>n.abort(),8e3),i=await fetch(Re.DASHBOARD_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors",signal:n.signal})
if(clearTimeout(r),!i.ok)throw void 0,new Error(`HTTP ${i.status}: ${i.statusText}`)
const o=i.headers.get("content-type")
if(!o||!o.includes("application/json"))throw void 0,new Error("API returned HTML instead of JSON - possible routing issue")
const l=await i.json()
if(l.success&&l.settings)return We={...Oe,...l.settings},Ne=e,We
throw void 0,new Error("Invalid API response format")}catch(e){return We?(void 0,We):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,Oe)}},Be=async()=>{try{void 0
const e=await fetch(Re.MAINTENANCE_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors"})
if(!e.ok)return void 0,{maintenance_mode:!1}
const t=await e.json()
return void 0!==t.success?(void 0,{maintenance_mode:t.maintenance_mode||!1,maintenance_message:t.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:t.estimated_downtime||"2 hours",contact_information:t.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},Ue="seo_settings_cache",Ge=()=>{try{localStorage.removeItem(Ue)}catch(e){void 0}},Ve=e=>{try{const t={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},n=JSON.stringify(t)
n.length>5e4&&(void 0,Ge()),localStorage.setItem(Ue,n)}catch(t){if("QuotaExceededError"===t.name){void 0,Ge()
try{const t={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(Ue,JSON.stringify(t))}catch(n){void 0}}else void 0}},Ye=A.createContext(),Je=({children:e})=>{const[t,n]=A.useState(Oe),[r,i]=A.useState({maintenance_mode:!1}),[o,l]=A.useState(!0),[a,u]=A.useState(null),[s,c]=A.useState({isMobile:!1,deviceType:"unknown"}),f=async(e=!0)=>{try{if(l(!0),e){const e=(()=>{try{const e=localStorage.getItem(Ue)
if(e){const{data:t,timestamp:n}=JSON.parse(e)
if(Date.now()-n<3e4)return void 0,t}}catch(e){void 0,Ge()}return null})()
if(e)return n(e),l(!1),d(),void 0}await d()}catch(t){void 0,n(Oe)}finally{l(!1)}},d=async()=>{try{void 0
const[e,t]=await Promise.all([Ze(),Be()])
n(e),i(t),u(new Date),Ve(e)}catch(e){void 0}}
A.useEffect(()=>{const e=()=>{const e=window.innerWidth,t=navigator.userAgent||"",n=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t),r=e<=768||n
let i="desktop"
r&&(i=e<=480?"mobile":"tablet"),c({isMobile:r,deviceType:i})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),A.useEffect(()=>{f()},[]),A.useEffect(()=>{const e=setInterval(()=>{void 0,d()},3e5)
return()=>clearInterval(e)},[])
const p=A.useMemo(()=>t?(void 0,((e,t={})=>{const n={...Oe,...e},{isMobile:r=!1}=t,i=(o=n.default_og_image)?o.startsWith("http")?o:o.startsWith("/uploads/")?`https://admin.b2b.click${o}`:`https://b2b.click${o}`:"https://admin.b2b.click/images/og-image.png"
var o
const l=[{name:"description",content:n.default_description},{name:"keywords",content:n.default_keywords},{name:"author",content:n.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:n.default_title},{property:"og:description",content:n.default_description},{property:"og:image",content:i},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${n.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:n.twitter_handle},{name:"twitter:creator",content:n.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:n.default_title},{name:"twitter:description",content:n.default_description},{name:"twitter:image",content:i},{name:"twitter:image:alt",content:`${n.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&l.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:n.default_title,meta:l,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(t,s)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[t,s]),h={seoSettings:t,maintenanceStatus:r,metaTags:p,isLoading:o,lastUpdated:a,deviceInfo:s,refreshSEOSettings:async()=>{void 0,await f(!1)},updateSEOSetting:(e,t)=>{n(n=>{const r={...n,[e]:t}
return Ve(r),r}),u(new Date)},clearCache:()=>{Ge()},loadSEOSettings:f,isMaintenanceMode:()=>r.maintenance_mode}
return C.jsx(Ye.Provider,{value:h,children:C.jsxs(je,{children:[C.jsxs(Le,{children:[C.jsx("title",{children:p.title}),p.meta.map((e,t)=>e.name?C.jsx("meta",{name:e.name,content:e.content},`meta-${t}`):e.property?C.jsx("meta",{property:e.property,content:e.content},`meta-${t}`):null),p.link.map((e,t)=>C.jsx("link",{...e},`link-${t}`))]}),e]})})},Ke=()=>{const e=A.useContext(Ye)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},Qe=()=>(Ke(),A.useState(!0),null),Xe=()=>{const{maintenanceStatus:e}=Ke(),[t,n]=A.useState(!1)
if(A.useEffect(()=>{const e=()=>{const e=window.innerWidth,t=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
n(e<=768||r)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:t?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:t?"20px":"40px",overflow:"hidden"},i={fontSize:t?"64px":"96px",marginBottom:t?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},o={fontSize:t?"28px":"48px",marginBottom:t?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},l={fontSize:t?"16px":"20px",marginBottom:t?"24px":"32px",maxWidth:t?"320px":"600px",lineHeight:1.6,opacity:.9},a={fontSize:t?"14px":"18px",marginBottom:t?"20px":"24px",opacity:.8,padding:t?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:t?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},u={fontSize:t?"12px":"16px",opacity:.6,marginTop:t?"20px":"32px"}
return C.jsxs("div",{style:r,children:[C.jsx("div",{style:i,children:"\ud83d\udd27"}),C.jsx("h1",{style:o,children:e.maintenance_title||"Site Under Maintenance"}),C.jsx("p",{style:l,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&C.jsxs("div",{style:a,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&C.jsxs("p",{style:u,children:["Questions? Contact us: ",e.contact_information]}),C.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:t?"80px":"120px",height:t?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),C.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:t?"60px":"100px",height:t?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})},qe=()=>{const e=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),n=window.innerWidth<=768,r="ontouchstart"in window||navigator.maxTouchPoints>0
return t||n&&r},et=()=>{const e=navigator.userAgent||""
return{isIOS:/iPad|iPhone|iPod/.test(e),isAndroid:/Android/.test(e),isSafari:/Safari/.test(e)&&!/Chrome/.test(e),isChrome:/Chrome/.test(e),isFirefox:/Firefox/.test(e),isMobile:qe(),supportsPassiveEvents:o(),supportsIntersectionObserver:"IntersectionObserver"in window,supportsRequestIdleCallback:"requestIdleCallback"in window}},tt=(e,t,n=!1)=>{let r
return function(...i){const o=n&&!r,l=qe()?Math.max(t,100):t
clearTimeout(r),r=setTimeout(()=>{r=null,n||e.apply(this,i)},l),o&&e.apply(this,i)}},nt={forceGC(){window.gc&&window.gc()},getMemoryInfo(){if("memory"in performance){const e=performance.memory
return{used:e.usedJSHeapSize,total:e.totalJSHeapSize,limit:e.jsHeapSizeLimit,usageRatio:e.usedJSHeapSize/e.jsHeapSizeLimit}}return null},isMemoryPressure(){const e=this.getMemoryInfo()
return!!e&&e.usageRatio>.8},cleanupBlobUrls(){void 0}},rt={setMobileViewport(){let e=document.querySelector('meta[name="viewport"]')
e||(e=document.createElement("meta"),e.name="viewport",document.head.appendChild(e)),e.content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},fixIOSViewport(){if(et().isIOS){const e=()=>{const e=.01*window.innerHeight
document.documentElement.style.setProperty("--vh",`${e}px`)}
e(),window.addEventListener("resize",tt(e,100),{passive:!0}),window.addEventListener("orientationchange",tt(e,100),{passive:!0})}},getSafeAreaInsets(){const e=getComputedStyle(document.documentElement)
return{top:e.getPropertyValue("--sat")||e.getPropertyValue("env(safe-area-inset-top)")||"0px",right:e.getPropertyValue("--sar")||e.getPropertyValue("env(safe-area-inset-right)")||"0px",bottom:e.getPropertyValue("--sab")||e.getPropertyValue("env(safe-area-inset-bottom)")||"0px",left:e.getPropertyValue("--sal")||e.getPropertyValue("env(safe-area-inset-left)")||"0px"}}},it={trackMetrics(){if("performance"in window){const e=performance.getEntriesByType("navigation")[0],t=performance.getEntriesByType("paint")
return void 0,{domContentLoaded:e.domContentLoadedEventEnd-e.domContentLoadedEventStart,loadComplete:e.loadEventEnd-e.loadEventStart,firstPaint:t.find(e=>"first-paint"===e.name)?.startTime||0,firstContentfulPaint:t.find(e=>"first-contentful-paint"===e.name)?.startTime||0,memoryInfo:nt.getMemoryInfo()}}return null},startMonitoring(){qe()&&setInterval(()=>{nt.isMemoryPressure()&&(void 0,nt.forceGC())},3e4)}},ot=()=>{if(qe()){void 0,rt.setMobileViewport(),rt.fixIOSViewport(),it.startMonitoring(),document.documentElement.classList.add("mobile-device")
const e=et()
e.isIOS&&document.documentElement.classList.add("ios"),e.isAndroid&&document.documentElement.classList.add("android"),e.isSafari&&document.documentElement.classList.add("safari"),e.isChrome&&document.documentElement.classList.add("chrome")}},{entries:lt,setPrototypeOf:at,isFrozen:ut,getPrototypeOf:st,getOwnPropertyDescriptor:ct}=Object
let{freeze:ft,seal:dt,create:pt}=Object,{apply:ht,construct:mt}="undefined"!=typeof Reflect&&Reflect
ft||(ft=function(e){return e}),dt||(dt=function(e){return e}),ht||(ht=function(e,t,n){return e.apply(t,n)}),mt||(mt=function(e,t){return new e(...t)})
const gt=l(Array.prototype.forEach),vt=l(Array.prototype.lastIndexOf),bt=l(Array.prototype.pop),yt=l(Array.prototype.push),wt=l(Array.prototype.splice),xt=l(String.prototype.toLowerCase),kt=l(String.prototype.toString),It=l(String.prototype.match),Mt=l(String.prototype.replace),St=l(String.prototype.indexOf),Et=l(String.prototype.trim),Tt=l(Object.prototype.hasOwnProperty),Ct=l(RegExp.prototype.test),At=(Dt=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return mt(Dt,t)})
var Dt
const Ft=ft(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),jt=ft(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zt=ft(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pt=ft(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),_t=ft(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$t=ft(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ht=ft(["#text"]),Lt=ft(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Rt=ft(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ot=ft(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wt=ft(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nt=dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Zt=dt(/<%[\w\W]*|[\w\W]*%>/gm),Bt=dt(/\$\{[\w\W]*/gm),Ut=dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gt=dt(/^aria-[\-\w]+$/),Vt=dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yt=dt(/^(?:\w+script|data):/i),Jt=dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Kt=dt(/^html$/i),Qt=dt(/^[a-z][.\w]*(-[.\w]+)+$/i)
var Xt=Object.freeze({__proto__:null,ARIA_ATTR:Gt,ATTR_WHITESPACE:Jt,CUSTOM_ELEMENT:Qt,DATA_ATTR:Ut,DOCTYPE_NAME:Kt,ERB_EXPR:Zt,IS_ALLOWED_URI:Vt,IS_SCRIPT_OR_DATA:Yt,MUSTACHE_EXPR:Nt,TMPLIT_EXPR:Bt}),qt=function e(){function t(e,t,n){gt(e,e=>{e.call(r,t,n,Fe)})}let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"undefined"==typeof window?null:window
const r=t=>e(t)
if(r.version="3.2.6",r.removed=[],!n||!n.document||9!==n.document.nodeType||!n.Element)return r.isSupported=!1,r
let{document:i}=n
const o=i,l=o.currentScript,{DocumentFragment:u,HTMLTemplateElement:f,Node:d,Element:p,NodeFilter:h,NamedNodeMap:m=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:g,DOMParser:v,trustedTypes:b}=n,y=p.prototype,w=c(y,"cloneNode"),x=c(y,"remove"),k=c(y,"nextSibling"),I=c(y,"childNodes"),M=c(y,"parentNode")
if("function"==typeof f){const e=i.createElement("template")
e.content&&e.content.ownerDocument&&(i=e.content.ownerDocument)}let S,E=""
const{implementation:T,createNodeIterator:C,createDocumentFragment:A,getElementsByTagName:D}=i,{importNode:F}=o
let j={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}
r.isSupported="function"==typeof lt&&"function"==typeof M&&T&&void 0!==T.createHTMLDocument
const{MUSTACHE_EXPR:z,ERB_EXPR:P,TMPLIT_EXPR:_,DATA_ATTR:$,ARIA_ATTR:H,IS_SCRIPT_OR_DATA:L,ATTR_WHITESPACE:R,CUSTOM_ELEMENT:O}=Xt
let{IS_ALLOWED_URI:W}=Xt,N=null
const Z=a({},[...Ft,...jt,...zt,..._t,...Ht])
let B=null
const U=a({},[...Lt,...Rt,...Ot,...Wt])
let G=Object.seal(pt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),V=null,Y=null,J=!0,K=!0,Q=!1,X=!0,q=!1,ee=!0,te=!1,ne=!1,re=!1,ie=!1,oe=!1,le=!1,ae=!0,ue=!1,se=!0,ce=!1,fe={},de=null
const pe=a({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"])
let he=null
const me=a({},["audio","video","img","source","image","track"])
let ge=null
const ve=a({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),be="http://www.w3.org/1998/Math/MathML",ye="http://www.w3.org/2000/svg",we="http://www.w3.org/1999/xhtml"
let xe=we,ke=!1,Ie=null
const Me=a({},[be,ye,we],kt)
let Se=a({},["mi","mo","mn","ms","mtext"]),Ee=a({},["annotation-xml"])
const Te=a({},["title","style","font","a","script"])
let Ce=null
const Ae=["application/xhtml+xml","text/html"]
let De=null,Fe=null
const je=i.createElement("form"),ze=function(e){return e instanceof RegExp||e instanceof Function},Pe=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
if(!Fe||Fe!==e){if(e&&"object"==typeof e||(e={}),e=s(e),Ce=-1===Ae.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,De="application/xhtml+xml"===Ce?kt:xt,N=Tt(e,"ALLOWED_TAGS")?a({},e.ALLOWED_TAGS,De):Z,B=Tt(e,"ALLOWED_ATTR")?a({},e.ALLOWED_ATTR,De):U,Ie=Tt(e,"ALLOWED_NAMESPACES")?a({},e.ALLOWED_NAMESPACES,kt):Me,ge=Tt(e,"ADD_URI_SAFE_ATTR")?a(s(ve),e.ADD_URI_SAFE_ATTR,De):ve,he=Tt(e,"ADD_DATA_URI_TAGS")?a(s(me),e.ADD_DATA_URI_TAGS,De):me,de=Tt(e,"FORBID_CONTENTS")?a({},e.FORBID_CONTENTS,De):pe,V=Tt(e,"FORBID_TAGS")?a({},e.FORBID_TAGS,De):s({}),Y=Tt(e,"FORBID_ATTR")?a({},e.FORBID_ATTR,De):s({}),fe=!!Tt(e,"USE_PROFILES")&&e.USE_PROFILES,J=!1!==e.ALLOW_ARIA_ATTR,K=!1!==e.ALLOW_DATA_ATTR,Q=e.ALLOW_UNKNOWN_PROTOCOLS||!1,X=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,q=e.SAFE_FOR_TEMPLATES||!1,ee=!1!==e.SAFE_FOR_XML,te=e.WHOLE_DOCUMENT||!1,ie=e.RETURN_DOM||!1,oe=e.RETURN_DOM_FRAGMENT||!1,le=e.RETURN_TRUSTED_TYPE||!1,re=e.FORCE_BODY||!1,ae=!1!==e.SANITIZE_DOM,ue=e.SANITIZE_NAMED_PROPS||!1,se=!1!==e.KEEP_CONTENT,ce=e.IN_PLACE||!1,W=e.ALLOWED_URI_REGEXP||Vt,xe=e.NAMESPACE||we,Se=e.MATHML_TEXT_INTEGRATION_POINTS||Se,Ee=e.HTML_INTEGRATION_POINTS||Ee,G=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&ze(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&ze(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(G.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),q&&(K=!1),oe&&(ie=!0),fe&&(N=a({},Ht),B=[],!0===fe.html&&(a(N,Ft),a(B,Lt)),!0===fe.svg&&(a(N,jt),a(B,Rt),a(B,Wt)),!0===fe.svgFilters&&(a(N,zt),a(B,Rt),a(B,Wt)),!0===fe.mathMl&&(a(N,_t),a(B,Ot),a(B,Wt))),e.ADD_TAGS&&(N===Z&&(N=s(N)),a(N,e.ADD_TAGS,De)),e.ADD_ATTR&&(B===U&&(B=s(B)),a(B,e.ADD_ATTR,De)),e.ADD_URI_SAFE_ATTR&&a(ge,e.ADD_URI_SAFE_ATTR,De),e.FORBID_CONTENTS&&(de===pe&&(de=s(de)),a(de,e.FORBID_CONTENTS,De)),se&&(N["#text"]=!0),te&&a(N,["html","head","body"]),N.table&&(a(N,["tbody"]),delete V.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw At('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.')
if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw At('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.')
S=e.TRUSTED_TYPES_POLICY,E=S.createHTML("")}else void 0===S&&(S=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null
let n=null
const r="data-tt-policy-suffix"
t&&t.hasAttribute(r)&&(n=t.getAttribute(r))
const i="dompurify"+(n?"#"+n:"")
try{return e.createPolicy(i,{createHTML:e=>e,createScriptURL:e=>e})}catch(o){return void 0,null}}(b,l)),null!==S&&"string"==typeof E&&(E=S.createHTML(""))
ft&&ft(e),Fe=e}},_e=a({},[...jt,...zt,...Pt]),$e=a({},[..._t,...$t]),He=function(e){yt(r.removed,{element:e})
try{M(e).removeChild(e)}catch(t){x(e)}},Le=function(e,t){try{yt(r.removed,{attribute:t.getAttributeNode(e),from:t})}catch(n){yt(r.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e)if(ie||oe)try{He(t)}catch(n){}else try{t.setAttribute(e,"")}catch(n){}},Re=function(e){let t=null,n=null
if(re)e="<remove></remove>"+e
else{const t=It(e,/^[\r\n\t ]+/)
n=t&&t[0]}"application/xhtml+xml"===Ce&&xe===we&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>")
const r=S?S.createHTML(e):e
if(xe===we)try{t=(new v).parseFromString(r,Ce)}catch(l){}if(!t||!t.documentElement){t=T.createDocument(xe,"template",null)
try{t.documentElement.innerHTML=ke?E:r}catch(l){}}const o=t.body||t.documentElement
return e&&n&&o.insertBefore(i.createTextNode(n),o.childNodes[0]||null),xe===we?D.call(t,te?"html":"body")[0]:te?t.documentElement:o},Oe=function(e){return C.call(e.ownerDocument||e,e,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},We=function(e){return e instanceof g&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof m)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},Ne=function(e){return"function"==typeof d&&e instanceof d},Ze=function(e){let n=null
if(t(j.beforeSanitizeElements,e,null),We(e))return He(e),!0
const i=De(e.nodeName)
if(t(j.uponSanitizeElement,e,{tagName:i,allowedTags:N}),ee&&e.hasChildNodes()&&!Ne(e.firstElementChild)&&Ct(/<[/\w!]/g,e.innerHTML)&&Ct(/<[/\w!]/g,e.textContent))return He(e),!0
if(7===e.nodeType)return He(e),!0
if(ee&&8===e.nodeType&&Ct(/<[/\w]/g,e.data))return He(e),!0
if(!N[i]||V[i]){if(!V[i]&&Ue(i)){if(G.tagNameCheck instanceof RegExp&&Ct(G.tagNameCheck,i))return!1
if(G.tagNameCheck instanceof Function&&G.tagNameCheck(i))return!1}if(se&&!de[i]){const t=M(e)||e.parentNode,n=I(e)||e.childNodes
if(n&&t)for(let r=n.length-1;r>=0;--r){const i=w(n[r],!0)
i.J=(e.J||0)+1,t.insertBefore(i,k(e))}}return He(e),!0}return e instanceof p&&!function(e){let t=M(e)
t&&t.tagName||(t={namespaceURI:xe,tagName:"template"})
const n=xt(e.tagName),r=xt(t.tagName)
return!!Ie[e.namespaceURI]&&(e.namespaceURI===ye?t.namespaceURI===we?"svg"===n:t.namespaceURI===be?"svg"===n&&("annotation-xml"===r||Se[r]):Boolean(_e[n]):e.namespaceURI===be?t.namespaceURI===we?"math"===n:t.namespaceURI===ye?"math"===n&&Ee[r]:Boolean($e[n]):e.namespaceURI===we?!(t.namespaceURI===ye&&!Ee[r])&&!(t.namespaceURI===be&&!Se[r])&&!$e[n]&&(Te[n]||!_e[n]):!("application/xhtml+xml"!==Ce||!Ie[e.namespaceURI]))}(e)?(He(e),!0):"noscript"!==i&&"noembed"!==i&&"noframes"!==i||!Ct(/<\/no(script|embed|frames)/i,e.innerHTML)?(q&&3===e.nodeType&&(n=e.textContent,gt([z,P,_],e=>{n=Mt(n,e," ")}),e.textContent!==n&&(yt(r.removed,{element:e.cloneNode()}),e.textContent=n)),t(j.afterSanitizeElements,e,null),!1):(He(e),!0)},Be=function(e,t,n){if(ae&&("id"===t||"name"===t)&&(n in i||n in je))return!1
if(K&&!Y[t]&&Ct($,t));else if(J&&Ct(H,t));else if(!B[t]||Y[t]){if(!(Ue(e)&&(G.tagNameCheck instanceof RegExp&&Ct(G.tagNameCheck,e)||G.tagNameCheck instanceof Function&&G.tagNameCheck(e))&&(G.attributeNameCheck instanceof RegExp&&Ct(G.attributeNameCheck,t)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(t))||"is"===t&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&Ct(G.tagNameCheck,n)||G.tagNameCheck instanceof Function&&G.tagNameCheck(n))))return!1}else if(ge[t]);else if(Ct(W,Mt(n,R,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==St(n,"data:")||!he[e])if(Q&&!Ct(L,Mt(n,R,"")));else if(n)return!1
return!0},Ue=function(e){return"annotation-xml"!==e&&It(e,O)},Ge=function(e){t(j.beforeSanitizeAttributes,e,null)
const{attributes:n}=e
if(!n||We(e))return
const i={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B,forceKeepAttr:void 0}
let o=n.length
for(;o--;){const a=n[o],{name:u,namespaceURI:s,value:c}=a,f=De(u),d=c
let p="value"===u?d:Et(d)
if(i.attrName=f,i.attrValue=p,i.keepAttr=!0,i.forceKeepAttr=void 0,t(j.uponSanitizeAttribute,e,i),p=i.attrValue,!ue||"id"!==f&&"name"!==f||(Le(u,e),p="user-content-"+p),ee&&Ct(/((--!?|])>)|<\/(style|title)/i,p)){Le(u,e)
continue}if(i.forceKeepAttr)continue
if(!i.keepAttr){Le(u,e)
continue}if(!X&&Ct(/\/>/i,p)){Le(u,e)
continue}q&&gt([z,P,_],e=>{p=Mt(p,e," ")})
const h=De(e.nodeName)
if(Be(h,f,p)){if(S&&"object"==typeof b&&"function"==typeof b.getAttributeType)if(s);else switch(b.getAttributeType(h,f)){case"TrustedHTML":p=S.createHTML(p)
break
case"TrustedScriptURL":p=S.createScriptURL(p)}if(p!==d)try{s?e.setAttributeNS(s,u,p):e.setAttribute(u,p),We(e)?He(e):bt(r.removed)}catch(l){Le(u,e)}}else Le(u,e)}t(j.afterSanitizeAttributes,e,null)},Ve=function e(n){let r=null
const i=Oe(n)
for(t(j.beforeSanitizeShadowDOM,n,null);r=i.nextNode();)t(j.uponSanitizeShadowNode,r,null),Ze(r),Ge(r),r.content instanceof u&&e(r.content)
t(j.afterSanitizeShadowDOM,n,null)}
return r.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,i=null,l=null,a=null
if(ke=!e,ke&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ne(e)){if("function"!=typeof e.toString)throw At("toString is not a function")
if("string"!=typeof(e=e.toString()))throw At("dirty is not a string, aborting")}if(!r.isSupported)return e
if(ne||Pe(t),r.removed=[],"string"==typeof e&&(ce=!1),ce){if(e.nodeName){const t=De(e.nodeName)
if(!N[t]||V[t])throw At("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof d)n=Re("\x3c!----\x3e"),i=n.ownerDocument.importNode(e,!0),1===i.nodeType&&"BODY"===i.nodeName||"HTML"===i.nodeName?n=i:n.appendChild(i)
else{if(!ie&&!q&&!te&&-1===e.indexOf("<"))return S&&le?S.createHTML(e):e
if(n=Re(e),!n)return ie?null:le?E:""}n&&re&&He(n.firstChild)
const s=Oe(ce?e:n)
for(;l=s.nextNode();)Ze(l),Ge(l),l.content instanceof u&&Ve(l.content)
if(ce)return e
if(ie){if(oe)for(a=A.call(n.ownerDocument);n.firstChild;)a.appendChild(n.firstChild)
else a=n
return(B.shadowroot||B.shadowrootmode)&&(a=F.call(o,a,!0)),a}let c=te?n.outerHTML:n.innerHTML
return te&&N["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&Ct(Kt,n.ownerDocument.doctype.name)&&(c="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+c),q&&gt([z,P,_],e=>{c=Mt(c,e," ")}),S&&le?S.createHTML(c):c},r.setConfig=function(){Pe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),ne=!0},r.clearConfig=function(){Fe=null,ne=!1},r.isValidAttribute=function(e,t,n){Fe||Pe({})
const r=De(e),i=De(t)
return Be(r,i,n)},r.addHook=function(e,t){"function"==typeof t&&yt(j[e],t)},r.removeHook=function(e,t){if(void 0!==t){const n=vt(j[e],t)
return-1===n?void 0:wt(j[e],n,1)[0]}return bt(j[e])},r.removeHooks=function(e){j[e]=[]},r.removeAllHooks=function(){j={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},r}()
const en={ALLOWED_TAGS:["p","br","strong","em","u","i","b","span","div","h1","h2","h3","h4","h5","h6","ul","ol","li","a","img","blockquote","code","pre"],ALLOWED_ATTR:["href","title","alt","src","width","height","class","id","style"],ALLOWED_URI_REGEXP:/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,FORBID_TAGS:["script","object","embed","form","input","textarea","select","button"],FORBID_ATTR:["onerror","onload","onclick","onmouseover","onfocus","onblur"],KEEP_CONTENT:!0,RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1,RETURN_DOM_IMPORT:!1,SANITIZE_DOM:!0,WHOLE_DOCUMENT:!1,FORCE_BODY:!1},tn={ALLOWED_TAGS:[],ALLOWED_ATTR:[],KEEP_CONTENT:!0,ALLOW_DATA_ATTR:!1},nn=({scaledDimensions:e})=>C.jsxs("div",{style:{display:"flex",width:`${e.textUsWidth}px`,flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:"8px",flexShrink:0,paddingTop:"8px",paddingBottom:"8px"},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*e.scale))}px`,fontWeight:"800",lineHeight:"normal",letterSpacing:"-0.02em",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*e.scale))}px`,display:"flex",alignItems:"center"},children:"Text us"}),C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(10,Math.round(12*e.scale))}px`,fontWeight:"300",lineHeight:"normal",margin:"0",padding:"0",opacity:.8},children:"Exclusive events, contests, and more"}),C.jsx("iframe",{id:"laylo-drop-1nTsX",src:"https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true",style:{width:"calc(100% + 32px)",height:"60px",maxWidth:"calc(1000px + 32px)",border:"none",borderRadius:"8px",background:"transparent",marginLeft:"-16px",marginRight:"-16px",transform:"translateX(0)",overflow:"hidden"},allow:"web-share",title:"Laylo Signup Form"})]}),rn=(e,t=null)=>{if(!e)return e
if("string"==typeof e&&e.includes("/api/images/serve/")){void 0
const n=e.match(/\/api\/images\/serve\/([a-f0-9-]{36})(?:\/(\w+))?/)
if(n){const e=n[1]
let r=n[2]||"medium"
return t&&(r=t<=150?"small":t<=400?"medium":"large"),void 0,`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/api/images/serve/${e}/${r}`}}if("string"==typeof e&&e.includes("/images/figma-exact/"))return`/images/optimized/${e.split("/").pop()}`
if("string"==typeof e&&e.startsWith("http")){const n=encodeURIComponent(e),r=`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/images/proxy-optimized?url=${n}`
return t?`${r}&w=${t}`:r}if("string"==typeof e&&e.startsWith("/")&&(e.includes("/api/images/serve/")||!e.includes("/images/"))){void 0
const t=e.match(/([a-f0-9-]{36})/)
if(t){const e=t[1]
return void 0,`${"localhost"===window.location.hostname,"https://admin.b2b.click"}/api/images/serve/${e}/medium`}}if("string"==typeof e&&(e.includes("/images/")||e.includes("/custom/images/"))){const n=e.split("/").pop().replace(/\.[^/.]+$/,"")
return t?`/images/optimized/${n}-${t}w.webp`:`/images/optimized/${n}.webp`}return void 0,e},on=e=>"event"===e?[111,222,333]:"hero"===e?[350,700,1050]:[150,300,600],ln=(e,t="event")=>e?on(t).map(t=>`${rn(e,t)} ${t}w`).join(", "):"",an=(e,t="event")=>{if(!e)return""
if(/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return""
const n=("localhost"===window.location.hostname,"https://admin.b2b.click")
return on(t).map(t=>`${n}/images/proxy-optimized?url=${encodeURIComponent(e)}&w=${t}&format=avif ${t}w`).join(", ")}
if("undefined"!=typeof document){const e=document.createElement("style")
e.textContent="\n    @keyframes spin {\n      from { transform: rotate(0deg); }\n      to { transform: rotate(360deg); }\n    }\n  ",document.head.appendChild(e)}const un=new Map,sn=new Map,cn=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2M0gwVjB6bTAgNmgyMXYzSDBWNnptMCA2aDIxdjNIMHYtM3oiIGZpbGw9IiNmZmYiLz4KPHBhdGggZD0iTTAgMGgyMXYxSDBWMHptMCAyaDIxdjFIMFYyem0wIDJoMjF2MUgwVjR6bTAgMmgyMXYxSDBWNnptMCA4aDIxdjFIMHYtMXoiIGZpbGw9IiNjZTExMjQiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"20 1234 5678",maxLength:13,digitLength:11},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI2ZmMDAwMCIvPgo8cGF0aCBkPSJNMTAuNSA0bDEgMi41aDIuNWwtMiAyIDEgMi41LTIuNS0xLTIuNSAxIDEtMi41LTItMmgyLjVsMS0yLjV6IiBmaWxsPSIjZmYwMDAwIi8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiMwMDAiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjAwMDAiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZjZTAwIi8+Cjwvc3ZnPg==",pattern:/^\d{10,12}$/,placeholder:"30 12345678",maxLength:15,digitLength:12},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZWQyOTM5Ii8+Cjwvc3ZnPg==",pattern:/^\d{9,10}$/,placeholder:"1 23 45 67 89",maxLength:14,digitLength:10},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxMC41IiBoZWlnaHQ9IjcuNSIgZmlsbD0iIzAxMjE2OSIvPgo8L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"4 1234 5678",maxLength:12,digitLength:9},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjk5MzMiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTM4ODA4Ii8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:13,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+CjxwYXRoIGQ9Ik0xMC41IDJMMTggNy41IDEwLjUgMTMgMyA3LjUgMTAuNSAyeiIgZmlsbD0iI2ZlZGYwMCIvPgo8L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"11 99999-9999",maxLength:15,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjY2UxMTI2Ii8+Cjwvc3ZnPg==",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:13,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjMiIGZpbGw9IiNiYzAwMmQiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"90-1234-5678",maxLength:13,digitLength:11}],fn=(e,t)=>{const n="string"==typeof e?e.replace(/[^\d]/g,""):"",r=cn.find(e=>e.id===t)
if(!r||0===n.length)return n
const i=n.slice(0,r.digitLength)
switch(r.code){case"+1":return i.length<=3?i.length>0?`(${i}`:"":i.length<=6?`(${i.slice(0,3)}) ${i.slice(3)}`:`(${i.slice(0,3)}) ${i.slice(3,6)}-${i.slice(6)}`
case"+44":case"+49":return i.length<=2?i:i.length<=6?`${i.slice(0,2)} ${i.slice(2)}`:`${i.slice(0,2)} ${i.slice(2,6)} ${i.slice(6)}`
case"+33":return i.length<=1?i:i.length<=3?`${i.slice(0,1)} ${i.slice(1)}`:i.length<=5?`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3)}`:i.length<=7?`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3,5)} ${i.slice(5)}`:`${i.slice(0,1)} ${i.slice(1,3)} ${i.slice(3,5)} ${i.slice(5,7)} ${i.slice(7)}`
default:return i.length<=3?i:i.length<=6?`${i.slice(0,3)} ${i.slice(3)}`:`${i.slice(0,3)} ${i.slice(3,6)} ${i.slice(6)}`}},dn=e=>cn.find(t=>t.id===e)||cn[0]
A.memo(({card:e,scaledDimensions:t})=>(A.useCallback(t=>{t.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(void 0,window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},[e.isRealEvent,e.hasTicketLink,e.ticketsUrl,e.title]),A.useCallback(()=>{e.isRealEvent&&e.hasTicketLink&&(void 0,window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},[e.isRealEvent,e.hasTicketLink,e.ticketsUrl,e.title]),A.useMemo(()=>({onMouseEnter:t=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(t.target.style.transform="scale(1.015) translateY(-2px)",t.target.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)")},onMouseLeave:e=>{e.target.style.transform="scale(1) translateY(0px)",e.target.style.boxShadow="none"},onMouseDown:t=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(t.target.style.transform="scale(0.995) translateY(0px)")},onMouseUp:t=>{e.isRealEvent&&e.ticketsUrl&&"#"!==e.ticketsUrl&&(t.target.style.transform="scale(1.015) translateY(-2px)")}}),[e.isRealEvent,e.ticketsUrl]),null))
const pn=A.memo(()=>{void 0,A.useEffect(()=>{const e="events-grid-scrollbar-styles"
if(!document.getElementById(e)){const t=document.createElement("style")
t.id=e,t.textContent="\n  .events-grid-scrollable::-webkit-scrollbar {\n    width: 4px;\n  }\n  .events-grid-scrollable::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .events-grid-scrollable::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 2px;\n  }\n  .events-grid-scrollable::-webkit-scrollbar-thumb:hover {\n    background: rgba(255, 255, 255, 0.5);\n  }\n",document.head.appendChild(t)}return()=>{const t=document.getElementById(e)
t&&t.remove()}},[])
const{trackEvent:e}=V(),[t,n]=A.useState({canScrollUp:!1,canScrollDown:!1,isScrollable:!1}),r=A.useRef(null),i=A.useCallback(()=>{const e=r.current
if(!e)return
const{scrollTop:t,scrollHeight:i,clientHeight:o}=e
n({canScrollUp:t>0,canScrollDown:t<i-o-1,isScrollable:i>o})},[])
A.useEffect(()=>{i()},[i])
const[o,l]=A.useState(!0)
A.useEffect(()=>{l(!0),e("component_load",{component:"FigmaDesktop",viewport_type:"desktop"})},[e]),A.useEffect(()=>{const e=document.createElement("style")
return e.textContent="\n      @keyframes shake {\n        0%, 100% { transform: translateX(0); }\n        25% { transform: translateX(-4px); }\n        75% { transform: translateX(4px); }\n      }\n      .shake {\n        animation: shake 400ms cubic-bezier(0.4, 0, 0.2, 1);\n      }\n    ",document.head.appendChild(e),()=>{document.head.removeChild(e)}},[])
const[a,u]=A.useState(null),[s,c]=A.useState([]),[f,p]=A.useState([]),[h,m]=A.useState(""),[g,v]=A.useState(!0),[b,y]=A.useState(null),[w,x]=A.useState(""),[k,I]=A.useState(!1),[M,S]=A.useState(!1),[E,T]=A.useState("us"),[D,F]=A.useState("normal"),[j,z]=A.useState(!1),[P,_]=A.useState(!1),[$,H]=A.useState(""),[L,R]=A.useState(!1),[O,W]=A.useState(""),[B,U]=A.useState("normal"),[G,Y]=A.useState(0),[J,K]=A.useState(!1),[Q,X]=A.useState(!1),q=A.useRef(null),ee=A.useRef(null),te=A.useRef(null),ne=A.useRef(!0),[re,ie]=A.useState(!1),[oe,le]=A.useState("Events"),[ae,ue]=A.useState(!0),[se,ce]=A.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,scale:1});((e,t=null)=>{const[n,r]=A.useState({width:0,height:0}),i=A.useRef(e),o=A.useRef(t)
i.current=e,o.current=t
const l=A.useCallback(e=>{r(e),i.current&&i.current(e)},[])
return A.useEffect(()=>{void("undefined"==typeof window||N||"ResizeObserver"in window&&(N=new ResizeObserver(e=>{requestAnimationFrame(()=>{e.forEach(e=>{const t=Z.get(e.target)
if(t){const{width:n,height:r}=e.contentRect
t.forEach(e=>e({width:n,height:r}))}})})})))
const e=o.current||window
if(N&&e!==window)return Z.has(e)||Z.set(e,new Set),Z.get(e).add(l),N.observe(e),()=>{const t=Z.get(e)
t&&(t.delete(l),0===t.size&&(Z.delete(e),N.unobserve(e)))}
{let e=null,t=null
const n=()=>{e&&cancelAnimationFrame(e),t&&clearTimeout(t),t=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
l({width:e,height:t})})},100)}
return window.addEventListener("resize",n,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
l({width:e,height:t})}),()=>{window.removeEventListener("resize",n),e&&cancelAnimationFrame(e),t&&clearTimeout(t)}}},[l]),n})(e=>{const{width:t}=e,n=t-(t<=360?16:t<=480?24:32),r=Math.max(829,789)
let i=Math.min(n/r,1144/r)
i<.25&&(i=.25),i>1.8&&(i=1.8)
const o={heroWidth:Math.round(299*i*.9),heroHeight:Math.round(299*i*.9),rightHeroWidth:Math.round(498*i),rightHeroHeight:Math.round(299*i),gap:Math.round(32*i),containerWidth:1192,eventsWidth:Math.round(440*i),textUsWidth:Math.round(299*i),eventsTextGap:Math.round(50*i),eventCardWidth:220,eventCardHeight:85,scale:i}
ie(t<=850),ce(o)}),A.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script")
e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=e=>{void 0},e.onload=()=>{void 0},document.head.appendChild(e)}},[]),A.useCallback(e=>{if(!e)return"Asbury Park, NJ"
const t=e.split(",").map(e=>e.trim())
if(t.length>=2){const e=t[0]
return/^\d/.test(e)?t.slice(1,3).join(", "):t.slice(0,2).join(", ")}return e.length>25?e.substring(0,22)+"...":e},[])
const fe=A.useCallback(async()=>{try{v(!0),y(null)
const e="homepage-data-v2",t=un.get(e)
if(t&&Date.now()-t.timestamp<3e5)return void 0,u(t.data.homeSettings),c(t.data.featuredEvents||[]),p(t.data.homepageEvents||[]),m(t.data.formattedDate||"March 29th, 9:00 P.M."),v(!1),void 0
const n="/api/home-settings/homepage-data"
"localhost"===window.location.hostname
const r=await fetch(n)
if(void 0,!r.ok)throw void 0,new Error(`HTTP ${r.status}: Failed to fetch homepage data`)
const i=await r.json()
if(!i||"object"!=typeof i)throw new Error("Invalid API response format")
const o=i.homeSettings||{}
o.event_title||o.artist_name
const l=Array.isArray(i.featuredEvents)?i.featuredEvents:[],a=Array.isArray(i.homepageEvents)?i.homepageEvents:[]
0===l.length,0
const s=l.filter(e=>!(!e||"object"!=typeof e||(!e.id||!e.title)&&(void 0,1))),f=a.filter(e=>!(!e||"object"!=typeof e||(!e.id||!e.title)&&(void 0,1)))
void 0,un.set(e,{data:i,timestamp:Date.now()}),u(o),c(s),p(f)
let d=i.formattedDate||"March 29th, 9:00 P.M."
if(s.length>0&&s[0].event_date){const e=new Date(s[0].event_date),t={month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}
d=e.toLocaleDateString("en-US",t).replace(",","th,")}m(d)}catch(e){void 0,y(e.message),u({event_title:"EVENT TITLE",artist_name:"Artist Name",event_address:"101 Address Drive, Asbury Park, NJ",event_image:null,tickets_url:null,instagram_url:null,tiktok_url:null,twitter_url:null,email_url:null}),c([]),p([]),m("March 29th, 9:00 P.M.")}finally{v(!1)}},[])
A.useEffect(()=>{performance.now(),fe().finally(()=>{performance.now()})},[fe]),A.useEffect(()=>(ne.current=!0,()=>{ne.current=!1,te.current&&(clearInterval(te.current),te.current=null)}),[]),A.useEffect(()=>{!P&&te.current&&(clearInterval(te.current),te.current=null,Y(0),K(!1))},[P])
const de=A.useCallback(()=>{void 0,te.current&&(clearInterval(te.current),te.current=null),Y(60),K(!1),te.current=setInterval(()=>{if(!ne.current)return te.current&&(clearInterval(te.current),te.current=null),void 0
Y(e=>(void 0,e<=1?(void 0,ne.current&&K(!0),te.current&&(clearInterval(te.current),te.current=null),0):e-1))},1e3)},[])
A.useEffect(()=>{void 0,void 0,P&&O&&0===G&&!J&&de()},[P,O]),A.useCallback(e=>/^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/.test(e.replace(/\D/g,"")),[])
const pe=A.useCallback(async()=>{const e=w.trim()
if(!e||k)return
if("5555555555"===e.replace(/\D/g,""))return void 0,I(!0),F("loading"),setTimeout(()=>{F("valid"),W(e),I(!1),setTimeout(()=>{_(!0)},200)},800),void 0
const t=dn(E)
if(!((e,t)=>{const n=e.replace(/[^\d]/g,""),r=cn.find(e=>e.id===t)
return r?r.pattern.test(n):n.length>=10&&n.length<=15})(e,E))return void 0,F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400)),void 0
try{I(!0),F("loading")
const n=("localhost"===window.location.hostname,"https://admin.b2b.click"),r=await fetch(`${n}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:t.code})}),i=await r.json()
r.ok&&i.success?(void 0,i.requiresVerification?(void 0,F("valid"),W(e),setTimeout(()=>{_(!0)},500)):(S(!0),F("valid"),x(""),setTimeout(()=>{S(!1),F("normal")},3e3))):(void 0,F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400)))}catch(n){void 0,F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400))}finally{I(!1)}},[w,k,E]),he=A.useCallback(async()=>{const e=$.trim()
if(e&&!L){if(void 0,"5555555555"===O.replace(/\D/g,"")&&4===e.length)return U("valid"),F("valid"),S(!0),setTimeout(()=>{_(!1),H(""),W(""),x(""),S(!1),F("normal"),U("normal"),Y(0),K(!1),te.current&&(clearInterval(te.current),te.current=null)},3e3),void 0
if(!/^\d{4}$/.test(e))return void 0,U("invalid"),F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400)),void 0
try{R(!0),F("loading")
const t=("localhost"===window.location.hostname,"https://admin.b2b.click"),n=await fetch(`${t}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:O,code:e})}),r=await n.json()
n.ok&&r.success?(void 0,U("valid"),F("valid"),S(!0),setTimeout(()=>{_(!1),H(""),W(""),x(""),S(!1),F("normal"),U("normal"),Y(0),K(!1),te.current&&(clearInterval(te.current),te.current=null)},3e3)):(void 0,U("invalid"),F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400)))}catch(t){void 0,F("invalid"),ee.current&&(ee.current.classList.add("shake"),setTimeout(()=>{ee.current?.classList.remove("shake"),F("normal")},400))}finally{R(!1)}}},[$,L,O]),me=A.useCallback(async()=>{if(J&&!Q&&O)try{X(!0)
const e=("localhost"===window.location.hostname,"https://admin.b2b.click"),t=await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:O})});(await t.json()).success,void 0,de()}catch(e){void 0,de()}finally{X(!1)}},[J,Q,O])
A.useCallback(()=>{z(!0)},[]),A.useCallback(()=>{z(!1)},[]),A.useCallback(()=>{z(!1)},[])
const ge=A.useCallback(e=>{const t=e.target.value.replace(/\D/g,"")
t.length<=4&&(H(t),4===t.length?U("filled"):U("normal"))},[]),ve=A.useCallback(()=>{_(!1),H(""),W(""),F("normal")},[]),be=A.useCallback(e=>{const t=e.target,n=d(t.value),r=dn(E),i=t.selectionStart,o=n.replace(/[^\d]/g,"")
if(o.length>r.digitLength)return e.preventDefault(),void 0
const l=fn(o,E)
let a=i
if(l.length>w.length){const e=w.slice(0,i).replace(/\d/g,"").length,t=l.slice(0,i+(l.length-w.length)).replace(/\d/g,"").length
a=i+(t-e)}a=Math.min(a,l.length),a=Math.max(a,0),x(l),requestAnimationFrame(()=>{t===document.activeElement&&t.setSelectionRange(a,a)})},[E,w]),ye=A.useCallback(e=>{if("Backspace"===e.key){const t=e.target,n=t.selectionStart,r=t.value
if(n>0){const i=r[n-1]
if([" ","(",")","-"].includes(i)&&n>1){e.preventDefault()
const i=(r.slice(0,n-2)+r.slice(n)).replace(/[^\d]/g,""),o=fn(i,E)
x(o),requestAnimationFrame(()=>{if(t===document.activeElement){const e=Math.max(0,n-2)
t.setSelectionRange(e,e)}})}}}},[E]),we=A.useCallback(e=>{const t=e.target.value,n=dn(t)
if(T(t),q.current&&n.flag&&(q.current.src=n.flag,q.current.alt=n.name),w){const e=w.replace(/[^\d]/g,""),n=fn(e,t)
x(n)}void 0},[w]),xe=A.useCallback(e=>{le(e),"About"===e?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":"Contact"===e&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},[]),ke=A.useCallback((e,t)=>{const n=oe===e
return{position:"absolute",left:t,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:n?"#000":"transparent",boxShadow:n?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:n?"scale(1)":"scale(0.95)",opacity:n?1:.8}},[oe]),Ie=A.useCallback(e=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:oe===e?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"}),[oe]),Me=A.useMemo(()=>{const e=[],t=[]
s.forEach((t,n)=>{try{let r=new Date,i="Tue, Sep 02 @ 10:00PM",o="02",l="SEP"
if(t.event_date){const e=t.event_date
let n=sn.get(e)
if(n)({formattedDate:i,day:o,month:l,eventDate:r}=n)
else{const a=new Date(t.event_date)
isNaN(a.getTime())||(r=a,i=r.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit"}).replace(","," @")+" 10:00PM",o=r.getDate().toString().padStart(2,"0"),l=r.toLocaleDateString("en-US",{month:"short"}).toUpperCase(),n={formattedDate:i,day:o,month:l,eventDate:r},sn.set(e,n))}}const a=t.title||t.artist_name||`Event ${n+1}`
let u="Venue Address"
if(t.event_address){const e=t.event_address.split(",").map(e=>e.trim())
e.length>=2?(u=`${e[0]}, ${e[1]}`,u.length>25&&e.length>=3&&(u=`${e[1]}, ${e[2]}`)):u=t.event_address}const s=t.cover_image||"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIyIiBoZWlnaHQ9IjEyNCIgdmlld0JveD0iMCAwIDIyMiAxMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjIiIGhlaWdodD0iMTI0IiBmaWxsPSIjMTYxNjE2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1NjU2IiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTQiPkV2ZW50IEltYWdlPC90ZXh0Pgo8L3N2Zz4K",c=t.external_ticket_url||t.posh_embed_url||"#",f=t.display_tickets&&c&&"#"!==c
void 0,e.push({id:`event-${t.id}`,title:a,date:i,day:o,month:l,location:u,coverImage:s,ticketsUrl:c,hasTicketLink:f,buttonText:t.buy_button_text||"View Event",isRealEvent:!0,showOnHomepage:t.show_on_homepage,eventData:t,eventDate:r})}catch(r){void 0}}),e.sort((e,t)=>{const n=new Date(e.eventDate)
return new Date(t.eventDate).getTime()-n.getTime()})
const n=new Set(s.map(e=>e.id))
f.forEach((e,r)=>{if(!n.has(e.id))try{let n=new Date,r="Tue, Sep 02 @ 10:00PM",i="02"
e.event_date&&(n=new Date(e.event_date),isNaN(n.getTime())||(r=n.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit",hour:"numeric",minute:"2-digit",hour12:!0}).replace(","," @"),i=n.getDate().toString().padStart(2,"0")))
const o=e.title||e.artist_name||"Event Title",l=e.event_address||e.venue_name||"Location TBA"
let a=null
e.cover_image&&(a=e.cover_image.startsWith("/")?e.cover_image:`/${e.cover_image}`)
const u=e.external_ticket_url||"#",s="#"!==u&&e.display_tickets
t.push({id:e.id,title:o,artist_name:e.artist_name||"",location:l,date:r,day:i,coverImage:a,ticketsUrl:u,hasTicketLink:s,buttonText:e.buy_button_text||"View Event",isRealEvent:!0,showOnHomepage:e.show_on_homepage,eventData:e,eventDate:n,cardType:"regular"})}catch(i){void 0}}),e.sort((e,t)=>{const n=new Date(e.eventData.created_at||e.eventDate),r=new Date(t.eventData.created_at||t.eventDate)
return n.getTime()-r.getTime()}),t.sort((e,t)=>{const n=new Date(e.eventDate)
return new Date(t.eventDate).getTime()-n.getTime()})
const r=new Date
return r.setHours(0,0,0,0),void 0,{featuredCards:e.filter(e=>{const t=new Date(e.eventDate)
return t.setHours(0,0,0,0),!!ae||t<r}),regularCards:t.filter(e=>{const t=new Date(e.eventDate)
return t.setHours(0,0,0,0),!!ae||t<r})}},[s,f,ae])
A.useEffect(()=>{Me.featuredCards&&Me.featuredCards.length>0&&(void 0,Me.featuredCards.forEach((e,t)=>{if(e.coverImage){const t=document.createElement("link")
t.rel="preload",t.as="image",t.type="image/avif"
const n=("localhost"===window.location.hostname,"https://admin.b2b.click")
t.href=`${n}/images/proxy-optimized?url=${encodeURIComponent(e.coverImage)}&w=111&format=avif`,document.head.appendChild(t)
const r=document.createElement("link")
r.rel="preload",r.as="image",r.type="image/webp",r.href=rn(e.coverImage,111),document.head.appendChild(r)}}),Me.regularCards&&Me.regularCards.length>0&&Me.regularCards.slice(0,4).forEach((e,t)=>{if(e.coverImage){const t=new Image
t.src=rn(e.coverImage,400),t.onload=()=>{},t.onerror=()=>{}}}))},[Me])
const Se=A.useMemo(()=>Me.featuredCards&&Me.featuredCards.length>0?Me.featuredCards[0]:null,[Me])
return g?C.jsx("div",{className:"homepage-root",children:C.jsx("div",{className:"homepage-content",children:C.jsx("div",{className:"desktop-container",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"},children:C.jsxs("div",{style:{color:"#FFF",fontSize:"18px",fontFamily:"Inter",textAlign:"center"},children:[C.jsx("div",{children:"Loading homepage data..."}),b&&C.jsxs("div",{style:{color:"#FF6B6B",fontSize:"14px",marginTop:"10px",opacity:.8},children:[b,C.jsx("div",{style:{fontSize:"12px",marginTop:"5px",opacity:.7},children:"Falling back to default content..."})]})]})})})}):(b&&!a,0,C.jsx("div",{className:"homepage-root",children:C.jsx("div",{className:"homepage-content",children:C.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${se.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"100vh",padding:"0 20px",boxSizing:"border-box"},children:C.jsxs("div",{style:{width:"100%",position:"relative"},children:[C.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[C.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.filter="brightness(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1.05)"}}),C.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[C.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),C.jsx("div",{style:ke("Events","4.21px"),onClick:()=>xe("Events"),children:C.jsx("span",{style:Ie("Events"),children:"Events"})}),C.jsx("div",{style:ke("About","100.14px"),onClick:()=>xe("About"),children:C.jsx("span",{style:Ie("About"),children:"About"})}),C.jsx("div",{style:ke("Contact","196.07px"),onClick:()=>xe("Contact"),children:C.jsx("span",{style:Ie("Contact"),children:"Contact"})})]})]}),C.jsxs("div",{style:{position:"relative",display:"flex",width:"100%",margin:"24px 0 0 0",padding:"0",flexDirection:se.containerWidth>=1024?"row":"column",gap:se.containerWidth>=1024?`${Math.max(24,Math.round(32*se.scale))}px`:"20px",alignItems:"flex-start"},children:[se.containerWidth>=1024?C.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"stretch",gap:`${Math.max(6,Math.round(8*se.scale))}px`,width:`${se.heroWidth}px`,flexShrink:0},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Up Next"}),C.jsxs("div",{onClick:e=>{void 0,e.preventDefault(),e.stopPropagation(),void 0,Se?.external_ticket_url&&window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")},style:{width:`${se.heroWidth}px`,height:`${se.heroWidth}px`,position:"relative",flexShrink:0,margin:"0",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)",e.currentTarget.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1) translateY(0px)",e.currentTarget.style.boxShadow="none"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[C.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:Se?.cover_image?C.jsxs("picture",{children:[C.jsx("source",{srcSet:an(Se.cover_image,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),C.jsx("source",{srcSet:ln(Se.cover_image,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),C.jsx("img",{src:rn(Se.cover_image,375),alt:`${Se.artist_name||Se.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>{},onError:e=>{void 0,e.target.src="/images/optimized/hero-left-image-375w.jpg"},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):C.jsxs("picture",{children:[C.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),C.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),C.jsx("img",{src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>{},onError:e=>{},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),C.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),C.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px"},children:[C.jsxs("div",{style:{display:"flex",flex:"1",padding:"4px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[C.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"2px"},children:[C.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:C.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),C.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:Se?.event_date?new Date(Se.event_date).toLocaleDateString("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).replace(",","th,"):h})]}),C.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[C.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[C.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),C.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),C.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:Se?.location||a?.event_location||"Asbury Park, NJ"})]})]}),C.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:C.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.stopPropagation(),e.target.style.transform="scale(1.05)",e.target.style.background="rgba(35, 35, 35, 0.98)",e.target.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.stopPropagation(),e.target.style.transform="scale(1)",e.target.style.background="rgba(15, 15, 15, 0.95)",e.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:e=>{e.stopPropagation(),void 0,Se?.external_ticket_url&&window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")},children:C.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:Se?.external_ticket_url?"Get Tickets":"View Event"})})})]}),C.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box"},children:C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:se.heroWidth-24+"px"},children:Se?.artist_name||Se?.title||a?.event_title||"EVENT TITLE"})})]})]}):C.jsx("div",{onClick:e=>{Se?.external_ticket_url?(void 0,window.open(Se.external_ticket_url,"_blank","noopener,noreferrer")):void 0},style:{width:"100%",height:`${se.heroHeight}px`,position:"relative",flexShrink:0,margin:"0",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden",background:"#161616",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)"},onMouseEnter:e=>{e.target.style.transform="scale(1.005)",e.target.style.boxShadow="0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseLeave:e=>{e.target.style.transform="scale(1)",e.target.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)"}}),se.containerWidth>=1024&&C.jsxs("div",{style:{display:"flex",flex:"1",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:`${Math.max(6,Math.round(8*se.scale))}px`,minWidth:`${Math.max(450,Math.round(se.eventsWidth))}px`,maxWidth:`${Math.round(se.eventsWidth+200)}px`,height:`${Math.max(20,Math.round(26*se.scale))+Math.max(6,Math.round(8*se.scale))+se.heroWidth}px`,overflow:"hidden"},children:[C.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"0",padding:"0"},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Events"}),C.jsxs("div",{style:{display:"flex",width:`${Math.max(75,Math.round(95*se.scale))}px`,height:`${Math.max(22,Math.round(28*se.scale))}px`,padding:`${Math.max(1,Math.round(1.5*se.scale))}px`,justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:`${Math.max(6,Math.round(8*se.scale))}px`,background:ae?"rgba(111, 111, 111, 0.49)":"rgba(111, 111, 111, 0.69)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"},onClick:()=>ue(!ae),role:"switch","aria-checked":ae,"aria-label":`Switch to ${ae?"Past":"All"} events`,tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),ue(!ae))},children:[C.jsx("div",{style:{position:"absolute",width:`${Math.max(36,Math.round(46*se.scale))}px`,height:`${Math.max(19,Math.round(24*se.scale))}px`,borderRadius:`${Math.max(4,Math.round(6*se.scale))}px`,border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:ae?`${Math.max(1,Math.round(1.5*se.scale))}px`:`${Math.max(37,Math.round(47*se.scale))}px`,top:`${Math.max(1,Math.round(1.5*se.scale))}px`,transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),C.jsx("div",{style:{display:"flex",padding:`${Math.max(2,Math.round(3*se.scale))}px ${Math.max(7,Math.round(10*se.scale))}px`,alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:`${Math.max(5,Math.round(7*se.scale))}px`,position:"relative",zIndex:2},children:C.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:`${Math.max(9,Math.round(11*se.scale))}px`,fontStyle:"normal",fontWeight:ae?"590":"400",lineHeight:`${Math.max(12,Math.round(15*se.scale))}px`,letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"All"})}),C.jsx("div",{style:{display:"flex",padding:`${Math.max(2,Math.round(3*se.scale))}px ${Math.max(7,Math.round(10*se.scale))}px`,alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:C.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:`${Math.max(9,Math.round(11*se.scale))}px`,fontStyle:"normal",fontWeight:ae?"400":"590",lineHeight:`${Math.max(12,Math.round(15*se.scale))}px`,letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),C.jsx("div",{style:{position:"relative",width:"100%",height:`${se.heroWidth}px`},children:C.jsx("div",{ref:r,className:"events-grid-scrollable",onScroll:i,style:{position:"relative",display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gridAutoRows:"min-content",rowGap:`${Math.max(4,Math.round(8*se.scale))}px`,columnGap:`${Math.max(4,Math.round(8*se.scale))}px`,width:"100%",height:"100%",alignItems:"stretch",overflowY:"auto",overflowX:"hidden",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch",scrollbarWidth:"thin",scrollbarColor:"rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",maskImage:t.isScrollable?`linear-gradient(to bottom, ${t.canScrollUp?"transparent 0%, black 8%":"black 0%"}, black 8%, black 92%, ${t.canScrollDown?"black 92%, transparent 100%":"black 100%"})`:"none",WebkitMaskImage:t.isScrollable?`linear-gradient(to bottom, ${t.canScrollUp?"transparent 0%, black 8%":"black 0%"}, black 8%, black 92%, ${t.canScrollDown?"black 92%, transparent 100%":"black 100%"})`:"none"},children:(()=>{const e=(se.heroWidth-2*Math.max(4,Math.round(8*se.scale)))/3,t=Math.min(1,e/124)
return C.jsx(C.Fragment,{children:0===Me.regularCards.length&&0===Me.featuredCards.length?C.jsxs("div",{style:{gridColumn:"1 / -1",gridRow:"1 / -1",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[C.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:"0.8"},children:"No Events Available"}),C.jsx("div",{style:{fontSize:"14px",fontWeight:"400",opacity:"0.6",maxWidth:"300px",lineHeight:"1.4"},children:'Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.'})]}):[...Me.featuredCards,...Me.regularCards].slice(0,6).map((e,n)=>C.jsx("article",{style:{display:"block",width:"100%",height:"100%",minHeight:"90px",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform",zIndex:1,clear:"both"},children:C.jsxs("div",{style:{width:"100%",height:`${Math.max(87,Math.round(124*t)-6)}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:`${Math.max(6,Math.round(8*t))}px`},children:[C.jsx("div",{style:{position:"absolute",left:`${Math.max(6,Math.round(8*t))}px`,top:`${Math.max(6,Math.round(8*t))}px`,width:`${Math.max(79,Math.round(105*t))}px`,height:`${Math.max(79,Math.round(105*t))}px`,flexShrink:0,borderRadius:`${Math.max(13,Math.round(18*t))}px`,overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:e=>{e.preventDefault(),e.stopPropagation()},children:C.jsx("img",{src:e.coverImage||e.image_url||"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",alt:`${e.title} event cover`,loading:"lazy",onError:e=>{e.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K"},onLoad:e=>{e.target.style.backgroundColor="transparent"},style:{width:"100%",height:"100%",borderRadius:`${Math.max(13,Math.round(18*t))}px`,objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),C.jsxs("div",{style:{display:"flex",width:`calc(100% - ${Math.max(99,Math.round(125*t))}px)`,padding:`${Math.max(1,Math.round(2*t))}px ${Math.max(6,Math.round(8*t))}px ${Math.max(1,Math.round(2*t))}px ${Math.max(6,Math.round(8*t))}px`,flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:`${Math.max(99,Math.round(125*t))}px`,top:`${Math.max(6,Math.round(8*t))}px`,height:`${Math.max(79,Math.round(105*t))}px`,boxSizing:"border-box"},children:[C.jsxs("div",{style:{width:"100%",minHeight:`${Math.max(50,Math.round(84*t))}px`,height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[C.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:`${Math.max(10,Math.round(16*t))}px`,lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:`${Math.max(12,Math.round(20*t))}px`,height:"auto",margin:`0 0 ${Math.max(2,Math.round(4*t))}px 0`,padding:"0",overflow:"visible",textOverflow:"unset",whiteSpace:"normal",wordWrap:"break-word",hyphens:"auto"},children:e.title}),C.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:`${Math.max(3,Math.round(6*t))}px`,padding:`0px 0px 0px ${Math.max(1,Math.round(2*t))}px`},children:[C.jsx("svg",{width:Math.max(7,Math.round(12*t)),height:Math.max(7,Math.round(12*t)),viewBox:"0 0 10 10",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:C.jsx("path",{d:"M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z",fill:"currentColor"})}),C.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:`${Math.max(7,Math.round(12*t))}px`,lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:`${Math.max(8,Math.round(14*t))}px`,margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),C.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:`${Math.max(3,Math.round(6*t))}px`,padding:`0px ${Math.max(1,Math.round(2*t))}px`},children:[C.jsx("svg",{width:Math.max(7,Math.round(12*t)),height:Math.max(7,Math.round(12*t)),viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:C.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),C.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:`${Math.max(7,Math.round(12*t))}px`,lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:`${Math.max(8,Math.round(14*t))}px`,margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),C.jsx("div",{style:{width:"100%",height:`${Math.max(18,Math.round(32*t))}px`,display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:`${Math.max(3,Math.round(6*t))}px`,padding:`0px ${Math.max(1,Math.round(2*t))}px 0px 0px`,position:"absolute",bottom:`calc(100% - ${Math.max(80,Math.round(105*t))}px)`,left:"0px"},children:e.isRealEvent&&e.hasTicketLink?C.jsx("button",{onClick:t=>{t.stopPropagation(),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:`${Math.max(25,Math.round(46*t))}px`,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:`${Math.max(6,Math.round(12*t))}px`,padding:`${Math.max(8,Math.round(16*t))}px ${Math.max(8,Math.round(15*t))}px`,width:`calc(100% - ${Math.max(2,Math.round(4*t))}px)`,height:`${Math.max(18,Math.round(32*t))}px`,border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:`${Math.max(8,Math.round(14*t))}px`,lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.02)",e.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-desktop-${e.id}`))})})()})})]})]}),se.containerWidth>=1024&&C.jsxs("div",{style:{position:"relative",display:"flex",width:"100%",margin:"16px 0 0 0",padding:"0",justifyContent:"flex-start",alignItems:"flex-start",gap:"32px",flexDirection:"row"},children:[C.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:`${Math.max(6,Math.round(8*se.scale))}px`,alignItems:"flex-start"},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:`${Math.max(20,Math.round(26*se.scale))}px`,fontWeight:"800",lineHeight:"normal",letterSpacing:"-0.02em",margin:"0",padding:"0",height:`${Math.max(20,Math.round(26*se.scale))}px`,display:"flex",alignItems:"center"},children:"Watch"}),C.jsxs("div",{onClick:()=>window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank"),style:{width:`${Math.round(.75*se.rightHeroWidth)}px`,height:`${Math.round(.75*se.rightHeroHeight)}px`,position:"relative",flexShrink:0,cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"24px"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)",e.currentTarget.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.25)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1) translateY(0px)",e.currentTarget.style.boxShadow="none"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.995) translateY(0px)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1.015) translateY(-2px)"},children:[C.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:`${Math.round(.75*se.rightHeroWidth)}px`,height:`${Math.round(.75*se.rightHeroHeight)}px`,borderRadius:"24px",overflow:"hidden"},children:[C.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"100%",height:"100%",overflow:"hidden"},children:C.jsx("iframe",{src:"https://www.youtube.com/embed/vEHTO3gf1jk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=vEHTO3gf1jk&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&quality=hd720&start=0&enablejsapi=1",title:"Henry Fong YouTube Video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,loading:"eager",style:{position:"absolute",top:"50%",left:"50%",width:"100%",height:"100%",transform:"translate(-50%, -50%) scale(1.5)",border:"none",pointerEvents:"none",opacity:1}})}),C.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"24px",zIndex:1}})]}),C.jsxs("div",{style:{position:"absolute",left:"0px",top:Math.min(Math.round(.75*se.rightHeroHeight),350)-54+"px",display:"flex",width:"100%",height:"44px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"16px",zIndex:2},children:[C.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"4px",flex:"1"},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:(Math.round(.75*se.rightHeroWidth)>=300?Math.round(.75*se.rightHeroWidth)-150:Math.round(.75*se.rightHeroWidth)-60)+"px"},children:"Watch on YouTube"}),C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"10px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live on YouTube"})]}),Math.round(.75*se.rightHeroWidth)>=300&&C.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"112px",height:"44px",justifyContent:"center",alignItems:"center",borderRadius:"22px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.target.style.transform="scale(1.05)",e.target.style.background="rgba(76, 76, 76, 0.90)"},onMouseLeave:e=>{e.target.style.transform="scale(1)",e.target.style.background="rgba(38, 38, 38, 0.80)"},onMouseDown:e=>{e.target.style.transform="scale(0.95)"},onMouseUp:e=>{e.target.style.transform="scale(1.05)"},children:C.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",lineHeight:"1.2",pointerEvents:"none"},children:"Watch now"})})]})]})]}),C.jsx(nn,{scaledDimensions:se,phoneNumber:w,setPhoneNumber:x,phoneSubmitting:k,phoneSubmitted:M,phoneInputState:D,selectedCountryId:E,setSelectedCountryId:T,flagImageRef:q,phoneContainerRef:ee,showVerification:P,verificationPhone:O,verificationCode:$,setVerificationCode:H,verificationSubmitting:L,verificationState:B,resendCountdown:G,canResend:J,resendSubmitting:Q,handlePhoneSubmit:pe,handleVerificationSubmit:he,handleResendCode:me,handlePhoneChange:be,handlePhoneKeyDown:ye,handleCountryChange:we,handleVerificationChange:ge,handleBackToPhone:ve})]}),C.jsx("div",{style:{position:"relative",display:se.containerWidth>=1024?"none":"flex",width:"100%",margin:"8px 0 0 0",padding:"0",justifyContent:"flex-start",alignItems:"flex-start",gap:`${se.eventsTextGap}px`,flexDirection:re?"column":"row"},children:C.jsxs("div",{style:{display:"flex",width:`${se.eventsWidth}px`,flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",gap:"21px",flexShrink:0},children:[C.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"8px 0 0 0",padding:"0",alignSelf:"stretch"},children:[C.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"normal"},children:"Events"}),C.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:ae?"rgba(111, 111, 111, 0.49)":"rgba(111, 111, 111, 0.69)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"},onClick:()=>ue(!ae),role:"switch","aria-checked":ae,"aria-label":`Switch to ${ae?"Past":"All"} events`,tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),ue(!ae))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[C.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:ae?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),C.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:C.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:ae?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"All"})}),C.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:C.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:ae?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:ae?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),C.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))",rowGap:"16px",columnGap:"16px",alignSelf:"stretch",alignItems:"start",justifyItems:"stretch",width:"100%"},children:0===Me.regularCards.length&&0===Me.featuredCards.length?C.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[C.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:"0.8"},children:"No Events Available"}),C.jsx("div",{style:{fontSize:"14px",fontWeight:"400",opacity:"0.6",maxWidth:"300px",lineHeight:"1.4"},children:'Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.'})]}):[...Me.featuredCards,...Me.regularCards].map((e,t)=>C.jsx("article",{style:{display:"block",width:"100%",minHeight:"128px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform",zIndex:1,clear:"both"},children:C.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[C.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:e=>{e.preventDefault(),e.stopPropagation()},children:C.jsx("img",{src:rn(e.coverImage,120),alt:`${e.title} event cover`,loading:"lazy",onError:e=>{void 0,e.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K"},onLoad:e=>{void 0,e.target.style.backgroundColor="transparent"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),C.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[C.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[C.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"visible",textOverflow:"unset",whiteSpace:"normal",wordWrap:"break-word",hyphens:"auto"},children:e.title}),C.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[C.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:C.jsx("path",{d:"M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z",fill:"currentColor"})}),C.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),C.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[C.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:C.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),C.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),C.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?C.jsx("button",{onClick:t=>{t.stopPropagation(),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1.02)",e.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`))})]})}),C.jsx("div",{style:{position:"relative",display:"flex",justifyContent:"center",width:"100%",margin:"32px auto 0 auto",padding:"0"},children:C.jsx("img",{src:"/images/figma-exact/b2b-logo-bottom.svg",alt:"B2B LOGO",loading:"lazy",decoding:"async",fetchpriority:"low",style:{width:"100%",maxWidth:"901px",height:"auto",fill:"#101010",filter:"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}})})]})})})}))}),hn=A.lazy(()=>y(()=>import("./FigmaMobile-BcM9Mwhi.js"),__vite__mapDeps([0,1]))),mn=()=>{const[e,t]=A.useState(!1),[n,r]=A.useState(!0),{width:i,isMobile:o}=B(),{trackEvent:l,isTrackingEnabled:a}=V(),u=(()=>{const[e,t]=A.useState(!document.hidden),[n,r]=A.useState(!0),i=A.useRef(new Set),o=A.useRef(new Set),l=A.useRef(new Map),a=A.useRef(new Set),u=A.useCallback((e,t)=>{const n=setTimeout(()=>{i.current.delete(n),e()},t)
return i.current.add(n),n},[]),s=A.useCallback((t,r)=>{const i=setInterval(()=>{e&&n&&t()},r)
return o.current.add(i),i},[e,n]),c=A.useCallback(e=>{clearTimeout(e),i.current.delete(e)},[]),f=A.useCallback(e=>{clearInterval(e),o.current.delete(e)},[]),d=A.useCallback((e,t,n,r={})=>{const i=`${e.constructor.name}-${t}`
if(l.current.has(i)){const{element:e,event:t,handler:n}=l.current.get(i)
e.removeEventListener(t,n)}return e.addEventListener(t,n,r),l.current.set(i,{element:e,event:t,handler:n}),()=>{e.removeEventListener(t,n),l.current.delete(i)}},[]),p=A.useCallback(e=>(a.current.add(e),()=>a.current.delete(e)),[]),h=A.useCallback(()=>{void 0,r(!1),a.current.forEach(e=>{try{e()}catch(t){void 0}})},[]),m=A.useCallback(()=>{void 0,r(!0)},[]),g=A.useCallback(()=>{void 0,i.current.forEach(e=>clearTimeout(e)),i.current.clear(),o.current.forEach(e=>clearInterval(e)),o.current.clear(),l.current.forEach(({element:e,event:t,handler:n})=>{try{e.removeEventListener(t,n)}catch(r){void 0}}),l.current.clear(),a.current.forEach(e=>{try{e()}catch(t){void 0}}),a.current.clear()},[])
return A.useEffect(()=>{const e=()=>{const e=!document.hidden
t(e),e?(void 0,m()):(void 0,h())},n=()=>{void 0,r(!0),m()},i=()=>{void 0,h()},o=()=>{void 0,h()},l=e=>{void 0,e.persisted,m()}
return document.addEventListener("visibilitychange",e,{passive:!0}),window.addEventListener("focus",n,{passive:!0}),window.addEventListener("blur",i,{passive:!0}),window.addEventListener("pagehide",o,{passive:!0}),window.addEventListener("pageshow",l,{passive:!0}),window.addEventListener("beforeunload",h,{passive:!0}),()=>{document.removeEventListener("visibilitychange",e),window.removeEventListener("focus",n),window.removeEventListener("blur",i),window.removeEventListener("pagehide",o),window.removeEventListener("pageshow",l),window.removeEventListener("beforeunload",h),g()}},[h,m,g]),A.useEffect(()=>{if("memory"in performance){const e=setInterval(()=>{const e=performance.memory
void 0,e.usedJSHeapSize/e.jsHeapSizeLimit>.6&&(g(),void(window.gc&&window.gc()))},6e4)
return()=>clearInterval(e)}},[g]),{isVisible:e,isActive:n,createTimer:u,createInterval:s,clearTimer:c,clearInterval:f,addEventListener:d,registerCleanup:p,pauseBackgroundProcesses:h,resumeBackgroundProcesses:m,cleanupAll:g}})()
return(()=>{const e=Ke()
return{...e,updateTitle:t=>{e.updateSEOSetting("default_title",t)},updateDescription:t=>{e.updateSEOSetting("default_description",t)},updateOGImage:t=>{e.updateSEOSetting("default_og_image",t)},updateSEOSettings:t=>{Object.entries(t).forEach(([t,n])=>{e.updateSEOSetting(t,n)})},getCurrentMetaTags:()=>e.metaTags,isMaintenanceMode:()=>e.maintenanceStatus.maintenance_mode}})(),A.useEffect(()=>{(async()=>{performance.now()
const e=qe()||o
e&&(ot(),u.registerCleanup(()=>{})),t(e),r(!1),a&&setTimeout(()=>{l("device_detection",{device_type:e?"mobile":"desktop",viewport_width:i})},100),performance.now()})()},[i,o]),n?C.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"16px",opacity:.8},children:"Loading..."}):C.jsx(A.Suspense,{fallback:C.jsx("div",{style:{position:"fixed",top:"20px",right:"20px",background:"rgba(0, 0, 0, 0.8)",color:"#FFFFFF",padding:"8px 16px",borderRadius:"20px",fontFamily:"Inter, sans-serif",fontSize:"14px",zIndex:9999,backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)",opacity:.9},children:"Loading..."}),children:e?C.jsx(hn,{}):C.jsx(pn,{})})},gn=()=>{const[e,t]=A.useState({email:"info@bounce2bounce.com",password:"",totpCode:""}),[n,r]=A.useState({}),[i,o]=A.useState(!1),[l,a]=A.useState(!1),[u,s]=A.useState(!0),[c,h]=A.useState("login"),[m,g]=A.useState(""),v={loginFrame:{width:"428px",height:"926px",background:"#FFF",display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 38px 40px 38px",boxSizing:"border-box",margin:"0 auto"},logoContainer:{marginBottom:"80px",display:"flex",justifyContent:"center"},logo:{width:"138.406px",height:"43px"},mainBody:{width:"352px",display:"flex",flexDirection:"column"},loginTitle:{color:"#2A2A2A",textAlign:"left",fontFamily:"Hamon, Inter, sans-serif",fontSize:"30px",fontWeight:"700",lineHeight:"28px",letterSpacing:"0.9px",marginBottom:"8px",margin:"0 0 8px 0"},loginSubtitle:{color:"#666",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"400",lineHeight:"24px",textAlign:"left",marginBottom:"32px"},fieldLabel:{color:"#2A2A2A",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",lineHeight:"25.814px",letterSpacing:"0.821px",marginBottom:"8px",textAlign:"left"},formSection:{width:"352px",display:"flex",flexDirection:"column",marginBottom:"32px"},inputField:{width:"352px",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FDFDFD",fontFamily:"Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",color:"#2A2A2A",padding:"0 20px",outline:"none",boxSizing:"border-box",marginBottom:"16px",letterSpacing:"0.821px"},passwordContainer:{position:"relative",marginBottom:"16px"},forgotPassword:{color:"#2A2A2A",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",lineHeight:"25.814px",letterSpacing:"0.821px",textAlign:"left",textDecoration:"none",marginBottom:"24px",display:"block"},loginButton:{width:"352px",height:"56.325px",borderRadius:"17.601px",background:"#151515",border:"none",color:"#FFF",textAlign:"center",fontFamily:"Hamon, Inter, sans-serif",fontSize:"18.774px",fontWeight:"700",lineHeight:"16.427px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.2s ease",marginBottom:"32px"},socialSection:{width:"352px",display:"flex",flexDirection:"column",gap:"18.774px"},socialButton:{width:"352px",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FDFDFD",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16.427px",fontWeight:"400",color:"#2A2A2A",cursor:"pointer",transition:"all 0.2s ease",boxSizing:"border-box"},errorAlert:{backgroundColor:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",padding:"12px 16px",marginBottom:"16px",color:"#DC2626",fontSize:"14px",fontFamily:"Inter, sans-serif"},spinner:{width:"16px",height:"16px",border:"2px solid #ffffff40",borderTop:"2px solid #ffffff",borderRadius:"50%",animation:"spin 1s linear infinite"},totpSection:{width:"352px",textAlign:"center",marginTop:"20px",padding:"24px",backgroundColor:"#FDFDFD",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},totpTitle:{fontFamily:"Hamon, Inter, sans-serif",fontSize:"24px",fontWeight:"700",color:"#2A2A2A",marginBottom:"16px",margin:"0 0 16px 0"},totpDescription:{fontFamily:"Inter, sans-serif",fontSize:"14px",color:"#666",marginBottom:"20px",lineHeight:"1.4",textAlign:"left"},qrCodeContainer:{display:"flex",justifyContent:"center",marginBottom:"20px",padding:"16px",backgroundColor:"#FFF",borderRadius:"12px",border:"1px solid #E0E0E0"},totpInputField:{width:"100%",height:"56.325px",borderRadius:"17.601px",border:"1.173px solid #D1D1D1",background:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px",fontWeight:"600",color:"#2A2A2A",textAlign:"center",letterSpacing:"4px",padding:"0 20px",outline:"none",boxSizing:"border-box",marginBottom:"16px"},totpButton:{width:"100%",height:"56.325px",borderRadius:"17.601px",background:"#151515",border:"none",color:"#FFF",textAlign:"center",fontFamily:"Hamon, Inter, sans-serif",fontSize:"16px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.2s ease"}},b=e=>{const{name:i,value:o}=e.target,l=d(o)
t(e=>({...e,[i]:l})),n[i]&&r(e=>({...e,[i]:""}))},y=e=>{void 0},w=async t=>{t.preventDefault(),o(!0),r({})
try{let t="/api/auth/admin/login"
"totp"===c?t="/api/auth/admin/verify-totp":"setup-totp"===c&&(t="/api/auth/admin/totp/complete")
const i=function(e,t={}){const n={}
return Object.keys(e).forEach(r=>{const i=e[r],o=t[r]||tn
"string"==typeof i?n[r]=f(i,o):Array.isArray(i)?n[r]=i.map(e=>"string"==typeof e?f(e,o):e):n[r]=i}),n}(e),o="setup-totp"===c?{totpCode:i.totpCode}:i,l=await p(t,{method:"POST",body:JSON.stringify(o)}),a=await l.json()
if(void 0,l.ok)if(a.requireTotp)void 0,h("totp")
else if(a.success)if(void 0,a.needsTotpSetup){void 0
try{const e=await fetch("/api/auth/admin/totp/generate",{method:"GET",credentials:"include"})
if(void 0,e.ok){const t=await e.json()
void 0,g(t.qrCode),h("setup-totp")}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}}catch(n){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else if("setup-totp"===c&&a.success){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else if("totp"===c&&a.success){void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else{void 0
const e=new URLSearchParams(window.location.search).get("returnTo")||"/dashboard"
window.location.href=e}else{const e="string"==typeof a.error?a.error:"string"==typeof a.message?a.message:"Login failed"
r({general:e})}}catch(n){void 0,r({general:"Network error. Please try again."})}finally{o(!1)}}
return C.jsxs("div",{style:v.loginFrame,children:[C.jsx("div",{style:v.logoContainer,children:C.jsx("img",{src:"/images/b2b-logo.svg",alt:"B2B Logo",style:v.logo})}),C.jsxs("div",{style:v.mainBody,children:[C.jsx("h1",{style:v.loginTitle,children:"Login"}),C.jsx("p",{style:v.loginSubtitle,children:"Welcome back! Please enter your details."}),"login"===c&&C.jsxs(C.Fragment,{children:[C.jsx("div",{style:v.formSection,children:C.jsxs("form",{onSubmit:w,children:[n.general&&C.jsx("div",{style:v.errorAlert,children:String(n.general)}),C.jsxs("div",{children:[C.jsx("label",{style:v.fieldLabel,children:"Enter your username"}),C.jsx("input",{type:"email",name:"email",value:e.email,onChange:b,style:v.inputField,placeholder:"Enter your email",disabled:i,autoComplete:"email",required:!0})]}),C.jsxs("div",{style:v.passwordContainer,children:[C.jsx("label",{style:v.fieldLabel,children:"Enter your password"}),C.jsx("input",{type:l?"text":"password",name:"password",value:e.password,onChange:b,style:v.inputField,placeholder:"Enter your password",disabled:i,autoComplete:"current-password",required:!0})]}),C.jsx("a",{href:"#",style:v.forgotPassword,children:"forgot password?"}),C.jsx("button",{type:"submit",style:v.loginButton,disabled:i||!u,children:i?C.jsxs(C.Fragment,{children:[C.jsx("div",{style:v.spinner}),C.jsx("span",{children:"Signing in..."})]}):"Login"})]})}),C.jsxs("div",{style:v.socialSection,children:[C.jsxs("button",{type:"button",onClick:()=>y(),style:v.socialButton,disabled:i,children:[C.jsxs("svg",{width:"28.16",height:"28.162",viewBox:"0 0 24 24",fill:"none",children:[C.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),C.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),C.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),C.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),C.jsx("span",{children:"Continue with Google"})]}),C.jsxs("button",{type:"button",onClick:()=>y(),style:v.socialButton,disabled:i,children:[C.jsx("svg",{width:"23.47",height:"23.47",viewBox:"0 0 24 24",fill:"none",children:C.jsx("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",fill:"#000"})}),C.jsx("span",{children:"Continue with Apple"})]})]})]}),"totp"===c&&C.jsxs("div",{style:v.totpSection,children:[C.jsx("h2",{style:v.totpTitle,children:"Enter Authentication Code"}),C.jsx("p",{style:v.totpDescription,children:"Please enter the 6-digit code from your Google Authenticator app"}),C.jsxs("form",{onSubmit:w,children:[n.general&&C.jsx("div",{style:v.errorAlert,children:String(n.general)}),C.jsx("input",{type:"text",name:"totpCode",value:e.totpCode,onChange:b,style:v.totpInputField,placeholder:"000000",maxLength:"6",pattern:"[0-9]{6}",disabled:i,autoComplete:"one-time-code",required:!0}),C.jsx("button",{type:"submit",style:v.totpButton,disabled:i||6!==e.totpCode.length,children:i?"Verifying...":"Verify Code"})]})]}),"setup-totp"===c&&C.jsxs("div",{style:v.totpSection,children:[C.jsx("h2",{style:v.totpTitle,children:"Setup Two-Factor Authentication"}),C.jsx("p",{style:v.totpDescription,children:"Scan this QR code with your Google Authenticator app, then enter the 6-digit code to complete setup."}),m&&C.jsx("div",{style:v.qrCodeContainer,children:C.jsx("img",{src:m,alt:"QR Code for TOTP setup"})}),C.jsxs("form",{onSubmit:w,children:[n.general&&C.jsx("div",{style:v.errorAlert,children:String(n.general)}),C.jsx("input",{type:"text",name:"totpCode",value:e.totpCode,onChange:b,style:v.totpInputField,placeholder:"000000",maxLength:"6",pattern:"[0-9]{6}",disabled:i,autoComplete:"one-time-code",required:!0}),C.jsx("button",{type:"submit",style:v.totpButton,disabled:i||6!==e.totpCode.length,children:i?"Setting up...":"Complete Setup"})]})]})]})]})}
class vn extends D.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){void 0,this.setState({error:e,errorInfo:t}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:e.message,error_stack:e.stack,component_stack:t.componentStack}})}render(){return this.state.hasError?C.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[C.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),C.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),C.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}!function(){try{for(let t=localStorage.length-1;t>=0;t--){const n=localStorage.key(t)
if(n)try{const e=localStorage.getItem(n)
e&&e.includes("blob:")&&(void 0,localStorage.removeItem(n))}catch(e){void 0}}for(let t=sessionStorage.length-1;t>=0;t--){const n=sessionStorage.key(t)
if(n)try{const e=sessionStorage.getItem(n)
e&&e.includes("blob:")&&(void 0,sessionStorage.removeItem(n))}catch(e){void 0}}void 0}catch(e){void 0}}(),void window.addEventListener("error",e=>{if(e.target&&"src"in e.target){const t=e.target.src
t&&t.startsWith("blob:")&&(void 0,e.preventDefault())}},!0),ot(),function(e={}){G?(e.debug,0):(G=new U(e),window.analyticsBeacon=G,window.getAnalyticsTracker=()=>G,!1!==e.enableRealTime&&setTimeout(()=>{G?.sendPageView()},100),e.debug)}({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1})
const bn=A.lazy(()=>y(()=>import("./AboutPage-CQHSJx9Z.js").then(e=>e.A),[])),yn=A.lazy(()=>y(()=>import("./ContactPage-BmY8wQBQ.js"),[])),wn=()=>C.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px"},children:"Loading..."}),xn=()=>{const[e,t]=A.useState(!1),[n,r]=A.useState(window.location.pathname)
A.useEffect(()=>{void 0},[n])
const i=A.useCallback(e=>{t(!0),setTimeout(()=>{window.history.pushState({},"",e),r(e),t(!1)},150)},[])
return A.useEffect(()=>(window.navigateWithTransition=i,()=>{delete window.navigateWithTransition}),[i]),A.useEffect(()=>{const e=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",e),()=>window.removeEventListener("popstate",e)},[]),C.jsxs(Je,{children:[C.jsx(Xe,{}),(()=>{if(e)return C.jsx(wn,{})
switch(n){case"/about":return C.jsx(A.Suspense,{fallback:C.jsx(wn,{}),children:C.jsx(bn,{})})
case"/contact":return C.jsx(A.Suspense,{fallback:C.jsx(wn,{}),children:C.jsx(yn,{})})
case"/admin/login":return C.jsx(gn,{})
default:return C.jsx(mn,{})}})(),C.jsx(Qe,{})]})},kn=document.getElementById("root")
if(kn)try{W.createRoot(kn).render(D.createElement(vn,null,D.createElement(xn)))}catch(In){void 0}void document.addEventListener("securitypolicyviolation",e=>{const t={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&p("/api/security/csp-violation",{method:"POST",body:JSON.stringify(t)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const e=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const t=window.parent.location.origin
e.includes(t)||(void 0,window.top.location=window.location)}catch(In){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()})),window.React=D,window.ReactApp=xn
export{D as R,y as _,V as a,C as j,A as r,B as u}
