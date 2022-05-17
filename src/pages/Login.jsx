import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './CSS/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      isLogged: false,
      loading: false,
    };
  }

  // pega as mudanças no input
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // definindo que o username tem que ser maior que 3 caracteres
  btnDisabled = () => {
    const { username } = this.state;
    const minLength = 3;
    if (username.length < minLength) return true;
  }

  // cria o usuário usando a função "createUser" que esta na userAPI
  // ao clicar no botao a função "createUser" é executada definindo o name igual ao definido no "username".
btnCreateUser = async () => {
  const { username } = this.state;
  this.setState({ isLogged: false, loading: true },
    async () => {
      await createUser({ name: username });
      this.setState({ isLogged: true, loading: false });
    });
}

render() {
  const { username, loading, isLogged } = this.state;
  return (
    <main>
      <div data-testid="page-login">
        <h1 className="trybetunes">
          Trybe
          <span className="titleSpan">Tunes</span>
        </h1>
        <div className="container">
          <form className="loginBox">
            <h2>LOGIN</h2>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={ username }
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
            <button
              className="loginBtn"
              type="button"
              name="loginBtn"
              onClick={ this.btnCreateUser }
              disabled={ this.btnDisabled() }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
            { loading && <Loading /> }
            { isLogged && <Redirect to="/search" /> }
          </form>
        </div>
      </div>
    </main>

  );
}
}

export default Login;
