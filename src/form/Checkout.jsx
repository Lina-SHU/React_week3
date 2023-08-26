
import { useState } from "react"
import axios from "axios"
function Checkout () {
    const [tokenInput, setTokenInput] = useState('')

    const handlerInput = (e) => {
        setTokenInput(e.target.value)
    }

    const CheckoutBtn = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APIPATH}users/checkout`, {
                headers: { Authorization: tokenInput }
            })
            if (res.status === 200) alert('Token 有效')
            setTokenInput('')
        } catch (error) {
            if (error.response.status === 400) alert('Token 無效')
            if (error.response.status === 401) alert('未提供 token')
            if (error.response.status === 403) alert('token 驗證失敗')
        }
    }
    return (
        <>
            <h2>驗證</h2>
            <form>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Token" value={tokenInput} onChange={handlerInput} />
                    <button className="btn btn-outline-primary" type="button" onClick={CheckoutBtn}>驗證 Token</button>
                </div>
            </form>
        </>
    )
}

export default Checkout