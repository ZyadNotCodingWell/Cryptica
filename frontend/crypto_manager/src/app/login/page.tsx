import Navigation from "../components/LayoutElements/Navigation";
import Login from "../components/Sections/Login";

export default function Home() {
		
	return (
		<>
		<Navigation />
		<main className="absolute inset-0 z-0 overflow-x-clip">
			<Login/>
		</main>
		</>	
	);
}
