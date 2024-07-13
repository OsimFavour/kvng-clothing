import './navigation.styles.scss'
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as KvngLogo } from '../../assets/crown.svg'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'

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
                    <span className='nav-link'>
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