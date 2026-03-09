import LangMenu from "../LangMenu";

const Header = () => {
  return (
    <header className="bg-card shadow-2xs">
      <div className="container">
        <div className="flex h-(--header-height) items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Logo</h1>
          </div>
          <div className="flex items-center gap-1.5">
            {/* <Button size={"lg"}>Get Started</Button> */}
            <LangMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
