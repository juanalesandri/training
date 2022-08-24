import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://thebrilliantkitchen.com/wp-content/uploads/2022/08/Lamb-Medium-Rare%E2%80%8B%E2%80%8B.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://thebrilliantkitchen.com/wp-content/uploads/2022/08/Lamb-Medium-Rare%E2%80%8B%E2%80%8B.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://thebrilliantkitchen.com/wp-content/uploads/2022/08/Lamb-Medium-Rare%E2%80%8B%E2%80%8B.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
