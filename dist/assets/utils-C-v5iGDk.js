function e(){let e=!1
try{const t=Object.defineProperty({},"passive",{get:()=>(e=!0,!1)})
window.addEventListener("testPassive",null,t),window.removeEventListener("testPassive",null,t)}catch(t){}return e}function t(e,t=W){if(!e||"string"!=typeof e)return""
try{return u.sanitize(e,t)}catch(n){return void 0,""}}function n(e){return t(e,$)}function o(e,n={}){const o={}
return Object.keys(e).forEach(i=>{const a=e[i],r=n[i]||$
"string"==typeof a?o[i]=t(a,r):Array.isArray(a)?o[i]=a.map(e=>"string"==typeof e?t(e,r):e):o[i]=a}),o}async function i(e,t={}){const n=function(){const e=document.querySelector('meta[name="csrf-token"]')
if(e)return e.getAttribute("content")
const t=document.cookie.split(";")
for(let n of t){const[e,t]=n.trim().split("=")
if("XSRF-TOKEN"===e||"_csrf"===e)return decodeURIComponent(t)}return null}(),o={...t,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n&&{"X-CSRF-Token":n},...t.headers}}
if(o.body&&"string"==typeof o.body)try{const e=JSON.parse(o.body)
e.t=Date.now(),o.body=JSON.stringify(e)}catch(i){o.headers["X-Request-Timestamp"]=Date.now().toString()}try{const t=await fetch(e,o)
return!function(e){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(t=>!e.headers.get(t)).length>0,0}(t),t}catch(a){throw void 0,a}}function a(){void document.addEventListener("securitypolicyviolation",e=>{const t={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&i("/api/security/csp-violation",{method:"POST",body:JSON.stringify(t)}).catch(e=>{void 0})}),function(){if(window.top!==window.self){const t=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const e=window.parent.location.origin
t.includes(e)||(void 0,window.top.location=window.location)}catch(e){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",e=>{e.preventDefault()}),"localhost"!==window.location.hostname&&document.addEventListener("keydown",e=>{("F12"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()})}function r(){!function(){try{for(let t=localStorage.length-1;t>=0;t--){const n=localStorage.key(t)
if(n)try{const e=localStorage.getItem(n)
e&&e.includes("blob:")&&(void 0,localStorage.removeItem(n))}catch(e){void 0}}for(let t=sessionStorage.length-1;t>=0;t--){const n=sessionStorage.key(t)
if(n)try{const e=sessionStorage.getItem(n)
e&&e.includes("blob:")&&(void 0,sessionStorage.removeItem(n))}catch(e){void 0}}void 0}catch(e){void 0}}(),window.addEventListener("error",e=>{if(e.target&&"src"in e.target){const t=e.target.src
t&&t.startsWith("blob:")&&(void 0,e.preventDefault())}},!0)}import{r as c,j as s}from"./react-core-CelsEjp7.js"
import{g as l,t as d}from"./analytics-CJ5epBg3.js"
import{H as p,a as m,p as u}from"./vendor-7EMnm0rL.js"
let w=null
const h=new Map,f=(e,t=null)=>{const[n,o]=c.useState({width:0,height:0}),i=c.useRef(e),a=c.useRef(t)
i.current=e,a.current=t
const r=c.useCallback(e=>{o(e),i.current&&i.current(e)},[])
return c.useEffect(()=>{void("undefined"==typeof window||w||"ResizeObserver"in window&&(w=new ResizeObserver(e=>{requestAnimationFrame(()=>{e.forEach(e=>{const t=h.get(e.target)
if(t){const{width:n,height:o}=e.contentRect
t.forEach(e=>e({width:n,height:o}))}})})})))
const e=a.current||window
if(w&&e!==window)return h.has(e)||h.set(e,new Set),h.get(e).add(r),w.observe(e),()=>{const t=h.get(e)
t&&(t.delete(r),0===t.size&&(h.delete(e),w.unobserve(e)))}
{let e=null,t=null
const n=()=>{e&&cancelAnimationFrame(e),t&&clearTimeout(t),t=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
r({width:e,height:t})})},100)}
return window.addEventListener("resize",n,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
r({width:e,height:t})}),()=>{window.removeEventListener("resize",n),e&&cancelAnimationFrame(e),t&&clearTimeout(t)}}},[r]),n},g=()=>{const[e,t]=c.useState({width:"undefined"!=typeof window?window.innerWidth:0,height:"undefined"!=typeof window?window.innerHeight:0,isMobile:!1,isTablet:!1,isDesktop:!1}),n=c.useCallback(e=>{const{width:n,height:o}=e
t({width:n,height:o,isMobile:n<=768,isTablet:n>768&&n<=1024,isDesktop:n>1024})},[])
return c.useEffect(()=>{let e=null,t=null
const o=()=>{e&&cancelAnimationFrame(e),t&&clearTimeout(t),t=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
n({width:e,height:t})})},100)}
return window.addEventListener("resize",o,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,t=window.innerHeight
n({width:e,height:t})}),()=>{window.removeEventListener("resize",o),e&&cancelAnimationFrame(e),t&&clearTimeout(t)}},[n]),e},v=()=>{const e=c.useRef(!1)
c.useEffect(()=>{const t=l()
!e.current&&t&&t.isEnabled()&&(e.current=!0)},[])
const t=c.useCallback(e=>{d(e)},[]),n=c.useCallback((e,t="")=>{const n=l()
n&&n.isEnabled()&&n.trackLinkClick(e,t)},[]),o=c.useCallback((e,t={})=>{const n=l()
n&&n.isEnabled()&&n.sendEvent({event:e,properties:t,timestamp:Date.now()})},[]),i=l()
return{track:t,trackLinkClick:n,trackEvent:o,isTrackingEnabled:!!i&&i.isEnabled()}},b={DASHBOARD_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/seo":"https://admin.b2b.click/api/settings/seo",MAINTENANCE_API:"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?"/api/settings/maintenance-status":"https://admin.b2b.click/api/settings/maintenance-status"},y={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let x=null,O=0
const T=async()=>{try{const e=Date.now(),t=e-O
if(x&&t<36e4)return void 0,t>288e3&&setTimeout(()=>async function(){try{return x=null,O=0,await T()}catch(e){x=oldCache,O=oldTimestamp}}(),100),x
const n=new AbortController,o=setTimeout(()=>n.abort(),8e3),i=await fetch(b.DASHBOARD_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors",signal:n.signal})
if(clearTimeout(o),!i.ok)throw void 0,new Error(`HTTP ${i.status}: ${i.statusText}`)
const a=i.headers.get("content-type")
if(!a||!a.includes("application/json"))throw void 0,new Error("API returned HTML instead of JSON - possible routing issue")
const r=await i.json()
if(r.success&&r.settings)return x={...y,...r.settings},O=e,x
throw void 0,new Error("Invalid API response format")}catch(e){return x?(void 0,x):("AbortError"===e.name?void 0:e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,y)}},S=async()=>{try{void 0
const e=await fetch(b.MAINTENANCE_API,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors"})
if(!e.ok)return void 0,{maintenance_mode:!1}
const t=await e.json()
return void 0!==t.success?(void 0,{maintenance_mode:t.maintenance_mode||!1,maintenance_message:t.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:t.estimated_downtime||"2 hours",contact_information:t.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(e){return e.message.includes("CORS")||e.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},E="seo_settings_cache",_=()=>{try{localStorage.removeItem(E)}catch(e){void 0}},k=e=>{try{const t={data:{default_title:e.default_title,default_description:e.default_description,default_og_image:e.default_og_image,twitter_handle:e.twitter_handle},timestamp:Date.now()},n=JSON.stringify(t)
n.length>5e4&&(void 0,_()),localStorage.setItem(E,n)}catch(t){if("QuotaExceededError"===t.name){void 0,_()
try{const t={data:{default_title:e.default_title,default_description:e.default_description&&e.default_description.substring(0,200),default_og_image:e.default_og_image},timestamp:Date.now()}
localStorage.setItem(E,JSON.stringify(t))}catch(n){void 0}}else void 0}},A=c.createContext(),C=({children:e})=>{const[t,n]=c.useState(y),[o,i]=c.useState({maintenance_mode:!1}),[a,r]=c.useState(!0),[l,d]=c.useState(null),[u,w]=c.useState({isMobile:!1,deviceType:"unknown"}),h=async(e=!0)=>{try{if(r(!0),e){const e=(()=>{try{const e=localStorage.getItem(E)
if(e){const{data:t,timestamp:n}=JSON.parse(e)
if(Date.now()-n<3e4)return void 0,t}}catch(e){void 0,_()}return null})()
if(e)return n(e),r(!1),f(),void 0}await f()}catch(t){void 0,n(y)}finally{r(!1)}},f=async()=>{try{void 0
const[e,t]=await Promise.all([T(),S()])
n(e),i(t),d(new Date),k(e)}catch(e){void 0}}
c.useEffect(()=>{const e=()=>{const e=window.innerWidth,t=navigator.userAgent||"",n=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t),o=e<=768||n
let i="desktop"
o&&(i=e<=480?"mobile":"tablet"),w({isMobile:o,deviceType:i})}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),c.useEffect(()=>{h()},[]),c.useEffect(()=>{const e=setInterval(()=>{void 0,f()},3e5)
return()=>clearInterval(e)},[])
const g=c.useMemo(()=>t?(void 0,((e,t={})=>{const n={...y,...e},{isMobile:o=!1}=t,i=(a=n.default_og_image)?a.startsWith("http")?a:a.startsWith("/uploads/")?`https://admin.b2b.click${a}`:`https://b2b.click${a}`:"https://admin.b2b.click/images/og-image.png"
var a
const r=[{name:"description",content:n.default_description},{name:"keywords",content:n.default_keywords},{name:"author",content:n.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:n.default_title},{property:"og:description",content:n.default_description},{property:"og:image",content:i},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${n.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:n.twitter_handle},{name:"twitter:creator",content:n.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:n.default_title},{name:"twitter:description",content:n.default_description},{name:"twitter:image",content:i},{name:"twitter:image:alt",content:`${n.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return o&&r.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:n.default_title,meta:r,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(t,u)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[t,u]),v={seoSettings:t,maintenanceStatus:o,metaTags:g,isLoading:a,lastUpdated:l,deviceInfo:u,refreshSEOSettings:async()=>{void 0,await h(!1)},updateSEOSetting:(e,t)=>{n(n=>{const o={...n,[e]:t}
return k(o),o}),d(new Date)},clearCache:()=>{_()},loadSEOSettings:h,isMaintenanceMode:()=>o.maintenance_mode}
return s.jsx(A.Provider,{value:v,children:s.jsxs(p,{children:[s.jsxs(m,{children:[s.jsx("title",{children:g.title}),g.meta.map((e,t)=>e.name?s.jsx("meta",{name:e.name,content:e.content},`meta-${t}`):e.property?s.jsx("meta",{property:e.property,content:e.content},`meta-${t}`):null),g.link.map((e,t)=>s.jsx("link",{...e},`link-${t}`))]}),e]})})},M=()=>{const e=c.useContext(A)
if(!e)throw new Error("useSEO must be used within a SEOProvider")
return e},I=()=>(M(),c.useState(!0),null),P=()=>{const{maintenanceStatus:e}=M(),[t,n]=c.useState(!1)
if(c.useEffect(()=>{const e=()=>{const e=window.innerWidth,t=navigator.userAgent||"",o=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
n(e<=768||o)}
return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),!e.maintenance_mode)return null
const o={position:"fixed",top:0,left:0,right:0,bottom:0,background:t?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:t?"20px":"40px",overflow:"hidden"},i={fontSize:t?"64px":"96px",marginBottom:t?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},a={fontSize:t?"28px":"48px",marginBottom:t?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},r={fontSize:t?"16px":"20px",marginBottom:t?"24px":"32px",maxWidth:t?"320px":"600px",lineHeight:1.6,opacity:.9},l={fontSize:t?"14px":"18px",marginBottom:t?"20px":"24px",opacity:.8,padding:t?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:t?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},d={fontSize:t?"12px":"16px",opacity:.6,marginTop:t?"20px":"32px"}
return s.jsxs("div",{style:o,children:[s.jsx("div",{style:i,children:"\ud83d\udd27"}),s.jsx("h1",{style:a,children:e.maintenance_title||"Site Under Maintenance"}),s.jsx("p",{style:r,children:e.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),e.estimated_downtime&&s.jsxs("div",{style:l,children:["Estimated downtime: ",e.estimated_downtime]}),e.contact_information&&s.jsxs("p",{style:d,children:["Questions? Contact us: ",e.contact_information]}),s.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:t?"80px":"120px",height:t?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),s.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:t?"60px":"100px",height:t?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})},N=()=>{const e=M()
return{...e,updateTitle:t=>{e.updateSEOSetting("default_title",t)},updateDescription:t=>{e.updateSEOSetting("default_description",t)},updateOGImage:t=>{e.updateSEOSetting("default_og_image",t)},updateSEOSettings:t=>{Object.entries(t).forEach(([t,n])=>{e.updateSEOSetting(t,n)})},getCurrentMetaTags:()=>e.metaTags,isMaintenanceMode:()=>e.maintenanceStatus.maintenance_mode}},R=()=>{const[e,t]=c.useState(!document.hidden),[n,o]=c.useState(!0),i=c.useRef(new Set),a=c.useRef(new Set),r=c.useRef(new Map),s=c.useRef(new Set),l=c.useCallback((e,t)=>{const n=setTimeout(()=>{i.current.delete(n),e()},t)
return i.current.add(n),n},[]),d=c.useCallback((t,o)=>{const i=setInterval(()=>{e&&n&&t()},o)
return a.current.add(i),i},[e,n]),p=c.useCallback(e=>{clearTimeout(e),i.current.delete(e)},[]),m=c.useCallback(e=>{clearInterval(e),a.current.delete(e)},[]),u=c.useCallback((e,t,n,o={})=>{const i=`${e.constructor.name}-${t}`
if(r.current.has(i)){const{element:e,event:t,handler:n}=r.current.get(i)
e.removeEventListener(t,n)}return e.addEventListener(t,n,o),r.current.set(i,{element:e,event:t,handler:n}),()=>{e.removeEventListener(t,n),r.current.delete(i)}},[]),w=c.useCallback(e=>(s.current.add(e),()=>s.current.delete(e)),[]),h=c.useCallback(()=>{void 0,o(!1),s.current.forEach(e=>{try{e()}catch(t){void 0}})},[]),f=c.useCallback(()=>{void 0,o(!0)},[]),g=c.useCallback(()=>{void 0,i.current.forEach(e=>clearTimeout(e)),i.current.clear(),a.current.forEach(e=>clearInterval(e)),a.current.clear(),r.current.forEach(({element:e,event:t,handler:n})=>{try{e.removeEventListener(t,n)}catch(o){void 0}}),r.current.clear(),s.current.forEach(e=>{try{e()}catch(t){void 0}}),s.current.clear()},[])
return c.useEffect(()=>{const e=()=>{const e=!document.hidden
t(e),e?(void 0,f()):(void 0,h())},n=()=>{void 0,o(!0),f()},i=()=>{void 0,h()},a=()=>{void 0,h()},r=e=>{void 0,e.persisted,f()}
return document.addEventListener("visibilitychange",e,{passive:!0}),window.addEventListener("focus",n,{passive:!0}),window.addEventListener("blur",i,{passive:!0}),window.addEventListener("pagehide",a,{passive:!0}),window.addEventListener("pageshow",r,{passive:!0}),window.addEventListener("beforeunload",h,{passive:!0}),()=>{document.removeEventListener("visibilitychange",e),window.removeEventListener("focus",n),window.removeEventListener("blur",i),window.removeEventListener("pagehide",a),window.removeEventListener("pageshow",r),window.removeEventListener("beforeunload",h),g()}},[h,f,g]),c.useEffect(()=>{if("memory"in performance){const e=setInterval(()=>{const e=performance.memory
void 0,e.usedJSHeapSize/e.jsHeapSizeLimit>.6&&(g(),void(window.gc&&window.gc()))},6e4)
return()=>clearInterval(e)}},[g]),{isVisible:e,isActive:n,createTimer:l,createInterval:d,clearTimer:p,clearInterval:m,addEventListener:u,registerCleanup:w,pauseBackgroundProcesses:h,resumeBackgroundProcesses:f,cleanupAll:g}},B=()=>{const e=navigator.userAgent||"",t=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),n=window.innerWidth<=768,o="ontouchstart"in window||navigator.maxTouchPoints>0
return t||n&&o},D=()=>{const t=navigator.userAgent||""
return{isIOS:/iPad|iPhone|iPod/.test(t),isAndroid:/Android/.test(t),isSafari:/Safari/.test(t)&&!/Chrome/.test(t),isChrome:/Chrome/.test(t),isFirefox:/Firefox/.test(t),isMobile:B(),supportsPassiveEvents:e(),supportsIntersectionObserver:"IntersectionObserver"in window,supportsRequestIdleCallback:"requestIdleCallback"in window}},F=(e,t,n=!1)=>{let o
return function(...i){const a=n&&!o,r=B()?Math.max(t,100):t
clearTimeout(o),o=setTimeout(()=>{o=null,n||e.apply(this,i)},r),a&&e.apply(this,i)}},U={forceGC(){window.gc&&window.gc()},getMemoryInfo(){if("memory"in performance){const e=performance.memory
return{used:e.usedJSHeapSize,total:e.totalJSHeapSize,limit:e.jsHeapSizeLimit,usageRatio:e.usedJSHeapSize/e.jsHeapSizeLimit}}return null},isMemoryPressure(){const e=this.getMemoryInfo()
return!!e&&e.usageRatio>.8},cleanupBlobUrls(){void 0}},z={setMobileViewport(){let e=document.querySelector('meta[name="viewport"]')
e||(e=document.createElement("meta"),e.name="viewport",document.head.appendChild(e)),e.content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},fixIOSViewport(){if(D().isIOS){const e=()=>{const e=.01*window.innerHeight
document.documentElement.style.setProperty("--vh",`${e}px`)}
e(),window.addEventListener("resize",F(e,100),{passive:!0}),window.addEventListener("orientationchange",F(e,100),{passive:!0})}},getSafeAreaInsets(){const e=getComputedStyle(document.documentElement)
return{top:e.getPropertyValue("--sat")||e.getPropertyValue("env(safe-area-inset-top)")||"0px",right:e.getPropertyValue("--sar")||e.getPropertyValue("env(safe-area-inset-right)")||"0px",bottom:e.getPropertyValue("--sab")||e.getPropertyValue("env(safe-area-inset-bottom)")||"0px",left:e.getPropertyValue("--sal")||e.getPropertyValue("env(safe-area-inset-left)")||"0px"}}},L={trackMetrics(){if("performance"in window){const e=performance.getEntriesByType("navigation")[0],t=performance.getEntriesByType("paint")
return void 0,{domContentLoaded:e.domContentLoadedEventEnd-e.domContentLoadedEventStart,loadComplete:e.loadEventEnd-e.loadEventStart,firstPaint:t.find(e=>"first-paint"===e.name)?.startTime||0,firstContentfulPaint:t.find(e=>"first-contentful-paint"===e.name)?.startTime||0,memoryInfo:U.getMemoryInfo()}}return null},startMonitoring(){B()&&setInterval(()=>{U.isMemoryPressure()&&(void 0,U.forceGC())},3e4)}},j=()=>{if(B()){void 0,z.setMobileViewport(),z.fixIOSViewport(),L.startMonitoring(),document.documentElement.classList.add("mobile-device")
const e=D()
e.isIOS&&document.documentElement.classList.add("ios"),e.isAndroid&&document.documentElement.classList.add("android"),e.isSafari&&document.documentElement.classList.add("safari"),e.isChrome&&document.documentElement.classList.add("chrome")}},W={ALLOWED_TAGS:["p","br","strong","em","u","i","b","span","div","h1","h2","h3","h4","h5","h6","ul","ol","li","a","img","blockquote","code","pre"],ALLOWED_ATTR:["href","title","alt","src","width","height","class","id","style"],ALLOWED_URI_REGEXP:/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,FORBID_TAGS:["script","object","embed","form","input","textarea","select","button"],FORBID_ATTR:["onerror","onload","onclick","onmouseover","onfocus","onblur"],KEEP_CONTENT:!0,RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1,RETURN_DOM_IMPORT:!1,SANITIZE_DOM:!0,WHOLE_DOCUMENT:!1,FORCE_BODY:!1},$={ALLOWED_TAGS:[],ALLOWED_ATTR:[],KEEP_CONTENT:!0,ALLOW_DATA_ATTR:!1},q=(e=null,t={})=>{const{throttleMs:n=32,threshold:o=20,passive:i=!0}=t,[a,r]=c.useState({scrollY:0,scrollX:0,isScrolled:!1,direction:"none",velocity:0}),s=c.useRef(0),l=c.useRef(0),d=c.useRef(0),p=c.useRef(0),m=c.useRef(null),u=c.useRef(!1),w=c.useCallback(e=>{u.current||(u.current=!0,window.innerWidth<=767?setTimeout(()=>{const t=performance.now(),i=e.target===document?document.documentElement:e.target,a=i.scrollTop||window.pageYOffset||0,c=i.scrollLeft||window.pageXOffset||0,m=a-s.current,w=c-l.current,h=t-d.current
let f="none"
Math.abs(m)>Math.abs(w)?f=m>0?"down":m<0?"up":"none":Math.abs(w)>0&&(f=w>0?"right":"left")
const g=.3*(h>0?Math.abs(m)/h:0)+.7*p.current
r({scrollY:a,scrollX:c,isScrolled:a>o,direction:f,velocity:g}),s.current=a,l.current=c,d.current=t,p.current=g,setTimeout(()=>{u.current=!1},n)},n):(m.current&&cancelAnimationFrame(m.current),m.current=requestAnimationFrame(()=>{const t=performance.now(),i=e.target===document?document.documentElement:e.target,a=i.scrollTop||window.pageYOffset||0,c=i.scrollLeft||window.pageXOffset||0,m=a-s.current,w=c-l.current,h=t-d.current
let f="none"
Math.abs(m)>Math.abs(w)?f=m>0?"down":m<0?"up":"none":Math.abs(w)>0&&(f=w>0?"right":"left")
const g=.3*(h>0?Math.abs(m)/h:0)+.7*p.current
r({scrollY:a,scrollX:c,isScrolled:a>o,direction:f,velocity:g}),s.current=a,l.current=c,d.current=t,p.current=g,setTimeout(()=>{u.current=!1},n)})))},[n,o])
return c.useEffect(()=>{const t=e||window,n={passive:i}
return requestAnimationFrame(()=>{const t=e?e.scrollTop:window.pageYOffset||0,n=e?e.scrollLeft:window.pageXOffset||0
r({scrollY:t,scrollX:n,isScrolled:t>o,direction:"none",velocity:0}),s.current=t,l.current=n,d.current=performance.now()}),t.addEventListener("scroll",w,n),()=>{t.removeEventListener("scroll",w),m.current&&cancelAnimationFrame(m.current)}},[e,w,o]),a}
export{P as M,C as S,q as a,v as b,f as c,R as d,N as e,B as f,o as g,i as h,j as i,r as j,a as k,I as l,n as s,g as u}
