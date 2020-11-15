import React from 'react';

import styles from './menu.module.css';

interface IMenuState {};

interface IMenuProps {};

export default class Menu extends React.Component {

	public readonly props: IMenuProps
	public state: IMenuState

	constructor(props: IMenuProps) {
		super(props)
		this.props = props;
		this.state = {};
	}

	render() {
		return <div className={styles["menu"]}></div>;
	}
}
