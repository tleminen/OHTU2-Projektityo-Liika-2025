import { useState, useEffect, useRef } from "react"
import { categoryMap } from "../../assets/icons"
import DatePicker from "react-multi-date-picker"

// eslint-disable-next-line react/prop-types
const ShortcutButtons = ({ toggleCategory }) => {
  const [moreIsOpen, setMoreIsOpen] = useState(false)
  const [catIsOpen, setCatIsOpen] = useState(false)
  const [timeIsOpen, setTimeIsOpen] = useState(false)
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState({})
  const panelRef = useRef(null)

  const handleCalendarToggle = (openCalendar) => {
    openCalendar() // Avaa kalenteri
    setCalendarIsOpen((prev) => !prev) // Päivitä tila
  }

  const toggleCatPanel = () => {
    setMoreIsOpen(false)
    setTimeIsOpen(false)
    if (catIsOpen) {
      setCatIsOpen(false)
    } else {
      setTimeout(() => setCatIsOpen(true), 400)
    }
  }

  const toggleMorePanel = () => {
    setTimeIsOpen(false)
    setCatIsOpen(false)
    if (moreIsOpen) {
      setMoreIsOpen(false)
    } else {
      setTimeout(() => setMoreIsOpen(true), 400)
    }
  }

  const toggleTimePanel = () => {
    setMoreIsOpen(false)
    setCatIsOpen(false)
    if (timeIsOpen) {
      setTimeIsOpen(false)
    } else {
      setTimeout(() => setTimeIsOpen(true), 400)
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
      <button
        className="shortcut-button"
        style={{
          backgroundImage: "url(/time.png)", // Suora polku publicista
        }}
        onClick={toggleTimePanel}
      />
      <div
        className={`time-panel ${timeIsOpen ? "open" : ""} ${
          calendarIsOpen ? "expanded" : ""
        }`}
      >
        <div className="time-list">
          <h1>Rajoita aikavälille</h1>
          <DatePicker
            className="time-item"
            onChange={(newDates) => console.log(newDates)}
            range
            style={{ textAlign: "center" }}
            minDate={Date.now()}
            zIndex={1005}
            displayWeekNumbers={true}
            render={(value, openCalendar) => (
              <div
                className="custom-date-display"
                onClick={() => handleCalendarToggle(openCalendar)}
              >
                {Array.isArray(value) ? (
                  value.map((date, index) => <div key={index}>{date}</div>)
                ) : (
                  <span>{value || "Valitse päivät"}</span>
                )}
              </div>
            )}
            format="DD.MM.YYYY"
            weekStartDayIndex={1}
          />
        </div>
      </div>
    </div>
  )
}

export default ShortcutButtons
