import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import io from 'socket.io-client';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';
import './style.css';

const socket = io('localhost:5000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [], 
      messages: [], 
      text: '', 
      name: '',
    };
  }
  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({ users }) => this.chatUpdate(users));
  }
  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
  }
  chatUpdate(users) {
    this.setState({ users });
  }
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    socket.emit('message', message);
  }
  handleUserSubmit(name) {
    this.setState({ name });
    socket.emit('join', name);
  }
  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm(); // zaimplementowane w późniejszej części
  }

  renderLayout() {
    return (
      <div className="App">
        <div className="AppHeader">App room
        </div>
        <div className="AppBody">
          <UsersList users={this.state.users} />
          <div className="MessageWrapper">
            <MessageList messages={this.state.messages} />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
    );
  }
  renderUserForm() {
    return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />;
  }
}

export default hot(module)(App);

// export default App;
