const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShopPageMobile-DA6G32jJ.js","assets/index-DJjymn4r.js","assets/vendor-ViNJc2wV.js","assets/index-BPM0BZxC.css","assets/MobileNavigation-V6IYlCbm.js","assets/SocialMediaButtons-BDCG9-XG.js","assets/Footer-NFXEpM0g.js","assets/CartIcon-BMB45Ok8.js","assets/shopService-B0YcJSnN.js","assets/Breadcrumb-DVM6s6VV.js"])))=>i.map(i=>d[i]);
import{a as k,j as e,B as y,_ as j}from"./index-DJjymn4r.js";import{b as r}from"./vendor-ViNJc2wV.js";import{u as F,D as S,F as w}from"./Footer-NFXEpM0g.js";import{C as B,a as C}from"./CartIcon-BMB45Ok8.js";import{f as I}from"./shopService-B0YcJSnN.js";import{B as P}from"./Breadcrumb-DVM6s6VV.js";const z=t=>{window.navigateWithTransition?window.navigateWithTransition(t):window.location.href=t},i={container:{background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"16px",overflow:"hidden",transition:"transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 200ms ease",cursor:"pointer"},containerHover:{transform:"translateY(-4px)",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)"},imageContainer:{position:"relative",width:"100%",paddingBottom:"100%",overflow:"hidden",backgroundColor:"rgba(30, 30, 30, 0.5)"},image:{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",transition:"transform 300ms ease"},imageHover:{transform:"scale(1.05)"},content:{padding:"16px"},title:{fontFamily:"Inter, sans-serif",fontWeight:600,fontSize:"16px",lineHeight:"1.3",color:"#FFFFFF",marginBottom:"8px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},price:{fontFamily:"Inter, sans-serif",fontWeight:700,fontSize:"18px",color:"#319DFF",marginBottom:"12px"},button:{width:"100%",padding:"12px 16px",minHeight:"44px",background:"linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)",border:"none",borderRadius:"8px",fontFamily:"Inter, sans-serif",fontWeight:600,fontSize:"14px",color:"#FFFFFF",cursor:"pointer",transition:"opacity 200ms ease, transform 100ms ease"},buttonHover:{opacity:.9},buttonActive:{transform:"scale(0.98)"},outOfStock:{background:"rgba(100, 100, 100, 0.5)",cursor:"not-allowed"}};function v(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(t/100)}function M({product:t,onAddToCart:p}){const[l,s]=r.useState(!1),[d,m]=r.useState(!1),[f,g]=r.useState(!1),{addItem:h,toggleCart:b}=k(),a=t.stock_quantity!==null&&t.stock_quantity<=0,u=c=>{c.stopPropagation(),!a&&(h(t,1),b(!0),p&&p(t))},x=()=>{z(`/shop/${t.id}`)},o=t.image_url||t.images?.[0]||"/images/placeholder-product.png";return e.jsxs("div",{style:{...i.container,...l?i.containerHover:{}},onClick:x,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),role:"article",tabIndex:0,onKeyDown:c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),x())},"aria-label":`${t.name} - ${v(t.price)}. Click to view details.`,children:[e.jsx("div",{style:i.imageContainer,children:e.jsx("img",{src:o,alt:t.name,style:{...i.image,...l?i.imageHover:{}},loading:"lazy"})}),e.jsxs("div",{style:i.content,children:[e.jsx("h3",{style:i.title,children:t.name}),e.jsx("p",{style:i.price,children:v(t.price)}),e.jsx("button",{style:{...i.button,...a?i.outOfStock:{},...d&&!a?i.buttonHover:{},...f&&!a?i.buttonActive:{}},onClick:u,onMouseEnter:()=>m(!0),onMouseLeave:()=>{m(!1),g(!1)},onMouseDown:()=>g(!0),onMouseUp:()=>g(!1),disabled:a,"aria-label":a?"Out of stock":`Add ${t.name} to cart`,children:a?"Out of Stock":"Add to Cart"})]})]})}const n={container:{display:"grid",gap:"24px",width:"100%"},skeleton:{background:"rgba(22, 22, 22, 0.8)",backdropFilter:"blur(20px)",border:"1px solid rgba(56, 56, 56, 0.3)",borderRadius:"16px",overflow:"hidden",animation:"pulse 1.5s ease-in-out infinite"},skeletonImage:{width:"100%",paddingBottom:"100%",background:"linear-gradient(90deg, rgba(40,40,40,0.5) 25%, rgba(60,60,60,0.5) 50%, rgba(40,40,40,0.5) 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"},skeletonContent:{padding:"16px"},skeletonTitle:{height:"20px",width:"70%",background:"rgba(60, 60, 60, 0.5)",borderRadius:"4px",marginBottom:"8px"},skeletonPrice:{height:"24px",width:"40%",background:"rgba(60, 60, 60, 0.5)",borderRadius:"4px",marginBottom:"12px"},skeletonButton:{height:"44px",width:"100%",background:"rgba(60, 60, 60, 0.5)",borderRadius:"8px"},emptyState:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter, sans-serif"},emptyIcon:{fontSize:"48px",marginBottom:"16px"},emptyTitle:{fontSize:"20px",fontWeight:600,color:"#FFFFFF",marginBottom:"8px"},emptyText:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)"}},T=`
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .shop-product-grid {
    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) {
    .shop-product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .shop-product-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1440px) {
    .shop-product-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;function A(){return e.jsxs("div",{style:n.skeleton,children:[e.jsx("div",{style:n.skeletonImage}),e.jsxs("div",{style:n.skeletonContent,children:[e.jsx("div",{style:n.skeletonTitle}),e.jsx("div",{style:n.skeletonPrice}),e.jsx("div",{style:n.skeletonButton})]})]})}function E(){return e.jsxs("div",{style:n.emptyState,children:[e.jsx("div",{style:n.emptyIcon,children:"🛍️"}),e.jsx("h3",{style:n.emptyTitle,children:"No products available"}),e.jsx("p",{style:n.emptyText,children:"Check back soon for new items!"})]})}function H({products:t=[],loading:p=!1,onAddToCart:l}){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:T}),e.jsx("div",{className:"shop-product-grid",style:n.container,role:"list","aria-label":"Products",children:p?Array.from({length:6}).map((s,d)=>e.jsx(A,{},`skeleton-${d}`)):t.length===0?e.jsx(E,{}):t.map(s=>e.jsx(M,{product:s,onAddToCart:l},s.id))})]})}const O=r.lazy(()=>j(()=>import("./ShopPageMobile-DA6G32jJ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9])));function W(){const[t,p]=r.useState([]),[l,s]=r.useState(!0),[d,m]=r.useState(null),[f,g]=r.useState(!1),[h,b]=r.useState(!0);k();const{isMobile:a}=F();r.useEffect(()=>{(()=>{const c=window.innerWidth<768||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);g(c||a),b(!1)})()},[a]);const u=async()=>{try{s(!0),m(null);const o=await I();p(o),console.log("🛍️ Loaded",o.length,"products")}catch(o){console.error("❌ Failed to load products:",o),m(o.message)}finally{s(!1)}};r.useEffect(()=>{u()},[]);const x=o=>{window.navigateWithTransition?window.navigateWithTransition(o):window.location.href=o};return h?e.jsx(y,{fullScreen:!0,minDisplayTime:300,showMessage:!1}):f?e.jsx(r.Suspense,{fallback:e.jsx(y,{fullScreen:!0,minDisplayTime:300,showMessage:!1}),children:e.jsx(O,{products:t,loading:l,error:d,onRetry:u})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"homepage-content shop-layout-container",style:{minHeight:"100vh",background:"#000000",width:"100%"},children:e.jsx("div",{className:"desktop-container",style:{width:"100%",maxWidth:"1400px",margin:"0 auto",position:"relative",background:"#000000",minHeight:"auto",padding:"0 40px",boxSizing:"border-box"},children:e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",width:"100%",height:"48px",alignItems:"center",margin:"35px 0 0 0"},children:[e.jsx("img",{crossOrigin:"anonymous",referrerPolicy:"no-referrer",src:"/images/figma-exact/b2b-logo-nav.svg",alt:"B2B Logo",loading:"lazy",decoding:"async",onClick:()=>x("/"),style:{width:"180px",height:"56px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"scale(1)"},onMouseEnter:o=>{o.currentTarget.style.transform="scale(1.05)",o.currentTarget.style.filter="brightness(1.1)"},onMouseLeave:o=>{o.currentTarget.style.transform="scale(1)",o.currentTarget.style.filter="brightness(1)"}}),e.jsx(S,{currentPage:"Shop",onNavigate:x}),e.jsx("div",{style:{justifySelf:"end"},children:e.jsx(B,{})})]}),e.jsx(P,{items:[{name:"Home",url:"/"},{name:"Shop"}]}),e.jsx("div",{style:{color:"#FFF",fontFamily:"Inter",fontSize:"48px",fontWeight:"800",textAlign:"center",marginTop:"8px",marginBottom:"4px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.2s forwards"},children:"Shop"}),e.jsx("div",{style:{color:"rgba(255, 255, 255, 0.6)",fontFamily:"Inter",fontSize:"16px",textAlign:"center",marginBottom:"32px",opacity:0,animation:"fadeInUp 0.8s ease-out 0.3s forwards"},children:"Official BOUNCE2BOUNCE merchandise"}),e.jsx("div",{style:{width:"100%",margin:"0 auto",paddingBottom:"40px",boxSizing:"border-box",opacity:0,animation:"fadeInUp 0.8s ease-out 0.4s forwards"},children:d?e.jsxs("div",{style:{textAlign:"center",padding:"48px 24px",background:"rgba(22, 22, 22, 0.30)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderRadius:"16px",border:"1px solid rgba(255, 100, 100, 0.3)"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"⚠️"}),e.jsx("h3",{style:{fontSize:"20px",fontWeight:600,marginBottom:"8px",color:"#FFF"},children:"Unable to load products"}),e.jsx("p",{style:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)",marginBottom:"16px"},children:d}),e.jsx("button",{onClick:u,style:{padding:"12px 24px",minHeight:"44px",background:"linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)",border:"none",borderRadius:"8px",fontFamily:"Inter, sans-serif",fontWeight:600,fontSize:"14px",color:"#FFFFFF",cursor:"pointer"},children:"Try Again"})]}):e.jsx(H,{products:t,loading:l})}),e.jsx(w,{compact:!1})]})})}),e.jsx(C,{})]})}const $=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));export{H as P,$ as S};
