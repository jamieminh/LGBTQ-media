import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/HomePage/Home'
import AllGenres from './pages/AllGenresPage/AllGenresPage'
import GenrePage from './pages/GenrePage/GenrePage'
import ErrorPage from './pages/ErrorPage/Error'
import SearchResults from './common/containers/SearchBar/SearchResults/SearchResults'

import './App.css';
import Layout from './hoc/Layout/Layout';
import SingleTitle from './pages/SingleTitle/SingleTitle';
// import Movies from './containers/Movies/Movies';
// import TvShows from './containers/TVShows/TvShows';

function App() {
  return (
    <React.Fragment >
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/movies" exact component={Home} />   {/* implement later */}
            <Route path="/series" exact component={Home} />   {/* implement later */}

            <Route path="/genres" exact component={AllGenres} />
            <Route path="/genres/:genre"
              component={ (props) => <GenrePage {...props} genre={props.match.params.genre} key={window.location.pathname} />}
            />   

            <Route path="/search/:query"
              component={(props) => <SearchResults {...props} key={window.location.pathname} />} 
            />

            <Route path="/media/:media_id" exact 
            component={(props) => <SingleTitle {...props} key={window.location.pathname}/>}
            />

            <Route path="/" exact component={Home} />

            <Route component={ErrorPage} />

          </Switch>

        </Layout>

      </div>
    </React.Fragment>
  );
}

export default App;
