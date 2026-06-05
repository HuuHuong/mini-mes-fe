import { useEventCallback, useRedux } from "@common";
import { authActions } from "@redux/redux-action";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const { dispatch } = useRedux();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
  );

  const handleChangePassword = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
  );

  const onSubmit = useEventCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    dispatch(
      authActions.login({
        body: {
          email: email,
          password: password,
        },
        onSuccess: (data) => {
          setLoading(false);
          navigate("/dashboard");
        },
        onError: (err) => {
          setLoading(false);
          console.error("Login error:", err);
        },
      }),
    );
  });

  return {
    loading,
    email,
    password,
    onSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};
