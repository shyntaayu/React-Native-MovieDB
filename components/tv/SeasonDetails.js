import React, { Component } from 'react';
import {View, Text, ScrollView } from 'react-native';

import BackgroundImage from '../common/BackgroundImage';
import ShowOverview from '../common/ShowOverview';
import EpisodeList from './EpisodeList';

import { Configuration } from '../../data/configuration';
import Constant from './../../utilities/constants';
import style from '../../styles/styles';

class SeasonDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      season: this.props.navigation.state.params.season
    }
  }

  componentDidMount() {
    const baseUrl = Constant.api_base_url;
    const apiKey = Constant.api_key;
    const {tvShowId, season : {season_number}} = this.props.navigation.state.params;
    const seasonAPI = `/tv/${tvShowId}/season/${season_number}`;

    const seasonUrl = `${baseUrl}${seasonAPI}?${apiKey}`;

    fetch(seasonUrl)
    .then((res) =>  res.json())
    .then((res) => {
      this.setState({
        season: res
      })
    }, (err) => {
      console.log('Error', err);
    })
  }

  render() {
    const { poster_path, air_date, episode_count, season_number, episodes = [] } = this.state.season;
    
    const baseUrl = Configuration['images']['secure_base_url'];
    const size = Configuration['images']['poster_sizes'][5]
    const bgImage = `${baseUrl}${size}/${poster_path}`;

    return (
      <View style={[{ flex: 1 }, style.screenBackgroundColor]}>
        <BackgroundImage uri={bgImage}/>
        <ScrollView>
          <View style={style.detailsContainer}>
            <Text style={[style.text, style.titleText]}>
                Season {season_number}
            </Text>
            <ShowOverview
                date={air_date || "Unknown"}
                episodes={episode_count || episodes.length}
              />

            <EpisodeList episodes={episodes} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SeasonDetails;


