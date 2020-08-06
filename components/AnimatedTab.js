import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

class AnimatedTab extends React.Component {
    
  state = {
    active: 0,
    xEasy: 0,
    xMedium: 0,
    xHard: 0,
    translateX: new Animated.Value(0)
  };

  handleSlide = type => {
      let { active, xEasy, xMedium, xHard, translateX } = this.state;
      Animated.spring(translateX, {
          toValue: type,
          duration: 100
      }).start();
  };

  render() {
      let { xEasy, xMedium, xHard, translateX, active} = this.state;
      return(
        <View style={{flex: 1,}}>
            <View style={{
              width: '90%', 
              marginLeft: 'auto', 
              marginRight: 'auto',
              }}
              >
              <View style={{
                flexDirection:'row', 
                marginTop: 40,  
                height: 50, 
                borderRadius: 4,
                backgroundColor: '#EBEBEB',
                position:'relative'
                }}
                >
                <Animated.View style={{
                  position: 'absolute', 
                  width: '33.33%', 
                  height: '100%', 
                  top: 0, 
                  left: 0, 
                  backgroundColor: '#FFFFFF',
                  borderRadius: 4,
                  transform: [{
                      translateX
                  }]
                }}
                />
                <TouchableOpacity
                style={{
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  borderWidth: 1, 
                  borderColor: '#EBEBEB', 
                  borderRadius: 4,
                  borderRightWidth: 0, 
                  borderTopRightRadius: 0, 
                  borderBottomRightRadius: 0
                }}
                onLayout={event => this.setState({xEasy: event.nativeEvent.layout.x})}
                onPress={() => this.setState({active: 0}, () => this.handleSlide(xEasy))}
                >
                  <Text style={{color: active === 0 ? '#0099FF' : '#C2C2C2', fontWeight: 'bold', fontSize: 20}}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderWidth: 1, 
                  borderColor: '#EBEBEB', 
                  borderRadius: 4,
                  borderRightWidth: 0, 
                  borderTopRightRadius: 0, 
                  borderBottomRightRadius: 0,
                  borderLeftWidth: 0, 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0
                }}
                onLayout={event => this.setState({xMedium: event.nativeEvent.layout.x})}
                onPress={() => this.setState({active: 1}, () => this.handleSlide(xMedium))}
                >
                  <Text style={{color: active === 1 ? '#0099FF' : '#C2C2C2', fontWeight: 'bold', fontSize: 20}}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderWidth: 1, 
                  borderColor: '#EBEBEB', 
                  borderRadius: 4,
                  borderLeftWidth: 0, 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0
                }}
                onLayout={event => this.setState({xHard: event.nativeEvent.layout.x})}
                onPress={() => this.setState({active: 2}, () => this.handleSlide(xHard))}
                >
                  <Text style={{color: active === 2 ? '#0099FF' : '#C2C2C2', fontWeight: 'bold', fontSize: 20}}>Hard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
      )
  }
}

export default AnimatedTab;