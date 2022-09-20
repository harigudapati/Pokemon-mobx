import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router'
import { lazy, Suspense } from 'react'

const Pokedex = lazy(() => import('./Pokedex'))
const PokemonDetails = lazy(() => import('./Pokedex/PokemonDetails'))

const history = createBrowserHistory()
const queryClient = new QueryClient()

const App = () => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Router history={history}>
        <QueryClientProvider client={queryClient}>
          <Route component={Pokedex} path='/' exact />
          <Route component={PokemonDetails} path='/details/:name' />
        </QueryClientProvider>
      </Router>
    </Suspense>
  )
}

export default App
