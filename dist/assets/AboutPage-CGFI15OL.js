const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-DuKZ48UX.js","assets/index-B5ob9LHO.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-Ck4rJScM.js","assets/SocialMediaButtons-BHNHDSY3.js","assets/Footer-jeX-OZQ8.js","assets/Breadcrumb-MBU7C9ww.js"])))=>i.map(i=>d[i]);
import{r as V,j as r,D as Y,B as _,_ as q}from"./index-B5ob9LHO.js";import{b as a,R as G}from"./vendor-ViNJc2wV.js";import{u as X,D as J,F as K}from"./Footer-jeX-OZQ8.js";import{B as Q}from"./Breadcrumb-MBU7C9ww.js";var Z=V();const ee=({images:o=[],columns:b={desktop:4,tablet:3,mobile:2},gap:D=16,className:W="",onImageClick:B=null})=>{const[A,z]=a.useState(new Set),[M,$]=a.useState(()=>{if(typeof window>"u")return b.desktop;const e=window.innerWidth;return e<768?b.mobile:e<1024?b.tablet:b.desktop}),[j,F]=a.useState(!1),[p,R]=a.useState(null),[L,T]=a.useState(new Map),[m,f]=a.useState(!1),g=a.useRef(null),v=a.useRef(null),t=a.useRef(null),u=a.useRef(0),l=a.useRef({y:0,locked:!1}),s=a.useCallback(()=>{if(l.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;l.current.y=e,l.current.locked=!0;const n=document.body.style;n.position="fixed",n.top=`-${e}px`,n.left="0",n.right="0",n.width="100%",n.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const i=x=>{x.preventDefault(),x.stopPropagation()};window.addEventListener("wheel",i,{passive:!1,capture:!0}),window.addEventListener("touchmove",i,{passive:!1,capture:!0}),l.current.preventScroll=i},[]),k=a.useCallback(()=>{if(!l.current.locked)return;const e=l.current.y||0,n=document.body.style;n.position="",n.top="",n.left="",n.right="",n.width="",n.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",l.current.preventScroll&&(window.removeEventListener("wheel",l.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",l.current.preventScroll,{capture:!0}),l.current.preventScroll=void 0),l.current.locked=!1,window.scrollTo(0,e)},[]),d=a.useCallback(()=>{const e=g.current?.clientWidth||(typeof window<"u"?window.innerWidth:1024);e<768?$(b.mobile):e<1024?$(b.tablet):$(b.desktop)},[b]),c=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){F(!0);return}if(v.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(F(!0),v.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),g.current)v.current.observe(g.current);else{const e=setTimeout(()=>F(!0),800);return()=>clearTimeout(e)}return()=>v.current?.disconnect()},[]),a.useEffect(()=>(d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)),[d]),a.useEffect(()=>{if(!j&&Array.isArray(o)&&o.length>0){const e=setTimeout(()=>F(!0),1e3);return()=>clearTimeout(e)}},[o,j]),a.useEffect(()=>{if(!j)return;typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>d()):d();const e=setTimeout(d,150);return()=>clearTimeout(e)},[j,d]),a.useEffect(()=>{const e=()=>d();return typeof window<"u"&&(window.addEventListener("visibilitychange",e),window.addEventListener("pageshow",e)),()=>{typeof window<"u"&&(window.removeEventListener("visibilitychange",e),window.removeEventListener("pageshow",e))}},[d]),a.useEffect(()=>{if(!g.current||typeof ResizeObserver>"u")return;const e=new ResizeObserver(()=>d());return e.observe(g.current),()=>e.disconnect()},[d]);const O=a.useCallback(e=>{z(n=>new Set([...n,e])),T(n=>new Map(n.set(e,"loaded")))},[]),P=a.useCallback(e=>{T(n=>new Map(n.set(e,"loading")))},[]),I=a.useCallback((e,n)=>{if(Date.now()-u.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(m){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const x=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",x),x?(R({...e,url:x,index:n}),s()):console.error("❌ No valid image URL found in image object:",e),B&&B(e)},[B,m]),h=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),f(!0),u.current=Date.now();let n=!1;const i=x=>{n||(n=!0,x.preventDefault(),x.stopPropagation(),typeof x.stopImmediatePropagation=="function"&&x.stopImmediatePropagation(),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",i,!0),document.removeEventListener("touchend",i,!0))};document.addEventListener("pointerup",i,!0),document.addEventListener("click",i,!0),document.addEventListener("touchend",i,!0),R(null),k(),setTimeout(()=>{f(!1)},100)},[]),S=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]),E=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]);a.useEffect(()=>{const e=n=>{if(p)switch(n.key){case"Escape":n.preventDefault(),h();break;case"Enter":case" ":n.preventDefault(),h();break}};if(p){if(document.addEventListener("keydown",e),t.current)try{t.current.focus({preventScroll:!0})}catch{c()||t.current.focus()}return()=>document.removeEventListener("keydown",e)}},[p,h,c]);const w=a.useCallback(()=>{const e=Array.from({length:M},()=>[]),n=Array(M).fill(0);return o.forEach((i,x)=>{const N=n.indexOf(Math.min(...n));e[N].push({...i,originalIndex:x});const U=300*(i.aspectRatio||i.height/i.width||1.2);n[N]+=U+D}),e},[o,M,D])(),y=`
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
  `;return j?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:y}),r.jsx("div",{ref:g,className:`masonry-gallery ${W}`,style:{display:"flex",gap:`${D}px`,width:"100%",boxSizing:"border-box",alignItems:"flex-start",justifyContent:"center",margin:"0 auto",maxWidth:"100%",paddingLeft:0},children:w.map((e,n)=>r.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${D}px`},children:e.map(i=>r.jsx(te,{image:i,isLoaded:A.has(i.originalIndex),loadingState:L.get(i.originalIndex),onLoad:()=>O(i.originalIndex),onLoadStart:()=>P(i.originalIndex),onClick:()=>I(i,i.originalIndex)},i.originalIndex))},n))}),p&&Z.createPortal(r.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:c()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:S,onTouchEnd:E,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:r.jsxs("div",{className:"expanded-image",style:{maxWidth:c()?"70vw":"85vw",maxHeight:c()?"50vh":"85vh",position:"relative",margin:c()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:m?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[r.jsx("img",{src:p.urls?.large||p.url||p.src||p.image_url||p.file_url,alt:p.alt||p.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const n=e.target,i=n.src;if(p.urls){if(i!==p.urls.medium&&p.urls.medium){n.src=p.urls.medium;return}else if(i!==p.urls.original&&p.urls.original){n.src=p.urls.original;return}}n.style.display="none"}}),r.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},"aria-label":"Close image",style:{position:"absolute",top:c()?"10px":"-10px",right:c()?"10px":"-10px",width:c()?"44px":"40px",height:c()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:y}),r.jsx("div",{ref:g,className:`masonry-gallery-placeholder ${W}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:r.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[r.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),r.jsx("span",{children:"Loading Gallery..."})]})})]})},te=({image:o,isLoaded:b,loadingState:D,onLoad:W,onLoadStart:B,onClick:A})=>{const[z,M]=a.useState(!1),$=a.useRef(null),j=a.useCallback(()=>{W()},[W]),F=a.useCallback(()=>{B()},[B]),p=a.useCallback(()=>{try{const m=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:m,image:o})}catch{}M(!0),W()},[W,o]),R=a.useCallback(()=>{A&&A(o)},[A,o]),L=a.useRef({x:0,y:0,time:0}),T=a.useRef(!1);return r.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:A?"pointer":"default",opacity:b?1:0,animation:b?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:o?.width&&o?.height?`${o.width} / ${o.height}`:void 0,minHeight:b?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:R,onTouchStart:m=>{if(window.innerWidth<768){const f=m.touches&&m.touches[0];if(!f)return;L.current={x:f.clientX,y:f.clientY,time:Date.now()},T.current=!1}},onTouchMove:m=>{if(window.innerWidth<768){const f=m.touches&&m.touches[0];if(!f)return;const g=Math.abs(f.clientX-L.current.x),v=Math.abs(f.clientY-L.current.y);(g>10||v>10)&&(T.current=!0)}},onTouchEnd:m=>{window.innerWidth<768&&(T.current||(m.preventDefault(),m.stopPropagation(),R()),T.current=!1)},children:[!b&&!z&&r.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:r.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),z?r.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:r.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[r.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),r.jsx("div",{children:"Image unavailable"})]})}):r.jsx("img",{ref:$,src:o.url||o.src||o.image_url||o.file_url,srcSet:(()=>{const m=o?.srcSet?.small||o?.urls?.small,f=o?.srcSet?.medium||o?.urls?.medium,g=o?.srcSet?.large||o?.urls?.large,v=[];return m&&v.push(`${m} 400w`),f&&v.push(`${f} 600w`),g&&v.push(`${g} 800w`),v.length?v.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:o?.width,height:o?.height,onLoadStart:F,onLoad:j,onError:m=>{const f=m.target,g=f.src;if(o.urls){if(g!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),f.src=o.urls.medium;return}else if(g!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),f.src=o.urls.small;return}else if(g!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),f.src=o.urls.original;return}}if(parseInt(f.dataset.retryAttempt||"0",10)<1&&g){const t=g.includes("?")?"&":"?";f.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",g),f.src=`${g}${t}_cb=${Date.now()}`;return}p(m)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:b?1:0}}),o.title&&r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},oe=()=>{const[o,b]=a.useState(!1),[D,W]=a.useState(!0),[B,A]=a.useState("About"),[z,M]=a.useState(""),[$,j]=a.useState(null),[F,p]=a.useState([]),[R,L]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const t="https://bounce2bounce.com",u=`${t}/about`,l="About BOUNCE2BOUNCE",s="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",k="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",d=`${t}/images/og-image.png`,c=(w,y,e)=>{let n=document.head.querySelector(`meta[${w}="${y}"]`);n||(n=document.createElement("meta"),n.setAttribute(w,y),document.head.appendChild(n)),n.setAttribute("content",e)},O=(w,y)=>{let e=document.head.querySelector(`link[rel="${w}"]`);e||(e=document.createElement("link"),e.setAttribute("rel",w),document.head.appendChild(e)),e.setAttribute("href",y)};document.title=l,c("name","description",s),c("name","keywords",k),c("name","robots","index,follow"),c("property","og:type","website"),c("property","og:site_name","BOUNCE2BOUNCE"),c("property","og:title",l),c("property","og:description",s),c("property","og:url",u),c("property","og:image",d),c("name","twitter:card","summary_large_image"),c("name","twitter:title",l),c("name","twitter:description",s),c("name","twitter:image",d),c("name","twitter:site","@bounce2bounce"),O("canonical",u);const P="ld-json-about",I=document.getElementById(P);I&&I.remove();const h=document.createElement("script");h.type="application/ld+json",h.id=P;const S={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:u,description:s,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:d}}]};h.text=JSON.stringify(S),document.head.appendChild(h);const E="ld-json-breadcrumbs-about";document.getElementById(E)?.remove();const C=document.createElement("script");C.type="application/ld+json",C.id=E,C.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:u}]}),document.head.appendChild(C)},[]),a.useEffect(()=>{const t=Y?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=t}},[]),X(t=>{const{width:u}=t,l=u<=360?16:u<=480?24:32,s=u-l,k=299,d=299,c=498,O=299,P=32,I=1192,S=I-48,E=k+P+c,C=380,w=380,y=40,e=C+y+w,n=Math.max(E,e);let i=Math.min(s/n,S/n);i=Math.min(i,1.8);const x={heroWidth:Math.round(k*i*.9),heroHeight:Math.round(d*i*.9),rightHeroWidth:Math.round(c*i),rightHeroHeight:Math.round(O*i),gap:Math.round(P*i),containerWidth:I,eventsWidth:Math.round(C*i),textUsWidth:Math.round(w*i),eventsTextGap:Math.round(y*i),eventCardWidth:220,eventCardHeight:85,scale:i},N=navigator.userAgent||"",H=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(N),U=u<=768||H;b(U),W(!1),L(x),console.log(`🎯 About page responsive scaling: ${i.toFixed(3)} for viewport ${u}px (max 1.8x, container: 1192px)`,x),console.log("📱 About Page Device Detection:",{viewportWidth:u,isMobileByUA:H,finalDecision:U?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{T(),f()},[]);const T=async()=>{try{j(null);const u=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const l=await fetch(`${u}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const s=await l.json();if(s.success&&s.data)M(s.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),j(t.message)}finally{}},m=t=>{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",s=typeof l=="string"?l:l?.url||"";if(s&&/^https?:\/\//i.test(s))return{...t,url:s};if(s&&s.includes("/api/images/serve/")){const d=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(s)?s:`${s.replace(/\/?$/,"")}/medium`,c=d.startsWith("http")?d:`${u}${d}`;return{...t,url:c}}if(s&&s.startsWith("/")&&/[a-f0-9-]{36}/i.test(s)){const k=s.match(/([a-f0-9-]{36})/i);if(k){const d=k[1];return{...t,url:`${u}/api/images/serve/${d}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${u}/api/images/serve/${t.uuid}/medium`}:s&&s.startsWith("/")?{...t,url:`${u}${s}`}:t},f=async()=>{try{const u=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=`cb=${Date.now()}`,s=`${u}/api/settings/about/gallery/public?${l}`;console.log("🔍 Fetching gallery from:",s);const k=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(k.ok){const d=await k.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(d,null,2)),d.success&&Array.isArray(d.data)){console.log("🖼️ First image structure:",d.data[0]);const c=d.data.map((O,P)=>{const I=m(O),h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",S=y=>{if(!y)return y;const e=/^https?:\/\//i.test(y)?y:`${h}${y}`,n=e.includes("?")?"&":"?";return`${e}${n}${l}`},E=I&&(I.urls||I.srcSet)||{},C={thumbnail:S(E.thumbnail),small:S(E.small),medium:S(E.medium||I?.url),large:S(E.large),original:S(E.original||I?.url)},w={...I,urls:C,srcSet:C};return P<5&&console.log("🧭 Normalized gallery image",P,w?.url||w,w.urls),w});p(c)}else console.warn("Invalid gallery response format:",d),p([])}else console.warn("Failed to fetch gallery images:",k.status),p([])}catch(t){console.error("❌ Error fetching gallery images:",t),p([])}},g=t=>{if(!t)return[];const u=t.split(/\n\s*\n|\n/).filter(l=>l.trim());return u.map((l,s)=>r.jsx("p",{style:{margin:s===u.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:l.trim()},s))},v=t=>{A(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(D)return r.jsx(_,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=G.lazy(()=>q(()=>import("./AboutPageMobile-DuKZ48UX.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));return r.jsx(G.Suspense,{fallback:r.jsx(_,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:r.jsx(t,{})})}return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
        `}),r.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:r.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${R.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:r.jsxs("div",{style:{width:"100%",position:"relative"},children:[r.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[r.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),r.jsx(J,{currentPage:"About",onNavigate:v})]}),r.jsx(Q,{items:[{name:"Home",url:"/"},{name:"About"}]}),r.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),r.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:$?r.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):r.jsx("div",{style:{textAlign:"left"},children:g(z)})}),r.jsxs("div",{style:{marginTop:o?"0px":"8px",marginBottom:"32px"},children:[r.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),r.jsx(ee,{images:F,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]}),r.jsx(K,{compact:!1})]})})})]})},se=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));export{se as A,ee as M};
