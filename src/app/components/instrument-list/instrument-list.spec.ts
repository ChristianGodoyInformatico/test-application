import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentList } from './instrument-list';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ConstituensData, SearchService } from '@services/index';
import { Constituent } from '@models/constituens.model';

class FakeConstituensData {
  constituendsList = signal<any | null>(null);
  getData = jasmine.createSpy('getData');
}

describe('InstrumentList', () => {
  let component: InstrumentList;
  let fixture: ComponentFixture<InstrumentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentList],
      providers: [
        { provide: ConstituensData, useClass: FakeConstituensData },
        SearchService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates rows when service data arrives', () => {
    const svc = TestBed.inject(ConstituensData) as unknown as FakeConstituensData;
    const row: Constituent = {
      codeInstrument: 'ABC',
      name: 'Test',
      shortName: 'TST',
      pctDay: 0,
      pct30D: 0,
      pctCY: 0,
      pct1Y: 0,
      lastPrice: 1,
      datetimeLastPrice: '',
      volumeMoney: 0,
      accumulatedVolumeMoney: 0,
      tend: 'same',
      performanceAbsolute: 0,
      performanceRelative: 0,
    };
    svc.constituendsList.set({ constituents: [row] });
    expect(component.rows()).toEqual([row]);
  });

  it('updates sort state', () => {
    component.onSort({ field: 'name', order: -1 });
    expect(component.sortField()).toBe('name');
    expect(component.sortOrder()).toBe(-1);
  });
});
