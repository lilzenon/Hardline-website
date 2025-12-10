import{j as t}from"./index-C-D_Vl_e.js";import{b as l}from"./vendor-ViNJc2wV.js";import{S as b}from"./SocialMediaButtons-BIVve89e.js";const x=({currentPage:o="events",scrollY:m=0,onNavigate:c=()=>{},onMenuToggle:r=()=>{}})=>{const[i,s]=l.useState(!1),[h,p]=l.useState("100vh");l.useEffect(()=>{const e=()=>{try{const a=window.visualViewport?window.visualViewport.height:window.innerHeight;p(`${a}px`)}catch{p(`${window.innerHeight}px`)}};return e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e),window.visualViewport&&window.visualViewport.addEventListener("resize",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e),window.visualViewport&&window.visualViewport.removeEventListener("resize",e)}},[]);const d=()=>{const e=!i;s(e),r(e)},n=e=>{c(e),s(!1),r(!1)};return l.useEffect(()=>{const e=document.body;if(i){const a=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${a}px`}else{e.classList.remove("drawer-scroll-lock");const a=e.style.top;e.style.top="",a&&window.scrollTo(0,parseInt(a||"0")*-1)}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top=""}},[i]),t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
        `}),t.jsxs("header",{role:"banner",className:"mobile-navigation-header",style:{position:"fixed",top:"env(safe-area-inset-top, 0px)",left:"0px",right:"0px",width:"100%",maxWidth:"100%",margin:"0",height:"97px",minHeight:"97px",background:"transparent",backdropFilter:"none",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box",transform:"none",transformOrigin:"top center",transition:"none",zIndex:1e3,flexShrink:0,contain:"layout",willChange:"auto",overscrollBehavior:"none",WebkitOverscrollBehavior:"none",touchAction:"none"},children:[t.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",contain:"layout style",overflow:"visible",flexShrink:0,flexGrow:0},children:[t.jsxs("div",{onClick:d,className:"mobile-menu-button",style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px",transformOrigin:"center center",contain:"layout style",transition:"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"},children:[t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:i?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",opacity:i?0:1,transform:i?"scale(0)":"scale(1)"}}),t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:i?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})]}),t.jsx("a",{href:"/","aria-label":"Home",onClick:e=>{e.preventDefault(),c("/")},style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:1001},children:t.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})})]})," "]}),t.jsxs("div",{className:"mobile-nav-overlay",style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100dvh",minHeight:"100dvh",maxHeight:"100dvh",background:"rgba(0, 0, 0, 0.95)",overflow:"hidden",zIndex:i?1e3:-1,display:"flex",flexDirection:"column",opacity:i?1:0,visibility:i?"visible":"hidden",transition:"opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:i?"blur(10px)":"blur(0px)",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"opacity, visibility, backdrop-filter",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",pointerEvents:i?"auto":"none"},onClick:()=>{s(!1),r(!1)},children:[t.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",height:"97px",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box"},children:[t.jsxs("div",{onClick:e=>{e.stopPropagation(),s(!1),r(!1)},style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"},children:[t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),t.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})]}),t.jsx("a",{href:"/","aria-label":"Home",onClick:e=>{e.preventDefault(),e.stopPropagation(),c("/")},style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:1001},children:t.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",padding:"clamp(8px, 2vh, 16px) 8px max(24px, env(safe-area-inset-bottom)) 8px",gap:"clamp(16px, 4vh, 32px)",transform:i?"translate3d(0, 0, 0)":"translate3d(0, -30px, 0)",opacity:1,transition:"transform 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.05s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",flex:"1 0 auto"},onClick:e=>e.stopPropagation(),children:[t.jsx("div",{onClick:()=>n("/"),className:`mobile-nav-item ${o==="events"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:i?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:i?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.10s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:t.jsx("a",{href:"/","aria-label":"Events",onClick:e=>{e.preventDefault(),n("/")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"Events"})}),t.jsx("div",{onClick:()=>n("/about"),className:`mobile-nav-item ${o==="about"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:i?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:i?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.15s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:t.jsx("a",{href:"/about","aria-label":"About",onClick:e=>{e.preventDefault(),n("/about")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"About"})}),t.jsx("div",{onClick:()=>n("/faq"),className:`mobile-nav-item ${o==="faq"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:i?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:i?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.20s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:t.jsx("a",{href:"/faq","aria-label":"FAQ",onClick:e=>{e.preventDefault(),n("/faq")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"FAQ"})}),t.jsx("div",{onClick:()=>n("/shop"),className:`mobile-nav-item ${o==="shop"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"clamp(28px, 7.5vh, 64px)",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:i?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:i?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.25s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:t.jsx("a",{href:"/shop","aria-label":"Shop",onClick:e=>{e.preventDefault(),n("/shop")},style:{display:"block",width:"100%",height:"100%",color:"inherit",textDecoration:"none"},children:"Shop"})}),t.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"24px",padding:"0px 25px 0px 25px",transform:i?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:i?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:i?"0.30s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:e=>e.stopPropagation(),children:t.jsx(b,{iconOnly:!0})})]})]})]})};export{x as M};
