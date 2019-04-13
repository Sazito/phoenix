import React from 'react';
import Logo from '../../components/logo';
import style from "./about.scss"

const AboutPage = () => {
  return(
    <div className={style.pAbout}>
      <Logo />
      <div>About phoenix project</div>
    </div>
  )
};

export default AboutPage;