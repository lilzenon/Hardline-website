import{j as o}from"./index-CM1kMICb.js";import{b as r}from"./vendor-ViNJc2wV.js";import{u as A,M as I}from"./MobileNavigation-ZwdXs138.js";import{M}from"./AboutPage-B2YT1qVY.js";import"./SocialMediaButtons-BrPE5lCS.js";import"./usePerformantResize-Fo8ytToz.js";import"./DesktopNavigation-CWDsXt27.js";const V=()=>{const[v,u]=r.useState(""),[U,h]=r.useState(!0),[w,b]=r.useState(null),[E,d]=r.useState([]),f=r.useRef(null),[z,C]=r.useState(0),{scrollY:F}=A(f.current,{threshold:20,throttleMs:100,passive:!0});r.useEffect(()=>{const e="https://b2b.click",a=`${e}/about`,n="About BOUNCE2BOUNCE | Live Music Events & Experiences",t="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",O="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",g=`${e}/images/og-image.png`,i=(l,p,s)=>{let c=document.head.querySelector(`meta[${l}="${p}"]`);c||(c=document.createElement("meta"),c.setAttribute(l,p),document.head.appendChild(c)),c.setAttribute("content",s)},N=(l,p)=>{let s=document.head.querySelector(`link[rel="${l}"]`);s||(s=document.createElement("link"),s.setAttribute("rel",l),document.head.appendChild(s)),s.setAttribute("href",p)};document.title=n,i("name","description",t),i("name","keywords",O),i("name","robots","index,follow"),i("property","og:type","website"),i("property","og:site_name","BOUNCE2BOUNCE"),i("property","og:title",n),i("property","og:description",t),i("property","og:url",a),i("property","og:image",g),i("name","twitter:card","summary_large_image"),i("name","twitter:title",n),i("name","twitter:description",t),i("name","twitter:image",g),i("name","twitter:site","@bounce2bounce"),N("canonical",a);const x="ld-json-about",y=document.getElementById(x);y&&y.remove();const m=document.createElement("script");m.type="application/ld+json",m.id=x,m.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:a,description:t,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:g}}]}),document.head.appendChild(m)},[]),r.useEffect(()=>{const e=()=>{C(a=>a+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),r.useEffect(()=>{S(),B()},[]);const S=async()=>{try{h(!0),b(null);const a=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const n=await fetch(`${a}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const t=await n.json();if(t.success&&t.data)u(t.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),b(e.message),u(`Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. We connect people with the most exciting opportunities in their area.

Our platform brings together event organizers, brands, and participants to create meaningful connections and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.

Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, win amazing prizes, and connect with like-minded individuals.`)}finally{h(!1)}},B=async()=>{try{const a=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=await fetch(`${a}/api/settings/about/gallery/public`,{method:"GET",headers:{"Content-Type":"application/json"}});if(n.ok){const t=await n.json();t.success&&Array.isArray(t.data)?d(t.data):(console.warn("Invalid gallery response format:",t),d([]))}else console.warn("Failed to fetch gallery images:",n.status),d([])}catch(e){console.error("❌ Error fetching gallery images:",e),d([])}},j=e=>{if(!e)return[];const a=e.split(/\n\s*\n|\n/).filter(n=>n.trim());return a.map((n,t)=>o.jsx("p",{style:{marginBottom:t===a.length-1?"0":"20px"},children:n.trim()},t))},k=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:o.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[o.jsx(I,{currentPage:"about",scrollY:F,onNavigate:k}),o.jsxs("div",{ref:f,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",padding:"0px",boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth"},role:"main","aria-label":"About page content",children:[o.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"8px 24px 0px 24px",boxSizing:"border-box"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),o.jsxs("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left"},children:[j(v),w&&o.jsx("div",{style:{marginTop:"16px",padding:"12px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"8px",fontSize:"12px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})]}),o.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),o.jsx(M,{images:E,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),o.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{V as default};
