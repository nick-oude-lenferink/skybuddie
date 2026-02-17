import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    const inputDate = DateTime.fromJSDate(value);
    const now = DateTime.local();
    return inputDate.toRelative({ base: now });
  }

}
