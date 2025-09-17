import{b as n}from"./vendor-ViNJc2wV.js";import{j as i}from"./index-C9HypaqQ.js";import{S as z}from"./SocialMediaButtons-DamZCPI4.js";const A=(o=null,O={})=>{const{throttleMs:p=32,threshold:r=20,passive:e=!0}=O,[h,x]=n.useState({scrollY:0,scrollX:0,isScrolled:!1,direction:"none",velocity:0}),s=n.useRef(0),t=n.useRef(0),a=n.useRef(0),k=n.useRef(0),y=n.useRef(null),F=n.useRef(!1),S=n.useCallback(m=>{if(F.current)return;F.current=!0,window.innerWidth<=767?setTimeout(()=>{const l=performance.now(),b=m.target===document?document.documentElement:m.target,c=b.scrollTop||window.pageYOffset||0,f=b.scrollLeft||window.pageXOffset||0,d=c-s.current,g=f-t.current,v=l-a.current;let u="none";Math.abs(d)>Math.abs(g)?u=d>0?"down":d<0?"up":"none":Math.abs(g)>0&&(u=g>0?"right":"left");const w=(v>0?Math.abs(d)/v:0)*.3+k.current*.7;x({scrollY:c,scrollX:f,isScrolled:c>r,direction:u,velocity:w}),s.current=c,t.current=f,a.current=l,k.current=w,setTimeout(()=>{F.current=!1},p)},p):(y.current&&cancelAnimationFrame(y.current),y.current=requestAnimationFrame(()=>{const l=performance.now(),b=m.target===document?document.documentElement:m.target,c=b.scrollTop||window.pageYOffset||0,f=b.scrollLeft||window.pageXOffset||0,d=c-s.current,g=f-t.current,v=l-a.current;let u="none";Math.abs(d)>Math.abs(g)?u=d>0?"down":d<0?"up":"none":Math.abs(g)>0&&(u=g>0?"right":"left");const w=(v>0?Math.abs(d)/v:0)*.3+k.current*.7;x({scrollY:c,scrollX:f,isScrolled:c>r,direction:u,velocity:w}),s.current=c,t.current=f,a.current=l,k.current=w,setTimeout(()=>{F.current=!1},p)}))},[p,r]);return n.useEffect(()=>{const m=o||window,I={passive:e};return requestAnimationFrame(()=>{const l=o?o.scrollTop:window.pageYOffset||0,b=o?o.scrollLeft:window.pageXOffset||0;x({scrollY:l,scrollX:b,isScrolled:l>r,direction:"none",velocity:0}),s.current=l,t.current=b,a.current=performance.now()}),m.addEventListener("scroll",S,I),()=>{m.removeEventListener("scroll",S),y.current&&cancelAnimationFrame(y.current)}},[o,S,r]),h},M=({currentPage:o="events",scrollY:O=0,onNavigate:p=()=>{},onMenuToggle:r=()=>{}})=>{const[e,h]=n.useState(!1),x=()=>{const t=!e;h(t),r(t)},s=t=>{p(t),h(!1),r(!1)};return n.useEffect(()=>{const t=document.body;if(e){const a=window.scrollY;t.classList.add("drawer-scroll-lock"),t.style.top=`-${a}px`}else{t.classList.remove("drawer-scroll-lock");const a=t.style.top;t.style.top="",a&&window.scrollTo(0,parseInt(a||"0")*-1)}return()=>{t.classList.remove("drawer-scroll-lock"),t.style.top=""}},[e]),i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
        `}),i.jsxs("header",{role:"banner",className:"mobile-navigation-header",onTouchMove:t=>{t.stopPropagation()},onWheel:t=>{t.stopPropagation()},style:{position:"sticky",top:"0px",width:"100%",maxWidth:"100%",margin:"0",height:"97px",minHeight:"97px",background:"rgba(0, 0, 0, 0.95)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box",transform:"none",transformOrigin:"top center",transition:"background-color 0.225s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.225s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:200,flexShrink:0,contain:"layout style",willChange:"auto",backfaceVisibility:"visible",WebkitBackfaceVisibility:"visible",imageRendering:"-webkit-optimize-contrast",WebkitImageRendering:"-webkit-optimize-contrast"},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",contain:"layout style",overflow:"visible",flexShrink:0,flexGrow:0},children:[i.jsxs("div",{onClick:x,className:"mobile-menu-button",style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px",transformOrigin:"center center",contain:"layout style",transition:"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:e?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",opacity:e?0:1,transform:e?"scale(0)":"scale(1)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:e?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})]}),i.jsx("img",{onClick:()=>p("/"),src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",userSelect:"none",zIndex:1001,willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]})," "]}),i.jsxs("div",{className:"mobile-nav-overlay",style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",background:"rgba(0, 0, 0, 0.95)",zIndex:e?1e3:-1,display:"flex",flexDirection:"column",opacity:e?1:0,visibility:e?"visible":"hidden",transition:"opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:e?"blur(10px)":"blur(0px)",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"opacity, visibility, backdrop-filter",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",pointerEvents:e?"auto":"none"},onClick:()=>{h(!1),r(!1)},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",height:"97px",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box"},children:[i.jsxs("div",{onClick:t=>{t.stopPropagation(),h(!1),r(!1)},style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})]}),i.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",style:{width:"160px",height:"50px",cursor:"pointer",userSelect:"none",transform:"none",transition:"none",flexShrink:0,flexGrow:0},onClick:t=>{t.stopPropagation(),p("/")},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",padding:"8px 8px 40px 8px",gap:"32px",transform:e?"translate3d(0, 0, 0)":"translate3d(0, -30px, 0)",opacity:1,transition:"transform 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.05s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:t=>t.stopPropagation(),children:[i.jsx("div",{onClick:()=>s("/"),className:`mobile-nav-item ${o==="events"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:e?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:e?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.10s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"Events"}),i.jsx("div",{onClick:()=>s("/about"),className:`mobile-nav-item ${o==="about"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:e?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:e?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.15s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"About"}),i.jsx("div",{onClick:()=>s("/contact"),className:`mobile-nav-item ${o==="contact"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:e?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:e?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.20s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"Contact"}),i.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 25px 0px 25px",transform:e?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:e?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.25s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:t=>t.stopPropagation(),children:i.jsx(z,{})})]})]})]})};export{M,A as u};
