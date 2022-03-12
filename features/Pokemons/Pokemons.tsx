import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View, StyleSheet } from "react-native";
import { pokeAPI } from "../../services/pokeAPI";
import { PokemonShortInfo } from "../../types/Pokemon";
import { Pokemon } from "./components/Pokemon";

export const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonShortInfo[]>();
  const [search, setSearch] = useState('');
  const [pokemonsSearch, setPokemonsSearch] = useState<PokemonShortInfo[]>();

  const getPokemons = async () => {
    try {
      const pokemons = await pokeAPI.getPokemons();
      setPokemons(pokemons);
      setPokemonsSearch(pokemons);

    } catch (error) {
      console.error(error);
    }
  };

  const searchPokemons = (text: string) => {
    if (text) {
      const newData = pokemonsSearch?.filter(
        function (item) {
          const itemData = item.name
          const textData = text.toLowerCase();
          return itemData.indexOf(textData) > -1;
        })
        setPokemons(newData);
        setSearch(text);
    } else {
      getPokemons();
      setSearch(text);
    }
  }; 
  

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokeapp</Text>
      <TextInput
        style={styles.search}
        onChangeText={(text) => searchPokemons(text)}
        value={search}
        placeholder="Search Here"
        underlineColorAndroid="transparent"
      />
      <FlatList
        data={pokemons}
        renderItem={({ item }) => (
          <Pokemon data={item} />
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    padding: 16,
    marginTop: 16,
  },
  search: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",

  },
});
