let questions = [
    {
        _id: "1",
        eventid: "1",
        description: "How do you select the specimens?",
        vote: 10
    }, {
        _id: "2",
        eventid: "1",
        description: "How do you prepare the specimens?",
        vote: 1
    }, {
        _id: "3",
        eventid: "1",
        description: "Why can't we use flash when taking pictures?",
        vote: 5
    }, {
        _id: "4",
        eventid: "1",
        description: "Why the specimens don't turn mouldy over time?",
        vote: 20
    }
];

export function getQuestions() {
    return questions;
}

export function saveQuestion(questionDesc) {
    const newQuestion = {
        _id: questions.length + 1,
        eventid: "1",
        description: questionDesc,
        vote: 1
    }
    questions.push(newQuestion)
    return newQuestion
}

export function deleteQuestion(id) {
    const found = questions.find(question => question._id === id);
    questions = questions.filter(question => question._id !== id);
    return found;
}
