"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const LoginForm = () => {
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
      const response = await axios.post("/auth/login", reqBody);
      document.cookie = `user_token=${response.data.token}}`;
      router.push("/home");
    } catch {
      alert("Emailまたはパスワードに誤りがあるか、登録されていません。");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <div className="text-lg font-bold">ログイン</div>
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
              <Button
                onClick={handleSubmit}
                color="primary"
                radius="full"
                className="transition-transform duration-100 ease-in-out transform hover:scale-105"
              >
                ログイン
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
