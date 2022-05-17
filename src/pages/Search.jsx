import React from 'react';
import Header from '../componentes/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import PrintSearch from '../componentes/PrintSearch';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      loading: false,
      artistName: '',
      artistAlbuns: [],
    };
  }

  // pega as mudanças no input
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // desativa o botão até que se tenha mais de 2 caracteres digitados
  btnDisabled = () => {
    const { searchBar } = this.state;
    const minLength = 2;
    if (searchBar.length < minLength) return true;
  }

  // Dá função ao botão de busca, ele pega os dados da API e depois seta os status de acordo com o esperado
  btnSearch = async () => {
    this.setState({
      loading: true,
    });
    const { searchBar } = this.state;
    const searchResult = await searchAlbumsAPI(searchBar);
    this.setState({
      artistAlbuns: searchResult,
      searchBar: '',
      loading: false,
      artistName: searchBar,
    });
  }

  render() {
    const { searchBar, loading, artistAlbuns, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="searchContainer">
          <input
            className="musicSearch"
            name="searchBar"
            value={ searchBar }
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            className="searchButton"
            type="button"
            disabled={ this.btnDisabled() }
            data-testid="search-artist-button"
            onClick={ this.btnSearch }
          >
            Pesquisar
          </button>
        </div>
        <div>
          {loading ? <Loading />
            : <PrintSearch searchArray={ artistAlbuns } artist={ artistName } />}
        </div>
      </div>
    );
  }
}
export default Search;
