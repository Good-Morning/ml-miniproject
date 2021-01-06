import React from 'react';

import styles from './menu.module.css';

import Logo from './logo';

interface IMenuState {};

interface IMenuProps {
	switchTo: (sheet: string) => void
};

function MenuButton({name, switcherFactory}: {name: string, switcherFactory: (sheet: string) => () => void}) {
	return <div className={styles['menu-button']} onClick={switcherFactory(name)}>
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
		let that = this
		let switcherFactory = (sheet: string) => () => that.props.switchTo(sheet)
		let nop = (sheet: string) => () => alert('not implemented')
		return <div className={styles["menu"]}>
			<div className={styles['logo-wrapper']}>
				<Logo />
			</div>
			<MenuButton name='My profile' switcherFactory={switcherFactory} />
			<MenuButton name='Saved' switcherFactory={switcherFactory} />
			<MenuButton name='Favourite authors' switcherFactory={nop} />
			<MenuButton name='Books for me' switcherFactory={switcherFactory} />
			<MenuButton name='Publish' switcherFactory={switcherFactory} />
		</div>;
	}
}
