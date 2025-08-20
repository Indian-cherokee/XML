export class ModalComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(config) {
        const { title, fields, onSubmit } = config;
        
        const modalHTML = `
            <div class="modal fade" id="artistModal" tabindex="-1" aria-labelledby="artistModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="artistModalLabel">${title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="artistForm">
                                ${fields.map(field => this.renderField(field)).join('')}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveArtist">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.parent.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = new bootstrap.Modal(document.getElementById('artistModal'));
        modal.show();
        
        document.getElementById('saveArtist').addEventListener('click', () => {
            const formData = {};
            fields.forEach(field => {
                const element = document.getElementById(field.name);
                if (element) {
                    if (field.type === 'select') {
                        formData[field.name] = element.value;
                    } else if (field.type === 'textarea') {
                        formData[field.name] = element.value;
                    } else {
                        formData[field.name] = element.value;
                    }
                }
            });
            
            onSubmit(formData);
        });
    }

    renderField(field) {
        if (field.type === 'select') {
            return `
                <div class="mb-3">
                    <label for="${field.name}" class="form-label">${field.label}</label>
                    <select class="form-select bg-dark text-light" id="${field.name}" ${field.required ? 'required' : ''}>
                        ${field.options.map(option => 
                            `<option value="${option.value}">${option.label}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
        } else if (field.type === 'textarea') {
            return `
                <div class="mb-3">
                    <label for="${field.name}" class="form-label">${field.label}</label>
                    <textarea class="form-control bg-dark text-light" id="${field.name}" rows="3" ${field.required ? 'required' : ''}></textarea>
                </div>
            `;
        } else {
            return `
                <div class="mb-3">
                    <label for="${field.name}" class="form-label">${field.label}</label>
                    <input type="${field.type}" class="form-control bg-dark text-light" id="${field.name}" ${field.required ? 'required' : ''}>
                </div>
            `;
        }
    }
} 