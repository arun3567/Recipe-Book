import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const shopRoutes:Routes =
[
    {path : '', component : ShoppingListComponent}
]
@NgModule({
    imports:[RouterModule.forChild(shopRoutes)],
    exports:[RouterModule]
})
export class ShoppingRoutingModule{}