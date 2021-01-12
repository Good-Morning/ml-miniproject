import React, { useContext } from 'react';

import styles from './title.module.css';
import { UserContext } from '../app';

function Title({sheet}: {sheet: string}) {
	const data = useContext(UserContext).getter()
	const updater = useContext(UserContext).updater
	return (
		<div className={styles["title"]}>
			<div className={styles["title-rect"]} />
			<div className={styles["title-name"]}>
				<div className={styles["title-name-content"]}>
					{data !== null ? sheet : 'Authorization'}
				</div>
			</div>
			<div className={styles["title-login"]}>
				{data !== null ? data.login + `(${data.id})` : ''}
				{data !== null ? <span className={styles["title-login-logout"]} onClick={(event) => updater(null)}> | Log out</span> : ''}
			</div>
		</div>
	);
}

export default Title;
