import React, { HtmlHTMLAttributes, useRef } from 'react';
import styles from './TextAreaField.module.scss';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { InputHTMLAttributes } from 'react';


export interface TextAreaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    type: "text"
    value: string
    onValueChange: (value: string) => void
    iconFontAwesomePath?: string
    className?: string
    showArrow?: boolean
    iconColor?: string
    arrowColor?: string
    dropDownOpen?: boolean
    onFocus?: () => void
    onInputClick?: () => void
    onOutsideClick?: () => void
    extraOnValueChange?: (val: string) => void
    fieldStyle?: "modern" | "shadow"
    errorText?: string
    id?: string
    style?: React.CSSProperties
    inputType?: "input" | "textarea"
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {

    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (props.onOutsideClick) props.onOutsideClick()
    });

    const arrowExtraClass = props.dropDownOpen === true ? styles.input__main__arrow__container__open : "";

    //@ts-ignore
    const refHeight = ref?.current?.clientHeight

    return (
        <div style={props.style} ref={ref} className={`} ${props.className} ${styles.input}`} onClick={props.onInputClick}
        >
            <div className={`${styles.input__main}`}>
                {
                    props.iconFontAwesomePath !== undefined && <i className={`${props.iconFontAwesomePath} ${styles.input__main__icon}`} style={{ color: props.iconColor }}></i>
                }


                <textarea
                    //   style={{ minHeight: refHeight ? refHeight : undefined }}
                    {...props}
                    style={{ resize: "none" }}
                    id={props.id}

                    className={`${props.fieldStyle === "modern" ? styles.style__modern : ""}  ${styles.input__main__input} ${props.iconFontAwesomePath !== undefined && styles.input__main__input__icon} ${props.showArrow !== undefined && styles.input__main__input__arrow}`}
                    value={props.value}
                    onChange={(e) => {
                        props.onValueChange(e.currentTarget.value);
                        props.extraOnValueChange?.(e.currentTarget.value)
                    }}

                    onFocus={props.onFocus}
                />
                <label className={styles.input__main__label} htmlFor={props.id}>{props.placeholder}</label>
                {
                    props.showArrow !== undefined &&
                    <div className={`${styles.input__main__arrow__container}  ${arrowExtraClass}`}>
                        <i className={`fas fa-caret-down ${styles.input__main__arrow}`} style={{ color: props.iconColor }}></i>
                    </div>
                }

                {
                    props.maxLength && <span className={`text--small ${styles.input__counter}`}>{props.value.length}/{props.maxLength}</span>
                }

            </div>
            <div className={`text--small text-color-primary ${styles.input__error}`}>
                {props.errorText}
            </div>
        </div>
    )
}

export default TextAreaField;