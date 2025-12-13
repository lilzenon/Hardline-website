const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShopPageMobile-CTl1hMUO.js","assets/index-BLOPSgtx.js","assets/vendor-ViNJc2wV.js","assets/index-BPM0BZxC.css","assets/MobileNavigation-D5fgngxv.js","assets/SocialMediaButtons-yq0fD57k.js","assets/Footer-yQmP3QCX.js","assets/CartIcon-BUQn9nho.js","assets/shopService-d0_ZfhGH.js","assets/apiConfig-DLPjctRA.js","assets/Breadcrumb-BRaPRYMC.js","assets/useSEO-xkoELyII.js"])))=>i.map(i=>d[i]);
import{a as B,j as e,B as z,_ as R}from"./index-BLOPSgtx.js";import{b as r}from"./vendor-ViNJc2wV.js";import{a as O,D as W,F as N}from"./Footer-yQmP3QCX.js";import{C as U,a as A}from"./CartIcon-BUQn9nho.js";import{f as D}from"./shopService-d0_ZfhGH.js";import{u as H}from"./useSEO-xkoELyII.js";import{B as $}from"./Breadcrumb-BRaPRYMC.js";const V=t=>{window.navigateWithTransition?window.navigateWithTransition(t):window.location.href=t};function E(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(t/100)}function Y({product:t,onAddToCart:a}){const[x,l]=r.useState(!1),[f,p]=r.useState(!1),[g,m]=r.useState(!1),[d,u]=r.useState(!1),[y,k]=r.useState(0),{addItem:b,toggleCart:v}=B(),h=t.stock_quantity!==null&&t.stock_quantity<=0,c=t?.sizes&&Array.isArray(t.sizes)&&t.sizes.length>0?t.sizes.filter(o=>o.stock>0).map(o=>o.size):[],w="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E",I=t.images&&Array.isArray(t.images)&&t.images.length>0?typeof t.images[0]=="object"&&t.images[0].url?t.images.sort((o,i)=>o.is_primary&&!i.is_primary?-1:!o.is_primary&&i.is_primary?1:(o.sort_order||0)-(i.sort_order||0)).map(o=>o.url):t.images:t.image_url?[t.image_url]:[w],P=I.length,T=o=>{const i=o.target.scrollLeft,S=o.target.offsetWidth;if(i<0){o.target.scrollLeft=0;return}const j=Math.round(i/S);j!==y&&k(j)},_=async o=>{if(o.stopPropagation(),!(h||g)){if(c.length>0){u(!d);return}m(!0),await new Promise(i=>setTimeout(i,600)),b(t,1),v(!0),a&&a(t),m(!1)}},M=async(o,i)=>{if(o.stopPropagation(),g)return;m(!0),u(!1),await new Promise(j=>setTimeout(j,600));const S={...t,size:i};b(S,1),v(!0),a&&a(S),m(!1)},C=()=>{V(`/shop/${t.id}`)},L=c.length>0?`${Math.min(c.length*44+8,220)}px`:"40px";return e.jsxs("div",{style:{background:"transparent",border:"none",borderRadius:"0",overflow:"visible",cursor:"pointer",position:"relative",opacity:0,animation:"fadeInUp 0.6s ease-out forwards"},onClick:C,onMouseEnter:()=>l(!0),onMouseLeave:()=>{l(!1),p(!1),u(!1)},role:"article",tabIndex:0,onKeyDown:o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),C())},"aria-label":`${t.name} - ${E(t.price)}. Click to view details.`,children:[e.jsx("style",{children:`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .product-carousel::-webkit-scrollbar { display: none; }
        .product-carousel { -ms-overflow-style: none; scrollbar-width: none; }
      `}),e.jsxs("div",{style:{position:"relative",width:"100%",paddingBottom:"133%",overflow:"hidden",backgroundColor:"rgba(30, 30, 30, 0.5)",borderRadius:"4px"},children:[e.jsx("div",{className:"product-carousel",onScroll:T,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",overflowX:"auto",overflowY:"hidden",scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch"},children:I.map((o,i)=>e.jsx("div",{style:{flex:"0 0 100%",width:"100%",minWidth:"100%",height:"100%",scrollSnapAlign:"start",scrollSnapStop:"always",flexShrink:0},children:e.jsx("img",{src:o,alt:`${t.name} - Image ${i+1}`,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 300ms ease",transform:x?"scale(1.03)":"scale(1)"},loading:"lazy",draggable:"false"})},i))}),P>1&&e.jsx("div",{style:{position:"absolute",bottom:"12px",left:"0",right:"0",display:"flex",justifyContent:"center",gap:"6px",zIndex:2,pointerEvents:"none"},children:I.map((o,i)=>e.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:i===y?"#FFFFFF":"rgba(255, 255, 255, 0.4)",boxShadow:"0 1px 2px rgba(0,0,0,0.3)",transition:"background 0.2s ease"}},i))}),!h&&e.jsx("div",{style:{position:"absolute",bottom:"12px",right:"12px",height:"40px",width:d?L:"40px",background:"#FFFFFF",borderRadius:d?"20px":"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:d?"default":"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:10,overflow:"hidden",padding:d?"0 4px":"0"},onClick:d?o=>o.stopPropagation():_,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),children:g?e.jsx("div",{style:{width:"14px",height:"14px",border:"2px solid rgba(0,0,0,0.1)",borderTop:"2px solid #000",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}):d?e.jsx("div",{style:{display:"flex",gap:"4px",animation:"fadeIn 0.2s ease"},children:c.map(o=>e.jsx("button",{onClick:i=>M(i,o),style:{minWidth:"36px",height:"32px",border:"none",background:"transparent",borderRadius:"16px",fontFamily:"Inter, sans-serif",fontSize:"13px",fontWeight:700,color:"#000000",cursor:"pointer",padding:"0 8px",transition:"background 0.2s ease"},onMouseEnter:i=>i.currentTarget.style.background="rgba(0,0,0,0.05)",onMouseLeave:i=>i.currentTarget.style.background="transparent",children:o},o))}):e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",style:{color:"#000000",flexShrink:0},children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),e.jsxs("div",{style:{padding:"8px 0 0 0"},children:[e.jsx("h3",{style:{fontFamily:"Inter, sans-serif",fontWeight:500,fontSize:"13px",lineHeight:"1.4",color:"#FFFFFF",marginBottom:"4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.name}),e.jsx("p",{style:{fontFamily:"Inter, sans-serif",fontWeight:400,fontSize:"13px",color:"rgba(255, 255, 255, 0.7)",marginBottom:"0"},children:h?e.jsx("span",{style:{color:"rgba(255, 255, 255, 0.4)"},children:"Out of Stock"}):E(t.price)})]})]})}const n={container:{display:"grid",gap:"8px",width:"100%"},skeleton:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},skeletonImage:{width:"100%",aspectRatio:"3/4",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0",animation:"pulse 1.5s ease-in-out infinite"},skeletonContent:{padding:"0 4px"},skeletonTitle:{height:"14px",width:"70%",background:"rgba(255, 255, 255, 0.1)",borderRadius:"2px",marginBottom:"8px"},skeletonPrice:{height:"14px",width:"30%",background:"rgba(255, 255, 255, 0.1)",borderRadius:"2px",marginBottom:"0"},skeletonButton:{display:"none"},emptyState:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif"},emptyIcon:{fontSize:"48px",marginBottom:"16px"},emptyTitle:{fontSize:"20px",fontWeight:600,color:"#FFFFFF",marginBottom:"8px"},emptyText:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)"}},q=`
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .shop-product-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 0px; /* Removed gap */
    row-gap: 0px; /* Removed gap */
  }

  @media (min-width: 768px) {
    .shop-product-grid {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 12px;
      row-gap: 16px;
    }
  }

  @media (min-width: 1024px) {
    .shop-product-grid {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 16px;
      row-gap: 24px;
    }
  }

  @media (min-width: 1440px) {
    .shop-product-grid {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 20px;
      row-gap: 32px;
    }
  }
`;function G(){return e.jsxs("div",{style:n.skeleton,children:[e.jsx("div",{style:n.skeletonImage}),e.jsxs("div",{style:n.skeletonContent,children:[e.jsx("div",{style:n.skeletonTitle}),e.jsx("div",{style:n.skeletonPrice}),e.jsx("div",{style:n.skeletonButton})]})]})}function K(){return e.jsxs("div",{style:n.emptyState,children:[e.jsx("div",{style:n.emptyIcon,children:"🛍️"}),e.jsx("h3",{style:n.emptyTitle,children:"No products available"}),e.jsx("p",{style:n.emptyText,children:"Check back soon for new items!"})]})}function X({products:t=[],loading:a=!1,onAddToCart:x}){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:q}),e.jsx("div",{className:"shop-product-grid",style:n.container,role:"list","aria-label":"Products",children:a?Array.from({length:6}).map((l,f)=>e.jsx(G,{},`skeleton-${f}`)):t.length===0?e.jsx(K,{}):t.map(l=>e.jsx(Y,{product:l,onAddToCart:x},l.id))})]})}const J=r.lazy(()=>R(()=>import("./ShopPageMobile-CTl1hMUO.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])));function Q({openCart:t=!1}){const[a,x]=r.useState([]),[l,f]=r.useState(!0),[p,g]=r.useState(null),[m,d]=r.useState(!1),[u,y]=r.useState(!0),{isOpen:k,toggleCart:b}=B(),{updateTitle:v,updateDescription:h}=H(),{isMobile:F}=O();r.useEffect(()=>{v("Shop | BOUNCE2BOUNCE"),h("Official BOUNCE2BOUNCE merchandise. Shop exclusive clothing, accessories, and more.")},[]),r.useEffect(()=>{t&&!k&&b()},[t]),r.useEffect(()=>{d(F),y(!1)},[F]);const c=async()=>{try{f(!0),g(null);const s=await D();x(s),console.log("🛍️ Loaded",s.length,"products")}catch(s){console.error("❌ Failed to load products:",s),g(s.message)}finally{f(!1)}};r.useEffect(()=>{c()},[]);const w=s=>{console.log(`🧭 Shop Page Navigation: Switched to ${s} tab`)};return u?e.jsx(z,{fullScreen:!0,minDisplayTime:300,showMessage:!1}):m?e.jsx(r.Suspense,{fallback:e.jsx(z,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:e.jsx(J,{products:a,loading:l,error:p,onRetry:c})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Smooth desktop/mobile layout transitions */
          .shop-layout-container {
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}),e.jsx("div",{className:"homepage-content shop-layout-container",style:{minHeight:"100vh",background:"#000000",width:"100%"},children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:"1400px",margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 40px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr",width:"100%",height:"56px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",onClick:()=>w("/"),style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:s=>{s.currentTarget.style.transform="scale(1.05)",s.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:s=>{s.currentTarget.style.transform="scale(1)",s.currentTarget.style.filter="brightness(1)"}}),e.jsx(W,{currentPage:"Shop",onNavigate:w})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"24px",marginBottom:"8px",width:"100%"},children:[e.jsx($,{items:[{name:"Home",url:"/"},{name:"Shop"}]}),e.jsx("div",{children:e.jsx(U,{})})]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"600",textAlign:"left",marginBottom:"16px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards",paddingLeft:"0px",letterSpacing:"-0.02em"},children:"Shop"}),e.jsx("div",{style:{width:"100%",margin:"0 auto",paddingBottom:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:p?e.jsxs("div",{style:{textAlign:"center",padding:"48px 24px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderRadius:"16px",border:"1px solid rgba(255, 100, 100, 0.3)"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"⚠️"}),e.jsx("h3",{style:{fontSize:"20px",fontWeight:600,marginBottom:"8px",color:"#FFF"},children:"Unable to load products"}),e.jsx("p",{style:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)",marginBottom:"16px"},children:p}),e.jsx("button",{onClick:c,style:{padding:"12px 24px",minHeight:"44px",background:"linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)",border:"none",borderRadius:"8px",fontFamily:"Inter, sans-serif",fontWeight:600,fontSize:"14px",color:"#FFFFFF",cursor:"pointer"},children:"Try Again"})]}):e.jsx(X,{products:a,loading:l})}),e.jsx(N,{compact:!1})]})})}),e.jsx(A,{})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{X as P,ne as S};
