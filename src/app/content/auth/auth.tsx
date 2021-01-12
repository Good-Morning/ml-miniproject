import React from 'react';

import styles from './auth.module.css';
import { UserContext } from '../../app';

interface IAuthState {
	isFailed: boolean,
	isAuth: boolean,
	login: string,
	password: string
};

interface IAuthProps {};

export default class Auth extends React.Component {

	public readonly props: IAuthProps
	public state: IAuthState

	constructor(props: IAuthProps) {
		super(props)
		this.props = props;
		this.state = {isFailed: false, isAuth: true, login: '', password: ''};
	}

	render() {
		const allowed = this.state.login !== '' && this.state.password !== ''
		const allowedClass = allowed ? '' : ' ' + styles['auth-button-disabled']
		const failedClass = styles['auth-failed'] + (this.state.isFailed ? '' : ' ' + styles['auth-failed-not'])
		const buttonCallbackFactory = (isAuth: boolean) => () => {
			if (allowed) this.setState({isAuth: isAuth})
		}
		const that = this
		return <UserContext.Consumer>{ value => 
			<form className={styles['auth']} onSubmit={(event) => {
				event.preventDefault()
				if (!allowed) {
					return
				}
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({"name": that.state.login, "password": that.state.password})
				};
				fetch('http://localhost:8080/' + (that.state.isAuth ? 'auth' : 'add_user'), requestOptions)
					.then(res => {
						if (res.ok) {
							that.setState({isFailed: false})
							return res
						} else {
							that.setState({isFailed: true})
							return Promise.reject(res)
						}
					})
					.then(response => response.json())
					.then(data => value.updater({id: data.id, login: that.state.login}));
			}}>
				<div className={failedClass}>Failed. Maybe wrong login or password.</div>
				<input type='text' placeholder='Login' onChange={(event) => that.setState({login: event.target.value})} />
				<input type='text' placeholder='Password' onChange={(event) => that.setState({password: event.target.value})} />
				<div className={styles['auth-buttons']}>
					<input type="submit" className={styles['login'] + allowedClass} value='Log in' onClick={buttonCallbackFactory(true)} />
					<input type="submit" className={styles['register'] + allowedClass} value='Register' onClick={buttonCallbackFactory(false)} />
				</div>
			</form>
		}</UserContext.Consumer>;
	}
}
