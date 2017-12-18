import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Header.css'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    openMenu(){
        if(this.state.menuOpen === false)
            this.setState({menuOpen: true})
        else if(this.state.menuOpen === true)
            this.setState({menuOpen: false})
    }

    render(){
        const userPH = 'http://14aiks37fljp6kgn2vf63fz7s-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2014/04/user1.jpg'
        
        return(
            <header id='HeaderBar'>
                <div className='headerComponents'>
                    <img className='logo' src='' alt=''/>
                    <img onClick={his.openMenu} className='userImg' src='' alt={userPH}/>
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