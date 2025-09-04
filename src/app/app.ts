import { Component, inject, OnInit } from '@angular/core';
import { Chart, Header, SearchBar, Summary, Tab } from './components';
import { ConstituensData } from './services/constituensData';


@Component({
  selector: 'app-root',
  imports: [SearchBar, Header, Chart, Summary, Tab],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constituensData = inject(ConstituensData);

  ngOnInit(): void {
    this.constituensData.getData();
  }
}
