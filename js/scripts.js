const gallery = document.getElementById('gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
let employees;

fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => employees = data)
    .then(generateGallery)
    .then(displayModal)
    .catch(error => console.log('There was a problem!', error));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateGallery(data) {
    const cards = data.results.map( employee => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        </div>
    `).join('');
    gallery.innerHTML = cards;
};


function generateModal(data, index) {
    const employee = data.results[index];
    return modal = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date.substring(5, 7)}/${employee.dob.date.substring(8, 10)}/${employee.dob.date.substring(0, 4)}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`;
};

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

let employeeNumber = 0;

function displayModal() {
    for(let i = 0; i < gallery.children.length; i++) {
        gallery.children[i].addEventListener('click', () => {

            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');
            modalContainer.innerHTML = generateModal(employees, i);
            gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling);

            employeeNumber = i;

            closeButton();
            controller();
        });
    }
}

function closeButton() {
    const button = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('.modal-container');
    button.addEventListener('click', () => {
        modal.remove();
    })
}


function controller() {
    const modalPrev = document.querySelector('#modal-prev');
    modalPrev.addEventListener('click', () => {

        if(employeeNumber <= 11 && employeeNumber > 0) {
            employeeNumber -= 1;

            const employee = employees.results[employeeNumber];

            const modalContainer = document.querySelector('.modal-info-container');
            modalContainer.innerHTML = `
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.substring(5, 7)}/${employee.dob.date.substring(8, 10)}/${employee.dob.date.substring(0, 4)}</p>`
        }
    });

    const modalNext = document.querySelector('#modal-next');
    modalNext.addEventListener('click', () => {

        if(employeeNumber < 11 && employeeNumber >= 0) {
            employeeNumber += 1;

            const employee = employees.results[employeeNumber];
    
            const modalContainer = document.querySelector('.modal-info-container');
            modalContainer.innerHTML = `
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.substring(5, 7)}/${employee.dob.date.substring(8, 10)}/${employee.dob.date.substring(0, 4)}</p>`
        }
    });
}



