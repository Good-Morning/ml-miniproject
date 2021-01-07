import React from 'react';

import styles from './post.module.css';

import like from './like.png';

interface IPostState {};

interface IPostProps {};

export default class Post extends React.Component {

	public readonly props: IPostProps
	public state: IPostState

	constructor(props: IPostProps) {
		super(props)
		this.props = props;
		this.state = {};
	}

	render() {
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
