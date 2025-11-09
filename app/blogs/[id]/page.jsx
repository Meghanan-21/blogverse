"use client";
import { assets, blog_data } from "@/Assets/Assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";

const Page = ({ params }) => {
  const unwrappedParams = React.use(params); // ❗You said to keep this as-is
  const [data, setData] = useState(null);

  const fetchBlogData = () => {
    for (let i = 0; i < blog_data.length; i++) {
      if (Number(unwrappedParams.id) === blog_data[i].id) {
        setData(blog_data[i]);
        console.log(blog_data[i]);
        break;
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

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
            <Image src={assets.arrow} alt="arrow" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-4xl font-semibold">{data.title}</h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.author_img}
            width={60}
            height={60}
            alt=""
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
          alt=""
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <p>{data.description}</p>

        <h3 className="my-5 text-[18px] font-semibold">
          step1: Reflection and goal setting
        </h3>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>

        <h3 className="my-5 text-[18px] font-semibold">
          step2: Reflection and goal setting
        </h3>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>

        <h3 className="my-5 text-[18px] font-semibold">
          step3: Reflection and goal setting
        </h3>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>
        <p className="my-3">
          As you reflect, look back at all you're thankful for since setting
          your goal
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
        <p className="my-3">
          Self-reflection and goal setting are powerful tools for personal and
          professional growth. Through self-reflection, individuals gain a
          deeper understanding of their strengths, weaknesses, values, and
          motivations. This awareness provides the foundation for setting
          meaningful and realistic goals that align with one’s vision and
          purpose. By regularly evaluating progress and adjusting goals as
          needed, people can stay motivated, overcome challenges, and
          continuously improve. Ultimately, the combination of self-reflection
          and goal setting fosters lifelong learning, resilience, and success.
        </p>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
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
