import { useSelector } from "react-redux";
import { useState } from "react";
import translations from "../../assets/translation.js";
import LocationMap from "../locationMap.jsx";
import "./createEvent.css";
import Select from "react-select";

const CreateEventForm = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create event attempt:", {
      activity,
      date,
      time,
      location,
      minParticipants,
      maxParticipants,
      description,
    });
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const categories = useSelector((state) => state.categories.categories);

  const options = () => {
    try {
      return categories.map((cat) => ({
        value: cat.CategoryID,
        label: cat.Category,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selectedOption) => {
    setActivity(selectedOption);
  };

  return (
    <div className="create-event-form">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Select
              className="input-field"
              placeholder={t.activity}
              value={activity}
              onChange={handleChange}
              options={options()}
              isSearchable={true}
            />
          </div>
        </div>
        <div>
          <input
            type="date"
            value={date}
            name="dateAndTime"
            className="input-field"
            onChange={(e) => setDate(e.target.value)}
            placeholder={t.dateAndTime}
          />
        </div>
        <div>
          <input
            type="time"
            value={time}
            name="dateAndTime"
            className="input-field"
            onChange={(e) => setTime(e.target.value)}
            placeholder={t.dateAndTime}
          />
        </div>
        <div>
          <br />
          <h2 style={{ textAlign: "center" }}>{t.setEventLocationInfo}</h2>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div>
          <input
            type="number"
            value={minParticipants}
            name="minParticipants"
            className="input-field"
            onChange={(e) => setMinParticipants(e.target.value)}
            placeholder={t.minParticipants}
          />
        </div>
        <div>
          <input
            type="number"
            value={maxParticipants}
            name="maxParticipants"
            className="input-field"
            onChange={(e) => setMaxParticipants(e.target.value)}
            placeholder={t.maxParticipants}
          />
        </div>
        <div>
          <textarea
            type="description"
            value={description}
            name="description"
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
        <button type="submit" style={{ margin: "auto" }}>
          {t.createEvent}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
