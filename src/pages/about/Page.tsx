import { ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <div className="container">
      <div className="grid h-full w-full grid-rows-[auto_auto] items-center justify-around gap-8 py-[100px] md:grid-cols-2 md:grid-rows-1">
        <div className="self-start">
          <div className="flex flex-col self-start">
            <h1 className="text-6xl font-semibold">Vitalii Verdiiev</h1>
            <p className="mt-4 text-3xl font-light">
              {/* <span className="font-normal text-gray-400">technically</span> a */}
              <span className="inline-block bg-[#fab340] px-2 text-white">
                Full-stack Developer
              </span>
            </p>
          </div>
          <div className="mt-8 text-wrap text-xl">
            <p>
              The purpurse of this website is exclusivley to show up my
              knowladges and abilities. Since all the projects I worked before
              covered with NDA and you can really use the products without
              contacting the respective team first. So, please check, and
              contact me if you've got some sort of job for me.
            </p>
          </div>
        </div>
        <div className="centered h-full">
          <div className="w-[90%] overflow-hidden rounded-[43%_57%_63%_37%_/_37%_62%_38%_63%]">
            <img src="amigos.jpg" alt="amigos" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
