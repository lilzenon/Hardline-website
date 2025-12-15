const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShopPageMobile-BGaCKsWZ.js","assets/index-CsLu4SQv.js","assets/vendor-ViNJc2wV.js","assets/index-BPM0BZxC.css","assets/MobileNavigation-DJx52tMr.js","assets/SocialMediaButtons-C09amIQx.js","assets/shopService-D3Jzy0Uo.js","assets/Footer-CWmz9ZOT.js","assets/CartIcon-bLlWLKrh.js","assets/Breadcrumb-sbMKAyvo.js","assets/useSEO-C4A9Mgdk.js"])))=>i.map(i=>d[i]);
import{a as P,j as e,B as E,_ as R}from"./index-CsLu4SQv.js";import{b as r}from"./vendor-ViNJc2wV.js";import{a as W,D as U,F as A}from"./Footer-CWmz9ZOT.js";import{C as D,a as N}from"./CartIcon-bLlWLKrh.js";import{f as H}from"./shopService-D3Jzy0Uo.js";import{u as X}from"./useSEO-C4A9Mgdk.js";import{B as $}from"./Breadcrumb-sbMKAyvo.js";const V=t=>{window.navigateWithTransition?window.navigateWithTransition(t):window.location.href=t};function z(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(t/100)}const B=["XXS","XS","S","M","L","XL","XXL","2XL","3XL","4XL"],Y=t=>[...t].sort((a,p)=>{const n=B.indexOf(a.toUpperCase()),d=B.indexOf(p.toUpperCase());return n!==-1&&d!==-1?n-d:n!==-1?-1:d!==-1?1:a.localeCompare(p,void 0,{numeric:!0,sensitivity:"base"})});function q({product:t,onAddToCart:a}){const[p,n]=r.useState(!1),[d,m]=r.useState(!1),[f,x]=r.useState(!1),[c,u]=r.useState(!1),[y,k]=r.useState(0),{addItem:b,toggleCart:v}=P(),h=t.stock_quantity!==null&&t.stock_quantity<=0,g=t?.sizes&&Array.isArray(t.sizes)&&t.sizes.length>0?Y(t.sizes.filter(i=>i.stock>0).map(i=>i.size)):[],w="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E",I=t.images&&Array.isArray(t.images)&&t.images.length>0?typeof t.images[0]=="object"&&t.images[0].url?t.images.sort((i,o)=>i.is_primary&&!o.is_primary?-1:!i.is_primary&&o.is_primary?1:(i.sort_order||0)-(o.sort_order||0)).map(i=>i.url):t.images:t.image_url?[t.image_url]:[w],L=I.length,T=i=>{const o=i.target.scrollLeft,S=i.target.offsetWidth;if(o<0){i.target.scrollLeft=0;return}const j=Math.round(o/S);j!==y&&k(j)},_=async i=>{if(i.stopPropagation(),!(h||f)){if(g.length>0){u(!c);return}x(!0),await new Promise(o=>setTimeout(o,600)),b(t,1),v(!0),a&&a(t),x(!1)}},M=async(i,o)=>{if(i.stopPropagation(),f)return;x(!0),u(!1),await new Promise(j=>setTimeout(j,600));const S={...t,size:o};b(S,1),v(!0),a&&a(S),x(!1)},C=()=>{V(`/shop/${t.id}`)},O=g.length>0?`${Math.min(g.length*44+8,220)}px`:"40px";return e.jsxs("div",{style:{background:"transparent",border:"none",borderRadius:"0",overflow:"visible",cursor:"pointer",position:"relative",opacity:0,animation:"fadeInUp 0.6s ease-out forwards"},onClick:C,onMouseEnter:()=>n(!0),onMouseLeave:()=>{n(!1),m(!1),u(!1)},role:"article",tabIndex:0,onKeyDown:i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),C())},"aria-label":`${t.name} - ${z(t.price)}. Click to view details.`,children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{style:{position:"relative",width:"100%",paddingBottom:"133%",overflow:"hidden",backgroundColor:"rgba(30, 30, 30, 0.5)",borderRadius:"4px"},children:[e.jsx("div",{className:"product-carousel",onScroll:T,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",overflowX:"auto",overflowY:"hidden",scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch"},children:I.map((i,o)=>e.jsx("div",{style:{flex:"0 0 100%",width:"100%",minWidth:"100%",height:"100%",scrollSnapAlign:"start",scrollSnapStop:"always",flexShrink:0},children:e.jsx("img",{src:i,alt:`${t.name} - Image ${o+1}`,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 300ms ease",transform:p?"scale(1.03)":"scale(1)"},loading:"lazy",draggable:"false"})},o))}),L>1&&e.jsx("div",{style:{position:"absolute",bottom:"12px",left:"0",right:"0",display:"flex",justifyContent:"center",gap:"6px",zIndex:2,pointerEvents:"none"},children:I.map((i,o)=>e.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:o===y?"#FFFFFF":"rgba(255, 255, 255, 0.4)",boxShadow:"0 1px 2px rgba(0,0,0,0.3)",transition:"background 0.2s ease"}},o))}),!h&&e.jsx("div",{style:{position:"absolute",bottom:"12px",right:"12px",height:"40px",width:c?O:"40px",background:"#FFFFFF",borderRadius:c?"20px":"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:c?"default":"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:10,overflow:"hidden",padding:c?"0 4px":"0"},onClick:c?i=>i.stopPropagation():_,onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),children:f?e.jsx("div",{style:{width:"14px",height:"14px",border:"2px solid rgba(0,0,0,0.1)",borderTop:"2px solid #000",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}):c?e.jsx("div",{style:{display:"flex",gap:"4px",animation:"fadeIn 0.2s ease"},children:g.map(i=>e.jsx("button",{onClick:o=>M(o,i),style:{minWidth:"36px",height:"32px",border:"none",background:"transparent",borderRadius:"16px",fontFamily:"Inter, sans-serif",fontSize:"13px",fontWeight:700,color:"#000000",cursor:"pointer",padding:"0 8px",transition:"background 0.2s ease"},onMouseEnter:o=>o.currentTarget.style.background="rgba(0,0,0,0.05)",onMouseLeave:o=>o.currentTarget.style.background="transparent",children:i},i))}):e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",style:{color:"#000000",flexShrink:0},children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),e.jsxs("div",{style:{padding:"8px 0 0 0"},children:[e.jsx("h3",{style:{fontFamily:"Inter, sans-serif",fontWeight:500,fontSize:"13px",lineHeight:"1.4",color:"#FFFFFF",marginBottom:"4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.name}),e.jsx("p",{style:{fontFamily:"Inter, sans-serif",fontWeight:400,fontSize:"13px",color:"rgba(255, 255, 255, 0.7)",marginBottom:"0"},children:h?e.jsx("span",{style:{color:"rgba(255, 255, 255, 0.4)"},children:"Out of Stock"}):z(t.price)})]})]})}const l={container:{display:"grid",gap:"8px",width:"100%"},skeleton:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},skeletonImage:{width:"100%",aspectRatio:"3/4",background:"rgba(255, 255, 255, 0.05)",borderRadius:"0",animation:"pulse 1.5s ease-in-out infinite"},skeletonContent:{padding:"0 4px"},skeletonTitle:{height:"14px",width:"70%",background:"rgba(255, 255, 255, 0.1)",borderRadius:"2px",marginBottom:"8px"},skeletonPrice:{height:"14px",width:"30%",background:"rgba(255, 255, 255, 0.1)",borderRadius:"2px",marginBottom:"0"},skeletonButton:{display:"none"},emptyState:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif"},emptyIcon:{fontSize:"48px",marginBottom:"16px"},emptyTitle:{fontSize:"20px",fontWeight:600,color:"#FFFFFF",marginBottom:"8px"},emptyText:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)"}},G=`
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
`;function K(){return e.jsxs("div",{style:l.skeleton,children:[e.jsx("div",{style:l.skeletonImage}),e.jsxs("div",{style:l.skeletonContent,children:[e.jsx("div",{style:l.skeletonTitle}),e.jsx("div",{style:l.skeletonPrice}),e.jsx("div",{style:l.skeletonButton})]})]})}function Z(){return e.jsxs("div",{style:l.emptyState,children:[e.jsx("div",{style:l.emptyIcon,children:"🛍️"}),e.jsx("h3",{style:l.emptyTitle,children:"No products available"}),e.jsx("p",{style:l.emptyText,children:"Check back soon for new items!"})]})}function J({products:t=[],loading:a=!1,onAddToCart:p}){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:G}),e.jsx("div",{className:"shop-product-grid",style:l.container,role:"list","aria-label":"Products",children:a?Array.from({length:6}).map((n,d)=>e.jsx(K,{},`skeleton-${d}`)):t.length===0?e.jsx(Z,{}):t.map(n=>e.jsx(q,{product:n,onAddToCart:p},n.id))})]})}const Q=r.lazy(()=>R(()=>import("./ShopPageMobile-BGaCKsWZ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])));function ee({openCart:t=!1}){const[a,p]=r.useState([]),[n,d]=r.useState(!0),[m,f]=r.useState(null),[x,c]=r.useState(!1),[u,y]=r.useState(!0),{isOpen:k,toggleCart:b}=P(),{updateTitle:v,updateDescription:h}=X(),{isMobile:F}=W();r.useEffect(()=>{v("Shop | BOUNCE2BOUNCE"),h("Official BOUNCE2BOUNCE merchandise. Shop exclusive clothing, accessories, and more.")},[]),r.useEffect(()=>{t&&!k&&b()},[t]),r.useEffect(()=>{c(F),y(!1)},[F]);const g=async()=>{try{d(!0),f(null);const s=await H();p(s),console.log("🛍️ Loaded",s.length,"products")}catch(s){console.error("❌ Failed to load products:",s),f(s.message)}finally{d(!1)}};r.useEffect(()=>{g()},[]);const w=s=>{console.log(`🧭 Shop Page Navigation: Switched to ${s} tab`)};return u?e.jsx(E,{fullScreen:!0,minDisplayTime:300,showMessage:!1}):x?e.jsx(r.Suspense,{fallback:e.jsx(E,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:e.jsx(Q,{products:a,loading:n,error:m,onRetry:g})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"homepage-content shop-layout-container",style:{minHeight:"100vh",background:"#000000",width:"100%"},children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:"1400px",margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 40px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr",width:"100%",height:"56px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",onClick:()=>w("/"),style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:s=>{s.currentTarget.style.transform="scale(1.05)",s.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:s=>{s.currentTarget.style.transform="scale(1)",s.currentTarget.style.filter="brightness(1)"}}),e.jsx(U,{currentPage:"Shop",onNavigate:w})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"24px",marginBottom:"8px",width:"100%"},children:[e.jsx($,{items:[{name:"Home",url:"/"},{name:"Shop"}]}),e.jsx("div",{children:e.jsx(D,{})})]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"32px",fontWeight:"600",textAlign:"left",marginBottom:"16px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards",paddingLeft:"0px",letterSpacing:"-0.02em"},children:"Shop"}),e.jsx("div",{style:{width:"100%",margin:"0 auto",paddingBottom:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:m?e.jsxs("div",{style:{textAlign:"center",padding:"48px 24px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderRadius:"16px",border:"1px solid rgba(255, 100, 100, 0.3)"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"⚠️"}),e.jsx("h3",{style:{fontSize:"20px",fontWeight:600,marginBottom:"8px",color:"#FFF"},children:"Unable to load products"}),e.jsx("p",{style:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)",marginBottom:"16px"},children:m}),e.jsx("button",{onClick:g,style:{padding:"12px 24px",minHeight:"44px",background:"linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)",border:"none",borderRadius:"8px",fontFamily:"Inter, sans-serif",fontWeight:600,fontSize:"14px",color:"#FFFFFF",cursor:"pointer"},children:"Try Again"})]}):e.jsx(J,{products:a,loading:n})}),e.jsx(A,{compact:!1})]})})}),e.jsx(N,{})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));export{J as P,le as S};
