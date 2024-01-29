import MaxWidthWrapper from "@/wrappers/MaxWidthWrapper";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-14 inset-x-0 t-0 z-30 w-full border-b border-primary bg-white/10 backdrop-blur-lg transition-all">
      <nav className="">
        <MaxWidthWrapper>
          <div className="h-14 flex items-center">
            <Link href={"/"} className="flex z-40 font-semmibold">
              <span>...tCalendar</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default Header;
