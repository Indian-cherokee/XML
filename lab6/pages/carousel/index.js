import { ajax } from '../../modules/ajax.js';
import { artistUrls } from '../../modules/artistUrls.js';
import { MainPage } from '../main/index.js';
import { ModalComponent } from '../../components/modal/index.js';

export class CarouselPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('carousel-page');
    }

    async handleAdd() {
        const modal = new ModalComponent(this.parent);
        modal.render({
            title: 'Добавить артиста',
            fields: [
                { name: 'name', type: 'text', label: 'Имя артиста', required: true },
                { name: 'genre', type: 'select', label: 'Жанр', required: true, options: [
                    { value: '', label: 'Выберите жанр' },
                    { value: 'Rock', label: 'Rock' },
                    { value: 'Pop', label: 'Pop' },
                    { value: 'Jazz', label: 'Jazz' },
                    { value: 'Classical', label: 'Classical' },
                    { value: 'Electronic', label: 'Electronic' },
                    { value: 'Hip-Hop', label: 'Hip-Hop' },
                    { value: 'Country', label: 'Country' }
                ]},
                { name: 'imageUrl', type: 'text', label: 'Ссылка на изображение', required: true },
                { name: 'description', type: 'textarea', label: 'Описание' }
            ],
            onSubmit: async (formData) => {
                try {
                    const { data: response, status } = await ajax.post(artistUrls.createArtist(), formData);
                    console.log('Ответ сервера:', status, response);
                    if (status === 201) {
                        const modalElement = document.getElementById('artistModal');
                        const bsModal = bootstrap.Modal.getInstance(modalElement);
                        if (bsModal) {
                            bsModal.hide();
                        }
                        
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            modalElement.remove();
                            location.reload();
                        });
                    } else {
                        console.error('Ошибка при создании артиста:', status, response);
                        alert('Ошибка при создании артиста');
                    }
                } catch (error) {
                    console.error('Сетевая ошибка при создании артиста:', error);
                    alert('Сетевая ошибка при создании артиста');
                }
            }
        });
    }

    getHTML() {
        return `
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
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addArtistBtn = document.getElementById('addArtistBtn');
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');
        const genreFilter = document.getElementById('genre-filter');
        const filterToggleBtn = document.getElementById('filter-toggle-btn');
        const filtersBlock = document.getElementById('filters-block');

        if (filtersBlock) {
            filtersBlock.classList.remove('show-filters');
            filtersBlock.style.display = 'none';
        }

        if (filterToggleBtn && filtersBlock) {
            filterToggleBtn.addEventListener('click', () => {
                if (filtersBlock.classList.contains('show-filters')) {
                    filtersBlock.classList.remove('show-filters');
                    filtersBlock.style.display = 'none';
                } else {
                    filtersBlock.classList.add('show-filters');
                    filtersBlock.style.display = 'flex';
                }
            });
        }

        if (addArtistBtn) {
            addArtistBtn.addEventListener('click', () => this.handleAdd());
        }

        const handleSearch = async () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const selectedGenre = genreFilter.value;

            try {
                const { data, status } = await ajax.get(artistUrls.getArtists());
                if (status === 200) {
                    let filteredData = data;
                    if (searchText) {
                        filteredData = filteredData.filter(item =>
                            item.name.toLowerCase().includes(searchText) ||
                            (item.description && item.description.toLowerCase().includes(searchText))
                        );
                    }
                    if (selectedGenre) {
                        filteredData = filteredData.filter(item => item.genre === selectedGenre);
                    }

                    const carouselInner = document.getElementById('carousel-inner');
                    carouselInner.innerHTML = '';

                    if (filteredData.length === 0) {
                        carouselInner.innerHTML = `
                            <div class="carousel-item active">
                                <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                    <h3>Артисты не найдены</h3>
                                </div>
                            </div>
                        `;
                        return;
                    }

                    filteredData.forEach((item, index) => {
                        const div = document.createElement('div');
                        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                        div.style.textAlign = 'center';

                        const imgContainer = document.createElement('div');
                        imgContainer.style.display = 'flex';
                        imgContainer.style.justifyContent = 'center';
                        imgContainer.style.alignItems = 'center';
                        imgContainer.style.height = '100%';

                        const img = document.createElement('img');
                        img.src = item.imageUrl || 'https://via.placeholder.com/708x94';
                        img.alt = item.name;
                        img.style.cssText = 'height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;';
                        img.style.cursor = 'pointer';
                        img.onclick = () => {
                            const mainPage = new MainPage(this.parent, item.id);
                            mainPage.render();
                        };

                        imgContainer.appendChild(img);
                        div.appendChild(imgContainer);
                        carouselInner.appendChild(div);
                    });
                } else {
                    console.error('Ошибка получения данных при поиске:', status, data);
                }
            } catch (error) {
                console.error('Сетевая ошибка при поиске:', error);
                alert('Сетевая ошибка при поиске');
            }
        };

        if (searchButton) searchButton.addEventListener('click', handleSearch);
        if (searchInput) searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        if (genreFilter) genreFilter.addEventListener('change', handleSearch);

        this.loadInitialCarouselData();
    }

    async loadInitialCarouselData() {
        try {
            const { data, status } = await ajax.get(artistUrls.getArtists());
            console.log('Получены данные:', data, status);
            if (status === 200) {
                const carouselInner = document.getElementById('carousel-inner');
                if (!carouselInner) return;
                carouselInner.innerHTML = '';

                if (!data || data.length === 0) {
                     carouselInner.innerHTML = `
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Нет артистов для отображения</h3>
                            </div>
                        </div>
                    `;
                    return;
                }

                data.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                    
                    const img = document.createElement('img');
                    img.src = item.imageUrl || 'https://via.placeholder.com/708x94';
                    img.alt = item.name;
                    img.className = 'd-block w-100';
                    img.style.cssText = 'height: 708px !important; width: auto !important; margin: 0 auto !important; display: block !important; object-fit: contain !important;';
                    img.style.cursor = 'pointer';
                    img.onclick = () => {
                        const mainPage = new MainPage(this.parent, item.id);
                        mainPage.render();
                    };
                    
                    div.appendChild(img);
                    carouselInner.appendChild(div);
                });
            } else {
                console.error('Ошибка получения данных:', status, data);
                 const carouselInner = document.getElementById('carousel-inner');
                 if (carouselInner) {
                    carouselInner.innerHTML = `
                        <div class="carousel-item active">
                            <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                                <h3>Ошибка загрузки артистов</h3>
                            </div>
                        </div>
                    `;
                 }
            }
        } catch (error) {
            console.error('Сетевая ошибка при начальной загрузке:', error);
            alert('Сетевая ошибка при начальной загрузке');
            const carouselInner = document.getElementById('carousel-inner');
            if (carouselInner) {
                carouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center" style="height: 400px; background-color: #f8f9fa;">
                            <h3>Ошибка загрузки артистов</h3>
                        </div>
                    </div>
                `;
            }
        }
    }
} 