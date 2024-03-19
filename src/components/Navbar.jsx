const Navbar = () => {
  return (
    <nav className=" py-5 flex gap-12 justify-between bg-[rgba(166,139,204,0.5)]">
      <div className="font-bold mx-5">
        <a href="/"> Password Manager</a>
      </div>
      <div>
        <ul>
          <li className="flex gap-5 font-medium mx-5">
            <a className="hover:font-bold" href="/">
              home
            </a>
            <a className="hover:font-bold" href="/about">
              About
            </a>
            <a className="hover:font-bold" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
