

import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  // Determine backend URL
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/bfhl" 
      : "https://backend-beta-two-55.vercel.app/bfhl"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput); 
      const response = await axios.post(backendUrl, data); 
      setResponseData(response.data); 
      setFilteredData(response.data); 
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterOption(selectedFilter);

    if (!responseData) return;

    // Apply filtering logic
    let filtered;
    switch (selectedFilter) {
      case "numbers":
        filtered = { numbers: responseData.numbers }; 
        break;
      case "alphabets":
        filtered = { alphabets: responseData.alphabets }; 
        break;
      case "highest_lowercase":
        filtered = { highest_lowercase_alphabet: responseData.highest_lowercase_alphabet }; 
        break;
      case "prime_found":
        filtered = { is_prime_found: responseData.is_prime_found };
        break;
      default:
        filtered = responseData;
    }

    setFilteredData(filtered);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON (e.g., {"data":["M","1","334","4","B"]})'
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredData && (
        <>
          <div>
            <label htmlFor="filter">Filter by:</label>
            <select id="filter" value={filterOption} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_lowercase">Highest Lowercase Alphabet</option>
              <option value="prime_found">Prime Found</option>
            </select>
          </div>
          <ResponseDisplay data={filteredData} />
        </>
      )}
    </div>
  );
};

export default InputForm;
