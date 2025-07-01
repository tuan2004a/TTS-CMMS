import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import shiftSlice from "../store/slice/Users/shiftSlice";

export const ShiftContext =  createContext(null);

const initialState = {
    shifts: [],
    isLoading: false,
    error: null,
}

export const ShiftProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    const fetchShiftsRef = useRef(null);

    const LoadShifts = useCallback(async () => {
        try {
            const response = await shiftSlice.getState().fetchShifts();
            setState({
                shifts: response,
                isLoading: false,
                error: null,
            });
            // console.log(response);
            return response;
        } catch (error) {
            setState({
                shifts: [],
                isLoading: false,
                error,
            });
        }
    }, []);

    useEffect(() => {
        fetchShiftsRef.current = LoadShifts;
        if (fetchShiftsRef.current) {
            fetchShiftsRef.current();
        }
    }, [LoadShifts]);

    const contextValue = useMemo(() => ({
        ...state,
        LoadShifts,
    }), [LoadShifts, state]);

    return (
        <ShiftContext.Provider value={contextValue}>
            {children}
        </ShiftContext.Provider>
    );
}

export const useShiftContext = () => {
    const context = useContext (ShiftContext);
    if (!context) throw new Error('useShiftContext must be used within a ShiftProvider');
    return context;
}
