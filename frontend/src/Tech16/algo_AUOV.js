function rankRolesFor_AUOV(scores) {
  // A-U-O-V: Analyzer, User-facing, Operational, Vision-led
  // "The Product Designer" - systematic product thinking

  const { change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50;
  const visionStrength = 50 - decision_score;

  // Strong operational + vision = product management
  if (operationalStrength > 25 && visionStrength > 25) {
    if (execution_score > 60) {
      return ["Product Manager", "Technical PM", "Design Systems Engineer"];
    } else {
      return ["Product Manager", "Product Designer", "UX Researcher"];
    }
  }

  // Strong operational = systematic design
  if (operationalStrength > 25) {
    if (execution_score > 60) {
      return ["Design Systems Engineer", "Technical PM", "Product Manager"];
    } else {
      return ["Product Designer", "Design Systems Engineer", "Technical PM"];
    }
  }

  // Balanced
  return ["Product Manager", "UX Researcher", "Technical PM"];
}
export default rankRolesFor_AUOV;
