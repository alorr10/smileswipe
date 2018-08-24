import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeDeck from './app/SwipeDeck';
import SmileCamera from './app/SmileCamera';
import { createBottomTabNavigator } from 'react-navigation';
export default class App extends React.Component {
  state = {
    recipient: null,
  };

  onSwipeRight = recipient => {
    this.setState({ recipient });
  };

  render() {
    const { recipient } = this.state;
    return <SmileCamera />;
  }
}
// export default createBottomTabNavigator({
//   SwipeDeck: SwipeDeck,
//   SmileCamera: SmileCamera,
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
