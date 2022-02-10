import { motion } from 'framer-motion';
import React, { useRef, useEffect, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
import { DefaultInputDropDownItemType, InputDispatchType, InputDropDownItemType, inputSetError, onInputClose, onInputOpen, onInputOpenClose, onInputSingleChange } from '../../reducers/InputFieldReducer';
import styles from './InputField.module.scss';


export interface InputFieldProps<T extends InputDropDownItemType> extends InputHTMLAttributes<HTMLInputElement> {
    value: string
    onValueChange?: (value: string) => void
    dispatch?: InputDispatchType<T>
    iconFontAwesomePath?: string
    className?: string
    showArrow?: boolean
    iconColor?: string
    arrowColor?: string
    dropDownOpen?: boolean
    onFocus?: () => void
    onInputClick?: () => void
    onOutsideClick?: () => void
    onBlur?: () => void
    extraOnValueChange?: (val: string) => void
    fieldStyle?: "modern" | "shadow"
    errorText?: string
    id?: string
    style?: React.CSSProperties
    labelClass?: string
    inputClass?: string
    hideLabel?: boolean
    mainClassName?: string
    hideRequiredIndicator?: boolean
    inputStyle?: React.CSSProperties
    inputChildren?: any
    onInvalid?: () => void
}

const InputField = <Z extends any, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(props: InputFieldProps<T>) => {

    const onOutsideClick = () => {
        if (props.onOutsideClick) props.onOutsideClick();
        else props.dispatch && onInputClose(props.dispatch);
    }

    const onFocus = () => {
        props.onFocus?.();
        if (props.dispatch) {
            if (props.errorText) inputSetError(undefined, props.dispatch);
            onInputOpen(props.dispatch);
        }
    }

    const onBlur = () => {

    /*    if (!inputRef.current?.checkValidity()) props.onInvalid?.();

    /*    props.onBlur?.();
        props.dispatch && onInputClose(props.dispatch);*/
    }

    const onInputClick = () => {
        props.onInputClick?.();
        //props.dispatch && onInputOpenClose(props.dispatch);
    }

    const onValueChange = (val: string) => {
        props.onValueChange?.(val);
        props.extraOnValueChange?.(val);

        if (props.dispatch) {
            //if (props.errorText) inputSetError(undefined, props.dispatch);
            onInputSingleChange(val, props.dispatch);
        }
    }

    const ref = useRef<HTMLDivElement>(null);
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const arrowExtraClass = props.dropDownOpen === true ? styles.input__main__arrow__container__open : "";
    const hints = props.dropDownOpen === false ? "" :
        <div className={`${styles.input__drop_down}`}>
            {
                props.children
            }
        </div>

    const onContainerClick = useCallback(
        (e: MouseEvent) => {
            if ((ref.current! as any) && !(ref.current! as any).contains(e.target)) onOutsideClick();
            else {
                inputRef.current?.focus();

            }
        },
        [ref.current],
    )
    const escapeListener = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onOutsideClick();
    }, [])

    useEffect(() => {
        // Attach the listeners on component mount.
        document.addEventListener('click', onContainerClick)
        document.addEventListener('keyup', escapeListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', onContainerClick)
            document.removeEventListener('keyup', escapeListener)
        }
    }, [])


    const mainRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!mainRef.current) return;
        const { clientWidth } = mainRef.current;

        if (clientWidth < 100) {
            mainRef.current.style.paddingLeft = "1px";
            mainRef.current.style.paddingRight = "1px";
        }

    }, [mainRef.current])

    return (
        <div style={props.style} ref={ref} className={`${props.className} ${styles.input}`} 
        >

            <div className={`${styles.input__main} ${props.mainClassName}  ${props.disabled ? styles.disabled : ""}  ${props.errorText ? styles.invalid : ""}`} ref={mainRef}  >
                {
                    props.iconFontAwesomePath !== undefined && <i className={`${props.iconFontAwesomePath} ${styles.input__main__icon}`} style={{ color: props.iconColor }}></i>
                }

                <div className={styles.children}>
                    {
                        props.inputChildren
                    }
                </div>

                <div style={{ position: "relative", flex: "1" }}>
                    <input

                        ref={inputRef}
                        type={props.type}
                        id={props.id}
                        className={`${styles.input__main__input}  ${props.fieldStyle === "modern" ? styles.style__modern : ""} 
  ${props.iconFontAwesomePath !== undefined && styles.input__main__input__icon} ${props.showArrow !== undefined && styles.input__main__input__arrow} ${props.inputClass} ${props.hideLabel ? styles.noLabel : ""}`}
                        value={props.value}
                        onChange={(e) => {
                            //e.persist();
                            onValueChange(e.currentTarget.value)
                        }}
                        placeholder={props.placeholder}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onClick={onInputClick}
                        style={props.inputStyle}
                        required={props.required}
                        pattern={props.pattern}
                        minLength={props.minLength}
                        maxLength={props.maxLength}
                        min={props.min}
                        max={props.max}
                        disabled={props.disabled}
                        multiple={props.multiple}

                    />


                    {props.fieldStyle === "modern" && (props.hideLabel === undefined || props.hideLabel === false) &&
                        <label className={`${styles.input__main__label} ${props.labelClass}`} htmlFor={props.id} >{props.placeholder} {(props.required && !props.hideRequiredIndicator) && <span className={`text-color-primary`}>*</span>}</label>}
                    {
                        props.showArrow !== undefined &&
                        <div className={`${styles.input__main__arrow__container}  ${arrowExtraClass}`}>
                            <i className={`fas fa-caret-down ${styles.input__main__arrow}`} style={{ color: props.iconColor }}></i>
                        </div>
                    }
                </div>

            </div>
            {
                props.errorText && <div className={`text--small text-color-primary ${styles.input__error}`}>
                    {props.errorText}
                </div>
            }
            {hints}
            {
                props.children
            }
        </div>
    )
}

export default InputField;