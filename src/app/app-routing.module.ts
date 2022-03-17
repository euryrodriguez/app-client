import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';


const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent},
  { path: 'favorites', component: FavoriteListComponent },
  { path: '', redirectTo:'/pokemons', pathMatch: 'full'},
  { path: '**', redirectTo:'/pokemons', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
