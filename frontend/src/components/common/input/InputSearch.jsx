import { useState, useEffect, memo } from "react";
import PropTypes from 'prop-types';

const InputSearch = ({ onSearch, onClear, placeholder = "Tìm kiếm", value, onChange }) => {
    const [internalValue, setInternalValue] = useState("");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    
    useEffect(() => {
        if (isControlled) {
            setInternalValue(value);
        }
    }, [value, isControlled]);

    useEffect(() => {
        if (!isControlled && onSearch) {
            const delaySearch = setTimeout(() => {
                onSearch(internalValue.trim());
            }, 300);
            
            return () => clearTimeout(delaySearch);
        }
    }, [internalValue, onSearch, isControlled]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSearch) {
            e.preventDefault();
            onSearch(currentValue.trim());
        }
    };

    const handleClear = () => {
        if (isControlled && onChange) {
            onChange({ target: { value: "" } });
        } else {
            setInternalValue("");
        }
        if (onClear) onClear();
    };

    const handleChange = (e) => {
        if (isControlled && onChange) {
            onChange(e);
        } else {
            setInternalValue(e.target.value);
        }
    };

    return (
        <label className="flex items-center w-full rounded-md bg-white shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <div className="text-gray-400 px-3">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <input 
                type="text" 
                className="w-70 py-2.5 outline-none border-none bg-transparent placeholder:text-gray-400" 
                placeholder={placeholder} 
                value={currentValue} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown} 
            />

            {currentValue && (
                <button 
                    type="button" 
                    onClick={handleClear} 
                    className="px-3 text-gray-500 focus:outline-none" 
                    title="Xóa từ khóa"
                    aria-label="Clear search"
                >
                    <i className="fa-solid fa-circle-xmark text-lg"></i>
                </button>
            )}
        </label>
    );
};

InputSearch.propTypes = {
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(InputSearch);
