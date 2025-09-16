const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-DM546bd4.js","assets/index-1dRYtxDC.js","assets/vendor-jvEW_LiJ.js","assets/index-CTSQklRg.css","assets/MobileNavigation-ClCOANTX.js","assets/SocialMediaButtons-BskMdDNU.js","assets/usePerformantResize-CuZ2NaBZ.js"])))=>i.map(i=>d[i]);
import{j as a,B as O,_ as X}from"./index-1dRYtxDC.js";import{b as r,v as V}from"./vendor-jvEW_LiJ.js";import{u as J}from"./usePerformantResize-CuZ2NaBZ.js";const K=({images:o=[],columns:m={desktop:4,tablet:3,mobile:2},gap:E=16,className:x="",onImageClick:y=null})=>{const[I,T]=r.useState(new Set),[C,W]=r.useState(m.desktop),[F,$]=r.useState(!1),[l,P]=r.useState(null),[v,w]=r.useState(new Map),[f,L]=r.useState(!1),A=r.useRef(null),j=r.useRef(null),M=r.useRef(null),R=r.useRef(0),t=r.useCallback(()=>{const e=window.innerWidth;e<768?W(m.mobile):e<1024?W(m.tablet):W(m.desktop)},[m]),s=r.useCallback(()=>window.innerWidth<768,[]);r.useEffect(()=>(j.current=new IntersectionObserver(([e])=>{e.isIntersecting&&($(!0),j.current?.disconnect())},{threshold:.1}),A.current&&j.current.observe(A.current),()=>j.current?.disconnect()),[]),r.useEffect(()=>(t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)),[t]);const d=r.useCallback(e=>{T(i=>new Set([...i,e])),w(i=>new Map(i.set(e,"loaded")))},[]),n=r.useCallback(e=>{w(i=>new Map(i.set(e,"loading")))},[]),p=r.useCallback((e,i)=>{if(Date.now()-R.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(f){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const g=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",g),g?(P({...e,url:g,index:i}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),y&&y(e)},[y,f]),u=r.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),L(!0),R.current=Date.now(),P(null),document.body.style.overflow="unset",setTimeout(()=>{L(!1)},100)},[]),S=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),u(e))},[u]),z=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),u(e))},[u]);r.useEffect(()=>{const e=i=>{if(l)switch(i.key){case"Escape":i.preventDefault(),u();break;case"Enter":case" ":i.preventDefault(),u();break}};if(l)return document.addEventListener("keydown",e),M.current&&M.current.focus(),()=>document.removeEventListener("keydown",e)},[l,u]);const D=r.useCallback(()=>{const e=Array.from({length:C},()=>[]),i=Array(C).fill(0);return o.forEach((c,g)=>{const H=i.indexOf(Math.min(...i));e[H].push({...c,originalIndex:g});const U=300*(c.aspectRatio||c.height/c.width||1.2);i[H]+=U+E}),e},[o,C,E])(),k=`
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
        rgba(22, 22, 22, 0.8) 25%,
        rgba(56, 56, 56, 0.4) 50%,
        rgba(22, 22, 22, 0.8) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 12px;
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
  `;return F?a.jsxs(a.Fragment,{children:[a.jsx("style",{children:k}),a.jsx("div",{ref:A,className:`masonry-gallery ${x}`,style:{display:"flex",gap:`${E}px`,width:"100%",alignItems:"flex-start"},children:D.map((e,i)=>a.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${E}px`},children:e.map(c=>a.jsx(q,{image:c,isLoaded:I.has(c.originalIndex),loadingState:v.get(c.originalIndex),onLoad:()=>d(c.originalIndex),onLoadStart:()=>n(c.originalIndex),onClick:()=>p(c,c.originalIndex)},c.originalIndex))},i))}),l&&a.jsx("div",{ref:M,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:f?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:s()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:S,onTouchEnd:z,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:a.jsxs("div",{className:"expanded-image",style:{maxWidth:s()?"70vw":"85vw",maxHeight:s()?"50vh":"85vh",position:"relative",margin:s()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:f?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[a.jsx("img",{src:l.urls?.large||l.url||l.src||l.image_url||l.file_url,alt:l.alt||l.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const i=e.target,c=i.src;if(l.urls){if(c!==l.urls.medium&&l.urls.medium){console.log("🔄 Modal fallback to medium variant"),i.src=l.urls.medium;return}else if(c!==l.urls.original&&l.urls.original){console.log("🔄 Modal fallback to original"),i.src=l.urls.original;return}}console.error("❌ Modal image failed to load:",l),i.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),a.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),u(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),u(e)},"aria-label":"Close image",style:{position:"absolute",top:s()?"10px":"-10px",right:s()?"10px":"-10px",width:s()?"44px":"40px",height:s()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:k}),a.jsx("div",{ref:A,className:`masonry-gallery-placeholder ${x}`,style:{height:"400px",background:"rgba(22, 22, 22, 0.8)",borderRadius:"16px",border:"1px solid rgba(56, 56, 56, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.7)",fontFamily:"Inter, sans-serif",fontSize:"16px"},children:"Loading Gallery..."})]})},q=({image:o,isLoaded:m,loadingState:E,onLoad:x,onLoadStart:y,onClick:I})=>{const[T,C]=r.useState(!1),W=r.useRef(null),F=r.useCallback(()=>{x()},[x]),$=r.useCallback(()=>{y()},[y]),l=r.useCallback(()=>{try{const v=o?.url||o?.src||o?.image_url||o?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:v,image:o})}catch{}C(!0),x()},[x,o]),P=r.useCallback(()=>{I&&I(o)},[I,o]);return a.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"rgba(22, 22, 22, 0.8)",border:"1px solid rgba(56, 56, 56, 0.3)",backdropFilter:"blur(20px)",cursor:I?"pointer":"default",opacity:m?1:.9,animation:m?"fadeInScale 0.5s ease-out":"none"},onClick:P,children:[!m&&!T&&a.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"200px"},children:a.jsx("div",{style:{color:"rgba(255, 255, 255, 0.5)",fontSize:"14px",fontFamily:"Inter, sans-serif"},children:"Loading..."})}),T?a.jsx("div",{style:{width:"100%",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.5)",fontFamily:"Inter, sans-serif",fontSize:"14px",background:"rgba(22, 22, 22, 0.9)"},children:"Image unavailable"}):a.jsx("img",{ref:W,src:o.url||o.src||o.image_url||o.file_url,srcSet:o.srcSet?`
            ${o.srcSet.small||o.urls?.small} 400w,
            ${o.srcSet.medium||o.urls?.medium} 600w,
            ${o.srcSet.large||o.urls?.large} 800w
          `.trim():o.urls?`
            ${o.urls.small} 400w,
            ${o.urls.medium} 600w,
            ${o.urls.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:o.alt||o.title||"Gallery image",loading:"lazy",onLoadStart:$,onLoad:F,onError:v=>{const w=v.target,f=w.src;if(o.urls){if(f!==o.urls.medium&&o.urls.medium){console.log("🔄 Fallback to medium variant:",o.urls.medium),w.src=o.urls.medium;return}else if(f!==o.urls.small&&o.urls.small){console.log("🔄 Fallback to small variant:",o.urls.small),w.src=o.urls.small;return}else if(f!==o.urls.original&&o.urls.original){console.log("🔄 Fallback to original:",o.urls.original),w.src=o.urls.original;return}}l(v)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.3s ease",opacity:m?1:0}}),o.title&&a.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:o.title})]})},Q=()=>{const[o,m]=r.useState(!1),[E,x]=r.useState(!0),[y,I]=r.useState("About"),[T,C]=r.useState(""),[W,F]=r.useState(null),[$,l]=r.useState([]),[P,v]=r.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});J(t=>{const{width:s}=t,d=s<=360?16:s<=480?24:32,n=s-d,p=299,u=299,S=498,z=299,b=32,D=1192,e=D-48,i=p+b+S,c=380,g=380,H=40,_=c+H+g,U=Math.max(i,_);let h=Math.min(n/U,e/U);h=Math.min(h,1.8);const B={heroWidth:Math.round(p*h*.9),heroHeight:Math.round(u*h*.9),rightHeroWidth:Math.round(S*h),rightHeroHeight:Math.round(z*h),gap:Math.round(b*h),containerWidth:D,eventsWidth:Math.round(c*h),textUsWidth:Math.round(g*h),eventsTextGap:Math.round(H*h),eventCardWidth:220,eventCardHeight:85,scale:h},Y=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Y),G=s<=768||N;m(G),x(!1),v(B),console.log(`🎯 About page responsive scaling: ${h.toFixed(3)} for viewport ${s}px (max 1.8x, container: 1192px)`,B),console.log("📱 About Page Device Detection:",{viewportWidth:s,isMobileByUA:N,finalDecision:G?"MOBILE":"DESKTOP"})}),r.useEffect(()=>{w(),L()},[]);const w=async()=>{try{F(null);const s=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const d=await fetch(`${s}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!d.ok)throw new Error(`HTTP error! status: ${d.status}`);const n=await d.json();if(n.success&&n.data)C(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),F(t.message),C(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},f=t=>{const s=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof d=="string"?d:d?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const u=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,S=u.startsWith("http")?u:`${s}${u}`;return{...t,url:S}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const p=n.match(/([a-f0-9-]{36})/i);if(p){const u=p[1];return{...t,url:`${s}/api/images/serve/${u}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${s}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${s}${n}`}:t},L=async()=>{try{const d=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",d);const n=await fetch(d,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const p=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(p,null,2)),p.success&&Array.isArray(p.data)){console.log("🖼️ First image structure:",p.data[0]);const u=p.data.map((S,z)=>{const b=f(S),D=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",k=g=>g&&(/^https?:\/\//i.test(g)?g:`${D}${g}`),e=b&&(b.urls||b.srcSet)||{},i={thumbnail:k(e.thumbnail),small:k(e.small),medium:k(e.medium||b?.url),large:k(e.large),original:k(e.original||b?.url)},c={...b,urls:i,srcSet:i};return z<5&&console.log("🧭 Normalized gallery image",z,c?.url||c,c.urls),c});l(u)}else console.warn("Invalid gallery response format:",p),l([])}else console.warn("Failed to fetch gallery images:",n.status),l([])}catch(t){console.error("❌ Error fetching gallery images:",t),l([])}},A=t=>{if(!t)return[];const s=t.split(/\n\s*\n|\n/).filter(d=>d.trim());return s.map((d,n)=>a.jsx("p",{style:{margin:n===s.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:d.trim()},n))},j=t=>{I(t),t==="Events"?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":t==="About"?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":t==="Contact"&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},M=(t,s)=>{const d=y===t;return{position:"absolute",left:s,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:d?"#000":"transparent",boxShadow:d?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:d?"scale(1)":"scale(0.95)",opacity:d?1:.8}},R=t=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:y===t?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"});if(E)return a.jsx(O,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(o){const t=V.lazy(()=>X(()=>import("./AboutPageMobile-DM546bd4.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return a.jsx(V.Suspense,{fallback:a.jsx(O,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:a.jsx(t,{})})}return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
        `}),a.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:a.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${P.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:a.jsxs("div",{style:{width:"100%",position:"relative"},children:[a.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[a.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),a.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[a.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),a.jsx("div",{style:M("Events","4.21px"),onClick:()=>j("Events"),children:a.jsx("span",{style:R("Events"),children:"Events"})}),a.jsx("div",{style:M("About","100.14px"),onClick:()=>j("About"),children:a.jsx("span",{style:R("About"),children:"About"})}),a.jsx("div",{style:M("Contact","196.07px"),onClick:()=>j("Contact"),children:a.jsx("span",{style:R("Contact"),children:"Contact"})})]})]}),a.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About Us"}),a.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[a.jsx("div",{style:{textAlign:"left"},children:A(T)}),W&&a.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),a.jsxs("div",{style:{marginTop:o?"0px":"24px",marginBottom:"32px"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:o?"24px":"32px",lineHeight:"1.3em",marginBottom:o?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),a.jsx(K,{images:$,columns:{desktop:4,tablet:3,mobile:2},gap:o?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{oe as A,K as M};
