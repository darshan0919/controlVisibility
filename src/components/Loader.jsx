/* Do Not Change the contents of this file */

import React from 'react';

import { CLASSNAME } from '../constants/className';

export const Loader = ({ text }) => (
  <div className={`${CLASSNAME} bg-green-200`}>{text} is loading...</div>
);
