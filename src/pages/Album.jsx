import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      album: [],
      artist: '',
      albumName: '',
      albumImg: '',
      favSongs: [],
      loadFav: false,
    };
  }

  componentDidMount() {
    this.getAlbumMusics();
  }

  componentDidUpdate() {
    this.getFavorites();
  }

  // Recebe a função "getFavoriteSongs" que pega os favoritos que estão no "localStorage".
  // O "loadFav" é uma barreira para impedir que a página carregue as músicas sem fazer a checagem das músicas favoritas
  // quando o "getFavorites" termina sua execução ele coloca "loadFav" como true.
  // No render foi colocado uma condição, que faz com que "loadFav" seja a tal barreira.
  getFavorites = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({
      favSongs,
      loadFav: true });
  }

  // Pega nome do artista, imagem do álbum, nome do álbum.
getAlbumMusics = async () => {
  this.setState({
    loading: true,
  });
  // esse match params eu demorei pra entender.
  // aparentemente vc passa o { match :} que contem (vou chamar de parametros) parametros, um deles é o { params : } que pega a chave/ valor passado pela URL como um objeto.
  // ou seja, quando fazemos o que esta abaixo, ele pega os números depois do "albuns/" da URL e define eles no ID, assim ele fica dinâmico.
  // Então pelo que eu entendi a url no app é "album/:id" porque esse ":id" é algum tipo de flag pro params interagir, talvez seja um dynamic segment como diz no link abaixo (vou procurar depois);
  // https://v5.reactrouter.com/web/api/match
  const { match: { params: { id } } } = this.props;
  const albumMusics = await getMusics(id);
  const getFrom = albumMusics[0];
  const artist = getFrom.artistName;
  const albumImg = getFrom.artworkUrl100;
  const albumName = getFrom.collectionName;
  // remover o index 1, ele não é uma música válida
  const album = albumMusics.filter((_remove0, i) => i !== 0);
  this.setState({
    loading: false,
    album,
    artist,
    albumName,
    albumImg,
  });
}

render() {
  const { loading, album, artist, albumName, albumImg, favSongs, loadFav } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      {(loading && <Loading />)}
      { loadFav && (
        <div>
          <h2 data-testid="artist-name">{ artist }</h2>
          <img src={ albumImg } alt={ albumName } />
          <h3 data-testid="album-name">{ albumName }</h3>
          {album
            .map((music, index) => (<MusicCard
              key={ index }
              musicPlayer={ music.previewUrl }
              musicName={ music.trackName }
              trackId={ music.trackId }
              favSongs={ favSongs.some((fs) => fs.trackId === music.trackId) }
              allTracks={ music }
            />))}
        </div>
      )}
    </div>);
}
}
export default Album;

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
