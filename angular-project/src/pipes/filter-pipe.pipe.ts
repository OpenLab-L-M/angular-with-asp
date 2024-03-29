import { Pipe, PipeTransform } from '@angular/core';
import { RecipesDTO } from 'src/app/recipes/RecipesDTO';

@Pipe({
  standalone: true,
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: RecipesDTO[], sSearchRecept: string): RecipesDTO[] {

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!sSearchRecept) { return items; }

    // convert the searchText to lower case
    sSearchRecept = sSearchRecept.toLowerCase();

    // retrun the filtered array
    return items.filter(item => {
      if (item && item.difficulty) {
        return item.difficulty.toLowerCase().includes(sSearchRecept);
      }
      return [];
    });
  }
}