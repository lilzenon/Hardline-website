const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/about-mobile-Bw8rH9Tz.js","assets/react-core-CelsEjp7.js","assets/vendor-7EMnm0rL.js","assets/utils-C-v5iGDk.js","assets/analytics-CJ5epBg3.js","assets/mobile-components-B9xuVsUD.js","assets/homepage-mobile-Bu8wfH3y.js","assets/animations-CnNmmfel.js"])))=>i.map(i=>d[i]);
import{r as t,j as e,R as i}from"./react-core-CelsEjp7.js"
import{u as o}from"./utils-C-v5iGDk.js"
import{g as n}from"./animations-CnNmmfel.js"
const r={},a=function(t,e,i){function o(t){const e=new Event("vite:preloadError",{cancelable:!0})
if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}let n=Promise.resolve()
if(e&&e.length>0){let t=function(t){return Promise.all(t.map(t=>Promise.resolve(t).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))}
document.getElementsByTagName("link")
const i=document.querySelector("meta[property=csp-nonce]"),o=i?.nonce||i?.getAttribute("nonce")
n=t(e.map(t=>{if((t=function(t){return"/"+t}(t))in r)return
r[t]=!0
const e=t.endsWith(".css"),i=e?'[rel="stylesheet"]':""
if(document.querySelector(`link[href="${t}"]${i}`))return
const n=document.createElement("link")
return n.rel=e?"stylesheet":"modulepreload",e||(n.as="script"),n.crossOrigin="",n.href=t,o&&n.setAttribute("nonce",o),document.head.appendChild(n),e?new Promise((e,i)=>{n.addEventListener("load",e),n.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${t}`)))}):void 0}))}return n.then(e=>{for(const t of e||[])"rejected"===t.status&&o(t.reason)
return t().catch(o)})},s=({items:i,ease:o="power3.out",duration:r=.6,stagger:a=.05,animateFrom:s="bottom",scaleOnHover:d=!0,hoverScale:l=.95,blurToFocus:c=!0,colorShiftOnHover:h=!1})=>{const p=((e,i)=>{const o=()=>i[e.findIndex(t=>matchMedia(t).matches)]??1,[n,r]=t.useState(o)
return t.useEffect(()=>{const t=()=>r(o)
return e.forEach(e=>matchMedia(e).addEventListener("change",t)),()=>e.forEach(e=>matchMedia(e).removeEventListener("change",t))},[e]),n})(["(min-width:1500px)","(min-width:1000px)","(min-width:600px)","(min-width:400px)"],[5,4,3,2]),[u,{width:g}]=(()=>{const e=t.useRef(null),[i,o]=t.useState({width:0,height:0})
return t.useLayoutEffect(()=>{if(!e.current)return
const t=new ResizeObserver(([t])=>{const{width:e,height:i}=t.contentRect
o({width:e,height:i})})
return t.observe(e.current),()=>t.disconnect()},[]),[e,i]})(),[m,x]=t.useState(!1)
t.useEffect(()=>{(async t=>{await Promise.all(t.map(t=>new Promise(e=>{const i=new Image
i.src=t,i.onload=i.onerror=()=>e()})))})(i.map(t=>t.img)).then(()=>x(!0))},[i])
const b=t.useMemo(()=>{if(!g)return[]
const t=new Array(p).fill(0),e=g/p
return i.map(i=>{const o=t.indexOf(Math.min(...t)),n=e*o,r=i.height||200,a=t[o]
return t[o]+=r+16,{...i,x:n,y:a,w:e-8,h:r}})},[p,i,g]),f=t.useRef(!1)
return t.useLayoutEffect(()=>{m&&(b.forEach((t,e)=>{const i=`[data-key="${t.id}"]`,d={x:t.x,y:t.y,width:t.w,height:t.h}
if(f.current)n.to(i,{...d,duration:r,ease:o,overwrite:"auto"})
else{const o=(t=>{const e=u.current?.getBoundingClientRect()
if(!e)return{x:t.x,y:t.y}
let i=s
if("random"===s){const t=["top","bottom","left","right"]
i=t[Math.floor(Math.random()*t.length)]}switch(i){case"top":return{x:t.x,y:-200}
case"bottom":return{x:t.x,y:window.innerHeight+200}
case"left":return{x:-200,y:t.y}
case"right":return{x:window.innerWidth+200,y:t.y}
case"center":return{x:e.width/2-t.w/2,y:e.height/2-t.h/2}
default:return{x:t.x,y:t.y+100}}})(t),r={opacity:0,x:o.x,y:o.y,width:t.w,height:t.h,...c&&{filter:"blur(10px)"}}
n.fromTo(i,r,{opacity:1,...d,...c&&{filter:"blur(0px)"},duration:.8,ease:"power3.out",delay:e*a})}}),f.current=!0)},[b,m,a,s,c,r,o]),e.jsx("div",{ref:u,style:{position:"relative",width:"100%",height:b.length>0?Math.max(...b.map(t=>t.y+t.h))+"px":"auto"},children:b.map(t=>e.jsx("div",{"data-key":t.id,className:"item-wrapper",style:{position:"absolute",cursor:"pointer",borderRadius:"8px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)"},onClick:()=>window.open(t.url,"_blank","noopener"),onMouseEnter:e=>((t,e)=>{const i=t.currentTarget,o=`[data-key="${e.id}"]`
if(d&&n.to(o,{scale:l,duration:.3,ease:"power2.out"}),h){const t=i.querySelector(".color-overlay")
t&&n.to(t,{opacity:.3,duration:.3})}})(e,t),onMouseLeave:e=>((t,e)=>{const i=t.currentTarget,o=`[data-key="${e.id}"]`
if(d&&n.to(o,{scale:1,duration:.3,ease:"power2.out"}),h){const t=i.querySelector(".color-overlay")
t&&n.to(t,{opacity:0,duration:.3})}})(e,t),children:e.jsx("div",{className:"item-img",style:{backgroundImage:`url(${t.img})`,width:"100%",height:"100%",backgroundSize:"cover",backgroundPosition:"center",borderRadius:"8px"},children:h&&e.jsx("div",{className:"color-overlay",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",opacity:0,pointerEvents:"none",borderRadius:"8px"}})})},t.id))})},d=Object.freeze(Object.defineProperty({__proto__:null,default:()=>{const{isMobile:n,width:r}=o(),[d,l]=t.useState(!1),[c,h]=t.useState(!0),[p,u]=t.useState("About"),[g,m]=t.useState(""),[x,b]=t.useState(!0),[f,w]=t.useState(null),[v,y]=t.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:825,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:440,textUsWidth:299})
t.useEffect(()=>{(()=>{const t=navigator.userAgent||"",e=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
l(n||e||r<=768),h(!1)})()},[n,r]),t.useEffect(()=>{(()=>{const t=r-32,e=Math.max(829,789)
let i=Math.min(t/e,793/e)
i<.25&&(i=.25),i>1.25&&(i=1.25)
const o={heroWidth:Math.round(299*i),heroHeight:Math.round(299*i),rightHeroWidth:Math.round(498*i),rightHeroHeight:Math.round(299*i),gap:Math.round(32*i),containerWidth:825,eventsWidth:Math.round(440*i),textUsWidth:Math.round(299*i),eventsTextGap:18,eventCardWidth:220,eventCardHeight:85}
y(o)})()},[r]),t.useEffect(()=>{k()},[])
const k=async()=>{try{b(!0),w(null)
const t="localhost"===window.location.hostname?"":"https://admin.b2b.click"
void 0
const e=await fetch(`${t}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"})
if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`)
const i=await e.json()
if(!i.success||!i.data)throw new Error("Invalid response format")
m(i.data.content)}catch(t){void 0,w(t.message),m("Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.\n\nOur platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.\n\nAt BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.\n\nJoin our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.")}finally{b(!1)}},F=t=>{u(t),"Events"===t?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":"About"===t?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":"Contact"===t&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},C=(t,e)=>{const i=p===t
return{position:"absolute",left:e,top:"4.15px",display:"flex",width:"82.54px",height:"30.81px",padding:"13px 12px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"10px",background:i?"#000":"transparent",boxShadow:i?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:i?"scale(1)":"scale(0.95)",opacity:i?1:.8}},M=t=>({color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:p===t?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"})
if(c)return e.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",justifyContent:"center",alignItems:"center",color:"#FFF",fontFamily:"Inter, sans-serif",fontSize:"18px"},children:"Loading..."})
if(d){const t=i.lazy(()=>a(()=>import("./about-mobile-Bw8rH9Tz.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])))
return e.jsx(i.Suspense,{fallback:e.jsx("div",{style:{position:"fixed",top:"20px",right:"20px",background:"rgba(0, 0, 0, 0.8)",color:"#FFFFFF",padding:"8px 16px",borderRadius:"20px",fontFamily:"Inter, sans-serif",fontSize:"14px",zIndex:9999,backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)",opacity:.9},children:"Loading about page..."}),children:e.jsx(t,{})})}return e.jsx("div",{className:"homepage-content",children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${v.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"100vh",padding:"0 16px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",style:{width:"138.41px",height:"43px"}}),e.jsxs("div",{style:{position:"relative",width:"260.46px",height:"39.1px",gridColumn:"3",justifySelf:"end"},children:[e.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"260.46px",height:"39.1px",background:"#232323",borderRadius:"12px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),e.jsx("div",{style:C("Events","3.73px"),onClick:()=>F("Events"),children:e.jsx("span",{style:M("Events"),children:"Events"})}),e.jsx("div",{style:C("About","88.58px"),onClick:()=>F("About"),children:e.jsx("span",{style:M("About"),children:"About"})}),e.jsx("div",{style:C("Contact","173.44px"),onClick:()=>F("Contact"),children:e.jsx("span",{style:M("Contact"),children:"Contact"})})]})]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px"},children:"About Us"}),e.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box"},children:x?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"200px",fontSize:"16px",color:"rgba(255, 255, 255, 0.7)"},children:"Loading content..."}):e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{textAlign:"left"},children:(t=>{if(!t)return[]
const i=t.split(/\n\s*\n|\n/).filter(t=>t.trim())
return i.map((t,o)=>e.jsx("p",{style:{margin:o===i.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:t.trim()},o))})(g)}),f&&e.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})}),e.jsxs("div",{style:{width:"100%",maxWidth:"1000px",margin:"48px auto 0 auto",padding:"0 16px",boxSizing:"border-box"},children:[e.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),e.jsx(s,{items:[{id:"1",img:"https://picsum.photos/id/1015/600/900",url:"https://example.com/one",height:400},{id:"2",img:"https://picsum.photos/id/1011/600/750",url:"https://example.com/two",height:250},{id:"3",img:"https://picsum.photos/id/1020/600/800",url:"https://example.com/three",height:300},{id:"4",img:"https://picsum.photos/id/1025/600/700",url:"https://example.com/four",height:350},{id:"5",img:"https://picsum.photos/id/1035/600/650",url:"https://example.com/five",height:280},{id:"6",img:"https://picsum.photos/id/1040/600/850",url:"https://example.com/six",height:420},{id:"7",img:"https://picsum.photos/id/1050/600/600",url:"https://example.com/seven",height:320},{id:"8",img:"https://picsum.photos/id/1060/600/750",url:"https://example.com/eight",height:380}],ease:"power3.out",duration:.6,stagger:.05,animateFrom:"bottom",scaleOnHover:!0,hoverScale:.95,blurToFocus:!0,colorShiftOnHover:!1})]})]})})})}},Symbol.toStringTag,{value:"Module"}))
export{d as A,s as M,a as _}
