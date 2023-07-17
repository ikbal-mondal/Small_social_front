import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const ErrorPage = () => {
    return (
        <div>
			<Navbar></Navbar>
            <section className="flex items-center h-full p-16 bg-base-200 text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-gray-600">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page. Or <p className="text-red-600">Google Login Problems</p> </p>
			<p className="mt-4 mb-8 text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
			<a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"><Link to='/'>Back to homepage</Link></a>
		</div>
	</div>
</section>
<Footer></Footer>
        </div>
    );
};

export default ErrorPage;