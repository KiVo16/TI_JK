import styles from './Hint.module.scss';
import classes from 'classnames';

const Hint = () => {
    return (
        <div className={classes(styles.hint)}>
            <div className={classes("text", "text--medium", "font__weight__primary--semi-bold", "u-margin-bottom-small")}>Wskazówka</div>
            <div className={classes("text", "text--medium", "font__weight__priamry--regular")}>Naciśnij na pasek usługi, aby wyświetlić szczegóły na jej temat</div>
        </div>
    )
}

export default Hint;