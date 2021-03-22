import React, { Component } from 'react';
import Navbar from '../../common/components/Navigation/Navbar/Navbar';
import Footer from '../../common/components/UI/Footer/Footer';
import SearchBar from '../../common/containers/SearchBar/SearchBar'
class Layout extends Component {
    state = {

    }
    render() { 
        return (
            <div className="Layout" id="Layout">
                <Navbar />
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
