import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipes : Recipe[];
  subscription : Subscription;

  constructor(private recipeService : RecipeService ,
              private route : ActivatedRoute ,
              private router : Router,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(){
    // this.subscription = this.recipeService.recipeChanged
    this.subscription = this.store.select('recipe').pipe(map(recipeState => recipeState.recipes))
      .subscribe(
      (recipes : Recipe[]) => {
      this.recipes = recipes;
      });
    // this.recipes = this.recipeService.getRecipes();
  }

  onEdit(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
