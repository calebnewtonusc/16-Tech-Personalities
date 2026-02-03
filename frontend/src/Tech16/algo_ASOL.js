function rankRolesFor_ASOL(scores) {
  // A-S-O-L: Analyzer, Systems-facing, Operational, Logic-led
  // This is "The Data Engineer" - operational systems, data-driven logic

  const { interface_score, change_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong operational = pure data/security engineering
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors Security (threat response), Structured favors Data Engineering
    if (execution_score < 50) {
      return ["Security Engineer", "Data Engineer", "Database Administrator"];
    } else {
      return ["Data Engineer", "Database Administrator", "Security Engineer"];
    }
  }

  // Moderate preferences = balanced backend roles
  if (changeStrength > 20) {
    return ["Data Engineer", "Security Engineer", "Database Administrator"];
  }

  // Weak operational (closer to exploratory) = include data science
  return ["Data Engineer", "Data Scientist", "Database Administrator"];
}
export default rankRolesFor_ASOL;
