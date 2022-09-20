import { useInfiniteQuery } from 'react-query'
import { listFetcher } from '../Api'
import PokemonListItem from './PokemonListItem'
import { Link } from 'react-router-dom'
import styles from './PokemonList.module.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
import { useEffect } from 'react'

const PokemonList = ({ filter }: any) => {
  const { app } = useStore()
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'pokemon-list',
    listFetcher(),
    {
      staleTime: 600_000,
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.page + 1
        }
      },
    }
  )

  const handlePokemonClick = () => {
    app.handleScrollPositionY(window.scrollY)
  }

  useEffect(() => {
    window.scroll(0, app.scrollPositionY)
  }, [app])

  return (
    <>
      {!isLoading &&
        data?.pages.map((item) =>
          item.results.filter(filter).map((item: any) => (
            <Link
              to={`/details/${item.name}`}
              key={item.name}
              className={styles['pokemon-link']}
              onClick={handlePokemonClick}
            >
              <PokemonListItem {...item} />
            </Link>
          ))
        )}
      {hasNextPage && (
        <button
          className={styles['load-more-btn']}
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      )}
    </>
  )
}

export default observer(PokemonList)
