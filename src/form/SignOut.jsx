import axios from "axios"

function SignOut ({ setIsLogin }) {
    const submit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APIPATH}users/sign_out`)
            if (res.status === 200) {
                alert('登出成功')
                setIsLogin(false)
                document.cookie = "todo=; expires= Thu, 21 Aug 2014 20:00:00 UTC"
            }
        } catch (error) {
            if (error.response.status === 400) alert('登出失敗')
            if (error.response.status === 401) alert('未提供 token')
            if (error.response.status === 403) alert('token 驗證失敗')
        }
    }
    return (
        <>
            <h2>登出</h2>
            <button className="btn btn-outline-primary" type="button" onClick={submit}>登出</button>
        </>
    )
}

export default SignOut