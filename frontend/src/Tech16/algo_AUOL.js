function rankRolesFor_AUOL(scores) {
  // A-U-O-L: Analyzer, User-facing, Operational, Logic-led
  // "The Quality Engineer" - systematic testing and quality

  const { change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50;
  const logicStrength = decision_score - 50;

  // Strong operational + logic = pure QA/testing
  if (operationalStrength > 25 && logicStrength > 25) {
    if (execution_score > 65) {
      return ["QA / Test Engineer", "Test Automation Engineer", "Mobile QA Engineer"];
    } else {
      return ["Test Automation Engineer", "QA / Test Engineer", "Mobile QA Engineer"];
    }
  }

  // Strong operational = testing focus
  if (operationalStrength > 25) {
    return ["QA / Test Engineer", "Test Automation Engineer", "Technical PM"];
  }

  // Strong logic = automation/data focus
  if (logicStrength > 25) {
    if (execution_score > 60) {
      return ["Test Automation Engineer", "QA / Test Engineer", "Data Scientist"];
    } else {
      return ["QA / Test Engineer", "Growth Engineer", "Test Automation Engineer"];
    }
  }

  // Balanced
  return ["QA / Test Engineer", "Test Automation Engineer", "Mobile QA Engineer"];
}
export default rankRolesFor_AUOL;
