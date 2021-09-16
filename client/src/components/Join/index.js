import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';

import './join.css';
import withAuth from '../../hocs/withAuth';


const Join = () => {
  const history = useHistory();
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [isRoom, setIsRoom] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/chat?${isRoom ? `room=${room}` : `username=${userName}`}`);
  };

  useEffect(() => {

  }, []);

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <form onSubmit={handleSubmit}>
          {
            isRoom ? (
              <div>
                <input
                  type="text"
                  value={room}
                  className='joinInput'
                  placeholder='Room name'
                  onChange={({ target: { value } }) => setRoom(value)}
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={userName}
                  className='joinInput'
                  placeholder='User name'
                  onChange={({ target: { value } }) => setUserName(value)}
                />
              </div>
            )
          }
          <button
            type='button'
            className='toggle'
            onClick={() => setIsRoom(!isRoom)}
          >
            {isRoom ? 'Private' : 'Room'} Chat
          </button>
          <button type="submit" className="button mt-20">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(Join);
