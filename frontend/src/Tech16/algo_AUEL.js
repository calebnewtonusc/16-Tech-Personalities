function rankRolesFor_AUEL(scores) {
  // A-U-E-L: Analyzer, User-facing, Exploratory, Logic-led
  // "The UX Researcher" - data-driven user research

  const { change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // Strong logic + exploratory = growth/analytics focus
  if (logicStrength > 25 && exploratoryStrength > 25) {
    if (execution_score < 50) {
      return ["Growth Engineer", "UX Researcher", "Technical PM"];
    } else {
      return ["Technical PM", "Growth Engineer", "Data Scientist"];
    }
  }

  // Strong exploratory = research/innovation
  if (exploratoryStrength > 25) {
    return ["UX Researcher", "Growth Engineer", "Product Designer"];
  }

  // Strong logic = data/analytics focus
  if (logicStrength > 25) {
    return ["Data Scientist", "Technical PM", "Growth Engineer"];
  }

  // Balanced
  return ["Growth Engineer", "Technical PM", "Data Scientist"];
}
export default rankRolesFor_AUEL;
