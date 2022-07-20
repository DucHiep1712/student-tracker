import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Twirl as Hamburger } from 'hamburger-react'
import './Navbar.scss'

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const isActive = window.location.pathname

    // alert(isActive)

    return (
        <nav className='navigation'>
            <NavLink to='/home' className='brand'>
                InternTest
            </NavLink>
            <div className='menu-icon'>
                <Hamburger
                    color='#e85a4f'
                    toggled={isNavExpanded}
                    toggle={setIsNavExpanded}
                />
            </div>
            <div className={'navigation-menu' + (isNavExpanded ? ' expanded' : '')}>
                <ul>
                    <li className={'one' + (isActive === '/home' ? ' underline' : '')}>
                        <NavLink exact={true} to='/home' className='nav-link'>Trang chủ</NavLink>
                    </li>
                    <li className={'two' + (isActive === '/info' ? ' underline' : '')}>
                        <NavLink exact={true} to='/info' className='nav-link'>Hồ sơ</NavLink>
                    </li>
                    <li className={'three' + (isActive === '/classlist' ? ' underline' : '')}>
                        <NavLink exact={true} to='/classlist' className='nav-link'>Danh sách</NavLink>
                    </li>
                    <li className='four'>
                        <NavLink exact={true} to='/' className='nav-link' onClick={() => localStorage.clear()}>Đăng xuất</NavLink>
                    </li>
                    <hr />
                </ul>
            </div>
            {/* <img></img> */}
        </nav>
    )
}

export default Navbar