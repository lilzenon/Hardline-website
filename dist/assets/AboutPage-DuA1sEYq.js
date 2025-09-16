const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-BGIEckr7.js","assets/index-CRd3qiAr.js","assets/vendor-ViNJc2wV.js","assets/index-CTSQklRg.css","assets/MobileDrawer-CsLubrtm.js","assets/SocialMediaButtons-6su5aTte.js","assets/usePerformantResize-Fo8ytToz.js"])))=>i.map(i=>d[i]);
import{j as t,B,_ as X}from"./index-CRd3qiAr.js";import{b as n,R as D}from"./vendor-ViNJc2wV.js";import{u as J}from"./usePerformantResize-Fo8ytToz.js";const q=({images:e=[],columns:p={desktop:4,tablet:3,mobile:2},gap:I=16,className:m="",onImageClick:f=null})=>{const[y,S]=n.useState(new Set),[v,j]=n.useState(p.desktop),[C,F]=n.useState(!1),[i,E]=n.useState(null),[x,b]=n.useState(new Map),g=n.useRef(null),W=n.useRef(null),z=n.useRef(null),w=n.useCallback(()=>{const r=window.innerWidth;r<768?j(p.mobile):r<1024?j(p.tablet):j(p.desktop)},[p]);n.useEffect(()=>(W.current=new IntersectionObserver(([r])=>{r.isIntersecting&&(F(!0),W.current?.disconnect())},{threshold:.1}),g.current&&W.current.observe(g.current),()=>W.current?.disconnect()),[]),n.useEffect(()=>(w(),window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)),[w]);const M=n.useCallback(r=>{S(s=>new Set([...s,r])),b(s=>new Map(s.set(r,"loaded")))},[]),A=n.useCallback(r=>{b(s=>new Map(s.set(r,"loading")))},[]),o=n.useCallback((r,s)=>{console.log("🖼️ Image clicked:",r),console.log("🔍 Image properties:",Object.keys(r));const c=r.url||r.src||r.image_url||r.file_url;console.log("🔗 Image URL found:",c),c?(E({...r,url:c,index:s}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",r),f&&f(r)},[f]),l=n.useCallback(()=>{E(null),document.body.style.overflow="unset"},[]);n.useEffect(()=>{const r=s=>{s.key==="Escape"&&i&&l()};if(i)return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[i,l]);const a=n.useCallback(()=>{const r=Array.from({length:v},()=>[]),s=Array(v).fill(0);return e.forEach((c,k)=>{const T=s.indexOf(Math.min(...s));r[T].push({...c,originalIndex:k});const R=300*(c.aspectRatio||c.height/c.width||1.2);s[T]+=R+I}),r},[e,v,I])(),u=`
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
  `;return C?t.jsxs(t.Fragment,{children:[t.jsx("style",{children:u}),t.jsx("div",{ref:g,className:`masonry-gallery ${m}`,style:{display:"flex",gap:`${I}px`,width:"100%",alignItems:"flex-start"},children:a.map((r,s)=>t.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${I}px`},children:r.map(c=>t.jsx(K,{image:c,isLoaded:y.has(c.originalIndex),loadingState:x.get(c.originalIndex),onLoad:()=>M(c.originalIndex),onLoadStart:()=>A(c.originalIndex),onClick:()=>o(c,c.originalIndex)},c.originalIndex))},s))}),i&&t.jsx("div",{ref:z,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"20px",cursor:"pointer"},onClick:l,children:t.jsxs("div",{className:"expanded-image",style:{maxWidth:"90vw",maxHeight:"90vh",position:"relative"},onClick:r=>r.stopPropagation(),children:[t.jsx("img",{src:i.urls?.large||i.url||i.src||i.image_url||i.file_url,alt:i.alt||i.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:r=>{const s=r.target,c=s.src;if(i.urls){if(c!==i.urls.medium&&i.urls.medium){console.log("🔄 Modal fallback to medium variant"),s.src=i.urls.medium;return}else if(c!==i.urls.original&&i.urls.original){console.log("🔄 Modal fallback to original"),s.src=i.urls.original;return}}console.error("❌ Modal image failed to load:",i),s.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),t.jsx("button",{onClick:l,style:{position:"absolute",top:"-10px",right:"-10px",width:"40px",height:"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease"},onMouseEnter:r=>{r.target.style.background="rgba(255, 255, 255, 0.2)",r.target.style.transform="scale(1.1)"},onMouseLeave:r=>{r.target.style.background="rgba(0, 0, 0, 0.8)",r.target.style.transform="scale(1)"},children:"×"})]})})]}):t.jsxs(t.Fragment,{children:[t.jsx("style",{children:u}),t.jsx("div",{ref:g,className:`masonry-gallery-placeholder ${m}`,style:{height:"400px",background:"rgba(22, 22, 22, 0.8)",borderRadius:"16px",border:"1px solid rgba(56, 56, 56, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.7)",fontFamily:"Inter, sans-serif",fontSize:"16px"},children:"Loading Gallery..."})]})},K=({image:e,isLoaded:p,loadingState:I,onLoad:m,onLoadStart:f,onClick:y})=>{const[S,v]=n.useState(!1),j=n.useRef(null),C=n.useCallback(()=>{m()},[m]),F=n.useCallback(()=>{f()},[f]),i=n.useCallback(()=>{try{const x=e?.url||e?.src||e?.image_url||e?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:x,image:e})}catch{}v(!0),m()},[m,e]),E=n.useCallback(()=>{y&&y(e)},[y,e]);return t.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:"rgba(22, 22, 22, 0.8)",border:"1px solid rgba(56, 56, 56, 0.3)",backdropFilter:"blur(20px)",cursor:y?"pointer":"default",opacity:p?1:.9,animation:p?"fadeInScale 0.5s ease-out":"none"},onClick:E,children:[!p&&!S&&t.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"200px"},children:t.jsx("div",{style:{color:"rgba(255, 255, 255, 0.5)",fontSize:"14px",fontFamily:"Inter, sans-serif"},children:"Loading..."})}),S?t.jsx("div",{style:{width:"100%",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.5)",fontFamily:"Inter, sans-serif",fontSize:"14px",background:"rgba(22, 22, 22, 0.9)"},children:"Image unavailable"}):t.jsx("img",{ref:j,src:e.url||e.src||e.image_url||e.file_url,srcSet:e.srcSet?`
            ${e.srcSet.small||e.urls?.small} 400w,
            ${e.srcSet.medium||e.urls?.medium} 600w,
            ${e.srcSet.large||e.urls?.large} 800w
          `.trim():e.urls?`
            ${e.urls.small} 400w,
            ${e.urls.medium} 600w,
            ${e.urls.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:e.alt||e.title||"Gallery image",loading:"lazy",onLoadStart:F,onLoad:C,onError:x=>{const b=x.target,g=b.src;if(e.urls){if(g!==e.urls.medium&&e.urls.medium){console.log("🔄 Fallback to medium variant:",e.urls.medium),b.src=e.urls.medium;return}else if(g!==e.urls.small&&e.urls.small){console.log("🔄 Fallback to small variant:",e.urls.small),b.src=e.urls.small;return}else if(g!==e.urls.original&&e.urls.original){console.log("🔄 Fallback to original:",e.urls.original),b.src=e.urls.original;return}}i(x)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.3s ease",opacity:p?1:0}}),e.title&&t.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:e.title})]})},Q=()=>{const[e,p]=n.useState(!1),[I,m]=n.useState(!0),[f,y]=n.useState("About"),[S,v]=n.useState(""),[j,C]=n.useState(null),[F,i]=n.useState([]),[E,x]=n.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});J(o=>{const{width:l}=o,d=l<=360?16:l<=480?24:32,a=l-d,u=299,r=299,s=498,c=299,k=32,T=1192,R=T-48,O=u+k+s,H=380,$=380,L=40,V=H+L+$,U=Math.max(O,V);let h=Math.min(a/U,R/U);h=Math.min(h,1.8);const _={heroWidth:Math.round(u*h*.9),heroHeight:Math.round(r*h*.9),rightHeroWidth:Math.round(s*h),rightHeroHeight:Math.round(c*h),gap:Math.round(k*h),containerWidth:T,eventsWidth:Math.round(H*h),textUsWidth:Math.round($*h),eventsTextGap:Math.round(L*h),eventCardWidth:220,eventCardHeight:85,scale:h},Y=navigator.userAgent||"",N=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Y),P=l<=768||N;p(P),m(!1),x(_),console.log(`🎯 About page responsive scaling: ${h.toFixed(3)} for viewport ${l}px (max 1.8x, container: 1192px)`,_),console.log("📱 About Page Device Detection:",{viewportWidth:l,isMobileByUA:N,finalDecision:P?"MOBILE":"DESKTOP"})}),n.useEffect(()=>{b(),W()},[]);const b=async()=>{try{C(null);const l=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const d=await fetch(`${l}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!d.ok)throw new Error(`HTTP error! status: ${d.status}`);const a=await d.json();if(a.success&&a.data)v(a.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(o){console.error("❌ Error fetching About page content:",o),C(o.message),v(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},g=o=>{const l=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=o?.url||o?.src||o?.image_url||o?.file_url||o?.path||o?.imagePath||"",a=typeof d=="string"?d:d?.url||"";if(a&&/^https?:\/\//i.test(a))return{...o,url:a};if(a&&a.includes("/api/images/serve/")){const r=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(a)?a:`${a.replace(/\/?$/,"")}/medium`,s=r.startsWith("http")?r:`${l}${r}`;return{...o,url:s}}if(a&&a.startsWith("/")&&/[a-f0-9-]{36}/i.test(a)){const u=a.match(/([a-f0-9-]{36})/i);if(u){const r=u[1];return{...o,url:`${l}/api/images/serve/${r}/medium`}}}return o&&o.uuid&&typeof o.uuid=="string"?{...o,url:`${l}/api/images/serve/${o.uuid}/medium`}:a&&a.startsWith("/")?{...o,url:`${l}${a}`}:o},W=async()=>{try{const d=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",d);const a=await fetch(d,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(a.ok){const u=await a.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(u,null,2)),u.success&&Array.isArray(u.data)){console.log("🖼️ First image structure:",u.data[0]);const r=u.data.map((s,c)=>{const k=g(s);return c<5&&console.log("🧭 Normalized gallery image",c,k?.url||k),k});i(r)}else console.warn("Invalid gallery response format:",u),i([])}else console.warn("Failed to fetch gallery images:",a.status),i([])}catch(o){console.error("❌ Error fetching gallery images:",o),i([])}},z=o=>{if(!o)return[];const l=o.split(/\n\s*\n|\n/).filter(d=>d.trim());return l.map((d,a)=>t.jsx("p",{style:{margin:a===l.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:d.trim()},a))},w=o=>{y(o),o==="Events"?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":o==="About"?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":o==="Contact"&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},M=(o,l)=>{const d=f===o;return{position:"absolute",left:l,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:d?"#000":"transparent",boxShadow:d?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:d?"scale(1)":"scale(0.95)",opacity:d?1:.8}},A=o=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:f===o?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"});if(I)return t.jsx(B,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(e){const o=D.lazy(()=>X(()=>import("./AboutPageMobile-BGIEckr7.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return t.jsx(D.Suspense,{fallback:t.jsx(B,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:t.jsx(o,{})})}return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
        `}),t.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:t.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${E.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:t.jsxs("div",{style:{width:"100%",position:"relative"},children:[t.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[t.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:o=>{o.currentTarget.style.transform="scale(1.05)",o.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:o=>{o.currentTarget.style.transform="scale(1)",o.currentTarget.style.filter="brightness(1)"}}),t.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[t.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),t.jsx("div",{style:M("Events","4.21px"),onClick:()=>w("Events"),children:t.jsx("span",{style:A("Events"),children:"Events"})}),t.jsx("div",{style:M("About","100.14px"),onClick:()=>w("About"),children:t.jsx("span",{style:A("About"),children:"About"})}),t.jsx("div",{style:M("Contact","196.07px"),onClick:()=>w("Contact"),children:t.jsx("span",{style:A("Contact"),children:"Contact"})})]})]}),t.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About Us"}),t.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[t.jsx("div",{style:{textAlign:"left"},children:z(S)}),j&&t.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),t.jsxs("div",{style:{marginTop:e?"0px":"24px",marginBottom:"32px"},children:[t.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:e?"24px":"32px",lineHeight:"1.3em",marginBottom:e?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),t.jsx(q,{images:F,columns:{desktop:4,tablet:3,mobile:2},gap:e?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{oe as A,q as M};
