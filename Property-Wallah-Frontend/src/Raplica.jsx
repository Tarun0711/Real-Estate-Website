import React, { useEffect, useState } from 'react';

const PageReplica = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/page-replica.txt')
      .then(response => response.text())
      .then(text => setContent(text));
  }, []);

  return (
    <div>
      <pre>{content}</pre>
    </div>
  );
};

export default PageReplica;
