import NextLink from 'next/link';
import React from 'react';

import { LinkStyled } from './style';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior shallow>
      <LinkStyled>{children}</LinkStyled>
    </NextLink>
  );
};
