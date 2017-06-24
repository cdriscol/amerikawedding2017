import React, { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import ClientOnly from '../../components/ClientOnly';
import styles from './LandingPage.css';

class LandingPage extends Component {
  options = {
    sectionClassName: 'section',
    anchors: ['home', 'rsvp'],
    verticalCentered: true,
    scrollingSpeed: 700,
    navigation: false,
  };

  render() {
    return (
      <div>
        <ClientOnly>
          <SectionsContainer {...this.options}>
            <Section className={styles.section__home}>
              <div></div>
            </Section>
            <Section className={styles.section__rsvp}>
              <div></div>
            </Section>
          </SectionsContainer>
        </ClientOnly>
      </div>
    );
  }
}

export default LandingPage;
