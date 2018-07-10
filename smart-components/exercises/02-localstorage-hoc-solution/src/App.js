import React, { Component } from 'react';
import logo from './logo.svg';
import withStorage from './hocs/withStorage';
import './App.css';

class Input extends React.Component {
  render() {
    const { load, save, remove, innerRef, ...rest } = this.props;
    return <input {...rest} ref={(elm) => this.elm = elm} />;
  } 
}

const InputWithStorage = withStorage(Input);

class App extends Component {
  static storageKey = '__AppData__';

  nameInput = null;

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

    if (this.nameInput) {
      this.nameInput.elm.focus();
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


  setNameRef = (elm) => {
    this.nameInput = elm;
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
              <InputWithStorage
                innerRef={this.setNameRef}
                value={this.state.name}
                onChange={this.handleNameUpdate}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <InputWithStorage
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
