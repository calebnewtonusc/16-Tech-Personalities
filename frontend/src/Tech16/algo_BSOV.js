function rankRolesFor_BSOV(scores) {
  // B-S-O-V: Builder, Systems-facing, Operational, Vision-led
  // This is "The Platform Builder" - infrastructure with vision

  const { change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50; // How operational (vs exploratory)
  const visionStrength = 50 - decision_score; // How vision-led (vs logic-led)

  // Strong operational = traditional SRE/DevOps
  if (operationalStrength > 25) {
    if (execution_score > 60) {
      return ["DevOps / SRE", "Kubernetes Engineer", "CI/CD Engineer"];
    } else {
      return ["DevOps / SRE", "Cloud Engineer", "Platform Engineer"];
    }
  }

  // Strong vision = platform innovation
  if (visionStrength > 20) {
    if (execution_score < 50) {
      return ["Platform Engineer", "Cloud Engineer", "Kubernetes Engineer"];
    } else {
      return ["Platform Engineer", "DevOps / SRE", "Cloud Engineer"];
    }
  }

  // Balanced = versatile infrastructure
  return ["Platform Engineer", "DevOps / SRE", "Cloud Engineer"];
}
export default rankRolesFor_BSOV;
