import { useState, useEffect, useRef } from "react"
import { categoryMap } from "../../assets/icons"

// eslint-disable-next-line react/prop-types
const ShortcutButtons = ({ toggleCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState({})
  const panelRef = useRef(null)

  const togglePanel = () => setIsOpen((prev) => !prev)

  const handleCategoryClick = (categoryId) => {
    //toggleCategory(categoryId)
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleClicks = () => {
    toggleCategory(selectedCategories)
  }

  const handleClickOutside = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="containerforshortcutbuttons" ref={panelRef}>
      <button
        className="shortcut-button"
        style={{
          backgroundImage: "url(/options.png)", // Suora polku publicista
        }}
      ></button>
      <button
        className="shortcut-button"
        style={{ backgroundImage: "url(/gategory.png)" }}
        onClick={togglePanel}
      />

      <div className={`category-panel ${isOpen ? "open" : ""}`}>
        <div className="category-list" onClick={handleClicks()}>
          {Object.entries(categoryMap).map(([id, name]) => (
            <button
              key={id}
              className={`category-item ${
                selectedCategories[id] ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(Number(id))}
              style={{ backgroundImage: `url(/lajit/${name}.png)` }}
            />
          ))}
        </div>
      </div>
      <button
        className="shortcut-button"
        style={{
          backgroundImage: "url(/time.png)", // Suora polku publicista
        }}
      ></button>
    </div>
  )
}

export default ShortcutButtons
