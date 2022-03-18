import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Favorite } from '../models/Favorite';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  constructor(private favoriteService: FavoriteService) { }
  
  ngOnInit(): void {
  }
  onSaveChanges(){
    const selfClass = this;
    const $selector = $(<any>event?.target); 
    const listId = '#list';
    const $modalEdit = $('#modal-edit');
    const $name = $modalEdit.find('#name');
    const $alias = $modalEdit.find('#alias');
    const $createdAt = $modalEdit.find('#createdAt');
    if($.trim(<any>$name.val()).length > 0 && $.trim(<any>$alias.val()).length > 0 && $.trim(<any>$createdAt.val()).length > 0){
      let newData:any[] = [];
      let favorites = selfClass.favoriteService.getDataInSessionStorage();
      favorites.then((data:any)=>{
        $(data).each(function(i, item:Favorite){
          if(item.name == $name.val()){
            item.alias = <any>$alias.val();
          }
          let pokemon: Favorite = { name: item.name, alias: item.alias, createdAt: item.createdAt };
          let favorite:any = {};
          favorite[item.name] = pokemon;
          newData.push(favorite);
        }).promise().done(function(){
          sessionStorage.setItem('favorites', JSON.stringify(newData));
          (<any>$modalEdit).modal('hide');
          Swal.fire(`Operación Completada!`, `El pokemon ${$name.val()} ha sido actualizado correctamente.`, 'success');
          selfClass.initJQueryDatatable();
        })
      });
      
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Existen Campos Vacios!',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
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
}
