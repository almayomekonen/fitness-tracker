// object distructuring;

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";

export default function GoogleButtonLogin() {
  const { loginWithGoogle } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        console.log("GOOGLE RESPONSE", res);
        console.log("GOOGLE credential", res.credential);

        loginWithGoogle(res.credential);
      }}
      onError={() => {
        console.log("GOOGLE ERROR!!!!");
        alert("Login with google failed");
      }}
      size="large"
      width={300}
    />
  );
}
