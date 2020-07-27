import React, { FC } from 'react';
import { Grid, Form } from 'semantic-ui-react';

interface INextStepProps {
  handleNextClick?: Function;
  handlePreviousClick?: Function;
  submit?: boolean;
  isFirstStep?: boolean;
  nextStepButtonText?: string;
  nextStepDisabled?: boolean;
  prevStepDisabled?: boolean;
}
const NextStepGrid: FC<INextStepProps> = ({
  handleNextClick,
  handlePreviousClick,
  isFirstStep,
  submit,
  nextStepButtonText,
  nextStepDisabled,
  prevStepDisabled,
}) => {
  return (
    <Grid className="mt-1">
      <Grid.Column floated="left" width={5}>
        {isFirstStep ? null : (
          <Form.Button
            disabled={prevStepDisabled}
            type="button"
            onClick={() => {
              if (handlePreviousClick) handlePreviousClick();
            }}
          >
            Previous Step
          </Form.Button>
        )}
      </Grid.Column>
      <Grid.Column floated="right" textAlign="right" width={5}>
        {submit ? (
          <Form.Button disabled={nextStepDisabled} type="submit">
            Submit
          </Form.Button>
        ) : (
          <Form.Button
            disabled={nextStepDisabled}
            onClick={() => {
              if (handleNextClick) handleNextClick();
            }}
          >
            {nextStepButtonText || 'Next Step'}
          </Form.Button>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default NextStepGrid;
