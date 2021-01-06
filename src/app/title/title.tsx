import React from 'react';

import styles from './title.module.css';

function Title({sheet}: {sheet: string}) {
	return <div className={styles["title"]}>
		<div className={styles["title-rect"]} />
		<div className={styles["title-name"]}>
			<div className={styles["title-name-content"]}>
				{sheet}
			</div>
		</div>
		<div className={styles["title-login"]}>
			{"Daria Zvjaginzeva | Log out"}
		</div>
	</div>;
}

export default Title;
