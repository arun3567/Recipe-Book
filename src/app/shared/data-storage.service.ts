import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipeAction from '../recipes/store/recipe.actions';

@Injectable({
    providedIn : 'root'
})
export class DataStorageService {

    constructor (private http : HttpClient,
        private recipeService : RecipeService,
        private authService : AuthService,
        private store : Store<fromApp.AppState>){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://course-recipe-book-3bdf0-default-rtdb.firebaseio.com/recipes.json' , recipes).subscribe(Response => {
            console.log(Response);
        });
    }

    fetchData(){
             return this.http.get<Recipe[]>('https://course-recipe-book-3bdf0-default-rtdb.firebaseio.com/recipes.json',
            ).pipe(
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            // this.recipeService.setRecipes(recipes);
            this.store.dispatch(new RecipeAction.SetRecipe(recipes));
        })
        );
    }
}
