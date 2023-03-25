import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>OG Preview</title>
				<meta name="description" content="Preview OG metadata of your URL" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>OG Preview</h1>
			</main>
		</>
	);
}
