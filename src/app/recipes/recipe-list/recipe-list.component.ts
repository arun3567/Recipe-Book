import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { relative } from 'path';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 
  recipes : Recipe[];

  constructor(private recipeService : RecipeService , private route : ActivatedRoute , private router : Router) { }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
  }

  onEdit(){
    this.router.navigate(['new'],{relativeTo : this.route});
  }

}
