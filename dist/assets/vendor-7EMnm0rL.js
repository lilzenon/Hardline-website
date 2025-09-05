function t(){return d||(d=1,y.exports=function(){return m||(m=1,function(t){function e(t,e){var n=t.length
t.push(e)
t:for(;0<n;){var r=n-1>>>1,o=t[r]
if(!(0<i(o,e)))break t
t[r]=e,t[n]=o,n=r}}function n(t){return 0===t.length?null:t[0]}function r(t){if(0===t.length)return null
var e=t[0],n=t.pop()
if(n!==e){t[0]=n
t:for(var r=0,o=t.length,a=o>>>1;r<a;){var s=2*(r+1)-1,l=t[s],c=s+1,u=t[c]
if(0>i(l,n))c<o&&0>i(u,l)?(t[r]=u,t[c]=n,r=c):(t[r]=l,t[s]=n,r=s)
else{if(!(c<o&&0>i(u,n)))break t
t[r]=u,t[c]=n,r=c}}}return e}function i(t,e){var n=t.sortIndex-e.sortIndex
return 0!==n?n:t.id-e.id}function o(t){for(var i=n(g);null!==i;){if(null===i.callback)r(g)
else{if(!(i.startTime<=t))break
r(g),i.sortIndex=i.expirationTime,e(h,i)}i=n(g)}}function a(t){if(x=!1,o(t),!w)if(null!==n(h))w=!0,u(s)
else{var e=n(g)
null!==e&&f(a,e.startTime-t)}}function s(e,i){w=!1,x&&(x=!1,k(_),_=-1),T=!0
var s=v
try{for(o(i),b=n(h);null!==b&&(!(b.expirationTime>i)||e&&!l());){var c=b.callback
if("function"==typeof c){b.callback=null,v=b.priorityLevel
var u=c(b.expirationTime<=i)
i=t.unstable_now(),"function"==typeof u?b.callback=u:b===n(h)&&r(h),o(i)}else r(h)
b=n(h)}if(null!==b)var p=!0
else{var m=n(g)
null!==m&&f(a,m.startTime-i),p=!1}return p}finally{b=null,v=s,T=!1}}function l(){return!(t.unstable_now()-j<M)}function c(){if(null!==R){var e=t.unstable_now()
j=e
var n=!0
try{n=R(!0,e)}finally{n?E():(O=!1,R=null)}}else O=!1}function u(t){R=t,O||(O=!0,E())}function f(e,n){_=A(function(){e(t.unstable_now())},n)}if("object"==typeof performance&&"function"==typeof performance.now){var p=performance
t.unstable_now=function(){return p.now()}}else{var m=Date,d=m.now()
t.unstable_now=function(){return m.now()-d}}var h=[],g=[],y=1,b=null,v=3,T=!1,w=!1,x=!1,A="function"==typeof setTimeout?setTimeout:null,k="function"==typeof clearTimeout?clearTimeout:null,S="undefined"!=typeof setImmediate?setImmediate:null
"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling)
var E,O=!1,R=null,_=-1,M=5,j=-1
if("function"==typeof S)E=function(){S(c)}
else if("undefined"!=typeof MessageChannel){var C=new MessageChannel,z=C.port2
C.port1.onmessage=c,E=function(){z.postMessage(null)}}else E=function(){A(c,0)}
t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(t){t.callback=null},t.unstable_continueExecution=function(){w||T||(w=!0,u(s))},t.unstable_forceFrameRate=function(t){0>t||125<t?void 0:M=0<t?Math.floor(1e3/t):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(h)},t.unstable_next=function(t){switch(v){case 1:case 2:case 3:var e=3
break
default:e=v}var n=v
v=e
try{return t()}finally{v=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break
default:t=3}var n=v
v=t
try{return e()}finally{v=n}},t.unstable_scheduleCallback=function(r,i,o){var l=t.unstable_now()
switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?l+o:l,r){case 1:var c=-1
break
case 2:c=250
break
case 5:c=1073741823
break
case 4:c=1e4
break
default:c=5e3}return r={id:y++,callback:i,priorityLevel:r,startTime:o,expirationTime:c=o+c,sortIndex:-1},o>l?(r.sortIndex=o,e(g,r),null===n(h)&&r===n(g)&&(x?(k(_),_=-1):x=!0,f(a,o-l))):(r.sortIndex=c,e(h,r),w||T||(w=!0,u(s))),r},t.unstable_shouldYield=l,t.unstable_wrapCallback=function(t){var e=v
return function(){var n=v
v=e
try{return t.apply(this,arguments)}finally{v=n}}}}(b)),b}()),y.exports}function e(t){return function(e){e instanceof RegExp&&(e.lastIndex=0)
for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i]
return gt(t,e,r)}}function n(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:At
ct&&ct(t,null)
let r=e.length
for(;r--;){let i=e[r]
if("string"==typeof i){const t=n(i)
t!==i&&(ut(e)||(e[r]=t),i=t)}t[i]=!0}return t}function r(t){for(let e=0;e<t.length;e++)_t(t,e)||(t[e]=null)
return t}function i(t){const e=ht(null)
for(const[n,o]of lt(t))_t(t,n)&&(Array.isArray(o)?e[n]=r(o):o&&"object"==typeof o&&o.constructor===Object?e[n]=i(o):e[n]=o)
return e}function o(t,n){for(;null!==t;){const r=pt(t,n)
if(r){if(r.get)return e(r.get)
if("function"==typeof r.value)return e(r.value)}t=ft(t)}return function(){return null}}var a,s,l=Object.defineProperty,c=(t,e,n)=>((t,e,n)=>e in t?l(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n)(t,"symbol"!=typeof e?e+"":e,n)
import{g as u,r as f,R as p}from"./react-core-CelsEjp7.js"
var m,d,h,g,y={exports:{}},b={}
const v=u(function(){function t(o,a){if(o===a)return!0
if(o&&a&&"object"==typeof o&&"object"==typeof a){if(o.constructor!==a.constructor)return!1
var s,l,c,u
if(Array.isArray(o)){if((s=o.length)!=a.length)return!1
for(l=s;0!==l--;)if(!t(o[l],a[l]))return!1
return!0}if(n&&o instanceof Map&&a instanceof Map){if(o.size!==a.size)return!1
for(u=o.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1
for(u=o.entries();!(l=u.next()).done;)if(!t(l.value[1],a.get(l.value[0])))return!1
return!0}if(r&&o instanceof Set&&a instanceof Set){if(o.size!==a.size)return!1
for(u=o.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1
return!0}if(i&&ArrayBuffer.isView(o)&&ArrayBuffer.isView(a)){if((s=o.length)!=a.length)return!1
for(l=s;0!==l--;)if(o[l]!==a[l])return!1
return!0}if(o.constructor===RegExp)return o.source===a.source&&o.flags===a.flags
if(o.valueOf!==Object.prototype.valueOf&&"function"==typeof o.valueOf&&"function"==typeof a.valueOf)return o.valueOf()===a.valueOf()
if(o.toString!==Object.prototype.toString&&"function"==typeof o.toString&&"function"==typeof a.toString)return o.toString()===a.toString()
if((s=(c=Object.keys(o)).length)!==Object.keys(a).length)return!1
for(l=s;0!==l--;)if(!Object.prototype.hasOwnProperty.call(a,c[l]))return!1
if(e&&o instanceof Element)return!1
for(l=s;0!==l--;)if(("_owner"!==c[l]&&"__v"!==c[l]&&"__o"!==c[l]||!o.$$typeof)&&!t(o[c[l]],a[c[l]]))return!1
return!0}return o!=o&&a!=a}if(g)return h
g=1
var e="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView
return h=function(e,n){try{return t(e,n)}catch(r){if((r.message||"").match(/stack|recursion/i))return void 0,!1
throw r}}}())
var T,w
const x=u(function(){return w?T:(w=1,T=function(t,e,n,r,i,o,a,s){if(!t){var l
if(void 0===e)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.")
else{var c=[n,r,i,o,a,s],u=0;(l=new Error(e.replace(/%s/g,function(){return c[u++]}))).name="Invariant Violation"}throw l.framesToPop=1,l}})}())
var A,k
const S=u(function(){return k?A:(k=1,A=function(t,e,n,r){var i=n?n.call(r,t,e):void 0
if(void 0!==i)return!!i
if(t===e)return!0
if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1
var o=Object.keys(t),a=Object.keys(e)
if(o.length!==a.length)return!1
for(var s=Object.prototype.hasOwnProperty.bind(e),l=0;l<o.length;l++){var c=o[l]
if(!s(c))return!1
var u=t[c],f=e[c]
if(!1===(i=n?n.call(r,u,f,c):void 0)||void 0===i&&u!==f)return!1}return!0})}())
var E=(t=>(t.BASE="base",t.BODY="body",t.HEAD="head",t.HTML="html",t.LINK="link",t.META="meta",t.NOSCRIPT="noscript",t.SCRIPT="script",t.STYLE="style",t.TITLE="title",t.FRAGMENT="Symbol(react.fragment)",t))(E||{}),O={rel:["amphtml","canonical","alternate"]},R={type:["application/ld+json"]},_={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},M=Object.values(E),j={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},C=Object.entries(j).reduce((t,[e,n])=>(t[n]=e,t),{}),z="data-rh",D=(t,e)=>{for(let n=t.length-1;n>=0;n-=1){const r=t[n]
if(Object.prototype.hasOwnProperty.call(r,e))return r[e]}return null},$=t=>{let e=D(t,"title")
const n=D(t,"titleTemplate")
if(Array.isArray(e)&&(e=e.join("")),n&&e)return n.replace(/%s/g,()=>e)
const r=D(t,"defaultTitle")
return e||r||void 0},I=t=>D(t,"onChangeClientState")||(()=>{}),L=(t,e)=>e.filter(e=>void 0!==e[t]).map(e=>e[t]).reduce((t,e)=>({...t,...e}),{}),P=(t,e)=>e.filter(t=>void 0!==t.base).map(t=>t.base).reverse().reduce((e,n)=>{if(!e.length){const r=Object.keys(n)
for(let i=0;i<r.length;i+=1){const o=r[i].toLowerCase()
if(-1!==t.indexOf(o)&&n[o])return e.concat(n)}}return e},[]),F=(t,e,n)=>{const r={}
return n.filter(e=>!!Array.isArray(e[t])||(void 0!==e[t]&&(e[t],console&&"function"==typeof console.warn,0),!1)).map(e=>e[t]).reverse().reduce((t,n)=>{const i={}
n.filter(t=>{let n
const o=Object.keys(t)
for(let r=0;r<o.length;r+=1){const i=o[r],a=i.toLowerCase();-1===e.indexOf(a)||"rel"===n&&"canonical"===t[n].toLowerCase()||"rel"===a&&"stylesheet"===t[a].toLowerCase()||(n=a),-1===e.indexOf(i)||"innerHTML"!==i&&"cssText"!==i&&"itemprop"!==i||(n=i)}if(!n||!t[n])return!1
const a=t[n].toLowerCase()
return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][a]&&(i[n][a]=!0,!0)}).reverse().forEach(e=>t.push(e))
const o=Object.keys(i)
for(let e=0;e<o.length;e+=1){const t=o[e],n={...r[t],...i[t]}
r[t]=n}return t},[]).reverse()},N=(t,e)=>{if(Array.isArray(t)&&t.length)for(let n=0;n<t.length;n+=1)if(t[n][e])return!0
return!1},H=t=>Array.isArray(t)?t.join(""):t,U=(t,e)=>Array.isArray(t)?t.reduce((t,n)=>(((t,e)=>{const n=Object.keys(t)
for(let r=0;r<n.length;r+=1)if(e[n[r]]&&e[n[r]].includes(t[n[r]]))return!0
return!1})(n,e)?t.priority.push(n):t.default.push(n),t),{priority:[],default:[]}):{default:t,priority:[]},B=(t,e)=>({...t,[e]:void 0}),q=["noscript","script","style"],W=(t,e=!0)=>!1===e?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Y=t=>Object.keys(t).reduce((e,n)=>{const r=void 0!==t[n]?`${n}="${t[n]}"`:`${n}`
return e?`${e} ${r}`:r},""),X=(t,e={})=>Object.keys(t).reduce((e,n)=>(e[j[n]||n]=t[n],e),e),G=(t,e)=>e.map((e,n)=>{const r={key:n,[z]:!0}
return Object.keys(e).forEach(t=>{const n=j[t]||t
if("innerHTML"===n||"cssText"===n){const t=e.innerHTML||e.cssText
r.dangerouslySetInnerHTML={t:t}}else r[n]=e[t]}),p.createElement(t,r)}),K=(t,e,n=!0)=>{switch(t){case"title":return{toComponent:()=>((t,e,n)=>{const r=X(n,{key:e,[z]:!0})
return[p.createElement("title",r,e)]})(0,e.title,e.titleAttributes),toString:()=>((t,e,n,r)=>{const i=Y(n),o=H(e)
return i?`<${t} ${z}="true" ${i}>${W(o,r)}</${t}>`:`<${t} ${z}="true">${W(o,r)}</${t}>`})(t,e.title,e.titleAttributes,n)}
case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>X(e),toString:()=>Y(e)}
default:return{toComponent:()=>G(t,e),toString:()=>((t,e,n=!0)=>e.reduce((e,r)=>{const i=r,o=Object.keys(i).filter(t=>!("innerHTML"===t||"cssText"===t)).reduce((t,e)=>{const r=void 0===i[e]?e:`${e}="${W(i[e],n)}"`
return t?`${t} ${r}`:r},""),a=i.innerHTML||i.cssText||"",s=-1===q.indexOf(t)
return`${e}<${t} ${z}="true" ${o}${s?"/>":`>${a}</${t}>`}`},""))(t,e,n)}}},V=t=>{const{baseTag:e,bodyAttributes:n,encode:r=!0,htmlAttributes:i,noscriptTags:o,styleTags:a,title:s="",titleAttributes:l,prioritizeSeoTags:c}=t
let{linkTags:u,metaTags:f,scriptTags:p}=t,m={toComponent:()=>{},toString:()=>""}
return c&&({priorityMethods:m,linkTags:u,metaTags:f,scriptTags:p}=(({metaTags:t,linkTags:e,scriptTags:n,encode:r})=>{const i=U(t,_),o=U(e,O),a=U(n,R)
return{priorityMethods:{toComponent:()=>[...G("meta",i.priority),...G("link",o.priority),...G("script",a.priority)],toString:()=>`${K("meta",i.priority,r)} ${K("link",o.priority,r)} ${K("script",a.priority,r)}`},metaTags:i.default,linkTags:o.default,scriptTags:a.default}})(t)),{priority:m,base:K("base",e,r),bodyAttributes:K("bodyAttributes",n,r),htmlAttributes:K("htmlAttributes",i,r),link:K("link",u,r),meta:K("meta",f,r),noscript:K("noscript",o,r),script:K("script",p,r),style:K("style",a,r),title:K("title",{title:s,titleAttributes:l},r)}},J=[],Q=!("undefined"==typeof window||!window.document||!window.document.createElement),Z=class{constructor(t,e){c(this,"instances",[]),c(this,"canUseDOM",Q),c(this,"context"),c(this,"value",{setHelmet:t=>{this.context.helmet=t},helmetInstances:{get:()=>this.canUseDOM?J:this.instances,add:t=>{(this.canUseDOM?J:this.instances).push(t)},remove:t=>{const e=(this.canUseDOM?J:this.instances).indexOf(t);(this.canUseDOM?J:this.instances).splice(e,1)}}}),this.context=t,this.canUseDOM=e||!1,e||(t.helmet=V({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},tt=p.createContext({}),et=(a=class extends f.Component{constructor(t){super(t),c(this,"helmetData"),this.helmetData=new Z(this.props.context||{},a.canUseDOM)}render(){return p.createElement(tt.Provider,{value:this.helmetData.value},this.props.children)}},c(a,"canUseDOM",Q),a),nt=(t,e)=>{const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${t}[${z}]`),i=[].slice.call(r),o=[]
let a
return e&&e.length&&e.forEach(e=>{const n=document.createElement(t)
for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))if("innerHTML"===t)n.innerHTML=e.innerHTML
else if("cssText"===t)n.styleSheet?n.styleSheet.cssText=e.cssText:n.appendChild(document.createTextNode(e.cssText))
else{const r=t,i=void 0===e[r]?"":e[r]
n.setAttribute(t,i)}n.setAttribute(z,"true"),i.some((t,e)=>(a=e,n.isEqualNode(t)))?i.splice(a,1):o.push(n)}),i.forEach(t=>t.parentNode?.removeChild(t)),o.forEach(t=>n.appendChild(t)),{oldTags:i,newTags:o}},rt=(t,e)=>{const n=document.getElementsByTagName(t)[0]
if(!n)return
const r=n.getAttribute(z),i=r?r.split(","):[],o=[...i],a=Object.keys(e)
for(const s of a){const t=e[s]||""
n.getAttribute(s)!==t&&n.setAttribute(s,t),-1===i.indexOf(s)&&i.push(s)
const r=o.indexOf(s);-1!==r&&o.splice(r,1)}for(let s=o.length-1;s>=0;s-=1)n.removeAttribute(o[s])
i.length===o.length?n.removeAttribute(z):n.getAttribute(z)!==a.join(",")&&n.setAttribute(z,a.join(","))},it=(t,e)=>{const{baseTag:n,bodyAttributes:r,htmlAttributes:i,linkTags:o,metaTags:a,noscriptTags:s,onChangeClientState:l,scriptTags:c,styleTags:u,title:f,titleAttributes:p}=t
rt("body",r),rt("html",i),((t,e)=>{void 0!==t&&document.title!==t&&(document.title=H(t)),rt("title",e)})(f,p)
const m={baseTag:nt("base",n),linkTags:nt("link",o),metaTags:nt("meta",a),noscriptTags:nt("noscript",s),scriptTags:nt("script",c),styleTags:nt("style",u)},d={},h={}
Object.keys(m).forEach(t=>{const{newTags:e,oldTags:n}=m[t]
e.length&&(d[t]=e),n.length&&(h[t]=m[t].oldTags)}),e&&e(),l(t,d,h)},ot=null,at=class extends f.Component{constructor(){super(...arguments),c(this,"rendered",!1)}shouldComponentUpdate(t){return!S(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context
t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:e}=this.props.context
let n=null
const r=(i=t.get().map(t=>{const e={...t.props}
return delete e.context,e}),{baseTag:P(["href"],i),bodyAttributes:L("bodyAttributes",i),defer:D(i,"defer"),encode:D(i,"encodeSpecialCharacters"),htmlAttributes:L("htmlAttributes",i),linkTags:F("link",["rel","href"],i),metaTags:F("meta",["name","charset","http-equiv","property","itemprop"],i),noscriptTags:F("noscript",["innerHTML"],i),onChangeClientState:I(i),scriptTags:F("script",["src","innerHTML"],i),styleTags:F("style",["cssText"],i),title:$(i),titleAttributes:L("titleAttributes",i),prioritizeSeoTags:N(i,"prioritizeSeoTags")})
var i,o
et.canUseDOM?(o=r,ot&&cancelAnimationFrame(ot),void(o.defer?ot=requestAnimationFrame(()=>{it(o,()=>{ot=null})}):(it(o),ot=null))):V&&(n=V(r)),e(n)}init(){if(this.rendered)return
this.rendered=!0
const{helmetInstances:t}=this.props.context
t.add(this),this.emitChange()}render(){return this.init(),null}},st=(s=class extends f.Component{shouldComponentUpdate(t){return!v(B(this.props,"helmetData"),B(t,"helmetData"))}mapNestedChildrenToProps(t,e){if(!e)return null
switch(t.type){case"script":case"noscript":return{innerHTML:e}
case"style":return{cssText:e}
default:throw new Error(`<${t.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(t,e,n,r){return{...e,[t.type]:[...e[t.type]||[],{...n,...this.mapNestedChildrenToProps(t,r)}]}}mapObjectTypeChildren(t,e,n,r){switch(t.type){case"title":return{...e,[t.type]:r,titleAttributes:{...n}}
case"body":return{...e,bodyAttributes:{...n}}
case"html":return{...e,htmlAttributes:{...n}}
default:return{...e,[t.type]:{...n}}}}mapArrayTypeChildrenToProps(t,e){let n={...e}
return Object.keys(t).forEach(e=>{n={...n,[e]:t[e]}}),n}warnOnInvalidChildren(t,e){return x(M.some(e=>t.type===e),"function"==typeof t.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${M.join(", ")} are allowed. Helmet does not support rendering <${t.type}> elements. Refer to our API for more information.`),x(!e||"string"==typeof e||Array.isArray(e)&&!e.some(t=>"string"!=typeof t),`Helmet expects a string as a child of <${t.type}>. Did you forget to wrap your children in braces? ( <${t.type}>{\`\`}</${t.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,e){let n={}
return p.Children.forEach(t,t=>{if(!t||!t.props)return
const{children:r,...i}=t.props,o=Object.keys(i).reduce((t,e)=>(t[C[e]||e]=i[e],t),{})
let{type:a}=t
switch("symbol"==typeof a?a=a.toString():this.warnOnInvalidChildren(t,r),a){case"Symbol(react.fragment)":e=this.mapChildrenToProps(r,e)
break
case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(t,n,o,r)
break
default:e=this.mapObjectTypeChildren(t,e,o,r)}}),this.mapArrayTypeChildrenToProps(n,e)}render(){const{children:t,...e}=this.props
let n={...e},{helmetData:r}=e
return t&&(n=this.mapChildrenToProps(t,n)),!r||r instanceof Z||(r=new Z(r.context,!0),delete n.helmetData),r?p.createElement(at,{...n,context:r.value}):p.createElement(tt.Consumer,null,t=>p.createElement(at,{...n,context:t}))}},c(s,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),s)
const{entries:lt,setPrototypeOf:ct,isFrozen:ut,getPrototypeOf:ft,getOwnPropertyDescriptor:pt}=Object
let{freeze:mt,seal:dt,create:ht}=Object,{apply:gt,construct:yt}="undefined"!=typeof Reflect&&Reflect
mt||(mt=function(t){return t}),dt||(dt=function(t){return t}),gt||(gt=function(t,e,n){return t.apply(e,n)}),yt||(yt=function(t,e){return new t(...e)})
const bt=e(Array.prototype.forEach),vt=e(Array.prototype.lastIndexOf),Tt=e(Array.prototype.pop),wt=e(Array.prototype.push),xt=e(Array.prototype.splice),At=e(String.prototype.toLowerCase),kt=e(String.prototype.toString),St=e(String.prototype.match),Et=e(String.prototype.replace),Ot=e(String.prototype.indexOf),Rt=e(String.prototype.trim),_t=e(Object.prototype.hasOwnProperty),Mt=e(RegExp.prototype.test),jt=(Ct=TypeError,function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n]
return yt(Ct,e)})
var Ct
const zt=mt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Dt=mt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),$t=mt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),It=mt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Lt=mt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Pt=mt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ft=mt(["#text"]),Nt=mt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ht=mt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ut=mt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Bt=mt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qt=dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Wt=dt(/<%[\w\W]*|[\w\W]*%>/gm),Yt=dt(/\$\{[\w\W]*/gm),Xt=dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gt=dt(/^aria-[\-\w]+$/),Kt=dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vt=dt(/^(?:\w+script|data):/i),Jt=dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qt=dt(/^html$/i),Zt=dt(/^[a-z][.\w]*(-[.\w]+)+$/i)
var te=Object.freeze({__proto__:null,ARIA_ATTR:Gt,ATTR_WHITESPACE:Jt,CUSTOM_ELEMENT:Zt,DATA_ATTR:Xt,DOCTYPE_NAME:Qt,ERB_EXPR:Wt,IS_ALLOWED_URI:Kt,IS_SCRIPT_OR_DATA:Vt,MUSTACHE_EXPR:qt,TMPLIT_EXPR:Yt}),ee=function t(){function e(t,e,n){bt(t,t=>{t.call(a,e,n,le)})}let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"undefined"==typeof window?null:window
const a=e=>t(e)
if(a.version="3.2.6",a.removed=[],!r||!r.document||9!==r.document.nodeType||!r.Element)return a.isSupported=!1,a
let{document:s}=r
const l=s,c=l.currentScript,{DocumentFragment:u,HTMLTemplateElement:f,Node:p,Element:m,NodeFilter:d,NamedNodeMap:h=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:g,DOMParser:y,trustedTypes:b}=r,v=m.prototype,T=o(v,"cloneNode"),w=o(v,"remove"),x=o(v,"nextSibling"),A=o(v,"childNodes"),k=o(v,"parentNode")
if("function"==typeof f){const t=s.createElement("template")
t.content&&t.content.ownerDocument&&(s=t.content.ownerDocument)}let S,E=""
const{implementation:O,createNodeIterator:R,createDocumentFragment:_,getElementsByTagName:M}=s,{importNode:j}=l
let C={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}
a.isSupported="function"==typeof lt&&"function"==typeof k&&O&&void 0!==O.createHTMLDocument
const{MUSTACHE_EXPR:z,ERB_EXPR:D,TMPLIT_EXPR:$,DATA_ATTR:I,ARIA_ATTR:L,IS_SCRIPT_OR_DATA:P,ATTR_WHITESPACE:F,CUSTOM_ELEMENT:N}=te
let{IS_ALLOWED_URI:H}=te,U=null
const B=n({},[...zt,...Dt,...$t,...Lt,...Ft])
let q=null
const W=n({},[...Nt,...Ht,...Ut,...Bt])
let Y=Object.seal(ht(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),X=null,G=null,K=!0,V=!0,J=!1,Q=!0,Z=!1,tt=!0,et=!1,nt=!1,rt=!1,it=!1,ot=!1,at=!1,st=!0,ct=!1,ut=!0,ft=!1,pt={},dt=null
const gt=n({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"])
let yt=null
const Ct=n({},["audio","video","img","source","image","track"])
let qt=null
const Wt=n({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Yt="http://www.w3.org/1998/Math/MathML",Xt="http://www.w3.org/2000/svg",Gt="http://www.w3.org/1999/xhtml"
let Vt=Gt,Jt=!1,Zt=null
const ee=n({},[Yt,Xt,Gt],kt)
let ne=n({},["mi","mo","mn","ms","mtext"]),re=n({},["annotation-xml"])
const ie=n({},["title","style","font","a","script"])
let oe=null
const ae=["application/xhtml+xml","text/html"]
let se=null,le=null
const ce=s.createElement("form"),ue=function(t){return t instanceof RegExp||t instanceof Function},fe=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
if(!le||le!==t){if(t&&"object"==typeof t||(t={}),t=i(t),oe=-1===ae.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE,se="application/xhtml+xml"===oe?kt:At,U=_t(t,"ALLOWED_TAGS")?n({},t.ALLOWED_TAGS,se):B,q=_t(t,"ALLOWED_ATTR")?n({},t.ALLOWED_ATTR,se):W,Zt=_t(t,"ALLOWED_NAMESPACES")?n({},t.ALLOWED_NAMESPACES,kt):ee,qt=_t(t,"ADD_URI_SAFE_ATTR")?n(i(Wt),t.ADD_URI_SAFE_ATTR,se):Wt,yt=_t(t,"ADD_DATA_URI_TAGS")?n(i(Ct),t.ADD_DATA_URI_TAGS,se):Ct,dt=_t(t,"FORBID_CONTENTS")?n({},t.FORBID_CONTENTS,se):gt,X=_t(t,"FORBID_TAGS")?n({},t.FORBID_TAGS,se):i({}),G=_t(t,"FORBID_ATTR")?n({},t.FORBID_ATTR,se):i({}),pt=!!_t(t,"USE_PROFILES")&&t.USE_PROFILES,K=!1!==t.ALLOW_ARIA_ATTR,V=!1!==t.ALLOW_DATA_ATTR,J=t.ALLOW_UNKNOWN_PROTOCOLS||!1,Q=!1!==t.ALLOW_SELF_CLOSE_IN_ATTR,Z=t.SAFE_FOR_TEMPLATES||!1,tt=!1!==t.SAFE_FOR_XML,et=t.WHOLE_DOCUMENT||!1,it=t.RETURN_DOM||!1,ot=t.RETURN_DOM_FRAGMENT||!1,at=t.RETURN_TRUSTED_TYPE||!1,rt=t.FORCE_BODY||!1,st=!1!==t.SANITIZE_DOM,ct=t.SANITIZE_NAMED_PROPS||!1,ut=!1!==t.KEEP_CONTENT,ft=t.IN_PLACE||!1,H=t.ALLOWED_URI_REGEXP||Kt,Vt=t.NAMESPACE||Gt,ne=t.MATHML_TEXT_INTEGRATION_POINTS||ne,re=t.HTML_INTEGRATION_POINTS||re,Y=t.CUSTOM_ELEMENT_HANDLING||{},t.CUSTOM_ELEMENT_HANDLING&&ue(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Y.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&ue(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Y.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Y.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Z&&(V=!1),ot&&(it=!0),pt&&(U=n({},Ft),q=[],!0===pt.html&&(n(U,zt),n(q,Nt)),!0===pt.svg&&(n(U,Dt),n(q,Ht),n(q,Bt)),!0===pt.svgFilters&&(n(U,$t),n(q,Ht),n(q,Bt)),!0===pt.mathMl&&(n(U,Lt),n(q,Ut),n(q,Bt))),t.ADD_TAGS&&(U===B&&(U=i(U)),n(U,t.ADD_TAGS,se)),t.ADD_ATTR&&(q===W&&(q=i(q)),n(q,t.ADD_ATTR,se)),t.ADD_URI_SAFE_ATTR&&n(qt,t.ADD_URI_SAFE_ATTR,se),t.FORBID_CONTENTS&&(dt===gt&&(dt=i(dt)),n(dt,t.FORBID_CONTENTS,se)),ut&&(U["#text"]=!0),et&&n(U,["html","head","body"]),U.table&&(n(U,["tbody"]),delete X.tbody),t.TRUSTED_TYPES_POLICY){if("function"!=typeof t.TRUSTED_TYPES_POLICY.createHTML)throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.')
if("function"!=typeof t.TRUSTED_TYPES_POLICY.createScriptURL)throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.')
S=t.TRUSTED_TYPES_POLICY,E=S.createHTML("")}else void 0===S&&(S=function(t,e){if("object"!=typeof t||"function"!=typeof t.createPolicy)return null
let n=null
const r="data-tt-policy-suffix"
e&&e.hasAttribute(r)&&(n=e.getAttribute(r))
const i="dompurify"+(n?"#"+n:"")
try{return t.createPolicy(i,{createHTML:t=>t,createScriptURL:t=>t})}catch(o){return void 0,null}}(b,c)),null!==S&&"string"==typeof E&&(E=S.createHTML(""))
mt&&mt(t),le=t}},pe=n({},[...Dt,...$t,...It]),me=n({},[...Lt,...Pt]),de=function(t){wt(a.removed,{element:t})
try{k(t).removeChild(t)}catch(e){w(t)}},he=function(t,e){try{wt(a.removed,{attribute:e.getAttributeNode(t),from:e})}catch(n){wt(a.removed,{attribute:null,from:e})}if(e.removeAttribute(t),"is"===t)if(it||ot)try{de(e)}catch(n){}else try{e.setAttribute(t,"")}catch(n){}},ge=function(t){let e=null,n=null
if(rt)t="<remove></remove>"+t
else{const e=St(t,/^[\r\n\t ]+/)
n=e&&e[0]}"application/xhtml+xml"===oe&&Vt===Gt&&(t='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+t+"</body></html>")
const r=S?S.createHTML(t):t
if(Vt===Gt)try{e=(new y).parseFromString(r,oe)}catch(o){}if(!e||!e.documentElement){e=O.createDocument(Vt,"template",null)
try{e.documentElement.innerHTML=Jt?E:r}catch(o){}}const i=e.body||e.documentElement
return t&&n&&i.insertBefore(s.createTextNode(n),i.childNodes[0]||null),Vt===Gt?M.call(e,et?"html":"body")[0]:et?e.documentElement:i},ye=function(t){return R.call(t.ownerDocument||t,t,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},be=function(t){return t instanceof g&&("string"!=typeof t.nodeName||"string"!=typeof t.textContent||"function"!=typeof t.removeChild||!(t.attributes instanceof h)||"function"!=typeof t.removeAttribute||"function"!=typeof t.setAttribute||"string"!=typeof t.namespaceURI||"function"!=typeof t.insertBefore||"function"!=typeof t.hasChildNodes)},ve=function(t){return"function"==typeof p&&t instanceof p},Te=function(t){let n=null
if(e(C.beforeSanitizeElements,t,null),be(t))return de(t),!0
const r=se(t.nodeName)
if(e(C.uponSanitizeElement,t,{tagName:r,allowedTags:U}),tt&&t.hasChildNodes()&&!ve(t.firstElementChild)&&Mt(/<[/\w!]/g,t.innerHTML)&&Mt(/<[/\w!]/g,t.textContent))return de(t),!0
if(7===t.nodeType)return de(t),!0
if(tt&&8===t.nodeType&&Mt(/<[/\w]/g,t.data))return de(t),!0
if(!U[r]||X[r]){if(!X[r]&&xe(r)){if(Y.tagNameCheck instanceof RegExp&&Mt(Y.tagNameCheck,r))return!1
if(Y.tagNameCheck instanceof Function&&Y.tagNameCheck(r))return!1}if(ut&&!dt[r]){const e=k(t)||t.parentNode,n=A(t)||t.childNodes
if(n&&e)for(let r=n.length-1;r>=0;--r){const i=T(n[r],!0)
i.i=(t.i||0)+1,e.insertBefore(i,x(t))}}return de(t),!0}return t instanceof m&&!function(t){let e=k(t)
e&&e.tagName||(e={namespaceURI:Vt,tagName:"template"})
const n=At(t.tagName),r=At(e.tagName)
return!!Zt[t.namespaceURI]&&(t.namespaceURI===Xt?e.namespaceURI===Gt?"svg"===n:e.namespaceURI===Yt?"svg"===n&&("annotation-xml"===r||ne[r]):Boolean(pe[n]):t.namespaceURI===Yt?e.namespaceURI===Gt?"math"===n:e.namespaceURI===Xt?"math"===n&&re[r]:Boolean(me[n]):t.namespaceURI===Gt?!(e.namespaceURI===Xt&&!re[r])&&!(e.namespaceURI===Yt&&!ne[r])&&!me[n]&&(ie[n]||!pe[n]):!("application/xhtml+xml"!==oe||!Zt[t.namespaceURI]))}(t)?(de(t),!0):"noscript"!==r&&"noembed"!==r&&"noframes"!==r||!Mt(/<\/no(script|embed|frames)/i,t.innerHTML)?(Z&&3===t.nodeType&&(n=t.textContent,bt([z,D,$],t=>{n=Et(n,t," ")}),t.textContent!==n&&(wt(a.removed,{element:t.cloneNode()}),t.textContent=n)),e(C.afterSanitizeElements,t,null),!1):(de(t),!0)},we=function(t,e,n){if(st&&("id"===e||"name"===e)&&(n in s||n in ce))return!1
if(V&&!G[e]&&Mt(I,e));else if(K&&Mt(L,e));else if(!q[e]||G[e]){if(!(xe(t)&&(Y.tagNameCheck instanceof RegExp&&Mt(Y.tagNameCheck,t)||Y.tagNameCheck instanceof Function&&Y.tagNameCheck(t))&&(Y.attributeNameCheck instanceof RegExp&&Mt(Y.attributeNameCheck,e)||Y.attributeNameCheck instanceof Function&&Y.attributeNameCheck(e))||"is"===e&&Y.allowCustomizedBuiltInElements&&(Y.tagNameCheck instanceof RegExp&&Mt(Y.tagNameCheck,n)||Y.tagNameCheck instanceof Function&&Y.tagNameCheck(n))))return!1}else if(qt[e]);else if(Mt(H,Et(n,F,"")));else if("src"!==e&&"xlink:href"!==e&&"href"!==e||"script"===t||0!==Ot(n,"data:")||!yt[t])if(J&&!Mt(P,Et(n,F,"")));else if(n)return!1
return!0},xe=function(t){return"annotation-xml"!==t&&St(t,N)},Ae=function(t){e(C.beforeSanitizeAttributes,t,null)
const{attributes:n}=t
if(!n||be(t))return
const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:q,forceKeepAttr:void 0}
let i=n.length
for(;i--;){const s=n[i],{name:l,namespaceURI:c,value:u}=s,f=se(l),p=u
let m="value"===l?p:Rt(p)
if(r.attrName=f,r.attrValue=m,r.keepAttr=!0,r.forceKeepAttr=void 0,e(C.uponSanitizeAttribute,t,r),m=r.attrValue,!ct||"id"!==f&&"name"!==f||(he(l,t),m="user-content-"+m),tt&&Mt(/((--!?|])>)|<\/(style|title)/i,m)){he(l,t)
continue}if(r.forceKeepAttr)continue
if(!r.keepAttr){he(l,t)
continue}if(!Q&&Mt(/\/>/i,m)){he(l,t)
continue}Z&&bt([z,D,$],t=>{m=Et(m,t," ")})
const d=se(t.nodeName)
if(we(d,f,m)){if(S&&"object"==typeof b&&"function"==typeof b.getAttributeType)if(c);else switch(b.getAttributeType(d,f)){case"TrustedHTML":m=S.createHTML(m)
break
case"TrustedScriptURL":m=S.createScriptURL(m)}if(m!==p)try{c?t.setAttributeNS(c,l,m):t.setAttribute(l,m),be(t)?de(t):Tt(a.removed)}catch(o){he(l,t)}}else he(l,t)}e(C.afterSanitizeAttributes,t,null)},ke=function t(n){let r=null
const i=ye(n)
for(e(C.beforeSanitizeShadowDOM,n,null);r=i.nextNode();)e(C.uponSanitizeShadowNode,r,null),Te(r),Ae(r),r.content instanceof u&&t(r.content)
e(C.afterSanitizeShadowDOM,n,null)}
return a.sanitize=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,i=null,o=null
if(Jt=!t,Jt&&(t="\x3c!--\x3e"),"string"!=typeof t&&!ve(t)){if("function"!=typeof t.toString)throw jt("toString is not a function")
if("string"!=typeof(t=t.toString()))throw jt("dirty is not a string, aborting")}if(!a.isSupported)return t
if(nt||fe(e),a.removed=[],"string"==typeof t&&(ft=!1),ft){if(t.nodeName){const e=se(t.nodeName)
if(!U[e]||X[e])throw jt("root node is forbidden and cannot be sanitized in-place")}}else if(t instanceof p)n=ge("\x3c!----\x3e"),r=n.ownerDocument.importNode(t,!0),1===r.nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r)
else{if(!it&&!Z&&!et&&-1===t.indexOf("<"))return S&&at?S.createHTML(t):t
if(n=ge(t),!n)return it?null:at?E:""}n&&rt&&de(n.firstChild)
const s=ye(ft?t:n)
for(;i=s.nextNode();)Te(i),Ae(i),i.content instanceof u&&ke(i.content)
if(ft)return t
if(it){if(ot)for(o=_.call(n.ownerDocument);n.firstChild;)o.appendChild(n.firstChild)
else o=n
return(q.shadowroot||q.shadowrootmode)&&(o=j.call(l,o,!0)),o}let c=et?n.outerHTML:n.innerHTML
return et&&U["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&Mt(Qt,n.ownerDocument.doctype.name)&&(c="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+c),Z&&bt([z,D,$],t=>{c=Et(c,t," ")}),S&&at?S.createHTML(c):c},a.setConfig=function(){fe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),nt=!0},a.clearConfig=function(){le=null,nt=!1},a.isValidAttribute=function(t,e,n){le||fe({})
const r=se(t),i=se(e)
return we(r,i,n)},a.addHook=function(t,e){"function"==typeof e&&wt(C[t],e)},a.removeHook=function(t,e){if(void 0!==e){const n=vt(C[t],e)
return-1===n?void 0:xt(C[t],n,1)[0]}return Tt(C[t])},a.removeHooks=function(t){C[t]=[]},a.removeAllHooks=function(){C={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},a}()
export{et as H,st as a,ee as p,t as r}
