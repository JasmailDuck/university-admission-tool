import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Needed helper class to be able to redirect user to a specific page using react-router-dom v6
// it is a wrapper function.
export const withRouter = (Component) => {
    const Wrapper = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      
      return (
        <Component
          navigate={navigate}
          router={{location, navigate, params}}
          {...props}
          />
      );
    };
    
    return Wrapper;
  };