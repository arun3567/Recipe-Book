import { Component, OnInit , Output ,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 @Output () recipeWasSelected = new EventEmitter<Recipe>();
  recipes : Recipe[] =[
    new Recipe('Test Recipe' , 'Simple Recipe Test',
    'https://static01.nyt.com/images/2022/10/14/dining/14EASYPASTA-ROUNDUP14/14EASYPASTA-ROUNDUP14-videoSixteenByNine3000.jpg'),
    new Recipe('Second Test Recipe' , 'Simple Recipe Test',
    'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
  
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe : Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
