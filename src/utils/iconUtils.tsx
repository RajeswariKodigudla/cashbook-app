/**
 * Icon utility functions
 */

import React from 'react';
import { ICON_MAP } from '../constants';
import { MoreHorizontal } from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export const getIcon = (iconName: string, size = 20, className?: string, strokeWidth = 2): React.ReactNode => {
  const IconComponent = ICON_MAP[iconName] || MoreHorizontal;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

export const Icon: React.FC<IconProps> = ({ name, size = 20, className, strokeWidth = 2 }) => {
  return getIcon(name, size, className, strokeWidth) as React.ReactElement;
};

