export class ArtistCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(artist, onEdit, onDelete) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-light">
                    <img src="${artist.imageUrl}" class="card-img-top" alt="${artist.name}">
                    <div class="card-body">
                        <h5 class="card-title">${artist.name}</h5>
                        <div class="accordion" id="accordion${artist.id}">
                            <div class="accordion-item bg-dark">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${artist.id}">
                                        Подробнее
                                    </button>
                                </h2>
                                <div id="collapse${artist.id}" class="accordion-collapse collapse" data-bs-parent="#accordion${artist.id}">
                                    <div class="accordion-body">
                                        <p><strong>Жанр:</strong> ${artist.genre}</p>
                                        <p><strong>Описание:</strong> ${artist.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-primary me-2" onclick="editArtist(${artist.id})">Редактировать</button>
                            <button class="btn btn-danger" onclick="deleteArtist(${artist.id})">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(artist, onEdit, onDelete) {
        const html = this.getHTML(artist, onEdit, onDelete);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
} 