import { ArtistCardComponent } from '../../components/artist-card/index.js';
import { ModalComponent } from '../../components/modal/index.js';
import { ajax } from '../../modules/ajax.js';
import { artistUrls } from '../../modules/artistUrls.js';

export class MainPage {
    constructor(parent, artistId = null) {
        this.parent = parent;
        this.searchText = '';
        this.artistId = artistId;
    }

    handleEdit(artist) {
        const modal = new ModalComponent(this.parent);
        modal.render({
            title: 'Редактировать артиста',
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
                { name: 'imageUrl', type: 'text', label: 'URL изображения', required: true },
                { name: 'description', type: 'textarea', label: 'Описание' }
            ],
            onSubmit: async (formData) => {
                try {
                    const { data, status } = await ajax.patch(artistUrls.updateArtistById(artist.id), formData);
                    if (status === 200) {
                        const modalElement = document.getElementById('artistModal');
                        const bsModal = bootstrap.Modal.getInstance(modalElement);
                        if (bsModal) {
                            bsModal.hide();
                        }
                        
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            modalElement.remove();
                            this.renderArtists();
                        });
                    } else {
                        alert('Ошибка при обновлении артиста');
                    }
                } catch (error) {
                    console.error('Ошибка при обновлении артиста:', error);
                    alert('Ошибка при обновлении артиста');
                }
            }
        });
    }

    handleDelete(artistId) {
        if (confirm('Вы уверены, что хотите удалить этого артиста?')) {
            ajax.delete(artistUrls.removeArtistById(artistId))
                .then(({ status }) => {
                    if (status === 200) {
                        this.renderArtists();
                    } else {
                        alert('Ошибка при удалении артиста');
                    }
                })
                .catch(error => {
                    console.error('Ошибка при удалении артиста:', error);
                    alert('Ошибка при удалении артиста');
                });
        }
    }

    handleAdd() {
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
                { name: 'imageUrl', type: 'text', label: 'URL изображения', required: true },
                { name: 'description', type: 'textarea', label: 'Описание' }
            ],
            onSubmit: async (formData) => {
                try {
                    const { data, status } = await ajax.post(artistUrls.createArtist(), formData);
                    if (status === 201) {
                        const modalElement = document.getElementById('artistModal');
                        const bsModal = bootstrap.Modal.getInstance(modalElement);
                        if (bsModal) {
                            bsModal.hide();
                        }
                        
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            modalElement.remove();
                            this.renderArtists();
                        });
                    } else {
                        alert('Ошибка при создании артиста');
                    }
                } catch (error) {
                    console.error('Ошибка при создании артиста:', error);
                    alert('Ошибка при создании артиста');
                }
            }
        });
    }

    searchArtists() {
        const searchInput = document.getElementById('search-input');
        this.searchText = searchInput.value.toLowerCase();
        this.renderArtists();
    }

    async renderArtists() {
        try {
            const { data: artists, status } = await ajax.get(artistUrls.getArtists());
            
            if (status !== 200) {
                throw new Error('Failed to fetch artists');
            }

            const artistsContainer = document.getElementById('artists-container');
            artistsContainer.innerHTML = '';
            
            let filteredArtists = artists;
            if (this.searchText) {
                filteredArtists = artists.filter(artist => 
                    artist.name.toLowerCase().includes(this.searchText) ||
                    artist.genre.toLowerCase().includes(this.searchText)
                );
            }
            
            if (this.artistId) {
                filteredArtists = filteredArtists.filter(artist => artist.id === this.artistId);
            }
            
            if (filteredArtists.length === 0) {
                artistsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="text-muted">Артисты не найдены</p>
                    </div>
                `;
                return;
            }
            
            filteredArtists.forEach((artist) => {
                const artistCard = new ArtistCardComponent(artistsContainer);
                artistCard.render(
                    artist, 
                    this.handleEdit.bind(this),
                    this.handleDelete.bind(this)
                );
            });
        } catch (error) {
            console.error('Error rendering artists:', error);
            const artistsContainer = document.getElementById('artists-container');
            artistsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger">
                        Ошибка при загрузке артистов. Убедитесь, что сервер запущен.
                    </div>
                </div>
            `;
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');
        const addButton = document.getElementById('addArtist');
        
        if (searchButton) searchButton.addEventListener('click', () => this.searchArtists());
        if (searchInput) searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchArtists();
            }
        });
        if (addButton) addButton.addEventListener('click', () => this.handleAdd());

        this.renderArtists();
    }

    getHTML() {
        return `
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
        `;
    }
} 