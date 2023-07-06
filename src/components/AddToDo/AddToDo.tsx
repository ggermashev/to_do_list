import React, {FC, useState} from 'react';
import styles from './AddToDo.module.scss'
import TextInput from "../TextInput/TextInput";
import Calendar from "react-calendar";
import Button from "../Button/Button";
import ModalWindow from "../ModalWindow/ModalWindow";
import {IToDo} from "../../types/types";

interface IAddToDo {
    onClose: () => void,
    onSubmit: (title: string, description: string, date: Date) => void,
    todo?: IToDo,
}

const AddToDo: FC<IAddToDo> = ({onClose, onSubmit, todo}) => {

    const [title, setTitle] = useState(todo?.title || "")
    const [description, setDescription] = useState(todo?.description || "")
    const [date, setDate] = useState(todo?.date ? new Date(todo.date) : new Date())

    return (
        <ModalWindow wrapClassName={styles.addToDo} onClose={onClose}>
            <TextInput title={"Название"} value={title} setValue={setTitle}/>
            <TextInput title={"Описание"} value={description} setValue={setDescription} multiline={true}/>
            <Calendar value={date} onChange={(v, e) => setDate(v as Date)}/>
            <Button onCLick={() => {
                onSubmit(title, description, date)
                setTitle("")
                setDescription("")
                setDate(new Date())
            }}>Добавить</Button>
        </ModalWindow>
    );
};

export default AddToDo;