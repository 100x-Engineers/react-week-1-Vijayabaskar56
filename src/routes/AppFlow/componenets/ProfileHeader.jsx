import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { useUser } from "../../context/UserContext";
import { DatesToString, getCount } from "../../../utils/utils";

const ProfileHeader = () => {
  const { users, isLoadingUser } = useUser();
  console.log(users.profilePicUrl);
  console.log(DatesToString(users.createdAt));
  // const DatesToString = (date) => {
  //   const monthArray = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   let dateArr;
  //   if (date.length > 10) {
  //     const dateTrimmed = date.slice(0, 11);
  //     dateArr = dateTrimmed.split("-");
  //   } else {
  //     dateArr = date.split("-");
  //   }
  //   const month = monthArray[dateArr[1]];

  //   return `Joined ${month} ${dateArr[0]}`;
  // };

  // const getCount = (arr) => {
  //   if (arr.length > 1000) {
  //     return `${(arr.length / 1000).toFixed(1)}k`;
  //   } else {
  //     return arr.length;
  //   }
  // };

  return (
    <>
      {isLoadingUser ? (
        <Loader />
      ) : (
        <>
          <img
            src="../../public/images/image-17.png"
            alt="banner"
            className="flex-shrink-0 w-screen h-h02"
          />
          <header>
            <section className="inline-flex flex-col items-end justify-center w-full gap-2 ">
              <div className="flex items-center justify-between w-full px-3">
                <img
                  src={users.profilePicUrl}
                  alt="profileIcon"
                  className="w-12 h-12 border-2 border-solid rounded-full border-neutral1000"
                />
                <Link to="/editprofile">
                  <Button varient="outlineBlack" buttonsize="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </section>
            <section className="flex-col items-start gap-4 px-5 pt-0 pb-3 flex-end border-b-neutral-400">
              <div>
                <h1 className="text-xl font-bold text-neutral50">
                  {users.displayName}
                </h1>
                <p className="text-base font-normal text-neutral500 font-inter">
                  {users.username}
                </p>
              </div>{" "}
              {users.bio && (
                <p className="text-base font-normal w-96 text-stone-50 font-inter">
                  {users.bio}
                </p>
              )}
              <div className="inline-flex items-start justify-start h-5 gap-5 w-80">
                {users.website && (
                  <div className="flex items-center justify-start gap-1">
                    <img
                      src="../../public/images/link-icon.svg"
                      alt="link-icon"
                    />
                    <a href={users.website} className="text-base text-sky-500">
                      {users.website.replace("https://www.", "")}
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-start gap-1">
                  <img
                    src="../../public/images/calendar-sv.svg"
                    alt="link-icon"
                  />
                  <p className="text-base font-normal whitespace-nowrap text-neutral-500 font-inter">
                    {DatesToString(users.createdAt)}
                  </p>
                </div>
              </div>
              <div className="inline-flex items-end justify-start w-56 h-5 gap-5">
                <div>
                  <span className="text-neutral50">
                    {users.followerCount ? getCount(users.followerCount) : 0}
                  </span>
                  <span> </span>
                  <span className="text-base font-normal text-neutral-500 font-inter">
                    Followers
                  </span>
                </div>
                <div>
                  <span className="text-neutral50">
                    {users.followingCount ? getCount(users.followingCount) : 0}
                  </span>
                  <span> </span>
                  <span className="text-base font-normal text-neutral-500 font-inter">
                    Following
                  </span>
                </div>
              </div>
            </section>
          </header>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
