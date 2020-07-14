import React, { FC } from 'react';
import { Grid, Form } from 'semantic-ui-react';

interface INextStepProps {
  handleClick?: Function;
  buttonType?: string;
}
const NextStepGrid: FC<INextStepProps> = ({ handleClick, buttonType }) => {
  return (
    <Grid textAlign="right">
      <Grid.Column>
        {buttonType === 'submit' ? (
          <Form.Button type="submit">Submit</Form.Button>
        ) : (
          <Form.Button
            onClick={() => {
              if (handleClick) handleClick();
            }}
          >
            Next Step
          </Form.Button>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default NextStepGrid;
