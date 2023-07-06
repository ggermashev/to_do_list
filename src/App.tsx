import React, {useEffect} from 'react';
import styles from './App.module.scss'
import MainPage from "./pages/MainPage/MainPage";

function App() {

    return (
        <div className={styles.app}>
            <MainPage/>
        </div>
    );
}

export default App;
