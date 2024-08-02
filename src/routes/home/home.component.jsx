import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";
import { Fragment } from "react";

const Home = () => {

  

  return (
    <Fragment>

      <Directory/>
      <Outlet />
    </Fragment>
  );
}

export default Home;
