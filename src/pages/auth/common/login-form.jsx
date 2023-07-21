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
import Select from "react-select";
import axios from 'axios';

const schema = yup.object({
    email: yup.string().email().required("Email is Required"),
    password: yup.string().required("Password is Required"),
}).required();

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    useEffect(() => {
        axios.get('http://localhost:9005/api/v1/organizations')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching options:', error);
            });

        if (isAuth) {
            navigate("/dashboard");
        }
    }, [isAuth, navigate]);

    const onSubmit = (data) => {
        try {
            dispatch(handleLogin(data.email, data.password, selectedOption));
        } catch (error) {
            console.log(error);
        }
    };
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const organizations = options.map((option) => ({ value: option.id, label: option.name }));

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    }

    const [checked, setChecked] = useState(false);

    if (isAuth) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            {/* Các phần tử trong form */}
            <Textinput
                name="email"
                label="email"
                type="text"
                placeholder=""
                defaultValue=""
                register={register}
                error={errors.email}
                className="h-[48px]"
            />

            <Textinput
                name="password"
                label="password"
                type="password"
                placeholder=""
                register={register}
                error={errors.password}
                className="h-[48px]"
            />
            <div>
                <label htmlFor="options" className="form-label">
                    Fitness Center
                </label>
                <Select
                    name="organizationId"
                    className="react-select"
                    classNamePrefix="select"
                    options={organizations}
                    onChange={handleSelectChange}
                    value={selectedOption}
                    styles={styles}
                    id="options"
                />
            </div>
            {/* Các phần tử trong form */}
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