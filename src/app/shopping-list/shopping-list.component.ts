import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients: Observable<{ingredients : Ingredient[]}>;
  private changeSub : Subscription;
  constructor(private shoppingService : ShoppingListService,
              private store : Store<fromApp.AppState>) 
              {}

  ngOnInit(){
   this.ingredients = this.store.select('shoppingList');
  //  this.ingredients = this.shoppingService.getIngredients();
  //  this.changeSub = this.shoppingService.ingredientAdded.subscribe(
  //   (ingredients : Ingredient[]) => {
  //     this.ingredients = ingredients;
  //   }
  //  );
  console.log(this.ingredients);
  }
  ngOnDestroy(){
    // this.changeSub.unsubscribe();
  }
  onEdit(index : number){
    // this.shoppingService.editting.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
