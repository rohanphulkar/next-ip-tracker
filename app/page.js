"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const router = useRouter();

  function getDeviceType() {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
      setDeviceType("Android");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setDeviceType("iOS");
    } else if (/windows phone/i.test(userAgent)) {
      setDeviceType("Windows Phone");
    } else if (/windows/i.test(userAgent)) {
      setDeviceType("Windows");
    } else if (/macintosh|mac os x/i.test(userAgent)) {
      setDeviceType("Mac");
    } else if (/linux/i.test(userAgent)) {
      setDeviceType("Linux");
    } else {
      setDeviceType("");
    }
  }
  const getIp = async () => {
    try {
      const response = await axios.get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=baa6fc321104453db3aa6a8c5991dfc9"
      );
      const result = await response.data;
      const ip = result?.ip_address;
      const country = result?.country;
      const city = result?.city;

      const data = {
        ip: ip,
        country: country,
        city: city,
      };
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await getIp();
      var { name, email, phone, issue } = e.target;
      const response = await axios.post("/api/", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        ip: data?.ip,
        country: data?.country,
        city: data?.city,
        deviceType: deviceType,
        issue: issue.value,
      });
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        if (deviceType === "Android") {
          router.push("/android");
        } else if (deviceType === "iOS") {
          router.push("/ios");
        } else if (deviceType === "Windows Phone") {
          router.push("/windows-phone");
        } else if (deviceType === "Windows") {
          router.push("/windows");
        } else if (deviceType === "Mac") {
          router.push("/mac");
        } else if (deviceType === "Linux") {
          router.push("/linux");
        } else {
          alert("Unknown device");
        }
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    name.value = "";
    email.value = "";
    phone.value = "";
  };

  useEffect(() => {
    getDeviceType();
  }, []);

  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <img src="/logo.png" width={128} height={128} className="mx-auto" />
          </div>
          {/* Card */}
          <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="py-3 px-4 block border focus:outline-none w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="py-3 px-4 block border focus:outline-none w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block border focus:outline-none w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="issue"
                  className="block mb-2 text-sm font-medium"
                >
                  Issues
                </label>
                <textarea
                  type="email"
                  id="issue"
                  name="issue"
                  className="py-3 px-4 block border focus:outline-none w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your issues...."
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:bg-gray-500"
                >
                  <span>Submit</span>
                  {loading && (
                    <span
                      className={`w-4 h-4 animate-spin inline-block border-[2px] border-current border-t-transparent text-gray-100 rounded-full`}
                    ></span>
                  )}
                </button>
              </div>{" "}
              <p className="mt-4 text-sm text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                harum soluta consequuntur eius ea incidunt.
              </p>
            </form>
          </div>
          {/* End Card */}
        </div>
      </div>
    </div>
  );
};

export default Home;
