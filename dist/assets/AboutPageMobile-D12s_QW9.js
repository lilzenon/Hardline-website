import{j as a}from"./index-BdsxGBn1.js";import{b as s}from"./vendor-ViNJc2wV.js";import{u as U,a as z,M as $}from"./useNavHeight-BpYdKmso.js";import{M as D}from"./AboutPage-OdWMDAEw.js";import"./SocialMediaButtons-DRxm5Tmb.js";import"./DesktopNavigationPills-g3fsZVER.js";const _=()=>{const[E,x]=s.useState(""),[T,v]=s.useState(!0),[C,y]=s.useState(null),[S,g]=s.useState([]),w=s.useRef(null),k=U(),F=Math.max(k||0,0)+12,[W,B]=s.useState(0),{scrollY:j}=z(w.current,{threshold:50,throttleMs:200,passive:!0});s.useEffect(()=>{const e="https://b2b.click",i=`${e}/about`,n="About BOUNCE2BOUNCE | Live Music Events & Experiences",t="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",l="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",u=`${e}/images/og-image.png`,o=(r,b,p)=>{let h=document.head.querySelector(`meta[${r}="${b}"]`);h||(h=document.createElement("meta"),h.setAttribute(r,b),document.head.appendChild(h)),h.setAttribute("content",p)},f=(r,b)=>{let p=document.head.querySelector(`link[rel="${r}"]`);p||(p=document.createElement("link"),p.setAttribute("rel",r),document.head.appendChild(p)),p.setAttribute("href",b)};document.title=n,o("name","description",t),o("name","keywords",l),o("name","robots","index,follow"),o("property","og:type","website"),o("property","og:site_name","BOUNCE2BOUNCE"),o("property","og:title",n),o("property","og:description",t),o("property","og:url",i),o("property","og:image",u),o("name","twitter:card","summary_large_image"),o("name","twitter:title",n),o("name","twitter:description",t),o("name","twitter:image",u),o("name","twitter:site","@bounce2bounce"),f("canonical",i);const c="ld-json-about",d=document.getElementById(c);d&&d.remove();const m=document.createElement("script");m.type="application/ld+json",m.id=c,m.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:e,logo:`${e}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:i,description:t,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:e},primaryImageOfPage:{"@type":"ImageObject",url:u}}]}),document.head.appendChild(m)},[]),s.useEffect(()=>{const e=()=>{B(i=>i+1)};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),s.useEffect(()=>{N(),A()},[]);const N=async()=>{try{v(!0),y(null);const i=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const n=await fetch(`${i}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const t=await n.json();if(t.success&&t.data)x(t.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(e){console.error("❌ Error fetching About page content:",e),y(e.message),x(`Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. We connect people with the most exciting opportunities in their area.

Our platform brings together event organizers, brands, and participants to create meaningful connections and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.

Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, win amazing prizes, and connect with like-minded individuals.`)}finally{v(!1)}},O=e=>{const i=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=e?.url||e?.src||e?.image_url||e?.file_url||e?.path||e?.imagePath||"",t=typeof n=="string"?n:n?.url||"";if(t&&/^https?:\/\//i.test(t))return{...e,url:t};if(t&&/^\/?api\/images\/serve\//i.test(t))return{...e,url:`${i}/${t.replace(/^\//,"")}`};if(t&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(t)){let l=t.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return l.startsWith("/")||(l=`/${l}`),{...e,url:`${i}${l}`}}return{...e,url:t}},A=async()=>{try{const i=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",n=await fetch(`${i}/api/settings/about/gallery/public`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const t=await n.json();if(t.success&&Array.isArray(t.data)){const l=t.data.map(u=>{const o=O(u),f=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",c=r=>r&&(/^https?:\/\//i.test(r)?r:`${f}${r}`),d=o&&(o.urls||o.srcSet)||{},m={thumbnail:c(d.thumbnail),small:c(d.small),medium:c(d.medium||o?.url),large:c(d.large),original:c(d.original||o?.url)};return{...o,urls:m,srcSet:m}});g(l)}else console.warn("Invalid gallery response format:",t),g([])}else console.warn("Failed to fetch gallery images:",n.status),g([])}catch(e){console.error("❌ Error fetching gallery images:",e),g([])}},I=e=>{if(!e)return[];const i=e.split(/\n\s*\n|\n/).filter(n=>n.trim());return i.map((n,t)=>a.jsx("p",{style:{marginBottom:t===i.length-1?"0":"20px"},children:n.trim()},t))},M=e=>{if(e==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
        `}),a.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:a.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[a.jsx($,{currentPage:"about",scrollY:j,onNavigate:M}),a.jsxs("div",{ref:w,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:F,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth"},role:"main","aria-label":"About page content",children:[a.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),a.jsxs("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left"},children:[I(E),C&&a.jsx("div",{style:{marginTop:"16px",padding:"12px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"8px",fontSize:"12px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]})]}),a.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[a.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),a.jsx(D,{images:S,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:e=>{console.log("Mobile image clicked:",e)}})]}),a.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{_ as default};
