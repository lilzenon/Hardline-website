import{b as c,R as E}from"./vendor-ViNJc2wV.js";import{j as i}from"./index-4vrwPzcB.js";import{S as R}from"./SocialMediaButtons-DmAWbzNM.js";const M=(r=null,k={})=>{const{throttleMs:n=100,threshold:a=50,passive:t=!0}=k,[l,d]=c.useState({scrollY:0,scrollX:0,isScrolled:!1,direction:"none",velocity:0}),s=c.useRef(0),e=c.useRef(0),o=c.useRef(0),F=c.useRef(0),x=c.useRef(null),S=c.useRef(!1),O=c.useCallback(u=>{if(S.current)return;S.current=!0,window.innerWidth<=767?setTimeout(()=>{const p=performance.now(),f=u.target===document?document.documentElement:u.target,m=f.scrollTop||window.pageYOffset||0,h=f.scrollLeft||window.pageXOffset||0,b=m-s.current,g=h-e.current,y=p-o.current;let v="none";Math.abs(b)>Math.abs(g)?v=b>0?"down":b<0?"up":"none":Math.abs(g)>0&&(v=g>0?"right":"left");const w=(y>0?Math.abs(b)/y:0)*.3+F.current*.7;d({scrollY:m,scrollX:h,isScrolled:m>a,direction:v,velocity:w}),s.current=m,e.current=h,o.current=p,F.current=w,setTimeout(()=>{S.current=!1},n)},n):(x.current&&cancelAnimationFrame(x.current),x.current=requestAnimationFrame(()=>{const p=performance.now(),f=u.target===document?document.documentElement:u.target,m=f.scrollTop||window.pageYOffset||0,h=f.scrollLeft||window.pageXOffset||0,b=m-s.current,g=h-e.current,y=p-o.current;let v="none";Math.abs(b)>Math.abs(g)?v=b>0?"down":b<0?"up":"none":Math.abs(g)>0&&(v=g>0?"right":"left");const w=(y>0?Math.abs(b)/y:0)*.3+F.current*.7;d({scrollY:m,scrollX:h,isScrolled:m>a,direction:v,velocity:w}),s.current=m,e.current=h,o.current=p,F.current=w,setTimeout(()=>{S.current=!1},n)}))},[n,a]);return c.useEffect(()=>{const u=r||window,I={passive:t};return requestAnimationFrame(()=>{const p=r?r.scrollTop:window.pageYOffset||0,f=r?r.scrollLeft:window.pageXOffset||0;d({scrollY:p,scrollX:f,isScrolled:p>a,direction:"none",velocity:0}),s.current=p,e.current=f,o.current=performance.now()}),u.addEventListener("scroll",O,I),()=>{u.removeEventListener("scroll",O),x.current&&cancelAnimationFrame(x.current)}},[r,O,a]),l},N=({currentPage:r="events",scrollY:k=0,onNavigate:n=()=>{},onMenuToggle:a=()=>{}})=>{const[t,l]=c.useState(!1),d=()=>{const e=!t;l(e),a(e)},s=e=>{n(e),l(!1),a(!1)};return c.useEffect(()=>{const e=document.body;if(t){const o=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${o}px`}else{e.classList.remove("drawer-scroll-lock");const o=e.style.top;e.style.top="",o&&window.scrollTo(0,parseInt(o||"0")*-1)}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top=""}},[t]),i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
        `}),i.jsxs("header",{role:"banner",className:"mobile-navigation-header",style:{position:"fixed",top:"0px",left:"0px",right:"0px",width:"100%",maxWidth:"100%",margin:"0",height:"97px",minHeight:"97px",background:"rgba(0, 0, 0, 0.95)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box",transform:"none",transformOrigin:"top center",transition:"none",zIndex:1e3,flexShrink:0,contain:"layout",willChange:"auto",overscrollBehavior:"none",WebkitOverscrollBehavior:"none",touchAction:"none"},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",position:"relative",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",contain:"layout style",overflow:"visible",flexShrink:0,flexGrow:0},children:[i.jsxs("div",{onClick:d,className:"mobile-menu-button",style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px",transformOrigin:"center center",contain:"layout style",transition:"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:t?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",opacity:t?0:1,transform:t?"scale(0)":"scale(1)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",transform:t?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})]}),i.jsx("img",{onClick:()=>n("/"),src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",userSelect:"none",zIndex:1001,transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]})," "]}),i.jsxs("div",{className:"mobile-nav-overlay",style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",background:"rgba(0, 0, 0, 0.95)",zIndex:t?1e3:-1,display:"flex",flexDirection:"column",opacity:t?1:0,visibility:t?"visible":"hidden",transition:"opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:t?"blur(10px)":"blur(0px)",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"opacity, visibility, backdrop-filter",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",pointerEvents:t?"auto":"none"},onClick:()=>{l(!1),a(!1)},children:[i.jsxs("div",{style:{width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",height:"97px",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0",boxSizing:"border-box"},children:[i.jsxs("div",{onClick:e=>{e.stopPropagation(),l(!1),a(!1)},style:{position:"absolute",right:"0px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:1002,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"},children:[i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),i.jsx("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.225s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})]}),i.jsx("img",{src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",className:"mobile-navigation-logo",style:{width:"160px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",userSelect:"none",zIndex:1001,transition:"none !important",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:e=>{e.stopPropagation(),n("/")},onMouseDown:void 0,onMouseUp:void 0,onMouseLeave:void 0})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"min(360px, calc(100vw - 16px))",maxWidth:"360px",margin:"0 auto",padding:"8px 8px 40px 8px",gap:"32px",transform:t?"translate3d(0, 0, 0)":"translate3d(0, -30px, 0)",opacity:1,transition:"transform 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.05s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:e=>e.stopPropagation(),children:[i.jsx("div",{onClick:()=>s("/"),className:`mobile-nav-item ${r==="events"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.10s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"Events"}),i.jsx("div",{onClick:()=>s("/about"),className:`mobile-nav-item ${r==="about"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.15s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"About"}),i.jsx("div",{onClick:()=>s("/faq"),className:`mobile-nav-item ${r==="faq"?"active":""}`,style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.20s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},children:"FAQ"}),i.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 25px 0px 25px",transform:t?"translate3d(0, 0, 0)":"translate3d(0, 40px, 0)",opacity:t?1:0,transition:"all 0.21s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:t?"0.25s":"0s",willChange:"transform, opacity",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:e=>e.stopPropagation(),children:i.jsx(R,{})})]})]})]})};function L(){const[r,k]=E.useState(0);return E.useEffect(()=>{const n=()=>{const s=document.querySelector(".mobile-navigation-header");if(s){const e=Math.round(s.getBoundingClientRect().height||0);k(o=>o!==e?e:o)}};n();const a=setTimeout(n,0),t=setTimeout(n,100);let l=null;const d=document.querySelector(".mobile-navigation-header");return d&&"ResizeObserver"in window&&(l=new ResizeObserver(()=>n()),l.observe(d)),window.addEventListener("resize",n,{passive:!0}),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>n()),()=>{clearTimeout(a),clearTimeout(t),window.removeEventListener("resize",n),l&&d&&l.disconnect()}},[]),r}export{N as M,M as a,L as u};
