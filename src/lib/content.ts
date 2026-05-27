export type MediaItem = {
  date: string
  title: string
  url?: string
  author?: string
  year?: string
  topic: string
  rating: 1 | 2 | 3 | 4 | 5
}


export type ExpEntry = {
  range: string
  role: string
  org: string
  body: string[]
  stack?: string[]
}

export type EducationEntry = {
  range: string
  role: string
  org: string
  body: string[]
}

export const PROFILE = {
  name: 'Will Ferens',
  initials: 'WF',
  taglinePrefix: 'Software engineer in Denver, writing about ',
  taglineAccent: 'work, life, and the things that fall in-between.',
  location: 'Denver, CO',
  email: 'will.ferens@gmail.com',
  github: '@will-ferens',
  githubUrl: 'https://github.com/will-ferens',
  linkedin: 'will-ferens',
  linkedinUrl: 'https://www.linkedin.com/in/will-ferens/',
  status: 'Available',
  current: 'Independent · contract work',
}



export const EXPERIENCE: ExpEntry[] = [
  {
    range: '2024 — 2026',
    role: 'Senior Software Engineer',
    org: 'Sigil Inc',
    body: [
      'Built a suite of tools for brand protection — Sigil identifies and removes unauthorized sellers across third party marketplaces.',
      'Owned feature delivery from gathering requirements to deployment across the stack. Designed and maintained applications that monitor realtime marketplace data, support core operations, and interact with customers.',
    ],
    stack: ['TYPESCRIPT', 'PYTHON', 'REACT', 'GCP', 'BIGQUERY', 'AI'],
  },
  {
    range: '2024 — Now',
    role: 'Lead Frontend Engineer',
    org: 'Emgenisys',
    body: [
      'Leading frontend development of a platform to support veterinary embryologists assessing embryo viability using Machine Learning.',
      'Architects and implements scalable, maintainable frontend software supporting video upload, playback, and ML scoring workflows.',
    ],
    stack: ['TYPESCRIPT', 'REACT', 'REDUX', 'PYTHON', 'ML'],
  },
  {
    range: '2021 — 2024',
    role: 'Software Engineer',
    org: 'Evolve Vacation Rental',
    body: [
      'First hire on a team tasked with rebuilding integrations between Evolve and partners such as Airbnb, Vrbo, and Rentals United with an event-based serverless architecture in AWS.',
      'Designed, built, and maintained APIs core to organizational operation of 30,000 properties. Reduced infrastructure costs by 33% through optimized AWS architecture.',
    ],
    stack: ['NODE', 'TYPESCRIPT', 'AWS', 'POSTGRES', 'SERVERLESS'],
  },
  {
    range: '2018 — 2021',
    role: 'Frontend Engineer',
    org: 'Searchspring',
    body: [
      'Utilized cross-disciplinary knowledge in JavaScript, Angular, React, CSS, PHP, and Java to deliver projects on a tight deadline.',
      'Responsible for the launch of projects valued at over $200,000 monthly recurring revenue. Created internal tooling that decreased project turnaround from 3 weeks to 2.',
    ],
    stack: ['JAVASCRIPT', 'REACT', 'ANGULAR', 'CSS'],
  },
]

export const EDUCATION: EducationEntry[] = [
  {
    range: '2010 — 2014',
    role: 'B.S. English',
    org: 'University of Dayton',
    body: ['Concentration in philosophy.'],
  },
]

export const SKILLS: Record<string, string[]> = {
  LANGUAGES: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Go', 'Ruby', 'Java'],
  INFRA: ['AWS', 'Postgres', 'Redis', 'Docker', 'Serverless', 'Terraform'],
}
