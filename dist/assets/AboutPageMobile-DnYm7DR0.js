import{D as E,j as o}from"./index-DZ1CW8I5.js";import{b as s}from"./vendor-ViNJc2wV.js";import{u as $,a as z,M as D}from"./useNavHeight-DK9rnvou.js";import{i as Y,r as W,M as L}from"./AboutPage-CLJB18ex.js";import{F as H}from"./Footer-NaS4yxRZ.js";import{B as R}from"./Breadcrumb-CvXNc36m.js";import"./SocialMediaButtons-C2jriZ5i.js";import"./breadcrumbSchema-BG74ATTs.js";const ee=()=>{const[S,x]=s.useState(""),[G,v]=s.useState(!0),[F,j]=s.useState(null),[g,p]=s.useState([]),b=s.useRef(null),f=s.useRef(null),C=$(),m=s.useRef({startY:0,lastY:0}),k=Math.max(C||0,0)+12,[P,A]=s.useState(0),{scrollY:O}=z(b.current,{threshold:50,throttleMs:200,passive:!0});s.useEffect(()=>{const e="https://bounce2bounce.com",n=`${e}/about`,r=E?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",t=E?.about_page_og_image||`${e}/images/og-image.png`,l="ld-json-about",i=document.getElementById(l);i&&i.remove();const a=document.createElement("script");a.type="application/ld+json",a.id=l,a.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:n,description:r,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:t}}]}),document.head.appendChild(a)},[]),s.useEffect(()=>{const e=()=>{A(n=>n+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),s.useEffect(()=>{const e=b.current;if(!e)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const t=i=>{const a=i.touches&&i.touches[0];a&&(m.current.startY=a.clientY,m.current.lastY=a.clientY)},l=i=>{const a=i.touches&&i.touches[0];if(!a||f.current&&i.target&&f.current.contains(i.target))return;const h=a.clientY-m.current.lastY;m.current.lastY=a.clientY;const c=e.scrollTop<=0,d=e.scrollTop+e.clientHeight>=e.scrollHeight-1;(c&&h>0||d&&h<0)&&i.preventDefault()};return e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("touchmove",l,{passive:!1}),()=>{e.removeEventListener("touchstart",t),e.removeEventListener("touchmove",l)}},[]),s.useEffect(()=>{B(),I()},[]),s.useEffect(()=>(Y(g),()=>{W()}),[g]);const B=async()=>{try{v(!0),j(null),console.log("🔍 Fetching About page content from local proxy...");const e=await fetch("/api/settings/about",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const n=await e.json();if(n.success&&n.data)x(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),x(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{v(!1)}},N=e=>{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",r=e?.url||e?.src||e?.image_url||e?.file_url||e?.path||e?.imagePath||"",t=typeof r=="string"?r:r?.url||"";if(t&&/^https?:\/\//i.test(t))return{...e,url:t};if(t&&/^\/?api\/images\/serve\//i.test(t))return{...e,url:`${n}/${t.replace(/^\//,"")}`};if(t&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(t)){let l=t.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return l.startsWith("/")||(l=`/${l}`),{...e,url:`${n}${l}`}}return{...e,url:t}},I=async()=>{try{const e=`cb=${Date.now()}`,n=`/api/settings/about/gallery/public?${e}`;console.log("🔍 Mobile: Fetching gallery from local proxy:",n);const r=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(r.ok){const t=await r.json();if(t.success&&Array.isArray(t.data)){const l=t.data.map(i=>{const a=N(i),h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=u=>{if(!u)return u;const w=/^https?:\/\//i.test(u)?u:`${h}${u}`,U=w.includes("?")?"&":"?";return`${w}${U}${e}`},d=a&&(a.urls||a.srcSet)||{},y={thumbnail:c(d.thumbnail),small:c(d.small),medium:c(d.medium||a?.url),large:c(d.large),original:c(d.original||a?.url)};return{...a,urls:y,srcSet:y}});p(l)}else console.warn("Invalid gallery response format:",t),p([])}else console.warn("Failed to fetch gallery images:",r.status),p([])}catch(e){console.error("❌ Error fetching gallery images:",e),p([])}},M=e=>{if(!e)return[];const n=e.split(/\n\s*\n|\n/).filter(r=>r.trim());return n.map((r,t)=>o.jsx("p",{style:{marginBottom:t===n.length-1?"0":"20px"},children:r.trim()},t))},T=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:o.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[o.jsx(D,{currentPage:"about",scrollY:O,onNavigate:T}),o.jsxs("div",{ref:b,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:k,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[o.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{display:"none"},children:o.jsx(R,{items:[{name:"Home",url:"/"},{name:"About"}]})}),o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),o.jsx("div",{ref:f,className:"about-inner-scroll",style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(44vh, 380px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain"},role:"region","aria-label":"About content",children:F?o.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):o.jsx(o.Fragment,{children:M(S)})})]}),o.jsxs("div",{style:{width:"100%",maxWidth:"430px",margin:"0 auto",marginTop:"0px",marginBottom:"24px",padding:"0 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),o.jsx(L,{images:g,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),o.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"},children:o.jsx("div",{style:{display:"none"},children:o.jsx(H,{compact:!0})})})]})]})})]})};export{ee as default};
