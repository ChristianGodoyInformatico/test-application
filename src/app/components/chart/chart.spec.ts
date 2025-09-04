import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart } from './chart';
import { signal } from '@angular/core';
import { DetailsService, SelectionService } from '@services/index';

class FakeSelectionService {
  selectedCode = signal<string | null>(null);
}

class FakeDetailsService {
  loading = signal(false);
  history = signal<any | null>(null);
  loadFor = jasmine.createSpy('loadFor');
}

describe('Chart', () => {
  let component: Chart;
  let fixture: ComponentFixture<Chart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chart],
      providers: [
        { provide: SelectionService, useClass: FakeSelectionService },
        { provide: DetailsService, useClass: FakeDetailsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changes period preset', () => {
    component.customRange.set([new Date(), new Date()]);
    component.setPreset('1M');
    expect(component.selectedPreset()).toBe('1M');
    expect(component.customRange()).toBeNull();
  });

  it('switches to custom range', () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2020, 0, 2);
    component.onRangeChange([start, end]);
    expect(component.selectedPreset()).toBe('CUSTOM');
    expect(component.customRange()).toEqual([start, end]);
  });

  it('loads details when selection changes', () => {
    const sel = TestBed.inject(SelectionService) as unknown as FakeSelectionService;
    const details = TestBed.inject(DetailsService) as unknown as FakeDetailsService;
    sel.selectedCode.set('AAA');
    expect(details.loadFor).toHaveBeenCalledWith('AAA');
  });
});
