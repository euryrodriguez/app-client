import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { AppComponent } from './app.component';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    FavoriteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokemonService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
