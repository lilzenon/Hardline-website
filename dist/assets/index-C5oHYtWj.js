const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-4ZK8L9j3.js","assets/icons-CEcW47ES.js","assets/react-vendor-6-C3k89f.js","assets/usePerformantResize-CQnbKQE9.js","assets/beacon-r5K5QvzQ.js","assets/mobileOptimization-DxuCIEdC.js","assets/sanitizer-CAEfkZn_.js","assets/AdminLoginFigma-CWYkvG3f.js","assets/AboutPage-2nMJXVlE.js","assets/ContactPage-D3fyAgt-.js"])))=>i.map(i=>d[i]);
async function t(t,e={}){const n=function(){const t=document.querySelector('meta[name="csrf-token"]')
if(t)return t.getAttribute("content")
const e=document.cookie.split(";")
for(let n of e){const[t,e]=n.trim().split("=")
if("XSRF-TOKEN"===t||"_csrf"===t)return decodeURIComponent(e)}return null}(),r={...e,credentials:"include",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...n&&{"X-CSRF-Token":n},...e.headers}}
if(r.body&&"string"==typeof r.body)try{const t=JSON.parse(r.body)
t.t=Date.now(),r.body=JSON.stringify(t)}catch(i){r.headers["X-Request-Timestamp"]=Date.now().toString()}try{const e=await fetch(t,r)
return!function(t){["X-Content-Type-Options","X-Frame-Options","Referrer-Policy"].filter(e=>!t.headers.get(e)).length>0,0}(e),e}catch(o){throw void 0,o}}var e,n,r=Object.defineProperty,i=(t,e,n)=>((t,e,n)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n)(t,"symbol"!=typeof e?e+"":e,n)
import{r as o,a as s,g as a}from"./react-vendor-6-C3k89f.js"
import{r as c,R as l}from"./icons-CEcW47ES.js"
!function(){function t(t){if(t.ep)return
t.ep=!0
const e=function(t){const e={}
return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t)
fetch(t.href,e)}const e=document.createElement("link").relList
if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e)
new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}}()
const d={},u=function(t,e,n){function r(t){const e=new Event("vite:preloadError",{cancelable:!0})
if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}let i=Promise.resolve()
if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))}
document.getElementsByTagName("link")
const n=document.querySelector("meta[property=csp-nonce]"),r=n?.nonce||n?.getAttribute("nonce")
i=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in d)return
d[t]=!0
const e=t.endsWith(".css"),n=e?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${t}"]${n}`))return
const i=document.createElement("link")
return i.rel=e?"stylesheet":"modulepreload",e||(i.as="script"),i.crossOrigin="",i.href=t,r&&i.setAttribute("nonce",r),document.head.appendChild(i),e?new Promise((e,n)=>{i.addEventListener("load",e),i.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}return i.then(e=>{for(const t of e||[])"rejected"===t.status&&r(t.reason)
return t().catch(r)})}
var p,m,h,f,g,b={exports:{}},w={},y=function(){return m||(m=1,b.exports=function(){function t(t,e,r){var o,c={},l=null,d=null
for(o in void 0!==r&&(l=""+r),void 0!==e.key&&(l=""+e.key),void 0!==e.ref&&(d=e.ref),e)i.call(e,o)&&!a.hasOwnProperty(o)&&(c[o]=e[o])
if(t&&t.defaultProps)for(o in e=t.defaultProps)void 0===c[o]&&(c[o]=e[o])
return{$$typeof:n,type:t,key:l,ref:d,props:c,i:s.current}}if(p)return w
p=1
var e=o(),n=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=e.o.ReactCurrentOwner,a={key:!0,ref:!0,l:!0,u:!0}
return w.Fragment=r,w.jsx=t,w.jsxs=t,w}()),b.exports}(),v={},T=function(){if(h)return v
h=1
var t=s()
return v.createRoot=t.createRoot,v.hydrateRoot=t.hydrateRoot,v}()
const x=a(function(){function t(o,s){if(o===s)return!0
if(o&&s&&"object"==typeof o&&"object"==typeof s){if(o.constructor!==s.constructor)return!1
var a,c,l,d
if(Array.isArray(o)){if((a=o.length)!=s.length)return!1
for(c=a;0!==c--;)if(!t(o[c],s[c]))return!1
return!0}if(n&&o instanceof Map&&s instanceof Map){if(o.size!==s.size)return!1
for(d=o.entries();!(c=d.next()).done;)if(!s.has(c.value[0]))return!1
for(d=o.entries();!(c=d.next()).done;)if(!t(c.value[1],s.get(c.value[0])))return!1
return!0}if(r&&o instanceof Set&&s instanceof Set){if(o.size!==s.size)return!1
for(d=o.entries();!(c=d.next()).done;)if(!s.has(c.value[0]))return!1
return!0}if(i&&ArrayBuffer.isView(o)&&ArrayBuffer.isView(s)){if((a=o.length)!=s.length)return!1
for(c=a;0!==c--;)if(o[c]!==s[c])return!1
return!0}if(o.constructor===RegExp)return o.source===s.source&&o.flags===s.flags
if(o.valueOf!==Object.prototype.valueOf&&"function"==typeof o.valueOf&&"function"==typeof s.valueOf)return o.valueOf()===s.valueOf()
if(o.toString!==Object.prototype.toString&&"function"==typeof o.toString&&"function"==typeof s.toString)return o.toString()===s.toString()
if((a=(l=Object.keys(o)).length)!==Object.keys(s).length)return!1
for(c=a;0!==c--;)if(!Object.prototype.hasOwnProperty.call(s,l[c]))return!1
if(e&&o instanceof Element)return!1
for(c=a;0!==c--;)if(("_owner"!==l[c]&&"__v"!==l[c]&&"__o"!==l[c]||!o.$$typeof)&&!t(o[l[c]],s[l[c]]))return!1
return!0}return o!=o&&s!=s}if(g)return f
g=1
var e="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return f=function(e,n){try{return t(e,n)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var _,k
const O=a(function(){return k?_:(k=1,_=function(t,e,n,r,i,o,s,a){if(!t){var c
if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var l=[n,r,i,o,s,a],d=0;(c=new Error(e.replace(/%s/g,function(){return l[d++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}})}())
var E,S
const C=a(function(){return S?E:(S=1,E=function(t,e,n,r){var i=n?n.call(r,t,e):void 0
if(void 0!==i)return!!i
if(t===e)return!0
if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1
var o=Object.keys(t),s=Object.keys(e)
if(o.length!==s.length)return!1
for(var a=Object.prototype.hasOwnProperty.bind(e),c=0;c<o.length;c++){var l=o[c]
if(!a(l))return!1
var d=t[l],u=e[l]
if(!1===(i=n?n.call(r,d,u,l):void 0)||void 0===i&&d!==u)return!1}return!0})}())
var A=(t=>(t.BASE="base",t.BODY="body",t.HEAD="head",t.HTML="html",t.LINK="link",t.META="meta",t.NOSCRIPT="noscript",t.SCRIPT="script",t.STYLE="style",t.TITLE="title",t.FRAGMENT="Symbol(react.fragment)",t))(A||{}),P={rel:["amphtml","canonical","alternate"]},$={type:["application/ld+json"]},j={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},I=Object.values(A),D={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},F=Object.entries(D).reduce((t,[e,n])=>(t[n]=e,t),{}),N="data-rh",B=(t,e)=>{for(let n=t.length-1;n>=0;n-=1){const r=t[n]
if(Object.prototype.hasOwnProperty.call(r,e))return r[e]}return null},M=t=>{let e=B(t,"title")
const n=B(t,"titleTemplate")
if(Array.isArray(e)&&(e=e.join("")),n&&e)return n.replace(/%s/g,()=>e)
const r=B(t,"defaultTitle")
return e||r||void 0},R=t=>B(t,"onChangeClientState")||(()=>{}),U=(t,e)=>e.filter(e=>void 0!==e[t]).map(e=>e[t]).reduce((t,e)=>({...t,...e}),{}),L=(t,e)=>e.filter(t=>void 0!==t.base).map(t=>t.base).reverse().reduce((e,n)=>{if(!e.length){const r=Object.keys(n)
for(let i=0;i<r.length;i+=1){const o=r[i].toLowerCase()
if(-1!==t.indexOf(o)&&n[o])return e.concat(n)}}return e},[]),z=(t,e,n)=>{const r={}
return n.filter(e=>!!Array.isArray(e[t])||(void 0!==e[t]&&(e[t],console&&"function"==typeof console.warn,0),!1)).map(e=>e[t]).reverse().reduce((t,n)=>{const i={}
n.filter(t=>{let n
const o=Object.keys(t)
for(let r=0;r<o.length;r+=1){const i=o[r],s=i.toLowerCase();-1===e.indexOf(s)||"rel"===n&&"canonical"===t[n].toLowerCase()||"rel"===s&&"stylesheet"===t[s].toLowerCase()||(n=s),-1===e.indexOf(i)||"innerHTML"!==i&&"cssText"!==i&&"itemprop"!==i||(n=i)}if(!n||!t[n])return!1
const s=t[n].toLowerCase()
return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][s]&&(i[n][s]=!0,!0)}).reverse().forEach(e=>t.push(e))
const o=Object.keys(i)
for(let e=0;e<o.length;e+=1){const t=o[e],n={...r[t],...i[t]}
r[t]=n}return t},[]).reverse()},H=(t,e)=>{if(Array.isArray(t)&&t.length)for(let n=0;n<t.length;n+=1)if(t[n][e])return!0
return!1},W=t=>Array.isArray(t)?t.join(""):t,q=(t,e)=>Array.isArray(t)?t.reduce((t,n)=>(((t,e)=>{const n=Object.keys(t)
for(let r=0;r<n.length;r+=1)if(e[n[r]]&&e[n[r]].includes(t[n[r]]))return!0
return!1})(n,e)?t.priority.push(n):t.default.push(n),t),{priority:[],default:[]}):{default:t,priority:[]},V=(t,e)=>({...t,[e]:void 0}),J=["noscript","script","style"],X=(t,e=!0)=>!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),K=t=>Object.keys(t).reduce((e,n)=>{const r=void 0!==t[n]?`${n}="${t[n]}"`:`${n}`
return e?`${e} ${r}`:r},""),Q=(t,e={})=>Object.keys(t).reduce((e,n)=>(e[D[n]||n]=t[n],e),e),G=(t,e)=>e.map((e,n)=>{const r={key:n,[N]:!0}
return Object.keys(e).forEach(t=>{const n=D[t]||t
if("innerHTML"===n||"cssText"===n){const t=e.innerHTML||e.cssText
r.dangerouslySetInnerHTML={p:t}}else r[n]=e[t]}),l.createElement(t,r)}),Y=(t,e,n=!0)=>{switch(t){case"title":return{toComponent:()=>((t,e,n)=>{const r=Q(n,{key:e,[N]:!0})
return[l.createElement("title",r,e)]})(0,e.title,e.titleAttributes),toString:()=>((t,e,n,r)=>{const i=K(n),o=W(e)
return i?`<${t} ${N}="true" ${i}>${X(o,r)}</${t}>`:`<${t} ${N}="true">${X(o,r)}</${t}>`})(t,e.title,e.titleAttributes,n)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Q(e),toString:()=>K(e)}
default:return{toComponent:()=>G(t,e),toString:()=>((t,e,n=!0)=>e.reduce((e,r)=>{const i=r,o=Object.keys(i).filter(t=>!("innerHTML"===t||"cssText"===t)).reduce((t,e)=>{const r=void 0===i[e]?e:`${e}="${X(i[e],n)}"`
return t?`${t} ${r}`:r},""),s=i.innerHTML||i.cssText||"",a=-1===J.indexOf(t)
return`${e}<${t} ${N}="true" ${o}${a?"/>":`>${s}</${t}>`}`},""))(t,e,n)}}},Z=t=>{const{baseTag:e,bodyAttributes:n,encode:r=!0,htmlAttributes:i,noscriptTags:o,styleTags:s,title:a="",titleAttributes:c,prioritizeSeoTags:l}=t
let{linkTags:d,metaTags:u,scriptTags:p}=t,m={toComponent:()=>{},toString:()=>""}
return l&&({priorityMethods:m,linkTags:d,metaTags:u,scriptTags:p}=(({metaTags:t,linkTags:e,scriptTags:n,encode:r})=>{const i=q(t,j),o=q(e,P),s=q(n,$)
return{priorityMethods:{toComponent:()=>[...G("meta",i.priority),...G("link",o.priority),...G("script",s.priority)],toString:()=>`${Y("meta",i.priority,r)} ${Y("link",o.priority,r)} ${Y("script",s.priority,r)}`},metaTags:i.default,linkTags:o.default,scriptTags:s.default}})(t)),{priority:m,base:Y("base",e,r),bodyAttributes:Y("bodyAttributes",n,r),htmlAttributes:Y("htmlAttributes",i,r),link:Y("link",d,r),meta:Y("meta",u,r),noscript:Y("noscript",o,r),script:Y("script",p,r),style:Y("style",s,r),title:Y("title",{title:a,titleAttributes:c},r)}},tt=[],et=!("undefined"==typeof window||!window.document||!window.document.createElement),nt=class{constructor(t,e){i(this,"instances",[]),i(this,"canUseDOM",et),i(this,"context"),i(this,"value",{setHelmet:t=>{this.context.helmet=t},helmetInstances:{get:()=>this.canUseDOM?tt:this.instances,add:t=>{(this.canUseDOM?tt:this.instances).push(t)},remove:t=>{const e=(this.canUseDOM?tt:this.instances).indexOf(t);(this.canUseDOM?tt:this.instances).splice(e,1)}}}),this.context=t,this.canUseDOM=e||!1,e||(t.helmet=Z({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},rt=l.createContext({}),it=(e=class extends c.Component{constructor(t){super(t),i(this,"helmetData"),this.helmetData=new nt(this.props.context||{},e.canUseDOM)}render(){return l.createElement(rt.Provider,{value:this.helmetData.value},this.props.children)}},i(e,"canUseDOM",et),e),ot=(t,e)=>{const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${t}[${N}]`),i=[].slice.call(r),o=[]
let s
return e&&e.length&&e.forEach(e=>{const n=document.createElement(t)
for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))if("innerHTML"===t)n.innerHTML=e.innerHTML
else if("cssText"===t)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText))
else{const r=t,i=void 0===e[r]?"":e[r]
n.setAttribute(t,i)}n.setAttribute(N,"true"),i.some((t,e)=>(s=e,n.isEqualNode(t)))?i.splice(s,1):o.push(n)}),i.forEach(t=>t.parentNode?.removeChild(t)),o.forEach(t=>n.appendChild(t)),{oldTags:i,newTags:o}},st=(t,e)=>{const n=document.getElementsByTagName(t)[0]
if(!n)return
const r=n.getAttribute(N),i=r?r.split(","):[],o=[...i],s=Object.keys(e)
for(const a of s){const t=e[a]||""
n.getAttribute(a)!==t&&n.setAttribute(a,t),-1===i.indexOf(a)&&i.push(a)
const r=o.indexOf(a);-1!==r&&o.splice(r,1)}for(let a=o.length-1;a>=0;a-=1)n.removeAttribute(o[a])
i.length===o.length?n.removeAttribute(N):n.getAttribute(N)!==s.join(",")&&n.setAttribute(N,s.join(","))},at=(t,e)=>{const{baseTag:n,bodyAttributes:r,htmlAttributes:i,linkTags:o,metaTags:s,noscriptTags:a,onChangeClientState:c,scriptTags:l,styleTags:d,title:u,titleAttributes:p}=t
st("body",r),st("html",i),((t,e)=>{void 0!==t&&document.title!==t&&(document.title=W(t)),st("title",e)})(u,p)
const m={baseTag:ot("base",n),linkTags:ot("link",o),metaTags:ot("meta",s),noscriptTags:ot("noscript",a),scriptTags:ot("script",l),styleTags:ot("style",d)},h={},f={}
Object.keys(m).forEach(t=>{const{newTags:e,oldTags:n}=m[t]
e.length&&(h[t]=e),n.length&&(f[t]=m[t].oldTags)}),e&&e(),c(t,h,f)},ct=null,lt=class extends c.Component{constructor(){super(...arguments),i(this,"rendered",!1)}shouldComponentUpdate(t){return!C(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context
t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:e}=this.props.context
let n=null
const r=(i=t.get().map(t=>{const e={...t.props}
return delete e.context,e}),{baseTag:L(["href"],i),bodyAttributes:U("bodyAttributes",i),defer:B(i,"defer"),encode:B(i,"encodeSpecialCharacters"),htmlAttributes:U("htmlAttributes",i),linkTags:z("link",["rel","href"],i),metaTags:z("meta",["name","charset","http-equiv","property","itemprop"],i),noscriptTags:z("noscript",["innerHTML"],i),onChangeClientState:R(i),scriptTags:z("script",["src","innerHTML"],i),styleTags:z("style",["cssText"],i),title:M(i),titleAttributes:U("titleAttributes",i),prioritizeSeoTags:H(i,"prioritizeSeoTags")})
var i,o
it.canUseDOM?(o=r,ct&&cancelAnimationFrame(ct),void(o.defer?ct=requestAnimationFrame(()=>{at(o,()=>{ct=null})}):(at(o),ct=null))):Z&&(n=Z(r)),e(n)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:t}=this.props.context
t.add(this),this.emitChange()}render(){return this.init(),null}},dt=(n=class extends c.Component{shouldComponentUpdate(t){return!x(V(this.props,"helmetData"),V(t,"helmetData"))}mapNestedChildrenToProps(t,e){if(!e)return null
switch(t.type){case"script":case"noscript":return{innerHTML:e}
case"style":return{cssText:e}
default:throw new Error(`<${t.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(t,e,n,r){return{...e,[t.type]:[...e[t.type]||[],{...n,...this.mapNestedChildrenToProps(t,r)}]}}mapObjectTypeChildren(t,e,n,r){switch(t.type){case"title":return{...e,[t.type]:r,titleAttributes:{...n}}
case"body":return{...e,bodyAttributes:{...n}}
case"html":return{...e,htmlAttributes:{...n}}
default:return{...e,[t.type]:{...n}}}}mapArrayTypeChildrenToProps(t,e){let n={...e}
return Object.keys(t).forEach(e=>{n={...n,[e]:t[e]}}),n}warnOnInvalidChildren(t,e){return O(I.some(e=>t.type===e),"function"==typeof t.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${I.join(", ")} are allowed. Helmet does not support rendering <${t.type}> elements. Refer to our API for more information.`),O(!e||"string"==typeof e||Array.isArray(e)&&!e.some(t=>"string"!=typeof t),`Helmet expects a string as a child of <${t.type}>. Did you forget to wrap your children in braces? ( <${t.type}>{\`\`}</${t.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,e){let n={}
return l.Children.forEach(t,t=>{if(!t||!t.props)return
const{children:r,...i}=t.props,o=Object.keys(i).reduce((t,e)=>(t[F[e]||e]=i[e],t),{})
let{type:s}=t
switch("symbol"==typeof s?s=s.toString():this.warnOnInvalidChildren(t,r),s){case"Symbol(react.fragment)":e=this.mapChildrenToProps(r,e)
break
case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(t,n,o,r)
break
default:e=this.mapObjectTypeChildren(t,e,o,r)}}),this.mapArrayTypeChildrenToProps(n,e)}render(){const{children:t,...e}=this.props
let n={...e},{helmetData:r}=e
return t&&(n=this.mapChildrenToProps(t,n)),!r||r instanceof nt||(r=new nt(r.context,!0),delete n.helmetData),r?l.createElement(lt,{...n,context:r.value}):l.createElement(rt.Consumer,null,t=>l.createElement(lt,{...n,context:t}))}},i(n,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),n)
class ut{constructor(t={}){this.config={failureThreshold:5,resetTimeout:3e4,monitoringPeriod:6e4,...t},this.stats={failures:0,successes:0,lastFailureTime:0,state:"CLOSED"},this.fallbackData=new Map,setInterval(()=>this.resetStats(),this.config.monitoringPeriod)}async execute(t,e,n){if("OPEN"===this.stats.state){if(!this.shouldAttemptReset())return void 0,this.getFallback(e,n)
this.stats.state="HALF_OPEN"}try{const n=await t()
return this.onSuccess(),e&&n&&this.fallbackData.set(e,n),n}catch(r){return this.onFailure(),this.getFallback(e,n)}}onSuccess(){this.stats.successes++,"HALF_OPEN"===this.stats.state&&(this.stats.state="CLOSED",this.stats.failures=0)}onFailure(){this.stats.failures++,this.stats.lastFailureTime=Date.now(),this.stats.failures>=this.config.failureThreshold&&(this.stats.state="OPEN")}shouldAttemptReset(){return Date.now()-this.stats.lastFailureTime>=this.config.resetTimeout}getFallback(t,e){if(t&&this.fallbackData.has(t))return void 0,this.fallbackData.get(t)
if(void 0!==e)return void 0,e
throw new Error("Circuit breaker is open and no fallback available")}resetStats(){"CLOSED"===this.stats.state&&(this.stats.failures=0,this.stats.successes=0)}getStatus(){return{state:this.stats.state,failures:this.stats.failures,successes:this.stats.successes,lastFailureTime:this.stats.lastFailureTime,config:this.config}}open(){this.stats.state="OPEN",this.stats.lastFailureTime=Date.now()}close(){this.stats.state="CLOSED",this.stats.failures=0}setFallback(t,e){this.fallbackData.set(t,e)}clearFallbacks(){this.fallbackData.clear()}}const pt=new ut({failureThreshold:3,resetTimeout:3e4,monitoringPeriod:6e4}),mt=new ut({failureThreshold:5,resetTimeout:15e3,monitoringPeriod:3e4}),ht=new class{constructor(){const t="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname
this.config={baseURL:t?"/api":"https://admin.b2b.click/api",timeout:1e4,retries:3,retryDelay:1e3,enableFallbacks:!0,enableCircuitBreaker:!0},this.fallbackCache=new Map}async fetchWithRetry(t,e={},n=1){const r=t.startsWith("http")?t:`${this.config.baseURL}${t}`,i={...e,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",...e.headers},credentials:"include"},o=new AbortController,s=setTimeout(()=>o.abort(),this.config.timeout)
i.signal=o.signal
try{void 0
const t=await fetch(r,i)
return clearTimeout(s),t}catch(a){if(clearTimeout(s),"AbortError"===a.name||"TypeError"===a.name&&a.message.includes("Failed to fetch"),n<this.config.retries){const r=this.config.retryDelay*n
return void 0,await new Promise(t=>setTimeout(t,r)),this.fetchWithRetry(t,e,n+1)}throw a}}async get(t){const e=`get:${t}`,n=t=>t.includes("/settings/seo")?{success:!0,settings:{default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",maintenance_mode:!1}}:t.includes("/maintenance-status")?{success:!0,maintenance_mode:!1,maintenance_message:"Service temporarily unavailable"}:null,r=async()=>{if(this.config.enableFallbacks&&this.fallbackCache.has(e)){const t=this.fallbackCache.get(e)
if(t.expires>Date.now())return void 0,{success:!0,data:t.data,cached:!0,fallback:!0}
this.fallbackCache.delete(e)}const n=await this.fetchWithRetry(t)
if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`)
const r=await n.json()
return this.config.enableFallbacks&&r.success&&this.fallbackCache.set(e,{data:r,expires:Date.now()+3e5}),{success:!0,data:r}}
if(this.config.enableCircuitBreaker)try{return await pt.execute(r,e,n(t))}catch(i){void 0
const e=n(t)
return e?{success:!0,data:e,fallback:!0}:{success:!1,error:i.message}}try{return await r()}catch(i){void 0
const e=n(t)
return e?{success:!0,data:e,fallback:!0}:{success:!1,error:i.message}}}async post(t,e){try{const n=await this.fetchWithRetry(t,{method:"POST",body:JSON.stringify(e)})
if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`)
return{success:!0,data:await n.json()}}catch(n){return void 0,{success:!1,error:n.message}}}async getSEOSettings(){return this.get("/settings/seo")}async getMaintenanceStatus(){return this.get("/settings/maintenance-status")}async trackAnalytics(t){const e=async()=>{if(navigator.sendBeacon){const e=`${this.config.baseURL}/analytics/track`,n=new Blob([JSON.stringify(t)],{type:"application/json"})
if(!navigator.sendBeacon(e,n))throw new Error("Beacon failed to send")
void 0}else await this.post("/analytics/track",t)}
try{this.config.enableCircuitBreaker?await mt.execute(e):await e()}catch(n){void 0}}clearCache(){this.fallbackCache.clear()}getCacheStats(){return{size:this.fallbackCache.size,keys:Array.from(this.fallbackCache.keys())}}},ft={default_title:"BOUNCE2BOUNCE - Premium Event Platform",default_description:"Discover and book premium events worldwide with BOUNCE2BOUNCE",default_keywords:"events, tickets, entertainment, concerts, festivals",default_author:"BOUNCE2BOUNCE",default_og_image:"/images/og-image.png",twitter_handle:"@bounce2bounce",google_analytics_id:"",google_search_console_id:""}
let gt=null,bt=0
const wt=async()=>{try{const t=Date.now(),e=t-bt
if(gt&&e<36e4)return void 0,e>288e3&&setTimeout(()=>async function(){try{return gt=null,bt=0,await wt()}catch(t){gt=oldCache,bt=oldTimestamp}}(),100),gt
void 0
const n=await ht.getSEOSettings()
if(!n.success)throw new Error(n.error||"Failed to fetch SEO settings")
const r=n.data
if(r.success&&r.settings)return gt={...ft,...r.settings},bt=t,gt
throw void 0,new Error("Invalid API response format")}catch(t){return gt?(void 0,gt):("AbortError"===t.name?void 0:t.message.includes("CORS")||t.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,ft)}},yt=async()=>{try{void 0
const t=await ht.getMaintenanceStatus()
if(!t.success)return void 0,{maintenance_mode:!1}
const e=t.data
return void 0!==e.success?(void 0,{maintenance_mode:e.maintenance_mode||!1,maintenance_message:e.maintenance_message||"We are currently performing scheduled maintenance.",estimated_downtime:e.estimated_downtime||"2 hours",contact_information:e.contact_information||"support@bounce2bounce.com"}):(void 0,{maintenance_mode:!1})}catch(t){return t.message.includes("CORS")||t.message.includes("Failed to fetch")?("localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,void 0):void 0,{maintenance_mode:!1}}},vt="seo_settings_cache",Tt=()=>{try{localStorage.removeItem(vt)}catch(t){void 0}},xt=t=>{try{const e={data:{default_title:t.default_title,default_description:t.default_description,default_og_image:t.default_og_image,twitter_handle:t.twitter_handle},timestamp:Date.now()},n=JSON.stringify(e)
n.length>5e4&&(void 0,Tt()),localStorage.setItem(vt,n)}catch(e){if("QuotaExceededError"===e.name){void 0,Tt()
try{const e={data:{default_title:t.default_title,default_description:t.default_description&&t.default_description.substring(0,200),default_og_image:t.default_og_image},timestamp:Date.now()}
localStorage.setItem(vt,JSON.stringify(e))}catch(n){void 0}}else void 0}},_t=c.createContext(),kt=({children:t})=>{const[e,n]=c.useState(ft),[r,i]=c.useState({maintenance_mode:!1}),[o,s]=c.useState(!0),[a,l]=c.useState(null),[d,u]=c.useState({isMobile:!1,deviceType:"unknown"}),p=async(t=!0)=>{try{if(s(!0),t){const t=(()=>{try{const t=localStorage.getItem(vt)
if(t){const{data:e,timestamp:n}=JSON.parse(t)
if(Date.now()-n<3e4)return void 0,e}}catch(t){void 0,Tt()}return null})()
if(t)return n(t),s(!1),m(),void 0}await m()}catch(e){void 0,n(ft)}finally{s(!1)}},m=async()=>{try{void 0
const[t,e]=await Promise.all([wt(),yt()])
n(t),i(e),l(new Date),xt(t)}catch(t){void 0}}
c.useEffect(()=>{const t=()=>{const t=window.innerWidth,e=navigator.userAgent||"",n=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),r=t<=768||n
let i="desktop"
r&&(i=t<=480?"mobile":"tablet"),u({isMobile:r,deviceType:i})}
return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),c.useEffect(()=>{p()},[]),c.useEffect(()=>{const t=setInterval(()=>{void 0,m()},3e5)
return()=>clearInterval(t)},[])
const h=c.useMemo(()=>e?(void 0,((t,e={})=>{const n={...ft,...t},{isMobile:r=!1}=e,i=(o=n.default_og_image)?o.startsWith("http")?o:o.startsWith("/uploads/")?`https://admin.b2b.click${o}`:`https://b2b.click${o}`:"https://admin.b2b.click/images/og-image.png"
var o
const s=[{name:"description",content:n.default_description},{name:"keywords",content:n.default_keywords},{name:"author",content:n.default_author},{name:"robots",content:"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},{name:"googlebot",content:"index, follow"},{property:"og:type",content:"website"},{property:"og:url",content:"https://b2b.click/"},{property:"og:title",content:n.default_title},{property:"og:description",content:n.default_description},{property:"og:image",content:i},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:image:alt",content:`${n.default_title} - Preview Image`},{property:"og:site_name",content:"BOUNCE2BOUNCE"},{property:"og:locale",content:"en_US"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:n.twitter_handle},{name:"twitter:creator",content:n.twitter_handle},{name:"twitter:url",content:"https://b2b.click/"},{name:"twitter:title",content:n.default_title},{name:"twitter:description",content:n.default_description},{name:"twitter:image",content:i},{name:"twitter:image:alt",content:`${n.default_title} - Preview Image`},{name:"theme-color",content:"#000000"},{name:"mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:"BOUNCE2BOUNCE"},{name:"application-name",content:"BOUNCE2BOUNCE"}]
return r&&s.push({name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"},{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"},{name:"apple-touch-fullscreen",content:"yes"},{name:"format-detection",content:"telephone=no"},{name:"mobile-web-app-capable",content:"yes"},{name:"theme-color",content:"#000000"}),{title:n.default_title,meta:s,link:[{rel:"canonical",href:"https://b2b.click/"}]}})(e,d)):{title:"BOUNCE2BOUNCE",meta:[],link:[]},[e,d]),f={seoSettings:e,maintenanceStatus:r,metaTags:h,isLoading:o,lastUpdated:a,deviceInfo:d,refreshSEOSettings:async()=>{void 0,await p(!1)},updateSEOSetting:(t,e)=>{n(n=>{const r={...n,[t]:e}
return xt(r),r}),l(new Date)},clearCache:()=>{Tt()},loadSEOSettings:p,isMaintenanceMode:()=>r.maintenance_mode}
return y.jsx(_t.Provider,{value:f,children:y.jsxs(it,{children:[y.jsxs(dt,{children:[y.jsx("title",{children:h.title}),h.meta.map((t,e)=>t.name?y.jsx("meta",{name:t.name,content:t.content},`meta-${e}`):t.property?y.jsx("meta",{property:t.property,content:t.content},`meta-${e}`):null),h.link.map((t,e)=>y.jsx("link",{...t},`link-${e}`))]}),t]})})},Ot=()=>{const t=c.useContext(_t)
if(!t)throw new Error("useSEO must be used within a SEOProvider")
return t},Et=()=>(Ot(),c.useState(!0),null),St=()=>{const{maintenanceStatus:t}=Ot(),[e,n]=c.useState(!1)
if(c.useEffect(()=>{const t=()=>{const t=window.innerWidth,e=navigator.userAgent||"",r=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
n(t<=768||r)}
return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),!t.maintenance_mode)return null
const r={position:"fixed",top:0,left:0,right:0,bottom:0,background:e?"linear-gradient(135deg, #000000 0%, #1a1a1a 100%)":"linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",zIndex:1e4,fontFamily:"Inter, sans-serif",textAlign:"center",padding:e?"20px":"40px",overflow:"hidden"},i={fontSize:e?"64px":"96px",marginBottom:e?"24px":"32px",filter:"drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"},o={fontSize:e?"28px":"48px",marginBottom:e?"16px":"24px",fontWeight:"700",background:"linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:"-0.02em"},s={fontSize:e?"16px":"20px",marginBottom:e?"24px":"32px",maxWidth:e?"320px":"600px",lineHeight:1.6,opacity:.9},a={fontSize:e?"14px":"18px",marginBottom:e?"20px":"24px",opacity:.8,padding:e?"8px 16px":"12px 24px",background:"rgba(255, 255, 255, 0.1)",borderRadius:e?"20px":"30px",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)"},l={fontSize:e?"12px":"16px",opacity:.6,marginTop:e?"20px":"32px"}
return y.jsxs("div",{style:r,children:[y.jsx("div",{style:i,children:"\ud83d\udd27"}),y.jsx("h1",{style:o,children:t.maintenance_title||"Site Under Maintenance"}),y.jsx("p",{style:s,children:t.maintenance_message||"We are currently performing scheduled maintenance. Please check back soon."}),t.estimated_downtime&&y.jsxs("div",{style:a,children:["Estimated downtime: ",t.estimated_downtime]}),t.contact_information&&y.jsxs("p",{style:l,children:["Questions? Contact us: ",t.contact_information]}),y.jsx("div",{style:{position:"absolute",top:"20%",left:"10%",width:e?"80px":"120px",height:e?"80px":"120px",background:"rgba(255, 255, 255, 0.05)",borderRadius:"50%",backdropFilter:"blur(20px)",border:"1px solid rgba(255, 255, 255, 0.1)",zIndex:-1}}),y.jsx("div",{style:{position:"absolute",bottom:"15%",right:"15%",width:e?"60px":"100px",height:e?"60px":"100px",background:"rgba(255, 255, 255, 0.03)",borderRadius:"50%",backdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.05)",zIndex:-1}})]})}
class Ct extends l.Component{constructor(t){super(t),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(t){return{hasError:!0}}componentDidCatch(t,e){void 0,this.setState({error:t,errorInfo:e}),window.analyticsBeacon&&window.analyticsBeacon.isEnabled()&&window.analyticsBeacon.sendEvent({event:"error_boundary_triggered",properties:{error_message:t.message,error_stack:t.stack,component_stack:e.componentStack}})}render(){return this.state.hasError?y.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:"#000",color:"#FFF",fontFamily:"Inter, sans-serif",padding:"20px",textAlign:"center"},children:[y.jsx("h2",{style:{marginBottom:"20px",color:"#FF453A"},children:"Something went wrong"}),y.jsx("p",{style:{marginBottom:"20px",opacity:.8},children:"We're sorry, but something unexpected happened. Please try refreshing the page."}),y.jsx("button",{onClick:()=>window.location.reload(),style:{background:"#319DFF",color:"#FFF",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"16px",cursor:"pointer",fontFamily:"Inter, sans-serif"},children:"Refresh Page"}),!1]}):this.props.children}}const At=c.lazy(()=>u(()=>import("./HomePage-4ZK8L9j3.js").then(t=>t.H),__vite__mapDeps([0,1,2,3,4,5,6]))),Pt=c.lazy(()=>u(()=>import("./AdminLoginFigma-CWYkvG3f.js"),__vite__mapDeps([7,1,2,6])));(async()=>{const[{initializeAnalytics:t},{initializeCleanup:e},{initializeMobileOptimizations:n}]=await Promise.all([u(()=>import("./beacon-r5K5QvzQ.js"),[]),u(()=>import("./cleanup-CAYISNkO.js"),[]),u(()=>import("./mobileOptimization-DxuCIEdC.js"),[])])
e(),n(),t({trackingId:"kutt-homepage",enableGDPR:!0,enableRealTime:!0,sessionTimeout:30,debug:!1}),u(()=>import("./memoryMonitor-B-PApq0Q.js"),[])})()
const $t=c.lazy(()=>u(()=>import("./AboutPage-2nMJXVlE.js").then(t=>t.A),__vite__mapDeps([8,1,2,3]))),jt=c.lazy(()=>u(()=>import("./ContactPage-D3fyAgt-.js"),__vite__mapDeps([9,1,2,3]))),It=()=>y.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px"},children:"Loading..."}),Dt=()=>{const[t,e]=c.useState(!1),[n,r]=c.useState(window.location.pathname)
c.useEffect(()=>{void 0},[n])
const i=c.useCallback(t=>{e(!0),setTimeout(()=>{window.history.pushState({},"",t),r(t),e(!1)},150)},[])
return c.useEffect(()=>(window.navigateWithTransition=i,()=>{delete window.navigateWithTransition}),[i]),c.useEffect(()=>{const t=()=>{r(window.location.pathname)}
return window.addEventListener("popstate",t),()=>window.removeEventListener("popstate",t)},[]),y.jsxs(kt,{children:[y.jsx(St,{}),(()=>{if(t)return y.jsx(It,{})
switch(n){case"/about":return y.jsx(c.Suspense,{fallback:y.jsx(It,{}),children:y.jsx($t,{})})
case"/contact":return y.jsx(c.Suspense,{fallback:y.jsx(It,{}),children:y.jsx(jt,{})})
case"/admin/login":return y.jsx(c.Suspense,{fallback:y.jsx(It,{}),children:y.jsx(Pt,{})})
default:return y.jsx(c.Suspense,{fallback:y.jsx(It,{}),children:y.jsx(At,{})})}})(),y.jsx(Et,{})]})},Ft=document.getElementById("root")
if(Ft)try{T.createRoot(Ft).render(l.createElement(Ct,null,l.createElement(Dt)))}catch(Nt){void 0}void document.addEventListener("securitypolicyviolation",e=>{const n={blockedURI:e.blockedURI,violatedDirective:e.violatedDirective,originalPolicy:e.originalPolicy,sourceFile:e.sourceFile,lineNumber:e.lineNumber,columnNumber:e.columnNumber,timestamp:(new Date).toISOString()}
void 0,"localhost"!==window.location.hostname&&t("/api/security/csp-violation",{method:"POST",body:JSON.stringify(n)}).catch(t=>{void 0})}),function(){if(window.top!==window.self){const t=[window.location.origin,"https://b2b.click","https://www.b2b.click"]
try{const e=window.parent.location.origin
t.includes(e)||(void 0,window.top.location=window.location)}catch(Nt){void 0,window.top.location=window.location}}}(),"localhost"!==window.location.hostname&&document.addEventListener("contextmenu",t=>{t.preventDefault()}),void("localhost"!==window.location.hostname&&document.addEventListener("keydown",t=>{("F12"===t.key||t.ctrlKey&&t.shiftKey&&"I"===t.key||t.ctrlKey&&t.shiftKey&&"C"===t.key||t.ctrlKey&&"U"===t.key)&&t.preventDefault()})),window.React=l,window.ReactApp=Dt
export{u as _,y as j,t as s,Ot as u}
