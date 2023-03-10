import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorLogin from '../../Components/ErrorLogin/ErrorLogin';
import AppContext from '../../Context/AppContext';
import NewOrderContext from '../../Context/NewOrderContext';
import ValidateEmail from '../../Middleware/ValidateEmail/ValidateEmail';
import { createNewUser, doLogin } from '../../Services/endpointsAPI';
import {
  setToLocalStorage,
} from '../../Services/localStorage';

const testId = 'common_register__element-invalid_register';
const messageError = 'Nome e/ou email já cadastrado';

export default function Register() {
  const { setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableRegisterButton, setDisableRegisterButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);

  const { setUserId } = useContext(NewOrderContext);
  const { setUserName } = useContext(NewOrderContext);

  const clickCadastrarButton = async () => {
    try {
      const user = await createNewUser(name, email, password);
      console.log(user);
      const login = await doLogin(email, password);
      setToLocalStorage('user', login);
      setUserData(login);
      setUserId(login.id);
      setUserName(login.name);
      navigate('/customer/products');
    } catch (error) {
      console.log(error.message);
      setErrorMessage(false);
    }
  };

  const handleChange = (target) => {
    const { id, value } = target;
    if (id === 'user-name') setName(value);
    if (id === 'user-email') setEmail(value);
    if (id === 'user-password') setPassword(value);
  };

  useEffect(() => {
    const validateFields = () => {
      const twelveNumber = 12;
      const sixNumber = 6;
      const validEmail = ValidateEmail(email);
      const validName = name.length >= twelveNumber;
      const validPassword = password.length >= sixNumber;
      return validEmail && validName && validPassword;
    };
    setDisableRegisterButton(validateFields());
    setErrorMessage(true);
  }, [name, email, password]);

  return (
    <main className="main-container">
      <h1>Cadastro</h1>
      <form className="form-container">
        <label className="labels" htmlFor="user-name">
          Nome
          <input
            type="text"
            id="user-name"
            placeholder="Seu nome completo"
            className="inputs"
            value={ name }
            onChange={ (e) => handleChange(e.target) }
            data-testid="common_register__input-name"
          />
        </label>
        <label className="labels" htmlFor="user-email">
          Email
          <input
            type="email"
            id="user-email"
            placeholder="seu-email@site.com.br"
            className="inputs"
            value={ email }
            onChange={ (e) => handleChange(e.target) }
            data-testid="common_register__input-email"
          />
        </label>
        <label className="labels" htmlFor="user-password">
          Senha
          <input
            type="password"
            id="user-password"
            placeholder="**********"
            className="inputs"
            value={ password }
            onChange={ (e) => handleChange(e.target) }
            data-testid="common_register__input-password"
          />
        </label>
        <button
          type="button"
          id="register-button"
          className={ disableRegisterButton ? 'true-button' : 'false-button' }
          disabled={ !disableRegisterButton }
          data-testid="common_register__button-register"
          onClick={ clickCadastrarButton }
        >
          CADASTRAR
        </button>
      </form>
      <div hidden={ errorMessage }>
        <ErrorLogin dataTestIdError={ testId } message={ messageError } />
      </div>
    </main>
  );
}
