import { SignOutButton, useAuth } from "@clerk/nextjs";
import { Role } from "@packages/db";
import { ProtectedPage, requireAuth } from "~/utils/auth";

const Home: ProtectedPage = ({ user }) => {
  const { userId } = useAuth();
  //const test = api.example.getName.useQuery();

  return (
    <div>
      <h1>Home Page</h1>

      <p>clerk user id: {userId}</p>
      <p>userId: {user.email}</p>

      <SignOutButton />
    </div>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default Home;
