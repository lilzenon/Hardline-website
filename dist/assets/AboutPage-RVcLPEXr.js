const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutPageMobile-B7NVrhnV.js","assets/index-CKDZ5YQ8.js","assets/vendor-ViNJc2wV.js","assets/index-CTSQklRg.css","assets/MobileNavigation-D96z-KtQ.js","assets/SocialMediaButtons-D-cEY1re.js","assets/usePerformantResize-Fo8ytToz.js"])))=>i.map(i=>d[i]);
import{j as o,B as O,_ as X}from"./index-CKDZ5YQ8.js";import{b as r,R as V}from"./vendor-ViNJc2wV.js";import{u as J}from"./usePerformantResize-Fo8ytToz.js";const K=({images:t=[],columns:u={desktop:4,tablet:3,mobile:2},gap:W=16,className:x="",onImageClick:y=null})=>{const[I,T]=r.useState(new Set),[j,E]=r.useState(u.desktop),[M,D]=r.useState(!1),[l,R]=r.useState(null),[v,w]=r.useState(new Map),[f,B]=r.useState(!1),P=r.useRef(null),C=r.useRef(null),F=r.useRef(null),A=r.useRef(0),a=r.useCallback(()=>{const e=window.innerWidth;e<768?E(u.mobile):e<1024?E(u.tablet):E(u.desktop)},[u]),s=r.useCallback(()=>window.innerWidth<768,[]);r.useEffect(()=>(C.current=new IntersectionObserver(([e])=>{e.isIntersecting&&(D(!0),C.current?.disconnect())},{threshold:.1}),P.current&&C.current.observe(P.current),()=>C.current?.disconnect()),[]),r.useEffect(()=>(a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)),[a]);const d=r.useCallback(e=>{T(i=>new Set([...i,e])),w(i=>new Map(i.set(e,"loaded")))},[]),n=r.useCallback(e=>{w(i=>new Map(i.set(e,"loading")))},[]),g=r.useCallback((e,i)=>{if(Date.now()-A.current<300){console.log("🚫 Image click ignored - too soon after modal close");return}if(f){console.log("🚫 Image click ignored - modal is closing");return}console.log("🖼️ Image clicked:",e),console.log("🔍 Image properties:",Object.keys(e));const h=e.url||e.src||e.image_url||e.file_url;console.log("🔗 Image URL found:",h),h?(R({...e,url:h,index:i}),document.body.style.overflow="hidden"):console.error("❌ No valid image URL found in image object:",e),y&&y(e)},[y,f]),p=r.useCallback(e=>{e&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()),B(!0),A.current=Date.now(),R(null),document.body.style.overflow="unset",setTimeout(()=>{B(!1)},100)},[]),S=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),p(e))},[p]),$=r.useCallback(e=>{e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),p(e))},[p]);r.useEffect(()=>{const e=i=>{if(l)switch(i.key){case"Escape":i.preventDefault(),p();break;case"Enter":case" ":i.preventDefault(),p();break}};if(l)return document.addEventListener("keydown",e),F.current&&F.current.focus(),()=>document.removeEventListener("keydown",e)},[l,p]);const z=r.useCallback(()=>{const e=Array.from({length:j},()=>[]),i=Array(j).fill(0);return t.forEach((c,h)=>{const H=i.indexOf(Math.min(...i));e[H].push({...c,originalIndex:h});const U=300*(c.aspectRatio||c.height/c.width||1.2);i[H]+=U+W}),e},[t,j,W])(),k=`
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
        rgba(22, 22, 22, 0.9) 25%,
        rgba(56, 56, 56, 0.5) 50%,
        rgba(22, 22, 22, 0.9) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 2s ease-in-out infinite;
      border-radius: 12px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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
  `;return M?o.jsxs(o.Fragment,{children:[o.jsx("style",{children:k}),o.jsx("div",{ref:P,className:`masonry-gallery ${x}`,style:{display:"flex",gap:`${W}px`,width:"100%",alignItems:"flex-start"},children:z.map((e,i)=>o.jsx("div",{className:"masonry-column",style:{flex:1,display:"flex",flexDirection:"column",gap:`${W}px`},children:e.map(c=>o.jsx(q,{image:c,isLoaded:I.has(c.originalIndex),loadingState:v.get(c.originalIndex),onLoad:()=>d(c.originalIndex),onLoadStart:()=>n(c.originalIndex),onClick:()=>g(c,c.originalIndex)},c.originalIndex))},i))}),l&&o.jsx("div",{ref:F,className:"modal-backdrop",style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:f?"rgba(0, 0, 0, 0.7)":"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:s()?"60px 30px":"40px",cursor:"pointer",transition:"background-color 0.2s ease","&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none"}},onClick:S,onTouchEnd:$,title:"Click outside image to close",role:"dialog","aria-modal":"true","aria-label":"Expanded gallery image",tabIndex:0,children:o.jsxs("div",{className:"expanded-image",style:{maxWidth:s()?"70vw":"85vw",maxHeight:s()?"50vh":"85vh",position:"relative",margin:s()?"30px":"20px",borderRadius:"16px",overflow:"hidden",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.7)",transition:"transform 0.2s ease",transform:f?"scale(0.95)":"scale(1)"},onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()},children:[o.jsx("img",{src:l.urls?.large||l.url||l.src||l.image_url||l.file_url,alt:l.alt||l.title||"Gallery image",style:{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.5)"},onError:e=>{const i=e.target,c=i.src;if(l.urls){if(c!==l.urls.medium&&l.urls.medium){console.log("🔄 Modal fallback to medium variant"),i.src=l.urls.medium;return}else if(c!==l.urls.original&&l.urls.original){console.log("🔄 Modal fallback to original"),i.src=l.urls.original;return}}console.error("❌ Modal image failed to load:",l),i.style.display="none"},onLoad:()=>{console.log("✅ Modal image loaded successfully")}}),o.jsx("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),p(e)},onTouchEnd:e=>{e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation(),p(e)},"aria-label":"Close image",style:{position:"absolute",top:s()?"10px":"-10px",right:s()?"10px":"-10px",width:s()?"44px":"40px",height:s()?"44px":"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.8)",border:"2px solid rgba(255, 255, 255, 0.2)",color:"white",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",zIndex:10001,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.2)",e.target.style.transform="scale(1.1)",e.target.style.borderColor="rgba(255, 255, 255, 0.4)"},onMouseLeave:e=>{e.target.style.background="rgba(0, 0, 0, 0.8)",e.target.style.transform="scale(1)",e.target.style.borderColor="rgba(255, 255, 255, 0.2)"},children:"×"})]})})]}):o.jsxs(o.Fragment,{children:[o.jsx("style",{children:k}),o.jsx("div",{ref:P,className:`masonry-gallery-placeholder ${x}`,style:{height:"300px",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:"16px",border:"1px solid rgba(56, 56, 56, 0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.8)",fontFamily:"Inter, sans-serif",fontSize:"16px",fontWeight:"500",transition:"all 0.3s ease",opacity:0,animation:"fadeInUp 0.6s ease-out 0.2s forwards"},children:o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"},children:[o.jsx("div",{style:{width:"32px",height:"32px",border:"2px solid rgba(255, 255, 255, 0.3)",borderTop:"2px solid rgba(255, 255, 255, 0.8)",borderRadius:"50%",animation:"spin 1s linear infinite"}}),o.jsx("span",{children:"Loading Gallery..."})]})})]})},q=({image:t,isLoaded:u,loadingState:W,onLoad:x,onLoadStart:y,onClick:I})=>{const[T,j]=r.useState(!1),E=r.useRef(null),M=r.useCallback(()=>{x()},[x]),D=r.useCallback(()=>{y()},[y]),l=r.useCallback(()=>{try{const v=t?.url||t?.src||t?.image_url||t?.file_url;console.error("❌ Gallery image failed to load:",{attemptedUrl:v,image:t})}catch{}j(!0),x()},[x,t]),R=r.useCallback(()=>{I&&I(t)},[I,t]);return o.jsxs("div",{className:"masonry-image masonry-image-container",style:{position:"relative",borderRadius:"12px",overflow:"hidden",background:u?"transparent":"rgba(22, 22, 22, 0.9)",border:u?"none":"1px solid rgba(56, 56, 56, 0.2)",backdropFilter:u?"none":"blur(20px)",WebkitBackdropFilter:u?"none":"blur(20px)",cursor:I?"pointer":"default",opacity:u?1:.95,animation:u?"fadeInScale 0.5s ease-out":"none",aspectRatio:t.aspectRatio||(t.height&&t.width?`${t.width}/${t.height}`:"1/1.2"),minHeight:"auto",width:"100%"},onClick:R,children:[!u&&!T&&o.jsx("div",{className:"skeleton-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",aspectRatio:t.aspectRatio||(t.height&&t.width?`${t.width}/${t.height}`:"1/1.2"),minHeight:"auto",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:o.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontSize:"12px",fontFamily:"Inter, sans-serif",fontWeight:"500",textAlign:"center",padding:"8px"},children:"Loading..."})}),T?o.jsx("div",{style:{width:"100%",aspectRatio:t.aspectRatio||(t.height&&t.width?`${t.width}/${t.height}`:"1/1.2"),display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500",background:"rgba(22, 22, 22, 0.9)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderRadius:"12px",border:"1px solid rgba(56, 56, 56, 0.2)"},children:o.jsxs("div",{style:{textAlign:"center",padding:"16px"},children:[o.jsx("div",{style:{marginBottom:"8px",fontSize:"18px",opacity:.7},children:"📷"}),o.jsx("div",{children:"Image unavailable"})]})}):o.jsx("img",{ref:E,src:t.url||t.src||t.image_url||t.file_url,srcSet:t.srcSet?`
            ${t.srcSet.small||t.urls?.small} 400w,
            ${t.srcSet.medium||t.urls?.medium} 600w,
            ${t.srcSet.large||t.urls?.large} 800w
          `.trim():t.urls?`
            ${t.urls.small} 400w,
            ${t.urls.medium} 600w,
            ${t.urls.large} 800w
          `.trim():void 0,sizes:"(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",alt:t.alt||t.title||"Gallery image",loading:"lazy",onLoadStart:D,onLoad:M,onError:v=>{const w=v.target,f=w.src;if(t.urls){if(f!==t.urls.medium&&t.urls.medium){console.log("🔄 Fallback to medium variant:",t.urls.medium),w.src=t.urls.medium;return}else if(f!==t.urls.small&&t.urls.small){console.log("🔄 Fallback to small variant:",t.urls.small),w.src=t.urls.small;return}else if(f!==t.urls.original&&t.urls.original){console.log("🔄 Fallback to original:",t.urls.original),w.src=t.urls.original;return}}l(v)},style:{width:"100%",height:"auto",display:"block",transition:"opacity 0.4s ease, transform 0.3s ease",opacity:u?1:0,objectFit:"cover",aspectRatio:"inherit"}}),t.title&&o.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0, 0, 0, 0.8))",color:"white",padding:"16px 12px 12px",fontFamily:"Inter, sans-serif",fontSize:"14px",fontWeight:"500"},children:t.title})]})},Q=()=>{const[t,u]=r.useState(!1),[W,x]=r.useState(!0),[y,I]=r.useState("About"),[T,j]=r.useState(""),[E,M]=r.useState(null),[D,l]=r.useState([]),[R,v]=r.useState({heroWidth:299,heroHeight:299,rightHeroWidth:498,rightHeroHeight:299,gap:32,containerWidth:1192,eventsTextGap:18,eventCardWidth:220,eventCardHeight:85,eventsWidth:380,textUsWidth:380,scale:1});J(a=>{const{width:s}=a,d=s<=360?16:s<=480?24:32,n=s-d,g=299,p=299,S=498,$=299,b=32,z=1192,e=z-48,i=g+b+S,c=380,h=380,H=40,_=c+H+h,U=Math.max(i,_);let m=Math.min(n/U,e/U);m=Math.min(m,1.8);const N={heroWidth:Math.round(g*m*.9),heroHeight:Math.round(p*m*.9),rightHeroWidth:Math.round(S*m),rightHeroHeight:Math.round($*m),gap:Math.round(b*m),containerWidth:z,eventsWidth:Math.round(c*m),textUsWidth:Math.round(h*m),eventsTextGap:Math.round(H*m),eventCardWidth:220,eventCardHeight:85,scale:m},Y=navigator.userAgent||"",L=/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Y),G=s<=768||L;u(G),x(!1),v(N),console.log(`🎯 About page responsive scaling: ${m.toFixed(3)} for viewport ${s}px (max 1.8x, container: 1192px)`,N),console.log("📱 About Page Device Detection:",{viewportWidth:s,isMobileByUA:L,finalDecision:G?"MOBILE":"DESKTOP"})}),r.useEffect(()=>{w(),B()},[]);const w=async()=>{try{M(null);const s=window.location.hostname==="localhost"?"":"https://admin.b2b.click";console.log("🔍 Fetching About page content from API...");const d=await fetch(`${s}/api/settings/about`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!d.ok)throw new Error(`HTTP error! status: ${d.status}`);const n=await d.json();if(n.success&&n.data)j(n.data.content),console.log("✅ About page content loaded successfully");else throw new Error("Invalid response format")}catch(a){console.error("❌ Error fetching About page content:",a),M(a.message),j(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`)}finally{}},f=a=>{const s=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",d=a?.url||a?.src||a?.image_url||a?.file_url||a?.path||a?.imagePath||"",n=typeof d=="string"?d:d?.url||"";if(n&&/^https?:\/\//i.test(n))return{...a,url:n};if(n&&n.includes("/api/images/serve/")){const p=/\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(n)?n:`${n.replace(/\/?$/,"")}/medium`,S=p.startsWith("http")?p:`${s}${p}`;return{...a,url:S}}if(n&&n.startsWith("/")&&/[a-f0-9-]{36}/i.test(n)){const g=n.match(/([a-f0-9-]{36})/i);if(g){const p=g[1];return{...a,url:`${s}/api/images/serve/${p}/medium`}}}return a&&a.uuid&&typeof a.uuid=="string"?{...a,url:`${s}/api/images/serve/${a.uuid}/medium`}:n&&n.startsWith("/")?{...a,url:`${s}${n}`}:a},B=async()=>{try{const d=`${window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click"}/api/settings/about/gallery/public`;console.log("🔍 Fetching gallery from:",d);const n=await fetch(d,{method:"GET",headers:{"Content-Type":"application/json"},cache:"no-cache"});if(n.ok){const g=await n.json();if(console.log("🔍 Gallery API Response:",JSON.stringify(g,null,2)),g.success&&Array.isArray(g.data)){console.log("🖼️ First image structure:",g.data[0]);const p=g.data.map((S,$)=>{const b=f(S),z=window.location.hostname==="localhost"?"http://localhost:3002":"https://admin.b2b.click",k=h=>h&&(/^https?:\/\//i.test(h)?h:`${z}${h}`),e=b&&(b.urls||b.srcSet)||{},i={thumbnail:k(e.thumbnail),small:k(e.small),medium:k(e.medium||b?.url),large:k(e.large),original:k(e.original||b?.url)},c={...b,urls:i,srcSet:i};return $<5&&console.log("🧭 Normalized gallery image",$,c?.url||c,c.urls),c});l(p)}else console.warn("Invalid gallery response format:",g),l([])}else console.warn("Failed to fetch gallery images:",n.status),l([])}catch(a){console.error("❌ Error fetching gallery images:",a),l([])}},P=a=>{if(!a)return[];const s=a.split(/\n\s*\n|\n/).filter(d=>d.trim());return s.map((d,n)=>o.jsx("p",{style:{margin:n===s.length-1?"0":"0 0 24px 0",fontSize:"18px",lineHeight:"1.7",color:"rgba(255, 255, 255, 0.9)"},children:d.trim()},n))},C=a=>{I(a),a==="Events"?window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/":a==="About"?window.navigateWithTransition?window.navigateWithTransition("/about"):window.location.href="/about":a==="Contact"&&(window.navigateWithTransition?window.navigateWithTransition("/contact"):window.location.href="/contact")},F=(a,s)=>{const d=y===a;return{position:"absolute",left:s,top:"4.7px",display:"flex",width:"93.3px",height:"34.8px",padding:"15px 14px",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"12px",background:d?"#000":"transparent",boxShadow:d?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":"none",cursor:"pointer",transition:"all 0.3s ease",transform:d?"scale(1)":"scale(0.95)",opacity:d?1:.8}},A=a=>({color:"#FFF",fontFamily:"Inter",fontSize:"13px",fontWeight:y===a?"300":"400",lineHeight:"normal",transition:"font-weight 0.3s ease"});if(W)return o.jsx(O,{fullScreen:!0,minDisplayTime:800,showMessage:!1});if(t){const a=V.lazy(()=>X(()=>import("./AboutPageMobile-B7NVrhnV.js"),__vite__mapDeps([0,1,2,3,4,5,6])));return o.jsx(V.Suspense,{fallback:o.jsx(O,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:o.jsx(a,{})})}return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
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
        `}),o.jsx("div",{className:"homepage-content",style:{minHeight:"auto"},children:o.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:`${R.containerWidth}px`,margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 20px",boxSizing:"border-box"},children:o.jsxs("div",{style:{width:"100%",position:"relative"},children:[o.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[o.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",fetchpriority:"high",onClick:()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"},style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:a=>{a.currentTarget.style.transform="scale(1.05)",a.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:a=>{a.currentTarget.style.transform="scale(1)",a.currentTarget.style.filter="brightness(1)"}}),o.jsxs("div",{style:{position:"relative",width:"294.45px",height:"44.2px",gridColumn:"3",justifySelf:"end"},children:[o.jsx("div",{style:{position:"absolute",left:"0px",top:"0px",width:"294.45px",height:"44.2px",background:"#232323",borderRadius:"14px",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}),o.jsx("div",{style:F("Events","4.21px"),onClick:()=>C("Events"),children:o.jsx("span",{style:A("Events"),children:"Events"})}),o.jsx("div",{style:F("About","100.14px"),onClick:()=>C("About"),children:o.jsx("span",{style:A("About"),children:"About"})}),o.jsx("div",{style:F("Contact","196.07px"),onClick:()=>C("Contact"),children:o.jsx("span",{style:A("Contact"),children:"Contact"})})]})]}),o.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"64px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"About"}),o.jsxs("div",{style:{width:"100%",maxWidth:"800px",margin:"48px auto 0 auto",background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"24px",padding:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:[o.jsx("div",{style:{textAlign:"left"},children:P(T)}),E&&o.jsx("div",{style:{marginTop:"24px",padding:"16px",background:"rgba(255, 0, 0, 0.1)",border:"1px solid rgba(255, 0, 0, 0.3)",borderRadius:"12px",fontSize:"14px",color:"rgba(255, 255, 255, 0.7)"},children:"Note: Using fallback content due to connection issue."})]}),o.jsxs("div",{style:{marginTop:t?"0px":"24px",marginBottom:"32px"},children:[o.jsx("div",{style:{color:"#FFFFFF",fontFamily:"Inter",fontWeight:"600",fontSize:t?"24px":"32px",lineHeight:"1.3em",marginBottom:t?"8px":"16px",textAlign:"center",opacity:0,animation:"fadeInUp 0.6s ease-out 0.3s forwards"},children:"Gallery"}),o.jsx(K,{images:D,columns:{desktop:4,tablet:3,mobile:2},gap:t?12:16})]})]})})})]})},oe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{oe as A,K as M};
