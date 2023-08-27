import { useState } from "react"
import axios from "axios"

function SignIn ({ setIsLogin }) {
    const [signinData, setSigninData] = useState({
        email: '',
        password: ''
    })

    const handlerInput = (e) => {
        setSigninData({ ...signinData, [e.target.name]: e.target.value})
    }

    const submit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APIPATH}users/sign_in`, signinData)
            if (res.status === 200) alert('登入成功')
            document.cookie =`todo=${res.data.token}; path=/;`;
            setIsLogin(true)
            setSigninData({
                email: '',
                password: ''
            })
        } catch (error) {
            if (error.response.status === 400) alert('欄位驗證失敗')
            if (error.response.status === 401) alert('帳號密碼驗證錯誤')
            if (error.response.status === 404) alert('用戶不存在')
        }
    }
    return (
        <>
            <h2>登入</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="signinemail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="signinemail" placeholder="name@example.com" name="email" required value={signinData.email} onChange={handlerInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="signinpassword" className="form-label">密碼</label>
                    <input type="password" className="form-control" id="signinpassword" name="password" required value={signinData.password} onChange={handlerInput}  autoComplete="on" />
                </div>
                <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
            </form>
        </>
    )
}

export default SignIn