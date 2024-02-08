import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Section 1 */}
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

      {/* Section 2*/}
      <section className="container mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-semibold mb-5 text-center">About Us</h2>
        <div className="text-center">
          <p className="text-lg mb-4">
            Welcome to Food Journal, your go-to place for exploring delicious
            recipes and food adventures. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Magnam, ab? Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Minus necessitatibus consequatur
            illo, asperiores aperiam recusandae, voluptatibus ea provident non
            voluptate minima omnis natus. Nesciunt dolore impedit facilis
            dolorum quia laudantium sint eum minima consectetur. Laborum
            mollitia necessitatibus eaque quod obcaecati ipsam tenetur sequi
            doloribus aliquid assumenda cumque voluptate odit, quaerat rem
            possimus iure suscipit eius.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-green-800 text-white mt-5 mb-10">
        <div className="flex flex-col md:flex-row sm:grid sm:grid-cols-2 gap-4 p-4">
          <div className="p-4 flex items-center justify-center mx-auto md:mx-0">
            <div className="sm:w-1/2 text-center sm:text-left">
              <h1 className="text-4xl font-bold mb-4">Food Journal</h1>
              <p className="text-lg mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                More Info
              </button>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center mx-auto md:mx-0">
            <div className="sm:w-1/2 text-center">
              <img
                src="images/hat.jpg"
                alt=""
                className="w-full h-auto hidden sm:block mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="container mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-semibold mb-5 text-center">Title</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="images/hat.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Food 1
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, porro.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Detail
              </a>
            </div>
          </div>
          <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="images/hat.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Food 2
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, porro.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Detail
              </a>
            </div>
          </div>
          <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="images/hat.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Food 3
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, porro.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Detail
              </a>
            </div>
          </div>
          <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="images/hat.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Food 4
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, porro.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Detail
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
