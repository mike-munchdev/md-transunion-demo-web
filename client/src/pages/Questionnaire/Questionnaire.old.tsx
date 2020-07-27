import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Step, Button, Segment, Grid } from 'semantic-ui-react';

interface IStep {
  title: string;
  description: string;
  slug: string;
}
const Questionnaire = (props: any) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { step } = useParams();
  const history = useHistory();

  const steps: IStep[] = [
    {
      title: 'Welcome',
      description: 'Start New Debt Comparison',
      slug: 'welcome',
    },
    {
      title: 'Account Creation',
      description: 'Enter Account information',
      slug: 'account',
    },
    {
      title: 'Creditors',
      description: 'Start New Debt Comparison',
      slug: 'creditors',
    },
    {
      title: 'Budget',
      description: 'Start New Debt Comparison',
      slug: 'budget',
    },
    {
      title: 'Personal Information',
      description: 'Start New Debt Comparison',
      slug: 'personal-info',
    },
    {
      title: 'Payment Setup',
      description: 'Start New Debt Comparison',
      slug: 'payment-setup',
    },
    {
      title: 'Documents',
      description: 'Start New Debt Comparison',
      slug: 'documents',
    },
  ];
  useEffect(() => {
    console.log('step', step);

    const stepIndex = steps.findIndex((s) => s.slug === step);
    console.log('stepIndex', stepIndex);
    setCurrentStepIndex(stepIndex);
  }, []);

  //   useEffect(() => {
  //     console.log('useEffect', currentStepIndex);
  //   }, [currentStepIndex]);

  const renderStep = (s: IStep) => {
    return (
      <Step active={steps[currentStepIndex].slug === s.slug}>
        <Step.Content>
          <Step.Title>{s.title}</Step.Title>
        </Step.Content>
      </Step>
    );
  };

  const setNextStep = () => {
    if (currentStepIndex + 1 < steps.length) {
      console.log('setNextStep', currentStepIndex, steps.length);
      console.log(`/questionnaire/${steps[currentStepIndex + 1].slug}`);
      history.replace(`/questionnaire/${steps[currentStepIndex + 1].slug}`);
    }
  };
  return (
    <Fragment>
      <Step.Group ordered attached="top" size="tiny" widths={7}>
        {steps.map((s) => renderStep(s))}
      </Step.Group>
      <Segment attached>
        <div>
          {currentStepIndex >= 0
            ? steps[currentStepIndex].title.toUpperCase()
            : ''}
        </div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quidem
          ex quia libero similique odit facilis sunt impedit, nostrum labore
          ullam debitis? Vel nisi dicta cumque explicabo error odit minima
          repudiandae, eveniet iste modi unde dolorem nobis consectetur autem
          sunt illo molestiae quam amet? Aliquam amet cum molestiae itaque
          possimus est iste. Excepturi, ad libero saepe accusantium veritatis
          facere optio adipisci qui sit ipsa consequatur ab, odit autem quos
          labore unde accusamus id enim culpa! Expedita est, debitis laudantium
          soluta asperiores nesciunt nulla. Iure nihil quisquam veritatis eaque
          ea laboriosam iusto id ratione qui at, eum eligendi animi aliquid quam
          placeat doloribus hic a sit voluptatem fugiat amet fuga? Facere, hic.
          Tempora voluptas ab voluptatem cum consequatur provident,
          reprehenderit ad tempore natus. Maxime illum impedit harum, quidem
          obcaecati, aspernatur quae fugiat incidunt, rem nobis assumenda ipsa
          cum temporibus sapiente rerum explicabo repudiandae ratione? Quas
          excepturi ullam voluptates exercitationem at quisquam dolor illo ad,
          harum hic cupiditate provident necessitatibus illum ipsam quae numquam
          vel voluptatum natus dolores sunt aperiam tenetur labore iure et!
          Excepturi exercitationem non placeat doloremque temporibus, dolore
          repudiandae iure, provident, accusamus officiis ab numquam error
          maxime facere fuga consectetur saepe natus inventore esse suscipit
          labore voluptate laborum ipsam!
        </div>
        <Grid textAlign="right">
          <Grid.Column>
            <Button
              onClick={() => {
                setNextStep();
              }}
            >
              Next Step
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default Questionnaire;
