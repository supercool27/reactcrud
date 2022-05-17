import React,{Component}  from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import Forecast from './Forecast';
class WeatherProject extends Component 
{
  state = {
    zip: '',
    forecast: {
      main: 'Clouds',
      description: 'few clouds',
      temp: 45.7,
    },
  }
  // getInitialState() {
  //   return {
  //     zip: '',
  //     forecast: {
  //       main: 'Clouds',
  //       description: 'few clouds',
  //       temp: 45.7,
  //     },
  //   };
  // }

  // _handleTextChange(event) {
  //   console.log(event.nativeEvent.text);
  //   this.setState({
  //     zip: event.nativeEvent.text,
  //   });
  // }

  _handleChange(text) 
  {
    console.log(text);
    this.setState({zip:text});
  }

  render() {
    const zip = this.state.zip;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>You input {this.state.zip}.</Text>
    
        <TextInput
          style={styles.input}
          returnKeyType="go"
          value='490021'
          onSubmitEditing={(text)=>this._handleChange(text)}
        />
          <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      </View>
    );
  }
};

export default WeatherProject;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40,
  },
});
