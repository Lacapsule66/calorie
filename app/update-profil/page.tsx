import { auth } from "../(auth)/auth";
import FirstConnection from "../features/FirstConnection";

export default async function page() {
  const session = await auth();
  return <FirstConnection session={session} />;
}
