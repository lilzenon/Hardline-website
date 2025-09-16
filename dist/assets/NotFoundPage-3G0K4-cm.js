function n(){return Vn||(Vn=1,(n=Qn).exports=function(n){function e(n,e,r,l){return new Rt(n,e,r,l)}function r(){}function l(n){var e="https://react.dev/errors/"+n
if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1])
for(var r=2;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=du&&n[du]||n["@@iterator"])?n:null}function u(n){if(null==n)return null
if("function"==typeof n)return n.$$typeof===pu?null:n.displayName||n.name||null
if("string"==typeof n)return n
switch(n){case nu:return"Fragment"
case Zt:return"Portal"
case ru:return"Profiler"
case eu:return"StrictMode"
case iu:return"Suspense"
case au:return"SuspenseList"}if("object"==typeof n)switch(n.$$typeof){case uu:return(n.displayName||"Context")+".Provider"
case tu:return(n.l.displayName||"Context")+".Consumer"
case ou:var e=n.render
return(n=n.displayName)||(n=""!==(n=e.displayName||e.name||"")?"ForwardRef("+n+")":"ForwardRef"),n
case cu:return null!==(e=n.displayName||null)?e:u(n.type)||"Memo"
case fu:e=n.t,n=n.u
try{return u(n(e))}catch(r){}}return null}function o(n){if(void 0===$t)try{throw Error()}catch(r){var e=r.stack.trim().match(/\n( *(at )?)/)
$t=e&&e[1]||"",Wt=-1<r.stack.indexOf("\n    at")?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+$t+n+Wt}function i(n,e){if(!n||yu)return""
yu=!0
var r=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var l={DetermineComponentFrameRoot:function(){try{if(e){var r=function(){throw Error()}
if(Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(t){var l=t}Reflect.construct(n,[],r)}else{try{r.call()}catch(u){l=u}n.call(r.prototype)}}else{try{throw Error()}catch(o){l=o}(r=n())&&"function"==typeof r.catch&&r.catch(function(){})}}catch(i){if(i&&l&&"string"==typeof i.stack)return[i.stack,l.stack]}return[null,null]}}
l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var t=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")
t&&t.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=l.DetermineComponentFrameRoot(),i=u[0],a=u[1]
if(i&&a){var c=i.split("\n"),f=a.split("\n")
for(t=l=0;l<c.length&&!c[l].includes("DetermineComponentFrameRoot");)l++
for(;t<f.length&&!f[t].includes("DetermineComponentFrameRoot");)t++
if(l===c.length||t===f.length)for(l=c.length-1,t=f.length-1;1<=l&&0<=t&&c[l]!==f[t];)t--
for(;1<=l&&0<=t;l--,t--)if(c[l]!==f[t]){if(1!==l||1!==t)do{if(l--,0>--t||c[l]!==f[t]){var s="\n"+c[l].replace(" at new "," at ")
return n.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",n.displayName)),s}}while(1<=l&&0<=t)
break}}}finally{yu=!1,Error.prepareStackTrace=r}return(r=n?n.displayName||n.name:"")?o(r):""}function a(n){switch(n.tag){case 26:case 27:case 5:return o(n.type)
case 16:return o("Lazy")
case 13:return o("Suspense")
case 19:return o("SuspenseList")
case 0:case 15:return i(n.type,!1)
case 11:return i(n.type.render,!1)
case 1:return i(n.type,!0)
default:return""}}function c(n){try{var e=""
do{e+=a(n),n=n.return}while(n)
return e}catch(r){return"\nError generating stack: "+r.message+"\n"+r.stack}}function f(n){var e=n,r=n
if(n.alternate)for(;e.return;)e=e.return
else{n=e
do{!!(4098&(e=n).flags)&&(r=e.return),n=e.return}while(n)}return 3===e.tag?r:null}function s(n){if(f(n)!==n)throw Error(l(188))}function v(n){var e=n.alternate
if(!e){if(null===(e=f(n)))throw Error(l(188))
return e!==n?null:n}for(var r=n,t=e;;){var u=r.return
if(null===u)break
var o=u.alternate
if(null===o){if(null!==(t=u.return)){r=t
continue}break}if(u.child===o.child){for(o=u.child;o;){if(o===r)return s(u),n
if(o===t)return s(u),e
o=o.sibling}throw Error(l(188))}if(r.return!==t.return)r=u,t=o
else{for(var i=!1,a=u.child;a;){if(a===r){i=!0,r=u,t=o
break}if(a===t){i=!0,t=u,r=o
break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===r){i=!0,r=o,t=u
break}if(a===t){i=!0,t=o,r=u
break}a=a.sibling}if(!i)throw Error(l(189))}}if(r.alternate!==t)throw Error(l(190))}if(3!==r.tag)throw Error(l(188))
return r.stateNode.current===r?n:e}function d(n){var e=n.tag
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
default:return n}}function m(n,e){var r=n.pendingLanes
if(0===r)return 0
var l=0,t=n.suspendedLanes,u=n.pingedLanes,o=n.warmLanes
n=0!==n.finishedLanes
var i=134217727&r
return 0!==i?0!==(r=i&~t)?l=w(r):0!==(u&=i)?l=w(u):n||0!==(o=i&~o)&&(l=w(o)):0!==(i=r&~t)?l=w(i):0!==u?l=w(u):n||0!==(o=r&~o)&&(l=w(o)),0===l?0:0!==e&&e!==l&&0===(e&t)&&((t=l&-l)>=(o=e&-e)||32===t&&4194176&o)?e:l}function k(n,e){return 0===(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&e)}function g(n,e){switch(n){case 1:case 2:case 4:case 8:return e+250
case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3
default:return-1}}function x(){var n=Pi
return!(4194176&(Pi<<=1))&&(Pi=128),n}function E(){var n=Ri
return!(62914560&(Ri<<=1))&&(Ri=4194304),n}function S(n){for(var e=[],r=0;31>r;r++)e.push(n)
return e}function C(n,e){n.pendingLanes|=e,268435456!==e&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function M(n,e,r){n.pendingLanes|=e,n.suspendedLanes&=~e
var l=31-Ci(e)
n.entangledLanes|=e,n.entanglements[l]=1073741824|n.entanglements[l]|4194218&r}function j(n,e){var r=n.entangledLanes|=e
for(n=n.entanglements;r;){var l=31-Ci(r),t=1<<l
t&e|n[l]&e&&(n[l]|=e),r&=~t}}function P(n){return 2<(n&=-n)?8<n?134217727&n?32:268435456:8:2}function R(n){if("function"==typeof Ni&&Bi(n),Vi&&"function"==typeof Vi.setStrictMode)try{Vi.setStrictMode(Ui,n)}catch(e){}}function z(n,e){if("object"==typeof n&&null!==n){var r=qi.get(n)
return void 0!==r?r:(e={value:n,source:e,stack:c(e)},qi.set(n,e),e)}return{value:n,source:e,stack:c(e)}}function I(n,e){$i[Wi++]=Qi,$i[Wi++]=Gi,Gi=n,Qi=e}function T(n,e,r){Yi[Ji++]=Xi,Yi[Ji++]=Zi,Yi[Ji++]=Ki,Ki=n
var l=Xi
n=Zi
var t=32-Ci(l)-1
l&=~(1<<t),r+=1
var u=32-Ci(e)+t
if(30<u){var o=t-t%5
u=(l&(1<<o)-1).toString(32),l>>=o,t-=o,Xi=1<<32-Ci(e)+t|r<<t|l,Zi=u+n}else Xi=1<<u|r<<t|l,Zi=n}function F(n){null!==n.return&&(I(n,1),T(n,1,0))}function _(n){for(;n===Gi;)Gi=$i[--Wi],$i[Wi]=null,Qi=$i[--Wi],$i[Wi]=null
for(;n===Ki;)Ki=Yi[--Ji],Yi[Ji]=null,Zi=Yi[--Ji],Yi[Ji]=null,Xi=Yi[--Ji],Yi[Ji]=null}function O(n,e){b(ra,e),b(ea,n),b(na,null),n=xu(e),y(na),b(na,n)}function A(){y(na),y(ea),y(ra)}function L(n){null!==n.memoizedState&&b(la,n)
var e=na.current,r=Eu(e,n.type)
e!==r&&(b(ea,n),b(na,r))}function D(n){ea.current===n&&(y(na),y(ea)),la.current===n&&(y(la),_u?Ku.o=Ju:Ku.i=Ju)}function N(n){throw q(z(Error(l(418,"")),n)),ca}function B(n,e){if(!Lu)throw Error(l(175))
$o(n.stateNode,n.type,n.memoizedProps,e,n)||N(n)}function U(n){for(ta=n.return;ta;)switch(ta.tag){case 3:case 27:return aa=!0,void 0
case 5:case 13:return aa=!1,void 0
default:ta=ta.return}}function V(n){if(!Lu||n!==ta)return!1
if(!oa)return U(n),oa=!0,!1
var e=!1
if(yi?3!==n.tag&&27!==n.tag&&(5!==n.tag||Zo(n.type)&&!Ru(n.type,n.memoizedProps))&&(e=!0):3!==n.tag&&(5!==n.tag||Zo(n.type)&&!Ru(n.type,n.memoizedProps))&&(e=!0),e&&ua&&N(n),U(n),13===n.tag){if(!Lu)throw Error(l(316))
if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(l(317))
ua=Qo(n)}else ua=ta?Do(n.stateNode):null
return!0}function H(){Lu&&(ua=ta=null,oa=!1)}function q(n){null===ia?ia=[n]:ia.push(n)}function $(){for(var n=sa,e=va=sa=0;e<n;){var r=fa[e]
fa[e++]=null
var l=fa[e]
fa[e++]=null
var t=fa[e]
fa[e++]=null
var u=fa[e]
if(fa[e++]=null,null!==l&&null!==t){var o=l.pending
null===o?t.next=t:(t.next=o.next,o.next=t),l.pending=t}0!==u&&Y(r,t,u)}}function W(n,e,r,l){fa[sa++]=n,fa[sa++]=e,fa[sa++]=r,fa[sa++]=l,va|=l,n.lanes|=l,null!==(n=n.alternate)&&(n.lanes|=l)}function G(n,e,r,l){return W(n,e,r,l),J(n)}function Q(n,e){return W(n,null,null,e),J(n)}function Y(n,e,r){n.lanes|=r
var l=n.alternate
null!==l&&(l.lanes|=r)
for(var t=!1,u=n.return;null!==u;)u.childLanes|=r,null!==(l=u.alternate)&&(l.childLanes|=r),22===u.tag&&(null===(n=u.stateNode)||1&n.v||(t=!0)),n=u,u=u.return
t&&null!==e&&3===n.tag&&(u=n.stateNode,t=31-Ci(r),null===(n=(u=u.hiddenUpdates)[t])?u[t]=[e]:n.push(e),e.lane=536870912|r)}function J(n){if(50<af)throw af=0,cf=null,Error(l(185))
for(var e=n.return;null!==e;)e=(n=e).return
return 3===n.tag?n.stateNode:null}function X(n){var e
n!==pa&&null===n.next&&(null===pa?da=pa=n:pa=pa.next=n),ya=!0,ha||(ha=!0,e=nn,Zu?no(function(){6&Fc?zi(Oi,e):e()}):zi(Oi,e))}function Z(n,e){if(!ba&&ya){ba=!0
do{for(var r=!1,l=da;null!==l;){if(0!==n){var t=l.pendingLanes
if(0===t)var u=0
else{var o=l.suspendedLanes,i=l.pingedLanes
u=(1<<31-Ci(42|n)+1)-1,u=201326677&(u&=t&~(o&~i))?201326677&u|1:u?2|u:0}0!==u&&(r=!0,ln(l,u))}else u=Ac,!(3&(u=m(l,l===_c?u:0)))||k(l,u)||(r=!0,ln(l,u))
l=l.next}}while(r)
ba=!1}}function nn(){ya=ha=!1
var n=0
0!==wa&&(Hu()&&(n=wa),wa=0)
for(var e=_i(),r=null,l=da;null!==l;){var t=l.next,u=en(l,e)
0===u?(l.next=null,null===r?da=t:r.next=t,null===t&&(pa=r)):(r=l,(0!==n||3&u)&&(ya=!0)),l=t}Z(n)}function en(n,e){for(var r=n.suspendedLanes,l=n.pingedLanes,t=n.expirationTimes,u=-62914561&n.pendingLanes;0<u;){var o=31-Ci(u),i=1<<o,a=t[o];-1===a?0!==(i&r)&&0===(i&l)||(t[o]=g(i,e)):a<=e&&(n.expiredLanes|=i),u&=~i}if(r=Ac,r=m(n,n===(e=_c)?r:0),l=n.callbackNode,0===r||n===e&&2===Lc||null!==n.cancelPendingCommit)return null!==l&&null!==l&&Ii(l),n.callbackNode=null,n.callbackPriority=0
if(!(3&r)||k(n,r)){if((e=r&-r)===n.callbackPriority)return e
switch(null!==l&&Ii(l),P(r)){case 2:case 8:r=Ai
break
case 32:default:r=Li
break
case 268435456:r=Di}return l=rn.bind(null,n),r=zi(r,l),n.callbackPriority=e,n.callbackNode=r,e}return null!==l&&null!==l&&Ii(l),n.callbackPriority=2,n.callbackNode=null,2}function rn(n,e){var r=n.callbackNode
if(gt()&&n.callbackNode!==r)return null
var l=Ac
return 0===(l=m(n,n===_c?l:0))?null:(Xl(n,l,e),en(n,_i()),null!=n.callbackNode&&n.callbackNode===r?rn.bind(null,n):null)}function ln(n,e){if(gt())return null
Xl(n,e,!0)}function tn(){return 0===wa&&(wa=x()),wa}function un(){if(0===--ka&&null!==ma){null!==xa&&(xa.status="fulfilled")
var n=ma
ma=null,ga=0,xa=null
for(var e=0;e<n.length;e++)(0,n[e])()}}function on(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function an(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function cn(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function fn(n,e,r){var l=n.updateQueue
if(null===l)return null
if(l=l.shared,2&Fc){var t=l.pending
return null===t?e.next=e:(e.next=t.next,t.next=e),l.pending=e,e=J(n),Y(n,null,r),e}return W(n,l,e,r),J(n)}function sn(n,e,r){if(null!==(e=e.updateQueue)&&(e=e.shared,4194176&r)){var l=e.lanes
r|=l&=n.pendingLanes,e.lanes=r,j(n,r)}}function vn(n,e){var r=n.updateQueue,l=n.alternate
if(null!==l&&r===(l=l.updateQueue)){var t=null,u=null
if(null!==(r=r.firstBaseUpdate)){do{var o={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null}
null===u?t=u=o:u=u.next=o,r=r.next}while(null!==r)
null===u?t=u=e:u=u.next=e}else t=u=e
return r={baseState:l.baseState,firstBaseUpdate:t,lastBaseUpdate:u,shared:l.shared,callbacks:l.callbacks},n.updateQueue=r,void 0}null===(n=r.lastBaseUpdate)?r.firstBaseUpdate=e:n.next=e,r.lastBaseUpdate=e}function dn(){if(Sa&&null!==xa)throw xa}function pn(n,e,r,l){Sa=!1
var t=n.updateQueue
Ea=!1
var u=t.firstBaseUpdate,o=t.lastBaseUpdate,i=t.shared.pending
if(null!==i){t.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var f=n.alternate
null!==f&&(i=(f=f.updateQueue).lastBaseUpdate)!==o&&(null===i?f.firstBaseUpdate=c:i.next=c,f.lastBaseUpdate=a)}if(null!==u){var s=t.baseState
for(o=0,f=c=a=null,i=u;;){var v=-536870913&i.lane,d=v!==i.lane
if(d?(Ac&v)===v:(l&v)===v){0!==v&&v===ga&&(Sa=!0),null!==f&&(f=f.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null})
n:{var p=n,h=i
v=e
var y=r
switch(h.tag){case 1:if("function"==typeof(p=h.payload)){s=p.call(y,s,v)
break n}s=p
break n
case 3:p.flags=-65537&p.flags|128
case 0:if(null==(v="function"==typeof(p=h.payload)?p.call(y,s,v):p))break n
s=Jt({},s,v)
break n
case 2:Ea=!0}}null!==(v=i.callback)&&(n.flags|=64,d&&(n.flags|=8192),null===(d=t.callbacks)?t.callbacks=[v]:d.push(v))}else d={lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===f?(c=f=d,a=s):f=f.next=d,o|=v
if(null===(i=i.next)){if(null===(i=t.shared.pending))break
i=(d=i).next,d.next=null,t.lastBaseUpdate=d,t.shared.pending=null}1}null===f&&(a=s),t.baseState=a,t.firstBaseUpdate=c,t.lastBaseUpdate=f,null===u&&(t.shared.lanes=0),qc|=o,n.lanes=o,n.memoizedState=s}}function hn(n,e){if("function"!=typeof n)throw Error(l(191,n))
n.call(e)}function yn(n,e){var r=n.callbacks
if(null!==r)for(n.callbacks=null,n=0;n<r.length;n++)hn(r[n],e)}function bn(n,e){if(Hi(n,e))return!0
if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1
var r=Object.keys(n),l=Object.keys(e)
if(r.length!==l.length)return!1
for(l=0;l<r.length;l++){var t=r[l]
if(!Ca.call(e,t)||!Hi(n[t],e[t]))return!1}return!0}function wn(n){return"fulfilled"===(n=n.status)||"rejected"===n}function mn(){}function kn(n,e,r){switch(void 0===(r=n[r])?n.push(e):r!==e&&(e.then(mn,mn),e=r),e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ma)throw Error(l(483))
throw n
default:if("string"==typeof e.status)e.then(mn,mn)
else{if(null!==(n=_c)&&100<n.shellSuspendCounter)throw Error(l(482));(n=e).status="pending",n.then(function(n){if("pending"===e.status){var r=e
r.status="fulfilled",r.value=n}},function(n){if("pending"===e.status){var r=e
r.status="rejected",r.reason=n}})}switch(e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ma)throw Error(l(483))
throw n}throw Ra=e,Ma}}function gn(){if(null===Ra)throw Error(l(459))
var n=Ra
return Ra=null,n}function xn(n){var e=Ia
return Ia+=1,null===za&&(za=[]),kn(za,n,e)}function En(n,e){e=e.props.ref,n.ref=void 0!==e?e:null}function Sn(n,e){if(e.$$typeof===Kt)throw Error(l(525))
throw n=Object.prototype.toString.call(e),Error(l(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Cn(n){return(0,n.u)(n.t)}function Mn(n){function r(e,r){if(n){var l=e.deletions
null===l?(e.deletions=[r],e.flags|=16):l.push(r)}}function u(e,l){if(!n)return null
for(;null!==l;)r(e,l),l=l.sibling
return null}function o(n){for(var e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function i(n,e){return(n=It(n,e)).index=0,n.sibling=null,n}function a(e,r,l){return e.index=l,n?null!==(l=e.alternate)?(l=l.index)<r?(e.flags|=33554434,r):l:(e.flags|=33554434,r):(e.flags|=1048576,r)}function c(e){return n&&null===e.alternate&&(e.flags|=33554434),e}function f(n,e,r,l){return null===e||6!==e.tag?((e=At(r,n.mode,l)).return=n,e):((e=i(e,r)).return=n,e)}function s(n,e,r,l){var t=r.type
return t===nu?d(n,e,r.props.children,l,r.key):null!==e&&(e.elementType===t||"object"==typeof t&&null!==t&&t.$$typeof===fu&&Cn(t)===e.type)?(En(e=i(e,r.props),r),e.return=n,e):(En(e=Ft(r.type,r.key,r.props,null,n.mode,l),r),e.return=n,e)}function v(n,e,r,l){return null===e||4!==e.tag||e.stateNode.containerInfo!==r.containerInfo||e.stateNode.implementation!==r.implementation?((e=Lt(r,n.mode,l)).return=n,e):((e=i(e,r.children||[])).return=n,e)}function d(n,e,r,l,t){return null===e||7!==e.tag?((e=_t(r,n.mode,l,t)).return=n,e):((e=i(e,r)).return=n,e)}function p(n,e,r){if("string"==typeof e&&""!==e||"number"==typeof e||"bigint"==typeof e)return(e=At(""+e,n.mode,r)).return=n,e
if("object"==typeof e&&null!==e){switch(e.$$typeof){case Xt:return En(r=Ft(e.type,e.key,e.props,null,n.mode,r),e),r.return=n,r
case Zt:return(e=Lt(e,n.mode,r)).return=n,e
case fu:return p(n,e=(0,e.u)(e.t),r)}if(bu(e)||t(e))return(e=_t(e,n.mode,r,null)).return=n,e
if("function"==typeof e.then)return p(n,xn(e),r)
if(e.$$typeof===uu)return p(n,Dr(n,e),r)
Sn(n,e)}return null}function h(n,e,r,l){var u=null!==e?e.key:null
if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return null!==u?null:f(n,e,""+r,l)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case Xt:return r.key===u?s(n,e,r,l):null
case Zt:return r.key===u?v(n,e,r,l):null
case fu:return h(n,e,r=(u=r.u)(r.t),l)}if(bu(r)||t(r))return null!==u?null:d(n,e,r,l,null)
if("function"==typeof r.then)return h(n,e,xn(r),l)
if(r.$$typeof===uu)return h(n,e,Dr(n,r),l)
Sn(n,r)}return null}function y(n,e,r,l,u){if("string"==typeof l&&""!==l||"number"==typeof l||"bigint"==typeof l)return f(e,n=n.get(r)||null,""+l,u)
if("object"==typeof l&&null!==l){switch(l.$$typeof){case Xt:return s(e,n=n.get(null===l.key?r:l.key)||null,l,u)
case Zt:return v(e,n=n.get(null===l.key?r:l.key)||null,l,u)
case fu:return y(n,e,r,l=(0,l.u)(l.t),u)}if(bu(l)||t(l))return d(e,n=n.get(r)||null,l,u,null)
if("function"==typeof l.then)return y(n,e,r,xn(l),u)
if(l.$$typeof===uu)return y(n,e,r,Dr(e,l),u)
Sn(e,l)}return null}function b(e,f,s,v){if("object"==typeof s&&null!==s&&s.type===nu&&null===s.key&&(s=s.props.children),"object"==typeof s&&null!==s){switch(s.$$typeof){case Xt:n:{for(var d=s.key;null!==f;){if(f.key===d){if((d=s.type)===nu){if(7===f.tag){u(e,f.sibling),(v=i(f,s.props.children)).return=e,e=v
break n}}else if(f.elementType===d||"object"==typeof d&&null!==d&&d.$$typeof===fu&&Cn(d)===f.type){u(e,f.sibling),En(v=i(f,s.props),s),v.return=e,e=v
break n}u(e,f)
break}r(e,f),f=f.sibling}s.type===nu?((v=_t(s.props.children,e.mode,v,s.key)).return=e,e=v):(En(v=Ft(s.type,s.key,s.props,null,e.mode,v),s),v.return=e,e=v)}return c(e)
case Zt:n:{for(d=s.key;null!==f;){if(f.key===d){if(4===f.tag&&f.stateNode.containerInfo===s.containerInfo&&f.stateNode.implementation===s.implementation){u(e,f.sibling),(v=i(f,s.children||[])).return=e,e=v
break n}u(e,f)
break}r(e,f),f=f.sibling}(v=Lt(s,e.mode,v)).return=e,e=v}return c(e)
case fu:return b(e,f,s=(d=s.u)(s.t),v)}if(bu(s))return function(e,l,t,i){for(var c=null,f=null,s=l,v=l=0,d=null;null!==s&&v<t.length;v++){s.index>v?(d=s,s=null):d=s.sibling
var b=h(e,s,t[v],i)
if(null===b){null===s&&(s=d)
break}n&&s&&null===b.alternate&&r(e,s),l=a(b,l,v),null===f?c=b:f.sibling=b,f=b,s=d}if(v===t.length)return u(e,s),oa&&I(e,v),c
if(null===s){for(;v<t.length;v++)null!==(s=p(e,t[v],i))&&(l=a(s,l,v),null===f?c=s:f.sibling=s,f=s)
return oa&&I(e,v),c}for(s=o(s);v<t.length;v++)null!==(d=y(s,e,v,t[v],i))&&(n&&null!==d.alternate&&s.delete(null===d.key?v:d.key),l=a(d,l,v),null===f?c=d:f.sibling=d,f=d)
return n&&s.forEach(function(n){return r(e,n)}),oa&&I(e,v),c}(e,f,s,v)
if(t(s)){if("function"!=typeof(d=t(s)))throw Error(l(150))
return function(e,t,i,c){if(null==i)throw Error(l(151))
for(var f=null,s=null,v=t,d=t=0,b=null,w=i.next();null!==v&&!w.done;d++,w=i.next()){v.index>d?(b=v,v=null):b=v.sibling
var m=h(e,v,w.value,c)
if(null===m){null===v&&(v=b)
break}n&&v&&null===m.alternate&&r(e,v),t=a(m,t,d),null===s?f=m:s.sibling=m,s=m,v=b}if(w.done)return u(e,v),oa&&I(e,d),f
if(null===v){for(;!w.done;d++,w=i.next())null!==(w=p(e,w.value,c))&&(t=a(w,t,d),null===s?f=w:s.sibling=w,s=w)
return oa&&I(e,d),f}for(v=o(v);!w.done;d++,w=i.next())null!==(w=y(v,e,d,w.value,c))&&(n&&null!==w.alternate&&v.delete(null===w.key?d:w.key),t=a(w,t,d),null===s?f=w:s.sibling=w,s=w)
return n&&v.forEach(function(n){return r(e,n)}),oa&&I(e,d),f}(e,f,s=d.call(s),v)}if("function"==typeof s.then)return b(e,f,xn(s),v)
if(s.$$typeof===uu)return b(e,f,Dr(e,s),v)
Sn(e,s)}return"string"==typeof s&&""!==s||"number"==typeof s||"bigint"==typeof s?(s=""+s,null!==f&&6===f.tag?(u(e,f.sibling),(v=i(f,s)).return=e,e=v):(u(e,f),(v=At(s,e.mode,v)).return=e,e=v),c(e)):u(e,f)}return function(n,r,l,t){try{Ia=0
var u=b(n,r,l,t)
return za=null,u}catch(i){if(i===Ma)throw i
var o=e(29,i,null,n.mode)
return o.lanes=t,o.return=n,o}}}function jn(n,e){b(Oa,n=Vc),b(_a,e),Vc=n|e.baseLanes}function Pn(){b(Oa,Vc),b(_a,_a.current)}function Rn(){Vc=Oa.current,y(_a),y(Oa)}function zn(n){var e=n.alternate
b(Da,1&Da.current),b(Aa,n),null===La&&(null===e||null!==_a.current||null!==e.memoizedState)&&(La=n)}function In(n){if(22===n.tag){if(b(Da,Da.current),b(Aa,n),null===La){var e=n.alternate
null!==e&&null!==e.memoizedState&&(La=n)}}else Tn()}function Tn(){b(Da,Da.current),b(Aa,Aa.current)}function Fn(n){y(Aa),La===n&&(La=null),y(Da)}function _n(n){for(var e=n;null!==e;){if(13===e.tag){var r=e.memoizedState
if(null!==r&&(null===(r=r.dehydrated)||To(r)||Fo(r)))return e}else if(19===e.tag&&void 0!==e.memoizedProps.revealOrder){if(128&e.flags)return e}else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return null
e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function On(){throw Error(l(321))}function An(n,e){if(null===e)return!1
for(var r=0;r<e.length&&r<n.length;r++)if(!Hi(n[r],e[r]))return!1
return!0}function Ln(n,e,r,l,t,u){return Na=u,Ba=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,hu.H=null===n||null===n.memoizedState?Xa:Za,$a=!1,u=r(l,t),$a=!1,qa&&(u=Nn(e,r,l,t)),Dn(n),u}function Dn(n){hu.H=Ka
var e=null!==Ua&&null!==Ua.next
if(Na=0,Va=Ua=Ba=null,Ha=!1,Ga=0,Qa=null,e)throw Error(l(300))
null===n||tc||null!==(n=n.dependencies)&&Or(n)&&(tc=!0)}function Nn(n,e,r,t){Ba=n
var u=0
do{if(qa&&(Qa=null),Ga=0,qa=!1,25<=u)throw Error(l(301))
if(u+=1,Va=Ua=null,null!=n.updateQueue){var o=n.updateQueue
o.lastEffect=null,o.events=null,o.stores=null,null!=o.memoCache&&(o.memoCache.index=0)}hu.H=nc,o=e(r,t)}while(qa)
return o}function Vn(){var n=hu.H,e=n.useState()[0]
return e="function"==typeof e.then?Qn(e):e,n=n.useState()[0],(null!==Ua?Ua.memoizedState:null)!==n&&(Ba.flags|=1024),e}function Hn(){var n=0!==Wa
return Wa=0,n}function qn(n,e,r){e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r}function $n(n){if(Ha){for(n=n.memoizedState;null!==n;){var e=n.queue
null!==e&&(e.pending=null),n=n.next}Ha=!1}Na=0,Va=Ua=Ba=null,qa=!1,Ga=Wa=0,Qa=null}function Wn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===Va?Ba.memoizedState=Va=n:Va=Va.next=n,Va}function Gn(){if(null===Ua){var n=Ba.alternate
n=null!==n?n.memoizedState:null}else n=Ua.next
var e=null===Va?Ba.memoizedState:Va.next
if(null!==e)Va=e,Ua=n
else{if(null===n){if(null===Ba.alternate)throw Error(l(467))
throw Error(l(310))}n={memoizedState:(Ua=n).memoizedState,baseState:Ua.baseState,baseQueue:Ua.baseQueue,queue:Ua.queue,next:null},null===Va?Ba.memoizedState=Va=n:Va=Va.next=n}return Va}function Qn(n){var e=Ga
return Ga+=1,null===Qa&&(Qa=[]),n=kn(Qa,n,e),e=Ba,null===(null===Va?e.memoizedState:Va.next)&&(e=e.alternate,hu.H=null===e||null===e.memoizedState?Xa:Za),n}function Kn(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return Qn(n)
if(n.$$typeof===uu)return Lr(n)}throw Error(l(438,String(n)))}function Xn(n){var e=null,r=Ba.updateQueue
if(null!==r&&(e=r.memoCache),null==e){var l=Ba.alternate
null!==l&&null!==(l=l.updateQueue)&&null!=(l=l.memoCache)&&(e={data:l.data.map(function(n){return n.slice()}),index:0})}if(null==e&&(e={data:[],index:0}),null===r&&(r=Ja(),Ba.updateQueue=r),r.memoCache=e,void 0===(r=e.data[e.index]))for(r=e.data[e.index]=Array(n),l=0;l<n;l++)r[l]=vu
return e.index++,r}function Zn(n,e){return"function"==typeof e?e(n):e}function ne(n){return ee(Gn(),Ua,n)}function ee(n,e,r){var t=n.queue
if(null===t)throw Error(l(311))
t.lastRenderedReducer=r
var u=n.baseQueue,o=t.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}e.baseQueue=u=o,t.pending=null}if(o=n.baseState,null===u)n.memoizedState=o
else{var a=i=null,c=null,f=e=u.next,s=!1
do{var v=-536870913&f.lane
if(v!==f.lane?(Ac&v)===v:(Na&v)===v){var d=f.revertLane
if(0===d)null!==c&&(c=c.next={lane:0,revertLane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),v===ga&&(s=!0)
else{if((Na&d)===d){f=f.next,d===ga&&(s=!0)
continue}v={lane:0,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=v,i=o):c=c.next=v,Ba.lanes|=d,qc|=d}v=f.action,$a&&r(o,v),o=f.hasEagerState?f.eagerState:r(o,v)}else d={lane:v,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=d,i=o):c=c.next=d,Ba.lanes|=v,qc|=v
f=f.next}while(null!==f&&f!==e)
if(null===c?i=o:c.next=a,!Hi(o,n.memoizedState)&&(tc=!0,s&&null!==(r=xa)))throw r
n.memoizedState=o,n.baseState=i,n.baseQueue=c,t.lastRenderedState=o}return null===u&&(t.lanes=0),[n.memoizedState,t.dispatch]}function re(n){var e=Gn(),r=e.queue
if(null===r)throw Error(l(311))
r.lastRenderedReducer=n
var t=r.dispatch,u=r.pending,o=e.memoizedState
if(null!==u){r.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
Hi(o,e.memoizedState)||(tc=!0),e.memoizedState=o,null===e.baseQueue&&(e.baseState=o),r.lastRenderedState=o}return[o,t]}function le(n,e,r){var t=Ba,u=Gn(),o=oa
if(o){if(void 0===r)throw Error(l(407))
r=r()}else r=e()
var i=!Hi((Ua||u).memoizedState,r)
if(i&&(u.memoizedState=r,tc=!0),u=u.queue,Pe(oe.bind(null,t,u,n),[n]),u.getSnapshot!==e||i||null!==Va&&1&Va.memoizedState.tag){if(t.flags|=2048,Ee(9,ue.bind(null,t,u,r,e),{destroy:void 0},null),null===_c)throw Error(l(349))
o||60&Na||te(t,e,r)}return r}function te(n,e,r){n.flags|=16384,n={getSnapshot:e,value:r},null===(e=Ba.updateQueue)?(e=Ja(),Ba.updateQueue=e,e.stores=[n]):null===(r=e.stores)?e.stores=[n]:r.push(n)}function ue(n,e,r,l){e.value=r,e.getSnapshot=l,ie(e)&&ae(n)}function oe(n,e,r){return r(function(){ie(e)&&ae(n)})}function ie(n){var e=n.getSnapshot
n=n.value
try{var r=e()
return!Hi(n,r)}catch(l){return!0}}function ae(n){var e=Q(n,2)
null!==e&&Kl(e,0,2)}function ce(n){var e=Wn()
if("function"==typeof n){var r=n
if(n=r(),$a){R(!0)
try{r()}finally{R(!1)}}}return e.memoizedState=e.baseState=n,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:n},e}function fe(n,e,r,l){return n.baseState=r,ee(n,Ua,"function"==typeof l?l:Zn)}function se(n,e,r,t,u){if(Ye(n))throw Error(l(485))
if(null!==(n=e.action)){var o={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){o.listeners.push(n)}}
null!==hu.T?r(!0):o.isTransition=!1,t(o),null===(r=e.pending)?(o.next=e.pending=o,ve(e,o)):(o.next=r.next,e.pending=r.next=o)}}function ve(n,e){var r=e.action,l=e.payload,t=n.state
if(e.isTransition){var u=hu.T,o={}
hu.T=o
try{var i=r(t,l),a=hu.S
null!==a&&a(o,i),de(n,e,i)}catch(c){he(n,e,c)}finally{hu.T=u}}else try{de(n,e,u=r(t,l))}catch(f){he(n,e,f)}}function de(n,e,r){null!==r&&"object"==typeof r&&"function"==typeof r.then?r.then(function(r){pe(n,e,r)},function(r){return he(n,e,r)}):pe(n,e,r)}function pe(n,e,r){e.status="fulfilled",e.value=r,ye(e),n.state=r,null!==(e=n.pending)&&((r=e.next)===e?n.pending=null:(r=r.next,e.next=r,ve(n,r)))}function he(n,e,r){var l=n.pending
if(n.pending=null,null!==l){l=l.next
do{e.status="rejected",e.reason=r,ye(e),e=e.next}while(e!==l)}n.action=null}function ye(n){n=n.listeners
for(var e=0;e<n.length;e++)(0,n[e])()}function be(n,e){return e}function we(n,e){if(oa){var r=_c.formState
if(null!==r){n:{var l=Ba
if(oa){if(ua){var t=Ao(ua,aa)
if(t){ua=Do(t),l=Lo(t)
break n}}N(l)}l=!1}l&&(e=r[0])}}(r=Wn()).memoizedState=r.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:be,lastRenderedState:e},r.queue=l,r=$e.bind(null,Ba,l),l.dispatch=r,l=ce(!1)
var u=Ge.bind(null,Ba,!1,l.queue)
return t={state:e,dispatch:null,action:n,pending:null},(l=Wn()).queue=t,r=se.bind(null,Ba,t,u,r),t.dispatch=r,l.memoizedState=n,[e,r,!1]}function me(n){return ke(Gn(),Ua,n)}function ke(n,e,r){e=ee(n,e,be)[0],n=ne(Zn)[0],e="object"==typeof e&&null!==e&&"function"==typeof e.then?Qn(e):e
var l=Gn(),t=l.queue,u=t.dispatch
return r!==l.memoizedState&&(Ba.flags|=2048,Ee(9,ge.bind(null,t,r),{destroy:void 0},null)),[e,u,n]}function ge(n,e){n.action=e}function xe(n){var e=Gn(),r=Ua
if(null!==r)return ke(e,r,n)
Gn(),e=e.memoizedState
var l=(r=Gn()).queue.dispatch
return r.memoizedState=n,[e,l,!1]}function Ee(n,e,r,l){return n={tag:n,create:e,inst:r,deps:l,next:null},null===(e=Ba.updateQueue)&&(e=Ja(),Ba.updateQueue=e),null===(r=e.lastEffect)?e.lastEffect=n.next=n:(l=r.next,r.next=n,n.next=l,e.lastEffect=n),n}function Se(){return Gn().memoizedState}function Ce(n,e,r,l){var t=Wn()
Ba.flags|=n,t.memoizedState=Ee(1|e,r,{destroy:void 0},void 0===l?null:l)}function Me(n,e,r,l){var t=Gn()
l=void 0===l?null:l
var u=t.memoizedState.inst
null!==Ua&&null!==l&&An(l,Ua.memoizedState.deps)?t.memoizedState=Ee(e,r,u,l):(Ba.flags|=n,t.memoizedState=Ee(1|e,r,u,l))}function je(n,e){Ce(8390656,8,n,e)}function Pe(n,e){Me(2048,8,n,e)}function Re(n,e){return Me(4,2,n,e)}function ze(n,e){return Me(4,4,n,e)}function Ie(n,e){if("function"==typeof e){n=n()
var r=e(n)
return function(){"function"==typeof r?r():e(null)}}if(null!=e)return n=n(),e.current=n,function(){e.current=null}}function Te(n,e,r){r=null!=r?r.concat([n]):null,Me(4,4,Ie.bind(null,e,n),r)}function Fe(){}function _e(n,e){var r=Gn()
e=void 0===e?null:e
var l=r.memoizedState
return null!==e&&An(e,l[1])?l[0]:(r.memoizedState=[n,e],n)}function Oe(n,e){var r=Gn()
e=void 0===e?null:e
var l=r.memoizedState
if(null!==e&&An(e,l[1]))return l[0]
if(l=n(),$a){R(!0)
try{n()}finally{R(!1)}}return r.memoizedState=[l,e],l}function Ae(n,e,r){return void 0===r||1073741824&Na?n.memoizedState=e:(n.memoizedState=r,n=Jl(),Ba.lanes|=n,qc|=n,r)}function Le(n,e,r,l){return Hi(r,e)?r:null!==_a.current?(n=Ae(n,r,l),Hi(n,e)||(tc=!0),n):42&Na?(n=Jl(),Ba.lanes|=n,qc|=n,e):(tc=!0,n.memoizedState=r)}function De(n,e,r,l,t){var u=Uu()
Bu(0!==u&&8>u?u:8)
var o=hu.T,i={}
hu.T=i,Ge(n,!1,e,r)
try{var a=t(),c=hu.S
null!==c&&c(i,a),null!==a&&"object"==typeof a&&"function"==typeof a.then?We(n,e,function(n,e){var r=[],l={status:"pending",value:null,reason:null,then:function(n){r.push(n)}}
return n.then(function(){l.status="fulfilled",l.value=e
for(var n=0;n<r.length;n++)(0,r[n])(e)},function(n){for(l.status="rejected",l.reason=n,n=0;n<r.length;n++)(0,r[n])(void 0)}),l}(a,l),Yl()):We(n,e,l,Yl())}catch(f){We(n,e,{then:function(){},status:"rejected",reason:f},Yl())}finally{Bu(u),hu.T=o}}function Ne(n){var e=n.memoizedState
if(null!==e)return e
var r={}
return(e={memoizedState:Ju,baseState:Ju,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:Ju},next:null}).next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:r},next:null},n.memoizedState=e,null!==(n=n.alternate)&&(n.memoizedState=e),e}function Be(){return Lr(Ku)}function Ue(){return Gn().memoizedState}function Ve(){return Gn().memoizedState}function He(n){for(var e=n.return;null!==e;){switch(e.tag){case 24:case 3:var r=Yl(),l=fn(e,n=cn(r),r)
return null!==l&&(Kl(l,0,r),sn(l,e,r)),e={cache:Br()},n.payload=e,void 0}e=e.return}}function qe(n,e,r){var l=Yl()
r={lane:l,revertLane:0,action:r,hasEagerState:!1,eagerState:null,next:null},Ye(n)?Je(e,r):null!==(r=G(n,e,r,l))&&(Kl(r,0,l),Ke(r,e,l))}function $e(n,e,r){We(n,e,r,Yl())}function We(n,e,r,l){var t={lane:l,revertLane:0,action:r,hasEagerState:!1,eagerState:null,next:null}
if(Ye(n))Je(e,t)
else{var u=n.alternate
if(0===n.lanes&&(null===u||0===u.lanes)&&null!==(u=e.lastRenderedReducer))try{var o=e.lastRenderedState,i=u(o,r)
if(t.hasEagerState=!0,t.eagerState=i,Hi(i,o))return W(n,e,t,0),null===_c&&$(),!1}catch(a){}if(null!==(r=G(n,e,t,l)))return Kl(r,0,l),Ke(r,e,l),!0}return!1}function Ge(n,e,r,t){if(t={lane:2,revertLane:tn(),action:t,hasEagerState:!1,eagerState:null,next:null},Ye(n)){if(e)throw Error(l(479))}else null!==(e=G(n,r,t,2))&&Kl(e,0,2)}function Ye(n){var e=n.alternate
return n===Ba||null!==e&&e===Ba}function Je(n,e){qa=Ha=!0
var r=n.pending
null===r?e.next=e:(e.next=r.next,r.next=e),n.pending=e}function Ke(n,e,r){if(4194176&r){var l=e.lanes
r|=l&=n.pendingLanes,e.lanes=r,j(n,r)}}function Xe(n,e,r,l){r=null==(r=r(l,e=n.memoizedState))?e:Jt({},e,r),n.memoizedState=r,0===n.lanes&&(n.updateQueue.baseState=r)}function Ze(n,e,r,l,t,u,o){return"function"==typeof(n=n.stateNode).shouldComponentUpdate?n.shouldComponentUpdate(l,u,o):!(e.prototype&&e.prototype.isPureReactComponent&&bn(r,l)&&bn(t,u))}function nr(n,e,r,l){n=e.state,"function"==typeof e.componentWillReceiveProps&&e.componentWillReceiveProps(r,l),"function"==typeof e.UNSAFE_componentWillReceiveProps&&e.UNSAFE_componentWillReceiveProps(r,l),e.state!==n&&ec.enqueueReplaceState(e,e.state,null)}function er(n,e){var r=e
if("ref"in e)for(var l in r={},e)"ref"!==l&&(r[l]=e[l])
if(n=n.defaultProps)for(var t in r===e&&(r=Jt({},r)),n)void 0===r[t]&&(r[t]=n[t])
return r}function rr(n,e){try{(0,n.onUncaughtError)(e.value,{componentStack:e.stack})}catch(Qe){setTimeout(function(){throw Qe})}}function lr(n,e,r){try{(0,n.onCaughtError)(r.value,{componentStack:r.stack,errorBoundary:1===e.tag?e.stateNode:null})}catch(Qe){setTimeout(function(){throw Qe})}}function tr(n,e,r){return(r=cn(r)).tag=3,r.payload={element:null},r.callback=function(){rr(n,e)},r}function ur(n){return(n=cn(n)).tag=3,n}function or(n,e,r,l){var t=r.type.getDerivedStateFromError
if("function"==typeof t){var u=l.value
n.payload=function(){return t(u)},n.callback=function(){lr(e,r,l)}}var o=r.stateNode
null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){lr(e,r,l),"function"!=typeof t&&(null===ef?ef=new Set([this]):ef.add(this))
var n=l.stack
this.componentDidCatch(l.value,{componentStack:null!==n?n:""})})}function ir(n,e,r,l){e.child=null===n?Fa(e,null,r,l):Ta(e,n.child,r,l)}function ar(n,e,r,l,t){r=r.render
var u=e.ref
if("ref"in l){var o={}
for(var i in l)"ref"!==i&&(o[i]=l[i])}else o=l
return Ar(e),l=Ln(n,e,r,o,u,t),i=Hn(),null===n||tc?(oa&&i&&F(e),e.flags|=1,ir(n,e,l,t),e.child):(qn(n,e,t),jr(n,e,t))}function cr(n,e,r,l,t){if(null===n){var u=r.type
return"function"!=typeof u||zt(u)||void 0!==u.defaultProps||null!==r.compare?((n=Ft(r.type,null,l,e,e.mode,t)).ref=e.ref,n.return=e,e.child=n):(e.tag=15,e.type=u,fr(n,e,u,l,t))}if(u=n.child,!Pr(n,t)){var o=u.memoizedProps
if((r=null!==(r=r.compare)?r:bn)(o,l)&&n.ref===e.ref)return jr(n,e,t)}return e.flags|=1,(n=It(u,l)).ref=e.ref,n.return=e,e.child=n}function fr(n,e,r,l,t){if(null!==n){var u=n.memoizedProps
if(bn(u,l)&&n.ref===e.ref){if(tc=!1,e.pendingProps=l=u,!Pr(n,t))return e.lanes=n.lanes,jr(n,e,t)
131072&n.flags&&(tc=!0)}}return pr(n,e,r,l,t)}function sr(n,e,r){var l=e.pendingProps,t=l.children,u=!!(2&e.stateNode.p),o=null!==n?n.memoizedState:null
if(dr(n,e),"hidden"===l.mode||u){if(128&e.flags){if(l=null!==o?o.baseLanes|r:r,null!==n){for(t=e.child=n.child,u=0;null!==t;)u=u|t.lanes|t.childLanes,t=t.sibling
e.childLanes=u&~l}else e.childLanes=0,e.child=null
return vr(n,e,l,r)}if(!(536870912&r))return e.lanes=e.childLanes=536870912,vr(n,e,null!==o?o.baseLanes|r:r,r)
e.memoizedState={baseLanes:0,cachePool:null},null!==n&&Hr(0,null!==o?o.cachePool:null),null!==o?jn(e,o):Pn(),In(e)}else null!==o?(Hr(0,o.cachePool),jn(e,o),Tn(),e.memoizedState=null):(null!==n&&Hr(0,null),Pn(),Tn())
return ir(n,e,t,r),e.child}function vr(n,e,r,l){var t=Vr()
return t=null===t?null:{parent:_u?vc.o:vc.i,pool:t},e.memoizedState={baseLanes:r,cachePool:t},null!==n&&Hr(0,null),Pn(),In(e),null!==n&&_r(n,e,l,!0),null}function dr(n,e){var r=e.ref
if(null===r)null!==n&&null!==n.ref&&(e.flags|=2097664)
else{if("function"!=typeof r&&"object"!=typeof r)throw Error(l(284))
null!==n&&n.ref===r||(e.flags|=2097664)}}function pr(n,e,r,l,t){return Ar(e),r=Ln(n,e,r,l,void 0,t),l=Hn(),null===n||tc?(oa&&l&&F(e),e.flags|=1,ir(n,e,r,t),e.child):(qn(n,e,t),jr(n,e,t))}function hr(n,e,r,l,t,u){return Ar(e),e.updateQueue=null,r=Nn(e,l,r,t),Dn(n),l=Hn(),null===n||tc?(oa&&l&&F(e),e.flags|=1,ir(n,e,r,u),e.child):(qn(n,e,u),jr(n,e,u))}function yr(n,e,r,l,t){if(Ar(e),null===e.stateNode){var u=Si,o=r.contextType
"object"==typeof o&&null!==o&&(u=Lr(o)),u=new r(l,u),e.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=ec,e.stateNode=u,u.h=e,(u=e.stateNode).props=l,u.state=e.memoizedState,u.refs={},on(e),o=r.contextType,u.context="object"==typeof o&&null!==o?Lr(o):Si,u.state=e.memoizedState,"function"==typeof(o=r.getDerivedStateFromProps)&&(Xe(e,r,o,l),u.state=e.memoizedState),"function"==typeof r.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(o=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),o!==u.state&&ec.enqueueReplaceState(u,u.state,null),pn(e,l,u,t),dn(),u.state=e.memoizedState),"function"==typeof u.componentDidMount&&(e.flags|=4194308),l=!0}else if(null===n){u=e.stateNode
var i=e.memoizedProps,a=er(r,i)
u.props=a
var c=u.context,f=r.contextType
o=Si,"object"==typeof f&&null!==f&&(o=Lr(f))
var s=r.getDerivedStateFromProps
f="function"==typeof s||"function"==typeof u.getSnapshotBeforeUpdate,i=e.pendingProps!==i,f||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(i||c!==o)&&nr(e,u,l,o),Ea=!1
var v=e.memoizedState
u.state=v,pn(e,l,u,t),dn(),c=e.memoizedState,i||v!==c||Ea?("function"==typeof s&&(Xe(e,r,s,l),c=e.memoizedState),(a=Ea||Ze(e,r,a,l,v,c,o))?(f||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(e.flags|=4194308)):("function"==typeof u.componentDidMount&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=c),u.props=l,u.state=c,u.context=o,l=a):("function"==typeof u.componentDidMount&&(e.flags|=4194308),l=!1)}else{u=e.stateNode,an(n,e),f=er(r,o=e.memoizedProps),u.props=f,s=e.pendingProps,v=u.context,c=r.contextType,a=Si,"object"==typeof c&&null!==c&&(a=Lr(c)),(c="function"==typeof(i=r.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o!==s||v!==a)&&nr(e,u,l,a),Ea=!1,v=e.memoizedState,u.state=v,pn(e,l,u,t),dn()
var d=e.memoizedState
o!==s||v!==d||Ea||null!==n&&null!==n.dependencies&&Or(n.dependencies)?("function"==typeof i&&(Xe(e,r,i,l),d=e.memoizedState),(f=Ea||Ze(e,r,f,l,v,d,a)||null!==n&&null!==n.dependencies&&Or(n.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(l,d,a),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(l,d,a)),"function"==typeof u.componentDidUpdate&&(e.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(e.flags|=1024)):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=d),u.props=l,u.state=d,u.context=a,l=f):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),l=!1)}return u=l,dr(n,e),l=!!(128&e.flags),u||l?(u=e.stateNode,r=l&&"function"!=typeof r.getDerivedStateFromError?null:u.render(),e.flags|=1,null!==n&&l?(e.child=Ta(e,n.child,null,t),e.child=Ta(e,null,r,t)):ir(n,e,r,t),e.memoizedState=u.state,n=e.child):n=jr(n,e,t),n}function br(n,e,r,l){return H(),e.flags|=256,ir(n,e,r,l),e.child}function wr(n){return{baseLanes:n,cachePool:qr()}}function mr(n,e,r){return n=null!==n?n.childLanes&~r:0,e&&(n|=Gc),n}function kr(n,r,t){var u,o=r.pendingProps,i=!1,a=!!(128&r.flags)
if((u=a)||(u=(null===n||null!==n.memoizedState)&&!!(2&Da.current)),u&&(i=!0,r.flags&=-129),u=!!(32&r.flags),r.flags&=-33,null===n){if(oa){if(i?zn(r):Tn(),oa){var c,f=ua;(c=f)&&(null!==(f=qo(f,aa))?(r.memoizedState={dehydrated:f,treeContext:null!==Ki?{id:Xi,overflow:Zi}:null,retryLane:536870912},(c=e(18,null,null,0)).stateNode=f,c.return=r,r.child=c,ta=r,ua=null,c=!0):c=!1),c||N(r)}if(null!==(f=r.memoizedState)&&null!==(f=f.dehydrated))return Fo(f)?r.lanes=16:r.lanes=536870912,null
Fn(r)}return f=o.children,o=o.fallback,i?(Tn(),f=xr({mode:"hidden",children:f},i=r.mode),o=_t(o,i,t,null),f.return=r,o.return=r,f.sibling=o,r.child=f,(i=r.child).memoizedState=wr(t),i.childLanes=mr(n,u,t),r.memoizedState=uc,o):(zn(r),gr(r,f))}if(null!==(c=n.memoizedState)&&null!==(f=c.dehydrated)){if(a)256&r.flags?(zn(r),r.flags&=-257,r=Er(n,r,t)):null!==r.memoizedState?(Tn(),r.child=n.child,r.flags|=128,r=null):(Tn(),i=o.fallback,f=r.mode,o=xr({mode:"visible",children:o.children},f),(i=_t(i,f,t,null)).flags|=2,o.return=r,i.return=r,o.sibling=i,r.child=o,Ta(r,n.child,null,t),(o=r.child).memoizedState=wr(t),o.childLanes=mr(n,u,t),r.memoizedState=uc,r=i)
else if(zn(r),Fo(f))u=_o(f).digest,(o=Error(l(419))).stack="",o.digest=u,q({value:o,source:null,stack:null}),r=Er(n,r,t)
else if(tc||_r(n,r,t,!1),u=0!==(t&n.childLanes),tc||u){if(null!==(u=_c)){if(42&(o=t&-t))o=1
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
default:o=0}if(0!==(o=0!==(o&(u.suspendedLanes|t))?0:o)&&o!==c.retryLane)throw c.retryLane=o,Q(n,o),Kl(u,0,o),lc}To(f)||ft(),r=Er(n,r,t)}else To(f)?(r.flags|=128,r.child=n.child,r=jt.bind(null,n),Oo(f,r),r=null):(n=c.treeContext,Lu&&(ua=Uo(f),ta=r,oa=!0,ia=null,aa=!1,null!==n&&(Yi[Ji++]=Xi,Yi[Ji++]=Zi,Yi[Ji++]=Ki,Xi=n.id,Zi=n.overflow,Ki=r)),(r=gr(r,o.children)).flags|=4096)
return r}return i?(Tn(),i=o.fallback,f=r.mode,a=(c=n.child).sibling,(o=It(c,{mode:"hidden",children:o.children})).subtreeFlags=31457280&c.subtreeFlags,null!==a?i=It(a,i):(i=_t(i,f,t,null)).flags|=2,i.return=r,o.return=r,o.sibling=i,r.child=o,o=i,i=r.child,null===(f=n.child.memoizedState)?f=wr(t):(null!==(c=f.cachePool)?(a=_u?vc.o:vc.i,c=c.parent!==a?{parent:a,pool:a}:c):c=qr(),f={baseLanes:f.baseLanes|t,cachePool:c}),i.memoizedState=f,i.childLanes=mr(n,u,t),r.memoizedState=uc,o):(zn(r),n=(t=n.child).sibling,(t=It(t,{mode:"visible",children:o.children})).return=r,t.sibling=null,null!==n&&(null===(u=r.deletions)?(r.deletions=[n],r.flags|=16):u.push(n)),r.child=t,r.memoizedState=null,t)}function gr(n,e){return(e=xr({mode:"visible",children:e},n.mode)).return=n,n.child=e}function xr(n,e){return Ot(n,e,0,null)}function Er(n,e,r){return Ta(e,n.child,null,r),(n=gr(e,e.pendingProps.children)).flags|=2,e.memoizedState=null,n}function Sr(n,e,r){n.lanes|=e
var l=n.alternate
null!==l&&(l.lanes|=e),Tr(n.return,e,r)}function Cr(n,e,r,l,t){var u=n.memoizedState
null===u?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:r,tailMode:t}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=l,u.tail=r,u.tailMode=t)}function Mr(n,e,r){var l=e.pendingProps,t=l.revealOrder,u=l.tail
if(ir(n,e,l.children,r),2&(l=Da.current))l=1&l|2,e.flags|=128
else{if(null!==n&&128&n.flags)n:for(n=e.child;null!==n;){if(13===n.tag)null!==n.memoizedState&&Sr(n,r,e)
else if(19===n.tag)Sr(n,r,e)
else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break n
for(;null===n.sibling;){if(null===n.return||n.return===e)break n
n=n.return}n.sibling.return=n.return,n=n.sibling}l&=1}switch(b(Da,l),t){case"forwards":for(r=e.child,t=null;null!==r;)null!==(n=r.alternate)&&null===_n(n)&&(t=r),r=r.sibling
null===(r=t)?(t=e.child,e.child=null):(t=r.sibling,r.sibling=null),Cr(e,!1,t,r,u)
break
case"backwards":for(r=null,t=e.child,e.child=null;null!==t;){if(null!==(n=t.alternate)&&null===_n(n)){e.child=t
break}n=t.sibling,t.sibling=r,r=t,t=n}Cr(e,!0,r,null,u)
break
case"together":Cr(e,!1,null,null,void 0)
break
default:e.memoizedState=null}return e.child}function jr(n,e,r){if(null!==n&&(e.dependencies=n.dependencies),qc|=e.lanes,0===(r&e.childLanes)){if(null===n)return null
if(_r(n,e,r,!1),0===(r&e.childLanes))return null}if(null!==n&&e.child!==n.child)throw Error(l(153))
if(null!==e.child){for(r=It(n=e.child,n.pendingProps),e.child=r,r.return=e;null!==n.sibling;)n=n.sibling,(r=r.sibling=It(n,n.pendingProps)).return=e
r.sibling=null}return e.child}function Pr(n,e){return 0!==(n.lanes&e)||!(null===(n=n.dependencies)||!Or(n))}function Rr(n,e,r){if(null!==n)if(n.memoizedProps!==e.pendingProps)tc=!0
else{if(!(Pr(n,r)||128&e.flags))return tc=!1,function(n,e,r){switch(e.tag){case 3:O(e,e.stateNode.containerInfo),zr(0,vc,n.memoizedState.cache),H()
break
case 27:case 5:L(e)
break
case 4:O(e,e.stateNode.containerInfo)
break
case 10:zr(0,e.type,e.memoizedProps.value)
break
case 13:var l=e.memoizedState
if(null!==l)return null!==l.dehydrated?(zn(e),e.flags|=128,null):0!==(r&e.child.childLanes)?kr(n,e,r):(zn(e),null!==(n=jr(n,e,r))?n.sibling:null)
zn(e)
break
case 19:var t=!!(128&n.flags)
if((l=0!==(r&e.childLanes))||(_r(n,e,r,!1),l=0!==(r&e.childLanes)),t){if(l)return Mr(n,e,r)
e.flags|=128}if(null!==(t=e.memoizedState)&&(t.rendering=null,t.tail=null,t.lastEffect=null),b(Da,Da.current),l)break
return null
case 22:case 23:return e.lanes=0,sr(n,e,r)
case 24:zr(0,vc,n.memoizedState.cache)}return jr(n,e,r)}(n,e,r)
tc=!!(131072&n.flags)}else tc=!1,oa&&1048576&e.flags&&T(e,Qi,e.index)
switch(e.lanes=0,e.tag){case 16:n:{n=e.pendingProps
var t=e.elementType,o=t.u
if(t=o(t.t),e.type=t,"function"!=typeof t){if(null!=t){if((o=t.$$typeof)===ou){e.tag=11,e=ar(null,e,t,n,r)
break n}if(o===cu){e.tag=14,e=cr(null,e,t,n,r)
break n}}throw e=u(t)||t,Error(l(306,e,""))}zt(t)?(n=er(t,n),e.tag=1,e=yr(null,e,t,n,r)):(e.tag=0,e=pr(null,e,t,n,r))}return e
case 0:return pr(n,e,e.type,e.pendingProps,r)
case 1:return yr(n,e,t=e.type,o=er(t,e.pendingProps),r)
case 3:n:{if(O(e,e.stateNode.containerInfo),null===n)throw Error(l(387))
var i=e.pendingProps
t=(o=e.memoizedState).element,an(n,e),pn(e,i,null,r)
var a=e.memoizedState
if(i=a.cache,zr(0,vc,i),i!==o.cache&&Fr(e,[vc],r,!0),dn(),i=a.element,Lu&&o.isDehydrated){if(o={element:i,isDehydrated:!1,cache:a.cache},e.updateQueue.baseState=o,e.memoizedState=o,256&e.flags){e=br(n,e,i,r)
break n}if(i!==t){q(t=z(Error(l(424)),e)),e=br(n,e,i,r)
break n}for(Lu&&(ua=Bo(e.stateNode.containerInfo),ta=e,oa=!0,ia=null,aa=!0),r=Fa(e,null,i,r),e.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(H(),i===t){e=jr(n,e,r)
break n}ir(n,e,i,r)}e=e.child}return e
case 26:if(ri)return dr(n,e),null===n?(r=ui(e.type,null,e.pendingProps,null))?e.memoizedState=r:oa||(e.stateNode=si(e.type,e.pendingProps,ra.current,e)):e.memoizedState=ui(e.type,n.memoizedProps,e.pendingProps,n.memoizedState),null
case 27:if(yi)return L(e),null===n&&yi&&oa&&(t=e.stateNode=bi(e.type,e.pendingProps,ra.current,na.current,!1),ta=e,aa=!0,ua=No(t)),t=e.pendingProps.children,null!==n||oa?ir(n,e,t,r):e.child=Ta(e,null,t,r),dr(n,e),e.child
case 5:return null===n&&oa&&(ni(e.type,e.pendingProps,na.current),(o=t=ua)&&(null!==(t=Vo(t,e.type,e.pendingProps,aa))?(e.stateNode=t,ta=e,ua=No(t),aa=!1,o=!0):o=!1),o||N(e)),L(e),o=e.type,i=e.pendingProps,a=null!==n?n.memoizedProps:null,t=i.children,Ru(o,i)?t=null:null!==a&&Ru(o,a)&&(e.flags|=32),null!==e.memoizedState&&(o=Ln(n,e,Vn,null,null,r),_u?Ku.o=o:Ku.i=o),dr(n,e),ir(n,e,t,r),e.child
case 6:return null===n&&oa&&(ei(e.pendingProps,na.current),(n=r=ua)&&(null!==(r=Ho(r,e.pendingProps,aa))?(e.stateNode=r,ta=e,ua=null,n=!0):n=!1),n||N(e)),null
case 13:return kr(n,e,r)
case 4:return O(e,e.stateNode.containerInfo),t=e.pendingProps,null===n?e.child=Ta(e,null,t,r):ir(n,e,t,r),e.child
case 11:return ar(n,e,e.type,e.pendingProps,r)
case 7:return ir(n,e,e.pendingProps,r),e.child
case 8:case 12:return ir(n,e,e.pendingProps.children,r),e.child
case 10:return t=e.pendingProps,zr(0,e.type,t.value),ir(n,e,t.children,r),e.child
case 9:return o=e.type.l,t=e.pendingProps.children,Ar(e),t=t(o=Lr(o)),e.flags|=1,ir(n,e,t,r),e.child
case 14:return cr(n,e,e.type,e.pendingProps,r)
case 15:return fr(n,e,e.type,e.pendingProps,r)
case 19:return Mr(n,e,r)
case 22:return sr(n,e,r)
case 24:return Ar(e),t=Lr(vc),null===n?(null===(o=Vr())&&(o=_c,i=Br(),o.pooledCache=i,i.refCount++,null!==i&&(o.pooledCacheLanes|=r),o=i),e.memoizedState={parent:t,cache:o},on(e),zr(0,vc,o)):(0!==(n.lanes&r)&&(an(n,e),pn(e,null,null,r),dn()),o=n.memoizedState,i=e.memoizedState,o.parent!==t?(o={parent:t,cache:t},e.memoizedState=o,0===e.lanes&&(e.memoizedState=e.updateQueue.baseState=o),zr(0,vc,t)):(t=i.cache,zr(0,vc,t),t!==o.cache&&Fr(e,[vc],r,!0))),ir(n,e,e.pendingProps.children,r),e.child
case 29:throw e.pendingProps}throw Error(l(156,e.tag))}function zr(n,e,r){_u?(b(oc,e.o),e.o=r):(b(oc,e.i),e.i=r)}function Ir(n){var e=oc.current
_u?n.o=e:n.i=e,y(oc)}function Tr(n,e,r){for(;null!==n;){var l=n.alternate
if((n.childLanes&e)!==e?(n.childLanes|=e,null!==l&&(l.childLanes|=e)):null!==l&&(l.childLanes&e)!==e&&(l.childLanes|=e),n===r)break
n=n.return}}function Fr(n,e,r,t){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var o=u.dependencies
if(null!==o){var i=u.child
o=o.firstContext
n:for(;null!==o;){var a=o
o=u
for(var c=0;c<e.length;c++)if(a.context===e[c]){o.lanes|=r,null!==(a=o.alternate)&&(a.lanes|=r),Tr(o.return,r,n),t||(i=null)
break n}o=a.next}}else if(18===u.tag){if(null===(i=u.return))throw Error(l(341))
i.lanes|=r,null!==(o=i.alternate)&&(o.lanes|=r),Tr(i,r,n),i=null}else i=u.child
if(null!==i)i.return=u
else for(i=u;null!==i;){if(i===n){i=null
break}if(null!==(u=i.sibling)){u.return=i.return,i=u
break}i=i.return}u=i}}function _r(n,e,r,t){n=null
for(var u=e,o=!1;null!==u;){if(!o)if(524288&u.flags)o=!0
else if(262144&u.flags)break
if(10===u.tag){var i=u.alternate
if(null===i)throw Error(l(387))
if(null!==(i=i.memoizedProps)){var a=u.type
Hi(u.pendingProps.value,i.value)||(null!==n?n.push(a):n=[a])}}else if(u===la.current){if(null===(i=u.alternate))throw Error(l(387))
i.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(Ku):n=[Ku])}u=u.return}null!==n&&Fr(e,n,r,t),e.flags|=262144}function Or(n){for(n=n.firstContext;null!==n;){var e=n.context
if(!Hi(_u?e.o:e.i,n.memoizedValue))return!0
n=n.next}return!1}function Ar(n){ic=n,ac=null,null!==(n=n.dependencies)&&(n.firstContext=null)}function Lr(n){return Nr(ic,n)}function Dr(n,e){return null===ic&&Ar(n),Nr(n,e)}function Nr(n,e){var r=_u?e.o:e.i
if(e={context:e,memoizedValue:r,next:null},null===ac){if(null===n)throw Error(l(308))
ac=e,n.dependencies={lanes:0,firstContext:e},n.flags|=524288}else ac=ac.next=e
return r}function Br(){return{controller:new cc,data:new Map,refCount:0}}function Ur(n){n.refCount--,0===n.refCount&&fc(sc,function(){n.controller.abort()})}function Vr(){var n=pc.current
return null!==n?n:_c.pooledCache}function Hr(n,e){b(pc,null===e?pc.current:e.pool)}function qr(){var n=Vr()
return null===n?null:{parent:_u?vc.o:vc.i,pool:n}}function $r(n){n.flags|=4}function Wr(n,e){if(null!==n&&n.child===e.child)return!1
if(16&e.flags)return!0
for(n=e.child;null!==n;){if(13878&n.flags||13878&n.subtreeFlags)return!0
n=n.sibling}return!1}function Gr(n,e,r,l){if(Ou)for(r=e.child;null!==r;){if(5===r.tag||6===r.tag)ju(n,r.stateNode)
else if(!(4===r.tag||yi&&27===r.tag)&&null!==r.child){r.child.return=r,r=r.child
continue}if(r===e)break
for(;null===r.sibling;){if(null===r.return||r.return===e)return
r=r.return}r.sibling.return=r.return,r=r.sibling}else if(Au)for(var t=e.child;null!==t;){if(5===t.tag){var u=t.stateNode
r&&l&&(u=zo(u,t.type,t.memoizedProps)),ju(n,u)}else if(6===t.tag)u=t.stateNode,r&&l&&(u=Io(u,t.memoizedProps)),ju(n,u)
else if(4!==t.tag)if(22===t.tag&&null!==t.memoizedState)null!==(u=t.child)&&(u.return=t),Gr(n,t,!0,!0)
else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}}function Qr(n,e,r,l){if(Au)for(var t=e.child;null!==t;){if(5===t.tag){var u=t.stateNode
r&&l&&(u=zo(u,t.type,t.memoizedProps)),jo(n,u)}else if(6===t.tag)u=t.stateNode,r&&l&&(u=Io(u,t.memoizedProps)),jo(n,u)
else if(4!==t.tag)if(22===t.tag&&null!==t.memoizedState)null!==(u=t.child)&&(u.return=t),Qr(n,t,!(null!==t.memoizedProps&&"manual"===t.memoizedProps.mode),!0)
else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}}function Yr(n,e){if(Au&&Wr(n,e)){var r=(n=e.stateNode).containerInfo,l=Mo()
Qr(l,e,!1,!1),n.pendingChildren=l,$r(e),Po(r,l)}}function Jr(n,e,r,l){if(Ou)n.memoizedProps!==l&&$r(e)
else if(Au){var t=n.stateNode,u=n.memoizedProps
if((n=Wr(n,e))||u!==l){var o=na.current;(u=Co(t,r,u,l,!n,null))===t?e.stateNode=t:(Pu(u,r,l,o)&&$r(e),e.stateNode=u,n?Gr(u,e,!1,!1):$r(e))}else e.stateNode=t}}function Kr(n,e,r){if($u(e,r)){if(n.flags|=16777216,!Wu(e,r)){if(!it())throw Ra=Pa,ja
n.flags|=8192}}else n.flags&=-16777217}function Xr(n,e){if(di(e)){if(n.flags|=16777216,!pi(e)){if(!it())throw Ra=Pa,ja
n.flags|=8192}}else n.flags&=-16777217}function Zr(n,e){null!==e&&(n.flags|=4),16384&n.flags&&(e=22!==n.tag?E():536870912,n.lanes|=e,Qc|=e)}function nl(n,e){if(!oa)switch(n.tailMode){case"hidden":e=n.tail
for(var r=null;null!==e;)null!==e.alternate&&(r=e),e=e.sibling
null===r?n.tail=null:r.sibling=null
break
case"collapsed":r=n.tail
for(var l=null;null!==r;)null!==r.alternate&&(l=r),r=r.sibling
null===l?e||null===n.tail?n.tail=null:n.tail.sibling=null:l.sibling=null}}function el(n){var e=null!==n.alternate&&n.alternate.child===n.child,r=0,l=0
if(e)for(var t=n.child;null!==t;)r|=t.lanes|t.childLanes,l|=31457280&t.subtreeFlags,l|=31457280&t.flags,t.return=n,t=t.sibling
else for(t=n.child;null!==t;)r|=t.lanes|t.childLanes,l|=t.subtreeFlags,l|=t.flags,t.return=n,t=t.sibling
return n.subtreeFlags|=l,n.childLanes=r,e}function rl(n,e,r){var t=e.pendingProps
switch(_(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return el(e),null
case 3:return r=e.stateNode,t=null,null!==n&&(t=n.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),Ir(vc),A(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==n&&null!==n.child||(V(e)?$r(e):null===n||n.memoizedState.isDehydrated&&!(256&e.flags)||(e.flags|=1024,null!==ia&&(Zl(ia),ia=null))),Yr(n,e),el(e),null
case 26:if(ri){r=e.type
var u=e.memoizedState
return null===n?($r(e),null!==u?(el(e),Xr(e,u)):(el(e),Kr(e,r,t))):u?u!==n.memoizedState?($r(e),el(e),Xr(e,u)):(el(e),e.flags&=-16777217):(Ou?n.memoizedProps!==t&&$r(e):Jr(n,e,r,t),el(e),Kr(e,r,t)),null}case 27:if(yi){if(D(e),r=ra.current,u=e.type,null!==n&&null!=e.stateNode)Ou?n.memoizedProps!==t&&$r(e):Jr(n,e,u,t)
else{if(!t){if(null===e.stateNode)throw Error(l(166))
return el(e),null}n=na.current,V(e)?B(e,n):(n=bi(u,t,r,n,!0),e.stateNode=n,$r(e))}return el(e),null}case 5:if(D(e),r=e.type,null!==n&&null!=e.stateNode)Jr(n,e,r,t)
else{if(!t){if(null===e.stateNode)throw Error(l(166))
return el(e),null}n=na.current,V(e)?B(e,n):(Gr(u=Mu(r,t,ra.current,n,e),e,!1,!1),e.stateNode=u,Pu(u,r,t,n)&&$r(e))}return el(e),Kr(e,e.type,e.pendingProps),null
case 6:if(n&&null!=e.stateNode)r=n.memoizedProps,Ou?r!==t&&$r(e):Au&&(r!==t?(e.stateNode=zu(t,ra.current,na.current,e),$r(e)):e.stateNode=n.stateNode)
else{if("string"!=typeof t&&null===e.stateNode)throw Error(l(166))
if(n=ra.current,r=na.current,V(e)){if(!Lu)throw Error(l(176))
if(n=e.stateNode,r=e.memoizedProps,t=null,null!==(u=ta))switch(u.tag){case 27:case 5:t=u.memoizedProps}Wo(n,r,e,t)||N(e)}else e.stateNode=zu(t,n,r,e)}return el(e),null
case 13:if(t=e.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=V(e),null!==t&&null!==t.dehydrated){if(null===n){if(!u)throw Error(l(318))
if(!Lu)throw Error(l(344))
if(!(u=null!==(u=e.memoizedState)?u.dehydrated:null))throw Error(l(317))
Go(u,e)}else H(),!(128&e.flags)&&(e.memoizedState=null),e.flags|=4
el(e),u=!1}else null!==ia&&(Zl(ia),ia=null),u=!0
if(!u)return 256&e.flags?(Fn(e),e):(Fn(e),null)}if(Fn(e),128&e.flags)return e.lanes=r,e
if(r=null!==t,n=null!==n&&null!==n.memoizedState,r){u=null,null!==(t=e.child).alternate&&null!==t.alternate.memoizedState&&null!==t.alternate.memoizedState.cachePool&&(u=t.alternate.memoizedState.cachePool.pool)
var o=null
null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(o=t.memoizedState.cachePool.pool),o!==u&&(t.flags|=2048)}return r!==n&&r&&(e.child.flags|=8192),Zr(e,e.updateQueue),el(e),null
case 4:return A(),Yr(n,e),null===n&&Nu(e.stateNode.containerInfo),el(e),null
case 10:return Ir(e.type),el(e),null
case 19:if(y(Da),null===(u=e.memoizedState))return el(e),null
if(t=!!(128&e.flags),null===(o=u.rendering))if(t)nl(u,!1)
else{if(0!==Hc||null!==n&&128&n.flags)for(n=e.child;null!==n;){if(null!==(o=_n(n))){for(e.flags|=128,nl(u,!1),n=o.updateQueue,e.updateQueue=n,Zr(e,n),e.subtreeFlags=0,n=r,r=e.child;null!==r;)Tt(r,n),r=r.sibling
return b(Da,1&Da.current|2),e.child}n=n.sibling}null!==u.tail&&_i()>Zc&&(e.flags|=128,t=!0,nl(u,!1),e.lanes=4194304)}else{if(!t)if(null!==(n=_n(o))){if(e.flags|=128,t=!0,n=n.updateQueue,e.updateQueue=n,Zr(e,n),nl(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!oa)return el(e),null}else 2*_i()-u.renderingStartTime>Zc&&536870912!==r&&(e.flags|=128,t=!0,nl(u,!1),e.lanes=4194304)
u.isBackwards?(o.sibling=e.child,e.child=o):(null!==(n=u.last)?n.sibling=o:e.child=o,u.last=o)}return null!==u.tail?(e=u.tail,u.rendering=e,u.tail=e.sibling,u.renderingStartTime=_i(),e.sibling=null,n=Da.current,b(Da,t?1&n|2:1&n),e):(el(e),null)
case 22:case 23:return Fn(e),Rn(),t=null!==e.memoizedState,null!==n?null!==n.memoizedState!==t&&(e.flags|=8192):t&&(e.flags|=8192),t?!!(536870912&r)&&!(128&e.flags)&&(el(e),6&e.subtreeFlags&&(e.flags|=8192)):el(e),null!==(r=e.updateQueue)&&Zr(e,r.retryQueue),r=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(r=n.memoizedState.cachePool.pool),t=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(t=e.memoizedState.cachePool.pool),t!==r&&(e.flags|=2048),null!==n&&y(pc),null
case 24:return r=null,null!==n&&(r=n.memoizedState.cache),e.memoizedState.cache!==r&&(e.flags|=2048),Ir(vc),el(e),null
case 25:return null}throw Error(l(156,e.tag))}function ll(n,e){switch(_(e),e.tag){case 1:return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 3:return Ir(vc),A(),65536&(n=e.flags)&&!(128&n)?(e.flags=-65537&n|128,e):null
case 26:case 27:case 5:return D(e),null
case 13:if(Fn(e),null!==(n=e.memoizedState)&&null!==n.dehydrated){if(null===e.alternate)throw Error(l(340))
H()}return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 19:return y(Da),null
case 4:return A(),null
case 10:return Ir(e.type),null
case 22:case 23:return Fn(e),Rn(),null!==n&&y(pc),65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 24:return Ir(vc),null
default:return null}}function tl(n,e){switch(_(e),e.tag){case 3:Ir(vc),A()
break
case 26:case 27:case 5:D(e)
break
case 4:A()
break
case 13:Fn(e)
break
case 19:y(Da)
break
case 10:Ir(e.type)
break
case 22:case 23:Fn(e),Rn(),null!==n&&y(pc)
break
case 24:Ir(vc)}}function ul(n,e){try{var r=e.updateQueue,l=null!==r?r.lastEffect:null
if(null!==l){var t=l.next
r=t
do{if((r.tag&n)===n){l=void 0
var u=r.create,o=r.inst
l=u(),o.destroy=l}r=r.next}while(r!==t)}}catch(i){Et(e,e.return,i)}}function ol(n,e,r){try{var l=e.updateQueue,t=null!==l?l.lastEffect:null
if(null!==t){var u=t.next
l=u
do{if((l.tag&n)===n){var o=l.inst,i=o.destroy
if(void 0!==i){o.destroy=void 0,t=e
var a=r
try{i()}catch(c){Et(t,a,c)}}}l=l.next}while(l!==u)}}catch(c){Et(e,e.return,c)}}function il(n){var e=n.updateQueue
if(null!==e){var r=n.stateNode
try{yn(e,r)}catch(l){Et(n,n.return,l)}}}function al(n,e,r){r.props=er(n.type,n.memoizedProps),r.state=n.memoizedState
try{r.componentWillUnmount()}catch(l){Et(n,e,l)}}function cl(n,e){try{var r=n.ref
if(null!==r){var l=n.stateNode
switch(n.tag){case 26:case 27:case 5:var t=gu(l)
break
default:t=l}"function"==typeof r?n.refCleanup=r(t):r.current=t}}catch(u){Et(n,e,u)}}function fl(n,e){var r=n.ref,l=n.refCleanup
if(null!==r)if("function"==typeof l)try{l()}catch(t){Et(n,e,t)}finally{n.refCleanup=null,null!=(n=n.alternate)&&(n.refCleanup=null)}else if("function"==typeof r)try{r(null)}catch(u){Et(n,e,u)}else r.current=null}function sl(n){var e=n.type,r=n.memoizedProps,l=n.stateNode
try{vo(l,e,r,n)}catch(t){Et(n,n.return,t)}}function vl(n,e,r){try{po(n.stateNode,n.type,r,e,n)}catch(l){Et(n,n.return,l)}}function dl(n){return 5===n.tag||3===n.tag||!!ri&&26===n.tag||!!yi&&27===n.tag||4===n.tag}function pl(n){n:for(;;){for(;null===n.sibling;){if(null===n.return||dl(n.return))return null
n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&(!yi||27!==n.tag)&&18!==n.tag;){if(2&n.flags)continue n
if(null===n.child||4===n.tag)continue n
n.child.return=n,n=n.child}if(!(2&n.flags))return n.stateNode}}function hl(n,e,r){var l=n.tag
if(5===l||6===l)n=n.stateNode,e?yo(r,n,e):fo(r,n)
else if(!(4===l||yi&&27===l)&&null!==(n=n.child))for(hl(n,e,r),n=n.sibling;null!==n;)hl(n,e,r),n=n.sibling}function yl(n,e,r){var l=n.tag
if(5===l||6===l)n=n.stateNode,e?ho(r,n,e):co(r,n)
else if(!(4===l||yi&&27===l)&&null!==(n=n.child))for(yl(n,e,r),n=n.sibling;null!==n;)yl(n,e,r),n=n.sibling}function bl(n,e,r){n=n.containerInfo
try{Ro(n,r)}catch(l){Et(e,e.return,l)}}function wl(n,e,r){var l=r.flags
switch(r.tag){case 0:case 11:case 15:Pl(n,r),4&l&&ul(5,r)
break
case 1:if(Pl(n,r),4&l)if(n=r.stateNode,null===e)try{n.componentDidMount()}catch(i){Et(r,r.return,i)}else{var t=er(r.type,e.memoizedProps)
e=e.memoizedState
try{n.componentDidUpdate(t,e,n.m)}catch(a){Et(r,r.return,a)}}64&l&&il(r),512&l&&cl(r,r.return)
break
case 3:if(Pl(n,r),64&l&&null!==(l=r.updateQueue)){if(n=null,null!==r.child)switch(r.child.tag){case 27:case 5:n=gu(r.child.stateNode)
break
case 1:n=r.child.stateNode}try{yn(l,n)}catch(i){Et(r,r.return,i)}}break
case 26:if(ri){Pl(n,r),512&l&&cl(r,r.return)
break}case 27:case 5:Pl(n,r),null===e&&4&l&&sl(r),512&l&&cl(r,r.return)
break
case 12:Pl(n,r)
break
case 13:Pl(n,r),4&l&&xl(n,r)
break
case 22:if(!(t=null!==r.memoizedState||hc)){e=null!==e&&null!==e.memoizedState||yc
var u=hc,o=yc
hc=t,(yc=e)&&!o?zl(n,r,!!(8772&r.subtreeFlags)):Pl(n,r),hc=u,yc=o}512&l&&("manual"===r.memoizedProps.mode?cl(r,r.return):fl(r,r.return))
break
default:Pl(n,r)}}function ml(n){var e=n.alternate
null!==e&&(n.alternate=null,ml(e)),n.child=null,n.deletions=null,n.sibling=null,5===n.tag&&null!==(e=n.stateNode)&&qu(e),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function kl(n,e,r){for(r=r.child;null!==r;)gl(n,e,r),r=r.sibling}function gl(n,e,r){if(Vi&&"function"==typeof Vi.onCommitFiberUnmount)try{Vi.onCommitFiberUnmount(Ui,r)}catch(u){}switch(r.tag){case 26:if(ri){yc||fl(r,e),kl(n,e,r),r.memoizedState?ii(r.memoizedState):r.stateNode&&fi(r.stateNode)
break}case 27:if(yi){yc||fl(r,e)
var l=gc,t=xc
gc=r.stateNode,kl(n,e,r),ki(r.stateNode),gc=l,xc=t
break}case 5:yc||fl(r,e)
case 6:if(Ou){if(l=gc,t=xc,gc=null,kl(n,e,r),xc=t,null!==(gc=l))if(xc)try{wo(gc,r.stateNode)}catch(o){Et(r,e,o)}else try{bo(gc,r.stateNode)}catch(o){Et(r,e,o)}}else kl(n,e,r)
break
case 18:Ou&&null!==gc&&(xc?Xo(gc,r.stateNode):Ko(gc,r.stateNode))
break
case 4:Ou?(l=gc,t=xc,gc=r.stateNode.containerInfo,xc=!0,kl(n,e,r),gc=l,xc=t):(Au&&bl(r.stateNode,r,Mo()),kl(n,e,r))
break
case 0:case 11:case 14:case 15:yc||ol(2,r,e),yc||ol(4,r,e),kl(n,e,r)
break
case 1:yc||(fl(r,e),"function"==typeof(l=r.stateNode).componentWillUnmount&&al(r,e,l)),kl(n,e,r)
break
case 21:kl(n,e,r)
break
case 22:yc||fl(r,e),yc=(l=yc)||null!==r.memoizedState,kl(n,e,r),yc=l
break
default:kl(n,e,r)}}function xl(n,e){if(Lu&&null===e.memoizedState&&null!==(n=e.alternate)&&null!==(n=n.memoizedState)&&null!==(n=n.dehydrated))try{Jo(n)}catch(r){Et(e,e.return,r)}}function El(n,e){var r=function(n){switch(n.tag){case 13:case 19:var e=n.stateNode
return null===e&&(e=n.stateNode=new wc),e
case 22:return null===(e=(n=n.stateNode).k)&&(e=n.k=new wc),e
default:throw Error(l(435,n.tag))}}(n)
e.forEach(function(e){var l=Pt.bind(null,n,e)
r.has(e)||(r.add(e),e.then(l,l))})}function Sl(n,e){var r=e.deletions
if(null!==r)for(var t=0;t<r.length;t++){var u=r[t],o=n,i=e
if(Ou){var a=i
n:for(;null!==a;){switch(a.tag){case 27:case 5:gc=a.stateNode,xc=!1
break n
case 3:case 4:gc=a.stateNode.containerInfo,xc=!0
break n}a=a.return}if(null===gc)throw Error(l(160))
gl(o,i,u),gc=null,xc=!1}else gl(o,i,u)
null!==(o=u.alternate)&&(o.return=null),u.return=null}if(13878&e.subtreeFlags)for(e=e.child;null!==e;)Cl(e,n),e=e.sibling}function Cl(n,e){var r=n.alternate,t=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:Sl(e,n),Ml(n),4&t&&(ol(3,n,n.return),ul(3,n),ol(5,n,n.return))
break
case 1:Sl(e,n),Ml(n),512&t&&(yc||null===r||fl(r,r.return)),64&t&&hc&&null!==(n=n.updateQueue)&&null!==(t=n.callbacks)&&(r=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===r?t:r.concat(t))
break
case 26:if(ri){var u=Ec
Sl(e,n),Ml(n),512&t&&(yc||null===r||fl(r,r.return)),4&t&&(t=null!==r?r.memoizedState:null,e=n.memoizedState,null===r?null===e?null===n.stateNode?n.stateNode=ai(u,n.type,n.memoizedProps,n):ci(u,n.type,n.stateNode):n.stateNode=oi(u,e,n.memoizedProps):t!==e?(null===t?null!==r.stateNode&&fi(r.stateNode):ii(t),null===e?ci(u,n.type,n.stateNode):oi(u,e,n.memoizedProps)):null===e&&null!==n.stateNode&&vl(n,n.memoizedProps,r.memoizedProps))
break}case 27:if(yi&&4&t&&null===n.alternate){u=n.stateNode
var o=n.memoizedProps
try{wi(u),mi(n.type,o,u,n)}catch(s){Et(n,n.return,s)}}case 5:if(Sl(e,n),Ml(n),512&t&&(yc||null===r||fl(r,r.return)),Ou){if(32&n.flags){e=n.stateNode
try{mo(e)}catch(s){Et(n,n.return,s)}}4&t&&null!=n.stateNode&&vl(n,e=n.memoizedProps,null!==r?r.memoizedProps:e),1024&t&&(bc=!0)}break
case 6:if(Sl(e,n),Ml(n),4&t&&Ou){if(null===n.stateNode)throw Error(l(162))
t=n.memoizedProps,r=null!==r?r.memoizedProps:t,e=n.stateNode
try{so(e,r,t)}catch(s){Et(n,n.return,s)}}break
case 3:if(ri?(vi(),u=Ec,Ec=ti(e.containerInfo),Sl(e,n),Ec=u):Sl(e,n),Ml(n),4&t){if(Ou&&Lu&&null!==r&&r.memoizedState.isDehydrated)try{Yo(e.containerInfo)}catch(s){Et(n,n.return,s)}if(Au){t=e.containerInfo,r=e.pendingChildren
try{Ro(t,r)}catch(s){Et(n,n.return,s)}}}bc&&(bc=!1,jl(n))
break
case 4:ri?(r=Ec,Ec=ti(n.stateNode.containerInfo),Sl(e,n),Ml(n),Ec=r):(Sl(e,n),Ml(n)),4&t&&Au&&bl(n.stateNode,n,n.stateNode.pendingChildren)
break
case 12:Sl(e,n),Ml(n)
break
case 13:Sl(e,n),Ml(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==r&&null!==r.memoizedState)&&(Xc=_i()),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,El(n,t))
break
case 22:512&t&&(yc||null===r||fl(r,r.return)),u=null!==n.memoizedState
var i=null!==r&&null!==r.memoizedState,a=hc,c=yc
if(hc=a||u,yc=c||i,Sl(e,n),yc=c,hc=a,Ml(n),(e=n.stateNode).C=n,e.v&=-3,e.v|=2&e.p,8192&t&&(e.v=u?-2&e.v:1|e.v,u&&(e=hc||yc,null===r||i||e||Rl(n)),Ou&&(null===n.memoizedProps||"manual"!==n.memoizedProps.mode)))n:if(r=null,Ou)for(e=n;;){if(5===e.tag||ri&&26===e.tag||yi&&27===e.tag){if(null===r){i=r=e
try{o=i.stateNode,u?ko(o):xo(i.stateNode,i.memoizedProps)}catch(s){Et(i,i.return,s)}}}else if(6===e.tag){if(null===r){i=e
try{var f=i.stateNode
u?go(f):Eo(f,i.memoizedProps)}catch(s){Et(i,i.return,s)}}}else if((22!==e.tag&&23!==e.tag||null===e.memoizedState||e===n)&&null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break n
for(;null===e.sibling;){if(null===e.return||e.return===n)break n
r===e&&(r=null),e=e.return}r===e&&(r=null),e.sibling.return=e.return,e=e.sibling}4&t&&null!==(t=n.updateQueue)&&null!==(r=t.retryQueue)&&(t.retryQueue=null,El(n,r))
break
case 19:Sl(e,n),Ml(n),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,El(n,t))
break
case 21:break
default:Sl(e,n),Ml(n)}}function Ml(n){var e=n.flags
if(2&e){try{if(Ou&&(!yi||27!==n.tag)){n:{for(var r=n.return;null!==r;){if(dl(r)){var t=r
break n}r=r.return}throw Error(l(160))}switch(t.tag){case 27:if(yi){var u=t.stateNode
yl(n,pl(n),u)
break}case 5:var o=t.stateNode
32&t.flags&&(mo(o),t.flags&=-33),yl(n,pl(n),o)
break
case 3:case 4:var i=t.stateNode.containerInfo
hl(n,pl(n),i)
break
default:throw Error(l(161))}}}catch(a){Et(n,n.return,a)}n.flags&=-3}4096&e&&(n.flags&=-4097)}function jl(n){if(1024&n.subtreeFlags)for(n=n.child;null!==n;){var e=n
jl(e),5===e.tag&&1024&e.flags&&Xu(e.stateNode),n=n.sibling}}function Pl(n,e){if(8772&e.subtreeFlags)for(e=e.child;null!==e;)wl(n,e.alternate,e),e=e.sibling}function Rl(n){for(n=n.child;null!==n;){var e=n
switch(e.tag){case 0:case 11:case 14:case 15:ol(4,e,e.return),Rl(e)
break
case 1:fl(e,e.return)
var r=e.stateNode
"function"==typeof r.componentWillUnmount&&al(e,e.return,r),Rl(e)
break
case 26:case 27:case 5:fl(e,e.return),Rl(e)
break
case 22:fl(e,e.return),null===e.memoizedState&&Rl(e)
break
default:Rl(e)}n=n.sibling}}function zl(n,e,r){for(r=r&&!!(8772&e.subtreeFlags),e=e.child;null!==e;){var l=e.alternate,t=n,u=e,o=u.flags
switch(u.tag){case 0:case 11:case 15:zl(t,u,r),ul(4,u)
break
case 1:if(zl(t,u,r),"function"==typeof(t=(l=u).stateNode).componentDidMount)try{t.componentDidMount()}catch(c){Et(l,l.return,c)}if(null!==(t=(l=u).updateQueue)){var i=l.stateNode
try{var a=t.shared.hiddenCallbacks
if(null!==a)for(t.shared.hiddenCallbacks=null,t=0;t<a.length;t++)hn(a[t],i)}catch(c){Et(l,l.return,c)}}r&&64&o&&il(u),cl(u,u.return)
break
case 26:case 27:case 5:zl(t,u,r),r&&null===l&&4&o&&sl(u),cl(u,u.return)
break
case 12:default:zl(t,u,r)
break
case 13:zl(t,u,r),r&&4&o&&xl(t,u)
break
case 22:null===u.memoizedState&&zl(t,u,r),cl(u,u.return)}e=e.sibling}}function Il(n,e){var r=null
null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(r=n.memoizedState.cachePool.pool),n=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),n!==r&&(null!=n&&n.refCount++,null!=r&&Ur(r))}function Tl(n,e){n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&Ur(n))}function Fl(n,e,r,l){if(10256&e.subtreeFlags)for(e=e.child;null!==e;)_l(n,e,r,l),e=e.sibling}function _l(n,e,r,l){var t=e.flags
switch(e.tag){case 0:case 11:case 15:Fl(n,e,r,l),2048&t&&ul(9,e)
break
case 3:Fl(n,e,r,l),2048&t&&(n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&Ur(n)))
break
case 12:if(2048&t){Fl(n,e,r,l),n=e.stateNode
try{var u=e.memoizedProps,o=u.id,i=u.onPostCommit
"function"==typeof i&&i(o,null===e.alternate?"mount":"update",n.passiveEffectDuration,-0)}catch(a){Et(e,e.return,a)}}else Fl(n,e,r,l)
break
case 23:break
case 22:u=e.stateNode,null!==e.memoizedState?4&u.v?Fl(n,e,r,l):Al(n,e):4&u.v?Fl(n,e,r,l):(u.v|=4,Ol(n,e,r,l,!!(10256&e.subtreeFlags))),2048&t&&Il(e.alternate,e)
break
case 24:Fl(n,e,r,l),2048&t&&Tl(e.alternate,e)
break
default:Fl(n,e,r,l)}}function Ol(n,e,r,l,t){for(t=t&&!!(10256&e.subtreeFlags),e=e.child;null!==e;){var u=n,o=e,i=r,a=l,c=o.flags
switch(o.tag){case 0:case 11:case 15:Ol(u,o,i,a,t),ul(8,o)
break
case 23:break
case 22:var f=o.stateNode
null!==o.memoizedState?4&f.v?Ol(u,o,i,a,t):Al(u,o):(f.v|=4,Ol(u,o,i,a,t)),t&&2048&c&&Il(o.alternate,o)
break
case 24:Ol(u,o,i,a,t),t&&2048&c&&Tl(o.alternate,o)
break
default:Ol(u,o,i,a,t)}e=e.sibling}}function Al(n,e){if(10256&e.subtreeFlags)for(e=e.child;null!==e;){var r=n,l=e,t=l.flags
switch(l.tag){case 22:Al(r,l),2048&t&&Il(l.alternate,l)
break
case 24:Al(r,l),2048&t&&Tl(l.alternate,l)
break
default:Al(r,l)}e=e.sibling}}function Ll(n){if(n.subtreeFlags&Sc)for(n=n.child;null!==n;)Dl(n),n=n.sibling}function Dl(n){switch(n.tag){case 26:Ll(n),n.flags&Sc&&(null!==n.memoizedState?hi(Ec,n.memoizedState,n.memoizedProps):Qu(n.type,n.memoizedProps))
break
case 5:Ll(n),n.flags&Sc&&Qu(n.type,n.memoizedProps)
break
case 3:case 4:if(ri){var e=Ec
Ec=ti(n.stateNode.containerInfo),Ll(n),Ec=e}else Ll(n)
break
case 22:null===n.memoizedState&&(null!==(e=n.alternate)&&null!==e.memoizedState?(e=Sc,Sc=16777216,Ll(n),Sc=e):Ll(n))
break
default:Ll(n)}}function Nl(n){var e=n.alternate
if(null!==e&&null!==(n=e.child)){e.child=null
do{e=n.sibling,n.sibling=null,n=e}while(null!==n)}}function Bl(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var r=0;r<e.length;r++){var l=e[r]
mc=l,Hl(l,n)}Nl(n)}if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Ul(n),n=n.sibling}function Ul(n){switch(n.tag){case 0:case 11:case 15:Bl(n),2048&n.flags&&ol(9,n,n.return)
break
case 3:case 12:default:Bl(n)
break
case 22:var e=n.stateNode
null!==n.memoizedState&&4&e.v&&(null===n.return||13!==n.return.tag)?(e.v&=-5,Vl(n)):Bl(n)}}function Vl(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var r=0;r<e.length;r++){var l=e[r]
mc=l,Hl(l,n)}Nl(n)}for(n=n.child;null!==n;){switch((e=n).tag){case 0:case 11:case 15:ol(8,e,e.return),Vl(e)
break
case 22:4&(r=e.stateNode).v&&(r.v&=-5,Vl(e))
break
default:Vl(e)}n=n.sibling}}function Hl(n,e){for(;null!==mc;){var r=mc
switch(r.tag){case 0:case 11:case 15:ol(8,r,e)
break
case 23:case 22:if(null!==r.memoizedState&&null!==r.memoizedState.cachePool){var l=r.memoizedState.cachePool.pool
null!=l&&l.refCount++}break
case 24:Ur(r.memoizedState.cache)}if(null!==(l=r.child))l.return=r,mc=l
else n:for(r=n;null!==mc;){var t=(l=mc).sibling,u=l.return
if(ml(l),l===r){mc=null
break n}if(null!==t){t.return=u,mc=t
break n}mc=u}}}function ql(n){var e=Du(n)
if(null!=e){if("string"!=typeof e.memoizedProps["data-testname"])throw Error(l(364))
return e}if(null===(n=ro(n)))throw Error(l(362))
return n.stateNode.current}function $l(n,e){var r=n.tag
switch(e.$$typeof){case Mc:if(n.type===e.value)return!0
break
case jc:n:{for(e=e.value,n=[n,0],r=0;r<n.length;){var t=n[r++],u=t.tag,o=n[r++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(t)){for(;null!=i&&$l(t,i);)i=e[++o]
if(o===e.length){e=!0
break n}for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}e=!1}return e
case Pc:if((5===r||26===r||27===r)&&oo(n.stateNode,e.value))return!0
break
case zc:if((5===r||6===r||26===r||27===r)&&null!==(n=to(n))&&0<=n.indexOf(e.value))return!0
break
case Rc:if((5===r||26===r||27===r)&&"string"==typeof(n=n.memoizedProps["data-testname"])&&n.toLowerCase()===e.value.toLowerCase())return!0
break
default:throw Error(l(365))}return!1}function Wl(n){switch(n.$$typeof){case Mc:return"<"+(u(n.value)||"Unknown")+">"
case jc:return":has("+(Wl(n)||"")+")"
case Pc:return'[role="'+n.value+'"]'
case zc:return'"'+n.value+'"'
case Rc:return'[data-testname="'+n.value+'"]'
default:throw Error(l(365))}}function Gl(n,e){var r=[]
n=[n,0]
for(var l=0;l<n.length;){var t=n[l++],u=t.tag,o=n[l++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(t)){for(;null!=i&&$l(t,i);)i=e[++o]
if(o===e.length)r.push(t)
else for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}return r}function Ql(n,e){if(!eo)throw Error(l(363))
n=Gl(n=ql(n),e),e=[],n=Array.from(n)
for(var r=0;r<n.length;){var t=n[r++],u=t.tag
if(5===u||26===u||27===u)uo(t)||e.push(t.stateNode)
else for(t=t.child;null!==t;)n.push(t),t=t.sibling}return e}function Yl(){return 2&Fc&&0!==Ac?Ac&-Ac:null!==hu.T?0!==ga?ga:tn():Vu()}function Jl(){0===Gc&&(Gc=536870912&Ac&&!oa?536870912:x())
var n=Aa.current
return null!==n&&(n.flags|=32),Gc}function Kl(n,e,r){(n===_c&&2===Lc||null!==n.cancelPendingCommit)&&(ut(n,0),rt(n,Ac,Gc,!1)),C(n,r),2&Fc&&n===_c||(n===_c&&(!(2&Fc)&&($c|=r),4===Hc&&rt(n,Ac,Gc,!1)),X(n))}function Xl(n,e,r){if(6&Fc)throw Error(l(327))
for(var t=!r&&!(60&e)&&0===(e&n.expiredLanes)||k(n,e),u=t?function(n,e){var r=Fc
Fc|=2
var t=at(),u=ct()
_c!==n||Ac!==e?(nf=null,Zc=_i()+500,ut(n,e)):Bc=k(n,e)
n:for(;;){try{if(0!==Lc&&null!==Oc){e=Oc
var o=Dc
e:switch(Lc){case 1:Lc=0,Dc=null,yt(n,e,o,1)
break
case 2:if(wn(o)){Lc=0,Dc=null,ht(e)
break}e=function(){2===Lc&&_c===n&&(Lc=7),X(n)},o.then(e,e)
break n
case 3:Lc=7
break n
case 4:Lc=5
break n
case 7:wn(o)?(Lc=0,Dc=null,ht(e)):(Lc=0,Dc=null,yt(n,e,o,7))
break
case 5:var i=null
switch(Oc.tag){case 26:i=Oc.memoizedState
case 5:case 27:var a=Oc,c=a.type,f=a.pendingProps
if(i?pi(i):Wu(c,f)){Lc=0,Dc=null
var s=a.sibling
if(null!==s)Oc=s
else{var v=a.return
null!==v?(Oc=v,bt(v)):Oc=null}break e}}Lc=0,Dc=null,yt(n,e,o,5)
break
case 6:Lc=0,Dc=null,yt(n,e,o,6)
break
case 8:tt(),Hc=6
break n
default:throw Error(l(462))}}dt()
break}catch(d){ot(n,d)}1}return ac=ic=null,hu.H=t,hu.A=u,Fc=r,null!==Oc?0:(_c=null,Ac=0,$(),Hc)}(n,e):st(n,e,!0),o=t;;){if(0===u){Bc&&!t&&rt(n,e,0,!1)
break}if(6===u)rt(n,e,0,!Nc)
else{if(r=n.current.alternate,o&&!et(r)){u=st(n,e,!1),o=!1
continue}if(2===u){if(o=e,n.errorRecoveryDisabledLanes&o)var i=0
else i=0!=(i=-536870913&n.pendingLanes)?i:536870912&i?536870912:0
if(0!==i){e=i
n:{var a=n
u=Yc
var c=Lu&&a.current.memoizedState.isDehydrated
if(c&&(ut(a,i).flags|=256),2!==(i=st(a,i,!1))){if(Uc&&!c){a.errorRecoveryDisabledLanes|=o,$c|=o,u=4
break n}o=Jc,Jc=u,null!==o&&Zl(o)}u=i}if(o=!1,2!==u)continue}}if(1===u){ut(n,0),rt(n,e,0,!0)
break}n:{switch(t=n,u){case 0:case 1:throw Error(l(345))
case 4:if((4194176&e)===e){rt(t,e,Gc,!Nc)
break n}break
case 2:Jc=null
break
case 3:case 5:break
default:throw Error(l(329))}if(t.finishedWork=r,t.finishedLanes=e,(62914560&e)===e&&10<(o=Xc+300-_i())){if(rt(t,e,Gc,!Nc),0!==m(t,0))break n
t.timeoutHandle=Iu(nt.bind(null,t,r,Jc,nf,Kc,e,Gc,$c,Qc,Nc,2,-0,0),o)}else nt(t,r,Jc,nf,Kc,e,Gc,$c,Qc,Nc,0,-0,0)}}break}X(n)}function Zl(n){null===Jc?Jc=n:Jc.push.apply(Jc,n)}function nt(n,e,r,l,t,u,o,i,a,c,f,s,v){var d=e.subtreeFlags
if((8192&d||!(16785408&~d))&&(Gu(),Dl(e),null!==(e=Yu())))return n.cancelPendingCommit=e(mt.bind(null,n,r,l,t,o,i,a,1,s,v)),rt(n,u,o,!c),void 0
mt(n,r,l,t,o,i,a)}function et(n){for(var e=n;;){var r=e.tag
if((0===r||11===r||15===r)&&16384&e.flags&&null!==(r=e.updateQueue)&&null!==(r=r.stores))for(var l=0;l<r.length;l++){var t=r[l],u=t.getSnapshot
t=t.value
try{if(!Hi(u(),t))return!1}catch(o){return!1}}if(r=e.child,16384&e.subtreeFlags&&null!==r)r.return=e,e=r
else{if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return!0
e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rt(n,e,r,l){e&=~Wc,e&=~$c,n.suspendedLanes|=e,n.pingedLanes&=~e,l&&(n.warmLanes|=e),l=n.expirationTimes
for(var t=e;0<t;){var u=31-Ci(t),o=1<<u
l[u]=-1,t&=~o}0!==r&&M(n,r,e)}function lt(){return!!(6&Fc)||(Z(0),!1)}function tt(){if(null!==Oc){if(0===Lc)var n=Oc.return
else ac=ic=null,$n(n=Oc),za=null,Ia=0,n=Oc
for(;null!==n;)tl(n.alternate,n),n=n.return
Oc=null}}function ut(n,e){n.finishedWork=null,n.finishedLanes=0
var r=n.timeoutHandle
r!==Fu&&(n.timeoutHandle=Fu,Tu(r)),null!==(r=n.cancelPendingCommit)&&(n.cancelPendingCommit=null,r()),tt(),_c=n,Oc=r=It(n.current,null),Ac=e,Lc=0,Dc=null,Nc=!1,Bc=k(n,e),Uc=!1,Qc=Gc=Wc=$c=qc=Hc=0,Jc=Yc=null,Kc=!1,8&e&&(e|=32&e)
var l=n.entangledLanes
if(0!==l)for(n=n.entanglements,l&=e;0<l;){var t=31-Ci(l),u=1<<t
e|=n[t],l&=~u}return Vc=e,$(),r}function ot(n,e){Ba=null,hu.H=Ka,e===Ma?(e=gn(),Lc=3):e===ja?(e=gn(),Lc=4):Lc=e===lc?8:null!==e&&"object"==typeof e&&"function"==typeof e.then?6:1,Dc=e,null===Oc&&(Hc=1,rr(n,z(e,n.current)))}function it(){var n=Aa.current
return null===n||((4194176&Ac)===Ac?null===La:!!((62914560&Ac)===Ac||536870912&Ac)&&n===La)}function at(){var n=hu.H
return hu.H=Ka,null===n?Ka:n}function ct(){var n=hu.A
return hu.A=Cc,n}function ft(){Hc=4,Nc||(4194176&Ac)!==Ac&&null!==Aa.current||(Bc=!0),!(134217727&qc)&&!(134217727&$c)||null===_c||rt(_c,Ac,Gc,!1)}function st(n,e,r){var l=Fc
Fc|=2
var t=at(),u=ct()
_c===n&&Ac===e||(nf=null,ut(n,e)),e=!1
var o=Hc
n:for(;;){try{if(0!==Lc&&null!==Oc){var i=Oc,a=Dc
switch(Lc){case 8:tt(),o=6
break n
case 3:case 2:case 6:null===Aa.current&&(e=!0)
var c=Lc
if(Lc=0,Dc=null,yt(n,i,a,c),r&&Bc){o=0
break n}break
default:c=Lc,Lc=0,Dc=null,yt(n,i,a,c)}}vt(),o=Hc
break}catch(f){ot(n,f)}1}return e&&n.shellSuspendCounter++,ac=ic=null,Fc=l,hu.H=t,hu.A=u,null===Oc&&(_c=null,Ac=0,$()),o}function vt(){for(;null!==Oc;)pt(Oc)}function dt(){for(;null!==Oc&&!Ti();)pt(Oc)}function pt(n){var e=Rr(n.alternate,n,Vc)
n.memoizedProps=n.pendingProps,null===e?bt(n):Oc=e}function ht(n){var e=n,r=e.alternate
switch(e.tag){case 15:case 0:e=hr(r,e,e.pendingProps,e.type,void 0,Ac)
break
case 11:e=hr(r,e,e.pendingProps,e.type.render,e.ref,Ac)
break
case 5:$n(e)
default:tl(r,e),e=Rr(r,e=Oc=Tt(e,Vc),Vc)}n.memoizedProps=n.pendingProps,null===e?bt(n):Oc=e}function yt(n,e,r,t){ac=ic=null,$n(e),za=null,Ia=0
var u=e.return
try{if(function(n,e,r,t,u){if(r.flags|=32768,null!==t&&"object"==typeof t&&"function"==typeof t.then){if(null!==(e=r.alternate)&&_r(e,r,u,!0),null!==(r=Aa.current)){switch(r.tag){case 13:return null===La?ft():null===r.alternate&&0===Hc&&(Hc=3),r.flags&=-257,r.flags|=65536,r.lanes=u,t===Pa?r.flags|=16384:(null===(e=r.updateQueue)?r.updateQueue=new Set([t]):e.add(t),St(n,t,u)),!1
case 22:return r.flags|=65536,t===Pa?r.flags|=16384:(null===(e=r.updateQueue)?(e={transitions:null,markerInstances:null,retryQueue:new Set([t])},r.updateQueue=e):null===(r=e.retryQueue)?e.retryQueue=new Set([t]):r.add(t),St(n,t,u)),!1}throw Error(l(435,r.tag))}return St(n,t,u),ft(),!1}if(oa)return null!==(e=Aa.current)?(!(65536&e.flags)&&(e.flags|=256),e.flags|=65536,e.lanes=u,t!==ca&&q(z(n=Error(l(422),{cause:t}),r))):(t!==ca&&q(z(e=Error(l(423),{cause:t}),r)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,t=z(t,r),vn(n,u=tr(n.stateNode,t,u)),4!==Hc&&(Hc=2)),!1
var o=Error(l(520),{cause:t})
if(o=z(o,r),null===Yc?Yc=[o]:Yc.push(o),4!==Hc&&(Hc=2),null===e)return!0
t=z(t,r),r=e
do{switch(r.tag){case 3:return r.flags|=65536,n=u&-u,r.lanes|=n,vn(r,n=tr(r.stateNode,t,n)),!1
case 1:if(e=r.type,o=r.stateNode,!(128&r.flags||"function"!=typeof e.getDerivedStateFromError&&(null===o||"function"!=typeof o.componentDidCatch||null!==ef&&ef.has(o))))return r.flags|=65536,u&=-u,r.lanes|=u,or(u=ur(u),n,r,t),vn(r,u),!1}r=r.return}while(null!==r)
return!1}(n,u,e,r,Ac))return Hc=1,rr(n,z(r,n.current)),Oc=null,void 0}catch(o){if(null!==u)throw Oc=u,o
return Hc=1,rr(n,z(r,n.current)),Oc=null,void 0}32768&e.flags?(oa||1===t?n=!0:Bc||536870912&Ac?n=!1:(Nc=n=!0,(2===t||3===t||6===t)&&null!==(t=Aa.current)&&13===t.tag&&(t.flags|=16384)),wt(e,n)):bt(e)}function bt(n){var e=n
do{if(32768&e.flags)return wt(e,Nc),void 0
n=e.return
var r=rl(e.alternate,e,Vc)
if(null!==r)return Oc=r,void 0
if(null!==(e=e.sibling))return Oc=e,void 0
Oc=e=n}while(null!==e)
0===Hc&&(Hc=5)}function wt(n,e){do{var r=ll(n.alternate,n)
if(null!==r)return r.flags&=32767,Oc=r,void 0
if(null!==(r=n.return)&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!e&&null!==(n=n.sibling))return Oc=n,void 0
Oc=n=r}while(null!==n)
Hc=6,Oc=null}function mt(n,e,r,t,u,o,i,a,c,f){var s=hu.T,v=Uu()
try{Bu(2),hu.T=null,function(n,e,r,t,u,o,i,a){do{gt()}while(null!==lf)
if(6&Fc)throw Error(l(327))
var c=n.finishedWork
if(t=n.finishedLanes,null===c)return null
if(n.finishedWork=null,n.finishedLanes=0,c===n.current)throw Error(l(177))
n.callbackNode=null,n.callbackPriority=0,n.cancelPendingCommit=null
var f=c.lanes|c.childLanes
if(function(n,e,r,l,t,u){var o=n.pendingLanes
n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=r,n.entangledLanes&=r,n.errorRecoveryDisabledLanes&=r,n.shellSuspendCounter=0
var i=n.entanglements,a=n.expirationTimes,c=n.hiddenUpdates
for(r=o&~r;0<r;){var f=31-Ci(r),s=1<<f
i[f]=0,a[f]=-1
var v=c[f]
if(null!==v)for(c[f]=null,f=0;f<v.length;f++){var d=v[f]
null!==d&&(d.lane&=-536870913)}r&=~s}0!==l&&M(n,l,0),0!==u&&0===t&&0!==n.tag&&(n.suspendedLanes|=u&~(o&~e))}(n,t,f|=va,o,i,a),n===_c&&(Oc=_c=null,Ac=0),!(10256&c.subtreeFlags)&&!(10256&c.flags)||rf||(rf=!0,uf=f,of=r,zi(Li,function(){return gt(),null})),r=!!(15990&c.flags),15990&c.subtreeFlags||r?(r=hu.T,hu.T=null,o=Uu(),Bu(2),i=Fc,Fc|=4,function(n,e){for(Su(n.containerInfo),mc=e;null!==mc;)if(e=(n=mc).child,1028&n.subtreeFlags&&null!==e)e.return=n,mc=e
else for(;null!==mc;){var r=(n=mc).alternate
switch(e=n.flags,n.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&e&&null!==r){e=void 0
var t=n,u=r.memoizedProps
r=r.memoizedState
var o=t.stateNode
try{var i=er(t.type,u)
e=o.getSnapshotBeforeUpdate(i,r),o.m=e}catch(a){Et(t,t.return,a)}}break
case 3:1024&e&&Ou&&So(n.stateNode.containerInfo)
break
default:if(1024&e)throw Error(l(163))}if(null!==(e=n.sibling)){e.return=n.return,mc=e
break}mc=n.return}return i=kc,kc=!1,i}(n,c),Cl(c,n),Cu(n.containerInfo),n.current=c,wl(n,c.alternate,c),Fi(),Fc=i,Bu(o),hu.T=r):n.current=c,rf?(rf=!1,lf=n,tf=t):kt(n,f),0===(f=n.pendingLanes)&&(ef=null),function(n){if(Vi&&"function"==typeof Vi.onCommitFiberRoot)try{Vi.onCommitFiberRoot(Ui,n,void 0,!(128&~n.current.flags))}catch(e){}}(c.stateNode),X(n),null!==e)for(u=n.onRecoverableError,c=0;c<e.length;c++)u((f=e[c]).value,{componentStack:f.stack})
return!!(3&tf)&&gt(),f=n.pendingLanes,4194218&t&&42&f?n===cf?af++:(af=0,cf=n):af=0,Z(0),null}(n,e,r,t,v,u,o,i)}finally{hu.T=s,Bu(v)}}function kt(n,e){0===(n.pooledCacheLanes&=e)&&null!=(e=n.pooledCache)&&(n.pooledCache=null,Ur(e))}function gt(){if(null!==lf){var n=lf,e=uf
uf=0
var r=P(tf),t=32>r?32:r
r=hu.T
var u=Uu()
try{if(Bu(t),hu.T=null,null===lf)var o=!1
else{t=of,of=null
var i=lf,a=tf
if(lf=null,tf=0,6&Fc)throw Error(l(331))
var c=Fc
if(Fc|=4,Ul(i.current),_l(i,i.current,a,t),Fc=c,Z(0),Vi&&"function"==typeof Vi.onPostCommitFiberRoot)try{Vi.onPostCommitFiberRoot(Ui,i)}catch(f){}o=!0}return o}finally{Bu(u),hu.T=r,kt(n,e)}}return!1}function xt(n,e,r){e=z(r,e),null!==(n=fn(n,e=tr(n.stateNode,e,2),2))&&(C(n,2),X(n))}function Et(n,e,r){if(3===n.tag)xt(n,n,r)
else for(;null!==e;){if(3===e.tag){xt(e,n,r)
break}if(1===e.tag){var l=e.stateNode
if("function"==typeof e.type.getDerivedStateFromError||"function"==typeof l.componentDidCatch&&(null===ef||!ef.has(l))){n=z(r,n),null!==(l=fn(e,r=ur(2),2))&&(or(r,l,e,n),C(l,2),X(l))
break}}e=e.return}}function St(n,e,r){var l=n.pingCache
if(null===l){l=n.pingCache=new Tc
var t=new Set
l.set(e,t)}else void 0===(t=l.get(e))&&(t=new Set,l.set(e,t))
t.has(r)||(Uc=!0,t.add(r),n=Ct.bind(null,n,e,r),e.then(n,n))}function Ct(n,e,r){var l=n.pingCache
null!==l&&l.delete(e),n.pingedLanes|=n.suspendedLanes&r,n.warmLanes&=~r,_c===n&&(Ac&r)===r&&(4===Hc||3===Hc&&(62914560&Ac)===Ac&&300>_i()-Xc?!(2&Fc)&&ut(n,0):Wc|=r,Qc===Ac&&(Qc=0)),X(n)}function Mt(n,e){0===e&&(e=E()),null!==(n=Q(n,e))&&(C(n,e),X(n))}function jt(n){var e=n.memoizedState,r=0
null!==e&&(r=e.retryLane),Mt(n,r)}function Pt(n,e){var r=0
switch(n.tag){case 13:var t=n.stateNode,u=n.memoizedState
null!==u&&(r=u.retryLane)
break
case 19:t=n.stateNode
break
case 22:t=n.stateNode.k
break
default:throw Error(l(314))}null!==t&&t.delete(e),Mt(n,r)}function Rt(n,e,r,l){this.tag=n,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(n){return!(!(n=n.prototype)||!n.isReactComponent)}function It(n,r){var l=n.alternate
return null===l?((l=e(n.tag,r,n.key,n.mode)).elementType=n.elementType,l.type=n.type,l.stateNode=n.stateNode,l.alternate=n,n.alternate=l):(l.pendingProps=r,l.type=n.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=31457280&n.flags,l.childLanes=n.childLanes,l.lanes=n.lanes,l.child=n.child,l.memoizedProps=n.memoizedProps,l.memoizedState=n.memoizedState,l.updateQueue=n.updateQueue,r=n.dependencies,l.dependencies=null===r?null:{lanes:r.lanes,firstContext:r.firstContext},l.sibling=n.sibling,l.index=n.index,l.ref=n.ref,l.refCleanup=n.refCleanup,l}function Tt(n,e){n.flags&=31457282
var r=n.alternate
return null===r?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=r.childLanes,n.lanes=r.lanes,n.child=r.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=r.memoizedProps,n.memoizedState=r.memoizedState,n.updateQueue=r.updateQueue,n.type=r.type,e=r.dependencies,n.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n}function Ft(n,r,t,u,o,i){var a=0
if(u=n,"function"==typeof n)zt(n)&&(a=1)
else if("string"==typeof n)a=ri&&yi?li(n,t,na.current)?26:gi(n)?27:5:ri?li(n,t,na.current)?26:5:yi&&gi(n)?27:5
else n:switch(n){case nu:return _t(t.children,o,i,r)
case eu:a=8,o|=24
break
case ru:return(n=e(12,t,r,2|o)).elementType=ru,n.lanes=i,n
case iu:return(n=e(13,t,r,o)).elementType=iu,n.lanes=i,n
case au:return(n=e(19,t,r,o)).elementType=au,n.lanes=i,n
case su:return Ot(t,o,i,r)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case lu:case uu:a=10
break n
case tu:a=9
break n
case ou:a=11
break n
case cu:a=14
break n
case fu:a=16,u=null
break n}a=29,t=Error(l(130,null===n?"null":typeof n,"")),u=null}return(r=e(a,t,r,o)).elementType=n,r.type=u,r.lanes=i,r}function _t(n,r,l,t){return(n=e(7,n,t,r)).lanes=l,n}function Ot(n,r,t,u){(n=e(22,n,u,r)).elementType=su,n.lanes=t
var o={v:1,p:1,M:null,k:null,j:null,C:null,detach:function(){var n=o.C
if(null===n)throw Error(l(456))
if(!(2&o.p)){var e=Q(n,2)
null!==e&&(o.p|=2,Kl(e,0,2))}},attach:function(){var n=o.C
if(null===n)throw Error(l(456))
if(2&o.p){var e=Q(n,2)
null!==e&&(o.p&=-3,Kl(e,0,2))}}}
return n.stateNode=o,n}function At(n,r,l){return(n=e(6,n,null,r)).lanes=l,n}function Lt(n,r,l){return(r=e(4,null!==n.children?n.children:[],n.key,r)).lanes=l,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function Dt(n,e,r,l,t,u,o,i){this.tag=1,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=Fu,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=S(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=S(0),this.hiddenUpdates=S(null),this.identifierPrefix=l,this.onUncaughtError=t,this.onCaughtError=u,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.incompleteTransitions=new Map}function Nt(n,r,l,t,u,o,i,a,c,f,s,v){return n=new Dt(n,r,l,i,a,c,f,v),r=1,!0===o&&(r|=24),o=e(3,null,null,r),n.current=o,o.stateNode=n,(r=Br()).refCount++,n.pooledCache=r,r.refCount++,o.memoizedState={element:t,isDehydrated:l,cache:r},on(o),n}function Bt(n){return n?n=Si:Si}function Ut(n){var e=n.h
if(void 0===e){if("function"==typeof n.render)throw Error(l(188))
throw n=Object.keys(n).join(","),Error(l(268,n))}return null===(n=null!==(n=v(e))?d(n):null)?null:gu(n.stateNode)}function Vt(n,e,r,l,t,u){t=Bt(t),null===l.context?l.context=t:l.pendingContext=t,(l=cn(e)).payload={element:r},null!==(u=void 0===u?null:u)&&(l.callback=u),null!==(r=fn(n,l,e))&&(Kl(r,0,e),sn(r,n,e))}function Ht(n,e){if(null!==(n=n.memoizedState)&&null!==n.dehydrated){var r=n.retryLane
n.retryLane=0!==r&&r<e?r:e}}function qt(n,e){Ht(n,e),(n=n.alternate)&&Ht(n,e)}var $t,Wt,Gt={},Qt=K(),Yt=function(){return Un||(Un=1,Yn.exports=function(){return Bn||(Bn=1,function(n){function e(n,e){var r=n.length
n.push(e)
n:for(;0<r;){var l=r-1>>>1,u=n[l]
if(!(0<t(u,e)))break n
n[l]=e,n[r]=u,r=l}}function r(n){return 0===n.length?null:n[0]}function l(n){if(0===n.length)return null
var e=n[0],r=n.pop()
if(r!==e){n[0]=r
n:for(var l=0,u=n.length,o=u>>>1;l<o;){var i=2*(l+1)-1,a=n[i],c=i+1,f=n[c]
if(0>t(a,r))c<u&&0>t(f,a)?(n[l]=f,n[c]=r,l=c):(n[l]=a,n[i]=r,l=i)
else{if(!(c<u&&0>t(f,r)))break n
n[l]=f,n[c]=r,l=c}}}return e}function t(n,e){var r=n.sortIndex-e.sortIndex
return 0!==r?r:n.id-e.id}function u(n){for(var t=r(y);null!==t;){if(null===t.callback)l(y)
else{if(!(t.startTime<=n))break
l(y),t.sortIndex=t.expirationTime,e(h,t)}t=r(y)}}function o(n){if(x=!1,u(n),!g)if(null!==r(h))g=!0,c()
else{var e=r(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-R<P)}function a(){if(M){var e=n.unstable_now()
R=e
var t=!0
try{n:{g=!1,x&&(x=!1,S(j),j=-1),k=!0
var a=m
try{e:{for(u(e),w=r(h);null!==w&&!(w.expirationTime>e&&i());){var c=w.callback
if("function"==typeof c){w.callback=null,m=w.priorityLevel
var s=c(w.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){w.callback=s,u(e),t=!0
break e}w===r(h)&&l(h),u(e)}else l(h)
w=r(h)}if(null!==w)t=!0
else{var v=r(y)
null!==v&&f(o,v.startTime-e),t=!1}}break n}finally{w=null,m=a,k=!1}t=void 0}}finally{t?p():M=!1}}}function c(){M||(M=!0,p())}function f(e,r){j=E(function(){e(n.unstable_now())},r)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],b=1,w=null,m=3,k=!1,g=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,M=!1,j=-1,P=5,R=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var z=new MessageChannel,I=z.port2
z.port1.onmessage=a,p=function(){I.postMessage(null)}}else p=function(){E(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){g||k||(g=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return r(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var r=m
m=e
try{return n()}finally{m=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var r=m
m=n
try{return e()}finally{m=r}},n.unstable_scheduleCallback=function(l,t,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,l){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return l={id:b++,callback:t,priorityLevel:l,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(l.sortIndex=u,e(y,l),null===r(h)&&l===r(y)&&(x?(S(j),j=-1):x=!0,f(o,u-i))):(l.sortIndex=a,e(h,l),g||k||(g=!0,c())),l},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=m
return function(){var r=m
m=e
try{return n.apply(this,arguments)}finally{m=r}}}}(Jn)),Jn}()),Yn.exports}(),Jt=Object.assign,Kt=Symbol.for("react.element"),Xt=Symbol.for("react.transitional.element"),Zt=Symbol.for("react.portal"),nu=Symbol.for("react.fragment"),eu=Symbol.for("react.strict_mode"),ru=Symbol.for("react.profiler"),lu=Symbol.for("react.provider"),tu=Symbol.for("react.consumer"),uu=Symbol.for("react.context"),ou=Symbol.for("react.forward_ref"),iu=Symbol.for("react.suspense"),au=Symbol.for("react.suspense_list"),cu=Symbol.for("react.memo"),fu=Symbol.for("react.lazy"),su=Symbol.for("react.offscreen"),vu=Symbol.for("react.memo_cache_sentinel"),du=Symbol.iterator,pu=Symbol.for("react.client.reference"),hu=Qt.P,yu=!1,bu=Array.isArray,wu=n.rendererVersion,mu=n.rendererPackageName,ku=n.extraDevToolsConfig,gu=n.getPublicInstance,xu=n.getRootHostContext,Eu=n.getChildHostContext,Su=n.prepareForCommit,Cu=n.resetAfterCommit,Mu=n.createInstance,ju=n.appendInitialChild,Pu=n.finalizeInitialChildren,Ru=n.shouldSetTextContent,zu=n.createTextInstance,Iu=n.scheduleTimeout,Tu=n.cancelTimeout,Fu=n.noTimeout,_u=n.isPrimaryRenderer,Ou=n.supportsMutation,Au=n.supportsPersistence,Lu=n.supportsHydration,Du=n.getInstanceFromNode,Nu=n.preparePortalMount,Bu=n.setCurrentUpdatePriority,Uu=n.getCurrentUpdatePriority,Vu=n.resolveUpdatePriority,Hu=n.shouldAttemptEagerTransition,qu=n.detachDeletedInstance,$u=n.maySuspendCommit,Wu=n.preloadInstance,Gu=n.startSuspendingCommit,Qu=n.suspendInstance,Yu=n.waitForCommitToBeReady,Ju=n.NotPendingTransition,Ku=n.HostTransitionContext,Xu=n.resetFormInstance,Zu=n.supportsMicrotasks,no=n.scheduleMicrotask,eo=n.supportsTestSelectors,ro=n.findFiberRoot,lo=n.getBoundingRect,to=n.getTextContent,uo=n.isHiddenSubtree,oo=n.matchAccessibilityRole,io=n.setFocusIfFocusable,ao=n.setupIntersectionObserver,co=n.appendChild,fo=n.appendChildToContainer,so=n.commitTextUpdate,vo=n.commitMount,po=n.commitUpdate,ho=n.insertBefore,yo=n.insertInContainerBefore,bo=n.removeChild,wo=n.removeChildFromContainer,mo=n.resetTextContent,ko=n.hideInstance,go=n.hideTextInstance,xo=n.unhideInstance,Eo=n.unhideTextInstance,So=n.clearContainer,Co=n.cloneInstance,Mo=n.createContainerChildSet,jo=n.appendChildToContainerChildSet,Po=n.finalizeContainerChildren,Ro=n.replaceContainerChildren,zo=n.cloneHiddenInstance,Io=n.cloneHiddenTextInstance,To=n.isSuspenseInstancePending,Fo=n.isSuspenseInstanceFallback,_o=n.getSuspenseInstanceFallbackErrorDetails,Oo=n.registerSuspenseInstanceRetry,Ao=n.canHydrateFormStateMarker,Lo=n.isFormStateMarkerMatching,Do=n.getNextHydratableSibling,No=n.getFirstHydratableChild,Bo=n.getFirstHydratableChildWithinContainer,Uo=n.getFirstHydratableChildWithinSuspenseInstance,Vo=n.canHydrateInstance,Ho=n.canHydrateTextInstance,qo=n.canHydrateSuspenseInstance,$o=n.hydrateInstance,Wo=n.hydrateTextInstance,Go=n.hydrateSuspenseInstance,Qo=n.getNextHydratableInstanceAfterSuspenseInstance,Yo=n.commitHydratedContainer,Jo=n.commitHydratedSuspenseInstance,Ko=n.clearSuspenseBoundary,Xo=n.clearSuspenseBoundaryFromContainer,Zo=n.shouldDeleteUnhydratedTailInstances,ni=n.validateHydratableInstance,ei=n.validateHydratableTextInstance,ri=n.supportsResources,li=n.isHostHoistableType,ti=n.getHoistableRoot,ui=n.getResource,oi=n.acquireResource,ii=n.releaseResource,ai=n.hydrateHoistable,ci=n.mountHoistable,fi=n.unmountHoistable,si=n.createHoistableInstance,vi=n.prepareToCommitHoistables,di=n.mayResourceSuspendCommit,pi=n.preloadResource,hi=n.suspendResource,yi=n.supportsSingletons,bi=n.resolveSingletonInstance,wi=n.clearSingleton,mi=n.acquireSingletonInstance,ki=n.releaseSingletonInstance,gi=n.isHostSingletonType,xi=[],Ei=-1,Si={},Ci=Math.clz32?Math.clz32:function(n){return 0==(n>>>=0)?32:31-(Mi(n)/ji|0)|0},Mi=Math.log,ji=Math.LN2,Pi=128,Ri=4194304,zi=Yt.unstable_scheduleCallback,Ii=Yt.unstable_cancelCallback,Ti=Yt.unstable_shouldYield,Fi=Yt.unstable_requestPaint,_i=Yt.unstable_now,Oi=Yt.unstable_ImmediatePriority,Ai=Yt.unstable_UserBlockingPriority,Li=Yt.unstable_NormalPriority,Di=Yt.unstable_IdlePriority,Ni=Yt.log,Bi=Yt.unstable_setDisableYieldValue,Ui=null,Vi=null,Hi="function"==typeof Object.is?Object.is:function(n,e){return n===e&&(0!==n||1/n==1/e)||n!=n&&e!=e},qi=new WeakMap,$i=[],Wi=0,Gi=null,Qi=0,Yi=[],Ji=0,Ki=null,Xi=1,Zi="",na=h(null),ea=h(null),ra=h(null),la=h(null),ta=null,ua=null,oa=!1,ia=null,aa=!1,ca=Error(l(519)),fa=[],sa=0,va=0,da=null,pa=null,ha=!1,ya=!1,ba=!1,wa=0,ma=null,ka=0,ga=0,xa=null,Ea=!1,Sa=!1,Ca=Object.prototype.hasOwnProperty,Ma=Error(l(460)),ja=Error(l(474)),Pa={then:function(){}},Ra=null,za=null,Ia=0,Ta=Mn(!0),Fa=Mn(!1),_a=h(null),Oa=h(0),Aa=h(null),La=null,Da=h(0),Na=0,Ba=null,Ua=null,Va=null,Ha=!1,qa=!1,$a=!1,Wa=0,Ga=0,Qa=null,Ya=0,Ja=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}},Ka={readContext:Lr,use:Kn,useCallback:On,useContext:On,useEffect:On,useImperativeHandle:On,useLayoutEffect:On,useInsertionEffect:On,useMemo:On,useReducer:On,useRef:On,useState:On,useDebugValue:On,useDeferredValue:On,useTransition:On,useSyncExternalStore:On,useId:On}
Ka.useCacheRefresh=On,Ka.useMemoCache=On,Ka.useHostTransitionStatus=On,Ka.useFormState=On,Ka.useActionState=On,Ka.useOptimistic=On
var Xa={readContext:Lr,use:Kn,useCallback:function(n,e){return Wn().memoizedState=[n,void 0===e?null:e],n},useContext:Lr,useEffect:je,useImperativeHandle:function(n,e,r){r=null!=r?r.concat([n]):null,Ce(4194308,4,Ie.bind(null,e,n),r)},useLayoutEffect:function(n,e){return Ce(4194308,4,n,e)},useInsertionEffect:function(n,e){Ce(4,2,n,e)},useMemo:function(n,e){var r=Wn()
e=void 0===e?null:e
var l=n()
if($a){R(!0)
try{n()}finally{R(!1)}}return r.memoizedState=[l,e],l},useReducer:function(n,e,r){var l=Wn()
if(void 0!==r){var t=r(e)
if($a){R(!0)
try{r(e)}finally{R(!1)}}}else t=e
return l.memoizedState=l.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:t},l.queue=n,n=n.dispatch=qe.bind(null,Ba,n),[l.memoizedState,n]},useRef:function(n){return n={current:n},Wn().memoizedState=n},useState:function(n){var e=(n=ce(n)).queue,r=$e.bind(null,Ba,e)
return e.dispatch=r,[n.memoizedState,r]},useDebugValue:Fe,useDeferredValue:function(n,e){return Ae(Wn(),n,e)},useTransition:function(){var n=ce(!1)
return n=De.bind(null,Ba,n.queue,!0,!1),Wn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,e,r){var t=Ba,u=Wn()
if(oa){if(void 0===r)throw Error(l(407))
r=r()}else{if(r=e(),null===_c)throw Error(l(349))
60&Ac||te(t,e,r)}u.memoizedState=r
var o={value:r,getSnapshot:e}
return u.queue=o,je(oe.bind(null,t,o,n),[n]),t.flags|=2048,Ee(9,ue.bind(null,t,o,r,e),{destroy:void 0},null),r},useId:function(){var n=Wn(),e=_c.identifierPrefix
if(oa){var r=Zi
e=":"+e+"R"+(r=(Xi&~(1<<32-Ci(Xi)-1)).toString(32)+r),0<(r=Wa++)&&(e+="H"+r.toString(32)),e+=":"}else e=":"+e+"r"+(r=Ya++).toString(32)+":"
return n.memoizedState=e},useCacheRefresh:function(){return Wn().memoizedState=He.bind(null,Ba)}}
Xa.useMemoCache=Xn,Xa.useHostTransitionStatus=Be,Xa.useFormState=we,Xa.useActionState=we,Xa.useOptimistic=function(n){var e=Wn()
e.memoizedState=e.baseState=n
var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return e.queue=r,e=Ge.bind(null,Ba,!0,r),r.dispatch=e,[n,e]}
var Za={readContext:Lr,use:Kn,useCallback:_e,useContext:Lr,useEffect:Pe,useImperativeHandle:Te,useInsertionEffect:Re,useLayoutEffect:ze,useMemo:Oe,useReducer:ne,useRef:Se,useState:function(){return ne(Zn)},useDebugValue:Fe,useDeferredValue:function(n,e){return Le(Gn(),Ua.memoizedState,n,e)},useTransition:function(){var n=ne(Zn)[0],e=Gn().memoizedState
return["boolean"==typeof n?n:Qn(n),e]},useSyncExternalStore:le,useId:Ue}
Za.useCacheRefresh=Ve,Za.useMemoCache=Xn,Za.useHostTransitionStatus=Be,Za.useFormState=me,Za.useActionState=me,Za.useOptimistic=function(n,e){return fe(Gn(),0,n,e)}
var nc={readContext:Lr,use:Kn,useCallback:_e,useContext:Lr,useEffect:Pe,useImperativeHandle:Te,useInsertionEffect:Re,useLayoutEffect:ze,useMemo:Oe,useReducer:re,useRef:Se,useState:function(){return re(Zn)},useDebugValue:Fe,useDeferredValue:function(n,e){var r=Gn()
return null===Ua?Ae(r,n,e):Le(r,Ua.memoizedState,n,e)},useTransition:function(){var n=re(Zn)[0],e=Gn().memoizedState
return["boolean"==typeof n?n:Qn(n),e]},useSyncExternalStore:le,useId:Ue}
nc.useCacheRefresh=Ve,nc.useMemoCache=Xn,nc.useHostTransitionStatus=Be,nc.useFormState=xe,nc.useActionState=xe,nc.useOptimistic=function(n,e){var r=Gn()
return null!==Ua?fe(r,0,n,e):(r.baseState=n,[n,r.queue.dispatch])}
var ec={isMounted:function(n){return!!(n=n.h)&&f(n)===n},enqueueSetState:function(n,e,r){n=n.h
var l=Yl(),t=cn(l)
t.payload=e,null!=r&&(t.callback=r),null!==(e=fn(n,t,l))&&(Kl(e,0,l),sn(e,n,l))},enqueueReplaceState:function(n,e,r){n=n.h
var l=Yl(),t=cn(l)
t.tag=1,t.payload=e,null!=r&&(t.callback=r),null!==(e=fn(n,t,l))&&(Kl(e,0,l),sn(e,n,l))},enqueueForceUpdate:function(n,e){n=n.h
var r=Yl(),l=cn(r)
l.tag=2,null!=e&&(l.callback=e),null!==(e=fn(n,l,r))&&(Kl(e,0,r),sn(e,n,r))}},rc="function"==typeof reportError?reportError:function(n){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof n&&null!==n&&"string"==typeof n.message?String(n.message):String(n),error:n})
if(!window.dispatchEvent(e))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",n),void 0
void 0},lc=Error(l(461)),tc=!1,uc={dehydrated:null,treeContext:null,retryLane:0},oc=h(null),ic=null,ac=null,cc="undefined"!=typeof AbortController?AbortController:function(){var n=[],e=this.signal={aborted:!1,addEventListener:function(e,r){n.push(r)}}
this.abort=function(){e.aborted=!0,n.forEach(function(n){return n()})}},fc=Yt.unstable_scheduleCallback,sc=Yt.unstable_NormalPriority,vc={$$typeof:uu,Consumer:null,Provider:null,o:null,i:null,R:0},dc=hu.S
hu.S=function(n,e){"object"==typeof e&&null!==e&&"function"==typeof e.then&&function(n,e){if(null===ma){var r=ma=[]
ka=0,ga=tn(),xa={status:"pending",value:void 0,then:function(n){r.push(n)}}}return ka++,e.then(un,un),e}(0,e),null!==dc&&dc(n,e)}
var pc=h(null),hc=!1,yc=!1,bc=!1,wc="function"==typeof WeakSet?WeakSet:Set,mc=null,kc=!1,gc=null,xc=!1,Ec=null,Sc=8192,Cc={getCacheForType:function(n){var e=Lr(vc),r=e.data.get(n)
return void 0===r&&(r=n(),e.data.set(n,r)),r}},Mc=0,jc=1,Pc=2,Rc=3,zc=4
if("function"==typeof Symbol&&Symbol.for){var Ic=Symbol.for
Mc=Ic("selector.component"),jc=Ic("selector.has_pseudo_class"),Pc=Ic("selector.role"),Rc=Ic("selector.test_id"),zc=Ic("selector.text")}var Tc="function"==typeof WeakMap?WeakMap:Map,Fc=0,_c=null,Oc=null,Ac=0,Lc=0,Dc=null,Nc=!1,Bc=!1,Uc=!1,Vc=0,Hc=0,qc=0,$c=0,Wc=0,Gc=0,Qc=0,Yc=null,Jc=null,Kc=!1,Xc=0,Zc=1/0,nf=null,ef=null,rf=!1,lf=null,tf=0,uf=0,of=null,af=0,cf=null
return Gt.attemptContinuousHydration=function(n){if(13===n.tag){var e=Q(n,67108864)
null!==e&&Kl(e,0,67108864),qt(n,67108864)}},Gt.attemptHydrationAtCurrentPriority=function(n){if(13===n.tag){var e=Yl(),r=Q(n,e)
null!==r&&Kl(r,0,e),qt(n,e)}},Gt.attemptSynchronousHydration=function(n){switch(n.tag){case 3:if((n=n.stateNode).current.memoizedState.isDehydrated){var e=w(n.pendingLanes)
if(0!==e){for(n.pendingLanes|=2,n.entangledLanes|=2;e;){var r=1<<31-Ci(e)
n.entanglements[1]|=r,e&=~r}X(n),!(6&Fc)&&(Zc=_i()+500,Z(0))}}break
case 13:null!==(e=Q(n,2))&&Kl(e,0,2),lt(),qt(n,2)}},Gt.batchedUpdates=function(n,e){return n(e)},Gt.createComponentSelector=function(n){return{$$typeof:Mc,value:n}},Gt.createContainer=function(n,e,r,l,t,u,o,i,a,c){return Nt(n,e,!1,null,0,l,u,o,i,a,0,null)},Gt.createHasPseudoClassSelector=function(n){return{$$typeof:jc,value:n}},Gt.createHydrationContainer=function(n,e,r,l,t,u,o,i,a,c,f,s,v){return(n=Nt(r,l,!0,n,0,u,i,a,c,f,0,v)).context=Bt(null),r=n.current,(t=cn(l=Yl())).callback=null!=e?e:null,fn(r,t,l),n.current.lanes=l,C(n,l),X(n),n},Gt.createPortal=function(n,e,r){var l=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:Zt,key:null==l?null:""+l,children:n,containerInfo:e,implementation:r}},Gt.createRoleSelector=function(n){return{$$typeof:Pc,value:n}},Gt.createTestNameSelector=function(n){return{$$typeof:Rc,value:n}},Gt.createTextSelector=function(n){return{$$typeof:zc,value:n}},Gt.defaultOnCaughtError=function(n){void 0},Gt.defaultOnRecoverableError=function(n){rc(n)},Gt.defaultOnUncaughtError=function(n){rc(n)},Gt.deferredUpdates=function(n){var e=hu.T,r=Uu()
try{return Bu(32),hu.T=null,n()}finally{Bu(r),hu.T=e}},Gt.discreteUpdates=function(n,e,r,l,t){var u=hu.T,o=Uu()
try{return Bu(2),hu.T=null,n(e,r,l,t)}finally{Bu(o),hu.T=u,0===Fc&&(Zc=_i()+500)}},Gt.findAllNodes=Ql,Gt.findBoundingRects=function(n,e){if(!eo)throw Error(l(363))
e=Ql(n,e),n=[]
for(var r=0;r<e.length;r++)n.push(lo(e[r]))
for(e=n.length-1;0<e;e--)for(var t=(r=n[e]).x,u=t+r.width,o=r.y,i=o+r.height,a=e-1;0<=a;a--)if(e!==a){var c=n[a],f=c.x,s=f+c.width,v=c.y,d=v+c.height
if(t>=f&&o>=v&&u<=s&&i<=d){n.splice(e,1)
break}if(!(t!==f||r.width!==c.width||d<o||v>i)){v>o&&(c.height+=v-o,c.y=o),d<i&&(c.height=i-v),n.splice(e,1)
break}if(!(o!==v||r.height!==c.height||s<t||f>u)){f>t&&(c.width+=f-t,c.x=t),s<u&&(c.width=u-f),n.splice(e,1)
break}}return n},Gt.findHostInstance=Ut,Gt.findHostInstanceWithNoPortals=function(n){return null===(n=null!==(n=v(n))?p(n):null)?null:gu(n.stateNode)},Gt.findHostInstanceWithWarning=function(n){return Ut(n)},Gt.flushPassiveEffects=gt,Gt.flushSyncFromReconciler=function(n){var e=Fc
Fc|=1
var r=hu.T,l=Uu()
try{if(Bu(2),hu.T=null,n)return n()}finally{Bu(l),hu.T=r,!(6&(Fc=e))&&Z(0)}},Gt.flushSyncWork=lt,Gt.focusWithin=function(n,e){if(!eo)throw Error(l(363))
for(e=Gl(n=ql(n),e),e=Array.from(e),n=0;n<e.length;){var r=e[n++],t=r.tag
if(!uo(r)){if((5===t||26===t||27===t)&&io(r.stateNode))return!0
for(r=r.child;null!==r;)e.push(r),r=r.sibling}}return!1},Gt.getFindAllNodesFailureDescription=function(n,e){if(!eo)throw Error(l(363))
var r=0,t=[]
n=[ql(n),0]
for(var u=0;u<n.length;){var o=n[u++],i=o.tag,a=n[u++],c=e[a]
if((5!==i&&26!==i&&27!==i||!uo(o))&&($l(o,c)&&(t.push(Wl(c)),++a>r&&(r=a)),a<e.length))for(o=o.child;null!==o;)n.push(o,a),o=o.sibling}if(r<e.length){for(n=[];r<e.length;r++)n.push(Wl(e[r]))
return"findAllNodes was able to match part of the selector:\n  "+t.join(" > ")+"\n\nNo matching component was found for:\n  "+n.join(" > ")}return null},Gt.getPublicRootInstance=function(n){if(!(n=n.current).child)return null
switch(n.child.tag){case 27:case 5:return gu(n.child.stateNode)
default:return n.child.stateNode}},Gt.injectIntoDevTools=function(){var n={bundleType:0,version:wu,rendererPackageName:mu,currentDispatcherRef:hu,findFiberByHostInstance:Du,reconcilerVersion:"19.0.0"}
if(null!==ku&&(n.rendererConfig=ku),"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)n=!1
else{var e=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(e.isDisabled||!e.supportsFiber)n=!0
else{try{Ui=e.inject(n),Vi=e}catch(r){}n=!!e.checkDCE}}return n},Gt.isAlreadyRendering=function(){return!1},Gt.observeVisibleRects=function(n,e,r,t){if(!eo)throw Error(l(363))
n=Ql(n,e)
var u=ao(n,r,t).disconnect
return{disconnect:function(){u()}}},Gt.shouldError=function(){return null},Gt.shouldSuspend=function(){return!1},Gt.startHostTransition=function(n,e,t,u){if(5!==n.tag)throw Error(l(476))
var o=Ne(n).queue
De(n,o,e,Ju,null===t?r:function(){var e=Ne(n).next.queue
return We(n,e,{},Yl()),t(u)})},Gt.updateContainer=function(n,e,r,l){var t=e.current,u=Yl()
return Vt(t,u,n,e,r,l),u},Gt.updateContainerSync=function(n,e,r,l){return 0===e.tag&&gt(),Vt(e.current,2,n,e,r,l),2},Gt},n.exports.default=n.exports,Object.defineProperty(n.exports,"I",{value:!0})),Qn.exports
var n}function e(n){let e=n.root
for(;e.getState().previousRoot;)e=e.getState().previousRoot
return e}function r(n){const e=Z.useRef(n)
return ue(()=>{e.current=n},[n]),e}function l({set:n}){return ue(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}function t(n){var e
const r="undefined"!=typeof window?null!=(e=window.devicePixelRatio)?e:2:1
return Array.isArray(n)?Math.min(Math.max(n[0],r),n[1]):n}function u(n){var e
return null==(e=n.F)?void 0:e.root.getState()}function o(n){const e={}
for(const r in n)ae.includes(r)||(e[r]=n[r])
return e}function i(n,e,r,l){const t=n
let u=null==t?void 0:t.F
return u||(u={root:e,type:r,parent:null,children:[],props:o(l),object:t,eventCount:0,handlers:{},isHidden:!1},t&&(t.F=u)),u}function a(n,e){let r=n[e]
if(!e.includes("-"))return{root:n,key:e,target:r}
r=n
for(const t of e.split("-")){var l
e=t,n=r,r=null==(l=r)?void 0:l[e]}return{root:n,key:e,target:r}}function c(n,e){if(ie.str(e.props.attach)){if(ce.test(e.props.attach)){const r=e.props.attach.replace(ce,""),{root:l,key:t}=a(n.object,r)
Array.isArray(l[t])||(l[t]=[])}const{root:r,key:l}=a(n.object,e.props.attach)
e.previousAttach=r[l],r[l]=e.object}else ie.fun(e.props.attach)&&(e.previousAttach=e.props.attach(n.object,e.object))}function f(n,e){if(ie.str(e.props.attach)){const{root:r,key:l}=a(n.object,e.props.attach),t=e.previousAttach
void 0===t?delete r[l]:r[l]=t}else null==e.previousAttach?void 0:e.previousAttach(n.object,e.object)
delete e.previousAttach}function s(n){let e=se.get(n.constructor)
try{e||(e=new n.constructor,se.set(n.constructor,e))}catch(Qe){}return e}function v(n,r){var l
const t=n.F,u=t&&e(t).getState(),o=null==t?void 0:t.eventCount
for(const e in r){let l=r[e]
if(fe.includes(e))continue
if(t&&de.test(e)){"function"==typeof l?t.handlers[e]=l:delete t.handlers[e],t.eventCount=Object.keys(t.handlers).length
continue}if(void 0===l)continue
let{root:o,key:c,target:f}=a(n,e)
if(f instanceof mn&&l instanceof mn)f.mask=l.mask
else if(f instanceof kn&&te(l))f.set(l)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"function"==typeof f.copy&&null!=l&&l.constructor&&f.constructor===l.constructor)f.copy(l)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&Array.isArray(l))"function"==typeof f.fromArray?f.fromArray(l):f.set(...l)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"number"==typeof l)"function"==typeof f.setScalar?f.setScalar(l):f.set(l)
else{var i
o[c]=l,u&&!u.linear&&ve.includes(c)&&null!=(i=o[c])&&i.isTexture&&o[c].format===gn&&o[c].type===xn&&(o[c].colorSpace=hn)}}if(null!=t&&t.parent&&null!=u&&u.internal&&null!=(l=t.object)&&l.isObject3D&&o!==t.eventCount){const n=t.object,e=u.internal.interaction.indexOf(n)
e>-1&&u.internal.interaction.splice(e,1),t.eventCount&&null!==n.raycast&&u.internal.interaction.push(n)}return t&&void 0===t.props.attach&&(t.object.isBufferGeometry?t.props.attach="geometry":t.object.isMaterial&&(t.props.attach="material")),t&&d(t),n}function d(n){var e
if(!n.parent)return
null==n.props.onUpdate?void 0:n.props.onUpdate(n.object)
const r=null==(e=n.root)||null==e.getState?void 0:e.getState()
r&&0===r.internal.frames&&r.invalidate()}function p(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function h(n,e,r,l){const t=r.get(e)
t&&(r.delete(e),0===r.size&&(n.delete(l),t.target.releasePointerCapture(l)))}function y(){const n=Z.useContext(ye)
if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!")
return n}function b(n=n=>n,e){return y()(n,e)}function w(n,e=0){const l=y(),t=l.getState().internal.subscribe,u=r(n)
return ue(()=>t(u,e,l),[e,t,l]),null}function m(n){if("function"==typeof n){const e=""+ke++
return be[e]=n,e}Object.assign(be,n)}function k(n,e){const r=me(n),l=be[r]
if("primitive"!==n&&!l)throw new Error(`R3F: ${r} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`)
if("primitive"===n&&!e.object)throw new Error("R3F: Primitives without 'object' are invalid!")
if(void 0!==e.args&&!Array.isArray(e.args))throw new Error("R3F: The args prop must be an array!")}function g(n){var e
n.isHidden&&(n.props.attach&&null!=(e=n.parent)&&e.object?c(n.parent,n):pe(n.object)&&!1!==n.props.visible&&(n.object.visible=!0),n.isHidden=!1,d(n))}function x(n,e,r){const l=e.root.getState()
if(n.parent||n.object===l.scene){if(!e.object){var t,u
const n=be[me(e.type)]
e.object=null!=(t=e.props.object)?t:new n(...null!=(u=e.props.args)?u:[]),e.object.F=e}if(v(e.object,e.props),e.props.attach)c(n,e)
else if(pe(e.object)&&pe(n.object)){const l=n.object.children.indexOf(null==r?void 0:r.object)
if(r&&-1!==l){const r=n.object.children.indexOf(e.object)
if(-1!==r){n.object.children.splice(r,1)
const t=r<l?l-1:l
n.object.children.splice(t,0,e.object)}else e.object.parent=n.object,n.object.children.splice(l,0,e.object),e.object.dispatchEvent({type:"added"}),n.object.dispatchEvent({type:"childadded",child:e.object})}else n.object.add(e.object)}for(const n of e.children)x(e,n)
d(e)}}function E(n,e){e&&(e.parent=n,n.children.push(e),x(n,e))}function S(n,e,r){if(!e||!r)return
e.parent=n
const l=n.children.indexOf(r);-1!==l?n.children.splice(l,0,e):n.children.push(e),x(n,e,r)}function C(n){if("function"==typeof n.dispose){const e=()=>{try{n.dispose()}catch{}}
"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?e():re.unstable_scheduleCallback(re.unstable_IdlePriority,e)}}function M(n,r,l){if(!r)return
r.parent=null
const t=n.children.indexOf(r);-1!==t&&n.children.splice(t,1),r.props.attach?f(n,r):pe(r.object)&&pe(n.object)&&(n.object.remove(r.object),function(n,e){const{internal:r}=n.getState()
r.interaction=r.interaction.filter(n=>n!==e),r.initialHits=r.initialHits.filter(n=>n!==e),r.hovered.forEach((n,l)=>{n.eventObject!==e&&n.object!==e||r.hovered.delete(l)}),r.capturedMap.forEach((n,l)=>{h(r.capturedMap,e,n,l)})}(e(r),r.object))
const u=null!==r.props.dispose&&!1!==l
for(let e=r.children.length-1;e>=0;e--)M(r,r.children[e],u)
r.children.length=0,delete r.object.F,u&&"primitive"!==r.type&&"Scene"!==r.object.type&&C(r.object),void 0===l&&d(r)}function j(n,e){for(const r of[n,n.alternate])if(null!==r)if("function"==typeof r.ref){null==r.refCleanup?void 0:r.refCleanup()
const n=r.ref(e)
"function"==typeof n&&(r.refCleanup=n)}else r.ref&&(r.ref.current=e)}function P({store:n,children:e,onCreated:r,rootElement:l}){return ue(()=>{const e=n.getState()
e.set(n=>({internal:{...n.internal,active:!0}})),r&&r(e),n.getState().events.connected||null==e.events.connect||e.events.connect(l)},[]),J.jsx(ye.Provider,{value:n,children:e})}function R(n,e){const r=Me.get(n),l=null==r?void 0:r.fiber
if(l){const e=null==r?void 0:r.store.getState()
e&&(e.internal.active=!1),Ce.updateContainer(null,l,null,()=>{e&&setTimeout(()=>{try{var r,l,t,u
null==e.events.disconnect?void 0:e.events.disconnect(),null==(r=e.gl)||null==(l=r.renderLists)||null==l.dispose||l.dispose(),null==(t=e.gl)||null==t.forceContextLoss||t.forceContextLoss(),null!=(u=e.gl)&&u.xr&&e.xr.disconnect(),function(n){"Scene"!==n.type&&(null==n.dispose?void 0:n.dispose())
for(const e in n){const r=n[e]
"Scene"!==(null==r?void 0:r.type)&&(null==r||null==r.dispose?void 0:r.dispose())}}(e.scene),Me.delete(n)}catch(Qe){}},500)})}}function z(n,e){if(n.size)for(const{callback:r}of n.values())r(e)}function I(n,e){switch(n){case"before":return z(Pe,e)
case"after":return z(Re,e)
case"tail":return z(ze,e)}}function T(n,e,r){let l=e.clock.getDelta()
"never"===e.frameloop&&"number"==typeof n&&(l=n-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=n),Ie=e.internal.subscribers
for(let t=0;t<Ie.length;t++)Te=Ie[t],Te.ref.current(Te.store.getState(),l,r)
return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),"always"===e.frameloop?1:e.internal.frames}function F(n){_e=requestAnimationFrame(F),Ae=!0,Fe=0,I("before",n),Le=!0
for(const r of Me.values()){var e
Oe=r.store.getState(),!Oe.internal.active||!("always"===Oe.frameloop||Oe.internal.frames>0)||null!=(e=Oe.gl.xr)&&e.isPresenting||(Fe+=T(n,Oe))}if(Le=!1,I("after",n),0===Fe)return I("tail",n),Ae=!1,cancelAnimationFrame(_e)}function _(n,e=1){var r
if(!n)return Me.forEach(n=>_(n.store.getState(),e))
null!=(r=n.gl.xr)&&r.isPresenting||!n.internal.active||"never"===n.frameloop||(n.internal.frames=e>1?Math.min(60,n.internal.frames+e):Le?2:1,Ae||(Ae=!0,requestAnimationFrame(F)))}function O(n,e=!0,r,l){if(e&&I("before",n),r)T(n,r,l)
else for(const t of Me.values())T(n,t.store.getState())
e&&I("after",n)}function A(n){const{handlePointer:e}=function(n){function e(n){return n.filter(n=>["Move","Over","Enter","Out","Leave"].some(e=>{var r
return null==(r=n.F)?void 0:r.handlers["onPointer"+e]}))}function r(e){const{internal:r}=n.getState()
for(const n of r.hovered.values())if(!e.length||!e.find(e=>e.object===n.object&&e.index===n.index&&e.instanceId===n.instanceId)){const l=n.eventObject.F
if(r.hovered.delete(p(n)),null!=l&&l.eventCount){const r=l.handlers,t={...n,intersections:e}
null==r.onPointerOut?void 0:r.onPointerOut(t),null==r.onPointerLeave||r.onPointerLeave(t)}}}function l(n,e){for(let r=0;r<e.length;r++){const l=e[r].F
null==l||null==l.handlers.onPointerMissed?void 0:l.handlers.onPointerMissed(n)}}return{handlePointer:function(t){switch(t){case"onPointerLeave":case"onPointerCancel":return()=>r([])
case"onLostPointerCapture":return e=>{const{internal:l}=n.getState()
"pointerId"in e&&l.capturedMap.has(e.pointerId)&&requestAnimationFrame(()=>{l.capturedMap.has(e.pointerId)&&(l.capturedMap.delete(e.pointerId),r([]))})}}return function(o){const{onPointerMissed:i,internal:a}=n.getState()
a.lastEvent.current=o
const c="onPointerMove"===t,f="onClick"===t||"onContextMenu"===t||"onDoubleClick"===t,s=function(e,r){const l=n.getState(),t=new Set,o=[],i=r?r(l.internal.interaction):l.internal.interaction
for(let n=0;n<i.length;n++){const e=u(i[n])
e&&(e.raycaster.camera=void 0)}l.previousRoot||(null==l.events.compute?void 0:l.events.compute(e,l))
let a=i.flatMap(function(n){const r=u(n)
return r&&r.events.enabled&&null!==r.raycaster.camera?(void 0===r.raycaster.camera&&(null==r.events.compute?void 0:r.events.compute(e,r,null==(l=r.previousRoot)?void 0:l.getState()),void 0===r.raycaster.camera&&(r.raycaster.camera=null)),r.raycaster.camera?r.raycaster.intersectObject(n,!0):[]):[]
var l}).sort((n,e)=>{const r=u(n.object),l=u(e.object)
return r&&l&&l.events.priority-r.events.priority||n.distance-e.distance}).filter(n=>{const e=p(n)
return!t.has(e)&&(t.add(e),!0)})
l.events.filter&&(a=l.events.filter(a,l))
for(const n of a){let e=n.object
for(;e;){var c
null!=(c=e.F)&&c.eventCount&&o.push({...n,eventObject:e}),e=e.parent}}if("pointerId"in e&&l.internal.capturedMap.has(e.pointerId))for(let n of l.internal.capturedMap.get(e.pointerId).values())t.has(p(n.intersection))||o.push(n.intersection)
return o}(o,c?e:void 0),v=f?function(e){const{internal:r}=n.getState(),l=e.offsetX-r.initialClick[0],t=e.offsetY-r.initialClick[1]
return Math.round(Math.sqrt(l*l+t*t))}(o):0
"onPointerDown"===t&&(a.initialClick=[o.offsetX,o.offsetY],a.initialHits=s.map(n=>n.eventObject)),f&&!s.length&&v<=2&&(l(o,a.interaction),i&&i(o)),c&&r(s),function(n,e,l,t){if(n.length){const o={stopped:!1}
for(const i of n){let a=u(i.object)
if(a||i.object.traverseAncestors(n=>{const e=u(n)
if(e)return a=e,!1}),a){const{raycaster:u,pointer:c,camera:f,internal:s}=a,v=new En(c.x,c.y,0).unproject(f),d=n=>{var e,r
return null!=(e=null==(r=s.capturedMap.get(n))?void 0:r.has(i.eventObject))&&e},p=n=>{const r={intersection:i,target:e.target}
s.capturedMap.has(n)?s.capturedMap.get(n).set(i.eventObject,r):s.capturedMap.set(n,new Map([[i.eventObject,r]])),e.target.setPointerCapture(n)},y=n=>{const e=s.capturedMap.get(n)
e&&h(s.capturedMap,i.eventObject,e,n)}
let b={}
for(let n in e){let r=e[n]
"function"!=typeof r&&(b[n]=r)}let w={...i,...b,pointer:c,intersections:n,stopped:o.stopped,delta:l,unprojectedPoint:v,ray:u.ray,camera:f,stopPropagation(){const l="pointerId"in e&&s.capturedMap.get(e.pointerId);(!l||l.has(i.eventObject))&&(w.stopped=o.stopped=!0,s.hovered.size&&Array.from(s.hovered.values()).find(n=>n.eventObject===i.eventObject))&&r([...n.slice(0,n.indexOf(i)),i])},target:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:y},currentTarget:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:y},nativeEvent:e}
if(t(w),!0===o.stopped)break}}}}(s,o,v,function(n){const e=n.eventObject,r=e.F
if(null==r||!r.eventCount)return
const u=r.handlers
if(c){if(u.onPointerOver||u.onPointerEnter||u.onPointerOut||u.onPointerLeave){const e=p(n),r=a.hovered.get(e)
r?r.stopped&&n.stopPropagation():(a.hovered.set(e,n),null==u.onPointerOver||u.onPointerOver(n),null==u.onPointerEnter||u.onPointerEnter(n))}null==u.onPointerMove?void 0:u.onPointerMove(n)}else{const r=u[t]
r?f&&!a.initialHits.includes(e)||(l(o,a.interaction.filter(n=>!a.initialHits.includes(n))),r(n)):f&&a.initialHits.includes(e)&&l(o,a.interaction.filter(n=>!a.initialHits.includes(n)))}})}}}}(n)
return{priority:1,enabled:!0,compute(n,e,r){e.pointer.set(n.offsetX/e.size.width*2-1,-n.offsetY/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)},connected:void 0,handlers:Object.keys(De).reduce((n,r)=>({...n,[r]:e(r)}),{}),update:()=>{var e
const{events:r,internal:l}=n.getState()
null!=(e=l.lastEvent)&&e.current&&r.handlers&&r.handlers.onPointerMove(l.lastEvent.current)},connect:e=>{const{set:r,events:l}=n.getState()
if(null==l.disconnect?void 0:l.disconnect(),r(n=>({events:{...n.events,connected:e}})),l.handlers)for(const n in l.handlers){const r=l.handlers[n],[t,u]=De[n]
e.addEventListener(t,r,{passive:u})}},disconnect:()=>{const{set:e,events:r}=n.getState()
if(r.connected){if(r.handlers)for(const n in r.handlers){const e=r.handlers[n],[l]=De[n]
r.connected.removeEventListener(l,e)}e(n=>({events:{...n.events,connected:void 0}}))}}}}function L(n,e){let r
return(...l)=>{window.clearTimeout(r),r=window.setTimeout(()=>n(...l),e)}}function D({debounce:n,scroll:e,polyfill:r,offsetSize:l}={debounce:0,scroll:!1,offsetSize:!1}){function t(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(n=>n.removeEventListener("scroll",h,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function u(){c.current.element&&(c.current.resizeObserver=new o(h),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(n=>n.addEventListener("scroll",h,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{h()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const o=r||("undefined"==typeof window?class{}:window.ResizeObserver)
if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills")
const[i,a]=Z.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=Z.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:i,orientationHandler:null}),f=n?"number"==typeof n?n:n.scroll:null,s=n?"number"==typeof n?n:n.resize:null,v=Z.useRef(!1)
Z.useEffect(()=>(v.current=!0,()=>{v.current=!1}))
const[d,p,h]=Z.useMemo(()=>{const n=()=>{if(!c.current.element)return
const{left:n,top:e,width:r,height:t,bottom:u,right:o,x:i,y:f}=c.current.element.getBoundingClientRect(),s={left:n,top:e,width:r,height:t,bottom:u,right:o,x:i,y:f}
c.current.element instanceof HTMLElement&&l&&(s.height=c.current.element.offsetHeight,s.width=c.current.element.offsetWidth),Object.freeze(s),v.current&&!Be(c.current.lastBounds,s)&&a(c.current.lastBounds=s)}
return[n,s?L(n,s):n,f?L(n,f):n]},[a,l,f,s])
return function(n,e){Z.useEffect(()=>{if(e){const e=n
return window.addEventListener("scroll",e,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",e,!0)}}},[n,e])}(h,!!e),function(n){Z.useEffect(()=>{const e=n
return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n])}(p),Z.useEffect(()=>{t(),u()},[e,h,p]),Z.useEffect(()=>t,[]),[n=>{!n||n===c.current.element||(t(),c.current.element=n,c.current.scrollContainers=N(n),u())},i,d]}function N(n){const e=[]
if(!n||n===document.body)return e
const{overflow:r,overflowX:l,overflowY:t}=window.getComputedStyle(n)
return[r,l,t].some(n=>"auto"===n||"scroll"===n)&&e.push(n),[...e,...N(n.parentElement)]}function B({ref:n,children:e,fallback:u,resize:o,style:a,gl:c,events:f=A,eventSource:s,eventPrefix:d,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,scene:C,onPointerMissed:M,onCreated:j,...z}){Z.useMemo(()=>m(jn),[])
const I=function(){const n=nn(),e=en()
return Z.useMemo(()=>({children:r})=>{const l=rn(n,!0,n=>n.type===Z.StrictMode)?Z.StrictMode:Z.Fragment
return J.jsx(l,{children:J.jsx(e,{children:r})})},[n,e])}(),[T,F]=D({scroll:!0,debounce:{scroll:50,resize:0},...o}),L=Z.useRef(null),N=Z.useRef(null)
Z.useImperativeHandle(n,()=>L.current)
const B=r(M),[U,V]=Z.useState(!1),[H,q]=Z.useState(!1)
if(U)throw U
if(H)throw H
const $=Z.useRef(null)
ue(()=>{const n=L.current
if(F.width>0&&F.height>0&&n){async function r(){await $.current.configure({gl:c,scene:C,events:f,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,size:F,onPointerMissed:(...n)=>null==B.current?void 0:B.current(...n),onCreated:n=>{var e
null==n.events.connect?void 0:n.events.connect(s?(e=s)&&e.hasOwnProperty("current")?s.current:s:N.current),d&&n.setEvents({compute:(n,e)=>{const r=n[d+"X"],l=n[d+"Y"]
e.pointer.set(r/e.size.width*2-1,-l/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)}}),null==j||j(n)}}),$.current.render(J.jsx(I,{children:J.jsx(oe,{set:q,children:J.jsx(Z.Suspense,{fallback:J.jsx(l,{set:V}),children:null!=e?e:null})})}))}$.current||($.current=function(n){const e=Me.get(n),r=null==e?void 0:e.fiber,l=null==e?void 0:e.store
e,0
const u="function"==typeof reportError?reportError:console.error,o=l||((n,e)=>{const r=wn((r,l)=>{function u(n=l().camera,e=i,r=l().size){const{width:t,height:u,top:c,left:f}=r,s=t/u
e.isVector3?a.copy(e):a.set(...e)
const v=n.getWorldPosition(o).distanceTo(a)
if(le(n))return{width:t/n.zoom,height:u/n.zoom,top:c,left:f,factor:1,distance:v,aspect:s}
{const e=n.fov*Math.PI/180,r=2*Math.tan(e/2)*v,l=r*(t/u)
return{width:l,height:r,top:c,left:f,factor:t/l,distance:v,aspect:s}}}const o=new En,i=new En,a=new En
let c
const f=n=>r(e=>({performance:{...e.performance,current:n}})),s=new Sn,v={set:r,get:l,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(e=1)=>n(l(),e),advance:(n,r)=>e(n,r,l()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new Cn,pointer:s,mouse:s,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const n=l()
c&&clearTimeout(c),n.performance.current!==n.performance.min&&f(n.performance.min),c=setTimeout(()=>f(l().performance.max),n.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:u},setEvents:n=>r(e=>({...e,events:{...e.events,...n}})),setSize:(n,e,t=0,o=0)=>{const a=l().camera,c={width:n,height:e,top:t,left:o}
r(n=>({size:c,viewport:{...n.viewport,...u(a,i,c)}}))},setDpr:n=>r(e=>{const r=t(n)
return{viewport:{...e.viewport,dpr:r,initialDpr:e.viewport.initialDpr||r}}}),setFrameloop:(n="always")=>{const e=l().clock
e.stop(),e.elapsedTime=0,"never"!==n&&(e.start(),e.elapsedTime=0),r(()=>({frameloop:n}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:Z.createRef(),active:!1,frames:0,priority:0,subscribe:(n,e,r)=>{const t=l().internal
return t.priority=t.priority+(e>0?1:0),t.subscribers.push({ref:n,priority:e,store:r}),t.subscribers=t.subscribers.sort((n,e)=>n.priority-e.priority),()=>{const r=l().internal
null!=r&&r.subscribers&&(r.priority=r.priority-(e>0?1:0),r.subscribers=r.subscribers.filter(e=>e.ref!==n))}}}}
return v}),l=r.getState()
let u=l.size,o=l.viewport.dpr,i=l.camera
return r.subscribe(()=>{const{camera:n,size:e,viewport:l,gl:t,set:a}=r.getState()
if(e.width!==u.width||e.height!==u.height||l.dpr!==o){u=e,o=l.dpr,function(n,e){n.manual||(le(n)?(n.left=e.width/-2,n.right=e.width/2,n.top=e.height/2,n.bottom=e.height/-2):n.aspect=e.width/e.height,n.updateProjectionMatrix())}(n,e),l.dpr>0&&t.setPixelRatio(l.dpr)
const r="undefined"!=typeof HTMLCanvasElement&&t.domElement instanceof HTMLCanvasElement
t.setSize(e.width,e.height,r)}n!==i&&(i=n,a(e=>({viewport:{...e.viewport,...e.viewport.getCurrentViewport(n)}})))}),r.subscribe(e=>n(e)),r})(_,O),a=r||Ce.createContainer(o,Wn.ConcurrentRoot,null,!1,null,"",u,u,u,null)
let c,f
e||Me.set(n,{fiber:a,store:o})
let s=!1,d=null
return{async configure(e={}){let r
d=new Promise(n=>r=n)
let{gl:l,size:u,scene:a,events:p,onCreated:h,shadows:y=!1,linear:b=!1,flat:w=!1,legacy:m=!1,orthographic:k=!1,frameloop:g="always",dpr:x=[1,2],performance:E,raycaster:S,camera:C,onPointerMissed:M}=e,j=o.getState(),P=j.gl
if(!j.gl){const e={canvas:n,powerPreference:"high-performance",antialias:!0,alpha:!0},r="function"==typeof l?await l(e):l
P=he(r)?r:new ln({...e,...l}),j.set({gl:P})}let R=j.raycaster
R||j.set({raycaster:R=new tn})
const{params:z,...I}=S||{}
if(ie.equ(I,R,je)||v(R,{...I}),ie.equ(z,R.params,je)||v(R,{params:{...R.params,...z}}),!j.camera||j.camera===f&&!ie.equ(f,C,je)){f=C
const n=null==C?void 0:C.isCamera,e=n?C:k?new un(0,0,0,0,.1,1e3):new on(75,0,.1,1e3)
n||(e.position.z=5,C&&(v(e,C),e.manual||("aspect"in C||"left"in C||"right"in C||"bottom"in C||"top"in C)&&(e.manual=!0,e.updateProjectionMatrix())),j.camera||null!=C&&C.rotation||e.lookAt(0,0,0)),j.set({camera:e}),R.camera=e}if(!j.scene){let n
null!=a&&a.isScene?(n=a,i(n,o,"",{})):(n=new an,i(n,o,"",{}),a&&v(n,a)),j.set({scene:n})}p&&!j.events.handlers&&j.set({events:p(o)})
const T=function(n,e){if(!e&&"undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:e,height:r,top:l,left:t}=n.parentElement.getBoundingClientRect()
return{width:e,height:r,top:l,left:t}}return!e&&"undefined"!=typeof OffscreenCanvas&&n instanceof OffscreenCanvas?{width:n.width,height:n.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...e}}(n,u)
if(ie.equ(T,j.size,je)||j.setSize(T.width,T.height,T.top,T.left),x&&j.viewport.dpr!==t(x)&&j.setDpr(x),j.frameloop!==g&&j.setFrameloop(g),j.onPointerMissed||j.set({onPointerMissed:M}),E&&!ie.equ(E,j.performance,je)&&j.set(n=>({performance:{...n.performance,...E}})),!j.xr){var F
const n=(n,e)=>{const r=o.getState()
"never"!==r.frameloop&&O(n,!0,r,e)},e=()=>{const e=o.getState()
e.gl.xr.enabled=e.gl.xr.isPresenting,e.gl.xr.setAnimationLoop(e.gl.xr.isPresenting?n:null),e.gl.xr.isPresenting||_(e)},r={connect(){const n=o.getState().gl
n.xr.addEventListener("sessionstart",e),n.xr.addEventListener("sessionend",e)},disconnect(){const n=o.getState().gl
n.xr.removeEventListener("sessionstart",e),n.xr.removeEventListener("sessionend",e)}}
"function"==typeof(null==(F=P.xr)?void 0:F.addEventListener)&&r.connect(),j.set({xr:r})}if(P.shadowMap){const n=P.shadowMap.enabled,e=P.shadowMap.type
if(P.shadowMap.enabled=!!y,ie.boo(y))P.shadowMap.type=cn
else if(ie.str(y)){var A
const n={basic:vn,percentage:sn,soft:cn,variance:fn}
P.shadowMap.type=null!=(A=n[y])?A:cn}else ie.obj(y)&&Object.assign(P.shadowMap,y)
n===P.shadowMap.enabled&&e===P.shadowMap.type||(P.shadowMap.needsUpdate=!0)}return dn.enabled=!m,s||(P.outputColorSpace=b?pn:hn,P.toneMapping=w?yn:bn),j.legacy!==m&&j.set(()=>({legacy:m})),j.linear!==b&&j.set(()=>({linear:b})),j.flat!==w&&j.set(()=>({flat:w})),!l||ie.fun(l)||he(l)||ie.equ(l,P,je)||v(P,l),c=h,s=!0,r(),this},render(e){return s||d||this.configure(),d.then(()=>{Ce.updateContainer(J.jsx(P,{store:o,children:e,onCreated:c,rootElement:n}),a,null,()=>{})}),o},unmount(){R(n)}}}(n)),r()}}),Z.useEffect(()=>{const n=L.current
if(n)return()=>R(n)},[])
const W=s?"none":"auto"
return J.jsx("div",{ref:N,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:W,...a},...z,children:J.jsx("div",{ref:T,style:{width:"100%",height:"100%"},children:J.jsx("canvas",{ref:L,style:{display:"block"},children:u})})})}function U(n){return J.jsx(Mn,{children:J.jsx(B,{...n})})}function V(){try{const n=document.createElement("canvas"),e=n.getContext("webgl")||n.getContext("experimental-webgl")
if(!e)return!1
const r=e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT),l=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT),t=e.getExtension("WEBGL_lose_context")
return t&&t.loseContext(),!(!r||!l)}catch(n){return void 0,!1}}function H(){try{const n=document.createElement("canvas").getContext("webgl2")
if(!n)return!1
const e=n.getExtension("WEBGL_lose_context")
return e&&e.loseContext(),!0}catch(n){return void 0,!1}}function q(){if(!V())return{supported:!1,version:null,maxTextureSize:0,maxVertexUniforms:0,maxFragmentUniforms:0}
try{const n=document.createElement("canvas"),e=n.getContext("webgl")||n.getContext("experimental-webgl"),r={supported:!0,version:H()?2:1,maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxVertexUniforms:e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),maxFragmentUniforms:e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxVaryingVectors:e.getParameter(e.MAX_VARYING_VECTORS),maxVertexAttribs:e.getParameter(e.MAX_VERTEX_ATTRIBS),maxViewportDims:e.getParameter(e.MAX_VIEWPORT_DIMS),aliasedLineWidthRange:e.getParameter(e.ALIASED_LINE_WIDTH_RANGE),aliasedPointSizeRange:e.getParameter(e.ALIASED_POINT_SIZE_RANGE)},l=e.getExtension("WEBGL_lose_context")
return l&&l.loseContext(),r}catch(n){return void 0,{supported:!1,version:null,maxTextureSize:0,maxVertexUniforms:0,maxFragmentUniforms:0}}}function $(){q()}function W({waveSpeed:n,waveFrequency:e,waveAmplitude:r,waveColor:l,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a}){const c=Z.useRef(null),f=Z.useRef(new Sn)
let s,v,d
try{const n=b()
s=n.viewport,v=n.size,d=n.gl}catch(y){return void 0,null}const p=Z.useRef({time:new Ln(0),resolution:new Ln(new Sn(0,0)),waveSpeed:new Ln(n),waveFrequency:new Ln(e),waveAmplitude:new Ln(r),waveColor:new Ln(new kn(...l)),mousePos:new Ln(new Sn(0,0)),enableMouseInteraction:new Ln(i?1:0),mouseRadius:new Ln(a)})
Z.useEffect(()=>{const n=d.getPixelRatio(),e=Math.floor(v.width*n),r=Math.floor(v.height*n),l=p.current.resolution.value
l.x===e&&l.y===r||l.set(e,r)},[v,d])
const h=Z.useRef([...l])
return w(({clock:t})=>{const u=p.current
o||(u.time.value=t.getElapsedTime()),u.waveSpeed.value!==n&&(u.waveSpeed.value=n),u.waveFrequency.value!==e&&(u.waveFrequency.value=e),u.waveAmplitude.value!==r&&(u.waveAmplitude.value=r),h.current.every((n,e)=>n===l[e])||(u.waveColor.value.set(...l),h.current=[...l]),u.enableMouseInteraction.value=i?1:0,u.mouseRadius.value=a,i&&u.mousePos.value.copy(f.current)}),J.jsxs(J.Fragment,{children:[J.jsxs("mesh",{ref:c,scale:[s.width,s.height,1],children:[J.jsx("planeGeometry",{args:[1,1]}),J.jsx("shaderMaterial",{vertexShader:"\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n",fragmentShader:"\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n",uniforms:p.current})]}),J.jsx(Z.Suspense,{fallback:null,children:J.jsx(He,{children:J.jsx(Ye,{colorNum:t,pixelSize:u})})}),J.jsxs("mesh",{onPointerMove:n=>{if(!i)return
const e=d.domElement.getBoundingClientRect(),r=d.getPixelRatio()
f.current.set((n.clientX-e.left)*r,(n.clientY-e.top)*r)},position:[0,0,.01],scale:[s.width,s.height,1],visible:!1,children:[J.jsx("planeGeometry",{args:[1,1]}),J.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function G({reason:n="unknown"}){return Z.useEffect(()=>{void 0,"webgl-unsupported"===n&&$()},[n]),J.jsxs("div",{className:"dither-container",style:{background:"linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",backgroundSize:"20px 20px",animation:"ditherFallback 3s ease-in-out infinite alternate",position:"relative"},children:[J.jsx("style",{children:"\n        @keyframes ditherFallback {\n          0% {\n            opacity: 0.8;\n            filter: hue-rotate(0deg) brightness(1.1);\n          }\n          100% {\n            opacity: 0.6;\n            filter: hue-rotate(15deg) brightness(0.9);\n          }\n        }\n      "}),!1]})}function Q({waveSpeed:n=.05,waveFrequency:e=3,waveAmplitude:r=.3,waveColor:l=[.5,.5,.5],colorNum:t=4,pixelSize:u=2,disableAnimation:o=!1,enableMouseInteraction:i=!0,mouseRadius:a=1}){const[c,f]=Z.useState(null),[s,v]=Z.useState(!1)
if(Z.useEffect(()=>{v(!0),requestAnimationFrame(()=>{const n=!("undefined"==typeof window||!document||!document.createElement||!V()||q().maxTextureSize<512)
f(n),void 0,n||$()})},[]),!s||null===c)return J.jsx(G,{reason:"initializing"})
if(!c)return J.jsx(G,{reason:"webgl-unsupported"})
try{return J.jsx(We,{fallback:()=>J.jsx(G,{reason:"runtime-error"}),children:J.jsx(U,{className:"dither-container",camera:{position:[0,0,6]},dpr:Math.min(window.devicePixelRatio||1,2),gl:{antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1},onCreated:n=>{try{n.gl.setSize(n.size.width,n.size.height)}catch(e){throw void 0,e}},onError:n=>{void 0},fallback:J.jsx(G,{reason:"canvas-fallback"}),children:J.jsx(Z.Suspense,{fallback:null,children:J.jsx(W,{waveSpeed:n,waveFrequency:e,waveAmplitude:r,waveColor:l,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a})})})})}catch(d){return void 0,J.jsx(G,{reason:"component-error"})}}function Y(){Z.useEffect(()=>{void 0,void 0,navigator.userAgent,navigator.platform,navigator.vendor,navigator.language,navigator.cookieEnabled,navigator.onLine,screen.width,screen.height,screen.colorDepth,screen.pixelDepth,window.innerWidth,window.innerHeight,window.devicePixelRatio,window.location.protocol,window.location.hostname,window.location.port,performance.memory&&(performance.memory.usedJSHeapSize,performance.memory.totalJSHeapSize,performance.memory.jsHeapSizeLimit),(new Date).toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone},[])
const n=()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"}
return J.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[J.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:J.jsx(Q,{waveSpeed:.05,waveFrequency:19,waveAmplitude:.51,waveColor:[.5,.5,.5],colorNum:2.5,pixelSize:3,disableAnimation:!1,enableMouseInteraction:!1,mouseRadius:.3})}),J.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 40px",borderRadius:"16px",background:"rgba(22, 22, 22, 0.12)",backdropFilter:"blur(4px)",border:"1px solid rgba(255, 255, 255, 0.06)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",maxWidth:"400px",width:"90%"},children:[J.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"24px"},children:[J.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"BOUNCE2BOUNCE",style:{height:"48px",width:"auto",cursor:"pointer",transition:"all 0.3s ease",opacity:.95,filter:"brightness(0) invert(1)"},onClick:n,onError:n=>{n.target.style.display="none",n.target.nextSibling.style.display="block"}}),J.jsx("div",{style:{display:"none",color:"rgba(255, 255, 255, 0.9)",fontSize:"18px",fontWeight:"600",letterSpacing:"0.5px"},children:"BOUNCE2BOUNCE"})]}),J.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 6rem)",fontWeight:"800",color:"rgba(255, 255, 255, 0.95)",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",textShadow:"0 2px 8px rgba(0, 0, 0, 0.2)"},children:"404"}),J.jsx("h2",{style:{fontSize:"clamp(1.25rem, 2.5vw, 1.5rem)",fontWeight:"500",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 32px 0",lineHeight:"1.2"},children:"Not Found"}),J.jsx("button",{onClick:n,style:{padding:"14px 28px",fontSize:"1rem",fontWeight:"500",color:"rgba(255, 255, 255, 0.9)",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"8px",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(2px)",transform:"translateY(0)",outline:"none"},onMouseEnter:n=>{n.target.style.background="rgba(255, 255, 255, 0.12)",n.target.style.borderColor="rgba(255, 255, 255, 0.25)",n.target.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.target.style.background="rgba(255, 255, 255, 0.08)",n.target.style.borderColor="rgba(255, 255, 255, 0.15)",n.target.style.transform="translateY(0)"},onFocus:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.3)"},onBlur:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.15)"},"aria-label":"Go back to homepage",children:"Go Home"})]})]})}import{j as J}from"./index-CPSFtgNe.js"
import{r as K,g as X,b as Z,c as nn,x as en,d as rn,W as ln,e as tn,O as un,P as on,S as an,f as cn,V as fn,h as sn,B as vn,C as dn,L as pn,j as hn,N as yn,A as bn,k as wn,l as mn,m as kn,n as gn,U as xn,o as En,p as Sn,q as Cn,t as Mn,T as jn,E as Pn,H as Rn,u as zn,v as In,D as Tn,w as Fn,y as _n,R as On,z as An,F as Ln}from"./vendor-BktKn6fm.js"
var Dn,Nn,Bn,Un,Vn,Hn,qn={exports:{}},$n={},Wn=function(){return Nn||(Nn=1,qn.exports=function(){return Dn||(Dn=1,$n.ConcurrentRoot=1,$n.ContinuousEventPriority=8,$n.DefaultEventPriority=32,$n.DiscreteEventPriority=2,$n.IdleEventPriority=268435456,$n.LegacyRoot=0,$n.NoEventPriority=0),$n}()),qn.exports}(),Gn={exports:{}},Qn={exports:{}},Yn={exports:{}},Jn={}
const Kn=X(function(){return Hn||(Hn=1,Gn.exports=n()),Gn.exports}())
var Xn,Zn,ne={exports:{}},ee={},re=function(){return Zn||(Zn=1,ne.exports=function(){return Xn||(Xn=1,function(n){function e(n,e){var r=n.length
n.push(e)
n:for(;0<r;){var l=r-1>>>1,u=n[l]
if(!(0<t(u,e)))break n
n[l]=e,n[r]=u,r=l}}function r(n){return 0===n.length?null:n[0]}function l(n){if(0===n.length)return null
var e=n[0],r=n.pop()
if(r!==e){n[0]=r
n:for(var l=0,u=n.length,o=u>>>1;l<o;){var i=2*(l+1)-1,a=n[i],c=i+1,f=n[c]
if(0>t(a,r))c<u&&0>t(f,a)?(n[l]=f,n[c]=r,l=c):(n[l]=a,n[i]=r,l=i)
else{if(!(c<u&&0>t(f,r)))break n
n[l]=f,n[c]=r,l=c}}}return e}function t(n,e){var r=n.sortIndex-e.sortIndex
return 0!==r?r:n.id-e.id}function u(n){for(var t=r(y);null!==t;){if(null===t.callback)l(y)
else{if(!(t.startTime<=n))break
l(y),t.sortIndex=t.expirationTime,e(h,t)}t=r(y)}}function o(n){if(x=!1,u(n),!g)if(null!==r(h))g=!0,c()
else{var e=r(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-R<P)}function a(){if(M){var e=n.unstable_now()
R=e
var t=!0
try{n:{g=!1,x&&(x=!1,S(j),j=-1),k=!0
var a=m
try{e:{for(u(e),w=r(h);null!==w&&!(w.expirationTime>e&&i());){var c=w.callback
if("function"==typeof c){w.callback=null,m=w.priorityLevel
var s=c(w.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){w.callback=s,u(e),t=!0
break e}w===r(h)&&l(h),u(e)}else l(h)
w=r(h)}if(null!==w)t=!0
else{var v=r(y)
null!==v&&f(o,v.startTime-e),t=!1}}break n}finally{w=null,m=a,k=!1}t=void 0}}finally{t?p():M=!1}}}function c(){M||(M=!0,p())}function f(e,r){j=E(function(){e(n.unstable_now())},r)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],b=1,w=null,m=3,k=!1,g=!1,x=!1,E="function"==typeof setTimeout?setTimeout:null,S="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,M=!1,j=-1,P=5,R=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var z=new MessageChannel,I=z.port2
z.port1.onmessage=a,p=function(){I.postMessage(null)}}else p=function(){E(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){g||k||(g=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return m},n.unstable_getFirstCallbackNode=function(){return r(h)},n.unstable_next=function(n){switch(m){case 1:case 2:case 3:var e=3
break
default:e=m}var r=m
m=e
try{return n()}finally{m=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var r=m
m=n
try{return e()}finally{m=r}},n.unstable_scheduleCallback=function(l,t,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,l){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return l={id:b++,callback:t,priorityLevel:l,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(l.sortIndex=u,e(y,l),null===r(h)&&l===r(y)&&(x?(S(j),j=-1):x=!0,f(o,u-i))):(l.sortIndex=a,e(h,l),g||k||(g=!0,c())),l},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=m
return function(){var r=m
m=e
try{return n.apply(this,arguments)}finally{m=r}}}}(ee)),ee}()),ne.exports}()
const le=n=>n&&n.isOrthographicCamera,te=n=>null!=n&&("string"==typeof n||"number"==typeof n||n.isColor),ue=((n,e)=>"undefined"!=typeof window&&((null==(n=window.document)?void 0:n.createElement)||"ReactNative"===(null==(e=window.navigator)?void 0:e.product)))()?Z.useLayoutEffect:Z.useEffect,oe=(n=>((n=class extends Z.Component{constructor(...n){super(...n),this.state={error:!1}}componentDidCatch(n){this.props.set(n)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),n))(),ie={obj:n=>n===Object(n)&&!ie.arr(n)&&"function"!=typeof n,fun:n=>"function"==typeof n,str:n=>"string"==typeof n,num:n=>"number"==typeof n,boo:n=>"boolean"==typeof n,und:n=>void 0===n,nul:n=>null===n,arr:n=>Array.isArray(n),equ(n,e,{arrays:r="shallow",objects:l="reference",strict:t=!0}={}){if(typeof n!=typeof e||!!n!=!!e)return!1
if(ie.str(n)||ie.num(n)||ie.boo(n))return n===e
const u=ie.obj(n)
if(u&&"reference"===l)return n===e
const o=ie.arr(n)
if(o&&"reference"===r)return n===e
if((o||u)&&n===e)return!0
let i
for(i in n)if(!(i in e))return!1
if(u&&"shallow"===r&&"shallow"===l){for(i in t?e:n)if(!ie.equ(n[i],e[i],{strict:t,objects:"reference"}))return!1}else for(i in t?e:n)if(n[i]!==e[i])return!1
if(ie.und(i)){if(o&&0===n.length&&0===e.length)return!0
if(u&&0===Object.keys(n).length&&0===Object.keys(e).length)return!0
if(n!==e)return!1}return!0}},ae=["children","key","ref"],ce=/-\d+$/,fe=[...ae,"args","dispose","attach","object","onUpdate","dispose"],se=new Map,ve=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],de=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/,pe=n=>null==n?void 0:n.isObject3D,he=n=>!(null==n||!n.render),ye=Z.createContext(null),be={},we=/^three(?=[A-Z])/,me=n=>`${n[0].toUpperCase()}${n.slice(1)}`
let ke=0
const ge=[],xe=()=>{},Ee={}
let Se=0
const Ce=function(n){const e=Kn(n)
return e.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:Z.version}),e}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(n,e,r){var l
return k(n=me(n)in be?n:n.replace(we,""),e),"primitive"===n&&null!=(l=e.object)&&l.F&&delete e.object.F,i(e.object,r,n,e)},removeChild:M,appendChild:E,appendInitialChild:E,insertBefore:S,appendChildToContainer(n,e){const r=n.getState().scene.F
e&&r&&E(r,e)},removeChildFromContainer(n,e){const r=n.getState().scene.F
e&&r&&M(r,e)},insertInContainerBefore(n,e,r){const l=n.getState().scene.F
e&&r&&l&&S(l,e,r)},getRootHostContext:()=>Ee,getChildHostContext:()=>Ee,commitUpdate(n,e,r,l,t){var u,o,i
k(e,l)
let p=!1
if(("primitive"===n.type&&r.object!==l.object||(null==(u=l.args)?void 0:u.length)!==(null==(o=r.args)?void 0:o.length)||null!=(i=l.args)&&i.some((n,e)=>{var l
return n!==(null==(l=r.args)?void 0:l[e])}))&&(p=!0),p)ge.push([n,{...l},t])
else{const e=function(n,e){const r={}
for(const l in e)if(!fe.includes(l)&&!ie.equ(e[l],n.props[l])){r[l]=e[l]
for(const n in e)n.startsWith(`${l}-`)&&(r[n]=e[n])}for(const l in n.props){if(fe.includes(l)||e.hasOwnProperty(l))continue
const{root:t,key:u}=a(n.object,l)
if(t.constructor&&0===t.constructor.length){const n=s(t)
ie.und(n)||(r[u]=n[u])}else r[u]=0}return r}(n,l)
Object.keys(e).length&&(Object.assign(n.props,e),v(n.object,e))}!(null!==t.sibling&&4&t.flags||function(){for(const[r]of ge){const n=r.parent
if(n){r.props.attach?f(n,r):pe(r.object)&&pe(n.object)&&n.object.remove(r.object)
for(const n of r.children)n.props.attach?f(r,n):pe(n.object)&&pe(r.object)&&r.object.remove(n.object)}r.isHidden&&g(r),r.object.F&&delete r.object.F,"primitive"!==r.type&&C(r.object)}for(const[r,l,t]of ge){r.props=l
const u=r.parent
if(u){var n,e
const l=be[me(r.type)]
r.object=null!=(n=r.props.object)?n:new l(...null!=(e=r.props.args)?e:[]),r.object.F=r,j(t,r.object),v(r.object,r.props),r.props.attach?c(u,r):pe(r.object)&&pe(u.object)&&u.object.add(r.object)
for(const n of r.children)n.props.attach?c(r,n):pe(n.object)&&pe(r.object)&&r.object.add(n.object)
d(r)}}ge.length=0}())},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:n=>null==n?void 0:n.object,prepareForCommit:()=>null,preparePortalMount:n=>i(n.getState().scene,n,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(n){var e
n.isHidden||(n.props.attach&&null!=(e=n.parent)&&e.object?f(n.parent,n):pe(n.object)&&(n.object.visible=!1),n.isHidden=!0,d(n))},unhideInstance:g,createTextInstance:xe,hideTextInstance:xe,unhideTextInstance:xe,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:Z.createContext(null),setCurrentUpdatePriority(n){Se=n},getCurrentUpdatePriority:()=>Se,resolveUpdatePriority(){var n
if(0!==Se)return Se
switch("undefined"!=typeof window&&(null==(n=window.event)?void 0:n.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Wn.DiscreteEventPriority
case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Wn.ContinuousEventPriority
default:return Wn.DefaultEventPriority}},resetFormInstance(){}}),Me=new Map,je={objects:"shallow",strict:!1},Pe=new Set,Re=new Set,ze=new Set
let Ie,Te,Fe,_e,Oe,Ae=!1,Le=!1
const De={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]},Ne=["x","y","top","bottom","left","right","width","height"],Be=(n,e)=>Ne.every(r=>n[r]===e[r]),Ue=Z.createContext(null),Ve=n=>!(2&~n.getAttributes()),He=Z.memo(Z.forwardRef(({children:n,camera:e,scene:r,resolutionScale:l,enabled:t=!0,renderPriority:u=1,autoClear:o=!0,depthBuffer:i,enableNormalPass:a,stencilBuffer:c,multisampling:f=8,frameBufferType:s=Rn},v)=>{const{gl:d,scene:p,camera:h,size:y}=b(),m=r||p,k=e||h,[g,x,E]=Z.useMemo(()=>{const n=new Pn(d,{depthBuffer:i,stencilBuffer:c,multisampling:f,frameBufferType:s})
n.addPass(new zn(m,k))
let e=null,r=null
return a&&(r=new In(m,k),r.enabled=!1,n.addPass(r),void 0!==l&&(e=new Tn({normalBuffer:r.texture,resolutionScale:l}),e.enabled=!1,n.addPass(e))),[n,r,e]},[k,d,i,c,f,s,m,a,l])
Z.useEffect(()=>g?.setSize(y.width,y.height),[g,y]),w((n,e)=>{if(t){const n=d.autoClear
d.autoClear=o,c&&!o&&d.clearStencil(),g.render(e),d.autoClear=n}},t?u:0)
const S=Z.useRef(null)
Z.useLayoutEffect(()=>{const n=[],e=S.current.F
if(e&&g){const r=e.children
for(let e=0;e<r.length;e++){const l=r[e].object
if(l instanceof Fn){const t=[l]
if(!Ve(l)){let n=null
for(;(n=r[e+1]?.object)instanceof Fn&&!Ve(n);)t.push(n),e++}const u=new _n(k,...t)
n.push(u)}else l instanceof An&&n.push(l)}for(const e of n)g?.addPass(e)
x&&(x.enabled=!0),E&&(E.enabled=!0)}return()=>{for(const e of n)g?.removePass(e)
x&&(x.enabled=!1),E&&(E.enabled=!1)}},[g,n,k,x,E]),Z.useEffect(()=>{const n=d.toneMapping
return d.toneMapping=yn,()=>{d.toneMapping=n}},[d])
const C=Z.useMemo(()=>({composer:g,normalPass:x,downSamplingPass:E,resolutionScale:l,camera:k,scene:m}),[g,x,E,l,k,m])
return Z.useImperativeHandle(v,()=>g,[g]),J.jsx(Ue.Provider,{value:C,children:J.jsx("group",{ref:S,children:n})})}))
let qe=0
const $e=new WeakMap
class We extends On.Component{constructor(n){super(n),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(n){return{hasError:!0}}componentDidCatch(n,e){void 0,this.setState({error:n,errorInfo:e}),window.gtag&&window.gtag("event","exception",{description:`ThreeJS Error: ${n.message}`,fatal:!1})}render(){if(this.state.hasError){const{fallback:n}=this.props
return n?J.jsx(n,{error:this.state.error}):J.jsx("div",{className:"threejs-error-fallback",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",backgroundSize:"20px 20px",animation:"threeJSFallback 3s ease-in-out infinite alternate",zIndex:-1},children:J.jsx("style",{children:"\n            @keyframes threeJSFallback {\n              0% { opacity: 0.8; filter: hue-rotate(0deg); }\n              100% { opacity: 0.6; filter: hue-rotate(10deg); }\n            }\n          "})})}return this.props.children}}const Ge=(Qe=class extends Fn{constructor(){const n=new Map([["colorNum",new Ln(4)],["pixelSize",new Ln(2)]])
super("RetroEffect","\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n",{uniforms:n}),this.uniforms=n}set colorNum(n){this.uniforms.get("colorNum").value=n}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(n){this.uniforms.get("pixelSize").value=n}get pixelSize(){return this.uniforms.get("pixelSize").value}},function({blendFunction:n,opacity:e,...r}){let l=$e.get(Qe)
if(!l){const n=`@react-three/postprocessing/${Qe.name}-${qe++}`
m({[n]:Qe}),$e.set(Qe,l=n)}const t=b(n=>n.camera),u=On.useMemo(()=>[...r.args??[{...r}]],[JSON.stringify(r)])
return J.jsx(l,{camera:t,"blendMode-blendFunction":n,"blendMode-opacity-value":e,...r,args:u})})
var Qe
const Ye=Z.forwardRef((n,e)=>{const{colorNum:r,pixelSize:l}=n
return J.jsx(Ge,{ref:e,colorNum:r,pixelSize:l})})
Ye.displayName="RetroEffect"
export{Y as default}
