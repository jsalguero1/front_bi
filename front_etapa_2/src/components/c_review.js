import React, { useState } from 'react';
import axios from 'axios';
import './c_review.css'
import { InformationPopup } from './informationPopup';

function ReviewInputManager() {

  const [showPopup, setShowPopup] = useState(false);

  const handleMoreInfoClick = () => {
    setShowPopup(true);
  };

  const calculateCertainty = (probabilidad) => {
    if (probabilidad >= 0.65)
      return { text: 'Muy alta', color: 'blue' };
      else if (0.5 <= probabilidad <= 0.64) {
      return { text: 'Alta', color: 'green' };
    } else if (0.35 <= probabilidad <= 0.49) {
      return { text: 'Media', color: 'gray' };
    } else if (0.2 <= probabilidad <= 0.34) {
      return { text: 'Baja', color: 'orange' };
  };

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

  const validateReviews = () => {
    return entradas.some(entrada => !entrada.texto.trim());
  };
  
  const handleSubmit = () => {
    if (validateReviews()) {
      alert('No es posible enviar una reseña vacía');
      return;
    }
  
    const api_url = 'http://localhost:8000/predict_probs';
    const datos_resenas = {
      Review: entradas.map(entrada => entrada.texto),
      Class: entradas.map(entrada => 0),
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
    setEntradas(entradas.map((entrada, indice) => {
      const certainty = calculateCertainty(probabilidades[indice]);
      return {
        ...entrada,
        probabilidad: probabilidades[indice],
        resultado: predicciones[indice],
        certeza: certainty.text,
        colorCerteza: certainty.color,
      };
    }));
  };

  const handleResetClick = () => {
    setEntradas(initial_state);
  };

  return (
    <div id='container'>

      <h2 id='resenas_title'>Reseñas a evaluar</h2>

      {entradas.map(entrada => (
        <div key={entrada.id} id='input_container'>

          <input
            id='input_review'
            type="text"
            value={entrada.texto}
            onChange={(e) => handleInputChange(entrada.id, e.target.value)}
            placeholder="Escribe una reseña aquí..."
          />
          <button id='submit_button' onClick={() => handleRemoveClick(entrada.id)}>Eliminar reseña</button>

          <div id='resultados_container'>

            <div id='resultados'>
              {entrada.resultado && <p><strong>Predicción: </strong>{entrada.resultado}</p>}
              {Array.from({ length: entrada.resultado }).map((_, i) => (
              <p id='estrellas' key={i}>⭐</p>))}
            </div>

            <div id='probabilidades'>
            {entrada.certeza && (
              <p>
                <strong>Certeza de la Predicción: </strong> 
                <span style={{ color: entrada.colorCerteza }}>
                  <strong>{entrada.certeza} ({entrada.probabilidad.toFixed(2)})</strong>
                </span>
              </p>
            )}
            </div>
          </div>          
          </div>
      ))}
      <div>
          <button id='more_info_button' onClick={handleMoreInfoClick}>
              ¿Quieres saber más sobre estos resultados?
          </button>
      </div>

      {showPopup && <InformationPopup results={entradas} onClose={() => setShowPopup(false)} />}

      <div id='button_container'>
        <button id='add_button' onClick={handleAddClick}>+</button>
        <p id='support_text'>Agrega otra reseña</p>
        <button id='send_reviews' onClick={handleSubmit}>Enviar Reseñas</button>
        {entradas.length > 1 && <button id='delete_reviews' onClick={handleResetClick}>Borrar Todo</button>}
      </div>

      <p className='footer'>Aplicación web construida por Juan David Salguero, Juan Sebastián Pardo y Alonso Hernández Tavera - 2024</p>
    </div>
  );
}

export default ReviewInputManager;




