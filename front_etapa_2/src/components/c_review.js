import React, { useState } from 'react';
import axios from 'axios';
import './c_review.css'

function ReviewInputManager() {

  const initial_state = [{ id: 1, texto: '', resultado: null, probabilidad: null }];
  const [entradas, setEntradas] = useState(initial_state);

  const handleAddClick = () => {
    const new_id = entradas.length + 1;
    setEntradas(entradas.concat({ id: new_id, texto: '', resultado: null, probabilidad: null }));
  };

  const handleInputChange = (id, texto) => {
    setEntradas(entradas.map(entrada => {
      if (entrada.id === id) {
        return { ...entrada, texto: texto };
      }
      return entrada;
    }));
  };

  const handleRemoveClick = (id) => {
    setEntradas(entradas.filter(entrada => entrada.id !== id));
  };

  const handleSubmit = () => {
    const api_url = 'http://localhost:8000/predict_probs';
    const datos_resenas = {
      Review: entradas.map(entrada => entrada.texto),
      Class: entradas.map(entrada => 0), // Asegúrate de ajustar este valor según la lógica de tu backend
    };
    axios.post(api_url, datos_resenas)
      .then(respuesta => {
        if (respuesta.data && respuesta.data.predictions && respuesta.data.probabilities) {
          updateResults(respuesta.data.predictions, respuesta.data.probabilities);
        } else {
          console.log('Respuesta recibida, pero no hay predicciones ni probabilidades:', respuesta);
        }
      })
      .catch(error => {
        console.error('¡Hubo un error!', error);
      });
  };

  const updateResults = (predicciones, probabilidades) => {
    setEntradas(entradas.map((entrada, indice) => ({
      ...entrada,
      resultado: predicciones[indice],
      probabilidad: probabilidades[indice],
    })));
  };

  const handleResetClick = () => {
    setEntradas(initial_state);
  };

  return (
    <div id='container'>
      {entradas.map(entrada => (
        <div key={entrada.id} id='input_container'>

          <input
            id='input_review'
            type="text"
            value={entrada.texto}
            onChange={(e) => handleInputChange(entrada.id, e.target.value)}
            placeholder="Ingrese su reseña aquí..."
          />
          <button id='submit_button' onClick={() => handleRemoveClick(entrada.id)}>Eliminar reseña</button>

          <div id='resultados_container'>

            <div id='resultados'>
              {entrada.resultado && <p><strong>Predicción: </strong>{entrada.resultado}</p>}
              {Array.from({ length: entrada.resultado }).map((_, i) => (
              <p id='estrellas' key={i}>⭐</p>))}
            </div>

            <div id='probabilidades'>
              {entrada.probabilidad && <p><strong>Probabilidad:</strong> {Number(entrada.probabilidad).toFixed(2)}</p>}
            </div>

          </div>
          
          </div>
      ))}
      <div id='button_container'>
        <button id='add_button' onClick={handleAddClick}>+</button>
        <p id='support_text'>Agregar otra reseña</p>
        <button id='send_reviews' onClick={handleSubmit}>Enviar Reseñas</button>
        {entradas.length > 1 && <button id='delete_reviews' onClick={handleResetClick}>Borrar Todo</button>}
      </div>

    </div>
  );
}

export default ReviewInputManager;




