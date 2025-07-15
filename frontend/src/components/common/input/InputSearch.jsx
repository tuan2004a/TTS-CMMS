import { useState } from 'react'

const InputSearch = ({ onSearch, onClear, placeholder = 'Tìm kiếm' }) => {
  const [keyword, setKeyword] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault()
      onSearch(keyword.trim())
    }
  }

  const handleClear = () => {
    setKeyword('')
    if (onClear) onClear()
  }

  return (
    <label className="flex items-center w-full rounded-md bg-white shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition">
      {/* Icon tìm kiếm */}
      <div className="text-gray-400 px-3">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {/* Ô nhập liệu */}
      <input
        type="text"
        className="w-full py-2.5 outline-none border-none bg-transparent placeholder:text-gray-400"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Nút xóa nằm trong label */}
      {keyword && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 text-gray-500 focus:outline-none"
          title="Xóa từ khóa"
        >
          <i className="fa-solid fa-circle-xmark text-lg"></i>
        </button>
      )}
    </label>
  )
}

export default InputSearch
