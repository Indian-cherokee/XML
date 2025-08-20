(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();class I{async _request(e,a,n=null){const t={method:a,headers:{}};n&&(t.headers["Content-Type"]="application/json",t.body=JSON.stringify(n));try{const s=await fetch(e,t),i=s.status;let r=null;const l=s.headers.get("content-type");return l&&l.includes("application/json")?r=await s.json():s.ok&&i!==204&&console.warn(`Ответ не JSON для ${a} ${e}, Content-Type: ${l}`),s.ok||console.error(`HTTP error! status: ${i}`,r),{data:r,status:i}}catch(s){return console.error("Fetch error:",s),{data:null,status:0,error:s.message}}}get(e){return this._request(e,"GET")}post(e,a){return this._request(e,"POST",a)}put(e,a){return this._request(e,"PUT",a)}patch(e,a){return this._request(e,"PATCH",a)}delete(e){return this._request(e,"DELETE")}}const d=new I;class C{constructor(){this.baseUrl="http://localhost:3001"}getArtists(){return`${this.baseUrl}/artists`}getArtistById(e){return`${this.baseUrl}/artists/${e}`}createArtist(){return`${this.baseUrl}/artists`}removeArtistById(e){return`${this.baseUrl}/artists/${e}`}updateArtistById(e){return`${this.baseUrl}/artists/${e}`}}const u=new C;class ${constructor(e){this.parent=e}getHTML(e,a,n){return`
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-light">
                    <img src="${e.imageUrl}" class="card-img-top" alt="${e.name}">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <div class="accordion" id="accordion${e.id}">
                            <div class="accordion-item bg-dark">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${e.id}">
                                        Подробнее
                                    </button>
                                </h2>
                                <div id="collapse${e.id}" class="accordion-collapse collapse" data-bs-parent="#accordion${e.id}">
                                    <div class="accordion-body">
                                        <p><strong>Жанр:</strong> ${e.genre}</p>
                                        <p><strong>Описание:</strong> ${e.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-primary me-2" onclick="editArtist(${e.id})">Редактировать</button>
                            <button class="btn btn-danger" onclick="deleteArtist(${e.id})">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `}render(e,a,n){const t=this.getHTML(e,a,n);this.parent.insertAdjacentHTML("beforeend",t)}}class f{constructor(e){this.parent=e}render(e){const{title:a,fields:n,onSubmit:t}=e,s=`
            <div class="modal fade" id="artistModal" tabindex="-1" aria-labelledby="artistModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="artistModalLabel">${a}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="artistForm">
                                ${n.map(r=>this.renderField(r)).join("")}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveArtist">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;this.parent.insertAdjacentHTML("beforeend",s),new bootstrap.Modal(document.getElementById("artistModal")).show(),document.getElementById("saveArtist").addEventListener("click",()=>{const r={};n.forEach(l=>{const o=document.getElementById(l.name);o&&(l.type==="select"||l.type,r[l.name]=o.value)}),t(r)})}renderField(e){return e.type==="select"?`
                <div class="mb-3">
                    <label for="${e.name}" class="form-label">${e.label}</label>
                    <select class="form-select bg-dark text-light" id="${e.name}" ${e.required?"required":""}>
                        ${e.options.map(a=>`<option value="${a.value}">${a.label}</option>`).join("")}
                    </select>
                </div>
            `:e.type==="textarea"?`
                <div class="mb-3">
                    <label for="${e.name}" class="form-label">${e.label}</label>
                    <textarea class="form-control bg-dark text-light" id="${e.name}" rows="3" ${e.required?"required":""}></textarea>
                </div>
            `:`
                <div class="mb-3">
                    <label for="${e.name}" class="form-label">${e.label}</label>
                    <input type="${e.type}" class="form-control bg-dark text-light" id="${e.name}" ${e.required?"required":""}>
                </div>
            `}}class L{constructor(e,a=null){this.parent=e,this.searchText="",this.artistId=a}handleEdit(e){new f(this.parent).render({title:"Редактировать артиста",fields:[{name:"name",type:"text",label:"Имя артиста",required:!0},{name:"genre",type:"select",label:"Жанр",required:!0,options:[{value:"",label:"Выберите жанр"},{value:"Rock",label:"Rock"},{value:"Pop",label:"Pop"},{value:"Jazz",label:"Jazz"},{value:"Classical",label:"Classical"},{value:"Electronic",label:"Electronic"},{value:"Hip-Hop",label:"Hip-Hop"},{value:"Country",label:"Country"}]},{name:"imageUrl",type:"text",label:"URL изображения",required:!0},{name:"description",type:"textarea",label:"Описание"}],onSubmit:async n=>{try{const{data:t,status:s}=await d.patch(u.updateArtistById(e.id),n);if(s===200){const i=document.getElementById("artistModal"),r=bootstrap.Modal.getInstance(i);r&&r.hide(),i.addEventListener("hidden.bs.modal",()=>{i.remove(),this.renderArtists()})}else alert("Ошибка при обновлении артиста")}catch(t){console.error("Ошибка при обновлении артиста:",t),alert("Ошибка при обновлении артиста")}}})}handleDelete(e){confirm("Вы уверены, что хотите удалить этого артиста?")&&d.delete(u.removeArtistById(e)).then(({status:a})=>{a===200?this.renderArtists():alert("Ошибка при удалении артиста")}).catch(a=>{console.error("Ошибка при удалении артиста:",a),alert("Ошибка при удалении артиста")})}handleAdd(){new f(this.parent).render({title:"Добавить артиста",fields:[{name:"name",type:"text",label:"Имя артиста",required:!0},{name:"genre",type:"select",label:"Жанр",required:!0,options:[{value:"",label:"Выберите жанр"},{value:"Rock",label:"Rock"},{value:"Pop",label:"Pop"},{value:"Jazz",label:"Jazz"},{value:"Classical",label:"Classical"},{value:"Electronic",label:"Electronic"},{value:"Hip-Hop",label:"Hip-Hop"},{value:"Country",label:"Country"}]},{name:"imageUrl",type:"text",label:"URL изображения",required:!0},{name:"description",type:"textarea",label:"Описание"}],onSubmit:async a=>{try{const{data:n,status:t}=await d.post(u.createArtist(),a);if(t===201){const s=document.getElementById("artistModal"),i=bootstrap.Modal.getInstance(s);i&&i.hide(),s.addEventListener("hidden.bs.modal",()=>{s.remove(),this.renderArtists()})}else alert("Ошибка при создании артиста")}catch(n){console.error("Ошибка при создании артиста:",n),alert("Ошибка при создании артиста")}}})}searchArtists(){const e=document.getElementById("search-input");this.searchText=e.value.toLowerCase(),this.renderArtists()}async renderArtists(){try{const{data:e,status:a}=await d.get(u.getArtists());if(a!==200)throw new Error("Failed to fetch artists");const n=document.getElementById("artists-container");n.innerHTML="";let t=e;if(this.searchText&&(t=e.filter(s=>s.name.toLowerCase().includes(this.searchText)||s.genre.toLowerCase().includes(this.searchText))),this.artistId&&(t=t.filter(s=>s.id===this.artistId)),t.length===0){n.innerHTML=`
                    <div class="col-12 text-center">
                        <p class="text-muted">Артисты не найдены</p>
                    </div>
                `;return}t.forEach(s=>{new $(n).render(s,this.handleEdit.bind(this),this.handleDelete.bind(this))})}catch(e){console.error("Error rendering artists:",e);const a=document.getElementById("artists-container");a.innerHTML=`
                <div class="col-12 text-center">
                    <div class="alert alert-danger">
                        Ошибка при загрузке артистов. Убедитесь, что сервер запущен.
                    </div>
                </div>
            `}}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const a=document.getElementById("search-button"),n=document.getElementById("search-input"),t=document.getElementById("addArtist");a&&a.addEventListener("click",()=>this.searchArtists()),n&&n.addEventListener("keyup",s=>{s.key==="Enter"&&this.searchArtists()}),t&&t.addEventListener("click",()=>this.handleAdd()),this.renderArtists()}getHTML(){return`
            <div class="container">
                <div class="header-section mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <h1 class="mb-0">
                                <i class="bi bi-music-note-beamed text-success"></i>
                                Spotify Artists - Lab 6
                            </h1>
                        </div>
                        <div class="search-container">
                            <div class="input-group">
                                <input type="text" id="search-input" class="form-control" placeholder="Поиск артистов...">
                                <button class="btn btn-outline-secondary" type="button" id="search-button">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-success" id="addArtist">
                                <i class="bi bi-plus-lg"></i> Добавить артиста
                            </button>
                        </div>
                    </div>
                </div>
                <div id="artists-container" class="row"></div>
            </div>
        `}}class w{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("carousel-page")}async handleAdd(){new f(this.parent).render({title:"Добавить артиста",fields:[{name:"name",type:"text",label:"Имя артиста",required:!0},{name:"genre",type:"select",label:"Жанр",required:!0,options:[{value:"",label:"Выберите жанр"},{value:"Rock",label:"Rock"},{value:"Pop",label:"Pop"},{value:"Jazz",label:"Jazz"},{value:"Classical",label:"Classical"},{value:"Electronic",label:"Electronic"},{value:"Hip-Hop",label:"Hip-Hop"},{value:"Country",label:"Country"}]},{name:"imageUrl",type:"text",label:"Ссылка на изображение",required:!0},{name:"description",type:"textarea",label:"Описание"}],onSubmit:async a=>{try{const{data:n,status:t}=await d.post(u.createArtist(),a);if(console.log("Ответ сервера:",t,n),t===201){const s=document.getElementById("artistModal"),i=bootstrap.Modal.getInstance(s);i&&i.hide(),s.addEventListener("hidden.bs.modal",()=>{s.remove(),location.reload()})}else console.error("Ошибка при создании артиста:",t,n),alert("Ошибка при создании артиста")}catch(n){console.error("Сетевая ошибка при создании артиста:",n),alert("Сетевая ошибка при создании артиста")}}})}getHTML(){return`
            <div id="carousel-page" class="container">
                <div class="header-section mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <h1 class="mb-0">
                                <i class="bi bi-music-note-beamed text-success"></i>
                                Spotify Artists Carousel
                            </h1>
                        </div>
                        <div style="width: 50%;">
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" id="search-input" placeholder="Поиск артистов...">
                                <button class="btn btn-primary" id="search-button">
                                    <i class="bi bi-search"></i>
                                </button>
                                <button class="btn btn-outline-secondary" id="filter-toggle-btn" type="button" style="margin-left:8px;">
                                    <i class="bi bi-funnel"></i> Фильтры
                                </button>
                            </div>
                            <div class="gap-2" id="filters-block" style="display:none;">
                                <select id="genre-filter" class="form-select">
                                    <option value="">Все жанры</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Classical">Classical</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="Hip-Hop">Hip-Hop</option>
                                    <option value="Country">Country</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-outline-primary" id="addArtistBtn">
                                <i class="bi bi-plus-lg"></i> Добавить артиста
                            </button>
                        </div>
                    </div>
                </div>
                <div id="carousel-container" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner" id="carousel-inner" style="height: 708px;">
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-container" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Предыдущий</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-container" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Следующий</span>
                    </button>
                </div>
            </div>
        `}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const a=document.getElementById("addArtistBtn"),n=document.getElementById("search-button"),t=document.getElementById("search-input"),s=document.getElementById("genre-filter"),i=document.getElementById("filter-toggle-btn"),r=document.getElementById("filters-block");r&&(r.classList.remove("show-filters"),r.style.display="none"),i&&r&&i.addEventListener("click",()=>{r.classList.contains("show-filters")?(r.classList.remove("show-filters"),r.style.display="none"):(r.classList.add("show-filters"),r.style.display="flex")}),a&&a.addEventListener("click",()=>this.handleAdd());const l=async()=>{const o=t.value.toLowerCase().trim(),E=s.value;try{const{data:v,status:x}=await d.get(u.getArtists());if(x===200){let m=v;o&&(m=m.filter(c=>c.name.toLowerCase().includes(o)||c.description&&c.description.toLowerCase().includes(o))),E&&(m=m.filter(c=>c.genre===E));const y=document.getElementById("carousel-inner");if(y.innerHTML="",m.length===0){y.innerHTML=`
                            <div class="carousel-item active">
                                <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                    <h3>Артисты не найдены</h3>
                                </div>
                            </div>
                        `;return}m.forEach((c,A)=>{const g=document.createElement("div");g.className=`carousel-item ${A===0?"active":""}`,g.style.textAlign="center";const b=document.createElement("div");b.style.display="flex",b.style.justifyContent="center",b.style.alignItems="center",b.style.height="100%";const h=document.createElement("img");h.src=c.imageUrl||"https://via.placeholder.com/708x94",h.alt=c.name,h.style.cssText="height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;",h.style.cursor="pointer",h.onclick=()=>{new L(this.parent,c.id).render()},b.appendChild(h),g.appendChild(b),y.appendChild(g)})}else console.error("Ошибка получения данных при поиске:",x,v)}catch(v){console.error("Сетевая ошибка при поиске:",v),alert("Сетевая ошибка при поиске")}};n&&n.addEventListener("click",l),t&&t.addEventListener("keyup",o=>{o.key==="Enter"&&l()}),s&&s.addEventListener("change",l),this.loadInitialCarouselData()}async loadInitialCarouselData(){try{const{data:e,status:a}=await d.get(u.getArtists());if(console.log("Получены данные:",e,a),a===200){const n=document.getElementById("carousel-inner");if(!n)return;if(n.innerHTML="",!e||e.length===0){n.innerHTML=`
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Нет артистов для отображения</h3>
                            </div>
                        </div>
                    `;return}e.forEach((t,s)=>{const i=document.createElement("div");i.className=`carousel-item ${s===0?"active":""}`;const r=document.createElement("img");r.src=t.imageUrl||"https://via.placeholder.com/708x94",r.alt=t.name,r.className="d-block w-100",r.style.cssText="height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;",r.style.cursor="pointer",r.onclick=()=>{new L(this.parent,t.id).render()},i.appendChild(r),n.appendChild(i)})}else{console.error("Ошибка получения данных:",a,e);const n=document.getElementById("carousel-inner");n&&(n.innerHTML=`
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Ошибка загрузки артистов</h3>
                            </div>
                        </div>
                    `)}}catch(e){console.error("Сетевая ошибка при начальной загрузке:",e),alert("Сетевая ошибка при начальной загрузке");const a=document.getElementById("carousel-inner");a&&(a.innerHTML=`
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                            <h3>Ошибка загрузки артистов</h3>
                        </div>
                    </div>
                `)}}}const T=document.getElementById("app"),H=new w(T);H.render();
