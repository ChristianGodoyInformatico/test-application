// Respuesta genérica
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  data: T;
}

export interface IndexConstituenData {
  info: IndexInfo;
  constituents: Constituent[];
}

export interface IndexInfo {
  name: string;
  shortName: string;
  countryName: string;
  codeInstrument: string;
}

export type Tend = 'up' | 'down' | 'same';

export interface Constituent {
  codeInstrument: string;
  name: string;
  shortName: string;

  pctDay: number;
  pct30D: number;
  pctCY: number;
  pct1Y: number;

  lastPrice: number;
  datetimeLastPrice: string;

  volumeMoney: number;
  accumulatedVolumeMoney: number;

  tend: Tend;

  performanceAbsolute: number;
  performanceRelative: number;
}




export interface HistoryPoint {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number;
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  volume: number;
  volumeMoney: number;
  performanceRelative: number;
  performanceAbsolute: number;
  tend: Tend;
}

export interface HistoryInfo {
  name: string;
  shortName: string;
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  hourOpen: string;
  hourClose: string;
}

export interface HistoryData {
  info: HistoryInfo;
  chart: HistoryPoint[];
}
