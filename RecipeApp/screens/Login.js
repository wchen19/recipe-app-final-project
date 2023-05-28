import {SafeAreaView, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import AppTextInput from '../components/AppTextInput';
import {COLORS, FONTS, api} from '../constants';
import {UserContext} from '../UserContext';

const Login = ({navigation}) => {
  const {login} = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    await api
      .login({
        username: formData.username,
        password: formData.password,
      })
      .then(response => {
        Alert.alert('Success', response.data.message);
        login(response.data.userId);
        navigation.navigate('Tabs');
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.darkGreen,
              marginVertical: 30,
              ...FONTS.h1,
            }}>
            Login here
          </Text>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}>
          <AppTextInput
            placeholder="Username"
            value={formData.username}
            onChangeText={text => handleChange('username', text)}
          />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: COLORS.white,
            marginVertical: 30,
            borderRadius: 10,
            shadowColor: COLORS.black,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              color: COLORS.lime,
              textAlign: 'center',
              ...FONTS.h2,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              ...FONTS.body4,
            }}>
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
