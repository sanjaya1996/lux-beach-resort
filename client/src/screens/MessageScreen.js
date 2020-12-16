import React from 'react';

import BannerMessage from '../components/BannerMessage';

const SuccessScreen = ({ match }) => {
  const { title, message } = match.params;
  return <BannerMessage title={title} subtitle={message} />;
};

export default SuccessScreen;
