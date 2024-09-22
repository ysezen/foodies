import classes from './meals/loading.module.css';

export default function LoadingPage({tittle}) {
    return (
        <h1 className={classes.loading}>
            {tittle ?? 'Fetching meals...'}
        </h1>
    );
}

