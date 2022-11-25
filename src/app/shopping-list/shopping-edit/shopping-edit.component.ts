import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f', {static : true}) slform : NgForm;
  editMode = false;
  editedItemIndex : number;
  subsrciption : Subscription;
  editedItem : Ingredient;
  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit() {
    this.subsrciption = this.shoppingService.editting.subscribe((index : number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.slform.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
    });
  }
  onAdded(form : NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingService.addingredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingService.deleteIngrediient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subsrciption.unsubscribe();
  }
}
