import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';
import environment from '@/environment';

export default function MealItem({ title, image, summary, creator, slug, id, guid }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image
                        src={environment.getImagePath(image)}
                        alt={title}
                        placeholder='empty' // | "empty" | "blur" | "data:image/..."
                        fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${guid}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}