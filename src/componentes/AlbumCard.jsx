import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { albumName, artistName, albumImg, id } = this.props;
    return (
      <div className="albumCard">
        <h2>{ albumName }</h2>
        <h3>{ artistName }</h3>
        <img src={ albumImg } alt={ albumName } />
        <Link
          to={ `/album/${id}` }
          data-testid={ `link-to-album-${id}` }
        >
          Mais informações
        </Link>
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
