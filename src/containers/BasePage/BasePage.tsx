import classes from 'classnames';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { PropsWithCustomBase } from '../../utils/sharedTypes';

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
}

type BasePageProps = PropsWithCustomBase<
    PropsWithChildren<{}>
>;

const BasePage = ({ className, children }: BasePageProps) => {
    return (
        <motion.main
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className={classes("content__center", "u-padding-top--large", "u-padding-layout-bottom--large", className)}
        >
            {children}
        </motion.main>
    )
}

export default BasePage;