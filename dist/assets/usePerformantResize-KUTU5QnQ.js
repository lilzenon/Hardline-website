import{b as e}from"./vendor-BwJ0PBRo.js"
let i=null
const n=new Map,t=(t,o=null)=>{const[w,s]=e.useState({width:0,height:0}),r=e.useRef(t),d=e.useRef(o)
r.current=t,d.current=o
const a=e.useCallback(e=>{s(e),r.current&&r.current(e)},[])
return e.useEffect(()=>{void("undefined"==typeof window||i||"ResizeObserver"in window&&(i=new ResizeObserver(e=>{requestAnimationFrame(()=>{e.forEach(e=>{const i=n.get(e.target)
if(i){const{width:n,height:t}=e.contentRect
i.forEach(e=>e({width:n,height:t}))}})})})))
const e=d.current||window
if(i&&e!==window)return n.has(e)||n.set(e,new Set),n.get(e).add(a),i.observe(e),()=>{const t=n.get(e)
t&&(t.delete(a),0===t.size&&(n.delete(e),i.unobserve(e)))}
{let e=null,i=null
const n=()=>{e&&cancelAnimationFrame(e),i&&clearTimeout(i),i=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,i=window.innerHeight
a({width:e,height:i})})},100)}
return window.addEventListener("resize",n,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,i=window.innerHeight
a({width:e,height:i})}),()=>{window.removeEventListener("resize",n),e&&cancelAnimationFrame(e),i&&clearTimeout(i)}}},[a]),w},o=()=>{const[i,n]=e.useState({width:"undefined"!=typeof window?window.innerWidth:0,height:"undefined"!=typeof window?window.innerHeight:0,isMobile:!1,isTablet:!1,isDesktop:!1}),t=e.useCallback(e=>{const{width:i,height:t}=e
n({width:i,height:t,isMobile:i<=768,isTablet:i>768&&i<=1024,isDesktop:i>1024})},[])
return e.useEffect(()=>{let e=null,i=null
const n=()=>{e&&cancelAnimationFrame(e),i&&clearTimeout(i),i=setTimeout(()=>{e=requestAnimationFrame(()=>{const e=window.innerWidth,i=window.innerHeight
t({width:e,height:i})})},100)}
return window.addEventListener("resize",n,{passive:!0}),e=requestAnimationFrame(()=>{const e=window.innerWidth,i=window.innerHeight
t({width:e,height:i})}),()=>{window.removeEventListener("resize",n),e&&cancelAnimationFrame(e),i&&clearTimeout(i)}},[t]),i}
export{o as a,t as u}
