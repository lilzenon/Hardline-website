const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-5CgzF-vZ.js","assets/index-DcYbVrcg.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-5ZGDISki.js","assets/SocialMediaButtons-zzURyqC3.js","assets/DesktopNavigationPills-CDWU_jjm.js"])))=>i.map(i=>d[i]);
import{r as Y,j as r,D as V,B as _,_ as X}from"./index-DcYbVrcg.js";import{b as a,R as G}from"./vendor-ViNJc2wV.js";import{u as q,D as J}from"./DesktopNavigationPills-CDWU_jjm.js";var K=Y();const Q=({images:o=[],columns:k={desktop:4,tablet:3,mobile:2},gap:F=16,className:P="",onImageClick:B=null})=>{const[T,z]=a.useState(new Set),[M,$]=a.useState(k.desktop),[D,A]=a.useState(!1),[u,R]=a.useState(null),[O,W]=a.useState(new Map),[p,m]=a.useState(!1),f=a.useRef(null),y=a.useRef(null),t=a.useRef(null),d=a.useRef(0),l=a.useRef({y:0,locked:!1}),s=a.useCallback(()=>{if(l.current.locked)return;const e=window.scrollY||document.documentElement.scrollTop||0;l.current.y=e,l.current.locked=!0;const n=document.body.style;n.position="fixed",n.top=`-${e}px`,n.left="0",n.right="0",n.width="100%",n.overflow="hidden",document.documentElement.style.overscrollBehavior="none",document.documentElement.style.touchAction="none";const i=C=>{C.preventDefault(),C.stopPropagation()};window.addEventListener("wheel",i,{passive:!1,capture:!0}),window.addEventListener("touchmove",i,{passive:!1,capture:!0}),l.current.preventScroll=i},[]),v=a.useCallback(()=>{if(!l.current.locked)return;const e=l.current.y||0,n=document.body.style;n.position="",n.top="",n.left="",n.right="",n.width="",n.overflow="",document.documentElement.style.overscrollBehavior="",document.documentElement.style.touchAction="",l.current.preventScroll&&(window.removeEventListener("wheel",l.current.preventScroll,{capture:!0}),window.removeEventListener("touchmove",l.current.preventScroll,{capture:!0}),l.current.preventScroll=void 0),l.current.locked=!1,window.scrollTo(0,e)},[]),g=a.useCallback(()=>{const e=window.innerWidth;e<768?$(k.mobile):e<1024?$(k.tablet):$(k.desktop)},[k]),c=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){A(!0);return}if(y.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(A(!0),y.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),f.current)y.current.observe(f.current);else{const e=setTimeout(()=>A(!0),800);return()=>clearTimeout(e)}return()=>y.current?.disconnect()},[]),a.useEffect(()=>(g(),window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)),[g]),a.useEffect(()=>{if(!D&&Array.isArray(o)&&o.length>0){const e=setTimeout(()=>A(!0),1e3);return()=>clearTimeout(e)}},[o,D]);const L=a.useCallback(e=>{z(n=>new Set([...n,e])),W(n=>new Map(n.set(e,"loaded")))},[]),j=a.useCallback(e=>{W(n=>new Map(n.set(e,"loading")))},[]),w=a.useCallback((e,n)=>{if(Date.now()-d.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(p){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const C=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",C),C?(R({...e,url:C,index:n}),s()):console.error("❌ No valid image URL found in image object:",e),B&&B(e)},[B,p]),h=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),m(!0),d.current=Date.now();const n=i=>{i.preventDefault(),i.stopPropagation(),typeof i.stopImmediatePropagation=="function"&&i.stopImmediatePropagation()};document.addEventListener("click",n,{capture:!0,once:!0}),document.addEventListener("touchend",n,{capture:!0,once:!0}),R(null),v(),setTimeout(()=>{m(!1)},100)},[]),E=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]),I=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e))},[h]);a.useEffect(()=>{const e=n=>{if(u)switch(n.key){case"Escape":n.preventDefault(),h();break;case"Enter":case" ":n.preventDefault(),h();break}};if(u){if(document.addEventListener("keydown",e),t.current)try{t.current.focus({preventScroll:!0})}catch{c()||t.current.focus()}return()=>document.removeEventListener("keydown",e)}},[u,h,c]);const x=a.useCallback(()=>{const e=Array.from({length:M},()=>[]),n=Array(M).fill(0);return o.forEach((i,C)=>{const N=n.indexOf(Math.min(...n));e[N].push({...i,originalIndex:C});const U=300*(i.aspectRatio||i.height/i.width||1.2);n[N]+=U+F}),e},[o,M,F])(),b=`
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
  `;return D?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:b}),r.jsx("div",{ref:f,className:`masonry-gallery ${P}`,style:{display:"flex",gap:`${F}px`,width:"100%",alignItems:"flex-start"},children:x.map((e,n)=>r.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${F}px`},children:e.map(i=>r.jsx(Z,{image:i,isLoaded:T.has(i.originalIndex),loadingState:O.get(i.originalIndex),onLoad:()=>L(i.originalIndex),onLoadStart:()=>j(i.originalIndex),onClick:()=>w(i,i.originalIndex)},i.originalIndex))},n))}),u&&K.createPortal(r.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:c()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none",overflow:"hidden",overscrollBehavior:"none",overscrollBehaviorY:"none"},onClick:E,onTouchEnd:I,onScroll:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget.scrollTop=0},onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:r.jsxs("div",{className:"expanded-image",style:{maxWidth:c()?"70vw":"85vw",maxHeight:c()?"50vh":"85vh",position:"relative",margin:c()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:p?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchMove:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[r.jsx("img",{src:u.urls?.large||u.url||u.src||u.image_url||u.file_url,alt:u.alt||u.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const n=e.target,i=n.src;if(u.urls){if(i!==u.urls.medium&&u.urls.medium){n.src=u.urls.medium;return}else if(i!==u.urls.original&&u.urls.original){n.src=u.urls.original;return}}n.style.display="none"}}),r.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),h(e)},"aria-label":"Close image",style:{position:"absolute",top:c()?"10px":"-10px",right:c()?"10px":"-10px",width:c()?"44px":"40px",height:c()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:b}),r.jsx("div",{ref:f,className:`masonry-gallery-placeholder ${P}`,style:{minHeight:typeof window<"u"&&window.innerWidth<768?"240px":"360px",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease"},children:r.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[r.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),r.jsx("span",{children:"Loading Gallery..."})]})})]})},Z=({image:o,isLoaded:k,loadingState:F,onLoad:P,onLoadStart:B,onClick:T})=>{const[z,M]=a.useState(!1),$=a.useRef(null),D=a.useCallback(()=>{P()},[P]),A=a.useCallback(()=>{B()},[B]),u=a.useCallback(()=>{try{const p=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:p,image:o})}catch{}M(!0),P()},[P,o]),R=a.useCallback(()=>{T&&T(o)},[T,o]),O=a.useRef({x:0,y:0,time:0}),W=a.useRef(!1);return r.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:T?"pointer":"default",opacity:k?1:0,animation:k?"fadeInScale 0.5s ease-out":"none",width:"100%",aspectRatio:o?.width&&o?.height?`${o.width} / ${o.height}`:void 0,minHeight:k?"auto":typeof window<"u"&&window.innerWidth<768?"160px":"220px"},onClick:R,onTouchStart:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;O.current={x:m.clientX,y:m.clientY,time:Date.now()},W.current=!1}},onTouchMove:p=>{if(window.innerWidth<768){const m=p.touches&&p.touches[0];if(!m)return;const f=Math.abs(m.clientX-O.current.x),y=Math.abs(m.clientY-O.current.y);(f>10||y>10)&&(W.current=!0)}},onTouchEnd:p=>{window.innerWidth<768&&(W.current||(p.preventDefault(),p.stopPropagation(),R()),W.current=!1)},children:[!k&&!z&&r.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:r.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),z?r.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:r.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[r.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),r.jsx("div",{children:"Image unavailable"})]})}):r.jsx("img",{ref:$,src:o.url||o.src||o.image_url||o.file_url,srcSet:(()=>{const p=o?.srcSet?.small||o?.urls?.small,m=o?.srcSet?.medium||o?.urls?.medium,f=o?.srcSet?.large||o?.urls?.large,y=[];return p&&y.push(`${p} 400w`),m&&y.push(`${m} 600w`),f&&y.push(`${f} 800w`),y.length?y.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",decoding:"async",width:o?.width,height:o?.height,onLoadStart:A,onLoad:D,onError:p=>{const m=p.target,f=m.src;if(o.urls){if(f!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),m.src=o.urls.medium;return}else if(f!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),m.src=o.urls.small;return}else if(f!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),m.src=o.urls.original;return}}if(parseInt(m.dataset.retryAttempt||"0",10)<1&&f){const t=f.includes("?")?"&":"?";m.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",f),m.src=`${f}${t}_cb=${Date.now()}`;return}u(p)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:k?1:0}}),o.title&&r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},ee=()=>{const[o,k]=a.useState(!1),[F,P]=a.useState(!0),[B,T]=a.useState("About"),[z,M]=a.useState(""),[$,D]=a.useState(null),[A,u]=a.useState([]),[R,O]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const t="https://bounce2bounce.com",d=`${t}/about`,l="About BOUNCE2BOUNCE",s="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",v="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",g=`${t}/images/og-image.png`,c=(x,b,e)=>{let n=document.head.querySelector(`meta[${x}="${b}"]`);n||(n=document.createElement("meta"),n.setAttribute(x,b),document.head.appendChild(n)),n.setAttribute("content",e)},L=(x,b)=>{let e=document.head.querySelector(`link[rel="${x}"]`);e||(e=document.createElement("link"),e.setAttribute("rel",x),document.head.appendChild(e)),e.setAttribute("href",b)};document.title=l,c("name","description",s),c("name","keywords",v),c("name","robots","index,follow"),c("property","og:type","website"),c("property","og:site_name","BOUNCE2BOUNCE"),c("property","og:title",l),c("property","og:description",s),c("property","og:url",d),c("property","og:image",g),c("name","twitter:card","summary_large_image"),c("name","twitter:title",l),c("name","twitter:description",s),c("name","twitter:image",g),c("name","twitter:site","@bounce2bounce"),L("canonical",d);const j="ld-json-about",w=document.getElementById(j);w&&w.remove();const h=document.createElement("script");h.type="application/ld+json",h.id=j;const E={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:d,description:s,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:g}}]};h.text=JSON.stringify(E),document.head.appendChild(h);const I="ld-json-breadcrumbs-about";document.getElementById(I)?.remove();const S=document.createElement("script");S.type="application/ld+json",S.id=I,S.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:d}]}),document.head.appendChild(S)},[]),a.useEffect(()=>{const t=V?.default_title||"BOUNCE2BOUNCE - Premium Event Platform";return()=>{document.title=t}},[]),q(t=>{const{width:d}=t,l=d<=360?16:d<=480?24:32,s=d-l,v=299,g=299,c=498,L=299,j=32,w=1192,E=w-48,I=v+j+c,S=380,x=380,b=40,e=S+b+x,n=Math.max(I,e);let i=Math.min(s/n,E/n);i=Math.min(i,1.8);const C={heroWidth:Math.round(v*i*.9),heroHeight:Math.round(g*i*.9),rightHeroWidth:Math.round(c*i),rightHeroHeight:Math.round(L*i),gap:Math.round(j*i),containerWidth:w,eventsWidth:Math.round(S*i),textUsWidth:Math.round(x*i),eventsTextGap:Math.round(b*i),eventCardWidth:220,eventCardHeight:85,scale:i},N=navigator.userAgent||"",H=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(N),U=d<=768||H;k(U),P(!1),O(C),console.log(`🎯 About page responsive scaling: ${i.toFixed(3)} for viewport ${d}px (max 1.8x, container: 1192px)`,C),console.log("📱 About Page Device Detection:",{viewportWidth:d,isMobileByUA:H,finalDecision:U?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{W(),m()},[]);const W=async()=>{try{D(null);const d=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const l=await fetch(`${d}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);const s=await l.json();if(s.success&&s.data)M(s.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),D(t.message)}finally{}},p=t=>{const d=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",s=typeof l=="string"?l:l?.url||"";if(s&&/^https?:\/\//i.test(s))return{...t,url:s};if(s&&s.includes("/api/images/serve/")){const g=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(s)?s:`${s.replace(/\/?$/,"")}/medium`,c=g.startsWith("http")?g:`${d}${g}`;return{...t,url:c}}if(s&&s.startsWith("/")&&/[a-f0-9-]{36}/i.test(s)){const v=s.match(/([a-f0-9-]{36})/i);if(v){const g=v[1];return{...t,url:`${d}/api/images/serve/${g}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${d}/api/images/serve/${t.uuid}/medium`}:s&&s.startsWith("/")?{...t,url:`${d}${s}`}:t},m=async()=>{try{const d=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",l=`cb=${Date.now()}`,s=`${d}/api/settings/about/gallery/public?${l}`;console.log("🔍 Fetching gallery from:",s);const v=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(v.ok){const g=await v.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(g,null,2)),g.success&&Array.isArray(g.data)){console.log("🖼️ First image structure:",g.data[0]);const c=g.data.map((L,j)=>{const w=p(L),h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",E=b=>{if(!b)return b;const e=/^https?:\/\//i.test(b)?b:`${h}${b}`,n=e.includes("?")?"&":"?";return`${e}${n}${l}`},I=w&&(w.urls||w.srcSet)||{},S={thumbnail:E(I.thumbnail),small:E(I.small),medium:E(I.medium||w?.url),large:E(I.large),original:E(I.original||w?.url)},x={...w,urls:S,srcSet:S};return j<5&&console.log("🧭 Normalized gallery image",j,x?.url||x,x.urls),x});u(c)}else console.warn("Invalid gallery response format:",g),u([])}else console.warn("Failed to fetch gallery images:",v.status),u([])}catch(t){console.error("❌ Error fetching gallery images:",t),u([])}},f=t=>{if(!t)return[];const d=t.split(/\n\s*\n|\n/).filter(l=>l.trim());return d.map((l,s)=>r.jsx("p",{style:{margin:s===d.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:l.trim()},s))},y=t=>{T(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(F)return r.jsx(_,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=G.lazy(()=>X(()=>import("./AboutPageMobile-5CgzF-vZ.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return r.jsx(G.Suspense,{fallback:r.jsx(_,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:r.jsx(t,{})})}return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
        `}),r.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:r.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${R.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:r.jsxs("div",{style:{width:"100%",position:"relative"},children:[r.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[r.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),r.jsx(J,{currentPage:"About",onNavigate:y})]}),r.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),r.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:$?r.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):r.jsx("div",{style:{textAlign:"left"},children:f(z)})}),r.jsxs("div",{style:{marginTop:o?"0px":"8px",marginBottom:"32px"},children:[r.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),r.jsx(Q,{images:A,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]})]})})})]})},re=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));export{re as A,Q as M};
