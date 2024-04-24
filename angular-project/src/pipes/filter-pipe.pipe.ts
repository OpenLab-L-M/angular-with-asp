import { Pipe, PipeTransform } from '@angular/core';
import { RecipesDTO } from 'src/app/recipes/RecipesDTO';

@Pipe({
  standalone: true,
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: RecipesDTO[], sSearchRecept: string): RecipesDTO[] {


    if (!items) { return []; }


    if (!sSearchRecept) { return items; }

 
    sSearchRecept = sSearchRecept.toLowerCase();
    const difficultiesArray = sSearchRecept.split(" ");
    const difficulty1 = difficultiesArray[0];
    const difficulty2 = difficultiesArray[1];

    return items.filter(item => {
      if (item && item.difficulty) {
        return item.difficulty.toLowerCase().includes(difficulty1) || item.difficulty.toLowerCase().includes(difficulty2);
      }
      return false;
    });
  }
}