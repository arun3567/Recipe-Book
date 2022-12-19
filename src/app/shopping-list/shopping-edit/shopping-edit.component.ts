import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f', {static : true}) slform : NgForm;
  editMode = false;
  subsrciption : Subscription;
  editedItem : Ingredient;
  constructor(private shoppingService : ShoppingListService, private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subsrciption = this.store.select('shoppingList').subscribe(storeData => {
      if(storeData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = storeData.editedIngredient;
        this.slform.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
      else{
        this.editMode = false;
      }
    });
    // this.subsrciption = this.shoppingService.editting.subscribe((index : number)=>{
    //   this.editedItemIndex = index;
    //   this.editMode = true;
    //   this.editedItem = this.shoppingService.getIngredient(index);
    //   this.slform.setValue({
    //     name : this.editedItem.name,
    //     amount : this.editedItem.amount
    //   })
    // });
  }
  onAdded(form : NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      // this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient);
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(newIngredient));
    }else{
      // this.shoppingService.addingredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    console.log(newIngredient);
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete(){
    // this.shoppingService.deleteIngrediient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(){
    this.subsrciption.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }
}
