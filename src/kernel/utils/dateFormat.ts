import { dateParser } from '@shared/lib';

export const dateFormat = (date: string) => dateParser.toFormat(date, 'MMMM dd')
