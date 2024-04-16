export function eqCarbonPrint(totalCarbonFootprint) {
  // Calcula las emisiones de un auto en función de la distancia recorrida
  const equivalentCars = totalCarbonFootprint / 0.108; // Suponiendo que 108 g de CO₂ por kilómetro (según el NEDC). es la emisión promedio de un coche por km

  // Calcula cuántos árboles serían necesarios para absorber las emisiones de carbono del auto
  const treesNeeded = totalCarbonFootprint / 21.7; // 1100 kg CO₂ es la cantidad que un árbol adulto puede absorber durante su vida útil

  // Calcula las emisiones equivalentes de un vuelo en avión en kilometros
  const equivalentFlights = (totalCarbonFootprint / 3.3) * 200;


    return `lo que pueden absorver ${treesNeeded.toFixed(0)} 🌳 arboles adultos en 1 año.** `;

  
}
