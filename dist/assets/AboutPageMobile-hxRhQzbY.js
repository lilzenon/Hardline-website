import{D as k,j as t}from"./index-zAuBC15a.js";import{b as l}from"./vendor-ViNJc2wV.js";import{u as _,a as D}from"./useNavHeight-DaSypkLA.js";import{M as $}from"./MobileNavigation-DRE_lVXH.js";import{i as Y,r as z,M as L}from"./AboutPage-Bfm8sqdj.js";import{F as R}from"./Footer-UX3EAspA.js";import{B as W}from"./Breadcrumb-CuEsXs4t.js";import"./SocialMediaButtons-gOyFkSnt.js";import"./shopService-D3Jzy0Uo.js";import"./breadcrumbSchema-BG74ATTs.js";const oe=()=>{const[b,v]=l.useState(()=>{try{if(typeof window<"u")return localStorage.getItem("b2b_about_content")||""}catch{}return""}),[P,y]=l.useState(!0),[w,j]=l.useState(null),[p,m]=l.useState(()=>{try{if(typeof window<"u"){const e=localStorage.getItem("b2b_gallery_images");return e?JSON.parse(e):[]}}catch{}return[]}),f=l.useRef(null),x=l.useRef(null),C=_(),h=l.useRef({startY:0,lastY:0}),N=Math.max(C||0,0),[G,F]=l.useState(0),{scrollY:O}=D(f.current,{threshold:50,throttleMs:200,passive:!0});l.useEffect(()=>{const e="https://bounce2bounce.com",n=`${e}/about`,r=k?.about_page_description||"Learn about BOUNCE2BOUNCE - NJ's premiere EDM collective curating exclusive live music events.",o=k?.about_page_og_image||`${e}/images/og-image.png`,s="ld-json-about",i=document.getElementById(s);i&&i.remove();const a=document.createElement("script");a.type="application/ld+json",a.id=s,a.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:n,description:r,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:o}}]}),document.head.appendChild(a)},[]),l.useEffect(()=>{const e=()=>{F(n=>n+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),l.useEffect(()=>{const e=f.current;if(!e)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const o=i=>{const a=i.touches&&i.touches[0];a&&(h.current.startY=a.clientY,h.current.lastY=a.clientY)},s=i=>{const a=i.touches&&i.touches[0];if(!a||x.current&&i.target&&x.current.contains(i.target))return;const g=a.clientY-h.current.lastY;h.current.lastY=a.clientY;const c=e.scrollTop<=0,d=e.scrollTop+e.clientHeight>=e.scrollHeight-1;(c&&g>0||d&&g<0)&&i.preventDefault()};return e.addEventListener("touchstart",o,{passive:!0}),e.addEventListener("touchmove",s,{passive:!1}),()=>{e.removeEventListener("touchstart",o),e.removeEventListener("touchmove",s)}},[]),l.useEffect(()=>{I(),B()},[]),l.useEffect(()=>(Y(p),()=>{z()}),[p]);const I=async()=>{try{y(!0),j(null),console.log("🔍 Fetching About page content from local proxy...");const e=await fetch("/api/settings/about",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const n=await e.json();if(n.success&&n.data){v(n.data.content);try{localStorage.setItem("b2b_about_content",n.data.content)}catch{}console.log("✅ About page content loaded successfully")}else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),b||(v(`BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`),console.log("✅ Using static fallback content for About page (API blocked or unavailable)"))}finally{y(!1)}},A=e=>{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",r=e?.url||e?.src||e?.image_url||e?.file_url||e?.path||e?.imagePath||"",o=typeof r=="string"?r:r?.url||"";if(o&&/^https?:\/\//i.test(o))return{...e,url:o};if(o&&/^\/?api\/images\/serve\//i.test(o))return{...e,url:`${n}/${o.replace(/^\//,"")}`};if(o&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(o)){let s=o.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return s.startsWith("/")||(s=`/${s}`),{...e,url:`${n}${s}`}}return{...e,url:o}},B=async()=>{try{const e=`cb=${Date.now()}`,n=`/api/settings/about/gallery/public?${e}`;console.log("🔍 Mobile: Fetching gallery from local proxy:",n);const r=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(r.ok){const o=await r.json();if(o.success&&Array.isArray(o.data)){const s=o.data.map(i=>{const a=A(i),g=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=u=>{if(!u)return u;const S=/^https?:\/\//i.test(u)?u:`${g}${u}`,U=S.includes("?")?"&":"?";return`${S}${U}${e}`},d=a&&(a.urls||a.srcSet)||{},E={thumbnail:c(d.thumbnail),small:c(d.small),medium:c(d.medium||a?.url),large:c(d.large),original:c(d.original||a?.url)};return{...a,urls:E,srcSet:E}});m(s);try{localStorage.setItem("b2b_gallery_images",JSON.stringify(s))}catch{}}else console.warn("Invalid gallery response format:",o),m([])}else console.warn("Failed to fetch gallery images:",r.status),m([])}catch(e){console.error("❌ Error fetching gallery images:",e),m([])}},M=e=>{if(!e)return[];const n=e.split(/\n\s*\n|\n/).filter(r=>r.trim());return n.map((r,o)=>t.jsx("p",{style:{marginBottom:o===n.length-1?"0":"20px"},children:r.trim()},o))},T=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          .skeleton-shimmer {
            background: linear-gradient(90deg, 
              rgba(22, 22, 22, 0.8) 25%, 
              rgba(56, 56, 56, 0.4) 50%, 
              rgba(22, 22, 22, 0.8) 75%
            );
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
          }

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
        `}),t.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:t.jsxs("div",{style:{width:"100%",height:"100%",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[t.jsx($,{currentPage:"about",scrollY:O,onNavigate:T}),t.jsxs("div",{ref:f,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:N,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",touchAction:"pan-y",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[t.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[t.jsx("div",{style:{marginTop:"0px",marginBottom:"16px"},children:t.jsx(W,{items:[{name:"Home",url:"/"},{name:"About"}]})}),t.jsx("h1",{style:{fontSize:"24px",fontWeight:600,marginBottom:"6px",letterSpacing:"-0.02em",textAlign:"left",color:"#FFFFFF",fontFamily:"Inter",paddingLeft:"0px"},children:"About"}),t.jsx("div",{ref:x,className:"about-inner-scroll",style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"17px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(44vh, 380px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain"},role:"region","aria-label":"About content",children:w?t.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):b?t.jsx(t.Fragment,{children:M(b)}):t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",marginTop:"4px"},children:[t.jsx("div",{className:"skeleton-shimmer",style:{width:"100%",height:"16px"}}),t.jsx("div",{className:"skeleton-shimmer",style:{width:"90%",height:"16px"}}),t.jsx("div",{className:"skeleton-shimmer",style:{width:"95%",height:"16px"}}),t.jsx("div",{className:"skeleton-shimmer",style:{width:"85%",height:"16px"}})]})})]}),t.jsx("div",{style:{width:"100%",maxWidth:"430px",margin:"0 auto",marginTop:"24px",marginBottom:"0px",padding:"0 24px",boxSizing:"border-box"},children:p.length===0&&!w?t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px"},children:[1,2,3,4].map(e=>t.jsx("div",{className:"skeleton-shimmer",style:{width:"100%",paddingTop:"100%",borderRadius:"12px"}},e))}):t.jsx(L,{images:p,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})}),t.jsx(R,{compact:!0})]})]})})]})};export{oe as default};
