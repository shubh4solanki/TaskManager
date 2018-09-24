import {
    ADD_NEW_TASK,
    SET_TASK_COMPLETED,
    START_TASK,
    EDIT_TASK,
} from './types';

export const addNewTask = (title, notes) => {
    return ({
        type: ADD_NEW_TASK,
        payload: {
            title,
            notes,
        }
    });
};

export const setTaskCompleted = (id) => {
    return ({
        type: SET_TASK_COMPLETED,
        payload: {
            id,
        }
    });
};

export const startTask = (id) => {
    return ({
        type: START_TASK,
        payload: {
            id,
        }
    });
};

export const editTask = (id, title, notes) => {
    return ({
        type: EDIT_TASK,
        payload: {
            title,
            notes,
            id,
        }
    })
};