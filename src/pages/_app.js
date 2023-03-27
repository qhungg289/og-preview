import GitHubCorner from "@/components/GitHubCorner";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
	return (
		<>
			<GitHubCorner />
			<main className={inter.className}>
				<Component {...pageProps} />
			</main>
			<footer className="pb-6 text-center">
				<p className="text-sm text-gray-600">
					Made by{" "}
					<a
						href="https://github.com/qhungg289"
						className="text-blue-600 transition-opacity hover:opacity-80"
					>
						@qhungg289
					</a>
				</p>
			</footer>
		</>
	);
}
