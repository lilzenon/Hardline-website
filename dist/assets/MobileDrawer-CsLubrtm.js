import{b as t}from"./vendor-ViNJc2wV.js";import{j as n}from"./index-CRd3qiAr.js";import{S as Z}from"./SocialMediaButtons-6su5aTte.js";const J=(m=null,R={})=>{const{throttleMs:x=32,threshold:o=20,passive:C=!0}=R,[L,E]=t.useState({scrollY:0,scrollX:0,isScrolled:!1,direction:"none",velocity:0}),i=t.useRef(0),k=t.useRef(0),F=t.useRef(0),T=t.useRef(0),D=t.useRef(null),I=t.useRef(!1),r=t.useCallback(l=>{if(I.current)return;I.current=!0,window.innerWidth<=767?setTimeout(()=>{const h=performance.now(),c=l.target===document?document.documentElement:l.target,f=c.scrollTop||window.pageYOffset||0,g=c.scrollLeft||window.pageXOffset||0,y=f-i.current,s=g-k.current,p=h-F.current;let d="none";Math.abs(y)>Math.abs(s)?d=y>0?"down":y<0?"up":"none":Math.abs(s)>0&&(d=s>0?"right":"left");const v=(p>0?Math.abs(y)/p:0)*.3+T.current*.7;E({scrollY:f,scrollX:g,isScrolled:f>o,direction:d,velocity:v}),i.current=f,k.current=g,F.current=h,T.current=v,setTimeout(()=>{I.current=!1},x)},x):(D.current&&cancelAnimationFrame(D.current),D.current=requestAnimationFrame(()=>{const h=performance.now(),c=l.target===document?document.documentElement:l.target,f=c.scrollTop||window.pageYOffset||0,g=c.scrollLeft||window.pageXOffset||0,y=f-i.current,s=g-k.current,p=h-F.current;let d="none";Math.abs(y)>Math.abs(s)?d=y>0?"down":y<0?"up":"none":Math.abs(s)>0&&(d=s>0?"right":"left");const v=(p>0?Math.abs(y)/p:0)*.3+T.current*.7;E({scrollY:f,scrollX:g,isScrolled:f>o,direction:d,velocity:v}),i.current=f,k.current=g,F.current=h,T.current=v,setTimeout(()=>{I.current=!1},x)}))},[x,o]);return t.useEffect(()=>{const l=m||window,b={passive:C};return requestAnimationFrame(()=>{const h=m?m.scrollTop:window.pageYOffset||0,c=m?m.scrollLeft:window.pageXOffset||0;E({scrollY:h,scrollX:c,isScrolled:h>o,direction:"none",velocity:0}),i.current=h,k.current=c,F.current=performance.now()}),l.addEventListener("scroll",r,b),()=>{l.removeEventListener("scroll",r),D.current&&cancelAnimationFrame(D.current)}},[m,r,o]),L},Q=({currentPage:m="events",scrollY:R=0,onNavigate:x=()=>{}})=>{const[o,C]=t.useState(!1),L=()=>{C(!o)},E=i=>{x(i),C(!1)};return t.useEffect(()=>{const i=document.body;if(o){const k=window.scrollY;i.classList.add("drawer-scroll-lock"),i.style.top=`-${k}px`}else{i.classList.remove("drawer-scroll-lock");const k=i.style.top;i.style.top="",k&&window.scrollTo(0,parseInt(k||"0")*-1)}return()=>{i.classList.remove("drawer-scroll-lock"),i.style.top=""}},[o]),n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
          /* 🚀 ULTRA-SMOOTH NAVIGATION SCALING: Optimized for 60fps performance */
          .mobile-navigation-header {
            /* Advanced hardware acceleration for smooth transforms */
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            perspective: 1000px;

            /* 🎯 PERFORMANCE: Optimize rendering pipeline for smooth scaling */
            contain: strict; /* Complete isolation for better performance */
            will-change: transform; /* Hint browser for GPU optimization */

            /* 🎯 SMOOTH SCALING: Prevent subpixel rendering issues during scale */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            image-rendering: -webkit-optimize-contrast;

            /* 🎯 JITTER PREVENTION: Stable rendering during transforms */
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
          }

          /* 🎯 PROPORTIONAL LOGO SCALING: Logo scales naturally with container */
          .mobile-navigation-logo {
            /* 🎯 INTERACTION TRANSITIONS: Only for click/hover effects */
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            will-change: auto; /* No individual scaling needed */

            /* 🎯 HARDWARE ACCELERATION: Optimized for container-based scaling */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;

            /* 🎯 ASPECT RATIO PRESERVATION: Maintain proportions during container scaling */
            object-fit: contain; /* Maintain aspect ratio */
            object-position: center; /* Center the logo */

            /* 🎯 CRISP RENDERING: Optimize image quality during container scaling */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            -webkit-image-rendering: -webkit-optimize-contrast;

            /* 🎯 LAYOUT STABILITY: Fixed size - container handles proportional scaling */
            flex-shrink: 0;
            flex-grow: 0;

            /* 🎯 PERFORMANCE: Optimized for container-based scaling */
            contain: layout style;
          }

          /* Removed overly-broad selector that caused inconsistent timings */
          /* div[style*="opacity"][style*="transition"][style*="transitionDelay"] { */
          /*   transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important; */
          /*   transform: translateZ(0); */
          /*   -webkit-transform: translateZ(0); */
          /* } */

          /* 📱 ULTRA-STABLE MOBILE NAVIGATION WITH SCROLL ISOLATION */
          .mobile-navigation-header {
            /* Prevent any layout shifts from navigation changes */
            contain: strict;
            /* Isolate navigation animations from scroll */
            isolation: isolate;
            /* Prevent reflow during scroll state changes */
            will-change: auto;
            /* Optimize for mobile performance */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            /* Prevent any interference with main content scrolling */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Prevent any layout shifts during state changes */
            contain: layout style;
          }

          /* 🎭 ELEGANT MENU ITEMS: Smooth interactions with enhanced glassmorphism */
          .mobile-nav-item {
            position: relative;
            /* 🎯 SMOOTH INTERACTIONS: Elegant hover response */
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            padding: 20px 40px; /* Increased padding for better touch targets */
            border-radius: 24px; /* Larger radius for modern feel */
            margin: 12px 0; /* Increased margin for better spacing */
            /* 🎨 GLASSMORPHISM: Enhanced background for better contrast */
            background: transparent;
            backdrop-filter: blur(0px);
            border: 2px solid transparent;
            /* 🎯 OVERRIDE PROTECTION: Prevent global CSS interference */
            transform: none !important; /* Prevent global transform conflicts */
            animation: none !important; /* Prevent global animation conflicts */
          }

          /* 🎨 ACTIVE STATE: Enhanced glassmorphism for current page */
          .mobile-nav-item.active {
            /* Enhanced glassmorphism effect for active state */
            background: rgba(255, 255, 255, 0.12) !important;
            backdrop-filter: blur(25px) !important;
            border: 2px solid rgba(255, 255, 255, 0.2) !important;
            /* Enhanced glow effect */
            box-shadow:
              0 12px 40px rgba(255, 255, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
            /* Slightly larger for emphasis */
            transform: scale(1.03) !important;
          }

          /* 🎯 HOVER STATE: Smooth interaction for non-active items */
          .mobile-nav-item:not(.active):hover {
            background: rgba(255, 255, 255, 0.06) !important;
            backdrop-filter: blur(15px) !important;
            border: 2px solid rgba(255, 255, 255, 0.12) !important;
            transform: scale(1.02) !important;
            /* Subtle glow on hover */
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.08) !important;
          }

          /* 🔧 FIXED: Consistent menu button hover state - maintain position */
          .mobile-menu-button:hover {
            opacity: 0.8;
            /* Keep same translateY to prevent position drift */
            transform: translateY(-50%) scale(1.05);
            transition: all 0.2s ease;
          }

          /* Active/pressed state for menu button */
          .mobile-menu-button:active {
            /* Maintain exact same position during press */
            transform: translateY(-50%) scale(0.95);
            opacity: 0.7;
          }

          /* 🔧 FIXED: Menu button animation states - prevent position drift */
          .mobile-menu-button {
            transition: transform 0.2s ease;
            /* Prevent any layout shifts during state changes */
            contain: layout style;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-nav-overlay.entering {
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(0px);
          }

          .mobile-nav-overlay.entered {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
          }

          /* Enable hardware acceleration */
          .mobile-drawer, .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          /* ENHANCED: Body scroll lock when drawer is active */
          body.drawer-scroll-lock {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            /* iOS Safari specific scroll lock */
            -webkit-overflow-scrolling: none !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }
        `}),n.jsxs("header",{role:"banner",className:"mobile-navigation-header",onTouchMove:i=>{i.stopPropagation()},onWheel:i=>{i.stopPropagation()},style:{position:"sticky",top:"0px",width:"100%",maxWidth:"100%",margin:"0",height:"97px",minHeight:"97px",background:"rgba(0, 0, 0, 0.95)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box",transform:"none",transformOrigin:"top center",transition:"background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:200,flexShrink:0,contain:"layout style",willChange:"auto",backfaceVisibility:"visible",WebkitBackfaceVisibility:"visible",imageRendering:"-webkit-optimize-contrast",WebkitImageRendering:"-webkit-optimize-contrast"},children:[n.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",contain:"layout style",overflow:"visible",flexShrink:0,flexGrow:0},children:[n.jsxs("div",{onClick:L,className:"mobile-menu-button",style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px",transformOrigin:"center center",contain:"layout style",transition:"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"},children:[n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:o?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",opacity:o?0:1,transform:o?"scale(0)":"scale(1)"}}),n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:o?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})]}),n.jsx("img",{onClick:()=>x("/"),src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",userSelect:"none",zIndex:1001,willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]})," "]}),n.jsxs("div",{className:"mobile-nav-overlay",style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",background:"rgba(0, 0, 0, 0.95)",zIndex:o?1e3:-1,display:"flex",flexDirection:"column",opacity:o?1:0,visibility:o?"visible":"hidden",transition:"opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.28s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:o?"blur(10px)":"blur(0px)",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"opacity, visibility, backdrop-filter",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",pointerEvents:o?"auto":"none"},onClick:()=>C(!1),children:[n.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",height:"97px",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box"},children:[n.jsxs("div",{onClick:i=>{i.stopPropagation(),C(!1)},style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"},children:[n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),n.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})]}),n.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transform:"none",transition:"none",flexShrink:0,flexGrow:0},onClick:i=>{i.stopPropagation(),x("/")},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",padding:"8px 8px 40px 8px",gap:"32px",transform:o?"translate3d(0, 0, 0)":"translate3d(0, -30px, 0)",opacity:1,transition:"transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:o?"0.05s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:i=>i.stopPropagation(),children:[n.jsx("div",{onClick:()=>E("/"),className:`mobile-nav-item ${m==="events"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:o?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:o?1:0,transition:"all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:o?"0.10s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"Events"}),n.jsx("div",{onClick:()=>E("/about"),className:`mobile-nav-item ${m==="about"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:o?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:o?1:0,transition:"all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:o?"0.15s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"About"}),n.jsx("div",{onClick:()=>E("/contact"),className:`mobile-nav-item ${m==="contact"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:o?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:o?1:0,transition:"all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:o?"0.20s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"Contact"}),n.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 25px 0px 25px",transform:o?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:o?1:0,transition:"all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:o?"0.25s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:i=>i.stopPropagation(),children:n.jsx(Z,{})})]})]})]})},G=t.memo(({dropId:m,color:R="ff0409",theme:x="dark",background:o="solid",minimal:C=!0,style:L={}})=>{const[E,i]=t.useState(!1),[k,F]=t.useState(!1),[T,D]=t.useState(!1),[I,r]=t.useState(0),l=t.useRef(null),b=t.useRef(null),h=2,c=2e3,f=t.useMemo(()=>`https://embed.laylo.com/?${new URLSearchParams({dropId:m,color:R,theme:x,background:o,...C&&{minimal:"true"}}).toString()}`,[m,R,x,o,C]),g=t.useCallback(()=>document.querySelector('script[src*="laylo-sdk.js"]')?(console.log("✅ Laylo SDK script found, proceeding with iframe"),!0):typeof window<"u"&&window.Laylo?(console.log("✅ Laylo global object found, proceeding with iframe"),!0):!1,[]),y=t.useCallback(()=>{if(!l.current)return!1;try{const d=l.current.contentDocument||l.current.contentWindow?.document;if(d&&d.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form').length>0)return console.log("✅ Laylo content detected in iframe"),!0}catch{console.log("🔒 CORS restriction (expected), checking iframe dimensions...")}const p=l.current.getBoundingClientRect();return p.height>50&&p.width>100?(console.log("✅ Iframe has content-like dimensions, assuming loaded"),!0):!1},[]);t.useEffect(()=>{if(!m){console.warn("⚠️ LayloIframe: No dropId provided");return}if(console.log("🚀 LayloIframe: Initializing with dropId:",m),g())i(!0);else{const p=setTimeout(()=>{console.log("⏰ Laylo SDK timeout, proceeding anyway..."),i(!0)},1e3);return()=>clearTimeout(p)}},[m,g]);const s=t.useCallback(()=>{if(console.log("📡 Iframe load event fired"),F(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(Y){console.warn("⚠️ Laylo SDK init failed:",Y)}b.current&&clearInterval(b.current);let p=0;const d=10;b.current=setInterval(()=>{p++,y()?(D(!0),clearInterval(b.current),console.log("✅ Laylo content confirmed loaded")):p>=d&&(console.log("⏰ Content check timeout, assuming loaded"),D(!0),clearInterval(b.current))},200),setTimeout(()=>{b.current&&(clearInterval(b.current),T||(console.log("⏰ Final timeout, assuming content loaded"),D(!0)))},c)},[y,T]);return t.useEffect(()=>()=>{b.current&&clearInterval(b.current)},[]),t.useCallback(()=>{I<h&&(console.log(`🔄 Retrying Laylo iframe (attempt ${I+1}/${h})`),r(p=>p+1),F(!1),D(!1),l.current&&(l.current.src=l.current.src))},[I,h]),E?n.jsx("iframe",{ref:l,id:`laylo-drop-${m}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:s,allow:"web-share",style:{...L,opacity:T?1:.8,transition:"opacity 0.15s ease-out",minHeight:"60px"},src:f}):n.jsx("div",{style:{...L,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:n.jsx("span",{style:{color:"#666",fontSize:"14px"},children:"Loading..."})})}),_=({contentRef:m,viewportContext:R={isRealMobileDevice:!1},onStateChange:x=()=>{}})=>{const[o,C]=t.useState("");t.useState(!1);const[L,E]=t.useState(!1);t.useState("us"),t.useState("normal");const[i,k]=t.useState(!1),[F,T]=t.useState("");t.useState(""),t.useState(!1);const[D,I]=t.useState("normal"),[r,l]=t.useState(!1),[b,h]=t.useState(!1),[c,f]=t.useState(!1),[g,y]=t.useState(!1);t.useState(!1),t.useState(0),t.useState(!1);const[s,p]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1}),[d,Y]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const v=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{f(!1),l(!1)},500);return()=>clearTimeout(e)},[]),t.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=a=>{console.warn("⚠️ Laylo SDK failed to load in MobileDrawer:",a)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in MobileDrawer")},document.head.appendChild(e)}},[]),t.useEffect(()=>{const e=document.body,a=m?.current;if(r){const u=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${u}px`,a&&a.classList.add("drawer-active")}else{const u=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",u&&window.scrollTo(0,parseInt(u||"0")*-1),a&&a.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",a&&a.classList.remove("drawer-active")}},[r,m]);const V=t.useCallback(()=>{Y({expanded:r,showDisclaimer:b,showVerification:i,verificationCode:F,phoneNumber:o}),console.log("💾 Drawer state saved, iframe content preserved")},[r,b,i,F,o]),M=t.useCallback(e=>{v.current&&!v.current.contains(e.target)&&(V(),l(!1),i?f(!1):(f(!1),h(!1)))},[o,i,V]);t.useEffect(()=>(r&&(document.addEventListener("mousedown",M),document.addEventListener("touchstart",M)),()=>{document.removeEventListener("mousedown",M),document.removeEventListener("touchstart",M)}),[r,M]),t.useEffect(()=>{const e=document.body,a=m?.current;if(r){const u=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${u}px`,a&&a.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const u=e.style.top;e.style.top="",u&&window.scrollTo(0,parseInt(u||"0")*-1),a&&a.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",a&&a.classList.remove("drawer-active")}},[r,m]),t.useEffect(()=>{x({drawerExpanded:r,drawerFullyClosed:c,showVerification:i,iframeExpanded:g,phoneSubmitted:L})},[r,c,i,g,L,x]);const j=t.useCallback(()=>c?"50px":g?"320px":i&&r?"240px":i&&!r?"60px":r?"280px":"80px",[c,i,r,b,g]);t.useCallback(()=>{const e=j(),a=(()=>{const S="ontouchstart"in window||navigator.maxTouchPoints>0,w=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),O=window.innerWidth,N=window.innerHeight,A=O/N;return S&&w&&(A<1.5||O<768)})(),u=parseInt(e.replace("px",""));if(a)return`calc(${e} + 20px)`;{const S=Math.max(15,u*.2);return`calc(${e} + ${S}px)`}},[j,R]);const H=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const a=e.touches[0],u=Date.now(),S=e.target.closest(".mobile-drawer-content"),w=v.current?.getBoundingClientRect(),O=w&&a.clientY>w.top&&a.clientY<w.top+50;p({isActive:!0,startY:a.clientY,currentY:a.clientY,startTime:u,isDragging:!1,initialDrawerState:r,isOnDrawerContent:!!S,isOnDrawerHandle:!!O}),O&&!S&&(e.preventDefault(),e.stopPropagation())},[r]),W=t.useCallback(e=>{if(!s.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const a=e.touches[0],u=s.startY-a.clientY,S=Math.abs(u);!s.isDragging&&S>5&&s.isOnDrawerHandle&&!s.isOnDrawerContent&&(p(w=>({...w,isDragging:!0})),e.preventDefault(),e.stopPropagation()),s.isDragging&&s.isOnDrawerHandle&&!s.isOnDrawerContent?(e.preventDefault(),e.stopPropagation(),p(w=>({...w,currentY:a.clientY}))):s.isOnDrawerContent||p(w=>({...w,currentY:a.clientY}))},[s]),B=t.useCallback(e=>{if(!s.isActive)return;const a=s.startY-s.currentY,u=Math.abs(a),S=Date.now()-s.startTime,w=u/S,O=15,N=.2,A=8;let z=!1;if(s.isDragging)(w>N||u>O||u>A)&&(z=!0),z&&(w>N?(v.current?.classList.add("momentum-fast"),setTimeout(()=>{v.current?.classList.remove("momentum-fast")},100)):(v.current?.classList.add("momentum-slow"),setTimeout(()=>{v.current?.classList.remove("momentum-slow")},250)),a>0?r||(l(!0),f(!1),console.log("🔄 Drawer opened via swipe up")):r&&(l(!1),console.log("🔄 Drawer closed via swipe down")));else{const P=v.current?.getBoundingClientRect();P&&s.startY>P.top&&s.startY<P.top+50&&(c?(f(!1),l(!0),console.log("🔄 Drawer opened via tap")):r?(l(!1),console.log("🔄 Drawer collapsed via tap")):(l(!0),console.log("🔄 Drawer expanded via tap")))}p({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1})},[s,r,c]),X=t.useCallback(()=>{c?(f(!1),l(d.expanded||!0),h(d.showDisclaimer),k(d.showVerification),d.verificationCode&&(T(d.verificationCode),d.verificationCode.length===4&&I("filled")),d.phoneNumber&&C(d.phoneNumber)):r||(l(!0),d.showDisclaimer&&!i&&h(!0))},[c,r,d,i]),$=t.useCallback(e=>{e.stopPropagation(),c&&f(!1),l(!0),y(!0),setTimeout(()=>{y(!1)},1e4)},[c]);return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
          /* Enhanced drawer animations with momentum support */
          .mobile-drawer {
            position: fixed !important;
            bottom: 0 !important;
            left: 25px !important;
            right: 25px !important;
            margin: 0 auto !important;
            width: calc(100% - 50px) !important;
            max-width: 390px !important;
            background: rgb(21 21 21 / 80%) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 24px 24px 0px 0px !important;
            /* 🚀 ENHANCED: Mirrored opening/closing animation with consistent timing */
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            transform-origin: bottom center !important;
            /* 🚨 CRITICAL: Highest z-index to ensure drawer stays above all content */
            z-index: 9999 !important;
            will-change: auto !important;
            backface-visibility: hidden !important;
            perspective: 1000px !important;
            /* 🚨 CRITICAL: Ensure drawer maintains fixed position on mobile */
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            /* ENHANCED: Complete scroll isolation for iOS Safari */
            touch-action: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            /* 🚀 ENHANCED: Complete scroll isolation and improved touch handling for iOS Safari */
            touch-action: pan-y; /* Allow vertical panning for better swipe detection */
            -webkit-touch-callout: none; /* Disable iOS callout menu */
            -webkit-user-select: none; /* Disable text selection */
            user-select: none;
            user-select: none;
            -webkit-user-select: none;
            /* Complete containment isolation */
            contain: strict;
            /* Prevent scroll chaining */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
          }

          /* Fast momentum animation for flick gestures - scroll optimized */
          .mobile-drawer.momentum-fast {
            transition: transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: strict; /* Strict containment during fast animations */
          }

          /* Slow momentum animation for gentle swipes - scroll optimized */
          .mobile-drawer.momentum-slow {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: layout style; /* Layout containment for smooth animations */
          }

          /* ENHANCED: Complete drawer scroll isolation with hidden scrollbars */
          .mobile-drawer-content {
            /* Complete scroll isolation from main page */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* iOS Safari specific scroll containment */
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            /* Prevent scroll chaining to parent */
            touch-action: pan-y;
            /* Optimize for mobile scrolling */
            scroll-behavior: auto;
            /* Hardware acceleration */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }

          /* FIXED: Hide WebKit scrollbars */
          .mobile-drawer-content::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }

          /* ENHANCED: Body scroll lock when drawer is active */
          body.drawer-scroll-lock {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            /* iOS Safari specific scroll lock */
            -webkit-overflow-scrolling: none !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            /* Add subtle visual feedback for disclaimer state */
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* 🚨 CRITICAL: Proper body scroll lock for mobile drawer positioning */
          body.drawer-scroll-lock {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            overflow: hidden !important;
            width: 100% !important;
            height: 100% !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
            /* Prevent iOS Safari address bar issues */
            -webkit-overflow-scrolling: auto !important;
          }

          /* Prevent main content scroll when drawer is expanded */
          .mobile-content-container.drawer-active {
            overflow: hidden !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* Responsive adjustments for smaller screens */
          @media (max-width: 375px) {
            .mobile-drawer {
              left: 15px !important;
              right: 15px !important;
              width: calc(100% - 30px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }
        `}),n.jsxs("div",{ref:v,className:`mobile-drawer ${r?"expanded":"collapsed"} ${b?"disclaimer-peek":""}`,onTouchStart:H,onTouchMove:W,onTouchEnd:B,onWheel:e=>{e.stopPropagation(),e.preventDefault()},style:{height:j(),transform:c?"translate3d(0, 100%, 0)":r?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:X,role:"dialog","aria-label":"Contact form drawer","aria-expanded":r,children:[n.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px",margin:"8px auto 16px",cursor:"pointer"},"aria-hidden":"true"}),n.jsxs("div",{className:`drawer-content mobile-drawer-content ${i?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const a=e.currentTarget,{scrollTop:u,scrollHeight:S,clientHeight:w}=a;e.stopPropagation();const O=u===0,N=u+w>=S,A=e.touches[0],z=A.clientY-(A.pageY||A.clientY);(O&&z>0||N&&z<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:c?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!c&&!i&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),!c&&!i&&n.jsx("div",{onClick:$,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0},children:n.jsx(G,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,style:{width:"100%",height:g?"200px":"160px",border:"none",borderRadius:"8px",background:"transparent",display:"block",transition:"opacity 0.3s ease, height 0.3s ease",pointerEvents:"auto"}})}),(c||i)&&console.log("🚫 Laylo iframe hidden:",{drawerFullyClosed:c,showVerification:i})]})]})]})};export{Q as M,_ as a,J as u};
