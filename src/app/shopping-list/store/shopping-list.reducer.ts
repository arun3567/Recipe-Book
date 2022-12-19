import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

export interface State {
    ingredients : Ingredient[];
    editedIngredient : Ingredient;
    editedIngredientIndex : number;
    
}
const initialState : State = {
    ingredients:[
        new Ingredient('Apple',7),
        new Ingredient('Tomato',10),
        new Ingredient('Orange',3),
    ],
    editedIngredient : null,
    editedIngredientIndex : -1

};

export function ShoppingListReducer(state : State = initialState,action: ShoppingListAction.ShoppingListAction){
    switch(action.type){
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients ,action.payload]
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients , ...action.payload]
            };
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const UpdateIngredient ={
                ...ingredient,
                ...action.payload
            };
            const UpdateIngredients = [...state.ingredients];
            UpdateIngredients[state.editedIngredientIndex] = UpdateIngredient;
            return {
                ...state,
                ingredients : UpdateIngredients,
                editedIngredientIndex : -1,
                editedIngredient : null
            };
        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients : state.ingredients.filter((ig , igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex : -1,
                editedIngredient : null
            };
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex : action.payload,
                editedIngredient : {...state.ingredients[action.payload]}
            };
        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                editedIngredient : null,
                editedIngredientIndex : -1
            }                
        default: 
        return state;
    }
}