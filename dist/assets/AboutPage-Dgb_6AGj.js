const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-LkXL3C1h.js","assets/index-EeJX89Yu.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-DUcf4isS.js","assets/SocialMediaButtons-BinU22__.js","assets/Footer-tU8ePnpY.js","assets/Breadcrumb-Auo5gmKZ.js","assets/breadcrumbSchema-BG74ATTs.js"])))=>i.map(i=>d[i]);
import{r as J,j as n,D as H,B as G,_ as q}from"./index-EeJX89Yu.js";import{b as a,R as Y}from"./vendor-ViNJc2wV.js";import{u as X,D as K,F as Q}from"./Footer-tU8ePnpY.js";import{B as Z}from"./Breadcrumb-Auo5gmKZ.js";import{i as ee}from"./breadcrumbSchema-BG74ATTs.js";var te=J();const oe=({images:t=[],columns:g={desktop:4,tablet:3,mobile:2},gap:E=16,className:P="",onImageClick:F=null})=>{const[W,_]=a.useState(new Set),[T,S]=a.useState(()=>{if(typeof window>"u")return g.desktop;const e=window.innerWidth;return e<768?g.mobile:e<1024?g.tablet:g.desktop}),[r,w]=a.useState(!1),[d,y]=a.useState(null),[A,j]=a.useState(new Map),[m,l]=a.useState(!1),u=a.useRef(null),k=a.useRef(null),o=a.useRef(null),p=a.useRef(0),f=a.useRef({y:0,locked:!1}),c=a.useCallback(()=>{if(f.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;f.current.y=e,f.current.locked=!0;const i=document.body.style;i.position="fixed",i.top=`-${e}px`,i.left="0",i.right="0",i.width="100%",i.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const s=v=>{v.preventDefault(),v.stopPropagation()};window.addEventListener("wheel",s,{passive:!1,capture:!0}),window.addEventListener("touchmove",s,{passive:!1,capture:!0}),f.current.preventScroll=s},[]),I=a.useCallback(()=>{if(!f.current.locked)return;const e=f.current.y||0,i=document.body.style;i.position="",i.top="",i.left="",i.right="",i.width="",i.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",f.current.preventScroll&&(window.removeEventListener("wheel",f.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",f.current.preventScroll,{capture:!0}),f.current.preventScroll=void 0),f.current.locked=!1,window.scrollTo(0,e)},[]),h=a.useCallback(()=>{const e=u.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?S(g.mobile):e<1024?S(g.tablet):S(g.desktop)},[g]),b=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){w(!0);return}if(k.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(w(!0),k.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),u.current)k.current.observe(u.current);else{const e=setTimeout(()=>w(!0),800);return()=>clearTimeout(e)}return()=>k.current?.disconnect()},[]),a.useEffect(()=>(h(),window.addEventListener("resize",h),()=>window.removeEventListener("resize",h)),[h]),a.useEffect(()=>{if(!r&&Array.isArray(t)&&t.length>0){const e=setTimeout(()=>w(!0),1e3);return()=>clearTimeout(e)}},[t,r]),a.useEffect(()=>{if(!r)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>h()):h();const e=setTimeout(h,150);return()=>clearTimeout(e)},[r,h]),a.useEffect(()=>{const e=()=>h();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[h]),a.useEffect(()=>{if(!u.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>h());return e.observe(u.current),()=>e.disconnect()},[h]);const C=a.useCallback(e=>{_(i=>new Set([...i,e])),j(i=>new Map(i.set(e,"loaded")))},[]),L=a.useCallback(e=>{j(i=>new Map(i.set(e,"loading")))},[]),B=a.useCallback((e,i)=>{if(Date.now()-p.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(m){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const v=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",v),v?(y({...e,url:v,index:i}),c()):console.error("❌ No valid image URL found in image object:",e),F&&F(e)},[F,m]),x=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),l(!0),p.current=Date.now();let i=!1;const s=v=>{i||(i=!0,v.preventDefault(),v.stopPropagation(),typeof v.stopImmediatePropagation=="function"&&v.stopImmediatePropagation(),document.removeEventListener("pointerup",s,!0),document.removeEventListener("click",s,!0),document.removeEventListener("touchend",s,!0))};document.addEventListener("pointerup",s,!0),document.addEventListener("click",s,!0),document.addEventListener("touchend",s,!0),y(null),I(),setTimeout(()=>{l(!1)},100)},[]),O=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e))},[x]),$=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e))},[x]);a.useEffect(()=>{const e=i=>{if(d)switch(i.key){case"Escape":i.preventDefault(),x();break;case"Enter":case" ":i.preventDefault(),x();break}};if(d){if(document.addEventListener("keydown",e),o.current)try{o.current.focus({preventScroll:!0})}catch{b()||o.current.focus()}return()=>document.removeEventListener("keydown",e)}},[d,x,b]);const R=a.useCallback(()=>{const e=Array.from({length:T},()=>[]),i=Array(T).fill(0);return t.forEach((s,v)=>{const z=i.indexOf(Math.min(...i));e[z].push({...s,originalIndex:v});const N=300*(s.aspectRatio||s.height/s.width||1.2);i[z]+=N+E}),e},[t,T,E])(),M=`
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
  `;return r?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:M}),n.jsx("div",{ref:u,className:`masonry-gallery ${P}`,style:{display:"flex",gap:`${E}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:R.map((e,i)=>n.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${E}px`},children:e.map(s=>n.jsx(re,{image:s,isLoaded:W.has(s.originalIndex),loadingState:A.get(s.originalIndex),onLoad:()=>C(s.originalIndex),onLoadStart:()=>L(s.originalIndex),onClick:()=>B(s,s.originalIndex)},s.originalIndex))},i))}),d&&te.createPortal(n.jsx("div",{ref:o,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:b()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:O,onTouchEnd:$,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:n.jsxs("div",{className:"expanded-image",style:{maxWidth:(b(),"90vw"),maxHeight:b()?"80vh":"90vh",position:"relative",margin:(b(),"20px"),borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:m?"scale(0.95)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[n.jsx("img",{src:d.urls?.large||d.url||d.src||d.image_url||d.file_url,alt:d.alt||d.title||"Gallery image",title:d.title||d.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)",display:"block",margin:"0 auto"},onError:e=>{const i=e.target,s=i.src;if(d.urls){if(s!==d.urls.medium&&d.urls.medium){i.src=d.urls.medium;return}else if(s!==d.urls.original&&d.urls.original){i.src=d.urls.original;return}}i.style.display="none"}}),n.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e)},"aria-label":"Close image",style:{position:"absolute",top:b()?"10px":"-10px",right:b()?"10px":"-10px",width:b()?"44px":"40px",height:b()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:M}),n.jsx("div",{ref:u,className:`masonry-gallery-placeholder ${P}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:n.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[n.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),n.jsx("span",{children:"Loading Gallery..."})]})})]})},re=({image:t,isLoaded:g,loadingState:E,onLoad:P,onLoadStart:F,onClick:W})=>{const[_,T]=a.useState(!1),S=a.useRef(null),r=a.useCallback(()=>{P()},[P]),w=a.useCallback(()=>{F()},[F]),d=a.useCallback(()=>{try{const m=t?.url||t?.src||t?.image_url||t?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:m,image:t})}catch{}T(!0),P()},[P,t]),y=a.useCallback(()=>{W&&W(t)},[W,t]),A=a.useRef({x:0,y:0,time:0}),j=a.useRef(!1);return n.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:W?"pointer":"default",opacity:g?1:0,animation:g?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:t?.width&&t?.height?`${t.width} / ${t.height}`:void 0,minHeight:g?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:y,onTouchStart:m=>{if(window.innerWidth<768){const l=m.touches&&m.touches[0];if(!l)return;A.current={x:l.clientX,y:l.clientY,time:Date.now()},j.current=!1}},onTouchMove:m=>{if(window.innerWidth<768){const l=m.touches&&m.touches[0];if(!l)return;const u=Math.abs(l.clientX-A.current.x),k=Math.abs(l.clientY-A.current.y);(u>10||k>10)&&(j.current=!0)}},onTouchEnd:m=>{window.innerWidth<768&&(j.current||(m.preventDefault(),m.stopPropagation(),y()),j.current=!1)},children:[!g&&!_&&n.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),_?n.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:n.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[n.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),n.jsx("div",{children:"Image unavailable"})]})}):n.jsx("img",{ref:S,src:t.url||t.src||t.image_url||t.file_url,srcSet:(()=>{const m=t?.srcSet?.small||t?.urls?.small,l=t?.srcSet?.medium||t?.urls?.medium,u=t?.srcSet?.large||t?.urls?.large,k=[];return m&&k.push(`${m} 400w`),l&&k.push(`${l} 600w`),u&&k.push(`${u} 800w`),k.length?k.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:t.alt||t.title||"Gallery image",title:t.title||t.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:t?.width,height:t?.height,onLoadStart:w,onLoad:r,onError:m=>{const l=m.target,u=l.src;if(t.urls){if(u!==t.urls.medium&&t.urls.medium){console.log("🔄 Fallback to medium variant:",t.urls.medium),l.src=t.urls.medium;return}else if(u!==t.urls.small&&t.urls.small){console.log("🔄 Fallback to small variant:",t.urls.small),l.src=t.urls.small;return}else if(u!==t.urls.original&&t.urls.original){console.log("🔄 Fallback to original:",t.urls.original),l.src=t.urls.original;return}}if(parseInt(l.dataset.retryAttempt||"0",10)<1&&u){const o=u.includes("?")?"&":"?";l.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",u),l.src=`${u}${o}_cb=${Date.now()}`;return}d(m)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:g?1:0}}),t.title&&n.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:t.title})]})},V="ld-json-about-gallery";function ne(t){try{const g=V;if(!Array.isArray(t)||t.length===0){const r=document.getElementById(g);r&&r.remove();return}const E="https://bounce2bounce.com",P=12,F=(r,w)=>{if(r)return r.length<=w?r:`${r.slice(0,w-1)}…`},W=t.slice(0,P).map((r,w)=>{const d=r&&r.uuid;let y="";if(d)y=`${E}/api/images/serve/${d}/large`;else{const u=r&&r.urls&&(r.urls.large||r.urls.medium||r.urls.original)||r?.url||r?.src||"";u&&(/^https?:\/\//i.test(u)?y=u.replace(/^https?:\/\/[^/]+/i,E):u.startsWith("/")?y=`${E}${u}`:y=`${E}/${u}`)}if(!y)return null;const A=r?.alt||r?.title||r?.description||"Gallery image",j=F(r?.title||A,120),m=F(r?.description||A,160),l={"@type":"ImageObject","@id":`${y}#about-gallery-${w+1}`,contentUrl:y,url:y,caption:A};return j&&(l.name=j),m&&(l.description=m),r&&r.width&&r.height&&(l.width=r.width,l.height=r.height),r&&r.creator_name&&(l.creator={"@type":"Person",name:r.creator_name}),r&&r.credit_text&&(l.creditText=r.credit_text),r&&r.copyright_notice&&(l.copyrightNotice=r.copyright_notice),r&&r.license_url&&(l.license=r.license_url),r&&r.acquire_license_page_url&&(l.acquireLicensePage=r.acquire_license_page_url),l}).filter(Boolean);if(!W.length){const r=document.getElementById(g);r&&r.remove();return}const _={"@context":"https://schema.org","@graph":W},T=document.getElementById(g);T&&T.remove();const S=document.createElement("script");S.type="application/ld+json",S.id=g,S.text=JSON.stringify(_),document.head.appendChild(S)}catch(g){console.error("❌ Error generating About gallery JSON-LD:",g)}}function ae(){const t=document.getElementById(V);t&&t.remove()}const ie=()=>{const[t,g]=a.useState(!1),[E,P]=a.useState(!0),[F,W]=a.useState("About"),[_,T]=a.useState(""),[S,r]=a.useState(null),[w,d]=a.useState([]),[y,A]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const o="https://bounce2bounce.com",p=`${o}/about`,f=H?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",c=H?.about_page_og_image||`${o}/images/og-image.png`,I="ld-json-about",h=document.getElementById(I);h&&h.remove();const b=document.createElement("script");b.type="application/ld+json",b.id=I;const C={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:o,logo:`${o}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:p,description:f,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:o},primaryImageOfPage:{"@type":"ImageObject",url:c}}]};b.text=JSON.stringify(C),document.head.appendChild(b),ee("about")},[]),a.useEffect(()=>{const o=H?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=o}},[]),X(o=>{const{width:p}=o,f=p<=360?16:p<=480?24:32,c=p-f,I=299,h=299,b=498,C=299,L=32,B=1192,O=B-48,$=I+L+b,D=380,R=380,M=40,e=D+M+R,i=Math.max($,e);let s=Math.min(c/i,O/i);s=Math.min(s,1.8);const v={heroWidth:Math.round(I*s*.9),heroHeight:Math.round(h*s*.9),rightHeroWidth:Math.round(b*s),rightHeroHeight:Math.round(C*s),gap:Math.round(L*s),containerWidth:B,eventsWidth:Math.round(D*s),textUsWidth:Math.round(R*s),eventsTextGap:Math.round(M*s),eventCardWidth:220,eventCardHeight:85,scale:s},z=navigator.userAgent||"",U=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(z),N=p<=768||U;g(N),P(!1),A(v),console.log(`🎯 About page responsive scaling: ${s.toFixed(3)} for viewport ${p}px (max 1.8x, container: 1192px)`,v),console.log("📱 About Page Device Detection:",{viewportWidth:p,isMobileByUA:U,finalDecision:N?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{j(),l()},[]);const j=async()=>{try{r(null),console.log("🔍 Fetching About page content from local proxy...");const o=await fetch("/api/settings/about",{method:"GET",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const p=await o.json();if(p.success&&p.data)T(p.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(o){console.error("❌ Error fetching About page content:",o),T(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{}},m=o=>{const p=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",f=o?.url||o?.src||o?.image_url||o?.file_url||o?.path||o?.imagePath||"",c=typeof f=="string"?f:f?.url||"";if(c&&/^https?:\/\//i.test(c))return{...o,url:c};if(c&&c.includes("/api/images/serve/")){const h=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(c)?c:`${c.replace(/\/?$/,"")}/medium`,b=h.startsWith("http")?h:`${p}${h}`;return{...o,url:b}}if(c&&c.startsWith("/")&&/[a-f0-9-]{36}/i.test(c)){const I=c.match(/([a-f0-9-]{36})/i);if(I){const h=I[1];return{...o,url:`${p}/api/images/serve/${h}/medium`}}}return o&&o.uuid&&typeof o.uuid=="string"?{...o,url:`${p}/api/images/serve/${o.uuid}/medium`}:c&&c.startsWith("/")?{...o,url:`${p}${c}`}:o},l=async()=>{try{const o=`cb=${Date.now()}`,p=`/api/settings/about/gallery/public?${o}`;console.log("🔍 Fetching gallery from local proxy:",p);const f=await fetch(p,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(f.ok){const c=await f.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(c,null,2)),c.success&&Array.isArray(c.data)){console.log("🖼️ First image structure:",c.data[0]);const I=c.data.map((h,b)=>{const C=m(h),L=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",B=D=>{if(!D)return D;const R=/^https?:\/\//i.test(D)?D:`${L}${D}`,M=R.includes("?")?"&":"?";return`${R}${M}${o}`},x=C&&(C.urls||C.srcSet)||{},O={thumbnail:B(x.thumbnail),small:B(x.small),medium:B(x.medium||C?.url),large:B(x.large),original:B(x.original||C?.url)},$={...C,urls:O,srcSet:O};return b<5&&console.log("🧭 Normalized gallery image",b,$?.url||$,$.urls),$});d(I)}else console.warn("Invalid gallery response format:",c),d([])}else console.warn("Failed to fetch gallery images:",f.status),d([])}catch(o){console.error("❌ Error fetching gallery images:",o),d([])}};a.useEffect(()=>(ne(w),()=>{ae()}),[w]);const u=o=>{if(!o)return[];const p=o.split(/\n\s*\n|\n/).filter(f=>f.trim());return p.map((f,c)=>n.jsx("p",{style:{margin:c===p.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:f.trim()},c))},k=o=>{W(o),console.log(`🧭 About Page Navigation: Switched to ${o} tab`)};if(E)return n.jsx(G,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(t){const o=Y.lazy(()=>q(()=>import("./AboutPageMobile-LkXL3C1h.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])));return n.jsx(Y.Suspense,{fallback:n.jsx(G,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:n.jsx(o,{})})}return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:n.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${y.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:n.jsxs("div",{style:{width:"100%",position:"relative"},children:[n.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:o=>{o.currentTarget.style.transform="scale(1.05)",o.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:o=>{o.currentTarget.style.transform="scale(1)",o.currentTarget.style.filter="brightness(1)"}}),n.jsx(K,{currentPage:"About",onNavigate:k})]}),n.jsx(Z,{items:[{name:"Home",url:"/"},{name:"About"}]}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),n.jsx("div",{style:{width:"100%",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:S?n.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):n.jsx("div",{style:{textAlign:"left"},children:u(_)})}),n.jsxs("div",{style:{marginTop:t?"0px":"8px",marginBottom:"32px"},children:[n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:t?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),n.jsx(oe,{images:w,columns:{desktop:4,tablet:3,mobile:2},gap:t?12:16})]}),n.jsx(Q,{compact:!1})]})})})]})},pe=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));export{pe as A,oe as M,ne as i,ae as r};
