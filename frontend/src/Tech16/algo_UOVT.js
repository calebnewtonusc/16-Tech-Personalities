function rankRolesFor_UOVT(scores) {
  // U-O-V-T: User-facing, Operational, Vision-led, Structured execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score } = scores;

  const operationalStrength = change_score - 50;
  const visionStrength = 50 - decision_score;

  // BUILDER VARIANT (focus_score < 50)
  // "The User Advocate" - production-focused, user-centric, vision-driven
  if (focus_score < 50) {
    // Strong operational = production/design systems focus
    if (operationalStrength > 25) {
      return ["Design Systems Engineer", "Frontend Engineer", "Mobile Engineer"];
    }

    // Strong vision = product design focus
    if (visionStrength > 25) {
      return ["Product Designer", "Frontend Engineer", "Mobile Engineer"];
    }

    // Balanced = versatile user-facing
    return ["Frontend Engineer", "Mobile Engineer", "Design Systems Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Product Designer" - systematic product thinking
  // Strong operational + vision = product management
  if (operationalStrength > 25 && visionStrength > 25) {
    return ["Product Manager", "Technical PM", "Design Systems Engineer"];
  }

  // Strong operational = systematic design
  if (operationalStrength > 25) {
    return ["Design Systems Engineer", "Technical PM", "Product Manager"];
  }

  // Balanced
  return ["Product Manager", "UX Researcher", "Technical PM"];
}

export default rankRolesFor_UOVT;
