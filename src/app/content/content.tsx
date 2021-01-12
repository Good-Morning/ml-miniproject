import React, { useContext } from 'react';

import styles from './content.module.css';

import Post from './post';
import Auth from './auth';
import Publish from './publish';
import { UserContext, IUserData } from '../app';

export interface IBook {
	title: string,
	author: string,
	common_rating: number,
	genres: string[],
	tags: string[],
	annotation: string,
	book_id: number,
	timestamp: string
};

interface IContentState {
	json: IBook[],
	isFailed: boolean,
	doneFor: string | null
};

interface IContentProps {
	sheet: string,
	user: IUserData | null
};

export default class Content extends React.Component {

	public readonly props: IContentProps
	public state: IContentState

	constructor(props: IContentProps) {
		super(props)
		this.props = props;
		this.state = {json: [], isFailed: false, doneFor: null};
	}

	componentDidUpdate(prevProps: IContentProps) {
		const id0 = prevProps.user ? prevProps.user.id : null 
		const id1 = this.props.user ? this.props.user.id : null 
		if (id0 !== id1) {
			this.setState({json: [], doneFor: ''})
		}
	}

	render() {
		const that = this;
		const sheet = this.props.sheet;
		if (this.state.doneFor !== this.props.sheet && this.props.user) {
			const gettingBooks = sheet === 'Liked' || sheet === 'Books for me' || sheet === 'My books'
			if (gettingBooks) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({"userId": this.props.user.id})
				};
				fetch('http://localhost:8080/' + (sheet === 'Liked' ? 'get_saved_books' : (sheet === 'My books' ? 'get_my_books' : 'recommend_books')), requestOptions)
							.then(res => {
								if (res.ok) {
									return res
								} else {
									if (that.props.sheet === sheet) {
										that.setState({json: [], isFailed: true, doneFor: sheet})
									}
									return Promise.reject(res)
								}
							})
							.then(response => response.json())
							.then(data => {
								if (that.props.sheet === sheet) {
									that.setState({isFailed: false, doneFor: sheet, json: data})
								}
							});
			} else {
				this.setState({json: [], isFailed: false, doneFor: this.props.sheet})
			}
		}
		return <UserContext.Consumer>{ value => value.getter() === null ? (
			<div className={styles['content']}>
				<div className={styles['auth-wrapper']}><Auth /></div>
			</div>
		) : (
			<div className={styles['content']}>{
				sheet === "Publish" ? (
					<div className={styles['publish-wrapper']}><Publish /></div>
				) : (
					this.state.doneFor === sheet ? (
						this.state.isFailed ? (
						<div className={styles['content-failed']}>Failed</div> 
						) : (
							this.state.json.map((book) => <div className={styles['post-wrapper']}><Post book={book} /></div>) 
						)
					) : ''
				)
			}</div>
		)}</UserContext.Consumer>;
	}
}
