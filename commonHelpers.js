import{S as g,a as h,i}from"./assets/vendor-bad0427b.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y={}.API_KEY,p=document.querySelector("#search-form"),u=document.querySelector("#gallery"),d=document.querySelector("#loader"),l=document.querySelector("#load-more-button");let f="",s=1;const L=new g(".gallery a");p.addEventListener("submit",async t=>{t.preventDefault(),u.innerHTML="",f=t.currentTarget.elements.query.value,s=1,await m()});l.addEventListener("click",m);async function m(){d.classList.remove("hidden"),l.classList.add("hidden");try{const t=await h.get(`https://pixabay.com/api/?key=${y}&q=${f}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${s}`);if(t.data.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const a=t.data.hits.map(o=>`<a href="${o.largeImageURL}">
                <img src="${o.webformatURL}" alt="${o.tags}" data-large="${o.largeImageURL}">
              </a>`);u.insertAdjacentHTML("beforeend",a.join("")),L.refresh(),t.data.totalHits<=s*40?i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}):l.classList.remove("hidden"),s+=1}catch(t){i.error({title:"Error",message:`An error occurred: ${t.message}`})}finally{d.classList.add("hidden")}}
//# sourceMappingURL=commonHelpers.js.map
