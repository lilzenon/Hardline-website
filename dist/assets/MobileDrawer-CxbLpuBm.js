import{j as p}from"./index-DyXPqEsg.js";import{b as t}from"./vendor-ViNJc2wV.js";import{u as K}from"./useLayloSDK-B6Urqd2C.js";const U=t.memo(({dropId:D,color:z="ff0409",theme:A="dark",background:O="solid",minimal:V=!0,style:Y={},visible:M=!0})=>{const[m,H]=t.useState(!1),[N,x]=t.useState(!1),[f,$]=t.useState(0),[r,h]=t.useState(!1),[L,C]=t.useState(0),c=t.useRef(null),s=t.useRef(null),l=t.useRef(null),I=t.useRef(null),n=t.useRef(!0),g=t.useRef(null),u=3,B=8e3,b=2e3,P=300,k=20,T=t.useMemo(()=>D?`https://embed.laylo.com/?${new URLSearchParams({dropId:D,color:z,theme:A,background:O,...V&&{minimal:"true"}}).toString()}`:null,[D,z,A,O,V,f]);t.useEffect(()=>(n.current=!0,()=>{n.current=!1,s.current&&(clearInterval(s.current),s.current=null),l.current&&(clearTimeout(l.current),l.current=null),I.current&&(clearTimeout(I.current),I.current=null)}),[]);const E=t.useCallback(()=>{if(!c.current||!n.current)return!1;try{const i=c.current.contentDocument||c.current.contentWindow?.document;if(i){if(i.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button').length>0)return console.log("✅ Laylo content detected in iframe via DOM access"),!0;const a=i.body?.textContent?.trim();if(a&&a.length>10)return console.log("✅ Iframe has meaningful text content"),!0}}catch{console.log("🔒 CORS restriction (expected), using fallback detection methods...")}const e=c.current,o=e.getBoundingClientRect();return o.height>50&&o.width>100?(console.log("✅ Iframe has content-like dimensions, likely loaded"),!0):e.src&&e.src!=="about:blank"&&e.src.includes("laylo.com")&&Date.now()-(g.current||0)>3e3?(console.log("✅ Sufficient time passed with valid src, assuming loaded"),!0):!1},[]),y=t.useCallback(()=>{!n.current||f>=u||(console.log(`🔄 Retrying iframe load (attempt ${f+1}/${u})`),h(!0),$(e=>e+1),H(!1),x(!1),l.current&&(clearTimeout(l.current),l.current=null),s.current&&(clearInterval(s.current),s.current=null),I.current=setTimeout(()=>{n.current&&(h(!1),C(e=>e+1),g.current=Date.now())},b))},[f,u]),W=t.useCallback(()=>{if(!n.current)return;if(console.log(`📡 Iframe load event fired (attempt ${f+1})`),l.current&&(clearTimeout(l.current),l.current=null),H(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(o){console.warn("⚠️ Laylo SDK init failed:",o)}s.current&&(clearInterval(s.current),s.current=null);let e=0;s.current=setInterval(()=>{if(!n.current){clearInterval(s.current),s.current=null;return}e++,E()?(x(!0),clearInterval(s.current),s.current=null,console.log("✅ Laylo content confirmed loaded successfully")):e>=k&&(clearInterval(s.current),s.current=null,f<u-1?(console.log("⚠️ Content check timeout, retrying..."),y()):(console.log("⏰ Final content check timeout, assuming loaded"),x(!0)))},P)},[E,f,y,k,P]),G=t.useCallback(e=>{n.current&&(console.error(`❌ Iframe load error (attempt ${f+1}):`,e),l.current&&(clearTimeout(l.current),l.current=null),f<u-1?(console.log("🔄 Iframe error detected, will retry..."),y()):(console.error("💥 Max retry attempts reached, iframe loading failed"),x(!0)))},[f,y,u]);t.useEffect(()=>{if(!n.current||!M)return;f===0&&!N&&!r&&(g.current=Date.now());const e=setTimeout(()=>{E()?!N&&!r&&f>0&&f<u&&(console.log("👁️ Iframe became visible without content, triggering retry..."),y()):(console.log("👁️ Visible but content not detected — refreshing iframe element"),x(!1),h(!1),C(i=>i+1),g.current=Date.now())},150);return()=>clearTimeout(e)},[M,N,r,f,y,E,u]),t.useEffect(()=>{const e=i=>{n.current&&i&&i.persisted&&(console.log("↩️ pageshow from bfcache — refreshing Laylo iframe"),x(!1),h(!1),$(0),C(d=>d+1),g.current=Date.now())},o=()=>{n.current&&document.visibilityState==="visible"&&M&&setTimeout(()=>{E()||(console.log("👁️ Tab became visible and content missing — refreshing iframe"),x(!1),h(!1),C(i=>i+1),g.current=Date.now())},150)};return window.addEventListener("pageshow",e),document.addEventListener("visibilitychange",o),()=>{window.removeEventListener("pageshow",e),document.removeEventListener("visibilitychange",o)}},[M,E]);const Z=t.useCallback(()=>{n.current&&(console.warn(`⏰ Iframe load timeout (attempt ${f+1})`),f<u-1?(console.log("🔄 Load timeout, retrying..."),y()):(console.warn("⏰ Final load timeout, assuming iframe is working"),H(!0),x(!0)))},[f,y,u]);return t.useEffect(()=>{if(!(!T||r))return g.current=Date.now(),l.current&&clearTimeout(l.current),l.current=setTimeout(Z,B),()=>{l.current&&(clearTimeout(l.current),l.current=null)}},[T,r,L,Z,B]),D?T?p.jsx("iframe",{ref:c,id:`laylo-drop-${D}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:W,onError:G,style:Y,src:T},L):p.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:p.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"Loading..."})}):p.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:p.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"No Laylo ID provided"})})}),Q=({contentRef:D,viewportContext:z={isRealMobileDevice:!1},onStateChange:A=()=>{}})=>{const[O,V]=t.useState("");t.useState(!1);const[Y,M]=t.useState(!1);t.useState("us"),t.useState("normal");const[m,H]=t.useState(!1),[N,x]=t.useState("");t.useState(""),t.useState(!1);const[f,$]=t.useState("normal"),[r,h]=t.useState(!1),[L,C]=t.useState(!1),[c,s]=t.useState(!1),[l,I]=t.useState(!1);t.useState(!1),t.useState(0),K(),t.useState(!1);const[n,g]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[u,B]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const b=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{s(!1),h(!1)},500);return()=>clearTimeout(e)},[]);const P=t.useCallback(()=>{B({expanded:r,showDisclaimer:L,showVerification:m,verificationCode:N,phoneNumber:O}),console.log("💾 Drawer state saved, iframe content preserved")},[r,L,m,N,O]),k=t.useCallback(e=>{b.current&&!b.current.contains(e.target)&&(P(),h(!1),m?s(!1):(s(!1),C(!1)))},[O,m,P]);t.useEffect(()=>(r&&(document.addEventListener("mousedown",k),document.addEventListener("touchstart",k)),()=>{document.removeEventListener("mousedown",k),document.removeEventListener("touchstart",k)}),[r,k]),t.useEffect(()=>{const e=document.body,o=D?.current;if(r){const i=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${i}px`,o&&o.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const i=e.style.top;e.style.top="",i&&window.scrollTo(0,parseInt(i||"0")*-1),o&&o.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",o&&o.classList.remove("drawer-active")}},[r,D]),t.useEffect(()=>{A({drawerExpanded:r,drawerFullyClosed:c,showVerification:m,iframeExpanded:l,phoneSubmitted:Y})},[r,c,m,l,Y,A]);const T=t.useCallback(()=>c?"50px":l?"320px":m&&r?"240px":m&&!r?"60px":r?"280px":"80px",[c,m,r,L,l]);t.useCallback(()=>{const e=T(),o=(()=>{const d="ontouchstart"in window||navigator.maxTouchPoints>0,a=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),w=window.innerWidth,S=window.innerHeight,v=w/S;return d&&a&&(v<1.5||w<768)})(),i=parseInt(e.replace("px",""));if(o)return`calc(${e} + 20px)`;{const d=Math.max(15,i*.2);return`calc(${e} + ${d}px)`}},[T,z]);const E=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],i=Date.now(),d=e.target.closest(".mobile-drawer-content"),a=b.current?.getBoundingClientRect(),w=a&&o.clientY>a.top&&o.clientY<a.top+120,S=r?a?.height*.4:120,v=a&&o.clientY>a.top&&o.clientY<a.top+S;g({isActive:!0,startY:o.clientY,currentY:o.clientY,startTime:i,isDragging:!1,initialDrawerState:r,isOnDrawerContent:!!d,isOnDrawerHandle:!!w,isOnSwipeZone:!!v,dragDistance:0,isIntentionalGesture:!1}),v&&!d&&(e.preventDefault(),e.stopPropagation())},[r]),y=t.useCallback(e=>{if(!n.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],i=n.startY-o.clientY,d=Math.abs(i);if(!n.isDragging&&d>3&&n.isOnSwipeZone&&!n.isOnDrawerContent){const a=d>8||d>3&&Date.now()-n.startTime>100;g(w=>({...w,isDragging:!0,isIntentionalGesture:a,dragDistance:d})),a&&(e.preventDefault(),e.stopPropagation())}if(n.isDragging&&n.isOnSwipeZone&&!n.isOnDrawerContent){const a=Math.max(d,n.dragDistance);n.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),g(w=>({...w,currentY:o.clientY,dragDistance:a}))}else n.isOnDrawerContent||g(a=>({...a,currentY:o.clientY}))},[n]),W=t.useCallback(e=>{if(!n.isActive)return;const o=n.startY-n.currentY,i=Math.abs(o),d=Date.now()-n.startTime,a=i/d,w=8,S=.15,v=5,j=n.isIntentionalGesture?.7:1;let F=!1;if(n.isDragging&&n.isIntentionalGesture){const R=w*j,_=S*j;a>_?(F=!0,console.log("🚀 Flick gesture detected:",{velocity:a,threshold:_})):i>R?(F=!0,console.log("🚀 Swipe gesture detected:",{distance:i,threshold:R})):i>v&&(F=!0,console.log("🚀 Snap gesture detected:",{distance:i,threshold:v}))}else n.isDragging&&!n.isIntentionalGesture&&(a>S*1.2||i>w*1.5)&&(F=!0,console.log("🚀 Fallback gesture detected"));if(F)a>S?(b.current?.classList.add("momentum-fast"),setTimeout(()=>{b.current?.classList.remove("momentum-fast")},100)):(b.current?.classList.add("momentum-slow"),setTimeout(()=>{b.current?.classList.remove("momentum-slow")},250)),o>0?r||(h(!0),s(!1),console.log("🔄 Drawer opened via swipe up")):r&&(h(!1),console.log("🔄 Drawer closed via swipe down"));else{const R=b.current?.getBoundingClientRect(),_=r?R?.height*.4:120;R&&n.startY>R.top&&n.startY<R.top+_&&(c?(s(!1),h(!0),console.log("🔄 Drawer opened via tap on swipe zone")):r?(h(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(h(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}g({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[n,r,c]),G=t.useCallback(()=>{c?(s(!1),h(u.expanded||!0),C(u.showDisclaimer),H(u.showVerification),u.verificationCode&&(x(u.verificationCode),u.verificationCode.length===4&&$("filled")),u.phoneNumber&&V(u.phoneNumber)):r||(h(!0),u.showDisclaimer&&!m&&C(!0))},[c,r,u,m]),Z=t.useCallback(e=>{e.stopPropagation(),c&&s(!1),h(!0),I(!0),setTimeout(()=>{I(!1)},1e4)},[c]);return p.jsxs(p.Fragment,{children:[p.jsx("style",{children:`
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
            /* 🚀 ENHANCED: Mirrored opening/closing animation with consistent timing (25% faster) */
            transition: transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
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
        `}),p.jsxs("div",{ref:b,className:`mobile-drawer ${r?"expanded":"collapsed"} ${L?"disclaimer-peek":""}`,onTouchStart:E,onTouchMove:y,onTouchEnd:W,onWheel:e=>{r&&(e.stopPropagation(),e.preventDefault())},style:{height:T(),transform:c?"translate3d(0, 100%, 0)":r?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:G,role:"dialog","aria-label":"Contact form drawer","aria-expanded":r,children:[p.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:p.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),p.jsxs("div",{className:`drawer-content mobile-drawer-content ${m?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const o=e.currentTarget,{scrollTop:i,scrollHeight:d,clientHeight:a}=o;e.stopPropagation();const w=i===0,S=i+a>=d,v=e.touches[0],j=v.clientY-(v.pageY||v.clientY);(w&&j>0||S&&j<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:c?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!c&&!m&&p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),(()=>{const e=r&&!m;return p.jsx("div",{onClick:Z,"aria-hidden":!e,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0,opacity:e?1:0,height:e?l?"200px":"160px":1,pointerEvents:e?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:p.jsx(U,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:e,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})})})(),(c||m)&&console.log("🚫 Laylo iframe visually hidden (mounted):",{drawerFullyClosed:c,showVerification:m})]})]})]})};export{Q as M};
