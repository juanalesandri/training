import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private urlBase = 'https://recipe-book-training-default-rtdb.firebaseio.com/';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(`${this.urlBase}recipes.json`, recipes).subscribe(resp => {
            console.log(resp);
        });
    }

    // fetchRecipes() {
    //     this.authService.user.pipe(take(1)).subscribe();
    //     return this.http.get<Recipe[]>(`${this.urlBase}recipes.json`,)
    //         .pipe(
    //             map(recipes => {
    //                 return recipes.map(recipe => {
    //                     return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
    //                 })
    //             }),
    //             tap(recipes => { this.recipeService.setRecipes(recipes) }));
    // }

    fetchRecipes() {
        return this.http.get<Recipe[]>(`${this.urlBase}recipes.json`)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
            )
    }
}