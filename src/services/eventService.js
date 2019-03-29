//const productionURL = "https://asknow-api.herokuapp.com/api/v1"
const devURL = "http://localhost:8080/api/v1"

export async function isAuthenticated(username, password) {
    await fetch(`${devURL}/login`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({username: username, password: password})
    }).then(res => {
        if (res.status === 200) {
            this
                .props
                .history
                .push('/');
            return true
        } else {
            const error = new Error(res.error);
            throw error;
        }
    }).catch(err => {
        console.error(err);
        alert('Error logging in please try again');
    });
}
