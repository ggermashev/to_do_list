import React, {useState} from 'react';
import styles from './MainPage.module.scss'
import Button from "../../components/Button/Button";

import toDoList from "../../store/ToDoList";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import TextInput from "../../components/TextInput/TextInput";
import Calendar from "../../components/Calendar/Calendar";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import {observer} from "mobx-react-lite";
import toDoItem from "../../components/ToDoItem/ToDoItem";

const MainPage = observer(() => {

    const [showModal, setShowModal] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("05.06.2023")

    const [colors, setColors] = useState<string[]>([])

    const [mode, setMode] = useState("")

    return (
        <div className={styles.mainPage}>
            <div className={styles.menu}>
                <div className={styles.col}>
                    <Button onCLick={() => {
                        if (mode !== "even") {
                            setColors(Array.from(toDoList.todos.map((todo, i) => i % 2 !== 0 ? "lightgrey" : "white")))
                            setMode("even")
                        } else {
                            setColors([])
                            setMode("")
                        }
                    }}
                    >Выделить четные</Button>
                    <Button onCLick={() => {
                        if (mode !== 'odd') {
                            setColors(Array.from(toDoList.todos.map((todo, i) => i % 2 === 0 ? "lightgrey" : "white")))
                            setMode("odd")
                        } else {
                            setColors([])
                            setMode("")
                        }
                    }}>Выделить нечетные</Button>
                </div>
                <div className={styles.col}>
                    <Button onCLick={() => {
                        toDoList.removeFirst()
                    }}>Удалить первый</Button>
                    <Button onCLick={() => {
                        toDoList.removeLast()
                    }}>Удалить последний</Button>
                </div>
                <Button onCLick={() => {
                    toDoList.clearToDos()
                }}>Очистить</Button>
            </div>
            <Button onCLick={() => {
                setShowModal(true)
            }}>Добавить задачу</Button>
            <div className={styles.todos}>
                {toDoList.todos.map((todo, i) =>
                    <ToDoItem
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        date={todo.date}
                        completed={todo.completed}
                        setChecked={val => toDoList.completeToDoItem(todo)}
                        onRemove={() => {
                            toDoList.removeToDoItem(todo)
                        }}
                        color={colors[i]}
                    />
                )}
            </div>
            {showModal &&
                <ModalWindow wrapClassName={styles.addToDo} onClose={() => {
                    setShowModal(false)
                }}>
                    <TextInput title={"Название"} value={title} setValue={setTitle}/>
                    <TextInput title={"Описание"} value={description} setValue={setDescription} multiline={true}/>
                    <Calendar/>
                    <Button
                        onCLick={() => {
                            toDoList.addToDoItem({title, description, date, completed: false, id: Math.random()})
                            setShowModal(false)
                            setTitle("")
                            setDescription("")
                            setDate("")
                        }}
                    >Добавить</Button>
                </ModalWindow>
            }
        </div>
    );
});

export default MainPage;