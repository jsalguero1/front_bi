import React from 'react';
import ReviewInputManager from './components/c_review';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id='titulo_app'>Review Predictor Master</h1>
      <p id='subtitulo_app'>Escribe una o más reviews en los cuadros de texto y, cuando estén todas listas, oprime el botón 'Enviar Reseñas' para recibir una predicción de la calificación de 1 a 5 puntos que podría llegar a dar la persona que escribió esa review.</p>
      <ReviewInputManager />
    </div>
  );
}

export default App;

