import { useState, useEffect, useRef } from "react"
import { categoryMap } from "../../assets/icons"
import DatePicker from "react-multi-date-picker"

// eslint-disable-next-line react/prop-types
const ShortcutButtons = ({ toggleCategory }) => {
  const [moreIsOpen, setMoreIsOpen] = useState(false)
  const [catIsOpen, setCatIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState({})
  const panelRef = useRef(null)

  const handleCalendarToggle = (openCalendar) => {
    if (moreIsOpen || catIsOpen) {
      setCatIsOpen(false)
      setMoreIsOpen(false)
      setTimeout(() => openCalendar(), 300) // Avaa kalenteri
    } else {
      openCalendar()
    }
  }

  const toggleCatPanel = () => {
    setMoreIsOpen(false)
    if (catIsOpen) {
      setCatIsOpen(false)
    } else {
      setTimeout(() => setCatIsOpen(true), 300)
    }
  }

  const toggleMorePanel = () => {
    setCatIsOpen(false)
    if (moreIsOpen) {
      setMoreIsOpen(false)
    } else {
      setTimeout(() => setMoreIsOpen(true), 300)
    }
  }

  const handleCategoryClick = (categoryId) => {
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
      setCatIsOpen(false)
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
        onClick={toggleMorePanel}
      />
      <div className={`more-panel ${moreIsOpen ? "open" : ""}`}>
        <div>Päivä Aika</div>
      </div>
      <button
        className="shortcut-button"
        style={{ backgroundImage: "url(/gategory.png)" }}
        onClick={toggleCatPanel}
      />
      <div className={`category-panel ${catIsOpen ? "open" : ""}`}>
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
      <DatePicker
        onChange={(newDates) => console.log(newDates)}
        range
        minDate={Date.now()}
        zIndex={1005}
        displayWeekNumbers={true}
        calendarPosition="top"
        render={(value, openCalendar) => (
          <div
            className="time-shortcut-button"
            onClick={() => handleCalendarToggle(openCalendar)}
            style={{
              backgroundImage: "url(/time.png)", // Suora polku publicista
              overflow: "visible",
            }}
          ></div>
        )}
        format="DD.MM.YYYY"
        weekStartDayIndex={1}
      />
    </div>
  )
}

export default ShortcutButtons
