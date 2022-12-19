import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { Effect } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import * as RecipeAction from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{

    @Effect()
    fetchRecipe = this.action$.pipe(ofType(RecipeAction.FETCH_RECIPE),
    switchMap(() => {
        return this.http.get<Recipe[]>('https://course-recipe-book-3bdf0-default-rtdb.firebaseio.com/recipes.json');
    }),
    map(recipes => {
        return recipes.map(recipe => {
            return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []};
        });
    }),map(recipes => {
        return new RecipeAction.SetRecipe(recipes);
    }),
    );

    @Effect({dispatch : false})
    storeRecipe = this.action$.pipe(
      ofType(RecipeAction.STORE_RECIPE),
      withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData,recipesState]) =>
    {
      return this.http.put('https://course-recipe-book-3bdf0-default-rtdb.firebaseio.com/recipes.json' ,
      recipesState.recipes
      );
    })
    );

    constructor(private action$ : Actions, private http : HttpClient, private store : Store<fromApp.AppState>){}
}
