import LoginForm from "@/app/components/Login/LoginForm";
import NoLogin from "@/app/components/Login/NoLogin";
import SignupLink from "@/app/components/Login/SignupLink";
import Welcom from "@/app/components/Login/Welcom";

const Login = () => {
  return (
    <div>
      <Welcom />
      <LoginForm />
      <NoLogin />
      <SignupLink />
    </div>
  );
};

export default Login;
