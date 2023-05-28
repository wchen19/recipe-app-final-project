import React, {useState, useEffect, useContext} from 'react';
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
import {UserContext} from '../UserContext';

const Home = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await api
        .getMostViewedRecipes(userId)
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
      .getRandomRecipe(userId)
      .then(response => {
        navigation.navigate('Recipe', {recipe: response.data});
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
        <TouchableOpacity
          style={{
            flex: 1,
            columnGap: 10,
            flexDirection: 'row',
            alignItems: 'center',
            padding: SIZES.radius,
          }}
          onPress={fetchRecipe}>
          <Icon name="casino" size={30} color={COLORS.lightGreen1} />
          <Text
            style={{
              width: '70%',
              color: COLORS.lightGreen1,
              ...FONTS.body3,
            }}>
            I'm Feeling Lucky
          </Text>
        </TouchableOpacity>
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
