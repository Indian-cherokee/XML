import { MainPage } from './pages/main/index.js';

// Глобальные функции для работы с артистами
window.editArtist = function(id) {
    // Импортируем и рендерим страницу артиста для редактирования
    import('./pages/artist/index.js').then(({ ArtistPage }) => {
        const artistPage = new ArtistPage(document.getElementById('root'), id);
        artistPage.render();
    });
};

window.deleteArtist = function(id) {
    if (confirm('Вы уверены, что хотите удалить этого артиста?')) {
        import('./modules/ajax.js').then(({ ajax }) => {
            import('./modules/artistUrls.js').then(({ artistUrls }) => {
                ajax.delete(artistUrls.removeArtistById(id))
                    .then(({ status }) => {
                        if (status === 200) {
                            // Перезагружаем главную страницу
                            const mainPage = new MainPage(document.getElementById('root'));
                            mainPage.render();
                        } else {
                            alert('Ошибка при удалении артиста');
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting artist:', error);
                        alert('Ошибка при удалении артиста');
                    });
            });
        });
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    const mainPage = new MainPage(document.getElementById('root'));
    mainPage.render();
}); 