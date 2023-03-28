import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply recipe', 'https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-1676057761.jpeg?crop=1.00xw:0.502xh;0,0.229xh&resize=1200:*'),
    new Recipe('An Another Recipe', 'This is complex recipe', 'https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg')
  ];

  constructor() {

  }

  ngOnInit() {

  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
