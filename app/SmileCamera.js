import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import SwipeDeck from './SwipeDeck';
export default class SmileCamera extends React.Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      hasSmiled: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onFacesDetected = face => {
    if (face.faces[0] && face.faces[0].smilingProbability > 0.9 && !this.state.hasSmiled) {
      this.setState({ hasSmiled: true });
    }
  };
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  flip = () =>
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });

  resetSmile = () => {
    this.setState({ hasSmiled: false });
  };

  // goBack = () => {
  //   this.props.navigation.navigate('SwipeDeck');
  // };

  render() {
    const { hasCameraPermission, hasSmiled } = this.state;
    // const { navigation } = this.props;
    // const recipient = navigation.getParam('recipient', { name: '', fact: '' });
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            type={this.state.type}
            onFacesDetected={this.onFacesDetected}
            onFaceDetectionError={this.onFaceDetectionError}
            faceDetectorSettings={{
              runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            faceDetectionLandmarks={FaceDetector.Constants.Landmarks.all}
            faceDetectionClassifications={FaceDetector.Constants.Classifications.all}
          >
            <View style={styles.cameraContainer}>
              <Text style={styles.name}>
                Make Alec smile {'\n'}
                {this.state.hasSmiled && '😄'}
              </Text>
              <TouchableOpacity style={styles.flip} onPress={this.flip}>
                <Text style={styles.flipText}> Flip </Text>
              </TouchableOpacity>
            </View>
            <Back onPress={this.goBack} />
            <SwipeDeck hasSmiled={hasSmiled} resetSmile={this.resetSmile} />
          </Camera>
        </View>
      );
    }
  }
}

const Back = ({ onPress }) => (
  <TouchableOpacity style={styles.backContainer} onPress={onPress}>
    <Text style={styles.back}> {'<'} </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  name: {
    marginTop: 100,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  flip: {
    alignItems: 'center',
    marginBottom: 100,
  },
  flipText: { fontSize: 18, marginBottom: 10, color: 'white' },

  backContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 40,
    left: 20,
  },

  back: {
    fontSize: 40,
    color: 'white',
  },
});
