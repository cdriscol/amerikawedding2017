import { Component, PropTypes } from 'react';

export class ClientOnly extends Component {
  render() {
    if (process.title !== 'browser') return null;
    return this.props.children;
  }
}

ClientOnly.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ClientOnly;
