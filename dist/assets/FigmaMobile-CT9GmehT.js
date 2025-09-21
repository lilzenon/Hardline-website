import{j as n,B as st}from"./index-DcYbVrcg.js";import{b as i}from"./vendor-ViNJc2wV.js";import{u as lt,a as ct,M as dt}from"./useNavHeight-5ZGDISki.js";import{u as mt,a as pt}from"./HomePage-CFtEc-H3.js";import{S as ut}from"./SocialMediaButtons-zzURyqC3.js";import"./DesktopNavigationPills-CDWU_jjm.js";import"./beacon-CzvgH2JC.js";import"./mobileOptimization-ILGdA5i5.js";import"./sanitizer-B-JMg9QP.js";const gt=()=>{const[r,y]=i.useState(!1),[A,b]=i.useState(0),o=3,W=1e4,u="https://embed.laylo.com/laylo-sdk.js";i.useCallback(()=>typeof window<"u"&&(window.Laylo!==void 0||document.querySelector(`script[src="${u}"]`)!==null),[]);const g=i.useCallback(()=>new Promise((w,R)=>{if(document.querySelector(`script[src="${u}"]`)){const U=()=>{window.Laylo||document.readyState==="complete"?w():setTimeout(U,100)};U();return}const d=document.createElement("script");d.src=u,d.async=!0;const G=setTimeout(()=>{d.remove(),R(new Error("Script load timeout"))},W);d.onload=()=>{clearTimeout(G),setTimeout(w,200)},d.onerror=()=>{clearTimeout(G),d.remove(),R(new Error("Script load failed"))},document.head.appendChild(d)}),[]),H=i.useCallback(async(w=0)=>{if(!r)try{await g(),y(!0),console.log("🎉 Laylo SDK ready")}catch(R){if(w<o-1){const k=Math.pow(2,w)*1e3;b(w+1),console.warn(`⚠️ Laylo SDK load failed (attempt ${w+1}), retrying in ${k}ms...`),setTimeout(()=>H(w+1),k)}else console.error("❌ Laylo SDK failed to load after retries:",R.message)}},[r,g]);return i.useEffect(()=>{H(0)},[H]),r},ft=({dropId:r,color:y="ff0409",theme:A="dark",background:b="solid",minimal:o=!0,style:W={},visible:u=!0})=>{const[g,H]=i.useState(0),[w,R]=i.useState(0),k=i.useRef(0),d=i.useRef(null),G=i.useRef(!1),U=2,_=7e3,se=i.useMemo(()=>{if(typeof navigator>"u")return!1;const D=navigator.userAgent,x=/AppleWebKit/i.test(D),h=/iP(hone|od|ad)|Mobile/i.test(D),E=/CriOS/i.test(D),le=/FxiOS/i.test(D);return x&&h&&!E&&!le},[]),[ee,v]=i.useState(null),T=i.useRef(u),Z=i.useRef(0),m=1e3,B=D=>(D||"")+((D||"").includes("?")?"&":"?")+"_ts="+Date.now(),I=i.useMemo(()=>r?`https://embed.laylo.com/?${new URLSearchParams({dropId:r,color:y,theme:A,background:b,...o&&{minimal:"true"}}).toString()}`:null,[r,y,A,b,o]),O=(D,x)=>{const h=new Date().toISOString();console.log(`[LayloSimple ${h}] ${D}`,x??"")};i.useEffect(()=>{const D=!T.current&&u;if(!u){d.current&&(clearTimeout(d.current),d.current=null),T.current=u;return}if(!D){T.current=u;return}if(R(0),k.current=Date.now(),G.current=!1,O("Visible -> ensuring iframe src",{retryCount:0,url:I}),se){v(null);const x=setTimeout(()=>{const h=B(I);Z.current=Date.now(),v(h)},180);return T.current=u,()=>{clearTimeout(x),d.current&&(clearTimeout(d.current),d.current=null)}}else ee||(Z.current=Date.now(),v(I));T.current=u},[u,I,se,ee]),i.useEffect(()=>{if(!se)return;const D=h=>{if(h.persisted&&u){const E=Date.now();E-Z.current>m&&(O("pageshow (persisted) -> refreshing iframe src (iOS)"),Z.current=E,G.current=!1,v(null),setTimeout(()=>{v(B(I))},180))}},x=()=>{if(document.visibilityState==="visible"&&u){const h=Date.now();h-Z.current>m&&(O("visibilitychange -> visible; refreshing iframe src (iOS)"),Z.current=h,v(E=>E??B(I)))}};return window.addEventListener("pageshow",D),document.addEventListener("visibilitychange",x),()=>{window.removeEventListener("pageshow",D),document.removeEventListener("visibilitychange",x)}},[se,u,I]);const $=()=>{const D=Date.now()-(k.current||0);G.current=!0,d.current&&(clearTimeout(d.current),d.current=null),O("Iframe onLoad fired",{elapsedMs:D})},V=D=>{if(O("Iframe onError",{error:D}),d.current&&(clearTimeout(d.current),d.current=null),w<U){O("Error -> retry (src bust)",{retryCount:w+1}),R(h=>h+1);const x=Date.now();x-Z.current>m&&(Z.current=x,k.current=Date.now(),G.current=!1,v(B(I)))}else O("Final error -> giving up after max retries")};return i.useEffect(()=>{if(!(!u||!ee))return d.current&&(clearTimeout(d.current),d.current=null),k.current=Date.now(),d.current=setTimeout(()=>{if(!G.current)if(w<U){O("Load timeout -> retry (src bust)",{retryCount:w+1}),R(x=>x+1);const D=Date.now();D-Z.current>m&&(Z.current=D,v(B(I)))}else O("Final load timeout -> giving up after max retries")},_),()=>{d.current&&(clearTimeout(d.current),d.current=null)}},[ee,u,w,I]),r?u?n.jsx("iframe",{id:`laylo-drop-${r}`,title:"Laylo Signup",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",allow:"web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture",loading:"eager",onLoad:$,onError:V,style:{...W,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",display:"block"},src:ee??I},g):n.jsx("div",{style:{...W}}):n.jsx("div",{style:{...W,display:"flex",alignItems:"center",justifyContent:"center",minHeight:60},children:n.jsx("span",{style:{color:"#999",fontSize:14},children:"[LayloSimple] Missing dropId"})})},ht=({contentRef:r,viewportContext:y={isRealMobileDevice:!1},onStateChange:A=()=>{}})=>{const[b,o]=i.useState("");i.useState(!1);const[W,u]=i.useState(!1);i.useState("us"),i.useState("normal");const[g,H]=i.useState(!1),[w,R]=i.useState(!1),[k,d]=i.useState(!1),[G,U]=i.useState(!1),[_,se]=i.useState(!1);i.useState(0);const ee=gt();i.useState(!1);const v=!k&&ee,T=v,Z=g,[m,B]=i.useState({isActive:!1,startY:0,currentY:0,startX:0,currentX:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null}),[I,O]=i.useState({expanded:!1,showDisclaimer:!1,phoneNumber:""});i.useState(!1),i.useRef(null),i.useRef(null);const $=i.useRef(null);i.useRef(null);const V=i.useRef(null),D=i.useCallback(()=>{O({expanded:g,showDisclaimer:w,phoneNumber:b}),console.log("💾 Drawer state saved, iframe content preserved")},[g,w,b]),x=i.useCallback(a=>{$.current&&!$.current.contains(a.target)&&(D(),H(!1),d(!1),R(!1))},[b,D]);i.useEffect(()=>(g&&(document.addEventListener("mousedown",x),document.addEventListener("touchstart",x)),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("touchstart",x)}),[g,x]),i.useEffect(()=>{const a=document.body,p=r?.current;if(g){const M=window.scrollY;a.classList.add("drawer-scroll-lock"),a.style.top=`-${M}px`,p&&p.classList.add("drawer-active")}else{a.classList.remove("drawer-scroll-lock");const M=a.style.top;a.style.top="",M&&window.scrollTo(0,parseInt(M||"0")*-1),p&&p.classList.remove("drawer-active")}return()=>{a.classList.remove("drawer-scroll-lock"),a.style.top="",p&&p.classList.remove("drawer-active")}},[g,r]);const h=i.useRef({drawerExpanded:void 0,drawerFullyClosed:void 0,iframeExpanded:void 0,phoneSubmitted:void 0});i.useEffect(()=>{const a={drawerExpanded:g,drawerFullyClosed:k,iframeExpanded:G,phoneSubmitted:W},p=h.current;(p.drawerExpanded!==a.drawerExpanded||p.drawerFullyClosed!==a.drawerFullyClosed||p.iframeExpanded!==a.iframeExpanded||p.phoneSubmitted!==a.phoneSubmitted)&&(h.current=a,A(a))},[g,k,G,W,A]),i.useRef(!1),i.useEffect(()=>{},[k]),i.useEffect(()=>{if(v&&ee&&!_){const a=setTimeout(()=>{se(!0),console.log("✅ Laylo iframe ready for interaction")},1e3);return()=>clearTimeout(a)}},[v,ee,_]);const E=i.useCallback(()=>k?"50px":G?"320px":g?"280px":"80px",[k,g,w,G]);i.useCallback(()=>{const a=E(),p=(()=>{const N="ontouchstart"in window||navigator.maxTouchPoints>0,C=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Y=window.innerWidth,z=window.innerHeight,S=Y/z;return N&&C&&(S<1.5||Y<768)})(),M=parseInt(a.replace("px",""));if(p)return`calc(${a} + 20px)`;{const N=Math.max(15,M*.2);return`calc(${a} + ${N}px)`}},[E,y]);const le=i.useCallback(a=>{if(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="BUTTON"||a.target.closest("iframe")||a.target.closest("button")||a.target.closest('[role="button"]'))return;const p=a.touches[0],M=Date.now(),N=a.target.closest(".mobile-drawer-content"),C=$.current?.getBoundingClientRect(),Y=C&&p.clientY>C.top&&p.clientY<C.top+120,z=g?C?.height*.4:120,S=C&&p.clientY>C.top&&p.clientY<C.top+z;B({isActive:!0,startY:p.clientY,currentY:p.clientY,startX:p.clientX,currentX:p.clientX,startTime:M,isDragging:!1,initialDrawerState:g,isOnDrawerContent:!!N,isOnDrawerHandle:!!Y,isOnSwipeZone:!!S,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null}),S&&!N&&(a.preventDefault(),a.stopPropagation())},[g]),te=i.useCallback(a=>{if(!m.isActive||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="BUTTON"||a.target.closest("iframe")||a.target.closest("button")||a.target.closest('[role="button"]'))return;const p=a.touches[0],M=m.startY-p.clientY,N=Math.abs(M),C=p.clientX-m.startX,Y=Math.abs(C);if(m.isVerticalIntent===null&&(N>4||Y>4)){const z=N>=Y*1.2;if(B(S=>({...S,isVerticalIntent:z})),!z)return}if(m.isVerticalIntent!==!1){if(!m.isDragging&&N>3&&m.isOnSwipeZone&&!m.isOnDrawerContent){const z=N>8||N>3&&Date.now()-m.startTime>100;B(S=>({...S,isDragging:!0,isIntentionalGesture:z,dragDistance:N})),z&&(a.preventDefault(),a.stopPropagation())}if(m.isDragging&&m.isOnSwipeZone&&!m.isOnDrawerContent){const z=Math.max(N,m.dragDistance);m.isIntentionalGesture&&(a.preventDefault(),a.stopPropagation()),B(S=>({...S,currentY:p.clientY,currentX:p.clientX,dragDistance:z}))}else m.isOnDrawerContent||B(z=>({...z,currentY:p.clientY,currentX:p.clientX}))}},[m]),oe=i.useCallback(a=>{if(!m.isActive)return;const p=m.startY-m.currentY,M=Math.abs(p),N=Date.now()-m.startTime,C=M/N,Y=8,z=.15,S=5,K=m.isIntentionalGesture?.7:1;let ae=!1;if(m.isDragging&&m.isIntentionalGesture){const j=Y*K,ce=z*K;C>ce?(ae=!0,console.log("🚀 Flick gesture detected:",{velocity:C,threshold:ce})):M>j?(ae=!0,console.log("🚀 Swipe gesture detected:",{distance:M,threshold:j})):M>S&&(ae=!0,console.log("🚀 Snap gesture detected:",{distance:M,threshold:S}))}else m.isDragging&&!m.isIntentionalGesture&&(C>z*1.2||M>Y*1.5)&&(ae=!0,console.log("🚀 Fallback gesture detected"));if(ae)C>z?($.current?.classList.add("momentum-fast"),setTimeout(()=>{$.current?.classList.remove("momentum-fast")},100)):($.current?.classList.add("momentum-slow"),setTimeout(()=>{$.current?.classList.remove("momentum-slow")},250)),p>0?g||(H(!0),d(!1),console.log("🔄 Drawer opened via swipe up")):g&&(H(!1),console.log("🔄 Drawer closed via swipe down"));else{const j=$.current?.getBoundingClientRect(),ce=g?j?.height*.4:120;j&&m.startY>j.top&&m.startY<j.top+ce&&(k?(d(!1),H(!0),console.log("🔄 Drawer opened via tap on swipe zone")):g?(H(!1),console.log("🔄 Drawer collapsed via tap on swipe zone")):(H(!0),console.log("🔄 Drawer expanded via tap on swipe zone")))}B({isActive:!1,startY:0,currentY:0,startX:0,currentX:0,startTime:0,isDragging:!1,initialDrawerState:!1,isOnDrawerContent:!1,isOnDrawerHandle:!1,isOnSwipeZone:!1,dragDistance:0,isIntentionalGesture:!1,isVerticalIntent:null})},[m,g,k]),J=i.useCallback(()=>{k?(d(!1),H(I.expanded||!0),R(I.showDisclaimer),I.phoneNumber&&o(I.phoneNumber)):g||(H(!0),I.showDisclaimer&&R(!0))},[k,g,I]),we=i.useCallback(a=>{a.stopPropagation(),k&&d(!1),H(!0),U(!0),setTimeout(()=>{U(!1)},1e4)},[k]);return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsxs("div",{ref:$,className:`mobile-drawer ${g?"expanded":"collapsed"} ${w?"disclaimer-peek":""}`,onTouchStart:le,onTouchMove:te,onTouchEnd:oe,onWheel:a=>{g&&(a.stopPropagation(),a.preventDefault())},style:{height:E(),transform:k?"translate3d(0, 100%, 0)":g?"translate3d(0, 0, 0)":"translate3d(0, calc(100% - 80px), 0)",transition:"transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"transform, height",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},onClick:J,role:"dialog","aria-label":"Contact form drawer","aria-expanded":g,children:[n.jsx("div",{"aria-hidden":"true",style:{position:"absolute",top:0,left:0,right:0,height:"64px",minHeight:"44px",background:"transparent",zIndex:3,pointerEvents:"auto"},onTouchStart:le,onTouchMove:te,onTouchEnd:oe}),n.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"8px 0 16px",cursor:"pointer"},"aria-hidden":"true",children:n.jsx("div",{style:{width:"40px",height:"4px",backgroundColor:"rgba(255, 255, 255, 0.3)",borderRadius:"2px"}})}),n.jsxs("div",{className:"drawer-content mobile-drawer-content",onTouchStart:a=>{a.stopPropagation(),a.touches&&a.touches[0]&&(V.current=a.touches[0].clientY)},onTouchMove:a=>{const p=a.currentTarget,{scrollTop:M,scrollHeight:N,clientHeight:C}=p;a.stopPropagation();const Y=M===0,z=M+C>=N,S=a.touches&&a.touches[0]?a.touches[0].clientY:null;let K=0;S!=null&&V.current!=null&&(K=S-V.current,V.current=S),(Y&&K>0||z&&K<0)&&a.preventDefault()},onWheel:a=>{a.stopPropagation()},onTouchEnd:a=>{a.stopPropagation()},style:{padding:"0 20px 20px",opacity:k?0:1,transition:"opacity 0.2s ease",height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"},children:[!k&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",marginBottom:"4px",flexShrink:0,position:"relative",zIndex:2},children:[n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"800",fontSize:"20px",lineHeight:"1.2em",color:"#FFFFFF"},children:"Text us"}),n.jsx("div",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.3em",color:"#FFFFFF",opacity:.8},children:"Exclusive events, contests, and more"})]}),n.jsx("div",{onClick:we,"aria-hidden":!T,style:{width:"calc(100% + 40px)",margin:"0px -20px 0 -20px",cursor:"pointer",borderRadius:"8px",overflow:"visible",zIndex:2,flexShrink:0,opacity:Z?1:0,height:Z?G?"200px":"160px":40,pointerEvents:Z?"auto":"none",transition:"opacity 0.3s ease, height 0.3s ease"},children:v&&n.jsx(ft,{dropId:"1nTsX",color:"ff0409",theme:"dark",background:"solid",minimal:!0,visible:T,style:{width:"100%",height:"100%",border:"none",borderRadius:"8px",background:"transparent",display:"block"}})})]})]})]})},Se=(r,y=null)=>{if(!r)return r;if(typeof r=="string"&&r.startsWith("data:"))return console.log("⚠️ Data URL detected, returning as-is:",r.substring(0,50)+"..."),r;const A=/iPad|iPhone|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);if(typeof r=="string"&&r.includes("/api/images/serve/")){console.log("🔄 Processing new image system URL:",r);const b=r.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);if(b){const o=b[1],W=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";let u="small";y&&(y<=150?u="thumbnail":y<=300?u="small":y<=600?u="medium":(y<=1200,u="large"));const g=`${W}/api/images/serve/${o}/${u}`;return console.log("✅ Generated optimized URL for new image system:",g,`(variant: ${u}, width: ${y})`),g}}if(typeof r=="string"&&r.includes("/images/figma-exact/")){const b=r.split("/").pop();return A&&b.includes(".webp")?`/images/optimized/${b.replace(".webp",".jpg")}`:`/images/optimized/${b}`}if(typeof r=="string"&&r.startsWith("http")){const b=encodeURIComponent(r),W=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/images/proxy-optimized?url=${b}`,u=A?"&format=jpeg&quality=85":"";return y?`${W}&w=${y}${u}`:`${W}${u}`}if(typeof r=="string"&&r.startsWith("/")&&(r.includes("/api/images/serve/")||!r.includes("/images/"))){console.log("🔄 Processing relative URL, assuming new image system:",r);const b=r.match(/([a-f0-9-]{36})/);if(b){const o=b[1],u=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/serve/${o}/medium`;return console.log("✅ Generated URL for UUID-based relative path:",u),u}}if(typeof r=="string"&&(r.includes("/images/")||r.includes("/custom/images/"))){const o=r.split("/").pop().replace(/\.[^/.]+$/,"");return y?`/images/optimized/${o}-${y}w.webp`:`/images/optimized/${o}.webp`}return console.log("⚠️ No optimization applied to URL:",r),r},Ve=r=>r==="event"?[150,300,450]:r==="hero"?[600,900,1200]:[150,300,600],bt=(r,y="event")=>r?Ve(y).map(A=>`${Se(r,A)} ${A}w`).join(", "):"",xt=(r,y="event")=>{if(!r||/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))return"";if(typeof r=="string"&&(r.includes("/api/images/serve/")||r.includes("/api/settings/serve/")||r.startsWith("/api/")))return console.log("🚫 Skipping AVIF for internal API URL to prevent loop:",r),"";const b=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";return Ve(y).map(o=>`${b}/images/proxy-optimized?url=${encodeURIComponent(r)}&w=${o}&format=avif ${o}w`).join(", ")},ke=[{id:"us",code:"+1",name:"United States",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"ca",code:"+1",name:"Canada",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"(555) 123-4567",maxLength:14,digitLength:10},{id:"gb",code:"+44",name:"United Kingdom",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+",pattern:/^\d{10,11}$/,placeholder:"7911 123456",maxLength:13,digitLength:11},{id:"au",code:"+61",name:"Australia",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+",pattern:/^\d{9}$/,placeholder:"412 345 678",maxLength:11,digitLength:9},{id:"de",code:"+49",name:"Germany",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"30 12345678",maxLength:13,digitLength:11},{id:"fr",code:"+33",name:"France",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=",pattern:/^\d{9}$/,placeholder:"6 12 34 56 78",maxLength:12,digitLength:9},{id:"es",code:"+34",name:"Spain",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K",pattern:/^\d{9}$/,placeholder:"612 34 56 78",maxLength:11,digitLength:9},{id:"it",code:"+39",name:"Italy",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"312 345 6789",maxLength:12,digitLength:10},{id:"jp",code:"+81",name:"Japan",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"90 1234 5678",maxLength:13,digitLength:11},{id:"kr",code:"+82",name:"South Korea",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K",pattern:/^\d{10,11}$/,placeholder:"10 1234 5678",maxLength:13,digitLength:11},{id:"cn",code:"+86",name:"China",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+",pattern:/^\d{11}$/,placeholder:"138 0013 8000",maxLength:13,digitLength:11},{id:"in",code:"+91",name:"India",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K",pattern:/^\d{10}$/,placeholder:"98765 43210",maxLength:12,digitLength:10},{id:"br",code:"+55",name:"Brazil",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=",pattern:/^\d{10,11}$/,placeholder:"11 91234 5678",maxLength:14,digitLength:11},{id:"mx",code:"+52",name:"Mexico",flag:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=",pattern:/^\d{10}$/,placeholder:"55 1234 5678",maxLength:12,digitLength:10}],$e=(r,y)=>{const A=typeof r=="string"?r.replace(/[^\d]/g,""):"",b=ke.find(W=>W.id===y);if(!b||A.length===0)return A;const o=A.slice(0,b.digitLength);switch(y){case"us":case"ca":return o.length<=3?o:o.length<=6?`(${o.slice(0,3)}) ${o.slice(3)}`:`(${o.slice(0,3)}) ${o.slice(3,6)}-${o.slice(6)}`;case"gb":return o.length<=4?o:o.length<=7?`${o.slice(0,4)} ${o.slice(4)}`:`${o.slice(0,4)} ${o.slice(4,7)} ${o.slice(7)}`;case"jp":case"kr":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;case"cn":return o.length<=3?o:o.length<=7?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,7)} ${o.slice(7)}`;case"in":return o.length<=5?o:`${o.slice(0,5)} ${o.slice(5)}`;case"br":return o.length<=2?o:o.length<=7?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,7)} ${o.slice(7)}`;case"mx":return o.length<=2?o:o.length<=6?`${o.slice(0,2)} ${o.slice(2)}`:`${o.slice(0,2)} ${o.slice(2,6)} ${o.slice(6)}`;default:return o.length<=3?o:o.length<=6?`${o.slice(0,3)} ${o.slice(3)}`:`${o.slice(0,3)} ${o.slice(3,6)} ${o.slice(6)}`}},wt=(r,y)=>{const A=r.replace(/[^\d]/g,""),b=ke.find(o=>o.id===y);return b?b.pattern.test(A):A.length>=10&&A.length<=15},Ae=r=>ke.find(y=>y.id===r)||ke[0],At=()=>{const{trackEvent:r}=mt(),[y,A]=i.useState(!1);i.useCallback(e=>{A(e),e&&r("privacy_consent",{action:"granted",timestamp:Date.now(),component:"PrivacyConsentModal"})},[r]);const[b,o]=i.useState(!0),[W,u]=i.useState(!1);i.useEffect(()=>{setTimeout(()=>{o(!1),u(!0)},2e3),r("component_load",{component:"FigmaMobile",viewport_type:"mobile"})},[r]),i.useEffect(()=>{if(!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')){const e=document.createElement("script");e.src="https://embed.laylo.com/laylo-sdk.js",e.async=!0,e.defer=!0,e.onerror=s=>{console.warn("⚠️ Laylo SDK failed to load in FigmaMobile:",s)},e.onload=()=>{console.log("✅ Laylo SDK script loaded successfully in FigmaMobile")},document.head.appendChild(e)}},[]);const[g,H]=i.useState(!1),[w,R]=i.useState(""),[k,d]=i.useState(!1),[G,U]=i.useState(!1),[_,se]=i.useState("us"),[ee,v]=i.useState("normal"),[T,Z]=i.useState(!1),[m,B]=i.useState(""),[I,O]=i.useState(""),[$,V]=i.useState(!1),[D,x]=i.useState("normal"),[h,E]=i.useState(!1),[le,te]=i.useState(!1),[oe,J]=i.useState(!1),[we,a]=i.useState(!1);i.useState(!1);const[p,M]=i.useState(0),[N,C]=i.useState(!1),[Y,z]=i.useState(!1),[S,K]=i.useState({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1}),{loading:ae,showAllEvents:j,setShowAllEvents:ce,filteredFeaturedEvents:de,filteredHomepageEvents:ge}=pt(),[Ne,Xe]=i.useState(0),[fe,Je]=i.useState(!1),[he,Ke]=i.useState(!1),[X,Le]=i.useState(null),[ze,Pe]=i.useState(!1),Ze=i.useCallback((e,s)=>{if(ze)return;Pe(!0);let t=e.coverImage;t&&!t.startsWith("http")&&(t=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}${t}`),t&&(t=t.replace(/[?&](w|width|h|height|size)=\d+/g,""),t=t.replace(/[?&]$/,"")),Le({...e,imageUrl:t||e.coverImage,originalRect:s?.getBoundingClientRect()||null}),setTimeout(()=>{Pe(!1)},400)},[ze]),Fe=i.useCallback(()=>{Le(null)},[]),F=i.useRef({scrollY:0,locked:!1,prevent:void 0,prevBodyPosition:"",prevBodyTop:"",prevBodyWidth:"",prevBodyOverflow:"",prevBodyTouchAction:""}),Re=i.useCallback(()=>{if(F.current.locked)return;const e=window.scrollY||window.pageYOffset||0;F.current.scrollY=e;const s=l=>{l&&typeof l.preventDefault=="function"&&l.preventDefault(),l&&typeof l.stopPropagation=="function"&&l.stopPropagation()};F.current.prevent=s,document.documentElement.style.overscrollBehavior="none";const t=document.body;F.current.prevBodyPosition=t.style.position||"",F.current.prevBodyTop=t.style.top||"",F.current.prevBodyWidth=t.style.width||"",F.current.prevBodyOverflow=t.style.overflow||"",F.current.prevBodyTouchAction=t.style.touchAction||"",t.style.position="fixed",t.style.top=`-${e}px`,t.style.width="100%",t.style.overflow="hidden",t.style.touchAction="none",window.addEventListener("wheel",s,{passive:!1,capture:!0}),window.addEventListener("touchmove",s,{passive:!1,capture:!0}),F.current.locked=!0},[]),Me=i.useCallback(()=>{if(!F.current.locked)return;const e=document.body;e.style.position=F.current.prevBodyPosition,e.style.top=F.current.prevBodyTop,e.style.width=F.current.prevBodyWidth,e.style.overflow=F.current.prevBodyOverflow,e.style.touchAction=F.current.prevBodyTouchAction,document.documentElement.style.overscrollBehavior="",F.current.prevent&&(window.removeEventListener("wheel",F.current.prevent,{capture:!0}),window.removeEventListener("touchmove",F.current.prevent,{capture:!0}));const s=F.current.scrollY||0;window.scrollTo(0,s),F.current.locked=!1},[]);i.useEffect(()=>{if(X)return Re(),()=>{Me()};Me()},[X,Re,Me]);const[ve,me]=i.useState("hd720"),[We,pe]=i.useState("fast"),[ie,De]=i.useState({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""}),He=i.useCallback(()=>{De({expanded:h,showDisclaimer:le,showVerification:T,verificationCode:m,phoneNumber:w}),console.log("💾 Drawer state saved, iframe content preserved")},[h,le,T,m,w]),[vt,je]=i.useState(!1),re=i.useRef(null),Te=i.useRef(null),P=i.useRef(null),ye=i.useRef(!0),Ee=i.useRef(null),Ie=i.useRef(null),Qe=lt(),_e=Math.max(Qe||0,0)+12,{scrollY:qe}=ct(Ie.current,{threshold:20,throttleMs:32,passive:!0});i.useEffect(()=>{const e=document.body,s=Ie.current;if(h){const t=window.scrollY;e.classList.add("drawer-scroll-lock"),e.style.top=`-${t}px`,s&&s.classList.add("drawer-active")}else{const t=e.style.top;e.classList.remove("drawer-scroll-lock"),e.style.top="",t&&window.scrollTo(0,parseInt(t||"0")*-1),s&&s.classList.remove("drawer-active")}return()=>{e.classList.remove("drawer-scroll-lock"),e.style.top="",s&&s.classList.remove("drawer-active")}},[h]),i.useCallback(e=>{const s=e.target.value,t=Ae(_),l=s.replace(/[^\d]/g,"");if(l.length>t.digitLength)return;const c=$e(l,_);R(c)},[_]),i.useCallback(e=>{e.key==="Enter"&&et()},[]),i.useCallback(e=>{const s=e.target.value,t=Ae(s);if(se(s),Te.current&&t.flag&&(Te.current.src=t.flag,Te.current.alt=t.name),w){const l=w.replace(/[^\d]/g,""),c=$e(l,s);R(c)}console.log(`🌍 Country changed to: ${t.code} (${t.name})`)},[w]);const et=i.useCallback(async()=>{const e=w.trim();if(!e||k)return;if(e.replace(/\D/g,"")==="5555555555"){console.log("🧪 Test number detected - showing loading then verification UI"),d(!0),v("loading"),setTimeout(()=>{v("valid"),O(e),d(!1),setTimeout(()=>{Z(!0),E(!0)},200)},800);return}const l=Ae(_);if(!wt(e,_)){console.warn("Invalid phone number format for",l.name),v("invalid"),re.current&&(re.current.classList.add("shake"),setTimeout(()=>{re.current?.classList.remove("shake"),v("normal")},400));return}try{d(!0),v("loading"),console.log("📱 Submitting phone number:",{phone:e,countryCode:l.code});const c=window.location.hostname==="localhost"?"":"https://admin.b2b.click",f=await fetch(`${c}/api/home-settings/submit-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,countryCode:l.code})}),L=await f.json();f.ok&&L.success?(console.log("✅ Phone number submitted successfully"),L.requiresVerification?(console.log("🔐 Moving to verification step"),v("normal"),O(e),setTimeout(()=>{Z(!0),E(!0)},500)):(U(!0),v("valid"),R(""),setTimeout(()=>{U(!1),v("normal")},3e3))):(console.error("❌ Failed to submit phone number:",L.error||"Unknown error"),v("invalid"),re.current&&(re.current.classList.add("shake"),setTimeout(()=>{re.current?.classList.remove("shake"),v("normal")},400)))}catch(c){console.error("❌ Error submitting phone number:",c),v("invalid"),re.current&&(re.current.classList.add("shake"),setTimeout(()=>{re.current?.classList.remove("shake"),v("normal")},400))}finally{d(!1)}},[w,k,_]);i.useCallback(async()=>{const e=m.trim();if(!e||$)return;if(I.replace(/\D/g,"")==="5555555555"&&(console.log("🧪 Test verification - accepting any 4-digit code"),e.length===4)){V(!0),v("loading"),setTimeout(()=>{x("valid"),U(!0),V(!1)},1e3),setTimeout(()=>{J(!0),Z(!1),E(!1),te(!1)},2e3),setTimeout(()=>{B(""),O(""),R(""),U(!1),v("normal"),x("normal"),V(!1),J(!1),M(0),C(!1),P.current&&(clearInterval(P.current),P.current=null),De({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3);return}if(!/^\d{4}$/.test(e)){console.warn("Invalid verification code format"),x("invalid"),setTimeout(()=>{x("filled")},400);return}try{V(!0),v("loading"),console.log("🔐 Submitting verification code");const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click",c=await fetch(`${l}/api/home-settings/verify-phone`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:I,code:e})}),f=await c.json();c.ok&&f.success?(console.log("✅ Phone verification successful"),x("valid"),U(!0),setTimeout(()=>{J(!0),Z(!1),E(!1),te(!1)},2e3),setTimeout(()=>{B(""),O(""),R(""),U(!1),v("normal"),x("normal"),V(!1),J(!1),M(0),C(!1),P.current&&(clearInterval(P.current),P.current=null),De({expanded:!1,showDisclaimer:!1,showVerification:!1,verificationCode:"",phoneNumber:""})},5e3)):(console.error("❌ Phone verification failed:",f.error||"Unknown error"),x("invalid"),setTimeout(()=>{x("filled")},400))}catch(l){console.error("❌ Error submitting verification code:",l),x("invalid"),setTimeout(()=>{x("filled")},400)}finally{V(!1)}},[m,$,I]);const be=i.useCallback(()=>{console.log("🚀 Starting countdown timer"),P.current&&(clearInterval(P.current),P.current=null),M(60),C(!1),P.current=setInterval(()=>{if(!ye.current){P.current&&(clearInterval(P.current),P.current=null);return}M(e=>(console.log("⏰ Countdown tick:",e),e<=1?(console.log("✅ Countdown finished, enabling resend"),ye.current&&C(!0),P.current&&(clearInterval(P.current),P.current=null),0):e-1))},1e3)},[]);i.useCallback(async()=>{if(!(!N||Y||!I))try{z(!0),console.log("🔄 Resending verification code to:",I);const e=window.location.hostname==="localhost"?"":"https://admin.b2b.click",t=await(await fetch(`${e}/api/home-settings/resend-verification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:I})})).json();t.success?(console.log("✅ Verification code resent successfully"),be()):(console.error("❌ Failed to resend verification code:",t.error),be())}catch(e){console.error("❌ Error resending verification code:",e),be()}finally{z(!1)}},[N,Y,I,be]),i.useEffect(()=>(ye.current=!0,()=>{ye.current=!1,P.current&&(clearInterval(P.current),P.current=null)}),[]),i.useEffect(()=>{!T&&P.current&&(clearInterval(P.current),P.current=null,M(0),C(!1))},[T]),i.useEffect(()=>{console.log("🔄 Countdown useEffect triggered:",{showVerification:T,verificationPhone:I,resendCountdown:p,canResend:N}),T&&I&&p===0&&!N&&(console.log("🚀 Starting resend countdown"),be())},[T,I,be]),i.useEffect(()=>{ae||(setTimeout(()=>{Je(!0)},150),setTimeout(()=>{Ke(!0)},300))},[ae]),i.useEffect(()=>{const e=setTimeout(()=>{J(!1),E(!1)},500);return()=>clearTimeout(e)},[]),i.useEffect(()=>{const s=setTimeout(()=>{if("connection"in navigator){const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(c){const f=c.effectiveType,L=c.downlink;console.log("🌐 Connection detected:",{effectiveType:f,downlink:L}),f==="4g"&&L>5?(me("hd1080"),pe("fast")):f==="4g"||f==="3g"&&L>2?(me("hd720"),pe("medium")):(me("large"),pe("slow"));return}}const t=performance.now(),l=new Image;l.onload=()=>{const f=performance.now()-t;console.log("🚀 Speed test completed in:",f+"ms"),f<200?(me("hd1080"),pe("fast")):f<500?(me("hd720"),pe("medium")):(me("large"),pe("slow"))},l.onerror=()=>{console.log("⚠️ Speed test failed, using default HD quality"),me("hd720"),pe("medium")},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},200);return()=>clearTimeout(s)},[]),i.useEffect(()=>{if(de&&de.length>0){console.log("🚀 Preloading critical event images for instant display...");const e=/iPhone|iPad|iPod/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);de.slice(0,2).forEach((s,t)=>{if(s.coverImage){if(!e&&!s.coverImage.includes("/api/images/serve/")){const c=document.createElement("link");c.rel="preload",c.as="image",c.type="image/avif";const f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click";c.href=`${f}/images/proxy-optimized?url=${encodeURIComponent(s.coverImage)}&w=120&format=avif`,document.head.appendChild(c)}const l=document.createElement("link");if(l.rel="preload",l.as="image",l.type="image/webp",l.href=Se(s.coverImage,300),document.head.appendChild(l),e){const c=document.createElement("link");c.rel="preload",c.as="image",c.href=s.coverImage,document.head.appendChild(c)}console.log(`✅ Preloaded mobile event image ${t+1}: ${s.title} ${e?"(Safari mobile optimized)":""}`)}})}},[de]);const[ue,Be]=i.useState(!1),[yt,Ce]=i.useState(!1),Oe=()=>{ue?(Be(!1),Ce(!1)):(Ce(!0),Be(!0),setTimeout(()=>Ce(!1),600))},Ge=()=>{const e=window.location.pathname;return e==="/"||e===""?"events":e.startsWith("/about")?"about":e.startsWith("/contact")?"contact":"events"},[tt,it]=i.useState(Ge());i.useEffect(()=>{const e=()=>{it(Ge())};return window.addEventListener("popstate",e),e(),()=>{window.removeEventListener("popstate",e)}},[]);const nt=e=>{if(e==="/"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};i.useCallback(()=>{E(!0),te(!0)},[]),i.useCallback(()=>{!w.trim()&&!T&&setTimeout(()=>{E(!1),te(!1)},200)},[w,T]);const xe=i.useCallback(e=>{Ee.current&&!Ee.current.contains(e.target)&&(He(),E(!1),T?J(!1):(J(!1),te(!1)))},[w,T,He]);i.useEffect(()=>(h&&(document.addEventListener("mousedown",xe),document.addEventListener("touchstart",xe)),()=>{document.removeEventListener("mousedown",xe),document.removeEventListener("touchstart",xe)}),[h,xe]);const Ue=i.useCallback(()=>oe?"50px":we?"320px":T&&h?"240px":T&&!h?"60px":h?"280px":"80px",[oe,T,h,le,we]),ot=i.useCallback(()=>{const e=Ue(),s=(()=>{const l="ontouchstart"in window||navigator.maxTouchPoints>0,c=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),f=window.innerWidth,L=window.screen.width,q=window.devicePixelRatio||1;return l&&c&&Math.abs(f-L)<50&&q>1})(),t=parseInt(e.replace("px",""));if(s)return`calc(${e} + 20px)`;{const l=Math.max(15,t*.2);return`calc(${e} + ${l}px)`}},[Ue,Ne]);i.useEffect(()=>{const e=()=>{Xe(s=>s+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),e(),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),i.useCallback(e=>{if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],t=Date.now();K({isActive:!0,startY:s.clientY,currentY:s.clientY,startTime:t,isDragging:!1,initialDrawerState:h})},[h]),i.useCallback(e=>{if(!S.isActive||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe"))return;const s=e.touches[0],t=S.startY-s.clientY,l=Math.abs(t);!S.isDragging&&l>10&&(K(c=>({...c,isDragging:!0})),e.preventDefault()),S.isDragging&&(K(c=>({...c,currentY:s.clientY})),e.preventDefault())},[S]),i.useCallback(e=>{if(!S.isActive)return;if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.closest("iframe")){K({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1});return}const s=S.startY-S.currentY,t=Math.abs(s),l=Date.now()-S.startTime,c=t/l,f=30,L=.5,q=50;let ne=!1;if(S.isDragging&&((c>L||t>f||t>q)&&(ne=!0),ne)){const Q=Ee.current;Q&&(Q.classList.remove("momentum-fast","momentum-slow"),c>L?Q.classList.add("momentum-fast"):Q.classList.add("momentum-slow"),setTimeout(()=>{Q&&Q.classList.remove("momentum-fast","momentum-slow")},250)),s>0?h||(E(!0),J(!1)):h&&E(!1)}K({isActive:!1,startY:0,currentY:0,startTime:0,isDragging:!1,initialDrawerState:!1})},[S,h]),i.useCallback(()=>{oe?(J(!1),E(ie.expanded||!0),te(ie.showDisclaimer),Z(ie.showVerification),ie.verificationCode&&(B(ie.verificationCode),ie.verificationCode.length===4&&x("filled")),ie.phoneNumber&&R(ie.phoneNumber)):h||(E(!0),ie.showDisclaimer&&!T&&te(!0))},[oe,h,ie,T]),i.useCallback(e=>{e.stopPropagation(),oe&&J(!1),E(!0),a(!0),setTimeout(()=>{a(!1)},1e4)},[oe]),i.useCallback(()=>{je(!0)},[]),i.useCallback(()=>{je(!1)},[]),i.useCallback(()=>{je(!1)},[]),i.useEffect(()=>{const e=document.querySelector('meta[name="viewport"]'),s=e?e.getAttribute("content"):"";let t=document.querySelector('meta[name="viewport"]');t||(t=document.createElement("meta"),t.name="viewport",document.head.appendChild(t)),t.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no";const l=(q,ne)=>{let Q=document.querySelector(`meta[name="${q}"]`);Q||(Q=document.createElement("meta"),Q.name=q,document.head.appendChild(Q)),Q.content=ne};l("apple-mobile-web-app-capable","yes"),l("apple-mobile-web-app-status-bar-style","black-translucent"),l("apple-touch-fullscreen","yes"),l("mobile-web-app-capable","yes"),l("format-detection","telephone=no"),document.documentElement.style.webkitTextSizeAdjust="100%",document.documentElement.style.textSizeAdjust="100%";let c=null,f=null;const L=()=>{c&&cancelAnimationFrame(c),f&&clearTimeout(f),f=setTimeout(()=>{c=requestAnimationFrame(()=>{const q=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${q}px`)})},100)};return L(),window.addEventListener("resize",L,{passive:!0}),window.addEventListener("orientationchange",L,{passive:!0}),()=>{e&&s&&e.setAttribute("content",s),window.removeEventListener("resize",L),window.removeEventListener("orientationchange",L),c&&cancelAnimationFrame(c),f&&clearTimeout(f)}},[]);const at=i.useMemo(()=>{const e="https://www.youtube.com/embed/vEHTO3gf1jk",l={...{autoplay:"1",mute:"1",controls:"0",showinfo:"0",rel:"0",loop:"1",playlist:"vEHTO3gf1jk",modestbranding:"1",iv_load_policy:"3",fs:"0",disablekb:"1",hd:"1",cc_load_policy:"0",autohide:"1",wmode:"transparent",enablejsapi:"1",origin:window.location.origin},...{vq:ve,quality:ve}},c=Object.entries(l).map(([L,q])=>`${L}=${q}`).join("&"),f=`${e}?${c}`;return console.log("🎥 YouTube URL built:",{videoQuality:ve,connectionSpeed:We,finalURL:f}),f},[ve,We]),Ye=i.useCallback(()=>{o(!1),u(!0),r("video_interaction",{action:"thumbnail_click",video_id:"vEHTO3gf1jk",component:"FigmaMobile"})},[r]),rt=i.useMemo(()=>n.jsx("div",{onClick:Ye,style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",cursor:"pointer",backgroundImage:"url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transition:"transform 0.2s ease-out"},onMouseDown:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"},onTouchStart:e=>{e.currentTarget.style.transform="translateZ(0) scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="translateZ(0) scale(1)"}}),[Ye]);return ae?n.jsx(st,{fullScreen:!0,minDisplayTime:600,showMessage:!1}):n.jsxs(n.Fragment,{children:[n.jsx("link",{rel:"stylesheet",href:"/css/mobile-scroll-fix.css"}),n.jsx("style",{children:`
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
        `}),n.jsxs("div",{className:"mobile-container",style:{background:"#000000",fontFamily:"Inter, sans-serif"},role:"main","aria-label":"BOUNCE2BOUNCE Mobile Experience",children:[n.jsxs("main",{style:{width:"100vw",height:"100vh",maxWidth:"100vw",maxHeight:"100vh",margin:"0",position:"relative",background:"#000000",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:"100vh",minWidth:"100vw",isolation:"isolate",transform:"none",willChange:"auto",WebkitOverflowScrolling:"auto",WebkitTransform:"none",touchAction:"manipulation",overscrollBehavior:"contain"},"aria-label":"Mobile homepage content",children:[n.jsx(dt,{currentPage:tt,scrollY:qe,onNavigate:nt,onMenuToggle:H}),n.jsxs("div",{ref:Ie,className:"mobile-content-container",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:_e,paddingLeft:"0px",paddingRight:"0px",paddingBottom:ot(),boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",WebkitOverscrollBehavior:"contain",scrollBehavior:"auto",transform:"translateZ(0)",WebkitTransform:"translateZ(0)",willChange:"auto",touchAction:"pan-y",WebkitTouchCallout:"none",WebkitUserSelect:"none",scrollSnapType:"none",WebkitScrollSnapType:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},children:[n.jsxs("section",{"aria-labelledby":"events-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:he?1:0,transform:he?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"0ms"},children:[n.jsxs("div",{style:{display:"flex",width:"min(344px, calc(100vw - 4px))",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:[n.jsx("h2",{id:"events-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"normal",margin:0,textAlign:"left"},children:"Events"}),n.jsxs("div",{style:{display:"flex",width:"118px",height:"34px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,borderRadius:"9px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",position:"relative",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",WebkitTapHighlightColor:"transparent",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"},onClick:()=>ce(!j),role:"switch","aria-checked":j,"aria-label":`Switch to ${j?"Past":"Next"} events`,tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ce(!j))},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},onMouseDown:e=>{e.currentTarget.style.transform="scale(0.98)"},onMouseUp:e=>{e.currentTarget.style.transform="scale(1)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)"},children:[n.jsx("div",{style:{position:"absolute",width:"57px",height:"30px",borderRadius:"7px",border:"0.5px solid rgba(0, 0, 0, 0.04)",background:"#FFF",boxShadow:"0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)",left:j?"2px":"59px",top:"2px",transition:"left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1}}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",borderRadius:"7px",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:j?"#000":"#FFF",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:j?"590":"400",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Next"})}),n.jsx("div",{style:{display:"flex",padding:"3px 10px",alignItems:"center",flex:"1 0 0",alignSelf:"stretch",position:"relative",zIndex:2},children:n.jsx("span",{style:{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:1,flex:"1 0 0",overflow:"hidden",color:j?"#FFF":"#000",textAlign:"center",fontFeatureSettings:"'liga' off, 'clig' off",textOverflow:"ellipsis",fontFamily:"Inter",fontSize:"13px",fontStyle:"normal",fontWeight:j?"400":"590",lineHeight:"18px",letterSpacing:"-0.08px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},children:"Past"})})]})]}),j&&de.length>0&&n.jsx("div",{style:{width:"100%",transition:"opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:j?1:0,transform:j?"translateY(0)":"translateY(-20px)",marginBottom:j?"20px":"0px",overflow:"hidden"},children:de.map((e,s)=>n.jsx("div",{className:fe?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"2px",boxSizing:"border-box",display:"flex",justifyContent:"center",opacity:fe?1:0,transform:fe?"translateY(0) scale(1)":"translateY(20px) scale(0.96)",transition:"opacity var(--animation-duration-slow) var(--animation-easing-standard), transform var(--animation-duration-slow) var(--animation-easing-standard)",transitionDelay:fe?`${s*120}ms`:"0s"},children:n.jsxs("div",{onClick:t=>{console.log("🔍 Mobile Featured Event: Click detected!",t.target),t.preventDefault(),t.stopPropagation(),e?.ticketsUrl&&e.ticketsUrl!=="#"?(console.log(`🎫 Mobile Featured Event: Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")):(console.log("🎫 Mobile Featured Event: No ticket link available for",e?.title),console.log("🔍 Mobile Featured Event data:",e),console.log("🔍 Available fields:",Object.keys(e||{})))},style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.98)"},onTouchEnd:t=>{t.currentTarget.style.transform="scale(1)"},role:"button",tabIndex:0,"aria-label":"View featured event details",children:[n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:e.coverImage?n.jsxs("picture",{children:[n.jsx("source",{srcSet:xt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:bt(e.coverImage,"hero"),sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:Se(e.coverImage,375),alt:`${e.title} - Featured Event`,loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:",e.title),onError:t=>{console.error("❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:",t.target.src),t.target.dataset.heroFallbackAttempted?(t.target.removeAttribute("onError"),console.error("❌ Hero fallback also failed, removing error handler")):(t.target.dataset.heroFallbackAttempted="true",t.target.src="/images/optimized/hero-left-image-375w.jpg")},style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]}):n.jsxs("picture",{children:[n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/avif"}),n.jsx("source",{srcSet:"/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w",sizes:"(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px",type:"image/webp"}),n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",loading:"eager",decoding:"async",fetchpriority:"high",onLoad:()=>console.log("✅ MOBILE DEFAULT HERO IMAGE LOADED"),onError:t=>console.error("❌ MOBILE DEFAULT HERO IMAGE FAILED:",t.target.src),style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}})]})}),n.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)",borderRadius:"20px",pointerEvents:"none",zIndex:2,WebkitTransform:"translateZ(0)",transform:"translateZ(0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden"}}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"8px",display:"flex",width:"100%",justifyContent:"space-between",padding:"0px 10px 0px 16px",gap:"12px",boxSizing:"border-box",zIndex:3,minHeight:"44px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",opacity:1,transform:"translateZ(0)",willChange:"transform"},children:[n.jsxs("div",{style:{display:"flex",flex:"1",padding:"0px 0px",flexDirection:"column",minWidth:0,maxWidth:"calc(100% - 132px)"},children:[n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"6px",minWidth:0,marginBottom:"1px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:n.jsx("path",{d:"M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8",stroke:"#FFF",strokeWidth:"0.5"})}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:e.eventDate?new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:typeof window<"u"&&window.__B2B_TIMEZONE||"America/New_York"}).format(new Date(e.eventDate)).replace(",","th,"):e.date||"March 29th, 9:00 P.M."})]}),n.jsxs("div",{style:{display:"flex",alignSelf:"stretch",alignItems:"center",gap:"4px",minWidth:0},children:[n.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 10 10",fill:"none",style:{flexShrink:0},children:[n.jsx("path",{d:"M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z",stroke:"#FFF",strokeWidth:"0.5"}),n.jsx("circle",{cx:"5",cy:"4",r:"1",fill:"#FFF"})]}),n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"12px",fontWeight:"200",lineHeight:"normal",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 2px rgba(0, 0, 0, 0.7)",opacity:1},children:e.location||"Asbury Park, NJ"})]})]}),n.jsx("div",{style:{display:"flex",width:"120px",height:"44px",padding:"2px",justifyContent:"center",alignItems:"center",flexShrink:0,zIndex:3},children:n.jsx("div",{style:{display:"flex",width:"116px",height:"40px",justifyContent:"center",alignItems:"center",gap:"8px",borderRadius:"22px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onTouchStart:t=>{t.stopPropagation(),t.target.style.transform="scale(0.95)",t.target.style.background="rgba(35, 35, 35, 0.98)",t.target.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:t=>{t.stopPropagation(),t.target.style.transform="scale(1)",t.target.style.background="rgba(15, 15, 15, 0.95)",t.target.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onClick:t=>{t.stopPropagation(),e.isRealEvent&&e.hasTicketLink&&(console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer"))},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"15px",fontWeight:"500",lineHeight:"normal",pointerEvents:"none",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},children:e.isRealEvent&&e.hasTicketLink?e.buttonText||"Get Tickets":"View Event"})})})]}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"50px",display:"flex",width:"100%",height:"auto",minHeight:"32px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2,pointerEvents:"none",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"translateZ(0)",willChange:"transform"},children:n.jsx("div",{style:{color:"#FFFFFF",fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:"24px",fontWeight:"800",lineHeight:"1.1",flex:"1",display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"normal",maxWidth:"100%",margin:"0px 0px 4px 0px",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",textShadow:"0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",transform:"translateZ(0)",willChange:"transform"},children:e.title||"FEATURED EVENT"})})]})},`hero-${e.id}`))}),j&&de.length===0&&ge.length>0&&n.jsx("div",{className:fe?"event-card-spring":"event-card-hidden",style:{width:"100%",padding:"0",marginBottom:"0px",boxSizing:"border-box",display:"flex",justifyContent:"center"},children:n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",height:"min(344px, calc(100vw - 4px))",position:"relative",margin:"0 auto",borderRadius:"20px",overflow:"hidden",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)"},children:[n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/optimized/hero-left-image-375w.jpg",alt:"Default Hero Background",style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:1}}),n.jsx("div",{style:{position:"absolute",left:"0px",bottom:"95px",display:"flex",width:"100%",height:"48px",padding:"8px 16px",justifyContent:"flex-start",alignItems:"flex-end",gap:"10px",boxSizing:"border-box",zIndex:2},children:n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"24px",fontWeight:"800",lineHeight:"1.1"},children:j?"UPCOMING EVENTS":"PAST EVENTS"})})]})}),n.jsxs("div",{style:{width:"min(344px, calc(100vw - 4px))",margin:"0 auto",position:"relative",paddingBottom:ge.length>3?"4px":"0",background:"#000000"},children:[n.jsxs("div",{className:`mobile-event-cards-container ${ue?"expanded":"collapsed"}`,style:{width:"100%",position:"relative",background:"#000000"},children:[n.jsx("div",{role:"list","aria-label":j?"Upcoming live music events":"Past live music events",style:{display:"flex",width:"100%",flexDirection:"column",justifyContent:"center",alignItems:"stretch",gap:"4px",flexShrink:0,padding:"4px 0",boxSizing:"border-box",minHeight:"auto",overflow:"visible",position:"relative",zIndex:1},children:ge.length>0?ge.map((e,s)=>n.jsx("article",{className:`mobile-event-card-item ${fe?"event-card-spring":"event-card-hidden"}`,style:{width:"100%",minHeight:"132px",height:"auto",borderRadius:"20px",background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.12)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",position:"relative",margin:"0 0 4px 0",padding:"2px",overflow:"hidden",boxSizing:"border-box",isolation:"isolate",transform:"translateZ(0)",willChange:"transform, opacity",zIndex:1,clear:"both"},children:n.jsxs("div",{style:{width:"100%",height:"124px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:"2px"},children:[n.jsx("div",{style:{position:"absolute",left:"2px",top:"2px",width:"120px",height:"120px",flexShrink:0,borderRadius:"20px",overflow:"hidden",cursor:"pointer",zIndex:100,transition:"transform 0.1s ease",boxSizing:"border-box"},onClick:t=>{t.preventDefault(),t.stopPropagation();const l=t.currentTarget.querySelector("img");Ze(e,l)},onTouchStart:t=>{t.currentTarget.style.transform="scale(0.95)"},onTouchEnd:t=>{t.preventDefault(),t.stopPropagation(),t.currentTarget.style.transform="scale(1)";const l=t.currentTarget.querySelector("img");Ze(e,l)},onTouchCancel:t=>{t.currentTarget.style.transform="scale(1)"},onMouseDown:t=>{t.currentTarget.style.transform="scale(0.95)"},onMouseUp:t=>{t.currentTarget.style.transform="scale(1)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)"},children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:(()=>{const t=Se(e.coverImage,120);return console.log(`🖼️ Loading homepage image for "${e.title}":`,{original:e.coverImage,optimized:t,isDataUrl:e.coverImage?.startsWith("data:"),isNewImageSystem:e.coverImage?.includes("/api/images/serve/"),hostname:window.location.hostname}),t})(),alt:`${e.title} event cover`,loading:"lazy",onError:t=>{const l=parseInt(t.target.dataset.fallbackAttempt||"0"),c=2,f=t.target.src,L=e.id||e.title;if(window.failedImages||(window.failedImages=new Set),window.failedImages.has(f)){console.log("🛑 Global circuit breaker: Image URL previously failed, using placeholder immediately"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(l>=c){console.log(`🛑 Circuit breaker: Max fallback attempts (${c}) reached for ${L}, using placeholder`),window.failedImages.add(f),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}if(console.log(`❌ Homepage event image failed (attempt ${l+1}/${c}):`,L,"URL:",f),window.failedImages.add(f),f.includes("/api/images/serve/")&&(console.error("🚨 API image serving failed - check persistent storage pipeline"),console.error("📋 UUID extraction:",f.match(/\/api\/images\/serve\/([a-f0-9-]{36})/))),l===0){const ne=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/images/placeholder`;console.log("🔄 Trying dashboard placeholder:",ne),t.target.src=ne,t.target.dataset.fallbackAttempt="1";return}else if(l===1){console.log("🔄 Using final inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError");return}console.log("🔄 Safety fallback: Using inline SVG placeholder"),t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K",t.target.dataset.fallbackAttempt="final",t.target.removeAttribute("onError")},onLoad:t=>{delete t.target.dataset.fallbackAttempt,console.log("✅ Homepage event image loaded successfully:",e.title,t.target.src),t.target.style.backgroundColor="transparent"},style:{position:"absolute",left:"4px",top:"4px",width:"112px",height:"112px",borderRadius:"17px",objectFit:"cover",backgroundColor:"#2a2a2a",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",boxShadow:"none",pointerEvents:"none"}})}),n.jsxs("div",{style:{display:"flex",width:"calc(100% - 130px)",padding:"2px 2px 2px 4px",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",position:"absolute",left:"126px",top:"2px",height:"120px",boxSizing:"border-box"},children:[n.jsxs("div",{style:{width:"100%",minHeight:"84px",height:"auto",display:"flex",flexDirection:"column",alignSelf:"stretch",flex:"1 1 auto"},children:[n.jsx("h3",{style:{fontFamily:"Inter",fontWeight:"700",fontSize:"16px",lineHeight:"1.25",textAlign:"left",color:"#FFFFFF",width:"100%",minHeight:"20px",height:"auto",margin:"0 0 4px 0",padding:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.title}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 0px 0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h-3V7h2v4h3v2Z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.7)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.date})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"6px",padding:"0px 2px"},children:[n.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",style:{color:"rgba(255, 255, 255, 0.7)"},children:n.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",fill:"currentColor"})}),n.jsx("span",{style:{fontFamily:"Inter",fontWeight:"300",fontSize:"12px",lineHeight:"1.4",textAlign:"left",color:"rgba(255, 255, 255, 0.65)",width:"100%",height:"14px",margin:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.location})]})]}),n.jsx("div",{style:{width:"100%",height:"32px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end",gap:"6px",padding:"0px 2px 0px 0px",position:"absolute",bottom:"4px",left:"0px"},children:e.isRealEvent&&e.hasTicketLink?n.jsx("button",{onClick:t=>{t.stopPropagation(),console.log(`🎫 Opening ticket link for ${e.title}:`,e.ticketsUrl),window.open(e.ticketsUrl,"_blank","noopener,noreferrer")},style:{background:"rgba(23, 23, 23, 0.8)",borderRadius:"46px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"12px",padding:"16px 15px",width:"calc(100% - 4px)",height:"32px",border:"none",cursor:"pointer",fontFamily:"Inter",fontWeight:"500",fontSize:"14px",lineHeight:"1.21",textAlign:"center",color:"#FFFFFF",transition:"all 0.2s ease",transform:"scale(1)",boxSizing:"border-box"},onMouseEnter:t=>{t.currentTarget.style.transform="scale(1.02)",t.currentTarget.style.background="rgba(23, 23, 23, 0.9)"},onMouseLeave:t=>{t.currentTarget.style.transform="scale(1)",t.currentTarget.style.background="rgba(23, 23, 23, 0.8)"},children:e.buttonText||"View Event"}):null})]})]})},`homepage-${e.id}`)):j&&de.length>0?null:n.jsxs("div",{style:{display:"flex",width:"100%",height:"200px",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"16px",color:"#FFF",fontFamily:"Inter",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:"18px",fontWeight:"600",opacity:.8},children:j?"No upcoming events":"No past events"}),n.jsx("button",{type:"button","aria-label":"View Past Events",onClick:()=>ce(!1),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",minHeight:"44px",borderRadius:"14px",fontFamily:"Inter",fontSize:"14px",fontWeight:600,color:"#FFF",background:"rgba(22, 22, 22, 0.60)",border:"1px solid rgba(255, 255, 255, 0.12)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",boxSizing:"border-box",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(22, 22, 22, 0.60)"},onTouchStart:e=>{e.currentTarget.style.transform="scale(0.98)"},onTouchEnd:e=>{e.currentTarget.style.transform="scale(1)"},children:"View Past Events"})]})}),!ue&&ge.length>3&&n.jsx("div",{className:"mobile-event-cards-overlay","aria-hidden":"true"})]}),ge.length>3&&n.jsx("div",{className:`mobile-expand-handle ${ue?"expanded":""}`,onClick:Oe,role:"button",tabIndex:0,"aria-label":ue?"Show fewer events":"Show more events","aria-expanded":ue,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Oe())},style:{opacity:1,visibility:"visible"},children:n.jsx("div",{className:`mobile-expand-chevron ${ue?"expanded":""}`,"aria-hidden":"true"})})]})]}),n.jsxs("section",{"aria-labelledby":"follow-us-section-title",style:{width:"100%",marginTop:"2px",marginBottom:"4px",opacity:he?1:0,transform:he?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"150ms"},children:[n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",marginBottom:"8px",margin:"0 auto 8px auto",boxSizing:"border-box"},children:n.jsx("h2",{id:"follow-us-section-title",style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"800",lineHeight:"1.2",margin:0,textAlign:"left"},children:"Follow Us"})}),n.jsxs("article",{style:{width:"min(344px, calc(100vw - 4px))",height:"200px",position:"relative",flexShrink:0,margin:"0 auto",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)",borderRadius:"20px",overflow:"hidden"},"aria-label":"Henry Fong live performance video",children:[n.jsxs("div",{style:{position:"absolute",left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden"},children:[n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",transform:"translateZ(0)",willChange:"auto"},children:b?rt:W?n.jsx("iframe",{src:at,title:"Henry Fong YouTube Video - Adaptive Quality",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",loading:"lazy",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",transform:"translateZ(0)",pointerEvents:"none",border:"none",opacity:1,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"}}):n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",border:"none",transform:"translateZ(0)"}})}),n.jsx("div",{style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)",borderRadius:"20px",zIndex:1,transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto",pointerEvents:"none"}})]}),n.jsxs("div",{style:{position:"absolute",left:"0px",bottom:"16px",display:"flex",width:"100%",height:"40px",padding:"8px 16px",justifyContent:"space-between",alignItems:"flex-end",gap:"12px",zIndex:2,boxSizing:"border-box",pointerEvents:"none",transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"auto"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"2px",flex:"1"},children:[n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"18px",fontWeight:"800",lineHeight:"1.1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Watch on YouTube"}),n.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"9px",fontWeight:"200",lineHeight:"normal"},children:"Henry Fong full set live"})]}),n.jsx("div",{onClick:e=>{e.stopPropagation(),window.open("https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx","_blank")},style:{display:"flex",minWidth:"90px",height:"36px",justifyContent:"center",alignItems:"center",pointerEvents:"auto",borderRadius:"18px",background:"rgba(38, 38, 38, 0.80)",cursor:"pointer",transition:"all 0.3s ease",transform:"scale(1)",boxSizing:"border-box"},onTouchStart:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.background="rgba(58, 58, 58, 0.90)"},onTouchEnd:e=>{e.stopPropagation(),e.currentTarget.style.transform="scale(1)",e.currentTarget.style.background="rgba(38, 38, 38, 0.80)"},children:n.jsx("span",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"11px",fontWeight:"600",lineHeight:"normal"},children:"Watch now"})})]})]})]}),n.jsx("section",{style:{width:"100%",padding:"0",margin:"0",marginTop:"8px",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",opacity:he?1:0,transform:he?"translateY(0)":"translateY(16px)",transition:"opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)",transitionDelay:"300ms"},children:n.jsx("div",{style:{width:"min(344px, calc(100vw - 4px))",display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto"},children:n.jsx(ut,{})})})]}),n.jsx("footer",{style:{width:"100%",padding:"40px 16px 20px",textAlign:"center",background:"transparent",display:h?"none":"block",visibility:h?"hidden":"visible"},children:n.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter",fontSize:"12px",fontWeight:"300",lineHeight:"1.5"},children:"© 2024 BOUNCE2BOUNCE. All rights reserved."})})]}),!g&&n.jsx(ht,{contentRef:Ie,viewportContext:Ne,onStateChange:e=>{const{drawerExpanded:s,drawerFullyClosed:t}=e;console.log("Drawer state changed:",e,`status=${t?"fullyClosed":s?"expanded":"collapsed"}`)}})]}),X&&n.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.7)",backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",zIndex:10001,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"20px",boxSizing:"border-box",overflow:"hidden",overscrollBehavior:"none",touchAction:"none",animation:"expandedImageFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"},onClick:Fe,onTouchMove:e=>{e.preventDefault(),e.stopPropagation()},onWheel:e=>{e.preventDefault(),e.stopPropagation()},children:[n.jsx("div",{style:{width:"min(80vw, 80vh)",height:"min(80vw, 80vh)",aspectRatio:"1 / 1",borderRadius:"20px",overflow:"hidden",marginBottom:"20px",animation:"expandedImageScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.6)",border:"1px solid rgba(255, 255, 255, 0.1)",cursor:"pointer"},onClick:e=>e.stopPropagation(),children:n.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:X.imageUrl,alt:X.title,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})}),n.jsxs("div",{style:{display:"flex",gap:"16px",animation:"expandedButtonsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both"},onClick:e=>e.stopPropagation(),children:[n.jsx("button",{onClick:()=>{navigator.share?navigator.share({title:X.title,text:`Check out this event: ${X.title}`,url:window.location.href}):(navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!"))},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"80px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:"Share"}),X.isRealEvent&&X.hasTicketLink?n.jsx("button",{onClick:()=>{console.log(`🎫 Opening ticket link from modal for ${X.title}:`,X.ticketsUrl),window.open(X.ticketsUrl,"_blank","noopener,noreferrer"),Fe()},style:{background:"rgba(15, 15, 15, 0.95)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"25px",padding:"12px 24px",color:"#FFFFFF",fontFamily:"Inter",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",minWidth:"100px",height:"44px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",textShadow:"0 1px 2px rgba(0, 0, 0, 0.5)"},onTouchStart:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(0.95)",e.currentTarget.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"},onTouchEnd:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(35, 35, 35, 0.98)",e.currentTarget.style.transform="scale(1.05)",e.currentTarget.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"},onMouseLeave:e=>{e.currentTarget.style.background="rgba(15, 15, 15, 0.95)",e.currentTarget.style.transform="scale(1)",e.currentTarget.style.boxShadow="0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"},children:X.buttonText||"View Event"}):null]})]})]})};export{At as default};
