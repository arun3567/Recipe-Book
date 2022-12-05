import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path : '' , redirectTo : '/recipes' ,pathMatch:'full'},
  {path : 'recipes' , component : RecipesComponent,canActivate : [AuthGuard] , children :[
  {path : '', component : RecipeStartComponent},
  {path : 'new', component : RecipeEditComponent},
  {path : ':id', component : RecipeDetailsComponent , resolve : [RecipeResolverService]},
  {path : ':id/edit', component : RecipeEditComponent , resolve : [RecipeResolverService]}
  ]},
  {path : 'shopping-list', component : ShoppingListComponent , children : [
    {path : 'edit' , component : ShoppingEditComponent}
  ]},
  {path : 'auth' , component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
