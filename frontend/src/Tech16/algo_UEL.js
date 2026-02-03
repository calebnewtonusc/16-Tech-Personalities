function rankRolesFor_UEL(scores) {
  // U-E-L: User-facing, Exploratory, Logic-led
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score, execution_score } = scores;

  const exploratoryStrength = 50 - change_score;
  const logicStrength = decision_score - 50;

  // BUILDER VARIANT (focus_score < 50)
  // "The Product Engineer" - data-driven product development
  if (focus_score < 50) {
    // Strong logic + exploratory = growth engineering (data-driven experimentation)
    if (logicStrength > 25 && exploratoryStrength > 20) {
      if (execution_score < 50) {
        return ["Growth Engineer", "Frontend Engineer", "Full-Stack Engineer"];
      } else {
        return ["Growth Engineer", "Full-Stack Engineer", "Frontend Engineer"];
      }
    }

    // Strong exploratory = more product/frontend focused
    if (exploratoryStrength > 25) {
      return ["Frontend Engineer", "Mobile Engineer", "Growth Engineer"];
    }

    // Balanced = versatile product engineer
    return ["Frontend Engineer", "Growth Engineer", "Full-Stack Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The UX Researcher" - data-driven user research
  // Strong logic + exploratory = growth/analytics focus
  if (logicStrength > 25 && exploratoryStrength > 25) {
    if (execution_score < 50) {
      return ["Growth Engineer", "UX Researcher", "Technical PM"];
    } else {
      return ["Technical PM", "Growth Engineer", "Data Scientist"];
    }
  }

  // Strong exploratory = research/innovation
  if (exploratoryStrength > 25) {
    return ["UX Researcher", "Growth Engineer", "Product Designer"];
  }

  // Strong logic = data/analytics focus
  if (logicStrength > 25) {
    return ["Data Scientist", "Technical PM", "Growth Engineer"];
  }

  // Balanced
  return ["Growth Engineer", "Technical PM", "Data Scientist"];
}

export default rankRolesFor_UEL;
