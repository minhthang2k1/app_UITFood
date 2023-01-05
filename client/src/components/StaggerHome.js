import React from 'react';
import {
  Box,
  useDisclose,
  IconButton,
  Stagger,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';

const StaggerHome = () => {
  const navigation = useNavigation();
  const {isOpen, onToggle} = useDisclose();
  return (
    <Box>
      <Box alignItems="center" style={{margin: 0}}>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                color={Colors.white}
                size={30}
                name="delete"
                // style={{marginTop: 10}}
                onPress={() => navigation.replace('OrderHistory')}
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                color={Colors.white}
                size={30}
                name="delete"
                // style={{marginTop: 10}}
                onPress={() => navigation.replace('ProductDetails')}
              />
            }
          />
        </Stagger>
      </Box>
      <HStack justifyContent="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              color={Colors.white}
              size={30}
              name="pending"
              //   style={{marginTop: 10}}
              //   onPress={() => navigation.replace('HomeScreen')}
            />
          }
        />
      </HStack>
    </Box>
  );
};

export default StaggerHome;
