import { AnimatePresence, motion, Variant } from 'framer-motion';
import React, { useEffect } from 'react';
import { ReactComponent as CrossIcon } from '../../res/cross-sign.svg';
import styles from './Modal.module.scss';


type SingleModalVariants = {
    initial: Variant
    animate: Variant
    exit: Variant
}

interface ModalVariants {
    background: SingleModalVariants
    content: SingleModalVariants
}




const animation: { [key: string]: ModalVariants } = {
    fadeIn: {
        background: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        content: {
            initial: { opacity: 0, y: "-2rem" },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: "2rem" }
        },
    },
    slideUp: {
        background: {
            initial: { opacity: 0, y: 0 },
            animate: {
                opacity: 1, y: 0,
                transition: {
                    type: "tween",
                    duration: .35,
                    ease: "easeInOut",
                },
            },
            exit: {
                opacity: 0,
                transition: {
                    type: "tween",
                    duration: .1,
                    ease: "easeInOut",
                },
            },

        },
        content: {
            initial: { y: "100vh" },
            animate: {
                y: 0,
                transition: {
                    type: "tween",
                    duration: .35,
                    ease: "easeInOut",
                },
            },
            exit: {
                y: "100vh",
                transition: {
                    type: "tween",
                    duration: .1,
                    ease: "easeInOut",
                },
            },

        },
    },
    slideRight: {
        background: {
            initial: { opacity: 0, x: 0 },
            animate: {
                opacity: 1, x: 0,
                transition: {
                    type: "tween",
                    duration: .35,
                    ease: "easeInOut",
                },
            },
            exit: {
                opacity: 0,
                transition: {
                    type: "tween",
                    duration: .1,
                    ease: "easeInOut",
                },
            },

        },
        content: {
            initial: { x: "100vw" },
            animate: {
                x: 0,
                transition: {
                    type: "tween",
                    duration: .35,
                    ease: "easeInOut",
                },
            },
            exit: {
                x: "100vw",
                transition: {
                    type: "tween",
                    duration: .1,
                    ease: "easeInOut",
                },
            },

        },
    }
}

export type ModalProps = {
    onClose: () => void
    open: boolean
    title?: any
    className?: string
    style?: React.CSSProperties
    titleClassName?: string
    contentClassName?: string
    animation?: "fadeIn" | "slideUp" | "slideRight"
}

const Modal: React.FC<ModalProps> = (props) => {

    useEffect(() => {
        if (props.open) {
            document.body.style.overflowY = 'hidden';
            document.body.style.marginRight = "6px";
        } else {
            document.body.style.overflowY = "scroll";
            document.body.style.marginRight = "0px";
        }

    }, [props.open])

    const anim = props.animation ? props.animation : "fadeIn"

    return (
        <AnimatePresence exitBeforeEnter>
            {
                props.open &&
                <motion.div
                    initial="initial" exit="exit" animate="animate"
                    className={`${props.className} ${styles.modal} `} style={props.style}>
                    <motion.div variants={animation[anim].background} className={styles.modal__bg} onClick={props.onClose}></motion.div>
                    <motion.div variants={animation[anim].content} className={`${styles.content} ${props.contentClassName}`}>
                        <div className={styles.content__header}>
                            <div className={`${styles.content__header__title} ${props.titleClassName}`}>{props.title}</div>
                            <div className={styles.content__header__exit} onClick={props.onClose}>
                                <CrossIcon className={styles.content__header__exit__icon} />

                            </div>
                        </div>
                        {props.children}
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Modal;