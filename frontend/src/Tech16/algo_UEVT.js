function rankRolesFor_UEVT(scores) {
  // U-E-V-T: User-facing, Exploratory, Vision-led, Structured
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, interface_score, change_score } = scores;

  // BUILDER VARIANT (focus_score < 50)
  // "The Design Systems Engineer (Structured)" - creative vision with systematic implementation
  if (focus_score < 50) {
    const interfaceStrength = Math.abs(interface_score - 50);
    const changeStrength = Math.abs(change_score - 50);

    // Strong user-facing + strong exploratory = design systems focus
    if (interfaceStrength > 30 && changeStrength > 30) {
      return ["Frontend Engineer", "Design Systems Engineer", "Product Designer"];
    }

    // Moderate preferences = more flexible roles
    if (changeStrength > 20) {
      return ["Frontend Engineer", "Mobile Engineer", "Product Designer"];
    }

    // Weak exploratory (closer to operational) = include growth engineering
    return ["Frontend Engineer", "Product Designer", "Growth Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Design Technologist (Structured)" - research-driven design with systematic approach
  const exploratoryStrength = 50 - change_score;
  const visionStrength = 50 - scores.decision_score;

  // Strong exploratory + vision = design research with structure
  if (exploratoryStrength > 25 && visionStrength > 25) {
    return ["Product Designer", "Design Systems Engineer", "UX Researcher"];
  }

  // Strong exploratory = innovation focus
  if (exploratoryStrength > 25) {
    return ["Product Designer", "UX Researcher", "Design Systems Engineer"];
  }

  // Balanced
  return ["Product Designer", "UX Researcher", "Product Manager"];
}

export default rankRolesFor_UEVT;
