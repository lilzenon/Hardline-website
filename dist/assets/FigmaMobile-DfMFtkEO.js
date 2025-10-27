import{j as n,B as ct}from"./index-DaWmz4Ua.js";import{b as i}from"./vendor-ViNJc2wV.js";import{u as dt,a as mt,M as pt}from"./useNavHeight-BqSjr6xI.js";import{u as ut,a as gt}from"./HomePage-DTRakrxv.js";import{S as ft}from"./SocialMediaButtons-DTqN7HZd.js";import{i as bt,F as ht}from"./breadcrumbSchema-D-LHvs5s.js";import"./beacon-BB01f5iw.js";import"./mobileOptimization-ILGdA5i5.js";import"./sanitizer-CkYod_qL.js";const xt=()=>{const[r,y]=i.useState(!1),[A,h]=i.useState(0),o=3,W=1e4,u="https://embed.laylo.com/laylo-sdk.js";i.useCallback(()=>typeof window<"u"&&(window.Laylo!==void 0||document.querySelector(`script[src="${u}"]`)!==null),[]);const g=i.useCallback(()=>new Promise((w,R)=>{if(document.querySelector(`script[src="${u}"]`)){const U=()=>{window.Laylo||document.readyState==="complete"?w():setTimeout(U,100)};U();return}const d=document.createElement("script");d.src=u,d.async=!0;const G=setTimeout(()=>{d.remove(),R(new Error("Script load timeout"))},W);d.onload=()=>{clearTimeout(G),setTimeout(w,200)},d.onerror=()=>{clearTimeout(G),d.remove(),R(new Error("Script load failed"))},document.head.appendChild(d)}),[]),H=i.useCallback(async(w=0)=>{if(!r)try{await g(),y(!0),console.log("🎉 Laylo SDK ready")}catch(R){if(w<o-1){const k=Math.pow(2,w)*1e3;h(w+1),console.warn(`⚠️ Laylo SDK load failed (attempt ${w+1}), retrying in ${k}ms...`),setTimeout(()=>H(w+1),k)}else console.error("❌ Laylo SDK failed to load after retries:",R.message)}},[r,g]);return i.useEffect(()=>{H(0)},[H]),r},wt=({dropId:r,color:y="ff0409",theme:A="dark",background:h="solid",minimal:o=!0,style:W={},visible:u=!0})=>{const[g,H]=i.useState(0),[w,R]=i.useState(0),k=i.useRef(0),d=i.useRef(null),G=i.useRef(!1),U=2,q=7e3,le=i.useMemo(()=>{if(typeof navigator>"u")return!1;const D=navigator.userAgent,x=/AppleWebKit/i.test(D),b=/iP(hone|od|ad)|Mobile/i.test(D),T=/CriOS/i.test(D),ce=/FxiOS/i.test(D);return x&&b&&!T&&!ce},[]),[te,v]=i.useState(null),j=i.useRef(u),Z=i.useRef(0),m=1e3,B=D=>(D||"")+((D||"").includes("?")?"&":"?")+"_ts="+Date.now(),I=i.useMemo(()=>r?`https://embed.laylo.com/?${new URLSearchParams({dropId:r,color:y,theme:A,background:h,...o&&{minimal:"true"}}).toString()}`:null,[r,y,A,h,o]),O=(D,x)=>{const b=new Date().toISOString();console.log(`[LayloSimple ${b}] ${D}`,x??"")};i.useEffect(()=>{const D=!j.current&&u;if(!u){d.current&&(clearTimeout(d.current),d.current=null),j.current=u;return}if(!D){j.current=u;return}if(R(0),k.current=Date.now(),G.current=!1,O("Visible -> ensuring iframe src",{retryCount:0,url:I}),le){v(null);const x=setTimeout(()=>{const b=B(I);Z.current=Date.now(),v(b)},180);return j.current=u,()=>{clearTimeout(x),d.current&&(clearTimeout(d.current),d.current=null)}}else te||(Z.current=Date.now(),v(I));j.current=u},[u,I,le,te]),i.useEffect(()=>{if(!le)return;const D=b=>{if(b.persisted&&u){const T=Date.now();T-Z.current>m&&(O("pageshow (persisted) -> refreshing iframe src (iOS)"),Z.current=T,G.current=!1,v(null),setTimeout(()=>{v(B(I))},180))}},x=()=>{if(document.visibilityState==="visible"&&u){const b=Date.now();b-Z.current>m&&(O("visibilitychange -> visible; refreshing iframe src (iOS)"),Z.current=b,v(T=>T??B(I)))}};return window.addEventListener("pageshow",D),document.addEventListener("visibilitychange",x),()=>{window.removeEventListener("pageshow",D),document.removeEventListener("visibilitychange",x)}},[le,u,I]);const $=()=>{const D=Date.now()-(k.current||0);G.current=!0,d.current&&(clearTimeout(d.current),d.current=null),O("Iframe onLoad fired",{elapsedMs:D})},V=D=>{if(O("Iframe onError",{error:D}),d.current&&(clearTimeout(d.current),d.current=null),w<U){O("Error -> retry (src bust)",{retryCount:w+1}),R(b=>b+1);const x=Date.now();x-Z.current>m&&(Z.current=x,k.current=Date.now(),G.current=!1,v(B(I)))}else O("Final error -> giving up after max retries")};return i.useEffect(()=>{if(!(!u||!te))return d.current&&(clearTimeout(d.current),d.current=null),k.current=Date.now(),d.current=setTimeout(()=>{if(!G.current)if(w<U){O("Load timeout -> retry (src bust)",{retryCount:w+1}),R(x=>x+1);const D=Date.now();D-Z.current>m&&(Z.current=D,v(B(I)))}else O("Final load timeout -> giving up after max retries")},q),()=>{d.current&&(clearTimeout(d.current),d.current=null)}},[te,u,w,I]),r?u?n.jsx("iframe",{id:`laylo-drop-${r}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",allow:"web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture",loading:"eager",onLoad:$,onError:V,style:{...W,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",display:"block"},src:te??I},g):n.jsx("div",{style:{...W}}):n.jsx("div",{style:{...W,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:n.jsx("span",{style:{color:"#999",fontSize:14},children:"[LayloSimple] Missing dropId"})})},vt=({contentRef:r,viewportContext:y={isRealMobileDevice:!1},onStateChange:A=()=>{}})=>{const[h,o]=i.useState("");i.useState(!1);const[W,u]=i.useState(!1);i.useState("us"),i.useState("normal");const[g,H]=i.useState(!1),[w,R]=i.useState(!1),[k,d]=i.useState(!1),[G,U]=i.useState(!1),[q,le]=i.useState(!1);i.useState(0);const te=xt();i.useState(!1);const v=!k&&te,j=v,Z=g,[m,B]=i.useState({isActive:!1,startY:0,currentY:0,startX:0,currentX:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null}),[I,O]=i.useState({expanded:!1,showDisclaimer:!1,phoneNumber:""});i.useState(!1),i.useRef(null),i.useRef(null);const $=i.useRef(null);i.useRef(null);const V=i.useRef(null),D=i.useCallback(()=>{O({expanded:g,showDisclaimer:w,phoneNumber:h}),console.log("💾 Drawer state saved, iframe content preserved")},[g,w,h]),x=i.useCallback(a=>{$.current&&!$.current.contains(a.target)&&(D(),H(!1),d(!1),R(!1))},[h,D]);i.useEffect(()=>(g&&(document.addEventListener("mousedown",x),document.addEventListener("touchstart",x)),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("touchstart",x)}),[g,x]),i.useEffect(()=>{const a=document.body,p=r?.current;if(g){const M=window.scrollY;a.classList.add("drawer-scroll-lock"),a.style.top=`-${M}px`,p&&p.classList.add("drawer-active")}else{a.classList.remove("drawer-scroll-lock");const M=a.style.top;a.style.top="",M&&window.scrollTo(0,parseInt(M||"0")*-1),p&&p.classList.remove("drawer-active")}return()=>{a.classList.remove("drawer-scroll-lock"),a.style.top="",p&&p.classList.remove("drawer-active")}},[g,r]);const b=i.useRef({drawerExpanded:void 0,drawerFullyClosed:void 0,iframeExpanded:void 0,phoneSubmitted:void 0});i.useEffect(()=>{const a={drawerExpanded:g,drawerFullyClosed:k,iframeExpanded:G,phoneSubmitted:W},p=b.current;(p.drawerExpanded!==a.drawerExpanded||p.drawerFullyClosed!==a.drawerFullyClosed||p.iframeExpanded!==a.iframeExpanded||p.phoneSubmitted!==a.phoneSubmitted)&&(b.current=a,A(a))},[g,k,G,W,A]),i.useRef(!1),i.useEffect(()=>{},[k]),i.useEffect(()=>{if(v&&te&&!q){const a=setTimeout(()=>{le(!0),console.log("✅ Laylo iframe ready for interaction")},1e3);return()=>clearTimeout(a)}},[v,te,q]);const T=i.useCallback(()=>k?"50px":G?"320px":g?"280px":"80px",[k,g,w,G]);i.useCallback(()=>{const a=T(),p=(()=>{const N="ontouchstart"in window||navigator.maxTouchPoints>0,E=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Y=window.innerWidth,z=window.innerHeight,S=Y/z;return N&&E&&(S<1.5||Y<768)})(),M=parseInt(a.replace("px",""));if(p)return`calc(${a} + 20px)`;{const N=Math.max(15,M*.2);return`calc(${a} + ${N}px)`}},[T,y]);const ce=i.useCallback(a=>{if(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="BUTTON"||a.target.closest("iframe")||a.target.closest("button")||a.target.closest('[role="button"]'))return;const p=a.touches[0],M=Date.now(),N=a.target.closest(".mobile-drawer-content"),E=$.current?.getBoundingClientRect(),Y=E&&p.clientY>E.top&&p.clientY<E.top+120,z=g?E?.height*.4:120,S=E&&p.clientY>E.top&&p.clientY<E.top+z;B({isActive:!0,startY:p.clientY,currentY:p.clientY,startX:p.clientX,currentX:p.clientX,startTime:M,isDragging:!1,initialDrawerState:g,isOnDrawerContent:!!N,isOnDrawerHandle:!!Y,isOnSwipeZone:!!S,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null}),S&&!N&&(a.preventDefault(),a.stopPropagation())},[g]),ie=i.useCallback(a=>{if(!m.isActive||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="BUTTON"||a.target.closest("iframe")||a.target.closest("button")||a.target.closest('[role="button"]'))return;const p=a.touches[0],M=m.startY-p.clientY,N=Math.abs(M),E=p.clientX-m.startX,Y=Math.abs(E);if(m.isVerticalIntent===null&&(N>4||Y>4)){const z=N>=Y*1.2;if(B(S=>({...S,isVerticalIntent:z})),!z)return}if(m.isVerticalIntent!==!1){if(!m.isDragging&&N>3&&m.isOnSwipeZone&&!m.isOnDrawerContent){const z=N>8||N>3&&Date.now()-m.startTime>100;B(S=>({...S,isDragging:!0,isIntentionalGesture:z,dragDistance:N})),z&&(a.preventDefault(),a.stopPropagation())}if(m.isDragging&&m.isOnSwipeZone&&!m.isOnDrawerContent){const z=Math.max(N,m.dragDistance);m.isIntentionalGesture&&(a.preventDefault(),a.stopPropagation()),B(S=>({...S,currentY:p.clientY,currentX:p.clientX,dragDistance:z}))}else m.isOnDrawerContent||B(z=>({...z,currentY:p.clientY,currentX:p.clientX}))}},[m]),ae=i.useCallback(a=>{if(!m.isActive)return;const p=m.startY-m.currentY,M=Math.abs(p),N=Date.now()-m.startTime,E=M/N,Y=8,z=.15,S=5,K=m.isIntentionalGesture?.7:1;let re=!1;if(m.isDragging&&m.isIntentionalGesture){const Q=Y*K,C=z*K;E>C?(re=!0,console.log("🚀 Flick gesture detected:",{velocity:E,threshold:C})):M>Q?(re=!0,console.log("🚀 Swipe gesture detected:",{distance:M,threshold:Q})):M>S&&(re=!0,console.log("🚀 Snap gesture detected:",{distance:M,threshold:S}))}else m.isDragging&&!m.isIntentionalGesture&&(E>z*1.2||M>Y*1.5)&&(re=!0,console.log("🚀 Fallback gesture detected"));if(re)E>z?($.current?.classList.add("momentum-fast"),setTimeout(()=>{$.current?.classList.remove("momentum-fast")},100)):($.current?.classList.add("momentum-slow"),setTimeout(()=>{$.current?.classList.remove("momentum-slow")},250)),p>0?g||(H(!0),d(!1),console.log("🔄 Drawer opened via swipe up")):g&&(H(!1),console.log("🔄 Drawer closed via swipe down"));else{const Q=$.current?.getBoundingClientRect(),C=g?Q?.height*.4:120;Q&&m.startY>Q.top&&m.startY<Q.top+C&&(k?(d(!1),H(!0),console.log("🔄 Drawer opened via tap on swipe zone")):g?(H(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(H(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}B({isActive:!1,startY:0,currentY:0,startX:0,currentX:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null})},[m,g,k]),J=i.useCallback(()=>{k?(d(!1),H(I.expanded||!0),R(I.showDisclaimer),I.phoneNumber&&o(I.phoneNumber)):g||(H(!0),I.showDisclaimer&&R(!0))},[k,g,I]),we=i.useCallback(a=>{a.stopPropagation(),k&&d(!1),H(!0),U(!0),setTimeout(()=>{U(!1)},1e4)},[k]);return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsxs("div",{ref:$,className:`mobile-drawer ${g?"expanded":"collapsed"} ${w?"disclaimer-peek":""}`,onTouchStart:ce,onTouchMove:ie,onTouchEnd:ae,onWheel:a=>{g&&(a.stopPropagation(),a.preventDefault())},style:{height:T(),transform:k?"translate3d(0, 100%, 0)":g?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:J,role:"dialog","aria-label":"Contact form drawer","aria-expanded":g,children:[n.jsx("div",{"aria-hidden":"true",style:{position:"absolute",top:0,left:0,right:0,height:"64px",minHeight:"44px",background:"transparent",zIndex:3,pointerEvents:"auto"},onTouchStart:ce,onTouchMove:ie,onTouchEnd:ae}),n.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:n.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),n.jsxs("div",{className:"drawer-content mobile-drawer-content",onTouchStart:a=>{a.stopPropagation(),a.touches&&a.touches[0]&&(V.current=a.touches[0].clientY)},onTouchMove:a=>{const p=a.currentTarget,{scrollTop:M,scrollHeight:N,clientHeight:E}=p;a.stopPropagation();const Y=M===0,z=M+E>=N,S=a.touches&&a.touches[0]?a.touches[0].clientY:null;let K=0;S!=null&&V.current!=null&&(K=S-V.current,V.current=S),(Y&&K>0||z&&K<0)&&a.preventDefault()},onWheel:a=>{a.stopPropagation()},onTouchEnd:a=>{a.stopPropagation()},style:{padding:"0 20px 20px",opacity:k?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!k&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),n.jsx("div",{onClick:we,"aria-hidden":!j,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",zIndex:2,flexShrink:0,opacity:Z?1:0,height:Z?G?"200px":"160px":40,pointerEvents:Z?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:v&&n.jsx(wt,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:j,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})})]})]})]})},Se=(r,y=null)=>{if(!r)return r;if(typeof r=="string"&&r.startsWith("data:"))return console.log("⚠️ Data URL detected, returning as-is:",r.substring(0,50)+"..."),r;const A=/iPad|iPhone|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);if(typeof r=="string"&&r.includes("/api/images/serve/")){console.log("🔄 Processing new image system URL:",r);const h=r.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);if(h){const o=h[1],W=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";let u="small";y&&(y<=150?u="thumbnail":y<=300?u="small":y<=600?u="medium":(y<=1200,u="large"));const g=`${W}/api/images/serve/${o}/${u}`;return console.log("✅ Generated optimized URL for new image system:",g,`(variant: ${u}, width: ${y})`),g}}if(typeof r=="string"&&r.includes("/images/figma-exact/")){const h=r.split("/").pop();return A&&h.includes(".webp")?`/images/optimized/${h.replace(".webp",".jpg")}`:`/images/optimized/${h}`}if(typeof r=="string"&&r.startsWith("http")){const h=encodeURIComponent(r),W=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/images/proxy-optimized?url=${h}`,u=A?"&format=jpeg&quality=85":"";return y?`${W}&w=${y}${u}`:`${W}${u}`}if(typeof r=="string"&&r.startsWith("/")&&(r.includes("/api/images/serve/")||!r.includes("/images/"))){console.log("🔄 Processing relative URL, assuming new image system:",r);const h=r.match(/([a-f0-9-]{36})/);if(h){const o=h[1],u=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/serve/${o}/medium`;return console.log("✅ Generated URL for UUID-based relative path:",u),u}}if(typeof r=="string"&&(r.includes("/images/")||r.includes("/custom/images/"))){const o=r.split("/").pop().replace(/\.[^/.]+$/,"");return y?`/images/optimized/${o}-${y}w.webp`:`/images/optimized/${o}.webp`}return console.log("⚠️ No optimization applied to URL:",r),r},Je=r=>r==="event"?[150,300,450]:r==="hero"?[600,900,1200]:[150,300,600],yt=(r,y="event")=>r?Je(y).map(A=>`${Se(r,A)} ${A}w`).join(", "):"",It=(r,y="event")=>{if(!r||/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return"";if(typeof r=="string"&&(r.includes("/api/images/serve/")||r.includes("/api/settings/serve/")||r.startsWith("/api/")))return console.log("🚫 Skipping AVIF for internal API URL to prevent loop:",r),"";const h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";return Je(y).map(o=>`${h}/images/proxy-optimized?url=${encodeURIComponent(r)}&w=${o}&format=avif ${o}w`).join(", ")},ke=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"7911 123456",maxLength:13,digitLength:11},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+",pattern:/^\d{9}$/,placeholder:"412 345 678",maxLength:11,digitLength:9},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"30 12345678",maxLength:13,digitLength:11},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=",pattern:/^\d{9}$/,placeholder:"6 12 34 56 78",maxLength:12,digitLength:9},{id:"es",code:"+34",name:"Spain",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"612 34 56 78",maxLength:11,digitLength:9},{id:"it",code:"+39",name:"Italy",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"312 345 6789",maxLength:12,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"90 1234 5678",maxLength:13,digitLength:11},{id:"kr",code:"+82",name:"South Korea",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"10 1234 5678",maxLength:13,digitLength:11},{id:"cn",code:"+86",name:"China",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+",pattern:/^\d{11}$/,placeholder:"138 0013 8000",maxLength:13,digitLength:11},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:12,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"11 91234 5678",maxLength:14,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:12,digitLength:10}],Xe=(r,y)=>{const A=typeof r=="string"?r.replace(/[^\d]/g,""):"",h=ke.find(W=>W.id===y);if(!h||A.length===0)return A;const o=A.slice(0,h.digitLength);switch(y){case"us":case"ca":return o.length<=3?o:o.length<=6?`(${o.slice(0,3)}) ${o.slice(3)}`:`(${o.slice(0,3)}) ${o.slice(3,6)}-${o.slice(6)}`;case"gb":return o.length<=4?o:o.length<=7?`${o.slice(0,4)} ${o.slice(4)}`:`${o.slice(0,4)} ${o.slice(4,7)} ${o.slice(7)}`;case"jp":case"kr":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;case"cn":return o.length<=3?o:o.length<=7?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,7)} ${o.slice(7)}`;case"in":return o.length<=5?o:`${o.slice(0,5)} ${o.slice(5)}`;case"br":return o.length<=2?o:o.length<=7?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,7)} ${o.slice(7)}`;case"mx":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;default:return o.length<=3?o:o.length<=6?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,6)} ${o.slice(6)}`}},St=(r,y)=>{const A=r.replace(/[^\d]/g,""),h=ke.find(o=>o.id===y);return h?h.pattern.test(A):A.length>=10&&A.length<=15},Ne=r=>ke.find(y=>y.id===r)||ke[0],Pt=()=>{const{trackEvent:r}=ut(),[y,A]=i.useState(!1);i.useCallback(e=>{A(e),e&&r("privacy_consent",{action:"granted",timestamp:Date.now(),component:"PrivacyConsentModal"})},[r]);const[h,o]=i.useState(!0),[W,u]=i.useState(!1);i.useEffect(()=>{setTimeout(()=>{o(!1),u(!0)},2e3),r("component_load",{component:"FigmaMobile",viewport_type:"mobile"})},[r]),i.useEffect(()=>{bt("homepage")},[]),i.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=l=>{console.warn("⚠️ Laylo SDK failed to load in FigmaMobile:",l)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in FigmaMobile")},document.head.appendChild(e)}},[]);const[g,H]=i.useState(!1),[w,R]=i.useState(""),[k,d]=i.useState(!1),[G,U]=i.useState(!1),[q,le]=i.useState("us"),[te,v]=i.useState("normal"),[j,Z]=i.useState(!1),[m,B]=i.useState(""),[I,O]=i.useState(""),[$,V]=i.useState(!1),[D,x]=i.useState("normal"),[b,T]=i.useState(!1),[ce,ie]=i.useState(!1),[ae,J]=i.useState(!1),[we,a]=i.useState(!1);i.useState(!1);const[p,M]=i.useState(0),[N,E]=i.useState(!1),[Y,z]=i.useState(!1),[S,K]=i.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1}),{loading:re,homeSettings:Q,showAllEvents:C,setShowAllEvents:Me,filteredFeaturedEvents:de,filteredHomepageEvents:ge,normalizeEvent:Le}=gt(),[ze,Ke]=i.useState(0),[fe,Qe]=i.useState(!1),[be,_e]=i.useState(!1),[X,Pe]=i.useState(null),[Ze,Fe]=i.useState(!1),Re=i.useCallback((e,l)=>{if(Ze)return;Fe(!0);let t=e.coverImage;t&&!t.startsWith("http")&&(t=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}${t}`),t&&(t=t.replace(/[?&](w|width|h|height|size)=\d+/g,""),t=t.replace(/[?&]$/,"")),Pe({...e,imageUrl:t||e.coverImage,originalRect:l?.getBoundingClientRect()||null}),setTimeout(()=>{Fe(!1)},400)},[Ze]),We=i.useCallback(()=>{Pe(null)},[]),F=i.useRef({scrollY:0,locked:!1,prevent:void 0,prevBodyPosition:"",prevBodyTop:"",prevBodyWidth:"",prevBodyOverflow:"",prevBodyTouchAction:""}),He=i.useCallback(()=>{if(F.current.locked)return;const e=window.scrollY||window.pageYOffset||0;F.current.scrollY=e;const l=s=>{s&&typeof s.preventDefault=="function"&&s.preventDefault(),s&&typeof s.stopPropagation=="function"&&s.stopPropagation()};F.current.prevent=l,document.documentElement.style.overscrollBehavior="none";const t=document.body;F.current.prevBodyPosition=t.style.position||"",F.current.prevBodyTop=t.style.top||"",F.current.prevBodyWidth=t.style.width||"",F.current.prevBodyOverflow=t.style.overflow||"",F.current.prevBodyTouchAction=t.style.touchAction||"",t.style.position="fixed",t.style.top=`-${e}px`,t.style.width="100%",t.style.overflow="hidden",t.style.touchAction="none",window.addEventListener("wheel",l,{passive:!1,capture:!0}),window.addEventListener("touchmove",l,{passive:!1,capture:!0}),F.current.locked=!0},[]),De=i.useCallback(()=>{if(!F.current.locked)return;const e=document.body;e.style.position=F.current.prevBodyPosition,e.style.top=F.current.prevBodyTop,e.style.width=F.current.prevBodyWidth,e.style.overflow=F.current.prevBodyOverflow,e.style.touchAction=F.current.prevBodyTouchAction,document.documentElement.style.overscrollBehavior="",F.current.prevent&&(window.removeEventListener("wheel",F.current.prevent,{capture:!0}),window.removeEventListener("touchmove",F.current.prevent,{capture:!0}));const l=F.current.scrollY||0;window.scrollTo(0,l),F.current.locked=!1},[]);i.useEffect(()=>{if(X)return He(),()=>{De()};De()},[X,He,De]);const[ve,me]=i.useState("hd720"),[Be,pe]=i.useState("fast"),[ne,je]=i.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""}),Oe=i.useCallback(()=>{je({expanded:b,showDisclaimer:ce,showVerification:j,verificationCode:m,phoneNumber:w}),console.log("💾 Drawer state saved, iframe content preserved")},[b,ce,j,m,w]),[kt,Te]=i.useState(!1),se=i.useRef(null),Ee=i.useRef(null),P=i.useRef(null),ye=i.useRef(!0),Ce=i.useRef(null),Ie=i.useRef(null),qe=dt(),et=Math.max(qe||0,0)+12,{scrollY:tt}=mt(Ie.current,{threshold:20,throttleMs:32,passive:!0});i.useEffect(()=>{const e=document.body,l=Ie.current;if(b){const t=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${t}px`,l&&l.classList.add("drawer-active")}else{const t=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",t&&window.scrollTo(0,parseInt(t||"0")*-1),l&&l.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",l&&l.classList.remove("drawer-active")}},[b]),i.useCallback(e=>{const l=e.target.value,t=Ne(q),s=l.replace(/[^\d]/g,"");if(s.length>t.digitLength)return;const c=Xe(s,q);R(c)},[q]),i.useCallback(e=>{e.key==="Enter"&&it()},[]),i.useCallback(e=>{const l=e.target.value,t=Ne(l);if(le(l),Ee.current&&t.flag&&(Ee.current.src=t.flag,Ee.current.alt=t.name),w){const s=w.replace(/[^\d]/g,""),c=Xe(s,l);R(c)}console.log(`🌍 Country changed to: ${t.code} (${t.name})`)},[w]);const it=i.useCallback(async()=>{const e=w.trim();if(!e||k)return;if(e.replace(/\D/g,"")==="5555555555"){console.log("🧪 Test number detected - showing loading then verification UI"),d(!0),v("loading"),setTimeout(()=>{v("valid"),O(e),d(!1),setTimeout(()=>{Z(!0),T(!0)},200)},800);return}const s=Ne(q);if(!St(e,q)){console.warn("Invalid phone number format for",s.name),v("invalid"),se.current&&(se.current.classList.add("shake"),setTimeout(()=>{se.current?.classList.remove("shake"),v("normal")},400));return}try{d(!0),v("loading"),console.log("📱 Submitting phone number:",{phone:e,countryCode:s.code});const c=window.location.hostname==="localhost"?"":"https://admin.b2b.click",f=await fetch(`${c}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:s.code})}),L=await f.json();f.ok&&L.success?(console.log("✅ Phone number submitted successfully"),L.requiresVerification?(console.log("🔐 Moving to verification step"),v("normal"),O(e),setTimeout(()=>{Z(!0),T(!0)},500)):(U(!0),v("valid"),R(""),setTimeout(()=>{U(!1),v("normal")},3e3))):(console.error("❌ Failed to submit phone number:",L.error||"Unknown error"),v("invalid"),se.current&&(se.current.classList.add("shake"),setTimeout(()=>{se.current?.classList.remove("shake"),v("normal")},400)))}catch(c){console.error("❌ Error submitting phone number:",c),v("invalid"),se.current&&(se.current.classList.add("shake"),setTimeout(()=>{se.current?.classList.remove("shake"),v("normal")},400))}finally{d(!1)}},[w,k,q]);i.useCallback(async()=>{const e=m.trim();if(!e||$)return;if(I.replace(/\D/g,"")==="5555555555"&&(console.log("🧪 Test verification - accepting any 4-digit code"),e.length===4)){V(!0),v("loading"),setTimeout(()=>{x("valid"),U(!0),V(!1)},1e3),setTimeout(()=>{J(!0),Z(!1),T(!1),ie(!1)},2e3),setTimeout(()=>{B(""),O(""),R(""),U(!1),v("normal"),x("normal"),V(!1),J(!1),M(0),E(!1),P.current&&(clearInterval(P.current),P.current=null),je({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3);return}if(!/^\d{4}$/.test(e)){console.warn("Invalid verification code format"),x("invalid"),setTimeout(()=>{x("filled")},400);return}try{V(!0),v("loading"),console.log("🔐 Submitting verification code");const s=window.location.hostname==="localhost"?"":"https://admin.b2b.click",c=await fetch(`${s}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:I,code:e})}),f=await c.json();c.ok&&f.success?(console.log("✅ Phone verification successful"),x("valid"),U(!0),setTimeout(()=>{J(!0),Z(!1),T(!1),ie(!1)},2e3),setTimeout(()=>{B(""),O(""),R(""),U(!1),v("normal"),x("normal"),V(!1),J(!1),M(0),E(!1),P.current&&(clearInterval(P.current),P.current=null),je({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3)):(console.error("❌ Phone verification failed:",f.error||"Unknown error"),x("invalid"),setTimeout(()=>{x("filled")},400))}catch(s){console.error("❌ Error submitting verification code:",s),x("invalid"),setTimeout(()=>{x("filled")},400)}finally{V(!1)}},[m,$,I]);const he=i.useCallback(()=>{console.log("🚀 Starting countdown timer"),P.current&&(clearInterval(P.current),P.current=null),M(60),E(!1),P.current=setInterval(()=>{if(!ye.current){P.current&&(clearInterval(P.current),P.current=null);return}M(e=>(console.log("⏰ Countdown tick:",e),e<=1?(console.log("✅ Countdown finished, enabling resend"),ye.current&&E(!0),P.current&&(clearInterval(P.current),P.current=null),0):e-1))},1e3)},[]);i.useCallback(async()=>{if(!(!N||Y||!I))try{z(!0),console.log("🔄 Resending verification code to:",I);const e=window.location.hostname==="localhost"?"":"https://admin.b2b.click",t=await(await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:I})})).json();t.success?(console.log("✅ Verification code resent successfully"),he()):(console.error("❌ Failed to resend verification code:",t.error),he())}catch(e){console.error("❌ Error resending verification code:",e),he()}finally{z(!1)}},[N,Y,I,he]),i.useEffect(()=>(ye.current=!0,()=>{ye.current=!1,P.current&&(clearInterval(P.current),P.current=null)}),[]),i.useEffect(()=>{!j&&P.current&&(clearInterval(P.current),P.current=null,M(0),E(!1))},[j]),i.useEffect(()=>{console.log("🔄 Countdown useEffect triggered:",{showVerification:j,verificationPhone:I,resendCountdown:p,canResend:N}),j&&I&&p===0&&!N&&(console.log("🚀 Starting resend countdown"),he())},[j,I,he]),i.useEffect(()=>{re||(setTimeout(()=>{Qe(!0)},150),setTimeout(()=>{_e(!0)},300))},[re]),i.useEffect(()=>{const e=setTimeout(()=>{J(!1),T(!1)},500);return()=>clearTimeout(e)},[]),i.useEffect(()=>{const l=setTimeout(()=>{if("connection"in navigator){const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(c){const f=c.effectiveType,L=c.downlink;console.log("🌐 Connection detected:",{effectiveType:f,downlink:L}),f==="4g"&&L>5?(me("hd1080"),pe("fast")):f==="4g"||f==="3g"&&L>2?(me("hd720"),pe("medium")):(me("large"),pe("slow"));return}}const t=performance.now(),s=new Image;s.onload=()=>{const f=performance.now()-t;console.log("🚀 Speed test completed in:",f+"ms"),f<200?(me("hd1080"),pe("fast")):f<500?(me("hd720"),pe("medium")):(me("large"),pe("slow"))},s.onerror=()=>{console.log("⚠️ Speed test failed, using default HD quality"),me("hd720"),pe("medium")},s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},200);return()=>clearTimeout(l)},[]),i.useEffect(()=>{if(de&&de.length>0){console.log("🚀 Preloading critical event images for instant display...");const e=/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);de.slice(0,2).forEach((l,t)=>{if(l.coverImage){if(!e&&!l.coverImage.includes("/api/images/serve/")){const c=document.createElement("link");c.rel="preload",c.as="image",c.type="image/avif";const f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";c.href=`${f}/images/proxy-optimized?url=${encodeURIComponent(l.coverImage)}&w=120&format=avif`,document.head.appendChild(c)}const s=document.createElement("link");if(s.rel="preload",s.as="image",s.type="image/webp",s.href=Se(l.coverImage,300),document.head.appendChild(s),e){const c=document.createElement("link");c.rel="preload",c.as="image",c.href=l.coverImage,document.head.appendChild(c)}console.log(`✅ Preloaded mobile event image ${t+1}: ${l.title} ${e?"(Safari mobile optimized)":""}`)}})}},[de]);const[ue,Ge]=i.useState(!1),[Mt,Ae]=i.useState(!1),Ue=()=>{ue?(Ge(!1),Ae(!1)):(Ae(!0),Ge(!0),setTimeout(()=>Ae(!1),600))},Ye=()=>{const e=window.location.pathname;return e==="/"||e===""?"events":e.startsWith("/about")?"about":e.startsWith("/contact")?"contact":"events"},[nt,ot]=i.useState(Ye());i.useEffect(()=>{const e=()=>{ot(Ye())};return window.addEventListener("popstate",e),e(),()=>{window.removeEventListener("popstate",e)}},[]);const at=e=>{if(e==="/"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};i.useCallback(()=>{T(!0),ie(!0)},[]),i.useCallback(()=>{!w.trim()&&!j&&setTimeout(()=>{T(!1),ie(!1)},200)},[w,j]);const xe=i.useCallback(e=>{Ce.current&&!Ce.current.contains(e.target)&&(Oe(),T(!1),j?J(!1):(J(!1),ie(!1)))},[w,j,Oe]);i.useEffect(()=>(b&&(document.addEventListener("mousedown",xe),document.addEventListener("touchstart",xe)),()=>{document.removeEventListener("mousedown",xe),document.removeEventListener("touchstart",xe)}),[b,xe]);const $e=i.useCallback(()=>ae?"50px":we?"320px":j&&b?"240px":j&&!b?"60px":b?"280px":"80px",[ae,j,b,ce,we]),rt=i.useCallback(()=>{const e=$e(),l=(()=>{const s="ontouchstart"in window||navigator.maxTouchPoints>0,c=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),f=window.innerWidth,L=window.screen.width,ee=window.devicePixelRatio||1;return s&&c&&Math.abs(f-L)<50&&ee>1})(),t=parseInt(e.replace("px",""));if(l)return`calc(${e} + 20px)`;{const s=Math.max(15,t*.2);return`calc(${e} + ${s}px)`}},[$e,ze]);i.useEffect(()=>{const e=()=>{Ke(l=>l+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),e(),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),i.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const l=e.touches[0],t=Date.now();K({isActive:!0,startY:l.clientY,currentY:l.clientY,startTime:t,isDragging:!1,initialDrawerState:b})},[b]),i.useCallback(e=>{if(!S.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const l=e.touches[0],t=S.startY-l.clientY,s=Math.abs(t);!S.isDragging&&s>10&&(K(c=>({...c,isDragging:!0})),e.preventDefault()),S.isDragging&&(K(c=>({...c,currentY:l.clientY})),e.preventDefault())},[S]),i.useCallback(e=>{if(!S.isActive)return;if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe")){K({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1});return}const l=S.startY-S.currentY,t=Math.abs(l),s=Date.now()-S.startTime,c=t/s,f=30,L=.5,ee=50;let oe=!1;if(S.isDragging&&((c>L||t>f||t>ee)&&(oe=!0),oe)){const _=Ce.current;_&&(_.classList.remove("momentum-fast","momentum-slow"),c>L?_.classList.add("momentum-fast"):_.classList.add("momentum-slow"),setTimeout(()=>{_&&_.classList.remove("momentum-fast","momentum-slow")},250)),l>0?b||(T(!0),J(!1)):b&&T(!1)}K({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1})},[S,b]),i.useCallback(()=>{ae?(J(!1),T(ne.expanded||!0),ie(ne.showDisclaimer),Z(ne.showVerification),ne.verificationCode&&(B(ne.verificationCode),ne.verificationCode.length===4&&x("filled")),ne.phoneNumber&&R(ne.phoneNumber)):b||(T(!0),ne.showDisclaimer&&!j&&ie(!0))},[ae,b,ne,j]),i.useCallback(e=>{e.stopPropagation(),ae&&J(!1),T(!0),a(!0),setTimeout(()=>{a(!1)},1e4)},[ae]),i.useCallback(()=>{Te(!0)},[]),i.useCallback(()=>{Te(!1)},[]),i.useCallback(()=>{Te(!1)},[]),i.useEffect(()=>{const e=document.querySelector('meta[name="viewport"]'),l=e?e.getAttribute("content"):"";let t=document.querySelector('meta[name="viewport"]');t||(t=document.createElement("meta"),t.name="viewport",document.head.appendChild(t)),t.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no";const s=(ee,oe)=>{let _=document.querySelector(`meta[name="${ee}"]`);_||(_=document.createElement("meta"),_.name=ee,document.head.appendChild(_)),_.content=oe};s("apple-mobile-web-app-capable","yes"),s("apple-mobile-web-app-status-bar-style","black-translucent"),s("apple-touch-fullscreen","yes"),s("mobile-web-app-capable","yes"),s("format-detection","telephone=no"),document.documentElement.style.webkitTextSizeAdjust="100%",document.documentElement.style.textSizeAdjust="100%";let c=null,f=null;const L=()=>{c&&cancelAnimationFrame(c),f&&clearTimeout(f),f=setTimeout(()=>{c=requestAnimationFrame(()=>{const ee=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${ee}px`)})},100)};return L(),window.addEventListener("resize",L,{passive:!0}),window.addEventListener("orientationchange",L,{passive:!0}),()=>{e&&l&&e.setAttribute("content",l),window.removeEventListener("resize",L),window.removeEventListener("orientationchange",L),c&&cancelAnimationFrame(c),f&&clearTimeout(f)}},[]);const st=i.useMemo(()=>{const e="https://www.youtube.com/embed/vEHTO3gf1jk",s={...{autoplay:"1",mute:"1",controls:"0",showinfo:"0",rel:"0",loop:"1",playlist:"vEHTO3gf1jk",modestbranding:"1",iv_load_policy:"3",fs:"0",disablekb:"1",hd:"1",cc_load_policy:"0",autohide:"1",wmode:"transparent",enablejsapi:"1",origin:window.location.origin},...{vq:ve,quality:ve}},c=Object.entries(s).map(([L,ee])=>`${L}=${ee}`).join("&"),f=`${e}?${c}`;return console.log("🎥 YouTube URL built:",{videoQuality:ve,connectionSpeed:Be,finalURL:f}),f},[ve,Be]),Ve=i.useCallback(()=>{o(!1),u(!0),r("video_interaction",{action:"thumbnail_click",video_id:"vEHTO3gf1jk",component:"FigmaMobile"})},[r]),lt=i.useMemo(()=>n.jsx("div",{onClick:Ve,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",cursor:"pointer",backgroundImage:"url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transition:"transform 0.2s ease-out"},onMouseDown:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onTouchStart:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"}}),[Ve]);return re?n.jsx(ct,{fullScreen:!0,minDisplayTime:600,showMessage:!1}):n.jsxs(n.Fragment,{children:[n.jsx("link",{rel:"stylesheet",href:"/css/mobile-scroll-fix.css"}),n.jsx("style",{children:`
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
            max-height: none; /* Unbounded to show all events */
            overflow: visible; /* Allow all cards to render fully */
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
            margin: 4px auto 0 auto; /* Further reduced to 4px to tighten section gap (>50% reduction) */
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
        `}),n.jsxs("div",{className:"mobile-container",style:{background:"#000000",fontFamily:"Inter, sans-serif"},role:"main","aria-label":"BOUNCE2BOUNCE Mobile Experience",children:[n.jsxs("main",{style:{width:"100vw",height:"100vh",maxWidth:"100vw",maxHeight:"100vh",margin:"0",position:"relative",background:"#000000",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:"100vh",minWidth:"100vw",isolation:"isolate",transform:"none",willChange:"auto",WebkitOverflowScrolling:"auto",WebkitTransform:"none",touchAction:"manipulation",overscrollBehavior:"contain"},"aria-label":"Mobile homepage content",children:[n.jsx(pt,{currentPage:nt,scrollY:tt,onNavigate:at,onMenuToggle:H}),n.jsxs("div",{ref:Ie,className:"mobile-content-container",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:et,paddingLeft:"0px",paddingRight:"0px",paddingBottom:rt(),boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",WebkitOverscrollBehavior:"contain",scrollBehavior:"auto",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"auto",touchAction:"pan-y",WebkitTouchCallout:"none",WebkitUserSelect:"none",scrollSnapType:"none",WebkitScrollSnapType:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},children:[n.jsxs("section",{"aria-labelledby":"events-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:be?1:0,transform:be?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"0ms"},children:[n.jsxs("div",{style:{display:"flex",width:"min(344px, calc(100vw - 4px))",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:[n.jsx("h2",{id:"events-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"normal",margin:0,textAlign:"left"},children:"Events"}),n.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"},onClick:()=>Me(!C),role:"switch","aria-checked":C,"aria-label":`Switch to ${C?"Past":"Next"} events`,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Me(!C))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[n.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:C?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:C?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:C?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Next"})}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:C?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:C?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),C&&de.length>0&&n.jsx("div",{style:{width:"100%",transition:"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:C?1:0,transform:C?"translateY(0)":"translateY(-20px)",marginBottom:C?"20px":"0px",overflow:"hidden"},children:de.map((e,l)=>n.jsx("div",{className:fe?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"2px",boxSizing:"border-box",display:"flex",justifyContent:"center",opacity:fe?1:0,transform:fe?"translateY(0) scale(1)":"translateY(20px) scale(0.96)",transition:"opacity var(--animation-duration-slow) var(--animation-easing-standard), transform var(--animation-duration-slow) var(--animation-easing-standard)",transitionDelay:fe?`${l*120}ms`:"0s"},children:n.jsxs("div",{onClick:t=>{console.log("🔍 Mobile Featured Event: Click detected!",t.target),t.preventDefault(),t.stopPropagation(),e?.ticketsUrl&&e.ticketsUrl!=="#"?(console.log(`🎫 Mobile Featured Event: Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")):(console.log("🎫 Mobile Featured Event: No ticket link available for",e?.title),console.log("🔍 Mobile Featured Event data:",e),console.log("🔍 Available fields:",Object.keys(e||{})))},style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.98)"},onTouchEnd:t=>{t.currentTarget.style.transform="scale(1)"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:e.coverImage?n.jsxs("picture",{children:[n.jsx("source",{srcSet:It(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:yt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:Se(e.coverImage,375),alt:`${e.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:",e.title),onError:t=>{console.error("❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:",t.target.src),t.target.dataset.heroFallbackAttempted?(t.target.removeAttribute("onError"),console.error("❌ Hero fallback also failed, removing error handler")):(t.target.dataset.heroFallbackAttempted="true",t.target.src="/images/optimized/hero-left-image-375w.jpg")},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):n.jsxs("picture",{children:[n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE DEFAULT HERO IMAGE LOADED"),onError:t=>console.error("❌ MOBILE DEFAULT HERO IMAGE FAILED:",t.target.src),style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",opacity:1,transform:"translateZ(0)",willChange:"transform"},children:[n.jsxs("div",{style:{display:"flex",flex:"1",padding:"0px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"1px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:n.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:Le?Le(e.eventData||e,"hero",!0)?.date||e.date||"March 29th, 9:00 P.M.":e.date||"March 29th, 9:00 P.M."})]}),n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[n.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),n.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:e.location||"Asbury Park, NJ"})]})]}),n.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:n.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onTouchStart:t=>{t.stopPropagation(),t.target.style.transform="scale(0.95)",t.target.style.background="rgba(35, 35, 35, 0.98)",t.target.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:t=>{t.stopPropagation(),t.target.style.transform="scale(1)",t.target.style.background="rgba(15, 15, 15, 0.95)",t.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:t=>{t.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:e.isRealEvent&&e.hasTicketLink?e.buttonText||"Get Tickets":"View Event"})})})]}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"50px",display:"flex",width:"100%",height:"auto",minHeight:"32px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2,pointerEvents:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",willChange:"transform"},children:n.jsx("div",{style:{color:"#FFFFFF",fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"normal",maxWidth:"100%",margin:"0px 0px 4px 0px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",transform:"translateZ(0)",willChange:"transform"},children:e.title||"FEATURED EVENT"})})]})},`hero-${e.id}`))}),C&&de.length===0&&ge.length>0&&n.jsx("div",{className:fe?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"0px",boxSizing:"border-box",display:"flex",justifyContent:"center"},children:n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",borderRadius:"20px",overflow:"hidden",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2},children:n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1"},children:C?"UPCOMING EVENTS":"PAST EVENTS"})})]})}),n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",margin:"0 auto",position:"relative",paddingBottom:ge.length>3?"4px":"0",background:"#000000"},children:[n.jsxs("div",{className:`mobile-event-cards-container ${ue?"expanded":"collapsed"}`,style:{width:"100%",position:"relative",background:"#000000"},children:[n.jsx("div",{role:"list","aria-label":C?"Upcoming live music events":"Past live music events",style:{display:"flex",width:"100%",flexDirection:"column",justifyContent:"center",alignItems:"stretch",gap:"4px",flexShrink:0,padding:"4px 0",boxSizing:"border-box",minHeight:"auto",overflow:"visible",position:"relative",zIndex:1},children:ge.length>0?ge.map((e,l)=>n.jsx("article",{className:`mobile-event-card-item ${fe?"event-card-spring":"event-card-hidden"}`,style:{width:"100%",minHeight:"132px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform, opacity",zIndex:1,clear:"both"},children:n.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[n.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:t=>{t.preventDefault(),t.stopPropagation();const s=t.currentTarget.querySelector("img");Re(e,s)},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.95)"},onTouchEnd:t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.style.transform="scale(1)";const s=t.currentTarget.querySelector("img");Re(e,s)},onTouchCancel:t=>{t.currentTarget.style.transform="scale(1)"},onMouseDown:t=>{t.currentTarget.style.transform="scale(0.95)"},onMouseUp:t=>{t.currentTarget.style.transform="scale(1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)"},children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:(()=>{const t=Se(e.coverImage,120);return console.log(`🖼️ Loading homepage image for "${e.title}":`,{original:e.coverImage,optimized:t,isDataUrl:e.coverImage?.startsWith("data:"),isNewImageSystem:e.coverImage?.includes("/api/images/serve/"),hostname:window.location.hostname}),t})(),srcSet:e.image_srcset?Object.entries(e.image_srcset).map(([t,s])=>`${s} ${t}`).join(", "):void 0,sizes:"(max-width: 768px) 100vw, 400px",alt:e.image_alt_text||`${e.title} event cover`,title:e.image_title||e.title,loading:"lazy",onError:t=>{const s=parseInt(t.target.dataset.fallbackAttempt||"0"),c=2,f=t.target.src,L=e.id||e.title;if(window.failedImages||(window.failedImages=new Set),window.failedImages.has(f)){console.log("🛑 Global circuit breaker: Image URL previously failed, using placeholder immediately"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(s>=c){console.log(`🛑 Circuit breaker: Max fallback attempts (${c}) reached for ${L}, using placeholder`),window.failedImages.add(f),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(console.log(`❌ Homepage event image failed (attempt ${s+1}/${c}):`,L,"URL:",f),window.failedImages.add(f),f.includes("/api/images/serve/")&&(console.error("🚨 API image serving failed - check persistent storage pipeline"),console.error("📋 UUID extraction:",f.match(/\/api\/images\/serve\/([a-f0-9-]{36})/))),s===0){const oe=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/placeholder`;console.log("🔄 Trying dashboard placeholder:",oe),t.target.src=oe,t.target.dataset.fallbackAttempt="1";return}else if(s===1){console.log("🔄 Using final inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}console.log("🔄 Safety fallback: Using inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError")},onLoad:t=>{delete t.target.dataset.fallbackAttempt,console.log("✅ Homepage event image loaded successfully:",e.title,t.target.src),t.target.style.backgroundColor="transparent"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),n.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[n.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[n.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.title}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h-3V7h2v4h3v2Z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),n.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?n.jsx("button",{onClick:t=>{t.stopPropagation(),console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.02)",t.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`)):C&&de.length>0?null:n.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:.8},children:C?"No upcoming events":"No past events"}),C&&Q?.mobile_laylo_cta_url?n.jsx("button",{type:"button","aria-label":Q?.fallback_cta_button_text||"Join Waitlist",onClick:()=>{window.open(Q.mobile_laylo_cta_url,"_blank","noopener,noreferrer")},style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:Q?.fallback_cta_button_text||"Join Waitlist"}):n.jsx("button",{type:"button","aria-label":"View Past Events",onClick:()=>Me(!1),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:"View Past Events"})]})}),!ue&&ge.length>3&&n.jsx("div",{className:"mobile-event-cards-overlay","aria-hidden":"true"})]}),ge.length>3&&n.jsx("div",{className:`mobile-expand-handle ${ue?"expanded":""}`,onClick:Ue,role:"button",tabIndex:0,"aria-label":ue?"Show fewer events":"Show more events","aria-expanded":ue,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ue())},style:{opacity:1,visibility:"visible"},children:n.jsx("div",{className:`mobile-expand-chevron ${ue?"expanded":""}`,"aria-hidden":"true"})})]})]}),n.jsxs("section",{"aria-labelledby":"follow-us-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:be?1:0,transform:be?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"150ms"},children:[n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:n.jsx("h2",{id:"follow-us-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"1.2",margin:0,textAlign:"left"},children:"Follow Us"})}),n.jsxs("article",{style:{width:"min(344px, calc(100vw - 4px))",height:"200px",position:"relative",flexShrink:0,margin:"0 auto",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},"aria-label":"Henry Fong live performance video",children:[n.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:[n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",transform:"translateZ(0)",willChange:"auto"},children:h?lt:W?n.jsx("iframe",{src:st,title:"Henry Fong YouTube Video - Adaptive Quality",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",loading:"lazy",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",transform:"translateZ(0)",pointerEvents:"none",border:"none",opacity:1,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"}}):n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",border:"none",transform:"translateZ(0)"}})}),n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"20px",zIndex:1,transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto",pointerEvents:"none"}})]}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"16px",display:"flex",width:"100%",height:"40px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"12px",zIndex:2,boxSizing:"border-box",pointerEvents:"none",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"2px",flex:"1"},children:[n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"18px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Watch on YouTube"}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"9px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live"})]}),n.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"90px",height:"36px",justifyContent:"center",alignItems:"center",pointerEvents:"auto",borderRadius:"18px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onTouchStart:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.background="rgba(58, 58, 58, 0.90)"},onTouchEnd:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"11px",fontWeight:"600",lineHeight:"normal"},children:"Watch now"})})]})]})]}),n.jsx("section",{style:{width:"100%",padding:"0",margin:"0",marginTop:"8px",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",opacity:be?1:0,transform:be?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"300ms"},children:n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto"},children:n.jsx(ft,{})})})]}),n.jsx("div",{style:{display:b?"none":"block",visibility:b?"hidden":"visible"},children:n.jsx(ht,{compact:!0})})]}),!g&&n.jsx(vt,{contentRef:Ie,viewportContext:ze,onStateChange:e=>{const{drawerExpanded:l,drawerFullyClosed:t}=e;console.log("Drawer state changed:",e,`status=${t?"fullyClosed":l?"expanded":"collapsed"}`)}})]}),X&&n.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.7)",backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",zIndex:10001,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"20px",boxSizing:"border-box",overflow:"hidden",overscrollBehavior:"none",touchAction:"none",animation:"expandedImageFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"},onClick:We,onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},children:[n.jsx("div",{style:{width:"min(80vw, 80vh)",height:"min(80vw, 80vh)",aspectRatio:"1 / 1",borderRadius:"20px",overflow:"hidden",marginBottom:"20px",animation:"expandedImageScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.6)",border:"1px solid rgba(255, 255, 255, 0.1)",cursor:"pointer"},onClick:e=>e.stopPropagation(),children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:X.imageUrl,alt:X.title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})}),n.jsxs("div",{style:{display:"flex",gap:"16px",animation:"expandedButtonsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both"},onClick:e=>e.stopPropagation(),children:[n.jsx("button",{onClick:()=>{navigator.share?navigator.share({title:X.title,text:`Check out this event: ${X.title}`,url:window.location.href}):(navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!"))},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"80px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:"Share"}),X.isRealEvent&&X.hasTicketLink?n.jsx("button",{onClick:()=>{console.log(`🎫 Opening ticket link from modal for ${X.title}:`,X.ticketsUrl),window.open(X.ticketsUrl,"_blank","noopener,noreferrer"),We()},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"100px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:X.buttonText||"View Event"}):null]})]})]})};export{Pt as default};
