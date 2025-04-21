import React from 'react';

const PPTViewer = ({ pptUrl }) => {
  console.log(pptUrl)
  // Check if pptUrl is provided
  if (!pptUrl) {
    return <div className="text-red-500">No presentation URL provided.</div>;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptUrl)}`}
        style={{ width: '60%', height: '500px', border: 'none' }}
        title="PPT Viewer"
      />
    </div>
  );
};

export default PPTViewer;