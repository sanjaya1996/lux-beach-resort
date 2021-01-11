import React from 'react';

const Loading = ({ small }) => {
  return (
    <div className={`loading ${small && 'small-loading'}`}>
      {!small && <h4>loading...</h4>}
      <img src='/images/gif/loading-arrow.gif' alt='loading...' />
    </div>
  );
};

export default Loading;
