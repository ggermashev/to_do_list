import React, {FC, useRef} from 'react';
import styles from './TextInput.module.scss'

interface ITextInput {
    className?: string,
    value: string,
    setValue: (val: string) => void,
    title: string,
    multiline?: boolean,
}

const TextInput: FC<ITextInput> = ({className = "", value, setValue, title, multiline = false}) => {

    const inputRef = useRef(null)

    return (
        <div className={`${styles.textInput} ${className}`}>
            <p>{title}</p>
            {!multiline
                ? <input value={value}
                         onChange={e => setValue(e.target.value)}/>
                : <textarea value={value} onChange={e => setValue(e.target.value)}/>
            }
        </div>
    );
};

export default TextInput;