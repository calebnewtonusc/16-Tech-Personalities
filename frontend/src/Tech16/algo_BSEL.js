function rankRolesFor_BSEL(scores) {
  // B-S-E-L: Builder, Systems-facing, Exploratory, Logic-led
  // "The Backend Architect" - data-driven systems innovation

  const { change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // Strong logic + exploratory = ML/data engineering
  if (logicStrength > 25 && exploratoryStrength > 25) {
    if (execution_score < 50) {
      return ["ML Engineer", "Data Engineer", "Backend Engineer"];
    } else {
      return ["Data Engineer", "ML Engineer", "MLOps Engineer"];
    }
  }

  // Strong exploratory = backend innovation
  if (exploratoryStrength > 25) {
    return ["Backend Engineer", "Microservices Engineer", "Data Engineer"];
  }

  // Strong logic = data-focused
  if (logicStrength > 25) {
    if (execution_score > 60) {
      return ["Data Engineer", "Database Engineer", "Backend Engineer"];
    } else {
      return ["Backend Engineer", "Data Engineer", "Full-Stack Engineer"];
    }
  }

  // Balanced
  return ["Backend Engineer", "Data Engineer", "ML Engineer"];
}
export default rankRolesFor_BSEL;
