export function calculateImpact(kilograms, composition) {
  if (isNaN(kilograms) || typeof composition !== "string") {
    throw new Error("Invalid input");
  }
  let waterImpactLandfill;
  let waterImpact2dnChance;
  let carbonImpactLandfill;
  let carbonImpact2dnChance;

  switch (composition) {
    case "algodon Reciclado":
      waterImpactLandfill = kilograms * 1114;
      waterImpact2dnChance = kilograms * 500;
      carbonImpactLandfill = kilograms * 1.19;
      carbonImpact2dnChance = kilograms * 0.08;
      break;
    case "poliester Reciclado":
      waterImpactLandfill = kilograms * 929;
      waterImpact2dnChance = kilograms * 600;
      carbonImpactLandfill = kilograms * 2.05;
      carbonImpact2dnChance = kilograms * 1.26;
      break;
    case "Mezcla sin definición Reciclado":
      waterImpactLandfill = kilograms * 1022;
      waterImpact2dnChance = kilograms * 550;
      carbonImpactLandfill = kilograms * 1.45;
      carbonImpact2dnChance = kilograms * 0.67;
      break;
    case "algodon Reutilizado":
      waterImpactLandfill = kilograms * 1114;
      waterImpact2dnChance = kilograms * 0;
      carbonImpactLandfill = kilograms * 1.19;
      carbonImpact2dnChance = kilograms *0.0007;
      break;
    case "poliester Reutilizado":
      waterImpactLandfill = kilograms * 929;
      waterImpact2dnChance = kilograms * 0.0;
      carbonImpactLandfill = kilograms * 2.05;
      carbonImpact2dnChance = kilograms * 0.0007;
      break;
    case "Mezcla sin definición Reutilizado":
      waterImpactLandfill = kilograms * 1022;
      waterImpact2dnChance = kilograms * 0;
      carbonImpactLandfill = kilograms * 1.45;
      carbonImpact2dnChance = kilograms * 0.0007;
      break;
    default:
      waterImpactLandfill = kilograms * 0;
      waterImpact2dnChance = kilograms * 0;
      carbonImpactLandfill = kilograms * 0;
      carbonImpact2dnChance = kilograms * 0;
  }

  return {
    waterImpactLandfill,
    waterImpact2dnChance,
    carbonImpactLandfill,
    carbonImpact2dnChance,
  };
}
