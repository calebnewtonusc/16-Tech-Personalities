function rankRolesFor_AUEV(scores) {
  // A-U-E-V: Analyzer, User-facing, Exploratory, Vision-led
  // "The Design Technologist" - research-driven design innovation

  const { change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const visionStrength = 50 - decision_score;

  // Strong exploratory + vision = design research
  if (exploratoryStrength > 25 && visionStrength > 25) {
    if (execution_score < 50) {
      return ["UX Researcher", "Product Designer", "Product Manager"];
    } else {
      return ["Product Designer", "Design Systems Engineer", "UX Researcher"];
    }
  }

  // Strong exploratory = innovation focus
  if (exploratoryStrength > 25) {
    return ["Product Designer", "UX Researcher", "Design Systems Engineer"];
  }

  // Balanced
  return ["Product Designer", "UX Researcher", "Product Manager"];
}
export default rankRolesFor_AUEV;
