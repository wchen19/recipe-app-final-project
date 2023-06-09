import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RecipeCard} from '../components';
import {COLORS, SIZES, FONTS, getRecom, api} from '../constants';
import {UserContext} from '../UserContext';

const Search = ({navigation}) => {
  const [recipes, setRecipes] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeLimit, setRecipeLimit] = useState(10);
  const [limitedRecipes, setLimitedRecipes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);
  const {userId} = useContext(UserContext);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const fetchData = async ids => {
    await api
      .getRecipesByIds(ids, userId)
      .then(response => {
        setRecipes(response.data);
        const limitedRecipes = response.data.slice(0, 10);
        setLimitedRecipes(limitedRecipes);
        setShowRecipes(true);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (recipes.length) {
      const limitedRecipes = recipes.slice(0, recipeLimit);
      setLimitedRecipes(limitedRecipes);
    }
  }, [recipeLimit]);

  const addSearchHistory = async text => {
    await api
      .updateSearchHistory(userId, text)
      .then(response => {
        setSearchHistory(prevSearchHistory => [...prevSearchHistory, text]);
      })
      .catch(error => console.log(error));
  };

  const fetchRecipes = async ingredients => {
    setLoading(true);
    setRecipeLimit(10);

    try {
      const result = await getRecom(ingredients);

      const ids = JSON.stringify(Object.values(result)).replace(
        /[\[\]']+/g,
        '',
      );
      fetchData(ids);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setShowRecipes(false);

    addSearchHistory(searchValue);
    const searchResult = searchValue.split(',').filter(Boolean);
    const ingredientList = searchResult.map(str => str.trim());
    fetchRecipes(ingredientList);

    Keyboard.dismiss();
  };

  const handleSearchHistory = value => {
    setShowRecipes(false);

    addSearchHistory(value);
    const searchResult = value.split(',').filter(Boolean);
    const ingredientList = searchResult.map(str => str.trim());
    fetchRecipes(ingredientList);

    Keyboard.dismiss();
  };

  useEffect(() => {
    inputRef.current.focus();
    setShowRecipes(false);

    const fetchData = async () => {
      await api
        .getSearchHistory(userId)
        .then(response => {
          setSearchHistory(response.data);
        })
        .catch(error => console.log(error));
    };

    fetchData();
  }, []);

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}>
        <Icon name="search" size={30} color={COLORS.gray} />
        <TextInput
          ref={inputRef}
          style={{
            marginLeft: SIZES.radius,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholderTextColor={COLORS.gray}
          placeholder="Search using ingredients"
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          blurOnSubmit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    );
  };

  const renderSearchResultHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}>
        <Text style={{flex: 1, color: COLORS.darkGreen, ...FONTS.h2}}>
          Search Result
        </Text>
      </View>
    );
  };

  const renderSearchHistory = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}>
        <FlatList
          data={searchHistory.slice(-5)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: 20,
                marginTop: 5,
              }}
              onPress={() => {
                handleSearchHistory(item);
                setSearchValue(item);
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={
            <View
              style={{
                height: 0.3,
                backgroundColor: COLORS.lightGray2,
                marginHorizontal: 8,
              }}
            />
          }
        />
      </View>
    );
  };

  const handleLoadMore = () => {
    let limit = recipeLimit + 10;
    setRecipeLimit(limit);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.radius,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        marginBottom: 70,
      }}>
      {renderSearchBar()}
      {isFocused ? (
        renderSearchHistory()
      ) : showRecipes ? (
        <FlatList
          data={limitedRecipes}
          keyExtractor={item => `${item.id}`}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View>{renderSearchResultHeader()}</View>}
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
                <Text style={{color: COLORS.white, ...FONTS.h3}}>
                  Load More
                </Text>
              </TouchableOpacity>
            )
          }
        />
      ) : loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.transparentBlack3,
              fontWeight: 800,
              ...FONTS.h3,
              fontSize: 18,
            }}>
            Input ingredients seperated by comma
          </Text>
          <FastImage
            source={require('../constants/images/Search.png')}
            resizeMode="center"
            style={{
              width: 400,
              height: 100,
              opacity: 0.5,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
