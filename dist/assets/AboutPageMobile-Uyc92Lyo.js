import{D as E,j as n}from"./index-e9_cqlZb.js";import{b as s}from"./vendor-ViNJc2wV.js";import{u as $,a as D}from"./useNavHeight-DaSypkLA.js";import{M as Y}from"./MobileNavigation-BIXpCUew.js";import{i as z,r as L,M as W}from"./AboutPage-Dtf5VQW2.js";import{F as H}from"./Footer-Bcr14RY9.js";import{B as R}from"./Breadcrumb-Ki5xdUfb.js";import"./SocialMediaButtons-DI0WSyMj.js";import"./breadcrumbSchema-BG74ATTs.js";const et=()=>{const[S,v]=s.useState(""),[G,x]=s.useState(!0),[F,C]=s.useState(null),[g,p]=s.useState([]),b=s.useRef(null),f=s.useRef(null),j=$(),m=s.useRef({startY:0,lastY:0}),k=Math.max(j||0,0)+12,[P,A]=s.useState(0),{scrollY:O}=D(b.current,{threshold:50,throttleMs:200,passive:!0});s.useEffect(()=>{const t="https://bounce2bounce.com",o=`${t}/about`,r=E?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",e=E?.about_page_og_image||`${t}/images/og-image.png`,l="ld-json-about",i=document.getElementById(l);i&&i.remove();const a=document.createElement("script");a.type="application/ld+json",a.id=l,a.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:o,description:r,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:e}}]}),document.head.appendChild(a)},[]),s.useEffect(()=>{const t=()=>{A(o=>o+1)};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),()=>{window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t)}},[]),s.useEffect(()=>{const t=b.current;if(!t)return;const o=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(o)&&/Safari/.test(o)&&!/Chrome/.test(o)))return;const e=i=>{const a=i.touches&&i.touches[0];a&&(m.current.startY=a.clientY,m.current.lastY=a.clientY)},l=i=>{const a=i.touches&&i.touches[0];if(!a||f.current&&i.target&&f.current.contains(i.target))return;const h=a.clientY-m.current.lastY;m.current.lastY=a.clientY;const c=t.scrollTop<=0,u=t.scrollTop+t.clientHeight>=t.scrollHeight-1;(c&&h>0||u&&h<0)&&i.preventDefault()};return t.addEventListener("touchstart",e,{passive:!0}),t.addEventListener("touchmove",l,{passive:!1}),()=>{t.removeEventListener("touchstart",e),t.removeEventListener("touchmove",l)}},[]),s.useEffect(()=>{B(),I()},[]),s.useEffect(()=>(z(g),()=>{L()}),[g]);const B=async()=>{try{x(!0),C(null),console.log("🔍 Fetching About page content from local proxy...");const t=await fetch("/api/settings/about",{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const o=await t.json();if(o.success&&o.data)v(o.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),v(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)")}finally{x(!1)}},N=t=>{const o=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",r=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",e=typeof r=="string"?r:r?.url||"";if(e&&/^https?:\/\//i.test(e))return{...t,url:e};if(e&&/^\/?api\/images\/serve\//i.test(e))return{...t,url:`${o}/${e.replace(/^\//,"")}`};if(e&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(e)){let l=e.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return l.startsWith("/")||(l=`/${l}`),{...t,url:`${o}${l}`}}return{...t,url:e}},I=async()=>{try{const t=`cb=${Date.now()}`,o=`/api/settings/about/gallery/public?${t}`;console.log("🔍 Mobile: Fetching gallery from local proxy:",o);const r=await fetch(o,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(r.ok){const e=await r.json();if(e.success&&Array.isArray(e.data)){const l=e.data.map(i=>{const a=N(i),h=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=d=>{if(!d)return d;const w=/^https?:\/\//i.test(d)?d:`${h}${d}`,U=w.includes("?")?"&":"?";return`${w}${U}${t}`},u=a&&(a.urls||a.srcSet)||{},y={thumbnail:c(u.thumbnail),small:c(u.small),medium:c(u.medium||a?.url),large:c(u.large),original:c(u.original||a?.url)};return{...a,urls:y,srcSet:y}});p(l)}else console.warn("Invalid gallery response format:",e),p([])}else console.warn("Failed to fetch gallery images:",r.status),p([])}catch(t){console.error("❌ Error fetching gallery images:",t),p([])}},M=t=>{if(!t)return[];const o=t.split(/\n\s*\n|\n/).filter(r=>r.trim());return o.map((r,e)=>n.jsx("p",{style:{marginBottom:e===o.length-1?"0":"20px"},children:r.trim()},e))},T=t=>{if(t==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=t};return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
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
        `}),n.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:n.jsxs("div",{style:{width:"100%",height:"100%",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[n.jsx(Y,{currentPage:"about",scrollY:O,onNavigate:T}),n.jsxs("div",{ref:b,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:k,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[n.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[n.jsx("div",{style:{display:"none"},children:n.jsx(R,{items:[{name:"Home",url:"/"},{name:"About"}]})}),n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),n.jsx("div",{ref:f,className:"about-inner-scroll",style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(44vh, 380px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain"},role:"region","aria-label":"About content",children:F?n.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):n.jsx(n.Fragment,{children:M(S)})})]}),n.jsxs("div",{style:{width:"100%",maxWidth:"430px",margin:"0 auto",marginTop:"0px",marginBottom:"0px",padding:"0 24px",boxSizing:"border-box"},children:[n.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),n.jsx(W,{images:g,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:t=>{console.log("Mobile image clicked:",t)}})]}),n.jsx(H,{compact:!0})]})]})})]})};export{et as default};
