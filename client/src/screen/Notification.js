import React from 'react';
import {
  Box,
  Heading,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
} from 'native-base';
import NotifyIcon from '../../assets/icons/notification-bell.png';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      Notification: 'Tạo TK thành công',
      timeStamp: '12:47 PM',
      NotifyDetails:
        'Tạo TK thành công, Chào mừng bạn đến với app bán bánh mì,Hãy đặt hàng ngay để nhận ngay những ưu đãi đặc biệt',
      avatarUrl: NotifyIcon,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      Notification: 'Đổi mật khẩu thành công',
      timeStamp: '11:11 PM',
      NotifyDetails: 'Cheer up, there!',
      avatarUrl: NotifyIcon,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      Notification: 'Đặt hàng thành công',
      timeStamp: '6:22 PM',
      NotifyDetails: 'Good Day!',
      avatarUrl: NotifyIcon,
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      Notification: 'Giao hàng thành công',
      timeStamp: '8:56 PM',
      NotifyDetails: 'All the best',
      avatarUrl: NotifyIcon,
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      Notification: 'Kiara',
      timeStamp: '12:47 PM',
      NotifyDetails: 'I will call today.',
      avatarUrl: NotifyIcon,
    },
  ];
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Thông báo
      </Heading>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2">
            <HStack space={3} justifyContent="space-between">
              <Image source={NotifyIcon} alt="text" size="40px" />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {item.Notification}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  style={{width: 250}}>
                  {item.NotifyDetails}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
      <Button
        title={'Quay lại'}
        style={{width: 150, alignSelf: 'center', marginTop: 20}}
        onPress={() => navigation.replace('HomeScreen')}
      />
    </Box>
  );
};

export default Notification;
