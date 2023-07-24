import { styled, Box, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
import Typewriter from "./Typewriter";
const Image = styled(Box)`
  width: 100%;
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #FFFFFF;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #FFFFFF;
`;

const Banner = () => {
  return (
    <Image>
      <Heading><Typewriter text="BLOG SMITH" delay={100} infinite/></Heading>
      <SubHeading>Where Words Collide and Ideas Thrive</SubHeading>
    </Image>
  );
};

export default Banner;
