const dolgozoTorzs = document.querySelector("#dolgozoTorzs");
const nameInput = document.querySelector('#nameInput');
const cityInput = document.querySelector('#cityInput');
const salaryInput = document.querySelector('#salaryInput');
const addButtonSave = document.querySelector('#addButtonSave');

const idEditInput = document.querySelector('#idEditInput');
const nameEditInput = document.querySelector('#nameEditInput');
const cityEditInput = document.querySelector('#cityEditInput');
const salaryEditInput = document.querySelector('#salaryEditInput');
const updateButtonSave = document.querySelector('#updateButtonSave');


const host = 'http://localhost:8000/api/';
const endpoint = 'employees';
const url = host + endpoint;

getEmployees();

function getEmployees() {
    fetch(url)
    .then( (response) => response.json() )
    .then( (result) => {
        console.log(result);
        loadEmployees(result);
    })
    .catch( (err) => console.log(err));   
}

function loadEmployees(dolgozoLista) {
    dolgozoLista.forEach((dolgozo) => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCity = document.createElement('td');
        let tdSalary = document.createElement('td');
        tdId.textContent = dolgozo.id;
        tdName.textContent = dolgozo.name;
        tdCity.textContent = dolgozo.city;
        tdSalary.textContent = dolgozo.salary;
        dolgozoTorzs.append(tr);
        tr.append(tdId);
        tr.append(tdName);
        tr.append(tdCity);
        tr.append(tdSalary);
        tr.append(generateDeleteButton(dolgozo.id));
        tr.append(generateModifyButton(dolgozo));
    });
}

function generateDeleteButton(id) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Törlés';
    button.classList = 'btn btn-primary';
    button.addEventListener('click', () => {
        console.log(id)
        deleteEmployee(id);
    });
    td.append(button);
    return td;
}
function generateModifyButton(employee) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'Szerkesztés';
    button.classList = 'btn btn-primary';
    
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modifyModal');

    button.addEventListener('click', () => {
        console.log(employee.id)
        idEditInput.value = employee.id;
        nameEditInput.value = employee.name;
        cityEditInput.value = employee.city;
        salaryEditInput.value = employee.salary;
    });
    td.append(button);
    return td;
}

function deleteEmployee(id) {
    let fullurl = url + '/' + id;
    let token = localStorage.getItem('token');
    fetch(fullurl, {
        method: 'delete',
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        dolgozoTorzs.textContent = '';
        getEmployees();
    })
    .catch(err => console.log(err));
}

addButtonSave.addEventListener('click', () => {
    addEmployee();
    clearInputElements();
});

function addEmployee() {
    let name = nameInput.value;
    let city = cityInput.value;
    let salary = salaryInput.value;
    let token = localStorage.getItem('token');
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "city": city,
            "salary": salary
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then( response => response.json())
    .then(result => {
        console.log(result);
        dolgozoTorzs.textContent = '';
        getEmployees();    
    })
    .catch(err => console.log(err))
    ;
}

function clearInputElements() {
    nameInput.value = '';
    cityInput.value = '';
    salaryInput.valule = '';
}


updateButtonSave.addEventListener('click', () => {
    
    let id = idEditInput.value;
    let name = nameEditInput.value;
    let city = cityEditInput.value;
    let salary = salaryEditInput.value;    
    let employee = {
        id: id,
        name: name,
        city: city,
        salary: salary
    }    
    updateEmployee(employee);
})

function updateEmployee(emp) {
    console.log(emp);
    console.log(JSON.stringify(emp));
    let urlSec = url + "/" + emp.id;
    console.log(urlSec);
    let token = localStorage.getItem('token');
    fetch(urlSec, {
        method: 'put',
        body: JSON.stringify(emp),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        dolgozoTorzs.textContent = '';
        getEmployees();
    })
    .catch(err => console.log(err));

}