import{j as i,B as lt}from"./index-DYljCMlx.js";import{b as o}from"./vendor-ViNJc2wV.js";import{u as ct,a as dt,M as mt}from"./useNavHeight-BzPPDete.js";import{u as pt,a as gt,E as ut}from"./HomePage-DRH53lBX.js";import{S as bt}from"./SocialMediaButtons-BizYAzze.js";import{F as ht}from"./Footer-CRbxjU5w.js";import{i as ft}from"./breadcrumbSchema-BG74ATTs.js";import"./beacon-BB01f5iw.js";import"./mobileOptimization-ILGdA5i5.js";import"./sanitizer-lP-Ijg5p.js";const xt=({dropId:a,color:d="f60509",theme:x="dark",background:m="transparent",minimal:n=!0,style:M={},visible:u=!0})=>{const[R,ee]=o.useState(!1),[y,z]=o.useState(0),te=o.useRef(Date.now()),w=o.useRef(null),re=o.useRef(!1),Z=2,H=1e4,S=o.useCallback((b,B)=>{const D=new Date().toISOString();console.log(`[LayloSimple ${D}] ${b}`,B??"")},[]);o.useEffect(()=>{if(document.getElementById("laylo-sdk-script")){S("SDK already loaded"),ee(!0);return}S("Loading Laylo SDK...");const b=document.createElement("script");return b.id="laylo-sdk-script",b.src="https://embed.laylo.com/laylo-sdk.js",b.async=!0,b.onload=()=>{S("Laylo SDK loaded successfully"),ee(!0)},b.onerror=()=>{S("Laylo SDK failed to load, proceeding anyway"),ee(!0)},document.head.appendChild(b),()=>{}},[S]);const p=o.useCallback((b=!1)=>{if(!a)return null;let B=`https://embed.laylo.com?dropId=${a}&color=${d}&minimal=${n}&theme=${x}&background=${m}`;return b&&(B+=`&_ts=${Date.now()}`),B},[a,d,x,m,n])(y>0);o.useEffect(()=>{S("Component mounted",{dropId:a,visible:u,src:p})},[]),o.useEffect(()=>{if(!(!u||!p||!R))return w.current&&(clearTimeout(w.current),w.current=null),te.current=Date.now(),re.current=!1,w.current=setTimeout(()=>{re.current||(y<Z?(S("Load timeout -> retry",{retryCount:y+1}),z(b=>b+1)):S("Final load timeout -> giving up after max retries"))},H),()=>{w.current&&(clearTimeout(w.current),w.current=null)}},[p,u,y,R,S]);const I=o.useCallback(()=>{const b=Date.now()-(te.current||0);re.current=!0,w.current&&(clearTimeout(w.current),w.current=null),S("Iframe onLoad fired",{elapsedMs:b})},[S]),U=o.useCallback(()=>{S("Iframe onError"),w.current&&(clearTimeout(w.current),w.current=null),y<Z?(S("Error -> retry",{retryCount:y+1}),z(b=>b+1)):S("Final error -> giving up after max retries")},[y,S]);return a?u?R?p?i.jsx("iframe",{id:`laylo-drop-${a}`,title:"Laylo Signup",frameBorder:"0",scrolling:"no",allow:"web-share",allowtransparency:"true",onLoad:I,onError:U,style:{width:"1px",minWidth:"100%",maxWidth:"1000px",...M},src:p},`laylo-${a}-${y}`):i.jsx("div",{style:{...M}}):i.jsx("div",{style:{...M,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:i.jsx("span",{style:{color:"#666",fontSize:12},children:"Loading..."})}):i.jsx("div",{style:{...M}}):i.jsx("div",{style:{...M,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:i.jsx("span",{style:{color:"#999",fontSize:14},children:"[Laylo] Missing dropId"})})},pe=(a,d=null)=>{if(!a)return a;if(typeof a=="string"&&a.startsWith("data:"))return console.log("⚠️ Data URL detected, returning as-is:",a.substring(0,50)+"..."),a;const x=/iPad|iPhone|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);if(typeof a=="string"&&a.includes("/api/images/serve/")){console.log("🔄 Processing new image system URL:",a);const m=a.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);if(m){const n=m[1],M=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";let u="small";d&&(d<=150?u="thumbnail":d<=300?u="small":d<=600?u="medium":(d<=1200,u="large"));const R=`${M}/api/images/serve/${n}/${u}`;return console.log("✅ Generated optimized URL for new image system:",R,`(variant: ${u}, width: ${d})`),R}}if(typeof a=="string"&&a.includes("/images/figma-exact/")){const m=a.split("/").pop();return x&&m.includes(".webp")?`/images/optimized/${m.replace(".webp",".jpg")}`:`/images/optimized/${m}`}if(typeof a=="string"&&a.startsWith("http")){const m=encodeURIComponent(a),M=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/images/proxy-optimized?url=${m}`,u=x?"&format=jpeg&quality=85":"";return d?`${M}&w=${d}${u}`:`${M}${u}`}if(typeof a=="string"&&a.startsWith("/")&&(a.includes("/api/images/serve/")||!a.includes("/images/"))){console.log("🔄 Processing relative URL, assuming new image system:",a);const m=a.match(/([a-f0-9-]{36})/);if(m){const n=m[1],u=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/serve/${n}/medium`;return console.log("✅ Generated URL for UUID-based relative path:",u),u}}if(typeof a=="string"&&(a.includes("/images/")||a.includes("/custom/images/"))){const n=a.split("/").pop().replace(/\.[^/.]+$/,"");return d?`/images/optimized/${n}-${d}w.webp`:`/images/optimized/${n}.webp`}return console.log("⚠️ No optimization applied to URL:",a),a},$e=a=>a==="event"?[150,300,450]:a==="hero"?[600,900,1200]:[150,300,600],yt=(a,d="event")=>a?$e(d).map(x=>`${pe(a,x)} ${x}w`).join(", "):"",vt=(a,d="event")=>{if(!a||/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return"";if(typeof a=="string"&&(a.includes("/api/images/serve/")||a.includes("/api/settings/serve/")||a.startsWith("/api/")))return console.log("🚫 Skipping AVIF for internal API URL to prevent loop:",a),"";const m=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";return $e(d).map(n=>`${m}/images/proxy-optimized?url=${encodeURIComponent(a)}&w=${n}&format=avif ${n}w`).join(", ")},ge=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"7911 123456",maxLength:13,digitLength:11},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+",pattern:/^\d{9}$/,placeholder:"412 345 678",maxLength:11,digitLength:9},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"30 12345678",maxLength:13,digitLength:11},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=",pattern:/^\d{9}$/,placeholder:"6 12 34 56 78",maxLength:12,digitLength:9},{id:"es",code:"+34",name:"Spain",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"612 34 56 78",maxLength:11,digitLength:9},{id:"it",code:"+39",name:"Italy",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"312 345 6789",maxLength:12,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"90 1234 5678",maxLength:13,digitLength:11},{id:"kr",code:"+82",name:"South Korea",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"10 1234 5678",maxLength:13,digitLength:11},{id:"cn",code:"+86",name:"China",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+",pattern:/^\d{11}$/,placeholder:"138 0013 8000",maxLength:13,digitLength:11},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:12,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"11 91234 5678",maxLength:14,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:12,digitLength:10}],Ue=(a,d)=>{const x=typeof a=="string"?a.replace(/[^\d]/g,""):"",m=ge.find(M=>M.id===d);if(!m||x.length===0)return x;const n=x.slice(0,m.digitLength);switch(d){case"us":case"ca":return n.length<=3?n:n.length<=6?`(${n.slice(0,3)}) ${n.slice(3)}`:`(${n.slice(0,3)}) ${n.slice(3,6)}-${n.slice(6)}`;case"gb":return n.length<=4?n:n.length<=7?`${n.slice(0,4)} ${n.slice(4)}`:`${n.slice(0,4)} ${n.slice(4,7)} ${n.slice(7)}`;case"jp":case"kr":return n.length<=2?n:n.length<=6?`${n.slice(0,2)} ${n.slice(2)}`:`${n.slice(0,2)} ${n.slice(2,6)} ${n.slice(6)}`;case"cn":return n.length<=3?n:n.length<=7?`${n.slice(0,3)} ${n.slice(3)}`:`${n.slice(0,3)} ${n.slice(3,7)} ${n.slice(7)}`;case"in":return n.length<=5?n:`${n.slice(0,5)} ${n.slice(5)}`;case"br":return n.length<=2?n:n.length<=7?`${n.slice(0,2)} ${n.slice(2)}`:`${n.slice(0,2)} ${n.slice(2,7)} ${n.slice(7)}`;case"mx":return n.length<=2?n:n.length<=6?`${n.slice(0,2)} ${n.slice(2)}`:`${n.slice(0,2)} ${n.slice(2,6)} ${n.slice(6)}`;default:return n.length<=3?n:n.length<=6?`${n.slice(0,3)} ${n.slice(3)}`:`${n.slice(0,3)} ${n.slice(3,6)} ${n.slice(6)}`}},wt=(a,d)=>{const x=a.replace(/[^\d]/g,""),m=ge.find(n=>n.id===d);return m?m.pattern.test(x):x.length>=10&&x.length<=15},ke=a=>ge.find(d=>d.id===a)||ge[0],Pt=()=>{const{trackEvent:a}=pt(),[d,x]=o.useState(!1);o.useCallback(e=>{x(e),e&&a("privacy_consent",{action:"granted",timestamp:Date.now(),component:"PrivacyConsentModal"})},[a]);const[m,n]=o.useState(!0),[M,u]=o.useState(!1);o.useEffect(()=>{setTimeout(()=>{n(!1),u(!0)},2e3),a("component_load",{component:"FigmaMobile",viewport_type:"mobile"})},[a]),o.useEffect(()=>{ft("homepage")},[]),o.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=s=>{console.warn("⚠️ Laylo SDK failed to load in FigmaMobile:",s)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in FigmaMobile")},document.head.appendChild(e)}},[]);const[R,ee]=o.useState(!1),[y,z]=o.useState(""),[te,w]=o.useState(!1),[re,Z]=o.useState(!1),[H,S]=o.useState("us"),[Ye,p]=o.useState("normal"),[I,U]=o.useState(!1),[b,B]=o.useState(""),[D,se]=o.useState(""),[Me,Q]=o.useState(!1),[It,C]=o.useState("normal"),[k,j]=o.useState(!1),[ue,$]=o.useState(!1),[K,N]=o.useState(!1),[je,Te]=o.useState(!1);o.useState(!1);const[De,ie]=o.useState(0),[le,oe]=o.useState(!1),[Ee,Ce]=o.useState(!1),[A,ne]=o.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1}),{loading:be,homeSettings:ce,showAllEvents:v,setShowAllEvents:he,filteredFeaturedEvents:G,filteredHomepageEvents:X,featuredEvents:Ve,homepageEvents:Je,normalizeEvent:Ae}=gt(),[St,Qe]=o.useState(0),[_,Ke]=o.useState(!1),[O,Xe]=o.useState(!1),[T,Ne]=o.useState(null),[Le,ze]=o.useState(!1),Ze=o.useCallback((e,s)=>{if(Le)return;ze(!0);let t=e.coverImage;t&&!t.startsWith("http")&&(t=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}${t}`),t&&(t=t.replace(/[?&](w|width|h|height|size)=\d+/g,""),t=t.replace(/[?&]$/,"")),Ne({...e,imageUrl:t||e.coverImage,originalRect:s?.getBoundingClientRect()||null}),setTimeout(()=>{ze(!1)},400)},[Le]),Pe=o.useCallback(()=>{Ne(null)},[]),f=o.useRef({scrollY:0,locked:!1,prevent:void 0,prevBodyPosition:"",prevBodyTop:"",prevBodyWidth:"",prevBodyOverflow:"",prevBodyTouchAction:""}),Fe=o.useCallback(()=>{if(f.current.locked)return;const e=window.scrollY||window.pageYOffset||0;f.current.scrollY=e;const s=r=>{r&&typeof r.preventDefault=="function"&&r.preventDefault(),r&&typeof r.stopPropagation=="function"&&r.stopPropagation()};f.current.prevent=s,document.documentElement.style.overscrollBehavior="none";const t=document.body;f.current.prevBodyPosition=t.style.position||"",f.current.prevBodyTop=t.style.top||"",f.current.prevBodyWidth=t.style.width||"",f.current.prevBodyOverflow=t.style.overflow||"",f.current.prevBodyTouchAction=t.style.touchAction||"",t.style.position="fixed",t.style.top=`-${e}px`,t.style.width="100%",t.style.overflow="hidden",t.style.touchAction="none",window.addEventListener("wheel",s,{passive:!1,capture:!0}),window.addEventListener("touchmove",s,{passive:!1,capture:!0}),f.current.locked=!0},[]),fe=o.useCallback(()=>{if(!f.current.locked)return;const e=document.body;e.style.position=f.current.prevBodyPosition,e.style.top=f.current.prevBodyTop,e.style.width=f.current.prevBodyWidth,e.style.overflow=f.current.prevBodyOverflow,e.style.touchAction=f.current.prevBodyTouchAction,document.documentElement.style.overscrollBehavior="",f.current.prevent&&(window.removeEventListener("wheel",f.current.prevent,{capture:!0}),window.removeEventListener("touchmove",f.current.prevent,{capture:!0}));const s=f.current.scrollY||0;window.scrollTo(0,s),f.current.locked=!1},[]);o.useEffect(()=>{if(T)return Fe(),()=>{fe()};fe()},[T,Fe,fe]);const[de,Y]=o.useState("hd720"),[We,V]=o.useState("fast"),[L,xe]=o.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""}),Re=o.useCallback(()=>{xe({expanded:k,showDisclaimer:ue,showVerification:I,verificationCode:b,phoneNumber:y}),console.log("💾 Drawer state saved, iframe content preserved")},[k,ue,I,b,y]),[kt,ye]=o.useState(!1),P=o.useRef(null),ve=o.useRef(null),g=o.useRef(null),me=o.useRef(!0),we=o.useRef(null),Ie=o.useRef(null),_e=ct(),qe=Math.max(_e||0,0)+12,{scrollY:et}=dt(Ie.current,{threshold:20,throttleMs:32,passive:!0});o.useEffect(()=>{const e=document.body,s=Ie.current;if(k){const t=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${t}px`,s&&s.classList.add("drawer-active")}else{const t=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",t&&window.scrollTo(0,parseInt(t||"0")*-1),s&&s.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",s&&s.classList.remove("drawer-active")}},[k]),o.useCallback(e=>{const s=e.target.value,t=ke(H),r=s.replace(/[^\d]/g,"");if(r.length>t.digitLength)return;const l=Ue(r,H);z(l)},[H]),o.useCallback(e=>{e.key==="Enter"&&tt()},[]),o.useCallback(e=>{const s=e.target.value,t=ke(s);if(S(s),ve.current&&t.flag&&(ve.current.src=t.flag,ve.current.alt=t.name),y){const r=y.replace(/[^\d]/g,""),l=Ue(r,s);z(l)}console.log(`🌍 Country changed to: ${t.code} (${t.name})`)},[y]);const tt=o.useCallback(async()=>{const e=y.trim();if(!e||te)return;if(e.replace(/\D/g,"")==="5555555555"){console.log("🧪 Test number detected - showing loading then verification UI"),w(!0),p("loading"),setTimeout(()=>{p("valid"),se(e),w(!1),setTimeout(()=>{U(!0),j(!0)},200)},800);return}const r=ke(H);if(!wt(e,H)){console.warn("Invalid phone number format for",r.name),p("invalid"),P.current&&(P.current.classList.add("shake"),setTimeout(()=>{P.current?.classList.remove("shake"),p("normal")},400));return}try{w(!0),p("loading"),console.log("📱 Submitting phone number:",{phone:e,countryCode:r.code});const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click",c=await fetch(`${l}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:r.code})}),h=await c.json();c.ok&&h.success?(console.log("✅ Phone number submitted successfully"),h.requiresVerification?(console.log("🔐 Moving to verification step"),p("normal"),se(e),setTimeout(()=>{U(!0),j(!0)},500)):(Z(!0),p("valid"),z(""),setTimeout(()=>{Z(!1),p("normal")},3e3))):(console.error("❌ Failed to submit phone number:",h.error||"Unknown error"),p("invalid"),P.current&&(P.current.classList.add("shake"),setTimeout(()=>{P.current?.classList.remove("shake"),p("normal")},400)))}catch(l){console.error("❌ Error submitting phone number:",l),p("invalid"),P.current&&(P.current.classList.add("shake"),setTimeout(()=>{P.current?.classList.remove("shake"),p("normal")},400))}finally{w(!1)}},[y,te,H]);o.useCallback(async()=>{const e=b.trim();if(!e||Me)return;if(D.replace(/\D/g,"")==="5555555555"&&(console.log("🧪 Test verification - accepting any 4-digit code"),e.length===4)){Q(!0),p("loading"),setTimeout(()=>{C("valid"),Z(!0),Q(!1)},1e3),setTimeout(()=>{N(!0),U(!1),j(!1),$(!1)},2e3),setTimeout(()=>{B(""),se(""),z(""),Z(!1),p("normal"),C("normal"),Q(!1),N(!1),ie(0),oe(!1),g.current&&(clearInterval(g.current),g.current=null),xe({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3);return}if(!/^\d{4}$/.test(e)){console.warn("Invalid verification code format"),C("invalid"),setTimeout(()=>{C("filled")},400);return}try{Q(!0),p("loading"),console.log("🔐 Submitting verification code");const r=window.location.hostname==="localhost"?"":"https://admin.b2b.click",l=await fetch(`${r}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:D,code:e})}),c=await l.json();l.ok&&c.success?(console.log("✅ Phone verification successful"),C("valid"),Z(!0),setTimeout(()=>{N(!0),U(!1),j(!1),$(!1)},2e3),setTimeout(()=>{B(""),se(""),z(""),Z(!1),p("normal"),C("normal"),Q(!1),N(!1),ie(0),oe(!1),g.current&&(clearInterval(g.current),g.current=null),xe({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3)):(console.error("❌ Phone verification failed:",c.error||"Unknown error"),C("invalid"),setTimeout(()=>{C("filled")},400))}catch(r){console.error("❌ Error submitting verification code:",r),C("invalid"),setTimeout(()=>{C("filled")},400)}finally{Q(!1)}},[b,Me,D]);const q=o.useCallback(()=>{console.log("🚀 Starting countdown timer"),g.current&&(clearInterval(g.current),g.current=null),ie(60),oe(!1),g.current=setInterval(()=>{if(!me.current){g.current&&(clearInterval(g.current),g.current=null);return}ie(e=>(console.log("⏰ Countdown tick:",e),e<=1?(console.log("✅ Countdown finished, enabling resend"),me.current&&oe(!0),g.current&&(clearInterval(g.current),g.current=null),0):e-1))},1e3)},[]);o.useCallback(async()=>{if(!(!le||Ee||!D))try{Ce(!0),console.log("🔄 Resending verification code to:",D);const e=window.location.hostname==="localhost"?"":"https://admin.b2b.click",t=await(await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:D})})).json();t.success?(console.log("✅ Verification code resent successfully"),q()):(console.error("❌ Failed to resend verification code:",t.error),q())}catch(e){console.error("❌ Error resending verification code:",e),q()}finally{Ce(!1)}},[le,Ee,D,q]),o.useEffect(()=>(me.current=!0,()=>{me.current=!1,g.current&&(clearInterval(g.current),g.current=null)}),[]),o.useEffect(()=>{!I&&g.current&&(clearInterval(g.current),g.current=null,ie(0),oe(!1))},[I]),o.useEffect(()=>{console.log("🔄 Countdown useEffect triggered:",{showVerification:I,verificationPhone:D,resendCountdown:De,canResend:le}),I&&D&&De===0&&!le&&(console.log("🚀 Starting resend countdown"),q())},[I,D,q]),o.useEffect(()=>{be||(setTimeout(()=>{Ke(!0)},150),setTimeout(()=>{Xe(!0)},300))},[be]),o.useEffect(()=>{const e=setTimeout(()=>{N(!1),j(!1)},500);return()=>clearTimeout(e)},[]),o.useEffect(()=>{const s=setTimeout(()=>{if("connection"in navigator){const l=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(l){const c=l.effectiveType,h=l.downlink;console.log("🌐 Connection detected:",{effectiveType:c,downlink:h}),c==="4g"&&h>5?(Y("hd1080"),V("fast")):c==="4g"||c==="3g"&&h>2?(Y("hd720"),V("medium")):(Y("large"),V("slow"));return}}const t=performance.now(),r=new Image;r.onload=()=>{const c=performance.now()-t;console.log("🚀 Speed test completed in:",c+"ms"),c<200?(Y("hd1080"),V("fast")):c<500?(Y("hd720"),V("medium")):(Y("large"),V("slow"))},r.onerror=()=>{console.log("⚠️ Speed test failed, using default HD quality"),Y("hd720"),V("medium")},r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},200);return()=>clearTimeout(s)},[]),o.useEffect(()=>{if(G&&G.length>0){console.log("🚀 Preloading critical event images for instant display...");const e=/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);G.slice(0,2).forEach((s,t)=>{if(s.coverImage){if(!e&&!s.coverImage.includes("/api/images/serve/")){const l=document.createElement("link");l.rel="preload",l.as="image",l.type="image/avif";const c=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";l.href=`${c}/images/proxy-optimized?url=${encodeURIComponent(s.coverImage)}&w=120&format=avif`,document.head.appendChild(l)}const r=document.createElement("link");if(r.rel="preload",r.as="image",r.type="image/webp",r.href=pe(s.coverImage,300),document.head.appendChild(r),e){const l=document.createElement("link");l.rel="preload",l.as="image",l.href=s.coverImage,document.head.appendChild(l)}console.log(`✅ Preloaded mobile event image ${t+1}: ${s.title} ${e?"(Safari mobile optimized)":""}`)}})}},[G]);const[J,He]=o.useState(!1),[Mt,Se]=o.useState(!1),Be=()=>{J?(He(!1),Se(!1)):(Se(!0),He(!0),setTimeout(()=>Se(!1),600))},Ge=()=>{const e=window.location.pathname;return e==="/"||e===""?"events":e.startsWith("/about")?"about":e.startsWith("/contact")?"contact":"events"},[it,ot]=o.useState(Ge());o.useEffect(()=>{const e=()=>{ot(Ge())};return window.addEventListener("popstate",e),e(),()=>{window.removeEventListener("popstate",e)}},[]);const nt=e=>{if(e==="/"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};o.useCallback(()=>{j(!0),$(!0)},[]),o.useCallback(()=>{!y.trim()&&!I&&setTimeout(()=>{j(!1),$(!1)},200)},[y,I]);const ae=o.useCallback(e=>{we.current&&!we.current.contains(e.target)&&(Re(),j(!1),I?N(!1):(N(!1),$(!1)))},[y,I,Re]);o.useEffect(()=>(k&&(document.addEventListener("mousedown",ae),document.addEventListener("touchstart",ae)),()=>{document.removeEventListener("mousedown",ae),document.removeEventListener("touchstart",ae)}),[k,ae]),o.useCallback(()=>K?"50px":je?"320px":I&&k?"240px":I&&!k?"60px":k?"280px":"80px",[K,I,k,ue,je]);const at=o.useCallback(()=>"calc(16px + env(safe-area-inset-bottom, 0px))",[]);o.useEffect(()=>{const e=()=>{Qe(s=>s+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),e(),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),o.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],t=Date.now();ne({isActive:!0,startY:s.clientY,currentY:s.clientY,startTime:t,isDragging:!1,initialDrawerState:k})},[k]),o.useCallback(e=>{if(!A.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],t=A.startY-s.clientY,r=Math.abs(t);!A.isDragging&&r>10&&(ne(l=>({...l,isDragging:!0})),e.preventDefault()),A.isDragging&&(ne(l=>({...l,currentY:s.clientY})),e.preventDefault())},[A]),o.useCallback(e=>{if(!A.isActive)return;if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe")){ne({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1});return}const s=A.startY-A.currentY,t=Math.abs(s),r=Date.now()-A.startTime,l=t/r,c=30,h=.5,F=50;let W=!1;if(A.isDragging&&((l>h||t>c||t>F)&&(W=!0),W)){const E=we.current;E&&(E.classList.remove("momentum-fast","momentum-slow"),l>h?E.classList.add("momentum-fast"):E.classList.add("momentum-slow"),setTimeout(()=>{E&&E.classList.remove("momentum-fast","momentum-slow")},250)),s>0?k||(j(!0),N(!1)):k&&j(!1)}ne({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1})},[A,k]),o.useCallback(()=>{K?(N(!1),j(L.expanded||!0),$(L.showDisclaimer),U(L.showVerification),L.verificationCode&&(B(L.verificationCode),L.verificationCode.length===4&&C("filled")),L.phoneNumber&&z(L.phoneNumber)):k||(j(!0),L.showDisclaimer&&!I&&$(!0))},[K,k,L,I]),o.useCallback(e=>{e.stopPropagation(),K&&N(!1),j(!0),Te(!0),setTimeout(()=>{Te(!1)},1e4)},[K]),o.useCallback(()=>{ye(!0)},[]),o.useCallback(()=>{ye(!1)},[]),o.useCallback(()=>{ye(!1)},[]),o.useEffect(()=>{const e=document.querySelector('meta[name="viewport"]'),s=e?e.getAttribute("content"):"";let t=document.querySelector('meta[name="viewport"]');t||(t=document.createElement("meta"),t.name="viewport",document.head.appendChild(t)),t.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no";const r=(F,W)=>{let E=document.querySelector(`meta[name="${F}"]`);E||(E=document.createElement("meta"),E.name=F,document.head.appendChild(E)),E.content=W};r("apple-mobile-web-app-capable","yes"),r("apple-mobile-web-app-status-bar-style","black-translucent"),r("apple-touch-fullscreen","yes"),r("mobile-web-app-capable","yes"),r("format-detection","telephone=no"),document.documentElement.style.webkitTextSizeAdjust="100%",document.documentElement.style.textSizeAdjust="100%";let l=null,c=null;const h=()=>{l&&cancelAnimationFrame(l),c&&clearTimeout(c),c=setTimeout(()=>{l=requestAnimationFrame(()=>{const F=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${F}px`)})},100)};return h(),window.addEventListener("resize",h,{passive:!0}),window.addEventListener("orientationchange",h,{passive:!0}),()=>{e&&s&&e.setAttribute("content",s),window.removeEventListener("resize",h),window.removeEventListener("orientationchange",h),l&&cancelAnimationFrame(l),c&&clearTimeout(c)}},[]);const rt=o.useMemo(()=>{const e="https://www.youtube.com/embed/vEHTO3gf1jk",r={...{autoplay:"1",mute:"1",controls:"0",showinfo:"0",rel:"0",loop:"1",playlist:"vEHTO3gf1jk",modestbranding:"1",iv_load_policy:"3",fs:"0",disablekb:"1",hd:"1",cc_load_policy:"0",autohide:"1",wmode:"transparent",enablejsapi:"1",origin:window.location.origin},...{vq:de,quality:de}},l=Object.entries(r).map(([h,F])=>`${h}=${F}`).join("&"),c=`${e}?${l}`;return console.log("🎥 YouTube URL built:",{videoQuality:de,connectionSpeed:We,finalURL:c}),c},[de,We]),Oe=o.useCallback(()=>{n(!1),u(!0),a("video_interaction",{action:"thumbnail_click",video_id:"vEHTO3gf1jk",component:"FigmaMobile"})},[a]),st=o.useMemo(()=>i.jsx("div",{onClick:Oe,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",cursor:"pointer",backgroundImage:"url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transition:"transform 0.2s ease-out"},onMouseDown:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onTouchStart:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"}}),[Oe]);return be?i.jsx(lt,{fullScreen:!0,minDisplayTime:600,showMessage:!1}):i.jsxs(i.Fragment,{children:[i.jsx(ut,{events:[...Ve,...Je],domain:"bounce2bounce.com"}),i.jsx("link",{rel:"stylesheet",href:"/css/mobile-scroll-fix.css"}),i.jsx("style",{children:`
          /* 📱 CSS CUSTOM PROPERTIES FOR PERFECT BACKGROUND MATCHING & ULTRA-SMOOTH ANIMATIONS */
          :root {
            --mobile-bg-primary: #161616;
            --mobile-bg-secondary: #000000;
            --mobile-bg-rgba-primary: 22, 22, 22;
            --mobile-bg-rgba-secondary: 0, 0, 0;
            /* 🎬 OPTIMIZED: Modern animation timing based on best practices (25% faster) */
            --animation-duration-fast: 150ms;
            --animation-duration-normal: 225ms;
            --animation-duration-slow: 300ms;
            --animation-easing-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            --animation-easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
            --animation-easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
            --animation-stagger-delay: 100ms;
            /* Legacy support - gradually migrate away from these */
            --ultra-smooth-duration: var(--animation-duration-normal);
            --ultra-smooth-easing: var(--animation-easing-standard);
            --smooth-easing-fast: var(--animation-easing-decelerate);
            /* Performance optimization variables */
            --gpu-acceleration: translateZ(0);
            --smooth-rendering: antialiased;
          }

          /* 🎯 ACCESSIBILITY: Respect user's motion preferences */
          @media (prefers-reduced-motion: reduce) {
            :root {
              /* 🚨 PRESERVE NAVIGATION: Keep navigation animation variables for UX */
              /* --animation-duration-fast: 0ms; COMMENTED OUT - navigation needs these */
              /* --animation-duration-normal: 0ms; COMMENTED OUT - navigation needs these */
              /* --animation-duration-slow: 0ms; COMMENTED OUT - navigation needs these */
              --animation-stagger-delay: 0ms;
              --ultra-smooth-duration: 0ms;
            }
            /* 🚨 FIXED: Only target page content, NOT navigation elements */
            .mobile-content-container *,
            .mobile-content-container *::before,
            .mobile-content-container *::after,
            .mobile-event-cards-container *,
            .mobile-event-cards-container *::before,
            .mobile-event-cards-container *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
            /* 🚨 CRITICAL: Preserve navigation animations for UX */
            .mobile-navigation-header,
            .mobile-navigation-header *,
            .mobile-nav-overlay,
            .mobile-nav-overlay *,
            .mobile-nav-item,
            .mobile-nav-item *,
            .mobile-menu-button,
            .mobile-menu-button * {
              /* Preserve component-defined durations; do not override here */
            }
          }

          /* Mobile device specific fixes for real device compatibility */
          html, body {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            touch-action: manipulation;
            overscroll-behavior: none;
          }

          /* iOS Safari specific fixes for viewport height issues */
          @supports (-webkit-touch-callout: none) {
            .mobile-content-container {
              height: -webkit-fill-available !important;
              min-height: -webkit-fill-available !important;
            }
          }

          /* Comprehensive Safari iOS WebKit Optimizations */

          /* Prevent iOS Safari zoom on input focus */
          input[type="tel"], input[type="text"], select {
            font-size: 16px !important;
            transform-origin: left top;
            font-family: 'Inter', sans-serif;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 0;
          }

          /* Prevent zoom and ensure proper viewport */
          * {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* 📱 MOBILE SCROLL PERFORMANCE FIX - Ultra-stable approach */
          html, body {
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Enable native momentum scrolling */
            -webkit-overflow-scrolling: auto;
            /* Essential mobile optimizations only */
            -webkit-text-size-adjust: 100%;
            touch-action: manipulation;
            /* Remove forced hardware acceleration */
            transform: none;
            will-change: auto;
            /* FIXED: Prevent any scroll position manipulation */
            scroll-snap-type: none;
            -webkit-scroll-snap-type: none;
            /* Ensure stable layout during scroll */
            contain: layout;
          }

          /* Fix mobile viewport without breaking scroll */
          html, body {
            width: 100%;
            height: 100%;
            overflow: visible; /* Allow natural scrolling */
            overscroll-behavior: contain; /* Prevent scroll chaining only */
          }

          /* FIXED: Mobile container with proper overflow control */
          .mobile-container {
            position: relative !important;
            width: 100vw !important;
            /* 🚀 iOS SAFARI FIX: Use dynamic viewport height for proper sizing */
            height: 100vh !important;
            height: 100dvh !important; /* Modern dynamic viewport height */
            height: -webkit-fill-available !important; /* iOS Safari fallback */
            /* 🚨 CRITICAL: Control overflow to prevent footer/hidden elements from showing */
            overflow: hidden !important;
            /* Ensure proper scroll containment */
            overscroll-behavior: contain !important;
            -webkit-overscroll-behavior: contain !important;
            /* 🚨 CRITICAL: Prevent any content from escaping container bounds */
            isolation: isolate !important;
          }

          /* 🚀 PWA Standalone Mode: Adjust container for safe areas */
          @media (display-mode: standalone) {
            .mobile-container {
              /* Account for safe areas in standalone mode - full height with padding */
              padding-top: env(safe-area-inset-top, 0px) !important;
              padding-bottom: env(safe-area-inset-bottom, 0px) !important;
              /* Keep full viewport height - padding is inside the box */
              height: 100dvh !important;
              box-sizing: border-box !important;
            }
          }

          /* Optimize touch interactions for iOS */
          .mobile-drawer, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-drawer {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          /* Modern iOS-style scrollbar - hidden by default, appears on scroll */
          .mobile-content-container {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }

          .mobile-content-container::-webkit-scrollbar {
            width: 0px; /* Hide scrollbar by default */
            background: transparent;
          }

          /* Show thin scrollbar only when actively scrolling */
          .mobile-content-container:hover::-webkit-scrollbar,
          .mobile-content-container:active::-webkit-scrollbar {
            width: 3px;
          }

          .mobile-content-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .mobile-content-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: background 0.2s ease;
          }

          .mobile-content-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* 🚨 REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */
          /* This prevents conflicts with the MobileNavigation component's own CSS */

          /* 📱 OPTIMIZED MOBILE SCROLL CONTAINER */
          .mobile-content-container {
            /* Native iOS momentum scrolling */
            -webkit-overflow-scrolling: touch;
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Prevent scroll chaining */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Disable scroll snapping that causes jitter */
            scroll-snap-type: none;
            /* Allow only vertical scrolling */
            touch-action: pan-y;
            /* Minimal rendering optimization */
            contain: layout style;
            /* Remove will-change to prevent unnecessary compositing */
            will-change: auto;
            /* Minimal hardware acceleration */
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .mobile-phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .mobile-phone-input:focus {
            outline: none;
            font-size: 16px !important;
          }

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: All mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */
          .mobile-send-button:hover:not(:disabled) {
            transform: scale(1.05);
            transition: transform 0.2s ease;
          }
          .mobile-send-button:active:not(:disabled) {
            transform: scale(0.95);
          }

          /* Shake animation for validation errors */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }

          /* 📱 ULTRA-SMOOTH EXPANDABLE EVENT CARDS SECTION */
          .mobile-event-cards-container {
            position: relative;
            overflow: hidden;
            background: #000000; /* Match main page background - pure black */
            /* 🎬 OPTIMIZED: Smooth animation with reasonable timing */
            transition:
              max-height var(--animation-duration-slow) var(--animation-easing-standard),
              transform var(--animation-duration-slow) var(--animation-easing-standard),
              opacity var(--animation-duration-slow) var(--animation-easing-standard);
            /* GPU acceleration for smooth performance */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            /* Optimize rendering for ultra-smooth performance */
            contain: layout style paint;
            transform-style: preserve-3d;
            /* Additional performance optimizations */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Prevent layout thrashing during animation */
            overflow-anchor: none;
          }

          .mobile-event-cards-container.collapsed {
            /* Show exactly 3 complete cards with balanced vertical spacing */
            max-height: calc(3 * 136px + 16px + 100px); /* 3 cards (408px) + padding (16px) + gradient space (100px) */
            /* Additional smoothness optimizations for collapsed state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          .mobile-event-cards-container.expanded {
            max-height: none; /* Unbounded to show all events */
            overflow: visible; /* Allow all cards to render fully */
            /* Additional smoothness optimizations for expanded state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          /* Ultra-smooth professional gradient overlay */
          .mobile-event-cards-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px; /* Increased height for more gradual fade effect */
            /* Ultra-smooth gradient with 10 stops to eliminate banding */
            background: linear-gradient(
              to bottom,
              /* Extended transparent area at top to show more of third card */
              transparent 0%,
              transparent 40%,
              /* More gradual fade progression for smoother visual flow */
              rgba(0, 0, 0, 0.05) 42%,
              rgba(0, 0, 0, 0.12) 45%,
              rgba(0, 0, 0, 0.22) 48%,
              rgba(0, 0, 0, 0.35) 52%,
              rgba(0, 0, 0, 0.50) 56%,
              rgba(0, 0, 0, 0.65) 60%,
              rgba(0, 0, 0, 0.78) 65%,
              rgba(0, 0, 0, 0.90) 70%,
              rgba(0, 0, 0, 0.96) 75%,
              /* Solid black area for button placement */
              #000000 78%,
              #000000 100%
            );
            /* Minimal blur for performance while maintaining quality */
            backdrop-filter: blur(0.5px);
            -webkit-backdrop-filter: blur(0.5px);
            pointer-events: none;
            /* 🎬 OPTIMIZED: Reasonable transition timing for better performance */
            transition:
              opacity var(--animation-duration-normal) var(--animation-easing-standard),
              transform var(--animation-duration-normal) var(--animation-easing-standard);
            /* GPU acceleration for smooth overlay animation */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            transform: translateZ(0);
            z-index: 2;
          }

          /* Refined progressive blur overlay for smooth transitions */
          .mobile-event-cards-overlay::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* Ultra-smooth blur mask matching main gradient progression */
            background: linear-gradient(
              to bottom,
              /* Top 30%: No blur mask for clear visibility */
              transparent 0%,
              transparent 30%,
              /* Smooth blur progression from 30% to 70% */
              rgba(0, 0, 0, 0.03) 35%,
              rgba(0, 0, 0, 0.06) 40%,
              rgba(0, 0, 0, 0.10) 45%,
              rgba(0, 0, 0, 0.14) 50%,
              rgba(0, 0, 0, 0.18) 55%,
              rgba(0, 0, 0, 0.22) 60%,
              rgba(0, 0, 0, 0.26) 65%,
              rgba(0, 0, 0, 0.28) 68%,
              /* Consistent blur for bottom 30% solid area */
              rgba(0, 0, 0, 0.30) 70%,
              rgba(0, 0, 0, 0.30) 100%
            );
            /* Optimized blur for smooth performance */
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            pointer-events: none;
            z-index: 1;
          }



          .mobile-event-cards-overlay.hidden {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          /* Modern expand/collapse handle - matching View Event button style */
          .mobile-expand-handle {
            position: absolute;
            bottom: 12px; /* Default position for collapsed state */
            left: 50%;
            transform: translateX(-50%) translateZ(0); /* Center horizontally + GPU acceleration */
            z-index: 5; /* Above all gradient layers */
            width: 120px; /* Wider to match button proportions */
            height: 32px; /* Consistent with View Event button height */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 46px; /* Match View Event button border radius */
            /* Dark glassmorphism matching View Event buttons */
            background: rgba(23, 23, 23, 0.8);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: none; /* Clean look like View Event buttons */
            /* Typography matching View Event buttons */
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            /* Only animate background color - keep button position stable */
            transition: background-color 0.2s ease;
            /* GPU acceleration for smooth rendering */
            backface-visibility: hidden;
            touch-action: manipulation;
            box-sizing: border-box;
          }

          .mobile-expand-handle:hover {
            background: rgba(23, 23, 23, 0.9);
            /* No transform changes - keep button position stable */
          }

          .mobile-expand-handle:active {
            background: rgba(23, 23, 23, 0.7);
            /* No transform changes - keep button position stable */
          }

          /* Expanded state positioning - move button below all cards */
          .mobile-expand-handle.expanded {
            position: relative;
            bottom: auto;
            margin: 4px auto 0 auto; /* Further reduced to 4px to tighten section gap (>50% reduction) */
            transform: translateZ(0); /* Keep GPU acceleration, no other transforms */
            left: auto;
          }

          /* Modern centered chevron icon - ultra-smooth animation */
          .mobile-expand-chevron {
            width: 12px;
            height: 12px;
            border-right: 2px solid rgba(255, 255, 255, 0.9);
            border-bottom: 2px solid rgba(255, 255, 255, 0.9);
            border-radius: 0 1px 0 0;
            transform: rotate(45deg);
            /* Ultra-smooth chevron rotation with GPU acceleration */
            transition:
              transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0),
              border-color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
            will-change: transform, border-color;
            backface-visibility: hidden;
            transform-origin: center;
            margin: 0;
            position: relative;
            top: -1px;
          }

          .mobile-expand-chevron.expanded {
            transform: rotate(-135deg);
            border-color: rgba(255, 255, 255, 1);
            top: 1px;
          }

          /* Simplified event card styling - no individual animations during expand/collapse */
          .mobile-event-card-item {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          /* Advanced smooth animation keyframes for ultra-fluid motion */
          @keyframes ultraSmoothExpand {
            0% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
          }

          @keyframes ultraSmoothCollapse {
            0% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
          }

          /* Enhanced animation classes for ultra-smooth transitions */
          .mobile-event-cards-container.animating-expand {
            animation: ultraSmoothExpand 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          .mobile-event-cards-container.animating-collapse {
            animation: ultraSmoothCollapse 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          /* Respect user motion preferences - FIXED: Only disable event card animations, not navigation */
          @media (prefers-reduced-motion: reduce) {
            .mobile-event-cards-container,
            .mobile-event-cards-overlay,
            .mobile-expand-handle,
            .mobile-expand-chevron,
            .mobile-event-card-item {
              transition: none !important;
              animation: none !important;
            }
            /* IMPORTANT: Do NOT disable navigation animations - they are essential for UX */
          }

          /* Mobile country selector styling */
          .mobile-country-select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFFFFF;
            border-radius: 8px;
            padding: 4px 8px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            outline: none;
          }
          .mobile-country-select option {
            background: #000000;
            color: #FFFFFF;
          }

          /* Mobile verification input styling */
          .mobile-verification-input {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            font-size: 16px; /* Minimum 16px to prevent iOS zoom */
            font-weight: 600;
            text-align: center;
            outline: none;
          }
          .mobile-verification-input:focus {
            border-color: #00FF40;
            box-shadow: 0 0 0 2px rgba(0, 255, 64, 0.2);
          }

          /* Spinner animation for mobile SEND button */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @-moz-keyframes spin {
            0% { -moz-transform: rotate(0deg); }
            100% { -moz-transform: rotate(360deg); }
          }

          /* Enhanced drawer animations with momentum support */
          .mobile-drawer {
            position: fixed !important;
            bottom: 0 !important;
            left: 25px !important;
            right: 25px !important;
            margin: 0 auto !important;
            width: calc(100% - 50px) !important;
            max-width: 390px !important;
            background: rgb(21 21 21 / 80%) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 24px 24px 0px 0px !important;
            transition: transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            transform-origin: bottom center !important;
            /* 🚨 CRITICAL: Highest z-index to ensure drawer stays above all content */
            z-index: 9999 !important;
            will-change: auto !important;
            backface-visibility: hidden !important;
            perspective: 1000px !important;
            /* ENHANCED: Complete scroll isolation for iOS Safari */
            touch-action: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            /* Complete containment isolation */
            contain: strict !important;
            /* 🚨 CRITICAL: Ensure drawer maintains fixed position on mobile */
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            /* iOS Safari specific optimizations */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            /* Prevent scroll bleed completely */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
          }

          /* Fast momentum animation for flick gestures - scroll optimized */
          .mobile-drawer.momentum-fast {
            transition: transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: strict; /* Strict containment during fast animations */
          }

          /* Slow momentum animation for gentle swipes - scroll optimized */
          .mobile-drawer.momentum-slow {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: layout style; /* Layout containment for smooth animations */
          }

          /* ENHANCED: Complete drawer scroll isolation with hidden scrollbars */
          .mobile-drawer-content {
            /* Complete scroll isolation from main page */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* iOS Safari specific scroll containment */
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            /* FIXED: Hide scrollbars while maintaining functionality */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
            /* Strict touch action for drawer content only */
            touch-action: pan-y pinch-zoom;
            /* Complete containment isolation */
            contain: strict;
            /* Prevent any scroll events from bubbling */
            position: relative;
            z-index: 1000;
            /* iOS momentum scrolling optimization */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }

          /* FIXED: Hide WebKit scrollbars */
          .mobile-drawer-content::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }

          /* CRITICAL: Disable ONLY drawer content interaction when collapsed, keep handle clickable */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* ENSURE: Drawer handle remains clickable even when collapsed */
          .mobile-drawer.collapsed {
            pointer-events: auto !important; /* Allow clicks on the drawer container */
          }

          .mobile-drawer.collapsed > * {
            pointer-events: none !important; /* Disable all children */
          }

          .mobile-drawer.collapsed .drawer-handle,
          .mobile-drawer.collapsed [role="dialog"] {
            pointer-events: auto !important; /* Re-enable handle and dialog clicks */
          }

          /* CRITICAL: Disable drawer content interaction when parent is collapsed */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }



          /* 🚨 CRITICAL: Proper body scroll lock for mobile drawer positioning */
          body.drawer-scroll-lock {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            overflow: hidden !important;
            width: 100% !important;
            height: 100% !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
            /* Prevent iOS Safari address bar issues */
            -webkit-overflow-scrolling: auto !important;
          }

          /* Prevent main content scroll when drawer is expanded */
          .mobile-content-container.drawer-active {
            overflow: hidden !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* 🚨 FIXED: Only target drawer elements, NOT navigation overlays */
          .mobile-drawer[style*="position: fixed"][style*="z-index"] {
            position: fixed !important;
            z-index: 9999 !important;
            /* Let MobileDrawer component control its own transitions */
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
            /* CRITICAL: Disable content interaction when collapsed, but allow handle clicks */
            overflow: hidden !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
            /* Enable interaction when expanded */
            pointer-events: auto;
            touch-action: pan-y;
            overflow: visible;
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            position: relative;
            overflow: hidden;
          }

          .disclaimer-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(to bottom, transparent 0%, rgba(35, 35, 35, 0.95) 100%);
            pointer-events: none;
            transition: opacity 0.4s ease;
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* 🎬 OPTIMIZED: Modern card animation with subtle, natural motion */
          @keyframes modernCardSpring {
            0% {
              opacity: 0;
              transform: translate3d(0, 16px, 0) scale(0.96);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, -1px, 0) scale(1.005);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .event-card-spring {
            animation: modernCardSpring var(--animation-duration-normal) var(--animation-easing-standard) forwards;
            will-change: transform, opacity; /* Only when animating */
            backface-visibility: hidden;
            transform-style: flat;
            -webkit-font-smoothing: antialiased;
            contain: layout style;
          }

          .event-card-hidden {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.95); /* More dramatic initial state */
            backface-visibility: hidden;
          }

          /* Expanded Image Modal Animations */
          @keyframes expandedImageFadeIn {
            0% {
              opacity: 0;
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
              background-color: rgba(0, 0, 0, 0);
            }
            100% {
              opacity: 1;
              backdrop-filter: blur(60px);
              -webkit-backdrop-filter: blur(60px);
              background-color: rgba(0, 0, 0, 0.15);
            }
          }

          @keyframes expandedImageScale {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(20px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes expandedButtonsSlideUp {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Responsive adjustments for small mobile devices */
          @media (max-width: 375px) {
            .mobile-content-container {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }

            .mobile-drawer {
              left: 15px !important;
              right: 15px !important;
              width: calc(100% - 30px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-content-container {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }

          /* Responsive adjustments for event card content on small screens */
          @media (max-width: 375px) {
            .card-clickable-area {
              left: 120px !important; /* Reduce left margin for more text space */
              right: 4px !important; /* Reduce right margin */
            }
          }

          @media (max-width: 320px) {
            .card-clickable-area {
              left: 110px !important; /* Further reduce left margin */
              right: 2px !important; /* Minimal right margin */
            }
          }
        `}),i.jsx("div",{className:"mobile-container",style:{background:"#000000",fontFamily:"Inter, sans-serif"},role:"main","aria-label":"BOUNCE2BOUNCE Mobile Experience",children:i.jsxs("main",{style:{width:"100vw",height:"100vh",maxWidth:"100vw",maxHeight:"100vh",margin:"0",position:"relative",background:"#000000",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:"100vh",minWidth:"100vw",isolation:"isolate",transform:"none",willChange:"auto",WebkitOverflowScrolling:"auto",WebkitTransform:"none",touchAction:"manipulation",overscrollBehavior:"contain"},"aria-label":"Mobile homepage content",children:[i.jsx(mt,{currentPage:it,scrollY:et,onNavigate:nt,onMenuToggle:ee}),i.jsxs("div",{ref:Ie,className:"mobile-content-container",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:qe,paddingLeft:"0px",paddingRight:"0px",paddingBottom:at(),boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",WebkitOverscrollBehavior:"contain",scrollBehavior:"auto",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"auto",touchAction:"pan-y",WebkitTouchCallout:"none",WebkitUserSelect:"none",scrollSnapType:"none",WebkitScrollSnapType:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},children:[i.jsxs("section",{"aria-labelledby":"events-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"2px",opacity:O?1:0,transform:O?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"0ms"},children:[i.jsxs("div",{style:{display:"flex",width:"min(344px, calc(100vw - 4px))",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:[i.jsx("h2",{id:"events-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"normal",margin:0,textAlign:"left"},children:"Events"}),i.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"},onClick:()=>he(!v),role:"switch","aria-checked":v,"aria-label":`Switch to ${v?"Past":"Next"} events`,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),he(!v))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[i.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:v?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),i.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:i.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:v?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:v?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Next"})}),i.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:i.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:v?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:v?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),v&&G.length>0&&i.jsx("div",{style:{width:"100%",transition:"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:v?1:0,transform:v?"translateY(0)":"translateY(-20px)",marginBottom:v?"20px":"0px",overflow:"hidden"},children:G.map((e,s)=>i.jsx("div",{className:_?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"2px",boxSizing:"border-box",display:"flex",justifyContent:"center",opacity:_?1:0,transform:_?"translateY(0) scale(1)":"translateY(20px) scale(0.96)",transition:"opacity var(--animation-duration-slow) var(--animation-easing-standard), transform var(--animation-duration-slow) var(--animation-easing-standard)",transitionDelay:_?`${s*120}ms`:"0s"},children:i.jsxs("div",{onClick:t=>{console.log("🔍 Mobile Featured Event: Click detected!",t.target),t.preventDefault(),t.stopPropagation(),e?.ticketsUrl&&e.ticketsUrl!=="#"?(console.log(`🎫 Mobile Featured Event: Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")):(console.log("🎫 Mobile Featured Event: No ticket link available for",e?.title),console.log("🔍 Mobile Featured Event data:",e),console.log("🔍 Available fields:",Object.keys(e||{})))},style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.98)"},onTouchEnd:t=>{t.currentTarget.style.transform="scale(1)"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[i.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:e.coverImage?i.jsxs("picture",{children:[i.jsx("source",{srcSet:vt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),i.jsx("source",{srcSet:yt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),i.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:pe(e.coverImage,375),alt:`${e.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:",e.title),onError:t=>{console.error("❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:",t.target.src),t.target.dataset.heroFallbackAttempted?(t.target.removeAttribute("onError"),console.error("❌ Hero fallback also failed, removing error handler")):(t.target.dataset.heroFallbackAttempted="true",t.target.src="/images/optimized/hero-left-image-375w.jpg")},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):i.jsxs("picture",{children:[i.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),i.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),i.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE DEFAULT HERO IMAGE LOADED"),onError:t=>console.error("❌ MOBILE DEFAULT HERO IMAGE FAILED:",t.target.src),style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),i.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),i.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",opacity:1,transform:"translateZ(0)",willChange:"transform"},children:[i.jsxs("div",{style:{display:"flex",flex:"1",padding:"0px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[i.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"1px"},children:[i.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:i.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),i.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:Ae?Ae(e.eventData||e,"hero",!0)?.date||e.date||"March 29th, 9:00 P.M.":e.date||"March 29th, 9:00 P.M."})]}),i.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[i.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[i.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),i.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),i.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:e.location||"Asbury Park, NJ"})]})]}),i.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:i.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onTouchStart:t=>{t.stopPropagation(),t.target.style.transform="scale(0.95)",t.target.style.background="rgba(35, 35, 35, 0.98)",t.target.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:t=>{t.stopPropagation(),t.target.style.transform="scale(1)",t.target.style.background="rgba(15, 15, 15, 0.95)",t.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:t=>{t.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},children:i.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:e.isRealEvent&&e.hasTicketLink?e.buttonText||"Get Tickets":"View Event"})})})]}),i.jsx("div",{style:{position:"absolute",left:"0px",bottom:"50px",display:"flex",width:"100%",height:"auto",minHeight:"32px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2,pointerEvents:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",willChange:"transform"},children:i.jsx("div",{style:{color:"#FFFFFF",fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"normal",maxWidth:"100%",margin:"0px 0px 4px 0px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",transform:"translateZ(0)",willChange:"transform"},children:e.title||"FEATURED EVENT"})})]})},`hero-${e.id}`))}),v&&G.length===0&&X.length>0&&i.jsx("div",{className:_?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"0px",boxSizing:"border-box",display:"flex",justifyContent:"center"},children:i.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",borderRadius:"20px",overflow:"hidden",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)"},children:[i.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}}),i.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2},children:i.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1"},children:v?"UPCOMING EVENTS":"PAST EVENTS"})})]})}),i.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",margin:"0 auto",position:"relative",paddingBottom:X.length>3?"4px":"0",background:"#000000"},children:[i.jsxs("div",{className:`mobile-event-cards-container ${J?"expanded":"collapsed"}`,style:{width:"100%",position:"relative",background:"#000000"},children:[i.jsx("div",{role:"list","aria-label":v?"Upcoming live music events":"Past live music events",style:{display:"flex",width:"100%",flexDirection:"column",justifyContent:"center",alignItems:"stretch",gap:"4px",flexShrink:0,padding:"4px 0",boxSizing:"border-box",minHeight:"auto",overflow:"visible",position:"relative",zIndex:1},children:X.length>0?X.map((e,s)=>i.jsx("article",{className:`mobile-event-card-item ${_?"event-card-spring":"event-card-hidden"}`,style:{width:"100%",minHeight:"132px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform, opacity",contain:"layout style paint",zIndex:1,clear:"both"},children:i.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[i.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:t=>{t.preventDefault(),t.stopPropagation();const r=t.currentTarget.querySelector("img");Ze(e,r)},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.95)"},onTouchEnd:t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.style.transform="scale(1)";const r=t.currentTarget.querySelector("img");Ze(e,r)},onTouchCancel:t=>{t.currentTarget.style.transform="scale(1)"},onMouseDown:t=>{t.currentTarget.style.transform="scale(0.95)"},onMouseUp:t=>{t.currentTarget.style.transform="scale(1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)"},children:i.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",width:"120",height:"120",src:(()=>{const t=pe(e.coverImage,120);return console.log(`🖼️ Loading homepage image for "${e.title}":`,{original:e.coverImage,optimized:t,isDataUrl:e.coverImage?.startsWith("data:"),isNewImageSystem:e.coverImage?.includes("/api/images/serve/"),hostname:window.location.hostname}),t})(),srcSet:e.image_srcset?Object.entries(e.image_srcset).map(([t,r])=>`${r} ${t}`).join(", "):void 0,sizes:"(max-width: 768px) 100vw, 400px",alt:e.image_alt_text||`${e.title} event cover`,title:e.image_title||e.title,loading:"lazy",decoding:"async",onError:t=>{const r=parseInt(t.target.dataset.fallbackAttempt||"0"),l=2,c=t.target.src,h=e.id||e.title;if(window.failedImages||(window.failedImages=new Set),window.failedImages.has(c)){console.log("🛑 Global circuit breaker: Image URL previously failed, using placeholder immediately"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(r>=l){console.log(`🛑 Circuit breaker: Max fallback attempts (${l}) reached for ${h}, using placeholder`),window.failedImages.add(c),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(console.log(`❌ Homepage event image failed (attempt ${r+1}/${l}):`,h,"URL:",c),window.failedImages.add(c),c.includes("/api/images/serve/")&&(console.error("🚨 API image serving failed - check persistent storage pipeline"),console.error("📋 UUID extraction:",c.match(/\/api\/images\/serve\/([a-f0-9-]{36})/))),r===0){const W=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/placeholder`;console.log("🔄 Trying dashboard placeholder:",W),t.target.src=W,t.target.dataset.fallbackAttempt="1";return}else if(r===1){console.log("🔄 Using final inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}console.log("🔄 Safety fallback: Using inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError")},onLoad:t=>{delete t.target.dataset.fallbackAttempt,console.log("✅ Homepage event image loaded successfully:",e.title,t.target.src),t.target.style.backgroundColor="transparent",t.target.style.opacity="1"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",opacity:"0",transition:"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),i.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[i.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[i.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.title}),i.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[i.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:i.jsx("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h-3V7h2v4h3v2Z",fill:"currentColor"})}),i.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[i.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:i.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),i.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),i.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?i.jsx("button",{onClick:t=>{t.stopPropagation(),console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.02)",t.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`)):v&&G.length>0?null:i.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:.8},children:v?"No upcoming events":"No past events"}),v&&ce?.mobile_laylo_cta_url?i.jsx("button",{type:"button","aria-label":ce?.fallback_cta_button_text||"Join Waitlist",onClick:()=>{window.open(ce.mobile_laylo_cta_url,"_blank","noopener,noreferrer")},style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:ce?.fallback_cta_button_text||"Join Waitlist"}):i.jsx("button",{type:"button","aria-label":"View Past Events",onClick:()=>he(!1),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:"View Past Events"})]})}),!J&&X.length>3&&i.jsx("div",{className:"mobile-event-cards-overlay","aria-hidden":"true"})]}),X.length>3&&i.jsx("div",{className:`mobile-expand-handle ${J?"expanded":""}`,onClick:Be,role:"button",tabIndex:0,"aria-label":J?"Show fewer events":"Show more events","aria-expanded":J,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Be())},style:{opacity:1,visibility:"visible"},children:i.jsx("div",{className:`mobile-expand-chevron ${J?"expanded":""}`,"aria-hidden":"true"})})]})]}),i.jsxs("section",{"aria-labelledby":"follow-us-section-title",style:{width:"100%",marginTop:"1px",marginBottom:"4px",opacity:O?1:0,transform:O?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"150ms"},children:[i.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:i.jsx("h2",{id:"follow-us-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"1.2",margin:0,textAlign:"left"},children:"Follow Us"})}),i.jsxs("article",{style:{width:"min(344px, calc(100vw - 4px))",height:"200px",position:"relative",flexShrink:0,margin:"0 auto",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},"aria-label":"Henry Fong live performance video",children:[i.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:[i.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",transform:"translateZ(0)",willChange:"auto"},children:m?st:M?i.jsx("iframe",{src:rt,title:"Henry Fong YouTube Video - Adaptive Quality",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",loading:"lazy",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",transform:"translateZ(0)",pointerEvents:"none",border:"none",opacity:1,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"}}):i.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",border:"none",transform:"translateZ(0)"}})}),i.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"20px",zIndex:1,transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto",pointerEvents:"none"}})]}),i.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"16px",display:"flex",width:"100%",height:"40px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"12px",zIndex:2,boxSizing:"border-box",pointerEvents:"none",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto"},children:[i.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"2px",flex:"1"},children:[i.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"18px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Watch on YouTube"}),i.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"9px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live"})]}),i.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"90px",height:"36px",justifyContent:"center",alignItems:"center",pointerEvents:"auto",borderRadius:"18px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onTouchStart:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.background="rgba(58, 58, 58, 0.90)"},onTouchEnd:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},children:i.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"11px",fontWeight:"600",lineHeight:"normal"},children:"Watch now"})})]})]})]}),i.jsx("section",{style:{width:"100%",padding:"0",margin:"0",marginTop:"8px",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",opacity:O?1:0,transform:O?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"280ms"},children:i.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto"},children:i.jsx(bt,{})})}),i.jsx("section",{"aria-labelledby":"text-us-section-title",style:{width:"100%",marginTop:"12px",padding:"0",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",opacity:O?1:.01,transform:O?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"320ms"},children:i.jsxs("article",{style:{width:"min(344px, calc(100vw - 4px))",margin:"0 auto",background:"rgba(22, 22, 22, 0.8)",border:"1px solid rgba(56, 56, 56, 0.3)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:"20px",padding:"20px 20px 0 20px",boxSizing:"border-box",overflow:"hidden"},children:[i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px",marginBottom:"8px"},children:[i.jsx("h3",{id:"text-us-section-title",style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF",margin:0},children:"Text us"}),i.jsx("p",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8,margin:0},children:"Exclusive events, contests, and more"})]}),i.jsx("div",{style:{width:"calc(100% + 40px)",marginLeft:"-20px",marginRight:"-20px",marginBottom:"0",height:"180px",borderRadius:"0 0 20px 20px",overflow:"hidden",background:"transparent"},children:i.jsx(xt,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:!0,style:{width:"100%",height:"100%",border:"none",borderRadius:"0 0 20px 20px",background:"transparent",display:"block"}})})]})}),i.jsx(ht,{compact:!0})]})]})}),T&&i.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.7)",backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",zIndex:10001,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"20px",boxSizing:"border-box",overflow:"hidden",overscrollBehavior:"none",touchAction:"none",animation:"expandedImageFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"},onClick:Pe,onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},children:[i.jsx("div",{style:{width:"min(80vw, 80vh)",height:"min(80vw, 80vh)",aspectRatio:"1 / 1",borderRadius:"20px",overflow:"hidden",marginBottom:"20px",animation:"expandedImageScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.6)",border:"1px solid rgba(255, 255, 255, 0.1)",cursor:"pointer"},onClick:e=>e.stopPropagation(),children:i.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:T.imageUrl,alt:T.title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})}),i.jsxs("div",{style:{display:"flex",gap:"16px",animation:"expandedButtonsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both"},onClick:e=>e.stopPropagation(),children:[i.jsx("button",{onClick:()=>{navigator.share?navigator.share({title:T.title,text:`Check out this event: ${T.title}`,url:window.location.href}):(navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!"))},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"80px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:"Share"}),T.isRealEvent&&T.hasTicketLink?i.jsx("button",{onClick:()=>{console.log(`🎫 Opening ticket link from modal for ${T.title}:`,T.ticketsUrl),window.open(T.ticketsUrl,"_blank","noopener,noreferrer"),Pe()},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"100px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:T.buttonText||"View Event"}):null]})]})]})};export{Pt as default};
