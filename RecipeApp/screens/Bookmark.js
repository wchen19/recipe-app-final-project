import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
} from 'react-native';

import {FONTS, COLORS, SIZES, api} from '../constants';
import {RecipeCard} from '../components';
import {UserContext} from '../UserContext';

const Bookmark = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const {userId, logout} = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await api
        .getUserBookmarkedRecipes(userId)
        .then(async response => {
          await api
            .getRecipesByIds(response?.data, userId)
            .then(response => {
              setRecipes(response.data);
            })
            .catch(error => console.log(error));
          setLoading(false);
        })
        .catch(error => console.error(error));
    };

    const fetchUserData = async () => {
      await api
        .getUserData(userId)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => console.error(error));
    };
    fetchUserData();
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: SIZES.radius,
        backgroundColor: COLORS.white,
        marginBottom: 70,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          backgroundColor: COLORS.lightLime,
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          source={{
            uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
          }}
        />
        <View
          style={{
            marginLeft: 20,
          }}>
          <Text style={{...FONTS.h2}}>
            {userData ? userData.username : 'User'}
          </Text>
          <Button
            title="Logout"
            onPress={() => {
              logout();
              navigation.navigate('Welcome');
            }}
          />
        </View>
      </View>
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
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: SIZES.padding,
              }}>
              <Text style={{flex: 1, color: COLORS.darkGreen, ...FONTS.h2}}>
                Bookmark
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
          ListFooterComponent={<View style={{marginBottom: 70}} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
