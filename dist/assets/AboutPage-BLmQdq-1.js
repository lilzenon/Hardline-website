const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-rPac93Do.js","assets/index-DaWmz4Ua.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-BqSjr6xI.js","assets/SocialMediaButtons-DTqN7HZd.js","assets/breadcrumbSchema-D-LHvs5s.js","assets/Breadcrumb-Bewnn2RY.js"])))=>i.map(i=>d[i]);
import{r as V,j as n,D as Y,B as _,_ as q}from"./index-DaWmz4Ua.js";import{b as r,R as G}from"./vendor-ViNJc2wV.js";import{i as X,u as J,D as K,F as Q}from"./breadcrumbSchema-D-LHvs5s.js";import{B as Z}from"./Breadcrumb-Bewnn2RY.js";var ee=V();const te=({images:o=[],columns:x={desktop:4,tablet:3,mobile:2},gap:D=16,className:W="",onImageClick:B=null})=>{const[F,O]=r.useState(new Set),[M,R]=r.useState(()=>{if(typeof window>"u")return x.desktop;const e=window.innerWidth;return e<768?x.mobile:e<1024?x.tablet:x.desktop}),[j,A]=r.useState(!1),[u,$]=r.useState(null),[L,T]=r.useState(new Map),[m,f]=r.useState(!1),g=r.useRef(null),w=r.useRef(null),t=r.useRef(null),p=r.useRef(0),l=r.useRef({y:0,locked:!1}),s=r.useCallback(()=>{if(l.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;l.current.y=e,l.current.locked=!0;const a=document.body.style;a.position="fixed",a.top=`-${e}px`,a.left="0",a.right="0",a.width="100%",a.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const i=v=>{v.preventDefault(),v.stopPropagation()};window.addEventListener("wheel",i,{passive:!1,capture:!0}),window.addEventListener("touchmove",i,{passive:!1,capture:!0}),l.current.preventScroll=i},[]),I=r.useCallback(()=>{if(!l.current.locked)return;const e=l.current.y||0,a=document.body.style;a.position="",a.top="",a.left="",a.right="",a.width="",a.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",l.current.preventScroll&&(window.removeEventListener("wheel",l.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",l.current.preventScroll,{capture:!0}),l.current.preventScroll=void 0),l.current.locked=!1,window.scrollTo(0,e)},[]),d=r.useCallback(()=>{const e=g.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?R(x.mobile):e<1024?R(x.tablet):R(x.desktop)},[x]),c=r.useCallback(()=>window.innerWidth<768,[]);r.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){A(!0);return}if(w.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(A(!0),w.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),g.current)w.current.observe(g.current);else{const e=setTimeout(()=>A(!0),800);return()=>clearTimeout(e)}return()=>w.current?.disconnect()},[]),r.useEffect(()=>(d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)),[d]),r.useEffect(()=>{if(!j&&Array.isArray(o)&&o.length>0){const e=setTimeout(()=>A(!0),1e3);return()=>clearTimeout(e)}},[o,j]),r.useEffect(()=>{if(!j)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>d()):d();const e=setTimeout(d,150);return()=>clearTimeout(e)},[j,d]),r.useEffect(()=>{const e=()=>d();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[d]),r.useEffect(()=>{if(!g.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>d());return e.observe(g.current),()=>e.disconnect()},[d]);const z=r.useCallback(e=>{O(a=>new Set([...a,e])),T(a=>new Map(a.set(e,"loaded")))},[]),P=r.useCallback(e=>{T(a=>new Map(a.set(e,"loading")))},[]),E=r.useCallback((e,a)=>{if(Date.now()-p.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(m){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const v=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",v),v?($({...e,url:v,index:a}),s()):console.error("❌ No valid image URL found in image object:",e),B&&B(e)},[B,m]),h=r.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),f(!0),p.current=Date.now();let a=!1;const i=v=>{a||(a=!0,v.preventDefault(),v.stopPropagation(),typeof v.stopImmediatePropagation=="function"&&v.stopImmediatePropagation(),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",i,!0),document.removeEventListener("touchend",i,!0))};document.addEventListener("pointerup",i,!0),document.addEventListener("click",i,!0),document.addEventListener("touchend",i,!0),$(null),I(),setTimeout(()=>{f(!1)},100)},[]),S=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]),k=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]);r.useEffect(()=>{const e=a=>{if(u)switch(a.key){case"Escape":a.preventDefault(),h();break;case"Enter":case" ":a.preventDefault(),h();break}};if(u){if(document.addEventListener("keydown",e),t.current)try{t.current.focus({preventScroll:!0})}catch{c()||t.current.focus()}return()=>document.removeEventListener("keydown",e)}},[u,h,c]);const b=r.useCallback(()=>{const e=Array.from({length:M},()=>[]),a=Array(M).fill(0);return o.forEach((i,v)=>{const U=a.indexOf(Math.min(...a));e[U].push({...i,originalIndex:v});const H=300*(i.aspectRatio||i.height/i.width||1.2);a[U]+=H+D}),e},[o,M,D])(),y=`
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
  `;return j?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:y}),n.jsx("div",{ref:g,className:`masonry-gallery ${W}`,style:{display:"flex",gap:`${D}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:b.map((e,a)=>n.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${D}px`},children:e.map(i=>n.jsx(oe,{image:i,isLoaded:F.has(i.originalIndex),loadingState:L.get(i.originalIndex),onLoad:()=>z(i.originalIndex),onLoadStart:()=>P(i.originalIndex),onClick:()=>E(i,i.originalIndex)},i.originalIndex))},a))}),u&&ee.createPortal(n.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:c()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:S,onTouchEnd:k,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:n.jsxs("div",{className:"expanded-image",style:{maxWidth:(c(),"90vw"),maxHeight:c()?"80vh":"90vh",position:"relative",margin:(c(),"20px"),borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:m?"scale(0.95)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[n.jsx("img",{src:u.urls?.large||u.url||u.src||u.image_url||u.file_url,alt:u.alt||u.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)",display:"block",margin:"0 auto"},onError:e=>{const a=e.target,i=a.src;if(u.urls){if(i!==u.urls.medium&&u.urls.medium){a.src=u.urls.medium;return}else if(i!==u.urls.original&&u.urls.original){a.src=u.urls.original;return}}a.style.display="none"}}),n.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},"aria-label":"Close image",style:{position:"absolute",top:c()?"10px":"-10px",right:c()?"10px":"-10px",width:c()?"44px":"40px",height:c()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:y}),n.jsx("div",{ref:g,className:`masonry-gallery-placeholder ${W}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:n.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[n.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),n.jsx("span",{children:"Loading Gallery..."})]})})]})},oe=({image:o,isLoaded:x,loadingState:D,onLoad:W,onLoadStart:B,onClick:F})=>{const[O,M]=r.useState(!1),R=r.useRef(null),j=r.useCallback(()=>{W()},[W]),A=r.useCallback(()=>{B()},[B]),u=r.useCallback(()=>{try{const m=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:m,image:o})}catch{}M(!0),W()},[W,o]),$=r.useCallback(()=>{F&&F(o)},[F,o]),L=r.useRef({x:0,y:0,time:0}),T=r.useRef(!1);return n.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:F?"pointer":"default",opacity:x?1:0,animation:x?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:o?.width&&o?.height?`${o.width} / ${o.height}`:void 0,minHeight:x?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:$,onTouchStart:m=>{if(window.innerWidth<768){const f=m.touches&&m.touches[0];if(!f)return;L.current={x:f.clientX,y:f.clientY,time:Date.now()},T.current=!1}},onTouchMove:m=>{if(window.innerWidth<768){const f=m.touches&&m.touches[0];if(!f)return;const g=Math.abs(f.clientX-L.current.x),w=Math.abs(f.clientY-L.current.y);(g>10||w>10)&&(T.current=!0)}},onTouchEnd:m=>{window.innerWidth<768&&(T.current||(m.preventDefault(),m.stopPropagation(),$()),T.current=!1)},children:[!x&&!O&&n.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),O?n.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:n.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[n.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),n.jsx("div",{children:"Image unavailable"})]})}):n.jsx("img",{ref:R,src:o.url||o.src||o.image_url||o.file_url,srcSet:(()=>{const m=o?.srcSet?.small||o?.urls?.small,f=o?.srcSet?.medium||o?.urls?.medium,g=o?.srcSet?.large||o?.urls?.large,w=[];return m&&w.push(`${m} 400w`),f&&w.push(`${f} 600w`),g&&w.push(`${g} 800w`),w.length?w.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:o?.width,height:o?.height,onLoadStart:A,onLoad:j,onError:m=>{const f=m.target,g=f.src;if(o.urls){if(g!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),f.src=o.urls.medium;return}else if(g!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),f.src=o.urls.small;return}else if(g!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),f.src=o.urls.original;return}}if(parseInt(f.dataset.retryAttempt||"0",10)<1&&g){const t=g.includes("?")?"&":"?";f.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",g),f.src=`${g}${t}_cb=${Date.now()}`;return}u(m)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:x?1:0}}),o.title&&n.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},ne=()=>{const[o,x]=r.useState(!1),[D,W]=r.useState(!0),[B,F]=r.useState("About"),[O,M]=r.useState(""),[R,j]=r.useState(null),[A,u]=r.useState([]),[$,L]=r.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});r.useEffect(()=>{const t="https://bounce2bounce.com",p=`${t}/about`,l="About BOUNCE2BOUNCE",s="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",I="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",d=`${t}/images/og-image.png`,c=(k,C,b)=>{let y=document.head.querySelector(`meta[${k}="${C}"]`);y||(y=document.createElement("meta"),y.setAttribute(k,C),document.head.appendChild(y)),y.setAttribute("content",b)},z=(k,C)=>{let b=document.head.querySelector(`link[rel="${k}"]`);b||(b=document.createElement("link"),b.setAttribute("rel",k),document.head.appendChild(b)),b.setAttribute("href",C)};document.title=l,c("name","description",s),c("name","keywords",I),c("name","robots","index,follow"),c("property","og:type","website"),c("property","og:site_name","BOUNCE2BOUNCE"),c("property","og:title",l),c("property","og:description",s),c("property","og:url",p),c("property","og:image",d),c("name","twitter:card","summary_large_image"),c("name","twitter:title",l),c("name","twitter:description",s),c("name","twitter:image",d),c("name","twitter:site","@bounce2bounce"),z("canonical",p);const P="ld-json-about",E=document.getElementById(P);E&&E.remove();const h=document.createElement("script");h.type="application/ld+json",h.id=P;const S={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:p,description:s,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:d}}]};h.text=JSON.stringify(S),document.head.appendChild(h),X("about")},[]),r.useEffect(()=>{const t=Y?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=t}},[]),J(t=>{const{width:p}=t,l=p<=360?16:p<=480?24:32,s=p-l,I=299,d=299,c=498,z=299,P=32,E=1192,S=E-48,k=I+P+c,C=380,b=380,y=40,e=C+y+b,a=Math.max(k,e);let i=Math.min(s/a,S/a);i=Math.min(i,1.8);const v={heroWidth:Math.round(I*i*.9),heroHeight:Math.round(d*i*.9),rightHeroWidth:Math.round(c*i),rightHeroHeight:Math.round(z*i),gap:Math.round(P*i),containerWidth:E,eventsWidth:Math.round(C*i),textUsWidth:Math.round(b*i),eventsTextGap:Math.round(y*i),eventCardWidth:220,eventCardHeight:85,scale:i},U=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(U),H=p<=768||N;x(H),W(!1),L(v),console.log(`🎯 About page responsive scaling: ${i.toFixed(3)} for viewport ${p}px (max 1.8x, container: 1192px)`,v),console.log("📱 About Page Device Detection:",{viewportWidth:p,isMobileByUA:N,finalDecision:H?"MOBILE":"DESKTOP"})}),r.useEffect(()=>{T(),f()},[]);const T=async()=>{try{j(null);const p=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const l=await fetch(`${p}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const s=await l.json();if(s.success&&s.data)M(s.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),j(t.message)}finally{}},m=t=>{const p=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",s=typeof l=="string"?l:l?.url||"";if(s&&/^https?:\/\//i.test(s))return{...t,url:s};if(s&&s.includes("/api/images/serve/")){const d=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(s)?s:`${s.replace(/\/?$/,"")}/medium`,c=d.startsWith("http")?d:`${p}${d}`;return{...t,url:c}}if(s&&s.startsWith("/")&&/[a-f0-9-]{36}/i.test(s)){const I=s.match(/([a-f0-9-]{36})/i);if(I){const d=I[1];return{...t,url:`${p}/api/images/serve/${d}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${p}/api/images/serve/${t.uuid}/medium`}:s&&s.startsWith("/")?{...t,url:`${p}${s}`}:t},f=async()=>{try{const p=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=`cb=${Date.now()}`,s=`${p}/api/settings/about/gallery/public?${l}`;console.log("🔍 Fetching gallery from:",s);const I=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(I.ok){const d=await I.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(d,null,2)),d.success&&Array.isArray(d.data)){console.log("🖼️ First image structure:",d.data[0]);const c=d.data.map((z,P)=>{const E=m(z),h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",S=y=>{if(!y)return y;const e=/^https?:\/\//i.test(y)?y:`${h}${y}`,a=e.includes("?")?"&":"?";return`${e}${a}${l}`},k=E&&(E.urls||E.srcSet)||{},C={thumbnail:S(k.thumbnail),small:S(k.small),medium:S(k.medium||E?.url),large:S(k.large),original:S(k.original||E?.url)},b={...E,urls:C,srcSet:C};return P<5&&console.log("🧭 Normalized gallery image",P,b?.url||b,b.urls),b});u(c)}else console.warn("Invalid gallery response format:",d),u([])}else console.warn("Failed to fetch gallery images:",I.status),u([])}catch(t){console.error("❌ Error fetching gallery images:",t),u([])}},g=t=>{if(!t)return[];const p=t.split(/\n\s*\n|\n/).filter(l=>l.trim());return p.map((l,s)=>n.jsx("p",{style:{margin:s===p.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:l.trim()},s))},w=t=>{F(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(D)return n.jsx(_,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=G.lazy(()=>q(()=>import("./AboutPageMobile-rPac93Do.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));return n.jsx(G.Suspense,{fallback:n.jsx(_,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:n.jsx(t,{})})}return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:n.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${$.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:n.jsxs("div",{style:{width:"100%",position:"relative"},children:[n.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),n.jsx(K,{currentPage:"About",onNavigate:w})]}),n.jsx(Z,{items:[{name:"Home",url:"/"},{name:"About"}]}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),n.jsx("div",{style:{width:"100%",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:R?n.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):n.jsx("div",{style:{textAlign:"left"},children:g(O)})}),n.jsxs("div",{style:{marginTop:o?"0px":"8px",marginBottom:"32px"},children:[n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),n.jsx(te,{images:A,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]}),n.jsx(Q,{compact:!1})]})})})]})},le=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{le as A,te as M};
