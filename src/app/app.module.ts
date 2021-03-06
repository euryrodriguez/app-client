import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { AppComponent } from './app.component';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalComponent } from './modal/modal.component';
import { FavoriteService } from './services/favorite.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    FavoriteListComponent,
    HeaderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    DataTablesModule
  ],
  providers: [
    PokemonService,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
