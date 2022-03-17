import { Injectable } from '@angular/core';
import { Favorite } from '../models/Favorite';
import { Pokemon } from '../models/Pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(limit:number, offset: number):Observable<Array<Pokemon>>{
    console.log(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return this.http.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDataByName(name: string):Observable<Pokemon>{
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
