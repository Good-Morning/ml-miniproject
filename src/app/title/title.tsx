import React from 'react';

import styles from './title.module.css';

function Title() {
	return <div className={styles["title"]}>
		<div className={styles["title-rect"]} />
		<div className={styles["title-name"]}>
			<div className={styles["title-name-content"]}>
				{"Сохраненное"}
			</div>
		</div>
		<div className={styles["title-login"]}>
			{"Дарья Звягинцева | Выйти"}
		</div>
	</div>;
}

export default Title;
