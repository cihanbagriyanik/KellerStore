import React from "react";

const SettingsContainer = () => {
  return (
    <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-3xl ps-5 pt-5 ">Einstellungen</h1>
      </div>
      <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
        <div>
          <div className="px-16 pt-3  ">
            <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">
              Profilinformationen
            </h1>
            <div className="my-5 flex justify-between relative">
              <div className="flex">
                <h2>Profil Name :</h2>

                <h2 className="absolute left-52"> Lukas Müller</h2>
              </div>
              <div>
                <a href="#" className="hover:underline hover:text-button-blue">
                  Bearbeiten
                </a>
              </div>
            </div>
            <div className="my-5 mb-16 flex justify-between">
              <div>
                <h2>Lieferadresse :</h2>
              </div>
              <div>
                <a href="#" className="hover:underline hover:text-button-blue">
                  Bearbeiten
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /* -------------------------------------------------------------------------- */}

      <div className="bg-white mx-7 my-2 rounded-lg border-2">
        <div>
          <div className="px-16 pt-3  ">
            <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">
              Kontoeinstellungen
            </h1>
            <div className="my-5 flex justify-between   relative">
              <div className="flex   ">
                <h2>Telefonnummer :</h2>

                <h2 className="absolute left-52"> +49 176 0000 00 00</h2>
              </div>
              <div>
                <a href="#" className="hover:underline hover:text-button-blue">
                  Bearbeiten
                </a>
              </div>
            </div>
            <div className="my-5 mb-16 flex justify-between relative">
              <div className="flex">
                <h2>Email :</h2>
                <h2 className="absolute left-52 "> petra@gmail.com</h2>
              </div>
              <div>
                <a href="#" className="hover:underline hover:text-button-blue">
                  Bearbeiten
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /* -------------------------------------------------------------------------- */}
    </div>
  );
};

export default SettingsContainer;
