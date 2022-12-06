import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const approutes: Routes = 
[
  {path : '' , redirectTo : '/recipes' ,pathMatch:'full'},
  {path : 'recipes' , loadChildren : () => import('./recipes/recipe.module').then(m => m.RecipeModule)},
  {path : 'shopping-list' , loadChildren : () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)},
  {path : 'auth' , loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(approutes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
