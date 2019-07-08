const gallery = document.getElementById('gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
let employees;

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => employees = data.results)
    .then(data => generateGallery(data))   
    .then(() => displayModal(employees))
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

    const cards = data.map( employee => `
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
    const employee = data[index];
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

function displayModal(data) {
    for(let i = 0; i < gallery.children.length; i++) {
        gallery.children[i].addEventListener('click', () => {

            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');
            modalContainer.innerHTML = generateModal(data, i);
            gallery.parentNode.insertBefore(modalContainer, gallery.nextSibling);

            employeeNumber = i;

            closeButton();
            controller(data);
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


function controller(data) {
    const modalPrev = document.querySelector('#modal-prev');
    modalPrev.addEventListener('click', () => {

        if(employeeNumber < data.length && employeeNumber > 0) {
            employeeNumber -= 1;

            const employee = data[employeeNumber];

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

        if(employeeNumber < (data.length -1) && employeeNumber >= 0) {
            employeeNumber += 1;

            const employee = data[employeeNumber];
    
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


// ------------------------------------------
//  SEARCH
// ------------------------------------------
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML("afterbegin", `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

const noResults = document.createElement('h3');
noResults.textContent = 'No Results Found!';
noResults.style.display = 'none'
gallery.parentNode.insertBefore(noResults, gallery.nextSibling);

searchButton = document.getElementById('search-submit');
// Search bar Event Listener
searchButton.addEventListener('click', () => {

  search(searchInput.value.toLowerCase(), employees)
    
});

searchInput = document.getElementById('search-input');
//The 'keyup' listener is a fast and sophisticated way to display the results as the user type for a search.
searchInput.addEventListener('keyup', () => {

    search(searchInput.value.toLowerCase(), employees)
   
});

let searchResults = [];
function search(input, filteredEmployees) {
    searchResults = filteredEmployees.filter( employee => 
        employee.name.first.includes(input) || employee.name.last.includes(input))

        if (input === "") {
            generateGallery(employees);
            displayModal(employees);
            noResults.style.display = 'none';
        } else {
            generateGallery(searchResults);
            displayModal(searchResults);
            noResults.style.display = 'none';

            if(searchResults.length === 0) {
                noResults.style.display = '';
            }
        }
}