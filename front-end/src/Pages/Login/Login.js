import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../Context/AppContext';
import NewOrderContext from '../../Context/NewOrderContext';
import Logo from '../../images/rockGlass.svg';
import ErrorLogin from '../../Components/ErrorLogin/ErrorLogin';
import ValidateEmail from '../../Middleware/ValidateEmail/ValidateEmail';
import { doLogin } from '../../Services/endpointsAPI';

import {
  setToLocalStorage,
  getItemFromLocalStorage,
} from '../../Services/localStorage';

function Login() {
  const messageError = 'Login e/ou senha inválidos';
  const testId = 'common_login__element-invalid-email';
  const testIdEmail = 'common_login__input-email';
  const IvalidPassword = 'common_login__input-password';
  const testIdBtnLogin = 'common_login__button-login';
  const testIdBtnRegister = 'common_login__button-register';

  const navigate = useNavigate();

  const { setUserData, userData } = useContext(UserContext);
  const { setUserId } = useContext(NewOrderContext);
  const { setUserName } = useContext(NewOrderContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);

  useEffect(() => {
    const redirectByRole = (role) => {
      if (role === 'customer') { return navigate('/customer/products'); }
      if (role === 'seller') { return navigate('/seller/orders'); }
      if (role === 'administrator') { return navigate('/admin/manage'); }
    };
    if (userData !== undefined) {
      return redirectByRole(userData.role);
    }
    const getUserDataFromLocalStorage = async () => {
      const userInfo = await getItemFromLocalStorage('user');
      if (userInfo !== undefined) {
        const login = await doLogin(userInfo);
        setUserData(login);
        setUserId(login.id);
        setUserName(login.name);
        return redirectByRole(userInfo.role);
      }
    };
    if (userData !== undefined) {
      getUserDataFromLocalStorage();
    }
  }, [navigate, setUserData, setUserId, setUserName, userData]);

  const clickLoginButton = async () => {
    try {
      const login = await doLogin(email, password);
      setToLocalStorage('user', login);
      setUserData(login);
      setUserId(login.id);
      setUserName(login.name);
      setErrorMessage(true);
    } catch (error) {
      setErrorMessage(false);
    }
  };

  useEffect(() => {
    const validateFields = () => {
      const sixDigits = 6;
      const validEmail = ValidateEmail(email);
      const resultButton = password.length >= sixDigits && validEmail;
      setLoginButton(resultButton);
    };
    validateFields();
  }, [email, password]);

  const renderForm = () => (
    <form className="form-container">
      <label className="labels" htmlFor="login">
        Login
        <input
          data-testid={ testIdEmail }
          className="inputs"
          type="email"
          id="email"
          placeholder="email@trybeer.com.br"
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </label>
      <label className="labels" htmlFor="senha">
        Senha
        <input
          data-testid={ IvalidPassword }
          className="inputs"
          type="password"
          id="senha"
          placeholder="*********"
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </label>
      <button
        className={ loginButton ? 'true-button' : 'false-button' }
        disabled={ !loginButton }
        onClick={ clickLoginButton }
        data-testid={ testIdBtnLogin }
        type="button"
      >
        LOGIN
      </button>
      <Link to="/register">
        <button
          data-testid={ testIdBtnRegister }
          className="register-button"
          type="button"
        >
          Ainda não tenho conta
        </button>
      </Link>
    </form>
  );

  return (
    <main className="main-container">
      <div className="logo-container">
        <img className="logo-img" src={ Logo } alt="logo" />
      </div>
      { renderForm() }
      <div hidden={ errorMessage }>
        <ErrorLogin dataTestIdError={ testId } message={ messageError } />
      </div>
    </main>
  );
}

export default Login;
