function rankRolesFor_BUOL(scores) {
  const { focus_score, interface_score, change_score, decision_score, execution_score } = scores;
  const focusStrength = Math.abs(focus_score - 50);
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);
  const decisionStrength = Math.abs(decision_score - 50);

  // B-U-O-L: Builder, User-facing, Operational, Logic-led
  if (changeStrength > 30 && decisionStrength > 30) {
    return ["QA / Test Engineer", "Frontend Engineer", "Mobile Engineer"];
  }
  if (changeStrength > 20 || decisionStrength > 20) {
    return ["Frontend Engineer", "QA / Test Engineer", "Mobile Engineer"];
  }
  return ["Frontend Engineer", "Mobile Engineer", "QA / Test Engineer"];
}
export default rankRolesFor_BUOL;
