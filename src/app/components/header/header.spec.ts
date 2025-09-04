import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { signal } from '@angular/core';
import { DetailsService } from '@services/index';

class FakeDetailsService {
  resumen = signal<any | null>(null);
}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [{ provide: DetailsService, useClass: FakeDetailsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('computes info and price from service', () => {
    const details = TestBed.inject(DetailsService) as FakeDetailsService;
    const data = { info: { marketName: 'M' }, price: { openPrice: 1 } };
    details.resumen.set(data);
    expect(component.info()).toEqual(data.info);
    expect(component.price()).toEqual(data.price);
  });

  it('returns class based on sign', () => {
    expect(component.signClass(5)).toBe('green');
    expect(component.signClass(-3)).toBe('red');
    expect(component.signClass(0)).toBe('');
  });
});
