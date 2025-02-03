"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";

async function getCarById(slug: string) {
  const cleanSlug = slug.replace(/['"]+/g, "");
  const query = `*[_type == "car" && slug.current == "${cleanSlug}"][0]{
    _id,
    name,
    type,
    image,
    pricePerDay,
    originalPrice
  }`;
  return await client.fetch(query);
}

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";  // Default to empty string if slug is not found
  const [car, setCar] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    async function fetchData() {
      try {
        const result = await getCarById(slug);
        setCar(result);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    }
    fetchData();
  }, [slug]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Payment successful for ${car.name}!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f6f7f9] p-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[40%]">
          <div className="w-full">
            <div>
              <h2 className="font-semibold text-lg">{car.name}</h2>
              <Image
                src={urlFor(car.image).url() || "/default-image.jpg"}
                alt={car.name}
                width={120}
                height={80}
                className="rounded-lg"
              />
              <p className="text-gray-500">{car.type}</p>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Per Day</span>
                <span>{car.pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{car.pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span>${(parseFloat(car.pricePerDay.replace('$', '')) * 0.1).toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(parseFloat(car.pricePerDay.replace('$', '')) * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%] border-2 bg-white p-2 shadow-md rounded-lg border-gray-300">
          <form onSubmit={handlePayment} className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-gray-700">Full Name</span>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Email Address</span>
              <input
                type="email"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Phone Number</span>
              <input
                type="text"
                required
                maxLength={15}
                placeholder="(123) 456-7890"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Billing Address</span>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                placeholder="Street, City, Country"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Card Number</span>
              <input
                type="text"
                required
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
              />
            </label>

            <div className="flex gap-4">
              <label className="block w-1/2">
                <span className="text-gray-700">Expiry Date</span>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                />
              </label>

              <label className="block w-1/2">
                <span className="text-gray-700">CVV</span>
                <input
                  type="text"
                  required
                  maxLength={3}
                  placeholder="123"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-500"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
