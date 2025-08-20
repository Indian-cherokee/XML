export class ArtistComponent {
    constructor(parent, artistId = null) {
        this.parent = parent;
        this.artistId = artistId;
    }

    getHTML(artist) {
        return `
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
        `;
    }

    render(artist) {
        const html = this.getHTML(artist);
        this.parent.innerHTML = html;
    }
} 