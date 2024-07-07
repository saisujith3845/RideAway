import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
  return (
    <div id='homeBackground'className='d-flex flex-column vw-100 vh-100 container-fluid justify-content-center align-items-center bg-light border-dark'>
      <div className='container-fluid d-flex flex-column justify-content-center align-items-center'>
        <h1 className='display-1 text-light'>Ride Away</h1>
      </div>
      <div className='container-fluid d-flex flex-column justify-content-center align-items-center'>
        <p className='fs-4 fw-lighter text-light'>Premium car & bike rental platform</p>
      </div>
      <div className='container-fluid d-flex justify-content-center align-items-center'>
        <Link to='/login' className='btn btn-warning btn-lg btn-md m-2'>Login</Link>
        <Link to='/register' className='btn btn-light btn-lg btn-md m-2'>Register</Link>
      </div>
      <Outlet />
    </div>
  );
}
