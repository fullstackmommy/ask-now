import auth from '../components/auth/auth-helper'

const getURL = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://asknow-api.herokuapp.com"
    } else {
        return "http://localhost:8080"
    }
}

const baseURL = getURL()

export async function isValidEvent(eventId) {
    try {
        const response = await fetch(`${baseURL}/api/v1/events/${eventId}`)
        return await response.json()
    } catch (e) {
        console.error(e)
        alert('Please enter valid event code')
    }
}

export async function getAllEvents() {
    const response = await fetch(`${baseURL}/api/v1/events`)
    const data = await response.json()
    return data.sort((a, b) => (a.id > b.id)
        ? 1
        : -1)
}

export async function deleteEvent(eventId) {
    const jwt = auth.isAuthenticated()
    return fetch(`${baseURL}/api/v1/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}

export async function saveEvent(event) {
    try {
        const jwt = auth.isAuthenticated()
        const response = await fetch(`${baseURL}/api/v1/events/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt.token
            },
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
        return await response.json()
    } catch (e) {
        console.error(e)
        alert('Event code is already used')
    }
}
