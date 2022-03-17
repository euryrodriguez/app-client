import { Component, OnInit, OnChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { Favorite } from '../models/Favorite';
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
  offSet = 1;
  pokemons:any[] = [];
  
  constructor(private pokemonService: PokemonService) { }
  
  ngOnInit(): void {
    this.getPokemons();
  }
  
  getPokemons(){
    const selfClass = this;
    this.offSet = (this.currentPage == 1)? 0 : parseInt(`${this.currentPage}0`) - 11;
    this.pokemonService.getPokemons(9, this.offSet).subscribe((response: any)=>{
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
  addPokemonToFavorite(event:any){
    let target = event.target || event.srcElement || event.currentTarget;
    let nameAttr = target.getAttribute('name');
    let now = new Date();
    let favorites:any = null;
    let pokemon: Favorite = { name: nameAttr, alias: nameAttr, createdAt: now };
    favorites = sessionStorage.getItem('favorites');
    if(favorites == null){
      favorites = [];
      let item:any = {};
      item[nameAttr] = pokemon;
      favorites.push(item);
      sessionStorage.setItem('favorites', JSON.stringify(favorites));
    }else{
      let arrayOfFavorites = JSON.parse(favorites);
      let item:any = {};
      item[nameAttr] = pokemon;
      arrayOfFavorites.push(item);
      sessionStorage.setItem('favorites', JSON.stringify(arrayOfFavorites));
    }
    target.disabled= true;
    Swal.fire(`Operacion Completada!`, `El pokemon ${nameAttr} ha sido agregado a favoritos.`, 'success');
  }
  ifPokemonNotExistInFavorites(name:string){
    let exists = false;
    let favorites = sessionStorage.getItem('favorites');
    if(favorites != null){
      let arrayOfFavorites = JSON.parse(favorites);
      arrayOfFavorites.forEach(function(item:any){
        if(item[name]){
          exists = true;
        }
      });
    }
    return exists;
  }
}
