function rankRolesFor_BUOV(scores) {
  // B-U-O-V: Builder, User-facing, Operational, Vision-led
  // "The User Advocate" - production-focused, user-centric, vision-driven

  const { change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50;
  const visionStrength = 50 - decision_score;

  // Strong operational = production/design systems focus
  if (operationalStrength > 25) {
    if (execution_score > 60) {
      return ["Design Systems Engineer", "Frontend Engineer", "Mobile Engineer"];
    } else {
      return ["Frontend Engineer", "Design Systems Engineer", "Mobile Engineer"];
    }
  }

  // Strong vision = product design focus
  if (visionStrength > 25) {
    if (execution_score < 50) {
      return ["Mobile Engineer", "Product Designer", "Frontend Engineer"];
    } else {
      return ["Product Designer", "Frontend Engineer", "Mobile Engineer"];
    }
  }

  // Balanced = versatile user-facing
  return ["Frontend Engineer", "Mobile Engineer", "Design Systems Engineer"];
}
export default rankRolesFor_BUOV;
