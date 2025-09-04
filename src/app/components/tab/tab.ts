import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { InstrumentList } from "@components/instrument-list/instrument-list";
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-tab',
  imports: [TabsModule, InstrumentList, MessageModule],
  templateUrl: './tab.html',
  styleUrl: './tab.scss'
})
export class Tab {

}
