import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{

   recipeSelected = new EventEmitter<Recipe>();
   private recipes : Recipe[] =[
        new Recipe('Pasta',
        'Easy Pasta',
        'https://static01.nyt.com/images/2022/10/14/dining/14EASYPASTA-ROUNDUP14/14EASYPASTA-ROUNDUP14-videoSixteenByNine3000.jpg',
        [
            new Ingredient ('Pasta', 1)
        ]),
        new Recipe('Burger',
        'Fat Burger',
        'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        [
            new Ingredient ('Buns', 2),
            new Ingredient ('Meat', 1),
            new Ingredient ('French Fries', 10)
        ])
    ]

    constructor(private shoppingService : ShoppingListService){}
    getRecipes(){
        return this.recipes.slice();
    }

    addIngredient(ingredients : Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
    }
}