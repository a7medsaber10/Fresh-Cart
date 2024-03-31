import { product } from './interfaces/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[], term:string): product[] {
    return productList.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
  }

}
