// 40 scenario-based questions across 5 spectrums
// Each question has a spectrum (dimension it measures) and direction (which pole gets higher score for "agree")

export const questions = [
  // Focus: Builder (B) vs Analyzer (A) - 8 questions
  {
    id: 1,
    text: "When starting a new project, I prefer to build a working prototype quickly, even if it's rough around the edges.",
    spectrum: "focus",
    direction: "B", // Agree = Builder
  },
  {
    id: 2,
    text: "I find deep satisfaction in understanding the 'why' behind system design choices before writing code.",
    spectrum: "focus",
    direction: "A", // Agree = Analyzer
  },
  {
    id: 3,
    text: "I'd rather ship something functional today than spend extra time making it perfect.",
    spectrum: "focus",
    direction: "B",
  },
  {
    id: 4,
    text: "When debugging, I systematically trace the root cause rather than applying quick fixes.",
    spectrum: "focus",
    direction: "A",
  },
  {
    id: 5,
    text: "I get energized by creating tangible features that users can interact with immediately.",
    spectrum: "focus",
    direction: "B",
  },
  {
    id: 6,
    text: "I prefer to thoroughly research and plan architecture before implementation begins.",
    spectrum: "focus",
    direction: "A",
  },
  {
    id: 7,
    text: "Iteration and rapid feedback loops are more valuable than extensive upfront design.",
    spectrum: "focus",
    direction: "B",
  },
  {
    id: 8,
    text: "I enjoy analyzing performance bottlenecks and optimizing algorithms for efficiency.",
    spectrum: "focus",
    direction: "A",
  },

  // Interface: User-Facing (U) vs Systems-Facing (S) - 8 questions
  {
    id: 9,
    text: "I care deeply about how users perceive and interact with the product interface.",
    spectrum: "interface",
    direction: "U",
  },
  {
    id: 10,
    text: "I'm more interested in database optimization and infrastructure than UI design.",
    spectrum: "interface",
    direction: "S",
  },
  {
    id: 11,
    text: "User feedback and usability testing are the most important validation for my work.",
    spectrum: "interface",
    direction: "U",
  },
  {
    id: 12,
    text: "I find myself drawn to problems involving scalability, reliability, and system architecture.",
    spectrum: "interface",
    direction: "S",
  },
  {
    id: 13,
    text: "I enjoy making things look polished and ensuring smooth user experiences.",
    spectrum: "interface",
    direction: "U",
  },
  {
    id: 14,
    text: "Working with APIs, databases, and backend logic excites me more than frontend work.",
    spectrum: "interface",
    direction: "S",
  },
  {
    id: 15,
    text: "I prioritize accessibility and responsive design in everything I build.",
    spectrum: "interface",
    direction: "U",
  },
  {
    id: 16,
    text: "I'm fascinated by distributed systems, caching strategies, and infrastructure challenges.",
    spectrum: "interface",
    direction: "S",
  },

  // Change Style: Exploratory (E) vs Operational (O) - 8 questions
  {
    id: 17,
    text: "I thrive when working on new, undefined problems with no established solutions.",
    spectrum: "changeStyle",
    direction: "E",
  },
  {
    id: 18,
    text: "I find fulfillment in maintaining and improving existing production systems.",
    spectrum: "changeStyle",
    direction: "O",
  },
  {
    id: 19,
    text: "Experimenting with cutting-edge technologies excites me more than refining current ones.",
    spectrum: "changeStyle",
    direction: "E",
  },
  {
    id: 20,
    text: "Ensuring system reliability and uptime is deeply satisfying work for me.",
    spectrum: "changeStyle",
    direction: "O",
  },
  {
    id: 21,
    text: "I prefer greenfield projects where I can explore novel approaches.",
    spectrum: "changeStyle",
    direction: "E",
  },
  {
    id: 22,
    text: "I value the challenge of scaling systems and preventing production incidents.",
    spectrum: "changeStyle",
    direction: "O",
  },
  {
    id: 23,
    text: "Research and proof-of-concept work appeals to me more than production engineering.",
    spectrum: "changeStyle",
    direction: "E",
  },
  {
    id: 24,
    text: "I take pride in building robust monitoring, alerting, and operational excellence.",
    spectrum: "changeStyle",
    direction: "O",
  },

  // Decision Driver: Vision-Led (V) vs Logic-Led (L) - 8 questions
  {
    id: 25,
    text: "I make decisions based on the product vision and user impact, even if metrics are unclear.",
    spectrum: "decisionDriver",
    direction: "V",
  },
  {
    id: 26,
    text: "I rely heavily on data, benchmarks, and measurable outcomes to guide my choices.",
    spectrum: "decisionDriver",
    direction: "L",
  },
  {
    id: 27,
    text: "Understanding the 'why' behind features matters more to me than technical constraints.",
    spectrum: "decisionDriver",
    direction: "V",
  },
  {
    id: 28,
    text: "I prioritize technical feasibility and performance metrics over aspirational goals.",
    spectrum: "decisionDriver",
    direction: "L",
  },
  {
    id: 29,
    text: "I'm motivated by creating delightful user experiences, even if the path is unclear.",
    spectrum: "decisionDriver",
    direction: "V",
  },
  {
    id: 30,
    text: "I prefer solutions backed by empirical evidence and quantitative analysis.",
    spectrum: "decisionDriver",
    direction: "L",
  },
  {
    id: 31,
    text: "I think about product strategy and long-term vision when solving technical problems.",
    spectrum: "decisionDriver",
    direction: "V",
  },
  {
    id: 32,
    text: "I focus on what's technically sound and proven rather than what's aspirational.",
    spectrum: "decisionDriver",
    direction: "L",
  },

  // Execution: Adaptive (A) vs Structured (T) - 8 questions
  {
    id: 33,
    text: "I adapt easily to changing requirements and pivot directions without frustration.",
    spectrum: "execution",
    direction: "A",
  },
  {
    id: 34,
    text: "I work best when there's a clear plan, timeline, and defined deliverables.",
    spectrum: "execution",
    direction: "T",
  },
  {
    id: 35,
    text: "I'm comfortable with ambiguity and figure things out as I go.",
    spectrum: "execution",
    direction: "A",
  },
  {
    id: 36,
    text: "I prefer structured workflows with established processes and documentation.",
    spectrum: "execution",
    direction: "T",
  },
  {
    id: 37,
    text: "I thrive in fast-paced environments where priorities shift frequently.",
    spectrum: "execution",
    direction: "A",
  },
  {
    id: 38,
    text: "I value predictability and systematic approaches to project management.",
    spectrum: "execution",
    direction: "T",
  },
  {
    id: 39,
    text: "I enjoy wearing multiple hats and context-switching between different tasks.",
    spectrum: "execution",
    direction: "A",
  },
  {
    id: 40,
    text: "I find deep focus on one well-defined task more productive than multitasking.",
    spectrum: "execution",
    direction: "T",
  },
];

// Spectrum metadata
export const spectrums = {
  focus: {
    name: "Focus",
    poles: { left: "Builder", right: "Analyzer", leftCode: "B", rightCode: "A" },
    description: "How you approach problem-solving and implementation",
  },
  interface: {
    name: "Interface",
    poles: { left: "User-Facing", right: "Systems-Facing", leftCode: "U", rightCode: "S" },
    description: "Where you prefer to work in the stack",
  },
  changeStyle: {
    name: "Change Style",
    poles: { left: "Exploratory", right: "Operational", leftCode: "E", rightCode: "O" },
    description: "Your relationship with change and stability",
  },
  decisionDriver: {
    name: "Decision Driver",
    poles: { left: "Vision-Led", right: "Logic-Led", leftCode: "V", rightCode: "L" },
    description: "What guides your technical decisions",
  },
  execution: {
    name: "Execution",
    poles: { left: "Adaptive", right: "Structured", leftCode: "A", rightCode: "T" },
    description: "How you prefer to work and organize tasks",
  },
};
