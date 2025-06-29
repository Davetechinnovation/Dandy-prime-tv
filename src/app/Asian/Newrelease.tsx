import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const Newrelease = () => {
  return (
    <div>
      <div className="text-white -translate-y-10 sm:px-5 px-2 ">
        <h2 className="sm:text-[30px] text-[23px] font-semibold py-4 ">
          New Release
        </h2>
        <div className=" px-2 grid grid-cols-3 md:grid-cols-6 gap-3 ">
          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
             <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>

          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
             <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>

          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
             <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>

          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
             <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>

          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
             <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>

          <div className="">
            <Image
              src="/images/sinners.webp"
              alt="image"
              width={200}
              height={100}
              className=" w-full rounded-t-lg "
            />
            <div className="border border-t-0 border-blue-700 rounded-b-lg px-2 leading-8 ">
              <p className="sm:text-[16px] text-[13px] truncate ">
                No way Home
              </p>
              <p className="flex items-center justify-between sm:text-[14px] text-[11px] ">
                <span>2025</span>
                <span className="flex items-center justify-between gap-2 ">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                  8.5
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newrelease;
