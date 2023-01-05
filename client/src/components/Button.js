import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import Colors from '../theme/Colors';
const Button = props => {
  return (
    <View>
      {props.loading ? (
        <View
          style={[
            styles.buttonStyle,
            {
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
              paddingBottom: 16,
            },
            props.style,
          ]}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.buttonStyle, props.style]}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.colorPrimary,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    // textTransform: 'uppercase',
  },
});

export default Button;
