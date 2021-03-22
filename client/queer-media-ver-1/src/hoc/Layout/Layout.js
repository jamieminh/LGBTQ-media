import React, { Component } from 'react';
import Navbar from '../../common/components/Navigation/Navbar/Navbar';
// import Toolbar from '../../common/components/Navigation/Toolbar/Toolbar';
import Footer from '../../common/components/UI/Footer/Footer';
import SearchBar from '../../common/containers/SearchBar/SearchBar'
class Layout extends Component {
    state = {

    }
    render() { 
        return (
            <div className="Layout" id="Layout">
                {/* <Toolbar/> */}
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
