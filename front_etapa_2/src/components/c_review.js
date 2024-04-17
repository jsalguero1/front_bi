import React, { useState } from 'react';
import axios from 'axios';

function ReviewInputManager() {
  const [inputs, setInputs] = useState([{ id: 1, text: '', result: null }]);

  const handleAddClick = () => {
    const newInputId = inputs.length + 1;
    setInputs([...inputs, { id: newInputId, text: '', result: null }]);
  };

  const handleInputChange = (id, text) => {
    const newInputs = inputs.map(input => {
      if (input.id === id) {
        return { ...input, text: text };
      }
      return input;
    });
    setInputs(newInputs);
  };

  const handleRemoveClick = (id) => {
    const newInputs = inputs.filter(input => input.id !== id);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const apiUrl = 'http://localhost:8000/predict';  // URL del backend
    axios.post(apiUrl, { reviews: inputs.map(input => input.text) })
      .then(response => {
        const results = response.data.predictions;  // Asumiendo que el backend devuelve un objeto con una propiedad 'predictions'
        updateResults(results);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const updateResults = (results) => {
    const newInputs = inputs.map((input, index) => ({
      ...input,
      result: results[index]  // Asegúrate de que cada resultado corresponda a su entrada
    }));
    setInputs(newInputs);
  };

  return (
    <div>
      {inputs.map(input => (
        <div key={input.id}>
          <input
            type="text"
            value={input.text}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder="Enter review here..."
          />
          <button onClick={() => handleRemoveClick(input.id)}>Remove</button>
          {input.result && <p>Prediction: {input.result}</p>}
        </div>
      ))}
      <button onClick={handleAddClick}>Add Another Review</button>
      <button onClick={handleSubmit}>Submit Reviews</button>
    </div>
  );
}

export default ReviewInputManager;


