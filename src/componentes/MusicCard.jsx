import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  componentDidMount() {
    const { favSongs } = this.props;
    this.favCheck(favSongs);
  }

  // marca as checkboxes das musicas favoritadas
  favCheck = (favSongs) => {
    this.setState({
      check: favSongs,
    });
  }

  // pega as mudanças no input, ao pegar a mudança executa a função "manageFavorite"
  handleChange = ({ target }, music) => {
    const { checked } = target;
    this.setState({
      check: checked,
      loading: true,
    }, () => this.manageFavorite(music));
  }

  // função que recebe a função "AddSong" contida no arquivo "FavoriteSongsAPI"
  manageFavorite = async (music) => {
    const { check } = this.state;
    if (check) {
      await addSong(music);
      this.setState({ loading: false });
    } else {
      await removeSong(music);
      this.setState({ loading: false });
    }
  }

  render() {
    const { musicPlayer, musicName, trackId, allTracks } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ musicPlayer } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          <input
            id={ trackId }
            type="checkbox"
            checked={ check }
            onChange={ (e) => this.handleChange(e, allTracks) }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
        {loading ? <p>Carregando...</p> : '' }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicPlayer: PropTypes.string.isRequired,
  allTracks: PropTypes.objectOf(PropTypes.any).isRequired,
  favSongs: PropTypes.bool.isRequired,
};
