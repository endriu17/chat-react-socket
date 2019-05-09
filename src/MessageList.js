import React from 'react';
import './style.css';

const Message = props => (
  <div className="Message">
    <h4 className="MessageHeader">{props.from} :</h4>
    <span className="MessageText">{props.text}</span>
  </div>
);

const MessageList = props => (
  <div className="MessageList">
    {props.messages.map((message, i) => {
      return <Message key={i} from={message.from} text={message.text} />;
    })}
  </div>
);

export default MessageList;
