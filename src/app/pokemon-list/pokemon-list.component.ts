import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  limitsArray: Array<String> = ["100", "200", "300", "400", "500", "600", "700", "800", "898"];

  constructor() { }

  ngOnInit(): void {
  }

}
