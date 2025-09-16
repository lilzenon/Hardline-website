import{j as u}from"./index-BU3GtltY.js";import{b as t}from"./vendor-ViNJc2wV.js";import{u as U}from"./useLayloSDK-B6Urqd2C.js";const X=t.memo(({dropId:x,color:j="ff0409",theme:A="dark",background:R="solid",minimal:F=!0,style:Y={}})=>{const[K,c]=t.useState(!1),[W,C]=t.useState(!1),[m,G]=t.useState(0),[z,i]=t.useState(!1),[p,O]=t.useState(0),D=t.useRef(null),n=t.useRef(null),s=t.useRef(null),y=t.useRef(null),g=t.useRef(!0),M=t.useRef(null),r=3,T=8e3,w=2e3,$=300,b=20,L=t.useMemo(()=>x?`https://embed.laylo.com/?${new URLSearchParams({dropId:x,color:j,theme:A,background:R,...F&&{minimal:"true"}}).toString()}`:null,[x,j,A,R,F,m]);t.useEffect(()=>(g.current=!0,()=>{g.current=!1,n.current&&(clearInterval(n.current),n.current=null),s.current&&(clearTimeout(s.current),s.current=null),y.current&&(clearTimeout(y.current),y.current=null)}),[]);const E=t.useCallback(()=>{if(!D.current||!g.current)return!1;try{const e=D.current.contentDocument||D.current.contentWindow?.document;if(e){if(e.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button').length>0)return console.log("✅ Laylo content detected in iframe via DOM access"),!0;const a=e.body?.textContent?.trim();if(a&&a.length>10)return console.log("✅ Iframe has meaningful text content"),!0}}catch{console.log("🔒 CORS restriction (expected), using fallback detection methods...")}const d=D.current,N=d.getBoundingClientRect();return N.height>50&&N.width>100?(console.log("✅ Iframe has content-like dimensions, likely loaded"),!0):d.src&&d.src!=="about:blank"&&d.src.includes("laylo.com")&&Date.now()-(M.current||0)>3e3?(console.log("✅ Sufficient time passed with valid src, assuming loaded"),!0):!1},[]),S=t.useCallback(()=>{!g.current||m>=r||(console.log(`🔄 Retrying iframe load (attempt ${m+1}/${r})`),i(!0),G(d=>d+1),c(!1),C(!1),s.current&&(clearTimeout(s.current),s.current=null),n.current&&(clearInterval(n.current),n.current=null),y.current=setTimeout(()=>{g.current&&(i(!1),O(d=>d+1),M.current=Date.now())},w))},[m,r]),V=t.useCallback(()=>{if(!g.current)return;if(console.log(`📡 Iframe load event fired (attempt ${m+1})`),s.current&&(clearTimeout(s.current),s.current=null),c(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(N){console.warn("⚠️ Laylo SDK init failed:",N)}n.current&&(clearInterval(n.current),n.current=null);let d=0;n.current=setInterval(()=>{if(!g.current){clearInterval(n.current),n.current=null;return}d++,E()?(C(!0),clearInterval(n.current),n.current=null,console.log("✅ Laylo content confirmed loaded successfully")):d>=b&&(clearInterval(n.current),n.current=null,m<r-1?(console.log("⚠️ Content check timeout, retrying..."),S()):(console.log("⏰ Final content check timeout, assuming loaded"),C(!0)))},$)},[E,m,S,b,$]),_=t.useCallback(d=>{g.current&&(console.error(`❌ Iframe load error (attempt ${m+1}):`,d),s.current&&(clearTimeout(s.current),s.current=null),m<r-1?(console.log("🔄 Iframe error detected, will retry..."),S()):(console.error("💥 Max retry attempts reached, iframe loading failed"),C(!0)))},[m,S,r]),B=t.useCallback(()=>{g.current&&(console.warn(`⏰ Iframe load timeout (attempt ${m+1})`),m<r-1?(console.log("🔄 Load timeout, retrying..."),S()):(console.warn("⏰ Final load timeout, assuming iframe is working"),c(!0),C(!0)))},[m,S,r]);return t.useEffect(()=>{if(!(!L||z))return M.current=Date.now(),s.current&&clearTimeout(s.current),s.current=setTimeout(B,T),()=>{s.current&&(clearTimeout(s.current),s.current=null)}},[L,z,p,B,T]),x?L?u.jsx("iframe",{ref:D,id:`laylo-drop-${x}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:V,onError:_,style:Y,src:L},p):u.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:u.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"Loading..."})}):u.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:u.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"No Laylo ID provided"})})}),ee=({contentRef:x,viewportContext:j={isRealMobileDevice:!1},onStateChange:A=()=>{}})=>{const[R,F]=t.useState("");t.useState(!1);const[Y,K]=t.useState(!1);t.useState("us"),t.useState("normal");const[c,W]=t.useState(!1),[C,m]=t.useState("");t.useState(""),t.useState(!1);const[G,z]=t.useState("normal"),[i,p]=t.useState(!1),[O,D]=t.useState(!1),[n,s]=t.useState(!1),[y,g]=t.useState(!1);t.useState(!1),t.useState(0);const M=U();t.useState(!1);const[r,T]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[w,$]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const b=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{s(!1),p(!1)},500);return()=>clearTimeout(e)},[]),t.useEffect(()=>{const e=document.body,o=x?.current;if(i){const a=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${a}px`,o&&o.classList.add("drawer-active")}else{const a=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",a&&window.scrollTo(0,parseInt(a||"0")*-1),o&&o.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",o&&o.classList.remove("drawer-active")}},[i,x]);const L=t.useCallback(()=>{$({expanded:i,showDisclaimer:O,showVerification:c,verificationCode:C,phoneNumber:R}),console.log("💾 Drawer state saved, iframe content preserved")},[i,O,c,C,R]),E=t.useCallback(e=>{b.current&&!b.current.contains(e.target)&&(L(),p(!1),c?s(!1):(s(!1),D(!1)))},[R,c,L]);t.useEffect(()=>(i&&(document.addEventListener("mousedown",E),document.addEventListener("touchstart",E)),()=>{document.removeEventListener("mousedown",E),document.removeEventListener("touchstart",E)}),[i,E]),t.useEffect(()=>{const e=document.body,o=x?.current;if(i){const a=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${a}px`,o&&o.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const a=e.style.top;e.style.top="",a&&window.scrollTo(0,parseInt(a||"0")*-1),o&&o.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",o&&o.classList.remove("drawer-active")}},[i,x]),t.useEffect(()=>{A({drawerExpanded:i,drawerFullyClosed:n,showVerification:c,iframeExpanded:y,phoneSubmitted:Y})},[i,n,c,y,Y,A]);const S=t.useCallback(()=>n?"50px":y?"320px":c&&i?"240px":c&&!i?"60px":i?"280px":"80px",[n,c,i,O,y]);t.useCallback(()=>{const e=S(),o=(()=>{const f="ontouchstart"in window||navigator.maxTouchPoints>0,l=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),h=window.innerWidth,k=window.innerHeight,v=h/k;return f&&l&&(v<1.5||h<768)})(),a=parseInt(e.replace("px",""));if(o)return`calc(${e} + 20px)`;{const f=Math.max(15,a*.2);return`calc(${e} + ${f}px)`}},[S,j]);const V=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],a=Date.now(),f=e.target.closest(".mobile-drawer-content"),l=b.current?.getBoundingClientRect(),h=l&&o.clientY>l.top&&o.clientY<l.top+120,k=i?l?.height*.4:120,v=l&&o.clientY>l.top&&o.clientY<l.top+k;T({isActive:!0,startY:o.clientY,currentY:o.clientY,startTime:a,isDragging:!1,initialDrawerState:i,isOnDrawerContent:!!f,isOnDrawerHandle:!!h,isOnSwipeZone:!!v,dragDistance:0,isIntentionalGesture:!1}),v&&!f&&(e.preventDefault(),e.stopPropagation())},[i]),_=t.useCallback(e=>{if(!r.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],a=r.startY-o.clientY,f=Math.abs(a);if(!r.isDragging&&f>3&&r.isOnSwipeZone&&!r.isOnDrawerContent){const l=f>8||f>3&&Date.now()-r.startTime>100;T(h=>({...h,isDragging:!0,isIntentionalGesture:l,dragDistance:f})),l&&(e.preventDefault(),e.stopPropagation())}if(r.isDragging&&r.isOnSwipeZone&&!r.isOnDrawerContent){const l=Math.max(f,r.dragDistance);r.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),T(h=>({...h,currentY:o.clientY,dragDistance:l}))}else r.isOnDrawerContent||T(l=>({...l,currentY:o.clientY}))},[r]),B=t.useCallback(e=>{if(!r.isActive)return;const o=r.startY-r.currentY,a=Math.abs(o),f=Date.now()-r.startTime,l=a/f,h=8,k=.15,v=5,H=r.isIntentionalGesture?.7:1;let P=!1;if(r.isDragging&&r.isIntentionalGesture){const I=h*H,Z=k*H;l>Z?(P=!0,console.log("🚀 Flick gesture detected:",{velocity:l,threshold:Z})):a>I?(P=!0,console.log("🚀 Swipe gesture detected:",{distance:a,threshold:I})):a>v&&(P=!0,console.log("🚀 Snap gesture detected:",{distance:a,threshold:v}))}else r.isDragging&&!r.isIntentionalGesture&&(l>k*1.2||a>h*1.5)&&(P=!0,console.log("🚀 Fallback gesture detected"));if(P)l>k?(b.current?.classList.add("momentum-fast"),setTimeout(()=>{b.current?.classList.remove("momentum-fast")},100)):(b.current?.classList.add("momentum-slow"),setTimeout(()=>{b.current?.classList.remove("momentum-slow")},250)),o>0?i||(p(!0),s(!1),console.log("🔄 Drawer opened via swipe up")):i&&(p(!1),console.log("🔄 Drawer closed via swipe down"));else{const I=b.current?.getBoundingClientRect(),Z=i?I?.height*.4:120;I&&r.startY>I.top&&r.startY<I.top+Z&&(n?(s(!1),p(!0),console.log("🔄 Drawer opened via tap on swipe zone")):i?(p(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(p(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}T({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[r,i,n]),d=t.useCallback(()=>{n?(s(!1),p(w.expanded||!0),D(w.showDisclaimer),W(w.showVerification),w.verificationCode&&(m(w.verificationCode),w.verificationCode.length===4&&z("filled")),w.phoneNumber&&F(w.phoneNumber)):i||(p(!0),w.showDisclaimer&&!c&&D(!0))},[n,i,w,c]),N=t.useCallback(e=>{e.stopPropagation(),n&&s(!1),p(!0),g(!0),setTimeout(()=>{g(!1)},1e4)},[n]);return u.jsxs(u.Fragment,{children:[u.jsx("style",{children:`
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
        `}),u.jsxs("div",{ref:b,className:`mobile-drawer ${i?"expanded":"collapsed"} ${O?"disclaimer-peek":""}`,onTouchStart:V,onTouchMove:_,onTouchEnd:B,onWheel:e=>{e.stopPropagation(),e.preventDefault()},style:{height:S(),transform:n?"translate3d(0, 100%, 0)":i?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:d,role:"dialog","aria-label":"Contact form drawer","aria-expanded":i,children:[u.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:u.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),u.jsxs("div",{className:`drawer-content mobile-drawer-content ${c?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const o=e.currentTarget,{scrollTop:a,scrollHeight:f,clientHeight:l}=o;e.stopPropagation();const h=a===0,k=a+l>=f,v=e.touches[0],H=v.clientY-(v.pageY||v.clientY);(h&&H>0||k&&H<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:n?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!n&&!c&&u.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[u.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),u.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),!n&&!c&&M&&u.jsx("div",{onClick:N,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0},children:u.jsx(X,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,style:{width:"100%",height:y?"200px":"160px",border:"none",borderRadius:"8px",background:"transparent",display:"block",transition:"opacity 0.3s ease, height 0.3s ease",pointerEvents:"auto"}})}),(n||c)&&console.log("🚫 Laylo iframe hidden:",{drawerFullyClosed:n,showVerification:c})]})]})]})};export{ee as M};
