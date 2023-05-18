import React from "react";


const ToDoList = (props) => {

    return (
        <>
            <div className="list_items">
                <button className="button_todo_del"
                    onClick={
                        () => {
                            props.fn(props.id)
                        }
                }>x</button>
                <li className="list_item">
                    {
                    props.text
                }</li>
            </div>

        </>
    );
}

export default ToDoList;
