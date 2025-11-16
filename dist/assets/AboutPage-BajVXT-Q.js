const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-DyM25j9A.js","assets/index-DPOVLokC.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-DaSoSSG1.js","assets/SocialMediaButtons-CAxDab1e.js","assets/Footer-Cy1zQCmO.js","assets/Breadcrumb-CdkFhySW.js","assets/breadcrumbSchema-BG74ATTs.js"])))=>i.map(i=>d[i]);
import{r as Y,j as n,D as _,B as G,_ as X}from"./index-DPOVLokC.js";import{b as r,R as V}from"./vendor-ViNJc2wV.js";import{u as q,D as J,F as K}from"./Footer-Cy1zQCmO.js";import{B as Q}from"./Breadcrumb-CdkFhySW.js";import{i as Z}from"./breadcrumbSchema-BG74ATTs.js";var ee=Y();const te=({images:t=[],columns:h={desktop:4,tablet:3,mobile:2},gap:D=16,className:I="",onImageClick:A=null})=>{const[W,z]=r.useState(new Set),[T,B]=r.useState(()=>{if(typeof window>"u")return h.desktop;const e=window.innerWidth;return e<768?h.mobile:e<1024?h.tablet:h.desktop}),[E,F]=r.useState(!1),[d,M]=r.useState(null),[R,S]=r.useState(new Map),[p,m]=r.useState(!1),f=r.useRef(null),x=r.useRef(null),o=r.useRef(null),u=r.useRef(0),l=r.useRef({y:0,locked:!1}),s=r.useCallback(()=>{if(l.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;l.current.y=e,l.current.locked=!0;const a=document.body.style;a.position="fixed",a.top=`-${e}px`,a.left="0",a.right="0",a.width="100%",a.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const i=b=>{b.preventDefault(),b.stopPropagation()};window.addEventListener("wheel",i,{passive:!1,capture:!0}),window.addEventListener("touchmove",i,{passive:!1,capture:!0}),l.current.preventScroll=i},[]),y=r.useCallback(()=>{if(!l.current.locked)return;const e=l.current.y||0,a=document.body.style;a.position="",a.top="",a.left="",a.right="",a.width="",a.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",l.current.preventScroll&&(window.removeEventListener("wheel",l.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",l.current.preventScroll,{capture:!0}),l.current.preventScroll=void 0),l.current.locked=!1,window.scrollTo(0,e)},[]),c=r.useCallback(()=>{const e=f.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?B(h.mobile):e<1024?B(h.tablet):B(h.desktop)},[h]),g=r.useCallback(()=>window.innerWidth<768,[]);r.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){F(!0);return}if(x.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(F(!0),x.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),f.current)x.current.observe(f.current);else{const e=setTimeout(()=>F(!0),800);return()=>clearTimeout(e)}return()=>x.current?.disconnect()},[]),r.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]),r.useEffect(()=>{if(!E&&Array.isArray(t)&&t.length>0){const e=setTimeout(()=>F(!0),1e3);return()=>clearTimeout(e)}},[t,E]),r.useEffect(()=>{if(!E)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>c()):c();const e=setTimeout(c,150);return()=>clearTimeout(e)},[E,c]),r.useEffect(()=>{const e=()=>c();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[c]),r.useEffect(()=>{if(!f.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>c());return e.observe(f.current),()=>e.disconnect()},[c]);const $=r.useCallback(e=>{z(a=>new Set([...a,e])),S(a=>new Map(a.set(e,"loaded")))},[]),L=r.useCallback(e=>{S(a=>new Map(a.set(e,"loading")))},[]),w=r.useCallback((e,a)=>{if(Date.now()-u.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(p){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const b=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",b),b?(M({...e,url:b,index:a}),s()):console.error("❌ No valid image URL found in image object:",e),A&&A(e)},[A,p]),v=r.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),m(!0),u.current=Date.now();let a=!1;const i=b=>{a||(a=!0,b.preventDefault(),b.stopPropagation(),typeof b.stopImmediatePropagation=="function"&&b.stopImmediatePropagation(),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",i,!0),document.removeEventListener("touchend",i,!0))};document.addEventListener("pointerup",i,!0),document.addEventListener("click",i,!0),document.addEventListener("touchend",i,!0),M(null),y(),setTimeout(()=>{m(!1)},100)},[]),j=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e))},[v]),C=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e))},[v]);r.useEffect(()=>{const e=a=>{if(d)switch(a.key){case"Escape":a.preventDefault(),v();break;case"Enter":case" ":a.preventDefault(),v();break}};if(d){if(document.addEventListener("keydown",e),o.current)try{o.current.focus({preventScroll:!0})}catch{g()||o.current.focus()}return()=>document.removeEventListener("keydown",e)}},[d,v,g]);const P=r.useCallback(()=>{const e=Array.from({length:T},()=>[]),a=Array(T).fill(0);return t.forEach((i,b)=>{const H=a.indexOf(Math.min(...a));e[H].push({...i,originalIndex:b});const N=300*(i.aspectRatio||i.height/i.width||1.2);a[H]+=N+D}),e},[t,T,D])(),k=`
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
  `;return E?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:k}),n.jsx("div",{ref:f,className:`masonry-gallery ${I}`,style:{display:"flex",gap:`${D}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:P.map((e,a)=>n.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${D}px`},children:e.map(i=>n.jsx(oe,{image:i,isLoaded:W.has(i.originalIndex),loadingState:R.get(i.originalIndex),onLoad:()=>$(i.originalIndex),onLoadStart:()=>L(i.originalIndex),onClick:()=>w(i,i.originalIndex)},i.originalIndex))},a))}),d&&ee.createPortal(n.jsx("div",{ref:o,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:g()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:j,onTouchEnd:C,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:n.jsxs("div",{className:"expanded-image",style:{maxWidth:(g(),"90vw"),maxHeight:g()?"80vh":"90vh",position:"relative",margin:(g(),"20px"),borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:p?"scale(0.95)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[n.jsx("img",{src:d.urls?.large||d.url||d.src||d.image_url||d.file_url,alt:d.alt||d.title||"Gallery image",title:d.title||d.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)",display:"block",margin:"0 auto"},onError:e=>{const a=e.target,i=a.src;if(d.urls){if(i!==d.urls.medium&&d.urls.medium){a.src=d.urls.medium;return}else if(i!==d.urls.original&&d.urls.original){a.src=d.urls.original;return}}a.style.display="none"}}),n.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e)},"aria-label":"Close image",style:{position:"absolute",top:g()?"10px":"-10px",right:g()?"10px":"-10px",width:g()?"44px":"40px",height:g()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:k}),n.jsx("div",{ref:f,className:`masonry-gallery-placeholder ${I}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:n.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[n.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),n.jsx("span",{children:"Loading Gallery..."})]})})]})},oe=({image:t,isLoaded:h,loadingState:D,onLoad:I,onLoadStart:A,onClick:W})=>{const[z,T]=r.useState(!1),B=r.useRef(null),E=r.useCallback(()=>{I()},[I]),F=r.useCallback(()=>{A()},[A]),d=r.useCallback(()=>{try{const p=t?.url||t?.src||t?.image_url||t?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:p,image:t})}catch{}T(!0),I()},[I,t]),M=r.useCallback(()=>{W&&W(t)},[W,t]),R=r.useRef({x:0,y:0,time:0}),S=r.useRef(!1);return n.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:W?"pointer":"default",opacity:h?1:0,animation:h?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:t?.width&&t?.height?`${t.width} / ${t.height}`:void 0,minHeight:h?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:M,onTouchStart:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;R.current={x:m.clientX,y:m.clientY,time:Date.now()},S.current=!1}},onTouchMove:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;const f=Math.abs(m.clientX-R.current.x),x=Math.abs(m.clientY-R.current.y);(f>10||x>10)&&(S.current=!0)}},onTouchEnd:p=>{window.innerWidth<768&&(S.current||(p.preventDefault(),p.stopPropagation(),M()),S.current=!1)},children:[!h&&!z&&n.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),z?n.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:n.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[n.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),n.jsx("div",{children:"Image unavailable"})]})}):n.jsx("img",{ref:B,src:t.url||t.src||t.image_url||t.file_url,srcSet:(()=>{const p=t?.srcSet?.small||t?.urls?.small,m=t?.srcSet?.medium||t?.urls?.medium,f=t?.srcSet?.large||t?.urls?.large,x=[];return p&&x.push(`${p} 400w`),m&&x.push(`${m} 600w`),f&&x.push(`${f} 800w`),x.length?x.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:t.alt||t.title||"Gallery image",title:t.title||t.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:t?.width,height:t?.height,onLoadStart:F,onLoad:E,onError:p=>{const m=p.target,f=m.src;if(t.urls){if(f!==t.urls.medium&&t.urls.medium){console.log("🔄 Fallback to medium variant:",t.urls.medium),m.src=t.urls.medium;return}else if(f!==t.urls.small&&t.urls.small){console.log("🔄 Fallback to small variant:",t.urls.small),m.src=t.urls.small;return}else if(f!==t.urls.original&&t.urls.original){console.log("🔄 Fallback to original:",t.urls.original),m.src=t.urls.original;return}}if(parseInt(m.dataset.retryAttempt||"0",10)<1&&f){const o=f.includes("?")?"&":"?";m.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",f),m.src=`${f}${o}_cb=${Date.now()}`;return}d(p)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:h?1:0}}),t.title&&n.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:t.title})]})},ne=()=>{const[t,h]=r.useState(!1),[D,I]=r.useState(!0),[A,W]=r.useState("About"),[z,T]=r.useState(""),[B,E]=r.useState(null),[F,d]=r.useState([]),[M,R]=r.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});r.useEffect(()=>{const o="https://bounce2bounce.com",u=`${o}/about`,l=_?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",s=_?.about_page_og_image||`${o}/images/og-image.png`,y="ld-json-about",c=document.getElementById(y);c&&c.remove();const g=document.createElement("script");g.type="application/ld+json",g.id=y;const $={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:o,logo:`${o}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:u,description:l,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:o},primaryImageOfPage:{"@type":"ImageObject",url:s}}]};g.text=JSON.stringify($),document.head.appendChild(g),Z("about")},[]),r.useEffect(()=>{const o=_?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=o}},[]),q(o=>{const{width:u}=o,l=u<=360?16:u<=480?24:32,s=u-l,y=299,c=299,g=498,$=299,L=32,w=1192,j=w-48,C=y+L+g,O=380,P=380,k=40,e=O+k+P,a=Math.max(C,e);let i=Math.min(s/a,j/a);i=Math.min(i,1.8);const b={heroWidth:Math.round(y*i*.9),heroHeight:Math.round(c*i*.9),rightHeroWidth:Math.round(g*i),rightHeroHeight:Math.round($*i),gap:Math.round(L*i),containerWidth:w,eventsWidth:Math.round(O*i),textUsWidth:Math.round(P*i),eventsTextGap:Math.round(k*i),eventCardWidth:220,eventCardHeight:85,scale:i},H=navigator.userAgent||"",U=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(H),N=u<=768||U;h(N),I(!1),R(b),console.log(`🎯 About page responsive scaling: ${i.toFixed(3)} for viewport ${u}px (max 1.8x, container: 1192px)`,b),console.log("📱 About Page Device Detection:",{viewportWidth:u,isMobileByUA:U,finalDecision:N?"MOBILE":"DESKTOP"})}),r.useEffect(()=>{S(),m()},[]);const S=async()=>{try{E(null);const u=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const l=await fetch(`${u}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const s=await l.json();if(s.success&&s.data)T(s.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(o){console.error("❌ Error fetching About page content:",o),T(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{}},p=o=>{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=o?.url||o?.src||o?.image_url||o?.file_url||o?.path||o?.imagePath||"",s=typeof l=="string"?l:l?.url||"";if(s&&/^https?:\/\//i.test(s))return{...o,url:s};if(s&&s.includes("/api/images/serve/")){const c=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(s)?s:`${s.replace(/\/?$/,"")}/medium`,g=c.startsWith("http")?c:`${u}${c}`;return{...o,url:g}}if(s&&s.startsWith("/")&&/[a-f0-9-]{36}/i.test(s)){const y=s.match(/([a-f0-9-]{36})/i);if(y){const c=y[1];return{...o,url:`${u}/api/images/serve/${c}/medium`}}}return o&&o.uuid&&typeof o.uuid=="string"?{...o,url:`${u}/api/images/serve/${o.uuid}/medium`}:s&&s.startsWith("/")?{...o,url:`${u}${s}`}:o},m=async()=>{try{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=`cb=${Date.now()}`,s=`${u}/api/settings/about/gallery/public?${l}`;console.log("🔍 Fetching gallery from:",s);const y=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(y.ok){const c=await y.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(c,null,2)),c.success&&Array.isArray(c.data)){console.log("🖼️ First image structure:",c.data[0]);const g=c.data.map(($,L)=>{const w=p($),v=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",j=k=>{if(!k)return k;const e=/^https?:\/\//i.test(k)?k:`${v}${k}`,a=e.includes("?")?"&":"?";return`${e}${a}${l}`},C=w&&(w.urls||w.srcSet)||{},O={thumbnail:j(C.thumbnail),small:j(C.small),medium:j(C.medium||w?.url),large:j(C.large),original:j(C.original||w?.url)},P={...w,urls:O,srcSet:O};return L<5&&console.log("🧭 Normalized gallery image",L,P?.url||P,P.urls),P});d(g)}else console.warn("Invalid gallery response format:",c),d([])}else console.warn("Failed to fetch gallery images:",y.status),d([])}catch(o){console.error("❌ Error fetching gallery images:",o),d([])}},f=o=>{if(!o)return[];const u=o.split(/\n\s*\n|\n/).filter(l=>l.trim());return u.map((l,s)=>n.jsx("p",{style:{margin:s===u.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:l.trim()},s))},x=o=>{W(o),console.log(`🧭 About Page Navigation: Switched to ${o} tab`)};if(D)return n.jsx(G,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(t){const o=V.lazy(()=>X(()=>import("./AboutPageMobile-DyM25j9A.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])));return n.jsx(V.Suspense,{fallback:n.jsx(G,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:n.jsx(o,{})})}return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:n.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${M.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:n.jsxs("div",{style:{width:"100%",position:"relative"},children:[n.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:o=>{o.currentTarget.style.transform="scale(1.05)",o.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:o=>{o.currentTarget.style.transform="scale(1)",o.currentTarget.style.filter="brightness(1)"}}),n.jsx(J,{currentPage:"About",onNavigate:x})]}),n.jsx(Q,{items:[{name:"Home",url:"/"},{name:"About"}]}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),n.jsx("div",{style:{width:"100%",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:B?n.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):n.jsx("div",{style:{textAlign:"left"},children:f(z)})}),n.jsxs("div",{style:{marginTop:t?"0px":"8px",marginBottom:"32px"},children:[n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:t?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),n.jsx(te,{images:F,columns:{desktop:4,tablet:3,mobile:2},gap:t?12:16})]}),n.jsx(K,{compact:!1})]})})})]})},ce=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{ce as A,te as M};
