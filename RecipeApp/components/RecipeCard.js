import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, IMG, SIZES} from '../constants';

const RecipeCard = ({containerStyle, item, onPress}) => {
  const imagePath = IMG[item?.image_name];
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={imagePath}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
        }}
      />
      <View style={{width: '65%', paddingHorizontal: 20}}>
        <Text style={{flex: 1, color: COLORS.lightGreen1, ...FONTS.h2}}>
          {item?.title}
        </Text>
        <Text
          style={{
            flex: 2,
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}>
          {item?.viewers == 0
            ? 'Be the first one to try this'
            : `${item?.viewers} Viewes`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
