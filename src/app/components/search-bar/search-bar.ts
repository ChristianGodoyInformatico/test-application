import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SearchService } from '@services/search';

@Component({
  selector: 'app-search-bar',
  imports: [IconFieldModule, InputIconModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {

  constructor(public search: SearchService) { }

}
