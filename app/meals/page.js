import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { listMeals } from "@/app/meals/actions";
import { Suspense } from "react";
import LoadingPage from "@/app/loading-page";

export const metadata = {
    title: 'Delicious Meals',
    description: 'Browse the delicious meals shared by our community of food lovers.',
}

async function Meals() {
    const meals = await listMeals();
    return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself, It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<LoadingPage tittle='Meals is Cominggg...' />}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}