import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../theme/Colors';
import {Heading} from 'native-base';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import CusTomPicker from '../components/CusTomPicker';
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAccount = () => {
  const navigation = useNavigation();
  const [cus_id, setCus_id] = useState(0);
  const [dataProfile, setProfile] = useState([]);

  const [cusName, setCusName] = useState('');
  const [cusNumPhone, setCusNumPhone] = useState('');
  const [cusEmail, setCusEmail] = useState('');
  const [cusBirthDay, setCusBirthDay] = useState('');
  const [selectedGender, setSelectedGender] = useState();
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
        cus_id: cus_id[0],
      },
    })
      .then(response => {
        setProfile(response.data.result);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [cus_id]);
  let data = dataProfile.map((item, key) => {
    return {
      Id: key,
      cus_id: item.cus_id,
      cus_name: item.cus_name,
      cus_email: item.cus_email,
      cus_numphone: item.cus_numphone,
      cus_birthday: new Date(item.cus_birthday).toLocaleDateString(),
      cus_gender: item.cus_gender,
    };
  });

  //Update Profile
  function UpdateProfile() {
    Axios.put(`${IP}/profile`, {
      cus_id: cus_id[0],
      cus_name: cusName,
      cus_numphone: cusNumPhone,
      cus_email: cusEmail,
      cus_birthday: cusBirthDay,
      cus_gender: selectedGender,
    })
      .then(response => {
        //console.log(response.data);
        Alert.alert('Thông báo', 'Lưu thành công');
      })
      .catch(error => {
        //console.log(error);
      });
  }
  return (
    <View style={{marginHorizontal: 15}}>
      <Heading fontSize="xl" p="4" pb="3">
        Sửa thông tin cá nhân
      </Heading>
      <ScrollView contentContainerStyle={styles.content}>
        {data.map((item, key) => {
          return (
            <View style={styles.contentSection} key={item.cus_id}>
              <View style={styles.ContentContainer}>
                <View>
                  <Text style={styles.Text}>Full Name</Text>
                  <TextInput
                    style={styles.Input}
                    value={cusName}
                    placeholder={item.cus_name}
                    onChangeText={text => {
                      setCusName(text);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.Text}>Phone Number</Text>
                  <TextInput
                    style={styles.Input}
                    value={cusNumPhone}
                    placeholder={item.cus_numphone}
                    onChangeText={text => {
                      setCusNumPhone(text);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.Text}>Date of birth</Text>
                  <CusTomPicker
                    defaultDate={item.cus_birthday}
                    onDateChange={value => {
                      setCusBirthDay(value);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.Text}>Gender</Text>
                  <View style={styles.Picker}>
                    <Picker
                      selectedValue={selectedGender}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                      }>
                      <Picker.Item label="Male" value="0" />
                      <Picker.Item label="FeMale" value="1" />
                    </Picker>
                  </View>
                </View>
                <View>
                  <Text style={styles.Text}>Email</Text>
                  <TextInput
                    style={styles.Input}
                    value={cusEmail}
                    placeholder={item.cus_email}
                    onChangeText={text => {
                      setCusEmail(text);
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.Text}>Adress</Text>
                  <TextInput style={styles.Input} value={item.cus_email} />
                </View>
              </View>
            </View>
          );
        })}

        <Button
          title={'Sửa'}
          style={styles.marginButton}
          onPress={() => {
            UpdateProfile();
            navigation.replace('EditAccount');
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
    // marginTop: 20,
    marginBottom: 40,
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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  Picker: {
    height: 50,
    backgroundColor: Colors.white,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default EditAccount;
