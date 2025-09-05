function e(e){return function(t){t instanceof RegExp&&(t.lastIndex=0)
for(var n=arguments.length,i=new Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o]
return m(e,t,i)}}function t(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:x
a&&a(e,null)
let i=t.length
for(;i--;){let o=t[i]
if("string"==typeof o){const e=n(o)
e!==o&&(l(t)||(t[i]=e),o=e)}e[o]=!0}return e}function n(e){for(let t=0;t<e.length;t++)E(e,t)||(e[t]=null)
return e}function i(e){const t=p(null)
for(const[o,a]of r(e))E(e,o)&&(Array.isArray(a)?t[o]=n(a):a&&"object"==typeof a&&a.constructor===Object?t[o]=i(a):t[o]=a)
return t}function o(t,n){for(;null!==t;){const i=c(t,n)
if(i){if(i.get)return e(i.get)
if("function"==typeof i.value)return e(i.value)}t=s(t)}return function(){return null}}const{entries:r,setPrototypeOf:a,isFrozen:l,getPrototypeOf:s,getOwnPropertyDescriptor:c}=Object
let{freeze:u,seal:f,create:p}=Object,{apply:m,construct:d}="undefined"!=typeof Reflect&&Reflect
u||(u=function(e){return e}),f||(f=function(e){return e}),m||(m=function(e,t,n){return e.apply(t,n)}),d||(d=function(e,t){return new e(...t)})
const g=e(Array.prototype.forEach),h=e(Array.prototype.lastIndexOf),y=e(Array.prototype.pop),b=e(Array.prototype.push),w=e(Array.prototype.splice),x=e(String.prototype.toLowerCase),v=e(String.prototype.toString),T=e(String.prototype.match),S=e(String.prototype.replace),k=e(String.prototype.indexOf),A=e(String.prototype.trim),E=e(Object.prototype.hasOwnProperty),R=e(RegExp.prototype.test),_=(z=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return d(z,t)})
var z
const D=u(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),O=u(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),L=u(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),M=u(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),I=u(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),F=u(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),P=u(["#text"]),N=u(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),C=u(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),U=u(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),j=u(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),B=f(/\{\{[\w\W]*|[\w\W]*\}\}/gm),W=f(/<%[\w\W]*|[\w\W]*%>/gm),H=f(/\$\{[\w\W]*/gm),q=f(/^data-[\-\w.\u00B7-\uFFFF]+$/),Y=f(/^aria-[\-\w]+$/),X=f(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$=f(/^(?:\w+script|data):/i),G=f(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),K=f(/^html$/i),V=f(/^[a-z][.\w]*(-[.\w]+)+$/i)
var J=Object.freeze({__proto__:null,ARIA_ATTR:Y,ATTR_WHITESPACE:G,CUSTOM_ELEMENT:V,DATA_ATTR:q,DOCTYPE_NAME:K,ERB_EXPR:W,IS_ALLOWED_URI:X,IS_SCRIPT_OR_DATA:$,MUSTACHE_EXPR:B,TMPLIT_EXPR:H}),Q=function e(){function n(e,t,n){g(e,e=>{e.call(l,t,n,st)})}let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"undefined"==typeof window?null:window
const l=t=>e(t)
if(l.version="3.2.6",l.removed=[],!a||!a.document||9!==a.document.nodeType||!a.Element)return l.isSupported=!1,l
let{document:s}=a
const c=s,f=c.currentScript,{DocumentFragment:m,HTMLTemplateElement:d,Node:z,Element:B,NodeFilter:W,NamedNodeMap:H=a.NamedNodeMap||a.MozNamedAttrMap,HTMLFormElement:q,DOMParser:Y,trustedTypes:$}=a,G=B.prototype,V=o(G,"cloneNode"),Q=o(G,"remove"),Z=o(G,"nextSibling"),ee=o(G,"childNodes"),te=o(G,"parentNode")
if("function"==typeof d){const e=s.createElement("template")
e.content&&e.content.ownerDocument&&(s=e.content.ownerDocument)}let ne,ie=""
const{implementation:oe,createNodeIterator:re,createDocumentFragment:ae,getElementsByTagName:le}=s,{importNode:se}=c
let ce={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}
l.isSupported="function"==typeof r&&"function"==typeof te&&oe&&void 0!==oe.createHTMLDocument
const{MUSTACHE_EXPR:ue,ERB_EXPR:fe,TMPLIT_EXPR:pe,DATA_ATTR:me,ARIA_ATTR:de,IS_SCRIPT_OR_DATA:ge,ATTR_WHITESPACE:he,CUSTOM_ELEMENT:ye}=J
let{IS_ALLOWED_URI:be}=J,we=null
const xe=t({},[...D,...O,...L,...I,...P])
let ve=null
const Te=t({},[...N,...C,...U,...j])
let Se=Object.seal(p(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,Ae=null,Ee=!0,Re=!0,_e=!1,ze=!0,De=!1,Oe=!0,Le=!1,Me=!1,Ie=!1,Fe=!1,Pe=!1,Ne=!1,Ce=!0,Ue=!1,je=!0,Be=!1,We={},He=null
const qe=t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"])
let Ye=null
const Xe=t({},["audio","video","img","source","image","track"])
let $e=null
const Ge=t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ke="http://www.w3.org/1998/Math/MathML",Ve="http://www.w3.org/2000/svg",Je="http://www.w3.org/1999/xhtml"
let Qe=Je,Ze=!1,et=null
const tt=t({},[Ke,Ve,Je],v)
let nt=t({},["mi","mo","mn","ms","mtext"]),it=t({},["annotation-xml"])
const ot=t({},["title","style","font","a","script"])
let rt=null
const at=["application/xhtml+xml","text/html"]
let lt=null,st=null
const ct=s.createElement("form"),ut=function(e){return e instanceof RegExp||e instanceof Function},ft=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
if(!st||st!==e){if(e&&"object"==typeof e||(e={}),e=i(e),rt=-1===at.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,lt="application/xhtml+xml"===rt?v:x,we=E(e,"ALLOWED_TAGS")?t({},e.ALLOWED_TAGS,lt):xe,ve=E(e,"ALLOWED_ATTR")?t({},e.ALLOWED_ATTR,lt):Te,et=E(e,"ALLOWED_NAMESPACES")?t({},e.ALLOWED_NAMESPACES,v):tt,$e=E(e,"ADD_URI_SAFE_ATTR")?t(i(Ge),e.ADD_URI_SAFE_ATTR,lt):Ge,Ye=E(e,"ADD_DATA_URI_TAGS")?t(i(Xe),e.ADD_DATA_URI_TAGS,lt):Xe,He=E(e,"FORBID_CONTENTS")?t({},e.FORBID_CONTENTS,lt):qe,ke=E(e,"FORBID_TAGS")?t({},e.FORBID_TAGS,lt):i({}),Ae=E(e,"FORBID_ATTR")?t({},e.FORBID_ATTR,lt):i({}),We=!!E(e,"USE_PROFILES")&&e.USE_PROFILES,Ee=!1!==e.ALLOW_ARIA_ATTR,Re=!1!==e.ALLOW_DATA_ATTR,_e=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ze=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,De=e.SAFE_FOR_TEMPLATES||!1,Oe=!1!==e.SAFE_FOR_XML,Le=e.WHOLE_DOCUMENT||!1,Fe=e.RETURN_DOM||!1,Pe=e.RETURN_DOM_FRAGMENT||!1,Ne=e.RETURN_TRUSTED_TYPE||!1,Ie=e.FORCE_BODY||!1,Ce=!1!==e.SANITIZE_DOM,Ue=e.SANITIZE_NAMED_PROPS||!1,je=!1!==e.KEEP_CONTENT,Be=e.IN_PLACE||!1,be=e.ALLOWED_URI_REGEXP||X,Qe=e.NAMESPACE||Je,nt=e.MATHML_TEXT_INTEGRATION_POINTS||nt,it=e.HTML_INTEGRATION_POINTS||it,Se=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Se.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&ut(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Se.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Se.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(Re=!1),Pe&&(Fe=!0),We&&(we=t({},P),ve=[],!0===We.html&&(t(we,D),t(ve,N)),!0===We.svg&&(t(we,O),t(ve,C),t(ve,j)),!0===We.svgFilters&&(t(we,L),t(ve,C),t(ve,j)),!0===We.mathMl&&(t(we,I),t(ve,U),t(ve,j))),e.ADD_TAGS&&(we===xe&&(we=i(we)),t(we,e.ADD_TAGS,lt)),e.ADD_ATTR&&(ve===Te&&(ve=i(ve)),t(ve,e.ADD_ATTR,lt)),e.ADD_URI_SAFE_ATTR&&t($e,e.ADD_URI_SAFE_ATTR,lt),e.FORBID_CONTENTS&&(He===qe&&(He=i(He)),t(He,e.FORBID_CONTENTS,lt)),je&&(we["#text"]=!0),Le&&t(we,["html","head","body"]),we.table&&(t(we,["tbody"]),delete ke.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.')
if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.')
ne=e.TRUSTED_TYPES_POLICY,ie=ne.createHTML("")}else void 0===ne&&(ne=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null
let n=null
const i="data-tt-policy-suffix"
t&&t.hasAttribute(i)&&(n=t.getAttribute(i))
const o="dompurify"+(n?"#"+n:"")
try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(r){return void 0,null}}($,f)),null!==ne&&"string"==typeof ie&&(ie=ne.createHTML(""))
u&&u(e),st=e}},pt=t({},[...O,...L,...M]),mt=t({},[...I,...F]),dt=function(e){b(l.removed,{element:e})
try{te(e).removeChild(e)}catch(t){Q(e)}},gt=function(e,t){try{b(l.removed,{attribute:t.getAttributeNode(e),from:t})}catch(n){b(l.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e)if(Fe||Pe)try{dt(t)}catch(n){}else try{t.setAttribute(e,"")}catch(n){}},ht=function(e){let t=null,n=null
if(Ie)e="<remove></remove>"+e
else{const t=T(e,/^[\r\n\t ]+/)
n=t&&t[0]}"application/xhtml+xml"===rt&&Qe===Je&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>")
const i=ne?ne.createHTML(e):e
if(Qe===Je)try{t=(new Y).parseFromString(i,rt)}catch(r){}if(!t||!t.documentElement){t=oe.createDocument(Qe,"template",null)
try{t.documentElement.innerHTML=Ze?ie:i}catch(r){}}const o=t.body||t.documentElement
return e&&n&&o.insertBefore(s.createTextNode(n),o.childNodes[0]||null),Qe===Je?le.call(t,Le?"html":"body")[0]:Le?t.documentElement:o},yt=function(e){return re.call(e.ownerDocument||e,e,W.SHOW_ELEMENT|W.SHOW_COMMENT|W.SHOW_TEXT|W.SHOW_PROCESSING_INSTRUCTION|W.SHOW_CDATA_SECTION,null)},bt=function(e){return e instanceof q&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof H)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},wt=function(e){return"function"==typeof z&&e instanceof z},xt=function(e){let t=null
if(n(ce.beforeSanitizeElements,e,null),bt(e))return dt(e),!0
const i=lt(e.nodeName)
if(n(ce.uponSanitizeElement,e,{tagName:i,allowedTags:we}),Oe&&e.hasChildNodes()&&!wt(e.firstElementChild)&&R(/<[/\w!]/g,e.innerHTML)&&R(/<[/\w!]/g,e.textContent))return dt(e),!0
if(7===e.nodeType)return dt(e),!0
if(Oe&&8===e.nodeType&&R(/<[/\w]/g,e.data))return dt(e),!0
if(!we[i]||ke[i]){if(!ke[i]&&Tt(i)){if(Se.tagNameCheck instanceof RegExp&&R(Se.tagNameCheck,i))return!1
if(Se.tagNameCheck instanceof Function&&Se.tagNameCheck(i))return!1}if(je&&!He[i]){const t=te(e)||e.parentNode,n=ee(e)||e.childNodes
if(n&&t)for(let i=n.length-1;i>=0;--i){const o=V(n[i],!0)
o.t=(e.t||0)+1,t.insertBefore(o,Z(e))}}return dt(e),!0}return e instanceof B&&!function(e){let t=te(e)
t&&t.tagName||(t={namespaceURI:Qe,tagName:"template"})
const n=x(e.tagName),i=x(t.tagName)
return!!et[e.namespaceURI]&&(e.namespaceURI===Ve?t.namespaceURI===Je?"svg"===n:t.namespaceURI===Ke?"svg"===n&&("annotation-xml"===i||nt[i]):Boolean(pt[n]):e.namespaceURI===Ke?t.namespaceURI===Je?"math"===n:t.namespaceURI===Ve?"math"===n&&it[i]:Boolean(mt[n]):e.namespaceURI===Je?!(t.namespaceURI===Ve&&!it[i])&&!(t.namespaceURI===Ke&&!nt[i])&&!mt[n]&&(ot[n]||!pt[n]):!("application/xhtml+xml"!==rt||!et[e.namespaceURI]))}(e)?(dt(e),!0):"noscript"!==i&&"noembed"!==i&&"noframes"!==i||!R(/<\/no(script|embed|frames)/i,e.innerHTML)?(De&&3===e.nodeType&&(t=e.textContent,g([ue,fe,pe],e=>{t=S(t,e," ")}),e.textContent!==t&&(b(l.removed,{element:e.cloneNode()}),e.textContent=t)),n(ce.afterSanitizeElements,e,null),!1):(dt(e),!0)},vt=function(e,t,n){if(Ce&&("id"===t||"name"===t)&&(n in s||n in ct))return!1
if(Re&&!Ae[t]&&R(me,t));else if(Ee&&R(de,t));else if(!ve[t]||Ae[t]){if(!(Tt(e)&&(Se.tagNameCheck instanceof RegExp&&R(Se.tagNameCheck,e)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(e))&&(Se.attributeNameCheck instanceof RegExp&&R(Se.attributeNameCheck,t)||Se.attributeNameCheck instanceof Function&&Se.attributeNameCheck(t))||"is"===t&&Se.allowCustomizedBuiltInElements&&(Se.tagNameCheck instanceof RegExp&&R(Se.tagNameCheck,n)||Se.tagNameCheck instanceof Function&&Se.tagNameCheck(n))))return!1}else if($e[t]);else if(R(be,S(n,he,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==k(n,"data:")||!Ye[e])if(_e&&!R(ge,S(n,he,"")));else if(n)return!1
return!0},Tt=function(e){return"annotation-xml"!==e&&T(e,ye)},St=function(e){n(ce.beforeSanitizeAttributes,e,null)
const{attributes:t}=e
if(!t||bt(e))return
const i={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0}
let o=t.length
for(;o--;){const a=t[o],{name:s,namespaceURI:c,value:u}=a,f=lt(s),p=u
let m="value"===s?p:A(p)
if(i.attrName=f,i.attrValue=m,i.keepAttr=!0,i.forceKeepAttr=void 0,n(ce.uponSanitizeAttribute,e,i),m=i.attrValue,!Ue||"id"!==f&&"name"!==f||(gt(s,e),m="user-content-"+m),Oe&&R(/((--!?|])>)|<\/(style|title)/i,m)){gt(s,e)
continue}if(i.forceKeepAttr)continue
if(!i.keepAttr){gt(s,e)
continue}if(!ze&&R(/\/>/i,m)){gt(s,e)
continue}De&&g([ue,fe,pe],e=>{m=S(m,e," ")})
const d=lt(e.nodeName)
if(vt(d,f,m)){if(ne&&"object"==typeof $&&"function"==typeof $.getAttributeType)if(c);else switch($.getAttributeType(d,f)){case"TrustedHTML":m=ne.createHTML(m)
break
case"TrustedScriptURL":m=ne.createScriptURL(m)}if(m!==p)try{c?e.setAttributeNS(c,s,m):e.setAttribute(s,m),bt(e)?dt(e):y(l.removed)}catch(r){gt(s,e)}}else gt(s,e)}n(ce.afterSanitizeAttributes,e,null)},kt=function e(t){let i=null
const o=yt(t)
for(n(ce.beforeSanitizeShadowDOM,t,null);i=o.nextNode();)n(ce.uponSanitizeShadowNode,i,null),xt(i),St(i),i.content instanceof m&&e(i.content)
n(ce.afterSanitizeShadowDOM,t,null)}
return l.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,i=null,o=null,r=null
if(Ze=!e,Ze&&(e="\x3c!--\x3e"),"string"!=typeof e&&!wt(e)){if("function"!=typeof e.toString)throw _("toString is not a function")
if("string"!=typeof(e=e.toString()))throw _("dirty is not a string, aborting")}if(!l.isSupported)return e
if(Me||ft(t),l.removed=[],"string"==typeof e&&(Be=!1),Be){if(e.nodeName){const t=lt(e.nodeName)
if(!we[t]||ke[t])throw _("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof z)n=ht("\x3c!----\x3e"),i=n.ownerDocument.importNode(e,!0),1===i.nodeType&&"BODY"===i.nodeName||"HTML"===i.nodeName?n=i:n.appendChild(i)
else{if(!Fe&&!De&&!Le&&-1===e.indexOf("<"))return ne&&Ne?ne.createHTML(e):e
if(n=ht(e),!n)return Fe?null:Ne?ie:""}n&&Ie&&dt(n.firstChild)
const a=yt(Be?e:n)
for(;o=a.nextNode();)xt(o),St(o),o.content instanceof m&&kt(o.content)
if(Be)return e
if(Fe){if(Pe)for(r=ae.call(n.ownerDocument);n.firstChild;)r.appendChild(n.firstChild)
else r=n
return(ve.shadowroot||ve.shadowrootmode)&&(r=se.call(c,r,!0)),r}let s=Le?n.outerHTML:n.innerHTML
return Le&&we["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&R(K,n.ownerDocument.doctype.name)&&(s="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+s),De&&g([ue,fe,pe],e=>{s=S(s,e," ")}),ne&&Ne?ne.createHTML(s):s},l.setConfig=function(){ft(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),Me=!0},l.clearConfig=function(){st=null,Me=!1},l.isValidAttribute=function(e,t,n){st||ft({})
const i=lt(e),o=lt(t)
return vt(i,o,n)},l.addHook=function(e,t){"function"==typeof t&&b(ce[e],t)},l.removeHook=function(e,t){if(void 0!==t){const n=h(ce[e],t)
return-1===n?void 0:w(ce[e],n,1)[0]}return y(ce[e])},l.removeHooks=function(e){ce[e]=[]},l.removeAllHooks=function(){ce={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},l}()
export{Q as default}
