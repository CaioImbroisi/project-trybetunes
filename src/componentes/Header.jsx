import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  // Montando o nome de usuário na tela
  componentDidMount() {
    this.renderHeader();
  }

  // Requisição para a API utilizando a função nativa da API "getUser" retornando o nome do usuário
  // Loading setado para falso quando a página é carregada com o nome de usuário.
    renderHeader = async () => {
      const { name } = await getUser();
      this.setState({ name, loading: false });
    }

    render() {
      const { name, loading } = this.state;
      return (
        <div data-testid="header-component">
          <h1 className="trybetunes">
            Trybe
            <span className="titleSpan">Tunes</span>
          </h1>
          { loading ? ''
            : (
              <h1 className="username" data-testid="header-user-name">
                Olá,
                { name }
              </h1>
            )}
          <div className="menu">
            <Link to="/search" data-testid="link-to-search">
              <nav> Search </nav>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <nav> Favorites </nav>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <nav> Profile </nav>
            </Link>
          </div>
        </div>
      );
    }
}

export default Header;
