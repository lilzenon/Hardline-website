const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-C8kk0TXr.js","assets/index-BI7dje9I.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-Cd0XAVOv.js","assets/SocialMediaButtons-DDDT61w9.js","assets/Footer-_oh_m9DM.js","assets/Breadcrumb-C_vqnJvS.js","assets/breadcrumbSchema-BG74ATTs.js"])))=>i.map(i=>d[i]);
import{r as J,j as r,D as H,B as G,_ as q}from"./index-BI7dje9I.js";import{b as a,R as Y}from"./vendor-ViNJc2wV.js";import{u as X,D as K,F as Q}from"./Footer-_oh_m9DM.js";import{B as Z}from"./Breadcrumb-C_vqnJvS.js";import{i as ee}from"./breadcrumbSchema-BG74ATTs.js";var te=J();const oe=({images:t=[],columns:g={desktop:4,tablet:3,mobile:2},gap:I=16,className:C="",onImageClick:F=null})=>{const[P,R]=a.useState(new Set),[W,E]=a.useState(()=>{if(typeof window>"u")return g.desktop;const e=window.innerWidth;return e<768?g.mobile:e<1024?g.tablet:g.desktop}),[o,v]=a.useState(!1),[d,y]=a.useState(null),[T,S]=a.useState(new Map),[m,l]=a.useState(!1),f=a.useRef(null),w=a.useRef(null),n=a.useRef(null),h=a.useRef(0),u=a.useRef({y:0,locked:!1}),c=a.useCallback(()=>{if(u.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;u.current.y=e,u.current.locked=!0;const i=document.body.style;i.position="fixed",i.top=`-${e}px`,i.left="0",i.right="0",i.width="100%",i.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const s=x=>{x.preventDefault(),x.stopPropagation()};window.addEventListener("wheel",s,{passive:!1,capture:!0}),window.addEventListener("touchmove",s,{passive:!1,capture:!0}),u.current.preventScroll=s},[]),k=a.useCallback(()=>{if(!u.current.locked)return;const e=u.current.y||0,i=document.body.style;i.position="",i.top="",i.left="",i.right="",i.width="",i.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",u.current.preventScroll&&(window.removeEventListener("wheel",u.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",u.current.preventScroll,{capture:!0}),u.current.preventScroll=void 0),u.current.locked=!1,window.scrollTo(0,e)},[]),p=a.useCallback(()=>{const e=f.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?E(g.mobile):e<1024?E(g.tablet):E(g.desktop)},[g]),b=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){v(!0);return}if(w.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(v(!0),w.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),f.current)w.current.observe(f.current);else{const e=setTimeout(()=>v(!0),800);return()=>clearTimeout(e)}return()=>w.current?.disconnect()},[]),a.useEffect(()=>(p(),window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)),[p]),a.useEffect(()=>{if(!o&&Array.isArray(t)&&t.length>0){const e=setTimeout(()=>v(!0),1e3);return()=>clearTimeout(e)}},[t,o]),a.useEffect(()=>{if(!o)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>p()):p();const e=setTimeout(p,150);return()=>clearTimeout(e)},[o,p]),a.useEffect(()=>{const e=()=>p();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[p]),a.useEffect(()=>{if(!f.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>p());return e.observe(f.current),()=>e.disconnect()},[p]);const M=a.useCallback(e=>{R(i=>new Set([...i,e])),S(i=>new Map(i.set(e,"loaded")))},[]),L=a.useCallback(e=>{S(i=>new Map(i.set(e,"loading")))},[]),A=a.useCallback((e,i)=>{if(Date.now()-h.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(m){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const x=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",x),x?(y({...e,url:x,index:i}),c()):console.error("❌ No valid image URL found in image object:",e),F&&F(e)},[F,m]),j=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),l(!0),h.current=Date.now();let i=!1;const s=x=>{i||(i=!0,x.preventDefault(),x.stopPropagation(),typeof x.stopImmediatePropagation=="function"&&x.stopImmediatePropagation(),document.removeEventListener("pointerup",s,!0),document.removeEventListener("click",s,!0),document.removeEventListener("touchend",s,!0))};document.addEventListener("pointerup",s,!0),document.addEventListener("click",s,!0),document.addEventListener("touchend",s,!0),y(null),k(),setTimeout(()=>{l(!1)},100)},[]),B=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),j(e))},[j]),$=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),j(e))},[j]);a.useEffect(()=>{const e=i=>{if(d)switch(i.key){case"Escape":i.preventDefault(),j();break;case"Enter":case" ":i.preventDefault(),j();break}};if(d){if(document.addEventListener("keydown",e),n.current)try{n.current.focus({preventScroll:!0})}catch{b()||n.current.focus()}return()=>document.removeEventListener("keydown",e)}},[d,j,b]);const _=a.useCallback(()=>{const e=Array.from({length:W},()=>[]),i=Array(W).fill(0);return t.forEach((s,x)=>{const z=i.indexOf(Math.min(...i));e[z].push({...s,originalIndex:x});const N=300*(s.aspectRatio||s.height/s.width||1.2);i[z]+=N+I}),e},[t,W,I])(),D=`
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      to {
        opacity: 1;
        backdrop-filter: blur(20px);
      }
    }

    @keyframes imageExpand {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .masonry-image {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border-radius: 12px;
      overflow: hidden;
    }

    .masonry-image:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }

    .skeleton-shimmer {
      background: linear-gradient(90deg,
        rgba(22, 22, 22, 0.9) 25%,
        rgba(56, 56, 56, 0.5) 50%,
        rgba(22, 22, 22, 0.9) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 2s ease-in-out infinite;
      border-radius: 12px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .modal-backdrop {
      animation: modalFadeIn 0.3s ease-out;
    }

    .expanded-image {
      animation: imageExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .masonry-image, .masonry-image:hover {
        transition: none;
        transform: none;
      }
      .skeleton-shimmer {
        animation: none;
      }
    }
  `;return o?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:D}),r.jsx("div",{ref:f,className:`masonry-gallery ${C}`,style:{display:"flex",gap:`${I}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:_.map((e,i)=>r.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${I}px`},children:e.map(s=>r.jsx(ne,{image:s,isLoaded:P.has(s.originalIndex),loadingState:T.get(s.originalIndex),onLoad:()=>M(s.originalIndex),onLoadStart:()=>L(s.originalIndex),onClick:()=>A(s,s.originalIndex)},s.originalIndex))},i))}),d&&te.createPortal(r.jsx("div",{ref:n,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:b()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:B,onTouchEnd:$,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:r.jsxs("div",{className:"expanded-image",style:{maxWidth:(b(),"90vw"),maxHeight:b()?"80vh":"90vh",position:"relative",margin:(b(),"20px"),borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:m?"scale(0.95)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[r.jsx("img",{src:d.urls?.large||d.url||d.src||d.image_url||d.file_url,alt:d.alt||d.title||"Gallery image",title:d.title||d.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)",display:"block",margin:"0 auto"},onError:e=>{const i=e.target,s=i.src;if(d.urls){if(s!==d.urls.medium&&d.urls.medium){i.src=d.urls.medium;return}else if(s!==d.urls.original&&d.urls.original){i.src=d.urls.original;return}}i.style.display="none"}}),r.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),j(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),j(e)},"aria-label":"Close image",style:{position:"absolute",top:b()?"10px":"-10px",right:b()?"10px":"-10px",width:b()?"44px":"40px",height:b()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:D}),r.jsx("div",{ref:f,className:`masonry-gallery-placeholder ${C}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:r.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[r.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),r.jsx("span",{children:"Loading Gallery..."})]})})]})},ne=({image:t,isLoaded:g,loadingState:I,onLoad:C,onLoadStart:F,onClick:P})=>{const[R,W]=a.useState(!1),E=a.useRef(null),o=a.useCallback(()=>{C()},[C]),v=a.useCallback(()=>{F()},[F]),d=a.useCallback(()=>{try{const m=t?.url||t?.src||t?.image_url||t?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:m,image:t})}catch{}W(!0),C()},[C,t]),y=a.useCallback(()=>{P&&P(t)},[P,t]),T=a.useRef({x:0,y:0,time:0}),S=a.useRef(!1);return r.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:P?"pointer":"default",opacity:g?1:0,animation:g?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:t?.width&&t?.height?`${t.width} / ${t.height}`:void 0,minHeight:g?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:y,onTouchStart:m=>{if(window.innerWidth<768){const l=m.touches&&m.touches[0];if(!l)return;T.current={x:l.clientX,y:l.clientY,time:Date.now()},S.current=!1}},onTouchMove:m=>{if(window.innerWidth<768){const l=m.touches&&m.touches[0];if(!l)return;const f=Math.abs(l.clientX-T.current.x),w=Math.abs(l.clientY-T.current.y);(f>10||w>10)&&(S.current=!0)}},onTouchEnd:m=>{window.innerWidth<768&&(S.current||(m.preventDefault(),m.stopPropagation(),y()),S.current=!1)},children:[!g&&!R&&r.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:r.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),R?r.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:r.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[r.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),r.jsx("div",{children:"Image unavailable"})]})}):r.jsx("img",{ref:E,src:t.url||t.src||t.image_url||t.file_url,srcSet:(()=>{const m=t?.srcSet?.small||t?.urls?.small,l=t?.srcSet?.medium||t?.urls?.medium,f=t?.srcSet?.large||t?.urls?.large,w=[];return m&&w.push(`${m} 400w`),l&&w.push(`${l} 600w`),f&&w.push(`${f} 800w`),w.length?w.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:t.alt||t.title||"Gallery image",title:t.title||t.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:t?.width,height:t?.height,onLoadStart:v,onLoad:o,onError:m=>{const l=m.target,f=l.src;if(t.urls){if(f!==t.urls.medium&&t.urls.medium){console.log("🔄 Fallback to medium variant:",t.urls.medium),l.src=t.urls.medium;return}else if(f!==t.urls.small&&t.urls.small){console.log("🔄 Fallback to small variant:",t.urls.small),l.src=t.urls.small;return}else if(f!==t.urls.original&&t.urls.original){console.log("🔄 Fallback to original:",t.urls.original),l.src=t.urls.original;return}}if(parseInt(l.dataset.retryAttempt||"0",10)<1&&f){const n=f.includes("?")?"&":"?";l.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",f),l.src=`${f}${n}_cb=${Date.now()}`;return}d(m)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:g?1:0}}),t.title&&r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:t.title})]})},V="ld-json-about-gallery";function re(t){try{const g=V;if(!Array.isArray(t)||t.length===0){const o=document.getElementById(g);o&&o.remove();return}const I="https://bounce2bounce.com",C=12,F=(o,v)=>{if(o)return o.length<=v?o:`${o.slice(0,v-1)}…`},P=t.slice(0,C).map((o,v)=>{const d=o&&o.uuid;let y="";if(d)y=`${I}/api/images/serve/${d}/large`;else{const f=o&&o.urls&&(o.urls.large||o.urls.medium||o.urls.original)||o?.url||o?.src||"";f&&(/^https?:\/\//i.test(f)?y=f.replace(/^https?:\/\/[^/]+/i,I):f.startsWith("/")?y=`${I}${f}`:y=`${I}/${f}`)}if(!y)return null;const T=o?.alt||o?.title||o?.description||"Gallery image",S=F(o?.title||T,120),m=F(o?.description||T,160),l={"@type":"ImageObject","@id":`${y}#about-gallery-${v+1}`,contentUrl:y,url:y,caption:T};return S&&(l.name=S),m&&(l.description=m),o&&o.width&&o.height&&(l.width=o.width,l.height=o.height),o&&o.creator_name&&(l.creator={"@type":"Person",name:o.creator_name}),o&&o.credit_text&&(l.creditText=o.credit_text),o&&o.copyright_notice&&(l.copyrightNotice=o.copyright_notice),o&&o.license_url&&(l.license=o.license_url),o&&o.acquire_license_page_url&&(l.acquireLicensePage=o.acquire_license_page_url),l}).filter(Boolean);if(!P.length){const o=document.getElementById(g);o&&o.remove();return}const R={"@context":"https://schema.org","@graph":P},W=document.getElementById(g);W&&W.remove();const E=document.createElement("script");E.type="application/ld+json",E.id=g,E.text=JSON.stringify(R),document.head.appendChild(E)}catch(g){console.error("❌ Error generating About gallery JSON-LD:",g)}}function ae(){const t=document.getElementById(V);t&&t.remove()}const ie=()=>{const[t,g]=a.useState(!1),[I,C]=a.useState(!0),[F,P]=a.useState("About"),[R,W]=a.useState(""),[E,o]=a.useState(null),[v,d]=a.useState([]),[y,T]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const n="https://bounce2bounce.com",h=`${n}/about`,u=H?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",c=H?.about_page_og_image||`${n}/images/og-image.png`,k="ld-json-about",p=document.getElementById(k);p&&p.remove();const b=document.createElement("script");b.type="application/ld+json",b.id=k;const M={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:n,logo:`${n}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:h,description:u,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:n},primaryImageOfPage:{"@type":"ImageObject",url:c}}]};b.text=JSON.stringify(M),document.head.appendChild(b),ee("about")},[]),a.useEffect(()=>{const n=H?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=n}},[]),X(n=>{const{width:h}=n,u=h<=360?16:h<=480?24:32,c=h-u,k=299,p=299,b=498,M=299,L=32,A=1192,B=A-48,$=k+L+b,O=380,_=380,D=40,e=O+D+_,i=Math.max($,e);let s=Math.min(c/i,B/i);s=Math.min(s,1.8);const x={heroWidth:Math.round(k*s*.9),heroHeight:Math.round(p*s*.9),rightHeroWidth:Math.round(b*s),rightHeroHeight:Math.round(M*s),gap:Math.round(L*s),containerWidth:A,eventsWidth:Math.round(O*s),textUsWidth:Math.round(_*s),eventsTextGap:Math.round(D*s),eventCardWidth:220,eventCardHeight:85,scale:s},z=navigator.userAgent||"",U=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(z),N=h<=768||U;g(N),C(!1),T(x),console.log(`🎯 About page responsive scaling: ${s.toFixed(3)} for viewport ${h}px (max 1.8x, container: 1192px)`,x),console.log("📱 About Page Device Detection:",{viewportWidth:h,isMobileByUA:U,finalDecision:N?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{S(),l()},[]);const S=async()=>{try{o(null);const h=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const u=await fetch(`${h}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!u.ok)throw new Error(`HTTP error! status: ${u.status}`);const c=await u.json();if(c.success&&c.data)W(c.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(n){console.error("❌ Error fetching About page content:",n),W(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{}},m=n=>{const h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",u=n?.url||n?.src||n?.image_url||n?.file_url||n?.path||n?.imagePath||"",c=typeof u=="string"?u:u?.url||"";if(c&&/^https?:\/\//i.test(c))return{...n,url:c};if(c&&c.includes("/api/images/serve/")){const p=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(c)?c:`${c.replace(/\/?$/,"")}/medium`,b=p.startsWith("http")?p:`${h}${p}`;return{...n,url:b}}if(c&&c.startsWith("/")&&/[a-f0-9-]{36}/i.test(c)){const k=c.match(/([a-f0-9-]{36})/i);if(k){const p=k[1];return{...n,url:`${h}/api/images/serve/${p}/medium`}}}return n&&n.uuid&&typeof n.uuid=="string"?{...n,url:`${h}/api/images/serve/${n.uuid}/medium`}:c&&c.startsWith("/")?{...n,url:`${h}${c}`}:n},l=async()=>{try{const h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",u=`cb=${Date.now()}`,c=`${h}/api/settings/about/gallery/public?${u}`;console.log("🔍 Fetching gallery from:",c);const k=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(k.ok){const p=await k.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(p,null,2)),p.success&&Array.isArray(p.data)){console.log("🖼️ First image structure:",p.data[0]);const b=p.data.map((M,L)=>{const A=m(M),j=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",B=D=>{if(!D)return D;const e=/^https?:\/\//i.test(D)?D:`${j}${D}`,i=e.includes("?")?"&":"?";return`${e}${i}${u}`},$=A&&(A.urls||A.srcSet)||{},O={thumbnail:B($.thumbnail),small:B($.small),medium:B($.medium||A?.url),large:B($.large),original:B($.original||A?.url)},_={...A,urls:O,srcSet:O};return L<5&&console.log("🧭 Normalized gallery image",L,_?.url||_,_.urls),_});d(b)}else console.warn("Invalid gallery response format:",p),d([])}else console.warn("Failed to fetch gallery images:",k.status),d([])}catch(n){console.error("❌ Error fetching gallery images:",n),d([])}};a.useEffect(()=>(re(v),()=>{ae()}),[v]);const f=n=>{if(!n)return[];const h=n.split(/\n\s*\n|\n/).filter(u=>u.trim());return h.map((u,c)=>r.jsx("p",{style:{margin:c===h.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:u.trim()},c))},w=n=>{P(n),console.log(`🧭 About Page Navigation: Switched to ${n} tab`)};if(I)return r.jsx(G,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(t){const n=Y.lazy(()=>q(()=>import("./AboutPageMobile-C8kk0TXr.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])));return r.jsx(Y.Suspense,{fallback:r.jsx(G,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:r.jsx(n,{})})}return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .skeleton-shimmer {
            background: linear-gradient(90deg,
              rgba(22, 22, 22, 0.8) 25%,
              rgba(56, 56, 56, 0.4) 50%,
              rgba(22, 22, 22, 0.8) 75%
            );
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }

          .image-hover-scale {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-hover-scale:hover {
            transform: scale(1.05);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}),r.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:r.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${y.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:r.jsxs("div",{style:{width:"100%",position:"relative"},children:[r.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[r.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:n=>{n.currentTarget.style.transform="scale(1.05)",n.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:n=>{n.currentTarget.style.transform="scale(1)",n.currentTarget.style.filter="brightness(1)"}}),r.jsx(K,{currentPage:"About",onNavigate:w})]}),r.jsx(Z,{items:[{name:"Home",url:"/"},{name:"About"}]}),r.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),r.jsx("div",{style:{width:"100%",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:E?r.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):r.jsx("div",{style:{textAlign:"left"},children:f(R)})}),r.jsxs("div",{style:{marginTop:t?"0px":"8px",marginBottom:"32px"},children:[r.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:t?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),r.jsx(oe,{images:v,columns:{desktop:4,tablet:3,mobile:2},gap:t?12:16})]}),r.jsx(Q,{compact:!1})]})})})]})},pe=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));export{pe as A,oe as M,re as i,ae as r};
