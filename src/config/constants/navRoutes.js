import PATHS from './paths';

export const unauthenticatedRoutes = [
  { path: PATHS.LOGIN, translation: 'navigation.login' },
  { path: PATHS.REGISTER, translation: 'navigation.register' },
];

export const userRoutes = [
  { path: PATHS.PEERS, translation: 'navigation.peer' },
  { path: PATHS.THERAPISTS, translation: 'navigation.therapists' },
  // { path: PATHS.MY_THERAPISTS, translation: 'navigation.my_therapists' },
];
export const therapistsRoutes = [
  { path: PATHS.PATIENTS, translation: 'navigation.patients' },
];
