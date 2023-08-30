import { useEffect, useRef, useState } from "react"
import axios from "axios"
function TodoList ({ isLogin }) {
    const [todolist, setTodolist] = useState([])
    const [todoStatus, setTodoStatus] = useState('new')
    const InputRef = useRef(null)

    const getTodoList = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APIPATH}todos`)
            setTodolist(res.data.data)
        } catch (error) {
            if (error.response.status === 400) alert('新增失敗')
            if (error.response.status === 401) alert('未提供 token')
            if (error.response.status === 403) alert('token 驗證失敗')
        }
    }
    
    useEffect(() => {
        if (isLogin) {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)todo\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            )
            if (token) {
                axios.defaults.headers.common['Authorization'] = token
            }
            getTodoList()
        }
    }, [isLogin])

    // add todo
    const [newTodo, setNewTodo] = useState({})
    const handlerInput = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }
    const addTodo = async () => {
        if (todoStatus === 'new') {
            try {
                const res = await axios.post(`${import.meta.env.VITE_APIPATH}todos`, newTodo)
                if (res.status === 201) { 
                    getTodoList()
                    InputRef.current.value = ""
                    alert('新增成功')
                }
            } catch (error) {
                if (error.response.status === 400) alert('新增失敗')
                if (error.response.status === 401) alert('未提供 token')
                if (error.response.status === 403) alert('token 驗證失敗')
            }
        } else if (todoStatus === 'edit') {
            try {
                const res = await axios.put(`${import.meta.env.VITE_APIPATH}todos/${newTodo.id}`, newTodo)
                if (res.status === 200) { 
                    getTodoList()
                    InputRef.current.value = ""
                    setTodoStatus('new')
                    alert('更新成功')
                }
            } catch (error) {
                if (error.response.status === 400) alert('更新失敗')
                if (error.response.status === 401) alert('未提供 token')
                if (error.response.status === 403) alert('token 驗證失敗')
            }
        }
    }

    // edit todo
    const EditTodo = (todo) => {
        setNewTodo(todo)
        InputRef.current.value = todo.content
        setTodoStatus('edit')
    }

    // delete todo
    const deleteTodo = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APIPATH}todos/${id}`)
            if (res.status === 200) { 
                getTodoList()
                alert('刪除成功')
            }
        } catch (error) {
            if (error.response.status === 400) alert('刪除失敗')
            if (error.response.status === 401) alert('未提供 token')
            if (error.response.status === 403) alert('token 驗證失敗')
        }
    }

    // toggle todo status
    const toggleStatus = async (id) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_APIPATH}todos/${id}/toggle`)
            if (res.status === 200) { 
                getTodoList()
                alert('狀態更新成功')
            }
        } catch (error) {
            if (error.response.status === 400) alert('狀態更新失敗')
            if (error.response.status === 401) alert('未提供 token')
            if (error.response.status === 403) alert('token 驗證失敗')
        }
    }

    return (
        <>
            <h2>待辦清單</h2>
            {
                isLogin ? 
                    <>
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="待辦事項" defaultValue={newTodo.content} onChange={handlerInput} name="content" ref={InputRef} />
                                <button className="btn btn-outline-primary" type="button" onClick={addTodo}>{ todoStatus === 'new' ? '新增待辦' : '編輯待辦' }</button>
                            </div>
                        </form>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="80%">待辦事項</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todolist.map((todo) => {
                                        return (
                                            <tr key={todo.id}>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id={todo.id} value={ todo.status } onChange={ () => toggleStatus(todo.id)} checked={ todo.status } />
                                                        <label className="form-check-label" htmlFor={todo.id}>
                                                            { todo.content }
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary me-2" onClick={() => EditTodo(todo)} >修改</button>
                                                    <button type="button" className="btn btn-outline-danger" disabled={todoStatus === 'edit'} onClick={() => deleteTodo(todo.id)}>刪除</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </> : 
                    <> <div className="alert alert-warning" role="alert">
                        請先登入
                    </div> </>
            }
            
        </>
    )
}

export default TodoList