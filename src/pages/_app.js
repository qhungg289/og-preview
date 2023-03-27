import Footer from "@/components/Footer";
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
			<Footer />
		</>
	);
}
