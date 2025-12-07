import{b as s,R as I}from"./vendor-ViNJc2wV.js";import{j as i}from"./index-CH582TGi.js";import{S as z}from"./SocialMediaButtons-Cora4bYO.js";const R=(l=null,S={})=>{const{throttleMs:b=100,threshold:n=50,passive:t=!0}=S,[g,k]=s.useState({scrollY:0,scrollX:0,isScrolled:!1,direction:"none",velocity:0}),a=s.useRef(0),c=s.useRef(0),o=s.useRef(0),e=s.useRef(0),r=s.useRef(null),v=s.useRef(!1),F=s.useCallback(m=>{if(v.current)return;v.current=!0,window.innerWidth<=767?setTimeout(()=>{const d=performance.now(),p=m.target===document?document.documentElement:m.target,f=p.scrollTop||window.pageYOffset||0,x=p.scrollLeft||window.pageXOffset||0,u=f-a.current,w=x-c.current,E=d-o.current;let y="none";Math.abs(u)>Math.abs(w)?y=u>0?"down":u<0?"up":"none":Math.abs(w)>0&&(y=w>0?"right":"left");const O=(E>0?Math.abs(u)/E:0)*.3+e.current*.7;k({scrollY:f,scrollX:x,isScrolled:f>n,direction:y,velocity:O}),a.current=f,c.current=x,o.current=d,e.current=O,setTimeout(()=>{v.current=!1},b)},b):(r.current&&cancelAnimationFrame(r.current),r.current=requestAnimationFrame(()=>{const d=performance.now(),p=m.target===document?document.documentElement:m.target,f=p.scrollTop||window.pageYOffset||0,x=p.scrollLeft||window.pageXOffset||0,u=f-a.current,w=x-c.current,E=d-o.current;let y="none";Math.abs(u)>Math.abs(w)?y=u>0?"down":u<0?"up":"none":Math.abs(w)>0&&(y=w>0?"right":"left");const O=(E>0?Math.abs(u)/E:0)*.3+e.current*.7;k({scrollY:f,scrollX:x,isScrolled:f>n,direction:y,velocity:O}),a.current=f,c.current=x,o.current=d,e.current=O,setTimeout(()=>{v.current=!1},b)}))},[b,n]);return s.useEffect(()=>{const m=l||window,h={passive:t};return requestAnimationFrame(()=>{const d=l?l.scrollTop:window.pageYOffset||0,p=l?l.scrollLeft:window.pageXOffset||0;k({scrollY:d,scrollX:p,isScrolled:d>n,direction:"none",velocity:0}),a.current=d,c.current=p,o.current=performance.now()}),m.addEventListener("scroll",F,h),()=>{m.removeEventListener("scroll",F),r.current&&cancelAnimationFrame(r.current)}},[l,F,n]),g},M=({currentPage:l="events",scrollY:S=0,onNavigate:b=()=>{},onMenuToggle:n=()=>{}})=>{const[t,g]=s.useState(!1),[k,a]=s.useState("100vh");s.useEffect(()=>{const e=()=>{try{const r=window.visualViewport?window.visualViewport.height:window.innerHeight;a(`${r}px`)}catch{a(`${window.innerHeight}px`)}};return e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e),window.visualViewport&&window.visualViewport.addEventListener("resize",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e),window.visualViewport&&window.visualViewport.removeEventListener("resize",e)}},[]);const c=()=>{const e=!t;g(e),n(e)},o=e=>{b(e),g(!1),n(!1)};return s.useEffect(()=>{const e=document.body;if(t){const r=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${r}px`}else{e.classList.remove("drawer-scroll-lock");const r=e.style.top;e.style.top="",r&&window.scrollTo(0,parseInt(r||"0")*-1)}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top=""}},[t]),i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
            /* 🎯 SMOOTH INTERACTIONS: Elegant hover response (25% faster) */
            transition: all 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            padding: clamp(12px, 3vh, 20px) clamp(16px, 6vw, 40px); /* Responsive padding: keep 44px+ targets while fitting shorter viewports */
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

          /* Navigation overlay animations (25% faster) */
          .mobile-nav-overlay {
            transition: opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1);
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

          /* 🚨 SCROLL FIX: Prevent accidental page reloads and pull-to-refresh */
          html, body {
            /* Disable pull-to-refresh on mobile */
            overscroll-behavior-y: contain !important;
            -webkit-overscroll-behavior-y: contain !important;
            /* Prevent bounce scrolling that can trigger refresh */
            -webkit-overflow-scrolling: auto !important;
            /* Disable touch callouts that can interfere */
            -webkit-touch-callout: none !important;
            /* Prevent text selection during scroll */
            -webkit-user-select: none !important;
            user-select: none !important;
          }

          /* 🚨 SCROLL FIX: Optimize mobile content containers */
          .mobile-content-container {
            /* Allow only vertical scrolling */
            touch-action: pan-y !important;
            /* Prevent overscroll bounce */
            overscroll-behavior: contain !important;
            -webkit-overscroll-behavior: contain !important;
            /* Smooth scrolling without interference */
            -webkit-overflow-scrolling: touch !important;
            /* Prevent scroll chaining */
            overscroll-behavior-x: none !important;
            overscroll-behavior-y: contain !important;
          }
        `}),i.jsxs("header",{role:"banner",className:"mobile-navigation-header",style:{position:"fixed",top:"env(safe-area-inset-top, 0px)",left:"0px",right:"0px",width:"100%",maxWidth:"100%",margin:"0",height:"97px",minHeight:"97px",background:"rgba(0, 0, 0, 0.95)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box",transform:"none",transformOrigin:"top center",transition:"none",zIndex:1e3,flexShrink:0,contain:"layout",willChange:"auto",overscrollBehavior:"none",WebkitOverscrollBehavior:"none",touchAction:"none"},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",contain:"layout style",overflow:"visible",flexShrink:0,flexGrow:0},children:[i.jsxs("div",{onClick:c,className:"mobile-menu-button",style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px",transformOrigin:"center center",contain:"layout style",transition:"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:t?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",opacity:t?0:1,transform:t?"scale(0)":"scale(1)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:t?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})]}),i.jsx("a",{href:"/","aria-label":"Home",onClick:e=>{e.preventDefault(),b("/")},style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:1001},children:i.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})})]})," "]}),i.jsxs("div",{className:"mobile-nav-overlay",style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100dvh",minHeight:"100dvh",maxHeight:"100dvh",background:"rgba(0, 0, 0, 0.95)",overflow:"hidden",zIndex:t?1e3:-1,display:"flex",flexDirection:"column",opacity:t?1:0,visibility:t?"visible":"hidden",transition:"opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:t?"blur(10px)":"blur(0px)",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"opacity, visibility, backdrop-filter",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",pointerEvents:t?"auto":"none"},onClick:()=>{g(!1),n(!1)},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",height:"97px",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box"},children:[i.jsxs("div",{onClick:e=>{e.stopPropagation(),g(!1),n(!1)},style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})]}),i.jsx("a",{href:"/","aria-label":"Home",onClick:e=>{e.preventDefault(),e.stopPropagation(),b("/")},style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:1001},children:i.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",padding:"clamp(8px, 2vh, 16px) 8px max(24px, env(safe-area-inset-bottom)) 8px",gap:"clamp(16px, 4vh, 32px)",transform:t?"translate3d(0, 0, 0)":"translate3d(0, -30px, 0)",opacity:1,transition:"transform 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.05s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",flex:"1 0 auto"},onClick:e=>e.stopPropagation(),children:[i.jsx("div",{onClick:()=>o("/"),className:`mobile-nav-item ${l==="events"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.10s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:i.jsx("a",{href:"/","aria-label":"Events",onClick:e=>{e.preventDefault(),o("/")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"Events"})}),i.jsx("div",{onClick:()=>o("/about"),className:`mobile-nav-item ${l==="about"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.15s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:i.jsx("a",{href:"/about","aria-label":"About",onClick:e=>{e.preventDefault(),o("/about")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"About"})}),i.jsx("div",{onClick:()=>o("/faq"),className:`mobile-nav-item ${l==="faq"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.20s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:i.jsx("a",{href:"/faq","aria-label":"FAQ",onClick:e=>{e.preventDefault(),o("/faq")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"FAQ"})}),i.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 25px 0px 25px",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.25s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:e=>e.stopPropagation(),children:i.jsx(z,{})})]})]})]})};function N(){const[l,S]=I.useState(0);return I.useEffect(()=>{const n=()=>{const m=document.querySelector(".mobile-navigation-header");if(m){const h=Math.round(m.getBoundingClientRect().height||0),d=h>0?h:97;S(p=>p!==d?d:p)}else S(h=>h&&h>0?h:97)};n();const t=setTimeout(n,0),g=setTimeout(n,100),k=setTimeout(n,300);let a=null,c=null;const o=document.querySelector(".mobile-navigation-header");o&&"ResizeObserver"in window&&(a=new ResizeObserver(()=>n()),a.observe(o)),o&&"MutationObserver"in window&&(c=new MutationObserver(()=>n()),c.observe(o,{attributes:!0,attributeFilter:["style","class"]})),window.addEventListener("resize",n,{passive:!0});const e=()=>n(),r=()=>n(),v=()=>n(),F=()=>{document.visibilityState==="visible"&&n()};return window.addEventListener("pageshow",e),window.addEventListener("popstate",r),window.addEventListener("hashchange",v),document.addEventListener("visibilitychange",F),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>n()),()=>{clearTimeout(t),clearTimeout(g),clearTimeout(k),window.removeEventListener("resize",n),window.removeEventListener("pageshow",e),window.removeEventListener("popstate",r),window.removeEventListener("hashchange",v),document.removeEventListener("visibilitychange",F),a&&o&&a.disconnect(),c&&c.disconnect()}},[]),l}export{M,R as a,N as u};
