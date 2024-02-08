import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="bg-blue-900 text-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Food Journal</h1>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus.
            </p>
            <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring focus:border-green-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
