const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-Dwv42aJB.js","assets/index-BGPx4PR3.js","assets/vendor-ViNJc2wV.js","assets/index-C9VxiwSc.css","assets/useNavHeight-BA4e_3jp.js","assets/SocialMediaButtons-CuH2myYR.js","assets/DesktopNavigationPills-CJuBUgok.js"])))=>i.map(i=>d[i]);
import{j as o,B as L,_ as V}from"./index-BGPx4PR3.js";import{b as a,R as _}from"./vendor-ViNJc2wV.js";import{u as Y,D as J}from"./DesktopNavigationPills-CJuBUgok.js";const X=({images:r=[],columns:v={desktop:4,tablet:3,mobile:2},gap:B=16,className:S="",onImageClick:O=null})=>{const[P,U]=a.useState(new Set),[M,$]=a.useState(v.desktop),[A,F]=a.useState(!1),[i,N]=a.useState(null),[k,f]=a.useState(new Map),[p,I]=a.useState(!1),T=a.useRef(null),D=a.useRef(null),t=a.useRef(null),l=a.useRef(0),c=a.useCallback(()=>{const e=window.innerWidth;e<768?$(v.mobile):e<1024?$(v.tablet):$(v.desktop)},[v]),n=a.useCallback(()=>window.innerWidth<768,[]);a.useEffect(()=>{if(typeof window<"u"&&!("IntersectionObserver"in window)){F(!0);return}if(D.current=new IntersectionObserver(([e])=>{e&&e.isIntersecting&&(F(!0),D.current?.disconnect())},{threshold:.1,rootMargin:"50px"}),T.current)D.current.observe(T.current);else{const e=setTimeout(()=>F(!0),800);return()=>clearTimeout(e)}return()=>D.current?.disconnect()},[]),a.useEffect(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[c]),a.useEffect(()=>{if(!A&&Array.isArray(r)&&r.length>0){const e=setTimeout(()=>F(!0),1e3);return()=>clearTimeout(e)}},[r,A]);const m=a.useCallback(e=>{U(s=>new Set([...s,e])),f(s=>new Map(s.set(e,"loaded")))},[]),h=a.useCallback(e=>{f(s=>new Map(s.set(e,"loading")))},[]),u=a.useCallback((e,s)=>{if(Date.now()-l.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(p){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const b=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",b),b?(N({...e,url:b,index:s}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),O&&O(e)},[O,p]),g=a.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),I(!0),l.current=Date.now(),N(null),document.body.style.overflow="unset",setTimeout(()=>{I(!1)},100)},[]),x=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e))},[g]),W=a.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e))},[g]);a.useEffect(()=>{const e=s=>{if(i)switch(s.key){case"Escape":s.preventDefault(),g();break;case"Enter":case" ":s.preventDefault(),g();break}};if(i)return document.addEventListener("keydown",e),t.current&&t.current.focus(),()=>document.removeEventListener("keydown",e)},[i,g]);const E=a.useCallback(()=>{const e=Array.from({length:M},()=>[]),s=Array(M).fill(0);return r.forEach((d,b)=>{const C=s.indexOf(Math.min(...s));e[C].push({...d,originalIndex:b});const R=300*(d.aspectRatio||d.height/d.width||1.2);s[C]+=R+B}),e},[r,M,B])(),j=`
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
  `;return A?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:j}),o.jsx("div",{ref:T,className:`masonry-gallery ${S}`,style:{display:"flex",gap:`${B}px`,width:"100%",alignItems:"flex-start"},children:E.map((e,s)=>o.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${B}px`},children:e.map(d=>o.jsx(q,{image:d,isLoaded:P.has(d.originalIndex),loadingState:k.get(d.originalIndex),onLoad:()=>m(d.originalIndex),onLoadStart:()=>h(d.originalIndex),onClick:()=>u(d,d.originalIndex)},d.originalIndex))},s))}),i&&o.jsx("div",{ref:t,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:p?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:n()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:x,onTouchEnd:W,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:o.jsxs("div",{className:"expanded-image",style:{maxWidth:n()?"70vw":"85vw",maxHeight:n()?"50vh":"85vh",position:"relative",margin:n()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:p?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[o.jsx("img",{src:i.urls?.large||i.url||i.src||i.image_url||i.file_url,alt:i.alt||i.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const s=e.target,d=s.src;if(i.urls){if(d!==i.urls.medium&&i.urls.medium){console.log("🔄 Modal fallback to medium variant"),s.src=i.urls.medium;return}else if(d!==i.urls.original&&i.urls.original){console.log("🔄 Modal fallback to original"),s.src=i.urls.original;return}}console.error("❌ Modal image failed to load:",i),s.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),o.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),g(e)},"aria-label":"Close image",style:{position:"absolute",top:n()?"10px":"-10px",right:n()?"10px":"-10px",width:n()?"44px":"40px",height:n()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):o.jsxs(o.Fragment,{children:[o.jsx("style",{children:j}),o.jsx("div",{ref:T,className:`masonry-gallery-placeholder ${S}`,style:{height:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"16px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",color:"transparent",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"none"},children:o.jsxs("div",{style:{display:"none",flexDirection:"column",alignItems:"center",gap:"12px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),o.jsx("span",{children:"Loading Gallery..."})]})})]})},q=({image:r,isLoaded:v,loadingState:B,onLoad:S,onLoadStart:O,onClick:P})=>{const[U,M]=a.useState(!1),$=a.useRef(null),A=a.useCallback(()=>{S()},[S]),F=a.useCallback(()=>{O()},[O]),i=a.useCallback(()=>{try{const k=r?.url||r?.src||r?.image_url||r?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:k,image:r})}catch{}M(!0),S()},[S,r]),N=a.useCallback(()=>{P&&P(r)},[P,r]);return o.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"transparent",border:"none",backdropFilter:"none",WebkitBackdropFilter:"none",cursor:P?"pointer":"default",opacity:v?1:0,animation:v?"fadeInScale 0.5s ease-out":"none",width:"100%",minHeight:"auto"},onClick:N,children:[!v&&!U&&o.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"none",alignItems:"center",justifyContent:"center",minHeight:"auto",background:"transparent",backdropFilter:"none",WebkitBackdropFilter:"none",borderRadius:"12px",border:"none"},children:o.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),U?o.jsx("div",{style:{width:"100%",minHeight:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:o.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[o.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),o.jsx("div",{children:"Image unavailable"})]})}):o.jsx("img",{ref:$,src:r.url||r.src||r.image_url||r.file_url,srcSet:(()=>{const k=r?.srcSet?.small||r?.urls?.small,f=r?.srcSet?.medium||r?.urls?.medium,p=r?.srcSet?.large||r?.urls?.large,I=[];return k&&I.push(`${k} 400w`),f&&I.push(`${f} 600w`),p&&I.push(`${p} 800w`),I.length?I.join(", "):void 0})(),sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:r.alt||r.title||"Gallery image",crossOrigin:"anonymous",referrerPolicy:"no-referrer",loading:"lazy",onLoadStart:F,onLoad:A,onError:k=>{const f=k.target,p=f.src;if(r.urls){if(p!==r.urls.medium&&r.urls.medium){console.log("🔄 Fallback to medium variant:",r.urls.medium),f.src=r.urls.medium;return}else if(p!==r.urls.small&&r.urls.small){console.log("🔄 Fallback to small variant:",r.urls.small),f.src=r.urls.small;return}else if(p!==r.urls.original&&r.urls.original){console.log("🔄 Fallback to original:",r.urls.original),f.src=r.urls.original;return}}if(parseInt(f.dataset.retryAttempt||"0",10)<1&&p){const T=p.includes("?")?"&":"?";f.dataset.retryAttempt="1",console.log("🔄 Cache-busting retry for image:",p),f.src=`${p}${T}_cb=${Date.now()}`;return}i(k)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:v?1:0}}),r.title&&o.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:r.title})]})},K=()=>{const[r,v]=a.useState(!1),[B,S]=a.useState(!0),[O,P]=a.useState("About"),[U,M]=a.useState(""),[$,A]=a.useState(null),[F,i]=a.useState([]),[N,k]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});a.useEffect(()=>{const t="https://b2b.click",l=`${t}/about`,c="About BOUNCE2BOUNCE | Live Music Events & Experiences",n="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",m="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",h=`${t}/images/og-image.png`,u=(s,d,b)=>{let C=document.head.querySelector(`meta[${s}="${d}"]`);C||(C=document.createElement("meta"),C.setAttribute(s,d),document.head.appendChild(C)),C.setAttribute("content",b)},g=(s,d)=>{let b=document.head.querySelector(`link[rel="${s}"]`);b||(b=document.createElement("link"),b.setAttribute("rel",s),document.head.appendChild(b)),b.setAttribute("href",d)};document.title=c,u("name","description",n),u("name","keywords",m),u("name","robots","index,follow"),u("property","og:type","website"),u("property","og:site_name","BOUNCE2BOUNCE"),u("property","og:title",c),u("property","og:description",n),u("property","og:url",l),u("property","og:image",h),u("name","twitter:card","summary_large_image"),u("name","twitter:title",c),u("name","twitter:description",n),u("name","twitter:image",h),u("name","twitter:site","@bounce2bounce"),g("canonical",l);const x="ld-json-about",W=document.getElementById(x);W&&W.remove();const w=document.createElement("script");w.type="application/ld+json",w.id=x;const E={"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:l,description:n,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:h}}]};w.text=JSON.stringify(E),document.head.appendChild(w);const j="ld-json-breadcrumbs-about";document.getElementById(j)?.remove();const e=document.createElement("script");e.type="application/ld+json",e.id=j,e.text=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${t}/`},{"@type":"ListItem",position:2,name:"About",item:l}]}),document.head.appendChild(e)},[]),Y(t=>{const{width:l}=t,c=l<=360?16:l<=480?24:32,n=l-c,m=299,h=299,u=498,g=299,x=32,W=1192,E=W-48,j=m+x+u,e=380,s=380,d=40,b=e+d+s,C=Math.max(j,b);let y=Math.min(n/C,E/C);y=Math.min(y,1.8);const R={heroWidth:Math.round(m*y*.9),heroHeight:Math.round(h*y*.9),rightHeroWidth:Math.round(u*y),rightHeroHeight:Math.round(g*y),gap:Math.round(x*y),containerWidth:W,eventsWidth:Math.round(e*y),textUsWidth:Math.round(s*y),eventsTextGap:Math.round(d*y),eventCardWidth:220,eventCardHeight:85,scale:y},G=navigator.userAgent||"",z=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(G),H=l<=768||z;v(H),S(!1),k(R),console.log(`🎯 About page responsive scaling: ${y.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,R),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:z,finalDecision:H?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{f(),I()},[]);const f=async()=>{try{A(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const c=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!c.ok)throw new Error(`HTTP error! status: ${c.status}`);const n=await c.json();if(n.success&&n.data)M(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),A(t.message),M(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},p=t=>{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof c=="string"?c:c?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const h=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,u=h.startsWith("http")?h:`${l}${h}`;return{...t,url:u}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const m=n.match(/([a-f0-9-]{36})/i);if(m){const h=m[1];return{...t,url:`${l}/api/images/serve/${h}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${l}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${l}${n}`}:t},I=async()=>{try{const c=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",c);const n=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const m=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(m,null,2)),m.success&&Array.isArray(m.data)){console.log("🖼️ First image structure:",m.data[0]);const h=m.data.map((u,g)=>{const x=p(u),W=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",w=s=>s&&(/^https?:\/\//i.test(s)?s:`${W}${s}`),E=x&&(x.urls||x.srcSet)||{},j={thumbnail:w(E.thumbnail),small:w(E.small),medium:w(E.medium||x?.url),large:w(E.large),original:w(E.original||x?.url)},e={...x,urls:j,srcSet:j};return g<5&&console.log("🧭 Normalized gallery image",g,e?.url||e,e.urls),e});i(h)}else console.warn("Invalid gallery response format:",m),i([])}else console.warn("Failed to fetch gallery images:",n.status),i([])}catch(t){console.error("❌ Error fetching gallery images:",t),i([])}},T=t=>{if(!t)return[];const l=t.split(/\n\s*\n|\n/).filter(c=>c.trim());return l.map((c,n)=>o.jsx("p",{style:{margin:n===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:c.trim()},n))},D=t=>{P(t),console.log(`🧭 About Page Navigation: Switched to ${t} tab`)};if(B)return o.jsx(L,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(r){const t=_.lazy(()=>V(()=>import("./AboutPageMobile-Dwv42aJB.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return o.jsx(_.Suspense,{fallback:o.jsx(L,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:o.jsx(t,{})})}return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:o.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${N.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:o.jsxs("div",{style:{width:"100%",position:"relative"},children:[o.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[o.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),o.jsx(J,{currentPage:"About",onNavigate:D})]}),o.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"16px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),o.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"0 auto",background:"transparent",padding:"8px 20px 20px 20px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[o.jsx("div",{style:{textAlign:"left"},children:T(U)}),$&&o.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),o.jsxs("div",{style:{marginTop:r?"0px":"8px",marginBottom:"32px"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"48px",lineHeight:"1.3em",marginBottom:r?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),o.jsx(X,{images:F,columns:{desktop:4,tablet:3,mobile:2},gap:r?12:16})]})]})})})]})},te=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{te as A,X as M};
