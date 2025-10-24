import{j as r}from"./index-MUNeEoaI.js";import{b as c}from"./vendor-ViNJc2wV.js";import{p as q,b as B,t as I}from"./sanitizer-BX97C1dn.js";import{u as F,a as S,M as A}from"./useNavHeight-BeV49mE_.js";import"./SocialMediaButtons-DbItAbTc.js";const H=()=>{const b=c.useRef(null),v=F(),x=Math.max(v||0,0)+12,u=c.useRef({startY:0,lastY:0}),{scrollY:y}=S(b.current,{threshold:50,throttleMs:200,passive:!0});c.useEffect(()=>{const e="https://b2b.click",o=`${e}/faq`,a="FAQ BOUNCE2BOUNCE | Electronic Music Events and Experiences",s="Answers to the most common questions about BOUNCE2BOUNCE events, tickets, and the platform.",i=`${e}/images/og-image.png`,t=(d,p,l)=>{let h=document.head.querySelector(`meta[${d}="${p}"]`);h||(h=document.createElement("meta"),h.setAttribute(d,p),document.head.appendChild(h)),h.setAttribute("content",l)},n=(d,p)=>{let l=document.head.querySelector(`link[rel="${d}"]`);l||(l=document.createElement("link"),l.setAttribute("rel",d),document.head.appendChild(l)),l.setAttribute("href",p)};document.title=a,t("name","description",s),t("name","robots","index,follow"),t("property","og:type","website"),t("property","og:site_name","BOUNCE2BOUNCE"),t("property","og:title",a),t("property","og:description",s),t("property","og:url",o),t("property","og:image",i),t("name","twitter:card","summary_large_image"),t("name","twitter:title",a),t("name","twitter:description",s),t("name","twitter:image",i),t("name","twitter:site","@bounce2bounce"),n("canonical",o)},[]),c.useEffect(()=>{const e=b.current;if(!e)return;const o=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(o)&&/Safari/.test(o)&&!/Chrome/.test(o)))return;const s=t=>{const n=t.touches&&t.touches[0];n&&(u.current.startY=n.clientY,u.current.lastY=n.clientY)},i=t=>{const n=t.touches&&t.touches[0];if(!n)return;const d=n.clientY-u.current.lastY;u.current.lastY=n.clientY;const p=e.scrollTop<=0,l=e.scrollTop+e.clientHeight>=e.scrollHeight-1;(p&&d>0||l&&d<0)&&t.preventDefault()};return e.addEventListener("touchstart",s,{passive:!0}),e.addEventListener("touchmove",i,{passive:!1}),()=>{e.removeEventListener("touchstart",s),e.removeEventListener("touchmove",i)}},[]);const[m,f]=c.useState([]),[j,g]=c.useState(null);c.useEffect(()=>{const e=async()=>{try{console.log("📥 Loading FAQ content from API (mobile)...");const a=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",s=await fetch(`${a}/api/settings/faq?ts=${Date.now()}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(s.ok){const i=await s.json();if(console.log("✅ FAQ content loaded from API (mobile):",i),i.success&&i.data){const t=i.data.map(n=>({q:n.question,qText:I(n.question_html||n.question),qHtml:n.question_html||n.question,a:n.answer,aHtml:n.answer_html||n.answer,id:n.id,display_order:n.display_order}));f(t),g(null),console.log("✅ FAQ items set (mobile):",t.length)}else throw new Error("Invalid API response format")}else throw new Error(`API responded with ${s.status}: ${s.statusText}`)}catch(o){console.error("❌ Error loading FAQ content from API (mobile):",o),console.log("🔄 Falling back to default FAQ content (mobile)..."),f([{q:"What is BOUNCE2BOUNCE?",a:"BOUNCE2BOUNCE is a premium live music events platform that connects artists with fans through exclusive experiences and seamless ticket sales."},{q:"How do I buy tickets?",a:"Tickets can be purchased directly through our platform. Simply browse events, click 'Get Tickets' on any event card, and complete your purchase through our secure checkout process."},{q:"What payment methods do you accept?",a:"We accept all major credit cards, PayPal, and Apple Pay for secure and convenient transactions."},{q:"Is BOUNCE2BOUNCE mobile-friendly?",a:"Yes, BOUNCE2BOUNCE features a mobile-first design optimized for iOS Safari and all browsers, providing a seamless mobile experience for event discovery and ticket purchasing."},{q:"How do I contact BOUNCE2BOUNCE?",a:"You can reach us at info@bounce2bounce.com for general inquiries or events@bounce2bounce.com for event-related questions and artist promotion opportunities."}]),g("Using default FAQ content. API connection unavailable.")}};q(),e()},[]);const[w,k]=c.useState(null),E=e=>k(o=>o===e?null:e),C=e=>{if(e==="/faq"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return c.useEffect(()=>{const e="ld-json-faq",o=document.getElementById(e);o&&o.remove();const a=[{q:"What is Bounce2Bounce?",a:"Bounce2Bounce is a comprehensive event management platform that helps you create, manage, and promote events with ease."},{q:"How do I create an event?",a:"Simply log into your dashboard, click 'Create Event', and follow our step-by-step wizard to set up your event details, ticketing, and promotion."}],s=m&&m.length?m:a,i=document.createElement("script");i.type="application/ld+json",i.id=e;const t=s.map(n=>({"@type":"Question",name:n.q,acceptedAnswer:{"@type":"Answer",text:n.a}}));i.text=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t}),document.head.appendChild(i)},[m]),r.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:[r.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",background:"#000000",position:"relative",display:"flex",flexDirection:"column",overflow:"hidden",overscrollBehavior:"contain"},"aria-label":"Mobile FAQ page content",children:[r.jsx(A,{currentPage:"faq",scrollY:y,onNavigate:C}),r.jsx("div",{ref:b,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:x,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none",touchAction:"pan-y",transform:"translateZ(0)",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"FAQ page content",children:r.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 48px 24px",boxSizing:"border-box"},children:[r.jsx("h1",{style:{margin:"16px 0 24px 0",fontSize:"32px",fontWeight:800,lineHeight:1.15,letterSpacing:"-0.02em",textAlign:"center",color:"#FFFFFF"},children:"FAQ"}),r.jsx("div",{style:{padding:"0 10px"},children:m.map((e,o)=>{const a=w===o;return r.jsxs("div",{style:{background:"rgba(22,22,22,0.4)",border:"1px solid rgba(56,56,56,0.3)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:"14px",marginBottom:"10px",overflow:"hidden",transition:"transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)",willChange:"transform, opacity",transform:a?"translateZ(0) scale(1.01)":"translateZ(0) scale(1)",boxShadow:a?"0 8px 24px rgba(0,0,0,0.25)":"0 4px 12px rgba(0,0,0,0.15)",opacity:0,animation:`fadeInUp 0.4s ease-out ${.1+o*.05}s forwards`},children:[r.jsxs("button",{onClick:()=>E(o),id:`faq-mobile-question-${o}`,"aria-expanded":a,"aria-controls":`faq-mobile-answer-${o}`,style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",background:"transparent",color:"#FFF",border:"none",cursor:"pointer",fontSize:"18px",lineHeight:1.3,fontWeight:600,minHeight:"44px"},children:[r.jsx("span",{className:"rich-text-content",children:e.qText}),r.jsx("span",{className:"faq-arrow","aria-hidden":"true",style:{display:"inline-flex",width:"20px",height:"20px",alignItems:"center",justifyContent:"center",transform:a?"rotate(180deg) translateZ(0)":"rotate(0deg) translateZ(0)",transformOrigin:"50% 50%"},children:r.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",style:{display:"block"},children:r.jsx("path",{d:"M6 9l6 6 6-6",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),r.jsx("div",{id:`faq-mobile-answer-${o}`,role:"region","aria-labelledby":`faq-mobile-question-${o}`,style:{maxHeight:a?"min(70vh, 560px)":"0px",transition:"max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)",willChange:"max-height, padding",overflow:"hidden"},children:r.jsx("div",{style:{padding:a?"12px 24px 24px 24px":"0 24px",color:"rgba(255,255,255,0.84)",borderTop:"1px solid rgba(56,56,56,0.3)",borderTopColor:a?"rgba(56,56,56,0.3)":"rgba(56,56,56,0)",opacity:a?1:0,transform:a?"translateY(0)":"translateY(4px)",transition:"opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, border-top-color 0.28s ease 0.04s"},children:r.jsx("div",{className:"faq-answer-scroll",style:{maxHeight:"min(68vh, 520px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"},children:r.jsx("div",{className:"rich-text-content",dangerouslySetInnerHTML:{__html:B(e.aHtml||e.a)}})})})})]},o)})})]})})]}),r.jsx("style",{children:`
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

        /* Modern animated arrow for expand/collapse */
        .faq-arrow {
          transition: transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }


        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `})]})};export{H as default};
