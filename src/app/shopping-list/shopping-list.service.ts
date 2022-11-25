import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientAdded = new Subject<Ingredient[]>();
    editting = new Subject<number>();

    ingredients:Ingredient[] =[
        new Ingredient('Apple',7),
        new Ingredient('Tomato',10),
        new Ingredient('Orange',3),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index : number){
       return this.ingredients[index];
    }

    addingredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    updateIngredient(index : number , newIngredient : Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientAdded.next(this.ingredients.slice());
    }

    deleteIngrediient(index : number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}