import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../theme/Colors';
import {Heading} from 'native-base';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = () => {
  const [cus_id, setCus_id] = useState(0);
  const [dataProfile, setProfile] = useState([]);
  const [currentPassWord, setCurrentPassWord] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setRenewPassword] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('cus_id')
      .then(value => {
        setCus_id(value);
      })
      .then(res => {
        //do something else
      });
    Axios.get(`${IP}/profile_by_id`, {
      params: {
        cus_id: cus_id,
      },
    })
      .then(response => {
        setProfile(response.data.result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [cus_id]);
  let cussPass = dataProfile.map((item, key) => {
    return {
      Id: key,
      cus_pass: item.cus_pass,
    };
  });
  //function change password
  function ChangePassword() {
    if (currentPassWord === cussPass[0].cus_pass) {
      if (newPassword === renewPassword) {
        Axios.put(`${IP}/change_password`, {
          cus_id: cus_id,
          cus_pass: newPassword,
        })
          .then(response => {
            console.log(response);
            Alert.alert('Thông báo', 'Đổi mật khẩu thành công');
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Alert.alert('Thông báo', 'Mật khẩu mới không trùng khớp');
      }
    } else {
      Alert.alert('Thông báo', 'Mật khẩu hiện tại không đúng');
    }
  }

  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal: 15}}>
      <Heading fontSize="xl" p="4" pb="3">
        Đổi mật khẩu
      </Heading>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.contentSection}>
          <View style={styles.ContentContainer}>
            <View>
              <Text style={styles.Text}>Current Password</Text>
              <TextInput
                style={styles.Input}
                secureTextEntry={true}
                onChangeText={text => {
                  setCurrentPassWord(text);
                }}
              />
            </View>
            <View>
              <Text style={styles.Text}>New Password</Text>
              <TextInput
                style={styles.Input}
                secureTextEntry={true}
                onChangeText={text => {
                  setNewPassword(text);
                }}
              />
            </View>
            <View>
              <Text style={styles.Text}>Retype New Password</Text>
              <TextInput
                style={styles.Input}
                secureTextEntry={true}
                onChangeText={text => {
                  setRenewPassword(text);
                }}
              />
            </View>
          </View>
        </View>
        <Button
          title={'Sửa'}
          style={styles.marginButton}
          onPress={() => {
            ChangePassword();
          }}></Button>
        <Button
          title={'Về trang chủ'}
          style={styles.marginButton}
          onPress={() => navigation.replace('HomeScreen')}></Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentSection: {
    backgroundColor: Colors.graylight,
    marginTop: 25,
    borderRadius: 20,
  },
  marginButton: {
    marginTop: 20,
    // marginBottom: 50,
    width: '90%',
    marginLeft: '5%',
  },
  Input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 15,
    marginTop: 5,
  },
  content: {
    paddingBottom: 35,
  },
  ContentContainer: {
    marginHorizontal: 25,
    marginVertical: 19,
  },
  Text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
  },
});

export default ChangePassword;
