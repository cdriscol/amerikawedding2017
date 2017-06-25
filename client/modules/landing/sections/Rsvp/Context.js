import { Component, PropTypes } from 'react';
import callApi from '../../../../util/apiCaller';

class RsvpContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func,
    row: PropTypes.object,
    setRow: PropTypes.func,
    setCount: PropTypes.func,
    setMessage: PropTypes.func,
    updateGuest: PropTypes.func,
  };

  state = {
    code: '',
    row: null,
    submitted: false,
    submitting: false,
    error: null,
  };

  getChildContext() {
    return {
      code: this.code,
      setCode: this.setCode,
      row: this.row,
      setRow: this.setRow,
      submitted: this.submitted,
      submitting: this.submitting,
      error: this.error,
      fetchRsvp: this.fetchRsvp,
      postRsvp: this.postRsvp,
      setCount: this.setCount,
      updateGuest: this.updateGuest,
      setMessage: this.setMessage,
    };
  }

  setMessage = message => {
    const { row } = this.state;
    row.message = message;
    this.setState({ row });
  };
  setCode = code => this.setState({ code, error: null });
  setRow = row => this.setState({ row });
  setCount = count => {
    const { row } = this.state;
    row.count = Number(count);
    this.setState({ row });
  };
  updateGuest = (index, value) => {
    const { row } = this.state;
    if (!row.attending) row.attending = [];
    for (let i = 0; i < row.count; i++) {
      if (row.attending.length <= i) row.attending.push('');
    }
    row.attending[index] = value;
    this.setState({ row, error: null });
  };
  fetchRsvp = () => {
    const { code } = this.state;
    if (code) {
      callApi(`rsvp/${code}`)
        .then(newRow => {
          this.setState({ row: newRow, submitted: false });
        })
        .catch(rawError => {
          let error = 'Something went wrong.. try again later.';
          if (rawError.status === 404) error = 'Code not found..';
          this.setState({ error, submitted: true });
        });
    } else {
      this.setState({ submitted: true });
    }
  };
  postRsvp = () => {};

  get code() {
    return this.state.code || '';
  }

  get row() {
    return this.state.row;
  }

  get submitted() {
    return this.state.submitted;
  }

  get submitting() {
    return this.state.submitting;
  }

  get error() {
    return this.state.error;
  }

  render = () => this.props.children;
}

export default RsvpContext;
