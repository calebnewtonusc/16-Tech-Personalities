function rankRolesFor_ASOV(scores) {
  // A-S-O-V: Analyzer, Systems-facing, Operational, Vision-led
  // This is "The Solutions Architect" - operational systems, strategic vision

  const { interface_score, change_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong operational = pure infrastructure/SRE
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors SRE (incident response), Structured favors Architecture
    if (execution_score < 50) {
      return ["DevOps / SRE", "Cloud Engineer", "Systems Engineer"];
    } else {
      return ["Cloud Architect", "Solutions Architect", "DevOps / SRE"];
    }
  }

  // Moderate preferences = balanced infrastructure roles
  if (changeStrength > 20) {
    return ["DevOps / SRE", "Systems Engineer", "Cloud Engineer"];
  }

  // Weak operational (closer to exploratory) = more platform focus
  return ["Platform Engineer", "Cloud Engineer", "DevOps / SRE"];
}
export default rankRolesFor_ASOV;
