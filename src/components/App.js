import React, { useState } from "react";
import "../styles/App.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDay(year, month);

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) daysArray.push("");
  for (let d = 1; d <= totalDays; d++) daysArray.push(d);

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div id="main" style={{ textAlign: "center" }}>
      <h1 id="title">Calendar</h1>

      <div>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <span
          id="year-display"
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onDoubleClick={() => {
            const newYear = prompt("Enter a year:", year);
            if (newYear) setYear(Number(newYear));
          }}
        >
          {year}
        </span>
      </div>

      <br />

      <table id="calendar-table" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(daysArray.length / 7))].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {daysArray
                .slice(rowIndex * 7, rowIndex * 7 + 7)
                .map((day, i) => (
                  <td key={i} style={{ padding: "6px" }}>{day}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div>
        <button id="prev-year" onClick={handlePrevYear}>{"<<"}</button>
        <button id="prev-month" onClick={handlePrevMonth}>{"<"}</button>
        <button id="next-month" onClick={handleNextMonth}>{">"}</button>
        <button id="next-year" onClick={handleNextYear}>{">>"}</button>
      </div>
    </div>
  );
};

export default App;
