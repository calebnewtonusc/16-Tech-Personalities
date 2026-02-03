function rankRolesFor_BUOL(scores) {
  const { focus_score, interface_score, change_score, decision_score, execution_score } = scores;
  const focusStrength = Math.abs(focus_score - 50);
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);
  const decisionStrength = Math.abs(decision_score - 50);
  
  // B-U-O-L: Frontend Developer, Mobile Developer, QA Engineer
  if (changeStrength > 30 && decisionStrength > 30) {
    return ["QA Engineer / SDET", "Frontend Developer", "Mobile Developer (iOS/Android)"];
  }
  if (changeStrength > 20 || decisionStrength > 20) {
    return ["Frontend Developer", "QA Engineer / SDET", "Mobile Developer (iOS/Android)"];
  }
  return ["Frontend Developer", "Mobile Developer (iOS/Android)", "QA Engineer / SDET"];
}
export default rankRolesFor_BUOL;
