import React, {useState, useEffect, useRef} from 'react';
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

const Search = ({navigation}) => {
  const [recipes, setRecipes] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const fetchData = async ids => {
    await api
      .getRecipesByIds(ids)
      .then(response => {
        setRecipes(response.data);
        setShowRecipes(true);
      })
      .catch(error => console.log(error));
  };

  const fetchRecipes = async ingredients => {
    setLoading(true);
    try {
      const result = await getRecom(ingredients);
      const str = JSON.stringify(Object.values(result)).replace(
        /[\[\]']+/g,
        '',
      );
      fetchData(str);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setShowRecipes(false);
    const searchResult = searchValue.split(',').filter(Boolean);
    const ingredientList = searchResult.map(str => str.trim());
    fetchRecipes(ingredientList);
    Keyboard.dismiss();
  };

  useEffect(() => {
    inputRef.current.focus();
    setShowRecipes(false);
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
          style={{marginLeft: SIZES.radius, ...FONTS.body3}}
          placeholderTextColor={COLORS.gray}
          placeholder="Search using ingredients"
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
          autoFocus={true}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          blurOnSubmit={false}
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

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.radius,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      {renderSearchBar()}
      {showRecipes ? (
        <FlatList
          data={recipes}
          keyExtractor={item => `${item.id}`}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Category Header */}
              {renderSearchResultHeader()}
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
      ) : loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.transparentBlack3,
              ...FONTS.h3,
              fontSize: 18,
            }}>
            Input ingredients seperated by comma
          </Text>
          <FastImage
            source={require('../constants/images/Search.jpg')}
            style={{
              width: 350,
              height: 350,
              opacity: 0.3,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
