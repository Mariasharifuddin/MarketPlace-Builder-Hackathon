import React from 'react';

export default function Footer() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-6 px-5 w-full bg-gradient-to-r from-blue-50 to-blue-100 py-8">
      <div className="first w-full flex flex-wrap items-start justify-between gap-6">
        {/* Intro Section */}
        <div className="intro flex flex-col gap-2 w-full lg:w-[40%]">
          <h1 className="text-[#3563e9] text-3xl font-bold text-center lg:text-left">MORENT</h1>
          <p className="text-gray-600 text-center lg:text-left">
            Our vision is to provide convenience and help increase your sales business. Join us on this journey.
          </p>
        </div>

        <div className="lists flex flex-wrap gap-6 justify-center lg:justify-between w-full lg:w-[60%]">
          <div className="about">
            <ul className="flex flex-col gap-3">
              <li className="font-bold text-lg text-[#3563e9] hover:text-blue-600"><h1>About</h1></li>
              <li className="hover:text-blue-500">How it works</li>
              <li className="hover:text-blue-500">Featured</li>
              <li className="hover:text-blue-500">Partnership</li>
              <li className="hover:text-blue-500">Business Relation</li>
            </ul>
          </div>
          <div className="community">
            <ul className="flex flex-col gap-3">
              <li className="font-bold text-lg text-[#3563e9] hover:text-blue-600"><h1>Community</h1></li>
              <li className="hover:text-blue-500">Events</li>
              <li className="hover:text-blue-500">Blog</li>
              <li className="hover:text-blue-500">Podcast</li>
              <li className="hover:text-blue-500">Invite a friend</li>
            </ul>
          </div>
          <div className="socials">
            <ul className="flex flex-col gap-3">
              <li className="font-bold text-lg text-[#3563e9] hover:text-blue-600"><h1>Socials</h1></li>
              <li className="hover:text-blue-500">Discord</li>
              <li className="hover:text-blue-500">Instagram</li>
              <li className="hover:text-blue-500">Facebook</li>
              <li className="hover:text-blue-500">Twitter</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="line border-t w-full border-[#e7eef6] mb-6"></div>

      <div className="last w-full flex flex-wrap items-center justify-between gap-4">
        <div className="first text-center lg:text-left w-full lg:w-auto">
          <h1 className="font-bold text-sm text-gray-600 justify-between">©2022 MORENT. All rights reserved</h1>
        </div>
        <div className="second flex flex-wrap justify-center lg:justify-end items-center gap-8 w-full lg:w-auto">
          <h1 className="font-bold text-sm text-[#3563e9] hover:text-blue-600 cursor-pointer">Privacy & Policy</h1>
          <h1 className="font-bold text-sm text-[#3563e9] hover:text-blue-600 cursor-pointer">Terms & Conditions</h1>
        </div>
      </div>
    </div>
  );
}
