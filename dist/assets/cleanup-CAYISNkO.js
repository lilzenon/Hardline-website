function o(){try{for(let t=localStorage.length-1;t>=0;t--){const c=localStorage.key(t)
if(c)try{const o=localStorage.getItem(c)
o&&o.includes("blob:")&&(void 0,localStorage.removeItem(c))}catch(o){void 0}}for(let t=sessionStorage.length-1;t>=0;t--){const c=sessionStorage.key(t)
if(c)try{const o=sessionStorage.getItem(c)
o&&o.includes("blob:")&&(void 0,sessionStorage.removeItem(c))}catch(o){void 0}}void 0}catch(o){void 0}}function t(){o(),window.addEventListener("error",o=>{if(o.target&&"src"in o.target){const t=o.target.src
t&&t.startsWith("blob:")&&(void 0,o.preventDefault())}},!0)}export{o as cleanupOldBlobUrls,t as initializeCleanup}
