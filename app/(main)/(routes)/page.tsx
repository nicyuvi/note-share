import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <>
      <div>Protected route</div>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default Home;
