import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import {SIZES, COLORS, FONTS, IMG} from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecipeCardDetails = ({recipeItem}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            width: '70%',
            color: COLORS.white,
            ...FONTS.h3,
            fontSize: 18,
          }}>
          {recipeItem?.title}
        </Text>

        <Icon
          name={recipeItem?.bookmarked ? 'bookmark' : 'bookmark-border'}
          size={20}
          color={COLORS.lime}
          style={{marginRight: SIZES.base}}
        />
      </View>
    </View>
  );
};

const RecipeCardInfo = ({recipeItem}) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView blurType="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor: COLORS.transparentDarkGray,
        }}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};

const BigRecipeCard = ({containerStyle, recipeItem, onPress}) => {
  // console.log(recipeItem.image_name);
  const imagePath = IMG[recipeItem.image_name];
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={imagePath}
        resizeMode="cover"
        style={{width: 250, height: 350, borderRadius: SIZES.radius}}
      />

      {/* Category */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});

export default BigRecipeCard;
