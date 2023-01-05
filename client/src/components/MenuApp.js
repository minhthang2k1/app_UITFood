import React from 'react';
import {Menu, HamburgerIcon, Box, Pressable, Divider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuApp = () => {
  const navigation = useNavigation();
  return (
    <Box alignItems="flex-start" w="1/2">
      <Menu
        w="150"
        trigger={triggerProps => {
          return (
            <Pressable {...triggerProps}>
              <HamburgerIcon />
            </Pressable>
          );
        }}>
        <Menu.Group title="Cửa hàng">
          <Menu.Item onPress={() => navigation.replace('ListCoupon')}>
            Khuyến mãi
          </Menu.Item>
          <Menu.Item onPress={() => navigation.replace('ProductByCategory')}>
            Tất cả món
          </Menu.Item>
        </Menu.Group>
        <Divider mt="3" w="100%" />
        <Menu.Group title="Tài khoản">
          <Menu.Item
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            Thông báo
          </Menu.Item>
          <Menu.Item onPress={() => navigation.replace('ListInvoice')}>
            Danh sách hóa đơn
          </Menu.Item>
          <Menu.Item onPress={() => navigation.replace('MyCoupon')}>
            Khuyến mãi của tôi
          </Menu.Item>
          <Menu.Item onPress={() => navigation.replace('OrderHistory')}>
            Lịch sử mua hàng
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            Thông tin
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              navigation.navigate('EditAccount');
            }}>
            Sửa thông tin
          </Menu.Item>
          <Menu.Item
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            Đổi mật khẩu
          </Menu.Item>
          <Menu.Item
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Login');
            }}>
            Đăng xuất
          </Menu.Item>
        </Menu.Group>
      </Menu>
    </Box>
  );
};

export default MenuApp;
