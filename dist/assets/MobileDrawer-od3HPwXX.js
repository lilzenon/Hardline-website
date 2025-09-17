import{j as p}from"./index-DQVPi8EC.js";import{b as t}from"./vendor-ViNJc2wV.js";const K=()=>{const[y,N]=t.useState(!1),[H,Y]=t.useState(0),j=3,A=1e4,u="https://embed.laylo.com/laylo-sdk.js";t.useCallback(()=>typeof window<"u"&&(window.Laylo!==void 0||document.querySelector(`script[src="${u}"]`)!==null),[]);const n=t.useCallback(()=>new Promise((d,D)=>{if(document.querySelector(`script[src="${u}"]`)){const M=()=>{window.Laylo||document.readyState==="complete"?d():setTimeout(M,100)};M();return}const r=document.createElement("script");r.src=u,r.async=!0;const b=setTimeout(()=>{r.remove(),D(new Error("Script load timeout"))},A);r.onload=()=>{clearTimeout(b),setTimeout(d,200)},r.onerror=()=>{clearTimeout(b),r.remove(),D(new Error("Script load failed"))},document.head.appendChild(r)}),[]),g=t.useCallback(async(d=0)=>{if(!y)try{await n(),N(!0),console.log("🎉 Laylo SDK ready")}catch(D){if(d<j-1){const a=Math.pow(2,d)*1e3;Y(d+1),console.warn(`⚠️ Laylo SDK load failed (attempt ${d+1}), retrying in ${a}ms...`),setTimeout(()=>g(d+1),a)}else console.error("❌ Laylo SDK failed to load after retries:",D.message)}},[y,n]);return t.useEffect(()=>{g(0)},[g]),y},G=({dropId:y,color:N="ff0409",theme:H="dark",background:Y="solid",minimal:j=!0,style:A={},visible:u=!0})=>{const[n,g]=t.useState(0),[d,D]=t.useState(0),a=t.useRef(0),r=t.useRef(null),b=t.useRef(!1),M=2,i=7e3,R=t.useMemo(()=>{if(typeof navigator>"u")return!1;const s=navigator.userAgent,h=/AppleWebKit/i.test(s),v=/iP(hone|od|ad)|Mobile/i.test(s),C=/CriOS/i.test(s),e=/FxiOS/i.test(s);return h&&v&&!C&&!e},[]),[k,O]=t.useState(null),f=t.useRef(u),x=t.useRef(0),I=1e3,P=s=>(s||"")+((s||"").includes("?")?"&":"?")+"_ts="+Date.now(),w=t.useMemo(()=>y?`https://embed.laylo.com/?${new URLSearchParams({dropId:y,color:N,theme:H,background:Y,...j&&{minimal:"true"}}).toString()}`:null,[y,N,H,Y,j]),E=(s,h)=>{const v=new Date().toISOString();console.log(`[LayloSimple ${v}] ${s}`,h??"")};t.useEffect(()=>{const s=!f.current&&u;if(!u){r.current&&(clearTimeout(r.current),r.current=null),f.current=u;return}if(!s){f.current=u;return}if(D(0),a.current=Date.now(),b.current=!1,E("Visible -> ensuring iframe src",{retryCount:0,url:w}),R){O(null);const h=setTimeout(()=>{const v=P(w);x.current=Date.now(),O(v)},180);return f.current=u,()=>{clearTimeout(h),r.current&&(clearTimeout(r.current),r.current=null)}}else k||(x.current=Date.now(),O(w));f.current=u},[u,w,R,k]),t.useEffect(()=>{if(!R)return;const s=v=>{if(v.persisted&&u){const C=Date.now();C-x.current>I&&(E("pageshow (persisted) -> refreshing iframe src (iOS)"),x.current=C,b.current=!1,O(null),setTimeout(()=>{O(P(w))},180))}},h=()=>{if(document.visibilityState==="visible"&&u){const v=Date.now();v-x.current>I&&(E("visibilitychange -> visible; refreshing iframe src (iOS)"),x.current=v,O(C=>C??P(w)))}};return window.addEventListener("pageshow",s),document.addEventListener("visibilitychange",h),()=>{window.removeEventListener("pageshow",s),document.removeEventListener("visibilitychange",h)}},[R,u,w]);const W=()=>{const s=Date.now()-(a.current||0);b.current=!0,r.current&&(clearTimeout(r.current),r.current=null),E("Iframe onLoad fired",{elapsedMs:s})},B=s=>{if(E("Iframe onError",{error:s}),r.current&&(clearTimeout(r.current),r.current=null),d<M){E("Error -> retry (src bust)",{retryCount:d+1}),D(v=>v+1);const h=Date.now();h-x.current>I&&(x.current=h,a.current=Date.now(),b.current=!1,O(P(w)))}else E("Final error -> giving up after max retries")};return t.useEffect(()=>{if(!(!u||!k))return r.current&&(clearTimeout(r.current),r.current=null),a.current=Date.now(),r.current=setTimeout(()=>{if(!b.current)if(d<M){E("Load timeout -> retry (src bust)",{retryCount:d+1}),D(h=>h+1);const s=Date.now();s-x.current>I&&(x.current=s,O(P(w)))}else E("Final load timeout -> giving up after max retries")},i),()=>{r.current&&(clearTimeout(r.current),r.current=null)}},[k,u,d,w]),y?u?p.jsx("iframe",{id:`laylo-drop-${y}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",allow:"web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture",loading:"eager",onLoad:W,onError:B,style:{...A,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",display:"block"},src:k??w},n):p.jsx("div",{style:{...A}}):p.jsx("div",{style:{...A,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:p.jsx("span",{style:{color:"#999",fontSize:14},children:"[LayloSimple] Missing dropId"})})},V=({contentRef:y,viewportContext:N={isRealMobileDevice:!1},onStateChange:H=()=>{}})=>{const[Y,j]=t.useState("");t.useState(!1);const[A,u]=t.useState(!1);t.useState("us"),t.useState("normal");const[n,g]=t.useState(!1),[d,D]=t.useState(!1),[a,r]=t.useState(!0),[b,M]=t.useState(!1);t.useState(!1),t.useState(0),K(),t.useState(!1);const[i,R]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[k,O]=t.useState({expanded:!1,showDisclaimer:!1,phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const f=t.useRef(null);t.useRef(null);const x=t.useCallback(()=>{O({expanded:n,showDisclaimer:d,phoneNumber:Y}),console.log("💾 Drawer state saved, iframe content preserved")},[n,d,Y]),I=t.useCallback(e=>{f.current&&!f.current.contains(e.target)&&(x(),g(!1),r(!1),D(!1))},[Y,x]);t.useEffect(()=>(n&&(document.addEventListener("mousedown",I),document.addEventListener("touchstart",I)),()=>{document.removeEventListener("mousedown",I),document.removeEventListener("touchstart",I)}),[n,I]),t.useEffect(()=>{const e=document.body,o=y?.current;if(n){const c=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${c}px`,o&&o.classList.add("drawer-active")}else{e.classList.remove("drawer-scroll-lock");const c=e.style.top;e.style.top="",c&&window.scrollTo(0,parseInt(c||"0")*-1),o&&o.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",o&&o.classList.remove("drawer-active")}},[n,y]);const P=t.useRef({drawerExpanded:void 0,drawerFullyClosed:void 0,iframeExpanded:void 0,phoneSubmitted:void 0});t.useEffect(()=>{const e={drawerExpanded:n,drawerFullyClosed:a,iframeExpanded:b,phoneSubmitted:A},o=P.current;(o.drawerExpanded!==e.drawerExpanded||o.drawerFullyClosed!==e.drawerFullyClosed||o.iframeExpanded!==e.iframeExpanded||o.phoneSubmitted!==e.phoneSubmitted)&&(P.current=e,H(e))},[n,a,b,A,H]),t.useRef(!1),t.useEffect(()=>{},[a]);const w=t.useCallback(()=>a?"50px":b?"320px":n?"280px":"80px",[a,n,d,b]);t.useCallback(()=>{const e=w(),o=(()=>{const m="ontouchstart"in window||navigator.maxTouchPoints>0,l=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),S=window.innerWidth,L=window.innerHeight,T=S/L;return m&&l&&(T<1.5||S<768)})(),c=parseInt(e.replace("px",""));if(o)return`calc(${e} + 20px)`;{const m=Math.max(15,c*.2);return`calc(${e} + ${m}px)`}},[w,N]);const E=t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],c=Date.now(),m=e.target.closest(".mobile-drawer-content"),l=f.current?.getBoundingClientRect(),S=l&&o.clientY>l.top&&o.clientY<l.top+120,L=n?l?.height*.4:120,T=l&&o.clientY>l.top&&o.clientY<l.top+L;R({isActive:!0,startY:o.clientY,currentY:o.clientY,startTime:c,isDragging:!1,initialDrawerState:n,isOnDrawerContent:!!m,isOnDrawerHandle:!!S,isOnSwipeZone:!!T,dragDistance:0,isIntentionalGesture:!1}),T&&!m&&(e.preventDefault(),e.stopPropagation())},[n]),W=t.useCallback(e=>{if(!i.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="BUTTON"||e.target.closest("iframe")||e.target.closest("button")||e.target.closest('[role="button"]'))return;const o=e.touches[0],c=i.startY-o.clientY,m=Math.abs(c);if(!i.isDragging&&m>3&&i.isOnSwipeZone&&!i.isOnDrawerContent){const l=m>8||m>3&&Date.now()-i.startTime>100;R(S=>({...S,isDragging:!0,isIntentionalGesture:l,dragDistance:m})),l&&(e.preventDefault(),e.stopPropagation())}if(i.isDragging&&i.isOnSwipeZone&&!i.isOnDrawerContent){const l=Math.max(m,i.dragDistance);i.isIntentionalGesture&&(e.preventDefault(),e.stopPropagation()),R(S=>({...S,currentY:o.clientY,dragDistance:l}))}else i.isOnDrawerContent||R(l=>({...l,currentY:o.clientY}))},[i]),B=t.useCallback(e=>{if(!i.isActive)return;const o=i.startY-i.currentY,c=Math.abs(o),m=Date.now()-i.startTime,l=c/m,S=8,L=.15,T=5,z=i.isIntentionalGesture?.7:1;let Z=!1;if(i.isDragging&&i.isIntentionalGesture){const F=S*z,$=L*z;l>$?(Z=!0,console.log("🚀 Flick gesture detected:",{velocity:l,threshold:$})):c>F?(Z=!0,console.log("🚀 Swipe gesture detected:",{distance:c,threshold:F})):c>T&&(Z=!0,console.log("🚀 Snap gesture detected:",{distance:c,threshold:T}))}else i.isDragging&&!i.isIntentionalGesture&&(l>L*1.2||c>S*1.5)&&(Z=!0,console.log("🚀 Fallback gesture detected"));if(Z)l>L?(f.current?.classList.add("momentum-fast"),setTimeout(()=>{f.current?.classList.remove("momentum-fast")},100)):(f.current?.classList.add("momentum-slow"),setTimeout(()=>{f.current?.classList.remove("momentum-slow")},250)),o>0?n||(g(!0),r(!1),console.log("🔄 Drawer opened via swipe up")):n&&(g(!1),console.log("🔄 Drawer closed via swipe down"));else{const F=f.current?.getBoundingClientRect(),$=n?F?.height*.4:120;F&&i.startY>F.top&&i.startY<F.top+$&&(a?(r(!1),g(!0),console.log("🔄 Drawer opened via tap on swipe zone")):n?(g(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(g(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}R({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[i,n,a]),s=t.useCallback(()=>{a?(r(!1),g(k.expanded||!0),D(k.showDisclaimer),k.phoneNumber&&j(k.phoneNumber)):n||(g(!0),k.showDisclaimer&&D(!0))},[a,n,k]),h=t.useCallback(e=>{e.stopPropagation(),a&&r(!1),g(!0),M(!0),setTimeout(()=>{M(!1)},1e4)},[a]),v=!a,C=n;return p.jsxs(p.Fragment,{children:[p.jsx("style",{children:`
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
        `}),p.jsxs("div",{ref:f,className:`mobile-drawer ${n?"expanded":"collapsed"} ${d?"disclaimer-peek":""}`,onTouchStart:E,onTouchMove:W,onTouchEnd:B,onWheel:e=>{n&&(e.stopPropagation(),e.preventDefault())},style:{height:w(),transform:a?"translate3d(0, 100%, 0)":n?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:s,role:"dialog","aria-label":"Contact form drawer","aria-expanded":n,children:[p.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:p.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),p.jsxs("div",{className:"drawer-content mobile-drawer-content",onTouchStart:e=>{e.stopPropagation()},onTouchMove:e=>{const o=e.currentTarget,{scrollTop:c,scrollHeight:m,clientHeight:l}=o;e.stopPropagation();const S=c===0,L=c+l>=m,T=e.touches[0],z=T.clientY-(T.pageY||T.clientY);(S&&z>0||L&&z<0)&&e.preventDefault()},onWheel:e=>{e.stopPropagation()},onTouchEnd:e=>{e.stopPropagation()},style:{padding:"0 20px 20px",opacity:a?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!a&&p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),p.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),p.jsx("div",{onClick:h,"aria-hidden":!C,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",zIndex:2,flexShrink:0,opacity:C?1:0,height:C?b?"200px":"160px":40,pointerEvents:C?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:v&&p.jsx(G,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:C,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})})]})]})]})};export{V as M};
