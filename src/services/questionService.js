//const axios = require('axios');

let questions = [
    {
        id: "1",
        eventid: "1",
        description: "How do you select the specimens?",
        vote: 10
    }, {
        id: "2",
        eventid: "1",
        description: "How do you prepare the specimens?",
        vote: 1
    }, {
        id: "3",
        eventid: "1",
        description: "Why can't we use flash when taking pictures?",
        vote: 5
    }, {
        id: "4",
        eventid: "1",
        description: "Why the specimens don't turn mouldy over time?",
        vote: 20
    }
];

export async function getQuestions(eventId) {
    const response = await fetch(`https://asknow-api.herokuapp.com/api/v1/events/${eventId}`)
    const data = await response.json();
    return data.questions;
}

export function saveQuestion(questionDesc) {
    const newQuestion = {
        id: questions.length + 1,
        eventid: "1",
        description: questionDesc,
        vote: 1
    }
    questions.push(newQuestion)
    return newQuestion
}

export function deleteQuestion(id) {
    const found = questions.find(question => question.id === id);
    questions = questions.filter(question => question.id !== id);
    return found;
}
