const API_URL = 'http://localhost:3000/artists';

export const artistService = {
    // Получить всех артистов
    async getAllArtists() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch artists');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching artists:', error);
            throw error;
        }
    },

    // Получить артиста по ID
    async getArtistById(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch artist');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching artist:', error);
            throw error;
        }
    },

    // Создать нового артиста
    async createArtist(artistData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artistData),
            });
            if (!response.ok) {
                throw new Error('Failed to create artist');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating artist:', error);
            throw error;
        }
    },

    // Обновить артиста
    async updateArtist(id, artistData) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artistData),
            });
            if (!response.ok) {
                throw new Error('Failed to update artist');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating artist:', error);
            throw error;
        }
    },

    // Удалить артиста
    async deleteArtist(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete artist');
            }
            return true;
        } catch (error) {
            console.error('Error deleting artist:', error);
            throw error;
        }
    }
}; 