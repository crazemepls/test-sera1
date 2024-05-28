import React, { useState, useEffect } from "react";
import { Card, Space, List, Image, Skeleton, Divider, Button, Drawer } from "antd"
import PokemonService from "../service/pokemon";
import FilterButtons from "../components/Filters";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import DetailDrawer from "../components/DetailDrawer";

const { Meta } = Card;

const HomePage = () => {
  const imageFallback = "data:image/png;base64,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"
  const [pokemonList, setPokemonList] = useState([])

  const [selectedType, setSelectedType] = useState(null)
  const [pokemonTypes, setPokemonTypes] = useState([])

  const [haveMore, setHaveMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [selectedPokemonObj, setSelectedPokemonObj] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)


  const handleIntersection = (entry) => {
    if (haveMore) {
      setLoading(true)
      loadMoreData()
    }
  };

  const onShowDrawer = (pokemonId) => {
    setOpenDrawer(true);
    setSelectedPokemon(pokemonId)
    setLoadingDetail(true)
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedPokemon(null)
    setSelectedPokemonObj(null)
  };

  const setRef = useIntersectionObserver(handleIntersection, { threshold: 0.1 });

  const getPokemons = async () => {
    if (selectedType === null) {
      await PokemonService.getAllPokemon(offset)
        .then((res) => {
          const rawPokemons = res.data.results.map((pokemon) => {
            const parts = pokemon.url.split('/');
            const id = parts[parts.length - 2];
            return { ...pokemon, id };
          })
          const isHaveMore = !!res.data.next
          setHaveMore(isHaveMore)
          if (offset === 0) {
            setPokemonList(rawPokemons)
            setOffset(1)
          }
          else {
            setPokemonList([...pokemonList, ...rawPokemons])
          }
          setLoading(false)
        })
    }
    else {
      await PokemonService.getPokemonsBasedOnType(selectedType)
        .then((res) => {
          const rawPokemons = res.data.pokemon.map((pokemon) => {
            const parts = pokemon.pokemon.url.split('/');
            const name = pokemon.pokemon.name
            const id = parts[parts.length - 2];
            return { name, id };
          })
          setPokemonList(rawPokemons)
          setLoading(false)
        })
    }
  }

  const getPokemonTypes = async () => {
    await PokemonService.getAllPokemonTypes()
      .then((res) => {
        //take only 18 types since stellar and unknown type have no pokemons
        const rawPokemonsTypes = res.data.results.slice(0, 18).map((pokemonType) => {
          const parts = pokemonType.url.split('/');
          const id = parts[parts.length - 2];
          return { ...pokemonType, id };
        })
        setPokemonTypes(rawPokemonsTypes)
      })
  }

  const getPokemonDetail = async () => {
    await PokemonService.getPokemonDetail(selectedPokemon)
      .then((res) => {
        setSelectedPokemonObj(res.data)
        setLoadingDetail(false)
      })
  }

  const handleFilterClick = (payload) => {
    if (payload === selectedType) {
      setSelectedType(null)
      setOffset(0)
    }
    else {
      setSelectedType(payload)
    }
  }

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setOffset(offset + 1)
    setLoading(true);
    getPokemons()
  };

  useEffect(() => {
    getPokemons()
  }, [selectedType])

  useEffect(() => {
    getPokemonTypes()
  }, [])

  useEffect(() => {
    if (selectedPokemon !== null) {
      getPokemonDetail()
    }
  }, [selectedPokemon])


  useEffect(() => {
    loadMoreData();
  }, []);

  return <Space direction="vertical">
    <FilterButtons pokemonTypes={pokemonTypes} handleButtonClick={handleFilterClick} selectedType={selectedType} />
    <List
      grid={{
        gutter: 4,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
        xxl: 8,
      }}
      dataSource={pokemonList}
      renderItem={(pokemon) => (
        <List.Item>
          <Card
            key={pokemon.id}
            hoverable
            style={{ width: 180 }}
            onClick={() => onShowDrawer(pokemon.id)}
            cover={
              <Image alt="image"
                fallback={imageFallback}
                loading="lazy"
                preview={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
              />
            }
          >
            <Meta title={pokemon?.name} />
          </Card>
        </List.Item>
      )}
    />
    {loading && <Space onClick={loadMoreData}>Loading...</Space>}
    {
      selectedType === null && <div ref={setRef}></div>
    }
    {
      selectedPokemonObj &&
      <DetailDrawer selectedPokemonObj={selectedPokemonObj} onCloseDrawer={onCloseDrawer} loadingDetail={loadingDetail} openDrawer={openDrawer} />
    }
  </Space>
}

export default HomePage