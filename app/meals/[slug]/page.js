import Image from "next/image";
import classes from './page.module.css';
import { notFound } from "next/navigation";
import environment from '@/environment';
import { getMealDetail } from "../actions";



export default async function MealDetailsPage({ params }) {
    const meal = await getMealDetail(params.slug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');


    return (<>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image
                    src={environment.getImagePath(meal.image)}
                    alt={meal.title} fill />
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>

        </main>
    </>

    );
}