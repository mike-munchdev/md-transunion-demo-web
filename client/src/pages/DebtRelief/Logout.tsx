import React, { useContext, useEffect } from 'react';

import { DebtReliefAuthContext } from '../../utils/context';

const Logout: React.FC = () => {
  const { signOut } = useContext(DebtReliefAuthContext);
  useEffect(() => {
    console.log('Logout page: signOut');
    signOut();
  }, [signOut]);

  return <></>;
};

export default Logout;
