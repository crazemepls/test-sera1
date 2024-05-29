import React from "react";
import { Space, List, Button } from "antd"

const FilterButtons = ({ pokemonTypes, handleButtonClick, selectedType }) => {
  return (
    <Space>
      <List
        grid={{
          gutter: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 9,
        }}
        dataSource={pokemonTypes}
        renderItem={(type) => (
          <List.Item>
            <Button
              key={type.id}
              type="text"
              size="large"
              onClick={() => handleButtonClick(type.id)}
              style={{ padding: 0, background: 'none', border: type.id === selectedType ? '#1677FF solid 10px' : '' , height:'56px'}}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/${type.id}.png`}
                alt="Pokemon"
                style={{ display: 'block' }}
              />
            </Button>
          </List.Item>
        )}
      />
    </Space>
  )
}

export default FilterButtons