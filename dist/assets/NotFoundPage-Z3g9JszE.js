function n(){return Nn||(Nn=1,(n=$n).exports=function(n){function e(n,e,l,r){return new Rt(n,e,l,r)}function l(){}function r(n){var e="https://react.dev/errors/"+n
if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1])
for(var l=2;l<arguments.length;l++)e+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=du&&n[du]||n["@@iterator"])?n:null}function u(n){if(null==n)return null
if("function"==typeof n)return n.$$typeof===pu?null:n.displayName||n.name||null
if("string"==typeof n)return n
switch(n){case nu:return"Fragment"
case Zt:return"Portal"
case lu:return"Profiler"
case eu:return"StrictMode"
case iu:return"Suspense"
case au:return"SuspenseList"}if("object"==typeof n)switch(n.$$typeof){case uu:return(n.displayName||"Context")+".Provider"
case tu:return(n.l.displayName||"Context")+".Consumer"
case ou:var e=n.render
return(n=n.displayName)||(n=""!==(n=e.displayName||e.name||"")?"ForwardRef("+n+")":"ForwardRef"),n
case cu:return null!==(e=n.displayName||null)?e:u(n.type)||"Memo"
case fu:e=n.t,n=n.u
try{return u(n(e))}catch(l){}}return null}function o(n){if(void 0===Vt)try{throw Error()}catch(l){var e=l.stack.trim().match(/\n( *(at )?)/)
Vt=e&&e[1]||"",Wt=-1<l.stack.indexOf("\n    at")?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Vt+n+Wt}function i(n,e){if(!n||yu)return""
yu=!0
var l=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var r={DetermineComponentFrameRoot:function(){try{if(e){var l=function(){throw Error()}
if(Object.defineProperty(l.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(l,[])}catch(t){var r=t}Reflect.construct(n,[],l)}else{try{l.call()}catch(u){r=u}n.call(l.prototype)}}else{try{throw Error()}catch(o){r=o}(l=n())&&"function"==typeof l.catch&&l.catch(function(){})}}catch(i){if(i&&r&&"string"==typeof i.stack)return[i.stack,r.stack]}return[null,null]}}
r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var t=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name")
t&&t.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=r.DetermineComponentFrameRoot(),i=u[0],a=u[1]
if(i&&a){var c=i.split("\n"),f=a.split("\n")
for(t=r=0;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++
for(;t<f.length&&!f[t].includes("DetermineComponentFrameRoot");)t++
if(r===c.length||t===f.length)for(r=c.length-1,t=f.length-1;1<=r&&0<=t&&c[r]!==f[t];)t--
for(;1<=r&&0<=t;r--,t--)if(c[r]!==f[t]){if(1!==r||1!==t)do{if(r--,0>--t||c[r]!==f[t]){var s="\n"+c[r].replace(" at new "," at ")
return n.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",n.displayName)),s}}while(1<=r&&0<=t)
break}}}finally{yu=!1,Error.prepareStackTrace=l}return(l=n?n.displayName||n.name:"")?o(l):""}function a(n){switch(n.tag){case 26:case 27:case 5:return o(n.type)
case 16:return o("Lazy")
case 13:return o("Suspense")
case 19:return o("SuspenseList")
case 0:case 15:return i(n.type,!1)
case 11:return i(n.type.render,!1)
case 1:return i(n.type,!0)
default:return""}}function c(n){try{var e=""
do{e+=a(n),n=n.return}while(n)
return e}catch(l){return"\nError generating stack: "+l.message+"\n"+l.stack}}function f(n){var e=n,l=n
if(n.alternate)for(;e.return;)e=e.return
else{n=e
do{!!(4098&(e=n).flags)&&(l=e.return),n=e.return}while(n)}return 3===e.tag?l:null}function s(n){if(f(n)!==n)throw Error(r(188))}function v(n){var e=n.alternate
if(!e){if(null===(e=f(n)))throw Error(r(188))
return e!==n?null:n}for(var l=n,t=e;;){var u=l.return
if(null===u)break
var o=u.alternate
if(null===o){if(null!==(t=u.return)){l=t
continue}break}if(u.child===o.child){for(o=u.child;o;){if(o===l)return s(u),n
if(o===t)return s(u),e
o=o.sibling}throw Error(r(188))}if(l.return!==t.return)l=u,t=o
else{for(var i=!1,a=u.child;a;){if(a===l){i=!0,l=u,t=o
break}if(a===t){i=!0,t=u,l=o
break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===l){i=!0,l=o,t=u
break}if(a===t){i=!0,t=o,l=u
break}a=a.sibling}if(!i)throw Error(r(189))}}if(l.alternate!==t)throw Error(r(190))}if(3!==l.tag)throw Error(r(188))
return l.stateNode.current===l?n:e}function d(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(null!==(e=d(n)))return e
n=n.sibling}return null}function p(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(4!==n.tag&&null!==(e=p(n)))return e
n=n.sibling}return null}function h(n){return{current:n}}function y(n){0>Ei||(n.current=xi[Ei],xi[Ei]=null,Ei--)}function b(n,e){Ei++,xi[Ei]=n.current,n.current=e}function w(n){var e=42&n
if(0!==e)return e
switch(n&-n){case 1:return 1
case 2:return 2
case 4:return 4
case 8:return 8
case 16:return 16
case 32:return 32
case 64:return 64
case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194176&n
case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&n
case 67108864:return 67108864
case 134217728:return 134217728
case 268435456:return 268435456
case 536870912:return 536870912
case 1073741824:return 0
default:return n}}function m(n,e){var l=n.pendingLanes
if(0===l)return 0
var r=0,t=n.suspendedLanes,u=n.pingedLanes,o=n.warmLanes
n=0!==n.finishedLanes
var i=134217727&l
return 0!==i?0!==(l=i&~t)?r=w(l):0!==(u&=i)?r=w(u):n||0!==(o=i&~o)&&(r=w(o)):0!==(i=l&~t)?r=w(i):0!==u?r=w(u):n||0!==(o=l&~o)&&(r=w(o)),0===r?0:0!==e&&e!==r&&0===(e&t)&&((t=r&-r)>=(o=e&-e)||32===t&&4194176&o)?e:r}function k(n,e){return 0===(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&e)}function g(n,e){switch(n){case 1:case 2:case 4:case 8:return e+250
case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3
default:return-1}}function x(){var n=Pi
return!(4194176&(Pi<<=1))&&(Pi=128),n}function E(){var n=Ri
return!(62914560&(Ri<<=1))&&(Ri=4194304),n}function S(n){for(var e=[],l=0;31>l;l++)e.push(n)
return e}function C(n,e){n.pendingLanes|=e,268435456!==e&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function M(n,e,l){n.pendingLanes|=e,n.suspendedLanes&=~e
var r=31-Ci(e)
n.entangledLanes|=e,n.entanglements[r]=1073741824|n.entanglements[r]|4194218&l}function j(n,e){var l=n.entangledLanes|=e
for(n=n.entanglements;l;){var r=31-Ci(l),t=1<<r
t&e|n[r]&e&&(n[r]|=e),l&=~t}}function P(n){return 2<(n&=-n)?8<n?134217727&n?32:268435456:8:2}function R(n){if("function"==typeof Di&&Bi(n),qi&&"function"==typeof qi.setStrictMode)try{qi.setStrictMode(Hi,n)}catch(e){}}function T(n,e){if("object"==typeof n&&null!==n){var l=$i.get(n)
return void 0!==l?l:(e={value:n,source:e,stack:c(e)},$i.set(n,e),e)}return{value:n,source:e,stack:c(e)}}function I(n,e){Vi[Wi++]=Qi,Vi[Wi++]=Gi,Gi=n,Qi=e}function z(n,e,l){Yi[Ki++]=Ji,Yi[Ki++]=Zi,Yi[Ki++]=Xi,Xi=n
var r=Ji
n=Zi
var t=32-Ci(r)-1
r&=~(1<<t),l+=1
var u=32-Ci(e)+t
if(30<u){var o=t-t%5
u=(r&(1<<o)-1).toString(32),r>>=o,t-=o,Ji=1<<32-Ci(e)+t|l<<t|r,Zi=u+n}else Ji=1<<u|l<<t|r,Zi=n}function O(n){null!==n.return&&(I(n,1),z(n,1,0))}function F(n){for(;n===Gi;)Gi=Vi[--Wi],Vi[Wi]=null,Qi=Vi[--Wi],Vi[Wi]=null
for(;n===Xi;)Xi=Yi[--Ki],Yi[Ki]=null,Zi=Yi[--Ki],Yi[Ki]=null,Ji=Yi[--Ki],Yi[Ki]=null}function _(n,e){b(la,e),b(ea,n),b(na,null),n=xu(e),y(na),b(na,n)}function A(){y(na),y(ea),y(la)}function L(n){null!==n.memoizedState&&b(ra,n)
var e=na.current,l=Eu(e,n.type)
e!==l&&(b(ea,n),b(na,l))}function N(n){ea.current===n&&(y(na),y(ea)),ra.current===n&&(y(ra),Fu?Xu.o=Ku:Xu.i=Ku)}function D(n){throw $(T(Error(r(418,"")),n)),ca}function B(n,e){if(!Lu)throw Error(r(175))
Vo(n.stateNode,n.type,n.memoizedProps,e,n)||D(n)}function H(n){for(ta=n.return;ta;)switch(ta.tag){case 3:case 27:return aa=!0,void 0
case 5:case 13:return aa=!1,void 0
default:ta=ta.return}}function q(n){if(!Lu||n!==ta)return!1
if(!oa)return H(n),oa=!0,!1
var e=!1
if(yi?3!==n.tag&&27!==n.tag&&(5!==n.tag||Zo(n.type)&&!Ru(n.type,n.memoizedProps))&&(e=!0):3!==n.tag&&(5!==n.tag||Zo(n.type)&&!Ru(n.type,n.memoizedProps))&&(e=!0),e&&ua&&D(n),H(n),13===n.tag){if(!Lu)throw Error(r(316))
if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(r(317))
ua=Qo(n)}else ua=ta?No(n.stateNode):null
return!0}function U(){Lu&&(ua=ta=null,oa=!1)}function $(n){null===ia?ia=[n]:ia.push(n)}function V(){for(var n=sa,e=va=sa=0;e<n;){var l=fa[e]
fa[e++]=null
var r=fa[e]
fa[e++]=null
var t=fa[e]
fa[e++]=null
var u=fa[e]
if(fa[e++]=null,null!==r&&null!==t){var o=r.pending
null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t}0!==u&&K(l,t,u)}}function W(n,e,l,r){fa[sa++]=n,fa[sa++]=e,fa[sa++]=l,fa[sa++]=r,va|=r,n.lanes|=r,null!==(n=n.alternate)&&(n.lanes|=r)}function Q(n,e,l,r){return W(n,e,l,r),X(n)}function Y(n,e){return W(n,null,null,e),X(n)}function K(n,e,l){n.lanes|=l
var r=n.alternate
null!==r&&(r.lanes|=l)
for(var t=!1,u=n.return;null!==u;)u.childLanes|=l,null!==(r=u.alternate)&&(r.childLanes|=l),22===u.tag&&(null===(n=u.stateNode)||1&n.v||(t=!0)),n=u,u=u.return
t&&null!==e&&3===n.tag&&(u=n.stateNode,t=31-Ci(l),null===(n=(u=u.hiddenUpdates)[t])?u[t]=[e]:n.push(e),e.lane=536870912|l)}function X(n){if(50<af)throw af=0,cf=null,Error(r(185))
for(var e=n.return;null!==e;)e=(n=e).return
return 3===n.tag?n.stateNode:null}function J(n){var e
n!==pa&&null===n.next&&(null===pa?da=pa=n:pa=pa.next=n),ya=!0,ha||(ha=!0,e=nn,Zu?no(function(){6&Oc?Ti(_i,e):e()}):Ti(_i,e))}function Z(n,e){if(!ba&&ya){ba=!0
do{for(var l=!1,r=da;null!==r;){if(0!==n){var t=r.pendingLanes
if(0===t)var u=0
else{var o=r.suspendedLanes,i=r.pingedLanes
u=(1<<31-Ci(42|n)+1)-1,u=201326677&(u&=t&~(o&~i))?201326677&u|1:u?2|u:0}0!==u&&(l=!0,rn(r,u))}else u=Ac,!(3&(u=m(r,r===Fc?u:0)))||k(r,u)||(l=!0,rn(r,u))
r=r.next}}while(l)
ba=!1}}function nn(){ya=ha=!1
var n=0
0!==wa&&(Uu()&&(n=wa),wa=0)
for(var e=Fi(),l=null,r=da;null!==r;){var t=r.next,u=en(r,e)
0===u?(r.next=null,null===l?da=t:l.next=t,null===t&&(pa=l)):(l=r,(0!==n||3&u)&&(ya=!0)),r=t}Z(n)}function en(n,e){for(var l=n.suspendedLanes,r=n.pingedLanes,t=n.expirationTimes,u=-62914561&n.pendingLanes;0<u;){var o=31-Ci(u),i=1<<o,a=t[o];-1===a?0!==(i&l)&&0===(i&r)||(t[o]=g(i,e)):a<=e&&(n.expiredLanes|=i),u&=~i}if(l=Ac,l=m(n,n===(e=Fc)?l:0),r=n.callbackNode,0===l||n===e&&2===Lc||null!==n.cancelPendingCommit)return null!==r&&null!==r&&Ii(r),n.callbackNode=null,n.callbackPriority=0
if(!(3&l)||k(n,l)){if((e=l&-l)===n.callbackPriority)return e
switch(null!==r&&Ii(r),P(l)){case 2:case 8:l=Ai
break
case 32:default:l=Li
break
case 268435456:l=Ni}return r=ln.bind(null,n),l=Ti(l,r),n.callbackPriority=e,n.callbackNode=l,e}return null!==r&&null!==r&&Ii(r),n.callbackPriority=2,n.callbackNode=null,2}function ln(n,e){var l=n.callbackNode
if(gt()&&n.callbackNode!==l)return null
var r=Ac
return 0===(r=m(n,n===Fc?r:0))?null:(Jr(n,r,e),en(n,Fi()),null!=n.callbackNode&&n.callbackNode===l?ln.bind(null,n):null)}function rn(n,e){if(gt())return null
Jr(n,e,!0)}function tn(){return 0===wa&&(wa=x()),wa}function un(){if(0===--ka&&null!==ma){null!==xa&&(xa.status="fulfilled")
var n=ma
ma=null,ga=0,xa=null
for(var e=0;e<n.length;e++)(0,n[e])()}}function on(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function an(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function cn(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function fn(n,e,l){var r=n.updateQueue
if(null===r)return null
if(r=r.shared,2&Oc){var t=r.pending
return null===t?e.next=e:(e.next=t.next,t.next=e),r.pending=e,e=X(n),K(n,null,l),e}return W(n,r,e,l),X(n)}function sn(n,e,l){if(null!==(e=e.updateQueue)&&(e=e.shared,4194176&l)){var r=e.lanes
l|=r&=n.pendingLanes,e.lanes=l,j(n,l)}}function vn(n,e){var l=n.updateQueue,r=n.alternate
if(null!==r&&l===(r=r.updateQueue)){var t=null,u=null
if(null!==(l=l.firstBaseUpdate)){do{var o={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null}
null===u?t=u=o:u=u.next=o,l=l.next}while(null!==l)
null===u?t=u=e:u=u.next=e}else t=u=e
return l={baseState:r.baseState,firstBaseUpdate:t,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},n.updateQueue=l,void 0}null===(n=l.lastBaseUpdate)?l.firstBaseUpdate=e:n.next=e,l.lastBaseUpdate=e}function dn(){if(Sa&&null!==xa)throw xa}function pn(n,e,l,r){Sa=!1
var t=n.updateQueue
Ea=!1
var u=t.firstBaseUpdate,o=t.lastBaseUpdate,i=t.shared.pending
if(null!==i){t.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var f=n.alternate
null!==f&&(i=(f=f.updateQueue).lastBaseUpdate)!==o&&(null===i?f.firstBaseUpdate=c:i.next=c,f.lastBaseUpdate=a)}if(null!==u){var s=t.baseState
for(o=0,f=c=a=null,i=u;;){var v=-536870913&i.lane,d=v!==i.lane
if(d?(Ac&v)===v:(r&v)===v){0!==v&&v===ga&&(Sa=!0),null!==f&&(f=f.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null})
n:{var p=n,h=i
v=e
var y=l
switch(h.tag){case 1:if("function"==typeof(p=h.payload)){s=p.call(y,s,v)
break n}s=p
break n
case 3:p.flags=-65537&p.flags|128
case 0:if(null==(v="function"==typeof(p=h.payload)?p.call(y,s,v):p))break n
s=Kt({},s,v)
break n
case 2:Ea=!0}}null!==(v=i.callback)&&(n.flags|=64,d&&(n.flags|=8192),null===(d=t.callbacks)?t.callbacks=[v]:d.push(v))}else d={lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===f?(c=f=d,a=s):f=f.next=d,o|=v
if(null===(i=i.next)){if(null===(i=t.shared.pending))break
i=(d=i).next,d.next=null,t.lastBaseUpdate=d,t.shared.pending=null}1}null===f&&(a=s),t.baseState=a,t.firstBaseUpdate=c,t.lastBaseUpdate=f,null===u&&(t.shared.lanes=0),$c|=o,n.lanes=o,n.memoizedState=s}}function hn(n,e){if("function"!=typeof n)throw Error(r(191,n))
n.call(e)}function yn(n,e){var l=n.callbacks
if(null!==l)for(n.callbacks=null,n=0;n<l.length;n++)hn(l[n],e)}function bn(n,e){if(Ui(n,e))return!0
if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1
var l=Object.keys(n),r=Object.keys(e)
if(l.length!==r.length)return!1
for(r=0;r<l.length;r++){var t=l[r]
if(!Ca.call(e,t)||!Ui(n[t],e[t]))return!1}return!0}function wn(n){return"fulfilled"===(n=n.status)||"rejected"===n}function mn(){}function kn(n,e,l){switch(void 0===(l=n[l])?n.push(e):l!==e&&(e.then(mn,mn),e=l),e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ma)throw Error(r(483))
throw n
default:if("string"==typeof e.status)e.then(mn,mn)
else{if(null!==(n=Fc)&&100<n.shellSuspendCounter)throw Error(r(482));(n=e).status="pending",n.then(function(n){if("pending"===e.status){var l=e
l.status="fulfilled",l.value=n}},function(n){if("pending"===e.status){var l=e
l.status="rejected",l.reason=n}})}switch(e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ma)throw Error(r(483))
throw n}throw Ra=e,Ma}}function gn(){if(null===Ra)throw Error(r(459))
var n=Ra
return Ra=null,n}function xn(n){var e=Ia
return Ia+=1,null===Ta&&(Ta=[]),kn(Ta,n,e)}function En(n,e){e=e.props.ref,n.ref=void 0!==e?e:null}function Sn(n,e){if(e.$$typeof===Xt)throw Error(r(525))
throw n=Object.prototype.toString.call(e),Error(r(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Cn(n){return(0,n.u)(n.t)}function Mn(n){function l(e,l){if(n){var r=e.deletions
null===r?(e.deletions=[l],e.flags|=16):r.push(l)}}function u(e,r){if(!n)return null
for(;null!==r;)l(e,r),r=r.sibling
return null}function o(n){for(var e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function i(n,e){return(n=It(n,e)).index=0,n.sibling=null,n}function a(e,l,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<l?(e.flags|=33554434,l):r:(e.flags|=33554434,l):(e.flags|=1048576,l)}function c(e){return n&&null===e.alternate&&(e.flags|=33554434),e}function f(n,e,l,r){return null===e||6!==e.tag?((e=At(l,n.mode,r)).return=n,e):((e=i(e,l)).return=n,e)}function s(n,e,l,r){var t=l.type
return t===nu?d(n,e,l.props.children,r,l.key):null!==e&&(e.elementType===t||"object"==typeof t&&null!==t&&t.$$typeof===fu&&Cn(t)===e.type)?(En(e=i(e,l.props),l),e.return=n,e):(En(e=Ot(l.type,l.key,l.props,null,n.mode,r),l),e.return=n,e)}function v(n,e,l,r){return null===e||4!==e.tag||e.stateNode.containerInfo!==l.containerInfo||e.stateNode.implementation!==l.implementation?((e=Lt(l,n.mode,r)).return=n,e):((e=i(e,l.children||[])).return=n,e)}function d(n,e,l,r,t){return null===e||7!==e.tag?((e=Ft(l,n.mode,r,t)).return=n,e):((e=i(e,l)).return=n,e)}function p(n,e,l){if("string"==typeof e&&""!==e||"number"==typeof e||"bigint"==typeof e)return(e=At(""+e,n.mode,l)).return=n,e
if("object"==typeof e&&null!==e){switch(e.$$typeof){case Jt:return En(l=Ot(e.type,e.key,e.props,null,n.mode,l),e),l.return=n,l
case Zt:return(e=Lt(e,n.mode,l)).return=n,e
case fu:return p(n,e=(0,e.u)(e.t),l)}if(bu(e)||t(e))return(e=Ft(e,n.mode,l,null)).return=n,e
if("function"==typeof e.then)return p(n,xn(e),l)
if(e.$$typeof===uu)return p(n,Nl(n,e),l)
Sn(n,e)}return null}function h(n,e,l,r){var u=null!==e?e.key:null
if("string"==typeof l&&""!==l||"number"==typeof l||"bigint"==typeof l)return null!==u?null:f(n,e,""+l,r)
if("object"==typeof l&&null!==l){switch(l.$$typeof){case Jt:return l.key===u?s(n,e,l,r):null
case Zt:return l.key===u?v(n,e,l,r):null
case fu:return h(n,e,l=(u=l.u)(l.t),r)}if(bu(l)||t(l))return null!==u?null:d(n,e,l,r,null)
if("function"==typeof l.then)return h(n,e,xn(l),r)
if(l.$$typeof===uu)return h(n,e,Nl(n,l),r)
Sn(n,l)}return null}function y(n,e,l,r,u){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return f(e,n=n.get(l)||null,""+r,u)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case Jt:return s(e,n=n.get(null===r.key?l:r.key)||null,r,u)
case Zt:return v(e,n=n.get(null===r.key?l:r.key)||null,r,u)
case fu:return y(n,e,l,r=(0,r.u)(r.t),u)}if(bu(r)||t(r))return d(e,n=n.get(l)||null,r,u,null)
if("function"==typeof r.then)return y(n,e,l,xn(r),u)
if(r.$$typeof===uu)return y(n,e,l,Nl(e,r),u)
Sn(e,r)}return null}function b(e,f,s,v){if("object"==typeof s&&null!==s&&s.type===nu&&null===s.key&&(s=s.props.children),"object"==typeof s&&null!==s){switch(s.$$typeof){case Jt:n:{for(var d=s.key;null!==f;){if(f.key===d){if((d=s.type)===nu){if(7===f.tag){u(e,f.sibling),(v=i(f,s.props.children)).return=e,e=v
break n}}else if(f.elementType===d||"object"==typeof d&&null!==d&&d.$$typeof===fu&&Cn(d)===f.type){u(e,f.sibling),En(v=i(f,s.props),s),v.return=e,e=v
break n}u(e,f)
break}l(e,f),f=f.sibling}s.type===nu?((v=Ft(s.props.children,e.mode,v,s.key)).return=e,e=v):(En(v=Ot(s.type,s.key,s.props,null,e.mode,v),s),v.return=e,e=v)}return c(e)
case Zt:n:{for(d=s.key;null!==f;){if(f.key===d){if(4===f.tag&&f.stateNode.containerInfo===s.containerInfo&&f.stateNode.implementation===s.implementation){u(e,f.sibling),(v=i(f,s.children||[])).return=e,e=v
break n}u(e,f)
break}l(e,f),f=f.sibling}(v=Lt(s,e.mode,v)).return=e,e=v}return c(e)
case fu:return b(e,f,s=(d=s.u)(s.t),v)}if(bu(s))return function(e,r,t,i){for(var c=null,f=null,s=r,v=r=0,d=null;null!==s&&v<t.length;v++){s.index>v?(d=s,s=null):d=s.sibling
var b=h(e,s,t[v],i)
if(null===b){null===s&&(s=d)
break}n&&s&&null===b.alternate&&l(e,s),r=a(b,r,v),null===f?c=b:f.sibling=b,f=b,s=d}if(v===t.length)return u(e,s),oa&&I(e,v),c
if(null===s){for(;v<t.length;v++)null!==(s=p(e,t[v],i))&&(r=a(s,r,v),null===f?c=s:f.sibling=s,f=s)
return oa&&I(e,v),c}for(s=o(s);v<t.length;v++)null!==(d=y(s,e,v,t[v],i))&&(n&&null!==d.alternate&&s.delete(null===d.key?v:d.key),r=a(d,r,v),null===f?c=d:f.sibling=d,f=d)
return n&&s.forEach(function(n){return l(e,n)}),oa&&I(e,v),c}(e,f,s,v)
if(t(s)){if("function"!=typeof(d=t(s)))throw Error(r(150))
return function(e,t,i,c){if(null==i)throw Error(r(151))
for(var f=null,s=null,v=t,d=t=0,b=null,w=i.next();null!==v&&!w.done;d++,w=i.next()){v.index>d?(b=v,v=null):b=v.sibling
var m=h(e,v,w.value,c)
if(null===m){null===v&&(v=b)
break}n&&v&&null===m.alternate&&l(e,v),t=a(m,t,d),null===s?f=m:s.sibling=m,s=m,v=b}if(w.done)return u(e,v),oa&&I(e,d),f
if(null===v){for(;!w.done;d++,w=i.next())null!==(w=p(e,w.value,c))&&(t=a(w,t,d),null===s?f=w:s.sibling=w,s=w)
return oa&&I(e,d),f}for(v=o(v);!w.done;d++,w=i.next())null!==(w=y(v,e,d,w.value,c))&&(n&&null!==w.alternate&&v.delete(null===w.key?d:w.key),t=a(w,t,d),null===s?f=w:s.sibling=w,s=w)
return n&&v.forEach(function(n){return l(e,n)}),oa&&I(e,d),f}(e,f,s=d.call(s),v)}if("function"==typeof s.then)return b(e,f,xn(s),v)
if(s.$$typeof===uu)return b(e,f,Nl(e,s),v)
Sn(e,s)}return"string"==typeof s&&""!==s||"number"==typeof s||"bigint"==typeof s?(s=""+s,null!==f&&6===f.tag?(u(e,f.sibling),(v=i(f,s)).return=e,e=v):(u(e,f),(v=At(s,e.mode,v)).return=e,e=v),c(e)):u(e,f)}return function(n,l,r,t){try{Ia=0
var u=b(n,l,r,t)
return Ta=null,u}catch(i){if(i===Ma)throw i
var o=e(29,i,null,n.mode)
return o.lanes=t,o.return=n,o}}}function jn(n,e){b(_a,n=qc),b(Fa,e),qc=n|e.baseLanes}function Pn(){b(_a,qc),b(Fa,Fa.current)}function Rn(){qc=_a.current,y(Fa),y(_a)}function Tn(n){var e=n.alternate
b(Na,1&Na.current),b(Aa,n),null===La&&(null===e||null!==Fa.current||null!==e.memoizedState)&&(La=n)}function In(n){if(22===n.tag){if(b(Na,Na.current),b(Aa,n),null===La){var e=n.alternate
null!==e&&null!==e.memoizedState&&(La=n)}}else zn()}function zn(){b(Na,Na.current),b(Aa,Aa.current)}function On(n){y(Aa),La===n&&(La=null),y(Na)}function Fn(n){for(var e=n;null!==e;){if(13===e.tag){var l=e.memoizedState
if(null!==l&&(null===(l=l.dehydrated)||zo(l)||Oo(l)))return e}else if(19===e.tag&&void 0!==e.memoizedProps.revealOrder){if(128&e.flags)return e}else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return null
e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function _n(){throw Error(r(321))}function Nn(n,e){if(null===e)return!1
for(var l=0;l<e.length&&l<n.length;l++)if(!Ui(n[l],e[l]))return!1
return!0}function Dn(n,e,l,r,t,u){return Da=u,Ba=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,hu.H=null===n||null===n.memoizedState?Ja:Za,Va=!1,u=l(r,t),Va=!1,$a&&(u=Hn(e,l,r,t)),Bn(n),u}function Bn(n){hu.H=Xa
var e=null!==Ha&&null!==Ha.next
if(Da=0,qa=Ha=Ba=null,Ua=!1,Ga=0,Qa=null,e)throw Error(r(300))
null===n||tc||null!==(n=n.dependencies)&&_l(n)&&(tc=!0)}function Hn(n,e,l,t){Ba=n
var u=0
do{if($a&&(Qa=null),Ga=0,$a=!1,25<=u)throw Error(r(301))
if(u+=1,qa=Ha=null,null!=n.updateQueue){var o=n.updateQueue
o.lastEffect=null,o.events=null,o.stores=null,null!=o.memoCache&&(o.memoCache.index=0)}hu.H=nc,o=e(l,t)}while($a)
return o}function qn(){var n=hu.H,e=n.useState()[0]
return e="function"==typeof e.then?Kn(e):e,n=n.useState()[0],(null!==Ha?Ha.memoizedState:null)!==n&&(Ba.flags|=1024),e}function Un(){var n=0!==Wa
return Wa=0,n}function $n(n,e,l){e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l}function Gn(n){if(Ua){for(n=n.memoizedState;null!==n;){var e=n.queue
null!==e&&(e.pending=null),n=n.next}Ua=!1}Da=0,qa=Ha=Ba=null,$a=!1,Ga=Wa=0,Qa=null}function Qn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===qa?Ba.memoizedState=qa=n:qa=qa.next=n,qa}function Yn(){if(null===Ha){var n=Ba.alternate
n=null!==n?n.memoizedState:null}else n=Ha.next
var e=null===qa?Ba.memoizedState:qa.next
if(null!==e)qa=e,Ha=n
else{if(null===n){if(null===Ba.alternate)throw Error(r(467))
throw Error(r(310))}n={memoizedState:(Ha=n).memoizedState,baseState:Ha.baseState,baseQueue:Ha.baseQueue,queue:Ha.queue,next:null},null===qa?Ba.memoizedState=qa=n:qa=qa.next=n}return qa}function Kn(n){var e=Ga
return Ga+=1,null===Qa&&(Qa=[]),n=kn(Qa,n,e),e=Ba,null===(null===qa?e.memoizedState:qa.next)&&(e=e.alternate,hu.H=null===e||null===e.memoizedState?Ja:Za),n}function Xn(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return Kn(n)
if(n.$$typeof===uu)return Ll(n)}throw Error(r(438,String(n)))}function Jn(n){var e=null,l=Ba.updateQueue
if(null!==l&&(e=l.memoCache),null==e){var r=Ba.alternate
null!==r&&null!==(r=r.updateQueue)&&null!=(r=r.memoCache)&&(e={data:r.data.map(function(n){return n.slice()}),index:0})}if(null==e&&(e={data:[],index:0}),null===l&&(l=Ka(),Ba.updateQueue=l),l.memoCache=e,void 0===(l=e.data[e.index]))for(l=e.data[e.index]=Array(n),r=0;r<n;r++)l[r]=vu
return e.index++,l}function Zn(n,e){return"function"==typeof e?e(n):e}function ne(n){return ee(Yn(),Ha,n)}function ee(n,e,l){var t=n.queue
if(null===t)throw Error(r(311))
t.lastRenderedReducer=l
var u=n.baseQueue,o=t.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}e.baseQueue=u=o,t.pending=null}if(o=n.baseState,null===u)n.memoizedState=o
else{var a=i=null,c=null,f=e=u.next,s=!1
do{var v=-536870913&f.lane
if(v!==f.lane?(Ac&v)===v:(Da&v)===v){var d=f.revertLane
if(0===d)null!==c&&(c=c.next={lane:0,revertLane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),v===ga&&(s=!0)
else{if((Da&d)===d){f=f.next,d===ga&&(s=!0)
continue}v={lane:0,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=v,i=o):c=c.next=v,Ba.lanes|=d,$c|=d}v=f.action,Va&&l(o,v),o=f.hasEagerState?f.eagerState:l(o,v)}else d={lane:v,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=d,i=o):c=c.next=d,Ba.lanes|=v,$c|=v
f=f.next}while(null!==f&&f!==e)
if(null===c?i=o:c.next=a,!Ui(o,n.memoizedState)&&(tc=!0,s&&null!==(l=xa)))throw l
n.memoizedState=o,n.baseState=i,n.baseQueue=c,t.lastRenderedState=o}return null===u&&(t.lanes=0),[n.memoizedState,t.dispatch]}function le(n){var e=Yn(),l=e.queue
if(null===l)throw Error(r(311))
l.lastRenderedReducer=n
var t=l.dispatch,u=l.pending,o=e.memoizedState
if(null!==u){l.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
Ui(o,e.memoizedState)||(tc=!0),e.memoizedState=o,null===e.baseQueue&&(e.baseState=o),l.lastRenderedState=o}return[o,t]}function re(n,e,l){var t=Ba,u=Yn(),o=oa
if(o){if(void 0===l)throw Error(r(407))
l=l()}else l=e()
var i=!Ui((Ha||u).memoizedState,l)
if(i&&(u.memoizedState=l,tc=!0),u=u.queue,Pe(oe.bind(null,t,u,n),[n]),u.getSnapshot!==e||i||null!==qa&&1&qa.memoizedState.tag){if(t.flags|=2048,Ee(9,ue.bind(null,t,u,l,e),{destroy:void 0},null),null===Fc)throw Error(r(349))
o||60&Da||te(t,e,l)}return l}function te(n,e,l){n.flags|=16384,n={getSnapshot:e,value:l},null===(e=Ba.updateQueue)?(e=Ka(),Ba.updateQueue=e,e.stores=[n]):null===(l=e.stores)?e.stores=[n]:l.push(n)}function ue(n,e,l,r){e.value=l,e.getSnapshot=r,ie(e)&&ae(n)}function oe(n,e,l){return l(function(){ie(e)&&ae(n)})}function ie(n){var e=n.getSnapshot
n=n.value
try{var l=e()
return!Ui(n,l)}catch(r){return!0}}function ae(n){var e=Y(n,2)
null!==e&&Xr(e,0,2)}function ce(n){var e=Qn()
if("function"==typeof n){var l=n
if(n=l(),Va){R(!0)
try{l()}finally{R(!1)}}}return e.memoizedState=e.baseState=n,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:n},e}function fe(n,e,l,r){return n.baseState=l,ee(n,Ha,"function"==typeof r?r:Zn)}function se(n,e,l,t,u){if(Ye(n))throw Error(r(485))
if(null!==(n=e.action)){var o={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){o.listeners.push(n)}}
null!==hu.T?l(!0):o.isTransition=!1,t(o),null===(l=e.pending)?(o.next=e.pending=o,ve(e,o)):(o.next=l.next,e.pending=l.next=o)}}function ve(n,e){var l=e.action,r=e.payload,t=n.state
if(e.isTransition){var u=hu.T,o={}
hu.T=o
try{var i=l(t,r),a=hu.S
null!==a&&a(o,i),de(n,e,i)}catch(c){he(n,e,c)}finally{hu.T=u}}else try{de(n,e,u=l(t,r))}catch(f){he(n,e,f)}}function de(n,e,l){null!==l&&"object"==typeof l&&"function"==typeof l.then?l.then(function(l){pe(n,e,l)},function(l){return he(n,e,l)}):pe(n,e,l)}function pe(n,e,l){e.status="fulfilled",e.value=l,ye(e),n.state=l,null!==(e=n.pending)&&((l=e.next)===e?n.pending=null:(l=l.next,e.next=l,ve(n,l)))}function he(n,e,l){var r=n.pending
if(n.pending=null,null!==r){r=r.next
do{e.status="rejected",e.reason=l,ye(e),e=e.next}while(e!==r)}n.action=null}function ye(n){n=n.listeners
for(var e=0;e<n.length;e++)(0,n[e])()}function be(n,e){return e}function we(n,e){if(oa){var l=Fc.formState
if(null!==l){n:{var r=Ba
if(oa){if(ua){var t=Ao(ua,aa)
if(t){ua=No(t),r=Lo(t)
break n}}D(r)}r=!1}r&&(e=l[0])}}(l=Qn()).memoizedState=l.baseState=e,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:be,lastRenderedState:e},l.queue=r,l=We.bind(null,Ba,r),r.dispatch=l,r=ce(!1)
var u=Qe.bind(null,Ba,!1,r.queue)
return t={state:e,dispatch:null,action:n,pending:null},(r=Qn()).queue=t,l=se.bind(null,Ba,t,u,l),t.dispatch=l,r.memoizedState=n,[e,l,!1]}function me(n){return ke(Yn(),Ha,n)}function ke(n,e,l){e=ee(n,e,be)[0],n=ne(Zn)[0],e="object"==typeof e&&null!==e&&"function"==typeof e.then?Kn(e):e
var r=Yn(),t=r.queue,u=t.dispatch
return l!==r.memoizedState&&(Ba.flags|=2048,Ee(9,ge.bind(null,t,l),{destroy:void 0},null)),[e,u,n]}function ge(n,e){n.action=e}function xe(n){var e=Yn(),l=Ha
if(null!==l)return ke(e,l,n)
Yn(),e=e.memoizedState
var r=(l=Yn()).queue.dispatch
return l.memoizedState=n,[e,r,!1]}function Ee(n,e,l,r){return n={tag:n,create:e,inst:l,deps:r,next:null},null===(e=Ba.updateQueue)&&(e=Ka(),Ba.updateQueue=e),null===(l=e.lastEffect)?e.lastEffect=n.next=n:(r=l.next,l.next=n,n.next=r,e.lastEffect=n),n}function Se(){return Yn().memoizedState}function Ce(n,e,l,r){var t=Qn()
Ba.flags|=n,t.memoizedState=Ee(1|e,l,{destroy:void 0},void 0===r?null:r)}function Me(n,e,l,r){var t=Yn()
r=void 0===r?null:r
var u=t.memoizedState.inst
null!==Ha&&null!==r&&Nn(r,Ha.memoizedState.deps)?t.memoizedState=Ee(e,l,u,r):(Ba.flags|=n,t.memoizedState=Ee(1|e,l,u,r))}function je(n,e){Ce(8390656,8,n,e)}function Pe(n,e){Me(2048,8,n,e)}function Re(n,e){return Me(4,2,n,e)}function Te(n,e){return Me(4,4,n,e)}function Ie(n,e){if("function"==typeof e){n=n()
var l=e(n)
return function(){"function"==typeof l?l():e(null)}}if(null!=e)return n=n(),e.current=n,function(){e.current=null}}function ze(n,e,l){l=null!=l?l.concat([n]):null,Me(4,4,Ie.bind(null,e,n),l)}function Oe(){}function Fe(n,e){var l=Yn()
e=void 0===e?null:e
var r=l.memoizedState
return null!==e&&Nn(e,r[1])?r[0]:(l.memoizedState=[n,e],n)}function _e(n,e){var l=Yn()
e=void 0===e?null:e
var r=l.memoizedState
if(null!==e&&Nn(e,r[1]))return r[0]
if(r=n(),Va){R(!0)
try{n()}finally{R(!1)}}return l.memoizedState=[r,e],r}function Ae(n,e,l){return void 0===l||1073741824&Da?n.memoizedState=e:(n.memoizedState=l,n=Kr(),Ba.lanes|=n,$c|=n,l)}function Le(n,e,l,r){return Ui(l,e)?l:null!==Fa.current?(n=Ae(n,l,r),Ui(n,e)||(tc=!0),n):42&Da?(n=Kr(),Ba.lanes|=n,$c|=n,e):(tc=!0,n.memoizedState=l)}function Ne(n,e,l,r,t){var u=Hu()
Bu(0!==u&&8>u?u:8)
var o=hu.T,i={}
hu.T=i,Qe(n,!1,e,l)
try{var a=t(),c=hu.S
null!==c&&c(i,a),null!==a&&"object"==typeof a&&"function"==typeof a.then?Ge(n,e,function(n,e){var l=[],r={status:"pending",value:null,reason:null,then:function(n){l.push(n)}}
return n.then(function(){r.status="fulfilled",r.value=e
for(var n=0;n<l.length;n++)(0,l[n])(e)},function(n){for(r.status="rejected",r.reason=n,n=0;n<l.length;n++)(0,l[n])(void 0)}),r}(a,r),Yr()):Ge(n,e,r,Yr())}catch(f){Ge(n,e,{then:function(){},status:"rejected",reason:f},Yr())}finally{Bu(u),hu.T=o}}function De(n){var e=n.memoizedState
if(null!==e)return e
var l={}
return(e={memoizedState:Ku,baseState:Ku,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:Ku},next:null}).next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:l},next:null},n.memoizedState=e,null!==(n=n.alternate)&&(n.memoizedState=e),e}function Be(){return Ll(Xu)}function He(){return Yn().memoizedState}function qe(){return Yn().memoizedState}function $e(n){for(var e=n.return;null!==e;){switch(e.tag){case 24:case 3:var l=Yr(),r=fn(e,n=cn(l),l)
return null!==r&&(Xr(r,0,l),sn(r,e,l)),e={cache:Bl()},n.payload=e,void 0}e=e.return}}function Ve(n,e,l){var r=Yr()
l={lane:r,revertLane:0,action:l,hasEagerState:!1,eagerState:null,next:null},Ye(n)?Ke(e,l):null!==(l=Q(n,e,l,r))&&(Xr(l,0,r),Xe(l,e,r))}function We(n,e,l){Ge(n,e,l,Yr())}function Ge(n,e,l,r){var t={lane:r,revertLane:0,action:l,hasEagerState:!1,eagerState:null,next:null}
if(Ye(n))Ke(e,t)
else{var u=n.alternate
if(0===n.lanes&&(null===u||0===u.lanes)&&null!==(u=e.lastRenderedReducer))try{var o=e.lastRenderedState,i=u(o,l)
if(t.hasEagerState=!0,t.eagerState=i,Ui(i,o))return W(n,e,t,0),null===Fc&&V(),!1}catch(a){}if(null!==(l=Q(n,e,t,r)))return Xr(l,0,r),Xe(l,e,r),!0}return!1}function Qe(n,e,l,t){if(t={lane:2,revertLane:tn(),action:t,hasEagerState:!1,eagerState:null,next:null},Ye(n)){if(e)throw Error(r(479))}else null!==(e=Q(n,l,t,2))&&Xr(e,0,2)}function Ye(n){var e=n.alternate
return n===Ba||null!==e&&e===Ba}function Ke(n,e){$a=Ua=!0
var l=n.pending
null===l?e.next=e:(e.next=l.next,l.next=e),n.pending=e}function Xe(n,e,l){if(4194176&l){var r=e.lanes
l|=r&=n.pendingLanes,e.lanes=l,j(n,l)}}function Je(n,e,l,r){l=null==(l=l(r,e=n.memoizedState))?e:Kt({},e,l),n.memoizedState=l,0===n.lanes&&(n.updateQueue.baseState=l)}function Ze(n,e,l,r,t,u,o){return"function"==typeof(n=n.stateNode).shouldComponentUpdate?n.shouldComponentUpdate(r,u,o):!(e.prototype&&e.prototype.isPureReactComponent&&bn(l,r)&&bn(t,u))}function nl(n,e,l,r){n=e.state,"function"==typeof e.componentWillReceiveProps&&e.componentWillReceiveProps(l,r),"function"==typeof e.UNSAFE_componentWillReceiveProps&&e.UNSAFE_componentWillReceiveProps(l,r),e.state!==n&&ec.enqueueReplaceState(e,e.state,null)}function el(n,e){var l=e
if("ref"in e)for(var r in l={},e)"ref"!==r&&(l[r]=e[r])
if(n=n.defaultProps)for(var t in l===e&&(l=Kt({},l)),n)void 0===l[t]&&(l[t]=n[t])
return l}function ll(n,e){try{(0,n.onUncaughtError)(e.value,{componentStack:e.stack})}catch(Ue){setTimeout(function(){throw Ue})}}function rl(n,e,l){try{(0,n.onCaughtError)(l.value,{componentStack:l.stack,errorBoundary:1===e.tag?e.stateNode:null})}catch(Ue){setTimeout(function(){throw Ue})}}function tl(n,e,l){return(l=cn(l)).tag=3,l.payload={element:null},l.callback=function(){ll(n,e)},l}function ul(n){return(n=cn(n)).tag=3,n}function ol(n,e,l,r){var t=l.type.getDerivedStateFromError
if("function"==typeof t){var u=r.value
n.payload=function(){return t(u)},n.callback=function(){rl(e,l,r)}}var o=l.stateNode
null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){rl(e,l,r),"function"!=typeof t&&(null===ef?ef=new Set([this]):ef.add(this))
var n=r.stack
this.componentDidCatch(r.value,{componentStack:null!==n?n:""})})}function il(n,e,l,r){e.child=null===n?Oa(e,null,l,r):za(e,n.child,l,r)}function al(n,e,l,r,t){l=l.render
var u=e.ref
if("ref"in r){var o={}
for(var i in r)"ref"!==i&&(o[i]=r[i])}else o=r
return Al(e),r=Dn(n,e,l,o,u,t),i=Un(),null===n||tc?(oa&&i&&O(e),e.flags|=1,il(n,e,r,t),e.child):($n(n,e,t),jl(n,e,t))}function cl(n,e,l,r,t){if(null===n){var u=l.type
return"function"!=typeof u||Tt(u)||void 0!==u.defaultProps||null!==l.compare?((n=Ot(l.type,null,r,e,e.mode,t)).ref=e.ref,n.return=e,e.child=n):(e.tag=15,e.type=u,fl(n,e,u,r,t))}if(u=n.child,!Pl(n,t)){var o=u.memoizedProps
if((l=null!==(l=l.compare)?l:bn)(o,r)&&n.ref===e.ref)return jl(n,e,t)}return e.flags|=1,(n=It(u,r)).ref=e.ref,n.return=e,e.child=n}function fl(n,e,l,r,t){if(null!==n){var u=n.memoizedProps
if(bn(u,r)&&n.ref===e.ref){if(tc=!1,e.pendingProps=r=u,!Pl(n,t))return e.lanes=n.lanes,jl(n,e,t)
131072&n.flags&&(tc=!0)}}return pl(n,e,l,r,t)}function sl(n,e,l){var r=e.pendingProps,t=r.children,u=!!(2&e.stateNode.p),o=null!==n?n.memoizedState:null
if(dl(n,e),"hidden"===r.mode||u){if(128&e.flags){if(r=null!==o?o.baseLanes|l:l,null!==n){for(t=e.child=n.child,u=0;null!==t;)u=u|t.lanes|t.childLanes,t=t.sibling
e.childLanes=u&~r}else e.childLanes=0,e.child=null
return vl(n,e,r,l)}if(!(536870912&l))return e.lanes=e.childLanes=536870912,vl(n,e,null!==o?o.baseLanes|l:l,l)
e.memoizedState={baseLanes:0,cachePool:null},null!==n&&Ul(0,null!==o?o.cachePool:null),null!==o?jn(e,o):Pn(),In(e)}else null!==o?(Ul(0,o.cachePool),jn(e,o),zn(),e.memoizedState=null):(null!==n&&Ul(0,null),Pn(),zn())
return il(n,e,t,l),e.child}function vl(n,e,l,r){var t=ql()
return t=null===t?null:{parent:Fu?vc.o:vc.i,pool:t},e.memoizedState={baseLanes:l,cachePool:t},null!==n&&Ul(0,null),Pn(),In(e),null!==n&&Fl(n,e,r,!0),null}function dl(n,e){var l=e.ref
if(null===l)null!==n&&null!==n.ref&&(e.flags|=2097664)
else{if("function"!=typeof l&&"object"!=typeof l)throw Error(r(284))
null!==n&&n.ref===l||(e.flags|=2097664)}}function pl(n,e,l,r,t){return Al(e),l=Dn(n,e,l,r,void 0,t),r=Un(),null===n||tc?(oa&&r&&O(e),e.flags|=1,il(n,e,l,t),e.child):($n(n,e,t),jl(n,e,t))}function hl(n,e,l,r,t,u){return Al(e),e.updateQueue=null,l=Hn(e,r,l,t),Bn(n),r=Un(),null===n||tc?(oa&&r&&O(e),e.flags|=1,il(n,e,l,u),e.child):($n(n,e,u),jl(n,e,u))}function yl(n,e,l,r,t){if(Al(e),null===e.stateNode){var u=Si,o=l.contextType
"object"==typeof o&&null!==o&&(u=Ll(o)),u=new l(r,u),e.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=ec,e.stateNode=u,u.h=e,(u=e.stateNode).props=r,u.state=e.memoizedState,u.refs={},on(e),o=l.contextType,u.context="object"==typeof o&&null!==o?Ll(o):Si,u.state=e.memoizedState,"function"==typeof(o=l.getDerivedStateFromProps)&&(Je(e,l,o,r),u.state=e.memoizedState),"function"==typeof l.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(o=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),o!==u.state&&ec.enqueueReplaceState(u,u.state,null),pn(e,r,u,t),dn(),u.state=e.memoizedState),"function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!0}else if(null===n){u=e.stateNode
var i=e.memoizedProps,a=el(l,i)
u.props=a
var c=u.context,f=l.contextType
o=Si,"object"==typeof f&&null!==f&&(o=Ll(f))
var s=l.getDerivedStateFromProps
f="function"==typeof s||"function"==typeof u.getSnapshotBeforeUpdate,i=e.pendingProps!==i,f||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(i||c!==o)&&nl(e,u,r,o),Ea=!1
var v=e.memoizedState
u.state=v,pn(e,r,u,t),dn(),c=e.memoizedState,i||v!==c||Ea?("function"==typeof s&&(Je(e,l,s,r),c=e.memoizedState),(a=Ea||Ze(e,l,a,r,v,c,o))?(f||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(e.flags|=4194308)):("function"==typeof u.componentDidMount&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),u.props=r,u.state=c,u.context=o,r=a):("function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!1)}else{u=e.stateNode,an(n,e),f=el(l,o=e.memoizedProps),u.props=f,s=e.pendingProps,v=u.context,c=l.contextType,a=Si,"object"==typeof c&&null!==c&&(a=Ll(c)),(c="function"==typeof(i=l.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o!==s||v!==a)&&nl(e,u,r,a),Ea=!1,v=e.memoizedState,u.state=v,pn(e,r,u,t),dn()
var d=e.memoizedState
o!==s||v!==d||Ea||null!==n&&null!==n.dependencies&&_l(n.dependencies)?("function"==typeof i&&(Je(e,l,i,r),d=e.memoizedState),(f=Ea||Ze(e,l,f,r,v,d,a)||null!==n&&null!==n.dependencies&&_l(n.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(r,d,a),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(r,d,a)),"function"==typeof u.componentDidUpdate&&(e.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(e.flags|=1024)):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=d),u.props=r,u.state=d,u.context=a,r=f):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),r=!1)}return u=r,dl(n,e),r=!!(128&e.flags),u||r?(u=e.stateNode,l=r&&"function"!=typeof l.getDerivedStateFromError?null:u.render(),e.flags|=1,null!==n&&r?(e.child=za(e,n.child,null,t),e.child=za(e,null,l,t)):il(n,e,l,t),e.memoizedState=u.state,n=e.child):n=jl(n,e,t),n}function bl(n,e,l,r){return U(),e.flags|=256,il(n,e,l,r),e.child}function wl(n){return{baseLanes:n,cachePool:$l()}}function ml(n,e,l){return n=null!==n?n.childLanes&~l:0,e&&(n|=Gc),n}function kl(n,l,t){var u,o=l.pendingProps,i=!1,a=!!(128&l.flags)
if((u=a)||(u=(null===n||null!==n.memoizedState)&&!!(2&Na.current)),u&&(i=!0,l.flags&=-129),u=!!(32&l.flags),l.flags&=-33,null===n){if(oa){if(i?Tn(l):zn(),oa){var c,f=ua;(c=f)&&(null!==(f=$o(f,aa))?(l.memoizedState={dehydrated:f,treeContext:null!==Xi?{id:Ji,overflow:Zi}:null,retryLane:536870912},(c=e(18,null,null,0)).stateNode=f,c.return=l,l.child=c,ta=l,ua=null,c=!0):c=!1),c||D(l)}if(null!==(f=l.memoizedState)&&null!==(f=f.dehydrated))return Oo(f)?l.lanes=16:l.lanes=536870912,null
On(l)}return f=o.children,o=o.fallback,i?(zn(),f=xl({mode:"hidden",children:f},i=l.mode),o=Ft(o,i,t,null),f.return=l,o.return=l,f.sibling=o,l.child=f,(i=l.child).memoizedState=wl(t),i.childLanes=ml(n,u,t),l.memoizedState=uc,o):(Tn(l),gl(l,f))}if(null!==(c=n.memoizedState)&&null!==(f=c.dehydrated)){if(a)256&l.flags?(Tn(l),l.flags&=-257,l=El(n,l,t)):null!==l.memoizedState?(zn(),l.child=n.child,l.flags|=128,l=null):(zn(),i=o.fallback,f=l.mode,o=xl({mode:"visible",children:o.children},f),(i=Ft(i,f,t,null)).flags|=2,o.return=l,i.return=l,o.sibling=i,l.child=o,za(l,n.child,null,t),(o=l.child).memoizedState=wl(t),o.childLanes=ml(n,u,t),l.memoizedState=uc,l=i)
else if(Tn(l),Oo(f))u=Fo(f).digest,(o=Error(r(419))).stack="",o.digest=u,$({value:o,source:null,stack:null}),l=El(n,l,t)
else if(tc||Fl(n,l,t,!1),u=0!==(t&n.childLanes),tc||u){if(null!==(u=Fc)){if(42&(o=t&-t))o=1
else switch(o){case 2:o=1
break
case 8:o=4
break
case 32:o=16
break
case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:o=64
break
case 268435456:o=134217728
break
default:o=0}if(0!==(o=0!==(o&(u.suspendedLanes|t))?0:o)&&o!==c.retryLane)throw c.retryLane=o,Y(n,o),Xr(u,0,o),rc}zo(f)||ft(),l=El(n,l,t)}else zo(f)?(l.flags|=128,l.child=n.child,l=jt.bind(null,n),_o(f,l),l=null):(n=c.treeContext,Lu&&(ua=Ho(f),ta=l,oa=!0,ia=null,aa=!1,null!==n&&(Yi[Ki++]=Ji,Yi[Ki++]=Zi,Yi[Ki++]=Xi,Ji=n.id,Zi=n.overflow,Xi=l)),(l=gl(l,o.children)).flags|=4096)
return l}return i?(zn(),i=o.fallback,f=l.mode,a=(c=n.child).sibling,(o=It(c,{mode:"hidden",children:o.children})).subtreeFlags=31457280&c.subtreeFlags,null!==a?i=It(a,i):(i=Ft(i,f,t,null)).flags|=2,i.return=l,o.return=l,o.sibling=i,l.child=o,o=i,i=l.child,null===(f=n.child.memoizedState)?f=wl(t):(null!==(c=f.cachePool)?(a=Fu?vc.o:vc.i,c=c.parent!==a?{parent:a,pool:a}:c):c=$l(),f={baseLanes:f.baseLanes|t,cachePool:c}),i.memoizedState=f,i.childLanes=ml(n,u,t),l.memoizedState=uc,o):(Tn(l),n=(t=n.child).sibling,(t=It(t,{mode:"visible",children:o.children})).return=l,t.sibling=null,null!==n&&(null===(u=l.deletions)?(l.deletions=[n],l.flags|=16):u.push(n)),l.child=t,l.memoizedState=null,t)}function gl(n,e){return(e=xl({mode:"visible",children:e},n.mode)).return=n,n.child=e}function xl(n,e){return _t(n,e,0,null)}function El(n,e,l){return za(e,n.child,null,l),(n=gl(e,e.pendingProps.children)).flags|=2,e.memoizedState=null,n}function Sl(n,e,l){n.lanes|=e
var r=n.alternate
null!==r&&(r.lanes|=e),zl(n.return,e,l)}function Cl(n,e,l,r,t){var u=n.memoizedState
null===u?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:l,tailMode:t}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=l,u.tailMode=t)}function Ml(n,e,l){var r=e.pendingProps,t=r.revealOrder,u=r.tail
if(il(n,e,r.children,l),2&(r=Na.current))r=1&r|2,e.flags|=128
else{if(null!==n&&128&n.flags)n:for(n=e.child;null!==n;){if(13===n.tag)null!==n.memoizedState&&Sl(n,l,e)
else if(19===n.tag)Sl(n,l,e)
else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break n
for(;null===n.sibling;){if(null===n.return||n.return===e)break n
n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}switch(b(Na,r),t){case"forwards":for(l=e.child,t=null;null!==l;)null!==(n=l.alternate)&&null===Fn(n)&&(t=l),l=l.sibling
null===(l=t)?(t=e.child,e.child=null):(t=l.sibling,l.sibling=null),Cl(e,!1,t,l,u)
break
case"backwards":for(l=null,t=e.child,e.child=null;null!==t;){if(null!==(n=t.alternate)&&null===Fn(n)){e.child=t
break}n=t.sibling,t.sibling=l,l=t,t=n}Cl(e,!0,l,null,u)
break
case"together":Cl(e,!1,null,null,void 0)
break
default:e.memoizedState=null}return e.child}function jl(n,e,l){if(null!==n&&(e.dependencies=n.dependencies),$c|=e.lanes,0===(l&e.childLanes)){if(null===n)return null
if(Fl(n,e,l,!1),0===(l&e.childLanes))return null}if(null!==n&&e.child!==n.child)throw Error(r(153))
if(null!==e.child){for(l=It(n=e.child,n.pendingProps),e.child=l,l.return=e;null!==n.sibling;)n=n.sibling,(l=l.sibling=It(n,n.pendingProps)).return=e
l.sibling=null}return e.child}function Pl(n,e){return 0!==(n.lanes&e)||!(null===(n=n.dependencies)||!_l(n))}function Rl(n,e,l){if(null!==n)if(n.memoizedProps!==e.pendingProps)tc=!0
else{if(!(Pl(n,l)||128&e.flags))return tc=!1,function(n,e,l){switch(e.tag){case 3:_(e,e.stateNode.containerInfo),Tl(0,vc,n.memoizedState.cache),U()
break
case 27:case 5:L(e)
break
case 4:_(e,e.stateNode.containerInfo)
break
case 10:Tl(0,e.type,e.memoizedProps.value)
break
case 13:var r=e.memoizedState
if(null!==r)return null!==r.dehydrated?(Tn(e),e.flags|=128,null):0!==(l&e.child.childLanes)?kl(n,e,l):(Tn(e),null!==(n=jl(n,e,l))?n.sibling:null)
Tn(e)
break
case 19:var t=!!(128&n.flags)
if((r=0!==(l&e.childLanes))||(Fl(n,e,l,!1),r=0!==(l&e.childLanes)),t){if(r)return Ml(n,e,l)
e.flags|=128}if(null!==(t=e.memoizedState)&&(t.rendering=null,t.tail=null,t.lastEffect=null),b(Na,Na.current),r)break
return null
case 22:case 23:return e.lanes=0,sl(n,e,l)
case 24:Tl(0,vc,n.memoizedState.cache)}return jl(n,e,l)}(n,e,l)
tc=!!(131072&n.flags)}else tc=!1,oa&&1048576&e.flags&&z(e,Qi,e.index)
switch(e.lanes=0,e.tag){case 16:n:{n=e.pendingProps
var t=e.elementType,o=t.u
if(t=o(t.t),e.type=t,"function"!=typeof t){if(null!=t){if((o=t.$$typeof)===ou){e.tag=11,e=al(null,e,t,n,l)
break n}if(o===cu){e.tag=14,e=cl(null,e,t,n,l)
break n}}throw e=u(t)||t,Error(r(306,e,""))}Tt(t)?(n=el(t,n),e.tag=1,e=yl(null,e,t,n,l)):(e.tag=0,e=pl(null,e,t,n,l))}return e
case 0:return pl(n,e,e.type,e.pendingProps,l)
case 1:return yl(n,e,t=e.type,o=el(t,e.pendingProps),l)
case 3:n:{if(_(e,e.stateNode.containerInfo),null===n)throw Error(r(387))
var i=e.pendingProps
t=(o=e.memoizedState).element,an(n,e),pn(e,i,null,l)
var a=e.memoizedState
if(i=a.cache,Tl(0,vc,i),i!==o.cache&&Ol(e,[vc],l,!0),dn(),i=a.element,Lu&&o.isDehydrated){if(o={element:i,isDehydrated:!1,cache:a.cache},e.updateQueue.baseState=o,e.memoizedState=o,256&e.flags){e=bl(n,e,i,l)
break n}if(i!==t){$(t=T(Error(r(424)),e)),e=bl(n,e,i,l)
break n}for(Lu&&(ua=Bo(e.stateNode.containerInfo),ta=e,oa=!0,ia=null,aa=!0),l=Oa(e,null,i,l),e.child=l;l;)l.flags=-3&l.flags|4096,l=l.sibling}else{if(U(),i===t){e=jl(n,e,l)
break n}il(n,e,i,l)}e=e.child}return e
case 26:if(li)return dl(n,e),null===n?(l=ui(e.type,null,e.pendingProps,null))?e.memoizedState=l:oa||(e.stateNode=si(e.type,e.pendingProps,la.current,e)):e.memoizedState=ui(e.type,n.memoizedProps,e.pendingProps,n.memoizedState),null
case 27:if(yi)return L(e),null===n&&yi&&oa&&(t=e.stateNode=bi(e.type,e.pendingProps,la.current,na.current,!1),ta=e,aa=!0,ua=Do(t)),t=e.pendingProps.children,null!==n||oa?il(n,e,t,l):e.child=za(e,null,t,l),dl(n,e),e.child
case 5:return null===n&&oa&&(ni(e.type,e.pendingProps,na.current),(o=t=ua)&&(null!==(t=qo(t,e.type,e.pendingProps,aa))?(e.stateNode=t,ta=e,ua=Do(t),aa=!1,o=!0):o=!1),o||D(e)),L(e),o=e.type,i=e.pendingProps,a=null!==n?n.memoizedProps:null,t=i.children,Ru(o,i)?t=null:null!==a&&Ru(o,a)&&(e.flags|=32),null!==e.memoizedState&&(o=Dn(n,e,qn,null,null,l),Fu?Xu.o=o:Xu.i=o),dl(n,e),il(n,e,t,l),e.child
case 6:return null===n&&oa&&(ei(e.pendingProps,na.current),(n=l=ua)&&(null!==(l=Uo(l,e.pendingProps,aa))?(e.stateNode=l,ta=e,ua=null,n=!0):n=!1),n||D(e)),null
case 13:return kl(n,e,l)
case 4:return _(e,e.stateNode.containerInfo),t=e.pendingProps,null===n?e.child=za(e,null,t,l):il(n,e,t,l),e.child
case 11:return al(n,e,e.type,e.pendingProps,l)
case 7:return il(n,e,e.pendingProps,l),e.child
case 8:case 12:return il(n,e,e.pendingProps.children,l),e.child
case 10:return t=e.pendingProps,Tl(0,e.type,t.value),il(n,e,t.children,l),e.child
case 9:return o=e.type.l,t=e.pendingProps.children,Al(e),t=t(o=Ll(o)),e.flags|=1,il(n,e,t,l),e.child
case 14:return cl(n,e,e.type,e.pendingProps,l)
case 15:return fl(n,e,e.type,e.pendingProps,l)
case 19:return Ml(n,e,l)
case 22:return sl(n,e,l)
case 24:return Al(e),t=Ll(vc),null===n?(null===(o=ql())&&(o=Fc,i=Bl(),o.pooledCache=i,i.refCount++,null!==i&&(o.pooledCacheLanes|=l),o=i),e.memoizedState={parent:t,cache:o},on(e),Tl(0,vc,o)):(0!==(n.lanes&l)&&(an(n,e),pn(e,null,null,l),dn()),o=n.memoizedState,i=e.memoizedState,o.parent!==t?(o={parent:t,cache:t},e.memoizedState=o,0===e.lanes&&(e.memoizedState=e.updateQueue.baseState=o),Tl(0,vc,t)):(t=i.cache,Tl(0,vc,t),t!==o.cache&&Ol(e,[vc],l,!0))),il(n,e,e.pendingProps.children,l),e.child
case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function Tl(n,e,l){Fu?(b(oc,e.o),e.o=l):(b(oc,e.i),e.i=l)}function Il(n){var e=oc.current
Fu?n.o=e:n.i=e,y(oc)}function zl(n,e,l){for(;null!==n;){var r=n.alternate
if((n.childLanes&e)!==e?(n.childLanes|=e,null!==r&&(r.childLanes|=e)):null!==r&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===l)break
n=n.return}}function Ol(n,e,l,t){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var o=u.dependencies
if(null!==o){var i=u.child
o=o.firstContext
n:for(;null!==o;){var a=o
o=u
for(var c=0;c<e.length;c++)if(a.context===e[c]){o.lanes|=l,null!==(a=o.alternate)&&(a.lanes|=l),zl(o.return,l,n),t||(i=null)
break n}o=a.next}}else if(18===u.tag){if(null===(i=u.return))throw Error(r(341))
i.lanes|=l,null!==(o=i.alternate)&&(o.lanes|=l),zl(i,l,n),i=null}else i=u.child
if(null!==i)i.return=u
else for(i=u;null!==i;){if(i===n){i=null
break}if(null!==(u=i.sibling)){u.return=i.return,i=u
break}i=i.return}u=i}}function Fl(n,e,l,t){n=null
for(var u=e,o=!1;null!==u;){if(!o)if(524288&u.flags)o=!0
else if(262144&u.flags)break
if(10===u.tag){var i=u.alternate
if(null===i)throw Error(r(387))
if(null!==(i=i.memoizedProps)){var a=u.type
Ui(u.pendingProps.value,i.value)||(null!==n?n.push(a):n=[a])}}else if(u===ra.current){if(null===(i=u.alternate))throw Error(r(387))
i.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(Xu):n=[Xu])}u=u.return}null!==n&&Ol(e,n,l,t),e.flags|=262144}function _l(n){for(n=n.firstContext;null!==n;){var e=n.context
if(!Ui(Fu?e.o:e.i,n.memoizedValue))return!0
n=n.next}return!1}function Al(n){ic=n,ac=null,null!==(n=n.dependencies)&&(n.firstContext=null)}function Ll(n){return Dl(ic,n)}function Nl(n,e){return null===ic&&Al(n),Dl(n,e)}function Dl(n,e){var l=Fu?e.o:e.i
if(e={context:e,memoizedValue:l,next:null},null===ac){if(null===n)throw Error(r(308))
ac=e,n.dependencies={lanes:0,firstContext:e},n.flags|=524288}else ac=ac.next=e
return l}function Bl(){return{controller:new cc,data:new Map,refCount:0}}function Hl(n){n.refCount--,0===n.refCount&&fc(sc,function(){n.controller.abort()})}function ql(){var n=pc.current
return null!==n?n:Fc.pooledCache}function Ul(n,e){b(pc,null===e?pc.current:e.pool)}function $l(){var n=ql()
return null===n?null:{parent:Fu?vc.o:vc.i,pool:n}}function Vl(n){n.flags|=4}function Wl(n,e){if(null!==n&&n.child===e.child)return!1
if(16&e.flags)return!0
for(n=e.child;null!==n;){if(13878&n.flags||13878&n.subtreeFlags)return!0
n=n.sibling}return!1}function Gl(n,e,l,r){if(_u)for(l=e.child;null!==l;){if(5===l.tag||6===l.tag)ju(n,l.stateNode)
else if(!(4===l.tag||yi&&27===l.tag)&&null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}else if(Au)for(var t=e.child;null!==t;){if(5===t.tag){var u=t.stateNode
l&&r&&(u=To(u,t.type,t.memoizedProps)),ju(n,u)}else if(6===t.tag)u=t.stateNode,l&&r&&(u=Io(u,t.memoizedProps)),ju(n,u)
else if(4!==t.tag)if(22===t.tag&&null!==t.memoizedState)null!==(u=t.child)&&(u.return=t),Gl(n,t,!0,!0)
else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}}function Ql(n,e,l,r){if(Au)for(var t=e.child;null!==t;){if(5===t.tag){var u=t.stateNode
l&&r&&(u=To(u,t.type,t.memoizedProps)),jo(n,u)}else if(6===t.tag)u=t.stateNode,l&&r&&(u=Io(u,t.memoizedProps)),jo(n,u)
else if(4!==t.tag)if(22===t.tag&&null!==t.memoizedState)null!==(u=t.child)&&(u.return=t),Ql(n,t,!(null!==t.memoizedProps&&"manual"===t.memoizedProps.mode),!0)
else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}}function Yl(n,e){if(Au&&Wl(n,e)){var l=(n=e.stateNode).containerInfo,r=Mo()
Ql(r,e,!1,!1),n.pendingChildren=r,Vl(e),Po(l,r)}}function Kl(n,e,l,r){if(_u)n.memoizedProps!==r&&Vl(e)
else if(Au){var t=n.stateNode,u=n.memoizedProps
if((n=Wl(n,e))||u!==r){var o=na.current;(u=Co(t,l,u,r,!n,null))===t?e.stateNode=t:(Pu(u,l,r,o)&&Vl(e),e.stateNode=u,n?Gl(u,e,!1,!1):Vl(e))}else e.stateNode=t}}function Xl(n,e,l){if(Vu(e,l)){if(n.flags|=16777216,!Wu(e,l)){if(!it())throw Ra=Pa,ja
n.flags|=8192}}else n.flags&=-16777217}function Jl(n,e){if(di(e)){if(n.flags|=16777216,!pi(e)){if(!it())throw Ra=Pa,ja
n.flags|=8192}}else n.flags&=-16777217}function Zl(n,e){null!==e&&(n.flags|=4),16384&n.flags&&(e=22!==n.tag?E():536870912,n.lanes|=e,Qc|=e)}function nr(n,e){if(!oa)switch(n.tailMode){case"hidden":e=n.tail
for(var l=null;null!==e;)null!==e.alternate&&(l=e),e=e.sibling
null===l?n.tail=null:l.sibling=null
break
case"collapsed":l=n.tail
for(var r=null;null!==l;)null!==l.alternate&&(r=l),l=l.sibling
null===r?e||null===n.tail?n.tail=null:n.tail.sibling=null:r.sibling=null}}function er(n){var e=null!==n.alternate&&n.alternate.child===n.child,l=0,r=0
if(e)for(var t=n.child;null!==t;)l|=t.lanes|t.childLanes,r|=31457280&t.subtreeFlags,r|=31457280&t.flags,t.return=n,t=t.sibling
else for(t=n.child;null!==t;)l|=t.lanes|t.childLanes,r|=t.subtreeFlags,r|=t.flags,t.return=n,t=t.sibling
return n.subtreeFlags|=r,n.childLanes=l,e}function lr(n,e,l){var t=e.pendingProps
switch(F(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return er(e),null
case 3:return l=e.stateNode,t=null,null!==n&&(t=n.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),Il(vc),A(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),null!==n&&null!==n.child||(q(e)?Vl(e):null===n||n.memoizedState.isDehydrated&&!(256&e.flags)||(e.flags|=1024,null!==ia&&(Zr(ia),ia=null))),Yl(n,e),er(e),null
case 26:if(li){l=e.type
var u=e.memoizedState
return null===n?(Vl(e),null!==u?(er(e),Jl(e,u)):(er(e),Xl(e,l,t))):u?u!==n.memoizedState?(Vl(e),er(e),Jl(e,u)):(er(e),e.flags&=-16777217):(_u?n.memoizedProps!==t&&Vl(e):Kl(n,e,l,t),er(e),Xl(e,l,t)),null}case 27:if(yi){if(N(e),l=la.current,u=e.type,null!==n&&null!=e.stateNode)_u?n.memoizedProps!==t&&Vl(e):Kl(n,e,u,t)
else{if(!t){if(null===e.stateNode)throw Error(r(166))
return er(e),null}n=na.current,q(e)?B(e,n):(n=bi(u,t,l,n,!0),e.stateNode=n,Vl(e))}return er(e),null}case 5:if(N(e),l=e.type,null!==n&&null!=e.stateNode)Kl(n,e,l,t)
else{if(!t){if(null===e.stateNode)throw Error(r(166))
return er(e),null}n=na.current,q(e)?B(e,n):(Gl(u=Mu(l,t,la.current,n,e),e,!1,!1),e.stateNode=u,Pu(u,l,t,n)&&Vl(e))}return er(e),Xl(e,e.type,e.pendingProps),null
case 6:if(n&&null!=e.stateNode)l=n.memoizedProps,_u?l!==t&&Vl(e):Au&&(l!==t?(e.stateNode=Tu(t,la.current,na.current,e),Vl(e)):e.stateNode=n.stateNode)
else{if("string"!=typeof t&&null===e.stateNode)throw Error(r(166))
if(n=la.current,l=na.current,q(e)){if(!Lu)throw Error(r(176))
if(n=e.stateNode,l=e.memoizedProps,t=null,null!==(u=ta))switch(u.tag){case 27:case 5:t=u.memoizedProps}Wo(n,l,e,t)||D(e)}else e.stateNode=Tu(t,n,l,e)}return er(e),null
case 13:if(t=e.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=q(e),null!==t&&null!==t.dehydrated){if(null===n){if(!u)throw Error(r(318))
if(!Lu)throw Error(r(344))
if(!(u=null!==(u=e.memoizedState)?u.dehydrated:null))throw Error(r(317))
Go(u,e)}else U(),!(128&e.flags)&&(e.memoizedState=null),e.flags|=4
er(e),u=!1}else null!==ia&&(Zr(ia),ia=null),u=!0
if(!u)return 256&e.flags?(On(e),e):(On(e),null)}if(On(e),128&e.flags)return e.lanes=l,e
if(l=null!==t,n=null!==n&&null!==n.memoizedState,l){u=null,null!==(t=e.child).alternate&&null!==t.alternate.memoizedState&&null!==t.alternate.memoizedState.cachePool&&(u=t.alternate.memoizedState.cachePool.pool)
var o=null
null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(o=t.memoizedState.cachePool.pool),o!==u&&(t.flags|=2048)}return l!==n&&l&&(e.child.flags|=8192),Zl(e,e.updateQueue),er(e),null
case 4:return A(),Yl(n,e),null===n&&Du(e.stateNode.containerInfo),er(e),null
case 10:return Il(e.type),er(e),null
case 19:if(y(Na),null===(u=e.memoizedState))return er(e),null
if(t=!!(128&e.flags),null===(o=u.rendering))if(t)nr(u,!1)
else{if(0!==Uc||null!==n&&128&n.flags)for(n=e.child;null!==n;){if(null!==(o=Fn(n))){for(e.flags|=128,nr(u,!1),n=o.updateQueue,e.updateQueue=n,Zl(e,n),e.subtreeFlags=0,n=l,l=e.child;null!==l;)zt(l,n),l=l.sibling
return b(Na,1&Na.current|2),e.child}n=n.sibling}null!==u.tail&&Fi()>Zc&&(e.flags|=128,t=!0,nr(u,!1),e.lanes=4194304)}else{if(!t)if(null!==(n=Fn(o))){if(e.flags|=128,t=!0,n=n.updateQueue,e.updateQueue=n,Zl(e,n),nr(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!oa)return er(e),null}else 2*Fi()-u.renderingStartTime>Zc&&536870912!==l&&(e.flags|=128,t=!0,nr(u,!1),e.lanes=4194304)
u.isBackwards?(o.sibling=e.child,e.child=o):(null!==(n=u.last)?n.sibling=o:e.child=o,u.last=o)}return null!==u.tail?(e=u.tail,u.rendering=e,u.tail=e.sibling,u.renderingStartTime=Fi(),e.sibling=null,n=Na.current,b(Na,t?1&n|2:1&n),e):(er(e),null)
case 22:case 23:return On(e),Rn(),t=null!==e.memoizedState,null!==n?null!==n.memoizedState!==t&&(e.flags|=8192):t&&(e.flags|=8192),t?!!(536870912&l)&&!(128&e.flags)&&(er(e),6&e.subtreeFlags&&(e.flags|=8192)):er(e),null!==(l=e.updateQueue)&&Zl(e,l.retryQueue),l=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(l=n.memoizedState.cachePool.pool),t=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(t=e.memoizedState.cachePool.pool),t!==l&&(e.flags|=2048),null!==n&&y(pc),null
case 24:return l=null,null!==n&&(l=n.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Il(vc),er(e),null
case 25:return null}throw Error(r(156,e.tag))}function rr(n,e){switch(F(e),e.tag){case 1:return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 3:return Il(vc),A(),65536&(n=e.flags)&&!(128&n)?(e.flags=-65537&n|128,e):null
case 26:case 27:case 5:return N(e),null
case 13:if(On(e),null!==(n=e.memoizedState)&&null!==n.dehydrated){if(null===e.alternate)throw Error(r(340))
U()}return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 19:return y(Na),null
case 4:return A(),null
case 10:return Il(e.type),null
case 22:case 23:return On(e),Rn(),null!==n&&y(pc),65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 24:return Il(vc),null
default:return null}}function tr(n,e){switch(F(e),e.tag){case 3:Il(vc),A()
break
case 26:case 27:case 5:N(e)
break
case 4:A()
break
case 13:On(e)
break
case 19:y(Na)
break
case 10:Il(e.type)
break
case 22:case 23:On(e),Rn(),null!==n&&y(pc)
break
case 24:Il(vc)}}function ur(n,e){try{var l=e.updateQueue,r=null!==l?l.lastEffect:null
if(null!==r){var t=r.next
l=t
do{if((l.tag&n)===n){r=void 0
var u=l.create,o=l.inst
r=u(),o.destroy=r}l=l.next}while(l!==t)}}catch(i){Et(e,e.return,i)}}function or(n,e,l){try{var r=e.updateQueue,t=null!==r?r.lastEffect:null
if(null!==t){var u=t.next
r=u
do{if((r.tag&n)===n){var o=r.inst,i=o.destroy
if(void 0!==i){o.destroy=void 0,t=e
var a=l
try{i()}catch(c){Et(t,a,c)}}}r=r.next}while(r!==u)}}catch(c){Et(e,e.return,c)}}function ir(n){var e=n.updateQueue
if(null!==e){var l=n.stateNode
try{yn(e,l)}catch(r){Et(n,n.return,r)}}}function ar(n,e,l){l.props=el(n.type,n.memoizedProps),l.state=n.memoizedState
try{l.componentWillUnmount()}catch(r){Et(n,e,r)}}function cr(n,e){try{var l=n.ref
if(null!==l){var r=n.stateNode
switch(n.tag){case 26:case 27:case 5:var t=gu(r)
break
default:t=r}"function"==typeof l?n.refCleanup=l(t):l.current=t}}catch(u){Et(n,e,u)}}function fr(n,e){var l=n.ref,r=n.refCleanup
if(null!==l)if("function"==typeof r)try{r()}catch(t){Et(n,e,t)}finally{n.refCleanup=null,null!=(n=n.alternate)&&(n.refCleanup=null)}else if("function"==typeof l)try{l(null)}catch(u){Et(n,e,u)}else l.current=null}function sr(n){var e=n.type,l=n.memoizedProps,r=n.stateNode
try{vo(r,e,l,n)}catch(t){Et(n,n.return,t)}}function vr(n,e,l){try{po(n.stateNode,n.type,l,e,n)}catch(r){Et(n,n.return,r)}}function dr(n){return 5===n.tag||3===n.tag||!!li&&26===n.tag||!!yi&&27===n.tag||4===n.tag}function pr(n){n:for(;;){for(;null===n.sibling;){if(null===n.return||dr(n.return))return null
n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&(!yi||27!==n.tag)&&18!==n.tag;){if(2&n.flags)continue n
if(null===n.child||4===n.tag)continue n
n.child.return=n,n=n.child}if(!(2&n.flags))return n.stateNode}}function hr(n,e,l){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?yo(l,n,e):fo(l,n)
else if(!(4===r||yi&&27===r)&&null!==(n=n.child))for(hr(n,e,l),n=n.sibling;null!==n;)hr(n,e,l),n=n.sibling}function yr(n,e,l){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?ho(l,n,e):co(l,n)
else if(!(4===r||yi&&27===r)&&null!==(n=n.child))for(yr(n,e,l),n=n.sibling;null!==n;)yr(n,e,l),n=n.sibling}function br(n,e,l){n=n.containerInfo
try{Ro(n,l)}catch(r){Et(e,e.return,r)}}function wr(n,e,l){var r=l.flags
switch(l.tag){case 0:case 11:case 15:Pr(n,l),4&r&&ur(5,l)
break
case 1:if(Pr(n,l),4&r)if(n=l.stateNode,null===e)try{n.componentDidMount()}catch(i){Et(l,l.return,i)}else{var t=el(l.type,e.memoizedProps)
e=e.memoizedState
try{n.componentDidUpdate(t,e,n.m)}catch(a){Et(l,l.return,a)}}64&r&&ir(l),512&r&&cr(l,l.return)
break
case 3:if(Pr(n,l),64&r&&null!==(r=l.updateQueue)){if(n=null,null!==l.child)switch(l.child.tag){case 27:case 5:n=gu(l.child.stateNode)
break
case 1:n=l.child.stateNode}try{yn(r,n)}catch(i){Et(l,l.return,i)}}break
case 26:if(li){Pr(n,l),512&r&&cr(l,l.return)
break}case 27:case 5:Pr(n,l),null===e&&4&r&&sr(l),512&r&&cr(l,l.return)
break
case 12:Pr(n,l)
break
case 13:Pr(n,l),4&r&&xr(n,l)
break
case 22:if(!(t=null!==l.memoizedState||hc)){e=null!==e&&null!==e.memoizedState||yc
var u=hc,o=yc
hc=t,(yc=e)&&!o?Tr(n,l,!!(8772&l.subtreeFlags)):Pr(n,l),hc=u,yc=o}512&r&&("manual"===l.memoizedProps.mode?cr(l,l.return):fr(l,l.return))
break
default:Pr(n,l)}}function mr(n){var e=n.alternate
null!==e&&(n.alternate=null,mr(e)),n.child=null,n.deletions=null,n.sibling=null,5===n.tag&&null!==(e=n.stateNode)&&$u(e),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function kr(n,e,l){for(l=l.child;null!==l;)gr(n,e,l),l=l.sibling}function gr(n,e,l){if(qi&&"function"==typeof qi.onCommitFiberUnmount)try{qi.onCommitFiberUnmount(Hi,l)}catch(u){}switch(l.tag){case 26:if(li){yc||fr(l,e),kr(n,e,l),l.memoizedState?ii(l.memoizedState):l.stateNode&&fi(l.stateNode)
break}case 27:if(yi){yc||fr(l,e)
var r=gc,t=xc
gc=l.stateNode,kr(n,e,l),ki(l.stateNode),gc=r,xc=t
break}case 5:yc||fr(l,e)
case 6:if(_u){if(r=gc,t=xc,gc=null,kr(n,e,l),xc=t,null!==(gc=r))if(xc)try{wo(gc,l.stateNode)}catch(o){Et(l,e,o)}else try{bo(gc,l.stateNode)}catch(o){Et(l,e,o)}}else kr(n,e,l)
break
case 18:_u&&null!==gc&&(xc?Jo(gc,l.stateNode):Xo(gc,l.stateNode))
break
case 4:_u?(r=gc,t=xc,gc=l.stateNode.containerInfo,xc=!0,kr(n,e,l),gc=r,xc=t):(Au&&br(l.stateNode,l,Mo()),kr(n,e,l))
break
case 0:case 11:case 14:case 15:yc||or(2,l,e),yc||or(4,l,e),kr(n,e,l)
break
case 1:yc||(fr(l,e),"function"==typeof(r=l.stateNode).componentWillUnmount&&ar(l,e,r)),kr(n,e,l)
break
case 21:kr(n,e,l)
break
case 22:yc||fr(l,e),yc=(r=yc)||null!==l.memoizedState,kr(n,e,l),yc=r
break
default:kr(n,e,l)}}function xr(n,e){if(Lu&&null===e.memoizedState&&null!==(n=e.alternate)&&null!==(n=n.memoizedState)&&null!==(n=n.dehydrated))try{Ko(n)}catch(l){Et(e,e.return,l)}}function Er(n,e){var l=function(n){switch(n.tag){case 13:case 19:var e=n.stateNode
return null===e&&(e=n.stateNode=new wc),e
case 22:return null===(e=(n=n.stateNode).k)&&(e=n.k=new wc),e
default:throw Error(r(435,n.tag))}}(n)
e.forEach(function(e){var r=Pt.bind(null,n,e)
l.has(e)||(l.add(e),e.then(r,r))})}function Sr(n,e){var l=e.deletions
if(null!==l)for(var t=0;t<l.length;t++){var u=l[t],o=n,i=e
if(_u){var a=i
n:for(;null!==a;){switch(a.tag){case 27:case 5:gc=a.stateNode,xc=!1
break n
case 3:case 4:gc=a.stateNode.containerInfo,xc=!0
break n}a=a.return}if(null===gc)throw Error(r(160))
gr(o,i,u),gc=null,xc=!1}else gr(o,i,u)
null!==(o=u.alternate)&&(o.return=null),u.return=null}if(13878&e.subtreeFlags)for(e=e.child;null!==e;)Cr(e,n),e=e.sibling}function Cr(n,e){var l=n.alternate,t=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:Sr(e,n),Mr(n),4&t&&(or(3,n,n.return),ur(3,n),or(5,n,n.return))
break
case 1:Sr(e,n),Mr(n),512&t&&(yc||null===l||fr(l,l.return)),64&t&&hc&&null!==(n=n.updateQueue)&&null!==(t=n.callbacks)&&(l=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===l?t:l.concat(t))
break
case 26:if(li){var u=Ec
Sr(e,n),Mr(n),512&t&&(yc||null===l||fr(l,l.return)),4&t&&(t=null!==l?l.memoizedState:null,e=n.memoizedState,null===l?null===e?null===n.stateNode?n.stateNode=ai(u,n.type,n.memoizedProps,n):ci(u,n.type,n.stateNode):n.stateNode=oi(u,e,n.memoizedProps):t!==e?(null===t?null!==l.stateNode&&fi(l.stateNode):ii(t),null===e?ci(u,n.type,n.stateNode):oi(u,e,n.memoizedProps)):null===e&&null!==n.stateNode&&vr(n,n.memoizedProps,l.memoizedProps))
break}case 27:if(yi&&4&t&&null===n.alternate){u=n.stateNode
var o=n.memoizedProps
try{wi(u),mi(n.type,o,u,n)}catch(s){Et(n,n.return,s)}}case 5:if(Sr(e,n),Mr(n),512&t&&(yc||null===l||fr(l,l.return)),_u){if(32&n.flags){e=n.stateNode
try{mo(e)}catch(s){Et(n,n.return,s)}}4&t&&null!=n.stateNode&&vr(n,e=n.memoizedProps,null!==l?l.memoizedProps:e),1024&t&&(bc=!0)}break
case 6:if(Sr(e,n),Mr(n),4&t&&_u){if(null===n.stateNode)throw Error(r(162))
t=n.memoizedProps,l=null!==l?l.memoizedProps:t,e=n.stateNode
try{so(e,l,t)}catch(s){Et(n,n.return,s)}}break
case 3:if(li?(vi(),u=Ec,Ec=ti(e.containerInfo),Sr(e,n),Ec=u):Sr(e,n),Mr(n),4&t){if(_u&&Lu&&null!==l&&l.memoizedState.isDehydrated)try{Yo(e.containerInfo)}catch(s){Et(n,n.return,s)}if(Au){t=e.containerInfo,l=e.pendingChildren
try{Ro(t,l)}catch(s){Et(n,n.return,s)}}}bc&&(bc=!1,jr(n))
break
case 4:li?(l=Ec,Ec=ti(n.stateNode.containerInfo),Sr(e,n),Mr(n),Ec=l):(Sr(e,n),Mr(n)),4&t&&Au&&br(n.stateNode,n,n.stateNode.pendingChildren)
break
case 12:Sr(e,n),Mr(n)
break
case 13:Sr(e,n),Mr(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==l&&null!==l.memoizedState)&&(Jc=Fi()),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,Er(n,t))
break
case 22:512&t&&(yc||null===l||fr(l,l.return)),u=null!==n.memoizedState
var i=null!==l&&null!==l.memoizedState,a=hc,c=yc
if(hc=a||u,yc=c||i,Sr(e,n),yc=c,hc=a,Mr(n),(e=n.stateNode).C=n,e.v&=-3,e.v|=2&e.p,8192&t&&(e.v=u?-2&e.v:1|e.v,u&&(e=hc||yc,null===l||i||e||Rr(n)),_u&&(null===n.memoizedProps||"manual"!==n.memoizedProps.mode)))n:if(l=null,_u)for(e=n;;){if(5===e.tag||li&&26===e.tag||yi&&27===e.tag){if(null===l){i=l=e
try{o=i.stateNode,u?ko(o):xo(i.stateNode,i.memoizedProps)}catch(s){Et(i,i.return,s)}}}else if(6===e.tag){if(null===l){i=e
try{var f=i.stateNode
u?go(f):Eo(f,i.memoizedProps)}catch(s){Et(i,i.return,s)}}}else if((22!==e.tag&&23!==e.tag||null===e.memoizedState||e===n)&&null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break n
for(;null===e.sibling;){if(null===e.return||e.return===n)break n
l===e&&(l=null),e=e.return}l===e&&(l=null),e.sibling.return=e.return,e=e.sibling}4&t&&null!==(t=n.updateQueue)&&null!==(l=t.retryQueue)&&(t.retryQueue=null,Er(n,l))
break
case 19:Sr(e,n),Mr(n),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,Er(n,t))
break
case 21:break
default:Sr(e,n),Mr(n)}}function Mr(n){var e=n.flags
if(2&e){try{if(_u&&(!yi||27!==n.tag)){n:{for(var l=n.return;null!==l;){if(dr(l)){var t=l
break n}l=l.return}throw Error(r(160))}switch(t.tag){case 27:if(yi){var u=t.stateNode
yr(n,pr(n),u)
break}case 5:var o=t.stateNode
32&t.flags&&(mo(o),t.flags&=-33),yr(n,pr(n),o)
break
case 3:case 4:var i=t.stateNode.containerInfo
hr(n,pr(n),i)
break
default:throw Error(r(161))}}}catch(a){Et(n,n.return,a)}n.flags&=-3}4096&e&&(n.flags&=-4097)}function jr(n){if(1024&n.subtreeFlags)for(n=n.child;null!==n;){var e=n
jr(e),5===e.tag&&1024&e.flags&&Ju(e.stateNode),n=n.sibling}}function Pr(n,e){if(8772&e.subtreeFlags)for(e=e.child;null!==e;)wr(n,e.alternate,e),e=e.sibling}function Rr(n){for(n=n.child;null!==n;){var e=n
switch(e.tag){case 0:case 11:case 14:case 15:or(4,e,e.return),Rr(e)
break
case 1:fr(e,e.return)
var l=e.stateNode
"function"==typeof l.componentWillUnmount&&ar(e,e.return,l),Rr(e)
break
case 26:case 27:case 5:fr(e,e.return),Rr(e)
break
case 22:fr(e,e.return),null===e.memoizedState&&Rr(e)
break
default:Rr(e)}n=n.sibling}}function Tr(n,e,l){for(l=l&&!!(8772&e.subtreeFlags),e=e.child;null!==e;){var r=e.alternate,t=n,u=e,o=u.flags
switch(u.tag){case 0:case 11:case 15:Tr(t,u,l),ur(4,u)
break
case 1:if(Tr(t,u,l),"function"==typeof(t=(r=u).stateNode).componentDidMount)try{t.componentDidMount()}catch(c){Et(r,r.return,c)}if(null!==(t=(r=u).updateQueue)){var i=r.stateNode
try{var a=t.shared.hiddenCallbacks
if(null!==a)for(t.shared.hiddenCallbacks=null,t=0;t<a.length;t++)hn(a[t],i)}catch(c){Et(r,r.return,c)}}l&&64&o&&ir(u),cr(u,u.return)
break
case 26:case 27:case 5:Tr(t,u,l),l&&null===r&&4&o&&sr(u),cr(u,u.return)
break
case 12:default:Tr(t,u,l)
break
case 13:Tr(t,u,l),l&&4&o&&xr(t,u)
break
case 22:null===u.memoizedState&&Tr(t,u,l),cr(u,u.return)}e=e.sibling}}function Ir(n,e){var l=null
null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(l=n.memoizedState.cachePool.pool),n=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),n!==l&&(null!=n&&n.refCount++,null!=l&&Hl(l))}function zr(n,e){n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&Hl(n))}function Or(n,e,l,r){if(10256&e.subtreeFlags)for(e=e.child;null!==e;)Fr(n,e,l,r),e=e.sibling}function Fr(n,e,l,r){var t=e.flags
switch(e.tag){case 0:case 11:case 15:Or(n,e,l,r),2048&t&&ur(9,e)
break
case 3:Or(n,e,l,r),2048&t&&(n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&Hl(n)))
break
case 12:if(2048&t){Or(n,e,l,r),n=e.stateNode
try{var u=e.memoizedProps,o=u.id,i=u.onPostCommit
"function"==typeof i&&i(o,null===e.alternate?"mount":"update",n.passiveEffectDuration,-0)}catch(a){Et(e,e.return,a)}}else Or(n,e,l,r)
break
case 23:break
case 22:u=e.stateNode,null!==e.memoizedState?4&u.v?Or(n,e,l,r):Ar(n,e):4&u.v?Or(n,e,l,r):(u.v|=4,_r(n,e,l,r,!!(10256&e.subtreeFlags))),2048&t&&Ir(e.alternate,e)
break
case 24:Or(n,e,l,r),2048&t&&zr(e.alternate,e)
break
default:Or(n,e,l,r)}}function _r(n,e,l,r,t){for(t=t&&!!(10256&e.subtreeFlags),e=e.child;null!==e;){var u=n,o=e,i=l,a=r,c=o.flags
switch(o.tag){case 0:case 11:case 15:_r(u,o,i,a,t),ur(8,o)
break
case 23:break
case 22:var f=o.stateNode
null!==o.memoizedState?4&f.v?_r(u,o,i,a,t):Ar(u,o):(f.v|=4,_r(u,o,i,a,t)),t&&2048&c&&Ir(o.alternate,o)
break
case 24:_r(u,o,i,a,t),t&&2048&c&&zr(o.alternate,o)
break
default:_r(u,o,i,a,t)}e=e.sibling}}function Ar(n,e){if(10256&e.subtreeFlags)for(e=e.child;null!==e;){var l=n,r=e,t=r.flags
switch(r.tag){case 22:Ar(l,r),2048&t&&Ir(r.alternate,r)
break
case 24:Ar(l,r),2048&t&&zr(r.alternate,r)
break
default:Ar(l,r)}e=e.sibling}}function Lr(n){if(n.subtreeFlags&Sc)for(n=n.child;null!==n;)Nr(n),n=n.sibling}function Nr(n){switch(n.tag){case 26:Lr(n),n.flags&Sc&&(null!==n.memoizedState?hi(Ec,n.memoizedState,n.memoizedProps):Qu(n.type,n.memoizedProps))
break
case 5:Lr(n),n.flags&Sc&&Qu(n.type,n.memoizedProps)
break
case 3:case 4:if(li){var e=Ec
Ec=ti(n.stateNode.containerInfo),Lr(n),Ec=e}else Lr(n)
break
case 22:null===n.memoizedState&&(null!==(e=n.alternate)&&null!==e.memoizedState?(e=Sc,Sc=16777216,Lr(n),Sc=e):Lr(n))
break
default:Lr(n)}}function Dr(n){var e=n.alternate
if(null!==e&&null!==(n=e.child)){e.child=null
do{e=n.sibling,n.sibling=null,n=e}while(null!==n)}}function Br(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var l=0;l<e.length;l++){var r=e[l]
mc=r,Ur(r,n)}Dr(n)}if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Hr(n),n=n.sibling}function Hr(n){switch(n.tag){case 0:case 11:case 15:Br(n),2048&n.flags&&or(9,n,n.return)
break
case 3:case 12:default:Br(n)
break
case 22:var e=n.stateNode
null!==n.memoizedState&&4&e.v&&(null===n.return||13!==n.return.tag)?(e.v&=-5,qr(n)):Br(n)}}function qr(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var l=0;l<e.length;l++){var r=e[l]
mc=r,Ur(r,n)}Dr(n)}for(n=n.child;null!==n;){switch((e=n).tag){case 0:case 11:case 15:or(8,e,e.return),qr(e)
break
case 22:4&(l=e.stateNode).v&&(l.v&=-5,qr(e))
break
default:qr(e)}n=n.sibling}}function Ur(n,e){for(;null!==mc;){var l=mc
switch(l.tag){case 0:case 11:case 15:or(8,l,e)
break
case 23:case 22:if(null!==l.memoizedState&&null!==l.memoizedState.cachePool){var r=l.memoizedState.cachePool.pool
null!=r&&r.refCount++}break
case 24:Hl(l.memoizedState.cache)}if(null!==(r=l.child))r.return=l,mc=r
else n:for(l=n;null!==mc;){var t=(r=mc).sibling,u=r.return
if(mr(r),r===l){mc=null
break n}if(null!==t){t.return=u,mc=t
break n}mc=u}}}function $r(n){var e=Nu(n)
if(null!=e){if("string"!=typeof e.memoizedProps["data-testname"])throw Error(r(364))
return e}if(null===(n=lo(n)))throw Error(r(362))
return n.stateNode.current}function Vr(n,e){var l=n.tag
switch(e.$$typeof){case Mc:if(n.type===e.value)return!0
break
case jc:n:{for(e=e.value,n=[n,0],l=0;l<n.length;){var t=n[l++],u=t.tag,o=n[l++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(t)){for(;null!=i&&Vr(t,i);)i=e[++o]
if(o===e.length){e=!0
break n}for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}e=!1}return e
case Pc:if((5===l||26===l||27===l)&&oo(n.stateNode,e.value))return!0
break
case Tc:if((5===l||6===l||26===l||27===l)&&null!==(n=to(n))&&0<=n.indexOf(e.value))return!0
break
case Rc:if((5===l||26===l||27===l)&&"string"==typeof(n=n.memoizedProps["data-testname"])&&n.toLowerCase()===e.value.toLowerCase())return!0
break
default:throw Error(r(365))}return!1}function Wr(n){switch(n.$$typeof){case Mc:return"<"+(u(n.value)||"Unknown")+">"
case jc:return":has("+(Wr(n)||"")+")"
case Pc:return'[role="'+n.value+'"]'
case Tc:return'"'+n.value+'"'
case Rc:return'[data-testname="'+n.value+'"]'
default:throw Error(r(365))}}function Gr(n,e){var l=[]
n=[n,0]
for(var r=0;r<n.length;){var t=n[r++],u=t.tag,o=n[r++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(t)){for(;null!=i&&Vr(t,i);)i=e[++o]
if(o===e.length)l.push(t)
else for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}return l}function Qr(n,e){if(!eo)throw Error(r(363))
n=Gr(n=$r(n),e),e=[],n=Array.from(n)
for(var l=0;l<n.length;){var t=n[l++],u=t.tag
if(5===u||26===u||27===u)uo(t)||e.push(t.stateNode)
else for(t=t.child;null!==t;)n.push(t),t=t.sibling}return e}function Yr(){return 2&Oc&&0!==Ac?Ac&-Ac:null!==hu.T?0!==ga?ga:tn():qu()}function Kr(){0===Gc&&(Gc=536870912&Ac&&!oa?536870912:x())
var n=Aa.current
return null!==n&&(n.flags|=32),Gc}function Xr(n,e,l){(n===Fc&&2===Lc||null!==n.cancelPendingCommit)&&(ut(n,0),lt(n,Ac,Gc,!1)),C(n,l),2&Oc&&n===Fc||(n===Fc&&(!(2&Oc)&&(Vc|=l),4===Uc&&lt(n,Ac,Gc,!1)),J(n))}function Jr(n,e,l){if(6&Oc)throw Error(r(327))
for(var t=!l&&!(60&e)&&0===(e&n.expiredLanes)||k(n,e),u=t?function(n,e){var l=Oc
Oc|=2
var t=at(),u=ct()
Fc!==n||Ac!==e?(nf=null,Zc=Fi()+500,ut(n,e)):Bc=k(n,e)
n:for(;;){try{if(0!==Lc&&null!==_c){e=_c
var o=Nc
e:switch(Lc){case 1:Lc=0,Nc=null,yt(n,e,o,1)
break
case 2:if(wn(o)){Lc=0,Nc=null,ht(e)
break}e=function(){2===Lc&&Fc===n&&(Lc=7),J(n)},o.then(e,e)
break n
case 3:Lc=7
break n
case 4:Lc=5
break n
case 7:wn(o)?(Lc=0,Nc=null,ht(e)):(Lc=0,Nc=null,yt(n,e,o,7))
break
case 5:var i=null
switch(_c.tag){case 26:i=_c.memoizedState
case 5:case 27:var a=_c,c=a.type,f=a.pendingProps
if(i?pi(i):Wu(c,f)){Lc=0,Nc=null
var s=a.sibling
if(null!==s)_c=s
else{var v=a.return
null!==v?(_c=v,bt(v)):_c=null}break e}}Lc=0,Nc=null,yt(n,e,o,5)
break
case 6:Lc=0,Nc=null,yt(n,e,o,6)
break
case 8:tt(),Uc=6
break n
default:throw Error(r(462))}}dt()
break}catch(d){ot(n,d)}1}return ac=ic=null,hu.H=t,hu.A=u,Oc=l,null!==_c?0:(Fc=null,Ac=0,V(),Uc)}(n,e):st(n,e,!0),o=t;;){if(0===u){Bc&&!t&&lt(n,e,0,!1)
break}if(6===u)lt(n,e,0,!Dc)
else{if(l=n.current.alternate,o&&!et(l)){u=st(n,e,!1),o=!1
continue}if(2===u){if(o=e,n.errorRecoveryDisabledLanes&o)var i=0
else i=0!=(i=-536870913&n.pendingLanes)?i:536870912&i?536870912:0
if(0!==i){e=i
n:{var a=n
u=Yc
var c=Lu&&a.current.memoizedState.isDehydrated
if(c&&(ut(a,i).flags|=256),2!==(i=st(a,i,!1))){if(Hc&&!c){a.errorRecoveryDisabledLanes|=o,Vc|=o,u=4
break n}o=Kc,Kc=u,null!==o&&Zr(o)}u=i}if(o=!1,2!==u)continue}}if(1===u){ut(n,0),lt(n,e,0,!0)
break}n:{switch(t=n,u){case 0:case 1:throw Error(r(345))
case 4:if((4194176&e)===e){lt(t,e,Gc,!Dc)
break n}break
case 2:Kc=null
break
case 3:case 5:break
default:throw Error(r(329))}if(t.finishedWork=l,t.finishedLanes=e,(62914560&e)===e&&10<(o=Jc+300-Fi())){if(lt(t,e,Gc,!Dc),0!==m(t,0))break n
t.timeoutHandle=Iu(nt.bind(null,t,l,Kc,nf,Xc,e,Gc,Vc,Qc,Dc,2,-0,0),o)}else nt(t,l,Kc,nf,Xc,e,Gc,Vc,Qc,Dc,0,-0,0)}}break}J(n)}function Zr(n){null===Kc?Kc=n:Kc.push.apply(Kc,n)}function nt(n,e,l,r,t,u,o,i,a,c,f,s,v){var d=e.subtreeFlags
if((8192&d||!(16785408&~d))&&(Gu(),Nr(e),null!==(e=Yu())))return n.cancelPendingCommit=e(mt.bind(null,n,l,r,t,o,i,a,1,s,v)),lt(n,u,o,!c),void 0
mt(n,l,r,t,o,i,a)}function et(n){for(var e=n;;){var l=e.tag
if((0===l||11===l||15===l)&&16384&e.flags&&null!==(l=e.updateQueue)&&null!==(l=l.stores))for(var r=0;r<l.length;r++){var t=l[r],u=t.getSnapshot
t=t.value
try{if(!Ui(u(),t))return!1}catch(o){return!1}}if(l=e.child,16384&e.subtreeFlags&&null!==l)l.return=e,e=l
else{if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return!0
e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function lt(n,e,l,r){e&=~Wc,e&=~Vc,n.suspendedLanes|=e,n.pingedLanes&=~e,r&&(n.warmLanes|=e),r=n.expirationTimes
for(var t=e;0<t;){var u=31-Ci(t),o=1<<u
r[u]=-1,t&=~o}0!==l&&M(n,l,e)}function rt(){return!!(6&Oc)||(Z(0),!1)}function tt(){if(null!==_c){if(0===Lc)var n=_c.return
else ac=ic=null,Gn(n=_c),Ta=null,Ia=0,n=_c
for(;null!==n;)tr(n.alternate,n),n=n.return
_c=null}}function ut(n,e){n.finishedWork=null,n.finishedLanes=0
var l=n.timeoutHandle
l!==Ou&&(n.timeoutHandle=Ou,zu(l)),null!==(l=n.cancelPendingCommit)&&(n.cancelPendingCommit=null,l()),tt(),Fc=n,_c=l=It(n.current,null),Ac=e,Lc=0,Nc=null,Dc=!1,Bc=k(n,e),Hc=!1,Qc=Gc=Wc=Vc=$c=Uc=0,Kc=Yc=null,Xc=!1,8&e&&(e|=32&e)
var r=n.entangledLanes
if(0!==r)for(n=n.entanglements,r&=e;0<r;){var t=31-Ci(r),u=1<<t
e|=n[t],r&=~u}return qc=e,V(),l}function ot(n,e){Ba=null,hu.H=Xa,e===Ma?(e=gn(),Lc=3):e===ja?(e=gn(),Lc=4):Lc=e===rc?8:null!==e&&"object"==typeof e&&"function"==typeof e.then?6:1,Nc=e,null===_c&&(Uc=1,ll(n,T(e,n.current)))}function it(){var n=Aa.current
return null===n||((4194176&Ac)===Ac?null===La:!!((62914560&Ac)===Ac||536870912&Ac)&&n===La)}function at(){var n=hu.H
return hu.H=Xa,null===n?Xa:n}function ct(){var n=hu.A
return hu.A=Cc,n}function ft(){Uc=4,Dc||(4194176&Ac)!==Ac&&null!==Aa.current||(Bc=!0),!(134217727&$c)&&!(134217727&Vc)||null===Fc||lt(Fc,Ac,Gc,!1)}function st(n,e,l){var r=Oc
Oc|=2
var t=at(),u=ct()
Fc===n&&Ac===e||(nf=null,ut(n,e)),e=!1
var o=Uc
n:for(;;){try{if(0!==Lc&&null!==_c){var i=_c,a=Nc
switch(Lc){case 8:tt(),o=6
break n
case 3:case 2:case 6:null===Aa.current&&(e=!0)
var c=Lc
if(Lc=0,Nc=null,yt(n,i,a,c),l&&Bc){o=0
break n}break
default:c=Lc,Lc=0,Nc=null,yt(n,i,a,c)}}vt(),o=Uc
break}catch(f){ot(n,f)}1}return e&&n.shellSuspendCounter++,ac=ic=null,Oc=r,hu.H=t,hu.A=u,null===_c&&(Fc=null,Ac=0,V()),o}function vt(){for(;null!==_c;)pt(_c)}function dt(){for(;null!==_c&&!zi();)pt(_c)}function pt(n){var e=Rl(n.alternate,n,qc)
n.memoizedProps=n.pendingProps,null===e?bt(n):_c=e}function ht(n){var e=n,l=e.alternate
switch(e.tag){case 15:case 0:e=hl(l,e,e.pendingProps,e.type,void 0,Ac)
break
case 11:e=hl(l,e,e.pendingProps,e.type.render,e.ref,Ac)
break
case 5:Gn(e)
default:tr(l,e),e=Rl(l,e=_c=zt(e,qc),qc)}n.memoizedProps=n.pendingProps,null===e?bt(n):_c=e}function yt(n,e,l,t){ac=ic=null,Gn(e),Ta=null,Ia=0
var u=e.return
try{if(function(n,e,l,t,u){if(l.flags|=32768,null!==t&&"object"==typeof t&&"function"==typeof t.then){if(null!==(e=l.alternate)&&Fl(e,l,u,!0),null!==(l=Aa.current)){switch(l.tag){case 13:return null===La?ft():null===l.alternate&&0===Uc&&(Uc=3),l.flags&=-257,l.flags|=65536,l.lanes=u,t===Pa?l.flags|=16384:(null===(e=l.updateQueue)?l.updateQueue=new Set([t]):e.add(t),St(n,t,u)),!1
case 22:return l.flags|=65536,t===Pa?l.flags|=16384:(null===(e=l.updateQueue)?(e={transitions:null,markerInstances:null,retryQueue:new Set([t])},l.updateQueue=e):null===(l=e.retryQueue)?e.retryQueue=new Set([t]):l.add(t),St(n,t,u)),!1}throw Error(r(435,l.tag))}return St(n,t,u),ft(),!1}if(oa)return null!==(e=Aa.current)?(!(65536&e.flags)&&(e.flags|=256),e.flags|=65536,e.lanes=u,t!==ca&&$(T(n=Error(r(422),{cause:t}),l))):(t!==ca&&$(T(e=Error(r(423),{cause:t}),l)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,t=T(t,l),vn(n,u=tl(n.stateNode,t,u)),4!==Uc&&(Uc=2)),!1
var o=Error(r(520),{cause:t})
if(o=T(o,l),null===Yc?Yc=[o]:Yc.push(o),4!==Uc&&(Uc=2),null===e)return!0
t=T(t,l),l=e
do{switch(l.tag){case 3:return l.flags|=65536,n=u&-u,l.lanes|=n,vn(l,n=tl(l.stateNode,t,n)),!1
case 1:if(e=l.type,o=l.stateNode,!(128&l.flags||"function"!=typeof e.getDerivedStateFromError&&(null===o||"function"!=typeof o.componentDidCatch||null!==ef&&ef.has(o))))return l.flags|=65536,u&=-u,l.lanes|=u,ol(u=ul(u),n,l,t),vn(l,u),!1}l=l.return}while(null!==l)
return!1}(n,u,e,l,Ac))return Uc=1,ll(n,T(l,n.current)),_c=null,void 0}catch(o){if(null!==u)throw _c=u,o
return Uc=1,ll(n,T(l,n.current)),_c=null,void 0}32768&e.flags?(oa||1===t?n=!0:Bc||536870912&Ac?n=!1:(Dc=n=!0,(2===t||3===t||6===t)&&null!==(t=Aa.current)&&13===t.tag&&(t.flags|=16384)),wt(e,n)):bt(e)}function bt(n){var e=n
do{if(32768&e.flags)return wt(e,Dc),void 0
n=e.return
var l=lr(e.alternate,e,qc)
if(null!==l)return _c=l,void 0
if(null!==(e=e.sibling))return _c=e,void 0
_c=e=n}while(null!==e)
0===Uc&&(Uc=5)}function wt(n,e){do{var l=rr(n.alternate,n)
if(null!==l)return l.flags&=32767,_c=l,void 0
if(null!==(l=n.return)&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!e&&null!==(n=n.sibling))return _c=n,void 0
_c=n=l}while(null!==n)
Uc=6,_c=null}function mt(n,e,l,t,u,o,i,a,c,f){var s=hu.T,v=Hu()
try{Bu(2),hu.T=null,function(n,e,l,t,u,o,i,a){do{gt()}while(null!==rf)
if(6&Oc)throw Error(r(327))
var c=n.finishedWork
if(t=n.finishedLanes,null===c)return null
if(n.finishedWork=null,n.finishedLanes=0,c===n.current)throw Error(r(177))
n.callbackNode=null,n.callbackPriority=0,n.cancelPendingCommit=null
var f=c.lanes|c.childLanes
if(function(n,e,l,r,t,u){var o=n.pendingLanes
n.pendingLanes=l,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=l,n.entangledLanes&=l,n.errorRecoveryDisabledLanes&=l,n.shellSuspendCounter=0
var i=n.entanglements,a=n.expirationTimes,c=n.hiddenUpdates
for(l=o&~l;0<l;){var f=31-Ci(l),s=1<<f
i[f]=0,a[f]=-1
var v=c[f]
if(null!==v)for(c[f]=null,f=0;f<v.length;f++){var d=v[f]
null!==d&&(d.lane&=-536870913)}l&=~s}0!==r&&M(n,r,0),0!==u&&0===t&&0!==n.tag&&(n.suspendedLanes|=u&~(o&~e))}(n,t,f|=va,o,i,a),n===Fc&&(_c=Fc=null,Ac=0),!(10256&c.subtreeFlags)&&!(10256&c.flags)||lf||(lf=!0,uf=f,of=l,Ti(Li,function(){return gt(),null})),l=!!(15990&c.flags),15990&c.subtreeFlags||l?(l=hu.T,hu.T=null,o=Hu(),Bu(2),i=Oc,Oc|=4,function(n,e){for(Su(n.containerInfo),mc=e;null!==mc;)if(e=(n=mc).child,1028&n.subtreeFlags&&null!==e)e.return=n,mc=e
else for(;null!==mc;){var l=(n=mc).alternate
switch(e=n.flags,n.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&e&&null!==l){e=void 0
var t=n,u=l.memoizedProps
l=l.memoizedState
var o=t.stateNode
try{var i=el(t.type,u)
e=o.getSnapshotBeforeUpdate(i,l),o.m=e}catch(a){Et(t,t.return,a)}}break
case 3:1024&e&&_u&&So(n.stateNode.containerInfo)
break
default:if(1024&e)throw Error(r(163))}if(null!==(e=n.sibling)){e.return=n.return,mc=e
break}mc=n.return}return i=kc,kc=!1,i}(n,c),Cr(c,n),Cu(n.containerInfo),n.current=c,wr(n,c.alternate,c),Oi(),Oc=i,Bu(o),hu.T=l):n.current=c,lf?(lf=!1,rf=n,tf=t):kt(n,f),0===(f=n.pendingLanes)&&(ef=null),function(n){if(qi&&"function"==typeof qi.onCommitFiberRoot)try{qi.onCommitFiberRoot(Hi,n,void 0,!(128&~n.current.flags))}catch(e){}}(c.stateNode),J(n),null!==e)for(u=n.onRecoverableError,c=0;c<e.length;c++)u((f=e[c]).value,{componentStack:f.stack})
return!!(3&tf)&&gt(),f=n.pendingLanes,4194218&t&&42&f?n===cf?af++:(af=0,cf=n):af=0,Z(0),null}(n,e,l,t,v,u,o,i)}finally{hu.T=s,Bu(v)}}function kt(n,e){0===(n.pooledCacheLanes&=e)&&null!=(e=n.pooledCache)&&(n.pooledCache=null,Hl(e))}function gt(){if(null!==rf){var n=rf,e=uf
uf=0
var l=P(tf),t=32>l?32:l
l=hu.T
var u=Hu()
try{if(Bu(t),hu.T=null,null===rf)var o=!1
else{t=of,of=null
var i=rf,a=tf
if(rf=null,tf=0,6&Oc)throw Error(r(331))
var c=Oc
if(Oc|=4,Hr(i.current),Fr(i,i.current,a,t),Oc=c,Z(0),qi&&"function"==typeof qi.onPostCommitFiberRoot)try{qi.onPostCommitFiberRoot(Hi,i)}catch(f){}o=!0}return o}finally{Bu(u),hu.T=l,kt(n,e)}}return!1}function xt(n,e,l){e=T(l,e),null!==(n=fn(n,e=tl(n.stateNode,e,2),2))&&(C(n,2),J(n))}function Et(n,e,l){if(3===n.tag)xt(n,n,l)
else for(;null!==e;){if(3===e.tag){xt(e,n,l)
break}if(1===e.tag){var r=e.stateNode
if("function"==typeof e.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===ef||!ef.has(r))){n=T(l,n),null!==(r=fn(e,l=ul(2),2))&&(ol(l,r,e,n),C(r,2),J(r))
break}}e=e.return}}function St(n,e,l){var r=n.pingCache
if(null===r){r=n.pingCache=new zc
var t=new Set
r.set(e,t)}else void 0===(t=r.get(e))&&(t=new Set,r.set(e,t))
t.has(l)||(Hc=!0,t.add(l),n=Ct.bind(null,n,e,l),e.then(n,n))}function Ct(n,e,l){var r=n.pingCache
null!==r&&r.delete(e),n.pingedLanes|=n.suspendedLanes&l,n.warmLanes&=~l,Fc===n&&(Ac&l)===l&&(4===Uc||3===Uc&&(62914560&Ac)===Ac&&300>Fi()-Jc?!(2&Oc)&&ut(n,0):Wc|=l,Qc===Ac&&(Qc=0)),J(n)}function Mt(n,e){0===e&&(e=E()),null!==(n=Y(n,e))&&(C(n,e),J(n))}function jt(n){var e=n.memoizedState,l=0
null!==e&&(l=e.retryLane),Mt(n,l)}function Pt(n,e){var l=0
switch(n.tag){case 13:var t=n.stateNode,u=n.memoizedState
null!==u&&(l=u.retryLane)
break
case 19:t=n.stateNode
break
case 22:t=n.stateNode.k
break
default:throw Error(r(314))}null!==t&&t.delete(e),Mt(n,l)}function Rt(n,e,l,r){this.tag=n,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tt(n){return!(!(n=n.prototype)||!n.isReactComponent)}function It(n,l){var r=n.alternate
return null===r?((r=e(n.tag,l,n.key,n.mode)).elementType=n.elementType,r.type=n.type,r.stateNode=n.stateNode,r.alternate=n,n.alternate=r):(r.pendingProps=l,r.type=n.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=31457280&n.flags,r.childLanes=n.childLanes,r.lanes=n.lanes,r.child=n.child,r.memoizedProps=n.memoizedProps,r.memoizedState=n.memoizedState,r.updateQueue=n.updateQueue,l=n.dependencies,r.dependencies=null===l?null:{lanes:l.lanes,firstContext:l.firstContext},r.sibling=n.sibling,r.index=n.index,r.ref=n.ref,r.refCleanup=n.refCleanup,r}function zt(n,e){n.flags&=31457282
var l=n.alternate
return null===l?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=l.childLanes,n.lanes=l.lanes,n.child=l.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=l.memoizedProps,n.memoizedState=l.memoizedState,n.updateQueue=l.updateQueue,n.type=l.type,e=l.dependencies,n.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n}function Ot(n,l,t,u,o,i){var a=0
if(u=n,"function"==typeof n)Tt(n)&&(a=1)
else if("string"==typeof n)a=li&&yi?ri(n,t,na.current)?26:gi(n)?27:5:li?ri(n,t,na.current)?26:5:yi&&gi(n)?27:5
else n:switch(n){case nu:return Ft(t.children,o,i,l)
case eu:a=8,o|=24
break
case lu:return(n=e(12,t,l,2|o)).elementType=lu,n.lanes=i,n
case iu:return(n=e(13,t,l,o)).elementType=iu,n.lanes=i,n
case au:return(n=e(19,t,l,o)).elementType=au,n.lanes=i,n
case su:return _t(t,o,i,l)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case ru:case uu:a=10
break n
case tu:a=9
break n
case ou:a=11
break n
case cu:a=14
break n
case fu:a=16,u=null
break n}a=29,t=Error(r(130,null===n?"null":typeof n,"")),u=null}return(l=e(a,t,l,o)).elementType=n,l.type=u,l.lanes=i,l}function Ft(n,l,r,t){return(n=e(7,n,t,l)).lanes=r,n}function _t(n,l,t,u){(n=e(22,n,u,l)).elementType=su,n.lanes=t
var o={v:1,p:1,M:null,k:null,j:null,C:null,detach:function(){var n=o.C
if(null===n)throw Error(r(456))
if(!(2&o.p)){var e=Y(n,2)
null!==e&&(o.p|=2,Xr(e,0,2))}},attach:function(){var n=o.C
if(null===n)throw Error(r(456))
if(2&o.p){var e=Y(n,2)
null!==e&&(o.p&=-3,Xr(e,0,2))}}}
return n.stateNode=o,n}function At(n,l,r){return(n=e(6,n,null,l)).lanes=r,n}function Lt(n,l,r){return(l=e(4,null!==n.children?n.children:[],n.key,l)).lanes=r,l.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},l}function Nt(n,e,l,r,t,u,o,i){this.tag=1,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=Ou,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=S(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=S(0),this.hiddenUpdates=S(null),this.identifierPrefix=r,this.onUncaughtError=t,this.onCaughtError=u,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.incompleteTransitions=new Map}function Dt(n,l,r,t,u,o,i,a,c,f,s,v){return n=new Nt(n,l,r,i,a,c,f,v),l=1,!0===o&&(l|=24),o=e(3,null,null,l),n.current=o,o.stateNode=n,(l=Bl()).refCount++,n.pooledCache=l,l.refCount++,o.memoizedState={element:t,isDehydrated:r,cache:l},on(o),n}function Bt(n){return n?n=Si:Si}function Ht(n){var e=n.h
if(void 0===e){if("function"==typeof n.render)throw Error(r(188))
throw n=Object.keys(n).join(","),Error(r(268,n))}return null===(n=null!==(n=v(e))?d(n):null)?null:gu(n.stateNode)}function qt(n,e,l,r,t,u){t=Bt(t),null===r.context?r.context=t:r.pendingContext=t,(r=cn(e)).payload={element:l},null!==(u=void 0===u?null:u)&&(r.callback=u),null!==(l=fn(n,r,e))&&(Xr(l,0,e),sn(l,n,e))}function Ut(n,e){if(null!==(n=n.memoizedState)&&null!==n.dehydrated){var l=n.retryLane
n.retryLane=0!==l&&l<e?l:e}}function $t(n,e){Ut(n,e),(n=n.alternate)&&Ut(n,e)}var Vt,Wt,Gt={},Qt=G(),Yt=function(){return Ln||(Ln=1,Vn.exports=function(){return An||(An=1,function(n){function e(n,e){var l=n.length
n.push(e)
n:for(;0<l;){var r=l-1>>>1,u=n[r]
if(!(0<t(u,e)))break n
n[r]=e,n[l]=u,l=r}}function l(n){return 0===n.length?null:n[0]}function r(n){if(0===n.length)return null
var e=n[0],l=n.pop()
if(l!==e){n[0]=l
n:for(var r=0,u=n.length,o=u>>>1;r<o;){var i=2*(r+1)-1,a=n[i],c=i+1,f=n[c]
if(0>t(a,l))c<u&&0>t(f,a)?(n[r]=f,n[c]=l,r=c):(n[r]=a,n[i]=l,r=i)
else{if(!(c<u&&0>t(f,l)))break n
n[r]=f,n[c]=l,r=c}}}return e}function t(n,e){var l=n.sortIndex-e.sortIndex
return 0!==l?l:n.id-e.id}function u(n){for(var t=l(y);null!==t;){if(null===t.callback)r(y)
else{if(!(t.startTime<=n))break
r(y),t.sortIndex=t.expirationTime,e(h,t)}t=l(y)}}function o(n){if(x=!1,u(n),!g)if(null!==l(h))g=!0,c()
else{var e=l(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-R<P)}function a(){if(M){var e=n.unstable_now()
R=e
var t=!0
try{n:{g=!1,x&&(x=!1,S(j),j=-1),k=!0
var a=m
try{e:{for(u(e),w=l(h);null!==w&&!(w.expirationTime>e&&i());){var c=w.callback
if("function"==typeof c){w.callback=null,m=w.priorityLevel
var s=c(w.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){w.callback=s,u(e),t=!0
break e}w===l(h)&&r(h),u(e)}else r(h)
w=l(h)}if(null!==w)t=!0
else{var v=l(y)
null!==v&&f(o,v.startTime-e),t=!1}}break n}finally{w=null,m=a,k=!1}t=void 0}}finally{t?p():M=!1}}}function c(){M||(M=!0,p())}function f(e,l){j=E(function(){e(n.unstable_now())},l)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],b=1,w=null,m=3,k=!1,g=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,M=!1,j=-1,P=5,R=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var T=new MessageChannel,I=T.port2
T.port1.onmessage=a,p=function(){I.postMessage(null)}}else p=function(){E(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){g||k||(g=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return l(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var l=m
m=e
try{return n()}finally{m=l}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var l=m
m=n
try{return e()}finally{m=l}},n.unstable_scheduleCallback=function(r,t,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,r){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return r={id:b++,callback:t,priorityLevel:r,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(r.sortIndex=u,e(y,r),null===l(h)&&r===l(y)&&(x?(S(j),j=-1):x=!0,f(o,u-i))):(r.sortIndex=a,e(h,r),g||k||(g=!0,c())),r},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=m
return function(){var l=m
m=e
try{return n.apply(this,arguments)}finally{m=l}}}}(Wn)),Wn}()),Vn.exports}(),Kt=Object.assign,Xt=Symbol.for("react.element"),Jt=Symbol.for("react.transitional.element"),Zt=Symbol.for("react.portal"),nu=Symbol.for("react.fragment"),eu=Symbol.for("react.strict_mode"),lu=Symbol.for("react.profiler"),ru=Symbol.for("react.provider"),tu=Symbol.for("react.consumer"),uu=Symbol.for("react.context"),ou=Symbol.for("react.forward_ref"),iu=Symbol.for("react.suspense"),au=Symbol.for("react.suspense_list"),cu=Symbol.for("react.memo"),fu=Symbol.for("react.lazy"),su=Symbol.for("react.offscreen"),vu=Symbol.for("react.memo_cache_sentinel"),du=Symbol.iterator,pu=Symbol.for("react.client.reference"),hu=Qt.P,yu=!1,bu=Array.isArray,wu=n.rendererVersion,mu=n.rendererPackageName,ku=n.extraDevToolsConfig,gu=n.getPublicInstance,xu=n.getRootHostContext,Eu=n.getChildHostContext,Su=n.prepareForCommit,Cu=n.resetAfterCommit,Mu=n.createInstance,ju=n.appendInitialChild,Pu=n.finalizeInitialChildren,Ru=n.shouldSetTextContent,Tu=n.createTextInstance,Iu=n.scheduleTimeout,zu=n.cancelTimeout,Ou=n.noTimeout,Fu=n.isPrimaryRenderer,_u=n.supportsMutation,Au=n.supportsPersistence,Lu=n.supportsHydration,Nu=n.getInstanceFromNode,Du=n.preparePortalMount,Bu=n.setCurrentUpdatePriority,Hu=n.getCurrentUpdatePriority,qu=n.resolveUpdatePriority,Uu=n.shouldAttemptEagerTransition,$u=n.detachDeletedInstance,Vu=n.maySuspendCommit,Wu=n.preloadInstance,Gu=n.startSuspendingCommit,Qu=n.suspendInstance,Yu=n.waitForCommitToBeReady,Ku=n.NotPendingTransition,Xu=n.HostTransitionContext,Ju=n.resetFormInstance,Zu=n.supportsMicrotasks,no=n.scheduleMicrotask,eo=n.supportsTestSelectors,lo=n.findFiberRoot,ro=n.getBoundingRect,to=n.getTextContent,uo=n.isHiddenSubtree,oo=n.matchAccessibilityRole,io=n.setFocusIfFocusable,ao=n.setupIntersectionObserver,co=n.appendChild,fo=n.appendChildToContainer,so=n.commitTextUpdate,vo=n.commitMount,po=n.commitUpdate,ho=n.insertBefore,yo=n.insertInContainerBefore,bo=n.removeChild,wo=n.removeChildFromContainer,mo=n.resetTextContent,ko=n.hideInstance,go=n.hideTextInstance,xo=n.unhideInstance,Eo=n.unhideTextInstance,So=n.clearContainer,Co=n.cloneInstance,Mo=n.createContainerChildSet,jo=n.appendChildToContainerChildSet,Po=n.finalizeContainerChildren,Ro=n.replaceContainerChildren,To=n.cloneHiddenInstance,Io=n.cloneHiddenTextInstance,zo=n.isSuspenseInstancePending,Oo=n.isSuspenseInstanceFallback,Fo=n.getSuspenseInstanceFallbackErrorDetails,_o=n.registerSuspenseInstanceRetry,Ao=n.canHydrateFormStateMarker,Lo=n.isFormStateMarkerMatching,No=n.getNextHydratableSibling,Do=n.getFirstHydratableChild,Bo=n.getFirstHydratableChildWithinContainer,Ho=n.getFirstHydratableChildWithinSuspenseInstance,qo=n.canHydrateInstance,Uo=n.canHydrateTextInstance,$o=n.canHydrateSuspenseInstance,Vo=n.hydrateInstance,Wo=n.hydrateTextInstance,Go=n.hydrateSuspenseInstance,Qo=n.getNextHydratableInstanceAfterSuspenseInstance,Yo=n.commitHydratedContainer,Ko=n.commitHydratedSuspenseInstance,Xo=n.clearSuspenseBoundary,Jo=n.clearSuspenseBoundaryFromContainer,Zo=n.shouldDeleteUnhydratedTailInstances,ni=n.validateHydratableInstance,ei=n.validateHydratableTextInstance,li=n.supportsResources,ri=n.isHostHoistableType,ti=n.getHoistableRoot,ui=n.getResource,oi=n.acquireResource,ii=n.releaseResource,ai=n.hydrateHoistable,ci=n.mountHoistable,fi=n.unmountHoistable,si=n.createHoistableInstance,vi=n.prepareToCommitHoistables,di=n.mayResourceSuspendCommit,pi=n.preloadResource,hi=n.suspendResource,yi=n.supportsSingletons,bi=n.resolveSingletonInstance,wi=n.clearSingleton,mi=n.acquireSingletonInstance,ki=n.releaseSingletonInstance,gi=n.isHostSingletonType,xi=[],Ei=-1,Si={},Ci=Math.clz32?Math.clz32:function(n){return 0==(n>>>=0)?32:31-(Mi(n)/ji|0)|0},Mi=Math.log,ji=Math.LN2,Pi=128,Ri=4194304,Ti=Yt.unstable_scheduleCallback,Ii=Yt.unstable_cancelCallback,zi=Yt.unstable_shouldYield,Oi=Yt.unstable_requestPaint,Fi=Yt.unstable_now,_i=Yt.unstable_ImmediatePriority,Ai=Yt.unstable_UserBlockingPriority,Li=Yt.unstable_NormalPriority,Ni=Yt.unstable_IdlePriority,Di=Yt.log,Bi=Yt.unstable_setDisableYieldValue,Hi=null,qi=null,Ui="function"==typeof Object.is?Object.is:function(n,e){return n===e&&(0!==n||1/n==1/e)||n!=n&&e!=e},$i=new WeakMap,Vi=[],Wi=0,Gi=null,Qi=0,Yi=[],Ki=0,Xi=null,Ji=1,Zi="",na=h(null),ea=h(null),la=h(null),ra=h(null),ta=null,ua=null,oa=!1,ia=null,aa=!1,ca=Error(r(519)),fa=[],sa=0,va=0,da=null,pa=null,ha=!1,ya=!1,ba=!1,wa=0,ma=null,ka=0,ga=0,xa=null,Ea=!1,Sa=!1,Ca=Object.prototype.hasOwnProperty,Ma=Error(r(460)),ja=Error(r(474)),Pa={then:function(){}},Ra=null,Ta=null,Ia=0,za=Mn(!0),Oa=Mn(!1),Fa=h(null),_a=h(0),Aa=h(null),La=null,Na=h(0),Da=0,Ba=null,Ha=null,qa=null,Ua=!1,$a=!1,Va=!1,Wa=0,Ga=0,Qa=null,Ya=0,Ka=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}},Xa={readContext:Ll,use:Xn,useCallback:_n,useContext:_n,useEffect:_n,useImperativeHandle:_n,useLayoutEffect:_n,useInsertionEffect:_n,useMemo:_n,useReducer:_n,useRef:_n,useState:_n,useDebugValue:_n,useDeferredValue:_n,useTransition:_n,useSyncExternalStore:_n,useId:_n}
Xa.useCacheRefresh=_n,Xa.useMemoCache=_n,Xa.useHostTransitionStatus=_n,Xa.useFormState=_n,Xa.useActionState=_n,Xa.useOptimistic=_n
var Ja={readContext:Ll,use:Xn,useCallback:function(n,e){return Qn().memoizedState=[n,void 0===e?null:e],n},useContext:Ll,useEffect:je,useImperativeHandle:function(n,e,l){l=null!=l?l.concat([n]):null,Ce(4194308,4,Ie.bind(null,e,n),l)},useLayoutEffect:function(n,e){return Ce(4194308,4,n,e)},useInsertionEffect:function(n,e){Ce(4,2,n,e)},useMemo:function(n,e){var l=Qn()
e=void 0===e?null:e
var r=n()
if(Va){R(!0)
try{n()}finally{R(!1)}}return l.memoizedState=[r,e],r},useReducer:function(n,e,l){var r=Qn()
if(void 0!==l){var t=l(e)
if(Va){R(!0)
try{l(e)}finally{R(!1)}}}else t=e
return r.memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:t},r.queue=n,n=n.dispatch=Ve.bind(null,Ba,n),[r.memoizedState,n]},useRef:function(n){return n={current:n},Qn().memoizedState=n},useState:function(n){var e=(n=ce(n)).queue,l=We.bind(null,Ba,e)
return e.dispatch=l,[n.memoizedState,l]},useDebugValue:Oe,useDeferredValue:function(n,e){return Ae(Qn(),n,e)},useTransition:function(){var n=ce(!1)
return n=Ne.bind(null,Ba,n.queue,!0,!1),Qn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,e,l){var t=Ba,u=Qn()
if(oa){if(void 0===l)throw Error(r(407))
l=l()}else{if(l=e(),null===Fc)throw Error(r(349))
60&Ac||te(t,e,l)}u.memoizedState=l
var o={value:l,getSnapshot:e}
return u.queue=o,je(oe.bind(null,t,o,n),[n]),t.flags|=2048,Ee(9,ue.bind(null,t,o,l,e),{destroy:void 0},null),l},useId:function(){var n=Qn(),e=Fc.identifierPrefix
if(oa){var l=Zi
e=":"+e+"R"+(l=(Ji&~(1<<32-Ci(Ji)-1)).toString(32)+l),0<(l=Wa++)&&(e+="H"+l.toString(32)),e+=":"}else e=":"+e+"r"+(l=Ya++).toString(32)+":"
return n.memoizedState=e},useCacheRefresh:function(){return Qn().memoizedState=$e.bind(null,Ba)}}
Ja.useMemoCache=Jn,Ja.useHostTransitionStatus=Be,Ja.useFormState=we,Ja.useActionState=we,Ja.useOptimistic=function(n){var e=Qn()
e.memoizedState=e.baseState=n
var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return e.queue=l,e=Qe.bind(null,Ba,!0,l),l.dispatch=e,[n,e]}
var Za={readContext:Ll,use:Xn,useCallback:Fe,useContext:Ll,useEffect:Pe,useImperativeHandle:ze,useInsertionEffect:Re,useLayoutEffect:Te,useMemo:_e,useReducer:ne,useRef:Se,useState:function(){return ne(Zn)},useDebugValue:Oe,useDeferredValue:function(n,e){return Le(Yn(),Ha.memoizedState,n,e)},useTransition:function(){var n=ne(Zn)[0],e=Yn().memoizedState
return["boolean"==typeof n?n:Kn(n),e]},useSyncExternalStore:re,useId:He}
Za.useCacheRefresh=qe,Za.useMemoCache=Jn,Za.useHostTransitionStatus=Be,Za.useFormState=me,Za.useActionState=me,Za.useOptimistic=function(n,e){return fe(Yn(),0,n,e)}
var nc={readContext:Ll,use:Xn,useCallback:Fe,useContext:Ll,useEffect:Pe,useImperativeHandle:ze,useInsertionEffect:Re,useLayoutEffect:Te,useMemo:_e,useReducer:le,useRef:Se,useState:function(){return le(Zn)},useDebugValue:Oe,useDeferredValue:function(n,e){var l=Yn()
return null===Ha?Ae(l,n,e):Le(l,Ha.memoizedState,n,e)},useTransition:function(){var n=le(Zn)[0],e=Yn().memoizedState
return["boolean"==typeof n?n:Kn(n),e]},useSyncExternalStore:re,useId:He}
nc.useCacheRefresh=qe,nc.useMemoCache=Jn,nc.useHostTransitionStatus=Be,nc.useFormState=xe,nc.useActionState=xe,nc.useOptimistic=function(n,e){var l=Yn()
return null!==Ha?fe(l,0,n,e):(l.baseState=n,[n,l.queue.dispatch])}
var ec={isMounted:function(n){return!!(n=n.h)&&f(n)===n},enqueueSetState:function(n,e,l){n=n.h
var r=Yr(),t=cn(r)
t.payload=e,null!=l&&(t.callback=l),null!==(e=fn(n,t,r))&&(Xr(e,0,r),sn(e,n,r))},enqueueReplaceState:function(n,e,l){n=n.h
var r=Yr(),t=cn(r)
t.tag=1,t.payload=e,null!=l&&(t.callback=l),null!==(e=fn(n,t,r))&&(Xr(e,0,r),sn(e,n,r))},enqueueForceUpdate:function(n,e){n=n.h
var l=Yr(),r=cn(l)
r.tag=2,null!=e&&(r.callback=e),null!==(e=fn(n,r,l))&&(Xr(e,0,l),sn(e,n,l))}},lc="function"==typeof reportError?reportError:function(n){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof n&&null!==n&&"string"==typeof n.message?String(n.message):String(n),error:n})
if(!window.dispatchEvent(e))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",n),void 0
void 0},rc=Error(r(461)),tc=!1,uc={dehydrated:null,treeContext:null,retryLane:0},oc=h(null),ic=null,ac=null,cc="undefined"!=typeof AbortController?AbortController:function(){var n=[],e=this.signal={aborted:!1,addEventListener:function(e,l){n.push(l)}}
this.abort=function(){e.aborted=!0,n.forEach(function(n){return n()})}},fc=Yt.unstable_scheduleCallback,sc=Yt.unstable_NormalPriority,vc={$$typeof:uu,Consumer:null,Provider:null,o:null,i:null,R:0},dc=hu.S
hu.S=function(n,e){"object"==typeof e&&null!==e&&"function"==typeof e.then&&function(n,e){if(null===ma){var l=ma=[]
ka=0,ga=tn(),xa={status:"pending",value:void 0,then:function(n){l.push(n)}}}return ka++,e.then(un,un),e}(0,e),null!==dc&&dc(n,e)}
var pc=h(null),hc=!1,yc=!1,bc=!1,wc="function"==typeof WeakSet?WeakSet:Set,mc=null,kc=!1,gc=null,xc=!1,Ec=null,Sc=8192,Cc={getCacheForType:function(n){var e=Ll(vc),l=e.data.get(n)
return void 0===l&&(l=n(),e.data.set(n,l)),l}},Mc=0,jc=1,Pc=2,Rc=3,Tc=4
if("function"==typeof Symbol&&Symbol.for){var Ic=Symbol.for
Mc=Ic("selector.component"),jc=Ic("selector.has_pseudo_class"),Pc=Ic("selector.role"),Rc=Ic("selector.test_id"),Tc=Ic("selector.text")}var zc="function"==typeof WeakMap?WeakMap:Map,Oc=0,Fc=null,_c=null,Ac=0,Lc=0,Nc=null,Dc=!1,Bc=!1,Hc=!1,qc=0,Uc=0,$c=0,Vc=0,Wc=0,Gc=0,Qc=0,Yc=null,Kc=null,Xc=!1,Jc=0,Zc=1/0,nf=null,ef=null,lf=!1,rf=null,tf=0,uf=0,of=null,af=0,cf=null
return Gt.attemptContinuousHydration=function(n){if(13===n.tag){var e=Y(n,67108864)
null!==e&&Xr(e,0,67108864),$t(n,67108864)}},Gt.attemptHydrationAtCurrentPriority=function(n){if(13===n.tag){var e=Yr(),l=Y(n,e)
null!==l&&Xr(l,0,e),$t(n,e)}},Gt.attemptSynchronousHydration=function(n){switch(n.tag){case 3:if((n=n.stateNode).current.memoizedState.isDehydrated){var e=w(n.pendingLanes)
if(0!==e){for(n.pendingLanes|=2,n.entangledLanes|=2;e;){var l=1<<31-Ci(e)
n.entanglements[1]|=l,e&=~l}J(n),!(6&Oc)&&(Zc=Fi()+500,Z(0))}}break
case 13:null!==(e=Y(n,2))&&Xr(e,0,2),rt(),$t(n,2)}},Gt.batchedUpdates=function(n,e){return n(e)},Gt.createComponentSelector=function(n){return{$$typeof:Mc,value:n}},Gt.createContainer=function(n,e,l,r,t,u,o,i,a,c){return Dt(n,e,!1,null,0,r,u,o,i,a,0,null)},Gt.createHasPseudoClassSelector=function(n){return{$$typeof:jc,value:n}},Gt.createHydrationContainer=function(n,e,l,r,t,u,o,i,a,c,f,s,v){return(n=Dt(l,r,!0,n,0,u,i,a,c,f,0,v)).context=Bt(null),l=n.current,(t=cn(r=Yr())).callback=null!=e?e:null,fn(l,t,r),n.current.lanes=r,C(n,r),J(n),n},Gt.createPortal=function(n,e,l){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:Zt,key:null==r?null:""+r,children:n,containerInfo:e,implementation:l}},Gt.createRoleSelector=function(n){return{$$typeof:Pc,value:n}},Gt.createTestNameSelector=function(n){return{$$typeof:Rc,value:n}},Gt.createTextSelector=function(n){return{$$typeof:Tc,value:n}},Gt.defaultOnCaughtError=function(n){void 0},Gt.defaultOnRecoverableError=function(n){lc(n)},Gt.defaultOnUncaughtError=function(n){lc(n)},Gt.deferredUpdates=function(n){var e=hu.T,l=Hu()
try{return Bu(32),hu.T=null,n()}finally{Bu(l),hu.T=e}},Gt.discreteUpdates=function(n,e,l,r,t){var u=hu.T,o=Hu()
try{return Bu(2),hu.T=null,n(e,l,r,t)}finally{Bu(o),hu.T=u,0===Oc&&(Zc=Fi()+500)}},Gt.findAllNodes=Qr,Gt.findBoundingRects=function(n,e){if(!eo)throw Error(r(363))
e=Qr(n,e),n=[]
for(var l=0;l<e.length;l++)n.push(ro(e[l]))
for(e=n.length-1;0<e;e--)for(var t=(l=n[e]).x,u=t+l.width,o=l.y,i=o+l.height,a=e-1;0<=a;a--)if(e!==a){var c=n[a],f=c.x,s=f+c.width,v=c.y,d=v+c.height
if(t>=f&&o>=v&&u<=s&&i<=d){n.splice(e,1)
break}if(!(t!==f||l.width!==c.width||d<o||v>i)){v>o&&(c.height+=v-o,c.y=o),d<i&&(c.height=i-v),n.splice(e,1)
break}if(!(o!==v||l.height!==c.height||s<t||f>u)){f>t&&(c.width+=f-t,c.x=t),s<u&&(c.width=u-f),n.splice(e,1)
break}}return n},Gt.findHostInstance=Ht,Gt.findHostInstanceWithNoPortals=function(n){return null===(n=null!==(n=v(n))?p(n):null)?null:gu(n.stateNode)},Gt.findHostInstanceWithWarning=function(n){return Ht(n)},Gt.flushPassiveEffects=gt,Gt.flushSyncFromReconciler=function(n){var e=Oc
Oc|=1
var l=hu.T,r=Hu()
try{if(Bu(2),hu.T=null,n)return n()}finally{Bu(r),hu.T=l,!(6&(Oc=e))&&Z(0)}},Gt.flushSyncWork=rt,Gt.focusWithin=function(n,e){if(!eo)throw Error(r(363))
for(e=Gr(n=$r(n),e),e=Array.from(e),n=0;n<e.length;){var l=e[n++],t=l.tag
if(!uo(l)){if((5===t||26===t||27===t)&&io(l.stateNode))return!0
for(l=l.child;null!==l;)e.push(l),l=l.sibling}}return!1},Gt.getFindAllNodesFailureDescription=function(n,e){if(!eo)throw Error(r(363))
var l=0,t=[]
n=[$r(n),0]
for(var u=0;u<n.length;){var o=n[u++],i=o.tag,a=n[u++],c=e[a]
if((5!==i&&26!==i&&27!==i||!uo(o))&&(Vr(o,c)&&(t.push(Wr(c)),++a>l&&(l=a)),a<e.length))for(o=o.child;null!==o;)n.push(o,a),o=o.sibling}if(l<e.length){for(n=[];l<e.length;l++)n.push(Wr(e[l]))
return"findAllNodes was able to match part of the selector:\n  "+t.join(" > ")+"\n\nNo matching component was found for:\n  "+n.join(" > ")}return null},Gt.getPublicRootInstance=function(n){if(!(n=n.current).child)return null
switch(n.child.tag){case 27:case 5:return gu(n.child.stateNode)
default:return n.child.stateNode}},Gt.injectIntoDevTools=function(){var n={bundleType:0,version:wu,rendererPackageName:mu,currentDispatcherRef:hu,findFiberByHostInstance:Nu,reconcilerVersion:"19.0.0"}
if(null!==ku&&(n.rendererConfig=ku),"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)n=!1
else{var e=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(e.isDisabled||!e.supportsFiber)n=!0
else{try{Hi=e.inject(n),qi=e}catch(l){}n=!!e.checkDCE}}return n},Gt.isAlreadyRendering=function(){return!1},Gt.observeVisibleRects=function(n,e,l,t){if(!eo)throw Error(r(363))
n=Qr(n,e)
var u=ao(n,l,t).disconnect
return{disconnect:function(){u()}}},Gt.shouldError=function(){return null},Gt.shouldSuspend=function(){return!1},Gt.startHostTransition=function(n,e,t,u){if(5!==n.tag)throw Error(r(476))
var o=De(n).queue
Ne(n,o,e,Ku,null===t?l:function(){var e=De(n).next.queue
return Ge(n,e,{},Yr()),t(u)})},Gt.updateContainer=function(n,e,l,r){var t=e.current,u=Yr()
return qt(t,u,n,e,l,r),u},Gt.updateContainerSync=function(n,e,l,r){return 0===e.tag&&gt(),qt(e.current,2,n,e,l,r),2},Gt},n.exports.default=n.exports,Object.defineProperty(n.exports,"I",{value:!0})),$n.exports
var n}function e(n){let e=n.root
for(;e.getState().previousRoot;)e=e.getState().previousRoot
return e}function l(n){const e=Y.useRef(n)
return ee(()=>{e.current=n},[n]),e}function r({set:n}){return ee(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}function t(n){var e
const l="undefined"!=typeof window?null!=(e=window.devicePixelRatio)?e:2:1
return Array.isArray(n)?Math.min(Math.max(n[0],l),n[1]):n}function u(n){var e
return null==(e=n.O)?void 0:e.root.getState()}function o(n){const e={}
for(const l in n)te.includes(l)||(e[l]=n[l])
return e}function i(n,e,l,r){const t=n
let u=null==t?void 0:t.O
return u||(u={root:e,type:l,parent:null,children:[],props:o(r),object:t,eventCount:0,handlers:{},isHidden:!1},t&&(t.O=u)),u}function a(n,e){let l=n[e]
if(!e.includes("-"))return{root:n,key:e,target:l}
l=n
for(const t of e.split("-")){var r
e=t,n=l,l=null==(r=l)?void 0:r[e]}return{root:n,key:e,target:l}}function c(n,e){if(re.str(e.props.attach)){if(ue.test(e.props.attach)){const l=e.props.attach.replace(ue,""),{root:r,key:t}=a(n.object,l)
Array.isArray(r[t])||(r[t]=[])}const{root:l,key:r}=a(n.object,e.props.attach)
e.previousAttach=l[r],l[r]=e.object}else re.fun(e.props.attach)&&(e.previousAttach=e.props.attach(n.object,e.object))}function f(n,e){if(re.str(e.props.attach)){const{root:l,key:r}=a(n.object,e.props.attach),t=e.previousAttach
void 0===t?delete l[r]:l[r]=t}else null==e.previousAttach?void 0:e.previousAttach(n.object,e.object)
delete e.previousAttach}function s(n){let e=ie.get(n.constructor)
try{e||(e=new n.constructor,ie.set(n.constructor,e))}catch(Ue){}return e}function v(n,l){var r
const t=n.O,u=t&&e(t).getState(),o=null==t?void 0:t.eventCount
for(const e in l){let r=l[e]
if(oe.includes(e))continue
if(t&&ce.test(e)){"function"==typeof r?t.handlers[e]=r:delete t.handlers[e],t.eventCount=Object.keys(t.handlers).length
continue}if(void 0===r)continue
let{root:o,key:c,target:f}=a(n,e)
if(f instanceof hn&&r instanceof hn)f.mask=r.mask
else if(f instanceof yn&&ne(r))f.set(r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"function"==typeof f.copy&&null!=r&&r.constructor&&f.constructor===r.constructor)f.copy(r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&Array.isArray(r))"function"==typeof f.fromArray?f.fromArray(r):f.set(...r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"number"==typeof r)"function"==typeof f.setScalar?f.setScalar(r):f.set(r)
else{var i
o[c]=r,u&&!u.linear&&ae.includes(c)&&null!=(i=o[c])&&i.isTexture&&o[c].format===bn&&o[c].type===wn&&(o[c].colorSpace=sn)}}if(null!=t&&t.parent&&null!=u&&u.internal&&null!=(r=t.object)&&r.isObject3D&&o!==t.eventCount){const n=t.object,e=u.internal.interaction.indexOf(n)
e>-1&&u.internal.interaction.splice(e,1),t.eventCount&&null!==n.raycast&&u.internal.interaction.push(n)}return t&&void 0===t.props.attach&&(t.object.isBufferGeometry?t.props.attach="geometry":t.object.isMaterial&&(t.props.attach="material")),t&&d(t),n}function d(n){var e
if(!n.parent)return
null==n.props.onUpdate?void 0:n.props.onUpdate(n.object)
const l=null==(e=n.root)||null==e.getState?void 0:e.getState()
l&&0===l.internal.frames&&l.invalidate()}function p(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function h(n,e,l,r){const t=l.get(e)
t&&(l.delete(e),0===l.size&&(n.delete(r),t.target.releasePointerCapture(r)))}function y(){const n=Y.useContext(ve)
if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!")
return n}function b(n=n=>n,e){return y()(n,e)}function w(n,e=0){const r=y(),t=r.getState().internal.subscribe,u=l(n)
return ee(()=>t(u,e,r),[e,t,r]),null}function m(n){if("function"==typeof n){const e=""+ye++
return de[e]=n,e}Object.assign(de,n)}function k(n,e){const l=he(n),r=de[l]
if("primitive"!==n&&!r)throw new Error(`R3F: ${l} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`)
if("primitive"===n&&!e.object)throw new Error("R3F: Primitives without 'object' are invalid!")
if(void 0!==e.args&&!Array.isArray(e.args))throw new Error("R3F: The args prop must be an array!")}function g(n){var e
n.isHidden&&(n.props.attach&&null!=(e=n.parent)&&e.object?c(n.parent,n):fe(n.object)&&!1!==n.props.visible&&(n.object.visible=!0),n.isHidden=!1,d(n))}function x(n,e,l){const r=e.root.getState()
if(n.parent||n.object===r.scene){if(!e.object){var t,u
const n=de[he(e.type)]
e.object=null!=(t=e.props.object)?t:new n(...null!=(u=e.props.args)?u:[]),e.object.O=e}if(v(e.object,e.props),e.props.attach)c(n,e)
else if(fe(e.object)&&fe(n.object)){const r=n.object.children.indexOf(null==l?void 0:l.object)
if(l&&-1!==r){const l=n.object.children.indexOf(e.object)
if(-1!==l){n.object.children.splice(l,1)
const t=l<r?r-1:r
n.object.children.splice(t,0,e.object)}else e.object.parent=n.object,n.object.children.splice(r,0,e.object),e.object.dispatchEvent({type:"added"}),n.object.dispatchEvent({type:"childadded",child:e.object})}else n.object.add(e.object)}for(const n of e.children)x(e,n)
d(e)}}function E(n,e){e&&(e.parent=n,n.children.push(e),x(n,e))}function S(n,e,l){if(!e||!l)return
e.parent=n
const r=n.children.indexOf(l);-1!==r?n.children.splice(r,0,e):n.children.push(e),x(n,e,l)}function C(n){if("function"==typeof n.dispose){const e=()=>{try{n.dispose()}catch{}}
"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?e():Jn.unstable_scheduleCallback(Jn.unstable_IdlePriority,e)}}function M(n,l,r){if(!l)return
l.parent=null
const t=n.children.indexOf(l);-1!==t&&n.children.splice(t,1),l.props.attach?f(n,l):fe(l.object)&&fe(n.object)&&(n.object.remove(l.object),function(n,e){const{internal:l}=n.getState()
l.interaction=l.interaction.filter(n=>n!==e),l.initialHits=l.initialHits.filter(n=>n!==e),l.hovered.forEach((n,r)=>{n.eventObject!==e&&n.object!==e||l.hovered.delete(r)}),l.capturedMap.forEach((n,r)=>{h(l.capturedMap,e,n,r)})}(e(l),l.object))
const u=null!==l.props.dispose&&!1!==r
for(let e=l.children.length-1;e>=0;e--)M(l,l.children[e],u)
l.children.length=0,delete l.object.O,u&&"primitive"!==l.type&&"Scene"!==l.object.type&&C(l.object),void 0===r&&d(l)}function j(n,e){for(const l of[n,n.alternate])if(null!==l)if("function"==typeof l.ref){null==l.refCleanup?void 0:l.refCleanup()
const n=l.ref(e)
"function"==typeof n&&(l.refCleanup=n)}else l.ref&&(l.ref.current=e)}function P({store:n,children:e,onCreated:l,rootElement:r}){return ee(()=>{const e=n.getState()
e.set(n=>({internal:{...n.internal,active:!0}})),l&&l(e),n.getState().events.connected||null==e.events.connect||e.events.connect(r)},[]),W.jsx(ve.Provider,{value:n,children:e})}function R(n,e){const l=xe.get(n),r=null==l?void 0:l.fiber
if(r){const e=null==l?void 0:l.store.getState()
e&&(e.internal.active=!1),ge.updateContainer(null,r,null,()=>{e&&setTimeout(()=>{try{var l,r,t,u
null==e.events.disconnect?void 0:e.events.disconnect(),null==(l=e.gl)||null==(r=l.renderLists)||null==r.dispose||r.dispose(),null==(t=e.gl)||null==t.forceContextLoss||t.forceContextLoss(),null!=(u=e.gl)&&u.xr&&e.xr.disconnect(),function(n){"Scene"!==n.type&&(null==n.dispose?void 0:n.dispose())
for(const e in n){const l=n[e]
"Scene"!==(null==l?void 0:l.type)&&(null==l||null==l.dispose?void 0:l.dispose())}}(e.scene),xe.delete(n)}catch(Ue){}},500)})}}function T(n,e){if(n.size)for(const{callback:l}of n.values())l(e)}function I(n,e){switch(n){case"before":return T(Se,e)
case"after":return T(Ce,e)
case"tail":return T(Me,e)}}function z(n,e,l){let r=e.clock.getDelta()
"never"===e.frameloop&&"number"==typeof n&&(r=n-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=n),je=e.internal.subscribers
for(let t=0;t<je.length;t++)Pe=je[t],Pe.ref.current(Pe.store.getState(),r,l)
return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),"always"===e.frameloop?1:e.internal.frames}function O(n){Te=requestAnimationFrame(O),ze=!0,Re=0,I("before",n),Oe=!0
for(const l of xe.values()){var e
Ie=l.store.getState(),!Ie.internal.active||!("always"===Ie.frameloop||Ie.internal.frames>0)||null!=(e=Ie.gl.xr)&&e.isPresenting||(Re+=z(n,Ie))}if(Oe=!1,I("after",n),0===Re)return I("tail",n),ze=!1,cancelAnimationFrame(Te)}function F(n,e=1){var l
if(!n)return xe.forEach(n=>F(n.store.getState(),e))
null!=(l=n.gl.xr)&&l.isPresenting||!n.internal.active||"never"===n.frameloop||(n.internal.frames=e>1?Math.min(60,n.internal.frames+e):Oe?2:1,ze||(ze=!0,requestAnimationFrame(O)))}function _(n,e=!0,l,r){if(e&&I("before",n),l)z(n,l,r)
else for(const t of xe.values())z(n,t.store.getState())
e&&I("after",n)}function A(n){const{handlePointer:e}=function(n){function e(n){return n.filter(n=>["Move","Over","Enter","Out","Leave"].some(e=>{var l
return null==(l=n.O)?void 0:l.handlers["onPointer"+e]}))}function l(e){const{internal:l}=n.getState()
for(const n of l.hovered.values())if(!e.length||!e.find(e=>e.object===n.object&&e.index===n.index&&e.instanceId===n.instanceId)){const r=n.eventObject.O
if(l.hovered.delete(p(n)),null!=r&&r.eventCount){const l=r.handlers,t={...n,intersections:e}
null==l.onPointerOut?void 0:l.onPointerOut(t),null==l.onPointerLeave||l.onPointerLeave(t)}}}function r(n,e){for(let l=0;l<e.length;l++){const r=e[l].O
null==r||null==r.handlers.onPointerMissed?void 0:r.handlers.onPointerMissed(n)}}return{handlePointer:function(t){switch(t){case"onPointerLeave":case"onPointerCancel":return()=>l([])
case"onLostPointerCapture":return e=>{const{internal:r}=n.getState()
"pointerId"in e&&r.capturedMap.has(e.pointerId)&&requestAnimationFrame(()=>{r.capturedMap.has(e.pointerId)&&(r.capturedMap.delete(e.pointerId),l([]))})}}return function(o){const{onPointerMissed:i,internal:a}=n.getState()
a.lastEvent.current=o
const c="onPointerMove"===t,f="onClick"===t||"onContextMenu"===t||"onDoubleClick"===t,s=function(e,l){const r=n.getState(),t=new Set,o=[],i=l?l(r.internal.interaction):r.internal.interaction
for(let n=0;n<i.length;n++){const e=u(i[n])
e&&(e.raycaster.camera=void 0)}r.previousRoot||(null==r.events.compute?void 0:r.events.compute(e,r))
let a=i.flatMap(function(n){const l=u(n)
return l&&l.events.enabled&&null!==l.raycaster.camera?(void 0===l.raycaster.camera&&(null==l.events.compute?void 0:l.events.compute(e,l,null==(r=l.previousRoot)?void 0:r.getState()),void 0===l.raycaster.camera&&(l.raycaster.camera=null)),l.raycaster.camera?l.raycaster.intersectObject(n,!0):[]):[]
var r}).sort((n,e)=>{const l=u(n.object),r=u(e.object)
return l&&r&&r.events.priority-l.events.priority||n.distance-e.distance}).filter(n=>{const e=p(n)
return!t.has(e)&&(t.add(e),!0)})
r.events.filter&&(a=r.events.filter(a,r))
for(const n of a){let e=n.object
for(;e;){var c
null!=(c=e.O)&&c.eventCount&&o.push({...n,eventObject:e}),e=e.parent}}if("pointerId"in e&&r.internal.capturedMap.has(e.pointerId))for(let n of r.internal.capturedMap.get(e.pointerId).values())t.has(p(n.intersection))||o.push(n.intersection)
return o}(o,c?e:void 0),v=f?function(e){const{internal:l}=n.getState(),r=e.offsetX-l.initialClick[0],t=e.offsetY-l.initialClick[1]
return Math.round(Math.sqrt(r*r+t*t))}(o):0
"onPointerDown"===t&&(a.initialClick=[o.offsetX,o.offsetY],a.initialHits=s.map(n=>n.eventObject)),f&&!s.length&&v<=2&&(r(o,a.interaction),i&&i(o)),c&&l(s),function(n,e,r,t){if(n.length){const o={stopped:!1}
for(const i of n){let a=u(i.object)
if(a||i.object.traverseAncestors(n=>{const e=u(n)
if(e)return a=e,!1}),a){const{raycaster:u,pointer:c,camera:f,internal:s}=a,v=new mn(c.x,c.y,0).unproject(f),d=n=>{var e,l
return null!=(e=null==(l=s.capturedMap.get(n))?void 0:l.has(i.eventObject))&&e},p=n=>{const l={intersection:i,target:e.target}
s.capturedMap.has(n)?s.capturedMap.get(n).set(i.eventObject,l):s.capturedMap.set(n,new Map([[i.eventObject,l]])),e.target.setPointerCapture(n)},y=n=>{const e=s.capturedMap.get(n)
e&&h(s.capturedMap,i.eventObject,e,n)}
let b={}
for(let n in e){let l=e[n]
"function"!=typeof l&&(b[n]=l)}let w={...i,...b,pointer:c,intersections:n,stopped:o.stopped,delta:r,unprojectedPoint:v,ray:u.ray,camera:f,stopPropagation(){const r="pointerId"in e&&s.capturedMap.get(e.pointerId);(!r||r.has(i.eventObject))&&(w.stopped=o.stopped=!0,s.hovered.size&&Array.from(s.hovered.values()).find(n=>n.eventObject===i.eventObject))&&l([...n.slice(0,n.indexOf(i)),i])},target:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:y},currentTarget:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:y},nativeEvent:e}
if(t(w),!0===o.stopped)break}}}}(s,o,v,function(n){const e=n.eventObject,l=e.O
if(null==l||!l.eventCount)return
const u=l.handlers
if(c){if(u.onPointerOver||u.onPointerEnter||u.onPointerOut||u.onPointerLeave){const e=p(n),l=a.hovered.get(e)
l?l.stopped&&n.stopPropagation():(a.hovered.set(e,n),null==u.onPointerOver||u.onPointerOver(n),null==u.onPointerEnter||u.onPointerEnter(n))}null==u.onPointerMove?void 0:u.onPointerMove(n)}else{const l=u[t]
l?f&&!a.initialHits.includes(e)||(r(o,a.interaction.filter(n=>!a.initialHits.includes(n))),l(n)):f&&a.initialHits.includes(e)&&r(o,a.interaction.filter(n=>!a.initialHits.includes(n)))}})}}}}(n)
return{priority:1,enabled:!0,compute(n,e,l){e.pointer.set(n.offsetX/e.size.width*2-1,-n.offsetY/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)},connected:void 0,handlers:Object.keys(Fe).reduce((n,l)=>({...n,[l]:e(l)}),{}),update:()=>{var e
const{events:l,internal:r}=n.getState()
null!=(e=r.lastEvent)&&e.current&&l.handlers&&l.handlers.onPointerMove(r.lastEvent.current)},connect:e=>{const{set:l,events:r}=n.getState()
if(null==r.disconnect?void 0:r.disconnect(),l(n=>({events:{...n.events,connected:e}})),r.handlers)for(const n in r.handlers){const l=r.handlers[n],[t,u]=Fe[n]
e.addEventListener(t,l,{passive:u})}},disconnect:()=>{const{set:e,events:l}=n.getState()
if(l.connected){if(l.handlers)for(const n in l.handlers){const e=l.handlers[n],[r]=Fe[n]
l.connected.removeEventListener(r,e)}e(n=>({events:{...n.events,connected:void 0}}))}}}}function L(n,e){let l
return(...r)=>{window.clearTimeout(l),l=window.setTimeout(()=>n(...r),e)}}function N({debounce:n,scroll:e,polyfill:l,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){function t(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(n=>n.removeEventListener("scroll",h,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function u(){c.current.element&&(c.current.resizeObserver=new o(h),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(n=>n.addEventListener("scroll",h,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{h()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const o=l||("undefined"==typeof window?class{}:window.ResizeObserver)
if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills")
const[i,a]=Y.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=Y.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:i,orientationHandler:null}),f=n?"number"==typeof n?n:n.scroll:null,s=n?"number"==typeof n?n:n.resize:null,v=Y.useRef(!1)
Y.useEffect(()=>(v.current=!0,()=>{v.current=!1}))
const[d,p,h]=Y.useMemo(()=>{const n=()=>{if(!c.current.element)return
const{left:n,top:e,width:l,height:t,bottom:u,right:o,x:i,y:f}=c.current.element.getBoundingClientRect(),s={left:n,top:e,width:l,height:t,bottom:u,right:o,x:i,y:f}
c.current.element instanceof HTMLElement&&r&&(s.height=c.current.element.offsetHeight,s.width=c.current.element.offsetWidth),Object.freeze(s),v.current&&!Ae(c.current.lastBounds,s)&&a(c.current.lastBounds=s)}
return[n,s?L(n,s):n,f?L(n,f):n]},[a,r,f,s])
return function(n,e){Y.useEffect(()=>{if(e){const e=n
return window.addEventListener("scroll",e,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",e,!0)}}},[n,e])}(h,!!e),function(n){Y.useEffect(()=>{const e=n
return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n])}(p),Y.useEffect(()=>{t(),u()},[e,h,p]),Y.useEffect(()=>t,[]),[n=>{!n||n===c.current.element||(t(),c.current.element=n,c.current.scrollContainers=D(n),u())},i,d]}function D(n){const e=[]
if(!n||n===document.body)return e
const{overflow:l,overflowX:r,overflowY:t}=window.getComputedStyle(n)
return[l,r,t].some(n=>"auto"===n||"scroll"===n)&&e.push(n),[...e,...D(n.parentElement)]}function B({ref:n,children:e,fallback:u,resize:o,style:a,gl:c,events:f=A,eventSource:s,eventPrefix:d,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,scene:C,onPointerMissed:M,onCreated:j,...T}){Y.useMemo(()=>m(En),[])
const I=function(){const n=K(),e=X()
return Y.useMemo(()=>({children:l})=>{const r=J(n,!0,n=>n.type===Y.StrictMode)?Y.StrictMode:Y.Fragment
return W.jsx(r,{children:W.jsx(e,{children:l})})},[n,e])}(),[z,O]=N({scroll:!0,debounce:{scroll:50,resize:0},...o}),L=Y.useRef(null),D=Y.useRef(null)
Y.useImperativeHandle(n,()=>L.current)
const B=l(M),[H,q]=Y.useState(!1),[U,$]=Y.useState(!1)
if(H)throw H
if(U)throw U
const V=Y.useRef(null)
ee(()=>{const n=L.current
if(O.width>0&&O.height>0&&n){async function l(){await V.current.configure({gl:c,scene:C,events:f,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,size:O,onPointerMissed:(...n)=>null==B.current?void 0:B.current(...n),onCreated:n=>{var e
null==n.events.connect?void 0:n.events.connect(s?(e=s)&&e.hasOwnProperty("current")?s.current:s:D.current),d&&n.setEvents({compute:(n,e)=>{const l=n[d+"X"],r=n[d+"Y"]
e.pointer.set(l/e.size.width*2-1,-r/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)}}),null==j||j(n)}}),V.current.render(W.jsx(I,{children:W.jsx(le,{set:$,children:W.jsx(Y.Suspense,{fallback:W.jsx(r,{set:q}),children:null!=e?e:null})})}))}V.current||(V.current=function(n){const e=xe.get(n),l=null==e?void 0:e.fiber,r=null==e?void 0:e.store
e,0
const u="function"==typeof reportError?reportError:console.error,o=r||((n,e)=>{const l=pn((l,r)=>{function u(n=r().camera,e=i,l=r().size){const{width:t,height:u,top:c,left:f}=l,s=t/u
e.isVector3?a.copy(e):a.set(...e)
const v=n.getWorldPosition(o).distanceTo(a)
if(Zn(n))return{width:t/n.zoom,height:u/n.zoom,top:c,left:f,factor:1,distance:v,aspect:s}
{const e=n.fov*Math.PI/180,l=2*Math.tan(e/2)*v,r=l*(t/u)
return{width:r,height:l,top:c,left:f,factor:t/r,distance:v,aspect:s}}}const o=new mn,i=new mn,a=new mn
let c
const f=n=>l(e=>({performance:{...e.performance,current:n}})),s=new kn,v={set:l,get:r,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(e=1)=>n(r(),e),advance:(n,l)=>e(n,l,r()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new gn,pointer:s,mouse:s,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const n=r()
c&&clearTimeout(c),n.performance.current!==n.performance.min&&f(n.performance.min),c=setTimeout(()=>f(r().performance.max),n.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:u},setEvents:n=>l(e=>({...e,events:{...e.events,...n}})),setSize:(n,e,t=0,o=0)=>{const a=r().camera,c={width:n,height:e,top:t,left:o}
l(n=>({size:c,viewport:{...n.viewport,...u(a,i,c)}}))},setDpr:n=>l(e=>{const l=t(n)
return{viewport:{...e.viewport,dpr:l,initialDpr:e.viewport.initialDpr||l}}}),setFrameloop:(n="always")=>{const e=r().clock
e.stop(),e.elapsedTime=0,"never"!==n&&(e.start(),e.elapsedTime=0),l(()=>({frameloop:n}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:Y.createRef(),active:!1,frames:0,priority:0,subscribe:(n,e,l)=>{const t=r().internal
return t.priority=t.priority+(e>0?1:0),t.subscribers.push({ref:n,priority:e,store:l}),t.subscribers=t.subscribers.sort((n,e)=>n.priority-e.priority),()=>{const l=r().internal
null!=l&&l.subscribers&&(l.priority=l.priority-(e>0?1:0),l.subscribers=l.subscribers.filter(e=>e.ref!==n))}}}}
return v}),r=l.getState()
let u=r.size,o=r.viewport.dpr,i=r.camera
return l.subscribe(()=>{const{camera:n,size:e,viewport:r,gl:t,set:a}=l.getState()
if(e.width!==u.width||e.height!==u.height||r.dpr!==o){u=e,o=r.dpr,function(n,e){n.manual||(Zn(n)?(n.left=e.width/-2,n.right=e.width/2,n.top=e.height/2,n.bottom=e.height/-2):n.aspect=e.width/e.height,n.updateProjectionMatrix())}(n,e),r.dpr>0&&t.setPixelRatio(r.dpr)
const l="undefined"!=typeof HTMLCanvasElement&&t.domElement instanceof HTMLCanvasElement
t.setSize(e.width,e.height,l)}n!==i&&(i=n,a(e=>({viewport:{...e.viewport,...e.viewport.getCurrentViewport(n)}})))}),l.subscribe(e=>n(e)),l})(F,_),a=l||ge.createContainer(o,qn.ConcurrentRoot,null,!1,null,"",u,u,u,null)
let c,f
e||xe.set(n,{fiber:a,store:o})
let s=!1,d=null
return{async configure(e={}){let l
d=new Promise(n=>l=n)
let{gl:r,size:u,scene:a,events:p,onCreated:h,shadows:y=!1,linear:b=!1,flat:w=!1,legacy:m=!1,orthographic:k=!1,frameloop:g="always",dpr:x=[1,2],performance:E,raycaster:S,camera:C,onPointerMissed:M}=e,j=o.getState(),P=j.gl
if(!j.gl){const e={canvas:n,powerPreference:"high-performance",antialias:!0,alpha:!0},l="function"==typeof r?await r(e):r
P=se(l)?l:new Z({...e,...r}),j.set({gl:P})}let R=j.raycaster
R||j.set({raycaster:R=new nn})
const{params:T,...I}=S||{}
if(re.equ(I,R,Ee)||v(R,{...I}),re.equ(T,R.params,Ee)||v(R,{params:{...R.params,...T}}),!j.camera||j.camera===f&&!re.equ(f,C,Ee)){f=C
const n=null==C?void 0:C.isCamera,e=n?C:k?new en(0,0,0,0,.1,1e3):new ln(75,0,.1,1e3)
n||(e.position.z=5,C&&(v(e,C),e.manual||("aspect"in C||"left"in C||"right"in C||"bottom"in C||"top"in C)&&(e.manual=!0,e.updateProjectionMatrix())),j.camera||null!=C&&C.rotation||e.lookAt(0,0,0)),j.set({camera:e}),R.camera=e}if(!j.scene){let n
null!=a&&a.isScene?(n=a,i(n,o,"",{})):(n=new rn,i(n,o,"",{}),a&&v(n,a)),j.set({scene:n})}p&&!j.events.handlers&&j.set({events:p(o)})
const z=function(n,e){if(!e&&"undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:e,height:l,top:r,left:t}=n.parentElement.getBoundingClientRect()
return{width:e,height:l,top:r,left:t}}return!e&&"undefined"!=typeof OffscreenCanvas&&n instanceof OffscreenCanvas?{width:n.width,height:n.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...e}}(n,u)
if(re.equ(z,j.size,Ee)||j.setSize(z.width,z.height,z.top,z.left),x&&j.viewport.dpr!==t(x)&&j.setDpr(x),j.frameloop!==g&&j.setFrameloop(g),j.onPointerMissed||j.set({onPointerMissed:M}),E&&!re.equ(E,j.performance,Ee)&&j.set(n=>({performance:{...n.performance,...E}})),!j.xr){var O
const n=(n,e)=>{const l=o.getState()
"never"!==l.frameloop&&_(n,!0,l,e)},e=()=>{const e=o.getState()
e.gl.xr.enabled=e.gl.xr.isPresenting,e.gl.xr.setAnimationLoop(e.gl.xr.isPresenting?n:null),e.gl.xr.isPresenting||F(e)},l={connect(){const n=o.getState().gl
n.xr.addEventListener("sessionstart",e),n.xr.addEventListener("sessionend",e)},disconnect(){const n=o.getState().gl
n.xr.removeEventListener("sessionstart",e),n.xr.removeEventListener("sessionend",e)}}
"function"==typeof(null==(O=P.xr)?void 0:O.addEventListener)&&l.connect(),j.set({xr:l})}if(P.shadowMap){const n=P.shadowMap.enabled,e=P.shadowMap.type
if(P.shadowMap.enabled=!!y,re.boo(y))P.shadowMap.type=tn
else if(re.str(y)){var A
const n={basic:an,percentage:on,soft:tn,variance:un}
P.shadowMap.type=null!=(A=n[y])?A:tn}else re.obj(y)&&Object.assign(P.shadowMap,y)
n===P.shadowMap.enabled&&e===P.shadowMap.type||(P.shadowMap.needsUpdate=!0)}return cn.enabled=!m,s||(P.outputColorSpace=b?fn:sn,P.toneMapping=w?vn:dn),j.legacy!==m&&j.set(()=>({legacy:m})),j.linear!==b&&j.set(()=>({linear:b})),j.flat!==w&&j.set(()=>({flat:w})),!r||re.fun(r)||se(r)||re.equ(r,P,Ee)||v(P,r),c=h,s=!0,l(),this},render(e){return s||d||this.configure(),d.then(()=>{ge.updateContainer(W.jsx(P,{store:o,children:e,onCreated:c,rootElement:n}),a,null,()=>{})}),o},unmount(){R(n)}}}(n)),l()}}),Y.useEffect(()=>{const n=L.current
if(n)return()=>R(n)},[])
const G=s?"none":"auto"
return W.jsx("div",{ref:D,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:G,...a},...T,children:W.jsx("div",{ref:z,style:{width:"100%",height:"100%"},children:W.jsx("canvas",{ref:L,style:{display:"block"},children:u})})})}function H(n){return W.jsx(xn,{children:W.jsx(B,{...n})})}function q({waveSpeed:n,waveFrequency:e,waveAmplitude:l,waveColor:r,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a}){const c=Y.useRef(null),f=Y.useRef(new kn)
let s,v,d
try{const n=b()
s=n.viewport,v=n.size,d=n.gl}catch(y){return void 0,null}const p=Y.useRef({time:new On(0),resolution:new On(new kn(0,0)),waveSpeed:new On(n),waveFrequency:new On(e),waveAmplitude:new On(l),waveColor:new On(new yn(...r)),mousePos:new On(new kn(0,0)),enableMouseInteraction:new On(i?1:0),mouseRadius:new On(a)})
Y.useEffect(()=>{const n=d.getPixelRatio(),e=Math.floor(v.width*n),l=Math.floor(v.height*n),r=p.current.resolution.value
r.x===e&&r.y===l||r.set(e,l)},[v,d])
const h=Y.useRef([...r])
return w(({clock:t})=>{const u=p.current
o||(u.time.value=t.getElapsedTime()),u.waveSpeed.value!==n&&(u.waveSpeed.value=n),u.waveFrequency.value!==e&&(u.waveFrequency.value=e),u.waveAmplitude.value!==l&&(u.waveAmplitude.value=l),h.current.every((n,e)=>n===r[e])||(u.waveColor.value.set(...r),h.current=[...r]),u.enableMouseInteraction.value=i?1:0,u.mouseRadius.value=a,i&&u.mousePos.value.copy(f.current)}),W.jsxs(W.Fragment,{children:[W.jsxs("mesh",{ref:c,scale:[s.width,s.height,1],children:[W.jsx("planeGeometry",{args:[1,1]}),W.jsx("shaderMaterial",{vertexShader:"\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n",fragmentShader:"\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n",uniforms:p.current})]}),W.jsx(Y.Suspense,{fallback:null,children:W.jsx(De,{children:W.jsx($e,{colorNum:t,pixelSize:u})})}),W.jsxs("mesh",{onPointerMove:n=>{if(!i)return
const e=d.domElement.getBoundingClientRect(),l=d.getPixelRatio()
f.current.set((n.clientX-e.left)*l,(n.clientY-e.top)*l)},position:[0,0,.01],scale:[s.width,s.height,1],visible:!1,children:[W.jsx("planeGeometry",{args:[1,1]}),W.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function U(){return W.jsx("div",{className:"dither-container",style:{background:"linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",backgroundSize:"20px 20px",animation:"ditherFallback 3s ease-in-out infinite alternate"},children:W.jsx("style",{children:"\n        @keyframes ditherFallback {\n          0% { opacity: 0.8; }\n          100% { opacity: 0.6; }\n        }\n      "})})}function $({waveSpeed:n=.05,waveFrequency:e=3,waveAmplitude:l=.3,waveColor:r=[.5,.5,.5],colorNum:t=4,pixelSize:u=2,disableAnimation:o=!1,enableMouseInteraction:i=!0,mouseRadius:a=1}){try{return W.jsx(H,{className:"dither-container",camera:{position:[0,0,6]},dpr:1,gl:{antialias:!0,preserveDrawingBuffer:!0},onCreated:n=>{n.gl.setSize(n.size.width,n.size.height)},fallback:W.jsx(U,{}),children:W.jsx(Y.Suspense,{fallback:null,children:W.jsx(q,{waveSpeed:n,waveFrequency:e,waveAmplitude:l,waveColor:r,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a})})})}catch(c){return void 0,W.jsx(U,{})}}function V(){const n=()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"}
return W.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[W.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:W.jsx($,{waveSpeed:.05,waveFrequency:19,waveAmplitude:.51,waveColor:[.5,.5,.5],colorNum:2.5,pixelSize:3,disableAnimation:!1,enableMouseInteraction:!1,mouseRadius:.3})}),W.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 40px",borderRadius:"16px",background:"rgba(22, 22, 22, 0.12)",backdropFilter:"blur(4px)",border:"1px solid rgba(255, 255, 255, 0.06)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",maxWidth:"400px",width:"90%"},children:[W.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"24px"},children:[W.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"BOUNCE2BOUNCE",style:{height:"48px",width:"auto",cursor:"pointer",transition:"all 0.3s ease",opacity:.95,filter:"brightness(0) invert(1)"},onClick:n,onError:n=>{n.target.style.display="none",n.target.nextSibling.style.display="block"}}),W.jsx("div",{style:{display:"none",color:"rgba(255, 255, 255, 0.9)",fontSize:"18px",fontWeight:"600",letterSpacing:"0.5px"},children:"BOUNCE2BOUNCE"})]}),W.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 6rem)",fontWeight:"800",color:"rgba(255, 255, 255, 0.95)",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",textShadow:"0 2px 8px rgba(0, 0, 0, 0.2)"},children:"404"}),W.jsx("h2",{style:{fontSize:"clamp(1.25rem, 2.5vw, 1.5rem)",fontWeight:"500",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 32px 0",lineHeight:"1.2"},children:"Not Found"}),W.jsx("button",{onClick:n,style:{padding:"14px 28px",fontSize:"1rem",fontWeight:"500",color:"rgba(255, 255, 255, 0.9)",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"8px",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(2px)",transform:"translateY(0)",outline:"none"},onMouseEnter:n=>{n.target.style.background="rgba(255, 255, 255, 0.12)",n.target.style.borderColor="rgba(255, 255, 255, 0.25)",n.target.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.target.style.background="rgba(255, 255, 255, 0.08)",n.target.style.borderColor="rgba(255, 255, 255, 0.15)",n.target.style.transform="translateY(0)"},onFocus:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.3)"},onBlur:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.15)"},"aria-label":"Go back to homepage",children:"Go Home"})]})]})}import{j as W}from"./index-BHR70xxX.js"
import{r as G,g as Q,b as Y,c as K,x as X,d as J,W as Z,R as nn,O as en,P as ln,S as rn,f as tn,V as un,h as on,B as an,C as cn,L as fn,j as sn,N as vn,A as dn,k as pn,l as hn,m as yn,n as bn,U as wn,o as mn,p as kn,q as gn,t as xn,T as En,E as Sn,H as Cn,u as Mn,v as jn,D as Pn,w as Rn,y as Tn,e as In,z as zn,F as On}from"./vendor-quiY1y6M.js"
var Fn,_n,An,Ln,Nn,Dn,Bn={exports:{}},Hn={},qn=function(){return _n||(_n=1,Bn.exports=function(){return Fn||(Fn=1,Hn.ConcurrentRoot=1,Hn.ContinuousEventPriority=8,Hn.DefaultEventPriority=32,Hn.DiscreteEventPriority=2,Hn.IdleEventPriority=268435456,Hn.LegacyRoot=0,Hn.NoEventPriority=0),Hn}()),Bn.exports}(),Un={exports:{}},$n={exports:{}},Vn={exports:{}},Wn={}
const Gn=Q(function(){return Dn||(Dn=1,Un.exports=n()),Un.exports}())
var Qn,Yn,Kn={exports:{}},Xn={},Jn=function(){return Yn||(Yn=1,Kn.exports=function(){return Qn||(Qn=1,function(n){function e(n,e){var l=n.length
n.push(e)
n:for(;0<l;){var r=l-1>>>1,u=n[r]
if(!(0<t(u,e)))break n
n[r]=e,n[l]=u,l=r}}function l(n){return 0===n.length?null:n[0]}function r(n){if(0===n.length)return null
var e=n[0],l=n.pop()
if(l!==e){n[0]=l
n:for(var r=0,u=n.length,o=u>>>1;r<o;){var i=2*(r+1)-1,a=n[i],c=i+1,f=n[c]
if(0>t(a,l))c<u&&0>t(f,a)?(n[r]=f,n[c]=l,r=c):(n[r]=a,n[i]=l,r=i)
else{if(!(c<u&&0>t(f,l)))break n
n[r]=f,n[c]=l,r=c}}}return e}function t(n,e){var l=n.sortIndex-e.sortIndex
return 0!==l?l:n.id-e.id}function u(n){for(var t=l(y);null!==t;){if(null===t.callback)r(y)
else{if(!(t.startTime<=n))break
r(y),t.sortIndex=t.expirationTime,e(h,t)}t=l(y)}}function o(n){if(x=!1,u(n),!g)if(null!==l(h))g=!0,c()
else{var e=l(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-R<P)}function a(){if(M){var e=n.unstable_now()
R=e
var t=!0
try{n:{g=!1,x&&(x=!1,S(j),j=-1),k=!0
var a=m
try{e:{for(u(e),w=l(h);null!==w&&!(w.expirationTime>e&&i());){var c=w.callback
if("function"==typeof c){w.callback=null,m=w.priorityLevel
var s=c(w.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){w.callback=s,u(e),t=!0
break e}w===l(h)&&r(h),u(e)}else r(h)
w=l(h)}if(null!==w)t=!0
else{var v=l(y)
null!==v&&f(o,v.startTime-e),t=!1}}break n}finally{w=null,m=a,k=!1}t=void 0}}finally{t?p():M=!1}}}function c(){M||(M=!0,p())}function f(e,l){j=E(function(){e(n.unstable_now())},l)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],b=1,w=null,m=3,k=!1,g=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,M=!1,j=-1,P=5,R=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var T=new MessageChannel,I=T.port2
T.port1.onmessage=a,p=function(){I.postMessage(null)}}else p=function(){E(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){g||k||(g=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return l(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var l=m
m=e
try{return n()}finally{m=l}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var l=m
m=n
try{return e()}finally{m=l}},n.unstable_scheduleCallback=function(r,t,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,r){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return r={id:b++,callback:t,priorityLevel:r,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(r.sortIndex=u,e(y,r),null===l(h)&&r===l(y)&&(x?(S(j),j=-1):x=!0,f(o,u-i))):(r.sortIndex=a,e(h,r),g||k||(g=!0,c())),r},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=m
return function(){var l=m
m=e
try{return n.apply(this,arguments)}finally{m=l}}}}(Xn)),Xn}()),Kn.exports}()
const Zn=n=>n&&n.isOrthographicCamera,ne=n=>null!=n&&("string"==typeof n||"number"==typeof n||n.isColor),ee=((n,e)=>"undefined"!=typeof window&&((null==(n=window.document)?void 0:n.createElement)||"ReactNative"===(null==(e=window.navigator)?void 0:e.product)))()?Y.useLayoutEffect:Y.useEffect,le=(n=>((n=class extends Y.Component{constructor(...n){super(...n),this.state={error:!1}}componentDidCatch(n){this.props.set(n)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),n))(),re={obj:n=>n===Object(n)&&!re.arr(n)&&"function"!=typeof n,fun:n=>"function"==typeof n,str:n=>"string"==typeof n,num:n=>"number"==typeof n,boo:n=>"boolean"==typeof n,und:n=>void 0===n,nul:n=>null===n,arr:n=>Array.isArray(n),equ(n,e,{arrays:l="shallow",objects:r="reference",strict:t=!0}={}){if(typeof n!=typeof e||!!n!=!!e)return!1
if(re.str(n)||re.num(n)||re.boo(n))return n===e
const u=re.obj(n)
if(u&&"reference"===r)return n===e
const o=re.arr(n)
if(o&&"reference"===l)return n===e
if((o||u)&&n===e)return!0
let i
for(i in n)if(!(i in e))return!1
if(u&&"shallow"===l&&"shallow"===r){for(i in t?e:n)if(!re.equ(n[i],e[i],{strict:t,objects:"reference"}))return!1}else for(i in t?e:n)if(n[i]!==e[i])return!1
if(re.und(i)){if(o&&0===n.length&&0===e.length)return!0
if(u&&0===Object.keys(n).length&&0===Object.keys(e).length)return!0
if(n!==e)return!1}return!0}},te=["children","key","ref"],ue=/-\d+$/,oe=[...te,"args","dispose","attach","object","onUpdate","dispose"],ie=new Map,ae=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],ce=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/,fe=n=>null==n?void 0:n.isObject3D,se=n=>!(null==n||!n.render),ve=Y.createContext(null),de={},pe=/^three(?=[A-Z])/,he=n=>`${n[0].toUpperCase()}${n.slice(1)}`
let ye=0
const be=[],we=()=>{},me={}
let ke=0
const ge=function(n){const e=Gn(n)
return e.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:Y.version}),e}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(n,e,l){var r
return k(n=he(n)in de?n:n.replace(pe,""),e),"primitive"===n&&null!=(r=e.object)&&r.O&&delete e.object.O,i(e.object,l,n,e)},removeChild:M,appendChild:E,appendInitialChild:E,insertBefore:S,appendChildToContainer(n,e){const l=n.getState().scene.O
e&&l&&E(l,e)},removeChildFromContainer(n,e){const l=n.getState().scene.O
e&&l&&M(l,e)},insertInContainerBefore(n,e,l){const r=n.getState().scene.O
e&&l&&r&&S(r,e,l)},getRootHostContext:()=>me,getChildHostContext:()=>me,commitUpdate(n,e,l,r,t){var u,o,i
k(e,r)
let p=!1
if(("primitive"===n.type&&l.object!==r.object||(null==(u=r.args)?void 0:u.length)!==(null==(o=l.args)?void 0:o.length)||null!=(i=r.args)&&i.some((n,e)=>{var r
return n!==(null==(r=l.args)?void 0:r[e])}))&&(p=!0),p)be.push([n,{...r},t])
else{const e=function(n,e){const l={}
for(const r in e)if(!oe.includes(r)&&!re.equ(e[r],n.props[r])){l[r]=e[r]
for(const n in e)n.startsWith(`${r}-`)&&(l[n]=e[n])}for(const r in n.props){if(oe.includes(r)||e.hasOwnProperty(r))continue
const{root:t,key:u}=a(n.object,r)
if(t.constructor&&0===t.constructor.length){const n=s(t)
re.und(n)||(l[u]=n[u])}else l[u]=0}return l}(n,r)
Object.keys(e).length&&(Object.assign(n.props,e),v(n.object,e))}!(null!==t.sibling&&4&t.flags||function(){for(const[l]of be){const n=l.parent
if(n){l.props.attach?f(n,l):fe(l.object)&&fe(n.object)&&n.object.remove(l.object)
for(const n of l.children)n.props.attach?f(l,n):fe(n.object)&&fe(l.object)&&l.object.remove(n.object)}l.isHidden&&g(l),l.object.O&&delete l.object.O,"primitive"!==l.type&&C(l.object)}for(const[l,r,t]of be){l.props=r
const u=l.parent
if(u){var n,e
const r=de[he(l.type)]
l.object=null!=(n=l.props.object)?n:new r(...null!=(e=l.props.args)?e:[]),l.object.O=l,j(t,l.object),v(l.object,l.props),l.props.attach?c(u,l):fe(l.object)&&fe(u.object)&&u.object.add(l.object)
for(const n of l.children)n.props.attach?c(l,n):fe(n.object)&&fe(l.object)&&l.object.add(n.object)
d(l)}}be.length=0}())},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:n=>null==n?void 0:n.object,prepareForCommit:()=>null,preparePortalMount:n=>i(n.getState().scene,n,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(n){var e
n.isHidden||(n.props.attach&&null!=(e=n.parent)&&e.object?f(n.parent,n):fe(n.object)&&(n.object.visible=!1),n.isHidden=!0,d(n))},unhideInstance:g,createTextInstance:we,hideTextInstance:we,unhideTextInstance:we,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:Y.createContext(null),setCurrentUpdatePriority(n){ke=n},getCurrentUpdatePriority:()=>ke,resolveUpdatePriority(){var n
if(0!==ke)return ke
switch("undefined"!=typeof window&&(null==(n=window.event)?void 0:n.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return qn.DiscreteEventPriority
case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return qn.ContinuousEventPriority
default:return qn.DefaultEventPriority}},resetFormInstance(){}}),xe=new Map,Ee={objects:"shallow",strict:!1},Se=new Set,Ce=new Set,Me=new Set
let je,Pe,Re,Te,Ie,ze=!1,Oe=!1
const Fe={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]},_e=["x","y","top","bottom","left","right","width","height"],Ae=(n,e)=>_e.every(l=>n[l]===e[l]),Le=Y.createContext(null),Ne=n=>!(2&~n.getAttributes()),De=Y.memo(Y.forwardRef(({children:n,camera:e,scene:l,resolutionScale:r,enabled:t=!0,renderPriority:u=1,autoClear:o=!0,depthBuffer:i,enableNormalPass:a,stencilBuffer:c,multisampling:f=8,frameBufferType:s=Cn},v)=>{const{gl:d,scene:p,camera:h,size:y}=b(),m=l||p,k=e||h,[g,x,E]=Y.useMemo(()=>{const n=new Sn(d,{depthBuffer:i,stencilBuffer:c,multisampling:f,frameBufferType:s})
n.addPass(new Mn(m,k))
let e=null,l=null
return a&&(l=new jn(m,k),l.enabled=!1,n.addPass(l),void 0!==r&&(e=new Pn({normalBuffer:l.texture,resolutionScale:r}),e.enabled=!1,n.addPass(e))),[n,l,e]},[k,d,i,c,f,s,m,a,r])
Y.useEffect(()=>g?.setSize(y.width,y.height),[g,y]),w((n,e)=>{if(t){const n=d.autoClear
d.autoClear=o,c&&!o&&d.clearStencil(),g.render(e),d.autoClear=n}},t?u:0)
const S=Y.useRef(null)
Y.useLayoutEffect(()=>{const n=[],e=S.current.O
if(e&&g){const l=e.children
for(let e=0;e<l.length;e++){const r=l[e].object
if(r instanceof Rn){const t=[r]
if(!Ne(r)){let n=null
for(;(n=l[e+1]?.object)instanceof Rn&&!Ne(n);)t.push(n),e++}const u=new Tn(k,...t)
n.push(u)}else r instanceof zn&&n.push(r)}for(const e of n)g?.addPass(e)
x&&(x.enabled=!0),E&&(E.enabled=!0)}return()=>{for(const e of n)g?.removePass(e)
x&&(x.enabled=!1),E&&(E.enabled=!1)}},[g,n,k,x,E]),Y.useEffect(()=>{const n=d.toneMapping
return d.toneMapping=vn,()=>{d.toneMapping=n}},[d])
const C=Y.useMemo(()=>({composer:g,normalPass:x,downSamplingPass:E,resolutionScale:r,camera:k,scene:m}),[g,x,E,r,k,m])
return Y.useImperativeHandle(v,()=>g,[g]),W.jsx(Le.Provider,{value:C,children:W.jsx("group",{ref:S,children:n})})}))
let Be=0
const He=new WeakMap,qe=(Ue=class extends Rn{constructor(){const n=new Map([["colorNum",new On(4)],["pixelSize",new On(2)]])
super("RetroEffect","\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n",{uniforms:n}),this.uniforms=n}set colorNum(n){this.uniforms.get("colorNum").value=n}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(n){this.uniforms.get("pixelSize").value=n}get pixelSize(){return this.uniforms.get("pixelSize").value}},function({blendFunction:n,opacity:e,...l}){let r=He.get(Ue)
if(!r){const n=`@react-three/postprocessing/${Ue.name}-${Be++}`
m({[n]:Ue}),He.set(Ue,r=n)}const t=b(n=>n.camera),u=In.useMemo(()=>[...l.args??[{...l}]],[JSON.stringify(l)])
return W.jsx(r,{camera:t,"blendMode-blendFunction":n,"blendMode-opacity-value":e,...l,args:u})})
var Ue
const $e=Y.forwardRef((n,e)=>{const{colorNum:l,pixelSize:r}=n
return W.jsx(qe,{ref:e,colorNum:l,pixelSize:r})})
$e.displayName="RetroEffect"
export{V as default}
