import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SimpleCarousel, Banner} from 'react-native-simple-banner-carousel';

const CarouselEvent = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 12,
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <SimpleCarousel
          data={[
            {
              title: 'Hokkaido',
              source: require('../../assets/images/coupon4.jpg'),
            },
            {
              title: 'Tokyo',
              source: require('../../assets/images/coupon5.jpg'),
            },
            {
              title: 'Osaka',
              source: require('../../assets/images/coupon1.jpg'),
            },
            {
              title: 'Kyoto',
              source: require('../../assets/images/coupon3.jpg'),
            },
            {
              title: 'Shimane',
              source: require('../../assets/images/coupon2.jpg'),
            },
          ]}
          renderItem={(props, i, width) => {
            return (
              <Banner
                id={`${props.title}_${i}`}
                source={props.source}
                width={width}
                onPress={id => console.log(`${id} was tapped.`)}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CarouselEvent;
