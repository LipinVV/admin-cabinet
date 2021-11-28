import React, {useReducer, Dispatch} from 'react';
import {userCard} from '../services/user';
import {taskType} from '../services/tasks';

type StateType = {
    users: userCard[],
    tasks: taskType[],
}

export const INITIAL_STATE: StateType = {
    users: [],
    tasks: [],
}

export enum ACTION {
    SET_USER = 'SET_USER',
    SET_TASK = 'SET_TASK',
}

type ActionType = { action: ACTION, data: any }

export const StoreContext = React.createContext<{ state: StateType, dispatch: Dispatch<ActionType> }>({
    state: INITIAL_STATE,
    dispatch: () => null,
});

interface StorageProps {
    children: React.ReactNode,
}

const reducer = (currentState: StateType, payLoad: ActionType): StateType => {
    switch (payLoad.action) {
        case ACTION.SET_USER:
            return {
                ...currentState, users: payLoad.data
            }
        case ACTION.SET_TASK:
            let currentTasks = currentState.tasks;
            currentTasks.push(payLoad.data);
            return {
                ...currentState, tasks: currentTasks
            }

        default: {
            return currentState
        }
    }
}

export const Storage = ({children}: StorageProps) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}