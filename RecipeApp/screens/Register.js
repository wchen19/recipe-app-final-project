import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import AppTextInput from '../components/AppTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, FONTS, api} from '../constants';

const Register = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    await api
      .signup({
        username: formData.username,
        password: formData.password,
        dob: formatDate(selectedDate),
      })
      .then(response => {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', response.data.error);
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
            Create account
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
          <TouchableOpacity
            placeholder="Date of Birth"
            style={{
              width: '100%',
              padding: 20,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={showDatePickerModal}>
            <Text style={{color: COLORS.black, ...FONTS.body3}}>
              Date of Birth
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={date => handleDateChange(date)}
            />
          )}
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
          <AppTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
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
          onPress={handleSignup}>
          <Text
            style={{
              color: COLORS.lime,
              textAlign: 'center',
              ...FONTS.body2,
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              color: COLORS.blue,
              textAlign: 'center',
              ...FONTS.body4,
            }}>
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
