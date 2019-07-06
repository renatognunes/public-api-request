const gallery = document.getElementById('gallery');


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(response => response.json())
    .then(generateGallery)
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
    const cards = data.results.map(employee => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
    `).join('');
    gallery.innerHTML = cards;
};

function generateModal(data) {
    const modal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.street}, ${employee.state} ${employee.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date.substring(6, 7)}/${employee.dob.date.substring(9, 10)}/${employee.dob.date.substring(0, 4)}</p>
            </div>
        </div>
    </div>`;
};

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
