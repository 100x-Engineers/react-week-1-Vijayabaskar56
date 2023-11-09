const Trending = ({ topicName, numberOfPosts }) => {
  return (
    <>
      <div className="w-80 h-20 px-3.5 py-2.5 justify-start items-start gap-3.5 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="self-stretch justify-center items-center gap-1.5 inline-flex">
            <div className="grow shrink basis-0 text-neutral-500 text-sm font-normal font-['Chirp']">
              Trending
            </div>
          </div>
          <div className="w-80 text-stone-50 text-base font-bold font-['Chirp']">
            {`#${topicName}`}
          </div>
          <div className="text-neutral-500 text-sm font-normal font-['Chirp']">
            {`${numberOfPosts} Posts`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
