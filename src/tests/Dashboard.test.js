import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {render, fireEvent} from "react-testing-library";
import Dashboard from '../components/Dashboard'
import * as EventService from '../services/eventService'

beforeEach(() => {
    let sampleData = [
        {
            id: "SJADES2018",
            name: "SJADES 2018 Scientific Talk",
            organizer: "Lee Kong Chian Natural History Museum",
            speaker: "Iffah Binte Iesa",
            startDate: "16 Mar 2019",
            endDate: "16 Mar 2019",
            venue: "Lee Kong Chian Natural History Museum",
            questions: [
                {
                    description: "How did you select the specimens?",
                    vote: 5
                }, {
                    description: "How did you prepare the specimens?",
                    vote: 10
                }, {
                    description: "Why the specimens don't turn mouldy over time?",
                    vote: 20
                }, {
                    description: "How did you handle the garbage collected in the trawlers?",
                    vote: 25
                }
            ]
        }, {
            id: "PM032019",
            name: "Translocation and inspiration: Javanese Batik in Europe and Africa",
            organizer: "The Peranakan Museum Singapore",
            speaker: "Dr Maria Wronska-Friend",
            startDate: "2 Mar 2019",
            endDate: "2 Mar 2019",
            venue: "The Peranakan Museum Singapore",
            questions: {
                description: "How to identify industrially produced batik design?",
                vote: 10
            }
        }, {
            id: "IK032019",
            name: "Ikebana",
            organizer: "Yamano Florist & Ikebana School",
            speaker: "Kazumi Ishikawa",
            startDate: "21 Mar 2019",
            endDate: "21 Mar 2019",
            venue: "Shangri-la Hotel Singapore",
            questions: {
                description: "Is Ikebana an evolving art?",
                vote: 15
            }
        }
    ]

    jest
        .spyOn(EventService, "getAllEvents")
        .mockImplementation(() => sampleData)
    jest
        .spyOn(EventService, "deleteEvent")
        .mockImplementation(id => {
            sampleData = sampleData.filter(item => item.id !== id)
        })
})
afterEach(() => {
    EventService
        .getAllEvents
        .mockRestore();
})

xtest("display list of events on load", () => {
    const history = createMemoryHistory({initialEntries: ["/"]});
    const {getByText} = render(
        <Router history={history}>
            <Dashboard/>
        </Router>
    );

    expect(EventService.getAllEvents).toHaveBeenCalledTimes(1);
    expect(getByText(/SJADES/i)).toBeInTheDocument();
    expect(getByText(/PM03/i)).toBeInTheDocument();
    expect(getByText(/IK03/i)).toBeInTheDocument();
})