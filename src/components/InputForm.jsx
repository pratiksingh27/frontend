import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      const response = await axios.post("https://backend-beta-two-55.vercel.app/bfhl", data);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && <ResponseDisplay data={responseData} />}
    </div>
  );
};

export default InputForm;

// import React, { useState } from "react";
// import axios from "axios";
// import ResponseDisplay from "./ResponseDisplay";

// const InputForm = () => {
//   const [jsonInput, setJsonInput] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState("");
//   const [filterOption, setFilterOption] = useState("all"); // Default filter is 'all'

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = JSON.parse(jsonInput);
//       const response = await axios.post(
//         "https://backend-beta-two-55.vercel.app/bfhl", // Corrected endpoint URL
//         data
//       );
//       setResponseData(response.data);
//       setError("");
//     } catch (err) {
//       setError("Invalid JSON or server error");
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilterOption(e.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={jsonInput}
//           onChange={(e) => setJsonInput(e.target.value)}
//           placeholder="Enter JSON"
//           rows="5"
//           cols="50"
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {responseData && (
//         <>
//           <div>
//             <label htmlFor="filter">Filter by:</label>
//             <select id="filter" value={filterOption} onChange={handleFilterChange}>
//               <option value="all">All</option>
//               <option value="numbers">Numbers</option>
//               <option value="uppercase">Uppercase Letters</option>
//             </select>
//           </div>
//           <ResponseDisplay data={responseData} filterOption={filterOption} />
//         </>
//       )}
//     </div>
//   );
// };

// export default InputForm;
