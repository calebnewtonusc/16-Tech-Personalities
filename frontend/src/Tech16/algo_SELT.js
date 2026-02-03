function rankRolesFor_SELT(scores) {
  // S-E-L-T: Systems-facing, Exploratory, Logic-led, Structured execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // BUILDER VARIANT (focus_score < 50)
  // "The Backend Architect" - data-driven systems innovation
  if (focus_score < 50) {
    // Strong logic + exploratory = ML/data engineering
    if (logicStrength > 25 && exploratoryStrength > 25) {
      return ["Data Engineer", "ML Engineer", "MLOps Engineer"];
    }

    // Strong exploratory = backend innovation
    if (exploratoryStrength > 25) {
      return ["Backend Engineer", "Microservices Engineer", "Data Engineer"];
    }

    // Strong logic = data-focused
    if (logicStrength > 25) {
      return ["Data Engineer", "Database Engineer", "Backend Engineer"];
    }

    // Balanced
    return ["Backend Engineer", "Data Engineer", "ML Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The ML Engineer" - data-driven exploration, analytical systems
  const interfaceStrength = Math.abs(scores.interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong exploratory = pure ML/data science
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Structured execution favors ML Engineering
    return ["ML Engineer", "Data Scientist", "Research Scientist"];
  }

  // Moderate preferences = balanced data roles
  if (changeStrength > 20) {
    return ["Data Scientist", "ML Engineer", "Research Scientist"];
  }

  // Weak exploratory (closer to operational) = more engineering focus
  return ["ML Engineer", "Data Engineer", "Data Scientist"];
}

export default rankRolesFor_SELT;
