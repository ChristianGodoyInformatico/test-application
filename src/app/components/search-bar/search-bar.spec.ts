import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';
import { SearchService } from '@services/index';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;
  let service: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar]
    })
      .compileComponents();

    service = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders query state', () => {
    service.query.set('abc');
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('abc');
  });

  it('updates service query on input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'xyz';
    input.dispatchEvent(new Event('input'));
    expect(service.query()).toBe('xyz');
  });
});
