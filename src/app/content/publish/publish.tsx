import React, { useState, useContext } from 'react';

import styles from './publish.module.css';
import { UserContext } from '../../app';

function Publish() {
	const [title, setTitle] = useState('')
	const [genres, setGenres] = useState('')
	const [tags, setTags] = useState('')
	const [annotation, setAnnotation] = useState('')
	const [failed, setFailed] = useState(false)
	const [busy, setBusy] = useState(false)
	const user = useContext(UserContext).getter()
	if (!user) return <div />

	const failedClass = styles['publish-failed'] + (failed ? '' : ' ' + styles['publish-failed-not'])
	return <form className={styles['publish']} onSubmit={(event) => {
		if (busy) return
		setBusy(true)
		event.preventDefault()
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bookTitle: title, 
				author: user.login,
				authorId: user.id,
				dateTime: new Date().getTime(),
				genres: genres.split('\n'),
				tags: tags.split('\n'),
				content: annotation
			})
		};
		fetch('http://localhost:8080/add_book', requestOptions)
			.then(res => {
				if (res.ok) {
					setFailed(false)
					setTitle('')
					setGenres('')
					setTags('')
					setAnnotation('')
					setBusy(false)
					return res
				} else {
					setFailed(true)
					setBusy(false)
					return Promise.reject(res)
				}
			});
	}}>
		<div className={failedClass}>Failed</div>
		<input type="text" className={styles['publish-title']} value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
		<input type="text" className={styles['publish-field']} value={genres} placeholder="Genres. Separate by new lines" onChange={(event) => setGenres(event.target.value)} />
		<input type="text" className={styles['publish-field']} value={tags} placeholder="Tags. Separate by new lines" onChange={(event) => setTags(event.target.value)} />
		<input type="text" className={styles['publish-field']} value={annotation} placeholder="Annotation" onChange={(event) => setAnnotation(event.target.value)} />
		<input type="submit" className={styles['publish-button'] + (busy ? ' '+styles['publish-button-busy'] : '')} value="Publish" />
	</form>;
}

export default Publish;
