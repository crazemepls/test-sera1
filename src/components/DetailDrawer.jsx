import React, { useState, useEffect } from "react";
import { Space, List, Drawer, Skeleton, Typography, Carousel, Tooltip, Tabs } from "antd"
import PokemonService from "../service/pokemon";
import Helper from "../helper/helper";

const DetailDrawer = ({ selectedPokemonObj, onCloseDrawer, openDrawer, loadingDetail }) => {
  const [speciesDetail, setSpeciesDetail] = useState(null)
  const [evoChain, setEvoChain] = useState(null)

  const parts = selectedPokemonObj.species.url.split('/');
  const speciesId = parts[parts.length - 2];

  const isBaby = !!speciesDetail?.is_baby
  const isMythical = !!speciesDetail?.is_mythical
  const isLegendary = !!speciesDetail?.is_legendary

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const generateImage = (image) => {
    const flattenedData = Helper.flattenObject(image.sprites);
    return (
      <div style={{ width: '400px' }}>
        <Carousel autoplay>
          {
            flattenedData.map((imageData) => (
              <div style={contentStyle}>
                <Tooltip title={imageData.name} >
                  <img
                    width={400}
                    height={400}
                    src={imageData.url}
                    alt={imageData.name}
                    style={{ display: 'block' }}
                  />
                  <Typography>{'alt: ' + imageData.name}</Typography>
                </Tooltip>
              </div>
            ))
          }
        </Carousel>
      </div>
    )
  }

  const generatePokemonTypes = (types) => {
    return <List
      grid={{
        gutter: 4,
        xs: 1,
      }}
      dataSource={types}
      renderItem={(type) => {
        const parts = type.type.url.split('/');
        const id = parts[parts.length - 2];
        return <List.Item>
          <Space
            key={type.type.name}
          > <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/${id}.png`}
              alt="Pokemon"
              style={{ display: 'block' }}
            /></Space>
        </List.Item>
      }}
    />
  }

  const generatePokemonBaseStats = (stats) => {
    return <List
      size="small"
      dataSource={stats}
      renderItem={(stat) => {
        return <List.Item>
          <Space
            key={stat.stat.url}
          ><Typography>{stat.stat.name + ' : ' + stat.base_stat}</Typography></Space>
        </List.Item>
      }}
    />
  }

  const generateMovesList = (moves) => {
    return <List
      grid={{
        gutter: 2,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
        xxl: 12,
      }}
      dataSource={moves}
      renderItem={(move) => {
        return <List.Item>
          <Space
            key={move?.move.name}
          ><Typography><a href={move.move.url}>{move?.move.name}</a></Typography></Space>
        </List.Item>
      }}
    />
  }

  const generatePokemonSpeciesDetail = (speciesDetail) => {
    return <Space
      size="small"
      direction="vertical"
      align="end"
    >
      <Space
        key={speciesDetail?.id}
        direction="vertical"
      >
        <Typography>{"Capture Rate : " + speciesDetail?.capture_rate}</Typography>
        <Typography>{"Color : " + speciesDetail?.color?.name}</Typography>
        <Typography>{"Shape : " + (speciesDetail?.shape?.name || '-')}</Typography>
        <Typography>{"Generation : " + speciesDetail?.generation?.name}</Typography>
        <Typography>{"Habitat : " + (speciesDetail?.habitat?.name || '-')}</Typography>
        <Typography>{"Egg Group : " + Helper.generateStringFromArray(speciesDetail?.egg_groups, 'eggGroup')}</Typography>
        <Typography>{"Varieties : " + Helper.generateStringFromArray(speciesDetail?.varieties, 'varieties')}</Typography>
        {isBaby && <Typography>{"This pokemon is a baby!"}</Typography>}
        {isMythical && <Typography>{"This pokemon is a Mythical Pokemon!"}</Typography>}
        {isLegendary && <Typography>{"This pokemon is a Legendary Pokemon!"}</Typography>}
      </Space>
    </Space>
  }

  const getSpeciesDetail = async () => {
    await PokemonService.getPokemonSpeciesDetail(speciesId)
      .then((res) => {
        setSpeciesDetail(res.data)
      })
  }

  const getEvolutionChain = async () => {
    await PokemonService.getPokemonEvoDetail(speciesDetail?.evolution_chain.url)
      .then((res) => {
        setEvoChain(res.data)
      })
  }

  useEffect(() => {
    getSpeciesDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (speciesDetail?.evolution_chain?.url) {
      getEvolutionChain()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciesDetail])

  return (
    <Drawer
      title={'#' + selectedPokemonObj.order + " " + selectedPokemonObj.name}
      placement={'bottom'}
      closable={false}
      onClose={onCloseDrawer}
      open={openDrawer}
      key={'left'}
      size="large"
    >
      {
        loadingDetail ?
          <Skeleton /> :
          <div style={{ justifyContent: 'center', display: "flex" }} >
            <Tabs
              defaultActiveKey='1'
              items={[
                {
                  key: '1',
                  label: 'Basic Info',
                  children:
                    <Space direction="horizontal" style={{ width: '80vw', justifyContent: 'center' }}>
                      {generateImage(selectedPokemonObj)}
                      <Space direction="vertical">
                        {generatePokemonTypes(selectedPokemonObj.types)}
                        <Space direction="horizontal">
                          <div
                            style={{
                              background: '#F5F5F5',
                              padding: 24,
                              borderRadius: '24px',
                            }}
                          >
                            {generatePokemonBaseStats(selectedPokemonObj.stats)}
                          </div>
                          <div
                            style={{
                              background: '#F5F5F5',
                              padding: 24,
                              borderRadius: '24px',
                            }}
                          >
                            {
                              speciesDetail !== null &&
                              generatePokemonSpeciesDetail(speciesDetail)}
                          </div>
                        </Space>
                      </Space>
                    </Space>
                },
                {
                  key: '2',
                  label: 'Moveset',
                  children:
                    <Space direction="vertical" style={{ paddingLeft: '20px', width: '80vw' }}>
                      {generateMovesList(selectedPokemonObj.moves)}
                    </Space>
                },
                {
                  key: '3',
                  label: 'Other Info',
                  children:
                    <div style={{ width: '80vw' }}>
                      <Space>
                        <div
                          style={{
                            background: '#F5F5F5',
                            padding: 24,
                            borderRadius: '24px',
                          }}
                        >
                          <Typography>{"Evolution chain url : " + speciesDetail?.evolution_chain.url}</Typography>
                          <Typography>
                            {"Evolves from : " + (speciesDetail?.evolves_from_species?.name ? speciesDetail?.evolves_from_species?.name : '-')}
                          </Typography>
                          <Typography>{"Evolves to : " + Helper.generateStringFromArray(evoChain?.chain.evolves_to, 'evolvesTo')}</Typography>
                        </div>
                      </Space>
                    </div>
                },
              ]}
            >
            </Tabs>
          </div>
      }
    </Drawer>
  )
}

export default DetailDrawer