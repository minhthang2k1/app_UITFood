import React from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../theme/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({title}){
    const navigation = useNavigation();
    return(
      <View style={{flexDirection: 'row'}}>
        <View>
        <TouchableOpacity 
          style={styles.BackButton} 
          onPress = {() => navigation.replace('HomeScreen')}>
          <Icon size={30} name='angle-left'></Icon>
        </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.Title}>{title}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  BackButton:{
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.colorPrimary,
  },
  Title: {
    alignSelf:'center',
    marginTop: 7,
    fontWeight:"700",
    fontSize: 18,
  },
});