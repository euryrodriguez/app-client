import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { 

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
}
