import { Component, OnInit } from '@angular/core';
import { Favorite } from '../models/Favorite';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  
  constructor(private favoriteService: FavoriteService) { }
  
  ngOnInit(): void {
    this.initJQueryDatatable();
    this.onClickEditPokemon();
  }
  
  initJQueryDatatable(){
    let listId = '#list';
    $(listId).DataTable().destroy();
    this.favoriteService.getDataInSessionStorage().then((data:any)=>{
      let i = 0;
      $(listId).DataTable( {
        data: data,
        columns: [
          { data: (data)=>{
            i++;
            return i;
          } },
          { data: 'name' },
          { data: 'alias' },
          { data: 'createdAt' },
          { data:  (data) => {
            return `
            <a href="#" class="btn btn-warning text-white editPokemon"
            data-toggle="tooltip" data-name="${data.name}"
            data-placement="top" title="Editar">
            <i class="fas fa-edit"></i>
            </a>
            `;
          },
          "width": "15%",
          "className": "text-center"
        }
      ]
    } );
  });
}

onClickEditPokemon(){
  const selfClass = this;
  $(document).on('click', '.editPokemon', function(e){
    e.preventDefault();
    const $selector = $(this);
    const $modalEdit = $('#modal-edit');
    const $name = $modalEdit.find('#name');
    const $alias = $modalEdit.find('#alias');
    const $createdAt = $modalEdit.find('#createdAt');
    const dataName = $selector.data('name');
    let favorites = selfClass.favoriteService.getDataInSessionStorage();
    favorites.then((data:any)=>{
      data.forEach(function(item:Favorite){
        if(item.name == dataName){
          $name.val(item.name);
          $alias.val(item.alias);
          $createdAt.val(item.createdAt.toString());
          return;
        }
      });
    });
    (<any>$modalEdit).modal('show');
  });
}
}
