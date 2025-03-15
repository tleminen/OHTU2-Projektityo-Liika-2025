import { useState, useEffect, useRef } from "react"
import { categoryMap } from "../../assets/icons"
import DatePicker from "react-multi-date-picker"

// eslint-disable-next-line react/prop-types
const ShortcutButtons = ({ toggleCategory }) => {
  const [moreIsOpen, setMoreIsOpen] = useState(false)
  const [catIsOpen, setCatIsOpen] = useState(false)
  const [timeIsOpen, setTimeIsOpen] = useState(false)
  const [timeSelectIsOpen, setTimeSelectIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState({})
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [selectedQuick, setSelectedQuick] = useState(null)
  const [overflowVisibility, setOverflowVisibility] = useState(false)
  const panelRef = useRef(null)
  const timeInputRef = useRef(null)

  const handleCalendarToggle = (openCalendar) => {
    if (moreIsOpen || catIsOpen || timeSelectIsOpen) {
      setCatIsOpen(false)
      setMoreIsOpen(false)
      setTimeSelectIsOpen(false)
      setTimeout(() => openCalendar(), 300) // Avaa kalenteri
    } else {
      openCalendar()
    }
  }

  const handleEndtimeChange = (e) => {
    setEndTime(e.target.value)
  }
  const handleStarttimeChange = (e) => {
    setStartTime(e.target.value)
  }

  const openTimePicker = () => {
    if (timeInputRef.current) {
      timeInputRef.current.click() // Klikkaa inputia, avaa ajanvalitsimen
    }
  }

  const handleQuickTime = (button) => {
    setSelectedQuick(button)
    switch (button) {
      case 1:
        console.log("painettiin 3h")
        break
      case 2:
        console.log("painettiin 1d")
        break
      case 3:
        console.log("painettiin 7d")
        break
      case 4:
        console.log("painettiin 1kk")
        break
    }
  }

  const toggleCatPanel = () => {
    setMoreIsOpen(false)
    setTimeIsOpen(false)
    setTimeSelectIsOpen(false)
    setOverflowVisibility(false)
    if (catIsOpen) {
      setCatIsOpen(false)
    } else {
      setTimeout(() => setCatIsOpen(true), 300)
    }
  }

  const toggleMorePanel = () => {
    setCatIsOpen(false)
    setTimeIsOpen(false)
    setOverflowVisibility(false)
    setTimeSelectIsOpen(false)
    if (moreIsOpen) {
      setMoreIsOpen(false)
    } else {
      setTimeout(() => setMoreIsOpen(true), 300)
    }
  }

  const toggleTimePanel = () => {
    setMoreIsOpen(false)
    setCatIsOpen(false)
    setTimeSelectIsOpen(false)
    if (timeIsOpen) {
      setTimeIsOpen(false)
      setOverflowVisibility(false)
    } else {
      setTimeout(() => setTimeIsOpen(true), 300)
      setTimeout(() => setOverflowVisibility(true), 600)
    }
  }

  const toggleTimeSelectPanel = () => {
    setTimeSelectIsOpen((prev) => !prev)
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
      setMoreIsOpen(false)
      setTimeIsOpen(false)
      setTimeSelectIsOpen(false)
      setOverflowVisibility(false)
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
        <div>...</div>
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
        style={{ backgroundImage: "url(/timeDate.png)" }}
        onClick={toggleTimePanel}
      />
      <div
        className={`time-panel ${timeIsOpen ? "open" : ""}`}
        style={{ overflow: overflowVisibility ? "visible" : "hidden" }}
      >
        <div className="time-list">
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
                  backgroundImage: "url(/calendar.png)", // Suora polku publicista
                  overflow: "visible",
                }}
              ></div>
            )}
            format="DD.MM.YYYY"
            weekStartDayIndex={1}
          />

          <button
            className="time-shortcut-button"
            style={{ backgroundImage: "url(/time.png)" }}
            onClick={toggleTimeSelectPanel}
          />
          <div
            className={`time-select-panel ${timeSelectIsOpen ? "open" : ""}`}
          >
            <div className="time-select-item">
              {/* Piilotettu input, joka on kuvakokoinen */}
              <input
                ref={timeInputRef}
                type="time"
                onChange={handleStarttimeChange}
                style={{
                  opacity: 0, // Piilottaa inputin
                  position: "absolute", // Aseta oikeaan kohtaan
                  width: "28px", // Aseta sama koko kuin kuvalla
                  height: "40px",
                  scale: 2,
                }}
              />

              {/* Kuvapainike, joka avaa ajanvalinnan */}
              <div
                onClick={openTimePicker} // Tämä avaa ajanvalitsimen
                style={{
                  backgroundImage: "url(/time.png)", // Polku kuvaan
                  backgroundSize: "cover",
                  width: "40px", // Sama koko kuin inputilla
                  height: "40px", // Sama koko kuin inputilla
                }}
              />

              {/* Näytettävä aika */}
              <span>{startTime || "Alkaen"}</span>
            </div>
            <div
              className="time-select-item"
              style={{
                fontSize: "40px",
                background: "none",
                boxShadow: "none",
                cursor: "default",
              }}
            >
              {"➜"}
            </div>
            <div className="time-select-item">
              {/* Piilotettu input, joka on kuvakokoinen */}
              <input
                ref={timeInputRef}
                type="time"
                onChange={handleEndtimeChange}
                style={{
                  opacity: 0, // Piilottaa inputin
                  position: "absolute", // Aseta oikeaan kohtaan
                  width: "28px", // Aseta sama koko kuin kuvalla
                  height: "40px",
                  scale: 2,
                }}
              />

              {/* Kuvapainike, joka avaa ajanvalinnan */}
              <div
                onClick={openTimePicker} // Tämä avaa ajanvalitsimen
                style={{
                  backgroundImage: "url(/time.png)", // Polku kuvaan
                  backgroundSize: "cover",
                  width: "40px", // Sama koko kuin inputilla
                  height: "40px", // Sama koko kuin inputilla
                }}
              />

              {/* Näytettävä aika */}
              <span>{endTime || "Päättyen"}</span>
            </div>
          </div>
        </div>
        <div className="quick-time-select-container">
          <button
            className={`quick-time-select ${
              selectedQuick === 1 ? "selected" : ""
            }`}
            onClick={() => handleQuickTime(1)}
          >
            3 h
          </button>
          <button
            className={`quick-time-select ${
              selectedQuick === 2 ? "selected" : ""
            }`}
            onClick={() => handleQuickTime(2)}
          >
            1 d
          </button>
          <button
            className={`quick-time-select ${
              selectedQuick === 3 ? "selected" : ""
            }`}
            onClick={() => handleQuickTime(3)}
          >
            7 d
          </button>
          <button
            className={`quick-time-select ${
              selectedQuick === 4 ? "selected" : ""
            }`}
            onClick={() => handleQuickTime(4)}
          >
            1 kk
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShortcutButtons
