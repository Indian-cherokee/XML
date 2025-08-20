import { ajax } from '../../modules/ajax.js';
import { artistUrls } from '../../modules/artistUrls.js';

export class ArtistPage {
    constructor(parent, artistId) {
        this.parent = parent;
        this.artistId = artistId;
    }

    async render() {
        try {
            const { data: artist, status } = await ajax.get(artistUrls.getArtistById(this.artistId));
            
            if (status !== 200) {
                throw new Error('Failed to fetch artist');
            }

            this.parent.innerHTML = `
                <div class="container mt-4">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card mb-4 bg-dark text-light">
                                <div class="row g-0">
                                    <div class="col-md-5">
                                        <img src="${artist.imageUrl}" class="img-fluid rounded-start h-100" alt="${artist.name}" style="object-fit: cover;">
                                    </div>
                                    <div class="col-md-7">
                                        <div class="card-body">
                                            <h3 class="card-title mb-3">${artist.name}</h3>
                                            <p class="card-genre mb-4">
                                                <span class="badge bg-primary">${artist.genre}</span>
                                            </p>
                                            <div class="description-section">
                                                <h5 class="mb-3">О артисте</h5>
                                                <p class="card-text">${artist.description || 'Описание отсутствует'}</p>
                                            </div>
                                            <div class="mt-4">
                                                <button class="btn btn-primary me-2" onclick="editArtist(${artist.id})">
                                                    <i class="bi bi-pencil"></i> Редактировать
                                                </button>
                                                <button class="btn btn-danger me-2" onclick="deleteArtist(${artist.id})">
                                                    <i class="bi bi-trash"></i> Удалить
                                                </button>
                                                <button class="btn btn-secondary" onclick="goBack()">
                                                    <i class="bi bi-arrow-left"></i> Назад
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Добавляем глобальные функции для кнопок
            window.goBack = () => {
                this.goBack();
            };
        } catch (error) {
            console.error('Error loading artist:', error);
            this.parent.innerHTML = `
                <div class="container mt-4">
                    <div class="alert alert-danger">
                        Ошибка при загрузке артиста
                    </div>
                    <button class="btn btn-secondary" onclick="goBack()">Назад</button>
                </div>
            `;
        }
    }

    goBack() {
        // Импортируем и рендерим главную страницу
        import('./../main/index.js').then(({ MainPage }) => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }
} 