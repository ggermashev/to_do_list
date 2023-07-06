import React, {FC, useEffect, useRef} from 'react';
import styles from './ModalWindow.module.scss'
import {createPortal} from "react-dom";


interface IModalWindow {
    wrapClassName?: string,
    children: React.ReactNode,
    onClose: () => void,
}

const ModalWindow: FC<IModalWindow> = ({wrapClassName = "", children, onClose}) => {

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                onClose()
            }
        })

        return () => {
            document.removeEventListener('keydown', (e) => {
                if (e.code === 'Escape') {
                    onClose()
                }
            })
        }
    })

    return (
        createPortal(
            <div className={`${styles.modalWindow}`}
                 onClick={onClose}
            >
                <div
                    className={`${styles.wrap} ${wrapClassName}`}
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>, document.body)
    );
};

export default ModalWindow;