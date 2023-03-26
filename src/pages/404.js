import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Not Found - OG Preview</title>
				<meta name="description" content="Preview OG metadata of your URL" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:image" content="/og-preview.png" />
				<meta property="og:title" content="OG Preview" />
				<meta
					property="og:description"
					content="A simple tool to preview how your website will look when sharing it on social media that support the Open Graph protocol."
				/>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<div className="flex h-screen flex-col items-center justify-center gap-6">
				<h1 className="text-xl">
					<span className="font-bold">404</span> -{" "}
					<span className="text-gray-600">Page Not Found</span>
				</h1>

				<Link
					href="/"
					className="text-blue-600 transition-opacity hover:opacity-80"
				>
					Go back
				</Link>
			</div>
		</>
	);
}
