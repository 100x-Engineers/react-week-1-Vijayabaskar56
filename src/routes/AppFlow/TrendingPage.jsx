import Search from "./componenets/Search";
import Trending from "./componenets/Trending";

const TrendingPage = () => {
  return (
    <>
      <div className="px-5 flex-col gap-3 pt-2.5">
        <div className="pb-4">
          <Search />
        </div>
        <section className="items-start justify-start w-w01 fiex-col bg-zinc-900 rounded-2xl">
          <div className="w-80 h-11 px-3.5 py-2.5 justify-start items-center gap-2.5 inline-flex">
            What’s happening
          </div>
          <Trending />
          <div className="w-80 text-sky-500 h-12 p-3.5 justify-start items-start inline-flex">
            Show more
          </div>
        </section>
      </div>
    </>
  );
};

export default TrendingPage;
