function rankRolesFor_BUEL(scores) {
  // B-U-E-L: Builder, User-facing, Exploratory, Logic-led
  // "The Product Engineer" - data-driven product development

  const { change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // Strong logic + exploratory = growth engineering (data-driven experimentation)
  if (logicStrength > 25 && exploratoryStrength > 20) {
    if (execution_score < 50) {
      return ["Growth Engineer", "Frontend Engineer", "Full-Stack Engineer"];
    } else {
      return ["Growth Engineer", "Full-Stack Engineer", "Frontend Engineer"];
    }
  }

  // Strong exploratory = more product/frontend focused
  if (exploratoryStrength > 25) {
    return ["Frontend Engineer", "Mobile Engineer", "Growth Engineer"];
  }

  // Balanced = versatile product engineer
  return ["Frontend Engineer", "Growth Engineer", "Full-Stack Engineer"];
}
export default rankRolesFor_BUEL;
