function rankRolesFor_ASEL(scores) {
  // A-S-E-L: Analyzer, Systems-facing, Exploratory, Logic-led
  // This is "The ML Engineer" - data-driven exploration, analytical systems

  const { interface_score, change_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong exploratory = pure ML/data science
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors Research (experimentation), Structured favors ML Engineering
    if (execution_score < 50) {
      return ["Research Scientist", "Data Scientist", "ML Engineer"];
    } else {
      return ["ML Engineer", "Data Scientist", "Research Scientist"];
    }
  }

  // Moderate preferences = balanced data roles
  if (changeStrength > 20) {
    return ["Data Scientist", "ML Engineer", "Research Scientist"];
  }

  // Weak exploratory (closer to operational) = more engineering focus
  return ["ML Engineer", "Data Engineer", "Data Scientist"];
}
export default rankRolesFor_ASEL;
