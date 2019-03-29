//const productionURL = "https://asknow-api.herokuapp.com"
const devURL = "http://localhost:8080"

export function signin(username, password) {
    return fetch(`${devURL}/auth/signin`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({username: username, password: password})
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}
