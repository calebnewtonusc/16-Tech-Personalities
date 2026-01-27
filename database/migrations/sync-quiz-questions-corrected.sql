-- Sync quiz questions from code to database with correct spectrum and direction values
-- This ensures the 40 questions match the scoring algorithm expectations

UPDATE quiz_versions
SET
  questions = jsonb_set(
    questions,
    '{questions}',
    '[
      {"id": 1, "text": "When starting a new project, I prefer to build a working prototype quickly, even if it''s rough around the edges.", "spectrum": "focus", "direction": "builder", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 2, "text": "I find deep satisfaction in understanding the ''why'' behind system design choices before writing code.", "spectrum": "focus", "direction": "analyzer", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 3, "text": "I''d rather ship something functional today than spend extra time making it perfect.", "spectrum": "focus", "direction": "builder", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 4, "text": "When debugging, I systematically trace the root cause rather than applying quick fixes.", "spectrum": "focus", "direction": "analyzer", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 5, "text": "I get energized by creating tangible features that users can interact with immediately.", "spectrum": "focus", "direction": "builder", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 6, "text": "I prefer to thoroughly research and plan architecture before implementation begins.", "spectrum": "focus", "direction": "analyzer", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 7, "text": "Iteration and rapid feedback loops are more valuable than extensive upfront design.", "spectrum": "focus", "direction": "builder", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 8, "text": "I enjoy analyzing performance bottlenecks and optimizing algorithms for efficiency.", "spectrum": "focus", "direction": "analyzer", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},

      {"id": 9, "text": "I care deeply about how users perceive and interact with the product interface.", "spectrum": "interface", "direction": "user", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 10, "text": "I''m more interested in database optimization and infrastructure than UI design.", "spectrum": "interface", "direction": "systems", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 11, "text": "User feedback and usability testing are the most important validation for my work.", "spectrum": "interface", "direction": "user", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 12, "text": "I find myself drawn to problems involving scalability, reliability, and system architecture.", "spectrum": "interface", "direction": "systems", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 13, "text": "I enjoy making things look polished and ensuring smooth user experiences.", "spectrum": "interface", "direction": "user", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 14, "text": "Working with APIs, databases, and backend logic excites me more than frontend work.", "spectrum": "interface", "direction": "systems", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 15, "text": "I prioritize accessibility and responsive design in everything I build.", "spectrum": "interface", "direction": "user", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 16, "text": "I''m fascinated by distributed systems, caching strategies, and infrastructure challenges.", "spectrum": "interface", "direction": "systems", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},

      {"id": 17, "text": "I thrive when working on new, undefined problems with no established solutions.", "spectrum": "changeStyle", "direction": "exploratory", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 18, "text": "I find fulfillment in maintaining and improving existing production systems.", "spectrum": "changeStyle", "direction": "operational", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 19, "text": "Experimenting with cutting-edge technologies excites me more than refining current ones.", "spectrum": "changeStyle", "direction": "exploratory", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 20, "text": "Ensuring system reliability and uptime is deeply satisfying work for me.", "spectrum": "changeStyle", "direction": "operational", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 21, "text": "I prefer greenfield projects where I can explore novel approaches.", "spectrum": "changeStyle", "direction": "exploratory", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 22, "text": "I value the challenge of scaling systems and preventing production incidents.", "spectrum": "changeStyle", "direction": "operational", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 23, "text": "Research and proof-of-concept work appeals to me more than production engineering.", "spectrum": "changeStyle", "direction": "exploratory", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 24, "text": "I take pride in building robust monitoring, alerting, and operational excellence.", "spectrum": "changeStyle", "direction": "operational", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},

      {"id": 25, "text": "I make decisions based on the product vision and user impact, even if metrics are unclear.", "spectrum": "decision", "direction": "vision", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 26, "text": "I rely heavily on data, benchmarks, and measurable outcomes to guide my choices.", "spectrum": "decision", "direction": "logic", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 27, "text": "Understanding the ''why'' behind features matters more to me than technical constraints.", "spectrum": "decision", "direction": "vision", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 28, "text": "I prioritize technical feasibility and performance metrics over aspirational goals.", "spectrum": "decision", "direction": "logic", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 29, "text": "I''m motivated by creating delightful user experiences, even if the path is unclear.", "spectrum": "decision", "direction": "vision", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 30, "text": "I prefer solutions backed by empirical evidence and quantitative analysis.", "spectrum": "decision", "direction": "logic", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 31, "text": "I think about product strategy and long-term vision when solving technical problems.", "spectrum": "decision", "direction": "vision", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 32, "text": "I focus on what''s technically sound and proven rather than what''s aspirational.", "spectrum": "decision", "direction": "logic", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},

      {"id": 33, "text": "I adapt easily to changing requirements and pivot directions without frustration.", "spectrum": "execution", "direction": "adaptive", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 34, "text": "I work best when there''s a clear plan, timeline, and defined deliverables.", "spectrum": "execution", "direction": "structured", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 35, "text": "I''m comfortable with ambiguity and figure things out as I go.", "spectrum": "execution", "direction": "adaptive", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 36, "text": "I prefer structured workflows with established processes and documentation.", "spectrum": "execution", "direction": "structured", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 37, "text": "I thrive in fast-paced environments where priorities shift frequently.", "spectrum": "execution", "direction": "adaptive", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 38, "text": "I value predictability and systematic approaches to project management.", "spectrum": "execution", "direction": "structured", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 39, "text": "I enjoy wearing multiple hats and context-switching between different tasks.", "spectrum": "execution", "direction": "adaptive", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]},
      {"id": 40, "text": "I find deep focus on one well-defined task more productive than multitasking.", "spectrum": "execution", "direction": "structured", "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]}
    ]'::jsonb
  )
WHERE is_active = true;

-- Verify the update
SELECT
  id,
  version,
  is_active,
  jsonb_array_length(questions->'questions') as question_count,
  questions->'questions'->0->>'text' as first_question_text,
  questions->'questions'->0->>'spectrum' as first_question_spectrum,
  questions->'questions'->0->>'direction' as first_question_direction,
  questions->'questions'->0->'options' as sample_options
FROM quiz_versions
WHERE is_active = true;
