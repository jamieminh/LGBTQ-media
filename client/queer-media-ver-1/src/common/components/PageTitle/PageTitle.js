import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = (props) => {
    let title = props.title

    console.log(props.cap);

    // if specified that the title should be capitalized (cap = true)
    if (props.cap) {
        const words = title.toLowerCase().split(' ')
        title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    return (
        <Helmet>
            <title>{title} - Queer Media</title>
        </Helmet>
    );
}

export default PageTitle;