import React, { useState, FC } from 'react';
import { Segment, Form, Header, Message } from 'semantic-ui-react';

import DebtReliefNavigationControl from './DebtReliefNavigationControl';

interface IContentProps {
  title: string;
  handleNextClick?: Function;
  handlePreviousClick?: Function;
  submit?: boolean;
  showLorem?: boolean;
  isFirstStep: boolean;
}
const Content: FC<IContentProps> = ({
  title,
  handleNextClick,
  handlePreviousClick,
  submit,
  showLorem,
  isFirstStep,
}) => {
  const [value] = useState(null);
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];
  const handleChange = () => {};
  return (
    <Segment attached>
      <Header size="medium">{title}</Header>
      {showLorem ? (
        <Message>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quidem
          ex quia libero similique odit facilis sunt impedit, nostrum labore
          ullam debitis? Vel nisi dicta cumque explicabo error odit minima
          repudiandae, eveniet iste modi unde dolorem nobis consectetur autem
          sunt illo molestiae quam amet? Aliquam amet cum molestiae itaque
          possimus est iste. Excepturi, ad libero saepe accusantium veritatis
          facere optio adipisci qui sit ipsa consequatur ab, odit autem quos
          labore unde accusamus id enim culpa!
        </Message>
      ) : null}
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="First name" placeholder="First name" />
          <Form.Input fluid label="Last name" placeholder="Last name" />
          <Form.Select
            fluid
            label="Gender"
            options={options}
            placeholder="Gender"
          />
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label="Small"
            value="sm"
            checked={value === 'sm'}
            onChange={() => {
              handleChange();
            }}
          />
          <Form.Radio
            label="Medium"
            value="md"
            checked={value === 'md'}
            onChange={() => {
              handleChange();
            }}
          />
          <Form.Radio
            label="Large"
            value="lg"
            checked={value === 'lg'}
            onChange={() => {
              handleChange();
            }}
          />
        </Form.Group>
        <Form.TextArea label="About" placeholder="Tell us more about you..." />
        <Form.Checkbox label="I agree to the Terms and Conditions" />
      </Form>
      <DebtReliefNavigationControl
        submit={submit}
        isFirstStep={isFirstStep}
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
      />
    </Segment>
  );
};

export default Content;
