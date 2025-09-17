import{j as t}from"./index-DwpvOoei.js";import{b as a}from"./vendor-ViNJc2wV.js";import{u as w,M as y}from"./MobileNavigation-bMOlAQhw.js";import{M as F}from"./AboutPage-BfFa8uBr.js";import"./SocialMediaButtons-BrrCz3Y-.js";import"./usePerformantResize-Fo8ytToz.js";const z=()=>{const[p,s]=a.useState(""),[E,l]=a.useState(!0),[m,c]=a.useState(null),[h,r]=a.useState([]),d=a.useRef(null),[S,g]=a.useState(0),{scrollY:u}=w(d.current,{threshold:20,throttleMs:100,passive:!0});a.useEffect(()=>{const e=()=>{g(i=>i+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),a.useEffect(()=>{b(),f()},[]);const b=async()=>{try{l(!0),c(null);const i=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const o=await fetch(`${i}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const n=await o.json();if(n.success&&n.data)s(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),c(e.message),s(`Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. We connect people with the most exciting opportunities in their area.

Our platform brings together event organizers, brands, and participants to create meaningful connections and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.

Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, win amazing prizes, and connect with like-minded individuals.`)}finally{l(!1)}},f=async()=>{try{const i=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",o=await fetch(`${i}/api/settings/about/gallery/public`,{method:"GET",headers:{"Content-Type":"application/json"}});if(o.ok){const n=await o.json();n.success&&Array.isArray(n.data)?r(n.data):(console.warn("Invalid gallery response format:",n),r([]))}else console.warn("Failed to fetch gallery images:",o.status),r([])}catch(e){console.error("❌ Error fetching gallery images:",e),r([])}},x=e=>{if(!e)return[];const i=e.split(/\n\s*\n|\n/).filter(o=>o.trim());return i.map((o,n)=>t.jsx("p",{style:{marginBottom:n===i.length-1?"0":"20px"},children:o.trim()},n))},v=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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

          /* Scrolling optimizations */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
          }

          /* Ensure content is scrollable */
          .mobile-content-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar for cleaner look */
          }

          .mobile-content-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}),t.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:t.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[t.jsx(y,{currentPage:"about",scrollY:u,onNavigate:v}),t.jsxs("div",{ref:d,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",padding:"0px",boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth"},role:"main","aria-label":"About page content",children:[t.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"40px 24px 0px 24px",boxSizing:"border-box"},children:[t.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),t.jsxs("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left"},children:[x(p),m&&t.jsx("div",{style:{marginTop:"16px",padding:"12px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"8px",fontSize:"12px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})]}),t.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[t.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"24px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),t.jsx(F,{images:h,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),t.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{z as default};
