import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushMember } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormGroup from "@/components/ui/FormGroup";





const AddMember = () => {
    const { openMemberModal } = useSelector((state) => state.members);
    const dispatch = useDispatch();
    const [dob, setStartDate] = useState(new Date());
    const { isAuth, user } = useSelector((state) => state.auth)

    const FormValidationSchema = yup
        .object({
            name: yup.string().required("Full name is required"),
            identity: yup.string().required("Identity card is required"),
            email: yup.string().required("Email is required"),
            password: yup.string().required("Password is required"),
            phone: yup.string().required("Phone is required"),
            dob: yup
                .date()
                .required("Date of birth is required"),
        })
        .required();

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {
        const member = {
            fullName: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            dob: data.dob.toISOString().split("T")[0],
            identityCard: data.identity,
        };
        dispatch(pushMember({page: 0, size: 5, requestBody: member, jwt: user.access_token}));
        dispatch(toggleAddModal(false));
        window.location.reload();
        reset();
    };

    return (
        <div>
            <Modal
                title="Add Member"
                labelclassName="btn-outline-dark"
                activeModal={openMemberModal}
                onClose={() => dispatch(toggleAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <Textinput
                        name="email"
                        label="Email"
                        placeholder=""
                        register={register}
                        error={errors.email}
                    />
                    <Textinput
                        name="password"
                        label="Password"
                        placeholder=""
                        register={register}
                        error={errors.password}
                    />
                    <Textinput
                        name="name"
                        label="Full Name"
                        placeholder=""
                        register={register}
                        error={errors.name}
                    />
                     <FormGroup
                        label="Date of Birth"
                        id="default-picker"
                        error={errors.dob}
                    >
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <Flatpickr
                                    className="form-control py-2"
                                    id="default-picker"
                                    placeholder=""
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d",
                                    }}
                                />
                            )}
                        />
                    </FormGroup>
                    <Textinput
                        name="identity"
                        label="Identity Card"
                        placeholder=""
                        register={register}
                        error={errors.identity}
                    />
                    <Textinput
                        name="phone"
                        label="Phone"
                        placeholder=""
                        register={register}
                        error={errors.phone}
                    />
          

                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark text-center">
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddMember;