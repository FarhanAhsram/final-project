import { Link } from "react-router-dom";

import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const Home = () => {
  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      <section className="flex rounded-xl shadow-lg max-w-3x1 p-5">
        {/* Text */}
        <div className="sm:w-1/2 my-auto mx-auto">
          <div className="mx-8">
            <h1 className="text-6xl text-center font-cursive sm:text-left leading-normal">
              Hello Foodies
            </h1>
            <p className="text-center sm:text-left">
              Welcome to the Nusantara Food Thesaurus site. This website will
              review traditional Indonesian food from local and international
              food journalists. Foodies can also provide ratings and reviews
              according to your culinary experience
            </p>
            <Link
              to={"/listfoods"}
              className="bg-[#A87C7C] rounded-3xl text-center py-3 px-8 w-full font-medium inline-block mt-6 sm:mt-4 sm:w-1/3 sm:text-center hover:bg-[#3E3232] hover:text-white focus:scale-95 transition-all duration-200 ease-out"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="sm:block hidden w-1/2 mx-auto my-auto">
          <img
            src="images/chef1.png"
            alt=""
            className="w-full mx-auto my-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
