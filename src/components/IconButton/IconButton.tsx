
import styles from './IconButton.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import { InputHTMLAttributes } from 'react';

type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>

type IconButtonColors = "white" | "primary"
const DefaultColor: IconButtonColors = "primary";

export type IconButtonProps = PropsWithCustomBase<
    React.PropsWithChildren<{
        icon: IconType
        color?: IconButtonColors
        iconClassName?: string
        active?: boolean
        disabled?: boolean
        iconStyle?: React.CSSProperties
    }>
> & InputHTMLAttributes<HTMLButtonElement>


const IconButton = (props: IconButtonProps) => {
    return (
        <button
            className={classes(
                styles.i_button,
                styles[props.color ? props.color : DefaultColor],
                props.className
            )}
            style={props.style} onClick={props.onClick}>
            <props.icon style={props.iconStyle} className={classes(styles.i_button__icon, props.iconClassName)} />
            {props.children}
        </button>
    )
}

export default IconButton;