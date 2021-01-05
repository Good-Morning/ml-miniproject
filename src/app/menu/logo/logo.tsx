import React from 'react';

import styles from './logo.module.css';
import logo from './logo.png';

function Logo() {
	return <div className={styles['logo-wrapper']}>
		<div className={styles['logo-cover']} />
		<img src={logo} className={styles['logo']} />
		<div className={styles['logo-cover']} />
	</div>;
}

export default Logo;
