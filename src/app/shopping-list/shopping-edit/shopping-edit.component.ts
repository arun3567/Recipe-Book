import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:false}) nameInputElf : ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputElf : ElementRef;
  
  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit(): void {
  }
  onAdded(){
    const ingName = this.nameInputElf.nativeElement.value;
    const ingAmnt = this.amountInputElf.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmnt);
    this.shoppingService.addingredient(newIngredient);
  }
  
}
