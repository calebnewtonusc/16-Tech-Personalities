function rankRolesFor_BUEV(scores) {
  // B-U-E-V: Builder, User-facing, Exploratory, Vision-led
  // This is "The Innovator" - rapid prototyping, user-facing, creative

  const { interface_score, change_score, execution_score } = scores;

  // Check preference strength (distance from neutral 50)
  const interfaceStrength = Math.abs(interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong user-facing + strong exploratory = pure frontend innovation
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors Mobile (rapid iteration), Structured favors Design Systems
    if (execution_score < 50) {
      return ["Mobile Engineer", "Frontend Engineer", "Product Designer"];
    } else {
      return ["Frontend Engineer", "Design Systems Engineer", "Product Designer"];
    }
  }

  // Moderate preferences = more flexible roles
  if (changeStrength > 20) {
    return ["Frontend Engineer", "Mobile Engineer", "Product Designer"];
  }

  // Weak exploratory (closer to operational) = include growth engineering
  return ["Frontend Engineer", "Product Designer", "Growth Engineer"];
}
export default rankRolesFor_BUEV;
