import React from 'react';
import {StatusBar} from 'react-native';
import Colors from '../theme/Colors';

const AppStatusBar = props => {
  return (
    <StatusBar
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : Colors.primaryColor
      }
      barStyle={props.barStyle ? props.barStyle : 'default'}
      translucent={props.translucent ? true : false}
    />
  );
};

export default AppStatusBar;
