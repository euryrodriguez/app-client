import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  isLinkActivated(name:string){
    let result = false;
    let urlSegment = this.activatedRoute.snapshot.url;
    if(urlSegment.length>0){
      if(urlSegment[0].path.includes(name)){
        result = true;
      }
    }
    return result;
  }
}
