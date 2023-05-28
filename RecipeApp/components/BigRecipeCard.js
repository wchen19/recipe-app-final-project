import React, {useContext, useState} from 'react';
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
import {SIZES, COLORS, FONTS, IMG, api} from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../UserContext';

const RecipeCardDetails = ({recipeItem, onBookmarkPress}) => {
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
            overflow: 'hidden',
            paddingRight: 10,
          }}
          numberOfLines={3}
          ellipsizeMode="tail">
          {recipeItem?.title}
        </Text>
        <TouchableOpacity onPress={onBookmarkPress}>
          <Icon
            name={recipeItem?.bookmarked ? 'bookmark' : 'bookmark-border'}
            size={20}
            color={COLORS.lime}
            style={{marginRight: SIZES.base}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RecipeCardInfo = ({recipeItem, onBookmarkPress}) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView blurType="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails
          recipeItem={recipeItem}
          onBookmarkPress={onBookmarkPress}
        />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor: COLORS.transparentDarkGray,
        }}>
        <RecipeCardDetails
          recipeItem={recipeItem}
          onBookmarkPress={onBookmarkPress}
        />
      </View>
    );
  }
};

const BigRecipeCard = ({containerStyle, recipeItem, onPress}) => {
  const imagePath = IMG[recipeItem.image_name];
  const [isBookmarked, setIsBookmarked] = useState(recipeItem.bookmarked);
  const {userId} = useContext(UserContext);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      console.log('unbookmark');
      await api
        .updateBookmarkedRecipes(userId, recipeItem.id, 'unbookmark')
        .then(response => {
          setIsBookmarked(!isBookmarked);
        })
        .catch(error => console.error(error));
    } else {
      console.log('bookmark');
      await api
        .updateBookmarkedRecipes(userId, recipeItem.id, 'bookmark')
        .then(response => {
          setIsBookmarked(!isBookmarked);
        })
        .catch(error => console.error(error));
    }
  };

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
      onPress={() => {
        onPress();
        const addViewers = async () => {
          await api.addViewers(recipeItem.id).catch(err => console.log(err));
        };
        addViewers();
      }}>
      <FastImage
        source={imagePath}
        resizeMode="cover"
        style={{width: 250, height: 350, borderRadius: SIZES.radius}}
      />

      {/* Category */}
      <RecipeCardInfo
        recipeItem={{...recipeItem, bookmarked: isBookmarked}}
        onBookmarkPress={toggleBookmark}
      />
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
