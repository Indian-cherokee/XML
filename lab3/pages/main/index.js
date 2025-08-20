import { ArtistCardComponent } from '../../components/artist-card/index.js';
import { ModalComponent } from '../../components/modal/index.js';
import { artistService } from '../../modules/artistService.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchText = '';
    }

    handleEdit(artist) {
        const modal = new ModalComponent(this.parent);
        modal.render(artist, async (updatedArtist) => {
            try {
                await artistService.updateArtist(updatedArtist.id, updatedArtist);
                this.renderArtists();
            } catch (error) {
                console.error('Error updating artist:', error);
                alert('Ошибка при обновлении артиста');
            }
        });
    }

    handleDelete(artistId) {
        if (confirm('Вы уверены, что хотите удалить этого артиста?')) {
            artistService.deleteArtist(artistId)
                .then(() => {
                    this.renderArtists();
                })
                .catch(error => {
                    console.error('Error deleting artist:', error);
                    alert('Ошибка при удалении артиста');
                });
        }
    }

    handleAdd() {
        const modal = new ModalComponent(this.parent);
        modal.render(null, async (newArtist) => {
            try {
                await artistService.createArtist(newArtist);
                this.renderArtists();
            } catch (error) {
                console.error('Error creating artist:', error);
                alert('Ошибка при создании артиста');
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
            const artists = await artistService.getAllArtists();
            const artistsContainer = document.getElementById('artists-container');
            artistsContainer.innerHTML = '';
            
            let filteredArtists = artists;
            if (this.searchText) {
                filteredArtists = artists.filter(artist => 
                    artist.name.toLowerCase().includes(this.searchText) ||
                    artist.genre.toLowerCase().includes(this.searchText)
                );
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
            alert('Ошибка при загрузке артистов');
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
                                Spotify Artists
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