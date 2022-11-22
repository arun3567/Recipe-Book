import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientAdded = new Subject<Ingredient[]>();

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
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}