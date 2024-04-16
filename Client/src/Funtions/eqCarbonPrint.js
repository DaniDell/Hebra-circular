export function eqCarbonPrint(totalCarbonFootprint) {
  // Comparación con coches
  const equivalentCars = totalCarbonFootprint / 0.108; // Suponiendo que 108 g de CO₂ por kilómetro (según el NEDC). es la emisión promedio de un coche por km

  // Comparación con vuelos de avión
  const equivalentFlights = totalCarbonFootprint / 3.3; // Suponiendo que 3.3 kg de CO₂ por kilómetro por pasajero es la emisión promedio de un vuelo de avión

  if (totalCarbonFootprint < 1000) {
    return ` las emisiones de ${equivalentCars.toFixed(0)} coches por km.`;
  } else {
    return `las emisiones de ${equivalentFlights.toFixed(0)} vuelos de avión por km por pasajero.`;
  }
}