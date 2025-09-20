import{j as a}from"./index-3I2J3uCa.js";import{b as l}from"./vendor-ViNJc2wV.js";import{u as U,a as $,M as D}from"./useNavHeight-oo9b5dJq.js";import{M as z}from"./AboutPage-80gVFtPf.js";import"./SocialMediaButtons-DW-rV2ls.js";import"./DesktopNavigationPills-Dl6XJlIQ.js";const Y=()=>{const[w,E]=l.useState(""),[W,v]=l.useState(!0),[k,y]=l.useState(null),[C,g]=l.useState([]),x=l.useRef(null),F=U(),S=Math.max(F||0,0)+12,[T,B]=l.useState(0),{scrollY:j}=$(x.current,{threshold:50,throttleMs:200,passive:!0});l.useEffect(()=>{const e="https://b2b.click",i=`${e}/about`,n="About BOUNCE2BOUNCE | Electronic Music Events and Experiences",t="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",s="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",h=`${e}/images/og-image.png`,o=(r,b,m)=>{let u=document.head.querySelector(`meta[${r}="${b}"]`);u||(u=document.createElement("meta"),u.setAttribute(r,b),document.head.appendChild(u)),u.setAttribute("content",m)},f=(r,b)=>{let m=document.head.querySelector(`link[rel="${r}"]`);m||(m=document.createElement("link"),m.setAttribute("rel",r),document.head.appendChild(m)),m.setAttribute("href",b)};document.title=n,o("name","description",t),o("name","keywords",s),o("name","robots","index,follow"),o("property","og:type","website"),o("property","og:site_name","BOUNCE2BOUNCE"),o("property","og:title",n),o("property","og:description",t),o("property","og:url",i),o("property","og:image",h),o("name","twitter:card","summary_large_image"),o("name","twitter:title",n),o("name","twitter:description",t),o("name","twitter:image",h),o("name","twitter:site","@bounce2bounce"),f("canonical",i);const c="ld-json-about",d=document.getElementById(c);d&&d.remove();const p=document.createElement("script");p.type="application/ld+json",p.id=c,p.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:i,description:t,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:h}}]}),document.head.appendChild(p)},[]),l.useEffect(()=>{const e=()=>{B(i=>i+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),l.useEffect(()=>{A(),N()},[]);const A=async()=>{try{v(!0),y(null);const i=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const n=await fetch(`${i}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const t=await n.json();if(t.success&&t.data)E(t.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),y(e.message)}finally{v(!1)}},O=e=>{const i=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=e?.url||e?.src||e?.image_url||e?.file_url||e?.path||e?.imagePath||"",t=typeof n=="string"?n:n?.url||"";if(t&&/^https?:\/\//i.test(t))return{...e,url:t};if(t&&/^\/?api\/images\/serve\//i.test(t))return{...e,url:`${i}/${t.replace(/^\//,"")}`};if(t&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(t)){let s=t.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return s.startsWith("/")||(s=`/${s}`),{...e,url:`${i}${s}`}}return{...e,url:t}},N=async()=>{try{const i=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=await fetch(`${i}/api/settings/about/gallery/public`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const t=await n.json();if(t.success&&Array.isArray(t.data)){const s=t.data.map(h=>{const o=O(h),f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=r=>r&&(/^https?:\/\//i.test(r)?r:`${f}${r}`),d=o&&(o.urls||o.srcSet)||{},p={thumbnail:c(d.thumbnail),small:c(d.small),medium:c(d.medium||o?.url),large:c(d.large),original:c(d.original||o?.url)};return{...o,urls:p,srcSet:p}});g(s)}else console.warn("Invalid gallery response format:",t),g([])}else console.warn("Failed to fetch gallery images:",n.status),g([])}catch(e){console.error("❌ Error fetching gallery images:",e),g([])}},M=e=>{if(!e)return[];const i=e.split(/\n\s*\n|\n/).filter(n=>n.trim());return i.map((n,t)=>a.jsx("p",{style:{marginBottom:t===i.length-1?"0":"20px"},children:n.trim()},t))},I=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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

          /* Scrolling optimizations */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
            overscroll-behavior-y: contain;
            overscroll-behavior-x: none;
            touch-action: pan-y;
            contain: layout style;
            will-change: auto;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          /* Ensure content is scrollable */
          .mobile-content-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar for cleaner look */
          }

          .mobile-content-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}),a.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:a.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[a.jsx(D,{currentPage:"about",scrollY:j,onNavigate:I}),a.jsxs("div",{ref:x,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:S,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none",touchAction:"pan-y",transform:"translateZ(0)",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[a.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(56vh, 460px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none"},role:"region","aria-label":"About content",children:k?a.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):a.jsx(a.Fragment,{children:M(w)})})]}),a.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),a.jsx(z,{images:C,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),a.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{Y as default};
