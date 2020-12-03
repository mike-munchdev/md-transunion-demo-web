import React, { useContext, useEffect, FC } from 'react';

import { DebtReliefAuthContext } from '../../utils/context';
import { IDebtReliefProps } from '../../components/DebtRelief';

const Logout: FC<IDebtReliefProps> = ({ formikProps }) => {
  const { signOut } = useContext(DebtReliefAuthContext);
  const { resetForm } = formikProps;
  useEffect(() => {
    resetForm();
    signOut();
  }, [signOut]);

  return <></>;
};

export default Logout;
