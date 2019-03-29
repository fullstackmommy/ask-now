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

export async function getAllEvents() {
    const response = await fetch(`${devURL}/api/v1/events`)
    const data = await response.json()
    return data.sort((a, b) => (a.id > b.id)
        ? 1
        : -1)
}

export async function deleteEvent(eventId) {
    return fetch(`${devURL}/api/v1/events/${eventId}`, {method: 'DELETE'})
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}

export async function saveEvent(event) {
    return fetch(`${devURL}/api/v1/events/`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                id: event.id,
                name: event.name,
                organizer: event.organizer,
                speaker: event.speaker,
                startDate: event.startDate,
                endDate: event.endDate,
                venue: event.venue
            })
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}
