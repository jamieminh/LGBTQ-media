import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from './common/components/UI/Spinner/Spinner'
import Home from './pages/HomePage/Home'
import AllGenres from './pages/AllGenresPage/AllGenresPage'
import GenrePage from './pages/GenrePage/GenrePage'
import ErrorPage from './pages/ErrorPage/Error'
import SearchResults from './common/containers/SearchBar/SearchResults/SearchResults'
import TypePage from './pages/TypePage/TypePage'
import UserProfile from './pages/UserPage/User'
import CreateMedia from './pages/AdminPages/CreateMediaPage/CreateMedia'
import Entry from './pages/Entry/Entry'
import axios from 'axios'
import { ProtectedAdminRoute, ProtectedUserRoute } from './auth/ProtectedRoute'
import Layout from './hoc/Layout/Layout';
import SingleTitle from './pages/SingleTitle/SingleTitle';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import { useDispatch } from 'react-redux';
import * as actionCreators from './store/actions/index'
import './App.css';


// wrap each route with a layout , except for login and register
const RouteWithLayout = ({ component: Component, ...args }) =>
  <Route {...args} render={props => <Layout><Component {...props} /></Layout>} />



axios.defaults.withCredentials = true

const App = () => {

  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(null)


  useEffect(() => {
    axios.get('http://localhost:4000/entry/login')
      .then(res => {
        const isLoggedIn = res.data.isLoggedIn
        if (isLoggedIn) {
          dispatch(actionCreators.login(res.data.user))
          setIsLoggedIn(true)
        }
        setIsLoggedIn(false)
      })      
  }, [])

  return (isLoggedIn === null) ? '' : (
    // <Auth0Provider domain={process.env.AUTH0_DOMAIN} clientId={process.env.AUTH0_CLIENT_ID}>
    <React.Fragment >
      <div className="App">
        <Switch>
          <Route path="/login" exact component={(props) => <Entry {...props} entry="login" key="login" />} />
          <Route path="/register" exact component={(props) => <Entry {...props} entry="register" key="register" />} />

          <RouteWithLayout path="/movies" exact component={props => <TypePage {...props} type="movie" key="movies" />} />
          <RouteWithLayout path="/series" exact component={(props) => <TypePage {...props} type="series" key="series" />} />
          <RouteWithLayout path="/animation" exact component={(props) => <TypePage {...props} type="animation" key="animation" />} />

          <RouteWithLayout path="/genres" exact component={() => <AllGenres />} />
          <RouteWithLayout path="/genres/:genre"
            component={(props) => <GenrePage {...props} genre={props.match.params.genre} key={window.location.pathname} />}
          />

          <RouteWithLayout path="/artist/:artist_id"
            component={(props) => <ArtistPage {...props} artist={props.match.params.artist_id} key={window.location.pathname} />}
          />

          <RouteWithLayout path="/search/:query"
            component={(props) => <SearchResults {...props} key={window.location.pathname} />}
          />

          <RouteWithLayout path="/media/:media_id" exact
            component={(props) => <SingleTitle {...props} key={window.location.pathname} />}
          />

          <ProtectedUserRoute path="/profile" exact
            component={() => <UserProfile />}
          />
          <ProtectedAdminRoute path="/create-media" exact
            component={() => <CreateMedia />}
          />

          <RouteWithLayout path="/" exact component={() => <Home />} />

          <RouteWithLayout component={() => <ErrorPage />} />


          {/* <Route path="/register" exact component={(props) => <Entry {...props} entry="register" key="register" />} /> */}
        </Switch>
      </div>
    </React.Fragment>
    // </Auth0Provider>
  );
}

export default App;
