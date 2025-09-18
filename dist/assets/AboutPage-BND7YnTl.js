const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-Cpe4kuAN.js","assets/index-4vrwPzcB.js","assets/vendor-ViNJc2wV.js","assets/index-BobKJAf2.css","assets/useNavHeight-BHewzoP7.js","assets/SocialMediaButtons-DmAWbzNM.js","assets/usePerformantResize-Fo8ytToz.js","assets/DesktopNavigation-D1afwp00.js"])))=>i.map(i=>d[i]);
import{j as a,B as L,_ as V}from"./index-4vrwPzcB.js";import{b as s,R as _}from"./vendor-ViNJc2wV.js";import{u as Y}from"./usePerformantResize-Fo8ytToz.js";import{D as X}from"./DesktopNavigation-D1afwp00.js";const q=({images:o=[],columns:x={desktop:4,tablet:3,mobile:2},gap:W=16,className:w="",onImageClick:M=null})=>{const[j,A]=s.useState(new Set),[S,P]=s.useState(x.desktop),[B,N]=s.useState(!1),[i,T]=s.useState(null),[I,C]=s.useState(new Map),[k,z]=s.useState(!1),U=s.useRef(null),$=s.useRef(null),t=s.useRef(null),d=s.useRef(0),c=s.useCallback(()=>{const e=window.innerWidth;e<768?P(x.mobile):e<1024?P(x.tablet):P(x.desktop)},[x]),r=s.useCallback(()=>window.innerWidth<768,[]);s.useEffect(()=>($.current=new IntersectionObserver(([e])=>{e.isIntersecting&&(N(!0),$.current?.disconnect())},{threshold:.1}),U.current&&$.current.observe(U.current),()=>$.current?.disconnect()),[]),s.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]);const p=s.useCallback(e=>{A(n=>new Set([...n,e])),C(n=>new Map(n.set(e,"loaded")))},[]),g=s.useCallback(e=>{C(n=>new Map(n.set(e,"loading")))},[]),u=s.useCallback((e,n)=>{if(Date.now()-d.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(k){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const F=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",F),F?(T({...e,url:F,index:n}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),M&&M(e)},[M,k]),m=s.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),z(!0),d.current=Date.now(),T(null),document.body.style.overflow="unset",setTimeout(()=>{z(!1)},100)},[]),f=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e))},[m]),E=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e))},[m]);s.useEffect(()=>{const e=n=>{if(i)switch(n.key){case"Escape":n.preventDefault(),m();break;case"Enter":case" ":n.preventDefault(),m();break}};if(i)return document.addEventListener("keydown",e),t.current&&t.current.focus(),()=>document.removeEventListener("keydown",e)},[i,m]);const v=s.useCallback(()=>{const e=Array.from({length:S},()=>[]),n=Array(S).fill(0);return o.forEach((l,F)=>{const R=n.indexOf(Math.min(...n));e[R].push({...l,originalIndex:F});const D=300*(l.aspectRatio||l.height/l.width||1.2);n[R]+=D+W}),e},[o,S,W])(),h=`
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
  `;return B?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:h}),a.jsx("div",{ref:U,className:`masonry-gallery ${w}`,style:{display:"flex",gap:`${W}px`,width:"100%",alignItems:"flex-start"},children:v.map((e,n)=>a.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${W}px`},children:e.map(l=>a.jsx(J,{image:l,isLoaded:j.has(l.originalIndex),loadingState:I.get(l.originalIndex),onLoad:()=>p(l.originalIndex),onLoadStart:()=>g(l.originalIndex),onClick:()=>u(l,l.originalIndex)},l.originalIndex))},n))}),i&&a.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:k?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:r()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:f,onTouchEnd:E,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:a.jsxs("div",{className:"expanded-image",style:{maxWidth:r()?"70vw":"85vw",maxHeight:r()?"50vh":"85vh",position:"relative",margin:r()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:k?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[a.jsx("img",{src:i.urls?.large||i.url||i.src||i.image_url||i.file_url,alt:i.alt||i.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const n=e.target,l=n.src;if(i.urls){if(l!==i.urls.medium&&i.urls.medium){console.log("🔄 Modal fallback to medium variant"),n.src=i.urls.medium;return}else if(l!==i.urls.original&&i.urls.original){console.log("🔄 Modal fallback to original"),n.src=i.urls.original;return}}console.error("❌ Modal image failed to load:",i),n.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),a.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e)},"aria-label":"Close image",style:{position:"absolute",top:r()?"10px":"-10px",right:r()?"10px":"-10px",width:r()?"44px":"40px",height:r()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:h}),a.jsx("div",{ref:U,className:`masonry-gallery-placeholder ${w}`,style:{height:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"none"},children:a.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[a.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),a.jsx("span",{children:"Loading Gallery..."})]})})]})},J=({image:o,isLoaded:x,loadingState:W,onLoad:w,onLoadStart:M,onClick:j})=>{const[A,S]=s.useState(!1),P=s.useRef(null),B=s.useCallback(()=>{w()},[w]),N=s.useCallback(()=>{M()},[M]),i=s.useCallback(()=>{try{const I=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:I,image:o})}catch{}S(!0),w()},[w,o]),T=s.useCallback(()=>{j&&j(o)},[j,o]);return a.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:j?"pointer":"default",opacity:x?1:0,animation:x?"fadeInScale 0.5s ease-out":"none",width:"100%",minHeight:"auto"},onClick:T,children:[!x&&!A&&a.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:a.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),A?a.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:a.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[a.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),a.jsx("div",{children:"Image unavailable"})]})}):a.jsx("img",{ref:P,src:o.url||o.src||o.image_url||o.file_url,srcSet:o.srcSet?`
            ${o.srcSet.small||o.urls?.small} 400w,
            ${o.srcSet.medium||o.urls?.medium} 600w,
            ${o.srcSet.large||o.urls?.large} 800w
          `.trim():o.urls?`
            ${o.urls.small} 400w,
            ${o.urls.medium} 600w,
            ${o.urls.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",loading:"lazy",onLoadStart:N,onLoad:B,onError:I=>{const C=I.target,k=C.src;if(o.urls){if(k!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),C.src=o.urls.medium;return}else if(k!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),C.src=o.urls.small;return}else if(k!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),C.src=o.urls.original;return}}i(I)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:x?1:0}}),o.title&&a.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},K=()=>{const[o,x]=s.useState(!1),[W,w]=s.useState(!0),[M,j]=s.useState("About"),[A,S]=s.useState(""),[P,B]=s.useState(null),[N,i]=s.useState([]),[T,I]=s.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});s.useEffect(()=>{const t="https://b2b.click",d=`${t}/about`,c="About BOUNCE2BOUNCE | Live Music Events & Experiences",r="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",p="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",g=`${t}/images/og-image.png`,u=(h,e,n)=>{let l=document.head.querySelector(`meta[${h}="${e}"]`);l||(l=document.createElement("meta"),l.setAttribute(h,e),document.head.appendChild(l)),l.setAttribute("content",n)},m=(h,e)=>{let n=document.head.querySelector(`link[rel="${h}"]`);n||(n=document.createElement("link"),n.setAttribute("rel",h),document.head.appendChild(n)),n.setAttribute("href",e)};document.title=c,u("name","description",r),u("name","keywords",p),u("name","robots","index,follow"),u("property","og:type","website"),u("property","og:site_name","BOUNCE2BOUNCE"),u("property","og:title",c),u("property","og:description",r),u("property","og:url",d),u("property","og:image",g),u("name","twitter:card","summary_large_image"),u("name","twitter:title",c),u("name","twitter:description",r),u("name","twitter:image",g),u("name","twitter:site","@bounce2bounce"),m("canonical",d);const f="ld-json-about",E=document.getElementById(f);E&&E.remove();const y=document.createElement("script");y.type="application/ld+json",y.id=f;const v={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:d,description:r,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:g}}]};y.text=JSON.stringify(v),document.head.appendChild(y)},[]),Y(t=>{const{width:d}=t,c=d<=360?16:d<=480?24:32,r=d-c,p=299,g=299,u=498,m=299,f=32,E=1192,v=E-48,h=p+f+u,e=380,n=380,l=40,F=e+l+n,R=Math.max(h,F);let b=Math.min(r/R,v/R);b=Math.min(b,1.8);const D={heroWidth:Math.round(p*b*.9),heroHeight:Math.round(g*b*.9),rightHeroWidth:Math.round(u*b),rightHeroHeight:Math.round(m*b),gap:Math.round(f*b),containerWidth:E,eventsWidth:Math.round(e*b),textUsWidth:Math.round(n*b),eventsTextGap:Math.round(l*b),eventCardWidth:220,eventCardHeight:85,scale:b},G=navigator.userAgent||"",O=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(G),H=d<=768||O;x(H),w(!1),I(D),console.log(`🎯 About page responsive scaling: ${b.toFixed(3)} for viewport ${d}px (max 1.8x, container: 1192px)`,D),console.log("📱 About Page Device Detection:",{viewportWidth:d,isMobileByUA:O,finalDecision:H?"MOBILE":"DESKTOP"})}),s.useEffect(()=>{C(),z()},[]);const C=async()=>{try{B(null);const d=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const c=await fetch(`${d}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const r=await c.json();if(r.success&&r.data)S(r.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),B(t.message),S(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},k=t=>{const d=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",r=typeof c=="string"?c:c?.url||"";if(r&&/^https?:\/\//i.test(r))return{...t,url:r};if(r&&r.includes("/api/images/serve/")){const g=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(r)?r:`${r.replace(/\/?$/,"")}/medium`,u=g.startsWith("http")?g:`${d}${g}`;return{...t,url:u}}if(r&&r.startsWith("/")&&/[a-f0-9-]{36}/i.test(r)){const p=r.match(/([a-f0-9-]{36})/i);if(p){const g=p[1];return{...t,url:`${d}/api/images/serve/${g}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${d}/api/images/serve/${t.uuid}/medium`}:r&&r.startsWith("/")?{...t,url:`${d}${r}`}:t},z=async()=>{try{const c=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",c);const r=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(r.ok){const p=await r.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(p,null,2)),p.success&&Array.isArray(p.data)){console.log("🖼️ First image structure:",p.data[0]);const g=p.data.map((u,m)=>{const f=k(u),E=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",y=n=>n&&(/^https?:\/\//i.test(n)?n:`${E}${n}`),v=f&&(f.urls||f.srcSet)||{},h={thumbnail:y(v.thumbnail),small:y(v.small),medium:y(v.medium||f?.url),large:y(v.large),original:y(v.original||f?.url)},e={...f,urls:h,srcSet:h};return m<5&&console.log("🧭 Normalized gallery image",m,e?.url||e,e.urls),e});i(g)}else console.warn("Invalid gallery response format:",p),i([])}else console.warn("Failed to fetch gallery images:",r.status),i([])}catch(t){console.error("❌ Error fetching gallery images:",t),i([])}},U=t=>{if(!t)return[];const d=t.split(/\n\s*\n|\n/).filter(c=>c.trim());return d.map((c,r)=>a.jsx("p",{style:{margin:r===d.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:c.trim()},r))},$=t=>{j(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(W)return a.jsx(L,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=_.lazy(()=>V(()=>import("./AboutPageMobile-Cpe4kuAN.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));return a.jsx(_.Suspense,{fallback:a.jsx(L,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:a.jsx(t,{})})}return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
        `}),a.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:a.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${T.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:a.jsxs("div",{style:{width:"100%",position:"relative"},children:[a.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[a.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),a.jsx(X,{currentPage:"About",onNavigate:$})]}),a.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"8px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),a.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[a.jsx("div",{style:{textAlign:"left"},children:U(A)}),P&&a.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),a.jsxs("div",{style:{marginTop:o?"0px":"8px",marginBottom:"32px"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),a.jsx(q,{images:N,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{oe as A,q as M};
