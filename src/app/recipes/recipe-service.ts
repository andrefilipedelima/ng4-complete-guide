import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>

    private recipes: Recipe[] = [
        new Recipe(
            'A Lasagna', 
            'Lasagna is both a type of pasta made up of wide ribbons, and also a dish, sometimes called oven lasagna, made with these ribbons placed in layers, and interspersed with stuffing and sauce.', 
            'https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-1676057761.jpeg?crop=1.00xw:0.502xh;0,0.229xh&resize=1200:*',
             [
                new Ingredient('Cheese', 5),
                new Ingredient('Lasagna pasta', 2),
                new Ingredient('Tomato Sauce', 1)
             ]),
        new Recipe(
            'A Pancake',
            'Pancake is a type of dough fried in a little oil on a hot plate or frying pan, basically made with eggs, flour and milk. There are many regional variations of pancakes, some containing yeast or other ingredients.',
            'https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg',
            [
                new Ingredient('egg', 6),
                new Ingredient('strawberry', 4),
                new Ingredient('Sugar', 1),
                new Ingredient('Milk', 1),
                new Ingredient('flour', 5)
            ])
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientstoShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}