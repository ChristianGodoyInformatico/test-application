import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConstituensData } from './constituensData';
import { SelectionService } from './selection';
import { IndexConstituenData } from '@models/constituens.model';

describe('ConstituensData', () => {
  let service: ConstituensData;
  let http: HttpTestingController;
  let selection: SelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SelectionService],
    });
    service = TestBed.inject(ConstituensData);
    http = TestBed.inject(HttpTestingController);
    selection = TestBed.inject(SelectionService);
    spyOn(selection, 'select');
  });

  it('fetches data and updates state', () => {
    service.getData();
    const req = http.expectOne('assets/resources/constituyentes/constituensList.json');
    const mock: IndexConstituenData = {
      info: { name: 'Index', shortName: 'IDX', countryName: 'CL', codeInstrument: 'IDX' },
      constituents: []
    };
    req.flush({ success: true, code: 200, data: mock });
    expect(service.constituendsList()).toEqual(mock);
    expect(selection.select).toHaveBeenCalled();
  });
});
