document.addEventListener('DOMContentLoaded', () => {
    const creationArea = document.getElementById('creationArea');
    const elementForm = document.getElementById('elementForm');
    const contextMenu = document.getElementById('contextMenu');
    const createElementButton = document.getElementById('createElement');
    let createdElements = JSON.parse(localStorage.getItem('createdElements')) || [];
    let copiedElement = null;
    let currentElement = null;

    const updateCreationArea = () => {
        creationArea.innerHTML = '';
        createdElements.forEach((element, index) => {
            const newElement = document.createElement(element.type);
            newElement.style.height = `${element.height}px`;
            newElement.style.width = `${element.width}px`;
            newElement.style.fontSize = `${element.textSize}px`;
            newElement.style.color = element.textColor;
            newElement.style.border = `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}`;
            newElement.style.borderRadius = `${element.borderRadius}px`;
            newElement.style.backgroundColor = element.backgroundColor;
            if (element.backgroundImage) {
                const img = new Image();
                img.src = element.backgroundImage;
                img.onload = () => {
                    newElement.style.backgroundImage = `url(${element.backgroundImage})`;
                }
            }
            newElement.innerText = element.content;
            newElement.draggable = true;
            newElement.classList.add('draggable-element');
            newElement.dataset.index = index;
            newElement.style.top = `${element.top}px`;
            newElement.style.left = `${element.left}px`;
            creationArea.appendChild(newElement);
        });
    };

    createElementButton.addEventListener('click', () => {
        const newElement = {
            type: document.getElementById('elementType').value,
            height: document.getElementById('elementHeight').value,
            width: document.getElementById('elementWidth').value,
            content: document.getElementById('elementContent').value,
            textSize: document.getElementById('textSize').value,
            textColor: document.getElementById('textColor').value,
            borderWidth: document.getElementById('borderWidth').value,
            borderColor: document.getElementById('borderColor').value,
            borderStyle: document.getElementById('borderStyle').value,
            borderRadius: document.getElementById('borderRadius').value,
            backgroundImage: '', 
            backgroundColor: document.getElementById('backgroundColor').value,
            top: 0,
            left: 0
        };
        const backgroundImageInput = document.getElementById('backgroundImage');
        if (backgroundImageInput.files.length > 0) {
            const file = backgroundImageInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                newElement.backgroundImage = reader.result;
                createdElements.push(newElement);
                updateCreationArea();
            };
            reader.readAsDataURL(file);
        } else {
            createdElements.push(newElement);
            updateCreationArea();
        }
    });

    elementForm.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('createdElements', JSON.stringify(createdElements));
        alert('Elements saved successfully!');
    });

    creationArea.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const target = event.target.closest('.draggable-element');
        if (target) {
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.display = 'block';
            contextMenu.dataset.index = target.dataset.index;
        }
    });

    window.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    document.getElementById('deleteElement').addEventListener('click', () => {
        const index = contextMenu.dataset.index;
        createdElements.splice(index, 1);
        updateCreationArea();
    });

    document.getElementById('copyElement').addEventListener('click', () => {
        const index = contextMenu.dataset.index;
        copiedElement = { ...createdElements[index] };
    });

    document.getElementById('pasteElement').addEventListener('click', () => {
        if (copiedElement) {
            createdElements.push(copiedElement);
            updateCreationArea();
        }
    });

    creationArea.addEventListener('dragstart', (event) => {
        currentElement = event.target;
        currentElement.classList.add('dragging');
    });

    creationArea.addEventListener('dragend', (event) => {
        if (currentElement) {
            currentElement.classList.remove('dragging');
            const index = currentElement.dataset.index;
            const rect = currentElement.getBoundingClientRect();
            createdElements[index].top = rect.top - creationArea.getBoundingClientRect().top;
            createdElements[index].left = rect.left - creationArea.getBoundingClientRect().left;
            localStorage.setItem('createdElements', JSON.stringify(createdElements));
        }
        currentElement = null;
    });

    creationArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (currentElement) {
            const rect = creationArea.getBoundingClientRect();
            currentElement.style.top = `${event.clientY - rect.top - currentElement.offsetHeight / 2}px`;
            currentElement.style.left = `${event.clientX - rect.left - currentElement.offsetWidth / 2}px`;
        }
    });

    updateCreationArea();
});
