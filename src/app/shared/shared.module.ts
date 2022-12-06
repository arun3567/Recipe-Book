import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/aler.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder.directive";

@NgModule({
    declarations:
    [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceHolderDirective
    ],
    imports: [CommonModule],
    exports: 
    [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceHolderDirective
    ],
})
export class SharedModule{}