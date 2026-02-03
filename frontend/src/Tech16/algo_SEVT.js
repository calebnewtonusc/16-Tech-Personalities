function rankRolesFor_SEVT(scores) {
  // S-E-V-T: Systems-facing, Exploratory, Vision-led, Structured execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const visionStrength = 50 - decision_score;

  // BUILDER VARIANT (focus_score < 50)
  // "The Infrastructure Pioneer" - innovative backend/platform work
  if (focus_score < 50) {
    // Strong exploratory + vision = platform innovation
    if (exploratoryStrength > 25 && visionStrength > 25) {
      return ["Solutions Architect", "Platform Engineer", "Backend Engineer"];
    }

    // Strong exploratory = backend innovation
    if (exploratoryStrength > 25) {
      return ["Backend Engineer", "Microservices Engineer", "Solutions Architect"];
    }

    // Balanced = versatile systems builder
    return ["Backend Engineer", "Platform Engineer", "Solutions Architect"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Research Engineer" - systems exploration, architectural vision
  const interfaceStrength = Math.abs(scores.interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong exploratory = pure research/architecture
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Structured execution favors Architecture
    return ["Solutions Architect", "Platform Engineer", "Research Scientist"];
  }

  // Moderate preferences = balanced architectural roles
  if (changeStrength > 20) {
    return ["Solutions Architect", "Platform Engineer", "Research Scientist"];
  }

  // Weak exploratory (closer to operational) = more infrastructure focus
  return ["Platform Engineer", "Solutions Architect", "Cloud Architect"];
}

export default rankRolesFor_SEVT;
