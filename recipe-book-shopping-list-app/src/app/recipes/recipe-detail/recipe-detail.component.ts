import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Supermarket } from 'src/app/supermarkets/supermarket.model';
import { SupermarketService } from 'src/app/supermarkets/supermarket.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  showSupermarkets: boolean;
  supermarkets: Supermarket[] = [];
  ingredientToSearch: string = '';

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private supermarketService: SupermarketService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.showSupermarkets = false;
      this.id = parseInt(params.id);
      this.recipe = this.recipeService.getRecipe(this.id)
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    //this.router.navigate(['edit'], { relativeTo: this.route });//esto tambien funciona para navegar al componente de edicion!!
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  searchIngredient(ingredient: Ingredient) {
    this.ingredientToSearch = ingredient.name;
    // this.supermarketService.getSupermarketByProducts(ingredient.name).subscribe(supermarkets => {

    // })
    this.supermarketService.getAllSupermarkets().subscribe(supermarkets => {
      this.showSupermarkets = true;
      this.supermarkets = supermarkets.filter(supermarket => {
        return supermarket.products.some(product => product.name.toLowerCase() === this.ingredientToSearch.toLowerCase());
      });
      console.log('ingrediente', this.ingredientToSearch)
      console.log('ssssss', this.supermarkets)
    })
  }

}
