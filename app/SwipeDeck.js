import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import images from '../assets/images';
import { Asset, AppLoading } from 'expo';

const users = [
  {
    name: 'Alec Lorraine',
    fact: 'I Love Harry Potter',
    photo: images.alec,
  },
  {
    name: 'Austin Kevitch',
    fact: "I'm a straight white male",
    photo: images.austin,
  },
  {
    name: 'Cameron Ayers',
    fact: 'I love my mom',
    photo: images.cameron,
  },
  {
    name: 'David Duffee',
    fact: 'Truck yeah!',
    photo: images.duffee,
  },
  {
    name: 'Brandon Cavalier',
    fact: 'I would fuck Charlie Munger',
    photo: images.brandon,
  },
];

function cacheImages(images) {
  return images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });
}

class SwipeDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false, finished: false };
    this.swiper = React.createRef();
  }
  static navigationOptions = {
    tabBarVisible: false,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.hasSmiled && this.props.hasSmiled) {
      this.swipeRight();
    }
  }

  swipeRight = () => {
    this.swiper.current.swipeRight();
  };

  async _loadAssetsAsync() {
    await cacheImages([
      require('./assets/alec.jpg'),
      require('./assets/austin.jpg'),
      require('./assets/cameron.jpg'),
      require('./assets/duffee.jpg'),
      require('./assets/brandon.jpg'),
    ]);
  }

  renderCard = user => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{user.name}</Text>
        <Text> {user.fact} </Text>
        <Image source={user.photo} style={{ width: 200, height: 200 }} />
      </View>
    );
  };

  // onSwipeRight = index => {
  //   this.props.navigation.navigate('SmileCamera', { recipient: users[index] });
  // };

  onSwipedAll = () => {
    this.setState({ finished: true });
  };

  onSwiped = () => {
    if (this.props.hasSmiled) this.props.resetSmile();
  };

  render() {
    const { finished } = this.state;
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Swiper
          ref={this.swiper}
          cards={users}
          renderCard={this.renderCard}
          onSwipedRight={this.onSwipeRight}
          onSwipedAll={this.onSwipedAll}
          onSwiped={this.onSwiped}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize={3}
          showSecondCard={false}
          verticalSwipe={false}
        />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  fact: {
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: 'transparent',
  },
});

export default SwipeDeck;
