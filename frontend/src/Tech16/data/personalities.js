// 16 Personality Type Profiles
// Format: U/S-E/O-V/L-A/T (4-letter code)
// Focus (B/A) is a modifier dimension explained in modifierImpacts.focus

export const personalities = {
  "U-E-V-A": {
    code: "U-E-V-A",
    name: "The Innovator",
    tagline: "Rapid prototyping meets creative vision",
    description:
      "You're driven by bringing new ideas to life through user-facing experiences with adaptive execution. You excel at rapid iteration, building MVPs, and translating vision into tangible products. Your flexible approach allows you to pivot quickly based on user feedback, exploring multiple directions simultaneously. You thrive in exploratory environments where you can experiment with new approaches and get immediate validation.",
    strengths: [
      "Quick to ship working prototypes",
      "Strong product intuition and user empathy",
      "Energized by greenfield projects",
      "Flexible and responsive to feedback",
      "Excels in startup environments",
      "Discovers unexpected solutions through exploration",
    ],
    challenges: [
      "May skip thorough planning for speed",
      "Can lose interest in maintenance",
      "Might overlook edge cases",
      "May juggle too many experiments at once",
      "Can struggle with long-term architecture",
    ],
    workPreferences: [
      "Fast-paced, iterative development",
      "Direct user feedback loops",
      "Creative freedom to experiment",
      "Greenfield projects and new features",
      "Cross-functional collaboration",
      "Multiple prototypes in parallel",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Innovator, you're the ultimate rapid prototyper. You move from idea to working demo faster than anyone, shipping MVPs in days. Your hands-on approach means you learn by building, not by planning. You're at your best in 0-to-1 situations where speed and creativity matter more than perfect architecture.",
        analyzer: "As an Analyzer-Innovator, you bring thoughtful exploration to user-facing innovation. You still love new ideas and experimentation, but you research and prototype more deliberately. You're excellent at discovering novel UX patterns through systematic investigation, making you ideal for design systems and innovation labs where creativity needs depth.",
      },
      execution: {
        adaptive: "With Adaptive execution, you're incredibly flexible in exploring new directions. You pivot quickly based on user feedback, keeping multiple prototypes in flight. Your spontaneous approach helps you discover unexpected solutions. Perfect for early-stage startups where requirements change daily and agility is everything.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would bring discipline to innovation through planned sprints and methodical iteration. See U-E-V-T for the Structured variant.",
      },
    },
  },
  "U-E-V-T": {
    code: "U-E-V-T",
    name: "The Design Systems Engineer",
    tagline: "Disciplined innovation in user experience",
    description:
      "You bring structured execution to user-facing innovation. You build new experiences and design patterns methodically, documenting your experiments and iterating systematically. You excel at scaling successful prototypes into reliable products and creating design systems that others can build upon. Your disciplined approach to exploration makes innovation sustainable.",
    strengths: [
      "Systematic experimentation",
      "Excellent documentation of patterns",
      "Balances innovation with reliability",
      "Creates reusable design systems",
      "Scales prototypes to production",
      "Methodical iteration process",
    ],
    challenges: [
      "May slow down initial exploration",
      "Can over-systematize creative work",
      "Might resist truly spontaneous pivots",
      "May need help with pure ideation",
    ],
    workPreferences: [
      "Design system creation",
      "Component library development",
      "Planned innovation sprints",
      "Product teams scaling from MVP",
      "Documented experimentation frameworks",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Design Systems Engineer, you ship systematic innovation. You create component libraries and design patterns through hands-on iteration, building frameworks that make it easy for others to build great UIs. Your practical approach to systematization focuses on what actually works in production.",
        analyzer: "As an Analyzer-Design Systems Engineer, you research and document UI patterns with academic rigor. You study existing design systems, extract principles, and create comprehensive frameworks grounded in UX research. You're excellent at creating design systems that are both innovative and theoretically sound.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would explore more spontaneously with less upfront planning. See U-E-V-A for the Adaptive variant.",
        structured: "With Structured execution, you bring discipline to innovation. You plan sprints carefully, document your experiments, and iterate methodically. This makes you excellent at scaling successful prototypes into real products. You're ideal for product teams that need both innovation and reliability as they grow.",
      },
    },
  },
  "U-E-L-A": {
    code: "U-E-L-A",
    name: "The Growth Engineer",
    tagline: "Adaptive experimentation for growth",
    description:
      "You combine data-driven decision making with flexible execution to drive growth. You run experiments constantly, ready to pivot instantly when metrics point in a new direction. You validate hypotheses with real user behavior and move fast based on insights. Your adaptive approach to experimentation helps you discover unexpected growth opportunities.",
    strengths: [
      "Rapid experiment iteration",
      "Data-informed pivots",
      "Strong A/B testing execution",
      "Quick validation of hypotheses",
      "Discovery-oriented mindset",
      "Follows data over preconceptions",
    ],
    challenges: [
      "May change direction too frequently",
      "Can lack systematic documentation",
      "Might miss longer-term patterns",
      "May struggle with controlled experiments",
    ],
    workPreferences: [
      "Growth teams",
      "Rapid experimentation platforms",
      "Data-driven product development",
      "Startup optimization work",
      "Discovery-focused analytics",
      "Conversion optimization",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Growth Engineer, you're a shipping machine powered by data. You run experiments constantly, learning from real user behavior rather than analysis paralysis. Your bias toward action means you validate hypotheses with actual code, making you perfect for growth teams and fast-moving product orgs where speed-to-insight is critical.",
        analyzer: "As an Analyzer-Growth Engineer, you design more rigorous experiments while maintaining flexibility. You think through statistical validity but stay ready to pivot when data warrants. You're excellent at growth roles that require both methodological rigor and adaptive responsiveness to findings.",
      },
      execution: {
        adaptive: "With Adaptive execution, you're ready to pivot based on data instantly. When metrics point in a new direction, you change course without attachment to the original plan. This flexibility makes you exceptional at discovery and optimization where following the data matters more than following the roadmap.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would build more systematic experimentation frameworks. See U-E-L-T for the Structured variant.",
      },
    },
  },
  "U-E-L-T": {
    code: "U-E-L-T",
    name: "The Product Engineer",
    tagline: "Systematic data-driven product development",
    description:
      "You combine data-driven decision making with structured execution. You build user-facing features systematically while validating decisions with metrics and analytics. You create reliable experimentation frameworks, document learnings, and establish testing processes that scale across teams. You're excellent at making product insights repeatable and systematic.",
    strengths: [
      "Ships features backed by data",
      "Systematic A/B testing frameworks",
      "Balances rigor with execution",
      "Metrics-oriented development",
      "Creates experimentation playbooks",
      "Scales insights across teams",
    ],
    challenges: [
      "May over-systematize exploration",
      "Can delay shipping for proper setup",
      "Might resist quick validation experiments",
      "May focus on process over discovery",
    ],
    workPreferences: [
      "Established experimentation platforms",
      "Analytics-driven development",
      "Systematic growth work",
      "Product teams with mature processes",
      "Experimentation infrastructure",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Product Engineer, you build experimentation systems hands-on. You create frameworks that make it easy to run tests and track metrics, focusing on practical tools that teams actually use. Your approach makes systematic experimentation accessible to everyone.",
        analyzer: "As an Analyzer-Product Engineer, you bring rigorous methodology to product development. You design statistically sound experiments, control for variables, and dig deep into metrics. Your analytical rigor makes you excellent for complex optimization problems and mature products where subtle improvements need careful measurement.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would pivot more freely based on data. See U-E-L-A for the Adaptive variant.",
        structured: "With Structured execution, you build systematic experimentation frameworks. You document learnings, create playbooks, and establish reliable testing processes. This makes you invaluable for scaling product insights across teams and building experimentation platforms that others can use.",
      },
    },
  },
  "U-O-V-A": {
    code: "U-O-V-A",
    name: "The Product Designer",
    tagline: "Responsive user-centered experiences",
    description:
      "You focus on delivering polished user experiences with flexible responsiveness to feedback. You care deeply about user satisfaction and quality, adapting quickly when users report issues or needs change. Your vision-guided approach combined with adaptive execution makes you excellent at maintaining high-quality products while staying responsive to users.",
    strengths: [
      "Strong user empathy and responsiveness",
      "Flexible quality improvement",
      "Quick turnaround on user issues",
      "Vision-aligned prioritization",
      "Balances quality with adaptability",
      "Personal attention to user satisfaction",
    ],
    challenges: [
      "May lack systematic quality processes",
      "Can be reactive rather than preventive",
      "Might struggle with scale",
      "May over-respond to individual feedback",
    ],
    workPreferences: [
      "Customer-facing product roles",
      "User-responsive development",
      "Product teams with direct user contact",
      "Flexible quality improvement",
      "User feedback integration",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Product Designer, you're hands-on about quality and responsiveness. You build reliable features by testing them yourself, catching issues before users do. When problems arise, you fix them directly. Your practical approach focuses on real-world user problems, making you perfect for consumer-facing products.",
        analyzer: "As an Analyzer-Product Designer, you bring thoughtful analysis to user-centered design. You research user needs deeply, create well-considered solutions, and respond to feedback with systematic improvements. You excel at balancing responsive user focus with strategic product thinking.",
      },
      execution: {
        adaptive: "With Adaptive execution, you respond quickly to user issues and feedback. When users report problems, you pivot immediately to fix them. This responsiveness makes you invaluable for customer-facing roles where user satisfaction depends on quick turnaround and personal attention to quality concerns.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would build more systematic quality processes. See U-O-V-T for the Structured variant.",
      },
    },
  },
  "U-O-V-T": {
    code: "U-O-V-T",
    name: "The User Advocate",
    tagline: "Systematic reliability for users",
    description:
      "You deliver polished, reliable user experiences through structured quality processes. You build systems that maintain reliability as products scale, establishing SLAs, creating testing frameworks, and ensuring consistent quality across features. Your systematic approach to user-facing quality makes excellence sustainable and scalable.",
    strengths: [
      "Systematic quality assurance",
      "Scalable reliability processes",
      "Production quality focus",
      "Creates testing frameworks",
      "Consistent user experience",
      "Preventive quality measures",
    ],
    challenges: [
      "May over-invest in process",
      "Can slow down rapid response",
      "Might resist quick fixes",
      "May struggle with exploratory work",
    ],
    workPreferences: [
      "Platform quality teams",
      "User-facing reliability work",
      "Quality assurance systems",
      "Mature product development",
      "Testing infrastructure",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-User Advocate, you build quality systems hands-on. You create testing frameworks and reliability tools that others can use, making quality scalable through practical infrastructure. You're perfect for platform teams where quality needs to be ensured systematically.",
        analyzer: "As an Analyzer-User Advocate, you bring systematic quality assurance to user experience. You design comprehensive test cases, analyze failure modes, and build monitoring that catches issues early. Your thorough approach makes you excellent for critical user-facing systems where reliability is non-negotiable.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would respond more flexibly to immediate user needs. See U-O-V-A for the Adaptive variant.",
        structured: "With Structured execution, you build quality systems that scale. You create testing frameworks, establish SLAs, and implement processes that maintain reliability as products grow. This makes you excellent for platform teams where consistent quality needs to be ensured across many features and teams.",
      },
    },
  },
  "U-O-L-A": {
    code: "U-O-L-A",
    name: "The Frontend Engineer",
    tagline: "Adaptive frontend optimization",
    description:
      "You excel at optimizing production frontends with flexibility to evolve as requirements change. You combine performance focus with responsive adaptation to design changes and user feedback. You refactor components easily and adjust approaches based on what works, making you excellent for dynamic product environments.",
    strengths: [
      "Flexible frontend architecture",
      "Performance-aware development",
      "Responsive to design changes",
      "Quick refactoring skills",
      "Adapts UI based on feedback",
      "Production-quality code",
    ],
    challenges: [
      "May lack systematic architecture",
      "Can struggle with consistency at scale",
      "Might refactor too frequently",
      "May resist design system constraints",
    ],
    workPreferences: [
      "Dynamic product teams",
      "Evolving frontend codebases",
      "Performance optimization",
      "Iterative UI development",
      "User feedback-driven development",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Frontend Engineer, you ship optimized UI with practical speed. You know the frameworks inside-out and can build performant interfaces quickly. Your hands-on experience with real-world browser quirks makes you perfect for teams that need both quality and adaptability.",
        analyzer: "As an Analyzer-Frontend Engineer, you're a performance detective with adaptive expertise. You profile renders and optimize critical paths, but stay flexible to changing requirements. You balance deep technical analysis with responsive evolution of the codebase.",
      },
      execution: {
        adaptive: "With Adaptive execution, you're responsive to changing design requirements and user feedback. You refactor components easily and adjust approaches based on what works. This flexibility makes you excellent for product teams where UI needs evolve rapidly based on user testing and business priorities.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would build more systematic frontend architecture. See U-O-L-T for the Structured variant.",
      },
    },
  },
  "U-O-L-T": {
    code: "U-O-L-T",
    name: "The Quality Engineer",
    tagline: "Systematic frontend excellence",
    description:
      "You ensure user-facing systems meet the highest standards through systematic testing and structured architecture. You build component libraries, establish coding standards, and maintain design systems that scale. Your organized approach to frontend quality creates consistency across large applications and teams.",
    strengths: [
      "Systematic frontend architecture",
      "Component library expertise",
      "Design system maintenance",
      "Comprehensive test coverage",
      "Coding standards establishment",
      "Scalable quality processes",
    ],
    challenges: [
      "May slow down rapid iteration",
      "Can over-systematize UI work",
      "Might resist exploratory design",
      "May focus on architecture over user needs",
    ],
    workPreferences: [
      "Design system teams",
      "Frontend infrastructure",
      "Component library development",
      "Quality assurance automation",
      "Large-scale frontend applications",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Quality Engineer, you build systematic quality infrastructure hands-on. You create component libraries and testing frameworks that make quality scalable. Your practical approach to systematization focuses on tools that teams actually use.",
        analyzer: "As an Analyzer-Quality Engineer, you bring comprehensive analysis to frontend quality. You design thorough test strategies, analyze failure modes systematically, and ensure nothing falls through the cracks. You're excellent for critical applications where quality is non-negotiable.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would be more flexible with evolving requirements. See U-O-L-A for the Adaptive variant.",
        structured: "With Structured execution, you build systematic frontend architecture. You create component libraries, establish coding standards, and maintain design systems that scale across teams. Your organized approach makes you ideal for leading frontend infrastructure and ensuring consistency across large applications.",
      },
    },
  },
  "S-E-V-A": {
    code: "S-E-V-A",
    name: "The Infrastructure Pioneer",
    tagline: "Flexible exploration of new systems",
    description:
      "You love exploring novel system architectures with adaptive flexibility. You're driven by a vision of better developer experiences and system capabilities, but you iterate quickly and pivot based on what works. You thrive when rapidly prototyping greenfield infrastructure, exploring multiple approaches to find what enables others best.",
    strengths: [
      "Rapid infrastructure prototyping",
      "Flexible systems exploration",
      "Strong developer experience focus",
      "Quick technology evaluation",
      "Adaptive architecture iteration",
      "Embraces experimental approaches",
    ],
    challenges: [
      "May jump between approaches too quickly",
      "Can lack production hardening",
      "Might resist operational concerns",
      "May struggle with systematic documentation",
    ],
    workPreferences: [
      "Platform prototyping",
      "Developer tooling exploration",
      "New technology research",
      "Greenfield infrastructure",
      "Experimental platform work",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Infrastructure Pioneer, you prototype new systems incredibly fast. You learn by building, testing ideas with code rather than design docs. Your hands-on exploration helps you discover what works through rapid iteration. You're perfect for early-stage platform work where speed of learning matters most.",
        analyzer: "As an Analyzer-Infrastructure Pioneer, you research new technologies and architectures deeply while maintaining exploration flexibility. You investigate novel approaches systematically but stay ready to pivot. You're excellent for R&D teams that need both depth and adaptive exploration.",
      },
      execution: {
        adaptive: "With Adaptive execution, you explore infrastructure possibilities fluidly. You prototype multiple approaches, pivot based on findings, and discover solutions through experimentation. This makes you perfect for early-stage platform work where the best approach isn't yet clear.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would plan infrastructure exploration more systematically. See S-E-V-T for the Structured variant.",
      },
    },
  },
  "S-E-V-T": {
    code: "S-E-V-T",
    name: "The Solutions Architect",
    tagline: "Strategic system design and planning",
    description:
      "You design new systems with strategic vision and structured planning. You thoroughly analyze requirements and constraints to create architectures that serve long-term goals. You excel at translating vision into concrete technical strategies with systematic execution, making innovation sustainable and scalable.",
    strengths: [
      "Strategic technical planning",
      "Structured architecture design",
      "Long-term systems thinking",
      "Vision-to-strategy translation",
      "Systematic innovation",
      "Stakeholder communication",
    ],
    challenges: [
      "May over-plan before building",
      "Can resist rapid iteration",
      "Might struggle with uncertainty",
      "May need help with quick prototyping",
    ],
    workPreferences: [
      "Architecture planning teams",
      "Strategic technical design",
      "Enterprise system architecture",
      "Platform strategy",
      "Structured innovation projects",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Solutions Architect, you design systems with practical vision. You create architectures that others can actually build, balancing strategic thinking with hands-on feasibility. Your plans are grounded in real-world constraints because you understand implementation deeply.",
        analyzer: "As an Analyzer-Solutions Architect, you bring deep strategic analysis to system design. You thoroughly analyze requirements, research best practices, and create comprehensive architectures. You excel at complex enterprise systems where strategic planning is critical to success.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would explore architectures more fluidly. See S-E-V-A for the Adaptive variant.",
        structured: "With Structured execution, you plan system innovation systematically. You create roadmaps, establish architecture principles, and design with clear structure. This makes you excellent for strategic technical leadership where vision needs systematic execution.",
      },
    },
  },
  "S-E-L-A": {
    code: "S-E-L-A",
    name: "The Research Scientist",
    tagline: "Adaptive exploration of technical frontiers",
    description:
      "You investigate novel technical approaches with flexible, data-informed exploration. You're driven by measurable improvements and empirical validation, but you adapt quickly when experiments suggest new directions. You excel at discovering breakthrough solutions through adaptive research, following the data wherever it leads.",
    strengths: [
      "Empirical research methodology",
      "Data-informed pivots",
      "Flexible experiment design",
      "Novel algorithm discovery",
      "Benchmark-driven exploration",
      "Quick validation iteration",
    ],
    challenges: [
      "May chase too many research threads",
      "Can struggle with production focus",
      "Might lack systematic documentation",
      "May resist structured research plans",
    ],
    workPreferences: [
      "Exploratory R&D",
      "Adaptive research projects",
      "Algorithm discovery",
      "Experimental systems work",
      "Data-driven technical research",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Research Scientist, you validate research ideas through rapid prototyping. You build experiments quickly, measure results, and iterate based on findings. Your hands-on approach to research makes theoretical breakthroughs practical faster.",
        analyzer: "As an Analyzer-Research Scientist, you conduct rigorous research with adaptive flexibility. You design sound experiments and analyze deeply, but you're ready to pivot when data warrants. You're excellent at research that needs both methodological rigor and responsive exploration.",
      },
      execution: {
        adaptive: "With Adaptive execution, you follow research insights fluidly. When experiments reveal unexpected directions, you explore them eagerly. This flexibility helps you discover breakthrough solutions that structured research plans might miss.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would conduct research more systematically. See S-E-L-T for the Structured variant.",
      },
    },
  },
  "S-E-L-T": {
    code: "S-E-L-T",
    name: "The ML Engineer",
    tagline: "Systematic intelligent systems development",
    description:
      "You build intelligent systems through structured, data-driven methodology. You're rigorous in experimental design, validation, and optimization. You create systematic ML development processes, establish benchmarking frameworks, and make AI/ML work reliable and repeatable. Your disciplined approach makes research production-ready.",
    strengths: [
      "Rigorous experiment design",
      "Systematic model development",
      "Statistical analysis expertise",
      "Benchmark frameworks",
      "Production ML pipelines",
      "Reproducible research",
    ],
    challenges: [
      "May over-systematize exploration",
      "Can be slow to try novel approaches",
      "Might focus on process over discovery",
      "May struggle with ambiguous problems",
    ],
    workPreferences: [
      "Production ML engineering",
      "Systematic model development",
      "ML infrastructure teams",
      "Benchmarking platforms",
      "Research-to-production pipelines",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-ML Engineer, you create practical ML systems with systematic rigor. You build pipelines, training frameworks, and deployment infrastructure that make ML reliable. Your hands-on approach to systematization focuses on what works in production.",
        analyzer: "As an Analyzer-ML Engineer, you bring deep methodological rigor to ML development. You design statistically sound experiments, control for variables meticulously, and optimize models with precision. You're excellent for complex ML challenges where rigorous analysis is critical.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would explore ML approaches more flexibly. See S-E-L-A for the Adaptive variant.",
        structured: "With Structured execution, you build systematic ML development processes. You create experiment frameworks, establish best practices, and make ML insights repeatable. This makes you invaluable for scaling ML capabilities across teams and ensuring production reliability.",
      },
    },
  },
  "S-O-V-A": {
    code: "S-O-V-A",
    name: "The DevOps Engineer",
    tagline: "Responsive platform reliability",
    description:
      "You focus on infrastructure that teams depend on, with flexible responsiveness to operational needs. You're driven by vision of excellent developer experience and system reliability, but you adapt quickly when incidents occur or requirements change. You excel at maintaining platforms while staying responsive to team needs.",
    strengths: [
      "Responsive incident handling",
      "Flexible platform support",
      "Developer experience focus",
      "Quick operational adaptation",
      "Production systems expertise",
      "Pragmatic reliability improvements",
    ],
    challenges: [
      "May lack systematic processes",
      "Can be reactive rather than preventive",
      "Might struggle with scale",
      "May resist comprehensive planning",
    ],
    workPreferences: [
      "DevOps teams",
      "Responsive platform support",
      "Incident-driven improvement",
      "Flexible infrastructure work",
      "Developer experience teams",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-DevOps Engineer, you solve platform problems hands-on and fast. When systems break or teams need support, you jump in and fix it directly. Your practical approach to reliability focuses on keeping things running and developers productive.",
        analyzer: "As an Analyzer-DevOps Engineer, you troubleshoot infrastructure with systematic analysis while maintaining responsiveness. You investigate root causes deeply but act quickly on findings. You balance thorough understanding with adaptive operational response.",
      },
      execution: {
        adaptive: "With Adaptive execution, you respond flexibly to platform needs and incidents. You pivot quickly to address urgent issues, adjust infrastructure as requirements evolve, and keep systems running through responsive action. This makes you excellent for dynamic platform environments.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would build more systematic platform processes. See S-O-V-T for the Structured variant.",
      },
    },
  },
  "S-O-V-T": {
    code: "S-O-V-T",
    name: "The Platform Builder",
    tagline: "Systematic infrastructure at scale",
    description:
      "You build and scale infrastructure systematically, creating platforms that teams can depend on long-term. You're driven by vision of excellent developer experience, executed through disciplined processes and strategic planning. You establish infrastructure standards, create self-service platforms, and make reliability scalable through systematic engineering.",
    strengths: [
      "Systematic platform development",
      "Strategic infrastructure planning",
      "Scalable reliability engineering",
      "Platform-as-a-service thinking",
      "Developer experience frameworks",
      "Preventive quality measures",
    ],
    challenges: [
      "May over-invest in abstraction",
      "Can be slow to respond to urgent needs",
      "Might resist quick fixes",
      "May struggle with rapid pivots",
    ],
    workPreferences: [
      "Platform engineering teams",
      "Infrastructure-as-a-service",
      "Strategic platform development",
      "Self-service tooling",
      "Systematic reliability engineering",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Platform Builder, you create systematic infrastructure hands-on. You build frameworks and tools that make great platforms accessible to all teams. Your practical approach to platform engineering focuses on what developers actually need and use.",
        analyzer: "As an Analyzer-Platform Builder, you architect platforms with strategic depth. You analyze requirements comprehensively, design for scale systematically, and create infrastructure that stands the test of time. You excel at complex enterprise platform challenges.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would be more responsive to immediate platform needs. See S-O-V-A for the Adaptive variant.",
        structured: "With Structured execution, you build platforms with systematic discipline. You plan infrastructure carefully, establish clear standards, and create scalable processes. This makes you excellent for platform teams where consistency and long-term reliability are critical.",
      },
    },
  },
  "S-O-L-A": {
    code: "S-O-L-A",
    name: "The Database Engineer",
    tagline: "Adaptive data system optimization",
    description:
      "You build and optimize data systems with flexibility to evolve as needs change. You focus on production data reliability and performance, but you adapt quickly to new requirements and optimization opportunities. You excel at maintaining data systems while staying responsive to changing data patterns and use cases.",
    strengths: [
      "Flexible database optimization",
      "Performance-aware development",
      "Responsive to changing requirements",
      "Production data expertise",
      "Quick performance troubleshooting",
      "Adaptive schema evolution",
    ],
    challenges: [
      "May lack long-term data strategy",
      "Can struggle with consistency at scale",
      "Might over-optimize reactively",
      "May resist systematic data governance",
    ],
    workPreferences: [
      "Dynamic data engineering",
      "Performance optimization",
      "Evolving data systems",
      "Production database support",
      "Flexible data architecture",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Database Engineer, you optimize data systems hands-on and pragmatically. You tune queries, adjust schemas, and solve performance problems directly. Your practical experience with real-world data challenges makes you excellent for production support.",
        analyzer: "As an Analyzer-Database Engineer, you troubleshoot data systems with deep analysis while maintaining flexibility. You investigate performance issues thoroughly but adapt quickly to findings. You balance systematic understanding with responsive optimization.",
      },
      execution: {
        adaptive: "With Adaptive execution, you evolve data systems responsively. You optimize based on actual usage patterns, adjust schemas as requirements change, and keep data flowing through flexible adaptation. This makes you excellent for dynamic data environments.",
        structured: "Note: This type emphasizes Adaptive execution. With Structured execution, you would build more systematic data infrastructure. See S-O-L-T for the Structured variant.",
      },
    },
  },
  "S-O-L-T": {
    code: "S-O-L-T",
    name: "The Site Reliability Engineer",
    tagline: "Systematic operational excellence",
    description:
      "You're the guardian of production systems, using structured processes and metrics to ensure reliability. You build systematic tools, establish clear SLOs/SLIs, and create frameworks that make reliability scalable. Your methodical, data-driven approach focuses on measurable, sustainable improvements in uptime and performance.",
    strengths: [
      "SLO/SLI expertise",
      "Systematic automation",
      "Incident response frameworks",
      "Metrics-driven improvements",
      "Production reliability processes",
      "Preventive monitoring systems",
    ],
    challenges: [
      "May prioritize metrics over impact",
      "Can be risk-averse to changes",
      "Might slow down rapid iteration",
      "May resist exploratory work",
    ],
    workPreferences: [
      "SRE teams",
      "Production operations",
      "Systematic monitoring",
      "Incident management frameworks",
      "Capacity planning",
      "Reliability automation",
    ],
    modifierImpacts: {
      focus: {
        builder: "As a Builder-Site Reliability Engineer, you create reliability systems hands-on. You build monitoring tools, automation frameworks, and operational infrastructure that make systems reliable. Your practical approach focuses on tools that actually prevent incidents and reduce toil.",
        analyzer: "As an Analyzer-Site Reliability Engineer, you analyze production systems with comprehensive rigor. You design thorough monitoring, investigate incidents deeply, and optimize reliability with precision. You're excellent for critical systems where systematic analysis prevents failures.",
      },
      execution: {
        adaptive: "Note: This type emphasizes Structured execution. With Adaptive execution, you would respond more flexibly to incidents. See S-O-L-A for the Adaptive variant.",
        structured: "With Structured execution, you build systematic reliability. You create frameworks for incident response, establish clear processes for change management, and make operational excellence repeatable. This makes you invaluable for mature systems where consistent reliability is critical.",
      },
    },
  },
};

// Helper function to get personality by code
export const getPersonalityByCode = (code) => {
  return personalities[code] || null;
};

// Get all personality codes
export const getAllPersonalityCodes = () => {
  return Object.keys(personalities);
};

export const getAllPersonalities = () => {
  return Object.entries(personalities).map(([code, data]) => ({
    type_code: code,
    ...data,
  }));
};
