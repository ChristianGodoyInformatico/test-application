import { TestBed } from '@angular/core/testing';
import { SearchService } from './search';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('updates query signal', () => {
    service.query.set('abc');
    expect(service.query()).toBe('abc');
  });
});
