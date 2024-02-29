import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 ">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <a className="flex-none text-xl font-semibold">Info</a>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
            <Link href="/">
              <span className="font-medium text-gray-600">Home</span>
            </Link>
            <Link href="/records">
              <span className="font-medium text-gray-600">Records</span>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
