export type Project = {
  number: string
  name: string
  label: string
  description: string
  status: string
  tags: string[]
  visual: 'hub' | 'desk' | 'future'
  repositoryUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'LC Project Hub',
    label: 'PROJECT HUB',
    description: 'A project hub in the portfolio. More about the problem, implementation and stack will be added once verified.',
    status: 'Project details needed',
    tags: ['Project details needed'],
    visual: 'hub',
  },
  {
    number: '02',
    name: 'IT Service Desk',
    label: 'SERVICE MANAGEMENT',
    description: 'An IT Service Desk application. Case-study details and technology choices are awaiting confirmation.',
    status: 'Project details needed',
    tags: ['Project details needed'],
    visual: 'desk',
  },
  {
    number: '03',
    name: 'AI automation, next',
    label: 'SPACE FOR WHAT’S NEXT',
    description: 'A dedicated home for future experiments in AI automation and digital transformation.',
    status: 'Planned',
    tags: ['Exploration'],
    visual: 'future',
  },
]
