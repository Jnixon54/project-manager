import React, {Component} from 'react'

import './Header.css'

class Header extends Component {

    render(){
        return(
            <header id='HeaderBar'>
                <div className='headerComponents'>
                    <img className='logo' src='' alt=''/>
                    <button>Login</button>
                </div>
            </header>
        )
    }
}

export default Header