import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class PrintSearch extends React.Component {
  render() {
    const { searchArray, artist } = this.props;
    return (
      searchArray.length <= 0 ? <h2>Nenhum álbum foi encontrado</h2> : (
        <section>
          <h2>
            Resultado de álbuns de:&nbsp;
            { artist }
          </h2>
          {searchArray
            .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
              <AlbumCard
                key={ collectionId }
                id={ collectionId }
                artistName={ artistName }
                albumName={ collectionName }
                albumImg={ artworkUrl100 }
              />
            ))}
        </section>
      )
    );
  }
}

export default PrintSearch;

PrintSearch.propTypes = {
  searchArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};
