import{j as n,B as it}from"./index-C-8Rqk4o.js";import{b as t}from"./vendor-ViNJc2wV.js";import{u as nt,M as ot}from"./MobileNavigation-vR8nD3FW.js";import{u as at,a as rt}from"./HomePage-BFeg_yjb.js";import{S as st}from"./SocialMediaButtons-DIYcTG2E.js";import"./usePerformantResize-Fo8ytToz.js";import"./beacon-CzvgH2JC.js";import"./mobileOptimization-ILGdA5i5.js";import"./sanitizer-DLy7XXh4.js";const lt=()=>{const[a,v]=t.useState(!1),[T,h]=t.useState(0),o=3,F=1e4,m="https://embed.laylo.com/laylo-sdk.js";t.useCallback(()=>typeof window<"u"&&(window.Laylo!==void 0||document.querySelector(`script[src="${m}"]`)!==null),[]);const p=t.useCallback(()=>new Promise((x,P)=>{if(document.querySelector(`script[src="${m}"]`)){const B=()=>{window.Laylo||document.readyState==="complete"?x():setTimeout(B,100)};B();return}const d=document.createElement("script");d.src=m,d.async=!0;const O=setTimeout(()=>{d.remove(),P(new Error("Script load timeout"))},F);d.onload=()=>{clearTimeout(O),setTimeout(x,200)},d.onerror=()=>{clearTimeout(O),d.remove(),P(new Error("Script load failed"))},document.head.appendChild(d)}),[]),H=t.useCallback(async(x=0)=>{if(!a)try{await p(),v(!0),console.log("🎉 Laylo SDK ready")}catch(P){if(x<o-1){const M=Math.pow(2,x)*1e3;h(x+1),console.warn(`⚠️ Laylo SDK load failed (attempt ${x+1}), retrying in ${M}ms...`),setTimeout(()=>H(x+1),M)}else console.error("❌ Laylo SDK failed to load after retries:",P.message)}},[a,p]);return t.useEffect(()=>{H(0)},[H]),a},ct=({dropId:a,color:v="ff0409",theme:T="dark",background:h="solid",minimal:o=!0,style:F={},visible:m=!0})=>{const[p,H]=t.useState(0),[x,P]=t.useState(0),M=t.useRef(0),d=t.useRef(null),O=t.useRef(!1),B=2,K=7e3,re=t.useMemo(()=>{if(typeof navigator>"u")return!1;const I=navigator.userAgent,S=/AppleWebKit/i.test(I),u=/iP(hone|od|ad)|Mobile/i.test(I),E=/CriOS/i.test(I),le=/FxiOS/i.test(I);return S&&u&&!E&&!le},[]),[te,w]=t.useState(null),D=t.useRef(m),L=t.useRef(0),f=1e3,G=I=>(I||"")+((I||"").includes("?")?"&":"?")+"_ts="+Date.now(),y=t.useMemo(()=>a?`https://embed.laylo.com/?${new URLSearchParams({dropId:a,color:v,theme:T,background:h,...o&&{minimal:"true"}}).toString()}`:null,[a,v,T,h,o]),W=(I,S)=>{const u=new Date().toISOString();console.log(`[LayloSimple ${u}] ${I}`,S??"")};t.useEffect(()=>{const I=!D.current&&m;if(!m){d.current&&(clearTimeout(d.current),d.current=null),D.current=m;return}if(!I){D.current=m;return}if(P(0),M.current=Date.now(),O.current=!1,W("Visible -> ensuring iframe src",{retryCount:0,url:y}),re){w(null);const S=setTimeout(()=>{const u=G(y);L.current=Date.now(),w(u)},180);return D.current=m,()=>{clearTimeout(S),d.current&&(clearTimeout(d.current),d.current=null)}}else te||(L.current=Date.now(),w(y));D.current=m},[m,y,re,te]),t.useEffect(()=>{if(!re)return;const I=u=>{if(u.persisted&&m){const E=Date.now();E-L.current>f&&(W("pageshow (persisted) -> refreshing iframe src (iOS)"),L.current=E,O.current=!1,w(null),setTimeout(()=>{w(G(y))},180))}},S=()=>{if(document.visibilityState==="visible"&&m){const u=Date.now();u-L.current>f&&(W("visibilitychange -> visible; refreshing iframe src (iOS)"),L.current=u,w(E=>E??G(y)))}};return window.addEventListener("pageshow",I),document.addEventListener("visibilitychange",S),()=>{window.removeEventListener("pageshow",I),document.removeEventListener("visibilitychange",S)}},[re,m,y]);const U=()=>{const I=Date.now()-(M.current||0);O.current=!0,d.current&&(clearTimeout(d.current),d.current=null),W("Iframe onLoad fired",{elapsedMs:I})},Q=I=>{if(W("Iframe onError",{error:I}),d.current&&(clearTimeout(d.current),d.current=null),x<B){W("Error -> retry (src bust)",{retryCount:x+1}),P(u=>u+1);const S=Date.now();S-L.current>f&&(L.current=S,M.current=Date.now(),O.current=!1,w(G(y)))}else W("Final error -> giving up after max retries")};return t.useEffect(()=>{if(!(!m||!te))return d.current&&(clearTimeout(d.current),d.current=null),M.current=Date.now(),d.current=setTimeout(()=>{if(!O.current)if(x<B){W("Load timeout -> retry (src bust)",{retryCount:x+1}),P(S=>S+1);const I=Date.now();I-L.current>f&&(L.current=I,w(G(y)))}else W("Final load timeout -> giving up after max retries")},K),()=>{d.current&&(clearTimeout(d.current),d.current=null)}},[te,m,x,y]),a?m?n.jsx("iframe",{id:`laylo-drop-${a}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",allow:"web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture",loading:"eager",onLoad:U,onError:Q,style:{...F,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",display:"block"},src:te??y},p):n.jsx("div",{style:{...F}}):n.jsx("div",{style:{...F,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:n.jsx("span",{style:{color:"#999",fontSize:14},children:"[LayloSimple] Missing dropId"})})},dt=({contentRef:a,viewportContext:v={isRealMobileDevice:!1},onStateChange:T=()=>{}})=>{const[h,o]=t.useState("");t.useState(!1);const[F,m]=t.useState(!1);t.useState("us"),t.useState("normal");const[p,H]=t.useState(!1),[x,P]=t.useState(!1),[M,d]=t.useState(!1),[O,B]=t.useState(!1),[K,re]=t.useState(!1);t.useState(0);const te=lt();t.useState(!1);const w=!M&&te,D=w,L=p,[f,G]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1}),[y,W]=t.useState({expanded:!1,showDisclaimer:!1,phoneNumber:""});t.useState(!1),t.useRef(null),t.useRef(null);const U=t.useRef(null);t.useRef(null);const Q=t.useCallback(()=>{W({expanded:p,showDisclaimer:x,phoneNumber:h}),console.log("💾 Drawer state saved, iframe content preserved")},[p,x,h]),I=t.useCallback(r=>{U.current&&!U.current.contains(r.target)&&(Q(),H(!1),d(!1),P(!1))},[h,Q]);t.useEffect(()=>(p&&(document.addEventListener("mousedown",I),document.addEventListener("touchstart",I)),()=>{document.removeEventListener("mousedown",I),document.removeEventListener("touchstart",I)}),[p,I]),t.useEffect(()=>{const r=document.body,b=a?.current;if(p){const j=window.scrollY;r.classList.add("drawer-scroll-lock"),r.style.top=`-${j}px`,b&&b.classList.add("drawer-active")}else{r.classList.remove("drawer-scroll-lock");const j=r.style.top;r.style.top="",j&&window.scrollTo(0,parseInt(j||"0")*-1),b&&b.classList.remove("drawer-active")}return()=>{r.classList.remove("drawer-scroll-lock"),r.style.top="",b&&b.classList.remove("drawer-active")}},[p,a]);const S=t.useRef({drawerExpanded:void 0,drawerFullyClosed:void 0,iframeExpanded:void 0,phoneSubmitted:void 0});t.useEffect(()=>{const r={drawerExpanded:p,drawerFullyClosed:M,iframeExpanded:O,phoneSubmitted:F},b=S.current;(b.drawerExpanded!==r.drawerExpanded||b.drawerFullyClosed!==r.drawerFullyClosed||b.iframeExpanded!==r.iframeExpanded||b.phoneSubmitted!==r.phoneSubmitted)&&(S.current=r,T(r))},[p,M,O,F,T]),t.useRef(!1),t.useEffect(()=>{},[M]),t.useEffect(()=>{if(w&&te&&!K){const r=setTimeout(()=>{re(!0),console.log("✅ Laylo iframe ready for interaction")},1e3);return()=>clearTimeout(r)}},[w,te,K]);const u=t.useCallback(()=>M?"50px":O?"320px":p?"280px":"80px",[M,p,x,O]);t.useCallback(()=>{const r=u(),b=(()=>{const A="ontouchstart"in window||navigator.maxTouchPoints>0,k=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Z=window.innerWidth,V=window.innerHeight,$=Z/V;return A&&k&&($<1.5||Z<768)})(),j=parseInt(r.replace("px",""));if(b)return`calc(${r} + 20px)`;{const A=Math.max(15,j*.2);return`calc(${r} + ${A}px)`}},[u,v]);const E=t.useCallback(r=>{if(r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA"||r.target.tagName==="BUTTON"||r.target.closest("iframe")||r.target.closest("button")||r.target.closest('[role="button"]'))return;const b=r.touches[0],j=Date.now(),A=r.target.closest(".mobile-drawer-content"),k=U.current?.getBoundingClientRect(),Z=k&&b.clientY>k.top&&b.clientY<k.top+120,V=p?k?.height*.4:120,$=k&&b.clientY>k.top&&b.clientY<k.top+V;G({isActive:!0,startY:b.clientY,currentY:b.clientY,startTime:j,isDragging:!1,initialDrawerState:p,isOnDrawerContent:!!A,isOnDrawerHandle:!!Z,isOnSwipeZone:!!$,dragDistance:0,isIntentionalGesture:!1}),$&&!A&&(r.preventDefault(),r.stopPropagation())},[p]),le=t.useCallback(r=>{if(!f.isActive||r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA"||r.target.tagName==="BUTTON"||r.target.closest("iframe")||r.target.closest("button")||r.target.closest('[role="button"]'))return;const b=r.touches[0],j=f.startY-b.clientY,A=Math.abs(j);if(!f.isDragging&&A>3&&f.isOnSwipeZone&&!f.isOnDrawerContent){const k=A>8||A>3&&Date.now()-f.startTime>100;G(Z=>({...Z,isDragging:!0,isIntentionalGesture:k,dragDistance:A})),k&&(r.preventDefault(),r.stopPropagation())}if(f.isDragging&&f.isOnSwipeZone&&!f.isOnDrawerContent){const k=Math.max(A,f.dragDistance);f.isIntentionalGesture&&(r.preventDefault(),r.stopPropagation()),G(Z=>({...Z,currentY:b.clientY,dragDistance:k}))}else f.isOnDrawerContent||G(k=>({...k,currentY:b.clientY}))},[f]),oe=t.useCallback(r=>{if(!f.isActive)return;const b=f.startY-f.currentY,j=Math.abs(b),A=Date.now()-f.startTime,k=j/A,Z=8,V=.15,$=5,R=f.isIntentionalGesture?.7:1;let X=!1;if(f.isDragging&&f.isIntentionalGesture){const _=Z*R,z=V*R;k>z?(X=!0,console.log("🚀 Flick gesture detected:",{velocity:k,threshold:z})):j>_?(X=!0,console.log("🚀 Swipe gesture detected:",{distance:j,threshold:_})):j>$&&(X=!0,console.log("🚀 Snap gesture detected:",{distance:j,threshold:$}))}else f.isDragging&&!f.isIntentionalGesture&&(k>V*1.2||j>Z*1.5)&&(X=!0,console.log("🚀 Fallback gesture detected"));if(X)k>V?(U.current?.classList.add("momentum-fast"),setTimeout(()=>{U.current?.classList.remove("momentum-fast")},100)):(U.current?.classList.add("momentum-slow"),setTimeout(()=>{U.current?.classList.remove("momentum-slow")},250)),b>0?p||(H(!0),d(!1),console.log("🔄 Drawer opened via swipe up")):p&&(H(!1),console.log("🔄 Drawer closed via swipe down"));else{const _=U.current?.getBoundingClientRect(),z=p?_?.height*.4:120;_&&f.startY>_.top&&f.startY<_.top+z&&(M?(d(!1),H(!0),console.log("🔄 Drawer opened via tap on swipe zone")):p?(H(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(H(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}G({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1})},[f,p,M]),se=t.useCallback(()=>{M?(d(!1),H(y.expanded||!0),P(y.showDisclaimer),y.phoneNumber&&o(y.phoneNumber)):p||(H(!0),y.showDisclaimer&&P(!0))},[M,p,y]),Y=t.useCallback(r=>{r.stopPropagation(),M&&d(!1),H(!0),B(!0),setTimeout(()=>{B(!1)},1e4)},[M]);return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsxs("div",{ref:U,className:`mobile-drawer ${p?"expanded":"collapsed"} ${x?"disclaimer-peek":""}`,onTouchStart:E,onTouchMove:le,onTouchEnd:oe,onWheel:r=>{p&&(r.stopPropagation(),r.preventDefault())},style:{height:u(),transform:M?"translate3d(0, 100%, 0)":p?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:se,role:"dialog","aria-label":"Contact form drawer","aria-expanded":p,children:[n.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:n.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),n.jsxs("div",{className:"drawer-content mobile-drawer-content",onTouchStart:r=>{r.stopPropagation()},onTouchMove:r=>{const b=r.currentTarget,{scrollTop:j,scrollHeight:A,clientHeight:k}=b;r.stopPropagation();const Z=j===0,V=j+k>=A,$=r.touches[0],R=$.clientY-($.pageY||$.clientY);(Z&&R>0||V&&R<0)&&r.preventDefault()},onWheel:r=>{r.stopPropagation()},onTouchEnd:r=>{r.stopPropagation()},style:{padding:"0 20px 20px",opacity:M?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!M&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),n.jsx("div",{onClick:Y,"aria-hidden":!D,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",zIndex:2,flexShrink:0,opacity:L?1:0,height:L?O?"200px":"160px":40,pointerEvents:L?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:w&&n.jsx(ct,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:D,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})})]})]})]})},ye=(a,v=null)=>{if(!a)return a;if(typeof a=="string"&&a.startsWith("data:"))return console.log("⚠️ Data URL detected, returning as-is:",a.substring(0,50)+"..."),a;const T=/iPad|iPhone|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);if(typeof a=="string"&&a.includes("/api/images/serve/")){console.log("🔄 Processing new image system URL:",a);const h=a.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);if(h){const o=h[1],F=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";let m="small";v&&(v<=150?m="thumbnail":v<=300?m="small":v<=600?m="medium":(v<=1200,m="large"));const p=`${F}/api/images/serve/${o}/${m}`;return console.log("✅ Generated optimized URL for new image system:",p,`(variant: ${m}, width: ${v})`),p}}if(typeof a=="string"&&a.includes("/images/figma-exact/")){const h=a.split("/").pop();return T&&h.includes(".webp")?`/images/optimized/${h.replace(".webp",".jpg")}`:`/images/optimized/${h}`}if(typeof a=="string"&&a.startsWith("http")){const h=encodeURIComponent(a),F=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/images/proxy-optimized?url=${h}`,m=T?"&format=jpeg&quality=85":"";return v?`${F}&w=${v}${m}`:`${F}${m}`}if(typeof a=="string"&&a.startsWith("/")&&(a.includes("/api/images/serve/")||!a.includes("/images/"))){console.log("🔄 Processing relative URL, assuming new image system:",a);const h=a.match(/([a-f0-9-]{36})/);if(h){const o=h[1],m=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/serve/${o}/medium`;return console.log("✅ Generated URL for UUID-based relative path:",m),m}}if(typeof a=="string"&&(a.includes("/images/")||a.includes("/custom/images/"))){const o=a.split("/").pop().replace(/\.[^/.]+$/,"");return v?`/images/optimized/${o}-${v}w.webp`:`/images/optimized/${o}.webp`}return console.log("⚠️ No optimization applied to URL:",a),a},Ue=a=>a==="event"?[150,300,450]:a==="hero"?[600,900,1200]:[150,300,600],mt=(a,v="event")=>a?Ue(v).map(T=>`${ye(a,T)} ${T}w`).join(", "):"",pt=(a,v="event")=>{if(!a||/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return"";if(typeof a=="string"&&(a.includes("/api/images/serve/")||a.includes("/api/settings/serve/")||a.startsWith("/api/")))return console.log("🚫 Skipping AVIF for internal API URL to prevent loop:",a),"";const h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";return Ue(v).map(o=>`${h}/images/proxy-optimized?url=${encodeURIComponent(a)}&w=${o}&format=avif ${o}w`).join(", ")},Ie=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"7911 123456",maxLength:13,digitLength:11},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+",pattern:/^\d{9}$/,placeholder:"412 345 678",maxLength:11,digitLength:9},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"30 12345678",maxLength:13,digitLength:11},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=",pattern:/^\d{9}$/,placeholder:"6 12 34 56 78",maxLength:12,digitLength:9},{id:"es",code:"+34",name:"Spain",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"612 34 56 78",maxLength:11,digitLength:9},{id:"it",code:"+39",name:"Italy",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"312 345 6789",maxLength:12,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"90 1234 5678",maxLength:13,digitLength:11},{id:"kr",code:"+82",name:"South Korea",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"10 1234 5678",maxLength:13,digitLength:11},{id:"cn",code:"+86",name:"China",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+",pattern:/^\d{11}$/,placeholder:"138 0013 8000",maxLength:13,digitLength:11},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:12,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"11 91234 5678",maxLength:14,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:12,digitLength:10}],Ge=(a,v)=>{const T=typeof a=="string"?a.replace(/[^\d]/g,""):"",h=Ie.find(F=>F.id===v);if(!h||T.length===0)return T;const o=T.slice(0,h.digitLength);switch(v){case"us":case"ca":return o.length<=3?o:o.length<=6?`(${o.slice(0,3)}) ${o.slice(3)}`:`(${o.slice(0,3)}) ${o.slice(3,6)}-${o.slice(6)}`;case"gb":return o.length<=4?o:o.length<=7?`${o.slice(0,4)} ${o.slice(4)}`:`${o.slice(0,4)} ${o.slice(4,7)} ${o.slice(7)}`;case"jp":case"kr":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;case"cn":return o.length<=3?o:o.length<=7?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,7)} ${o.slice(7)}`;case"in":return o.length<=5?o:`${o.slice(0,5)} ${o.slice(5)}`;case"br":return o.length<=2?o:o.length<=7?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,7)} ${o.slice(7)}`;case"mx":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;default:return o.length<=3?o:o.length<=6?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,6)} ${o.slice(6)}`}},ut=(a,v)=>{const T=a.replace(/[^\d]/g,""),h=Ie.find(o=>o.id===v);return h?h.pattern.test(T):T.length>=10&&T.length<=15},Ce=a=>Ie.find(v=>v.id===a)||Ie[0],Mt=()=>{const{trackEvent:a}=at(),[v,T]=t.useState(!1);t.useCallback(e=>{T(e),e&&a("privacy_consent",{action:"granted",timestamp:Date.now(),component:"PrivacyConsentModal"})},[a]);const[h,o]=t.useState(!0),[F,m]=t.useState(!1);t.useEffect(()=>{setTimeout(()=>{o(!1),m(!0)},2e3),a("component_load",{component:"FigmaMobile",viewport_type:"mobile"})},[a]),t.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=s=>{console.warn("⚠️ Laylo SDK failed to load in FigmaMobile:",s)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in FigmaMobile")},document.head.appendChild(e)}},[]);const[p,H]=t.useState(!1),[x,P]=t.useState(""),[M,d]=t.useState(!1),[O,B]=t.useState(!1),[K,re]=t.useState("us"),[te,w]=t.useState("normal"),[D,L]=t.useState(!1),[f,G]=t.useState(""),[y,W]=t.useState(""),[U,Q]=t.useState(!1),[I,S]=t.useState("normal"),[u,E]=t.useState(!1),[le,oe]=t.useState(!1),[se,Y]=t.useState(!1),[r,b]=t.useState(!1);t.useState(!1);const[j,A]=t.useState(0),[k,Z]=t.useState(!1),[V,$]=t.useState(!1),[R,X]=t.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1}),{loading:_,showAllEvents:z,setShowAllEvents:Se,filteredFeaturedEvents:ce,filteredHomepageEvents:ue}=rt(),[Ee,$e]=t.useState(0),[ge,Ye]=t.useState(!1),[fe,Ve]=t.useState(!1),[q,Ae]=t.useState(null),[Ne,Le]=t.useState(!1),ze=t.useCallback((e,s)=>{if(Ne)return;Le(!0);let i=e.coverImage;i&&!i.startsWith("http")&&(i=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}${i}`),i&&(i=i.replace(/[?&](w|width|h|height|size)=\d+/g,""),i=i.replace(/[?&]$/,"")),Ae({...e,imageUrl:i||e.coverImage,originalRect:s?.getBoundingClientRect()||null}),setTimeout(()=>{Le(!1)},400)},[Ne]),Pe=t.useCallback(()=>{Ae(null)},[]),[xe,de]=t.useState("hd720"),[Ze,me]=t.useState("fast"),[ie,ke]=t.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""}),Fe=t.useCallback(()=>{ke({expanded:u,showDisclaimer:le,showVerification:D,verificationCode:f,phoneNumber:x}),console.log("💾 Drawer state saved, iframe content preserved")},[u,le,D,f,x]),[gt,Me]=t.useState(!1),ae=t.useRef(null),De=t.useRef(null),N=t.useRef(null),we=t.useRef(!0),je=t.useRef(null),ve=t.useRef(null),{scrollY:Je}=nt(ve.current,{threshold:20,throttleMs:32,passive:!0});t.useEffect(()=>{const e=document.body,s=ve.current;if(u){const i=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${i}px`,s&&s.classList.add("drawer-active")}else{const i=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",i&&window.scrollTo(0,parseInt(i||"0")*-1),s&&s.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",s&&s.classList.remove("drawer-active")}},[u]),t.useCallback(e=>{const s=e.target.value,i=Ce(K),l=s.replace(/[^\d]/g,"");if(l.length>i.digitLength)return;const c=Ge(l,K);P(c)},[K]),t.useCallback(e=>{e.key==="Enter"&&Ke()},[]),t.useCallback(e=>{const s=e.target.value,i=Ce(s);if(re(s),De.current&&i.flag&&(De.current.src=i.flag,De.current.alt=i.name),x){const l=x.replace(/[^\d]/g,""),c=Ge(l,s);P(c)}console.log(`🌍 Country changed to: ${i.code} (${i.name})`)},[x]);const Ke=t.useCallback(async()=>{const e=x.trim();if(!e||M)return;if(e.replace(/\D/g,"")==="5555555555"){console.log("🧪 Test number detected - showing loading then verification UI"),d(!0),w("loading"),setTimeout(()=>{w("valid"),W(e),d(!1),setTimeout(()=>{L(!0),E(!0)},200)},800);return}const l=Ce(K);if(!ut(e,K)){console.warn("Invalid phone number format for",l.name),w("invalid"),ae.current&&(ae.current.classList.add("shake"),setTimeout(()=>{ae.current?.classList.remove("shake"),w("normal")},400));return}try{d(!0),w("loading"),console.log("📱 Submitting phone number:",{phone:e,countryCode:l.code});const c=window.location.hostname==="localhost"?"":"https://admin.b2b.click",g=await fetch(`${c}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:l.code})}),C=await g.json();g.ok&&C.success?(console.log("✅ Phone number submitted successfully"),C.requiresVerification?(console.log("🔐 Moving to verification step"),w("normal"),W(e),setTimeout(()=>{L(!0),E(!0)},500)):(B(!0),w("valid"),P(""),setTimeout(()=>{B(!1),w("normal")},3e3))):(console.error("❌ Failed to submit phone number:",C.error||"Unknown error"),w("invalid"),ae.current&&(ae.current.classList.add("shake"),setTimeout(()=>{ae.current?.classList.remove("shake"),w("normal")},400)))}catch(c){console.error("❌ Error submitting phone number:",c),w("invalid"),ae.current&&(ae.current.classList.add("shake"),setTimeout(()=>{ae.current?.classList.remove("shake"),w("normal")},400))}finally{d(!1)}},[x,M,K]);t.useCallback(async()=>{const e=f.trim();if(!e||U)return;if(y.replace(/\D/g,"")==="5555555555"&&(console.log("🧪 Test verification - accepting any 4-digit code"),e.length===4)){Q(!0),w("loading"),setTimeout(()=>{S("valid"),B(!0),Q(!1)},1e3),setTimeout(()=>{Y(!0),L(!1),E(!1),oe(!1)},2e3),setTimeout(()=>{G(""),W(""),P(""),B(!1),w("normal"),S("normal"),Q(!1),Y(!1),A(0),Z(!1),N.current&&(clearInterval(N.current),N.current=null),ke({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3);return}if(!/^\d{4}$/.test(e)){console.warn("Invalid verification code format"),S("invalid"),setTimeout(()=>{S("filled")},400);return}try{Q(!0),w("loading"),console.log("🔐 Submitting verification code");const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click",c=await fetch(`${l}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:y,code:e})}),g=await c.json();c.ok&&g.success?(console.log("✅ Phone verification successful"),S("valid"),B(!0),setTimeout(()=>{Y(!0),L(!1),E(!1),oe(!1)},2e3),setTimeout(()=>{G(""),W(""),P(""),B(!1),w("normal"),S("normal"),Q(!1),Y(!1),A(0),Z(!1),N.current&&(clearInterval(N.current),N.current=null),ke({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3)):(console.error("❌ Phone verification failed:",g.error||"Unknown error"),S("invalid"),setTimeout(()=>{S("filled")},400))}catch(l){console.error("❌ Error submitting verification code:",l),S("invalid"),setTimeout(()=>{S("filled")},400)}finally{Q(!1)}},[f,U,y]);const be=t.useCallback(()=>{console.log("🚀 Starting countdown timer"),N.current&&(clearInterval(N.current),N.current=null),A(60),Z(!1),N.current=setInterval(()=>{if(!we.current){N.current&&(clearInterval(N.current),N.current=null);return}A(e=>(console.log("⏰ Countdown tick:",e),e<=1?(console.log("✅ Countdown finished, enabling resend"),we.current&&Z(!0),N.current&&(clearInterval(N.current),N.current=null),0):e-1))},1e3)},[]);t.useCallback(async()=>{if(!(!k||V||!y))try{$(!0),console.log("🔄 Resending verification code to:",y);const e=window.location.hostname==="localhost"?"":"https://admin.b2b.click",i=await(await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:y})})).json();i.success?(console.log("✅ Verification code resent successfully"),be()):(console.error("❌ Failed to resend verification code:",i.error),be())}catch(e){console.error("❌ Error resending verification code:",e),be()}finally{$(!1)}},[k,V,y,be]),t.useEffect(()=>(we.current=!0,()=>{we.current=!1,N.current&&(clearInterval(N.current),N.current=null)}),[]),t.useEffect(()=>{!D&&N.current&&(clearInterval(N.current),N.current=null,A(0),Z(!1))},[D]),t.useEffect(()=>{console.log("🔄 Countdown useEffect triggered:",{showVerification:D,verificationPhone:y,resendCountdown:j,canResend:k}),D&&y&&j===0&&!k&&(console.log("🚀 Starting resend countdown"),be())},[D,y,be]),t.useEffect(()=>{_||(setTimeout(()=>{Ye(!0)},150),setTimeout(()=>{Ve(!0)},300))},[_]),t.useEffect(()=>{const e=setTimeout(()=>{Y(!1),E(!1)},500);return()=>clearTimeout(e)},[]),t.useEffect(()=>{const s=setTimeout(()=>{if("connection"in navigator){const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(c){const g=c.effectiveType,C=c.downlink;console.log("🌐 Connection detected:",{effectiveType:g,downlink:C}),g==="4g"&&C>5?(de("hd1080"),me("fast")):g==="4g"||g==="3g"&&C>2?(de("hd720"),me("medium")):(de("large"),me("slow"));return}}const i=performance.now(),l=new Image;l.onload=()=>{const g=performance.now()-i;console.log("🚀 Speed test completed in:",g+"ms"),g<200?(de("hd1080"),me("fast")):g<500?(de("hd720"),me("medium")):(de("large"),me("slow"))},l.onerror=()=>{console.log("⚠️ Speed test failed, using default HD quality"),de("hd720"),me("medium")},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},200);return()=>clearTimeout(s)},[]),t.useEffect(()=>{if(ce&&ce.length>0){console.log("🚀 Preloading critical event images for instant display...");const e=/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);ce.slice(0,2).forEach((s,i)=>{if(s.coverImage){if(!e&&!s.coverImage.includes("/api/images/serve/")){const c=document.createElement("link");c.rel="preload",c.as="image",c.type="image/avif";const g=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";c.href=`${g}/images/proxy-optimized?url=${encodeURIComponent(s.coverImage)}&w=120&format=avif`,document.head.appendChild(c)}const l=document.createElement("link");if(l.rel="preload",l.as="image",l.type="image/webp",l.href=ye(s.coverImage,300),document.head.appendChild(l),e){const c=document.createElement("link");c.rel="preload",c.as="image",c.href=s.coverImage,document.head.appendChild(c)}console.log(`✅ Preloaded mobile event image ${i+1}: ${s.title} ${e?"(Safari mobile optimized)":""}`)}})}},[ce]);const[pe,Re]=t.useState(!1),[ft,Te]=t.useState(!1),He=()=>{pe?(Re(!1),Te(!1)):(Te(!0),Re(!0),setTimeout(()=>Te(!1),600))},We=()=>{const e=window.location.pathname;return e==="/"||e===""?"events":e.startsWith("/about")?"about":e.startsWith("/contact")?"contact":"events"},[Qe,Xe]=t.useState(We());t.useEffect(()=>{const e=()=>{Xe(We())};return window.addEventListener("popstate",e),e(),()=>{window.removeEventListener("popstate",e)}},[]);const _e=e=>{if(e==="/"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};t.useCallback(()=>{E(!0),oe(!0)},[]),t.useCallback(()=>{!x.trim()&&!D&&setTimeout(()=>{E(!1),oe(!1)},200)},[x,D]);const he=t.useCallback(e=>{je.current&&!je.current.contains(e.target)&&(Fe(),E(!1),D?Y(!1):(Y(!1),oe(!1)))},[x,D,Fe]);t.useEffect(()=>(u&&(document.addEventListener("mousedown",he),document.addEventListener("touchstart",he)),()=>{document.removeEventListener("mousedown",he),document.removeEventListener("touchstart",he)}),[u,he]);const Oe=t.useCallback(()=>se?"50px":r?"320px":D&&u?"240px":D&&!u?"60px":u?"280px":"80px",[se,D,u,le,r]),qe=t.useCallback(()=>{const e=Oe(),s=(()=>{const l="ontouchstart"in window||navigator.maxTouchPoints>0,c=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),g=window.innerWidth,C=window.screen.width,ee=window.devicePixelRatio||1;return l&&c&&Math.abs(g-C)<50&&ee>1})(),i=parseInt(e.replace("px",""));if(s)return`calc(${e} + 20px)`;{const l=Math.max(15,i*.2);return`calc(${e} + ${l}px)`}},[Oe,Ee]);t.useEffect(()=>{const e=()=>{$e(s=>s+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),e(),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),t.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],i=Date.now();X({isActive:!0,startY:s.clientY,currentY:s.clientY,startTime:i,isDragging:!1,initialDrawerState:u})},[u]),t.useCallback(e=>{if(!R.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],i=R.startY-s.clientY,l=Math.abs(i);!R.isDragging&&l>10&&(X(c=>({...c,isDragging:!0})),e.preventDefault()),R.isDragging&&(X(c=>({...c,currentY:s.clientY})),e.preventDefault())},[R]),t.useCallback(e=>{if(!R.isActive)return;if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe")){X({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1});return}const s=R.startY-R.currentY,i=Math.abs(s),l=Date.now()-R.startTime,c=i/l,g=30,C=.5,ee=50;let ne=!1;if(R.isDragging&&((c>C||i>g||i>ee)&&(ne=!0),ne)){const J=je.current;J&&(J.classList.remove("momentum-fast","momentum-slow"),c>C?J.classList.add("momentum-fast"):J.classList.add("momentum-slow"),setTimeout(()=>{J&&J.classList.remove("momentum-fast","momentum-slow")},250)),s>0?u||(E(!0),Y(!1)):u&&E(!1)}X({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1})},[R,u]),t.useCallback(()=>{se?(Y(!1),E(ie.expanded||!0),oe(ie.showDisclaimer),L(ie.showVerification),ie.verificationCode&&(G(ie.verificationCode),ie.verificationCode.length===4&&S("filled")),ie.phoneNumber&&P(ie.phoneNumber)):u||(E(!0),ie.showDisclaimer&&!D&&oe(!0))},[se,u,ie,D]),t.useCallback(e=>{e.stopPropagation(),se&&Y(!1),E(!0),b(!0),setTimeout(()=>{b(!1)},1e4)},[se]),t.useCallback(()=>{Me(!0)},[]),t.useCallback(()=>{Me(!1)},[]),t.useCallback(()=>{Me(!1)},[]),t.useEffect(()=>{const e=document.querySelector('meta[name="viewport"]'),s=e?e.getAttribute("content"):"";let i=document.querySelector('meta[name="viewport"]');i||(i=document.createElement("meta"),i.name="viewport",document.head.appendChild(i)),i.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no";const l=(ee,ne)=>{let J=document.querySelector(`meta[name="${ee}"]`);J||(J=document.createElement("meta"),J.name=ee,document.head.appendChild(J)),J.content=ne};l("apple-mobile-web-app-capable","yes"),l("apple-mobile-web-app-status-bar-style","black-translucent"),l("apple-touch-fullscreen","yes"),l("mobile-web-app-capable","yes"),l("format-detection","telephone=no"),document.documentElement.style.webkitTextSizeAdjust="100%",document.documentElement.style.textSizeAdjust="100%";let c=null,g=null;const C=()=>{c&&cancelAnimationFrame(c),g&&clearTimeout(g),g=setTimeout(()=>{c=requestAnimationFrame(()=>{const ee=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${ee}px`)})},100)};return C(),window.addEventListener("resize",C,{passive:!0}),window.addEventListener("orientationchange",C,{passive:!0}),()=>{e&&s&&e.setAttribute("content",s),window.removeEventListener("resize",C),window.removeEventListener("orientationchange",C),c&&cancelAnimationFrame(c),g&&clearTimeout(g)}},[]);const et=t.useMemo(()=>{const e="https://www.youtube.com/embed/vEHTO3gf1jk",l={...{autoplay:"1",mute:"1",controls:"0",showinfo:"0",rel:"0",loop:"1",playlist:"vEHTO3gf1jk",modestbranding:"1",iv_load_policy:"3",fs:"0",disablekb:"1",hd:"1",cc_load_policy:"0",autohide:"1",wmode:"transparent",enablejsapi:"1",origin:window.location.origin},...{vq:xe,quality:xe}},c=Object.entries(l).map(([C,ee])=>`${C}=${ee}`).join("&"),g=`${e}?${c}`;return console.log("🎥 YouTube URL built:",{videoQuality:xe,connectionSpeed:Ze,finalURL:g}),g},[xe,Ze]),Be=t.useCallback(()=>{o(!1),m(!0),a("video_interaction",{action:"thumbnail_click",video_id:"vEHTO3gf1jk",component:"FigmaMobile"})},[a]),tt=t.useMemo(()=>n.jsx("div",{onClick:Be,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",cursor:"pointer",backgroundImage:"url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transition:"transform 0.2s ease-out"},onMouseDown:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onTouchStart:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"}}),[Be]);return _?n.jsx(it,{fullScreen:!0,minDisplayTime:600,showMessage:!1}):n.jsxs(n.Fragment,{children:[n.jsx("link",{rel:"stylesheet",href:"/css/mobile-scroll-fix.css"}),n.jsx("style",{children:`
          /* 📱 CSS CUSTOM PROPERTIES FOR PERFECT BACKGROUND MATCHING & ULTRA-SMOOTH ANIMATIONS */
          :root {
            --mobile-bg-primary: #161616;
            --mobile-bg-secondary: #000000;
            --mobile-bg-rgba-primary: 22, 22, 22;
            --mobile-bg-rgba-secondary: 0, 0, 0;
            /* 🎬 OPTIMIZED: Modern animation timing based on best practices (25% faster) */
            --animation-duration-fast: 150ms;
            --animation-duration-normal: 225ms;
            --animation-duration-slow: 300ms;
            --animation-easing-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            --animation-easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
            --animation-easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
            --animation-stagger-delay: 100ms;
            /* Legacy support - gradually migrate away from these */
            --ultra-smooth-duration: var(--animation-duration-normal);
            --ultra-smooth-easing: var(--animation-easing-standard);
            --smooth-easing-fast: var(--animation-easing-decelerate);
            /* Performance optimization variables */
            --gpu-acceleration: translateZ(0);
            --smooth-rendering: antialiased;
          }

          /* 🎯 ACCESSIBILITY: Respect user's motion preferences */
          @media (prefers-reduced-motion: reduce) {
            :root {
              /* 🚨 PRESERVE NAVIGATION: Keep navigation animation variables for UX */
              /* --animation-duration-fast: 0ms; COMMENTED OUT - navigation needs these */
              /* --animation-duration-normal: 0ms; COMMENTED OUT - navigation needs these */
              /* --animation-duration-slow: 0ms; COMMENTED OUT - navigation needs these */
              --animation-stagger-delay: 0ms;
              --ultra-smooth-duration: 0ms;
            }
            /* 🚨 FIXED: Only target page content, NOT navigation elements */
            .mobile-content-container *,
            .mobile-content-container *::before,
            .mobile-content-container *::after,
            .mobile-event-cards-container *,
            .mobile-event-cards-container *::before,
            .mobile-event-cards-container *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
            /* 🚨 CRITICAL: Preserve navigation animations for UX */
            .mobile-navigation-header,
            .mobile-navigation-header *,
            .mobile-nav-overlay,
            .mobile-nav-overlay *,
            .mobile-nav-item,
            .mobile-nav-item *,
            .mobile-menu-button,
            .mobile-menu-button * {
              /* Preserve component-defined durations; do not override here */
            }
          }

          /* Mobile device specific fixes for real device compatibility */
          html, body {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            touch-action: manipulation;
            overscroll-behavior: none;
          }

          /* iOS Safari specific fixes for viewport height issues */
          @supports (-webkit-touch-callout: none) {
            .mobile-content-container {
              height: -webkit-fill-available !important;
              min-height: -webkit-fill-available !important;
            }
          }

          /* Comprehensive Safari iOS WebKit Optimizations */

          /* Prevent iOS Safari zoom on input focus */
          input[type="tel"], input[type="text"], select {
            font-size: 16px !important;
            transform-origin: left top;
            font-family: 'Inter', sans-serif;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 0;
          }

          /* Prevent zoom and ensure proper viewport */
          * {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* 📱 MOBILE SCROLL PERFORMANCE FIX - Ultra-stable approach */
          html, body {
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Enable native momentum scrolling */
            -webkit-overflow-scrolling: auto;
            /* Essential mobile optimizations only */
            -webkit-text-size-adjust: 100%;
            touch-action: manipulation;
            /* Remove forced hardware acceleration */
            transform: none;
            will-change: auto;
            /* FIXED: Prevent any scroll position manipulation */
            scroll-snap-type: none;
            -webkit-scroll-snap-type: none;
            /* Ensure stable layout during scroll */
            contain: layout;
          }

          /* Fix mobile viewport without breaking scroll */
          html, body {
            width: 100%;
            height: 100%;
            overflow: visible; /* Allow natural scrolling */
            overscroll-behavior: contain; /* Prevent scroll chaining only */
          }

          /* FIXED: Mobile container with proper overflow control */
          .mobile-container {
            position: relative !important;
            width: 100vw !important;
            height: 100vh !important;
            height: -webkit-fill-available !important;
            /* 🚨 CRITICAL: Control overflow to prevent footer/hidden elements from showing */
            overflow: hidden !important;
            /* Ensure proper scroll containment */
            overscroll-behavior: contain !important;
            -webkit-overscroll-behavior: contain !important;
            /* 🚨 CRITICAL: Prevent any content from escaping container bounds */
            isolation: isolate !important;
          }

          /* Optimize touch interactions for iOS */
          .mobile-drawer, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-drawer {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          /* Modern iOS-style scrollbar - hidden by default, appears on scroll */
          .mobile-content-container {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }

          .mobile-content-container::-webkit-scrollbar {
            width: 0px; /* Hide scrollbar by default */
            background: transparent;
          }

          /* Show thin scrollbar only when actively scrolling */
          .mobile-content-container:hover::-webkit-scrollbar,
          .mobile-content-container:active::-webkit-scrollbar {
            width: 3px;
          }

          .mobile-content-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .mobile-content-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: background 0.2s ease;
          }

          .mobile-content-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* 🚨 REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */
          /* This prevents conflicts with the MobileNavigation component's own CSS */

          /* 📱 OPTIMIZED MOBILE SCROLL CONTAINER */
          .mobile-content-container {
            /* Native iOS momentum scrolling */
            -webkit-overflow-scrolling: touch;
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Prevent scroll chaining */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Disable scroll snapping that causes jitter */
            scroll-snap-type: none;
            /* Allow only vertical scrolling */
            touch-action: pan-y;
            /* Minimal rendering optimization */
            contain: layout style;
            /* Remove will-change to prevent unnecessary compositing */
            will-change: auto;
            /* Minimal hardware acceleration */
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .mobile-phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .mobile-phone-input:focus {
            outline: none;
            font-size: 16px !important;
          }

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: All mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */
          .mobile-send-button:hover:not(:disabled) {
            transform: scale(1.05);
            transition: transform 0.2s ease;
          }
          .mobile-send-button:active:not(:disabled) {
            transform: scale(0.95);
          }

          /* Shake animation for validation errors */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }

          /* 📱 ULTRA-SMOOTH EXPANDABLE EVENT CARDS SECTION */
          .mobile-event-cards-container {
            position: relative;
            overflow: hidden;
            background: #000000; /* Match main page background - pure black */
            /* 🎬 OPTIMIZED: Smooth animation with reasonable timing */
            transition:
              max-height var(--animation-duration-slow) var(--animation-easing-standard),
              transform var(--animation-duration-slow) var(--animation-easing-standard),
              opacity var(--animation-duration-slow) var(--animation-easing-standard);
            /* GPU acceleration for smooth performance */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            /* Optimize rendering for ultra-smooth performance */
            contain: layout style paint;
            transform-style: preserve-3d;
            /* Additional performance optimizations */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Prevent layout thrashing during animation */
            overflow-anchor: none;
          }

          .mobile-event-cards-container.collapsed {
            /* Show exactly 3 complete cards with balanced vertical spacing */
            max-height: calc(3 * 136px + 16px + 100px); /* 3 cards (408px) + padding (16px) + gradient space (100px) */
            /* Additional smoothness optimizations for collapsed state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          .mobile-event-cards-container.expanded {
            max-height: 2000px; /* Large enough for all cards */
            /* Additional smoothness optimizations for expanded state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          /* Ultra-smooth professional gradient overlay */
          .mobile-event-cards-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px; /* Increased height for more gradual fade effect */
            /* Ultra-smooth gradient with 10 stops to eliminate banding */
            background: linear-gradient(
              to bottom,
              /* Extended transparent area at top to show more of third card */
              transparent 0%,
              transparent 40%,
              /* More gradual fade progression for smoother visual flow */
              rgba(0, 0, 0, 0.05) 42%,
              rgba(0, 0, 0, 0.12) 45%,
              rgba(0, 0, 0, 0.22) 48%,
              rgba(0, 0, 0, 0.35) 52%,
              rgba(0, 0, 0, 0.50) 56%,
              rgba(0, 0, 0, 0.65) 60%,
              rgba(0, 0, 0, 0.78) 65%,
              rgba(0, 0, 0, 0.90) 70%,
              rgba(0, 0, 0, 0.96) 75%,
              /* Solid black area for button placement */
              #000000 78%,
              #000000 100%
            );
            /* Minimal blur for performance while maintaining quality */
            backdrop-filter: blur(0.5px);
            -webkit-backdrop-filter: blur(0.5px);
            pointer-events: none;
            /* 🎬 OPTIMIZED: Reasonable transition timing for better performance */
            transition:
              opacity var(--animation-duration-normal) var(--animation-easing-standard),
              transform var(--animation-duration-normal) var(--animation-easing-standard);
            /* GPU acceleration for smooth overlay animation */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            transform: translateZ(0);
            z-index: 2;
          }

          /* Refined progressive blur overlay for smooth transitions */
          .mobile-event-cards-overlay::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* Ultra-smooth blur mask matching main gradient progression */
            background: linear-gradient(
              to bottom,
              /* Top 30%: No blur mask for clear visibility */
              transparent 0%,
              transparent 30%,
              /* Smooth blur progression from 30% to 70% */
              rgba(0, 0, 0, 0.03) 35%,
              rgba(0, 0, 0, 0.06) 40%,
              rgba(0, 0, 0, 0.10) 45%,
              rgba(0, 0, 0, 0.14) 50%,
              rgba(0, 0, 0, 0.18) 55%,
              rgba(0, 0, 0, 0.22) 60%,
              rgba(0, 0, 0, 0.26) 65%,
              rgba(0, 0, 0, 0.28) 68%,
              /* Consistent blur for bottom 30% solid area */
              rgba(0, 0, 0, 0.30) 70%,
              rgba(0, 0, 0, 0.30) 100%
            );
            /* Optimized blur for smooth performance */
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            pointer-events: none;
            z-index: 1;
          }



          .mobile-event-cards-overlay.hidden {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          /* Modern expand/collapse handle - matching View Event button style */
          .mobile-expand-handle {
            position: absolute;
            bottom: 12px; /* Default position for collapsed state */
            left: 50%;
            transform: translateX(-50%) translateZ(0); /* Center horizontally + GPU acceleration */
            z-index: 5; /* Above all gradient layers */
            width: 120px; /* Wider to match button proportions */
            height: 32px; /* Consistent with View Event button height */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 46px; /* Match View Event button border radius */
            /* Dark glassmorphism matching View Event buttons */
            background: rgba(23, 23, 23, 0.8);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: none; /* Clean look like View Event buttons */
            /* Typography matching View Event buttons */
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            /* Only animate background color - keep button position stable */
            transition: background-color 0.2s ease;
            /* GPU acceleration for smooth rendering */
            backface-visibility: hidden;
            touch-action: manipulation;
            box-sizing: border-box;
          }

          .mobile-expand-handle:hover {
            background: rgba(23, 23, 23, 0.9);
            /* No transform changes - keep button position stable */
          }

          .mobile-expand-handle:active {
            background: rgba(23, 23, 23, 0.7);
            /* No transform changes - keep button position stable */
          }

          /* Expanded state positioning - move button below all cards */
          .mobile-expand-handle.expanded {
            position: relative;
            bottom: auto;
            margin: 12px auto 0 auto; /* Reduced from 16px to 12px (~25% reduction) for closer positioning */
            transform: translateZ(0); /* Keep GPU acceleration, no other transforms */
            left: auto;
          }

          /* Modern centered chevron icon - ultra-smooth animation */
          .mobile-expand-chevron {
            width: 12px;
            height: 12px;
            border-right: 2px solid rgba(255, 255, 255, 0.9);
            border-bottom: 2px solid rgba(255, 255, 255, 0.9);
            border-radius: 0 1px 0 0;
            transform: rotate(45deg);
            /* Ultra-smooth chevron rotation with GPU acceleration */
            transition:
              transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0),
              border-color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
            will-change: transform, border-color;
            backface-visibility: hidden;
            transform-origin: center;
            margin: 0;
            position: relative;
            top: -1px;
          }

          .mobile-expand-chevron.expanded {
            transform: rotate(-135deg);
            border-color: rgba(255, 255, 255, 1);
            top: 1px;
          }

          /* Simplified event card styling - no individual animations during expand/collapse */
          .mobile-event-card-item {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          /* Advanced smooth animation keyframes for ultra-fluid motion */
          @keyframes ultraSmoothExpand {
            0% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
          }

          @keyframes ultraSmoothCollapse {
            0% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
          }

          /* Enhanced animation classes for ultra-smooth transitions */
          .mobile-event-cards-container.animating-expand {
            animation: ultraSmoothExpand 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          .mobile-event-cards-container.animating-collapse {
            animation: ultraSmoothCollapse 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          /* Respect user motion preferences - FIXED: Only disable event card animations, not navigation */
          @media (prefers-reduced-motion: reduce) {
            .mobile-event-cards-container,
            .mobile-event-cards-overlay,
            .mobile-expand-handle,
            .mobile-expand-chevron,
            .mobile-event-card-item {
              transition: none !important;
              animation: none !important;
            }
            /* IMPORTANT: Do NOT disable navigation animations - they are essential for UX */
          }

          /* Mobile country selector styling */
          .mobile-country-select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFFFFF;
            border-radius: 8px;
            padding: 4px 8px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            outline: none;
          }
          .mobile-country-select option {
            background: #000000;
            color: #FFFFFF;
          }

          /* Mobile verification input styling */
          .mobile-verification-input {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            font-size: 16px; /* Minimum 16px to prevent iOS zoom */
            font-weight: 600;
            text-align: center;
            outline: none;
          }
          .mobile-verification-input:focus {
            border-color: #00FF40;
            box-shadow: 0 0 0 2px rgba(0, 255, 64, 0.2);
          }

          /* Spinner animation for mobile SEND button */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @-moz-keyframes spin {
            0% { -moz-transform: rotate(0deg); }
            100% { -moz-transform: rotate(360deg); }
          }

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
            transition: transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            transform-origin: bottom center !important;
            /* 🚨 CRITICAL: Highest z-index to ensure drawer stays above all content */
            z-index: 9999 !important;
            will-change: auto !important;
            backface-visibility: hidden !important;
            perspective: 1000px !important;
            /* ENHANCED: Complete scroll isolation for iOS Safari */
            touch-action: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            /* Complete containment isolation */
            contain: strict !important;
            /* 🚨 CRITICAL: Ensure drawer maintains fixed position on mobile */
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            /* iOS Safari specific optimizations */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            /* Prevent scroll bleed completely */
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
            /* FIXED: Hide scrollbars while maintaining functionality */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
            /* Strict touch action for drawer content only */
            touch-action: pan-y pinch-zoom;
            /* Complete containment isolation */
            contain: strict;
            /* Prevent any scroll events from bubbling */
            position: relative;
            z-index: 1000;
            /* iOS momentum scrolling optimization */
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

          /* CRITICAL: Disable ONLY drawer content interaction when collapsed, keep handle clickable */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* ENSURE: Drawer handle remains clickable even when collapsed */
          .mobile-drawer.collapsed {
            pointer-events: auto !important; /* Allow clicks on the drawer container */
          }

          .mobile-drawer.collapsed > * {
            pointer-events: none !important; /* Disable all children */
          }

          .mobile-drawer.collapsed .drawer-handle,
          .mobile-drawer.collapsed [role="dialog"] {
            pointer-events: auto !important; /* Re-enable handle and dialog clicks */
          }

          /* CRITICAL: Disable drawer content interaction when parent is collapsed */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
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

          /* 🚨 FIXED: Only target drawer elements, NOT navigation overlays */
          .mobile-drawer[style*="position: fixed"][style*="z-index"] {
            position: fixed !important;
            z-index: 9999 !important;
            /* Let MobileDrawer component control its own transitions */
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
            /* CRITICAL: Disable content interaction when collapsed, but allow handle clicks */
            overflow: hidden !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
            /* Enable interaction when expanded */
            pointer-events: auto;
            touch-action: pan-y;
            overflow: visible;
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            position: relative;
            overflow: hidden;
          }

          .disclaimer-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(to bottom, transparent 0%, rgba(35, 35, 35, 0.95) 100%);
            pointer-events: none;
            transition: opacity 0.4s ease;
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* 🎬 OPTIMIZED: Modern card animation with subtle, natural motion */
          @keyframes modernCardSpring {
            0% {
              opacity: 0;
              transform: translate3d(0, 16px, 0) scale(0.96);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, -1px, 0) scale(1.005);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .event-card-spring {
            animation: modernCardSpring var(--animation-duration-normal) var(--animation-easing-standard) forwards;
            will-change: transform, opacity; /* Only when animating */
            backface-visibility: hidden;
            transform-style: flat;
            -webkit-font-smoothing: antialiased;
            contain: layout style;
          }

          .event-card-hidden {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.95); /* More dramatic initial state */
            backface-visibility: hidden;
          }

          /* Expanded Image Modal Animations */
          @keyframes expandedImageFadeIn {
            0% {
              opacity: 0;
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
              background-color: rgba(0, 0, 0, 0);
            }
            100% {
              opacity: 1;
              backdrop-filter: blur(60px);
              -webkit-backdrop-filter: blur(60px);
              background-color: rgba(0, 0, 0, 0.15);
            }
          }

          @keyframes expandedImageScale {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(20px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes expandedButtonsSlideUp {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Responsive adjustments for small mobile devices */
          @media (max-width: 375px) {
            .mobile-content-container {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }

            .mobile-drawer {
              left: 15px !important;
              right: 15px !important;
              width: calc(100% - 30px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-content-container {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }

          /* Responsive adjustments for event card content on small screens */
          @media (max-width: 375px) {
            .card-clickable-area {
              left: 120px !important; /* Reduce left margin for more text space */
              right: 4px !important; /* Reduce right margin */
            }
          }

          @media (max-width: 320px) {
            .card-clickable-area {
              left: 110px !important; /* Further reduce left margin */
              right: 2px !important; /* Minimal right margin */
            }
          }
        `}),n.jsxs("div",{className:"mobile-container",style:{background:"#000000",fontFamily:"Inter, sans-serif"},role:"main","aria-label":"BOUNCE2BOUNCE Mobile Experience",children:[n.jsxs("main",{style:{width:"100vw",height:"100vh",maxWidth:"100vw",maxHeight:"100vh",margin:"0",position:"relative",background:"#000000",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:"100vh",minWidth:"100vw",isolation:"isolate",transform:"none",willChange:"auto",WebkitOverflowScrolling:"auto",WebkitTransform:"none",touchAction:"manipulation",overscrollBehavior:"contain"},"aria-label":"Mobile homepage content",children:[n.jsx(ot,{currentPage:Qe,scrollY:Je,onNavigate:_e,onMenuToggle:H}),n.jsxs("div",{ref:ve,className:"mobile-content-container",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",padding:"2px 0px 40px 0px",paddingBottom:qe(),boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",WebkitOverscrollBehavior:"contain",scrollBehavior:"auto",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"auto",touchAction:"pan-y",WebkitTouchCallout:"none",WebkitUserSelect:"none",scrollSnapType:"none",WebkitScrollSnapType:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},children:[n.jsxs("section",{"aria-labelledby":"events-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:fe?1:0,transform:fe?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"0ms"},children:[n.jsxs("div",{style:{display:"flex",width:"min(344px, calc(100vw - 4px))",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:[n.jsx("h2",{id:"events-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"normal",margin:0,textAlign:"left"},children:"Events"}),n.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:z?"rgba(111, 111, 111, 0.49)":"rgba(111, 111, 111, 0.69)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent"},onClick:()=>Se(!z),role:"switch","aria-checked":z,"aria-label":`Switch to ${z?"Past":"Next"} events`,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Se(!z))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[n.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:z?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:z?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:z?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Next"})}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:z?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:z?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),z&&ce.length>0&&n.jsx("div",{style:{width:"100%",transition:"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:z?1:0,transform:z?"translateY(0)":"translateY(-20px)",marginBottom:z?"20px":"0px",overflow:"hidden"},children:ce.map((e,s)=>n.jsx("div",{className:ge?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"6px",boxSizing:"border-box",display:"flex",justifyContent:"center",opacity:ge?1:0,transform:ge?"translateY(0) scale(1)":"translateY(20px) scale(0.96)",transition:"opacity var(--animation-duration-slow) var(--animation-easing-standard), transform var(--animation-duration-slow) var(--animation-easing-standard)",transitionDelay:ge?`${s*120}ms`:"0s"},children:n.jsxs("div",{onClick:i=>{console.log("🔍 Mobile Featured Event: Click detected!",i.target),i.preventDefault(),i.stopPropagation(),e?.ticketsUrl&&e.ticketsUrl!=="#"?(console.log(`🎫 Mobile Featured Event: Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")):(console.log("🎫 Mobile Featured Event: No ticket link available for",e?.title),console.log("🔍 Mobile Featured Event data:",e),console.log("🔍 Available fields:",Object.keys(e||{})))},style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onTouchStart:i=>{i.currentTarget.style.transform="scale(0.98)"},onTouchEnd:i=>{i.currentTarget.style.transform="scale(1)"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:e.coverImage?n.jsxs("picture",{children:[n.jsx("source",{srcSet:pt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:mt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:ye(e.coverImage,375),alt:`${e.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:",e.title),onError:i=>{console.error("❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:",i.target.src),i.target.dataset.heroFallbackAttempted?(i.target.removeAttribute("onError"),console.error("❌ Hero fallback also failed, removing error handler")):(i.target.dataset.heroFallbackAttempted="true",i.target.src="/images/optimized/hero-left-image-375w.jpg")},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):n.jsxs("picture",{children:[n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE DEFAULT HERO IMAGE LOADED"),onError:i=>console.error("❌ MOBILE DEFAULT HERO IMAGE FAILED:",i.target.src),style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px"},children:[n.jsxs("div",{style:{display:"flex",flex:"1",padding:"4px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:n.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:e.eventDate?new Date(e.eventDate).toLocaleDateString("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).replace(",","th,"):e.date||"March 29th, 9:00 P.M."})]}),n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[n.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),n.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0},children:e.location||"Asbury Park, NJ"})]})]}),n.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:n.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onTouchStart:i=>{i.stopPropagation(),i.target.style.transform="scale(0.95)",i.target.style.background="rgba(35, 35, 35, 0.98)",i.target.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:i=>{i.stopPropagation(),i.target.style.transform="scale(1)",i.target.style.background="rgba(15, 15, 15, 0.95)",i.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:i=>{i.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:e.isRealEvent&&e.hasTicketLink?e.buttonText||"Get Tickets":"View Event"})})})]}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box"},children:n.jsx("div",{style:{color:"#FFFFFF",fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"100%",margin:"0px 0px 8px 0px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",transform:"translateZ(0)",willChange:"transform"},children:e.title||"FEATURED EVENT"})})]})},`hero-${e.id}`))}),z&&ce.length===0&&ue.length>0&&n.jsx("div",{className:ge?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"20px",boxSizing:"border-box",display:"flex",justifyContent:"center"},children:n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",borderRadius:"20px",overflow:"hidden",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2},children:n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1"},children:"UPCOMING EVENTS"})})]})}),n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",margin:"0 auto",position:"relative",paddingBottom:ue.length>3?"12px":"0",background:"#000000"},children:[n.jsxs("div",{className:`mobile-event-cards-container ${pe?"expanded":"collapsed"}`,style:{width:"100%",position:"relative",background:"#000000"},children:[n.jsx("div",{role:"list","aria-label":"Upcoming live music events",style:{display:"flex",width:"100%",flexDirection:"column",justifyContent:"center",alignItems:"stretch",gap:"4px",flexShrink:0,padding:"8px 0",boxSizing:"border-box",minHeight:"auto",overflow:"visible",position:"relative",zIndex:1},children:ue.length>0?ue.map((e,s)=>n.jsx("article",{className:`mobile-event-card-item ${ge?"event-card-spring":"event-card-hidden"}`,style:{width:"100%",minHeight:"132px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform, opacity",zIndex:1,clear:"both"},children:n.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[n.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:i=>{i.preventDefault(),i.stopPropagation();const l=i.currentTarget.querySelector("img");ze(e,l)},onTouchStart:i=>{i.currentTarget.style.transform="scale(0.95)"},onTouchEnd:i=>{i.preventDefault(),i.stopPropagation(),i.currentTarget.style.transform="scale(1)";const l=i.currentTarget.querySelector("img");ze(e,l)},onTouchCancel:i=>{i.currentTarget.style.transform="scale(1)"},onMouseDown:i=>{i.currentTarget.style.transform="scale(0.95)"},onMouseUp:i=>{i.currentTarget.style.transform="scale(1)"},onMouseLeave:i=>{i.currentTarget.style.transform="scale(1)"},children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:(()=>{const i=ye(e.coverImage,120);return console.log(`🖼️ Loading homepage image for "${e.title}":`,{original:e.coverImage,optimized:i,isDataUrl:e.coverImage?.startsWith("data:"),isNewImageSystem:e.coverImage?.includes("/api/images/serve/"),hostname:window.location.hostname}),i})(),alt:`${e.title} event cover`,loading:"lazy",onError:i=>{const l=parseInt(i.target.dataset.fallbackAttempt||"0"),c=2,g=i.target.src,C=e.id||e.title;if(window.failedImages||(window.failedImages=new Set),window.failedImages.has(g)){console.log("🛑 Global circuit breaker: Image URL previously failed, using placeholder immediately"),i.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",i.target.dataset.fallbackAttempt="final",i.target.removeAttribute("onError");return}if(l>=c){console.log(`🛑 Circuit breaker: Max fallback attempts (${c}) reached for ${C}, using placeholder`),window.failedImages.add(g),i.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",i.target.dataset.fallbackAttempt="final",i.target.removeAttribute("onError");return}if(console.log(`❌ Homepage event image failed (attempt ${l+1}/${c}):`,C,"URL:",g),window.failedImages.add(g),g.includes("/api/images/serve/")&&(console.error("🚨 API image serving failed - check persistent storage pipeline"),console.error("📋 UUID extraction:",g.match(/\/api\/images\/serve\/([a-f0-9-]{36})/))),l===0){const ne=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/placeholder`;console.log("🔄 Trying dashboard placeholder:",ne),i.target.src=ne,i.target.dataset.fallbackAttempt="1";return}else if(l===1){console.log("🔄 Using final inline SVG placeholder"),i.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",i.target.dataset.fallbackAttempt="final",i.target.removeAttribute("onError");return}console.log("🔄 Safety fallback: Using inline SVG placeholder"),i.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",i.target.dataset.fallbackAttempt="final",i.target.removeAttribute("onError")},onLoad:i=>{delete i.target.dataset.fallbackAttempt,console.log("✅ Homepage event image loaded successfully:",e.title,i.target.src),i.target.style.backgroundColor="transparent"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),n.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[n.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[n.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"visible",textOverflow:"unset",whiteSpace:"normal",wordWrap:"break-word",hyphens:"auto"},children:e.title}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),n.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?n.jsx("button",{onClick:i=>{i.stopPropagation(),console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:i=>{i.currentTarget.style.transform="scale(1.02)",i.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:i=>{i.currentTarget.style.transform="scale(1)",i.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`)):n.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:.8},children:"No upcoming events"}),n.jsx("button",{type:"button","aria-label":"View Past Events",onClick:()=>Se(!1),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:"View Past Events"})]})}),!pe&&ue.length>3&&n.jsx("div",{className:"mobile-event-cards-overlay","aria-hidden":"true"})]}),ue.length>3&&n.jsx("div",{className:`mobile-expand-handle ${pe?"expanded":""}`,onClick:He,role:"button",tabIndex:0,"aria-label":pe?"Show fewer events":"Show more events","aria-expanded":pe,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),He())},style:{opacity:1,visibility:"visible"},children:n.jsx("div",{className:`mobile-expand-chevron ${pe?"expanded":""}`,"aria-hidden":"true"})})]})]}),n.jsxs("section",{"aria-labelledby":"follow-us-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:fe?1:0,transform:fe?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"150ms"},children:[n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:n.jsx("h2",{id:"follow-us-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"1.2",margin:0,textAlign:"left"},children:"Follow Us"})}),n.jsxs("article",{style:{width:"min(344px, calc(100vw - 4px))",height:"200px",position:"relative",flexShrink:0,margin:"0 auto",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},"aria-label":"Henry Fong live performance video",children:[n.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:[n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",transform:"translateZ(0)",willChange:"auto"},children:h?tt:F?n.jsx("iframe",{src:et,title:"Henry Fong YouTube Video - Adaptive Quality",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",loading:"lazy",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",transform:"translateZ(0)",pointerEvents:"none",border:"none",opacity:1,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"}}):n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",border:"none",transform:"translateZ(0)"}})}),n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"20px",zIndex:1,transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto",pointerEvents:"none"}})]}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"16px",display:"flex",width:"100%",height:"40px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"12px",zIndex:2,boxSizing:"border-box",pointerEvents:"none",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"2px",flex:"1"},children:[n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"18px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Watch on YouTube"}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"9px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live"})]}),n.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"90px",height:"36px",justifyContent:"center",alignItems:"center",pointerEvents:"auto",borderRadius:"18px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onTouchStart:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.background="rgba(58, 58, 58, 0.90)"},onTouchEnd:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"11px",fontWeight:"600",lineHeight:"normal"},children:"Watch now"})})]})]})]}),n.jsx("section",{style:{width:"100%",padding:"0",margin:"0",marginTop:"8px",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",opacity:fe?1:0,transform:fe?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"300ms"},children:n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto"},children:n.jsx(st,{})})})]}),n.jsx("footer",{style:{width:"100%",padding:"40px 16px 20px",textAlign:"center",background:"transparent",display:u?"none":"block",visibility:u?"hidden":"visible"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter",fontSize:"12px",fontWeight:"300",lineHeight:"1.5"},children:"© 2024 BOUNCE2BOUNCE. All rights reserved."})})]}),!p&&n.jsx(dt,{contentRef:ve,viewportContext:Ee,onStateChange:e=>{const{drawerExpanded:s,drawerFullyClosed:i}=e;console.log("Drawer state changed:",e,`status=${i?"fullyClosed":s?"expanded":"collapsed"}`)}})]}),q&&n.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.15)",backdropFilter:"blur(60px)",WebkitBackdropFilter:"blur(60px)",zIndex:1e3,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"20px",boxSizing:"border-box",animation:"expandedImageFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"},onClick:Pe,children:[n.jsx("div",{style:{width:"min(80vw, 80vh)",height:"min(80vw, 80vh)",aspectRatio:"1 / 1",borderRadius:"20px",overflow:"hidden",marginBottom:"20px",animation:"expandedImageScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.6)",border:"1px solid rgba(255, 255, 255, 0.1)",cursor:"pointer"},onClick:e=>e.stopPropagation(),children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:q.imageUrl,alt:q.title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})}),n.jsxs("div",{style:{display:"flex",gap:"16px",animation:"expandedButtonsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both"},onClick:e=>e.stopPropagation(),children:[n.jsx("button",{onClick:()=>{navigator.share?navigator.share({title:q.title,text:`Check out this event: ${q.title}`,url:window.location.href}):(navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!"))},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"80px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:"Share"}),q.isRealEvent&&q.hasTicketLink?n.jsx("button",{onClick:()=>{console.log(`🎫 Opening ticket link from modal for ${q.title}:`,q.ticketsUrl),window.open(q.ticketsUrl,"_blank","noopener,noreferrer"),Pe()},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"100px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:q.buttonText||"View Event"}):null]})]})]})};export{Mt as default};
