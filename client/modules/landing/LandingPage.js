import React, { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import ClientOnly from '../../components/ClientOnly';

class LandingPage extends Component {
  options = {
    sectionClassName: 'section',
    anchors: ['splash', 'rsvp'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true,
  };

  render() {
    return (
      <div>
        <ClientOnly>
          <SectionsContainer {...this.options}>
            <Section>
              <div>Top section</div>
            </Section>
            <Section>
              <div>Bottom section</div>
            </Section>
          </SectionsContainer>
        </ClientOnly>
      </div>
    );
  }
}

export default LandingPage;
