import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipeAction from '../recipes/store/recipe.actions';
import { Actions,ofType } from "@ngrx/effects";

@Injectable({
    providedIn : 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor (private dataStorage : DataStorageService ,
                 private recipeService : RecipeService,
                 private store : Store<fromApp.AppState>,
                 private action$ : Actions){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipeService.getRecipes();
        // if (recipes.length === 0){
        //     return this.dataStorage.fetchData();
        // } else {
        //     return recipes;
        // }
        return this.store.select('recipe').pipe(take(1),map(recipesState => {
          return recipesState.recipes
        }),switchMap(recipes => {
          if(recipes.length === 0){
            this.store.dispatch(new RecipeAction.FetchRecipe());
            return this.action$.pipe(ofType(RecipeAction.SET_RECIPE),take(1));
          }else {
            return of (recipes);
          }
        })
        );
      }
}
