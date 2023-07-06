import React, {FC, useEffect, useState} from 'react';
import styles from './ToDoItem.module.scss'
import {IToDo} from "../../types/types";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckInput from "../CheckInput/CheckInput";
import gsap from "gsap"
import AddToDo from "../AddToDo/AddToDo";

interface IToDoItem {
    todo: IToDo
    setChecked: (val: boolean) => void
    onRemove: () => void,
    onUpdate: (title: string, description: string, date: Date) => void,
    color?: string,
}

const ToDoItem: FC<IToDoItem> = ({todo, setChecked, onRemove, onUpdate, color}) => {

    const [showModal, setShowModal] = useState(false)

    const tl = gsap.timeline()

    useEffect(() => {

        tl.to(`#to-do-item-${todo.id}`, {
            duration: 1,
            opacity: 1
        })

    }, [])

    return (
        <div id={`to-do-item-${todo.id}`} className={styles.toDoItem} style={{backgroundColor: color || "white",}}>
            <div className={styles.row}>
                <span>
                    <CheckInput checked={todo.completed} setChecked={setChecked}/>
                    <h3>{todo.title}</h3>
                    <EditIcon className={styles.icon} onClick={() => {
                        setShowModal(true)
                    }}/>
                </span>
                <span>
                    <p className={styles.last}>{todo.date}</p>
                    <DeleteIcon className={styles.icon} onClick={() => {
                        tl.to(`#to-do-item-${todo.id}`, {
                            duration: 0.2,
                            opacity: 0
                        }).then(() => {
                            onRemove()
                        })
                    }}/>
                </span>
            </div>
            <div className={styles.content}>
                {todo.description}
            </div>

            {showModal &&
                <AddToDo
                    onClose={() => {
                        setShowModal(false)
                    }}
                    onSubmit={(title, description, date) => {
                        onUpdate(title, description, date)
                        setShowModal(false)
                    }}
                    todo={todo}
                />
            }
        </div>
    );
};

export default ToDoItem;