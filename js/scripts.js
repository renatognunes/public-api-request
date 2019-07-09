const gallery = document.getElementById('gallery');
let employees;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => employees = data.results)
    .then(employees => {
        generateGallery(employees)
        displayModal(employees)
    })
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

function generateModalContainer() {
    return modalContainer = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`
};

function generateModalInfoContainer(data, index) {
    const employee = data[index];
    const modalInfoContainer = document.querySelector('.modal-info-container');
    modalInfoContainer.innerHTML = `
        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p class="modal-text">${formatPhoneNumber(employee.phone)}</p>
        <p class="modal-text">${toTitleCase(employee.location.street)}, ${getStateTwoDigitCode(employee.location.state)} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${employee.dob.date.substring(5, 7)}/${employee.dob.date.substring(8, 10)}/${employee.dob.date.substring(0, 4)}</p>`;
};

//https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function formatPhoneNumber(str) {
return str.replace(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/, '($1) $2-$3')
}

//https://gist.github.com/calebgrove/c285a9510948b633aa47
getStateTwoDigitCode = function (stateFullName) {
    return this.stateList[stateFullName];
    }
    
    stateList = {
    'arizona': 'AZ',
    'alabama': 'AL',
    'alaska':'AK',
    'arkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY',
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

let employeeNumber = 0;

function displayModal(data) {
    for(let i = 0; i < gallery.children.length; i++) {
        gallery.children[i].addEventListener('click', () => {

            gallery.insertAdjacentHTML("afterend", generateModalContainer());
            generateModalInfoContainer(data, i);

            employeeNumber = i;
            toggleModal(data);
        });
    }
}

function toggleModal(data) {
    const modal = document.querySelector('.modal-container');

    modal.addEventListener('click', (event) => {
        if(event.target.textContent === 'X') {

            modal.remove();

        } else if(event.target.textContent === 'Next') {
            if(employeeNumber < (data.length -1) && employeeNumber >= 0) {

                employeeNumber += 1;
                generateModalInfoContainer(data, employeeNumber);
            }
        } else if(event.target.textContent === 'Prev') {
            if(employeeNumber <= (data.length -1) && employeeNumber > 0) {

                employeeNumber -= 1;
                generateModalInfoContainer(data, employeeNumber);
            }
        }
    });
};


// ------------------------------------------
//  SEARCH
// ------------------------------------------
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML("afterbegin", `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`);

const noResults = document.createElement('h3');
noResults.textContent = 'No Results Found!';
noResults.style.display = 'none'
gallery.parentNode.insertBefore(noResults, gallery.nextSibling);


// Search bar Event Listener
searchButton = document.getElementById('search-submit');
searchButton.addEventListener('click', () => {
  search(searchInput.value.toLowerCase(), employees)
});

//The 'keyup' listener is a fast and sophisticated way to display the results as the user type for a search.
searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    search(searchInput.value.toLowerCase(), employees)
});

let searchResults = [];
function search(input, filteredEmployees) {
    searchResults = filteredEmployees.filter( employee => 
        employee.name.first.includes(input) || employee.name.last.includes(input) );

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
};