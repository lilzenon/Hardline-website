import{D as S,j as o}from"./index-EeJX89Yu.js";import{b as l}from"./vendor-ViNJc2wV.js";import{u as $,a as z,M as Y}from"./useNavHeight-DUcf4isS.js";import{i as W,r as L,M as H}from"./AboutPage-Dgb_6AGj.js";import{F as R}from"./Footer-tU8ePnpY.js";import{B as G}from"./Breadcrumb-Auo5gmKZ.js";import"./SocialMediaButtons-BinU22__.js";import"./breadcrumbSchema-BG74ATTs.js";const et=()=>{const[F,x]=l.useState(""),[P,y]=l.useState(!0),[j,C]=l.useState(null),[g,m]=l.useState([]),b=l.useRef(null),f=l.useRef(null),k=$(),h=l.useRef({startY:0,lastY:0}),A=Math.max(k||0,0)+12,[_,B]=l.useState(0),{scrollY:O}=z(b.current,{threshold:50,throttleMs:200,passive:!0});l.useEffect(()=>{const t="https://bounce2bounce.com",n=`${t}/about`,r=S?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",e=S?.about_page_og_image||`${t}/images/og-image.png`,a="ld-json-about",s=document.getElementById(a);s&&s.remove();const i=document.createElement("script");i.type="application/ld+json",i.id=a,i.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:n,description:r,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:e}}]}),document.head.appendChild(i)},[]),l.useEffect(()=>{const t=()=>{B(n=>n+1)};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),()=>{window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t)}},[]),l.useEffect(()=>{const t=b.current;if(!t)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const e=s=>{const i=s.touches&&s.touches[0];i&&(h.current.startY=i.clientY,h.current.lastY=i.clientY)},a=s=>{const i=s.touches&&s.touches[0];if(!i||f.current&&s.target&&f.current.contains(s.target))return;const c=i.clientY-h.current.lastY;h.current.lastY=i.clientY;const v=t.scrollTop<=0,d=t.scrollTop+t.clientHeight>=t.scrollHeight-1;(v&&c>0||d&&c<0)&&s.preventDefault()};return t.addEventListener("touchstart",e,{passive:!0}),t.addEventListener("touchmove",a,{passive:!1}),()=>{t.removeEventListener("touchstart",e),t.removeEventListener("touchmove",a)}},[]),l.useEffect(()=>{N(),M()},[]),l.useEffect(()=>(W(g),()=>{L()}),[g]);const N=async()=>{try{y(!0),C(null),console.log("🔍 Fetching About page content from local proxy...");const t=await fetch("/api/settings/about",{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const n=await t.json();if(n.success&&n.data)x(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),x(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{y(!1)}},I=t=>{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",r=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",e=typeof r=="string"?r:r?.url||"";if(e&&/^https?:\/\//i.test(e))return{...t,url:e};if(e&&/^\/?api\/images\/serve\//i.test(e))return{...t,url:`${n}/${e.replace(/^\//,"")}`};if(e&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(e)){let a=e.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return a.startsWith("/")||(a=`/${a}`),{...t,url:`${n}${a}`}}return{...t,url:e}},M=async()=>{try{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",r=`cb=${Date.now()}`,e=await fetch(`${n}/api/settings/about/gallery/public?${r}`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(e.ok){const a=await e.json();if(a.success&&Array.isArray(a.data)){const s=a.data.map(i=>{const c=I(i),v=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=p=>{if(!p)return p;const E=/^https?:\/\//i.test(p)?p:`${v}${p}`,D=E.includes("?")?"&":"?";return`${E}${D}${r}`},u=c&&(c.urls||c.srcSet)||{},w={thumbnail:d(u.thumbnail),small:d(u.small),medium:d(u.medium||c?.url),large:d(u.large),original:d(u.original||c?.url)};return{...c,urls:w,srcSet:w}});m(s)}else console.warn("Invalid gallery response format:",a),m([])}else console.warn("Failed to fetch gallery images:",e.status),m([])}catch(t){console.error("❌ Error fetching gallery images:",t),m([])}},T=t=>{if(!t)return[];const n=t.split(/\n\s*\n|\n/).filter(r=>r.trim());return n.map((r,e)=>o.jsx("p",{style:{marginBottom:e===n.length-1?"0":"20px"},children:r.trim()},e))},U=t=>{if(t==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=t};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile nav item CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */

          /* Global mobile scroll behavior fixes to prevent pull-to-refresh */
          @media (max-width: 767px) {
            html, body {
              overscroll-behavior-y: contain !important;
              -webkit-overscroll-behavior-y: contain !important;
              overscroll-behavior-x: none !important;
              touch-action: pan-y !important;
            }
          }

          /* Scrolling optimizations (safe defaults to avoid scroll lock) */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;
          }

          /* Ensure content is scrollable */
          .mobile-content-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar for cleaner look */
          }

          .mobile-content-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}),o.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:o.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[o.jsx(Y,{currentPage:"about",scrollY:O,onNavigate:U}),o.jsxs("div",{ref:b,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:A,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[o.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{display:"none"},children:o.jsx(G,{items:[{name:"Home",url:"/"},{name:"About"}]})}),o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),o.jsx("div",{ref:f,className:"about-inner-scroll",style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(44vh, 380px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain"},role:"region","aria-label":"About content",children:j?o.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):o.jsx(o.Fragment,{children:T(F)})})]}),o.jsxs("div",{style:{width:"100%",maxWidth:"430px",margin:"0 auto",marginTop:"0px",marginBottom:"24px",padding:"0 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),o.jsx(H,{images:g,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:t=>{console.log("Mobile image clicked:",t)}})]}),o.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"},children:o.jsx("div",{style:{display:"none"},children:o.jsx(R,{compact:!0})})})]})]})})]})};export{et as default};
