import React, {useEffect, useState} from "react";
import ToDoList from "./ToDoList";
import {useNavigate} from 'react-router-dom';
const Todo = () => {
    const navigate = useNavigate();
    const callTodo = async () => {
        try {
            const res = await fetch('/Todo', {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            // console.log(data);
            if (! res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log("error here")
            navigate("/Login");
        }
    }
    useEffect(() => {
        callTodo();
        // eslint-disable-next-line
    }, []);


    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState();
    const addItem = () => {
        setItemList((preVal) => {
            return [
                ...preVal,
                item
            ];
        });
        setItem("");
    }
    const newItem = (e) => {
        setItem(e.target.value);
    }

    const deleteItem = (id) => {
        setItemList((preVal) => {
            return preVal.filter((arrEl, index) => {
                return index !== id;
            })
        });
    }

    const [uList, setUList] = useState([]);

    const SaveList = async () => {
        const response = await fetch('./MyList', {
            method: 'POST',
            body: JSON.stringify(itemList),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        setUList(data.userList);
    }

    return (
        <>
            <div className="main_div_todo">
                <div className="centre_div_todo">
                    <br/>
                    <h1 className="h1_todo">ToDo List</h1>
                    <div className="row_2">
                        <input className="input_todo" type="text"
                            value={item}
                            onChange={newItem}
                            placeholder="Enter here!"/>
                        <button onClick={addItem}
                            className="button_todo_add">
                            +
                        </button>
                    </div>

                    <ol> {
                        itemList.map((val, index) => {
                            return <ToDoList key={index}
                                id={index}
                                text={val}
                                fn={deleteItem}/>;
                        })
                    } </ol>
                    <button onClick={SaveList}
                        className="button_todo_save">Save</button>
                </div>
                <br/>
                <p>{uList}</p>
            </div>
        </>
    );
}

export default Todo;
