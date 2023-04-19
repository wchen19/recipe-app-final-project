import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {FONTS, COLORS, SIZES, api} from '../constants';
import {RecipeCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Bookmark = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await api
        .getBookmarkedRecipes()
        .then(response => {
          setRecipes(response.data);
          setLoading(false);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: SIZES.radius,
        backgroundColor: COLORS.white,
      }}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
