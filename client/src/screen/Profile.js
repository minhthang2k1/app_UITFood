import {ScrollView, View, Heading} from 'native-base';
import React, {useState, useEffect, useCallback} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
import Button from '../components/Button';
// import Footer from '../components/Footer';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [cus_id, setCus_id] = useState(null);
  const [cus_email, setCus_email] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);

  AsyncStorage.getItem('cus_id').then(value => {
    setCus_id(value);
  });

  AsyncStorage.getItem('cus_email').then(value => {
    setCus_email(value);
  });

  useEffect(() => {
    Axios.get(`${IP}/profile`, {
      params: {
        cus_id: cus_id,
        cus_email: cus_email,
      },
    })
      .then(response => {
        setDataProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [cus_id, cus_email]);
  return (
    <View style={{flex: 1}}>
      <Heading fontSize="xl" p="4" pb="3">
        Thông tin cá nhân
      </Heading>
      <ScrollView style={styles.content}>
        <View style={styles.contentSection}>
          <View style={styles.TextContainer}>
            <Text style={{flex: 1}}>Mã KH</Text>
            <Text style={styles.TextRight}>
              {dataProfile && dataProfile.cus_id}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.TextContainer}>
            <Text style={{flex: 1}}>Họ Tên</Text>
            <Text style={styles.TextRight}>
              {dataProfile && dataProfile.cus_name}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.TextContainer}>
            <Text style={{flex: 1}}>Email</Text>
            <Text style={styles.TextRight}>
              {dataProfile && dataProfile.cus_email}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.TextContainer}>
            <Text style={{flex: 1}}>SĐT</Text>
            <Text style={styles.TextRight}>
              {dataProfile && dataProfile.cus_numphone}
            </Text>
          </View>
          {/* <View style={styles.divider} />
          <View style={styles.TextContainer}>
            <Text style={{flex: 1}}>Loại KH</Text>
            <Text style={styles.TextRight}>
              {dataProfile && dataProfile.cus_type}
            </Text>
          </View> */}
        </View>

        <Button
          title={'Sửa thông tin'}
          style={styles.marginButton}
          onPress={() => navigation.replace('EditAccount')}></Button>
        <Button
          title={'Đổi mật khẩu'}
          style={styles.marginButton}
          onPress={() => navigation.replace('ChangePassword')}></Button>
        <Button
          title={'Đăng xuất'}
          style={styles.marginButton}
          onPress={async () => {
            navigation.navigate('Login');
            await AsyncStorage.clear();
          }}></Button>
        <Button
          title={'Về trang chủ'}
          style={(styles.marginButton, {marginBottom: 50, marginTop: 20})}
          onPress={() => navigation.replace('HomeScreen')}></Button>
      </ScrollView>
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  BackButton: {
    backgroundColor: Colors.colorPrimary,
  },
  marginButton: {
    marginTop: 20,
  },
  Edit: {
    marginTop: 7,
    color: Colors.colorPrimary,
    marginRight: 10,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    borderColor: '#ddddddd',
    backgroundColor: '#ddddddd',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginHorizontal: 16,
    marginTop: 5,
  },
  content: {
    // marginBottom: 15,
    marginHorizontal: 15,
    height: '78%',
    paddingBottom: 32,
  },
  contentSection: {
    backgroundColor: Colors.graylight,
    borderRadius: 20,
    marginTop: 25,
  },
  TextRight: {
    flex: 1,
    fontWeight: '700',
    textAlign: 'right',
  },
  TextContainer: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 19,
  },
});
export default Profile;
