export interface DataModelInterface {
    _id: string;
    project_id: string;
    name: string;
    desc: string;
    progress: number;
    startDate: Date;
    endDate: Date;
    [x: string]: any;
};
export const dataModel = [
    {
        "_id": "aef27580-b6c8-4697-ba10-995f2e85e7d3",
        "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
        "name": "Delta",
        "description": "Delta is cute",
        "progress": 12,
        "start_date": {
            "$date": "2023-09-11T17:00:00.000Z",
        },
        "end_date": {
            "$date": "2023-09-14T17:00:00.000Z"
        },
        "task": true,
        "chat_id": "3b461862-c0a3-41ea-b182-8c56455e7bba",
        "folder_id": "9fd6f6d6-4cbe-4c16-afdb-303623105788",
        "__v": 0

    },
    {
        "_id": "6195bb34-2dc4-49e7-ba43-426e16048e4c",
        "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
        "name": "Sleep",
        "description": "aaaaaa",
        "progress": 0,
        "start_date": {
            "$date": "2023-09-01T17:00:00.000Z"
        },
        "end_date": {
            "$date": "2023-09-07T17:00:00.000Z"
        },
        "task": true,
        "chat_id": null,
        "folder_id": null,
        "__v": 0
    },
    {
        "_id": "0918e326-f066-412a-b317-bcf2a827bc53",
        "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
        "name": "Time to rinnnnnnnnnnnakdjnakjednaeklwd",
        "description": "Kai maidee AMD",
        "progress": 12,
        "start_date": {
            "$date": "2023-09-20T17:00:00.000Z"
        },
        "end_date": {
            "$date": "2023-09-30T17:00:00.000Z"
        },
        "task": false,
        "chat_id": null,
        "folder_id": null,
        "__v": 0
    },
    {
        "_id": "5fba3837-8a71-4814-851a-c1332afe386f",
        "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
        "name": "Princess Elle",
        "description": "Kai maidee AMD",
        "progress": 0,
        "start_date": {
            "$date": "2023-09-28T17:00:00.000Z"
        },
        "end_date": {
            "$date": "2023-09-30T17:00:00.000Z"
        },
        "task": false,
        "chat_id": null,
        "folder_id": null,
        "archived": false,
        "__v": 0
    },
    {
        "_id": "53384bb5-ea62-45f5-90c4-a2aa28e5839a",
        "project_id": "55e99b38-b79e-4f18-803b-91329049188f",
        "name": "Princess Elle",
        "description": "Kai maidee AMD",
        "progress": 99,
        "start_date": {
            "$date": "2023-10-08T17:00:00.000Z"
        },
        "end_date": {
            "$date": "2023-10-0T17:00:00.000Z"
        },
        "task": false,
        "chat_id": null,
        "folder_id": null,
        "archived": false,
        "__v": 0
    }
];