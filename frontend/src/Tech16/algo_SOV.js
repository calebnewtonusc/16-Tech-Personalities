function rankRolesFor_SOV(scores) {
  // S-O-V: Systems-facing, Operational, Vision-led
  // Focus modifier: Builder vs Analyzer determines the specific expression

  const { focus_score, change_score, decision_score, execution_score } = scores;

  const operationalStrength = change_score - 50;
  const visionStrength = 50 - decision_score;

  // BUILDER VARIANT (focus_score < 50)
  // "The Platform Builder" - infrastructure with vision
  if (focus_score < 50) {
    // Strong operational = traditional SRE/DevOps
    if (operationalStrength > 25) {
      if (execution_score > 60) {
        return ["DevOps / SRE", "Kubernetes Engineer", "CI/CD Engineer"];
      } else {
        return ["DevOps / SRE", "Cloud Engineer", "Platform Engineer"];
      }
    }

    // Strong vision = platform innovation
    if (visionStrength > 20) {
      if (execution_score < 50) {
        return ["Platform Engineer", "Cloud Engineer", "Kubernetes Engineer"];
      } else {
        return ["Platform Engineer", "DevOps / SRE", "Cloud Engineer"];
      }
    }

    // Balanced = versatile infrastructure
    return ["Platform Engineer", "DevOps / SRE", "Cloud Engineer"];
  }

  // ANALYZER VARIANT (focus_score >= 50)
  // "The Solutions Architect" - operational systems, strategic vision
  const interfaceStrength = Math.abs(scores.interface_score - 50);
  const changeStrength = Math.abs(change_score - 50);

  // Strong systems + strong operational = pure infrastructure/SRE
  if (interfaceStrength > 30 && changeStrength > 30) {
    // Execution dimension: Adaptive favors SRE (incident response), Structured favors Architecture
    if (execution_score < 50) {
      return ["DevOps / SRE", "Cloud Engineer", "Systems Engineer"];
    } else {
      return ["Cloud Architect", "Solutions Architect", "DevOps / SRE"];
    }
  }

  // Moderate preferences = balanced infrastructure roles
  if (changeStrength > 20) {
    return ["DevOps / SRE", "Systems Engineer", "Cloud Engineer"];
  }

  // Weak operational (closer to exploratory) = more platform focus
  return ["Platform Engineer", "Cloud Engineer", "DevOps / SRE"];
}

export default rankRolesFor_SOV;
