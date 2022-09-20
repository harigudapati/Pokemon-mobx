import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { detailFetcher } from '../Api'
import styles from './PokemonDetails.module.css'
import PokemonListItem from './PokemonListItem/PokemonListItem'

const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>()
  const { data, isLoading } = useQuery(
    ['pokemon-detail', name],
    detailFetcher(name),
    {
      staleTime: 600_000,
    }
  )

  return (
    <>
      <Link to='/' className={styles['nav-bar']}>
        &lt; Back to the Pokedex
      </Link>
      {!isLoading && <PokemonListItem name={name} url={data.url} />}
    </>
  )
}

export default PokemonDetails
