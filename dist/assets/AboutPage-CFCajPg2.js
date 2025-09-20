const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-7iYq5-I-.js","assets/index-DMwlMjRa.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-Ccp0ycEQ.js","assets/SocialMediaButtons-D_kZqjt0.js","assets/DesktopNavigationPills-QRNFXcZr.js"])))=>i.map(i=>d[i]);
import{r as V,j as o,B as L,_ as Y}from"./index-DMwlMjRa.js";import{b as a,R as _}from"./vendor-ViNJc2wV.js";import{u as X,D as q}from"./DesktopNavigationPills-QRNFXcZr.js";var J=V();const K=({images:r=[],columns:E={desktop:4,tablet:3,mobile:2},gap:T=16,className:C="",onImageClick:D=null})=>{const[P,O]=a.useState(new Set),[$,R]=a.useState(E.desktop),[F,A]=a.useState(!1),[c,B]=a.useState(null),[z,W]=a.useState(new Map),[u,p]=a.useState(!1),f=a.useRef(null),b=a.useRef(null),t=a.useRef(null),l=a.useRef(0),d=a.useCallback(()=>{const e=window.innerWidth;e<768?R(E.mobile):e<1024?R(E.tablet):R(E.desktop)},[E]),n=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){A(!0);return}if(b.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(A(!0),b.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),f.current)b.current.observe(f.current);else{const e=setTimeout(()=>A(!0),800);return()=>clearTimeout(e)}return()=>b.current?.disconnect()},[]),a.useEffect(()=>(d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)),[d]),a.useEffect(()=>{if(!F&&Array.isArray(r)&&r.length>0){const e=setTimeout(()=>A(!0),1e3);return()=>clearTimeout(e)}},[r,F]);const y=a.useCallback(e=>{O(s=>new Set([...s,e])),W(s=>new Map(s.set(e,"loaded")))},[]),g=a.useCallback(e=>{W(s=>new Map(s.set(e,"loading")))},[]),m=a.useCallback((e,s)=>{if(Date.now()-l.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(u){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const h=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",h),h?(B({...e,url:h,index:s}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),D&&D(e)},[D,u]),x=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),p(!0),l.current=Date.now(),B(null),document.body.style.overflow="unset",setTimeout(()=>{p(!1)},100)},[]),S=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e))},[x]),v=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e))},[x]);a.useEffect(()=>{const e=s=>{if(c)switch(s.key){case"Escape":s.preventDefault(),x();break;case"Enter":case" ":s.preventDefault(),x();break}};if(c){if(document.addEventListener("keydown",e),t.current)try{t.current.focus({preventScroll:!0})}catch{n()||t.current.focus()}return()=>document.removeEventListener("keydown",e)}},[c,x,n]);const j=a.useCallback(()=>{const e=Array.from({length:$},()=>[]),s=Array($).fill(0);return r.forEach((i,h)=>{const k=s.indexOf(Math.min(...s));e[k].push({...i,originalIndex:h});const H=300*(i.aspectRatio||i.height/i.width||1.2);s[k]+=H+T}),e},[r,$,T])(),w=`
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
  `;return F?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:w}),o.jsx("div",{ref:f,className:`masonry-gallery ${C}`,style:{display:"flex",gap:`${T}px`,width:"100%",alignItems:"flex-start"},children:j.map((e,s)=>o.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${T}px`},children:e.map(i=>o.jsx(Q,{image:i,isLoaded:P.has(i.originalIndex),loadingState:z.get(i.originalIndex),onLoad:()=>y(i.originalIndex),onLoadStart:()=>g(i.originalIndex),onClick:()=>m(i,i.originalIndex)},i.originalIndex))},s))}),c&&J.createPortal(o.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:u?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:n()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease",touchAction:"none"},onClick:S,onTouchEnd:v,onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:o.jsxs("div",{className:"expanded-image",style:{maxWidth:n()?"70vw":"85vw",maxHeight:n()?"50vh":"85vh",position:"relative",margin:n()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:u?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[o.jsx("img",{src:c.urls?.large||c.url||c.src||c.image_url||c.file_url,alt:c.alt||c.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const s=e.target,i=s.src;if(c.urls){if(i!==c.urls.medium&&c.urls.medium){s.src=c.urls.medium;return}else if(i!==c.urls.original&&c.urls.original){s.src=c.urls.original;return}}s.style.display="none"}}),o.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),x(e)},"aria-label":"Close image",style:{position:"absolute",top:n()?"10px":"-10px",right:n()?"10px":"-10px",width:n()?"44px":"40px",height:n()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:"×"})]})}),document.body)]}):o.jsxs(o.Fragment,{children:[o.jsx("style",{children:w}),o.jsx("div",{ref:f,className:`masonry-gallery-placeholder ${C}`,style:{height:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"none"},children:o.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),o.jsx("span",{children:"Loading Gallery..."})]})})]})},Q=({image:r,isLoaded:E,loadingState:T,onLoad:C,onLoadStart:D,onClick:P})=>{const[O,$]=a.useState(!1),R=a.useRef(null),F=a.useCallback(()=>{C()},[C]),A=a.useCallback(()=>{D()},[D]),c=a.useCallback(()=>{try{const u=r?.url||r?.src||r?.image_url||r?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:u,image:r})}catch{}$(!0),C()},[C,r]),B=a.useCallback(()=>{P&&P(r)},[P,r]),z=a.useRef({x:0,y:0,time:0}),W=a.useRef(!1);return o.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:P?"pointer":"default",opacity:E?1:0,animation:E?"fadeInScale 0.5s ease-out":"none",width:"100%",minHeight:"auto"},onClick:B,onTouchStart:u=>{if(window.innerWidth<768){const p=u.touches&&u.touches[0];if(!p)return;z.current={x:p.clientX,y:p.clientY,time:Date.now()},W.current=!1}},onTouchMove:u=>{if(window.innerWidth<768){const p=u.touches&&u.touches[0];if(!p)return;const f=Math.abs(p.clientX-z.current.x),b=Math.abs(p.clientY-z.current.y);(f>10||b>10)&&(W.current=!0)}},onTouchEnd:u=>{window.innerWidth<768&&(W.current||(u.preventDefault(),u.stopPropagation(),B()),W.current=!1)},children:[!E&&!O&&o.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:o.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),O?o.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:o.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[o.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),o.jsx("div",{children:"Image unavailable"})]})}):o.jsx("img",{ref:R,src:r.url||r.src||r.image_url||r.file_url,srcSet:(()=>{const u=r?.srcSet?.small||r?.urls?.small,p=r?.srcSet?.medium||r?.urls?.medium,f=r?.srcSet?.large||r?.urls?.large,b=[];return u&&b.push(`${u} 400w`),p&&b.push(`${p} 600w`),f&&b.push(`${f} 800w`),b.length?b.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:r.alt||r.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",onLoadStart:A,onLoad:F,onError:u=>{const p=u.target,f=p.src;if(r.urls){if(f!==r.urls.medium&&r.urls.medium){console.log("🔄 Fallback to medium variant:",r.urls.medium),p.src=r.urls.medium;return}else if(f!==r.urls.small&&r.urls.small){console.log("🔄 Fallback to small variant:",r.urls.small),p.src=r.urls.small;return}else if(f!==r.urls.original&&r.urls.original){console.log("🔄 Fallback to original:",r.urls.original),p.src=r.urls.original;return}}if(parseInt(p.dataset.retryAttempt||"0",10)<1&&f){const t=f.includes("?")?"&":"?";p.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",f),p.src=`${f}${t}_cb=${Date.now()}`;return}c(u)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:E?1:0}}),r.title&&o.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:r.title})]})},Z=()=>{const[r,E]=a.useState(!1),[T,C]=a.useState(!0),[D,P]=a.useState("About"),[O,$]=a.useState(""),[R,F]=a.useState(null),[A,c]=a.useState([]),[B,z]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const t="https://b2b.click",l=`${t}/about`,d="About BOUNCE2BOUNCE | Electronic Music Events and Experiences",n="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",y="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",g=`${t}/images/og-image.png`,m=(s,i,h)=>{let k=document.head.querySelector(`meta[${s}="${i}"]`);k||(k=document.createElement("meta"),k.setAttribute(s,i),document.head.appendChild(k)),k.setAttribute("content",h)},x=(s,i)=>{let h=document.head.querySelector(`link[rel="${s}"]`);h||(h=document.createElement("link"),h.setAttribute("rel",s),document.head.appendChild(h)),h.setAttribute("href",i)};document.title=d,m("name","description",n),m("name","keywords",y),m("name","robots","index,follow"),m("property","og:type","website"),m("property","og:site_name","BOUNCE2BOUNCE"),m("property","og:title",d),m("property","og:description",n),m("property","og:url",l),m("property","og:image",g),m("name","twitter:card","summary_large_image"),m("name","twitter:title",d),m("name","twitter:description",n),m("name","twitter:image",g),m("name","twitter:site","@bounce2bounce"),x("canonical",l);const S="ld-json-about",v=document.getElementById(S);v&&v.remove();const M=document.createElement("script");M.type="application/ld+json",M.id=S;const j={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:l,description:n,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:g}}]};M.text=JSON.stringify(j),document.head.appendChild(M);const w="ld-json-breadcrumbs-about";document.getElementById(w)?.remove();const e=document.createElement("script");e.type="application/ld+json",e.id=w,e.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:l}]}),document.head.appendChild(e)},[]),X(t=>{const{width:l}=t,d=l<=360?16:l<=480?24:32,n=l-d,y=299,g=299,m=498,x=299,S=32,v=1192,j=v-48,w=y+S+m,e=380,s=380,i=40,h=e+i+s,k=Math.max(w,h);let I=Math.min(n/k,j/k);I=Math.min(I,1.8);const H={heroWidth:Math.round(y*I*.9),heroHeight:Math.round(g*I*.9),rightHeroWidth:Math.round(m*I),rightHeroHeight:Math.round(x*I),gap:Math.round(S*I),containerWidth:v,eventsWidth:Math.round(e*I),textUsWidth:Math.round(s*I),eventsTextGap:Math.round(i*I),eventCardWidth:220,eventCardHeight:85,scale:I},G=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(G),U=l<=768||N;E(U),C(!1),z(H),console.log(`🎯 About page responsive scaling: ${I.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,H),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:N,finalDecision:U?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{W(),p()},[]);const W=async()=>{try{F(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const d=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!d.ok)throw new Error(`HTTP error! status: ${d.status}`);const n=await d.json();if(n.success&&n.data)$(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),F(t.message)}finally{}},u=t=>{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof d=="string"?d:d?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const g=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,m=g.startsWith("http")?g:`${l}${g}`;return{...t,url:m}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const y=n.match(/([a-f0-9-]{36})/i);if(y){const g=y[1];return{...t,url:`${l}/api/images/serve/${g}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${l}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${l}${n}`}:t},p=async()=>{try{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=`cb=${Date.now()}`,n=`${l}/api/settings/about/gallery/public?${d}`;console.log("🔍 Fetching gallery from:",n);const y=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(y.ok){const g=await y.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(g,null,2)),g.success&&Array.isArray(g.data)){console.log("🖼️ First image structure:",g.data[0]);const m=g.data.map((x,S)=>{const v=u(x),M=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",j=i=>{if(!i)return i;const h=/^https?:\/\//i.test(i)?i:`${M}${i}`,k=h.includes("?")?"&":"?";return`${h}${k}${d}`},w=v&&(v.urls||v.srcSet)||{},e={thumbnail:j(w.thumbnail),small:j(w.small),medium:j(w.medium||v?.url),large:j(w.large),original:j(w.original||v?.url)},s={...v,urls:e,srcSet:e};return S<5&&console.log("🧭 Normalized gallery image",S,s?.url||s,s.urls),s});c(m)}else console.warn("Invalid gallery response format:",g),c([])}else console.warn("Failed to fetch gallery images:",y.status),c([])}catch(t){console.error("❌ Error fetching gallery images:",t),c([])}},f=t=>{if(!t)return[];const l=t.split(/\n\s*\n|\n/).filter(d=>d.trim());return l.map((d,n)=>o.jsx("p",{style:{margin:n===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:d.trim()},n))},b=t=>{P(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(T)return o.jsx(L,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(r){const t=_.lazy(()=>Y(()=>import("./AboutPageMobile-7iYq5-I-.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return o.jsx(_.Suspense,{fallback:o.jsx(L,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:o.jsx(t,{})})}return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:o.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${B.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:o.jsxs("div",{style:{width:"100%",position:"relative"},children:[o.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[o.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),o.jsx(q,{currentPage:"About",onNavigate:b})]}),o.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),o.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:R?o.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):o.jsx("div",{style:{textAlign:"left"},children:f(O)})}),o.jsxs("div",{style:{marginTop:r?"0px":"8px",marginBottom:"32px"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:r?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),o.jsx(K,{images:A,columns:{desktop:4,tablet:3,mobile:2},gap:r?12:16})]})]})})})]})},re=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));export{re as A,K as M};
