import { Component, PropTypes } from 'react';

class RsvpContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func,
  };

  state = {
    code: '',
  };

  getChildContext() {
    return {
      code: this.code,
      setCode: this.setCode,
    };
  }

  setCode = code => this.setState({ code });
  get code() {
    return this.state.code || '';
  }

  render = () => this.props.children;
}

export default RsvpContext;
