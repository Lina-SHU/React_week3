import SignUp from "./form/SignUp"
import SignIn from "./form/SignIn"
import Checkout from "./form/Checkout"
import SignOut from "./form/SignOut"
import TodoList from "./form/TodoList"
import { useEffect, useState } from "react"
import axios from "axios"

function Form () {
    const [isLogin, setIsLogin] = useState(false)

    // 是否登入過
    useEffect(() => {
        (() => {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)todo\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            )
            if (token) {
                axios.defaults.headers.common['Authorization'] = token
                setIsLogin(true)
            }
        })()
    }, [])
    
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <SignUp />
                    </div>
                    <div className="col-6 mt-5">
                        <SignIn setIsLogin={setIsLogin} />
                    </div>
                    <div className="col-6 mt-5">
                        <Checkout />
                    </div>
                    <div className="col-6 mt-5">
                        <SignOut setIsLogin={setIsLogin} />
                    </div>
                </div>
                <div className="mt-5">
                    <TodoList isLogin={isLogin} />
                </div>
            </div>
        </>
    )
}

export default Form