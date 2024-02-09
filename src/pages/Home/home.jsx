import { Link } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const Home = () => {
  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      <section className="flex rounded-xl shadow-lg max-w-3x1 p-5">
        <div className="sm:w-1/2 my-auto mx-auto">
          <div className="mx-8">
            <h1 className="text-6xl text-center sm:text-left leading-normal">
              Hello World
            </h1>
            <p className="text-center sm:text-left">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
              nemo et ab esse mollitia quisquam facilis maiores quos assumenda
              aspernatur rem, ad, laudantium error ut ea enim repudiandae
              aliquam eius.
            </p>
            <Link
              to={"/listfoods"}
              className="bg-[#A87C7C] rounded-3xl py-3 px-8 font-medium inline-block mt-6 sm:mt-4 sm:justify-center hover:bg-[#3E3232] hover:text-white focus:scale-95 transition-all duration-200 ease-out"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="sm:block hidden w-1/2 mx-auto my-auto">
          <img src="images/hat.jpg" alt="" className="w-3/4 mx-auto my-auto" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
