// src/app/car/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Define the car data type
interface ICar {
  name: string;
  brand: string;
  type: string;
  transmission: string;
  fuelCapacity: number;
  seatingCapacity: number;
  pricePerDay: number;
  originalPrice: number;
  tags: string[];
  imageurl: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  try {
    // Fetching data of a single car using the slug
    const query = await client.fetch(`
      *[_type == "car" && slug.current == "${params.slug}"] {
        name,
        brand,
        type,
        transmission,
        fuelCapacity,
        seatingCapacity,
        pricePerDay,
        originalPrice,
        tags,
        "imageurl": image.asset->url,
        slug
      }
    `);

    const car: ICar = query[0]; // Assuming there's only one car for this slug

    if (!car) {
      return <div>Car not found</div>;
    }

    return (
      <div className="car-detail">
        <h1>{car.name}</h1>
        <Image src={car.imageurl} alt={car.name} width={500} height={300} />
        <p>{car.brand}</p>
        <p>{car.type}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Fuel Capacity: {car.fuelCapacity}L</p>
        <p>Seating Capacity: {car.seatingCapacity}</p>
        <p>Price per day: ${car.pricePerDay}</p>
        <p>Original Price: ${car.originalPrice}</p>
        <p>Tags: {car.tags.join(", ")}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching car details:", error);
    return <div>Failed to load car details. Please try again later.</div>;
  }
}
