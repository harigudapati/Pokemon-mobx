import { useStore } from '../store'
import PokemonList from './PokemonList'
import styles from './Pokedex.module.css'
import { observer } from 'mobx-react-lite'

const Pokedex = () => {
  const { app } = useStore()

  const filterPokemon = (pokemon: any) => {
    if (!app.searchQuery.trim()) {
      return true
    }

    return new RegExp(app.searchQuery, 'i').test(pokemon.name)
  }

  return (
    <>
      <input
        className={styles.input}
        placeholder='Enter the name of the pokemon'
        onChange={(e) => app.handleSearchQueryChange(e.target.value)}
      />
      <PokemonList filter={filterPokemon} />
    </>
  )
}

export default observer(Pokedex)
