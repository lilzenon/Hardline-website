function t(t){return t&&"string"==typeof t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):""}function o(o,r=s){if(!o||"string"!=typeof o)return""
if(i)try{return i.sanitize(o,r)}catch(n){return void 0,t(o)}return(async()=>{if(!i){const t=await e(()=>import("./security-DJSf2YwI.js"),[])
i=t.default}return i})().then(t=>{void 0}).catch(t=>{void 0}),t(o)}function r(t){return o(t,_)}function n(t,r={}){const n={}
return Object.keys(t).forEach(e=>{const i=t[e],s=r[e]||_
"string"==typeof i?n[e]=o(i,s):Array.isArray(i)?n[e]=i.map(t=>"string"==typeof t?o(t,s):t):n[e]=i}),n}import{_ as e}from"./index-BITNQT_Q.js"
let i=null
const s={ALLOWED_TAGS:["p","br","strong","em","u","i","b","span","div","h1","h2","h3","h4","h5","h6","ul","ol","li","a","img","blockquote","code","pre"],ALLOWED_ATTR:["href","title","alt","src","width","height","class","id","style"],ALLOWED_URI_REGEXP:/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,FORBID_TAGS:["script","object","embed","form","input","textarea","select","button"],FORBID_ATTR:["onerror","onload","onclick","onmouseover","onfocus","onblur"],KEEP_CONTENT:!0,RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1,RETURN_DOM_IMPORT:!1,SANITIZE_DOM:!0,WHOLE_DOCUMENT:!1,FORCE_BODY:!1},_={ALLOWED_TAGS:[],ALLOWED_ATTR:[],KEEP_CONTENT:!0,ALLOW_DATA_ATTR:!1}
export{n as a,r as s}
