import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  selectedIngredients: string = '';

  constructor() { }
}
