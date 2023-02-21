
const host = 'http://localhost:3000/';
const endpoint = 'employees';
const url = host + endpoint;

fetch(url)
.then( (response) => response.json() )
.then( (result) => {
    console.log(result);
    loadEmployees(result);
})
.catch( (err) => console.log(err));


const dolgozoTorzs = document.querySelector("#dolgozoTorzs");

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
    });
}



