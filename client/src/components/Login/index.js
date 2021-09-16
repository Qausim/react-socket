import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import apiClient from '../../config/axios.config';
import { updateUser } from '../../store/entities/user.entity';
import { resolveApiError } from '../../utils/error.utils';
import { computeQueryParameters } from '../../utils/url.utils';


const Wrapper = styled.div`
  &, form, .input-group {
    display: flex;
    color: #ffffff;
  }

  & {
    min-width: 100vw;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  form, .input-group {
    flex-direction: column;
  }

  .input-group + .input-group {
    margin-top: 16px;
  }

  label {
    margin-bottom: 8px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { next } = computeQueryParameters(location.search) || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { data } } = await apiClient.post('/auth/signin', { email, password });
      updateUser(data);
      history.replace(next || '/');
    } catch (error) {
      if (error)
      alert(resolveApiError(error));
    }
  };

  return (
    <Wrapper className='outerContainer'>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </Wrapper>
  );
};
 
export default Login;