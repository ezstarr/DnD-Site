import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(authOptions);
  // authOptions
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div>
      <h1>Member Server Sessionnn</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;