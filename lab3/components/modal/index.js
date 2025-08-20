export class ModalComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(artist = null) {
        const isEdit = artist !== null;
        const title = isEdit ? 'Редактировать артиста' : 'Добавить нового артиста';
        const buttonText = isEdit ? 'Обновить' : 'Сохранить';
        
        return `
            <div class="modal fade" id="artistModal" tabindex="-1" aria-labelledby="artistModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="artistModalLabel">${title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="artistForm">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Имя артиста</label>
                                    <input type="text" class="form-control bg-dark text-light" id="name" value="${artist ? artist.name : ''}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="genre" class="form-label">Жанр</label>
                                    <input type="text" class="form-control bg-dark text-light" id="genre" value="${artist ? artist.genre : ''}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="imageUrl" class="form-label">URL изображения</label>
                                    <input type="url" class="form-control bg-dark text-light" id="imageUrl" value="${artist ? artist.imageUrl : ''}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Описание</label>
                                    <textarea class="form-control bg-dark text-light" id="description" rows="3" required>${artist ? artist.description : ''}</textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveArtist">${buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(artist, onSave) {
        const html = this.getHTML(artist);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const modal = new bootstrap.Modal(document.getElementById('artistModal'));
        modal.show();
        
        document.getElementById('saveArtist').addEventListener('click', () => {
            const formData = {
                name: document.getElementById('name').value,
                genre: document.getElementById('genre').value,
                imageUrl: document.getElementById('imageUrl').value,
                description: document.getElementById('description').value
            };
            
            if (artist) {
                formData.id = artist.id;
            }
            
            onSave(formData);
            modal.hide();
            
            // Удаляем модальное окно из DOM после закрытия
            setTimeout(() => {
                const modalElement = document.getElementById('artistModal');
                if (modalElement) {
                    modalElement.remove();
                }
            }, 300);
        });
    }
} 