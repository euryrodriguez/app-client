import { Component, OnInit, OnChanges } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  totalRecords: number = 0;
  currentPage = 1;
  pokemons:any[] = [];
  limitsArray: Array<String> = ["100", "200", "300", "400", "500", "600", "700", "800", "898"];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    const selfClass = this;
    this.pokemonService.getPokemons(9, this.currentPage + 0).subscribe((response: any)=>{
      this.totalRecords = response.count;
    /*------------------------------------------------------------------*/
      response.results.forEach(function(item:Pokemon){
        selfClass.pokemonService
        .getPokemonDataByName(item.name)
        .subscribe(function(data: any){
          selfClass.pokemons.push(data);
        });
      });
      /*------------------------------------------------------------------*/
    });
  }
  addPokemonToFavorite(){
    console.log(this);
  }
}
