import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path : '' , redirectTo : '/recipes' ,pathMatch:'full'},
  {path : 'recipes' , component : RecipesComponent , children :[
  {path : '', component : RecipeStartComponent},
  {path : 'new', component : RecipeEditComponent},
  {path : ':id', component : RecipeDetailsComponent},
  {path : ':id/edit', component : RecipeEditComponent}
  ]},
  {path : 'shopping-list', component : ShoppingListComponent , children : [
    {path : 'edit' , component : ShoppingEditComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
