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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CategoryCard} from '../components';
import {COLORS, SIZES, FONTS, recipes} from '../constants';

const Search = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const fetchRecipes = () => {
    setLoading(true);
    // simulate delay for demonstration purposes
    setTimeout(() => {
      setShowRecipes(true);
      setLoading(false);
    }, 2000);
  };

  const handleSearch = () => {
    // perform search with searchValue
    // 'http://192.168.100.22:3000/recipe?ingredients='
    setShowRecipes(false);
    const searchResult = searchValue.split(',').filter(Boolean);
    const ingredientList = searchResult.map(str => str.trim());
    console.log('Search with:', searchValue, ingredientList);
    fetchRecipes(ingredientList);
    Keyboard.dismiss(); // hide the keyboard after the search is performed
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
          placeholder="Enter ingredients separated by comma"
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
        <Text style={{flex: 1, ...FONTS.h2}}>Search Result</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      {renderSearchBar()}
      {showRecipes ? (
        <FlatList
          data={recipes.categories}
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
              <CategoryCard
                containerStyle={{marginHorizontal: SIZES.padding}}
                categoryItem={item}
                onPress={() => navigation.navigate('Recipe', {recipe: item})}
              />
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 70}} />}
        />
      ) : (
        loading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )
      )}
    </View>
  );
};

export default Search;
