/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import Spinner from "@/components/Spinner";

export default function Home() {
	const [url, setUrl] = useState("");
	const [ogMetadata, setOgMetadata] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const urlInputRef = useRef(null);

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
			urlInputRef.current.focus();
			return;
		}

		try {
			new URL(url);
		} catch (e) {
			toast.error("Invalid URL!");
			urlInputRef.current.focus();
			return;
		}

		setIsLoading(true);

		fetch("/api/og", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		})
			.then((res) => {
				if (res.status == 400) {
					toast.error("Invalid URL!");
					urlInputRef.current.focus();
					return null;
				}

				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setOgMetadata(data);
				setIsLoading(false);
			});
	}

	return (
		<>
			<Head>
				<title>OG Preview</title>
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

			<Toaster />

			<div className="container min-h-screen">
				<h1 className="my-8 text-center text-4xl font-bold">OG Preview</h1>

				<form
					className="relative mx-auto flex max-w-lg"
					onSubmit={handleSubmit}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="absolute top-2 left-2 h-6 w-6 text-gray-300"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
						/>
					</svg>
					<input
						className="w-full rounded border border-gray-300 pr-28 pl-10 placeholder:text-gray-400 focus:border-gray-500 focus:ring-0"
						type="text"
						name="url"
						id="url"
						placeholder="Your URL..."
						value={url}
						onChange={handleUrlInputChange}
						ref={urlInputRef}
					/>
					{url && (
						<button
							className="absolute inset-y-0 right-20 p-2"
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
						className="absolute inset-y-0 right-0 flex items-center justify-center rounded bg-black p-4 text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70"
						type="submit"
						disabled={isLoading}
					>
						Check
					</button>
				</form>

				{isLoading && (
					<div className="flex flex-col items-center justify-center gap-6 py-20">
						<Spinner />
						<p>Loading...</p>
					</div>
				)}

				{ogMetadata && !isLoading && (
					<div className="border-1 mx-auto my-6 max-w-lg rounded border border-gray-200 bg-white p-4 shadow-xl">
						{ogMetadata.ogImage ? (
							<div className="group relative">
								<img
									className="mx-auto rounded border-2 border-transparent group-hover:border-teal-500"
									src={ogMetadata.ogImage}
									alt="OG image"
								/>
								<code className="absolute top-0 right-0 hidden rounded-sm bg-teal-500 p-1 text-sm text-white group-hover:block">
									og:image
								</code>
							</div>
						) : (
							<div className="mx-auto flex aspect-video select-none items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-100">
								<code className="mx-1 rounded bg-gray-200 p-1">og:image</code>{" "}
								not found
							</div>
						)}

						{ogMetadata.ogTitle ? (
							<p className="group relative my-2 rounded border-2 border-transparent text-xl font-bold hover:border-orange-500">
								<span>{ogMetadata.ogTitle}</span>
								<code className="absolute top-0 right-0 hidden rounded-sm bg-orange-500 p-1 text-sm font-normal text-white group-hover:block">
									og:title
								</code>
							</p>
						) : (
							<p className="my-2 text-xl font-bold">
								<code className="mr-1 rounded bg-gray-200 p-1">og:title</code>
								not found
							</p>
						)}

						{ogMetadata.ogDescription ? (
							<p className="group relative rounded border-2 border-transparent py-1 text-sm text-gray-500 hover:border-sky-500">
								<span>{ogMetadata.ogDescription}</span>
								<code className="absolute top-0 right-0 hidden rounded-sm bg-sky-500 p-1 text-sm font-normal text-white group-hover:block">
									og:description
								</code>
							</p>
						) : (
							<p className="text-sm text-gray-500">
								<code className="mr-1 rounded bg-gray-200 p-1">
									og:description
								</code>
								not found
							</p>
						)}
					</div>
				)}
			</div>
		</>
	);
}
