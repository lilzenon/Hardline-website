function t(t={}){return s?(t.debug,0):(s=new o(t),window.analyticsBeacon=s,window.getAnalyticsTracker=()=>s,!1!==t.enableRealTime&&setTimeout(()=>{s?.sendPageView()},100),t.debug),s}function e(){return s}function i(t){s&&s.sendPageView()}function n(t){s&&s.sendEvent(t)}class o{constructor(t={}){this.hasTrackedPageView=!1,this.sessionId=null
const e=window.location.hostname,i="localhost"===e
let n
n=t.apiEndpoint?t.apiEndpoint:i||window.location.port||window.location.hostname.includes("localhost")||"3001"===window.location.port||window.location.href.includes("localhost")?"/api":"b2b.click"===e||"www.b2b.click"===e||"bounce2bounce.com"===e||"www.bounce2bounce.com"===e?"https://admin.b2b.click/api":"/api",this.config={endpoint:`${n}/analytics/track`,enabled:!1===t.enableGDPR||this.shouldTrack(),debug:t.debug||!1},this.sessionId=this.getSessionId(),this.config.debug}shouldTrack(){if("1"===navigator.doNotTrack||"1"===window.doNotTrack)return!1
const t=navigator.userAgent.toLowerCase()
return!["bot","crawler","spider","scraper","fetcher","googlebot","bingbot","slurp","duckduckbot","facebookexternalhit","twitterbot","linkedinbot","whatsapp","telegrambot","headless","phantom","selenium","puppeteer","playwright"].some(e=>t.includes(e))}getSessionId(){const t=localStorage.getItem("analytics_session_id"),e=localStorage.getItem("analytics_session_expiry"),i=Date.now()
if(t&&e&&i<parseInt(e))return t
const n="sess_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)
localStorage.setItem("analytics_session_id",n)
const o=i+18e5
return localStorage.setItem("analytics_session_expiry",o.toString()),n}getPageInfo(){const t=new URLSearchParams(window.location.search)
return{ts:Date.now(),page_url:window.location.href,page_title:document.title||"",referrer:document.referrer||void 0,utm_source:t.get("utm_source")||void 0,utm_medium:t.get("utm_medium")||void 0,utm_campaign:t.get("utm_campaign")||void 0,viewport_width:window.innerWidth||0,viewport_height:window.innerHeight||0,screen_width:screen.width||0,screen_height:screen.height||0,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||void 0,language:navigator.language||void 0}}async sendData(t){if(!this.config.enabled)return!1
try{const i=JSON.stringify(t)
if(navigator.sendBeacon){const t=new Blob([i],{type:"application/json"})
if(navigator.sendBeacon(this.config.endpoint,t))return this.config.debug,0,!0}const n=await fetch(this.config.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:i,keepalive:!0,mode:"cors"})
if(n.ok||204===n.status)return this.config.debug,0,!0
void 0
try{await n.text()}catch(e){void 0}return!1}catch(i){return"localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname?(this.config.debug,0):void 0,!1}}async sendPageView(){if(this.hasTrackedPageView)return this.config.debug,0,!1
const t=this.getPageInfo(),e={sessionId:this.getSessionId(),ts:Date.now(),page_url:t.page_url||window.location.href,page_title:t.page_title||document.title||"Homepage",referrer:t.referrer,utm_source:t.utm_source,utm_medium:t.utm_medium,utm_campaign:t.utm_campaign,utm_content:t.utm_content,utm_term:t.utm_term,viewport_width:t.viewport_width,viewport_height:t.viewport_height,screen_width:t.screen_width,screen_height:t.screen_height,timezone:t.timezone,language:t.language},i=await this.sendData(e)
return i&&(this.hasTrackedPageView=!0,this.config.debug),i}async sendEvent(t){if(!this.config.enabled)return!1
const e={sessionId:this.getSessionId(),ts:Date.now(),event_type:t.event||"custom_event",event:t.event||"custom_event",properties:t.properties||{},...t}
return this.config.debug,0,await this.sendData(e)}trackLinkClick(t,e){if(this.config.enabled)try{const i=new URL(t,window.location.href),n=window.location.hostname
i.hostname!==n&&this.sendEvent({page_url:`${window.location.href}#link-click`,page_title:`Link Click: ${e||t}`,referrer:window.location.href})}catch(i){this.config.debug,0}}getConfig(){return{...this.config}}isEnabled(){return this.config.enabled}grantGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","granted"),this.sendPageView()}revokeGDPRConsent(){localStorage.setItem("analytics_gdpr_consent","denied"),this.clearSessionData()}clearSessionData(){localStorage.removeItem("analytics_session_id"),localStorage.removeItem("analytics_session_start"),this.sessionId=null}}let s=null
export{o as AnalyticsBeacon,e as getAnalyticsInstance,t as initializeAnalytics,n as trackEvent,i as trackPageView}
