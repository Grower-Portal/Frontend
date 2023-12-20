import React, { useEffect, useState } from 'react';
import '../styles/Report.css';
import Layout from '../components/Layout';

function Report() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("January"); // State for the selected month
  const [yearly, setYearly] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState([]);
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = { 
    "January": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30,
    "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31 
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  useEffect(() => {
    const startYear = 2000;
    const endYear = new Date().getFullYear();
    const years = Array.from({ length: endYear - startYear + 1 }, (_, idx) => startYear + idx);
    setYearOptions(years);
  }, []);

  const generateMonthlyReport = () => {
    const selectedDay = document.getElementById('day').value;
    alert('Generating Daily Report for ' + selectedDay + '/' + selectedMonth + '/' + year);
  }

  const generateYearlyReport = () => {
    alert('Generating Yearly Report for ' + yearly);
  }

  const daysForCurrentMonth = selectedMonth === "February" && isLeapYear(year) ? 29 : daysInMonth[selectedMonth];

  return (
    <Layout>
      <div id="report-container">
        <h1>Generate Report</h1>
        
        <label htmlFor="day">Select Day:</label>
        <select id="day">
          {[...Array(daysForCurrentMonth).keys()].map(day => (
            <option key={day} value={day + 1}>{day + 1}</option>
          ))}
        </select>

        <label htmlFor="month">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {months.map((month, idx) => (
            <option key={idx} value={month}>{month}</option>
          ))}
        </select>

        <label htmlFor="year">Select Year:</label>
        <select id="year" value={year} onChange={(e) => {
            setYear(e.target.value);
            setSelectedMonth("January");  // Reset month to January to avoid invalid day selections
          }}>
          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <button onClick={generateMonthlyReport}>Download Daily Report</button>

        <hr />

        <label htmlFor="yearly">Generate Yearly Report:</label>
        <select id="yearly" value={yearly} onChange={(e) => setYearly(e.target.value)}>
          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <button onClick={generateYearlyReport}>Download Yearly Report</button>
      </div>
    </Layout>
  );
}

export default Report;
