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
import {RecipeCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// limit judul biar muat, all recipe, random, of the day, handle image null, search resep ilustrasi, update nama image_name

const AllRecipe = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);

  const [recipeLimit, setRecipeLimit] = useState(10);
  const [limitedRecipes, setLimitedRecipes] = useState([]);

  useEffect(() => {
    setRecipeLimit(10);
    const fetchData = async () => {
      await api
        .getRecipe()
        .then(response => {
          setRecipes(response.data);
          const limitedRecipes = response.data.slice(0, 10);
          setLimitedRecipes(limitedRecipes);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    let limit = recipeLimit + 10;
    setRecipeLimit(limit);
    const limitedRecipes = recipes.slice(0, limit);
    setLimitedRecipes(limitedRecipes);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        marginBottom: 70,
      }}>
      <FlatList
        data={limitedRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: SIZES.padding,
            }}>
            <Text style={{flex: 1, color: COLORS.darkGreen, ...FONTS.h2}}>
              Recipes
            </Text>
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
        ListFooterComponent={
          recipes.length > 10 &&
          recipeLimit < recipes.length && (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                padding: 10,
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 10,
                marginBottom: 10,
                width: '50%',
              }}
              onPress={handleLoadMore}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>Load More</Text>
            </TouchableOpacity>
          )
        }
      />
    </SafeAreaView>
  );
};

export default AllRecipe;
