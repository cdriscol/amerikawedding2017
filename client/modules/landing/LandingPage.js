import React, { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import ClientOnly from '../../components/ClientOnly';
import styles from './LandingPage.css';
import { HomeSection } from './sections';
import RsvpSection from './sections/Rsvp';
import RsvpContext from './sections/Rsvp/Context';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  options = {
    sectionClassName: 'sections',
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
          <div>
            <SectionsContainer {...this.options} activeSection={current}>
              <Section className={styles.section__home}>
                <HomeSection />
              </Section>
              <Section className={styles.section__rsvp}>
                <RsvpContext>
                  <RsvpSection />
                </RsvpContext>
              </Section>
            </SectionsContainer>
          </div>
        </ClientOnly>
      </div>
    );
  }
}

export default LandingPage;
