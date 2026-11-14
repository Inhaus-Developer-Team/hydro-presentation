export type SlideTheme = 'dark' | 'cobalt' | 'light' | 'ice';

export interface SlideMeta {
  id: string;
  number: string;
  eyebrow: string;
  theme: SlideTheme;
}

export const DECK_FOOTER = 'HYDRO INDUSTRIES / OCTOBER 2026';

export const SLIDES: SlideMeta[] = [
  {id: 'cover', number: '01', eyebrow: 'COMPANY OVERVIEW', theme: 'dark'},
  {id: 'intro', number: '02', eyebrow: '01 / INTRODUCTION', theme: 'light'},
  {id: 'capabilities', number: '03', eyebrow: '02 / CAPABILITIES', theme: 'cobalt'},
  {id: 'case-studies-intro', number: '04', eyebrow: '03 / CASE STUDIES', theme: 'dark'},
  {id: 'quito', number: '05', eyebrow: 'CASE STUDY / QUITO, ECUADOR', theme: 'light'},
  {id: 'frongoch', number: '06', eyebrow: 'CASE STUDY / FRONGOCH, WALES', theme: 'ice'},
  {id: 'roadbridge', number: '07', eyebrow: 'CASE STUDY / ROADBRIDGE, SOUTH WALES', theme: 'light'},
  {id: 'performance', number: '08', eyebrow: '04 / TREATMENT PERFORMANCE', theme: 'ice'},
  {id: 'milestones', number: '09', eyebrow: '05 / CORPORATE DEVELOPMENT', theme: 'light'},
  {id: 'group', number: '10', eyebrow: '06 / GROUP STRUCTURE', theme: 'dark'},
  {id: 'beeah', number: '11', eyebrow: 'CASE STUDY / BEE’AH, SHARJAH', theme: 'light'},
  {id: 'desalination', number: '12', eyebrow: '07 / TECHNOLOGY DEVELOPMENT', theme: 'ice'},
  {id: 'capestone', number: '13', eyebrow: 'CASE STUDY / CAPESTONE ORGANIC POULTRY, UK', theme: 'light'},
];

export const PERFORMANCE_ROWS = [
  {param: 'COD', input: '4,856', after: '26', req: '100'},
  {param: 'Oil & grease', input: '300', after: '2', req: '15'},
  {param: 'TSS', input: '250', after: '3', req: '60'},
  {param: 'BOD', input: '2,050', after: '8', req: '60'},
  {param: 'Total nitrogen', input: '400', after: '7', req: '10'},
  {param: 'Ammonia', input: '247', after: '2', req: '3'},
];

export const MILESTONES = [
  {year: '2010', title: 'Hydro founded', desc: 'The beginning of Hydro Industries.'},
  {year: '2018', title: 'BEE’AH commissioned', desc: 'Wastewater treatment plant in Sharjah, UAE.'},
  {year: '2024', title: 'Quito leachate plant', desc: 'Project completed in Q3 2024.'},
  {year: '2025', title: 'Group development', desc: 'JEMS Environmental team joins the Hydro Group.'},
  {year: '2026', title: 'Expanding applications', desc: 'Projects include Sucre, Montecristi and Santa Cruz.'},
];

export const ENTITIES = [
  {name: 'Hydro Ecuador', country: 'Ecuador'},
  {name: 'Hydro Colombia', country: 'Colombia'},
  {name: 'Hydro Services Morocco', country: 'Morocco'},
  {name: 'Hydro Saudi Arabia', country: 'Saudi Arabia'},
  {name: 'Hydro Egypt', country: 'Egypt'},
  {name: 'Hydro Environmental Limited', country: ''},
];
