const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-BbekE5Ae.js","assets/index-3I2J3uCa.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-oo9b5dJq.js","assets/SocialMediaButtons-DW-rV2ls.js","assets/DesktopNavigationPills-Dl6XJlIQ.js"])))=>i.map(i=>d[i]);
import{j as o,B as L,_ as V}from"./index-3I2J3uCa.js";import{b as s,R as _}from"./vendor-ViNJc2wV.js";import{u as Y,D as X}from"./DesktopNavigationPills-Dl6XJlIQ.js";const q=({images:r=[],columns:k={desktop:4,tablet:3,mobile:2},gap:T=16,className:S="",onImageClick:B=null})=>{const[P,z]=s.useState(new Set),[D,$]=s.useState(k.desktop),[F,M]=s.useState(!1),[i,R]=s.useState(null),[f,h]=s.useState(new Map),[u,I]=s.useState(!1),A=s.useRef(null),O=s.useRef(null),t=s.useRef(null),l=s.useRef(0),c=s.useCallback(()=>{const e=window.innerWidth;e<768?$(k.mobile):e<1024?$(k.tablet):$(k.desktop)},[k]),n=s.useCallback(()=>window.innerWidth<768,[]);s.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){M(!0);return}if(O.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(M(!0),O.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),A.current)O.current.observe(A.current);else{const e=setTimeout(()=>M(!0),800);return()=>clearTimeout(e)}return()=>O.current?.disconnect()},[]),s.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]),s.useEffect(()=>{if(!F&&Array.isArray(r)&&r.length>0){const e=setTimeout(()=>M(!0),1e3);return()=>clearTimeout(e)}},[r,F]);const m=s.useCallback(e=>{z(a=>new Set([...a,e])),h(a=>new Map(a.set(e,"loaded")))},[]),b=s.useCallback(e=>{h(a=>new Map(a.set(e,"loading")))},[]),p=s.useCallback((e,a)=>{if(Date.now()-l.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(u){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const x=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",x),x?(R({...e,url:x,index:a}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),B&&B(e)},[B,u]),g=s.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),I(!0),l.current=Date.now(),R(null),document.body.style.overflow="unset",setTimeout(()=>{I(!1)},100)},[]),y=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e))},[g]),W=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e))},[g]);s.useEffect(()=>{const e=a=>{if(i)switch(a.key){case"Escape":a.preventDefault(),g();break;case"Enter":case" ":a.preventDefault(),g();break}};if(i){if(document.addEventListener("keydown",e),t.current)try{t.current.focus({preventScroll:!0})}catch{n()||t.current.focus()}return()=>document.removeEventListener("keydown",e)}},[i,g,n]);const E=s.useCallback(()=>{const e=Array.from({length:D},()=>[]),a=Array(D).fill(0);return r.forEach((d,x)=>{const C=a.indexOf(Math.min(...a));e[C].push({...d,originalIndex:x});const U=300*(d.aspectRatio||d.height/d.width||1.2);a[C]+=U+T}),e},[r,D,T])(),j=`
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
  `;return F?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:j}),o.jsx("div",{ref:A,className:`masonry-gallery ${S}`,style:{display:"flex",gap:`${T}px`,width:"100%",alignItems:"flex-start"},children:E.map((e,a)=>o.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${T}px`},children:e.map(d=>o.jsx(J,{image:d,isLoaded:P.has(d.originalIndex),loadingState:f.get(d.originalIndex),onLoad:()=>m(d.originalIndex),onLoadStart:()=>b(d.originalIndex),onClick:()=>p(d,d.originalIndex)},d.originalIndex))},a))}),i&&o.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:u?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:n()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:y,onTouchEnd:W,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:o.jsxs("div",{className:"expanded-image",style:{maxWidth:n()?"70vw":"85vw",maxHeight:n()?"50vh":"85vh",position:"relative",margin:n()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:u?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[o.jsx("img",{src:i.urls?.large||i.url||i.src||i.image_url||i.file_url,alt:i.alt||i.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const a=e.target,d=a.src;if(i.urls){if(d!==i.urls.medium&&i.urls.medium){console.log("🔄 Modal fallback to medium variant"),a.src=i.urls.medium;return}else if(d!==i.urls.original&&i.urls.original){console.log("🔄 Modal fallback to original"),a.src=i.urls.original;return}}console.error("❌ Modal image failed to load:",i),a.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),o.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e)},"aria-label":"Close image",style:{position:"absolute",top:n()?"10px":"-10px",right:n()?"10px":"-10px",width:n()?"44px":"40px",height:n()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):o.jsxs(o.Fragment,{children:[o.jsx("style",{children:j}),o.jsx("div",{ref:A,className:`masonry-gallery-placeholder ${S}`,style:{height:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"none"},children:o.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),o.jsx("span",{children:"Loading Gallery..."})]})})]})},J=({image:r,isLoaded:k,loadingState:T,onLoad:S,onLoadStart:B,onClick:P})=>{const[z,D]=s.useState(!1),$=s.useRef(null),F=s.useCallback(()=>{S()},[S]),M=s.useCallback(()=>{B()},[B]),i=s.useCallback(()=>{try{const f=r?.url||r?.src||r?.image_url||r?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:f,image:r})}catch{}D(!0),S()},[S,r]),R=s.useCallback(()=>{P&&P(r)},[P,r]);return o.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:P?"pointer":"default",opacity:k?1:0,animation:k?"fadeInScale 0.5s ease-out":"none",width:"100%",minHeight:"auto"},onClick:R,onTouchEnd:f=>{window.innerWidth<768&&(f.preventDefault(),f.stopPropagation(),R())},children:[!k&&!z&&o.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:o.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),z?o.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:o.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[o.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),o.jsx("div",{children:"Image unavailable"})]})}):o.jsx("img",{ref:$,src:r.url||r.src||r.image_url||r.file_url,srcSet:(()=>{const f=r?.srcSet?.small||r?.urls?.small,h=r?.srcSet?.medium||r?.urls?.medium,u=r?.srcSet?.large||r?.urls?.large,I=[];return f&&I.push(`${f} 400w`),h&&I.push(`${h} 600w`),u&&I.push(`${u} 800w`),I.length?I.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:r.alt||r.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",onLoadStart:M,onLoad:F,onError:f=>{const h=f.target,u=h.src;if(r.urls){if(u!==r.urls.medium&&r.urls.medium){console.log("🔄 Fallback to medium variant:",r.urls.medium),h.src=r.urls.medium;return}else if(u!==r.urls.small&&r.urls.small){console.log("🔄 Fallback to small variant:",r.urls.small),h.src=r.urls.small;return}else if(u!==r.urls.original&&r.urls.original){console.log("🔄 Fallback to original:",r.urls.original),h.src=r.urls.original;return}}if(parseInt(h.dataset.retryAttempt||"0",10)<1&&u){const A=u.includes("?")?"&":"?";h.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",u),h.src=`${u}${A}_cb=${Date.now()}`;return}i(f)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:k?1:0}}),r.title&&o.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:r.title})]})},K=()=>{const[r,k]=s.useState(!1),[T,S]=s.useState(!0),[B,P]=s.useState("About"),[z,D]=s.useState(""),[$,F]=s.useState(null),[M,i]=s.useState([]),[R,f]=s.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});s.useEffect(()=>{const t="https://b2b.click",l=`${t}/about`,c="About BOUNCE2BOUNCE | Electronic Music Events and Experiences",n="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",m="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",b=`${t}/images/og-image.png`,p=(a,d,x)=>{let C=document.head.querySelector(`meta[${a}="${d}"]`);C||(C=document.createElement("meta"),C.setAttribute(a,d),document.head.appendChild(C)),C.setAttribute("content",x)},g=(a,d)=>{let x=document.head.querySelector(`link[rel="${a}"]`);x||(x=document.createElement("link"),x.setAttribute("rel",a),document.head.appendChild(x)),x.setAttribute("href",d)};document.title=c,p("name","description",n),p("name","keywords",m),p("name","robots","index,follow"),p("property","og:type","website"),p("property","og:site_name","BOUNCE2BOUNCE"),p("property","og:title",c),p("property","og:description",n),p("property","og:url",l),p("property","og:image",b),p("name","twitter:card","summary_large_image"),p("name","twitter:title",c),p("name","twitter:description",n),p("name","twitter:image",b),p("name","twitter:site","@bounce2bounce"),g("canonical",l);const y="ld-json-about",W=document.getElementById(y);W&&W.remove();const w=document.createElement("script");w.type="application/ld+json",w.id=y;const E={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:l,description:n,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:b}}]};w.text=JSON.stringify(E),document.head.appendChild(w);const j="ld-json-breadcrumbs-about";document.getElementById(j)?.remove();const e=document.createElement("script");e.type="application/ld+json",e.id=j,e.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:l}]}),document.head.appendChild(e)},[]),Y(t=>{const{width:l}=t,c=l<=360?16:l<=480?24:32,n=l-c,m=299,b=299,p=498,g=299,y=32,W=1192,E=W-48,j=m+y+p,e=380,a=380,d=40,x=e+d+a,C=Math.max(j,x);let v=Math.min(n/C,E/C);v=Math.min(v,1.8);const U={heroWidth:Math.round(m*v*.9),heroHeight:Math.round(b*v*.9),rightHeroWidth:Math.round(p*v),rightHeroHeight:Math.round(g*v),gap:Math.round(y*v),containerWidth:W,eventsWidth:Math.round(e*v),textUsWidth:Math.round(a*v),eventsTextGap:Math.round(d*v),eventCardWidth:220,eventCardHeight:85,scale:v},G=navigator.userAgent||"",H=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(G),N=l<=768||H;k(N),S(!1),f(U),console.log(`🎯 About page responsive scaling: ${v.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,U),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:H,finalDecision:N?"MOBILE":"DESKTOP"})}),s.useEffect(()=>{h(),I()},[]);const h=async()=>{try{F(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const c=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const n=await c.json();if(n.success&&n.data)D(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),F(t.message)}finally{}},u=t=>{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof c=="string"?c:c?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const b=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,p=b.startsWith("http")?b:`${l}${b}`;return{...t,url:p}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const m=n.match(/([a-f0-9-]{36})/i);if(m){const b=m[1];return{...t,url:`${l}/api/images/serve/${b}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${l}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${l}${n}`}:t},I=async()=>{try{const c=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",c);const n=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const m=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(m,null,2)),m.success&&Array.isArray(m.data)){console.log("🖼️ First image structure:",m.data[0]);const b=m.data.map((p,g)=>{const y=u(p),W=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",w=a=>a&&(/^https?:\/\//i.test(a)?a:`${W}${a}`),E=y&&(y.urls||y.srcSet)||{},j={thumbnail:w(E.thumbnail),small:w(E.small),medium:w(E.medium||y?.url),large:w(E.large),original:w(E.original||y?.url)},e={...y,urls:j,srcSet:j};return g<5&&console.log("🧭 Normalized gallery image",g,e?.url||e,e.urls),e});i(b)}else console.warn("Invalid gallery response format:",m),i([])}else console.warn("Failed to fetch gallery images:",n.status),i([])}catch(t){console.error("❌ Error fetching gallery images:",t),i([])}},A=t=>{if(!t)return[];const l=t.split(/\n\s*\n|\n/).filter(c=>c.trim());return l.map((c,n)=>o.jsx("p",{style:{margin:n===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:c.trim()},n))},O=t=>{P(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(T)return o.jsx(L,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(r){const t=_.lazy(()=>V(()=>import("./AboutPageMobile-BbekE5Ae.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return o.jsx(_.Suspense,{fallback:o.jsx(L,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:o.jsx(t,{})})}return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:o.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${R.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:o.jsxs("div",{style:{width:"100%",position:"relative"},children:[o.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[o.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),o.jsx(X,{currentPage:"About",onNavigate:O})]}),o.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),o.jsx("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:$?o.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):o.jsx("div",{style:{textAlign:"left"},children:A(z)})}),o.jsxs("div",{style:{marginTop:r?"0px":"8px",marginBottom:"32px"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:r?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),o.jsx(q,{images:M,columns:{desktop:4,tablet:3,mobile:2},gap:r?12:16})]})]})})})]})},te=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{te as A,q as M};
