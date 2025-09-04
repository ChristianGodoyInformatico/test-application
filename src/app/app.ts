import { Component, inject, OnInit } from '@angular/core';
import { Header, SearchBar } from './components';
import { ConstituensData } from './services/constituensData';
import { Chart } from "./components/chart/chart";
import { Summary } from "./components/summary/summary";
import { InstrumentList } from "./components/instrument-list/instrument-list";
import { Tab } from "./components/tab/tab";


@Component({
  selector: 'app-root',
  imports: [SearchBar, Header, Chart, Summary, InstrumentList, Tab],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constituensData = inject(ConstituensData);

  ngOnInit(): void {
    this.constituensData.getData();
  }
}
