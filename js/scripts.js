/** Initial global variables */
const gallery = document.getElementById('gallery');
/** This variable will hold the data from the fetch URL */
let employees;


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/** 
 * Fetch data from public API and retrieve data to a global variable.
 * @callback generateGalley
 * @callback displayModal
 * @param {array} employees
 */
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

/** 
 * Check status of a promise.
 * @param {promise} response
 */
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/** 
 * Generate HTML block of elements for each item in the array and append to the DOM.
 * @param {array}
 */
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

/** 
 * Generate the modal HTML container skeleton.
 * @return {string}
 */
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

/** 
 * Generate a HTML modal container with info from an employee using an array as argument and an index to specify the item to be used as parameter.
 * @param {number}
 * @param {array}
 * Append the HTML block to modal skeleton generated in the function above.
 */
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

/** 
 * Format the phone number wit regex.
 * @param {string}
 * @return {string} formated phone number
 */
function formatPhoneNumber(phone) {
    return phone.replace(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/, '($1) $2-$3')
};

/** 
 * Format address string to first characters uppercase.
 * @param {string}
 * Code adapted from {@link https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991}
 * @return {string} formated address
 */
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    )
};

/** 
 * Format state to two characters abbreviated format.
 * @param {string}
 * Code adapted from {@link https://gist.github.com/calebgrove/c285a9510948b633aa47}
 * @return {string} formated state
 */
function getStateTwoDigitCode(stateFullName) {
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

/** Holds the index of the clicked card in the gallery */
let employeeNumber = 0;

/** 
 * Create an event listener to each card in galery.
 * @param {array}
 * The index of the clicked card is used as an argument to invoke the following functions.
 * @fires generateModalContainer
 * @fires generateModalIndoContainer
 * Assign the card index clicked to the cardIndex variable.
 * @fires toggleModal passing the same parameter its argument.
 */
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

/** 
 * Create an event listener to the modal buttons, CloseButton, NextModal, and PrevModal.
 * The event listener will use the cardIndex value to toggle the modals back and forth.
 * @param {array}
 */
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

/** Append the search bar to the DOM */
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML("afterbegin", `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`);

/** Append a message to the DOM in case no results in found during the search */
const noResults = document.createElement('h2');
noResults.textContent = 'No Results Found!';
noResults.style.display = 'none'
gallery.parentNode.insertBefore(noResults, gallery.nextSibling);


/** Search bar Event Listener 
 * @fires search function passing input as its argument.
*/
searchButton = document.getElementById('search-submit');
searchButton.addEventListener('click', () => {
  search(searchInput.value.toLowerCase(), employees)
});

/**
 * The 'keyup' listener is a fast and sophisticated way to display the results as the user type for a search.
 * @fires search function passing input as its argument.
 */
searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    search(searchInput.value.toLowerCase(), employees)
});

/** Hold the elements filtered from the search */
let searchResults = [];

/**
 * Takes the input from the user and filter the current elements in the employee array.
 * @param {string} input
 * @param {array} employee
 * If the search input value is empty it will display all cards in the gallery.
 * Else it will display the cards filtered and assigned to the seachResults variable.
 * If no results has been found, a message will be displayed. 
 */
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