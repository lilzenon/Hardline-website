function n(){return Tn||(Tn=1,zn=function(n){function e(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r])
return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=Lt&&n[Lt]||n["@@iterator"])?n:null}function t(n){if(null==n)return null
if("function"==typeof n)return n.displayName||n.name||null
if("string"==typeof n)return n
switch(n){case Ct:return"Fragment"
case St:return"Portal"
case Pt:return"Profiler"
case Mt:return"StrictMode"
case Rt:return"Suspense"
case It:return"SuspenseList"}if("object"==typeof n)switch(n.$$typeof){case zt:return(n.displayName||"Context")+".Consumer"
case jt:return(n.t.displayName||"Context")+".Provider"
case Tt:var e=n.render
return(n=n.displayName)||(n=""!==(n=e.displayName||e.name||"")?"ForwardRef("+n+")":"ForwardRef"),n
case Ot:return null!==(e=n.displayName||null)?e:t(n.type)||"Memo"
case Ft:e=n.l,n=n.u
try{return t(n(e))}catch(r){}}return null}function l(n){var e=n.type
switch(n.tag){case 24:return"Cache"
case 9:return(e.displayName||"Context")+".Consumer"
case 10:return(e.t.displayName||"Context")+".Provider"
case 18:return"DehydratedFragment"
case 11:return n=(n=e.render).displayName||n.name||"",e.displayName||(""!==n?"ForwardRef("+n+")":"ForwardRef")
case 7:return"Fragment"
case 5:return e
case 4:return"Portal"
case 3:return"Root"
case 6:return"Text"
case 16:return t(e)
case 8:return e===Mt?"StrictMode":"Mode"
case 22:return"Offscreen"
case 12:return"Profiler"
case 21:return"Scope"
case 13:return"Suspense"
case 19:return"SuspenseList"
case 25:return"TracingMarker"
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof e)return e.displayName||e.name||null
if("string"==typeof e)return e}return null}function u(n){var e=n,r=n
if(n.alternate)for(;e.return;)e=e.return
else{n=e
do{!!(4098&(e=n).flags)&&(r=e.return),n=e.return}while(n)}return 3===e.tag?r:null}function o(n){if(u(n)!==n)throw Error(e(188))}function i(n){var r=n.alternate
if(!r){if(null===(r=u(n)))throw Error(e(188))
return r!==n?null:n}for(var t=n,l=r;;){var i=t.return
if(null===i)break
var a=i.alternate
if(null===a){if(null!==(l=i.return)){t=l
continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===t)return o(i),n
if(a===l)return o(i),r
a=a.sibling}throw Error(e(188))}if(t.return!==l.return)t=i,l=a
else{for(var c=!1,f=i.child;f;){if(f===t){c=!0,t=i,l=a
break}if(f===l){c=!0,l=i,t=a
break}f=f.sibling}if(!c){for(f=a.child;f;){if(f===t){c=!0,t=a,l=i
break}if(f===l){c=!0,l=a,t=i
break}f=f.sibling}if(!c)throw Error(e(189))}}if(t.alternate!==l)throw Error(e(190))}if(3!==t.tag)throw Error(e(188))
return t.stateNode.current===t?n:r}function a(n){return null!==(n=i(n))?c(n):null}function c(n){if(5===n.tag||6===n.tag)return n
for(n=n.child;null!==n;){var e=c(n)
if(null!==e)return e
n=n.sibling}return null}function f(n){if(5===n.tag||6===n.tag)return n
for(n=n.child;null!==n;){if(4!==n.tag){var e=f(n)
if(null!==e)return e}n=n.sibling}return null}function s(n){if(void 0===dt)try{throw Error()}catch(r){var e=r.stack.trim().match(/\n( *(at )?)/)
dt=e&&e[1]||""}return"\n"+dt+n}function v(n,e){if(!n||uu)return""
uu=!0
var r=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var t=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){t=c}n.call(e.prototype)}else{try{throw Error()}catch(c){t=c}n()}}catch(c){if(c&&t&&"string"==typeof c.stack){for(var l=c.stack.split("\n"),u=t.stack.split("\n"),o=l.length-1,i=u.length-1;1<=o&&0<=i&&l[o]!==u[i];)i--
for(;1<=o&&0<=i;o--,i--)if(l[o]!==u[i]){if(1!==o||1!==i)do{if(o--,0>--i||l[o]!==u[i]){var a="\n"+l[o].replace(" at new "," at ")
return n.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",n.displayName)),a}}while(1<=o&&0<=i)
break}}}finally{uu=!1,Error.prepareStackTrace=r}return(n=n?n.displayName||n.name:"")?s(n):""}function d(n){return{current:n}}function p(n){0>au||(n.current=iu[au],iu[au]=null,au--)}function h(n,e){au++,iu[au]=n.current,n.current=e}function y(n,e){var r=n.type.contextTypes
if(!r)return cu
var t=n.stateNode
if(t&&t.o===e)return t.i
var l,u={}
for(l in r)u[l]=e[l]
return t&&((n=n.stateNode).o=e,n.i=u),u}function w(n){return null!=n.childContextTypes}function b(){p(su),p(fu)}function m(n,r,t){if(fu.current!==cu)throw Error(e(168))
h(fu,r),h(su,t)}function g(n,r,t){var u=n.stateNode
if(r=r.childContextTypes,"function"!=typeof u.getChildContext)return t
for(var o in u=u.getChildContext())if(!(o in r))throw Error(e(108,l(n)||"Unknown",o))
return kt({},t,u)}function k(n){return n=(n=n.stateNode)&&n.v||cu,vu=fu.current,h(fu,n),h(su,su.current),!0}function x(n,r,t){var l=n.stateNode
if(!l)throw Error(e(169))
t?(n=g(n,r,vu),l.v=n,p(su),p(fu),h(fu,n)):p(su),h(su,t)}function E(n){switch(n&-n){case 1:return 1
case 2:return 2
case 4:return 4
case 8:return 8
case 16:return 16
case 32:return 32
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&n
case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&n
case 134217728:return 134217728
case 268435456:return 268435456
case 536870912:return 536870912
case 1073741824:return 1073741824
default:return n}}function S(n,e){var r=n.pendingLanes
if(0===r)return 0
var t=0,l=n.suspendedLanes,u=n.pingedLanes,o=268435455&r
if(0!==o){var i=o&~l
0!==i?t=E(i):0!==(u&=o)&&(t=E(u))}else 0!==(o=r&~l)?t=E(o):0!==u&&(t=E(u))
if(0===t)return 0
if(0!==e&&e!==t&&0===(e&l)&&((l=t&-t)>=(u=e&-e)||16===l&&4194240&u))return e
if(4&t&&(t|=16&r),0!==(e=n.entangledLanes))for(n=n.entanglements,e&=t;0<e;)l=1<<(r=31-du(e)),t|=n[r],e&=~l
return t}function C(n,e){switch(n){case 1:case 2:case 4:return e+250
case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3
default:return-1}}function M(n){return 0!=(n=-1073741825&n.pendingLanes)?n:1073741824&n?1073741824:0}function P(n){for(var e=[],r=0;31>r;r++)e.push(n)
return e}function j(n,e,r){n.pendingLanes|=e,536870912!==e&&(n.suspendedLanes=0,n.pingedLanes=0),(n=n.eventTimes)[e=31-du(e)]=r}function z(n,e){var r=n.entangledLanes|=e
for(n=n.entanglements;r;){var t=31-du(r),l=1<<t
l&e|n[t]&e&&(n[t]|=e),r&=~l}}function T(n){return 1<(n&=-n)?4<n?268435455&n?16:536870912:4:1}function R(n){null===Ru?Ru=[n]:Ru.push(n)}function I(){if(!Ou&&null!==Ru){Ou=!0
var n=0,e=bu
try{var r=Ru
for(bu=1;n<r.length;n++){var t=r[n]
do{t=t(!0)}while(null!==t)}Ru=null,Iu=!1}catch(l){throw null!==Ru&&(Ru=Ru.slice(n+1)),mu(Su,I),l}finally{bu=e,Ou=!1}}return null}function O(n,e){if(Tu(n,e))return!0
if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1
var r=Object.keys(n),t=Object.keys(e)
if(r.length!==t.length)return!1
for(t=0;t<r.length;t++){var l=r[t]
if(!ou.call(e,l)||!Tu(n[l],e[l]))return!1}return!0}function F(n){switch(n.tag){case 5:return s(n.type)
case 16:return s("Lazy")
case 13:return s("Suspense")
case 19:return s("SuspenseList")
case 0:case 2:case 15:return v(n.type,!1)
case 11:return v(n.type.render,!1)
case 1:return v(n.type,!0)
default:return""}}function D(n,e){if(n&&n.defaultProps){for(var r in e=kt({},e),n=n.defaultProps)void 0===e[r]&&(e[r]=n[r])
return e}return e}function L(){Au=_u=Lu=null}function _(n,e,r){Xt?(h(Du,e.p),e.p=r):(h(Du,e.h),e.h=r)}function N(n){var e=Du.current
p(Du),Xt?n.p=e:n.h=e}function B(n,e,r){for(;null!==n;){var t=n.alternate
if((n.childLanes&e)!==e?(n.childLanes|=e,null!==t&&(t.childLanes|=e)):null!==t&&(t.childLanes&e)!==e&&(t.childLanes|=e),n===r)break
n=n.return}}function H(n,e){Lu=n,Au=_u=null,null!==(n=n.dependencies)&&null!==n.firstContext&&(0!==(n.lanes&e)&&(zo=!0),n.firstContext=null)}function U(n){var r=Xt?n.p:n.h
if(Au!==n)if(n={context:n,memoizedValue:r,next:null},null===_u){if(null===Lu)throw Error(e(308))
_u=n,Lu.dependencies={lanes:0,firstContext:n}}else _u=_u.next=n
return r}function V(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function q(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function $(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function W(n,e){var r=n.updateQueue
null!==r&&(r=r.shared,null!==Yo&&1&n.mode&&!(2&Go)?(null===(n=r.interleaved)?(e.next=e,null===Nu?Nu=[r]:Nu.push(r)):(e.next=n.next,n.next=e),r.interleaved=e):(null===(n=r.pending)?e.next=e:(e.next=n.next,n.next=e),r.pending=e))}function G(n,e,r){if(null!==(e=e.updateQueue)&&(e=e.shared,4194240&r)){var t=e.lanes
r|=t&=n.pendingLanes,e.lanes=r,z(n,r)}}function Y(n,e){var r=n.updateQueue,t=n.alternate
if(null!==t&&r===(t=t.updateQueue)){var l=null,u=null
if(null!==(r=r.firstBaseUpdate)){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null}
null===u?l=u=o:u=u.next=o,r=r.next}while(null!==r)
null===u?l=u=e:u=u.next=e}else l=u=e
return r={baseState:t.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:t.shared,effects:t.effects},n.updateQueue=r,void 0}null===(n=r.lastBaseUpdate)?r.firstBaseUpdate=e:n.next=e,r.lastBaseUpdate=e}function J(n,e,r,t){var l=n.updateQueue
Bu=!1
var u=l.firstBaseUpdate,o=l.lastBaseUpdate,i=l.shared.pending
if(null!==i){l.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var f=n.alternate
null!==f&&(i=(f=f.updateQueue).lastBaseUpdate)!==o&&(null===i?f.firstBaseUpdate=c:i.next=c,f.lastBaseUpdate=a)}if(null!==u){var s=l.baseState
for(o=0,f=c=a=null,i=u;;){var v=i.lane,d=i.eventTime
if((t&v)===v){null!==f&&(f=f.next={eventTime:d,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null})
n:{var p=n,h=i
switch(v=e,d=r,h.tag){case 1:if("function"==typeof(p=h.payload)){s=p.call(d,s,v)
break n}s=p
break n
case 3:p.flags=-65537&p.flags|128
case 0:if(null==(v="function"==typeof(p=h.payload)?p.call(d,s,v):p))break n
s=kt({},s,v)
break n
case 2:Bu=!0}}null!==i.callback&&0!==i.lane&&(n.flags|=64,null===(v=l.effects)?l.effects=[i]:v.push(i))}else d={eventTime:d,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===f?(c=f=d,a=s):f=f.next=d,o|=v
if(null===(i=i.next)){if(null===(i=l.shared.pending))break
i=(v=i).next,v.next=null,l.lastBaseUpdate=v,l.shared.pending=null}1}if(null===f&&(a=s),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=f,null!==(e=l.shared.interleaved)){l=e
do{o|=l.lane,l=l.next}while(l!==e)}else null===u&&(l.shared.lanes=0)
ei|=o,n.lanes=o,n.memoizedState=s}}function K(n,r,t){if(n=r.effects,r.effects=null,null!==n)for(r=0;r<n.length;r++){var l=n[r],u=l.callback
if(null!==u){if(l.callback=null,l=t,"function"!=typeof u)throw Error(e(191,u))
u.call(l)}}}function Q(n,e,r,t){r=null==(r=r(t,e=n.memoizedState))?e:kt({},e,r),n.memoizedState=r,0===n.lanes&&(n.updateQueue.baseState=r)}function X(n,e,r,t,l,u,o){return"function"==typeof(n=n.stateNode).shouldComponentUpdate?n.shouldComponentUpdate(t,u,o):!(e.prototype&&e.prototype.isPureReactComponent&&O(r,t)&&O(l,u))}function Z(n,e,r){var t=!1,l=cu,u=e.contextType
return"object"==typeof u&&null!==u?u=U(u):(l=w(e)?vu:fu.current,u=(t=null!=(t=e.contextTypes))?y(n,l):cu),e=new e(r,u),n.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,e.updater=Uu,n.stateNode=e,e.m=n,t&&((n=n.stateNode).o=l,n.i=u),e}function nn(n,e,r,t){n=e.state,"function"==typeof e.componentWillReceiveProps&&e.componentWillReceiveProps(r,t),"function"==typeof e.UNSAFE_componentWillReceiveProps&&e.UNSAFE_componentWillReceiveProps(r,t),e.state!==n&&Uu.enqueueReplaceState(e,e.state,null)}function en(n,e,r,t){var l=n.stateNode
l.props=r,l.state=n.memoizedState,l.refs=Hu,V(n)
var u=e.contextType
"object"==typeof u&&null!==u?l.context=U(u):(u=w(e)?vu:fu.current,l.context=y(n,u)),l.state=n.memoizedState,"function"==typeof(u=e.getDerivedStateFromProps)&&(Q(n,e,u,r),l.state=n.memoizedState),"function"==typeof e.getDerivedStateFromProps||"function"==typeof l.getSnapshotBeforeUpdate||"function"!=typeof l.UNSAFE_componentWillMount&&"function"!=typeof l.componentWillMount||(e=l.state,"function"==typeof l.componentWillMount&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount(),e!==l.state&&Uu.enqueueReplaceState(l,l.state,null),J(n,r,l,t),l.state=n.memoizedState),"function"==typeof l.componentDidMount&&(n.flags|=4194308)}function rn(n,e){Vu[qu++]=Wu,Vu[qu++]=$u,$u=n,Wu=e}function tn(n,e,r){Gu[Yu++]=Ku,Gu[Yu++]=Qu,Gu[Yu++]=Ju,Ju=n
var t=Ku
n=Qu
var l=32-du(t)-1
t&=~(1<<l),r+=1
var u=32-du(e)+l
if(30<u){var o=l-l%5
u=(t&(1<<o)-1).toString(32),t>>=o,l-=o,Ku=1<<32-du(e)+l|r<<l|t,Qu=u+n}else Ku=1<<u|r<<l|t,Qu=n}function ln(n){null!==n.return&&(rn(n,1),tn(n,1,0))}function un(n){for(;n===$u;)$u=Vu[--qu],Vu[qu]=null,Wu=Vu[--qu],Vu[qu]=null
for(;n===Ju;)Ju=Gu[--Yu],Gu[Yu]=null,Qu=Gu[--Yu],Gu[Yu]=null,Ku=Gu[--Yu],Gu[Yu]=null}function on(n,e){var r=Qr(5,null,null,0)
r.elementType="DELETED",r.stateNode=e,r.return=n,null===(e=n.deletions)?(n.deletions=[r],n.flags|=16):e.push(r)}function an(n,e){switch(n.tag){case 5:return null!==(e=Al(e,n.type,n.pendingProps))&&(n.stateNode=e,Xu=n,Zu=$l(e),!0)
case 6:return null!==(e=Nl(e,n.pendingProps))&&(n.stateNode=e,Xu=n,Zu=null,!0)
case 13:if(null!==(e=Bl(e))){var r=null!==Ju?{id:Ku,overflow:Qu}:null
return n.memoizedState={dehydrated:e,treeContext:r,retryLane:1073741824},(r=Qr(18,null,null,0)).stateNode=e,r.return=n,n.child=r,Xu=n,Zu=null,!0}return!1
default:return!1}}function cn(n){return!(!(1&n.mode)||128&n.flags)}function fn(n){if(no){var r=Zu
if(r){var t=r
if(!an(n,r)){if(cn(n))throw Error(e(418))
r=ql(t)
var l=Xu
r&&an(n,r)?on(l,t):(n.flags=-4097&n.flags|2,no=!1,Xu=n)}}else{if(cn(n))throw Error(e(418))
n.flags=-4097&n.flags|2,no=!1,Xu=n}}}function sn(n){for(n=n.return;null!==n&&5!==n.tag&&3!==n.tag&&13!==n.tag;)n=n.return
Xu=n}function vn(n){if(!el||n!==Xu)return!1
if(!no)return sn(n),no=!0,!1
if(3!==n.tag&&(5!==n.tag||ru(n.type)&&!Gt(n.type,n.memoizedProps))){var r=Zu
if(r){if(cn(n)){for(n=Zu;n;)n=ql(n)
throw Error(e(418))}for(;r;)on(n,r),r=ql(r)}}if(sn(n),13===n.tag){if(!el)throw Error(e(316))
if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(e(317))
Zu=Ql(n)}else Zu=Xu?ql(n.stateNode):null
return!0}function dn(){el&&(Zu=Xu=null,eo=no=!1)}function pn(n){null===ro?ro=[n]:ro.push(n)}function hn(n,r,t){if(null!==(n=t.ref)&&"function"!=typeof n&&"object"!=typeof n){if(t.k){if(t=t.k){if(1!==t.tag)throw Error(e(309))
var l=t.stateNode}if(!l)throw Error(e(147,n))
var u=l,o=""+n
return null!==r&&null!==r.ref&&"function"==typeof r.ref&&r.ref.S===o?r.ref:((r=function(n){var e=u.refs
e===Hu&&(e=u.refs={}),null===n?delete e[o]:e[o]=n}).S=o,r)}if("string"!=typeof n)throw Error(e(284))
if(!t.k)throw Error(e(290,n))}return n}function yn(n,r){throw n=Object.prototype.toString.call(r),Error(e(31,"[object Object]"===n?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function wn(n){return(0,n.u)(n.l)}function bn(n){function t(e,r){if(n){var t=e.deletions
null===t?(e.deletions=[r],e.flags|=16):t.push(r)}}function l(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function u(n,e){for(n=new Map;null!==e;)null!==e.key?n.set(e.key,e):n.set(e.index,e),e=e.sibling
return n}function o(n,e){return(n=Zr(n,e)).index=0,n.sibling=null,n}function i(e,r,t){return e.index=t,n?null!==(t=e.alternate)?(t=t.index)<r?(e.flags|=2,r):t:(e.flags|=2,r):(e.flags|=1048576,r)}function a(e){return n&&null===e.alternate&&(e.flags|=2),e}function c(n,e,r,t){return null===e||6!==e.tag?((e=tt(r,n.mode,t)).return=n,e):((e=o(e,r)).return=n,e)}function f(n,e,r,t){var l=r.type
return l===Ct?v(n,e,r.props.children,t,r.key):null!==e&&(e.elementType===l||"object"==typeof l&&null!==l&&l.$$typeof===Ft&&wn(l)===e.type)?((t=o(e,r.props)).ref=hn(n,e,r),t.return=n,t):((t=nt(r.type,r.key,r.props,null,n.mode,t)).ref=hn(n,e,r),t.return=n,t)}function s(n,e,r,t){return null===e||4!==e.tag||e.stateNode.containerInfo!==r.containerInfo||e.stateNode.implementation!==r.implementation?((e=lt(r,n.mode,t)).return=n,e):((e=o(e,r.children||[])).return=n,e)}function v(n,e,r,t,l){return null===e||7!==e.tag?((e=et(r,n.mode,t,l)).return=n,e):((e=o(e,r)).return=n,e)}function d(n,e,t){if("string"==typeof e&&""!==e||"number"==typeof e)return(e=tt(""+e,n.mode,t)).return=n,e
if("object"==typeof e&&null!==e){switch(e.$$typeof){case Et:return(t=nt(e.type,e.key,e.props,null,n.mode,t)).ref=hn(n,null,e),t.return=n,t
case St:return(e=lt(e,n.mode,t)).return=n,e
case Ft:return d(n,(0,e.u)(e.l),t)}if(_t(e)||r(e))return(e=et(e,n.mode,t,null)).return=n,e
yn(n,e)}return null}function p(n,e,t,l){var u=null!==e?e.key:null
if("string"==typeof t&&""!==t||"number"==typeof t)return null!==u?null:c(n,e,""+t,l)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case Et:return t.key===u?f(n,e,t,l):null
case St:return t.key===u?s(n,e,t,l):null
case Ft:return p(n,e,(u=t.u)(t.l),l)}if(_t(t)||r(t))return null!==u?null:v(n,e,t,l,null)
yn(n,t)}return null}function h(n,e,t,l,u){if("string"==typeof l&&""!==l||"number"==typeof l)return c(e,n=n.get(t)||null,""+l,u)
if("object"==typeof l&&null!==l){switch(l.$$typeof){case Et:return f(e,n=n.get(null===l.key?t:l.key)||null,l,u)
case St:return s(e,n=n.get(null===l.key?t:l.key)||null,l,u)
case Ft:return h(n,e,t,(0,l.u)(l.l),u)}if(_t(l)||r(l))return v(e,n=n.get(t)||null,l,u,null)
yn(e,l)}return null}return function c(f,s,v,y){if("object"==typeof v&&null!==v&&v.type===Ct&&null===v.key&&(v=v.props.children),"object"==typeof v&&null!==v){switch(v.$$typeof){case Et:n:{for(var w=v.key,b=s;null!==b;){if(b.key===w){if((w=v.type)===Ct){if(7===b.tag){l(f,b.sibling),(s=o(b,v.props.children)).return=f,f=s
break n}}else if(b.elementType===w||"object"==typeof w&&null!==w&&w.$$typeof===Ft&&wn(w)===b.type){l(f,b.sibling),(s=o(b,v.props)).ref=hn(f,b,v),s.return=f,f=s
break n}l(f,b)
break}t(f,b),b=b.sibling}v.type===Ct?((s=et(v.props.children,f.mode,y,v.key)).return=f,f=s):((y=nt(v.type,v.key,v.props,null,f.mode,y)).ref=hn(f,s,v),y.return=f,f=y)}return a(f)
case St:n:{for(b=v.key;null!==s;){if(s.key===b){if(4===s.tag&&s.stateNode.containerInfo===v.containerInfo&&s.stateNode.implementation===v.implementation){l(f,s.sibling),(s=o(s,v.children||[])).return=f,f=s
break n}l(f,s)
break}t(f,s),s=s.sibling}(s=lt(v,f.mode,y)).return=f,f=s}return a(f)
case Ft:return c(f,s,(b=v.u)(v.l),y)}if(_t(v))return function(e,r,o,a){for(var c=null,f=null,s=r,v=r=0,y=null;null!==s&&v<o.length;v++){s.index>v?(y=s,s=null):y=s.sibling
var w=p(e,s,o[v],a)
if(null===w){null===s&&(s=y)
break}n&&s&&null===w.alternate&&t(e,s),r=i(w,r,v),null===f?c=w:f.sibling=w,f=w,s=y}if(v===o.length)return l(e,s),no&&rn(e,v),c
if(null===s){for(;v<o.length;v++)null!==(s=d(e,o[v],a))&&(r=i(s,r,v),null===f?c=s:f.sibling=s,f=s)
return no&&rn(e,v),c}for(s=u(e,s);v<o.length;v++)null!==(y=h(s,e,v,o[v],a))&&(n&&null!==y.alternate&&s.delete(null===y.key?v:y.key),r=i(y,r,v),null===f?c=y:f.sibling=y,f=y)
return n&&s.forEach(function(n){return t(e,n)}),no&&rn(e,v),c}(f,s,v,y)
if(r(v))return function(o,a,c,f){var s=r(c)
if("function"!=typeof s)throw Error(e(150))
if(null==(c=s.call(c)))throw Error(e(151))
for(var v=s=null,y=a,w=a=0,b=null,m=c.next();null!==y&&!m.done;w++,m=c.next()){y.index>w?(b=y,y=null):b=y.sibling
var g=p(o,y,m.value,f)
if(null===g){null===y&&(y=b)
break}n&&y&&null===g.alternate&&t(o,y),a=i(g,a,w),null===v?s=g:v.sibling=g,v=g,y=b}if(m.done)return l(o,y),no&&rn(o,w),s
if(null===y){for(;!m.done;w++,m=c.next())null!==(m=d(o,m.value,f))&&(a=i(m,a,w),null===v?s=m:v.sibling=m,v=m)
return no&&rn(o,w),s}for(y=u(o,y);!m.done;w++,m=c.next())null!==(m=h(y,o,w,m.value,f))&&(n&&null!==m.alternate&&y.delete(null===m.key?w:m.key),a=i(m,a,w),null===v?s=m:v.sibling=m,v=m)
return n&&y.forEach(function(n){return t(o,n)}),no&&rn(o,w),s}(f,s,v,y)
yn(f,v)}return"string"==typeof v&&""!==v||"number"==typeof v?(v=""+v,null!==s&&6===s.tag?(l(f,s.sibling),(s=o(s,v)).return=f,f=s):(l(f,s),(s=tt(v,f.mode,y)).return=f,f=s),a(f)):l(f,s)}}function mn(n){if(n===uo)throw Error(e(174))
return n}function gn(n,e){h(ao,e),h(io,n),h(oo,uo),n=Nt(e),p(oo),h(oo,n)}function kn(){p(oo),p(io),p(ao)}function xn(n){var e=mn(ao.current),r=mn(oo.current)
r!==(e=Bt(r,n.type,e))&&(h(io,n),h(oo,e))}function En(n){io.current===n&&(p(oo),p(io))}function Sn(n){for(var e=n;null!==e;){if(13===e.tag){var r=e.memoizedState
if(null!==r&&(null===(r=r.dehydrated)||Hl(r)||Ul(r)))return e}else if(19===e.tag&&void 0!==e.memoizedProps.revealOrder){if(128&e.flags)return e}else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return null
e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function Cn(){for(var n=0;n<fo.length;n++){var e=fo[n]
Xt?e.C=null:e.M=null}fo.length=0}function Mn(){throw Error(e(321))}function zn(n,e){if(null===e)return!1
for(var r=0;r<e.length&&r<n.length;r++)if(!Tu(n[r],e[r]))return!1
return!0}function Tn(n,r,t,l,u,o){if(po=o,ho=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,so.current=null===n||null===n.memoizedState?Eo:So,n=t(l,u),mo){o=0
do{if(mo=!1,go=0,25<=o)throw Error(e(301))
o+=1,wo=yo=null,r.updateQueue=null,so.current=Co,n=t(l,u)}while(mo)}if(so.current=xo,r=null!==yo&&null!==yo.next,po=0,wo=yo=ho=null,bo=!1,r)throw Error(e(300))
return n}function Rn(){var n=0!==go
return go=0,n}function In(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===wo?ho.memoizedState=wo=n:wo=wo.next=n,wo}function Dn(){if(null===yo){var n=ho.alternate
n=null!==n?n.memoizedState:null}else n=yo.next
var r=null===wo?ho.memoizedState:wo.next
if(null!==r)wo=r,yo=n
else{if(null===n)throw Error(e(310))
n={memoizedState:(yo=n).memoizedState,baseState:yo.baseState,baseQueue:yo.baseQueue,queue:yo.queue,next:null},null===wo?ho.memoizedState=wo=n:wo=wo.next=n}return wo}function Ln(n,e){return"function"==typeof e?e(n):e}function _n(n){var r=Dn(),t=r.queue
if(null===t)throw Error(e(311))
t.lastRenderedReducer=n
var l=yo,u=l.baseQueue,o=t.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}l.baseQueue=u=o,t.pending=null}if(null!==u){o=u.next,l=l.baseState
var a=i=null,c=null,f=o
do{var s=f.lane
if((po&s)===s)null!==c&&(c=c.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),l=f.hasEagerState?f.eagerState:n(l,f.action)
else{var v={lane:s,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}
null===c?(a=c=v,i=l):c=c.next=v,ho.lanes|=s,ei|=s}f=f.next}while(null!==f&&f!==o)
null===c?i=l:c.next=a,Tu(l,r.memoizedState)||(zo=!0),r.memoizedState=l,r.baseState=i,r.baseQueue=c,t.lastRenderedState=l}if(null!==(n=t.interleaved)){u=n
do{o=u.lane,ho.lanes|=o,ei|=o,u=u.next}while(u!==n)}else null===u&&(t.lanes=0)
return[r.memoizedState,t.dispatch]}function An(n){var r=Dn(),t=r.queue
if(null===t)throw Error(e(311))
t.lastRenderedReducer=n
var l=t.dispatch,u=t.pending,o=r.memoizedState
if(null!==u){t.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
Tu(o,r.memoizedState)||(zo=!0),r.memoizedState=o,null===r.baseQueue&&(r.baseState=o),t.lastRenderedState=o}return[o,l]}function Nn(){}function Bn(n,r){var t=ho,l=Dn(),u=r(),o=!Tu(l.memoizedState,u)
if(o&&(l.memoizedState=u,zo=!0),l=l.queue,Qn(Vn.bind(null,t,l,n),[n]),l.getSnapshot!==r||o||null!==wo&&1&wo.memoizedState.tag){if(t.flags|=2048,Wn(9,Un.bind(null,t,l,u,r),void 0,null),null===Yo)throw Error(e(349))
30&po||Hn(t,r,u)}return u}function Hn(n,e,r){n.flags|=16384,n={getSnapshot:e,value:r},null===(e=ho.updateQueue)?(e={lastEffect:null,stores:null},ho.updateQueue=e,e.stores=[n]):null===(r=e.stores)?e.stores=[n]:r.push(n)}function Un(n,e,r,t){e.value=r,e.getSnapshot=t,qn(e)&&xr(n,1,-1)}function Vn(n,e,r){return r(function(){qn(e)&&xr(n,1,-1)})}function qn(n){var e=n.getSnapshot
n=n.value
try{var r=e()
return!Tu(n,r)}catch(t){return!0}}function $n(n){var e=In()
return"function"==typeof n&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ln,lastRenderedState:n},e.queue=n,n=n.dispatch=ae.bind(null,ho,n),[e.memoizedState,n]}function Wn(n,e,r,t){return n={tag:n,create:e,destroy:r,deps:t,next:null},null===(e=ho.updateQueue)?(e={lastEffect:null,stores:null},ho.updateQueue=e,e.lastEffect=n.next=n):null===(r=e.lastEffect)?e.lastEffect=n.next=n:(t=r.next,r.next=n,n.next=t,e.lastEffect=n),n}function Gn(){return Dn().memoizedState}function Yn(n,e,r,t){var l=In()
ho.flags|=n,l.memoizedState=Wn(1|e,r,void 0,void 0===t?null:t)}function Jn(n,e,r,t){var l=Dn()
t=void 0===t?null:t
var u=void 0
if(null!==yo){var o=yo.memoizedState
if(u=o.destroy,null!==t&&zn(t,o.deps))return l.memoizedState=Wn(e,r,u,t),void 0}ho.flags|=n,l.memoizedState=Wn(1|e,r,u,t)}function Kn(n,e){return Yn(8390656,8,n,e)}function Qn(n,e){return Jn(2048,8,n,e)}function Xn(n,e){return Jn(4,2,n,e)}function Zn(n,e){return Jn(4,4,n,e)}function ne(n,e){return"function"==typeof e?(n=n(),e(n),function(){e(null)}):null!=e?(n=n(),e.current=n,function(){e.current=null}):void 0}function ee(n,e,r){return r=null!=r?r.concat([n]):null,Jn(4,4,ne.bind(null,e,n),r)}function re(){}function te(n,e){var r=Dn()
e=void 0===e?null:e
var t=r.memoizedState
return null!==t&&null!==e&&zn(e,t[1])?t[0]:(r.memoizedState=[n,e],n)}function le(n,e){var r=Dn()
e=void 0===e?null:e
var t=r.memoizedState
return null!==t&&null!==e&&zn(e,t[1])?t[0]:(n=n(),r.memoizedState=[n,e],n)}function ue(n,e){var r=bu
bu=0!==r&&4>r?r:4,n(!0)
var t=vo.transition
vo.transition={}
try{n(!1),e()}finally{bu=r,vo.transition=t}}function oe(){return Dn().memoizedState}function ie(n,e,r){var t=kr(n)
r={lane:t,action:r,hasEagerState:!1,eagerState:null,next:null},ce(n)?fe(e,r):(se(n,e,r),null!==(n=xr(n,t,r=gr()))&&ve(n,e,t))}function ae(n,e,r){var t=kr(n),l={lane:t,action:r,hasEagerState:!1,eagerState:null,next:null}
if(ce(n))fe(e,l)
else{se(n,e,l)
var u=n.alternate
if(0===n.lanes&&(null===u||0===u.lanes)&&null!==(u=e.lastRenderedReducer))try{var o=e.lastRenderedState,i=u(o,r)
if(l.hasEagerState=!0,l.eagerState=i,Tu(i,o))return}catch(a){}null!==(n=xr(n,t,r=gr()))&&ve(n,e,t)}}function ce(n){var e=n.alternate
return n===ho||null!==e&&e===ho}function fe(n,e){mo=bo=!0
var r=n.pending
null===r?e.next=e:(e.next=r.next,r.next=e),n.pending=e}function se(n,e,r){null!==Yo&&1&n.mode&&!(2&Go)?(null===(n=e.interleaved)?(r.next=r,null===Nu?Nu=[e]:Nu.push(e)):(r.next=n.next,n.next=r),e.interleaved=r):(null===(n=e.pending)?r.next=r:(r.next=n.next,n.next=r),e.pending=r)}function ve(n,e,r){if(4194240&r){var t=e.lanes
r|=t&=n.pendingLanes,e.lanes=r,z(n,r)}}function de(n,e){try{var r="",t=e
do{r+=F(t),t=t.return}while(t)
var l=r}catch(u){l="\nError generating stack: "+u.message+"\n"+u.stack}return{value:n,source:e,stack:l}}function pe(n,e){try{void 0}catch(r){setTimeout(function(){throw r})}}function he(n,e,r){(r=$(-1,r)).tag=3,r.payload={element:null}
var t=e.value
return r.callback=function(){ai||(ai=!0,ci=t),pe()},r}function ye(n,e,r){(r=$(-1,r)).tag=3
var t=n.type.getDerivedStateFromError
if("function"==typeof t){var l=e.value
r.payload=function(){return t(l)},r.callback=function(){pe()}}var u=n.stateNode
return null!==u&&"function"==typeof u.componentDidCatch&&(r.callback=function(){pe(),"function"!=typeof t&&(null===fi?fi=new Set([this]):fi.add(this))
var n=e.stack
this.componentDidCatch(e.value,{componentStack:null!==n?n:""})}),r}function we(n,e,r){var t=n.pingCache
if(null===t){t=n.pingCache=new Mo
var l=new Set
t.set(e,l)}else void 0===(l=t.get(e))&&(l=new Set,t.set(e,l))
l.has(r)||(l.add(r),n=$r.bind(null,n,e,r),e.then(n,n))}function be(n){do{var e
if((e=13===n.tag)&&(e=null===(e=n.memoizedState)||null!==e.dehydrated),e)return n
n=n.return}while(null!==n)
return null}function me(n,e,r,t,l){return 1&n.mode?(n.flags|=65536,n.lanes=l,n):(n===e?n.flags|=65536:(n.flags|=128,r.flags|=131072,r.flags&=-52805,1===r.tag&&(null===r.alternate?r.tag=17:((e=$(-1,1)).tag=2,W(r,e))),r.lanes|=1),n)}function ge(n){n.flags|=4}function ke(n,e){if(null!==n&&n.child===e.child)return!0
if(16&e.flags)return!1
for(n=e.child;null!==n;){if(12854&n.flags||12854&n.subtreeFlags)return!1
n=n.sibling}return!0}function xe(n,e){if(!no)switch(n.tailMode){case"hidden":e=n.tail
for(var r=null;null!==e;)null!==e.alternate&&(r=e),e=e.sibling
null===r?n.tail=null:r.sibling=null
break
case"collapsed":r=n.tail
for(var t=null;null!==r;)null!==r.alternate&&(t=r),r=r.sibling
null===t?e||null===n.tail?n.tail=null:n.tail.sibling=null:t.sibling=null}}function Ee(n){var e=null!==n.alternate&&n.alternate.child===n.child,r=0,t=0
if(e)for(var l=n.child;null!==l;)r|=l.lanes|l.childLanes,t|=14680064&l.subtreeFlags,t|=14680064&l.flags,l.return=n,l=l.sibling
else for(l=n.child;null!==l;)r|=l.lanes|l.childLanes,t|=l.subtreeFlags,t|=l.flags,l.return=n,l=l.sibling
return n.subtreeFlags|=t,n.childLanes=r,e}function Se(n,r,t){var l=r.pendingProps
switch(un(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(r),null
case 1:case 17:return w(r.type)&&b(),Ee(r),null
case 3:return l=r.stateNode,kn(),p(su),p(fu),Cn(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),null!==n&&null!==n.child||(vn(r)?ge(r):null===n||n.memoizedState.isDehydrated&&!(256&r.flags)||(r.flags|=1024,null!==ro&&(Pr(ro),ro=null))),ht(n,r),Ee(r),null
case 5:En(r),t=mn(ao.current)
var u=r.type
if(null!==n&&null!=r.stateNode)yt(n,r,u,l,t),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152)
else{if(!l){if(null===r.stateNode)throw Error(e(166))
return Ee(r),null}if(n=mn(oo.current),vn(r)){if(!el)throw Error(e(175))
n=Yl(r.stateNode,r.type,r.memoizedProps,t,n,r,!eo),r.updateQueue=n,null!==n&&ge(r)}else{var o=Vt(u,l,t,n,r)
pt(o,r,!1,!1),r.stateNode=o,$t(o,u,l,t,n)&&ge(r)}null!==r.ref&&(r.flags|=512,r.flags|=2097152)}return Ee(r),null
case 6:if(n&&null!=r.stateNode)wt(n,r,n.memoizedProps,l)
else{if("string"!=typeof l&&null===r.stateNode)throw Error(e(166))
if(n=mn(ao.current),t=mn(oo.current),vn(r)){if(!el)throw Error(e(176))
if(n=r.stateNode,l=r.memoizedProps,(t=Jl(n,l,r,!eo))&&null!==(u=Xu))switch(o=!!(1&u.mode),u.tag){case 3:tu(u.stateNode.containerInfo,n,l,o)
break
case 5:lu(u.type,u.memoizedProps,u.stateNode,n,l,o)}t&&ge(r)}else r.stateNode=Yt(l,n,t,r)}return Ee(r),null
case 13:if(p(co),l=r.memoizedState,no&&null!==Zu&&1&r.mode&&!(128&r.flags)){for(n=Zu;n;)n=ql(n)
return dn(),r.flags|=98560,r}if(null!==l&&null!==l.dehydrated){if(l=vn(r),null===n){if(!l)throw Error(e(318))
if(!el)throw Error(e(344))
if(!(n=null!==(n=r.memoizedState)?n.dehydrated:null))throw Error(e(317))
Kl(n,r)}else dn(),!(128&r.flags)&&(r.memoizedState=null),r.flags|=4
return Ee(r),null}return null!==ro&&(Pr(ro),ro=null),128&r.flags?(r.lanes=t,r):(l=null!==l,t=!1,null===n?vn(r):t=null!==n.memoizedState,l&&!t&&(r.child.flags|=8192,1&r.mode&&(null===n||1&co.current?0===Zo&&(Zo=3):Dr())),null!==r.updateQueue&&(r.flags|=4),Ee(r),null)
case 4:return kn(),ht(n,r),null===n&&tl(r.stateNode.containerInfo),Ee(r),null
case 10:return N(r.type.t),Ee(r),null
case 19:if(p(co),null===(u=r.memoizedState))return Ee(r),null
if(l=!!(128&r.flags),null===(o=u.rendering))if(l)xe(u,!1)
else{if(0!==Zo||null!==n&&128&n.flags)for(n=r.child;null!==n;){if(null!==(o=Sn(n))){for(r.flags|=128,xe(u,!1),null!==(n=o.updateQueue)&&(r.updateQueue=n,r.flags|=4),r.subtreeFlags=0,n=t,l=r.child;null!==l;)u=n,(t=l).flags&=14680066,null===(o=t.alternate)?(t.childLanes=0,t.lanes=u,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=o.childLanes,t.lanes=o.lanes,t.child=o.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=o.memoizedProps,t.memoizedState=o.memoizedState,t.updateQueue=o.updateQueue,t.type=o.type,u=o.dependencies,t.dependencies=null===u?null:{lanes:u.lanes,firstContext:u.firstContext}),l=l.sibling
return h(co,1&co.current|2),r.child}n=n.sibling}null!==u.tail&&Eu()>ii&&(r.flags|=128,l=!0,xe(u,!1),r.lanes=4194304)}else{if(!l)if(null!==(n=Sn(o))){if(r.flags|=128,l=!0,null!==(n=n.updateQueue)&&(r.updateQueue=n,r.flags|=4),xe(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!no)return Ee(r),null}else 2*Eu()-u.renderingStartTime>ii&&1073741824!==t&&(r.flags|=128,l=!0,xe(u,!1),r.lanes=4194304)
u.isBackwards?(o.sibling=r.child,r.child=o):(null!==(n=u.last)?n.sibling=o:r.child=o,u.last=o)}return null!==u.tail?(r=u.tail,u.rendering=r,u.tail=r.sibling,u.renderingStartTime=Eu(),r.sibling=null,n=co.current,h(co,l?1&n|2:1&n),r):(Ee(r),null)
case 22:case 23:return Rr(),l=null!==r.memoizedState,null!==n&&null!==n.memoizedState!==l&&(r.flags|=8192),l&&1&r.mode?!!(1073741824&Qo)&&(Ee(r),Zt&&6&r.subtreeFlags&&(r.flags|=8192)):Ee(r),null
case 24:case 25:return null}throw Error(e(156,r.tag))}function Ce(n,e,r,t){e.child=null===n?lo(e,null,r,t):to(e,n.child,r,t)}function Me(n,e,r,t,l){r=r.render
var u=e.ref
return H(e,l),t=Tn(n,e,r,t,u,l),r=Rn(),null===n||zo?(no&&r&&ln(e),e.flags|=1,Ce(n,e,t,l),e.child):(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l,$e(n,e,l))}function Pe(n,e,r,t,l){if(null===n){var u=r.type
return"function"!=typeof u||Xr(u)||void 0!==u.defaultProps||null!==r.compare||void 0!==r.defaultProps?((n=nt(r.type,null,t,e,e.mode,l)).ref=e.ref,n.return=e,e.child=n):(e.tag=15,e.type=u,je(n,e,u,t,l))}if(u=n.child,0===(n.lanes&l)){var o=u.memoizedProps
if((r=null!==(r=r.compare)?r:O)(o,t)&&n.ref===e.ref)return $e(n,e,l)}return e.flags|=1,(n=Zr(u,t)).ref=e.ref,n.return=e,e.child=n}function je(n,e,r,t,l){if(null!==n&&O(n.memoizedProps,t)&&n.ref===e.ref){if(zo=!1,0===(n.lanes&l))return e.lanes=n.lanes,$e(n,e,l)
131072&n.flags&&(zo=!0)}return Re(n,e,r,t,l)}function ze(n,e,r){var t=e.pendingProps,l=t.children,u=null!==n?n.memoizedState:null
if("hidden"===t.mode)if(1&e.mode){if(!(1073741824&r))return n=null!==u?u.baseLanes|r:r,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null},e.updateQueue=null,h(Xo,Qo),Qo|=n,null
e.memoizedState={baseLanes:0,cachePool:null},t=null!==u?u.baseLanes:r,h(Xo,Qo),Qo|=t}else e.memoizedState={baseLanes:0,cachePool:null},h(Xo,Qo),Qo|=r
else null!==u?(t=u.baseLanes|r,e.memoizedState=null):t=r,h(Xo,Qo),Qo|=t
return Ce(n,e,l,r),e.child}function Te(n,e){var r=e.ref;(null===n&&null!==r||null!==n&&n.ref!==r)&&(e.flags|=512,e.flags|=2097152)}function Re(n,e,r,t,l){var u=w(r)?vu:fu.current
return u=y(e,u),H(e,l),r=Tn(n,e,r,t,u,l),t=Rn(),null===n||zo?(no&&t&&ln(e),e.flags|=1,Ce(n,e,r,l),e.child):(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l,$e(n,e,l))}function Ie(n,e,r,t,l){if(w(r)){var u=!0
k(e)}else u=!1
if(H(e,l),null===e.stateNode)null!==n&&(n.alternate=null,e.alternate=null,e.flags|=2),Z(e,r,t),en(e,r,t,l),t=!0
else if(null===n){var o=e.stateNode,i=e.memoizedProps
o.props=i
var a=o.context,c=r.contextType
c="object"==typeof c&&null!==c?U(c):y(e,c=w(r)?vu:fu.current)
var f=r.getDerivedStateFromProps,s="function"==typeof f||"function"==typeof o.getSnapshotBeforeUpdate
s||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(i!==t||a!==c)&&nn(e,o,t,c),Bu=!1
var v=e.memoizedState
o.state=v,J(e,t,o,l),a=e.memoizedState,i!==t||v!==a||su.current||Bu?("function"==typeof f&&(Q(e,r,f,t),a=e.memoizedState),(i=Bu||X(e,r,i,t,v,a,c))?(s||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||("function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount()),"function"==typeof o.componentDidMount&&(e.flags|=4194308)):("function"==typeof o.componentDidMount&&(e.flags|=4194308),e.memoizedProps=t,e.memoizedState=a),o.props=t,o.state=a,o.context=c,t=i):("function"==typeof o.componentDidMount&&(e.flags|=4194308),t=!1)}else{o=e.stateNode,q(n,e),i=e.memoizedProps,c=e.type===e.elementType?i:D(e.type,i),o.props=c,s=e.pendingProps,v=o.context,a="object"==typeof(a=r.contextType)&&null!==a?U(a):y(e,a=w(r)?vu:fu.current)
var d=r.getDerivedStateFromProps;(f="function"==typeof d||"function"==typeof o.getSnapshotBeforeUpdate)||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(i!==s||v!==a)&&nn(e,o,t,a),Bu=!1,v=e.memoizedState,o.state=v,J(e,t,o,l)
var p=e.memoizedState
i!==s||v!==p||su.current||Bu?("function"==typeof d&&(Q(e,r,d,t),p=e.memoizedState),(c=Bu||X(e,r,c,t,v,p,a)||!1)?(f||"function"!=typeof o.UNSAFE_componentWillUpdate&&"function"!=typeof o.componentWillUpdate||("function"==typeof o.componentWillUpdate&&o.componentWillUpdate(t,p,a),"function"==typeof o.UNSAFE_componentWillUpdate&&o.UNSAFE_componentWillUpdate(t,p,a)),"function"==typeof o.componentDidUpdate&&(e.flags|=4),"function"==typeof o.getSnapshotBeforeUpdate&&(e.flags|=1024)):("function"!=typeof o.componentDidUpdate||i===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||i===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),e.memoizedProps=t,e.memoizedState=p),o.props=t,o.state=p,o.context=a,t=c):("function"!=typeof o.componentDidUpdate||i===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||i===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),t=!1)}return Oe(n,e,r,t,u,l)}function Oe(n,e,r,t,l,u){Te(n,e)
var o=!!(128&e.flags)
if(!t&&!o)return l&&x(e,r,!1),$e(n,e,u)
t=e.stateNode,jo.current=e
var i=o&&"function"!=typeof r.getDerivedStateFromError?null:t.render()
return e.flags|=1,null!==n&&o?(e.child=to(e,n.child,null,u),e.child=to(e,null,i,u)):Ce(n,e,i,u),e.memoizedState=t.state,l&&x(e,r,!0),e.child}function Fe(n){var e=n.stateNode
e.pendingContext?m(0,e.pendingContext,e.pendingContext!==e.context):e.context&&m(0,e.context,!1),gn(n,e.containerInfo)}function De(n,e,r,t,l){return dn(),pn(l),e.flags|=256,Ce(n,e,r,t),e.child}function Le(n){return{baseLanes:n,cachePool:null}}function _e(n,r,t){var l,u=r.pendingProps,o=co.current,i=!1,a=!!(128&r.flags)
if((l=a)||(l=(null===n||null!==n.memoizedState)&&!!(2&o)),l?(i=!0,r.flags&=-129):null!==n&&null===n.memoizedState||(o|=1),h(co,1&o),null===n)return fn(r),null!==(n=r.memoizedState)&&null!==(n=n.dehydrated)?(1&r.mode?Ul(n)?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(o=u.children,n=u.fallback,i?(u=r.mode,i=r.child,o={mode:"hidden",children:o},1&u||null===i?i=rt(o,u,0,null):(i.childLanes=0,i.pendingProps=o),n=et(n,u,t,null),i.return=r,n.return=r,i.sibling=n,r.child=i,r.child.memoizedState=Le(t),r.memoizedState=To,n):Ae(r,o))
if(null!==(o=n.memoizedState)){if(null!==(l=o.dehydrated)){if(a)return 256&r.flags?(r.flags&=-257,He(n,r,t,Error(e(422)))):null!==r.memoizedState?(r.child=n.child,r.flags|=128,null):(i=u.fallback,o=r.mode,u=rt({mode:"visible",children:u.children},o,0,null),(i=et(i,o,t,null)).flags|=2,u.return=r,i.return=r,u.sibling=i,r.child=u,1&r.mode&&to(r,n.child,null,t),r.child.memoizedState=Le(t),r.memoizedState=To,i)
if(1&r.mode)if(Ul(l))r=He(n,r,t,Error(e(419)))
else if(u=0!==(t&n.childLanes),zo||u){if(null!==(u=Yo)){switch(t&-t){case 4:i=2
break
case 16:i=8
break
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32
break
case 536870912:i=268435456
break
default:i=0}0!==(u=0!==(i&(u.suspendedLanes|t))?0:i)&&u!==o.retryLane&&(o.retryLane=u,xr(n,u,-1))}Dr(),r=He(n,r,t,Error(e(421)))}else Hl(l)?(r.flags|=128,r.child=n.child,r=Gr.bind(null,n),Vl(l,r),r=null):(t=o.treeContext,el&&(Zu=Gl(l),Xu=r,no=!0,ro=null,eo=!1,null!==t&&(Gu[Yu++]=Ku,Gu[Yu++]=Qu,Gu[Yu++]=Ju,Ku=t.id,Qu=t.overflow,Ju=r)),(r=Ae(r,r.pendingProps.children)).flags|=4096)
else r=He(n,r,t,null)
return r}return i?(u=Be(n,r,u.children,u.fallback,t),i=r.child,o=n.child.memoizedState,i.memoizedState=null===o?Le(t):{baseLanes:o.baseLanes|t,cachePool:null},i.childLanes=n.childLanes&~t,r.memoizedState=To,u):(t=Ne(n,r,u.children,t),r.memoizedState=null,t)}return i?(u=Be(n,r,u.children,u.fallback,t),i=r.child,o=n.child.memoizedState,i.memoizedState=null===o?Le(t):{baseLanes:o.baseLanes|t,cachePool:null},i.childLanes=n.childLanes&~t,r.memoizedState=To,u):(t=Ne(n,r,u.children,t),r.memoizedState=null,t)}function Ae(n,e){return(e=rt({mode:"visible",children:e},n.mode,0,null)).return=n,n.child=e}function Ne(n,e,r,t){var l=n.child
return n=l.sibling,r=Zr(l,{mode:"visible",children:r}),!(1&e.mode)&&(r.lanes=t),r.return=e,r.sibling=null,null!==n&&(null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=r}function Be(n,e,r,t,l){var u=e.mode,o=(n=n.child).sibling,i={mode:"hidden",children:r}
return 1&u||e.child===n?(r=Zr(n,i)).subtreeFlags=14680064&n.subtreeFlags:((r=e.child).childLanes=0,r.pendingProps=i,e.deletions=null),null!==o?t=Zr(o,t):(t=et(t,u,l,null)).flags|=2,t.return=e,r.return=e,r.sibling=t,e.child=r,t}function He(n,e,r,t){return null!==t&&pn(t),to(e,n.child,null,r),(n=Ae(e,e.pendingProps.children)).flags|=2,e.memoizedState=null,n}function Ue(n,e,r){n.lanes|=e
var t=n.alternate
null!==t&&(t.lanes|=e),B(n.return,e,r)}function Ve(n,e,r,t,l){var u=n.memoizedState
null===u?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:t,tail:r,tailMode:l}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=t,u.tail=r,u.tailMode=l)}function qe(n,e,r){var t=e.pendingProps,l=t.revealOrder,u=t.tail
if(Ce(n,e,t.children,r),2&(t=co.current))t=1&t|2,e.flags|=128
else{if(null!==n&&128&n.flags)n:for(n=e.child;null!==n;){if(13===n.tag)null!==n.memoizedState&&Ue(n,r,e)
else if(19===n.tag)Ue(n,r,e)
else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break n
for(;null===n.sibling;){if(null===n.return||n.return===e)break n
n=n.return}n.sibling.return=n.return,n=n.sibling}t&=1}if(h(co,t),1&e.mode)switch(l){case"forwards":for(r=e.child,l=null;null!==r;)null!==(n=r.alternate)&&null===Sn(n)&&(l=r),r=r.sibling
null===(r=l)?(l=e.child,e.child=null):(l=r.sibling,r.sibling=null),Ve(e,!1,l,r,u)
break
case"backwards":for(r=null,l=e.child,e.child=null;null!==l;){if(null!==(n=l.alternate)&&null===Sn(n)){e.child=l
break}n=l.sibling,l.sibling=r,r=l,l=n}Ve(e,!0,r,null,u)
break
case"together":Ve(e,!1,null,null,void 0)
break
default:e.memoizedState=null}else e.memoizedState=null
return e.child}function $e(n,r,t){if(null!==n&&(r.dependencies=n.dependencies),ei|=r.lanes,0===(t&r.childLanes))return null
if(null!==n&&r.child!==n.child)throw Error(e(153))
if(null!==r.child){for(t=Zr(n=r.child,n.pendingProps),r.child=t,t.return=r;null!==n.sibling;)n=n.sibling,(t=t.sibling=Zr(n,n.pendingProps)).return=r
t.sibling=null}return r.child}function We(n,r){switch(un(r),r.tag){case 1:return w(r.type)&&b(),65536&(n=r.flags)?(r.flags=-65537&n|128,r):null
case 3:return kn(),p(su),p(fu),Cn(),65536&(n=r.flags)&&!(128&n)?(r.flags=-65537&n|128,r):null
case 5:return En(r),null
case 13:if(p(co),null!==(n=r.memoizedState)&&null!==n.dehydrated){if(null===r.alternate)throw Error(e(340))
dn()}return 65536&(n=r.flags)?(r.flags=-65537&n|128,r):null
case 19:return p(co),null
case 4:return kn(),null
case 10:return N(r.type.t),null
case 22:case 23:return Rr(),null
default:return null}}function Ge(n,e){var r=n.ref
if(null!==r)if("function"==typeof r)try{r(null)}catch(t){qr(n,e,t)}else r.current=null}function Ye(n,e,r){try{r()}catch(t){qr(n,e,t)}}function Je(n,e,r){var t=e.updateQueue
if(null!==(t=null!==t?t.lastEffect:null)){var l=t=t.next
do{if((l.tag&n)===n){var u=l.destroy
l.destroy=void 0,void 0!==u&&Ye(e,r,u)}l=l.next}while(l!==t)}}function Ke(n,e){if(null!==(e=null!==(e=e.updateQueue)?e.lastEffect:null)){var r=e=e.next
do{if((r.tag&n)===n){var t=r.create
r.destroy=t()}r=r.next}while(r!==e)}}function Qe(n){var e=n.ref
if(null!==e){var r=n.stateNode
n=5===n.tag?At(r):r,"function"==typeof e?e(n):e.current=n}}function Xe(n,e,r){if(zu&&"function"==typeof zu.onCommitFiberUnmount)try{zu.onCommitFiberUnmount(ju,e)}catch(o){}switch(e.tag){case 0:case 11:case 14:case 15:if(null!==(n=e.updateQueue)&&null!==(n=n.lastEffect)){var t=n=n.next
do{var l=t,u=l.destroy
l=l.tag,void 0!==u&&(2&l||4&l)&&Ye(e,r,u),t=t.next}while(t!==n)}break
case 1:if(Ge(e,r),"function"==typeof(n=e.stateNode).componentWillUnmount)try{n.props=e.memoizedProps,n.state=e.memoizedState,n.componentWillUnmount()}catch(o){qr(e,r,o)}break
case 5:Ge(e,r)
break
case 4:Zt?or(n,e,r):nl&&nl&&(e=e.stateNode.containerInfo,r=Il(e),Dl(e,r))}}function Ze(n,e,r){for(var t=e;;)if(Xe(n,t,r),null===t.child||Zt&&4===t.tag){if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}else t.child.return=t,t=t.child}function nr(n){var e=n.alternate
null!==e&&(n.alternate=null,nr(e)),n.child=null,n.deletions=null,n.sibling=null,5===n.tag&&null!==(e=n.stateNode)&&ul(e),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function er(n){return 5===n.tag||3===n.tag||4===n.tag}function rr(n){n:for(;;){for(;null===n.sibling;){if(null===n.return||er(n.return))return null
n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue n
if(null===n.child||4===n.tag)continue n
n.child.return=n,n=n.child}if(!(2&n.flags))return n.stateNode}}function tr(n){if(Zt){n:{for(var r=n.return;null!==r;){if(er(r))break n
r=r.return}throw Error(e(160))}var t=r
switch(t.tag){case 5:r=t.stateNode,32&t.flags&&(Cl(r),t.flags&=-33),ur(n,t=rr(n),r)
break
case 3:case 4:r=t.stateNode.containerInfo,lr(n,t=rr(n),r)
break
default:throw Error(e(161))}}}function lr(n,e,r){var t=n.tag
if(5===t||6===t)n=n.stateNode,e?xl(r,n,e):wl(r,n)
else if(4!==t&&null!==(n=n.child))for(lr(n,e,r),n=n.sibling;null!==n;)lr(n,e,r),n=n.sibling}function ur(n,e,r){var t=n.tag
if(5===t||6===t)n=n.stateNode,e?kl(r,n,e):yl(r,n)
else if(4!==t&&null!==(n=n.child))for(ur(n,e,r),n=n.sibling;null!==n;)ur(n,e,r),n=n.sibling}function or(n,r,t){for(var l,u,o=r,i=!1;;){if(!i){i=o.return
n:for(;;){if(null===i)throw Error(e(160))
switch(l=i.stateNode,i.tag){case 5:u=!1
break n
case 3:case 4:l=l.containerInfo,u=!0
break n}i=i.return}i=!0}if(5===o.tag||6===o.tag)Ze(n,o,t),u?Sl(l,o.stateNode):El(l,o.stateNode)
else if(18===o.tag)u?eu(l,o.stateNode):nu(l,o.stateNode)
else if(4===o.tag){if(null!==o.child){l=o.stateNode.containerInfo,u=!0,o.child.return=o,o=o.child
continue}}else if(Xe(n,o,t),null!==o.child){o.child.return=o,o=o.child
continue}if(o===r)break
for(;null===o.sibling;){if(null===o.return||o.return===r)return
4===(o=o.return).tag&&(i=!1)}o.sibling.return=o.return,o=o.sibling}}function ir(n,r){if(Zt){switch(r.tag){case 0:case 11:case 14:case 15:return Je(3,r,r.return),Ke(3,r),Je(5,r,r.return),void 0
case 1:case 12:case 17:return
case 5:var t=r.stateNode
if(null!=t){var l=r.memoizedProps
n=null!==n?n.memoizedProps:l
var u=r.type,o=r.updateQueue
r.updateQueue=null,null!==o&&gl(t,o,u,n,l,r)}return
case 6:if(null===r.stateNode)throw Error(e(162))
return t=r.memoizedProps,bl(r.stateNode,null!==n?n.memoizedProps:t,t),void 0
case 3:return el&&null!==n&&n.memoizedState.isDehydrated&&Xl(r.stateNode.containerInfo),void 0
case 13:case 19:return ar(r),void 0}throw Error(e(163))}switch(r.tag){case 0:case 11:case 14:case 15:return Je(3,r,r.return),Ke(3,r),Je(5,r,r.return),void 0
case 12:case 22:case 23:return
case 13:case 19:return ar(r),void 0
case 3:el&&null!==n&&n.memoizedState.isDehydrated&&Xl(r.stateNode.containerInfo)}n:if(nl){switch(r.tag){case 1:case 5:case 6:break n
case 3:case 4:r=r.stateNode,Dl(r.containerInfo,r.pendingChildren)
break n}throw Error(e(163))}}function ar(n){var e=n.updateQueue
if(null!==e){n.updateQueue=null
var r=n.stateNode
null===r&&(r=n.stateNode=new Oo),e.forEach(function(e){var t=Yr.bind(null,n,e)
r.has(e)||(r.add(e),e.then(t,t))})}}function cr(n,e,r){Fo=n,fr(n)}function fr(n,e,r){for(var t=!!(1&n.mode);null!==Fo;){var l=Fo,u=l.child
if(22===l.tag&&t){var o=null!==l.memoizedState||Ro
if(!o){var i=l.alternate,a=null!==i&&null!==i.memoizedState||Io
i=Ro
var c=Io
if(Ro=o,(Io=a)&&!c)for(Fo=l;null!==Fo;)a=(o=Fo).child,22===o.tag&&null!==o.memoizedState?dr(l):null!==a?(a.return=o,Fo=a):dr(l)
for(;null!==u;)Fo=u,fr(u),u=u.sibling
Fo=l,Ro=i,Io=c}sr(n)}else 8772&l.subtreeFlags&&null!==u?(u.return=l,Fo=u):sr(n)}}function sr(n){for(;null!==Fo;){var r=Fo
if(8772&r.flags){var t=r.alternate
try{if(8772&r.flags)switch(r.tag){case 0:case 11:case 15:Io||Ke(5,r)
break
case 1:var l=r.stateNode
if(4&r.flags&&!Io)if(null===t)l.componentDidMount()
else{var u=r.elementType===r.type?t.memoizedProps:D(r.type,t.memoizedProps)
l.componentDidUpdate(u,t.memoizedState,l.P)}var o=r.updateQueue
null!==o&&K(r,o,l)
break
case 3:var i=r.updateQueue
if(null!==i){if(t=null,null!==r.child)switch(r.child.tag){case 5:t=At(r.child.stateNode)
break
case 1:t=r.child.stateNode}K(r,i,t)}break
case 5:var a=r.stateNode
null===t&&4&r.flags&&ml(a,r.type,r.memoizedProps,r)
break
case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:break
case 13:if(el&&null===r.memoizedState){var c=r.alternate
if(null!==c){var f=c.memoizedState
if(null!==f){var s=f.dehydrated
null!==s&&Zl(s)}}}break
default:throw Error(e(163))}Io||512&r.flags&&Qe(r)}catch(v){qr(r,r.return,v)}}if(r===n){Fo=null
break}if(null!==(t=r.sibling)){t.return=r.return,Fo=t
break}Fo=r.return}}function vr(n){for(;null!==Fo;){var e=Fo
if(e===n){Fo=null
break}var r=e.sibling
if(null!==r){r.return=e.return,Fo=r
break}Fo=e.return}}function dr(n){for(;null!==Fo;){var e=Fo
try{switch(e.tag){case 0:case 11:case 15:var r=e.return
try{Ke(4,e)}catch(a){qr(e,r,a)}break
case 1:var t=e.stateNode
if("function"==typeof t.componentDidMount){var l=e.return
try{t.componentDidMount()}catch(a){qr(e,l,a)}}var u=e.return
try{Qe(e)}catch(a){qr(e,u,a)}break
case 5:var o=e.return
try{Qe(e)}catch(a){qr(e,o,a)}}}catch(a){qr(e,e.return,a)}if(e===n){Fo=null
break}var i=e.sibling
if(null!==i){i.return=e.return,Fo=i
break}Fo=e.return}}function pr(n){var r=rl(n)
if(null!=r){if("string"!=typeof r.memoizedProps["data-testname"])throw Error(e(364))
return r}if(null===(n=cl(n)))throw Error(e(362))
return n.stateNode.current}function hr(n,r){switch(r.$$typeof){case Lo:if(n.type===r.value)return!0
break
case _o:n:{r=r.value,n=[n,0]
for(var t=0;t<n.length;){var l=n[t++],u=n[t++],o=r[u]
if(5!==l.tag||!vl(l)){for(;null!=o&&hr(l,o);)o=r[++u]
if(u===r.length){r=!0
break n}for(l=l.child;null!==l;)n.push(l,u),l=l.sibling}}r=!1}return r
case Ao:if(5===n.tag&&dl(n.stateNode,r.value))return!0
break
case Bo:if((5===n.tag||6===n.tag)&&null!==(n=sl(n))&&0<=n.indexOf(r.value))return!0
break
case No:if(5===n.tag&&"string"==typeof(n=n.memoizedProps["data-testname"])&&n.toLowerCase()===r.value.toLowerCase())return!0
break
default:throw Error(e(365))}return!1}function yr(n){switch(n.$$typeof){case Lo:return"<"+(t(n.value)||"Unknown")+">"
case _o:return":has("+(yr(n)||"")+")"
case Ao:return'[role="'+n.value+'"]'
case Bo:return'"'+n.value+'"'
case No:return'[data-testname="'+n.value+'"]'
default:throw Error(e(365))}}function wr(n,e){var r=[]
n=[n,0]
for(var t=0;t<n.length;){var l=n[t++],u=n[t++],o=e[u]
if(5!==l.tag||!vl(l)){for(;null!=o&&hr(l,o);)o=e[++u]
if(u===e.length)r.push(l)
else for(l=l.child;null!==l;)n.push(l,u),l=l.sibling}}return r}function br(n,r){if(!al)throw Error(e(363))
n=wr(n=pr(n),r),r=[],n=Array.from(n)
for(var t=0;t<n.length;){var l=n[t++]
if(5===l.tag)vl(l)||r.push(l.stateNode)
else for(l=l.child;null!==l;)n.push(l),l=l.sibling}return r}function mr(){ii=Eu()+500}function gr(){return 6&Go?Eu():-1!==yi?yi:yi=Eu()}function kr(n){return 1&n.mode?2&Go&&0!==Ko?Ko&-Ko:null!==Fu.transition?(0===wi&&(n=yu,!(4194240&(yu<<=1))&&(yu=64),wi=n),wi):0!==(n=bu)?n:ll():1}function xr(n,r,t){if(50<pi)throw pi=0,hi=null,Error(e(185))
var l=Er(n,r)
return null===l?null:(j(l,r,t),2&Go&&l===Yo||(l===Yo&&(!(2&Go)&&(ri|=r),4===Zo&&jr(l,Ko)),Sr(l,t),1===r&&0===Go&&!(1&n.mode)&&(mr(),Iu&&I())),l)}function Er(n,e){n.lanes|=e
var r=n.alternate
for(null!==r&&(r.lanes|=e),r=n,n=n.return;null!==n;)n.childLanes|=e,null!==(r=n.alternate)&&(r.childLanes|=e),r=n,n=n.return
return 3===r.tag?r.stateNode:null}function Sr(n,e){var r=n.callbackNode
!function(n,e){for(var r=n.suspendedLanes,t=n.pingedLanes,l=n.expirationTimes,u=n.pendingLanes;0<u;){var o=31-du(u),i=1<<o,a=l[o];-1===a?0!==(i&r)&&0===(i&t)||(l[o]=C(i,e)):a<=e&&(n.expiredLanes|=i),u&=~i}}(n,e)
var t=S(n,n===Yo?Ko:0)
if(0===t)null!==r&&gu(r),n.callbackNode=null,n.callbackPriority=0
else if(e=t&-t,n.callbackPriority!==e){if(null!=r&&gu(r),1===e)0===n.tag?function(n){Iu=!0,R(n)}(zr.bind(null,n)):R(zr.bind(null,n)),ol?il(function(){0===Go&&I()}):mu(Su,I),r=null
else{switch(T(t)){case 1:r=Su
break
case 4:r=Cu
break
case 16:default:r=Mu
break
case 536870912:r=Pu}r=Jr(r,Cr.bind(null,n))}n.callbackPriority=e,n.callbackNode=r}}function Cr(n,r){if(yi=-1,wi=0,6&Go)throw Error(e(327))
var t=n.callbackNode
if(Ur()&&n.callbackNode!==t)return null
var l=S(n,n===Yo?Ko:0)
if(0===l)return null
if(30&l||0!==(l&n.expiredLanes)||r)r=Lr(n,l)
else{r=l
var u=Go
Go|=2
var o=Fr()
for(Yo===n&&Ko===r||(mr(),Ir(n,r));;){try{Ar()
break}catch(a){Or(n,a)}1}L(),qo.current=o,Go=u,null!==Jo?r=0:(Yo=null,Ko=0,r=Zo)}if(0!==r){if(2===r&&0!==(u=M(n))&&(l=u,r=Mr(n,u)),1===r)throw t=ni,Ir(n,0),jr(n,l),Sr(n,Eu()),t
if(6===r)jr(n,l)
else{if(u=n.current.alternate,!(30&l||function(n){for(var e=n;;){if(16384&e.flags){var r=e.updateQueue
if(null!==r&&null!==(r=r.stores))for(var t=0;t<r.length;t++){var l=r[t],u=l.getSnapshot
l=l.value
try{if(!Tu(u(),l))return!1}catch(i){return!1}}}if(r=e.child,16384&e.subtreeFlags&&null!==r)r.return=e,e=r
else{if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return!0
e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}(u)||(r=Lr(n,l),2===r&&(o=M(n),0!==o&&(l=o,r=Mr(n,o))),1!==r)))throw t=ni,Ir(n,0),jr(n,l),Sr(n,Eu()),t
switch(n.finishedWork=u,n.finishedLanes=l,r){case 0:case 1:throw Error(e(345))
case 2:case 5:Hr(n,ui)
break
case 3:if(jr(n,l),(130023424&l)===l&&10<(r=oi+500-Eu())){if(0!==S(n,0))break
if(((u=n.suspendedLanes)&l)!==l){gr(),n.pingedLanes|=n.suspendedLanes&u
break}n.timeoutHandle=Jt(Hr.bind(null,n,ui),r)
break}Hr(n,ui)
break
case 4:if(jr(n,l),(4194240&l)===l)break
for(r=n.eventTimes,u=-1;0<l;){var i=31-du(l)
o=1<<i,(i=r[i])>u&&(u=i),l&=~o}if(l=u,10<(l=(120>(l=Eu()-l)?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*Vo(l/1960))-l)){n.timeoutHandle=Jt(Hr.bind(null,n,ui),l)
break}Hr(n,ui)
break
default:throw Error(e(329))}}}return Sr(n,Eu()),n.callbackNode===t?Cr.bind(null,n):null}function Mr(n,e){var r=li
return n.current.memoizedState.isDehydrated&&(Ir(n,e).flags|=256),2!==(n=Lr(n,e))&&(e=ui,ui=r,null!==e&&Pr(e)),n}function Pr(n){null===ui?ui=n:ui.push.apply(ui,n)}function jr(n,e){for(e&=~ti,e&=~ri,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var r=31-du(e),t=1<<r
n[r]=-1,e&=~t}}function zr(n){if(6&Go)throw Error(e(327))
Ur()
var r=S(n,0)
if(!(1&r))return Sr(n,Eu()),null
var t=Lr(n,r)
if(0!==n.tag&&2===t){var l=M(n)
0!==l&&(r=l,t=Mr(n,l))}if(1===t)throw t=ni,Ir(n,0),jr(n,r),Sr(n,Eu()),t
if(6===t)throw Error(e(345))
return n.finishedWork=n.current.alternate,n.finishedLanes=r,Hr(n,ui),Sr(n,Eu()),null}function Tr(n){null!==vi&&0===vi.tag&&!(6&Go)&&Ur()
var e=Go
Go|=1
var r=Wo.transition,t=bu
try{if(Wo.transition=null,bu=1,n)return n()}finally{bu=t,Wo.transition=r,!(6&(Go=e))&&I()}}function Rr(){Qo=Xo.current,p(Xo)}function Ir(n,e){n.finishedWork=null,n.finishedLanes=0
var r=n.timeoutHandle
if(r!==Qt&&(n.timeoutHandle=Qt,Kt(r)),null!==Jo)for(r=Jo.return;null!==r;){var t=r
switch(un(t),t.tag){case 1:null!=(t=t.type.childContextTypes)&&b()
break
case 3:kn(),p(su),p(fu),Cn()
break
case 5:En(t)
break
case 4:kn()
break
case 13:case 19:p(co)
break
case 10:N(t.type.t)
break
case 22:case 23:Rr()}r=r.return}if(Yo=n,Jo=n=Zr(n.current,null),Ko=Qo=e,Zo=0,ni=null,ti=ri=ei=0,ui=li=null,null!==Nu){for(e=0;e<Nu.length;e++)if(null!==(t=(r=Nu[e]).interleaved)){r.interleaved=null
var l=t.next,u=r.pending
if(null!==u){var o=u.next
u.next=l,t.next=o}r.pending=t}Nu=null}return n}function Or(n,r){for(;;){var t=Jo
try{if(L(),so.current=xo,bo){for(var l=ho.memoizedState;null!==l;){var u=l.queue
null!==u&&(u.pending=null),l=l.next}bo=!1}if(po=0,wo=yo=ho=null,mo=!1,go=0,$o.current=null,null===t||null===t.return){Zo=1,ni=r,Jo=null
break}n:{var o=n,i=t.return,a=t,c=r
if(r=Ko,a.flags|=32768,null!==c&&"object"==typeof c&&"function"==typeof c.then){var f=c,s=a,v=s.tag
if(!(1&s.mode||0!==v&&11!==v&&15!==v)){var d=s.alternate
d?(s.updateQueue=d.updateQueue,s.memoizedState=d.memoizedState,s.lanes=d.lanes):(s.updateQueue=null,s.memoizedState=null)}var p=be(i)
if(null!==p){p.flags&=-257,me(p,i,a,0,r),1&p.mode&&we(o,f,r),c=f
var h=(r=p).updateQueue
if(null===h){var y=new Set
y.add(c),r.updateQueue=y}else h.add(c)
break n}if(!(1&r)){we(o,f,r),Dr()
break n}c=Error(e(426))}else if(no&&1&a.mode){var w=be(i)
if(null!==w){!(65536&w.flags)&&(w.flags|=256),me(w,i,a,0,r),pn(c)
break n}}o=c,4!==Zo&&(Zo=2),null===li?li=[o]:li.push(o),c=de(c,a),a=i
do{switch(a.tag){case 3:a.flags|=65536,r&=-r,a.lanes|=r,Y(a,he(0,c,r))
break n
case 1:o=c
var b=a.type,m=a.stateNode
if(!(128&a.flags||"function"!=typeof b.getDerivedStateFromError&&(null===m||"function"!=typeof m.componentDidCatch||null!==fi&&fi.has(m)))){a.flags|=65536,r&=-r,a.lanes|=r,Y(a,ye(a,o,r))
break n}}a=a.return}while(null!==a)}Br(t)}catch(g){r=g,Jo===t&&null!==t&&(Jo=t=t.return)
continue}break}}function Fr(){var n=qo.current
return qo.current=xo,null===n?xo:n}function Dr(){0!==Zo&&3!==Zo&&2!==Zo||(Zo=4),null===Yo||!(268435455&ei)&&!(268435455&ri)||jr(Yo,Ko)}function Lr(n,r){var t=Go
Go|=2
var l=Fr()
for(Yo===n&&Ko===r||Ir(n,r);;){try{_r()
break}catch(u){Or(n,u)}1}if(L(),Go=t,qo.current=l,null!==Jo)throw Error(e(261))
return Yo=null,Ko=0,Zo}function _r(){for(;null!==Jo;)Nr(Jo)}function Ar(){for(;null!==Jo&&!ku();)Nr(Jo)}function Nr(n){var e=Uo(n.alternate,n,Qo)
n.memoizedProps=n.pendingProps,null===e?Br(n):Jo=e,$o.current=null}function Br(n){var e=n
do{var r=e.alternate
if(n=e.return,32768&e.flags){if(null!==(r=We(r,e)))return r.flags&=32767,Jo=r,void 0
if(null===n)return Zo=6,Jo=null,void 0
n.flags|=32768,n.subtreeFlags=0,n.deletions=null}else if(null!==(r=Se(r,e,Qo)))return Jo=r,void 0
if(null!==(e=e.sibling))return Jo=e,void 0
Jo=e=n}while(null!==e)
0===Zo&&(Zo=5)}function Hr(n,r){var t=bu,l=Wo.transition
try{Wo.transition=null,bu=1,function(n,r,t){do{Ur()}while(null!==vi)
if(6&Go)throw Error(e(327))
var l=n.finishedWork,u=n.finishedLanes
if(null===l)return null
if(n.finishedWork=null,n.finishedLanes=0,l===n.current)throw Error(e(177))
n.callbackNode=null,n.callbackPriority=0
var o=l.lanes|l.childLanes
if(function(n,e){var r=n.pendingLanes&~e
n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements
var t=n.eventTimes
for(n=n.expirationTimes;0<r;){var l=31-du(r),u=1<<l
e[l]=0,t[l]=-1,n[l]=-1,r&=~u}}(n,o),n===Yo&&(Jo=Yo=null,Ko=0),!(2064&l.subtreeFlags)&&!(2064&l.flags)||si||(si=!0,Jr(Mu,function(){return Ur(),null})),o=!!(15990&l.flags),15990&l.subtreeFlags||o){o=Wo.transition,Wo.transition=null
var i=bu
bu=1
var a=Go
Go|=4,$o.current=null,function(n,r){for(Ht(n.containerInfo),Fo=r;null!==Fo;)if(r=(n=Fo).child,1028&n.subtreeFlags&&null!==r)r.return=n,Fo=r
else for(;null!==Fo;){n=Fo
try{var t=n.alternate
if(1024&n.flags)switch(n.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break
case 1:if(null!==t){var l=t.memoizedProps,u=t.memoizedState,o=n.stateNode,i=o.getSnapshotBeforeUpdate(n.elementType===n.type?l:D(n.type,l),u)
o.P=i}break
case 3:Zt&&Tl(n.stateNode.containerInfo)
break
default:throw Error(e(163))}}catch(a){qr(n,n.return,a)}if(null!==(r=n.sibling)){r.return=n.return,Fo=r
break}Fo=n.return}t=Do,Do=!1}(n,l),function(n,e){for(Fo=e;null!==Fo;){var r=(e=Fo).deletions
if(null!==r)for(var t=0;t<r.length;t++){var l=r[t]
try{var u=n
Zt?or(u,l,e):Ze(u,l,e)
var o=l.alternate
null!==o&&(o.return=null),l.return=null}catch(k){qr(l,e,k)}}if(r=e.child,12854&e.subtreeFlags&&null!==r)r.return=e,Fo=r
else for(;null!==Fo;){e=Fo
try{var i=e.flags
if(32&i&&Zt&&Cl(e.stateNode),512&i){var a=e.alternate
if(null!==a){var c=a.ref
null!==c&&("function"==typeof c?c(null):c.current=null)}}if(8192&i)switch(e.tag){case 13:if(null!==e.memoizedState){var f=e.alternate
null!==f&&null!==f.memoizedState||(oi=Eu())}break
case 22:var s=null!==e.memoizedState,v=e.alternate,d=null!==v&&null!==v.memoizedState
if(r=e,Zt)n:if(t=r,l=s,u=null,Zt)for(var p=t;;){if(5===p.tag){if(null===u){u=p
var h=p.stateNode
l?Ml(h):jl(p.stateNode,p.memoizedProps)}}else if(6===p.tag){if(null===u){var y=p.stateNode
l?Pl(y):zl(y,p.memoizedProps)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===t)&&null!==p.child){p.child.return=p,p=p.child
continue}if(p===t)break
for(;null===p.sibling;){if(null===p.return||p.return===t)break n
u===p&&(u=null),p=p.return}u===p&&(u=null),p.sibling.return=p.return,p=p.sibling}if(s&&!d&&1&r.mode){Fo=r
for(var w=r.child;null!==w;){for(r=Fo=w;null!==Fo;){var b=(t=Fo).child
switch(t.tag){case 0:case 11:case 14:case 15:Je(4,t,t.return)
break
case 1:Ge(t,t.return)
var m=t.stateNode
if("function"==typeof m.componentWillUnmount){var g=t.return
try{m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(k){qr(t,g,k)}}break
case 5:Ge(t,t.return)
break
case 22:if(null!==t.memoizedState){vr(r)
continue}}null!==b?(b.return=t,Fo=b):vr(r)}w=w.sibling}}}switch(4102&i){case 2:tr(e),e.flags&=-3
break
case 6:tr(e),e.flags&=-3,ir(e.alternate,e)
break
case 4096:e.flags&=-4097
break
case 4100:e.flags&=-4097,ir(e.alternate,e)
break
case 4:ir(e.alternate,e)}}catch(k){qr(e,e.return,k)}if(null!==(r=e.sibling)){r.return=e.return,Fo=r
break}Fo=e.return}}}(n,l),Ut(n.containerInfo),n.current=l,cr(l),xu(),Go=a,bu=i,Wo.transition=o}else n.current=l
if(si&&(si=!1,vi=n,di=u),0===(o=n.pendingLanes)&&(fi=null),function(n){if(zu&&"function"==typeof zu.onCommitFiberRoot)try{zu.onCommitFiberRoot(ju,n,void 0,!(128&~n.current.flags))}catch(r){}}(l.stateNode),Sr(n,Eu()),null!==r)for(t=n.onRecoverableError,l=0;l<r.length;l++)t(r[l])
if(ai)throw ai=!1,n=ci,ci=null,n
return!!(1&di)&&0!==n.tag&&Ur(),1&(o=n.pendingLanes)?n===hi?pi++:(pi=0,hi=n):pi=0,I(),null}(n,r,t)}finally{Wo.transition=l,bu=t}return null}function Ur(){if(null!==vi){var n=T(di),r=Wo.transition,t=bu
try{if(Wo.transition=null,bu=16>n?16:n,null===vi)var l=!1
else{if(n=vi,vi=null,di=0,6&Go)throw Error(e(331))
var u=Go
for(Go|=4,Fo=n.current;null!==Fo;){var o=Fo,i=o.child
if(16&Fo.flags){var a=o.deletions
if(null!==a){for(var c=0;c<a.length;c++){var f=a[c]
for(Fo=f;null!==Fo;){var s=Fo
switch(s.tag){case 0:case 11:case 15:Je(8,s,o)}var v=s.child
if(null!==v)v.return=s,Fo=v
else for(;null!==Fo;){var d=(s=Fo).sibling,p=s.return
if(nr(s),s===f){Fo=null
break}if(null!==d){d.return=p,Fo=d
break}Fo=p}}}var h=o.alternate
if(null!==h){var y=h.child
if(null!==y){h.child=null
do{var w=y.sibling
y.sibling=null,y=w}while(null!==y)}}Fo=o}}if(2064&o.subtreeFlags&&null!==i)i.return=o,Fo=i
else n:for(;null!==Fo;){if(2048&(o=Fo).flags)switch(o.tag){case 0:case 11:case 15:Je(9,o,o.return)}var b=o.sibling
if(null!==b){b.return=o.return,Fo=b
break n}Fo=o.return}}var m=n.current
for(Fo=m;null!==Fo;){var g=(i=Fo).child
if(2064&i.subtreeFlags&&null!==g)g.return=i,Fo=g
else n:for(i=m;null!==Fo;){if(2048&(a=Fo).flags)try{switch(a.tag){case 0:case 11:case 15:Ke(9,a)}}catch(x){qr(a,a.return,x)}if(a===i){Fo=null
break n}var k=a.sibling
if(null!==k){k.return=a.return,Fo=k
break n}Fo=a.return}}if(Go=u,I(),zu&&"function"==typeof zu.onPostCommitFiberRoot)try{zu.onPostCommitFiberRoot(ju,n)}catch(x){}l=!0}return l}finally{bu=t,Wo.transition=r}}return!1}function Vr(n,e,r){W(n,e=he(0,e=de(r,e),1)),e=gr(),null!==(n=Er(n,1))&&(j(n,1,e),Sr(n,e))}function qr(n,e,r){if(3===n.tag)Vr(n,n,r)
else for(;null!==e;){if(3===e.tag){Vr(e,n,r)
break}if(1===e.tag){var t=e.stateNode
if("function"==typeof e.type.getDerivedStateFromError||"function"==typeof t.componentDidCatch&&(null===fi||!fi.has(t))){W(e,n=ye(e,n=de(r,n),1)),n=gr(),null!==(e=Er(e,1))&&(j(e,1,n),Sr(e,n))
break}}e=e.return}}function $r(n,e,r){var t=n.pingCache
null!==t&&t.delete(e),e=gr(),n.pingedLanes|=n.suspendedLanes&r,Yo===n&&(Ko&r)===r&&(4===Zo||3===Zo&&(130023424&Ko)===Ko&&500>Eu()-oi?Ir(n,0):ti|=r),Sr(n,e)}function Wr(n,e){0===e&&(1&n.mode?(e=wu,!(130023424&(wu<<=1))&&(wu=4194304)):e=1)
var r=gr()
null!==(n=Er(n,e))&&(j(n,e,r),Sr(n,r))}function Gr(n){var e=n.memoizedState,r=0
null!==e&&(r=e.retryLane),Wr(n,r)}function Yr(n,r){var t=0
switch(n.tag){case 13:var l=n.stateNode,u=n.memoizedState
null!==u&&(t=u.retryLane)
break
case 19:l=n.stateNode
break
default:throw Error(e(314))}null!==l&&l.delete(r),Wr(n,t)}function Jr(n,e){return mu(n,e)}function Kr(n,e,r,t){this.tag=n,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=t,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qr(n,e,r,t){return new Kr(n,e,r,t)}function Xr(n){return!(!(n=n.prototype)||!n.isReactComponent)}function Zr(n,e){var r=n.alternate
return null===r?((r=Qr(n.tag,e,n.key,n.mode)).elementType=n.elementType,r.type=n.type,r.stateNode=n.stateNode,r.alternate=n,n.alternate=r):(r.pendingProps=e,r.type=n.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=14680064&n.flags,r.childLanes=n.childLanes,r.lanes=n.lanes,r.child=n.child,r.memoizedProps=n.memoizedProps,r.memoizedState=n.memoizedState,r.updateQueue=n.updateQueue,e=n.dependencies,r.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext},r.sibling=n.sibling,r.index=n.index,r.ref=n.ref,r}function nt(n,r,t,l,u,o){var i=2
if(l=n,"function"==typeof n)Xr(n)&&(i=1)
else if("string"==typeof n)i=5
else n:switch(n){case Ct:return et(t.children,u,o,r)
case Mt:i=8,u|=8
break
case Pt:return(n=Qr(12,t,r,2|u)).elementType=Pt,n.lanes=o,n
case Rt:return(n=Qr(13,t,r,u)).elementType=Rt,n.lanes=o,n
case It:return(n=Qr(19,t,r,u)).elementType=It,n.lanes=o,n
case Dt:return rt(t,u,o,r)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case jt:i=10
break n
case zt:i=9
break n
case Tt:i=11
break n
case Ot:i=14
break n
case Ft:i=16,l=null
break n}throw Error(e(130,null==n?n:typeof n,""))}return(r=Qr(i,t,r,u)).elementType=n,r.type=l,r.lanes=o,r}function et(n,e,r,t){return(n=Qr(7,n,t,e)).lanes=r,n}function rt(n,e,r,t){return(n=Qr(22,n,t,e)).elementType=Dt,n.lanes=r,n.stateNode={},n}function tt(n,e,r){return(n=Qr(6,n,null,e)).lanes=r,n}function lt(n,e,r){return(e=Qr(4,null!==n.children?n.children:[],n.key,e)).lanes=r,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function ut(n,e,r,t,l){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=Qt,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=P(0),this.expirationTimes=P(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=P(0),this.identifierPrefix=t,this.onRecoverableError=l,el&&(this.mutableSourceEagerHydrationData=null)}function ot(n,e,r,t,l,u,o,i,a){return n=new ut(n,e,r,i,a),1===e?(e=1,!0===u&&(e|=8)):e=0,u=Qr(3,null,null,e),n.current=u,u.stateNode=n,u.memoizedState={element:t,isDehydrated:r,cache:null,transitions:null},V(u),n}function it(n){if(!n)return cu
n:{if(u(n=n.m)!==n||1!==n.tag)throw Error(e(170))
var r=n
do{switch(r.tag){case 3:r=r.stateNode.context
break n
case 1:if(w(r.type)){r=r.stateNode.v
break n}}r=r.return}while(null!==r)
throw Error(e(171))}if(1===n.tag){var t=n.type
if(w(t))return g(n,t,r)}return r}function at(n){var r=n.m
if(void 0===r){if("function"==typeof n.render)throw Error(e(188))
throw n=Object.keys(n).join(","),Error(e(268,n))}return null===(n=a(r))?null:n.stateNode}function ct(n,e){if(null!==(n=n.memoizedState)&&null!==n.dehydrated){var r=n.retryLane
n.retryLane=0!==r&&r<e?r:e}}function ft(n,e){ct(n,e),(n=n.alternate)&&ct(n,e)}function st(n){return null===(n=a(n))?null:n.stateNode}function vt(){return null}var dt,pt,ht,yt,wt,bt={},mt=A(),gt=function(){return jn||(jn=1,On.exports=function(){return Pn||(Pn=1,function(n){function e(n,e){var r=n.length
n.push(e)
n:for(;0<r;){var t=r-1>>>1,u=n[t]
if(!(0<l(u,e)))break n
n[t]=e,n[r]=u,r=t}}function r(n){return 0===n.length?null:n[0]}function t(n){if(0===n.length)return null
var e=n[0],r=n.pop()
if(r!==e){n[0]=r
n:for(var t=0,u=n.length,o=u>>>1;t<o;){var i=2*(t+1)-1,a=n[i],c=i+1,f=n[c]
if(0>l(a,r))c<u&&0>l(f,a)?(n[t]=f,n[c]=r,t=c):(n[t]=a,n[i]=r,t=i)
else{if(!(c<u&&0>l(f,r)))break n
n[t]=f,n[c]=r,t=c}}}return e}function l(n,e){var r=n.sortIndex-e.sortIndex
return 0!==r?r:n.id-e.id}function u(n){for(var l=r(y);null!==l;){if(null===l.callback)t(y)
else{if(!(l.startTime<=n))break
t(y),l.sortIndex=l.expirationTime,e(h,l)}l=r(y)}}function o(n){if(x=!1,u(n),!k)if(null!==r(h))k=!0,f(i)
else{var e=r(y)
null!==e&&s(o,e.startTime-n)}}function i(e,l){k=!1,x&&(x=!1,S(z),z=-1),g=!0
var i=m
try{for(u(l),b=r(h);null!==b&&(!(b.expirationTime>l)||e&&!a());){var c=b.callback
if("function"==typeof c){b.callback=null,m=b.priorityLevel
var f=c(b.expirationTime<=l)
l=n.unstable_now(),"function"==typeof f?b.callback=f:b===r(h)&&t(h),u(l)}else t(h)
b=r(h)}if(null!==b)var v=!0
else{var d=r(y)
null!==d&&s(o,d.startTime-l),v=!1}return v}finally{b=null,m=i,g=!1}}function a(){return!(n.unstable_now()-R<T)}function c(){if(null!==j){var e=n.unstable_now()
R=e
var r=!0
try{r=j(!0,e)}finally{r?M():(P=!1,j=null)}}else P=!1}function f(n){j=n,P||(P=!0,M())}function s(e,r){z=E(function(){e(n.unstable_now())},r)}if("object"==typeof performance&&"function"==typeof performance.now){var v=performance
n.unstable_now=function(){return v.now()}}else{var d=Date,p=d.now()
n.unstable_now=function(){return d.now()-p}}var h=[],y=[],w=1,b=null,m=3,g=!1,k=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var M,P=!1,j=null,z=-1,T=5,R=-1
if("function"==typeof C)M=function(){C(c)}
else if("undefined"!=typeof MessageChannel){var I=new MessageChannel,O=I.port2
I.port1.onmessage=c,M=function(){O.postMessage(null)}}else M=function(){E(c,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){k||g||(k=!0,f(i))},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:T=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return r(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var r=m
m=e
try{return n()}finally{m=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var r=m
m=n
try{return e()}finally{m=r}},n.unstable_scheduleCallback=function(t,l,u){var a=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?a+u:a,t){case 1:var c=-1
break
case 2:c=250
break
case 5:c=1073741823
break
case 4:c=1e4
break
default:c=5e3}return t={id:w++,callback:l,priorityLevel:t,startTime:u,expirationTime:c=u+c,sortIndex:-1},u>a?(t.sortIndex=u,e(y,t),null===r(h)&&t===r(y)&&(x?(S(z),z=-1):x=!0,s(o,u-a))):(t.sortIndex=c,e(h,t),k||g||(k=!0,f(i))),t},n.unstable_shouldYield=a,n.unstable_wrapCallback=function(n){var e=m
return function(){var r=m
m=e
try{return n.apply(this,arguments)}finally{m=r}}}}(Fn)),Fn}()),On.exports}(),kt=Object.assign,xt=mt.j,Et=Symbol.for("react.element"),St=Symbol.for("react.portal"),Ct=Symbol.for("react.fragment"),Mt=Symbol.for("react.strict_mode"),Pt=Symbol.for("react.profiler"),jt=Symbol.for("react.provider"),zt=Symbol.for("react.context"),Tt=Symbol.for("react.forward_ref"),Rt=Symbol.for("react.suspense"),It=Symbol.for("react.suspense_list"),Ot=Symbol.for("react.memo"),Ft=Symbol.for("react.lazy"),Dt=Symbol.for("react.offscreen"),Lt=Symbol.iterator,_t=Array.isArray,At=n.getPublicInstance,Nt=n.getRootHostContext,Bt=n.getChildHostContext,Ht=n.prepareForCommit,Ut=n.resetAfterCommit,Vt=n.createInstance,qt=n.appendInitialChild,$t=n.finalizeInitialChildren,Wt=n.prepareUpdate,Gt=n.shouldSetTextContent,Yt=n.createTextInstance,Jt=n.scheduleTimeout,Kt=n.cancelTimeout,Qt=n.noTimeout,Xt=n.isPrimaryRenderer,Zt=n.supportsMutation,nl=n.supportsPersistence,el=n.supportsHydration,rl=n.getInstanceFromNode,tl=n.preparePortalMount,ll=n.getCurrentEventPriority,ul=n.detachDeletedInstance,ol=n.supportsMicrotasks,il=n.scheduleMicrotask,al=n.supportsTestSelectors,cl=n.findFiberRoot,fl=n.getBoundingRect,sl=n.getTextContent,vl=n.isHiddenSubtree,dl=n.matchAccessibilityRole,pl=n.setFocusIfFocusable,hl=n.setupIntersectionObserver,yl=n.appendChild,wl=n.appendChildToContainer,bl=n.commitTextUpdate,ml=n.commitMount,gl=n.commitUpdate,kl=n.insertBefore,xl=n.insertInContainerBefore,El=n.removeChild,Sl=n.removeChildFromContainer,Cl=n.resetTextContent,Ml=n.hideInstance,Pl=n.hideTextInstance,jl=n.unhideInstance,zl=n.unhideTextInstance,Tl=n.clearContainer,Rl=n.cloneInstance,Il=n.createContainerChildSet,Ol=n.appendChildToContainerChildSet,Fl=n.finalizeContainerChildren,Dl=n.replaceContainerChildren,Ll=n.cloneHiddenInstance,_l=n.cloneHiddenTextInstance,Al=n.canHydrateInstance,Nl=n.canHydrateTextInstance,Bl=n.canHydrateSuspenseInstance,Hl=n.isSuspenseInstancePending,Ul=n.isSuspenseInstanceFallback,Vl=n.registerSuspenseInstanceRetry,ql=n.getNextHydratableSibling,$l=n.getFirstHydratableChild,Wl=n.getFirstHydratableChildWithinContainer,Gl=n.getFirstHydratableChildWithinSuspenseInstance,Yl=n.hydrateInstance,Jl=n.hydrateTextInstance,Kl=n.hydrateSuspenseInstance,Ql=n.getNextHydratableInstanceAfterSuspenseInstance,Xl=n.commitHydratedContainer,Zl=n.commitHydratedSuspenseInstance,nu=n.clearSuspenseBoundary,eu=n.clearSuspenseBoundaryFromContainer,ru=n.shouldDeleteUnhydratedTailInstances,tu=n.didNotMatchHydratedContainerTextInstance,lu=n.didNotMatchHydratedTextInstance,uu=!1,ou=Object.prototype.hasOwnProperty,iu=[],au=-1,cu={},fu=d(cu),su=d(!1),vu=cu,du=Math.clz32?Math.clz32:function(n){return 0==(n>>>=0)?32:31-(pu(n)/hu|0)|0},pu=Math.log,hu=Math.LN2,yu=64,wu=4194304,bu=0,mu=gt.unstable_scheduleCallback,gu=gt.unstable_cancelCallback,ku=gt.unstable_shouldYield,xu=gt.unstable_requestPaint,Eu=gt.unstable_now,Su=gt.unstable_ImmediatePriority,Cu=gt.unstable_UserBlockingPriority,Mu=gt.unstable_NormalPriority,Pu=gt.unstable_IdlePriority,ju=null,zu=null,Tu="function"==typeof Object.is?Object.is:function(n,e){return n===e&&(0!==n||1/n==1/e)||n!=n&&e!=e},Ru=null,Iu=!1,Ou=!1,Fu=xt.ReactCurrentBatchConfig,Du=d(null),Lu=null,_u=null,Au=null,Nu=null,Bu=!1,Hu=(new mt.Component).refs,Uu={isMounted:function(n){return!!(n=n.m)&&u(n)===n},enqueueSetState:function(n,e,r){n=n.m
var t=gr(),l=kr(n),u=$(t,l)
u.payload=e,null!=r&&(u.callback=r),W(n,u),null!==(e=xr(n,l,t))&&G(e,n,l)},enqueueReplaceState:function(n,e,r){n=n.m
var t=gr(),l=kr(n),u=$(t,l)
u.tag=1,u.payload=e,null!=r&&(u.callback=r),W(n,u),null!==(e=xr(n,l,t))&&G(e,n,l)},enqueueForceUpdate:function(n,e){n=n.m
var r=gr(),t=kr(n),l=$(r,t)
l.tag=2,null!=e&&(l.callback=e),W(n,l),null!==(e=xr(n,t,r))&&G(e,n,t)}},Vu=[],qu=0,$u=null,Wu=0,Gu=[],Yu=0,Ju=null,Ku=1,Qu="",Xu=null,Zu=null,no=!1,eo=!1,ro=null,to=bn(!0),lo=bn(!1),uo={},oo=d(uo),io=d(uo),ao=d(uo),co=d(0),fo=[],so=xt.ReactCurrentDispatcher,vo=xt.ReactCurrentBatchConfig,po=0,ho=null,yo=null,wo=null,bo=!1,mo=!1,go=0,ko=0,xo={readContext:U,useCallback:Mn,useContext:Mn,useEffect:Mn,useImperativeHandle:Mn,useInsertionEffect:Mn,useLayoutEffect:Mn,useMemo:Mn,useReducer:Mn,useRef:Mn,useState:Mn,useDebugValue:Mn,useDeferredValue:Mn,useTransition:Mn,useMutableSource:Mn,useSyncExternalStore:Mn,useId:Mn,unstable_isNewReconciler:!1},Eo={readContext:U,useCallback:function(n,e){return In().memoizedState=[n,void 0===e?null:e],n},useContext:U,useEffect:Kn,useImperativeHandle:function(n,e,r){return r=null!=r?r.concat([n]):null,Yn(4194308,4,ne.bind(null,e,n),r)},useLayoutEffect:function(n,e){return Yn(4194308,4,n,e)},useInsertionEffect:function(n,e){return Yn(4,2,n,e)},useMemo:function(n,e){var r=In()
return e=void 0===e?null:e,n=n(),r.memoizedState=[n,e],n},useReducer:function(n,e,r){var t=In()
return e=void 0!==r?r(e):e,t.memoizedState=t.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},t.queue=n,n=n.dispatch=ie.bind(null,ho,n),[t.memoizedState,n]},useRef:function(n){return n={current:n},In().memoizedState=n},useState:$n,useDebugValue:re,useDeferredValue:function(n){var e=$n(n),r=e[0],t=e[1]
return Kn(function(){var e=vo.transition
vo.transition={}
try{t(n)}finally{vo.transition=e}},[n]),r},useTransition:function(){var n=$n(!1),e=n[0]
return n=ue.bind(null,n[1]),In().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,t){var l=ho,u=In()
if(no){if(void 0===t)throw Error(e(407))
t=t()}else{if(t=r(),null===Yo)throw Error(e(349))
30&po||Hn(l,r,t)}u.memoizedState=t
var o={value:t,getSnapshot:r}
return u.queue=o,Kn(Vn.bind(null,l,o,n),[n]),l.flags|=2048,Wn(9,Un.bind(null,l,o,t,r),void 0,null),t},useId:function(){var n=In(),e=Yo.identifierPrefix
if(no){var r=Qu
e=":"+e+"R"+(r=(Ku&~(1<<32-du(Ku)-1)).toString(32)+r),0<(r=go++)&&(e+="H"+r.toString(32)),e+=":"}else e=":"+e+"r"+(r=ko++).toString(32)+":"
return n.memoizedState=e},unstable_isNewReconciler:!1},So={readContext:U,useCallback:te,useContext:U,useEffect:Qn,useImperativeHandle:ee,useInsertionEffect:Xn,useLayoutEffect:Zn,useMemo:le,useReducer:_n,useRef:Gn,useState:function(){return _n(Ln)},useDebugValue:re,useDeferredValue:function(n){var e=_n(Ln),r=e[0],t=e[1]
return Qn(function(){var e=vo.transition
vo.transition={}
try{t(n)}finally{vo.transition=e}},[n]),r},useTransition:function(){return[_n(Ln)[0],Dn().memoizedState]},useMutableSource:Nn,useSyncExternalStore:Bn,useId:oe,unstable_isNewReconciler:!1},Co={readContext:U,useCallback:te,useContext:U,useEffect:Qn,useImperativeHandle:ee,useInsertionEffect:Xn,useLayoutEffect:Zn,useMemo:le,useReducer:An,useRef:Gn,useState:function(){return An(Ln)},useDebugValue:re,useDeferredValue:function(n){var e=An(Ln),r=e[0],t=e[1]
return Qn(function(){var e=vo.transition
vo.transition={}
try{t(n)}finally{vo.transition=e}},[n]),r},useTransition:function(){return[An(Ln)[0],Dn().memoizedState]},useMutableSource:Nn,useSyncExternalStore:Bn,useId:oe,unstable_isNewReconciler:!1},Mo="function"==typeof WeakMap?WeakMap:Map
if(Zt)pt=function(n,e){for(var r=e.child;null!==r;){if(5===r.tag||6===r.tag)qt(n,r.stateNode)
else if(4!==r.tag&&null!==r.child){r.child.return=r,r=r.child
continue}if(r===e)break
for(;null===r.sibling;){if(null===r.return||r.return===e)return
r=r.return}r.sibling.return=r.return,r=r.sibling}},ht=function(){},yt=function(n,e,r,t,l){if((n=n.memoizedProps)!==t){var u=e.stateNode,o=mn(oo.current)
r=Wt(u,r,n,t,l,o),(e.updateQueue=r)&&ge(e)}},wt=function(n,e,r,t){r!==t&&ge(e)}
else if(nl){pt=function(n,e,r,t){for(var l=e.child;null!==l;){if(5===l.tag){var u=l.stateNode
r&&t&&(u=Ll(u,l.type,l.memoizedProps,l)),qt(n,u)}else if(6===l.tag)u=l.stateNode,r&&t&&(u=_l(u,l.memoizedProps,l)),qt(n,u)
else if(4!==l.tag)if(22===l.tag&&null!==l.memoizedState)null!==(u=l.child)&&(u.return=l),pt(n,l,!0,!0)
else if(null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}}
var Po=function(n,e,r,t){for(var l=e.child;null!==l;){if(5===l.tag){var u=l.stateNode
r&&t&&(u=Ll(u,l.type,l.memoizedProps,l)),Ol(n,u)}else if(6===l.tag)u=l.stateNode,r&&t&&(u=_l(u,l.memoizedProps,l)),Ol(n,u)
else if(4!==l.tag)if(22===l.tag&&null!==l.memoizedState)null!==(u=l.child)&&(u.return=l),Po(n,l,!0,!0)
else if(null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}}
ht=function(n,e){var r=e.stateNode
if(!ke(n,e)){n=r.containerInfo
var t=Il(n)
Po(t,e,!1,!1),r.pendingChildren=t,ge(e),Fl(n,t)}},yt=function(n,e,r,t,l){var u=n.stateNode,o=n.memoizedProps
if((n=ke(n,e))&&o===t)e.stateNode=u
else{var i=e.stateNode,a=mn(oo.current),c=null
o!==t&&(c=Wt(i,r,o,t,l,a)),n&&null===c?e.stateNode=u:(u=Rl(u,c,r,o,t,e,n,i),$t(u,r,t,l,a)&&ge(e),e.stateNode=u,n?ge(e):pt(u,e,!1,!1))}},wt=function(n,e,r,t){r!==t?(n=mn(ao.current),r=mn(oo.current),e.stateNode=Yt(t,n,r,e),ge(e)):e.stateNode=n.stateNode}}else ht=function(){},yt=function(){},wt=function(){}
var jo=xt.ReactCurrentOwner,zo=!1,To={dehydrated:null,treeContext:null,retryLane:0},Ro=!1,Io=!1,Oo="function"==typeof WeakSet?WeakSet:Set,Fo=null,Do=!1,Lo=0,_o=1,Ao=2,No=3,Bo=4
if("function"==typeof Symbol&&Symbol.for){var Ho=Symbol.for
Lo=Ho("selector.component"),_o=Ho("selector.has_pseudo_class"),Ao=Ho("selector.role"),No=Ho("selector.test_id"),Bo=Ho("selector.text")}var Uo,Vo=Math.ceil,qo=xt.ReactCurrentDispatcher,$o=xt.ReactCurrentOwner,Wo=xt.ReactCurrentBatchConfig,Go=0,Yo=null,Jo=null,Ko=0,Qo=0,Xo=d(0),Zo=0,ni=null,ei=0,ri=0,ti=0,li=null,ui=null,oi=0,ii=1/0,ai=!1,ci=null,fi=null,si=!1,vi=null,di=0,pi=0,hi=null,yi=-1,wi=0
return Uo=function(n,r,t){if(null!==n)if(n.memoizedProps!==r.pendingProps||su.current)zo=!0
else{if(0===(n.lanes&t)&&!(128&r.flags))return zo=!1,function(n,e,r){switch(e.tag){case 3:Fe(e),dn()
break
case 5:xn(e)
break
case 1:w(e.type)&&k(e)
break
case 4:gn(e,e.stateNode.containerInfo)
break
case 10:_(0,e.type.t,e.memoizedProps.value)
break
case 13:var t=e.memoizedState
if(null!==t)return null!==t.dehydrated?(h(co,1&co.current),e.flags|=128,null):0!==(r&e.child.childLanes)?_e(n,e,r):(h(co,1&co.current),null!==(n=$e(n,e,r))?n.sibling:null)
h(co,1&co.current)
break
case 19:if(t=0!==(r&e.childLanes),128&n.flags){if(t)return qe(n,e,r)
e.flags|=128}var l=e.memoizedState
if(null!==l&&(l.rendering=null,l.tail=null,l.lastEffect=null),h(co,co.current),t)break
return null
case 22:case 23:return e.lanes=0,ze(n,e,r)}return $e(n,e,r)}(n,r,t)
zo=!!(131072&n.flags)}else zo=!1,no&&1048576&r.flags&&tn(r,Wu,r.index)
switch(r.lanes=0,r.tag){case 2:var l=r.type
null!==n&&(n.alternate=null,r.alternate=null,r.flags|=2),n=r.pendingProps
var u=y(r,fu.current)
H(r,t),u=Tn(null,r,l,n,u,t)
var o=Rn()
return r.flags|=1,"object"==typeof u&&null!==u&&"function"==typeof u.render&&void 0===u.$$typeof?(r.tag=1,r.memoizedState=null,r.updateQueue=null,w(l)?(o=!0,k(r)):o=!1,r.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,V(r),u.updater=Uu,r.stateNode=u,u.m=r,en(r,l,n,t),r=Oe(null,r,l,!0,o,t)):(r.tag=0,no&&o&&ln(r),Ce(null,r,u,t),r=r.child),r
case 16:l=r.elementType
n:{switch(null!==n&&(n.alternate=null,r.alternate=null,r.flags|=2),n=r.pendingProps,l=(u=l.u)(l.l),r.type=l,u=r.tag=function(n){if("function"==typeof n)return Xr(n)?1:0
if(null!=n){if((n=n.$$typeof)===Tt)return 11
if(n===Ot)return 14}return 2}(l),n=D(l,n),u){case 0:r=Re(null,r,l,n,t)
break n
case 1:r=Ie(null,r,l,n,t)
break n
case 11:r=Me(null,r,l,n,t)
break n
case 14:r=Pe(null,r,l,D(l.type,n),t)
break n}throw Error(e(306,l,""))}return r
case 0:return l=r.type,u=r.pendingProps,Re(n,r,l,u=r.elementType===l?u:D(l,u),t)
case 1:return l=r.type,u=r.pendingProps,Ie(n,r,l,u=r.elementType===l?u:D(l,u),t)
case 3:n:{if(Fe(r),null===n)throw Error(e(387))
l=r.pendingProps,u=(o=r.memoizedState).element,q(n,r),J(r,l,null,t)
var i=r.memoizedState
if(l=i.element,el&&o.isDehydrated){if(o={element:l,isDehydrated:!1,cache:i.cache,transitions:i.transitions},r.updateQueue.baseState=o,r.memoizedState=o,256&r.flags){r=De(n,r,l,t,u=Error(e(423)))
break n}if(l!==u){r=De(n,r,l,t,u=Error(e(424)))
break n}for(el&&(Zu=Wl(r.stateNode.containerInfo),Xu=r,no=!0,ro=null,eo=!1),t=lo(r,null,l,t),r.child=t;t;)t.flags=-3&t.flags|4096,t=t.sibling}else{if(dn(),l===u){r=$e(n,r,t)
break n}Ce(n,r,l,t)}r=r.child}return r
case 5:return xn(r),null===n&&fn(r),l=r.type,u=r.pendingProps,o=null!==n?n.memoizedProps:null,i=u.children,Gt(l,u)?i=null:null!==o&&Gt(l,o)&&(r.flags|=32),Te(n,r),Ce(n,r,i,t),r.child
case 6:return null===n&&fn(r),null
case 13:return _e(n,r,t)
case 4:return gn(r,r.stateNode.containerInfo),l=r.pendingProps,null===n?r.child=to(r,null,l,t):Ce(n,r,l,t),r.child
case 11:return l=r.type,u=r.pendingProps,Me(n,r,l,u=r.elementType===l?u:D(l,u),t)
case 7:return Ce(n,r,r.pendingProps,t),r.child
case 8:case 12:return Ce(n,r,r.pendingProps.children,t),r.child
case 10:n:{if(l=r.type.t,u=r.pendingProps,o=r.memoizedProps,_(0,l,i=u.value),null!==o)if(Tu(o.value,i)){if(o.children===u.children&&!su.current){r=$e(n,r,t)
break n}}else for(null!==(o=r.child)&&(o.return=r);null!==o;){var a=o.dependencies
if(null!==a){i=o.child
for(var c=a.firstContext;null!==c;){if(c.context===l){if(1===o.tag){(c=$(-1,t&-t)).tag=2
var f=o.updateQueue
if(null!==f){var s=(f=f.shared).pending
null===s?c.next=c:(c.next=s.next,s.next=c),f.pending=c}}o.lanes|=t,null!==(c=o.alternate)&&(c.lanes|=t),B(o.return,t,r),a.lanes|=t
break}c=c.next}}else if(10===o.tag)i=o.type===r.type?null:o.child
else if(18===o.tag){if(null===(i=o.return))throw Error(e(341))
i.lanes|=t,null!==(a=i.alternate)&&(a.lanes|=t),B(i,t,r),i=o.sibling}else i=o.child
if(null!==i)i.return=o
else for(i=o;null!==i;){if(i===r){i=null
break}if(null!==(o=i.sibling)){o.return=i.return,i=o
break}i=i.return}o=i}Ce(n,r,u.children,t),r=r.child}return r
case 9:return u=r.type,l=r.pendingProps.children,H(r,t),l=l(u=U(u)),r.flags|=1,Ce(n,r,l,t),r.child
case 14:return u=D(l=r.type,r.pendingProps),Pe(n,r,l,u=D(l.type,u),t)
case 15:return je(n,r,r.type,r.pendingProps,t)
case 17:return l=r.type,u=r.pendingProps,u=r.elementType===l?u:D(l,u),null!==n&&(n.alternate=null,r.alternate=null,r.flags|=2),r.tag=1,w(l)?(n=!0,k(r)):n=!1,H(r,t),Z(r,l,u),en(r,l,u,t),Oe(null,r,l,!0,n,t)
case 19:return qe(n,r,t)
case 22:return ze(n,r,t)}throw Error(e(156,r.tag))},bt.attemptContinuousHydration=function(n){13===n.tag&&(xr(n,134217728,gr()),ft(n,134217728))},bt.attemptHydrationAtCurrentPriority=function(n){if(13===n.tag){var e=gr(),r=kr(n)
xr(n,r,e),ft(n,r)}},bt.attemptSynchronousHydration=function(n){switch(n.tag){case 3:var e=n.stateNode
if(e.current.memoizedState.isDehydrated){var r=E(e.pendingLanes)
0!==r&&(z(e,1|r),Sr(e,Eu()),!(6&Go)&&(mr(),I()))}break
case 13:var t=gr()
Tr(function(){return xr(n,1,t)}),ft(n,1)}},bt.batchedUpdates=function(n,e){var r=Go
Go|=1
try{return n(e)}finally{0===(Go=r)&&(mr(),Iu&&I())}},bt.createComponentSelector=function(n){return{$$typeof:Lo,value:n}},bt.createContainer=function(n,e,r,t,l,u,o){return ot(n,e,!1,null,0,t,0,u,o)},bt.createHasPseudoClassSelector=function(n){return{$$typeof:_o,value:n}},bt.createHydrationContainer=function(n,e,r,t,l,u,o,i,a){return(n=ot(r,t,!0,n,0,u,0,i,a)).context=it(null),r=n.current,(u=$(t=gr(),l=kr(r))).callback=null!=e?e:null,W(r,u),n.current.lanes=l,j(n,l,t),Sr(n,t),n},bt.createPortal=function(n,e,r){var t=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:St,key:null==t?null:""+t,children:n,containerInfo:e,implementation:r}},bt.createRoleSelector=function(n){return{$$typeof:Ao,value:n}},bt.createTestNameSelector=function(n){return{$$typeof:No,value:n}},bt.createTextSelector=function(n){return{$$typeof:Bo,value:n}},bt.deferredUpdates=function(n){var e=bu,r=Wo.transition
try{return Wo.transition=null,bu=16,n()}finally{bu=e,Wo.transition=r}},bt.discreteUpdates=function(n,e,r,t,l){var u=bu,o=Wo.transition
try{return Wo.transition=null,bu=1,n(e,r,t,l)}finally{bu=u,Wo.transition=o,0===Go&&mr()}},bt.findAllNodes=br,bt.findBoundingRects=function(n,r){if(!al)throw Error(e(363))
r=br(n,r),n=[]
for(var t=0;t<r.length;t++)n.push(fl(r[t]))
for(r=n.length-1;0<r;r--)for(var l=(t=n[r]).x,u=l+t.width,o=t.y,i=o+t.height,a=r-1;0<=a;a--)if(r!==a){var c=n[a],f=c.x,s=f+c.width,v=c.y,d=v+c.height
if(l>=f&&o>=v&&u<=s&&i<=d){n.splice(r,1)
break}if(!(l!==f||t.width!==c.width||d<o||v>i)){v>o&&(c.height+=v-o,c.y=o),d<i&&(c.height=i-v),n.splice(r,1)
break}if(!(o!==v||t.height!==c.height||s<l||f>u)){f>l&&(c.width+=f-l,c.x=l),s<u&&(c.width=u-f),n.splice(r,1)
break}}return n},bt.findHostInstance=at,bt.findHostInstanceWithNoPortals=function(n){return null===(n=null!==(n=i(n))?f(n):null)?null:n.stateNode},bt.findHostInstanceWithWarning=function(n){return at(n)},bt.flushControlled=function(n){var e=Go
Go|=1
var r=Wo.transition,t=bu
try{Wo.transition=null,bu=1,n()}finally{bu=t,Wo.transition=r,0===(Go=e)&&(mr(),I())}},bt.flushPassiveEffects=Ur,bt.flushSync=Tr,bt.focusWithin=function(n,r){if(!al)throw Error(e(363))
for(r=wr(n=pr(n),r),r=Array.from(r),n=0;n<r.length;){var t=r[n++]
if(!vl(t)){if(5===t.tag&&pl(t.stateNode))return!0
for(t=t.child;null!==t;)r.push(t),t=t.sibling}}return!1},bt.getCurrentUpdatePriority=function(){return bu},bt.getFindAllNodesFailureDescription=function(n,r){if(!al)throw Error(e(363))
var t=0,l=[]
n=[pr(n),0]
for(var u=0;u<n.length;){var o=n[u++],i=n[u++],a=r[i]
if((5!==o.tag||!vl(o))&&(hr(o,a)&&(l.push(yr(a)),++i>t&&(t=i)),i<r.length))for(o=o.child;null!==o;)n.push(o,i),o=o.sibling}if(t<r.length){for(n=[];t<r.length;t++)n.push(yr(r[t]))
return"findAllNodes was able to match part of the selector:\n  "+l.join(" > ")+"\n\nNo matching component was found for:\n  "+n.join(" > ")}return null},bt.getPublicRootInstance=function(n){return(n=n.current).child?5===n.child.tag?At(n.child.stateNode):n.child.stateNode:null},bt.injectIntoDevTools=function(n){if(n={bundleType:n.bundleType,version:n.version,rendererPackageName:n.rendererPackageName,rendererConfig:n.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:st,findFiberByHostInstance:n.findFiberByHostInstance||vt,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.0.0-fc46dba67-20220329"},"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)n=!1
else{var e=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(e.isDisabled||!e.supportsFiber)n=!0
else{try{ju=e.inject(n),zu=e}catch(r){}n=!!e.checkDCE}}return n},bt.isAlreadyRendering=function(){return!1},bt.observeVisibleRects=function(n,r,t,l){if(!al)throw Error(e(363))
n=br(n,r)
var u=hl(n,t,l).disconnect
return{disconnect:function(){u()}}},bt.registerMutableSourceForHydration=function(n,e){var r=e.T
r=r(e.R),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[e,r]:n.mutableSourceEagerHydrationData.push(e,r)},bt.runWithPriority=function(n,e){var r=bu
try{return bu=n,e()}finally{bu=r}},bt.shouldError=function(){return null},bt.shouldSuspend=function(){return!1},bt.updateContainer=function(n,e,r,t){var l=e.current,u=gr(),o=kr(l)
return r=it(r),null===e.context?e.context=r:e.pendingContext=r,(e=$(u,o)).payload={element:n},null!==(t=void 0===t?null:t)&&(e.callback=t),W(l,e),null!==(n=xr(l,o,u))&&G(n,l,o),o},bt}),zn}function e(n){const e=_.useRef(n)
return Yn(()=>{e.current=n},[n]),e}function r({set:n}){return Yn(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}function t(n){var e
const r="undefined"!=typeof window?null!=(e=window.devicePixelRatio)?e:2:1
return Array.isArray(n)?Math.min(Math.max(n[0],r),n[1]):n}function l(n){let e=n.I.root
for(;e.getState().previousRoot;)e=e.getState().previousRoot
return e}function u(n,e){return n.I={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...e},n}function o(n,e){let r=n
if(e.includes("-")){const t=e.split("-"),l=t.pop()
return r=t.reduce((n,e)=>n[e],n),{target:r,key:l}}return{target:r,key:e}}function i(n,e,r){if(ne.str(r)){if(ee.test(r)){const e=r.replace(ee,""),{target:t,key:l}=o(n,e)
Array.isArray(t[l])||(t[l]=[])}const{target:t,key:l}=o(n,r)
e.I.previousAttach=t[l],t[l]=e}else e.I.previousAttach=r(n,e)}function a(n,e,r){var t,l
if(ne.str(r)){const{target:t,key:l}=o(n,r),u=e.I.previousAttach
void 0===u?delete t[l]:t[l]=u}else null==(t=e.I)||null==t.previousAttach?void 0:t.previousAttach(n,e)
null==(l=e.I)||delete l.previousAttach}function c(n,{children:e,key:r,ref:t,...l},{children:u,key:o,ref:i,...a}={},c=!1){const f=n.I,s=Object.entries(l),v=[]
if(c){const n=Object.keys(a)
for(let e=0;e<n.length;e++)l.hasOwnProperty(n[e])||s.unshift([n[e],Kn+"remove"])}s.forEach(([e,r])=>{var t
if(null!=(t=n.I)&&t.primitive&&"object"===e)return
if(ne.equ(r,a[e]))return
if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(e))return v.push([e,r,!0,[]])
let u=[]
e.includes("-")&&(u=e.split("-")),v.push([e,r,!1,u])
for(const n in l){const r=l[n]
n.startsWith(`${e}-`)&&v.push([n,r,!1,n.split("-")])}})
const d={...l}
return null!=f&&f.memoizedProps&&null!=f&&f.memoizedProps.args&&(d.args=f.memoizedProps.args),null!=f&&f.memoizedProps&&null!=f&&f.memoizedProps.attach&&(d.attach=f.memoizedProps.attach),{memoized:d,changes:v}}function f(n,e){var r
const t=n.I,u=null==t?void 0:t.root,o=null==u||null==u.getState?void 0:u.getState(),{memoized:i,changes:a}=Xn(e)?e:c(n,e),f=null==t?void 0:t.eventCount
n.I&&(n.I.memoizedProps=i)
for(let l=0;l<a.length;l++){let[e,r,u,i]=a[l]
if($n(n)){const n=3001,t="srgb",l="srgb-linear"
"encoding"===e?(e="colorSpace",r=r===n?t:l):"outputEncoding"===e&&(e="outputColorSpace",r=r===n?t:l)}let c=n,f=c[e]
if(i.length&&(f=i.reduce((n,e)=>n[e],n),!f||!f.set)){const[r,...t]=i.reverse()
c=t.reverse().reduce((n,e)=>n[e],n),e=r}if(r===Kn+"remove")if(c.constructor){let n=Qn.get(c.constructor)
n||(n=new c.constructor,Qn.set(c.constructor,n)),r=n[e]}else r=0
if(u&&t)r?t.handlers[e]=r:delete t.handlers[e],t.eventCount=Object.keys(t.handlers).length
else if(f&&f.set&&(f.copy||f instanceof en)){if(Array.isArray(r))f.fromArray?f.fromArray(r):f.set(...r)
else if(f.copy&&r&&r.constructor&&f.constructor===r.constructor)f.copy(r)
else if(void 0!==r){var d
const n=null==(d=f)?void 0:d.isColor
!n&&f.setScalar?f.setScalar(r):f instanceof en&&r instanceof en?f.mask=r.mask:f.set(r),!Wn()&&o&&!o.linear&&n&&f.convertSRGBToLinear()}}else{var p
if(c[e]=r,null!=(p=c[e])&&p.isTexture&&c[e].format===rn&&c[e].type===tn&&o){const n=c[e]
$n(n)&&$n(o.gl)?n.colorSpace=o.gl.outputColorSpace:n.encoding=o.gl.outputEncoding}}s(n)}if(t&&t.parent&&n.raycast&&f!==t.eventCount){const e=l(n).getState().internal,r=e.interaction.indexOf(n)
r>-1&&e.interaction.splice(r,1),t.eventCount&&e.interaction.push(n)}return!(1===a.length&&"onUpdate"===a[0][0])&&a.length&&null!=(r=n.I)&&r.parent&&v(n),n}function s(n){var e,r
const t=null==(e=n.I)||null==(r=e.root)||null==r.getState?void 0:r.getState()
t&&0===t.internal.frames&&t.invalidate()}function v(n){null==n.onUpdate?void 0:n.onUpdate(n)}function d(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function p(n,e,r,t){const l=r.get(e)
l&&(r.delete(e),0===r.size&&(n.delete(t),l.target.releasePointerCapture(t)))}function h(n,e){if(n.size)for(const{callback:r}of n.values())r(e)}function y(n,e){switch(n){case"before":return h(ie,e)
case"after":return h(ae,e)
case"tail":return h(ce,e)}}function w(n,e,r){let t=e.clock.getDelta()
for("never"===e.frameloop&&"number"==typeof n&&(t=n-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=n),ue=e.internal.subscribers,le=0;le<ue.length;le++)oe=ue[le],oe.ref.current(oe.store.getState(),t,r)
return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),"always"===e.frameloop?1:e.internal.frames}function b(){const n=_.useContext(te)
if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!")
return n}function m(n=n=>n,e){return b()(n,e)}function g(n,r=0){const t=b(),l=t.getState().internal.subscribe,u=e(n)
return Yn(()=>l(u,r,t),[r,l,t]),null}function k(n){const e=fe.get(n),r=null==e?void 0:e.fiber,l=null==e?void 0:e.store
e,0
const o="function"==typeof reportError?reportError:console.error,i=l||((n,e)=>{const r=function(){const r=function(n){let e
const r=new Set,t=(n,t)=>{const l="function"==typeof n?n(e):n
if(l!==e){const n=e
e=t?l:Object.assign({},e,l),r.forEach(r=>r(e,n))}},l=()=>e,u={setState:t,getState:l,subscribe:(n,t,u)=>t||u?((n,t=l,u=Object.is)=>{function o(){const r=t(e)
if(!u(i,r)){const e=i
n(i=r,e)}}void 0
let i=t(e)
return r.add(o),()=>r.delete(o)})(n,t,u):(r.add(n),()=>r.delete(n)),destroy:()=>r.clear()}
return e=n(t,l,u),u}((r,l)=>{function u(n=l().camera,e=i,r=l().size){const{width:t,height:u,top:c,left:f}=r,s=t/u
e.isVector3?a.copy(e):a.set(...e)
const v=n.getWorldPosition(o).distanceTo(a)
if(Gn(n))return{width:t/n.zoom,height:u/n.zoom,top:c,left:f,factor:1,distance:v,aspect:s}
{const e=n.fov*Math.PI/180,r=2*Math.tan(e/2)*v,l=r*(t/u)
return{width:l,height:r,top:c,left:f,factor:t/l,distance:v,aspect:s}}}const o=new X,i=new X,a=new X
let c
const f=n=>r(e=>({performance:{...e.performance,current:n}})),s=new Z,v={set:r,get:l,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(e=1)=>n(l(),e),advance:(n,r)=>e(n,r,l()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new nn,pointer:s,mouse:s,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const n=l()
c&&clearTimeout(c),n.performance.current!==n.performance.min&&f(n.performance.min),c=setTimeout(()=>f(l().performance.max),n.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:u},setEvents:n=>r(e=>({...e,events:{...e.events,...n}})),setSize:(n,e,t,o,a)=>{const c=l().camera,f={width:n,height:e,top:o||0,left:a||0,updateStyle:t}
r(n=>({size:f,viewport:{...n.viewport,...u(c,i,f)}}))},setDpr:n=>r(e=>{const r=t(n)
return{viewport:{...e.viewport,dpr:r,initialDpr:e.viewport.initialDpr||r}}}),setFrameloop:(n="always")=>{const e=l().clock
e.stop(),e.elapsedTime=0,"never"!==n&&(e.start(),e.elapsedTime=0),r(()=>({frameloop:n}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:_.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(n,e,r)=>{const t=l().internal
return t.priority=t.priority+(e>0?1:0),t.subscribers.push({ref:n,priority:e,store:r}),t.subscribers=t.subscribers.sort((n,e)=>n.priority-e.priority),()=>{const r=l().internal
null!=r&&r.subscribers&&(r.priority=r.priority-(e>0?1:0),r.subscribers=r.subscribers.filter(e=>e.ref!==n))}}}}
return v}),l=(n=r.getState,e=Object.is)=>{const[,t]=_.useReducer(n=>n+1,0),l=r.getState(),u=_.useRef(l),o=_.useRef(n),i=_.useRef(e),a=_.useRef(!1),c=_.useRef()
let f
void 0===c.current&&(c.current=n(l))
let s=!1;(u.current!==l||o.current!==n||i.current!==e||a.current)&&(f=n(l),s=!e(c.current,f)),Mn(()=>{s&&(c.current=f),u.current=l,o.current=n,i.current=e,a.current=!1})
const v=_.useRef(l)
Mn(()=>{const n=()=>{try{const n=r.getState(),e=o.current(n)
i.current(c.current,e)||(u.current=n,c.current=e,t())}catch(n){a.current=!0,t()}},e=r.subscribe(n)
return r.getState()!==v.current&&n(),e},[])
const d=s?f:c.current
return _.useDebugValue(d),d}
return Object.assign(l,r),l[Symbol.iterator]=function(){void 0
const n=[l,r]
return{next(){const e=n.length<=0
return{value:n.shift(),done:e}}}},l}(),l=r.getState()
let u=l.size,o=l.viewport.dpr,i=l.camera
return r.subscribe(()=>{const{camera:n,size:e,viewport:t,gl:l,set:a}=r.getState()
if(e.width!==u.width||e.height!==u.height||t.dpr!==o){var c
u=e,o=t.dpr,function(n,e){n.manual||(Gn(n)?(n.left=e.width/-2,n.right=e.width/2,n.top=e.height/2,n.bottom=e.height/-2):n.aspect=e.width/e.height,n.updateProjectionMatrix(),n.updateMatrixWorld())}(n,e),l.setPixelRatio(t.dpr)
const r=null!=(c=e.updateStyle)?c:"undefined"!=typeof HTMLCanvasElement&&l.domElement instanceof HTMLCanvasElement
l.setSize(e.width,e.height,r)}n!==i&&(i=n,a(e=>({viewport:{...e.viewport,...e.viewport.getCurrentViewport(n)}})))}),r.subscribe(e=>n(e)),r})(se,ve),a=r||de.createContainer(i,Cn.ConcurrentRoot,null,!1,null,"",o,null)
let c
e||fe.set(n,{fiber:a,store:i})
let f,s=!1
return{configure(e={}){let{gl:r,size:l,scene:o,events:a,onCreated:v,shadows:d=!1,linear:p=!1,flat:h=!1,legacy:y=!1,orthographic:w=!1,frameloop:b="always",dpr:m=[1,2],performance:g,raycaster:k,camera:x,onPointerMissed:E}=e,S=i.getState(),C=S.gl
S.gl||S.set({gl:C=ye(r,n)})
let M=S.raycaster
M||S.set({raycaster:M=new B})
const{params:P,...j}=k||{}
if(ne.equ(j,M,he)||pe(M,{...j}),ne.equ(P,M.params,he)||pe(M,{params:{...M.params,...P}}),!S.camera||S.camera===f&&!ne.equ(f,x,he)){f=x
const n=x instanceof Q,e=n?x:w?new H(0,0,0,0,.1,1e3):new U(75,0,.1,1e3)
n||(e.position.z=5,x&&(pe(e,x),("aspect"in x||"left"in x||"right"in x||"bottom"in x||"top"in x)&&(e.manual=!0,e.updateProjectionMatrix())),S.camera||null!=x&&x.rotation||e.lookAt(0,0,0)),S.set({camera:e}),M.camera=e}if(!S.scene){let n
null!=o&&o.isScene?n=o:(n=new V,o&&pe(n,o)),S.set({scene:u(n)})}if(!S.xr){var z
const n=(n,e)=>{const r=i.getState()
"never"!==r.frameloop&&ve(n,!0,r,e)},e=()=>{const e=i.getState()
e.gl.xr.enabled=e.gl.xr.isPresenting,e.gl.xr.setAnimationLoop(e.gl.xr.isPresenting?n:null),e.gl.xr.isPresenting||se(e)},r={connect(){const n=i.getState().gl
n.xr.addEventListener("sessionstart",e),n.xr.addEventListener("sessionend",e)},disconnect(){const n=i.getState().gl
n.xr.removeEventListener("sessionstart",e),n.xr.removeEventListener("sessionend",e)}}
"function"==typeof(null==(z=C.xr)?void 0:z.addEventListener)&&r.connect(),S.set({xr:r})}if(C.shadowMap){const n=C.shadowMap.enabled,e=C.shadowMap.type
if(C.shadowMap.enabled=!!d,ne.boo(d))C.shadowMap.type=q
else if(ne.str(d)){var T
const n={basic:G,percentage:W,soft:q,variance:$}
C.shadowMap.type=null!=(T=n[d])?T:q}else ne.obj(d)&&Object.assign(C.shadowMap,d)
n===C.shadowMap.enabled&&e===C.shadowMap.type||(C.shadowMap.needsUpdate=!0)}const R=Wn()
R&&("enabled"in R?R.enabled=!y:"legacyMode"in R&&(R.legacyMode=y)),s||pe(C,{outputEncoding:p?3e3:3001,toneMapping:h?Y:J}),S.legacy!==y&&S.set(()=>({legacy:y})),S.linear!==p&&S.set(()=>({linear:p})),S.flat!==h&&S.set(()=>({flat:h})),!r||ne.fun(r)||re(r)||ne.equ(r,C,he)||pe(C,r),a&&!S.events.handlers&&S.set({events:a(i)})
const I=function(n,e){const r="undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement
if(e){const{width:n,height:t,top:l,left:u,updateStyle:o=r}=e
return{width:n,height:t,top:l,left:u,updateStyle:o}}if("undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:e,height:t,top:l,left:u}=n.parentElement.getBoundingClientRect()
return{width:e,height:t,top:l,left:u,updateStyle:r}}return"undefined"!=typeof OffscreenCanvas&&n instanceof OffscreenCanvas?{width:n.width,height:n.height,top:0,left:0,updateStyle:r}:{width:0,height:0,top:0,left:0}}(n,l)
return ne.equ(I,S.size,he)||S.setSize(I.width,I.height,I.updateStyle,I.top,I.left),m&&S.viewport.dpr!==t(m)&&S.setDpr(m),S.frameloop!==b&&S.setFrameloop(b),S.onPointerMissed||S.set({onPointerMissed:E}),g&&!ne.equ(g,S.performance,he)&&S.set(n=>({performance:{...n.performance,...g}})),c=v,s=!0,this},render(e){return s||this.configure(),de.updateContainer(L.jsx(x,{store:i,children:e,onCreated:c,rootElement:n}),a,null,()=>{}),i},unmount(){E(n)}}}function x({store:n,children:e,onCreated:r,rootElement:t}){return Yn(()=>{const e=n.getState()
e.set(n=>({internal:{...n.internal,active:!0}})),r&&r(e),n.getState().events.connected||null==e.events.connect||e.events.connect(t)},[]),L.jsx(te.Provider,{value:n,children:e})}function E(n,e){const r=fe.get(n),t=null==r?void 0:r.fiber
if(t){const e=null==r?void 0:r.store.getState()
e&&(e.internal.active=!1),de.updateContainer(null,t,null,()=>{e&&setTimeout(()=>{try{var r,t,l,u
null==e.events.disconnect?void 0:e.events.disconnect(),null==(r=e.gl)||null==(t=r.renderLists)||null==t.dispose||t.dispose(),null==(l=e.gl)||null==l.forceContextLoss||l.forceContextLoss(),null!=(u=e.gl)&&u.xr&&e.xr.disconnect(),function(n){n.dispose&&"Scene"!==n.type&&n.dispose()
for(const e in n)null==e.dispose?void 0:e.dispose(),delete n[e]}(e),fe.delete(n)}catch(o){}},500)})}}function S(n){const{handlePointer:e}=function(n){function e(n){return n.filter(n=>["Move","Over","Enter","Out","Leave"].some(e=>{var r
return null==(r=n.I)?void 0:r.handlers["onPointer"+e]}))}function r(e){const{internal:r}=n.getState()
for(const n of r.hovered.values())if(!e.length||!e.find(e=>e.object===n.object&&e.index===n.index&&e.instanceId===n.instanceId)){const t=n.eventObject.I,l=null==t?void 0:t.handlers
if(r.hovered.delete(d(n)),null!=t&&t.eventCount){const r={...n,intersections:e}
null==l.onPointerOut?void 0:l.onPointerOut(r),null==l.onPointerLeave||l.onPointerLeave(r)}}}function t(n,e){for(let r=0;r<e.length;r++){const t=e[r].I
null==t||null==t.handlers.onPointerMissed?void 0:t.handlers.onPointerMissed(n)}}return{handlePointer:function(l){switch(l){case"onPointerLeave":case"onPointerCancel":return()=>r([])
case"onLostPointerCapture":return e=>{const{internal:t}=n.getState()
"pointerId"in e&&t.capturedMap.has(e.pointerId)&&requestAnimationFrame(()=>{t.capturedMap.has(e.pointerId)&&(t.capturedMap.delete(e.pointerId),r([]))})}}return function(u){const{onPointerMissed:o,internal:i}=n.getState()
i.lastEvent.current=u
const a="onPointerMove"===l,c="onClick"===l||"onContextMenu"===l||"onDoubleClick"===l,f=function(e,r){const t=n.getState(),l=new Set,u=[],o=r?r(t.internal.interaction):t.internal.interaction
for(let n=0;n<o.length;n++){const e=Zn(o[n])
e&&(e.raycaster.camera=void 0)}t.previousRoot||(null==t.events.compute?void 0:t.events.compute(e,t))
let i=o.flatMap(function(n){const r=Zn(n)
return r&&r.events.enabled&&null!==r.raycaster.camera?(void 0===r.raycaster.camera&&(null==r.events.compute?void 0:r.events.compute(e,r,null==(t=r.previousRoot)?void 0:t.getState()),void 0===r.raycaster.camera&&(r.raycaster.camera=null)),r.raycaster.camera?r.raycaster.intersectObject(n,!0):[]):[]
var t}).sort((n,e)=>{const r=Zn(n.object),t=Zn(e.object)
return r&&t&&t.events.priority-r.events.priority||n.distance-e.distance}).filter(n=>{const e=d(n)
return!l.has(e)&&(l.add(e),!0)})
t.events.filter&&(i=t.events.filter(i,t))
for(const n of i){let e=n.object
for(;e;){var a
null!=(a=e.I)&&a.eventCount&&u.push({...n,eventObject:e}),e=e.parent}}if("pointerId"in e&&t.internal.capturedMap.has(e.pointerId))for(let n of t.internal.capturedMap.get(e.pointerId).values())l.has(d(n.intersection))||u.push(n.intersection)
return u}(u,a?e:void 0),s=c?function(e){const{internal:r}=n.getState(),t=e.offsetX-r.initialClick[0],l=e.offsetY-r.initialClick[1]
return Math.round(Math.sqrt(t*t+l*l))}(u):0
"onPointerDown"===l&&(i.initialClick=[u.offsetX,u.offsetY],i.initialHits=f.map(n=>n.eventObject)),c&&!f.length&&s<=2&&(t(u,i.interaction),o&&o(u)),a&&r(f),function(e,t,l,u){const o=n.getState()
if(e.length){const n={stopped:!1}
for(const i of e){const a=Zn(i.object)||o,{raycaster:c,pointer:f,camera:s,internal:v}=a,d=new X(f.x,f.y,0).unproject(s),h=n=>{var e,r
return null!=(e=null==(r=v.capturedMap.get(n))?void 0:r.has(i.eventObject))&&e},y=n=>{const e={intersection:i,target:t.target}
v.capturedMap.has(n)?v.capturedMap.get(n).set(i.eventObject,e):v.capturedMap.set(n,new Map([[i.eventObject,e]])),t.target.setPointerCapture(n)},w=n=>{const e=v.capturedMap.get(n)
e&&p(v.capturedMap,i.eventObject,e,n)}
let b={}
for(let n in t){let e=t[n]
"function"!=typeof e&&(b[n]=e)}let m={...i,...b,pointer:f,intersections:e,stopped:n.stopped,delta:l,unprojectedPoint:d,ray:c.ray,camera:s,stopPropagation(){const l="pointerId"in t&&v.capturedMap.get(t.pointerId);(!l||l.has(i.eventObject))&&(m.stopped=n.stopped=!0,v.hovered.size&&Array.from(v.hovered.values()).find(n=>n.eventObject===i.eventObject))&&r([...e.slice(0,e.indexOf(i)),i])},target:{hasPointerCapture:h,setPointerCapture:y,releasePointerCapture:w},currentTarget:{hasPointerCapture:h,setPointerCapture:y,releasePointerCapture:w},nativeEvent:t}
if(u(m),!0===n.stopped)break}}}(f,u,s,function(n){const e=n.eventObject,r=e.I,o=null==r?void 0:r.handlers
if(null!=r&&r.eventCount)if(a){if(o.onPointerOver||o.onPointerEnter||o.onPointerOut||o.onPointerLeave){const e=d(n),r=i.hovered.get(e)
r?r.stopped&&n.stopPropagation():(i.hovered.set(e,n),null==o.onPointerOver||o.onPointerOver(n),null==o.onPointerEnter||o.onPointerEnter(n))}null==o.onPointerMove?void 0:o.onPointerMove(n)}else{const r=o[l]
r?c&&!i.initialHits.includes(e)||(t(u,i.interaction.filter(n=>!i.initialHits.includes(n))),r(n)):c&&i.initialHits.includes(e)&&t(u,i.interaction.filter(n=>!i.initialHits.includes(n)))}})}}}}(n)
return{priority:1,enabled:!0,compute(n,e,r){e.pointer.set(n.offsetX/e.size.width*2-1,-n.offsetY/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)},connected:void 0,handlers:Object.keys(we).reduce((n,r)=>({...n,[r]:e(r)}),{}),update:()=>{var e
const{events:r,internal:t}=n.getState()
null!=(e=t.lastEvent)&&e.current&&r.handlers&&r.handlers.onPointerMove(t.lastEvent.current)},connect:e=>{var r
const{set:t,events:l}=n.getState()
null==l.disconnect?void 0:l.disconnect(),t(n=>({events:{...n.events,connected:e}})),Object.entries(null!=(r=l.handlers)?r:[]).forEach(([n,r])=>{const[t,l]=we[n]
e.addEventListener(t,r,{passive:l})})},disconnect:()=>{const{set:e,events:r}=n.getState()
var t
r.connected&&(Object.entries(null!=(t=r.handlers)?t:[]).forEach(([n,e])=>{if(r&&r.connected instanceof HTMLElement){const[t]=we[n]
r.connected.removeEventListener(t,e)}}),e(n=>({events:{...n.events,connected:void 0}})))}}}function C(n,e){let r
return(...t)=>{window.clearTimeout(r),r=window.setTimeout(()=>n(...t),e)}}function M({debounce:n,scroll:e,polyfill:r,offsetSize:t}={debounce:0,scroll:!1,offsetSize:!1}){function l(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(n=>n.removeEventListener("scroll",h,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function u(){c.current.element&&(c.current.resizeObserver=new o(h),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(n=>n.addEventListener("scroll",h,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{h()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const o=r||("undefined"==typeof window?class{}:window.ResizeObserver)
if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills")
const[i,a]=_.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=_.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:i,orientationHandler:null}),f=n?"number"==typeof n?n:n.scroll:null,s=n?"number"==typeof n?n:n.resize:null,v=_.useRef(!1)
_.useEffect(()=>(v.current=!0,()=>{v.current=!1}))
const[d,p,h]=_.useMemo(()=>{const n=()=>{if(!c.current.element)return
const{left:n,top:e,width:r,height:l,bottom:u,right:o,x:i,y:f}=c.current.element.getBoundingClientRect(),s={left:n,top:e,width:r,height:l,bottom:u,right:o,x:i,y:f}
c.current.element instanceof HTMLElement&&t&&(s.height=c.current.element.offsetHeight,s.width=c.current.element.offsetWidth),Object.freeze(s),v.current&&!me(c.current.lastBounds,s)&&a(c.current.lastBounds=s)}
return[n,s?C(n,s):n,f?C(n,f):n]},[a,t,f,s])
return function(n,e){_.useEffect(()=>{if(e){const e=n
return window.addEventListener("scroll",e,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",e,!0)}}},[n,e])}(h,!!e),function(n){_.useEffect(()=>{const e=n
return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n])}(p),_.useEffect(()=>{l(),u()},[e,h,p]),_.useEffect(()=>l,[]),[n=>{!n||n===c.current.element||(l(),c.current.element=n,c.current.scrollContainers=P(n),u())},i,d]}function P(n){const e=[]
if(!n||n===document.body)return e
const{overflow:r,overflowX:t,overflowY:l}=window.getComputedStyle(n)
return[r,t,l].some(n=>"auto"===n||"scroll"===n)&&e.push(n),[...e,...P(n.parentElement)]}function j(){try{const n=document.createElement("canvas"),e=n.getContext("webgl")||n.getContext("experimental-webgl")
if(!e)return!1
const r=e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT),t=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT),l=e.getExtension("WEBGL_lose_context")
return l&&l.loseContext(),!(!r||!t)}catch(n){return void 0,!1}}function z(){try{const n=document.createElement("canvas").getContext("webgl2")
if(!n)return!1
const e=n.getExtension("WEBGL_lose_context")
return e&&e.loseContext(),!0}catch(n){return void 0,!1}}function T(){if(!j())return{supported:!1,version:null,maxTextureSize:0,maxVertexUniforms:0,maxFragmentUniforms:0}
try{const n=document.createElement("canvas"),e=n.getContext("webgl")||n.getContext("experimental-webgl"),r={supported:!0,version:z()?2:1,maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxVertexUniforms:e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),maxFragmentUniforms:e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxVaryingVectors:e.getParameter(e.MAX_VARYING_VECTORS),maxVertexAttribs:e.getParameter(e.MAX_VERTEX_ATTRIBS),maxViewportDims:e.getParameter(e.MAX_VIEWPORT_DIMS),aliasedLineWidthRange:e.getParameter(e.ALIASED_LINE_WIDTH_RANGE),aliasedPointSizeRange:e.getParameter(e.ALIASED_POINT_SIZE_RANGE)},t=e.getExtension("WEBGL_lose_context")
return t&&t.loseContext(),r}catch(n){return void 0,{supported:!1,version:null,maxTextureSize:0,maxVertexUniforms:0,maxFragmentUniforms:0}}}function R(){T()}function I({waveSpeed:n,waveFrequency:e,waveAmplitude:r,waveColor:t,colorNum:l,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a}){const c=_.useRef(null),f=_.useRef(new Z)
let s,v,d
try{const n=m()
s=n.viewport,v=n.size,d=n.gl}catch(y){return void 0,null}const p=_.useRef({time:new mn(0),resolution:new mn(new Z(0,0)),waveSpeed:new mn(n),waveFrequency:new mn(e),waveAmplitude:new mn(r),waveColor:new mn(new gn(...t)),mousePos:new mn(new Z(0,0)),enableMouseInteraction:new mn(i?1:0),mouseRadius:new mn(a)})
_.useEffect(()=>{const n=d.getPixelRatio(),e=Math.floor(v.width*n),r=Math.floor(v.height*n),t=p.current.resolution.value
t.x===e&&t.y===r||t.set(e,r)},[v,d])
const h=_.useRef([...t])
return g(({clock:l})=>{const u=p.current
o||(u.time.value=l.getElapsedTime()),u.waveSpeed.value!==n&&(u.waveSpeed.value=n),u.waveFrequency.value!==e&&(u.waveFrequency.value=e),u.waveAmplitude.value!==r&&(u.waveAmplitude.value=r),h.current.every((n,e)=>n===t[e])||(u.waveColor.value.set(...t),h.current=[...t]),u.enableMouseInteraction.value=i?1:0,u.mouseRadius.value=a,i&&u.mousePos.value.copy(f.current)}),L.jsxs(L.Fragment,{children:[L.jsxs("mesh",{ref:c,scale:[s.width,s.height,1],children:[L.jsx("planeGeometry",{args:[1,1]}),L.jsx("shaderMaterial",{vertexShader:"\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n",fragmentShader:"\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n",uniforms:p.current})]}),L.jsx(_.Suspense,{fallback:null,children:L.jsx(Se,{children:L.jsx(Te,{colorNum:l,pixelSize:u})})}),L.jsxs("mesh",{onPointerMove:n=>{if(!i)return
const e=d.domElement.getBoundingClientRect(),r=d.getPixelRatio()
f.current.set((n.clientX-e.left)*r,(n.clientY-e.top)*r)},position:[0,0,.01],scale:[s.width,s.height,1],visible:!1,children:[L.jsx("planeGeometry",{args:[1,1]}),L.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function O({reason:n="unknown"}){return _.useEffect(()=>{void 0,"webgl-unsupported"===n&&R()},[n]),L.jsxs("div",{className:"dither-container",style:{background:"linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",backgroundSize:"20px 20px",animation:"ditherFallback 3s ease-in-out infinite alternate",position:"relative"},children:[L.jsx("style",{children:"\n        @keyframes ditherFallback {\n          0% {\n            opacity: 0.8;\n            filter: hue-rotate(0deg) brightness(1.1);\n          }\n          100% {\n            opacity: 0.6;\n            filter: hue-rotate(15deg) brightness(0.9);\n          }\n        }\n      "}),!1]})}function F({waveSpeed:n=.05,waveFrequency:e=3,waveAmplitude:r=.3,waveColor:t=[.5,.5,.5],colorNum:l=4,pixelSize:u=2,disableAnimation:o=!1,enableMouseInteraction:i=!0,mouseRadius:a=1}){const[c,f]=_.useState(null),[s,v]=_.useState(!1)
if(_.useEffect(()=>{v(!0),requestAnimationFrame(()=>{const n=!("undefined"==typeof window||!document||!document.createElement||!j()||T().maxTextureSize<512)
f(n),void 0,n||R()})},[]),!s||null===c)return L.jsx(O,{reason:"initializing"})
if(!c)return L.jsx(O,{reason:"webgl-unsupported"})
try{return L.jsx(Pe,{fallback:()=>L.jsx(O,{reason:"runtime-error"}),children:L.jsx(ke,{className:"dither-container",camera:{position:[0,0,6]},dpr:Math.min(window.devicePixelRatio||1,2),gl:{antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1},onCreated:n=>{try{n.gl.setSize(n.size.width,n.size.height)}catch(e){throw void 0,e}},onError:n=>{void 0},fallback:L.jsx(O,{reason:"canvas-fallback"}),children:L.jsx(_.Suspense,{fallback:null,children:L.jsx(I,{waveSpeed:n,waveFrequency:e,waveAmplitude:r,waveColor:t,colorNum:l,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a})})})})}catch(d){return void 0,L.jsx(O,{reason:"component-error"})}}function D(){_.useEffect(()=>{void 0,void 0,navigator.userAgent,navigator.platform,navigator.vendor,navigator.language,navigator.cookieEnabled,navigator.onLine,screen.width,screen.height,screen.colorDepth,screen.pixelDepth,window.innerWidth,window.innerHeight,window.devicePixelRatio,window.location.protocol,window.location.hostname,window.location.port,performance.memory&&(performance.memory.usedJSHeapSize,performance.memory.totalJSHeapSize,performance.memory.jsHeapSizeLimit),(new Date).toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone},[])
const n=()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"}
return L.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[L.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:L.jsx(F,{waveSpeed:.05,waveFrequency:19,waveAmplitude:.51,waveColor:[.5,.5,.5],colorNum:2.5,pixelSize:3,disableAnimation:!1,enableMouseInteraction:!1,mouseRadius:.3})}),L.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 40px",borderRadius:"16px",background:"rgba(22, 22, 22, 0.12)",backdropFilter:"blur(4px)",border:"1px solid rgba(255, 255, 255, 0.06)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",maxWidth:"400px",width:"90%"},children:[L.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"24px"},children:[L.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"BOUNCE2BOUNCE",style:{height:"48px",width:"auto",cursor:"pointer",transition:"all 0.3s ease",opacity:.95,filter:"brightness(0) invert(1)"},onClick:n,onError:n=>{n.target.style.display="none",n.target.nextSibling.style.display="block"}}),L.jsx("div",{style:{display:"none",color:"rgba(255, 255, 255, 0.9)",fontSize:"18px",fontWeight:"600",letterSpacing:"0.5px"},children:"BOUNCE2BOUNCE"})]}),L.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 6rem)",fontWeight:"800",color:"rgba(255, 255, 255, 0.95)",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",textShadow:"0 2px 8px rgba(0, 0, 0, 0.2)"},children:"404"}),L.jsx("h2",{style:{fontSize:"clamp(1.25rem, 2.5vw, 1.5rem)",fontWeight:"500",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 32px 0",lineHeight:"1.2"},children:"Not Found"}),L.jsx("button",{onClick:n,style:{padding:"14px 28px",fontSize:"1rem",fontWeight:"500",color:"rgba(255, 255, 255, 0.9)",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"8px",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(2px)",transform:"translateY(0)",outline:"none"},onMouseEnter:n=>{n.target.style.background="rgba(255, 255, 255, 0.12)",n.target.style.borderColor="rgba(255, 255, 255, 0.25)",n.target.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.target.style.background="rgba(255, 255, 255, 0.08)",n.target.style.borderColor="rgba(255, 255, 255, 0.15)",n.target.style.transform="translateY(0)"},onFocus:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.3)"},onBlur:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.15)"},"aria-label":"Go back to homepage",children:"Go Home"})]})]})}import{j as L}from"./index-CS8L3Lri.js"
import{b as _,r as A,g as N,c as B,O as H,P as U,S as V,d as q,V as $,e as W,B as G,N as Y,A as J,W as K,C as Q,f as X,h as Z,i as nn,L as en,j as rn,U as tn,F as ln,u as un,T as on,R as an,k as cn,E as fn,H as sn,l as vn,m as dn,D as pn,n as hn,o as yn,p as wn,q as bn,s as mn,t as gn}from"./vendor-BwJ0PBRo.js"
var kn,xn,En={exports:{}},Sn={},Cn=function(){return xn||(xn=1,En.exports=function(){return kn||(kn=1,Sn.ConcurrentRoot=1,Sn.ContinuousEventPriority=4,Sn.DefaultEventPriority=16,Sn.DiscreteEventPriority=1,Sn.IdleEventPriority=536870912,Sn.LegacyRoot=0),Sn}()),En.exports}()
const Mn="undefined"==typeof window||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent)?_.useEffect:_.useLayoutEffect
var Pn,jn,zn,Tn,Rn,In={exports:{}},On={exports:{}},Fn={}
const Dn=N(function(){return Rn||(Rn=1,In.exports=n()),In.exports}())
var Ln,_n,An={exports:{}},Nn={},Bn=function(){return _n||(_n=1,An.exports=function(){return Ln||(Ln=1,function(n){function e(n,e){var r=n.length
n.push(e)
n:for(;0<r;){var t=r-1>>>1,u=n[t]
if(!(0<l(u,e)))break n
n[t]=e,n[r]=u,r=t}}function r(n){return 0===n.length?null:n[0]}function t(n){if(0===n.length)return null
var e=n[0],r=n.pop()
if(r!==e){n[0]=r
n:for(var t=0,u=n.length,o=u>>>1;t<o;){var i=2*(t+1)-1,a=n[i],c=i+1,f=n[c]
if(0>l(a,r))c<u&&0>l(f,a)?(n[t]=f,n[c]=r,t=c):(n[t]=a,n[i]=r,t=i)
else{if(!(c<u&&0>l(f,r)))break n
n[t]=f,n[c]=r,t=c}}}return e}function l(n,e){var r=n.sortIndex-e.sortIndex
return 0!==r?r:n.id-e.id}function u(n){for(var l=r(y);null!==l;){if(null===l.callback)t(y)
else{if(!(l.startTime<=n))break
t(y),l.sortIndex=l.expirationTime,e(h,l)}l=r(y)}}function o(n){if(x=!1,u(n),!k)if(null!==r(h))k=!0,f(i)
else{var e=r(y)
null!==e&&s(o,e.startTime-n)}}function i(e,l){k=!1,x&&(x=!1,S(z),z=-1),g=!0
var i=m
try{for(u(l),b=r(h);null!==b&&(!(b.expirationTime>l)||e&&!a());){var c=b.callback
if("function"==typeof c){b.callback=null,m=b.priorityLevel
var f=c(b.expirationTime<=l)
l=n.unstable_now(),"function"==typeof f?b.callback=f:b===r(h)&&t(h),u(l)}else t(h)
b=r(h)}if(null!==b)var v=!0
else{var d=r(y)
null!==d&&s(o,d.startTime-l),v=!1}return v}finally{b=null,m=i,g=!1}}function a(){return!(n.unstable_now()-R<T)}function c(){if(null!==j){var e=n.unstable_now()
R=e
var r=!0
try{r=j(!0,e)}finally{r?M():(P=!1,j=null)}}else P=!1}function f(n){j=n,P||(P=!0,M())}function s(e,r){z=E(function(){e(n.unstable_now())},r)}if("object"==typeof performance&&"function"==typeof performance.now){var v=performance
n.unstable_now=function(){return v.now()}}else{var d=Date,p=d.now()
n.unstable_now=function(){return d.now()-p}}var h=[],y=[],w=1,b=null,m=3,g=!1,k=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var M,P=!1,j=null,z=-1,T=5,R=-1
if("function"==typeof C)M=function(){C(c)}
else if("undefined"!=typeof MessageChannel){var I=new MessageChannel,O=I.port2
I.port1.onmessage=c,M=function(){O.postMessage(null)}}else M=function(){E(c,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){k||g||(k=!0,f(i))},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:T=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return r(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var r=m
m=e
try{return n()}finally{m=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var r=m
m=n
try{return e()}finally{m=r}},n.unstable_scheduleCallback=function(t,l,u){var a=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?a+u:a,t){case 1:var c=-1
break
case 2:c=250
break
case 5:c=1073741823
break
case 4:c=1e4
break
default:c=5e3}return t={id:w++,callback:l,priorityLevel:t,startTime:u,expirationTime:c=u+c,sortIndex:-1},u>a?(t.sortIndex=u,e(y,t),null===r(h)&&t===r(y)&&(x?(S(z),z=-1):x=!0,s(o,u-a))):(t.sortIndex=c,e(h,t),k||g||(k=!0,f(i))),t},n.unstable_shouldYield=a,n.unstable_wrapCallback=function(n){var e=m
return function(){var r=m
m=e
try{return n.apply(this,arguments)}finally{m=r}}}}(Nn)),Nn}()),An.exports}()
const Hn={},Un=n=>{Object.assign(Hn,n)}
var Vn,qn
const $n=n=>"colorSpace"in n||"outputColorSpace"in n,Wn=()=>{var n
return null!=(n=Hn.ColorManagement)?n:null},Gn=n=>n&&n.isOrthographicCamera,Yn="undefined"!=typeof window&&(null!=(Vn=window.document)&&Vn.createElement||"ReactNative"===(null==(qn=window.navigator)?void 0:qn.product))?_.useLayoutEffect:_.useEffect
class Jn extends _.Component{constructor(...n){super(...n),this.state={error:!1}}componentDidCatch(n){this.props.set(n)}render(){return this.state.error?null:this.props.children}}Jn.getDerivedStateFromError=()=>({error:!0})
const Kn="__default",Qn=new Map,Xn=n=>n&&!!n.memoized&&!!n.changes,Zn=n=>{var e
return null==(e=n.I)?void 0:e.root.getState()},ne={obj:n=>n===Object(n)&&!ne.arr(n)&&"function"!=typeof n,fun:n=>"function"==typeof n,str:n=>"string"==typeof n,num:n=>"number"==typeof n,boo:n=>"boolean"==typeof n,und:n=>void 0===n,arr:n=>Array.isArray(n),equ(n,e,{arrays:r="shallow",objects:t="reference",strict:l=!0}={}){if(typeof n!=typeof e||!!n!=!!e)return!1
if(ne.str(n)||ne.num(n)||ne.boo(n))return n===e
const u=ne.obj(n)
if(u&&"reference"===t)return n===e
const o=ne.arr(n)
if(o&&"reference"===r)return n===e
if((o||u)&&n===e)return!0
let i
for(i in n)if(!(i in e))return!1
if(u&&"shallow"===r&&"shallow"===t){for(i in l?e:n)if(!ne.equ(n[i],e[i],{strict:l,objects:"reference"}))return!1}else for(i in l?e:n)if(n[i]!==e[i])return!1
if(ne.und(i)){if(o&&0===n.length&&0===e.length)return!0
if(u&&0===Object.keys(n).length&&0===Object.keys(e).length)return!0
if(n!==e)return!1}return!0}},ee=/-\d+$/,re=n=>!(null==n||!n.render),te=_.createContext(null)
let le,ue,oe,ie=new Set,ae=new Set,ce=new Set
const fe=new Map,{invalidate:se,advance:ve}=function(n){function e(i){t=requestAnimationFrame(e),u=!0,r=0,y("before",i),o=!0
for(const e of n.values()){var a
l=e.store.getState(),!l.internal.active||!("always"===l.frameloop||l.internal.frames>0)||null!=(a=l.gl.xr)&&a.isPresenting||(r+=w(i,l))}if(o=!1,y("after",i),0===r)return y("tail",i),u=!1,cancelAnimationFrame(t)}let r,t,l,u=!1,o=!1
return{loop:e,invalidate:function r(t,l=1){var i
if(!t)return n.forEach(n=>r(n.store.getState(),l))
null!=(i=t.gl.xr)&&i.isPresenting||!t.internal.active||"never"===t.frameloop||(t.internal.frames=l>1?Math.min(60,t.internal.frames+l):o?2:1,u||(u=!0,requestAnimationFrame(e)))},advance:function(e,r=!0,t,l){if(r&&y("before",e),t)w(e,t,l)
else for(const u of n.values())w(e,u.store.getState())
r&&y("after",e)}}}(fe),{reconciler:de,applyProps:pe}=function(n,e){function r(n,{args:e=[],attach:r,...t},l){let o,i=`${n[0].toUpperCase()}${n.slice(1)}`
if("primitive"===n){if(void 0===t.object)throw new Error("R3F: Primitives without 'object' are invalid!")
o=u(t.object,{type:n,root:l,attach:r,primitive:!0})}else{const t=Hn[i]
if(!t)throw new Error(`R3F: ${i} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`)
if(!Array.isArray(e))throw new Error("R3F: The args prop must be an array!")
o=u(new t(...e),{type:n,root:l,attach:r,memoizedProps:{args:e}})}return void 0===o.I.attach&&(o.isBufferGeometry?o.I.attach="geometry":o.isMaterial&&(o.I.attach="material")),"inject"!==i&&f(o,t),o}function t(n,e){let r=!1
var t,l
e&&(null!=(t=e.I)&&t.attach?i(n,e,e.I.attach):e.isObject3D&&n.isObject3D&&(n.add(e),r=!0),r||null==(l=n.I)||l.objects.push(e),e.I||u(e,{}),e.I.parent=n,v(e),s(e))}function o(n,e,r){let t=!1
if(e){var l,o
if(null!=(l=e.I)&&l.attach)i(n,e,e.I.attach)
else if(e.isObject3D&&n.isObject3D){e.parent=n,e.dispatchEvent({type:"added"}),n.dispatchEvent({type:"childadded",child:e})
const l=n.children.filter(n=>n!==e),u=l.indexOf(r)
n.children=[...l.slice(0,u),e,...l.slice(u)],t=!0}t||(null==(o=n.I)?void 0:o.objects.push(e)),e.I||u(e,{}),e.I.parent=n,v(e),s(e)}}function d(n,e,r=!1){n&&[...n].forEach(n=>h(e,n,r))}function h(n,e,r){if(e){var t,u,o
if(e.I&&(e.I.parent=null),null!=(t=n.I)&&t.objects&&(n.I.objects=n.I.objects.filter(n=>n!==e)),null!=(u=e.I)&&u.attach)a(n,e,e.I.attach)
else if(e.isObject3D&&n.isObject3D){var i
n.remove(e),null!=(i=e.I)&&i.root&&function(n,e){const{internal:r}=n.getState()
r.interaction=r.interaction.filter(n=>n!==e),r.initialHits=r.initialHits.filter(n=>n!==e),r.hovered.forEach((n,t)=>{n.eventObject!==e&&n.object!==e||r.hovered.delete(t)}),r.capturedMap.forEach((n,t)=>{p(r.capturedMap,e,n,t)})}(l(e),e)}const f=null==(o=e.I)?void 0:o.primitive,v=!f&&(void 0===r?null!==e.dispose:r)
var c
if(f||(d(null==(c=e.I)?void 0:c.objects,e,v),d(e.children,e,v)),delete e.I,v&&e.dispose&&"Scene"!==e.type){const n=()=>{try{e.dispose()}catch(n){}}
"undefined"==typeof IS_REACT_ACT_ENVIRONMENT?Bn.unstable_scheduleCallback(Bn.unstable_IdlePriority,n):n()}s(n)}}const y=()=>{}
return{reconciler:Dn({createInstance:r,removeChild:h,appendChild:t,appendInitialChild:t,insertBefore:o,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(n,e)=>{if(!e)return
const r=n.getState().scene
r.I&&(r.I.root=n,t(r,e))},removeChildFromContainer:(n,e)=>{e&&h(n.getState().scene,e)},insertInContainerBefore:(n,e,r)=>{if(!e||!r)return
const t=n.getState().scene
t.I&&o(t,e,r)},getRootHostContext:()=>null,getChildHostContext:n=>n,finalizeInitialChildren(n){var e
const r=null!=(e=null==n?void 0:n.I)?e:{}
return Boolean(r.handlers)},prepareUpdate(n,e,r,t){var l
if((null!=(l=null==n?void 0:n.I)?l:{}).primitive&&t.object&&t.object!==n)return[!0]
{const{args:e=[],children:l,...u}=t,{args:o=[],children:i,...a}=r
if(!Array.isArray(e))throw new Error("R3F: the args prop must be an array!")
if(e.some((n,e)=>n!==o[e]))return[!0]
const f=c(n,u,a,!0)
return f.changes.length?[!1,f]:null}},commitUpdate(n,[e,u],o,i,a,c){e?!function(n,e,u,o){var i
const a=null==(i=n.I)?void 0:i.parent
if(!a)return
const c=r(e,u,n.I.root)
if(n.children){for(const e of n.children)e.I&&t(c,e)
n.children=n.children.filter(n=>!n.I)}n.I.objects.forEach(n=>t(c,n)),n.I.objects=[],n.I.autoRemovedBeforeAppend||h(a,n),c.parent&&(c.I.autoRemovedBeforeAppend=!0),t(a,c),c.raycast&&c.I.eventCount&&l(c).getState().internal.interaction.push(c),[o,o.alternate].forEach(n=>{null!==n&&(n.stateNode=c,n.ref&&("function"==typeof n.ref?n.ref(c):n.ref.current=c))})}(n,o,a,c):f(n,u)},commitMount(n,e,r,t){var u
const o=null!=(u=n.I)?u:{}
n.raycast&&o.handlers&&o.eventCount&&l(n).getState().internal.interaction.push(n)},getPublicInstance:n=>n,prepareForCommit:()=>null,preparePortalMount:n=>u(n.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(n){var e
const{attach:r,parent:t}=null!=(e=n.I)?e:{}
r&&t&&a(t,n,r),n.isObject3D&&(n.visible=!1),s(n)},unhideInstance(n,e){var r
const{attach:t,parent:l}=null!=(r=n.I)?r:{}
t&&l&&i(l,n,t),(n.isObject3D&&null==e.visible||e.visible)&&(n.visible=!0),s(n)},createTextInstance:y,hideTextInstance:y,unhideTextInstance:y,getCurrentEventPriority:()=>e?e():Cn.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:"undefined"!=typeof performance&&ne.fun(performance.now)?performance.now:ne.fun(Date.now)?Date.now:()=>0,scheduleTimeout:ne.fun(setTimeout)?setTimeout:void 0,cancelTimeout:ne.fun(clearTimeout)?clearTimeout:void 0}),applyProps:f}}(0,function(){var n
const e="undefined"!=typeof self&&self||"undefined"!=typeof window&&window
if(!e)return Cn.DefaultEventPriority
switch(null==(n=e.event)?void 0:n.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Cn.DiscreteEventPriority
case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Cn.ContinuousEventPriority
default:return Cn.DefaultEventPriority}}),he={objects:"shallow",strict:!1},ye=(n,e)=>{const r="function"==typeof n?n(e):n
return re(r)?r:new K({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...n})}
de.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:_.version})
const we={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]},be=["x","y","top","bottom","left","right","width","height"],me=(n,e)=>be.every(r=>n[r]===e[r]),ge=_.forwardRef(function({children:n,fallback:t,resize:l,style:u,gl:o,events:i=S,eventSource:a,eventPrefix:c,shadows:f,linear:s,flat:v,legacy:d,orthographic:p,frameloop:h,dpr:y,performance:w,raycaster:b,camera:m,scene:g,onPointerMissed:x,onCreated:C,...P},j){_.useMemo(()=>Un(on),[])
const z=un(),[T,R]=M({scroll:!0,debounce:{scroll:50,resize:0},...l}),I=_.useRef(null),O=_.useRef(null)
_.useImperativeHandle(j,()=>I.current)
const F=e(x),[D,A]=_.useState(!1),[N,B]=_.useState(!1)
if(D)throw D
if(N)throw N
const H=_.useRef(null)
Yn(()=>{const e=I.current
R.width>0&&R.height>0&&e&&(H.current||(H.current=k(e)),H.current.configure({gl:o,events:i,shadows:f,linear:s,flat:v,legacy:d,orthographic:p,frameloop:h,dpr:y,performance:w,raycaster:b,camera:m,scene:g,size:R,onPointerMissed:(...n)=>null==F.current?void 0:F.current(...n),onCreated:n=>{var e
null==n.events.connect?void 0:n.events.connect(a?(e=a)&&e.hasOwnProperty("current")?a.current:a:O.current),c&&n.setEvents({compute:(n,e)=>{const r=n[c+"X"],t=n[c+"Y"]
e.pointer.set(r/e.size.width*2-1,-t/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)}}),null==C||C(n)}}),H.current.render(L.jsx(z,{children:L.jsx(Jn,{set:B,children:L.jsx(_.Suspense,{fallback:L.jsx(r,{set:A}),children:null!=n?n:null})})})))}),_.useEffect(()=>{const n=I.current
if(n)return()=>E(n)},[])
const U=a?"none":"auto"
return L.jsx("div",{ref:O,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:U,...u},...P,children:L.jsx("div",{ref:T,style:{width:"100%",height:"100%"},children:L.jsx("canvas",{ref:I,style:{display:"block"},children:t})})})}),ke=_.forwardRef(function(n,e){return L.jsx(ln,{children:L.jsx(ge,{...n,ref:e})})}),xe=_.createContext(null),Ee=n=>(n.getAttributes()&wn.CONVOLUTION)===wn.CONVOLUTION,Se=an.memo(_.forwardRef(({children:n,camera:e,scene:r,resolutionScale:t,enabled:l=!0,renderPriority:u=1,autoClear:o=!0,depthBuffer:i,enableNormalPass:a,stencilBuffer:c,multisampling:f=8,frameBufferType:s=sn},v)=>{const{gl:d,scene:p,camera:h,size:y}=m(),w=r||p,b=e||h,[k,x,E]=_.useMemo(()=>{const n=cn(),e=new fn(d,{depthBuffer:i,stencilBuffer:c,multisampling:f>0&&n?f:0,frameBufferType:s})
e.addPass(new vn(w,b))
let r=null,l=null
return a&&(l=new dn(w,b),l.enabled=!1,e.addPass(l),void 0!==t&&n&&(r=new pn({normalBuffer:l.texture,resolutionScale:t}),r.enabled=!1,e.addPass(r))),[e,l,r]},[b,d,i,c,f,s,w,a,t])
_.useEffect(()=>null==k?void 0:k.setSize(y.width,y.height),[k,y]),g((n,e)=>{if(l){const n=d.autoClear
d.autoClear=o,c&&!o&&d.clearStencil(),k.render(e),d.autoClear=n}},l?u:0)
const S=_.useRef(null)
_.useLayoutEffect(()=>{var n
const e=[],r=null==(n=S.current)?void 0:n.I
if(r&&k){const n=r.objects
for(let r=0;r<n.length;r++){const t=n[r]
if(t instanceof hn){const l=[t]
if(!Ee(t)){let e=null
for(;(e=n[r+1])instanceof hn&&!Ee(e);)l.push(e),r++}const u=new yn(b,...l)
e.push(u)}else t instanceof bn&&e.push(t)}for(const r of e)null==k?void 0:k.addPass(r)
x&&(x.enabled=!0),E&&(E.enabled=!0)}return()=>{for(const n of e)null==k?void 0:k.removePass(n)
x&&(x.enabled=!1),E&&(E.enabled=!1)}},[k,n,b,x,E]),_.useEffect(()=>{const n=d.toneMapping
return d.toneMapping=Y,()=>{d.toneMapping=n}},[d])
const C=_.useMemo(()=>({composer:k,normalPass:x,downSamplingPass:E,resolutionScale:t,camera:b,scene:w}),[k,x,E,t,b,w])
return _.useImperativeHandle(v,()=>k,[k]),L.jsx(xe.Provider,{value:C,children:L.jsx("group",{ref:S,children:n})})}))
let Ce=0
const Me=new WeakMap
class Pe extends an.Component{constructor(n){super(n),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(n){return{hasError:!0}}componentDidCatch(n,e){void 0,this.setState({error:n,errorInfo:e}),window.gtag&&window.gtag("event","exception",{description:`ThreeJS Error: ${n.message}`,fatal:!1})}render(){if(this.state.hasError){const{fallback:n}=this.props
return n?L.jsx(n,{error:this.state.error}):L.jsx("div",{className:"threejs-error-fallback",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",backgroundSize:"20px 20px",animation:"threeJSFallback 3s ease-in-out infinite alternate",zIndex:-1},children:L.jsx("style",{children:"\n            @keyframes threeJSFallback {\n              0% { opacity: 0.8; filter: hue-rotate(0deg); }\n              100% { opacity: 0.6; filter: hue-rotate(10deg); }\n            }\n          "})})}return this.props.children}}const je=(ze=class extends hn{constructor(){const n=new Map([["colorNum",new mn(4)],["pixelSize",new mn(2)]])
super("RetroEffect","\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n",{uniforms:n}),this.uniforms=n}set colorNum(n){this.uniforms.get("colorNum").value=n}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(n){this.uniforms.get("pixelSize").value=n}get pixelSize(){return this.uniforms.get("pixelSize").value}},an.forwardRef(function({blendFunction:n,opacity:e,...r},t){let l=Me.get(ze)
if(!l){const n=`@react-three/postprocessing/${ze.name}-${Ce++}`
Un({[n]:ze}),Me.set(ze,l=n)}const u=m(n=>n.camera),o=an.useMemo(()=>{var n
return[...null!=(n=r.args)?n:[{...r}]]},[JSON.stringify(r)])
return L.jsx(l,{camera:u,"blendMode-blendFunction":n,"blendMode-opacity-value":e,...r,ref:t,args:o})}))
var ze
const Te=_.forwardRef((n,e)=>{const{colorNum:r,pixelSize:t}=n
return L.jsx(je,{ref:e,colorNum:r,pixelSize:t})})
Te.displayName="RetroEffect"
export{D as default}
