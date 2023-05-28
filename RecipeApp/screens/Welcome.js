import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, COLORS, SIZES} from '../constants';
const {height} = Dimensions.get('window');

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        style={{
          height: height / 2.5,
        }}
        resizeMode="contain"
        source={require('../constants/images/welcome.png')}
      />
      <View
        style={{
          paddingHorizontal: 40,
          paddingTop: 40,
        }}>
        <Text
          style={{
            color: COLORS.darkGreen,
            textAlign: 'center',
            ...FONTS.h1,
          }}>
          Find Your Recipe Here
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 60,
          flexDirection: 'column',
          rowGap: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: COLORS.lime,
            paddingVertical: 15,
            paddingHorizontal: 20,
            width: '100%',
            borderRadius: SIZES.radius,
            shadowColor: COLORS.black,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              ...FONTS.h2,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 15,
            paddingHorizontal: 20,
            width: '100%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: COLORS.darkLime,
              textAlign: 'center',
              ...FONTS.h2,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
