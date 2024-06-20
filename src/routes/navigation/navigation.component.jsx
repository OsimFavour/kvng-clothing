import { Link, Outlet } from "react-router-dom"
import { ReactComponent as KvngLogo } from '../../assets/crown.svg'

const Navigation = () => {
    return (
      <>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <KvngLogo/>
            </Link>
            
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
            </div>
        </div>

        <Outlet />
      </>
    )
}

export default Navigation