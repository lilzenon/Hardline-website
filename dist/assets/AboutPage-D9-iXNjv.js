const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-BG7ou6Sg.js","assets/index-mtJnWiaw.js","assets/vendor-ViNJc2wV.js","assets/index-CTSQklRg.css","assets/MobileDrawer-1rRbZsJ5.js","assets/SocialMediaButtons-fsS5Y7uB.js","assets/usePerformantResize-Fo8ytToz.js"])))=>i.map(i=>d[i]);
import{j as e,B as D,_ as V}from"./index-mtJnWiaw.js";import{b as o,R as G}from"./vendor-ViNJc2wV.js";import{u as X}from"./usePerformantResize-Fo8ytToz.js";const J=({images:a=[],columns:p={desktop:4,tablet:3,mobile:2},gap:y=16,className:h="",onImageClick:m=null})=>{const[f,w]=o.useState(new Set),[x,v]=o.useState(p.desktop),[k,C]=o.useState(!1),[r,I]=o.useState(null),[T,F]=o.useState(new Map),j=o.useRef(null),S=o.useRef(null),E=o.useRef(null),b=o.useCallback(()=>{const t=window.innerWidth;t<768?v(p.mobile):t<1024?v(p.tablet):v(p.desktop)},[p]);o.useEffect(()=>(S.current=new IntersectionObserver(([t])=>{t.isIntersecting&&(C(!0),S.current?.disconnect())},{threshold:.1}),j.current&&S.current.observe(j.current),()=>S.current?.disconnect()),[]),o.useEffect(()=>(b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)),[b]);const W=o.useCallback(t=>{w(c=>new Set([...c,t])),F(c=>new Map(c.set(t,"loaded")))},[]),n=o.useCallback(t=>{F(c=>new Map(c.set(t,"loading")))},[]),l=o.useCallback((t,c)=>{console.log("🖼️ Image clicked:",t),console.log("🔍 Image properties:",Object.keys(t));const i=t.url||t.src||t.image_url||t.file_url;console.log("🔗 Image URL found:",i),i?(I({...t,url:i,index:c}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",t),m&&m(t)},[m]),s=o.useCallback(()=>{I(null),document.body.style.overflow="unset"},[]);o.useEffect(()=>{const t=c=>{c.key==="Escape"&&r&&s()};if(r)return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[r,s]);const u=o.useCallback(()=>{const t=Array.from({length:x},()=>[]),c=Array(x).fill(0);return a.forEach((i,M)=>{const R=c.indexOf(Math.min(...c));t[R].push({...i,originalIndex:M});const z=300*(i.aspectRatio||i.height/i.width||1.2);c[R]+=z+y}),t},[a,x,y])(),A=`
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      to {
        opacity: 1;
        backdrop-filter: blur(20px);
      }
    }

    @keyframes imageExpand {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .masonry-image {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border-radius: 12px;
      overflow: hidden;
    }

    .masonry-image:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }

    .skeleton-shimmer {
      background: linear-gradient(90deg,
        rgba(22, 22, 22, 0.8) 25%,
        rgba(56, 56, 56, 0.4) 50%,
        rgba(22, 22, 22, 0.8) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 12px;
    }

    .modal-backdrop {
      animation: modalFadeIn 0.3s ease-out;
    }

    .expanded-image {
      animation: imageExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .masonry-image, .masonry-image:hover {
        transition: none;
        transform: none;
      }
      .skeleton-shimmer {
        animation: none;
      }
    }
  `;return k?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:A}),e.jsx("div",{ref:j,className:`masonry-gallery ${h}`,style:{display:"flex",gap:`${y}px`,width:"100%",alignItems:"flex-start"},children:u.map((t,c)=>e.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${y}px`},children:t.map(i=>e.jsx(q,{image:i,isLoaded:f.has(i.originalIndex),loadingState:T.get(i.originalIndex),onLoad:()=>W(i.originalIndex),onLoadStart:()=>n(i.originalIndex),onClick:()=>l(i,i.originalIndex)},i.originalIndex))},c))}),r&&e.jsx("div",{ref:E,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"20px",cursor:"pointer"},onClick:s,children:e.jsxs("div",{className:"expanded-image",style:{maxWidth:"90vw",maxHeight:"90vh",position:"relative"},onClick:t=>t.stopPropagation(),children:[e.jsx("img",{src:r.url||r.src||r.image_url||r.file_url,alt:r.alt||r.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:t=>{console.error("❌ Modal image failed to load:",r),t.target.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),e.jsx("button",{onClick:s,style:{position:"absolute",top:"-10px",right:"-10px",width:"40px",height:"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease"},onMouseEnter:t=>{t.target.style.background="rgba(255, 255, 255, 0.2)",t.target.style.transform="scale(1.1)"},onMouseLeave:t=>{t.target.style.background="rgba(0, 0, 0, 0.8)",t.target.style.transform="scale(1)"},children:"×"})]})})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:A}),e.jsx("div",{ref:j,className:`masonry-gallery-placeholder ${h}`,style:{height:"400px",background:"rgba(22, 22, 22, 0.8)",borderRadius:"16px",border:"1px solid rgba(56, 56, 56, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.7)",fontFamily:"Inter, sans-serif",fontSize:"16px"},children:"Loading Gallery..."})]})},q=({image:a,isLoaded:p,loadingState:y,onLoad:h,onLoadStart:m,onClick:f})=>{const[w,x]=o.useState(!1),v=o.useRef(null),k=o.useCallback(()=>{h()},[h]),C=o.useCallback(()=>{m()},[m]),r=o.useCallback(()=>{x(!0),h()},[h]),I=o.useCallback(()=>{f&&f(a)},[f,a]);return e.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"rgba(22, 22, 22, 0.8)",border:"1px solid rgba(56, 56, 56, 0.3)",backdropFilter:"blur(20px)",cursor:f?"pointer":"default",opacity:p?1:.9,animation:p?"fadeInScale 0.5s ease-out":"none"},onClick:I,children:[!p&&!w&&e.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"200px"},children:e.jsx("div",{style:{color:"rgba(255, 255, 255, 0.5)",fontSize:"14px",fontFamily:"Inter, sans-serif"},children:"Loading..."})}),w?e.jsx("div",{style:{width:"100%",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.5)",fontFamily:"Inter, sans-serif",fontSize:"14px",background:"rgba(22, 22, 22, 0.9)"},children:"Image unavailable"}):e.jsx("img",{ref:v,src:a.url||a.src||a.image_url||a.file_url,srcSet:a.srcSet?`
            ${a.srcSet.small} 400w,
            ${a.srcSet.medium} 600w,
            ${a.srcSet.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:a.alt||a.title||"Gallery image",loading:"lazy",onLoadStart:C,onLoad:k,onError:r,style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.3s ease",opacity:p?1:0}}),a.title&&e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:a.title})]})},K=()=>{const[a,p]=o.useState(!1),[y,h]=o.useState(!0),[m,f]=o.useState("About"),[w,x]=o.useState(""),[v,k]=o.useState(null),[C,r]=o.useState([]),[I,T]=o.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});X(n=>{const{width:l}=n,s=l<=360?16:l<=480?24:32,d=l-s,u=299,A=299,t=498,c=299,i=32,M=1192,H=M-48,z=u+i+t,L=380,U=380,N=40,$=L+N+U,P=Math.max(z,$);let g=Math.min(d/P,H/P);g=Math.min(g,1.8);const B={heroWidth:Math.round(u*g*.9),heroHeight:Math.round(A*g*.9),rightHeroWidth:Math.round(t*g),rightHeroHeight:Math.round(c*g),gap:Math.round(i*g),containerWidth:M,eventsWidth:Math.round(L*g),textUsWidth:Math.round(U*g),eventsTextGap:Math.round(N*g),eventCardWidth:220,eventCardHeight:85,scale:g},Y=navigator.userAgent||"",_=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Y),O=l<=768||_;p(O),h(!1),T(B),console.log(`🎯 About page responsive scaling: ${g.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,B),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:_,finalDecision:O?"MOBILE":"DESKTOP"})}),o.useEffect(()=>{F(),j()},[]);const F=async()=>{try{k(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const s=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);const d=await s.json();if(d.success&&d.data)x(d.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(n){console.error("❌ Error fetching About page content:",n),k(n.message),x(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},j=async()=>{try{const s=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",s);const d=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(d.ok){const u=await d.json();console.log("🔍 Gallery API Response:",JSON.stringify(u,null,2)),u.success&&Array.isArray(u.data)?(console.log("🖼️ First image structure:",u.data[0]),r(u.data)):(console.warn("Invalid gallery response format:",u),r([]))}else console.warn("Failed to fetch gallery images:",d.status),r([])}catch(n){console.error("❌ Error fetching gallery images:",n),r([])}},S=n=>{if(!n)return[];const l=n.split(/\n\s*\n|\n/).filter(s=>s.trim());return l.map((s,d)=>e.jsx("p",{style:{margin:d===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:s.trim()},d))},E=n=>{f(n),n==="Events"?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":n==="About"?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":n==="Contact"&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},b=(n,l)=>{const s=m===n;return{position:"absolute",left:l,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:s?"#000":"transparent",boxShadow:s?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:s?"scale(1)":"scale(0.95)",opacity:s?1:.8}},W=n=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:m===n?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"});if(y)return e.jsx(D,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(a){const n=G.lazy(()=>V(()=>import("./AboutPageMobile-BG7ou6Sg.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return e.jsx(G.Suspense,{fallback:e.jsx(D,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:e.jsx(n,{})})}return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .skeleton-shimmer {
            background: linear-gradient(90deg,
              rgba(22, 22, 22, 0.8) 25%,
              rgba(56, 56, 56, 0.4) 50%,
              rgba(22, 22, 22, 0.8) 75%
            );
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }

          .image-hover-scale {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-hover-scale:hover {
            transform: scale(1.05);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}),e.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${I.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:n=>{n.currentTarget.style.transform="scale(1.05)",n.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:n=>{n.currentTarget.style.transform="scale(1)",n.currentTarget.style.filter="brightness(1)"}}),e.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[e.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),e.jsx("div",{style:b("Events","4.21px"),onClick:()=>E("Events"),children:e.jsx("span",{style:W("Events"),children:"Events"})}),e.jsx("div",{style:b("About","100.14px"),onClick:()=>E("About"),children:e.jsx("span",{style:W("About"),children:"About"})}),e.jsx("div",{style:b("Contact","196.07px"),onClick:()=>E("Contact"),children:e.jsx("span",{style:W("Contact"),children:"Contact"})})]})]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About Us"}),e.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[e.jsx("div",{style:{textAlign:"left"},children:S(w)}),v&&e.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),e.jsxs("div",{style:{marginTop:a?"0px":"24px",marginBottom:"32px"},children:[e.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:a?"24px":"32px",lineHeight:"1.3em",marginBottom:a?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),e.jsx(J,{images:C,columns:{desktop:4,tablet:3,mobile:2},gap:a?12:16})]})]})})})]})},te=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{te as A,J as M};
