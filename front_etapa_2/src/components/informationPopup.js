import React from 'react';
import './informationPopup.css';

function InformationPopup({ results, onClose }) {
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Información Adicional</h2>

            <div className="popup-container">
                <p>
                    Luego de entrenar un modelo de clasificación que permite realizar las predicciones de puntaje de 1 a 5
                estrellas en base a las reseñas de los usuarios, se analizó la relevancia que tiene la inclusión de diferentes
                palabras en el resultado de esa clasificación.
                </p>

                <p>
                    A continuación, se van a presentar las palabras que más influyen en la predicción de cada número de estrellas.
                    El hecho de incluir una de estas palabras en una reseña aumenta la probabilidad de que el modelo clasifique la
                    reseña con ese puntaje. También, estas palabras permiten dentificar los factores más relevantes
                    para determinar si una reseña es positiva o no.
                </p>

                <h3>1 estrella</h3>

                <img className='wordCloudImg' src="word_cloud_1.png" alt="Word Cloud 1" />

                <h3>2 estrellas</h3>

                <img className='wordCloudImg' src="word_cloud_2.png" alt="Word Cloud 2" />

                <h3>3 estrellas</h3>

                <img className='wordCloudImg' src="word_cloud_3.png" alt="Word Cloud 3" />

                <h3>4 estrellas</h3>

                <img className='wordCloudImg' src="word_cloud_4.png" alt="Word Cloud 4" />

                <h3>5 estrellas</h3>

                <img className='wordCloudImg' src="word_cloud_5.png" alt="Word Cloud 5" />


            </div>


        </div>
    </div>

    );
  }


export { InformationPopup }