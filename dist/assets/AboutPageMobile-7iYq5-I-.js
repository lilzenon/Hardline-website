import{j as i}from"./index-DMwlMjRa.js";import{b as c}from"./vendor-ViNJc2wV.js";import{u as U,a as D,M as T}from"./useNavHeight-Ccp0ycEQ.js";import{M as Y}from"./AboutPage-CFCajPg2.js";import"./SocialMediaButtons-D_kZqjt0.js";import"./DesktopNavigationPills-QRNFXcZr.js";const _=()=>{const[E,S]=c.useState(""),[z,x]=c.useState(!0),[k,w]=c.useState(null),[C,f]=c.useState([]),y=c.useRef(null),B=U(),v=c.useRef({startY:0,lastY:0}),F=Math.max(B||0,0)+12,[W,j]=c.useState(0),{scrollY:A}=D(y.current,{threshold:50,throttleMs:200,passive:!0});c.useEffect(()=>{const t="https://b2b.click",n=`${t}/about`,a="About BOUNCE2BOUNCE | Electronic Music Events and Experiences",e="Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.",r="about bounce2bounce, live music events, edm collective, concerts, event platform, artist community",s=`${t}/images/og-image.png`,o=(h,m,u)=>{let g=document.head.querySelector(`meta[${h}="${m}"]`);g||(g=document.createElement("meta"),g.setAttribute(h,m),document.head.appendChild(g)),g.setAttribute("content",u)},l=(h,m)=>{let u=document.head.querySelector(`link[rel="${h}"]`);u||(u=document.createElement("link"),u.setAttribute("rel",h),document.head.appendChild(u)),u.setAttribute("href",m)};document.title=a,o("name","description",e),o("name","keywords",r),o("name","robots","index,follow"),o("property","og:type","website"),o("property","og:site_name","BOUNCE2BOUNCE"),o("property","og:title",a),o("property","og:description",e),o("property","og:url",n),o("property","og:image",s),o("name","twitter:card","summary_large_image"),o("name","twitter:title",a),o("name","twitter:description",e),o("name","twitter:image",s),o("name","twitter:site","@bounce2bounce"),l("canonical",n);const b="ld-json-about",d=document.getElementById(b);d&&d.remove();const p=document.createElement("script");p.type="application/ld+json",p.id=b,p.text=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization",name:"BOUNCE2BOUNCE",url:t,logo:`${t}/images/og-image.png`},{"@type":"AboutPage",name:"About BOUNCE2BOUNCE",url:n,description:e,isPartOf:{"@type":"WebSite",name:"BOUNCE2BOUNCE",url:t},primaryImageOfPage:{"@type":"ImageObject",url:s}}]}),document.head.appendChild(p)},[]),c.useEffect(()=>{const t=()=>{j(n=>n+1)};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),()=>{window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t)}},[]),c.useEffect(()=>{const t=y.current;if(!t)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const e=s=>{const o=s.touches&&s.touches[0];o&&(v.current.startY=o.clientY,v.current.lastY=o.clientY)},r=s=>{const o=s.touches&&s.touches[0];if(!o)return;const l=o.clientY-v.current.lastY;v.current.lastY=o.clientY;const b=t.scrollTop<=0,d=t.scrollTop+t.clientHeight>=t.scrollHeight-1;(b&&l>0||d&&l<0)&&s.preventDefault()};return t.addEventListener("touchstart",e,{passive:!0}),t.addEventListener("touchmove",r,{passive:!1}),()=>{t.removeEventListener("touchstart",e),t.removeEventListener("touchmove",r)}},[]),c.useEffect(()=>{O(),M()},[]);const O=async()=>{try{x(!0),w(null);const n=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const a=await fetch(`${n}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const e=await a.json();if(e.success&&e.data)S(e.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(t){console.error("❌ Error fetching About page content:",t),w(t.message)}finally{x(!1)}},I=t=>{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",a=t?.url||t?.src||t?.image_url||t?.file_url||t?.path||t?.imagePath||"",e=typeof a=="string"?a:a?.url||"";if(e&&/^https?:\/\//i.test(e))return{...t,url:e};if(e&&/^\/?api\/images\/serve\//i.test(e))return{...t,url:`${n}/${e.replace(/^\//,"")}`};if(e&&/^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(e)){let r=e.replace(/^\/?data\/static\/uploads\//,"/static/uploads/");return r.startsWith("/")||(r=`/${r}`),{...t,url:`${n}${r}`}}return{...t,url:e}},M=async()=>{try{const n=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",a=`cb=${Date.now()}`,e=await fetch(`${n}/api/settings/about/gallery/public?${a}`,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(e.ok){const r=await e.json();if(r.success&&Array.isArray(r.data)){const s=r.data.map(o=>{const l=I(o),b=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=m=>{if(!m)return m;const u=/^https?:\/\//i.test(m)?m:`${b}${m}`,g=u.includes("?")?"&":"?";return`${u}${g}${a}`},p=l&&(l.urls||l.srcSet)||{},h={thumbnail:d(p.thumbnail),small:d(p.small),medium:d(p.medium||l?.url),large:d(p.large),original:d(p.original||l?.url)};return{...l,urls:h,srcSet:h}});f(s)}else console.warn("Invalid gallery response format:",r),f([])}else console.warn("Failed to fetch gallery images:",e.status),f([])}catch(t){console.error("❌ Error fetching gallery images:",t),f([])}},N=t=>{if(!t)return[];const n=t.split(/\n\s*\n|\n/).filter(a=>a.trim());return n.map((a,e)=>i.jsx("p",{style:{marginBottom:e===n.length-1?"0":"20px"},children:a.trim()},e))},$=t=>{if(t==="/about"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=t};return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
        `}),i.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:i.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",position:"relative",background:"#000000",display:"flex",flexDirection:"column",touchAction:"pan-y",overscrollBehavior:"contain"},"aria-label":"Mobile about page content",children:[i.jsx(T,{currentPage:"about",scrollY:A,onNavigate:$}),i.jsxs("div",{ref:y,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:F,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none",touchAction:"pan-y",transform:"translateZ(0)",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"About page content",children:[i.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 0px 24px",boxSizing:"border-box"},children:[i.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"800",fontSize:"32px",lineHeight:"1.2em",marginBottom:"24px",textAlign:"center"},children:"About"}),i.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"400",fontSize:"16px",lineHeight:"1.5em",marginBottom:"0px",textAlign:"left",maxHeight:"min(56vh, 460px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none"},role:"region","aria-label":"About content",children:k?i.jsx("div",{role:"alert","aria-live":"polite",style:{marginTop:"16px",padding:"16px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"12px",textAlign:"center",color:"#FF4D4D",fontWeight:600,fontSize:"14px"},children:"Connection issue — please try again later."}):i.jsx(i.Fragment,{children:N(E)})})]}),i.jsxs("div",{style:{marginTop:"0px",marginBottom:"24px",padding:"0 16px"},children:[i.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:"32px",lineHeight:"1.3em",marginTop:"8px",marginBottom:"24px",textAlign:"center"},children:"Gallery"}),i.jsx(Y,{images:C,columns:{desktop:3,tablet:2,mobile:2},gap:12,onImageClick:t=>{console.log("Mobile image clicked:",t)}})]}),i.jsx("div",{style:{width:"100%",maxWidth:"430px",padding:"0 24px 80px 24px",boxSizing:"border-box",margin:"0 auto"}})]})]})})]})};export{_ as default};
