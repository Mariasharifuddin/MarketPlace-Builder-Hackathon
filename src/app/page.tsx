import { client } from "@/sanity/lib/client";
import product from "@/sanity/schemaTypes/product";
import Image from "next/image";
import Link from "next/link";

interface Idata {
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

export default async function Test() {
  try {
    const query = await client.fetch(`
      *[_type == "car"] {
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

    const data: Idata[] = query;

    return (
      <div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
        <section className="first w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center">
          <Image
            src={"/Ads 1.png"}
            alt=""
            width={640}
            height={360}
            className="max-w-full"
          />
          <Image
            src={"/Ads 2.png"}
            alt=""
            width={640}
            height={360}
            className="max-w-full"
          />
        </section>
        <section className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-8">
          <Image
            src={"/Pick - Up.png"}
            alt=""
            width={582}
            height={132}
            className="max-w-full"
          />
          <Image
            src={"/Switch.png"}
            alt=""
            width={160}
            height={160}
            className="max-w-full"
          />
          <Image
            src={"/Drop - Off.png"}
            alt=""
            width={582}
            height={132}
            className="max-w-full"
          />
        </section>
        <section className="popular w-full flex flex-col gap-4">
          <div className="first w-full flex items-center justify-between">
            <h1 className="text-gray-500 text-lg sm:text-xl">Popular Car</h1>
            <Link href={"/categories"}>
              <h1 className="text-[#3563e9] font-bold hover:underline decoration-[#3563e9]">
                View All
              </h1>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item: Idata) => (
              <div key={item.name} className="border p-4 rounded-md shadow-md">
                {/* Link added to make Image and Name clickable */}
                <Link href={`/${item.name}`}>
                  <Image
                    src={item.imageurl}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="rounded-md cursor-pointer"
                  />
                </Link>
                <Link href={`/product/${item.slug.current}`}>
                    <button className="bg-[#3563e9] p-2 text-white rounded-md">
                      Rent Now
                    </button>
                  </Link>
                <Link href={`/product/${item.slug.current}`}>
                  <h2 className="text-lg font-bold mt-2 cursor-pointer hover:text-blue-600">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600">{item.type}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data. Please try again later.</div>;
  }
}
