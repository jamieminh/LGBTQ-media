import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/HomePage/Home'
import AllGenres from './pages/AllGenresPage/AllGenresPage'
import GenrePage from './pages/GenrePage/GenrePage'
import ErrorPage from './pages/ErrorPage/Error'
import SearchResults from './common/containers/SearchBar/SearchResults/SearchResults'
import TypePage from './pages/TypePage/TypePage'
import UserProfile from './pages/UserPage/UserProfile'
import UpsertTitle from './pages/AdminPages/UpsertTitle'
import Entry from './pages/Entry/Entry'
import axios from 'axios'
import { ProtectedAdminRoute, ProtectedUserRoute } from './auth/ProtectedRoute'
import Layout from './hoc/Layout/Layout';
import SingleTitle from './pages/SingleTitle/SingleTitle';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import AdminProfile from './pages/AdminPages/AdminProfile'
import { useDispatch } from 'react-redux';
import * as actionCreators from './store/actions/index'
import './App.css';
import InsertTest from './pages/test/insertTest';
import DeleteTitle from './pages/AdminPages/DeleteTitle';


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

          <RouteWithLayout path="/movies" exact component={props => <TypePage {...props} type="movie" pageTitle="Movies" key="movies" />} />
          <RouteWithLayout path="/series" exact component={(props) => <TypePage {...props} type="series" pageTitle="Series" key="series" />} />

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

          <ProtectedAdminRoute path="/admin/profile" exact
            component={() => <AdminProfile />}
          />
          <ProtectedAdminRoute path="/upsert-media/create" exact
            component={() => <UpsertTitle type="create" />}
          />
          <ProtectedAdminRoute path="/delete-media" exact
            component={() => <DeleteTitle />}
          />

          <ProtectedAdminRoute path="/upsert-media/update" exact
            component={() => <UpsertTitle type="update" />}
          />

          <RouteWithLayout path="/insert-test" exact component={() => <InsertTest />} />


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
