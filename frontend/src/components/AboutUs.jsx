import React from "react";

function AboutUs() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white min-h-screen p-10">
      <div className="container mx-auto max-w-4xl rounded-lg shadow-lg bg-white/90 backdrop-blur-sm p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">About Us</h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-lg text-black">
              Founded in <strong className="text-black">2024</strong>, our Chilean company thrives on a profound passion for board sports like skateboarding, wakeboarding, and surfing. We are committed to integrating this enthusiasm directly into our sustainable apparel line.
            </p>
            <p className="text-lg text-black">
              We aim to lead a revolution in the clothing industry with our commitment to sustainability, using recycled or organically sourced materials. We strive to protect the natural playgrounds that fuel our adventures and joy.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <img src="https://images.pexels.com/photos/3278939/pexels-photo-3278939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Our Mission" className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"/>
            <img src="https://images.pexels.com/photos/2387325/pexels-photo-2387325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sustainable Practices" className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;