const userInput = document.querySelector('#user');
const passInput = document.querySelector('#pass');
const loginButton = document.querySelector('#loginButton');
const host = 'http://localhost:8000/api/';

loginButton.addEventListener('click', () => {
    getLoginData();
})

function getLoginData() {
    let user = userInput.value;
    let pass = passInput.value;
    login(user, pass);
}

function login(user, pass) {
    
    let loginData = {
        name: user,
        password: pass
    };
    console.log(JSON.stringify(loginData))
    let endpoint = 'login';
    let url = host + endpoint;
    fetch(url, {
        method: 'post',
        body: JSON.stringify(loginData),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.token);
        localStorage.setItem('token', result.token);
    })
    .catch(err => {
        console.log('Hiba');
        console.log(err);
    });
}
