function rankRolesFor_BUOL(scores) {
  // B-U-O-L: Builder, User-facing, Operational, Logic-led
  // This is "The Frontend Specialist" - operational frontend, quality-focused

  const { interface_score, change_score, decision_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);
  const decisionStrength = Math.abs(decision_score - 50);

  // Strong user-facing + strong operational = dedicated frontend/QA
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors Mobile (rapid delivery), Structured favors QA (systematic testing)
    if (execution_score < 50) {
      return ["Frontend Engineer", "Mobile Engineer", "QA / Test Engineer"];
    } else {
      return ["QA / Test Engineer", "Frontend Engineer", "Mobile Engineer"];
    }
  }

  // Moderate preferences with strong logic = quality focus
  if (decisionStrength > 20) {
    return ["Frontend Engineer", "QA / Test Engineer", "Mobile Engineer"];
  }

  // Balanced preferences = flexible frontend roles
  return ["Frontend Engineer", "Mobile Engineer", "QA / Test Engineer"];
}
export default rankRolesFor_BUOL;
