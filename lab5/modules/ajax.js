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

            // Пытаемся получить JSON, только если Content-Type это json
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else if (response.ok && status !== 204) { // 204 No Content не имеет тела
                 // Если не JSON, но ответ успешный и не 204, можно вернуть текст
                 // или решить, как обрабатывать другие типы контента.
                 // Для данного проекта, предположим, что это не ожидается часто,
                 // кроме как для DELETE, где тело может быть пустым.
                 console.warn(`Ответ не JSON для ${method} ${url}, Content-Type: ${contentType}`);
            }

            if (!response.ok) {
                // Для HTTP ошибок (4xx, 5xx), fetch не выбрасывает исключение сам по себе.
                // Мы можем обработать это здесь или позволить вызывающему коду сделать это.
                // Для совместимости с предыдущим коллбеком (data, status),
                // мы передаем data (может быть null или объектом ошибки от сервера) и status.
                console.error(`HTTP error! status: ${status}`, data);
                // Можно выбросить ошибку, чтобы ее ловил .catch() в вызывающем коде
                // throw new Error(\`HTTP error! status: \${status}\`);
            }
            return { data, status };
        } catch (error) {
            console.error('Fetch error:', error);
            // В случае сетевой ошибки или другой проблемы с fetch,
            // вернем null для данных и, возможно, статус 0 или специальный код ошибки.
            // Либо можно перевыбросить ошибку, чтобы вызывающий код ее обработал.
            return { data: null, status: 0, error: error.message }; // Добавляем поле error для отладки
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
        // Для DELETE часто не ожидается тело ответа, или оно может быть пустым.
        // _request обработает это.
        return this._request(url, 'DELETE');
    }
}

export const ajax = new Ajax(); 