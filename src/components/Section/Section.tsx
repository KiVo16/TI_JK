import styles from './Section.module.scss';
import classes from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithCustomBase } from '../../utils/sharedTypes';

type Modes = "card" | "blank"
const DefaultMode: Modes = "blank";

type SectionProps = PropsWithCustomBase<
    PropsWithChildren<{
        mode?: Modes
    }>
>

const Section = ({ mode, children, className, style }: SectionProps) => {
    return (
        <section className={classes(styles.section, styles[mode ? mode : DefaultMode], className)} style={style}>{children}</section>
    )
}

export default Section;                    