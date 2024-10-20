/* Do Not Change the contents of this file */

import React from 'react';
import { withVisibility } from '../hocs/withVisibility';

const Item = ({ text }) => (
  <div className="border border-black rounded-[8px] flex items-center p-3 bg-blue-200">
    {text}
  </div>
);

const ItemWithVisibility = withVisibility(Item);

export { ItemWithVisibility as Item };
