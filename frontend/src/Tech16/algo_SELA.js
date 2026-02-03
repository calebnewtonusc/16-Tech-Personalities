function rankRolesFor_SELA(scores) {
  // S-E-L-A: Systems-facing, Exploratory, Logic-led, Adaptive execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // BUILDER VARIANT (focus_score < 50)
  // "The Backend Architect" - data-driven systems innovation
  if (focus_score < 50) {
    // Strong logic + exploratory = ML/data engineering
    if (logicStrength > 25 && exploratoryStrength > 25) {
      return ["ML Engineer", "Data Engineer", "Backend Engineer"];
    }

    // Strong exploratory = backend innovation
    if (exploratoryStrength > 25) {
      return ["Backend Engineer", "Microservices Engineer", "Data Engineer"];
    }

    // Strong logic = data-focused
    if (logicStrength > 25) {
      return ["Backend Engineer", "Data Engineer", "Full-Stack Engineer"];
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
    // Adaptive execution favors Research (experimentation)
    return ["Research Scientist", "Data Scientist", "ML Engineer"];
  }

  // Moderate preferences = balanced data roles
  if (changeStrength > 20) {
    return ["Data Scientist", "ML Engineer", "Research Scientist"];
  }

  // Weak exploratory (closer to operational) = more engineering focus
  return ["ML Engineer", "Data Engineer", "Data Scientist"];
}

export default rankRolesFor_SELA;
