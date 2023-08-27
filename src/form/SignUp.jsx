import { useState } from "react"
import axios from "axios"

function SignUp () {
    const [sigupData, setSignupData] = useState({
        email: '',
        password: '',
        nickname: ''
    })

    const handlerInput = (e) => {
        setSignupData({ ...sigupData, [e.target.name]: e.target.value})
    }

    const submit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APIPATH}users/sign_up`, sigupData)
            if (res.status === 201) alert('註冊成功')
            setSignupData({
                email: '',
                password: '',
                nickname: ''
            })
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <>
            <h2>註冊</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" required value={sigupData.email} onChange={handlerInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">密碼</label>
                    <input type="password" className="form-control" id="password" name="password" required value={sigupData.password} onChange={handlerInput}  autoComplete="on" />
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname" className="form-label">名稱</label>
                    <input type="text" className="form-control" id="nickname" name="nickname" required value={sigupData.nickname} onChange={handlerInput} />
                </div>
                <button type="button" className="btn btn-primary" onClick={submit}>註冊</button>
            </form>
        </>
    )
}

export default SignUp