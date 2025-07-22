import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from "react";
// import { WorkService } from "../service/Works/workService";
import WorkSlice from "../store/slice/Works/workSlice";


export const WorkContext = createContext(null);
const initialState = {
    works: [],
    work: null,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    pagination: {},
    limit: 10,
};

export const WorkProvider = ({ children }) => { 
    const [state, setState] = useState(initialState);
    const fetchWorksRef = useRef(null);

    const loadWorks = useCallback(async ({ page = state.currentPage,limit = state.limit, keyword = "",searchField = "" } = {}) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await WorkSlice.getState().fetchWorks({ page, keyword, limit, searchField });
            
            const { hasNextPage, hasPrevPage, limit: respLimit, nextPage, pagingCounter, prevPage, result, totalDocs, totalPages } = response;
            
            setState(prev => ({
                ...prev,
                works: response,
                pagination: {
                    hasNextPage,
                    hasPrevPage,
                    limit: respLimit,
                    nextPage,
                    pagingCounter,
                    prevPage,
                    totalDocs,
                    totalPages
                },
                currentPage: page,
                limit: respLimit,
                isLoading: false,
                error: null,
            }));
            return response;
        } catch (error) {
            console.error("Failed to load shifts:", error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || "Failed to load shifts",
            }));
            throw error;
        }
    }, [state.currentPage, state.limit]);

    const setPage = useCallback(async (newPage) => {
        setState(prev => ({ ...prev, currentPage: newPage }));
        try {
            await loadWorks({ page: newPage });
        } catch (error) {
            console.error("Error setting page:", error);
        }
    }, [loadWorks]);
    
    useEffect(() => {
        fetchWorksRef.current = loadWorks;
        if (fetchWorksRef.current) {
            fetchWorksRef.current();
        }
    }, [loadWorks]);

    const createWork = useCallback(async (workData) => {
        setState(prev => ({ ...prev,loading: true }));
        try {
            const response = await WorkSlice.getState().createNewWork(workData);
            await loadWorks()
            setState(prev => ({
                ...prev,
                // works: [...(Array.isArray(prev.works) ? prev.works : []), response.data],
                loading: false
            }));
            return response;
        } catch (error) {
            setState(prev => ({ ...prev, error: error.message, loading: false }));
            throw error;
        }
    }, []);

    const updateWork = useCallback(async (id, workData) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await WorkSlice.getState().updateWork(id, workData);
            console.log(workData)
            await loadWorks();
            setState(prev => ({
                ...prev,
                loading: false
            }));
            return response;
        } catch (error) {
            showError("Cập nhật thất bại");
            setState(prev => ({ ...prev, error: error.message, loading: false }));
            throw error;
        }
    }, []);

    const deleteWork = useCallback(async (workId) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await WorkSlice.getState().deleteWork(workId);
            await loadWorks();
            setState(prev => ({
                ...prev,
                loading: false
            }));
            return response;
        } catch (error) {
            setState(prev => ({ ...prev, error: error.message, loading: false }));
            throw error;
        }
    }, []);

    const contextValue = useMemo(() => ({
        ...state,
        loadWorks,
        createWork,
        updateWork,
        deleteWork,
        setPage
    }), [state,setPage, loadWorks, createWork, updateWork, deleteWork]);

    return (
        <WorkContext.Provider value={contextValue}>
            {children}
        </WorkContext.Provider>
    );
}

export const useWorkContext = () => {
    const context = useContext(WorkContext);
    if (!context) throw new Error('useWorkContext must be used within a WorkProvider');
    return context;
};
