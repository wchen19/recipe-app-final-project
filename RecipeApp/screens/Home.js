import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import {FONTS, COLORS, SIZES, api} from '../constants';
import {RecipeCard, BigRecipeCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MAX_RECIPES = 10;

// search -> recsys

const Home = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [limitedRecipes, setLimitedRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .getRecipe()
        .then(response => {
          setRecipes(response.data);
          const limitedRecipes = response.data.slice(0, MAX_RECIPES);
          setLimitedRecipes(limitedRecipes);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          height: 80,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: COLORS.darkGreen, ...FONTS.h2}}>
            Hello User,
          </Text>
          <Text style={{marginTop: 3, color: COLORS.gray, ...FONTS.body3}}>
            What you want to cook today?
          </Text>
        </View>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}>
        <Icon name="search" size={30} color={COLORS.gray} />
        <TextInput
          style={{marginLeft: SIZES.radius, ...FONTS.body3}}
          placeholderTextColor={COLORS.gray}
          placeholder="Search Recipes"
          onFocus={() => navigation.navigate('Search')}
        />
      </View>
    );
  };

  const renderSeeRecipeCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGreen,
        }}>
        {/* Image */}
        <View style={{flex: 1, padding: SIZES.radius}}>
          <Text
            style={{width: '70%', color: COLORS.lightGray2, ...FONTS.body4}}>
            You have bla bla bla lba bla bla
          </Text>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => navigation.navigate('Bookmark')}>
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: 'underline',
                ...FONTS.h4,
              }}>
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTop10Section = () => {
    return (
      <View style={{marginTop: SIZES.padding}}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            color: COLORS.darkGreen,
            ...FONTS.h2,
          }}>
          Top 10 Recipe
        </Text>

        <FlatList
          data={limitedRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            return (
              <BigRecipeCard
                containerStyle={{marginLeft: index == 0 ? SIZES.padding : 0}}
                recipeItem={item}
                onPress={() => navigation.navigate('Recipe', {recipe: item})}
              />
            );
          }}
        />
      </View>
    );
  };

  const renderRecipeHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}>
        <Text style={{flex: 1, color: COLORS.darkGreen, ...FONTS.h2}}>
          Categories
        </Text>

        <TouchableOpacity>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <FlatList
        data={limitedRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Search Bar */}
            {renderSearchBar()}
            {/* See Recipe Card */}
            {renderSeeRecipeCard()}
            {/* Top 10 Section */}
            {renderTop10Section()}
            {/* Recipe Header */}
            {renderRecipeHeader()}
          </View>
        }
        renderItem={({item}) => {
          return (
            <RecipeCard
              containerStyle={{marginHorizontal: SIZES.padding}}
              item={item}
              onPress={() => navigation.navigate('Recipe', {recipe: item})}
            />
          );
        }}
        ListFooterComponent={<View style={{marginBottom: 70}} />}
      />
    </SafeAreaView>
  );
};

export default Home;
