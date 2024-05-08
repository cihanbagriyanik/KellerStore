import React from "react";
import Logo from "../assets/logo.png";
import TwitterButton from "../components/buttons/TwitterButton";
import FacebookButton from "../components/buttons/FacebookButton";
import GoogleButton from "../components/buttons/GoogleButton";
import RegisterForm from "../components/forms/RegisterForm";
const Register = () => {
  return (
    <div>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex  justify-center w-100 h-100">
          
            <div className="flex justify-center items-center sm:hidden lg:block bg-background-filter-light-blue w-full ">
  <div className="flex flex-col items-center">
    <img src={Logo} alt="Logo" width={120} height={50} />
    <div className="text-white ml-4"> {/* ml-4: soldan 4 piksel boşluk */}
      <h4 className="text-2xl text-center">
        Machen Sie Werbung für Ihr Vermögen Kaufen Sie, was Sie brauchen.
      </h4>
      <p className="mt-3 text-lg text-center">
        Größter Online-Werbemarkt der Welt.
      </p>
    </div>
  </div>
</div>

            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
              <div className="flex-1  mt-5  space-y-6 justify-between sm:flex md:space-y-0">
                <GoogleButton />
                <FacebookButton />
                <TwitterButton />
              </div>
              <h3 className="text-black font-semibold text-center">Or</h3>
              <RegisterForm />
              <a
                href="javascript:void(0)"
                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
