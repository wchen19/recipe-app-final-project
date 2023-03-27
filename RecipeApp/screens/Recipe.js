import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {SIZES, FONTS, COLORS, IMG} from '../constants';
const {height} = Dimensions.get('window');

const HEADER_HEIGHT = 300;

const Recipe = ({navigation, route}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let {recipe} = route.params;
    setSelectedRecipe(recipe);
  }, []);

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <Text>{selectedRecipe?.title}</Text>
        </Animated.View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
            paddingLeft: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={15} color={COLORS.lightGray} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
          }}>
          <Icon name="bookmark-border" size={30} color={COLORS.lime} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecipeCardHeader = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          overflow: 'hidden',
          marginTop: -1000,
          paddingTop: 1000,
        }}>
        <Animated.Image
          source={selectedRecipe?.image_name && IMG[selectedRecipe?.image_name]}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: '200%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
      </View>
    );
  };

  const renderRecipeInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGreen, marginTop: 20, ...FONTS.h1}}>
            {selectedRecipe?.title}
          </Text>
          <Text
            style={{marginTop: 5, color: COLORS.lightGray2, ...FONTS.body3}}>
            {selectedRecipe?.viewers == 0
              ? 'Be the first one to try this'
              : `${selectedRecipe?.viewers} Viewes`}
          </Text>
        </View>
      </View>
    );
  };

  const renderIngredientHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',

          width: SIZES.width,
          paddingHorizontal: 30,
          paddingTop: 20,
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, color: COLORS.black, ...FONTS.h2}}>
          Ingredients
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body3,
          }}>
          {selectedRecipe?.cleaned_ingredient.length} items
        </Text>
      </View>
    );
  };

  const renderIngredients = () => {
    return (
      <View
        style={{
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingTop: 10,
          paddingBottom: 20,
        }}>
        {Array.isArray(selectedRecipe?.cleaned_ingredient) &&
          selectedRecipe?.cleaned_ingredient.map((ingredient, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: COLORS.lightGray2,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color: COLORS.lightGray2,
                  marginLeft: 10,
                  ...FONTS.body3,
                }}>
                {ingredient}
              </Text>
            </View>
          ))}
      </View>
    );
  };

  const renderInstruction = () => {
    return (
      <View
        style={{
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            flex: 1,
            marginBottom: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.h2,
          }}>
          Instructions
        </Text>
        <Text
          style={{
            flex: 1,
            color: COLORS.lightGray2,
            paddingTop: 10,
            textAlign: 'justify',
            ...FONTS.body3,
          }}>
          {selectedRecipe?.instruction}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,

        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 10,
      }}>
      <Animated.FlatList
        data={selectedRecipe && selectedRecipe}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* HEader */}
            {renderRecipeCardHeader()}
            {/* Indo */}
            {renderRecipeInfo()}
            {/* Title */}
            {renderIngredientHeader()}
            {renderIngredients()}
            {renderInstruction()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 50,
            }}
          />
        }
      />
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
