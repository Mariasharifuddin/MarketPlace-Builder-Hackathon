"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client} from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Car {
  _id: string;
  name: string;
  type: string;
  image: string;
  pricePerDay: string;
  originalPrice: string;
}

async function getCarById(slug: string): Promise<Car | null> {
  if (!slug) return null;
  try {
    const cleanSlug = slug.replace(/['"]+/g, "");
    const query = `*[_type == "car" && slug.current == "${cleanSlug}"][0]{
      _id,
      name,
      type,
      "image": image.asset->url,  // Fetching the image URL properly
      pricePerDay,
      originalPrice
    }`;

    const car = await client.fetch(query);
    return car || null;
  } catch (error) {
    console.error("Error fetching car data:", error);
    return null;
  }
}


export default function Payment({ params }: { params: { slug: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getCarById(params.slug);
      setCar(result);
      setLoading(false);
    }
    fetchData();
  }, [params.slug]);

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-lg">Fetching car details....</div>;
  }

  if (!car) {
    return <div className="w-full h-screen flex items-center justify-center text-lg text-red-500">Car not found</div>;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Payment successful for ${car.name}!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f6f7f9] p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section - Rental Summary */}
        <div className="w-full lg:w-[40%]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Rental Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src={urlFor(car.image).url()}
                  alt={car.name}
                  width={120}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-gray-500">{car.type}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{car.pricePerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${(parseFloat(car.pricePerDay.replace("$", "")) * 0.1).toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(parseFloat(car.pricePerDay.replace("$", "")) * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Payment Form */}
        <div className="w-full lg:w-[60%] border-2 bg-white p-4 shadow-md rounded-lg border-gray-300">
          <h2 className="text-xl font-bold mb-4">Product Actions</h2>
          <form onSubmit={handlePayment} className="mt-6 flex flex-col gap-6">
            <label className="block">
              <span className="text-gray-700">Full Name</span>
              <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" />
            </label>

            <label className="block">
              <span className="text-gray-700">Card Number</span>
              <input type="text" required maxLength={16} placeholder="1234 5678 9012 3456" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" />
            </label>

            <div className="flex gap-4">
              <label className="block w-1/2">
                <span className="text-gray-700">Expiry Date</span>
                <input type="text" required placeholder="MM/YY" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" />
              </label>

              <label className="block w-1/2">
                <span className="text-gray-700">CVV</span>
                <input type="text" required maxLength={3} placeholder="123" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" />
              </label>
            </div>

            <label className="block">
              <span className="text-gray-700">Email Address</span>
              <input type="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" />
            </label>

            <label className="block">
              <span className="text-gray-700">Billing Address</span>
              <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500" placeholder="Street, City, Country" />
            </label>

            <button type="submit" className="mt-6 bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-500">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
