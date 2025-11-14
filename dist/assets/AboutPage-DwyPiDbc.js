const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-lReEOfF9.js","assets/index-Dk1MTCwB.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-BGVpFRuw.js","assets/SocialMediaButtons-DG7AC_7Y.js","assets/Footer-DUFQcqXk.js","assets/Breadcrumb-sPQT5p6h.js","assets/breadcrumbSchema-BG74ATTs.js"])))=>i.map(i=>d[i]);
import{r as V,j as n,D as Y,B as _,_ as X}from"./index-Dk1MTCwB.js";import{b as r,R as G}from"./vendor-ViNJc2wV.js";import{u as q,D as J,F as K}from"./Footer-DUFQcqXk.js";import{B as Q}from"./Breadcrumb-sPQT5p6h.js";import{i as Z}from"./breadcrumbSchema-BG74ATTs.js";var ee=V();const te=({images:t=[],columns:b={desktop:4,tablet:3,mobile:2},gap:A=16,className:I="",onImageClick:D=null})=>{const[W,z]=r.useState(new Set),[T,M]=r.useState(()=>{if(typeof window>"u")return b.desktop;const e=window.innerWidth;return e<768?b.mobile:e<1024?b.tablet:b.desktop}),[E,F]=r.useState(!1),[d,R]=r.useState(null),[B,S]=r.useState(new Map),[p,m]=r.useState(!1),f=r.useRef(null),y=r.useRef(null),o=r.useRef(null),u=r.useRef(0),l=r.useRef({y:0,locked:!1}),s=r.useCallback(()=>{if(l.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;l.current.y=e,l.current.locked=!0;const a=document.body.style;a.position="fixed",a.top=`-${e}px`,a.left="0",a.right="0",a.width="100%",a.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const i=x=>{x.preventDefault(),x.stopPropagation()};window.addEventListener("wheel",i,{passive:!1,capture:!0}),window.addEventListener("touchmove",i,{passive:!1,capture:!0}),l.current.preventScroll=i},[]),g=r.useCallback(()=>{if(!l.current.locked)return;const e=l.current.y||0,a=document.body.style;a.position="",a.top="",a.left="",a.right="",a.width="",a.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",l.current.preventScroll&&(window.removeEventListener("wheel",l.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",l.current.preventScroll,{capture:!0}),l.current.preventScroll=void 0),l.current.locked=!1,window.scrollTo(0,e)},[]),c=r.useCallback(()=>{const e=f.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?M(b.mobile):e<1024?M(b.tablet):M(b.desktop)},[b]),h=r.useCallback(()=>window.innerWidth<768,[]);r.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){F(!0);return}if(y.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(F(!0),y.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),f.current)y.current.observe(f.current);else{const e=setTimeout(()=>F(!0),800);return()=>clearTimeout(e)}return()=>y.current?.disconnect()},[]),r.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]),r.useEffect(()=>{if(!E&&Array.isArray(t)&&t.length>0){const e=setTimeout(()=>F(!0),1e3);return()=>clearTimeout(e)}},[t,E]),r.useEffect(()=>{if(!E)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>c()):c();const e=setTimeout(c,150);return()=>clearTimeout(e)},[E,c]),r.useEffect(()=>{const e=()=>c();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[c]),r.useEffect(()=>{if(!f.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>c());return e.observe(f.current),()=>e.disconnect()},[c]);const O=r.useCallback(e=>{z(a=>new Set([...a,e])),S(a=>new Map(a.set(e,"loaded")))},[]),$=r.useCallback(e=>{S(a=>new Map(a.set(e,"loading")))},[]),w=r.useCallback((e,a)=>{if(Date.now()-u.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(p){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const x=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",x),x?(R({...e,url:x,index:a}),s()):console.error("❌ No valid image URL found in image object:",e),D&&D(e)},[D,p]),v=r.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),m(!0),u.current=Date.now();let a=!1;const i=x=>{a||(a=!0,x.preventDefault(),x.stopPropagation(),typeof x.stopImmediatePropagation=="function"&&x.stopImmediatePropagation(),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",i,!0),document.removeEventListener("touchend",i,!0))};document.addEventListener("pointerup",i,!0),document.addEventListener("click",i,!0),document.addEventListener("touchend",i,!0),R(null),g(),setTimeout(()=>{m(!1)},100)},[]),j=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e))},[v]),C=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e))},[v]);r.useEffect(()=>{const e=a=>{if(d)switch(a.key){case"Escape":a.preventDefault(),v();break;case"Enter":case" ":a.preventDefault(),v();break}};if(d){if(document.addEventListener("keydown",e),o.current)try{o.current.focus({preventScroll:!0})}catch{h()||o.current.focus()}return()=>document.removeEventListener("keydown",e)}},[d,v,h]);const P=r.useCallback(()=>{const e=Array.from({length:T},()=>[]),a=Array(T).fill(0);return t.forEach((i,x)=>{const H=a.indexOf(Math.min(...a));e[H].push({...i,originalIndex:x});const U=300*(i.aspectRatio||i.height/i.width||1.2);a[H]+=U+A}),e},[t,T,A])(),k=`
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
  `;return E?n.jsxs(n.Fragment,{children:[n.jsx("style",{children:k}),n.jsx("div",{ref:f,className:`masonry-gallery ${I}`,style:{display:"flex",gap:`${A}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:P.map((e,a)=>n.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${A}px`},children:e.map(i=>n.jsx(oe,{image:i,isLoaded:W.has(i.originalIndex),loadingState:B.get(i.originalIndex),onLoad:()=>O(i.originalIndex),onLoadStart:()=>$(i.originalIndex),onClick:()=>w(i,i.originalIndex)},i.originalIndex))},a))}),d&&ee.createPortal(n.jsx("div",{ref:o,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:h()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:j,onTouchEnd:C,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:n.jsxs("div",{className:"expanded-image",style:{maxWidth:(h(),"90vw"),maxHeight:h()?"80vh":"90vh",position:"relative",margin:(h(),"20px"),borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:p?"scale(0.95)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[n.jsx("img",{src:d.urls?.large||d.url||d.src||d.image_url||d.file_url,alt:d.alt||d.title||"Gallery image",title:d.title||d.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)",display:"block",margin:"0 auto"},onError:e=>{const a=e.target,i=a.src;if(d.urls){if(i!==d.urls.medium&&d.urls.medium){a.src=d.urls.medium;return}else if(i!==d.urls.original&&d.urls.original){a.src=d.urls.original;return}}a.style.display="none"}}),n.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),v(e)},"aria-label":"Close image",style:{position:"absolute",top:h()?"10px":"-10px",right:h()?"10px":"-10px",width:h()?"44px":"40px",height:h()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):n.jsxs(n.Fragment,{children:[n.jsx("style",{children:k}),n.jsx("div",{ref:f,className:`masonry-gallery-placeholder ${I}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:n.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[n.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),n.jsx("span",{children:"Loading Gallery..."})]})})]})},oe=({image:t,isLoaded:b,loadingState:A,onLoad:I,onLoadStart:D,onClick:W})=>{const[z,T]=r.useState(!1),M=r.useRef(null),E=r.useCallback(()=>{I()},[I]),F=r.useCallback(()=>{D()},[D]),d=r.useCallback(()=>{try{const p=t?.url||t?.src||t?.image_url||t?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:p,image:t})}catch{}T(!0),I()},[I,t]),R=r.useCallback(()=>{W&&W(t)},[W,t]),B=r.useRef({x:0,y:0,time:0}),S=r.useRef(!1);return n.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:W?"pointer":"default",opacity:b?1:0,animation:b?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:t?.width&&t?.height?`${t.width} / ${t.height}`:void 0,minHeight:b?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:R,onTouchStart:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;B.current={x:m.clientX,y:m.clientY,time:Date.now()},S.current=!1}},onTouchMove:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;const f=Math.abs(m.clientX-B.current.x),y=Math.abs(m.clientY-B.current.y);(f>10||y>10)&&(S.current=!0)}},onTouchEnd:p=>{window.innerWidth<768&&(S.current||(p.preventDefault(),p.stopPropagation(),R()),S.current=!1)},children:[!b&&!z&&n.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),z?n.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:n.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[n.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),n.jsx("div",{children:"Image unavailable"})]})}):n.jsx("img",{ref:M,src:t.url||t.src||t.image_url||t.file_url,srcSet:(()=>{const p=t?.srcSet?.small||t?.urls?.small,m=t?.srcSet?.medium||t?.urls?.medium,f=t?.srcSet?.large||t?.urls?.large,y=[];return p&&y.push(`${p} 400w`),m&&y.push(`${m} 600w`),f&&y.push(`${f} 800w`),y.length?y.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:t.alt||t.title||"Gallery image",title:t.title||t.alt||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:t?.width,height:t?.height,onLoadStart:F,onLoad:E,onError:p=>{const m=p.target,f=m.src;if(t.urls){if(f!==t.urls.medium&&t.urls.medium){console.log("🔄 Fallback to medium variant:",t.urls.medium),m.src=t.urls.medium;return}else if(f!==t.urls.small&&t.urls.small){console.log("🔄 Fallback to small variant:",t.urls.small),m.src=t.urls.small;return}else if(f!==t.urls.original&&t.urls.original){console.log("🔄 Fallback to original:",t.urls.original),m.src=t.urls.original;return}}if(parseInt(m.dataset.retryAttempt||"0",10)<1&&f){const o=f.includes("?")?"&":"?";m.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",f),m.src=`${f}${o}_cb=${Date.now()}`;return}d(p)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:b?1:0}}),t.title&&n.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:t.title})]})},ne=()=>{const[t,b]=r.useState(!1),[A,I]=r.useState(!0),[D,W]=r.useState("About"),[z,T]=r.useState(""),[M,E]=r.useState(null),[F,d]=r.useState([]),[R,B]=r.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});r.useEffect(()=>{const o="https://bounce2bounce.com",u=`${o}/about`,l="ld-json-about",s=document.getElementById(l);s&&s.remove();const g=document.createElement("script");g.type="application/ld+json",g.id=l;const c={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:o,logo:`${o}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:u,description,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:o},primaryImageOfPage:{"@type":"ImageObject",url:ogImage}}]};g.text=JSON.stringify(c),document.head.appendChild(g),Z("about")},[]),r.useEffect(()=>{const o=Y?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=o}},[]),q(o=>{const{width:u}=o,l=u<=360?16:u<=480?24:32,s=u-l,g=299,c=299,h=498,O=299,$=32,w=1192,j=w-48,C=g+$+h,L=380,P=380,k=40,e=L+k+P,a=Math.max(C,e);let i=Math.min(s/a,j/a);i=Math.min(i,1.8);const x={heroWidth:Math.round(g*i*.9),heroHeight:Math.round(c*i*.9),rightHeroWidth:Math.round(h*i),rightHeroHeight:Math.round(O*i),gap:Math.round($*i),containerWidth:w,eventsWidth:Math.round(L*i),textUsWidth:Math.round(P*i),eventsTextGap:Math.round(k*i),eventCardWidth:220,eventCardHeight:85,scale:i},H=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(H),U=u<=768||N;b(U),I(!1),B(x),console.log(`🎯 About page responsive scaling: ${i.toFixed(3)} for viewport ${u}px (max 1.8x, container: 1192px)`,x),console.log("📱 About Page Device Detection:",{viewportWidth:u,isMobileByUA:N,finalDecision:U?"MOBILE":"DESKTOP"})}),r.useEffect(()=>{S(),m()},[]);const S=async()=>{try{E(null);const u=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const l=await fetch(`${u}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const s=await l.json();if(s.success&&s.data)T(s.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(o){console.error("❌ Error fetching About page content:",o),T(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{}},p=o=>{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=o?.url||o?.src||o?.image_url||o?.file_url||o?.path||o?.imagePath||"",s=typeof l=="string"?l:l?.url||"";if(s&&/^https?:\/\//i.test(s))return{...o,url:s};if(s&&s.includes("/api/images/serve/")){const c=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(s)?s:`${s.replace(/\/?$/,"")}/medium`,h=c.startsWith("http")?c:`${u}${c}`;return{...o,url:h}}if(s&&s.startsWith("/")&&/[a-f0-9-]{36}/i.test(s)){const g=s.match(/([a-f0-9-]{36})/i);if(g){const c=g[1];return{...o,url:`${u}/api/images/serve/${c}/medium`}}}return o&&o.uuid&&typeof o.uuid=="string"?{...o,url:`${u}/api/images/serve/${o.uuid}/medium`}:s&&s.startsWith("/")?{...o,url:`${u}${s}`}:o},m=async()=>{try{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=`cb=${Date.now()}`,s=`${u}/api/settings/about/gallery/public?${l}`;console.log("🔍 Fetching gallery from:",s);const g=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(g.ok){const c=await g.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(c,null,2)),c.success&&Array.isArray(c.data)){console.log("🖼️ First image structure:",c.data[0]);const h=c.data.map((O,$)=>{const w=p(O),v=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",j=k=>{if(!k)return k;const e=/^https?:\/\//i.test(k)?k:`${v}${k}`,a=e.includes("?")?"&":"?";return`${e}${a}${l}`},C=w&&(w.urls||w.srcSet)||{},L={thumbnail:j(C.thumbnail),small:j(C.small),medium:j(C.medium||w?.url),large:j(C.large),original:j(C.original||w?.url)},P={...w,urls:L,srcSet:L};return $<5&&console.log("🧭 Normalized gallery image",$,P?.url||P,P.urls),P});d(h)}else console.warn("Invalid gallery response format:",c),d([])}else console.warn("Failed to fetch gallery images:",g.status),d([])}catch(o){console.error("❌ Error fetching gallery images:",o),d([])}},f=o=>{if(!o)return[];const u=o.split(/\n\s*\n|\n/).filter(l=>l.trim());return u.map((l,s)=>n.jsx("p",{style:{margin:s===u.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:l.trim()},s))},y=o=>{W(o),console.log(`🧭 About Page Navigation: Switched to ${o} tab`)};if(A)return n.jsx(_,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(t){const o=G.lazy(()=>X(()=>import("./AboutPageMobile-lReEOfF9.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])));return n.jsx(G.Suspense,{fallback:n.jsx(_,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:n.jsx(o,{})})}return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:n.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${R.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:n.jsxs("div",{style:{width:"100%",position:"relative"},children:[n.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:o=>{o.currentTarget.style.transform="scale(1.05)",o.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:o=>{o.currentTarget.style.transform="scale(1)",o.currentTarget.style.filter="brightness(1)"}}),n.jsx(J,{currentPage:"About",onNavigate:y})]}),n.jsx(Q,{items:[{name:"Home",url:"/"},{name:"About"}]}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),n.jsx("div",{style:{width:"100%",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:M?n.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):n.jsx("div",{style:{textAlign:"left"},children:f(z)})}),n.jsxs("div",{style:{marginTop:t?"0px":"8px",marginBottom:"32px"},children:[n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:t?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),n.jsx(te,{images:F,columns:{desktop:4,tablet:3,mobile:2},gap:t?12:16})]}),n.jsx(K,{compact:!1})]})})})]})},ce=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{ce as A,te as M};
