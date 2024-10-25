/* Do Not Change the contents of this file */

import React from 'react';

import { CLASSNAME } from '../constants/className';

export const ContentHiddenPlaceholder = ({ text }) => (
  <div className={`${CLASSNAME} bg-red-200`}>{text} is hidden</div>
);
