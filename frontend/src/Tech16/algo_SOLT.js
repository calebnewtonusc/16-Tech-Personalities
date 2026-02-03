function rankRolesFor_SOLT(scores) {
  // S-O-L-T: Systems-facing, Operational, Logic-led, Structured execution
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score } = scores;

  const operationalStrength = change_score - 50;
  const logicStrength = decision_score - 50;

  // BUILDER VARIANT (focus_score < 50)
  // "The Site Reliability Engineer" - systematic ops & data
  if (focus_score < 50) {
    // Strong operational + logic = SRE/Database focus
    if (operationalStrength > 25 && logicStrength > 25) {
      return ["DevOps / SRE", "Database Administrator", "Database Engineer"];
    }

    // Strong operational = pure SRE/DevOps
    if (operationalStrength > 25) {
      return ["DevOps / SRE", "Kubernetes Engineer", "Database Administrator"];
    }

    // Strong logic = database focus
    if (logicStrength > 25) {
      return ["Database Engineer", "Database Administrator", "Data Engineer"];
    }

    // Balanced
    return ["DevOps / SRE", "Database Administrator", "Database Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Data Engineer" - operational systems, data-driven logic
  const interfaceStrength = Math.abs(scores.interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong operational = pure data/security engineering
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Structured execution favors Data Engineering
    return ["Data Engineer", "Database Administrator", "Security Engineer"];
  }

  // Moderate preferences = balanced backend roles
  if (changeStrength > 20) {
    return ["Data Engineer", "Security Engineer", "Database Administrator"];
  }

  // Weak operational (closer to exploratory) = include data science
  return ["Data Engineer", "Data Scientist", "Database Administrator"];
}

export default rankRolesFor_SOLT;
