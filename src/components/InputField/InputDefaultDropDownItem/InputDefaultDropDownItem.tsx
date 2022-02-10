import React from 'react';
import styles from './InputDefaultDropDownItem.module.scss';

type InputDefaultDropDownItemProps = {
    text: string
    onClick?: () => void
    style?: React.CSSProperties
}

const InputDefaultDropDownItem: React.FC<InputDefaultDropDownItemProps> = (props) => {
    return (
        <div className={styles.item} onClick={props.onClick} style={props.style}>
            <p className="text--normal">{props.text}</p>
        </div>
    )
}

export default InputDefaultDropDownItem;