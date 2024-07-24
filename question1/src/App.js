// src/App.jsx
import React, { useState } from 'react';
import apiData from './api.json'; // Import JSON data
import 'bootstrap/dist/css/bootstrap.min.css';

const WINDOW_SIZE = 10; // Maximum number of numbers in the window

function App() {
  const [numberId, setNumberId] = useState('');
  const [numbersWindow, setNumbersWindow] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');
  const [apiNumbers, setApiNumbers] = useState([]);

  // Function to fetch numbers from the imported JSON
  const fetchNumbersFromAPI = (id) => {
    return new Promise((resolve, reject) => {
      // Simulate a delay to mimic API response time
      setTimeout(() => {
        if (apiData.numbers[id]) {
          resolve(apiData.numbers[id]);
        } else {
          reject(new Error('Invalid ID'));
        }
      }, 100); // Simulated delay of 100ms
    });
  };

  // Function to handle average calculation
  const handleCalculateAverage = async () => {
    setError('');
    try {
      const newNumbers = await fetchNumbersFromAPI(numberId);
      setApiNumbers(newNumbers);

      // Update the numbers window with new numbers
      let updatedWindow = [...numbersWindow];

      newNumbers.forEach(num => {
        if (!updatedWindow.includes(num)) {
          if (updatedWindow.length >= WINDOW_SIZE) {
            updatedWindow.shift(); // Remove the oldest number if window is full
          }
          updatedWindow.push(num); // Add new number to the window
        }
      });

      setNumbersWindow(updatedWindow);

      // Calculate the average
      const sum = updatedWindow.reduce((acc, num) => acc + num, 0);
      const avg = updatedWindow.length ? (sum / updatedWindow.length).toFixed(2) : '0.00';
      setAverage(avg);

    } catch (err) {
      setError('Error calculating average. Please try again.');
      setAverage(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h1 className="card-title mb-3">Average Calculator</h1>
          <input
            type="text"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
            placeholder="Enter number ID (p, f, e, r)"
            className="form-control mb-3"
          />
          <button onClick={handleCalculateAverage} className="btn btn-primary mb-3">Calculate Average</button>
          {error && <p className="text-danger">{error}</p>}
          <div>
            <h2>Window State:</h2>
            <p>Previous State: {JSON.stringify([])}</p> {/* Placeholder for previous state */}
            <p>Current State: {JSON.stringify(numbersWindow)}</p>
            <p>Numbers from API: {JSON.stringify(apiNumbers)}</p>
            <p>Average: {average}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
