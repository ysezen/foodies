import classes from './meals-grid.module.css';
import MealItem from "@/components/meals/meal-item";

export default function MealsGrid({ meals }) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => <li key={meal.id}>
                <MealItem
                    title={meal.title}
                    image={meal.image}
                    summary={meal.summary}
                    creator={meal.creator}
                    slug={meal.slug}
                    id={meal.id}
                    guid={meal.guid}
                />
                {/*or*/}
                {/*<MealItem {...meal} />*/}

            </li>)}
        </ul>
    );
}