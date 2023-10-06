"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
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
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
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
              <Button color="primary">Login</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

//Login.getLayout = getLayout;

export default Login;
