import React from 'react';

import styles from './content.module.css';

import Post from './post';

interface IContentState {};

interface IContentProps {
	sheet: string
};

export default class Content extends React.Component {

	public readonly props: IContentProps
	public state: IContentState

	constructor(props: IContentProps) {
		super(props)
		this.props = props;
		this.state = {};
	}

	render() {
		return <div className={styles['content']}>
			<div className={styles['post-wrapper']}><Post /></div>
			<div className={styles['post-wrapper']}><Post /></div>
			<div className={styles['post-wrapper']}><Post /></div>
		</div>;
	}
}
