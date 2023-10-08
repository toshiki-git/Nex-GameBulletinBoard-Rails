"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [isPassVisible, setIsPassVisible] = React.useState(false);
  const [isPassConfVisible, setIsPassConfVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConf, setPasswordConf] = React.useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
  const togglePassConfVisibility = () =>
    setIsPassConfVisible(!isPassConfVisible);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Card>
        <CardHeader>
          <h1>新規登録</h1>
        </CardHeader>
        <CardBody>
          <div>
            <Input
              label="User Name"
              variant="bordered"
              placeholder="Enter your user name"
              className="max-w-xs mb-4"
              value={userName}
              onValueChange={setUserName}
            />
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
                  onClick={togglePassVisibility}
                >
                  {isPassVisible ? (
                    <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isPassVisible ? "text" : "password"}
              className="max-w-xs mb-4"
            />
            <Input
              label="Password Confirmation"
              variant="bordered"
              placeholder="Enter your password again"
              value={passwordConf}
              onValueChange={setPasswordConf}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePassConfVisibility}
                >
                  {isPassConfVisible ? (
                    <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isPassConfVisible ? "text" : "password"}
              className="max-w-xs mb-4"
            />
            <div className="flex justify-center">
              <Button onClick={handleSubmit} color="primary">
                Register
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
