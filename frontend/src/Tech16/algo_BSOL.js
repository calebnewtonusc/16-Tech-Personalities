function rankRolesFor_BSOL(scores) {
  // B-S-O-L: Builder, Systems-facing, Operational, Logic-led
  // "The Site Reliability Engineer" - systematic ops & data

  const { change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50;
  const logicStrength = decision_score - 50;

  // Strong operational + logic = SRE/Database focus
  if (operationalStrength > 25 && logicStrength > 25) {
    if (execution_score > 65) {
      return ["DevOps / SRE", "Database Administrator", "Database Engineer"];
    } else {
      return ["DevOps / SRE", "Cloud Engineer", "Database Engineer"];
    }
  }

  // Strong operational = pure SRE/DevOps
  if (operationalStrength > 25) {
    if (execution_score > 60) {
      return ["DevOps / SRE", "Kubernetes Engineer", "Database Administrator"];
    } else {
      return ["DevOps / SRE", "Platform Engineer", "Cloud Engineer"];
    }
  }

  // Strong logic = database focus
  if (logicStrength > 25) {
    return ["Database Engineer", "Database Administrator", "Data Engineer"];
  }

  // Balanced
  return ["DevOps / SRE", "Database Administrator", "Database Engineer"];
}
export default rankRolesFor_BSOL;
