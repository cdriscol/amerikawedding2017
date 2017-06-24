import React, { Component } from 'react';
import Section from '../../components/section/Section';

class LandingPage extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Section>
          <div>Top section</div>
        </Section>
        <Section>
          <div>Bottom section</div>
        </Section>
      </div>
    );
  }
}

export default LandingPage;
