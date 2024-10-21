(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const u=document.getElementById("search-form"),p=document.getElementById("search-input"),h=document.querySelector("#today"),d=document.querySelector("#forecast"),a=document.getElementById("history"),y=document.getElementById("search-title"),l=document.getElementById("weather-img"),E=document.getElementById("temp"),g=document.getElementById("wind"),w=document.getElementById("humidity"),b=async t=>{const n=await(await fetch("/api/weather/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cityName:t})})).json();S(n[0]),B(n[1])},H=async()=>await fetch("/api/weather/history",{method:"GET",headers:{"Content-Type":"application/json"}}),v=async t=>{await fetch(`/api/weather/history/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json"}})},S=t=>{const{city:e,date:n,icon:r,iconDescription:o,tempF:c,windSpeed:s,humidity:i}=t;y.textContent=`${e} (${n})`,l.setAttribute("src",`https://openweathermap.org/img/w/${r}.png`),l.setAttribute("alt",o),l.setAttribute("class","weather-img"),y.append(l),E.textContent=`Temp: ${c}°F`,g.textContent=`Wind: ${s} MPH`,w.textContent=`Humidity: ${i} %`,h&&(h.innerHTML="",h.append(y,E,g,w))},B=t=>{const e=document.createElement("div"),n=document.createElement("h4");e.setAttribute("class","col-12"),n.textContent="5-Day Forecast:",e.append(n),d&&(d.innerHTML="",d.append(e));for(let r=0;r<t.length;r++)T(t[r])},T=t=>{const{date:e,icon:n,iconDescription:r,tempF:o,windSpeed:c,humidity:s}=t,{col:i,cardTitle:L,weatherIcon:f,tempEl:C,windEl:I,humidityEl:x}=D();L.textContent=e,f.setAttribute("src",`https://openweathermap.org/img/w/${n}.png`),f.setAttribute("alt",r),C.textContent=`Temp: ${o} °F`,I.textContent=`Wind: ${c} MPH`,x.textContent=`Humidity: ${s} %`,d&&d.append(i)},A=async t=>{const e=await t.json();if(a){a.innerHTML="",e.length||(a.innerHTML='<p class="text-center">No Previous Search History</p>');for(let n=e.length-1;n>=0;n--){const r=P(e[n]);a.append(r)}}},D=()=>{const t=document.createElement("div"),e=document.createElement("div"),n=document.createElement("div"),r=document.createElement("h5"),o=document.createElement("img"),c=document.createElement("p"),s=document.createElement("p"),i=document.createElement("p");return t.append(e),e.append(n),n.append(r,o,c,s,i),t.classList.add("col-auto"),e.classList.add("forecast-card","card","text-white","bg-primary","h-100"),n.classList.add("card-body","p-2"),r.classList.add("card-title"),c.classList.add("card-text"),s.classList.add("card-text"),i.classList.add("card-text"),{col:t,cardTitle:r,weatherIcon:o,tempEl:c,windEl:s,humidityEl:i}},$=t=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.setAttribute("aria-controls","today forecast"),e.classList.add("history-btn","btn","btn-secondary","col-10"),e.textContent=t,e},F=()=>{const t=document.createElement("button");return t.setAttribute("type","button"),t.classList.add("fas","fa-trash-alt","delete-city","btn","btn-danger","col-2"),t.addEventListener("click",j),t},O=()=>{const t=document.createElement("div");return t.classList.add("display-flex","gap-2","col-12","m-1"),t},P=t=>{const e=$(t.name),n=F();n.dataset.city=JSON.stringify(t);const r=O();return r.append(e,n),r},M=t=>{if(t.preventDefault(),!p.value)throw new Error("City cannot be blank");const e=p.value.trim();b(e).then(()=>{m()}),p.value=""},N=t=>{if(t.target.matches(".history-btn")){const e=t.target.textContent;b(e).then(m)}},j=t=>{t.stopPropagation();const e=JSON.parse(t.target.getAttribute("data-city")).id;v(e).then(m)},m=()=>H().then(A);u==null||u.addEventListener("submit",M);a==null||a.addEventListener("click",N);m();
