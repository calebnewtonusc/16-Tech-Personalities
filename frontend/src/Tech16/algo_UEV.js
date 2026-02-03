function rankRolesFor_UEV(scores) {
  // U-E-V: User-facing, Exploratory, Vision-led
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, interface_score, change_score, execution_score } = scores;

  // BUILDER VARIANT (focus_score < 50)
  // "The Innovator" - rapid prototyping, user-facing, creative
  if (focus_score < 50) {
    const interfaceStrength = Math.abs(interface_score - 50);
    const changeStrength = Math.abs(change_score - 50);

    // Strong user-facing + strong exploratory = pure frontend innovation
    if (interfaceStrength > 30 && changeStrength > 30) {
      // Execution dimension: Adaptive favors Mobile (rapid iteration), Structured favors Design Systems
      if (execution_score < 50) {
        return ["Mobile Engineer", "Frontend Engineer", "Product Designer"];
      } else {
        return ["Frontend Engineer", "Design Systems Engineer", "Product Designer"];
      }
    }

    // Moderate preferences = more flexible roles
    if (changeStrength > 20) {
      return ["Frontend Engineer", "Mobile Engineer", "Product Designer"];
    }

    // Weak exploratory (closer to operational) = include growth engineering
    return ["Frontend Engineer", "Product Designer", "Growth Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Design Technologist" - research-driven design innovation
  const exploratoryStrength = 50 - change_score;
  const visionStrength = 50 - scores.decision_score;

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

export default rankRolesFor_UEV;
