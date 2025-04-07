import styles from './Favorites.module.scss';

interface Favorites {
    [key:string]: Favorite;
}

interface Favorite {
    volume: number;
    ratio: number;
    brew: number;
}

function Favorites(props:any) {
    return (
        <aside className={styles.aside}>
            <button onClick={() => {props.use_favorite('simple')}}>Simple</button>
            <button onClick={() => {props.use_favorite('brown')}}>Alton Brown</button>
        </aside>
    )
}

export default Favorites