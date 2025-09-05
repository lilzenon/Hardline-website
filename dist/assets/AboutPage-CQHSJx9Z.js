const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-CO375bd0.js","assets/index-48F3LckJ.js","assets/index-CTSQklRg.css","assets/MobileDrawer-BptIc6-W.js"])))=>i.map(i=>d[i]);
function t(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return t}function i(t,i){t.prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i}import{r as n,j as r,u as e,R as o,_ as s}from"./index-48F3LckJ.js"
var a,u,h,f,c,l,d,p,v,g,m,x={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},w={duration:.5,overwrite:!1,delay:0},y=1e8,b=1e-8,M=2*Math.PI,F=M/4,k=0,_=Math.sqrt,C=Math.cos,S=Math.sin,R=function(t){return"string"==typeof t},O=function(t){return"function"==typeof t},T=function(t){return"number"==typeof t},A=function(t){return void 0===t},z=function(t){return"object"==typeof t},E=function(t){return!1!==t},P=function(){return"undefined"!=typeof window},I=function(t){return O(t)||R(t)},W="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},H=Array.isArray,N=/(?:-?\.?\d|\.)+/gi,B=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,U=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,j=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,D=/[+-]=-?[.\d]+/,L=/[^,'"\[\]\s]+/gi,$=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Y={},X={},q=function(t){return(X=Ft(t,Y))&&kn},G=function(t,i){},Z=function(t,i){return!i&&void 0},Q=function(t,i){return t&&(Y[t]=i)&&X&&(X[t]=i)||Y},V=function(){return 0},J={suppressEvents:!0,isStart:!0,kill:!1},K={suppressEvents:!0,kill:!1},tt={suppressEvents:!0},it={},nt=[],rt={},et={},ot={},st=30,at=[],ut="",ht=function(t){var i,n,r=t[0]
if(z(r)||O(r)||(t=[t]),!(i=(r.i||{}).harness)){for(n=at.length;n--&&!at[n].targetTest(r););i=at[n]}for(n=t.length;n--;)t[n]&&(t[n].i||(t[n].i=new Hi(t[n],i)))||t.splice(n,1)
return t},ft=function(t){return t.i||ht(ti(t))[0].i},ct=function(t,i,n){return(n=t[i])&&O(n)?t[i]():A(n)&&t.getAttribute&&t.getAttribute(i)||n},lt=function(t,i){return(t=t.split(",")).forEach(i)||t},dt=function(t){return Math.round(1e5*t)/1e5||0},pt=function(t){return Math.round(1e7*t)/1e7||0},vt=function(t,i){var n=i.charAt(0),r=parseFloat(i.substr(2))
return t=parseFloat(t),"+"===n?t+r:"-"===n?t-r:"*"===n?t*r:t/r},gt=function(t,i){for(var n=i.length,r=0;t.indexOf(i[r])<0&&++r<n;);return r<n},mt=function(){var t,i,n=nt.length,r=nt.slice(0)
for(rt={},nt.length=0,t=0;t<n;t++)(i=r[t])&&i.o&&(i.render(i.o[0],i.o[1],!0).o=0)},xt=function(t){return!!(t.l||t.M||t.add)},wt=function(t,i,n,r){nt.length&&!u&&mt(),t.render(i,n,!!(u&&i<0&&xt(t))),nt.length&&!u&&mt()},yt=function(t){var i=parseFloat(t)
return(i||0===i)&&(t+"").match(L).length<2?i:R(t)?t.trim():t},bt=function(t){return t},Mt=function(t,i){for(var n in i)n in t||(t[n]=i[n])
return t},Ft=function(t,i){for(var n in i)t[n]=i[n]
return t},kt=function t(i,n){for(var r in n)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(i[r]=z(n[r])?t(i[r]||(i[r]={}),n[r]):n[r])
return i},_t=function(t,i){var n,r={}
for(n in t)n in i||(r[n]=t[n])
return r},Ct=function(t){var i,n=t.parent||f,r=t.keyframes?(i=H(t.keyframes),function(t,n){for(var r in n)r in t||"duration"===r&&i||"ease"===r||(t[r]=n[r])}):Mt
if(E(t.inherit))for(;n;)r(t,n.vars.defaults),n=n.parent||n.F
return t},St=function(t,i,n,r,e){var o,s=t[r]
if(e)for(o=i[e];s&&s[e]>o;)s=s.k
return s?(i._=s._,s._=i):(i._=t[n],t[n]=i),i._?i._.k=i:t[r]=i,i.k=s,i.parent=i.F=t,i},Rt=function(t,i,n,r){void 0===n&&(n="_first"),void 0===r&&(r="_last")
var e=i.k,o=i._
e?e._=o:t[n]===i&&(t[n]=o),o?o.k=e:t[r]===i&&(t[r]=e),i._=i.k=i.parent=null},Ot=function(t,i){t.parent&&(!i||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t.C=0},Tt=function(t,i){if(t&&(!i||i.S>t.R||i.O<0))for(var n=t;n;)n.T=1,n=n.parent
return t},At=function(t,i,n,r){return t.M&&(u?t.M.revert(K):t.vars.immediateRender&&!t.vars.autoRevert||t.M.render(i,!0,r))},zt=function t(i){return!i||i.A&&t(i.parent)},Et=function(t){return t.P?Pt(t.I,t=t.duration()+t.W)*t:0},Pt=function(t,i){var n=Math.floor(t=pt(t/i))
return t&&n===t?n-1:n},It=function(t,i){return(t-i.O)*i.A+(i.A>=0?0:i.T?i.totalDuration():i.H)},Wt=function(t){return t.S=pt(t.O+(t.H/Math.abs(t.A||t.N||b)||0))},Ht=function(t,i){var n=t.F
return n&&n.smoothChildTiming&&t.A&&(t.O=pt(n.B-(t.A>0?i/t.A:((t.T?t.totalDuration():t.H)-i)/-t.A)),Wt(t),n.T||Tt(n,t)),t},Nt=function(t,i){var n
if((i.B||!i.R&&i.l||i.O<t.B&&(i.R||!i.add))&&(n=It(t.rawTime(),i),(!i.R||Qt(0,i.totalDuration(),n)-i.I>b)&&i.render(n,!0)),Tt(t,i).F&&t.l&&t.B>=t.R&&t.A){if(t.R<t.duration())for(n=t;n.F;)n.rawTime()>=0&&n.totalTime(n.I),n=n.F
t.U=-1e-8}},Bt=function(t,i,n,r){return i.parent&&Ot(i),i.O=pt((T(n)?n:n||t!==f?qt(t,n,i):t.B)+i.j),i.S=pt(i.O+(i.totalDuration()/Math.abs(i.timeScale())||0)),St(t,i,"_first","_last",t.D?"_start":0),Lt(i)||(t.L=i),r||Nt(t,i),t.A<0&&Ht(t,t.I),t},Ut=function(t,i){return(Y.ScrollTrigger||G())&&Y.ScrollTrigger.create(i,t)},jt=function(t,i,n,r,e){return Yi(t,i,e),t.l?!n&&t.$&&!u&&(t.R&&!1!==t.vars.lazy||!t.R&&t.vars.lazy)&&v!==ki.frame?(nt.push(t),t.o=[e,r],1):void 0:1},Dt=function t(i){var n=i.parent
return n&&n.A&&n.l&&!n.Y&&(n.rawTime()<0||t(n))},Lt=function(t){var i=t.data
return"isFromStart"===i||"isStart"===i},$t=function(t,i,n,r){var e=t.P,o=pt(i)||0,s=t.I/t.H
return s&&!r&&(t.B*=o/t.R),t.R=o,t.H=e?e<0?1e10:pt(o*(e+1)+t.W*e):o,s>0&&!r&&Ht(t,t.I=t.H*s),t.parent&&Wt(t),n||Tt(t.parent,t),t},Yt=function(t){return t instanceof Bi?Tt(t):$t(t,t.R)},Xt={O:0,endTime:V,totalDuration:V},qt=function t(i,n,r){var e,o,s,a=i.labels,u=i.L||Xt,h=i.duration()>=y?u.endTime(!1):i.R
return R(n)&&(isNaN(n)||n in a)?(o=n.charAt(0),s="%"===n.substr(-1),e=n.indexOf("="),"<"===o||">"===o?(e>=0&&(n=n.replace(/=/,"")),("<"===o?u.O:u.endTime(u.P>=0))+(parseFloat(n.substr(1))||0)*(s?(e<0?u:r).totalDuration()/100:1)):e<0?(n in a||(a[n]=h),a[n]):(o=parseFloat(n.charAt(e-1)+n.substr(e+1)),s&&r&&(o=o/100*(H(r)?r[0]:r).totalDuration()),e>1?t(i,n.substr(0,e-1),r)+o:h+o)):null==n?h:+n},Gt=function(t,i,n){var r,e,o=T(i[1]),s=(o?2:1)+(t<2?0:1),a=i[s]
if(o&&(a.duration=i[1]),a.parent=n,t){for(r=a,e=n;e&&!("immediateRender"in r);)r=e.vars.defaults||{},e=E(e.vars.inherit)&&e.parent
a.immediateRender=E(r.immediateRender),t<2?a.runBackwards=1:a.startAt=i[s-1]}return new Qi(i[0],a,i[s+1])},Zt=function(t,i){return t||0===t?i(t):i},Qt=function(t,i,n){return n<t?t:n>i?i:n},Vt=function(t,i){return R(t)&&(i=$.exec(t))?i[1]:""},Jt=[].slice,Kt=function(t,i){return t&&z(t)&&"length"in t&&(!i&&!t.length||t.length-1 in t&&z(t[0]))&&!t.nodeType&&t!==c},ti=function(t,i,n){return h&&!i&&h.selector?h.selector(t):!R(t)||n||!l&&_i()?H(t)?function(t,i,n){return void 0===n&&(n=[]),t.forEach(function(t){var r
return R(t)&&!i||Kt(t,1)?(r=n).push.apply(r,ti(t)):n.push(t)})||n}(t,n):Kt(t)?Jt.call(t,0):t?[t]:[]:Jt.call((i||d).querySelectorAll(t),0)},ii=function(t){return t=ti(t)[0]||Z()||{},function(i){var n=t.current||t.nativeElement||t
return ti(i,n.querySelectorAll?n:n===t?Z()||d.createElement("div"):t)}},ni=function(t){return t.sort(function(){return.5-Math.random()})},ri=function(t){if(O(t))return t
var i=z(t)?t:{each:t},n=zi(i.ease),r=i.from||0,e=parseFloat(i.base)||0,o={},s=r>0&&r<1,a=isNaN(r)||s,u=i.axis,h=r,f=r
return R(r)?h=f={center:.5,edges:.5,end:1}[r]||0:!s&&a&&(h=r[0],f=r[1]),function(t,s,c){var l,d,p,v,g,m,x,w,b,M=(c||i).length,F=o[M]
if(!F){if(!(b="auto"===i.grid?0:(i.grid||[1,y])[1])){for(x=-1e8;x<(x=c[b++].getBoundingClientRect().left)&&b<M;);b<M&&b--}for(F=o[M]=[],l=a?Math.min(b,M)*h-.5:r%b,d=b===y?0:a?M*f/b-.5:r/b|0,x=0,w=y,m=0;m<M;m++)p=m%b-l,v=d-(m/b|0),F[m]=g=u?Math.abs("y"===u?v:p):_(p*p+v*v),g>x&&(x=g),g<w&&(w=g)
"random"===r&&ni(F),F.max=x-w,F.min=w,F.v=M=(parseFloat(i.amount)||parseFloat(i.each)*(b>M?M-1:u?"y"===u?M/b:b:Math.max(b,M/b))||0)*("edges"===r?-1:1),F.b=M<0?e-M:e,F.u=Vt(i.amount||i.each)||0,n=n&&M<0?Ti(n):n}return M=(F[t]-F.min)/F.max||0,pt(F.b+(n?n(M):M)*F.v)+F.u}},ei=function(t){var i=Math.pow(10,((t+"").split(".")[1]||"").length)
return function(n){var r=pt(Math.round(parseFloat(n)/t)*t*i)
return(r-r%1)/i+(T(n)?0:Vt(n))}},oi=function(t,i){var n,r,e=H(t)
return!e&&z(t)&&(n=e=t.radius||y,t.values?(t=ti(t.values),(r=!T(t[0]))&&(n*=n)):t=ei(t.increment)),Zt(i,e?O(t)?function(i){return r=t(i),Math.abs(r-i)<=n?r:i}:function(i){for(var e,o,s=parseFloat(r?i.x:i),a=parseFloat(r?i.y:0),u=y,h=0,f=t.length;f--;)(e=r?(e=t[f].x-s)*e+(o=t[f].y-a)*o:Math.abs(t[f]-s))<u&&(u=e,h=f)
return h=!n||u<=n?t[h]:i,r||h===i||T(i)?h:h+Vt(i)}:ei(t))},si=function(t,i,n,r){return Zt(H(t)?!i:!0===n?!!(n=0):!r,function(){return H(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(i-t+.99*n))/n)*n*r)/r})},ai=function(t,i,n){return Zt(n,function(n){return t[~~i(n)]})},ui=function(t){for(var i,n,r,e,o=0,s="";~(i=t.indexOf("random(",o));)r=t.indexOf(")",i),e="["===t.charAt(i+7),n=t.substr(i+7,r-i-7).match(e?L:N),s+=t.substr(o,i-o)+si(e?n:+n[0],e?0:+n[1],+n[2]||1e-5),o=r+1
return s+t.substr(o,t.length-o)},hi=function(t,i,n,r,e){var o=i-t,s=r-n
return Zt(e,function(i){return n+((i-t)/o*s||0)})},fi=function(t,i,n){var r,e,o,s=t.labels,a=y
for(r in s)(e=s[r]-i)<0==!!n&&e&&a>(e=Math.abs(e))&&(o=r,a=e)
return o},ci=function(t,i,n){var r,e,o,s=t.vars,a=s[i],u=h,f=t.X
if(a)return r=s[i+"Params"],e=s.callbackScope||t,n&&nt.length&&mt(),f&&(h=f),o=r?a.apply(e,r):a.call(e),h=u,o},li=function(t){return Ot(t),t.scrollTrigger&&t.scrollTrigger.kill(!!u),t.progress()<1&&ci(t,"onInterrupt"),t},di=[],pi=function(t){if(t)if(t=!t.name&&t.default||t,P()||t.headless){var i=t.name,n=O(t),r=i&&!n&&t.init?function(){this.q=[]}:t,e={init:V,render:sn,add:Li,kill:un,modifier:an,rawVars:0},o={targetTest:0,get:0,getSetter:nn,aliases:{},register:0}
if(_i(),t!==r){if(et[i])return
Mt(r,Mt(_t(t,e),o)),Ft(r.prototype,Ft(e,_t(t,o))),et[r.prop=i]=r,t.targetTest&&(at.push(r),it[i]=1),i=("css"===i?"CSS":i.charAt(0).toUpperCase()+i.substr(1))+"Plugin"}Q(i,r),t.register&&t.register(kn,r,cn)}else di.push(t)},vi=255,gi={aqua:[0,vi,vi],lime:[0,vi,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,vi],navy:[0,0,128],white:[vi,vi,vi],olive:[128,128,0],yellow:[vi,vi,0],orange:[vi,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[vi,0,0],pink:[vi,192,203],cyan:[0,vi,vi],transparent:[vi,vi,vi,0]},mi=function(t,i,n){return(6*(t+=t<0?1:t>1?-1:0)<1?i+(n-i)*t*6:t<.5?n:3*t<2?i+(n-i)*(2/3-t)*6:i)*vi+.5|0},xi=function(t,i,n){var r,e,o,s,a,u,h,f,c,l,d=t?T(t)?[t>>16,t>>8&vi,t&vi]:0:gi.black
if(!d){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),gi[t])d=gi[t]
else if("#"===t.charAt(0)){if(t.length<6&&(r=t.charAt(1),e=t.charAt(2),o=t.charAt(3),t="#"+r+r+e+e+o+o+(5===t.length?t.charAt(4)+t.charAt(4):"")),9===t.length)return[(d=parseInt(t.substr(1,6),16))>>16,d>>8&vi,d&vi,parseInt(t.substr(7),16)/255]
d=[(t=parseInt(t.substr(1),16))>>16,t>>8&vi,t&vi]}else if("hsl"===t.substr(0,3))if(d=l=t.match(N),i){if(~t.indexOf("="))return d=t.match(B),n&&d.length<4&&(d[3]=1),d}else s=+d[0]%360/360,a=+d[1]/100,r=2*(u=+d[2]/100)-(e=u<=.5?u*(a+1):u+a-u*a),d.length>3&&(d[3]*=1),d[0]=mi(s+1/3,r,e),d[1]=mi(s,r,e),d[2]=mi(s-1/3,r,e)
else d=t.match(N)||gi.transparent
d=d.map(Number)}return i&&!l&&(r=d[0]/vi,e=d[1]/vi,o=d[2]/vi,u=((h=Math.max(r,e,o))+(f=Math.min(r,e,o)))/2,h===f?s=a=0:(c=h-f,a=u>.5?c/(2-h-f):c/(h+f),s=h===r?(e-o)/c+(e<o?6:0):h===e?(o-r)/c+2:(r-e)/c+4,s*=60),d[0]=~~(s+.5),d[1]=~~(100*a+.5),d[2]=~~(100*u+.5)),n&&d.length<4&&(d[3]=1),d},wi=function(t){var i=[],n=[],r=-1
return t.split(bi).forEach(function(t){var e=t.match(U)||[]
i.push.apply(i,e),n.push(r+=e.length+1)}),i.c=n,i},yi=function(t,i,n){var r,e,o,s,a="",u=(t+a).match(bi),h=i?"hsla(":"rgba(",f=0
if(!u)return t
if(u=u.map(function(t){return(t=xi(t,i,1))&&h+(i?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),n&&(o=wi(t),(r=n.c).join(a)!==o.c.join(a)))for(s=(e=t.replace(bi,"1").split(U)).length-1;f<s;f++)a+=e[f]+(~r.indexOf(f)?u.shift()||h+"0,0,0,0)":(o.length?o:u.length?u:n).shift())
if(!e)for(s=(e=t.split(bi)).length-1;f<s;f++)a+=e[f]+u[f]
return a+e[s]},bi=function(){var t,i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b"
for(t in gi)i+="|"+t+"\\b"
return new RegExp(i+")","gi")}(),Mi=/hsl[a]?\(/,Fi=function(t){var i,n=t.join(" ")
if(bi.lastIndex=0,bi.test(n))return i=Mi.test(n),t[1]=yi(t[1],i),t[0]=yi(t[0],i,wi(t[1])),!0},ki=function(){var t,i,n,r,e,o,s=Date.now,a=500,u=33,h=s(),f=h,v=1e3/240,g=v,x=[],w=function n(c){var l,d,p,m,w=s()-f,y=!0===c
if((w>a||w<0)&&(h+=w-u),((l=(p=(f+=w)-h)-g)>0||y)&&(m=++r.frame,e=p-1e3*r.time,r.time=p/=1e3,g+=l+(l>=v?4:v-l),d=1),y||(t=i(n)),d)for(o=0;o<x.length;o++)x[o](p,e,m,c)}
return r={time:0,frame:0,tick:function(){w(!0)},deltaRatio:function(t){return e/(1e3/(t||60))},wake:function(){p&&(!l&&P()&&(c=l=window,d=c.document||{},Y.gsap=kn,(c.gsapVersions||(c.gsapVersions=[])).push(kn.version),q(X||c.GreenSockGlobals||!c.gsap&&c||{}),di.forEach(pi)),n="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,t&&r.sleep(),i=n||function(t){return setTimeout(t,g-1e3*r.time+1|0)},m=1,w(2))},sleep:function(){(n?cancelAnimationFrame:clearTimeout)(t),m=0,i=V},lagSmoothing:function(t,i){a=t||1/0,u=Math.min(i||33,a)},fps:function(t){v=1e3/(t||240),g=1e3*r.time+v},add:function(t,i,n){var e=i?function(i,n,o,s){t(i,n,o,s),r.remove(e)}:t
return r.remove(t),x[n?"unshift":"push"](e),_i(),e},remove:function(t,i){~(i=x.indexOf(t))&&x.splice(i,1)&&o>=i&&o--},G:x}}(),_i=function(){return!m&&ki.wake()},Ci={},Si=/^[\d.\-M][\d.\-,\s]/,Ri=/["']/g,Oi=function(t){for(var i,n,r,e={},o=t.substr(1,t.length-3).split(":"),s=o[0],a=1,u=o.length;a<u;a++)n=o[a],i=a!==u-1?n.lastIndexOf(","):n.length,r=n.substr(0,i),e[s]=isNaN(r)?r.replace(Ri,"").trim():+r,s=n.substr(i+1).trim()
return e},Ti=function(t){return function(i){return 1-t(1-i)}},Ai=function t(i,n){for(var r,e=i.Z;e;)e instanceof Bi?t(e,n):!e.vars.yoyoEase||e.V&&e.P||e.V===n||(e.timeline?t(e.timeline,n):(r=e.J,e.J=e.K,e.K=r,e.V=n)),e=e._},zi=function(t,i){return t&&(O(t)?t:Ci[t]||function(t){var i=(t+"").split("("),n=Ci[i[0]]
return n&&i.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Oi(i[1])]:function(t){var i=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",i)
return t.substring(i,~r&&r<n?t.indexOf(")",n+1):n)}(t).split(",").map(yt)):Ci.tt&&Si.test(t)?Ci.tt("",t):n}(t))||i},Ei=function(t,i,n,r){void 0===n&&(n=function(t){return 1-i(1-t)}),void 0===r&&(r=function(t){return t<.5?i(2*t)/2:1-i(2*(1-t))/2})
var e,o={easeIn:i,easeOut:n,easeInOut:r}
return lt(t,function(t){for(var i in Ci[t]=Y[t]=o,Ci[e=t.toLowerCase()]=n,o)Ci[e+("easeIn"===i?".in":"easeOut"===i?".out":".inOut")]=Ci[t+"."+i]=o[i]}),o},Pi=function(t){return function(i){return i<.5?(1-t(1-2*i))/2:.5+t(2*(i-.5))/2}},Ii=function t(i,n,r){var e=n>=1?n:1,o=(r||(i?.3:.45))/(n<1?n:1),s=o/M*(Math.asin(1/e)||0),a=function(t){return 1===t?1:e*Math.pow(2,-10*t)*S((t-s)*o)+1},u="out"===i?a:"in"===i?function(t){return 1-a(1-t)}:Pi(a)
return o=M/o,u.config=function(n,r){return t(i,n,r)},u},Wi=function t(i,n){void 0===n&&(n=1.70158)
var r=function(t){return t?--t*t*((n+1)*t+n)+1:0},e="out"===i?r:"in"===i?function(t){return 1-r(1-t)}:Pi(r)
return e.config=function(n){return t(i,n)},e}
lt("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,i){var n=i<5?i+1:i
Ei(t+",Power"+(n-1),i?function(t){return Math.pow(t,n)}:function(t){return t},function(t){return 1-Math.pow(1-t,n)},function(t){return t<.5?Math.pow(2*t,n)/2:1-Math.pow(2*(1-t),n)/2})}),Ci.Linear.easeNone=Ci.none=Ci.Linear.easeIn,Ei("Elastic",Ii("in"),Ii("out"),Ii()),function(t,i){var n=1/i,r=2*n,e=2.5*n,o=function(o){return o<n?t*o*o:o<r?t*Math.pow(o-1.5/i,2)+.75:o<e?t*(o-=2.25/i)*o+.9375:t*Math.pow(o-2.625/i,2)+.984375}
Ei("Bounce",function(t){return 1-o(1-t)},o)}(7.5625,2.75),Ei("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)}),Ei("Circ",function(t){return-(_(1-t*t)-1)}),Ei("Sine",function(t){return 1===t?1:1-C(t*F)}),Ei("Back",Wi("in"),Wi("out"),Wi()),Ci.SteppedEase=Ci.steps=Y.SteppedEase={config:function(t,i){void 0===t&&(t=1)
var n=1/t,r=t+(i?0:1),e=i?1:0
return function(t){return((r*Qt(0,.99999999,t)|0)+e)*n}}},w.ease=Ci["quad.out"],lt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return ut+=t+","+t+"Params,"})
var Hi=function(t,i){this.id=k++,t.i=this,this.target=t,this.harness=i,this.get=i?i.get:ct,this.set=i?i.getSetter:nn},Ni=function(){function t(t){this.vars=t,this.j=+t.delay||0,(this.P=t.repeat===1/0?-2:t.repeat||0)&&(this.W=t.repeatDelay||0,this.V=!!t.yoyo||!!t.yoyoEase),this.A=1,$t(this,+t.duration,1,1),this.data=t.data,h&&(this.X=h,h.data.push(this)),m||ki.wake()}var i=t.prototype
return i.delay=function(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this.O+t-this.j),this.j=t,this):this.j},i.duration=function(t){return arguments.length?this.totalDuration(this.P>0?t+(t+this.W)*this.P:t):this.totalDuration()&&this.R},i.totalDuration=function(t){return arguments.length?(this.T=0,$t(this,this.P<0?t:(t-this.P*this.W)/(this.P+1))):this.H},i.totalTime=function(t,i){if(_i(),!arguments.length)return this.I
var n=this.F
if(n&&n.smoothChildTiming&&this.A){for(Ht(this,t),!n.F||n.parent||Nt(n,this);n&&n.parent;)n.parent.B!==n.O+(n.A>=0?n.I/n.A:(n.totalDuration()-n.I)/-n.A)&&n.totalTime(n.I,!0),n=n.parent
!this.parent&&this.F.autoRemoveChildren&&(this.A>0&&t<this.H||this.A<0&&t>0||!this.H&&!t)&&Bt(this.F,this,this.O-this.j)}return(this.I!==t||!this.R&&!i||this.l&&Math.abs(this.U)===b||!t&&!this.l&&(this.add||this.it))&&(this.A||(this.nt=t),wt(this,t,i)),this},i.time=function(t,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Et(this))%(this.R+this.W)||(t?this.R:0),i):this.B},i.totalProgress=function(t,i){return arguments.length?this.totalTime(this.totalDuration()*t,i):this.totalDuration()?Math.min(1,this.I/this.H):this.rawTime()>=0&&this.l?1:0},i.progress=function(t,i){return arguments.length?this.totalTime(this.duration()*(!this.V||1&this.iteration()?t:1-t)+Et(this),i):this.duration()?Math.min(1,this.B/this.R):this.rawTime()>0?1:0},i.iteration=function(t,i){var n=this.duration()+this.W
return arguments.length?this.totalTime(this.B+(t-1)*n,i):this.P?Pt(this.I,n)+1:1},i.timeScale=function(t,i){if(!arguments.length)return-1e-8===this.N?0:this.N
if(this.N===t)return this
var n=this.parent&&this.A?It(this.parent.B,this):this.I
return this.N=+t||0,this.A=this.rt||-1e-8===t?0:this.N,this.totalTime(Qt(-Math.abs(this.j),this.totalDuration(),n),!1!==i),Wt(this),function(t){for(var i=t.parent;i&&i.parent;)i.T=1,i.totalDuration(),i=i.parent
return t}(this)},i.paused=function(t){return arguments.length?(this.rt!==t&&(this.rt=t,t?(this.nt=this.I||Math.max(-this.j,this.rawTime()),this.A=this.C=0):(_i(),this.A=this.N,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this.I||this.nt,1===this.progress()&&Math.abs(this.U)!==b&&(this.I-=b)))),this):this.rt},i.startTime=function(t){if(arguments.length){this.O=t
var i=this.parent||this.F
return i&&(i.D||!this.parent)&&Bt(i,this,t-this.j),this}return this.O},i.endTime=function(t){return this.O+(E(t)?this.totalDuration():this.duration())/Math.abs(this.A||1)},i.rawTime=function(t){var i=this.parent||this.F
return i?t&&(!this.A||this.P&&this.B&&this.totalProgress()<1)?this.I%(this.R+this.W):this.A?It(i.rawTime(t),this):this.I:this.I},i.revert=function(t){void 0===t&&(t=tt)
var i=u
return u=t,xt(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),u=i,this},i.globalTime=function(t){for(var i=this,n=arguments.length?t:i.rawTime();i;)n=i.O+n/(Math.abs(i.A)||1),i=i.F
return!this.parent&&this.et?this.et.globalTime(t):n},i.repeat=function(t){return arguments.length?(this.P=t===1/0?-2:t,Yt(this)):-2===this.P?1/0:this.P},i.repeatDelay=function(t){if(arguments.length){var i=this.B
return this.W=t,Yt(this),i?this.time(i):this}return this.W},i.yoyo=function(t){return arguments.length?(this.V=t,this):this.V},i.seek=function(t,i){return this.totalTime(qt(this,t),E(i))},i.restart=function(t,i){return this.play().totalTime(t?-this.j:0,E(i)),this.R||(this.U=-1e-8),this},i.play=function(t,i){return null!=t&&this.seek(t,i),this.reversed(!1).paused(!1)},i.reverse=function(t,i){return null!=t&&this.seek(t||this.totalDuration(),i),this.reversed(!0).paused(!1)},i.pause=function(t,i){return null!=t&&this.seek(t,i),this.paused(!0)},i.resume=function(){return this.paused(!1)},i.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this.N||(t?-1e-8:0)),this):this.N<0},i.invalidate=function(){return this.l=this.C=0,this.U=-1e-8,this},i.isActive=function(){var t,i=this.parent||this.F,n=this.O
return!(i&&!(this.A&&this.l&&i.isActive()&&(t=i.rawTime(!0))>=n&&t<this.endTime(!0)-b))},i.eventCallback=function(t,i,n){var r=this.vars
return arguments.length>1?(i?(r[t]=i,n&&(r[t+"Params"]=n),"onUpdate"===t&&(this.ot=i)):delete r[t],this):r[t]},i.then=function(t){var i=this
return new Promise(function(n){var r=O(t)?t:bt,e=function(){var t=i.then
i.then=null,O(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),n(r),i.then=t}
i.l&&1===i.totalProgress()&&i.A>=0||!i.I&&i.A<0?e():i.st=e})},i.kill=function(){li(this)},t}()
Mt(Ni.prototype,{B:0,O:0,S:0,I:0,H:0,T:0,P:0,V:!1,parent:null,l:!1,W:0,A:1,F:0,ratio:0,U:-1e-8,st:0,rt:!1,N:1})
var Bi=function(n){function r(i,r){var e
return void 0===i&&(i={}),(e=n.call(this,i)||this).labels={},e.smoothChildTiming=!!i.smoothChildTiming,e.autoRemoveChildren=!!i.autoRemoveChildren,e.D=E(i.sortChildren),f&&Bt(i.parent||f,t(e),r),i.reversed&&e.reverse(),i.paused&&e.paused(!0),i.scrollTrigger&&Ut(t(e),i.scrollTrigger),e}i(r,n)
var e=r.prototype
return e.to=function(t,i,n){return Gt(0,arguments,this),this},e.from=function(t,i,n){return Gt(1,arguments,this),this},e.fromTo=function(t,i,n,r){return Gt(2,arguments,this),this},e.set=function(t,i,n){return i.duration=0,i.parent=this,Ct(i).repeatDelay||(i.repeat=0),i.immediateRender=!!i.immediateRender,new Qi(t,i,qt(this,n),1),this},e.call=function(t,i,n){return Bt(this,Qi.delayedCall(0,t,i),n)},e.staggerTo=function(t,i,n,r,e,o,s){return n.duration=i,n.stagger=n.stagger||r,n.onComplete=o,n.onCompleteParams=s,n.parent=this,new Qi(t,n,qt(this,e)),this},e.staggerFrom=function(t,i,n,r,e,o,s){return n.runBackwards=1,Ct(n).immediateRender=E(n.immediateRender),this.staggerTo(t,i,n,r,e,o,s)},e.staggerFromTo=function(t,i,n,r,e,o,s,a){return r.startAt=n,Ct(r).immediateRender=E(r.immediateRender),this.staggerTo(t,i,r,e,o,s,a)},e.render=function(t,i,n){var r,e,o,s,a,h,c,l,d,p,v,g,m=this.B,x=this.T?this.totalDuration():this.H,w=this.R,y=t<=0?0:pt(t),M=this.U<0!=t<0&&(this.l||!w)
if(this!==f&&y>x&&t>=0&&(y=x),y!==this.I||n||M){if(m!==this.B&&w&&(y+=this.B-m,t+=this.B-m),r=y,d=this.O,h=!(l=this.A),M&&(w||(m=this.U),(t||!i)&&(this.U=t)),this.P){if(v=this.V,a=w+this.W,this.P<-1&&t<0)return this.totalTime(100*a+t,i,n)
if(r=pt(y%a),y===x?(s=this.P,r=w):((s=~~(p=pt(y/a)))&&s===p&&(r=w,s--),r>w&&(r=w)),p=Pt(this.I,a),!m&&this.I&&p!==s&&this.I-p*a-this.R<=0&&(p=s),v&&1&s&&(r=w-r,g=1),s!==p&&!this.Y){var F=v&&1&p,k=F===(v&&1&s)
if(s<p&&(F=!F),m=F?0:y%w?w:y,this.Y=1,this.render(m||(g?0:pt(s*a)),i,!w).Y=0,this.I=y,!i&&this.parent&&ci(this,"onRepeat"),this.vars.repeatRefresh&&!g&&(this.invalidate().Y=1),m&&m!==this.B||h!==!this.A||this.vars.onRepeat&&!this.parent&&!this.C)return this
if(w=this.R,x=this.H,k&&(this.Y=2,m=F?w:-1e-4,this.render(m,!0),this.vars.repeatRefresh&&!g&&this.invalidate()),this.Y=0,!this.A&&!h)return this
Ai(this,g)}}if(this.ut&&!this.ht&&this.Y<2&&(c=function(t,i,n){var r
if(n>i)for(r=t.Z;r&&r.O<=n;){if("isPause"===r.data&&r.O>i)return r
r=r._}else for(r=t.ft;r&&r.O>=n;){if("isPause"===r.data&&r.O<i)return r
r=r.k}}(this,pt(m),pt(r)),c&&(y-=r-(r=c.O))),this.I=y,this.B=r,this.C=!l,this.l||(this.ot=this.vars.onUpdate,this.l=1,this.U=t,m=0),!m&&y&&!i&&!p&&(ci(this,"onStart"),this.I!==y))return this
if(r>=m&&t>=0)for(e=this.Z;e;){if(o=e._,(e.C||r>=e.O)&&e.A&&c!==e){if(e.parent!==this)return this.render(t,i,n)
if(e.render(e.A>0?(r-e.O)*e.A:(e.T?e.totalDuration():e.H)+(r-e.O)*e.A,i,n),r!==this.B||!this.A&&!h){c=0,o&&(y+=this.U=-1e-8)
break}}e=o}else{e=this.ft
for(var _=t<0?t:r;e;){if(o=e.k,(e.C||_<=e.S)&&e.A&&c!==e){if(e.parent!==this)return this.render(t,i,n)
if(e.render(e.A>0?(_-e.O)*e.A:(e.T?e.totalDuration():e.H)+(_-e.O)*e.A,i,n||u&&xt(e)),r!==this.B||!this.A&&!h){c=0,o&&(y+=this.U=_?-1e-8:b)
break}}e=o}}if(c&&!i&&(this.pause(),c.render(r>=m?0:-1e-8).U=r>=m?1:-1,this.A))return this.O=d,Wt(this),this.render(t,i,n)
this.ot&&!i&&ci(this,"onUpdate",!0),(y===x&&this.I>=this.totalDuration()||!y&&m)&&(d!==this.O&&Math.abs(l)===Math.abs(this.A)||this.Y||((t||!w)&&(y===x&&this.A>0||!y&&this.A<0)&&Ot(this,1),i||t<0&&!m||!y&&!m&&x||(ci(this,y===x&&t>=0?"onComplete":"onReverseComplete",!0),this.st&&!(y<x&&this.timeScale()>0)&&this.st())))}return this},e.add=function(t,i){var n=this
if(T(i)||(i=qt(this,i,t)),!(t instanceof Ni)){if(H(t))return t.forEach(function(t){return n.add(t,i)}),this
if(R(t))return this.addLabel(t,i)
if(!O(t))return this
t=Qi.delayedCall(0,t)}return this!==t?Bt(this,t,i):this},e.getChildren=function(t,i,n,r){void 0===t&&(t=!0),void 0===i&&(i=!0),void 0===n&&(n=!0),void 0===r&&(r=-1e8)
for(var e=[],o=this.Z;o;)o.O>=r&&(o instanceof Qi?i&&e.push(o):(n&&e.push(o),t&&e.push.apply(e,o.getChildren(!0,i,n)))),o=o._
return e},e.getById=function(t){for(var i=this.getChildren(1,1,1),n=i.length;n--;)if(i[n].vars.id===t)return i[n]},e.remove=function(t){return R(t)?this.removeLabel(t):O(t)?this.killTweensOf(t):(t.parent===this&&Rt(this,t),t===this.L&&(this.L=this.ft),Tt(this))},e.totalTime=function(t,i){return arguments.length?(this.ht=1,!this.F&&this.A&&(this.O=pt(ki.time-(this.A>0?t/this.A:(this.totalDuration()-t)/-this.A))),n.prototype.totalTime.call(this,t,i),this.ht=0,this):this.I},e.addLabel=function(t,i){return this.labels[t]=qt(this,i),this},e.removeLabel=function(t){return delete this.labels[t],this},e.addPause=function(t,i,n){var r=Qi.delayedCall(0,i||V,n)
return r.data="isPause",this.ut=1,Bt(this,r,qt(this,t))},e.removePause=function(t){var i=this.Z
for(t=qt(this,t);i;)i.O===t&&"isPause"===i.data&&Ot(i),i=i._},e.killTweensOf=function(t,i,n){for(var r=this.getTweensOf(t,n),e=r.length;e--;)Ui!==r[e]&&r[e].kill(t,i)
return this},e.getTweensOf=function(t,i){for(var n,r=[],e=ti(t),o=this.Z,s=T(i);o;)o instanceof Qi?gt(o.ct,e)&&(s?(!Ui||o.l&&o.A)&&o.globalTime(0)<=i&&o.globalTime(o.totalDuration())>i:!i||o.isActive())&&r.push(o):(n=o.getTweensOf(e,i)).length&&r.push.apply(r,n),o=o._
return r},e.tweenTo=function(t,i){i=i||{}
var n,r=this,e=qt(r,t),o=i,s=o.startAt,a=o.onStart,u=o.onStartParams,h=o.immediateRender,f=Qi.to(r,Mt({ease:i.ease||"none",lazy:!1,immediateRender:!1,time:e,overwrite:"auto",duration:i.duration||Math.abs((e-(s&&"time"in s?s.time:r.B))/r.timeScale())||b,onStart:function(){if(r.pause(),!n){var t=i.duration||Math.abs((e-(s&&"time"in s?s.time:r.B))/r.timeScale())
f.R!==t&&$t(f,t,0,1).render(f.B,!0,!0),n=1}a&&a.apply(f,u||[])}},i))
return h?f.render(0):f},e.tweenFromTo=function(t,i,n){return this.tweenTo(i,Mt({startAt:{time:qt(this,t)}},n))},e.recent=function(){return this.L},e.nextLabel=function(t){return void 0===t&&(t=this.B),fi(this,qt(this,t))},e.previousLabel=function(t){return void 0===t&&(t=this.B),fi(this,qt(this,t),1)},e.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.previousLabel(this.B+b)},e.shiftChildren=function(t,i,n){void 0===n&&(n=0)
for(var r,e=this.Z,o=this.labels;e;)e.O>=n&&(e.O+=t,e.S+=t),e=e._
if(i)for(r in o)o[r]>=n&&(o[r]+=t)
return Tt(this)},e.invalidate=function(t){var i=this.Z
for(this.Y=0;i;)i.invalidate(t),i=i._
return n.prototype.invalidate.call(this,t)},e.clear=function(t){void 0===t&&(t=!0)
for(var i,n=this.Z;n;)i=n._,this.remove(n),n=i
return this.F&&(this.B=this.I=this.nt=0),t&&(this.labels={}),Tt(this)},e.totalDuration=function(t){var i,n,r,e=0,o=this,s=o.ft,a=y
if(arguments.length)return o.timeScale((o.P<0?o.duration():o.totalDuration())/(o.reversed()?-t:t))
if(o.T){for(r=o.parent;s;)i=s.k,s.T&&s.totalDuration(),(n=s.O)>a&&o.D&&s.A&&!o.Y?(o.Y=1,Bt(o,s,n-s.j,1).Y=0):a=n,n<0&&s.A&&(e-=n,(!r&&!o.F||r&&r.smoothChildTiming)&&(o.O+=n/o.A,o.B-=n,o.I-=n),o.shiftChildren(-n,!1,-1/0),a=0),s.S>e&&s.A&&(e=s.S),s=i
$t(o,o===f&&o.B>e?o.B:e,1,1),o.T=0}return o.H},r.updateRoot=function(t){if(f.A&&(wt(f,It(t,f)),v=ki.frame),ki.frame>=st){st+=x.autoSleep||120
var i=f.Z
if((!i||!i.A)&&x.autoSleep&&ki.G.length<2){for(;i&&!i.A;)i=i._
i||ki.sleep()}}},r}(Ni)
Mt(Bi.prototype,{Y:0,ut:0,ht:0})
var Ui,ji,Di=function(t,i,n,r,e,o,s){var a,u,h,f,c,l,d,p,v=new cn(this.$,t,i,0,1,on,null,e),g=0,m=0
for(v.b=n,v.e=r,n+="",(d=~(r+="").indexOf("random("))&&(r=ui(r)),o&&(o(p=[n,r],t,i),n=p[0],r=p[1]),u=n.match(j)||[];a=j.exec(r);)f=a[0],c=r.substring(g,a.index),h?h=(h+1)%5:"rgba("===c.substr(-5)&&(h=1),f!==u[m++]&&(l=parseFloat(u[m-1])||0,v.$={_:v.$,p:c||1===m?c:",",s:l,c:"="===f.charAt(1)?vt(l,f)-l:parseFloat(f)-l,m:h&&h<4?Math.round:0},g=j.lastIndex)
return v.c=g<r.length?r.substring(g,r.length):"",v.fp=s,(D.test(r)||d)&&(v.e=0),this.$=v,v},Li=function(t,i,n,r,e,o,s,a,u,h){O(r)&&(r=r(e||0,t,o))
var f,c=t[i],l="get"!==n?n:O(c)?u?t[i.indexOf("set")||!O(t["get"+i.substr(3)])?i:"get"+i.substr(3)](u):t[i]():c,d=O(c)?u?Ki:Ji:Vi
if(R(r)&&(~r.indexOf("random(")&&(r=ui(r)),"="===r.charAt(1)&&((f=vt(l,r)+(Vt(l)||0))||0===f)&&(r=f)),!h||l!==r||ji)return isNaN(l*r)||""===r?(!c&&!(i in t)&&G(),Di.call(this,t,i,l,r,d,a||x.stringFilter,u)):(f=new cn(this.$,t,i,+l||0,r-(l||0),"boolean"==typeof c?en:rn,0,d),u&&(f.fp=u),s&&f.modifier(s,this,t),this.$=f)},$i=function(t,i,n,r,e,o){var s,a,u,h
if(et[t]&&!1!==(s=new et[t]).init(e,s.rawVars?i[t]:function(t,i,n,r,e){if(O(t)&&(t=qi(t,e,i,n,r)),!z(t)||t.style&&t.nodeType||H(t)||W(t))return R(t)?qi(t,e,i,n,r):t
var o,s={}
for(o in t)s[o]=qi(t[o],e,i,n,r)
return s}(i[t],r,e,o,n),n,r,o)&&(n.$=a=new cn(n.$,e,t,0,1,s.render,s,0,s.priority),n!==g))for(u=n.it[n.ct.indexOf(e)],h=s.q.length;h--;)u[s.q[h]]=a
return s},Yi=function t(i,n,r){var e,o,s,h,c,l,d,p,v,g,m,x,M,F=i.vars,k=F.ease,_=F.startAt,C=F.immediateRender,S=F.lazy,R=F.onUpdate,O=F.runBackwards,T=F.yoyoEase,A=F.keyframes,z=F.autoRevert,P=i.R,I=i.M,W=i.ct,H=i.parent,N=H&&"nested"===H.data?H.vars.targets:W,B="auto"===i.lt&&!a,U=i.timeline
if(U&&(!A||!k)&&(k="none"),i.J=zi(k,w.ease),i.K=T?Ti(zi(!0===T?k:T,w.ease)):0,T&&i.V&&!i.P&&(T=i.K,i.K=i.J,i.J=T),i.dt=!U&&!!F.runBackwards,!U||A&&!F.stagger){if(x=(p=W[0]?ft(W[0]).harness:0)&&F[p.prop],e=_t(F,it),I&&(I.U<0&&I.progress(1),n<0&&O&&C&&!z?I.render(-1,!0):I.revert(O&&P?K:J),I.o=0),_){if(Ot(i.M=Qi.set(W,Mt({data:"isStart",overwrite:!1,parent:H,immediateRender:!0,lazy:!I&&E(S),startAt:null,delay:0,onUpdate:R&&function(){return ci(i,"onUpdate")},stagger:0},_))),i.M.F=0,i.M.et=i,n<0&&(u||!C&&!z)&&i.M.revert(K),C&&P&&n<=0&&r<=0)return n&&(i.U=n),void 0}else if(O&&P&&!I)if(n&&(C=!1),s=Mt({overwrite:!1,data:"isFromStart",lazy:C&&!I&&E(S),immediateRender:C,stagger:0,parent:H},e),x&&(s[p.prop]=x),Ot(i.M=Qi.set(W,s)),i.M.F=0,i.M.et=i,n<0&&(u?i.M.revert(K):i.M.render(-1,!0)),i.U=n,C){if(!n)return}else t(i.M,b,b)
for(i.$=i.vt=0,S=P&&E(S)||S&&!P,o=0;o<W.length;o++){if(d=(c=W[o]).i||ht(W)[o].i,i.it[o]=g={},rt[d.id]&&nt.length&&mt(),m=N===W?o:N.indexOf(c),p&&!1!==(v=new p).init(c,x||e,i,m,N)&&(i.$=h=new cn(i.$,c,v.name,0,1,v.render,v,0,v.priority),v.q.forEach(function(t){g[t]=h}),v.priority&&(l=1)),!p||x)for(s in e)et[s]&&(v=$i(s,e,i,m,c,N))?v.priority&&(l=1):g[s]=h=Li.call(i,c,s,"get",e[s],m,N,0,F.stringFilter)
i.gt&&i.gt[o]&&i.kill(c,i.gt[o]),B&&i.$&&(Ui=i,f.killTweensOf(c,g,i.globalTime(n)),M=!i.parent,Ui=0),i.$&&S&&(rt[d.id]=1)}l&&fn(i),i.xt&&i.xt(i)}i.ot=R,i.l=(!i.gt||i.$)&&!M,A&&n<=0&&U.render(y,!0,!0)},Xi=function(t,i,n,r){var e,o,s=i.ease||r||"power1.inOut"
if(H(i))o=n[t]||(n[t]=[]),i.forEach(function(t,n){return o.push({t:n/(i.length-1)*100,v:t,e:s})})
else for(e in i)o=n[e]||(n[e]=[]),"ease"===e||o.push({t:parseFloat(t),v:i[e],e:s})},qi=function(t,i,n,r,e){return O(t)?t.call(i,n,r,e):R(t)&&~t.indexOf("random(")?ui(t):t},Gi=ut+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Zi={}
lt(Gi+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Zi[t]=1})
var Qi=function(n){function r(i,r,e,o){var s
"number"==typeof r&&(e.duration=r,r=e,e=null)
var u,h,c,l,d,p,v,g,m=(s=n.call(this,o?r:Ct(r))||this).vars,w=m.duration,y=m.delay,b=m.immediateRender,M=m.stagger,F=m.overwrite,k=m.keyframes,_=m.defaults,C=m.scrollTrigger,S=m.yoyoEase,R=r.parent||f,O=(H(i)||W(i)?T(i[0]):"length"in r)?[i]:ti(i)
if(s.ct=O.length?ht(O):Z(0,!x.nullTargetWarn)||[],s.it=[],s.lt=F,k||M||I(w)||I(y)){if(r=s.vars,(u=s.timeline=new Bi({data:"nested",defaults:_||{},targets:R&&"nested"===R.data?R.vars.targets:O})).kill(),u.parent=u.F=t(s),u.O=0,M||I(w)||I(y)){if(l=O.length,v=M&&ri(M),z(M))for(d in M)~Gi.indexOf(d)&&(g||(g={}),g[d]=M[d])
for(h=0;h<l;h++)(c=_t(r,Zi)).stagger=0,S&&(c.yoyoEase=S),g&&Ft(c,g),p=O[h],c.duration=+qi(w,t(s),h,p,O),c.delay=(+qi(y,t(s),h,p,O)||0)-s.j,!M&&1===l&&c.delay&&(s.j=y=c.delay,s.O+=y,c.delay=0),u.to(p,c,v?v(h,p,O):0),u.J=Ci.none
u.duration()?w=y=0:s.timeline=0}else if(k){Ct(Mt(u.vars.defaults,{ease:"none"})),u.J=zi(k.ease||r.ease||"none")
var A,P,N,B=0
if(H(k))k.forEach(function(t){return u.to(O,t,">")}),u.duration()
else{for(d in c={},k)"ease"===d||"easeEach"===d||Xi(d,k[d],c,k.easeEach)
for(d in c)for(A=c[d].sort(function(t,i){return t.t-i.t}),B=0,h=0;h<A.length;h++)(N={ease:(P=A[h]).e,duration:(P.t-(h?A[h-1].t:0))/100*w})[d]=P.v,u.to(O,N,B),B+=N.duration
u.duration()<w&&u.to({},{duration:w-u.duration()})}}w||s.duration(w=u.duration())}else s.timeline=0
return!0!==F||a||(Ui=t(s),f.killTweensOf(O),Ui=0),Bt(R,t(s),e),r.reversed&&s.reverse(),r.paused&&s.paused(!0),(b||!w&&!k&&s.O===pt(R.B)&&E(b)&&zt(t(s))&&"nested"!==R.data)&&(s.I=-1e-8,s.render(Math.max(0,-y)||0)),C&&Ut(t(s),C),s}i(r,n)
var e=r.prototype
return e.render=function(t,i,n){var r,e,o,s,a,h,f,c,l,d=this.B,p=this.H,v=this.R,g=t<0,m=t>p-b&&!g?p:t<b?0:t
if(v){if(m!==this.I||!t||n||!this.l&&this.I||this.M&&this.U<0!==g||this.o){if(r=m,c=this.timeline,this.P){if(s=v+this.W,this.P<-1&&g)return this.totalTime(100*s+t,i,n)
if(r=pt(m%s),m===p?(o=this.P,r=v):(o=~~(a=pt(m/s)))&&o===a?(r=v,o--):r>v&&(r=v),(h=this.V&&1&o)&&(l=this.K,r=v-r),a=Pt(this.I,s),r===d&&!n&&this.l&&o===a)return this.I=m,this
o!==a&&(c&&this.K&&Ai(c,h),this.vars.repeatRefresh&&!h&&!this.Y&&r!==s&&this.l&&(this.Y=n=1,this.render(pt(s*o),!0).invalidate().Y=0))}if(!this.l){if(jt(this,g?t:r,n,i,m))return this.I=0,this
if(!(d===this.B||n&&this.vars.repeatRefresh&&o!==a))return this
if(v!==this.R)return this.render(t,i,n)}if(this.I=m,this.B=r,!this.C&&this.A&&(this.C=1,this.o=0),this.ratio=f=(l||this.J)(r/v),this.dt&&(this.ratio=f=1-f),!d&&m&&!i&&!a&&(ci(this,"onStart"),this.I!==m))return this
for(e=this.$;e;)e.r(f,e.d),e=e._
c&&c.render(t<0?t:c.R*c.J(r/this.R),i,n)||this.M&&(this.U=t),this.ot&&!i&&(g&&At(this,t,0,n),ci(this,"onUpdate")),this.P&&o!==a&&this.vars.onRepeat&&!i&&this.parent&&ci(this,"onRepeat"),m!==this.H&&m||this.I!==m||(g&&!this.ot&&At(this,t,0,!0),(t||!v)&&(m===this.H&&this.A>0||!m&&this.A<0)&&Ot(this,1),i||g&&!d||!(m||d||h)||(ci(this,m===p?"onComplete":"onReverseComplete",!0),this.st&&!(m<p&&this.timeScale()>0)&&this.st()))}}else!function(t,i,n,r){var e,o,s,a=t.ratio,h=i<0||!i&&(!t.O&&Dt(t)&&(t.l||!Lt(t))||(t.A<0||t.F.A<0)&&!Lt(t))?0:1,f=t.W,c=0
if(f&&t.P&&(c=Qt(0,t.H,i),o=Pt(c,f),t.V&&1&o&&(h=1-h),o!==Pt(t.I,f)&&(a=1-h,t.vars.repeatRefresh&&t.l&&t.invalidate())),h!==a||u||r||t.U===b||!i&&t.U){if(!t.l&&jt(t,i,r,n,c))return
for(s=t.U,t.U=i||(n?b:0),n||(n=i&&!s),t.ratio=h,t.dt&&(h=1-h),t.B=0,t.I=c,e=t.$;e;)e.r(h,e.d),e=e._
i<0&&At(t,i,0,!0),t.ot&&!n&&ci(t,"onUpdate"),c&&t.P&&!n&&t.parent&&ci(t,"onRepeat"),(i>=t.H||i<0)&&t.ratio===h&&(h&&Ot(t,1),n||u||(ci(t,h?"onComplete":"onReverseComplete",!0),t.st&&t.st()))}else t.U||(t.U=i)}(this,t,i,n)
return this},e.targets=function(){return this.ct},e.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this.M=0),this.$=this.gt=this.ot=this.o=this.ratio=0,this.it=[],this.timeline&&this.timeline.invalidate(t),n.prototype.invalidate.call(this,t)},e.resetTo=function(t,i,n,r,e){m||ki.wake(),this.A||this.play()
var o=Math.min(this.R,(this.F.B-this.O)*this.A)
return this.l||Yi(this,o),function(t,i,n,r,e,o,s,a){var u,h,f,c,l=(t.$&&t.vt||(t.vt={}))[i]
if(!l)for(l=t.vt[i]=[],f=t.it,c=t.ct.length;c--;){if((u=f[c][i])&&u.d&&u.d.$)for(u=u.d.$;u&&u.p!==i&&u.fp!==i;)u=u._
if(!u)return ji=1,t.vars[i]="+=0",Yi(t,s),ji=0,a?Z():1
l.push(u)}for(c=l.length;c--;)(u=(h=l[c]).$||h).s=!r&&0!==r||e?u.s+(r||0)+o*u.c:r,u.c=n-u.s,h.e&&(h.e=dt(n)+Vt(h.e)),h.b&&(h.b=u.s+Vt(h.b))}(this,t,i,n,r,this.J(o/this.R),o,e)?this.resetTo(t,i,n,r,1):(Ht(this,0),this.parent||St(this.F,this,"_first","_last",this.F.D?"_start":0),this.render(0))},e.kill=function(t,i){if(void 0===i&&(i="all"),!(t||i&&"all"!==i))return this.o=this.$=0,this.parent?li(this):this.scrollTrigger&&this.scrollTrigger.kill(!!u),this
if(this.timeline){var n=this.timeline.totalDuration()
return this.timeline.killTweensOf(t,i,Ui&&!0!==Ui.vars.overwrite).Z||li(this),this.parent&&n!==this.timeline.totalDuration()&&$t(this,this.R*this.timeline.H/n,0,1),this}var r,e,o,s,a,h,f,c=this.ct,l=t?ti(t):c,d=this.it,p=this.$
if((!i||"all"===i)&&function(t,i){for(var n=t.length,r=n===i.length;r&&n--&&t[n]===i[n];);return n<0}(c,l))return"all"===i&&(this.$=0),li(this)
for(r=this.gt=this.gt||[],"all"!==i&&(R(i)&&(a={},lt(i,function(t){return a[t]=1}),i=a),i=function(t,i){var n,r,e,o,s=t[0]?ft(t[0]).harness:0,a=s&&s.aliases
if(!a)return i
for(r in n=Ft({},i),a)if(r in n)for(e=(o=a[r].split(",")).length;e--;)n[o[e]]=n[r]
return n}(c,i)),f=c.length;f--;)if(~l.indexOf(c[f]))for(a in e=d[f],"all"===i?(r[f]=i,s=e,o={}):(o=r[f]=r[f]||{},s=i),s)(h=e&&e[a])&&("kill"in h.d&&!0!==h.d.kill(a)||Rt(this,h,"_pt"),delete e[a]),"all"!==o&&(o[a]=1)
return this.l&&!this.$&&p&&li(this),this},r.to=function(t,i){return new r(t,i,arguments[2])},r.from=function(t,i){return Gt(1,arguments)},r.delayedCall=function(t,i,n,e){return new r(i,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:i,onReverseComplete:i,onCompleteParams:n,onReverseCompleteParams:n,callbackScope:e})},r.fromTo=function(t,i,n){return Gt(2,arguments)},r.set=function(t,i){return i.duration=0,i.repeatDelay||(i.repeat=0),new r(t,i)},r.killTweensOf=function(t,i,n){return f.killTweensOf(t,i,n)},r}(Ni)
Mt(Qi.prototype,{ct:[],o:0,M:0,gt:0,xt:0}),lt("staggerTo,staggerFrom,staggerFromTo",function(t){Qi[t]=function(){var i=new Bi,n=Jt.call(arguments,0)
return n.splice("staggerFromTo"===t?5:4,0,0),i[t].apply(i,n)}})
var Vi=function(t,i,n){return t[i]=n},Ji=function(t,i,n){return t[i](n)},Ki=function(t,i,n,r){return t[i](r.fp,n)},tn=function(t,i,n){return t.setAttribute(i,n)},nn=function(t,i){return O(t[i])?Ji:A(t[i])&&t.setAttribute?tn:Vi},rn=function(t,i){return i.set(i.t,i.p,Math.round(1e6*(i.s+i.c*t))/1e6,i)},en=function(t,i){return i.set(i.t,i.p,!!(i.s+i.c*t),i)},on=function(t,i){var n=i.$,r=""
if(!t&&i.b)r=i.b
else if(1===t&&i.e)r=i.e
else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round(1e4*(n.s+n.c*t))/1e4)+r,n=n._
r+=i.c}i.set(i.t,i.p,r,i)},sn=function(t,i){for(var n=i.$;n;)n.r(t,n.d),n=n._},an=function(t,i,n,r){for(var e,o=this.$;o;)e=o._,o.p===r&&o.modifier(t,i,n),o=e},un=function(t){for(var i,n,r=this.$;r;)n=r._,r.p===t&&!r.op||r.op===t?Rt(this,r,"_pt"):r.dep||(i=1),r=n
return!i},hn=function(t,i,n,r){r.mSet(t,i,r.m.call(r.tween,n,r.mt),r)},fn=function(t){for(var i,n,r,e,o=t.$;o;){for(i=o._,n=r;n&&n.pr>o.pr;)n=n._;(o.k=n?n.k:e)?o.k._=o:r=o,(o._=n)?n.k=o:e=o,o=i}t.$=r},cn=function(){function t(t,i,n,r,e,o,s,a,u){this.t=i,this.s=r,this.c=e,this.p=n,this.r=o||rn,this.d=s||this,this.set=a||Vi,this.pr=u||0,this._=t,t&&(t.k=this)}return t.prototype.modifier=function(t,i,n){this.mSet=this.mSet||this.set,this.set=hn,this.m=t,this.mt=n,this.tween=i},t}()
lt(ut+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return it[t]=1}),Y.TweenMax=Y.TweenLite=Qi,Y.TimelineLite=Y.TimelineMax=Bi,f=new Bi({sortChildren:!1,defaults:w,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),x.stringFilter=Fi
var ln=[],dn={},pn=[],vn=0,gn=0,mn=function(t){return(dn[t]||pn).map(function(t){return t()})},xn=function(){var t=Date.now(),i=[]
t-vn>2&&(mn("matchMediaInit"),ln.forEach(function(t){var n,r,e,o,s=t.queries,a=t.conditions
for(r in s)(n=c.matchMedia(s[r]).matches)&&(e=1),n!==a[r]&&(a[r]=n,o=1)
o&&(t.revert(),e&&i.push(t))}),mn("matchMediaRevert"),i.forEach(function(t){return t.onMatch(t,function(i){return t.add(null,i)})}),vn=t,mn("matchMedia"))},wn=function(){function t(t,i){this.selector=i&&ii(i),this.data=[],this.wt=[],this.isReverted=!1,this.id=gn++,t&&this.add(t)}var i=t.prototype
return i.add=function(t,i,n){O(t)&&(n=i,i=t,t=O)
var r=this,e=function(){var t,e=h,o=r.selector
return e&&e!==r&&e.data.push(r),n&&(r.selector=ii(n)),h=r,t=i.apply(r,arguments),O(t)&&r.wt.push(t),h=e,r.selector=o,r.isReverted=!1,t}
return r.last=e,t===O?e(r,function(t){return r.add(null,t)}):t?r[t]=e:e},i.ignore=function(t){var i=h
h=null,t(this),h=i},i.getTweens=function(){var i=[]
return this.data.forEach(function(n){return n instanceof t?i.push.apply(i,n.getTweens()):n instanceof Qi&&!(n.parent&&"nested"===n.parent.data)&&i.push(n)}),i},i.clear=function(){this.wt.length=this.data.length=0},i.kill=function(t,i){var n=this
if(t?!function(){for(var i,r=n.getTweens(),e=n.data.length;e--;)"isFlip"===(i=n.data[e]).data&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(t){return r.splice(r.indexOf(t),1)}))
for(r.map(function(t){return{g:t.R||t.j||t.et&&!t.et.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,i){return i.g-t.g||-1/0}).forEach(function(i){return i.t.revert(t)}),e=n.data.length;e--;)(i=n.data[e])instanceof Bi?"nested"!==i.data&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Qi)&&i.revert&&i.revert(t)
n.wt.forEach(function(i){return i(t,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),i)for(var r=ln.length;r--;)ln[r].id===this.id&&ln.splice(r,1)},i.revert=function(t){this.kill(t||{})},t}(),yn=function(){function t(t){this.contexts=[],this.scope=t,h&&h.data.push(this)}var i=t.prototype
return i.add=function(t,i,n){z(t)||(t={matches:t})
var r,e,o,s=new wn(0,n||this.scope),a=s.conditions={}
for(e in h&&!s.selector&&(s.selector=h.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=t,t)"all"===e?o=1:(r=c.matchMedia(t[e]))&&(ln.indexOf(s)<0&&ln.push(s),(a[e]=r.matches)&&(o=1),r.addListener?r.addListener(xn):r.addEventListener("change",xn))
return o&&i(s,function(t){return s.add(null,t)}),this},i.revert=function(t){this.kill(t||{})},i.kill=function(t){this.contexts.forEach(function(i){return i.kill(t,!0)})},t}(),bn={registerPlugin:function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
i.forEach(function(t){return pi(t)})},timeline:function(t){return new Bi(t)},getTweensOf:function(t,i){return f.getTweensOf(t,i)},getProperty:function(t,i,n,r){R(t)&&(t=ti(t)[0])
var e=ft(t||{}).get,o=n?bt:yt
return"native"===n&&(n=""),t?i?o((et[i]&&et[i].get||e)(t,i,n,r)):function(i,n,r){return o((et[i]&&et[i].get||e)(t,i,n,r))}:t},quickSetter:function(t,i,n){if((t=ti(t)).length>1){var r=t.map(function(t){return kn.quickSetter(t,i,n)}),e=r.length
return function(t){for(var i=e;i--;)r[i](t)}}t=t[0]||{}
var o=et[i],s=ft(t),a=s.harness&&(s.harness.aliases||{})[i]||i,u=o?function(i){var r=new o
g.$=0,r.init(t,n?i+n:i,g,0,[t]),r.render(1,r),g.$&&sn(1,g)}:s.set(t,a)
return o?u:function(i){return u(t,a,n?i+n:i,s,1)}},quickTo:function(t,i,n){var r,e=kn.to(t,Mt(((r={})[i]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(t,n,r){return e.resetTo(i,t,n,r)}
return o.tween=e,o},isTweening:function(t){return f.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=zi(t.ease,w.ease)),kt(w,t||{})},config:function(t){return kt(x,t||{})},registerEffect:function(t){var i=t.name,n=t.effect,r=t.plugins,e=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(t){return t&&!et[t]&&!Y[t]&&Z()}),ot[i]=function(t,i,r){return n(ti(t),Mt(i||{},e),r)},o&&(Bi.prototype[i]=function(t,n,r){return this.add(ot[i](t,z(n)?n:(r=n)&&{},this),r)})},registerEase:function(t,i){Ci[t]=zi(i)},parseEase:function(t,i){return arguments.length?zi(t,i):Ci},getById:function(t){return f.getById(t)},exportRoot:function(t,i){void 0===t&&(t={})
var n,r,e=new Bi(t)
for(e.smoothChildTiming=E(t.smoothChildTiming),f.remove(e),e.F=0,e.B=e.I=f.B,n=f.Z;n;)r=n._,!i&&!n.R&&n instanceof Qi&&n.vars.onComplete===n.ct[0]||Bt(e,n,n.O-n.j),n=r
return Bt(f,e,0),e},context:function(t,i){return t?new wn(t,i):h},matchMedia:function(t){return new yn(t)},matchMediaRefresh:function(){return ln.forEach(function(t){var i,n,r=t.conditions
for(n in r)r[n]&&(r[n]=!1,i=1)
i&&t.revert()})||xn()},addEventListener:function(t,i){var n=dn[t]||(dn[t]=[])
~n.indexOf(i)||n.push(i)},removeEventListener:function(t,i){var n=dn[t],r=n&&n.indexOf(i)
r>=0&&n.splice(r,1)},utils:{wrap:function t(i,n,r){var e=n-i
return H(i)?ai(i,t(0,i.length),n):Zt(r,function(t){return(e+(t-i)%e)%e+i})},wrapYoyo:function t(i,n,r){var e=n-i,o=2*e
return H(i)?ai(i,t(0,i.length-1),n):Zt(r,function(t){return i+((t=(o+(t-i)%o)%o||0)>e?o-t:t)})},distribute:ri,random:si,snap:oi,normalize:function(t,i,n){return hi(t,i,0,1,n)},getUnit:Vt,clamp:function(t,i,n){return Zt(n,function(n){return Qt(t,i,n)})},splitColor:xi,toArray:ti,selector:ii,mapRange:hi,pipe:function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n]
return function(t){return i.reduce(function(t,i){return i(t)},t)}},unitize:function(t,i){return function(n){return t(parseFloat(n))+(i||Vt(n))}},interpolate:function t(i,n,r,e){var o=isNaN(i+n)?0:function(t){return(1-t)*i+t*n}
if(!o){var s,a,u,h,f,c=R(i),l={}
if(!0===r&&(e=1)&&(r=null),c)i={p:i},n={p:n}
else if(H(i)&&!H(n)){for(u=[],h=i.length,f=h-2,a=1;a<h;a++)u.push(t(i[a-1],i[a]))
h--,o=function(t){t*=h
var i=Math.min(f,~~t)
return u[i](t-i)},r=n}else e||(i=Ft(H(i)?[]:{},i))
if(!u){for(s in n)Li.call(l,i,s,"get",n[s])
o=function(t){return sn(t,l)||(c?i.p:i)}}}return Zt(r,o)},shuffle:ni},install:q,effects:ot,ticker:ki,updateRoot:Bi.updateRoot,plugins:et,globalTimeline:f,core:{PropTween:cn,globals:Q,Tween:Qi,Timeline:Bi,Animation:Ni,getCache:ft,yt:Rt,reverting:function(){return u},context:function(t){return t&&h&&(h.data.push(t),t.X=h),h},suppressOverwrites:function(t){return a=t}}}
lt("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return bn[t]=Qi[t]}),ki.add(Bi.updateRoot),g=bn.to({},{duration:0})
var Mn=function(t,i){for(var n=t.$;n&&n.p!==i&&n.op!==i&&n.fp!==i;)n=n._
return n},Fn=function(t,i){return{name:t,headless:1,rawVars:1,init:function(t,n,r){r.xt=function(t){var r,e
if(R(n)&&(r={},lt(n,function(t){return r[t]=1}),n=r),i){for(e in r={},n)r[e]=i(n[e])
n=r}!function(t,i){var n,r,e,o=t.ct
for(n in i)for(r=o.length;r--;)(e=t.it[r][n])&&(e=e.d)&&(e.$&&(e=Mn(e,n)),e&&e.modifier&&e.modifier(i[n],t,o[r],n))}(t,n)}}}},kn=bn.registerPlugin({name:"attr",init:function(t,i,n,r,e){var o,s,a
for(o in this.tween=n,i)a=t.getAttribute(o)||"",(s=this.add(t,"setAttribute",(a||0)+"",i[o],r,e,0,0,o)).op=o,s.b=a,this.q.push(o)},render:function(t,i){for(var n=i.$;n;)u?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._}},{name:"endArray",headless:1,init:function(t,i){for(var n=i.length;n--;)this.add(t,n,t[n]||0,i[n],0,0,0,0,0,1)}},Fn("roundProps",ei),Fn("modifiers"),Fn("snap",oi))||bn
Qi.version=Bi.version=kn.version="3.13.0",p=1,P()&&_i()
var _n,Cn,Sn,Rn,On,Tn,An,zn,En={},Pn=180/Math.PI,In=Math.PI/180,Wn=Math.atan2,Hn=/([A-Z])/g,Nn=/(left|right|width|margin|padding|x)/i,Bn=/[\s,\(]\S/,Un={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},jn=function(t,i){return i.set(i.t,i.p,Math.round(1e4*(i.s+i.c*t))/1e4+i.u,i)},Dn=function(t,i){return i.set(i.t,i.p,1===t?i.e:Math.round(1e4*(i.s+i.c*t))/1e4+i.u,i)},Ln=function(t,i){return i.set(i.t,i.p,t?Math.round(1e4*(i.s+i.c*t))/1e4+i.u:i.b,i)},$n=function(t,i){var n=i.s+i.c*t
i.set(i.t,i.p,~~(n+(n<0?-.5:.5))+i.u,i)},Yn=function(t,i){return i.set(i.t,i.p,t?i.e:i.b,i)},Xn=function(t,i){return i.set(i.t,i.p,1!==t?i.b:i.e,i)},qn=function(t,i,n){return t.style[i]=n},Gn=function(t,i,n){return t.style.setProperty(i,n)},Zn=function(t,i,n){return t.i[i]=n},Qn=function(t,i,n){return t.i.scaleX=t.i.scaleY=n},Vn=function(t,i,n,r,e){var o=t.i
o.scaleX=o.scaleY=n,o.renderTransform(e,o)},Jn=function(t,i,n,r,e){var o=t.i
o[i]=n,o.renderTransform(e,o)},Kn="transform",tr=Kn+"Origin",ir=function t(i,n){var r=this,e=this.target,o=e.style,s=e.i
if(i in En&&o){if(this.tfm=this.tfm||{},"transform"===i)return Un.transform.split(",").forEach(function(i){return t.call(r,i,n)})
if(~(i=Un[i]||i).indexOf(",")?i.split(",").forEach(function(t){return r.tfm[t]=wr(e,t)}):this.tfm[i]=s.x?s[i]:wr(e,i),i===tr&&(this.tfm.zOrigin=s.zOrigin),this.props.indexOf(Kn)>=0)return
s.svg&&(this.svgo=e.getAttribute("data-svg-origin"),this.props.push(tr,n,"")),i=Kn}(o||n)&&this.props.push(i,n,o[i])},nr=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},rr=function(){var t,i,n=this.props,r=this.target,e=r.style,o=r.i
for(t=0;t<n.length;t+=3)n[t+1]?2===n[t+1]?r[n[t]](n[t+2]):r[n[t]]=n[t+2]:n[t+2]?e[n[t]]=n[t+2]:e.removeProperty("--"===n[t].substr(0,2)?n[t]:n[t].replace(Hn,"-$1").toLowerCase())
if(this.tfm){for(i in this.tfm)o[i]=this.tfm[i]
o.svg&&(o.renderTransform(),r.setAttribute("data-svg-origin",this.svgo||"")),(t=An())&&t.isStart||e[Kn]||(nr(e),o.zOrigin&&e[tr]&&(e[tr]+=" "+o.zOrigin+"px",o.zOrigin=0,o.renderTransform()),o.uncache=1)}},er=function(t,i){var n={target:t,props:[],revert:rr,save:ir}
return t.i||kn.core.getCache(t),i&&t.style&&t.nodeType&&i.split(",").forEach(function(t){return n.save(t)}),n},or=function(t,i){var n=Cn.createElementNS?Cn.createElementNS((i||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Cn.createElement(t)
return n&&n.style?n:Cn.createElement(t)},sr=function t(i,n,r){var e=getComputedStyle(i)
return e[n]||e.getPropertyValue(n.replace(Hn,"-$1").toLowerCase())||e.getPropertyValue(n)||!r&&t(i,ur(n)||n,1)||""},ar="O,Moz,ms,Ms,Webkit".split(","),ur=function(t,i,n){var r=(i||On).style,e=5
if(t in r&&!n)return t
for(t=t.charAt(0).toUpperCase()+t.substr(1);e--&&!(ar[e]+t in r););return e<0?null:(3===e?"ms":e>=0?ar[e]:"")+t},hr=function(){"undefined"!=typeof window&&window.document&&(_n=window,Cn=_n.document,Sn=Cn.documentElement,On=or("div")||{style:{}},or("div"),Kn=ur(Kn),tr=Kn+"Origin",On.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",zn=!!ur("perspective"),An=kn.core.reverting,Rn=1)},fr=function(t){var i,n=t.ownerSVGElement,r=or("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),e=t.cloneNode(!0)
e.style.display="block",r.appendChild(e),Sn.appendChild(r)
try{i=e.getBBox()}catch(o){}return r.removeChild(e),Sn.removeChild(r),i},cr=function(t,i){for(var n=i.length;n--;)if(t.hasAttribute(i[n]))return t.getAttribute(i[n])},lr=function(t){var i,n
try{i=t.getBBox()}catch(r){i=fr(t),n=1}return i&&(i.width||i.height)||n||(i=fr(t)),!i||i.width||i.x||i.y?i:{x:+cr(t,["x","cx","x1"])||0,y:+cr(t,["y","cy","y1"])||0,width:0,height:0}},dr=function(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!lr(t))},pr=function(t,i){if(i){var n,r=t.style
i in En&&i!==tr&&(i=Kn),r.removeProperty?("ms"!==(n=i.substr(0,2))&&"webkit"!==i.substr(0,6)||(i="-"+i),r.removeProperty("--"===n?i:i.replace(Hn,"-$1").toLowerCase())):r.removeAttribute(i)}},vr=function(t,i,n,r,e,o){var s=new cn(t.$,i,n,0,1,o?Xn:Yn)
return t.$=s,s.b=r,s.e=e,t.q.push(n),s},gr={deg:1,rad:1,turn:1},mr={grid:1,flex:1},xr=function t(i,n,r,e){var o,s,a,u,h=parseFloat(r)||0,f=(r+"").trim().substr((h+"").length)||"px",c=On.style,l=Nn.test(n),d="svg"===i.tagName.toLowerCase(),p=(d?"client":"offset")+(l?"Width":"Height"),v=100,g="px"===e,m="%"===e
if(e===f||!h||gr[e]||gr[f])return h
if("px"!==f&&!g&&(h=t(i,n,r,"px")),u=i.getCTM&&dr(i),(m||"%"===f)&&(En[n]||~n.indexOf("adius")))return o=u?i.getBBox()[l?"width":"height"]:i[p],dt(m?h/o*v:h/100*o)
if(c[l?"width":"height"]=v+(g?f:e),s="rem"!==e&&~n.indexOf("adius")||"em"===e&&i.appendChild&&!d?i:i.parentNode,u&&(s=(i.ownerSVGElement||{}).parentNode),s&&s!==Cn&&s.appendChild||(s=Cn.body),(a=s.i)&&m&&a.width&&l&&a.time===ki.time&&!a.uncache)return dt(h/a.width*v)
if(!m||"height"!==n&&"width"!==n)(m||"%"===f)&&!mr[sr(s,"display")]&&(c.position=sr(i,"position")),s===i&&(c.position="static"),s.appendChild(On),o=On[p],s.removeChild(On),c.position="absolute"
else{var x=i.style[n]
i.style[n]=v+e,o=i[p],x?i.style[n]=x:pr(i,n)}return l&&m&&((a=ft(s)).time=ki.time,a.width=s[p]),dt(g?o*h/v:o&&h?v/o*h:0)},wr=function(t,i,n,r){var e
return Rn||hr(),i in Un&&"transform"!==i&&~(i=Un[i]).indexOf(",")&&(i=i.split(",")[0]),En[i]&&"transform"!==i?(e=Ar(t,r),e="transformOrigin"!==i?e[i]:e.svg?e.origin:zr(sr(t,tr))+" "+e.zOrigin+"px"):(!(e=t.style[i])||"auto"===e||r||~(e+"").indexOf("calc("))&&(e=kr[i]&&kr[i](t,i,n)||sr(t,i)||ct(t,i)||("opacity"===i?1:0)),n&&!~(e+"").trim().indexOf(" ")?xr(t,i,e,n)+n:e},yr=function(t,i,n,r){if(!n||"none"===n){var e=ur(i,t,1),o=e&&sr(t,e,1)
o&&o!==n?(i=e,n=o):"borderColor"===i&&(n=sr(t,"borderTopColor"))}var s,a,u,h,f,c,l,d,p,v,g,m=new cn(this.$,t.style,i,0,1,on),w=0,y=0
if(m.b=n,m.e=r,n+="","var(--"===(r+="").substring(0,6)&&(r=sr(t,r.substring(4,r.indexOf(")")))),"auto"===r&&(c=t.style[i],t.style[i]=r,r=sr(t,i)||r,c?t.style[i]=c:pr(t,i)),Fi(s=[n,r]),r=s[1],u=(n=s[0]).match(U)||[],(r.match(U)||[]).length){for(;a=U.exec(r);)l=a[0],p=r.substring(w,a.index),f?f=(f+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(f=1),l!==(c=u[y++]||"")&&(h=parseFloat(c)||0,g=c.substr((h+"").length),"="===l.charAt(1)&&(l=vt(h,l)+g),d=parseFloat(l),v=l.substr((d+"").length),w=U.lastIndex-v.length,v||(v=v||x.units[i]||g,w===r.length&&(r+=v,m.e+=v)),g!==v&&(h=xr(t,i,c,v)||0),m.$={_:m.$,p:p||1===y?p:",",s:h,c:d-h,m:f&&f<4||"zIndex"===i?Math.round:0})
m.c=w<r.length?r.substring(w,r.length):""}else m.r="display"===i&&"none"===r?Xn:Yn
return D.test(r)&&(m.e=0),this.$=m,m},br={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Mr=function(t){var i=t.split(" "),n=i[0],r=i[1]||"50%"
return"top"!==n&&"bottom"!==n&&"left"!==r&&"right"!==r||(t=n,n=r,r=t),i[0]=br[n]||n,i[1]=br[r]||r,i.join(" ")},Fr=function(t,i){if(i.tween&&i.tween.B===i.tween.R){var n,r,e,o=i.t,s=o.style,a=i.u,u=o.i
if("all"===a||!0===a)s.cssText="",r=1
else for(e=(a=a.split(",")).length;--e>-1;)n=a[e],En[n]&&(r=1,n="transformOrigin"===n?tr:Kn),pr(o,n)
r&&(pr(o,Kn),u&&(u.svg&&o.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Ar(o,1),u.uncache=1,nr(s)))}},kr={clearProps:function(t,i,n,r,e){if("isFromStart"!==e.data){var o=t.$=new cn(t.$,i,n,0,0,Fr)
return o.u=r,o.pr=-10,o.tween=e,t.q.push(n),1}}},_r=[1,0,0,1,0,0],Cr={},Sr=function(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t},Rr=function(t){var i=sr(t,Kn)
return Sr(i)?_r:i.substr(7).match(B).map(dt)},Or=function(t,i){var n,r,e,o,s=t.i||ft(t),a=t.style,u=Rr(t)
return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(e=t.transform.baseVal.consolidate().matrix).a,e.b,e.c,e.d,e.e,e.f]).join(",")?_r:u:(u!==_r||t.offsetParent||t===Sn||s.svg||(e=a.display,a.display="block",(n=t.parentNode)&&(t.offsetParent||t.getBoundingClientRect().width)||(o=1,r=t.nextElementSibling,Sn.appendChild(t)),u=Rr(t),e?a.display=e:pr(t,"display"),o&&(r?n.insertBefore(t,r):n?n.appendChild(t):Sn.removeChild(t))),i&&u.length>6?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)},Tr=function(t,i,n,r,e,o){var s,a,u,h=t.i,f=e||Or(t,!0),c=h.xOrigin||0,l=h.yOrigin||0,d=h.xOffset||0,p=h.yOffset||0,v=f[0],g=f[1],m=f[2],x=f[3],w=f[4],y=f[5],b=i.split(" "),M=parseFloat(b[0])||0,F=parseFloat(b[1])||0
n?f!==_r&&(a=v*x-g*m)&&(u=M*(-g/a)+F*(v/a)-(v*y-g*w)/a,M=M*(x/a)+F*(-m/a)+(m*y-x*w)/a,F=u):(M=(s=lr(t)).x+(~b[0].indexOf("%")?M/100*s.width:M),F=s.y+(~(b[1]||b[0]).indexOf("%")?F/100*s.height:F)),r||!1!==r&&h.smooth?(w=M-c,y=F-l,h.xOffset=d+(w*v+y*m)-w,h.yOffset=p+(w*g+y*x)-y):h.xOffset=h.yOffset=0,h.xOrigin=M,h.yOrigin=F,h.smooth=!!r,h.origin=i,h.originIsAbsolute=!!n,t.style[tr]="0px 0px",o&&(vr(o,h,"xOrigin",c,M),vr(o,h,"yOrigin",l,F),vr(o,h,"xOffset",d,h.xOffset),vr(o,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",M+" "+F)},Ar=function(t,i){var n=t.i||new Hi(t)
if("x"in n&&!i&&!n.uncache)return n
var r,e,o,s,a,u,h,f,c,l,d,p,v,g,m,w,y,b,M,F,k,_,C,S,R,O,T,A,z,E,P,I,W=t.style,H=n.scaleX<0,N="px",B="deg",U=getComputedStyle(t),j=sr(t,tr)||"0"
return r=e=o=u=h=f=c=l=d=0,s=a=1,n.svg=!(!t.getCTM||!dr(t)),U.translate&&("none"===U.translate&&"none"===U.scale&&"none"===U.rotate||(W[Kn]=("none"!==U.translate?"translate3d("+(U.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==U.rotate?"rotate("+U.rotate+") ":"")+("none"!==U.scale?"scale("+U.scale.split(" ").join(",")+") ":"")+("none"!==U[Kn]?U[Kn]:"")),W.scale=W.rotate=W.translate="none"),g=Or(t,n.svg),n.svg&&(n.uncache?(R=t.getBBox(),j=n.xOrigin-R.x+"px "+(n.yOrigin-R.y)+"px",S=""):S=!i&&t.getAttribute("data-svg-origin"),Tr(t,S||j,!!S||n.originIsAbsolute,!1!==n.smooth,g)),p=n.xOrigin||0,v=n.yOrigin||0,g!==_r&&(b=g[0],M=g[1],F=g[2],k=g[3],r=_=g[4],e=C=g[5],6===g.length?(s=Math.sqrt(b*b+M*M),a=Math.sqrt(k*k+F*F),u=b||M?Wn(M,b)*Pn:0,(c=F||k?Wn(F,k)*Pn+u:0)&&(a*=Math.abs(Math.cos(c*In))),n.svg&&(r-=p-(p*b+v*F),e-=v-(p*M+v*k))):(I=g[6],E=g[7],T=g[8],A=g[9],z=g[10],P=g[11],r=g[12],e=g[13],o=g[14],h=(m=Wn(I,z))*Pn,m&&(S=_*(w=Math.cos(-m))+T*(y=Math.sin(-m)),R=C*w+A*y,O=I*w+z*y,T=_*-y+T*w,A=C*-y+A*w,z=I*-y+z*w,P=E*-y+P*w,_=S,C=R,I=O),f=(m=Wn(-F,z))*Pn,m&&(w=Math.cos(-m),P=k*(y=Math.sin(-m))+P*w,b=S=b*w-T*y,M=R=M*w-A*y,F=O=F*w-z*y),u=(m=Wn(M,b))*Pn,m&&(S=b*(w=Math.cos(m))+M*(y=Math.sin(m)),R=_*w+C*y,M=M*w-b*y,C=C*w-_*y,b=S,_=R),h&&Math.abs(h)+Math.abs(u)>359.9&&(h=u=0,f=180-f),s=dt(Math.sqrt(b*b+M*M+F*F)),a=dt(Math.sqrt(C*C+I*I)),m=Wn(_,C),c=Math.abs(m)>2e-4?m*Pn:0,d=P?1/(P<0?-P:P):0),n.svg&&(S=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Sr(sr(t,Kn)),S&&t.setAttribute("transform",S))),Math.abs(c)>90&&Math.abs(c)<270&&(H?(s*=-1,c+=u<=0?180:-180,u+=u<=0?180:-180):(a*=-1,c+=c<=0?180:-180)),i=i||n.uncache,n.x=r-((n.xPercent=r&&(!i&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-r)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+N,n.y=e-((n.yPercent=e&&(!i&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-e)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+N,n.z=o+N,n.scaleX=dt(s),n.scaleY=dt(a),n.rotation=dt(u)+B,n.rotationX=dt(h)+B,n.rotationY=dt(f)+B,n.skewX=c+B,n.skewY=l+B,n.transformPerspective=d+N,(n.zOrigin=parseFloat(j.split(" ")[2])||!i&&n.zOrigin||0)&&(W[tr]=zr(j)),n.xOffset=n.yOffset=0,n.force3D=x.force3D,n.renderTransform=n.svg?Br:zn?Nr:Pr,n.uncache=0,n},zr=function(t){return(t=t.split(" "))[0]+" "+t[1]},Er=function(t,i,n){var r=Vt(i)
return dt(parseFloat(i)+parseFloat(xr(t,"x",n+"px",r)))+r},Pr=function(t,i){i.z="0px",i.rotationY=i.rotationX="0deg",i.force3D=0,Nr(t,i)},Ir="0deg",Wr="0px",Hr=") ",Nr=function(t,i){var n=i||this,r=n.xPercent,e=n.yPercent,o=n.x,s=n.y,a=n.z,u=n.rotation,h=n.rotationY,f=n.rotationX,c=n.skewX,l=n.skewY,d=n.scaleX,p=n.scaleY,v=n.transformPerspective,g=n.force3D,m=n.target,x=n.zOrigin,w="",y="auto"===g&&t&&1!==t||!0===g
if(x&&(f!==Ir||h!==Ir)){var b,M=parseFloat(h)*In,F=Math.sin(M),k=Math.cos(M)
M=parseFloat(f)*In,b=Math.cos(M),o=Er(m,o,F*b*-x),s=Er(m,s,-Math.sin(M)*-x),a=Er(m,a,k*b*-x+x)}v!==Wr&&(w+="perspective("+v+Hr),(r||e)&&(w+="translate("+r+"%, "+e+"%) "),(y||o!==Wr||s!==Wr||a!==Wr)&&(w+=a!==Wr||y?"translate3d("+o+", "+s+", "+a+") ":"translate("+o+", "+s+Hr),u!==Ir&&(w+="rotate("+u+Hr),h!==Ir&&(w+="rotateY("+h+Hr),f!==Ir&&(w+="rotateX("+f+Hr),c===Ir&&l===Ir||(w+="skew("+c+", "+l+Hr),1===d&&1===p||(w+="scale("+d+", "+p+Hr),m.style[Kn]=w||"translate(0, 0)"},Br=function(t,i){var n,r,e,o,s,a=i||this,u=a.xPercent,h=a.yPercent,f=a.x,c=a.y,l=a.rotation,d=a.skewX,p=a.skewY,v=a.scaleX,g=a.scaleY,m=a.target,x=a.xOrigin,w=a.yOrigin,y=a.xOffset,b=a.yOffset,M=a.forceCSS,F=parseFloat(f),k=parseFloat(c)
l=parseFloat(l),d=parseFloat(d),(p=parseFloat(p))&&(d+=p=parseFloat(p),l+=p),l||d?(l*=In,d*=In,n=Math.cos(l)*v,r=Math.sin(l)*v,e=Math.sin(l-d)*-g,o=Math.cos(l-d)*g,d&&(p*=In,s=Math.tan(d-p),e*=s=Math.sqrt(1+s*s),o*=s,p&&(s=Math.tan(p),n*=s=Math.sqrt(1+s*s),r*=s)),n=dt(n),r=dt(r),e=dt(e),o=dt(o)):(n=v,o=g,r=e=0),(F&&!~(f+"").indexOf("px")||k&&!~(c+"").indexOf("px"))&&(F=xr(m,"x",f,"px"),k=xr(m,"y",c,"px")),(x||w||y||b)&&(F=dt(F+x-(x*n+w*e)+y),k=dt(k+w-(x*r+w*o)+b)),(u||h)&&(s=m.getBBox(),F=dt(F+u/100*s.width),k=dt(k+h/100*s.height)),s="matrix("+n+","+r+","+e+","+o+","+F+","+k+")",m.setAttribute("transform",s),M&&(m.style[Kn]=s)},Ur=function(t,i,n,r,e){var o,s,a=360,u=R(e),h=parseFloat(e)*(u&&~e.indexOf("rad")?Pn:1)-r,f=r+h+"deg"
return u&&("short"===(o=e.split("_")[1])&&(h%=a)!==h%180&&(h+=h<0?a:-360),"cw"===o&&h<0?h=(h+36e9)%a-~~(h/a)*a:"ccw"===o&&h>0&&(h=(h-36e9)%a-~~(h/a)*a)),t.$=s=new cn(t.$,i,n,r,h,Dn),s.e=f,s.u="deg",t.q.push(n),s},jr=function(t,i){for(var n in i)t[n]=i[n]
return t},Dr=function(t,i,n){var r,e,o,s,a,u,h,f=jr({},n.i),c=n.style
for(e in f.svg?(o=n.getAttribute("transform"),n.setAttribute("transform",""),c[Kn]=i,r=Ar(n,1),pr(n,Kn),n.setAttribute("transform",o)):(o=getComputedStyle(n)[Kn],c[Kn]=i,r=Ar(n,1),c[Kn]=o),En)(o=f[e])!==(s=r[e])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(e)<0&&(a=Vt(o)!==(h=Vt(s))?xr(n,e,o,h):parseFloat(o),u=parseFloat(s),t.$=new cn(t.$,r,e,a,u-a,jn),t.$.u=h||0,t.q.push(e))
jr(r,f)}
lt("padding,margin,Width,Radius",function(t,i){var n="Top",r="Right",e="Bottom",o="Left",s=(i<3?[n,r,e,o]:[n+o,n+r,e+r,e+o]).map(function(n){return i<2?t+n:"border"+n+t})
kr[i>1?"border"+t:t]=function(t,i,n,r,e){var o,a
if(arguments.length<4)return o=s.map(function(i){return wr(t,i,n)}),5===(a=o.join(" ")).split(o[0]).length?o[0]:a
o=(r+"").split(" "),a={},s.forEach(function(t,i){return a[t]=o[i]=o[i]||o[(i-1)/2|0]}),t.init(i,a,e)}})
var Lr={name:"css",register:hr,targetTest:function(t){return t.style&&t.nodeType},init:function(t,i,n,r,e){var o,s,a,u,h,f,c,l,d,p,v,g,m,w,y,b,M=this.q,F=t.style,k=n.vars.startAt
for(c in Rn||hr(),this.styles=this.styles||er(t),b=this.styles.props,this.tween=n,i)if("autoRound"!==c&&(s=i[c],!et[c]||!$i(c,i,n,r,t,e)))if(h=typeof s,f=kr[c],"function"===h&&(h=typeof(s=s.call(n,r,t,e))),"string"===h&&~s.indexOf("random(")&&(s=ui(s)),f)f(this,t,c,s,n)&&(y=1)
else if("--"===c.substr(0,2))o=(getComputedStyle(t).getPropertyValue(c)+"").trim(),s+="",bi.lastIndex=0,bi.test(o)||(l=Vt(o),d=Vt(s)),d?l!==d&&(o=xr(t,c,o,d)+d):l&&(s+=l),this.add(F,"setProperty",o,s,r,e,0,0,c),M.push(c),b.push(c,0,F[c])
else if("undefined"!==h){if(k&&c in k?(o="function"==typeof k[c]?k[c].call(n,r,t,e):k[c],R(o)&&~o.indexOf("random(")&&(o=ui(o)),Vt(o+"")||"auto"===o||(o+=x.units[c]||Vt(wr(t,c))||""),"="===(o+"").charAt(1)&&(o=wr(t,c))):o=wr(t,c),u=parseFloat(o),(p="string"===h&&"="===s.charAt(1)&&s.substr(0,2))&&(s=s.substr(2)),a=parseFloat(s),c in Un&&("autoAlpha"===c&&(1===u&&"hidden"===wr(t,"visibility")&&a&&(u=0),b.push("visibility",0,F.visibility),vr(this,F,"visibility",u?"inherit":"hidden",a?"inherit":"hidden",!a)),"scale"!==c&&"transform"!==c&&~(c=Un[c]).indexOf(",")&&(c=c.split(",")[0])),v=c in En)if(this.styles.save(c),"string"===h&&"var(--"===s.substring(0,6)&&(s=sr(t,s.substring(4,s.indexOf(")"))),a=parseFloat(s)),g||((m=t.i).renderTransform&&!i.parseTransform||Ar(t,i.parseTransform),w=!1!==i.smoothOrigin&&m.smooth,(g=this.$=new cn(this.$,F,Kn,0,1,m.renderTransform,m,0,-1)).dep=1),"scale"===c)this.$=new cn(this.$,m,"scaleY",m.scaleY,(p?vt(m.scaleY,p+a):a)-m.scaleY||0,jn),this.$.u=0,M.push("scaleY",c),c+="X"
else{if("transformOrigin"===c){b.push(tr,0,F[tr]),s=Mr(s),m.svg?Tr(t,s,0,w,0,this):((d=parseFloat(s.split(" ")[2])||0)!==m.zOrigin&&vr(this,m,"zOrigin",m.zOrigin,d),vr(this,F,c,zr(o),zr(s)))
continue}if("svgOrigin"===c){Tr(t,s,1,w,0,this)
continue}if(c in Cr){Ur(this,m,c,u,p?vt(u,p+s):s)
continue}if("smoothOrigin"===c){vr(this,m,"smooth",m.smooth,s)
continue}if("force3D"===c){m[c]=s
continue}if("transform"===c){Dr(this,s,t)
continue}}else c in F||(c=ur(c)||c)
if(v||(a||0===a)&&(u||0===u)&&!Bn.test(s)&&c in F)a||(a=0),(l=(o+"").substr((u+"").length))!==(d=Vt(s)||(c in x.units?x.units[c]:l))&&(u=xr(t,c,o,d)),this.$=new cn(this.$,v?m:F,c,u,(p?vt(u,p+a):a)-u,v||"px"!==d&&"zIndex"!==c||!1===i.autoRound?jn:$n),this.$.u=d||0,l!==d&&"%"!==d&&(this.$.b=o,this.$.r=Ln)
else if(c in F)yr.call(this,t,c,o,p?p+s:s)
else if(c in t)this.add(t,c,o||t[c],p?p+s:s,r,e)
else if("parseTransform"!==c){G()
continue}v||(c in F?b.push(c,0,F[c]):"function"==typeof t[c]?b.push(c,2,t[c]()):b.push(c,1,o||t[c])),M.push(c)}y&&fn(this)},render:function(t,i){if(i.tween.B||!An())for(var n=i.$;n;)n.r(t,n.d),n=n._
else i.styles.revert()},get:wr,aliases:Un,getSetter:function(t,i,n){var r=Un[i]
return r&&r.indexOf(",")<0&&(i=r),i in En&&i!==tr&&(t.i.x||wr(t,"x"))?n&&Tn===n?"scale"===i?Qn:Zn:(Tn=n||{})&&("scale"===i?Vn:Jn):t.style&&!A(t.style[i])?qn:~i.indexOf("-")?Gn:nn(t,i)},core:{bt:pr,Mt:Or}}
kn.utils.checkPrefix=ur,kn.core.getStyleSaver=er,function(t,i){var n=lt(t+","+i+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){En[t]=1})
lt(i,function(t){x.units[t]="deg",Cr[t]=1}),Un[n[13]]=t+","+i,lt("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var i=t.split(":")
Un[i[1]]=n[i[0]]})}("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY"),lt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){x.units[t]="px"}),kn.registerPlugin(Lr)
var $r=kn.registerPlugin(Lr)||kn
const Yr=({items:t,ease:i="power3.out",duration:e=.6,stagger:o=.05,animateFrom:s="bottom",scaleOnHover:a=!0,hoverScale:u=.95,blurToFocus:h=!0,colorShiftOnHover:f=!1})=>{const c=((t,i)=>{const r=()=>i[t.findIndex(t=>matchMedia(t).matches)]??1,[e,o]=n.useState(r)
return n.useEffect(()=>{const i=()=>o(r)
return t.forEach(t=>matchMedia(t).addEventListener("change",i)),()=>t.forEach(t=>matchMedia(t).removeEventListener("change",i))},[t]),e})(["(min-width:1500px)","(min-width:1000px)","(min-width:600px)","(min-width:400px)"],[5,4,3,2]),[l,{width:d}]=(()=>{const t=n.useRef(null),[i,r]=n.useState({width:0,height:0})
return n.useLayoutEffect(()=>{if(!t.current)return
const i=new ResizeObserver(([t])=>{const{width:i,height:n}=t.contentRect
r({width:i,height:n})})
return i.observe(t.current),()=>i.disconnect()},[]),[t,i]})(),[p,v]=n.useState(!1)
n.useEffect(()=>{(async t=>{await Promise.all(t.map(t=>new Promise(i=>{const n=new Image
n.src=t,n.onload=n.onerror=()=>i()})))})(t.map(t=>t.img)).then(()=>v(!0))},[t])
const g=n.useMemo(()=>{if(!d)return[]
const i=new Array(c).fill(0),n=d/c
return t.map(t=>{const r=i.indexOf(Math.min(...i)),e=n*r,o=t.height||200,s=i[r]
return i[r]+=o+16,{...t,x:e,y:s,w:n-8,h:o}})},[c,t,d]),m=n.useRef(!1)
return n.useLayoutEffect(()=>{p&&(g.forEach((t,n)=>{const r=`[data-key="${t.id}"]`,a={x:t.x,y:t.y,width:t.w,height:t.h}
if(m.current)$r.to(r,{...a,duration:e,ease:i,overwrite:"auto"})
else{const i=(t=>{const i=l.current?.getBoundingClientRect()
if(!i)return{x:t.x,y:t.y}
let n=s
if("random"===s){const t=["top","bottom","left","right"]
n=t[Math.floor(Math.random()*t.length)]}switch(n){case"top":return{x:t.x,y:-200}
case"bottom":return{x:t.x,y:window.innerHeight+200}
case"left":return{x:-200,y:t.y}
case"right":return{x:window.innerWidth+200,y:t.y}
case"center":return{x:i.width/2-t.w/2,y:i.height/2-t.h/2}
default:return{x:t.x,y:t.y+100}}})(t),e={opacity:0,x:i.x,y:i.y,width:t.w,height:t.h,...h&&{filter:"blur(10px)"}}
$r.fromTo(r,e,{opacity:1,...a,...h&&{filter:"blur(0px)"},duration:.8,ease:"power3.out",delay:n*o})}}),m.current=!0)},[g,p,o,s,h,e,i]),r.jsx("div",{ref:l,style:{position:"relative",width:"100%",height:g.length>0?Math.max(...g.map(t=>t.y+t.h))+"px":"auto"},children:g.map(t=>r.jsx("div",{"data-key":t.id,className:"item-wrapper",style:{position:"absolute",cursor:"pointer",borderRadius:"8px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)"},onClick:()=>window.open(t.url,"_blank","noopener"),onMouseEnter:i=>((t,i)=>{const n=t.currentTarget,r=`[data-key="${i.id}"]`
if(a&&$r.to(r,{scale:u,duration:.3,ease:"power2.out"}),f){const t=n.querySelector(".color-overlay")
t&&$r.to(t,{opacity:.3,duration:.3})}})(i,t),onMouseLeave:i=>((t,i)=>{const n=t.currentTarget,r=`[data-key="${i.id}"]`
if(a&&$r.to(r,{scale:1,duration:.3,ease:"power2.out"}),f){const t=n.querySelector(".color-overlay")
t&&$r.to(t,{opacity:0,duration:.3})}})(i,t),children:r.jsx("div",{className:"item-img",style:{backgroundImage:`url(${t.img})`,width:"100%",height:"100%",backgroundSize:"cover",backgroundPosition:"center",borderRadius:"8px"},children:f&&r.jsx("div",{className:"color-overlay",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",opacity:0,pointerEvents:"none",borderRadius:"8px"}})})},t.id))})},Xr=Object.freeze(Object.defineProperty({__proto__:null,default:()=>{const{isMobile:t,width:i}=e(),[a,u]=n.useState(!1),[h,f]=n.useState(!0),[c,l]=n.useState("About"),[d,p]=n.useState(""),[v,g]=n.useState(!0),[m,x]=n.useState(null),[w,y]=n.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:825,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:440,textUsWidth:299})
n.useEffect(()=>{(()=>{const n=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n)
u(t||r||i<=768),f(!1)})()},[t,i]),n.useEffect(()=>{(()=>{const t=i-32,n=Math.max(829,789)
let r=Math.min(t/n,793/n)
r<.25&&(r=.25),r>1.25&&(r=1.25)
const e={heroWidth:Math.round(299*r),heroHeight:Math.round(299*r),rightHeroWidth:Math.round(498*r),rightHeroHeight:Math.round(299*r),gap:Math.round(32*r),containerWidth:825,eventsWidth:Math.round(440*r),textUsWidth:Math.round(299*r),eventsTextGap:18,eventCardWidth:220,eventCardHeight:85}
y(e)})()},[i]),n.useEffect(()=>{b()},[])
const b=async()=>{try{g(!0),x(null)
const t="localhost"===window.location.hostname?"":"https://admin.b2b.click"
void 0
const i=await fetch(`${t}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"})
if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`)
const n=await i.json()
if(!n.success||!n.data)throw new Error("Invalid response format")
p(n.data.content)}catch(t){void 0,x(t.message),p("Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.\n\nOur platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.\n\nAt BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.\n\nJoin our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.")}finally{g(!1)}},M=t=>{l(t),"Events"===t?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":"About"===t?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":"Contact"===t&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},F=(t,i)=>{const n=c===t
return{position:"absolute",left:i,top:"4.15px",display:"flex",width:"82.54px",height:"30.81px",padding:"13px 12px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"10px",background:n?"#000":"transparent",boxShadow:n?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:n?"scale(1)":"scale(0.95)",opacity:n?1:.8}},k=t=>({color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:c===t?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"})
if(h)return r.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px"},children:"Loading..."})
if(a){const t=o.lazy(()=>s(()=>import("./AboutPageMobile-CO375bd0.js"),__vite__mapDeps([0,1,2,3])))
return r.jsx(o.Suspense,{fallback:r.jsx("div",{style:{position:"fixed",top:"20px",right:"20px",background:"rgba(0, 0, 0, 0.8)",color:"#FFFFFF",padding:"8px 16px",borderRadius:"20px",fontFamily:"Inter, sans-serif",fontSize:"14px",zIndex:9999,backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)",opacity:.9},children:"Loading about page..."}),children:r.jsx(t,{})})}return r.jsx("div",{className:"homepage-content",children:r.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${w.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"100vh",padding:"0 16px",boxSizing:"border-box"},children:r.jsxs("div",{style:{width:"100%",position:"relative"},children:[r.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[r.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",style:{width:"138.41px",height:"43px"}}),r.jsxs("div",{style:{position:"relative",width:"260.46px",height:"39.1px",gridColumn:"3",justifySelf:"end"},children:[r.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"260.46px",height:"39.1px",background:"#232323",borderRadius:"12px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),r.jsx("div",{style:F("Events","3.73px"),onClick:()=>M("Events"),children:r.jsx("span",{style:k("Events"),children:"Events"})}),r.jsx("div",{style:F("About","88.58px"),onClick:()=>M("About"),children:r.jsx("span",{style:k("About"),children:"About"})}),r.jsx("div",{style:F("Contact","173.44px"),onClick:()=>M("Contact"),children:r.jsx("span",{style:k("Contact"),children:"Contact"})})]})]}),r.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px"},children:"About Us"}),r.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box"},children:v?r.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"200px",fontSize:"16px",color:"rgba(255, 255, 255, 0.7)"},children:"Loading content..."}):r.jsxs(r.Fragment,{children:[r.jsx("div",{style:{textAlign:"left"},children:(t=>{if(!t)return[]
const i=t.split(/\n\s*\n|\n/).filter(t=>t.trim())
return i.map((t,n)=>r.jsx("p",{style:{margin:n===i.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:t.trim()},n))})(d)}),m&&r.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})}),r.jsxs("div",{style:{width:"100%",maxWidth:"1000px",margin:"48px auto 0 auto",padding:"0 16px",boxSizing:"border-box"},children:[r.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),r.jsx(Yr,{items:[{id:"1",img:"https://picsum.photos/id/1015/600/900",url:"https://example.com/one",height:400},{id:"2",img:"https://picsum.photos/id/1011/600/750",url:"https://example.com/two",height:250},{id:"3",img:"https://picsum.photos/id/1020/600/800",url:"https://example.com/three",height:300},{id:"4",img:"https://picsum.photos/id/1025/600/700",url:"https://example.com/four",height:350},{id:"5",img:"https://picsum.photos/id/1035/600/650",url:"https://example.com/five",height:280},{id:"6",img:"https://picsum.photos/id/1040/600/850",url:"https://example.com/six",height:420},{id:"7",img:"https://picsum.photos/id/1050/600/600",url:"https://example.com/seven",height:320},{id:"8",img:"https://picsum.photos/id/1060/600/750",url:"https://example.com/eight",height:380}],ease:"power3.out",duration:.6,stagger:.05,animateFrom:"bottom",scaleOnHover:!0,hoverScale:.95,blurToFocus:!0,colorShiftOnHover:!1})]})]})})})}},Symbol.toStringTag,{value:"Module"}))
export{Xr as A,Yr as M}
