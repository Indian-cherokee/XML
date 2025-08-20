(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();class w{constructor(e){this.parent=e}getHTML(e){return`
                <div class="col-12 col-sm-6 col-lg-4 mb-4">
                    <div class="card" style="max-width: 300px; margin: 0 auto;">
                        <div style="height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 15px;">
                            <img src="${e.src}" alt="${e.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${e.title}</h5>
                            <p class="card-price">${e.price?e.price.toLocaleString("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}):"Цена не указана"}</p>
                            ${e.category?`
                                <p class="card-category">
                                    <span class="badge bg-primary">${this.getCategoryLabel(e.category)}</span>
                                </p>
                            `:""}
                            ${e.age_rating?`
                                <p class="card-age-rating">
                                    <span class="badge bg-info">${e.age_rating}</span>
                                </p>
                            `:""}
                            <div class="card-actions">
                                <button class="btn btn-outline-primary" data-id="${e.id}" data-action="detail">
                                    <i class="bi bi-info-circle"></i>
                                </button>
                                <button class="btn btn-outline-primary" data-id="${e.id}" data-action="edit">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-outline-danger" data-id="${e.id}" data-action="delete">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `}getCategoryLabel(e){return{sport:"Спорт",recreation:"Отдых",home:"Для дома",electronics:"Электроника",clothing:"Одежда",books:"Книги",toys:"Игрушки"}[e]||e}render(e,t,s,a){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n);const i=this.parent.lastElementChild,o=i.querySelector('button[data-action="detail"]'),l=i.querySelector('button[data-action="edit"]'),r=i.querySelector('button[data-action="delete"]');o.addEventListener("click",()=>t(e.id)),l.addEventListener("click",()=>s(e)),r.addEventListener("click",()=>a(e.id))}}class P{async _request(e,t,s=null){const a={method:t,headers:{}};s&&(a.headers["Content-Type"]="application/json",a.body=JSON.stringify(s));try{const n=await fetch(e,a),i=n.status;let o=null;const l=n.headers.get("content-type");return l&&l.includes("application/json")?o=await n.json():n.ok&&i!==204&&console.warn(`Ответ не JSON для ${t} ${e}, Content-Type: ${l}`),n.ok||console.error(`HTTP error! status: ${i}`,o),{data:o,status:i}}catch(n){return console.error("Fetch error:",n),{data:null,status:0,error:n.message}}}get(e){return this._request(e,"GET")}post(e,t){return this._request(e,"POST",t)}put(e,t){return this._request(e,"PUT",t)}patch(e,t){return this._request(e,"PATCH",t)}delete(e){return this._request(e,"DELETE")}}const u=new P;class M{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(e){return`${this.baseUrl}/stocks/${e}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(e){return`${this.baseUrl}/stocks/${e}`}updateStockById(e){return`${this.baseUrl}/stocks/${e}`}}const d=new M;class T{constructor(e){this.parent=e}getHTML(e){return`
                <div class="modal fade" id="productModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${e.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="productForm">
                                    ${e.fields.map(t=>`
                                        <div class="mb-3">
                                            <label for="${t.name}" class="form-label">${t.label}</label>
                                            ${t.type==="textarea"?`<textarea class="form-control" id="${t.name}" ${t.required?"required":""}>${t.value||""}</textarea>`:t.type==="select"?`<select class="form-select" id="${t.name}" ${t.required?"required":""}>
                                                    ${t.options.map(s=>`
                                                        <option value="${s.value}" ${t.value===s.value?"selected":""}>
                                                            ${s.label}
                                                        </option>
                                                    `).join("")}
                                                   </select>`:`<input type="${t.type}" class="form-control" id="${t.name}" value="${t.value||""}" ${t.required?"required":""}>`}
                                        </div>
                                    `).join("")}
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                                <button type="button" class="btn btn-primary" id="saveProduct">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `}remove(){const e=document.getElementById("productModal");e&&e.remove()}render(e){this.remove();const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t),new bootstrap.Modal(document.getElementById("productModal")).show();const a=document.getElementById("productForm"),n=document.getElementById("saveProduct");n&&e.onSubmit&&n.addEventListener("click",()=>{if(a.checkValidity()){const i={};e.fields.forEach(o=>{i[o.name]=document.getElementById(o.name).value}),e.onSubmit(i)}else a.reportValidity()})}}class C{constructor(e){this.parent=e}getCategoryLabel(e){return{electronics:"Электроника",clothing:"Одежда",books:"Книги",toys:"Игрушки",home:"Дом и сад"}[e]||e}getHTML(e){return`
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="row g-0">
                                <div class="col-md-5">
                                    <div style="height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 20px;">
                                        <img src="${e.src}" alt="${e.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                                    </div>
                                </div>
                                <div class="col-md-7">
                                    <div class="card-body">
                                        <h3 class="card-title mb-3">${e.title}</h3>
                                        <p class="card-price mb-4">${e.price?e.price.toLocaleString("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}):"Цена не указана"}</p>
                                        ${e.category?`
                                            <p class="card-category mb-2">
                                                <span class="badge bg-primary">${this.getCategoryLabel(e.category)}</span>
                                            </p>
                                        `:""}
                                        ${e.age_rating?`
                                            <p class="card-age-rating mb-4">
                                                <span class="badge bg-info">${e.age_rating}</span>
                                            </p>
                                        `:""}
                                        <div class="description-section">
                                            <h5 class="mb-3">Описание товара</h5>
                                            <p class="card-text">${e.text||"Описание отсутствует"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(e){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t)}}class H{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById("product-page")}async getData(){try{const{data:e,status:t}=await u.get(d.getStockById(this.id));t===200&&e?this.renderData(e):(console.error("Ошибка получения данных товара:",t,e),this.pageRoot&&(this.pageRoot.innerHTML+='<p class="text-center text-danger">Не удалось загрузить информацию о товаре.</p>'))}catch(e){console.error("Сетевая ошибка при получении данных товара:",e),this.pageRoot&&(this.pageRoot.innerHTML+='<p class="text-center text-danger">Сетевая ошибка. Не удалось загрузить информацию о товаре.</p>')}}renderData(e){new C(this.pageRoot).render(e)}getHTML(){return`
                <div id="product-page" class="container mt-4">
                    <div class="header-section mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <a href="index.html" class="logo-link">
                                    <span class="ozon-logo-text">Ozon</span>
                                </a>
                                <button class="btn btn-outline-primary btn-sm header-theme-btn" onclick="toggleTheme()">
                                    <i class="bi bi-moon-stars"></i>
                                </button>
                            </div>
                            <h2 class="mb-0">Детали товара</h2>
                            <div style="width: 42px;"></div>
                        </div>
                    </div>
                </div>
            `}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.getData()}}class ${constructor(e,t=null){this.parent=e,this.searchText="",this.productId=t,this.selectedCategory="",this.selectedAgeRating=""}handleEdit(e){const t={title:e.title,price:e.price,src:e.src,text:e.text||"",category:e.category||"",age_rating:e.age_rating||""},s=new T(this.parent);s.render({title:"Редактировать товар",fields:[{name:"title",type:"text",label:"Название",required:!0,value:e.title},{name:"price",type:"number",label:"Цена",required:!0,value:e.price},{name:"src",type:"text",label:"Ссылка на изображение",required:!0,value:e.src},{name:"text",type:"textarea",label:"Описание",value:e.text},{name:"category",type:"select",label:"Категория",value:e.category,options:[{value:"",label:"Выберите категорию"},{value:"sport",label:"Спорт"},{value:"recreation",label:"Отдых"},{value:"home",label:"Для дома"},{value:"electronics",label:"Электроника"},{value:"clothing",label:"Одежда"},{value:"books",label:"Книги"},{value:"toys",label:"Игрушки"}]},{name:"age_rating",type:"select",label:"Возрастная категория",value:e.age_rating,options:[{value:"",label:"Выберите возраст"},{value:"6+",label:"6+"},{value:"12+",label:"12+"},{value:"16+",label:"16+"},{value:"18+",label:"18+"}]}],onSubmit:async a=>{const n=parseFloat(a.price),i=a.text||"",o={id:e.id,title:a.title,price:n,src:a.src,text:i,category:a.category,age_rating:a.age_rating},l=o.title!==t.title&&o.price!==t.price&&o.src!==t.src&&o.text!==t.text&&o.category!==t.category&&o.age_rating!==t.age_rating;try{let r;l?r=await u.put(d.updateStockById(o.id),o):r=await u.patch(d.updateStockById(o.id),o);const{data:h,status:g}=r;if(g===200){const y=document.getElementById("productModal"),f=bootstrap.Modal.getInstance(y);f&&f.hide(),y.addEventListener("hidden.bs.modal",()=>{s.remove(),this.renderProducts()})}else console.error(`Ошибка при обновлении товара (${l?"PUT":"PATCH"}):`,g,h),alert(`Ошибка при обновлении товара (${l?"PUT":"PATCH"})`)}catch(r){console.error(`Сетевая ошибка при обновлении товара (${l?"PUT":"PATCH"}):`,r),alert(`Сетевая ошибка при обновлении товара (${l?"PUT":"PATCH"})`)}}})}async handleDelete(e){if(confirm("Вы уверены, что хотите удалить эту карточку?")){console.log("Удаление товара с ID:",e),console.log("URL для удаления:",d.removeStockById(e));try{const{data:t,status:s}=await u.delete(d.removeStockById(e));console.log("Ответ сервера при удалении:",{data:t,status:s}),s===200||s===204?(console.log("Удаление успешно, переход к карусели"),new B(this.parent).render()):(console.error("Ошибка при удалении товара:",s,t),alert("Не удалось удалить товар. Пожалуйста, попробуйте еще раз."))}catch(t){console.error("Сетевая ошибка при удалении товара:",t),alert("Сетевая ошибка при удалении товара. Пожалуйста, попробуйте еще раз.")}}}handleAdd(){new T(this.parent).render({title:"Добавить товар",fields:[{name:"title",type:"text",label:"Название",required:!0},{name:"price",type:"number",label:"Цена",required:!0},{name:"src",type:"text",label:"Ссылка на изображение",required:!0},{name:"text",type:"textarea",label:"Описание"},{name:"category",type:"select",label:"Категория",value:"",options:[{value:"",label:"Выберите категорию"},{value:"sport",label:"Спорт"},{value:"recreation",label:"Отдых"},{value:"home",label:"Для дома"},{value:"electronics",label:"Электроника"},{value:"clothing",label:"Одежда"},{value:"books",label:"Книги"},{value:"toys",label:"Игрушки"}]},{name:"age_rating",type:"select",label:"Возрастная категория",value:"",options:[{value:"",label:"Выберите возраст"},{value:"6+",label:"6+"},{value:"12+",label:"12+"},{value:"16+",label:"16+"},{value:"18+",label:"18+"}]}],onSubmit:async t=>{t.price=parseFloat(t.price);try{const{data:s,status:a}=await u.post(d.createStock(),t);a===201?this.renderProducts():alert("Ошибка при создании товара")}catch{alert("Сетевая ошибка при создании товара")}}})}searchProducts(){const e=document.getElementById("search-input"),t=document.getElementById("category-filter"),s=document.getElementById("age-rating-filter");this.searchText=e.value.toLowerCase(),this.selectedCategory=t.value,this.selectedAgeRating=s.value,this.renderProducts()}async renderProducts(){const e=document.getElementById("products-container");if(e){e.innerHTML="";try{const{data:t,status:s}=await u.get(d.getStocks());if(s===200&&t){let a=t;if(this.searchText&&(a=a.filter(n=>n.title.toLowerCase().includes(this.searchText))),this.selectedCategory&&(a=a.filter(n=>n.category===this.selectedCategory)),this.selectedAgeRating&&(a=a.filter(n=>n.age_rating===this.selectedAgeRating)),this.productId&&(a=a.filter(n=>n.id===this.productId)),a.length===0){e.innerHTML='<p class="text-center">Товары не найдены.</p>';return}a.forEach(n=>{new w(e).render(n,this.clickCard.bind(this),this.handleEdit.bind(this),this.handleDelete.bind(this))})}else console.error("Ошибка получения продуктов:",s,t),e.innerHTML='<p class="text-center">Не удалось загрузить товары.</p>'}catch(t){console.error("Сетевая ошибка при загрузке продуктов:",t),e.innerHTML='<p class="text-center">Сетевая ошибка при загрузке товаров.</p>'}}}clickCard(e){new H(this.parent,e).render()}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const t=document.getElementById("search-button"),s=document.getElementById("search-input"),a=document.getElementById("category-filter"),n=document.getElementById("age-rating-filter"),i=document.getElementById("addProduct");t&&t.addEventListener("click",()=>this.searchProducts()),s&&s.addEventListener("keyup",o=>{o.key==="Enter"&&this.searchProducts()}),a&&a.addEventListener("change",()=>this.searchProducts()),n&&n.addEventListener("change",()=>this.searchProducts()),i&&i.addEventListener("click",()=>this.handleAdd()),this.renderProducts()}getHTML(){return`
                <div class="container">
                    <div class="header-section mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <a href="index.html" class="logo-link">
                                    <span class="ozon-logo-text">Ozon</span>
                                </a>
                                <button class="btn btn-outline-primary btn-sm header-theme-btn" onclick="toggleTheme()">
                                    <i class="bi bi-moon-stars"></i>
                                </button>
                            </div>
                            ${this.productId?"":`
                                <div class="search-container">
                                    <div class="input-group mb-2">
                                        <input type="text" id="search-input" class="form-control" placeholder="Поиск товаров...">
                                        <button class="btn btn-outline-secondary" type="button" id="search-button">
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <select id="category-filter" class="form-select">
                                            <option value="">Все категории</option>
                                            <option value="sport">Спорт</option>
                                            <option value="recreation">Отдых</option>
                                            <option value="home">Для дома</option>
                                            <option value="electronics">Электроника</option>
                                            <option value="clothing">Одежда</option>
                                            <option value="books">Книги</option>
                                            <option value="toys">Игрушки</option>
                                        </select>
                                        <select id="age-rating-filter" class="form-select">
                                            <option value="">Все возрасты</option>
                                            <option value="6+">6+</option>
                                            <option value="12+">12+</option>
                                            <option value="16+">16+</option>
                                            <option value="18+">18+</option>
                                        </select>
                                    </div>
                                </div>
                            `}
                            <div class="d-flex gap-2">
                                ${this.productId?"":`
                                    <button class="btn btn-outline-primary btn-sm" id="addProduct">
                                        <i class="bi bi-plus-lg"></i> Добавить товар
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                    <div id="products-container" class="row"></div>
                </div>
            `}}class B{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("carousel-page")}async handleAdd(){const e=new T(this.parent);e.render({title:"Добавить товар",fields:[{name:"title",type:"text",label:"Название",required:!0},{name:"price",type:"number",label:"Цена",required:!0},{name:"src",type:"text",label:"Ссылка на изображение",required:!0},{name:"text",type:"textarea",label:"Описание"},{name:"category",type:"select",label:"Категория",value:"",options:[{value:"",label:"Выберите категорию"},{value:"sport",label:"Спорт"},{value:"recreation",label:"Отдых"},{value:"home",label:"Для дома"},{value:"electronics",label:"Электроника"},{value:"clothing",label:"Одежда"},{value:"books",label:"Книги"},{value:"toys",label:"Игрушки"}]},{name:"age_rating",type:"select",label:"Возрастная категория",value:"",options:[{value:"",label:"Выберите возраст"},{value:"6+",label:"6+"},{value:"12+",label:"12+"},{value:"16+",label:"16+"},{value:"18+",label:"18+"}]}],onSubmit:async t=>{t.price=parseFloat(t.price);try{const{data:s,status:a}=await u.post(d.createStock(),t);if(console.log("Ответ сервера:",a,s),a===201){const n=document.getElementById("productModal"),i=bootstrap.Modal.getInstance(n);i&&i.hide(),n.addEventListener("hidden.bs.modal",()=>{e.remove(),location.reload()})}else console.error("Ошибка при создании товара:",a,s),alert("Ошибка при создании товара")}catch(s){console.error("Сетевая ошибка при создании товара:",s),alert("Сетевая ошибка при создании товара")}}})}getHTML(){return`
                <div id="carousel-page" class="container">
                    <div class="header-section mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <a href="index.html" class="logo-link">
                                    <span class="ozon-logo-text">Ozon</span>
                                </a>
                                <button class="btn btn-outline-primary btn-sm header-theme-btn" onclick="toggleTheme()">
                                    <i class="bi bi-moon-stars"></i>
                                </button>
                            </div>
                            <div style="width: 50%;">
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="search-input" placeholder="Поиск товаров...">
                                    <button class="btn btn-primary" id="search-button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                    <button class="btn btn-outline-secondary" id="filter-toggle-btn" type="button" style="margin-left:8px;">
                                        <i class="bi bi-funnel"></i> Фильтры
                                    </button>
                                </div>
                                <div class="gap-2" id="filters-block" style="display:none;">
                                    <select id="category-filter" class="form-select">
                                        <option value="">Все категории</option>
                                        <option value="sport">Спорт</option>
                                        <option value="recreation">Отдых</option>
                                        <option value="home">Для дома</option>
                                        <option value="electronics">Электроника</option>
                                        <option value="clothing">Одежда</option>
                                        <option value="books">Книги</option>
                                        <option value="toys">Игрушки</option>
                                    </select>
                                    <select id="age-rating-filter" class="form-select">
                                        <option value="">Все возрасты</option>
                                        <option value="6+">6+</option>
                                        <option value="12+">12+</option>
                                        <option value="16+">16+</option>
                                        <option value="18+">18+</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-outline-primary" id="addProductBtn">
                                    <i class="bi bi-plus-lg"></i> Добавить товар
                                </button>
                                <button class="btn btn-outline-primary" id="calculatorBtn">
                                    <i class="bi bi-calculator"></i>
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
            `}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const t=document.getElementById("addProductBtn"),s=document.getElementById("calculatorBtn"),a=document.getElementById("search-button"),n=document.getElementById("search-input"),i=document.getElementById("category-filter"),o=document.getElementById("age-rating-filter"),l=document.getElementById("filter-toggle-btn"),r=document.getElementById("filters-block");r&&(r.classList.remove("show-filters"),r.style.display="none"),l&&r&&l.addEventListener("click",()=>{r.classList.contains("show-filters")?(r.classList.remove("show-filters"),r.style.display="none"):(r.classList.add("show-filters"),r.style.display="flex")}),t&&t.addEventListener("click",()=>this.handleAdd()),s&&s.addEventListener("click",()=>{window.location.href="calculator.html"});const h=async()=>{const g=n.value.toLowerCase().trim(),y=i.value,f=o.value;try{const{data:x,status:k}=await u.get(d.getStocks());if(k===200){let m=x;g&&(m=m.filter(c=>c.title.toLowerCase().includes(g)||c.text&&c.text.toLowerCase().includes(g))),y&&(m=m.filter(c=>c.category===y)),f&&(m=m.filter(c=>c.age_rating===f));const E=document.getElementById("carousel-inner");if(E.innerHTML="",m.length===0){E.innerHTML=`
                            <div class="carousel-item active">
                                <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                    <h3>Товары не найдены</h3>
                                </div>
                            </div>
                        `;return}m.forEach((c,I)=>{const L=document.createElement("div");L.className=`carousel-item ${I===0?"active":""}`,L.style.textAlign="center";const b=document.createElement("div");b.style.display="flex",b.style.justifyContent="center",b.style.alignItems="center",b.style.height="100%";const v=document.createElement("img");v.src=c.src||"https://via.placeholder.com/708x94",v.alt=c.title,v.style.cssText="height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;",v.style.cursor="pointer",v.onclick=()=>{new $(this.parent,c.id).render()},b.appendChild(v),L.appendChild(b),E.appendChild(L)})}else console.error("Ошибка получения данных при поиске:",k,x)}catch(x){console.error("Сетевая ошибка при поиске:",x),alert("Сетевая ошибка при поиске")}};a&&a.addEventListener("click",h),n&&n.addEventListener("keyup",g=>{g.key==="Enter"&&h()}),i&&i.addEventListener("change",h),o&&o.addEventListener("change",h),this.loadInitialCarouselData()}async loadInitialCarouselData(){try{const{data:e,status:t}=await u.get(d.getStocks());if(console.log("Получены данные:",e,t),t===200){const s=document.getElementById("carousel-inner");if(!s)return;if(s.innerHTML="",!e||e.length===0){s.innerHTML=`
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Нет товаров для отображения</h3>
                            </div>
                        </div>
                    `;return}e.forEach((a,n)=>{const i=document.createElement("div");i.className=`carousel-item ${n===0?"active":""}`;const o=document.createElement("img");o.src=a.src||"https://via.placeholder.com/708x94",o.alt=a.title,o.className="d-block w-100",o.style.cssText="height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;",o.style.cursor="pointer",o.onclick=()=>{new $(this.parent,a.id).render()},i.appendChild(o),s.appendChild(i)})}else{console.error("Ошибка получения данных:",t,e);const s=document.getElementById("carousel-inner");s&&(s.innerHTML=`
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Ошибка загрузки товаров</h3>
                            </div>
                        </div>
                    `)}}catch(e){console.error("Сетевая ошибка при начальной загрузке:",e),alert("Сетевая ошибка при начальной загрузке");const t=document.getElementById("carousel-inner");t&&(t.innerHTML=`
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                            <h3>Ошибка загрузки товаров</h3>
                        </div>
                    </div>
                `)}}}const S=document.getElementById("app"),j=new B(S);j.render();
