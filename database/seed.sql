-- Seed Data for Tech 16 Personalities
-- Run this after initial schema migration

-- Insert quiz version with 40 questions
INSERT INTO quiz_versions (version, questions, is_active) VALUES (
  1,
  '{
    "questions": [
      {
        "id": 1,
        "text": "When starting a new project, I prefer to:",
        "spectrum": "focus",
        "direction": "builder",
        "options": [
          "Jump straight into building a prototype",
          "Spend time analyzing requirements first",
          "Balance quick prototyping with analysis",
          "Focus heavily on architectural design",
          "Deep-dive into technical specifications"
        ]
      },
      {
        "id": 2,
        "text": "I feel most energized when working on:",
        "spectrum": "interface",
        "direction": "user",
        "options": [
          "User interfaces and experiences",
          "API design and integration",
          "Backend systems and databases",
          "Infrastructure and DevOps",
          "Low-level system optimization"
        ]
      },
      {
        "id": 3,
        "text": "When faced with a bug in production:",
        "spectrum": "execution",
        "direction": "adaptive",
        "options": [
          "Quickly patch it and move on",
          "Create a hotfix with minimal testing",
          "Fix it properly with full test coverage",
          "Follow the complete change management process",
          "Document everything and update runbooks"
        ]
      },
      {
        "id": 4,
        "text": "I make my best technical decisions based on:",
        "spectrum": "decision",
        "direction": "vision",
        "options": [
          "Gut feeling and experience",
          "What feels right for the product",
          "A mix of data and intuition",
          "Hard metrics and benchmarks",
          "Detailed technical analysis"
        ]
      },
      {
        "id": 5,
        "text": "When joining a new team, I prefer:",
        "spectrum": "change",
        "direction": "exploratory",
        "options": [
          "Learning the latest tech stack",
          "Understanding new patterns and practices",
          "Getting up to speed efficiently",
          "Following established procedures",
          "Mastering the existing codebase"
        ]
      },
      {
        "id": 6,
        "text": "In code reviews, I focus most on:",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": [
          "Whether it works and ships quickly",
          "Code quality and maintainability",
          "Performance and optimization",
          "Security and edge cases",
          "Architecture and design patterns"
        ]
      },
      {
        "id": 7,
        "text": "My ideal project involves:",
        "spectrum": "interface",
        "direction": "user",
        "options": [
          "Creating beautiful UIs",
          "Building customer-facing features",
          "Developing APIs and services",
          "Working on core infrastructure",
          "Optimizing system performance"
        ]
      },
      {
        "id": 8,
        "text": "When planning sprints, I:",
        "spectrum": "execution",
        "direction": "structured",
        "options": [
          "Keep things flexible and adaptable",
          "Have a general direction",
          "Balance planning with flexibility",
          "Create detailed task breakdowns",
          "Plan everything meticulously"
        ]
      },
      {
        "id": 9,
        "text": "I choose technologies based on:",
        "spectrum": "decision",
        "direction": "logic",
        "options": [
          "What excites the team",
          "Product-market fit",
          "Balanced evaluation",
          "Technical merit and performance",
          "Detailed benchmarks and comparisons"
        ]
      },
      {
        "id": 10,
        "text": "I learn best by:",
        "spectrum": "change",
        "direction": "exploratory",
        "options": [
          "Trying new things constantly",
          "Experimenting with different approaches",
          "Structured learning with some exploration",
          "Following proven paths",
          "Deep-diving into fundamentals"
        ]
      },
      {
        "id": 11,
        "text": "When solving a complex problem:",
        "spectrum": "focus",
        "direction": "builder",
        "options": [
          "I build a quick solution first",
          "I prototype multiple approaches",
          "I balance speed with quality",
          "I research thoroughly before coding",
          "I design the perfect architecture"
        ]
      },
      {
        "id": 12,
        "text": "I get the most satisfaction from:",
        "spectrum": "interface",
        "direction": "systems",
        "options": [
          "Seeing users love the product",
          "Building features customers request",
          "Creating robust APIs",
          "Architecting scalable systems",
          "Optimizing performance metrics"
        ]
      },
      {
        "id": 13,
        "text": "My approach to testing is:",
        "spectrum": "execution",
        "direction": "adaptive",
        "options": [
          "Test manually when needed",
          "Write tests for critical paths",
          "Maintain good test coverage",
          "Follow TDD practices",
          "Achieve comprehensive test coverage"
        ]
      },
      {
        "id": 14,
        "text": "When evaluating a technical proposal:",
        "spectrum": "decision",
        "direction": "vision",
        "options": [
          "I trust my instincts",
          "I consider the product vision",
          "I weigh pros and cons",
          "I look at the data",
          "I analyze every technical detail"
        ]
      },
      {
        "id": 15,
        "text": "I prefer working in:",
        "spectrum": "change",
        "direction": "operational",
        "options": [
          "Rapidly changing environments",
          "Dynamic but manageable settings",
          "Balanced pace of change",
          "Stable, predictable contexts",
          "Well-established, mature systems"
        ]
      },
      {
        "id": 16,
        "text": "When refactoring code, I:",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": [
          "Keep it minimal and ship faster",
          "Improve what needs immediate fixing",
          "Balance improvement with delivery",
          "Make thorough improvements",
          "Redesign for optimal architecture"
        ]
      },
      {
        "id": 17,
        "text": "I am drawn to projects that:",
        "spectrum": "interface",
        "direction": "user",
        "options": [
          "Have visible user impact",
          "Solve customer problems",
          "Enable other developers",
          "Build foundational systems",
          "Push technical boundaries"
        ]
      },
      {
        "id": 18,
        "text": "My documentation style is:",
        "spectrum": "execution",
        "direction": "structured",
        "options": [
          "Minimal, just enough to understand",
          "Focused on key points",
          "Reasonably comprehensive",
          "Detailed and thorough",
          "Exhaustive with examples"
        ]
      },
      {
        "id": 19,
        "text": "When choosing between options, I rely on:",
        "spectrum": "decision",
        "direction": "logic",
        "options": [
          "Gut feeling",
          "Team consensus and vision",
          "Mix of data and intuition",
          "Objective metrics",
          "Rigorous technical analysis"
        ]
      },
      {
        "id": 20,
        "text": "I handle new technologies by:",
        "spectrum": "change",
        "direction": "exploratory",
        "options": [
          "Jumping in and experimenting",
          "Learning through practice",
          "Structured exploration",
          "Waiting for proven value",
          "Thorough evaluation first"
        ]
      },
      {
        "id": 21,
        "text": "In technical discussions, I:",
        "spectrum": "focus",
        "direction": "builder",
        "options": [
          "Focus on shipping quickly",
          "Emphasize practical solutions",
          "Balance speed and quality",
          "Dive into technical details",
          "Analyze all implications"
        ]
      },
      {
        "id": 22,
        "text": "The work I enjoy most is:",
        "spectrum": "interface",
        "direction": "systems",
        "options": [
          "Frontend and UI work",
          "Full-stack feature development",
          "Backend API development",
          "Infrastructure and tooling",
          "Core systems and optimization"
        ]
      },
      {
        "id": 23,
        "text": "My workflow is:",
        "spectrum": "execution",
        "direction": "adaptive",
        "options": [
          "Highly flexible and spontaneous",
          "Loosely structured",
          "Semi-structured with flexibility",
          "Well-organized and planned",
          "Rigidly structured and methodical"
        ]
      },
      {
        "id": 24,
        "text": "I validate my ideas through:",
        "spectrum": "decision",
        "direction": "vision",
        "options": [
          "Building and seeing what works",
          "User feedback and iteration",
          "Combination of testing and data",
          "A/B tests and metrics",
          "Comprehensive analysis"
        ]
      },
      {
        "id": 25,
        "text": "When a major change is announced:",
        "spectrum": "change",
        "direction": "operational",
        "options": [
          "I embrace it immediately",
          "I adapt with some hesitation",
          "I evaluate before adopting",
          "I prefer stability",
          "I resist unless necessary"
        ]
      },
      {
        "id": 26,
        "text": "My coding philosophy is:",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": [
          "Make it work first",
          "Working software over perfect code",
          "Clean code that works",
          "Well-designed, maintainable code",
          "Architecturally perfect systems"
        ]
      },
      {
        "id": 27,
        "text": "I prefer to work on:",
        "spectrum": "interface",
        "direction": "user",
        "options": [
          "User-facing applications",
          "Customer-centric features",
          "Developer-facing tools",
          "Platform and infrastructure",
          "Core system components"
        ]
      },
      {
        "id": 28,
        "text": "My meeting preparation is:",
        "spectrum": "execution",
        "direction": "structured",
        "options": [
          "Show up and wing it",
          "Quick mental prep",
          "Basic outline prepared",
          "Detailed notes and agenda",
          "Comprehensive presentation deck"
        ]
      },
      {
        "id": 29,
        "text": "I make architecture decisions based on:",
        "spectrum": "decision",
        "direction": "logic",
        "options": [
          "What feels right",
          "Product requirements",
          "Practical considerations",
          "Performance and scalability data",
          "Detailed technical evaluation"
        ]
      },
      {
        "id": 30,
        "text": "My attitude toward legacy code is:",
        "spectrum": "change",
        "direction": "exploratory",
        "options": [
          "Rewrite it all",
          "Modernize incrementally",
          "Improve as needed",
          "Maintain with care",
          "Preserve and document"
        ]
      },
      {
        "id": 31,
        "text": "When estimating tasks, I:",
        "spectrum": "focus",
        "direction": "builder",
        "options": [
          "Give quick estimates",
          "Estimate based on feel",
          "Calculate reasonable estimates",
          "Break down and sum carefully",
          "Analyze every detail"
        ]
      },
      {
        "id": 32,
        "text": "I am most proud of projects that:",
        "spectrum": "interface",
        "direction": "systems",
        "options": [
          "Delight end users",
          "Solve real customer problems",
          "Enable other teams",
          "Scale efficiently",
          "Achieve technical excellence"
        ]
      },
      {
        "id": 33,
        "text": "My error handling approach is:",
        "spectrum": "execution",
        "direction": "adaptive",
        "options": [
          "Handle errors as they come up",
          "Basic try-catch coverage",
          "Solid error handling",
          "Comprehensive error coverage",
          "Exhaustive error management"
        ]
      },
      {
        "id": 34,
        "text": "When learning a new codebase:",
        "spectrum": "decision",
        "direction": "vision",
        "options": [
          "Start coding and learn by doing",
          "Understand the product flow",
          "Read code and documentation",
          "Trace execution paths",
          "Study the architecture thoroughly"
        ]
      },
      {
        "id": 35,
        "text": "I view technical debt as:",
        "spectrum": "change",
        "direction": "operational",
        "options": [
          "Necessary for speed",
          "Sometimes acceptable",
          "To be managed carefully",
          "Important to minimize",
          "Must be avoided"
        ]
      },
      {
        "id": 36,
        "text": "In pair programming, I prefer to:",
        "spectrum": "focus",
        "direction": "analyzer",
        "options": [
          "Drive and implement quickly",
          "Collaborate on solutions",
          "Share driving equally",
          "Navigate and guide carefully",
          "Analyze and review thoroughly"
        ]
      },
      {
        "id": 37,
        "text": "The metrics I care most about are:",
        "spectrum": "interface",
        "direction": "user",
        "options": [
          "User satisfaction scores",
          "Customer engagement metrics",
          "API performance and uptime",
          "System reliability and scale",
          "Technical performance metrics"
        ]
      },
      {
        "id": 38,
        "text": "My communication style is:",
        "spectrum": "execution",
        "direction": "structured",
        "options": [
          "Casual and spontaneous",
          "Conversational",
          "Organized but friendly",
          "Structured and clear",
          "Formal and detailed"
        ]
      },
      {
        "id": 39,
        "text": "When debugging, I:",
        "spectrum": "decision",
        "direction": "logic",
        "options": [
          "Try things until it works",
          "Follow hunches",
          "Use systematic debugging",
          "Analyze logs and traces",
          "Build reproducible test cases"
        ]
      },
      {
        "id": 40,
        "text": "I prefer tools and frameworks that are:",
        "spectrum": "change",
        "direction": "operational",
        "options": [
          "Cutting-edge and innovative",
          "Modern but proven",
          "Balanced and reliable",
          "Mature and stable",
          "Battle-tested and established"
        ]
      }
    ]
  }'::jsonb,
  true
);

-- Insert 16 personality profiles
INSERT INTO personality_profiles (type_code, name, description, strengths, challenges, work_preferences) VALUES
(
  'B-U-E-V-A',
  'The Innovator',
  'You are a creative problem-solver who thrives on building user-facing products with speed and vision. You love rapid prototyping and bringing ideas to life through experimentation.',
  ARRAY[
    'Rapid prototyping and iteration',
    'User-centric thinking',
    'Adaptable to changing requirements',
    'Strong product intuition',
    'Creative problem-solving'
  ],
  ARRAY[
    'May skip thorough planning',
    'Can accumulate technical debt',
    'Might overlook edge cases',
    'Testing may be inconsistent'
  ],
  ARRAY[
    'Startup environments',
    'Product-focused teams',
    'Frontend/UI development',
    'Early-stage projects',
    'User research integration'
  ]
),
(
  'B-U-E-V-T',
  'The Product Engineer',
  'You combine rapid development with structured execution, building user-facing features efficiently while maintaining code quality and process.',
  ARRAY[
    'Fast feature delivery',
    'User empathy',
    'Balanced speed and quality',
    'Strong product sense',
    'Organized workflow'
  ],
  ARRAY[
    'May over-structure simple tasks',
    'Can be impatient with analysis',
    'Might resist deep technical discussions'
  ],
  ARRAY[
    'Product engineering teams',
    'Growth-stage startups',
    'Full-stack development',
    'Agile environments',
    'Customer-focused work'
  ]
),
(
  'B-U-E-L-A',
  'The Pragmatic Designer',
  'You build user experiences based on data and metrics, combining quick iteration with logical decision-making to create effective products.',
  ARRAY[
    'Data-driven design',
    'Quick experimentation',
    'User-focused metrics',
    'Flexible approach',
    'Practical solutions'
  ],
  ARRAY[
    'May rely too heavily on data',
    'Could miss emotional aspects',
    'Might iterate excessively'
  ],
  ARRAY[
    'Growth teams',
    'A/B testing environments',
    'UX research roles',
    'Data-informed design',
    'Conversion optimization'
  ]
),
(
  'B-U-E-L-T',
  'The Growth Hacker',
  'You systematically build and test user-facing features, using data and structure to drive rapid growth and optimization.',
  ARRAY[
    'Systematic experimentation',
    'Metrics-driven development',
    'Efficient execution',
    'User acquisition focus',
    'Process optimization'
  ],
  ARRAY[
    'Can be overly metrics-focused',
    'May miss creative solutions',
    'Might over-optimize'
  ],
  ARRAY[
    'Growth engineering',
    'Marketing technology',
    'Analytics platforms',
    'Conversion optimization',
    'Performance marketing'
  ]
),
(
  'B-U-O-V-A',
  'The Startup Builder',
  'You thrive in stable, user-focused environments where you can build reliable products with intuition and adaptability.',
  ARRAY[
    'Reliable execution',
    'User-centric mindset',
    'Adaptable workflow',
    'Strong intuition',
    'Practical implementation'
  ],
  ARRAY[
    'May resist new technologies',
    'Can be too conservative',
    'Might avoid experimentation'
  ],
  ARRAY[
    'Mature product teams',
    'Enterprise applications',
    'Customer-facing platforms',
    'Stable environments',
    'Maintenance-focused work'
  ]
),
(
  'B-U-O-V-T',
  'The Professional Developer',
  'You build polished user experiences with structure and reliability, combining product sense with professional execution.',
  ARRAY[
    'High-quality delivery',
    'User satisfaction focus',
    'Structured approach',
    'Reliable output',
    'Professional standards'
  ],
  ARRAY[
    'May be slow to adopt change',
    'Can over-engineer simple features',
    'Might resist experimentation'
  ],
  ARRAY[
    'Enterprise software',
    'Consulting',
    'Client-facing projects',
    'Production applications',
    'Quality-focused teams'
  ]
),
(
  'B-U-O-L-A',
  'The UX Engineer',
  'You build user interfaces based on research and data, maintaining flexibility while ensuring quality and usability.',
  ARRAY[
    'User research application',
    'Data-informed design',
    'Quality focus',
    'Practical solutions',
    'Adaptable execution'
  ],
  ARRAY[
    'May over-analyze user data',
    'Can be cautious about changes',
    'Might resist quick iterations'
  ],
  ARRAY[
    'UX engineering',
    'Design systems',
    'Accessibility work',
    'User research teams',
    'Enterprise UX'
  ]
),
(
  'B-U-O-L-T',
  'The Quality Engineer',
  'You deliver high-quality user experiences through systematic processes, data-driven decisions, and meticulous execution.',
  ARRAY[
    'Exceptional quality',
    'Systematic approach',
    'Data-driven decisions',
    'User-focused metrics',
    'Thorough execution'
  ],
  ARRAY[
    'Can be slow to deliver',
    'May over-test features',
    'Might resist rapid changes'
  ],
  ARRAY[
    'Quality assurance',
    'Enterprise applications',
    'Accessibility teams',
    'Compliance-focused work',
    'Testing automation'
  ]
),
(
  'B-S-E-V-A',
  'The Full-Stack Explorer',
  'You love building complete systems quickly, exploring new technologies, and adapting your approach based on product vision.',
  ARRAY[
    'Full-stack capability',
    'Technology exploration',
    'Rapid prototyping',
    'System thinking',
    'Flexible approach'
  ],
  ARRAY[
    'May spread too thin',
    'Can chase new tech too often',
    'Might lack depth in areas'
  ],
  ARRAY[
    'Full-stack development',
    'Startup environments',
    'Prototyping teams',
    'Innovation labs',
    'R&D projects'
  ]
),
(
  'B-S-E-V-T',
  'The Systems Builder',
  'You rapidly build backend systems and infrastructure with structured processes, combining speed with architectural thinking.',
  ARRAY[
    'Fast system development',
    'Architectural vision',
    'Structured execution',
    'Scalability focus',
    'Process-driven'
  ],
  ARRAY[
    'May build before fully analyzing',
    'Can over-structure simple systems',
    'Might resist changing architecture'
  ],
  ARRAY[
    'Backend development',
    'Microservices',
    'API development',
    'Cloud architecture',
    'Platform engineering'
  ]
),
(
  'B-S-E-L-A',
  'The Performance Engineer',
  'You build fast, efficient systems through experimentation and data-driven optimization, maintaining flexibility in your approach.',
  ARRAY[
    'Performance optimization',
    'Data-driven decisions',
    'Quick experimentation',
    'Systems thinking',
    'Flexible methodology'
  ],
  ARRAY[
    'May over-optimize prematurely',
    'Can focus too much on metrics',
    'Might neglect other priorities'
  ],
  ARRAY[
    'Performance engineering',
    'Infrastructure optimization',
    'Database tuning',
    'Cloud cost optimization',
    'Scalability work'
  ]
),
(
  'B-S-E-L-T',
  'The Platform Engineer',
  'You systematically build scalable platforms and infrastructure, using data and structure to create reliable systems.',
  ARRAY[
    'Platform scalability',
    'Systematic approach',
    'Data-driven architecture',
    'Reliable execution',
    'Performance focus'
  ],
  ARRAY[
    'Can be overly systematic',
    'May resist quick solutions',
    'Might over-engineer'
  ],
  ARRAY[
    'Platform engineering',
    'DevOps/SRE',
    'Infrastructure as code',
    'Cloud platforms',
    'Automation engineering'
  ]
),
(
  'B-S-O-V-A',
  'The Backend Developer',
  'You build reliable backend systems with proven technologies, using intuition and adaptability to solve problems efficiently.',
  ARRAY[
    'Reliable systems',
    'Proven technologies',
    'Practical solutions',
    'Adaptable approach',
    'Strong intuition'
  ],
  ARRAY[
    'May resist new technologies',
    'Can be conservative in design',
    'Might avoid experimentation'
  ],
  ARRAY[
    'Backend development',
    'Enterprise systems',
    'Legacy maintenance',
    'Stable platforms',
    'Traditional architectures'
  ]
),
(
  'B-S-O-V-T',
  'The Infrastructure Specialist',
  'You maintain and improve infrastructure with structured processes and vision, ensuring reliability and stability.',
  ARRAY[
    'Infrastructure reliability',
    'Structured processes',
    'Operational excellence',
    'Strategic thinking',
    'Stability focus'
  ],
  ARRAY[
    'May resist change too much',
    'Can be overly cautious',
    'Might slow down innovation'
  ],
  ARRAY[
    'Site reliability engineering',
    'Infrastructure operations',
    'Enterprise IT',
    'Systems administration',
    'Capacity planning'
  ]
),
(
  'B-S-O-L-A',
  'The Systems Optimizer',
  'You optimize existing systems through careful analysis and practical improvements, maintaining flexibility in execution.',
  ARRAY[
    'System optimization',
    'Analytical approach',
    'Practical improvements',
    'Flexible execution',
    'Data-driven decisions'
  ],
  ARRAY[
    'May over-analyze before acting',
    'Can resist major changes',
    'Might focus too narrowly'
  ],
  ARRAY[
    'Performance tuning',
    'Database optimization',
    'System analysis',
    'Efficiency engineering',
    'Technical consulting'
  ]
),
(
  'B-S-O-L-T',
  'The Architect',
  'You design and maintain robust systems with meticulous analysis, structured processes, and deep technical expertise.',
  ARRAY[
    'Architectural excellence',
    'Thorough analysis',
    'Systematic design',
    'Technical depth',
    'Long-term thinking'
  ],
  ARRAY[
    'Can be slow to deliver',
    'May over-architect',
    'Might resist rapid changes'
  ],
  ARRAY[
    'Solutions architecture',
    'Enterprise architecture',
    'Technical leadership',
    'System design',
    'Strategic planning'
  ]
);

-- Insert 16 tech roles
INSERT INTO tech_roles (name, description, skills, roadmap) VALUES
(
  'Frontend Developer',
  'Build beautiful, responsive user interfaces and web applications that users love to interact with.',
  ARRAY[
    'HTML/CSS/JavaScript',
    'React/Vue/Angular',
    'Responsive Design',
    'Web Performance',
    'Accessibility',
    'UI/UX Principles'
  ],
  '{
    "beginner": ["Learn HTML, CSS, JavaScript fundamentals", "Build static websites", "Understand DOM manipulation", "Learn Git basics"],
    "intermediate": ["Master React or Vue", "Learn state management (Redux/Zustand)", "Build complex SPAs", "Learn TypeScript", "Understand build tools (Webpack/Vite)"],
    "advanced": ["Master performance optimization", "Learn advanced CSS (animations, layouts)", "Contribute to design systems", "Learn testing (Jest, Testing Library)", "Mentor junior developers"],
    "expert": ["Architect frontend applications", "Lead technical decisions", "Contribute to open source", "Speak at conferences", "Innovate new patterns"]
  }'::jsonb
),
(
  'Backend Developer',
  'Design and build server-side logic, APIs, and database systems that power modern applications.',
  ARRAY[
    'Server-side language (Node.js/Python/Java)',
    'Database design (SQL/NoSQL)',
    'API design (REST/GraphQL)',
    'Authentication/Authorization',
    'Caching strategies',
    'System architecture'
  ],
  '{
    "beginner": ["Learn server-side language", "Understand HTTP and REST", "Learn SQL basics", "Build simple CRUD APIs"],
    "intermediate": ["Master database design", "Learn authentication patterns", "Build scalable APIs", "Understand caching", "Learn Docker basics"],
    "advanced": ["Design microservices", "Master database optimization", "Implement complex auth flows", "Learn message queues", "Mentor team members"],
    "expert": ["Architect distributed systems", "Lead backend infrastructure", "Optimize at scale", "Contribute to frameworks", "Drive technical strategy"]
  }'::jsonb
),
(
  'Full-Stack Developer',
  'Build complete applications from frontend to backend, bridging user experience with server-side logic.',
  ARRAY[
    'Frontend frameworks',
    'Backend frameworks',
    'Database management',
    'API design',
    'DevOps basics',
    'Full system thinking'
  ],
  '{
    "beginner": ["Learn both frontend and backend basics", "Build simple full-stack apps", "Understand client-server architecture", "Learn basic deployment"],
    "intermediate": ["Master a full-stack framework (Next.js/Django)", "Build production apps", "Learn CI/CD", "Understand security best practices"],
    "advanced": ["Architect full-stack applications", "Master both frontend and backend deeply", "Lead feature development", "Mentor across the stack"],
    "expert": ["Design complete product architectures", "Lead full-stack teams", "Drive technical decisions", "Innovate across the stack"]
  }'::jsonb
),
(
  'DevOps Engineer',
  'Automate and optimize the software delivery process, ensuring reliable and efficient deployments.',
  ARRAY[
    'CI/CD pipelines',
    'Cloud platforms (AWS/GCP/Azure)',
    'Infrastructure as Code',
    'Container orchestration',
    'Monitoring and logging',
    'Automation scripting'
  ],
  '{
    "beginner": ["Learn Linux basics", "Understand CI/CD concepts", "Learn Docker", "Basic cloud platform knowledge"],
    "intermediate": ["Master Kubernetes", "Learn Infrastructure as Code (Terraform)", "Build CI/CD pipelines", "Implement monitoring"],
    "advanced": ["Design cloud architecture", "Optimize infrastructure costs", "Implement advanced security", "Lead DevOps transformation"],
    "expert": ["Architect enterprise infrastructure", "Drive DevOps culture", "Innovate deployment strategies", "Lead platform teams"]
  }'::jsonb
),
(
  'Mobile Developer',
  'Create native or cross-platform mobile applications for iOS and Android devices.',
  ARRAY[
    'iOS/Android development',
    'React Native/Flutter',
    'Mobile UI/UX patterns',
    'App store optimization',
    'Mobile performance',
    'Platform APIs'
  ],
  '{
    "beginner": ["Learn mobile development basics", "Build simple apps", "Understand mobile UI patterns", "Learn app deployment"],
    "intermediate": ["Master platform-specific features", "Build complex apps", "Implement offline support", "Learn mobile testing"],
    "advanced": ["Optimize app performance", "Architect mobile apps", "Lead mobile development", "Contribute to mobile frameworks"],
    "expert": ["Design mobile architecture", "Lead mobile strategy", "Innovate mobile patterns", "Speak at mobile conferences"]
  }'::jsonb
),
(
  'Data Engineer',
  'Build and maintain data pipelines, warehouses, and infrastructure for data-driven organizations.',
  ARRAY[
    'SQL and database design',
    'ETL/ELT pipelines',
    'Data warehousing',
    'Big data tools (Spark/Kafka)',
    'Cloud data platforms',
    'Data modeling'
  ],
  '{
    "beginner": ["Master SQL", "Learn data modeling", "Understand ETL basics", "Build simple pipelines"],
    "intermediate": ["Learn Apache Spark", "Master data warehousing", "Build production pipelines", "Learn cloud data tools"],
    "advanced": ["Design data architectures", "Optimize pipeline performance", "Lead data infrastructure", "Implement data governance"],
    "expert": ["Architect enterprise data platforms", "Drive data strategy", "Innovate data solutions", "Lead data teams"]
  }'::jsonb
),
(
  'Machine Learning Engineer',
  'Build and deploy machine learning models and systems that learn from data to make predictions.',
  ARRAY[
    'Python and ML libraries',
    'Statistical analysis',
    'Model training and evaluation',
    'ML deployment (MLOps)',
    'Feature engineering',
    'Deep learning frameworks'
  ],
  '{
    "beginner": ["Learn Python and ML basics", "Understand statistics", "Build simple models", "Learn data preprocessing"],
    "intermediate": ["Master ML algorithms", "Learn deep learning", "Build production models", "Understand MLOps"],
    "advanced": ["Design ML systems", "Optimize model performance", "Lead ML projects", "Implement MLOps practices"],
    "expert": ["Architect ML platforms", "Drive ML strategy", "Research new techniques", "Lead ML teams"]
  }'::jsonb
),
(
  'Site Reliability Engineer',
  'Ensure system reliability, performance, and scalability through automation and engineering practices.',
  ARRAY[
    'System administration',
    'Monitoring and alerting',
    'Incident response',
    'Performance optimization',
    'Automation scripting',
    'Distributed systems'
  ],
  '{
    "beginner": ["Learn Linux systems", "Understand monitoring basics", "Learn scripting", "Study incident response"],
    "intermediate": ["Master monitoring tools", "Build automation", "Implement SLOs/SLIs", "Learn capacity planning"],
    "advanced": ["Design reliable systems", "Lead incident response", "Optimize at scale", "Implement chaos engineering"],
    "expert": ["Architect reliability solutions", "Drive SRE culture", "Innovate reliability practices", "Lead SRE teams"]
  }'::jsonb
),
(
  'Security Engineer',
  'Protect systems, applications, and data from security threats through proactive security measures.',
  ARRAY[
    'Security fundamentals',
    'Penetration testing',
    'Security tools and scanning',
    'Compliance standards',
    'Incident response',
    'Cryptography basics'
  ],
  '{
    "beginner": ["Learn security fundamentals", "Understand common vulnerabilities", "Learn basic penetration testing", "Study security best practices"],
    "intermediate": ["Master security tools", "Perform security audits", "Implement security controls", "Learn threat modeling"],
    "advanced": ["Design security architectures", "Lead security initiatives", "Perform advanced pentesting", "Implement zero-trust"],
    "expert": ["Architect enterprise security", "Drive security strategy", "Research security innovations", "Lead security teams"]
  }'::jsonb
),
(
  'Cloud Architect',
  'Design and implement cloud-based solutions and infrastructure that scale and perform efficiently.',
  ARRAY[
    'Cloud platforms (AWS/GCP/Azure)',
    'Cloud architecture patterns',
    'Cost optimization',
    'Security in the cloud',
    'Serverless computing',
    'Multi-cloud strategies'
  ],
  '{
    "beginner": ["Learn cloud basics", "Understand cloud services", "Get platform certifications", "Build simple cloud apps"],
    "intermediate": ["Master cloud architecture", "Learn cost optimization", "Implement security best practices", "Build complex solutions"],
    "advanced": ["Design enterprise architectures", "Lead cloud migrations", "Optimize multi-account setups", "Mentor team members"],
    "expert": ["Architect cloud strategy", "Drive cloud transformation", "Innovate cloud solutions", "Lead architecture teams"]
  }'::jsonb
),
(
  'UI/UX Designer (Technical)',
  'Design user experiences with technical implementation knowledge, bridging design and development.',
  ARRAY[
    'Design tools (Figma/Sketch)',
    'HTML/CSS basics',
    'Design systems',
    'User research',
    'Prototyping',
    'Accessibility standards'
  ],
  '{
    "beginner": ["Learn design tools", "Understand UI principles", "Learn basic HTML/CSS", "Study user research"],
    "intermediate": ["Master prototyping", "Build design systems", "Learn interaction design", "Understand frontend constraints"],
    "advanced": ["Lead design systems", "Conduct user research", "Mentor designers", "Drive design decisions"],
    "expert": ["Architect design systems", "Lead design strategy", "Innovate design processes", "Lead design teams"]
  }'::jsonb
),
(
  'Product Manager (Technical)',
  'Define product strategy and roadmap with deep technical understanding of implementation.',
  ARRAY[
    'Product strategy',
    'Technical understanding',
    'User research',
    'Data analysis',
    'Agile methodologies',
    'Stakeholder management'
  ],
  '{
    "beginner": ["Learn product basics", "Understand technical concepts", "Study user research methods", "Learn agile practices"],
    "intermediate": ["Define product roadmaps", "Lead feature development", "Analyze product metrics", "Work with engineering teams"],
    "advanced": ["Drive product strategy", "Lead product initiatives", "Mentor PMs", "Make technical tradeoffs"],
    "expert": ["Define product vision", "Lead product organization", "Drive business strategy", "Innovate product processes"]
  }'::jsonb
),
(
  'QA/Test Automation Engineer',
  'Ensure software quality through automated testing, test design, and quality assurance processes.',
  ARRAY[
    'Test automation frameworks',
    'Programming skills',
    'Testing methodologies',
    'CI/CD integration',
    'Performance testing',
    'API testing'
  ],
  '{
    "beginner": ["Learn testing basics", "Understand test types", "Learn automation tools", "Write simple tests"],
    "intermediate": ["Master test frameworks", "Build test automation", "Integrate with CI/CD", "Learn performance testing"],
    "advanced": ["Design test strategies", "Lead QA initiatives", "Mentor QA engineers", "Optimize test coverage"],
    "expert": ["Architect test infrastructure", "Drive quality culture", "Innovate testing practices", "Lead QA teams"]
  }'::jsonb
),
(
  'Systems Architect',
  'Design high-level system structures and make key technical decisions for complex systems.',
  ARRAY[
    'System design patterns',
    'Distributed systems',
    'Scalability strategies',
    'Database architecture',
    'Microservices',
    'Cloud architecture'
  ],
  '{
    "beginner": ["Learn system design basics", "Understand architecture patterns", "Study distributed systems", "Learn database design"],
    "intermediate": ["Design scalable systems", "Master microservices", "Learn cloud architecture", "Understand tradeoffs"],
    "advanced": ["Architect complex systems", "Lead technical decisions", "Mentor engineers", "Drive architecture standards"],
    "expert": ["Define technical vision", "Lead architecture teams", "Innovate system patterns", "Drive technical strategy"]
  }'::jsonb
),
(
  'Database Administrator',
  'Manage, optimize, and maintain database systems ensuring performance, security, and reliability.',
  ARRAY[
    'Database management',
    'SQL optimization',
    'Backup and recovery',
    'Performance tuning',
    'Database security',
    'High availability'
  ],
  '{
    "beginner": ["Learn database basics", "Master SQL", "Understand backup/recovery", "Learn database design"],
    "intermediate": ["Optimize queries", "Implement security", "Configure high availability", "Monitor performance"],
    "advanced": ["Design database architecture", "Lead database initiatives", "Optimize at scale", "Mentor DBAs"],
    "expert": ["Architect data infrastructure", "Drive database strategy", "Innovate database solutions", "Lead data teams"]
  }'::jsonb
),
(
  'Technical Writer/DevRel',
  'Create technical documentation and developer resources, bridging technical teams and users.',
  ARRAY[
    'Technical writing',
    'Developer documentation',
    'API documentation',
    'Content creation',
    'Community engagement',
    'Basic programming'
  ],
  '{
    "beginner": ["Learn technical writing", "Understand developer needs", "Study documentation best practices", "Learn basic code"],
    "intermediate": ["Write API documentation", "Create tutorials", "Build documentation sites", "Engage with community"],
    "advanced": ["Lead documentation strategy", "Create comprehensive docs", "Mentor writers", "Drive developer relations"],
    "expert": ["Define content strategy", "Lead DevRel teams", "Innovate documentation", "Build developer communities"]
  }'::jsonb
);

-- Insert role scoring weights (simplified version - each role maps to personality types with fit scores)
-- B-U-E-V-A: The Innovator
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-E-V-A', 0.95 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-E-V-A', 0.90 FROM tech_roles WHERE name = 'Product Manager (Technical)'
UNION ALL
SELECT id, 'B-U-E-V-A', 0.85 FROM tech_roles WHERE name = 'Mobile Developer'
UNION ALL
SELECT id, 'B-U-E-V-A', 0.80 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-U-E-V-A', 0.75 FROM tech_roles WHERE name = 'UI/UX Designer (Technical)'
UNION ALL
SELECT id, 'B-U-E-V-A', 0.60 FROM tech_roles WHERE name = 'Technical Writer/DevRel';

-- B-U-E-V-T: The Product Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-E-V-T', 0.95 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-U-E-V-T', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-E-V-T', 0.85 FROM tech_roles WHERE name = 'Product Manager (Technical)'
UNION ALL
SELECT id, 'B-U-E-V-T', 0.80 FROM tech_roles WHERE name = 'Mobile Developer'
UNION ALL
SELECT id, 'B-U-E-V-T', 0.70 FROM tech_roles WHERE name = 'Backend Developer';

-- B-U-E-L-A: The Pragmatic Designer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-E-L-A', 0.95 FROM tech_roles WHERE name = 'UI/UX Designer (Technical)'
UNION ALL
SELECT id, 'B-U-E-L-A', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-E-L-A', 0.85 FROM tech_roles WHERE name = 'Product Manager (Technical)'
UNION ALL
SELECT id, 'B-U-E-L-A', 0.75 FROM tech_roles WHERE name = 'Full-Stack Developer';

-- B-U-E-L-T: The Growth Hacker
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-E-L-T', 0.95 FROM tech_roles WHERE name = 'Product Manager (Technical)'
UNION ALL
SELECT id, 'B-U-E-L-T', 0.90 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-U-E-L-T', 0.85 FROM tech_roles WHERE name = 'Data Engineer'
UNION ALL
SELECT id, 'B-U-E-L-T', 0.80 FROM tech_roles WHERE name = 'Frontend Developer';

-- B-U-O-V-A: The Startup Builder
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-O-V-A', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-O-V-A', 0.85 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-U-O-V-A', 0.80 FROM tech_roles WHERE name = 'Mobile Developer'
UNION ALL
SELECT id, 'B-U-O-V-A', 0.75 FROM tech_roles WHERE name = 'Product Manager (Technical)';

-- B-U-O-V-T: The Professional Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-O-V-T', 0.95 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-U-O-V-T', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-O-V-T', 0.85 FROM tech_roles WHERE name = 'QA/Test Automation Engineer'
UNION ALL
SELECT id, 'B-U-O-V-T', 0.80 FROM tech_roles WHERE name = 'Backend Developer';

-- B-U-O-L-A: The UX Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-O-L-A', 0.95 FROM tech_roles WHERE name = 'UI/UX Designer (Technical)'
UNION ALL
SELECT id, 'B-U-O-L-A', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-O-L-A', 0.85 FROM tech_roles WHERE name = 'QA/Test Automation Engineer'
UNION ALL
SELECT id, 'B-U-O-L-A', 0.75 FROM tech_roles WHERE name = 'Full-Stack Developer';

-- B-U-O-L-T: The Quality Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-U-O-L-T', 0.95 FROM tech_roles WHERE name = 'QA/Test Automation Engineer'
UNION ALL
SELECT id, 'B-U-O-L-T', 0.90 FROM tech_roles WHERE name = 'Frontend Developer'
UNION ALL
SELECT id, 'B-U-O-L-T', 0.85 FROM tech_roles WHERE name = 'UI/UX Designer (Technical)'
UNION ALL
SELECT id, 'B-U-O-L-T', 0.80 FROM tech_roles WHERE name = 'Full-Stack Developer';

-- B-S-E-V-A: The Full-Stack Explorer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-E-V-A', 0.95 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-S-E-V-A', 0.90 FROM tech_roles WHERE name = 'Backend Developer'
UNION ALL
SELECT id, 'B-S-E-V-A', 0.85 FROM tech_roles WHERE name = 'Cloud Architect'
UNION ALL
SELECT id, 'B-S-E-V-A', 0.80 FROM tech_roles WHERE name = 'DevOps Engineer';

-- B-S-E-V-T: The Systems Builder
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-E-V-T', 0.95 FROM tech_roles WHERE name = 'Backend Developer'
UNION ALL
SELECT id, 'B-S-E-V-T', 0.90 FROM tech_roles WHERE name = 'DevOps Engineer'
UNION ALL
SELECT id, 'B-S-E-V-T', 0.85 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-S-E-V-T', 0.80 FROM tech_roles WHERE name = 'Cloud Architect';

-- B-S-E-L-A: The Performance Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-E-L-A', 0.95 FROM tech_roles WHERE name = 'Site Reliability Engineer'
UNION ALL
SELECT id, 'B-S-E-L-A', 0.90 FROM tech_roles WHERE name = 'DevOps Engineer'
UNION ALL
SELECT id, 'B-S-E-L-A', 0.85 FROM tech_roles WHERE name = 'Backend Developer'
UNION ALL
SELECT id, 'B-S-E-L-A', 0.80 FROM tech_roles WHERE name = 'Data Engineer';

-- B-S-E-L-T: The Platform Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-E-L-T', 0.95 FROM tech_roles WHERE name = 'DevOps Engineer'
UNION ALL
SELECT id, 'B-S-E-L-T', 0.90 FROM tech_roles WHERE name = 'Cloud Architect'
UNION ALL
SELECT id, 'B-S-E-L-T', 0.85 FROM tech_roles WHERE name = 'Site Reliability Engineer'
UNION ALL
SELECT id, 'B-S-E-L-T', 0.80 FROM tech_roles WHERE name = 'Systems Architect';

-- B-S-O-V-A: The Backend Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-O-V-A', 0.95 FROM tech_roles WHERE name = 'Backend Developer'
UNION ALL
SELECT id, 'B-S-O-V-A', 0.90 FROM tech_roles WHERE name = 'Full-Stack Developer'
UNION ALL
SELECT id, 'B-S-O-V-A', 0.85 FROM tech_roles WHERE name = 'Database Administrator'
UNION ALL
SELECT id, 'B-S-O-V-A', 0.75 FROM tech_roles WHERE name = 'Data Engineer';

-- B-S-O-V-T: The Infrastructure Specialist
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-O-V-T', 0.95 FROM tech_roles WHERE name = 'Site Reliability Engineer'
UNION ALL
SELECT id, 'B-S-O-V-T', 0.90 FROM tech_roles WHERE name = 'DevOps Engineer'
UNION ALL
SELECT id, 'B-S-O-V-T', 0.85 FROM tech_roles WHERE name = 'Database Administrator'
UNION ALL
SELECT id, 'B-S-O-V-T', 0.80 FROM tech_roles WHERE name = 'Systems Architect';

-- B-S-O-L-A: The Systems Optimizer
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-O-L-A', 0.95 FROM tech_roles WHERE name = 'Database Administrator'
UNION ALL
SELECT id, 'B-S-O-L-A', 0.90 FROM tech_roles WHERE name = 'Backend Developer'
UNION ALL
SELECT id, 'B-S-O-L-A', 0.85 FROM tech_roles WHERE name = 'Data Engineer'
UNION ALL
SELECT id, 'B-S-O-L-A', 0.80 FROM tech_roles WHERE name = 'Site Reliability Engineer';

-- B-S-O-L-T: The Architect
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT id, 'B-S-O-L-T', 0.95 FROM tech_roles WHERE name = 'Systems Architect'
UNION ALL
SELECT id, 'B-S-O-L-T', 0.90 FROM tech_roles WHERE name = 'Cloud Architect'
UNION ALL
SELECT id, 'B-S-O-L-T', 0.85 FROM tech_roles WHERE name = 'Database Administrator'
UNION ALL
SELECT id, 'B-S-O-L-T', 0.80 FROM tech_roles WHERE name = 'Security Engineer'
UNION ALL
SELECT id, 'B-S-O-L-T', 0.75 FROM tech_roles WHERE name = 'Site Reliability Engineer';

-- Add some universal fits (roles that suit many types)
INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT tr.id, pp.type_code, 0.70
FROM tech_roles tr
CROSS JOIN personality_profiles pp
WHERE tr.name = 'Technical Writer/DevRel'
  AND NOT EXISTS (
    SELECT 1 FROM role_scoring_weights rsw
    WHERE rsw.role_id = tr.id AND rsw.personality_type = pp.type_code
  );

INSERT INTO role_scoring_weights (role_id, personality_type, weight)
SELECT tr.id, pp.type_code, 0.65
FROM tech_roles tr
CROSS JOIN personality_profiles pp
WHERE tr.name IN ('Security Engineer', 'Machine Learning Engineer')
  AND NOT EXISTS (
    SELECT 1 FROM role_scoring_weights rsw
    WHERE rsw.role_id = tr.id AND rsw.personality_type = pp.type_code
  );
