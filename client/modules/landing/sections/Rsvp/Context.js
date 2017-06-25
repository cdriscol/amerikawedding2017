import { Component, PropTypes } from 'react';
import callApi from '../../../../util/apiCaller';
import get from 'lodash/get';

class RsvpContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func,
    codeError: PropTypes.string,
    row: PropTypes.object,
    setCount: PropTypes.func,
    count: PropTypes.number,
    size: PropTypes.number,
    message: PropTypes.string,
    names: PropTypes.string,
    setMessage: PropTypes.func,
    updateGuest: PropTypes.func,
    attending: PropTypes.arrayOf(PropTypes.string),
    submitted: PropTypes.bool,
    submitting: PropTypes.bool,
    successMessage: PropTypes.string,
    error: PropTypes.string,
    fetchRsvp: PropTypes.func,
    postRsvp: PropTypes.func,
    codeConfirmed: PropTypes.bool,
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
      submitted: this.submitted,
      submitting: this.submitting,
      error: this.error,
      fetchRsvp: this.fetchRsvp,
      postRsvp: this.postRsvp,
      setCount: this.setCount,
      count: this.count,
      size: this.size,
      updateGuest: this.updateGuest,
      setMessage: this.setMessage,
      codeError: this.codeError,
      successMessage: this.successMessage,
      message: this.message,
      attending: this.attending,
      codeConfirmed: this.codeConfirmed,
      names: this.names,
    };
  }

  setMessage = message => {
    const { row } = this.state;
    row.message = message;
    this.setState({ row });
  };
  setCode = code => this.setState({ code, error: null });
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
  postRsvp = () => {
    const { code, row } = this.state;
    if (row.count) {
      for (let i = 0; i < row.count; i++) {
        if (!row.attending[i]) {
          this.setState({ error: 'You must list your guests' });
          return;
        }
      }
    }

    callApi(`rsvp/${code}`, 'post', row)
      .then(() => {
        this.setState({ successMessage: 'Done!' });
      })
      .catch(e => {
        console.error(e);
        const error = 'Something went wrong.. try again later.';
        this.setState({ error, successMessage: null });
      });
  };

  get count() {
    return Number(get(this.state, 'row.count', 0));
  }

  get size() {
    return Number(get(this.state, 'row.size', 0));
  }

  get message() {
    return get(this.state, 'row.message', '');
  }

  get names() {
    return get(this.state, 'row.names', '');
  }

  get attending() {
    return get(this.state, 'row.attending', []) || [];
  }

  get code() {
    return this.state.code || '';
  }

  get codeError() {
    const { submitted, code } = this.state;
    if (submitted && !code) return 'A code is required';
    return null;
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

  get successMessage() {
    return this.state.successMessage;
  }

  get error() {
    return this.state.error;
  }

  get codeConfirmed() {
    return !!this.state.row;
  }

  render = () => this.props.children;
}

export default RsvpContext;
