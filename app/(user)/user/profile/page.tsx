import UserProfile from "../../feature/UserProfile";

export default function page() {
  return (
    <UserProfile
      user={{
        id: "",
        email: "",
        name: null,
        profile: null,
      }}
    />
  );
}
