function n(n,e){if(!1===n||null==n)throw new Error(e)}function e(n,e){if(!n){"undefined"!=typeof console,0
try{throw new Error(e)}catch(lr){}}}function t({pathname:n="/",search:e="",hash:t=""}){return e&&"?"!==e&&(n+="?"===e.charAt(0)?e:"?"+e),t&&"#"!==t&&(n+="#"===t.charAt(0)?t:"#"+t),n}function r(n){let e={}
if(n){let t=n.indexOf("#")
t>=0&&(e.hash=n.substring(t),n=n.substring(0,t))
let r=n.indexOf("?")
r>=0&&(e.search=n.substring(r),n=n.substring(0,r)),n&&(e.pathname=n)}return e}function l(n,e,t="/"){return function(n,e,t){let l=s(("string"==typeof e?r(e):e).pathname||"/",t)
if(null==l)return null
let o=u(n)
!function(n){n.sort((n,e)=>n.score!==e.score?e.score-n.score:function(n,e){return n.length===e.length&&n.slice(0,-1).every((n,t)=>n===e[t])?n[n.length-1]-e[e.length-1]:0}(n.routesMeta.map(n=>n.childrenIndex),e.routesMeta.map(n=>n.childrenIndex)))}(o)
let i=null
for(let r=0;null==i&&r<o.length;++r){let n=f(l)
i=a(o[r],n,!1)}return i}(n,e,t)}function u(e,t=[],r=[],l=""){let a=(e,o,a)=>{let c={relativePath:void 0===a?e.path||"":a,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e}
c.relativePath.startsWith("/")&&(n(c.relativePath.startsWith(l),`Absolute route path "${c.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(l.length))
let f=xe([l,c.relativePath]),s=r.concat(c)
e.children&&e.children.length>0&&(n(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${f}".`),u(e.children,t,s,f)),(null!=e.path||e.index)&&t.push({path:f,score:i(f,e.index),routesMeta:s})}
return e.forEach((n,e)=>{if(""!==n.path&&n.path?.includes("?"))for(let t of o(n.path))a(n,e,t)
else a(n,e)}),t}function o(n){let e=n.split("/")
if(0===e.length)return[]
let[t,...r]=e,l=t.endsWith("?"),u=t.replace(/\?$/,"")
if(0===r.length)return l?[u,""]:[u]
let i=o(r.join("/")),a=[]
return a.push(...i.map(n=>""===n?u:[u,n].join("/"))),l&&a.push(...i),a.map(e=>n.startsWith("/")&&""===e?"/":e)}function i(n,e){let t=n.split("/"),r=t.length
return t.some(ke)&&(r+=ge),e&&(r+=me),t.filter(n=>!ke(n)).reduce((n,e)=>n+(he.test(e)?ye:""===e?be:we),r)}function a(n,e,t=!1){let{routesMeta:r}=n,l={},u="/",o=[]
for(let i=0;i<r.length;++i){let n=r[i],a=i===r.length-1,f="/"===u?e:e.slice(u.length)||"/",s=c({path:n.relativePath,caseSensitive:n.caseSensitive,end:a},f),v=n.route
if(!s&&a&&t&&!r[r.length-1].route.index&&(s=c({path:n.relativePath,caseSensitive:n.caseSensitive,end:!1},f)),!s)return null
Object.assign(l,s.params),o.push({params:l,pathname:xe([u,s.pathname]),pathnameBase:Se(xe([u,s.pathnameBase])),route:v}),"/"!==s.pathnameBase&&(u=xe([u,s.pathnameBase]))}return o}function c(n,t){"string"==typeof n&&(n={path:n,caseSensitive:!1,end:!0})
let[r,l]=function(n,t=!1,r=!0){e("*"===n||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`)
let l=[],u="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(n,e,t)=>(l.push({paramName:e,isOptional:null!=t}),t?"/?([^\\/]+)?":"/([^\\/]+)"))
return n.endsWith("*")?(l.push({paramName:"*"}),u+="*"===n||"/*"===n?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?u+="\\/*$":""!==n&&"/"!==n&&(u+="(?:(?=\\/|$))"),[new RegExp(u,t?void 0:"i"),l]}(n.path,n.caseSensitive,n.end),u=t.match(r)
if(!u)return null
let o=u[0],i=o.replace(/(.)\/+$/,"$1"),a=u.slice(1)
return{params:l.reduce((n,{paramName:e,isOptional:t},r)=>{if("*"===e){let n=a[r]||""
i=o.slice(0,o.length-n.length).replace(/(.)\/+$/,"$1")}const l=a[r]
return n[e]=t&&!l?void 0:(l||"").replace(/%2F/g,"/"),n},{}),pathname:o,pathnameBase:i,pattern:n}}function f(n){try{return n.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(t){return e(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),n}}function s(n,e){if("/"===e)return n
if(!n.toLowerCase().startsWith(e.toLowerCase()))return null
let t=e.endsWith("/")?e.length-1:e.length,r=n.charAt(t)
return r&&"/"!==r?null:n.slice(t)||"/"}function v(n,e,t,r){return`Cannot include a '${n}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function d(n){let e=function(n){return n.filter((n,e)=>0===e||n.route.path&&n.route.path.length>0)}(n)
return e.map((n,t)=>t===e.length-1?n.pathname:n.pathnameBase)}function p(e,t,l,u=!1){let o
"string"==typeof e?o=r(e):(o={...e},n(!o.pathname||!o.pathname.includes("?"),v("?","pathname","search",o)),n(!o.pathname||!o.pathname.includes("#"),v("#","pathname","hash",o)),n(!o.search||!o.search.includes("#"),v("#","search","hash",o)))
let i,a=""===e||""===o.pathname,c=a?"/":o.pathname
if(null==c)i=l
else{let n=t.length-1
if(!u&&c.startsWith("..")){let e=c.split("/")
for(;".."===e[0];)e.shift(),n-=1
o.pathname=e.join("/")}i=n>=0?t[n]:"/"}let f=function(n,e="/"){let{pathname:t,search:l="",hash:u=""}="string"==typeof n?r(n):n,o=t?t.startsWith("/")?t:function(n,e){let t=e.replace(/\/+$/,"").split("/")
return n.split("/").forEach(n=>{".."===n?t.length>1&&t.pop():"."!==n&&t.push(n)}),t.length>1?t.join("/"):"/"}(t,e):e
return{pathname:o,search:Ee(l),hash:Ce(u)}}(o,i),s=c&&"/"!==c&&c.endsWith("/"),d=(a||"."===c)&&l.endsWith("/")
return f.pathname.endsWith("/")||!s&&!d||(f.pathname+="/"),f}function h(){return null!=Tn.useContext($e)}function y(){return n(h(),"useLocation() may be used only in the context of a <Router> component."),Tn.useContext($e).location}function m(n){Tn.useContext(Fe).static||Tn.useLayoutEffect(n)}function b(){let{isDataRoute:t}=Tn.useContext(Ie)
return t?function(){let{router:t}=function(){let e=Tn.useContext(Pe)
return n(e,k("useNavigate")),e}(),r=x("useNavigate"),l=Tn.useRef(!1)
return m(()=>{l.current=!0}),Tn.useCallback(async(n,u={})=>{e(l.current,De),l.current&&("number"==typeof n?t.navigate(n):await t.navigate(n,{fromRouteId:r,...u}))},[t,r])}():function(){n(h(),"useNavigate() may be used only in the context of a <Router> component.")
let t=Tn.useContext(Pe),{basename:r,navigator:l}=Tn.useContext(Fe),{matches:u}=Tn.useContext(Ie),{pathname:o}=y(),i=JSON.stringify(d(u)),a=Tn.useRef(!1)
return m(()=>{a.current=!0}),Tn.useCallback((n,u={})=>{if(e(a.current,De),!a.current)return
if("number"==typeof n)return l.go(n),void 0
let c=p(n,JSON.parse(i),o,"path"===u.relative)
null==t&&"/"!==r&&(c.pathname="/"===c.pathname?r:xe([r,c.pathname])),(u.replace?l.replace:l.push)(c,u.state,u)},[r,l,i,o,t])}()}function w(n,{relative:e}={}){let{matches:t}=Tn.useContext(Ie),{pathname:r}=y(),l=JSON.stringify(d(t))
return Tn.useMemo(()=>p(n,JSON.parse(l),r,"path"===e),[n,l,r,e])}function g({routeContext:n,match:e,children:t}){let r=Tn.useContext(Pe)
return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext.t=e.route.id),Tn.createElement(Ie.Provider,{value:n},t)}function k(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function x(e){let t=function(e){let t=Tn.useContext(Ie)
return n(t,k(e)),t}(e),r=t.matches[t.matches.length-1]
return n(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function S(n,t,r){t||Ne[n]||(Ne[n]=!0,e(!1,r))}function E(n){return null!=n&&"string"==typeof n.tagName}function C(n){return null==n||Be.has(n)?n:(e(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${_e}"`),null)}function R(n,e){if(!1===n||null==n)throw new Error(e)}function M(n){return null!=n&&(null==n.href?"preload"===n.rel&&"string"==typeof n.imageSrcSet&&"string"==typeof n.imageSizes:"string"==typeof n.rel&&"string"==typeof n.href)}function P(n,e,t,r,l,u){let o=(n,e)=>!t[e]||n.route.id!==t[e].route.id,i=(n,e)=>t[e].pathname!==n.pathname||t[e].route.path?.endsWith("*")&&t[e].params["*"]!==n.params["*"]
return"assets"===u?e.filter((n,e)=>o(n,e)||i(n,e)):"data"===u?e.filter((e,u)=>{let a=r.routes[e.route.id]
if(!a||!a.hasLoader)return!1
if(o(e,u)||i(e,u))return!0
if(e.route.shouldRevalidate){let r=e.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:t[0]?.params||{},nextUrl:new URL(n,window.origin),nextParams:e.params,defaultShouldRevalidate:!0})
if("boolean"==typeof r)return r}return!0}):[]}function T(){let n=Tn.useContext(Pe)
return R(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function j(){let n=Tn.useContext(He)
return R(n,"You must render this element inside a <HydratedRouter> element"),n}function F(n,e){return t=>{n&&n(t),t.defaultPrevented||e(t)}}function $({page:n,...e}){let{router:t}=T(),r=Tn.useMemo(()=>l(t.routes,n,t.basename),[t.routes,n,t.basename])
return r?Tn.createElement(I,{page:n,matches:r,...e}):null}function I({page:n,matches:e,...t}){let r=y(),{manifest:l,routeModules:u}=j(),{basename:o}=T(),{loaderData:i,matches:a}=function(){let n=Tn.useContext(Te)
return R(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}(),c=Tn.useMemo(()=>P(n,e,a,l,r,"data"),[n,e,a,l,r]),f=Tn.useMemo(()=>P(n,e,a,l,r,"assets"),[n,e,a,l,r]),v=Tn.useMemo(()=>{if(n===r.pathname+r.search+r.hash)return[]
let t=new Set,a=!1
if(e.forEach(n=>{let e=l.routes[n.route.id]
e&&e.hasLoader&&(!c.some(e=>e.route.id===n.route.id)&&n.route.id in i&&u[n.route.id]?.shouldRevalidate||e.hasClientLoader?a=!0:t.add(n.route.id))}),0===t.size)return[]
let f=function(n,e,t){let r="string"==typeof n?new URL(n,"undefined"==typeof window?"server://singlefetch/":window.location.origin):n
return"/"===r.pathname?r.pathname=`_root.${t}`:e&&"/"===s(r.pathname,e)?r.pathname=`${e.replace(/\/$/,"")}/_root.${t}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${t}`,r}(n,o,"data")
return a&&t.size>0&&f.searchParams.set("_routes",e.filter(n=>t.has(n.route.id)).map(n=>n.route.id).join(",")),[f.pathname+f.search]},[o,i,r,l,c,e,n,u]),d=Tn.useMemo(()=>function(n,e,{includeHydrateFallback:t}={}){return r=n.map(n=>{let r=e.routes[n.route.id]
if(!r)return[]
let l=[r.module]
return r.clientActionModule&&(l=l.concat(r.clientActionModule)),r.clientLoaderModule&&(l=l.concat(r.clientLoaderModule)),t&&r.hydrateFallbackModule&&(l=l.concat(r.hydrateFallbackModule)),r.imports&&(l=l.concat(r.imports)),l}).flat(1),[...new Set(r)]
var r}(f,l),[f,l]),p=function(n){let{manifest:e,routeModules:t}=j(),[r,l]=Tn.useState([])
return Tn.useEffect(()=>{let r=!1
return void async function(n,e,t){return function(n){let e=new Set
return new Set(void 0),n.reduce((n,t)=>{let r=JSON.stringify(function(n){let e={},t=Object.keys(n).sort()
for(let r of t)e[r]=n[r]
return e}(t))
return e.has(r)||(e.add(r),n.push({key:r,link:t})),n},[])}((await Promise.all(n.map(async n=>{let r=e.routes[n.route.id]
if(r){let n=await async function(n,e){if(n.id in e)return e[n.id]
try{let t=await import(n.module)
return e[n.id]=t,t}catch(t){return void 0,window.location.reload(),new Promise(()=>{})}}(r,t)
return n.links?n.links():[]}return[]}))).flat(1).filter(M).filter(n=>"stylesheet"===n.rel||"preload"===n.rel).map(n=>"stylesheet"===n.rel?{...n,rel:"prefetch",as:"style"}:{...n,rel:"prefetch"}))}(n,e,t).then(n=>{r||l(n)}),()=>{r=!0}},[n,e,t]),r}(f)
return Tn.createElement(Tn.Fragment,null,v.map(n=>Tn.createElement("link",{key:n,rel:"prefetch",as:"fetch",href:n,...t})),d.map(n=>Tn.createElement("link",{key:n,rel:"modulepreload",href:n,...t})),p.map(({key:n,link:e})=>Tn.createElement("link",{key:n,nonce:t.nonce,...e})))}function z(...n){return e=>{n.forEach(n=>{"function"==typeof n?n(e):null!=n&&(n.current=e)})}}function D(e){let t=Tn.useContext(Pe)
return n(t,function(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}(e)),t}function O(){return Ke||(Ke=1,(n=ut).exports=function(n){function e(n,e,t,r){return new Tl(n,e,t,r)}function t(){}function r(n){var e="https://react.dev/errors/"+n
if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1])
for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=du&&n[du]||n["@@iterator"])?n:null}function u(n){if(null==n)return null
if("function"==typeof n)return n.$$typeof===pu?null:n.displayName||n.name||null
if("string"==typeof n)return n
switch(n){case nu:return"Fragment"
case Zl:return"Portal"
case tu:return"Profiler"
case eu:return"StrictMode"
case iu:return"Suspense"
case au:return"SuspenseList"}if("object"==typeof n)switch(n.$$typeof){case uu:return(n.displayName||"Context")+".Provider"
case lu:return(n.l.displayName||"Context")+".Consumer"
case ou:var e=n.render
return(n=n.displayName)||(n=""!==(n=e.displayName||e.name||"")?"ForwardRef("+n+")":"ForwardRef"),n
case cu:return null!==(e=n.displayName||null)?e:u(n.type)||"Memo"
case fu:e=n.u,n=n.o
try{return u(n(e))}catch(t){}}return null}function o(n){if(void 0===Vl)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/)
Vl=e&&e[1]||"",Wl=-1<t.stack.indexOf("\n    at")?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Vl+n+Wl}function i(n,e){if(!n||yu)return""
yu=!0
var t=Error.prepareStackTrace
Error.prepareStackTrace=void 0
try{var r={DetermineComponentFrameRoot:function(){try{if(e){var t=function(){throw Error()}
if(Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(l){var r=l}Reflect.construct(n,[],t)}else{try{t.call()}catch(u){r=u}n.call(t.prototype)}}else{try{throw Error()}catch(o){r=o}(t=n())&&"function"==typeof t.catch&&t.catch(function(){})}}catch(i){if(i&&r&&"string"==typeof i.stack)return[i.stack,r.stack]}return[null,null]}}
r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot"
var l=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name")
l&&l.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"})
var u=r.DetermineComponentFrameRoot(),i=u[0],a=u[1]
if(i&&a){var c=i.split("\n"),f=a.split("\n")
for(l=r=0;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++
for(;l<f.length&&!f[l].includes("DetermineComponentFrameRoot");)l++
if(r===c.length||l===f.length)for(r=c.length-1,l=f.length-1;1<=r&&0<=l&&c[r]!==f[l];)l--
for(;1<=r&&0<=l;r--,l--)if(c[r]!==f[l]){if(1!==r||1!==l)do{if(r--,0>--l||c[r]!==f[l]){var s="\n"+c[r].replace(" at new "," at ")
return n.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",n.displayName)),s}}while(1<=r&&0<=l)
break}}}finally{yu=!1,Error.prepareStackTrace=t}return(t=n?n.displayName||n.name:"")?o(t):""}function a(n){switch(n.tag){case 26:case 27:case 5:return o(n.type)
case 16:return o("Lazy")
case 13:return o("Suspense")
case 19:return o("SuspenseList")
case 0:case 15:return i(n.type,!1)
case 11:return i(n.type.render,!1)
case 1:return i(n.type,!0)
default:return""}}function c(n){try{var e=""
do{e+=a(n),n=n.return}while(n)
return e}catch(t){return"\nError generating stack: "+t.message+"\n"+t.stack}}function f(n){var e=n,t=n
if(n.alternate)for(;e.return;)e=e.return
else{n=e
do{!!(4098&(e=n).flags)&&(t=e.return),n=e.return}while(n)}return 3===e.tag?t:null}function s(n){if(f(n)!==n)throw Error(r(188))}function v(n){var e=n.alternate
if(!e){if(null===(e=f(n)))throw Error(r(188))
return e!==n?null:n}for(var t=n,l=e;;){var u=t.return
if(null===u)break
var o=u.alternate
if(null===o){if(null!==(l=u.return)){t=l
continue}break}if(u.child===o.child){for(o=u.child;o;){if(o===t)return s(u),n
if(o===l)return s(u),e
o=o.sibling}throw Error(r(188))}if(t.return!==l.return)t=u,l=o
else{for(var i=!1,a=u.child;a;){if(a===t){i=!0,t=u,l=o
break}if(a===l){i=!0,l=u,t=o
break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===t){i=!0,t=o,l=u
break}if(a===l){i=!0,l=o,t=u
break}a=a.sibling}if(!i)throw Error(r(189))}}if(t.alternate!==l)throw Error(r(190))}if(3!==t.tag)throw Error(r(188))
return t.stateNode.current===t?n:e}function d(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(null!==(e=d(n)))return e
n=n.sibling}return null}function p(n){var e=n.tag
if(5===e||26===e||27===e||6===e)return n
for(n=n.child;null!==n;){if(4!==n.tag&&null!==(e=p(n)))return e
n=n.sibling}return null}function h(n){return{current:n}}function y(n){0>Si||(n.current=xi[Si],xi[Si]=null,Si--)}function m(n,e){Si++,xi[Si]=n.current,n.current=e}function b(n){var e=42&n
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
default:return n}}function w(n,e){var t=n.pendingLanes
if(0===t)return 0
var r=0,l=n.suspendedLanes,u=n.pingedLanes,o=n.warmLanes
n=0!==n.finishedLanes
var i=134217727&t
return 0!==i?0!==(t=i&~l)?r=b(t):0!==(u&=i)?r=b(u):n||0!==(o=i&~o)&&(r=b(o)):0!==(i=t&~l)?r=b(i):0!==u?r=b(u):n||0!==(o=t&~o)&&(r=b(o)),0===r?0:0!==e&&e!==r&&0===(e&l)&&((l=r&-r)>=(o=e&-e)||32===l&&4194176&o)?e:r}function g(n,e){return 0===(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&e)}function k(n,e){switch(n){case 1:case 2:case 4:case 8:return e+250
case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3
default:return-1}}function x(){var n=Pi
return!(4194176&(Pi<<=1))&&(Pi=128),n}function S(){var n=Ti
return!(62914560&(Ti<<=1))&&(Ti=4194304),n}function E(n){for(var e=[],t=0;31>t;t++)e.push(n)
return e}function C(n,e){n.pendingLanes|=e,268435456!==e&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function R(n,e,t){n.pendingLanes|=e,n.suspendedLanes&=~e
var r=31-Ci(e)
n.entangledLanes|=e,n.entanglements[r]=1073741824|n.entanglements[r]|4194218&t}function M(n,e){var t=n.entangledLanes|=e
for(n=n.entanglements;t;){var r=31-Ci(t),l=1<<r
l&e|n[r]&e&&(n[r]|=e),t&=~l}}function P(n){return 2<(n&=-n)?8<n?134217727&n?32:268435456:8:2}function T(n){if("function"==typeof Ai&&_i(n),Bi&&"function"==typeof Bi.setStrictMode)try{Bi.setStrictMode(Ui,n)}catch(e){}}function j(n,e){if("object"==typeof n&&null!==n){var t=qi.get(n)
return void 0!==t?t:(e={value:n,source:e,stack:c(e)},qi.set(n,e),e)}return{value:n,source:e,stack:c(e)}}function F(n,e){Vi[Wi++]=Ji,Vi[Wi++]=Yi,Yi=n,Ji=e}function $(n,e,t){Gi[Qi++]=Xi,Gi[Qi++]=Zi,Gi[Qi++]=Ki,Ki=n
var r=Xi
n=Zi
var l=32-Ci(r)-1
r&=~(1<<l),t+=1
var u=32-Ci(e)+l
if(30<u){var o=l-l%5
u=(r&(1<<o)-1).toString(32),r>>=o,l-=o,Xi=1<<32-Ci(e)+l|t<<l|r,Zi=u+n}else Xi=1<<u|t<<l|r,Zi=n}function I(n){null!==n.return&&(F(n,1),$(n,1,0))}function z(n){for(;n===Yi;)Yi=Vi[--Wi],Vi[Wi]=null,Ji=Vi[--Wi],Vi[Wi]=null
for(;n===Ki;)Ki=Gi[--Qi],Gi[Qi]=null,Zi=Gi[--Qi],Gi[Qi]=null,Xi=Gi[--Qi],Gi[Qi]=null}function D(n,e){m(ta,e),m(ea,n),m(na,null),n=xu(e),y(na),m(na,n)}function O(){y(na),y(ea),y(ta)}function L(n){null!==n.memoizedState&&m(ra,n)
var e=na.current,t=Su(e,n.type)
e!==t&&(m(ea,n),m(na,t))}function N(n){ea.current===n&&(y(na),y(ea)),ra.current===n&&(y(ra),zu?Ku.i=Qu:Ku.v=Qu)}function A(n){throw q(j(Error(r(418,"")),n)),ca}function _(n,e){if(!Lu)throw Error(r(175))
Vo(n.stateNode,n.type,n.memoizedProps,e,n)||A(n)}function U(n){for(la=n.return;la;)switch(la.tag){case 3:case 27:return aa=!0,void 0
case 5:case 13:return aa=!1,void 0
default:la=la.return}}function B(n){if(!Lu||n!==la)return!1
if(!oa)return U(n),oa=!0,!1
var e=!1
if(yi?3!==n.tag&&27!==n.tag&&(5!==n.tag||Zo(n.type)&&!Tu(n.type,n.memoizedProps))&&(e=!0):3!==n.tag&&(5!==n.tag||Zo(n.type)&&!Tu(n.type,n.memoizedProps))&&(e=!0),e&&ua&&A(n),U(n),13===n.tag){if(!Lu)throw Error(r(316))
if(!(n=null!==(n=n.memoizedState)?n.dehydrated:null))throw Error(r(317))
ua=Jo(n)}else ua=la?No(n.stateNode):null
return!0}function H(){Lu&&(ua=la=null,oa=!1)}function q(n){null===ia?ia=[n]:ia.push(n)}function V(){for(var n=sa,e=va=sa=0;e<n;){var t=fa[e]
fa[e++]=null
var r=fa[e]
fa[e++]=null
var l=fa[e]
fa[e++]=null
var u=fa[e]
if(fa[e++]=null,null!==r&&null!==l){var o=r.pending
null===o?l.next=l:(l.next=o.next,o.next=l),r.pending=l}0!==u&&G(t,l,u)}}function W(n,e,t,r){fa[sa++]=n,fa[sa++]=e,fa[sa++]=t,fa[sa++]=r,va|=r,n.lanes|=r,null!==(n=n.alternate)&&(n.lanes|=r)}function Y(n,e,t,r){return W(n,e,t,r),Q(n)}function J(n,e){return W(n,null,null,e),Q(n)}function G(n,e,t){n.lanes|=t
var r=n.alternate
null!==r&&(r.lanes|=t)
for(var l=!1,u=n.return;null!==u;)u.childLanes|=t,null!==(r=u.alternate)&&(r.childLanes|=t),22===u.tag&&(null===(n=u.stateNode)||1&n.p||(l=!0)),n=u,u=u.return
l&&null!==e&&3===n.tag&&(u=n.stateNode,l=31-Ci(t),null===(n=(u=u.hiddenUpdates)[l])?u[l]=[e]:n.push(e),e.lane=536870912|t)}function Q(n){if(50<af)throw af=0,cf=null,Error(r(185))
for(var e=n.return;null!==e;)e=(n=e).return
return 3===n.tag?n.stateNode:null}function K(n){var e
n!==pa&&null===n.next&&(null===pa?da=pa=n:pa=pa.next=n),ya=!0,ha||(ha=!0,e=Z,Zu?no(function(){6&Ic?ji(Di,e):e()}):ji(Di,e))}function X(n,e){if(!ma&&ya){ma=!0
do{for(var t=!1,r=da;null!==r;){if(0!==n){var l=r.pendingLanes
if(0===l)var u=0
else{var o=r.suspendedLanes,i=r.pingedLanes
u=(1<<31-Ci(42|n)+1)-1,u=201326677&(u&=l&~(o&~i))?201326677&u|1:u?2|u:0}0!==u&&(t=!0,tn(r,u))}else u=Oc,!(3&(u=w(r,r===zc?u:0)))||g(r,u)||(t=!0,tn(r,u))
r=r.next}}while(t)
ma=!1}}function Z(){ya=ha=!1
var n=0
0!==ba&&(Hu()&&(n=ba),ba=0)
for(var e=zi(),t=null,r=da;null!==r;){var l=r.next,u=nn(r,e)
0===u?(r.next=null,null===t?da=l:t.next=l,null===l&&(pa=t)):(t=r,(0!==n||3&u)&&(ya=!0)),r=l}X(n)}function nn(n,e){for(var t=n.suspendedLanes,r=n.pingedLanes,l=n.expirationTimes,u=-62914561&n.pendingLanes;0<u;){var o=31-Ci(u),i=1<<o,a=l[o];-1===a?0!==(i&t)&&0===(i&r)||(l[o]=k(i,e)):a<=e&&(n.expiredLanes|=i),u&=~i}if(t=Oc,t=w(n,n===(e=zc)?t:0),r=n.callbackNode,0===t||n===e&&2===Lc||null!==n.cancelPendingCommit)return null!==r&&null!==r&&Fi(r),n.callbackNode=null,n.callbackPriority=0
if(!(3&t)||g(n,t)){if((e=t&-t)===n.callbackPriority)return e
switch(null!==r&&Fi(r),P(t)){case 2:case 8:t=Oi
break
case 32:default:t=Li
break
case 268435456:t=Ni}return r=en.bind(null,n),t=ji(t,r),n.callbackPriority=e,n.callbackNode=t,e}return null!==r&&null!==r&&Fi(r),n.callbackPriority=2,n.callbackNode=null,2}function en(n,e){var t=n.callbackNode
if(kl()&&n.callbackNode!==t)return null
var r=Oc
return 0===(r=w(n,n===zc?r:0))?null:(Xr(n,r,e),nn(n,zi()),null!=n.callbackNode&&n.callbackNode===t?en.bind(null,n):null)}function tn(n,e){if(kl())return null
Xr(n,e,!0)}function rn(){return 0===ba&&(ba=x()),ba}function ln(){if(0===--ga&&null!==wa){null!==xa&&(xa.status="fulfilled")
var n=wa
wa=null,ka=0,xa=null
for(var e=0;e<n.length;e++)(0,n[e])()}}function un(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function on(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function an(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function cn(n,e,t){var r=n.updateQueue
if(null===r)return null
if(r=r.shared,2&Ic){var l=r.pending
return null===l?e.next=e:(e.next=l.next,l.next=e),r.pending=e,e=Q(n),G(n,null,t),e}return W(n,r,e,t),Q(n)}function fn(n,e,t){if(null!==(e=e.updateQueue)&&(e=e.shared,4194176&t)){var r=e.lanes
t|=r&=n.pendingLanes,e.lanes=t,M(n,t)}}function sn(n,e){var t=n.updateQueue,r=n.alternate
if(null!==r&&t===(r=r.updateQueue)){var l=null,u=null
if(null!==(t=t.firstBaseUpdate)){do{var o={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null}
null===u?l=u=o:u=u.next=o,t=t.next}while(null!==t)
null===u?l=u=e:u=u.next=e}else l=u=e
return t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},n.updateQueue=t,void 0}null===(n=t.lastBaseUpdate)?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function vn(){if(Ea&&null!==xa)throw xa}function dn(n,e,t,r){Ea=!1
var l=n.updateQueue
Sa=!1
var u=l.firstBaseUpdate,o=l.lastBaseUpdate,i=l.shared.pending
if(null!==i){l.shared.pending=null
var a=i,c=a.next
a.next=null,null===o?u=c:o.next=c,o=a
var f=n.alternate
null!==f&&(i=(f=f.updateQueue).lastBaseUpdate)!==o&&(null===i?f.firstBaseUpdate=c:i.next=c,f.lastBaseUpdate=a)}if(null!==u){var s=l.baseState
for(o=0,f=c=a=null,i=u;;){var v=-536870913&i.lane,d=v!==i.lane
if(d?(Oc&v)===v:(r&v)===v){0!==v&&v===ka&&(Ea=!0),null!==f&&(f=f.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null})
n:{var p=n,h=i
v=e
var y=t
switch(h.tag){case 1:if("function"==typeof(p=h.payload)){s=p.call(y,s,v)
break n}s=p
break n
case 3:p.flags=-65537&p.flags|128
case 0:if(null==(v="function"==typeof(p=h.payload)?p.call(y,s,v):p))break n
s=Ql({},s,v)
break n
case 2:Sa=!0}}null!==(v=i.callback)&&(n.flags|=64,d&&(n.flags|=8192),null===(d=l.callbacks)?l.callbacks=[v]:d.push(v))}else d={lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},null===f?(c=f=d,a=s):f=f.next=d,o|=v
if(null===(i=i.next)){if(null===(i=l.shared.pending))break
i=(d=i).next,d.next=null,l.lastBaseUpdate=d,l.shared.pending=null}1}null===f&&(a=s),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=f,null===u&&(l.shared.lanes=0),qc|=o,n.lanes=o,n.memoizedState=s}}function pn(n,e){if("function"!=typeof n)throw Error(r(191,n))
n.call(e)}function hn(n,e){var t=n.callbacks
if(null!==t)for(n.callbacks=null,n=0;n<t.length;n++)pn(t[n],e)}function yn(n,e){if(Hi(n,e))return!0
if("object"!=typeof n||null===n||"object"!=typeof e||null===e)return!1
var t=Object.keys(n),r=Object.keys(e)
if(t.length!==r.length)return!1
for(r=0;r<t.length;r++){var l=t[r]
if(!Ca.call(e,l)||!Hi(n[l],e[l]))return!1}return!0}function mn(n){return"fulfilled"===(n=n.status)||"rejected"===n}function bn(){}function wn(n,e,t){switch(void 0===(t=n[t])?n.push(e):t!==e&&(e.then(bn,bn),e=t),e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ra)throw Error(r(483))
throw n
default:if("string"==typeof e.status)e.then(bn,bn)
else{if(null!==(n=zc)&&100<n.shellSuspendCounter)throw Error(r(482));(n=e).status="pending",n.then(function(n){if("pending"===e.status){var t=e
t.status="fulfilled",t.value=n}},function(n){if("pending"===e.status){var t=e
t.status="rejected",t.reason=n}})}switch(e.status){case"fulfilled":return e.value
case"rejected":if((n=e.reason)===Ra)throw Error(r(483))
throw n}throw Ta=e,Ra}}function gn(){if(null===Ta)throw Error(r(459))
var n=Ta
return Ta=null,n}function kn(n){var e=Fa
return Fa+=1,null===ja&&(ja=[]),wn(ja,n,e)}function xn(n,e){e=e.props.ref,n.ref=void 0!==e?e:null}function Sn(n,e){if(e.$$typeof===Kl)throw Error(r(525))
throw n=Object.prototype.toString.call(e),Error(r(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function En(n){return(0,n.o)(n.u)}function Cn(n){function t(e,t){if(n){var r=e.deletions
null===r?(e.deletions=[t],e.flags|=16):r.push(t)}}function u(e,r){if(!n)return null
for(;null!==r;)t(e,r),r=r.sibling
return null}function o(n){for(var e=new Map;null!==n;)null!==n.key?e.set(n.key,n):e.set(n.index,n),n=n.sibling
return e}function i(n,e){return(n=Fl(n,e)).index=0,n.sibling=null,n}function a(e,t,r){return e.index=r,n?null!==(r=e.alternate)?(r=r.index)<t?(e.flags|=33554434,t):r:(e.flags|=33554434,t):(e.flags|=1048576,t)}function c(e){return n&&null===e.alternate&&(e.flags|=33554434),e}function f(n,e,t,r){return null===e||6!==e.tag?((e=Ol(t,n.mode,r)).return=n,e):((e=i(e,t)).return=n,e)}function s(n,e,t,r){var l=t.type
return l===nu?d(n,e,t.props.children,r,t.key):null!==e&&(e.elementType===l||"object"==typeof l&&null!==l&&l.$$typeof===fu&&En(l)===e.type)?(xn(e=i(e,t.props),t),e.return=n,e):(xn(e=Il(t.type,t.key,t.props,null,n.mode,r),t),e.return=n,e)}function v(n,e,t,r){return null===e||4!==e.tag||e.stateNode.containerInfo!==t.containerInfo||e.stateNode.implementation!==t.implementation?((e=Ll(t,n.mode,r)).return=n,e):((e=i(e,t.children||[])).return=n,e)}function d(n,e,t,r,l){return null===e||7!==e.tag?((e=zl(t,n.mode,r,l)).return=n,e):((e=i(e,t)).return=n,e)}function p(n,e,t){if("string"==typeof e&&""!==e||"number"==typeof e||"bigint"==typeof e)return(e=Ol(""+e,n.mode,t)).return=n,e
if("object"==typeof e&&null!==e){switch(e.$$typeof){case Xl:return xn(t=Il(e.type,e.key,e.props,null,n.mode,t),e),t.return=n,t
case Zl:return(e=Ll(e,n.mode,t)).return=n,e
case fu:return p(n,e=(0,e.o)(e.u),t)}if(mu(e)||l(e))return(e=zl(e,n.mode,t,null)).return=n,e
if("function"==typeof e.then)return p(n,kn(e),t)
if(e.$$typeof===uu)return p(n,Lt(n,e),t)
Sn(n,e)}return null}function h(n,e,t,r){var u=null!==e?e.key:null
if("string"==typeof t&&""!==t||"number"==typeof t||"bigint"==typeof t)return null!==u?null:f(n,e,""+t,r)
if("object"==typeof t&&null!==t){switch(t.$$typeof){case Xl:return t.key===u?s(n,e,t,r):null
case Zl:return t.key===u?v(n,e,t,r):null
case fu:return h(n,e,t=(u=t.o)(t.u),r)}if(mu(t)||l(t))return null!==u?null:d(n,e,t,r,null)
if("function"==typeof t.then)return h(n,e,kn(t),r)
if(t.$$typeof===uu)return h(n,e,Lt(n,t),r)
Sn(n,t)}return null}function y(n,e,t,r,u){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return f(e,n=n.get(t)||null,""+r,u)
if("object"==typeof r&&null!==r){switch(r.$$typeof){case Xl:return s(e,n=n.get(null===r.key?t:r.key)||null,r,u)
case Zl:return v(e,n=n.get(null===r.key?t:r.key)||null,r,u)
case fu:return y(n,e,t,r=(0,r.o)(r.u),u)}if(mu(r)||l(r))return d(e,n=n.get(t)||null,r,u,null)
if("function"==typeof r.then)return y(n,e,t,kn(r),u)
if(r.$$typeof===uu)return y(n,e,t,Lt(e,r),u)
Sn(e,r)}return null}function m(e,f,s,v){if("object"==typeof s&&null!==s&&s.type===nu&&null===s.key&&(s=s.props.children),"object"==typeof s&&null!==s){switch(s.$$typeof){case Xl:n:{for(var d=s.key;null!==f;){if(f.key===d){if((d=s.type)===nu){if(7===f.tag){u(e,f.sibling),(v=i(f,s.props.children)).return=e,e=v
break n}}else if(f.elementType===d||"object"==typeof d&&null!==d&&d.$$typeof===fu&&En(d)===f.type){u(e,f.sibling),xn(v=i(f,s.props),s),v.return=e,e=v
break n}u(e,f)
break}t(e,f),f=f.sibling}s.type===nu?((v=zl(s.props.children,e.mode,v,s.key)).return=e,e=v):(xn(v=Il(s.type,s.key,s.props,null,e.mode,v),s),v.return=e,e=v)}return c(e)
case Zl:n:{for(d=s.key;null!==f;){if(f.key===d){if(4===f.tag&&f.stateNode.containerInfo===s.containerInfo&&f.stateNode.implementation===s.implementation){u(e,f.sibling),(v=i(f,s.children||[])).return=e,e=v
break n}u(e,f)
break}t(e,f),f=f.sibling}(v=Ll(s,e.mode,v)).return=e,e=v}return c(e)
case fu:return m(e,f,s=(d=s.o)(s.u),v)}if(mu(s))return function(e,r,l,i){for(var c=null,f=null,s=r,v=r=0,d=null;null!==s&&v<l.length;v++){s.index>v?(d=s,s=null):d=s.sibling
var m=h(e,s,l[v],i)
if(null===m){null===s&&(s=d)
break}n&&s&&null===m.alternate&&t(e,s),r=a(m,r,v),null===f?c=m:f.sibling=m,f=m,s=d}if(v===l.length)return u(e,s),oa&&F(e,v),c
if(null===s){for(;v<l.length;v++)null!==(s=p(e,l[v],i))&&(r=a(s,r,v),null===f?c=s:f.sibling=s,f=s)
return oa&&F(e,v),c}for(s=o(s);v<l.length;v++)null!==(d=y(s,e,v,l[v],i))&&(n&&null!==d.alternate&&s.delete(null===d.key?v:d.key),r=a(d,r,v),null===f?c=d:f.sibling=d,f=d)
return n&&s.forEach(function(n){return t(e,n)}),oa&&F(e,v),c}(e,f,s,v)
if(l(s)){if("function"!=typeof(d=l(s)))throw Error(r(150))
return function(e,l,i,c){if(null==i)throw Error(r(151))
for(var f=null,s=null,v=l,d=l=0,m=null,b=i.next();null!==v&&!b.done;d++,b=i.next()){v.index>d?(m=v,v=null):m=v.sibling
var w=h(e,v,b.value,c)
if(null===w){null===v&&(v=m)
break}n&&v&&null===w.alternate&&t(e,v),l=a(w,l,d),null===s?f=w:s.sibling=w,s=w,v=m}if(b.done)return u(e,v),oa&&F(e,d),f
if(null===v){for(;!b.done;d++,b=i.next())null!==(b=p(e,b.value,c))&&(l=a(b,l,d),null===s?f=b:s.sibling=b,s=b)
return oa&&F(e,d),f}for(v=o(v);!b.done;d++,b=i.next())null!==(b=y(v,e,d,b.value,c))&&(n&&null!==b.alternate&&v.delete(null===b.key?d:b.key),l=a(b,l,d),null===s?f=b:s.sibling=b,s=b)
return n&&v.forEach(function(n){return t(e,n)}),oa&&F(e,d),f}(e,f,s=d.call(s),v)}if("function"==typeof s.then)return m(e,f,kn(s),v)
if(s.$$typeof===uu)return m(e,f,Lt(e,s),v)
Sn(e,s)}return"string"==typeof s&&""!==s||"number"==typeof s||"bigint"==typeof s?(s=""+s,null!==f&&6===f.tag?(u(e,f.sibling),(v=i(f,s)).return=e,e=v):(u(e,f),(v=Ol(s,e.mode,v)).return=e,e=v),c(e)):u(e,f)}return function(n,t,r,l){try{Fa=0
var u=m(n,t,r,l)
return ja=null,u}catch(i){if(i===Ra)throw i
var o=e(29,i,null,n.mode)
return o.lanes=l,o.return=n,o}}}function Rn(n,e){m(Da,n=Bc),m(za,e),Bc=n|e.baseLanes}function Mn(){m(Da,Bc),m(za,za.current)}function Pn(){Bc=Da.current,y(za),y(Da)}function Tn(n){var e=n.alternate
m(Na,1&Na.current),m(Oa,n),null===La&&(null===e||null!==za.current||null!==e.memoizedState)&&(La=n)}function Fn(n){if(22===n.tag){if(m(Na,Na.current),m(Oa,n),null===La){var e=n.alternate
null!==e&&null!==e.memoizedState&&(La=n)}}else $n()}function $n(){m(Na,Na.current),m(Oa,Oa.current)}function In(n){y(Oa),La===n&&(La=null),y(Na)}function zn(n){for(var e=n;null!==e;){if(13===e.tag){var t=e.memoizedState
if(null!==t&&(null===(t=t.dehydrated)||$o(t)||Io(t)))return e}else if(19===e.tag&&void 0!==e.memoizedProps.revealOrder){if(128&e.flags)return e}else if(null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return null
e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function Dn(){throw Error(r(321))}function On(n,e){if(null===e)return!1
for(var t=0;t<e.length&&t<n.length;t++)if(!Hi(n[t],e[t]))return!1
return!0}function Ln(n,e,t,r,l,u){return Aa=u,_a=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,hu.H=null===n||null===n.memoizedState?Xa:Za,Va=!1,u=t(r,l),Va=!1,qa&&(u=An(e,t,r,l)),Nn(n),u}function Nn(n){hu.H=Ka
var e=null!==Ua&&null!==Ua.next
if(Aa=0,Ba=Ua=_a=null,Ha=!1,Ya=0,Ja=null,e)throw Error(r(300))
null===n||lc||null!==(n=n.dependencies)&&zt(n)&&(lc=!0)}function An(n,e,t,l){_a=n
var u=0
do{if(qa&&(Ja=null),Ya=0,qa=!1,25<=u)throw Error(r(301))
if(u+=1,Ba=Ua=null,null!=n.updateQueue){var o=n.updateQueue
o.lastEffect=null,o.events=null,o.stores=null,null!=o.memoCache&&(o.memoCache.index=0)}hu.H=nc,o=e(t,l)}while(qa)
return o}function _n(){var n=hu.H,e=n.useState()[0]
return e="function"==typeof e.then?Wn(e):e,n=n.useState()[0],(null!==Ua?Ua.memoizedState:null)!==n&&(_a.flags|=1024),e}function Un(){var n=0!==Wa
return Wa=0,n}function Bn(n,e,t){e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~t}function Hn(n){if(Ha){for(n=n.memoizedState;null!==n;){var e=n.queue
null!==e&&(e.pending=null),n=n.next}Ha=!1}Aa=0,Ba=Ua=_a=null,qa=!1,Ya=Wa=0,Ja=null}function qn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
return null===Ba?_a.memoizedState=Ba=n:Ba=Ba.next=n,Ba}function Vn(){if(null===Ua){var n=_a.alternate
n=null!==n?n.memoizedState:null}else n=Ua.next
var e=null===Ba?_a.memoizedState:Ba.next
if(null!==e)Ba=e,Ua=n
else{if(null===n){if(null===_a.alternate)throw Error(r(467))
throw Error(r(310))}n={memoizedState:(Ua=n).memoizedState,baseState:Ua.baseState,baseQueue:Ua.baseQueue,queue:Ua.queue,next:null},null===Ba?_a.memoizedState=Ba=n:Ba=Ba.next=n}return Ba}function Wn(n){var e=Ya
return Ya+=1,null===Ja&&(Ja=[]),n=wn(Ja,n,e),e=_a,null===(null===Ba?e.memoizedState:Ba.next)&&(e=e.alternate,hu.H=null===e||null===e.memoizedState?Xa:Za),n}function Yn(n){if(null!==n&&"object"==typeof n){if("function"==typeof n.then)return Wn(n)
if(n.$$typeof===uu)return Ot(n)}throw Error(r(438,String(n)))}function Jn(n){var e=null,t=_a.updateQueue
if(null!==t&&(e=t.memoCache),null==e){var r=_a.alternate
null!==r&&null!==(r=r.updateQueue)&&null!=(r=r.memoCache)&&(e={data:r.data.map(function(n){return n.slice()}),index:0})}if(null==e&&(e={data:[],index:0}),null===t&&(t=Qa(),_a.updateQueue=t),t.memoCache=e,void 0===(t=e.data[e.index]))for(t=e.data[e.index]=Array(n),r=0;r<n;r++)t[r]=vu
return e.index++,t}function Gn(n,e){return"function"==typeof e?e(n):e}function Qn(n){return Kn(Vn(),Ua,n)}function Kn(n,e,t){var l=n.queue
if(null===l)throw Error(r(311))
l.lastRenderedReducer=t
var u=n.baseQueue,o=l.pending
if(null!==o){if(null!==u){var i=u.next
u.next=o.next,o.next=i}e.baseQueue=u=o,l.pending=null}if(o=n.baseState,null===u)n.memoizedState=o
else{var a=i=null,c=null,f=e=u.next,s=!1
do{var v=-536870913&f.lane
if(v!==f.lane?(Oc&v)===v:(Aa&v)===v){var d=f.revertLane
if(0===d)null!==c&&(c=c.next={lane:0,revertLane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),v===ka&&(s=!0)
else{if((Aa&d)===d){f=f.next,d===ka&&(s=!0)
continue}v={lane:0,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=v,i=o):c=c.next=v,_a.lanes|=d,qc|=d}v=f.action,Va&&t(o,v),o=f.hasEagerState?f.eagerState:t(o,v)}else d={lane:v,revertLane:f.revertLane,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null},null===c?(a=c=d,i=o):c=c.next=d,_a.lanes|=v,qc|=v
f=f.next}while(null!==f&&f!==e)
if(null===c?i=o:c.next=a,!Hi(o,n.memoizedState)&&(lc=!0,s&&null!==(t=xa)))throw t
n.memoizedState=o,n.baseState=i,n.baseQueue=c,l.lastRenderedState=o}return null===u&&(l.lanes=0),[n.memoizedState,l.dispatch]}function Xn(n){var e=Vn(),t=e.queue
if(null===t)throw Error(r(311))
t.lastRenderedReducer=n
var l=t.dispatch,u=t.pending,o=e.memoizedState
if(null!==u){t.pending=null
var i=u=u.next
do{o=n(o,i.action),i=i.next}while(i!==u)
Hi(o,e.memoizedState)||(lc=!0),e.memoizedState=o,null===e.baseQueue&&(e.baseState=o),t.lastRenderedState=o}return[o,l]}function Zn(n,e,t){var l=_a,u=Vn(),o=oa
if(o){if(void 0===t)throw Error(r(407))
t=t()}else t=e()
var i=!Hi((Ua||u).memoizedState,t)
if(i&&(u.memoizedState=t,lc=!0),u=u.queue,Ee(te.bind(null,l,u,n),[n]),u.getSnapshot!==e||i||null!==Ba&&1&Ba.memoizedState.tag){if(l.flags|=2048,we(9,ee.bind(null,l,u,t,e),{destroy:void 0},null),null===zc)throw Error(r(349))
o||60&Aa||ne(l,e,t)}return t}function ne(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},null===(e=_a.updateQueue)?(e=Qa(),_a.updateQueue=e,e.stores=[n]):null===(t=e.stores)?e.stores=[n]:t.push(n)}function ee(n,e,t,r){e.value=t,e.getSnapshot=r,re(e)&&le(n)}function te(n,e,t){return t(function(){re(e)&&le(n)})}function re(n){var e=n.getSnapshot
n=n.value
try{var t=e()
return!Hi(n,t)}catch(r){return!0}}function le(n){var e=J(n,2)
null!==e&&Kr(e,0,2)}function ue(n){var e=qn()
if("function"==typeof n){var t=n
if(n=t(),Va){T(!0)
try{t()}finally{T(!1)}}}return e.memoizedState=e.baseState=n,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gn,lastRenderedState:n},e}function oe(n,e,t,r){return n.baseState=t,Kn(n,Ua,"function"==typeof r?r:Gn)}function ie(n,e,t,l,u){if(qe(n))throw Error(r(485))
if(null!==(n=e.action)){var o={payload:u,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){o.listeners.push(n)}}
null!==hu.T?t(!0):o.isTransition=!1,l(o),null===(t=e.pending)?(o.next=e.pending=o,ae(e,o)):(o.next=t.next,e.pending=t.next=o)}}function ae(n,e){var t=e.action,r=e.payload,l=n.state
if(e.isTransition){var u=hu.T,o={}
hu.T=o
try{var i=t(l,r),a=hu.S
null!==a&&a(o,i),ce(n,e,i)}catch(c){se(n,e,c)}finally{hu.T=u}}else try{ce(n,e,u=t(l,r))}catch(f){se(n,e,f)}}function ce(n,e,t){null!==t&&"object"==typeof t&&"function"==typeof t.then?t.then(function(t){fe(n,e,t)},function(t){return se(n,e,t)}):fe(n,e,t)}function fe(n,e,t){e.status="fulfilled",e.value=t,ve(e),n.state=t,null!==(e=n.pending)&&((t=e.next)===e?n.pending=null:(t=t.next,e.next=t,ae(n,t)))}function se(n,e,t){var r=n.pending
if(n.pending=null,null!==r){r=r.next
do{e.status="rejected",e.reason=t,ve(e),e=e.next}while(e!==r)}n.action=null}function ve(n){n=n.listeners
for(var e=0;e<n.length;e++)(0,n[e])()}function de(n,e){return e}function pe(n,e){if(oa){var t=zc.formState
if(null!==t){n:{var r=_a
if(oa){if(ua){var l=Oo(ua,aa)
if(l){ua=No(l),r=Lo(l)
break n}}A(r)}r=!1}r&&(e=t[0])}}(t=qn()).memoizedState=t.baseState=e,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:de,lastRenderedState:e},t.queue=r,t=Ue.bind(null,_a,r),r.dispatch=t,r=ue(!1)
var u=He.bind(null,_a,!1,r.queue)
return l={state:e,dispatch:null,action:n,pending:null},(r=qn()).queue=l,t=ie.bind(null,_a,l,u,t),l.dispatch=t,r.memoizedState=n,[e,t,!1]}function he(n){return ye(Vn(),Ua,n)}function ye(n,e,t){e=Kn(n,e,de)[0],n=Qn(Gn)[0],e="object"==typeof e&&null!==e&&"function"==typeof e.then?Wn(e):e
var r=Vn(),l=r.queue,u=l.dispatch
return t!==r.memoizedState&&(_a.flags|=2048,we(9,me.bind(null,l,t),{destroy:void 0},null)),[e,u,n]}function me(n,e){n.action=e}function be(n){var e=Vn(),t=Ua
if(null!==t)return ye(e,t,n)
Vn(),e=e.memoizedState
var r=(t=Vn()).queue.dispatch
return t.memoizedState=n,[e,r,!1]}function we(n,e,t,r){return n={tag:n,create:e,inst:t,deps:r,next:null},null===(e=_a.updateQueue)&&(e=Qa(),_a.updateQueue=e),null===(t=e.lastEffect)?e.lastEffect=n.next=n:(r=t.next,t.next=n,n.next=r,e.lastEffect=n),n}function ge(){return Vn().memoizedState}function ke(n,e,t,r){var l=qn()
_a.flags|=n,l.memoizedState=we(1|e,t,{destroy:void 0},void 0===r?null:r)}function xe(n,e,t,r){var l=Vn()
r=void 0===r?null:r
var u=l.memoizedState.inst
null!==Ua&&null!==r&&On(r,Ua.memoizedState.deps)?l.memoizedState=we(e,t,u,r):(_a.flags|=n,l.memoizedState=we(1|e,t,u,r))}function Se(n,e){ke(8390656,8,n,e)}function Ee(n,e){xe(2048,8,n,e)}function Ce(n,e){return xe(4,2,n,e)}function Re(n,e){return xe(4,4,n,e)}function Me(n,e){if("function"==typeof e){n=n()
var t=e(n)
return function(){"function"==typeof t?t():e(null)}}if(null!=e)return n=n(),e.current=n,function(){e.current=null}}function Pe(n,e,t){t=null!=t?t.concat([n]):null,xe(4,4,Me.bind(null,e,n),t)}function Te(){}function je(n,e){var t=Vn()
e=void 0===e?null:e
var r=t.memoizedState
return null!==e&&On(e,r[1])?r[0]:(t.memoizedState=[n,e],n)}function Fe(n,e){var t=Vn()
e=void 0===e?null:e
var r=t.memoizedState
if(null!==e&&On(e,r[1]))return r[0]
if(r=n(),Va){T(!0)
try{n()}finally{T(!1)}}return t.memoizedState=[r,e],r}function $e(n,e,t){return void 0===t||1073741824&Aa?n.memoizedState=e:(n.memoizedState=t,n=Qr(),_a.lanes|=n,qc|=n,t)}function Ie(n,e,t,r){return Hi(t,e)?t:null!==za.current?(n=$e(n,t,r),Hi(n,e)||(lc=!0),n):42&Aa?(n=Qr(),_a.lanes|=n,qc|=n,e):(lc=!0,n.memoizedState=t)}function ze(n,e,t,r,l){var u=Uu()
_u(0!==u&&8>u?u:8)
var o=hu.T,i={}
hu.T=i,He(n,!1,e,t)
try{var a=l(),c=hu.S
null!==c&&c(i,a),null!==a&&"object"==typeof a&&"function"==typeof a.then?Be(n,e,function(n,e){var t=[],r={status:"pending",value:null,reason:null,then:function(n){t.push(n)}}
return n.then(function(){r.status="fulfilled",r.value=e
for(var n=0;n<t.length;n++)(0,t[n])(e)},function(n){for(r.status="rejected",r.reason=n,n=0;n<t.length;n++)(0,t[n])(void 0)}),r}(a,r),Gr()):Be(n,e,r,Gr())}catch(f){Be(n,e,{then:function(){},status:"rejected",reason:f},Gr())}finally{_u(u),hu.T=o}}function De(n){var e=n.memoizedState
if(null!==e)return e
var t={}
return(e={memoizedState:Qu,baseState:Qu,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gn,lastRenderedState:Qu},next:null}).next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gn,lastRenderedState:t},next:null},n.memoizedState=e,null!==(n=n.alternate)&&(n.memoizedState=e),e}function Oe(){return Ot(Ku)}function Le(){return Vn().memoizedState}function Ne(){return Vn().memoizedState}function Ae(n){for(var e=n.return;null!==e;){switch(e.tag){case 24:case 3:var t=Gr(),r=cn(e,n=an(t),t)
return null!==r&&(Kr(r,0,t),fn(r,e,t)),e={cache:At()},n.payload=e,void 0}e=e.return}}function _e(n,e,t){var r=Gr()
t={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null},qe(n)?Ve(e,t):null!==(t=Y(n,e,t,r))&&(Kr(t,0,r),We(t,e,r))}function Ue(n,e,t){Be(n,e,t,Gr())}function Be(n,e,t,r){var l={lane:r,revertLane:0,action:t,hasEagerState:!1,eagerState:null,next:null}
if(qe(n))Ve(e,l)
else{var u=n.alternate
if(0===n.lanes&&(null===u||0===u.lanes)&&null!==(u=e.lastRenderedReducer))try{var o=e.lastRenderedState,i=u(o,t)
if(l.hasEagerState=!0,l.eagerState=i,Hi(i,o))return W(n,e,l,0),null===zc&&V(),!1}catch(a){}if(null!==(t=Y(n,e,l,r)))return Kr(t,0,r),We(t,e,r),!0}return!1}function He(n,e,t,l){if(l={lane:2,revertLane:rn(),action:l,hasEagerState:!1,eagerState:null,next:null},qe(n)){if(e)throw Error(r(479))}else null!==(e=Y(n,t,l,2))&&Kr(e,0,2)}function qe(n){var e=n.alternate
return n===_a||null!==e&&e===_a}function Ve(n,e){qa=Ha=!0
var t=n.pending
null===t?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function We(n,e,t){if(4194176&t){var r=e.lanes
t|=r&=n.pendingLanes,e.lanes=t,M(n,t)}}function Ye(n,e,t,r){t=null==(t=t(r,e=n.memoizedState))?e:Ql({},e,t),n.memoizedState=t,0===n.lanes&&(n.updateQueue.baseState=t)}function Je(n,e,t,r,l,u,o){return"function"==typeof(n=n.stateNode).shouldComponentUpdate?n.shouldComponentUpdate(r,u,o):!(e.prototype&&e.prototype.isPureReactComponent&&yn(t,r)&&yn(l,u))}function Ke(n,e,t,r){n=e.state,"function"==typeof e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r),"function"==typeof e.UNSAFE_componentWillReceiveProps&&e.UNSAFE_componentWillReceiveProps(t,r),e.state!==n&&ec.enqueueReplaceState(e,e.state,null)}function Xe(n,e){var t=e
if("ref"in e)for(var r in t={},e)"ref"!==r&&(t[r]=e[r])
if(n=n.defaultProps)for(var l in t===e&&(t=Ql({},t)),n)void 0===t[l]&&(t[l]=n[l])
return t}function Ze(n,e){try{(0,n.onUncaughtError)(e.value,{componentStack:e.stack})}catch(lr){setTimeout(function(){throw lr})}}function nt(n,e,t){try{(0,n.onCaughtError)(t.value,{componentStack:t.stack,errorBoundary:1===e.tag?e.stateNode:null})}catch(lr){setTimeout(function(){throw lr})}}function et(n,e,t){return(t=an(t)).tag=3,t.payload={element:null},t.callback=function(){Ze(n,e)},t}function tt(n){return(n=an(n)).tag=3,n}function rt(n,e,t,r){var l=t.type.getDerivedStateFromError
if("function"==typeof l){var u=r.value
n.payload=function(){return l(u)},n.callback=function(){nt(e,t,r)}}var o=t.stateNode
null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){nt(e,t,r),"function"!=typeof l&&(null===ef?ef=new Set([this]):ef.add(this))
var n=r.stack
this.componentDidCatch(r.value,{componentStack:null!==n?n:""})})}function lt(n,e,t,r){e.child=null===n?Ia(e,null,t,r):$a(e,n.child,t,r)}function ut(n,e,t,r,l){t=t.render
var u=e.ref
if("ref"in r){var o={}
for(var i in r)"ref"!==i&&(o[i]=r[i])}else o=r
return Dt(e),r=Ln(n,e,t,o,u,l),i=Un(),null===n||lc?(oa&&i&&I(e),e.flags|=1,lt(n,e,r,l),e.child):(Bn(n,e,l),Rt(n,e,l))}function at(n,e,t,r,l){if(null===n){var u=t.type
return"function"!=typeof u||jl(u)||void 0!==u.defaultProps||null!==t.compare?((n=Il(t.type,null,r,e,e.mode,l)).ref=e.ref,n.return=e,e.child=n):(e.tag=15,e.type=u,ct(n,e,u,r,l))}if(u=n.child,!Mt(n,l)){var o=u.memoizedProps
if((t=null!==(t=t.compare)?t:yn)(o,r)&&n.ref===e.ref)return Rt(n,e,l)}return e.flags|=1,(n=Fl(u,r)).ref=e.ref,n.return=e,e.child=n}function ct(n,e,t,r,l){if(null!==n){var u=n.memoizedProps
if(yn(u,r)&&n.ref===e.ref){if(lc=!1,e.pendingProps=r=u,!Mt(n,l))return e.lanes=n.lanes,Rt(n,e,l)
131072&n.flags&&(lc=!0)}}return dt(n,e,t,r,l)}function ft(n,e,t){var r=e.pendingProps,l=r.children,u=!!(2&e.stateNode.h),o=null!==n?n.memoizedState:null
if(vt(n,e),"hidden"===r.mode||u){if(128&e.flags){if(r=null!==o?o.baseLanes|t:t,null!==n){for(l=e.child=n.child,u=0;null!==l;)u=u|l.lanes|l.childLanes,l=l.sibling
e.childLanes=u&~r}else e.childLanes=0,e.child=null
return st(n,e,r,t)}if(!(536870912&t))return e.lanes=e.childLanes=536870912,st(n,e,null!==o?o.baseLanes|t:t,t)
e.memoizedState={baseLanes:0,cachePool:null},null!==n&&Bt(0,null!==o?o.cachePool:null),null!==o?Rn(e,o):Mn(),Fn(e)}else null!==o?(Bt(0,o.cachePool),Rn(e,o),$n(),e.memoizedState=null):(null!==n&&Bt(0,null),Mn(),$n())
return lt(n,e,l,t),e.child}function st(n,e,t,r){var l=Ut()
return l=null===l?null:{parent:zu?vc.i:vc.v,pool:l},e.memoizedState={baseLanes:t,cachePool:l},null!==n&&Bt(0,null),Mn(),Fn(e),null!==n&&It(n,e,r,!0),null}function vt(n,e){var t=e.ref
if(null===t)null!==n&&null!==n.ref&&(e.flags|=2097664)
else{if("function"!=typeof t&&"object"!=typeof t)throw Error(r(284))
null!==n&&n.ref===t||(e.flags|=2097664)}}function dt(n,e,t,r,l){return Dt(e),t=Ln(n,e,t,r,void 0,l),r=Un(),null===n||lc?(oa&&r&&I(e),e.flags|=1,lt(n,e,t,l),e.child):(Bn(n,e,l),Rt(n,e,l))}function pt(n,e,t,r,l,u){return Dt(e),e.updateQueue=null,t=An(e,r,t,l),Nn(n),r=Un(),null===n||lc?(oa&&r&&I(e),e.flags|=1,lt(n,e,t,u),e.child):(Bn(n,e,u),Rt(n,e,u))}function ht(n,e,t,r,l){if(Dt(e),null===e.stateNode){var u=Ei,o=t.contextType
"object"==typeof o&&null!==o&&(u=Ot(o)),u=new t(r,u),e.memoizedState=null!==u.state&&void 0!==u.state?u.state:null,u.updater=ec,e.stateNode=u,u.m=e,(u=e.stateNode).props=r,u.state=e.memoizedState,u.refs={},un(e),o=t.contextType,u.context="object"==typeof o&&null!==o?Ot(o):Ei,u.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(Ye(e,t,o,r),u.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||(o=u.state,"function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount(),o!==u.state&&ec.enqueueReplaceState(u,u.state,null),dn(e,r,u,l),vn(),u.state=e.memoizedState),"function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!0}else if(null===n){u=e.stateNode
var i=e.memoizedProps,a=Xe(t,i)
u.props=a
var c=u.context,f=t.contextType
o=Ei,"object"==typeof f&&null!==f&&(o=Ot(f))
var s=t.getDerivedStateFromProps
f="function"==typeof s||"function"==typeof u.getSnapshotBeforeUpdate,i=e.pendingProps!==i,f||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(i||c!==o)&&Ke(e,u,r,o),Sa=!1
var v=e.memoizedState
u.state=v,dn(e,r,u,l),vn(),c=e.memoizedState,i||v!==c||Sa?("function"==typeof s&&(Ye(e,t,s,r),c=e.memoizedState),(a=Sa||Je(e,t,a,r,v,c,o))?(f||"function"!=typeof u.UNSAFE_componentWillMount&&"function"!=typeof u.componentWillMount||("function"==typeof u.componentWillMount&&u.componentWillMount(),"function"==typeof u.UNSAFE_componentWillMount&&u.UNSAFE_componentWillMount()),"function"==typeof u.componentDidMount&&(e.flags|=4194308)):("function"==typeof u.componentDidMount&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),u.props=r,u.state=c,u.context=o,r=a):("function"==typeof u.componentDidMount&&(e.flags|=4194308),r=!1)}else{u=e.stateNode,on(n,e),f=Xe(t,o=e.memoizedProps),u.props=f,s=e.pendingProps,v=u.context,c=t.contextType,a=Ei,"object"==typeof c&&null!==c&&(a=Ot(c)),(c="function"==typeof(i=t.getDerivedStateFromProps)||"function"==typeof u.getSnapshotBeforeUpdate)||"function"!=typeof u.UNSAFE_componentWillReceiveProps&&"function"!=typeof u.componentWillReceiveProps||(o!==s||v!==a)&&Ke(e,u,r,a),Sa=!1,v=e.memoizedState,u.state=v,dn(e,r,u,l),vn()
var d=e.memoizedState
o!==s||v!==d||Sa||null!==n&&null!==n.dependencies&&zt(n.dependencies)?("function"==typeof i&&(Ye(e,t,i,r),d=e.memoizedState),(f=Sa||Je(e,t,f,r,v,d,a)||null!==n&&null!==n.dependencies&&zt(n.dependencies))?(c||"function"!=typeof u.UNSAFE_componentWillUpdate&&"function"!=typeof u.componentWillUpdate||("function"==typeof u.componentWillUpdate&&u.componentWillUpdate(r,d,a),"function"==typeof u.UNSAFE_componentWillUpdate&&u.UNSAFE_componentWillUpdate(r,d,a)),"function"==typeof u.componentDidUpdate&&(e.flags|=4),"function"==typeof u.getSnapshotBeforeUpdate&&(e.flags|=1024)):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=d),u.props=r,u.state=d,u.context=a,r=f):("function"!=typeof u.componentDidUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=4),"function"!=typeof u.getSnapshotBeforeUpdate||o===n.memoizedProps&&v===n.memoizedState||(e.flags|=1024),r=!1)}return u=r,vt(n,e),r=!!(128&e.flags),u||r?(u=e.stateNode,t=r&&"function"!=typeof t.getDerivedStateFromError?null:u.render(),e.flags|=1,null!==n&&r?(e.child=$a(e,n.child,null,l),e.child=$a(e,null,t,l)):lt(n,e,t,l),e.memoizedState=u.state,n=e.child):n=Rt(n,e,l),n}function yt(n,e,t,r){return H(),e.flags|=256,lt(n,e,t,r),e.child}function mt(n){return{baseLanes:n,cachePool:Ht()}}function bt(n,e,t){return n=null!==n?n.childLanes&~t:0,e&&(n|=Yc),n}function wt(n,t,l){var u,o=t.pendingProps,i=!1,a=!!(128&t.flags)
if((u=a)||(u=(null===n||null!==n.memoizedState)&&!!(2&Na.current)),u&&(i=!0,t.flags&=-129),u=!!(32&t.flags),t.flags&=-33,null===n){if(oa){if(i?Tn(t):$n(),oa){var c,f=ua;(c=f)&&(null!==(f=qo(f,aa))?(t.memoizedState={dehydrated:f,treeContext:null!==Ki?{id:Xi,overflow:Zi}:null,retryLane:536870912},(c=e(18,null,null,0)).stateNode=f,c.return=t,t.child=c,la=t,ua=null,c=!0):c=!1),c||A(t)}if(null!==(f=t.memoizedState)&&null!==(f=f.dehydrated))return Io(f)?t.lanes=16:t.lanes=536870912,null
In(t)}return f=o.children,o=o.fallback,i?($n(),f=kt({mode:"hidden",children:f},i=t.mode),o=zl(o,i,l,null),f.return=t,o.return=t,f.sibling=o,t.child=f,(i=t.child).memoizedState=mt(l),i.childLanes=bt(n,u,l),t.memoizedState=uc,o):(Tn(t),gt(t,f))}if(null!==(c=n.memoizedState)&&null!==(f=c.dehydrated)){if(a)256&t.flags?(Tn(t),t.flags&=-257,t=xt(n,t,l)):null!==t.memoizedState?($n(),t.child=n.child,t.flags|=128,t=null):($n(),i=o.fallback,f=t.mode,o=kt({mode:"visible",children:o.children},f),(i=zl(i,f,l,null)).flags|=2,o.return=t,i.return=t,o.sibling=i,t.child=o,$a(t,n.child,null,l),(o=t.child).memoizedState=mt(l),o.childLanes=bt(n,u,l),t.memoizedState=uc,t=i)
else if(Tn(t),Io(f))u=zo(f).digest,(o=Error(r(419))).stack="",o.digest=u,q({value:o,source:null,stack:null}),t=xt(n,t,l)
else if(lc||It(n,t,l,!1),u=0!==(l&n.childLanes),lc||u){if(null!==(u=zc)){if(42&(o=l&-l))o=1
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
default:o=0}if(0!==(o=0!==(o&(u.suspendedLanes|l))?0:o)&&o!==c.retryLane)throw c.retryLane=o,J(n,o),Kr(u,0,o),rc}$o(f)||fl(),t=xt(n,t,l)}else $o(f)?(t.flags|=128,t.child=n.child,t=Ml.bind(null,n),Do(f,t),t=null):(n=c.treeContext,Lu&&(ua=Uo(f),la=t,oa=!0,ia=null,aa=!1,null!==n&&(Gi[Qi++]=Xi,Gi[Qi++]=Zi,Gi[Qi++]=Ki,Xi=n.id,Zi=n.overflow,Ki=t)),(t=gt(t,o.children)).flags|=4096)
return t}return i?($n(),i=o.fallback,f=t.mode,a=(c=n.child).sibling,(o=Fl(c,{mode:"hidden",children:o.children})).subtreeFlags=31457280&c.subtreeFlags,null!==a?i=Fl(a,i):(i=zl(i,f,l,null)).flags|=2,i.return=t,o.return=t,o.sibling=i,t.child=o,o=i,i=t.child,null===(f=n.child.memoizedState)?f=mt(l):(null!==(c=f.cachePool)?(a=zu?vc.i:vc.v,c=c.parent!==a?{parent:a,pool:a}:c):c=Ht(),f={baseLanes:f.baseLanes|l,cachePool:c}),i.memoizedState=f,i.childLanes=bt(n,u,l),t.memoizedState=uc,o):(Tn(t),n=(l=n.child).sibling,(l=Fl(l,{mode:"visible",children:o.children})).return=t,l.sibling=null,null!==n&&(null===(u=t.deletions)?(t.deletions=[n],t.flags|=16):u.push(n)),t.child=l,t.memoizedState=null,l)}function gt(n,e){return(e=kt({mode:"visible",children:e},n.mode)).return=n,n.child=e}function kt(n,e){return Dl(n,e,0,null)}function xt(n,e,t){return $a(e,n.child,null,t),(n=gt(e,e.pendingProps.children)).flags|=2,e.memoizedState=null,n}function St(n,e,t){n.lanes|=e
var r=n.alternate
null!==r&&(r.lanes|=e),Ft(n.return,e,t)}function Et(n,e,t,r,l){var u=n.memoizedState
null===u?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(u.isBackwards=e,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=t,u.tailMode=l)}function Ct(n,e,t){var r=e.pendingProps,l=r.revealOrder,u=r.tail
if(lt(n,e,r.children,t),2&(r=Na.current))r=1&r|2,e.flags|=128
else{if(null!==n&&128&n.flags)n:for(n=e.child;null!==n;){if(13===n.tag)null!==n.memoizedState&&St(n,t,e)
else if(19===n.tag)St(n,t,e)
else if(null!==n.child){n.child.return=n,n=n.child
continue}if(n===e)break n
for(;null===n.sibling;){if(null===n.return||n.return===e)break n
n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}switch(m(Na,r),l){case"forwards":for(t=e.child,l=null;null!==t;)null!==(n=t.alternate)&&null===zn(n)&&(l=t),t=t.sibling
null===(t=l)?(l=e.child,e.child=null):(l=t.sibling,t.sibling=null),Et(e,!1,l,t,u)
break
case"backwards":for(t=null,l=e.child,e.child=null;null!==l;){if(null!==(n=l.alternate)&&null===zn(n)){e.child=l
break}n=l.sibling,l.sibling=t,t=l,l=n}Et(e,!0,t,null,u)
break
case"together":Et(e,!1,null,null,void 0)
break
default:e.memoizedState=null}return e.child}function Rt(n,e,t){if(null!==n&&(e.dependencies=n.dependencies),qc|=e.lanes,0===(t&e.childLanes)){if(null===n)return null
if(It(n,e,t,!1),0===(t&e.childLanes))return null}if(null!==n&&e.child!==n.child)throw Error(r(153))
if(null!==e.child){for(t=Fl(n=e.child,n.pendingProps),e.child=t,t.return=e;null!==n.sibling;)n=n.sibling,(t=t.sibling=Fl(n,n.pendingProps)).return=e
t.sibling=null}return e.child}function Mt(n,e){return 0!==(n.lanes&e)||!(null===(n=n.dependencies)||!zt(n))}function Pt(n,e,t){if(null!==n)if(n.memoizedProps!==e.pendingProps)lc=!0
else{if(!(Mt(n,t)||128&e.flags))return lc=!1,function(n,e,t){switch(e.tag){case 3:D(e,e.stateNode.containerInfo),Tt(0,vc,n.memoizedState.cache),H()
break
case 27:case 5:L(e)
break
case 4:D(e,e.stateNode.containerInfo)
break
case 10:Tt(0,e.type,e.memoizedProps.value)
break
case 13:var r=e.memoizedState
if(null!==r)return null!==r.dehydrated?(Tn(e),e.flags|=128,null):0!==(t&e.child.childLanes)?wt(n,e,t):(Tn(e),null!==(n=Rt(n,e,t))?n.sibling:null)
Tn(e)
break
case 19:var l=!!(128&n.flags)
if((r=0!==(t&e.childLanes))||(It(n,e,t,!1),r=0!==(t&e.childLanes)),l){if(r)return Ct(n,e,t)
e.flags|=128}if(null!==(l=e.memoizedState)&&(l.rendering=null,l.tail=null,l.lastEffect=null),m(Na,Na.current),r)break
return null
case 22:case 23:return e.lanes=0,ft(n,e,t)
case 24:Tt(0,vc,n.memoizedState.cache)}return Rt(n,e,t)}(n,e,t)
lc=!!(131072&n.flags)}else lc=!1,oa&&1048576&e.flags&&$(e,Ji,e.index)
switch(e.lanes=0,e.tag){case 16:n:{n=e.pendingProps
var l=e.elementType,o=l.o
if(l=o(l.u),e.type=l,"function"!=typeof l){if(null!=l){if((o=l.$$typeof)===ou){e.tag=11,e=ut(null,e,l,n,t)
break n}if(o===cu){e.tag=14,e=at(null,e,l,n,t)
break n}}throw e=u(l)||l,Error(r(306,e,""))}jl(l)?(n=Xe(l,n),e.tag=1,e=ht(null,e,l,n,t)):(e.tag=0,e=dt(null,e,l,n,t))}return e
case 0:return dt(n,e,e.type,e.pendingProps,t)
case 1:return ht(n,e,l=e.type,o=Xe(l,e.pendingProps),t)
case 3:n:{if(D(e,e.stateNode.containerInfo),null===n)throw Error(r(387))
var i=e.pendingProps
l=(o=e.memoizedState).element,on(n,e),dn(e,i,null,t)
var a=e.memoizedState
if(i=a.cache,Tt(0,vc,i),i!==o.cache&&$t(e,[vc],t,!0),vn(),i=a.element,Lu&&o.isDehydrated){if(o={element:i,isDehydrated:!1,cache:a.cache},e.updateQueue.baseState=o,e.memoizedState=o,256&e.flags){e=yt(n,e,i,t)
break n}if(i!==l){q(l=j(Error(r(424)),e)),e=yt(n,e,i,t)
break n}for(Lu&&(ua=_o(e.stateNode.containerInfo),la=e,oa=!0,ia=null,aa=!0),t=Ia(e,null,i,t),e.child=t;t;)t.flags=-3&t.flags|4096,t=t.sibling}else{if(H(),i===l){e=Rt(n,e,t)
break n}lt(n,e,i,t)}e=e.child}return e
case 26:if(ti)return vt(n,e),null===n?(t=ui(e.type,null,e.pendingProps,null))?e.memoizedState=t:oa||(e.stateNode=si(e.type,e.pendingProps,ta.current,e)):e.memoizedState=ui(e.type,n.memoizedProps,e.pendingProps,n.memoizedState),null
case 27:if(yi)return L(e),null===n&&yi&&oa&&(l=e.stateNode=mi(e.type,e.pendingProps,ta.current,na.current,!1),la=e,aa=!0,ua=Ao(l)),l=e.pendingProps.children,null!==n||oa?lt(n,e,l,t):e.child=$a(e,null,l,t),vt(n,e),e.child
case 5:return null===n&&oa&&(ni(e.type,e.pendingProps,na.current),(o=l=ua)&&(null!==(l=Bo(l,e.type,e.pendingProps,aa))?(e.stateNode=l,la=e,ua=Ao(l),aa=!1,o=!0):o=!1),o||A(e)),L(e),o=e.type,i=e.pendingProps,a=null!==n?n.memoizedProps:null,l=i.children,Tu(o,i)?l=null:null!==a&&Tu(o,a)&&(e.flags|=32),null!==e.memoizedState&&(o=Ln(n,e,_n,null,null,t),zu?Ku.i=o:Ku.v=o),vt(n,e),lt(n,e,l,t),e.child
case 6:return null===n&&oa&&(ei(e.pendingProps,na.current),(n=t=ua)&&(null!==(t=Ho(t,e.pendingProps,aa))?(e.stateNode=t,la=e,ua=null,n=!0):n=!1),n||A(e)),null
case 13:return wt(n,e,t)
case 4:return D(e,e.stateNode.containerInfo),l=e.pendingProps,null===n?e.child=$a(e,null,l,t):lt(n,e,l,t),e.child
case 11:return ut(n,e,e.type,e.pendingProps,t)
case 7:return lt(n,e,e.pendingProps,t),e.child
case 8:case 12:return lt(n,e,e.pendingProps.children,t),e.child
case 10:return l=e.pendingProps,Tt(0,e.type,l.value),lt(n,e,l.children,t),e.child
case 9:return o=e.type.l,l=e.pendingProps.children,Dt(e),l=l(o=Ot(o)),e.flags|=1,lt(n,e,l,t),e.child
case 14:return at(n,e,e.type,e.pendingProps,t)
case 15:return ct(n,e,e.type,e.pendingProps,t)
case 19:return Ct(n,e,t)
case 22:return ft(n,e,t)
case 24:return Dt(e),l=Ot(vc),null===n?(null===(o=Ut())&&(o=zc,i=At(),o.pooledCache=i,i.refCount++,null!==i&&(o.pooledCacheLanes|=t),o=i),e.memoizedState={parent:l,cache:o},un(e),Tt(0,vc,o)):(0!==(n.lanes&t)&&(on(n,e),dn(e,null,null,t),vn()),o=n.memoizedState,i=e.memoizedState,o.parent!==l?(o={parent:l,cache:l},e.memoizedState=o,0===e.lanes&&(e.memoizedState=e.updateQueue.baseState=o),Tt(0,vc,l)):(l=i.cache,Tt(0,vc,l),l!==o.cache&&$t(e,[vc],t,!0))),lt(n,e,e.pendingProps.children,t),e.child
case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function Tt(n,e,t){zu?(m(oc,e.i),e.i=t):(m(oc,e.v),e.v=t)}function jt(n){var e=oc.current
zu?n.i=e:n.v=e,y(oc)}function Ft(n,e,t){for(;null!==n;){var r=n.alternate
if((n.childLanes&e)!==e?(n.childLanes|=e,null!==r&&(r.childLanes|=e)):null!==r&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===t)break
n=n.return}}function $t(n,e,t,l){var u=n.child
for(null!==u&&(u.return=n);null!==u;){var o=u.dependencies
if(null!==o){var i=u.child
o=o.firstContext
n:for(;null!==o;){var a=o
o=u
for(var c=0;c<e.length;c++)if(a.context===e[c]){o.lanes|=t,null!==(a=o.alternate)&&(a.lanes|=t),Ft(o.return,t,n),l||(i=null)
break n}o=a.next}}else if(18===u.tag){if(null===(i=u.return))throw Error(r(341))
i.lanes|=t,null!==(o=i.alternate)&&(o.lanes|=t),Ft(i,t,n),i=null}else i=u.child
if(null!==i)i.return=u
else for(i=u;null!==i;){if(i===n){i=null
break}if(null!==(u=i.sibling)){u.return=i.return,i=u
break}i=i.return}u=i}}function It(n,e,t,l){n=null
for(var u=e,o=!1;null!==u;){if(!o)if(524288&u.flags)o=!0
else if(262144&u.flags)break
if(10===u.tag){var i=u.alternate
if(null===i)throw Error(r(387))
if(null!==(i=i.memoizedProps)){var a=u.type
Hi(u.pendingProps.value,i.value)||(null!==n?n.push(a):n=[a])}}else if(u===ra.current){if(null===(i=u.alternate))throw Error(r(387))
i.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(null!==n?n.push(Ku):n=[Ku])}u=u.return}null!==n&&$t(e,n,t,l),e.flags|=262144}function zt(n){for(n=n.firstContext;null!==n;){var e=n.context
if(!Hi(zu?e.i:e.v,n.memoizedValue))return!0
n=n.next}return!1}function Dt(n){ic=n,ac=null,null!==(n=n.dependencies)&&(n.firstContext=null)}function Ot(n){return Nt(ic,n)}function Lt(n,e){return null===ic&&Dt(n),Nt(n,e)}function Nt(n,e){var t=zu?e.i:e.v
if(e={context:e,memoizedValue:t,next:null},null===ac){if(null===n)throw Error(r(308))
ac=e,n.dependencies={lanes:0,firstContext:e},n.flags|=524288}else ac=ac.next=e
return t}function At(){return{controller:new cc,data:new Map,refCount:0}}function _t(n){n.refCount--,0===n.refCount&&fc(sc,function(){n.controller.abort()})}function Ut(){var n=pc.current
return null!==n?n:zc.pooledCache}function Bt(n,e){m(pc,null===e?pc.current:e.pool)}function Ht(){var n=Ut()
return null===n?null:{parent:zu?vc.i:vc.v,pool:n}}function qt(n){n.flags|=4}function Vt(n,e){if(null!==n&&n.child===e.child)return!1
if(16&e.flags)return!0
for(n=e.child;null!==n;){if(13878&n.flags||13878&n.subtreeFlags)return!0
n=n.sibling}return!1}function Wt(n,e,t,r){if(Du)for(t=e.child;null!==t;){if(5===t.tag||6===t.tag)Mu(n,t.stateNode)
else if(!(4===t.tag||yi&&27===t.tag)&&null!==t.child){t.child.return=t,t=t.child
continue}if(t===e)break
for(;null===t.sibling;){if(null===t.return||t.return===e)return
t=t.return}t.sibling.return=t.return,t=t.sibling}else if(Ou)for(var l=e.child;null!==l;){if(5===l.tag){var u=l.stateNode
t&&r&&(u=jo(u,l.type,l.memoizedProps)),Mu(n,u)}else if(6===l.tag)u=l.stateNode,t&&r&&(u=Fo(u,l.memoizedProps)),Mu(n,u)
else if(4!==l.tag)if(22===l.tag&&null!==l.memoizedState)null!==(u=l.child)&&(u.return=l),Wt(n,l,!0,!0)
else if(null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}}function Yt(n,e,t,r){if(Ou)for(var l=e.child;null!==l;){if(5===l.tag){var u=l.stateNode
t&&r&&(u=jo(u,l.type,l.memoizedProps)),Mo(n,u)}else if(6===l.tag)u=l.stateNode,t&&r&&(u=Fo(u,l.memoizedProps)),Mo(n,u)
else if(4!==l.tag)if(22===l.tag&&null!==l.memoizedState)null!==(u=l.child)&&(u.return=l),Yt(n,l,!(null!==l.memoizedProps&&"manual"===l.memoizedProps.mode),!0)
else if(null!==l.child){l.child.return=l,l=l.child
continue}if(l===e)break
for(;null===l.sibling;){if(null===l.return||l.return===e)return
l=l.return}l.sibling.return=l.return,l=l.sibling}}function Jt(n,e){if(Ou&&Vt(n,e)){var t=(n=e.stateNode).containerInfo,r=Ro()
Yt(r,e,!1,!1),n.pendingChildren=r,qt(e),Po(t,r)}}function Gt(n,e,t,r){if(Du)n.memoizedProps!==r&&qt(e)
else if(Ou){var l=n.stateNode,u=n.memoizedProps
if((n=Vt(n,e))||u!==r){var o=na.current;(u=Co(l,t,u,r,!n,null))===l?e.stateNode=l:(Pu(u,t,r,o)&&qt(e),e.stateNode=u,n?Wt(u,e,!1,!1):qt(e))}else e.stateNode=l}}function Qt(n,e,t){if(Vu(e,t)){if(n.flags|=16777216,!Wu(e,t)){if(!il())throw Ta=Pa,Ma
n.flags|=8192}}else n.flags&=-16777217}function Kt(n,e){if(di(e)){if(n.flags|=16777216,!pi(e)){if(!il())throw Ta=Pa,Ma
n.flags|=8192}}else n.flags&=-16777217}function Xt(n,e){null!==e&&(n.flags|=4),16384&n.flags&&(e=22!==n.tag?S():536870912,n.lanes|=e,Jc|=e)}function Zt(n,e){if(!oa)switch(n.tailMode){case"hidden":e=n.tail
for(var t=null;null!==e;)null!==e.alternate&&(t=e),e=e.sibling
null===t?n.tail=null:t.sibling=null
break
case"collapsed":t=n.tail
for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling
null===r?e||null===n.tail?n.tail=null:n.tail.sibling=null:r.sibling=null}}function nr(n){var e=null!==n.alternate&&n.alternate.child===n.child,t=0,r=0
if(e)for(var l=n.child;null!==l;)t|=l.lanes|l.childLanes,r|=31457280&l.subtreeFlags,r|=31457280&l.flags,l.return=n,l=l.sibling
else for(l=n.child;null!==l;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=n,l=l.sibling
return n.subtreeFlags|=r,n.childLanes=t,e}function er(n,e,t){var l=e.pendingProps
switch(z(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return nr(e),null
case 3:return t=e.stateNode,l=null,null!==n&&(l=n.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),jt(vc),O(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),null!==n&&null!==n.child||(B(e)?qt(e):null===n||n.memoizedState.isDehydrated&&!(256&e.flags)||(e.flags|=1024,null!==ia&&(Zr(ia),ia=null))),Jt(n,e),nr(e),null
case 26:if(ti){t=e.type
var u=e.memoizedState
return null===n?(qt(e),null!==u?(nr(e),Kt(e,u)):(nr(e),Qt(e,t,l))):u?u!==n.memoizedState?(qt(e),nr(e),Kt(e,u)):(nr(e),e.flags&=-16777217):(Du?n.memoizedProps!==l&&qt(e):Gt(n,e,t,l),nr(e),Qt(e,t,l)),null}case 27:if(yi){if(N(e),t=ta.current,u=e.type,null!==n&&null!=e.stateNode)Du?n.memoizedProps!==l&&qt(e):Gt(n,e,u,l)
else{if(!l){if(null===e.stateNode)throw Error(r(166))
return nr(e),null}n=na.current,B(e)?_(e,n):(n=mi(u,l,t,n,!0),e.stateNode=n,qt(e))}return nr(e),null}case 5:if(N(e),t=e.type,null!==n&&null!=e.stateNode)Gt(n,e,t,l)
else{if(!l){if(null===e.stateNode)throw Error(r(166))
return nr(e),null}n=na.current,B(e)?_(e,n):(Wt(u=Ru(t,l,ta.current,n,e),e,!1,!1),e.stateNode=u,Pu(u,t,l,n)&&qt(e))}return nr(e),Qt(e,e.type,e.pendingProps),null
case 6:if(n&&null!=e.stateNode)t=n.memoizedProps,Du?t!==l&&qt(e):Ou&&(t!==l?(e.stateNode=ju(l,ta.current,na.current,e),qt(e)):e.stateNode=n.stateNode)
else{if("string"!=typeof l&&null===e.stateNode)throw Error(r(166))
if(n=ta.current,t=na.current,B(e)){if(!Lu)throw Error(r(176))
if(n=e.stateNode,t=e.memoizedProps,l=null,null!==(u=la))switch(u.tag){case 27:case 5:l=u.memoizedProps}Wo(n,t,e,l)||A(e)}else e.stateNode=ju(l,n,t,e)}return nr(e),null
case 13:if(l=e.memoizedState,null===n||null!==n.memoizedState&&null!==n.memoizedState.dehydrated){if(u=B(e),null!==l&&null!==l.dehydrated){if(null===n){if(!u)throw Error(r(318))
if(!Lu)throw Error(r(344))
if(!(u=null!==(u=e.memoizedState)?u.dehydrated:null))throw Error(r(317))
Yo(u,e)}else H(),!(128&e.flags)&&(e.memoizedState=null),e.flags|=4
nr(e),u=!1}else null!==ia&&(Zr(ia),ia=null),u=!0
if(!u)return 256&e.flags?(In(e),e):(In(e),null)}if(In(e),128&e.flags)return e.lanes=t,e
if(t=null!==l,n=null!==n&&null!==n.memoizedState,t){u=null,null!==(l=e.child).alternate&&null!==l.alternate.memoizedState&&null!==l.alternate.memoizedState.cachePool&&(u=l.alternate.memoizedState.cachePool.pool)
var o=null
null!==l.memoizedState&&null!==l.memoizedState.cachePool&&(o=l.memoizedState.cachePool.pool),o!==u&&(l.flags|=2048)}return t!==n&&t&&(e.child.flags|=8192),Xt(e,e.updateQueue),nr(e),null
case 4:return O(),Jt(n,e),null===n&&Au(e.stateNode.containerInfo),nr(e),null
case 10:return jt(e.type),nr(e),null
case 19:if(y(Na),null===(u=e.memoizedState))return nr(e),null
if(l=!!(128&e.flags),null===(o=u.rendering))if(l)Zt(u,!1)
else{if(0!==Hc||null!==n&&128&n.flags)for(n=e.child;null!==n;){if(null!==(o=zn(n))){for(e.flags|=128,Zt(u,!1),n=o.updateQueue,e.updateQueue=n,Xt(e,n),e.subtreeFlags=0,n=t,t=e.child;null!==t;)$l(t,n),t=t.sibling
return m(Na,1&Na.current|2),e.child}n=n.sibling}null!==u.tail&&zi()>Zc&&(e.flags|=128,l=!0,Zt(u,!1),e.lanes=4194304)}else{if(!l)if(null!==(n=zn(o))){if(e.flags|=128,l=!0,n=n.updateQueue,e.updateQueue=n,Xt(e,n),Zt(u,!0),null===u.tail&&"hidden"===u.tailMode&&!o.alternate&&!oa)return nr(e),null}else 2*zi()-u.renderingStartTime>Zc&&536870912!==t&&(e.flags|=128,l=!0,Zt(u,!1),e.lanes=4194304)
u.isBackwards?(o.sibling=e.child,e.child=o):(null!==(n=u.last)?n.sibling=o:e.child=o,u.last=o)}return null!==u.tail?(e=u.tail,u.rendering=e,u.tail=e.sibling,u.renderingStartTime=zi(),e.sibling=null,n=Na.current,m(Na,l?1&n|2:1&n),e):(nr(e),null)
case 22:case 23:return In(e),Pn(),l=null!==e.memoizedState,null!==n?null!==n.memoizedState!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?!!(536870912&t)&&!(128&e.flags)&&(nr(e),6&e.subtreeFlags&&(e.flags|=8192)):nr(e),null!==(t=e.updateQueue)&&Xt(e,t.retryQueue),t=null,null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(t=n.memoizedState.cachePool.pool),l=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(l=e.memoizedState.cachePool.pool),l!==t&&(e.flags|=2048),null!==n&&y(pc),null
case 24:return t=null,null!==n&&(t=n.memoizedState.cache),e.memoizedState.cache!==t&&(e.flags|=2048),jt(vc),nr(e),null
case 25:return null}throw Error(r(156,e.tag))}function tr(n,e){switch(z(e),e.tag){case 1:return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 3:return jt(vc),O(),65536&(n=e.flags)&&!(128&n)?(e.flags=-65537&n|128,e):null
case 26:case 27:case 5:return N(e),null
case 13:if(In(e),null!==(n=e.memoizedState)&&null!==n.dehydrated){if(null===e.alternate)throw Error(r(340))
H()}return 65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 19:return y(Na),null
case 4:return O(),null
case 10:return jt(e.type),null
case 22:case 23:return In(e),Pn(),null!==n&&y(pc),65536&(n=e.flags)?(e.flags=-65537&n|128,e):null
case 24:return jt(vc),null
default:return null}}function rr(n,e){switch(z(e),e.tag){case 3:jt(vc),O()
break
case 26:case 27:case 5:N(e)
break
case 4:O()
break
case 13:In(e)
break
case 19:y(Na)
break
case 10:jt(e.type)
break
case 22:case 23:In(e),Pn(),null!==n&&y(pc)
break
case 24:jt(vc)}}function ur(n,e){try{var t=e.updateQueue,r=null!==t?t.lastEffect:null
if(null!==r){var l=r.next
t=l
do{if((t.tag&n)===n){r=void 0
var u=t.create,o=t.inst
r=u(),o.destroy=r}t=t.next}while(t!==l)}}catch(i){Sl(e,e.return,i)}}function or(n,e,t){try{var r=e.updateQueue,l=null!==r?r.lastEffect:null
if(null!==l){var u=l.next
r=u
do{if((r.tag&n)===n){var o=r.inst,i=o.destroy
if(void 0!==i){o.destroy=void 0,l=e
var a=t
try{i()}catch(c){Sl(l,a,c)}}}r=r.next}while(r!==u)}}catch(c){Sl(e,e.return,c)}}function ir(n){var e=n.updateQueue
if(null!==e){var t=n.stateNode
try{hn(e,t)}catch(r){Sl(n,n.return,r)}}}function ar(n,e,t){t.props=Xe(n.type,n.memoizedProps),t.state=n.memoizedState
try{t.componentWillUnmount()}catch(r){Sl(n,e,r)}}function cr(n,e){try{var t=n.ref
if(null!==t){var r=n.stateNode
switch(n.tag){case 26:case 27:case 5:var l=ku(r)
break
default:l=r}"function"==typeof t?n.refCleanup=t(l):t.current=l}}catch(u){Sl(n,e,u)}}function fr(n,e){var t=n.ref,r=n.refCleanup
if(null!==t)if("function"==typeof r)try{r()}catch(l){Sl(n,e,l)}finally{n.refCleanup=null,null!=(n=n.alternate)&&(n.refCleanup=null)}else if("function"==typeof t)try{t(null)}catch(u){Sl(n,e,u)}else t.current=null}function sr(n){var e=n.type,t=n.memoizedProps,r=n.stateNode
try{vo(r,e,t,n)}catch(l){Sl(n,n.return,l)}}function vr(n,e,t){try{po(n.stateNode,n.type,t,e,n)}catch(r){Sl(n,n.return,r)}}function dr(n){return 5===n.tag||3===n.tag||!!ti&&26===n.tag||!!yi&&27===n.tag||4===n.tag}function pr(n){n:for(;;){for(;null===n.sibling;){if(null===n.return||dr(n.return))return null
n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&(!yi||27!==n.tag)&&18!==n.tag;){if(2&n.flags)continue n
if(null===n.child||4===n.tag)continue n
n.child.return=n,n=n.child}if(!(2&n.flags))return n.stateNode}}function hr(n,e,t){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?yo(t,n,e):fo(t,n)
else if(!(4===r||yi&&27===r)&&null!==(n=n.child))for(hr(n,e,t),n=n.sibling;null!==n;)hr(n,e,t),n=n.sibling}function yr(n,e,t){var r=n.tag
if(5===r||6===r)n=n.stateNode,e?ho(t,n,e):co(t,n)
else if(!(4===r||yi&&27===r)&&null!==(n=n.child))for(yr(n,e,t),n=n.sibling;null!==n;)yr(n,e,t),n=n.sibling}function mr(n,e,t){n=n.containerInfo
try{To(n,t)}catch(r){Sl(e,e.return,r)}}function br(n,e,t){var r=t.flags
switch(t.tag){case 0:case 11:case 15:Pr(n,t),4&r&&ur(5,t)
break
case 1:if(Pr(n,t),4&r)if(n=t.stateNode,null===e)try{n.componentDidMount()}catch(i){Sl(t,t.return,i)}else{var l=Xe(t.type,e.memoizedProps)
e=e.memoizedState
try{n.componentDidUpdate(l,e,n.k)}catch(a){Sl(t,t.return,a)}}64&r&&ir(t),512&r&&cr(t,t.return)
break
case 3:if(Pr(n,t),64&r&&null!==(r=t.updateQueue)){if(n=null,null!==t.child)switch(t.child.tag){case 27:case 5:n=ku(t.child.stateNode)
break
case 1:n=t.child.stateNode}try{hn(r,n)}catch(i){Sl(t,t.return,i)}}break
case 26:if(ti){Pr(n,t),512&r&&cr(t,t.return)
break}case 27:case 5:Pr(n,t),null===e&&4&r&&sr(t),512&r&&cr(t,t.return)
break
case 12:Pr(n,t)
break
case 13:Pr(n,t),4&r&&xr(n,t)
break
case 22:if(!(l=null!==t.memoizedState||hc)){e=null!==e&&null!==e.memoizedState||yc
var u=hc,o=yc
hc=l,(yc=e)&&!o?jr(n,t,!!(8772&t.subtreeFlags)):Pr(n,t),hc=u,yc=o}512&r&&("manual"===t.memoizedProps.mode?cr(t,t.return):fr(t,t.return))
break
default:Pr(n,t)}}function wr(n){var e=n.alternate
null!==e&&(n.alternate=null,wr(e)),n.child=null,n.deletions=null,n.sibling=null,5===n.tag&&null!==(e=n.stateNode)&&qu(e),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function gr(n,e,t){for(t=t.child;null!==t;)kr(n,e,t),t=t.sibling}function kr(n,e,t){if(Bi&&"function"==typeof Bi.onCommitFiberUnmount)try{Bi.onCommitFiberUnmount(Ui,t)}catch(u){}switch(t.tag){case 26:if(ti){yc||fr(t,e),gr(n,e,t),t.memoizedState?ii(t.memoizedState):t.stateNode&&fi(t.stateNode)
break}case 27:if(yi){yc||fr(t,e)
var r=kc,l=xc
kc=t.stateNode,gr(n,e,t),gi(t.stateNode),kc=r,xc=l
break}case 5:yc||fr(t,e)
case 6:if(Du){if(r=kc,l=xc,kc=null,gr(n,e,t),xc=l,null!==(kc=r))if(xc)try{bo(kc,t.stateNode)}catch(o){Sl(t,e,o)}else try{mo(kc,t.stateNode)}catch(o){Sl(t,e,o)}}else gr(n,e,t)
break
case 18:Du&&null!==kc&&(xc?Xo(kc,t.stateNode):Ko(kc,t.stateNode))
break
case 4:Du?(r=kc,l=xc,kc=t.stateNode.containerInfo,xc=!0,gr(n,e,t),kc=r,xc=l):(Ou&&mr(t.stateNode,t,Ro()),gr(n,e,t))
break
case 0:case 11:case 14:case 15:yc||or(2,t,e),yc||or(4,t,e),gr(n,e,t)
break
case 1:yc||(fr(t,e),"function"==typeof(r=t.stateNode).componentWillUnmount&&ar(t,e,r)),gr(n,e,t)
break
case 21:gr(n,e,t)
break
case 22:yc||fr(t,e),yc=(r=yc)||null!==t.memoizedState,gr(n,e,t),yc=r
break
default:gr(n,e,t)}}function xr(n,e){if(Lu&&null===e.memoizedState&&null!==(n=e.alternate)&&null!==(n=n.memoizedState)&&null!==(n=n.dehydrated))try{Qo(n)}catch(t){Sl(e,e.return,t)}}function Sr(n,e){var t=function(n){switch(n.tag){case 13:case 19:var e=n.stateNode
return null===e&&(e=n.stateNode=new bc),e
case 22:return null===(e=(n=n.stateNode).C)&&(e=n.C=new bc),e
default:throw Error(r(435,n.tag))}}(n)
e.forEach(function(e){var r=Pl.bind(null,n,e)
t.has(e)||(t.add(e),e.then(r,r))})}function Er(n,e){var t=e.deletions
if(null!==t)for(var l=0;l<t.length;l++){var u=t[l],o=n,i=e
if(Du){var a=i
n:for(;null!==a;){switch(a.tag){case 27:case 5:kc=a.stateNode,xc=!1
break n
case 3:case 4:kc=a.stateNode.containerInfo,xc=!0
break n}a=a.return}if(null===kc)throw Error(r(160))
kr(o,i,u),kc=null,xc=!1}else kr(o,i,u)
null!==(o=u.alternate)&&(o.return=null),u.return=null}if(13878&e.subtreeFlags)for(e=e.child;null!==e;)Cr(e,n),e=e.sibling}function Cr(n,e){var t=n.alternate,l=n.flags
switch(n.tag){case 0:case 11:case 14:case 15:Er(e,n),Rr(n),4&l&&(or(3,n,n.return),ur(3,n),or(5,n,n.return))
break
case 1:Er(e,n),Rr(n),512&l&&(yc||null===t||fr(t,t.return)),64&l&&hc&&null!==(n=n.updateQueue)&&null!==(l=n.callbacks)&&(t=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=null===t?l:t.concat(l))
break
case 26:if(ti){var u=Sc
Er(e,n),Rr(n),512&l&&(yc||null===t||fr(t,t.return)),4&l&&(l=null!==t?t.memoizedState:null,e=n.memoizedState,null===t?null===e?null===n.stateNode?n.stateNode=ai(u,n.type,n.memoizedProps,n):ci(u,n.type,n.stateNode):n.stateNode=oi(u,e,n.memoizedProps):l!==e?(null===l?null!==t.stateNode&&fi(t.stateNode):ii(l),null===e?ci(u,n.type,n.stateNode):oi(u,e,n.memoizedProps)):null===e&&null!==n.stateNode&&vr(n,n.memoizedProps,t.memoizedProps))
break}case 27:if(yi&&4&l&&null===n.alternate){u=n.stateNode
var o=n.memoizedProps
try{bi(u),wi(n.type,o,u,n)}catch(s){Sl(n,n.return,s)}}case 5:if(Er(e,n),Rr(n),512&l&&(yc||null===t||fr(t,t.return)),Du){if(32&n.flags){e=n.stateNode
try{wo(e)}catch(s){Sl(n,n.return,s)}}4&l&&null!=n.stateNode&&vr(n,e=n.memoizedProps,null!==t?t.memoizedProps:e),1024&l&&(mc=!0)}break
case 6:if(Er(e,n),Rr(n),4&l&&Du){if(null===n.stateNode)throw Error(r(162))
l=n.memoizedProps,t=null!==t?t.memoizedProps:l,e=n.stateNode
try{so(e,t,l)}catch(s){Sl(n,n.return,s)}}break
case 3:if(ti?(vi(),u=Sc,Sc=li(e.containerInfo),Er(e,n),Sc=u):Er(e,n),Rr(n),4&l){if(Du&&Lu&&null!==t&&t.memoizedState.isDehydrated)try{Go(e.containerInfo)}catch(s){Sl(n,n.return,s)}if(Ou){l=e.containerInfo,t=e.pendingChildren
try{To(l,t)}catch(s){Sl(n,n.return,s)}}}mc&&(mc=!1,Mr(n))
break
case 4:ti?(t=Sc,Sc=li(n.stateNode.containerInfo),Er(e,n),Rr(n),Sc=t):(Er(e,n),Rr(n)),4&l&&Ou&&mr(n.stateNode,n,n.stateNode.pendingChildren)
break
case 12:Er(e,n),Rr(n)
break
case 13:Er(e,n),Rr(n),8192&n.child.flags&&null!==n.memoizedState!=(null!==t&&null!==t.memoizedState)&&(Xc=zi()),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,Sr(n,l))
break
case 22:512&l&&(yc||null===t||fr(t,t.return)),u=null!==n.memoizedState
var i=null!==t&&null!==t.memoizedState,a=hc,c=yc
if(hc=a||u,yc=c||i,Er(e,n),yc=c,hc=a,Rr(n),(e=n.stateNode).R=n,e.p&=-3,e.p|=2&e.h,8192&l&&(e.p=u?-2&e.p:1|e.p,u&&(e=hc||yc,null===t||i||e||Tr(n)),Du&&(null===n.memoizedProps||"manual"!==n.memoizedProps.mode)))n:if(t=null,Du)for(e=n;;){if(5===e.tag||ti&&26===e.tag||yi&&27===e.tag){if(null===t){i=t=e
try{o=i.stateNode,u?go(o):xo(i.stateNode,i.memoizedProps)}catch(s){Sl(i,i.return,s)}}}else if(6===e.tag){if(null===t){i=e
try{var f=i.stateNode
u?ko(f):So(f,i.memoizedProps)}catch(s){Sl(i,i.return,s)}}}else if((22!==e.tag&&23!==e.tag||null===e.memoizedState||e===n)&&null!==e.child){e.child.return=e,e=e.child
continue}if(e===n)break n
for(;null===e.sibling;){if(null===e.return||e.return===n)break n
t===e&&(t=null),e=e.return}t===e&&(t=null),e.sibling.return=e.return,e=e.sibling}4&l&&null!==(l=n.updateQueue)&&null!==(t=l.retryQueue)&&(l.retryQueue=null,Sr(n,t))
break
case 19:Er(e,n),Rr(n),4&l&&null!==(l=n.updateQueue)&&(n.updateQueue=null,Sr(n,l))
break
case 21:break
default:Er(e,n),Rr(n)}}function Rr(n){var e=n.flags
if(2&e){try{if(Du&&(!yi||27!==n.tag)){n:{for(var t=n.return;null!==t;){if(dr(t)){var l=t
break n}t=t.return}throw Error(r(160))}switch(l.tag){case 27:if(yi){var u=l.stateNode
yr(n,pr(n),u)
break}case 5:var o=l.stateNode
32&l.flags&&(wo(o),l.flags&=-33),yr(n,pr(n),o)
break
case 3:case 4:var i=l.stateNode.containerInfo
hr(n,pr(n),i)
break
default:throw Error(r(161))}}}catch(a){Sl(n,n.return,a)}n.flags&=-3}4096&e&&(n.flags&=-4097)}function Mr(n){if(1024&n.subtreeFlags)for(n=n.child;null!==n;){var e=n
Mr(e),5===e.tag&&1024&e.flags&&Xu(e.stateNode),n=n.sibling}}function Pr(n,e){if(8772&e.subtreeFlags)for(e=e.child;null!==e;)br(n,e.alternate,e),e=e.sibling}function Tr(n){for(n=n.child;null!==n;){var e=n
switch(e.tag){case 0:case 11:case 14:case 15:or(4,e,e.return),Tr(e)
break
case 1:fr(e,e.return)
var t=e.stateNode
"function"==typeof t.componentWillUnmount&&ar(e,e.return,t),Tr(e)
break
case 26:case 27:case 5:fr(e,e.return),Tr(e)
break
case 22:fr(e,e.return),null===e.memoizedState&&Tr(e)
break
default:Tr(e)}n=n.sibling}}function jr(n,e,t){for(t=t&&!!(8772&e.subtreeFlags),e=e.child;null!==e;){var r=e.alternate,l=n,u=e,o=u.flags
switch(u.tag){case 0:case 11:case 15:jr(l,u,t),ur(4,u)
break
case 1:if(jr(l,u,t),"function"==typeof(l=(r=u).stateNode).componentDidMount)try{l.componentDidMount()}catch(c){Sl(r,r.return,c)}if(null!==(l=(r=u).updateQueue)){var i=r.stateNode
try{var a=l.shared.hiddenCallbacks
if(null!==a)for(l.shared.hiddenCallbacks=null,l=0;l<a.length;l++)pn(a[l],i)}catch(c){Sl(r,r.return,c)}}t&&64&o&&ir(u),cr(u,u.return)
break
case 26:case 27:case 5:jr(l,u,t),t&&null===r&&4&o&&sr(u),cr(u,u.return)
break
case 12:default:jr(l,u,t)
break
case 13:jr(l,u,t),t&&4&o&&xr(l,u)
break
case 22:null===u.memoizedState&&jr(l,u,t),cr(u,u.return)}e=e.sibling}}function Fr(n,e){var t=null
null!==n&&null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(t=n.memoizedState.cachePool.pool),n=null,null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),n!==t&&(null!=n&&n.refCount++,null!=t&&_t(t))}function $r(n,e){n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&_t(n))}function Ir(n,e,t,r){if(10256&e.subtreeFlags)for(e=e.child;null!==e;)zr(n,e,t,r),e=e.sibling}function zr(n,e,t,r){var l=e.flags
switch(e.tag){case 0:case 11:case 15:Ir(n,e,t,r),2048&l&&ur(9,e)
break
case 3:Ir(n,e,t,r),2048&l&&(n=null,null!==e.alternate&&(n=e.alternate.memoizedState.cache),(e=e.memoizedState.cache)!==n&&(e.refCount++,null!=n&&_t(n)))
break
case 12:if(2048&l){Ir(n,e,t,r),n=e.stateNode
try{var u=e.memoizedProps,o=u.id,i=u.onPostCommit
"function"==typeof i&&i(o,null===e.alternate?"mount":"update",n.passiveEffectDuration,-0)}catch(a){Sl(e,e.return,a)}}else Ir(n,e,t,r)
break
case 23:break
case 22:u=e.stateNode,null!==e.memoizedState?4&u.p?Ir(n,e,t,r):Or(n,e):4&u.p?Ir(n,e,t,r):(u.p|=4,Dr(n,e,t,r,!!(10256&e.subtreeFlags))),2048&l&&Fr(e.alternate,e)
break
case 24:Ir(n,e,t,r),2048&l&&$r(e.alternate,e)
break
default:Ir(n,e,t,r)}}function Dr(n,e,t,r,l){for(l=l&&!!(10256&e.subtreeFlags),e=e.child;null!==e;){var u=n,o=e,i=t,a=r,c=o.flags
switch(o.tag){case 0:case 11:case 15:Dr(u,o,i,a,l),ur(8,o)
break
case 23:break
case 22:var f=o.stateNode
null!==o.memoizedState?4&f.p?Dr(u,o,i,a,l):Or(u,o):(f.p|=4,Dr(u,o,i,a,l)),l&&2048&c&&Fr(o.alternate,o)
break
case 24:Dr(u,o,i,a,l),l&&2048&c&&$r(o.alternate,o)
break
default:Dr(u,o,i,a,l)}e=e.sibling}}function Or(n,e){if(10256&e.subtreeFlags)for(e=e.child;null!==e;){var t=n,r=e,l=r.flags
switch(r.tag){case 22:Or(t,r),2048&l&&Fr(r.alternate,r)
break
case 24:Or(t,r),2048&l&&$r(r.alternate,r)
break
default:Or(t,r)}e=e.sibling}}function Lr(n){if(n.subtreeFlags&Ec)for(n=n.child;null!==n;)Nr(n),n=n.sibling}function Nr(n){switch(n.tag){case 26:Lr(n),n.flags&Ec&&(null!==n.memoizedState?hi(Sc,n.memoizedState,n.memoizedProps):Ju(n.type,n.memoizedProps))
break
case 5:Lr(n),n.flags&Ec&&Ju(n.type,n.memoizedProps)
break
case 3:case 4:if(ti){var e=Sc
Sc=li(n.stateNode.containerInfo),Lr(n),Sc=e}else Lr(n)
break
case 22:null===n.memoizedState&&(null!==(e=n.alternate)&&null!==e.memoizedState?(e=Ec,Ec=16777216,Lr(n),Ec=e):Lr(n))
break
default:Lr(n)}}function Ar(n){var e=n.alternate
if(null!==e&&null!==(n=e.child)){e.child=null
do{e=n.sibling,n.sibling=null,n=e}while(null!==n)}}function _r(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var t=0;t<e.length;t++){var r=e[t]
wc=r,Hr(r,n)}Ar(n)}if(10256&n.subtreeFlags)for(n=n.child;null!==n;)Ur(n),n=n.sibling}function Ur(n){switch(n.tag){case 0:case 11:case 15:_r(n),2048&n.flags&&or(9,n,n.return)
break
case 3:case 12:default:_r(n)
break
case 22:var e=n.stateNode
null!==n.memoizedState&&4&e.p&&(null===n.return||13!==n.return.tag)?(e.p&=-5,Br(n)):_r(n)}}function Br(n){var e=n.deletions
if(16&n.flags){if(null!==e)for(var t=0;t<e.length;t++){var r=e[t]
wc=r,Hr(r,n)}Ar(n)}for(n=n.child;null!==n;){switch((e=n).tag){case 0:case 11:case 15:or(8,e,e.return),Br(e)
break
case 22:4&(t=e.stateNode).p&&(t.p&=-5,Br(e))
break
default:Br(e)}n=n.sibling}}function Hr(n,e){for(;null!==wc;){var t=wc
switch(t.tag){case 0:case 11:case 15:or(8,t,e)
break
case 23:case 22:if(null!==t.memoizedState&&null!==t.memoizedState.cachePool){var r=t.memoizedState.cachePool.pool
null!=r&&r.refCount++}break
case 24:_t(t.memoizedState.cache)}if(null!==(r=t.child))r.return=t,wc=r
else n:for(t=n;null!==wc;){var l=(r=wc).sibling,u=r.return
if(wr(r),r===t){wc=null
break n}if(null!==l){l.return=u,wc=l
break n}wc=u}}}function qr(n){var e=Nu(n)
if(null!=e){if("string"!=typeof e.memoizedProps["data-testname"])throw Error(r(364))
return e}if(null===(n=to(n)))throw Error(r(362))
return n.stateNode.current}function Vr(n,e){var t=n.tag
switch(e.$$typeof){case Rc:if(n.type===e.value)return!0
break
case Mc:n:{for(e=e.value,n=[n,0],t=0;t<n.length;){var l=n[t++],u=l.tag,o=n[t++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(l)){for(;null!=i&&Vr(l,i);)i=e[++o]
if(o===e.length){e=!0
break n}for(l=l.child;null!==l;)n.push(l,o),l=l.sibling}}e=!1}return e
case Pc:if((5===t||26===t||27===t)&&oo(n.stateNode,e.value))return!0
break
case jc:if((5===t||6===t||26===t||27===t)&&null!==(n=lo(n))&&0<=n.indexOf(e.value))return!0
break
case Tc:if((5===t||26===t||27===t)&&"string"==typeof(n=n.memoizedProps["data-testname"])&&n.toLowerCase()===e.value.toLowerCase())return!0
break
default:throw Error(r(365))}return!1}function Wr(n){switch(n.$$typeof){case Rc:return"<"+(u(n.value)||"Unknown")+">"
case Mc:return":has("+(Wr(n)||"")+")"
case Pc:return'[role="'+n.value+'"]'
case jc:return'"'+n.value+'"'
case Tc:return'[data-testname="'+n.value+'"]'
default:throw Error(r(365))}}function Yr(n,e){var t=[]
n=[n,0]
for(var r=0;r<n.length;){var l=n[r++],u=l.tag,o=n[r++],i=e[o]
if(5!==u&&26!==u&&27!==u||!uo(l)){for(;null!=i&&Vr(l,i);)i=e[++o]
if(o===e.length)t.push(l)
else for(l=l.child;null!==l;)n.push(l,o),l=l.sibling}}return t}function Jr(n,e){if(!eo)throw Error(r(363))
n=Yr(n=qr(n),e),e=[],n=Array.from(n)
for(var t=0;t<n.length;){var l=n[t++],u=l.tag
if(5===u||26===u||27===u)uo(l)||e.push(l.stateNode)
else for(l=l.child;null!==l;)n.push(l),l=l.sibling}return e}function Gr(){return 2&Ic&&0!==Oc?Oc&-Oc:null!==hu.T?0!==ka?ka:rn():Bu()}function Qr(){0===Yc&&(Yc=536870912&Oc&&!oa?536870912:x())
var n=Oa.current
return null!==n&&(n.flags|=32),Yc}function Kr(n,e,t){(n===zc&&2===Lc||null!==n.cancelPendingCommit)&&(ul(n,0),tl(n,Oc,Yc,!1)),C(n,t),2&Ic&&n===zc||(n===zc&&(!(2&Ic)&&(Vc|=t),4===Hc&&tl(n,Oc,Yc,!1)),K(n))}function Xr(n,e,t){if(6&Ic)throw Error(r(327))
for(var l=!t&&!(60&e)&&0===(e&n.expiredLanes)||g(n,e),u=l?function(n,e){var t=Ic
Ic|=2
var l=al(),u=cl()
zc!==n||Oc!==e?(nf=null,Zc=zi()+500,ul(n,e)):_c=g(n,e)
n:for(;;){try{if(0!==Lc&&null!==Dc){e=Dc
var o=Nc
e:switch(Lc){case 1:Lc=0,Nc=null,yl(n,e,o,1)
break
case 2:if(mn(o)){Lc=0,Nc=null,hl(e)
break}e=function(){2===Lc&&zc===n&&(Lc=7),K(n)},o.then(e,e)
break n
case 3:Lc=7
break n
case 4:Lc=5
break n
case 7:mn(o)?(Lc=0,Nc=null,hl(e)):(Lc=0,Nc=null,yl(n,e,o,7))
break
case 5:var i=null
switch(Dc.tag){case 26:i=Dc.memoizedState
case 5:case 27:var a=Dc,c=a.type,f=a.pendingProps
if(i?pi(i):Wu(c,f)){Lc=0,Nc=null
var s=a.sibling
if(null!==s)Dc=s
else{var v=a.return
null!==v?(Dc=v,ml(v)):Dc=null}break e}}Lc=0,Nc=null,yl(n,e,o,5)
break
case 6:Lc=0,Nc=null,yl(n,e,o,6)
break
case 8:ll(),Hc=6
break n
default:throw Error(r(462))}}dl()
break}catch(d){ol(n,d)}1}return ac=ic=null,hu.H=l,hu.A=u,Ic=t,null!==Dc?0:(zc=null,Oc=0,V(),Hc)}(n,e):sl(n,e,!0),o=l;;){if(0===u){_c&&!l&&tl(n,e,0,!1)
break}if(6===u)tl(n,e,0,!Ac)
else{if(t=n.current.alternate,o&&!el(t)){u=sl(n,e,!1),o=!1
continue}if(2===u){if(o=e,n.errorRecoveryDisabledLanes&o)var i=0
else i=0!=(i=-536870913&n.pendingLanes)?i:536870912&i?536870912:0
if(0!==i){e=i
n:{var a=n
u=Gc
var c=Lu&&a.current.memoizedState.isDehydrated
if(c&&(ul(a,i).flags|=256),2!==(i=sl(a,i,!1))){if(Uc&&!c){a.errorRecoveryDisabledLanes|=o,Vc|=o,u=4
break n}o=Qc,Qc=u,null!==o&&Zr(o)}u=i}if(o=!1,2!==u)continue}}if(1===u){ul(n,0),tl(n,e,0,!0)
break}n:{switch(l=n,u){case 0:case 1:throw Error(r(345))
case 4:if((4194176&e)===e){tl(l,e,Yc,!Ac)
break n}break
case 2:Qc=null
break
case 3:case 5:break
default:throw Error(r(329))}if(l.finishedWork=t,l.finishedLanes=e,(62914560&e)===e&&10<(o=Xc+300-zi())){if(tl(l,e,Yc,!Ac),0!==w(l,0))break n
l.timeoutHandle=Fu(nl.bind(null,l,t,Qc,nf,Kc,e,Yc,Vc,Jc,Ac,2,-0,0),o)}else nl(l,t,Qc,nf,Kc,e,Yc,Vc,Jc,Ac,0,-0,0)}}break}K(n)}function Zr(n){null===Qc?Qc=n:Qc.push.apply(Qc,n)}function nl(n,e,t,r,l,u,o,i,a,c,f,s,v){var d=e.subtreeFlags
if((8192&d||!(16785408&~d))&&(Yu(),Nr(e),null!==(e=Gu())))return n.cancelPendingCommit=e(wl.bind(null,n,t,r,l,o,i,a,1,s,v)),tl(n,u,o,!c),void 0
wl(n,t,r,l,o,i,a)}function el(n){for(var e=n;;){var t=e.tag
if((0===t||11===t||15===t)&&16384&e.flags&&null!==(t=e.updateQueue)&&null!==(t=t.stores))for(var r=0;r<t.length;r++){var l=t[r],u=l.getSnapshot
l=l.value
try{if(!Hi(u(),l))return!1}catch(o){return!1}}if(t=e.child,16384&e.subtreeFlags&&null!==t)t.return=e,e=t
else{if(e===n)break
for(;null===e.sibling;){if(null===e.return||e.return===n)return!0
e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function tl(n,e,t,r){e&=~Wc,e&=~Vc,n.suspendedLanes|=e,n.pingedLanes&=~e,r&&(n.warmLanes|=e),r=n.expirationTimes
for(var l=e;0<l;){var u=31-Ci(l),o=1<<u
r[u]=-1,l&=~o}0!==t&&R(n,t,e)}function rl(){return!!(6&Ic)||(X(0),!1)}function ll(){if(null!==Dc){if(0===Lc)var n=Dc.return
else ac=ic=null,Hn(n=Dc),ja=null,Fa=0,n=Dc
for(;null!==n;)rr(n.alternate,n),n=n.return
Dc=null}}function ul(n,e){n.finishedWork=null,n.finishedLanes=0
var t=n.timeoutHandle
t!==Iu&&(n.timeoutHandle=Iu,$u(t)),null!==(t=n.cancelPendingCommit)&&(n.cancelPendingCommit=null,t()),ll(),zc=n,Dc=t=Fl(n.current,null),Oc=e,Lc=0,Nc=null,Ac=!1,_c=g(n,e),Uc=!1,Jc=Yc=Wc=Vc=qc=Hc=0,Qc=Gc=null,Kc=!1,8&e&&(e|=32&e)
var r=n.entangledLanes
if(0!==r)for(n=n.entanglements,r&=e;0<r;){var l=31-Ci(r),u=1<<l
e|=n[l],r&=~u}return Bc=e,V(),t}function ol(n,e){_a=null,hu.H=Ka,e===Ra?(e=gn(),Lc=3):e===Ma?(e=gn(),Lc=4):Lc=e===rc?8:null!==e&&"object"==typeof e&&"function"==typeof e.then?6:1,Nc=e,null===Dc&&(Hc=1,Ze(n,j(e,n.current)))}function il(){var n=Oa.current
return null===n||((4194176&Oc)===Oc?null===La:!!((62914560&Oc)===Oc||536870912&Oc)&&n===La)}function al(){var n=hu.H
return hu.H=Ka,null===n?Ka:n}function cl(){var n=hu.A
return hu.A=Cc,n}function fl(){Hc=4,Ac||(4194176&Oc)!==Oc&&null!==Oa.current||(_c=!0),!(134217727&qc)&&!(134217727&Vc)||null===zc||tl(zc,Oc,Yc,!1)}function sl(n,e,t){var r=Ic
Ic|=2
var l=al(),u=cl()
zc===n&&Oc===e||(nf=null,ul(n,e)),e=!1
var o=Hc
n:for(;;){try{if(0!==Lc&&null!==Dc){var i=Dc,a=Nc
switch(Lc){case 8:ll(),o=6
break n
case 3:case 2:case 6:null===Oa.current&&(e=!0)
var c=Lc
if(Lc=0,Nc=null,yl(n,i,a,c),t&&_c){o=0
break n}break
default:c=Lc,Lc=0,Nc=null,yl(n,i,a,c)}}vl(),o=Hc
break}catch(f){ol(n,f)}1}return e&&n.shellSuspendCounter++,ac=ic=null,Ic=r,hu.H=l,hu.A=u,null===Dc&&(zc=null,Oc=0,V()),o}function vl(){for(;null!==Dc;)pl(Dc)}function dl(){for(;null!==Dc&&!$i();)pl(Dc)}function pl(n){var e=Pt(n.alternate,n,Bc)
n.memoizedProps=n.pendingProps,null===e?ml(n):Dc=e}function hl(n){var e=n,t=e.alternate
switch(e.tag){case 15:case 0:e=pt(t,e,e.pendingProps,e.type,void 0,Oc)
break
case 11:e=pt(t,e,e.pendingProps,e.type.render,e.ref,Oc)
break
case 5:Hn(e)
default:rr(t,e),e=Pt(t,e=Dc=$l(e,Bc),Bc)}n.memoizedProps=n.pendingProps,null===e?ml(n):Dc=e}function yl(n,e,t,l){ac=ic=null,Hn(e),ja=null,Fa=0
var u=e.return
try{if(function(n,e,t,l,u){if(t.flags|=32768,null!==l&&"object"==typeof l&&"function"==typeof l.then){if(null!==(e=t.alternate)&&It(e,t,u,!0),null!==(t=Oa.current)){switch(t.tag){case 13:return null===La?fl():null===t.alternate&&0===Hc&&(Hc=3),t.flags&=-257,t.flags|=65536,t.lanes=u,l===Pa?t.flags|=16384:(null===(e=t.updateQueue)?t.updateQueue=new Set([l]):e.add(l),El(n,l,u)),!1
case 22:return t.flags|=65536,l===Pa?t.flags|=16384:(null===(e=t.updateQueue)?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},t.updateQueue=e):null===(t=e.retryQueue)?e.retryQueue=new Set([l]):t.add(l),El(n,l,u)),!1}throw Error(r(435,t.tag))}return El(n,l,u),fl(),!1}if(oa)return null!==(e=Oa.current)?(!(65536&e.flags)&&(e.flags|=256),e.flags|=65536,e.lanes=u,l!==ca&&q(j(n=Error(r(422),{cause:l}),t))):(l!==ca&&q(j(e=Error(r(423),{cause:l}),t)),(n=n.current.alternate).flags|=65536,u&=-u,n.lanes|=u,l=j(l,t),sn(n,u=et(n.stateNode,l,u)),4!==Hc&&(Hc=2)),!1
var o=Error(r(520),{cause:l})
if(o=j(o,t),null===Gc?Gc=[o]:Gc.push(o),4!==Hc&&(Hc=2),null===e)return!0
l=j(l,t),t=e
do{switch(t.tag){case 3:return t.flags|=65536,n=u&-u,t.lanes|=n,sn(t,n=et(t.stateNode,l,n)),!1
case 1:if(e=t.type,o=t.stateNode,!(128&t.flags||"function"!=typeof e.getDerivedStateFromError&&(null===o||"function"!=typeof o.componentDidCatch||null!==ef&&ef.has(o))))return t.flags|=65536,u&=-u,t.lanes|=u,rt(u=tt(u),n,t,l),sn(t,u),!1}t=t.return}while(null!==t)
return!1}(n,u,e,t,Oc))return Hc=1,Ze(n,j(t,n.current)),Dc=null,void 0}catch(o){if(null!==u)throw Dc=u,o
return Hc=1,Ze(n,j(t,n.current)),Dc=null,void 0}32768&e.flags?(oa||1===l?n=!0:_c||536870912&Oc?n=!1:(Ac=n=!0,(2===l||3===l||6===l)&&null!==(l=Oa.current)&&13===l.tag&&(l.flags|=16384)),bl(e,n)):ml(e)}function ml(n){var e=n
do{if(32768&e.flags)return bl(e,Ac),void 0
n=e.return
var t=er(e.alternate,e,Bc)
if(null!==t)return Dc=t,void 0
if(null!==(e=e.sibling))return Dc=e,void 0
Dc=e=n}while(null!==e)
0===Hc&&(Hc=5)}function bl(n,e){do{var t=tr(n.alternate,n)
if(null!==t)return t.flags&=32767,Dc=t,void 0
if(null!==(t=n.return)&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!e&&null!==(n=n.sibling))return Dc=n,void 0
Dc=n=t}while(null!==n)
Hc=6,Dc=null}function wl(n,e,t,l,u,o,i,a,c,f){var s=hu.T,v=Uu()
try{_u(2),hu.T=null,function(n,e,t,l,u,o,i,a){do{kl()}while(null!==rf)
if(6&Ic)throw Error(r(327))
var c=n.finishedWork
if(l=n.finishedLanes,null===c)return null
if(n.finishedWork=null,n.finishedLanes=0,c===n.current)throw Error(r(177))
n.callbackNode=null,n.callbackPriority=0,n.cancelPendingCommit=null
var f=c.lanes|c.childLanes
if(function(n,e,t,r,l,u){var o=n.pendingLanes
n.pendingLanes=t,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=t,n.entangledLanes&=t,n.errorRecoveryDisabledLanes&=t,n.shellSuspendCounter=0
var i=n.entanglements,a=n.expirationTimes,c=n.hiddenUpdates
for(t=o&~t;0<t;){var f=31-Ci(t),s=1<<f
i[f]=0,a[f]=-1
var v=c[f]
if(null!==v)for(c[f]=null,f=0;f<v.length;f++){var d=v[f]
null!==d&&(d.lane&=-536870913)}t&=~s}0!==r&&R(n,r,0),0!==u&&0===l&&0!==n.tag&&(n.suspendedLanes|=u&~(o&~e))}(n,l,f|=va,o,i,a),n===zc&&(Dc=zc=null,Oc=0),!(10256&c.subtreeFlags)&&!(10256&c.flags)||tf||(tf=!0,uf=f,of=t,ji(Li,function(){return kl(),null})),t=!!(15990&c.flags),15990&c.subtreeFlags||t?(t=hu.T,hu.T=null,o=Uu(),_u(2),i=Ic,Ic|=4,function(n,e){for(Eu(n.containerInfo),wc=e;null!==wc;)if(e=(n=wc).child,1028&n.subtreeFlags&&null!==e)e.return=n,wc=e
else for(;null!==wc;){var t=(n=wc).alternate
switch(e=n.flags,n.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break
case 1:if(1024&e&&null!==t){e=void 0
var l=n,u=t.memoizedProps
t=t.memoizedState
var o=l.stateNode
try{var i=Xe(l.type,u)
e=o.getSnapshotBeforeUpdate(i,t),o.k=e}catch(a){Sl(l,l.return,a)}}break
case 3:1024&e&&Du&&Eo(n.stateNode.containerInfo)
break
default:if(1024&e)throw Error(r(163))}if(null!==(e=n.sibling)){e.return=n.return,wc=e
break}wc=n.return}return i=gc,gc=!1,i}(n,c),Cr(c,n),Cu(n.containerInfo),n.current=c,br(n,c.alternate,c),Ii(),Ic=i,_u(o),hu.T=t):n.current=c,tf?(tf=!1,rf=n,lf=l):gl(n,f),0===(f=n.pendingLanes)&&(ef=null),function(n){if(Bi&&"function"==typeof Bi.onCommitFiberRoot)try{Bi.onCommitFiberRoot(Ui,n,void 0,!(128&~n.current.flags))}catch(e){}}(c.stateNode),K(n),null!==e)for(u=n.onRecoverableError,c=0;c<e.length;c++)u((f=e[c]).value,{componentStack:f.stack})
return!!(3&lf)&&kl(),f=n.pendingLanes,4194218&l&&42&f?n===cf?af++:(af=0,cf=n):af=0,X(0),null}(n,e,t,l,v,u,o,i)}finally{hu.T=s,_u(v)}}function gl(n,e){0===(n.pooledCacheLanes&=e)&&null!=(e=n.pooledCache)&&(n.pooledCache=null,_t(e))}function kl(){if(null!==rf){var n=rf,e=uf
uf=0
var t=P(lf),l=32>t?32:t
t=hu.T
var u=Uu()
try{if(_u(l),hu.T=null,null===rf)var o=!1
else{l=of,of=null
var i=rf,a=lf
if(rf=null,lf=0,6&Ic)throw Error(r(331))
var c=Ic
if(Ic|=4,Ur(i.current),zr(i,i.current,a,l),Ic=c,X(0),Bi&&"function"==typeof Bi.onPostCommitFiberRoot)try{Bi.onPostCommitFiberRoot(Ui,i)}catch(f){}o=!0}return o}finally{_u(u),hu.T=t,gl(n,e)}}return!1}function xl(n,e,t){e=j(t,e),null!==(n=cn(n,e=et(n.stateNode,e,2),2))&&(C(n,2),K(n))}function Sl(n,e,t){if(3===n.tag)xl(n,n,t)
else for(;null!==e;){if(3===e.tag){xl(e,n,t)
break}if(1===e.tag){var r=e.stateNode
if("function"==typeof e.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===ef||!ef.has(r))){n=j(t,n),null!==(r=cn(e,t=tt(2),2))&&(rt(t,r,e,n),C(r,2),K(r))
break}}e=e.return}}function El(n,e,t){var r=n.pingCache
if(null===r){r=n.pingCache=new $c
var l=new Set
r.set(e,l)}else void 0===(l=r.get(e))&&(l=new Set,r.set(e,l))
l.has(t)||(Uc=!0,l.add(t),n=Cl.bind(null,n,e,t),e.then(n,n))}function Cl(n,e,t){var r=n.pingCache
null!==r&&r.delete(e),n.pingedLanes|=n.suspendedLanes&t,n.warmLanes&=~t,zc===n&&(Oc&t)===t&&(4===Hc||3===Hc&&(62914560&Oc)===Oc&&300>zi()-Xc?!(2&Ic)&&ul(n,0):Wc|=t,Jc===Oc&&(Jc=0)),K(n)}function Rl(n,e){0===e&&(e=S()),null!==(n=J(n,e))&&(C(n,e),K(n))}function Ml(n){var e=n.memoizedState,t=0
null!==e&&(t=e.retryLane),Rl(n,t)}function Pl(n,e){var t=0
switch(n.tag){case 13:var l=n.stateNode,u=n.memoizedState
null!==u&&(t=u.retryLane)
break
case 19:l=n.stateNode
break
case 22:l=n.stateNode.C
break
default:throw Error(r(314))}null!==l&&l.delete(e),Rl(n,t)}function Tl(n,e,t,r){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jl(n){return!(!(n=n.prototype)||!n.isReactComponent)}function Fl(n,t){var r=n.alternate
return null===r?((r=e(n.tag,t,n.key,n.mode)).elementType=n.elementType,r.type=n.type,r.stateNode=n.stateNode,r.alternate=n,n.alternate=r):(r.pendingProps=t,r.type=n.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=31457280&n.flags,r.childLanes=n.childLanes,r.lanes=n.lanes,r.child=n.child,r.memoizedProps=n.memoizedProps,r.memoizedState=n.memoizedState,r.updateQueue=n.updateQueue,t=n.dependencies,r.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=n.sibling,r.index=n.index,r.ref=n.ref,r.refCleanup=n.refCleanup,r}function $l(n,e){n.flags&=31457282
var t=n.alternate
return null===t?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,n.type=t.type,e=t.dependencies,n.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n}function Il(n,t,l,u,o,i){var a=0
if(u=n,"function"==typeof n)jl(n)&&(a=1)
else if("string"==typeof n)a=ti&&yi?ri(n,l,na.current)?26:ki(n)?27:5:ti?ri(n,l,na.current)?26:5:yi&&ki(n)?27:5
else n:switch(n){case nu:return zl(l.children,o,i,t)
case eu:a=8,o|=24
break
case tu:return(n=e(12,l,t,2|o)).elementType=tu,n.lanes=i,n
case iu:return(n=e(13,l,t,o)).elementType=iu,n.lanes=i,n
case au:return(n=e(19,l,t,o)).elementType=au,n.lanes=i,n
case su:return Dl(l,o,i,t)
default:if("object"==typeof n&&null!==n)switch(n.$$typeof){case ru:case uu:a=10
break n
case lu:a=9
break n
case ou:a=11
break n
case cu:a=14
break n
case fu:a=16,u=null
break n}a=29,l=Error(r(130,null===n?"null":typeof n,"")),u=null}return(t=e(a,l,t,o)).elementType=n,t.type=u,t.lanes=i,t}function zl(n,t,r,l){return(n=e(7,n,l,t)).lanes=r,n}function Dl(n,t,l,u){(n=e(22,n,u,t)).elementType=su,n.lanes=l
var o={p:1,h:1,M:null,C:null,P:null,R:null,detach:function(){var n=o.R
if(null===n)throw Error(r(456))
if(!(2&o.h)){var e=J(n,2)
null!==e&&(o.h|=2,Kr(e,0,2))}},attach:function(){var n=o.R
if(null===n)throw Error(r(456))
if(2&o.h){var e=J(n,2)
null!==e&&(o.h&=-3,Kr(e,0,2))}}}
return n.stateNode=o,n}function Ol(n,t,r){return(n=e(6,n,null,t)).lanes=r,n}function Ll(n,t,r){return(t=e(4,null!==n.children?n.children:[],n.key,t)).lanes=r,t.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},t}function Nl(n,e,t,r,l,u,o,i){this.tag=1,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=Iu,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=E(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=E(0),this.hiddenUpdates=E(null),this.identifierPrefix=r,this.onUncaughtError=l,this.onCaughtError=u,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.incompleteTransitions=new Map}function Al(n,t,r,l,u,o,i,a,c,f,s,v){return n=new Nl(n,t,r,i,a,c,f,v),t=1,!0===o&&(t|=24),o=e(3,null,null,t),n.current=o,o.stateNode=n,(t=At()).refCount++,n.pooledCache=t,t.refCount++,o.memoizedState={element:l,isDehydrated:r,cache:t},un(o),n}function _l(n){return n?n=Ei:Ei}function Ul(n){var e=n.m
if(void 0===e){if("function"==typeof n.render)throw Error(r(188))
throw n=Object.keys(n).join(","),Error(r(268,n))}return null===(n=null!==(n=v(e))?d(n):null)?null:ku(n.stateNode)}function Bl(n,e,t,r,l,u){l=_l(l),null===r.context?r.context=l:r.pendingContext=l,(r=an(e)).payload={element:t},null!==(u=void 0===u?null:u)&&(r.callback=u),null!==(t=cn(n,r,e))&&(Kr(t,0,e),fn(t,n,e))}function Hl(n,e){if(null!==(n=n.memoizedState)&&null!==n.dehydrated){var t=n.retryLane
n.retryLane=0!==t&&t<e?t:e}}function ql(n,e){Hl(n,e),(n=n.alternate)&&Hl(n,e)}var Vl,Wl,Yl={},Jl=jn(),Gl=function(){return Qe||(Qe=1,ot.exports=function(){return Ge||(Ge=1,function(n){function e(n,e){var t=n.length
n.push(e)
n:for(;0<t;){var r=t-1>>>1,u=n[r]
if(!(0<l(u,e)))break n
n[r]=e,n[t]=u,t=r}}function t(n){return 0===n.length?null:n[0]}function r(n){if(0===n.length)return null
var e=n[0],t=n.pop()
if(t!==e){n[0]=t
n:for(var r=0,u=n.length,o=u>>>1;r<o;){var i=2*(r+1)-1,a=n[i],c=i+1,f=n[c]
if(0>l(a,t))c<u&&0>l(f,a)?(n[r]=f,n[c]=t,r=c):(n[r]=a,n[i]=t,r=i)
else{if(!(c<u&&0>l(f,t)))break n
n[r]=f,n[c]=t,r=c}}}return e}function l(n,e){var t=n.sortIndex-e.sortIndex
return 0!==t?t:n.id-e.id}function u(n){for(var l=t(y);null!==l;){if(null===l.callback)r(y)
else{if(!(l.startTime<=n))break
r(y),l.sortIndex=l.expirationTime,e(h,l)}l=t(y)}}function o(n){if(x=!1,u(n),!k)if(null!==t(h))k=!0,c()
else{var e=t(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-T<P)}function a(){if(R){var e=n.unstable_now()
T=e
var l=!0
try{n:{k=!1,x&&(x=!1,E(M),M=-1),g=!0
var a=w
try{e:{for(u(e),b=t(h);null!==b&&!(b.expirationTime>e&&i());){var c=b.callback
if("function"==typeof c){b.callback=null,w=b.priorityLevel
var s=c(b.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){b.callback=s,u(e),l=!0
break e}b===t(h)&&r(h),u(e)}else r(h)
b=t(h)}if(null!==b)l=!0
else{var v=t(y)
null!==v&&f(o,v.startTime-e),l=!1}}break n}finally{b=null,w=a,g=!1}l=void 0}}finally{l?p():R=!1}}}function c(){R||(R=!0,p())}function f(e,t){M=S(function(){e(n.unstable_now())},t)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],m=1,b=null,w=3,g=!1,k=!1,x=!1,S="function"==typeof setTimeout?setTimeout:null,E="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,R=!1,M=-1,P=5,T=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var j=new MessageChannel,F=j.port2
j.port1.onmessage=a,p=function(){F.postMessage(null)}}else p=function(){S(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){k||g||(k=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return w},n.unstable_getFirstCallbackNode=function(){return t(h)},n.unstable_next=function(n){switch(w){case 1:case 2:case 3:var e=3
break
default:e=w}var t=w
w=e
try{return n()}finally{w=t}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var t=w
w=n
try{return e()}finally{w=t}},n.unstable_scheduleCallback=function(r,l,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,r){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return r={id:m++,callback:l,priorityLevel:r,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(r.sortIndex=u,e(y,r),null===t(h)&&r===t(y)&&(x?(E(M),M=-1):x=!0,f(o,u-i))):(r.sortIndex=a,e(h,r),k||g||(k=!0,c())),r},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=w
return function(){var t=w
w=e
try{return n.apply(this,arguments)}finally{w=t}}}}(it)),it}()),ot.exports}(),Ql=Object.assign,Kl=Symbol.for("react.element"),Xl=Symbol.for("react.transitional.element"),Zl=Symbol.for("react.portal"),nu=Symbol.for("react.fragment"),eu=Symbol.for("react.strict_mode"),tu=Symbol.for("react.profiler"),ru=Symbol.for("react.provider"),lu=Symbol.for("react.consumer"),uu=Symbol.for("react.context"),ou=Symbol.for("react.forward_ref"),iu=Symbol.for("react.suspense"),au=Symbol.for("react.suspense_list"),cu=Symbol.for("react.memo"),fu=Symbol.for("react.lazy"),su=Symbol.for("react.offscreen"),vu=Symbol.for("react.memo_cache_sentinel"),du=Symbol.iterator,pu=Symbol.for("react.client.reference"),hu=Jl.j,yu=!1,mu=Array.isArray,bu=n.rendererVersion,wu=n.rendererPackageName,gu=n.extraDevToolsConfig,ku=n.getPublicInstance,xu=n.getRootHostContext,Su=n.getChildHostContext,Eu=n.prepareForCommit,Cu=n.resetAfterCommit,Ru=n.createInstance,Mu=n.appendInitialChild,Pu=n.finalizeInitialChildren,Tu=n.shouldSetTextContent,ju=n.createTextInstance,Fu=n.scheduleTimeout,$u=n.cancelTimeout,Iu=n.noTimeout,zu=n.isPrimaryRenderer,Du=n.supportsMutation,Ou=n.supportsPersistence,Lu=n.supportsHydration,Nu=n.getInstanceFromNode,Au=n.preparePortalMount,_u=n.setCurrentUpdatePriority,Uu=n.getCurrentUpdatePriority,Bu=n.resolveUpdatePriority,Hu=n.shouldAttemptEagerTransition,qu=n.detachDeletedInstance,Vu=n.maySuspendCommit,Wu=n.preloadInstance,Yu=n.startSuspendingCommit,Ju=n.suspendInstance,Gu=n.waitForCommitToBeReady,Qu=n.NotPendingTransition,Ku=n.HostTransitionContext,Xu=n.resetFormInstance,Zu=n.supportsMicrotasks,no=n.scheduleMicrotask,eo=n.supportsTestSelectors,to=n.findFiberRoot,ro=n.getBoundingRect,lo=n.getTextContent,uo=n.isHiddenSubtree,oo=n.matchAccessibilityRole,io=n.setFocusIfFocusable,ao=n.setupIntersectionObserver,co=n.appendChild,fo=n.appendChildToContainer,so=n.commitTextUpdate,vo=n.commitMount,po=n.commitUpdate,ho=n.insertBefore,yo=n.insertInContainerBefore,mo=n.removeChild,bo=n.removeChildFromContainer,wo=n.resetTextContent,go=n.hideInstance,ko=n.hideTextInstance,xo=n.unhideInstance,So=n.unhideTextInstance,Eo=n.clearContainer,Co=n.cloneInstance,Ro=n.createContainerChildSet,Mo=n.appendChildToContainerChildSet,Po=n.finalizeContainerChildren,To=n.replaceContainerChildren,jo=n.cloneHiddenInstance,Fo=n.cloneHiddenTextInstance,$o=n.isSuspenseInstancePending,Io=n.isSuspenseInstanceFallback,zo=n.getSuspenseInstanceFallbackErrorDetails,Do=n.registerSuspenseInstanceRetry,Oo=n.canHydrateFormStateMarker,Lo=n.isFormStateMarkerMatching,No=n.getNextHydratableSibling,Ao=n.getFirstHydratableChild,_o=n.getFirstHydratableChildWithinContainer,Uo=n.getFirstHydratableChildWithinSuspenseInstance,Bo=n.canHydrateInstance,Ho=n.canHydrateTextInstance,qo=n.canHydrateSuspenseInstance,Vo=n.hydrateInstance,Wo=n.hydrateTextInstance,Yo=n.hydrateSuspenseInstance,Jo=n.getNextHydratableInstanceAfterSuspenseInstance,Go=n.commitHydratedContainer,Qo=n.commitHydratedSuspenseInstance,Ko=n.clearSuspenseBoundary,Xo=n.clearSuspenseBoundaryFromContainer,Zo=n.shouldDeleteUnhydratedTailInstances,ni=n.validateHydratableInstance,ei=n.validateHydratableTextInstance,ti=n.supportsResources,ri=n.isHostHoistableType,li=n.getHoistableRoot,ui=n.getResource,oi=n.acquireResource,ii=n.releaseResource,ai=n.hydrateHoistable,ci=n.mountHoistable,fi=n.unmountHoistable,si=n.createHoistableInstance,vi=n.prepareToCommitHoistables,di=n.mayResourceSuspendCommit,pi=n.preloadResource,hi=n.suspendResource,yi=n.supportsSingletons,mi=n.resolveSingletonInstance,bi=n.clearSingleton,wi=n.acquireSingletonInstance,gi=n.releaseSingletonInstance,ki=n.isHostSingletonType,xi=[],Si=-1,Ei={},Ci=Math.clz32?Math.clz32:function(n){return 0==(n>>>=0)?32:31-(Ri(n)/Mi|0)|0},Ri=Math.log,Mi=Math.LN2,Pi=128,Ti=4194304,ji=Gl.unstable_scheduleCallback,Fi=Gl.unstable_cancelCallback,$i=Gl.unstable_shouldYield,Ii=Gl.unstable_requestPaint,zi=Gl.unstable_now,Di=Gl.unstable_ImmediatePriority,Oi=Gl.unstable_UserBlockingPriority,Li=Gl.unstable_NormalPriority,Ni=Gl.unstable_IdlePriority,Ai=Gl.log,_i=Gl.unstable_setDisableYieldValue,Ui=null,Bi=null,Hi="function"==typeof Object.is?Object.is:function(n,e){return n===e&&(0!==n||1/n==1/e)||n!=n&&e!=e},qi=new WeakMap,Vi=[],Wi=0,Yi=null,Ji=0,Gi=[],Qi=0,Ki=null,Xi=1,Zi="",na=h(null),ea=h(null),ta=h(null),ra=h(null),la=null,ua=null,oa=!1,ia=null,aa=!1,ca=Error(r(519)),fa=[],sa=0,va=0,da=null,pa=null,ha=!1,ya=!1,ma=!1,ba=0,wa=null,ga=0,ka=0,xa=null,Sa=!1,Ea=!1,Ca=Object.prototype.hasOwnProperty,Ra=Error(r(460)),Ma=Error(r(474)),Pa={then:function(){}},Ta=null,ja=null,Fa=0,$a=Cn(!0),Ia=Cn(!1),za=h(null),Da=h(0),Oa=h(null),La=null,Na=h(0),Aa=0,_a=null,Ua=null,Ba=null,Ha=!1,qa=!1,Va=!1,Wa=0,Ya=0,Ja=null,Ga=0,Qa=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}},Ka={readContext:Ot,use:Yn,useCallback:Dn,useContext:Dn,useEffect:Dn,useImperativeHandle:Dn,useLayoutEffect:Dn,useInsertionEffect:Dn,useMemo:Dn,useReducer:Dn,useRef:Dn,useState:Dn,useDebugValue:Dn,useDeferredValue:Dn,useTransition:Dn,useSyncExternalStore:Dn,useId:Dn}
Ka.useCacheRefresh=Dn,Ka.useMemoCache=Dn,Ka.useHostTransitionStatus=Dn,Ka.useFormState=Dn,Ka.useActionState=Dn,Ka.useOptimistic=Dn
var Xa={readContext:Ot,use:Yn,useCallback:function(n,e){return qn().memoizedState=[n,void 0===e?null:e],n},useContext:Ot,useEffect:Se,useImperativeHandle:function(n,e,t){t=null!=t?t.concat([n]):null,ke(4194308,4,Me.bind(null,e,n),t)},useLayoutEffect:function(n,e){return ke(4194308,4,n,e)},useInsertionEffect:function(n,e){ke(4,2,n,e)},useMemo:function(n,e){var t=qn()
e=void 0===e?null:e
var r=n()
if(Va){T(!0)
try{n()}finally{T(!1)}}return t.memoizedState=[r,e],r},useReducer:function(n,e,t){var r=qn()
if(void 0!==t){var l=t(e)
if(Va){T(!0)
try{t(e)}finally{T(!1)}}}else l=e
return r.memoizedState=r.baseState=l,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:l},r.queue=n,n=n.dispatch=_e.bind(null,_a,n),[r.memoizedState,n]},useRef:function(n){return n={current:n},qn().memoizedState=n},useState:function(n){var e=(n=ue(n)).queue,t=Ue.bind(null,_a,e)
return e.dispatch=t,[n.memoizedState,t]},useDebugValue:Te,useDeferredValue:function(n,e){return $e(qn(),n,e)},useTransition:function(){var n=ue(!1)
return n=ze.bind(null,_a,n.queue,!0,!1),qn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,e,t){var l=_a,u=qn()
if(oa){if(void 0===t)throw Error(r(407))
t=t()}else{if(t=e(),null===zc)throw Error(r(349))
60&Oc||ne(l,e,t)}u.memoizedState=t
var o={value:t,getSnapshot:e}
return u.queue=o,Se(te.bind(null,l,o,n),[n]),l.flags|=2048,we(9,ee.bind(null,l,o,t,e),{destroy:void 0},null),t},useId:function(){var n=qn(),e=zc.identifierPrefix
if(oa){var t=Zi
e=":"+e+"R"+(t=(Xi&~(1<<32-Ci(Xi)-1)).toString(32)+t),0<(t=Wa++)&&(e+="H"+t.toString(32)),e+=":"}else e=":"+e+"r"+(t=Ga++).toString(32)+":"
return n.memoizedState=e},useCacheRefresh:function(){return qn().memoizedState=Ae.bind(null,_a)}}
Xa.useMemoCache=Jn,Xa.useHostTransitionStatus=Oe,Xa.useFormState=pe,Xa.useActionState=pe,Xa.useOptimistic=function(n){var e=qn()
e.memoizedState=e.baseState=n
var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null}
return e.queue=t,e=He.bind(null,_a,!0,t),t.dispatch=e,[n,e]}
var Za={readContext:Ot,use:Yn,useCallback:je,useContext:Ot,useEffect:Ee,useImperativeHandle:Pe,useInsertionEffect:Ce,useLayoutEffect:Re,useMemo:Fe,useReducer:Qn,useRef:ge,useState:function(){return Qn(Gn)},useDebugValue:Te,useDeferredValue:function(n,e){return Ie(Vn(),Ua.memoizedState,n,e)},useTransition:function(){var n=Qn(Gn)[0],e=Vn().memoizedState
return["boolean"==typeof n?n:Wn(n),e]},useSyncExternalStore:Zn,useId:Le}
Za.useCacheRefresh=Ne,Za.useMemoCache=Jn,Za.useHostTransitionStatus=Oe,Za.useFormState=he,Za.useActionState=he,Za.useOptimistic=function(n,e){return oe(Vn(),0,n,e)}
var nc={readContext:Ot,use:Yn,useCallback:je,useContext:Ot,useEffect:Ee,useImperativeHandle:Pe,useInsertionEffect:Ce,useLayoutEffect:Re,useMemo:Fe,useReducer:Xn,useRef:ge,useState:function(){return Xn(Gn)},useDebugValue:Te,useDeferredValue:function(n,e){var t=Vn()
return null===Ua?$e(t,n,e):Ie(t,Ua.memoizedState,n,e)},useTransition:function(){var n=Xn(Gn)[0],e=Vn().memoizedState
return["boolean"==typeof n?n:Wn(n),e]},useSyncExternalStore:Zn,useId:Le}
nc.useCacheRefresh=Ne,nc.useMemoCache=Jn,nc.useHostTransitionStatus=Oe,nc.useFormState=be,nc.useActionState=be,nc.useOptimistic=function(n,e){var t=Vn()
return null!==Ua?oe(t,0,n,e):(t.baseState=n,[n,t.queue.dispatch])}
var ec={isMounted:function(n){return!!(n=n.m)&&f(n)===n},enqueueSetState:function(n,e,t){n=n.m
var r=Gr(),l=an(r)
l.payload=e,null!=t&&(l.callback=t),null!==(e=cn(n,l,r))&&(Kr(e,0,r),fn(e,n,r))},enqueueReplaceState:function(n,e,t){n=n.m
var r=Gr(),l=an(r)
l.tag=1,l.payload=e,null!=t&&(l.callback=t),null!==(e=cn(n,l,r))&&(Kr(e,0,r),fn(e,n,r))},enqueueForceUpdate:function(n,e){n=n.m
var t=Gr(),r=an(t)
r.tag=2,null!=e&&(r.callback=e),null!==(e=cn(n,r,t))&&(Kr(e,0,t),fn(e,n,t))}},tc="function"==typeof reportError?reportError:function(n){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof n&&null!==n&&"string"==typeof n.message?String(n.message):String(n),error:n})
if(!window.dispatchEvent(e))return}else if("object"==typeof process&&"function"==typeof process.emit)return process.emit("uncaughtException",n),void 0
void 0},rc=Error(r(461)),lc=!1,uc={dehydrated:null,treeContext:null,retryLane:0},oc=h(null),ic=null,ac=null,cc="undefined"!=typeof AbortController?AbortController:function(){var n=[],e=this.signal={aborted:!1,addEventListener:function(e,t){n.push(t)}}
this.abort=function(){e.aborted=!0,n.forEach(function(n){return n()})}},fc=Gl.unstable_scheduleCallback,sc=Gl.unstable_NormalPriority,vc={$$typeof:uu,Consumer:null,Provider:null,i:null,v:null,F:0},dc=hu.S
hu.S=function(n,e){"object"==typeof e&&null!==e&&"function"==typeof e.then&&function(n,e){if(null===wa){var t=wa=[]
ga=0,ka=rn(),xa={status:"pending",value:void 0,then:function(n){t.push(n)}}}return ga++,e.then(ln,ln),e}(0,e),null!==dc&&dc(n,e)}
var pc=h(null),hc=!1,yc=!1,mc=!1,bc="function"==typeof WeakSet?WeakSet:Set,wc=null,gc=!1,kc=null,xc=!1,Sc=null,Ec=8192,Cc={getCacheForType:function(n){var e=Ot(vc),t=e.data.get(n)
return void 0===t&&(t=n(),e.data.set(n,t)),t}},Rc=0,Mc=1,Pc=2,Tc=3,jc=4
if("function"==typeof Symbol&&Symbol.for){var Fc=Symbol.for
Rc=Fc("selector.component"),Mc=Fc("selector.has_pseudo_class"),Pc=Fc("selector.role"),Tc=Fc("selector.test_id"),jc=Fc("selector.text")}var $c="function"==typeof WeakMap?WeakMap:Map,Ic=0,zc=null,Dc=null,Oc=0,Lc=0,Nc=null,Ac=!1,_c=!1,Uc=!1,Bc=0,Hc=0,qc=0,Vc=0,Wc=0,Yc=0,Jc=0,Gc=null,Qc=null,Kc=!1,Xc=0,Zc=1/0,nf=null,ef=null,tf=!1,rf=null,lf=0,uf=0,of=null,af=0,cf=null
return Yl.attemptContinuousHydration=function(n){if(13===n.tag){var e=J(n,67108864)
null!==e&&Kr(e,0,67108864),ql(n,67108864)}},Yl.attemptHydrationAtCurrentPriority=function(n){if(13===n.tag){var e=Gr(),t=J(n,e)
null!==t&&Kr(t,0,e),ql(n,e)}},Yl.attemptSynchronousHydration=function(n){switch(n.tag){case 3:if((n=n.stateNode).current.memoizedState.isDehydrated){var e=b(n.pendingLanes)
if(0!==e){for(n.pendingLanes|=2,n.entangledLanes|=2;e;){var t=1<<31-Ci(e)
n.entanglements[1]|=t,e&=~t}K(n),!(6&Ic)&&(Zc=zi()+500,X(0))}}break
case 13:null!==(e=J(n,2))&&Kr(e,0,2),rl(),ql(n,2)}},Yl.batchedUpdates=function(n,e){return n(e)},Yl.createComponentSelector=function(n){return{$$typeof:Rc,value:n}},Yl.createContainer=function(n,e,t,r,l,u,o,i,a,c){return Al(n,e,!1,null,0,r,u,o,i,a,0,null)},Yl.createHasPseudoClassSelector=function(n){return{$$typeof:Mc,value:n}},Yl.createHydrationContainer=function(n,e,t,r,l,u,o,i,a,c,f,s,v){return(n=Al(t,r,!0,n,0,u,i,a,c,f,0,v)).context=_l(null),t=n.current,(l=an(r=Gr())).callback=null!=e?e:null,cn(t,l,r),n.current.lanes=r,C(n,r),K(n),n},Yl.createPortal=function(n,e,t){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null
return{$$typeof:Zl,key:null==r?null:""+r,children:n,containerInfo:e,implementation:t}},Yl.createRoleSelector=function(n){return{$$typeof:Pc,value:n}},Yl.createTestNameSelector=function(n){return{$$typeof:Tc,value:n}},Yl.createTextSelector=function(n){return{$$typeof:jc,value:n}},Yl.defaultOnCaughtError=function(n){void 0},Yl.defaultOnRecoverableError=function(n){tc(n)},Yl.defaultOnUncaughtError=function(n){tc(n)},Yl.deferredUpdates=function(n){var e=hu.T,t=Uu()
try{return _u(32),hu.T=null,n()}finally{_u(t),hu.T=e}},Yl.discreteUpdates=function(n,e,t,r,l){var u=hu.T,o=Uu()
try{return _u(2),hu.T=null,n(e,t,r,l)}finally{_u(o),hu.T=u,0===Ic&&(Zc=zi()+500)}},Yl.findAllNodes=Jr,Yl.findBoundingRects=function(n,e){if(!eo)throw Error(r(363))
e=Jr(n,e),n=[]
for(var t=0;t<e.length;t++)n.push(ro(e[t]))
for(e=n.length-1;0<e;e--)for(var l=(t=n[e]).x,u=l+t.width,o=t.y,i=o+t.height,a=e-1;0<=a;a--)if(e!==a){var c=n[a],f=c.x,s=f+c.width,v=c.y,d=v+c.height
if(l>=f&&o>=v&&u<=s&&i<=d){n.splice(e,1)
break}if(!(l!==f||t.width!==c.width||d<o||v>i)){v>o&&(c.height+=v-o,c.y=o),d<i&&(c.height=i-v),n.splice(e,1)
break}if(!(o!==v||t.height!==c.height||s<l||f>u)){f>l&&(c.width+=f-l,c.x=l),s<u&&(c.width=u-f),n.splice(e,1)
break}}return n},Yl.findHostInstance=Ul,Yl.findHostInstanceWithNoPortals=function(n){return null===(n=null!==(n=v(n))?p(n):null)?null:ku(n.stateNode)},Yl.findHostInstanceWithWarning=function(n){return Ul(n)},Yl.flushPassiveEffects=kl,Yl.flushSyncFromReconciler=function(n){var e=Ic
Ic|=1
var t=hu.T,r=Uu()
try{if(_u(2),hu.T=null,n)return n()}finally{_u(r),hu.T=t,!(6&(Ic=e))&&X(0)}},Yl.flushSyncWork=rl,Yl.focusWithin=function(n,e){if(!eo)throw Error(r(363))
for(e=Yr(n=qr(n),e),e=Array.from(e),n=0;n<e.length;){var t=e[n++],l=t.tag
if(!uo(t)){if((5===l||26===l||27===l)&&io(t.stateNode))return!0
for(t=t.child;null!==t;)e.push(t),t=t.sibling}}return!1},Yl.getFindAllNodesFailureDescription=function(n,e){if(!eo)throw Error(r(363))
var t=0,l=[]
n=[qr(n),0]
for(var u=0;u<n.length;){var o=n[u++],i=o.tag,a=n[u++],c=e[a]
if((5!==i&&26!==i&&27!==i||!uo(o))&&(Vr(o,c)&&(l.push(Wr(c)),++a>t&&(t=a)),a<e.length))for(o=o.child;null!==o;)n.push(o,a),o=o.sibling}if(t<e.length){for(n=[];t<e.length;t++)n.push(Wr(e[t]))
return"findAllNodes was able to match part of the selector:\n  "+l.join(" > ")+"\n\nNo matching component was found for:\n  "+n.join(" > ")}return null},Yl.getPublicRootInstance=function(n){if(!(n=n.current).child)return null
switch(n.child.tag){case 27:case 5:return ku(n.child.stateNode)
default:return n.child.stateNode}},Yl.injectIntoDevTools=function(){var n={bundleType:0,version:bu,rendererPackageName:wu,currentDispatcherRef:hu,findFiberByHostInstance:Nu,reconcilerVersion:"19.0.0"}
if(null!==gu&&(n.rendererConfig=gu),"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)n=!1
else{var e=__REACT_DEVTOOLS_GLOBAL_HOOK__
if(e.isDisabled||!e.supportsFiber)n=!0
else{try{Ui=e.inject(n),Bi=e}catch(t){}n=!!e.checkDCE}}return n},Yl.isAlreadyRendering=function(){return!1},Yl.observeVisibleRects=function(n,e,t,l){if(!eo)throw Error(r(363))
n=Jr(n,e)
var u=ao(n,t,l).disconnect
return{disconnect:function(){u()}}},Yl.shouldError=function(){return null},Yl.shouldSuspend=function(){return!1},Yl.startHostTransition=function(n,e,l,u){if(5!==n.tag)throw Error(r(476))
var o=De(n).queue
ze(n,o,e,Qu,null===l?t:function(){var e=De(n).next.queue
return Be(n,e,{},Gr()),l(u)})},Yl.updateContainer=function(n,e,t,r){var l=e.current,u=Gr()
return Bl(l,u,n,e,t,r),u},Yl.updateContainerSync=function(n,e,t,r){return 0===e.tag&&kl(),Bl(e.current,2,n,e,t,r),2},Yl},n.exports.default=n.exports,Object.defineProperty(n.exports,"$",{value:!0})),ut.exports
var n}function L(n){let e=n.root
for(;e.getState().previousRoot;)e=e.getState().previousRoot
return e}function N(n){const e=Tn.useRef(n)
return yt(()=>{e.current=n},[n]),e}function A({set:n}){return yt(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}function _(n){var e
const t="undefined"!=typeof window?null!=(e=window.devicePixelRatio)?e:2:1
return Array.isArray(n)?Math.min(Math.max(n[0],t),n[1]):n}function U(n){var e
return null==(e=n.I)?void 0:e.root.getState()}function B(n){const e={}
for(const t in n)wt.includes(t)||(e[t]=n[t])
return e}function H(n,e,t,r){const l=n
let u=null==l?void 0:l.I
return u||(u={root:e,type:t,parent:null,children:[],props:B(r),object:l,eventCount:0,handlers:{},isHidden:!1},l&&(l.I=u)),u}function q(n,e){let t=n[e]
if(!e.includes("-"))return{root:n,key:e,target:t}
t=n
for(const l of e.split("-")){var r
e=l,n=t,t=null==(r=t)?void 0:r[e]}return{root:n,key:e,target:t}}function V(n,e){if(bt.str(e.props.attach)){if(gt.test(e.props.attach)){const t=e.props.attach.replace(gt,""),{root:r,key:l}=q(n.object,t)
Array.isArray(r[l])||(r[l]=[])}const{root:t,key:r}=q(n.object,e.props.attach)
e.previousAttach=t[r],t[r]=e.object}else bt.fun(e.props.attach)&&(e.previousAttach=e.props.attach(n.object,e.object))}function W(n,e){if(bt.str(e.props.attach)){const{root:t,key:r}=q(n.object,e.props.attach),l=e.previousAttach
void 0===l?delete t[r]:t[r]=l}else null==e.previousAttach?void 0:e.previousAttach(n.object,e.object)
delete e.previousAttach}function Y(n){let e=xt.get(n.constructor)
try{e||(e=new n.constructor,xt.set(n.constructor,e))}catch(lr){}return e}function J(n,e){var t
const r=n.I,l=r&&L(r).getState(),u=null==r?void 0:r.eventCount
for(const i in e){let t=e[i]
if(kt.includes(i))continue
if(r&&Et.test(i)){"function"==typeof t?r.handlers[i]=t:delete r.handlers[i],r.eventCount=Object.keys(r.handlers).length
continue}if(void 0===t)continue
let{root:u,key:a,target:c}=q(n,i)
if(c instanceof Qn&&t instanceof Qn)c.mask=t.mask
else if(c instanceof Kn&&ht(t))c.set(t)
else if(null!==c&&"object"==typeof c&&"function"==typeof c.set&&"function"==typeof c.copy&&null!=t&&t.constructor&&c.constructor===t.constructor)c.copy(t)
else if(null!==c&&"object"==typeof c&&"function"==typeof c.set&&Array.isArray(t))"function"==typeof c.fromArray?c.fromArray(t):c.set(...t)
else if(null!==c&&"object"==typeof c&&"function"==typeof c.set&&"number"==typeof t)"function"==typeof c.setScalar?c.setScalar(t):c.set(t)
else{var o
u[a]=t,l&&!l.linear&&St.includes(a)&&null!=(o=u[a])&&o.isTexture&&u[a].format===Xn&&u[a].type===Zn&&(u[a].colorSpace=Wn)}}if(null!=r&&r.parent&&null!=l&&l.internal&&null!=(t=r.object)&&t.isObject3D&&u!==r.eventCount){const n=r.object,e=l.internal.interaction.indexOf(n)
e>-1&&l.internal.interaction.splice(e,1),r.eventCount&&null!==n.raycast&&l.internal.interaction.push(n)}return r&&void 0===r.props.attach&&(r.object.isBufferGeometry?r.props.attach="geometry":r.object.isMaterial&&(r.props.attach="material")),r&&G(r),n}function G(n){var e
if(!n.parent)return
null==n.props.onUpdate?void 0:n.props.onUpdate(n.object)
const t=null==(e=n.root)||null==e.getState?void 0:e.getState()
t&&0===t.internal.frames&&t.invalidate()}function Q(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function K(n,e,t,r){const l=t.get(e)
l&&(t.delete(e),0===t.size&&(n.delete(r),l.target.releasePointerCapture(r)))}function X(){const n=Tn.useContext(Mt)
if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!")
return n}function Z(n=n=>n,e){return X()(n,e)}function nn(n,e=0){const t=X(),r=t.getState().internal.subscribe,l=N(n)
return yt(()=>r(l,e,t),[e,r,t]),null}function en(n){if("function"==typeof n){const e=""+Ft++
return Pt[e]=n,e}Object.assign(Pt,n)}function tn(n,e){const t=jt(n),r=Pt[t]
if("primitive"!==n&&!r)throw new Error(`R3F: ${t} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`)
if("primitive"===n&&!e.object)throw new Error("R3F: Primitives without 'object' are invalid!")
if(void 0!==e.args&&!Array.isArray(e.args))throw new Error("R3F: The args prop must be an array!")}function rn(n){var e
n.isHidden&&(n.props.attach&&null!=(e=n.parent)&&e.object?V(n.parent,n):Ct(n.object)&&!1!==n.props.visible&&(n.object.visible=!0),n.isHidden=!1,G(n))}function ln(n,e,t){const r=e.root.getState()
if(n.parent||n.object===r.scene){if(!e.object){var l,u
const n=Pt[jt(e.type)]
e.object=null!=(l=e.props.object)?l:new n(...null!=(u=e.props.args)?u:[]),e.object.I=e}if(J(e.object,e.props),e.props.attach)V(n,e)
else if(Ct(e.object)&&Ct(n.object)){const r=n.object.children.indexOf(null==t?void 0:t.object)
if(t&&-1!==r){const t=n.object.children.indexOf(e.object)
if(-1!==t){n.object.children.splice(t,1)
const l=t<r?r-1:r
n.object.children.splice(l,0,e.object)}else e.object.parent=n.object,n.object.children.splice(r,0,e.object),e.object.dispatchEvent({type:"added"}),n.object.dispatchEvent({type:"childadded",child:e.object})}else n.object.add(e.object)}for(const n of e.children)ln(e,n)
G(e)}}function un(n,e){e&&(e.parent=n,n.children.push(e),ln(n,e))}function on(n,e,t){if(!e||!t)return
e.parent=n
const r=n.children.indexOf(t);-1!==r?n.children.splice(r,0,e):n.children.push(e),ln(n,e,t)}function an(n){if("function"==typeof n.dispose){const e=()=>{try{n.dispose()}catch{}}
"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?e():dt.unstable_scheduleCallback(dt.unstable_IdlePriority,e)}}function cn(n,e,t){if(!e)return
e.parent=null
const r=n.children.indexOf(e);-1!==r&&n.children.splice(r,1),e.props.attach?W(n,e):Ct(e.object)&&Ct(n.object)&&(n.object.remove(e.object),function(n,e){const{internal:t}=n.getState()
t.interaction=t.interaction.filter(n=>n!==e),t.initialHits=t.initialHits.filter(n=>n!==e),t.hovered.forEach((n,r)=>{n.eventObject!==e&&n.object!==e||t.hovered.delete(r)}),t.capturedMap.forEach((n,r)=>{K(t.capturedMap,e,n,r)})}(L(e),e.object))
const l=null!==e.props.dispose&&!1!==t
for(let u=e.children.length-1;u>=0;u--)cn(e,e.children[u],l)
e.children.length=0,delete e.object.I,l&&"primitive"!==e.type&&"Scene"!==e.object.type&&an(e.object),void 0===t&&G(e)}function fn(n,e){for(const t of[n,n.alternate])if(null!==t)if("function"==typeof t.ref){null==t.refCleanup?void 0:t.refCleanup()
const n=t.ref(e)
"function"==typeof n&&(t.refCleanup=n)}else t.ref&&(t.ref.current=e)}function sn({store:n,children:e,onCreated:t,rootElement:r}){return yt(()=>{const e=n.getState()
e.set(n=>({internal:{...n.internal,active:!0}})),t&&t(e),n.getState().events.connected||null==e.events.connect||e.events.connect(r)},[]),Pn.jsx(Mt.Provider,{value:n,children:e})}function vn(n,e){const t=Lt.get(n),r=null==t?void 0:t.fiber
if(r){const e=null==t?void 0:t.store.getState()
e&&(e.internal.active=!1),Ot.updateContainer(null,r,null,()=>{e&&setTimeout(()=>{try{var t,r,l,u
null==e.events.disconnect?void 0:e.events.disconnect(),null==(t=e.gl)||null==(r=t.renderLists)||null==r.dispose||r.dispose(),null==(l=e.gl)||null==l.forceContextLoss||l.forceContextLoss(),null!=(u=e.gl)&&u.xr&&e.xr.disconnect(),function(n){"Scene"!==n.type&&(null==n.dispose?void 0:n.dispose())
for(const e in n){const t=n[e]
"Scene"!==(null==t?void 0:t.type)&&(null==t||null==t.dispose?void 0:t.dispose())}}(e.scene),Lt.delete(n)}catch(lr){}},500)})}}function dn(n,e){if(n.size)for(const{callback:t}of n.values())t(e)}function pn(n,e){switch(n){case"before":return dn(At,e)
case"after":return dn(_t,e)
case"tail":return dn(Ut,e)}}function hn(n,e,t){let r=e.clock.getDelta()
"never"===e.frameloop&&"number"==typeof n&&(r=n-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=n),Bt=e.internal.subscribers
for(let l=0;l<Bt.length;l++)Ht=Bt[l],Ht.ref.current(Ht.store.getState(),r,t)
return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),"always"===e.frameloop?1:e.internal.frames}function yn(n){Vt=requestAnimationFrame(yn),Yt=!0,qt=0,pn("before",n),Jt=!0
for(const t of Lt.values()){var e
Wt=t.store.getState(),!Wt.internal.active||!("always"===Wt.frameloop||Wt.internal.frames>0)||null!=(e=Wt.gl.xr)&&e.isPresenting||(qt+=hn(n,Wt))}if(Jt=!1,pn("after",n),0===qt)return pn("tail",n),Yt=!1,cancelAnimationFrame(Vt)}function mn(n,e=1){var t
if(!n)return Lt.forEach(n=>mn(n.store.getState(),e))
null!=(t=n.gl.xr)&&t.isPresenting||!n.internal.active||"never"===n.frameloop||(n.internal.frames=e>1?Math.min(60,n.internal.frames+e):Jt?2:1,Yt||(Yt=!0,requestAnimationFrame(yn)))}function bn(n,e=!0,t,r){if(e&&pn("before",n),t)hn(n,t,r)
else for(const l of Lt.values())hn(n,l.store.getState())
e&&pn("after",n)}function wn(n){const{handlePointer:e}=function(n){function e(n){return n.filter(n=>["Move","Over","Enter","Out","Leave"].some(e=>{var t
return null==(t=n.I)?void 0:t.handlers["onPointer"+e]}))}function t(e){const{internal:t}=n.getState()
for(const n of t.hovered.values())if(!e.length||!e.find(e=>e.object===n.object&&e.index===n.index&&e.instanceId===n.instanceId)){const r=n.eventObject.I
if(t.hovered.delete(Q(n)),null!=r&&r.eventCount){const t=r.handlers,l={...n,intersections:e}
null==t.onPointerOut?void 0:t.onPointerOut(l),null==t.onPointerLeave||t.onPointerLeave(l)}}}function r(n,e){for(let t=0;t<e.length;t++){const r=e[t].I
null==r||null==r.handlers.onPointerMissed?void 0:r.handlers.onPointerMissed(n)}}return{handlePointer:function(l){switch(l){case"onPointerLeave":case"onPointerCancel":return()=>t([])
case"onLostPointerCapture":return e=>{const{internal:r}=n.getState()
"pointerId"in e&&r.capturedMap.has(e.pointerId)&&requestAnimationFrame(()=>{r.capturedMap.has(e.pointerId)&&(r.capturedMap.delete(e.pointerId),t([]))})}}return function(u){const{onPointerMissed:o,internal:i}=n.getState()
i.lastEvent.current=u
const a="onPointerMove"===l,c="onClick"===l||"onContextMenu"===l||"onDoubleClick"===l,f=function(e,t){const r=n.getState(),l=new Set,u=[],o=t?t(r.internal.interaction):r.internal.interaction
for(let n=0;n<o.length;n++){const e=U(o[n])
e&&(e.raycaster.camera=void 0)}r.previousRoot||(null==r.events.compute?void 0:r.events.compute(e,r))
let i=o.flatMap(function(n){const t=U(n)
return t&&t.events.enabled&&null!==t.raycaster.camera?(void 0===t.raycaster.camera&&(null==t.events.compute?void 0:t.events.compute(e,t,null==(r=t.previousRoot)?void 0:r.getState()),void 0===t.raycaster.camera&&(t.raycaster.camera=null)),t.raycaster.camera?t.raycaster.intersectObject(n,!0):[]):[]
var r}).sort((n,e)=>{const t=U(n.object),r=U(e.object)
return t&&r&&r.events.priority-t.events.priority||n.distance-e.distance}).filter(n=>{const e=Q(n)
return!l.has(e)&&(l.add(e),!0)})
r.events.filter&&(i=r.events.filter(i,r))
for(const n of i){let e=n.object
for(;e;){var a
null!=(a=e.I)&&a.eventCount&&u.push({...n,eventObject:e}),e=e.parent}}if("pointerId"in e&&r.internal.capturedMap.has(e.pointerId))for(let n of r.internal.capturedMap.get(e.pointerId).values())l.has(Q(n.intersection))||u.push(n.intersection)
return u}(u,a?e:void 0),s=c?function(e){const{internal:t}=n.getState(),r=e.offsetX-t.initialClick[0],l=e.offsetY-t.initialClick[1]
return Math.round(Math.sqrt(r*r+l*l))}(u):0
"onPointerDown"===l&&(i.initialClick=[u.offsetX,u.offsetY],i.initialHits=f.map(n=>n.eventObject)),c&&!f.length&&s<=2&&(r(u,i.interaction),o&&o(u)),a&&t(f),function(n,e,r,l){if(n.length){const u={stopped:!1}
for(const o of n){let i=U(o.object)
if(i||o.object.traverseAncestors(n=>{const e=U(n)
if(e)return i=e,!1}),i){const{raycaster:a,pointer:c,camera:f,internal:s}=i,v=new ne(c.x,c.y,0).unproject(f),d=n=>{var e,t
return null!=(e=null==(t=s.capturedMap.get(n))?void 0:t.has(o.eventObject))&&e},p=n=>{const t={intersection:o,target:e.target}
s.capturedMap.has(n)?s.capturedMap.get(n).set(o.eventObject,t):s.capturedMap.set(n,new Map([[o.eventObject,t]])),e.target.setPointerCapture(n)},h=n=>{const e=s.capturedMap.get(n)
e&&K(s.capturedMap,o.eventObject,e,n)}
let y={}
for(let n in e){let t=e[n]
"function"!=typeof t&&(y[n]=t)}let m={...o,...y,pointer:c,intersections:n,stopped:u.stopped,delta:r,unprojectedPoint:v,ray:a.ray,camera:f,stopPropagation(){const r="pointerId"in e&&s.capturedMap.get(e.pointerId);(!r||r.has(o.eventObject))&&(m.stopped=u.stopped=!0,s.hovered.size&&Array.from(s.hovered.values()).find(n=>n.eventObject===o.eventObject))&&t([...n.slice(0,n.indexOf(o)),o])},target:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:h},currentTarget:{hasPointerCapture:d,setPointerCapture:p,releasePointerCapture:h},nativeEvent:e}
if(l(m),!0===u.stopped)break}}}}(f,u,s,function(n){const e=n.eventObject,t=e.I
if(null==t||!t.eventCount)return
const o=t.handlers
if(a){if(o.onPointerOver||o.onPointerEnter||o.onPointerOut||o.onPointerLeave){const e=Q(n),t=i.hovered.get(e)
t?t.stopped&&n.stopPropagation():(i.hovered.set(e,n),null==o.onPointerOver||o.onPointerOver(n),null==o.onPointerEnter||o.onPointerEnter(n))}null==o.onPointerMove?void 0:o.onPointerMove(n)}else{const t=o[l]
t?c&&!i.initialHits.includes(e)||(r(u,i.interaction.filter(n=>!i.initialHits.includes(n))),t(n)):c&&i.initialHits.includes(e)&&r(u,i.interaction.filter(n=>!i.initialHits.includes(n)))}})}}}}(n)
return{priority:1,enabled:!0,compute(n,e,t){e.pointer.set(n.offsetX/e.size.width*2-1,-n.offsetY/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)},connected:void 0,handlers:Object.keys(Gt).reduce((n,t)=>({...n,[t]:e(t)}),{}),update:()=>{var e
const{events:t,internal:r}=n.getState()
null!=(e=r.lastEvent)&&e.current&&t.handlers&&t.handlers.onPointerMove(r.lastEvent.current)},connect:e=>{const{set:t,events:r}=n.getState()
if(null==r.disconnect?void 0:r.disconnect(),t(n=>({events:{...n.events,connected:e}})),r.handlers)for(const n in r.handlers){const t=r.handlers[n],[l,u]=Gt[n]
e.addEventListener(l,t,{passive:u})}},disconnect:()=>{const{set:e,events:t}=n.getState()
if(t.connected){if(t.handlers)for(const n in t.handlers){const e=t.handlers[n],[r]=Gt[n]
t.connected.removeEventListener(r,e)}e(n=>({events:{...n.events,connected:void 0}}))}}}}function gn(n,e){let t
return(...r)=>{window.clearTimeout(t),t=window.setTimeout(()=>n(...r),e)}}function kn({debounce:n,scroll:e,polyfill:t,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){function l(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(n=>n.removeEventListener("scroll",h,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function u(){c.current.element&&(c.current.resizeObserver=new o(h),c.current.resizeObserver.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(n=>n.addEventListener("scroll",h,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{h()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const o=t||("undefined"==typeof window?class{}:window.ResizeObserver)
if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills")
const[i,a]=Tn.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),c=Tn.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:i,orientationHandler:null}),f=n?"number"==typeof n?n:n.scroll:null,s=n?"number"==typeof n?n:n.resize:null,v=Tn.useRef(!1)
Tn.useEffect(()=>(v.current=!0,()=>{v.current=!1}))
const[d,p,h]=Tn.useMemo(()=>{const n=()=>{if(!c.current.element)return
const{left:n,top:e,width:t,height:l,bottom:u,right:o,x:i,y:f}=c.current.element.getBoundingClientRect(),s={left:n,top:e,width:t,height:l,bottom:u,right:o,x:i,y:f}
c.current.element instanceof HTMLElement&&r&&(s.height=c.current.element.offsetHeight,s.width=c.current.element.offsetWidth),Object.freeze(s),v.current&&!Kt(c.current.lastBounds,s)&&a(c.current.lastBounds=s)}
return[n,s?gn(n,s):n,f?gn(n,f):n]},[a,r,f,s])
return function(n,e){Tn.useEffect(()=>{if(e){const e=n
return window.addEventListener("scroll",e,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",e,!0)}}},[n,e])}(h,!!e),function(n){Tn.useEffect(()=>{const e=n
return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n])}(p),Tn.useEffect(()=>{l(),u()},[e,h,p]),Tn.useEffect(()=>l,[]),[n=>{!n||n===c.current.element||(l(),c.current.element=n,c.current.scrollContainers=xn(n),u())},i,d]}function xn(n){const e=[]
if(!n||n===document.body)return e
const{overflow:t,overflowX:r,overflowY:l}=window.getComputedStyle(n)
return[t,r,l].some(n=>"auto"===n||"scroll"===n)&&e.push(n),[...e,...xn(n.parentElement)]}function Sn({ref:n,children:e,fallback:t,resize:r,style:l,gl:u,events:o=wn,eventSource:i,eventPrefix:a,shadows:c,linear:f,flat:s,legacy:v,orthographic:d,frameloop:p,dpr:h,performance:y,raycaster:m,camera:b,scene:w,onPointerMissed:g,onCreated:k,...x}){Tn.useMemo(()=>en(le),[])
const S=function(){const n=$n(),e=In()
return Tn.useMemo(()=>({children:t})=>{const r=zn(n,!0,n=>n.type===Tn.StrictMode)?Tn.StrictMode:Tn.Fragment
return Pn.jsx(r,{children:Pn.jsx(e,{children:t})})},[n,e])}(),[E,C]=kn({scroll:!0,debounce:{scroll:50,resize:0},...r}),R=Tn.useRef(null),M=Tn.useRef(null)
Tn.useImperativeHandle(n,()=>R.current)
const P=N(g),[T,j]=Tn.useState(!1),[F,$]=Tn.useState(!1)
if(T)throw T
if(F)throw F
const I=Tn.useRef(null)
yt(()=>{const n=R.current
if(C.width>0&&C.height>0&&n){async function t(){await I.current.configure({gl:u,scene:w,events:o,shadows:c,linear:f,flat:s,legacy:v,orthographic:d,frameloop:p,dpr:h,performance:y,raycaster:m,camera:b,size:C,onPointerMissed:(...n)=>null==P.current?void 0:P.current(...n),onCreated:n=>{var e
null==n.events.connect?void 0:n.events.connect(i?(e=i)&&e.hasOwnProperty("current")?i.current:i:M.current),a&&n.setEvents({compute:(n,e)=>{const t=n[a+"X"],r=n[a+"Y"]
e.pointer.set(t/e.size.width*2-1,-r/e.size.height*2+1),e.raycaster.setFromCamera(e.pointer,e.camera)}}),null==k||k(n)}}),I.current.render(Pn.jsx(S,{children:Pn.jsx(mt,{set:$,children:Pn.jsx(Tn.Suspense,{fallback:Pn.jsx(A,{set:j}),children:null!=e?e:null})})}))}I.current||(I.current=function(n){const e=Lt.get(n),t=null==e?void 0:e.fiber,r=null==e?void 0:e.store
e,0
const l="function"==typeof reportError?reportError:console.error,u=r||((n,e)=>{const t=Gn((t,r)=>{function l(n=r().camera,e=o,t=r().size){const{width:l,height:a,top:c,left:f}=t,s=l/a
e.isVector3?i.copy(e):i.set(...e)
const v=n.getWorldPosition(u).distanceTo(i)
if(pt(n))return{width:l/n.zoom,height:a/n.zoom,top:c,left:f,factor:1,distance:v,aspect:s}
{const e=n.fov*Math.PI/180,t=2*Math.tan(e/2)*v,r=t*(l/a)
return{width:r,height:t,top:c,left:f,factor:l/r,distance:v,aspect:s}}}const u=new ne,o=new ne,i=new ne
let a
const c=n=>t(e=>({performance:{...e.performance,current:n}})),f=new ee,s={set:t,get:r,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(e=1)=>n(r(),e),advance:(n,t)=>e(n,t,r()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new te,pointer:f,mouse:f,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const n=r()
a&&clearTimeout(a),n.performance.current!==n.performance.min&&c(n.performance.min),a=setTimeout(()=>c(r().performance.max),n.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:l},setEvents:n=>t(e=>({...e,events:{...e.events,...n}})),setSize:(n,e,u=0,i=0)=>{const a=r().camera,c={width:n,height:e,top:u,left:i}
t(n=>({size:c,viewport:{...n.viewport,...l(a,o,c)}}))},setDpr:n=>t(e=>{const t=_(n)
return{viewport:{...e.viewport,dpr:t,initialDpr:e.viewport.initialDpr||t}}}),setFrameloop:(n="always")=>{const e=r().clock
e.stop(),e.elapsedTime=0,"never"!==n&&(e.start(),e.elapsedTime=0),t(()=>({frameloop:n}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:Tn.createRef(),active:!1,frames:0,priority:0,subscribe:(n,e,t)=>{const l=r().internal
return l.priority=l.priority+(e>0?1:0),l.subscribers.push({ref:n,priority:e,store:t}),l.subscribers=l.subscribers.sort((n,e)=>n.priority-e.priority),()=>{const t=r().internal
null!=t&&t.subscribers&&(t.priority=t.priority-(e>0?1:0),t.subscribers=t.subscribers.filter(e=>e.ref!==n))}}}}
return s}),r=t.getState()
let l=r.size,u=r.viewport.dpr,o=r.camera
return t.subscribe(()=>{const{camera:n,size:e,viewport:r,gl:i,set:a}=t.getState()
if(e.width!==l.width||e.height!==l.height||r.dpr!==u){l=e,u=r.dpr,function(n,e){n.manual||(pt(n)?(n.left=e.width/-2,n.right=e.width/2,n.top=e.height/2,n.bottom=e.height/-2):n.aspect=e.width/e.height,n.updateProjectionMatrix())}(n,e),r.dpr>0&&i.setPixelRatio(r.dpr)
const t="undefined"!=typeof HTMLCanvasElement&&i.domElement instanceof HTMLCanvasElement
i.setSize(e.width,e.height,t)}n!==o&&(o=n,a(e=>({viewport:{...e.viewport,...e.viewport.getCurrentViewport(n)}})))}),t.subscribe(e=>n(e)),t})(mn,bn),o=t||Ot.createContainer(u,rt.ConcurrentRoot,null,!1,null,"",l,l,l,null)
let i,a
e||Lt.set(n,{fiber:o,store:u})
let c=!1,f=null
return{async configure(e={}){let t
f=new Promise(n=>t=n)
let{gl:r,size:l,scene:o,events:s,onCreated:v,shadows:d=!1,linear:p=!1,flat:h=!1,legacy:y=!1,orthographic:m=!1,frameloop:b="always",dpr:w=[1,2],performance:g,raycaster:k,camera:x,onPointerMissed:S}=e,E=u.getState(),C=E.gl
if(!E.gl){const e={canvas:n,powerPreference:"high-performance",antialias:!0,alpha:!0},t="function"==typeof r?await r(e):r
C=Rt(t)?t:new Dn({...e,...r}),E.set({gl:C})}let R=E.raycaster
R||E.set({raycaster:R=new On})
const{params:M,...P}=k||{}
if(bt.equ(P,R,Nt)||J(R,{...P}),bt.equ(M,R.params,Nt)||J(R,{params:{...R.params,...M}}),!E.camera||E.camera===a&&!bt.equ(a,x,Nt)){a=x
const n=null==x?void 0:x.isCamera,e=n?x:m?new Ln(0,0,0,0,.1,1e3):new Nn(75,0,.1,1e3)
n||(e.position.z=5,x&&(J(e,x),e.manual||("aspect"in x||"left"in x||"right"in x||"bottom"in x||"top"in x)&&(e.manual=!0,e.updateProjectionMatrix())),E.camera||null!=x&&x.rotation||e.lookAt(0,0,0)),E.set({camera:e}),R.camera=e}if(!E.scene){let n
null!=o&&o.isScene?(n=o,H(n,u,"",{})):(n=new An,H(n,u,"",{}),o&&J(n,o)),E.set({scene:n})}s&&!E.events.handlers&&E.set({events:s(u)})
const T=function(n,e){if(!e&&"undefined"!=typeof HTMLCanvasElement&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:e,height:t,top:r,left:l}=n.parentElement.getBoundingClientRect()
return{width:e,height:t,top:r,left:l}}return!e&&"undefined"!=typeof OffscreenCanvas&&n instanceof OffscreenCanvas?{width:n.width,height:n.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...e}}(n,l)
if(bt.equ(T,E.size,Nt)||E.setSize(T.width,T.height,T.top,T.left),w&&E.viewport.dpr!==_(w)&&E.setDpr(w),E.frameloop!==b&&E.setFrameloop(b),E.onPointerMissed||E.set({onPointerMissed:S}),g&&!bt.equ(g,E.performance,Nt)&&E.set(n=>({performance:{...n.performance,...g}})),!E.xr){var j
const n=(n,e)=>{const t=u.getState()
"never"!==t.frameloop&&bn(n,!0,t,e)},e=()=>{const e=u.getState()
e.gl.xr.enabled=e.gl.xr.isPresenting,e.gl.xr.setAnimationLoop(e.gl.xr.isPresenting?n:null),e.gl.xr.isPresenting||mn(e)},t={connect(){const n=u.getState().gl
n.xr.addEventListener("sessionstart",e),n.xr.addEventListener("sessionend",e)},disconnect(){const n=u.getState().gl
n.xr.removeEventListener("sessionstart",e),n.xr.removeEventListener("sessionend",e)}}
"function"==typeof(null==(j=C.xr)?void 0:j.addEventListener)&&t.connect(),E.set({xr:t})}if(C.shadowMap){const n=C.shadowMap.enabled,e=C.shadowMap.type
if(C.shadowMap.enabled=!!d,bt.boo(d))C.shadowMap.type=_n
else if(bt.str(d)){var F
const n={basic:Hn,percentage:Bn,soft:_n,variance:Un}
C.shadowMap.type=null!=(F=n[d])?F:_n}else bt.obj(d)&&Object.assign(C.shadowMap,d)
n===C.shadowMap.enabled&&e===C.shadowMap.type||(C.shadowMap.needsUpdate=!0)}return qn.enabled=!y,c||(C.outputColorSpace=p?Vn:Wn,C.toneMapping=h?Yn:Jn),E.legacy!==y&&E.set(()=>({legacy:y})),E.linear!==p&&E.set(()=>({linear:p})),E.flat!==h&&E.set(()=>({flat:h})),!r||bt.fun(r)||Rt(r)||bt.equ(r,C,Nt)||J(C,r),i=v,c=!0,t(),this},render(e){return c||f||this.configure(),f.then(()=>{Ot.updateContainer(Pn.jsx(sn,{store:u,children:e,onCreated:i,rootElement:n}),o,null,()=>{})}),u},unmount(){vn(n)}}}(n)),t()}}),Tn.useEffect(()=>{const n=R.current
if(n)return()=>vn(n)},[])
const z=i?"none":"auto"
return Pn.jsx("div",{ref:M,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:z,...l},...x,children:Pn.jsx("div",{ref:E,style:{width:"100%",height:"100%"},children:Pn.jsx("canvas",{ref:R,style:{display:"block"},children:t})})})}function En(n){return Pn.jsx(re,{children:Pn.jsx(Sn,{...n})})}function Cn({waveSpeed:n,waveFrequency:e,waveAmplitude:t,waveColor:r,colorNum:l,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a}){const c=Tn.useRef(null),f=Tn.useRef(new ee),{viewport:s,size:v,gl:d}=Z(),p=Tn.useRef({time:new pe(0),resolution:new pe(new ee(0,0)),waveSpeed:new pe(n),waveFrequency:new pe(e),waveAmplitude:new pe(t),waveColor:new pe(new Kn(...r)),mousePos:new pe(new ee(0,0)),enableMouseInteraction:new pe(i?1:0),mouseRadius:new pe(a)})
Tn.useEffect(()=>{const n=d.getPixelRatio(),e=Math.floor(v.width*n),t=Math.floor(v.height*n),r=p.current.resolution.value
r.x===e&&r.y===t||r.set(e,t)},[v,d])
const h=Tn.useRef([...r])
return nn(({clock:l})=>{const u=p.current
o||(u.time.value=l.getElapsedTime()),u.waveSpeed.value!==n&&(u.waveSpeed.value=n),u.waveFrequency.value!==e&&(u.waveFrequency.value=e),u.waveAmplitude.value!==t&&(u.waveAmplitude.value=t),h.current.every((n,e)=>n===r[e])||(u.waveColor.value.set(...r),h.current=[...r]),u.enableMouseInteraction.value=i?1:0,u.mouseRadius.value=a,i&&u.mousePos.value.copy(f.current)}),Pn.jsxs(Pn.Fragment,{children:[Pn.jsxs("mesh",{ref:c,scale:[s.width,s.height,1],children:[Pn.jsx("planeGeometry",{args:[1,1]}),Pn.jsx("shaderMaterial",{vertexShader:"\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n",fragmentShader:"\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n",uniforms:p.current})]}),Pn.jsx(nr,{children:Pn.jsx(ur,{colorNum:l,pixelSize:u})}),Pn.jsxs("mesh",{onPointerMove:n=>{if(!i)return
const e=d.domElement.getBoundingClientRect(),t=d.getPixelRatio()
f.current.set((n.clientX-e.left)*t,(n.clientY-e.top)*t)},position:[0,0,.01],scale:[s.width,s.height,1],visible:!1,children:[Pn.jsx("planeGeometry",{args:[1,1]}),Pn.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function Rn({waveSpeed:n=.05,waveFrequency:e=3,waveAmplitude:t=.3,waveColor:r=[.5,.5,.5],colorNum:l=4,pixelSize:u=2,disableAnimation:o=!1,enableMouseInteraction:i=!0,mouseRadius:a=1}){return Pn.jsx(En,{className:"dither-container",camera:{position:[0,0,6]},dpr:1,gl:{antialias:!0,preserveDrawingBuffer:!0},children:Pn.jsx(Cn,{waveSpeed:n,waveFrequency:e,waveAmplitude:t,waveColor:r,colorNum:l,pixelSize:u,disableAnimation:o,enableMouseInteraction:i,mouseRadius:a})})}function Mn(){const n=b(),[e,t]=Tn.useState(10),[r,l]=Tn.useState(!1)
return Tn.useEffect(()=>{const n=setTimeout(()=>{l(!0)},3e3)
return()=>clearTimeout(n)},[]),Tn.useEffect(()=>{if(!r)return
const e=setInterval(()=>{t(e=>e<=1?(n("/"),0):e-1)},1e3)
return()=>clearInterval(e)},[r,n]),Pn.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif"},children:[Pn.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:Pn.jsx(Rn,{waveColor:[.3,.3,.4],disableAnimation:!1,enableMouseInteraction:!0,mouseRadius:.4,colorNum:6,waveAmplitude:.2,waveFrequency:2,waveSpeed:.03,pixelSize:3})}),Pn.jsx("div",{style:{position:"relative",zIndex:2,textAlign:"center",padding:"40px",maxWidth:"600px",width:"100%"},children:Pn.jsxs("div",{style:{background:"rgba(22, 22, 22, 0.85)",border:"1px solid rgba(56, 56, 56, 0.4)",borderRadius:"24px",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",padding:"48px 32px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",animation:"fadeInUp 0.8s ease-out forwards",opacity:0},children:[Pn.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 8rem)",fontWeight:"800",color:"#FFFFFF",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",background:"linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"glitch 2s infinite alternate"},children:"404"}),Pn.jsx("h2",{style:{fontSize:"clamp(1.5rem, 4vw, 2.5rem)",fontWeight:"600",color:"#FFFFFF",margin:"0 0 24px 0",lineHeight:"1.2",opacity:0,animation:"fadeInUp 0.8s ease-out 0.3s forwards"},children:"Page Not Found"}),Pn.jsxs("p",{style:{fontSize:"clamp(1rem, 2.5vw, 1.25rem)",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 40px 0",lineHeight:"1.6",opacity:0,animation:"fadeInUp 0.8s ease-out 0.6s forwards"},children:["The page you're looking for doesn't exist or has been moved.",Pn.jsx("br",{}),"Let's get you back to where the music lives."]}),Pn.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center",opacity:0,animation:"fadeInUp 0.8s ease-out 0.9s forwards"},children:[Pn.jsx("button",{onClick:()=>{n("/")},style:{background:"linear-gradient(135deg, #319DFF 0%, #1E88E5 100%)",border:"none",borderRadius:"12px",padding:"16px 32px",fontSize:"1.1rem",fontWeight:"600",color:"#FFFFFF",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",boxShadow:"0 4px 16px rgba(49, 157, 255, 0.3)",minWidth:"200px",fontFamily:"inherit"},onMouseEnter:n=>{n.target.style.transform="translateY(-2px)",n.target.style.boxShadow="0 8px 24px rgba(49, 157, 255, 0.4)"},onMouseLeave:n=>{n.target.style.transform="translateY(0)",n.target.style.boxShadow="0 4px 16px rgba(49, 157, 255, 0.3)"},children:"Take Me Home"}),r&&Pn.jsxs("p",{style:{fontSize:"0.9rem",color:"rgba(255, 255, 255, 0.6)",margin:"16px 0 0 0",animation:"fadeIn 0.5s ease-out forwards"},children:["Redirecting automatically in ",e," seconds..."]})]})]})}),Pn.jsx("style",{children:"\n        @keyframes fadeInUp {\n          from {\n            opacity: 0;\n            transform: translateY(30px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n\n        @keyframes fadeIn {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n\n        @keyframes glitch {\n          0% {\n            text-shadow: 0 0 0 transparent;\n          }\n          2% {\n            text-shadow: 2px 0 0 #ff0000, -2px 0 0 #00ffff;\n          }\n          4% {\n            text-shadow: 0 0 0 transparent;\n          }\n          100% {\n            text-shadow: 0 0 0 transparent;\n          }\n        }\n\n        /* Responsive Design */\n        @media (max-width: 768px) {\n          .dither-container {\n            height: 100vh;\n            height: 100dvh; /* Dynamic viewport height for mobile */\n          }\n        }\n\n        /* Accessibility - Respect reduced motion preference */\n        @media (prefers-reduced-motion: reduce) {\n          * {\n            animation-duration: 0.01ms !important;\n            animation-iteration-count: 1 !important;\n            transition-duration: 0.01ms !important;\n          }\n        }\n      "})]})}import{j as Pn}from"./index-CGE5HKyT.js"
import{b as Tn,r as jn,g as Fn,c as $n,x as In,d as zn,W as Dn,R as On,O as Ln,P as Nn,S as An,f as _n,V as Un,h as Bn,B as Hn,C as qn,L as Vn,j as Wn,N as Yn,A as Jn,k as Gn,l as Qn,m as Kn,n as Xn,U as Zn,o as ne,p as ee,q as te,t as re,T as le,E as ue,H as oe,u as ie,v as ae,D as ce,w as fe,y as se,e as ve,z as de,F as pe}from"./vendor-_Vo_0Rls.js"
var he=/^:[\w-]+$/,ye=3,me=2,be=1,we=10,ge=-2,ke=n=>"*"===n,xe=n=>n.join("/").replace(/\/\/+/g,"/"),Se=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),Ee=n=>n&&"?"!==n?n.startsWith("?")?n:"?"+n:"",Ce=n=>n&&"#"!==n?n.startsWith("#")?n:"#"+n:"",Re=["POST","PUT","PATCH","DELETE"]
new Set(Re)
var Me=["GET",...Re]
new Set(Me)
var Pe=Tn.createContext(null)
Pe.displayName="DataRouter"
var Te=Tn.createContext(null)
Te.displayName="DataRouterState",Tn.createContext(!1)
var je=Tn.createContext({isTransitioning:!1})
je.displayName="ViewTransition",Tn.createContext(new Map).displayName="Fetchers",Tn.createContext(null).displayName="Await"
var Fe=Tn.createContext(null)
Fe.displayName="Navigation"
var $e=Tn.createContext(null)
$e.displayName="Location"
var Ie=Tn.createContext({outlet:null,matches:[],isDataRoute:!1})
Ie.displayName="Route"
var ze=Tn.createContext(null)
ze.displayName="RouteError"
var De="You should call navigate() in a React.useEffect(), not when your component is first rendered."
Tn.createContext(null)
var Oe=Tn.createElement(function(){let e=function(){let e=Tn.useContext(ze),t=function(){let e=Tn.useContext(Te)
return n(e,k("useRouteError")),e}(),r=x("useRouteError")
return void 0!==e?e:t.errors?.[r]}(),t=function(n){return null!=n&&"number"==typeof n.status&&"string"==typeof n.statusText&&"boolean"==typeof n.internal&&"data"in n}(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,l="rgba(200,200,200, 0.5)",u={padding:"0.5rem",backgroundColor:l},o={padding:"2px 4px",backgroundColor:l},i=null
return void 0,i=Tn.createElement(Tn.Fragment,null,Tn.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),Tn.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",Tn.createElement("code",{style:o},"ErrorBoundary")," or"," ",Tn.createElement("code",{style:o},"errorElement")," prop on your route.")),Tn.createElement(Tn.Fragment,null,Tn.createElement("h2",null,"Unexpected Application Error!"),Tn.createElement("h3",{style:{fontStyle:"italic"}},t),r?Tn.createElement("pre",{style:u},r):null,i)},null),Le=class extends Tn.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,e){return e.location!==n.location||"idle"!==e.revalidation&&"idle"===n.revalidation?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:void 0!==n.error?n.error:e.error,location:e.location,revalidation:n.revalidation||e.revalidation}}componentDidCatch(n,e){void 0}render(){return void 0!==this.state.error?Tn.createElement(Ie.Provider,{value:this.props.routeContext},Tn.createElement(ze.Provider,{value:this.state.error,children:this.props.component})):this.props.children}},Ne={}
Tn.memo(function({routes:t,future:r,state:u}){return function(t,r,u){n(h(),"useRoutes() may be used only in the context of a <Router> component.")
let o,{navigator:i}=Tn.useContext(Fe),{matches:a}=Tn.useContext(Ie),c=a[a.length-1],f=c?c.params:{},s=c?c.pathname:"/",v=c?c.pathnameBase:"/",d=c&&c.route
{let n=d&&d.path||""
S(s,!d||n.endsWith("*")||n.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${n}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${n}"> to <Route path="${"/"===n?"*":`${n}/*`}">.`)}o=y()
let p=o.pathname||"/",m=p
if("/"!==v){let n=v.replace(/^\//,"").split("/")
m="/"+p.replace(/^\//,"").split("/").slice(n.length).join("/")}let b=l(t,{pathname:m})
return e(d||null!=b,`No routes matched location "${o.pathname}${o.search}${o.hash}" `),e(null==b||void 0!==b[b.length-1].route.element||void 0!==b[b.length-1].route.Component||void 0!==b[b.length-1].route.lazy,`Matched leaf route at location "${o.pathname}${o.search}${o.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),function(e,t=[],r=null){if(null==e){if(!r)return null
if(r.errors)e=r.matches
else{if(0!==t.length||r.initialized||!(r.matches.length>0))return null
e=r.matches}}let l=e,u=r?.errors
if(null!=u){let e=l.findIndex(n=>n.route.id&&void 0!==u?.[n.route.id])
n(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,e+1))}let o=!1,i=-1
if(r)for(let n=0;n<l.length;n++){let e=l[n]
if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(i=n),e.route.id){let{loaderData:n,errors:t}=r,u=e.route.loader&&!n.hasOwnProperty(e.route.id)&&(!t||void 0===t[e.route.id])
if(e.route.lazy||u){o=!0,l=i>=0?l.slice(0,i+1):[l[0]]
break}}}return l.reduceRight((n,e,a)=>{let c,f=!1,s=null,v=null
r&&(c=u&&e.route.id?u[e.route.id]:void 0,s=e.route.errorElement||Oe,o&&(i<0&&0===a?(S("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,v=null):i===a&&(f=!0,v=e.route.hydrateFallbackElement||null)))
let d=t.concat(l.slice(0,a+1)),p=()=>{let t
return t=c?s:f?v:e.route.Component?Tn.createElement(e.route.Component,null):e.route.element?e.route.element:n,Tn.createElement(g,{match:e,routeContext:{outlet:n,matches:d,isDataRoute:null!=r},children:t})}
return r&&(e.route.ErrorBoundary||e.route.errorElement||0===a)?Tn.createElement(Le,{location:r.location,revalidation:r.revalidation,component:s,error:c,children:p(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):p()},null)}(b&&b.map(n=>Object.assign({},n,{params:Object.assign({},f,n.params),pathname:xe([v,i.encodeLocation?i.encodeLocation(n.pathname).pathname:n.pathname]),pathnameBase:"/"===n.pathnameBase?v:xe([v,i.encodeLocation?i.encodeLocation(n.pathnameBase).pathname:n.pathnameBase])})),a,u)}(t,0,u)})
var Ae="get",_e="application/x-www-form-urlencoded",Ue=null,Be=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"])
Object.getOwnPropertyNames(Object.prototype).sort().join("\0")
var He=Tn.createContext(void 0)
He.displayName="FrameworkContext"
var qe="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement
try{qe&&(window.__reactRouterVersion="7.8.0")}catch(lr){}var Ve=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,We=Tn.forwardRef(function({onClick:r,discover:l="render",prefetch:u="none",relative:o,reloadDocument:i,replace:a,state:c,target:f,to:v,preventScrollReset:d,viewTransition:p,...m},g){let k,{basename:x}=Tn.useContext(Fe),S="string"==typeof v&&Ve.test(v),E=!1
if("string"==typeof v&&S&&(k=v,qe))try{let n=new URL(window.location.href),e=v.startsWith("//")?new URL(n.protocol+v):new URL(v),t=s(e.pathname,x)
e.origin===n.origin&&null!=t?v=t+e.search+e.hash:E=!0}catch(lr){e(!1,`<Link to="${v}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let C=function(e,{relative:t}={}){n(h(),"useHref() may be used only in the context of a <Router> component.")
let{basename:r,navigator:l}=Tn.useContext(Fe),{hash:u,pathname:o,search:i}=w(e,{relative:t}),a=o
return"/"!==r&&(a="/"===o?r:xe([r,o])),l.createHref({pathname:a,search:i,hash:u})}(v,{relative:o}),[R,M,P]=function(n,e){let t=Tn.useContext(He),[r,l]=Tn.useState(!1),[u,o]=Tn.useState(!1),{onFocus:i,onBlur:a,onMouseEnter:c,onMouseLeave:f,onTouchStart:s}=e,v=Tn.useRef(null)
Tn.useEffect(()=>{if("render"===n&&o(!0),"viewport"===n){let n=new IntersectionObserver(n=>{n.forEach(n=>{o(n.isIntersecting)})},{threshold:.5})
return v.current&&n.observe(v.current),()=>{n.disconnect()}}},[n]),Tn.useEffect(()=>{if(r){let n=setTimeout(()=>{o(!0)},100)
return()=>{clearTimeout(n)}}},[r])
let d=()=>{l(!0)},p=()=>{l(!1),o(!1)}
return t?"intent"!==n?[u,v,{}]:[u,v,{onFocus:F(i,d),onBlur:F(a,p),onMouseEnter:F(c,d),onMouseLeave:F(f,p),onTouchStart:F(s,d)}]:[!1,v,{}]}(u,m),T=function(n,{target:e,replace:r,state:l,preventScrollReset:u,relative:o,viewTransition:i}={}){let a=b(),c=y(),f=w(n,{relative:o})
return Tn.useCallback(s=>{if(function(n,e){return!(0!==n.button||e&&"_self"!==e||function(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}(n))}(s,e)){s.preventDefault()
let e=void 0!==r?r:t(c)===t(f)
a(n,{replace:e,state:l,preventScrollReset:u,relative:o,viewTransition:i})}},[c,a,f,r,l,e,n,u,o,i])}(v,{replace:a,state:c,target:f,preventScrollReset:d,relative:o,viewTransition:p}),j=Tn.createElement("a",{...m,...P,href:k||C,onClick:E||i?r:function(n){r&&r(n),n.defaultPrevented||T(n)},ref:z(g,M),target:f,"data-discover":S||"render"!==l?void 0:"true"})
return R&&!S?Tn.createElement(Tn.Fragment,null,j,Tn.createElement($,{page:C})):j})
We.displayName="Link",Tn.forwardRef(function({"aria-current":e="page",caseSensitive:t=!1,className:r="",end:l=!1,style:u,to:o,viewTransition:i,children:a,...f},v){let d=w(o,{relative:f.relative}),p=y(),h=Tn.useContext(Te),{navigator:m,basename:b}=Tn.useContext(Fe),g=null!=h&&function(e,{relative:t}={}){let r=Tn.useContext(je)
n(null!=r,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?")
let{basename:l}=D("useViewTransitionState"),u=w(e,{relative:t})
if(!r.isTransitioning)return!1
let o=s(r.currentLocation.pathname,l)||r.currentLocation.pathname,i=s(r.nextLocation.pathname,l)||r.nextLocation.pathname
return null!=c(u.pathname,i)||null!=c(u.pathname,o)}(d)&&!0===i,k=m.encodeLocation?m.encodeLocation(d).pathname:d.pathname,x=p.pathname,S=h&&h.navigation&&h.navigation.location?h.navigation.location.pathname:null
t||(x=x.toLowerCase(),S=S?S.toLowerCase():null,k=k.toLowerCase()),S&&b&&(S=s(S,b)||S)
const E="/"!==k&&k.endsWith("/")?k.length-1:k.length
let C,R=x===k||!l&&x.startsWith(k)&&"/"===x.charAt(E),M=null!=S&&(S===k||!l&&S.startsWith(k)&&"/"===S.charAt(k.length)),P={isActive:R,isPending:M,isTransitioning:g},T=R?e:void 0
C="function"==typeof r?r(P):[r,R?"active":null,M?"pending":null,g?"transitioning":null].filter(Boolean).join(" ")
let j="function"==typeof u?u(P):u
return Tn.createElement(We,{...f,"aria-current":T,className:C,ref:v,style:j,to:o,viewTransition:i},"function"==typeof a?a(P):a)}).displayName="NavLink",Tn.forwardRef(({discover:e="render",fetcherKey:r,navigate:l,reloadDocument:u,replace:o,state:i,method:a=Ae,action:c,onSubmit:f,relative:v,preventScrollReset:d,viewTransition:p,...h},m)=>{let b=function(){let{router:n}=D("useSubmit"),{basename:e}=Tn.useContext(Fe),t=x("useRouteId")
return Tn.useCallback(async(r,l={})=>{let{action:u,method:o,encType:i,formData:a,body:c}=function(n,e){let t,r,l,u,o
if(E(i=n)&&"form"===i.tagName.toLowerCase()){let o=n.getAttribute("action")
r=o?s(o,e):null,t=n.getAttribute("method")||Ae,l=C(n.getAttribute("enctype"))||_e,u=new FormData(n)}else if(function(n){return E(n)&&"button"===n.tagName.toLowerCase()}(n)||function(n){return E(n)&&"input"===n.tagName.toLowerCase()}(n)&&("submit"===n.type||"image"===n.type)){let o=n.form
if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>')
let i=n.getAttribute("formaction")||o.getAttribute("action")
if(r=i?s(i,e):null,t=n.getAttribute("formmethod")||o.getAttribute("method")||Ae,l=C(n.getAttribute("formenctype"))||C(o.getAttribute("enctype"))||_e,u=new FormData(o,n),!function(){if(null===Ue)try{new FormData(document.createElement("form"),0),Ue=!1}catch(lr){Ue=!0}return Ue}()){let{name:e,type:t,value:r}=n
if("image"===t){let n=e?`${e}.`:""
u.append(`${n}x`,"0"),u.append(`${n}y`,"0")}else e&&u.append(e,r)}}else{if(E(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">')
t=Ae,r=null,l=_e,o=n}var i
return u&&"text/plain"===l&&(o=u,u=void 0),{action:r,method:t.toLowerCase(),encType:l,formData:u,body:o}}(r,e)
if(!1===l.navigate){let e=l.fetcherKey||nt()
await n.fetch(e,t,l.action||u,{preventScrollReset:l.preventScrollReset,formData:a,body:c,formMethod:l.method||o,formEncType:l.encType||i,flushSync:l.flushSync})}else await n.navigate(l.action||u,{preventScrollReset:l.preventScrollReset,formData:a,body:c,formMethod:l.method||o,formEncType:l.encType||i,replace:l.replace,state:l.state,fromRouteId:t,flushSync:l.flushSync,viewTransition:l.viewTransition})},[n,e,t])}(),g=function(e,{relative:r}={}){let{basename:l}=Tn.useContext(Fe),u=Tn.useContext(Ie)
n(u,"useFormAction must be used inside a RouteContext")
let[o]=u.matches.slice(-1),i={...w(e||".",{relative:r})},a=y()
if(null==e){i.search=a.search
let n=new URLSearchParams(i.search),e=n.getAll("index")
if(e.some(n=>""===n)){n.delete("index"),e.filter(n=>n).forEach(e=>n.append("index",e))
let t=n.toString()
i.search=t?`?${t}`:""}}return e&&"."!==e||!o.route.index||(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),"/"!==l&&(i.pathname="/"===i.pathname?l:xe([l,i.pathname])),t(i)}(c,{relative:v}),k="get"===a.toLowerCase()?"get":"post",S="string"==typeof c&&Ve.test(c)
return Tn.createElement("form",{ref:m,method:k,action:g,onSubmit:u?f:n=>{if(f&&f(n),n.defaultPrevented)return
n.preventDefault()
let e=n.nativeEvent.submitter,t=e?.getAttribute("formmethod")||a
b(e||n.currentTarget,{fetcherKey:r,method:t,navigate:l,replace:o,state:i,relative:v,preventScrollReset:d,viewTransition:p})},...h,"data-discover":S||"render"!==e?void 0:"true"})}).displayName="Form"
var Ye,Je,Ge,Qe,Ke,Xe,Ze=0,nt=()=>`__${String(++Ze)}__`,et={exports:{}},tt={},rt=function(){return Je||(Je=1,et.exports=function(){return Ye||(Ye=1,tt.ConcurrentRoot=1,tt.ContinuousEventPriority=8,tt.DefaultEventPriority=32,tt.DiscreteEventPriority=2,tt.IdleEventPriority=268435456,tt.LegacyRoot=0,tt.NoEventPriority=0),tt}()),et.exports}(),lt={exports:{}},ut={exports:{}},ot={exports:{}},it={}
const at=Fn(function(){return Xe||(Xe=1,lt.exports=O()),lt.exports}())
var ct,ft,st={exports:{}},vt={},dt=function(){return ft||(ft=1,st.exports=function(){return ct||(ct=1,function(n){function e(n,e){var t=n.length
n.push(e)
n:for(;0<t;){var r=t-1>>>1,u=n[r]
if(!(0<l(u,e)))break n
n[r]=e,n[t]=u,t=r}}function t(n){return 0===n.length?null:n[0]}function r(n){if(0===n.length)return null
var e=n[0],t=n.pop()
if(t!==e){n[0]=t
n:for(var r=0,u=n.length,o=u>>>1;r<o;){var i=2*(r+1)-1,a=n[i],c=i+1,f=n[c]
if(0>l(a,t))c<u&&0>l(f,a)?(n[r]=f,n[c]=t,r=c):(n[r]=a,n[i]=t,r=i)
else{if(!(c<u&&0>l(f,t)))break n
n[r]=f,n[c]=t,r=c}}}return e}function l(n,e){var t=n.sortIndex-e.sortIndex
return 0!==t?t:n.id-e.id}function u(n){for(var l=t(y);null!==l;){if(null===l.callback)r(y)
else{if(!(l.startTime<=n))break
r(y),l.sortIndex=l.expirationTime,e(h,l)}l=t(y)}}function o(n){if(x=!1,u(n),!k)if(null!==t(h))k=!0,c()
else{var e=t(y)
null!==e&&f(o,e.startTime-n)}}function i(){return!(n.unstable_now()-T<P)}function a(){if(R){var e=n.unstable_now()
T=e
var l=!0
try{n:{k=!1,x&&(x=!1,E(M),M=-1),g=!0
var a=w
try{e:{for(u(e),b=t(h);null!==b&&!(b.expirationTime>e&&i());){var c=b.callback
if("function"==typeof c){b.callback=null,w=b.priorityLevel
var s=c(b.expirationTime<=e)
if(e=n.unstable_now(),"function"==typeof s){b.callback=s,u(e),l=!0
break e}b===t(h)&&r(h),u(e)}else r(h)
b=t(h)}if(null!==b)l=!0
else{var v=t(y)
null!==v&&f(o,v.startTime-e),l=!1}}break n}finally{b=null,w=a,g=!1}l=void 0}}finally{l?p():R=!1}}}function c(){R||(R=!0,p())}function f(e,t){M=S(function(){e(n.unstable_now())},t)}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s=performance
n.unstable_now=function(){return s.now()}}else{var v=Date,d=v.now()
n.unstable_now=function(){return v.now()-d}}var p,h=[],y=[],m=1,b=null,w=3,g=!1,k=!1,x=!1,S="function"==typeof setTimeout?setTimeout:null,E="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null,R=!1,M=-1,P=5,T=-1
if("function"==typeof C)p=function(){C(a)}
else if("undefined"!=typeof MessageChannel){var j=new MessageChannel,F=j.port2
j.port1.onmessage=a,p=function(){F.postMessage(null)}}else p=function(){S(a,0)}
n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){k||g||(k=!0,c())},n.unstable_forceFrameRate=function(n){0>n||125<n?void 0:P=0<n?Math.floor(1e3/n):5},n.unstable_getCurrentPriorityLevel=function(){return w},n.unstable_getFirstCallbackNode=function(){return t(h)},n.unstable_next=function(n){switch(w){case 1:case 2:case 3:var e=3
break
default:e=w}var t=w
w=e
try{return n()}finally{w=t}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break
default:n=3}var t=w
w=n
try{return e()}finally{w=t}},n.unstable_scheduleCallback=function(r,l,u){var i=n.unstable_now()
switch(u="object"==typeof u&&null!==u&&"number"==typeof(u=u.delay)&&0<u?i+u:i,r){case 1:var a=-1
break
case 2:a=250
break
case 5:a=1073741823
break
case 4:a=1e4
break
default:a=5e3}return r={id:m++,callback:l,priorityLevel:r,startTime:u,expirationTime:a=u+a,sortIndex:-1},u>i?(r.sortIndex=u,e(y,r),null===t(h)&&r===t(y)&&(x?(E(M),M=-1):x=!0,f(o,u-i))):(r.sortIndex=a,e(h,r),k||g||(k=!0,c())),r},n.unstable_shouldYield=i,n.unstable_wrapCallback=function(n){var e=w
return function(){var t=w
w=e
try{return n.apply(this,arguments)}finally{w=t}}}}(vt)),vt}()),st.exports}()
const pt=n=>n&&n.isOrthographicCamera,ht=n=>null!=n&&("string"==typeof n||"number"==typeof n||n.isColor),yt=((n,e)=>"undefined"!=typeof window&&((null==(n=window.document)?void 0:n.createElement)||"ReactNative"===(null==(e=window.navigator)?void 0:e.product)))()?Tn.useLayoutEffect:Tn.useEffect,mt=(n=>((n=class extends Tn.Component{constructor(...n){super(...n),this.state={error:!1}}componentDidCatch(n){this.props.set(n)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),n))(),bt={obj:n=>n===Object(n)&&!bt.arr(n)&&"function"!=typeof n,fun:n=>"function"==typeof n,str:n=>"string"==typeof n,num:n=>"number"==typeof n,boo:n=>"boolean"==typeof n,und:n=>void 0===n,nul:n=>null===n,arr:n=>Array.isArray(n),equ(n,e,{arrays:t="shallow",objects:r="reference",strict:l=!0}={}){if(typeof n!=typeof e||!!n!=!!e)return!1
if(bt.str(n)||bt.num(n)||bt.boo(n))return n===e
const u=bt.obj(n)
if(u&&"reference"===r)return n===e
const o=bt.arr(n)
if(o&&"reference"===t)return n===e
if((o||u)&&n===e)return!0
let i
for(i in n)if(!(i in e))return!1
if(u&&"shallow"===t&&"shallow"===r){for(i in l?e:n)if(!bt.equ(n[i],e[i],{strict:l,objects:"reference"}))return!1}else for(i in l?e:n)if(n[i]!==e[i])return!1
if(bt.und(i)){if(o&&0===n.length&&0===e.length)return!0
if(u&&0===Object.keys(n).length&&0===Object.keys(e).length)return!0
if(n!==e)return!1}return!0}},wt=["children","key","ref"],gt=/-\d+$/,kt=[...wt,"args","dispose","attach","object","onUpdate","dispose"],xt=new Map,St=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],Et=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/,Ct=n=>null==n?void 0:n.isObject3D,Rt=n=>!(null==n||!n.render),Mt=Tn.createContext(null),Pt={},Tt=/^three(?=[A-Z])/,jt=n=>`${n[0].toUpperCase()}${n.slice(1)}`
let Ft=0
const $t=[],It=()=>{},zt={}
let Dt=0
const Ot=function(n){const e=at(n)
return e.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:Tn.version}),e}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(n,e,t){var r
return tn(n=jt(n)in Pt?n:n.replace(Tt,""),e),"primitive"===n&&null!=(r=e.object)&&r.I&&delete e.object.I,H(e.object,t,n,e)},removeChild:cn,appendChild:un,appendInitialChild:un,insertBefore:on,appendChildToContainer(n,e){const t=n.getState().scene.I
e&&t&&un(t,e)},removeChildFromContainer(n,e){const t=n.getState().scene.I
e&&t&&cn(t,e)},insertInContainerBefore(n,e,t){const r=n.getState().scene.I
e&&t&&r&&on(r,e,t)},getRootHostContext:()=>zt,getChildHostContext:()=>zt,commitUpdate(n,e,t,r,l){var u,o,i
tn(e,r)
let a=!1
if(("primitive"===n.type&&t.object!==r.object||(null==(u=r.args)?void 0:u.length)!==(null==(o=t.args)?void 0:o.length)||null!=(i=r.args)&&i.some((n,e)=>{var r
return n!==(null==(r=t.args)?void 0:r[e])}))&&(a=!0),a)$t.push([n,{...r},l])
else{const e=function(n,e){const t={}
for(const r in e)if(!kt.includes(r)&&!bt.equ(e[r],n.props[r])){t[r]=e[r]
for(const n in e)n.startsWith(`${r}-`)&&(t[n]=e[n])}for(const r in n.props){if(kt.includes(r)||e.hasOwnProperty(r))continue
const{root:l,key:u}=q(n.object,r)
if(l.constructor&&0===l.constructor.length){const n=Y(l)
bt.und(n)||(t[u]=n[u])}else t[u]=0}return t}(n,r)
Object.keys(e).length&&(Object.assign(n.props,e),J(n.object,e))}!(null!==l.sibling&&4&l.flags||function(){for(const[t]of $t){const n=t.parent
if(n){t.props.attach?W(n,t):Ct(t.object)&&Ct(n.object)&&n.object.remove(t.object)
for(const n of t.children)n.props.attach?W(t,n):Ct(n.object)&&Ct(t.object)&&t.object.remove(n.object)}t.isHidden&&rn(t),t.object.I&&delete t.object.I,"primitive"!==t.type&&an(t.object)}for(const[t,r,l]of $t){t.props=r
const u=t.parent
if(u){var n,e
const r=Pt[jt(t.type)]
t.object=null!=(n=t.props.object)?n:new r(...null!=(e=t.props.args)?e:[]),t.object.I=t,fn(l,t.object),J(t.object,t.props),t.props.attach?V(u,t):Ct(t.object)&&Ct(u.object)&&u.object.add(t.object)
for(const n of t.children)n.props.attach?V(t,n):Ct(n.object)&&Ct(t.object)&&t.object.add(n.object)
G(t)}}$t.length=0}())},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:n=>null==n?void 0:n.object,prepareForCommit:()=>null,preparePortalMount:n=>H(n.getState().scene,n,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(n){var e
n.isHidden||(n.props.attach&&null!=(e=n.parent)&&e.object?W(n.parent,n):Ct(n.object)&&(n.object.visible=!1),n.isHidden=!0,G(n))},unhideInstance:rn,createTextInstance:It,hideTextInstance:It,unhideTextInstance:It,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:Tn.createContext(null),setCurrentUpdatePriority(n){Dt=n},getCurrentUpdatePriority:()=>Dt,resolveUpdatePriority(){var n
if(0!==Dt)return Dt
switch("undefined"!=typeof window&&(null==(n=window.event)?void 0:n.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return rt.DiscreteEventPriority
case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return rt.ContinuousEventPriority
default:return rt.DefaultEventPriority}},resetFormInstance(){}}),Lt=new Map,Nt={objects:"shallow",strict:!1},At=new Set,_t=new Set,Ut=new Set
let Bt,Ht,qt,Vt,Wt,Yt=!1,Jt=!1
const Gt={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]},Qt=["x","y","top","bottom","left","right","width","height"],Kt=(n,e)=>Qt.every(t=>n[t]===e[t]),Xt=Tn.createContext(null),Zt=n=>!(2&~n.getAttributes()),nr=Tn.memo(Tn.forwardRef(({children:n,camera:e,scene:t,resolutionScale:r,enabled:l=!0,renderPriority:u=1,autoClear:o=!0,depthBuffer:i,enableNormalPass:a,stencilBuffer:c,multisampling:f=8,frameBufferType:s=oe},v)=>{const{gl:d,scene:p,camera:h,size:y}=Z(),m=t||p,b=e||h,[w,g,k]=Tn.useMemo(()=>{const n=new ue(d,{depthBuffer:i,stencilBuffer:c,multisampling:f,frameBufferType:s})
n.addPass(new ie(m,b))
let e=null,t=null
return a&&(t=new ae(m,b),t.enabled=!1,n.addPass(t),void 0!==r&&(e=new ce({normalBuffer:t.texture,resolutionScale:r}),e.enabled=!1,n.addPass(e))),[n,t,e]},[b,d,i,c,f,s,m,a,r])
Tn.useEffect(()=>w?.setSize(y.width,y.height),[w,y]),nn((n,e)=>{if(l){const n=d.autoClear
d.autoClear=o,c&&!o&&d.clearStencil(),w.render(e),d.autoClear=n}},l?u:0)
const x=Tn.useRef(null)
Tn.useLayoutEffect(()=>{const n=[],e=x.current.I
if(e&&w){const t=e.children
for(let e=0;e<t.length;e++){const r=t[e].object
if(r instanceof fe){const l=[r]
if(!Zt(r)){let n=null
for(;(n=t[e+1]?.object)instanceof fe&&!Zt(n);)l.push(n),e++}const u=new se(b,...l)
n.push(u)}else r instanceof de&&n.push(r)}for(const e of n)w?.addPass(e)
g&&(g.enabled=!0),k&&(k.enabled=!0)}return()=>{for(const e of n)w?.removePass(e)
g&&(g.enabled=!1),k&&(k.enabled=!1)}},[w,n,b,g,k]),Tn.useEffect(()=>{const n=d.toneMapping
return d.toneMapping=Yn,()=>{d.toneMapping=n}},[d])
const S=Tn.useMemo(()=>({composer:w,normalPass:g,downSamplingPass:k,resolutionScale:r,camera:b,scene:m}),[w,g,k,r,b,m])
return Tn.useImperativeHandle(v,()=>w,[w]),Pn.jsx(Xt.Provider,{value:S,children:Pn.jsx("group",{ref:x,children:n})})}))
let er=0
const tr=new WeakMap,rr=(lr=class extends fe{constructor(){const n=new Map([["colorNum",new pe(4)],["pixelSize",new pe(2)]])
super("RetroEffect","\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n",{uniforms:n}),this.uniforms=n}set colorNum(n){this.uniforms.get("colorNum").value=n}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(n){this.uniforms.get("pixelSize").value=n}get pixelSize(){return this.uniforms.get("pixelSize").value}},function({blendFunction:n,opacity:e,...t}){let r=tr.get(lr)
if(!r){const n=`@react-three/postprocessing/${lr.name}-${er++}`
en({[n]:lr}),tr.set(lr,r=n)}const l=Z(n=>n.camera),u=ve.useMemo(()=>[...t.args??[{...t}]],[JSON.stringify(t)])
return Pn.jsx(r,{camera:l,"blendMode-blendFunction":n,"blendMode-opacity-value":e,...t,args:u})})
var lr
const ur=Tn.forwardRef((n,e)=>{const{colorNum:t,pixelSize:r}=n
return Pn.jsx(rr,{ref:e,colorNum:t,pixelSize:r})})
ur.displayName="RetroEffect"
export{Mn as default}
