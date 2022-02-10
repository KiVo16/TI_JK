import { CSSProperties } from "react";

export type PropsWithCustomBase<P> = P & {
    style?: CSSProperties
    className?: string
}