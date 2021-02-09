import React, { Component } from 'react';
import Toolbar from '../../common/components/Navigation/Toolbar/Toolbar';
import Footer from '../../common/components/UI/Footer/Footer';
import SearchBar from '../../common/components/SearchBar/SearchBar'
class Layout extends Component {
    state = {

    }
    render() { 
        return (
            <div className="Layout">
                <Toolbar/>
                <SearchBar />
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        );
    }
}
 
export default Layout
