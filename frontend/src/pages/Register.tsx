import React from "react";
import Form from "../components/LoginRegisterForm";
const Register: React.FC = () => {
  return <Form route="/api/user/register/" method="register" />;
};

export default Register;
