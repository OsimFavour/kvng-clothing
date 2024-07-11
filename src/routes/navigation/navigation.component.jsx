import './navigation.styles.scss'
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as KvngLogo } from '../../assets/crown.svg'

const Navigation = () => {
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

                <Link className="nav-link" to='/auth'>
                    SIGN IN
                </Link>
            </div>
            
        </div> 

        <Outlet />
      </>
    )
}

export default Navigation