import { TestBed } from '@angular/core/testing';
import { SelectionService } from './selection';
import { Constituent } from '@models/constituens.model';

describe('SelectionService', () => {
  let service: SelectionService;
  const row: Constituent = {
    codeInstrument: 'AAA',
    name: 'AAA Corp',
    shortName: 'AAA',
    pctDay: 1,
    pct30D: 2,
    pctCY: 3,
    pct1Y: 4,
    lastPrice: 10,
    datetimeLastPrice: '',
    volumeMoney: 0,
    accumulatedVolumeMoney: 0,
    tend: 'same',
    performanceAbsolute: 0,
    performanceRelative: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionService);
  });

  it('updates selection state', () => {
    service.select(row);
    expect(service.selectedRow()).toEqual(row);
    expect(service.selectedCode()).toBe('AAA');
    expect(service.isSelected(row)).toBeTrue();
    service.clear();
    expect(service.selectedRow()).toBeNull();
  });
});
