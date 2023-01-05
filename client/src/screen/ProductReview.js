import {Button, FlatList} from 'native-base';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
import CustomRatingBar from '../components/CustomRatingBar';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductReview = ({route}) => {
  const {product_id} = route.params;
  const [cus_id, setCus_id] = useState(null);
  const [review_comment, setReview_comment] = useState('');
  const [review, setReview] = useState(null);
  const [defaultRating1, setdefaultRating1] = useState(2);
  const [maxRating1, setmaxRating1] = useState([1, 2, 3, 4, 5]);
  AsyncStorage.getItem('cus_id').then(cus_id => {
    setCus_id(cus_id);
  });

  useEffect(() => {
    Axios.get(`${IP}/review/${product_id}`, {
      params: {
        cus_id: cus_id,
      },
    })
      .then(response => {
        setReview(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [review, cus_id, product_id]);

  const navigation = useNavigation();

  const addReview = useCallback(() => {
    Axios.post(`${IP}/review/${product_id}`, {
      product_id: product_id,
      review_comment: review_comment,
      review_rating: defaultRating1,
      review_status: 1,
      cus_id: cus_id,
    })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, [product_id, review_comment, defaultRating1, cus_id]);
  let data = [];
  if (review) {
    data = review.map((item, index) => {
      return {
        Id: item.review_id,
        Name: item.cus_name,
        Content: item.review_comment,
        avatarUrl: require('../../assets/images/avatar-1.jpg'),
        review_rating: item.review_rating,
        review_status: item.review_status,
      };
    });
  } else {
    data = [
      {
        Id: '1',
        Name: 'aa',
        Content: 'Chưa có đánh giá nào!',
        avatarUrl: require('../../assets/images/avatar-1.jpg'),
      },
    ];
  }

  return (
    <View>
      <Text style={styles.TextStyle}>Đánh giá</Text>
      <CustomRatingBar
        setdefaultRating1={setdefaultRating1}
        setmaxRating1={setmaxRating1}
      />
      <Text style={styles.TextStyle}>{defaultRating1 + '/ 5'}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginLeft: 10,
          marginRight: 10,
        }}
        placeholder="Viết đánh giá món ăn."
        value={review_comment}
        onChangeText={text => setReview_comment(text)}
      />
      <Button
        onPress={() => {
          addReview();
          setReview_comment('');
        }}
        style={{
          backgroundColor: Colors.primaryColor,
          width: '50%',
          marginLeft: 105,
          marginTop: 20,
          marginBottom: 20,
        }}>
        Đăng
      </Button>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Image
                resizeMode="contain"
                style={styles.avatar}
                source={item.avatarUrl}
              />
              <Text style={[styles.text, styles.name]}>{item.Name}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={{fontWeight: '900', color: Colors.goldenrod}}>
                Đã đánh giá {review && item.review_rating} sao
              </Text>
              <Text>
                <Text style={styles.text}>{item.Content}</Text>
              </Text>
              <Text style={[styles.text, styles.created]}>
                {item.DateCreated}
              </Text>
            </View>
          </View>
        )}
        style={{height: '55%'}}
      />
      <Button
        onPress={() =>
          navigation.replace('ProductDetails', {
            product_id,
          })
        }
        style={{
          backgroundColor: Colors.primaryColor,
          width: '50%',
          marginLeft: 105,
          marginTop: 20,
          // marginBottom: 20,
        }}>
        Trở về
      </Button>
    </View>
  );
};

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

export default ProductReview;
