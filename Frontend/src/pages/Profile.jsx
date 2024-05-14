import React from "react";
import Banner from "../components/Banner";
import ProfilUpdateButton from "../components/buttons/ProfilUpdateButton";

const Profile = () => {
  const title = `Einstellungen`;
  const desc = ``;
  return (
    <div>
      <Banner title={title} />
      <section className="w-3/4 profile bg-background-grey p-5 m-auto mt-5 mb-5">
        <h1 className="border-b w-2/4 border-gray-700 text-black text-lg font-semibold m-5">
          Profilinformationen
        </h1>
        
        <div className="flex justify-between m-5">
          <div>
            <label
              htmlFor="VorName"
              className=" text-sm font-medium leading-6 text-black"
            >
             Vor Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="VorName"
              name="VorName"
              type="VorName"
              autoComplete="VorName"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        
          <div>
            <label
              htmlFor="NachName"
              className=" text-sm font-medium leading-6 text-black"
            >
             Nach Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="NachName"
              name="NachName"
              type="NachName"
              autoComplete="NachName"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex justify-between m-5">
          <div >
            <label
              htmlFor="Straße"
              className="block text-sm font-medium leading-6 text-black"
            >
             Straße
            </label>
          </div>
          <div className="mt-2">
            <input
              id="Straße"
              name="Straße"
              type="Straße"
              autoComplete="Straße"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        
          <div>
            <label
              htmlFor="PLZ"
              className="block text-sm font-medium leading-6 text-black"
            >
              PLZ
            </label>
          </div>
          <div className="mt-2">
            <input
              id="PLZ"
              name="PLZ"
              type="PLZ"
              autoComplete="PLZ"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex justify-between m-5">
          <div>
            <label
              htmlFor="Stadt"
              className="block text-sm font-medium leading-6 text-black"
            >
            Stadt
            </label>
          </div>
          <div className="mt-2">
            <input
              id="Stadt"
              name="Stadt"
              type="Stadt"
              autoComplete="Stadt"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        
          <div>
            <label
              htmlFor="Land"
              className="block text-sm font-medium leading-6 text-black"
            >
            Land
            </label>
          </div>
          <div className="mt-2">
            <input
              id="Land"
              name="Land"
              type="Land"
              autoComplete="Land"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex justify-between m-5">
          <div>
            <label
              htmlFor="TelefonNummer"
              className="block text-sm font-medium leading-6 text-black"
            >
            Telefon
            </label>
          </div>
          <div className="mt-2">
            <input
              id="TelefonNummer"
              name="TelefonNummer"
              type="TelefonNummer"
              autoComplete="TelefonNummer"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        
          <div>
            <label
              htmlFor="ProfilImage"
              className="block text-sm font-medium leading-6 text-black"
            >
            Profil Image
            </label>
          </div>
          <div className="mt-2">
            <input
              id="ProfilImage"
              name="ProfilImage"
              type="ProfilImage"
              autoComplete="ProfilImage"
              className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className=" flex justify-center ">
          <ProfilUpdateButton/>
        </div>
      </section>
    </div>
  );
};

export default Profile;
