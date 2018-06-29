import React, { Component } from 'react';
import logo from './logo.svg';
import withStorage from './hocs/withStorage';
import './App.css';

class App extends Component {
  static storageKey = '__AppData__';
  state = {
    name: '',
    email: '',
  };

  componentDidMount() {
    const result = this.props.load(App.storageKey);
    if (result) {
      const formData = JSON.parse(result);
      this.setState(formData);
    }
  }

  handleNameUpdate = (event) => this.setState({ name: event.target.value });

  handleEmailUpdate = (event) => this.setState({ email: event.target.value });

  handleSave = () => this.props.save(App.storageKey, JSON.stringify(this.state));

  handleDelete = () => {
    this.props.remove(App.storageKey);
    this.setState({
      name: '',
      email: '',
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Local Storage Form</h1>
        </header>
        <form>
          <div>
            <label>
              Name:
              <input
                value={this.state.name}
                onChange={this.handleNameUpdate}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleEmailUpdate}
              />
            </label>
          </div>
          <button
            type="button"
            onClick={this.handleSave}
          >
            Save
          </button>
          <button
            type="button"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

export default withStorage(App);
