import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GenreCategory.css'

const GenreCategory = (props) => {
    const [module, setModule] = useState(null)

    useEffect(() => {
        const name = props.genre.toLowerCase();
        import(`../../../assets/images/genres/${name}.jpg`)
            .then(image => {
                setModule(image.default)
            })
    }, [])

    // const { module: image } = module;
    const genre = props.genre;
    return (
        <div className="AllGenresGenre">
            <Link className="GenreImage" to={props.match.url + '/' + genre}> <img src={module} alt={genre + " poster"} /> </Link>
            <Link className="GenreText" to={props.match.url + '/' + genre}>{genre}</Link>
        </div>
    )
}

export default withRouter(GenreCategory);


