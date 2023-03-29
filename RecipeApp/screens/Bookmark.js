import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';

import {FONTS, COLORS, SIZES, api} from '../constants';
import {RecipeCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Bookmark = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .getBookmarkedRecipes()
        .then(response => {
          setRecipes(response.data);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <FlatList
        data={recipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
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

export default Bookmark;
