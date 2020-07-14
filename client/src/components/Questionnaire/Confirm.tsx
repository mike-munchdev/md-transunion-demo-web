import React, { FC } from 'react';
import { Segment } from 'semantic-ui-react';

import { IQuestionnaireStepsProps } from '.';
import NextStepGrid from './NextStepGrid';

const Confirm: FC<IQuestionnaireStepsProps> = ({ currentStepIndex, steps }) => {
  return (
    <Segment attached>
      <div>
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </div>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quidem
        ex quia libero similique odit facilis sunt impedit, nostrum labore ullam
        debitis? Vel nisi dicta cumque explicabo error odit minima repudiandae,
        eveniet iste modi unde dolorem nobis consectetur autem sunt illo
        molestiae quam amet? Aliquam amet cum molestiae itaque possimus est
        iste. Excepturi, ad libero saepe accusantium veritatis facere optio
        adipisci qui sit ipsa consequatur ab, odit autem quos labore unde
        accusamus id enim culpa! Expedita est, debitis laudantium soluta
        asperiores nesciunt nulla. Iure nihil quisquam veritatis eaque ea
        laboriosam iusto id ratione qui at, eum eligendi animi aliquid quam
        placeat doloribus hic a sit voluptatem fugiat amet fuga? Facere, hic.
        Tempora voluptas ab voluptatem cum consequatur provident, reprehenderit
        ad tempore natus. Maxime illum impedit harum, quidem obcaecati,
        aspernatur quae fugiat incidunt, rem nobis assumenda ipsa cum temporibus
        sapiente rerum explicabo repudiandae ratione? Quas excepturi ullam
        voluptates exercitationem at quisquam dolor illo ad, harum hic
        cupiditate provident necessitatibus illum ipsam quae numquam vel
        voluptatum natus dolores sunt aperiam tenetur labore iure et! Excepturi
        exercitationem non placeat doloremque temporibus, dolore repudiandae
        iure, provident, accusamus officiis ab numquam error maxime facere fuga
        consectetur saepe natus inventore esse suscipit labore voluptate laborum
        ipsam!
      </div>
      <NextStepGrid buttonType="submit" />
    </Segment>
  );
};

export default Confirm;
