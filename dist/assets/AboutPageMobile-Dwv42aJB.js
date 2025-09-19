import{j as i}from"./index-BGPx4PR3.js";import{b as s}from"./vendor-ViNJc2wV.js";import{u as U,a as z,M as $}from"./useNavHeight-BA4e_3jp.js";import{M as D}from"./AboutPage-B2JsOEyF.js";import"./SocialMediaButtons-CuH2myYR.js";import"./DesktopNavigationPills-CJuBUgok.js";const _=()=>{const[E,v]=s.useState(""),[W,y]=s.useState(!0),[k,x]=s.useState(null),[C,g]=s.useState([]),w=s.useRef(null),B=U(),S=Math.max(B||0,0)+12,[T,F]=s.useState(0),{scrollY:j}=z(w.current,{threshold:50,throttleMs:200,passive:!0});s.useEffect(()=>{const e="https://b2b.click",a=`${e}/about`,n="About BOUNCE2BOUNCE | Live Music Events & Experiences",t="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",l="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",u=`${e}/images/og-image.png`,o=(r,b,p)=>{let h=document.head.querySelector(`meta[${r}="${b}"]`);h||(h=document.createElement("meta"),h.setAttribute(r,b),document.head.appendChild(h)),h.setAttribute("content",p)},f=(r,b)=>{let p=document.head.querySelector(`link[rel="${r}"]`);p||(p=document.createElement("link"),p.setAttribute("rel",r),document.head.appendChild(p)),p.setAttribute("href",b)};document.title=n,o("name","description",t),o("name","keywords",l),o("name","robots","index,follow"),o("property","og:type","website"),o("property","og:site_name","BOUNCE2BOUNCE"),o("property","og:title",n),o("property","og:description",t),o("property","og:url",a),o("property","og:image",u),o("name","twitter:card","summary_large_image"),o("name","twitter:title",n),o("name","twitter:description",t),o("name","twitter:image",u),o("name","twitter:site","@bounce2bounce"),f("canonical",a);const c="ld-json-about",d=document.getElementById(c);d&&d.remove();const m=document.createElement("script");m.type="application/ld+json",m.id=c,m.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:a,description:t,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:u}}]}),document.head.appendChild(m)},[]),s.useEffect(()=>{const e=()=>{F(a=>a+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),s.useEffect(()=>{N(),A()},[]);const N=async()=>{try{y(!0),x(null);const a=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const n=await fetch(`${a}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const t=await n.json();if(t.success&&t.data)v(t.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),x(e.message),v(`Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. We connect people with the most exciting opportunities in their area.

Our platform brings together event organizers, brands, and participants to create meaningful connections and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.

Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, win amazing prizes, and connect with like-minded individuals.`)}finally{y(!1)}},O=e=>{const a=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=e?.url||e?.src||e?.image_url||e?.file_url||e?.path||e?.imagePath||"",t=typeof n=="string"?n:n?.url||"";if(t&&/^https?:\/\//i.test(t))return{...e,url:t};if(t&&/^\/?api\/images\/serve\//i.test(t))return{...e,url:`${a}/${t.replace(/^\//,"")}`};if(t&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(t)){let l=t.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return l.startsWith("/")||(l=`/${l}`),{...e,url:`${a}${l}`}}return{...e,url:t}},A=async()=>{try{const a=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=await fetch(`${a}/api/settings/about/gallery/public`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const t=await n.json();if(t.success&&Array.isArray(t.data)){const l=t.data.map(u=>{const o=O(u),f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=r=>r&&(/^https?:\/\//i.test(r)?r:`${f}${r}`),d=o&&(o.urls||o.srcSet)||{},m={thumbnail:c(d.thumbnail),small:c(d.small),medium:c(d.medium||o?.url),large:c(d.large),original:c(d.original||o?.url)};return{...o,urls:m,srcSet:m}});g(l)}else console.warn("Invalid gallery response format:",t),g([])}else console.warn("Failed to fetch gallery images:",n.status),g([])}catch(e){console.error("❌ Error fetching gallery images:",e),g([])}},I=e=>{if(!e)return[];const a=e.split(/\n\s*\n|\n/).filter(n=>n.trim());return a.map((n,t)=>i.jsx("p",{style:{marginBottom:t===a.length-1?"0":"20px"},children:n.trim()},t))},M=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
        `}),i.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:i.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[i.jsx($,{currentPage:"about",scrollY:j,onNavigate:M}),i.jsxs("div",{ref:w,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:S,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none",touchAction:"pan-y",transform:"translateZ(0)",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[i.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[i.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),i.jsxs("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left"},children:[I(E),k&&i.jsx("div",{style:{marginTop:"16px",padding:"12px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"8px",fontSize:"12px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})]}),i.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[i.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),i.jsx(D,{images:C,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),i.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{_ as default};
