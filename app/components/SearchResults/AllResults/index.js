import React from 'react';
import artPlaceholder from '../../../../resources/media/art_placeholder.png';

import Card from '../../Card';
import PlaylistResults from '../PlaylistResults';
import TracksResults from '../TracksResults';

import styles from './styles.scss';
import { withTranslation } from 'react-i18next';

@withTranslation('search')
class AllResults extends React.Component {
  constructor(props) {
    super(props);
  }
  renderResults (collection, onClick) {
    return collection.slice(0, 5).map((el, i) => {
      return (
        <Card
          small
          header={el.title}
          image={el.thumb || artPlaceholder}
          onClick={() => onClick(el.id, el.type)}
          key={'item-' + i}
        />
      );
    });
  }

  renderTracks (arr = [], limit = 5) {
    return (<TracksResults
      clearQueue={this.props.clearQueue}
      addToQueue={this.props.addToQueue}
      startPlayback={this.props.startPlayback}
      selectSong={this.props.selectSong}
      tracks={arr}
      limit={limit}
      musicSources={this.props.musicSources}
    />);

  }

  renderPlaylistSection () {
    return (
      <div className={styles.column}>
        <h3>{this.props.t('playlist', { count: this.props.playlistSearchResults.length })}</h3>
        <div className={styles.row}>
          <PlaylistResults
            playlistSearchStarted={this.props.playlistSearchStarted}
            playlistSearchResults={this.props.playlistSearchResults}
            addToQueue={this.props.addToQueue}
            clearQueue={this.props.clearQueue}
            startPlayback={this.props.startPlayback}
            selectSong={this.props.selectSong}
            musicSources={this.props.musicSources}
          />
        </div>
      </div>);
  }

  renderSection (title, collection, onClick) {
    return (<div className={styles.column}>
      <h3>{title}</h3>
      <div className={styles.row}>
        {this.renderResults(
          collection,
          onClick
        )}
      </div>
    </div>);
  }

  renderArtistsSection () {
    const { t, artistSearchResults, artistInfoSearch } = this.props;

    return this.renderSection(t('artist', { count: artistSearchResults.length }), artistSearchResults, artistInfoSearch);
  }

  renderAlbumsSection () {
    const { t, albumSearchResults, albumInfoSearch } = this.props;

    return this.renderSection(t('album', { count: albumSearchResults.length }), albumSearchResults, albumInfoSearch);
  }

  renderTracksSection () {
    return (<div className={styles.column}>
      <h3>{this.props.t('track_plural')}</h3>
      <div className={styles.row}>
        {this.renderTracks(this.props.trackSearchResults.info)}
      </div>
    </div>);
  }

  render () {
    if (
      this.props.artistSearchResults.length <= 0 &&
      this.props.albumSearchResults.length <= 0 &&
      this.props.trackSearchResults.length <= 0
    ) {
      return <div>{this.props.t('empty')}</div>;
    }

    return (
      <div className={styles.all_results_container}>
        {this.renderArtistsSection()}
        {this.renderAlbumsSection()}
        {this.renderTracksSection()}
        {this.renderPlaylistSection()}
      </div>
    );
  }
}

export default AllResults;
