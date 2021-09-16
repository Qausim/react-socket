import React, { useEffect, useState, } from 'react';
import { useHistory } from 'react-router';

import './chat.css';
import getSocket from '../../config/socket.config';
import withAuth from '../../hocs/withAuth';
import { computeQueryParameters } from '../../utils/url.utils';
import { getUser } from '../../store/entities/user.entity';
import styled from 'styled-components';
import { format } from 'date-fns';


const Wrapper = styled.div`
  .message-wrapper {
    width: 50%;
    display: flex;
    margin-top: auto;
    margin-left: auto;
    align-items: center;
    position: fixed;
    bottom: 16px;
    right: 16px;
    box-shadow: 0 0 8px grey;
  }

  .message-wrapper, .message-wrapper > * {
    border: none;
  }

  .message-wrapper > * {
    margin: 0px;
  }
  
  .message-wrapper input {
    flex: 3;
  }
  
  .messages-wrapper {
    width: 80%;
    margin-bottom: auto;
  }
  
  .message-box + .message-box {
    margin-top: 32px;
  }
`;

const MessageBox = styled.div`
  & {
    color: #000000;
    background: #ffffff;
    border-radius: 8px;
    padding: 8px;
    width: 65%;
    margin-left: ${props => props.thisUser ? 'auto' : '0px'};
    margin-right: ${props => props.thisUser ? '0px' : 'auto'};
  }
  
  & > * {
    margin: 0px;
  }

  .sender-name {
    font-weight: bold;
    margin-bottom: 16px;
    color: ${props => props.thisUser ? 'blue' : 'brown'};
  }

  & > p + p {
    margin-top: 8px;
  }

  .time-sent {
    width: fit-content;
    margin-left: auto;
    font-size: 12px;
    color: grey;
  }
`;

const Chat = () => {
  // let socket;
  const user = getUser();
  const { location } = useHistory();
  const [socket] = useState(getSocket(user.token));
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { username, room } = computeQueryParameters(location.search) || {};
  const isPrivate = username && !room;
  console.log({socket});

  useEffect(() => {
    socket.on('connect_error', (error) => {
      console.log({error});
    });

    // socket.emit('join', { name, room }, ({ error }) => alert(error));
    // socket.emit('message', { userName: name, roomId }, ({error}) => alert(error));
    if (isPrivate) {
      socket.on('private_message', (msg) => setMessages([...messages, msg]));
      socket.on('private_messages', (messages) => setMessages(messages));
    }

    socket.on('error', (error) => {
      console.log({error});
    });

    socket.on('joined', ({ roomId }) => {
      console.log({roomId});
      setRoomId(roomId);
    });
  }, [messages, isPrivate, socket]);
  
  useEffect(() => {
    // get messages
    if (isPrivate) {
      socket.emit('getMessages', {userName: username});
    }
  }, [socket, username, isPrivate]);
  
  useEffect(() => {
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [socket]);

  const sendMessage = () => {
    if (isPrivate) {
      socket.emit('sendMessage', {message, userName: username}, () => setMessage(''));
    }
  }

  return (
    <Wrapper className='outerContainer'>
      <div className='messages-wrapper'>
        {
          messages.map((message) => {
            return (
              <MessageBox className='message-box' key={message.id} thisUser={ user.user_name === message.sender.user_name }>
                <p className='sender-name'>{message.sender.user_name}</p>
                <p className='message'>{message.message}</p>
                <p className='time-sent'>{format(new Date(message.created_at), 'dd/MM/yyyy hh:mm a')}</p>
              </MessageBox>
            );
          })
        }
      </div>
      <div className='message-wrapper'>
        <input
          autoFocus
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {/* <button onClick={getMessages} style={{marginTop: 16}}>Get Messages</button> */}
    </Wrapper>
  );
};

export default withAuth(Chat);
