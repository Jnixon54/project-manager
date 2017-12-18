import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Header.css'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuOpen: false
        }
        this.openMenu = this.openMenu.bind(this)
    }

    openMenu(){
        if(this.state.menuOpen === false)
            this.setState({menuOpen: true})
        else if(this.state.menuOpen === true)
            this.setState({menuOpen: false})
    }

    render(){

        
        return(
            <header id='HeaderBar'>
                <div className='headerComponents'>
                    <img className='logo' src='' alt=''/>
                    <img onClick={this.openMenu} className='userImg' src='' alt=''/>
                </div>
                {this.state.menuOpen === true &&
                <menu id='menuDropdown'>
                    <Link to='/Dashboard'><h3>Dashboard</h3></Link>
                    <Link to='/ProjectView'><h3>Projects</h3></Link>
                    <Link to='/SettingView'><h3>Settings</h3></Link>
                    <h3>Logout</h3>
                </menu>
                }
            </header>
        )
    }
}

export default Header

//early Header, No functionality or hamburger yet. Not to be used on the landing Page