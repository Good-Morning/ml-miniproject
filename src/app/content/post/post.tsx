import React from 'react';

import styles from './post.module.css';

import { UserContext } from '../../app';
import { IBook } from '../content'
import like from './like.png';

interface IPostState {};

interface IPostProps {
	book: IBook
};

export default class Post extends React.Component {

	public readonly props: IPostProps
	public state: IPostState

	constructor(props: IPostProps) {
		super(props)
		this.props = props;
		this.state = {};
		this.handleClickConstructor = this.handleClickConstructor.bind(this)
	}

	handleClickConstructor(value: any, book: IBook) {
		console.log("shit")
		return 
	}

	render() {
		const book = this.props.book
		return <div className={styles['post']}>
			<div className={styles['post-top']}>
				<div className={styles['post-date']}>{book.timestamp.split(' ')[0]}</div>
				<UserContext.Consumer>{value => 
					<div className={styles['post-like']} onClick={() => {
						console.log("liked")
						const user = value.getter()
						if (!user) return
						console.log(user.id, book.book_id)
						console.log(book)
						const requestOptions = {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({"userId": user.id, "bookId": book.book_id})
						};
						fetch('http://localhost:8080/save_book', requestOptions)
									.then(res => {
										if (res.ok) {
											return res
										} else {
											return Promise.reject(res)
										}
									});
					}}>Like</div>
				}</UserContext.Consumer>
			</div>
			<div className={styles['post-title']}>{book.title}</div>
			<div className={styles['post-middle']}>
				<div className={styles['post-likes']}>
					<img src={like} className={styles['post-like-img']} />
					{book.common_rating}
				</div>
				<div className={styles['post-author']}>{book.author}</div>
			</div>
			<div className={styles['post-content']}>{book.annotation}</div>
			<div className={styles['post-bottom']}>
			<div className={styles['post-tags']}>{book.genres.map(s => '#' + s.split(' ').join('_')).join(' ')}</div>
			</div>
		</div>;
		return <div className={styles['post']}>
			<div className={styles['post-top']}>
				<div className={styles['post-date']}>20.06.2020</div>
				<div className={styles['post-like']}>Like</div>
			</div>
			<div className={styles['post-title']}>Собачье Сердце</div>
			<div className={styles['post-middle']}>
				<div className={styles['post-tag']}>@bulgakov_micha</div>
				<div className={styles['post-author']}>М.А.Булгаков</div>
			</div>
			<div className={styles['post-content']}>Светило мировой науки, профессор Филипп Филиппович спасает от смерти бездомного пса Шарика, чтобы провести на нём эксперимент по выявлению функций гипофиза. Вопреки ожиданиям, выясняется: гипофиз даёт не ожидаемое учёным омоложение, а полное очеловечивание....</div>
			<div className={styles['post-bottom']}>
				<div className={styles['post-likes']}>
					<img src={like} className={styles['post-like-img']} />
					50550
				</div>
				<div className={styles['post-tags']}>#драма #фантастика</div>
			</div>
		</div>;
	}
}
