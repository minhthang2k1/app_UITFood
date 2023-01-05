import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../theme/Colors';

const CustomPicker = props => {
  const {defaultDate} = props;
  const [date, setDate] = useState(defaultDate);
  const [show, setShow] = useState(false);

  const onAndroidChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate.toLocaleDateString());
      //give value for onDateChange
      props.onDateChange(
        selectedDate.getFullYear() +
          '-' +
          (selectedDate.getMonth() + 1) +
          '-' +
          selectedDate.getDate(),
      );
    }
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        value={new Date(date)}
        mode="date"
        display="default"
        onChange={onAndroidChange}
      />
    );
  };
  return (
    <View>
      <TouchableHighlight
        style={{borderRadius: 10}}
        activeOpacity={0}
        onPress={() => setShow(true)}>
        <View>
          <Text style={styles.Input}>{date}</Text>
          {show && renderDatePicker()}
        </View>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  Input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 15,
    marginTop: 5,
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
});
export default CustomPicker;
