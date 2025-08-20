class ArtistUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }

    getArtists() {
        return `${this.baseUrl}/artists`;
    }

    getArtistById(id) {
        return `${this.baseUrl}/artists/${id}`;
    }

    createArtist() {
        return `${this.baseUrl}/artists`;
    }

    removeArtistById(id) {
        return `${this.baseUrl}/artists/${id}`;
    }

    updateArtistById(id) {
        return `${this.baseUrl}/artists/${id}`;
    }
}

export const artistUrls = new ArtistUrls(); 