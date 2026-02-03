function rankRolesFor_UOLT(scores) {
  // U-O-L-T: User-facing, Operational, Logic-led, Structured execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, interface_score, change_score, decision_score } = scores;

  // BUILDER VARIANT (focus_score < 50)
  // "The Frontend Specialist" - operational frontend, quality-focused
  if (focus_score < 50) {
    const interfaceStrength = Math.abs(interface_score - 50);
    const changeStrength = Math.abs(change_score - 50);
    const decisionStrength = Math.abs(decision_score - 50);

    // Strong user-facing + strong operational = dedicated frontend/QA
    if (interfaceStrength > 30 && changeStrength > 30) {
      // Structured execution favors QA (systematic testing)
      return ["QA / Test Engineer", "Frontend Engineer", "Mobile Engineer"];
    }

    // Moderate preferences with strong logic = quality focus
    if (decisionStrength > 20) {
      return ["Frontend Engineer", "QA / Test Engineer", "Mobile Engineer"];
    }

    // Balanced preferences = flexible frontend roles
    return ["Frontend Engineer", "Mobile Engineer", "QA / Test Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Quality Engineer" - systematic testing and quality
  const operationalStrength = change_score - 50;
  const logicStrength = decision_score - 50;

  // Strong operational + logic = pure QA/testing
  if (operationalStrength > 25 && logicStrength > 25) {
    return ["QA / Test Engineer", "Test Automation Engineer", "Mobile QA Engineer"];
  }

  // Strong operational = testing focus
  if (operationalStrength > 25) {
    return ["QA / Test Engineer", "Test Automation Engineer", "Technical PM"];
  }

  // Strong logic = automation/data focus
  if (logicStrength > 25) {
    return ["Test Automation Engineer", "QA / Test Engineer", "Data Scientist"];
  }

  // Balanced
  return ["QA / Test Engineer", "Test Automation Engineer", "Mobile QA Engineer"];
}

export default rankRolesFor_UOLT;
