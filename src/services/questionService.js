//const productionURL = "https://asknow-api.herokuapp.com/api/v1"
const devURL = "http://localhost:8080/api/v1"

export async function isValidEvent(eventId) {
    try {
        const response = await fetch(`${devURL}/events/${eventId}`)
        return await response.json()
    } catch (e) {
        console.error(e)
        alert('Please enter valid event code')
    }
}

export async function getQuestions(eventId) {
    const response = await fetch(`${devURL}/events/${eventId}/questions`)
    const data = await response.json();
    return data.sort((a, b) => (a.vote > b.vote)
        ? -1
        : 1);
}

export async function saveQuestion(questionDesc, eventId) {
    await fetch(`${devURL}/events/${eventId}/questions/`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({description: questionDesc, event: eventId})
    }).then((res) => res.json()).catch((err) => console.log(err))
}

export async function deleteQuestion(qid, eventId) {
    await fetch(`${devURL}/events/${eventId}/questions/${qid}`, {
        method: 'DELETE',
        headers: new Headers({'Content-Type': 'application/json'})
    }).catch((err) => console.log(err))
}

export async function updateQuestionVote(qid, eventId, newVote) {
    await fetch(`${devURL}/events/${eventId}/questions/${qid}`, {
        method: 'PUT',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({vote: newVote})
    }).catch((err) => console.log(err))
}
