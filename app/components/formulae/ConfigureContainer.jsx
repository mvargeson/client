import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import Configure from './Configure.jsx';
import Sidebar from '../Sidebar.jsx';
import InfoSidebar from './InfoSidebar.jsx';

class ConfigureContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      loading: true,
      selectedAction: null,
      selectedReaction: null,
      formula: {
        name: '',
        action_fields: {},
        reaction_fields: {},
      },
    };

    this.handleName = this.handleName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        selectedAction: {
          id: this.props.params.actionId,
          channel: 'gmail',
          name: 'new-important',
          fields: [],
        },
        selectedReaction: {
          id: this.props.params.reactionId,
          channel: 'twilio',
          name: 'sms',
          fields: [{
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
          }, {
            name: 'message',
            type: 'text',
            label: 'Message',
          }],
        },
      });
    }, 250);
  }

  onSave() {
    const formula = {
      name: '',
      action_channel: 'gmail',
      action_name: 'new-important',
      action_fields: JSON.stringify(this.state.formula.action_fields),
      reaction_channel: 'twilio',
      reaction_name: 'sms',
      reaction_fields: JSON.stringify(this.state.formula.reaction_fields),
      user_id: localStorage.getItem('user.id'),
    };

    fetch('/api/v1/formulae', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formula),
    })
    .then(() => {
      hashHistory.push('/dashboard');
    })
    .catch(err => {
      // TODO: give error feedback in UI
      console.error(err);
    });
  }

  handleName(name) {
    this.setState({ formula: { ...this.state.formula, name } });
  }

  handleChange(formulaPart, fieldName, fieldValue) {
    // TODO: state should be treated as immutable
    this.state.formula[`${formulaPart}_fields`][fieldName] = fieldValue;
  }

  render() {
    if (this.state.loading) {
      return (<div>loading...</div>);
    }
    return (
      <div>
        <Configure
          selectedAction={this.state.selectedAction}
          selectedReaction={this.state.selectedReaction}
          formula={this.state.formula}
          handleName={this.handleName}
          handleChange={this.handleChange}
          valid={this.state.valid}
          onSave={this.onSave}
        />
        <Sidebar>
          <InfoSidebar
            title="About Configuration"
            linkPath="/dashboard"
            linkLabel="cancel"
          >
            <p>
              These settings create a simple configuration for your formula.
              They show the options you have per service.
            </p>
          </InfoSidebar>
        </Sidebar>
      </div>
    );
  }
}

ConfigureContainer.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ConfigureContainer;
