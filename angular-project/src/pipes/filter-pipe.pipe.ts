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
    const difficultiesArray = sSearchRecept.split(" "); // Split the string by space
    const difficulty1 = difficultiesArray[0]; // "Easy"
    const difficulty2 = difficultiesArray[1]; // "Medium"

    // retrun the filtered array
    return items.filter(item => {
      if (item && item.difficulty) {
        // Check if the item's difficulty includes either difficulty1 or difficulty2
        return item.difficulty.toLowerCase().includes(difficulty1) || item.difficulty.toLowerCase().includes(difficulty2);
      }
      return false; // Return false for items without a difficulty or that don't match the criteria
    });
  }
}