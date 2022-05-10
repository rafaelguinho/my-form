import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import React, { useEffect, useRef } from "react";
import Input from "./Input";

interface User {
  email: string;
  password: string;
}

export const Login = () => {
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (formRef) {

      formRef.current?.setData({
        email: "rafael@gmail.com",
        password: "123456",
      });
    }
  }, [formRef]);

  const submit = (data: SubmitHandler<User>) => {
    console.log(data);
  };
  return (
    <Form ref={formRef} onSubmit={submit}>
      <Input
        type="text"
        placeholder="Teu e-mail"
        name="email"
        autoComplete="new-password"
      />
      <Input type="password" name="password" autoComplete="new-password" />

      <button type="submit">Login</button>
    </Form>
  );
};
