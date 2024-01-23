import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/tableData");

        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              {/* Add additional headers as needed based on your data structure */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                {/* Add additional cells as needed based on your data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
