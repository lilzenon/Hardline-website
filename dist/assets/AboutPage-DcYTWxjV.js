const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-EpD09gAd.js","assets/index-Dm8G0N1u.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight--3C75_yi.js","assets/SocialMediaButtons-byZ0g5D7.js","assets/usePerformantResize-Fo8ytToz.js","assets/DesktopNavigation-BRQ7w6U5.js"])))=>i.map(i=>d[i]);
import{j as a,B as L,_ as V}from"./index-Dm8G0N1u.js";import{b as s,R as _}from"./vendor-ViNJc2wV.js";import{u as Y}from"./usePerformantResize-Fo8ytToz.js";import{D as J}from"./DesktopNavigation-BRQ7w6U5.js";const X=({images:o=[],columns:x={desktop:4,tablet:3,mobile:2},gap:P=16,className:E="",onImageClick:F=null})=>{const[W,B]=s.useState(new Set),[M,A]=s.useState(x.desktop),[T,O]=s.useState(!1),[i,$]=s.useState(null),[C,j]=s.useState(new Map),[w,R]=s.useState(!1),U=s.useRef(null),N=s.useRef(null),t=s.useRef(null),l=s.useRef(0),c=s.useCallback(()=>{const e=window.innerWidth;e<768?A(x.mobile):e<1024?A(x.tablet):A(x.desktop)},[x]),n=s.useCallback(()=>window.innerWidth<768,[]);s.useEffect(()=>(N.current=new IntersectionObserver(([e])=>{e.isIntersecting&&(O(!0),N.current?.disconnect())},{threshold:.1}),U.current&&N.current.observe(U.current),()=>N.current?.disconnect()),[]),s.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]);const p=s.useCallback(e=>{B(r=>new Set([...r,e])),j(r=>new Map(r.set(e,"loaded")))},[]),g=s.useCallback(e=>{j(r=>new Map(r.set(e,"loading")))},[]),u=s.useCallback((e,r)=>{if(Date.now()-l.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(w){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const h=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",h),h?($({...e,url:h,index:r}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),F&&F(e)},[F,w]),m=s.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),R(!0),l.current=Date.now(),$(null),document.body.style.overflow="unset",setTimeout(()=>{R(!1)},100)},[]),f=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e))},[m]),S=s.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e))},[m]);s.useEffect(()=>{const e=r=>{if(i)switch(r.key){case"Escape":r.preventDefault(),m();break;case"Enter":case" ":r.preventDefault(),m();break}};if(i)return document.addEventListener("keydown",e),t.current&&t.current.focus(),()=>document.removeEventListener("keydown",e)},[i,m]);const v=s.useCallback(()=>{const e=Array.from({length:M},()=>[]),r=Array(M).fill(0);return o.forEach((d,h)=>{const k=r.indexOf(Math.min(...r));e[k].push({...d,originalIndex:h});const z=300*(d.aspectRatio||d.height/d.width||1.2);r[k]+=z+P}),e},[o,M,P])(),I=`
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
  `;return T?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:I}),a.jsx("div",{ref:U,className:`masonry-gallery ${E}`,style:{display:"flex",gap:`${P}px`,width:"100%",alignItems:"flex-start"},children:v.map((e,r)=>a.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${P}px`},children:e.map(d=>a.jsx(q,{image:d,isLoaded:W.has(d.originalIndex),loadingState:C.get(d.originalIndex),onLoad:()=>p(d.originalIndex),onLoadStart:()=>g(d.originalIndex),onClick:()=>u(d,d.originalIndex)},d.originalIndex))},r))}),i&&a.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:w?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:n()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:f,onTouchEnd:S,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:a.jsxs("div",{className:"expanded-image",style:{maxWidth:n()?"70vw":"85vw",maxHeight:n()?"50vh":"85vh",position:"relative",margin:n()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:w?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[a.jsx("img",{src:i.urls?.large||i.url||i.src||i.image_url||i.file_url,alt:i.alt||i.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const r=e.target,d=r.src;if(i.urls){if(d!==i.urls.medium&&i.urls.medium){console.log("🔄 Modal fallback to medium variant"),r.src=i.urls.medium;return}else if(d!==i.urls.original&&i.urls.original){console.log("🔄 Modal fallback to original"),r.src=i.urls.original;return}}console.error("❌ Modal image failed to load:",i),r.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),a.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),m(e)},"aria-label":"Close image",style:{position:"absolute",top:n()?"10px":"-10px",right:n()?"10px":"-10px",width:n()?"44px":"40px",height:n()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:I}),a.jsx("div",{ref:U,className:`masonry-gallery-placeholder ${E}`,style:{height:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"none"},children:a.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[a.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),a.jsx("span",{children:"Loading Gallery..."})]})})]})},q=({image:o,isLoaded:x,loadingState:P,onLoad:E,onLoadStart:F,onClick:W})=>{const[B,M]=s.useState(!1),A=s.useRef(null),T=s.useCallback(()=>{E()},[E]),O=s.useCallback(()=>{F()},[F]),i=s.useCallback(()=>{try{const C=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:C,image:o})}catch{}M(!0),E()},[E,o]),$=s.useCallback(()=>{W&&W(o)},[W,o]);return a.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:W?"pointer":"default",opacity:x?1:0,animation:x?"fadeInScale 0.5s ease-out":"none",width:"100%",minHeight:"auto"},onClick:$,children:[!x&&!B&&a.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:a.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),B?a.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:a.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[a.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),a.jsx("div",{children:"Image unavailable"})]})}):a.jsx("img",{ref:A,src:o.url||o.src||o.image_url||o.file_url,srcSet:o.srcSet?`
            ${o.srcSet.small||o.urls?.small} 400w,
            ${o.srcSet.medium||o.urls?.medium} 600w,
            ${o.srcSet.large||o.urls?.large} 800w
          `.trim():o.urls?`
            ${o.urls.small} 400w,
            ${o.urls.medium} 600w,
            ${o.urls.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",loading:"lazy",onLoadStart:O,onLoad:T,onError:C=>{const j=C.target,w=j.src;if(o.urls){if(w!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),j.src=o.urls.medium;return}else if(w!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),j.src=o.urls.small;return}else if(w!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),j.src=o.urls.original;return}}i(C)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:x?1:0}}),o.title&&a.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},K=()=>{const[o,x]=s.useState(!1),[P,E]=s.useState(!0),[F,W]=s.useState("About"),[B,M]=s.useState(""),[A,T]=s.useState(null),[O,i]=s.useState([]),[$,C]=s.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});s.useEffect(()=>{const t="https://b2b.click",l=`${t}/about`,c="About BOUNCE2BOUNCE | Live Music Events & Experiences",n="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",p="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",g=`${t}/images/og-image.png`,u=(r,d,h)=>{let k=document.head.querySelector(`meta[${r}="${d}"]`);k||(k=document.createElement("meta"),k.setAttribute(r,d),document.head.appendChild(k)),k.setAttribute("content",h)},m=(r,d)=>{let h=document.head.querySelector(`link[rel="${r}"]`);h||(h=document.createElement("link"),h.setAttribute("rel",r),document.head.appendChild(h)),h.setAttribute("href",d)};document.title=c,u("name","description",n),u("name","keywords",p),u("name","robots","index,follow"),u("property","og:type","website"),u("property","og:site_name","BOUNCE2BOUNCE"),u("property","og:title",c),u("property","og:description",n),u("property","og:url",l),u("property","og:image",g),u("name","twitter:card","summary_large_image"),u("name","twitter:title",c),u("name","twitter:description",n),u("name","twitter:image",g),u("name","twitter:site","@bounce2bounce"),m("canonical",l);const f="ld-json-about",S=document.getElementById(f);S&&S.remove();const y=document.createElement("script");y.type="application/ld+json",y.id=f;const v={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:l,description:n,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:g}}]};y.text=JSON.stringify(v),document.head.appendChild(y);const I="ld-json-breadcrumbs-about";document.getElementById(I)?.remove();const e=document.createElement("script");e.type="application/ld+json",e.id=I,e.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:l}]}),document.head.appendChild(e)},[]),Y(t=>{const{width:l}=t,c=l<=360?16:l<=480?24:32,n=l-c,p=299,g=299,u=498,m=299,f=32,S=1192,v=S-48,I=p+f+u,e=380,r=380,d=40,h=e+d+r,k=Math.max(I,h);let b=Math.min(n/k,v/k);b=Math.min(b,1.8);const z={heroWidth:Math.round(p*b*.9),heroHeight:Math.round(g*b*.9),rightHeroWidth:Math.round(u*b),rightHeroHeight:Math.round(m*b),gap:Math.round(f*b),containerWidth:S,eventsWidth:Math.round(e*b),textUsWidth:Math.round(r*b),eventsTextGap:Math.round(d*b),eventCardWidth:220,eventCardHeight:85,scale:b},G=navigator.userAgent||"",D=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(G),H=l<=768||D;x(H),E(!1),C(z),console.log(`🎯 About page responsive scaling: ${b.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,z),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:D,finalDecision:H?"MOBILE":"DESKTOP"})}),s.useEffect(()=>{j(),R()},[]);const j=async()=>{try{T(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const c=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const n=await c.json();if(n.success&&n.data)M(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),T(t.message),M(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},w=t=>{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof c=="string"?c:c?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const g=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,u=g.startsWith("http")?g:`${l}${g}`;return{...t,url:u}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const p=n.match(/([a-f0-9-]{36})/i);if(p){const g=p[1];return{...t,url:`${l}/api/images/serve/${g}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${l}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${l}${n}`}:t},R=async()=>{try{const c=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",c);const n=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const p=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(p,null,2)),p.success&&Array.isArray(p.data)){console.log("🖼️ First image structure:",p.data[0]);const g=p.data.map((u,m)=>{const f=w(u),S=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",y=r=>r&&(/^https?:\/\//i.test(r)?r:`${S}${r}`),v=f&&(f.urls||f.srcSet)||{},I={thumbnail:y(v.thumbnail),small:y(v.small),medium:y(v.medium||f?.url),large:y(v.large),original:y(v.original||f?.url)},e={...f,urls:I,srcSet:I};return m<5&&console.log("🧭 Normalized gallery image",m,e?.url||e,e.urls),e});i(g)}else console.warn("Invalid gallery response format:",p),i([])}else console.warn("Failed to fetch gallery images:",n.status),i([])}catch(t){console.error("❌ Error fetching gallery images:",t),i([])}},U=t=>{if(!t)return[];const l=t.split(/\n\s*\n|\n/).filter(c=>c.trim());return l.map((c,n)=>a.jsx("p",{style:{margin:n===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:c.trim()},n))},N=t=>{W(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(P)return a.jsx(L,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=_.lazy(()=>V(()=>import("./AboutPageMobile-EpD09gAd.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));return a.jsx(_.Suspense,{fallback:a.jsx(L,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:a.jsx(t,{})})}return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
        `}),a.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:a.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${$.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:a.jsxs("div",{style:{width:"100%",position:"relative"},children:[a.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[a.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),a.jsx(J,{currentPage:"About",onNavigate:N})]}),a.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"8px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),a.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[a.jsx("div",{style:{textAlign:"left"},children:U(B)}),A&&a.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),a.jsxs("div",{style:{marginTop:o?"0px":"8px",marginBottom:"32px"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),a.jsx(X,{images:O,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{oe as A,X as M};
