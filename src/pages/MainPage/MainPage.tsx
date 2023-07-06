import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.scss'
import Button from "../../components/Button/Button";

import toDoList from "../../store/ToDoList";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import TextInput from "../../components/TextInput/TextInput";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import {observer} from "mobx-react-lite";
import toDoItem from "../../components/ToDoItem/ToDoItem";

async function wait(ms: number) {
    await new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const MainPage = observer(() => {

    const [showModal, setShowModal] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())

    const [colors, setColors] = useState<string[]>([])

    const [mode, setMode] = useState("")

    useEffect( () => {

        toDoList.import()

    }, [])


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
                {toDoList.todos?.map((todo, i) =>
                    <ToDoItem
                        key={todo.id}
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
                    <Calendar value={date} onChange={(v, e) => setDate(v as Date)}/>
                    <Button
                        onCLick={() => {
                            toDoList.addToDoItem({title, description, date: date.toDateString(), completed: false, id: Math.round((Math.random() * 1e6))})
                            setShowModal(false)
                            setTitle("")
                            setDescription("")
                            setDate(new Date())
                        }}
                    >Добавить</Button>
                </ModalWindow>
            }
        </div>
    );
});

export default MainPage;