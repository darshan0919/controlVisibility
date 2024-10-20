import React from 'react';
import { withVisibility } from '../hocs/withVisibility';

const Text = ({ text }) => (
  <div className="border border-black rounded-[8px] flex items-center p-3 bg-blue-200">
    {text}
  </div>
);

const TextWithVisibility = withVisibility(Text);

export { TextWithVisibility as Text };
