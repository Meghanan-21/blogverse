"use client";
import { assets, blog_data } from "@/Assets/Assets/assets";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";

const Page = ({ params }) => {
  const unwrappedParams = React.use(params); // unwrap the params Promise
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id: unwrappedParams.id },
      });
      // API returns { blog } for single blog or { blogs } for list — handle both
      const payload = response.data.blog || response.data;
      setData(payload);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    }
  };

  useEffect(() => {
    if (unwrappedParams?.id) fetchBlogData();
  }, [unwrappedParams]);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              height={50}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="arrow" width={12} height={12} />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-4xl font-semibold">{data.title}</h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={
              data.authorImg && data.authorImg !== "/author_img.png"
                ? data.authorImg
                : assets.profile_icon
            }
            width={60}
            height={60}
            alt={`${data.author} avatar`}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt={data.title}
        />

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            share this article on social media
          </p>
          <div className="flex">
            <Image
              src={assets.facebook_icon}
              width={50}
              height={50}
              alt="share to facebook"
            />
            <Image
              src={assets.twitter_icon}
              width={50}
              height={50}
              alt="share to twitter"
            />
            <Image
              src={assets.googleplus_icon}
              width={50}
              height={50}
              alt="share to google plus"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
