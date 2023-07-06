import React, {FC, useEffect} from 'react';
import styles from './ToDoItem.module.scss'
import {IToDo} from "../../types/types";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckInput from "../CheckInput/CheckInput";
import gsap from "gsap"

interface IToDoItem extends IToDo {
    setChecked: (val: boolean) => void
    onRemove: () => void,
    color?: string,
}

const ToDoItem: FC<IToDoItem> = ({id, title, description, date, completed, setChecked, onRemove, color}) => {

    const tl = gsap.timeline()

    useEffect(() => {

        tl.to(`#to-do-item-${id}`, {
            duration: 1,
            opacity: 1
        })

    }, [])

    return (
        <div id={`to-do-item-${id}`} className={styles.toDoItem} style={{backgroundColor: color || "white",}}>
            <div className={styles.row}>
                <span>
                    <CheckInput checked={completed} setChecked={setChecked}/>
                    <h3>{title}</h3>
                </span>
                <span>
                    <p className={styles.last}>{date}</p>
                    <DeleteIcon className={styles.deleteIcon} onClick={() => {
                        tl.to(`#to-do-item-${id}`, {
                            duration: 0.2,
                            opacity: 0
                        }).then(() => {
                            onRemove()
                        })
                    }}/>
                </span>
            </div>
            <div className={styles.content}>
                {description}
            </div>
        </div>
    );
};

export default ToDoItem;