import{j as p}from"./index-BgnBXOwb.js";import{b as t}from"./vendor-ViNJc2wV.js";const U=t.memo(({dropId:D,color:P="ff0409",theme:N="dark",background:R="solid",minimal:F=!0,style:Y={}})=>{const[G,u]=t.useState(!1),[Z,T]=t.useState(!1),[d,W]=t.useState(0),[z,o]=t.useState(!1),h=t.useRef(null),l=t.useRef(null),s=t.useRef(null),c=t.useRef(null),f=t.useRef(!0),k=t.useRef(null),y=3,n=8e3,E=2e3,b=300,$=20,g=t.useMemo(()=>{if(!D)return null;const m=new URLSearchParams({dropId:D,color:P,theme:N,background:R,...F&&{minimal:"true"}});return d>0&&(m.set("_retry",d.toString()),m.set("_t",Date.now().toString())),`https://embed.laylo.com/?${m.toString()}`},[D,P,N,R,F,d]);t.useEffect(()=>(f.current=!0,()=>{f.current=!1,l.current&&(clearInterval(l.current),l.current=null),s.current&&(clearTimeout(s.current),s.current=null),c.current&&(clearTimeout(c.current),c.current=null)}),[]);const A=t.useCallback(()=>{if(!h.current||!f.current)return!1;try{const L=h.current.contentDocument||h.current.contentWindow?.document;if(L){if(L.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button').length>0)return console.log("✅ Laylo content detected in iframe via DOM access"),!0;const r=L.body?.textContent?.trim();if(r&&r.length>10)return console.log("✅ Iframe has meaningful text content"),!0}}catch{console.log("🔒 CORS restriction (expected), using fallback detection methods...")}const m=h.current,O=m.getBoundingClientRect();return O.height>50&&O.width>100?(console.log("✅ Iframe has content-like dimensions, likely loaded"),!0):m.src&&m.src!=="about:blank"&&m.src.includes("laylo.com")&&Date.now()-(k.current||0)>3e3?(console.log("✅ Sufficient time passed with valid src, assuming loaded"),!0):!1},[]),x=t.useCallback(()=>{!f.current||d>=y||(console.log(`🔄 Retrying iframe load (attempt ${d+1}/${y})`),o(!0),W(m=>m+1),u(!1),T(!1),s.current&&(clearTimeout(s.current),s.current=null),l.current&&(clearInterval(l.current),l.current=null),c.current=setTimeout(()=>{f.current&&(o(!1),k.current=Date.now())},E))},[d,y]),M=t.useCallback(()=>{if(!f.current)return;if(console.log(`📡 Iframe load event fired (attempt ${d+1})`),s.current&&(clearTimeout(s.current),s.current=null),u(!0),typeof window<"u"&&window.Laylo&&window.Laylo.init)try{console.log("🔄 Notifying Laylo SDK of iframe readiness"),window.Laylo.init()}catch(O){console.warn("⚠️ Laylo SDK init failed:",O)}l.current&&(clearInterval(l.current),l.current=null);let m=0;l.current=setInterval(()=>{if(!f.current){clearInterval(l.current),l.current=null;return}m++,A()?(T(!0),clearInterval(l.current),l.current=null,console.log("✅ Laylo content confirmed loaded successfully")):m>=$&&(clearInterval(l.current),l.current=null,d<y-1?(console.log("⚠️ Content check timeout, retrying..."),x()):(console.log("⏰ Final content check timeout, assuming loaded"),T(!0)))},b)},[A,d,x,$,b]),V=t.useCallback(m=>{f.current&&(console.error(`❌ Iframe load error (attempt ${d+1}):`,m),s.current&&(clearTimeout(s.current),s.current=null),d<y-1?(console.log("🔄 Iframe error detected, will retry..."),x()):(console.error("💥 Max retry attempts reached, iframe loading failed"),T(!0)))},[d,x,y]),B=t.useCallback(()=>{f.current&&(console.warn(`⏰ Iframe load timeout (attempt ${d+1})`),d<y-1?(console.log("🔄 Load timeout, retrying..."),x()):(console.warn("⏰ Final load timeout, assuming iframe is working"),u(!0),T(!0)))},[d,x,y]);return t.useEffect(()=>{if(!(!g||z))return k.current=Date.now(),s.current&&clearTimeout(s.current),s.current=setTimeout(B,n),()=>{s.current&&(clearTimeout(s.current),s.current=null)}},[g,z,B,n]),D?g?p.jsx("iframe",{ref:h,id:`laylo-drop-${D}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",onLoad:M,onError:V,allow:"web-share",style:{...Y,opacity:Z?1:.8,transition:"opacity 0.15s ease-out",minHeight:"60px"},src:g,sandbox:"allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox",loading:"eager"}):p.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:p.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"Loading..."})}):p.jsx("div",{style:{...Y,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60px"},children:p.jsx("span",{style:{color:"#999",fontSize:"14px"},children:"No Laylo ID provided"})})}),q=({contentRef:D,viewportContext:P={isRealMobileDevice:!1},onStateChange:N=()=>{}})=>{const[R,F]=t.useState("");t.useState(!1);const[Y,G]=t.useState(!1);t.useState("us"),t.useState("normal");const[u,Z]=t.useState(!1),[T,d]=t.useState("");t.useState(""),t.useState(!1);const[W,z]=t.useState("normal"),[o,h]=t.useState(!1),[l,s]=t.useState(!1),[c,f]=t.useState(!1),[k,y]=t.useState(!1);t.useState(!1),t.useState(0),t.useState(!1);const[n,E]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[b,$]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const g=t.useRef(null);t.useRef(null),t.useEffect(()=>{const e=setTimeout(()=>{f(!1),h(!1)},500);return()=>clearTimeout(e)},[]),t.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=r=>{console.warn("⚠️ Laylo SDK failed to load in MobileDrawer:",r)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in MobileDrawer")},document.head.appendChild(e)}},[]),t.useEffect(()=>{const e=document.body,r=D?.current;if(o){const i=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${i}px`,r&&r.classList.add("drawer-active")}else{const i=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",i&&window.scrollTo(0,parseInt(i||"0")*-1),r&&r.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",r&&r.classList.remove("drawer-active")}},[o,D]);const A=t.useCallback(()=>{$({expanded:o,showDisclaimer:l,showVerification:u,verificationCode:T,phoneNumber:R}),console.log("💾 Drawer state saved, iframe content preserved")},[o,l,u,T,R]),x=t.useCallback(e=>{g.current&&!g.current.contains(e.target)&&(A(),h(!1),u?f(!1):(f(!1),s(!1)))},[R,u,A]);t.useEffect(()=>(o&&(document.addEventListener("mousedown",x),document.addEventListener("touchstart",x)),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("touchstart",x)}),[o,x]),t.useEffect(()=>{const e=document.body,r=D?.current;if(o){const i=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${i}px`,r&&r.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const i=e.style.top;e.style.top="",i&&window.scrollTo(0,parseInt(i||"0")*-1),r&&r.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",r&&r.classList.remove("drawer-active")}},[o,D]),t.useEffect(()=>{N({drawerExpanded:o,drawerFullyClosed:c,showVerification:u,iframeExpanded:k,phoneSubmitted:Y})},[o,c,u,k,Y,N]);const M=t.useCallback(()=>c?"50px":k?"320px":u&&o?"240px":u&&!o?"60px":o?"280px":"80px",[c,u,o,l,k]);t.useCallback(()=>{const e=M(),r=(()=>{const w="ontouchstart"in window||navigator.maxTouchPoints>0,a=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),v=window.innerWidth,C=window.innerHeight,S=v/C;return w&&a&&(S<1.5||v<768)})(),i=parseInt(e.replace("px",""));if(r)return`calc(${e} + 20px)`;{const w=Math.max(15,i*.2);return`calc(${e} + ${w}px)`}},[M,P]);const V=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const r=e.touches[0],i=Date.now(),w=e.target.closest(".mobile-drawer-content"),a=g.current?.getBoundingClientRect(),v=a&&r.clientY>a.top&&r.clientY<a.top+120,C=o?a?.height*.4:120,S=a&&r.clientY>a.top&&r.clientY<a.top+C;E({isActive:!0,startY:r.clientY,currentY:r.clientY,startTime:i,isDragging:!1,initialDrawerState:o,isOnDrawerContent:!!w,isOnDrawerHandle:!!v,isOnSwipeZone:!!S,dragDistance:0,isIntentionalGesture:!1}),S&&!w&&(e.preventDefault(),e.stopPropagation())},[o]),B=t.useCallback(e=>{if(!n.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const r=e.touches[0],i=n.startY-r.clientY,w=Math.abs(i);if(!n.isDragging&&w>3&&n.isOnSwipeZone&&!n.isOnDrawerContent){const a=w>8||w>3&&Date.now()-n.startTime>100;E(v=>({...v,isDragging:!0,isIntentionalGesture:a,dragDistance:w})),a&&(e.preventDefault(),e.stopPropagation())}if(n.isDragging&&n.isOnSwipeZone&&!n.isOnDrawerContent){const a=Math.max(w,n.dragDistance);n.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),E(v=>({...v,currentY:r.clientY,dragDistance:a}))}else n.isOnDrawerContent||E(a=>({...a,currentY:r.clientY}))},[n]),m=t.useCallback(e=>{if(!n.isActive)return;const r=n.startY-n.currentY,i=Math.abs(r),w=Date.now()-n.startTime,a=i/w,v=8,C=.15,S=5,H=n.isIntentionalGesture?.7:1;let j=!1;if(n.isDragging&&n.isIntentionalGesture){const I=v*H,_=C*H;a>_?(j=!0,console.log("🚀 Flick gesture detected:",{velocity:a,threshold:_})):i>I?(j=!0,console.log("🚀 Swipe gesture detected:",{distance:i,threshold:I})):i>S&&(j=!0,console.log("🚀 Snap gesture detected:",{distance:i,threshold:S}))}else n.isDragging&&!n.isIntentionalGesture&&(a>C*1.2||i>v*1.5)&&(j=!0,console.log("🚀 Fallback gesture detected"));if(j)a>C?(g.current?.classList.add("momentum-fast"),setTimeout(()=>{g.current?.classList.remove("momentum-fast")},100)):(g.current?.classList.add("momentum-slow"),setTimeout(()=>{g.current?.classList.remove("momentum-slow")},250)),r>0?o||(h(!0),f(!1),console.log("🔄 Drawer opened via swipe up")):o&&(h(!1),console.log("🔄 Drawer closed via swipe down"));else{const I=g.current?.getBoundingClientRect(),_=o?I?.height*.4:120;I&&n.startY>I.top&&n.startY<I.top+_&&(c?(f(!1),h(!0),console.log("🔄 Drawer opened via tap on swipe zone")):o?(h(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(h(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}E({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[n,o,c]),O=t.useCallback(()=>{c?(f(!1),h(b.expanded||!0),s(b.showDisclaimer),Z(b.showVerification),b.verificationCode&&(d(b.verificationCode),b.verificationCode.length===4&&z("filled")),b.phoneNumber&&F(b.phoneNumber)):o||(h(!0),b.showDisclaimer&&!u&&s(!0))},[c,o,b,u]),L=t.useCallback(e=>{e.stopPropagation(),c&&f(!1),h(!0),y(!0),setTimeout(()=>{y(!1)},1e4)},[c]);return p.jsxs(p.Fragment,{children:[p.jsx("style",{children:`
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
        `}),p.jsxs("div",{ref:g,className:`mobile-drawer ${o?"expanded":"collapsed"} ${l?"disclaimer-peek":""}`,onTouchStart:V,onTouchMove:B,onTouchEnd:m,onWheel:e=>{e.stopPropagation(),e.preventDefault()},style:{height:M(),transform:c?"translate3d(0, 100%, 0)":o?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:O,role:"dialog","aria-label":"Contact form drawer","aria-expanded":o,children:[p.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:p.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),p.jsxs("div",{className:`drawer-content mobile-drawer-content ${u?"verification-mode":""}`,onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const r=e.currentTarget,{scrollTop:i,scrollHeight:w,clientHeight:a}=r;e.stopPropagation();const v=i===0,C=i+a>=w,S=e.touches[0],H=S.clientY-(S.pageY||S.clientY);(v&&H>0||C&&H<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:c?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!c&&!u&&p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),!c&&!u&&p.jsx("div",{onClick:L,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",flexShrink:0},children:p.jsx(U,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,style:{width:"100%",height:k?"200px":"160px",border:"none",borderRadius:"8px",background:"transparent",display:"block",transition:"opacity 0.3s ease, height 0.3s ease",pointerEvents:"auto"}})}),(c||u)&&console.log("🚫 Laylo iframe hidden:",{drawerFullyClosed:c,showVerification:u})]})]})]})};export{q as M};
