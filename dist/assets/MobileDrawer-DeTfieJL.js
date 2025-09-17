import{j as m}from"./index-C4JJLsIS.js";import{b as t}from"./vendor-ViNJc2wV.js";import{u as U}from"./useLayloSDK-B6Urqd2C.js";const X=t.memo(({dropId:C,color:z="ff0409",theme:A="dark",background:R="solid",minimal:$=!0,style:O={},visible:B=!0})=>{const[u,M]=t.useState(!1),[Y,T]=t.useState(!1),[f,_]=t.useState(0),[r,g]=t.useState(!1),[E,H]=t.useState(0),i=t.useRef(null),a=t.useRef(null),s=t.useRef(null),I=t.useRef(null),v=t.useRef(!0),n=t.useRef(null),p=3,w=8e3,W=2e3,x=300,P=20,S=t.useMemo(()=>C?`https://embed.laylo.com/?${new URLSearchParams({dropId:C,color:z,theme:A,background:R,...$&&{minimal:"true"}}).toString()}`:null,[C,z,A,R,$,f]);t.useEffect(()=>(v.current=!0,()=>{v.current=!1,a.current&&(clearInterval(a.current),a.current=null),s.current&&(clearTimeout(s.current),s.current=null),I.current&&(clearTimeout(I.current),I.current=null)}),[]);const N=t.useCallback(()=>{if(!i.current||!v.current)return!1;try{const o=i.current.contentDocument||i.current.contentWindow?.document;if(o){if(o.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button').length>0)return console.log("✅ Laylo content detected in iframe via DOM access"),!0;const d=o.body?.textContent?.trim();if(d&&d.length>10)return console.log("✅ Iframe has meaningful text content"),!0}}catch{console.log("🔒 CORS restriction (expected), using fallback detection methods...")}const h=i.current,e=h.getBoundingClientRect();return e.height>50&&e.width>100?(console.log("✅ Iframe has content-like dimensions, likely loaded"),!0):h.src&&h.src!=="about:blank"&&h.src.includes("laylo.com")&&Date.now()-(n.current||0)>3e3?(console.log("✅ Sufficient time passed with valid src, assuming loaded"),!0):!1},[]),D=t.useCallback(()=>{!v.current||f>=p||(console.log(`🔄 Retrying iframe load (attempt ${f+1}/${p})`),g(!0),_(h=>h+1),M(!1),T(!1),s.current&&(clearTimeout(s.current),s.current=null),a.current&&(clearInterval(a.current),a.current=null),I.current=setTimeout(()=>{v.current&&(g(!1),H(h=>h+1),n.current=Date.now())},W))},[f,p]),G=t.useCallback(()=>{if(!v.current)return;if(console.log(`📡 Iframe load event fired (attempt ${f+1})`),s.current&&(clearTimeout(s.current),s.current=null),M(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(e){console.warn("⚠️ Laylo SDK init failed:",e)}a.current&&(clearInterval(a.current),a.current=null);let h=0;a.current=setInterval(()=>{if(!v.current){clearInterval(a.current),a.current=null;return}h++,N()?(T(!0),clearInterval(a.current),a.current=null,console.log("✅ Laylo content confirmed loaded successfully")):h>=P&&(clearInterval(a.current),a.current=null,f<p-1?(console.log("⚠️ Content check timeout, retrying..."),D()):(console.log("⏰ Final content check timeout, assuming loaded"),T(!0)))},x)},[N,f,D,P,x]),K=t.useCallback(h=>{v.current&&(console.error(`❌ Iframe load error (attempt ${f+1}):`,h),s.current&&(clearTimeout(s.current),s.current=null),f<p-1?(console.log("🔄 Iframe error detected, will retry..."),D()):(console.error("💥 Max retry attempts reached, iframe loading failed"),T(!0)))},[f,D,p]);t.useEffect(()=>{v.current&&(B&&!Y&&!r&&f===0&&(n.current=Date.now()),B&&!Y&&!r&&f>0&&f<p&&(console.log("👁️ Iframe became visible without content, triggering retry..."),D()))},[B,Y,r,f,p,D]);const Z=t.useCallback(()=>{v.current&&(console.warn(`⏰ Iframe load timeout (attempt ${f+1})`),f<p-1?(console.log("🔄 Load timeout, retrying..."),D()):(console.warn("⏰ Final load timeout, assuming iframe is working"),M(!0),T(!0)))},[f,D,p]);return t.useEffect(()=>{if(!(!S||r))return n.current=Date.now(),s.current&&clearTimeout(s.current),s.current=setTimeout(Z,w),()=>{s.current&&(clearTimeout(s.current),s.current=null)}},[S,r,E,Z,w]),C?S?m.jsx("iframe",{ref:i,id:`laylo-drop-${C}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:G,onError:K,style:O,src:S},E):m.jsx("div",{style:{...O,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:m.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"Loading..."})}):m.jsx("div",{style:{...O,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:m.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"No Laylo ID provided"})})}),ee=({contentRef:C,viewportContext:z={isRealMobileDevice:!1},onStateChange:A=()=>{}})=>{const[R,$]=t.useState("");t.useState(!1);const[O,B]=t.useState(!1);t.useState("us"),t.useState("normal");const[u,M]=t.useState(!1),[Y,T]=t.useState("");t.useState(""),t.useState(!1);const[f,_]=t.useState("normal"),[r,g]=t.useState(!1),[E,H]=t.useState(!1),[i,a]=t.useState(!1),[s,I]=t.useState(!1);t.useState(!1),t.useState(0);const v=U();t.useState(!1);const[n,p]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[w,W]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const x=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{a(!1),g(!1)},500);return()=>clearTimeout(e)},[]);const P=t.useCallback(()=>{W({expanded:r,showDisclaimer:E,showVerification:u,verificationCode:Y,phoneNumber:R}),console.log("💾 Drawer state saved, iframe content preserved")},[r,E,u,Y,R]),S=t.useCallback(e=>{x.current&&!x.current.contains(e.target)&&(P(),g(!1),u?a(!1):(a(!1),H(!1)))},[R,u,P]);t.useEffect(()=>(r&&(document.addEventListener("mousedown",S),document.addEventListener("touchstart",S)),()=>{document.removeEventListener("mousedown",S),document.removeEventListener("touchstart",S)}),[r,S]),t.useEffect(()=>{const e=document.body,o=C?.current;if(r){const c=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${c}px`,o&&o.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const c=e.style.top;e.style.top="",c&&window.scrollTo(0,parseInt(c||"0")*-1),o&&o.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",o&&o.classList.remove("drawer-active")}},[r,C]),t.useEffect(()=>{A({drawerExpanded:r,drawerFullyClosed:i,showVerification:u,iframeExpanded:s,phoneSubmitted:O})},[r,i,u,s,O,A]);const N=t.useCallback(()=>i?"50px":s?"320px":u&&r?"240px":u&&!r?"60px":r?"280px":"80px",[i,u,r,E,s]);t.useCallback(()=>{const e=N(),o=(()=>{const d="ontouchstart"in window||navigator.maxTouchPoints>0,l=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),b=window.innerWidth,k=window.innerHeight,y=b/k;return d&&l&&(y<1.5||b<768)})(),c=parseInt(e.replace("px",""));if(o)return`calc(${e} + 20px)`;{const d=Math.max(15,c*.2);return`calc(${e} + ${d}px)`}},[N,z]);const D=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],c=Date.now(),d=e.target.closest(".mobile-drawer-content"),l=x.current?.getBoundingClientRect(),b=l&&o.clientY>l.top&&o.clientY<l.top+120,k=r?l?.height*.4:120,y=l&&o.clientY>l.top&&o.clientY<l.top+k;p({isActive:!0,startY:o.clientY,currentY:o.clientY,startTime:c,isDragging:!1,initialDrawerState:r,isOnDrawerContent:!!d,isOnDrawerHandle:!!b,isOnSwipeZone:!!y,dragDistance:0,isIntentionalGesture:!1}),y&&!d&&(e.preventDefault(),e.stopPropagation())},[r]),G=t.useCallback(e=>{if(!n.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],c=n.startY-o.clientY,d=Math.abs(c);if(!n.isDragging&&d>3&&n.isOnSwipeZone&&!n.isOnDrawerContent){const l=d>8||d>3&&Date.now()-n.startTime>100;p(b=>({...b,isDragging:!0,isIntentionalGesture:l,dragDistance:d})),l&&(e.preventDefault(),e.stopPropagation())}if(n.isDragging&&n.isOnSwipeZone&&!n.isOnDrawerContent){const l=Math.max(d,n.dragDistance);n.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),p(b=>({...b,currentY:o.clientY,dragDistance:l}))}else n.isOnDrawerContent||p(l=>({...l,currentY:o.clientY}))},[n]),K=t.useCallback(e=>{if(!n.isActive)return;const o=n.startY-n.currentY,c=Math.abs(o),d=Date.now()-n.startTime,l=c/d,b=8,k=.15,y=5,j=n.isIntentionalGesture?.7:1;let F=!1;if(n.isDragging&&n.isIntentionalGesture){const L=b*j,V=k*j;l>V?(F=!0,console.log("🚀 Flick gesture detected:",{velocity:l,threshold:V})):c>L?(F=!0,console.log("🚀 Swipe gesture detected:",{distance:c,threshold:L})):c>y&&(F=!0,console.log("🚀 Snap gesture detected:",{distance:c,threshold:y}))}else n.isDragging&&!n.isIntentionalGesture&&(l>k*1.2||c>b*1.5)&&(F=!0,console.log("🚀 Fallback gesture detected"));if(F)l>k?(x.current?.classList.add("momentum-fast"),setTimeout(()=>{x.current?.classList.remove("momentum-fast")},100)):(x.current?.classList.add("momentum-slow"),setTimeout(()=>{x.current?.classList.remove("momentum-slow")},250)),o>0?r||(g(!0),a(!1),console.log("🔄 Drawer opened via swipe up")):r&&(g(!1),console.log("🔄 Drawer closed via swipe down"));else{const L=x.current?.getBoundingClientRect(),V=r?L?.height*.4:120;L&&n.startY>L.top&&n.startY<L.top+V&&(i?(a(!1),g(!0),console.log("🔄 Drawer opened via tap on swipe zone")):r?(g(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(g(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}p({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[n,r,i]),Z=t.useCallback(()=>{i?(a(!1),g(w.expanded||!0),H(w.showDisclaimer),M(w.showVerification),w.verificationCode&&(T(w.verificationCode),w.verificationCode.length===4&&_("filled")),w.phoneNumber&&$(w.phoneNumber)):r||(g(!0),w.showDisclaimer&&!u&&H(!0))},[i,r,w,u]),h=t.useCallback(e=>{e.stopPropagation(),i&&a(!1),g(!0),I(!0),setTimeout(()=>{I(!1)},1e4)},[i]);return m.jsxs(m.Fragment,{children:[m.jsx("style",{children:`
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
        `}),m.jsxs("div",{ref:x,className:`mobile-drawer ${r?"expanded":"collapsed"} ${E?"disclaimer-peek":""}`,onTouchStart:D,onTouchMove:G,onTouchEnd:K,onWheel:e=>{r&&(e.stopPropagation(),e.preventDefault())},style:{height:N(),transform:i?"translate3d(0, 100%, 0)":r?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:Z,role:"dialog","aria-label":"Contact form drawer","aria-expanded":r,children:[m.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:m.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),m.jsxs("div",{className:`drawer-content mobile-drawer-content ${u?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const o=e.currentTarget,{scrollTop:c,scrollHeight:d,clientHeight:l}=o;e.stopPropagation();const b=c===0,k=c+l>=d,y=e.touches[0],j=y.clientY-(y.pageY||y.clientY);(b&&j>0||k&&j<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:i?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!i&&!u&&m.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[m.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),m.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),v&&m.jsx("div",{onClick:h,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0,opacity:!i&&!u?1:0,height:!i&&!u?s?"200px":"160px":1,pointerEvents:!i&&!u?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:m.jsx(X,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:!i&&!u,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})}),(i||u)&&console.log("🚫 Laylo iframe visually hidden (mounted):",{drawerFullyClosed:i,showVerification:u})]})]})]})};export{ee as M};
