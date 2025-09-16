function t(t){return t&&t.t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function e(){function t(t,e,n){this.props=t,this.context=e,this.refs=b,this.updater=n||y}function e(){}function n(t,e,n){this.props=t,this.context=e,this.refs=b,this.updater=n||y}function i(t,e,n,i,s,r){return n=r.ref,{$$typeof:u,type:t,key:e,ref:void 0!==n?n:null,props:r}}function s(t){return"object"==typeof t&&null!==t&&t.$$typeof===u}function r(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"}
return"$"+t.replace(/[=:]/g,function(t){return e[t]})}(""+t.key):e.toString(36)}function o(){}function a(t,e,n,h,c){var l=typeof t
"undefined"!==l&&"boolean"!==l||(t=null)
var d,p,v=!1
if(null===t)v=!0
else switch(l){case"bigint":case"string":case"number":v=!0
break
case"object":switch(t.$$typeof){case u:case f:v=!0
break
case S:return a((v=t.o)(t.u),e,n,h,c)}}if(v)return c=c(t),v=""===h?"."+r(t,0):h,T(c)?(n="",null!=v&&(n=v.replace(P,"$&/")+"/"),a(c,e,n,"",function(t){return t})):null!=c&&(s(c)&&(d=c,p=n+(null==c.key||t&&t.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+v,c=i(d.type,p,void 0,0,0,d.props)),e.push(c)),1
v=0
var m,g=""===h?".":h+":"
if(T(t))for(var _=0;_<t.length;_++)v+=a(h=t[_],e,n,l=g+r(h,_),c)
else if("function"==typeof(_=null===(m=t)||"object"!=typeof m?null:"function"==typeof(m=x&&m[x]||m["@@iterator"])?m:null))for(t=_.call(t),_=0;!(h=t.next()).done;)v+=a(h=h.value,e,n,l=g+r(h,_++),c)
else if("object"===l){if("function"==typeof t.then)return a(function(t){switch(t.status){case"fulfilled":return t.value
case"rejected":throw t.reason
default:switch("string"==typeof t.status?t.then(o,o):(t.status="pending",t.then(function(e){"pending"===t.status&&(t.status="fulfilled",t.value=e)},function(e){"pending"===t.status&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value
case"rejected":throw t.reason}}throw t}(t),e,n,h,c)
throw e=String(t),Error("Objects are not valid as a React child (found: "+("[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return v}function h(t,e,n){if(null==t)return t
var i=[],s=0
return a(t,i,"","",function(t){return e.call(n,t,s++)}),i}function c(t){if(-1===t.v){var e=t.m;(e=e()).then(function(e){0!==t.v&&-1!==t.v||(t.v=1,t.m=e)},function(e){0!==t.v&&-1!==t.v||(t.v=2,t.m=e)}),-1===t.v&&(t.v=0,t.m=e)}if(1===t.v)return t.m.default
throw t.m}function l(){}if(mn)return Mn
mn=1
var u=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),g=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),M=Symbol.for("react.suspense"),w=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),x=Symbol.iterator,y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,b={}
t.prototype.isReactComponent={},t.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error("takes an object of state variables to update or a function which returns an object of state variables.")
this.updater.enqueueSetState(this,t,e,"setState")},t.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},e.prototype=t.prototype
var A=n.prototype=new e
A.constructor=n,E(A,t.prototype),A.isPureReactComponent=!0
var T=Array.isArray,C={H:null,A:null,T:null,S:null,V:null},L=Object.prototype.hasOwnProperty,P=/\/+/g,N="function"==typeof reportError?reportError:function(t){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof t&&null!==t&&"string"==typeof t.message?String(t.message):String(t),error:t})
if(!window.dispatchEvent(e))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",t),void 0
void 0}
return Mn.Children={map:h,forEach:function(t,e,n){h(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0
return h(t,function(){e++}),e},toArray:function(t){return h(t,function(t){return t})||[]},only:function(t){if(!s(t))throw Error("React.Children.only expected to receive a single React element child.")
return t}},Mn.Component=t,Mn.Fragment=d,Mn.Profiler=v,Mn.PureComponent=n,Mn.StrictMode=p,Mn.Suspense=M,Mn._=C,Mn.M={__proto__:null,c:function(t){return C.H.useMemoCache(t)}},Mn.cache=function(t){return function(){return t.apply(null,arguments)}},Mn.cloneElement=function(t,e,n){if(null==t)throw Error("The argument must be a React element, but you passed "+t+".")
var s=E({},t.props),r=t.key
if(null!=e)for(o in void 0!==e.ref&&void 0,void 0!==e.key&&(r=""+e.key),e)!L.call(e,o)||"key"===o||"__self"===o||"__source"===o||"ref"===o&&void 0===e.ref||(s[o]=e[o])
var o=arguments.length-2
if(1===o)s.children=n
else if(1<o){for(var a=Array(o),h=0;h<o;h++)a[h]=arguments[h+2]
s.children=a}return i(t.type,r,void 0,0,0,s)},Mn.createContext=function(t){return(t={$$typeof:g,C:t,L:t,P:0,Provider:null,Consumer:null}).Provider=t,t.Consumer={$$typeof:m,N:t},t},Mn.createElement=function(t,e,n){var s,r={},o=null
if(null!=e)for(s in void 0!==e.key&&(o=""+e.key),e)L.call(e,s)&&"key"!==s&&"__self"!==s&&"__source"!==s&&(r[s]=e[s])
var a=arguments.length-2
if(1===a)r.children=n
else if(1<a){for(var h=Array(a),c=0;c<a;c++)h[c]=arguments[c+2]
r.children=h}if(t&&t.defaultProps)for(s in a=t.defaultProps)void 0===r[s]&&(r[s]=a[s])
return i(t,o,void 0,0,0,r)},Mn.createRef=function(){return{current:null}},Mn.forwardRef=function(t){return{$$typeof:_,render:t}},Mn.isValidElement=s,Mn.lazy=function(t){return{$$typeof:S,u:{v:-1,m:t},o:c}},Mn.memo=function(t,e){return{$$typeof:w,type:t,compare:void 0===e?null:e}},Mn.startTransition=function(t){var e=C.T,n={}
C.T=n
try{var i=t(),s=C.S
null!==s&&s(n,i),"object"==typeof i&&null!==i&&"function"==typeof i.then&&i.then(l,N)}catch(r){N(r)}finally{C.T=e}},Mn.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},Mn.use=function(t){return C.H.use(t)},Mn.useActionState=function(t,e,n){return C.H.useActionState(t,e,n)},Mn.useCallback=function(t,e){return C.H.useCallback(t,e)},Mn.useContext=function(t){return C.H.useContext(t)},Mn.useDebugValue=function(){},Mn.useDeferredValue=function(t,e){return C.H.useDeferredValue(t,e)},Mn.useEffect=function(t,e,n){var i=C.H
if("function"==typeof n)throw Error("useEffect CRUD overload is not enabled in this build of React.")
return i.useEffect(t,e)},Mn.useId=function(){return C.H.useId()},Mn.useImperativeHandle=function(t,e,n){return C.H.useImperativeHandle(t,e,n)},Mn.useInsertionEffect=function(t,e){return C.H.useInsertionEffect(t,e)},Mn.useLayoutEffect=function(t,e){return C.H.useLayoutEffect(t,e)},Mn.useMemo=function(t,e){return C.H.useMemo(t,e)},Mn.useOptimistic=function(t,e){return C.H.useOptimistic(t,e)},Mn.useReducer=function(t,e,n){return C.H.useReducer(t,e,n)},Mn.useRef=function(t){return C.H.useRef(t)},Mn.useState=function(t){return C.H.useState(t)},Mn.useSyncExternalStore=function(t,e,n){return C.H.useSyncExternalStore(t,e,n)},Mn.useTransition=function(){return C.H.useTransition()},Mn.version="19.1.1",Mn}function n(){return gn||(gn=1,_n.exports=e()),_n.exports}function i(){return yn||(yn=1,An.exports=function(){return xn||(xn=1,function(t){function e(t,e){var n=t.length
t.push(e)
t:for(;0<n;){var i=n-1>>>1,r=t[i]
if(!(0<s(r,e)))break t
t[i]=e,t[n]=r,n=i}}function n(t){return 0===t.length?null:t[0]}function i(t){if(0===t.length)return null
var e=t[0],n=t.pop()
if(n!==e){t[0]=n
t:for(var i=0,r=t.length,o=r>>>1;i<o;){var a=2*(i+1)-1,h=t[a],c=a+1,l=t[c]
if(0>s(h,n))c<r&&0>s(l,h)?(t[i]=l,t[c]=n,i=c):(t[i]=h,t[a]=n,i=a)
else{if(!(c<r&&0>s(l,n)))break t
t[i]=l,t[c]=n,i=c}}}return e}function s(t,e){var n=t.sortIndex-e.sortIndex
return 0!==n?n:t.id-e.id}function r(t){for(var s=n(v);null!==s;){if(null===s.callback)i(v)
else{if(!(s.startTime<=t))break
i(v),s.sortIndex=s.expirationTime,e(p,s)}s=n(v)}}function o(t){if(S=!1,r(t),!w)if(null!==n(p))w=!0,A||(A=!0,d())
else{var e=n(v)
null!==e&&c(o,e.startTime-t)}}function a(){return!(!x&&t.unstable_now()-L<C)}function h(){if(x=!1,A){var e=t.unstable_now()
L=e
var s=!0
try{t:{w=!1,S&&(S=!1,E(T),T=-1),M=!0
var h=_
try{e:{for(r(e),g=n(p);null!==g&&!(g.expirationTime>e&&a());){var l=g.callback
if("function"==typeof l){g.callback=null,_=g.priorityLevel
var u=l(g.expirationTime<=e)
if(e=t.unstable_now(),"function"==typeof u){g.callback=u,r(e),s=!0
break e}g===n(p)&&i(p),r(e)}else i(p)
g=n(p)}if(null!==g)s=!0
else{var f=n(v)
null!==f&&c(o,f.startTime-e),s=!1}}break t}finally{g=null,_=h,M=!1}s=void 0}}finally{s?d():A=!1}}}function c(e,n){T=y(function(){e(t.unstable_now())},n)}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var l=performance
t.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now()
t.unstable_now=function(){return u.now()-f}}var d,p=[],v=[],m=1,g=null,_=3,M=!1,w=!1,S=!1,x=!1,y="function"==typeof setTimeout?setTimeout:null,E="function"==typeof clearTimeout?clearTimeout:null,b="undefined"!=typeof setImmediate?setImmediate:null,A=!1,T=-1,C=5,L=-1
if("function"==typeof b)d=function(){b(h)}
else if("undefined"!=typeof MessageChannel){var P=new MessageChannel,N=P.port2
P.port1.onmessage=h,d=function(){N.postMessage(null)}}else d=function(){y(h,0)}
t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(t){t.callback=null},t.unstable_forceFrameRate=function(t){0>t||125<t?void 0:C=0<t?Math.floor(1e3/t):5},t.unstable_getCurrentPriorityLevel=function(){return _},t.unstable_next=function(t){switch(_){case 1:case 2:case 3:var e=3
break
default:e=_}var n=_
_=e
try{return t()}finally{_=n}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break
default:t=3}var n=_
_=t
try{return e()}finally{_=n}},t.unstable_scheduleCallback=function(i,s,r){var a=t.unstable_now()
switch(r="object"==typeof r&&null!==r&&"number"==typeof(r=r.delay)&&0<r?a+r:a,i){case 1:var h=-1
break
case 2:h=250
break
case 5:h=1073741823
break
case 4:h=1e4
break
default:h=5e3}return i={id:m++,callback:s,priorityLevel:i,startTime:r,expirationTime:h=r+h,sortIndex:-1},r>a?(i.sortIndex=r,e(v,i),null===n(p)&&i===n(v)&&(S?(E(T),T=-1):S=!0,c(o,r-a))):(i.sortIndex=h,e(p,i),w||M||(w=!0,A||(A=!0,d()))),i},t.unstable_shouldYield=a,t.unstable_wrapCallback=function(t){var e=_
return function(){var n=_
_=e
try{return t.apply(this,arguments)}finally{_=n}}}}(Tn)),Tn}()),An.exports}function s(){const t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,n=4294967295*Math.random()|0,i=4294967295*Math.random()|0
return(sr[255&t]+sr[t>>8&255]+sr[t>>16&255]+sr[t>>24&255]+"-"+sr[255&e]+sr[e>>8&255]+"-"+sr[e>>16&15|64]+sr[e>>24&255]+"-"+sr[63&n|128]+sr[n>>8&255]+"-"+sr[n>>16&255]+sr[n>>24&255]+sr[255&i]+sr[i>>8&255]+sr[i>>16&255]+sr[i>>24&255]).toLowerCase()}function r(t,e,n){return Math.max(e,Math.min(n,t))}function o(t,e){return(t%e+e)%e}function a(t,e,n){return(1-n)*t+n*e}function h(t,e){switch(e.constructor){case Float32Array:return t
case Uint32Array:return t/4294967295
case Uint16Array:return t/65535
case Uint8Array:return t/255
case Int32Array:return Math.max(t/2147483647,-1)
case Int16Array:return Math.max(t/32767,-1)
case Int8Array:return Math.max(t/127,-1)
default:throw new Error("Invalid component type.")}}function c(t,e){switch(e.constructor){case Float32Array:return t
case Uint32Array:return Math.round(4294967295*t)
case Uint16Array:return Math.round(65535*t)
case Uint8Array:return Math.round(255*t)
case Int32Array:return Math.round(2147483647*t)
case Int16Array:return Math.round(32767*t)
case Int8Array:return Math.round(127*t)
default:throw new Error("Invalid component type.")}}function l(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0
return!1}function u(t,e){return new mr[t](e)}function f(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function d(){const t=f("canvas")
return t.style.display="block",t}function p(t){t in gr||(gr[t]=!0)}function v(t){return t<.04045?.0773993808*t:Math.pow(.9478672986*t+.0521327014,2.4)}function m(t){return t<.0031308?12.92*t:1.055*Math.pow(t,.41666)-.055}function g(t){return"undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap?xr.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(void 0,{})}function _(t,e,n,i,s){for(let r=0,o=t.length-3;r<=o;r+=3){Xr.fromArray(t,r)
const o=s.x*Math.abs(Xr.x)+s.y*Math.abs(Xr.y)+s.z*Math.abs(Xr.z),a=e.dot(Xr),h=n.dot(Xr),c=i.dot(Xr)
if(Math.max(-Math.max(a,h,c),Math.min(a,h,c))>o)return!1}return!0}function M(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+6*(e-t)*(2/3-n):t}function w(t){Math.abs(t)>65504,0,t=r(t,-65504,65504),na.floatView[0]=t
const e=na.uint32View[0],n=e>>23&511
return na.baseTable[n]+((8388607&e)>>na.shiftTable[n])}function S(t){const e=t>>10
return na.uint32View[0]=na.mantissaTable[na.offsetTable[e]+(1023&t)]+na.exponentTable[e],na.floatView[0]}function x(t,e,n,i,s,r,o,a,h,c){t.getVertexPosition(a,xa),t.getVertexPosition(h,ya),t.getVertexPosition(c,Ea)
const l=function(t,e,n,i,s,r,o,a){let h
if(h=1===e.side?i.intersectTriangle(o,r,s,!0,a):i.intersectTriangle(s,r,o,0===e.side,a),null===h)return null
Ca.copy(a),Ca.applyMatrix4(t.matrixWorld)
const c=n.ray.origin.distanceTo(Ca)
return c<n.near||c>n.far?null:{distance:c,point:Ca.clone(),object:t}}(t,e,n,i,xa,ya,Ea,Ta)
if(l){const t=new ur
qo.getBarycoord(Ta,xa,ya,Ea,t),s&&(l.uv=qo.getInterpolatedAttribute(s,a,h,c,t,new cr)),r&&(l.uv1=qo.getInterpolatedAttribute(r,a,h,c,t,new cr)),o&&(l.normal=qo.getInterpolatedAttribute(o,a,h,c,t,new ur),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1))
const e={a:a,b:h,c:c,normal:new ur,materialIndex:0}
qo.getNormal(xa,ya,Ea,e.normal),l.face=e,l.barycoord=t}return l}function y(t){const e={}
for(const n in t){e[n]={}
for(const i in t[n]){const s=t[n][i]
s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(void 0,e[n][i]=null):e[n][i]=s.clone():Array.isArray(s)?e[n][i]=s.slice():e[n][i]=s}}return e}function E(t){const e={}
for(let n=0;n<t.length;n++){const i=y(t[n])
for(const t in i)e[t]=i[t]}return e}function b(t){const e=t.getRenderTarget()
return null===e?t.outputColorSpace:!0===e.isXRRenderTarget?e.texture.colorSpace:wr.workingColorSpace}function A(t,e,n,i,s,r){nh.subVectors(t,n).addScalar(.5).multiply(i),void 0!==s?(ih.x=r*nh.x-s*nh.y,ih.y=s*nh.x+r*nh.y):ih.copy(nh),t.copy(e),t.x+=ih.x,t.y+=ih.y,t.applyMatrix4(sh)}function T(t,e){return t-e}function C(t,e){return t.z-e.z}function L(t,e){return e.z-t.z}function P(t,e,n=0){const i=e.itemSize
if(t.isInterleavedBufferAttribute||t.array.constructor!==e.array.constructor){const s=t.count
for(let r=0;r<s;r++)for(let s=0;s<i;s++)e.setComponent(r+n,s,t.getComponent(r,s))}else e.array.set(t.array,n*i)
e.needsUpdate=!0}function N(t,e){if(t.constructor!==e.constructor){const n=Math.min(t.length,e.length)
for(let i=0;i<n;i++)e[i]=t[i]}else{const n=Math.min(t.length,e.length)
e.set(new t.constructor(t.buffer,0,n))}}function D(t,e,n,i,s,r,o){const a=t.geometry.attributes.position
if(lc.fromBufferAttribute(a,s),uc.fromBufferAttribute(a,r),n.distanceSqToSegment(lc,uc,vc,mc)>i)return
vc.applyMatrix4(t.matrixWorld)
const h=e.ray.origin.distanceTo(vc)
return h<e.near||h>e.far?void 0:{distance:h,point:mc.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}function U(t,e,n,i,s,r,o){const a=Ec.distanceSqToPoint(t)
if(a<n){const n=new ur
Ec.closestPointToPoint(t,n),n.applyMatrix4(i)
const h=s.ray.origin.distanceTo(n)
if(h<s.near||h>s.far)return
r.push({distance:h,distanceToRay:Math.sqrt(a),point:n,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}function I(){function t(t,r,o,a){e=t,n=o,i=-3*t+3*r-2*o-a,s=2*t-2*r+o+a}let e=0,n=0,i=0,s=0
return{initCatmullRom:function(e,n,i,s,r){t(n,i,r*(i-e),r*(s-n))},initNonuniformCatmullRom:function(e,n,i,s,r,o,a){let h=(n-e)/r-(i-e)/(r+o)+(i-n)/o,c=(i-n)/o-(s-n)/(o+a)+(s-i)/a
h*=o,c*=o,t(n,i,h,c)},calc:function(t){const r=t*t
return e+n*t+i*r+s*(r*t)}}}function R(t,e,n,i,s){const r=.5*(i-e),o=.5*(s-n),a=t*t
return(2*n-2*i+r+o)*(t*a)+(-3*n+3*i-2*r-o)*a+r*t+n}function O(t,e,n,i){return function(t,e){const n=1-t
return n*n*e}(t,e)+function(t,e){return 2*(1-t)*t*e}(t,n)+function(t,e){return t*t*e}(t,i)}function F(t,e,n,i,s){return function(t,e){const n=1-t
return n*n*n*e}(t,e)+function(t,e){const n=1-t
return 3*n*n*t*e}(t,n)+function(t,e){return 3*(1-t)*t*t*e}(t,i)+function(t,e){return t*t*t*e}(t,s)}function H(t,e,n,i,s){let r
if(s===function(t,e,n,i){let s=0
for(let r=e,o=n-i;r<n;r+=i)s+=(t[o]-t[r])*(t[r+1]+t[o+1]),o=r
return s}(t,e,n,i)>0)for(let o=e;o<n;o+=i)r=ot(o/i|0,t[o],t[o+1],r)
else for(let o=n-i;o>=e;o-=i)r=ot(o/i|0,t[o],t[o+1],r)
return r&&tt(r,r.next)&&(at(r),r=r.next),r}function B(t,e){if(!t)return t
e||(e=t)
let n,i=t
do{if(n=!1,i.steiner||!tt(i,i.next)&&0!==Q(i.prev,i,i.next))i=i.next
else{if(at(i),i=e=i.prev,i===i.next)break
n=!0}}while(n||i!==e)
return e}function G(t,e,n,i,s,r,o){if(!t)return
!o&&r&&!function(t,e,n,i){let s=t
do{0===s.z&&(s.z=Y(s.x,s.y,e,n,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next}while(s!==t)
s.prevZ.nextZ=null,s.prevZ=null,function(t){let e,n=1
do{let i,s=t
t=null
let r=null
for(e=0;s;){e++
let o=s,a=0
for(let t=0;t<n&&(a++,o=o.nextZ,o);t++);let h=n
for(;a>0||h>0&&o;)0!==a&&(0===h||!o||s.z<=o.z)?(i=s,s=s.nextZ,a--):(i=o,o=o.nextZ,h--),r?r.nextZ=i:t=i,i.prevZ=r,r=i
s=o}r.nextZ=null,n*=2}while(e>1)
return t}(s)}(t,i,s,r)
let a=t
for(;t.prev!==t.next;){const h=t.prev,c=t.next
if(r?k(t,i,s,r):V(t))e.push(h.i,t.i,c.i),at(t),t=c.next,a=c.next
else if((t=c)===a){o?1===o?G(t=z(B(t),e),e,n,i,s,r,2):2===o&&W(t,e,n,i,s,r):G(B(t),e,n,i,s,r,1)
break}}}function V(t){const e=t.prev,n=t,i=t.next
if(Q(e,n,i)>=0)return!1
const s=e.x,r=n.x,o=i.x,a=e.y,h=n.y,c=i.y,l=Math.min(s,r,o),u=Math.min(a,h,c),f=Math.max(s,r,o),d=Math.max(a,h,c)
let p=i.next
for(;p!==e;){if(p.x>=l&&p.x<=f&&p.y>=u&&p.y<=d&&Z(s,a,r,h,o,c,p.x,p.y)&&Q(p.prev,p,p.next)>=0)return!1
p=p.next}return!0}function k(t,e,n,i){const s=t.prev,r=t,o=t.next
if(Q(s,r,o)>=0)return!1
const a=s.x,h=r.x,c=o.x,l=s.y,u=r.y,f=o.y,d=Math.min(a,h,c),p=Math.min(l,u,f),v=Math.max(a,h,c),m=Math.max(l,u,f),g=Y(d,p,e,n,i),_=Y(v,m,e,n,i)
let M=t.prevZ,w=t.nextZ
for(;M&&M.z>=g&&w&&w.z<=_;){if(M.x>=d&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&Z(a,l,h,u,c,f,M.x,M.y)&&Q(M.prev,M,M.next)>=0)return!1
if(M=M.prevZ,w.x>=d&&w.x<=v&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&Z(a,l,h,u,c,f,w.x,w.y)&&Q(w.prev,w,w.next)>=0)return!1
w=w.nextZ}for(;M&&M.z>=g;){if(M.x>=d&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&Z(a,l,h,u,c,f,M.x,M.y)&&Q(M.prev,M,M.next)>=0)return!1
M=M.prevZ}for(;w&&w.z<=_;){if(w.x>=d&&w.x<=v&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&Z(a,l,h,u,c,f,w.x,w.y)&&Q(w.prev,w,w.next)>=0)return!1
w=w.nextZ}return!0}function z(t,e){let n=t
do{const i=n.prev,s=n.next.next
!tt(i,s)&&et(i,n,n.next,s)&&st(i,s)&&st(s,i)&&(e.push(i.i,n.i,s.i),at(n),at(n.next),n=t=s),n=n.next}while(n!==t)
return B(n)}function W(t,e,n,i,s,r){let o=t
do{let t=o.next.next
for(;t!==o.prev;){if(o.i!==t.i&&K(o,t)){let a=rt(o,t)
return o=B(o,o.next),a=B(a,a.next),G(o,e,n,i,s,r,0),G(a,e,n,i,s,r,0),void 0}t=t.next}o=o.next}while(o!==t)}function j(t,e){let n=t.x-e.x
return 0===n&&(n=t.y-e.y,0===n)&&(n=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x)),n}function X(t,e){const n=function(t,e){let n=e
const i=t.x,s=t.y
let r,o=-1/0
if(tt(t,n))return n
do{if(tt(t,n.next))return n.next
if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){const t=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y)
if(t<=i&&t>o&&(o=t,r=n.x<n.next.x?n:n.next,t===i))return r}n=n.next}while(n!==e)
if(!r)return null
const a=r,h=r.x,c=r.y
let l=1/0
n=r
do{if(i>=n.x&&n.x>=h&&i!==n.x&&J(s<c?i:o,s,h,c,s<c?o:i,s,n.x,n.y)){const e=Math.abs(s-n.y)/(i-n.x)
st(n,t)&&(e<l||e===l&&(n.x>r.x||n.x===r.x&&q(r,n)))&&(r=n,l=e)}n=n.next}while(n!==a)
return r}(t,e)
if(!n)return e
const i=rt(n,t)
return B(i,i.next),B(n,n.next)}function q(t,e){return Q(t.prev,t,e.prev)<0&&Q(e.next,t,t.next)<0}function Y(t,e,n,i,s){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*s|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-i)*s|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function $(t){let e=t,n=t
do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t)
return n}function J(t,e,n,i,s,r,o,a){return(s-o)*(e-a)>=(t-o)*(r-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(r-a)>=(s-o)*(i-a)}function Z(t,e,n,i,s,r,o,a){return!(t===o&&e===a)&&J(t,e,n,i,s,r,o,a)}function K(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let n=t
do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&et(n,n.next,t,e))return!0
n=n.next}while(n!==t)
return!1}(t,e)&&(st(t,e)&&st(e,t)&&function(t,e){let n=t,i=!1
const s=(t.x+e.x)/2,r=(t.y+e.y)/2
do{n.y>r!=n.next.y>r&&n.next.y!==n.y&&s<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next}while(n!==t)
return i}(t,e)&&(Q(t.prev,t,e.prev)||Q(t,e.prev,e))||tt(t,e)&&Q(t.prev,t,t.next)>0&&Q(e.prev,e,e.next)>0)}function Q(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function tt(t,e){return t.x===e.x&&t.y===e.y}function et(t,e,n,i){const s=it(Q(t,e,n)),r=it(Q(t,e,i)),o=it(Q(n,i,t)),a=it(Q(n,i,e))
return s!==r&&o!==a||!(0!==s||!nt(t,n,e))||!(0!==r||!nt(t,i,e))||!(0!==o||!nt(n,t,i))||!(0!==a||!nt(n,e,i))}function nt(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function it(t){return t>0?1:t<0?-1:0}function st(t,e){return Q(t.prev,t,t.next)<0?Q(t,e,t.next)>=0&&Q(t,t.prev,e)>=0:Q(t,e,t.prev)<0||Q(t,t.next,e)<0}function rt(t,e){const n=ht(t.i,t.x,t.y),i=ht(e.i,e.x,e.y),s=t.next,r=e.prev
return t.next=e,e.prev=t,n.next=s,s.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function ot(t,e,n,i){const s=ht(t,e,n)
return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function at(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function ht(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ct(t){const e=t.length
e>2&&t[e-1].equals(t[0])&&t.pop()}function lt(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}function ut(t,e,n){const i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`
return!0!==n.has(i)&&!0!==n.has(s)&&(n.add(i),n.add(s),!0)}function ft(t,e){return t&&t.constructor!==e?"number"==typeof e.BYTES_PER_ELEMENT?new e(t):Array.prototype.slice.call(t):t}function dt(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function pt(t){const e=t.length,n=new Array(e)
for(let i=0;i!==e;++i)n[i]=i
return n.sort(function(e,n){return t[e]-t[n]}),n}function vt(t,e,n){const i=t.length,s=new t.constructor(i)
for(let r=0,o=0;o!==i;++r){const i=n[r]*e
for(let n=0;n!==e;++n)s[o++]=t[i+n]}return s}function mt(t,e,n,i){let s=1,r=t[0]
for(;void 0!==r&&void 0===r[i];)r=t[s++]
if(void 0===r)return
let o=r[i]
if(void 0!==o)if(Array.isArray(o))do{o=r[i],void 0!==o&&(e.push(r.time),n.push(...o)),r=t[s++]}while(void 0!==r)
else if(void 0!==o.toArray)do{o=r[i],void 0!==o&&(e.push(r.time),o.toArray(n,n.length)),r=t[s++]}while(void 0!==r)
else do{o=r[i],void 0!==o&&(e.push(r.time),n.push(o)),r=t[s++]}while(void 0!==r)}function gt(t){if(void 0===t.type)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse")
const e=function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wl
case"vector":case"vector2":case"vector3":case"vector4":return Yl
case"color":return zl
case"quaternion":return Xl
case"bool":case"boolean":return kl
case"string":return ql}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}(t.type)
if(void 0===t.times){const e=[],n=[]
mt(t.keys,e,n,"value"),t.times=e,t.values=n}return void 0!==e.parse?e.parse(t):new e(t.name,t.times,t.values,t.interpolation)}function _t(t,e){return t.distance-e.distance}function Mt(t,e,n,i){let s=!0
if(t.layers.test(e.layers)&&!1===t.raycast(e,n)&&(s=!1),!0===s&&!0===i){const i=t.children
for(let t=0,s=i.length;t<s;t++)Mt(i[t],e,n,!0)}}function wt(){!1===this.D.hidden&&this.reset()}function St(t){const e=[]
!0===t.isBone&&e.push(t)
for(let n=0;n<t.children.length;n++)e.push(...St(t.children[n]))
return e}function xt(t,e,n,i,s,r,o){If.set(s,r,o).unproject(i)
const a=e[t]
if(void 0!==a){const t=n.getAttribute("position")
for(let e=0,n=a.length;e<n;e++)t.setXYZ(a[e],If.x,If.y,If.z)}}function yt(t,e,n,i){const s=function(t){switch(t){case Ni:case Di:return{byteLength:1,components:1}
case Ii:case Ui:case Hi:return{byteLength:2,components:1}
case Bi:case Gi:return{byteLength:2,components:4}
case Oi:case Ri:case Fi:return{byteLength:4,components:1}
case ki:case zi:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}(i)
switch(n){case Wi:return t*e
case $i:case Ji:return t*e/s.components*s.byteLength
case Zi:case Ki:return t*e*2/s.components*s.byteLength
case ji:return t*e*3/s.components*s.byteLength
case Xi:case Qi:return t*e*4/s.components*s.byteLength
case ts:case es:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8
case ns:case is:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16
case rs:case as:return Math.max(t,16)*Math.max(e,8)/4
case ss:case os:return Math.max(t,8)*Math.max(e,8)/2
case hs:case cs:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8
case ls:case us:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16
case fs:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16
case ds:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16
case ps:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16
case vs:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16
case ms:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16
case gs:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16
case _s:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16
case Ms:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16
case ws:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16
case Ss:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16
case xs:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16
case ys:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16
case Es:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16
case bs:case As:case Ts:return Math.ceil(t/4)*Math.ceil(e/4)*16
case Cs:case Ls:return Math.ceil(t/4)*Math.ceil(e/4)*8
case Ps:case Ns:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Et(){function t(n,r){i(n,r),s=e.requestAnimationFrame(t)}let e=null,n=!1,i=null,s=null
return{start:function(){!0!==n&&null!==i&&(s=e.requestAnimationFrame(t),n=!0)},stop:function(){e.cancelAnimationFrame(s),n=!1},setAnimationLoop:function(t){i=t},setContext:function(t){e=t}}}function bt(t){const e=new WeakMap
return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(n){n.isInterleavedBufferAttribute&&(n=n.data)
const i=e.get(n)
i&&(t.deleteBuffer(i.buffer),e.delete(n))},update:function(n,i){if(n.isInterleavedBufferAttribute&&(n=n.data),n.isGLBufferAttribute){const t=e.get(n)
return(!t||t.version<n.version)&&e.set(n,{buffer:n.buffer,type:n.type,bytesPerElement:n.elementSize,version:n.version}),void 0}const s=e.get(n)
if(void 0===s)e.set(n,function(e,n){const i=e.array,s=e.usage,r=i.byteLength,o=t.createBuffer()
let a
if(t.bindBuffer(n,o),t.bufferData(n,i,s),e.onUploadCallback(),i instanceof Float32Array)a=t.FLOAT
else if("undefined"!=typeof Float16Array&&i instanceof Float16Array)a=t.HALF_FLOAT
else if(i instanceof Uint16Array)a=e.isFloat16BufferAttribute?t.HALF_FLOAT:t.UNSIGNED_SHORT
else if(i instanceof Int16Array)a=t.SHORT
else if(i instanceof Uint32Array)a=t.UNSIGNED_INT
else if(i instanceof Int32Array)a=t.INT
else if(i instanceof Int8Array)a=t.BYTE
else if(i instanceof Uint8Array)a=t.UNSIGNED_BYTE
else{if(!(i instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+i)
a=t.UNSIGNED_BYTE}return{buffer:o,type:a,bytesPerElement:i.BYTES_PER_ELEMENT,version:e.version,size:r}}(n,i))
else if(s.version<n.version){if(s.size!==n.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.")
!function(e,n,i){const s=n.array,r=n.updateRanges
if(t.bindBuffer(i,e),0===r.length)t.bufferSubData(i,0,s)
else{r.sort((t,e)=>t.start-e.start)
let e=0
for(let t=1;t<r.length;t++){const n=r[e],i=r[t]
i.start<=n.start+n.count+1?n.count=Math.max(n.count,i.start+i.count-n.start):(++e,r[e]=i)}r.length=e+1
for(let n=0,o=r.length;n<o;n++){const e=r[n]
t.bufferSubData(i,e.start*s.BYTES_PER_ELEMENT,s,e.start,e.count)}n.clearUpdateRanges()}n.onUploadCallback()}(s.buffer,n,i),s.version=n.version}}}}function At(t,e,n,i,s,r,o){function a(t){let i=!0===t.isScene?t.background:null
return i&&i.isTexture&&(i=(t.backgroundBlurriness>0?n:e).get(i)),i}function h(e,n){e.getRGB(zf,b(t)),i.buffers.color.setClear(zf.r,zf.g,zf.b,n,o)}const c=new Zo(0)
let l,u,f=!0===r?0:1,d=null,p=0,v=null
return{getClearColor:function(){return c},setClearColor:function(t,e=1){c.set(t),f=e,h(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(t){f=t,h(c,f)},render:function(e){let n=!1
const s=a(e)
null===s?h(c,f):s&&s.isColor&&(h(s,1),n=!0)
const r=t.xr.getEnvironmentBlendMode()
"additive"===r?i.buffers.color.setClear(0,0,0,1,o):"alpha-blend"===r&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||n)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))},addToRenderList:function(e,n){const i=a(n)
i&&(i.isCubeTexture||i.mapping===Si)?(void 0===u&&(u=new La(new Pa(1,1,1),new Da({name:"BackgroundCubeMaterial",uniforms:y(kf.backgroundCube.uniforms),vertexShader:kf.backgroundCube.vertexShader,fragmentShader:kf.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(t,e,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Wf.copy(n.backgroundRotation),Wf.x*=-1,Wf.y*=-1,Wf.z*=-1,i.isCubeTexture&&!1===i.isRenderTargetTexture&&(Wf.y*=-1,Wf.z*=-1),u.material.uniforms.envMap.value=i,u.material.uniforms.flipEnvMap.value=i.isCubeTexture&&!1===i.isRenderTargetTexture?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(jf.makeRotationFromEuler(Wf)),u.material.toneMapped=wr.getTransfer(i.colorSpace)!==zs,d===i&&p===i.version&&v===t.toneMapping||(u.material.needsUpdate=!0,d=i,p=i.version,v=t.toneMapping),u.layers.enableAll(),e.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(void 0===l&&(l=new La(new vl(2,2),new Da({name:"BackgroundMaterial",uniforms:y(kf.background.uniforms),vertexShader:kf.background.vertexShader,fragmentShader:kf.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=wr.getTransfer(i.colorSpace)!==zs,!0===i.matrixAutoUpdate&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),d===i&&p===i.version&&v===t.toneMapping||(l.material.needsUpdate=!0,d=i,p=i.version,v=t.toneMapping),l.layers.enableAll(),e.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){void 0!==u&&(u.geometry.dispose(),u.material.dispose(),u=void 0),void 0!==l&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function Tt(t,e){function n(e){return t.bindVertexArray(e)}function i(e){return t.deleteVertexArray(e)}function s(t){const e=[],n=[],i=[]
for(let s=0;s<f;s++)e[s]=0,n[s]=0,i[s]=0
return{geometry:null,program:null,wireframe:!1,newAttributes:e,enabledAttributes:n,attributeDivisors:i,object:t,attributes:{},index:null}}function r(){const t=v.newAttributes
for(let e=0,n=t.length;e<n;e++)t[e]=0}function o(t){a(t,0)}function a(e,n){const i=v.newAttributes,s=v.enabledAttributes,r=v.attributeDivisors
i[e]=1,0===s[e]&&(t.enableVertexAttribArray(e),s[e]=1),r[e]!==n&&(t.vertexAttribDivisor(e,n),r[e]=n)}function h(){const e=v.newAttributes,n=v.enabledAttributes
for(let i=0,s=n.length;i<s;i++)n[i]!==e[i]&&(t.disableVertexAttribArray(i),n[i]=0)}function c(e,n,i,s,r,o,a){!0===a?t.vertexAttribIPointer(e,n,i,r,o):t.vertexAttribPointer(e,n,i,s,r,o)}function l(){u(),m=!0,v!==p&&(v=p,n(v.object))}function u(){p.geometry=null,p.program=null,p.wireframe=!1}const f=t.getParameter(t.MAX_VERTEX_ATTRIBS),d={},p=s(null)
let v=p,m=!1
return{setup:function(i,l,u,f,p){let g=!1
const _=function(e,n,i){const r=!0===i.wireframe
let o=d[e.id]
void 0===o&&(o={},d[e.id]=o)
let a=o[n.id]
void 0===a&&(a={},o[n.id]=a)
let h=a[r]
return void 0===h&&(h=s(t.createVertexArray()),a[r]=h),h}(f,u,l)
v!==_&&(v=_,n(v.object)),g=function(t,e,n,i){const s=v.attributes,r=e.attributes
let o=0
const a=n.getAttributes()
for(const h in a)if(a[h].location>=0){const e=s[h]
let n=r[h]
if(void 0===n&&("instanceMatrix"===h&&t.instanceMatrix&&(n=t.instanceMatrix),"instanceColor"===h&&t.instanceColor&&(n=t.instanceColor)),void 0===e)return!0
if(e.attribute!==n)return!0
if(n&&e.data!==n.data)return!0
o++}return v.attributesNum!==o||v.index!==i}(i,f,u,p),g&&function(t,e,n,i){const s={},r=e.attributes
let o=0
const a=n.getAttributes()
for(const h in a)if(a[h].location>=0){let e=r[h]
void 0===e&&("instanceMatrix"===h&&t.instanceMatrix&&(e=t.instanceMatrix),"instanceColor"===h&&t.instanceColor&&(e=t.instanceColor))
const n={}
n.attribute=e,e&&e.data&&(n.data=e.data),s[h]=n,o++}v.attributes=s,v.attributesNum=o,v.index=i}(i,f,u,p),null!==p&&e.update(p,t.ELEMENT_ARRAY_BUFFER),(g||m)&&(m=!1,function(n,i,s,l){r()
const u=l.attributes,f=s.getAttributes(),d=i.defaultAttributeValues
for(const r in f){const i=f[r]
if(i.location>=0){let s=u[r]
if(void 0===s&&("instanceMatrix"===r&&n.instanceMatrix&&(s=n.instanceMatrix),"instanceColor"===r&&n.instanceColor&&(s=n.instanceColor)),void 0!==s){const r=s.normalized,h=s.itemSize,u=e.get(s)
if(void 0===u)continue
const f=u.buffer,d=u.type,p=u.bytesPerElement,v=d===t.INT||d===t.UNSIGNED_INT||s.gpuType===Ri
if(s.isInterleavedBufferAttribute){const e=s.data,u=e.stride,m=s.offset
if(e.isInstancedInterleavedBuffer){for(let t=0;t<i.locationSize;t++)a(i.location+t,e.meshPerAttribute)
!0!==n.isInstancedMesh&&void 0===l.U&&(l.U=e.meshPerAttribute*e.count)}else for(let t=0;t<i.locationSize;t++)o(i.location+t)
t.bindBuffer(t.ARRAY_BUFFER,f)
for(let t=0;t<i.locationSize;t++)c(i.location+t,h/i.locationSize,d,r,u*p,(m+h/i.locationSize*t)*p,v)}else{if(s.isInstancedBufferAttribute){for(let t=0;t<i.locationSize;t++)a(i.location+t,s.meshPerAttribute)
!0!==n.isInstancedMesh&&void 0===l.U&&(l.U=s.meshPerAttribute*s.count)}else for(let t=0;t<i.locationSize;t++)o(i.location+t)
t.bindBuffer(t.ARRAY_BUFFER,f)
for(let t=0;t<i.locationSize;t++)c(i.location+t,h/i.locationSize,d,r,h*p,h/i.locationSize*t*p,v)}}else if(void 0!==d){const e=d[r]
if(void 0!==e)switch(e.length){case 2:t.vertexAttrib2fv(i.location,e)
break
case 3:t.vertexAttrib3fv(i.location,e)
break
case 4:t.vertexAttrib4fv(i.location,e)
break
default:t.vertexAttrib1fv(i.location,e)}}}}h()}(i,l,u,f),null!==p&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(p).buffer))},reset:l,resetDefaultState:u,dispose:function(){l()
for(const t in d){const e=d[t]
for(const t in e){const n=e[t]
for(const t in n)i(n[t].object),delete n[t]
delete e[t]}delete d[t]}},releaseStatesOfGeometry:function(t){if(void 0===d[t.id])return
const e=d[t.id]
for(const n in e){const t=e[n]
for(const e in t)i(t[e].object),delete t[e]
delete e[n]}delete d[t.id]},releaseStatesOfProgram:function(t){for(const e in d){const n=d[e]
if(void 0===n[t.id])continue
const s=n[t.id]
for(const t in s)i(s[t].object),delete s[t]
delete n[t.id]}},initAttributes:r,enableAttribute:o,disableUnusedAttributes:h}}function Ct(t,e,n){function i(e,i,r){0!==r&&(t.drawArraysInstanced(s,e,i,r),n.update(i,s,r))}let s
this.setMode=function(t){s=t},this.render=function(e,i){t.drawArrays(s,e,i),n.update(i,s,1)},this.renderInstances=i,this.renderMultiDraw=function(t,i,r){if(0===r)return
e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,t,0,i,0,r)
let o=0
for(let e=0;e<r;e++)o+=i[e]
n.update(o,s,1)},this.renderMultiDrawInstances=function(t,r,o,a){if(0===o)return
const h=e.get("WEBGL_multi_draw")
if(null===h)for(let e=0;e<t.length;e++)i(t[e],r[e],a[e])
else{h.multiDrawArraysInstancedWEBGL(s,t,0,r,0,a,0,o)
let e=0
for(let t=0;t<o;t++)e+=r[t]*a[t]
n.update(e,s,1)}}}function Lt(t,e,n,i){function s(e){if("highp"===e){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp"
e="mediump"}return"mediump"===e&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let r,o=void 0!==n.precision?n.precision:"highp"
const a=s(o)
void 0,a!==o&&(o=a)
const h=!0===n.logarithmicDepthBuffer,c=!0===n.reversedDepthBuffer&&e.has("EXT_clip_control"),l=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),u=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
return{isWebGL2:!0,getMaxAnisotropy:function(){if(void 0!==r)return r
if(!0===e.has("EXT_texture_filter_anisotropic")){const n=e.get("EXT_texture_filter_anisotropic")
r=t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0
return r},getMaxPrecision:s,textureFormatReadable:function(e){return e===Xi||i.convert(e)===t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(n){const s=n===Hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"))
return!(n!==Ni&&i.convert(n)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==Fi&&!s)},precision:o,logarithmicDepthBuffer:h,reversedDepthBuffer:c,maxTextures:l,maxVertexTextures:u,maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE),maxCubemapSize:t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:t.getParameter(t.MAX_VERTEX_ATTRIBS),maxVertexUniforms:t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:t.getParameter(t.MAX_VARYING_VECTORS),maxFragmentUniforms:t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:t.getParameter(t.MAX_SAMPLES)}}function Pt(t){function e(t,e,i,s){const r=null!==t?t.length:0
let o=null
if(0!==r){if(o=c.value,!0!==s||null===o){const n=i+4*r,s=e.matrixWorldInverse
h.getNormalMatrix(s),(null===o||o.length<n)&&(o=new Float32Array(n))
for(let e=0,c=i;e!==r;++e,c+=4)a.copy(t[e]).applyMatrix4(s,h),a.normal.toArray(o,c),o[c+3]=a.constant}c.value=o,c.needsUpdate=!0}return n.numPlanes=r,n.numIntersection=0,o}const n=this
let i=null,s=0,r=!1,o=!1
const a=new kh,h=new pr,c={value:null,needsUpdate:!1}
this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(t,e){const n=0!==t.length||e||0!==s||r
return r=e,s=t.length,n},this.beginShadows=function(){o=!0,e(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(t,n){i=e(t,n,0)},this.setState=function(a,h,l){const u=a.clippingPlanes,f=a.clipIntersection,d=a.clipShadows,p=t.get(a)
if(!r||null===u||0===u.length||o&&!d)o?e(null):(c.value!==i&&(c.value=i,c.needsUpdate=s>0),n.numPlanes=s,void(n.numIntersection=0))
else{const t=o?0:s,n=4*t
let r=p.clippingState||null
c.value=r,r=e(u,h,n,l)
for(let e=0;e!==n;++e)r[e]=i[e]
p.clippingState=r,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=t}}}function Nt(t){function e(t,e){return e===Mi?t.mapping=gi:e===wi&&(t.mapping=_i),t}function n(t){const e=t.target
e.removeEventListener("dispose",n)
const s=i.get(e)
void 0!==s&&(i.delete(e),s.dispose())}let i=new WeakMap
return{get:function(s){if(s&&s.isTexture){const r=s.mapping
if(r===Mi||r===wi){if(i.has(s))return e(i.get(s).texture,s.mapping)
{const r=s.image
if(r&&r.height>0){const o=new Va(r.height)
return o.fromEquirectangularTexture(t,s),i.set(s,o),s.addEventListener("dispose",n),e(o.texture,s.mapping)}return null}}}return s},dispose:function(){i=new WeakMap}}}function Dt(t,e,n){const i=new Pr(t,e,n)
return i.texture.mapping=Si,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ut(t,e,n,i,s){t.viewport.set(e,n,i,s),t.scissor.set(e,n,i,s)}function It(){return new Da({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:"\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t",blending:0,depthTest:!1,depthWrite:!1})}function Rt(){return new Da({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:"\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t",blending:0,depthTest:!1,depthWrite:!1})}function Ot(t){function e(t){const i=t.target
i.removeEventListener("dispose",e)
const s=n.get(i)
void 0!==s&&(n.delete(i),s.dispose())}let n=new WeakMap,i=null
return{get:function(s){if(s&&s.isTexture){const r=s.mapping,o=r===Mi||r===wi,a=r===gi||r===_i
if(o||a){let r=n.get(s)
const h=void 0!==r?r.texture.pmremVersion:0
if(s.isRenderTargetTexture&&s.pmremVersion!==h)return null===i&&(i=new id(t)),r=o?i.fromEquirectangular(s,r):i.fromCubemap(s,r),r.texture.pmremVersion=s.pmremVersion,n.set(s,r),r.texture
if(void 0!==r)return r.texture
{const h=s.image
return o&&h&&h.height>0||a&&h&&function(t){let e=0
for(let n=0;n<6;n++)void 0!==t[n]&&e++
return 6===e}(h)?(null===i&&(i=new id(t)),r=o?i.fromEquirectangular(s):i.fromCubemap(s),r.texture.pmremVersion=s.pmremVersion,n.set(s,r),s.addEventListener("dispose",e),r.texture):null}}}return s},dispose:function(){n=new WeakMap,null!==i&&(i.dispose(),i=null)}}}function Ft(t){function e(e){if(void 0!==n[e])return n[e]
let i
switch(e){case"WEBGL_depth_texture":i=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture")
break
case"EXT_texture_filter_anisotropic":i=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic")
break
case"WEBGL_compressed_texture_s3tc":i=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")
break
case"WEBGL_compressed_texture_pvrtc":i=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc")
break
default:i=t.getExtension(e)}return n[e]=i,i}const n={}
return{has:function(t){return null!==e(t)},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(t){const n=e(t)
return null===n&&p("THREE.WebGLRenderer: "+t+" extension not supported."),n}}}function Ht(t,e,n,i){function s(t){const r=t.target
null!==r.index&&e.remove(r.index)
for(const n in r.attributes)e.remove(r.attributes[n])
r.removeEventListener("dispose",s),delete o[r.id]
const h=a.get(r)
h&&(e.remove(h),a.delete(r)),i.releaseStatesOfGeometry(r),!0===r.isInstancedBufferGeometry&&delete r.U,n.memory.geometries--}function r(t){const n=[],i=t.index,s=t.attributes.position
let r=0
if(null!==i){const t=i.array
r=i.version
for(let e=0,i=t.length;e<i;e+=3){const i=t[e+0],s=t[e+1],r=t[e+2]
n.push(i,s,s,r,r,i)}}else{if(void 0===s)return
{const t=s.array
r=s.version
for(let e=0,i=t.length/3-1;e<i;e+=3){const t=e+0,i=e+1,s=e+2
n.push(t,i,i,s,s,t)}}}const o=new(l(n)?ha:aa)(n,1)
o.version=r
const h=a.get(t)
h&&e.remove(h),a.set(t,o)}const o={},a=new WeakMap
return{get:function(t,e){return!0===o[e.id]||(e.addEventListener("dispose",s),o[e.id]=!0,n.memory.geometries++),e},update:function(n){const i=n.attributes
for(const s in i)e.update(i[s],t.ARRAY_BUFFER)},getWireframeAttribute:function(t){const e=a.get(t)
if(e){const n=t.index
null!==n&&e.version<n.version&&r(t)}else r(t)
return a.get(t)}}}function Bt(t,e,n){function i(e,i,a){0!==a&&(t.drawElementsInstanced(s,i,r,e*o,a),n.update(i,s,a))}let s,r,o
this.setMode=function(t){s=t},this.setIndex=function(t){r=t.type,o=t.bytesPerElement},this.render=function(e,i){t.drawElements(s,i,r,e*o),n.update(i,s,1)},this.renderInstances=i,this.renderMultiDraw=function(t,i,o){if(0===o)return
e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,i,0,r,t,0,o)
let a=0
for(let e=0;e<o;e++)a+=i[e]
n.update(a,s,1)},this.renderMultiDrawInstances=function(t,a,h,c){if(0===h)return
const l=e.get("WEBGL_multi_draw")
if(null===l)for(let e=0;e<t.length;e++)i(t[e]/o,a[e],c[e])
else{l.multiDrawElementsInstancedWEBGL(s,a,0,r,t,0,c,0,h)
let e=0
for(let t=0;t<h;t++)e+=a[t]*c[t]
n.update(e,s,1)}}}function Gt(t){const e={frame:0,calls:0,triangles:0,points:0,lines:0}
return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(n,i,s){switch(e.calls++,i){case t.TRIANGLES:e.triangles+=s*(n/3)
break
case t.LINES:e.lines+=s*(n/2)
break
case t.LINE_STRIP:e.lines+=s*(n-1)
break
case t.LINE_LOOP:e.lines+=s*n
break
case t.POINTS:e.points+=s*n}}}}function Vt(t,e,n){const i=new WeakMap,s=new Cr
return{update:function(r,o,a){const h=r.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=void 0!==c?c.length:0
let u=i.get(o)
if(void 0===u||u.count!==l){let t=function(){g.dispose(),i.delete(o),o.removeEventListener("dispose",t)}
void 0!==u&&u.texture.dispose()
const n=void 0!==o.morphAttributes.position,r=void 0!==o.morphAttributes.normal,a=void 0!==o.morphAttributes.color,h=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],f=o.morphAttributes.color||[]
let d=0
!0===n&&(d=1),!0===r&&(d=2),!0===a&&(d=3)
let p=o.attributes.position.count*d,v=1
p>e.maxTextureSize&&(v=Math.ceil(p/e.maxTextureSize),p=e.maxTextureSize)
const m=new Float32Array(p*v*4*l),g=new Nr(m,p,v,l)
g.type=Fi,g.needsUpdate=!0
const _=4*d
for(let e=0;e<l;e++){const t=h[e],i=c[e],o=f[e],l=p*v*4*e
for(let e=0;e<t.count;e++){const h=e*_
!0===n&&(s.fromBufferAttribute(t,e),m[l+h+0]=s.x,m[l+h+1]=s.y,m[l+h+2]=s.z,m[l+h+3]=0),!0===r&&(s.fromBufferAttribute(i,e),m[l+h+4]=s.x,m[l+h+5]=s.y,m[l+h+6]=s.z,m[l+h+7]=0),!0===a&&(s.fromBufferAttribute(o,e),m[l+h+8]=s.x,m[l+h+9]=s.y,m[l+h+10]=s.z,m[l+h+11]=4===o.itemSize?s.w:1)}}u={count:l,texture:g,size:new cr(p,v)},i.set(o,u),o.addEventListener("dispose",t)}if(!0===r.isInstancedMesh&&null!==r.morphTexture)a.getUniforms().setValue(t,"morphTexture",r.morphTexture,n)
else{let e=0
for(let t=0;t<h.length;t++)e+=h[t]
const n=o.morphTargetsRelative?1:1-e
a.getUniforms().setValue(t,"morphTargetBaseInfluence",n),a.getUniforms().setValue(t,"morphTargetInfluences",h)}a.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),a.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}}}function kt(t,e,n,i){function s(t){const e=t.target
e.removeEventListener("dispose",s),n.remove(e.instanceMatrix),null!==e.instanceColor&&n.remove(e.instanceColor)}let r=new WeakMap
return{update:function(o){const a=i.render.frame,h=o.geometry,c=e.get(o,h)
if(r.get(c)!==a&&(e.update(c),r.set(c,a)),o.isInstancedMesh&&(!1===o.hasEventListener("dispose",s)&&o.addEventListener("dispose",s),r.get(o)!==a&&(n.update(o.instanceMatrix,t.ARRAY_BUFFER),null!==o.instanceColor&&n.update(o.instanceColor,t.ARRAY_BUFFER),r.set(o,a))),o.isSkinnedMesh){const t=o.skeleton
r.get(t)!==a&&(t.update(),r.set(t,a))}return c},dispose:function(){r=new WeakMap}}}function zt(t,e,n){const i=t[0]
if(i<=0||i>0)return t
const s=e*n
let r=cd[s]
if(void 0===r&&(r=new Float32Array(s),cd[s]=r),0!==e){i.toArray(r,0)
for(let i=1,s=0;i!==e;++i)s+=n,t[i].toArray(r,s)}return r}function Wt(t,e){if(t.length!==e.length)return!1
for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1
return!0}function jt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Xt(t,e){let n=ld[e]
void 0===n&&(n=new Int32Array(e),ld[e]=n)
for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit()
return n}function qt(t,e){const n=this.cache
n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Yt(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y||(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y)
else{if(Wt(n,e))return
t.uniform2fv(this.addr,e),jt(n,e)}}function $t(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z||(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z)
else if(void 0!==e.r)n[0]===e.r&&n[1]===e.g&&n[2]===e.b||(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b)
else{if(Wt(n,e))return
t.uniform3fv(this.addr,e),jt(n,e)}}function Jt(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z&&n[3]===e.w||(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w)
else{if(Wt(n,e))return
t.uniform4fv(this.addr,e),jt(n,e)}}function Zt(t,e){const n=this.cache,i=e.elements
if(void 0===i){if(Wt(n,e))return
t.uniformMatrix2fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return
dd.set(i),t.uniformMatrix2fv(this.addr,!1,dd),jt(n,i)}}function Kt(t,e){const n=this.cache,i=e.elements
if(void 0===i){if(Wt(n,e))return
t.uniformMatrix3fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return
fd.set(i),t.uniformMatrix3fv(this.addr,!1,fd),jt(n,i)}}function Qt(t,e){const n=this.cache,i=e.elements
if(void 0===i){if(Wt(n,e))return
t.uniformMatrix4fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return
ud.set(i),t.uniformMatrix4fv(this.addr,!1,ud),jt(n,i)}}function te(t,e){const n=this.cache
n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function ee(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y||(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y)
else{if(Wt(n,e))return
t.uniform2iv(this.addr,e),jt(n,e)}}function ne(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z||(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z)
else{if(Wt(n,e))return
t.uniform3iv(this.addr,e),jt(n,e)}}function ie(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z&&n[3]===e.w||(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w)
else{if(Wt(n,e))return
t.uniform4iv(this.addr,e),jt(n,e)}}function se(t,e){const n=this.cache
n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function re(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y||(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y)
else{if(Wt(n,e))return
t.uniform2uiv(this.addr,e),jt(n,e)}}function oe(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z||(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z)
else{if(Wt(n,e))return
t.uniform3uiv(this.addr,e),jt(n,e)}}function ae(t,e){const n=this.cache
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z&&n[3]===e.w||(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w)
else{if(Wt(n,e))return
t.uniform4uiv(this.addr,e),jt(n,e)}}function he(t,e,n){const i=this.cache,s=n.allocateTextureUnit()
let r
i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),this.type===t.SAMPLER_2D_SHADOW?(rd.compareFunction=515,r=rd):r=sd,n.setTexture2D(e||r,s)}function ce(t,e,n){const i=this.cache,s=n.allocateTextureUnit()
i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(e||ad,s)}function le(t,e,n){const i=this.cache,s=n.allocateTextureUnit()
i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(e||hd,s)}function ue(t,e,n){const i=this.cache,s=n.allocateTextureUnit()
i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(e||od,s)}function fe(t,e){t.uniform1fv(this.addr,e)}function de(t,e){const n=zt(e,this.size,2)
t.uniform2fv(this.addr,n)}function pe(t,e){const n=zt(e,this.size,3)
t.uniform3fv(this.addr,n)}function ve(t,e){const n=zt(e,this.size,4)
t.uniform4fv(this.addr,n)}function me(t,e){const n=zt(e,this.size,4)
t.uniformMatrix2fv(this.addr,!1,n)}function ge(t,e){const n=zt(e,this.size,9)
t.uniformMatrix3fv(this.addr,!1,n)}function _e(t,e){const n=zt(e,this.size,16)
t.uniformMatrix4fv(this.addr,!1,n)}function Me(t,e){t.uniform1iv(this.addr,e)}function we(t,e){t.uniform2iv(this.addr,e)}function Se(t,e){t.uniform3iv(this.addr,e)}function xe(t,e){t.uniform4iv(this.addr,e)}function ye(t,e){t.uniform1uiv(this.addr,e)}function Ee(t,e){t.uniform2uiv(this.addr,e)}function be(t,e){t.uniform3uiv(this.addr,e)}function Ae(t,e){t.uniform4uiv(this.addr,e)}function Te(t,e,n){const i=this.cache,s=e.length,r=Xt(n,s)
Wt(i,r)||(t.uniform1iv(this.addr,r),jt(i,r))
for(let o=0;o!==s;++o)n.setTexture2D(e[o]||sd,r[o])}function Ce(t,e,n){const i=this.cache,s=e.length,r=Xt(n,s)
Wt(i,r)||(t.uniform1iv(this.addr,r),jt(i,r))
for(let o=0;o!==s;++o)n.setTexture3D(e[o]||ad,r[o])}function Le(t,e,n){const i=this.cache,s=e.length,r=Xt(n,s)
Wt(i,r)||(t.uniform1iv(this.addr,r),jt(i,r))
for(let o=0;o!==s;++o)n.setTextureCube(e[o]||hd,r[o])}function Pe(t,e,n){const i=this.cache,s=e.length,r=Xt(n,s)
Wt(i,r)||(t.uniform1iv(this.addr,r),jt(i,r))
for(let o=0;o!==s;++o)n.setTexture2DArray(e[o]||od,r[o])}function Ne(t,e){t.seq.push(e),t.map[e.id]=e}function De(t,e,n){const i=t.name,s=i.length
for(gd.lastIndex=0;;){const r=gd.exec(i),o=gd.lastIndex
let a=r[1]
const h="]"===r[2],c=r[3]
if(h&&(a|=0),void 0===c||"["===c&&o+2===s){Ne(n,void 0===c?new pd(a,t,e):new vd(a,t,e))
break}{let t=n.map[a]
void 0===t&&(t=new md(a),Ne(n,t)),n=t}}}function Ue(t,e,n){const i=t.createShader(e)
return t.shaderSource(i,n),t.compileShader(i),i}function Ie(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim()
if(i&&""===s)return""
const r=/ERROR: 0:(\d+)/.exec(s)
if(r){const i=parseInt(r[1])
return n.toUpperCase()+"\n\n"+s+"\n\n"+function(t,e){const n=t.split("\n"),i=[],s=Math.max(e-6,0),r=Math.min(e+6,n.length)
for(let o=s;o<r;o++){const t=o+1
i.push(`${t===e?">":" "} ${t}: ${n[o]}`)}return i.join("\n")}(t.getShaderSource(e),i)}return s}function Re(t,e){const n=function(t){wr.I(wd,wr.workingColorSpace,t)
const e=`mat3( ${wd.elements.map(t=>t.toFixed(4))} )`
switch(wr.getTransfer(t)){case ks:return[e,"LinearTransferOETF"]
case zs:return[e,"sRGBTransferOETF"]
default:return void 0,[e,"LinearTransferOETF"]}}(e)
return[`vec4 ${t}( vec4 value ) {`,`\treturn ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join("\n")}function Oe(t,e){let n
switch(e){case 1:n="Linear"
break
case 2:n="Reinhard"
break
case 3:n="Cineon"
break
case 4:n="ACESFilmic"
break
case 6:n="AgX"
break
case 7:n="Neutral"
break
case 5:n="Custom"
break
default:void 0,n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Fe(t){return""!==t}function He(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps
return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Be(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Ge(t){return t.replace(xd,Ve)}function Ve(t,e){let n=Gf[e]
if(void 0===n){const t=yd.get(e)
if(void 0===t)throw new Error("Can not resolve #include <"+e+">")
n=Gf[t]}return Ge(n)}function ke(t){return t.replace(Ed,ze)}function ze(t,e,n,i){let s=""
for(let r=parseInt(e);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r)
return s}function We(t){let e=`precision ${t.precision} float;\n\tprecision ${t.precision} int;\n\tprecision ${t.precision} sampler2D;\n\tprecision ${t.precision} samplerCube;\n\tprecision ${t.precision} sampler3D;\n\tprecision ${t.precision} sampler2DArray;\n\tprecision ${t.precision} sampler2DShadow;\n\tprecision ${t.precision} samplerCubeShadow;\n\tprecision ${t.precision} sampler2DArrayShadow;\n\tprecision ${t.precision} isampler2D;\n\tprecision ${t.precision} isampler3D;\n\tprecision ${t.precision} isamplerCube;\n\tprecision ${t.precision} isampler2DArray;\n\tprecision ${t.precision} usampler2D;\n\tprecision ${t.precision} usampler3D;\n\tprecision ${t.precision} usamplerCube;\n\tprecision ${t.precision} usampler2DArray;\n\t`
return"highp"===t.precision?e+="\n#define HIGH_PRECISION":"mediump"===t.precision?e+="\n#define MEDIUM_PRECISION":"lowp"===t.precision&&(e+="\n#define LOW_PRECISION"),e}function je(t,e,n,i){function s(e){if(t.debug.checkShaderErrors){const n=r.getProgramInfoLog(m)||"",i=r.getShaderInfoLog(x)||"",s=r.getShaderInfoLog(y)||"",o=n.trim(),a=i.trim(),h=s.trim()
let c=!0,l=!0
!1===r.getProgramParameter(m,r.LINK_STATUS)?(c=!1,"function"==typeof t.debug.onShaderError?t.debug.onShaderError(r,m,x,y):(Ie(r,x,"vertex"),Ie(r,y,"fragment"))):""!==o?void 0:""!==a&&""!==h||(l=!1),l&&(e.diagnostics={runnable:c,programLog:o,vertexShader:{log:a,prefix:g},fragmentShader:{log:h,prefix:_}})}r.deleteShader(x),r.deleteShader(y),E=new _d(r,m),b=function(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES)
for(let s=0;s<i;s++){const i=t.getActiveAttrib(e,s),r=i.name
let o=1
i.type===t.FLOAT_MAT2&&(o=2),i.type===t.FLOAT_MAT3&&(o=3),i.type===t.FLOAT_MAT4&&(o=4),n[r]={type:i.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}(r,m)}const r=t.getContext(),o=n.defines
let a=n.vertexShader,h=n.fragmentShader
const c=function(t){let e="SHADOWMAP_TYPE_BASIC"
return 1===t.shadowMapType?e="SHADOWMAP_TYPE_PCF":2===t.shadowMapType?e="SHADOWMAP_TYPE_PCF_SOFT":3===t.shadowMapType&&(e="SHADOWMAP_TYPE_VSM"),e}(n),l=function(t){let e="ENVMAP_TYPE_CUBE"
if(t.envMap)switch(t.envMapMode){case gi:case _i:e="ENVMAP_TYPE_CUBE"
break
case Si:e="ENVMAP_TYPE_CUBE_UV"}return e}(n),u=function(t){let e="ENVMAP_MODE_REFLECTION"
return t.envMap&&t.envMapMode===_i&&(e="ENVMAP_MODE_REFRACTION"),e}(n),f=function(t){let e="ENVMAP_BLENDING_NONE"
if(t.envMap)switch(t.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY"
break
case 1:e="ENVMAP_BLENDING_MIX"
break
case 2:e="ENVMAP_BLENDING_ADD"}return e}(n),d=function(t){const e=t.envMapCubeUVHeight
if(null===e)return null
const n=Math.log2(e)-2,i=1/e
return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}(n),p=function(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fe).join("\n")}(n),v=function(t){const e=[]
for(const n in t){const i=t[n]
!1!==i&&e.push("#define "+n+" "+i)}return e.join("\n")}(o),m=r.createProgram()
let g,_,M=n.glslVersion?"#version "+n.glslVersion+"\n":""
n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Fe).join("\n"),g.length>0&&(g+="\n"),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Fe).join("\n"),_.length>0&&(_+="\n")):(g=[We(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&!1===n.flatShading?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&!1===n.flatShading?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(Fe).join("\n"),_=[We(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&!1===n.flatShading?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",0!==n.toneMapping?"#define TONE_MAPPING":"",0!==n.toneMapping?Gf.tonemapping_pars_fragment:"",0!==n.toneMapping?Oe("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gf.colorspace_pars_fragment,Re("linearToOutputTexel",n.outputColorSpace),(wr.getLuminanceCoefficients(Sd),["float luminance( const in vec3 rgb ) {",`\tconst vec3 weights = vec3( ${Sd.x.toFixed(4)}, ${Sd.y.toFixed(4)}, ${Sd.z.toFixed(4)} );`,"\treturn dot( weights, rgb );","}"].join("\n")),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"","\n"].filter(Fe).join("\n")),a=Ge(a),a=He(a,n),a=Be(a,n),h=Ge(h),h=He(h,n),h=Be(h,n),a=ke(a),h=ke(h),!0!==n.isRawShaderMaterial&&(M="#version 300 es\n",g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join("\n")+"\n"+g,_=["#define varying in",n.glslVersion===tr?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===tr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+_)
const w=M+g+a,S=M+_+h,x=Ue(r,r.VERTEX_SHADER,w),y=Ue(r,r.FRAGMENT_SHADER,S)
let E,b
r.attachShader(m,x),r.attachShader(m,y),void 0!==n.index0AttributeName?r.bindAttribLocation(m,0,n.index0AttributeName):!0===n.morphTargets&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m),this.getUniforms=function(){return void 0===E&&s(this),E},this.getAttributes=function(){return void 0===b&&s(this),b}
let A=!1===n.rendererExtensionParallelShaderCompile
return this.isReady=function(){return!1===A&&(A=r.getProgramParameter(m,37297)),A},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Md++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=x,this.fragmentShader=y,this}function Xe(t,e,n,i,s,r,o){function a(t){return l.add(t),0===t?"uv":`uv${t}`}const h=new go,c=new Ad,l=new Set,u=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures
let p=s.precision
const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"}
return{getParameters:function(r,h,u,m,g){const _=m.fog,M=g.geometry,w=r.isMeshStandardMaterial?m.environment:null,S=(r.isMeshStandardMaterial?n:e).get(r.envMap||w),x=S&&S.mapping===Si?S.image.height:null,y=v[r.type]
null!==r.precision&&(p=s.getMaxPrecision(r.precision),p!==r.precision)
const E=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,b=void 0!==E?E.length:0
let A,T,C,L,P=0
if(void 0!==M.morphAttributes.position&&(P=1),void 0!==M.morphAttributes.normal&&(P=2),void 0!==M.morphAttributes.color&&(P=3),y){const t=kf[y]
A=t.vertexShader,T=t.fragmentShader}else A=r.vertexShader,T=r.fragmentShader,c.update(r),C=c.getVertexShaderID(r),L=c.getFragmentShaderID(r)
const N=t.getRenderTarget(),D=t.state.buffers.depth.getReversed(),U=!0===g.isInstancedMesh,I=!0===g.isBatchedMesh,R=!!r.map,O=!!r.matcap,F=!!S,H=!!r.aoMap,B=!!r.lightMap,G=!!r.bumpMap,V=!!r.normalMap,k=!!r.displacementMap,z=!!r.emissiveMap,W=!!r.metalnessMap,j=!!r.roughnessMap,X=r.anisotropy>0,q=r.clearcoat>0,Y=r.dispersion>0,$=r.iridescence>0,J=r.sheen>0,Z=r.transmission>0,K=X&&!!r.anisotropyMap,Q=q&&!!r.clearcoatMap,tt=q&&!!r.clearcoatNormalMap,et=q&&!!r.clearcoatRoughnessMap,nt=$&&!!r.iridescenceMap,it=$&&!!r.iridescenceThicknessMap,st=J&&!!r.sheenColorMap,rt=J&&!!r.sheenRoughnessMap,ot=!!r.specularMap,at=!!r.specularColorMap,ht=!!r.specularIntensityMap,ct=Z&&!!r.transmissionMap,lt=Z&&!!r.thicknessMap,ut=!!r.gradientMap,ft=!!r.alphaMap,dt=r.alphaTest>0,pt=!!r.alphaHash,vt=!!r.extensions
let mt=0
r.toneMapped&&(null!==N&&!0!==N.isXRRenderTarget||(mt=t.toneMapping))
const gt={shaderID:y,shaderType:r.type,shaderName:r.name,vertexShader:A,fragmentShader:T,defines:r.defines,customVertexShaderID:C,customFragmentShaderID:L,isRawShaderMaterial:!0===r.isRawShaderMaterial,glslVersion:r.glslVersion,precision:p,batching:I,batchingColor:I&&null!==g.R,instancing:U,instancingColor:U&&null!==g.instanceColor,instancingMorph:U&&null!==g.morphTexture,supportsVertexTextures:d,outputColorSpace:null===N?t.outputColorSpace:!0===N.isXRRenderTarget?N.texture.colorSpace:Vs,alphaToCoverage:!!r.alphaToCoverage,map:R,matcap:O,envMap:F,envMapMode:F&&S.mapping,envMapCubeUVHeight:x,aoMap:H,lightMap:B,bumpMap:G,normalMap:V,displacementMap:d&&k,emissiveMap:z,normalMapObjectSpace:V&&1===r.normalMapType,normalMapTangentSpace:V&&0===r.normalMapType,metalnessMap:W,roughnessMap:j,anisotropy:X,anisotropyMap:K,clearcoat:q,clearcoatMap:Q,clearcoatNormalMap:tt,clearcoatRoughnessMap:et,dispersion:Y,iridescence:$,iridescenceMap:nt,iridescenceThicknessMap:it,sheen:J,sheenColorMap:st,sheenRoughnessMap:rt,specularMap:ot,specularColorMap:at,specularIntensityMap:ht,transmission:Z,transmissionMap:ct,thicknessMap:lt,gradientMap:ut,opaque:!1===r.transparent&&1===r.blending&&!1===r.alphaToCoverage,alphaMap:ft,alphaTest:dt,alphaHash:pt,combine:r.combine,mapUv:R&&a(r.map.channel),aoMapUv:H&&a(r.aoMap.channel),lightMapUv:B&&a(r.lightMap.channel),bumpMapUv:G&&a(r.bumpMap.channel),normalMapUv:V&&a(r.normalMap.channel),displacementMapUv:k&&a(r.displacementMap.channel),emissiveMapUv:z&&a(r.emissiveMap.channel),metalnessMapUv:W&&a(r.metalnessMap.channel),roughnessMapUv:j&&a(r.roughnessMap.channel),anisotropyMapUv:K&&a(r.anisotropyMap.channel),clearcoatMapUv:Q&&a(r.clearcoatMap.channel),clearcoatNormalMapUv:tt&&a(r.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&a(r.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&a(r.iridescenceMap.channel),iridescenceThicknessMapUv:it&&a(r.iridescenceThicknessMap.channel),sheenColorMapUv:st&&a(r.sheenColorMap.channel),sheenRoughnessMapUv:rt&&a(r.sheenRoughnessMap.channel),specularMapUv:ot&&a(r.specularMap.channel),specularColorMapUv:at&&a(r.specularColorMap.channel),specularIntensityMapUv:ht&&a(r.specularIntensityMap.channel),transmissionMapUv:ct&&a(r.transmissionMap.channel),thicknessMapUv:lt&&a(r.thicknessMap.channel),alphaMapUv:ft&&a(r.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(V||X),vertexColors:r.vertexColors,vertexAlphas:!0===r.vertexColors&&!!M.attributes.color&&4===M.attributes.color.itemSize,pointsUvs:!0===g.isPoints&&!!M.attributes.uv&&(R||ft),fog:!!_,useFog:!0===r.fog,fogExp2:!!_&&_.isFogExp2,flatShading:!0===r.flatShading&&!1===r.wireframe,sizeAttenuation:!0===r.sizeAttenuation,logarithmicDepthBuffer:f,reversedDepthBuffer:D,skinning:!0===g.isSkinnedMesh,morphTargets:void 0!==M.morphAttributes.position,morphNormals:void 0!==M.morphAttributes.normal,morphColors:void 0!==M.morphAttributes.color,morphTargetsCount:b,morphTextureStride:P,numDirLights:h.directional.length,numPointLights:h.point.length,numSpotLights:h.spot.length,numSpotLightMaps:h.spotLightMap.length,numRectAreaLights:h.rectArea.length,numHemiLights:h.hemi.length,numDirLightShadows:h.directionalShadowMap.length,numPointLightShadows:h.pointShadowMap.length,numSpotLightShadows:h.spotShadowMap.length,numSpotLightShadowsWithMaps:h.numSpotLightShadowsWithMaps,numLightProbes:h.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:r.dithering,shadowMapEnabled:t.shadowMap.enabled&&u.length>0,shadowMapType:t.shadowMap.type,toneMapping:mt,decodeVideoTexture:R&&!0===r.map.isVideoTexture&&wr.getTransfer(r.map.colorSpace)===zs,decodeVideoTextureEmissive:z&&!0===r.emissiveMap.isVideoTexture&&wr.getTransfer(r.emissiveMap.colorSpace)===zs,premultipliedAlpha:r.premultipliedAlpha,doubleSided:2===r.side,flipSided:1===r.side,useDepthPacking:r.depthPacking>=0,depthPacking:r.depthPacking||0,index0AttributeName:r.index0AttributeName,extensionClipCullDistance:vt&&!0===r.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&!0===r.extensions.multiDraw||I)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:r.customProgramCacheKey()}
return gt.vertexUv1s=l.has(1),gt.vertexUv2s=l.has(2),gt.vertexUv3s=l.has(3),l.clear(),gt},getProgramCacheKey:function(e){const n=[]
if(e.shaderID?n.push(e.shaderID):(n.push(e.customVertexShaderID),n.push(e.customFragmentShaderID)),void 0!==e.defines)for(const t in e.defines)n.push(t),n.push(e.defines[t])
return!1===e.isRawShaderMaterial&&(!function(t,e){t.push(e.precision),t.push(e.outputColorSpace),t.push(e.envMapMode),t.push(e.envMapCubeUVHeight),t.push(e.mapUv),t.push(e.alphaMapUv),t.push(e.lightMapUv),t.push(e.aoMapUv),t.push(e.bumpMapUv),t.push(e.normalMapUv),t.push(e.displacementMapUv),t.push(e.emissiveMapUv),t.push(e.metalnessMapUv),t.push(e.roughnessMapUv),t.push(e.anisotropyMapUv),t.push(e.clearcoatMapUv),t.push(e.clearcoatNormalMapUv),t.push(e.clearcoatRoughnessMapUv),t.push(e.iridescenceMapUv),t.push(e.iridescenceThicknessMapUv),t.push(e.sheenColorMapUv),t.push(e.sheenRoughnessMapUv),t.push(e.specularMapUv),t.push(e.specularColorMapUv),t.push(e.specularIntensityMapUv),t.push(e.transmissionMapUv),t.push(e.thicknessMapUv),t.push(e.combine),t.push(e.fogExp2),t.push(e.sizeAttenuation),t.push(e.morphTargetsCount),t.push(e.morphAttributeCount),t.push(e.numDirLights),t.push(e.numPointLights),t.push(e.numSpotLights),t.push(e.numSpotLightMaps),t.push(e.numHemiLights),t.push(e.numRectAreaLights),t.push(e.numDirLightShadows),t.push(e.numPointLightShadows),t.push(e.numSpotLightShadows),t.push(e.numSpotLightShadowsWithMaps),t.push(e.numLightProbes),t.push(e.shadowMapType),t.push(e.toneMapping),t.push(e.numClippingPlanes),t.push(e.numClipIntersection),t.push(e.depthPacking)}(n,e),function(t,e){h.disableAll(),e.supportsVertexTextures&&h.enable(0),e.instancing&&h.enable(1),e.instancingColor&&h.enable(2),e.instancingMorph&&h.enable(3),e.matcap&&h.enable(4),e.envMap&&h.enable(5),e.normalMapObjectSpace&&h.enable(6),e.normalMapTangentSpace&&h.enable(7),e.clearcoat&&h.enable(8),e.iridescence&&h.enable(9),e.alphaTest&&h.enable(10),e.vertexColors&&h.enable(11),e.vertexAlphas&&h.enable(12),e.vertexUv1s&&h.enable(13),e.vertexUv2s&&h.enable(14),e.vertexUv3s&&h.enable(15),e.vertexTangents&&h.enable(16),e.anisotropy&&h.enable(17),e.alphaHash&&h.enable(18),e.batching&&h.enable(19),e.dispersion&&h.enable(20),e.batchingColor&&h.enable(21),e.gradientMap&&h.enable(22),t.push(h.mask),h.disableAll(),e.fog&&h.enable(0),e.useFog&&h.enable(1),e.flatShading&&h.enable(2),e.logarithmicDepthBuffer&&h.enable(3),e.reversedDepthBuffer&&h.enable(4),e.skinning&&h.enable(5),e.morphTargets&&h.enable(6),e.morphNormals&&h.enable(7),e.morphColors&&h.enable(8),e.premultipliedAlpha&&h.enable(9),e.shadowMapEnabled&&h.enable(10),e.doubleSided&&h.enable(11),e.flipSided&&h.enable(12),e.useDepthPacking&&h.enable(13),e.dithering&&h.enable(14),e.transmission&&h.enable(15),e.sheen&&h.enable(16),e.opaque&&h.enable(17),e.pointsUvs&&h.enable(18),e.decodeVideoTexture&&h.enable(19),e.decodeVideoTextureEmissive&&h.enable(20),e.alphaToCoverage&&h.enable(21),t.push(h.mask)}(n,e),n.push(t.outputColorSpace)),n.push(e.customProgramCacheKey),n.join()},getUniforms:function(t){const e=v[t.type]
let n
if(e){const t=kf[e]
n=Na.clone(t.uniforms)}else n=t.uniforms
return n},acquireProgram:function(e,n){let i
for(let t=0,s=u.length;t<s;t++){const e=u[t]
if(e.cacheKey===n){i=e,++i.usedTimes
break}}return void 0===i&&(i=new je(t,n,e,r),u.push(i)),i},releaseProgram:function(t){if(0===--t.usedTimes){const e=u.indexOf(t)
u[e]=u[u.length-1],u.pop(),t.destroy()}},releaseShaderCache:function(t){c.remove(t)},programs:u,dispose:function(){c.dispose()}}}function qe(){let t=new WeakMap
return{has:function(e){return t.has(e)},get:function(e){let n=t.get(e)
return void 0===n&&(n={},t.set(e,n)),n},remove:function(e){t.delete(e)},update:function(e,n,i){t.get(e)[n]=i},dispose:function(){t=new WeakMap}}}function Ye(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function $e(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Je(){function t(t,i,s,r,o,a){let h=e[n]
return void 0===h?(h={id:t.id,object:t,geometry:i,material:s,groupOrder:r,renderOrder:t.renderOrder,z:o,group:a},e[n]=h):(h.id=t.id,h.object=t,h.geometry=i,h.material=s,h.groupOrder=r,h.renderOrder=t.renderOrder,h.z=o,h.group=a),n++,h}const e=[]
let n=0
const i=[],s=[],r=[]
return{opaque:i,transmissive:s,transparent:r,init:function(){n=0,i.length=0,s.length=0,r.length=0},push:function(e,n,o,a,h,c){const l=t(e,n,o,a,h,c)
o.transmission>0?s.push(l):!0===o.transparent?r.push(l):i.push(l)},unshift:function(e,n,o,a,h,c){const l=t(e,n,o,a,h,c)
o.transmission>0?s.unshift(l):!0===o.transparent?r.unshift(l):i.unshift(l)},finish:function(){for(let t=n,i=e.length;t<i;t++){const n=e[t]
if(null===n.id)break
n.id=null,n.object=null,n.geometry=null,n.material=null,n.group=null}},sort:function(t,e){i.length>1&&i.sort(t||Ye),s.length>1&&s.sort(e||$e),r.length>1&&r.sort(e||$e)}}}function Ze(){let t=new WeakMap
return{get:function(e,n){const i=t.get(e)
let s
return void 0===i?(s=new Je,t.set(e,[s])):n>=i.length?(s=new Je,i.push(s)):s=i[n],s},dispose:function(){t=new WeakMap}}}function Ke(){const t={}
return{get:function(e){if(void 0!==t[e.id])return t[e.id]
let n
switch(e.type){case"DirectionalLight":n={direction:new ur,color:new Zo}
break
case"SpotLight":n={position:new ur,direction:new ur,color:new Zo,distance:0,coneCos:0,penumbraCos:0,decay:0}
break
case"PointLight":n={position:new ur,color:new Zo,distance:0,decay:0}
break
case"HemisphereLight":n={direction:new ur,skyColor:new Zo,groundColor:new Zo}
break
case"RectAreaLight":n={color:new Zo,position:new ur,halfWidth:new ur,halfHeight:new ur}}return t[e.id]=n,n}}}function Qe(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function tn(t){const e=new Ke,n=function(){const t={}
return{get:function(e){if(void 0!==t[e.id])return t[e.id]
let n
switch(e.type){case"DirectionalLight":case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new cr}
break
case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new cr,shadowCameraNear:1,shadowCameraFar:1e3}}return t[e.id]=n,n}}}(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0}
for(let a=0;a<9;a++)i.probe.push(new ur)
const s=new ur,r=new ro,o=new ro
return{setup:function(s){let r=0,o=0,a=0
for(let t=0;t<9;t++)i.probe[t].set(0,0,0)
let h=0,c=0,l=0,u=0,f=0,d=0,p=0,v=0,m=0,g=0,_=0
s.sort(Qe)
for(let t=0,w=s.length;t<w;t++){const M=s[t],w=M.color,S=M.intensity,x=M.distance,y=M.shadow&&M.shadow.map?M.shadow.map.texture:null
if(M.isAmbientLight)r+=w.r*S,o+=w.g*S,a+=w.b*S
else if(M.isLightProbe){for(let t=0;t<9;t++)i.probe[t].addScaledVector(M.sh.coefficients[t],S)
_++}else if(M.isDirectionalLight){const t=e.get(M)
if(t.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const t=M.shadow,e=n.get(M)
e.shadowIntensity=t.intensity,e.shadowBias=t.bias,e.shadowNormalBias=t.normalBias,e.shadowRadius=t.radius,e.shadowMapSize=t.mapSize,i.directionalShadow[h]=e,i.directionalShadowMap[h]=y,i.directionalShadowMatrix[h]=M.shadow.matrix,d++}i.directional[h]=t,h++}else if(M.isSpotLight){const t=e.get(M)
t.position.setFromMatrixPosition(M.matrixWorld),t.color.copy(w).multiplyScalar(S),t.distance=x,t.coneCos=Math.cos(M.angle),t.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),t.decay=M.decay,i.spot[l]=t
const s=M.shadow
if(M.map&&(i.spotLightMap[m]=M.map,m++,s.updateMatrices(M),M.castShadow&&g++),i.spotLightMatrix[l]=s.matrix,M.castShadow){const t=n.get(M)
t.shadowIntensity=s.intensity,t.shadowBias=s.bias,t.shadowNormalBias=s.normalBias,t.shadowRadius=s.radius,t.shadowMapSize=s.mapSize,i.spotShadow[l]=t,i.spotShadowMap[l]=y,v++}l++}else if(M.isRectAreaLight){const t=e.get(M)
t.color.copy(w).multiplyScalar(S),t.halfWidth.set(.5*M.width,0,0),t.halfHeight.set(0,.5*M.height,0),i.rectArea[u]=t,u++}else if(M.isPointLight){const t=e.get(M)
if(t.color.copy(M.color).multiplyScalar(M.intensity),t.distance=M.distance,t.decay=M.decay,M.castShadow){const t=M.shadow,e=n.get(M)
e.shadowIntensity=t.intensity,e.shadowBias=t.bias,e.shadowNormalBias=t.normalBias,e.shadowRadius=t.radius,e.shadowMapSize=t.mapSize,e.shadowCameraNear=t.camera.near,e.shadowCameraFar=t.camera.far,i.pointShadow[c]=e,i.pointShadowMap[c]=y,i.pointShadowMatrix[c]=M.shadow.matrix,p++}i.point[c]=t,c++}else if(M.isHemisphereLight){const t=e.get(M)
t.skyColor.copy(M.color).multiplyScalar(S),t.groundColor.copy(M.groundColor).multiplyScalar(S),i.hemi[f]=t,f++}}u>0&&(!0===t.has("OES_texture_float_linear")?(i.rectAreaLTC1=Vf.LTC_FLOAT_1,i.rectAreaLTC2=Vf.LTC_FLOAT_2):(i.rectAreaLTC1=Vf.LTC_HALF_1,i.rectAreaLTC2=Vf.LTC_HALF_2)),i.ambient[0]=r,i.ambient[1]=o,i.ambient[2]=a
const M=i.hash
M.directionalLength===h&&M.pointLength===c&&M.spotLength===l&&M.rectAreaLength===u&&M.hemiLength===f&&M.numDirectionalShadows===d&&M.numPointShadows===p&&M.numSpotShadows===v&&M.numSpotMaps===m&&M.numLightProbes===_||(i.directional.length=h,i.spot.length=l,i.rectArea.length=u,i.point.length=c,i.hemi.length=f,i.directionalShadow.length=d,i.directionalShadowMap.length=d,i.pointShadow.length=p,i.pointShadowMap.length=p,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=d,i.pointShadowMatrix.length=p,i.spotLightMatrix.length=v+m-g,i.spotLightMap.length=m,i.numSpotLightShadowsWithMaps=g,i.numLightProbes=_,M.directionalLength=h,M.pointLength=c,M.spotLength=l,M.rectAreaLength=u,M.hemiLength=f,M.numDirectionalShadows=d,M.numPointShadows=p,M.numSpotShadows=v,M.numSpotMaps=m,M.numLightProbes=_,i.version=Cd++)},setupView:function(t,e){let n=0,a=0,h=0,c=0,l=0
const u=e.matrixWorldInverse
for(let f=0,d=t.length;f<d;f++){const e=t[f]
if(e.isDirectionalLight){const t=i.directional[n]
t.direction.setFromMatrixPosition(e.matrixWorld),s.setFromMatrixPosition(e.target.matrixWorld),t.direction.sub(s),t.direction.transformDirection(u),n++}else if(e.isSpotLight){const t=i.spot[h]
t.position.setFromMatrixPosition(e.matrixWorld),t.position.applyMatrix4(u),t.direction.setFromMatrixPosition(e.matrixWorld),s.setFromMatrixPosition(e.target.matrixWorld),t.direction.sub(s),t.direction.transformDirection(u),h++}else if(e.isRectAreaLight){const t=i.rectArea[c]
t.position.setFromMatrixPosition(e.matrixWorld),t.position.applyMatrix4(u),o.identity(),r.copy(e.matrixWorld),r.premultiply(u),o.extractRotation(r),t.halfWidth.set(.5*e.width,0,0),t.halfHeight.set(0,.5*e.height,0),t.halfWidth.applyMatrix4(o),t.halfHeight.applyMatrix4(o),c++}else if(e.isPointLight){const t=i.point[a]
t.position.setFromMatrixPosition(e.matrixWorld),t.position.applyMatrix4(u),a++}else if(e.isHemisphereLight){const t=i.hemi[l]
t.direction.setFromMatrixPosition(e.matrixWorld),t.direction.transformDirection(u),l++}}},state:i}}function en(t){const e=new tn(t),n=[],i=[],s={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}}
return{init:function(t){s.camera=t,n.length=0,i.length=0},state:s,setupLights:function(){e.setup(n)},setupLightsView:function(t){e.setupView(n,t)},pushLight:function(t){n.push(t)},pushShadow:function(t){i.push(t)}}}function nn(t){let e=new WeakMap
return{get:function(n,i=0){const s=e.get(n)
let r
return void 0===s?(r=new en(t),e.set(n,[r])):i>=s.length?(r=new en(t),s.push(r)):r=s[i],r},dispose:function(){e=new WeakMap}}}function sn(t,e,n){function i(n,i){const s=e.update(M)
m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),null===n.mapPass&&(n.mapPass=new Pr(h.x,h.y)),m.uniforms.shadow_pass.value=n.map.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,t.setRenderTarget(n.mapPass),t.clear(),t.renderBufferDirect(i,null,s,m,M,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value=n.mapSize,g.uniforms.radius.value=n.radius,t.setRenderTarget(n.map),t.clear(),t.renderBufferDirect(i,null,s,g,M,null)}function s(e,n,i,s){let r=null
const a=!0===i.isPointLight?e.customDistanceMaterial:e.customDepthMaterial
if(void 0!==a)r=a
else if(r=!0===i.isPointLight?f:u,t.localClippingEnabled&&!0===n.clipShadows&&Array.isArray(n.clippingPlanes)&&0!==n.clippingPlanes.length||n.displacementMap&&0!==n.displacementScale||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||!0===n.alphaToCoverage){const t=r.uuid,e=n.uuid
let i=d[t]
void 0===i&&(i={},d[t]=i)
let s=i[e]
void 0===s&&(s=r.clone(),i[e]=s,n.addEventListener("dispose",o)),r=s}return r.visible=n.visible,r.wireframe=n.wireframe,r.side=3===s?null!==n.shadowSide?n.shadowSide:n.side:null!==n.shadowSide?n.shadowSide:v[n.side],r.alphaMap=n.alphaMap,r.alphaTest=!0===n.alphaToCoverage?.5:n.alphaTest,r.map=n.map,r.clipShadows=n.clipShadows,r.clippingPlanes=n.clippingPlanes,r.clipIntersection=n.clipIntersection,r.displacementMap=n.displacementMap,r.displacementScale=n.displacementScale,r.displacementBias=n.displacementBias,r.wireframeLinewidth=n.wireframeLinewidth,r.linewidth=n.linewidth,!0===i.isPointLight&&!0===r.isMeshDistanceMaterial&&(t.properties.get(r).light=i),r}function r(n,i,o,h,c){if(!1===n.visible)return
if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&3===c)&&(!n.frustumCulled||a.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse,n.matrixWorld)
const r=e.update(n),a=n.material
if(Array.isArray(a)){const e=r.groups
for(let l=0,u=e.length;l<u;l++){const u=e[l],f=a[u.materialIndex]
if(f&&f.visible){const e=s(n,f,h,c)
n.onBeforeShadow(t,n,i,o,r,e,u),t.renderBufferDirect(o,null,r,e,n,u),n.onAfterShadow(t,n,i,o,r,e,u)}}}else if(a.visible){const e=s(n,a,h,c)
n.onBeforeShadow(t,n,i,o,r,e,null),t.renderBufferDirect(o,null,r,e,n,null),n.onAfterShadow(t,n,i,o,r,e,null)}}const l=n.children
for(let t=0,e=l.length;t<e;t++)r(l[t],i,o,h,c)}function o(t){t.target.removeEventListener("dispose",o)
for(const e in d){const n=d[e],i=t.target.uuid
i in n&&(n[i].dispose(),delete n[i])}}let a=new Xh
const h=new cr,c=new cr,l=new Cr,u=new Ul({depthPacking:3201}),f=new Il,d={},p=n.maxTextureSize,v={[Fn]:1,[Hn]:0,[Bn]:2},m=new Da({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new cr},radius:{value:4}},vertexShader:"void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"}),g=m.clone()
g.defines.HORIZONTAL_PASS=1
const _=new ga
_.setAttribute("position",new oa(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3))
const M=new La(_,m),w=this
this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1
let S=this.type
this.render=function(e,n,s){if(!1===w.enabled)return
if(!1===w.autoUpdate&&!1===w.needsUpdate)return
if(0===e.length)return
const o=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),d=t.state
d.setBlending(0),!0===d.buffers.depth.getReversed()?d.buffers.color.setClear(0,0,0,0):d.buffers.color.setClear(1,1,1,1),d.buffers.depth.setTest(!0),d.setScissorTest(!1)
const v=3!==S&&3===this.type,m=3===S&&3!==this.type
for(let g=0,_=e.length;g<_;g++){const o=e[g],u=o.shadow
if(void 0===u){void 0
continue}if(!1===u.autoUpdate&&!1===u.needsUpdate)continue
h.copy(u.mapSize)
const f=u.getFrameExtents()
if(h.multiply(f),c.copy(u.mapSize),(h.x>p||h.y>p)&&(h.x>p&&(c.x=Math.floor(p/f.x),h.x=c.x*f.x,u.mapSize.x=c.x),h.y>p&&(c.y=Math.floor(p/f.y),h.y=c.y*f.y,u.mapSize.y=c.y)),null===u.map||!0===v||!0===m){const t=3!==this.type?{minFilter:bi,magFilter:bi}:{}
null!==u.map&&u.map.dispose(),u.map=new Pr(h.x,h.y,t),u.map.texture.name=o.name+".shadowMap",u.camera.updateProjectionMatrix()}t.setRenderTarget(u.map),t.clear()
const _=u.getViewportCount()
for(let t=0;t<_;t++){const e=u.getViewport(t)
l.set(c.x*e.x,c.y*e.y,c.x*e.z,c.y*e.w),d.viewport(l),u.updateMatrices(o,t),a=u.getFrustum(),r(n,s,u.camera,o,this.type)}!0!==u.isPointLightShadow&&3===this.type&&i(u,s),u.needsUpdate=!1}S=this.type,w.needsUpdate=!1,t.setRenderTarget(o,u,f)}}function rn(t,e){function n(e,n,i,s){const r=new Uint8Array(4),o=t.createTexture()
t.bindTexture(e,o),t.texParameteri(e,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(e,t.TEXTURE_MAG_FILTER,t.NEAREST)
for(let a=0;a<i;a++)e===t.TEXTURE_3D||e===t.TEXTURE_2D_ARRAY?t.texImage3D(n,0,t.RGBA,1,1,s,0,t.RGBA,t.UNSIGNED_BYTE,r):t.texImage2D(n+a,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,r)
return o}function i(e){!0!==p[e]&&(t.enable(e),p[e]=!0)}function s(e){!1!==p[e]&&(t.disable(e),p[e]=!1)}function r(e,n,r,o,a,h,c,l,u,f){if(0===e)return!0===M&&(s(t.BLEND),M=!1),void 0
if(!1===M&&(i(t.BLEND),M=!0),5===e)a=a||n,h=h||r,c=c||o,n===S&&a===E||(t.blendEquationSeparate(X[n],X[a]),S=n,E=a),r===x&&o===y&&h===b&&c===A||(t.blendFuncSeparate(q[r],q[o],q[h],q[c]),x=r,y=o,b=h,A=c),!1!==l.equals(T)&&u===C||(t.blendColor(l.r,l.g,l.b,u),T.copy(l),C=u),w=e,L=!1
else if(e!==w||f!==L){if(S===Gn&&E===Gn||(t.blendEquation(t.FUNC_ADD),S=Gn,E=Gn),f)switch(e){case 1:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA)
break
case 2:t.blendFunc(t.ONE,t.ONE)
break
case 3:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE)
break
case 4:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE)}else switch(e){case 1:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA)
break
case 2:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE)}x=null,y=null,b=null,A=null,T.set(0,0,0),C=0,w=e,L=f}}function o(e){P!==e&&(e?t.frontFace(t.CW):t.frontFace(t.CCW),P=e)}function a(e){0!==e?(i(t.CULL_FACE),e!==N&&(1===e?t.cullFace(t.BACK):2===e?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):s(t.CULL_FACE),N=e}function h(e,n,r){e?(i(t.POLYGON_OFFSET_FILL),U===n&&I===r||(t.polygonOffset(n,r),U=n,I=r)):s(t.POLYGON_OFFSET_FILL)}const c=new function(){let e=!1
const n=new Cr
let i=null
const s=new Cr(0,0,0,0)
return{setMask:function(n){i===n||e||(t.colorMask(n,n,n,n),i=n)},setLocked:function(t){e=t},setClear:function(e,i,r,o,a){!0===a&&(e*=o,i*=o,r*=o),n.set(e,i,r,o),!1===s.equals(n)&&(t.clearColor(e,i,r,o),s.copy(n))},reset:function(){e=!1,i=null,s.set(-1,0,0,0)}}},l=new function(){let n=!1,r=!1,o=null,a=null,h=null
return{setReversed:function(t){if(r!==t){const n=e.get("EXT_clip_control")
t?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=t
const i=h
h=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(e){e?i(t.DEPTH_TEST):s(t.DEPTH_TEST)},setMask:function(e){o===e||n||(t.depthMask(e),o=e)},setFunc:function(e){if(r&&(e=Ld[e]),a!==e){switch(e){case 0:t.depthFunc(t.NEVER)
break
case 1:t.depthFunc(t.ALWAYS)
break
case 2:t.depthFunc(t.LESS)
break
case 3:default:t.depthFunc(t.LEQUAL)
break
case 4:t.depthFunc(t.EQUAL)
break
case 5:t.depthFunc(t.GEQUAL)
break
case 6:t.depthFunc(t.GREATER)
break
case 7:t.depthFunc(t.NOTEQUAL)}a=e}},setLocked:function(t){n=t},setClear:function(e){h!==e&&(r&&(e=1-e),t.clearDepth(e),h=e)},reset:function(){n=!1,o=null,a=null,h=null,r=!1}}},u=new function(){let e=!1,n=null,r=null,o=null,a=null,h=null,c=null,l=null,u=null
return{setTest:function(n){e||(n?i(t.STENCIL_TEST):s(t.STENCIL_TEST))},setMask:function(i){n===i||e||(t.stencilMask(i),n=i)},setFunc:function(e,n,i){r===e&&o===n&&a===i||(t.stencilFunc(e,n,i),r=e,o=n,a=i)},setOp:function(e,n,i){h===e&&c===n&&l===i||(t.stencilOp(e,n,i),h=e,c=n,l=i)},setLocked:function(t){e=t},setClear:function(e){u!==e&&(t.clearStencil(e),u=e)},reset:function(){e=!1,n=null,r=null,o=null,a=null,h=null,c=null,l=null,u=null}}},f=new WeakMap,d=new WeakMap
let p={},v={},m=new WeakMap,g=[],_=null,M=!1,w=null,S=null,x=null,y=null,E=null,b=null,A=null,T=new Zo(0,0,0),C=0,L=!1,P=null,N=null,D=null,U=null,I=null
const R=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
let O=!1,F=0
const H=t.getParameter(t.VERSION);-1!==H.indexOf("WebGL")?(F=parseFloat(/^WebGL (\d)/.exec(H)[1]),O=F>=1):-1!==H.indexOf("OpenGL ES")&&(F=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),O=F>=2)
let B=null,G={}
const V=t.getParameter(t.SCISSOR_BOX),k=t.getParameter(t.VIEWPORT),z=(new Cr).fromArray(V),W=(new Cr).fromArray(k),j={}
j[t.TEXTURE_2D]=n(t.TEXTURE_2D,t.TEXTURE_2D,1),j[t.TEXTURE_CUBE_MAP]=n(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[t.TEXTURE_2D_ARRAY]=n(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),j[t.TEXTURE_3D]=n(t.TEXTURE_3D,t.TEXTURE_3D,1,1),c.setClear(0,0,0,1),l.setClear(1),u.setClear(0),i(t.DEPTH_TEST),l.setFunc(3),o(!1),a(1),i(t.CULL_FACE),r(0)
const X={[Gn]:t.FUNC_ADD,[Vn]:t.FUNC_SUBTRACT,[kn]:t.FUNC_REVERSE_SUBTRACT}
X[103]=t.MIN,X[104]=t.MAX
const q={[zn]:t.ZERO,[Wn]:t.ONE,[jn]:t.SRC_COLOR,[qn]:t.SRC_ALPHA,[Qn]:t.SRC_ALPHA_SATURATE,[Zn]:t.DST_COLOR,[$n]:t.DST_ALPHA,[Xn]:t.ONE_MINUS_SRC_COLOR,[Yn]:t.ONE_MINUS_SRC_ALPHA,[Kn]:t.ONE_MINUS_DST_COLOR,[Jn]:t.ONE_MINUS_DST_ALPHA,[ti]:t.CONSTANT_COLOR,[ei]:t.ONE_MINUS_CONSTANT_COLOR,[ni]:t.CONSTANT_ALPHA,[ii]:t.ONE_MINUS_CONSTANT_ALPHA}
return{buffers:{color:c,depth:l,stencil:u},enable:i,disable:s,bindFramebuffer:function(e,n){return v[e]!==n&&(t.bindFramebuffer(e,n),v[e]=n,e===t.DRAW_FRAMEBUFFER&&(v[t.FRAMEBUFFER]=n),e===t.FRAMEBUFFER&&(v[t.DRAW_FRAMEBUFFER]=n),!0)},drawBuffers:function(e,n){let i=g,s=!1
if(e){i=m.get(n),void 0===i&&(i=[],m.set(n,i))
const r=e.textures
if(i.length!==r.length||i[0]!==t.COLOR_ATTACHMENT0){for(let e=0,n=r.length;e<n;e++)i[e]=t.COLOR_ATTACHMENT0+e
i.length=r.length,s=!0}}else i[0]!==t.BACK&&(i[0]=t.BACK,s=!0)
s&&t.drawBuffers(i)},useProgram:function(e){return _!==e&&(t.useProgram(e),_=e,!0)},setBlending:r,setMaterial:function(e,n){2===e.side?s(t.CULL_FACE):i(t.CULL_FACE)
let a=1===e.side
n&&(a=!a),o(a),1===e.blending&&!1===e.transparent?r(0):r(e.blending,e.blendEquation,e.blendSrc,e.blendDst,e.blendEquationAlpha,e.blendSrcAlpha,e.blendDstAlpha,e.blendColor,e.blendAlpha,e.premultipliedAlpha),l.setFunc(e.depthFunc),l.setTest(e.depthTest),l.setMask(e.depthWrite),c.setMask(e.colorWrite)
const f=e.stencilWrite
u.setTest(f),f&&(u.setMask(e.stencilWriteMask),u.setFunc(e.stencilFunc,e.stencilRef,e.stencilFuncMask),u.setOp(e.stencilFail,e.stencilZFail,e.stencilZPass)),h(e.polygonOffset,e.polygonOffsetFactor,e.polygonOffsetUnits),!0===e.alphaToCoverage?i(t.SAMPLE_ALPHA_TO_COVERAGE):s(t.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:o,setCullFace:a,setLineWidth:function(e){e!==D&&(O&&t.lineWidth(e),D=e)},setPolygonOffset:h,setScissorTest:function(e){e?i(t.SCISSOR_TEST):s(t.SCISSOR_TEST)},activeTexture:function(e){void 0===e&&(e=t.TEXTURE0+R-1),B!==e&&(t.activeTexture(e),B=e)},bindTexture:function(e,n,i){void 0===i&&(i=null===B?t.TEXTURE0+R-1:B)
let s=G[i]
void 0===s&&(s={type:void 0,texture:void 0},G[i]=s),s.type===e&&s.texture===n||(B!==i&&(t.activeTexture(i),B=i),t.bindTexture(e,n||j[e]),s.type=e,s.texture=n)},unbindTexture:function(){const e=G[B]
void 0!==e&&void 0!==e.type&&(t.bindTexture(e.type,null),e.type=void 0,e.texture=void 0)},compressedTexImage2D:function(){try{t.compressedTexImage2D(...arguments)}catch(e){void 0}},compressedTexImage3D:function(){try{t.compressedTexImage3D(...arguments)}catch(e){void 0}},texImage2D:function(){try{t.texImage2D(...arguments)}catch(e){void 0}},texImage3D:function(){try{t.texImage3D(...arguments)}catch(e){void 0}},updateUBOMapping:function(e,n){let i=d.get(n)
void 0===i&&(i=new WeakMap,d.set(n,i))
let s=i.get(e)
void 0===s&&(s=t.getUniformBlockIndex(n,e.name),i.set(e,s))},uniformBlockBinding:function(e,n){const i=d.get(n).get(e)
f.get(n)!==i&&(t.uniformBlockBinding(n,i,e.O),f.set(n,i))},texStorage2D:function(){try{t.texStorage2D(...arguments)}catch(e){void 0}},texStorage3D:function(){try{t.texStorage3D(...arguments)}catch(e){void 0}},texSubImage2D:function(){try{t.texSubImage2D(...arguments)}catch(e){void 0}},texSubImage3D:function(){try{t.texSubImage3D(...arguments)}catch(e){void 0}},compressedTexSubImage2D:function(){try{t.compressedTexSubImage2D(...arguments)}catch(e){void 0}},compressedTexSubImage3D:function(){try{t.compressedTexSubImage3D(...arguments)}catch(e){void 0}},scissor:function(e){!1===z.equals(e)&&(t.scissor(e.x,e.y,e.z,e.w),z.copy(e))},viewport:function(e){!1===W.equals(e)&&(t.viewport(e.x,e.y,e.z,e.w),W.copy(e))},reset:function(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),l.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),p={},B=null,G={},v={},m=new WeakMap,g=[],_=null,M=!1,w=null,S=null,x=null,y=null,E=null,b=null,A=null,T=new Zo(0,0,0),C=0,L=!1,P=null,N=null,D=null,U=null,I=null,z.set(0,0,t.canvas.width,t.canvas.height),W.set(0,0,t.canvas.width,t.canvas.height),c.reset(),l.reset(),u.reset()}}}function on(t,e,n,i,s,r,o){function a(t,e){return H?new OffscreenCanvas(t,e):f("canvas")}function h(t,e,n){let i=1
const s=N(t)
if((s.width>n||s.height>n)&&(i=n/Math.max(s.width,s.height)),i<1){if("undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap||"undefined"!=typeof VideoFrame&&t instanceof VideoFrame){const n=Math.floor(i*s.width),r=Math.floor(i*s.height)
void 0===O&&(O=a(n,r))
const o=e?a(n,r):O
return o.width=n,o.height=r,o.getContext("2d").drawImage(t,0,0,n,r),o}return"data"in t,0,t}return t}function c(t){return t.generateMipmaps}function l(e){t.generateMipmap(e)}function u(e){return e.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?t.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function d(n,i,s,r,o=!1){if(null!==n){if(void 0!==t[n])return t[n]
void 0}let a=i
if(i===t.RED&&(s===t.FLOAT&&(a=t.R32F),s===t.HALF_FLOAT&&(a=t.R16F),s===t.UNSIGNED_BYTE&&(a=t.R8)),i===t.RED_INTEGER&&(s===t.UNSIGNED_BYTE&&(a=t.R8UI),s===t.UNSIGNED_SHORT&&(a=t.R16UI),s===t.UNSIGNED_INT&&(a=t.R32UI),s===t.BYTE&&(a=t.R8I),s===t.SHORT&&(a=t.R16I),s===t.INT&&(a=t.R32I)),i===t.RG&&(s===t.FLOAT&&(a=t.RG32F),s===t.HALF_FLOAT&&(a=t.RG16F),s===t.UNSIGNED_BYTE&&(a=t.RG8)),i===t.RG_INTEGER&&(s===t.UNSIGNED_BYTE&&(a=t.RG8UI),s===t.UNSIGNED_SHORT&&(a=t.RG16UI),s===t.UNSIGNED_INT&&(a=t.RG32UI),s===t.BYTE&&(a=t.RG8I),s===t.SHORT&&(a=t.RG16I),s===t.INT&&(a=t.RG32I)),i===t.RGB_INTEGER&&(s===t.UNSIGNED_BYTE&&(a=t.RGB8UI),s===t.UNSIGNED_SHORT&&(a=t.RGB16UI),s===t.UNSIGNED_INT&&(a=t.RGB32UI),s===t.BYTE&&(a=t.RGB8I),s===t.SHORT&&(a=t.RGB16I),s===t.INT&&(a=t.RGB32I)),i===t.RGBA_INTEGER&&(s===t.UNSIGNED_BYTE&&(a=t.RGBA8UI),s===t.UNSIGNED_SHORT&&(a=t.RGBA16UI),s===t.UNSIGNED_INT&&(a=t.RGBA32UI),s===t.BYTE&&(a=t.RGBA8I),s===t.SHORT&&(a=t.RGBA16I),s===t.INT&&(a=t.RGBA32I)),i===t.RGB&&(s===t.UNSIGNED_INT_5_9_9_9_REV&&(a=t.RGB9_E5),s===t.UNSIGNED_INT_10F_11F_11F_REV&&(a=t.R11F_G11F_B10F)),i===t.RGBA){const e=o?ks:wr.getTransfer(r)
s===t.FLOAT&&(a=t.RGBA32F),s===t.HALF_FLOAT&&(a=t.RGBA16F),s===t.UNSIGNED_BYTE&&(a=e===zs?t.SRGB8_ALPHA8:t.RGBA8),s===t.UNSIGNED_SHORT_4_4_4_4&&(a=t.RGBA4),s===t.UNSIGNED_SHORT_5_5_5_1&&(a=t.RGB5_A1)}return a!==t.R16F&&a!==t.R32F&&a!==t.RG16F&&a!==t.RG32F&&a!==t.RGBA16F&&a!==t.RGBA32F||e.get("EXT_color_buffer_float"),a}function p(e,n){let i
return e?null===n||n===Oi||n===Vi?i=t.DEPTH24_STENCIL8:n===Fi?i=t.DEPTH32F_STENCIL8:n===Ii&&(i=t.DEPTH24_STENCIL8):null===n||n===Oi||n===Vi?i=t.DEPTH_COMPONENT24:n===Fi?i=t.DEPTH_COMPONENT32F:n===Ii&&(i=t.DEPTH_COMPONENT16),i}function v(t,e){return!0===c(t)||t.isFramebufferTexture&&t.minFilter!==bi&&t.minFilter!==Ci?Math.log2(Math.max(e.width,e.height))+1:void 0!==t.mipmaps&&t.mipmaps.length>0?t.mipmaps.length:t.isCompressedTexture&&Array.isArray(t.image)?e.mipmaps.length:1}function m(t){const e=t.target
e.removeEventListener("dispose",m),function(t){const e=i.get(t)
if(void 0===e.F)return
const n=t.source,s=F.get(n)
if(s){const i=s[e.B]
i.usedTimes--,0===i.usedTimes&&_(t),0===Object.keys(s).length&&F.delete(n)}i.remove(t)}(e),e.isVideoTexture&&R.delete(e)}function g(e){const n=e.target
n.removeEventListener("dispose",g),function(e){const n=i.get(e)
if(e.depthTexture&&(e.depthTexture.dispose(),i.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let i=0;i<6;i++){if(Array.isArray(n.G[i]))for(let e=0;e<n.G[i].length;e++)t.deleteFramebuffer(n.G[i][e])
else t.deleteFramebuffer(n.G[i])
n.k&&t.deleteRenderbuffer(n.k[i])}else{if(Array.isArray(n.G))for(let e=0;e<n.G.length;e++)t.deleteFramebuffer(n.G[e])
else t.deleteFramebuffer(n.G)
if(n.k&&t.deleteRenderbuffer(n.k),n.W&&t.deleteFramebuffer(n.W),n.j)for(let e=0;e<n.j.length;e++)n.j[e]&&t.deleteRenderbuffer(n.j[e])
n.X&&t.deleteRenderbuffer(n.X)}const s=e.textures
for(let r=0,a=s.length;r<a;r++){const e=i.get(s[r])
e.Y&&(t.deleteTexture(e.Y),o.memory.textures--),i.remove(s[r])}i.remove(e)}(n)}function _(e){const n=i.get(e)
t.deleteTexture(n.Y)
const s=e.source
delete F.get(s)[n.B],o.memory.textures--}function M(e,s){const r=i.get(e)
if(e.isVideoTexture&&!function(t){const e=o.render.frame
R.get(t)!==e&&(R.set(t,e),t.update())}(e),!1===e.isRenderTargetTexture&&!0!==e.isExternalTexture&&e.version>0&&r.$!==e.version){const t=e.image
if(null===t)void 0
else{if(!1!==t.complete)return y(r,e,s),void 0
void 0}}else e.isExternalTexture&&(r.Y=e.sourceTexture?e.sourceTexture:null)
n.bindTexture(t.TEXTURE_2D,r.Y,t.TEXTURE0+s)}function w(n,r){if(r.type!==Fi||!1!==e.has("OES_texture_float_linear")||r.magFilter!==Ci&&r.magFilter!==Li&&r.magFilter!==Ti&&r.magFilter!==Pi&&r.minFilter!==Ci&&r.minFilter!==Li&&r.minFilter!==Ti&&r.minFilter!==Pi,t.texParameteri(n,t.TEXTURE_WRAP_S,G[r.wrapS]),t.texParameteri(n,t.TEXTURE_WRAP_T,G[r.wrapT]),n!==t.TEXTURE_3D&&n!==t.TEXTURE_2D_ARRAY||t.texParameteri(n,t.TEXTURE_WRAP_R,G[r.wrapR]),t.texParameteri(n,t.TEXTURE_MAG_FILTER,V[r.magFilter]),t.texParameteri(n,t.TEXTURE_MIN_FILTER,V[r.minFilter]),r.compareFunction&&(t.texParameteri(n,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(n,t.TEXTURE_COMPARE_FUNC,k[r.compareFunction])),!0===e.has("EXT_texture_filter_anisotropic")){if(r.magFilter===bi)return
if(r.minFilter!==Ti&&r.minFilter!==Pi)return
if(r.type===Fi&&!1===e.has("OES_texture_float_linear"))return
if(r.anisotropy>1||i.get(r).J){const o=e.get("EXT_texture_filter_anisotropic")
t.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,s.getMaxAnisotropy())),i.get(r).J=r.anisotropy}}}function S(e,n){let i=!1
void 0===e.F&&(e.F=!0,n.addEventListener("dispose",m))
const s=n.source
let r=F.get(s)
void 0===r&&(r={},F.set(s,r))
const a=function(t){const e=[]
return e.push(t.wrapS),e.push(t.wrapT),e.push(t.wrapR||0),e.push(t.magFilter),e.push(t.minFilter),e.push(t.anisotropy),e.push(t.internalFormat),e.push(t.format),e.push(t.type),e.push(t.generateMipmaps),e.push(t.premultiplyAlpha),e.push(t.flipY),e.push(t.unpackAlignment),e.push(t.colorSpace),e.join()}(n)
if(a!==e.B){void 0===r[a]&&(r[a]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,i=!0),r[a].usedTimes++
const s=r[e.B]
void 0!==s&&(r[e.B].usedTimes--,0===s.usedTimes&&_(n)),e.B=a,e.Y=r[a].texture}return i}function x(t,e,n){return Math.floor(Math.floor(t/n)/e)}function y(e,o,a){let u=t.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(u=t.TEXTURE_2D_ARRAY),o.isData3DTexture&&(u=t.TEXTURE_3D)
const f=S(e,o),m=o.source
n.bindTexture(u,e.Y,t.TEXTURE0+a)
const g=i.get(m)
if(m.version!==g.$||!0===f){n.activeTexture(t.TEXTURE0+a)
const e=wr.getPrimaries(wr.workingColorSpace),i=o.colorSpace===Bs?null:wr.getPrimaries(o.colorSpace),_=o.colorSpace===Bs||e===i?t.NONE:t.BROWSER_DEFAULT_WEBGL
t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,o.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,o.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_)
let M=h(o.image,!1,s.maxTextureSize)
M=P(o,M)
const S=r.convert(o.format,o.colorSpace),y=r.convert(o.type)
let E,b=d(o.internalFormat,S,y,o.colorSpace,o.isVideoTexture)
w(u,o)
const A=o.mipmaps,T=!0!==o.isVideoTexture,C=void 0===g.$||!0===f,L=m.dataReady,D=v(o,M)
if(o.isDepthTexture)b=p(o.format===Yi,o.type),C&&(T?n.texStorage2D(t.TEXTURE_2D,1,b,M.width,M.height):n.texImage2D(t.TEXTURE_2D,0,b,M.width,M.height,0,S,y,null))
else if(o.isDataTexture)if(A.length>0){T&&C&&n.texStorage2D(t.TEXTURE_2D,D,b,A[0].width,A[0].height)
for(let e=0,i=A.length;e<i;e++)E=A[e],T?L&&n.texSubImage2D(t.TEXTURE_2D,e,0,0,E.width,E.height,S,y,E.data):n.texImage2D(t.TEXTURE_2D,e,b,E.width,E.height,0,S,y,E.data)
o.generateMipmaps=!1}else T?(C&&n.texStorage2D(t.TEXTURE_2D,D,b,M.width,M.height),L&&function(e,i,s,r){const o=e.updateRanges
if(0===o.length)n.texSubImage2D(t.TEXTURE_2D,0,0,0,i.width,i.height,s,r,i.data)
else{o.sort((t,e)=>t.start-e.start)
let a=0
for(let t=1;t<o.length;t++){const e=o[a],n=o[t],s=e.start+e.count,r=x(n.start,i.width,4),h=x(e.start,i.width,4)
n.start<=s+1&&r===h&&x(n.start+n.count-1,i.width,4)===r?e.count=Math.max(e.count,n.start+n.count-e.start):(++a,o[a]=n)}o.length=a+1
const h=t.getParameter(t.UNPACK_ROW_LENGTH),c=t.getParameter(t.UNPACK_SKIP_PIXELS),l=t.getParameter(t.UNPACK_SKIP_ROWS)
t.pixelStorei(t.UNPACK_ROW_LENGTH,i.width)
for(let e=0,u=o.length;e<u;e++){const a=o[e],h=Math.floor(a.start/4),c=Math.ceil(a.count/4),l=h%i.width,u=Math.floor(h/i.width),f=c,d=1
t.pixelStorei(t.UNPACK_SKIP_PIXELS,l),t.pixelStorei(t.UNPACK_SKIP_ROWS,u),n.texSubImage2D(t.TEXTURE_2D,0,l,u,f,d,s,r,i.data)}e.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,h),t.pixelStorei(t.UNPACK_SKIP_PIXELS,c),t.pixelStorei(t.UNPACK_SKIP_ROWS,l)}}(o,M,S,y)):n.texImage2D(t.TEXTURE_2D,0,b,M.width,M.height,0,S,y,M.data)
else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){T&&C&&n.texStorage3D(t.TEXTURE_2D_ARRAY,D,b,A[0].width,A[0].height,M.depth)
for(let e=0,i=A.length;e<i;e++)if(E=A[e],o.format!==Xi)if(null!==S)if(T){if(L)if(o.layerUpdates.size>0){const i=yt(E.width,E.height,o.format,o.type)
for(const s of o.layerUpdates){const r=E.data.subarray(s*i/E.data.BYTES_PER_ELEMENT,(s+1)*i/E.data.BYTES_PER_ELEMENT)
n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,e,0,0,s,E.width,E.height,1,S,r)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,e,0,0,0,E.width,E.height,M.depth,S,E.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,e,b,E.width,E.height,M.depth,0,E.data,0,0)
else void 0
else T?L&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,e,0,0,0,E.width,E.height,M.depth,S,y,E.data):n.texImage3D(t.TEXTURE_2D_ARRAY,e,b,E.width,E.height,M.depth,0,S,y,E.data)}else{T&&C&&n.texStorage2D(t.TEXTURE_2D,D,b,A[0].width,A[0].height)
for(let e=0,i=A.length;e<i;e++)E=A[e],o.format!==Xi?null!==S&&(T?L&&n.compressedTexSubImage2D(t.TEXTURE_2D,e,0,0,E.width,E.height,S,E.data):n.compressedTexImage2D(t.TEXTURE_2D,e,b,E.width,E.height,0,E.data)):T?L&&n.texSubImage2D(t.TEXTURE_2D,e,0,0,E.width,E.height,S,y,E.data):n.texImage2D(t.TEXTURE_2D,e,b,E.width,E.height,0,S,y,E.data)}else if(o.isDataArrayTexture)if(T){if(C&&n.texStorage3D(t.TEXTURE_2D_ARRAY,D,b,M.width,M.height,M.depth),L)if(o.layerUpdates.size>0){const e=yt(M.width,M.height,o.format,o.type)
for(const i of o.layerUpdates){const s=M.data.subarray(i*e/M.data.BYTES_PER_ELEMENT,(i+1)*e/M.data.BYTES_PER_ELEMENT)
n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,i,M.width,M.height,1,S,y,s)}o.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,M.width,M.height,M.depth,S,y,M.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,b,M.width,M.height,M.depth,0,S,y,M.data)
else if(o.isData3DTexture)T?(C&&n.texStorage3D(t.TEXTURE_3D,D,b,M.width,M.height,M.depth),L&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,M.width,M.height,M.depth,S,y,M.data)):n.texImage3D(t.TEXTURE_3D,0,b,M.width,M.height,M.depth,0,S,y,M.data)
else if(o.isFramebufferTexture){if(C)if(T)n.texStorage2D(t.TEXTURE_2D,D,b,M.width,M.height)
else{let e=M.width,i=M.height
for(let s=0;s<D;s++)n.texImage2D(t.TEXTURE_2D,s,b,e,i,0,S,y,null),e>>=1,i>>=1}}else if(A.length>0){if(T&&C){const e=N(A[0])
n.texStorage2D(t.TEXTURE_2D,D,b,e.width,e.height)}for(let e=0,i=A.length;e<i;e++)E=A[e],T?L&&n.texSubImage2D(t.TEXTURE_2D,e,0,0,S,y,E):n.texImage2D(t.TEXTURE_2D,e,b,S,y,E)
o.generateMipmaps=!1}else if(T){if(C){const e=N(M)
n.texStorage2D(t.TEXTURE_2D,D,b,e.width,e.height)}L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,S,y,M)}else n.texImage2D(t.TEXTURE_2D,0,b,S,y,M)
c(o)&&l(u),g.$=m.version,o.onUpdate&&o.onUpdate(o)}e.$=o.version}function E(e,s,o,a,h,c){const l=r.convert(o.format,o.colorSpace),u=r.convert(o.type),f=d(o.internalFormat,l,u,o.colorSpace),p=i.get(s),v=i.get(o)
if(v.Z=s,!p.K){const e=Math.max(1,s.width>>c),i=Math.max(1,s.height>>c)
h===t.TEXTURE_3D||h===t.TEXTURE_2D_ARRAY?n.texImage3D(h,c,f,e,i,s.depth,0,l,u,null):n.texImage2D(h,c,f,e,i,0,l,u,null)}n.bindFramebuffer(t.FRAMEBUFFER,e),L(s)?D.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,a,h,v.Y,0,C(s)):(h===t.TEXTURE_2D||h>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&h<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,a,h,v.Y,c),n.bindFramebuffer(t.FRAMEBUFFER,null)}function b(e,n,i){if(t.bindRenderbuffer(t.RENDERBUFFER,e),n.depthBuffer){const s=n.depthTexture,r=s&&s.isDepthTexture?s.type:null,o=p(n.stencilBuffer,r),a=n.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,h=C(n)
L(n)?D.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,h,o,n.width,n.height):i?t.renderbufferStorageMultisample(t.RENDERBUFFER,h,o,n.width,n.height):t.renderbufferStorage(t.RENDERBUFFER,o,n.width,n.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,a,t.RENDERBUFFER,e)}else{const e=n.textures
for(let s=0;s<e.length;s++){const o=e[s],a=r.convert(o.format,o.colorSpace),h=r.convert(o.type),c=d(o.internalFormat,a,h,o.colorSpace),l=C(n)
i&&!1===L(n)?t.renderbufferStorageMultisample(t.RENDERBUFFER,l,c,n.width,n.height):L(n)?D.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,l,c,n.width,n.height):t.renderbufferStorage(t.RENDERBUFFER,c,n.width,n.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function A(e,s){if(s&&s.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported")
if(n.bindFramebuffer(t.FRAMEBUFFER,e),!s.depthTexture||!s.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture")
const r=i.get(s.depthTexture)
r.Z=s,r.Y&&s.depthTexture.image.width===s.width&&s.depthTexture.image.height===s.height||(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),M(s.depthTexture,0)
const o=r.Y,a=C(s)
if(s.depthTexture.format===qi)L(s)?D.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,o,0,a):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,o,0)
else{if(s.depthTexture.format!==Yi)throw new Error("Unknown depthTexture format")
L(s)?D.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,o,0,a):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,o,0)}}function T(e){const s=i.get(e),r=!0===e.isWebGLCubeRenderTarget
if(s.tt!==e.depthTexture){const t=e.depthTexture
if(s.et&&s.et(),t){const e=()=>{delete s.tt,delete s.et,t.removeEventListener("dispose",e)}
t.addEventListener("dispose",e),s.et=e}s.tt=t}if(e.depthTexture&&!s.nt){if(r)throw new Error("target.depthTexture not supported in Cube render targets")
const t=e.texture.mipmaps
t&&t.length>0?A(s.G[0],e):A(s.G,e)}else if(r){s.k=[]
for(let i=0;i<6;i++)if(n.bindFramebuffer(t.FRAMEBUFFER,s.G[i]),void 0===s.k[i])s.k[i]=t.createRenderbuffer(),b(s.k[i],e,!1)
else{const n=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,r=s.k[i]
t.bindRenderbuffer(t.RENDERBUFFER,r),t.framebufferRenderbuffer(t.FRAMEBUFFER,n,t.RENDERBUFFER,r)}}else{const i=e.texture.mipmaps
if(i&&i.length>0?n.bindFramebuffer(t.FRAMEBUFFER,s.G[0]):n.bindFramebuffer(t.FRAMEBUFFER,s.G),void 0===s.k)s.k=t.createRenderbuffer(),b(s.k,e,!1)
else{const n=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,i=s.k
t.bindRenderbuffer(t.RENDERBUFFER,i),t.framebufferRenderbuffer(t.FRAMEBUFFER,n,t.RENDERBUFFER,i)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function C(t){return Math.min(s.maxSamples,t.samples)}function L(t){const n=i.get(t)
return t.samples>0&&!0===e.has("WEBGL_multisampled_render_to_texture")&&!1!==n.it}function P(t,e){const n=t.colorSpace,i=t.format,s=t.type
return!0===t.isCompressedTexture||!0===t.isVideoTexture||n!==Vs&&n!==Bs&&(wr.getTransfer(n)===zs?i===Xi&&s===Ni:void 0),e}function N(t){return"undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement?(I.width=t.naturalWidth||t.width,I.height=t.naturalHeight||t.height):"undefined"!=typeof VideoFrame&&t instanceof VideoFrame?(I.width=t.displayWidth,I.height=t.displayHeight):(I.width=t.width,I.height=t.height),I}const D=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,U="undefined"!=typeof navigator&&/OculusBrowser/g.test(navigator.userAgent),I=new cr,R=new WeakMap
let O
const F=new WeakMap
let H=!1
try{H="undefined"!=typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}catch(j){}let B=0
const G={[xi]:t.REPEAT,[yi]:t.CLAMP_TO_EDGE,[Ei]:t.MIRRORED_REPEAT},V={[bi]:t.NEAREST,[Ai]:t.NEAREST_MIPMAP_NEAREST,[Ti]:t.NEAREST_MIPMAP_LINEAR,[Ci]:t.LINEAR,[Li]:t.LINEAR_MIPMAP_NEAREST,[Pi]:t.LINEAR_MIPMAP_LINEAR},k={[js]:t.NEVER,[Ks]:t.ALWAYS,[Xs]:t.LESS,[Ys]:t.LEQUAL,[qs]:t.EQUAL,[Zs]:t.GEQUAL,[$s]:t.GREATER,[Js]:t.NOTEQUAL},z=[],W=[]
this.allocateTextureUnit=function(){const t=B
return t>=s.maxTextures,0,B+=1,t},this.resetTextureUnits=function(){B=0},this.setTexture2D=M,this.setTexture2DArray=function(e,s){const r=i.get(e)
if(!1===e.isRenderTargetTexture&&e.version>0&&r.$!==e.version)return y(r,e,s),void 0
n.bindTexture(t.TEXTURE_2D_ARRAY,r.Y,t.TEXTURE0+s)},this.setTexture3D=function(e,s){const r=i.get(e)
if(!1===e.isRenderTargetTexture&&e.version>0&&r.$!==e.version)return y(r,e,s),void 0
n.bindTexture(t.TEXTURE_3D,r.Y,t.TEXTURE0+s)},this.setTextureCube=function(e,o){const a=i.get(e)
if(e.version>0&&a.$!==e.version)return!function(e,o,a){if(6!==o.image.length)return
const u=S(e,o),f=o.source
n.bindTexture(t.TEXTURE_CUBE_MAP,e.Y,t.TEXTURE0+a)
const p=i.get(f)
if(f.version!==p.$||!0===u){n.activeTexture(t.TEXTURE0+a)
const e=wr.getPrimaries(wr.workingColorSpace),i=o.colorSpace===Bs?null:wr.getPrimaries(o.colorSpace),m=o.colorSpace===Bs||e===i?t.NONE:t.BROWSER_DEFAULT_WEBGL
t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,o.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,o.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,m)
const g=o.isCompressedTexture||o.image[0].isCompressedTexture,_=o.image[0]&&o.image[0].isDataTexture,M=[]
for(let t=0;t<6;t++)M[t]=g||_?_?o.image[t].image:o.image[t]:h(o.image[t],!0,s.maxCubemapSize),M[t]=P(o,M[t])
const S=M[0],x=r.convert(o.format,o.colorSpace),y=r.convert(o.type),E=d(o.internalFormat,x,y,o.colorSpace),b=!0!==o.isVideoTexture,A=void 0===p.$||!0===u,T=f.dataReady
let C,L=v(o,S)
if(w(t.TEXTURE_CUBE_MAP,o),g){b&&A&&n.texStorage2D(t.TEXTURE_CUBE_MAP,L,E,S.width,S.height)
for(let e=0;e<6;e++){C=M[e].mipmaps
for(let i=0;i<C.length;i++){const s=C[i]
o.format!==Xi?null!==x?b?T&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,0,0,s.width,s.height,x,s.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,E,s.width,s.height,0,s.data):void 0:b?T&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,0,0,s.width,s.height,x,y,s.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,E,s.width,s.height,0,x,y,s.data)}}}else{if(C=o.mipmaps,b&&A){C.length>0&&L++
const e=N(M[0])
n.texStorage2D(t.TEXTURE_CUBE_MAP,L,E,e.width,e.height)}for(let e=0;e<6;e++)if(_){b?T&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,M[e].width,M[e].height,x,y,M[e].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,E,M[e].width,M[e].height,0,x,y,M[e].data)
for(let i=0;i<C.length;i++){const s=C[i].image[e].image
b?T&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i+1,0,0,s.width,s.height,x,y,s.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i+1,E,s.width,s.height,0,x,y,s.data)}}else{b?T&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,x,y,M[e]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,E,x,y,M[e])
for(let i=0;i<C.length;i++){const s=C[i]
b?T&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i+1,0,0,x,y,s.image[e]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i+1,E,x,y,s.image[e])}}}c(o)&&l(t.TEXTURE_CUBE_MAP),p.$=f.version,o.onUpdate&&o.onUpdate(o)}e.$=o.version}(a,e,o),void 0
n.bindTexture(t.TEXTURE_CUBE_MAP,a.Y,t.TEXTURE0+o)},this.rebindTextures=function(e,n,s){const r=i.get(e)
void 0!==n&&E(r.G,e,e.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),void 0!==s&&T(e)},this.setupRenderTarget=function(e){const s=e.texture,a=i.get(e),h=i.get(s)
e.addEventListener("dispose",g)
const u=e.textures,f=!0===e.isWebGLCubeRenderTarget,p=u.length>1
if(p||(void 0===h.Y&&(h.Y=t.createTexture()),h.$=s.version,o.memory.textures++),f){a.G=[]
for(let e=0;e<6;e++)if(s.mipmaps&&s.mipmaps.length>0){a.G[e]=[]
for(let n=0;n<s.mipmaps.length;n++)a.G[e][n]=t.createFramebuffer()}else a.G[e]=t.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){a.G=[]
for(let e=0;e<s.mipmaps.length;e++)a.G[e]=t.createFramebuffer()}else a.G=t.createFramebuffer()
if(p)for(let e=0,n=u.length;e<n;e++){const n=i.get(u[e])
void 0===n.Y&&(n.Y=t.createTexture(),o.memory.textures++)}if(e.samples>0&&!1===L(e)){a.W=t.createFramebuffer(),a.j=[],n.bindFramebuffer(t.FRAMEBUFFER,a.W)
for(let n=0;n<u.length;n++){const i=u[n]
a.j[n]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,a.j[n])
const s=r.convert(i.format,i.colorSpace),o=r.convert(i.type),h=d(i.internalFormat,s,o,i.colorSpace,!0===e.isXRRenderTarget),c=C(e)
t.renderbufferStorageMultisample(t.RENDERBUFFER,c,h,e.width,e.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+n,t.RENDERBUFFER,a.j[n])}t.bindRenderbuffer(t.RENDERBUFFER,null),e.depthBuffer&&(a.X=t.createRenderbuffer(),b(a.X,e,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(f){n.bindTexture(t.TEXTURE_CUBE_MAP,h.Y),w(t.TEXTURE_CUBE_MAP,s)
for(let n=0;n<6;n++)if(s.mipmaps&&s.mipmaps.length>0)for(let i=0;i<s.mipmaps.length;i++)E(a.G[n][i],e,s,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+n,i)
else E(a.G[n],e,s,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+n,0)
c(s)&&l(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(p){for(let s=0,r=u.length;s<r;s++){const r=u[s],o=i.get(r)
let h=t.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(h=e.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(h,o.Y),w(h,r),E(a.G,e,r,t.COLOR_ATTACHMENT0+s,h,0),c(r)&&l(h)}n.unbindTexture()}else{let i=t.TEXTURE_2D
if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(i,h.Y),w(i,s),s.mipmaps&&s.mipmaps.length>0)for(let n=0;n<s.mipmaps.length;n++)E(a.G[n],e,s,t.COLOR_ATTACHMENT0,i,n)
else E(a.G,e,s,t.COLOR_ATTACHMENT0,i,0)
c(s)&&l(i),n.unbindTexture()}e.depthBuffer&&T(e)},this.updateRenderTargetMipmap=function(t){const e=t.textures
for(let s=0,r=e.length;s<r;s++){const r=e[s]
if(c(r)){const e=u(t),s=i.get(r).Y
n.bindTexture(e,s),l(e),n.unbindTexture()}}},this.updateMultisampleRenderTarget=function(e){if(e.samples>0)if(!1===L(e)){const s=e.textures,r=e.width,o=e.height
let a=t.COLOR_BUFFER_BIT
const h=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,c=i.get(e),l=s.length>1
if(l)for(let e=0;e<s.length;e++)n.bindFramebuffer(t.FRAMEBUFFER,c.W),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,c.G),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.TEXTURE_2D,null,0)
n.bindFramebuffer(t.READ_FRAMEBUFFER,c.W)
const u=e.texture.mipmaps
u&&u.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,c.G[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,c.G)
for(let n=0;n<s.length;n++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(a|=t.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(a|=t.STENCIL_BUFFER_BIT)),l){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,c.j[n])
const e=i.get(s[n]).Y
t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0)}t.blitFramebuffer(0,0,r,o,0,0,r,o,a,t.NEAREST),!0===U&&(z.length=0,W.length=0,z.push(t.COLOR_ATTACHMENT0+n),e.depthBuffer&&!1===e.resolveDepthBuffer&&(z.push(h),W.push(h),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,W)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,z))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),l)for(let e=0;e<s.length;e++){n.bindFramebuffer(t.FRAMEBUFFER,c.W),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.RENDERBUFFER,c.j[e])
const r=i.get(s[e]).Y
n.bindFramebuffer(t.FRAMEBUFFER,c.G),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.TEXTURE_2D,r,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,c.W)}else if(e.depthBuffer&&!1===e.resolveDepthBuffer&&U){const n=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT
t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[n])}},this.setupDepthRenderbuffer=T,this.setupFrameBufferTexture=E,this.useMultisampledRTT=L}function an(t,e){return{convert:function(n,i=""){let s
const r=wr.getTransfer(i)
if(n===Ni)return t.UNSIGNED_BYTE
if(n===Bi)return t.UNSIGNED_SHORT_4_4_4_4
if(n===Gi)return t.UNSIGNED_SHORT_5_5_5_1
if(n===ki)return t.UNSIGNED_INT_5_9_9_9_REV
if(n===zi)return t.UNSIGNED_INT_10F_11F_11F_REV
if(n===Di)return t.BYTE
if(n===Ui)return t.SHORT
if(n===Ii)return t.UNSIGNED_SHORT
if(n===Ri)return t.INT
if(n===Oi)return t.UNSIGNED_INT
if(n===Fi)return t.FLOAT
if(n===Hi)return t.HALF_FLOAT
if(n===Wi)return t.ALPHA
if(n===ji)return t.RGB
if(n===Xi)return t.RGBA
if(n===qi)return t.DEPTH_COMPONENT
if(n===Yi)return t.DEPTH_STENCIL
if(n===$i)return t.RED
if(n===Ji)return t.RED_INTEGER
if(n===Zi)return t.RG
if(n===Ki)return t.RG_INTEGER
if(n===Qi)return t.RGBA_INTEGER
if(n===ts||n===es||n===ns||n===is)if(r===zs){if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),null===s)return null
if(n===ts)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT
if(n===es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT
if(n===ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT
if(n===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(s=e.get("WEBGL_compressed_texture_s3tc"),null===s)return null
if(n===ts)return s.COMPRESSED_RGB_S3TC_DXT1_EXT
if(n===es)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT
if(n===ns)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT
if(n===is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(n===ss||n===rs||n===os||n===as){if(s=e.get("WEBGL_compressed_texture_pvrtc"),null===s)return null
if(n===ss)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
if(n===rs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
if(n===os)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
if(n===as)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(n===hs||n===cs||n===ls){if(s=e.get("WEBGL_compressed_texture_etc"),null===s)return null
if(n===hs||n===cs)return r===zs?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2
if(n===ls)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}if(n===us||n===fs||n===ds||n===ps||n===vs||n===ms||n===gs||n===_s||n===Ms||n===ws||n===Ss||n===xs||n===ys||n===Es){if(s=e.get("WEBGL_compressed_texture_astc"),null===s)return null
if(n===us)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR
if(n===fs)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR
if(n===ds)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR
if(n===ps)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR
if(n===vs)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR
if(n===ms)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR
if(n===gs)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR
if(n===_s)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR
if(n===Ms)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR
if(n===ws)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR
if(n===Ss)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR
if(n===xs)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR
if(n===ys)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR
if(n===Es)return r===zs?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}if(n===bs||n===As||n===Ts){if(s=e.get("EXT_texture_compression_bptc"),null===s)return null
if(n===bs)return r===zs?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT
if(n===As)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT
if(n===Ts)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(n===Cs||n===Ls||n===Ps||n===Ns){if(s=e.get("EXT_texture_compression_rgtc"),null===s)return null
if(n===Cs)return s.COMPRESSED_RED_RGTC1_EXT
if(n===Ls)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT
if(n===Ps)return s.COMPRESSED_RED_GREEN_RGTC2_EXT
if(n===Ns)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return n===Vi?t.UNSIGNED_INT_24_8:void 0!==t[n]?t[n]:null}}}function hn(t,e){function n(t,e){!0===t.matrixAutoUpdate&&t.updateMatrix(),e.value.copy(t.matrix)}function i(t,i){t.opacity.value=i.opacity,i.color&&t.diffuse.value.copy(i.color),i.emissive&&t.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),i.map&&(t.map.value=i.map,n(i.map,t.mapTransform)),i.alphaMap&&(t.alphaMap.value=i.alphaMap,n(i.alphaMap,t.alphaMapTransform)),i.bumpMap&&(t.bumpMap.value=i.bumpMap,n(i.bumpMap,t.bumpMapTransform),t.bumpScale.value=i.bumpScale,1===i.side&&(t.bumpScale.value*=-1)),i.normalMap&&(t.normalMap.value=i.normalMap,n(i.normalMap,t.normalMapTransform),t.normalScale.value.copy(i.normalScale),1===i.side&&t.normalScale.value.negate()),i.displacementMap&&(t.displacementMap.value=i.displacementMap,n(i.displacementMap,t.displacementMapTransform),t.displacementScale.value=i.displacementScale,t.displacementBias.value=i.displacementBias),i.emissiveMap&&(t.emissiveMap.value=i.emissiveMap,n(i.emissiveMap,t.emissiveMapTransform)),i.specularMap&&(t.specularMap.value=i.specularMap,n(i.specularMap,t.specularMapTransform)),i.alphaTest>0&&(t.alphaTest.value=i.alphaTest)
const s=e.get(i),r=s.envMap,o=s.envMapRotation
r&&(t.envMap.value=r,Dd.copy(o),Dd.x*=-1,Dd.y*=-1,Dd.z*=-1,r.isCubeTexture&&!1===r.isRenderTargetTexture&&(Dd.y*=-1,Dd.z*=-1),t.envMapRotation.value.setFromMatrix4(Ud.makeRotationFromEuler(Dd)),t.flipEnvMap.value=r.isCubeTexture&&!1===r.isRenderTargetTexture?-1:1,t.reflectivity.value=i.reflectivity,t.ior.value=i.ior,t.refractionRatio.value=i.refractionRatio),i.lightMap&&(t.lightMap.value=i.lightMap,t.lightMapIntensity.value=i.lightMapIntensity,n(i.lightMap,t.lightMapTransform)),i.aoMap&&(t.aoMap.value=i.aoMap,t.aoMapIntensity.value=i.aoMapIntensity,n(i.aoMap,t.aoMapTransform))}return{refreshFogUniforms:function(e,n){n.color.getRGB(e.fogColor.value,b(t)),n.isFog?(e.fogNear.value=n.near,e.fogFar.value=n.far):n.isFogExp2&&(e.fogDensity.value=n.density)},refreshMaterialUniforms:function(t,s,r,o,a){s.isMeshBasicMaterial||s.isMeshLambertMaterial?i(t,s):s.isMeshToonMaterial?(i(t,s),function(t,e){e.gradientMap&&(t.gradientMap.value=e.gradientMap)}(t,s)):s.isMeshPhongMaterial?(i(t,s),function(t,e){t.specular.value.copy(e.specular),t.shininess.value=Math.max(e.shininess,1e-4)}(t,s)):s.isMeshStandardMaterial?(i(t,s),function(t,e){t.metalness.value=e.metalness,e.metalnessMap&&(t.metalnessMap.value=e.metalnessMap,n(e.metalnessMap,t.metalnessMapTransform)),t.roughness.value=e.roughness,e.roughnessMap&&(t.roughnessMap.value=e.roughnessMap,n(e.roughnessMap,t.roughnessMapTransform)),e.envMap&&(t.envMapIntensity.value=e.envMapIntensity)}(t,s),s.isMeshPhysicalMaterial&&function(t,e,i){t.ior.value=e.ior,e.sheen>0&&(t.sheenColor.value.copy(e.sheenColor).multiplyScalar(e.sheen),t.sheenRoughness.value=e.sheenRoughness,e.sheenColorMap&&(t.sheenColorMap.value=e.sheenColorMap,n(e.sheenColorMap,t.sheenColorMapTransform)),e.sheenRoughnessMap&&(t.sheenRoughnessMap.value=e.sheenRoughnessMap,n(e.sheenRoughnessMap,t.sheenRoughnessMapTransform))),e.clearcoat>0&&(t.clearcoat.value=e.clearcoat,t.clearcoatRoughness.value=e.clearcoatRoughness,e.clearcoatMap&&(t.clearcoatMap.value=e.clearcoatMap,n(e.clearcoatMap,t.clearcoatMapTransform)),e.clearcoatRoughnessMap&&(t.clearcoatRoughnessMap.value=e.clearcoatRoughnessMap,n(e.clearcoatRoughnessMap,t.clearcoatRoughnessMapTransform)),e.clearcoatNormalMap&&(t.clearcoatNormalMap.value=e.clearcoatNormalMap,n(e.clearcoatNormalMap,t.clearcoatNormalMapTransform),t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),1===e.side&&t.clearcoatNormalScale.value.negate())),e.dispersion>0&&(t.dispersion.value=e.dispersion),e.iridescence>0&&(t.iridescence.value=e.iridescence,t.iridescenceIOR.value=e.iridescenceIOR,t.iridescenceThicknessMinimum.value=e.iridescenceThicknessRange[0],t.iridescenceThicknessMaximum.value=e.iridescenceThicknessRange[1],e.iridescenceMap&&(t.iridescenceMap.value=e.iridescenceMap,n(e.iridescenceMap,t.iridescenceMapTransform)),e.iridescenceThicknessMap&&(t.iridescenceThicknessMap.value=e.iridescenceThicknessMap,n(e.iridescenceThicknessMap,t.iridescenceThicknessMapTransform))),e.transmission>0&&(t.transmission.value=e.transmission,t.transmissionSamplerMap.value=i.texture,t.transmissionSamplerSize.value.set(i.width,i.height),e.transmissionMap&&(t.transmissionMap.value=e.transmissionMap,n(e.transmissionMap,t.transmissionMapTransform)),t.thickness.value=e.thickness,e.thicknessMap&&(t.thicknessMap.value=e.thicknessMap,n(e.thicknessMap,t.thicknessMapTransform)),t.attenuationDistance.value=e.attenuationDistance,t.attenuationColor.value.copy(e.attenuationColor)),e.anisotropy>0&&(t.anisotropyVector.value.set(e.anisotropy*Math.cos(e.anisotropyRotation),e.anisotropy*Math.sin(e.anisotropyRotation)),e.anisotropyMap&&(t.anisotropyMap.value=e.anisotropyMap,n(e.anisotropyMap,t.anisotropyMapTransform))),t.specularIntensity.value=e.specularIntensity,t.specularColor.value.copy(e.specularColor),e.specularColorMap&&(t.specularColorMap.value=e.specularColorMap,n(e.specularColorMap,t.specularColorMapTransform)),e.specularIntensityMap&&(t.specularIntensityMap.value=e.specularIntensityMap,n(e.specularIntensityMap,t.specularIntensityMapTransform))}(t,s,a)):s.isMeshMatcapMaterial?(i(t,s),function(t,e){e.matcap&&(t.matcap.value=e.matcap)}(t,s)):s.isMeshDepthMaterial?i(t,s):s.isMeshDistanceMaterial?(i(t,s),function(t,n){const i=e.get(n).light
t.referencePosition.value.setFromMatrixPosition(i.matrixWorld),t.nearDistance.value=i.shadow.camera.near,t.farDistance.value=i.shadow.camera.far}(t,s)):s.isMeshNormalMaterial?i(t,s):s.isLineBasicMaterial?(!function(t,e){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,e.map&&(t.map.value=e.map,n(e.map,t.mapTransform))}(t,s),s.isLineDashedMaterial&&function(t,e){t.dashSize.value=e.dashSize,t.totalSize.value=e.dashSize+e.gapSize,t.scale.value=e.scale}(t,s)):s.isPointsMaterial?!function(t,e,i,s){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.size.value=e.size*i,t.scale.value=.5*s,e.map&&(t.map.value=e.map,n(e.map,t.uvTransform)),e.alphaMap&&(t.alphaMap.value=e.alphaMap,n(e.alphaMap,t.alphaMapTransform)),e.alphaTest>0&&(t.alphaTest.value=e.alphaTest)}(t,s,r,o):s.isSpriteMaterial?!function(t,e){t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.rotation.value=e.rotation,e.map&&(t.map.value=e.map,n(e.map,t.mapTransform)),e.alphaMap&&(t.alphaMap.value=e.alphaMap,n(e.alphaMap,t.alphaMapTransform)),e.alphaTest>0&&(t.alphaTest.value=e.alphaTest)}(t,s):s.isShadowMaterial?(t.color.value.copy(s.color),t.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function cn(t,e,n,i){function s(t,e,n,i){const s=t.value,r=e+"_"+n
if(void 0===i[r])return i[r]="number"==typeof s||"boolean"==typeof s?s:s.clone(),!0
{const t=i[r]
if("number"==typeof s||"boolean"==typeof s){if(t!==s)return i[r]=s,!0}else if(!1===t.equals(s))return t.copy(s),!0}return!1}function r(t){const e={boundary:0,storage:0}
return"number"==typeof t||"boolean"==typeof t?(e.boundary=4,e.storage=4):t.isVector2?(e.boundary=8,e.storage=8):t.isVector3||t.isColor?(e.boundary=16,e.storage=12):t.isVector4?(e.boundary=16,e.storage=16):t.isMatrix3?(e.boundary=48,e.storage=48):t.isMatrix4?(e.boundary=64,e.storage=64):(t.isTexture,void 0),e}function o(e){const n=e.target
n.removeEventListener("dispose",o)
const i=c.indexOf(n.O)
c.splice(i,1),t.deleteBuffer(a[n.id]),delete a[n.id],delete h[n.id]}let a={},h={},c=[]
const l=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS)
return{bind:function(t,e){const n=e.program
i.uniformBlockBinding(t,n)},update:function(n,u){let f=a[n.id]
void 0===f&&(!function(t){const e=t.uniforms
let n=0
for(let s=0,o=e.length;s<o;s++){const t=Array.isArray(e[s])?e[s]:[e[s]]
for(let e=0,i=t.length;e<i;e++){const i=t[e],s=Array.isArray(i.value)?i.value:[i.value]
for(let t=0,e=s.length;t<e;t++){const e=r(s[t]),o=n%16,a=o%e.boundary,h=o+a
n+=a,0!==h&&16-h<e.storage&&(n+=16-h),i.st=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),i.rt=n,n+=e.storage}}}const i=n%16
return i>0&&(n+=16-i),t.ot=n,t.ht={},this}(n),f=function(e){const n=function(){for(let t=0;t<l;t++)if(-1===c.indexOf(t))return c.push(t),t
return void 0,0}()
e.O=n
const i=t.createBuffer(),s=e.ot,r=e.usage
return t.bindBuffer(t.UNIFORM_BUFFER,i),t.bufferData(t.UNIFORM_BUFFER,s,r),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,n,i),i}(n),a[n.id]=f,n.addEventListener("dispose",o))
const d=u.program
i.updateUBOMapping(n,d)
const p=e.render.frame
h[n.id]!==p&&(!function(e){const n=a[e.id],i=e.uniforms,o=e.ht
t.bindBuffer(t.UNIFORM_BUFFER,n)
for(let a=0,h=i.length;a<h;a++){const e=Array.isArray(i[a])?i[a]:[i[a]]
for(let n=0,i=e.length;n<i;n++){const i=e[n]
if(!0===s(i,a,n,o)){const e=i.rt,n=Array.isArray(i.value)?i.value:[i.value]
let s=0
for(let o=0;o<n.length;o++){const a=n[o],h=r(a)
"number"==typeof a||"boolean"==typeof a?(i.st[0]=a,t.bufferSubData(t.UNIFORM_BUFFER,e+s,i.st)):a.isMatrix3?(i.st[0]=a.elements[0],i.st[1]=a.elements[1],i.st[2]=a.elements[2],i.st[3]=0,i.st[4]=a.elements[3],i.st[5]=a.elements[4],i.st[6]=a.elements[5],i.st[7]=0,i.st[8]=a.elements[6],i.st[9]=a.elements[7],i.st[10]=a.elements[8],i.st[11]=0):(a.toArray(i.st,s),s+=h.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,e,i.st)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}(n),h[n.id]=p)},dispose:function(){for(const e in a)t.deleteBuffer(a[e])
c=[],a={},h={}}}}function ln(t,e,n){if(!t)return
if(!0===n(t))return t
let i=e?t.return:t.child
for(;i;){const t=ln(i,e,n)
if(t)return t
i=e?null:i.sibling}}function un(t){try{return Object.defineProperties(t,{ct:{get:()=>null,set(){}},lt:{get:()=>null,set(){}}})}catch(e){return t}}function fn(){const t=wn.useContext(Jd)
if(null===t)throw new Error("its-fine: useFiber must be called within a <FiberProvider />!")
const e=wn.useId()
return wn.useMemo(()=>{for(const n of[t,null==t?void 0:t.alternate]){if(!n)continue
const t=ln(n,!1,t=>{let n=t.memoizedState
for(;n;){if(n.memoizedState===e)return!0
n=n.next}})
if(t)return t}},[t,e])}function dn(){const t=function(){const t=fn(),[e]=wn.useState(()=>new Map)
e.clear()
let n=t
for(;n;){const t=n.type
Qd(t)&&t!==Jd&&!e.has(t)&&e.set(t,wn.use(un(t))),n=n.return}return e}()
return wn.useMemo(()=>Array.from(t.keys()).reduce((e,n)=>i=>wn.createElement(e,null,wn.createElement(n.Provider,{...i,value:t.get(n)})),t=>wn.createElement(Zd,{...t})),[t])}function pn(t,e,n){for(const i of e){const e="$1"+t+i.charAt(0).toUpperCase()+i.slice(1),s=new RegExp("([^\\.])(\\b"+i+"\\b)","g")
for(const t of n.entries())null!==t[1]&&n.set(t[0],t[1].replace(s,e))}}function vn(t,e,n){let i=e.getFragmentShader(),s=e.getVertexShader()
const r=void 0!==i&&/mainImage/.test(i),o=void 0!==i&&/mainUv/.test(i)
if(n.attributes|=e.getAttributes(),void 0===i)throw new Error(`Missing fragment shader (${e.name})`)
if(o&&0!==(n.attributes&fp))throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`)
if(!r&&!o)throw new Error(`Could not find mainImage or mainUv function (${e.name})`)
{const a=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,h=n.shaderParts
let c=h.get(dp.FRAGMENT_HEAD)||"",l=h.get(dp.FRAGMENT_MAIN_UV)||"",u=h.get(dp.FRAGMENT_MAIN_IMAGE)||"",f=h.get(dp.VERTEX_HEAD)||"",d=h.get(dp.VERTEX_MAIN_SUPPORT)||""
const p=new Set,v=new Set
if(o&&(l+=`\t${t}MainUv(UV);\n`,n.uvTransformation=!0),null!==s&&/mainSupport/.test(s)){const e=/mainSupport *\([\w\s]*?uv\s*?\)/.test(s)
d+=`\t${t}MainSupport(`,d+=e?"vUv);\n":");\n"
for(const t of s.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const e of t[1].split(/\s*,\s*/))n.varyings.add(e),p.add(e),v.add(e)
for(const t of s.matchAll(a))v.add(t[1])}for(const t of i.matchAll(a))v.add(t[1])
for(const t of e.defines.keys())v.add(t.replace(/\([\w\s,]*\)/g,""))
for(const t of e.uniforms.keys())v.add(t)
v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((e,i)=>n.uniforms.set(t+i.charAt(0).toUpperCase()+i.slice(1),e)),e.defines.forEach((e,i)=>n.defines.set(t+i.charAt(0).toUpperCase()+i.slice(1),e))
const m=new Map([["fragment",i],["vertex",s]])
pn(t,v,n.defines),pn(t,v,m),i=m.get("fragment"),s=m.get("vertex")
const g=e.blendMode
if(n.blendModes.set(g.blendFunction,g),r){null!==e.inputColorSpace&&e.inputColorSpace!==n.colorSpace&&(u+=e.inputColorSpace===Gs?"color0 = sRGBTransferOETF(color0);\n\t":"color0 = sRGBToLinear(color0);\n\t"),e.outputColorSpace!==Bs?n.colorSpace=e.outputColorSpace:null!==e.inputColorSpace&&(n.colorSpace=e.inputColorSpace)
const s=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/
u+=`${t}MainImage(color0, UV, `,0!==(n.attributes&up)&&s.test(i)&&(u+="depth, ",n.readDepth=!0),u+="color1);\n\t"
const r=t+"BlendOpacity"
n.uniforms.set(r,g.opacity),u+=`color0 = blend${g.blendFunction}(color0, color1, ${r});\n\n\t`,c+=`uniform float ${r};\n\n`}if(c+=i+"\n",null!==s&&(f+=s+"\n"),h.set(dp.FRAGMENT_HEAD,c),h.set(dp.FRAGMENT_MAIN_UV,l),h.set(dp.FRAGMENT_MAIN_IMAGE,u),h.set(dp.VERTEX_HEAD,f),h.set(dp.VERTEX_MAIN_SUPPORT,d),null!==e.extensions)for(const t of e.extensions)n.extensions.add(t)}}var mn,gn,_n={exports:{}},Mn={},wn=n()
const Sn=t(wn)
var xn,yn,En,bn,An={exports:{}},Tn={}
const Cn=t(function(){return bn?En:(bn=1,En=function(t,e,n,i,s,r,o,a){if(!t){var h
if(void 0===e)h=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var c=[n,i,s,r,o,a],l=0;(h=new Error(e.replace(/%s/g,function(){return c[l++]}))).name="Invariant Violation"}throw h.framesToPop=1,h}})}())
var Ln,Pn
const Nn=t(function(){return Pn?Ln:(Pn=1,Ln=function(t,e,n,i){var s=n?n.call(i,t,e):void 0
if(void 0!==s)return!!s
if(t===e)return!0
if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1
var r=Object.keys(t),o=Object.keys(e)
if(r.length!==o.length)return!1
for(var a=Object.prototype.hasOwnProperty.bind(e),h=0;h<r.length;h++){var c=r[h]
if(!a(c))return!1
var l=t[c],u=e[c]
if(!1===(s=n?n.call(i,l,u,c):void 0)||void 0===s&&l!==u)return!1}return!0})}()),Dn="180",Un=0,In=1,Rn=2,On=3,Fn=0,Hn=1,Bn=2,Gn=100,Vn=101,kn=102,zn=200,Wn=201,jn=202,Xn=203,qn=204,Yn=205,$n=206,Jn=207,Zn=208,Kn=209,Qn=210,ti=211,ei=212,ni=213,ii=214,si=0,ri=1,oi=2,ai=3,hi=4,ci=5,li=6,ui=7,fi=0,di=4,pi="attached",vi="detached",mi=300,gi=301,_i=302,Mi=303,wi=304,Si=306,xi=1e3,yi=1001,Ei=1002,bi=1003,Ai=1004,Ti=1005,Ci=1006,Li=1007,Pi=1008,Ni=1009,Di=1010,Ui=1011,Ii=1012,Ri=1013,Oi=1014,Fi=1015,Hi=1016,Bi=1017,Gi=1018,Vi=1020,ki=35902,zi=35899,Wi=1021,ji=1022,Xi=1023,qi=1026,Yi=1027,$i=1028,Ji=1029,Zi=1030,Ki=1031,Qi=1033,ts=33776,es=33777,ns=33778,is=33779,ss=35840,rs=35841,os=35842,as=35843,hs=36196,cs=37492,ls=37496,us=37808,fs=37809,ds=37810,ps=37811,vs=37812,ms=37813,gs=37814,_s=37815,Ms=37816,ws=37817,Ss=37818,xs=37819,ys=37820,Es=37821,bs=36492,As=36494,Ts=36495,Cs=36283,Ls=36284,Ps=36285,Ns=36286,Ds=2300,Us=2301,Is=2302,Rs=2400,Os=2401,Fs=2402,Hs=2501,Bs="",Gs="srgb",Vs="srgb-linear",ks="linear",zs="srgb",Ws=7680,js=512,Xs=513,qs=514,Ys=515,$s=516,Js=517,Zs=518,Ks=519,Qs=35044,tr="300 es",er=2e3,nr=2001
class ir{addEventListener(t,e){void 0===this.ut&&(this.ut={})
const n=this.ut
void 0===n[t]&&(n[t]=[]),-1===n[t].indexOf(e)&&n[t].push(e)}hasEventListener(t,e){const n=this.ut
return void 0!==n&&void 0!==n[t]&&-1!==n[t].indexOf(e)}removeEventListener(t,e){const n=this.ut
if(void 0===n)return
const i=n[t]
if(void 0!==i){const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}dispatchEvent(t){const e=this.ut
if(void 0===e)return
const n=e[t.type]
if(void 0!==n){t.target=this
const e=n.slice(0)
for(let n=0,i=e.length;n<i;n++)e[n].call(this,t)
t.target=null}}}const sr=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"]
let rr=1234567
const or=Math.PI/180,ar=180/Math.PI,hr={DEG2RAD:or,RAD2DEG:ar,generateUUID:s,clamp:r,euclideanModulo:o,mapLinear:function(t,e,n,i,s){return i+(t-e)*(s-i)/(n-e)},inverseLerp:function(t,e,n){return t!==e?(n-t)/(e-t):0},lerp:a,damp:function(t,e,n,i){return a(t,e,1-Math.exp(-n*i))},pingpong:function(t,e=1){return e-Math.abs(o(t,2*e)-e)},smoothstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*(3-2*t)},smootherstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){void 0!==t&&(rr=t)
let e=rr+=1831565813
return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(t){return t*or},radToDeg:function(t){return t*ar},isPowerOfTwo:function(t){return!(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},setQuaternionFromProperEuler:function(t,e,n,i,s){const r=Math.cos,o=Math.sin,a=r(n/2),h=o(n/2),c=r((e+i)/2),l=o((e+i)/2),u=r((e-i)/2),f=o((e-i)/2),d=r((i-e)/2),p=o((i-e)/2)
switch(s){case"XYX":t.set(a*l,h*u,h*f,a*c)
break
case"YZY":t.set(h*f,a*l,h*u,a*c)
break
case"ZXZ":t.set(h*u,h*f,a*l,a*c)
break
case"XZX":t.set(a*l,h*p,h*d,a*c)
break
case"YXY":t.set(h*d,a*l,h*p,a*c)
break
case"ZYZ":t.set(h*p,h*d,a*l,a*c)}},normalize:c,denormalize:h}
class cr{constructor(t=0,e=0){cr.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e
break
case 1:this.y=e
break
default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x
case 1:return this.y
default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements
return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=r(this.x,t.x,e.x),this.y=r(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=r(this.x,t,e),this.y=r(this.y,t,e),this}clampLength(t,e){const n=this.length()
return this.divideScalar(n||1).multiplyScalar(r(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq())
if(0===e)return Math.PI/2
const n=this.dot(t)/e
return Math.acos(r(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y
return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y
return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this.ft=t,this.dt=e,this.vt=n,this.gt=i}static slerpFlat(t,e,n,i,s,r,o){let a=n[i+0],h=n[i+1],c=n[i+2],l=n[i+3]
const u=s[r+0],f=s[r+1],d=s[r+2],p=s[r+3]
if(0===o)return t[e+0]=a,t[e+1]=h,t[e+2]=c,t[e+3]=l,void 0
if(1===o)return t[e+0]=u,t[e+1]=f,t[e+2]=d,t[e+3]=p,void 0
if(l!==p||a!==u||h!==f||c!==d){let t=1-o
const e=a*u+h*f+c*d+l*p,n=e>=0?1:-1,i=1-e*e
if(i>Number.EPSILON){const s=Math.sqrt(i),r=Math.atan2(s,e*n)
t=Math.sin(t*r)/s,o=Math.sin(o*r)/s}const s=o*n
if(a=a*t+u*s,h=h*t+f*s,c=c*t+d*s,l=l*t+p*s,t===1-o){const t=1/Math.sqrt(a*a+h*h+c*c+l*l)
a*=t,h*=t,c*=t,l*=t}}t[e]=a,t[e+1]=h,t[e+2]=c,t[e+3]=l}static multiplyQuaternionsFlat(t,e,n,i,s,r){const o=n[i],a=n[i+1],h=n[i+2],c=n[i+3],l=s[r],u=s[r+1],f=s[r+2],d=s[r+3]
return t[e]=o*d+c*l+a*f-h*u,t[e+1]=a*d+c*u+h*l-o*f,t[e+2]=h*d+c*f+o*u-a*l,t[e+3]=c*d-o*l-a*u-h*f,t}get x(){return this.ft}set x(t){this.ft=t,this._t()}get y(){return this.dt}set y(t){this.dt=t,this._t()}get z(){return this.vt}set z(t){this.vt=t,this._t()}get w(){return this.gt}set w(t){this.gt=t,this._t()}set(t,e,n,i){return this.ft=t,this.dt=e,this.vt=n,this.gt=i,this._t(),this}clone(){return new this.constructor(this.ft,this.dt,this.vt,this.gt)}copy(t){return this.ft=t.x,this.dt=t.y,this.vt=t.z,this.gt=t.w,this._t(),this}setFromEuler(t,e=!0){const n=t.ft,i=t.dt,s=t.vt,r=t.Mt,o=Math.cos,a=Math.sin,h=o(n/2),c=o(i/2),l=o(s/2),u=a(n/2),f=a(i/2),d=a(s/2)
switch(r){case"XYZ":this.ft=u*c*l+h*f*d,this.dt=h*f*l-u*c*d,this.vt=h*c*d+u*f*l,this.gt=h*c*l-u*f*d
break
case"YXZ":this.ft=u*c*l+h*f*d,this.dt=h*f*l-u*c*d,this.vt=h*c*d-u*f*l,this.gt=h*c*l+u*f*d
break
case"ZXY":this.ft=u*c*l-h*f*d,this.dt=h*f*l+u*c*d,this.vt=h*c*d+u*f*l,this.gt=h*c*l-u*f*d
break
case"ZYX":this.ft=u*c*l-h*f*d,this.dt=h*f*l+u*c*d,this.vt=h*c*d-u*f*l,this.gt=h*c*l+u*f*d
break
case"YZX":this.ft=u*c*l+h*f*d,this.dt=h*f*l+u*c*d,this.vt=h*c*d-u*f*l,this.gt=h*c*l-u*f*d
break
case"XZY":this.ft=u*c*l-h*f*d,this.dt=h*f*l-u*c*d,this.vt=h*c*d+u*f*l,this.gt=h*c*l+u*f*d}return!0===e&&this._t(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n)
return this.ft=t.x*i,this.dt=t.y*i,this.vt=t.z*i,this.gt=Math.cos(n),this._t(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],h=e[2],c=e[6],l=e[10],u=n+o+l
if(u>0){const t=.5/Math.sqrt(u+1)
this.gt=.25/t,this.ft=(c-a)*t,this.dt=(s-h)*t,this.vt=(r-i)*t}else if(n>o&&n>l){const t=2*Math.sqrt(1+n-o-l)
this.gt=(c-a)/t,this.ft=.25*t,this.dt=(i+r)/t,this.vt=(s+h)/t}else if(o>l){const t=2*Math.sqrt(1+o-n-l)
this.gt=(s-h)/t,this.ft=(i+r)/t,this.dt=.25*t,this.vt=(a+c)/t}else{const t=2*Math.sqrt(1+l-n-o)
this.gt=(r-i)/t,this.ft=(s+h)/t,this.dt=(a+c)/t,this.vt=.25*t}return this._t(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1
return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this.ft=-t.y,this.dt=t.x,this.vt=0,this.gt=n):(this.ft=0,this.dt=-t.z,this.vt=t.y,this.gt=n)):(this.ft=t.y*e.z-t.z*e.y,this.dt=t.z*e.x-t.x*e.z,this.vt=t.x*e.y-t.y*e.x,this.gt=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(r(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t)
if(0===n)return this
const i=Math.min(1,e/n)
return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this.ft*=-1,this.dt*=-1,this.vt*=-1,this._t(),this}dot(t){return this.ft*t.ft+this.dt*t.dt+this.vt*t.vt+this.gt*t.gt}lengthSq(){return this.ft*this.ft+this.dt*this.dt+this.vt*this.vt+this.gt*this.gt}length(){return Math.sqrt(this.ft*this.ft+this.dt*this.dt+this.vt*this.vt+this.gt*this.gt)}normalize(){let t=this.length()
return 0===t?(this.ft=0,this.dt=0,this.vt=0,this.gt=1):(t=1/t,this.ft=this.ft*t,this.dt=this.dt*t,this.vt=this.vt*t,this.gt=this.gt*t),this._t(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t.ft,i=t.dt,s=t.vt,r=t.gt,o=e.ft,a=e.dt,h=e.vt,c=e.gt
return this.ft=n*c+r*o+i*h-s*a,this.dt=i*c+r*a+s*o-n*h,this.vt=s*c+r*h+n*a-i*o,this.gt=r*c-n*o-i*a-s*h,this._t(),this}slerp(t,e){if(0===e)return this
if(1===e)return this.copy(t)
const n=this.ft,i=this.dt,s=this.vt,r=this.gt
let o=r*t.gt+n*t.ft+i*t.dt+s*t.vt
if(o<0?(this.gt=-t.gt,this.ft=-t.ft,this.dt=-t.dt,this.vt=-t.vt,o=-o):this.copy(t),o>=1)return this.gt=r,this.ft=n,this.dt=i,this.vt=s,this
const a=1-o*o
if(a<=Number.EPSILON){const t=1-e
return this.gt=t*r+e*this.gt,this.ft=t*n+e*this.ft,this.dt=t*i+e*this.dt,this.vt=t*s+e*this.vt,this.normalize(),this}const h=Math.sqrt(a),c=Math.atan2(h,o),l=Math.sin((1-e)*c)/h,u=Math.sin(e*c)/h
return this.gt=r*l+this.gt*u,this.ft=n*l+this.ft*u,this.dt=i*l+this.dt*u,this.vt=s*l+this.vt*u,this._t(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n)
return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t.ft===this.ft&&t.dt===this.dt&&t.vt===this.vt&&t.gt===this.gt}fromArray(t,e=0){return this.ft=t[e],this.dt=t[e+1],this.vt=t[e+2],this.gt=t[e+3],this._t(),this}toArray(t=[],e=0){return t[e]=this.ft,t[e+1]=this.dt,t[e+2]=this.vt,t[e+3]=this.gt,t}fromBufferAttribute(t,e){return this.ft=t.getX(e),this.dt=t.getY(e),this.vt=t.getZ(e),this.gt=t.getW(e),this._t(),this}toJSON(){return this.toArray()}wt(t){return this._t=t,this}_t(){}*[Symbol.iterator](){yield this.ft,yield this.dt,yield this.vt,yield this.gt}}class ur{constructor(t=0,e=0,n=0){ur.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return void 0===n&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e
break
case 1:this.y=e
break
case 2:this.z=e
break
default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x
case 1:return this.y
case 2:return this.z
default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dr.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dr.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements
return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15])
return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,o=t.z,a=t.w,h=2*(r*i-o*n),c=2*(o*e-s*i),l=2*(s*n-r*e)
return this.x=e+a*h+r*l-o*c,this.y=n+a*c+o*h-s*l,this.z=i+a*l+s*c-r*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements
return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=r(this.x,t.x,e.x),this.y=r(this.y,t.y,e.y),this.z=r(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=r(this.x,t,e),this.y=r(this.y,t,e),this.z=r(this.z,t,e),this}clampLength(t,e){const n=this.length()
return this.divideScalar(n||1).multiplyScalar(r(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,r=e.x,o=e.y,a=e.z
return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(t){const e=t.lengthSq()
if(0===e)return this.set(0,0,0)
const n=t.dot(this)/e
return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fr.copy(this).projectOnVector(t),this.sub(fr)}reflect(t){return this.sub(fr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq())
if(0===e)return Math.PI/2
const n=this.dot(t)/e
return Math.acos(r(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z
return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t
return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements
return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length()
return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,3*e)}setFromEuler(t){return this.x=t.ft,this.y=t.dt,this.z=t.vt,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=2*Math.random()-1,n=Math.sqrt(1-e*e)
return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fr=new ur,dr=new lr
class pr{constructor(t,e,n,i,s,r,o,a,h){pr.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],void 0!==t&&this.set(t,e,n,i,s,r,o,a,h)}set(t,e,n,i,s,r,o,a,h){const c=this.elements
return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=s,c[5]=a,c[6]=n,c[7]=r,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements
return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements
return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[3],a=n[6],h=n[1],c=n[4],l=n[7],u=n[2],f=n[5],d=n[8],p=i[0],v=i[3],m=i[6],g=i[1],_=i[4],M=i[7],w=i[2],S=i[5],x=i[8]
return s[0]=r*p+o*g+a*w,s[3]=r*v+o*_+a*S,s[6]=r*m+o*M+a*x,s[1]=h*p+c*g+l*w,s[4]=h*v+c*_+l*S,s[7]=h*m+c*M+l*x,s[2]=u*p+f*g+d*w,s[5]=u*v+f*_+d*S,s[8]=u*m+f*M+d*x,this}multiplyScalar(t){const e=this.elements
return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],h=t[7],c=t[8]
return e*r*c-e*o*h-n*s*c+n*o*a+i*s*h-i*r*a}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],h=t[7],c=t[8],l=c*r-o*h,u=o*a-c*s,f=h*s-r*a,d=e*l+n*u+i*f
if(0===d)return this.set(0,0,0,0,0,0,0,0,0)
const p=1/d
return t[0]=l*p,t[1]=(i*h-c*n)*p,t[2]=(o*n-i*r)*p,t[3]=u*p,t[4]=(c*e-i*a)*p,t[5]=(i*s-o*e)*p,t[6]=f*p,t[7]=(n*a-h*e)*p,t[8]=(r*e-n*s)*p,this}transpose(){let t
const e=this.elements
return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements
return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,o){const a=Math.cos(s),h=Math.sin(s)
return this.set(n*a,n*h,-n*(a*r+h*o)+r+t,-i*h,i*a,-i*(-h*r+a*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(vr.makeScale(t,e)),this}rotate(t){return this.premultiply(vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(vr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t)
return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements
for(let i=0;i<9;i++)if(e[i]!==n[i])return!1
return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e]
return this}toArray(t=[],e=0){const n=this.elements
return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return(new this.constructor).fromArray(this.elements)}}const vr=new pr,mr={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array},gr={},_r=(new pr).set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mr=(new pr).set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715),wr=function(){const t={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(t,e,n){return!1!==this.enabled&&e!==n&&e&&n?(this.spaces[e].transfer===zs&&(t.r=v(t.r),t.g=v(t.g),t.b=v(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===zs&&(t.r=m(t.r),t.g=m(t.g),t.b=m(t.b)),t):t},workingToColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},colorSpaceToWorking:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===Bs?ks:this.spaces[t].transfer},getToneMappingMode:function(t){return this.spaces[t].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},I:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},St:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},xt:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(e,n){return p("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(e,n)},toWorkingColorSpace:function(e,n){return p("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(e,n)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329]
return t.define({[Vs]:{primaries:e,whitePoint:i,transfer:ks,toXYZ:_r,fromXYZ:Mr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Gs},outputColorSpaceConfig:{drawingBufferColorSpace:Gs}},[Gs]:{primaries:e,whitePoint:i,transfer:zs,toXYZ:_r,fromXYZ:Mr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Gs}}}),t}()
let Sr
class xr{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src))return t.src
if("undefined"==typeof HTMLCanvasElement)return t.src
let n
if(t instanceof HTMLCanvasElement)n=t
else{void 0===Sr&&(Sr=f("canvas")),Sr.width=t.width,Sr.height=t.height
const e=Sr.getContext("2d")
t instanceof ImageData?e.putImageData(t,0,0):e.drawImage(t,0,0,t.width,t.height),n=Sr}return n.toDataURL(e)}static sRGBToLinear(t){if("undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap){const e=f("canvas")
e.width=t.width,e.height=t.height
const n=e.getContext("2d")
n.drawImage(t,0,0,t.width,t.height)
const i=n.getImageData(0,0,t.width,t.height),s=i.data
for(let t=0;t<s.length;t++)s[t]=255*v(s[t]/255)
return n.putImageData(i,0,0),e}if(t.data){const e=t.data.slice(0)
for(let t=0;t<e.length;t++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[t]=Math.floor(255*v(e[t]/255)):e[t]=v(e[t])
return{data:e,width:t.width,height:t.height}}return void 0,t}}let yr=0
class Er{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yr++}),this.uuid=s(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data
return"undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):null!==e?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){!0===t&&this.version++}toJSON(t){const e=void 0===t||"string"==typeof t
if(!e&&void 0!==t.images[this.uuid])return t.images[this.uuid]
const n={uuid:this.uuid,url:""},i=this.data
if(null!==i){let t
if(Array.isArray(i)){t=[]
for(let e=0,n=i.length;e<n;e++)i[e].isDataTexture?t.push(g(i[e].image)):t.push(g(i[e]))}else t=g(i)
n.url=t}return e||(t.images[this.uuid]=n),n}}let br=0
const Ar=new ur
class Tr extends ir{constructor(t=Tr.DEFAULT_IMAGE,e=Tr.DEFAULT_MAPPING,n=1001,i=1001,r=1006,o=1008,a=1023,h=1009,c=Tr.DEFAULT_ANISOTROPY,l=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:br++}),this.uuid=s(),this.name="",this.source=new Er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=h,this.offset=new cr(0,0),this.repeat=new cr(1,1),this.center=new cr(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pr,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ar).x}get height(){return this.source.getSize(Ar).y}get depth(){return this.source.getSize(Ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return(new this.constructor).copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e]
if(void 0===n){void 0
continue}const i=this[e]
void 0!==i?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n:void 0}}toJSON(t){const e=void 0===t||"string"==typeof t
if(!e&&void 0!==t.textures[this.uuid])return t.textures[this.uuid]
const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment}
return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mi)return t
if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xi:t.x=t.x-Math.floor(t.x)
break
case yi:t.x=t.x<0?0:1
break
case Ei:1===Math.abs(Math.floor(t.x)%2)?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x)}if(t.y<0||t.y>1)switch(this.wrapT){case xi:t.y=t.y-Math.floor(t.y)
break
case yi:t.y=t.y<0?0:1
break
case Ei:1===Math.abs(Math.floor(t.y)%2)?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y)}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){!0===t&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){!0===t&&this.pmremVersion++}}Tr.DEFAULT_IMAGE=null,Tr.DEFAULT_MAPPING=mi,Tr.DEFAULT_ANISOTROPY=1
class Cr{constructor(t=0,e=0,n=0,i=1){Cr.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e
break
case 1:this.y=e
break
case 2:this.z=e
break
case 3:this.w=e
break
default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x
case 1:return this.y
case 2:return this.z
case 3:return this.w
default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements
return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w)
const e=Math.sqrt(1-t.w*t.w)
return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s
const r=.01,o=.1,a=t.elements,h=a[0],c=a[4],l=a[8],u=a[1],f=a[5],d=a[9],p=a[2],v=a[6],m=a[10]
if(Math.abs(c-u)<r&&Math.abs(l-p)<r&&Math.abs(d-v)<r){if(Math.abs(c+u)<o&&Math.abs(l+p)<o&&Math.abs(d+v)<o&&Math.abs(h+f+m-3)<o)return this.set(1,0,0,0),this
e=Math.PI
const t=(h+1)/2,a=(f+1)/2,g=(m+1)/2,_=(c+u)/4,M=(l+p)/4,w=(d+v)/4
return t>a&&t>g?t<r?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(t),i=_/n,s=M/n):a>g?a<r?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(a),n=_/i,s=w/i):g<r?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(g),n=M/s,i=w/s),this.set(n,i,s,e),this}let g=Math.sqrt((v-d)*(v-d)+(l-p)*(l-p)+(u-c)*(u-c))
return Math.abs(g)<.001&&(g=1),this.x=(v-d)/g,this.y=(l-p)/g,this.z=(u-c)/g,this.w=Math.acos((h+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements
return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=r(this.x,t.x,e.x),this.y=r(this.y,t.y,e.y),this.z=r(this.z,t.z,e.z),this.w=r(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=r(this.x,t,e),this.y=r(this.y,t,e),this.z=r(this.z,t,e),this.w=r(this.w,t,e),this}clampLength(t,e){const n=this.length()
return this.divideScalar(n||1).multiplyScalar(r(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lr extends ir{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Cr(0,0,t,e),this.scissorTest=!1,this.viewport=new Cr(0,0,t,e)
const i={width:t,height:e,depth:n.depth},s=new Tr(i)
this.textures=[]
const r=n.count
for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this
this.yt(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.Et=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}yt(t={}){const e={minFilter:Ci,generateMipmaps:!1,flipY:!1,internalFormat:null}
void 0!==t.mapping&&(e.mapping=t.mapping),void 0!==t.wrapS&&(e.wrapS=t.wrapS),void 0!==t.wrapT&&(e.wrapT=t.wrapT),void 0!==t.wrapR&&(e.wrapR=t.wrapR),void 0!==t.magFilter&&(e.magFilter=t.magFilter),void 0!==t.minFilter&&(e.minFilter=t.minFilter),void 0!==t.format&&(e.format=t.format),void 0!==t.type&&(e.type=t.type),void 0!==t.anisotropy&&(e.anisotropy=t.anisotropy),void 0!==t.colorSpace&&(e.colorSpace=t.colorSpace),void 0!==t.flipY&&(e.flipY=t.flipY),void 0!==t.generateMipmaps&&(e.generateMipmaps=t.generateMipmaps),void 0!==t.internalFormat&&(e.internalFormat=t.internalFormat)
for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){null!==this.Et&&(this.Et.renderTarget=null),null!==t&&(t.renderTarget=this),this.Et=t}get depthTexture(){return this.Et}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n
for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1
this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return(new this.constructor).copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0
for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this
const n=Object.assign({},t.textures[e].image)
this.textures[e].source=new Er(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,null!==t.depthTexture&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pr extends Lr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Nr extends Tr{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=bi,this.minFilter=bi,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dr extends Tr{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=bi,this.minFilter=bi,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ur{constructor(t=new ur(1/0,1/0,1/0),e=new ur(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty()
for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Rr.fromArray(t,e))
return this}setFromBufferAttribute(t){this.makeEmpty()
for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Rr.fromBufferAttribute(t,e))
return this}setFromPoints(t){this.makeEmpty()
for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e])
return this}setFromCenterAndSize(t,e){const n=Rr.copy(e).multiplyScalar(.5)
return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1)
const n=t.geometry
if(void 0!==n){const i=n.getAttribute("position")
if(!0===e&&void 0!==i&&!0!==t.isInstancedMesh)for(let e=0,n=i.count;e<n;e++)!0===t.isMesh?t.getVertexPosition(e,Rr):Rr.fromBufferAttribute(i,e),Rr.applyMatrix4(t.matrixWorld),this.expandByPoint(Rr)
else void 0!==t.boundingBox?(null===t.boundingBox&&t.computeBoundingBox(),Or.copy(t.boundingBox)):(null===n.boundingBox&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(t.matrixWorld),this.union(Or)}const i=t.children
for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e)
return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Rr),Rr.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n
return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1
this.getCenter(zr),Wr.subVectors(this.max,zr),Fr.subVectors(t.a,zr),Hr.subVectors(t.b,zr),Br.subVectors(t.c,zr),Gr.subVectors(Hr,Fr),Vr.subVectors(Br,Hr),kr.subVectors(Fr,Br)
let e=[0,-Gr.z,Gr.y,0,-Vr.z,Vr.y,0,-kr.z,kr.y,Gr.z,0,-Gr.x,Vr.z,0,-Vr.x,kr.z,0,-kr.x,-Gr.y,Gr.x,0,-Vr.y,Vr.x,0,-kr.y,kr.x,0]
return!!_(e,Fr,Hr,Br,Wr)&&(e=[1,0,0,0,1,0,0,0,1],!!_(e,Fr,Hr,Br,Wr)&&(jr.crossVectors(Gr,Vr),e=[jr.x,jr.y,jr.z],_(e,Fr,Hr,Br,Wr)))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rr).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=.5*this.getSize(Rr).length()),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()||(Ir[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ir[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ir[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ir[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ir[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ir[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ir[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ir[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ir)),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ir=[new ur,new ur,new ur,new ur,new ur,new ur,new ur,new ur],Rr=new ur,Or=new Ur,Fr=new ur,Hr=new ur,Br=new ur,Gr=new ur,Vr=new ur,kr=new ur,zr=new ur,Wr=new ur,jr=new ur,Xr=new ur,qr=new Ur,Yr=new ur,$r=new ur
class Jr{constructor(t=new ur,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center
void 0!==e?n.copy(e):qr.setFromPoints(t).getCenter(n)
let i=0
for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]))
return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius
return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t)
return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this
Yr.subVectors(t,this.center)
const e=Yr.lengthSq()
if(e>this.radius*this.radius){const t=Math.sqrt(e),n=.5*(t-this.radius)
this.center.addScaledVector(Yr,n/t),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(!0===this.center.equals(t.center)?this.radius=Math.max(this.radius,t.radius):($r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yr.copy(t.center).add($r)),this.expandByPoint(Yr.copy(t.center).sub($r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return(new this.constructor).copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Zr=new ur,Kr=new ur,Qr=new ur,to=new ur,eo=new ur,no=new ur,io=new ur
class so{constructor(t=new ur,e=new ur(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin)
const n=e.dot(this.direction)
return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zr.subVectors(t,this.origin).dot(this.direction)
return e<0?this.origin.distanceToSquared(t):(Zr.copy(this.origin).addScaledVector(this.direction,e),Zr.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Kr.copy(t).add(e).multiplyScalar(.5),Qr.copy(e).sub(t).normalize(),to.copy(this.origin).sub(Kr)
const s=.5*t.distanceTo(e),r=-this.direction.dot(Qr),o=to.dot(this.direction),a=-to.dot(Qr),h=to.lengthSq(),c=Math.abs(1-r*r)
let l,u,f,d
if(c>0)if(l=r*a-o,u=r*o-a,d=s*c,l>=0)if(u>=-d)if(u<=d){const t=1/c
l*=t,u*=t,f=l*(l+r*u+2*o)+u*(r*l+u+2*a)+h}else u=s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+h
else u=-s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+h
else u<=-d?(l=Math.max(0,-(-r*s+o)),u=l>0?-s:Math.min(Math.max(-s,-a),s),f=-l*l+u*(u+2*a)+h):u<=d?(l=0,u=Math.min(Math.max(-s,-a),s),f=u*(u+2*a)+h):(l=Math.max(0,-(r*s+o)),u=l>0?s:Math.min(Math.max(-s,-a),s),f=-l*l+u*(u+2*a)+h)
else u=r>0?-s:s,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*a)+h
return n&&n.copy(this.origin).addScaledVector(this.direction,l),i&&i.copy(Kr).addScaledVector(Qr,u),f}intersectSphere(t,e){Zr.subVectors(t.center,this.origin)
const n=Zr.dot(this.direction),i=Zr.dot(Zr)-n*n,s=t.radius*t.radius
if(i>s)return null
const r=Math.sqrt(s-i),o=n-r,a=n+r
return a<0?null:o<0?this.at(a,e):this.at(o,e)}intersectsSphere(t){return!(t.radius<0)&&this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction)
if(0===e)return 0===t.distanceToPoint(this.origin)?0:null
const n=-(this.origin.dot(t.normal)+t.constant)/e
return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t)
return null===n?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin)
return 0===e||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,r,o,a
const h=1/this.direction.x,c=1/this.direction.y,l=1/this.direction.z,u=this.origin
return h>=0?(n=(t.min.x-u.x)*h,i=(t.max.x-u.x)*h):(n=(t.max.x-u.x)*h,i=(t.min.x-u.x)*h),c>=0?(s=(t.min.y-u.y)*c,r=(t.max.y-u.y)*c):(s=(t.max.y-u.y)*c,r=(t.min.y-u.y)*c),n>r||s>i?null:((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),l>=0?(o=(t.min.z-u.z)*l,a=(t.max.z-u.z)*l):(o=(t.max.z-u.z)*l,a=(t.min.z-u.z)*l),n>a||o>i?null:((o>n||n!=n)&&(n=o),(a<i||i!=i)&&(i=a),i<0?null:this.at(n>=0?n:i,e)))}intersectsBox(t){return null!==this.intersectBox(t,Zr)}intersectTriangle(t,e,n,i,s){eo.subVectors(e,t),no.subVectors(n,t),io.crossVectors(eo,no)
let r,o=this.direction.dot(io)
if(o>0){if(i)return null
r=1}else{if(!(o<0))return null
r=-1,o=-o}to.subVectors(this.origin,t)
const a=r*this.direction.dot(no.crossVectors(to,no))
if(a<0)return null
const h=r*this.direction.dot(eo.cross(to))
if(h<0)return null
if(a+h>o)return null
const c=-r*to.dot(io)
return c<0?null:this.at(c/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return(new this.constructor).copy(this)}}class ro{constructor(t,e,n,i,s,r,o,a,h,c,l,u,f,d,p,v){ro.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],void 0!==t&&this.set(t,e,n,i,s,r,o,a,h,c,l,u,f,d,p,v)}set(t,e,n,i,s,r,o,a,h,c,l,u,f,d,p,v){const m=this.elements
return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=o,m[13]=a,m[2]=h,m[6]=c,m[10]=l,m[14]=u,m[3]=f,m[7]=d,m[11]=p,m[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return(new ro).fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements
return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements
return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements
return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/oo.setFromMatrixColumn(t,0).length(),s=1/oo.setFromMatrixColumn(t,1).length(),r=1/oo.setFromMatrixColumn(t,2).length()
return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),h=Math.sin(i),c=Math.cos(s),l=Math.sin(s)
if("XYZ"===t.order){const t=r*c,n=r*l,i=o*c,s=o*l
e[0]=a*c,e[4]=-a*l,e[8]=h,e[1]=n+i*h,e[5]=t-s*h,e[9]=-o*a,e[2]=s-t*h,e[6]=i+n*h,e[10]=r*a}else if("YXZ"===t.order){const t=a*c,n=a*l,i=h*c,s=h*l
e[0]=t+s*o,e[4]=i*o-n,e[8]=r*h,e[1]=r*l,e[5]=r*c,e[9]=-o,e[2]=n*o-i,e[6]=s+t*o,e[10]=r*a}else if("ZXY"===t.order){const t=a*c,n=a*l,i=h*c,s=h*l
e[0]=t-s*o,e[4]=-r*l,e[8]=i+n*o,e[1]=n+i*o,e[5]=r*c,e[9]=s-t*o,e[2]=-r*h,e[6]=o,e[10]=r*a}else if("ZYX"===t.order){const t=r*c,n=r*l,i=o*c,s=o*l
e[0]=a*c,e[4]=i*h-n,e[8]=t*h+s,e[1]=a*l,e[5]=s*h+t,e[9]=n*h-i,e[2]=-h,e[6]=o*a,e[10]=r*a}else if("YZX"===t.order){const t=r*a,n=r*h,i=o*a,s=o*h
e[0]=a*c,e[4]=s-t*l,e[8]=i*l+n,e[1]=l,e[5]=r*c,e[9]=-o*c,e[2]=-h*c,e[6]=n*l+i,e[10]=t-s*l}else if("XZY"===t.order){const t=r*a,n=r*h,i=o*a,s=o*h
e[0]=a*c,e[4]=-l,e[8]=h*c,e[1]=t*l+s,e[5]=r*c,e[9]=n*l-i,e[2]=i*l-n,e[6]=o*c,e[10]=s*l+t}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ho,t,co)}lookAt(t,e,n){const i=this.elements
return fo.subVectors(t,e),0===fo.lengthSq()&&(fo.z=1),fo.normalize(),lo.crossVectors(n,fo),0===lo.lengthSq()&&(1===Math.abs(n.z)?fo.x+=1e-4:fo.z+=1e-4,fo.normalize(),lo.crossVectors(n,fo)),lo.normalize(),uo.crossVectors(fo,lo),i[0]=lo.x,i[4]=uo.x,i[8]=fo.x,i[1]=lo.y,i[5]=uo.y,i[9]=fo.y,i[2]=lo.z,i[6]=uo.z,i[10]=fo.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[4],a=n[8],h=n[12],c=n[1],l=n[5],u=n[9],f=n[13],d=n[2],p=n[6],v=n[10],m=n[14],g=n[3],_=n[7],M=n[11],w=n[15],S=i[0],x=i[4],y=i[8],E=i[12],b=i[1],A=i[5],T=i[9],C=i[13],L=i[2],P=i[6],N=i[10],D=i[14],U=i[3],I=i[7],R=i[11],O=i[15]
return s[0]=r*S+o*b+a*L+h*U,s[4]=r*x+o*A+a*P+h*I,s[8]=r*y+o*T+a*N+h*R,s[12]=r*E+o*C+a*D+h*O,s[1]=c*S+l*b+u*L+f*U,s[5]=c*x+l*A+u*P+f*I,s[9]=c*y+l*T+u*N+f*R,s[13]=c*E+l*C+u*D+f*O,s[2]=d*S+p*b+v*L+m*U,s[6]=d*x+p*A+v*P+m*I,s[10]=d*y+p*T+v*N+m*R,s[14]=d*E+p*C+v*D+m*O,s[3]=g*S+_*b+M*L+w*U,s[7]=g*x+_*A+M*P+w*I,s[11]=g*y+_*T+M*N+w*R,s[15]=g*E+_*C+M*D+w*O,this}multiplyScalar(t){const e=this.elements
return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],o=t[5],a=t[9],h=t[13],c=t[2],l=t[6],u=t[10],f=t[14]
return t[3]*(+s*a*l-i*h*l-s*o*u+n*h*u+i*o*f-n*a*f)+t[7]*(+e*a*f-e*h*u+s*r*u-i*r*f+i*h*c-s*a*c)+t[11]*(+e*h*l-e*o*f-s*r*l+n*r*f+s*o*c-n*h*c)+t[15]*(-i*o*c-e*a*l+e*o*u+i*r*l-n*r*u+n*a*c)}transpose(){const t=this.elements
let e
return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements
return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],h=t[7],c=t[8],l=t[9],u=t[10],f=t[11],d=t[12],p=t[13],v=t[14],m=t[15],g=l*v*h-p*u*h+p*a*f-o*v*f-l*a*m+o*u*m,_=d*u*h-c*v*h-d*a*f+r*v*f+c*a*m-r*u*m,M=c*p*h-d*l*h+d*o*f-r*p*f-c*o*m+r*l*m,w=d*l*a-c*p*a-d*o*u+r*p*u+c*o*v-r*l*v,S=e*g+n*_+i*M+s*w
if(0===S)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
const x=1/S
return t[0]=g*x,t[1]=(p*u*s-l*v*s-p*i*f+n*v*f+l*i*m-n*u*m)*x,t[2]=(o*v*s-p*a*s+p*i*h-n*v*h-o*i*m+n*a*m)*x,t[3]=(l*a*s-o*u*s-l*i*h+n*u*h+o*i*f-n*a*f)*x,t[4]=_*x,t[5]=(c*v*s-d*u*s+d*i*f-e*v*f-c*i*m+e*u*m)*x,t[6]=(d*a*s-r*v*s-d*i*h+e*v*h+r*i*m-e*a*m)*x,t[7]=(r*u*s-c*a*s+c*i*h-e*u*h-r*i*f+e*a*f)*x,t[8]=M*x,t[9]=(d*l*s-c*p*s-d*n*f+e*p*f+c*n*m-e*l*m)*x,t[10]=(r*p*s-d*o*s+d*n*h-e*p*h-r*n*m+e*o*m)*x,t[11]=(c*o*s-r*l*s-c*n*h+e*l*h+r*n*f-e*o*f)*x,t[12]=w*x,t[13]=(c*p*i-d*l*i+d*n*u-e*p*u-c*n*v+e*l*v)*x,t[14]=(d*o*i-r*p*i-d*n*a+e*p*a+r*n*v-e*o*v)*x,t[15]=(r*l*i-c*o*i+c*n*a-e*l*a-r*n*u+e*o*u)*x,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z
return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10]
return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t)
return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t)
return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t)
return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,o=t.y,a=t.z,h=s*r,c=s*o
return this.set(h*r+n,h*o-i*a,h*a+i*o,0,h*o+i*a,c*o+n,c*a-i*r,0,h*a-i*o,c*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e.ft,r=e.dt,o=e.vt,a=e.gt,h=s+s,c=r+r,l=o+o,u=s*h,f=s*c,d=s*l,p=r*c,v=r*l,m=o*l,g=a*h,_=a*c,M=a*l,w=n.x,S=n.y,x=n.z
return i[0]=(1-(p+m))*w,i[1]=(f+M)*w,i[2]=(d-_)*w,i[3]=0,i[4]=(f-M)*S,i[5]=(1-(u+m))*S,i[6]=(v+g)*S,i[7]=0,i[8]=(d+_)*x,i[9]=(v-g)*x,i[10]=(1-(u+p))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements
let s=oo.set(i[0],i[1],i[2]).length()
const r=oo.set(i[4],i[5],i[6]).length(),o=oo.set(i[8],i[9],i[10]).length()
this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ao.copy(this)
const a=1/s,h=1/r,c=1/o
return ao.elements[0]*=a,ao.elements[1]*=a,ao.elements[2]*=a,ao.elements[4]*=h,ao.elements[5]*=h,ao.elements[6]*=h,ao.elements[8]*=c,ao.elements[9]*=c,ao.elements[10]*=c,e.setFromRotationMatrix(ao),n.x=s,n.y=r,n.z=o,this}makePerspective(t,e,n,i,s,r,o=2e3,a=!1){const h=this.elements,c=2*s/(e-t),l=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i)
let d,p
if(a)d=s/(r-s),p=r*s/(r-s)
else if(o===er)d=-(r+s)/(r-s),p=-2*r*s/(r-s)
else{if(o!==nr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o)
d=-r/(r-s),p=-r*s/(r-s)}return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=l,h[9]=f,h[13]=0,h[2]=0,h[6]=0,h[10]=d,h[14]=p,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,i,s,r,o=2e3,a=!1){const h=this.elements,c=2/(e-t),l=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i)
let d,p
if(a)d=1/(r-s),p=r/(r-s)
else if(o===er)d=-2/(r-s),p=-(r+s)/(r-s)
else{if(o!==nr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o)
d=-1/(r-s),p=-s/(r-s)}return h[0]=c,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=l,h[9]=0,h[13]=f,h[2]=0,h[6]=0,h[10]=d,h[14]=p,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements
for(let i=0;i<16;i++)if(e[i]!==n[i])return!1
return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e]
return this}toArray(t=[],e=0){const n=this.elements
return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oo=new ur,ao=new ro,ho=new ur(0,0,0),co=new ur(1,1,1),lo=new ur,uo=new ur,fo=new ur,po=new ro,vo=new lr
class mo{constructor(t=0,e=0,n=0,i=mo.DEFAULT_ORDER){this.isEuler=!0,this.ft=t,this.dt=e,this.vt=n,this.Mt=i}get x(){return this.ft}set x(t){this.ft=t,this._t()}get y(){return this.dt}set y(t){this.dt=t,this._t()}get z(){return this.vt}set z(t){this.vt=t,this._t()}get order(){return this.Mt}set order(t){this.Mt=t,this._t()}set(t,e,n,i=this.Mt){return this.ft=t,this.dt=e,this.vt=n,this.Mt=i,this._t(),this}clone(){return new this.constructor(this.ft,this.dt,this.vt,this.Mt)}copy(t){return this.ft=t.ft,this.dt=t.dt,this.vt=t.vt,this.Mt=t.Mt,this._t(),this}setFromRotationMatrix(t,e=this.Mt,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],h=i[1],c=i[5],l=i[9],u=i[2],f=i[6],d=i[10]
switch(e){case"XYZ":this.dt=Math.asin(r(a,-1,1)),Math.abs(a)<.9999999?(this.ft=Math.atan2(-l,d),this.vt=Math.atan2(-o,s)):(this.ft=Math.atan2(f,c),this.vt=0)
break
case"YXZ":this.ft=Math.asin(-r(l,-1,1)),Math.abs(l)<.9999999?(this.dt=Math.atan2(a,d),this.vt=Math.atan2(h,c)):(this.dt=Math.atan2(-u,s),this.vt=0)
break
case"ZXY":this.ft=Math.asin(r(f,-1,1)),Math.abs(f)<.9999999?(this.dt=Math.atan2(-u,d),this.vt=Math.atan2(-o,c)):(this.dt=0,this.vt=Math.atan2(h,s))
break
case"ZYX":this.dt=Math.asin(-r(u,-1,1)),Math.abs(u)<.9999999?(this.ft=Math.atan2(f,d),this.vt=Math.atan2(h,s)):(this.ft=0,this.vt=Math.atan2(-o,c))
break
case"YZX":this.vt=Math.asin(r(h,-1,1)),Math.abs(h)<.9999999?(this.ft=Math.atan2(-l,c),this.dt=Math.atan2(-u,s)):(this.ft=0,this.dt=Math.atan2(a,d))
break
case"XZY":this.vt=Math.asin(-r(o,-1,1)),Math.abs(o)<.9999999?(this.ft=Math.atan2(f,c),this.dt=Math.atan2(a,s)):(this.ft=Math.atan2(-l,d),this.dt=0)}return this.Mt=e,!0===n&&this._t(),this}setFromQuaternion(t,e,n){return po.makeRotationFromQuaternion(t),this.setFromRotationMatrix(po,e,n)}setFromVector3(t,e=this.Mt){return this.set(t.x,t.y,t.z,e)}reorder(t){return vo.setFromEuler(this),this.setFromQuaternion(vo,t)}equals(t){return t.ft===this.ft&&t.dt===this.dt&&t.vt===this.vt&&t.Mt===this.Mt}fromArray(t){return this.ft=t[0],this.dt=t[1],this.vt=t[2],void 0!==t[3]&&(this.Mt=t[3]),this._t(),this}toArray(t=[],e=0){return t[e]=this.ft,t[e+1]=this.dt,t[e+2]=this.vt,t[e+3]=this.Mt,t}wt(t){return this._t=t,this}_t(){}*[Symbol.iterator](){yield this.ft,yield this.dt,yield this.vt,yield this.Mt}}mo.DEFAULT_ORDER="XYZ"
class go{constructor(){this.mask=1}set(t){this.mask=1<<t>>>0}enable(t){this.mask|=1<<t}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t}disable(t){this.mask&=~(1<<t)}disableAll(){this.mask=0}test(t){return 0!==(this.mask&t.mask)}isEnabled(t){return!!(this.mask&1<<t)}}let _o=0
const Mo=new ur,wo=new lr,So=new ro,xo=new ur,yo=new ur,Eo=new ur,bo=new lr,Ao=new ur(1,0,0),To=new ur(0,1,0),Co=new ur(0,0,1),Lo={type:"added"},Po={type:"removed"},No={type:"childadded",child:null},Do={type:"childremoved",child:null}
class Uo extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_o++}),this.uuid=s(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Uo.DEFAULT_UP.clone()
const t=new ur,e=new mo,n=new lr,i=new ur(1,1,1)
e.wt(function(){n.setFromEuler(e,!1)}),n.wt(function(){e.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ro},normalMatrix:{value:new pr}}),this.matrix=new ro,this.matrixWorld=new ro,this.matrixAutoUpdate=Uo.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Uo.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wo.setFromAxisAngle(t,e),this.quaternion.multiply(wo),this}rotateOnWorldAxis(t,e){return wo.setFromAxisAngle(t,e),this.quaternion.premultiply(wo),this}rotateX(t){return this.rotateOnAxis(Ao,t)}rotateY(t){return this.rotateOnAxis(To,t)}rotateZ(t){return this.rotateOnAxis(Co,t)}translateOnAxis(t,e){return Mo.copy(t).applyQuaternion(this.quaternion),this.position.add(Mo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ao,t)}translateY(t){return this.translateOnAxis(To,t)}translateZ(t){return this.translateOnAxis(Co,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(So.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xo.copy(t):xo.set(t,e,n)
const i=this.parent
this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?So.lookAt(yo,xo,this.up):So.lookAt(xo,yo,this.up),this.quaternion.setFromRotationMatrix(So),i&&(So.extractRotation(i.matrixWorld),wo.setFromRotationMatrix(So),this.quaternion.premultiply(wo.invert()))}add(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t])
return this}return t===this?(void 0,this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lo),No.child=t,this.dispatchEvent(No),No.child=null):void 0,this)}remove(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t])
return this}const e=this.children.indexOf(t)
return-1!==e&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Po),Do.child=t,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){const t=this.parent
return null!==t&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),So.copy(this.matrixWorld).invert(),null!==t.parent&&(t.parent.updateWorldMatrix(!0,!1),So.multiply(t.parent.matrixWorld)),t.applyMatrix4(So),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lo),No.child=t,this.dispatchEvent(No),No.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this
for(let n=0,i=this.children.length;n<i;n++){const i=this.children[n].getObjectByProperty(t,e)
if(void 0!==i)return i}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this)
const i=this.children
for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n)
return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,t,Eo),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,bo,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1)
const e=this.matrixWorld.elements
return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this)
const e=this.children
for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(!1===this.visible)return
t(this)
const e=this.children
for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent
null!==e&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0)
const e=this.children
for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent
if(!0===t&&null!==n&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),!0===e){const t=this.children
for(let e=0,n=t.length;e<n;e++)t[e].updateWorldMatrix(!1,!0)}}toJSON(t){function e(e,n){return void 0===e[n.uuid]&&(e[n.uuid]=n.toJSON(t)),n.uuid}function n(t){const e=[]
for(const n in t){const i=t[n]
delete i.metadata,e.push(i)}return e}const i=void 0===t||"string"==typeof t,s={}
i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"})
const r={}
if(r.uuid=this.uuid,r.type=this.type,""!==this.name&&(r.name=this.name),!0===this.castShadow&&(r.castShadow=!0),!0===this.receiveShadow&&(r.receiveShadow=!0),!1===this.visible&&(r.visible=!1),!1===this.frustumCulled&&(r.frustumCulled=!1),0!==this.renderOrder&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),!1===this.matrixAutoUpdate&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this.bt,r.reservedRanges=this.At,r.geometryInfo=this.Tt.map(t=>({...t,boundingBox:t.boundingBox?t.boundingBox.toJSON():void 0,boundingSphere:t.boundingSphere?t.boundingSphere.toJSON():void 0})),r.instanceInfo=this.Ct.map(t=>({...t})),r.availableInstanceIds=this.Lt.slice(),r.availableGeometryIds=this.Pt.slice(),r.nextIndexStart=this.Nt,r.nextVertexStart=this.Dt,r.geometryCount=this.Ut,r.maxInstanceCount=this.U,r.maxVertexCount=this.It,r.maxIndexCount=this.Rt,r.geometryInitialized=this.Ot,r.matricesTexture=this.Ft.toJSON(t),r.indirectTexture=this.Ht.toJSON(t),null!==this.R&&(r.colorsTexture=this.R.toJSON(t)),null!==this.boundingSphere&&(r.boundingSphere=this.boundingSphere.toJSON()),null!==this.boundingBox&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&!0!==this.environment.isRenderTargetTexture&&(r.environment=this.environment.toJSON(t).uuid)
else if(this.isMesh||this.isLine||this.isPoints){r.geometry=e(t.geometries,this.geometry)
const n=this.geometry.parameters
if(void 0!==n&&void 0!==n.shapes){const i=n.shapes
if(Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const s=i[n]
e(t.shapes,s)}else e(t.shapes,i)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(e(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),void 0!==this.material)if(Array.isArray(this.material)){const n=[]
for(let i=0,s=this.material.length;i<s;i++)n.push(e(t.materials,this.material[i]))
r.material=n}else r.material=e(t.materials,this.material)
if(this.children.length>0){r.children=[]
for(let e=0;e<this.children.length;e++)r.children.push(this.children[e].toJSON(t).object)}if(this.animations.length>0){r.animations=[]
for(let n=0;n<this.animations.length;n++){const i=this.animations[n]
r.animations.push(e(t.animations,i))}}if(i){const e=n(t.geometries),i=n(t.materials),r=n(t.textures),o=n(t.images),a=n(t.shapes),h=n(t.skeletons),c=n(t.animations),l=n(t.nodes)
e.length>0&&(s.geometries=e),i.length>0&&(s.materials=i),r.length>0&&(s.textures=r),o.length>0&&(s.images=o),a.length>0&&(s.shapes=a),h.length>0&&(s.skeletons=h),c.length>0&&(s.animations=c),l.length>0&&(s.nodes=l)}return s.object=r,s}clone(t){return(new this.constructor).copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)for(let n=0;n<t.children.length;n++){const e=t.children[n]
this.add(e.clone())}return this}}Uo.DEFAULT_UP=new ur(0,1,0),Uo.DEFAULT_MATRIX_AUTO_UPDATE=!0,Uo.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0
const Io=new ur,Ro=new ur,Oo=new ur,Fo=new ur,Ho=new ur,Bo=new ur,Go=new ur,Vo=new ur,ko=new ur,zo=new ur,Wo=new Cr,jo=new Cr,Xo=new Cr
class qo{constructor(t=new ur,e=new ur,n=new ur){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Io.subVectors(t,e),i.cross(Io)
const s=i.lengthSq()
return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Io.subVectors(i,e),Ro.subVectors(n,e),Oo.subVectors(t,e)
const r=Io.dot(Io),o=Io.dot(Ro),a=Io.dot(Oo),h=Ro.dot(Ro),c=Ro.dot(Oo),l=r*h-o*o
if(0===l)return s.set(0,0,0),null
const u=1/l,f=(h*a-o*c)*u,d=(r*c-o*a)*u
return s.set(1-f-d,d,f)}static containsPoint(t,e,n,i){return null!==this.getBarycoord(t,e,n,i,Fo)&&Fo.x>=0&&Fo.y>=0&&Fo.x+Fo.y<=1}static getInterpolation(t,e,n,i,s,r,o,a){return null===this.getBarycoord(t,e,n,i,Fo)?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(s,Fo.x),a.addScaledVector(r,Fo.y),a.addScaledVector(o,Fo.z),a)}static getInterpolatedAttribute(t,e,n,i,s,r){return Wo.setScalar(0),jo.setScalar(0),Xo.setScalar(0),Wo.fromBufferAttribute(t,e),jo.fromBufferAttribute(t,n),Xo.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(Wo,s.x),r.addScaledVector(jo,s.y),r.addScaledVector(Xo,s.z),r}static isFrontFacing(t,e,n,i){return Io.subVectors(n,e),Ro.subVectors(t,e),Io.cross(Ro).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Io.subVectors(this.c,this.b),Ro.subVectors(this.a,this.b),.5*Io.cross(Ro).length()}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qo.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qo.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return qo.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return qo.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qo.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c
let r,o
Ho.subVectors(i,n),Bo.subVectors(s,n),Vo.subVectors(t,n)
const a=Ho.dot(Vo),h=Bo.dot(Vo)
if(a<=0&&h<=0)return e.copy(n)
ko.subVectors(t,i)
const c=Ho.dot(ko),l=Bo.dot(ko)
if(c>=0&&l<=c)return e.copy(i)
const u=a*l-c*h
if(u<=0&&a>=0&&c<=0)return r=a/(a-c),e.copy(n).addScaledVector(Ho,r)
zo.subVectors(t,s)
const f=Ho.dot(zo),d=Bo.dot(zo)
if(d>=0&&f<=d)return e.copy(s)
const p=f*h-a*d
if(p<=0&&h>=0&&d<=0)return o=h/(h-d),e.copy(n).addScaledVector(Bo,o)
const v=c*d-f*l
if(v<=0&&l-c>=0&&f-d>=0)return Go.subVectors(s,i),o=(l-c)/(l-c+(f-d)),e.copy(i).addScaledVector(Go,o)
const m=1/(v+p+u)
return r=p*m,o=u*m,e.copy(n).addScaledVector(Ho,r).addScaledVector(Bo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$o={h:0,s:0,l:0},Jo={h:0,s:0,l:0}
class Zo{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(void 0===e&&void 0===n){const e=t
e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e)}else this.setRGB(t,e,n)
return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Gs){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,wr.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=wr.workingColorSpace){return this.r=t,this.g=e,this.b=n,wr.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=wr.workingColorSpace){if(t=o(t,1),e=r(e,0,1),n=r(n,0,1),0===e)this.r=this.g=this.b=n
else{const i=n<=.5?n*(1+e):n+e-n*e,s=2*n-i
this.r=M(s,i,t+1/3),this.g=M(s,i,t),this.b=M(s,i,t-1/3)}return wr.colorSpaceToWorking(this,i),this}setStyle(t,e=Gs){function n(t){void 0!==t&&(parseFloat(t)<1,0)}let i
if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let t
const s=i[1],r=i[2]
switch(s){case"rgb":case"rgba":if(t=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(t[4]),this.setRGB(Math.min(255,parseInt(t[1],10))/255,Math.min(255,parseInt(t[2],10))/255,Math.min(255,parseInt(t[3],10))/255,e)
if(t=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(t[4]),this.setRGB(Math.min(100,parseInt(t[1],10))/100,Math.min(100,parseInt(t[2],10))/100,Math.min(100,parseInt(t[3],10))/100,e)
break
case"hsl":case"hsla":if(t=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return n(t[4]),this.setHSL(parseFloat(t[1])/360,parseFloat(t[2])/100,parseFloat(t[3])/100,e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const t=i[1],n=t.length
if(3===n)return this.setRGB(parseInt(t.charAt(0),16)/15,parseInt(t.charAt(1),16)/15,parseInt(t.charAt(2),16)/15,e)
if(6===n)return this.setHex(parseInt(t,16),e)
void 0}else if(t&&t.length>0)return this.setColorName(t,e)
return this}setColorName(t,e=Gs){const n=Yo[t.toLowerCase()]
return void 0!==n?this.setHex(n,e):void 0,this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=v(t.r),this.g=v(t.g),this.b=v(t.b),this}copyLinearToSRGB(t){return this.r=m(t.r),this.g=m(t.g),this.b=m(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Gs){return wr.workingToColorSpace(Ko.copy(this),t),65536*Math.round(r(255*Ko.r,0,255))+256*Math.round(r(255*Ko.g,0,255))+Math.round(r(255*Ko.b,0,255))}getHexString(t=Gs){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=wr.workingColorSpace){wr.workingToColorSpace(Ko.copy(this),e)
const n=Ko.r,i=Ko.g,s=Ko.b,r=Math.max(n,i,s),o=Math.min(n,i,s)
let a,h
const c=(o+r)/2
if(o===r)a=0,h=0
else{const t=r-o
switch(h=c<=.5?t/(r+o):t/(2-r-o),r){case n:a=(i-s)/t+(i<s?6:0)
break
case i:a=(s-n)/t+2
break
case s:a=(n-i)/t+4}a/=6}return t.h=a,t.s=h,t.l=c,t}getRGB(t,e=wr.workingColorSpace){return wr.workingToColorSpace(Ko.copy(this),e),t.r=Ko.r,t.g=Ko.g,t.b=Ko.b,t}getStyle(t=Gs){wr.workingToColorSpace(Ko.copy(this),t)
const e=Ko.r,n=Ko.g,i=Ko.b
return t!==Gs?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*e)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(t,e,n){return this.getHSL($o),this.setHSL($o.h+t,$o.s+e,$o.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($o),t.getHSL(Jo)
const n=a($o.h,Jo.h,e),i=a($o.s,Jo.s,e),s=a($o.l,Jo.l,e)
return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements
return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ko=new Zo
Zo.NAMES=Yo
let Qo=0
class ta extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qo++}),this.uuid=s(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qn,this.blendDst=Yn,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zo(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ws,this.stencilZFail=Ws,this.stencilZPass=Ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this.Bt=0}get alphaTest(){return this.Bt}set alphaTest(t){this.Bt>0!=t>0&&this.version++,this.Bt=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(void 0!==t)for(const e in t){const n=t[e]
if(void 0===n){void 0
continue}const i=this[e]
void 0!==i?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n:void 0}}toJSON(t){function e(t){const e=[]
for(const n in t){const i=t[n]
delete i.metadata,e.push(i)}return e}const n=void 0===t||"string"==typeof t
n&&(t={textures:{},images:{}})
const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}}
if(i.uuid=this.uuid,i.type=this.type,""!==this.name&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),void 0!==this.roughness&&(i.roughness=this.roughness),void 0!==this.metalness&&(i.metalness=this.metalness),void 0!==this.sheen&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),void 0!==this.sheenRoughness&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),void 0!==this.emissiveIntensity&&1!==this.emissiveIntensity&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),void 0!==this.specularIntensity&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),void 0!==this.shininess&&(i.shininess=this.shininess),void 0!==this.clearcoat&&(i.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),void 0!==this.dispersion&&(i.dispersion=this.dispersion),void 0!==this.iridescence&&(i.iridescence=this.iridescence),void 0!==this.iridescenceIOR&&(i.iridescenceIOR=this.iridescenceIOR),void 0!==this.iridescenceThicknessRange&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),void 0!==this.anisotropy&&(i.anisotropy=this.anisotropy),void 0!==this.anisotropyRotation&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,void 0!==this.combine&&(i.combine=this.combine)),void 0!==this.envMapRotation&&(i.envMapRotation=this.envMapRotation.toArray()),void 0!==this.envMapIntensity&&(i.envMapIntensity=this.envMapIntensity),void 0!==this.reflectivity&&(i.reflectivity=this.reflectivity),void 0!==this.refractionRatio&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),void 0!==this.transmission&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),void 0!==this.thickness&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),void 0!==this.attenuationDistance&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),void 0!==this.attenuationColor&&(i.attenuationColor=this.attenuationColor.getHex()),void 0!==this.size&&(i.size=this.size),null!==this.shadowSide&&(i.shadowSide=this.shadowSide),void 0!==this.sizeAttenuation&&(i.sizeAttenuation=this.sizeAttenuation),1!==this.blending&&(i.blending=this.blending),0!==this.side&&(i.side=this.side),!0===this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),!0===this.transparent&&(i.transparent=!0),this.blendSrc!==qn&&(i.blendSrc=this.blendSrc),this.blendDst!==Yn&&(i.blendDst=this.blendDst),this.blendEquation!==Gn&&(i.blendEquation=this.blendEquation),null!==this.blendSrcAlpha&&(i.blendSrcAlpha=this.blendSrcAlpha),null!==this.blendDstAlpha&&(i.blendDstAlpha=this.blendDstAlpha),null!==this.blendEquationAlpha&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),0!==this.blendAlpha&&(i.blendAlpha=this.blendAlpha),3!==this.depthFunc&&(i.depthFunc=this.depthFunc),!1===this.depthTest&&(i.depthTest=this.depthTest),!1===this.depthWrite&&(i.depthWrite=this.depthWrite),!1===this.colorWrite&&(i.colorWrite=this.colorWrite),255!==this.stencilWriteMask&&(i.stencilWriteMask=this.stencilWriteMask),519!==this.stencilFunc&&(i.stencilFunc=this.stencilFunc),0!==this.stencilRef&&(i.stencilRef=this.stencilRef),255!==this.stencilFuncMask&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ws&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ws&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ws&&(i.stencilZPass=this.stencilZPass),!0===this.stencilWrite&&(i.stencilWrite=this.stencilWrite),void 0!==this.rotation&&0!==this.rotation&&(i.rotation=this.rotation),!0===this.polygonOffset&&(i.polygonOffset=!0),0!==this.polygonOffsetFactor&&(i.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(i.polygonOffsetUnits=this.polygonOffsetUnits),void 0!==this.linewidth&&1!==this.linewidth&&(i.linewidth=this.linewidth),void 0!==this.dashSize&&(i.dashSize=this.dashSize),void 0!==this.gapSize&&(i.gapSize=this.gapSize),void 0!==this.scale&&(i.scale=this.scale),!0===this.dithering&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),!0===this.alphaHash&&(i.alphaHash=!0),!0===this.alphaToCoverage&&(i.alphaToCoverage=!0),!0===this.premultipliedAlpha&&(i.premultipliedAlpha=!0),!0===this.forceSinglePass&&(i.forceSinglePass=!0),!0===this.wireframe&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(i.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(i.wireframeLinejoin=this.wireframeLinejoin),!0===this.flatShading&&(i.flatShading=!0),!1===this.visible&&(i.visible=!1),!1===this.toneMapped&&(i.toneMapped=!1),!1===this.fog&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),n){const n=e(t.textures),s=e(t.images)
n.length>0&&(i.textures=n),s.length>0&&(i.images=s)}return i}clone(){return(new this.constructor).copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite
const e=t.clippingPlanes
let n=null
if(null!==e){const t=e.length
n=new Array(t)
for(let i=0;i!==t;++i)n[i]=e[i].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){!0===t&&this.version++}}class ea extends ta{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zo(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mo,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const na=function(){const t=new ArrayBuffer(4),e=new Float32Array(t),n=new Uint32Array(t),i=new Uint32Array(512),s=new Uint32Array(512)
for(let h=0;h<256;++h){const t=h-127
t<-27?(i[h]=0,i[256|h]=32768,s[h]=24,s[256|h]=24):t<-14?(i[h]=1024>>-t-14,i[256|h]=1024>>-t-14|32768,s[h]=-t-1,s[256|h]=-t-1):t<=15?(i[h]=t+15<<10,i[256|h]=t+15<<10|32768,s[h]=13,s[256|h]=13):t<128?(i[h]=31744,i[256|h]=64512,s[h]=24,s[256|h]=24):(i[h]=31744,i[256|h]=64512,s[h]=13,s[256|h]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64)
for(let h=1;h<1024;++h){let t=h<<13,e=0
for(;!(8388608&t);)t<<=1,e-=8388608
t&=-8388609,e+=947912704,r[h]=t|e}for(let h=1024;h<2048;++h)r[h]=939524096+(h-1024<<13)
for(let h=1;h<31;++h)o[h]=h<<23
o[31]=1199570944,o[32]=2147483648
for(let h=33;h<63;++h)o[h]=2147483648+(h-32<<23)
o[63]=3347054592
for(let h=1;h<64;++h)32!==h&&(a[h]=1024)
return{floatView:e,uint32View:n,baseTable:i,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}(),ia=new ur,sa=new cr
let ra=0
class oa{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.")
this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ra++}),this.name="",this.array=t,this.itemSize=e,this.count=void 0!==t?t.length/e:0,this.normalized=n,this.usage=Qs,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize
for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i]
return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(2===this.itemSize)for(let e=0,n=this.count;e<n;e++)sa.fromBufferAttribute(this,e),sa.applyMatrix3(t),this.setXY(e,sa.x,sa.y)
else if(3===this.itemSize)for(let e=0,n=this.count;e<n;e++)ia.fromBufferAttribute(this,e),ia.applyMatrix3(t),this.setXYZ(e,ia.x,ia.y,ia.z)
return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ia.fromBufferAttribute(this,e),ia.applyMatrix4(t),this.setXYZ(e,ia.x,ia.y,ia.z)
return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ia.fromBufferAttribute(this,e),ia.applyNormalMatrix(t),this.setXYZ(e,ia.x,ia.y,ia.z)
return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ia.fromBufferAttribute(this,e),ia.transformDirection(t),this.setXYZ(e,ia.x,ia.y,ia.z)
return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e]
return this.normalized&&(n=h(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=c(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize]
return this.normalized&&(e=h(e,this.array)),e}setX(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1]
return this.normalized&&(e=h(e,this.array)),e}setY(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2]
return this.normalized&&(e=h(e,this.array)),e}setZ(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3]
return this.normalized&&(e=h(e,this.array)),e}setW(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array),s=c(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized}
return""!==this.name&&(t.name=this.name),this.usage!==Qs&&(t.usage=this.usage),t}}class aa extends oa{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ha extends oa{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ca extends oa{constructor(t,e,n){super(new Float32Array(t),e,n)}}let la=0
const ua=new ro,fa=new Uo,da=new ur,pa=new Ur,va=new Ur,ma=new ur
class ga extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:la++}),this.uuid=s(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(l(t)?ha:aa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return void 0!==this.attributes[t]}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position
void 0!==e&&(e.applyMatrix4(t),e.needsUpdate=!0)
const n=this.attributes.normal
if(void 0!==n){const e=(new pr).getNormalMatrix(t)
n.applyNormalMatrix(e),n.needsUpdate=!0}const i=this.attributes.tangent
return void 0!==i&&(i.transformDirection(t),i.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}applyQuaternion(t){return ua.makeRotationFromQuaternion(t),this.applyMatrix4(ua),this}rotateX(t){return ua.makeRotationX(t),this.applyMatrix4(ua),this}rotateY(t){return ua.makeRotationY(t),this.applyMatrix4(ua),this}rotateZ(t){return ua.makeRotationZ(t),this.applyMatrix4(ua),this}translate(t,e,n){return ua.makeTranslation(t,e,n),this.applyMatrix4(ua),this}scale(t,e,n){return ua.makeScale(t,e,n),this.applyMatrix4(ua),this}lookAt(t){return fa.lookAt(t),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(da).negate(),this.translate(da.x,da.y,da.z),this}setFromPoints(t){const e=this.getAttribute("position")
if(void 0===e){const e=[]
for(let n=0,i=t.length;n<i;n++){const i=t[n]
e.push(i.x,i.y,i.z||0)}this.setAttribute("position",new ca(e,3))}else{const n=Math.min(t.length,e.count)
for(let i=0;i<n;i++){const n=t[i]
e.setXYZ(i,n.x,n.y,n.z||0)}t.length>e.count,0,e.needsUpdate=!0}return this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Ur)
const t=this.attributes.position,e=this.morphAttributes.position
if(t&&t.isGLBufferAttribute)return void 0,this.boundingBox.set(new ur(-1/0,-1/0,-1/0),new ur(1/0,1/0,1/0)),void 0
if(void 0!==t){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const t=e[n]
pa.setFromBufferAttribute(t),this.morphTargetsRelative?(ma.addVectors(this.boundingBox.min,pa.min),this.boundingBox.expandByPoint(ma),ma.addVectors(this.boundingBox.max,pa.max),this.boundingBox.expandByPoint(ma)):(this.boundingBox.expandByPoint(pa.min),this.boundingBox.expandByPoint(pa.max))}}else this.boundingBox.makeEmpty()
isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z),0}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new Jr)
const t=this.attributes.position,e=this.morphAttributes.position
if(t&&t.isGLBufferAttribute)return void 0,this.boundingSphere.set(new ur,1/0),void 0
if(t){const n=this.boundingSphere.center
if(pa.setFromBufferAttribute(t),e)for(let t=0,s=e.length;t<s;t++){const n=e[t]
va.setFromBufferAttribute(n),this.morphTargetsRelative?(ma.addVectors(pa.min,va.min),pa.expandByPoint(ma),ma.addVectors(pa.max,va.max),pa.expandByPoint(ma)):(pa.expandByPoint(va.min),pa.expandByPoint(va.max))}pa.getCenter(n)
let i=0
for(let e=0,s=t.count;e<s;e++)ma.fromBufferAttribute(t,e),i=Math.max(i,n.distanceToSquared(ma))
if(e)for(let s=0,r=e.length;s<r;s++){const r=e[s],o=this.morphTargetsRelative
for(let e=0,s=r.count;e<s;e++)ma.fromBufferAttribute(r,e),o&&(da.fromBufferAttribute(t,e),ma.add(da)),i=Math.max(i,n.distanceToSquared(ma))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)}}computeTangents(){function t(t,e,n){l.fromBufferAttribute(s,t),u.fromBufferAttribute(s,e),f.fromBufferAttribute(s,n),d.fromBufferAttribute(o,t),p.fromBufferAttribute(o,e),v.fromBufferAttribute(o,n),u.sub(l),f.sub(l),p.sub(d),v.sub(d)
const i=1/(p.x*v.y-v.x*p.y)
isFinite(i)&&(m.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(i),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(i),h[t].add(m),h[e].add(m),h[n].add(m),c[t].add(g),c[e].add(g),c[n].add(g))}function e(t){S.fromBufferAttribute(r,t),x.copy(S)
const e=h[t]
M.copy(e),M.sub(S.multiplyScalar(S.dot(e))).normalize(),w.crossVectors(x,e)
const n=w.dot(c[t])<0?-1:1
a.setXYZW(t,M.x,M.y,M.z,n)}const n=this.index,i=this.attributes
if(null===n||void 0===i.position||void 0===i.normal||void 0===i.uv)return void 0,void 0
const s=i.position,r=i.normal,o=i.uv
!1===this.hasAttribute("tangent")&&this.setAttribute("tangent",new oa(new Float32Array(4*s.count),4))
const a=this.getAttribute("tangent"),h=[],c=[]
for(let y=0;y<s.count;y++)h[y]=new ur,c[y]=new ur
const l=new ur,u=new ur,f=new ur,d=new cr,p=new cr,v=new cr,m=new ur,g=new ur
let _=this.groups
0===_.length&&(_=[{start:0,count:n.count}])
for(let y=0,E=_.length;y<E;++y){const e=_[y],i=e.start
for(let s=i,r=i+e.count;s<r;s+=3)t(n.getX(s+0),n.getX(s+1),n.getX(s+2))}const M=new ur,w=new ur,S=new ur,x=new ur
for(let y=0,E=_.length;y<E;++y){const t=_[y],i=t.start
for(let s=i,r=i+t.count;s<r;s+=3)e(n.getX(s+0)),e(n.getX(s+1)),e(n.getX(s+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position")
if(void 0!==e){let n=this.getAttribute("normal")
if(void 0===n)n=new oa(new Float32Array(3*e.count),3),this.setAttribute("normal",n)
else for(let t=0,e=n.count;t<e;t++)n.setXYZ(t,0,0,0)
const i=new ur,s=new ur,r=new ur,o=new ur,a=new ur,h=new ur,c=new ur,l=new ur
if(t)for(let u=0,f=t.count;u<f;u+=3){const f=t.getX(u+0),d=t.getX(u+1),p=t.getX(u+2)
i.fromBufferAttribute(e,f),s.fromBufferAttribute(e,d),r.fromBufferAttribute(e,p),c.subVectors(r,s),l.subVectors(i,s),c.cross(l),o.fromBufferAttribute(n,f),a.fromBufferAttribute(n,d),h.fromBufferAttribute(n,p),o.add(c),a.add(c),h.add(c),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(d,a.x,a.y,a.z),n.setXYZ(p,h.x,h.y,h.z)}else for(let t=0,u=e.count;t<u;t+=3)i.fromBufferAttribute(e,t+0),s.fromBufferAttribute(e,t+1),r.fromBufferAttribute(e,t+2),c.subVectors(r,s),l.subVectors(i,s),c.cross(l),n.setXYZ(t+0,c.x,c.y,c.z),n.setXYZ(t+1,c.x,c.y,c.z),n.setXYZ(t+2,c.x,c.y,c.z)
this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal
for(let e=0,n=t.count;e<n;e++)ma.fromBufferAttribute(t,e),ma.normalize(),t.setXYZ(e,ma.x,ma.y,ma.z)}toNonIndexed(){function t(t,e){const n=t.array,i=t.itemSize,s=t.normalized,r=new n.constructor(e.length*i)
let o=0,a=0
for(let h=0,c=e.length;h<c;h++){o=t.isInterleavedBufferAttribute?e[h]*t.data.stride+t.offset:e[h]*i
for(let t=0;t<i;t++)r[a++]=n[o++]}return new oa(r,i,s)}if(null===this.index)return void 0,this
const e=new ga,n=this.index.array,i=this.attributes
for(const o in i){const s=t(i[o],n)
e.setAttribute(o,s)}const s=this.morphAttributes
for(const o in s){const i=[],r=s[o]
for(let e=0,s=r.length;e<s;e++){const s=t(r[e],n)
i.push(s)}e.morphAttributes[o]=i}e.morphTargetsRelative=this.morphTargetsRelative
const r=this.groups
for(let o=0,a=r.length;o<a;o++){const t=r[o]
e.addGroup(t.start,t.count,t.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}}
if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),void 0!==this.parameters){const e=this.parameters
for(const n in e)void 0!==e[n]&&(t[n]=e[n])
return t}t.data={attributes:{}}
const e=this.index
null!==e&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)})
const n=this.attributes
for(const a in n){const e=n[a]
t.data.attributes[a]=e.toJSON(t.data)}const i={}
let s=!1
for(const a in this.morphAttributes){const e=this.morphAttributes[a],n=[]
for(let i=0,s=e.length;i<s;i++){const s=e[i]
n.push(s.toJSON(t.data))}n.length>0&&(i[a]=n,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative)
const r=this.groups
r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)))
const o=this.boundingSphere
return null!==o&&(t.data.boundingSphere=o.toJSON()),t}clone(){return(new this.constructor).copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null
const e={}
this.name=t.name
const n=t.index
null!==n&&this.setIndex(n.clone())
const i=t.attributes
for(const h in i){const t=i[h]
this.setAttribute(h,t.clone(e))}const s=t.morphAttributes
for(const h in s){const t=[],n=s[h]
for(let i=0,s=n.length;i<s;i++)t.push(n[i].clone(e))
this.morphAttributes[h]=t}this.morphTargetsRelative=t.morphTargetsRelative
const r=t.groups
for(let h=0,c=r.length;h<c;h++){const t=r[h]
this.addGroup(t.start,t.count,t.materialIndex)}const o=t.boundingBox
null!==o&&(this.boundingBox=o.clone())
const a=t.boundingSphere
return null!==a&&(this.boundingSphere=a.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _a=new ro,Ma=new so,wa=new Jr,Sa=new ur,xa=new ur,ya=new ur,Ea=new ur,ba=new ur,Aa=new ur,Ta=new ur,Ca=new ur
class La extends Uo{constructor(t=new ga,e=new ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),void 0!==t.morphTargetInfluences&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),void 0!==t.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t)
if(e.length>0){const n=t[e[0]]
if(void 0!==n){this.morphTargetInfluences=[],this.morphTargetDictionary={}
for(let t=0,e=n.length;t<e;t++){const e=n[t].name||String(t)
this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative
e.fromBufferAttribute(i,t)
const o=this.morphTargetInfluences
if(s&&o){Aa.set(0,0,0)
for(let n=0,i=s.length;n<i;n++){const i=o[n],a=s[n]
0!==i&&(ba.fromBufferAttribute(a,t),r?Aa.addScaledVector(ba,i):Aa.addScaledVector(ba.sub(e),i))}e.add(Aa)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld
if(void 0!==i){if(null===n.boundingSphere&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(s),Ma.copy(t.ray).recast(t.near),!1===wa.containsPoint(Ma.origin)){if(null===Ma.intersectSphere(wa,Sa))return
if(Ma.origin.distanceToSquared(Sa)>(t.far-t.near)**2)return}_a.copy(s).invert(),Ma.copy(t.ray).applyMatrix4(_a),null!==n.boundingBox&&!1===Ma.intersectsBox(n.boundingBox)||this.Gt(t,e,Ma)}}Gt(t,e,n){let i
const s=this.geometry,r=this.material,o=s.index,a=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,l=s.attributes.normal,u=s.groups,f=s.drawRange
if(null!==o)if(Array.isArray(r))for(let d=0,p=u.length;d<p;d++){const s=u[d],a=r[s.materialIndex]
for(let r=Math.max(s.start,f.start),u=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));r<u;r+=3)i=x(this,a,t,n,h,c,l,o.getX(r),o.getX(r+1),o.getX(r+2)),i&&(i.faceIndex=Math.floor(r/3),i.face.materialIndex=s.materialIndex,e.push(i))}else for(let d=Math.max(0,f.start),p=Math.min(o.count,f.start+f.count);d<p;d+=3)i=x(this,r,t,n,h,c,l,o.getX(d),o.getX(d+1),o.getX(d+2)),i&&(i.faceIndex=Math.floor(d/3),e.push(i))
else if(void 0!==a)if(Array.isArray(r))for(let d=0,p=u.length;d<p;d++){const s=u[d],o=r[s.materialIndex]
for(let r=Math.max(s.start,f.start),u=Math.min(a.count,Math.min(s.start+s.count,f.start+f.count));r<u;r+=3)i=x(this,o,t,n,h,c,l,r,r+1,r+2),i&&(i.faceIndex=Math.floor(r/3),i.face.materialIndex=s.materialIndex,e.push(i))}else for(let d=Math.max(0,f.start),p=Math.min(a.count,f.start+f.count);d<p;d+=3)i=x(this,r,t,n,h,c,l,d,d+1,d+2),i&&(i.faceIndex=Math.floor(d/3),e.push(i))}}class Pa extends ga{constructor(t=1,e=1,n=1,i=1,s=1,r=1){function o(t,e,n,i,s,r,o,p,v,m,g){const _=r/v,M=o/m,w=r/2,S=o/2,x=p/2,y=v+1,E=m+1
let b=0,A=0
const T=new ur
for(let a=0;a<E;a++){const r=a*M-S
for(let o=0;o<y;o++){const h=o*_-w
T[t]=h*i,T[e]=r*s,T[n]=x,c.push(T.x,T.y,T.z),T[t]=0,T[e]=0,T[n]=p>0?1:-1,l.push(T.x,T.y,T.z),u.push(o/v),u.push(1-a/m),b+=1}}for(let a=0;a<m;a++)for(let t=0;t<v;t++){const e=f+t+y*a,n=f+t+y*(a+1),i=f+(t+1)+y*(a+1),s=f+(t+1)+y*a
h.push(e,n,s),h.push(n,i,s),A+=6}a.addGroup(d,A,g),d+=A,f+=b}super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r}
const a=this
i=Math.floor(i),s=Math.floor(s),r=Math.floor(r)
const h=[],c=[],l=[],u=[]
let f=0,d=0
o("z","y","x",-1,-1,n,e,t,r,s,0),o("z","y","x",1,-1,n,e,-t,r,s,1),o("x","z","y",1,1,t,n,e,i,r,2),o("x","z","y",1,-1,t,n,-e,i,r,3),o("x","y","z",1,-1,t,e,n,i,s,4),o("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(h),this.setAttribute("position",new ca(c,3)),this.setAttribute("normal",new ca(l,3)),this.setAttribute("uv",new ca(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pa(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Na={clone:y,merge:E}
class Da extends ta{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,void 0!==t&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=y(t.uniforms),this.uniformsGroups=function(t){const e=[]
for(let n=0;n<t.length;n++)e.push(t[n].clone())
return e}(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t)
e.glslVersion=this.glslVersion,e.uniforms={}
for(const i in this.uniforms){const n=this.uniforms[i].value
n&&n.isTexture?e.uniforms[i]={type:"t",value:n.toJSON(t).uuid}:n&&n.isColor?e.uniforms[i]={type:"c",value:n.getHex()}:n&&n.isVector2?e.uniforms[i]={type:"v2",value:n.toArray()}:n&&n.isVector3?e.uniforms[i]={type:"v3",value:n.toArray()}:n&&n.isVector4?e.uniforms[i]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?e.uniforms[i]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?e.uniforms[i]={type:"m4",value:n.toArray()}:e.uniforms[i]={value:n}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping
const n={}
for(const i in this.extensions)!0===this.extensions[i]&&(n[i]=!0)
return Object.keys(n).length>0&&(e.extensions=n),e}}class Ua extends Uo{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ro,this.projectionMatrix=new ro,this.projectionMatrixInverse=new ro,this.coordinateSystem=er,this.Vt=!1}get reversedDepth(){return this.Vt}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return(new this.constructor).copy(this)}}const Ia=new ur,Ra=new cr,Oa=new cr
class Fa extends Ua{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=null===t.view?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t
this.fov=2*ar*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(.5*or*this.fov)
return.5*this.getFilmHeight()/t}getEffectiveFOV(){return 2*ar*Math.atan(Math.tan(.5*or*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ia.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ia.x,Ia.y).multiplyScalar(-t/Ia.z),Ia.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ia.x,Ia.y).multiplyScalar(-t/Ia.z)}getViewSize(t,e){return this.getViewBounds(t,Ra,Oa),e.subVectors(Oa,Ra)}setViewOffset(t,e,n,i,s,r){this.aspect=t/e,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near
let e=t*Math.tan(.5*or*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i
const r=this.view
if(null!==this.view&&this.view.enabled){const t=r.fullWidth,o=r.fullHeight
s+=r.offsetX*i/t,e-=r.offsetY*n/o,i*=r.width/t,n*=r.height/o}const o=this.filmOffset
0!==o&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t)
return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,null!==this.view&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ha=-90
class Ba extends Uo{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0
const i=new Fa(Ha,1,t,e)
i.layers=this.layers,this.add(i)
const s=new Fa(Ha,1,t,e)
s.layers=this.layers,this.add(s)
const r=new Fa(Ha,1,t,e)
r.layers=this.layers,this.add(r)
const o=new Fa(Ha,1,t,e)
o.layers=this.layers,this.add(o)
const a=new Fa(Ha,1,t,e)
a.layers=this.layers,this.add(a)
const h=new Fa(Ha,1,t,e)
h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,r,o,a]=e
for(const h of e)this.remove(h)
if(t===er)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1)
else{if(t!==nr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t)
n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1)}for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){null===this.parent&&this.updateMatrixWorld()
const{renderTarget:n,activeMipmapLevel:i}=this
this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem())
const[s,r,o,a,h,c]=this.children,l=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),d=t.xr.enabled
t.xr.enabled=!1
const p=n.texture.generateMipmaps
n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,a),t.setRenderTarget(n,4,i),t.render(e,h),n.texture.generateMipmaps=p,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(l,u,f),t.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class Ga extends Tr{constructor(t=[],e=301,n,i,s,r,o,a,h,c){super(t,e,n,i,s,r,o,a,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Va extends Pr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0
const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n]
this.texture=new Ga(i),this.yt(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter
const n=new Pa(5,5,5),i=new Da({name:"CubemapFromEquirect",uniforms:y({tEquirect:{value:null}}),vertexShader:"\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",fragmentShader:"\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t",side:1,blending:0})
i.uniforms.tEquirect.value=e
const s=new La(n,i),r=e.minFilter
return e.minFilter===Pi&&(e.minFilter=Ci),new Ba(1,10,this).update(t,s),e.minFilter=r,s.geometry.dispose(),s.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const s=t.getRenderTarget()
for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i)
t.setRenderTarget(s)}}class ka extends Uo{constructor(){super(),this.isGroup=!0,this.type="Group"}}const za={type:"move"}
class Wa{constructor(){this.kt=null,this.zt=null,this.Wt=null}getHandSpace(){return null===this.Wt&&(this.Wt=new ka,this.Wt.matrixAutoUpdate=!1,this.Wt.visible=!1,this.Wt.joints={},this.Wt.inputState={pinching:!1}),this.Wt}getTargetRaySpace(){return null===this.kt&&(this.kt=new ka,this.kt.matrixAutoUpdate=!1,this.kt.visible=!1,this.kt.hasLinearVelocity=!1,this.kt.linearVelocity=new ur,this.kt.hasAngularVelocity=!1,this.kt.angularVelocity=new ur),this.kt}getGripSpace(){return null===this.zt&&(this.zt=new ka,this.zt.matrixAutoUpdate=!1,this.zt.visible=!1,this.zt.hasLinearVelocity=!1,this.zt.linearVelocity=new ur,this.zt.hasAngularVelocity=!1,this.zt.angularVelocity=new ur),this.zt}dispatchEvent(t){return null!==this.kt&&this.kt.dispatchEvent(t),null!==this.zt&&this.zt.dispatchEvent(t),null!==this.Wt&&this.Wt.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this.Wt
if(e)for(const n of t.hand.values())this.jt(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),null!==this.kt&&(this.kt.visible=!1),null!==this.zt&&(this.zt.visible=!1),null!==this.Wt&&(this.Wt.visible=!1),this}update(t,e,n){let i=null,s=null,r=null
const o=this.kt,a=this.zt,h=this.Wt
if(t&&"visible-blurred"!==e.session.visibilityState){if(h&&t.hand){r=!0
for(const r of t.hand.values()){const t=e.getJointPose(r,n),i=this.jt(h,r)
null!==t&&(i.matrix.fromArray(t.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=t.radius),i.visible=null!==t}const i=h.joints["index-finger-tip"],s=h.joints["thumb-tip"],o=i.position.distanceTo(s.position),a=.02,c=.005
h.inputState.pinching&&o>a+c?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&o<=a-c&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else null!==a&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),null!==s&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1))
null!==o&&(i=e.getPose(t.targetRaySpace,n),null===i&&null!==s&&(i=s),null!==i&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(za)))}return null!==o&&(o.visible=null!==i),null!==a&&(a.visible=null!==s),null!==h&&(h.visible=null!==r),this}jt(t,e){if(void 0===t.joints[e.jointName]){const n=new ka
n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ja{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Zo(t),this.density=e}clone(){return new ja(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Xa{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Zo(t),this.near=e,this.far=n}clone(){return new Xa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class qa extends Uo{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mo,this.environmentIntensity=1,this.environmentRotation=new mo,this.overrideMaterial=null,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),null!==t.background&&(this.background=t.background.clone()),null!==t.environment&&(this.environment=t.environment.clone()),null!==t.fog&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),null!==t.overrideMaterial&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t)
return null!==this.fog&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),1!==this.backgroundIntensity&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),1!==this.environmentIntensity&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ya{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=void 0!==t?t.length/e:0,this.usage=Qs,this.updateRanges=[],this.version=0,this.uuid=s()}onUploadCallback(){}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride
for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i]
return this}set(t,e=0){return this.array.set(t,e),this}clone(t){void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer.Xt&&(this.array.buffer.Xt=s()),void 0===t.arrayBuffers[this.array.buffer.Xt]&&(t.arrayBuffers[this.array.buffer.Xt]=this.array.slice(0).buffer)
const e=new this.array.constructor(t.arrayBuffers[this.array.buffer.Xt]),n=new this.constructor(e,this.stride)
return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer.Xt&&(this.array.buffer.Xt=s()),void 0===t.arrayBuffers[this.array.buffer.Xt]&&(t.arrayBuffers[this.array.buffer.Xt]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer.Xt,type:this.array.constructor.name,stride:this.stride}}}const $a=new ur
class Ja{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)$a.fromBufferAttribute(this,e),$a.applyMatrix4(t),this.setXYZ(e,$a.x,$a.y,$a.z)
return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$a.fromBufferAttribute(this,e),$a.applyNormalMatrix(t),this.setXYZ(e,$a.x,$a.y,$a.z)
return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$a.fromBufferAttribute(this,e),$a.transformDirection(t),this.setXYZ(e,$a.x,$a.y,$a.z)
return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e]
return this.normalized&&(n=h(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=c(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=c(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=c(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=c(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=c(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset]
return this.normalized&&(e=h(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1]
return this.normalized&&(e=h(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2]
return this.normalized&&(e=h(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3]
return this.normalized&&(e=h(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=c(e,this.array),n=c(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array),s=c(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(void 0===t){void 0
const t=[]
for(let e=0;e<this.count;e++){const n=e*this.data.stride+this.offset
for(let e=0;e<this.itemSize;e++)t.push(this.data.array[n+e])}return new oa(new this.array.constructor(t),this.itemSize,this.normalized)}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ja(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(void 0===t){void 0
const t=[]
for(let e=0;e<this.count;e++){const n=e*this.data.stride+this.offset
for(let e=0;e<this.itemSize;e++)t.push(this.data.array[n+e])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Za extends ta{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Zo(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ka
const Qa=new ur,th=new ur,eh=new ur,nh=new cr,ih=new cr,sh=new ro,rh=new ur,oh=new ur,ah=new ur,hh=new cr,ch=new cr,lh=new cr
class uh extends Uo{constructor(t=new Za){if(super(),this.isSprite=!0,this.type="Sprite",void 0===Ka){Ka=new ga
const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),e=new Ya(t,5)
Ka.setIndex([0,1,2,0,2,3]),Ka.setAttribute("position",new Ja(e,3,0,!1)),Ka.setAttribute("uv",new Ja(e,2,3,!1))}this.geometry=Ka,this.material=t,this.center=new cr(.5,.5),this.count=1}raycast(t,e){null===t.camera,0,th.setFromMatrixScale(this.matrixWorld),sh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),eh.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&!1===this.material.sizeAttenuation&&th.multiplyScalar(-eh.z)
const n=this.material.rotation
let i,s
0!==n&&(s=Math.cos(n),i=Math.sin(n))
const r=this.center
A(rh.set(-.5,-.5,0),eh,r,th,i,s),A(oh.set(.5,-.5,0),eh,r,th,i,s),A(ah.set(.5,.5,0),eh,r,th,i,s),hh.set(0,0),ch.set(1,0),lh.set(1,1)
let o=t.ray.intersectTriangle(rh,oh,ah,!1,Qa)
if(null===o&&(A(oh.set(-.5,.5,0),eh,r,th,i,s),ch.set(0,1),o=t.ray.intersectTriangle(rh,ah,oh,!1,Qa),null===o))return
const a=t.ray.origin.distanceTo(Qa)
a<t.near||a>t.far||e.push({distance:a,point:Qa.clone(),uv:qo.getInterpolation(Qa,rh,oh,ah,hh,ch,lh,new cr),face:null,object:this})}copy(t,e){return super.copy(t,e),void 0!==t.center&&this.center.copy(t.center),this.material=t.material,this}}const fh=new ur,dh=new ur
class ph extends Uo{constructor(){super(),this.isLOD=!0,this.qt=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1)
const e=t.levels
for(let n=0,i=e.length;n<i;n++){const t=e[n]
this.addLevel(t.object.clone(),t.distance,t.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e)
const i=this.levels
let s
for(s=0;s<i.length&&!(e<i[s].distance);s++);return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels
for(let n=0;n<e.length;n++)if(e[n].distance===t){const t=e.splice(n,1)
return this.remove(t[0].object),!0}return!1}getCurrentLevel(){return this.qt}getObjectForDistance(t){const e=this.levels
if(e.length>0){let n,i
for(n=1,i=e.length;n<i;n++){let i=e[n].distance
if(e[n].object.visible&&(i-=i*e[n].hysteresis),t<i)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){fh.setFromMatrixPosition(this.matrixWorld)
const n=t.ray.origin.distanceTo(fh)
this.getObjectForDistance(n).raycast(t,e)}}update(t){const e=this.levels
if(e.length>1){fh.setFromMatrixPosition(t.matrixWorld),dh.setFromMatrixPosition(this.matrixWorld)
const n=fh.distanceTo(dh)/t.zoom
let i,s
for(e[0].object.visible=!0,i=1,s=e.length;i<s;i++){let t=e[i].distance
if(e[i].object.visible&&(t-=t*e[i].hysteresis),!(n>=t))break
e[i-1].object.visible=!1,e[i].object.visible=!0}for(this.qt=i-1;i<s;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t)
!1===this.autoUpdate&&(e.object.autoUpdate=!1),e.object.levels=[]
const n=this.levels
for(let i=0,s=n.length;i<s;i++){const t=n[i]
e.object.levels.push({object:t.object.uuid,distance:t.distance,hysteresis:t.hysteresis})}return e}}const vh=new ur,mh=new Cr,gh=new Cr,_h=new ur,Mh=new ro,wh=new ur,Sh=new Jr,xh=new ro,yh=new so
class Eh extends La{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pi,this.bindMatrix=new ro,this.bindMatrixInverse=new ro,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry
null===this.boundingBox&&(this.boundingBox=new Ur),this.boundingBox.makeEmpty()
const e=t.getAttribute("position")
for(let n=0;n<e.count;n++)this.getVertexPosition(n,wh),this.boundingBox.expandByPoint(wh)}computeBoundingSphere(){const t=this.geometry
null===this.boundingSphere&&(this.boundingSphere=new Jr),this.boundingSphere.makeEmpty()
const e=t.getAttribute("position")
for(let n=0;n<e.count;n++)this.getVertexPosition(n,wh),this.boundingSphere.expandByPoint(wh)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld
void 0!==n&&(null===this.boundingSphere&&this.computeBoundingSphere(),Sh.copy(this.boundingSphere),Sh.applyMatrix4(i),!1!==t.ray.intersectsSphere(Sh)&&(xh.copy(i).invert(),yh.copy(t.ray).applyMatrix4(xh),null!==this.boundingBox&&!1===yh.intersectsBox(this.boundingBox)||this.Gt(t,e,yh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,void 0===e&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Cr,e=this.geometry.attributes.skinWeight
for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n)
const i=1/t.manhattanLength()
i!==1/0?t.multiplyScalar(i):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===pi?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vi&&this.bindMatrixInverse.copy(this.bindMatrix).invert()}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry
mh.fromBufferAttribute(i.attributes.skinIndex,t),gh.fromBufferAttribute(i.attributes.skinWeight,t),vh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0)
for(let s=0;s<4;s++){const t=gh.getComponent(s)
if(0!==t){const i=mh.getComponent(s)
Mh.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),e.addScaledVector(_h.copy(vh).applyMatrix4(Mh),t)}}return e.applyMatrix4(this.bindMatrixInverse)}}class bh extends Uo{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ah extends Tr{constructor(t=null,e=1,n=1,i,s,r,o,a,h=1003,c=1003,l,u){super(null,r,o,a,h,c,i,s,l,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Th=new ro,Ch=new ro
class Lh{constructor(t=[],e=[]){this.uuid=s(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses
if(this.boneMatrices=new Float32Array(16*t.length),0===e.length)this.calculateInverses()
else if(t.length!==e.length){void 0,this.boneInverses=[]
for(let t=0,e=this.bones.length;t<e;t++)this.boneInverses.push(new ro)}}calculateInverses(){this.boneInverses.length=0
for(let t=0,e=this.bones.length;t<e;t++){const e=new ro
this.bones[t]&&e.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(e)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t]
e&&e.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t]
e&&(e.parent&&e.parent.isBone?(e.matrix.copy(e.parent.matrixWorld).invert(),e.matrix.multiply(e.matrixWorld)):e.matrix.copy(e.matrixWorld),e.matrix.decompose(e.position,e.quaternion,e.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture
for(let s=0,r=t.length;s<r;s++){const i=t[s]?t[s].matrixWorld:Ch
Th.multiplyMatrices(i,e[s]),Th.toArray(n,16*s)}null!==i&&(i.needsUpdate=!0)}clone(){return new Lh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(4*this.bones.length)
t=4*Math.ceil(t/4),t=Math.max(t,4)
const e=new Float32Array(t*t*4)
e.set(this.boneMatrices)
const n=new Ah(e,t,t,Xi,Fi)
return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const n=this.bones[e]
if(n.name===t)return n}}dispose(){null!==this.boneTexture&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid
for(let n=0,i=t.bones.length;n<i;n++){let i=e[t.bones[n]]
void 0,void 0===i&&(i=new bh),this.bones.push(i),this.boneInverses.push((new ro).fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]}
t.uuid=this.uuid
const e=this.bones,n=this.boneInverses
for(let i=0,s=e.length;i<s;i++){const s=e[i]
t.bones.push(s.uuid)
const r=n[i]
t.boneInverses.push(r.toArray())}return t}}class Ph extends oa{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON()
return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Nh=new ro,Dh=new ro,Uh=[],Ih=new Ur,Rh=new ro,Oh=new La,Fh=new Jr
class Hh extends La{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ph(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null
for(let i=0;i<n;i++)this.setMatrixAt(i,Rh)}computeBoundingBox(){const t=this.geometry,e=this.count
null===this.boundingBox&&(this.boundingBox=new Ur),null===t.boundingBox&&t.computeBoundingBox(),this.boundingBox.makeEmpty()
for(let n=0;n<e;n++)this.getMatrixAt(n,Nh),Ih.copy(t.boundingBox).applyMatrix4(Nh),this.boundingBox.union(Ih)}computeBoundingSphere(){const t=this.geometry,e=this.count
null===this.boundingSphere&&(this.boundingSphere=new Jr),null===t.boundingSphere&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty()
for(let n=0;n<e;n++)this.getMatrixAt(n,Nh),Fh.copy(t.boundingSphere).applyMatrix4(Nh),this.boundingSphere.union(Fh)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),null!==t.morphTexture&&(this.morphTexture=t.morphTexture.clone()),null!==t.instanceColor&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,3*t)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,16*t)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=t*(n.length+1)+1
for(let r=0;r<n.length;r++)n[r]=i[s+r]}raycast(t,e){const n=this.matrixWorld,i=this.count
if(Oh.geometry=this.geometry,Oh.material=this.material,void 0!==Oh.material&&(null===this.boundingSphere&&this.computeBoundingSphere(),Fh.copy(this.boundingSphere),Fh.applyMatrix4(n),!1!==t.ray.intersectsSphere(Fh)))for(let s=0;s<i;s++){this.getMatrixAt(s,Nh),Dh.multiplyMatrices(n,Nh),Oh.matrixWorld=Dh,Oh.raycast(t,Uh)
for(let t=0,n=Uh.length;t<n;t++){const n=Uh[t]
n.instanceId=s,n.object=this,e.push(n)}Uh.length=0}}setColorAt(t,e){null===this.instanceColor&&(this.instanceColor=new Ph(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),e.toArray(this.instanceColor.array,3*t)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,16*t)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1
null===this.morphTexture&&(this.morphTexture=new Ah(new Float32Array(i*this.count),i,this.count,$i,Fi))
const s=this.morphTexture.source.data.data
let r=0
for(let h=0;h<n.length;h++)r+=n[h]
const o=this.geometry.morphTargetsRelative?1:1-r,a=i*t
s[a]=o,s.set(n,a+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),null!==this.morphTexture&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Bh=new ur,Gh=new ur,Vh=new pr
class kh{constructor(t=new ur(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Bh.subVectors(n,e).cross(Gh.subVectors(t,e)).normalize()
return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length()
return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Bh),i=this.normal.dot(n)
if(0===i)return 0===this.distanceToPoint(t.start)?e.copy(t.start):null
const s=-(t.start.dot(this.normal)+this.constant)/i
return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end)
return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vh.getNormalMatrix(t),i=this.coplanarPoint(Bh).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize()
return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return(new this.constructor).copy(this)}}const zh=new Jr,Wh=new cr(.5,.5),jh=new ur
class Xh{constructor(t=new kh,e=new kh,n=new kh,i=new kh,s=new kh,r=new kh){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){const o=this.planes
return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(t){const e=this.planes
for(let n=0;n<6;n++)e[n].copy(t.planes[n])
return this}setFromProjectionMatrix(t,e=2e3,n=!1){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],h=s[3],c=s[4],l=s[5],u=s[6],f=s[7],d=s[8],p=s[9],v=s[10],m=s[11],g=s[12],_=s[13],M=s[14],w=s[15]
if(i[0].setComponents(h-r,f-c,m-d,w-g).normalize(),i[1].setComponents(h+r,f+c,m+d,w+g).normalize(),i[2].setComponents(h+o,f+l,m+p,w+_).normalize(),i[3].setComponents(h-o,f-l,m-p,w-_).normalize(),n)i[4].setComponents(a,u,v,M).normalize(),i[5].setComponents(h-a,f-u,m-v,w-M).normalize()
else if(i[4].setComponents(h-a,f-u,m-v,w-M).normalize(),e===er)i[5].setComponents(h+a,f+u,m+v,w+M).normalize()
else{if(e!==nr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e)
i[5].setComponents(a,u,v,M).normalize()}return this}intersectsObject(t){if(void 0!==t.boundingSphere)null===t.boundingSphere&&t.computeBoundingSphere(),zh.copy(t.boundingSphere).applyMatrix4(t.matrixWorld)
else{const e=t.geometry
null===e.boundingSphere&&e.computeBoundingSphere(),zh.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zh)}intersectsSprite(t){zh.center.set(0,0,0)
const e=Wh.distanceTo(t.center)
return zh.radius=.7071067811865476+e,zh.applyMatrix4(t.matrixWorld),this.intersectsSphere(zh)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius
for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1
return!0}intersectsBox(t){const e=this.planes
for(let n=0;n<6;n++){const i=e[n]
if(jh.x=i.normal.x>0?t.max.x:t.min.x,jh.y=i.normal.y>0?t.max.y:t.min.y,jh.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(jh)<0)return!1}return!0}containsPoint(t){const e=this.planes
for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1
return!0}clone(){return(new this.constructor).copy(this)}}const qh=new ro,Yh=new Xh
class $h{constructor(){this.coordinateSystem=er}intersectsObject(t,e){if(!e.isArrayCamera||0===e.cameras.length)return!1
for(let n=0;n<e.cameras.length;n++){const i=e.cameras[n]
if(qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Yh.setFromProjectionMatrix(qh,i.coordinateSystem,i.reversedDepth),Yh.intersectsObject(t))return!0}return!1}intersectsSprite(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1
for(let n=0;n<e.cameras.length;n++){const i=e.cameras[n]
if(qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Yh.setFromProjectionMatrix(qh,i.coordinateSystem,i.reversedDepth),Yh.intersectsSprite(t))return!0}return!1}intersectsSphere(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1
for(let n=0;n<e.cameras.length;n++){const i=e.cameras[n]
if(qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Yh.setFromProjectionMatrix(qh,i.coordinateSystem,i.reversedDepth),Yh.intersectsSphere(t))return!0}return!1}intersectsBox(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1
for(let n=0;n<e.cameras.length;n++){const i=e.cameras[n]
if(qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Yh.setFromProjectionMatrix(qh,i.coordinateSystem,i.reversedDepth),Yh.intersectsBox(t))return!0}return!1}containsPoint(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1
for(let n=0;n<e.cameras.length;n++){const i=e.cameras[n]
if(qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Yh.setFromProjectionMatrix(qh,i.coordinateSystem,i.reversedDepth),Yh.containsPoint(t))return!0}return!1}clone(){return new $h}}const Jh=new ro,Zh=new Zo(1,1,1),Kh=new Xh,Qh=new $h,tc=new Ur,ec=new Jr,nc=new ur,ic=new ur,sc=new ur,rc=new class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const s=this.pool,r=this.list
this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1})
const o=s[this.index]
r.push(o),this.index++,o.start=t,o.count=e,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},oc=new La,ac=[]
class hc extends La{constructor(t,e,n=2*e,i){super(new ga,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this.Ct=[],this.Tt=[],this.Lt=[],this.Pt=[],this.Nt=0,this.Dt=0,this.Ut=0,this.Yt=!0,this.Ot=!1,this.U=t,this.It=e,this.Rt=n,this.$t=new Int32Array(t),this.Jt=new Int32Array(t),this.Zt=0,this.Kt=null,this.Ft=null,this.Ht=null,this.R=null,this.Qt(),this.te()}get maxInstanceCount(){return this.U}get instanceCount(){return this.Ct.length-this.Lt.length}get unusedVertexCount(){return this.It-this.Dt}get unusedIndexCount(){return this.Rt-this.Nt}Qt(){let t=Math.sqrt(4*this.U)
t=4*Math.ceil(t/4),t=Math.max(t,4)
const e=new Float32Array(t*t*4),n=new Ah(e,t,t,Xi,Fi)
this.Ft=n}te(){let t=Math.sqrt(this.U)
t=Math.ceil(t)
const e=new Uint32Array(t*t),n=new Ah(e,t,t,Ji,Oi)
this.Ht=n}ee(){let t=Math.sqrt(this.U)
t=Math.ceil(t)
const e=new Float32Array(t*t*4).fill(1),n=new Ah(e,t,t,Xi,Fi)
n.colorSpace=wr.workingColorSpace,this.R=n}ne(t){const e=this.geometry,n=this.It,i=this.Rt
if(!1===this.Ot){for(const i in t.attributes){const s=t.getAttribute(i),{array:r,itemSize:o,normalized:a}=s,h=new r.constructor(n*o),c=new oa(h,o,a)
e.setAttribute(i,c)}if(null!==t.getIndex()){const t=n>65535?new Uint32Array(i):new Uint16Array(i)
e.setIndex(new oa(t,1))}this.Ot=!0}}ie(t){const e=this.geometry
if(Boolean(t.getIndex())!==Boolean(e.getIndex()))throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".')
for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`)
const i=t.getAttribute(n),s=e.getAttribute(n)
if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){const e=this.Ct
if(t<0||t>=e.length||!1===e[t].active)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){const e=this.Tt
if(t<0||t>=e.length||!1===e[t].active)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Ur)
const t=this.boundingBox,e=this.Ct
t.makeEmpty()
for(let n=0,i=e.length;n<i;n++){if(!1===e[n].active)continue
const i=e[n].geometryIndex
this.getMatrixAt(n,Jh),this.getBoundingBoxAt(i,tc).applyMatrix4(Jh),t.union(tc)}}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new Jr)
const t=this.boundingSphere,e=this.Ct
t.makeEmpty()
for(let n=0,i=e.length;n<i;n++){if(!1===e[n].active)continue
const i=e[n].geometryIndex
this.getMatrixAt(n,Jh),this.getBoundingSphereAt(i,ec).applyMatrix4(Jh),t.union(ec)}}addInstance(t){if(this.Ct.length>=this.maxInstanceCount&&0===this.Lt.length)throw new Error("THREE.BatchedMesh: Maximum item count reached.")
const e={visible:!0,active:!0,geometryIndex:t}
let n=null
this.Lt.length>0?(this.Lt.sort(T),n=this.Lt.shift(),this.Ct[n]=e):(n=this.Ct.length,this.Ct.push(e))
const i=this.Ft
Jh.identity().toArray(i.image.data,16*n),i.needsUpdate=!0
const s=this.R
return s&&(Zh.toArray(s.image.data,4*n),s.needsUpdate=!0),this.Yt=!0,n}addGeometry(t,e=-1,n=-1){this.ne(t),this.ie(t)
const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this.Tt
i.vertexStart=this.Dt,i.reservedVertexCount=-1===e?t.getAttribute("position").count:e
const r=t.getIndex()
if(null!==r&&(i.indexStart=this.Nt,i.reservedIndexCount=-1===n?r.count:n),-1!==i.indexStart&&i.indexStart+i.reservedIndexCount>this.Rt||i.vertexStart+i.reservedVertexCount>this.It)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.")
let o
return this.Pt.length>0?(this.Pt.sort(T),o=this.Pt.shift(),s[o]=i):(o=this.Ut,this.Ut++,s.push(i)),this.setGeometryAt(o,t),this.Nt=i.indexStart+i.reservedIndexCount,this.Dt=i.vertexStart+i.reservedVertexCount,o}setGeometryAt(t,e){if(t>=this.Ut)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.")
this.ie(e)
const n=this.geometry,i=null!==n.getIndex(),s=n.getIndex(),r=e.getIndex(),o=this.Tt[t]
if(i&&r.count>o.reservedIndexCount||e.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.")
const a=o.vertexStart,h=o.reservedVertexCount
o.vertexCount=e.getAttribute("position").count
for(const c in n.attributes){const t=e.getAttribute(c),i=n.getAttribute(c)
P(t,i,a)
const s=t.itemSize
for(let e=t.count,n=h;e<n;e++){const t=a+e
for(let e=0;e<s;e++)i.setComponent(t,e,0)}i.needsUpdate=!0,i.addUpdateRange(a*s,h*s)}if(i){const t=o.indexStart,n=o.reservedIndexCount
o.indexCount=e.getIndex().count
for(let e=0;e<r.count;e++)s.setX(t+e,a+r.getX(e))
for(let e=r.count,i=n;e<i;e++)s.setX(t+e,a)
s.needsUpdate=!0,s.addUpdateRange(t,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,null!==e.boundingBox&&(o.boundingBox=e.boundingBox.clone()),o.boundingSphere=null,null!==e.boundingSphere&&(o.boundingSphere=e.boundingSphere.clone()),this.Yt=!0,t}deleteGeometry(t){const e=this.Tt
if(t>=e.length||!1===e[t].active)return this
const n=this.Ct
for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===t&&this.deleteInstance(i)
return e[t].active=!1,this.Pt.push(t),this.Yt=!0,this}deleteInstance(t){return this.validateInstanceId(t),this.Ct[t].active=!1,this.Lt.push(t),this.Yt=!0,this}optimize(){let t=0,e=0
const n=this.Tt,i=n.map((t,e)=>e).sort((t,e)=>n[t].vertexStart-n[e].vertexStart),s=this.geometry
for(let r=0,o=n.length;r<o;r++){const o=i[r],a=n[o]
if(!1!==a.active){if(null!==s.index){if(a.indexStart!==e){const{indexStart:n,vertexStart:i,reservedIndexCount:r}=a,o=s.index,h=o.array,c=t-i
for(let t=n;t<n+r;t++)h[t]=h[t]+c
o.array.copyWithin(e,n,n+r),o.addUpdateRange(e,r),a.indexStart=e}e+=a.reservedIndexCount}if(a.vertexStart!==t){const{vertexStart:e,reservedVertexCount:n}=a,i=s.attributes
for(const s in i){const r=i[s],{array:o,itemSize:a}=r
o.copyWithin(t*a,e*a,(e+n)*a),r.addUpdateRange(t*a,n*a)}a.vertexStart=t}t+=a.reservedVertexCount,a.start=s.index?a.indexStart:a.vertexStart,this.Nt=s.index?a.indexStart+a.reservedIndexCount:0,this.Dt=a.vertexStart+a.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this.Ut)return null
const n=this.geometry,i=this.Tt[t]
if(null===i.boundingBox){const t=new Ur,e=n.index,s=n.attributes.position
for(let n=i.start,r=i.start+i.count;n<r;n++){let i=n
e&&(i=e.getX(i)),t.expandByPoint(nc.fromBufferAttribute(s,i))}i.boundingBox=t}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this.Ut)return null
const n=this.geometry,i=this.Tt[t]
if(null===i.boundingSphere){const e=new Jr
this.getBoundingBoxAt(t,tc),tc.getCenter(e.center)
const s=n.index,r=n.attributes.position
let o=0
for(let t=i.start,n=i.start+i.count;t<n;t++){let n=t
s&&(n=s.getX(n)),nc.fromBufferAttribute(r,n),o=Math.max(o,e.center.distanceToSquared(nc))}e.radius=Math.sqrt(o),i.boundingSphere=e}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t)
const n=this.Ft,i=this.Ft.image.data
return e.toArray(i,16*t),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this.Ft.image.data,16*t)}setColorAt(t,e){return this.validateInstanceId(t),null===this.R&&this.ee(),e.toArray(this.R.image.data,4*t),this.R.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),e.fromArray(this.R.image.data,4*t)}setVisibleAt(t,e){return this.validateInstanceId(t),this.Ct[t].visible===e||(this.Ct[t].visible=e,this.Yt=!0),this}getVisibleAt(t){return this.validateInstanceId(t),this.Ct[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this.Ct[t].geometryIndex=e,this}getGeometryIdAt(t){return this.validateInstanceId(t),this.Ct[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t)
const n=this.Tt[t]
return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this.Lt,n=this.Ct
for(e.sort(T);e[e.length-1]===n.length-1;)n.pop(),e.pop()
if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`)
const i=new Int32Array(t),s=new Int32Array(t)
N(this.$t,i),N(this.Jt,s),this.$t=i,this.Jt=s,this.U=t
const r=this.Ht,o=this.Ft,a=this.R
r.dispose(),this.te(),N(r.image.data,this.Ht.image.data),o.dispose(),this.Qt(),N(o.image.data,this.Ft.image.data),a&&(a.dispose(),this.ee(),N(a.image.data,this.R.image.data))}setGeometrySize(t,e){const n=[...this.Tt].filter(t=>t.active)
if(Math.max(...n.map(t=>t.vertexStart+t.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`)
if(this.geometry.index&&Math.max(...n.map(t=>t.indexStart+t.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`)
const i=this.geometry
i.dispose(),this.It=t,this.Rt=e,this.Ot&&(this.Ot=!1,this.geometry=new ga,this.ne(i))
const s=this.geometry
i.index&&N(i.index.array,s.index.array)
for(const r in i.attributes)N(i.attributes[r].array,s.attributes[r].array)}raycast(t,e){const n=this.Ct,i=this.Tt,s=this.matrixWorld,r=this.geometry
oc.material=this.material,oc.geometry.index=r.index,oc.geometry.attributes=r.attributes,null===oc.geometry.boundingBox&&(oc.geometry.boundingBox=new Ur),null===oc.geometry.boundingSphere&&(oc.geometry.boundingSphere=new Jr)
for(let o=0,a=n.length;o<a;o++){if(!n[o].visible||!n[o].active)continue
const r=n[o].geometryIndex,a=i[r]
oc.geometry.setDrawRange(a.start,a.count),this.getMatrixAt(o,oc.matrixWorld).premultiply(s),this.getBoundingBoxAt(r,oc.geometry.boundingBox),this.getBoundingSphereAt(r,oc.geometry.boundingSphere),oc.raycast(t,ac)
for(let t=0,n=ac.length;t<n;t++){const n=ac[t]
n.object=this,n.batchId=o,e.push(n)}ac.length=0}oc.material=null,oc.geometry.index=null,oc.geometry.attributes={},oc.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=null!==t.boundingBox?t.boundingBox.clone():null,this.boundingSphere=null!==t.boundingSphere?t.boundingSphere.clone():null,this.Tt=t.Tt.map(t=>({...t,boundingBox:null!==t.boundingBox?t.boundingBox.clone():null,boundingSphere:null!==t.boundingSphere?t.boundingSphere.clone():null})),this.Ct=t.Ct.map(t=>({...t})),this.Lt=t.Lt.slice(),this.Pt=t.Pt.slice(),this.Nt=t.Nt,this.Dt=t.Dt,this.Ut=t.Ut,this.U=t.U,this.It=t.It,this.Rt=t.Rt,this.Ot=t.Ot,this.$t=t.$t.slice(),this.Jt=t.Jt.slice(),this.Ht=t.Ht.clone(),this.Ht.image.data=this.Ht.image.data.slice(),this.Ft=t.Ft.clone(),this.Ft.image.data=this.Ft.image.data.slice(),null!==this.R&&(this.R=t.R.clone(),this.R.image.data=this.R.image.data.slice()),this}dispose(){this.geometry.dispose(),this.Ft.dispose(),this.Ft=null,this.Ht.dispose(),this.Ht=null,null!==this.R&&(this.R.dispose(),this.R=null)}onBeforeRender(t,e,n,i,s){if(!this.Yt&&!this.perObjectFrustumCulled&&!this.sortObjects)return
const r=i.getIndex(),o=null===r?1:r.array.BYTES_PER_ELEMENT,a=this.Ct,h=this.Jt,c=this.$t,l=this.Tt,u=this.perObjectFrustumCulled,f=this.Ht,d=f.image.data,p=n.isArrayCamera?Qh:Kh
u&&!n.isArrayCamera&&(Jh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Kh.setFromProjectionMatrix(Jh,n.coordinateSystem,n.reversedDepth))
let v=0
if(this.sortObjects){Jh.copy(this.matrixWorld).invert(),nc.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Jh),ic.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Jh)
for(let i=0,s=a.length;i<s;i++)if(a[i].visible&&a[i].active){const t=a[i].geometryIndex
this.getMatrixAt(i,Jh),this.getBoundingSphereAt(t,ec).applyMatrix4(Jh)
let e=!1
if(u&&(e=!p.intersectsSphere(ec,n)),!e){const e=l[t],n=sc.subVectors(ec.center,nc).dot(ic)
rc.push(e.start,e.count,n,i)}}const t=rc.list,e=this.customSort
null===e?t.sort(s.transparent?L:C):e.call(this,t,n)
for(let n=0,i=t.length;n<i;n++){const e=t[n]
h[v]=e.start*o,c[v]=e.count,d[v]=e.index,v++}rc.reset()}else for(let m=0,g=a.length;m<g;m++)if(a[m].visible&&a[m].active){const t=a[m].geometryIndex
let e=!1
if(u&&(this.getMatrixAt(m,Jh),this.getBoundingSphereAt(t,ec).applyMatrix4(Jh),e=!p.intersectsSphere(ec,n)),!e){const e=l[t]
h[v]=e.start*o,c[v]=e.count,d[v]=m,v++}}f.needsUpdate=!0,this.Zt=v,this.Yt=!1}onBeforeShadow(t,e,n,i,s,r){this.onBeforeRender(t,null,i,s,r)}}class cc extends ta{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zo(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lc=new ur,uc=new ur,fc=new ro,dc=new so,pc=new Jr,vc=new ur,mc=new ur
class gc extends Uo{constructor(t=new ga,e=new cc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry
if(null===t.index){const e=t.attributes.position,n=[0]
for(let t=1,i=e.count;t<i;t++)lc.fromBufferAttribute(e,t-1),uc.fromBufferAttribute(e,t),n[t]=n[t-1],n[t]+=lc.distanceTo(uc)
t.setAttribute("lineDistance",new ca(n,1))}else void 0
return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,r=n.drawRange
if(null===n.boundingSphere&&n.computeBoundingSphere(),pc.copy(n.boundingSphere),pc.applyMatrix4(i),pc.radius+=s,!1===t.ray.intersectsSphere(pc))return
fc.copy(i).invert(),dc.copy(t.ray).applyMatrix4(fc)
const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,h=this.isLineSegments?2:1,c=n.index,l=n.attributes.position
if(null!==c){const n=Math.max(0,r.start),i=Math.min(c.count,r.start+r.count)
for(let s=n,r=i-1;s<r;s+=h){const n=c.getX(s),i=c.getX(s+1),r=D(this,t,dc,a,n,i,s)
r&&e.push(r)}if(this.isLineLoop){const s=c.getX(i-1),r=c.getX(n),o=D(this,t,dc,a,s,r,i-1)
o&&e.push(o)}}else{const n=Math.max(0,r.start),i=Math.min(l.count,r.start+r.count)
for(let s=n,r=i-1;s<r;s+=h){const n=D(this,t,dc,a,s,s+1,s)
n&&e.push(n)}if(this.isLineLoop){const s=D(this,t,dc,a,i-1,n,i-1)
s&&e.push(s)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t)
if(e.length>0){const n=t[e[0]]
if(void 0!==n){this.morphTargetInfluences=[],this.morphTargetDictionary={}
for(let t=0,e=n.length;t<e;t++){const e=n[t].name||String(t)
this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}}const _c=new ur,Mc=new ur
class wc extends gc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry
if(null===t.index){const e=t.attributes.position,n=[]
for(let t=0,i=e.count;t<i;t+=2)_c.fromBufferAttribute(e,t),Mc.fromBufferAttribute(e,t+1),n[t]=0===t?0:n[t-1],n[t+1]=n[t]+_c.distanceTo(Mc)
t.setAttribute("lineDistance",new ca(n,1))}else void 0
return this}}class Sc extends gc{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class xc extends ta{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Zo(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yc=new ro,Ec=new so,bc=new Jr,Ac=new ur
class Tc extends Uo{constructor(t=new ga,e=new xc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,r=n.drawRange
if(null===n.boundingSphere&&n.computeBoundingSphere(),bc.copy(n.boundingSphere),bc.applyMatrix4(i),bc.radius+=s,!1===t.ray.intersectsSphere(bc))return
yc.copy(i).invert(),Ec.copy(t.ray).applyMatrix4(yc)
const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),a=o*o,h=n.index,c=n.attributes.position
if(null!==h)for(let l=Math.max(0,r.start),u=Math.min(h.count,r.start+r.count);l<u;l++){const n=h.getX(l)
Ac.fromBufferAttribute(c,n),U(Ac,n,a,i,t,e,this)}else for(let l=Math.max(0,r.start),u=Math.min(c.count,r.start+r.count);l<u;l++)Ac.fromBufferAttribute(c,l),U(Ac,l,a,i,t,e,this)}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t)
if(e.length>0){const n=t[e[0]]
if(void 0!==n){this.morphTargetInfluences=[],this.morphTargetDictionary={}
for(let t=0,e=n.length;t<e;t++){const e=n[t].name||String(t)
this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}}class Cc extends Tr{constructor(t,e,n,i,s=1006,r=1006,o,a,h){super(t,e,n,i,s,r,o,a,h),this.isVideoTexture=!0,this.generateMipmaps=!1,this.se=0
const c=this
"requestVideoFrameCallback"in t&&(this.se=t.requestVideoFrameCallback(function e(){c.needsUpdate=!0,c.se=t.requestVideoFrameCallback(e)}))}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image
0=="requestVideoFrameCallback"in t&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){0!==this.se&&this.source.data.cancelVideoFrameCallback(this.se),super.dispose()}}class Lc extends Tr{constructor(t,e,n,i,s,r,o,a,h,c,l,u){super(null,r,o,a,h,c,i,s,l,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class Pc extends Tr{constructor(t,e,n=1014,i,s,r,o=1003,a=1003,h,c=1026,l=1){if(c!==qi&&c!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat")
super({width:t,height:e,depth:l},i,s,r,o,a,c,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Er(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t)
return null!==this.compareFunction&&(e.compareFunction=this.compareFunction),e}}class Nc extends Tr{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Dc extends ga{constructor(t=1,e=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s))
const r=[],o=[],a=[],h=[],c=e/2,l=Math.PI/2*t,u=e,f=2*l+u,d=2*n+s,p=i+1,v=new ur,m=new ur
for(let g=0;g<=d;g++){let _=0,M=0,w=0,S=0
if(g<=n){const e=g/n,i=e*Math.PI/2
M=-c-t*Math.cos(i),w=t*Math.sin(i),S=-t*Math.cos(i),_=e*l}else if(g<=n+s){const i=(g-n)/s
M=i*e-c,w=t,S=0,_=l+i*u}else{const e=(g-n-s)/n,i=e*Math.PI/2
M=c+t*Math.sin(i),w=t*Math.cos(i),S=t*Math.sin(i),_=l+u+e*l}const x=Math.max(0,Math.min(1,_/f))
let y=0
0===g?y=.5/i:g===d&&(y=-.5/i)
for(let t=0;t<=i;t++){const e=t/i,n=e*Math.PI*2,s=Math.sin(n),r=Math.cos(n)
m.x=-w*r,m.y=M,m.z=w*s,o.push(m.x,m.y,m.z),v.set(-w*r,S,w*s),v.normalize(),a.push(v.x,v.y,v.z),h.push(e+y,x)}if(g>0){const t=(g-1)*p
for(let e=0;e<i;e++){const n=t+e,i=t+e+1,s=g*p+e,o=g*p+e+1
r.push(n,i,s),r.push(i,o,s)}}}this.setIndex(r),this.setAttribute("position",new ca(o,3)),this.setAttribute("normal",new ca(a,3)),this.setAttribute("uv",new ca(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dc(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Uc extends ga{constructor(t=1,e=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e)
const s=[],r=[],o=[],a=[],h=new ur,c=new cr
r.push(0,0,0),o.push(0,0,1),a.push(.5,.5)
for(let l=0,u=3;l<=e;l++,u+=3){const s=n+l/e*i
h.x=t*Math.cos(s),h.y=t*Math.sin(s),r.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(r[u]/t+1)/2,c.y=(r[u+1]/t+1)/2,a.push(c.x,c.y)}for(let l=1;l<=e;l++)s.push(l,l+1,0)
this.setIndex(s),this.setAttribute("position",new ca(r,3)),this.setAttribute("normal",new ca(o,3)),this.setAttribute("uv",new ca(a,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ic extends ga{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,o=0,a=2*Math.PI){function h(n){const s=p,r=new cr,h=new ur
let v=0
const _=!0===n?t:e,M=!0===n?1:-1
for(let t=1;t<=i;t++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),p++
const w=p
for(let t=0;t<=i;t++){const e=t/i*a+o,n=Math.cos(e),s=Math.sin(e)
h.x=_*s,h.y=m*M,h.z=_*n,u.push(h.x,h.y,h.z),f.push(0,M,0),r.x=.5*n+.5,r.y=.5*s*M+.5,d.push(r.x,r.y),p++}for(let t=0;t<i;t++){const e=s+t,i=w+t
!0===n?l.push(i,i+1,e):l.push(i+1,i,e),v+=3}c.addGroup(g,v,!0===n?1:2),g+=v}super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}
const c=this
i=Math.floor(i),s=Math.floor(s)
const l=[],u=[],f=[],d=[]
let p=0
const v=[],m=n/2
let g=0
!function(){const r=new ur,h=new ur
let _=0
const M=(e-t)/n
for(let c=0;c<=s;c++){const l=[],g=c/s,_=g*(e-t)+t
for(let t=0;t<=i;t++){const e=t/i,s=e*a+o,c=Math.sin(s),v=Math.cos(s)
h.x=_*c,h.y=-g*n+m,h.z=_*v,u.push(h.x,h.y,h.z),r.set(c,M,v).normalize(),f.push(r.x,r.y,r.z),d.push(e,1-g),l.push(p++)}v.push(l)}for(let n=0;n<i;n++)for(let i=0;i<s;i++){const r=v[i][n],o=v[i+1][n],a=v[i+1][n+1],h=v[i][n+1];(t>0||0!==i)&&(l.push(r,o,h),_+=3),(e>0||i!==s-1)&&(l.push(o,a,h),_+=3)}c.addGroup(g,_,0),g+=_}(),!1===r&&(t>0&&h(!0),e>0&&h(!1)),this.setIndex(l),this.setAttribute("position",new ca(u,3)),this.setAttribute("normal",new ca(f,3)),this.setAttribute("uv",new ca(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ic(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rc extends Ic{constructor(t=1,e=1,n=32,i=1,s=!1,r=0,o=2*Math.PI){super(0,t,e,n,i,s,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(t){return new Rc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oc extends ga{constructor(t=[],e=[],n=1,i=0){function s(t,e,n,i){const s=i+1,o=[]
for(let r=0;r<=s;r++){o[r]=[]
const i=t.clone().lerp(n,r/s),a=e.clone().lerp(n,r/s),h=s-r
for(let t=0;t<=h;t++)o[r][t]=0===t&&r===s?i:i.clone().lerp(a,t/h)}for(let a=0;a<s;a++)for(let t=0;t<2*(s-a)-1;t++){const e=Math.floor(t/2)
t%2==0?(r(o[a][e+1]),r(o[a+1][e]),r(o[a][e])):(r(o[a][e+1]),r(o[a+1][e+1]),r(o[a+1][e]))}}function r(t){l.push(t.x,t.y,t.z)}function o(e,n){const i=3*e
n.x=t[i+0],n.y=t[i+1],n.z=t[i+2]}function a(t,e,n,i){i<0&&1===t.x&&(u[e]=t.x-1),0===n.x&&0===n.z&&(u[e]=i/2/Math.PI+.5)}function h(t){return Math.atan2(t.z,-t.x)}function c(t){return Math.atan2(-t.y,Math.sqrt(t.x*t.x+t.z*t.z))}super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i}
const l=[],u=[]
!function(t){const n=new ur,i=new ur,r=new ur
for(let a=0;a<e.length;a+=3)o(e[a+0],n),o(e[a+1],i),o(e[a+2],r),s(n,i,r,t)}(i),function(t){const e=new ur
for(let n=0;n<l.length;n+=3)e.x=l[n+0],e.y=l[n+1],e.z=l[n+2],e.normalize().multiplyScalar(t),l[n+0]=e.x,l[n+1]=e.y,l[n+2]=e.z}(n),function(){const t=new ur
for(let e=0;e<l.length;e+=3){t.x=l[e+0],t.y=l[e+1],t.z=l[e+2]
const n=h(t)/2/Math.PI+.5,i=c(t)/Math.PI+.5
u.push(n,1-i)}!function(){const t=new ur,e=new ur,n=new ur,i=new ur,s=new cr,r=new cr,o=new cr
for(let c=0,f=0;c<l.length;c+=9,f+=6){t.set(l[c+0],l[c+1],l[c+2]),e.set(l[c+3],l[c+4],l[c+5]),n.set(l[c+6],l[c+7],l[c+8]),s.set(u[f+0],u[f+1]),r.set(u[f+2],u[f+3]),o.set(u[f+4],u[f+5]),i.copy(t).add(e).add(n).divideScalar(3)
const d=h(i)
a(s,f+0,t,d),a(r,f+2,e,d),a(o,f+4,n,d)}}(),function(){for(let t=0;t<u.length;t+=6){const e=u[t+0],n=u[t+2],i=u[t+4],s=Math.max(e,n,i),r=Math.min(e,n,i)
s>.9&&r<.1&&(e<.2&&(u[t+0]+=1),n<.2&&(u[t+2]+=1),i<.2&&(u[t+4]+=1))}}()}(),this.setAttribute("position",new ca(l,3)),this.setAttribute("normal",new ca(l.slice(),3)),this.setAttribute("uv",new ca(u,2)),0===i?this.computeVertexNormals():this.normalizeNormals()}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oc(t.vertices,t.indices,t.radius,t.details)}}class Fc extends Oc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n
super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Fc(t.radius,t.detail)}}const Hc=new ur,Bc=new ur,Gc=new ur,Vc=new qo
class kc extends ga{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},null!==t){const n=4,i=Math.pow(10,n),s=Math.cos(or*e),r=t.getIndex(),o=t.getAttribute("position"),a=r?r.count:o.count,h=[0,0,0],c=["a","b","c"],l=new Array(3),u={},f=[]
for(let t=0;t<a;t+=3){r?(h[0]=r.getX(t),h[1]=r.getX(t+1),h[2]=r.getX(t+2)):(h[0]=t,h[1]=t+1,h[2]=t+2)
const{a:e,b:n,c:a}=Vc
if(e.fromBufferAttribute(o,h[0]),n.fromBufferAttribute(o,h[1]),a.fromBufferAttribute(o,h[2]),Vc.getNormal(Gc),l[0]=`${Math.round(e.x*i)},${Math.round(e.y*i)},${Math.round(e.z*i)}`,l[1]=`${Math.round(n.x*i)},${Math.round(n.y*i)},${Math.round(n.z*i)}`,l[2]=`${Math.round(a.x*i)},${Math.round(a.y*i)},${Math.round(a.z*i)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let t=0;t<3;t++){const e=(t+1)%3,n=l[t],i=l[e],r=Vc[c[t]],o=Vc[c[e]],a=`${n}_${i}`,d=`${i}_${n}`
d in u&&u[d]?(Gc.dot(u[d].normal)<=s&&(f.push(r.x,r.y,r.z),f.push(o.x,o.y,o.z)),u[d]=null):a in u||(u[a]={index0:h[t],index1:h[e],normal:Gc.clone()})}}for(const t in u)if(u[t]){const{index0:e,index1:n}=u[t]
Hc.fromBufferAttribute(o,e),Bc.fromBufferAttribute(o,n),f.push(Hc.x,Hc.y,Hc.z),f.push(Bc.x,Bc.y,Bc.z)}this.setAttribute("position",new ca(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class zc{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){void 0}getPointAt(t,e){const n=this.getUtoTmapping(t)
return this.getPoint(n,e)}getPoints(t=5){const e=[]
for(let n=0;n<=t;n++)e.push(this.getPoint(n/t))
return e}getSpacedPoints(t=5){const e=[]
for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t))
return e}getLength(){const t=this.getLengths()
return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths
this.needsUpdate=!1
const e=[]
let n,i=this.getPoint(0),s=0
e.push(0)
for(let r=1;r<=t;r++)n=this.getPoint(r/t),s+=n.distanceTo(i),e.push(s),i=n
return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths()
let i=0
const s=n.length
let r
r=e||t*n[s-1]
let o,a=0,h=s-1
for(;a<=h;)if(i=Math.floor(a+(h-a)/2),o=n[i]-r,o<0)a=i+1
else{if(!(o>0)){h=i
break}h=i-1}if(i=h,n[i]===r)return i/(s-1)
const c=n[i]
return(i+(r-c)/(n[i+1]-c))/(s-1)}getTangent(t,e){const n=1e-4
let i=t-n,s=t+n
i<0&&(i=0),s>1&&(s=1)
const r=this.getPoint(i),o=this.getPoint(s),a=e||(r.isVector2?new cr:new ur)
return a.copy(o).sub(r).normalize(),a}getTangentAt(t,e){const n=this.getUtoTmapping(t)
return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new ur,i=[],s=[],o=[],a=new ur,h=new ro
for(let r=0;r<=t;r++){const e=r/t
i[r]=this.getTangentAt(e,new ur)}s[0]=new ur,o[0]=new ur
let c=Number.MAX_VALUE
const l=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z)
l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0])
for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize()
const t=Math.acos(r(i[d-1].dot(i[d]),-1,1))
s[d].applyMatrix4(h.makeRotationAxis(a,t))}o[d].crossVectors(i[d],s[d])}if(!0===e){let e=Math.acos(r(s[0].dot(s[t]),-1,1))
e/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(e=-e)
for(let n=1;n<=t;n++)s[n].applyMatrix4(h.makeRotationAxis(i[n],e*n)),o[n].crossVectors(i[n],s[n])}return{tangents:i,normals:s,binormals:o}}clone(){return(new this.constructor).copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}}
return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Wc extends zc{constructor(t=0,e=0,n=1,i=1,s=0,r=2*Math.PI,o=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=a}getPoint(t,e=new cr){const n=e,i=2*Math.PI
let s=this.aEndAngle-this.aStartAngle
const r=Math.abs(s)<Number.EPSILON
for(;s<0;)s+=i
for(;s>i;)s-=i
s<Number.EPSILON&&(s=r?0:i),!0!==this.aClockwise||r||(s===i?s=-i:s-=i)
const o=this.aStartAngle+t*s
let a=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o)
if(0!==this.aRotation){const t=Math.cos(this.aRotation),e=Math.sin(this.aRotation),n=a-this.aX,i=h-this.aY
a=n*t-i*e+this.aX,h=n*e+i*t+this.aY}return n.set(a,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON()
return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class jc extends Wc{constructor(t,e,n,i,s,r){super(t,e,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}const Xc=new ur,qc=new I,Yc=new I,$c=new I
class Jc extends zc{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new ur){const n=e,i=this.points,s=i.length,r=(s-(this.closed?0:1))*t
let o,a,h=Math.floor(r),c=r-h
this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/s)+1)*s:0===c&&h===s-1&&(h=s-2,c=1),this.closed||h>0?o=i[(h-1)%s]:(Xc.subVectors(i[0],i[1]).add(i[0]),o=Xc)
const l=i[h%s],u=i[(h+1)%s]
if(this.closed||h+2<s?a=i[(h+2)%s]:(Xc.subVectors(i[s-1],i[s-2]).add(i[s-1]),a=Xc),"centripetal"===this.curveType||"chordal"===this.curveType){const t="chordal"===this.curveType?.5:.25
let e=Math.pow(o.distanceToSquared(l),t),n=Math.pow(l.distanceToSquared(u),t),i=Math.pow(u.distanceToSquared(a),t)
n<1e-4&&(n=1),e<1e-4&&(e=n),i<1e-4&&(i=n),qc.initNonuniformCatmullRom(o.x,l.x,u.x,a.x,e,n,i),Yc.initNonuniformCatmullRom(o.y,l.y,u.y,a.y,e,n,i),$c.initNonuniformCatmullRom(o.z,l.z,u.z,a.z,e,n,i)}else"catmullrom"===this.curveType&&(qc.initCatmullRom(o.x,l.x,u.x,a.x,this.tension),Yc.initCatmullRom(o.y,l.y,u.y,a.y,this.tension),$c.initCatmullRom(o.z,l.z,u.z,a.z,this.tension))
return n.set(qc.calc(c),Yc.calc(c),$c.calc(c)),n}copy(t){super.copy(t),this.points=[]
for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e]
this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON()
t.points=[]
for(let e=0,n=this.points.length;e<n;e++){const n=this.points[e]
t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[]
for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e]
this.points.push((new ur).fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Zc extends zc{constructor(t=new cr,e=new cr,n=new cr,i=new cr){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new cr){const n=e,i=this.v0,s=this.v1,r=this.v2,o=this.v3
return n.set(F(t,i.x,s.x,r.x,o.x),F(t,i.y,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON()
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kc extends zc{constructor(t=new ur,e=new ur,n=new ur,i=new ur){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ur){const n=e,i=this.v0,s=this.v1,r=this.v2,o=this.v3
return n.set(F(t,i.x,s.x,r.x,o.x),F(t,i.y,s.y,r.y,o.y),F(t,i.z,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON()
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Qc extends zc{constructor(t=new cr,e=new cr){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new cr){const n=e
return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new cr){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON()
return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tl extends zc{constructor(t=new ur,e=new ur){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new ur){const n=e
return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ur){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON()
return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class el extends zc{constructor(t=new cr,e=new cr,n=new cr){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new cr){const n=e,i=this.v0,s=this.v1,r=this.v2
return n.set(O(t,i.x,s.x,r.x),O(t,i.y,s.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON()
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nl extends zc{constructor(t=new ur,e=new ur,n=new ur){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ur){const n=e,i=this.v0,s=this.v1,r=this.v2
return n.set(O(t,i.x,s.x,r.x),O(t,i.y,s.y,r.y),O(t,i.z,s.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON()
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class il extends zc{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new cr){const n=e,i=this.points,s=(i.length-1)*t,r=Math.floor(s),o=s-r,a=i[0===r?r:r-1],h=i[r],c=i[r>i.length-2?i.length-1:r+1],l=i[r>i.length-3?i.length-1:r+2]
return n.set(R(o,a.x,h.x,c.x,l.x),R(o,a.y,h.y,c.y,l.y)),n}copy(t){super.copy(t),this.points=[]
for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e]
this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON()
t.points=[]
for(let e=0,n=this.points.length;e<n;e++){const n=this.points[e]
t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[]
for(let e=0,n=t.points.length;e<n;e++){const n=t.points[e]
this.points.push((new cr).fromArray(n))}return this}}var sl=Object.freeze({__proto__:null,ArcCurve:jc,CatmullRomCurve3:Jc,CubicBezierCurve:Zc,CubicBezierCurve3:Kc,EllipseCurve:Wc,LineCurve:Qc,LineCurve3:tl,QuadraticBezierCurve:el,QuadraticBezierCurve3:nl,SplineCurve:il})
class rl extends zc{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1)
if(!t.equals(e)){const n=!0===t.isVector2?"LineCurve":"LineCurve3"
this.curves.push(new sl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths()
let s=0
for(;s<i.length;){if(i[s]>=n){const t=i[s]-n,r=this.curves[s],o=r.getLength(),a=0===o?0:1-t/o
return r.getPointAt(a,e)}s++}return null}getLength(){const t=this.getCurveLengths()
return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths
const t=[]
let e=0
for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e)
return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[]
for(let n=0;n<=t;n++)e.push(this.getPoint(n/t))
return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[]
let n
for(let i=0,s=this.curves;i<s.length;i++){const r=s[i],o=r.isEllipseCurve?2*t:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,a=r.getPoints(o)
for(let t=0;t<a.length;t++){const i=a[t]
n&&n.equals(i)||(e.push(i),n=i)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[]
for(let e=0,n=t.curves.length;e<n;e++){const n=t.curves[e]
this.curves.push(n.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON()
t.autoClose=this.autoClose,t.curves=[]
for(let e=0,n=this.curves.length;e<n;e++){const n=this.curves[e]
t.curves.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[]
for(let e=0,n=t.curves.length;e<n;e++){const n=t.curves[e]
this.curves.push((new sl[n.type]).fromJSON(n))}return this}}class ol extends rl{constructor(t){super(),this.type="Path",this.currentPoint=new cr,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y)
for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y)
return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Qc(this.currentPoint.clone(),new cr(t,e))
return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new el(this.currentPoint.clone(),new cr(t,e),new cr(n,i))
return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,r){const o=new Zc(this.currentPoint.clone(),new cr(t,e),new cr(n,i),new cr(s,r))
return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new il(e)
return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,r){const o=this.currentPoint.x,a=this.currentPoint.y
return this.absarc(t+o,e+a,n,i,s,r),this}absarc(t,e,n,i,s,r){return this.absellipse(t,e,n,n,i,s,r),this}ellipse(t,e,n,i,s,r,o,a){const h=this.currentPoint.x,c=this.currentPoint.y
return this.absellipse(t+h,e+c,n,i,s,r,o,a),this}absellipse(t,e,n,i,s,r,o,a){const h=new Wc(t,e,n,i,s,r,o,a)
if(this.curves.length>0){const t=h.getPoint(0)
t.equals(this.currentPoint)||this.lineTo(t.x,t.y)}this.curves.push(h)
const c=h.getPoint(1)
return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON()
return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class al extends ol{constructor(t){super(t),this.uuid=s(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[]
for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t)
return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[]
for(let e=0,n=t.holes.length;e<n;e++){const n=t.holes[e]
this.holes.push(n.clone())}return this}toJSON(){const t=super.toJSON()
t.uuid=this.uuid,t.holes=[]
for(let e=0,n=this.holes.length;e<n;e++){const n=this.holes[e]
t.holes.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[]
for(let e=0,n=t.holes.length;e<n;e++){const n=t.holes[e]
this.holes.push((new ol).fromJSON(n))}return this}}class hl{static triangulate(t,e,n=2){return function(t,e,n=2){const i=e&&e.length,s=i?e[0]*n:t.length
let r=H(t,0,s,n,!0)
const o=[]
if(!r||r.next===r.prev)return o
let a,h,c
if(i&&(r=function(t,e,n,i){const s=[]
for(let r=0,o=e.length;r<o;r++){const n=H(t,e[r]*i,r<o-1?e[r+1]*i:t.length,i,!1)
n===n.next&&(n.steiner=!0),s.push($(n))}s.sort(j)
for(let r=0;r<s.length;r++)n=X(s[r],n)
return n}(t,e,r,n)),t.length>80*n){a=1/0,h=1/0
let e=-1/0,i=-1/0
for(let r=n;r<s;r+=n){const n=t[r],s=t[r+1]
n<a&&(a=n),s<h&&(h=s),n>e&&(e=n),s>i&&(i=s)}c=Math.max(e-a,i-h),c=0!==c?32767/c:0}return G(r,o,n,a,h,c,0),o}(t,e,n)}}class cl{static area(t){const e=t.length
let n=0
for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y
return.5*n}static isClockWise(t){return cl.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[]
ct(t),lt(n,t)
let r=t.length
e.forEach(ct)
for(let a=0;a<e.length;a++)i.push(r),r+=e[a].length,lt(n,e[a])
const o=hl.triangulate(n,i)
for(let a=0;a<o.length;a+=3)s.push(o.slice(a,a+3))
return s}}class ll extends ga{constructor(t=new al([new cr(.5,.5),new cr(-.5,.5),new cr(-.5,-.5),new cr(.5,-.5)]),e={}){function n(t){function n(t){const e=1e-10*1e-10
let n=t[0]
for(let i=1;i<=t.length;i++){const s=i%t.length,r=t[s],o=r.x-n.x,a=r.y-n.y,h=o*o+a*a,c=Math.max(Math.abs(r.x),Math.abs(r.y),Math.abs(n.x),Math.abs(n.y))
h<=e*c*c?(t.splice(s,1),i--):n=r}}function o(t,e,n){return e,t.clone().addScaledVector(e,n)}function a(t,e,n){let i,s,r
const o=t.x-e.x,a=t.y-e.y,h=n.x-t.x,c=n.y-t.y,l=o*o+a*a,u=o*c-a*h
if(Math.abs(u)>Number.EPSILON){const u=Math.sqrt(l),f=Math.sqrt(h*h+c*c),d=e.x-a/u,p=e.y+o/u,v=((n.x-c/f-d)*c-(n.y+h/f-p)*h)/(o*c-a*h)
i=d+o*v-t.x,s=p+a*v-t.y
const m=i*i+s*s
if(m<=2)return new cr(i,s)
r=Math.sqrt(m/2)}else{let t=!1
o>Number.EPSILON?h>Number.EPSILON&&(t=!0):o<-Number.EPSILON?h<-Number.EPSILON&&(t=!0):Math.sign(a)===Math.sign(c)&&(t=!0),t?(i=-a,s=o,r=Math.sqrt(l)):(i=o,s=a,r=Math.sqrt(l/2))}return new cr(i/r,s/r)}function h(t,e){let n=t.length
for(;--n>=0;){const i=n
let s=n-1
s<0&&(s=t.length-1)
for(let t=0,n=m+2*x;t<n;t++){const n=O*t,r=O*(t+1)
u(e+i+n,e+s+n,e+s+r,e+i+r)}}}function c(t,e,n){p.push(t),p.push(e),p.push(n)}function l(t,e,n){f(t),f(e),f(n)
const r=s.length/3,o=E.generateTopUV(i,s,r-3,r-2,r-1)
d(o[0]),d(o[1]),d(o[2])}function u(t,e,n,r){f(t),f(e),f(r),f(e),f(n),f(r)
const o=s.length/3,a=E.generateSideWallUV(i,s,o-6,o-3,o-2,o-1)
d(a[0]),d(a[1]),d(a[3]),d(a[1]),d(a[2]),d(a[3])}function f(t){s.push(p[3*t+0]),s.push(p[3*t+1]),s.push(p[3*t+2])}function d(t){r.push(t.x),r.push(t.y)}const p=[],v=void 0!==e.curveSegments?e.curveSegments:12,m=void 0!==e.steps?e.steps:1,g=void 0!==e.depth?e.depth:1
let _=void 0===e.bevelEnabled||e.bevelEnabled,M=void 0!==e.bevelThickness?e.bevelThickness:.2,w=void 0!==e.bevelSize?e.bevelSize:M-.1,S=void 0!==e.bevelOffset?e.bevelOffset:0,x=void 0!==e.bevelSegments?e.bevelSegments:3
const y=e.extrudePath,E=void 0!==e.UVGenerator?e.UVGenerator:ul
let b,A,T,C,L,P=!1
y&&(b=y.getSpacedPoints(m),P=!0,_=!1,A=y.computeFrenetFrames(m,!1),T=new ur,C=new ur,L=new ur),_||(x=0,M=0,w=0,S=0)
const N=t.extractPoints(v)
let D=N.shape
const U=N.holes
if(!cl.isClockWise(D)){D=D.reverse()
for(let t=0,e=U.length;t<e;t++){const e=U[t]
cl.isClockWise(e)&&(U[t]=e.reverse())}}n(D),U.forEach(n)
const I=U.length,R=D
for(let e=0;e<I;e++){const t=U[e]
D=D.concat(t)}const O=D.length,F=[]
for(let e=0,i=R.length,s=i-1,r=e+1;e<i;e++,s++,r++)s===i&&(s=0),r===i&&(r=0),F[e]=a(R[e],R[s],R[r])
const H=[]
let B,G,V=F.concat()
for(let e=0,i=I;e<i;e++){const t=U[e]
B=[]
for(let e=0,n=t.length,i=n-1,s=e+1;e<n;e++,i++,s++)i===n&&(i=0),s===n&&(s=0),B[e]=a(t[e],t[i],t[s])
H.push(B),V=V.concat(B)}if(0===x)G=cl.triangulateShape(R,U)
else{const t=[],e=[]
for(let n=0;n<x;n++){const i=n/x,s=M*Math.cos(i*Math.PI/2),r=w*Math.sin(i*Math.PI/2)+S
for(let e=0,n=R.length;e<n;e++){const n=o(R[e],F[e],r)
c(n.x,n.y,-s),0===i&&t.push(n)}for(let t=0,n=I;t<n;t++){const n=U[t]
B=H[t]
const a=[]
for(let t=0,e=n.length;t<e;t++){const e=o(n[t],B[t],r)
c(e.x,e.y,-s),0===i&&a.push(e)}0===i&&e.push(a)}}G=cl.triangulateShape(t,e)}const k=G.length,z=w+S
for(let e=0;e<O;e++){const t=_?o(D[e],V[e],z):D[e]
P?(C.copy(A.normals[0]).multiplyScalar(t.x),T.copy(A.binormals[0]).multiplyScalar(t.y),L.copy(b[0]).add(C).add(T),c(L.x,L.y,L.z)):c(t.x,t.y,0)}for(let e=1;e<=m;e++)for(let t=0;t<O;t++){const n=_?o(D[t],V[t],z):D[t]
P?(C.copy(A.normals[e]).multiplyScalar(n.x),T.copy(A.binormals[e]).multiplyScalar(n.y),L.copy(b[e]).add(C).add(T),c(L.x,L.y,L.z)):c(n.x,n.y,g/m*e)}for(let e=x-1;e>=0;e--){const t=e/x,n=M*Math.cos(t*Math.PI/2),i=w*Math.sin(t*Math.PI/2)+S
for(let e=0,s=R.length;e<s;e++){const t=o(R[e],F[e],i)
c(t.x,t.y,g+n)}for(let e=0,s=U.length;e<s;e++){const t=U[e]
B=H[e]
for(let e=0,s=t.length;e<s;e++){const s=o(t[e],B[e],i)
P?c(s.x,s.y+b[m-1].y,b[m-1].x+n):c(s.x,s.y,g+n)}}}!function(){const t=s.length/3
if(_){let t=0,e=O*t
for(let n=0;n<k;n++){const t=G[n]
l(t[2]+e,t[1]+e,t[0]+e)}t=m+2*x,e=O*t
for(let n=0;n<k;n++){const t=G[n]
l(t[0]+e,t[1]+e,t[2]+e)}}else{for(let t=0;t<k;t++){const e=G[t]
l(e[2],e[1],e[0])}for(let t=0;t<k;t++){const e=G[t]
l(e[0]+O*m,e[1]+O*m,e[2]+O*m)}}i.addGroup(t,s.length/3-t,0)}(),function(){const t=s.length/3
let e=0
h(R,e),e+=R.length
for(let n=0,i=U.length;n<i;n++){const t=U[n]
h(t,e),e+=t.length}i.addGroup(t,s.length/3-t,1)}()}super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t]
const i=this,s=[],r=[]
for(let o=0,a=t.length;o<a;o++)n(t[o])
this.setAttribute("position",new ca(s,3)),this.setAttribute("uv",new ca(r,2)),this.computeVertexNormals()}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON()
return function(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){const e=t[i]
n.shapes.push(e.uuid)}else n.shapes.push(t.uuid)
return n.options=Object.assign({},e),void 0!==e.extrudePath&&(n.options.extrudePath=e.extrudePath.toJSON()),n}(this.parameters.shapes,this.parameters.options,t)}static fromJSON(t,e){const n=[]
for(let s=0,r=t.shapes.length;s<r;s++){const i=e[t.shapes[s]]
n.push(i)}const i=t.options.extrudePath
return void 0!==i&&(t.options.extrudePath=(new sl[i.type]).fromJSON(i)),new ll(n,t.options)}}const ul={generateTopUV:function(t,e,n,i,s){const r=e[3*n],o=e[3*n+1],a=e[3*i],h=e[3*i+1],c=e[3*s],l=e[3*s+1]
return[new cr(r,o),new cr(a,h),new cr(c,l)]},generateSideWallUV:function(t,e,n,i,s,r){const o=e[3*n],a=e[3*n+1],h=e[3*n+2],c=e[3*i],l=e[3*i+1],u=e[3*i+2],f=e[3*s],d=e[3*s+1],p=e[3*s+2],v=e[3*r],m=e[3*r+1],g=e[3*r+2]
return Math.abs(a-l)<Math.abs(o-c)?[new cr(o,1-h),new cr(c,1-u),new cr(f,1-p),new cr(v,1-g)]:[new cr(a,1-h),new cr(l,1-u),new cr(d,1-p),new cr(m,1-g)]}}
class fl extends Oc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2
super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new fl(t.radius,t.detail)}}class dl extends ga{constructor(t=[new cr(0,-.5),new cr(.5,0),new cr(0,.5)],e=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=r(i,0,2*Math.PI)
const s=[],o=[],a=[],h=[],c=[],l=1/e,u=new ur,f=new cr,d=new ur,p=new ur,v=new ur
let m=0,g=0
for(let r=0;r<=t.length-1;r++)switch(r){case 0:m=t[r+1].x-t[r].x,g=t[r+1].y-t[r].y,d.x=1*g,d.y=-m,d.z=0*g,v.copy(d),d.normalize(),h.push(d.x,d.y,d.z)
break
case t.length-1:h.push(v.x,v.y,v.z)
break
default:m=t[r+1].x-t[r].x,g=t[r+1].y-t[r].y,d.x=1*g,d.y=-m,d.z=0*g,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),h.push(d.x,d.y,d.z),v.copy(p)}for(let r=0;r<=e;r++){const s=n+r*l*i,d=Math.sin(s),p=Math.cos(s)
for(let n=0;n<=t.length-1;n++){u.x=t[n].x*d,u.y=t[n].y,u.z=t[n].x*p,o.push(u.x,u.y,u.z),f.x=r/e,f.y=n/(t.length-1),a.push(f.x,f.y)
const i=h[3*n+0]*d,s=h[3*n+1],l=h[3*n+0]*p
c.push(i,s,l)}}for(let r=0;r<e;r++)for(let e=0;e<t.length-1;e++){const n=e+r*t.length,i=n,o=n+t.length,a=n+t.length+1,h=n+1
s.push(i,o,h),s.push(a,h,o)}this.setIndex(s),this.setAttribute("position",new ca(o,3)),this.setAttribute("uv",new ca(a,2)),this.setAttribute("normal",new ca(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.points,t.segments,t.phiStart,t.phiLength)}}class pl extends Oc{constructor(t=1,e=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new pl(t.radius,t.detail)}}class vl extends ga{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i}
const s=t/2,r=e/2,o=Math.floor(n),a=Math.floor(i),h=o+1,c=a+1,l=t/o,u=e/a,f=[],d=[],p=[],v=[]
for(let m=0;m<c;m++){const t=m*u-r
for(let e=0;e<h;e++){const n=e*l-s
d.push(n,-t,0),p.push(0,0,1),v.push(e/o),v.push(1-m/a)}}for(let m=0;m<a;m++)for(let t=0;t<o;t++){const e=t+h*m,n=t+h*(m+1),i=t+1+h*(m+1),s=t+1+h*m
f.push(e,n,s),f.push(n,i,s)}this.setIndex(f),this.setAttribute("position",new ca(d,3)),this.setAttribute("normal",new ca(p,3)),this.setAttribute("uv",new ca(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vl(t.width,t.height,t.widthSegments,t.heightSegments)}}class ml extends ga{constructor(t=.5,e=1,n=32,i=1,s=0,r=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n)
const o=[],a=[],h=[],c=[]
let l=t
const u=(e-t)/(i=Math.max(1,i)),f=new ur,d=new cr
for(let p=0;p<=i;p++){for(let t=0;t<=n;t++){const i=s+t/n*r
f.x=l*Math.cos(i),f.y=l*Math.sin(i),a.push(f.x,f.y,f.z),h.push(0,0,1),d.x=(f.x/e+1)/2,d.y=(f.y/e+1)/2,c.push(d.x,d.y)}l+=u}for(let p=0;p<i;p++){const t=p*(n+1)
for(let e=0;e<n;e++){const i=e+t,s=i,r=i+n+1,a=i+n+2,h=i+1
o.push(s,r,h),o.push(r,a,h)}}this.setIndex(o),this.setAttribute("position",new ca(a,3)),this.setAttribute("normal",new ca(h,3)),this.setAttribute("uv",new ca(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class gl extends ga{constructor(t=new al([new cr(0,.5),new cr(-.5,-.5),new cr(.5,-.5)]),e=12){function n(t){const n=s.length/3,a=t.extractPoints(e)
let c=a.shape
const l=a.holes
!1===cl.isClockWise(c)&&(c=c.reverse())
for(let e=0,i=l.length;e<i;e++){const t=l[e]
!0===cl.isClockWise(t)&&(l[e]=t.reverse())}const u=cl.triangulateShape(c,l)
for(let e=0,i=l.length;e<i;e++){const t=l[e]
c=c.concat(t)}for(let e=0,i=c.length;e<i;e++){const t=c[e]
s.push(t.x,t.y,0),r.push(0,0,1),o.push(t.x,t.y)}for(let e=0,s=u.length;e<s;e++){const t=u[e],s=t[0]+n,r=t[1]+n,o=t[2]+n
i.push(s,r,o),h+=3}}super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e}
const i=[],s=[],r=[],o=[]
let a=0,h=0
if(!1===Array.isArray(t))n(t)
else for(let c=0;c<t.length;c++)n(t[c]),this.addGroup(a,h,c),a+=h,h=0
this.setIndex(i),this.setAttribute("position",new ca(s,3)),this.setAttribute("normal",new ca(r,3)),this.setAttribute("uv",new ca(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON()
return function(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const i=t[n]
e.shapes.push(i.uuid)}else e.shapes.push(t.uuid)
return e}(this.parameters.shapes,t)}static fromJSON(t,e){const n=[]
for(let i=0,s=t.shapes.length;i<s;i++){const s=e[t.shapes[i]]
n.push(s)}return new gl(n,t.curveSegments)}}class _l extends ga{constructor(t=1,e=32,n=16,i=0,s=2*Math.PI,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n))
const a=Math.min(r+o,Math.PI)
let h=0
const c=[],l=new ur,u=new ur,f=[],d=[],p=[],v=[]
for(let m=0;m<=n;m++){const f=[],g=m/n
let _=0
0===m&&0===r?_=.5/e:m===n&&a===Math.PI&&(_=-.5/e)
for(let n=0;n<=e;n++){const a=n/e
l.x=-t*Math.cos(i+a*s)*Math.sin(r+g*o),l.y=t*Math.cos(r+g*o),l.z=t*Math.sin(i+a*s)*Math.sin(r+g*o),d.push(l.x,l.y,l.z),u.copy(l).normalize(),p.push(u.x,u.y,u.z),v.push(a+_,1-g),f.push(h++)}c.push(f)}for(let m=0;m<n;m++)for(let t=0;t<e;t++){const e=c[m][t+1],i=c[m][t],s=c[m+1][t],o=c[m+1][t+1];(0!==m||r>0)&&f.push(e,i,o),(m!==n-1||a<Math.PI)&&f.push(i,s,o)}this.setIndex(f),this.setAttribute("position",new ca(d,3)),this.setAttribute("normal",new ca(p,3)),this.setAttribute("uv",new ca(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _l(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ml extends Oc{constructor(t=1,e=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ml(t.radius,t.detail)}}class wl extends ga{constructor(t=1,e=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i)
const r=[],o=[],a=[],h=[],c=new ur,l=new ur,u=new ur
for(let f=0;f<=n;f++)for(let r=0;r<=i;r++){const d=r/i*s,p=f/n*Math.PI*2
l.x=(t+e*Math.cos(p))*Math.cos(d),l.y=(t+e*Math.cos(p))*Math.sin(d),l.z=e*Math.sin(p),o.push(l.x,l.y,l.z),c.x=t*Math.cos(d),c.y=t*Math.sin(d),u.subVectors(l,c).normalize(),a.push(u.x,u.y,u.z),h.push(r/i),h.push(f/n)}for(let f=1;f<=n;f++)for(let t=1;t<=i;t++){const e=(i+1)*f+t-1,n=(i+1)*(f-1)+t-1,s=(i+1)*(f-1)+t,o=(i+1)*f+t
r.push(e,n,o),r.push(n,s,o)}this.setIndex(r),this.setAttribute("position",new ca(o,3)),this.setAttribute("normal",new ca(a,3)),this.setAttribute("uv",new ca(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Sl extends ga{constructor(t=1,e=.4,n=64,i=8,s=2,r=3){function o(t,e,n,i,s){const r=Math.cos(t),o=Math.sin(t),a=n/e*t,h=Math.cos(a)
s.x=i*(2+h)*.5*r,s.y=i*(2+h)*o*.5,s.z=i*Math.sin(a)*.5}super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:r},n=Math.floor(n),i=Math.floor(i)
const a=[],h=[],c=[],l=[],u=new ur,f=new ur,d=new ur,p=new ur,v=new ur,m=new ur,g=new ur
for(let _=0;_<=n;++_){const a=_/n*s*Math.PI*2
o(a,s,r,t,d),o(a+.01,s,r,t,p),m.subVectors(p,d),g.addVectors(p,d),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize()
for(let t=0;t<=i;++t){const s=t/i*Math.PI*2,r=-e*Math.cos(s),o=e*Math.sin(s)
u.x=d.x+(r*g.x+o*v.x),u.y=d.y+(r*g.y+o*v.y),u.z=d.z+(r*g.z+o*v.z),h.push(u.x,u.y,u.z),f.subVectors(u,d).normalize(),c.push(f.x,f.y,f.z),l.push(_/n),l.push(t/i)}}for(let _=1;_<=n;_++)for(let t=1;t<=i;t++){const e=(i+1)*(_-1)+(t-1),n=(i+1)*_+(t-1),s=(i+1)*_+t,r=(i+1)*(_-1)+t
a.push(e,n,r),a.push(n,s,r)}this.setIndex(a),this.setAttribute("position",new ca(h,3)),this.setAttribute("normal",new ca(c,3)),this.setAttribute("uv",new ca(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sl(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class xl extends ga{constructor(t=new nl(new ur(-1,-1,0),new ur(-1,1,0),new ur(1,1,0)),e=64,n=1,i=8,s=!1){function r(s){l=t.getPointAt(s/e,l)
const r=o.normals[s],c=o.binormals[s]
for(let t=0;t<=i;t++){const e=t/i*Math.PI*2,s=Math.sin(e),o=-Math.cos(e)
h.x=o*r.x+s*c.x,h.y=o*r.y+s*c.y,h.z=o*r.z+s*c.z,h.normalize(),f.push(h.x,h.y,h.z),a.x=l.x+n*h.x,a.y=l.y+n*h.y,a.z=l.z+n*h.z,u.push(a.x,a.y,a.z)}}super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s}
const o=t.computeFrenetFrames(e,s)
this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals
const a=new ur,h=new ur,c=new cr
let l=new ur
const u=[],f=[],d=[],p=[]
!function(){for(let t=0;t<e;t++)r(t)
r(!1===s?e:0),function(){for(let t=0;t<=e;t++)for(let n=0;n<=i;n++)c.x=t/e,c.y=n/i,d.push(c.x,c.y)}(),function(){for(let t=1;t<=e;t++)for(let e=1;e<=i;e++){const n=(i+1)*(t-1)+(e-1),s=(i+1)*t+(e-1),r=(i+1)*t+e,o=(i+1)*(t-1)+e
p.push(n,s,o),p.push(s,r,o)}}()}(),this.setIndex(p),this.setAttribute("position",new ca(u,3)),this.setAttribute("normal",new ca(f,3)),this.setAttribute("uv",new ca(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON()
return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new xl((new sl[t.path.type]).fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class yl extends ga{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},null!==t){const e=[],n=new Set,i=new ur,s=new ur
if(null!==t.index){const r=t.attributes.position,o=t.index
let a=t.groups
0===a.length&&(a=[{start:0,count:o.count,materialIndex:0}])
for(let t=0,h=a.length;t<h;++t){const h=a[t],c=h.start
for(let t=c,a=c+h.count;t<a;t+=3)for(let h=0;h<3;h++){const a=o.getX(t+h),c=o.getX(t+(h+1)%3)
i.fromBufferAttribute(r,a),s.fromBufferAttribute(r,c),!0===ut(i,s,n)&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{const r=t.attributes.position
for(let t=0,o=r.count/3;t<o;t++)for(let a=0;a<3;a++){const o=3*t+a,h=3*t+(a+1)%3
i.fromBufferAttribute(r,o),s.fromBufferAttribute(r,h),!0===ut(i,s,n)&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new ca(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}var El=Object.freeze({__proto__:null,BoxGeometry:Pa,CapsuleGeometry:Dc,CircleGeometry:Uc,ConeGeometry:Rc,CylinderGeometry:Ic,DodecahedronGeometry:Fc,EdgesGeometry:kc,ExtrudeGeometry:ll,IcosahedronGeometry:fl,LatheGeometry:dl,OctahedronGeometry:pl,PlaneGeometry:vl,PolyhedronGeometry:Oc,RingGeometry:ml,ShapeGeometry:gl,SphereGeometry:_l,TetrahedronGeometry:Ml,TorusGeometry:wl,TorusKnotGeometry:Sl,TubeGeometry:xl,WireframeGeometry:yl})
class bl extends ta{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Zo(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Al extends Da{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Tl extends ta{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zo(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zo(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mo,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Cl extends Tl{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new cr(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return r(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Zo(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Zo(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Zo(1,1,1),this.specularColorMap=null,this.re=0,this.oe=0,this.ae=0,this.he=0,this.ce=0,this.le=0,this.setValues(t)}get anisotropy(){return this.re}set anisotropy(t){this.re>0!=t>0&&this.version++,this.re=t}get clearcoat(){return this.oe}set clearcoat(t){this.oe>0!=t>0&&this.version++,this.oe=t}get iridescence(){return this.he}set iridescence(t){this.he>0!=t>0&&this.version++,this.he=t}get dispersion(){return this.ae}set dispersion(t){this.ae>0!=t>0&&this.version++,this.ae=t}get sheen(){return this.ce}set sheen(t){this.ce>0!=t>0&&this.version++,this.ce=t}get transmission(){return this.le}set transmission(t){this.le>0!=t>0&&this.version++,this.le=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ll extends ta{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Zo(16777215),this.specular=new Zo(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zo(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mo,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pl extends ta{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Zo(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zo(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Nl extends ta{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class Dl extends ta{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Zo(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zo(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mo,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ul extends ta{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Il extends ta{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rl extends ta{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Zo(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new cr(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ol extends cc{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Fl{constructor(t,e,n,i){this.parameterPositions=t,this.ue=0,this.resultBuffer=void 0!==i?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions
let n=this.ue,i=e[n],s=e[n-1]
t:{e:{let r
n:{i:if(!(t<i)){for(let r=n+2;;){if(void 0===i){if(t<s)break i
return n=e.length,this.ue=n,this.copySampleValue_(n-1)}if(n===r)break
if(s=i,i=e[++n],t<i)break e}r=e.length
break n}if(!(t>=s)){const o=e[1]
t<o&&(n=2,s=o)
for(let r=n-2;;){if(void 0===s)return this.ue=0,this.copySampleValue_(0)
if(n===r)break
if(i=s,s=e[--n-1],t>=s)break e}r=n,n=0
break n}break t}for(;n<r;){const i=n+r>>>1
t<e[i]?r=i:n=i+1}if(i=e[n],s=e[n-1],void 0===s)return this.ue=0,this.copySampleValue_(0)
if(void 0===i)return n=e.length,this.ue=n,this.copySampleValue_(n-1)}this.ue=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i
for(let r=0;r!==i;++r)e[r]=n[s+r]
return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Hl extends Fl{constructor(t,e,n,i){super(t,e,n,i),this.fe=-0,this.de=-0,this.pe=-0,this.ve=-0,this.DefaultSettings_={endingStart:Rs,endingEnd:Rs}}intervalChanged_(t,e,n){const i=this.parameterPositions
let s=t-2,r=t+1,o=i[s],a=i[r]
if(void 0===o)switch(this.getSettings_().endingStart){case Os:s=t,o=2*e-n
break
case Fs:s=i.length-2,o=e+i[s]-i[s+1]
break
default:s=t,o=n}if(void 0===a)switch(this.getSettings_().endingEnd){case Os:r=t,a=2*n-e
break
case Fs:r=1,a=n+i[1]-i[0]
break
default:r=t-1,a=e}const h=.5*(n-e),c=this.valueSize
this.fe=h/(e-o),this.pe=h/(a-n),this.de=s*c,this.ve=r*c}interpolate_(t,e,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,h=a-o,c=this.de,l=this.ve,u=this.fe,f=this.pe,d=(n-e)/(i-e),p=d*d,v=p*d,m=-u*v+2*u*p-u*d,g=(1+u)*v+(-1.5-2*u)*p+(-.5+u)*d+1,_=(-1-f)*v+(1.5+f)*p+.5*d,M=f*v-f*p
for(let w=0;w!==o;++w)s[w]=m*r[c+w]+g*r[h+w]+_*r[a+w]+M*r[l+w]
return s}}class Bl extends Fl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,h=a-o,c=(n-e)/(i-e),l=1-c
for(let u=0;u!==o;++u)s[u]=r[h+u]*l+r[a+u]*c
return s}}class Gl extends Fl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Vl{constructor(t,e,n,i){if(void 0===t)throw new Error("THREE.KeyframeTrack: track name is undefined")
if(void 0===e||0===e.length)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t)
this.name=t,this.times=ft(e,this.TimeBufferType),this.values=ft(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor
let n
if(e.toJSON!==this.toJSON)n=e.toJSON(t)
else{n={name:t.name,times:ft(t.times,Array),values:ft(t.values,Array)}
const e=t.getInterpolation()
e!==t.DefaultInterpolation&&(n.interpolation=e)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Gl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Hl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e
switch(t){case Ds:e=this.InterpolantFactoryMethodDiscrete
break
case Us:e=this.InterpolantFactoryMethodLinear
break
case Is:e=this.InterpolantFactoryMethodSmooth}if(void 0===e){const e="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name
if(void 0===this.createInterpolant){if(t===this.DefaultInterpolation)throw new Error(e)
this.setInterpolation(this.DefaultInterpolation)}return void 0,this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ds
case this.InterpolantFactoryMethodLinear:return Us
case this.InterpolantFactoryMethodSmooth:return Is}}getValueSize(){return this.values.length/this.times.length}shift(t){if(0!==t){const e=this.times
for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(1!==t){const e=this.times
for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length
let s=0,r=i-1
for(;s!==i&&n[s]<t;)++s
for(;-1!==r&&n[r]>e;)--r
if(++r,0!==s||r!==i){s>=r&&(r=Math.max(r,1),s=r-1)
const t=this.getValueSize()
this.times=n.slice(s,r),this.values=this.values.slice(s*t,r*t)}return this}validate(){let t=!0
const e=this.getValueSize()
e-Math.floor(e)!==0&&(void 0,t=!1)
const n=this.times,i=this.values,s=n.length
void 0,0===s&&(t=!1)
let r=null
for(let o=0;o!==s;o++){const e=n[o]
if("number"==typeof e&&isNaN(e)){void 0,t=!1
break}if(null!==r&&r>e){void 0,t=!1
break}r=e}if(void 0!==i&&dt(i))for(let o=0,a=i.length;o!==a;++o){const e=i[o]
if(isNaN(e)){void 0,t=!1
break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Is,s=t.length-1
let r=1
for(let o=1;o<s;++o){let s=!1
const a=t[o]
if(a!==t[o+1]&&(1!==o||a!==t[0]))if(i)s=!0
else{const t=o*n,i=t-n,r=t+n
for(let o=0;o!==n;++o){const n=e[t+o]
if(n!==e[i+o]||n!==e[r+o]){s=!0
break}}}if(s){if(o!==r){t[r]=t[o]
const i=o*n,s=r*n
for(let t=0;t!==n;++t)e[s+t]=e[i+t]}++r}}if(s>0){t[r]=t[s]
for(let t=s*n,i=r*n,o=0;o!==n;++o)e[i+o]=e[t+o];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=e.slice(0,r*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=new(0,this.constructor)(this.name,t,e)
return n.createInterpolant=this.createInterpolant,n}}Vl.prototype.ValueTypeName="",Vl.prototype.TimeBufferType=Float32Array,Vl.prototype.ValueBufferType=Float32Array,Vl.prototype.DefaultInterpolation=Us
class kl extends Vl{constructor(t,e,n){super(t,e,n)}}kl.prototype.ValueTypeName="bool",kl.prototype.ValueBufferType=Array,kl.prototype.DefaultInterpolation=Ds,kl.prototype.InterpolantFactoryMethodLinear=void 0,kl.prototype.InterpolantFactoryMethodSmooth=void 0
class zl extends Vl{constructor(t,e,n,i){super(t,e,n,i)}}zl.prototype.ValueTypeName="color"
class Wl extends Vl{constructor(t,e,n,i){super(t,e,n,i)}}Wl.prototype.ValueTypeName="number"
class jl extends Fl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-e)/(i-e)
let h=t*o
for(let c=h+o;h!==c;h+=4)lr.slerpFlat(s,0,r,h-o,r,h,a)
return s}}class Xl extends Vl{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new jl(this.times,this.values,this.getValueSize(),t)}}Xl.prototype.ValueTypeName="quaternion",Xl.prototype.InterpolantFactoryMethodSmooth=void 0
class ql extends Vl{constructor(t,e,n){super(t,e,n)}}ql.prototype.ValueTypeName="string",ql.prototype.ValueBufferType=Array,ql.prototype.DefaultInterpolation=Ds,ql.prototype.InterpolantFactoryMethodLinear=void 0,ql.prototype.InterpolantFactoryMethodSmooth=void 0
class Yl extends Vl{constructor(t,e,n,i){super(t,e,n,i)}}Yl.prototype.ValueTypeName="vector"
class $l{constructor(t="",e=-1,n=[],i=2500){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=s(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1)
for(let r=0,o=n.length;r!==o;++r)e.push(gt(n[r]).scale(i))
const s=new this(t.name,t.duration,e,t.blendMode)
return s.uuid=t.uuid,s.userData=JSON.parse(t.userData||"{}"),s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)}
for(let s=0,r=n.length;s!==r;++s)e.push(Vl.toJSON(n[s]))
return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,r=[]
for(let o=0;o<s;o++){let t=[],a=[]
t.push((o+s-1)%s,o,(o+1)%s),a.push(0,1,0)
const h=pt(t)
t=vt(t,1,h),a=vt(a,1,h),i||0!==t[0]||(t.push(s),a.push(a[0])),r.push(new Wl(".morphTargetInfluences["+e[o].name+"]",t,a).scale(1/n))}return new this(t,-1,r)}static findByName(t,e){let n=t
if(!Array.isArray(t)){const e=t
n=e.geometry&&e.geometry.animations||e.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i]
return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/
for(let o=0,a=t.length;o<a;o++){const e=t[o],n=e.name.match(s)
if(n&&n.length>1){const t=n[1]
let s=i[t]
s||(i[t]=s=[]),s.push(e)}}const r=[]
for(const o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],e,n))
return r}static parseAnimation(t,e){if(void 0,!t)return void 0,null
const n=function(t,e,n,i,s){if(0!==n.length){const r=[],o=[]
mt(n,r,o,i),0!==r.length&&s.push(new t(e,r,o))}},i=[],s=t.name||"default",r=t.fps||30,o=t.blendMode
let a=t.length||-1
const h=t.hierarchy||[]
for(let c=0;c<h.length;c++){const t=h[c].keys
if(t&&0!==t.length)if(t[0].morphTargets){const e={}
let n
for(n=0;n<t.length;n++)if(t[n].morphTargets)for(let i=0;i<t[n].morphTargets.length;i++)e[t[n].morphTargets[i]]=-1
for(const s in e){const e=[],r=[]
for(let i=0;i!==t[n].morphTargets.length;++i){const i=t[n]
e.push(i.time),r.push(i.morphTarget===s?1:0)}i.push(new Wl(".morphTargetInfluence["+s+"]",e,r))}a=e.length*r}else{const s=".bones["+e[c].name+"]"
n(Yl,s+".position",t,"pos",i),n(Xl,s+".quaternion",t,"rot",i),n(Yl,s+".scale",t,"scl",i)}}return 0===i.length?null:new this(s,a,i,o)}resetDuration(){let t=0
for(let e=0,n=this.tracks.length;e!==n;++e){const n=this.tracks[e]
t=Math.max(t,n.times[n.times.length-1])}return this.duration=t,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration)
return this}validate(){let t=!0
for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate()
return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize()
return this}clone(){const t=[]
for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone())
const e=new this.constructor(this.name,this.duration,t,this.blendMode)
return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}const Jl={enabled:!1,files:{},add:function(t,e){!1!==this.enabled&&(this.files[t]=e)},get:function(t){if(!1!==this.enabled)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}}
class Zl{constructor(t,e,n){const i=this
let s,r=!1,o=0,a=0
const h=[]
this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(t){a++,!1===r&&void 0!==i.onStart&&i.onStart(t,o,a),r=!0},this.itemEnd=function(t){o++,void 0!==i.onProgress&&i.onProgress(t,o,a),o===a&&(r=!1,void 0!==i.onLoad&&i.onLoad())},this.itemError=function(t){void 0!==i.onError&&i.onError(t)},this.resolveURL=function(t){return s?s(t):t},this.setURLModifier=function(t){return s=t,this},this.addHandler=function(t,e){return h.push(t,e),this},this.removeHandler=function(t){const e=h.indexOf(t)
return-1!==e&&h.splice(e,2),this},this.getHandler=function(t){for(let e=0,n=h.length;e<n;e+=2){const n=h[e],i=h[e+1]
if(n.global&&(n.lastIndex=0),n.test(t))return i}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Kl=new Zl
class Ql{constructor(t){this.manager=void 0!==t?t:Kl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this
return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Ql.DEFAULT_MATERIAL_NAME="__DEFAULT"
const tu={}
class eu extends Error{constructor(t,e){super(t),this.response=e}}class nu extends Ql{constructor(t){super(t),this.mimeType="",this.responseType="",this.me=new AbortController}load(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t)
const s=Jl.get(`file:${t}`)
if(void 0!==s)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s
if(void 0!==tu[t])return tu[t].push({onLoad:e,onProgress:n,onError:i}),void 0
tu[t]=[],tu[t].push({onLoad:e,onProgress:n,onError:i})
const r=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:"function"==typeof AbortSignal.any?AbortSignal.any([this.me.signal,this.manager.abortController.signal]):this.me.signal}),o=this.mimeType,a=this.responseType
fetch(r).then(e=>{if(200===e.status||0===e.status){if(0===e.status,0,"undefined"==typeof ReadableStream||void 0===e.body||void 0===e.body.getReader)return e
const n=tu[t],i=e.body.getReader(),s=e.headers.get("X-File-Size")||e.headers.get("Content-Length"),r=s?parseInt(s):0,o=0!==r
let a=0
const h=new ReadableStream({start(t){!function e(){i.read().then(({done:i,value:s})=>{if(i)t.close()
else{a+=s.byteLength
const i=new ProgressEvent("progress",{lengthComputable:o,loaded:a,total:r})
for(let t=0,e=n.length;t<e;t++){const e=n[t]
e.onProgress&&e.onProgress(i)}t.enqueue(s),e()}},e=>{t.error(e)})}()}})
return new Response(h)}throw new eu(`fetch for "${e.url}" responded with ${e.status}: ${e.statusText}`,e)}).then(t=>{switch(a){case"arraybuffer":return t.arrayBuffer()
case"blob":return t.blob()
case"document":return t.text().then(t=>(new DOMParser).parseFromString(t,o))
case"json":return t.json()
default:if(""===o)return t.text()
{const e=/charset="?([^;"\s]*)"?/i.exec(o),n=e&&e[1]?e[1].toLowerCase():void 0,i=new TextDecoder(n)
return t.arrayBuffer().then(t=>i.decode(t))}}}).then(e=>{Jl.add(`file:${t}`,e)
const n=tu[t]
delete tu[t]
for(let t=0,i=n.length;t<i;t++){const i=n[t]
i.onLoad&&i.onLoad(e)}}).catch(e=>{const n=tu[t]
if(void 0===n)throw this.manager.itemError(t),e
delete tu[t]
for(let t=0,i=n.length;t<i;t++){const i=n[t]
i.onError&&i.onError(e)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this.me.abort(),this.me=new AbortController,this}}const iu=new WeakMap
class su extends Ql{constructor(t){super(t)}load(t,e,n,i){function s(){o(),e&&e(this)
const n=iu.get(this)||[]
for(let t=0;t<n.length;t++){const e=n[t]
e.onLoad&&e.onLoad(this)}iu.delete(this),a.manager.itemEnd(t)}function r(e){o(),i&&i(e),Jl.remove(`image:${t}`)
const n=iu.get(this)||[]
for(let t=0;t<n.length;t++){const i=n[t]
i.onError&&i.onError(e)}iu.delete(this),a.manager.itemError(t),a.manager.itemEnd(t)}function o(){c.removeEventListener("load",s,!1),c.removeEventListener("error",r,!1)}void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t)
const a=this,h=Jl.get(`image:${t}`)
if(void 0!==h){if(!0===h.complete)a.manager.itemStart(t),setTimeout(function(){e&&e(h),a.manager.itemEnd(t)},0)
else{let t=iu.get(h)
void 0===t&&(t=[],iu.set(h,t)),t.push({onLoad:e,onError:i})}return h}const c=f("img")
return c.addEventListener("load",s,!1),c.addEventListener("error",r,!1),"data:"!==t.slice(0,5)&&void 0!==this.crossOrigin&&(c.crossOrigin=this.crossOrigin),Jl.add(`image:${t}`,c),a.manager.itemStart(t),c.src=t,c}}class ru extends Uo{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zo(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t)
return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,void 0!==this.groundColor&&(e.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(e.object.distance=this.distance),void 0!==this.angle&&(e.object.angle=this.angle),void 0!==this.decay&&(e.object.decay=this.decay),void 0!==this.penumbra&&(e.object.penumbra=this.penumbra),void 0!==this.shadow&&(e.object.shadow=this.shadow.toJSON()),void 0!==this.target&&(e.object.target=this.target.uuid),e}}class ou extends ru{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Uo.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zo(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const au=new ro,hu=new ur,cu=new ur
class lu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new cr(512,512),this.mapType=Ni,this.map=null,this.mapPass=null,this.matrix=new ro,this.autoUpdate=!0,this.needsUpdate=!1,this.ge=new Xh,this._e=new cr(1,1),this.Me=1,this.we=[new Cr(0,0,1,1)]}getViewportCount(){return this.Me}getFrustum(){return this.ge}updateMatrices(t){const e=this.camera,n=this.matrix
hu.setFromMatrixPosition(t.matrixWorld),e.position.copy(hu),cu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cu),e.updateMatrixWorld(),au.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.ge.setFromProjectionMatrix(au,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(au)}getViewport(t){return this.we[t]}getFrameExtents(){return this._e}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return(new this.constructor).copy(this)}toJSON(){const t={}
return 1!==this.intensity&&(t.intensity=this.intensity),0!==this.bias&&(t.bias=this.bias),0!==this.normalBias&&(t.normalBias=this.normalBias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class uu extends lu{constructor(){super(new Fa(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=2*ar*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far
n===e.fov&&i===e.aspect&&s===e.far||(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class fu extends ru{constructor(t,e,n=0,i=Math.PI/3,s=0,r=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Uo.DEFAULT_UP),this.updateMatrix(),this.target=new Uo,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new uu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const du=new ro,pu=new ur,vu=new ur
class mu extends lu{constructor(){super(new Fa(90,1,.5,500)),this.isPointLightShadow=!0,this._e=new cr(4,2),this.Me=6,this.we=[new Cr(2,1,1,1),new Cr(0,1,1,1),new Cr(3,1,1,1),new Cr(1,1,1,1),new Cr(3,0,1,1),new Cr(1,0,1,1)],this.Se=[new ur(1,0,0),new ur(-1,0,0),new ur(0,0,1),new ur(0,0,-1),new ur(0,1,0),new ur(0,-1,0)],this.xe=[new ur(0,1,0),new ur(0,1,0),new ur(0,1,0),new ur(0,1,0),new ur(0,0,1),new ur(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far
s!==n.far&&(n.far=s,n.updateProjectionMatrix()),pu.setFromMatrixPosition(t.matrixWorld),n.position.copy(pu),vu.copy(n.position),vu.add(this.Se[e]),n.up.copy(this.xe[e]),n.lookAt(vu),n.updateMatrixWorld(),i.makeTranslation(-pu.x,-pu.y,-pu.z),du.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.ge.setFromProjectionMatrix(du,n.coordinateSystem,n.reversedDepth)}}class gu extends ru{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new mu}get power(){return 4*this.intensity*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class _u extends Ua{constructor(t=-1,e=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=null===t.view?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2
let s=n-t,r=n+t,o=i+e,a=i-e
if(null!==this.view&&this.view.enabled){const t=(this.right-this.left)/this.view.fullWidth/this.zoom,e=(this.top-this.bottom)/this.view.fullHeight/this.zoom
s+=t*this.view.offsetX,r=s+t*this.view.width,o-=e*this.view.offsetY,a=o-e*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t)
return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,null!==this.view&&(e.object.view=Object.assign({},this.view)),e}}class Mu extends lu{constructor(){super(new _u(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wu extends ru{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Uo.DEFAULT_UP),this.updateMatrix(),this.target=new Uo,this.shadow=new Mu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Su extends ru{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class xu extends ru{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t)
return e.object.width=this.width,e.object.height=this.height,e}}class yu{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[]
for(let t=0;t<9;t++)this.coefficients.push(new ur)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e])
return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0)
return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,r=this.coefficients
return e.copy(r[0]).multiplyScalar(.282095),e.addScaledVector(r[1],.488603*i),e.addScaledVector(r[2],.488603*s),e.addScaledVector(r[3],.488603*n),e.addScaledVector(r[4],n*i*1.092548),e.addScaledVector(r[5],i*s*1.092548),e.addScaledVector(r[6],.315392*(3*s*s-1)),e.addScaledVector(r[7],n*s*1.092548),e.addScaledVector(r[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,r=this.coefficients
return e.copy(r[0]).multiplyScalar(.886227),e.addScaledVector(r[1],1.023328*i),e.addScaledVector(r[2],1.023328*s),e.addScaledVector(r[3],1.023328*n),e.addScaledVector(r[4],.858086*n*i),e.addScaledVector(r[5],.858086*i*s),e.addScaledVector(r[6],.743125*s*s-.247708),e.addScaledVector(r[7],.858086*n*s),e.addScaledVector(r[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e])
return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e)
return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t)
return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e)
return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1
return!0}copy(t){return this.set(t.coefficients)}clone(){return(new this.constructor).copy(this)}fromArray(t,e=0){const n=this.coefficients
for(let i=0;i<9;i++)n[i].fromArray(t,e+3*i)
return this}toArray(t=[],e=0){const n=this.coefficients
for(let i=0;i<9;i++)n[i].toArray(t,e+3*i)
return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z
e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}class Eu extends ru{constructor(t=new yu,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t)
return e.object.sh=this.sh.toArray(),e}}class bu extends Ql{constructor(t){super(t),this.textures={}}load(t,e,n,i){const s=this,r=new nu(s.manager)
r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(t,function(n){try{e(s.parse(JSON.parse(n)))}catch(r){i?i(r):void 0,s.manager.itemError(t)}},n,i)}parse(t){function e(t){return void 0===n[t],0,n[t]}const n=this.textures,i=this.createMaterialFromType(t.type)
if(void 0!==t.uuid&&(i.uuid=t.uuid),void 0!==t.name&&(i.name=t.name),void 0!==t.color&&void 0!==i.color&&i.color.setHex(t.color),void 0!==t.roughness&&(i.roughness=t.roughness),void 0!==t.metalness&&(i.metalness=t.metalness),void 0!==t.sheen&&(i.sheen=t.sheen),void 0!==t.sheenColor&&(i.sheenColor=(new Zo).setHex(t.sheenColor)),void 0!==t.sheenRoughness&&(i.sheenRoughness=t.sheenRoughness),void 0!==t.emissive&&void 0!==i.emissive&&i.emissive.setHex(t.emissive),void 0!==t.specular&&void 0!==i.specular&&i.specular.setHex(t.specular),void 0!==t.specularIntensity&&(i.specularIntensity=t.specularIntensity),void 0!==t.specularColor&&void 0!==i.specularColor&&i.specularColor.setHex(t.specularColor),void 0!==t.shininess&&(i.shininess=t.shininess),void 0!==t.clearcoat&&(i.clearcoat=t.clearcoat),void 0!==t.clearcoatRoughness&&(i.clearcoatRoughness=t.clearcoatRoughness),void 0!==t.dispersion&&(i.dispersion=t.dispersion),void 0!==t.iridescence&&(i.iridescence=t.iridescence),void 0!==t.iridescenceIOR&&(i.iridescenceIOR=t.iridescenceIOR),void 0!==t.iridescenceThicknessRange&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),void 0!==t.transmission&&(i.transmission=t.transmission),void 0!==t.thickness&&(i.thickness=t.thickness),void 0!==t.attenuationDistance&&(i.attenuationDistance=t.attenuationDistance),void 0!==t.attenuationColor&&void 0!==i.attenuationColor&&i.attenuationColor.setHex(t.attenuationColor),void 0!==t.anisotropy&&(i.anisotropy=t.anisotropy),void 0!==t.anisotropyRotation&&(i.anisotropyRotation=t.anisotropyRotation),void 0!==t.fog&&(i.fog=t.fog),void 0!==t.flatShading&&(i.flatShading=t.flatShading),void 0!==t.blending&&(i.blending=t.blending),void 0!==t.combine&&(i.combine=t.combine),void 0!==t.side&&(i.side=t.side),void 0!==t.shadowSide&&(i.shadowSide=t.shadowSide),void 0!==t.opacity&&(i.opacity=t.opacity),void 0!==t.transparent&&(i.transparent=t.transparent),void 0!==t.alphaTest&&(i.alphaTest=t.alphaTest),void 0!==t.alphaHash&&(i.alphaHash=t.alphaHash),void 0!==t.depthFunc&&(i.depthFunc=t.depthFunc),void 0!==t.depthTest&&(i.depthTest=t.depthTest),void 0!==t.depthWrite&&(i.depthWrite=t.depthWrite),void 0!==t.colorWrite&&(i.colorWrite=t.colorWrite),void 0!==t.blendSrc&&(i.blendSrc=t.blendSrc),void 0!==t.blendDst&&(i.blendDst=t.blendDst),void 0!==t.blendEquation&&(i.blendEquation=t.blendEquation),void 0!==t.blendSrcAlpha&&(i.blendSrcAlpha=t.blendSrcAlpha),void 0!==t.blendDstAlpha&&(i.blendDstAlpha=t.blendDstAlpha),void 0!==t.blendEquationAlpha&&(i.blendEquationAlpha=t.blendEquationAlpha),void 0!==t.blendColor&&void 0!==i.blendColor&&i.blendColor.setHex(t.blendColor),void 0!==t.blendAlpha&&(i.blendAlpha=t.blendAlpha),void 0!==t.stencilWriteMask&&(i.stencilWriteMask=t.stencilWriteMask),void 0!==t.stencilFunc&&(i.stencilFunc=t.stencilFunc),void 0!==t.stencilRef&&(i.stencilRef=t.stencilRef),void 0!==t.stencilFuncMask&&(i.stencilFuncMask=t.stencilFuncMask),void 0!==t.stencilFail&&(i.stencilFail=t.stencilFail),void 0!==t.stencilZFail&&(i.stencilZFail=t.stencilZFail),void 0!==t.stencilZPass&&(i.stencilZPass=t.stencilZPass),void 0!==t.stencilWrite&&(i.stencilWrite=t.stencilWrite),void 0!==t.wireframe&&(i.wireframe=t.wireframe),void 0!==t.wireframeLinewidth&&(i.wireframeLinewidth=t.wireframeLinewidth),void 0!==t.wireframeLinecap&&(i.wireframeLinecap=t.wireframeLinecap),void 0!==t.wireframeLinejoin&&(i.wireframeLinejoin=t.wireframeLinejoin),void 0!==t.rotation&&(i.rotation=t.rotation),void 0!==t.linewidth&&(i.linewidth=t.linewidth),void 0!==t.dashSize&&(i.dashSize=t.dashSize),void 0!==t.gapSize&&(i.gapSize=t.gapSize),void 0!==t.scale&&(i.scale=t.scale),void 0!==t.polygonOffset&&(i.polygonOffset=t.polygonOffset),void 0!==t.polygonOffsetFactor&&(i.polygonOffsetFactor=t.polygonOffsetFactor),void 0!==t.polygonOffsetUnits&&(i.polygonOffsetUnits=t.polygonOffsetUnits),void 0!==t.dithering&&(i.dithering=t.dithering),void 0!==t.alphaToCoverage&&(i.alphaToCoverage=t.alphaToCoverage),void 0!==t.premultipliedAlpha&&(i.premultipliedAlpha=t.premultipliedAlpha),void 0!==t.forceSinglePass&&(i.forceSinglePass=t.forceSinglePass),void 0!==t.visible&&(i.visible=t.visible),void 0!==t.toneMapped&&(i.toneMapped=t.toneMapped),void 0!==t.userData&&(i.userData=t.userData),void 0!==t.vertexColors&&("number"==typeof t.vertexColors?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),void 0!==t.uniforms)for(const s in t.uniforms){const n=t.uniforms[s]
switch(i.uniforms[s]={},n.type){case"t":i.uniforms[s].value=e(n.value)
break
case"c":i.uniforms[s].value=(new Zo).setHex(n.value)
break
case"v2":i.uniforms[s].value=(new cr).fromArray(n.value)
break
case"v3":i.uniforms[s].value=(new ur).fromArray(n.value)
break
case"v4":i.uniforms[s].value=(new Cr).fromArray(n.value)
break
case"m3":i.uniforms[s].value=(new pr).fromArray(n.value)
break
case"m4":i.uniforms[s].value=(new ro).fromArray(n.value)
break
default:i.uniforms[s].value=n.value}}if(void 0!==t.defines&&(i.defines=t.defines),void 0!==t.vertexShader&&(i.vertexShader=t.vertexShader),void 0!==t.fragmentShader&&(i.fragmentShader=t.fragmentShader),void 0!==t.glslVersion&&(i.glslVersion=t.glslVersion),void 0!==t.extensions)for(const s in t.extensions)i.extensions[s]=t.extensions[s]
if(void 0!==t.lights&&(i.lights=t.lights),void 0!==t.clipping&&(i.clipping=t.clipping),void 0!==t.size&&(i.size=t.size),void 0!==t.sizeAttenuation&&(i.sizeAttenuation=t.sizeAttenuation),void 0!==t.map&&(i.map=e(t.map)),void 0!==t.matcap&&(i.matcap=e(t.matcap)),void 0!==t.alphaMap&&(i.alphaMap=e(t.alphaMap)),void 0!==t.bumpMap&&(i.bumpMap=e(t.bumpMap)),void 0!==t.bumpScale&&(i.bumpScale=t.bumpScale),void 0!==t.normalMap&&(i.normalMap=e(t.normalMap)),void 0!==t.normalMapType&&(i.normalMapType=t.normalMapType),void 0!==t.normalScale){let e=t.normalScale
!1===Array.isArray(e)&&(e=[e,e]),i.normalScale=(new cr).fromArray(e)}return void 0!==t.displacementMap&&(i.displacementMap=e(t.displacementMap)),void 0!==t.displacementScale&&(i.displacementScale=t.displacementScale),void 0!==t.displacementBias&&(i.displacementBias=t.displacementBias),void 0!==t.roughnessMap&&(i.roughnessMap=e(t.roughnessMap)),void 0!==t.metalnessMap&&(i.metalnessMap=e(t.metalnessMap)),void 0!==t.emissiveMap&&(i.emissiveMap=e(t.emissiveMap)),void 0!==t.emissiveIntensity&&(i.emissiveIntensity=t.emissiveIntensity),void 0!==t.specularMap&&(i.specularMap=e(t.specularMap)),void 0!==t.specularIntensityMap&&(i.specularIntensityMap=e(t.specularIntensityMap)),void 0!==t.specularColorMap&&(i.specularColorMap=e(t.specularColorMap)),void 0!==t.envMap&&(i.envMap=e(t.envMap)),void 0!==t.envMapRotation&&i.envMapRotation.fromArray(t.envMapRotation),void 0!==t.envMapIntensity&&(i.envMapIntensity=t.envMapIntensity),void 0!==t.reflectivity&&(i.reflectivity=t.reflectivity),void 0!==t.refractionRatio&&(i.refractionRatio=t.refractionRatio),void 0!==t.lightMap&&(i.lightMap=e(t.lightMap)),void 0!==t.lightMapIntensity&&(i.lightMapIntensity=t.lightMapIntensity),void 0!==t.aoMap&&(i.aoMap=e(t.aoMap)),void 0!==t.aoMapIntensity&&(i.aoMapIntensity=t.aoMapIntensity),void 0!==t.gradientMap&&(i.gradientMap=e(t.gradientMap)),void 0!==t.clearcoatMap&&(i.clearcoatMap=e(t.clearcoatMap)),void 0!==t.clearcoatRoughnessMap&&(i.clearcoatRoughnessMap=e(t.clearcoatRoughnessMap)),void 0!==t.clearcoatNormalMap&&(i.clearcoatNormalMap=e(t.clearcoatNormalMap)),void 0!==t.clearcoatNormalScale&&(i.clearcoatNormalScale=(new cr).fromArray(t.clearcoatNormalScale)),void 0!==t.iridescenceMap&&(i.iridescenceMap=e(t.iridescenceMap)),void 0!==t.iridescenceThicknessMap&&(i.iridescenceThicknessMap=e(t.iridescenceThicknessMap)),void 0!==t.transmissionMap&&(i.transmissionMap=e(t.transmissionMap)),void 0!==t.thicknessMap&&(i.thicknessMap=e(t.thicknessMap)),void 0!==t.anisotropyMap&&(i.anisotropyMap=e(t.anisotropyMap)),void 0!==t.sheenColorMap&&(i.sheenColorMap=e(t.sheenColorMap)),void 0!==t.sheenRoughnessMap&&(i.sheenRoughnessMap=e(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return bu.createMaterialFromType(t)}static createMaterialFromType(t){return new{ShadowMaterial:bl,SpriteMaterial:Za,RawShaderMaterial:Al,ShaderMaterial:Da,PointsMaterial:xc,MeshPhysicalMaterial:Cl,MeshStandardMaterial:Tl,MeshPhongMaterial:Ll,MeshToonMaterial:Pl,MeshNormalMaterial:Nl,MeshLambertMaterial:Dl,MeshDepthMaterial:Ul,MeshDistanceMaterial:Il,MeshBasicMaterial:ea,MeshMatcapMaterial:Rl,LineDashedMaterial:Ol,LineBasicMaterial:cc,Material:ta}[t]}}class Au{static extractUrlBase(t){const e=t.lastIndexOf("/")
return-1===e?"./":t.slice(0,e+1)}static resolveURL(t,e){return"string"!=typeof t||""===t?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Tu extends ga{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON()
return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Cu extends Ql{constructor(t){super(t)}load(t,e,n,i){const s=this,r=new nu(s.manager)
r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(t,function(n){try{e(s.parse(JSON.parse(n)))}catch(r){i?i(r):void 0,s.manager.itemError(t)}},n,i)}parse(t){function e(t,e){if(void 0!==n[e])return n[e]
const s=t.interleavedBuffers[e],r=function(t,e){if(void 0!==i[e])return i[e]
const n=t.arrayBuffers[e],s=new Uint32Array(n).buffer
return i[e]=s,s}(t,s.buffer),o=u(s.type,r),a=new Ya(o,s.stride)
return a.uuid=s.uuid,n[e]=a,a}const n={},i={},s=t.isInstancedBufferGeometry?new Tu:new ga,r=t.data.index
if(void 0!==r){const t=u(r.type,r.array)
s.setIndex(new oa(t,1))}const o=t.data.attributes
for(const l in o){const n=o[l]
let i
if(n.isInterleavedBufferAttribute){const s=e(t.data,n.data)
i=new Ja(s,n.itemSize,n.offset,n.normalized)}else{const t=u(n.type,n.array)
i=new(n.isInstancedBufferAttribute?Ph:oa)(t,n.itemSize,n.normalized)}void 0!==n.name&&(i.name=n.name),void 0!==n.usage&&i.setUsage(n.usage),s.setAttribute(l,i)}const a=t.data.morphAttributes
if(a)for(const l in a){const n=a[l],i=[]
for(let s=0,r=n.length;s<r;s++){const r=n[s]
let o
if(r.isInterleavedBufferAttribute){const n=e(t.data,r.data)
o=new Ja(n,r.itemSize,r.offset,r.normalized)}else{const t=u(r.type,r.array)
o=new oa(t,r.itemSize,r.normalized)}void 0!==r.name&&(o.name=r.name),i.push(o)}s.morphAttributes[l]=i}t.data.morphTargetsRelative&&(s.morphTargetsRelative=!0)
const h=t.data.groups||t.data.drawcalls||t.data.offsets
if(void 0!==h)for(let l=0,u=h.length;l!==u;++l){const t=h[l]
s.addGroup(t.start,t.count,t.materialIndex)}const c=t.data.boundingSphere
return void 0!==c&&(s.boundingSphere=(new Jr).fromJSON(c)),t.name&&(s.name=t.name),t.userData&&(s.userData=t.userData),s}}const Lu={UVMapping:mi,CubeReflectionMapping:gi,CubeRefractionMapping:_i,EquirectangularReflectionMapping:Mi,EquirectangularRefractionMapping:wi,CubeUVReflectionMapping:Si},Pu={RepeatWrapping:xi,ClampToEdgeWrapping:yi,MirroredRepeatWrapping:Ei},Nu={NearestFilter:bi,NearestMipmapNearestFilter:Ai,NearestMipmapLinearFilter:Ti,LinearFilter:Ci,LinearMipmapNearestFilter:Li,LinearMipmapLinearFilter:Pi},Du=new WeakMap
let Uu
class Iu{static getContext(){return void 0===Uu&&(Uu=new(window.AudioContext||window.webkitAudioContext)),Uu}static setContext(t){Uu=t}}const Ru=new ro,Ou=new ro,Fu=new ro
class Hu extends Fa{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Bu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0
if(this.autoStart&&!this.running)return this.start(),0
if(this.running){const e=performance.now()
t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Gu=new ur,Vu=new lr,ku=new ur,zu=new ur,Wu=new ur
class ju extends Uo{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this.ye=0,this.Ee=0,this.be=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(!0===this.isPlaying)return void 0,void 0
if(!1===this.hasPlaybackControl)return void 0,void 0
this.ye=this.context.currentTime+t
const e=this.context.createBufferSource()
return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this.ye,this.Ee+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){return!1===this.hasPlaybackControl?(void 0,void 0):(!0===this.isPlaying&&(this.Ee+=Math.max(this.context.currentTime-this.ye,0)*this.playbackRate,!0===this.loop&&(this.Ee=this.Ee%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this)}stop(t=0){return!1===this.hasPlaybackControl?(void 0,void 0):(this.Ee=0,null!==this.source&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this)}connect(){if(this.filters.length>0){this.source.connect(this.filters[0])
for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t])
this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput())
return this.be=!0,this}disconnect(){if(!1!==this.be){if(this.filters.length>0){this.source.disconnect(this.filters[0])
for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t])
this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput())
return this.be=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),!0===this.be?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,!0===this.isPlaying&&void 0!==this.source.detune&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){return!1===this.hasPlaybackControl?(void 0,void 0):(this.playbackRate=t,!0===this.isPlaying&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this)}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this.Ee=0}getLoop(){return!1===this.hasPlaybackControl?(void 0,!1):this.loop}setLoop(t){return!1===this.hasPlaybackControl?(void 0,void 0):(this.loop=t,!0===this.isPlaying&&(this.source.loop=this.loop),this)}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),"buffer"!==t.sourceType?(void 0,this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}}const Xu=new ur,qu=new lr,Yu=new ur,$u=new ur
class Ju{constructor(t,e,n){let i,s,r
switch(this.binding=t,this.valueSize=n,e){case"quaternion":i=this.Ae,s=this.Te,r=this.Ce,this.buffer=new Float64Array(6*n),this.Le=5
break
case"string":case"bool":i=this.Pe,s=this.Pe,r=this.Ne,this.buffer=new Array(5*n)
break
default:i=this.De,s=this.Ue,r=this.Ie,this.buffer=new Float64Array(5*n)}this.Re=i,this.Oe=s,this.Fe=r,this.He=3,this.Be=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i
let r=this.cumulativeWeight
if(0===r){for(let t=0;t!==i;++t)n[s+t]=n[t]
r=e}else{r+=e
const t=e/r
this.Re(n,s,0,t,i)}this.cumulativeWeight=r}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this.Be
0===this.cumulativeWeightAdditive&&this.Fe(),this.Oe(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,o=this.binding
if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const t=e*this.He
this.Re(n,i,t,1-s,e)}r>0&&this.Oe(n,i,this.Be*e,1,e)
for(let a=e,h=e+e;a!==h;++a)if(n[a]!==n[a+e]){o.setValue(n,i)
break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this.He
t.getValue(e,i)
for(let s=n,r=i;s!==r;++s)e[s]=e[i+s%n]
this.Fe(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=3*this.valueSize
this.binding.setValue(this.buffer,t)}Ie(){const t=this.Be*this.valueSize,e=t+this.valueSize
for(let n=t;n<e;n++)this.buffer[n]=0}Ce(){this.Ie(),this.buffer[this.Be*this.valueSize+3]=1}Ne(){const t=this.He*this.valueSize,e=this.Be*this.valueSize
for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}Pe(t,e,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)t[e+r]=t[n+r]}Ae(t,e,n,i){lr.slerpFlat(t,e,t,e,t,n,i)}Te(t,e,n,i,s){const r=this.Le*s
lr.multiplyQuaternionsFlat(t,r,t,e,t,n),lr.slerpFlat(t,e,t,e,t,r,i)}De(t,e,n,i,s){const r=1-i
for(let o=0;o!==s;++o){const s=e+o
t[s]=t[s]*r+t[n+o]*i}}Ue(t,e,n,i,s){for(let r=0;r!==s;++r){const s=e+r
t[s]=t[s]+t[n+r]*i}}}const Zu="\\[\\]\\.:\\/",Ku=new RegExp("["+Zu+"]","g"),Qu="[^"+Zu+"]",tf="[^"+Zu.replace("\\.","")+"]",ef=/((?:WC+[\/:])*)/.source.replace("WC",Qu),nf=/(WCOD+)?/.source.replace("WCOD",tf),sf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qu),rf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qu),of=new RegExp("^"+ef+nf+sf+rf+"$"),af=["material","materials","bones","map"]
class hf{constructor(t,e,n){this.path=e,this.parsedPath=n||hf.parseTrackName(e),this.node=hf.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this.Ge,this.setValue=this.Ve}static create(t,e,n){return t&&t.isAnimationObjectGroup?new hf.Composite(t,e,n):new hf(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ku,"")}static parseTrackName(t){const e=of.exec(t)
if(null===e)throw new Error("PropertyBinding: Cannot parse trackName: "+t)
const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".")
if(void 0!==i&&-1!==i){const t=n.nodeName.substring(i+1);-1!==af.indexOf(t)&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=t)}if(null===n.propertyName||0===n.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t)
return n}static findNode(t,e){if(void 0===e||""===e||"."===e||-1===e||e===t.name||e===t.uuid)return t
if(t.skeleton){const n=t.skeleton.getBoneByName(e)
if(void 0!==n)return n}if(t.children){const n=function(t){for(let i=0;i<t.length;i++){const s=t[i]
if(s.name===e||s.uuid===e)return s
const r=n(s.children)
if(r)return r}return null},i=n(t.children)
if(i)return i}return null}ke(){}ze(){}We(t,e){t[e]=this.targetObject[this.propertyName]}je(t,e){const n=this.resolvedProperty
for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}Xe(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}qe(t,e){this.resolvedProperty.toArray(t,e)}Ye(t,e){this.targetObject[this.propertyName]=t[e]}$e(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}Je(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}Ze(t,e){const n=this.resolvedProperty
for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}Ke(t,e){const n=this.resolvedProperty
for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]
this.targetObject.needsUpdate=!0}Qe(t,e){const n=this.resolvedProperty
for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]
this.targetObject.matrixWorldNeedsUpdate=!0}tn(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}en(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}nn(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}sn(t,e){this.resolvedProperty.fromArray(t,e)}rn(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}an(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}Ge(t,e){this.bind(),this.getValue(t,e)}Ve(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node
const e=this.parsedPath,n=e.objectName,i=e.propertyName
let s=e.propertyIndex
if(t||(t=hf.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this.ke,this.setValue=this.ze,!t)return void 0,void 0
if(n){let i=e.objectIndex
switch(n){case"materials":if(!t.material)return void 0,void 0
if(!t.material.materials)return void 0,void 0
t=t.material.materials
break
case"bones":if(!t.skeleton)return void 0,void 0
t=t.skeleton.bones
for(let e=0;e<t.length;e++)if(t[e].name===i){i=e
break}break
case"map":if("map"in t){t=t.map
break}if(!t.material)return void 0,void 0
if(!t.material.map)return void 0,void 0
t=t.material.map
break
default:if(void 0===t[n])return void 0,void 0
t=t[n]}if(void 0!==i){if(void 0===t[i])return void 0,void 0
t=t[i]}}const r=t[i]
if(void 0===r)return e.nodeName,void 0,void 0
let o=this.Versioning.None
this.targetObject=t,!0===t.isMaterial?o=this.Versioning.NeedsUpdate:!0===t.isObject3D&&(o=this.Versioning.MatrixWorldNeedsUpdate)
let a=this.BindingType.Direct
if(void 0!==s){if("morphTargetInfluences"===i){if(!t.geometry)return void 0,void 0
if(!t.geometry.morphAttributes)return void 0,void 0
void 0!==t.morphTargetDictionary[s]&&(s=t.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else void 0!==r.fromArray&&void 0!==r.toArray?(a=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(a=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i
this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this.Ge,this.setValue=this.Ve}}hf.Composite=class{constructor(t,e,n){const i=n||hf.parseTrackName(e)
this.hn=t,this.cn=t.subscribe_(e,i)}getValue(t,e){this.bind()
const n=this.hn.nCachedObjects_,i=this.cn[n]
void 0!==i&&i.getValue(t,e)}setValue(t,e){const n=this.cn
for(let i=this.hn.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this.cn
for(let e=this.hn.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this.cn
for(let e=this.hn.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},hf.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},hf.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},hf.prototype.GetterByBindingType=[hf.prototype.We,hf.prototype.je,hf.prototype.Xe,hf.prototype.qe],hf.prototype.SetterByBindingTypeAndVersioning=[[hf.prototype.Ye,hf.prototype.$e,hf.prototype.Je],[hf.prototype.Ze,hf.prototype.Ke,hf.prototype.Qe],[hf.prototype.tn,hf.prototype.en,hf.prototype.nn],[hf.prototype.sn,hf.prototype.rn,hf.prototype.an]]
class cf{constructor(t,e,n=null,i=e.blendMode){this.ln=t,this.un=e,this.fn=n,this.blendMode=i
const s=e.tracks,r=s.length,o=new Array(r),a={endingStart:Rs,endingEnd:Rs}
for(let h=0;h!==r;++h){const t=s[h].createInterpolant(null)
o[h]=t,t.settings=a}this.dn=a,this.pn=o,this.vn=new Array(r),this.mn=null,this.gn=null,this._n=null,this.Mn=null,this.loop=2201,this.wn=-1,this.Sn=null,this.time=0,this.timeScale=1,this.xn=1,this.weight=1,this.yn=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this.ln.En(this),this}stop(){return this.ln.bn(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this.wn=-1,this.Sn=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this.Sn&&this.ln.An(this)}isScheduled(){return this.ln.An(this)}startAt(t){return this.Sn=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this.yn=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this.yn}fadeIn(t){return this.Tn(t,0,1)}fadeOut(t){return this.Tn(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),!0===n){const n=this.un.duration,i=t.un.duration,s=i/n,r=n/i
t.warp(1,s,e),this.warp(r,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this.Mn
return null!==t&&(this.Mn=null,this.ln.Cn(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this.xn=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this.xn}setDuration(t){return this.timeScale=this.un.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this.xn,0,t)}warp(t,e,n){const i=this.ln,s=i.time,r=this.timeScale
let o=this._n
null===o&&(o=i.Ln(),this._n=o)
const a=o.parameterPositions,h=o.sampleValues
return a[0]=s,a[1]=s+n,h[0]=t/r,h[1]=e/r,this}stopWarping(){const t=this._n
return null!==t&&(this._n=null,this.ln.Cn(t)),this}getMixer(){return this.ln}getClip(){return this.un}getRoot(){return this.fn||this.ln.Pn}Nn(t,e,n,i){if(!this.enabled)return this.Dn(t),void 0
const s=this.Sn
if(null!==s){const i=(t-s)*n
i<0||0===n?e=0:(this.Sn=null,e=n*i)}e*=this.Un(t)
const r=this.In(e),o=this.Dn(t)
if(o>0){const t=this.pn,e=this.vn
if(this.blendMode===Hs)for(let n=0,i=t.length;n!==i;++n)t[n].evaluate(r),e[n].accumulateAdditive(o)
else for(let n=0,s=t.length;n!==s;++n)t[n].evaluate(r),e[n].accumulate(i,o)}}Dn(t){let e=0
if(this.enabled){e=this.weight
const n=this.Mn
if(null!==n){const i=n.evaluate(t)[0]
e*=i,t>n.parameterPositions[1]&&(this.stopFading(),0===i&&(this.enabled=!1))}}return this.yn=e,e}Un(t){let e=0
if(!this.paused){e=this.timeScale
const n=this._n
null!==n&&(e*=n.evaluate(t)[0],t>n.parameterPositions[1]&&(this.stopWarping(),0===e?this.paused=!0:this.timeScale=e))}return this.xn=e,e}In(t){const e=this.un.duration,n=this.loop
let i=this.time+t,s=this.wn
const r=2202===n
if(0===t)return-1===s||!r||1&~s?i:e-i
if(2200===n){-1===s&&(this.wn=0,this.Rn(!0,!0,!1))
t:{if(i>=e)i=e
else{if(!(i<0)){this.time=i
break t}i=0}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this.ln.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(-1===s&&(t>=0?(s=0,this.Rn(!0,0===this.repetitions,r)):this.Rn(0===this.repetitions,!0,r)),i>=e||i<0){const n=Math.floor(i/e)
i-=e*n,s+=Math.abs(n)
const o=this.repetitions-s
if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this.ln.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1})
else{if(1===o){const e=t<0
this.Rn(e,!e,r)}else this.Rn(!1,!1,r)
this.wn=s,this.time=i,this.ln.dispatchEvent({type:"loop",action:this,loopDelta:n})}}else this.time=i
if(r&&!(1&~s))return e-i}return i}Rn(t,e,n){const i=this.dn
n?(i.endingStart=Os,i.endingEnd=Os):(i.endingStart=t?this.zeroSlopeAtStart?Os:Rs:Fs,i.endingEnd=e?this.zeroSlopeAtEnd?Os:Rs:Fs)}Tn(t,e,n){const i=this.ln,s=i.time
let r=this.Mn
null===r&&(r=i.Ln(),this.Mn=r)
const o=r.parameterPositions,a=r.sampleValues
return o[0]=s,a[0]=e,o[1]=s+t,a[1]=n,this}}const lf=new Float32Array(1)
class uf{constructor(t){this.value=t}clone(){return new uf(void 0===this.value.clone?this.value:this.value.clone())}}let ff=0
const df=new ro
class pf{constructor(t,e,n=0,i=1/0){this.ray=new so(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):void 0}setFromXRController(t){return df.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(df),this}intersectObject(t,e=!0,n=[]){return Mt(t,this,n,e),n.sort(_t),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Mt(t[i],this,n,e)
return n.sort(_t),n}}class vf{constructor(t,e,n,i){vf.prototype.isMatrix2=!0,this.elements=[1,0,0,1],void 0!==t&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e]
return this}set(t,e,n,i){const s=this.elements
return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}const mf=new cr,gf=new ur,_f=new ur,Mf=new ur,wf=new ur,Sf=new ur,xf=new ur,yf=new ur,Ef=new ur,bf=new ur,Af=new ro,Tf=new ro,Cf=new ur,Lf=new Zo,Pf=new Zo,Nf=new ur,Df=new ur,Uf=new ur,If=new ur,Rf=new Ua,Of=new Ur,Ff=new ur
let Hf,Bf
"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dn}})),"undefined"!=typeof window&&(window.__THREE__||(window.__THREE__=Dn))
const Gf={alphahash_fragment:"#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",alphahash_pars_fragment:"#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif",alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",alphatest_fragment:"#ifdef USE_ALPHATEST\n\t#ifdef ALPHA_TO_COVERAGE\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\tif ( diffuseColor.a < alphaTest ) discard;\n\t#endif\n#endif",alphatest_pars_fragment:"#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",batching_pars_vertex:"#ifdef USE_BATCHING\n\t#if ! defined( GL_ANGLE_multi_draw )\n\t#define gl_DrawID _gl_DrawID\n\tuniform int _gl_DrawID;\n\t#endif\n\tuniform highp sampler2D batchingTexture;\n\tuniform highp usampler2D batchingIdTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n\tfloat getIndirectIndex( const in int i ) {\n\t\tint size = textureSize( batchingIdTexture, 0 ).x;\n\t\tint x = i % size;\n\t\tint y = i / size;\n\t\treturn float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n\t}\n#endif\n#ifdef USE_BATCHING_COLOR\n\tuniform sampler2D batchingColorTexture;\n\tvec3 getBatchingColor( const in float i ) {\n\t\tint size = textureSize( batchingColorTexture, 0 ).x;\n\t\tint j = int( i );\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\treturn texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n\t}\n#endif",batching_vertex:"#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",begin_vertex:"vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif",beginnormal_vertex:"vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",bsdfs:"float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated",iridescence_fragment:"#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#ifdef ALPHA_TO_COVERAGE\n\t\tfloat distanceToPlane, distanceGradient;\n\t\tfloat clipOpacity = 1.0;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\tclipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\tif ( clipOpacity == 0.0 ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tfloat unionClipOpacity = 1.0;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\t\tunionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tclipOpacity *= 1.0 - unionClipOpacity;\n\t\t#endif\n\t\tdiffuseColor.a *= clipOpacity;\n\t\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tbool clipped = true;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tif ( clipped ) discard;\n\t\t#endif\n\t#endif\n#endif",clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",color_fragment:"#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",color_pars_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvarying vec3 vColor;\n#endif",color_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n\tvec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n\tvColor.xyz *= batchingColor.xyz;\n#endif",common:"#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",defaultnormal_vertex:"vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n\t\temissiveColor = sRGBTransferEOTF( emissiveColor );\n\t#endif\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:"vec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",envmap_fragment:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",envmap_common_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform mat3 envMapRotation;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",envmap_physical_pars_fragment:"#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",fog_vertex:"#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",gradientmap_pars_fragment:"#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_fragment:"LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",lights_lambert_pars_fragment:"varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert",lights_pars_begin:"uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif ( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",lights_toon_fragment:"ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",lights_toon_pars_fragment:"varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon",lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_phong_pars_fragment:"varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong",lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n\tmaterial.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\tfloat dispersion;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\t\treturn saturate(v);\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",lights_fragment_begin:"\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",logdepthbuf_fragment:"#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tgl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_pars_vertex:"#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",map_fragment:"#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",map_particle_fragment:"#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",map_particle_pars_fragment:"#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphinstance_vertex:"#ifdef USE_INSTANCING_MORPH\n\tfloat morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\tfloat morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tmorphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n\t}\n#endif",morphcolor_vertex:"#if defined( USE_MORPHCOLORS )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_INSTANCING_MORPH\n\t\tuniform float morphTargetBaseInfluence;\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t#endif\n\tuniform sampler2DArray morphTargetsTexture;\n\tuniform ivec2 morphTargetsTextureSize;\n\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t}\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",normal_fragment_begin:"float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;",normal_fragment_maps:"#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",normal_pars_fragment:"#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",normal_pars_vertex:"#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",normal_vertex:"#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif",clearcoat_normal_fragment_begin:"#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif",clearcoat_normal_fragment_maps:"#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",clearcoat_pars_fragment:"#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif",iridescence_pars_fragment:"#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif",opaque_fragment:"#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec4( 0., 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec4( 1., 1., 1., 1. );\n\tfloat vuf;\n\tfloat af = modf( v * PackFactors.a, vuf );\n\tfloat bf = modf( vuf * ShiftRight8, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec3( 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec3( 1., 1., 1. );\n\tfloat vuf;\n\tfloat bf = modf( v * PackFactors.b, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec2( 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec2( 1., 1. );\n\tfloat vuf;\n\tfloat gf = modf( v * 256., vuf );\n\treturn vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n\treturn dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n\treturn v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}",premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",project_vertex:"vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",dithering_fragment:"#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",dithering_pars_fragment:"#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\tfloat depth = unpackRGBAToDepth( texture2D( depths, uv ) );\n\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\treturn step( depth, compare );\n\t\t#else\n\t\t\treturn step( compare, depth );\n\t\t#endif\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow( sampler2D shadow, vec2 uv, float compare ) {\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\tfloat hard_shadow = step( distribution.x, compare );\n\t\t#else\n\t\t\tfloat hard_shadow = step( compare, distribution.x );\n\t\t#endif\n\t\tif ( hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\t\n\t\tfloat lightToPositionLength = length( lightToPosition );\n\t\tif ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n\t\t\tfloat dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\t\tdp += shadowBias;\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\t\tshadow = (\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t\t) * ( 1.0 / 9.0 );\n\t\t\t#else\n\t\t\t\tshadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t\t#endif\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n#endif",shadowmap_pars_vertex:"#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",shadowmap_vertex:"#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif",shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",tonemapping_pars_fragment:"#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\tconst float AgxMinEv = - 12.47393;\tconst float AgxMaxEv = 4.026069;\n\tcolor *= toneMappingExposure;\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\tcolor = AgXInsetMatrix * color;\n\tcolor = max( color, 1e-10 );\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\tcolor = clamp( color, 0.0, 1.0 );\n\tcolor = agxDefaultContrastApprox( color );\n\tcolor = AgXOutsetMatrix * color;\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\tcolor = clamp( color, 0.0, 1.0 );\n\treturn color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n\tconst float StartCompression = 0.8 - 0.04;\n\tconst float Desaturation = 0.15;\n\tcolor *= toneMappingExposure;\n\tfloat x = min( color.r, min( color.g, color.b ) );\n\tfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n\tcolor -= offset;\n\tfloat peak = max( color.r, max( color.g, color.b ) );\n\tif ( peak < StartCompression ) return color;\n\tfloat d = 1. - StartCompression;\n\tfloat newPeak = 1. - d * d / ( peak + d - StartCompression );\n\tcolor *= newPeak / peak;\n\tfloat g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n\treturn mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",transmission_fragment:"#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",transmission_pars_fragment:"#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec4 transmittedLight;\n\t\tvec3 transmittance;\n\t\t#ifdef USE_DISPERSION\n\t\t\tfloat halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n\t\t\tvec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n\t\t\tfor ( int i = 0; i < 3; i ++ ) {\n\t\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n\t\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\t\trefractionCoords += 1.0;\n\t\t\t\trefractionCoords /= 2.0;\n\t\t\t\tvec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n\t\t\t\ttransmittedLight[ i ] = transmissionSample[ i ];\n\t\t\t\ttransmittedLight.a += transmissionSample.a;\n\t\t\t\ttransmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n\t\t\t}\n\t\t\ttransmittedLight.a /= 3.0;\n\t\t#else\n\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\trefractionCoords += 1.0;\n\t\t\trefractionCoords /= 2.0;\n\t\t\ttransmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\t\ttransmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\t#endif\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif",uv_pars_fragment:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",uv_pars_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",uv_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",background_vert:"varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",background_frag:"uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",backgroundCube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",backgroundCube_frag:"#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",cube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",depth_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\tfloat fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n\t#else\n\t\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n\t#endif\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#elif DEPTH_PACKING == 3202\n\t\tgl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n\t#elif DEPTH_PACKING == 3203\n\t\tgl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n\t#endif\n}",distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",equirect_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",meshbasic_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshlambert_vert:"#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshlambert_frag:"#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshmatcap_vert:"#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",meshmatcap_frag:"#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshnormal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",meshnormal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphysical_vert:"#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",meshphysical_frag:"#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshtoon_vert:"#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshtoon_frag:"#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",shadow_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix[ 3 ];\n\tvec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}"},Vf={common:{diffuse:{value:new Zo(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pr},alphaMap:{value:null},alphaMapTransform:{value:new pr},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pr}},envmap:{envMap:{value:null},envMapRotation:{value:new pr},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pr}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pr}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pr},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pr},normalScale:{value:new cr(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pr},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pr}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pr}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pr}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zo(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zo(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pr},alphaTest:{value:0},uvTransform:{value:new pr}},sprite:{diffuse:{value:new Zo(16777215)},opacity:{value:1},center:{value:new cr(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pr},alphaMap:{value:null},alphaMapTransform:{value:new pr},alphaTest:{value:0}}},kf={basic:{uniforms:E([Vf.common,Vf.specularmap,Vf.envmap,Vf.aomap,Vf.lightmap,Vf.fog]),vertexShader:Gf.meshbasic_vert,fragmentShader:Gf.meshbasic_frag},lambert:{uniforms:E([Vf.common,Vf.specularmap,Vf.envmap,Vf.aomap,Vf.lightmap,Vf.emissivemap,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,Vf.fog,Vf.lights,{emissive:{value:new Zo(0)}}]),vertexShader:Gf.meshlambert_vert,fragmentShader:Gf.meshlambert_frag},phong:{uniforms:E([Vf.common,Vf.specularmap,Vf.envmap,Vf.aomap,Vf.lightmap,Vf.emissivemap,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,Vf.fog,Vf.lights,{emissive:{value:new Zo(0)},specular:{value:new Zo(1118481)},shininess:{value:30}}]),vertexShader:Gf.meshphong_vert,fragmentShader:Gf.meshphong_frag},standard:{uniforms:E([Vf.common,Vf.envmap,Vf.aomap,Vf.lightmap,Vf.emissivemap,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,Vf.roughnessmap,Vf.metalnessmap,Vf.fog,Vf.lights,{emissive:{value:new Zo(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gf.meshphysical_vert,fragmentShader:Gf.meshphysical_frag},toon:{uniforms:E([Vf.common,Vf.aomap,Vf.lightmap,Vf.emissivemap,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,Vf.gradientmap,Vf.fog,Vf.lights,{emissive:{value:new Zo(0)}}]),vertexShader:Gf.meshtoon_vert,fragmentShader:Gf.meshtoon_frag},matcap:{uniforms:E([Vf.common,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,Vf.fog,{matcap:{value:null}}]),vertexShader:Gf.meshmatcap_vert,fragmentShader:Gf.meshmatcap_frag},points:{uniforms:E([Vf.points,Vf.fog]),vertexShader:Gf.points_vert,fragmentShader:Gf.points_frag},dashed:{uniforms:E([Vf.common,Vf.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gf.linedashed_vert,fragmentShader:Gf.linedashed_frag},depth:{uniforms:E([Vf.common,Vf.displacementmap]),vertexShader:Gf.depth_vert,fragmentShader:Gf.depth_frag},normal:{uniforms:E([Vf.common,Vf.bumpmap,Vf.normalmap,Vf.displacementmap,{opacity:{value:1}}]),vertexShader:Gf.meshnormal_vert,fragmentShader:Gf.meshnormal_frag},sprite:{uniforms:E([Vf.sprite,Vf.fog]),vertexShader:Gf.sprite_vert,fragmentShader:Gf.sprite_frag},background:{uniforms:{uvTransform:{value:new pr},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gf.background_vert,fragmentShader:Gf.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pr}},vertexShader:Gf.backgroundCube_vert,fragmentShader:Gf.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gf.cube_vert,fragmentShader:Gf.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gf.equirect_vert,fragmentShader:Gf.equirect_frag},distanceRGBA:{uniforms:E([Vf.common,Vf.displacementmap,{referencePosition:{value:new ur},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gf.distanceRGBA_vert,fragmentShader:Gf.distanceRGBA_frag},shadow:{uniforms:E([Vf.lights,Vf.fog,{color:{value:new Zo(0)},opacity:{value:1}}]),vertexShader:Gf.shadow_vert,fragmentShader:Gf.shadow_frag}}
kf.physical={uniforms:E([kf.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pr},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pr},clearcoatNormalScale:{value:new cr(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pr},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pr},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pr},sheen:{value:0},sheenColor:{value:new Zo(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pr},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pr},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pr},transmissionSamplerSize:{value:new cr},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pr},attenuationDistance:{value:0},attenuationColor:{value:new Zo(0)},specularColor:{value:new Zo(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pr},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pr},anisotropyVector:{value:new cr},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pr}}]),vertexShader:Gf.meshphysical_vert,fragmentShader:Gf.meshphysical_frag}
const zf={r:0,b:0,g:0},Wf=new mo,jf=new ro,Xf=[.125,.215,.35,.446,.526,.582],qf=new _u,Yf=new Zo
let $f=null,Jf=0,Zf=0,Kf=!1
const Qf=(1+Math.sqrt(5))/2,td=1/Qf,ed=[new ur(-Qf,td,0),new ur(Qf,td,0),new ur(-td,0,Qf),new ur(td,0,Qf),new ur(0,Qf,-td),new ur(0,Qf,td),new ur(-1,1,-1),new ur(1,1,-1),new ur(-1,1,1),new ur(1,1,1)],nd=new ur
class id{constructor(t){this.On=t,this.Fn=null,this.Hn=0,this.Bn=0,this.Gn=[],this.Vn=[],this.kn=[],this.zn=null,this.Wn=null,this.jn=null,this.Xn(this.zn)}fromScene(t,e=0,n=.1,i=100,s={}){const{size:r=256,position:o=nd}=s
$f=this.On.getRenderTarget(),Jf=this.On.getActiveCubeFace(),Zf=this.On.getActiveMipmapLevel(),Kf=this.On.xr.enabled,this.On.xr.enabled=!1,this.qn(r)
const a=this.Yn()
return a.depthBuffer=!0,this.$n(t,n,i,a,o),e>0&&this.Jn(a,0,0,e),this.Zn(a),this.Kn(a),a}fromEquirectangular(t,e=null){return this.Qn(t,e)}fromCubemap(t,e=null){return this.Qn(t,e)}compileCubemapShader(){null===this.Wn&&(this.Wn=Rt(),this.Xn(this.Wn))}compileEquirectangularShader(){null===this.jn&&(this.jn=It(),this.Xn(this.jn))}dispose(){this.ti(),null!==this.Wn&&this.Wn.dispose(),null!==this.jn&&this.jn.dispose()}qn(t){this.Hn=Math.floor(Math.log2(t)),this.Bn=Math.pow(2,this.Hn)}ti(){null!==this.zn&&this.zn.dispose(),null!==this.Fn&&this.Fn.dispose()
for(let t=0;t<this.Gn.length;t++)this.Gn[t].dispose()}Kn(t){this.On.setRenderTarget($f,Jf,Zf),this.On.xr.enabled=Kf,t.scissorTest=!1,Ut(t,0,0,t.width,t.height)}Qn(t,e){t.mapping===gi||t.mapping===_i?this.qn(0===t.image.length?16:t.image[0].width||t.image[0].image.width):this.qn(t.image.width/4),$f=this.On.getRenderTarget(),Jf=this.On.getActiveCubeFace(),Zf=this.On.getActiveMipmapLevel(),Kf=this.On.xr.enabled,this.On.xr.enabled=!1
const n=e||this.Yn()
return this.ei(t,n),this.Zn(n),this.Kn(n),n}Yn(){const t=3*Math.max(this.Bn,112),e=4*this.Bn,n={magFilter:Ci,minFilter:Ci,generateMipmaps:!1,type:Hi,format:Xi,colorSpace:Vs,depthBuffer:!1},i=Dt(t,e,n)
if(null===this.Fn||this.Fn.width!==t||this.Fn.height!==e){null!==this.Fn&&this.ti(),this.Fn=Dt(t,e,n)
const{Hn:i}=this;({sizeLods:this.Vn,lodPlanes:this.Gn,sigmas:this.kn}=function(t){const e=[],n=[],i=[]
let s=t
const r=t-4+1+Xf.length
for(let o=0;o<r;o++){const r=Math.pow(2,s)
n.push(r)
let a=1/r
o>t-4?a=Xf[o-t+4-1]:0===o&&(a=0),i.push(a)
const h=1/(r-2),c=-h,l=1+h,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,d=6,p=3,v=2,m=1,g=new Float32Array(p*d*f),_=new Float32Array(v*d*f),M=new Float32Array(m*d*f)
for(let t=0;t<f;t++){const e=t%3*2/3-1,n=t>2?0:-1,i=[e,n,0,e+2/3,n,0,e+2/3,n+1,0,e,n,0,e+2/3,n+1,0,e,n+1,0]
g.set(i,p*d*t),_.set(u,v*d*t)
const s=[t,t,t,t,t,t]
M.set(s,m*d*t)}const w=new ga
w.setAttribute("position",new oa(g,p)),w.setAttribute("uv",new oa(_,v)),w.setAttribute("faceIndex",new oa(M,m)),e.push(w),s>4&&s--}return{lodPlanes:e,sizeLods:n,sigmas:i}}(i)),this.zn=function(t,e,n){const i=new Float32Array(20),s=new ur(0,1,0)
return new Da({name:"SphericalGaussianBlur",defines:{n:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:"\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",blending:0,depthTest:!1,depthWrite:!1})}(i,t,e)}return i}Xn(t){const e=new La(this.Gn[0],t)
this.On.compile(e,qf)}$n(t,e,n,i,s){const r=new Fa(90,1,e,n),o=[1,-1,1,1,1,1],a=[1,1,1,-1,-1,-1],h=this.On,c=h.autoClear,l=h.toneMapping
h.getClearColor(Yf),h.toneMapping=0,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null))
const u=new ea({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),f=new La(new Pa,u)
let d=!1
const p=t.background
p?p.isColor&&(u.color.copy(p),t.background=null,d=!0):(u.color.copy(Yf),d=!0)
for(let v=0;v<6;v++){const e=v%3
0===e?(r.up.set(0,o[v],0),r.position.set(s.x,s.y,s.z),r.lookAt(s.x+a[v],s.y,s.z)):1===e?(r.up.set(0,0,o[v]),r.position.set(s.x,s.y,s.z),r.lookAt(s.x,s.y+a[v],s.z)):(r.up.set(0,o[v],0),r.position.set(s.x,s.y,s.z),r.lookAt(s.x,s.y,s.z+a[v]))
const n=this.Bn
Ut(i,e*n,v>2?n:0,n,n),h.setRenderTarget(i),d&&h.render(f,r),h.render(t,r)}f.geometry.dispose(),f.material.dispose(),h.toneMapping=l,h.autoClear=c,t.background=p}ei(t,e){const n=this.On,i=t.mapping===gi||t.mapping===_i
i?(null===this.Wn&&(this.Wn=Rt()),this.Wn.uniforms.flipEnvMap.value=!1===t.isRenderTargetTexture?-1:1):null===this.jn&&(this.jn=It())
const s=i?this.Wn:this.jn,r=new La(this.Gn[0],s)
s.uniforms.envMap.value=t
const o=this.Bn
Ut(e,0,0,3*o,2*o),n.setRenderTarget(e),n.render(r,qf)}Zn(t){const e=this.On,n=e.autoClear
e.autoClear=!1
const i=this.Gn.length
for(let s=1;s<i;s++){const e=Math.sqrt(this.kn[s]*this.kn[s]-this.kn[s-1]*this.kn[s-1]),n=ed[(i-s-1)%ed.length]
this.Jn(t,s-1,s,e,n)}e.autoClear=n}Jn(t,e,n,i,s){const r=this.Fn
this.ni(t,r,e,n,i,"latitudinal",s),this.ni(r,t,n,n,i,"longitudinal",s)}ni(t,e,n,i,s,r,o){const a=this.On,h=this.zn
"latitudinal"!==r&&"longitudinal"!==r,0
const c=new La(this.Gn[i],h),l=h.uniforms,u=this.Vn[n]-1,f=isFinite(s)?Math.PI/(2*u):2*Math.PI/39,d=s/f,p=isFinite(s)?1+Math.floor(3*d):20
p>20,0
const v=[]
let m=0
for(let M=0;M<20;++M){const t=M/d,e=Math.exp(-t*t/2)
v.push(e),0===M?m+=e:M<p&&(m+=2*e)}for(let M=0;M<v.length;M++)v[M]=v[M]/m
l.envMap.value=t.texture,l.samples.value=p,l.weights.value=v,l.latitudinal.value="latitudinal"===r,o&&(l.poleAxis.value=o)
const{Hn:g}=this
l.dTheta.value=f,l.mipInt.value=g-n
const _=this.Vn[i]
Ut(e,3*_*(i>g-4?i-g+4:0),4*(this.Bn-_),3*_,2*_),a.setRenderTarget(e),a.render(c,qf)}}const sd=new Tr,rd=new Pc(1,1),od=new Nr,ad=new Dr,hd=new Ga,cd=[],ld=[],ud=new Float32Array(16),fd=new Float32Array(9),dd=new Float32Array(4)
class pd{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=function(t){switch(t){case 5126:return qt
case 35664:return Yt
case 35665:return $t
case 35666:return Jt
case 35674:return Zt
case 35675:return Kt
case 35676:return Qt
case 5124:case 35670:return te
case 35667:case 35671:return ee
case 35668:case 35672:return ne
case 35669:case 35673:return ie
case 5125:return se
case 36294:return re
case 36295:return oe
case 36296:return ae
case 35678:case 36198:case 36298:case 36306:case 35682:return he
case 35679:case 36299:case 36307:return ce
case 35680:case 36300:case 36308:case 36293:return le
case 36289:case 36303:case 36311:case 36292:return ue}}(e.type)}}class vd{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=function(t){switch(t){case 5126:return fe
case 35664:return de
case 35665:return pe
case 35666:return ve
case 35674:return me
case 35675:return ge
case 35676:return _e
case 5124:case 35670:return Me
case 35667:case 35671:return we
case 35668:case 35672:return Se
case 35669:case 35673:return xe
case 5125:return ye
case 36294:return Ee
case 36295:return be
case 36296:return Ae
case 35678:case 36198:case 36298:case 36306:case 35682:return Te
case 35679:case 36299:case 36307:return Ce
case 35680:case 36300:case 36308:case 36293:return Le
case 36289:case 36303:case 36311:case 36292:return Pe}}(e.type)}}class md{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq
for(let s=0,r=i.length;s!==r;++s){const r=i[s]
r.setValue(t,e[r.id],n)}}}const gd=/(\w+)(\])?(\[|\.)?/g
class _d{constructor(t,e){this.seq=[],this.map={}
const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS)
for(let i=0;i<n;++i){const n=t.getActiveUniform(e,i)
De(n,t.getUniformLocation(e,n.name),this)}}setValue(t,e,n,i){const s=this.map[e]
void 0!==s&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n]
void 0!==i&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){const r=e[s],o=n[r.id]
!1!==o.needsUpdate&&r.setValue(t,o.value,i)}}static seqWithValue(t,e){const n=[]
for(let i=0,s=t.length;i!==s;++i){const s=t[i]
s.id in e&&n.push(s)}return n}}let Md=0
const wd=new pr,Sd=new ur,xd=/^[ \t]*#include +<([\w\d./]+)>/gm,yd=new Map,Ed=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g
let bd=0
class Ad{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this.ii(e),s=this.ii(n),r=this.si(t)
return!1===r.has(i)&&(r.add(i),i.usedTimes++),!1===r.has(s)&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t)
for(const n of e)n.usedTimes--,0===n.usedTimes&&this.shaderCache.delete(n.code)
return this.materialCache.delete(t),this}getVertexShaderID(t){return this.ii(t.vertexShader).id}getFragmentShaderID(t){return this.ii(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}si(t){const e=this.materialCache
let n=e.get(t)
return void 0===n&&(n=new Set,e.set(t,n)),n}ii(t){const e=this.shaderCache
let n=e.get(t)
return void 0===n&&(n=new Td(t),e.set(t,n)),n}}class Td{constructor(t){this.id=bd++,this.code=t,this.usedTimes=0}}let Cd=0
const Ld={[si]:1,[oi]:6,[hi]:7,[ai]:5,[ri]:0,[li]:2,[ui]:4,[ci]:3}
class Pd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(null===this.texture){const n=new Nc(t.texture)
t.depthNear===e.depthNear&&t.depthFar===e.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(null!==this.texture&&null===this.mesh){const e=t.cameras[0].viewport,n=new Da({vertexShader:"\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}",fragmentShader:"\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n\tvec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n\tif ( coord.x >= 1.0 ) {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n\t} else {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n\t}\n\n}",uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}})
this.mesh=new La(new vl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nd extends ir{constructor(t,e){function n(t){const e=b.indexOf(t.inputSource)
if(-1===e)return
const n=E[e]
void 0!==n&&(n.update(t.inputSource,t.frame,f||c),n.dispatchEvent({type:t.type,data:t.inputSource}))}function i(){a.removeEventListener("select",n),a.removeEventListener("selectstart",n),a.removeEventListener("selectend",n),a.removeEventListener("squeeze",n),a.removeEventListener("squeezestart",n),a.removeEventListener("squeezeend",n),a.removeEventListener("end",i),a.removeEventListener("inputsourceschange",s)
for(let t=0;t<E.length;t++){const e=b[t]
null!==e&&(b[t]=null,E[t].disconnect(e))}D=null,U=null,M.reset()
for(const t in w)delete w[t]
t.setRenderTarget(x),m=null,v=null,p=null,a=null,y=null,F.stop(),o.isPresenting=!1,t.setPixelRatio(T),t.setSize(A.width,A.height,!1),o.dispatchEvent({type:"sessionend"})}function s(t){for(let e=0;e<t.removed.length;e++){const n=t.removed[e],i=b.indexOf(n)
i>=0&&(b[i]=null,E[i].disconnect(n))}for(let e=0;e<t.added.length;e++){const n=t.added[e]
let i=b.indexOf(n)
if(-1===i){for(let t=0;t<E.length;t++){if(t>=b.length){b.push(n),i=t
break}if(null===b[t]){b[t]=n,i=t
break}}if(-1===i)break}const s=E[i]
s&&s.connect(n)}}function r(t,e){null===e?t.matrixWorld.copy(t.matrix):t.matrixWorld.multiplyMatrices(e.matrixWorld,t.matrix),t.matrixWorldInverse.copy(t.matrixWorld).invert()}super()
const o=this
let a=null,h=1,c=null,l="local-floor",u=1,f=null,d=null,p=null,v=null,m=null,g=null
const _="undefined"!=typeof XRWebGLBinding,M=new Pd,w={},S=e.getContextAttributes()
let x=null,y=null
const E=[],b=[],A=new cr
let T=null
const C=new Fa
C.viewport=new Cr
const L=new Fa
L.viewport=new Cr
const P=[C,L],N=new Hu
let D=null,U=null
this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(t){let e=E[t]
return void 0===e&&(e=new Wa,E[t]=e),e.getTargetRaySpace()},this.getControllerGrip=function(t){let e=E[t]
return void 0===e&&(e=new Wa,E[t]=e),e.getGripSpace()},this.getHand=function(t){let e=E[t]
return void 0===e&&(e=new Wa,E[t]=e),e.getHandSpace()},this.setFramebufferScaleFactor=function(t){h=t,!0===o.isPresenting},this.setReferenceSpaceType=function(t){l=t,!0===o.isPresenting},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(t){f=t},this.getBaseLayer=function(){return null!==v?v:m},this.getBinding=function(){return null===p&&_&&(p=new XRWebGLBinding(a,e)),p},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(r){if(a=r,null!==a){if(x=t.getRenderTarget(),a.addEventListener("select",n),a.addEventListener("selectstart",n),a.addEventListener("selectend",n),a.addEventListener("squeeze",n),a.addEventListener("squeezestart",n),a.addEventListener("squeezeend",n),a.addEventListener("end",i),a.addEventListener("inputsourceschange",s),!0!==S.xrCompatible&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let n=null,i=null,s=null
S.depth&&(s=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,n=S.stencil?Yi:qi,i=S.stencil?Vi:Oi)
const r={colorFormat:e.RGBA8,depthFormat:s,scaleFactor:h}
p=this.getBinding(),v=p.createProjectionLayer(r),a.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),y=new Pr(v.textureWidth,v.textureHeight,{format:Xi,type:Ni,depthTexture:new Pc(v.textureWidth,v.textureHeight,i,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:!1===v.ignoreDepthValues,resolveStencilBuffer:!1===v.ignoreDepthValues})}else{const n={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:h}
m=new XRWebGLLayer(a,e,n),a.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Pr(m.framebufferWidth,m.framebufferHeight,{format:Xi,type:Ni,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:!1===m.ignoreDepthValues,resolveStencilBuffer:!1===m.ignoreDepthValues})}y.isXRRenderTarget=!0,this.setFoveation(u),f=null,c=await a.requestReferenceSpace(l),F.setContext(a),F.start(),o.isPresenting=!0,o.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(null!==a)return a.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()}
const I=new ur,R=new ur
this.updateCamera=function(t){if(null===a)return
let e=t.near,n=t.far
null!==M.texture&&(M.depthNear>0&&(e=M.depthNear),M.depthFar>0&&(n=M.depthFar)),N.near=L.near=C.near=e,N.far=L.far=C.far=n,D===N.near&&U===N.far||(a.updateRenderState({depthNear:N.near,depthFar:N.far}),D=N.near,U=N.far),N.layers.mask=6|t.layers.mask,C.layers.mask=3&N.layers.mask,L.layers.mask=5&N.layers.mask
const i=t.parent,s=N.cameras
r(N,i)
for(let o=0;o<s.length;o++)r(s[o],i)
2===s.length?!function(t,e,n){I.setFromMatrixPosition(e.matrixWorld),R.setFromMatrixPosition(n.matrixWorld)
const i=I.distanceTo(R),s=e.projectionMatrix.elements,r=n.projectionMatrix.elements,o=s[14]/(s[10]-1),a=s[14]/(s[10]+1),h=(s[9]+1)/s[5],c=(s[9]-1)/s[5],l=(s[8]-1)/s[0],u=(r[8]+1)/r[0],f=o*l,d=o*u,p=i/(-l+u),v=p*-l
if(e.matrixWorld.decompose(t.position,t.quaternion,t.scale),t.translateX(v),t.translateZ(p),t.matrixWorld.compose(t.position,t.quaternion,t.scale),t.matrixWorldInverse.copy(t.matrixWorld).invert(),-1===s[10])t.projectionMatrix.copy(e.projectionMatrix),t.projectionMatrixInverse.copy(e.projectionMatrixInverse)
else{const e=o+p,n=a+p,s=f-v,r=d+(i-v),l=h*a/n*e,u=c*a/n*e
t.projectionMatrix.makePerspective(s,r,l,u,e,n),t.projectionMatrixInverse.copy(t.projectionMatrix).invert()}}(N,C,L):N.projectionMatrix.copy(C.projectionMatrix),function(t,e,n){null===n?t.matrix.copy(e.matrixWorld):(t.matrix.copy(n.matrixWorld),t.matrix.invert(),t.matrix.multiply(e.matrixWorld)),t.matrix.decompose(t.position,t.quaternion,t.scale),t.updateMatrixWorld(!0),t.projectionMatrix.copy(e.projectionMatrix),t.projectionMatrixInverse.copy(e.projectionMatrixInverse),t.isPerspectiveCamera&&(t.fov=2*ar*Math.atan(1/t.projectionMatrix.elements[5]),t.zoom=1)}(t,N,i)},this.getCamera=function(){return N},this.getFoveation=function(){if(null!==v||null!==m)return u},this.setFoveation=function(t){u=t,null!==v&&(v.fixedFoveation=t),null!==m&&void 0!==m.fixedFoveation&&(m.fixedFoveation=t)},this.hasDepthSensing=function(){return null!==M.texture},this.getDepthSensingMesh=function(){return M.getMesh(N)},this.getCameraTexture=function(t){return w[t]}
let O=null
const F=new Et
F.setAnimationLoop(function(e,n){if(d=n.getViewerPose(f||c),g=n,null!==d){const e=d.views
null!==m&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y))
let n=!1
e.length!==N.cameras.length&&(N.cameras.length=0,n=!0)
for(let s=0;s<e.length;s++){const i=e[s]
let r=null
if(null!==m)r=m.getViewport(i)
else{const e=p.getViewSubImage(v,i)
r=e.viewport,0===s&&(t.setRenderTargetTextures(y,e.colorTexture,e.depthStencilTexture),t.setRenderTarget(y))}let o=P[s]
void 0===o&&(o=new Fa,o.layers.enable(s),o.viewport=new Cr,P[s]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(r.x,r.y,r.width,r.height),0===s&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),!0===n&&N.cameras.push(o)}const i=a.enabledFeatures
if(i&&i.includes("depth-sensing")&&"gpu-optimized"==a.depthUsage&&_){p=o.getBinding()
const t=p.getDepthInformation(e[0])
t&&t.isValid&&t.texture&&M.init(t,a.renderState)}if(i&&i.includes("camera-access")&&_){t.state.unbindTexture(),p=o.getBinding()
for(let t=0;t<e.length;t++){const n=e[t].camera
if(n){let t=w[n]
t||(t=new Nc,w[n]=t)
const e=p.getCameraImage(n)
t.sourceTexture=e}}}}for(let t=0;t<E.length;t++){const e=b[t],i=E[t]
null!==e&&void 0!==i&&i.update(e,n,f||c)}O&&O(e,n),n.detectedPlanes&&o.dispatchEvent({type:"planesdetected",data:n}),g=null}),this.setAnimationLoop=function(t){O=t},this.dispose=function(){}}}const Dd=new mo,Ud=new ro
class Id{constructor(t={}){function e(){return null===z?Q:1}function n(t,e){return S.getContext(t,e)}function i(){ft=new Ft(Kt),ft.init(),Yt=new an(Kt,ft),dt=new Lt(Kt,ft,t,Yt),pt=new rn(Kt,ft),dt.reversedDepthBuffer&&N&&pt.buffers.depth.setReversed(!0),vt=new Gt(Kt),mt=new qe,gt=new on(Kt,ft,pt,mt,dt,Yt,vt),_t=new Nt(B),Mt=new Ot(B),wt=new bt(Kt),$t=new Tt(Kt,wt),St=new Ht(Kt,wt,vt,$t),xt=new kt(Kt,St,wt,vt),jt=new Vt(Kt,dt,gt),Rt=new Pt(mt),yt=new Xe(B,_t,Mt,ft,dt,$t,Rt),Dt=new hn(B,mt),Ut=new Ze,It=new nn(ft),Wt=new At(B,_t,Mt,pt,xt,D,T),zt=new sn(B,xt,dt),Jt=new cn(Kt,vt,dt,pt),Xt=new Ct(Kt,ft,vt),qt=new Bt(Kt,ft,vt),vt.programs=yt.programs,B.capabilities=dt,B.extensions=ft,B.properties=mt,B.renderLists=Ut,B.shadowMap=zt,B.state=pt,B.info=vt}function s(t){t.preventDefault(),G=!0}function r(){void 0,G=!1
const t=vt.autoReset,e=zt.enabled,n=zt.autoUpdate,s=zt.needsUpdate,r=zt.type
i(),vt.autoReset=t,zt.enabled=e,zt.autoUpdate=n,zt.needsUpdate=s,zt.type=r}function o(t){void 0}function a(t){const e=t.target
e.removeEventListener("dispose",a),function(t){(function(t){const e=mt.get(t).programs
void 0!==e&&(e.forEach(function(t){yt.releaseProgram(t)}),t.isShaderMaterial&&yt.releaseShaderCache(t))})(t),mt.remove(t)}(e)}function h(t,e,n){!0===t.transparent&&2===t.side&&!1===t.forceSinglePass?(t.side=1,t.needsUpdate=!0,_(t,e,n),t.side=0,t.needsUpdate=!0,_(t,e,n),t.side=2):_(t,e,n)}function c(){ee.stop()}function l(){ee.start()}function u(t,e,n,i){if(!1===t.visible)return
if(t.layers.test(e.layers))if(t.isGroup)n=t.renderOrder
else if(t.isLOD)!0===t.autoUpdate&&t.update(e)
else if(t.isLight)O.pushLight(t),t.castShadow&&O.pushShadow(t)
else if(t.isSprite){if(!t.frustumCulled||rt.intersectsSprite(t)){i&&lt.setFromMatrixPosition(t.matrixWorld).applyMatrix4(ht)
const e=xt.update(t),s=t.material
s.visible&&R.push(t,e,s,n,lt.z,null)}}else if((t.isMesh||t.isLine||t.isPoints)&&(!t.frustumCulled||rt.intersectsObject(t))){const e=xt.update(t),s=t.material
if(i&&(void 0!==t.boundingSphere?(null===t.boundingSphere&&t.computeBoundingSphere(),lt.copy(t.boundingSphere.center)):(null===e.boundingSphere&&e.computeBoundingSphere(),lt.copy(e.boundingSphere.center)),lt.applyMatrix4(t.matrixWorld).applyMatrix4(ht)),Array.isArray(s)){const i=e.groups
for(let r=0,o=i.length;r<o;r++){const o=i[r],a=s[o.materialIndex]
a&&a.visible&&R.push(t,e,a,n,lt.z,o)}}else s.visible&&R.push(t,e,s,n,lt.z,null)}const s=t.children
for(let r=0,o=s.length;r<o;r++)u(s[r],e,n,i)}function f(t,e,n,i){const s=t.opaque,r=t.transmissive,o=t.transparent
O.setupLightsView(n),!0===ot&&Rt.setGlobalState(B.clippingPlanes,n),i&&pt.viewport(X.copy(i)),s.length>0&&m(s,e,n),r.length>0&&m(r,e,n),o.length>0&&m(o,e,n),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function v(t,e,n,i){if(null!==(!0===n.isScene?n.overrideMaterial:null))return
void 0===O.state.transmissionRenderTarget[i.id]&&(O.state.transmissionRenderTarget[i.id]=new Pr(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?Hi:Ni,minFilter:Pi,samples:4,stencilBuffer:E,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:wr.workingColorSpace}))
const s=O.state.transmissionRenderTarget[i.id],r=i.viewport||X
s.setSize(r.z*B.transmissionResolutionScale,r.w*B.transmissionResolutionScale)
const o=B.getRenderTarget(),a=B.getActiveCubeFace(),h=B.getActiveMipmapLevel()
B.setRenderTarget(s),B.getClearColor($),J=B.getClearAlpha(),J<1&&B.setClearColor(16777215,.5),B.clear(),Zt&&Wt.render(n)
const c=B.toneMapping
B.toneMapping=0
const l=i.viewport
if(void 0!==i.viewport&&(i.viewport=void 0),O.setupLightsView(i),!0===ot&&Rt.setGlobalState(B.clippingPlanes,i),m(t,n,i),gt.updateMultisampleRenderTarget(s),gt.updateRenderTargetMipmap(s),!1===ft.has("WEBGL_multisampled_render_to_texture")){let t=!1
for(let s=0,r=e.length;s<r;s++){const r=e[s],o=r.object,a=r.geometry,h=r.material,c=r.group
if(2===h.side&&o.layers.test(i.layers)){const e=h.side
h.side=1,h.needsUpdate=!0,g(o,n,i,a,h,c),h.side=e,h.needsUpdate=!0,t=!0}}!0===t&&(gt.updateMultisampleRenderTarget(s),gt.updateRenderTargetMipmap(s))}B.setRenderTarget(o,a,h),B.setClearColor($,J),void 0!==l&&(i.viewport=l),B.toneMapping=c}function m(t,e,n){const i=!0===e.isScene?e.overrideMaterial:null
for(let s=0,r=t.length;s<r;s++){const r=t[s],o=r.object,a=r.geometry,h=r.group
let c=r.material
!0===c.allowOverride&&null!==i&&(c=i),o.layers.test(n.layers)&&g(o,e,n,a,c,h)}}function g(t,e,n,i,s,r){t.onBeforeRender(B,e,n,i,s,r),t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,t.matrixWorld),t.normalMatrix.getNormalMatrix(t.modelViewMatrix),s.onBeforeRender(B,e,n,i,t,r),!0===s.transparent&&2===s.side&&!1===s.forceSinglePass?(s.side=1,s.needsUpdate=!0,B.renderBufferDirect(n,e,i,s,t,r),s.side=0,s.needsUpdate=!0,B.renderBufferDirect(n,e,i,s,t,r),s.side=2):B.renderBufferDirect(n,e,i,s,t,r),t.onAfterRender(B,e,n,i,s,r)}function _(t,e,n){!0!==e.isScene&&(e=ut)
const i=mt.get(t),s=O.state.lights,r=O.state.shadowsArray,o=s.state.version,h=yt.getParameters(t,s.state,r,e,n),c=yt.getProgramCacheKey(h)
let l=i.programs
i.environment=t.isMeshStandardMaterial?e.environment:null,i.fog=e.fog,i.envMap=(t.isMeshStandardMaterial?Mt:_t).get(t.envMap||i.environment),i.envMapRotation=null!==i.environment&&null===t.envMap?e.environmentRotation:t.envMapRotation,void 0===l&&(t.addEventListener("dispose",a),l=new Map,i.programs=l)
let u=l.get(c)
if(void 0!==u){if(i.currentProgram===u&&i.lightsStateVersion===o)return w(t,h),u}else h.uniforms=yt.getUniforms(t),t.onBeforeCompile(h,B),u=yt.acquireProgram(h,c),l.set(c,u),i.uniforms=h.uniforms
const f=i.uniforms
return(t.isShaderMaterial||t.isRawShaderMaterial)&&!0!==t.clipping||(f.clippingPlanes=Rt.uniform),w(t,h),i.needsLights=function(t){return t.isMeshLambertMaterial||t.isMeshToonMaterial||t.isMeshPhongMaterial||t.isMeshStandardMaterial||t.isShadowMaterial||t.isShaderMaterial&&!0===t.lights}(t),i.lightsStateVersion=o,i.needsLights&&(f.ambientLightColor.value=s.state.ambient,f.lightProbe.value=s.state.probe,f.directionalLights.value=s.state.directional,f.directionalLightShadows.value=s.state.directionalShadow,f.spotLights.value=s.state.spot,f.spotLightShadows.value=s.state.spotShadow,f.rectAreaLights.value=s.state.rectArea,f.ltc_1.value=s.state.rectAreaLTC1,f.ltc_2.value=s.state.rectAreaLTC2,f.pointLights.value=s.state.point,f.pointLightShadows.value=s.state.pointShadow,f.hemisphereLights.value=s.state.hemi,f.directionalShadowMap.value=s.state.directionalShadowMap,f.directionalShadowMatrix.value=s.state.directionalShadowMatrix,f.spotShadowMap.value=s.state.spotShadowMap,f.spotLightMatrix.value=s.state.spotLightMatrix,f.spotLightMap.value=s.state.spotLightMap,f.pointShadowMap.value=s.state.pointShadowMap,f.pointShadowMatrix.value=s.state.pointShadowMatrix),i.currentProgram=u,i.uniformsList=null,u}function M(t){if(null===t.uniformsList){const e=t.currentProgram.getUniforms()
t.uniformsList=_d.seqWithValue(e.seq,t.uniforms)}return t.uniformsList}function w(t,e){const n=mt.get(t)
n.outputColorSpace=e.outputColorSpace,n.batching=e.batching,n.batchingColor=e.batchingColor,n.instancing=e.instancing,n.instancingColor=e.instancingColor,n.instancingMorph=e.instancingMorph,n.skinning=e.skinning,n.morphTargets=e.morphTargets,n.morphNormals=e.morphNormals,n.morphColors=e.morphColors,n.morphTargetsCount=e.morphTargetsCount,n.numClippingPlanes=e.numClippingPlanes,n.numIntersection=e.numClipIntersection,n.vertexAlphas=e.vertexAlphas,n.vertexTangents=e.vertexTangents,n.toneMapping=e.toneMapping}const{canvas:S=d(),context:x=null,depth:y=!0,stencil:E=!1,alpha:b=!1,antialias:A=!1,premultipliedAlpha:T=!0,preserveDrawingBuffer:C=!1,powerPreference:L="default",failIfMajorPerformanceCaveat:P=!1,reversedDepthBuffer:N=!1}=t
let D
if(this.isWebGLRenderer=!0,null!==x){if("undefined"!=typeof WebGLRenderingContext&&x instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.")
D=x.getContextAttributes().alpha}else D=b
const U=new Uint32Array(4),I=new Int32Array(4)
let R=null,O=null
const F=[],H=[]
this.domElement=S,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1
const B=this
let G=!1
this.ri=Gs
let V=0,k=0,z=null,W=-1,j=null
const X=new Cr,q=new Cr
let Y=null
const $=new Zo(0)
let J=0,Z=S.width,K=S.height,Q=1,tt=null,et=null
const nt=new Cr(0,0,Z,K),it=new Cr(0,0,Z,K)
let st=!1
const rt=new Xh
let ot=!1,at=!1
const ht=new ro,ct=new ur,lt=new Cr,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0}
let ft,dt,pt,vt,mt,gt,_t,Mt,wt,St,xt,yt,Dt,Ut,It,Rt,zt,Wt,jt,Xt,qt,Yt,$t,Jt,Zt=!1,Kt=x
try{const t={alpha:!0,depth:y,stencil:E,antialias:A,premultipliedAlpha:T,preserveDrawingBuffer:C,powerPreference:L,failIfMajorPerformanceCaveat:P}
if("setAttribute"in S&&S.setAttribute("data-engine",`three.js r${Dn}`),S.addEventListener("webglcontextlost",s,!1),S.addEventListener("webglcontextrestored",r,!1),S.addEventListener("webglcontextcreationerror",o,!1),null===Kt){const e="webgl2"
if(Kt=n(e,t),null===Kt)throw n(e)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(re){throw void 0,re}i()
const Qt=new Nd(B,Kt)
this.xr=Qt,this.getContext=function(){return Kt},this.getContextAttributes=function(){return Kt.getContextAttributes()},this.forceContextLoss=function(){const t=ft.get("WEBGL_lose_context")
t&&t.loseContext()},this.forceContextRestore=function(){const t=ft.get("WEBGL_lose_context")
t&&t.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(t){void 0!==t&&(Q=t,this.setSize(Z,K,!1))},this.getSize=function(t){return t.set(Z,K)},this.setSize=function(t,e,n=!0){if(Qt.isPresenting)return void 0,void 0
Z=t,K=e,S.width=Math.floor(t*Q),S.height=Math.floor(e*Q),!0===n&&(S.style.width=t+"px",S.style.height=e+"px"),this.setViewport(0,0,t,e)},this.getDrawingBufferSize=function(t){return t.set(Z*Q,K*Q).floor()},this.setDrawingBufferSize=function(t,e,n){Z=t,K=e,Q=n,S.width=Math.floor(t*n),S.height=Math.floor(e*n),this.setViewport(0,0,t,e)},this.getCurrentViewport=function(t){return t.copy(X)},this.getViewport=function(t){return t.copy(nt)},this.setViewport=function(t,e,n,i){t.isVector4?nt.set(t.x,t.y,t.z,t.w):nt.set(t,e,n,i),pt.viewport(X.copy(nt).multiplyScalar(Q).round())},this.getScissor=function(t){return t.copy(it)},this.setScissor=function(t,e,n,i){t.isVector4?it.set(t.x,t.y,t.z,t.w):it.set(t,e,n,i),pt.scissor(q.copy(it).multiplyScalar(Q).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(t){pt.setScissorTest(st=t)},this.setOpaqueSort=function(t){tt=t},this.setTransparentSort=function(t){et=t},this.getClearColor=function(t){return t.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(t=!0,e=!0,n=!0){let i=0
if(t){let t=!1
if(null!==z){const e=z.texture.format
t=e===Qi||e===Ki||e===Ji}if(t){const t=z.texture.type,e=t===Ni||t===Oi||t===Ii||t===Vi||t===Bi||t===Gi,n=Wt.getClearColor(),i=Wt.getClearAlpha(),s=n.r,r=n.g,o=n.b
e?(U[0]=s,U[1]=r,U[2]=o,U[3]=i,Kt.clearBufferuiv(Kt.COLOR,0,U)):(I[0]=s,I[1]=r,I[2]=o,I[3]=i,Kt.clearBufferiv(Kt.COLOR,0,I))}else i|=Kt.COLOR_BUFFER_BIT}e&&(i|=Kt.DEPTH_BUFFER_BIT),n&&(i|=Kt.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Kt.clear(i)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){S.removeEventListener("webglcontextlost",s,!1),S.removeEventListener("webglcontextrestored",r,!1),S.removeEventListener("webglcontextcreationerror",o,!1),Wt.dispose(),Ut.dispose(),It.dispose(),mt.dispose(),_t.dispose(),Mt.dispose(),xt.dispose(),$t.dispose(),Jt.dispose(),yt.dispose(),Qt.dispose(),Qt.removeEventListener("sessionstart",c),Qt.removeEventListener("sessionend",l),ee.stop()},this.renderBufferDirect=function(t,n,i,s,r,o){null===n&&(n=ut)
const a=r.isMesh&&r.matrixWorld.determinant()<0,h=function(t,e,n,i,s){!0!==e.isScene&&(e=ut),gt.resetTextureUnits()
const r=e.fog,o=i.isMeshStandardMaterial?e.environment:null,a=null===z?B.outputColorSpace:!0===z.isXRRenderTarget?z.texture.colorSpace:Vs,h=(i.isMeshStandardMaterial?Mt:_t).get(i.envMap||o),c=!0===i.vertexColors&&!!n.attributes.color&&4===n.attributes.color.itemSize,l=!!n.attributes.tangent&&(!!i.normalMap||i.anisotropy>0),u=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,d=!!n.morphAttributes.color
let p=0
i.toneMapped&&(null!==z&&!0!==z.isXRRenderTarget||(p=B.toneMapping))
const v=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,m=void 0!==v?v.length:0,g=mt.get(i),w=O.state.lights
if(!0===ot&&(!0===at||t!==j)){const e=t===j&&i.id===W
Rt.setState(i,t,e)}let S=!1
i.version===g.$?g.needsLights&&g.lightsStateVersion!==w.state.version||g.outputColorSpace!==a||s.isBatchedMesh&&!1===g.batching?S=!0:s.isBatchedMesh||!0!==g.batching?s.isBatchedMesh&&!0===g.batchingColor&&null===s.colorTexture||s.isBatchedMesh&&!1===g.batchingColor&&null!==s.colorTexture||s.isInstancedMesh&&!1===g.instancing?S=!0:s.isInstancedMesh||!0!==g.instancing?s.isSkinnedMesh&&!1===g.skinning?S=!0:s.isSkinnedMesh||!0!==g.skinning?s.isInstancedMesh&&!0===g.instancingColor&&null===s.instanceColor||s.isInstancedMesh&&!1===g.instancingColor&&null!==s.instanceColor||s.isInstancedMesh&&!0===g.instancingMorph&&null===s.morphTexture||s.isInstancedMesh&&!1===g.instancingMorph&&null!==s.morphTexture||g.envMap!==h||!0===i.fog&&g.fog!==r?S=!0:void 0===g.numClippingPlanes||g.numClippingPlanes===Rt.numPlanes&&g.numIntersection===Rt.numIntersection?(g.vertexAlphas!==c||g.vertexTangents!==l||g.morphTargets!==u||g.morphNormals!==f||g.morphColors!==d||g.toneMapping!==p||g.morphTargetsCount!==m)&&(S=!0):S=!0:S=!0:S=!0:S=!0:(S=!0,g.$=i.version)
let x=g.currentProgram
!0===S&&(x=_(i,e,s))
let y=!1,E=!1,b=!1
const A=x.getUniforms(),T=g.uniforms
if(pt.useProgram(x.program)&&(y=!0,E=!0,b=!0),i.id!==W&&(W=i.id,E=!0),y||j!==t){pt.buffers.depth.getReversed()&&!0!==t.reversedDepth&&(t.Vt=!0,t.updateProjectionMatrix()),A.setValue(Kt,"projectionMatrix",t.projectionMatrix),A.setValue(Kt,"viewMatrix",t.matrixWorldInverse)
const e=A.map.cameraPosition
void 0!==e&&e.setValue(Kt,ct.setFromMatrixPosition(t.matrixWorld)),dt.logarithmicDepthBuffer&&A.setValue(Kt,"logDepthBufFC",2/(Math.log(t.far+1)/Math.LN2)),(i.isMeshPhongMaterial||i.isMeshToonMaterial||i.isMeshLambertMaterial||i.isMeshBasicMaterial||i.isMeshStandardMaterial||i.isShaderMaterial)&&A.setValue(Kt,"isOrthographic",!0===t.isOrthographicCamera),j!==t&&(j=t,E=!0,b=!0)}if(s.isSkinnedMesh){A.setOptional(Kt,s,"bindMatrix"),A.setOptional(Kt,s,"bindMatrixInverse")
const t=s.skeleton
t&&(null===t.boneTexture&&t.computeBoneTexture(),A.setValue(Kt,"boneTexture",t.boneTexture,gt))}s.isBatchedMesh&&(A.setOptional(Kt,s,"batchingTexture"),A.setValue(Kt,"batchingTexture",s.Ft,gt),A.setOptional(Kt,s,"batchingIdTexture"),A.setValue(Kt,"batchingIdTexture",s.Ht,gt),A.setOptional(Kt,s,"batchingColorTexture"),null!==s.R&&A.setValue(Kt,"batchingColorTexture",s.R,gt))
const C=n.morphAttributes
var L,P
if(void 0===C.position&&void 0===C.normal&&void 0===C.color||jt.update(s,n,x),(E||g.receiveShadow!==s.receiveShadow)&&(g.receiveShadow=s.receiveShadow,A.setValue(Kt,"receiveShadow",s.receiveShadow)),i.isMeshGouraudMaterial&&null!==i.envMap&&(T.envMap.value=h,T.flipEnvMap.value=h.isCubeTexture&&!1===h.isRenderTargetTexture?-1:1),i.isMeshStandardMaterial&&null===i.envMap&&null!==e.environment&&(T.envMapIntensity.value=e.environmentIntensity),E&&(A.setValue(Kt,"toneMappingExposure",B.toneMappingExposure),g.needsLights&&(P=b,(L=T).ambientLightColor.needsUpdate=P,L.lightProbe.needsUpdate=P,L.directionalLights.needsUpdate=P,L.directionalLightShadows.needsUpdate=P,L.pointLights.needsUpdate=P,L.pointLightShadows.needsUpdate=P,L.spotLights.needsUpdate=P,L.spotLightShadows.needsUpdate=P,L.rectAreaLights.needsUpdate=P,L.hemisphereLights.needsUpdate=P),r&&!0===i.fog&&Dt.refreshFogUniforms(T,r),Dt.refreshMaterialUniforms(T,i,Q,K,O.state.transmissionRenderTarget[t.id]),_d.upload(Kt,M(g),T,gt)),i.isShaderMaterial&&!0===i.uniformsNeedUpdate&&(_d.upload(Kt,M(g),T,gt),i.uniformsNeedUpdate=!1),i.isSpriteMaterial&&A.setValue(Kt,"center",s.center),A.setValue(Kt,"modelViewMatrix",s.modelViewMatrix),A.setValue(Kt,"normalMatrix",s.normalMatrix),A.setValue(Kt,"modelMatrix",s.matrixWorld),i.isShaderMaterial||i.isRawShaderMaterial){const t=i.uniformsGroups
for(let e=0,n=t.length;e<n;e++){const n=t[e]
Jt.update(n,x),Jt.bind(n,x)}}return x}(t,n,i,s,r)
pt.setMaterial(s,a)
let c=i.index,l=1
if(!0===s.wireframe){if(c=St.getWireframeAttribute(i),void 0===c)return
l=2}const u=i.drawRange,f=i.attributes.position
let d=u.start*l,v=(u.start+u.count)*l
null!==o&&(d=Math.max(d,o.start*l),v=Math.min(v,(o.start+o.count)*l)),null!==c?(d=Math.max(d,0),v=Math.min(v,c.count)):null!=f&&(d=Math.max(d,0),v=Math.min(v,f.count))
const m=v-d
if(m<0||m===1/0)return
let g
$t.setup(r,s,h,i,c)
let w=Xt
if(null!==c&&(g=wt.get(c),w=qt,w.setIndex(g)),r.isMesh)!0===s.wireframe?(pt.setLineWidth(s.wireframeLinewidth*e()),w.setMode(Kt.LINES)):w.setMode(Kt.TRIANGLES)
else if(r.isLine){let t=s.linewidth
void 0===t&&(t=1),pt.setLineWidth(t*e()),r.isLineSegments?w.setMode(Kt.LINES):r.isLineLoop?w.setMode(Kt.LINE_LOOP):w.setMode(Kt.LINE_STRIP)}else r.isPoints?w.setMode(Kt.POINTS):r.isSprite&&w.setMode(Kt.TRIANGLES)
if(r.isBatchedMesh)if(null!==r.Kt)p("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),w.renderMultiDrawInstances(r.Jt,r.$t,r.Zt,r.Kt)
else if(ft.get("WEBGL_multi_draw"))w.renderMultiDraw(r.Jt,r.$t,r.Zt)
else{const t=r.Jt,e=r.$t,n=r.Zt,i=c?wt.get(c).bytesPerElement:1,o=mt.get(s).currentProgram.getUniforms()
for(let s=0;s<n;s++)o.setValue(Kt,"_gl_DrawID",s),w.render(t[s]/i,e[s])}else if(r.isInstancedMesh)w.renderInstances(d,m,r.count)
else if(i.isInstancedBufferGeometry){const t=void 0!==i.U?i.U:1/0,e=Math.min(i.instanceCount,t)
w.renderInstances(d,m,e)}else w.render(d,m)},this.compile=function(t,e,n=null){null===n&&(n=t),O=It.get(n),O.init(e),H.push(O),n.traverseVisible(function(t){t.isLight&&t.layers.test(e.layers)&&(O.pushLight(t),t.castShadow&&O.pushShadow(t))}),t!==n&&t.traverseVisible(function(t){t.isLight&&t.layers.test(e.layers)&&(O.pushLight(t),t.castShadow&&O.pushShadow(t))}),O.setupLights()
const i=new Set
return t.traverse(function(t){if(!(t.isMesh||t.isPoints||t.isLine||t.isSprite))return
const e=t.material
if(e)if(Array.isArray(e))for(let s=0;s<e.length;s++){const r=e[s]
h(r,n,t),i.add(r)}else h(e,n,t),i.add(e)}),O=H.pop(),i},this.compileAsync=function(t,e,n=null){const i=this.compile(t,e,n)
return new Promise(e=>{function n(){if(i.forEach(function(t){mt.get(t).currentProgram.isReady()&&i.delete(t)}),0===i.size)return e(t),void 0
setTimeout(n,10)}null!==ft.get("KHR_parallel_shader_compile")?n():setTimeout(n,10)})}
let te=null
const ee=new Et
ee.setAnimationLoop(function(t){te&&te(t)}),"undefined"!=typeof self&&ee.setContext(self),this.setAnimationLoop=function(t){te=t,Qt.setAnimationLoop(t),null===t?ee.stop():ee.start()},Qt.addEventListener("sessionstart",c),Qt.addEventListener("sessionend",l),this.render=function(t,e){if(void 0!==e&&!0!==e.isCamera)return void 0,void 0
if(!0===G)return
if(!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),null===e.parent&&!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),!0===Qt.enabled&&!0===Qt.isPresenting&&(!0===Qt.cameraAutoUpdate&&Qt.updateCamera(e),e=Qt.getCamera()),!0===t.isScene&&t.onBeforeRender(B,t,e,z),O=It.get(t,H.length),O.init(e),H.push(O),ht.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),rt.setFromProjectionMatrix(ht,er,e.reversedDepth),at=this.localClippingEnabled,ot=Rt.init(this.clippingPlanes,at),R=Ut.get(t,F.length),R.init(),F.push(R),!0===Qt.enabled&&!0===Qt.isPresenting){const t=B.xr.getDepthSensingMesh()
null!==t&&u(t,e,-1/0,B.sortObjects)}u(t,e,0,B.sortObjects),R.finish(),!0===B.sortObjects&&R.sort(tt,et),Zt=!1===Qt.enabled||!1===Qt.isPresenting||!1===Qt.hasDepthSensing(),Zt&&Wt.addToRenderList(R,t),this.info.render.frame++,!0===ot&&Rt.beginShadows()
const n=O.state.shadowsArray
zt.render(n,t,e),!0===ot&&Rt.endShadows(),!0===this.info.autoReset&&this.info.reset()
const i=R.opaque,s=R.transmissive
if(O.setupLights(),e.isArrayCamera){const n=e.cameras
if(s.length>0)for(let e=0,r=n.length;e<r;e++)v(i,s,t,n[e])
Zt&&Wt.render(t)
for(let e=0,i=n.length;e<i;e++){const i=n[e]
f(R,t,i,i.viewport)}}else s.length>0&&v(i,s,t,e),Zt&&Wt.render(t),f(R,t,e)
null!==z&&0===k&&(gt.updateMultisampleRenderTarget(z),gt.updateRenderTargetMipmap(z)),!0===t.isScene&&t.onAfterRender(B,t,e),$t.resetDefaultState(),W=-1,j=null,H.pop(),H.length>0?(O=H[H.length-1],!0===ot&&Rt.setGlobalState(B.clippingPlanes,O.state.camera)):O=null,F.pop(),R=F.length>0?F[F.length-1]:null},this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(t,e,n){const i=mt.get(t)
i.nt=!1===t.resolveDepthBuffer,!1===i.nt&&(i.it=!1),mt.get(t.texture).Y=e,mt.get(t.depthTexture).Y=i.nt?void 0:n,i.K=!0},this.setRenderTargetFramebuffer=function(t,e){const n=mt.get(t)
n.G=e,n.oi=void 0===e}
const ne=Kt.createFramebuffer()
this.setRenderTarget=function(t,e=0,n=0){z=t,V=e,k=n
let i=!0,s=null,r=!1,o=!1
if(t){const a=mt.get(t)
if(void 0!==a.oi)pt.bindFramebuffer(Kt.FRAMEBUFFER,null),i=!1
else if(void 0===a.G)gt.setupRenderTarget(t)
else if(a.K)gt.rebindTextures(t,mt.get(t.texture).Y,mt.get(t.depthTexture).Y)
else if(t.depthBuffer){const e=t.depthTexture
if(a.tt!==e){if(null!==e&&mt.has(e)&&(t.width!==e.image.width||t.height!==e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.")
gt.setupDepthRenderbuffer(t)}}const h=t.texture;(h.isData3DTexture||h.isDataArrayTexture||h.isCompressedArrayTexture)&&(o=!0)
const c=mt.get(t).G
t.isWebGLCubeRenderTarget?(s=Array.isArray(c[e])?c[e][n]:c[e],r=!0):s=t.samples>0&&!1===gt.useMultisampledRTT(t)?mt.get(t).W:Array.isArray(c)?c[n]:c,X.copy(t.viewport),q.copy(t.scissor),Y=t.scissorTest}else X.copy(nt).multiplyScalar(Q).floor(),q.copy(it).multiplyScalar(Q).floor(),Y=st
if(0!==n&&(s=ne),pt.bindFramebuffer(Kt.FRAMEBUFFER,s)&&i&&pt.drawBuffers(t,s),pt.viewport(X),pt.scissor(q),pt.setScissorTest(Y),r){const i=mt.get(t.texture)
Kt.framebufferTexture2D(Kt.FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,Kt.TEXTURE_CUBE_MAP_POSITIVE_X+e,i.Y,n)}else if(o){const i=e
for(let e=0;e<t.textures.length;e++){const s=mt.get(t.textures[e])
Kt.framebufferTextureLayer(Kt.FRAMEBUFFER,Kt.COLOR_ATTACHMENT0+e,s.Y,n,i)}}else if(null!==t&&0!==n){const e=mt.get(t.texture)
Kt.framebufferTexture2D(Kt.FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,Kt.TEXTURE_2D,e.Y,n)}W=-1},this.readRenderTargetPixels=function(t,e,n,i,s,r,o,a=0){if(!t||!t.isWebGLRenderTarget)return void 0,void 0
let h=mt.get(t).G
if(t.isWebGLCubeRenderTarget&&void 0!==o&&(h=h[o]),h){pt.bindFramebuffer(Kt.FRAMEBUFFER,h)
try{const o=t.textures[a],h=o.format,c=o.type
if(!dt.textureFormatReadable(h))return void 0,void 0
if(!dt.textureTypeReadable(c))return void 0,void 0
e>=0&&e<=t.width-i&&n>=0&&n<=t.height-s&&(t.textures.length>1&&Kt.readBuffer(Kt.COLOR_ATTACHMENT0+a),Kt.readPixels(e,n,i,s,Yt.convert(h),Yt.convert(c),r))}finally{const t=null!==z?mt.get(z).G:null
pt.bindFramebuffer(Kt.FRAMEBUFFER,t)}}},this.readRenderTargetPixelsAsync=async function(t,e,n,i,s,r,o,a=0){if(!t||!t.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
let h=mt.get(t).G
if(t.isWebGLCubeRenderTarget&&void 0!==o&&(h=h[o]),h){if(e>=0&&e<=t.width-i&&n>=0&&n<=t.height-s){pt.bindFramebuffer(Kt.FRAMEBUFFER,h)
const o=t.textures[a],c=o.format,l=o.type
if(!dt.textureFormatReadable(c))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.")
if(!dt.textureTypeReadable(l))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.")
const u=Kt.createBuffer()
Kt.bindBuffer(Kt.PIXEL_PACK_BUFFER,u),Kt.bufferData(Kt.PIXEL_PACK_BUFFER,r.byteLength,Kt.STREAM_READ),t.textures.length>1&&Kt.readBuffer(Kt.COLOR_ATTACHMENT0+a),Kt.readPixels(e,n,i,s,Yt.convert(c),Yt.convert(l),0)
const f=null!==z?mt.get(z).G:null
pt.bindFramebuffer(Kt.FRAMEBUFFER,f)
const d=Kt.fenceSync(Kt.SYNC_GPU_COMMANDS_COMPLETE,0)
return Kt.flush(),await function(t,e){return new Promise(function(n,i){setTimeout(function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:i()
break
case t.TIMEOUT_EXPIRED:setTimeout(s,4)
break
default:n()}},4)})}(Kt,d),Kt.bindBuffer(Kt.PIXEL_PACK_BUFFER,u),Kt.getBufferSubData(Kt.PIXEL_PACK_BUFFER,0,r),Kt.deleteBuffer(u),Kt.deleteSync(d),r}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(t,e=null,n=0){const i=Math.pow(2,-n),s=Math.floor(t.image.width*i),r=Math.floor(t.image.height*i),o=null!==e?e.x:0,a=null!==e?e.y:0
gt.setTexture2D(t,0),Kt.copyTexSubImage2D(Kt.TEXTURE_2D,n,0,0,o,a,s,r),pt.unbindTexture()}
const ie=Kt.createFramebuffer(),se=Kt.createFramebuffer()
this.copyTextureToTexture=function(t,e,n=null,i=null,s=0,r=null){let o,a,h,c,l,u,f,d,v
null===r&&(0!==s?(p("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),r=s,s=0):r=0)
const m=t.isCompressedTexture?t.mipmaps[r]:t.image
if(null!==n)o=n.max.x-n.min.x,a=n.max.y-n.min.y,h=n.isBox3?n.max.z-n.min.z:1,c=n.min.x,l=n.min.y,u=n.isBox3?n.min.z:0
else{const e=Math.pow(2,-s)
o=Math.floor(m.width*e),a=Math.floor(m.height*e),h=t.isDataArrayTexture?m.depth:t.isData3DTexture?Math.floor(m.depth*e):1,c=0,l=0,u=0}null!==i?(f=i.x,d=i.y,v=i.z):(f=0,d=0,v=0)
const g=Yt.convert(e.format),_=Yt.convert(e.type)
let M
e.isData3DTexture?(gt.setTexture3D(e,0),M=Kt.TEXTURE_3D):e.isDataArrayTexture||e.isCompressedArrayTexture?(gt.setTexture2DArray(e,0),M=Kt.TEXTURE_2D_ARRAY):(gt.setTexture2D(e,0),M=Kt.TEXTURE_2D),Kt.pixelStorei(Kt.UNPACK_FLIP_Y_WEBGL,e.flipY),Kt.pixelStorei(Kt.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.premultiplyAlpha),Kt.pixelStorei(Kt.UNPACK_ALIGNMENT,e.unpackAlignment)
const w=Kt.getParameter(Kt.UNPACK_ROW_LENGTH),S=Kt.getParameter(Kt.UNPACK_IMAGE_HEIGHT),x=Kt.getParameter(Kt.UNPACK_SKIP_PIXELS),y=Kt.getParameter(Kt.UNPACK_SKIP_ROWS),E=Kt.getParameter(Kt.UNPACK_SKIP_IMAGES)
Kt.pixelStorei(Kt.UNPACK_ROW_LENGTH,m.width),Kt.pixelStorei(Kt.UNPACK_IMAGE_HEIGHT,m.height),Kt.pixelStorei(Kt.UNPACK_SKIP_PIXELS,c),Kt.pixelStorei(Kt.UNPACK_SKIP_ROWS,l),Kt.pixelStorei(Kt.UNPACK_SKIP_IMAGES,u)
const b=t.isDataArrayTexture||t.isData3DTexture,A=e.isDataArrayTexture||e.isData3DTexture
if(t.isDepthTexture){const n=mt.get(t),i=mt.get(e),p=mt.get(n.Z),m=mt.get(i.Z)
pt.bindFramebuffer(Kt.READ_FRAMEBUFFER,p.G),pt.bindFramebuffer(Kt.DRAW_FRAMEBUFFER,m.G)
for(let g=0;g<h;g++)b&&(Kt.framebufferTextureLayer(Kt.READ_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,mt.get(t).Y,s,u+g),Kt.framebufferTextureLayer(Kt.DRAW_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,mt.get(e).Y,r,v+g)),Kt.blitFramebuffer(c,l,o,a,f,d,o,a,Kt.DEPTH_BUFFER_BIT,Kt.NEAREST)
pt.bindFramebuffer(Kt.READ_FRAMEBUFFER,null),pt.bindFramebuffer(Kt.DRAW_FRAMEBUFFER,null)}else if(0!==s||t.isRenderTargetTexture||mt.has(t)){const n=mt.get(t),i=mt.get(e)
pt.bindFramebuffer(Kt.READ_FRAMEBUFFER,ie),pt.bindFramebuffer(Kt.DRAW_FRAMEBUFFER,se)
for(let t=0;t<h;t++)b?Kt.framebufferTextureLayer(Kt.READ_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,n.Y,s,u+t):Kt.framebufferTexture2D(Kt.READ_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,Kt.TEXTURE_2D,n.Y,s),A?Kt.framebufferTextureLayer(Kt.DRAW_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,i.Y,r,v+t):Kt.framebufferTexture2D(Kt.DRAW_FRAMEBUFFER,Kt.COLOR_ATTACHMENT0,Kt.TEXTURE_2D,i.Y,r),0!==s?Kt.blitFramebuffer(c,l,o,a,f,d,o,a,Kt.COLOR_BUFFER_BIT,Kt.NEAREST):A?Kt.copyTexSubImage3D(M,r,f,d,v+t,c,l,o,a):Kt.copyTexSubImage2D(M,r,f,d,c,l,o,a)
pt.bindFramebuffer(Kt.READ_FRAMEBUFFER,null),pt.bindFramebuffer(Kt.DRAW_FRAMEBUFFER,null)}else A?t.isDataTexture||t.isData3DTexture?Kt.texSubImage3D(M,r,f,d,v,o,a,h,g,_,m.data):e.isCompressedArrayTexture?Kt.compressedTexSubImage3D(M,r,f,d,v,o,a,h,g,m.data):Kt.texSubImage3D(M,r,f,d,v,o,a,h,g,_,m):t.isDataTexture?Kt.texSubImage2D(Kt.TEXTURE_2D,r,f,d,o,a,g,_,m.data):t.isCompressedTexture?Kt.compressedTexSubImage2D(Kt.TEXTURE_2D,r,f,d,m.width,m.height,g,m.data):Kt.texSubImage2D(Kt.TEXTURE_2D,r,f,d,o,a,g,_,m)
Kt.pixelStorei(Kt.UNPACK_ROW_LENGTH,w),Kt.pixelStorei(Kt.UNPACK_IMAGE_HEIGHT,S),Kt.pixelStorei(Kt.UNPACK_SKIP_PIXELS,x),Kt.pixelStorei(Kt.UNPACK_SKIP_ROWS,y),Kt.pixelStorei(Kt.UNPACK_SKIP_IMAGES,E),0===r&&e.generateMipmaps&&Kt.generateMipmap(M),pt.unbindTexture()},this.initRenderTarget=function(t){void 0===mt.get(t).G&&gt.setupRenderTarget(t)},this.initTexture=function(t){t.isCubeTexture?gt.setTextureCube(t,0):t.isData3DTexture?gt.setTexture3D(t,0):t.isDataArrayTexture||t.isCompressedArrayTexture?gt.setTexture2DArray(t,0):gt.setTexture2D(t,0),pt.unbindTexture()},this.resetState=function(){V=0,k=0,z=null,pt.reset(),$t.reset()},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return er}get outputColorSpace(){return this.ri}set outputColorSpace(t){this.ri=t
const e=this.getContext()
e.drawingBufferColorSpace=wr.St(t),e.unpackColorSpace=wr.xt()}}const Rd=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:4,AddEquation:Gn,AddOperation:2,AdditiveAnimationBlendMode:Hs,AdditiveBlending:2,AgXToneMapping:6,AlphaFormat:Wi,AlwaysCompare:519,AlwaysDepth:1,AlwaysStencilFunc:519,AmbientLight:Su,AnimationAction:cf,AnimationClip:$l,AnimationLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){const s=this,r=new nu(this.manager)
r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(t,function(n){try{e(s.parse(JSON.parse(n)))}catch(r){i?i(r):void 0,s.manager.itemError(t)}},n,i)}parse(t){const e=[]
for(let n=0;n<t.length;n++){const i=$l.parse(t[n])
e.push(i)}return e}},AnimationMixer:class extends ir{constructor(t){super(),this.Pn=t,this.ai(),this.hi=0,this.time=0,this.timeScale=1}ci(t,e){const n=t.fn||this.Pn,i=t.un.tracks,s=i.length,r=t.vn,o=t.pn,a=n.uuid,h=this.li
let c=h[a]
void 0===c&&(c={},h[a]=c)
for(let l=0;l!==s;++l){const t=i[l],s=t.name
let h=c[s]
if(void 0!==h)++h.referenceCount,r[l]=h
else{if(h=r[l],void 0!==h){null===h.mn&&(++h.referenceCount,this.ui(h,a,s))
continue}const i=e&&e.vn[l].binding.parsedPath
h=new Ju(hf.create(n,s,i),t.ValueTypeName,t.getValueSize()),++h.referenceCount,this.ui(h,a,s),r[l]=h}o[l].resultBuffer=h.buffer}}En(t){if(!this.An(t)){if(null===t.mn){const e=(t.fn||this.Pn).uuid,n=t.un.uuid,i=this.fi[n]
this.ci(t,i&&i.knownActions[0]),this.di(t,n,e)}const e=t.vn
for(let t=0,n=e.length;t!==n;++t){const n=e[t]
0===n.useCount++&&(this.pi(n),n.saveOriginalState())}this.mi(t)}}bn(t){if(this.An(t)){const e=t.vn
for(let t=0,n=e.length;t!==n;++t){const n=e[t]
0===--n.useCount&&(n.restoreOriginalState(),this.gi(n))}this._i(t)}}ai(){this.Mi=[],this.wi=0,this.fi={},this.cn=[],this.Si=0,this.li={},this.xi=[],this.yi=0
const t=this
this.stats={actions:{get total(){return t.Mi.length},get inUse(){return t.wi}},bindings:{get total(){return t.cn.length},get inUse(){return t.Si}},controlInterpolants:{get total(){return t.xi.length},get inUse(){return t.yi}}}}An(t){const e=t.mn
return null!==e&&e<this.wi}di(t,e,n){const i=this.Mi,s=this.fi
let r=s[e]
if(void 0===r)r={knownActions:[t],actionByRoot:{}},t.gn=0,s[e]=r
else{const e=r.knownActions
t.gn=e.length,e.push(t)}t.mn=i.length,i.push(t),r.actionByRoot[n]=t}Ei(t){const e=this.Mi,n=e[e.length-1],i=t.mn
n.mn=i,e[i]=n,e.pop(),t.mn=null
const s=t.un.uuid,r=this.fi,o=r[s],a=o.knownActions,h=a[a.length-1],c=t.gn
h.gn=c,a[c]=h,a.pop(),t.gn=null,delete o.actionByRoot[(t.fn||this.Pn).uuid],0===a.length&&delete r[s],this.bi(t)}bi(t){const e=t.vn
for(let n=0,i=e.length;n!==i;++n){const t=e[n]
0===--t.referenceCount&&this.Ai(t)}}mi(t){const e=this.Mi,n=t.mn,i=this.wi++,s=e[i]
t.mn=i,e[i]=t,s.mn=n,e[n]=s}_i(t){const e=this.Mi,n=t.mn,i=--this.wi,s=e[i]
t.mn=i,e[i]=t,s.mn=n,e[n]=s}ui(t,e,n){const i=this.li,s=this.cn
let r=i[e]
void 0===r&&(r={},i[e]=r),r[n]=t,t.mn=s.length,s.push(t)}Ai(t){const e=this.cn,n=t.binding,i=n.rootNode.uuid,s=n.path,r=this.li,o=r[i],a=e[e.length-1],h=t.mn
a.mn=h,e[h]=a,e.pop(),delete o[s],0===Object.keys(o).length&&delete r[i]}pi(t){const e=this.cn,n=t.mn,i=this.Si++,s=e[i]
t.mn=i,e[i]=t,s.mn=n,e[n]=s}gi(t){const e=this.cn,n=t.mn,i=--this.Si,s=e[i]
t.mn=i,e[i]=t,s.mn=n,e[n]=s}Ln(){const t=this.xi,e=this.yi++
let n=t[e]
return void 0===n&&(n=new Bl(new Float32Array(2),new Float32Array(2),1,lf),n.Ti=e,t[e]=n),n}Cn(t){const e=this.xi,n=t.Ti,i=--this.yi,s=e[i]
t.Ti=i,e[i]=t,s.Ti=n,e[n]=s}clipAction(t,e,n){const i=e||this.Pn,s=i.uuid
let r="string"==typeof t?$l.findByName(i,t):t
const o=null!==r?r.uuid:t,a=this.fi[o]
let h=null
if(void 0===n&&(n=null!==r?r.blendMode:2500),void 0!==a){const t=a.actionByRoot[s]
if(void 0!==t&&t.blendMode===n)return t
h=a.knownActions[0],null===r&&(r=h.un)}if(null===r)return null
const c=new cf(this,r,e,n)
return this.ci(c,h),this.di(c,o,s),c}existingAction(t,e){const n=e||this.Pn,i=n.uuid,s="string"==typeof t?$l.findByName(n,t):t,r=s?s.uuid:t,o=this.fi[r]
return void 0!==o&&o.actionByRoot[i]||null}stopAllAction(){const t=this.Mi
for(let e=this.wi-1;e>=0;--e)t[e].stop()
return this}update(t){t*=this.timeScale
const e=this.Mi,n=this.wi,i=this.time+=t,s=Math.sign(t),r=this.hi^=1
for(let h=0;h!==n;++h)e[h].Nn(i,t,s,r)
const o=this.cn,a=this.Si
for(let h=0;h!==a;++h)o[h].apply(r)
return this}setTime(t){this.time=0
for(let e=0;e<this.Mi.length;e++)this.Mi[e].time=0
return this.update(t)}getRoot(){return this.Pn}uncacheClip(t){const e=this.Mi,n=t.uuid,i=this.fi,s=i[n]
if(void 0!==s){const t=s.knownActions
for(let n=0,i=t.length;n!==i;++n){const i=t[n]
this.bn(i)
const s=i.mn,r=e[e.length-1]
i.mn=null,i.gn=null,r.mn=s,e[s]=r,e.pop(),this.bi(i)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this.fi
for(const s in n){const t=n[s].actionByRoot[e]
void 0!==t&&(this.bn(t),this.Ei(t))}const i=this.li[e]
if(void 0!==i)for(const s in i){const t=i[s]
t.restoreOriginalState(),this.Ai(t)}}uncacheAction(t,e){const n=this.existingAction(t,e)
null!==n&&(this.bn(n),this.Ei(n))}},AnimationObjectGroup:class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=s(),this.Ci=Array.prototype.slice.call(arguments),this.nCachedObjects_=0
const t={}
this.Li=t
for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n
this.Pi=[],this.Ni=[],this.cn=[],this.Di={}
const e=this
this.stats={objects:{get total(){return e.Ci.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e.cn.length}}}add(){const t=this.Ci,e=this.Li,n=this.Pi,i=this.Ni,s=this.cn,r=s.length
let o,a=t.length,h=this.nCachedObjects_
for(let c=0,l=arguments.length;c!==l;++c){const l=arguments[c],u=l.uuid
let f=e[u]
if(void 0===f){f=a++,e[u]=f,t.push(l)
for(let t=0,e=r;t!==e;++t)s[t].push(new hf(l,n[t],i[t]))}else if(f<h){o=t[f]
const a=--h,c=t[a]
e[c.uuid]=f,t[f]=c,e[u]=a,t[a]=l
for(let t=0,e=r;t!==e;++t){const e=s[t],r=e[a]
let o=e[f]
e[f]=r,void 0===o&&(o=new hf(l,n[t],i[t])),e[a]=o}}else t[f]!==o,0}this.nCachedObjects_=h}remove(){const t=this.Ci,e=this.Li,n=this.cn,i=n.length
let s=this.nCachedObjects_
for(let r=0,o=arguments.length;r!==o;++r){const o=arguments[r],a=o.uuid,h=e[a]
if(void 0!==h&&h>=s){const r=s++,c=t[r]
e[c.uuid]=h,t[h]=c,e[a]=r,t[r]=o
for(let t=0,e=i;t!==e;++t){const e=n[t],i=e[r],s=e[h]
e[h]=i,e[r]=s}}}this.nCachedObjects_=s}uncache(){const t=this.Ci,e=this.Li,n=this.cn,i=n.length
let s=this.nCachedObjects_,r=t.length
for(let o=0,a=arguments.length;o!==a;++o){const a=arguments[o].uuid,h=e[a]
if(void 0!==h)if(delete e[a],h<s){const o=--s,a=t[o],c=--r,l=t[c]
e[a.uuid]=h,t[h]=a,e[l.uuid]=o,t[o]=l,t.pop()
for(let t=0,e=i;t!==e;++t){const e=n[t],i=e[o],s=e[c]
e[h]=i,e[o]=s,e.pop()}}else{const s=--r,o=t[s]
s>0&&(e[o.uuid]=h),t[h]=o,t.pop()
for(let t=0,e=i;t!==e;++t){const e=n[t]
e[h]=e[s],e.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){const n=this.Di
let i=n[t]
const s=this.cn
if(void 0!==i)return s[i]
const r=this.Pi,o=this.Ni,a=this.Ci,h=a.length,c=this.nCachedObjects_,l=new Array(h)
i=s.length,n[t]=i,r.push(t),o.push(e),s.push(l)
for(let u=c,f=a.length;u!==f;++u){const n=a[u]
l[u]=new hf(n,t,e)}return l}unsubscribe_(t){const e=this.Di,n=e[t]
if(void 0!==n){const i=this.Pi,s=this.Ni,r=this.cn,o=r.length-1,a=r[o]
e[t[o]]=n,r[n]=a,r.pop(),s[n]=s[o],s.pop(),i[n]=i[o],i.pop()}}},AnimationUtils:class{static convertArray(t,e){return ft(t,e)}static isTypedArray(t){return dt(t)}static getKeyframeOrder(t){return pt(t)}static sortedArray(t,e,n){return vt(t,e,n)}static flattenJSON(t,e,n,i){mt(t,e,n,i)}static subclip(t,e,n,i,s=30){return function(t,e,n,i,s=30){const r=t.clone()
r.name=e
const o=[]
for(let h=0;h<r.tracks.length;++h){const t=r.tracks[h],e=t.getValueSize(),a=[],c=[]
for(let r=0;r<t.times.length;++r){const o=t.times[r]*s
if(!(o<n||o>=i)){a.push(t.times[r])
for(let n=0;n<e;++n)c.push(t.values[r*e+n])}}0!==a.length&&(t.times=ft(a,t.times.constructor),t.values=ft(c,t.values.constructor),o.push(t))}r.tracks=o
let a=1/0
for(let h=0;h<r.tracks.length;++h)a>r.tracks[h].times[0]&&(a=r.tracks[h].times[0])
for(let h=0;h<r.tracks.length;++h)r.tracks[h].shift(-1*a)
return r.resetDuration(),r}(t,e,n,i,s)}static makeClipAdditive(t,e=0,n=t,i=30){return function(t,e=0,n=t,i=30){i<=0&&(i=30)
const s=n.tracks.length,r=e/i
for(let o=0;o<s;++o){const e=n.tracks[o],i=e.ValueTypeName
if("bool"===i||"string"===i)continue
const s=t.tracks.find(function(t){return t.name===e.name&&t.ValueTypeName===i})
if(void 0===s)continue
let a=0
const h=e.getValueSize()
e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(a=h/3)
let c=0
const l=s.getValueSize()
s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(c=l/3)
const u=e.times.length-1
let f
if(r<=e.times[0]){const t=a,n=h-a
f=e.values.slice(t,n)}else if(r>=e.times[u]){const t=u*h+a,n=t+h-a
f=e.values.slice(t,n)}else{const t=e.createInterpolant(),n=a,i=h-a
t.evaluate(r),f=t.resultBuffer.slice(n,i)}"quaternion"===i&&(new lr).fromArray(f).normalize().conjugate().toArray(f)
const d=s.times.length
for(let t=0;t<d;++t){const e=t*l+c
if("quaternion"===i)lr.multiplyQuaternionsFlat(s.values,e,f,0,s.values,e)
else{const t=l-2*c
for(let n=0;n<t;++n)s.values[e+n]-=f[n]}}}return t.blendMode=Hs,t}(t,e,n,i)}},ArcCurve:jc,ArrayCamera:Hu,ArrowHelper:class extends Uo{constructor(t=new ur(0,0,1),e=new ur(0,0,0),n=1,i=16776960,s=.2*n,r=.2*s){super(),this.type="ArrowHelper",void 0===Hf&&(Hf=new ga,Hf.setAttribute("position",new ca([0,0,0,0,1,0],3)),Bf=new Rc(.5,1,5,1),Bf.translate(0,-.5,0)),this.position.copy(e),this.line=new gc(Hf,new cc({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new La(Bf,new ea({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,r)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1)
else if(t.y<-.99999)this.quaternion.set(1,0,0,0)
else{Ff.set(t.z,0,-t.x).normalize()
const e=Math.acos(t.y)
this.quaternion.setFromAxisAngle(Ff,e)}}setLength(t,e=.2*t,n=.2*e){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},AttachedBindMode:pi,Audio:ju,AudioAnalyser:class{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0
const e=this.getFrequencyData()
for(let n=0;n<e.length;n++)t+=e[n]
return t/e.length}},AudioContext:Iu,AudioListener:class extends Uo{constructor(){super(),this.type="AudioListener",this.context=Iu.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this.Ui=new Bu}getInput(){return this.gain}removeFilter(){return null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t)
const e=this.context.listener
if(this.timeDelta=this.Ui.getDelta(),this.matrixWorld.decompose(Gu,Vu,ku),zu.set(0,0,-1).applyQuaternion(Vu),Wu.set(0,1,0).applyQuaternion(Vu),e.positionX){const t=this.context.currentTime+this.timeDelta
e.positionX.linearRampToValueAtTime(Gu.x,t),e.positionY.linearRampToValueAtTime(Gu.y,t),e.positionZ.linearRampToValueAtTime(Gu.z,t),e.forwardX.linearRampToValueAtTime(zu.x,t),e.forwardY.linearRampToValueAtTime(zu.y,t),e.forwardZ.linearRampToValueAtTime(zu.z,t),e.upX.linearRampToValueAtTime(Wu.x,t),e.upY.linearRampToValueAtTime(Wu.y,t),e.upZ.linearRampToValueAtTime(Wu.z,t)}else e.setPosition(Gu.x,Gu.y,Gu.z),e.setOrientation(zu.x,zu.y,zu.z,Wu.x,Wu.y,Wu.z)}},AudioLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){function s(e){i?i(e):void 0,r.manager.itemError(t)}const r=this,o=new nu(this.manager)
o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(t){try{const n=t.slice(0)
Iu.getContext().decodeAudioData(n,function(t){e(t)}).catch(s)}catch(n){s(n)}},n,i)}},AxesHelper:class extends wc{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=new ga
n.setAttribute("position",new ca(e,3)),n.setAttribute("color",new ca([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3)),super(n,new cc({vertexColors:!0,toneMapped:!1})),this.type="AxesHelper"}setColors(t,e,n){const i=new Zo,s=this.geometry.attributes.color.array
return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}},BackSide:1,BasicDepthPacking:3200,BasicShadowMap:0,BatchedMesh:hc,Bone:bh,BooleanKeyframeTrack:kl,Box2:class{constructor(t=new cr(1/0,1/0),e=new cr(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty()
for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e])
return this}setFromCenterAndSize(t,e){const n=mf.copy(e).multiplyScalar(.5)
return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mf).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Box3:Ur,Box3Helper:class extends wc{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new ga
i.setIndex(new oa(n,1)),i.setAttribute("position",new ca([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3)),super(i,new cc({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box
e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}},BoxGeometry:Pa,BoxHelper:class extends wc{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new ga
s.setIndex(new oa(n,1)),s.setAttribute("position",new oa(i,3)),super(s,new cc({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(void 0!==this.object&&Of.setFromObject(this.object),Of.isEmpty())return
const t=Of.min,e=Of.max,n=this.geometry.attributes.position,i=n.array
i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=t.x,i[4]=e.y,i[5]=e.z,i[6]=t.x,i[7]=t.y,i[8]=e.z,i[9]=e.x,i[10]=t.y,i[11]=e.z,i[12]=e.x,i[13]=e.y,i[14]=t.z,i[15]=t.x,i[16]=e.y,i[17]=t.z,i[18]=t.x,i[19]=t.y,i[20]=t.z,i[21]=e.x,i[22]=t.y,i[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}},BufferAttribute:oa,BufferGeometry:ga,BufferGeometryLoader:Cu,ByteType:Di,Cache:Jl,Camera:Ua,CameraHelper:class extends wc{constructor(t){function e(t,e){n(t),n(e)}function n(t){r.push(0,0,0),o.push(0,0,0),void 0===a[t]&&(a[t]=[]),a[t].push(r.length/3-1)}const i=new ga,s=new cc({color:16777215,vertexColors:!0,toneMapped:!1}),r=[],o=[],a={}
e("n1","n2"),e("n2","n4"),e("n4","n3"),e("n3","n1"),e("f1","f2"),e("f2","f4"),e("f4","f3"),e("f3","f1"),e("n1","f1"),e("n2","f2"),e("n3","f3"),e("n4","f4"),e("p","n1"),e("p","n2"),e("p","n3"),e("p","n4"),e("u1","u2"),e("u2","u3"),e("u3","u1"),e("c","t"),e("p","c"),e("cn1","cn2"),e("cn3","cn4"),e("cf1","cf2"),e("cf3","cf4"),i.setAttribute("position",new ca(r,3)),i.setAttribute("color",new ca(o,3)),super(i,s),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update()
const h=new Zo(16755200),c=new Zo(16711680),l=new Zo(43775),u=new Zo(16777215),f=new Zo(3355443)
this.setColors(h,c,l,u,f)}setColors(t,e,n,i,s){const r=this.geometry.getAttribute("color")
return r.setXYZ(0,t.r,t.g,t.b),r.setXYZ(1,t.r,t.g,t.b),r.setXYZ(2,t.r,t.g,t.b),r.setXYZ(3,t.r,t.g,t.b),r.setXYZ(4,t.r,t.g,t.b),r.setXYZ(5,t.r,t.g,t.b),r.setXYZ(6,t.r,t.g,t.b),r.setXYZ(7,t.r,t.g,t.b),r.setXYZ(8,t.r,t.g,t.b),r.setXYZ(9,t.r,t.g,t.b),r.setXYZ(10,t.r,t.g,t.b),r.setXYZ(11,t.r,t.g,t.b),r.setXYZ(12,t.r,t.g,t.b),r.setXYZ(13,t.r,t.g,t.b),r.setXYZ(14,t.r,t.g,t.b),r.setXYZ(15,t.r,t.g,t.b),r.setXYZ(16,t.r,t.g,t.b),r.setXYZ(17,t.r,t.g,t.b),r.setXYZ(18,t.r,t.g,t.b),r.setXYZ(19,t.r,t.g,t.b),r.setXYZ(20,t.r,t.g,t.b),r.setXYZ(21,t.r,t.g,t.b),r.setXYZ(22,t.r,t.g,t.b),r.setXYZ(23,t.r,t.g,t.b),r.setXYZ(24,e.r,e.g,e.b),r.setXYZ(25,e.r,e.g,e.b),r.setXYZ(26,e.r,e.g,e.b),r.setXYZ(27,e.r,e.g,e.b),r.setXYZ(28,e.r,e.g,e.b),r.setXYZ(29,e.r,e.g,e.b),r.setXYZ(30,e.r,e.g,e.b),r.setXYZ(31,e.r,e.g,e.b),r.setXYZ(32,n.r,n.g,n.b),r.setXYZ(33,n.r,n.g,n.b),r.setXYZ(34,n.r,n.g,n.b),r.setXYZ(35,n.r,n.g,n.b),r.setXYZ(36,n.r,n.g,n.b),r.setXYZ(37,n.r,n.g,n.b),r.setXYZ(38,i.r,i.g,i.b),r.setXYZ(39,i.r,i.g,i.b),r.setXYZ(40,s.r,s.g,s.b),r.setXYZ(41,s.r,s.g,s.b),r.setXYZ(42,s.r,s.g,s.b),r.setXYZ(43,s.r,s.g,s.b),r.setXYZ(44,s.r,s.g,s.b),r.setXYZ(45,s.r,s.g,s.b),r.setXYZ(46,s.r,s.g,s.b),r.setXYZ(47,s.r,s.g,s.b),r.setXYZ(48,s.r,s.g,s.b),r.setXYZ(49,s.r,s.g,s.b),r.needsUpdate=!0,this}update(){const t=this.geometry,e=this.pointMap
let n,i
if(Rf.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),!0===this.camera.reversedDepth)n=1,i=0
else if(this.camera.coordinateSystem===er)n=-1,i=1
else{if(this.camera.coordinateSystem!==nr)throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem)
n=0,i=1}xt("c",e,t,Rf,0,0,n),xt("t",e,t,Rf,0,0,i),xt("n1",e,t,Rf,-1,-1,n),xt("n2",e,t,Rf,1,-1,n),xt("n3",e,t,Rf,-1,1,n),xt("n4",e,t,Rf,1,1,n),xt("f1",e,t,Rf,-1,-1,i),xt("f2",e,t,Rf,1,-1,i),xt("f3",e,t,Rf,-1,1,i),xt("f4",e,t,Rf,1,1,i),xt("u1",e,t,Rf,.7,1.1,n),xt("u2",e,t,Rf,-.7,1.1,n),xt("u3",e,t,Rf,0,2,n),xt("cf1",e,t,Rf,-1,0,i),xt("cf2",e,t,Rf,1,0,i),xt("cf3",e,t,Rf,0,-1,i),xt("cf4",e,t,Rf,0,1,i),xt("cn1",e,t,Rf,-1,0,n),xt("cn2",e,t,Rf,1,0,n),xt("cn3",e,t,Rf,0,-1,n),xt("cn4",e,t,Rf,0,1,n),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}},CanvasTexture:class extends Tr{constructor(t,e,n,i,s,r,o,a,h){super(t,e,n,i,s,r,o,a,h),this.isCanvasTexture=!0,this.needsUpdate=!0}},CapsuleGeometry:Dc,CatmullRomCurve3:Jc,CineonToneMapping:3,CircleGeometry:Uc,ClampToEdgeWrapping:yi,Clock:Bu,Color:Zo,ColorKeyframeTrack:zl,ColorManagement:wr,CompressedArrayTexture:class extends Lc{constructor(t,e,n,i,s,r){super(t,e,n,s,r),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=yi,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},CompressedCubeTexture:class extends Lc{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,gi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}},CompressedTexture:Lc,CompressedTextureLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){function s(s){h.load(t[s],function(t){const n=r.parse(t,!0)
o[s]={width:n.width,height:n.height,format:n.format,mipmaps:n.mipmaps},c+=1,6===c&&(1===n.mipmapCount&&(a.minFilter=Ci),a.image=o,a.format=n.format,a.needsUpdate=!0,e&&e(a))},n,i)}const r=this,o=[],a=new Lc,h=new nu(this.manager)
h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(r.withCredentials)
let c=0
if(Array.isArray(t))for(let l=0,u=t.length;l<u;++l)s(l)
else h.load(t,function(t){const n=r.parse(t,!0)
if(n.isCubemap){const t=n.mipmaps.length/n.mipmapCount
for(let e=0;e<t;e++){o[e]={mipmaps:[]}
for(let t=0;t<n.mipmapCount;t++)o[e].mipmaps.push(n.mipmaps[e*n.mipmapCount+t]),o[e].format=n.format,o[e].width=n.width,o[e].height=n.height}a.image=o}else a.image.width=n.width,a.image.height=n.height,a.mipmaps=n.mipmaps
1===n.mipmapCount&&(a.minFilter=Ci),a.format=n.format,a.needsUpdate=!0,e&&e(a)},n,i)
return a}},ConeGeometry:Rc,ConstantAlphaFactor:213,ConstantColorFactor:211,Controls:class extends ir{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(void 0===t)return void 0,void 0
null!==this.domElement&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}},CubeCamera:Ba,CubeReflectionMapping:gi,CubeRefractionMapping:_i,CubeTexture:Ga,CubeTextureLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){function s(n){o.load(t[n],function(t){r.images[n]=t,a++,6===a&&(r.needsUpdate=!0,e&&e(r))},void 0,i)}const r=new Ga
r.colorSpace=Gs
const o=new su(this.manager)
o.setCrossOrigin(this.crossOrigin),o.setPath(this.path)
let a=0
for(let h=0;h<t.length;++h)s(h)
return r}},CubeUVReflectionMapping:Si,CubicBezierCurve:Zc,CubicBezierCurve3:Kc,CubicInterpolant:Hl,CullFaceBack:1,CullFaceFront:2,CullFaceFrontBack:3,CullFaceNone:0,Curve:zc,CurvePath:rl,CustomBlending:5,CustomToneMapping:5,CylinderGeometry:Ic,Cylindrical:class{constructor(t=1,e=0,n=0){this.radius=t,this.theta=e,this.y=n}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return(new this.constructor).copy(this)}},Data3DTexture:Dr,DataArrayTexture:Nr,DataTexture:Ah,DataTextureLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){const s=this,r=new Ah,o=new nu(this.manager)
return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(t,function(t){let n
try{n=s.parse(t)}catch(o){if(void 0===i)return void 0,void 0
i(o)}void 0!==n.image?r.image=n.image:void 0!==n.data&&(r.image.width=n.width,r.image.height=n.height,r.image.data=n.data),r.wrapS=void 0!==n.wrapS?n.wrapS:yi,r.wrapT=void 0!==n.wrapT?n.wrapT:yi,r.magFilter=void 0!==n.magFilter?n.magFilter:Ci,r.minFilter=void 0!==n.minFilter?n.minFilter:Ci,r.anisotropy=void 0!==n.anisotropy?n.anisotropy:1,void 0!==n.colorSpace&&(r.colorSpace=n.colorSpace),void 0!==n.flipY&&(r.flipY=n.flipY),void 0!==n.format&&(r.format=n.format),void 0!==n.type&&(r.type=n.type),void 0!==n.mipmaps&&(r.mipmaps=n.mipmaps,r.minFilter=Pi),1===n.mipmapCount&&(r.minFilter=Ci),void 0!==n.generateMipmaps&&(r.generateMipmaps=n.generateMipmaps),r.needsUpdate=!0,e&&e(r,n)},n,i),r}},DataUtils:class{static toHalfFloat(t){return w(t)}static fromHalfFloat(t){return S(t)}},DecrementStencilOp:7683,DecrementWrapStencilOp:34056,DefaultLoadingManager:Kl,DepthFormat:qi,DepthStencilFormat:Yi,DepthTexture:Pc,DetachedBindMode:vi,DirectionalLight:wu,DirectionalLightHelper:class extends Uo{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",void 0===e&&(e=1)
let i=new ga
i.setAttribute("position",new ca([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3))
const s=new cc({fog:!1,toneMapped:!1})
this.lightPlane=new gc(i,s),this.add(this.lightPlane),i=new ga,i.setAttribute("position",new ca([0,0,0,0,0,1],3)),this.targetLine=new gc(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Nf.setFromMatrixPosition(this.light.matrixWorld),Df.setFromMatrixPosition(this.light.target.matrixWorld),Uf.subVectors(Df,Nf),this.lightPlane.lookAt(Df),void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Df),this.targetLine.scale.z=Uf.length()}},DiscreteInterpolant:Gl,DodecahedronGeometry:Fc,DoubleSide:2,DstAlphaFactor:206,DstColorFactor:208,DynamicCopyUsage:35050,DynamicDrawUsage:35048,DynamicReadUsage:35049,EdgesGeometry:kc,EllipseCurve:Wc,EqualCompare:514,EqualDepth:4,EqualStencilFunc:514,EquirectangularReflectionMapping:Mi,EquirectangularRefractionMapping:wi,Euler:mo,EventDispatcher:ir,ExternalTexture:Nc,ExtrudeGeometry:ll,FileLoader:nu,Float16BufferAttribute:class extends oa{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=S(this.array[t*this.itemSize])
return this.normalized&&(e=h(e,this.array)),e}setX(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize]=w(e),this}getY(t){let e=S(this.array[t*this.itemSize+1])
return this.normalized&&(e=h(e,this.array)),e}setY(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+1]=w(e),this}getZ(t){let e=S(this.array[t*this.itemSize+2])
return this.normalized&&(e=h(e,this.array)),e}setZ(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+2]=w(e),this}getW(t){let e=S(this.array[t*this.itemSize+3])
return this.normalized&&(e=h(e,this.array)),e}setW(t,e){return this.normalized&&(e=c(e,this.array)),this.array[t*this.itemSize+3]=w(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array)),this.array[t+0]=w(e),this.array[t+1]=w(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array)),this.array[t+0]=w(e),this.array[t+1]=w(n),this.array[t+2]=w(i),this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=c(e,this.array),n=c(n,this.array),i=c(i,this.array),s=c(s,this.array)),this.array[t+0]=w(e),this.array[t+1]=w(n),this.array[t+2]=w(i),this.array[t+3]=w(s),this}},Float32BufferAttribute:ca,FloatType:Fi,Fog:Xa,FogExp2:ja,FramebufferTexture:class extends Tr{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=bi,this.minFilter=bi,this.generateMipmaps=!1,this.needsUpdate=!0}},FrontSide:0,Frustum:Xh,FrustumArray:$h,GLBufferAttribute:class{constructor(t,e,n,i,s,r=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=r,this.version=0}set needsUpdate(t){!0===t&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}},GLSL1:"100",GLSL3:tr,GreaterCompare:516,GreaterDepth:6,GreaterEqualCompare:518,GreaterEqualDepth:5,GreaterEqualStencilFunc:518,GreaterStencilFunc:516,GridHelper:class extends wc{constructor(t=10,e=10,n=4473924,i=8947848){n=new Zo(n),i=new Zo(i)
const s=e/2,r=t/e,o=t/2,a=[],h=[]
for(let l=0,u=0,f=-o;l<=e;l++,f+=r){a.push(-o,0,f,o,0,f),a.push(f,0,-o,f,0,o)
const t=l===s?n:i
t.toArray(h,u),u+=3,t.toArray(h,u),u+=3,t.toArray(h,u),u+=3,t.toArray(h,u),u+=3}const c=new ga
c.setAttribute("position",new ca(a,3)),c.setAttribute("color",new ca(h,3)),super(c,new cc({vertexColors:!0,toneMapped:!1})),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},Group:ka,HalfFloatType:Hi,HemisphereLight:ou,HemisphereLightHelper:class extends Uo{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper"
const i=new pl(e)
i.rotateY(.5*Math.PI),this.material=new ea({wireframe:!0,fog:!1,toneMapped:!1}),void 0===this.color&&(this.material.vertexColors=!0)
const s=i.getAttribute("position"),r=new Float32Array(3*s.count)
i.setAttribute("color",new oa(r,3)),this.add(new La(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0]
if(void 0!==this.color)this.material.color.set(this.color)
else{const e=t.geometry.getAttribute("color")
Lf.copy(this.light.color),Pf.copy(this.light.groundColor)
for(let t=0,n=e.count;t<n;t++){const i=t<n/2?Lf:Pf
e.setXYZ(t,i.r,i.g,i.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(Cf.setFromMatrixPosition(this.light.matrixWorld).negate())}},IcosahedronGeometry:fl,ImageBitmapLoader:class extends Ql{constructor(t){super(t),this.isImageBitmapLoader=!0,"undefined"==typeof createImageBitmap,"undefined"==typeof fetch,this.options={premultiplyAlpha:"none"},this.me=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t)
const s=this,r=Jl.get(`image-bitmap:${t}`)
if(void 0!==r)return s.manager.itemStart(t),r.then?(r.then(n=>{if(!0!==Du.has(r))return e&&e(n),s.manager.itemEnd(t),n
i&&i(Du.get(r)),s.manager.itemError(t),s.manager.itemEnd(t)}),void 0):(setTimeout(function(){e&&e(r),s.manager.itemEnd(t)},0),r)
const o={}
o.credentials="anonymous"===this.crossOrigin?"same-origin":"include",o.headers=this.requestHeader,o.signal="function"==typeof AbortSignal.any?AbortSignal.any([this.me.signal,this.manager.abortController.signal]):this.me.signal
const a=fetch(t,o).then(function(t){return t.blob()}).then(function(t){return createImageBitmap(t,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(n){return Jl.add(`image-bitmap:${t}`,n),e&&e(n),s.manager.itemEnd(t),n}).catch(function(e){i&&i(e),Du.set(a,e),Jl.remove(`image-bitmap:${t}`),s.manager.itemError(t),s.manager.itemEnd(t)})
Jl.add(`image-bitmap:${t}`,a),s.manager.itemStart(t)}abort(){return this.me.abort(),this.me=new AbortController,this}},ImageLoader:su,ImageUtils:xr,IncrementStencilOp:7682,IncrementWrapStencilOp:34055,InstancedBufferAttribute:Ph,InstancedBufferGeometry:Tu,InstancedInterleavedBuffer:class extends Ya{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t)
return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t)
return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}},InstancedMesh:Hh,Int16BufferAttribute:class extends oa{constructor(t,e,n){super(new Int16Array(t),e,n)}},Int32BufferAttribute:class extends oa{constructor(t,e,n){super(new Int32Array(t),e,n)}},Int8BufferAttribute:class extends oa{constructor(t,e,n){super(new Int8Array(t),e,n)}},IntType:Ri,InterleavedBuffer:Ya,InterleavedBufferAttribute:Ja,Interpolant:Fl,InterpolateDiscrete:Ds,InterpolateLinear:Us,InterpolateSmooth:Is,InterpolationSamplingMode:{NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},InterpolationSamplingType:{PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},InvertStencilOp:5386,KeepStencilOp:Ws,KeyframeTrack:Vl,LOD:ph,LatheGeometry:dl,Layers:go,LessCompare:513,LessDepth:2,LessEqualCompare:515,LessEqualDepth:3,LessEqualStencilFunc:515,LessStencilFunc:513,Light:ru,LightProbe:Eu,Line:gc,Line3:class{constructor(t=new ur,e=new ur){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){gf.subVectors(t,this.start),_f.subVectors(this.end,this.start)
const n=_f.dot(_f)
let i=_f.dot(gf)/n
return e&&(i=r(i,0,1)),i}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e)
return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=xf,n=yf){const i=1e-8*1e-8
let s,o
const a=this.start,h=t.start,c=this.end,l=t.end
Mf.subVectors(c,a),wf.subVectors(l,h),Sf.subVectors(a,h)
const u=Mf.dot(Mf),f=wf.dot(wf),d=wf.dot(Sf)
if(u<=i&&f<=i)return e.copy(a),n.copy(h),e.sub(n),e.dot(e)
if(u<=i)s=0,o=d/f,o=r(o,0,1)
else{const t=Mf.dot(Sf)
if(f<=i)o=0,s=r(-t/u,0,1)
else{const e=Mf.dot(wf),n=u*f-e*e
s=0!==n?r((e*d-t*f)/n,0,1):0,o=(e*s+d)/f,o<0?(o=0,s=r(-t/u,0,1)):o>1&&(o=1,s=r((e-t)/u,0,1))}}return e.copy(a).add(Mf.multiplyScalar(s)),n.copy(h).add(wf.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return(new this.constructor).copy(this)}},LineBasicMaterial:cc,LineCurve:Qc,LineCurve3:tl,LineDashedMaterial:Ol,LineLoop:Sc,LineSegments:wc,LinearFilter:Ci,LinearInterpolant:Bl,LinearMipMapLinearFilter:1008,LinearMipMapNearestFilter:1007,LinearMipmapLinearFilter:Pi,LinearMipmapNearestFilter:Li,LinearSRGBColorSpace:Vs,LinearToneMapping:1,LinearTransfer:ks,Loader:Ql,LoaderUtils:Au,LoadingManager:Zl,LoopOnce:2200,LoopPingPong:2202,LoopRepeat:2201,MOUSE:{LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Material:ta,MaterialLoader:bu,MathUtils:hr,Matrix2:vf,Matrix3:pr,Matrix4:ro,MaxEquation:104,Mesh:La,MeshBasicMaterial:ea,MeshDepthMaterial:Ul,MeshDistanceMaterial:Il,MeshLambertMaterial:Dl,MeshMatcapMaterial:Rl,MeshNormalMaterial:Nl,MeshPhongMaterial:Ll,MeshPhysicalMaterial:Cl,MeshStandardMaterial:Tl,MeshToonMaterial:Pl,MinEquation:103,MirroredRepeatWrapping:Ei,MixOperation:1,MultiplyBlending:4,MultiplyOperation:0,NearestFilter:bi,NearestMipMapLinearFilter:1005,NearestMipMapNearestFilter:1004,NearestMipmapLinearFilter:Ti,NearestMipmapNearestFilter:Ai,NeutralToneMapping:7,NeverCompare:512,NeverDepth:0,NeverStencilFunc:512,NoBlending:0,NoColorSpace:Bs,NoToneMapping:0,NormalAnimationBlendMode:2500,NormalBlending:1,NotEqualCompare:517,NotEqualDepth:7,NotEqualStencilFunc:517,NumberKeyframeTrack:Wl,Object3D:Uo,ObjectLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){const s=this,r=""===this.path?Au.extractUrlBase(t):this.path
this.resourcePath=this.resourcePath||r
const o=new nu(this.manager)
o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(n){let r=null
try{r=JSON.parse(n)}catch(a){return void 0!==i&&i(a),void 0}const o=r.metadata
if(void 0===o||void 0===o.type||"geometry"===o.type.toLowerCase())return void 0!==i&&i(new Error("THREE.ObjectLoader: Can't load "+t)),void 0
s.parse(r,e)},n,i)}async loadAsync(t,e){const n=""===this.path?Au.extractUrlBase(t):this.path
this.resourcePath=this.resourcePath||n
const i=new nu(this.manager)
i.setPath(this.path),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials)
const s=await i.loadAsync(t,e),r=JSON.parse(s),o=r.metadata
if(void 0===o||void 0===o.type||"geometry"===o.type.toLowerCase())throw new Error("THREE.ObjectLoader: Can't load "+t)
return await this.parseAsync(r)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),r=this.parseImages(t.images,function(){void 0!==e&&e(h)}),o=this.parseTextures(t.textures,r),a=this.parseMaterials(t.materials,o),h=this.parseObject(t.object,s,a,o,n),c=this.parseSkeletons(t.skeletons,h)
if(this.bindSkeletons(h,c),this.bindLightTargets(h),void 0!==e){let t=!1
for(const e in r)if(r[e].data instanceof HTMLImageElement){t=!0
break}!1===t&&e(h)}return h}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),r=this.parseTextures(t.textures,s),o=this.parseMaterials(t.materials,r),a=this.parseObject(t.object,i,o,r,e),h=this.parseSkeletons(t.skeletons,a)
return this.bindSkeletons(a,h),this.bindLightTargets(a),a}parseShapes(t){const e={}
if(void 0!==t)for(let n=0,i=t.length;n<i;n++){const i=(new al).fromJSON(t[n])
e[i.uuid]=i}return e}parseSkeletons(t,e){const n={},i={}
if(e.traverse(function(t){t.isBone&&(i[t.uuid]=t)}),void 0!==t)for(let s=0,r=t.length;s<r;s++){const e=(new Lh).fromJSON(t[s],i)
n[e.uuid]=e}return n}parseGeometries(t,e){const n={}
if(void 0!==t){const i=new Cu
for(let s=0,r=t.length;s<r;s++){let r
const o=t[s]
switch(o.type){case"BufferGeometry":case"InstancedBufferGeometry":r=i.parse(o)
break
default:o.type in El?r=El[o.type].fromJSON(o,e):void 0}r.uuid=o.uuid,void 0!==o.name&&(r.name=o.name),void 0!==o.userData&&(r.userData=o.userData),n[o.uuid]=r}}return n}parseMaterials(t,e){const n={},i={}
if(void 0!==t){const s=new bu
s.setTextures(e)
for(let e=0,r=t.length;e<r;e++){const r=t[e]
void 0===n[r.uuid]&&(n[r.uuid]=s.parse(r)),i[r.uuid]=n[r.uuid]}}return i}parseAnimations(t){const e={}
if(void 0!==t)for(let n=0;n<t.length;n++){const i=t[n],s=$l.parse(i)
e[s.uuid]=s}return e}parseImages(t,e){function n(t){if("string"==typeof t){const e=t
return function(t){return i.manager.itemStart(t),r.load(t,function(){i.manager.itemEnd(t)},void 0,function(){i.manager.itemError(t),i.manager.itemEnd(t)})}(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(e)?e:i.resourcePath+e)}return t.data?{data:u(t.type,t.data),width:t.width,height:t.height}:null}const i=this,s={}
let r
if(void 0!==t&&t.length>0){const i=new Zl(e)
r=new su(i),r.setCrossOrigin(this.crossOrigin)
for(let e=0,r=t.length;e<r;e++){const i=t[e],r=i.url
if(Array.isArray(r)){const t=[]
for(let e=0,i=r.length;e<i;e++){const i=n(r[e])
null!==i&&(i instanceof HTMLImageElement?t.push(i):t.push(new Ah(i.data,i.width,i.height)))}s[i.uuid]=new Er(t)}else{const t=n(i.url)
s[i.uuid]=new Er(t)}}}return s}async parseImagesAsync(t){async function e(t){if("string"==typeof t){const e=t,i=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(e)?e:n.resourcePath+e
return await s.loadAsync(i)}return t.data?{data:u(t.type,t.data),width:t.width,height:t.height}:null}const n=this,i={}
let s
if(void 0!==t&&t.length>0){s=new su(this.manager),s.setCrossOrigin(this.crossOrigin)
for(let n=0,s=t.length;n<s;n++){const s=t[n],r=s.url
if(Array.isArray(r)){const t=[]
for(let n=0,i=r.length;n<i;n++){const i=r[n],s=await e(i)
null!==s&&(s instanceof HTMLImageElement?t.push(s):t.push(new Ah(s.data,s.width,s.height)))}i[s.uuid]=new Er(t)}else{const t=await e(s.url)
i[s.uuid]=new Er(t)}}}return i}parseTextures(t,e){function n(t,e){return"number"==typeof t?t:(void 0,e[t])}const i={}
if(void 0!==t)for(let s=0,r=t.length;s<r;s++){const r=t[s]
void 0===r.image,0,void 0===e[r.image]
const o=e[r.image],a=o.data
let h
Array.isArray(a)?(h=new Ga,6===a.length&&(h.needsUpdate=!0)):(h=a&&a.data?new Ah:new Tr,a&&(h.needsUpdate=!0)),h.source=o,h.uuid=r.uuid,void 0!==r.name&&(h.name=r.name),void 0!==r.mapping&&(h.mapping=n(r.mapping,Lu)),void 0!==r.channel&&(h.channel=r.channel),void 0!==r.offset&&h.offset.fromArray(r.offset),void 0!==r.repeat&&h.repeat.fromArray(r.repeat),void 0!==r.center&&h.center.fromArray(r.center),void 0!==r.rotation&&(h.rotation=r.rotation),void 0!==r.wrap&&(h.wrapS=n(r.wrap[0],Pu),h.wrapT=n(r.wrap[1],Pu)),void 0!==r.format&&(h.format=r.format),void 0!==r.internalFormat&&(h.internalFormat=r.internalFormat),void 0!==r.type&&(h.type=r.type),void 0!==r.colorSpace&&(h.colorSpace=r.colorSpace),void 0!==r.minFilter&&(h.minFilter=n(r.minFilter,Nu)),void 0!==r.magFilter&&(h.magFilter=n(r.magFilter,Nu)),void 0!==r.anisotropy&&(h.anisotropy=r.anisotropy),void 0!==r.flipY&&(h.flipY=r.flipY),void 0!==r.generateMipmaps&&(h.generateMipmaps=r.generateMipmaps),void 0!==r.premultiplyAlpha&&(h.premultiplyAlpha=r.premultiplyAlpha),void 0!==r.unpackAlignment&&(h.unpackAlignment=r.unpackAlignment),void 0!==r.compareFunction&&(h.compareFunction=r.compareFunction),void 0!==r.userData&&(h.userData=r.userData),i[r.uuid]=h}return i}parseObject(t,e,n,i,s){function r(t){return void 0===e[t],0,e[t]}function o(t){if(void 0!==t){if(Array.isArray(t)){const e=[]
for(let i=0,s=t.length;i<s;i++){const s=t[i]
void 0===n[s],0,e.push(n[s])}return e}return void 0===n[t],0,n[t]}}function a(t){return void 0===i[t],0,i[t]}let h,c,l
switch(t.type){case"Scene":h=new qa,void 0!==t.background&&(Number.isInteger(t.background)?h.background=new Zo(t.background):h.background=a(t.background)),void 0!==t.environment&&(h.environment=a(t.environment)),void 0!==t.fog&&("Fog"===t.fog.type?h.fog=new Xa(t.fog.color,t.fog.near,t.fog.far):"FogExp2"===t.fog.type&&(h.fog=new ja(t.fog.color,t.fog.density)),""!==t.fog.name&&(h.fog.name=t.fog.name)),void 0!==t.backgroundBlurriness&&(h.backgroundBlurriness=t.backgroundBlurriness),void 0!==t.backgroundIntensity&&(h.backgroundIntensity=t.backgroundIntensity),void 0!==t.backgroundRotation&&h.backgroundRotation.fromArray(t.backgroundRotation),void 0!==t.environmentIntensity&&(h.environmentIntensity=t.environmentIntensity),void 0!==t.environmentRotation&&h.environmentRotation.fromArray(t.environmentRotation)
break
case"PerspectiveCamera":h=new Fa(t.fov,t.aspect,t.near,t.far),void 0!==t.focus&&(h.focus=t.focus),void 0!==t.zoom&&(h.zoom=t.zoom),void 0!==t.filmGauge&&(h.filmGauge=t.filmGauge),void 0!==t.filmOffset&&(h.filmOffset=t.filmOffset),void 0!==t.view&&(h.view=Object.assign({},t.view))
break
case"OrthographicCamera":h=new _u(t.left,t.right,t.top,t.bottom,t.near,t.far),void 0!==t.zoom&&(h.zoom=t.zoom),void 0!==t.view&&(h.view=Object.assign({},t.view))
break
case"AmbientLight":h=new Su(t.color,t.intensity)
break
case"DirectionalLight":h=new wu(t.color,t.intensity),h.target=t.target||""
break
case"PointLight":h=new gu(t.color,t.intensity,t.distance,t.decay)
break
case"RectAreaLight":h=new xu(t.color,t.intensity,t.width,t.height)
break
case"SpotLight":h=new fu(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),h.target=t.target||""
break
case"HemisphereLight":h=new ou(t.color,t.groundColor,t.intensity)
break
case"LightProbe":h=(new Eu).fromJSON(t)
break
case"SkinnedMesh":c=r(t.geometry),l=o(t.material),h=new Eh(c,l),void 0!==t.bindMode&&(h.bindMode=t.bindMode),void 0!==t.bindMatrix&&h.bindMatrix.fromArray(t.bindMatrix),void 0!==t.skeleton&&(h.skeleton=t.skeleton)
break
case"Mesh":c=r(t.geometry),l=o(t.material),h=new La(c,l)
break
case"InstancedMesh":c=r(t.geometry),l=o(t.material)
const e=t.count,n=t.instanceMatrix,i=t.instanceColor
h=new Hh(c,l,e),h.instanceMatrix=new Ph(new Float32Array(n.array),16),void 0!==i&&(h.instanceColor=new Ph(new Float32Array(i.array),i.itemSize))
break
case"BatchedMesh":c=r(t.geometry),l=o(t.material),h=new hc(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,l),h.geometry=c,h.perObjectFrustumCulled=t.perObjectFrustumCulled,h.sortObjects=t.sortObjects,h.bt=t.drawRanges,h.At=t.reservedRanges,h.Tt=t.geometryInfo.map(t=>{let e=null,n=null
return void 0!==t.boundingBox&&(e=(new Ur).fromJSON(t.boundingBox)),void 0!==t.boundingSphere&&(n=(new Jr).fromJSON(t.boundingSphere)),{...t,boundingBox:e,boundingSphere:n}}),h.Ct=t.instanceInfo,h.Lt=t.Lt,h.Pt=t.Pt,h.Nt=t.nextIndexStart,h.Dt=t.nextVertexStart,h.Ut=t.geometryCount,h.U=t.maxInstanceCount,h.It=t.maxVertexCount,h.Rt=t.maxIndexCount,h.Ot=t.geometryInitialized,h.Ft=a(t.matricesTexture.uuid),h.Ht=a(t.indirectTexture.uuid),void 0!==t.colorsTexture&&(h.R=a(t.colorsTexture.uuid)),void 0!==t.boundingSphere&&(h.boundingSphere=(new Jr).fromJSON(t.boundingSphere)),void 0!==t.boundingBox&&(h.boundingBox=(new Ur).fromJSON(t.boundingBox))
break
case"LOD":h=new ph
break
case"Line":h=new gc(r(t.geometry),o(t.material))
break
case"LineLoop":h=new Sc(r(t.geometry),o(t.material))
break
case"LineSegments":h=new wc(r(t.geometry),o(t.material))
break
case"PointCloud":case"Points":h=new Tc(r(t.geometry),o(t.material))
break
case"Sprite":h=new uh(o(t.material))
break
case"Group":h=new ka
break
case"Bone":h=new bh
break
default:h=new Uo}if(h.uuid=t.uuid,void 0!==t.name&&(h.name=t.name),void 0!==t.matrix?(h.matrix.fromArray(t.matrix),void 0!==t.matrixAutoUpdate&&(h.matrixAutoUpdate=t.matrixAutoUpdate),h.matrixAutoUpdate&&h.matrix.decompose(h.position,h.quaternion,h.scale)):(void 0!==t.position&&h.position.fromArray(t.position),void 0!==t.rotation&&h.rotation.fromArray(t.rotation),void 0!==t.quaternion&&h.quaternion.fromArray(t.quaternion),void 0!==t.scale&&h.scale.fromArray(t.scale)),void 0!==t.up&&h.up.fromArray(t.up),void 0!==t.castShadow&&(h.castShadow=t.castShadow),void 0!==t.receiveShadow&&(h.receiveShadow=t.receiveShadow),t.shadow&&(void 0!==t.shadow.intensity&&(h.shadow.intensity=t.shadow.intensity),void 0!==t.shadow.bias&&(h.shadow.bias=t.shadow.bias),void 0!==t.shadow.normalBias&&(h.shadow.normalBias=t.shadow.normalBias),void 0!==t.shadow.radius&&(h.shadow.radius=t.shadow.radius),void 0!==t.shadow.mapSize&&h.shadow.mapSize.fromArray(t.shadow.mapSize),void 0!==t.shadow.camera&&(h.shadow.camera=this.parseObject(t.shadow.camera))),void 0!==t.visible&&(h.visible=t.visible),void 0!==t.frustumCulled&&(h.frustumCulled=t.frustumCulled),void 0!==t.renderOrder&&(h.renderOrder=t.renderOrder),void 0!==t.userData&&(h.userData=t.userData),void 0!==t.layers&&(h.layers.mask=t.layers),void 0!==t.children){const r=t.children
for(let t=0;t<r.length;t++)h.add(this.parseObject(r[t],e,n,i,s))}if(void 0!==t.animations){const e=t.animations
for(let t=0;t<e.length;t++){const n=e[t]
h.animations.push(s[n])}}if("LOD"===t.type){void 0!==t.autoUpdate&&(h.autoUpdate=t.autoUpdate)
const e=t.levels
for(let t=0;t<e.length;t++){const n=e[t],i=h.getObjectByProperty("uuid",n.object)
void 0!==i&&h.addLevel(i,n.distance,n.hysteresis)}}return h}bindSkeletons(t,e){0!==Object.keys(e).length&&t.traverse(function(t){if(!0===t.isSkinnedMesh&&void 0!==t.skeleton){const n=e[t.skeleton]
void 0===n?void 0:t.bind(n,t.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n)
e.target=void 0!==i?i:new Uo}})}},ObjectSpaceNormalMap:1,OctahedronGeometry:pl,OneFactor:201,OneMinusConstantAlphaFactor:214,OneMinusConstantColorFactor:212,OneMinusDstAlphaFactor:207,OneMinusDstColorFactor:209,OneMinusSrcAlphaFactor:Yn,OneMinusSrcColorFactor:203,OrthographicCamera:_u,PCFShadowMap:1,PCFSoftShadowMap:2,PMREMGenerator:id,Path:ol,PerspectiveCamera:Fa,Plane:kh,PlaneGeometry:vl,PlaneHelper:class extends gc{constructor(t,e=1,n=16776960){const i=n,s=new ga
s.setAttribute("position",new ca([1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],3)),s.computeBoundingSphere(),super(s,new cc({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e
const r=new ga
r.setAttribute("position",new ca([1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],3)),r.computeBoundingSphere(),this.add(new La(r,new ea({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},PointLight:gu,PointLightHelper:class extends La{constructor(t,e,n){super(new _l(e,4,2),new ea({wireframe:!0,fog:!1,toneMapped:!1})),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},Points:Tc,PointsMaterial:xc,PolarGridHelper:class extends wc{constructor(t=10,e=16,n=8,i=64,s=4473924,r=8947848){s=new Zo(s),r=new Zo(r)
const o=[],a=[]
if(e>1)for(let c=0;c<e;c++){const n=c/e*(2*Math.PI),i=Math.sin(n)*t,h=Math.cos(n)*t
o.push(0,0,0),o.push(i,0,h)
const l=1&c?s:r
a.push(l.r,l.g,l.b),a.push(l.r,l.g,l.b)}for(let c=0;c<n;c++){const e=1&c?s:r,h=t-t/n*c
for(let t=0;t<i;t++){let n=t/i*(2*Math.PI),s=Math.sin(n)*h,r=Math.cos(n)*h
o.push(s,0,r),a.push(e.r,e.g,e.b),n=(t+1)/i*(2*Math.PI),s=Math.sin(n)*h,r=Math.cos(n)*h,o.push(s,0,r),a.push(e.r,e.g,e.b)}}const h=new ga
h.setAttribute("position",new ca(o,3)),h.setAttribute("color",new ca(a,3)),super(h,new cc({vertexColors:!0,toneMapped:!1})),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},PolyhedronGeometry:Oc,PositionalAudio:class extends ju{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),!0===this.hasPlaybackControl&&!1===this.isPlaying)return
this.matrixWorld.decompose(Xu,qu,Yu),$u.set(0,0,1).applyQuaternion(qu)
const e=this.panner
if(e.positionX){const t=this.context.currentTime+this.listener.timeDelta
e.positionX.linearRampToValueAtTime(Xu.x,t),e.positionY.linearRampToValueAtTime(Xu.y,t),e.positionZ.linearRampToValueAtTime(Xu.z,t),e.orientationX.linearRampToValueAtTime($u.x,t),e.orientationY.linearRampToValueAtTime($u.y,t),e.orientationZ.linearRampToValueAtTime($u.z,t)}else e.setPosition(Xu.x,Xu.y,Xu.z),e.setOrientation($u.x,$u.y,$u.z)}},PropertyBinding:hf,PropertyMixer:Ju,QuadraticBezierCurve:el,QuadraticBezierCurve3:nl,Quaternion:lr,QuaternionKeyframeTrack:Xl,QuaternionLinearInterpolant:jl,RED_GREEN_RGTC2_Format:Ps,RED_RGTC1_Format:Cs,REVISION:Dn,RGBADepthPacking:3201,RGBAFormat:Xi,RGBAIntegerFormat:Qi,RGBA_ASTC_10x10_Format:xs,RGBA_ASTC_10x5_Format:Ms,RGBA_ASTC_10x6_Format:ws,RGBA_ASTC_10x8_Format:Ss,RGBA_ASTC_12x10_Format:ys,RGBA_ASTC_12x12_Format:Es,RGBA_ASTC_4x4_Format:us,RGBA_ASTC_5x4_Format:fs,RGBA_ASTC_5x5_Format:ds,RGBA_ASTC_6x5_Format:ps,RGBA_ASTC_6x6_Format:vs,RGBA_ASTC_8x5_Format:ms,RGBA_ASTC_8x6_Format:gs,RGBA_ASTC_8x8_Format:_s,RGBA_BPTC_Format:bs,RGBA_ETC2_EAC_Format:ls,RGBA_PVRTC_2BPPV1_Format:as,RGBA_PVRTC_4BPPV1_Format:os,RGBA_S3TC_DXT1_Format:es,RGBA_S3TC_DXT3_Format:ns,RGBA_S3TC_DXT5_Format:is,RGBDepthPacking:3202,RGBFormat:ji,RGBIntegerFormat:1032,RGB_BPTC_SIGNED_Format:As,RGB_BPTC_UNSIGNED_Format:Ts,RGB_ETC1_Format:hs,RGB_ETC2_Format:cs,RGB_PVRTC_2BPPV1_Format:rs,RGB_PVRTC_4BPPV1_Format:ss,RGB_S3TC_DXT1_Format:ts,RGDepthPacking:3203,RGFormat:Zi,RGIntegerFormat:Ki,RawShaderMaterial:Al,Ray:so,Raycaster:pf,RectAreaLight:xu,RedFormat:$i,RedIntegerFormat:Ji,ReinhardToneMapping:2,RenderTarget:Lr,RenderTarget3D:class extends Lr{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Dr(null,t,e,n),this.yt(i),this.texture.isRenderTargetTexture=!0}},RepeatWrapping:xi,ReplaceStencilOp:7681,ReverseSubtractEquation:102,RingGeometry:ml,SIGNED_RED_GREEN_RGTC2_Format:Ns,SIGNED_RED_RGTC1_Format:Ls,SRGBColorSpace:Gs,SRGBTransfer:zs,Scene:qa,ShaderChunk:Gf,ShaderLib:kf,ShaderMaterial:Da,ShadowMaterial:bl,Shape:al,ShapeGeometry:gl,ShapePath:class{constructor(){this.type="ShapePath",this.color=new Zo,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new ol,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,r){return this.currentPath.bezierCurveTo(t,e,n,i,s,r),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(t,e){const n=e.length
let i=!1
for(let s=n-1,r=0;r<n;s=r++){let n=e[s],o=e[r],a=o.x-n.x,h=o.y-n.y
if(Math.abs(h)>Number.EPSILON){if(h<0&&(n=e[r],a=-a,o=e[s],h=-h),t.y<n.y||t.y>o.y)continue
if(t.y===n.y){if(t.x===n.x)return!0}else{const e=h*(t.x-n.x)-a*(t.y-n.y)
if(0===e)return!0
if(e<0)continue
i=!i}}else{if(t.y!==n.y)continue
if(o.x<=t.x&&t.x<=n.x||n.x<=t.x&&t.x<=o.x)return!0}}return i}const n=cl.isClockWise,i=this.subPaths
if(0===i.length)return[]
let s,r,o
const a=[]
if(1===i.length)return r=i[0],o=new al,o.curves=r.curves,a.push(o),a
let h=!n(i[0].getPoints())
h=t?!h:h
const c=[],l=[]
let u,f,d=[],p=0
l[p]=void 0,d[p]=[]
for(let v=0,m=i.length;v<m;v++)r=i[v],u=r.getPoints(),s=n(u),s=t?!s:s,s?(!h&&l[p]&&p++,l[p]={s:new al,p:u},l[p].s.curves=r.curves,h&&p++,d[p]=[]):d[p].push({h:r,p:u[0]})
if(!l[0])return function(t){const e=[]
for(let n=0,i=t.length;n<i;n++){const i=t[n],s=new al
s.curves=i.curves,e.push(s)}return e}(i)
if(l.length>1){let t=!1,n=0
for(let e=0,i=l.length;e<i;e++)c[e]=[]
for(let i=0,s=l.length;i<s;i++){const s=d[i]
for(let r=0;r<s.length;r++){const o=s[r]
let a=!0
for(let s=0;s<l.length;s++)e(o.p,l[s].p)&&(i!==s&&n++,a?(a=!1,c[s].push(o)):t=!0)
a&&c[i].push(o)}}n>0&&!1===t&&(d=c)}for(let v=0,m=l.length;v<m;v++){o=l[v].s,a.push(o),f=d[v]
for(let t=0,e=f.length;t<e;t++)o.holes.push(f[t].h)}return a}},ShapeUtils:cl,ShortType:Ui,Skeleton:Lh,SkeletonHelper:class extends wc{constructor(t){const e=St(t),n=new ga,i=[],s=[]
for(let a=0;a<e.length;a++){const t=e[a]
t.parent&&t.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new ca(i,3)),n.setAttribute("color",new ca(s,3)),super(n,new cc({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0})),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1
const r=new Zo(255),o=new Zo(65280)
this.setColors(r,o)}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position")
Tf.copy(this.root.matrixWorld).invert()
for(let s=0,r=0;s<e.length;s++){const t=e[s]
t.parent&&t.parent.isBone&&(Af.multiplyMatrices(Tf,t.matrixWorld),bf.setFromMatrixPosition(Af),i.setXYZ(r,bf.x,bf.y,bf.z),Af.multiplyMatrices(Tf,t.parent.matrixWorld),bf.setFromMatrixPosition(Af),i.setXYZ(r+1,bf.x,bf.y,bf.z),r+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){const n=this.geometry.getAttribute("color")
for(let i=0;i<n.count;i+=2)n.setXYZ(i,t.r,t.g,t.b),n.setXYZ(i+1,e.r,e.g,e.b)
return n.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}},SkinnedMesh:Eh,Source:Er,Sphere:Jr,SphereGeometry:_l,Spherical:class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){const t=1e-6
return this.phi=r(this.phi,t,Math.PI-t),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(r(e/this.radius,-1,1))),this}clone(){return(new this.constructor).copy(this)}},SphericalHarmonics3:yu,SplineCurve:il,SpotLight:fu,SpotLightHelper:class extends Uo{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper"
const n=new ga,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1]
for(let r=0,o=1,a=32;r<a;r++,o++){const t=r/a*Math.PI*2,e=o/a*Math.PI*2
i.push(Math.cos(t),Math.sin(t),1,Math.cos(e),Math.sin(e),1)}n.setAttribute("position",new ca(i,3))
const s=new cc({fog:!1,toneMapped:!1})
this.cone=new wc(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld)
const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle)
this.cone.scale.set(e,e,t),Ef.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ef),void 0!==this.color?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},Sprite:uh,SpriteMaterial:Za,SrcAlphaFactor:qn,SrcAlphaSaturateFactor:210,SrcColorFactor:202,StaticCopyUsage:35046,StaticDrawUsage:Qs,StaticReadUsage:35045,StereoCamera:class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Fa,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Fa,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this.Ii={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this.Ii
if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,Fu.copy(t.projectionMatrix)
const n=e.eyeSep/2,i=n*e.near/e.focus,s=e.near*Math.tan(or*e.fov*.5)/e.zoom
let r,o
Ou.elements[12]=-n,Ru.elements[12]=n,r=-s*e.aspect+i,o=s*e.aspect+i,Fu.elements[0]=2*e.near/(o-r),Fu.elements[8]=(o+r)/(o-r),this.cameraL.projectionMatrix.copy(Fu),r=-s*e.aspect-i,o=s*e.aspect-i,Fu.elements[0]=2*e.near/(o-r),Fu.elements[8]=(o+r)/(o-r),this.cameraR.projectionMatrix.copy(Fu)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(Ou),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(Ru)}},StreamCopyUsage:35042,StreamDrawUsage:35040,StreamReadUsage:35041,StringKeyframeTrack:ql,SubtractEquation:101,SubtractiveBlending:3,TOUCH:{ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},TangentSpaceNormalMap:0,TetrahedronGeometry:Ml,Texture:Tr,TextureLoader:class extends Ql{constructor(t){super(t)}load(t,e,n,i){const s=new Tr,r=new su(this.manager)
return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(t){s.image=t,s.needsUpdate=!0,void 0!==e&&e(s)},n,i),s}},TextureUtils:class{static contain(t,e){return function(t,e){const n=t.image&&t.image.width?t.image.width/t.image.height:1
return n>e?(t.repeat.x=1,t.repeat.y=n/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2):(t.repeat.x=e/n,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0),t}(t,e)}static cover(t,e){return function(t,e){const n=t.image&&t.image.width?t.image.width/t.image.height:1
return n>e?(t.repeat.x=e/n,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0):(t.repeat.x=1,t.repeat.y=n/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2),t}(t,e)}static fill(t){return function(t){return t.repeat.x=1,t.repeat.y=1,t.offset.x=0,t.offset.y=0,t}(t)}static getByteLength(t,e,n,i){return yt(t,e,n,i)}},Timer:class{constructor(){this.Ri=0,this.Oi=0,this.Sn=performance.now(),this.Fi=0,this.Hi=0,this.Bi=1,this.D=null,this.Gi=null}connect(t){this.D=t,void 0!==t.hidden&&(this.Gi=wt.bind(this),t.addEventListener("visibilitychange",this.Gi,!1))}disconnect(){null!==this.Gi&&(this.D.removeEventListener("visibilitychange",this.Gi),this.Gi=null),this.D=null}getDelta(){return this.Fi/1e3}getElapsed(){return this.Hi/1e3}getTimescale(){return this.Bi}setTimescale(t){return this.Bi=t,this}reset(){return this.Oi=performance.now()-this.Sn,this}dispose(){this.disconnect()}update(t){return null!==this.Gi&&!0===this.D.hidden?this.Fi=0:(this.Ri=this.Oi,this.Oi=(void 0!==t?t:performance.now())-this.Sn,this.Fi=(this.Oi-this.Ri)*this.Bi,this.Hi+=this.Fi),this}},TimestampQuery:{COMPUTE:"compute",RENDER:"render"},TorusGeometry:wl,TorusKnotGeometry:Sl,Triangle:qo,TriangleFanDrawMode:2,TriangleStripDrawMode:1,TrianglesDrawMode:0,TubeGeometry:xl,UVMapping:mi,Uint16BufferAttribute:aa,Uint32BufferAttribute:ha,Uint8BufferAttribute:class extends oa{constructor(t,e,n){super(new Uint8Array(t),e,n)}},Uint8ClampedBufferAttribute:class extends oa{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}},Uniform:uf,UniformsGroup:class extends ir{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:ff++}),this.name="",this.usage=Qs,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t)
return-1!==e&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage
const e=t.uniforms
this.uniforms.length=0
for(let n=0,i=e.length;n<i;n++){const t=Array.isArray(e[n])?e[n]:[e[n]]
for(let e=0;e<t.length;e++)this.uniforms.push(t[e].clone())}return this}clone(){return(new this.constructor).copy(this)}},UniformsLib:Vf,UniformsUtils:Na,UnsignedByteType:Ni,UnsignedInt101111Type:zi,UnsignedInt248Type:Vi,UnsignedInt5999Type:ki,UnsignedIntType:Oi,UnsignedShort4444Type:Bi,UnsignedShort5551Type:Gi,UnsignedShortType:Ii,VSMShadowMap:3,Vector2:cr,Vector3:ur,Vector4:Cr,VectorKeyframeTrack:Yl,VideoFrameTexture:class extends Cc{constructor(t,e,n,i,s,r,o,a){super({},t,e,n,i,s,r,o,a),this.isVideoFrameTexture=!0}update(){}clone(){return(new this.constructor).copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}},VideoTexture:Cc,WebGL3DRenderTarget:class extends Pr{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Dr(null,t,e,n),this.yt(i),this.texture.isRenderTargetTexture=!0}},WebGLArrayRenderTarget:class extends Pr{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Nr(null,t,e,n),this.yt(i),this.texture.isRenderTargetTexture=!0}},WebGLCoordinateSystem:er,WebGLCubeRenderTarget:Va,WebGLRenderTarget:Pr,WebGLRenderer:Id,WebGLUtils:an,WebGPUCoordinateSystem:nr,WebXRController:Wa,WireframeGeometry:yl,WrapAroundEnding:Fs,ZeroCurvatureEnding:Rs,ZeroFactor:200,ZeroSlopeEnding:Os,ZeroStencilOp:0,createCanvasElement:d},Symbol.toStringTag,{value:"Module"}))
var Od,Fd,Hd,Bd,Gd={exports:{}},Vd={},kd={exports:{}},zd={}
const Wd=t(function(){return Bd||(Bd=1,Gd.exports=function(){if(Hd)return Vd
Hd=1
var t=n(),e=function(){return Fd||(Fd=1,kd.exports=function(){function t(t){var e=t.getSnapshot
t=t.value
try{var n=e()
return!i(t,n)}catch(s){return!0}}if(Od)return zd
Od=1
var e=n(),i="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},s=e.useState,r=e.useEffect,o=e.useLayoutEffect,a=e.useDebugValue,h="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(e,n){var i=n(),h=s({inst:{value:i,getSnapshot:n}}),c=h[0].inst,l=h[1]
return o(function(){c.value=i,c.getSnapshot=n,t(c)&&l({inst:c})},[e,i,n]),r(function(){return t(c)&&l({inst:c}),e(function(){t(c)&&l({inst:c})})},[e]),a(i),i}
return zd.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:h,zd}()),kd.exports}(),i="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},s=e.useSyncExternalStore,r=t.useRef,o=t.useEffect,a=t.useMemo,h=t.useDebugValue
return Vd.useSyncExternalStoreWithSelector=function(t,e,n,c,l){var u=r(null)
if(null===u.current){var f={hasValue:!1,value:null}
u.current=f}else f=u.current
u=a(function(){function t(t){if(!o){if(o=!0,s=t,t=c(t),void 0!==l&&f.hasValue){var e=f.value
if(l(e,t))return r=e}return r=t}if(e=r,i(s,t))return e
var n=c(t)
return void 0!==l&&l(e,n)?(s=t,e):(s=t,r=n)}var s,r,o=!1,a=void 0===n?null:n
return[function(){return t(e())},null===a?void 0:function(){return t(a())}]},[e,n,c,l])
var d=s(t,u[0],u[1])
return o(function(){f.hasValue=!0,f.value=d},[d]),h(d),d},Vd}()),Gd.exports}()),jd=t=>{let e
const n=new Set,i=(t,i)=>{const s="function"==typeof t?t(e):t
if(!Object.is(s,e)){const t=e
e=(null!=i?i:"object"!=typeof s||null===s)?s:Object.assign({},e,s),n.forEach(n=>n(e,t))}},s=()=>e,r={setState:i,getState:s,getInitialState:()=>o,subscribe:t=>(n.add(t),()=>n.delete(t))},o=e=t(i,s,r)
return r},{useSyncExternalStoreWithSelector:Xd}=Wd,qd=t=>t,Yd=(t,e)=>{const n=(t=>t?jd(t):jd)(t),i=(t,i=e)=>function(t,e=qd,n){const i=Xd(t.subscribe,t.getState,t.getInitialState,e,n)
return Sn.useDebugValue(i),i}(n,t,i)
return Object.assign(i,n),i},$d=(t,e)=>t?Yd(t,e):Yd,Jd=un(wn.createContext(null))
class Zd extends wn.Component{render(){return wn.createElement(Jd.Provider,{value:this.Vi},this.props.children)}}const Kd=Symbol.for("react.context"),Qd=t=>null!==t&&"object"==typeof t&&"$$typeof"in t&&t.$$typeof===Kd
var tp=.001,ep=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this.Fi=0,this.Hi=0,this.ki=1e3/60,this.timescale=1,this.useFixedDelta=!1,this.zi=!1}get autoReset(){return this.zi}set autoReset(t){"undefined"!=typeof document&&void 0!==document.hidden&&(t?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this.zi=t)}get delta(){return this.Fi*tp}get fixedDelta(){return this.ki*tp}set fixedDelta(t){this.ki=1e3*t}get elapsed(){return this.Hi*tp}update(t){this.useFixedDelta?this.Fi=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(void 0!==t?t:performance.now())-this.startTime,this.Fi=this.currentTime-this.previousTime),this.Fi*=this.timescale,this.Hi+=this.Fi}reset(){this.Fi=0,this.Hi=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(t){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},np=(()=>{const t=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),n=new ga
return n.setAttribute("position",new oa(t,3)),n.setAttribute("uv",new oa(e,2)),n})(),ip=class t{static get fullscreenGeometry(){return np}constructor(t="Pass",e=new qa,n=new Ua){this.name=t,this.renderer=null,this.scene=e,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const e=this.fullscreenMaterial
null!==e&&(e.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return null!==this.screen?this.screen.material:null}set fullscreenMaterial(e){let n=this.screen
null!==n?n.material=e:(n=new La(t.fullscreenGeometry,e),n.frustumCulled=!1,null===this.scene&&(this.scene=new qa),this.scene.add(n),this.screen=n)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,e=3200){}render(t,e,n,i,s){throw new Error("Render method not implemented!")}setSize(t,e){}initialize(t,e,n){}dispose(){for(const e of Object.keys(this)){const n=this[e];(n instanceof Pr||n instanceof ta||n instanceof Tr||n instanceof t)&&this[e].dispose()}null!==this.fullscreenMaterial&&this.fullscreenMaterial.dispose()}},sp=class extends ip{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(t,e,n,i,s){const r=t.state.buffers.stencil
r.setLocked(!1),r.setTest(!1)}},rp=class extends Da{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new uf(null),opacity:new uf(1)},blending:0,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:"#include <common>\n#include <dithering_pars_fragment>\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\nuniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;\n#include <colorspace_fragment>\n#include <dithering_fragment>\n}",vertexShader:"varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}"})}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}getOpacity(t){return this.uniforms.opacity.value}setOpacity(t){this.uniforms.opacity.value=t}},op=class extends ip{constructor(t,e=!0){super("CopyPass"),this.fullscreenMaterial=new rp,this.needsSwap=!1,this.renderTarget=t,void 0===t&&(this.renderTarget=new Pr(1,1,{minFilter:Ci,magFilter:Ci,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(t){this.autoResize=t}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(t){this.autoResize=t}render(t,e,n,i,s){this.fullscreenMaterial.inputBuffer=e.texture,t.setRenderTarget(this.renderToScreen?null:this.renderTarget),t.render(this.scene,this.camera)}setSize(t,e){this.autoResize&&this.renderTarget.setSize(t,e)}initialize(t,e,n){void 0!==n&&(this.renderTarget.texture.type=n,n!==Ni?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":null!==t&&t.outputColorSpace===Gs&&(this.renderTarget.texture.colorSpace=Gs))}},ap=new Zo,hp=class extends ip{constructor(t=!0,e=!0,n=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=t,this.depth=e,this.stencil=n,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(t,e,n){this.color=t,this.depth=e,this.stencil=n}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(t){this.overrideClearColor=t}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(t){this.overrideClearAlpha=t}render(t,e,n,i,s){const r=this.overrideClearColor,o=this.overrideClearAlpha,a=t.getClearAlpha(),h=null!==r,c=o>=0
h?(t.getClearColor(ap),t.setClearColor(r,c?o:a)):c&&t.setClearAlpha(o),t.setRenderTarget(this.renderToScreen?null:e),t.clear(this.color,this.depth,this.stencil),h?t.setClearColor(ap,a):c&&t.setClearAlpha(a)}},cp=class extends ip{constructor(t,e){super("MaskPass",t,e),this.needsSwap=!1,this.clearPass=new hp(!1,!1,!0),this.inverse=!1}set mainScene(t){this.scene=t}set mainCamera(t){this.camera=t}get inverted(){return this.inverse}set inverted(t){this.inverse=t}get clear(){return this.clearPass.enabled}set clear(t){this.clearPass.enabled=t}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(t){this.inverted=t}render(t,e,n,i,s){const r=t.getContext(),o=t.state.buffers,a=this.scene,h=this.camera,c=this.clearPass,l=this.inverted?0:1,u=1-l
o.color.setMask(!1),o.depth.setMask(!1),o.color.setLocked(!0),o.depth.setLocked(!0),o.stencil.setTest(!0),o.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),o.stencil.setFunc(r.ALWAYS,l,4294967295),o.stencil.setClear(u),o.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(t,null):(c.render(t,e),c.render(t,n))),this.renderToScreen?(t.setRenderTarget(null),t.render(a,h)):(t.setRenderTarget(e),t.render(a,h),t.setRenderTarget(n),t.render(a,h)),o.color.setLocked(!1),o.depth.setLocked(!1),o.stencil.setLocked(!1),o.stencil.setFunc(r.EQUAL,1,4294967295),o.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),o.stencil.setLocked(!0)}},lp=class{constructor(t=null,{depthBuffer:e=!0,stencilBuffer:n=!1,multisampling:i=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,n,s,i),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new op,this.depthTexture=null,this.passes=[],this.timer=new ep,this.autoRenderToScreen=!0,this.setRenderer(t)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(t){const e=this.inputBuffer,n=this.multisampling
n>0&&t>0?(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose()):n!==t&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,t),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(t){if(this.renderer=t,null!==t){const e=t.getSize(new cr),n=t.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type
i===Ni&&t.outputColorSpace===Gs&&(this.inputBuffer.texture.colorSpace=Gs,this.outputBuffer.texture.colorSpace=Gs,this.inputBuffer.dispose(),this.outputBuffer.dispose()),t.autoClear=!1,this.setSize(e.width,e.height)
for(const s of this.passes)s.initialize(t,n,i)}}replaceRenderer(t,e=!0){const n=this.renderer,i=n.domElement.parentNode
return this.setRenderer(t),e&&null!==i&&(i.removeChild(n.domElement),i.appendChild(t.domElement)),n}createDepthTexture(){const t=this.depthTexture=new Pc
return this.inputBuffer.depthTexture=t,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(t.format=Yi,t.type=Vi):t.type=Oi,t}deleteDepthTexture(){if(null!==this.depthTexture){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose()
for(const t of this.passes)t.setDepthTexture(null)}}createBuffer(t,e,n,i){const s=this.renderer,r=null===s?new cr:s.getDrawingBufferSize(new cr),o={minFilter:Ci,magFilter:Ci,stencilBuffer:e,depthBuffer:t,type:n},a=new Pr(r.width,r.height,o)
return i>0&&(a.ignoreDepthForMultisampleCopy=!1,a.samples=i),n===Ni&&null!==s&&s.outputColorSpace===Gs&&(a.texture.colorSpace=Gs),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(t){for(const e of this.passes)e.mainScene=t}setMainCamera(t){for(const e of this.passes)e.mainCamera=t}addPass(t,e){const n=this.passes,i=this.renderer,s=i.getDrawingBufferSize(new cr),r=i.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type
if(t.setRenderer(i),t.setSize(s.width,s.height),t.initialize(i,r,o),this.autoRenderToScreen&&(n.length>0&&(n[n.length-1].renderToScreen=!1),t.renderToScreen&&(this.autoRenderToScreen=!1)),void 0!==e?n.splice(e,0,t):n.push(t),this.autoRenderToScreen&&(n[n.length-1].renderToScreen=!0),t.needsDepthTexture||null!==this.depthTexture)if(null===this.depthTexture){const e=this.createDepthTexture()
for(t of n)t.setDepthTexture(e)}else t.setDepthTexture(this.depthTexture)}removePass(t){const e=this.passes,n=e.indexOf(t)
if(-1!==n&&e.splice(n,1).length>0){if(null!==this.depthTexture){const n=(t,e)=>t||e.needsDepthTexture
e.reduce(n,!1)||(t.getDepthTexture()===this.depthTexture&&t.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&n===e.length&&(t.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const t=this.passes
this.deleteDepthTexture(),t.length>0&&(this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!1),this.passes=[])}render(t){const e=this.renderer,n=this.copyPass
let i,s,r,o=this.inputBuffer,a=this.outputBuffer,h=!1
void 0===t&&(this.timer.update(),t=this.timer.getDelta())
for(const c of this.passes)c.enabled&&(c.render(e,o,a,t,h),c.needsSwap&&(h&&(n.renderToScreen=c.renderToScreen,i=e.getContext(),s=e.state.buffers.stencil,s.setFunc(i.NOTEQUAL,1,4294967295),n.render(e,o,a,t,h),s.setFunc(i.EQUAL,1,4294967295)),r=o,o=a,a=r),c instanceof cp?h=!0:c instanceof sp&&(h=!1))}setSize(t,e,n){const i=this.renderer,s=i.getSize(new cr)
void 0!==t&&void 0!==e||(t=s.width,e=s.height),s.width===t&&s.height===e||i.setSize(t,e,n)
const r=i.getDrawingBufferSize(new cr)
this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height)
for(const o of this.passes)o.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const t of this.passes)t.dispose()
this.passes=[],null!==this.inputBuffer&&this.inputBuffer.dispose(),null!==this.outputBuffer&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),ip.fullscreenGeometry.dispose()}},up=1,fp=2,dp={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},pp=class{constructor(){this.shaderParts=new Map([[dp.FRAGMENT_HEAD,null],[dp.FRAGMENT_MAIN_UV,null],[dp.FRAGMENT_MAIN_IMAGE,null],[dp.VERTEX_HEAD,null],[dp.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=0,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Vs}},vp=!1,mp=class{constructor(t=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(t),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let e
if(t.material.flatShading)switch(t.material.side){case 2:e=this.materialsFlatShadedDoubleSide
break
case 1:e=this.materialsFlatShadedBackSide
break
default:e=this.materialsFlatShaded}else switch(t.material.side){case 2:e=this.materialsDoubleSide
break
case 1:e=this.materialsBackSide
break
default:e=this.materials}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=e[2]:t.isInstancedMesh?t.material=e[1]:t.material=e[0],++this.meshCount}}}cloneMaterial(t){if(!(t instanceof Da))return t.clone()
const e=t.uniforms,n=new Map
for(const s in e){const t=e[s].value
t.isRenderTargetTexture&&(e[s].value=null,n.set(s,t))}const i=t.clone()
for(const s of n)e[s[0]].value=s[1],i.uniforms[s[0]].value=s[1]
return i}setMaterial(t){if(this.disposeMaterials(),this.material=t,null!==t){const e=this.materials=[this.cloneMaterial(t),this.cloneMaterial(t),this.cloneMaterial(t)]
for(const n of e)n.uniforms=Object.assign({},t.uniforms),n.side=0
e[2].skinning=!0,this.materialsBackSide=e.map(e=>{const n=this.cloneMaterial(e)
return n.uniforms=Object.assign({},t.uniforms),n.side=1,n}),this.materialsDoubleSide=e.map(e=>{const n=this.cloneMaterial(e)
return n.uniforms=Object.assign({},t.uniforms),n.side=2,n}),this.materialsFlatShaded=e.map(e=>{const n=this.cloneMaterial(e)
return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(e=>{const n=this.cloneMaterial(e)
return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n.side=1,n}),this.materialsFlatShadedDoubleSide=e.map(e=>{const n=this.cloneMaterial(e)
return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n.side=2,n})}}render(t,e,n){const i=t.shadowMap.enabled
if(t.shadowMap.enabled=!1,vp){const i=this.originalMaterials
this.meshCount=0,e.traverse(this.replaceMaterial),t.render(e,n)
for(const t of i)t[0].material=t[1]
this.meshCount!==i.size&&i.clear()}else{const i=e.overrideMaterial
e.overrideMaterial=this.material,t.render(e,n),e.overrideMaterial=i}t.shadowMap.enabled=i}disposeMaterials(){if(null!==this.material){const t=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide)
for(const e of t)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return vp}static set workaroundEnabled(t){vp=t}},gp=-1,_p=class extends ir{constructor(t,e=-1,n=-1,i=1){super(),this.resizable=t,this.baseSize=new cr(1,1),this.preferredSize=new cr(e,n),this.target=this.preferredSize,this.s=i,this.effectiveSize=new cr,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const t=this.baseSize,e=this.preferredSize,n=this.effectiveSize,i=this.scale
e.width!==gp?n.width=e.width:e.height!==gp?n.width=Math.round(e.height*(t.width/Math.max(t.height,1))):n.width=Math.round(t.width*i),e.height!==gp?n.height=e.height:e.width!==gp?n.height=Math.round(e.width/Math.max(t.width/Math.max(t.height,1),1)):n.height=Math.round(t.height*i)}get width(){return this.effectiveSize.width}set width(t){this.preferredWidth=t}get height(){return this.effectiveSize.height}set height(t){this.preferredHeight=t}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(t){this.s!==t&&(this.s=t,this.preferredSize.setScalar(gp),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(t){this.scale=t}get baseWidth(){return this.baseSize.width}set baseWidth(t){this.baseSize.width!==t&&(this.baseSize.width=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(t){this.baseWidth=t}get baseHeight(){return this.baseSize.height}set baseHeight(t){this.baseSize.height!==t&&(this.baseSize.height=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(t){this.baseHeight=t}setBaseSize(t,e){this.baseSize.width===t&&this.baseSize.height===e||(this.baseSize.set(t,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(t){this.preferredSize.width!==t&&(this.preferredSize.width=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(t){this.preferredWidth=t}get preferredHeight(){return this.preferredSize.height}set preferredHeight(t){this.preferredSize.height!==t&&(this.preferredSize.height=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(t){this.preferredHeight=t}setPreferredSize(t,e){this.preferredSize.width===t&&this.preferredSize.height===e||(this.preferredSize.set(t,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(t){this.s=t.scale,this.baseSize.set(t.baseWidth,t.baseHeight),this.preferredSize.set(t.preferredWidth,t.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return gp}},Mp=new Map([[0,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb,y.a),opacity);}"],[1,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,y.a*opacity);}"],[2,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb)*0.5,y.a),opacity);}"],[3,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.xy,xHSL.z));return mix(x,vec4(z,y.a),opacity);}"],[4,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/b)),vec3(1.0),step(1.0,a));return mix(x,vec4(z,y.a),opacity);}"],[5,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(x,vec4(z,y.a),opacity);}"],[6,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb,y.rgb),y.a),opacity);}"],[7,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(abs(x.rgb-y.rgb),y.a),opacity);}"],[8,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb/max(y.rgb,1e-12),y.a),opacity);}"],[9,null],[10,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb-2.0*x.rgb*y.rgb),y.a),opacity);}"],[11,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=min(x.rgb,1.0);vec3 b=min(y.rgb,1.0);vec3 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(x,vec4(z,y.a),opacity);}"],[12,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(step(1.0,x.rgb+y.rgb),y.a),opacity);}"],[13,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.x,xHSL.yz));return mix(x,vec4(z,y.a),opacity);}"],[14,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-y.rgb,y.a),opacity);}"],[15,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(y.rgb*(1.0-x.rgb),y.a),opacity);}"],[16,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb,y.rgb),y.a),opacity);}"],[17,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}"],[18,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb+y.rgb,1.0),y.a),opacity);}"],[19,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(2.0*y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}"],[20,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.xy,yHSL.z));return mix(x,vec4(z,y.a),opacity);}"],[21,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb*y.rgb,y.a),opacity);}"],[22,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-abs(1.0-x.rgb-y.rgb),y.a),opacity);}"],[23,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}"],[24,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(2.0*y.rgb*x.rgb,1.0-2.0*(1.0-y.rgb)*(1.0-x.rgb),step(0.5,x.rgb));return mix(x,vec4(z,y.a),opacity);}"],[25,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 y2=2.0*y.rgb;vec3 z=mix(mix(y2,x.rgb,step(0.5*x.rgb,y.rgb)),max(y2-1.0,vec3(0.0)),step(x.rgb,y2-1.0));return mix(x,vec4(z,y.a),opacity);}"],[26,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(min(x.rgb*x.rgb/max(1.0-y.rgb,1e-12),1.0),y.rgb,step(1.0,y.rgb));return mix(x,vec4(z,y.a),opacity);}"],[27,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.x,yHSL.y,xHSL.z));return mix(x,vec4(z,y.a),opacity);}"],[28,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb-min(x.rgb*y.rgb,1.0),y.a),opacity);}"],[29,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb;vec3 b=y.rgb;vec3 y2=2.0*b;vec3 w=step(0.5,b);vec3 c=a-(1.0-y2)*a*(1.0-a);vec3 d=mix(a+(y2-1.0)*(sqrt(a)-a),a+(y2-1.0)*a*((16.0*a-12.0)*a+3.0),w*(1.0-step(0.25,a)));vec3 z=mix(c,d,w);return mix(x,vec4(z,y.a),opacity);}"],[30,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}"],[31,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb+y.rgb-1.0,0.0),y.a),opacity);}"],[32,"vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(max(1.0-min((1.0-x.rgb)/(2.0*y.rgb),1.0),0.0),min(x.rgb/(2.0*(1.0-y.rgb)),1.0),step(0.5,y.rgb));return mix(x,vec4(z,y.a),opacity);}"]]),wp=class extends ir{constructor(t,e=1){super(),this.Wi=t,this.opacity=new uf(e)}getOpacity(){return this.opacity.value}setOpacity(t){this.opacity.value=t}get blendFunction(){return this.Wi}set blendFunction(t){this.Wi=t,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(t){this.blendFunction=t}getShaderCode(){return Mp.get(this.blendFunction)}},Sp=class extends ir{constructor(t,e,{attributes:n=0,blendFunction:i=23,defines:s=new Map,uniforms:r=new Map,extensions:o=null,vertexShader:a=null}={}){super(),this.name=t,this.renderer=null,this.attributes=n,this.fragmentShader=e,this.vertexShader=a,this.defines=s,this.uniforms=r,this.extensions=o,this.blendMode=new wp(i),this.blendMode.addEventListener("change",t=>this.setChanged()),this.ji=Vs,this.ri=Bs}get inputColorSpace(){return this.ji}set inputColorSpace(t){this.ji=t,this.setChanged()}get outputColorSpace(){return this.ri}set outputColorSpace(t){this.ri=t,this.setChanged()}set mainScene(t){}set mainCamera(t){}getName(){return this.name}setRenderer(t){this.renderer=t}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(t){this.attributes=t,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(t){this.fragmentShader=t,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(t){this.vertexShader=t,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(t,e=3200){}update(t,e,n){}setSize(t,e){}initialize(t,e,n){}dispose(){for(const t of Object.keys(this)){const e=this[t];(e instanceof Pr||e instanceof ta||e instanceof Tr||e instanceof ip)&&this[t].dispose()}}},xp=class extends ip{constructor(t,e,n=null){super("RenderPass",t,e),this.needsSwap=!1,this.clearPass=new hp,this.overrideMaterialManager=null===n?null:new mp(n),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(t){this.scene=t}set mainCamera(t){this.camera=t}get renderToScreen(){return super.renderToScreen}set renderToScreen(t){super.renderToScreen=t,this.clearPass.renderToScreen=t}get overrideMaterial(){const t=this.overrideMaterialManager
return null!==t?t.material:null}set overrideMaterial(t){const e=this.overrideMaterialManager
null!==t?null!==e?e.setMaterial(t):this.overrideMaterialManager=new mp(t):null!==e&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(t){this.overrideMaterial=t}get clear(){return this.clearPass.enabled}set clear(t){this.clearPass.enabled=t}getSelection(){return this.selection}setSelection(t){this.selection=t}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(t){this.ignoreBackground=t}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(t){this.skipShadowMapUpdate=t}getClearPass(){return this.clearPass}render(t,e,n,i,s){const r=this.scene,o=this.camera,a=this.selection,h=o.layers.mask,c=r.background,l=t.shadowMap.autoUpdate,u=this.renderToScreen?null:e
null!==a&&o.layers.set(a.getLayer()),this.skipShadowMapUpdate&&(t.shadowMap.autoUpdate=!1),(this.ignoreBackground||null!==this.clearPass.overrideClearColor)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(t,e),t.setRenderTarget(u),null!==this.overrideMaterialManager?this.overrideMaterialManager.render(t,r,o):t.render(r,o),o.layers.mask=h,r.background=c,t.shadowMap.autoUpdate=l}},yp=class extends Da{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new uf(null),normalBuffer:new uf(null),texelSize:new uf(new cr)},blending:0,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:"#include <packing>\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nuniform highp sampler2D depthBuffer;\n#else\nuniform mediump sampler2D depthBuffer;\n#endif\n#ifdef DOWNSAMPLE_NORMALS\nuniform lowp sampler2D normalBuffer;\n#endif\nvarying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){\n#if DEPTH_PACKING == 3201\nreturn unpackRGBAToDepth(texture2D(depthBuffer,uv));\n#else\nreturn texture2D(depthBuffer,uv).r;\n#endif\n}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[4];distances[0]=abs(c-samples[0]);distances[1]=abs(c-samples[1]);distances[2]=abs(c-samples[2]);distances[3]=abs(c-samples[3]);float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[4];d[0]=readDepth(vUv0);d[1]=readDepth(vUv1);d[2]=readDepth(vUv2);d[3]=readDepth(vUv3);int index=findBestDepth(d);\n#ifdef DOWNSAMPLE_NORMALS\nvec3 n[4];n[0]=texture2D(normalBuffer,vUv0).rgb;n[1]=texture2D(normalBuffer,vUv1).rgb;n[2]=texture2D(normalBuffer,vUv2).rgb;n[3]=texture2D(normalBuffer,vUv3).rgb;\n#else\nvec3 n[4];n[0]=vec3(0.0);n[1]=vec3(0.0);n[2]=vec3(0.0);n[3]=vec3(0.0);\n#endif\ngl_FragColor=vec4(n[index],d[index]);}",vertexShader:"uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}"})}set depthBuffer(t){this.uniforms.depthBuffer.value=t}set depthPacking(t){this.defines.DEPTH_PACKING=t.toFixed(0),this.needsUpdate=!0}setDepthBuffer(t,e=3200){this.depthBuffer=t,this.depthPacking=e}set normalBuffer(t){this.uniforms.normalBuffer.value=t,null!==t?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(t){this.normalBuffer=t}setTexelSize(t,e){this.uniforms.texelSize.value.set(t,e)}setSize(t,e){this.uniforms.texelSize.value.set(1/t,1/e)}},Ep=class extends ip{constructor({normalBuffer:t=null,resolutionScale:e=.5,width:n=_p.AUTO_SIZE,height:i=_p.AUTO_SIZE,resolutionX:s=n,resolutionY:r=i}={}){super("DepthDownsamplingPass")
const o=new yp
o.normalBuffer=t,this.fullscreenMaterial=o,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new Pr(1,1,{minFilter:bi,magFilter:bi,depthBuffer:!1,type:Fi}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1
const a=this.resolution=new _p(this,s,r,e)
a.addEventListener("change",t=>this.setSize(a.baseWidth,a.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(t,e=3200){this.fullscreenMaterial.depthBuffer=t,this.fullscreenMaterial.depthPacking=e}render(t,e,n,i,s){t.setRenderTarget(this.renderToScreen?null:this.renderTarget),t.render(this.scene,this.camera)}setSize(t,e){const n=this.resolution
n.setBaseSize(t,e),this.renderTarget.setSize(n.width,n.height),this.fullscreenMaterial.setSize(t,e)}initialize(t,e,n){const i=t.getContext()
if(!i.getExtension("EXT_color_buffer_float")&&!i.getExtension("EXT_color_buffer_half_float"))throw new Error("Rendering to float texture is not supported.")}},bp=class extends Da{constructor(t,e,n,i,s=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Dn.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new uf(null),depthBuffer:new uf(null),resolution:new uf(new cr),texelSize:new uf(new cr),cameraNear:new uf(.3),cameraFar:new uf(1e3),aspect:new uf(1),time:new uf(0)},blending:0,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:s}),t&&this.setShaderParts(t),e&&this.setDefines(e),n&&this.setUniforms(n),this.copyCameraSettings(i)}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(t){this.uniforms.depthBuffer.value=t}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(t){this.defines.DEPTH_PACKING=t.toFixed(0),this.needsUpdate=!0}setDepthBuffer(t,e=3200){this.depthBuffer=t,this.depthPacking=e}setShaderData(t){this.setShaderParts(t.shaderParts),this.setDefines(t.defines),this.setUniforms(t.uniforms),this.setExtensions(t.extensions)}setShaderParts(t){return this.fragmentShader="#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#define packFloatToRGBA(v) packDepthToRGBA(v)\n#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#if DEPTH_PACKING == 3201\nuniform lowp sampler2D depthBuffer;\n#elif defined(GL_FRAGMENT_PRECISION_HIGH)\nuniform highp sampler2D depthBuffer;\n#else\nuniform mediump sampler2D depthBuffer;\n#endif\nuniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){\n#if DEPTH_PACKING == 3201\nreturn unpackRGBAToDepth(texture2D(depthBuffer,uv));\n#else\nreturn texture2D(depthBuffer,uv).r;\n#endif\n}float getViewZ(const in float depth){\n#ifdef PERSPECTIVE_CAMERA\nreturn perspectiveDepthToViewZ(depth,cameraNear,cameraFar);\n#else\nreturn orthographicDepthToViewZ(depth,cameraNear,cameraFar);\n#endif\n}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;\n#ifdef ENCODE_OUTPUT\n#include <colorspace_fragment>\n#endif\n#include <dithering_fragment>\n}".replace(dp.FRAGMENT_HEAD,t.get(dp.FRAGMENT_HEAD)||"").replace(dp.FRAGMENT_MAIN_UV,t.get(dp.FRAGMENT_MAIN_UV)||"").replace(dp.FRAGMENT_MAIN_IMAGE,t.get(dp.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}".replace(dp.VERTEX_HEAD,t.get(dp.VERTEX_HEAD)||"").replace(dp.VERTEX_MAIN_SUPPORT,t.get(dp.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(t){for(const e of t.entries())this.defines[e[0]]=e[1]
return this.needsUpdate=!0,this}setUniforms(t){for(const e of t.entries())this.uniforms[e[0]]=e[1]
return this}setExtensions(t){this.extensions={}
for(const e of t)this.extensions[e]=!0
return this}get encodeOutput(){return void 0!==this.defines.ENCODE_OUTPUT}set encodeOutput(t){this.encodeOutput!==t&&(t?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(t){return this.encodeOutput}setOutputEncodingEnabled(t){this.encodeOutput=t}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}setDeltaTime(t){this.uniforms.time.value+=t}adoptCameraSettings(t){this.copyCameraSettings(t)}copyCameraSettings(t){t&&(this.uniforms.cameraNear.value=t.near,this.uniforms.cameraFar.value=t.far,t instanceof Fa?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(t,e){const n=this.uniforms
n.resolution.value.set(t,e),n.texelSize.value.set(1/t,1/e),n.aspect.value=t/e}static get Section(){return dp}},Ap=class extends ip{constructor(t,...e){super("EffectPass"),this.fullscreenMaterial=new bp(null,null,null,t),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(t){for(const e of this.effects)e.mainScene=t}set mainCamera(t){this.fullscreenMaterial.copyCameraSettings(t)
for(const e of this.effects)e.mainCamera=t}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(t){this.fullscreenMaterial.encodeOutput=t}get dithering(){return this.fullscreenMaterial.dithering}set dithering(t){const e=this.fullscreenMaterial
e.dithering=t,e.needsUpdate=!0}setEffects(t){for(const e of this.effects)e.removeEventListener("change",this.listener)
this.effects=t.sort((t,e)=>e.attributes-t.attributes)
for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const t=new pp
let e=0
for(const o of this.effects)if(9===o.blendMode.blendFunction)t.attributes|=o.getAttributes()&up
else{if(0!==(t.attributes&o.getAttributes()&fp))throw new Error(`Convolution effects cannot be merged (${o.name})`)
vn("e"+e++,o,t)}let n=t.shaderParts.get(dp.FRAGMENT_HEAD),i=t.shaderParts.get(dp.FRAGMENT_MAIN_IMAGE),s=t.shaderParts.get(dp.FRAGMENT_MAIN_UV)
const r=/\bblend\b/g
for(const o of t.blendModes.values())n+=o.getShaderCode().replace(r,`blend${o.blendFunction}`)+"\n"
0!==(t.attributes&up)?(t.readDepth&&(i="float depth = readDepth(UV);\n\n\t"+i),this.needsDepthTexture=null===this.getDepthTexture()):this.needsDepthTexture=!1,t.colorSpace===Gs&&(i+="color0 = sRGBToLinear(color0);\n\t"),t.uvTransformation?(s="vec2 transformedUv = vUv;\n"+s,t.defines.set("UV","transformedUv")):t.defines.set("UV","vUv"),t.shaderParts.set(dp.FRAGMENT_HEAD,n),t.shaderParts.set(dp.FRAGMENT_MAIN_IMAGE,i),t.shaderParts.set(dp.FRAGMENT_MAIN_UV,s)
for(const[o,a]of t.shaderParts)null!==a&&t.shaderParts.set(o,a.trim().replace(/^#/,"\n#"))
this.skipRendering=0===e,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(t)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(t,e=3200){this.fullscreenMaterial.depthBuffer=t,this.fullscreenMaterial.depthPacking=e
for(const n of this.effects)n.setDepthTexture(t,e)}render(t,e,n,i,s){for(const r of this.effects)r.update(t,e,i)
if(!this.skipRendering||this.renderToScreen){const s=this.fullscreenMaterial
s.inputBuffer=e.texture,s.time+=i*this.timeScale,t.setRenderTarget(this.renderToScreen?null:n),t.render(this.scene,this.camera)}}setSize(t,e){this.fullscreenMaterial.setSize(t,e)
for(const n of this.effects)n.setSize(t,e)}initialize(t,e,n){this.renderer=t
for(const i of this.effects)i.initialize(t,e,n)
this.updateMaterial(),void 0!==n&&n!==Ni&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose()
for(const t of this.effects)t.removeEventListener("change",this.listener),t.dispose()}handleEvent(t){"change"===t.type&&this.recompile()}},Tp=class extends ip{constructor(t,e,{renderTarget:n,resolutionScale:i=1,width:s=_p.AUTO_SIZE,height:r=_p.AUTO_SIZE,resolutionX:o=s,resolutionY:a=r}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new xp(t,e,new Nl)
const h=this.renderPass
h.ignoreBackground=!0,h.skipShadowMapUpdate=!0
const c=h.getClearPass()
c.overrideClearColor=new Zo(7829503),c.overrideClearAlpha=1,this.renderTarget=n,void 0===this.renderTarget&&(this.renderTarget=new Pr(1,1,{minFilter:bi,magFilter:bi}),this.renderTarget.texture.name="NormalPass.Target")
const l=this.resolution=new _p(this,o,a,i)
l.addEventListener("change",t=>this.setSize(l.baseWidth,l.baseHeight))}set mainScene(t){this.renderPass.mainScene=t}set mainCamera(t){this.renderPass.mainCamera=t}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(t){this.resolution.scale=t}render(t,e,n,i,s){const r=this.renderToScreen?null:this.renderTarget
this.renderPass.render(t,r,r)}setSize(t,e){const n=this.resolution
n.setBaseSize(t,e),this.renderTarget.setSize(n.width,n.height)}}
export{di as A,Un as B,wr as C,Ep as D,lp as E,uf as F,Hi as H,Vs as L,fi as N,_u as O,Fa as P,Sn as R,qa as S,Rd as T,Ni as U,On as V,Id as W,i as a,wn as b,fn as c,ln as d,pf as e,Rn as f,t as g,In as h,Cn as i,Gs as j,$d as k,go as l,Zo as m,Xi as n,ur as o,cr as p,Bu as q,n as r,Nn as s,Zd as t,xp as u,Tp as v,Sp as w,dn as x,Ap as y,ip as z}
