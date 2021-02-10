import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/HomePage/Home'
import AllGenres from './pages/AllGenresPage/AllGenresPage'
import GenrePage from './pages/GenrePage/GenrePage'
import ErrorPage from './pages/ErrorPage/Error'
import SearchResults from './common/containers/SearchBar/SearchResults/SearchResults'
import TypePage from './pages/TypePage/TypePage'

import './App.css';
import Layout from './hoc/Layout/Layout';
import SingleTitle from './pages/SingleTitle/SingleTitle';

function App() {
  return (
    <React.Fragment >
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/movies" exact component={() => <TypePage type="movie" key="movies"/>} />   
            <Route path="/series" exact component={() => <TypePage type="series" key="series"/>} />   
            <Route path="/animation" exact component={() => <TypePage type="animation" key="animation"/>} />   

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
