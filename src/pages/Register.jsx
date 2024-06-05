import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccsess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccsess) {
            navigate('/login')
        }

        dispatch(reset())
    }, [user, isError, isSuccsess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            toast.error('Los passwords no coinciden, favor de verificarlo')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h4><FaUser />Registrar</h4>
            <p>Por favor, crea una cuenta</p>
        </section>
        <section className="form">
            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Nombre"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={password2}
                        placeholder="Confirmar Password"
                        onChange={onChange}
                    />
                </div><div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-block"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register