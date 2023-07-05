import React, {FC} from 'react';
import styles from './CheckInput.module.scss'

interface ICheckInput {
    className?: string,
    label?: string,
    checked: boolean,
    setChecked: (val: boolean) => void
}

const CheckInput: FC<ICheckInput> = ({className="", label, checked, setChecked}) => {
    return (
        <div className={styles.checkInput}>
            <input type={"checkbox"} checked={checked} onChange={e => setChecked(e.target.checked)}/>
        </div>
    );
};

export default CheckInput;