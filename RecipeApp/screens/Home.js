import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {FONTS, COLORS, SIZES, api} from '../constants';
import {BigRecipeCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// random recipe and loading

const Home = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await api
        .getMostViewedRecipes()
        .then(response => {
          setRecipes(response.data.slice(0, 10));
          setLoading(false);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);

  const fetchRecipe = async () => {
    await api
      .getRandomRecipe()
      .then(response => {
        console.log(response.data);
        navigation.navigate('Recipe', {recipe: response.data[0]});
      })
      .catch(error => console.log(error));
  };

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
          <TouchableOpacity style={{marginTop: 10}} onPress={fetchRecipe}>
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
          Top 10 Most Viewed Recipe
        </Text>
        {loading ? (
          <View
            style={{
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={recipes}
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
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 70,
      }}>
      <View>
        {/* Header */}
        {renderHeader()}
        {/* Search Bar */}
        {renderSearchBar()}
        {/* See Recipe Card */}
        {renderSeeRecipeCard()}
        {/* Top 10 Section */}
        {renderTop10Section()}
      </View>
    </SafeAreaView>
  );
};

export default Home;
