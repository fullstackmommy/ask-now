const getURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://asknow-api.herokuapp.com"
  } else {
    return "http://localhost:8080"
  }
}

const baseURL = getURL()

export function signin(username, password) {
  return fetch(`${baseURL}/auth/signin`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
}

export function signout() {
  return fetch(`${baseURL}/auth/signout`, {method: 'GET'}).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}