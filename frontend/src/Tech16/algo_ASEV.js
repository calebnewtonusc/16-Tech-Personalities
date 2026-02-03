function rankRolesFor_ASEV(scores) {
  // A-S-E-V: Analyzer, Systems-facing, Exploratory, Vision-led
  // This is "The Research Engineer" - systems exploration, architectural vision

  const { interface_score, change_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong exploratory = pure research/architecture
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors Research (rapid experimentation), Structured favors Architecture
    if (execution_score < 50) {
      return ["Research Scientist", "Solutions Architect", "Platform Engineer"];
    } else {
      return ["Solutions Architect", "Platform Engineer", "Research Scientist"];
    }
  }

  // Moderate preferences = balanced architectural roles
  if (changeStrength > 20) {
    return ["Solutions Architect", "Platform Engineer", "Research Scientist"];
  }

  // Weak exploratory (closer to operational) = more infrastructure focus
  return ["Platform Engineer", "Solutions Architect", "Cloud Architect"];
}
export default rankRolesFor_ASEV;
