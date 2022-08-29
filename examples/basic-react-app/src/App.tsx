import React, {useState, useEffect, useMemo} from 'react';
import styles from './App.module.css';
import type {Child, Root, ErrorResponse} from './interfaces/Reddit';

function useFetch<ResponseType, DataType>(
	url: string,
	transformer: (response: ResponseType) => DataType,
	defaultValue?: DataType,
) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorResponse | undefined>(undefined);
	const [data, setData] = useState<DataType | undefined>(defaultValue);

	useEffect(() => {
		if (!url) {
			return;
		}

		(async () => {
			setLoading(true);
			setData(defaultValue);
			setError(undefined);
			try {
				const response = await fetch(url);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const json = await response.json();
				if (response.ok) {
					setData(transformer(json));
				} else {
					setError(json);
				}
			} catch (error: unknown) {
				const e = error as Error;
				setError({
					message: e.message,
				});
			}

			setLoading(false);
		})();
	}, [url]);

	return {
		loading,
		error,
		data,
	};
}

function App() {
	const [subreddit, setSubreddit] = useState('');
	const [subredditUrl, setSubredditUrl] = useState('');
	const {loading, error, data} = useFetch<Root, Child[]>(subredditUrl, root => root.data.children, []);

	const subredditChanged = (event: React.FormEvent<HTMLInputElement>) => {
		setSubreddit(event.currentTarget.value);
	};

	const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubredditUrl(`https://www.reddit.com/r/${subreddit}.json`);
	};

	return (
		<div className={['container', styles.main].join(' ')}>
			<form onSubmit={formSubmitted}>
				<label htmlFor='subreddit'>
          Subreddit
					<input
						onChange={subredditChanged}
						value={subreddit}
						placeholder='Enter subreddit name...'
						name='subreddit'
						id='subreddit'
					/>
				</label>
				<button>Go</button>
			</form>
			{error && <article>{error.message}</article>}
			{loading && <progress />}
			<div>
				{data?.map(post => (
					<article key={post.data.id}>{post.data.title}</article>
				))}
			</div>
		</div>
	);
}

export default App;
