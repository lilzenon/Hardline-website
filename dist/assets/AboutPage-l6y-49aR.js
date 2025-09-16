const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-CU_p3GBu.js","assets/index-MbnmuT1k.js","assets/vendor-ViNJc2wV.js","assets/index-CTSQklRg.css","assets/MobileDrawer-ymJRBjZM.js","assets/SocialMediaButtons-ijr6PHS4.js","assets/usePerformantResize-Fo8ytToz.js"])))=>i.map(i=>d[i]);
import{j as e,B,_ as X}from"./index-MbnmuT1k.js";import{b as a,R as D}from"./vendor-ViNJc2wV.js";import{u as J}from"./usePerformantResize-Fo8ytToz.js";const q=({images:s=[],columns:u={desktop:4,tablet:3,mobile:2},gap:v=16,className:g="",onImageClick:m=null})=>{const[f,k]=a.useState(new Set),[x,w]=a.useState(u.desktop),[I,W]=a.useState(!1),[d,j]=a.useState(null),[S,T]=a.useState(new Map),C=a.useRef(null),E=a.useRef(null),z=a.useRef(null),b=a.useCallback(()=>{const o=window.innerWidth;o<768?w(u.mobile):o<1024?w(u.tablet):w(u.desktop)},[u]);a.useEffect(()=>(E.current=new IntersectionObserver(([o])=>{o.isIntersecting&&(W(!0),E.current?.disconnect())},{threshold:.1}),C.current&&E.current.observe(C.current),()=>E.current?.disconnect()),[]),a.useEffect(()=>(b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)),[b]);const F=a.useCallback(o=>{k(l=>new Set([...l,o])),T(l=>new Map(l.set(o,"loaded")))},[]),A=a.useCallback(o=>{T(l=>new Map(l.set(o,"loading")))},[]),t=a.useCallback((o,l)=>{console.log("🖼️ Image clicked:",o),console.log("🔍 Image properties:",Object.keys(o));const c=o.url||o.src||o.image_url||o.file_url;console.log("🔗 Image URL found:",c),c?(j({...o,url:c,index:l}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",o),m&&m(o)},[m]),r=a.useCallback(()=>{j(null),document.body.style.overflow="unset"},[]);a.useEffect(()=>{const o=l=>{l.key==="Escape"&&d&&r()};if(d)return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[d,r]);const n=a.useCallback(()=>{const o=Array.from({length:x},()=>[]),l=Array(x).fill(0);return s.forEach((c,y)=>{const M=l.indexOf(Math.min(...l));o[M].push({...c,originalIndex:y});const R=300*(c.aspectRatio||c.height/c.width||1.2);l[M]+=R+v}),o},[s,x,v])(),p=`
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
  `;return I?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:p}),e.jsx("div",{ref:C,className:`masonry-gallery ${g}`,style:{display:"flex",gap:`${v}px`,width:"100%",alignItems:"flex-start"},children:n.map((o,l)=>e.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${v}px`},children:o.map(c=>e.jsx(K,{image:c,isLoaded:f.has(c.originalIndex),loadingState:S.get(c.originalIndex),onLoad:()=>F(c.originalIndex),onLoadStart:()=>A(c.originalIndex),onClick:()=>t(c,c.originalIndex)},c.originalIndex))},l))}),d&&e.jsx("div",{ref:z,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"20px",cursor:"pointer"},onClick:r,children:e.jsxs("div",{className:"expanded-image",style:{maxWidth:"90vw",maxHeight:"90vh",position:"relative"},onClick:o=>o.stopPropagation(),children:[e.jsx("img",{src:d.url||d.src||d.image_url||d.file_url,alt:d.alt||d.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:o=>{console.error("❌ Modal image failed to load:",d),o.target.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),e.jsx("button",{onClick:r,style:{position:"absolute",top:"-10px",right:"-10px",width:"40px",height:"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease"},onMouseEnter:o=>{o.target.style.background="rgba(255, 255, 255, 0.2)",o.target.style.transform="scale(1.1)"},onMouseLeave:o=>{o.target.style.background="rgba(0, 0, 0, 0.8)",o.target.style.transform="scale(1)"},children:"×"})]})})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:p}),e.jsx("div",{ref:C,className:`masonry-gallery-placeholder ${g}`,style:{height:"400px",background:"rgba(22, 22, 22, 0.8)",borderRadius:"16px",border:"1px solid rgba(56, 56, 56, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.7)",fontFamily:"Inter, sans-serif",fontSize:"16px"},children:"Loading Gallery..."})]})},K=({image:s,isLoaded:u,loadingState:v,onLoad:g,onLoadStart:m,onClick:f})=>{const[k,x]=a.useState(!1),w=a.useRef(null),I=a.useCallback(()=>{g()},[g]),W=a.useCallback(()=>{m()},[m]),d=a.useCallback(()=>{try{const S=s?.url||s?.src||s?.image_url||s?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:S,image:s})}catch{}x(!0),g()},[g,s]),j=a.useCallback(()=>{f&&f(s)},[f,s]);return e.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"rgba(22, 22, 22, 0.8)",border:"1px solid rgba(56, 56, 56, 0.3)",backdropFilter:"blur(20px)",cursor:f?"pointer":"default",opacity:u?1:.9,animation:u?"fadeInScale 0.5s ease-out":"none"},onClick:j,children:[!u&&!k&&e.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"200px"},children:e.jsx("div",{style:{color:"rgba(255, 255, 255, 0.5)",fontSize:"14px",fontFamily:"Inter, sans-serif"},children:"Loading..."})}),k?e.jsx("div",{style:{width:"100%",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.5)",fontFamily:"Inter, sans-serif",fontSize:"14px",background:"rgba(22, 22, 22, 0.9)"},children:"Image unavailable"}):e.jsx("img",{ref:w,src:s.url||s.src||s.image_url||s.file_url,srcSet:s.srcSet?`
            ${s.srcSet.small} 400w,
            ${s.srcSet.medium} 600w,
            ${s.srcSet.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:s.alt||s.title||"Gallery image",loading:"lazy",onLoadStart:W,onLoad:I,onError:d,style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.3s ease",opacity:u?1:0}}),s.title&&e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:s.title})]})},Q=()=>{const[s,u]=a.useState(!1),[v,g]=a.useState(!0),[m,f]=a.useState("About"),[k,x]=a.useState(""),[w,I]=a.useState(null),[W,d]=a.useState([]),[j,S]=a.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});J(t=>{const{width:r}=t,i=r<=360?16:r<=480?24:32,n=r-i,p=299,o=299,l=498,c=299,y=32,M=1192,R=M-48,O=p+y+l,H=380,$=380,L=40,V=H+L+$,U=Math.max(O,V);let h=Math.min(n/U,R/U);h=Math.min(h,1.8);const _={heroWidth:Math.round(p*h*.9),heroHeight:Math.round(o*h*.9),rightHeroWidth:Math.round(l*h),rightHeroHeight:Math.round(c*h),gap:Math.round(y*h),containerWidth:M,eventsWidth:Math.round(H*h),textUsWidth:Math.round($*h),eventsTextGap:Math.round(L*h),eventCardWidth:220,eventCardHeight:85,scale:h},Y=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Y),P=r<=768||N;u(P),g(!1),S(_),console.log(`🎯 About page responsive scaling: ${h.toFixed(3)} for viewport ${r}px (max 1.8x, container: 1192px)`,_),console.log("📱 About Page Device Detection:",{viewportWidth:r,isMobileByUA:N,finalDecision:P?"MOBILE":"DESKTOP"})}),a.useEffect(()=>{T(),E()},[]);const T=async()=>{try{I(null);const r=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const i=await fetch(`${r}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);const n=await i.json();if(n.success&&n.data)x(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),I(t.message),x(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},C=t=>{const r=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",i=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",n=typeof i=="string"?i:i?.url||"";if(n&&/^https?:\/\//i.test(n))return{...t,url:n};if(n&&n.includes("/api/images/serve/")){const o=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,l=o.startsWith("http")?o:`${r}${o}`;return{...t,url:l}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const p=n.match(/([a-f0-9-]{36})/i);if(p){const o=p[1];return{...t,url:`${r}/api/images/serve/${o}/medium`}}}return t&&t.uuid&&typeof t.uuid=="string"?{...t,url:`${r}/api/images/serve/${t.uuid}/medium`}:n&&n.startsWith("/")?{...t,url:`${r}${n}`}:t},E=async()=>{try{const i=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",i);const n=await fetch(i,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const p=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(p,null,2)),p.success&&Array.isArray(p.data)){console.log("🖼️ First image structure:",p.data[0]);const o=p.data.map((l,c)=>{const y=C(l);return c<5&&console.log("🧭 Normalized gallery image",c,y?.url||y),y});d(o)}else console.warn("Invalid gallery response format:",p),d([])}else console.warn("Failed to fetch gallery images:",n.status),d([])}catch(t){console.error("❌ Error fetching gallery images:",t),d([])}},z=t=>{if(!t)return[];const r=t.split(/\n\s*\n|\n/).filter(i=>i.trim());return r.map((i,n)=>e.jsx("p",{style:{margin:n===r.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:i.trim()},n))},b=t=>{f(t),t==="Events"?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":t==="About"?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":t==="Contact"&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},F=(t,r)=>{const i=m===t;return{position:"absolute",left:r,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:i?"#000":"transparent",boxShadow:i?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:i?"scale(1)":"scale(0.95)",opacity:i?1:.8}},A=t=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:m===t?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"});if(v)return e.jsx(B,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(s){const t=D.lazy(()=>X(()=>import("./AboutPageMobile-CU_p3GBu.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return e.jsx(D.Suspense,{fallback:e.jsx(B,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:e.jsx(t,{})})}return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${j.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.05)",t.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.filter="brightness(1)"}}),e.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[e.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),e.jsx("div",{style:F("Events","4.21px"),onClick:()=>b("Events"),children:e.jsx("span",{style:A("Events"),children:"Events"})}),e.jsx("div",{style:F("About","100.14px"),onClick:()=>b("About"),children:e.jsx("span",{style:A("About"),children:"About"})}),e.jsx("div",{style:F("Contact","196.07px"),onClick:()=>b("Contact"),children:e.jsx("span",{style:A("Contact"),children:"Contact"})})]})]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About Us"}),e.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[e.jsx("div",{style:{textAlign:"left"},children:z(k)}),w&&e.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),e.jsxs("div",{style:{marginTop:s?"0px":"24px",marginBottom:"32px"},children:[e.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:s?"24px":"32px",lineHeight:"1.3em",marginBottom:s?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),e.jsx(q,{images:W,columns:{desktop:4,tablet:3,mobile:2},gap:s?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{oe as A,q as M};
