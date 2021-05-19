import React from "react";

// This component implements the text editor.
// When there are some change on the text, a callback is sent to App.tsx with the text.

interface InputAreaProps {
    parentCallback(e: string): void
}

const InputArea = (props: InputAreaProps) => {
    const onChange: React.ChangeEventHandler < HTMLTextAreaElement > = (e) => {
        props.parentCallback(e.currentTarget.value)
    }
    return <textarea onChange={onChange}></textarea>
}

export default InputArea;