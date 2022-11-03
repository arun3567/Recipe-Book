import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[] =[
    new Recipe('Test Recipe' , 'Simple Recipe Test',
    'https://static01.nyt.com/images/2022/10/14/dining/14EASYPASTA-ROUNDUP14/14EASYPASTA-ROUNDUP14-videoSixteenByNine3000.jpg'),
    new Recipe('Test Recipe' , 'Simple Recipe Test',
    'https://static01.nyt.com/images/2022/10/14/dining/14EASYPASTA-ROUNDUP14/14EASYPASTA-ROUNDUP14-videoSixteenByNine3000.jpg')
  
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
