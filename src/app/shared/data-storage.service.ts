import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        console.log(recipes)
        this.http.post('https://ng-course-recipe-book-26205-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        )
    }

    fetchRecipes() {
        this.http.get('https://ng-course-recipe-book-26205-default-rtdb.firebaseio.com/recipes.json')       
            .subscribe(
                (recipesData) => {
                    let recipesArray: Recipe[] = [];
                    for (const key in recipesData) {
                        if (recipesData.hasOwnProperty(key)) {
                            recipesArray = recipesData[key];
                            if(recipesArray) {
                                recipesArray.map(recipe => {
                                    if(!recipe.ingredients) {
                                        recipe.ingredients = []
                                    }

                                })
                            }
                        }
                    }
                console.log(recipesArray)
                this.recipeService.setRecipes(recipesArray);
            }
        )
    
    } 

}