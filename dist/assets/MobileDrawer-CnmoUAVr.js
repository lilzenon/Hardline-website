import{j as d}from"./index-1dRYtxDC.js";import{b as t}from"./vendor-jvEW_LiJ.js";const K=t.memo(({dropId:y,color:H="ff0409",theme:N="dark",background:I="solid",minimal:P=!0,style:R={}})=>{const[G,c]=t.useState(!1),[_,T]=t.useState(!1),[m,W]=t.useState(0),[F,n]=t.useState(!1),[h,Y]=t.useState(0),k=t.useRef(null),o=t.useRef(null),a=t.useRef(null),S=t.useRef(null),b=t.useRef(!0),i=t.useRef(null),p=3,w=8e3,B=2e3,v=300,A=20,D=t.useMemo(()=>y?`https://embed.laylo.com/?${new URLSearchParams({dropId:y,color:H,theme:N,background:I,...P&&{minimal:"true"}}).toString()}`:null,[y,H,N,I,P,m]);t.useEffect(()=>(b.current=!0,()=>{b.current=!1,o.current&&(clearInterval(o.current),o.current=null),a.current&&(clearTimeout(a.current),a.current=null),S.current&&(clearTimeout(S.current),S.current=null)}),[]);const O=t.useCallback(()=>{if(!k.current||!b.current)return!1;try{const r=k.current.contentDocument||k.current.contentWindow?.document;if(r){if(r.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button').length>0)return console.log("✅ Laylo content detected in iframe via DOM access"),!0;const u=r.body?.textContent?.trim();if(u&&u.length>10)return console.log("✅ Iframe has meaningful text content"),!0}}catch{console.log("🔒 CORS restriction (expected), using fallback detection methods...")}const f=k.current,e=f.getBoundingClientRect();return e.height>50&&e.width>100?(console.log("✅ Iframe has content-like dimensions, likely loaded"),!0):f.src&&f.src!=="about:blank"&&f.src.includes("laylo.com")&&Date.now()-(i.current||0)>3e3?(console.log("✅ Sufficient time passed with valid src, assuming loaded"),!0):!1},[]),E=t.useCallback(()=>{!b.current||m>=p||(console.log(`🔄 Retrying iframe load (attempt ${m+1}/${p})`),n(!0),W(f=>f+1),c(!1),T(!1),a.current&&(clearTimeout(a.current),a.current=null),o.current&&(clearInterval(o.current),o.current=null),S.current=setTimeout(()=>{b.current&&(n(!1),Y(f=>f+1),i.current=Date.now())},B))},[m,p]),Z=t.useCallback(()=>{if(!b.current)return;if(console.log(`📡 Iframe load event fired (attempt ${m+1})`),a.current&&(clearTimeout(a.current),a.current=null),c(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(e){console.warn("⚠️ Laylo SDK init failed:",e)}o.current&&(clearInterval(o.current),o.current=null);let f=0;o.current=setInterval(()=>{if(!b.current){clearInterval(o.current),o.current=null;return}f++,O()?(T(!0),clearInterval(o.current),o.current=null,console.log("✅ Laylo content confirmed loaded successfully")):f>=A&&(clearInterval(o.current),o.current=null,m<p-1?(console.log("⚠️ Content check timeout, retrying..."),E()):(console.log("⏰ Final content check timeout, assuming loaded"),T(!0)))},v)},[O,m,E,A,v]),V=t.useCallback(f=>{b.current&&(console.error(`❌ Iframe load error (attempt ${m+1}):`,f),a.current&&(clearTimeout(a.current),a.current=null),m<p-1?(console.log("🔄 Iframe error detected, will retry..."),E()):(console.error("💥 Max retry attempts reached, iframe loading failed"),T(!0)))},[m,E,p]),z=t.useCallback(()=>{b.current&&(console.warn(`⏰ Iframe load timeout (attempt ${m+1})`),m<p-1?(console.log("🔄 Load timeout, retrying..."),E()):(console.warn("⏰ Final load timeout, assuming iframe is working"),c(!0),T(!0)))},[m,E,p]);return t.useEffect(()=>{if(!(!D||F))return i.current=Date.now(),a.current&&clearTimeout(a.current),a.current=setTimeout(z,w),()=>{a.current&&(clearTimeout(a.current),a.current=null)}},[D,F,h,z,w]),y?D?d.jsx("iframe",{ref:k,id:`laylo-drop-${y}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:Z,onError:V,style:R,src:D},h):d.jsx("div",{style:{...R,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:d.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"Loading..."})}):d.jsx("div",{style:{...R,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:d.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"No Laylo ID provided"})})}),q=({contentRef:y,viewportContext:H={isRealMobileDevice:!1},onStateChange:N=()=>{}})=>{const[I,P]=t.useState("");t.useState(!1);const[R,G]=t.useState(!1);t.useState("us"),t.useState("normal");const[c,_]=t.useState(!1),[T,m]=t.useState("");t.useState(""),t.useState(!1);const[W,F]=t.useState("normal"),[n,h]=t.useState(!1),[Y,k]=t.useState(!1),[o,a]=t.useState(!1),[S,b]=t.useState(!1);t.useState(!1),t.useState(0),t.useState(!1);const[i,p]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[w,B]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const v=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{a(!1),h(!1)},500);return()=>clearTimeout(e)},[]),t.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=r=>{console.warn("⚠️ Laylo SDK failed to load in MobileDrawer:",r)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in MobileDrawer")},document.head.appendChild(e)}},[]),t.useEffect(()=>{const e=document.body,r=y?.current;if(n){const s=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${s}px`,r&&r.classList.add("drawer-active")}else{const s=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",s&&window.scrollTo(0,parseInt(s||"0")*-1),r&&r.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",r&&r.classList.remove("drawer-active")}},[n,y]);const A=t.useCallback(()=>{B({expanded:n,showDisclaimer:Y,showVerification:c,verificationCode:T,phoneNumber:I}),console.log("💾 Drawer state saved, iframe content preserved")},[n,Y,c,T,I]),D=t.useCallback(e=>{v.current&&!v.current.contains(e.target)&&(A(),h(!1),c?a(!1):(a(!1),k(!1)))},[I,c,A]);t.useEffect(()=>(n&&(document.addEventListener("mousedown",D),document.addEventListener("touchstart",D)),()=>{document.removeEventListener("mousedown",D),document.removeEventListener("touchstart",D)}),[n,D]),t.useEffect(()=>{const e=document.body,r=y?.current;if(n){const s=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${s}px`,r&&r.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const s=e.style.top;e.style.top="",s&&window.scrollTo(0,parseInt(s||"0")*-1),r&&r.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",r&&r.classList.remove("drawer-active")}},[n,y]),t.useEffect(()=>{N({drawerExpanded:n,drawerFullyClosed:o,showVerification:c,iframeExpanded:S,phoneSubmitted:R})},[n,o,c,S,R,N]);const O=t.useCallback(()=>o?"50px":S?"320px":c&&n?"240px":c&&!n?"60px":n?"280px":"80px",[o,c,n,Y,S]);t.useCallback(()=>{const e=O(),r=(()=>{const u="ontouchstart"in window||navigator.maxTouchPoints>0,l=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),g=window.innerWidth,C=window.innerHeight,x=g/C;return u&&l&&(x<1.5||g<768)})(),s=parseInt(e.replace("px",""));if(r)return`calc(${e} + 20px)`;{const u=Math.max(15,s*.2);return`calc(${e} + ${u}px)`}},[O,H]);const E=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const r=e.touches[0],s=Date.now(),u=e.target.closest(".mobile-drawer-content"),l=v.current?.getBoundingClientRect(),g=l&&r.clientY>l.top&&r.clientY<l.top+120,C=n?l?.height*.4:120,x=l&&r.clientY>l.top&&r.clientY<l.top+C;p({isActive:!0,startY:r.clientY,currentY:r.clientY,startTime:s,isDragging:!1,initialDrawerState:n,isOnDrawerContent:!!u,isOnDrawerHandle:!!g,isOnSwipeZone:!!x,dragDistance:0,isIntentionalGesture:!1}),x&&!u&&(e.preventDefault(),e.stopPropagation())},[n]),Z=t.useCallback(e=>{if(!i.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const r=e.touches[0],s=i.startY-r.clientY,u=Math.abs(s);if(!i.isDragging&&u>3&&i.isOnSwipeZone&&!i.isOnDrawerContent){const l=u>8||u>3&&Date.now()-i.startTime>100;p(g=>({...g,isDragging:!0,isIntentionalGesture:l,dragDistance:u})),l&&(e.preventDefault(),e.stopPropagation())}if(i.isDragging&&i.isOnSwipeZone&&!i.isOnDrawerContent){const l=Math.max(u,i.dragDistance);i.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),p(g=>({...g,currentY:r.clientY,dragDistance:l}))}else i.isOnDrawerContent||p(l=>({...l,currentY:r.clientY}))},[i]),V=t.useCallback(e=>{if(!i.isActive)return;const r=i.startY-i.currentY,s=Math.abs(r),u=Date.now()-i.startTime,l=s/u,g=8,C=.15,x=5,M=i.isIntentionalGesture?.7:1;let j=!1;if(i.isDragging&&i.isIntentionalGesture){const L=g*M,$=C*M;l>$?(j=!0,console.log("🚀 Flick gesture detected:",{velocity:l,threshold:$})):s>L?(j=!0,console.log("🚀 Swipe gesture detected:",{distance:s,threshold:L})):s>x&&(j=!0,console.log("🚀 Snap gesture detected:",{distance:s,threshold:x}))}else i.isDragging&&!i.isIntentionalGesture&&(l>C*1.2||s>g*1.5)&&(j=!0,console.log("🚀 Fallback gesture detected"));if(j)l>C?(v.current?.classList.add("momentum-fast"),setTimeout(()=>{v.current?.classList.remove("momentum-fast")},100)):(v.current?.classList.add("momentum-slow"),setTimeout(()=>{v.current?.classList.remove("momentum-slow")},250)),r>0?n||(h(!0),a(!1),console.log("🔄 Drawer opened via swipe up")):n&&(h(!1),console.log("🔄 Drawer closed via swipe down"));else{const L=v.current?.getBoundingClientRect(),$=n?L?.height*.4:120;L&&i.startY>L.top&&i.startY<L.top+$&&(o?(a(!1),h(!0),console.log("🔄 Drawer opened via tap on swipe zone")):n?(h(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(h(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}p({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[i,n,o]),z=t.useCallback(()=>{o?(a(!1),h(w.expanded||!0),k(w.showDisclaimer),_(w.showVerification),w.verificationCode&&(m(w.verificationCode),w.verificationCode.length===4&&F("filled")),w.phoneNumber&&P(w.phoneNumber)):n||(h(!0),w.showDisclaimer&&!c&&k(!0))},[o,n,w,c]),f=t.useCallback(e=>{e.stopPropagation(),o&&a(!1),h(!0),b(!0),setTimeout(()=>{b(!1)},1e4)},[o]);return d.jsxs(d.Fragment,{children:[d.jsx("style",{children:`
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
        `}),d.jsxs("div",{ref:v,className:`mobile-drawer ${n?"expanded":"collapsed"} ${Y?"disclaimer-peek":""}`,onTouchStart:E,onTouchMove:Z,onTouchEnd:V,onWheel:e=>{e.stopPropagation(),e.preventDefault()},style:{height:O(),transform:o?"translate3d(0, 100%, 0)":n?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:z,role:"dialog","aria-label":"Contact form drawer","aria-expanded":n,children:[d.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:d.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),d.jsxs("div",{className:`drawer-content mobile-drawer-content ${c?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const r=e.currentTarget,{scrollTop:s,scrollHeight:u,clientHeight:l}=r;e.stopPropagation();const g=s===0,C=s+l>=u,x=e.touches[0],M=x.clientY-(x.pageY||x.clientY);(g&&M>0||C&&M<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:o?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!o&&!c&&d.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[d.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),d.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),!o&&!c&&d.jsx("div",{onClick:f,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0},children:d.jsx(K,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,style:{width:"100%",height:S?"200px":"160px",border:"none",borderRadius:"8px",background:"transparent",display:"block",transition:"opacity 0.3s ease, height 0.3s ease",pointerEvents:"auto"}})}),(o||c)&&console.log("🚫 Laylo iframe hidden:",{drawerFullyClosed:o,showVerification:c})]})]})]})};export{q as M};
