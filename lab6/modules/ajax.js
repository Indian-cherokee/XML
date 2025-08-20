class Ajax {
    async _request(url, method, body = null) {
        const options = {
            method: method,
            headers: {}
        };

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const status = response.status;
            let data = null;

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else if (response.ok && status !== 204) {
                 console.warn(`Ответ не JSON для ${method} ${url}, Content-Type: ${contentType}`);
            }

            if (!response.ok) {
                console.error(`HTTP error! status: ${status}`, data);
            }
            return { data, status };
        } catch (error) {
            console.error('Fetch error:', error);
            return { data: null, status: 0, error: error.message };
        }
    }

    get(url) {
        return this._request(url, 'GET');
    }

    post(url, data) {
        return this._request(url, 'POST', data);
    }

    put(url, data) {
        return this._request(url, 'PUT', data);
    }

    patch(url, data) {
        return this._request(url, 'PATCH', data);
    }

    delete(url) {
        return this._request(url, 'DELETE');
    }
}

export const ajax = new Ajax(); 