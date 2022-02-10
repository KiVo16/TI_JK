import styles from './DurationIndicator.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import {ReactComponent as Icon} from '../../res/clock.svg';
import moment from 'moment';
import 'moment-duration-format';

type DurationIndicatorProps = PropsWithCustomBase<{
    duration: number
}>

const DurationIndicator = ({ className, duration }: DurationIndicatorProps) => {
    return (
        <div>
            <div className={classes(styles.time, className)}>
                <Icon className={classes(styles.time__icon)} />
                <div className={classes("text", "text--medium", "font__weight__primary--medium")}>{moment.duration(duration, "seconds").format("h[h] m[m]")}</div>
            </div>
        </div>
    )
}

export default DurationIndicator;