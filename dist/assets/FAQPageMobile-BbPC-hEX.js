import{j as o}from"./index-Dk1MTCwB.js";import{b as l}from"./vendor-ViNJc2wV.js";import{p as I,b as j,t as E}from"./sanitizer-bb09M-iY.js";import{u as S,a as q,M as C}from"./useNavHeight-BGVpFRuw.js";import"./SocialMediaButtons-DG7AC_7Y.js";const H=()=>{const d=l.useRef(null),u=S(),b=Math.max(u||0,0)+12,c=l.useRef({startY:0,lastY:0}),{scrollY:f}=q(d.current,{threshold:50,throttleMs:200,passive:!0});l.useEffect(()=>{const e=d.current;if(!e)return;const n=navigator.userAgent||"";if(!(/iPhone|iPad|iPod/.test(n)&&/Safari/.test(n)&&!/Chrome/.test(n)))return;const i=a=>{const t=a.touches&&a.touches[0];t&&(c.current.startY=t.clientY,c.current.lastY=t.clientY)},s=a=>{const t=a.touches&&a.touches[0];if(!t)return;const m=t.clientY-c.current.lastY;c.current.lastY=t.clientY;const k=e.scrollTop<=0,F=e.scrollTop+e.clientHeight>=e.scrollHeight-1;(k&&m>0||F&&m<0)&&a.preventDefault()};return e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchmove",s,{passive:!1}),()=>{e.removeEventListener("touchstart",i),e.removeEventListener("touchmove",s)}},[]);const[x,h]=l.useState([]),[A,p]=l.useState(null);l.useEffect(()=>{const e=async()=>{try{console.log("📥 Loading FAQ content from API (mobile)...");const r=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",i=await fetch(`${r}/api/settings/faq?ts=${Date.now()}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(i.ok){const s=await i.json();if(console.log("✅ FAQ content loaded from API (mobile):",s),s.success&&s.data){const a=s.data.map(t=>({q:t.question,qText:E(t.question_html||t.question),qHtml:t.question_html||t.question,a:t.answer,aHtml:t.answer_html||t.answer,id:t.id,display_order:t.display_order}));h(a),p(null),console.log("✅ FAQ items set (mobile):",a.length)}else throw new Error("Invalid API response format")}else throw new Error(`API responded with ${i.status}: ${i.statusText}`)}catch(n){console.error("❌ Error loading FAQ content from API (mobile):",n),console.log("🔄 Falling back to default FAQ content (mobile)..."),h([{q:"What is BOUNCE2BOUNCE?",a:"BOUNCE2BOUNCE is a premium live music events platform that connects artists with fans through exclusive experiences and seamless ticket sales."},{q:"How do I buy tickets?",a:"Tickets can be purchased directly through our platform. Simply browse events, click 'Get Tickets' on any event card, and complete your purchase through our secure checkout process."},{q:"What payment methods do you accept?",a:"We accept all major credit cards, PayPal, and Apple Pay for secure and convenient transactions."},{q:"Is BOUNCE2BOUNCE mobile-friendly?",a:"Yes, BOUNCE2BOUNCE features a mobile-first design optimized for iOS Safari and all browsers, providing a seamless mobile experience for event discovery and ticket purchasing."},{q:"How do I contact BOUNCE2BOUNCE?",a:"You can reach us at info@bounce2bounce.com for general inquiries or events@bounce2bounce.com for event-related questions and artist promotion opportunities."}]),p("Using default FAQ content. API connection unavailable.")}};I(),e()},[]);const[v,g]=l.useState(null),w=e=>g(n=>n===e?null:e),y=e=>{if(e==="/faq"){window.scrollTo({top:0,behavior:"smooth"});return}window.location.href=e};return o.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#000000",position:"relative",overflow:"hidden",fontFamily:"Inter, sans-serif"},children:[o.jsxs("div",{style:{width:"430px",height:"932px",maxWidth:"100vw",maxHeight:"100vh",margin:"0 auto",background:"#000000",position:"relative",display:"flex",flexDirection:"column",overflow:"hidden",overscrollBehavior:"contain"},"aria-label":"Mobile FAQ page content",children:[o.jsx(C,{currentPage:"faq",scrollY:f,onNavigate:y}),o.jsx("div",{ref:d,className:"mobile-content-container mobile-content-fade",style:{flex:"1 1 auto",width:"100%",background:"#000000",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:b,boxSizing:"border-box",overflow:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",scrollBehavior:"smooth",overscrollBehavior:"contain",overscrollBehaviorY:"contain",overscrollBehaviorX:"none",touchAction:"pan-y",transform:"translateZ(0)",willChange:"auto",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"},role:"main","aria-label":"FAQ page content",children:o.jsxs("div",{style:{width:"100%",maxWidth:"430px",padding:"0px 24px 48px 24px",boxSizing:"border-box"},children:[o.jsx("h1",{style:{margin:"16px 0 24px 0",fontSize:"32px",fontWeight:800,lineHeight:1.15,letterSpacing:"-0.02em",textAlign:"center",color:"#FFFFFF"},children:"FAQ"}),o.jsx("div",{style:{padding:"0 10px"},children:x.map((e,n)=>{const r=v===n;return o.jsxs("div",{style:{background:"rgba(22,22,22,0.4)",border:"1px solid rgba(56,56,56,0.3)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:"14px",marginBottom:"10px",overflow:"hidden",transition:"transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)",willChange:"transform, opacity",transform:r?"translateZ(0) scale(1.01)":"translateZ(0) scale(1)",boxShadow:r?"0 8px 24px rgba(0,0,0,0.25)":"0 4px 12px rgba(0,0,0,0.15)",opacity:0,animation:`fadeInUp 0.4s ease-out ${.1+n*.05}s forwards`},children:[o.jsxs("button",{onClick:()=>w(n),id:`faq-mobile-question-${n}`,"aria-expanded":r,"aria-controls":`faq-mobile-answer-${n}`,style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",background:"transparent",color:"#FFF",border:"none",cursor:"pointer",fontSize:"18px",lineHeight:1.3,fontWeight:600,minHeight:"44px"},children:[o.jsx("span",{className:"rich-text-content",children:e.qText}),o.jsx("span",{className:"faq-arrow","aria-hidden":"true",style:{display:"inline-flex",width:"20px",height:"20px",alignItems:"center",justifyContent:"center",transform:r?"rotate(180deg) translateZ(0)":"rotate(0deg) translateZ(0)",transformOrigin:"50% 50%"},children:o.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",style:{display:"block"},children:o.jsx("path",{d:"M6 9l6 6 6-6",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),o.jsx("div",{id:`faq-mobile-answer-${n}`,role:"region","aria-labelledby":`faq-mobile-question-${n}`,style:{maxHeight:r?"min(70vh, 560px)":"0px",transition:"max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)",willChange:"max-height, padding",overflow:"hidden"},children:o.jsx("div",{style:{padding:r?"12px 24px 24px 24px":"0 24px",color:"rgba(255,255,255,0.84)",borderTop:"1px solid rgba(56,56,56,0.3)",borderTopColor:r?"rgba(56,56,56,0.3)":"rgba(56,56,56,0)",opacity:r?1:0,transform:r?"translateY(0)":"translateY(4px)",transition:"opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, border-top-color 0.28s ease 0.04s"},children:o.jsx("div",{className:"faq-answer-scroll",style:{maxHeight:"min(68vh, 520px)",overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"},children:o.jsx("div",{className:"rich-text-content",dangerouslySetInnerHTML:{__html:j(e.aHtml||e.a)}})})})})]},n)})})]})})]}),o.jsx("style",{children:`
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
