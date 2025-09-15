function n(n){return n&&n.t&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function e(){return t||(t=1,f.exports=function(){return r||(r=1,function(n){function e(n,e){var r=n.length
n.push(e)
n:for(;0<r;){var t=r-1>>>1,u=n[t]
if(!(0<i(u,e)))break n
n[t]=e,n[r]=u,r=t}}function r(n){return 0===n.length?null:n[0]}function t(n){if(0===n.length)return null
var e=n[0],r=n.pop()
if(r!==e){n[0]=r
n:for(var t=0,u=n.length,f=u>>>1;t<f;){var o=2*(t+1)-1,a=n[o],l=o+1,c=n[l]
if(0>i(a,r))l<u&&0>i(c,a)?(n[t]=c,n[l]=r,t=l):(n[t]=a,n[o]=r,t=o)
else{if(!(l<u&&0>i(c,r)))break n
n[t]=c,n[l]=r,t=l}}}return e}function i(n,e){var r=n.sortIndex-e.sortIndex
return 0!==r?r:n.id-e.id}function u(n){for(var i=r(b);null!==i;){if(null===i.callback)t(b)
else{if(!(i.startTime<=n))break
t(b),i.sortIndex=i.expirationTime,e(p,i)}i=r(b)}}function f(n){if(w=!1,u(n),!j)if(null!==r(p))j=!0,c(o)
else{var e=r(b)
null!==e&&v(f,e.startTime-n)}}function o(e,i){j=!1,w&&(w=!1,x(E),E=-1),k=!0
var o=h
try{for(u(i),g=r(p);null!==g&&(!(g.expirationTime>i)||e&&!a());){var l=g.callback
if("function"==typeof l){g.callback=null,h=g.priorityLevel
var c=l(g.expirationTime<=i)
i=n.unstable_now(),"function"==typeof c?g.callback=c:g===r(p)&&t(p),u(i)}else t(p)
g=r(p)}if(null!==g)var s=!0
else{var d=r(b)
null!==d&&v(f,d.startTime-i),s=!1}return s}finally{g=null,h=o,k=!1}}function a(){return!(n.unstable_now()-L<D)}function l(){if(null!==C){var e=n.unstable_now()
L=e
var r=!0
try{r=C(!0,e)}finally{r?M():(O=!1,C=null)}}else O=!1}function c(n){C=n,O||(O=!0,M())}function v(e,r){E=T(function(){e(n.unstable_now())},r)}if("object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var d=Date,y=d.now()
n.unstable_now=function(){return d.now()-y}}var p=[],b=[],m=1,g=null,h=3,k=!1,j=!1,w=!1,T="function"==typeof setTimeout?setTimeout:null,x="function"==typeof clearTimeout?clearTimeout:null,I="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var M,O=!1,C=null,E=-1,D=5,L=-1
if("function"==typeof I)M=function(){I(l)}
else if("undefined"!=typeof MessageChannel){var V=new MessageChannel,q=V.port2
V.port1.onmessage=l,M=function(){q.postMessage(null)}}else M=function(){T(l,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){j||k||(j=!0,c(o))},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:D=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return r(p)},n.unstable_next=function(n){switch(h){case 1:case 2:case 3:var e=3
break
default:e=h}var r=h
h=e
try{return n()}finally{h=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var r=h
h=n
try{return e()}finally{h=r}},n.unstable_scheduleCallback=function(t,i,u){var a=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?a+u:a,t){case 1:var l=-1
break
case 2:l=250
break
case 5:l=1073741823
break
case 4:l=1e4
break
default:l=5e3}return t={id:m++,callback:i,priorityLevel:t,startTime:u,expirationTime:l=u+l,sortIndex:-1},u>a?(t.sortIndex=u,e(b,t),null===r(p)&&t===r(b)&&(w?(x(E),E=-1):w=!0,v(f,u-a))):(t.sortIndex=l,e(p,t),j||k||(j=!0,c(o))),t},n.unstable_shouldYield=a,n.unstable_wrapCallback=function(n){var e=h
return function(){var r=h
h=e
try{return n.apply(this,arguments)}finally{h=r}}}}(o)),o}()),f.exports}var r,t,i,u,f={exports:{}},o={}
const a=n(function(){return u?i:(u=1,i=function(n,e,r,t,i,u,f,o){if(!n){var a
if(void 0===e)a=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var l=[r,t,i,u,f,o],c=0;(a=new Error(e.replace(/%s/g,function(){return l[c++]}))).name="Invariant Violation"}throw a.framesToPop=1,a}})}())
var l,c
const v=n(function(){return c?l:(c=1,l=function(n,e,r,t){var i=r?r.call(t,n,e):void 0
if(void 0!==i)return!!i
if(n===e)return!0
if("object"!=typeof n||!n||"object"!=typeof e||!e)return!1
var u=Object.keys(n),f=Object.keys(e)
if(u.length!==f.length)return!1
for(var o=Object.prototype.hasOwnProperty.bind(e),a=0;a<u.length;a++){var l=u[a]
if(!o(l))return!1
var c=n[l],v=e[l]
if(!1===(i=r?r.call(t,c,v,l):void 0)||void 0===i&&c!==v)return!1}return!0})}())
export{n as g,a as i,e as r,v as s}
