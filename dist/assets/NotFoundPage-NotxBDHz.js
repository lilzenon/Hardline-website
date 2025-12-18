const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DitherShadcn-Dav-GsR5.js","assets/index-DCPsEAxX.js","assets/vendor-ViNJc2wV.js","assets/index-BPM0BZxC.css"])))=>i.map(i=>d[i]);
import{j as t,_ as o}from"./index-DCPsEAxX.js";import{b as a}from"./vendor-ViNJc2wV.js";import{l as i}from"./productionDebug-ZprwcnaH.js";const n=a.lazy(()=>o(()=>import("./DitherShadcn-Dav-GsR5.js"),__vite__mapDeps([0,1,2,3])).then(r=>({default:r.Dither}))),s=()=>t.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1,background:`
      radial-gradient(circle at 20% 30%, rgba(128, 128, 128, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(128, 128, 128, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(128, 128, 128, 0.06) 0%, transparent 50%),
      linear-gradient(45deg, #000000 0%, #0a0a0a 25%, #000000 50%, #0a0a0a 75%, #000000 100%)
    `,backgroundSize:"400px 400px, 600px 600px, 300px 300px, 20px 20px",animation:"cssWaveAnimation 8s ease-in-out infinite alternate"},children:t.jsx("style",{children:`
      @keyframes cssWaveAnimation {
        0% {
          opacity: 0.8;
          filter: hue-rotate(0deg) brightness(1);
          background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
        }
        50% {
          opacity: 0.6;
          filter: hue-rotate(5deg) brightness(1.1);
          background-position: 20% 20%, 80% 80%, 30% 70%, 10% 10%;
        }
        100% {
          opacity: 0.7;
          filter: hue-rotate(10deg) brightness(0.9);
          background-position: 40% 10%, 60% 90%, 70% 30%, 20% 20%;
        }
      }
    `})});function c(){a.useState(!1),a.useEffect(()=>{console.log("🔍 NotFoundPage loaded in production environment"),i()},[]);const r=()=>{window.navigateWithTransition?window.navigateWithTransition("/"):window.location.href="/"};return t.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#000000",fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[t.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:t.jsx(a.Suspense,{fallback:t.jsx(s,{}),children:t.jsx(n,{waveSpeed:.02,waveFrequency:2,waveAmplitude:.25,waveColor:[1,1,1],colorNum:2,pixelSize:2,enableMouseInteraction:!1,mouseRadius:1,className:"dither-background"})})}),t.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 40px",borderRadius:"16px",background:"rgba(22, 22, 22, 0.12)",backdropFilter:"blur(4px)",border:"1px solid rgba(255, 255, 255, 0.06)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.2)",maxWidth:"400px",width:"90%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"24px"},children:[t.jsx("img",{src:"/images/figma-exact/b2b-logo-nav.svg",alt:"BOUNCE2BOUNCE",style:{height:"48px",width:"auto",cursor:"pointer",transition:"all 0.3s ease",opacity:.95,filter:"brightness(0) invert(1)"},onClick:r,onError:e=>{e.target.style.display="none",e.target.nextSibling.style.display="block"}}),t.jsx("div",{style:{display:"none",color:"rgba(255, 255, 255, 0.9)",fontSize:"18px",fontWeight:"600",letterSpacing:"0.5px"},children:"BOUNCE2BOUNCE"})]}),t.jsx("h1",{style:{fontSize:"clamp(4rem, 8vw, 6rem)",fontWeight:"800",color:"rgba(255, 255, 255, 0.95)",margin:"0 0 16px 0",lineHeight:"1",letterSpacing:"-0.02em",textShadow:"0 2px 8px rgba(0, 0, 0, 0.2)"},children:"404"}),t.jsx("h2",{style:{fontSize:"clamp(1.25rem, 2.5vw, 1.5rem)",fontWeight:"500",color:"rgba(255, 255, 255, 0.8)",margin:"0 0 32px 0",lineHeight:"1.2"},children:"Not Found"}),t.jsx("button",{onClick:r,style:{padding:"14px 28px",fontSize:"1rem",fontWeight:"500",color:"rgba(255, 255, 255, 0.9)",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"8px",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(2px)",transform:"translateY(0)",outline:"none"},onMouseEnter:e=>{e.target.style.background="rgba(255, 255, 255, 0.12)",e.target.style.borderColor="rgba(255, 255, 255, 0.25)",e.target.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.target.style.background="rgba(255, 255, 255, 0.08)",e.target.style.borderColor="rgba(255, 255, 255, 0.15)",e.target.style.transform="translateY(0)"},onFocus:e=>{e.target.style.borderColor="rgba(255, 255, 255, 0.3)"},onBlur:e=>{e.target.style.borderColor="rgba(255, 255, 255, 0.15)"},"aria-label":"Go back to homepage",children:"Go Home"})]})]})}export{c as default};
