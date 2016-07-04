import React, { PropTypes } from 'react';

const Configure = ({
  selectedAction,
  selectedReaction,
  formula,
  handleName,
  handleChange,
  valid,
  onSave,
}) => (
  <div className="space-top nine columns componentContainer row">
    <h3>Name your formula ({formula.name})</h3>
    <input
      value={formula.name}
      onChange={(e) => { handleName(e.target.value); }}
    />

    <h3>{selectedAction && selectedAction.name} Fields</h3>
    {selectedAction.fields.length < 1 ?
      <div>
        <p className="small">There are no fields for this action</p>
      </div> :
      selectedAction.fields.map((field, index) => (
        <div key={index}>
          <h3>{field.name}</h3>
          <input
            value={formula.action_fields[field] || ''}
            onChange={(e) => { handleChange('action', field.name, e.target.value); }}
          />
          <span className="divider" />
        </div>
      ))
    }

    <h3>{selectedReaction && selectedReaction.name} Fields</h3>
    {selectedReaction.fields.length < 1 ?
      <div>
        <p className="small">There are no fields for this reaction</p>
      </div> :
      selectedReaction.fields.map((field, index) => (
        <div key={index}>
          <h3>{field.name}</h3>
          <input
            value={formula.reaction_fields[field] || ''}
            onChange={(e) => { handleChange('reaction', field.name, e.target.value); }}
          />
          <span className="divider" />
        </div>
      ))
    }

    {valid ? null : <p>please fill out all required fields.</p>}
    <a className="button" onClick={onSave}>save</a>
  </div>
);

Configure.propTypes = {
  selectedAction: PropTypes.object.isRequired,
  selectedReaction: PropTypes.object.isRequired,
  formula: PropTypes.object.isRequired,
  handleName: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Configure;
