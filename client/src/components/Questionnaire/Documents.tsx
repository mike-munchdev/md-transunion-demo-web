import React, { FC, useMemo, CSSProperties, useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { IQuestionnaireStepsProps } from '.';

import {
  Segment,
  Header,
  Message,
  Form,
  Grid,
  Button,
  List,
  Icon,
} from 'semantic-ui-react';
import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import CalculationsTable from './CalculationsTable';
import { DebtReliefContext } from '../../utils/context';

const baseStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Documents: FC<IQuestionnaireStepsProps> = ({
  stepIndex,
  steps,

  formikProps,
}) => {
  const history = useHistory();
  const { currentStepIndex, setCurrentStepIndexContext } = useContext(
    DebtReliefContext
  );
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = (files: File[]) => {
    const newFiles = [...acceptedFiles, ...files];
    setAcceptedFiles(newFiles);
  };

  const onDelete = (index: number) => {
    const newFiles = [...acceptedFiles];
    newFiles.splice(index, 1);
    setAcceptedFiles(newFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });
  const style: CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const { values } = formikProps;
  const { creditors } = values;

  const isStepInvalid = () => {
    return false;
  };

  return (
    <Segment attached>
      <Header size="medium">
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </Header>
      <p>
        <strong>
          This is the section where you can request, view, or sign a contract.
          This is also where you can add supporting documentation such as pay
          stubs, current statements, letters from creditors, etc. These
          supporting documents can be added by clicking the "I have another
          document to upload" button. If you would like to review the documents
          you have uploaded you can click the View button for the document. If
          you have uploaded an incorrect file you can also remove them by
          clicking the Remove button for the document.
        </strong>
      </p>
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button
                primary
                content="Generate Contract"
                icon="file alternate"
                labelPosition="left"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Message>
                <Header as="h5">Contracts</Header>Your contract is ready to
                view, or download. If you have troubles with the View My
                Contract link below please right click on the link and picking
                "Save As..." and save the PDF to your computer.
                <p>View My Contract</p>
                <p>
                  Please print, review, and sign the contract. You can send the
                  signed contracts to us via these options:
                </p>
              </Message>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <label className="form-label">Supporting Documents</label>
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                    <List divided relaxed>
                      {acceptedFiles.map((f: File, index: number) => (
                        <List.Item key={index.toString()}>
                          <List.Content floated="left">
                            <Icon
                              size="small"
                              name={
                                f.type.startsWith('image/') ? 'picture' : 'file'
                              }
                            />
                          </List.Content>
                          <List.Content floated="right">
                            <Button
                              size="small"
                              circular
                              color="red"
                              icon="times circle outline"
                              onClick={() => onDelete(index)}
                            />
                          </List.Content>

                          <List.Header>{`${f.name} (${(f.size / 1024).toFixed(
                            1
                          )} KB)`}</List.Header>
                        </List.Item>
                      ))}
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <QuestionnaireNavigationControl
        submit={currentStepIndex === steps.length - 1}
        isFirstStep={currentStepIndex === 0}
        handleNextClick={() => {
          history.push(`/debtrelief/${steps[currentStepIndex + 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex + 1);
        }}
        handlePreviousClick={() => {
          history.push(`/debtrelief/${steps[currentStepIndex - 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex - 1);
        }}
        nextStepButtonText="Save &amp; Continue"
        nextStepDisabled={isStepInvalid()}
      />
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default Documents;
