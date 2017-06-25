import { Component, PropTypes } from 'react';
// import callApi from '../../../../util/apiCaller';

class RsvpContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func,
    row: PropTypes.object,
    setRow: PropTypes.func,
  };

  state = {
    code: '',
    row: null,
  };

  getChildContext() {
    return {
      code: this.code,
      setCode: this.setCode,
      row: this.row,
      setRow: this.setRow,
    };
  }

  setCode = code => this.setState({ code });
  setRow = row => this.setState({ row });

  get code() {
    return this.state.code || '';
  }

  get row() {
    return this.state.row;
  }

  render = () => this.props.children;
}

export default RsvpContext;
