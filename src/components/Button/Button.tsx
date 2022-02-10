import classes from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import styles from './Button.module.scss';


type ButtonColors = "white" | "primary"
const DefaultColor: ButtonColors = "primary";

type ButtonProps = PropsWithCustomBase<
    React.PropsWithChildren<{
        color?: ButtonColors
    }>
> & HtmlHTMLAttributes<HTMLButtonElement>

const Button = ({ children, color, className, onClick, style }: ButtonProps) => {

    return (
        <button
            onClick={onClick}
            style={style}
            className={classes("text", "text--medium", "text-color--white", "font__weight__primary--semi-bold",
                styles.button,
                styles[color ? color : DefaultColor],
                className
            )}>
            {children}
        </button>
    )
}

export default Button;