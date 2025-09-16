function n(){return _n||(_n=1,(n=qn).exports=function(n){function e(n,e,l,r){return new At(n,e,l,r)}function l(){}function r(n){var e="https://react.dev/errors/"+n
if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1])
for(var l=2;l<arguments.length;l++)e+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(n){var e=n,l=n
if(n.alternate)for(;e.return;)e=e.return
else{n=e
do{!!(4098&(e=n).flags)&&(l=e.return),n=e.return}while(n)}return 3===e.tag?l:null}function u(n){if(t(n)!==n)throw Error(r(188))}function o(n){var e=n.alternate
if(!e){if(null===(e=t(n)))throw Error(r(188))
return e!==n?null:n}for(var l=n,o=e;;){var i=l.return
if(null===i)break
var a=i.alternate
if(null===a){if(null!==(o=i.return)){l=o
continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===l)return u(i),n
if(a===o)return u(i),e
a=a.sibling}throw Error(r(188))}if(l.return!==o.return)l=i,o=a
else{for(var c=!1,f=i.child;f;){if(f===l){c=!0,l=i,o=a
break}if(f===o){c=!0,o=i,l=a
break}f=f.sibling}if(!c){for(f=a.child;f;){if(f===l){c=!0,l=a,o=i
break}if(f===o){c=!0,o=a,l=i
break}f=f.sibling}if(!c)throw Error(r(189))}}if(l.alternate!==o)throw Error(r(190))}if(3!==l.tag)throw Error(r(188))
return l.stateNode.current===l?n:e}function i(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(null!==(e=i(n)))return e
n=n.sibling}return null}function a(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(4!==n.tag&&null!==(e=a(n)))return e
n=n.sibling}return null}function c(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=bu&&n[bu]||n["@@iterator"])?n:null}function f(n){if(null==n)return null
if("function"==typeof n)return n.$$typeof===wu?null:n.displayName||n.name||null
if("string"==typeof n)return n
switch(n){case tu:return"Fragment"
case ou:return"Profiler"
case uu:return"StrictMode"
case su:return"Suspense"
case vu:return"SuspenseList"
case hu:return"Activity"}if("object"==typeof n)switch(n.$$typeof){case ru:return"Portal"
case cu:return(n.displayName||"Context")+".Provider"
case au:return(n.l.displayName||"Context")+".Consumer"
case fu:var e=n.render
return(n=n.displayName)||(n=""!==(n=e.displayName||e.name||"")?"ForwardRef("+n+")":"ForwardRef"),n
case du:return null!==(e=n.displayName||null)?e:f(n.type)||"Memo"
case pu:e=n.t,n=n.u
try{return f(n(e))}catch(l){}}return null}function s(n){return{current:n}}function v(n){0>Pi||(n.current=ji[Pi],ji[Pi]=null,Pi--)}function d(n,e){Pi++,ji[Pi]=n.current,n.current=e}function p(n){var e=42&n
if(0!==e)return e
switch(n&-n){case 1:return 1
case 2:return 2
case 4:return 4
case 8:return 8
case 16:return 16
case 32:return 32
case 64:return 64
case 128:return 128
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&n
case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&n
case 67108864:return 67108864
case 134217728:return 134217728
case 268435456:return 268435456
case 536870912:return 536870912
case 1073741824:return 0
default:return n}}function h(n,e,l){var r=n.pendingLanes
if(0===r)return 0
var t=0,u=n.suspendedLanes,o=n.pingedLanes
n=n.warmLanes
var i=134217727&r
return 0!==i?0!==(r=i&~u)?t=p(r):0!==(o&=i)?t=p(o):l||0!==(l=i&~n)&&(t=p(l)):0!==(i=r&~u)?t=p(i):0!==o?t=p(o):l||0!==(l=r&~n)&&(t=p(l)),0===t?0:0!==e&&e!==t&&0===(e&u)&&((u=t&-t)>=(l=e&-e)||32===u&&4194048&l)?e:t}function y(n,e){return 0===(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&e)}function b(n,e){switch(n){case 1:case 2:case 4:case 8:case 64:return e+250
case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3
default:return-1}}function w(){var n=Oi
return!(4194048&(Oi<<=1))&&(Oi=256),n}function m(){var n=Ai
return!(62914560&(Ai<<=1))&&(Ai=4194304),n}function k(n){for(var e=[],l=0;31>l;l++)e.push(n)
return e}function g(n,e){n.pendingLanes|=e,268435456!==e&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function x(n,e,l){n.pendingLanes|=e,n.suspendedLanes&=~e
var r=31-Ti(e)
n.entangledLanes|=e,n.entanglements[r]=1073741824|n.entanglements[r]|4194090&l}function E(n,e){var l=n.entangledLanes|=e
for(n=n.entanglements;l;){var r=31-Ti(l),t=1<<r
t&e|n[r]&e&&(n[r]|=e),l&=~t}}function S(n){switch(n){case 2:n=1
break
case 8:n=4
break
case 32:n=16
break
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:n=128
break
case 268435456:n=134217728
break
default:n=0}return n}function C(n){return 2<(n&=-n)?8<n?134217727&n?32:268435456:8:2}function M(n){if("function"==typeof $i&&Vi(n),Gi&&"function"==typeof Gi.setStrictMode)try{Gi.setStrictMode(Wi,n)}catch(e){}}function j(n){if(void 0===Yt)try{throw Error()}catch(l){var e=l.stack.trim().match(/\n( *(at )?)/)
Yt=e&&e[1]||"",Kt=-1<l.stack.indexOf("\n    at")?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Yt+n+Kt}function P(n,e){if(!n||Qi)return""
Qi=!0
var l=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var r={DetermineComponentFrameRoot:function(){try{if(e){var l=function(){throw Error()}
if(Object.defineProperty(l.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(l,[])}catch(t){var r=t}Reflect.construct(n,[],l)}else{try{l.call()}catch(u){r=u}n.call(l.prototype)}}else{try{throw Error()}catch(o){r=o}(l=n())&&"function"==typeof l.catch&&l.catch(function(){})}}catch(i){if(i&&r&&"string"==typeof i.stack)return[i.stack,r.stack]}return[null,null]}}
r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var t=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name")
t&&t.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=r.DetermineComponentFrameRoot(),o=u[0],i=u[1]
if(o&&i){var a=o.split("\n"),c=i.split("\n")
for(t=r=0;r<a.length&&!a[r].includes("DetermineComponentFrameRoot");)r++
for(;t<c.length&&!c[t].includes("DetermineComponentFrameRoot");)t++
if(r===a.length||t===c.length)for(r=a.length-1,t=c.length-1;1<=r&&0<=t&&a[r]!==c[t];)t--
for(;1<=r&&0<=t;r--,t--)if(a[r]!==c[t]){if(1!==r||1!==t)do{if(r--,0>--t||a[r]!==c[t]){var f="\n"+a[r].replace(" at new "," at ")
return n.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",n.displayName)),f}}while(1<=r&&0<=t)
break}}}finally{Qi=!1,Error.prepareStackTrace=l}return(l=n?n.displayName||n.name:"")?j(l):""}function R(n){switch(n.tag){case 26:case 27:case 5:return j(n.type)
case 16:return j("Lazy")
case 13:return j("Suspense")
case 19:return j("SuspenseList")
case 0:case 15:return P(n.type,!1)
case 11:return P(n.type.render,!1)
case 1:return P(n.type,!0)
case 31:return j("Activity")
default:return""}}function T(n){try{var e=""
do{e+=R(n),n=n.return}while(n)
return e}catch(l){return"\nError generating stack: "+l.message+"\n"+l.stack}}function I(n,e){if("object"==typeof n&&null!==n){var l=Yi.get(n)
return void 0!==l?l:(e={value:n,source:e,stack:T(e)},Yi.set(n,e),e)}return{value:n,source:e,stack:T(e)}}function z(n,e){Ki[Xi++]=Zi,Ki[Xi++]=Ji,Ji=n,Zi=e}function O(n,e,l){na[ea++]=ra,na[ea++]=ta,na[ea++]=la,la=n
var r=ra
n=ta
var t=32-Ti(r)-1
r&=~(1<<t),l+=1
var u=32-Ti(e)+t
if(30<u){var o=t-t%5
u=(r&(1<<o)-1).toString(32),r>>=o,t-=o,ra=1<<32-Ti(e)+t|l<<t|r,ta=u+n}else ra=1<<u|l<<t|r,ta=n}function A(n){null!==n.return&&(z(n,1),O(n,1,0))}function F(n){for(;n===Ji;)Ji=Ki[--Xi],Ki[Xi]=null,Zi=Ki[--Xi],Ki[Xi]=null
for(;n===la;)la=na[--ea],na[ea]=null,ta=na[--ea],na[ea]=null,ra=na[--ea],na[ea]=null}function _(n,e){d(ia,e),d(oa,n),d(ua,null),n=Cu(e),v(ua),d(ua,n)}function L(){v(ua),v(oa),v(ia)}function D(n){null!==n.memoizedState&&d(aa,n)
var e=ua.current,l=Mu(e,n.type)
e!==l&&(d(oa,n),d(ua,l))}function N(n){oa.current===n&&(v(ua),v(oa)),aa.current===n&&(v(aa),Lu?no.o=Zu:no.i=Zu)}function B(n){throw Q(I(Error(r(418,"")),n)),pa}function H(n,e){if(!Bu)throw Error(r(175))
Ko(n.stateNode,n.type,n.memoizedProps,e,n)||B(n)}function q(n){for(ca=n.return;ca;)switch(ca.tag){case 5:case 13:return da=!1,void 0
case 27:case 3:return da=!0,void 0
default:ca=ca.return}}function U(n){if(!Bu||n!==ca)return!1
if(!sa)return q(n),sa=!0,!1
var e=n.tag
if(gi?3!==e&&27!==e&&(5!==e||ti(n.type)&&!zu(n.type,n.memoizedProps))&&fa&&B(n):3!==e&&(5!==e||ti(n.type)&&!zu(n.type,n.memoizedProps))&&fa&&B(n),q(n),13===e){if(!Bu)throw Error(r(316))
if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(r(317))
fa=Zo(n)}else fa=gi&&27===e?qo(n.type,fa):ca?Ho(n.stateNode):null
return!0}function $(){Bu&&(fa=ca=null,sa=!1)}function V(){var n=va
return null!==n&&(null===ef?ef=n:ef.push.apply(ef,n),va=null),n}function Q(n){null===va?va=[n]:va.push(n)}function Y(n,e,l){Lu?(d(ya,e.o),e.o=l):(d(ya,e.i),e.i=l)}function K(n){var e=ya.current
Lu?n.o=e:n.i=e,v(ya)}function X(n,e,l){for(;null!==n;){var r=n.alternate
if((n.childLanes&e)!==e?(n.childLanes|=e,null!==r&&(r.childLanes|=e)):null!==r&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===l)break
n=n.return}}function J(n,e,l,t){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var o=u.dependencies
if(null!==o){var i=u.child
o=o.firstContext
n:for(;null!==o;){var a=o
o=u
for(var c=0;c<e.length;c++)if(a.context===e[c]){o.lanes|=l,null!==(a=o.alternate)&&(a.lanes|=l),X(o.return,l,n),t||(i=null)
break n}o=a.next}}else if(18===u.tag){if(null===(i=u.return))throw Error(r(341))
i.lanes|=l,null!==(o=i.alternate)&&(o.lanes|=l),X(i,l,n),i=null}else i=u.child
if(null!==i)i.return=u
else for(i=u;null!==i;){if(i===n){i=null
break}if(null!==(u=i.sibling)){u.return=i.return,i=u
break}i=i.return}u=i}}function Z(n,e,l,t){n=null
for(var u=e,o=!1;null!==u;){if(!o)if(524288&u.flags)o=!0
else if(262144&u.flags)break
if(10===u.tag){var i=u.alternate
if(null===i)throw Error(r(387))
if(null!==(i=i.memoizedProps)){var a=u.type
ha(u.pendingProps.value,i.value)||(null!==n?n.push(a):n=[a])}}else if(u===aa.current){if(null===(i=u.alternate))throw Error(r(387))
i.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(no):n=[no])}u=u.return}null!==n&&J(e,n,l,t),e.flags|=262144}function nn(n){for(n=n.firstContext;null!==n;){var e=n.context
if(!ha(Lu?e.o:e.i,n.memoizedValue))return!0
n=n.next}return!1}function en(n){ba=n,wa=null,null!==(n=n.dependencies)&&(n.firstContext=null)}function ln(n){return tn(ba,n)}function rn(n,e){return null===ba&&en(n),tn(n,e)}function tn(n,e){var l=Lu?e.o:e.i
if(e={context:e,memoizedValue:l,next:null},null===wa){if(null===n)throw Error(r(308))
wa=e,n.dependencies={lanes:0,firstContext:e},n.flags|=524288}else wa=wa.next=e
return l}function un(){return{controller:new ma,data:new Map,refCount:0}}function on(n){n.refCount--,0===n.refCount&&ka(ga,function(){n.controller.abort()})}function an(n){n!==Sa&&null===n.next&&(null===Sa?Ea=Sa=n:Sa=Sa.next=n),Ma=!0,Ca||(Ca=!0,lo?ro(function(){6&Dc?Fi(Bi,fn):sn()}):Fi(Bi,fn))}function cn(n,e){if(!ja&&Ma){ja=!0
do{for(var l=!1,r=Ea;null!==r;){if(0!==n){var t=r.pendingLanes
if(0===t)var u=0
else{var o=r.suspendedLanes,i=r.pingedLanes
u=(1<<31-Ti(42|n)+1)-1,u=201326741&(u&=t&~(o&~i))?201326741&u|1:u?2|u:0}0!==u&&(l=!0,pn(r,u))}else u=Hc,!(3&(u=h(r,r===Nc?u:0,null!==r.cancelPendingCommit||r.timeoutHandle!==_u)))||y(r,u)||(l=!0,pn(r,u))
r=r.next}}while(l)
ja=!1}}function fn(){sn()}function sn(){Ma=Ca=!1
var n=0
0!==Pa&&(Wu()&&(n=Pa),Pa=0)
for(var e=Ni(),l=null,r=Ea;null!==r;){var t=r.next,u=vn(r,e)
0===u?(r.next=null,null===l?Ea=t:l.next=t,null===t&&(Sa=l)):(l=r,(0!==n||3&u)&&(Ma=!0)),r=t}cn(n)}function vn(n,e){for(var l=n.suspendedLanes,r=n.pingedLanes,t=n.expirationTimes,u=-62914561&n.pendingLanes;0<u;){var o=31-Ti(u),i=1<<o,a=t[o];-1===a?0!==(i&l)&&0===(i&r)||(t[o]=b(i,e)):a<=e&&(n.expiredLanes|=i),u&=~i}if(l=Hc,l=h(n,n===(e=Nc)?l:0,null!==n.cancelPendingCommit||n.timeoutHandle!==_u),r=n.callbackNode,0===l||n===e&&(2===qc||9===qc)||null!==n.cancelPendingCommit)return null!==r&&null!==r&&_i(r),n.callbackNode=null,n.callbackPriority=0
if(!(3&l)||y(n,l)){if((e=l&-l)===n.callbackPriority)return e
switch(null!==r&&_i(r),C(l)){case 2:case 8:l=Hi
break
case 32:default:l=qi
break
case 268435456:l=Ui}return r=dn.bind(null,n),l=Fi(l,r),n.callbackPriority=e,n.callbackNode=l,e}return null!==r&&null!==r&&_i(r),n.callbackPriority=2,n.callbackNode=null,2}function dn(n,e){if(0!==af&&5!==af)return n.callbackNode=null,n.callbackPriority=0,null
var l=n.callbackNode
if(Ct()&&n.callbackNode!==l)return null
var r=Hc
return 0===(r=h(n,n===Nc?r:0,null!==n.cancelPendingCommit||n.timeoutHandle!==_u))?null:(nt(n,r,e),vn(n,Ni()),null!=n.callbackNode&&n.callbackNode===l?dn.bind(null,n):null)}function pn(n,e){if(Ct())return null
nt(n,e,!0)}function hn(){return 0===Pa&&(Pa=w()),Pa}function yn(){if(0===--Ta&&null!==Ra){null!==za&&(za.status="fulfilled")
var n=Ra
Ra=null,Ia=0,za=null
for(var e=0;e<n.length;e++)(0,n[e])()}}function bn(){var n=Aa.current
return null!==n?n:Nc.pooledCache}function wn(n,e){d(Aa,null===e?Aa.current:e.pool)}function mn(){var n=bn()
return null===n?null:{parent:Lu?xa.o:xa.i,pool:n}}function kn(n,e){if(ha(n,e))return!0
if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1
var l=Object.keys(n),r=Object.keys(e)
if(l.length!==r.length)return!1
for(r=0;r<l.length;r++){var t=l[r]
if(!Fa.call(e,t)||!ha(n[t],e[t]))return!1}return!0}function gn(n){return"fulfilled"===(n=n.status)||"rejected"===n}function xn(){}function En(n,e,l){switch(void 0===(l=n[l])?n.push(e):l!==e&&(e.then(xn,xn),e=l),e.status){case"fulfilled":return e.value
case"rejected":throw Cn(n=e.reason),n
default:if("string"==typeof e.status)e.then(xn,xn)
else{if(null!==(n=Nc)&&100<n.shellSuspendCounter)throw Error(r(482));(n=e).status="pending",n.then(function(n){if("pending"===e.status){var l=e
l.status="fulfilled",l.value=n}},function(n){if("pending"===e.status){var l=e
l.status="rejected",l.reason=n}})}switch(e.status){case"fulfilled":return e.value
case"rejected":throw Cn(n=e.reason),n}throw Ba=e,_a}}function Sn(){if(null===Ba)throw Error(r(459))
var n=Ba
return Ba=null,n}function Cn(n){if(n===_a||n===Da)throw Error(r(483))}function Mn(){for(var n=qa,e=Ua=qa=0;e<n;){var l=Ha[e]
Ha[e++]=null
var r=Ha[e]
Ha[e++]=null
var t=Ha[e]
Ha[e++]=null
var u=Ha[e]
if(Ha[e++]=null,null!==r&&null!==t){var o=r.pending
null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t}0!==u&&Tn(l,t,u)}}function jn(n,e,l,r){Ha[qa++]=n,Ha[qa++]=e,Ha[qa++]=l,Ha[qa++]=r,Ua|=r,n.lanes|=r,null!==(n=n.alternate)&&(n.lanes|=r)}function Pn(n,e,l,r){return jn(n,e,l,r),In(n)}function Rn(n,e){return jn(n,null,null,e),In(n)}function Tn(n,e,l){n.lanes|=l
var r=n.alternate
null!==r&&(r.lanes|=l)
for(var t=!1,u=n.return;null!==u;)u.childLanes|=l,null!==(r=u.alternate)&&(r.childLanes|=l),22===u.tag&&(null===(n=u.stateNode)||1&n.v||(t=!0)),n=u,u=u.return
return 3===n.tag?(u=n.stateNode,t&&null!==e&&(t=31-Ti(l),null===(r=(n=u.hiddenUpdates)[t])?n[t]=[e]:r.push(e),e.lane=536870912|l),u):null}function In(n){if(50<hf)throw hf=0,yf=null,Error(r(185))
for(var e=n.return;null!==e;)e=(n=e).return
return 3===n.tag?n.stateNode:null}function zn(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function On(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function An(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function Fn(n,e,l){var r=n.updateQueue
if(null===r)return null
if(r=r.shared,2&Dc){var t=r.pending
return null===t?e.next=e:(e.next=t.next,t.next=e),r.pending=e,e=In(n),Tn(n,null,l),e}return jn(n,r,e,l),In(n)}function _n(n,e,l){if(null!==(e=e.updateQueue)&&(e=e.shared,4194048&l)){var r=e.lanes
l|=r&=n.pendingLanes,e.lanes=l,E(n,l)}}function Ln(n,e){var l=n.updateQueue,r=n.alternate
if(null!==r&&l===(r=r.updateQueue)){var t=null,u=null
if(null!==(l=l.firstBaseUpdate)){do{var o={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null}
null===u?t=u=o:u=u.next=o,l=l.next}while(null!==l)
null===u?t=u=e:u=u.next=e}else t=u=e
return l={baseState:r.baseState,firstBaseUpdate:t,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},n.updateQueue=l,void 0}null===(n=l.lastBaseUpdate)?l.firstBaseUpdate=e:n.next=e,l.lastBaseUpdate=e}function Dn(){if(Va&&null!==za)throw za}function Nn(n,e,l,r){Va=!1
var t=n.updateQueue
$a=!1
var u=t.firstBaseUpdate,o=t.lastBaseUpdate,i=t.shared.pending
if(null!==i){t.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var f=n.alternate
null!==f&&(i=(f=f.updateQueue).lastBaseUpdate)!==o&&(null===i?f.firstBaseUpdate=c:i.next=c,f.lastBaseUpdate=a)}if(null!==u){var s=t.baseState
for(o=0,f=c=a=null,i=u;;){var v=-536870913&i.lane,d=v!==i.lane
if(d?(Hc&v)===v:(r&v)===v){0!==v&&v===Ia&&(Va=!0),null!==f&&(f=f.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null})
n:{var p=n,h=i
v=e
var y=l
switch(h.tag){case 1:if("function"==typeof(p=h.payload)){s=p.call(y,s,v)
break n}s=p
break n
case 3:p.flags=-65537&p.flags|128
case 0:if(null==(v="function"==typeof(p=h.payload)?p.call(y,s,v):p))break n
s=nu({},s,v)
break n
case 2:$a=!0}}null!==(v=i.callback)&&(n.flags|=64,d&&(n.flags|=8192),null===(d=t.callbacks)?t.callbacks=[v]:d.push(v))}else d={lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===f?(c=f=d,a=s):f=f.next=d,o|=v
if(null===(i=i.next)){if(null===(i=t.shared.pending))break
i=(d=i).next,d.next=null,t.lastBaseUpdate=d,t.shared.pending=null}1}null===f&&(a=s),t.baseState=a,t.firstBaseUpdate=c,t.lastBaseUpdate=f,null===u&&(t.shared.lanes=0),Yc|=o,n.lanes=o,n.memoizedState=s}}function Bn(n,e){if("function"!=typeof n)throw Error(r(191,n))
n.call(e)}function Hn(n,e){var l=n.callbacks
if(null!==l)for(n.callbacks=null,n=0;n<l.length;n++)Bn(l[n],e)}function qn(n,e){d(Ga,n=Gc),d(Wa,e),Gc=n|e.baseLanes}function Un(){d(Ga,Gc),d(Wa,Wa.current)}function $n(){Gc=Ga.current,v(Wa),v(Ga)}function Vn(){throw Error(r(321))}function Wn(n,e){if(null===e)return!1
for(var l=0;l<e.length&&l<n.length;l++)if(!ha(n[l],e[l]))return!1
return!0}function Gn(n,e,l,r,t,u){return Qa=u,Ya=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ku.H=null===n||null===n.memoizedState?oc:ic,nc=!1,u=l(r,t),nc=!1,Za&&(u=Yn(e,l,r,t)),Qn(n),u}function Qn(n){ku.H=uc
var e=null!==Ka&&null!==Ka.next
if(Qa=0,Xa=Ka=Ya=null,Ja=!1,lc=0,rc=null,e)throw Error(r(300))
null===n||mc||null!==(n=n.dependencies)&&nn(n)&&(mc=!0)}function Yn(n,e,l,t){Ya=n
var u=0
do{if(Za&&(rc=null),lc=0,Za=!1,25<=u)throw Error(r(301))
if(u+=1,Xa=Ka=null,null!=n.updateQueue){var o=n.updateQueue
o.lastEffect=null,o.events=null,o.stores=null,null!=o.memoCache&&(o.memoCache.index=0)}ku.H=ac,o=e(l,t)}while(Za)
return o}function Kn(){var n=ku.H,e=n.useState()[0]
return e="function"==typeof e.then?le(e):e,n=n.useState()[0],(null!==Ka?Ka.memoizedState:null)!==n&&(Ya.flags|=1024),e}function Xn(){var n=0!==ec
return ec=0,n}function Jn(n,e,l){e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l}function Zn(n){if(Ja){for(n=n.memoizedState;null!==n;){var e=n.queue
null!==e&&(e.pending=null),n=n.next}Ja=!1}Qa=0,Xa=Ka=Ya=null,Za=!1,lc=ec=0,rc=null}function ne(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===Xa?Ya.memoizedState=Xa=n:Xa=Xa.next=n,Xa}function ee(){if(null===Ka){var n=Ya.alternate
n=null!==n?n.memoizedState:null}else n=Ka.next
var e=null===Xa?Ya.memoizedState:Xa.next
if(null!==e)Xa=e,Ka=n
else{if(null===n){if(null===Ya.alternate)throw Error(r(467))
throw Error(r(310))}n={memoizedState:(Ka=n).memoizedState,baseState:Ka.baseState,baseQueue:Ka.baseQueue,queue:Ka.queue,next:null},null===Xa?Ya.memoizedState=Xa=n:Xa=Xa.next=n}return Xa}function le(n){var e=lc
return lc+=1,null===rc&&(rc=[]),n=En(rc,n,e),e=Ya,null===(null===Xa?e.memoizedState:Xa.next)&&(e=e.alternate,ku.H=null===e||null===e.memoizedState?oc:ic),n}function re(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return le(n)
if(n.$$typeof===cu)return ln(n)}throw Error(r(438,String(n)))}function te(n){var e=null,l=Ya.updateQueue
if(null!==l&&(e=l.memoCache),null==e){var r=Ya.alternate
null!==r&&null!==(r=r.updateQueue)&&null!=(r=r.memoCache)&&(e={data:r.data.map(function(n){return n.slice()}),index:0})}if(null==e&&(e={data:[],index:0}),null===l&&(l={lastEffect:null,events:null,stores:null,memoCache:null},Ya.updateQueue=l),l.memoCache=e,void 0===(l=e.data[e.index]))for(l=e.data[e.index]=Array(n),r=0;r<n;r++)l[r]=yu
return e.index++,l}function ue(n,e){return"function"==typeof e?e(n):e}function oe(n){return ie(ee(),Ka,n)}function ie(n,e,l){var t=n.queue
if(null===t)throw Error(r(311))
t.lastRenderedReducer=l
var u=n.baseQueue,o=t.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}e.baseQueue=u=o,t.pending=null}if(o=n.baseState,null===u)n.memoizedState=o
else{var a=i=null,c=null,f=e=u.next,s=!1
do{var v=-536870913&f.lane
if(v!==f.lane?(Hc&v)===v:(Qa&v)===v){var d=f.revertLane
if(0===d)null!==c&&(c=c.next={lane:0,revertLane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),v===Ia&&(s=!0)
else{if((Qa&d)===d){f=f.next,d===Ia&&(s=!0)
continue}v={lane:0,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=v,i=o):c=c.next=v,Ya.lanes|=d,Yc|=d}v=f.action,nc&&l(o,v),o=f.hasEagerState?f.eagerState:l(o,v)}else d={lane:v,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=d,i=o):c=c.next=d,Ya.lanes|=v,Yc|=v
f=f.next}while(null!==f&&f!==e)
if(null===c?i=o:c.next=a,!ha(o,n.memoizedState)&&(mc=!0,s&&null!==(l=za)))throw l
n.memoizedState=o,n.baseState=i,n.baseQueue=c,t.lastRenderedState=o}return null===u&&(t.lanes=0),[n.memoizedState,t.dispatch]}function ae(n){var e=ee(),l=e.queue
if(null===l)throw Error(r(311))
l.lastRenderedReducer=n
var t=l.dispatch,u=l.pending,o=e.memoizedState
if(null!==u){l.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
ha(o,e.memoizedState)||(mc=!0),e.memoizedState=o,null===e.baseQueue&&(e.baseState=o),l.lastRenderedState=o}return[o,t]}function ce(n,e,l){var t=Ya,u=ee(),o=sa
if(o){if(void 0===l)throw Error(r(407))
l=l()}else l=e()
var i=!ha((Ka||u).memoizedState,l)
if(i&&(u.memoizedState=l,mc=!0),u=u.queue,ze(2048,8,ve.bind(null,t,u,n),[n]),u.getSnapshot!==e||i||null!==Xa&&1&Xa.memoizedState.tag){if(t.flags|=2048,Re(9,{destroy:void 0,resource:void 0},se.bind(null,t,u,l,e),null),null===Nc)throw Error(r(349))
o||124&Qa||fe(t,e,l)}return l}function fe(n,e,l){n.flags|=16384,n={getSnapshot:e,value:l},null===(e=Ya.updateQueue)?(e={lastEffect:null,events:null,stores:null,memoCache:null},Ya.updateQueue=e,e.stores=[n]):null===(l=e.stores)?e.stores=[n]:l.push(n)}function se(n,e,l,r){e.value=l,e.getSnapshot=r,de(e)&&pe(n)}function ve(n,e,l){return l(function(){de(e)&&pe(n)})}function de(n){var e=n.getSnapshot
n=n.value
try{var l=e()
return!ha(n,l)}catch(r){return!0}}function pe(n){var e=Rn(n,2)
null!==e&&Zr(e,0,2)}function he(n){var e=ne()
if("function"==typeof n){var l=n
if(n=l(),nc){M(!0)
try{l()}finally{M(!1)}}}return e.memoizedState=e.baseState=n,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ue,lastRenderedState:n},e}function ye(n,e,l,r){return n.baseState=l,ie(n,Ka,"function"==typeof r?r:ue)}function be(n,e,l,t,u){if(el(n))throw Error(r(485))
if(null!==(n=e.action)){var o={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){o.listeners.push(n)}}
null!==ku.T?l(!0):o.isTransition=!1,t(o),null===(l=e.pending)?(o.next=e.pending=o,we(e,o)):(o.next=l.next,e.pending=l.next=o)}}function we(n,e){var l=e.action,r=e.payload,t=n.state
if(e.isTransition){var u=ku.T,o={}
ku.T=o
try{var i=l(t,r),a=ku.S
null!==a&&a(o,i),me(n,e,i)}catch(c){ge(n,e,c)}finally{ku.T=u}}else try{me(n,e,u=l(t,r))}catch(f){ge(n,e,f)}}function me(n,e,l){null!==l&&"object"==typeof l&&"function"==typeof l.then?l.then(function(l){ke(n,e,l)},function(l){return ge(n,e,l)}):ke(n,e,l)}function ke(n,e,l){e.status="fulfilled",e.value=l,xe(e),n.state=l,null!==(e=n.pending)&&((l=e.next)===e?n.pending=null:(l=l.next,e.next=l,we(n,l)))}function ge(n,e,l){var r=n.pending
if(n.pending=null,null!==r){r=r.next
do{e.status="rejected",e.reason=l,xe(e),e=e.next}while(e!==r)}n.action=null}function xe(n){n=n.listeners
for(var e=0;e<n.length;e++)(0,n[e])()}function Ee(n,e){return e}function Se(n,e){if(sa){var l=Nc.formState
if(null!==l){n:{var r=Ya
if(sa){if(fa){var t=No(fa,da)
if(t){fa=Ho(t),r=Bo(t)
break n}}B(r)}r=!1}r&&(e=l[0])}}(l=ne()).memoizedState=l.baseState=e,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ee,lastRenderedState:e},l.queue=r,l=Je.bind(null,Ya,r),r.dispatch=l,r=he(!1)
var u=nl.bind(null,Ya,!1,r.queue)
return t={state:e,dispatch:null,action:n,pending:null},(r=ne()).queue=t,l=be.bind(null,Ya,t,u,l),t.dispatch=l,r.memoizedState=n,[e,l,!1]}function Ce(n){return Me(ee(),Ka,n)}function Me(n,e,l){if(e=ie(n,e,Ee)[0],n=oe(ue)[0],"object"==typeof e&&null!==e&&"function"==typeof e.then)try{var r=le(e)}catch(o){if(o===_a)throw Da
throw o}else r=e
var t=(e=ee()).queue,u=t.dispatch
return l!==e.memoizedState&&(Ya.flags|=2048,Re(9,{destroy:void 0,resource:void 0},je.bind(null,t,l),null)),[r,u,n]}function je(n,e){n.action=e}function Pe(n){var e=ee(),l=Ka
if(null!==l)return Me(e,l,n)
ee(),e=e.memoizedState
var r=(l=ee()).queue.dispatch
return l.memoizedState=n,[e,r,!1]}function Re(n,e,l,r){return n={tag:n,create:l,deps:r,inst:e,next:null},null===(e=Ya.updateQueue)&&(e={lastEffect:null,events:null,stores:null,memoCache:null},Ya.updateQueue=e),null===(l=e.lastEffect)?e.lastEffect=n.next=n:(r=l.next,l.next=n,n.next=r,e.lastEffect=n),n}function Te(){return ee().memoizedState}function Ie(n,e,l,r){var t=ne()
r=void 0===r?null:r,Ya.flags|=n,t.memoizedState=Re(1|e,{destroy:void 0,resource:void 0},l,r)}function ze(n,e,l,r){var t=ee()
r=void 0===r?null:r
var u=t.memoizedState.inst
null!==Ka&&null!==r&&Wn(r,Ka.memoizedState.deps)?t.memoizedState=Re(e,u,l,r):(Ya.flags|=n,t.memoizedState=Re(1|e,u,l,r))}function Oe(n,e){Ie(8390656,8,n,e)}function Ae(n,e){ze(2048,8,n,e)}function Fe(n,e){return ze(4,2,n,e)}function _e(n,e){return ze(4,4,n,e)}function Le(n,e){if("function"==typeof e){n=n()
var l=e(n)
return function(){"function"==typeof l?l():e(null)}}if(null!=e)return n=n(),e.current=n,function(){e.current=null}}function De(n,e,l){l=null!=l?l.concat([n]):null,ze(4,4,Le.bind(null,e,n),l)}function Be(){}function He(n,e){var l=ee()
e=void 0===e?null:e
var r=l.memoizedState
return null!==e&&Wn(e,r[1])?r[0]:(l.memoizedState=[n,e],n)}function qe(n,e){var l=ee()
e=void 0===e?null:e
var r=l.memoizedState
if(null!==e&&Wn(e,r[1]))return r[0]
if(r=n(),nc){M(!0)
try{n()}finally{M(!1)}}return l.memoizedState=[r,e],r}function Ue(n,e,l){return void 0===l||1073741824&Qa?n.memoizedState=e:(n.memoizedState=l,n=Jr(),Ya.lanes|=n,Yc|=n,l)}function $e(n,e,l,r){return ha(l,e)?l:null!==Wa.current?(n=Ue(n,l,r),ha(n,e)||(mc=!0),n):42&Qa?(n=Jr(),Ya.lanes|=n,Yc|=n,e):(mc=!0,n.memoizedState=l)}function Ve(n,e,l,r,t){var u=$u()
Uu(0!==u&&8>u?u:8)
var o=ku.T,i={}
ku.T=i,nl(n,!1,e,l)
try{var a=t(),c=ku.S
null!==c&&c(i,a),null!==a&&"object"==typeof a&&"function"==typeof a.then?Ze(n,e,function(n,e){var l=[],r={status:"pending",value:null,reason:null,then:function(n){l.push(n)}}
return n.then(function(){r.status="fulfilled",r.value=e
for(var n=0;n<l.length;n++)(0,l[n])(e)},function(n){for(r.status="rejected",r.reason=n,n=0;n<l.length;n++)(0,l[n])(void 0)}),r}(a,r),Xr()):Ze(n,e,r,Xr())}catch(f){Ze(n,e,{then:function(){},status:"rejected",reason:f},Xr())}finally{Uu(u),ku.T=o}}function We(n){var e=n.memoizedState
if(null!==e)return e
var l={}
return(e={memoizedState:Zu,baseState:Zu,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ue,lastRenderedState:Zu},next:null}).next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ue,lastRenderedState:l},next:null},n.memoizedState=e,null!==(n=n.alternate)&&(n.memoizedState=e),e}function Ge(){return ln(no)}function Qe(){return ee().memoizedState}function Ye(){return ee().memoizedState}function Ke(n){for(var e=n.return;null!==e;){switch(e.tag){case 24:case 3:var l=Xr(),r=Fn(e,n=An(l),l)
return null!==r&&(Zr(r,0,l),_n(r,e,l)),e={cache:un()},n.payload=e,void 0}e=e.return}}function Xe(n,e,l){var r=Xr()
l={lane:r,revertLane:0,action:l,hasEagerState:!1,eagerState:null,next:null},el(n)?ll(e,l):null!==(l=Pn(n,e,l,r))&&(Zr(l,0,r),rl(l,e,r))}function Je(n,e,l){Ze(n,e,l,Xr())}function Ze(n,e,l,r){var t={lane:r,revertLane:0,action:l,hasEagerState:!1,eagerState:null,next:null}
if(el(n))ll(e,t)
else{var u=n.alternate
if(0===n.lanes&&(null===u||0===u.lanes)&&null!==(u=e.lastRenderedReducer))try{var o=e.lastRenderedState,i=u(o,l)
if(t.hasEagerState=!0,t.eagerState=i,ha(i,o))return jn(n,e,t,0),null===Nc&&Mn(),!1}catch(a){}if(null!==(l=Pn(n,e,t,r)))return Zr(l,0,r),rl(l,e,r),!0}return!1}function nl(n,e,l,t){if(t={lane:2,revertLane:hn(),action:t,hasEagerState:!1,eagerState:null,next:null},el(n)){if(e)throw Error(r(479))}else null!==(e=Pn(n,l,t,2))&&Zr(e,0,2)}function el(n){var e=n.alternate
return n===Ya||null!==e&&e===Ya}function ll(n,e){Za=Ja=!0
var l=n.pending
null===l?e.next=e:(e.next=l.next,l.next=e),n.pending=e}function rl(n,e,l){if(4194048&l){var r=e.lanes
l|=r&=n.pendingLanes,e.lanes=l,E(n,l)}}function tl(n){var e=fc
return fc+=1,null===cc&&(cc=[]),En(cc,n,e)}function ul(n,e){e=e.props.ref,n.ref=void 0!==e?e:null}function ol(n,e){if(e.$$typeof===eu)throw Error(r(525))
throw n=Object.prototype.toString.call(e),Error(r(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function il(n){return(0,n.u)(n.t)}function al(n){function l(e,l){if(n){var r=e.deletions
null===r?(e.deletions=[l],e.flags|=16):r.push(l)}}function t(e,r){if(!n)return null
for(;null!==r;)l(e,r),r=r.sibling
return null}function u(n){for(var e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function o(n,e){return(n=_t(n,e)).index=0,n.sibling=null,n}function i(e,l,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<l?(e.flags|=67108866,l):r:(e.flags|=67108866,l):(e.flags|=1048576,l)}function a(e){return n&&null===e.alternate&&(e.flags|=67108866),e}function f(n,e,l,r){return null===e||6!==e.tag?((e=Bt(l,n.mode,r)).return=n,e):((e=o(e,l)).return=n,e)}function s(n,e,l,r){var t=l.type
return t===tu?d(n,e,l.props.children,r,l.key):null!==e&&(e.elementType===t||"object"==typeof t&&null!==t&&t.$$typeof===pu&&il(t)===e.type)?(ul(e=o(e,l.props),l),e.return=n,e):(ul(e=Dt(l.type,l.key,l.props,null,n.mode,r),l),e.return=n,e)}function v(n,e,l,r){return null===e||4!==e.tag||e.stateNode.containerInfo!==l.containerInfo||e.stateNode.implementation!==l.implementation?((e=Ht(l,n.mode,r)).return=n,e):((e=o(e,l.children||[])).return=n,e)}function d(n,e,l,r,t){return null===e||7!==e.tag?((e=Nt(l,n.mode,r,t)).return=n,e):((e=o(e,l)).return=n,e)}function p(n,e,l){if("string"==typeof e&&""!==e||"number"==typeof e||"bigint"==typeof e)return(e=Bt(""+e,n.mode,l)).return=n,e
if("object"==typeof e&&null!==e){switch(e.$$typeof){case lu:return ul(l=Dt(e.type,e.key,e.props,null,n.mode,l),e),l.return=n,l
case ru:return(e=Ht(e,n.mode,l)).return=n,e
case pu:return p(n,e=(0,e.u)(e.t),l)}if(mu(e)||c(e))return(e=Nt(e,n.mode,l,null)).return=n,e
if("function"==typeof e.then)return p(n,tl(e),l)
if(e.$$typeof===cu)return p(n,rn(n,e),l)
ol(n,e)}return null}function h(n,e,l,r){var t=null!==e?e.key:null
if("string"==typeof l&&""!==l||"number"==typeof l||"bigint"==typeof l)return null!==t?null:f(n,e,""+l,r)
if("object"==typeof l&&null!==l){switch(l.$$typeof){case lu:return l.key===t?s(n,e,l,r):null
case ru:return l.key===t?v(n,e,l,r):null
case pu:return h(n,e,l=(t=l.u)(l.t),r)}if(mu(l)||c(l))return null!==t?null:d(n,e,l,r,null)
if("function"==typeof l.then)return h(n,e,tl(l),r)
if(l.$$typeof===cu)return h(n,e,rn(n,l),r)
ol(n,l)}return null}function y(n,e,l,r,t){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return f(e,n=n.get(l)||null,""+r,t)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case lu:return s(e,n=n.get(null===r.key?l:r.key)||null,r,t)
case ru:return v(e,n=n.get(null===r.key?l:r.key)||null,r,t)
case pu:return y(n,e,l,r=(0,r.u)(r.t),t)}if(mu(r)||c(r))return d(e,n=n.get(l)||null,r,t,null)
if("function"==typeof r.then)return y(n,e,l,tl(r),t)
if(r.$$typeof===cu)return y(n,e,l,rn(e,r),t)
ol(e,r)}return null}function b(e,f,s,v){if("object"==typeof s&&null!==s&&s.type===tu&&null===s.key&&(s=s.props.children),"object"==typeof s&&null!==s){switch(s.$$typeof){case lu:n:{for(var d=s.key;null!==f;){if(f.key===d){if((d=s.type)===tu){if(7===f.tag){t(e,f.sibling),(v=o(f,s.props.children)).return=e,e=v
break n}}else if(f.elementType===d||"object"==typeof d&&null!==d&&d.$$typeof===pu&&il(d)===f.type){t(e,f.sibling),ul(v=o(f,s.props),s),v.return=e,e=v
break n}t(e,f)
break}l(e,f),f=f.sibling}s.type===tu?((v=Nt(s.props.children,e.mode,v,s.key)).return=e,e=v):(ul(v=Dt(s.type,s.key,s.props,null,e.mode,v),s),v.return=e,e=v)}return a(e)
case ru:n:{for(d=s.key;null!==f;){if(f.key===d){if(4===f.tag&&f.stateNode.containerInfo===s.containerInfo&&f.stateNode.implementation===s.implementation){t(e,f.sibling),(v=o(f,s.children||[])).return=e,e=v
break n}t(e,f)
break}l(e,f),f=f.sibling}(v=Ht(s,e.mode,v)).return=e,e=v}return a(e)
case pu:return b(e,f,s=(d=s.u)(s.t),v)}if(mu(s))return function(e,r,o,a){for(var c=null,f=null,s=r,v=r=0,d=null;null!==s&&v<o.length;v++){s.index>v?(d=s,s=null):d=s.sibling
var b=h(e,s,o[v],a)
if(null===b){null===s&&(s=d)
break}n&&s&&null===b.alternate&&l(e,s),r=i(b,r,v),null===f?c=b:f.sibling=b,f=b,s=d}if(v===o.length)return t(e,s),sa&&z(e,v),c
if(null===s){for(;v<o.length;v++)null!==(s=p(e,o[v],a))&&(r=i(s,r,v),null===f?c=s:f.sibling=s,f=s)
return sa&&z(e,v),c}for(s=u(s);v<o.length;v++)null!==(d=y(s,e,v,o[v],a))&&(n&&null!==d.alternate&&s.delete(null===d.key?v:d.key),r=i(d,r,v),null===f?c=d:f.sibling=d,f=d)
return n&&s.forEach(function(n){return l(e,n)}),sa&&z(e,v),c}(e,f,s,v)
if(c(s)){if("function"!=typeof(d=c(s)))throw Error(r(150))
return function(e,o,a,c){if(null==a)throw Error(r(151))
for(var f=null,s=null,v=o,d=o=0,b=null,w=a.next();null!==v&&!w.done;d++,w=a.next()){v.index>d?(b=v,v=null):b=v.sibling
var m=h(e,v,w.value,c)
if(null===m){null===v&&(v=b)
break}n&&v&&null===m.alternate&&l(e,v),o=i(m,o,d),null===s?f=m:s.sibling=m,s=m,v=b}if(w.done)return t(e,v),sa&&z(e,d),f
if(null===v){for(;!w.done;d++,w=a.next())null!==(w=p(e,w.value,c))&&(o=i(w,o,d),null===s?f=w:s.sibling=w,s=w)
return sa&&z(e,d),f}for(v=u(v);!w.done;d++,w=a.next())null!==(w=y(v,e,d,w.value,c))&&(n&&null!==w.alternate&&v.delete(null===w.key?d:w.key),o=i(w,o,d),null===s?f=w:s.sibling=w,s=w)
return n&&v.forEach(function(n){return l(e,n)}),sa&&z(e,d),f}(e,f,s=d.call(s),v)}if("function"==typeof s.then)return b(e,f,tl(s),v)
if(s.$$typeof===cu)return b(e,f,rn(e,s),v)
ol(e,s)}return"string"==typeof s&&""!==s||"number"==typeof s||"bigint"==typeof s?(s=""+s,null!==f&&6===f.tag?(t(e,f.sibling),(v=o(f,s)).return=e,e=v):(t(e,f),(v=Bt(s,e.mode,v)).return=e,e=v),a(e)):t(e,f)}return function(n,l,r,t){try{fc=0
var u=b(n,l,r,t)
return cc=null,u}catch(i){if(i===_a||i===Da)throw i
var o=e(29,i,null,n.mode)
return o.lanes=t,o.return=n,o}}}function cl(n){var e=n.alternate
d(hc,1&hc.current),d(dc,n),null===pc&&(null===e||null!==Wa.current||null!==e.memoizedState)&&(pc=n)}function fl(n){if(22===n.tag){if(d(hc,hc.current),d(dc,n),null===pc){var e=n.alternate
null!==e&&null!==e.memoizedState&&(pc=n)}}else sl()}function sl(){d(hc,hc.current),d(dc,dc.current)}function vl(n){v(dc),pc===n&&(pc=null),v(hc)}function dl(n){for(var e=n;null!==e;){if(13===e.tag){var l=e.memoizedState
if(null!==l&&(null===(l=l.dehydrated)||Fo(l)||_o(l)))return e}else if(19===e.tag&&void 0!==e.memoizedProps.revealOrder){if(128&e.flags)return e}else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return null
e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function pl(n,e,l,r){l=null==(l=l(r,e=n.memoizedState))?e:nu({},e,l),n.memoizedState=l,0===n.lanes&&(n.updateQueue.baseState=l)}function hl(n,e,l,r,t,u,o){return"function"==typeof(n=n.stateNode).shouldComponentUpdate?n.shouldComponentUpdate(r,u,o):!(e.prototype&&e.prototype.isPureReactComponent&&kn(l,r)&&kn(t,u))}function yl(n,e,l,r){n=e.state,"function"==typeof e.componentWillReceiveProps&&e.componentWillReceiveProps(l,r),"function"==typeof e.UNSAFE_componentWillReceiveProps&&e.UNSAFE_componentWillReceiveProps(l,r),e.state!==n&&yc.enqueueReplaceState(e,e.state,null)}function bl(n,e){var l=e
if("ref"in e)for(var r in l={},e)"ref"!==r&&(l[r]=e[r])
if(n=n.defaultProps)for(var t in l===e&&(l=nu({},l)),n)void 0===l[t]&&(l[t]=n[t])
return l}function wl(n,e){try{(0,n.onUncaughtError)(e.value,{componentStack:e.stack})}catch(Ne){setTimeout(function(){throw Ne})}}function ml(n,e,l){try{(0,n.onCaughtError)(l.value,{componentStack:l.stack,errorBoundary:1===e.tag?e.stateNode:null})}catch(Ne){setTimeout(function(){throw Ne})}}function kl(n,e,l){return(l=An(l)).tag=3,l.payload={element:null},l.callback=function(){wl(n,e)},l}function gl(n){return(n=An(n)).tag=3,n}function xl(n,e,l,r){var t=l.type.getDerivedStateFromError
if("function"==typeof t){var u=r.value
n.payload=function(){return t(u)},n.callback=function(){ml(e,l,r)}}var o=l.stateNode
null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){ml(e,l,r),"function"!=typeof t&&(null===of?of=new Set([this]):of.add(this))
var n=r.stack
this.componentDidCatch(r.value,{componentStack:null!==n?n:""})})}function El(n,e,l,r){e.child=null===n?vc(e,null,l,r):sc(e,n.child,l,r)}function Sl(n,e,l,r,t){l=l.render
var u=e.ref
if("ref"in r){var o={}
for(var i in r)"ref"!==i&&(o[i]=r[i])}else o=r
return en(e),r=Gn(n,e,l,o,u,t),i=Xn(),null===n||mc?(sa&&i&&A(e),e.flags|=1,El(n,e,r,t),e.child):(Jn(n,e,t),Ul(n,e,t))}function Cl(n,e,l,r,t){if(null===n){var u=l.type
return"function"!=typeof u||Ft(u)||void 0!==u.defaultProps||null!==l.compare?((n=Dt(l.type,null,r,e,e.mode,t)).ref=e.ref,n.return=e,e.child=n):(e.tag=15,e.type=u,Ml(n,e,u,r,t))}if(u=n.child,!$l(n,t)){var o=u.memoizedProps
if((l=null!==(l=l.compare)?l:kn)(o,r)&&n.ref===e.ref)return Ul(n,e,t)}return e.flags|=1,(n=_t(u,r)).ref=e.ref,n.return=e,e.child=n}function Ml(n,e,l,r,t){if(null!==n){var u=n.memoizedProps
if(kn(u,r)&&n.ref===e.ref){if(mc=!1,e.pendingProps=r=u,!$l(n,t))return e.lanes=n.lanes,Ul(n,e,t)
131072&n.flags&&(mc=!0)}}return Tl(n,e,l,r,t)}function jl(n,e,l){var r=e.pendingProps,t=r.children,u=null!==n?n.memoizedState:null
if("hidden"===r.mode){if(128&e.flags){if(r=null!==u?u.baseLanes|l:l,null!==n){for(t=e.child=n.child,u=0;null!==t;)u=u|t.lanes|t.childLanes,t=t.sibling
e.childLanes=u&~r}else e.childLanes=0,e.child=null
return Pl(n,e,r,l)}if(!(536870912&l))return e.lanes=e.childLanes=536870912,Pl(n,e,null!==u?u.baseLanes|l:l,l)
e.memoizedState={baseLanes:0,cachePool:null},null!==n&&wn(0,null!==u?u.cachePool:null),null!==u?qn(e,u):Un(),fl(e)}else null!==u?(wn(0,u.cachePool),qn(e,u),sl(),e.memoizedState=null):(null!==n&&wn(0,null),Un(),sl())
return El(n,e,t,l),e.child}function Pl(n,e,l,r){var t=bn()
return t=null===t?null:{parent:Lu?xa.o:xa.i,pool:t},e.memoizedState={baseLanes:l,cachePool:t},null!==n&&wn(0,null),Un(),fl(e),null!==n&&Z(n,e,r,!0),null}function Rl(n,e){var l=e.ref
if(null===l)null!==n&&null!==n.ref&&(e.flags|=4194816)
else{if("function"!=typeof l&&"object"!=typeof l)throw Error(r(284))
null!==n&&n.ref===l||(e.flags|=4194816)}}function Tl(n,e,l,r,t){return en(e),l=Gn(n,e,l,r,void 0,t),r=Xn(),null===n||mc?(sa&&r&&A(e),e.flags|=1,El(n,e,l,t),e.child):(Jn(n,e,t),Ul(n,e,t))}function Il(n,e,l,r,t,u){return en(e),e.updateQueue=null,l=Yn(e,r,l,t),Qn(n),r=Xn(),null===n||mc?(sa&&r&&A(e),e.flags|=1,El(n,e,l,u),e.child):(Jn(n,e,u),Ul(n,e,u))}function zl(n,e,l,r,t){if(en(e),null===e.stateNode){var u=Ri,o=l.contextType
"object"==typeof o&&null!==o&&(u=ln(o)),u=new l(r,u),e.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=yc,e.stateNode=u,u.p=e,(u=e.stateNode).props=r,u.state=e.memoizedState,u.refs={},zn(e),o=l.contextType,u.context="object"==typeof o&&null!==o?ln(o):Ri,u.state=e.memoizedState,"function"==typeof(o=l.getDerivedStateFromProps)&&(pl(e,l,o,r),u.state=e.memoizedState),"function"==typeof l.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(o=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),o!==u.state&&yc.enqueueReplaceState(u,u.state,null),Nn(e,r,u,t),Dn(),u.state=e.memoizedState),"function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!0}else if(null===n){u=e.stateNode
var i=e.memoizedProps,a=bl(l,i)
u.props=a
var c=u.context,f=l.contextType
o=Ri,"object"==typeof f&&null!==f&&(o=ln(f))
var s=l.getDerivedStateFromProps
f="function"==typeof s||"function"==typeof u.getSnapshotBeforeUpdate,i=e.pendingProps!==i,f||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(i||c!==o)&&yl(e,u,r,o),$a=!1
var v=e.memoizedState
u.state=v,Nn(e,r,u,t),Dn(),c=e.memoizedState,i||v!==c||$a?("function"==typeof s&&(pl(e,l,s,r),c=e.memoizedState),(a=$a||hl(e,l,a,r,v,c,o))?(f||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(e.flags|=4194308)):("function"==typeof u.componentDidMount&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),u.props=r,u.state=c,u.context=o,r=a):("function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!1)}else{u=e.stateNode,On(n,e),f=bl(l,o=e.memoizedProps),u.props=f,s=e.pendingProps,v=u.context,c=l.contextType,a=Ri,"object"==typeof c&&null!==c&&(a=ln(c)),(c="function"==typeof(i=l.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o!==s||v!==a)&&yl(e,u,r,a),$a=!1,v=e.memoizedState,u.state=v,Nn(e,r,u,t),Dn()
var d=e.memoizedState
o!==s||v!==d||$a||null!==n&&null!==n.dependencies&&nn(n.dependencies)?("function"==typeof i&&(pl(e,l,i,r),d=e.memoizedState),(f=$a||hl(e,l,f,r,v,d,a)||null!==n&&null!==n.dependencies&&nn(n.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(r,d,a),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(r,d,a)),"function"==typeof u.componentDidUpdate&&(e.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(e.flags|=1024)):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=d),u.props=r,u.state=d,u.context=a,r=f):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),r=!1)}return u=r,Rl(n,e),r=!!(128&e.flags),u||r?(u=e.stateNode,l=r&&"function"!=typeof l.getDerivedStateFromError?null:u.render(),e.flags|=1,null!==n&&r?(e.child=sc(e,n.child,null,t),e.child=sc(e,null,l,t)):El(n,e,l,t),e.memoizedState=u.state,n=e.child):n=Ul(n,e,t),n}function Ol(n,e,l,r){return $(),e.flags|=256,El(n,e,l,r),e.child}function Al(n){return{baseLanes:n,cachePool:mn()}}function Fl(n,e,l){return n=null!==n?n.childLanes&~l:0,e&&(n|=Jc),n}function _l(n,l,t){var u,o=l.pendingProps,i=!1,a=!!(128&l.flags)
if((u=a)||(u=(null===n||null!==n.memoizedState)&&!!(2&hc.current)),u&&(i=!0,l.flags&=-129),u=!!(32&l.flags),l.flags&=-33,null===n){if(sa){if(i?cl(l):sl(),sa){var c,f=fa;(c=f)&&(null!==(f=Yo(f,da))?(l.memoizedState={dehydrated:f,treeContext:null!==la?{id:ra,overflow:ta}:null,retryLane:536870912,hydrationErrors:null},(c=e(18,null,null,0)).stateNode=f,c.return=l,l.child=c,ca=l,fa=null,c=!0):c=!1),c||B(l)}if(null!==(f=l.memoizedState)&&null!==(f=f.dehydrated))return _o(f)?l.lanes=32:l.lanes=536870912,null
vl(l)}return f=o.children,o=o.fallback,i?(sl(),f=Dl({mode:"hidden",children:f},i=l.mode),o=Nt(o,i,t,null),f.return=l,o.return=l,f.sibling=o,l.child=f,(i=l.child).memoizedState=Al(t),i.childLanes=Fl(n,u,t),l.memoizedState=kc,o):(cl(l),Ll(l,f))}if(null!==(c=n.memoizedState)&&null!==(f=c.dehydrated)){if(a)256&l.flags?(cl(l),l.flags&=-257,l=Nl(n,l,t)):null!==l.memoizedState?(sl(),l.child=n.child,l.flags|=128,l=null):(sl(),i=o.fallback,f=l.mode,o=Dl({mode:"visible",children:o.children},f),(i=Nt(i,f,t,null)).flags|=2,o.return=l,i.return=l,o.sibling=i,l.child=o,sc(l,n.child,null,t),(o=l.child).memoizedState=Al(t),o.childLanes=Fl(n,u,t),l.memoizedState=kc,l=i)
else if(cl(l),_o(f))u=Lo(f).digest,(o=Error(r(419))).stack="",o.digest=u,Q({value:o,source:null,stack:null}),l=Nl(n,l,t)
else if(mc||Z(n,l,t,!1),u=0!==(t&n.childLanes),mc||u){if(null!==(u=Nc)&&0!==(o=0!==((o=42&(o=t&-t)?1:S(o))&(u.suspendedLanes|t))?0:o)&&o!==c.retryLane)throw c.retryLane=o,Rn(n,o),Zr(u,0,o),wc
Fo(f)||st(),l=Nl(n,l,t)}else Fo(f)?(l.flags|=192,l.child=n.child,l=null):(n=c.treeContext,Bu&&(fa=Vo(f),ca=l,sa=!0,va=null,da=!1,null!==n&&(na[ea++]=ra,na[ea++]=ta,na[ea++]=la,ra=n.id,ta=n.overflow,la=l)),(l=Ll(l,o.children)).flags|=4096)
return l}return i?(sl(),i=o.fallback,f=l.mode,a=(c=n.child).sibling,(o=_t(c,{mode:"hidden",children:o.children})).subtreeFlags=65011712&c.subtreeFlags,null!==a?i=_t(a,i):(i=Nt(i,f,t,null)).flags|=2,i.return=l,o.return=l,o.sibling=i,l.child=o,o=i,i=l.child,null===(f=n.child.memoizedState)?f=Al(t):(null!==(c=f.cachePool)?(a=Lu?xa.o:xa.i,c=c.parent!==a?{parent:a,pool:a}:c):c=mn(),f={baseLanes:f.baseLanes|t,cachePool:c}),i.memoizedState=f,i.childLanes=Fl(n,u,t),l.memoizedState=kc,o):(cl(l),n=(t=n.child).sibling,(t=_t(t,{mode:"visible",children:o.children})).return=l,t.sibling=null,null!==n&&(null===(u=l.deletions)?(l.deletions=[n],l.flags|=16):u.push(n)),l.child=t,l.memoizedState=null,t)}function Ll(n,e){return(e=Dl({mode:"visible",children:e},n.mode)).return=n,n.child=e}function Dl(n,l){return(n=e(22,n,null,l)).lanes=0,n.stateNode={v:1,h:null,m:null,k:null},n}function Nl(n,e,l){return sc(e,n.child,null,l),(n=Ll(e,e.pendingProps.children)).flags|=2,e.memoizedState=null,n}function Bl(n,e,l){n.lanes|=e
var r=n.alternate
null!==r&&(r.lanes|=e),X(n.return,e,l)}function Hl(n,e,l,r,t){var u=n.memoizedState
null===u?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:l,tailMode:t}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=l,u.tailMode=t)}function ql(n,e,l){var r=e.pendingProps,t=r.revealOrder,u=r.tail
if(El(n,e,r.children,l),2&(r=hc.current))r=1&r|2,e.flags|=128
else{if(null!==n&&128&n.flags)n:for(n=e.child;null!==n;){if(13===n.tag)null!==n.memoizedState&&Bl(n,l,e)
else if(19===n.tag)Bl(n,l,e)
else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break n
for(;null===n.sibling;){if(null===n.return||n.return===e)break n
n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}switch(d(hc,r),t){case"forwards":for(l=e.child,t=null;null!==l;)null!==(n=l.alternate)&&null===dl(n)&&(t=l),l=l.sibling
null===(l=t)?(t=e.child,e.child=null):(t=l.sibling,l.sibling=null),Hl(e,!1,t,l,u)
break
case"backwards":for(l=null,t=e.child,e.child=null;null!==t;){if(null!==(n=t.alternate)&&null===dl(n)){e.child=t
break}n=t.sibling,t.sibling=l,l=t,t=n}Hl(e,!0,l,null,u)
break
case"together":Hl(e,!1,null,null,void 0)
break
default:e.memoizedState=null}return e.child}function Ul(n,e,l){if(null!==n&&(e.dependencies=n.dependencies),Yc|=e.lanes,0===(l&e.childLanes)){if(null===n)return null
if(Z(n,e,l,!1),0===(l&e.childLanes))return null}if(null!==n&&e.child!==n.child)throw Error(r(153))
if(null!==e.child){for(l=_t(n=e.child,n.pendingProps),e.child=l,l.return=e;null!==n.sibling;)n=n.sibling,(l=l.sibling=_t(n,n.pendingProps)).return=e
l.sibling=null}return e.child}function $l(n,e){return 0!==(n.lanes&e)||!(null===(n=n.dependencies)||!nn(n))}function Vl(n,e,l){if(null!==n)if(n.memoizedProps!==e.pendingProps)mc=!0
else{if(!($l(n,l)||128&e.flags))return mc=!1,function(n,e,l){switch(e.tag){case 3:_(e,e.stateNode.containerInfo),Y(0,xa,n.memoizedState.cache),$()
break
case 27:case 5:D(e)
break
case 4:_(e,e.stateNode.containerInfo)
break
case 10:Y(0,e.type,e.memoizedProps.value)
break
case 13:var r=e.memoizedState
if(null!==r)return null!==r.dehydrated?(cl(e),e.flags|=128,null):0!==(l&e.child.childLanes)?_l(n,e,l):(cl(e),null!==(n=Ul(n,e,l))?n.sibling:null)
cl(e)
break
case 19:var t=!!(128&n.flags)
if((r=0!==(l&e.childLanes))||(Z(n,e,l,!1),r=0!==(l&e.childLanes)),t){if(r)return ql(n,e,l)
e.flags|=128}if(null!==(t=e.memoizedState)&&(t.rendering=null,t.tail=null,t.lastEffect=null),d(hc,hc.current),r)break
return null
case 22:case 23:return e.lanes=0,jl(n,e,l)
case 24:Y(0,xa,n.memoizedState.cache)}return Ul(n,e,l)}(n,e,l)
mc=!!(131072&n.flags)}else mc=!1,sa&&1048576&e.flags&&O(e,Zi,e.index)
switch(e.lanes=0,e.tag){case 16:n:{n=e.pendingProps
var t=e.elementType,u=t.u
if(t=u(t.t),e.type=t,"function"!=typeof t){if(null!=t){if((u=t.$$typeof)===fu){e.tag=11,e=Sl(null,e,t,n,l)
break n}if(u===du){e.tag=14,e=Cl(null,e,t,n,l)
break n}}throw e=f(t)||t,Error(r(306,e,""))}Ft(t)?(n=bl(t,n),e.tag=1,e=zl(null,e,t,n,l)):(e.tag=0,e=Tl(null,e,t,n,l))}return e
case 0:return Tl(n,e,e.type,e.pendingProps,l)
case 1:return zl(n,e,t=e.type,u=bl(t,e.pendingProps),l)
case 3:n:{if(_(e,e.stateNode.containerInfo),null===n)throw Error(r(387))
var o=e.pendingProps
t=(u=e.memoizedState).element,On(n,e),Nn(e,o,null,l)
var i=e.memoizedState
if(o=i.cache,Y(0,xa,o),o!==u.cache&&J(e,[xa],l,!0),Dn(),o=i.element,Bu&&u.isDehydrated){if(u={element:o,isDehydrated:!1,cache:i.cache},e.updateQueue.baseState=u,e.memoizedState=u,256&e.flags){e=Ol(n,e,o,l)
break n}if(o!==t){Q(t=I(Error(r(424)),e)),e=Ol(n,e,o,l)
break n}for(Bu&&(fa=$o(e.stateNode.containerInfo),ca=e,sa=!0,va=null,da=!0),l=vc(e,null,o,l),e.child=l;l;)l.flags=-3&l.flags|4096,l=l.sibling}else{if($(),o===t){e=Ul(n,e,l)
break n}El(n,e,o,l)}e=e.child}return e
case 26:if(ii)return Rl(n,e),null===n?(l=fi(e.type,null,e.pendingProps,null))?e.memoizedState=l:sa||(e.stateNode=yi(e.type,e.pendingProps,ia.current,e)):e.memoizedState=fi(e.type,n.memoizedProps,e.pendingProps,n.memoizedState),null
case 27:if(gi)return D(e),null===n&&gi&&sa&&(t=e.stateNode=xi(e.type,e.pendingProps,ia.current,ua.current,!1),ca=e,da=!0,fa=Wo(e.type,t,fa)),El(n,e,e.pendingProps.children,l),Rl(n,e),null===n&&(e.flags|=4194304),e.child
case 5:return null===n&&sa&&(ui(e.type,e.pendingProps,ua.current),(u=t=fa)&&(null!==(t=Go(t,e.type,e.pendingProps,da))?(e.stateNode=t,ca=e,fa=Uo(t),da=!1,u=!0):u=!1),u||B(e)),D(e),u=e.type,o=e.pendingProps,i=null!==n?n.memoizedProps:null,t=o.children,zu(u,o)?t=null:null!==i&&zu(u,i)&&(e.flags|=32),null!==e.memoizedState&&(u=Gn(n,e,Kn,null,null,l),Lu?no.o=u:no.i=u),Rl(n,e),El(n,e,t,l),e.child
case 6:return null===n&&sa&&(oi(e.pendingProps,ua.current),(n=l=fa)&&(null!==(l=Qo(l,e.pendingProps,da))?(e.stateNode=l,ca=e,fa=null,n=!0):n=!1),n||B(e)),null
case 13:return _l(n,e,l)
case 4:return _(e,e.stateNode.containerInfo),t=e.pendingProps,null===n?e.child=sc(e,null,t,l):El(n,e,t,l),e.child
case 11:return Sl(n,e,e.type,e.pendingProps,l)
case 7:return El(n,e,e.pendingProps,l),e.child
case 8:case 12:return El(n,e,e.pendingProps.children,l),e.child
case 10:return t=e.pendingProps,Y(0,e.type,t.value),El(n,e,t.children,l),e.child
case 9:return u=e.type.l,t=e.pendingProps.children,en(e),t=t(u=ln(u)),e.flags|=1,El(n,e,t,l),e.child
case 14:return Cl(n,e,e.type,e.pendingProps,l)
case 15:return Ml(n,e,e.type,e.pendingProps,l)
case 19:return ql(n,e,l)
case 31:return t=e.pendingProps,l=e.mode,t={mode:t.mode,children:t.children},null===n?((l=Dl(t,l)).ref=e.ref,e.child=l,l.return=e,e=l):((l=_t(n.child,t)).ref=e.ref,e.child=l,l.return=e,e=l),e
case 22:return jl(n,e,l)
case 24:return en(e),t=ln(xa),null===n?(null===(u=bn())&&(u=Nc,o=un(),u.pooledCache=o,o.refCount++,null!==o&&(u.pooledCacheLanes|=l),u=o),e.memoizedState={parent:t,cache:u},zn(e),Y(0,xa,u)):(0!==(n.lanes&l)&&(On(n,e),Nn(e,null,null,l),Dn()),u=n.memoizedState,o=e.memoizedState,u.parent!==t?(u={parent:t,cache:t},e.memoizedState=u,0===e.lanes&&(e.memoizedState=e.updateQueue.baseState=u),Y(0,xa,t)):(t=o.cache,Y(0,xa,t),t!==u.cache&&J(e,[xa],l,!0))),El(n,e,e.pendingProps.children,l),e.child
case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function Wl(n){n.flags|=4}function Gl(n,e){if(null!==n&&n.child===e.child)return!1
if(16&e.flags)return!0
for(n=e.child;null!==n;){if(13878&n.flags||13878&n.subtreeFlags)return!0
n=n.sibling}return!1}function Ql(n,e,l,r){if(Du)for(l=e.child;null!==l;){if(5===l.tag||6===l.tag)Tu(n,l.stateNode)
else if(!(4===l.tag||gi&&27===l.tag)&&null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}else if(Nu)for(var t=e.child;null!==t;){if(5===t.tag){var u=t.stateNode
l&&r&&(u=Oo(u,t.type,t.memoizedProps)),Tu(n,u)}else if(6===t.tag)u=t.stateNode,l&&r&&(u=Ao(u,t.memoizedProps)),Tu(n,u)
else if(4!==t.tag)if(22===t.tag&&null!==t.memoizedState)null!==(u=t.child)&&(u.return=t),Ql(n,t,!0,!0)
else if(null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}}function Yl(n,e,l,r){var t=!1
if(Nu)for(var u=e.child;null!==u;){if(5===u.tag){var o=u.stateNode
l&&r&&(o=Oo(o,u.type,u.memoizedProps)),To(n,o)}else if(6===u.tag)o=u.stateNode,l&&r&&(o=Ao(o,u.memoizedProps)),To(n,o)
else if(4!==u.tag)if(22===u.tag&&null!==u.memoizedState)null!==(t=u.child)&&(t.return=u),Yl(n,u,!0,!0),t=!0
else if(null!==u.child){u.child.return=u,u=u.child
continue}if(u===e)break
for(;null===u.sibling;){if(null===u.return||u.return===e)return t
u=u.return}u.sibling.return=u.return,u=u.sibling}return t}function Kl(n,e){if(Nu&&Gl(n,e)){var l=(n=e.stateNode).containerInfo,r=Ro()
Yl(r,e,!1,!1),n.pendingChildren=r,Wl(e),Io(l,r)}}function Xl(n,e,l,r){if(Du)n.memoizedProps!==r&&Wl(e)
else if(Nu){var t=n.stateNode,u=n.memoizedProps
if((n=Gl(n,e))||u!==r){var o=ua.current;(u=Po(t,l,u,r,!n,null))===t?e.stateNode=t:(Iu(u,l,r,o)&&Wl(e),e.stateNode=u,n?Ql(u,e,!1,!1):Wl(e))}else e.stateNode=t}}function Jl(n,e,l){if(Qu(e,l)){if(n.flags|=16777216,!Yu(e,l)){if(!at())throw Ba=Na,La
n.flags|=8192}}else n.flags&=-16777217}function Zl(n,e){if(wi(e)){if(n.flags|=16777216,!mi(e)){if(!at())throw Ba=Na,La
n.flags|=8192}}else n.flags&=-16777217}function nr(n,e){null!==e&&(n.flags|=4),16384&n.flags&&(e=22!==n.tag?m():536870912,n.lanes|=e,Zc|=e)}function er(n,e){if(!sa)switch(n.tailMode){case"hidden":e=n.tail
for(var l=null;null!==e;)null!==e.alternate&&(l=e),e=e.sibling
null===l?n.tail=null:l.sibling=null
break
case"collapsed":l=n.tail
for(var r=null;null!==l;)null!==l.alternate&&(r=l),l=l.sibling
null===r?e||null===n.tail?n.tail=null:n.tail.sibling=null:r.sibling=null}}function lr(n){var e=null!==n.alternate&&n.alternate.child===n.child,l=0,r=0
if(e)for(var t=n.child;null!==t;)l|=t.lanes|t.childLanes,r|=65011712&t.subtreeFlags,r|=65011712&t.flags,t.return=n,t=t.sibling
else for(t=n.child;null!==t;)l|=t.lanes|t.childLanes,r|=t.subtreeFlags,r|=t.flags,t.return=n,t=t.sibling
return n.subtreeFlags|=r,n.childLanes=l,e}function rr(n,e,l){var t=e.pendingProps
switch(F(e),e.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return lr(e),null
case 3:return l=e.stateNode,t=null,null!==n&&(t=n.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),K(xa),L(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),null!==n&&null!==n.child||(U(e)?Wl(e):null===n||n.memoizedState.isDehydrated&&!(256&e.flags)||(e.flags|=1024,V())),Kl(n,e),lr(e),null
case 26:if(ii){l=e.type
var u=e.memoizedState
return null===n?(Wl(e),null!==u?(lr(e),Zl(e,u)):(lr(e),Jl(e,l,t))):u?u!==n.memoizedState?(Wl(e),lr(e),Zl(e,u)):(lr(e),e.flags&=-16777217):(Du?n.memoizedProps!==t&&Wl(e):Xl(n,e,l,t),lr(e),Jl(e,l,t)),null}case 27:if(gi){if(N(e),l=ia.current,u=e.type,null!==n&&null!=e.stateNode)Du?n.memoizedProps!==t&&Wl(e):Xl(n,e,u,t)
else{if(!t){if(null===e.stateNode)throw Error(r(166))
return lr(e),null}n=ua.current,U(e)?H(e,n):(n=xi(u,t,l,n,!0),e.stateNode=n,Wl(e))}return lr(e),null}case 5:if(N(e),l=e.type,null!==n&&null!=e.stateNode)Xl(n,e,l,t)
else{if(!t){if(null===e.stateNode)throw Error(r(166))
return lr(e),null}n=ua.current,U(e)?H(e,n):(Ql(u=Ru(l,t,ia.current,n,e),e,!1,!1),e.stateNode=u,Iu(u,l,t,n)&&Wl(e))}return lr(e),Jl(e,e.type,e.pendingProps),null
case 6:if(n&&null!=e.stateNode)l=n.memoizedProps,Du?l!==t&&Wl(e):Nu&&(l!==t?(e.stateNode=Ou(t,ia.current,ua.current,e),Wl(e)):e.stateNode=n.stateNode)
else{if("string"!=typeof t&&null===e.stateNode)throw Error(r(166))
if(n=ia.current,l=ua.current,U(e)){if(!Bu)throw Error(r(176))
if(n=e.stateNode,l=e.memoizedProps,t=null,null!==(u=ca))switch(u.tag){case 27:case 5:t=u.memoizedProps}Xo(n,l,e,t)||B(e)}else e.stateNode=Ou(t,n,l,e)}return lr(e),null
case 13:if(t=e.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=U(e),null!==t&&null!==t.dehydrated){if(null===n){if(!u)throw Error(r(318))
if(!Bu)throw Error(r(344))
if(!(u=null!==(u=e.memoizedState)?u.dehydrated:null))throw Error(r(317))
Jo(u,e)}else $(),!(128&e.flags)&&(e.memoizedState=null),e.flags|=4
lr(e),u=!1}else u=V(),null!==n&&null!==n.memoizedState&&(n.memoizedState.hydrationErrors=u),u=!0
if(!u)return 256&e.flags?(vl(e),e):(vl(e),null)}if(vl(e),128&e.flags)return e.lanes=l,e
if(l=null!==t,n=null!==n&&null!==n.memoizedState,l){u=null,null!==(t=e.child).alternate&&null!==t.alternate.memoizedState&&null!==t.alternate.memoizedState.cachePool&&(u=t.alternate.memoizedState.cachePool.pool)
var o=null
null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(o=t.memoizedState.cachePool.pool),o!==u&&(t.flags|=2048)}return l!==n&&l&&(e.child.flags|=8192),nr(e,e.updateQueue),lr(e),null
case 4:return L(),Kl(n,e),null===n&&qu(e.stateNode.containerInfo),lr(e),null
case 10:return K(e.type),lr(e),null
case 19:if(v(hc),null===(u=e.memoizedState))return lr(e),null
if(t=!!(128&e.flags),null===(o=u.rendering))if(t)er(u,!1)
else{if(0!==Qc||null!==n&&128&n.flags)for(n=e.child;null!==n;){if(null!==(o=dl(n))){for(e.flags|=128,er(u,!1),n=o.updateQueue,e.updateQueue=n,nr(e,n),e.subtreeFlags=0,n=l,l=e.child;null!==l;)Lt(l,n),l=l.sibling
return d(hc,1&hc.current|2),e.child}n=n.sibling}null!==u.tail&&Ni()>tf&&(e.flags|=128,t=!0,er(u,!1),e.lanes=4194304)}else{if(!t)if(null!==(n=dl(o))){if(e.flags|=128,t=!0,n=n.updateQueue,e.updateQueue=n,nr(e,n),er(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!sa)return lr(e),null}else 2*Ni()-u.renderingStartTime>tf&&536870912!==l&&(e.flags|=128,t=!0,er(u,!1),e.lanes=4194304)
u.isBackwards?(o.sibling=e.child,e.child=o):(null!==(n=u.last)?n.sibling=o:e.child=o,u.last=o)}return null!==u.tail?(e=u.tail,u.rendering=e,u.tail=e.sibling,u.renderingStartTime=Ni(),e.sibling=null,n=hc.current,d(hc,t?1&n|2:1&n),e):(lr(e),null)
case 22:case 23:return vl(e),$n(),t=null!==e.memoizedState,null!==n?null!==n.memoizedState!==t&&(e.flags|=8192):t&&(e.flags|=8192),t?!!(536870912&l)&&!(128&e.flags)&&(lr(e),6&e.subtreeFlags&&(e.flags|=8192)):lr(e),null!==(l=e.updateQueue)&&nr(e,l.retryQueue),l=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(l=n.memoizedState.cachePool.pool),t=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(t=e.memoizedState.cachePool.pool),t!==l&&(e.flags|=2048),null!==n&&v(Aa),null
case 24:return l=null,null!==n&&(l=n.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),K(xa),lr(e),null
case 25:case 30:return null}throw Error(r(156,e.tag))}function tr(n,e){switch(F(e),e.tag){case 1:return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 3:return K(xa),L(),65536&(n=e.flags)&&!(128&n)?(e.flags=-65537&n|128,e):null
case 26:case 27:case 5:return N(e),null
case 13:if(vl(e),null!==(n=e.memoizedState)&&null!==n.dehydrated){if(null===e.alternate)throw Error(r(340))
$()}return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 19:return v(hc),null
case 4:return L(),null
case 10:return K(e.type),null
case 22:case 23:return vl(e),$n(),null!==n&&v(Aa),65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 24:return K(xa),null
default:return null}}function ur(n,e){switch(F(e),e.tag){case 3:K(xa),L()
break
case 26:case 27:case 5:N(e)
break
case 4:L()
break
case 13:vl(e)
break
case 19:v(hc)
break
case 10:K(e.type)
break
case 22:case 23:vl(e),$n(),null!==n&&v(Aa)
break
case 24:K(xa)}}function or(n,e){try{var l=e.updateQueue,r=null!==l?l.lastEffect:null
if(null!==r){var t=r.next
l=t
do{if((l.tag&n)===n){r=void 0
var u=l.create,o=l.inst
r=u(),o.destroy=r}l=l.next}while(l!==t)}}catch(i){Pt(e,e.return,i)}}function ir(n,e,l){try{var r=e.updateQueue,t=null!==r?r.lastEffect:null
if(null!==t){var u=t.next
r=u
do{if((r.tag&n)===n){var o=r.inst,i=o.destroy
if(void 0!==i){o.destroy=void 0,t=e
var a=l,c=i
try{c()}catch(f){Pt(t,a,f)}}}r=r.next}while(r!==u)}}catch(f){Pt(e,e.return,f)}}function ar(n){var e=n.updateQueue
if(null!==e){var l=n.stateNode
try{Hn(e,l)}catch(r){Pt(n,n.return,r)}}}function cr(n,e,l){l.props=bl(n.type,n.memoizedProps),l.state=n.memoizedState
try{l.componentWillUnmount()}catch(r){Pt(n,e,r)}}function fr(n,e){try{var l=n.ref
if(null!==l){switch(n.tag){case 26:case 27:case 5:var r=Su(n.stateNode)
break
default:r=n.stateNode}"function"==typeof l?n.refCleanup=l(r):l.current=r}}catch(t){Pt(n,e,t)}}function sr(n,e){var l=n.ref,r=n.refCleanup
if(null!==l)if("function"==typeof r)try{r()}catch(t){Pt(n,e,t)}finally{n.refCleanup=null,null!=(n=n.alternate)&&(n.refCleanup=null)}else if("function"==typeof l)try{l(null)}catch(u){Pt(n,e,u)}else l.current=null}function vr(n){var e=n.type,l=n.memoizedProps,r=n.stateNode
try{yo(r,e,l,n)}catch(t){Pt(n,n.return,t)}}function dr(n,e,l){try{bo(n.stateNode,n.type,l,e,n)}catch(r){Pt(n,n.return,r)}}function pr(n){return 5===n.tag||3===n.tag||!!ii&&26===n.tag||!!gi&&27===n.tag&&Mi(n.type)||4===n.tag}function hr(n){n:for(;;){for(;null===n.sibling;){if(null===n.return||pr(n.return))return null
n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(gi&&27===n.tag&&Mi(n.type))continue n
if(2&n.flags)continue n
if(null===n.child||4===n.tag)continue n
n.child.return=n,n=n.child}if(!(2&n.flags))return n.stateNode}}function yr(n,e,l){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?mo(l,n,e):po(l,n)
else if(4!==r&&(gi&&27===r&&Mi(n.type)&&(l=n.stateNode,e=null),null!==(n=n.child)))for(yr(n,e,l),n=n.sibling;null!==n;)yr(n,e,l),n=n.sibling}function br(n,e,l){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?wo(l,n,e):vo(l,n)
else if(4!==r&&(gi&&27===r&&Mi(n.type)&&(l=n.stateNode),null!==(n=n.child)))for(br(n,e,l),n=n.sibling;null!==n;)br(n,e,l),n=n.sibling}function wr(n,e,l){n=n.containerInfo
try{zo(n,l)}catch(r){Pt(e,e.return,r)}}function mr(n){var e=n.stateNode,l=n.memoizedProps
try{Ei(n.type,l,e,n)}catch(r){Pt(n,n.return,r)}}function kr(n,e,l){var r=l.flags
switch(l.tag){case 0:case 11:case 15:Tr(n,l),4&r&&or(5,l)
break
case 1:if(Tr(n,l),4&r)if(n=l.stateNode,null===e)try{n.componentDidMount()}catch(o){Pt(l,l.return,o)}else{var t=bl(l.type,e.memoizedProps)
e=e.memoizedState
try{n.componentDidUpdate(t,e,n.C)}catch(i){Pt(l,l.return,i)}}64&r&&ar(l),512&r&&fr(l,l.return)
break
case 3:if(Tr(n,l),64&r&&null!==(n=l.updateQueue)){if(e=null,null!==l.child)switch(l.child.tag){case 27:case 5:e=Su(l.child.stateNode)
break
case 1:e=l.child.stateNode}try{Hn(n,e)}catch(o){Pt(l,l.return,o)}}break
case 27:gi&&null===e&&4&r&&mr(l)
case 26:case 5:Tr(n,l),null===e&&4&r&&vr(l),512&r&&fr(l,l.return)
break
case 12:Tr(n,l)
break
case 13:Tr(n,l),4&r&&Sr(n,l),64&r&&null!==(n=l.memoizedState)&&null!==(n=n.dehydrated)&&(l=zt.bind(null,l),Do(n,l))
break
case 22:if(!(r=null!==l.memoizedState||gc)){e=null!==e&&null!==e.memoizedState||xc,t=gc
var u=xc
gc=r,(xc=e)&&!u?zr(n,l,!!(8772&l.subtreeFlags)):Tr(n,l),gc=t,xc=u}break
case 30:break
default:Tr(n,l)}}function gr(n){var e=n.alternate
null!==e&&(n.alternate=null,gr(e)),n.child=null,n.deletions=null,n.sibling=null,5===n.tag&&null!==(e=n.stateNode)&&Gu(e),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function xr(n,e,l){for(l=l.child;null!==l;)Er(n,e,l),l=l.sibling}function Er(n,e,l){if(Gi&&"function"==typeof Gi.onCommitFiberUnmount)try{Gi.onCommitFiberUnmount(Wi,l)}catch(u){}switch(l.tag){case 26:if(ii){xc||sr(l,e),xr(n,e,l),l.memoizedState?vi(l.memoizedState):l.stateNode&&hi(l.stateNode)
break}case 27:if(gi){xc||sr(l,e)
var r=Mc,t=jc
Mi(l.type)&&(Mc=l.stateNode,jc=!1),xr(n,e,l),Si(l.stateNode),Mc=r,jc=t
break}case 5:xc||sr(l,e)
case 6:if(Du){if(r=Mc,t=jc,Mc=null,xr(n,e,l),jc=t,null!==(Mc=r))if(jc)try{go(Mc,l.stateNode)}catch(o){Pt(l,e,o)}else try{ko(Mc,l.stateNode)}catch(o){Pt(l,e,o)}}else xr(n,e,l)
break
case 18:Du&&null!==Mc&&(jc?ri(Mc,l.stateNode):li(Mc,l.stateNode))
break
case 4:Du?(r=Mc,t=jc,Mc=l.stateNode.containerInfo,jc=!0,xr(n,e,l),Mc=r,jc=t):(Nu&&wr(l.stateNode,l,Ro()),xr(n,e,l))
break
case 0:case 11:case 14:case 15:xc||ir(2,l,e),xc||ir(4,l,e),xr(n,e,l)
break
case 1:xc||(sr(l,e),"function"==typeof(r=l.stateNode).componentWillUnmount&&cr(l,e,r)),xr(n,e,l)
break
case 21:xr(n,e,l)
break
case 22:xc=(r=xc)||null!==l.memoizedState,xr(n,e,l),xc=r
break
default:xr(n,e,l)}}function Sr(n,e){if(Bu&&null===e.memoizedState&&null!==(n=e.alternate)&&null!==(n=n.memoizedState)&&null!==(n=n.dehydrated))try{ei(n)}catch(l){Pt(e,e.return,l)}}function Cr(n,e){var l=function(n){switch(n.tag){case 13:case 19:var e=n.stateNode
return null===e&&(e=n.stateNode=new Sc),e
case 22:return null===(e=(n=n.stateNode).m)&&(e=n.m=new Sc),e
default:throw Error(r(435,n.tag))}}(n)
e.forEach(function(e){var r=Ot.bind(null,n,e)
l.has(e)||(l.add(e),e.then(r,r))})}function Mr(n,e){var l=e.deletions
if(null!==l)for(var t=0;t<l.length;t++){var u=l[t],o=n,i=e
if(Du){var a=i
n:for(;null!==a;){switch(a.tag){case 27:if(gi){if(Mi(a.type)){Mc=a.stateNode,jc=!1
break n}break}case 5:Mc=a.stateNode,jc=!1
break n
case 3:case 4:Mc=a.stateNode.containerInfo,jc=!0
break n}a=a.return}if(null===Mc)throw Error(r(160))
Er(o,i,u),Mc=null,jc=!1}else Er(o,i,u)
null!==(o=u.alternate)&&(o.return=null),u.return=null}if(13878&e.subtreeFlags)for(e=e.child;null!==e;)jr(e,n),e=e.sibling}function jr(n,e){var l=n.alternate,t=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:Mr(e,n),Pr(n),4&t&&(ir(3,n,n.return),or(3,n),ir(5,n,n.return))
break
case 1:Mr(e,n),Pr(n),512&t&&(xc||null===l||sr(l,l.return)),64&t&&gc&&null!==(n=n.updateQueue)&&null!==(t=n.callbacks)&&(l=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===l?t:l.concat(t))
break
case 26:if(ii){var u=Pc
if(Mr(e,n),Pr(n),512&t&&(xc||null===l||sr(l,l.return)),4&t){t=null!==l?l.memoizedState:null
var o=n.memoizedState
null===l?null===o?null===n.stateNode?n.stateNode=di(u,n.type,n.memoizedProps,n):pi(u,n.type,n.stateNode):n.stateNode=si(u,o,n.memoizedProps):t!==o?(null===t?null!==l.stateNode&&hi(l.stateNode):vi(t),null===o?pi(u,n.type,n.stateNode):si(u,o,n.memoizedProps)):null===o&&null!==n.stateNode&&dr(n,n.memoizedProps,l.memoizedProps)}break}case 27:if(gi){Mr(e,n),Pr(n),512&t&&(xc||null===l||sr(l,l.return)),null!==l&&4&t&&dr(n,n.memoizedProps,l.memoizedProps)
break}case 5:if(Mr(e,n),Pr(n),512&t&&(xc||null===l||sr(l,l.return)),Du){if(32&n.flags){u=n.stateNode
try{xo(u)}catch(s){Pt(n,n.return,s)}}4&t&&null!=n.stateNode&&dr(n,u=n.memoizedProps,null!==l?l.memoizedProps:u),1024&t&&(Ec=!0)}break
case 6:if(Mr(e,n),Pr(n),4&t&&Du){if(null===n.stateNode)throw Error(r(162))
t=n.memoizedProps,l=null!==l?l.memoizedProps:t,u=n.stateNode
try{ho(u,l,t)}catch(s){Pt(n,n.return,s)}}break
case 3:if(ii?(bi(),u=Pc,Pc=ci(e.containerInfo),Mr(e,n),Pc=u):Mr(e,n),Pr(n),4&t){if(Du&&Bu&&null!==l&&l.memoizedState.isDehydrated)try{ni(e.containerInfo)}catch(s){Pt(n,n.return,s)}if(Nu){t=e.containerInfo,l=e.pendingChildren
try{zo(t,l)}catch(s){Pt(n,n.return,s)}}}Ec&&(Ec=!1,Rr(n))
break
case 4:ii?(l=Pc,Pc=ci(n.stateNode.containerInfo),Mr(e,n),Pr(n),Pc=l):(Mr(e,n),Pr(n)),4&t&&Nu&&wr(n.stateNode,n,n.stateNode.pendingChildren)
break
case 12:Mr(e,n),Pr(n)
break
case 13:Mr(e,n),Pr(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==l&&null!==l.memoizedState)&&(rf=Ni()),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,Cr(n,t))
break
case 22:u=null!==n.memoizedState
var i=null!==l&&null!==l.memoizedState,a=gc,c=xc
if(gc=a||u,xc=c||i,Mr(e,n),xc=c,gc=a,Pr(n),8192&t&&((e=n.stateNode).v=u?-2&e.v:1|e.v,u&&(null===l||i||gc||xc||Ir(n)),Du))n:if(l=null,Du)for(e=n;;){if(5===e.tag||ii&&26===e.tag){if(null===l){i=l=e
try{o=i.stateNode,u?Eo(o):Co(i.stateNode,i.memoizedProps)}catch(s){Pt(i,i.return,s)}}}else if(6===e.tag){if(null===l){i=e
try{var f=i.stateNode
u?So(f):Mo(f,i.memoizedProps)}catch(s){Pt(i,i.return,s)}}}else if((22!==e.tag&&23!==e.tag||null===e.memoizedState||e===n)&&null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break n
for(;null===e.sibling;){if(null===e.return||e.return===n)break n
l===e&&(l=null),e=e.return}l===e&&(l=null),e.sibling.return=e.return,e=e.sibling}4&t&&null!==(t=n.updateQueue)&&null!==(l=t.retryQueue)&&(t.retryQueue=null,Cr(n,l))
break
case 19:Mr(e,n),Pr(n),4&t&&null!==(t=n.updateQueue)&&(n.updateQueue=null,Cr(n,t))
break
case 30:case 21:break
default:Mr(e,n),Pr(n)}}function Pr(n){var e=n.flags
if(2&e){try{if(Du){for(var l,t=n.return;null!==t;){if(pr(t)){l=t
break}t=t.return}if(null==l)throw Error(r(160))
switch(l.tag){case 27:if(gi){var u=l.stateNode
br(n,hr(n),u)
break}case 5:var o=l.stateNode
32&l.flags&&(xo(o),l.flags&=-33),br(n,hr(n),o)
break
case 3:case 4:var i=l.stateNode.containerInfo
yr(n,hr(n),i)
break
default:throw Error(r(161))}}}catch(a){Pt(n,n.return,a)}n.flags&=-3}4096&e&&(n.flags&=-4097)}function Rr(n){if(1024&n.subtreeFlags)for(n=n.child;null!==n;){var e=n
Rr(e),5===e.tag&&1024&e.flags&&eo(e.stateNode),n=n.sibling}}function Tr(n,e){if(8772&e.subtreeFlags)for(e=e.child;null!==e;)kr(n,e.alternate,e),e=e.sibling}function Ir(n){for(n=n.child;null!==n;){var e=n
switch(e.tag){case 0:case 11:case 14:case 15:ir(4,e,e.return),Ir(e)
break
case 1:sr(e,e.return)
var l=e.stateNode
"function"==typeof l.componentWillUnmount&&cr(e,e.return,l),Ir(e)
break
case 27:gi&&Si(e.stateNode)
case 26:case 5:sr(e,e.return),Ir(e)
break
case 22:null===e.memoizedState&&Ir(e)
break
default:Ir(e)}n=n.sibling}}function zr(n,e,l){for(l=l&&!!(8772&e.subtreeFlags),e=e.child;null!==e;){var r=e.alternate,t=n,u=e,o=u.flags
switch(u.tag){case 0:case 11:case 15:zr(t,u,l),or(4,u)
break
case 1:if(zr(t,u,l),"function"==typeof(t=(r=u).stateNode).componentDidMount)try{t.componentDidMount()}catch(c){Pt(r,r.return,c)}if(null!==(t=(r=u).updateQueue)){var i=r.stateNode
try{var a=t.shared.hiddenCallbacks
if(null!==a)for(t.shared.hiddenCallbacks=null,t=0;t<a.length;t++)Bn(a[t],i)}catch(c){Pt(r,r.return,c)}}l&&64&o&&ar(u),fr(u,u.return)
break
case 27:gi&&mr(u)
case 26:case 5:zr(t,u,l),l&&null===r&&4&o&&vr(u),fr(u,u.return)
break
case 12:zr(t,u,l)
break
case 13:zr(t,u,l),l&&4&o&&Sr(t,u)
break
case 22:null===u.memoizedState&&zr(t,u,l),fr(u,u.return)
break
case 30:break
default:zr(t,u,l)}e=e.sibling}}function Or(n,e){var l=null
null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(l=n.memoizedState.cachePool.pool),n=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),n!==l&&(null!=n&&n.refCount++,null!=l&&on(l))}function Ar(n,e){n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&on(n))}function Fr(n,e,l,r){if(10256&e.subtreeFlags)for(e=e.child;null!==e;)_r(n,e,l,r),e=e.sibling}function _r(n,e,l,r){var t=e.flags
switch(e.tag){case 0:case 11:case 15:Fr(n,e,l,r),2048&t&&or(9,e)
break
case 1:case 13:default:Fr(n,e,l,r)
break
case 3:Fr(n,e,l,r),2048&t&&(n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&on(n)))
break
case 12:if(2048&t){Fr(n,e,l,r),n=e.stateNode
try{var u=e.memoizedProps,o=u.id,i=u.onPostCommit
"function"==typeof i&&i(o,null===e.alternate?"mount":"update",n.passiveEffectDuration,-0)}catch(a){Pt(e,e.return,a)}}else Fr(n,e,l,r)
break
case 23:break
case 22:u=e.stateNode,o=e.alternate,null!==e.memoizedState?2&u.v?Fr(n,e,l,r):Dr(n,e):2&u.v?Fr(n,e,l,r):(u.v|=2,Lr(n,e,l,r,!!(10256&e.subtreeFlags))),2048&t&&Or(o,e)
break
case 24:Fr(n,e,l,r),2048&t&&Ar(e.alternate,e)}}function Lr(n,e,l,r,t){for(t=t&&!!(10256&e.subtreeFlags),e=e.child;null!==e;){var u=n,o=e,i=l,a=r,c=o.flags
switch(o.tag){case 0:case 11:case 15:Lr(u,o,i,a,t),or(8,o)
break
case 23:break
case 22:var f=o.stateNode
null!==o.memoizedState?2&f.v?Lr(u,o,i,a,t):Dr(u,o):(f.v|=2,Lr(u,o,i,a,t)),t&&2048&c&&Or(o.alternate,o)
break
case 24:Lr(u,o,i,a,t),t&&2048&c&&Ar(o.alternate,o)
break
default:Lr(u,o,i,a,t)}e=e.sibling}}function Dr(n,e){if(10256&e.subtreeFlags)for(e=e.child;null!==e;){var l=n,r=e,t=r.flags
switch(r.tag){case 22:Dr(l,r),2048&t&&Or(r.alternate,r)
break
case 24:Dr(l,r),2048&t&&Ar(r.alternate,r)
break
default:Dr(l,r)}e=e.sibling}}function Nr(n){if(n.subtreeFlags&Rc)for(n=n.child;null!==n;)Br(n),n=n.sibling}function Br(n){switch(n.tag){case 26:Nr(n),n.flags&Rc&&(null!==n.memoizedState?ki(Pc,n.memoizedState,n.memoizedProps):Xu(n.type,n.memoizedProps))
break
case 5:Nr(n),n.flags&Rc&&Xu(n.type,n.memoizedProps)
break
case 3:case 4:if(ii){var e=Pc
Pc=ci(n.stateNode.containerInfo),Nr(n),Pc=e}else Nr(n)
break
case 22:null===n.memoizedState&&(null!==(e=n.alternate)&&null!==e.memoizedState?(e=Rc,Rc=16777216,Nr(n),Rc=e):Nr(n))
break
default:Nr(n)}}function Hr(n){var e=n.alternate
if(null!==e&&null!==(n=e.child)){e.child=null
do{e=n.sibling,n.sibling=null,n=e}while(null!==n)}}function qr(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var l=0;l<e.length;l++){var r=e[l]
Cc=r,Vr(r,n)}Hr(n)}if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Ur(n),n=n.sibling}function Ur(n){switch(n.tag){case 0:case 11:case 15:qr(n),2048&n.flags&&ir(9,n,n.return)
break
case 3:case 12:default:qr(n)
break
case 22:var e=n.stateNode
null!==n.memoizedState&&2&e.v&&(null===n.return||13!==n.return.tag)?(e.v&=-3,$r(n)):qr(n)}}function $r(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var l=0;l<e.length;l++){var r=e[l]
Cc=r,Vr(r,n)}Hr(n)}for(n=n.child;null!==n;){switch((e=n).tag){case 0:case 11:case 15:ir(8,e,e.return),$r(e)
break
case 22:2&(l=e.stateNode).v&&(l.v&=-3,$r(e))
break
default:$r(e)}n=n.sibling}}function Vr(n,e){for(;null!==Cc;){var l=Cc
switch(l.tag){case 0:case 11:case 15:ir(8,l,e)
break
case 23:case 22:if(null!==l.memoizedState&&null!==l.memoizedState.cachePool){var r=l.memoizedState.cachePool.pool
null!=r&&r.refCount++}break
case 24:on(l.memoizedState.cache)}if(null!==(r=l.child))r.return=l,Cc=r
else n:for(l=n;null!==Cc;){var t=(r=Cc).sibling,u=r.return
if(gr(r),r===l){Cc=null
break n}if(null!==t){t.return=u,Cc=t
break n}Cc=u}}}function Wr(n){var e=Hu(n)
if(null!=e){if("string"!=typeof e.memoizedProps["data-testname"])throw Error(r(364))
return e}if(null===(n=uo(n)))throw Error(r(362))
return n.stateNode.current}function Gr(n,e){var l=n.tag
switch(e.$$typeof){case Ic:if(n.type===e.value)return!0
break
case zc:n:{for(e=e.value,n=[n,0],l=0;l<n.length;){var t=n[l++],u=t.tag,o=n[l++],i=e[o]
if(5!==u&&26!==u&&27!==u||!ao(t)){for(;null!=i&&Gr(t,i);)i=e[++o]
if(o===e.length){e=!0
break n}for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}e=!1}return e
case Oc:if((5===l||26===l||27===l)&&co(n.stateNode,e.value))return!0
break
case Fc:if((5===l||6===l||26===l||27===l)&&null!==(n=io(n))&&0<=n.indexOf(e.value))return!0
break
case Ac:if((5===l||26===l||27===l)&&"string"==typeof(n=n.memoizedProps["data-testname"])&&n.toLowerCase()===e.value.toLowerCase())return!0
break
default:throw Error(r(365))}return!1}function Qr(n){switch(n.$$typeof){case Ic:return"<"+(f(n.value)||"Unknown")+">"
case zc:return":has("+(Qr(n)||"")+")"
case Oc:return'[role="'+n.value+'"]'
case Fc:return'"'+n.value+'"'
case Ac:return'[data-testname="'+n.value+'"]'
default:throw Error(r(365))}}function Yr(n,e){var l=[]
n=[n,0]
for(var r=0;r<n.length;){var t=n[r++],u=t.tag,o=n[r++],i=e[o]
if(5!==u&&26!==u&&27!==u||!ao(t)){for(;null!=i&&Gr(t,i);)i=e[++o]
if(o===e.length)l.push(t)
else for(t=t.child;null!==t;)n.push(t,o),t=t.sibling}}return l}function Kr(n,e){if(!to)throw Error(r(363))
n=Yr(n=Wr(n),e),e=[],n=Array.from(n)
for(var l=0;l<n.length;){var t=n[l++],u=t.tag
if(5===u||26===u||27===u)ao(t)||e.push(t.stateNode)
else for(t=t.child;null!==t;)n.push(t),t=t.sibling}return e}function Xr(){return 2&Dc&&0!==Hc?Hc&-Hc:null!==ku.T?0!==Ia?Ia:hn():Vu()}function Jr(){0===Jc&&(Jc=536870912&Hc&&!sa?536870912:w())
var n=dc.current
return null!==n&&(n.flags|=32),Jc}function Zr(n,e,l){(n!==Nc||2!==qc&&9!==qc)&&null===n.cancelPendingCommit||(ot(n,0),rt(n,Hc,Jc,!1)),g(n,l),2&Dc&&n===Nc||(n===Nc&&(!(2&Dc)&&(Kc|=l),4===Qc&&rt(n,Hc,Jc,!1)),an(n))}function nt(n,e,l){if(6&Dc)throw Error(r(327))
for(var t=!l&&!(124&e)&&0===(e&n.expiredLanes)||y(n,e),u=t?function(n,e){var l=Dc
Dc|=2
var t=ct(),u=ft()
Nc!==n||Hc!==e?(uf=null,tf=Ni()+500,ot(n,e)):Vc=y(n,e)
n:for(;;){try{if(0!==qc&&null!==Bc){e=Bc
var o=Uc
e:switch(qc){case 1:qc=0,Uc=null,bt(n,e,o,1)
break
case 2:case 9:if(gn(o)){qc=0,Uc=null,yt(e)
break}e=function(){2!==qc&&9!==qc||Nc!==n||(qc=7),an(n)},o.then(e,e)
break n
case 3:qc=7
break n
case 4:qc=5
break n
case 7:gn(o)?(qc=0,Uc=null,yt(e)):(qc=0,Uc=null,bt(n,e,o,7))
break
case 5:var i=null
switch(Bc.tag){case 26:i=Bc.memoizedState
case 5:case 27:var a=Bc,c=a.type,f=a.pendingProps
if(i?mi(i):Yu(c,f)){qc=0,Uc=null
var s=a.sibling
if(null!==s)Bc=s
else{var v=a.return
null!==v?(Bc=v,wt(v)):Bc=null}break e}}qc=0,Uc=null,bt(n,e,o,5)
break
case 6:qc=0,Uc=null,bt(n,e,o,6)
break
case 8:ut(),Qc=6
break n
default:throw Error(r(462))}}pt()
break}catch(d){it(n,d)}1}return wa=ba=null,ku.H=t,ku.A=u,Dc=l,null!==Bc?0:(Nc=null,Hc=0,Mn(),Qc)}(n,e):vt(n,e,!0),o=t;;){if(0===u){Vc&&!t&&rt(n,e,0,!1)
break}if(l=n.current.alternate,!o||lt(l)){if(2===u){if(o=e,n.errorRecoveryDisabledLanes&o)var i=0
else i=0!=(i=-536870913&n.pendingLanes)?i:536870912&i?536870912:0
if(0!==i){e=i
n:{var a=n
u=nf
var c=Bu&&a.current.memoizedState.isDehydrated
if(c&&(ot(a,i).flags|=256),2!==(i=vt(a,i,!1))){if(Wc&&!c){a.errorRecoveryDisabledLanes|=o,Kc|=o,u=4
break n}o=ef,ef=u,null!==o&&(null===ef?ef=o:ef.push.apply(ef,o))}u=i}if(o=!1,2!==u)continue}}if(1===u){ot(n,0),rt(n,e,0,!0)
break}n:{switch(t=n,o=u){case 0:case 1:throw Error(r(345))
case 4:if((4194048&e)!==e)break
case 6:rt(t,e,Jc,!$c)
break n
case 2:ef=null
break
case 3:case 5:break
default:throw Error(r(329))}if((62914560&e)===e&&10<(u=rf+300-Ni())){if(rt(t,e,Jc,!$c),0!==h(t,0,!0))break n
t.timeoutHandle=Au(et.bind(null,t,l,ef,uf,lf,e,Jc,Kc,Zc,$c,o,2,-0,0),u)}else et(t,l,ef,uf,lf,e,Jc,Kc,Zc,$c,o,0,-0,0)}break}u=vt(n,e,!1),o=!1}an(n)}function et(n,e,l,r,t,u,o,i,a,c,f,s,v,d){if(n.timeoutHandle=_u,(8192&(s=e.subtreeFlags)||!(16785408&~s))&&(Ku(),Br(e),null!==(s=Ju())))return n.cancelPendingCommit=s(kt.bind(null,n,e,u,l,r,t,o,i,a,f,1,v,d)),rt(n,u,o,!c),void 0
kt(n,e,u,l,r,t,o,i,a)}function lt(n){for(var e=n;;){var l=e.tag
if((0===l||11===l||15===l)&&16384&e.flags&&null!==(l=e.updateQueue)&&null!==(l=l.stores))for(var r=0;r<l.length;r++){var t=l[r],u=t.getSnapshot
t=t.value
try{if(!ha(u(),t))return!1}catch(o){return!1}}if(l=e.child,16384&e.subtreeFlags&&null!==l)l.return=e,e=l
else{if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return!0
e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rt(n,e,l,r){e&=~Xc,e&=~Kc,n.suspendedLanes|=e,n.pingedLanes&=~e,r&&(n.warmLanes|=e),r=n.expirationTimes
for(var t=e;0<t;){var u=31-Ti(t),o=1<<u
r[u]=-1,t&=~o}0!==l&&x(n,l,e)}function tt(){return!!(6&Dc)||(cn(0),!1)}function ut(){if(null!==Bc){if(0===qc)var n=Bc.return
else wa=ba=null,Zn(n=Bc),cc=null,fc=0,n=Bc
for(;null!==n;)ur(n.alternate,n),n=n.return
Bc=null}}function ot(n,e){var l=n.timeoutHandle
l!==_u&&(n.timeoutHandle=_u,Fu(l)),null!==(l=n.cancelPendingCommit)&&(n.cancelPendingCommit=null,l()),ut(),Nc=n,Bc=l=_t(n.current,null),Hc=e,qc=0,Uc=null,$c=!1,Vc=y(n,e),Wc=!1,Zc=Jc=Xc=Kc=Yc=Qc=0,ef=nf=null,lf=!1,8&e&&(e|=32&e)
var r=n.entangledLanes
if(0!==r)for(n=n.entanglements,r&=e;0<r;){var t=31-Ti(r),u=1<<t
e|=n[t],r&=~u}return Gc=e,Mn(),l}function it(n,e){Ya=null,ku.H=uc,e===_a||e===Da?(e=Sn(),qc=3):e===La?(e=Sn(),qc=4):qc=e===wc?8:null!==e&&"object"==typeof e&&"function"==typeof e.then?6:1,Uc=e,null===Bc&&(Qc=1,wl(n,I(e,n.current)))}function at(){var n=dc.current
return null===n||((4194048&Hc)===Hc?null===pc:!!((62914560&Hc)===Hc||536870912&Hc)&&n===pc)}function ct(){var n=ku.H
return ku.H=uc,null===n?uc:n}function ft(){var n=ku.A
return ku.A=Tc,n}function st(){Qc=4,$c||(4194048&Hc)!==Hc&&null!==dc.current||(Vc=!0),!(134217727&Yc)&&!(134217727&Kc)||null===Nc||rt(Nc,Hc,Jc,!1)}function vt(n,e,l){var r=Dc
Dc|=2
var t=ct(),u=ft()
Nc===n&&Hc===e||(uf=null,ot(n,e)),e=!1
var o=Qc
n:for(;;){try{if(0!==qc&&null!==Bc){var i=Bc,a=Uc
switch(qc){case 8:ut(),o=6
break n
case 3:case 2:case 9:case 6:null===dc.current&&(e=!0)
var c=qc
if(qc=0,Uc=null,bt(n,i,a,c),l&&Vc){o=0
break n}break
default:c=qc,qc=0,Uc=null,bt(n,i,a,c)}}dt(),o=Qc
break}catch(f){it(n,f)}1}return e&&n.shellSuspendCounter++,wa=ba=null,Dc=r,ku.H=t,ku.A=u,null===Bc&&(Nc=null,Hc=0,Mn()),o}function dt(){for(;null!==Bc;)ht(Bc)}function pt(){for(;null!==Bc&&!Li();)ht(Bc)}function ht(n){var e=Vl(n.alternate,n,Gc)
n.memoizedProps=n.pendingProps,null===e?wt(n):Bc=e}function yt(n){var e=n,l=e.alternate
switch(e.tag){case 15:case 0:e=Il(l,e,e.pendingProps,e.type,void 0,Hc)
break
case 11:e=Il(l,e,e.pendingProps,e.type.render,e.ref,Hc)
break
case 5:Zn(e)
default:ur(l,e),e=Vl(l,e=Bc=Lt(e,Gc),Gc)}n.memoizedProps=n.pendingProps,null===e?wt(n):Bc=e}function bt(n,e,l,t){wa=ba=null,Zn(e),cc=null,fc=0
var u=e.return
try{if(function(n,e,l,t,u){if(l.flags|=32768,null!==t&&"object"==typeof t&&"function"==typeof t.then){if(null!==(e=l.alternate)&&Z(e,l,u,!0),null!==(l=dc.current)){switch(l.tag){case 13:return null===pc?st():null===l.alternate&&0===Qc&&(Qc=3),l.flags&=-257,l.flags|=65536,l.lanes=u,t===Na?l.flags|=16384:(null===(e=l.updateQueue)?l.updateQueue=new Set([t]):e.add(t),Rt(n,t,u)),!1
case 22:return l.flags|=65536,t===Na?l.flags|=16384:(null===(e=l.updateQueue)?(e={transitions:null,markerInstances:null,retryQueue:new Set([t])},l.updateQueue=e):null===(l=e.retryQueue)?e.retryQueue=new Set([t]):l.add(t),Rt(n,t,u)),!1}throw Error(r(435,l.tag))}return Rt(n,t,u),st(),!1}if(sa)return null!==(e=dc.current)?(!(65536&e.flags)&&(e.flags|=256),e.flags|=65536,e.lanes=u,t!==pa&&Q(I(n=Error(r(422),{cause:t}),l))):(t!==pa&&Q(I(e=Error(r(423),{cause:t}),l)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,t=I(t,l),Ln(n,u=kl(n.stateNode,t,u)),4!==Qc&&(Qc=2)),!1
var o=Error(r(520),{cause:t})
if(o=I(o,l),null===nf?nf=[o]:nf.push(o),4!==Qc&&(Qc=2),null===e)return!0
t=I(t,l),l=e
do{switch(l.tag){case 3:return l.flags|=65536,n=u&-u,l.lanes|=n,Ln(l,n=kl(l.stateNode,t,n)),!1
case 1:if(e=l.type,o=l.stateNode,!(128&l.flags||"function"!=typeof e.getDerivedStateFromError&&(null===o||"function"!=typeof o.componentDidCatch||null!==of&&of.has(o))))return l.flags|=65536,u&=-u,l.lanes|=u,xl(u=gl(u),n,l,t),Ln(l,u),!1}l=l.return}while(null!==l)
return!1}(n,u,e,l,Hc))return Qc=1,wl(n,I(l,n.current)),Bc=null,void 0}catch(o){if(null!==u)throw Bc=u,o
return Qc=1,wl(n,I(l,n.current)),Bc=null,void 0}32768&e.flags?(sa||1===t?n=!0:Vc||536870912&Hc?n=!1:($c=n=!0,(2===t||9===t||3===t||6===t)&&null!==(t=dc.current)&&13===t.tag&&(t.flags|=16384)),mt(e,n)):wt(e)}function wt(n){var e=n
do{if(32768&e.flags)return mt(e,$c),void 0
n=e.return
var l=rr(e.alternate,e,Gc)
if(null!==l)return Bc=l,void 0
if(null!==(e=e.sibling))return Bc=e,void 0
Bc=e=n}while(null!==e)
0===Qc&&(Qc=5)}function mt(n,e){do{var l=tr(n.alternate,n)
if(null!==l)return l.flags&=32767,Bc=l,void 0
if(null!==(l=n.return)&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!e&&null!==(n=n.sibling))return Bc=n,void 0
Bc=n=l}while(null!==n)
Qc=6,Bc=null}function kt(n,e,l,t,u,o,i,a,c){n.cancelPendingCommit=null
do{Ct()}while(0!==af)
if(6&Dc)throw Error(r(327))
if(null!==e){if(e===n.current)throw Error(r(177))
if(o=e.lanes|e.childLanes,function(n,e,l,r,t,u){var o=n.pendingLanes
n.pendingLanes=l,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=l,n.entangledLanes&=l,n.errorRecoveryDisabledLanes&=l,n.shellSuspendCounter=0
var i=n.entanglements,a=n.expirationTimes,c=n.hiddenUpdates
for(l=o&~l;0<l;){var f=31-Ti(l),s=1<<f
i[f]=0,a[f]=-1
var v=c[f]
if(null!==v)for(c[f]=null,f=0;f<v.length;f++){var d=v[f]
null!==d&&(d.lane&=-536870913)}l&=~s}0!==r&&x(n,r,0),0!==u&&0===t&&0!==n.tag&&(n.suspendedLanes|=u&~(o&~e))}(n,l,o|=Ua,i,a,c),n===Nc&&(Bc=Nc=null,Hc=0),ff=e,cf=n,sf=l,vf=o,df=u,pf=t,10256&e.subtreeFlags||10256&e.flags?(n.callbackNode=null,n.callbackPriority=0,Fi(qi,function(){return Mt(),null})):(n.callbackNode=null,n.callbackPriority=0),t=!!(13878&e.flags),13878&e.subtreeFlags||t){t=ku.T,ku.T=null,u=$u(),Uu(2),i=Dc,Dc|=4
try{!function(n,e){for(ju(n.containerInfo),Cc=e;null!==Cc;)if(e=(n=Cc).child,1024&n.subtreeFlags&&null!==e)e.return=n,Cc=e
else for(;null!==Cc;){var l=(n=Cc).alternate
switch(e=n.flags,n.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&e&&null!==l){e=void 0
var t=n,u=l.memoizedProps
l=l.memoizedState
var o=t.stateNode
try{var i=bl(t.type,u)
e=o.getSnapshotBeforeUpdate(i,l),o.C=e}catch(a){Pt(t,t.return,a)}}break
case 3:1024&e&&Du&&jo(n.stateNode.containerInfo)
break
default:if(1024&e)throw Error(r(163))}if(null!==(e=n.sibling)){e.return=n.return,Cc=e
break}Cc=n.return}}(n,e)}finally{Dc=i,Uu(u),ku.T=t}}af=1,gt(),xt(),Et()}}function gt(){if(1===af){af=0
var n=cf,e=ff,l=!!(13878&e.flags)
if(13878&e.subtreeFlags||l){l=ku.T,ku.T=null
var r=$u()
Uu(2)
var t=Dc
Dc|=4
try{jr(e,n),Pu(n.containerInfo)}finally{Dc=t,Uu(r),ku.T=l}}n.current=e,af=2}}function xt(){if(2===af){af=0
var n=cf,e=ff,l=!!(8772&e.flags)
if(8772&e.subtreeFlags||l){l=ku.T,ku.T=null
var r=$u()
Uu(2)
var t=Dc
Dc|=4
try{kr(n,e.alternate,e)}finally{Dc=t,Uu(r),ku.T=l}}af=3}}function Et(){if(4===af||3===af){af=0,Di()
var n=cf,e=ff,l=sf,r=pf
10256&e.subtreeFlags||10256&e.flags?af=5:(af=0,ff=cf=null,St(n,n.pendingLanes))
var t=n.pendingLanes
if(0===t&&(of=null),C(l),e=e.stateNode,Gi&&"function"==typeof Gi.onCommitFiberRoot)try{Gi.onCommitFiberRoot(Wi,e,void 0,!(128&~e.current.flags))}catch(a){}if(null!==r){e=ku.T,t=$u(),Uu(2),ku.T=null
try{for(var u=n.onRecoverableError,o=0;o<r.length;o++){var i=r[o]
u(i.value,{componentStack:i.stack})}}finally{ku.T=e,Uu(t)}}3&sf&&Ct(),an(n),t=n.pendingLanes,4194090&l&&42&t?n===yf?hf++:(hf=0,yf=n):hf=0,cn(0)}}function St(n,e){0===(n.pooledCacheLanes&=e)&&null!=(e=n.pooledCache)&&(n.pooledCache=null,on(e))}function Ct(n){return gt(),xt(),Et(),Mt()}function Mt(){if(5!==af)return!1
var n=cf,e=vf
vf=0
var l=C(sf),t=32>l?32:l
l=ku.T
var u=$u()
try{Uu(t),ku.T=null,t=df,df=null
var o=cf,i=sf
if(af=0,ff=cf=null,sf=0,6&Dc)throw Error(r(331))
var a=Dc
if(Dc|=4,Ur(o.current),_r(o,o.current,i,t),Dc=a,cn(0),Gi&&"function"==typeof Gi.onPostCommitFiberRoot)try{Gi.onPostCommitFiberRoot(Wi,o)}catch(c){}return!0}finally{Uu(u),ku.T=l,St(n,e)}}function jt(n,e,l){e=I(l,e),null!==(n=Fn(n,e=kl(n.stateNode,e,2),2))&&(g(n,2),an(n))}function Pt(n,e,l){if(3===n.tag)jt(n,n,l)
else for(;null!==e;){if(3===e.tag){jt(e,n,l)
break}if(1===e.tag){var r=e.stateNode
if("function"==typeof e.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===of||!of.has(r))){n=I(l,n),null!==(r=Fn(e,l=gl(2),2))&&(xl(l,r,e,n),g(r,2),an(r))
break}}e=e.return}}function Rt(n,e,l){var r=n.pingCache
if(null===r){r=n.pingCache=new Lc
var t=new Set
r.set(e,t)}else void 0===(t=r.get(e))&&(t=new Set,r.set(e,t))
t.has(l)||(Wc=!0,t.add(l),n=Tt.bind(null,n,e,l),e.then(n,n))}function Tt(n,e,l){var r=n.pingCache
null!==r&&r.delete(e),n.pingedLanes|=n.suspendedLanes&l,n.warmLanes&=~l,Nc===n&&(Hc&l)===l&&(4===Qc||3===Qc&&(62914560&Hc)===Hc&&300>Ni()-rf?!(2&Dc)&&ot(n,0):Xc|=l,Zc===Hc&&(Zc=0)),an(n)}function It(n,e){0===e&&(e=m()),null!==(n=Rn(n,e))&&(g(n,e),an(n))}function zt(n){var e=n.memoizedState,l=0
null!==e&&(l=e.retryLane),It(n,l)}function Ot(n,e){var l=0
switch(n.tag){case 13:var t=n.stateNode,u=n.memoizedState
null!==u&&(l=u.retryLane)
break
case 19:t=n.stateNode
break
case 22:t=n.stateNode.m
break
default:throw Error(r(314))}null!==t&&t.delete(e),It(n,l)}function At(n,e,l,r){this.tag=n,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ft(n){return!(!(n=n.prototype)||!n.isReactComponent)}function _t(n,l){var r=n.alternate
return null===r?((r=e(n.tag,l,n.key,n.mode)).elementType=n.elementType,r.type=n.type,r.stateNode=n.stateNode,r.alternate=n,n.alternate=r):(r.pendingProps=l,r.type=n.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=65011712&n.flags,r.childLanes=n.childLanes,r.lanes=n.lanes,r.child=n.child,r.memoizedProps=n.memoizedProps,r.memoizedState=n.memoizedState,r.updateQueue=n.updateQueue,l=n.dependencies,r.dependencies=null===l?null:{lanes:l.lanes,firstContext:l.firstContext},r.sibling=n.sibling,r.index=n.index,r.ref=n.ref,r.refCleanup=n.refCleanup,r}function Lt(n,e){n.flags&=65011714
var l=n.alternate
return null===l?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=l.childLanes,n.lanes=l.lanes,n.child=l.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=l.memoizedProps,n.memoizedState=l.memoizedState,n.updateQueue=l.updateQueue,n.type=l.type,e=l.dependencies,n.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n}function Dt(n,l,t,u,o,i){var a=0
if(u=n,"function"==typeof n)Ft(n)&&(a=1)
else if("string"==typeof n)a=ii&&gi?ai(n,t,ua.current)?26:Ci(n)?27:5:ii?ai(n,t,ua.current)?26:5:gi&&Ci(n)?27:5
else n:switch(n){case hu:return(n=e(31,t,l,o)).elementType=hu,n.lanes=i,n
case tu:return Nt(t.children,o,i,l)
case uu:a=8,o|=24
break
case ou:return(n=e(12,t,l,2|o)).elementType=ou,n.lanes=i,n
case su:return(n=e(13,t,l,o)).elementType=su,n.lanes=i,n
case vu:return(n=e(19,t,l,o)).elementType=vu,n.lanes=i,n
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case iu:case cu:a=10
break n
case au:a=9
break n
case fu:a=11
break n
case du:a=14
break n
case pu:a=16,u=null
break n}a=29,t=Error(r(130,null===n?"null":typeof n,"")),u=null}return(l=e(a,t,l,o)).elementType=n,l.type=u,l.lanes=i,l}function Nt(n,l,r,t){return(n=e(7,n,t,l)).lanes=r,n}function Bt(n,l,r){return(n=e(6,n,null,l)).lanes=r,n}function Ht(n,l,r){return(l=e(4,null!==n.children?n.children:[],n.key,l)).lanes=r,l.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},l}function qt(n,e,l,r,t,u,o,i){this.tag=1,this.containerInfo=n,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=_u,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=k(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=k(0),this.hiddenUpdates=k(null),this.identifierPrefix=r,this.onUncaughtError=t,this.onCaughtError=u,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.incompleteTransitions=new Map}function Ut(n,l,r,t,u,o,i,a,c,f,s,v){return n=new qt(n,l,r,i,a,c,f,v),l=1,!0===o&&(l|=24),o=e(3,null,null,l),n.current=o,o.stateNode=n,(l=un()).refCount++,n.pooledCache=l,l.refCount++,o.memoizedState={element:t,isDehydrated:r,cache:l},zn(o),n}function $t(n){return n?n=Ri:Ri}function Vt(n){var e=n.p
if(void 0===e){if("function"==typeof n.render)throw Error(r(188))
throw n=Object.keys(n).join(","),Error(r(268,n))}return null===(n=null!==(n=o(e))?i(n):null)?null:Su(n.stateNode)}function Wt(n,e,l,r,t,u){t=$t(t),null===r.context?r.context=t:r.pendingContext=t,(r=An(e)).payload={element:l},null!==(u=void 0===u?null:u)&&(r.callback=u),null!==(l=Fn(n,r,e))&&(Zr(l,0,e),_n(l,n,e))}function Gt(n,e){if(null!==(n=n.memoizedState)&&null!==n.dehydrated){var l=n.retryLane
n.retryLane=0!==l&&l<e?l:e}}function Qt(n,e){Gt(n,e),(n=n.alternate)&&Gt(n,e)}var Yt,Kt,Xt={},Jt=W(),Zt=G(),nu=Object.assign,eu=Symbol.for("react.element"),lu=Symbol.for("react.transitional.element"),ru=Symbol.for("react.portal"),tu=Symbol.for("react.fragment"),uu=Symbol.for("react.strict_mode"),ou=Symbol.for("react.profiler"),iu=Symbol.for("react.provider"),au=Symbol.for("react.consumer"),cu=Symbol.for("react.context"),fu=Symbol.for("react.forward_ref"),su=Symbol.for("react.suspense"),vu=Symbol.for("react.suspense_list"),du=Symbol.for("react.memo"),pu=Symbol.for("react.lazy"),hu=Symbol.for("react.activity"),yu=Symbol.for("react.memo_cache_sentinel"),bu=Symbol.iterator,wu=Symbol.for("react.client.reference"),mu=Array.isArray,ku=Jt.M,gu=n.rendererVersion,xu=n.rendererPackageName,Eu=n.extraDevToolsConfig,Su=n.getPublicInstance,Cu=n.getRootHostContext,Mu=n.getChildHostContext,ju=n.prepareForCommit,Pu=n.resetAfterCommit,Ru=n.createInstance,Tu=n.appendInitialChild,Iu=n.finalizeInitialChildren,zu=n.shouldSetTextContent,Ou=n.createTextInstance,Au=n.scheduleTimeout,Fu=n.cancelTimeout,_u=n.noTimeout,Lu=n.isPrimaryRenderer,Du=n.supportsMutation,Nu=n.supportsPersistence,Bu=n.supportsHydration,Hu=n.getInstanceFromNode,qu=n.preparePortalMount,Uu=n.setCurrentUpdatePriority,$u=n.getCurrentUpdatePriority,Vu=n.resolveUpdatePriority,Wu=n.shouldAttemptEagerTransition,Gu=n.detachDeletedInstance,Qu=n.maySuspendCommit,Yu=n.preloadInstance,Ku=n.startSuspendingCommit,Xu=n.suspendInstance,Ju=n.waitForCommitToBeReady,Zu=n.NotPendingTransition,no=n.HostTransitionContext,eo=n.resetFormInstance,lo=n.supportsMicrotasks,ro=n.scheduleMicrotask,to=n.supportsTestSelectors,uo=n.findFiberRoot,oo=n.getBoundingRect,io=n.getTextContent,ao=n.isHiddenSubtree,co=n.matchAccessibilityRole,fo=n.setFocusIfFocusable,so=n.setupIntersectionObserver,vo=n.appendChild,po=n.appendChildToContainer,ho=n.commitTextUpdate,yo=n.commitMount,bo=n.commitUpdate,wo=n.insertBefore,mo=n.insertInContainerBefore,ko=n.removeChild,go=n.removeChildFromContainer,xo=n.resetTextContent,Eo=n.hideInstance,So=n.hideTextInstance,Co=n.unhideInstance,Mo=n.unhideTextInstance,jo=n.clearContainer,Po=n.cloneInstance,Ro=n.createContainerChildSet,To=n.appendChildToContainerChildSet,Io=n.finalizeContainerChildren,zo=n.replaceContainerChildren,Oo=n.cloneHiddenInstance,Ao=n.cloneHiddenTextInstance,Fo=n.isSuspenseInstancePending,_o=n.isSuspenseInstanceFallback,Lo=n.getSuspenseInstanceFallbackErrorDetails,Do=n.registerSuspenseInstanceRetry,No=n.canHydrateFormStateMarker,Bo=n.isFormStateMarkerMatching,Ho=n.getNextHydratableSibling,qo=n.getNextHydratableSiblingAfterSingleton,Uo=n.getFirstHydratableChild,$o=n.getFirstHydratableChildWithinContainer,Vo=n.getFirstHydratableChildWithinSuspenseInstance,Wo=n.getFirstHydratableChildWithinSingleton,Go=n.canHydrateInstance,Qo=n.canHydrateTextInstance,Yo=n.canHydrateSuspenseInstance,Ko=n.hydrateInstance,Xo=n.hydrateTextInstance,Jo=n.hydrateSuspenseInstance,Zo=n.getNextHydratableInstanceAfterSuspenseInstance,ni=n.commitHydratedContainer,ei=n.commitHydratedSuspenseInstance,li=n.clearSuspenseBoundary,ri=n.clearSuspenseBoundaryFromContainer,ti=n.shouldDeleteUnhydratedTailInstances,ui=n.validateHydratableInstance,oi=n.validateHydratableTextInstance,ii=n.supportsResources,ai=n.isHostHoistableType,ci=n.getHoistableRoot,fi=n.getResource,si=n.acquireResource,vi=n.releaseResource,di=n.hydrateHoistable,pi=n.mountHoistable,hi=n.unmountHoistable,yi=n.createHoistableInstance,bi=n.prepareToCommitHoistables,wi=n.mayResourceSuspendCommit,mi=n.preloadResource,ki=n.suspendResource,gi=n.supportsSingletons,xi=n.resolveSingletonInstance,Ei=n.acquireSingletonInstance,Si=n.releaseSingletonInstance,Ci=n.isHostSingletonType,Mi=n.isSingletonScope,ji=[],Pi=-1,Ri={},Ti=Math.clz32?Math.clz32:function(n){return 0==(n>>>=0)?32:31-(Ii(n)/zi|0)|0},Ii=Math.log,zi=Math.LN2,Oi=256,Ai=4194304,Fi=Zt.unstable_scheduleCallback,_i=Zt.unstable_cancelCallback,Li=Zt.unstable_shouldYield,Di=Zt.unstable_requestPaint,Ni=Zt.unstable_now,Bi=Zt.unstable_ImmediatePriority,Hi=Zt.unstable_UserBlockingPriority,qi=Zt.unstable_NormalPriority,Ui=Zt.unstable_IdlePriority,$i=Zt.log,Vi=Zt.unstable_setDisableYieldValue,Wi=null,Gi=null,Qi=!1,Yi=new WeakMap,Ki=[],Xi=0,Ji=null,Zi=0,na=[],ea=0,la=null,ra=1,ta="",ua=s(null),oa=s(null),ia=s(null),aa=s(null),ca=null,fa=null,sa=!1,va=null,da=!1,pa=Error(r(519)),ha="function"==typeof Object.is?Object.is:function(n,e){return n===e&&(0!==n||1/n==1/e)||n!=n&&e!=e},ya=s(null),ba=null,wa=null,ma="undefined"!=typeof AbortController?AbortController:function(){var n=[],e=this.signal={aborted:!1,addEventListener:function(e,l){n.push(l)}}
this.abort=function(){e.aborted=!0,n.forEach(function(n){return n()})}},ka=Zt.unstable_scheduleCallback,ga=Zt.unstable_NormalPriority,xa={$$typeof:cu,Consumer:null,Provider:null,o:null,i:null,j:0},Ea=null,Sa=null,Ca=!1,Ma=!1,ja=!1,Pa=0,Ra=null,Ta=0,Ia=0,za=null,Oa=ku.S
ku.S=function(n,e){"object"==typeof e&&null!==e&&"function"==typeof e.then&&function(n,e){if(null===Ra){var l=Ra=[]
Ta=0,Ia=hn(),za={status:"pending",value:void 0,then:function(n){l.push(n)}}}return Ta++,e.then(yn,yn),e}(0,e),null!==Oa&&Oa(n,e)}
var Aa=s(null),Fa=Object.prototype.hasOwnProperty,_a=Error(r(460)),La=Error(r(474)),Da=Error(r(542)),Na={then:function(){}},Ba=null,Ha=[],qa=0,Ua=0,$a=!1,Va=!1,Wa=s(null),Ga=s(0),Qa=0,Ya=null,Ka=null,Xa=null,Ja=!1,Za=!1,nc=!1,ec=0,lc=0,rc=null,tc=0,uc={readContext:ln,use:re,useCallback:Vn,useContext:Vn,useEffect:Vn,useImperativeHandle:Vn,useLayoutEffect:Vn,useInsertionEffect:Vn,useMemo:Vn,useReducer:Vn,useRef:Vn,useState:Vn,useDebugValue:Vn,useDeferredValue:Vn,useTransition:Vn,useSyncExternalStore:Vn,useId:Vn,useHostTransitionStatus:Vn,useFormState:Vn,useActionState:Vn,useOptimistic:Vn,useMemoCache:Vn,useCacheRefresh:Vn},oc={readContext:ln,use:re,useCallback:function(n,e){return ne().memoizedState=[n,void 0===e?null:e],n},useContext:ln,useEffect:Oe,useImperativeHandle:function(n,e,l){l=null!=l?l.concat([n]):null,Ie(4194308,4,Le.bind(null,e,n),l)},useLayoutEffect:function(n,e){return Ie(4194308,4,n,e)},useInsertionEffect:function(n,e){Ie(4,2,n,e)},useMemo:function(n,e){var l=ne()
e=void 0===e?null:e
var r=n()
if(nc){M(!0)
try{n()}finally{M(!1)}}return l.memoizedState=[r,e],r},useReducer:function(n,e,l){var r=ne()
if(void 0!==l){var t=l(e)
if(nc){M(!0)
try{l(e)}finally{M(!1)}}}else t=e
return r.memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:t},r.queue=n,n=n.dispatch=Xe.bind(null,Ya,n),[r.memoizedState,n]},useRef:function(n){return n={current:n},ne().memoizedState=n},useState:function(n){var e=(n=he(n)).queue,l=Je.bind(null,Ya,e)
return e.dispatch=l,[n.memoizedState,l]},useDebugValue:Be,useDeferredValue:function(n,e){return Ue(ne(),n,e)},useTransition:function(){var n=he(!1)
return n=Ve.bind(null,Ya,n.queue,!0,!1),ne().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,e,l){var t=Ya,u=ne()
if(sa){if(void 0===l)throw Error(r(407))
l=l()}else{if(l=e(),null===Nc)throw Error(r(349))
124&Hc||fe(t,e,l)}u.memoizedState=l
var o={value:l,getSnapshot:e}
return u.queue=o,Oe(ve.bind(null,t,o,n),[n]),t.flags|=2048,Re(9,{destroy:void 0,resource:void 0},se.bind(null,t,o,l,e),null),l},useId:function(){var n=ne(),e=Nc.identifierPrefix
if(sa){var l=ta
e="\xab"+e+"R"+(l=(ra&~(1<<32-Ti(ra)-1)).toString(32)+l),0<(l=ec++)&&(e+="H"+l.toString(32)),e+="\xbb"}else e="\xab"+e+"r"+(l=tc++).toString(32)+"\xbb"
return n.memoizedState=e},useHostTransitionStatus:Ge,useFormState:Se,useActionState:Se,useOptimistic:function(n){var e=ne()
e.memoizedState=e.baseState=n
var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return e.queue=l,e=nl.bind(null,Ya,!0,l),l.dispatch=e,[n,e]},useMemoCache:te,useCacheRefresh:function(){return ne().memoizedState=Ke.bind(null,Ya)}},ic={readContext:ln,use:re,useCallback:He,useContext:ln,useEffect:Ae,useImperativeHandle:De,useInsertionEffect:Fe,useLayoutEffect:_e,useMemo:qe,useReducer:oe,useRef:Te,useState:function(){return oe(ue)},useDebugValue:Be,useDeferredValue:function(n,e){return $e(ee(),Ka.memoizedState,n,e)},useTransition:function(){var n=oe(ue)[0],e=ee().memoizedState
return["boolean"==typeof n?n:le(n),e]},useSyncExternalStore:ce,useId:Qe,useHostTransitionStatus:Ge,useFormState:Ce,useActionState:Ce,useOptimistic:function(n,e){return ye(ee(),0,n,e)},useMemoCache:te,useCacheRefresh:Ye},ac={readContext:ln,use:re,useCallback:He,useContext:ln,useEffect:Ae,useImperativeHandle:De,useInsertionEffect:Fe,useLayoutEffect:_e,useMemo:qe,useReducer:ae,useRef:Te,useState:function(){return ae(ue)},useDebugValue:Be,useDeferredValue:function(n,e){var l=ee()
return null===Ka?Ue(l,n,e):$e(l,Ka.memoizedState,n,e)},useTransition:function(){var n=ae(ue)[0],e=ee().memoizedState
return["boolean"==typeof n?n:le(n),e]},useSyncExternalStore:ce,useId:Qe,useHostTransitionStatus:Ge,useFormState:Pe,useActionState:Pe,useOptimistic:function(n,e){var l=ee()
return null!==Ka?ye(l,0,n,e):(l.baseState=n,[n,l.queue.dispatch])},useMemoCache:te,useCacheRefresh:Ye},cc=null,fc=0,sc=al(!0),vc=al(!1),dc=s(null),pc=null,hc=s(0),yc={enqueueSetState:function(n,e,l){n=n.p
var r=Xr(),t=An(r)
t.payload=e,null!=l&&(t.callback=l),null!==(e=Fn(n,t,r))&&(Zr(e,0,r),_n(e,n,r))},enqueueReplaceState:function(n,e,l){n=n.p
var r=Xr(),t=An(r)
t.tag=1,t.payload=e,null!=l&&(t.callback=l),null!==(e=Fn(n,t,r))&&(Zr(e,0,r),_n(e,n,r))},enqueueForceUpdate:function(n,e){n=n.p
var l=Xr(),r=An(l)
r.tag=2,null!=e&&(r.callback=e),null!==(e=Fn(n,r,l))&&(Zr(e,0,l),_n(e,n,l))}},bc="function"==typeof reportError?reportError:function(n){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof n&&null!==n&&"string"==typeof n.message?String(n.message):String(n),error:n})
if(!window.dispatchEvent(e))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",n),void 0
void 0},wc=Error(r(461)),mc=!1,kc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},gc=!1,xc=!1,Ec=!1,Sc="function"==typeof WeakSet?WeakSet:Set,Cc=null,Mc=null,jc=!1,Pc=null,Rc=8192,Tc={getCacheForType:function(n){var e=ln(xa),l=e.data.get(n)
return void 0===l&&(l=n(),e.data.set(n,l)),l}},Ic=0,zc=1,Oc=2,Ac=3,Fc=4
if("function"==typeof Symbol&&Symbol.for){var _c=Symbol.for
Ic=_c("selector.component"),zc=_c("selector.has_pseudo_class"),Oc=_c("selector.role"),Ac=_c("selector.test_id"),Fc=_c("selector.text")}var Lc="function"==typeof WeakMap?WeakMap:Map,Dc=0,Nc=null,Bc=null,Hc=0,qc=0,Uc=null,$c=!1,Vc=!1,Wc=!1,Gc=0,Qc=0,Yc=0,Kc=0,Xc=0,Jc=0,Zc=0,nf=null,ef=null,lf=!1,rf=0,tf=1/0,uf=null,of=null,af=0,cf=null,ff=null,sf=0,vf=0,df=null,pf=null,hf=0,yf=null
return Xt.attemptContinuousHydration=function(n){if(13===n.tag){var e=Rn(n,67108864)
null!==e&&Zr(e,0,67108864),Qt(n,67108864)}},Xt.attemptHydrationAtCurrentPriority=function(n){if(13===n.tag){var e=Xr(),l=Rn(n,e=S(e))
null!==l&&Zr(l,0,e),Qt(n,e)}},Xt.attemptSynchronousHydration=function(n){switch(n.tag){case 3:if((n=n.stateNode).current.memoizedState.isDehydrated){var e=p(n.pendingLanes)
if(0!==e){for(n.pendingLanes|=2,n.entangledLanes|=2;e;){var l=1<<31-Ti(e)
n.entanglements[1]|=l,e&=~l}an(n),!(6&Dc)&&(tf=Ni()+500,cn(0))}}break
case 13:null!==(e=Rn(n,2))&&Zr(e,0,2),tt(),Qt(n,2)}},Xt.batchedUpdates=function(n,e){return n(e)},Xt.createComponentSelector=function(n){return{$$typeof:Ic,value:n}},Xt.createContainer=function(n,e,l,r,t,u,o,i,a,c){return Ut(n,e,!1,null,0,r,u,o,i,a,0,null)},Xt.createHasPseudoClassSelector=function(n){return{$$typeof:zc,value:n}},Xt.createHydrationContainer=function(n,e,l,r,t,u,o,i,a,c,f,s,v){return(n=Ut(l,r,!0,n,0,u,i,a,c,f,0,v)).context=$t(null),l=n.current,(t=An(r=S(r=Xr()))).callback=null!=e?e:null,Fn(l,t,r),e=r,n.current.lanes=e,g(n,e),an(n),n},Xt.createPortal=function(n,e,l){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:ru,key:null==r?null:""+r,children:n,containerInfo:e,implementation:l}},Xt.createRoleSelector=function(n){return{$$typeof:Oc,value:n}},Xt.createTestNameSelector=function(n){return{$$typeof:Ac,value:n}},Xt.createTextSelector=function(n){return{$$typeof:Fc,value:n}},Xt.defaultOnCaughtError=function(n){void 0},Xt.defaultOnRecoverableError=function(n){bc(n)},Xt.defaultOnUncaughtError=function(n){bc(n)},Xt.deferredUpdates=function(n){var e=ku.T,l=$u()
try{return Uu(32),ku.T=null,n()}finally{Uu(l),ku.T=e}},Xt.discreteUpdates=function(n,e,l,r,t){var u=ku.T,o=$u()
try{return Uu(2),ku.T=null,n(e,l,r,t)}finally{Uu(o),ku.T=u,0===Dc&&(tf=Ni()+500)}},Xt.findAllNodes=Kr,Xt.findBoundingRects=function(n,e){if(!to)throw Error(r(363))
e=Kr(n,e),n=[]
for(var l=0;l<e.length;l++)n.push(oo(e[l]))
for(e=n.length-1;0<e;e--)for(var t=(l=n[e]).x,u=t+l.width,o=l.y,i=o+l.height,a=e-1;0<=a;a--)if(e!==a){var c=n[a],f=c.x,s=f+c.width,v=c.y,d=v+c.height
if(t>=f&&o>=v&&u<=s&&i<=d){n.splice(e,1)
break}if(!(t!==f||l.width!==c.width||d<o||v>i)){v>o&&(c.height+=v-o,c.y=o),d<i&&(c.height=i-v),n.splice(e,1)
break}if(!(o!==v||l.height!==c.height||s<t||f>u)){f>t&&(c.width+=f-t,c.x=t),s<u&&(c.width=u-f),n.splice(e,1)
break}}return n},Xt.findHostInstance=Vt,Xt.findHostInstanceWithNoPortals=function(n){return null===(n=null!==(n=o(n))?a(n):null)?null:Su(n.stateNode)},Xt.findHostInstanceWithWarning=function(n){return Vt(n)},Xt.flushPassiveEffects=Ct,Xt.flushSyncFromReconciler=function(n){var e=Dc
Dc|=1
var l=ku.T,r=$u()
try{if(Uu(2),ku.T=null,n)return n()}finally{Uu(r),ku.T=l,!(6&(Dc=e))&&cn(0)}},Xt.flushSyncWork=tt,Xt.focusWithin=function(n,e){if(!to)throw Error(r(363))
for(e=Yr(n=Wr(n),e),e=Array.from(e),n=0;n<e.length;){var l=e[n++],t=l.tag
if(!ao(l)){if((5===t||26===t||27===t)&&fo(l.stateNode))return!0
for(l=l.child;null!==l;)e.push(l),l=l.sibling}}return!1},Xt.getFindAllNodesFailureDescription=function(n,e){if(!to)throw Error(r(363))
var l=0,t=[]
n=[Wr(n),0]
for(var u=0;u<n.length;){var o=n[u++],i=o.tag,a=n[u++],c=e[a]
if((5!==i&&26!==i&&27!==i||!ao(o))&&(Gr(o,c)&&(t.push(Qr(c)),++a>l&&(l=a)),a<e.length))for(o=o.child;null!==o;)n.push(o,a),o=o.sibling}if(l<e.length){for(n=[];l<e.length;l++)n.push(Qr(e[l]))
return"findAllNodes was able to match part of the selector:\n  "+t.join(" > ")+"\n\nNo matching component was found for:\n  "+n.join(" > ")}return null},Xt.getPublicRootInstance=function(n){if(!(n=n.current).child)return null
switch(n.child.tag){case 27:case 5:return Su(n.child.stateNode)
default:return n.child.stateNode}},Xt.injectIntoDevTools=function(){var n={bundleType:0,version:gu,rendererPackageName:xu,currentDispatcherRef:ku,reconcilerVersion:"19.1.0"}
if(null!==Eu&&(n.rendererConfig=Eu),"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)n=!1
else{var e=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(e.isDisabled||!e.supportsFiber)n=!0
else{try{Wi=e.inject(n),Gi=e}catch(l){}n=!!e.checkDCE}}return n},Xt.isAlreadyRendering=function(){return!!(6&Dc)},Xt.observeVisibleRects=function(n,e,l,t){if(!to)throw Error(r(363))
n=Kr(n,e)
var u=so(n,l,t).disconnect
return{disconnect:function(){u()}}},Xt.shouldError=function(){return null},Xt.shouldSuspend=function(){return!1},Xt.startHostTransition=function(n,e,t,u){if(5!==n.tag)throw Error(r(476))
var o=We(n).queue
Ve(n,o,e,Zu,null===t?l:function(){var e=We(n).next.queue
return Ze(n,e,{},Xr()),t(u)})},Xt.updateContainer=function(n,e,l,r){var t=e.current,u=Xr()
return Wt(t,u,n,e,l,r),u},Xt.updateContainerSync=function(n,e,l,r){return Wt(e.current,2,n,e,l,r),2},Xt},n.exports.default=n.exports,Object.defineProperty(n.exports,"P",{value:!0})),qn.exports
var n}function e(n){let e=n.root
for(;e.getState().previousRoot;)e=e.getState().previousRoot
return e}function l(n){const e=Y.useRef(n)
return Xn(()=>{e.current=n},[n]),e}function r({set:n}){return Xn(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}function t(n){var e
const l="undefined"!=typeof window?null!=(e=window.devicePixelRatio)?e:2:1
return Array.isArray(n)?Math.min(Math.max(n[0],l),n[1]):n}function u(n){var e
return null==(e=n.R)?void 0:e.root.getState()}function o(n){const e={}
for(const l in n)ne.includes(l)||(e[l]=n[l])
return e}function i(n,e,l,r){const t=n
let u=null==t?void 0:t.R
return u||(u={root:e,type:l,parent:null,children:[],props:o(r),object:t,eventCount:0,handlers:{},isHidden:!1},t&&(t.R=u)),u}function a(n,e){let l=n[e]
if(!e.includes("-"))return{root:n,key:e,target:l}
l=n
for(const t of e.split("-")){var r
e=t,n=l,l=null==(r=l)?void 0:r[e]}return{root:n,key:e,target:l}}function c(n,e){if(Zn.str(e.props.attach)){if(ee.test(e.props.attach)){const l=e.props.attach.replace(ee,""),{root:r,key:t}=a(n.object,l)
Array.isArray(r[t])||(r[t]=[])}const{root:l,key:r}=a(n.object,e.props.attach)
e.previousAttach=l[r],l[r]=e.object}else Zn.fun(e.props.attach)&&(e.previousAttach=e.props.attach(n.object,e.object))}function f(n,e){if(Zn.str(e.props.attach)){const{root:l,key:r}=a(n.object,e.props.attach),t=e.previousAttach
void 0===t?delete l[r]:l[r]=t}else null==e.previousAttach?void 0:e.previousAttach(n.object,e.object)
delete e.previousAttach}function s(n){let e=re.get(n.constructor)
try{e||(e=new n.constructor,re.set(n.constructor,e))}catch(Ne){}return e}function v(n,l){var r
const t=n.R,u=t&&e(t).getState(),o=null==t?void 0:t.eventCount
for(const e in l){let r=l[e]
if(le.includes(e))continue
if(t&&ue.test(e)){"function"==typeof r?t.handlers[e]=r:delete t.handlers[e],t.eventCount=Object.keys(t.handlers).length
continue}if(void 0===r)continue
let{root:o,key:c,target:f}=a(n,e)
if(f instanceof hn&&r instanceof hn)f.mask=r.mask
else if(f instanceof yn&&Kn(r))f.set(r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"function"==typeof f.copy&&null!=r&&r.constructor&&f.constructor===r.constructor)f.copy(r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&Array.isArray(r))"function"==typeof f.fromArray?f.fromArray(r):f.set(...r)
else if(null!==f&&"object"==typeof f&&"function"==typeof f.set&&"number"==typeof r)"function"==typeof f.setScalar?f.setScalar(r):f.set(r)
else{var i
o[c]=r,u&&!u.linear&&te.includes(c)&&null!=(i=o[c])&&i.isTexture&&o[c].format===bn&&o[c].type===wn&&(o[c].colorSpace=sn)}}if(null!=t&&t.parent&&null!=u&&u.internal&&null!=(r=t.object)&&r.isObject3D&&o!==t.eventCount){const n=t.object,e=u.internal.interaction.indexOf(n)
e>-1&&u.internal.interaction.splice(e,1),t.eventCount&&null!==n.raycast&&u.internal.interaction.push(n)}return t&&void 0===t.props.attach&&(t.object.isBufferGeometry?t.props.attach="geometry":t.object.isMaterial&&(t.props.attach="material")),t&&d(t),n}function d(n){var e
if(!n.parent)return
null==n.props.onUpdate?void 0:n.props.onUpdate(n.object)
const l=null==(e=n.root)||null==e.getState?void 0:e.getState()
l&&0===l.internal.frames&&l.invalidate()}function p(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function h(n,e,l,r){const t=l.get(e)
t&&(l.delete(e),0===l.size&&(n.delete(r),t.target.releasePointerCapture(r)))}function y(){const n=Y.useContext(ae)
if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!")
return n}function b(n=n=>n,e){return y()(n,e)}function w(n,e=0){const r=y(),t=r.getState().internal.subscribe,u=l(n)
return Xn(()=>t(u,e,r),[e,t,r]),null}function m(n){if("function"==typeof n){const e=""+ve++
return ce[e]=n,e}Object.assign(ce,n)}function k(n,e){const l=se(n),r=ce[l]
if("primitive"!==n&&!r)throw new Error(`R3F: ${l} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`)
if("primitive"===n&&!e.object)throw new Error("R3F: Primitives without 'object' are invalid!")
if(void 0!==e.args&&!Array.isArray(e.args))throw new Error("R3F: The args prop must be an array!")}function g(n){var e
n.isHidden&&(n.props.attach&&null!=(e=n.parent)&&e.object?c(n.parent,n):oe(n.object)&&!1!==n.props.visible&&(n.object.visible=!0),n.isHidden=!1,d(n))}function x(n,e,l){const r=e.root.getState()
if(n.parent||n.object===r.scene){if(!e.object){var t,u
const n=ce[se(e.type)]
e.object=null!=(t=e.props.object)?t:new n(...null!=(u=e.props.args)?u:[]),e.object.R=e}if(v(e.object,e.props),e.props.attach)c(n,e)
else if(oe(e.object)&&oe(n.object)){const r=n.object.children.indexOf(null==l?void 0:l.object)
if(l&&-1!==r){const l=n.object.children.indexOf(e.object)
if(-1!==l){n.object.children.splice(l,1)
const t=l<r?r-1:r
n.object.children.splice(t,0,e.object)}else e.object.parent=n.object,n.object.children.splice(r,0,e.object),e.object.dispatchEvent({type:"added"}),n.object.dispatchEvent({type:"childadded",child:e.object})}else n.object.add(e.object)}for(const n of e.children)x(e,n)
d(e)}}function E(n,e){e&&(e.parent=n,n.children.push(e),x(n,e))}function S(n,e,l){if(!e||!l)return
e.parent=n
const r=n.children.indexOf(l);-1!==r?n.children.splice(r,0,e):n.children.push(e),x(n,e,l)}function C(n){if("function"==typeof n.dispose){const e=()=>{try{n.dispose()}catch{}}
"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?e():Qn.unstable_scheduleCallback(Qn.unstable_IdlePriority,e)}}function M(n,l,r){if(!l)return
l.parent=null
const t=n.children.indexOf(l);-1!==t&&n.children.splice(t,1),l.props.attach?f(n,l):oe(l.object)&&oe(n.object)&&(n.object.remove(l.object),function(n,e){const{internal:l}=n.getState()
l.interaction=l.interaction.filter(n=>n!==e),l.initialHits=l.initialHits.filter(n=>n!==e),l.hovered.forEach((n,r)=>{n.eventObject!==e&&n.object!==e||l.hovered.delete(r)}),l.capturedMap.forEach((n,r)=>{h(l.capturedMap,e,n,r)})}(e(l),l.object))
const u=null!==l.props.dispose&&!1!==r
for(let e=l.children.length-1;e>=0;e--)M(l,l.children[e],u)
l.children.length=0,delete l.object.R,u&&"primitive"!==l.type&&"Scene"!==l.object.type&&C(l.object),void 0===r&&d(l)}function j(n,e){for(const l of[n,n.alternate])if(null!==l)if("function"==typeof l.ref){null==l.refCleanup?void 0:l.refCleanup()
const n=l.ref(e)
"function"==typeof n&&(l.refCleanup=n)}else l.ref&&(l.ref.current=e)}function P({store:n,children:e,onCreated:l,rootElement:r}){return Xn(()=>{const e=n.getState()
e.set(n=>({internal:{...n.internal,active:!0}})),l&&l(e),n.getState().events.connected||null==e.events.connect||e.events.connect(r)},[]),V.jsx(ae.Provider,{value:n,children:e})}function R(n,e){const l=we.get(n),r=null==l?void 0:l.fiber
if(r){const e=null==l?void 0:l.store.getState()
e&&(e.internal.active=!1),be.updateContainer(null,r,null,()=>{e&&setTimeout(()=>{try{var l,r,t,u
null==e.events.disconnect?void 0:e.events.disconnect(),null==(l=e.gl)||null==(r=l.renderLists)||null==r.dispose||r.dispose(),null==(t=e.gl)||null==t.forceContextLoss||t.forceContextLoss(),null!=(u=e.gl)&&u.xr&&e.xr.disconnect(),function(n){"Scene"!==n.type&&(null==n.dispose?void 0:n.dispose())
for(const e in n){const l=n[e]
"Scene"!==(null==l?void 0:l.type)&&(null==l||null==l.dispose?void 0:l.dispose())}}(e.scene),we.delete(n)}catch(Ne){}},500)})}}function T(n,e){if(n.size)for(const{callback:l}of n.values())l(e)}function I(n,e){switch(n){case"before":return T(ke,e)
case"after":return T(ge,e)
case"tail":return T(xe,e)}}function z(n,e,l){let r=e.clock.getDelta()
"never"===e.frameloop&&"number"==typeof n&&(r=n-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=n),Ee=e.internal.subscribers
for(let t=0;t<Ee.length;t++)Se=Ee[t],Se.ref.current(Se.store.getState(),r,l)
return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),"always"===e.frameloop?1:e.internal.frames}function O(n){Me=requestAnimationFrame(O),Pe=!0,Ce=0,I("before",n),Re=!0
for(const l of we.values()){var e
je=l.store.getState(),!je.internal.active||!("always"===je.frameloop||je.internal.frames>0)||null!=(e=je.gl.xr)&&e.isPresenting||(Ce+=z(n,je))}if(Re=!1,I("after",n),0===Ce)return I("tail",n),Pe=!1,cancelAnimationFrame(Me)}function A(n,e=1){var l
if(!n)return we.forEach(n=>A(n.store.getState(),e))
null!=(l=n.gl.xr)&&l.isPresenting||!n.internal.active||"never"===n.frameloop||(n.internal.frames=e>1?Math.min(60,n.internal.frames+e):Re?2:1,Pe||(Pe=!0,requestAnimationFrame(O)))}function F(n,e=!0,l,r){if(e&&I("before",n),l)z(n,l,r)
else for(const t of we.values())z(n,t.store.getState())
e&&I("after",n)}function _(n){const{handlePointer:e}=function(n){function e(n){return n.filter(n=>["Move","Over","Enter","Out","Leave"].some(e=>{var l
return null==(l=n.R)?void 0:l.handlers["onPointer"+e]}))}function l(e){const{internal:l}=n.getState()
for(const n of l.hovered.values())if(!e.length||!e.find(e=>e.object===n.object&&e.index===n.index&&e.instanceId===n.instanceId)){const r=n.eventObject.R
if(l.hovered.delete(p(n)),null!=r&&r.eventCount){const l=r.handlers,t={...n,intersections:e}
null==l.onPointerOut?void 0:l.onPointerOut(t),null==l.onPointerLeave||l.onPointerLeave(t)}}}function r(n,e){for(let l=0;l<e.length;l++){const r=e[l].R
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
null!=(c=e.R)&&c.eventCount&&o.push({...n,eventObject:e}),e=e.parent}}if("pointerId"in e&&r.internal.capturedMap.has(e.pointerId))for(let n of r.internal.capturedMap.get(e.pointerId).values())t.has(p(n.intersection))||o.push(n.intersection)
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
if(t(w),!0===o.stopped)break}}}}(s,o,v,function(n){const e=n.eventObject,l=e.R
if(null==l||!l.eventCount)return
const u=l.handlers
if(c){if(u.onPointerOver||u.onPointerEnter||u.onPointerOut||u.onPointerLeave){const e=p(n),l=a.hovered.get(e)
l?l.stopped&&n.stopPropagation():(a.hovered.set(e,n),null==u.onPointerOver||u.onPointerOver(n),null==u.onPointerEnter||u.onPointerEnter(n))}null==u.onPointerMove?void 0:u.onPointerMove(n)}else{const l=u[t]
l?f&&!a.initialHits.includes(e)||(r(o,a.interaction.filter(n=>!a.initialHits.includes(n))),l(n)):f&&a.initialHits.includes(e)&&r(o,a.interaction.filter(n=>!a.initialHits.includes(n)))}})}}}}(n)
return{priority:1,enabled:!0,compute(n,e,l){e.pointer.set(n.offsetX/e.size.width*2-1,-n.offsetY/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)},connected:void 0,handlers:Object.keys(Te).reduce((n,l)=>({...n,[l]:e(l)}),{}),update:()=>{var e
const{events:l,internal:r}=n.getState()
null!=(e=r.lastEvent)&&e.current&&l.handlers&&l.handlers.onPointerMove(r.lastEvent.current)},connect:e=>{const{set:l,events:r}=n.getState()
if(null==r.disconnect?void 0:r.disconnect(),l(n=>({events:{...n.events,connected:e}})),r.handlers)for(const n in r.handlers){const l=r.handlers[n],[t,u]=Te[n]
e.addEventListener(t,l,{passive:u})}},disconnect:()=>{const{set:e,events:l}=n.getState()
if(l.connected){if(l.handlers)for(const n in l.handlers){const e=l.handlers[n],[r]=Te[n]
l.connected.removeEventListener(r,e)}e(n=>({events:{...n.events,connected:void 0}}))}}}}function L(n,e){let l
return(...r)=>{window.clearTimeout(l),l=window.setTimeout(()=>n(...r),e)}}function D({debounce:n,scroll:e,polyfill:l,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){function t(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(n=>n.removeEventListener("scroll",h,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function u(){c.current.element&&(c.current.resizeObserver=new o(h),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(n=>n.addEventListener("scroll",h,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{h()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const o=l||("undefined"==typeof window?class{}:window.ResizeObserver)
if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills")
const[i,a]=Y.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=Y.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:i,orientationHandler:null}),f=n?"number"==typeof n?n:n.scroll:null,s=n?"number"==typeof n?n:n.resize:null,v=Y.useRef(!1)
Y.useEffect(()=>(v.current=!0,()=>{v.current=!1}))
const[d,p,h]=Y.useMemo(()=>{const n=()=>{if(!c.current.element)return
const{left:n,top:e,width:l,height:t,bottom:u,right:o,x:i,y:f}=c.current.element.getBoundingClientRect(),s={left:n,top:e,width:l,height:t,bottom:u,right:o,x:i,y:f}
c.current.element instanceof HTMLElement&&r&&(s.height=c.current.element.offsetHeight,s.width=c.current.element.offsetWidth),Object.freeze(s),v.current&&!ze(c.current.lastBounds,s)&&a(c.current.lastBounds=s)}
return[n,s?L(n,s):n,f?L(n,f):n]},[a,r,f,s])
return function(n,e){Y.useEffect(()=>{if(e){const e=n
return window.addEventListener("scroll",e,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",e,!0)}}},[n,e])}(h,!!e),function(n){Y.useEffect(()=>{const e=n
return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n])}(p),Y.useEffect(()=>{t(),u()},[e,h,p]),Y.useEffect(()=>t,[]),[n=>{!n||n===c.current.element||(t(),c.current.element=n,c.current.scrollContainers=N(n),u())},i,d]}function N(n){const e=[]
if(!n||n===document.body)return e
const{overflow:l,overflowX:r,overflowY:t}=window.getComputedStyle(n)
return[l,r,t].some(n=>"auto"===n||"scroll"===n)&&e.push(n),[...e,...N(n.parentElement)]}function B({ref:n,children:e,fallback:u,resize:o,style:a,gl:c,events:f=_,eventSource:s,eventPrefix:d,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,scene:C,onPointerMissed:M,onCreated:j,...T}){Y.useMemo(()=>m(En),[])
const I=function(){const n=K(),e=X()
return Y.useMemo(()=>({children:l})=>{const r=J(n,!0,n=>n.type===Y.StrictMode)?Y.StrictMode:Y.Fragment
return V.jsx(r,{children:V.jsx(e,{children:l})})},[n,e])}(),[z,O]=D({scroll:!0,debounce:{scroll:50,resize:0},...o}),L=Y.useRef(null),N=Y.useRef(null)
Y.useImperativeHandle(n,()=>L.current)
const B=l(M),[H,q]=Y.useState(!1),[U,$]=Y.useState(!1)
if(H)throw H
if(U)throw U
const W=Y.useRef(null)
Xn(()=>{const n=L.current
if(O.width>0&&O.height>0&&n){async function l(){await W.current.configure({gl:c,scene:C,events:f,shadows:p,linear:h,flat:y,legacy:b,orthographic:w,frameloop:k,dpr:g,performance:x,raycaster:E,camera:S,size:O,onPointerMissed:(...n)=>null==B.current?void 0:B.current(...n),onCreated:n=>{var e
null==n.events.connect?void 0:n.events.connect(s?(e=s)&&e.hasOwnProperty("current")?s.current:s:N.current),d&&n.setEvents({compute:(n,e)=>{const l=n[d+"X"],r=n[d+"Y"]
e.pointer.set(l/e.size.width*2-1,-r/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)}}),null==j||j(n)}}),W.current.render(V.jsx(I,{children:V.jsx(Jn,{set:$,children:V.jsx(Y.Suspense,{fallback:V.jsx(r,{set:q}),children:null!=e?e:null})})}))}W.current||(W.current=function(n){const e=we.get(n),l=null==e?void 0:e.fiber,r=null==e?void 0:e.store
e,0
const u="function"==typeof reportError?reportError:console.error,o=r||((n,e)=>{const l=pn((l,r)=>{function u(n=r().camera,e=i,l=r().size){const{width:t,height:u,top:c,left:f}=l,s=t/u
e.isVector3?a.copy(e):a.set(...e)
const v=n.getWorldPosition(o).distanceTo(a)
if(Yn(n))return{width:t/n.zoom,height:u/n.zoom,top:c,left:f,factor:1,distance:v,aspect:s}
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
if(e.width!==u.width||e.height!==u.height||r.dpr!==o){u=e,o=r.dpr,function(n,e){n.manual||(Yn(n)?(n.left=e.width/-2,n.right=e.width/2,n.top=e.height/2,n.bottom=e.height/-2):n.aspect=e.width/e.height,n.updateProjectionMatrix())}(n,e),r.dpr>0&&t.setPixelRatio(r.dpr)
const l="undefined"!=typeof HTMLCanvasElement&&t.domElement instanceof HTMLCanvasElement
t.setSize(e.width,e.height,l)}n!==i&&(i=n,a(e=>({viewport:{...e.viewport,...e.viewport.getCurrentViewport(n)}})))}),l.subscribe(e=>n(e)),l})(A,F),a=l||be.createContainer(o,Bn.ConcurrentRoot,null,!1,null,"",u,u,u,null)
let c,f
e||we.set(n,{fiber:a,store:o})
let s=!1,d=null
return{async configure(e={}){let l
d=new Promise(n=>l=n)
let{gl:r,size:u,scene:a,events:p,onCreated:h,shadows:y=!1,linear:b=!1,flat:w=!1,legacy:m=!1,orthographic:k=!1,frameloop:g="always",dpr:x=[1,2],performance:E,raycaster:S,camera:C,onPointerMissed:M}=e,j=o.getState(),P=j.gl
if(!j.gl){const e={canvas:n,powerPreference:"high-performance",antialias:!0,alpha:!0},l="function"==typeof r?await r(e):r
P=ie(l)?l:new Z({...e,...r}),j.set({gl:P})}let R=j.raycaster
R||j.set({raycaster:R=new nn})
const{params:T,...I}=S||{}
if(Zn.equ(I,R,me)||v(R,{...I}),Zn.equ(T,R.params,me)||v(R,{params:{...R.params,...T}}),!j.camera||j.camera===f&&!Zn.equ(f,C,me)){f=C
const n=null==C?void 0:C.isCamera,e=n?C:k?new en(0,0,0,0,.1,1e3):new ln(75,0,.1,1e3)
n||(e.position.z=5,C&&(v(e,C),e.manual||("aspect"in C||"left"in C||"right"in C||"bottom"in C||"top"in C)&&(e.manual=!0,e.updateProjectionMatrix())),j.camera||null!=C&&C.rotation||e.lookAt(0,0,0)),j.set({camera:e}),R.camera=e}if(!j.scene){let n
null!=a&&a.isScene?(n=a,i(n,o,"",{})):(n=new rn,i(n,o,"",{}),a&&v(n,a)),j.set({scene:n})}p&&!j.events.handlers&&j.set({events:p(o)})
const z=function(n,e){if(!e&&"undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:e,height:l,top:r,left:t}=n.parentElement.getBoundingClientRect()
return{width:e,height:l,top:r,left:t}}return!e&&"undefined"!=typeof OffscreenCanvas&&n instanceof OffscreenCanvas?{width:n.width,height:n.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...e}}(n,u)
if(Zn.equ(z,j.size,me)||j.setSize(z.width,z.height,z.top,z.left),x&&j.viewport.dpr!==t(x)&&j.setDpr(x),j.frameloop!==g&&j.setFrameloop(g),j.onPointerMissed||j.set({onPointerMissed:M}),E&&!Zn.equ(E,j.performance,me)&&j.set(n=>({performance:{...n.performance,...E}})),!j.xr){var O
const n=(n,e)=>{const l=o.getState()
"never"!==l.frameloop&&F(n,!0,l,e)},e=()=>{const e=o.getState()
e.gl.xr.enabled=e.gl.xr.isPresenting,e.gl.xr.setAnimationLoop(e.gl.xr.isPresenting?n:null),e.gl.xr.isPresenting||A(e)},l={connect(){const n=o.getState().gl
n.xr.addEventListener("sessionstart",e),n.xr.addEventListener("sessionend",e)},disconnect(){const n=o.getState().gl
n.xr.removeEventListener("sessionstart",e),n.xr.removeEventListener("sessionend",e)}}
"function"==typeof(null==(O=P.xr)?void 0:O.addEventListener)&&l.connect(),j.set({xr:l})}if(P.shadowMap){const n=P.shadowMap.enabled,e=P.shadowMap.type
if(P.shadowMap.enabled=!!y,Zn.boo(y))P.shadowMap.type=tn
else if(Zn.str(y)){var _
const n={basic:an,percentage:on,soft:tn,variance:un}
P.shadowMap.type=null!=(_=n[y])?_:tn}else Zn.obj(y)&&Object.assign(P.shadowMap,y)
n===P.shadowMap.enabled&&e===P.shadowMap.type||(P.shadowMap.needsUpdate=!0)}return cn.enabled=!m,s||(P.outputColorSpace=b?fn:sn,P.toneMapping=w?vn:dn),j.legacy!==m&&j.set(()=>({legacy:m})),j.linear!==b&&j.set(()=>({linear:b})),j.flat!==w&&j.set(()=>({flat:w})),!r||Zn.fun(r)||ie(r)||Zn.equ(r,P,me)||v(P,r),c=h,s=!0,l(),this},render(e){return s||d||this.configure(),d.then(()=>{be.updateContainer(V.jsx(P,{store:o,children:e,onCreated:c,rootElement:n}),a,null,()=>{})}),o},unmount(){R(n)}}}(n)),l()}}),Y.useEffect(()=>{const n=L.current
if(n)return()=>R(n)},[])
const G=s?"none":"auto"
return V.jsx("div",{ref:N,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:G,...a},...T,children:V.jsx("div",{ref:z,style:{width:"100%",height:"100%"},children:V.jsx("canvas",{ref:L,style:{display:"block"},children:u})})})}function H(n){return V.jsx(xn,{children:V.jsx(B,{...n})})}function q({waveSpeed:n,waveFrequency:e,waveAmplitude:l,waveColor:r,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a}){const c=Y.useRef(null),f=Y.useRef(new kn)
let s,v,d
try{const n=b()
s=n.viewport,v=n.size,d=n.gl}catch(y){return void 0,null}const p=Y.useRef({time:new On(0),resolution:new On(new kn(0,0)),waveSpeed:new On(n),waveFrequency:new On(e),waveAmplitude:new On(l),waveColor:new On(new yn(...r)),mousePos:new On(new kn(0,0)),enableMouseInteraction:new On(i?1:0),mouseRadius:new On(a)})
Y.useEffect(()=>{const n=d.getPixelRatio(),e=Math.floor(v.width*n),l=Math.floor(v.height*n),r=p.current.resolution.value
r.x===e&&r.y===l||r.set(e,l)},[v,d])
const h=Y.useRef([...r])
return w(({clock:t})=>{const u=p.current
o||(u.time.value=t.getElapsedTime()),u.waveSpeed.value!==n&&(u.waveSpeed.value=n),u.waveFrequency.value!==e&&(u.waveFrequency.value=e),u.waveAmplitude.value!==l&&(u.waveAmplitude.value=l),h.current.every((n,e)=>n===r[e])||(u.waveColor.value.set(...r),h.current=[...r]),u.enableMouseInteraction.value=i?1:0,u.mouseRadius.value=a,i&&u.mousePos.value.copy(f.current)}),V.jsxs(V.Fragment,{children:[V.jsxs("mesh",{ref:c,scale:[s.width,s.height,1],children:[V.jsx("planeGeometry",{args:[1,1]}),V.jsx("shaderMaterial",{vertexShader:"\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n",fragmentShader:"\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n",uniforms:p.current})]}),V.jsx(Y.Suspense,{fallback:null,children:V.jsx(Fe,{children:V.jsx(Be,{colorNum:t,pixelSize:u})})}),V.jsxs("mesh",{onPointerMove:n=>{if(!i)return
const e=d.domElement.getBoundingClientRect(),l=d.getPixelRatio()
f.current.set((n.clientX-e.left)*l,(n.clientY-e.top)*l)},position:[0,0,.01],scale:[s.width,s.height,1],visible:!1,children:[V.jsx("planeGeometry",{args:[1,1]}),V.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function U({waveSpeed:n=.05,waveFrequency:e=3,waveAmplitude:l=.3,waveColor:r=[.5,.5,.5],colorNum:t=4,pixelSize:u=2,disableAnimation:o=!1,enableMouseInteraction:i=!0,mouseRadius:a=1}){return Y.useEffect(()=>{void 0},[]),V.jsx(H,{className:"dither-container",camera:{position:[0,0,6]},dpr:Math.min(window.devicePixelRatio||1,2),gl:{antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1},onCreated:n=>{n.gl.setSize(n.size.width,n.size.height)},onError:n=>{void 0},children:V.jsx(Y.Suspense,{fallback:null,children:V.jsx(q,{waveSpeed:n,waveFrequency:e,waveAmplitude:l,waveColor:r,colorNum:t,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a})})})}function $(){Y.useState(!1),Y.useEffect(()=>{void 0,void 0,navigator.userAgent,navigator.platform,navigator.vendor,navigator.language,navigator.cookieEnabled,navigator.onLine,screen.width,screen.height,screen.colorDepth,screen.pixelDepth,window.innerWidth,window.innerHeight,window.devicePixelRatio,window.location.protocol,window.location.hostname,window.location.port,performance.memory&&(performance.memory.usedJSHeapSize,performance.memory.totalJSHeapSize,performance.memory.jsHeapSizeLimit),(new Date).toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone},[])
const n=()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"}
return V.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[V.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:V.jsx(U,{waveSpeed:.05,waveFrequency:19,waveAmplitude:.51,waveColor:[.5,.5,.5],colorNum:2.5,pixelSize:3,disableAnimation:!1,enableMouseInteraction:!1,mouseRadius:.3})}),V.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 40px",borderRadius:"16px",background:"rgba(22, 22, 22, 0.12)",backdropFilter:"blur(4px)",border:"1px solid rgba(255, 255, 255, 0.06)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",maxWidth:"400px",width:"90%"},children:[V.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"24px"},children:[V.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"BOUNCE2BOUNCE",style:{height:"48px",width:"auto",cursor:"pointer",transition:"all 0.3s ease",opacity:.95,filter:"brightness(0) invert(1)"},onClick:n,onError:n=>{n.target.style.display="none",n.target.nextSibling.style.display="block"}}),V.jsx("div",{style:{display:"none",color:"rgba(255, 255, 255, 0.9)",fontSize:"18px",fontWeight:"600",letterSpacing:"0.5px"},children:"BOUNCE2BOUNCE"})]}),V.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 6rem)",fontWeight:"800",color:"rgba(255, 255, 255, 0.95)",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",textShadow:"0 2px 8px rgba(0, 0, 0, 0.2)"},children:"404"}),V.jsx("h2",{style:{fontSize:"clamp(1.25rem, 2.5vw, 1.5rem)",fontWeight:"500",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 32px 0",lineHeight:"1.2"},children:"Not Found"}),V.jsx("button",{onClick:n,style:{padding:"14px 28px",fontSize:"1rem",fontWeight:"500",color:"rgba(255, 255, 255, 0.9)",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"8px",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(2px)",transform:"translateY(0)",outline:"none"},onMouseEnter:n=>{n.target.style.background="rgba(255, 255, 255, 0.12)",n.target.style.borderColor="rgba(255, 255, 255, 0.25)",n.target.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.target.style.background="rgba(255, 255, 255, 0.08)",n.target.style.borderColor="rgba(255, 255, 255, 0.15)",n.target.style.transform="translateY(0)"},onFocus:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.3)"},onBlur:n=>{n.target.style.borderColor="rgba(255, 255, 255, 0.15)"},"aria-label":"Go back to homepage",children:"Go Home"})]})]})}import{j as V}from"./index-BO4DmF-R.js"
import{r as W,a as G,g as Q,b as Y,c as K,x as X,i as J,W as Z,d as nn,O as en,P as ln,S as rn,e as tn,V as un,f as on,B as an,C as cn,L as fn,h as sn,N as vn,A as dn,j as pn,k as hn,l as yn,m as bn,U as wn,n as mn,o as kn,p as gn,q as xn,T as En,E as Sn,H as Cn,s as Mn,t as jn,D as Pn,u as Rn,v as Tn,R as In,w as zn,y as On}from"./vendor-afizwfJS.js"
var An,Fn,_n,Ln,Dn={exports:{}},Nn={},Bn=function(){return Fn||(Fn=1,Dn.exports=function(){return An||(An=1,Nn.ConcurrentRoot=1,Nn.ContinuousEventPriority=8,Nn.DefaultEventPriority=32,Nn.DiscreteEventPriority=2,Nn.IdleEventPriority=268435456,Nn.LegacyRoot=0,Nn.NoEventPriority=0),Nn}()),Dn.exports}(),Hn={exports:{}},qn={exports:{}}
const Un=Q(function(){return Ln||(Ln=1,Hn.exports=n()),Hn.exports}())
var $n,Vn,Wn={exports:{}},Gn={},Qn=function(){return Vn||(Vn=1,Wn.exports=function(){return $n||($n=1,function(n){function e(n,e){var l=n.length
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
try{return n.apply(this,arguments)}finally{m=l}}}}(Gn)),Gn}()),Wn.exports}()
const Yn=n=>n&&n.isOrthographicCamera,Kn=n=>null!=n&&("string"==typeof n||"number"==typeof n||n.isColor),Xn=((n,e)=>"undefined"!=typeof window&&((null==(n=window.document)?void 0:n.createElement)||"ReactNative"===(null==(e=window.navigator)?void 0:e.product)))()?Y.useLayoutEffect:Y.useEffect,Jn=(n=>((n=class extends Y.Component{constructor(...n){super(...n),this.state={error:!1}}componentDidCatch(n){this.props.set(n)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),n))(),Zn={obj:n=>n===Object(n)&&!Zn.arr(n)&&"function"!=typeof n,fun:n=>"function"==typeof n,str:n=>"string"==typeof n,num:n=>"number"==typeof n,boo:n=>"boolean"==typeof n,und:n=>void 0===n,nul:n=>null===n,arr:n=>Array.isArray(n),equ(n,e,{arrays:l="shallow",objects:r="reference",strict:t=!0}={}){if(typeof n!=typeof e||!!n!=!!e)return!1
if(Zn.str(n)||Zn.num(n)||Zn.boo(n))return n===e
const u=Zn.obj(n)
if(u&&"reference"===r)return n===e
const o=Zn.arr(n)
if(o&&"reference"===l)return n===e
if((o||u)&&n===e)return!0
let i
for(i in n)if(!(i in e))return!1
if(u&&"shallow"===l&&"shallow"===r){for(i in t?e:n)if(!Zn.equ(n[i],e[i],{strict:t,objects:"reference"}))return!1}else for(i in t?e:n)if(n[i]!==e[i])return!1
if(Zn.und(i)){if(o&&0===n.length&&0===e.length)return!0
if(u&&0===Object.keys(n).length&&0===Object.keys(e).length)return!0
if(n!==e)return!1}return!0}},ne=["children","key","ref"],ee=/-\d+$/,le=[...ne,"args","dispose","attach","object","onUpdate","dispose"],re=new Map,te=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],ue=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/,oe=n=>null==n?void 0:n.isObject3D,ie=n=>!(null==n||!n.render),ae=Y.createContext(null),ce={},fe=/^three(?=[A-Z])/,se=n=>`${n[0].toUpperCase()}${n.slice(1)}`
let ve=0
const de=[],pe=()=>{},he={}
let ye=0
const be=function(n){const e=Un(n)
return e.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:Y.version}),e}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(n,e,l){var r
return k(n=se(n)in ce?n:n.replace(fe,""),e),"primitive"===n&&null!=(r=e.object)&&r.R&&delete e.object.R,i(e.object,l,n,e)},removeChild:M,appendChild:E,appendInitialChild:E,insertBefore:S,appendChildToContainer(n,e){const l=n.getState().scene.R
e&&l&&E(l,e)},removeChildFromContainer(n,e){const l=n.getState().scene.R
e&&l&&M(l,e)},insertInContainerBefore(n,e,l){const r=n.getState().scene.R
e&&l&&r&&S(r,e,l)},getRootHostContext:()=>he,getChildHostContext:()=>he,commitUpdate(n,e,l,r,t){var u,o,i
k(e,r)
let p=!1
if(("primitive"===n.type&&l.object!==r.object||(null==(u=r.args)?void 0:u.length)!==(null==(o=l.args)?void 0:o.length)||null!=(i=r.args)&&i.some((n,e)=>{var r
return n!==(null==(r=l.args)?void 0:r[e])}))&&(p=!0),p)de.push([n,{...r},t])
else{const e=function(n,e){const l={}
for(const r in e)if(!le.includes(r)&&!Zn.equ(e[r],n.props[r])){l[r]=e[r]
for(const n in e)n.startsWith(`${r}-`)&&(l[n]=e[n])}for(const r in n.props){if(le.includes(r)||e.hasOwnProperty(r))continue
const{root:t,key:u}=a(n.object,r)
if(t.constructor&&0===t.constructor.length){const n=s(t)
Zn.und(n)||(l[u]=n[u])}else l[u]=0}return l}(n,r)
Object.keys(e).length&&(Object.assign(n.props,e),v(n.object,e))}!(null!==t.sibling&&4&t.flags||function(){for(const[l]of de){const n=l.parent
if(n){l.props.attach?f(n,l):oe(l.object)&&oe(n.object)&&n.object.remove(l.object)
for(const n of l.children)n.props.attach?f(l,n):oe(n.object)&&oe(l.object)&&l.object.remove(n.object)}l.isHidden&&g(l),l.object.R&&delete l.object.R,"primitive"!==l.type&&C(l.object)}for(const[l,r,t]of de){l.props=r
const u=l.parent
if(u){var n,e
const r=ce[se(l.type)]
l.object=null!=(n=l.props.object)?n:new r(...null!=(e=l.props.args)?e:[]),l.object.R=l,j(t,l.object),v(l.object,l.props),l.props.attach?c(u,l):oe(l.object)&&oe(u.object)&&u.object.add(l.object)
for(const n of l.children)n.props.attach?c(l,n):oe(n.object)&&oe(l.object)&&l.object.add(n.object)
d(l)}}de.length=0}())},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:n=>null==n?void 0:n.object,prepareForCommit:()=>null,preparePortalMount:n=>i(n.getState().scene,n,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(n){var e
n.isHidden||(n.props.attach&&null!=(e=n.parent)&&e.object?f(n.parent,n):oe(n.object)&&(n.object.visible=!1),n.isHidden=!0,d(n))},unhideInstance:g,createTextInstance:pe,hideTextInstance:pe,unhideTextInstance:pe,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:Y.createContext(null),setCurrentUpdatePriority(n){ye=n},getCurrentUpdatePriority:()=>ye,resolveUpdatePriority(){var n
if(0!==ye)return ye
switch("undefined"!=typeof window&&(null==(n=window.event)?void 0:n.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Bn.DiscreteEventPriority
case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Bn.ContinuousEventPriority
default:return Bn.DefaultEventPriority}},resetFormInstance(){}}),we=new Map,me={objects:"shallow",strict:!1},ke=new Set,ge=new Set,xe=new Set
let Ee,Se,Ce,Me,je,Pe=!1,Re=!1
const Te={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]},Ie=["x","y","top","bottom","left","right","width","height"],ze=(n,e)=>Ie.every(l=>n[l]===e[l]),Oe=Y.createContext(null),Ae=n=>!(2&~n.getAttributes()),Fe=Y.memo(Y.forwardRef(({children:n,camera:e,scene:l,resolutionScale:r,enabled:t=!0,renderPriority:u=1,autoClear:o=!0,depthBuffer:i,enableNormalPass:a,stencilBuffer:c,multisampling:f=8,frameBufferType:s=Cn},v)=>{const{gl:d,scene:p,camera:h,size:y}=b(),m=l||p,k=e||h,[g,x,E]=Y.useMemo(()=>{const n=new Sn(d,{depthBuffer:i,stencilBuffer:c,multisampling:f,frameBufferType:s})
n.addPass(new Mn(m,k))
let e=null,l=null
return a&&(l=new jn(m,k),l.enabled=!1,n.addPass(l),void 0!==r&&(e=new Pn({normalBuffer:l.texture,resolutionScale:r}),e.enabled=!1,n.addPass(e))),[n,l,e]},[k,d,i,c,f,s,m,a,r])
Y.useEffect(()=>g?.setSize(y.width,y.height),[g,y]),w((n,e)=>{if(t){const n=d.autoClear
d.autoClear=o,c&&!o&&d.clearStencil(),g.render(e),d.autoClear=n}},t?u:0)
const S=Y.useRef(null)
Y.useLayoutEffect(()=>{const n=[],e=S.current.R
if(e&&g){const l=e.children
for(let e=0;e<l.length;e++){const r=l[e].object
if(r instanceof Rn){const t=[r]
if(!Ae(r)){let n=null
for(;(n=l[e+1]?.object)instanceof Rn&&!Ae(n);)t.push(n),e++}const u=new Tn(k,...t)
n.push(u)}else r instanceof zn&&n.push(r)}for(const e of n)g?.addPass(e)
x&&(x.enabled=!0),E&&(E.enabled=!0)}return()=>{for(const e of n)g?.removePass(e)
x&&(x.enabled=!1),E&&(E.enabled=!1)}},[g,n,k,x,E]),Y.useEffect(()=>{const n=d.toneMapping
return d.toneMapping=vn,()=>{d.toneMapping=n}},[d])
const C=Y.useMemo(()=>({composer:g,normalPass:x,downSamplingPass:E,resolutionScale:r,camera:k,scene:m}),[g,x,E,r,k,m])
return Y.useImperativeHandle(v,()=>g,[g]),V.jsx(Oe.Provider,{value:C,children:V.jsx("group",{ref:S,children:n})})}))
let _e=0
const Le=new WeakMap,De=(Ne=class extends Rn{constructor(){const n=new Map([["colorNum",new On(4)],["pixelSize",new On(2)]])
super("RetroEffect","\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n",{uniforms:n}),this.uniforms=n}set colorNum(n){this.uniforms.get("colorNum").value=n}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(n){this.uniforms.get("pixelSize").value=n}get pixelSize(){return this.uniforms.get("pixelSize").value}},function({blendFunction:n,opacity:e,...l}){let r=Le.get(Ne)
if(!r){const n=`@react-three/postprocessing/${Ne.name}-${_e++}`
m({[n]:Ne}),Le.set(Ne,r=n)}const t=b(n=>n.camera),u=In.useMemo(()=>[...l.args??[{...l}]],[JSON.stringify(l)])
return V.jsx(r,{camera:t,"blendMode-blendFunction":n,"blendMode-opacity-value":e,...l,args:u})})
var Ne
const Be=Y.forwardRef((n,e)=>{const{colorNum:l,pixelSize:r}=n
return V.jsx(De,{ref:e,colorNum:l,pixelSize:r})})
Be.displayName="RetroEffect"
export{$ as default}
