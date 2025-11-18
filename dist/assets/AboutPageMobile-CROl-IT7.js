import{D as E,j as o}from"./index-DJKZEUvV.js";import{b as l}from"./vendor-ViNJc2wV.js";import{u as $,a as z,M as Y}from"./useNavHeight-GlCl4Qjq.js";import{M as W}from"./AboutPage-BmgK3BFI.js";import{F as H}from"./Footer-DNXxd9u1.js";import{B as P}from"./Breadcrumb-DbqFw6z4.js";import"./SocialMediaButtons-EioQbKiU.js";import"./breadcrumbSchema-BG74ATTs.js";const Z=()=>{const[S,v]=l.useState(""),[R,x]=l.useState(!0),[F,C]=l.useState(null),[j,m]=l.useState([]),g=l.useRef(null),b=l.useRef(null),k=$(),h=l.useRef({startY:0,lastY:0}),B=Math.max(k||0,0)+12,[L,A]=l.useState(0),{scrollY:O}=z(g.current,{threshold:50,throttleMs:200,passive:!0});l.useEffect(()=>{const t="https://bounce2bounce.com",n=`${t}/about`,a=E?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",e=E?.about_page_og_image||`${t}/images/og-image.png`,i="ld-json-about",s=document.getElementById(i);s&&s.remove();const r=document.createElement("script");r.type="application/ld+json",r.id=i,r.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:n,description:a,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:e}}]}),document.head.appendChild(r)},[]),l.useEffect(()=>{const t=()=>{A(n=>n+1)};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),()=>{window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t)}},[]),l.useEffect(()=>{const t=g.current;if(!t)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const e=s=>{const r=s.touches&&s.touches[0];r&&(h.current.startY=r.clientY,h.current.lastY=r.clientY)},i=s=>{const r=s.touches&&s.touches[0];if(!r||b.current&&s.target&&b.current.contains(s.target))return;const c=r.clientY-h.current.lastY;h.current.lastY=r.clientY;const f=t.scrollTop<=0,d=t.scrollTop+t.clientHeight>=t.scrollHeight-1;(f&&c>0||d&&c<0)&&s.preventDefault()};return t.addEventListener("touchstart",e,{passive:!0}),t.addEventListener("touchmove",i,{passive:!1}),()=>{t.removeEventListener("touchstart",e),t.removeEventListener("touchmove",i)}},[]),l.useEffect(()=>{I(),M()},[]);const I=async()=>{try{x(!0),C(null);const n=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const a=await fetch(`${n}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const e=await a.json();if(e.success&&e.data)v(e.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),v(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{x(!1)}},N=t=>{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",a=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",e=typeof a=="string"?a:a?.url||"";if(e&&/^https?:\/\//i.test(e))return{...t,url:e};if(e&&/^\/?api\/images\/serve\//i.test(e))return{...t,url:`${n}/${e.replace(/^\//,"")}`};if(e&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(e)){let i=e.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return i.startsWith("/")||(i=`/${i}`),{...t,url:`${n}${i}`}}return{...t,url:e}},M=async()=>{try{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",a=`cb=${Date.now()}`,e=await fetch(`${n}/api/settings/about/gallery/public?${a}`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(e.ok){const i=await e.json();if(i.success&&Array.isArray(i.data)){const s=i.data.map(r=>{const c=N(r),f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=u=>{if(!u)return u;const w=/^https?:\/\//i.test(u)?u:`${f}${u}`,U=w.includes("?")?"&":"?";return`${w}${U}${a}`},p=c&&(c.urls||c.srcSet)||{},y={thumbnail:d(p.thumbnail),small:d(p.small),medium:d(p.medium||c?.url),large:d(p.large),original:d(p.original||c?.url)};return{...c,urls:y,srcSet:y}});m(s)}else console.warn("Invalid gallery response format:",i),m([])}else console.warn("Failed to fetch gallery images:",e.status),m([])}catch(t){console.error("❌ Error fetching gallery images:",t),m([])}},D=t=>{if(!t)return[];const n=t.split(/\n\s*\n|\n/).filter(a=>a.trim());return n.map((a,e)=>o.jsx("p",{style:{marginBottom:e===n.length-1?"0":"20px"},children:a.trim()},e))},T=t=>{if(t==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=t};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:o.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[o.jsx(Y,{currentPage:"about",scrollY:O,onNavigate:T}),o.jsxs("div",{ref:g,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:B,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[o.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{display:"none"},children:o.jsx(P,{items:[{name:"Home",url:"/"},{name:"About"}]})}),o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),o.jsx("div",{ref:b,className:"about-inner-scroll",style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(44vh, 380px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain"},role:"region","aria-label":"About content",children:F?o.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):o.jsx(o.Fragment,{children:D(S)})})]}),o.jsxs("div",{style:{width:"100%",maxWidth:"430px",margin:"0 auto",marginTop:"0px",marginBottom:"24px",padding:"0 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),o.jsx(W,{images:j,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:t=>{console.log("Mobile image clicked:",t)}})]}),o.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"},children:o.jsx("div",{style:{display:"none"},children:o.jsx(H,{compact:!0})})})]})]})})]})};export{Z as default};
