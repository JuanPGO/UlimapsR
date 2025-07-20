import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading } = useAuth();
    const navigate = useNavigate();

    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showSuccessToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showErrorToast('Por favor completa todos los campos');
            return;
        }

        try {
            const { success, error } = await signIn(email, password);
            
            if (success) {
                showSuccessToast('¡Inicio de sesión exitoso!');
                navigate('/crud');
            } else {
                showErrorToast(error || 'Error en la autenticación');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            showErrorToast('Error de conexión. Intenta de nuevo.');
        }
    };

    return (
        <div className="contenedor-bienvenida1">
            <div className="contenedor-interiorlogin1">
                <div className="contenedor-interiorlogin2">
                    <div className="escudo">
                        <img src="/assets/images/fotos/escudo.png" alt="Escudo Universidad Libre" />
                    </div>

                    <div className="login">
                        <ToastContainer />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    required
                                    disabled={loading}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@unilibre.edu.co"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    disabled={loading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Tu contraseña"
                                />
                            </div>

                            <div className="buttonDiv">
                                <button type="submit" disabled={loading}>
                                    <span>
                                        {loading ? 'Ingresando...' : 'Ingresar'}
                                    </span>
                                </button>
                            </div>
                            <p className="login-note">
                                <b>Nota:</b> Ingreso solo disponible para administradores
                            </p>
                        </form>
                    </div>

                    <div className="divOut">
                        <Link to="/" className="boton-out">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;