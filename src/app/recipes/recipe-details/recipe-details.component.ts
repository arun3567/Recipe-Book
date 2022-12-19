import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeAction from '../store/recipe.actions';
import { map, switchMap } from 'rxjs';
import * as ShoppingAction from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 recipe: Recipe;
 dropdown = false;
 id : number;
  constructor(private recipeService : RecipeService ,
              private route : ActivatedRoute ,
              private router : Router,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(){
    this.route.params.pipe(map(params => {
      return +params['id'];
    }),switchMap(id => {
      this.id = id;
      return this.store.select('recipe');
    }),map(recipeState => {
      return recipeState.recipes.find((recipe, index)=>{
        return index === this.id;
      });
    })
    )
    // .subscribe(
    //   (params : Params) => {
    //     this.id = +params['id'];
        // this.recipe = this.recipeService.getRecipe(this.id);
        // .pipe(
        //   map(recipeState => {
        //     return recipeState.recipes.find((recipe, index)=>{
        //       return index === this.id;
        //     });
        //   })
        // )
        .subscribe(recipe => {
          this.recipe = recipe;
        });
  }

  addToShopping(){
    // this.recipeService.addIngredient(this.recipe.ingredients);
    this.store.dispatch(new ShoppingAction.AddIngredients(this.recipe.ingredients));
    if (this.recipe.ingredients){
      alert('Shopping List Added');
    }else{
      alert('Not Added');
    }

  }

  onEdit(){
    // this.router.navigate(['edit'],{relativeTo : this.route});
    this.router.navigate(['../', this.id , 'edit'],{relativeTo: this.route});
  }

  onDelete(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
