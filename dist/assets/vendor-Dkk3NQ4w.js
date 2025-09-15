function t(t){return t&&t.t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function i(){return T||(T=1,D.exports=function(){return K||(K=1,function(t){function i(t,i){var e=t.length
t.push(i)
t:for(;0<e;){var n=e-1>>>1,r=t[n]
if(!(0<s(r,i)))break t
t[n]=i,t[e]=r,e=n}}function e(t){return 0===t.length?null:t[0]}function n(t){if(0===t.length)return null
var i=t[0],e=t.pop()
if(e!==i){t[0]=e
t:for(var n=0,r=t.length,o=r>>>1;n<o;){var h=2*(n+1)-1,c=t[h],u=h+1,a=t[u]
if(0>s(c,e))u<r&&0>s(a,c)?(t[n]=a,t[u]=e,n=u):(t[n]=c,t[h]=e,n=h)
else{if(!(u<r&&0>s(a,e)))break t
t[n]=a,t[u]=e,n=u}}}return i}function s(t,i){var e=t.sortIndex-i.sortIndex
return 0!==e?e:t.id-i.id}function r(t){for(var s=e(y);null!==s;){if(null===s.callback)n(y)
else{if(!(s.startTime<=t))break
n(y),s.sortIndex=s.expirationTime,i(p,s)}s=e(y)}}function o(t){if(O=!1,r(t),!M)if(null!==e(p))M=!0,a(h)
else{var i=e(y)
null!==i&&l(o,i.startTime-t)}}function h(i,s){M=!1,O&&(O=!1,k(T),T=-1),b=!0
var h=w
try{for(r(s),m=e(p);null!==m&&(!(m.expirationTime>s)||i&&!c());){var u=m.callback
if("function"==typeof u){m.callback=null,w=m.priorityLevel
var a=u(m.expirationTime<=s)
s=t.unstable_now(),"function"==typeof a?m.callback=a:m===e(p)&&n(p),r(s)}else n(p)
m=e(p)}if(null!==m)var f=!0
else{var d=e(y)
null!==d&&l(o,d.startTime-s),f=!1}return f}finally{m=null,w=h,b=!1}}function c(){return!(t.unstable_now()-C<A)}function u(){if(null!==K){var i=t.unstable_now()
C=i
var e=!0
try{e=K(!0,i)}finally{e?S():(E=!1,K=null)}}else E=!1}function a(t){K=t,E||(E=!0,S())}function l(i,e){T=j(function(){i(t.unstable_now())},e)}if("object"==typeof performance&&"function"==typeof performance.now){var f=performance
t.unstable_now=function(){return f.now()}}else{var d=Date,v=d.now()
t.unstable_now=function(){return d.now()-v}}var p=[],y=[],g=1,m=null,w=3,b=!1,M=!1,O=!1,j="function"==typeof setTimeout?setTimeout:null,k="function"==typeof clearTimeout?clearTimeout:null,x="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var S,E=!1,K=null,T=-1,A=5,C=-1
if("function"==typeof x)S=function(){x(u)}
else if("undefined"!=typeof MessageChannel){var D=new MessageChannel,P=D.port2
D.port1.onmessage=u,S=function(){P.postMessage(null)}}else S=function(){j(u,0)}
t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(t){t.callback=null},t.unstable_continueExecution=function(){M||b||(M=!0,a(h))},t.unstable_forceFrameRate=function(t){0>t||125<t?void 0:A=0<t?Math.floor(1e3/t):5},t.unstable_getCurrentPriorityLevel=function(){return w},t.unstable_getFirstCallbackNode=function(){return e(p)},t.unstable_next=function(t){switch(w){case 1:case 2:case 3:var i=3
break
default:i=w}var e=w
w=i
try{return t()}finally{w=e}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(t,i){switch(t){case 1:case 2:case 3:case 4:case 5:break
default:t=3}var e=w
w=t
try{return i()}finally{w=e}},t.unstable_scheduleCallback=function(n,s,r){var c=t.unstable_now()
switch(r="object"==typeof r&&null!==r&&"number"==typeof(r=r.delay)&&0<r?c+r:c,n){case 1:var u=-1
break
case 2:u=250
break
case 5:u=1073741823
break
case 4:u=1e4
break
default:u=5e3}return n={id:g++,callback:s,priorityLevel:n,startTime:r,expirationTime:u=r+u,sortIndex:-1},r>c?(n.sortIndex=r,i(y,n),null===e(p)&&n===e(y)&&(O?(k(T),T=-1):O=!0,l(o,r-c))):(n.sortIndex=u,i(p,n),M||b||(M=!0,a(h))),n},t.unstable_shouldYield=c,t.unstable_wrapCallback=function(t){var i=w
return function(){var e=w
w=i
try{return t.apply(this,arguments)}finally{w=e}}}}(P)),P}()),D.exports}function e(t,i,e){return 0===i||Math.abs(i)===1/0?Math.pow(t,5*e):t*i*e/(i+e*t)}function n(t,i,n,s=.15){return 0===s?function(t,i,e){return Math.max(i,Math.min(t,e))}(t,i,n):t<i?-e(i-t,n-i,s)+i:t>n?+e(t-n,n-i,s)+n:t}function s(t,i,e){return(i=function(t){var i=function(t){if("object"!=typeof t||null===t)return t
var i=t[Symbol.toPrimitive]
if(void 0!==i){var e=i.call(t,"string")
if("object"!=typeof e)return e
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t)
return"symbol"==typeof i?i:String(i)}(i))in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function r(t,i){var e=Object.keys(t)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t)
i&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),e.push.apply(e,n)}return e}function o(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{}
i%2?r(Object(e),!0).forEach(function(i){s(t,i,e[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))})}return t}function h(t){return t?t[0].toUpperCase()+t.slice(1):""}function c(t){let i=t.substring(2).toLowerCase()
const e=!!~i.indexOf("passive")
e&&(i=i.replace("passive",""))
const n=W.includes(i)?"capturecapture":"capture",s=!!~i.indexOf(n)
return s&&(i=i.replace("capture","")),{device:i,capture:s,passive:e}}function u(t){return"touches"in t}function a(t){return u(t)?"touch":"pointerType"in t?t.pointerType:"mouse"}function l(t){return u(t)?function(t){return"touchend"===t.type||"touchcancel"===t.type?t.changedTouches:t.targetTouches}(t)[0]:t}function f(t,i){try{const e=i.clientX-t.clientX,n=i.clientY-t.clientY,s=(i.clientX+t.clientX)/2,r=(i.clientY+t.clientY)/2,o=Math.hypot(e,n)
return{angle:-180*Math.atan2(e,n)/Math.PI,distance:o,origin:[s,r]}}catch(e){}return null}function d(t,i){const[e,n]=Array.from(t.touches).filter(t=>i.includes(t.identifier))
return f(e,n)}function v(t){const i=l(t)
return u(t)?i.identifier:i.pointerId}function p(t){const i=l(t)
return[i.clientX,i.clientY]}function y(t){let{deltaX:i,deltaY:e,deltaMode:n}=t
return 1===n?(i*=40,e*=40):2===n&&(i*=800,e*=800),[i,e]}function g(t,...i){return"function"==typeof t?t(...i):t}function m(){}function w(...t){return 0===t.length?m:1===t.length?t[0]:function(){let i
for(const e of t)i=e.apply(this,arguments)||i
return i}}function b(t,i){return Object.assign({},i,t||{})}function M(){return F&&"ontouchstart"in window}function O(t){const[i,e]=t.overflow,[n,s]=t.i,[r,o]=t.o;(i<0&&n>0&&r<0||i>0&&n<0&&r>0)&&(t.h[0]=t.u[0]),(e<0&&s>0&&o<0||e>0&&s<0&&o>0)&&(t.h[1]=t.u[1])}function j(t){nt.set(t.key,t.engine),st.set(t.key,t.resolver)}function k(t={},i){const e={}
for(const[n,s]of Object.entries(i))switch(typeof s){case"function":e[n]=s.call(e,t[n],n,t)
break
case"object":e[n]=k(t[n],s)
break
case"boolean":s&&(e[n]=t[n])}return e}function x(t,i){t.gestures.add(i),t.gestureEventStores[i]=new dt(t,i),t.gestureTimeoutStores[i]=new vt}function S(t,i,e,n,s,r){if(!t.has(e))return
if(!nt.has(n))return
const o=e+"Start",h=e+"End"
s[n]=t=>{let n
return t.first&&o in i&&i[o](t),e in i&&(n=i[e](t)),t.last&&h in i&&i[h](t),n},r[n]=r[n]||{}}function E(t,i){const[e,n,s]=function(t){const i={},e={},n=new Set
for(let s in t)gt.test(s)?(n.add(RegExp.lastMatch),e[s]=t[s]):i[s]=t[s]
return[e,i,n]}(t),r={}
return S(s,e,"onDrag","drag",r,i),S(s,e,"onWheel","wheel",r,i),S(s,e,"onScroll","scroll",r,i),S(s,e,"onPinch","pinch",r,i),S(s,e,"onMove","move",r,i),S(s,e,"onHover","hover",r,i),{handlers:r,config:i,nativeHandlers:n}}var K,T,A,C,D={exports:{}},P={}
const I=t(function(){return C?A:(C=1,A=function(t,i,e,n,s,r,o,h){if(!t){var c
if(void 0===i)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var u=[e,n,s,r,o,h],a=0;(c=new Error(i.replace(/%s/g,function(){return u[a++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}})}())
var L,H
const _=t(function(){return H?L:(H=1,L=function(t,i,e,n){var s=e?e.call(n,t,i):void 0
if(void 0!==s)return!!s
if(t===i)return!0
if("object"!=typeof t||!t||"object"!=typeof i||!i)return!1
var r=Object.keys(t),o=Object.keys(i)
if(r.length!==o.length)return!1
for(var h=Object.prototype.hasOwnProperty.bind(i),c=0;c<r.length;c++){var u=r[c]
if(!h(u))return!1
var a=t[u],l=i[u]
if(!1===(s=e?e.call(n,a,l,u):void 0)||void 0===s&&a!==l)return!1}return!0})}()),B={toVector:(t,i)=>(void 0===t&&(t=i),Array.isArray(t)?t:[t,t]),add:(t,i)=>[t[0]+i[0],t[1]+i[1]],sub:(t,i)=>[t[0]-i[0],t[1]-i[1]],addTo(t,i){t[0]+=i[0],t[1]+=i[1]},subTo(t,i){t[0]-=i[0],t[1]-=i[1]}},U={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}},V=["enter","leave"],W=["gotpointercapture","lostpointercapture"]
class R{constructor(t,i,e){this.ctrl=t,this.args=i,this.key=e,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(t){this.ctrl.state[this.key]=t}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){const{state:t,shared:i,ingKey:e,args:n}=this
i[e]=t.l=t.active=t.v=t.p=!1,t.m=[!1,!1],t.intentional=!1,t.h=[0,0],t.M=[0,0],t.o=[0,0],t.i=[0,0],t.O=[[-1/0,1/0],[-1/0,1/0]],t.args=n,t.axis=void 0,t.memo=void 0,t.elapsedTime=t.timeDelta=0,t.direction=[0,0],t.distance=[0,0],t.overflow=[0,0],t.u=[!1,!1],t.velocity=[0,0],t.movement=[0,0],t.delta=[0,0],t.timeStamp=0}start(t){const i=this.state,e=this.config
i.l||(this.reset(),this.computeInitial(),i.l=!0,i.target=t.target,i.currentTarget=t.currentTarget,i.lastOffset=e.from?g(e.from,i):i.offset,i.offset=i.lastOffset,i.startTime=i.timeStamp=t.timeStamp)}computeValues(t){const i=this.state
i.j=t,i.values=this.config.transform(t)}computeInitial(){const t=this.state
t.k=t.j,t.initial=t.values}compute(t){const{state:i,config:e,shared:s}=this
i.args=this.args
let r=0
if(t&&(i.event=t,e.preventDefault&&t.cancelable&&i.event.preventDefault(),i.type=t.type,s.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,s.locked=!!document.pointerLockElement,Object.assign(s,function(t){const i={}
if("buttons"in t&&(i.buttons=t.buttons),"shiftKey"in t){const{shiftKey:e,altKey:n,metaKey:s,ctrlKey:r}=t
Object.assign(i,{shiftKey:e,altKey:n,metaKey:s,ctrlKey:r})}return i}(t)),s.down=s.pressed=s.buttons%2==1||s.touches>0,r=t.timeStamp-i.timeStamp,i.timeStamp=t.timeStamp,i.elapsedTime=i.timeStamp-i.startTime),i.l){const t=i.i.map(Math.abs)
B.addTo(i.M,t)}this.axisIntent&&this.axisIntent(t)
const[o,h]=i.h,[c,u]=e.threshold,{m:a,values:l}=i
if(e.hasCustomTransform?(!1===a[0]&&(a[0]=Math.abs(o)>=c&&l[0]),!1===a[1]&&(a[1]=Math.abs(h)>=u&&l[1])):(!1===a[0]&&(a[0]=Math.abs(o)>=c&&Math.sign(o)*c),!1===a[1]&&(a[1]=Math.abs(h)>=u&&Math.sign(h)*u)),i.intentional=!1!==a[0]||!1!==a[1],!i.intentional)return
const f=[0,0]
if(e.hasCustomTransform){const[t,i]=l
f[0]=!1!==a[0]?t-a[0]:0,f[1]=!1!==a[1]?i-a[1]:0}else f[0]=!1!==a[0]?o-a[0]:0,f[1]=!1!==a[1]?h-a[1]:0
this.restrictToAxis&&!i.v&&this.restrictToAxis(f)
const d=i.offset,v=i.l&&!i.v||i.active
v&&(i.first=i.l&&!i.active,i.last=!i.l&&i.active,i.active=s[this.ingKey]=i.l,t&&(i.first&&("bounds"in e&&(i.O=g(e.bounds,i)),this.setup&&this.setup()),i.movement=f,this.computeOffset()))
const[p,y]=i.offset,[[m,w],[b,M]]=i.O
i.overflow=[p<m?-1:p>w?1:0,y<b?-1:y>M?1:0],i.u[0]=!!i.overflow[0]&&(!1===i.u[0]?i.h[0]:i.u[0]),i.u[1]=!!i.overflow[1]&&(!1===i.u[1]?i.h[1]:i.u[1])
const O=i.l&&e.rubberband||[0,0]
if(i.offset=function(t,[i,e],[s,r]){const[[o,h],[c,u]]=t
return[n(i,o,h,s),n(e,c,u,r)]}(i.O,i.offset,O),i.delta=B.sub(i.offset,d),this.computeMovement(),v&&(!i.last||r>32)){i.delta=B.sub(i.offset,d)
const t=i.delta.map(Math.abs)
B.addTo(i.distance,t),i.direction=i.delta.map(Math.sign),i.o=i.i.map(Math.sign),!i.first&&r>0&&(i.velocity=[t[0]/r,t[1]/r],i.timeDelta=r)}}emit(){const t=this.state,i=this.shared,e=this.config
if(t.l||this.clean(),(t.v||!t.intentional)&&!t.p&&!e.triggerAllEvents)return
const n=this.handler(o(o(o({},i),t),{},{[this.aliasKey]:t.values}))
void 0!==n&&(t.memo=n)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}}class X extends R{constructor(...t){super(...t),s(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=B.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=B.sub(this.state.offset,this.state.lastOffset)}axisIntent(t){const i=this.state,e=this.config
if(!i.axis&&t){const n="object"==typeof e.axisThreshold?e.axisThreshold[a(t)]:e.axisThreshold
i.axis=function([t,i],e){const n=Math.abs(t),s=Math.abs(i)
return n>s&&n>e?"x":s>n&&s>e?"y":void 0}(i.h,n)}i.v=(e.lockDirection||!!e.axis)&&!i.axis||!!e.axis&&e.axis!==i.axis}restrictToAxis(t){if(this.config.axis||this.config.lockDirection)switch(this.state.axis){case"x":t[1]=0
break
case"y":t[0]=0}}}const Y=t=>t,G={enabled:(t=!0)=>t,eventOptions:(t,i,e)=>o(o({},e.shared.eventOptions),t),preventDefault:(t=!1)=>t,triggerAllEvents:(t=!1)=>t,rubberband(t=0){switch(t){case!0:return[.15,.15]
case!1:return[0,0]
default:return B.toVector(t)}},from:t=>"function"==typeof t?t:null!=t?B.toVector(t):void 0,transform(t,i,e){const n=t||e.shared.transform
return this.hasCustomTransform=!!n,n||Y},threshold:t=>B.toVector(t,0)},q=o(o({},G),{},{axis(t,i,{axis:e}){if(this.lockDirection="lock"===e,!this.lockDirection)return e},axisThreshold:(t=0)=>t,bounds(t={}){if("function"==typeof t)return i=>q.bounds(t(i))
if("current"in t)return()=>t.current
if("function"==typeof HTMLElement&&t instanceof HTMLElement)return t
const{left:i=-1/0,right:e=1/0,top:n=-1/0,bottom:s=1/0}=t
return[[i,e],[n,s]]}}),z={ArrowRight:(t,i=1)=>[t*i,0],ArrowLeft:(t,i=1)=>[-1*t*i,0],ArrowUp:(t,i=1)=>[0,-1*t*i],ArrowDown:(t,i=1)=>[0,t*i]},F="undefined"!=typeof window&&window.document&&window.document.createElement,J={isBrowser:F,gesture:function(){try{return"constructor"in GestureEvent}catch(t){return!1}}(),touch:M(),touchscreen:M()||F&&window.navigator.maxTouchPoints>1,pointer:F&&"onpointerdown"in window,pointerLock:F&&"exitPointerLock"in window.document},N={mouse:0,touch:0,pen:8},Q=o(o({},q),{},{device(t,i,{pointer:{touch:e=!1,lock:n=!1,mouse:s=!1}={}}){return this.pointerLock=n&&J.pointerLock,J.touch&&e?"touch":this.pointerLock?"mouse":J.pointer&&!s?"pointer":J.touch?"touch":"mouse"},preventScrollAxis(t,i,{preventScroll:e}){if(this.preventScrollDelay="number"==typeof e?e:e||void 0===e&&t?250:void 0,J.touchscreen&&!1!==e)return t||(void 0!==e?"y":void 0)},pointerCapture(t,i,{pointer:{capture:e=!0,buttons:n=1,keys:s=!0}={}}){return this.pointerButtons=n,this.keys=s,!this.pointerLock&&"pointer"===this.device&&e},threshold(t,i,{filterTaps:e=!1,tapsThreshold:n=3,axis:s}){const r=B.toVector(t,e?n:s?1:0)
return this.filterTaps=e,this.tapsThreshold=n,r},swipe({velocity:t=.5,distance:i=50,duration:e=250}={}){return{velocity:this.transform(B.toVector(t)),distance:this.transform(B.toVector(i)),duration:e}},delay(t=0){switch(t){case!0:return 180
case!1:return 0
default:return t}},axisThreshold:t=>t?o(o({},N),t):N,keyboardDisplacement:(t=10)=>t}),Z=o(o({},G),{},{device(t,i,{shared:e,pointer:{touch:n=!1}={}}){if(e.target&&!J.touch&&J.gesture)return"gesture"
if(J.touch&&n)return"touch"
if(J.touchscreen){if(J.pointer)return"pointer"
if(J.touch)return"touch"}},bounds(t,i,{scaleBounds:e={},angleBounds:n={}}){const s=t=>{const i=b(g(e,t),{min:-1/0,max:1/0})
return[i.min,i.max]},r=t=>{const i=b(g(n,t),{min:-1/0,max:1/0})
return[i.min,i.max]}
return"function"!=typeof e&&"function"!=typeof n?[s(),r()]:t=>[s(t),r(t)]},threshold(t,i,e){return this.lockDirection="lock"===e.axis,B.toVector(t,this.lockDirection?[.1,3]:0)},modifierKey:t=>void 0===t?"ctrlKey":t,pinchOnWheel:(t=!0)=>t}),$=o(o({},q),{},{mouseOnly:(t=!0)=>t}),tt=q,it=q,et=o(o({},q),{},{mouseOnly:(t=!0)=>t}),nt=new Map,st=new Map,rt={key:"drag",engine:class extends X{constructor(...t){super(...t),s(this,"ingKey","dragging")}reset(){super.reset()
const t=this.state
t.S=void 0,t.K=!1,t.T=!1,t.A=!1,t.C=!1,t.swipe=[0,0],t.tap=!1,t.canceled=!1,t.cancel=this.cancel.bind(this)}setup(){const t=this.state
if(t.O instanceof HTMLElement){const i=t.O.getBoundingClientRect(),e=t.currentTarget.getBoundingClientRect(),n={left:i.left-e.left+t.offset[0],right:i.right-e.right+t.offset[0],top:i.top-e.top+t.offset[1],bottom:i.bottom-e.bottom+t.offset[1]}
t.O=q.bounds(n)}}cancel(){const t=this.state
t.canceled||(t.canceled=!0,t.l=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state.l=this.state.K||this.state.T}clean(){this.pointerClean(),this.state.K=!1,this.state.T=!1,super.clean()}pointerDown(t){const i=this.config,e=this.state
if(null!=t.buttons&&(Array.isArray(i.pointerButtons)?!i.pointerButtons.includes(t.buttons):-1!==i.pointerButtons&&i.pointerButtons!==t.buttons))return
const n=this.ctrl.setEventIds(t)
i.pointerCapture&&t.target.setPointerCapture(t.pointerId),n&&n.size>1&&e.K||(this.start(t),this.setupPointer(t),e.S=v(t),e.K=!0,this.computeValues(p(t)),this.computeInitial(),i.preventScrollAxis&&"mouse"!==a(t)?(e.l=!1,this.setupScrollPrevention(t)):i.delay>0?(this.setupDelayTrigger(t),i.triggerAllEvents&&(this.compute(t),this.emit())):this.startPointerDrag(t))}startPointerDrag(t){const i=this.state
i.l=!0,i.A=!0,i.C=!1,this.compute(t),this.emit()}pointerMove(t){const i=this.state,e=this.config
if(!i.K)return
const n=v(t)
if(void 0!==i.S&&n!==i.S)return
const s=p(t)
return document.pointerLockElement===t.target?i.i=[t.movementX,t.movementY]:(i.i=B.sub(s,i.j),this.computeValues(s)),B.addTo(i.h,i.i),this.compute(t),i.C&&i.intentional?(this.timeoutStore.remove("dragDelay"),i.active=!1,this.startPointerDrag(t),void 0):e.preventScrollAxis&&!i.A?i.axis?i.axis===e.preventScrollAxis||"xy"===e.preventScrollAxis?(i.l=!1,this.clean(),void 0):(this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(t),void 0):void 0:(this.emit(),void 0)}pointerUp(t){this.ctrl.setEventIds(t)
try{this.config.pointerCapture&&t.target.hasPointerCapture(t.pointerId)&&t.target.releasePointerCapture(t.pointerId)}catch(o){}const i=this.state,e=this.config
if(!i.l||!i.K)return
const n=v(t)
if(void 0!==i.S&&n!==i.S)return
this.state.K=!1,this.setActive(),this.compute(t)
const[s,r]=i.M
if(i.tap=s<=e.tapsThreshold&&r<=e.tapsThreshold,i.tap&&e.filterTaps)i.p=!0
else{const[t,n]=i.i,[s,r]=i.h,[o,h]=e.swipe.velocity,[c,u]=e.swipe.distance,a=e.swipe.duration
if(i.elapsedTime<a){const e=Math.abs(t/i.timeDelta),a=Math.abs(n/i.timeDelta)
e>o&&Math.abs(s)>c&&(i.swipe[0]=Math.sign(t)),a>h&&Math.abs(r)>u&&(i.swipe[1]=Math.sign(n))}}this.emit()}pointerClick(t){!this.state.tap&&t.detail>0&&(t.preventDefault(),t.stopPropagation())}setupPointer(t){const i=this.config,e=i.device
i.pointerLock&&t.currentTarget.requestPointerLock(),i.pointerCapture||(this.eventStore.add(this.sharedConfig.window,e,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,e,"end",this.pointerUp.bind(this)),this.eventStore.add(this.sharedConfig.window,e,"cancel",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(t){this.state.A&&t.cancelable&&t.preventDefault()}setupScrollPrevention(t){this.state.A=!1,function(t){"persist"in t&&"function"==typeof t.persist&&t.persist()}(t)
const i=this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1})
this.eventStore.add(this.sharedConfig.window,"touch","end",i),this.eventStore.add(this.sharedConfig.window,"touch","cancel",i),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScrollDelay,t)}setupDelayTrigger(t){this.state.C=!0,this.timeoutStore.add("dragDelay",()=>{this.state.m=[0,0],this.startPointerDrag(t)},this.config.delay)}keyDown(t){const i=z[t.key]
if(i){const e=this.state,n=t.shiftKey?10:t.altKey?.1:1
this.start(t),e.i=i(this.config.keyboardDisplacement,n),e.T=!0,B.addTo(e.h,e.i),this.compute(t),this.emit()}}keyUp(t){t.key in z&&(this.state.T=!1,this.setActive(),this.compute(t),this.emit())}bind(t){const i=this.config.device
t(i,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(t(i,"change",this.pointerMove.bind(this)),t(i,"end",this.pointerUp.bind(this)),t(i,"cancel",this.pointerUp.bind(this)),t("lostPointerCapture","",this.pointerUp.bind(this))),this.config.keys&&(t("key","down",this.keyDown.bind(this)),t("key","up",this.keyUp.bind(this))),this.config.filterTaps&&t("click","",this.pointerClick.bind(this),{capture:!0,passive:!1})}},resolver:Q},ot={key:"hover",engine:class extends X{constructor(...t){super(...t),s(this,"ingKey","hovering")}enter(t){this.config.mouseOnly&&"mouse"!==t.pointerType||(this.start(t),this.computeValues(p(t)),this.compute(t),this.emit())}leave(t){if(this.config.mouseOnly&&"mouse"!==t.pointerType)return
const i=this.state
if(!i.l)return
i.l=!1
const e=p(t)
i.h=i.i=B.sub(e,i.j),this.computeValues(e),this.compute(t),i.delta=i.movement,this.emit()}bind(t){t("pointer","enter",this.enter.bind(this)),t("pointer","leave",this.leave.bind(this))}},resolver:et},ht={key:"move",engine:class extends X{constructor(...t){super(...t),s(this,"ingKey","moving")}move(t){this.config.mouseOnly&&"mouse"!==t.pointerType||(this.state.l?this.moveChange(t):this.moveStart(t),this.timeoutStore.add("moveEnd",this.moveEnd.bind(this)))}moveStart(t){this.start(t),this.computeValues(p(t)),this.compute(t),this.computeInitial(),this.emit()}moveChange(t){if(!this.state.l)return
const i=p(t),e=this.state
e.i=B.sub(i,e.j),B.addTo(e.h,e.i),this.computeValues(i),this.compute(t),this.emit()}moveEnd(t){this.state.l&&(this.state.l=!1,this.compute(t),this.emit())}bind(t){t("pointer","change",this.move.bind(this)),t("pointer","leave",this.moveEnd.bind(this))}},resolver:$},ct={key:"pinch",engine:class extends R{constructor(...t){super(...t),s(this,"ingKey","pinching"),s(this,"aliasKey","da")}init(){this.state.offset=[1,0],this.state.lastOffset=[1,0],this.state.D=new Map}reset(){super.reset()
const t=this.state
t.P=[],t.canceled=!1,t.cancel=this.cancel.bind(this),t.turns=0}computeOffset(){const{type:t,movement:i,lastOffset:e}=this.state
this.state.offset="wheel"===t?B.add(i,e):[(1+i[0])*e[0],i[1]+e[1]]}computeMovement(){const{offset:t,lastOffset:i}=this.state
this.state.movement=[t[0]/i[0],t[1]-i[1]]}axisIntent(){const t=this.state,[i,e]=t.h
if(!t.axis){const n=30*Math.abs(i)-Math.abs(e)
n<0?t.axis="angle":n>0&&(t.axis="scale")}}restrictToAxis(t){this.config.lockDirection&&("scale"===this.state.axis?t[1]=0:"angle"===this.state.axis&&(t[0]=0))}cancel(){const t=this.state
t.canceled||setTimeout(()=>{t.canceled=!0,t.l=!1,this.compute(),this.emit()},0)}touchStart(t){this.ctrl.setEventIds(t)
const i=this.state,e=this.ctrl.touchIds
if(i.l&&i.P.every(t=>e.has(t)))return
if(e.size<2)return
this.start(t),i.P=Array.from(e).slice(0,2)
const n=d(t,i.P)
n&&this.pinchStart(t,n)}pointerStart(t){if(null!=t.buttons&&t.buttons%2!=1)return
this.ctrl.setEventIds(t),t.target.setPointerCapture(t.pointerId)
const i=this.state,e=i.D,n=this.ctrl.pointerIds
if(i.l&&Array.from(e.keys()).every(t=>n.has(t)))return
if(e.size<2&&e.set(t.pointerId,t),i.D.size<2)return
this.start(t)
const s=f(...Array.from(e.values()))
s&&this.pinchStart(t,s)}pinchStart(t,i){this.state.origin=i.origin,this.computeValues([i.distance,i.angle]),this.computeInitial(),this.compute(t),this.emit()}touchMove(t){if(!this.state.l)return
const i=d(t,this.state.P)
i&&this.pinchMove(t,i)}pointerMove(t){const i=this.state.D
if(i.has(t.pointerId)&&i.set(t.pointerId,t),!this.state.l)return
const e=f(...Array.from(i.values()))
e&&this.pinchMove(t,e)}pinchMove(t,i){const e=this.state,n=e.j[1],s=i.angle-n
let r=0
Math.abs(s)>270&&(r+=Math.sign(s)),this.computeValues([i.distance,i.angle-360*r]),e.origin=i.origin,e.turns=r,e.h=[e.j[0]/e.k[0]-1,e.j[1]-e.k[1]],this.compute(t),this.emit()}touchEnd(t){this.ctrl.setEventIds(t),this.state.l&&this.state.P.some(t=>!this.ctrl.touchIds.has(t))&&(this.state.l=!1,this.compute(t),this.emit())}pointerEnd(t){const i=this.state
this.ctrl.setEventIds(t)
try{t.target.releasePointerCapture(t.pointerId)}catch(e){}i.D.has(t.pointerId)&&i.D.delete(t.pointerId),i.l&&i.D.size<2&&(i.l=!1,this.compute(t),this.emit())}gestureStart(t){t.cancelable&&t.preventDefault()
const i=this.state
i.l||(this.start(t),this.computeValues([t.scale,t.rotation]),i.origin=[t.clientX,t.clientY],this.compute(t),this.emit())}gestureMove(t){if(t.cancelable&&t.preventDefault(),!this.state.l)return
const i=this.state
this.computeValues([t.scale,t.rotation]),i.origin=[t.clientX,t.clientY]
const e=i.h
i.h=[t.scale-1,t.rotation],i.i=B.sub(i.h,e),this.compute(t),this.emit()}gestureEnd(t){this.state.l&&(this.state.l=!1,this.compute(t),this.emit())}wheel(t){const i=this.config.modifierKey
i&&!(Array.isArray(i)?i.find(i=>t[i]):t[i])||(this.state.l?this.wheelChange(t):this.wheelStart(t),this.timeoutStore.add("wheelEnd",this.wheelEnd.bind(this)))}wheelStart(t){this.start(t),this.wheelChange(t)}wheelChange(t){"uv"in t||t.cancelable&&t.preventDefault()
const i=this.state
i.i=[-y(t)[1]/100*i.offset[0],0],B.addTo(i.h,i.i),O(i),this.state.origin=[t.clientX,t.clientY],this.compute(t),this.emit()}wheelEnd(){this.state.l&&(this.state.l=!1,this.compute(),this.emit())}bind(t){const i=this.config.device
i&&(t(i,"start",this[i+"Start"].bind(this)),t(i,"change",this[i+"Move"].bind(this)),t(i,"end",this[i+"End"].bind(this)),t(i,"cancel",this[i+"End"].bind(this)),t("lostPointerCapture","",this[i+"End"].bind(this))),this.config.pinchOnWheel&&t("wheel","",this.wheel.bind(this),{passive:!1})}},resolver:Z},ut={key:"scroll",engine:class extends X{constructor(...t){super(...t),s(this,"ingKey","scrolling")}scroll(t){this.state.l||this.start(t),this.scrollChange(t),this.timeoutStore.add("scrollEnd",this.scrollEnd.bind(this))}scrollChange(t){t.cancelable&&t.preventDefault()
const i=this.state,e=function(t){var i,e
const{scrollX:n,scrollY:s,scrollLeft:r,scrollTop:o}=t.currentTarget
return[null!==(i=null!=n?n:r)&&void 0!==i?i:0,null!==(e=null!=s?s:o)&&void 0!==e?e:0]}(t)
i.i=B.sub(e,i.j),B.addTo(i.h,i.i),this.computeValues(e),this.compute(t),this.emit()}scrollEnd(){this.state.l&&(this.state.l=!1,this.compute(),this.emit())}bind(t){t("scroll","",this.scroll.bind(this))}},resolver:tt},at={key:"wheel",engine:class extends X{constructor(...t){super(...t),s(this,"ingKey","wheeling")}wheel(t){this.state.l||this.start(t),this.wheelChange(t),this.timeoutStore.add("wheelEnd",this.wheelEnd.bind(this))}wheelChange(t){const i=this.state
i.i=y(t),B.addTo(i.h,i.i),O(i),this.compute(t),this.emit()}wheelEnd(){this.state.l&&(this.state.l=!1,this.compute(),this.emit())}bind(t){t("wheel","",this.wheel.bind(this))}},resolver:it},lt={target(t){if(t)return()=>"current"in t?t.current:t},enabled:(t=!0)=>t,window:(t=(J.isBrowser?window:void 0))=>t,eventOptions:({passive:t=!0,capture:i=!1}={})=>({passive:t,capture:i}),transform:t=>t},ft=["target","eventOptions","window","enabled","transform"]
class dt{constructor(t,i){s(this,"_listeners",new Set),this.I=t,this.L=i}add(t,i,e,n,s){const r=this.H,h=function(t,i=""){const e=U[t]
return t+(e&&e[i]||i)}(i,e),c=o(o({},this.L?this.I.config[this.L].eventOptions:{}),s)
t.addEventListener(h,n,c)
const u=()=>{t.removeEventListener(h,n,c),r.delete(u)}
return r.add(u),u}clean(){this.H.forEach(t=>t()),this.H.clear()}}class vt{constructor(){s(this,"_timeouts",new Map)}add(t,i,e=140,...n){this.remove(t),this._.set(t,window.setTimeout(i,e,...n))}remove(t){const i=this._.get(t)
i&&window.clearTimeout(i)}clean(){this._.forEach(t=>{window.clearTimeout(t)}),this._.clear()}}class pt{constructor(t){var i,e
s(this,"gestures",new Set),s(this,"_targetEventStore",new dt(this)),s(this,"gestureEventStores",{}),s(this,"gestureTimeoutStores",{}),s(this,"handlers",{}),s(this,"config",{}),s(this,"pointerIds",new Set),s(this,"touchIds",new Set),s(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),i=this,(e=t).drag&&x(i,"drag"),e.wheel&&x(i,"wheel"),e.scroll&&x(i,"scroll"),e.move&&x(i,"move"),e.pinch&&x(i,"pinch"),e.hover&&x(i,"hover")}setEventIds(t){return u(t)?(this.touchIds=new Set(function(t){return function(t){return Array.from(t.touches).filter(i=>{var e,n
return i.target===t.currentTarget||(null===(e=t.currentTarget)||void 0===e||null===(n=e.contains)||void 0===n?void 0:n.call(e,i.target))})}(t).map(t=>t.identifier)}(t)),this.touchIds):"pointerId"in t?("pointerup"===t.type||"pointercancel"===t.type?this.pointerIds.delete(t.pointerId):"pointerdown"===t.type&&this.pointerIds.add(t.pointerId),this.pointerIds):void 0}applyHandlers(t,i){this.handlers=t,this.nativeHandlers=i}applyConfig(t,i){this.config=function(t,i,e={}){const n=t,{target:s,eventOptions:r,window:h,enabled:c,transform:u}=n,a=function(t,i){if(null==t)return{}
var e,n,s=function(t,i){if(null==t)return{}
var e,n,s={},r=Object.keys(t)
for(n=0;n<r.length;n++)e=r[n],i.indexOf(e)>=0||(s[e]=t[e])
return s}(t,i)
if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t)
for(n=0;n<r.length;n++)e=r[n],i.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(s[e]=t[e])}return s}(n,ft)
if(e.shared=k({target:s,eventOptions:r,window:h,enabled:c,transform:u},lt),i){const t=st.get(i)
e[i]=k(o({shared:e.shared},a),t)}else for(const l in a){const t=st.get(l)
t&&(e[l]=k(o({shared:e.shared},a[l]),t))}return e}(t,i,this.config)}clean(){this.B.clean()
for(const t of this.gestures)this.gestureEventStores[t].clean(),this.gestureTimeoutStores[t].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this.B.clean()}bind(...t){const i=this.config.shared,e={}
let n
if(!i.target||(n=i.target(),n)){if(i.enabled){for(const i of this.gestures){const s=this.config[i],r=yt(e,s.eventOptions,!!n)
s.enabled&&new(nt.get(i))(this,t,i).bind(r)}const s=yt(e,i.eventOptions,!!n)
for(const i in this.nativeHandlers)s(i,"",e=>this.nativeHandlers[i](o(o({},this.state.shared),{},{event:e,args:t})),void 0,!0)}for(const t in e)e[t]=w(...e[t])
if(!n)return e
for(const t in e){const{device:i,capture:s,passive:r}=c(t)
this.B.add(n,i,"",e[t],{capture:s,passive:r})}}}}const yt=(t,i,e)=>(n,s,r,o={},c=!1)=>{var u,a
const l=null!==(u=o.capture)&&void 0!==u?u:i.capture,f=null!==(a=o.passive)&&void 0!==a?a:i.passive
let d=c?n:function(t,i="",e=!1){const n=U[t],s=n&&n[i]||i
return"on"+h(t)+h(s)+(function(t=!1,i){return t&&!V.includes(i)}(e,s)?"Capture":"")}(n,s,l)
e&&f&&(d+="Passive"),t[d]=t[d]||[],t[d].push(r)},gt=/^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/
export{pt as C,j as a,ct as b,ut as c,rt as d,t as g,ot as h,I as i,ht as m,E as p,i as r,_ as s,at as w}
