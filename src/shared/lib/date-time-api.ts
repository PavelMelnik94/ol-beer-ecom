import {
  format,
  isValid,
  parse,
  parseISO,
} from 'date-fns';

type DateInput = string | Date;

export const dateParser = {
  toFormat: (
    input: DateInput,
    outputFormat: string,
    inputFormat?: string,
  ): string => {
    let date: Date;

    if (input instanceof Date) {
      date = input;
    }
    else {
      if (inputFormat) {
        date = parse(input, inputFormat, new Date());
      }
      else {
        date = parseISO(input);
      }
    }

    if (!isValid(date)) {
      throw new Error(`Date is not valid: ${input}`);
    }

    return format(date, outputFormat);
  },

  isValidDate: (input: DateInput, inputFormat?: string): boolean => {
    try {
      let date: Date;

      if (input instanceof Date) {
        date = input;
      }
      else {
        date = inputFormat
          ? parse(input, inputFormat, new Date())
          : parseISO(input);
      }

      return isValid(date);
    }
    catch {
      return false;
    }
  },
};
