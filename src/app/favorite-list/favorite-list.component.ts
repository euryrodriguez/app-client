import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  
  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.initJQueryDatatable();
    this.onClickEditPokemon();
  }
  
  initJQueryDatatable(){
    let listId = '#list';
    $(listId).DataTable().destroy();
    this.getDataInSessionStorage().then((data:any)=>{
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
            <a href="#"
            data-title="el grado" data-name="${data.name}"
            data-toggle="tooltip" data-placement="top" title="Eliminar"
            class="btn btn-danger deletePokemon">
            <i class="fas fa-trash-alt"></i>
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
getDataInSessionStorage(){
  return new Promise((resolve)=>{
    let favorites = sessionStorage.getItem('favorites');
    if(favorites == null){
      resolve([]);
    }else{
      let data:any[] = [];
      let arrOfFavorites = JSON.parse(favorites);
      arrOfFavorites.forEach(function(item:any){
        let values = Object.values(item);
        if(values.length>0){
          data.push(values[0]);
        }
      })
      resolve(data);
    }
  });
}
onClickEditPokemon(){
  $(document).on('click', '.editPokemon', function(e){
    e.preventDefault();
    const $selector = $(this);
    const $modalEdit = $('#modal-edit');
    const dataName = $selector.data('name');
    (<any>$modalEdit).modal('show');
  });
}
}
