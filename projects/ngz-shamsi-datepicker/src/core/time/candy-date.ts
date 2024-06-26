/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/../blob/master/LICENSE
 */

import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameSecond,
  isSameYear,
  isToday,
  isValid,
  setDay,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek
} from 'date-fns';

import { warn } from '..//logger';
import { IndexableObject, NzSafeAny } from '..//types';
import { NzDateAdapter } from './date-adapter';
import { Injectable } from '@angular/core';

export type CandyDateMode = 'decade' | 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export type NormalizedMode = 'decade' | 'year' | 'month';
export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// export type CandyDateType = CandyDate | Date | null;
export type SingleValue = CandyDate | null;
export type CompatibleValue = SingleValue | SingleValue[];

export function wrongSortOrder(rangeValue: SingleValue[]): boolean {
  const [start, end] = rangeValue;
  return !!start && !!end && end.isBeforeDay(start);
}

export type CandyDateType<D = Date> = CandyDate<D> | null;
export type CandyDateFac = (date?: Date | string | number) => CandyDate;

export function normalizeRangeValue(
  adapter: NzDateAdapter,
  value: SingleValue[],
  hasTimePicker: boolean,
  type: NormalizedMode = 'month',
  activePart: 'left' | 'right' = 'left'
): CandyDate[] {
  const [start, end] = value;
  // let newStart: CandyDate = start || new CandyDate();
  let newStart: CandyDate = start || new CandyDate(adapter);
  let newEnd: CandyDate = end || (hasTimePicker ? newStart : newStart.add(1, type));

  if (start && !end) {
    newStart = start;
    newEnd = hasTimePicker ? start : start.add(1, type);
  } else if (!start && end) {
    newStart = hasTimePicker ? end : end.add(-1, type);
    newEnd = end;
  } else if (start && end && !hasTimePicker) {
    if (start.isSame(end, type)) {
      newEnd = newStart.add(1, type);
    } else {
      if (activePart === 'left') {
        newEnd = newStart.add(1, type);
      } else {
        newStart = newEnd.add(-1, type);
      }
    }
  }
  return [newStart, newEnd];
}

export function cloneDate(value: CompatibleValue): CompatibleValue {
  if (Array.isArray(value)) {
    return value.map(v => (v instanceof CandyDate ? v.clone() : null));
  } else {
    return value instanceof CandyDate ? value.clone() : null;
  }
}

export function CANDY_DATE_FACTORY(adapter: NzDateAdapter): CandyDateFac {
  return (date?: Date | string | number): CandyDate => new CandyDate(adapter, date);
}

/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
@Injectable({
  providedIn: 'root',
  useFactory: CANDY_DATE_FACTORY,
  deps: [NzDateAdapter]
})
export class CandyDate<D = Date> implements IndexableObject {
  date!: D;
  nativeDate!: Date;
  // locale: string; // Custom specified locale ID

  constructor(private dateAdapter: NzDateAdapter<D>,date?: D | Date | string | number) {
    if (date) {
      if (typeof date === 'string' || typeof date === 'number')
        console.warn('The string type is not recommended for date-picker, use "Date" type');

      try {
        this.date = this.dateAdapter.deserialize(date);
      } catch (e) {
        throw new Error('The input date type is not supported ("Date" is now recommended)');
      }
    } else {
      this.date = dateAdapter.today();
    }

    this.nativeDate = this.dateAdapter.toNativeDate(this.date);
  }

  calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): CandyDate<D> {
    return new CandyDate<D>(
      this.dateAdapter,
      this.dateAdapter.calendarStartOfWeek(this.dateAdapter.calendarStartOfMonth(this.date), options)
    );
  }

  // ---------------------------------------------------------------------
  // | Native shortcuts
  // -----------------------------------------------------------------------------\

  getYear(): number {
    return this.dateAdapter.getYear(this.date);
  }

  getMonth(): number {
    return this.dateAdapter.getMonth(this.date);
  }

  getDay(): number {
    return this.dateAdapter.getDay(this.date);
  }

  getTime(): number {
    return this.dateAdapter.getTime(this.date);
  }

  getDate(): number {
    return this.dateAdapter.getDate(this.date);
  }

  getHours(): number {
    return this.dateAdapter.getHours(this.date);
  }

  getMinutes(): number {
    return this.dateAdapter.getMinutes(this.date);
  }

  getSeconds(): number {
    return this.dateAdapter.getSeconds(this.date);
  }

  getMilliseconds(): number {
    return this.dateAdapter.getMilliseconds(this.date);
  }

  // ---------------------------------------------------------------------
  // | New implementing APIs
  // ---------------------------------------------------------------------

  clone(): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.clone(this.date));
  }

  setHms(hour: number, minute: number, second: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.setHms(this.date, hour, minute, second));
  }

  setYear(year: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.setYear(this.date, year));
  }

  addYears(amount: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.addYears(this.date, amount));
  }

  // NOTE: month starts from 0
  // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
  setMonth(month: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.setMonth(this.date, month));
  }

  addMonths(amount: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.addMonths(this.date, amount));
  }

  setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): CandyDate<D> {
    return new CandyDate(this.dateAdapter, this.dateAdapter.setDay(this.date, day, options));
  }

  setDate(amount: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.setDate(this.date, amount));
  }

  addDays(amount: number): CandyDate<D> {
    return new CandyDate<D>(this.dateAdapter, this.dateAdapter.addDays(this.date, amount));
  }

  add(amount: number, mode: NormalizedMode): CandyDate<D> {
    switch (mode) {
      case 'decade':
        return this.addYears(amount * 10);
      case 'year':
        return this.addYears(amount);
      case 'month':
        return this.addMonths(amount);
      default:
        return this.addMonths(amount);
    }
  }

  isSame(candyDate: CandyDateType<D>, grain: CandyDateMode = 'day'): boolean {
    if (!candyDate) return false;

    return this.dateAdapter.isSame(this.date, candyDate.date, grain);
  }

  isSameYear(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'year');
  }

  isSameMonth(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'month');
  }

  isSameDay(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'day');
  }

  isSameHour(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'hour');
  }

  isSameMinute(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'minute');
  }

  isSameSecond(date: CandyDateType<D>): boolean {
    return this.isSame(date, 'second');
  }

  isBefore(candyDate: CandyDateType<D>, grain: CandyDateMode = 'day'): boolean {
    if (!candyDate) return false;

    return this.dateAdapter.isBefore(this.date, candyDate.date, grain);
  }

  isBeforeYear(date: CandyDateType<D>): boolean {
    return this.isBefore(date, 'year');
  }

  isBeforeMonth(date: CandyDateType<D>): boolean {
    return this.isBefore(date, 'month');
  }

  isBeforeDay(date: CandyDateType<D>): boolean {
    return this.isBefore(date, 'day');
  }

  // Equal to today accurate to "day"
  isToday(): boolean {
    return this.dateAdapter.isToday(this.date);
  }

  isValid(): boolean {
    return this.dateAdapter.isValid(this.date);
  }

  isFirstDayOfMonth(): boolean {
    return this.dateAdapter.isFirstDayOfMonth(this.date);
  }

  isLastDayOfMonth(): boolean {
    return this.dateAdapter.isLastDayOfMonth(this.date);
  }

  private toNativeDate(date: NzSafeAny): Date {
    return date instanceof CandyDate ? date.nativeDate : date;
  }
}
