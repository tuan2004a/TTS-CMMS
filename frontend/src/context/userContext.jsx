import React, {createContext,useState,useCallback,useContext,useEffect,useMemo,useRef} from 'react';
import userSlice from '../store/slice/Users/userSlice';

export const UserContext = createContext(null);

const initialState = {
    users: [],
    isLoading: false,
    error: null,
}

export const UserProvider = ({ children }) => {
    const [state, setState] =  useState(initialState);
    const fetchUsersRef = useRef(null);

    const LoadUsers = useCallback(async () => {
        try {
            const response = await userSlice.getState().fetchUsers();
            setState({
                users: response,
                isLoading: false,
                error: null,
            });
            // console.log(response);
            return response;
        } catch (error) {
            setState({
                users: [],
                isLoading: false,
                error,
            });
        }
    }, []);
    
    useEffect(() => {
        fetchUsersRef.current = LoadUsers;
        if (fetchUsersRef.current) {
            fetchUsersRef.current();
        }
    }, [LoadUsers]);
    
    const contextValue = useMemo(() => ({
        ...state,
        LoadUsers,
    }), [LoadUsers, state]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};