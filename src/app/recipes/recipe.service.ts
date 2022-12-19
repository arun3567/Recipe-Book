import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListAction from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()

export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();

  //  private recipes : Recipe[] =
  //  [
  //       new Recipe('Pizza',
  //                  'Veg Pizza',
  //                  'https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg?size=626&ext=jpg&ga=GA1.2.790181945.1668598167',
  //                   [
  //                     new Ingredient ('Tomato', 1),
  //                     new Ingredient ('Cheese', 4),
  //                     new Ingredient ('Mushroom', 1)
  //                   ]),
  //       new Recipe('Burger',
  //                  'Fat Burger',
  //                  'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  //                   [
  //                     new Ingredient ('Buns', 2),
  //                     new Ingredient ('Meat', 1),
  //                     new Ingredient ('French Fries', 10)
  //                   ])
  //   ]

    private recipes : Recipe[] = []

    constructor(private shoppingService : ShoppingListService, private store : Store<fromApp.AppState>){}

    setRecipes(recipes : Recipe[]){
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }
    
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index : number){
        return this.recipes[index];
    }

    addIngredient(ingredients : Ingredient[]){
        // this.shoppingService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index : number , newRecipe : Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index : number){
      this.recipes.splice(index ,1);
      this.recipeChanged.next(this.recipes.slice());
    }
}
