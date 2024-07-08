import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSpring, animated, config } from 'react-spring';

const Home = () => {
  // Title animation
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.wobbly,
  });

  // Subtitle animation
  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: config.default,
    delay: 300,
  });

  // Button container animation
  const buttonContainerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.default,
    delay: 600,
  });

  // Button hover animation
  const buttonHoverProps = {
    from: { scale: 1 },
    to: { scale: 1.1 },
    config: config.default,
  };

  return (
    <div id='homeBackground' className='d-flex flex-column vw-100 vh-100 container-fluid justify-content-center align-items-center bg-light border-dark'>
      <animated.div style={titleAnimation} className='container-fluid d-flex flex-column justify-content-center align-items-center'>
        <h1 className='display-1 text-light'>Ride Away</h1>
      </animated.div>
      <animated.div style={subtitleAnimation} className='container-fluid d-flex flex-column justify-content-center align-items-center'>
        <p className='fs-4 fw-lighter text-light'>Premium car & bike rental platform</p>
      </animated.div>
      <animated.div style={buttonContainerAnimation} className='container-fluid d-flex justify-content-center align-items-center'>
        <Link to='/login'>
          <animated.button style={buttonHoverProps} className='btn btn-warning btn-lg btn-md m-2'>
            Login
          </animated.button>
        </Link>
        <Link to='/register'>
          <animated.button style={buttonHoverProps} className='btn btn-light btn-lg btn-md m-2'>
            Register
          </animated.button>
        </Link>
      </animated.div>
    </div>
  );
};

export default Home;
