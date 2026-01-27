-- Add the 8 missing Analyzer personality types

INSERT INTO personality_profiles (type_code, name, description, tagline, category, strengths, challenges, work_preferences)
VALUES
  ('A-S-E-L', 'The Systems Researcher', 'Deep technical analyst focused on understanding system architecture and optimization', 'Analyzing systems to find the optimal solution', 'architects',
   ARRAY['Deep technical analysis', 'System optimization', 'Research methodologies', 'Problem decomposition'],
   ARRAY['Analysis paralysis', 'Perfectionism', 'Slow decision making'],
   ARRAY['Time for deep analysis', 'Complex problems', 'Research opportunities']),

  ('A-S-E-V', 'The Architecture Visionary', 'Forward-thinking systems analyst exploring new architectural paradigms', 'Envisioning the future of system design', 'architects',
   ARRAY['Strategic thinking', 'Architecture patterns', 'Innovation analysis', 'Long-term planning'],
   ARRAY['Over-theorizing', 'Difficulty with execution', 'Resistance to constraints'],
   ARRAY['Greenfield projects', 'Architecture discussions', 'Innovation time']),

  ('A-S-O-L', 'The Infrastructure Analyst', 'Methodical analyst optimizing backend systems and infrastructure', 'Ensuring infrastructure runs flawlessly through analysis', 'engineers',
   ARRAY['Infrastructure analysis', 'Performance optimization', 'Reliability engineering', 'Data-driven decisions'],
   ARRAY['Risk aversion', 'Slow to implement', 'Over-optimization'],
   ARRAY['Stable environments', 'Clear metrics', 'Optimization projects']),

  ('A-S-O-V', 'The Backend Architect', 'Strategic backend analyst designing scalable system solutions', 'Building robust backend architectures', 'engineers',
   ARRAY['API design', 'Database optimization', 'Scalability analysis', 'System integration'],
   ARRAY['Feature complexity', 'Over-engineering tendency', 'Deadline pressure'],
   ARRAY['Architecture autonomy', 'Technical challenges', 'Design discussions']),

  ('A-U-E-L', 'The UX Researcher', 'Data-driven analyst exploring user behavior and experience patterns', 'Understanding users through rigorous analysis', 'innovators',
   ARRAY['User research', 'Data analysis', 'A/B testing', 'Behavioral patterns'],
   ARRAY['User feedback overload', 'Conflicting data', 'Implementation gaps'],
   ARRAY['Research time', 'User access', 'Data tools']),

  ('A-U-E-V', 'The Product Strategist', 'Visionary analyst defining product direction through market research', 'Charting product evolution through strategic analysis', 'innovators',
   ARRAY['Market analysis', 'Product strategy', 'Competitive research', 'Trend identification'],
   ARRAY['Market uncertainty', 'Stakeholder alignment', 'Execution gaps'],
   ARRAY['Strategy sessions', 'Market data', 'Cross-functional collaboration']),

  ('A-U-O-L', 'The Frontend Analyst', 'Detail-oriented analyst optimizing user interface performance', 'Perfecting frontend through systematic analysis', 'crafters',
   ARRAY['Performance analysis', 'Code optimization', 'Accessibility testing', 'Cross-browser testing'],
   ARRAY['Browser inconsistencies', 'Performance trade-offs', 'Design constraints'],
   ARRAY['Performance tools', 'Testing time', 'Clear requirements']),

  ('A-U-O-V', 'The Design Technologist', 'Strategic frontend analyst bridging design and engineering', 'Creating beautiful, functional interfaces through analysis', 'crafters',
   ARRAY['Design systems', 'Component architecture', 'Visual optimization', 'User-centered design'],
   ARRAY['Design-engineering gaps', 'Tool limitations', 'Aesthetic vs performance'],
   ARRAY['Design collaboration', 'Component libraries', 'Creative freedom'])
ON CONFLICT (type_code) DO NOTHING;

-- Verify we now have 16 types
SELECT COUNT(*) as total_types, COUNT(DISTINCT category) as categories FROM personality_profiles;
SELECT type_code, name FROM personality_profiles ORDER BY type_code;
