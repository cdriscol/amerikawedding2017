import React, { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import ClientOnly from '../../components/ClientOnly';
import styles from './LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  options = {
    sectionClassName: 'container',
    anchors: ['home', 'rsvp'],
    scrollBar: false,
    navigation: false,
    verticalAlign: false,
    arrowNavigation: false,
    scrollCallback: (states) => this.setState({ current: states.activeSection }),
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <ClientOnly>
          <SectionsContainer className="container" {...this.options} activeSection={current}>
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
