import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const academicSemisterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemisterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemisterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemisterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemisterSeachableFields = ['title', 'code', 'year'];
export const academicSemisterFilterableFields = ['title', 'code', 'year'];
