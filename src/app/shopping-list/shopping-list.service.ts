
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientAdded = new EventEmitter<Ingredient[]>();

    ingredients:Ingredient[] =[
        new Ingredient('Apple',7),
        new Ingredient('Tomato',10),
        new Ingredient('Orange',3),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addingredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.emit(this.ingredients.slice());
    }
}