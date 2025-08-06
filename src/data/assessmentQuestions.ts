export interface Question {
  id: string;
  text: string;
  type: "likert" | "multiple" | "boolean";
  options?: string[];
  category: string;
  weight?: number;
}

// Psychological Fit Assessment Questions
export const psychologicalQuestions: Question[] = [
  // Big 5 - Openness
  {
    id: "openness_1",
    text: "I enjoy learning about new healthcare technologies and medical innovations.",
    type: "likert",
    category: "Openness to Experience"
  },
  {
    id: "openness_2", 
    text: "I am curious about how different healthcare systems work together.",
    type: "likert",
    category: "Openness to Experience"
  },
  {
    id: "openness_3",
    text: "I like to explore creative solutions to healthcare data problems.",
    type: "likert", 
    category: "Openness to Experience"
  },

  // Big 5 - Conscientiousness
  {
    id: "conscientiousness_1",
    text: "I pay close attention to details when working with medical data.",
    type: "likert",
    category: "Conscientiousness"
  },
  {
    id: "conscientiousness_2",
    text: "I prefer to follow established protocols and procedures in healthcare settings.",
    type: "likert",
    category: "Conscientiousness"
  },
  {
    id: "conscientiousness_3",
    text: "I am thorough in documenting and organizing healthcare information.",
    type: "likert",
    category: "Conscientiousness"
  },

  // Holland Codes - Investigative
  {
    id: "investigative_1",
    text: "I enjoy analyzing patterns in health data to identify trends.",
    type: "likert",
    category: "Investigative Interest"
  },
  {
    id: "investigative_2",
    text: "I find satisfaction in solving complex healthcare technology problems.",
    type: "likert",
    category: "Investigative Interest"
  },

  // Grit & Persistence
  {
    id: "grit_1",
    text: "I persist through difficult technical challenges even when frustrated.",
    type: "likert",
    category: "Grit & Persistence"
  },
  {
    id: "grit_2",
    text: "I am willing to invest time in mastering healthcare informatics standards.",
    type: "likert",
    category: "Grit & Persistence"
  },

  // Motivation
  {
    id: "motivation_1",
    text: "I am motivated by the potential to improve patient care through technology.",
    type: "likert",
    category: "Intrinsic Motivation"
  },
  {
    id: "motivation_2",
    text: "I would pursue this career even if the salary was moderate.",
    type: "likert",
    category: "Intrinsic Motivation"
  }
];

// Technical Aptitude Questions
export const technicalQuestions: Question[] = [
  // General Aptitude
  {
    id: "logic_1",
    text: "If all EHR systems use HL7 standards, and Hospital X uses an EHR system, what can we conclude?",
    type: "multiple",
    options: [
      "Hospital X uses HL7 standards",
      "Hospital X doesn't use HL7 standards", 
      "We cannot determine if Hospital X uses HL7 standards",
      "Hospital X needs to upgrade their system"
    ],
    category: "Logical Reasoning"
  },
  {
    id: "numerical_1",
    text: "A hospital processes 1,200 patient records per day. If 15% contain data errors, how many error-free records are processed daily?",
    type: "multiple",
    options: [
      "180 records",
      "1,020 records",
      "1,050 records", 
      "985 records"
    ],
    category: "Numerical Reasoning"
  },
  {
    id: "pattern_1",
    text: "In the sequence: Patient ID, Diagnosis Code, Treatment Date, Insurance Info, what would logically come next?",
    type: "multiple",
    options: [
      "Billing Amount",
      "Patient Name",
      "Hospital Location",
      "Doctor's Age"
    ],
    category: "Pattern Recognition"
  },

  // Healthcare Knowledge
  {
    id: "healthcare_1",
    text: "What does EHR stand for in healthcare?",
    type: "multiple",
    options: [
      "Electronic Health Records",
      "Emergency Health Response",
      "Extended Health Resources",
      "Electronic Hospital Registration"
    ],
    category: "Healthcare Systems"
  },
  {
    id: "healthcare_2", 
    text: "HIPAA primarily governs:",
    type: "multiple",
    options: [
      "Patient data privacy and security",
      "Hospital staffing requirements",
      "Medical device regulations",
      "Insurance claim processing"
    ],
    category: "Healthcare Regulations"
  },
  {
    id: "healthcare_3",
    text: "What is interoperability in healthcare?",
    type: "multiple",
    options: [
      "The ability of different systems to exchange and use information",
      "The cost-effectiveness of medical procedures",
      "The speed of patient treatment",
      "The accuracy of medical diagnoses"
    ],
    category: "Healthcare Technology"
  },

  // Domain-Specific Knowledge
  {
    id: "domain_1",
    text: "HL7 FHIR is:",
    type: "multiple",
    options: [
      "A healthcare data exchange standard",
      "A medical device certification",
      "A patient privacy regulation",
      "A hospital management system"
    ],
    category: "Health Informatics Standards"
  },
  {
    id: "domain_2",
    text: "Which is most important when implementing a new EHR system?",
    type: "multiple", 
    options: [
      "User training and workflow integration",
      "Choosing the cheapest option",
      "Installing the newest technology",
      "Minimizing staff involvement"
    ],
    category: "Implementation Knowledge"
  },

  // IT Basics
  {
    id: "it_1",
    text: "Are you comfortable using spreadsheet software (Excel) for data analysis?",
    type: "boolean",
    category: "Technical Skills"
  },
  {
    id: "it_2",
    text: "Have you worked with databases or SQL before?",
    type: "boolean", 
    category: "Technical Skills"
  }
];

// WISCAR Framework Questions
export const wiscarQuestions: Question[] = [
  // Will (Internal Motivation)
  {
    id: "will_1",
    text: "I have a strong internal drive to work in healthcare technology.",
    type: "likert",
    category: "Will - Internal Drive"
  },
  {
    id: "will_2",
    text: "I am self-motivated to learn about health informatics even without external pressure.",
    type: "likert",
    category: "Will - Self-Motivation"
  },

  // Interest (Domain-Specific)
  {
    id: "interest_1", 
    text: "I find the intersection of healthcare and technology fascinating.",
    type: "likert",
    category: "Interest - Domain Focus"
  },
  {
    id: "interest_2",
    text: "I enjoy reading about advances in medical technology and data science.",
    type: "likert",
    category: "Interest - Sustained Engagement"
  },

  // Skill (Current Competency)
  {
    id: "skill_1",
    text: "I have experience working with healthcare data or medical records.",
    type: "likert", 
    category: "Skill - Current Level"
  },
  {
    id: "skill_2",
    text: "I am confident in my ability to learn new technical systems quickly.",
    type: "likert",
    category: "Skill - Learning Confidence"
  },

  // Cognitive Readiness
  {
    id: "cognitive_1",
    text: "I can handle complex, multi-step problems that require systematic thinking.",
    type: "likert",
    category: "Cognitive - Problem Solving"
  },
  {
    id: "cognitive_2", 
    text: "I am comfortable working with abstract concepts and technical specifications.",
    type: "likert",
    category: "Cognitive - Abstract Thinking"
  },

  // Ability to Learn
  {
    id: "learning_1",
    text: "I actively seek feedback to improve my performance.",
    type: "likert",
    category: "Learning - Feedback Seeking"
  },
  {
    id: "learning_2",
    text: "I enjoy learning from mistakes and see them as growth opportunities.",
    type: "likert",
    category: "Learning - Growth Mindset"
  },

  // Real-World Alignment  
  {
    id: "realworld_1",
    text: "How would you react if you discovered a significant data discrepancy in patient records?",
    type: "multiple",
    options: [
      "Immediately investigate and follow proper protocols to correct it",
      "Report it to a supervisor and wait for instructions",
      "Note it for later review when you have more time",
      "Assume it's a minor issue that will resolve itself"
    ],
    category: "Real-World - Problem Response"
  },
  {
    id: "realworld_2",
    text: "When implementing a new health IT system, what would be your priority?",
    type: "multiple",
    options: [
      "Ensuring patient data security and system reliability",
      "Making the system user-friendly for staff",
      "Completing the implementation quickly",
      "Minimizing costs and resource usage"
    ],
    category: "Real-World - Priority Setting"
  }
];

export const allQuestions = {
  psychological: psychologicalQuestions,
  technical: technicalQuestions, 
  wiscar: wiscarQuestions
};