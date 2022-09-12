import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    //{ path: 'home', component: AppComponent },
    //https://stackoverflow.com/questions/70313032/type-string-is-not-assignable-to-type-loadchildrencallback
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}