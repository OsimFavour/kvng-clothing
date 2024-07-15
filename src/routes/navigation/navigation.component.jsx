import { useContext } from 'react'
import { Link, Outlet } from "react-router-dom"
import { UserContext } from '../../contexts/user.context'
import { ReactComponent as KvngLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    // console.log(currentUser);

    return (
      <>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <KvngLogo className="logo" />
            </Link>
            
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>

                { currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>
                        SIGN OUT
                    </span>
                ) : (
                    <Link className="nav-link" to='/auth'>
                        SIGN IN
                    </Link>
                )}

            </div>
            
        </div> 

        <Outlet />
      </>
    )
}

export default Navigation