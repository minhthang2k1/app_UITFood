import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from 'react-native';
import Colors from '../theme/Colors';

const CustomRatingBar = ({setdefaultRating1, setmaxRating1}) => {
  const startImgFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const startImgCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  return (
    <View style={styles.CustomRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={key}
            onPress={() => {
              setdefaultRating1(item);
              setdefaultRating(item);
              // console.log('defaultRating', defaultRating);
            }}>
            <Image
              style={styles.startImgStyle}
              source={
                item <= defaultRating
                  ? {uri: startImgFilled}
                  : {uri: startImgCorner}
              }></Image>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;

const styles = StyleSheet.create({
  CustomRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  startImgStyle: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 23,
  },

  container_main: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 1,
    flexDirection: 'row',
    backgroundColor: Colors.iconFillColor,
    borderRadius: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 120,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 12,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});
