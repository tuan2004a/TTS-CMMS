    //context/shiftContext.jsx
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
    // const [page, setPage] = useState(1);
    const fetchShiftsRef = useRef(null);

    const LoadShifts = useCallback(async () => {
        try {
            const response = await shiftSlice.getState().fetchShifts();
            // const shiftsToPage = await shiftSlice.getState().getToPageShifts(1, 10);
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

    const createShift = useCallback(async(formData) => {
        try {
            const response = await shiftSlice.getState().createNewShift(formData);
            console.log('tạo thành công');
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating shift");
        }
    },[] );

    const deleteShift = useCallback(async(shiftId) => {
        try {
            const response = await shiftSlice.getState().deleteShift(shiftId);
            console.log('xóa thành công');
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error deleting shift");
        }
    },[] );

    const contextValue = useMemo(() => ({
        ...state,
        LoadShifts,
        createShift,
        deleteShift,
    }), [state,LoadShifts,createShift,deleteShift]);

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