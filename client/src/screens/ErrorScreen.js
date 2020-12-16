import React from 'react';
import BannerMessage from '../components/BannerMessage';

const ErrorScreen = ({ title, subtitle }) => {
  return <BannerMessage title={title} subtitle={subtitle} />;
};

ErrorScreen.defaultProps = {
  title: '404',
  subtitle: 'page not found',
};

export default ErrorScreen;
