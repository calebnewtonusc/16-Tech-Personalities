function rankRolesFor_BSEV(scores) {
  // B-S-E-V: Builder, Systems-facing, Exploratory, Vision-led
  // "The Infrastructure Pioneer" - innovative backend/platform work

  const { change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const visionStrength = 50 - decision_score;

  // Strong exploratory + vision = platform innovation
  if (exploratoryStrength > 25 && visionStrength > 25) {
    if (execution_score < 50) {
      return ["Platform Engineer", "Backend Engineer", "Cloud Engineer"];
    } else {
      return ["Solutions Architect", "Platform Engineer", "Backend Engineer"];
    }
  }

  // Strong exploratory = backend innovation
  if (exploratoryStrength > 25) {
    if (execution_score > 60) {
      return ["Backend Engineer", "Microservices Engineer", "Solutions Architect"];
    } else {
      return ["Backend Engineer", "Platform Engineer", "Microservices Engineer"];
    }
  }

  // Balanced = versatile systems builder
  return ["Backend Engineer", "Platform Engineer", "Solutions Architect"];
}
export default rankRolesFor_BSEV;
