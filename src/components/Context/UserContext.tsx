import React from 'react';
import { User} from '../../types'  

interface UserContextData {
    data: User[],
    addUser?: (user :User)=> void,
    addBatchUser?: (user: User[])=> void,
    deleteUser?: (user: User)=> void,
    updateUser?: (user: User)=> void,
}

export const USER_CONTEXT_INIT_STATE: UserContextData = {
    data: [],
    addUser: (user: User)=> console.log('[addUser]'),
    addBatchUser: (users: User[])=> console.log('[addBatchUser]', users),
    deleteUser: (user: User)=> console.log('[deleteUser]', user),
    updateUser: (user: User)=> console.log('[updateUser]', user),
};

export const UserContext = React.createContext<UserContextData>(USER_CONTEXT_INIT_STATE);