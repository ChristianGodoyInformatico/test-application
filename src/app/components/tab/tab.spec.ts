import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab } from './tab';

describe('Tab', () => {
  let component: Tab;
  let fixture: ComponentFixture<Tab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Tab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders instrument list in first tab', () => {
    const list = fixture.nativeElement.querySelector('app-instrument-list');
    expect(list).not.toBeNull();
  });
});
