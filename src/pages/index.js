/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Home() {
	const [url, setUrl] = useState("");
	const [ogMetadata, setOgMetadata] = useState(null);

	function handleUrlInputChange(e) {
		setUrl(e.target.value);
	}

	function handleClearUrlInput() {
		setUrl("");
		setOgMetadata(null);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!url) {
			toast.error("The URL is empty right now!");
			return;
		}

		try {
			new URL(url);
		} catch (e) {
			toast.error("Invalid URL!");
			return;
		}

		fetch("/api/og", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => setOgMetadata(data));
	}

	return (
		<>
			<Head>
				<title>OG Preview</title>
				<meta name="description" content="Preview OG metadata of your URL" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Toaster />

			<h1 className="my-8 text-center text-4xl font-bold">OG Preview</h1>

			<form
				className="relative mx-4 flex max-w-xl sm:mx-auto"
				onSubmit={handleSubmit}
			>
				<input
					className="w-full rounded-md border border-gray-100 px-4 py-3 pr-28 shadow-md placeholder:text-gray-400"
					type="text"
					name="url"
					id="url"
					placeholder="Your URL go here..."
					value={url}
					onChange={handleUrlInputChange}
				/>
				{url && (
					<button
						className="absolute inset-y-0 right-16 p-2"
						type="button"
						onClick={handleClearUrlInput}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="h-5 w-5"
						>
							<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
						</svg>
					</button>
				)}
				<button
					className="absolute inset-y-0 right-0 flex items-center justify-center rounded-tr-md rounded-br-md bg-blue-700 p-4 text-white"
					type="submit"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-6 w-6"
					>
						<path
							fillRule="evenodd"
							d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</form>

			{ogMetadata && (
				<div className="mx-auto mt-6 max-w-xl rounded-md bg-white p-4 shadow-md">
					<img
						className="mx-auto aspect-video rounded-md border border-gray-200"
						src={ogMetadata?.ogImage}
						alt="OG image"
					/>
					<a
						href={url}
						className="my-2 block text-xl font-bold hover:underline"
					>
						{ogMetadata?.ogTitle}
					</a>
					<p className="text-sm text-gray-600">{ogMetadata?.ogDescription}</p>
				</div>
			)}
		</>
	);
}
