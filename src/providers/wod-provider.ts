import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WodProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class WodProvider {

  items: any;

  constructor(public http: Http) {
    this.items = [
        {title: 'one'},
        {title: 'two'},
        {title: 'three'},
        {title: 'four'},
        {title: 'five'},
        {title: 'six'}
    ]
    console.log('Hello WodProvider Provider');
  }

  filterItems(searchTerm){

      return this.items.filter((item) => {
          return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });     

  }

}
