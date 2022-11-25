import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
              private router : Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addToShopping(){
    this.recipeService.addIngredient(this.recipe.ingredients);
    alert('Shopping List Added');
  }

  onEdit(){
    // this.router.navigate(['edit'],{relativeTo : this.route});
    this.router.navigate(['../', this.id , 'edit'],{relativeTo: this.route});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
