import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import Dashboard from "../../dashboard";

const schema = yup.object({
    username: yup
        .string()
        .required("Username is Required")
        .test("is-phone-number", "Invalid phone number", (value) => {

        const phoneNumberRegex = /^\d{10}$/;
        return phoneNumberRegex.test(value);
      }),
    password: yup.string().required("Password is Required"),
    }).required()
;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });
  
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/dashboard");
        }
      }, [isAuth, navigate]);
  
    const onSubmit = (data) => {
        try { 
            dispatch(handleLogin(data.username, data.password));
        } catch(error) {
            console.log(error);
        }
    };

    const [checked, setChecked] = useState(false);

    if(isAuth) {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
                name="username"
                label="username"
                type="text"
                defaultValue="0948845856"
                register={register}
                error={errors.username}
                className="h-[48px]"
            />

            <Textinput
                name="password"
                label="password"
                type="password"
                register={register}
                error={errors.password}
                className="h-[48px]"
            />

            <div className="flex justify-between">
            <Checkbox
                value={checked}
                onChange={() => setChecked(!checked)}
                label="Keep me signed in"
            />
            <Link
                to="/forgot-password"
                className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
            >
                Forgot Password?{" "}
            </Link>
        </div>
        <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
