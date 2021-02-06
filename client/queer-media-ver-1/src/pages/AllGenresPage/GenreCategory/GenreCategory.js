import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './GenreCategory.css'
import Home from '../../HomePage/Home';


class GenreCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { module: null };
    }

    componentDidMount() {
        const name = this.props.genre.toLowerCase();
        import(`../../../assets/images/genres/${name}.jpg`)
        .then(image => {
            this.setState({ module: image.default })
        })
    }

    render() {
        const { module: image } = this.state; 
        const genre = this.props.genre;
        return(
            <div className="Genre">
                <Link className="GenreImage" to={ this.props.match.url + '/' + genre}> <img src={image} alt={genre + " poster"}/> </Link>
                <Link className="GenreText" to={this.props.match.url + '/' + genre}>{genre}</Link>
            </div>
        )
    }
}

export default withRouter(GenreCategory);


