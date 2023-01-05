import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {Secret_key, STRIPE_PUBLISHABLE_KEY} from '../constants/keys';
import Colors from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({route}) => {
  const [Hid, setHid] = useState(false);
  const [urlPayment, setUrlPayment] = useState('');
  const navigation = useNavigation();
  const {invoice_id, invoice_total} = route.params;
  // console.log(totalMoney + FeeShip);
  // create a component
  const CURRENCY = 'VND';
  var CARD_TOKEN = null;

  function getCreditCardToken(creditCardData) {
    // alert()
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  /**
   * The method imitates a request to our server.
   *
   * @param creditCardToken
   * @return {Promise<Response>}
   */
  function subscribeUser(creditCardToken) {
    return new Promise(resolve => {
      // console.log('Credit card token\n', creditCardToken);
      CARD_TOKEN = creditCardToken.id;
      setTimeout(() => {
        resolve({status: true});
      }, 1000);
    });
  }
  const [CardInput, setCardInput] = React.useState({});
  const updatestatusInvoice = useCallback(() => {
    Axios.put(`${IP}/updatestatus`, {
      invoice_id: invoice_id,
    })
      .then(res => {
        // console.log(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  });
  const updateBillInvoice = useCallback(() => {});
  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      alert('Thẻ không khả dụng');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert('Thẻ lỗi');
        return;
      }
    } catch (e) {
      console.log('e', e);
      return;
    }
    // Send a request to your server with the received credit card token
    const {error} = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error);
    } else {
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {
        alert('Thanh toán thành công');
        updatestatusInvoice();
        setUrlPayment(pament_data.receipt_url);
        Axios.put(`${IP}/updatebill`, {
          invoice_bill: pament_data.receipt_url,
          invoice_id: invoice_id,
        })
          .then(res => {
            console.log(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
        setHid(true);
      } else {
        alert('Thanh toán thất bại');
      }
    }
  };

  const charges = async () => {
    const card = {
      amount: invoice_total,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: 'Trả tiền ăn bánh mì',
      // payment_method_types: ['card'],
      // customer: 'acct_1L8n4THfLcFsWikr',
      receipt_email: 'thangnh2001@gmail.com',
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${Secret_key}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  const _onChange = data => {
    setCardInput(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primaryColor}
      />
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png',
        }}
        style={styles.ImgStyle}
      />
      <CreditCardInput
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange}
      />
      {Hid === false ? (
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      ) : null}

      {Hid === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(urlPayment);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Xem phiếu thanh toán</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('HomeScreen');
              setHid(false);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Về trang chủ</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    width: 220,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  inputStyle: {
    backgroundColor: Colors.primaryColor,
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff',
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12,
  },
});

//make this component available to the app
export default Checkout;
