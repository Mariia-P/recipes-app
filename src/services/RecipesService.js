class RecipesService {
    _apiBase = 'https://www.themealdb.com/api/json/v1/1/random.php';

    getResource = async url => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getRecipe = async () => {
        const res = await this.getResource(this._apiBase);
        return this._transformRecipe(res.meals[0]);
    };

    _transformRecipe = meal => {
        const ingridients = [];
        for (const key in meal) {
            if (key.includes('strIngredient') && meal[key]) {
                let numberOfIngridient = key.slice(13);
                let meshureKey = `strMeasure${numberOfIngridient}`;
                ingridients.push(`${meal[key]} - ${meal[meshureKey]}`);
            }
        }

        return {
            name: meal.strMeal,
            description: meal.strInstructions.slice(0, 450),
            moreDescription: meal.strInstructions.slice(450),
            thumb: meal.strMealThumb,
            ingridients,
            id: meal.idMeal
        };
    };
}

export default RecipesService;
