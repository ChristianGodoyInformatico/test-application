import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DetailsService } from './details';
import { HistoryData } from '@models/constituens.model';

describe('DetailsService', () => {
  let service: DetailsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DetailsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads history and resumen', () => {
    service.loadFor('AAA');
    const histReq = http.expectOne('assets/resources/history/history-AAA.json');
    const resReq = http.expectOne('assets/resources/resumen/AAA.json');

    const hist: HistoryData = {
      info: {
        name: '',
        shortName: '',
        countryName: '',
        currencyName: '',
        currencySymbol: '',
        codeInstrument: 'AAA',
        hourOpen: '',
        hourClose: '',
      },
      chart: []
    };

    histReq.flush({ success: true, code: 200, data: hist });
    resReq.flush({ success: true, code: 200, data: {} });

    expect(service.history()).toEqual(hist);
    expect(service.resumen()).toEqual({});
    expect(service.error()).toBeNull();
  });
});
