import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'ingredientsFilter',
  standalone: true
})
export class IngredientsFilterPipe implements PipeTransform {

  transform( ingredients: string[], searchTerm: string): string[] {
   
      if (!ingredients) {
        return [];
      }
      if (!searchTerm) {
        return ingredients;
      }
      searchTerm = searchTerm.toLocaleLowerCase();
  
      return ingredients.filter(it => {
        return it.toLocaleLowerCase().includes(searchTerm);
      });
  }

}
