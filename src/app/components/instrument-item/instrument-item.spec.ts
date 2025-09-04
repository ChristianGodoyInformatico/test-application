import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentItem } from './instrument-item';
import { Constituent } from '@models/constituens.model';
import { SelectionService } from '@services/selection';

describe('InstrumentItem', () => {
  let component: InstrumentItem;
  let fixture: ComponentFixture<InstrumentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentItem);
    component = fixture.componentInstance;
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
    component.instrument = row;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reflects selection state', () => {
    const tr: HTMLElement = fixture.nativeElement.querySelector('tr');
    expect(tr.classList.contains('row-selected')).toBeFalse();
    const sel = TestBed.inject(SelectionService);
    sel.select(component.instrument);
    fixture.detectChanges();
    expect(tr.classList.contains('row-selected')).toBeTrue();
  });

  it('emits selection on click', () => {
    const sel = TestBed.inject(SelectionService);
    spyOn(sel, 'select');
    const tr: HTMLElement = fixture.nativeElement.querySelector('tr');
    tr.click();
    expect(sel.select).toHaveBeenCalledWith(component.instrument);
  });

  it('renders instrument short name', () => {
    const td: HTMLElement = fixture.nativeElement.querySelector('td');
    expect(td.textContent).toContain(component.instrument.shortName);
  });
});
