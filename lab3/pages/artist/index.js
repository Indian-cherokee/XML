import { ArtistComponent } from '../../components/artist/index.js';
import { artistService } from '../../modules/artistService.js';

export class ArtistPage {
    constructor(parent, artistId) {
        this.parent = parent;
        this.artistId = artistId;
    }

    async render() {
        try {
            const artist = await artistService.getArtistById(this.artistId);
            const artistComponent = new ArtistComponent(this.parent, this.artistId);
            artistComponent.render(artist);
            
            // Добавляем глобальные функции для кнопок
            window.editArtist = (id) => {
                // Здесь можно добавить логику редактирования
                console.log('Edit artist:', id);
            };
            
            window.deleteArtist = (id) => {
                if (confirm('Вы уверены, что хотите удалить этого артиста?')) {
                    artistService.deleteArtist(id)
                        .then(() => {
                            this.goBack();
                        })
                        .catch(error => {
                            console.error('Error deleting artist:', error);
                            alert('Ошибка при удалении артиста');
                        });
                }
            };
            
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