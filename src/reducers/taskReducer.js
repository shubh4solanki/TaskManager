import {
    ADD_NEW_TASK,
    SET_TASK_COMPLETED,
    START_TASK,
    EDIT_TASK,
} from '../actions/types';

const INITIAL_STATE = {
    taskList: [],
    taskInProgress: false,
};

const DEFAULT_TASK_STATE = {
    completed: false,
    startTime: null,
    endTime: null,
    status: 'Pending',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_TASK:
            const id = Math.floor(Math.random()*(999-100+1)+100);
            return {
                ...state,
                taskList: [
                    ...state.taskList,
                    {
                        ...DEFAULT_TASK_STATE,
                        ...action.payload,
                        id,
                    }
                ]
            };

        case SET_TASK_COMPLETED:
            const taskIndex = state.taskList.findIndex(obj => {return obj.id === action.payload.id});

            state.taskList[taskIndex] = {
                ...state.taskList[taskIndex],
                completed: true,
                endTime: new Date(),
            };
            return {
                taskInProgress: false,
                ...state,
                taskList: state.taskList,
            };

        case START_TASK:
            const startTaskIndex = state.taskList.findIndex(obj => {return obj.id === action.payload.id});
            state.taskList[startTaskIndex] = {
                ...state.taskList[startTaskIndex],
                startTime: new Date(),
            };
            return {
                taskInProgress: true,
                ...state,
                taskList: state.taskList,
            };

        case EDIT_TASK:
            const editTaskIndex = state.taskList.findIndex(obj => {return obj.id === action.payload.id});
            state.taskList[editTaskIndex] = {
                ...state.taskList[editTaskIndex],
                ...action.payload,
            };
            return {
                ...state,
                taskList: state.taskList,
            };

        default:
            return state;
    }

}