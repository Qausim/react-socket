import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getUser } from '../../store/entities/user.entity';


const withAuth = (WrappedComponent) => (props) => {
  const user = getUser();
  const history = useHistory();
  
  useEffect(() => {
    if (!user) history.replace(`/login?next=${history.location.pathname}`);
  }, [history, user]);

  return <WrappedComponent {...props} />;
};
 
export default withAuth;
