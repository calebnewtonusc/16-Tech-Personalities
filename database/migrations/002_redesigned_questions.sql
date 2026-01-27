-- Migration: Redesigned Quiz Questions (Fix Scoring Bug)
-- Date: 2026-01-26
-- Purpose: Replace alternating questions with single-direction questions per spectrum
-- Research: Modern psychometric best practices recommend same-direction questions
-- https://journals.sagepub.com/doi/10/1177/001316448104100420

BEGIN;

-- Step 1: Deactivate version 1
UPDATE quiz_versions
SET is_active = false
WHERE version = 1;

-- Step 2: Insert version 2 with redesigned questions
INSERT INTO quiz_versions (version, questions, is_active) VALUES (
  2,
  '{
    "questions": [
      {
        "id": 1,
        "text": "I prefer thorough analysis and planning before starting implementation.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 2,
        "text": "In code reviews, I prioritize evaluating architecture and design patterns over implementation details.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 3,
        "text": "I analyze technical problems deeply before proposing solutions.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 4,
        "text": "I enjoy diving into technical details, edge cases, and potential failure modes.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 5,
        "text": "I believe comprehensive refactoring and redesign are more valuable than quick fixes.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 6,
        "text": "I prefer detailed estimation with careful analysis over rough time-boxing.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 7,
        "text": "I learn best by studying documentation, research papers, and understanding underlying theory.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 8,
        "text": "To me, high-quality code means well-architected, maintainable systems with solid foundations.",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 9,
        "text": "I get most excited about working on backend systems, infrastructure, and platform engineering.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 10,
        "text": "I find deep satisfaction in optimizing system performance, scalability, and reliability.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 11,
        "text": "I measure impact primarily through system reliability metrics, throughput, and infrastructure efficiency.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 12,
        "text": "I prioritize developing skills in databases, APIs, distributed systems, and cloud infrastructure.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 13,
        "text": "I prefer working on internal platforms, developer tools, and infrastructure over user-facing features.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 14,
        "text": "I enjoy working on low-level optimizations, system architecture, and technical infrastructure.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 15,
        "text": "I prefer working with APIs, databases, servers, and backend logic over UI components.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 16,
        "text": "I see my career path specializing in backend engineering, DevOps, or infrastructure roles.",
        "spectrum": "interface",
        "direction": "systems",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 17,
        "text": "I prefer working with proven, battle-tested technologies over cutting-edge, experimental ones.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 18,
        "text": "I focus on deeply mastering existing tools and frameworks rather than constantly trying new ones.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 19,
        "text": "I thrive in stable, well-established work environments with clear processes and expectations.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 20,
        "text": "I believe technical debt should be minimized aggressively, not accepted for speed.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 21,
        "text": "I prefer incremental improvements and gradual evolution over major architectural rewrites.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 22,
        "text": "When choosing frameworks and libraries, I prioritize maturity, stability, and proven track records.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 23,
        "text": "I find fulfillment in maintaining, optimizing, and improving existing production systems.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 24,
        "text": "In my view, stability and reliability are more important than innovation and experimentation.",
        "spectrum": "change",
        "direction": "operational",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 25,
        "text": "I make technical decisions based on data, metrics, and measurable outcomes.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 26,
        "text": "I validate product ideas and features through A/B testing, analytics, and user behavior data.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 27,
        "text": "I choose technical architectures based on performance benchmarks and scalability analysis.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 28,
        "text": "I evaluate technologies through rigorous comparison of technical specifications and objective criteria.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 29,
        "text": "I rely on systematic analysis and reproducible evidence over intuition when solving problems.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 30,
        "text": "I debug issues by analyzing logs, metrics, and building reproducible test cases.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 31,
        "text": "I evaluate engineering trade-offs using objective criteria like performance, cost, and maintainability.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 32,
        "text": "I assess technical proposals based on quantifiable benefits, risks, and resource requirements.",
        "spectrum": "decision",
        "direction": "logic",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 33,
        "text": "I work best with well-organized, carefully planned workflows and structured processes.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 34,
        "text": "I create detailed, comprehensive documentation for all code, systems, and architectural decisions.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 35,
        "text": "I maintain thorough test coverage and prefer test-driven development (TDD) approaches.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 36,
        "text": "I break down projects into detailed task lists with clear milestones and time estimates.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 37,
        "text": "I prepare detailed agendas, materials, and documentation for meetings and discussions.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 38,
        "text": "I communicate technical concepts in a structured, organized manner with clear frameworks.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 39,
        "text": "I implement comprehensive error handling, input validation, and edge case coverage in my code.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      },
      {
        "id": 40,
        "text": "I consistently follow established development processes, coding standards, and team methodologies.",
        "spectrum": "execution",
        "direction": "structured",
        "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
      }
    ]
  }'::jsonb,
  true
);

COMMIT;

-- Rollback instructions (if needed):
-- UPDATE quiz_versions SET is_active = false WHERE version = 2;
-- UPDATE quiz_versions SET is_active = true WHERE version = 1;
