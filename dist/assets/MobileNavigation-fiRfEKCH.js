import{r as s,R as t}from"./index-BxKjHF-0.js";const c=({currentPage:n="home"})=>{const[e,r]=s.useState(!1),o=()=>{r(!e)},i=a=>{window.navigateWithTransition?window.navigateWithTransition(a):window.location.href=a,r(!1)};return t.createElement(t.Fragment,null,t.createElement("style",null,`
          /* Enable hardware acceleration */
          .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.15s ease-out;
          }

          .mobile-nav-item {
            transition: all 0.15s ease-out;
          }
          
          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }
          
          .mobile-menu-button {
            transition: transform 0.2s ease;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-nav-overlay.entering {
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(0px);
          }

          .mobile-nav-overlay.entered {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
          }
        `),t.createElement("div",{style:{position:"absolute",left:"0px",top:"0px",width:"430px",height:"97px",background:"#000000",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px",boxSizing:"border-box"}},t.createElement("div",{onClick:o,className:"mobile-menu-button",style:{position:"absolute",right:"20px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"}},t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:e?"rotate(45deg) translateY(6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}}),t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:e?0:1,transform:e?"scale(0)":"scale(1)"}}),t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:e?"rotate(-45deg) translateY(-6px)":"rotate(0deg) translateY(0px)",transformOrigin:"center"}})),t.createElement("img",{onClick:()=>i("/"),src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",style:{width:"138.41px",height:"43px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",transition:"all 0.2s ease",userSelect:"none"},onMouseDown:a=>{a.target.style.transform="translate(-50%, -50%) scale(0.95)"},onMouseUp:a=>{a.target.style.transform="translate(-50%, -50%) scale(1)"},onMouseLeave:a=>{a.target.style.transform="translate(-50%, -50%) scale(1)"}})),t.createElement("div",{style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",background:"rgba(0, 0, 0, 0.95)",zIndex:1e3,display:"flex",flexDirection:"column",opacity:e?1:0,visibility:e?"visible":"hidden",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",backdropFilter:e?"blur(10px)":"blur(0px)"}},t.createElement("div",{style:{width:"430px",height:"97px",maxWidth:"100vw",margin:"0 auto",position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px",boxSizing:"border-box"}},t.createElement("div",{onClick:o,className:"mobile-menu-button",style:{position:"absolute",right:"20px",top:"50%",transform:"translateY(-50%)",width:"34px",height:"34px",cursor:"pointer",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"4px"}},t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(45deg) translateY(6px)",transformOrigin:"center"}}),t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",opacity:0,transform:"scale(0)"}}),t.createElement("div",{style:{width:"24px",height:"2px",background:"#FFFFFF",borderRadius:"1px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:"rotate(-45deg) translateY(-6px)",transformOrigin:"center"}})),t.createElement("img",{onClick:()=>i("/"),src:"/images/mobile-figma/b2b-logo-mobile.svg",alt:"B2B Logo",style:{width:"138.41px",height:"43px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",cursor:"pointer",transition:"all 0.2s ease",userSelect:"none"},onMouseDown:a=>{a.target.style.transform="translate(-50%, -50%) scale(0.95)"},onMouseUp:a=>{a.target.style.transform="translate(-50%, -50%) scale(1)"},onMouseLeave:a=>{a.target.style.transform="translate(-50%, -50%) scale(1)"}})),t.createElement("div",{style:{width:"430px",maxWidth:"100vw",margin:"0 auto",padding:"40px 25px",display:"flex",flexDirection:"column",gap:"24px",transform:e?"translateY(0)":"translateY(-20px)",opacity:e?1:0,transition:"all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",transitionDelay:e?"0.2s":"0s"}},t.createElement("div",{onClick:()=>i("/"),className:"mobile-nav-item",style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",opacity:n==="events"?.6:1,transform:e?"translateX(0)":"translateX(-30px)",transition:"transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out",transitionDelay:e?"0.3s":"0s"}},"Events"),t.createElement("div",{onClick:()=>i("/about"),className:"mobile-nav-item",style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",opacity:n==="about"?.6:1,transform:e?"translateX(0)":"translateX(-30px)",transition:"transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out",transitionDelay:e?"0.4s":"0s"}},"About"),t.createElement("div",{onClick:()=>i("/contact"),className:"mobile-nav-item",style:{fontFamily:"Inter",fontWeight:"800",fontSize:"64px",lineHeight:"1.21em",color:"#FFFFFF",cursor:"pointer",textAlign:"center",opacity:n==="contact"?.6:1,transform:e?"translateX(0)":"translateX(-30px)",transition:"transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out",transitionDelay:e?"0.5s":"0s"}},"Contact"))))};export{c as M};
