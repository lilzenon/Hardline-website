function e({images:e=p,fit:w=.5,fitBasis:M="auto",minRadius:N=600,maxRadius:k=1/0,padFactor:A=.25,overlayBlurColor:F="rgba(22, 22, 22, 0.8)",maxVerticalRotationDeg:z=g,dragSensitivity:q=f,enlargeTransitionMs:_=h,segments:R=x,dragDampening:X=2,openedImageWidth:Y="400px",openedImageHeight:B="500px",imageBorderRadius:j="16px",openedImageBorderRadius:C="16px",grayscale:D=!1}){const I=a.useRef(null),S=a.useRef(null),E=a.useRef(null),H=a.useRef(null),O=a.useRef(null),P=a.useRef(null),T=a.useRef(null),V=a.useRef(null),L=a.useRef({x:0,y:0}),U=a.useRef({x:0,y:0}),W=a.useRef(null),Z=a.useRef(!1),G=a.useRef(!1),J=a.useRef(null),K=a.useRef(!1),Q=a.useRef(0),ee=a.useRef(0),te=a.useRef(!1),ae=a.useCallback(()=>{te.current||(te.current=!0,document.body.classList.add("dg-scroll-lock"))},[]),ne=a.useCallback(()=>{te.current&&"true"!==I.current?.getAttribute("data-enlarging")&&(te.current=!1,document.body.classList.remove("dg-scroll-lock"))},[]),se=a.useMemo(()=>function(e,t){const a=Array.from({length:t},(e,t)=>2*t-37),n=[-4,-2,0,2,4],s=[-3,-1,1,3,5],r=a.flatMap((e,t)=>(t%2==0?n:s).map(t=>({x:e,y:t,sizeX:2,sizeY:2}))),o=r.length
if(0===e.length)return r.map(e=>({...e,src:"",alt:""}))
e.length>o,0
const i=e.map(e=>"string"==typeof e?{src:e,alt:""}:{src:e.src||"",alt:e.alt||""}),c=Array.from({length:o},(e,t)=>i[t%i.length])
for(let l=1;l<c.length;l++)if(c[l].src===c[l-1].src)for(let e=l+1;e<c.length;e++)if(c[e].src!==c[l].src){const t=c[l]
c[l]=c[e],c[e]=t
break}return r.map((e,t)=>({...e,src:c[t].src,alt:c[t].alt}))}(e,R),[e,R]),re=(e,t)=>{const a=E.current
a&&(a.style.transform=`translateZ(calc(var(--radius) * -1)) rotateX(${e}deg) rotateY(${t}deg)`)},oe=a.useRef(null)
a.useEffect(()=>{const e=I.current
if(!e)return
const t=new ResizeObserver(t=>{const a=t[0].contentRect,n=Math.max(1,a.width),s=Math.max(1,a.height),r=Math.min(n,s),o=Math.max(n,s),i=n/s
let c
switch(M){case"min":c=r
break
case"max":c=o
break
case"width":c=n
break
case"height":c=s
break
default:c=i>=1.3?n:r}let l=c*w
const d=1.35*s
l=Math.min(l,d),l=v(l,N,k),oe.current=Math.round(l)
const m=Math.max(8,Math.round(r*A))
e.style.setProperty("--radius",`${oe.current}px`),e.style.setProperty("--viewer-pad",`${m}px`),e.style.setProperty("--overlay-blur-color",F),e.style.setProperty("--tile-radius",j),e.style.setProperty("--enlarge-radius",C),e.style.setProperty("--image-filter",D?"grayscale(1)":"none"),re(L.current.x,L.current.y)
const u=O.current?.querySelector(".enlarge")
if(u&&H.current&&S.current){const e=H.current.getBoundingClientRect(),t=S.current.getBoundingClientRect()
if(Y&&B){const a=document.createElement("div")
a.style.cssText=`position: absolute; width: ${Y}; height: ${B}; visibility: hidden;`,document.body.appendChild(a)
const n=a.getBoundingClientRect()
document.body.removeChild(a)
const s=e.left-t.left+(e.width-n.width)/2,r=e.top-t.top+(e.height-n.height)/2
u.style.left=`${s}px`,u.style.top=`${r}px`}else u.style.left=e.left-t.left+"px",u.style.top=e.top-t.top+"px",u.style.width=`${e.width}px`,u.style.height=`${e.height}px`}})
return t.observe(e),()=>t.disconnect()},[w,M,N,k,A,F,D,j,C,Y,B]),a.useEffect(()=>{re(L.current.x,L.current.y)},[])
const ie=a.useCallback(()=>{J.current&&(cancelAnimationFrame(J.current),J.current=null)},[]),ce=a.useCallback((e,t)=>{let a=80*v(e,-1.4,1.4),n=80*v(t,-1.4,1.4),s=0
const r=v(X??.6,0,1),o=.94+.055*r,i=.015-.01*r,c=Math.round(90+270*r),l=()=>{if(a*=o,n*=o,Math.abs(a)<i&&Math.abs(n)<i)return J.current=null,void 0
if(++s>c)return J.current=null,void 0
const e=v(L.current.x-n/200,-z,z),t=$(L.current.y+a/200)
L.current={x:e,y:t},re(e,t),J.current=requestAnimationFrame(l)}
ie(),J.current=requestAnimationFrame(l)},[X,z,ie])
var le,de
le={onDragStart:({event:e})=>{if(T.current)return
ie()
const t=e
Z.current=!0,G.current=!1,U.current={...L.current},W.current={x:t.clientX,y:t.clientY}},onDrag:({event:e,last:t,velocity:a=[0,0],direction:n=[0,0],movement:s})=>{if(T.current||!Z.current||!W.current)return
const r=e,o=r.clientX-W.current.x,i=r.clientY-W.current.y
G.current||o*o+i*i>16&&(G.current=!0)
const c=v(U.current.x-i/q,-z,z),l=$(U.current.y+o/q)
if(L.current.x===c&&L.current.y===l||(L.current={x:c,y:l},re(c,l)),t){Z.current=!1
let[e,t]=a
const[r,o]=n
let i=e*r,c=t*o
if(Math.abs(i)<.001&&Math.abs(c)<.001&&Array.isArray(s)){const[e,t]=s
i=v(e/q*.02,-1.2,1.2),c=v(t/q*.02,-1.2,1.2)}(Math.abs(i)>.005||Math.abs(c)>.005)&&ce(i,c),G.current&&(ee.current=performance.now()),G.current=!1}}},de={target:S,eventOptions:{passive:!0}},([o,i,c,l,d,m].forEach(s),function(e,a){const{handlers:n,nativeHandlers:s,config:o}=r(e,a||{})
return function(e,a={},n,s){const r=t.useMemo(()=>new u(e),[])
if(r.applyHandlers(e,s),r.applyConfig(a,n),t.useEffect(r.effect.bind(r)),t.useEffect(()=>r.clean.bind(r),[]),void 0===a.target)return r.bind.bind(r)}(n,o,void 0,s)})(le,de||{}),a.useEffect(()=>{const e=P.current
if(!e)return
const t=()=>{if(performance.now()-Q.current<250)return
const e=T.current
if(!e)return
const t=e.parentElement,a=O.current?.querySelector(".enlarge")
if(!a)return
const n=t.querySelector(".item__image--reference"),s=V.current
if(!s)return a.remove(),n&&n.remove(),t.style.setProperty("--rot-y-delta","0deg"),t.style.setProperty("--rot-x-delta","0deg"),e.style.visibility="",e.style.zIndex=0,T.current=null,I.current?.removeAttribute("data-enlarging"),K.current=!1,ne(),void 0
const r=a.getBoundingClientRect(),o=I.current.getBoundingClientRect(),i=s.left-o.left,c=s.top-o.top,l=s.width,d=s.height,m=r.left-o.left,u=r.top-o.top,p=r.width,g=r.height,f=document.createElement("div")
f.className="enlarge-closing",f.style.cssText=`position:absolute;left:${m}px;top:${u}px;width:${p}px;height:${g}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${_}ms ease-out;pointer-events:none;margin:0;transform:none;`
const h=a.querySelector("img")
if(h){const e=h.cloneNode()
e.style.cssText="width:100%;height:100%;object-fit:cover;",f.appendChild(e)}a.remove(),I.current.appendChild(f),f.getBoundingClientRect(),requestAnimationFrame(()=>{f.style.left=i+"px",f.style.top=c+"px",f.style.width=l+"px",f.style.height=d+"px",f.style.opacity="0"}),f.addEventListener("transitionend",()=>{f.remove(),V.current=null,n&&n.remove(),t.style.transition="none",e.style.transition="none",t.style.setProperty("--rot-y-delta","0deg"),t.style.setProperty("--rot-x-delta","0deg"),requestAnimationFrame(()=>{e.style.visibility="",e.style.opacity="0",e.style.zIndex=0,T.current=null,I.current?.removeAttribute("data-enlarging"),requestAnimationFrame(()=>{t.style.transition="",e.style.transition="opacity 300ms ease-out",requestAnimationFrame(()=>{e.style.opacity="1",setTimeout(()=>{e.style.transition="",e.style.opacity="",K.current=!1,Z.current||"true"===I.current?.getAttribute("data-enlarging")||document.body.classList.remove("dg-scroll-lock")},300)})})})},{once:!0})}
e.addEventListener("click",t)
const a=e=>{"Escape"===e.key&&t()}
return window.addEventListener("keydown",a),()=>{e.removeEventListener("click",t),window.removeEventListener("keydown",a)}},[_,ne])
const me=a.useCallback(e=>{if(K.current)return
K.current=!0,Q.current=performance.now(),ae()
const t=e.parentElement
T.current=e,e.setAttribute("data-focused","true")
const a=function(e,t,a,n,s){const r=360/s/2
return{rotateX:r*(t-(n-1)/2),rotateY:r*(e+(a-1)/2)}}(b(t,"offsetX",0),b(t,"offsetY",0),b(t,"sizeX",2),b(t,"sizeY",2),R)
let n=-(y(a.rotateY)+y(L.current.y))%360
n<-180&&(n+=360)
const s=-a.rotateX-L.current.x
t.style.setProperty("--rot-y-delta",`${n}deg`),t.style.setProperty("--rot-x-delta",`${s}deg`)
const r=document.createElement("div")
r.className="item__image item__image--reference",r.style.opacity="0",r.style.transform=`rotateX(${-a.rotateX}deg) rotateY(${-a.rotateY}deg)`,t.appendChild(r)
const o=r.getBoundingClientRect(),i=S.current.getBoundingClientRect(),c=H.current.getBoundingClientRect()
V.current={left:o.left,top:o.top,width:o.width,height:o.height},e.style.visibility="hidden",e.style.zIndex=0
const l=document.createElement("div")
l.className="enlarge",l.style.position="absolute",l.style.left=c.left-i.left+"px",l.style.top=c.top-i.top+"px",l.style.width=c.width+"px",l.style.height=c.height+"px",l.style.opacity="0",l.style.zIndex="30",l.style.willChange="transform, opacity",l.style.transformOrigin="top left",l.style.transition=`transform ${_}ms ease, opacity ${_}ms ease`
const d=t.dataset.src||e.querySelector("img")?.src||"",m=document.createElement("img")
m.src=d,l.appendChild(m),O.current.appendChild(l)
const u=o.left-c.left,p=o.top-c.top,g=o.width/c.width,f=o.height/c.height
if(l.style.transform=`translate(${u}px, ${p}px) scale(${g}, ${f})`,requestAnimationFrame(()=>{l.style.opacity="1",l.style.transform="translate(0px, 0px) scale(1,1)",I.current?.setAttribute("data-enlarging","true")}),Y||B){const e=t=>{if("transform"!==t.propertyName)return
l.removeEventListener("transitionend",e)
const a=l.style.transition
l.style.transition="none"
const n=Y||`${c.width}px`,s=B||`${c.height}px`
l.style.width=n,l.style.height=s
const r=l.getBoundingClientRect()
l.style.width=c.width+"px",l.style.height=c.height+"px",l.style.transition=`left ${_}ms ease, top ${_}ms ease, width ${_}ms ease, height ${_}ms ease`
const o=c.left-i.left+(c.width-r.width)/2,d=c.top-i.top+(c.height-r.height)/2
requestAnimationFrame(()=>{l.style.left=`${o}px`,l.style.top=`${d}px`,l.style.width=n,l.style.height=s})
const m=()=>{l.removeEventListener("transitionend",m),l.style.transition=a}
l.addEventListener("transitionend",m,{once:!0})}
l.addEventListener("transitionend",e)}},[_,ae,B,Y,R]),ue=a.useCallback(e=>{Z.current||performance.now()-ee.current<80||K.current||me(e.currentTarget)},[me]),pe=a.useCallback(e=>{"touch"===e.pointerType&&(Z.current||performance.now()-ee.current<80||K.current||me(e.currentTarget))},[me]),ge=a.useCallback(e=>{Z.current||performance.now()-ee.current<80||K.current||me(e.currentTarget)},[me])
return a.useEffect(()=>()=>{document.body.classList.remove("dg-scroll-lock")},[]),n.jsx("div",{ref:I,className:"sphere-root",style:{"--segments-x":R,"--segments-y":R,"--overlay-blur-color":F,"--tile-radius":j,"--enlarge-radius":C,"--image-filter":D?"grayscale(1)":"none"},children:n.jsxs("main",{ref:S,className:"sphere-main",children:[n.jsx("div",{className:"stage",children:n.jsx("div",{ref:E,className:"sphere",children:se.map((e,t)=>n.jsx("div",{className:"item","data-src":e.src,"data-offset-x":e.x,"data-offset-y":e.y,"data-size-x":e.sizeX,"data-size-y":e.sizeY,style:{"--offset-x":e.x,"--offset-y":e.y,"--item-size-x":e.sizeX,"--item-size-y":e.sizeY},children:n.jsx("div",{className:"item__image",role:"button",tabIndex:0,"aria-label":e.alt||"Open image",onClick:ue,onPointerUp:pe,onTouchEnd:ge,children:n.jsx("img",{src:e.src,draggable:!1,alt:e.alt})})},`${e.x},${e.y},${t}`))})}),n.jsx("div",{className:"overlay"}),n.jsx("div",{className:"overlay overlay--blur"}),n.jsx("div",{className:"edge-fade edge-fade--top"}),n.jsx("div",{className:"edge-fade edge-fade--bottom"}),n.jsxs("div",{className:"viewer",ref:O,children:[n.jsx("div",{ref:P,className:"scrim"}),n.jsx("div",{ref:H,className:"frame"})]})]})})}import{R as t,r as a,j as n}from"./index-lswKrJ8S.js"
import{a as s,p as r,d as o,b as i,c,w as l,m as d,h as m,C as u}from"./vendor-Dkk3NQ4w.js"
const p=[{src:"https://picsum.photos/id/1015/600/900",alt:"Event Highlights"},{src:"https://picsum.photos/id/1011/600/750",alt:"Live Performances"},{src:"https://picsum.photos/id/1020/600/800",alt:"Venue Atmosphere"},{src:"https://picsum.photos/id/1025/600/700",alt:"Behind the Scenes"},{src:"https://picsum.photos/id/1035/600/650",alt:"Community"},{src:"https://picsum.photos/id/1040/600/850",alt:"Production"},{src:"https://picsum.photos/id/1050/600/600",alt:"Special Moments"}],g=5,f=20,h=300,x=34,v=(e,t,a)=>Math.min(Math.max(e,t),a),y=e=>(e%360+360)%360,$=e=>((e+180)%360+360)%360-180,b=(e,t,a)=>{const n=e.dataset[t]??e.getAttribute(`data-${t}`),s=null==n?NaN:parseFloat(n)
return Number.isFinite(s)?s:a}
export{e as default}
