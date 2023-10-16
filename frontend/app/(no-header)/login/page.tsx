"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const Login = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    try {
      const reqBody = {
        email: email,
        password: password,
      };
      const res = await axios.post("/auth/login", reqBody);
      const data = res.data;
      console.log(data);
      router.push("/home");
    } catch (err: any) {
      if (err.response) {
        const serverError =
          err.response.data?.error ||
          `HTTP error! Status: ${err.response.status}`;
        console.error(serverError);
        alert(serverError);
      } else {
        console.error(err.message || "An unknown error occurred.");
        alert(err.message);
      }
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <h1>ログイン</h1>
        </CardHeader>
        <CardBody>
          <div>
            <Input
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              className="max-w-xs mb-4"
              value={email}
              onValueChange={setEmail}
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs mb-4"
            />
            <div className="flex justify-center">
              <Button onClick={handleSubmit} color="primary">
                Login
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
