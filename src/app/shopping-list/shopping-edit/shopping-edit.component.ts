import { Component, ElementRef, OnInit, ViewChild ,Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:false}) nameInputElf : ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputElf : ElementRef;
  @Output()ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }
  onAdded(){
    const ingName = this.nameInputElf.nativeElement.value;
    const ingAmnt = this.amountInputElf.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmnt);
    this.ingredientAdded.emit(newIngredient);
  }
  
}
