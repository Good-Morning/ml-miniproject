import React from 'react';

import styles from './menu.module.css';

import Logo from './logo';

interface IMenuState {};

interface IMenuProps {};

function MenuButton({name}: {name: string}) {
	return <div className={styles['menu-button']}>
		<div className={styles['menu-button-name']}>{name}</div>
	</div>;
}

export default class Menu extends React.Component {

	public readonly props: IMenuProps
	public state: IMenuState

	constructor(props: IMenuProps) {
		super(props)
		this.props = props;
		this.state = {};
	}

	render() {
		return <div className={styles["menu"]}>
			<div className={styles['logo-wrapper']}>
				<Logo />
			</div>
			<MenuButton name='My profile'/>
			<MenuButton name='Saved'/>
			<MenuButton name='Favourite authors'/>
			<MenuButton name='Books for me'/>
			<MenuButton name='Blogs for me'/>
		</div>;
	}
}
