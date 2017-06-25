import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import GuestInput from './GuestInput';

export default class RsvpGuestInputs extends Component {
  static contextTypes = {
    size: PropTypes.number,
    count: PropTypes.number,
    updateGuest: PropTypes.func.isRequired,
    setCount: PropTypes.func.isRequired,
  };

  handleGuestSelection = ({ target: { value } }) => {
    this.context.setCount(value);
  };

  renderGuestOptions = () => {
    const { size } = this.context;
    const options = [];
    for (let i = 0; i <= size; i++) {
      let value = 'I will not be attending';
      if (i > 0) value = `${i} guest${i > 1 ? 's' : ''}`;
      options.push(<option key={i} value={i}>{value}</option>);
    }
    return options;
  };

  renderGuestInputs = () => {
    const { count } = this.context;
    const guestInputs = [];
    for (let i = 0; i < count; i++) {
      guestInputs.push(<GuestInput key={i} index={i} />);
    }
    return guestInputs;
  };

  render() {
    const { size, count } = this.context;
    return (
      <div ref={e => { this.wrapper = e; }}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Counting yourself, how many guests total are you RSVPing for?</ControlLabel>
          <FormControl value={count} componentClass="select" placeholder="select" onChange={this.handleGuestSelection}>
            {this.renderGuestOptions(size)}
          </FormControl>
        </FormGroup>
        {count ? <h4>List guests</h4> : null}
        {this.renderGuestInputs()}
      </div>
    );
  }
}
