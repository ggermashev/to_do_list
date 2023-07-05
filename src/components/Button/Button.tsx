import React, {FC} from 'react';
import styles from './Button.module.scss'

interface IButton {
    className?: string,
    children: React.ReactNode,
    onCLick: () => void,
}

const Button: FC<IButton> = ({className="", children, onCLick}) => {
    return (
        <button className={`${styles.btn} ${className}`} onClick={onCLick}>{children}</button>
    );
};

export default Button;