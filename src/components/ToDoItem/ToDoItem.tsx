import React, {FC} from 'react';
import styles from './ToDoItem.module.scss'
import {IToDo} from "../../types/types";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckInput from "../CheckInput/CheckInput";

interface IToDoItem extends IToDo {
    setChecked: (val: boolean) => void
    onRemove: () => void,
    color?: string,
}

const ToDoItem: FC<IToDoItem> = ({id, title, description, date, completed, setChecked, onRemove, color}) => {
    return (
        <div className={styles.toDoItem} style={{backgroundColor: color || "white", }}>
            <div className={styles.row}>
                <span>
                    <CheckInput checked={completed} setChecked={setChecked}/>
                    <h3>{title}</h3>
                </span>
                <span>
                    <p className={styles.last}>{date}</p>
                    <DeleteIcon className={styles.deleteIcon} onClick={() => {onRemove()}}/>
                </span>
            </div>
            <div className={styles.content}>
                {description}
            </div>
        </div>
    );
};

export default ToDoItem;