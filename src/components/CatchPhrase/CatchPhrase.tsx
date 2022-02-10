import styles from './CatchPhrase.module.scss';
import classes from 'classnames';
import Section from '../Section/Section';
import { PropsWithCustomBase } from '../../utils/sharedTypes';

type CatchPhraseProps = PropsWithCustomBase<{
    heading: string
    content: string
}>;

const CatchPhrase = ({ heading, content, className }: CatchPhraseProps) => {
    return (
        <Section className={classes(styles.phrase, className)}>
            <h3 className={classes("heading", "heading--primary", "font__weight__primary--bold", "u-text-center", styles.phrase__heading)}>{heading}</h3>
            <div className={classes("text", "text--medium", "font__weight__primary--regular", "u-text-center", styles.phrase__text)}>{content}</div>
        </Section>
    )
}

export default CatchPhrase;