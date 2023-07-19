import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushStaff } from "./store";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormGroup from "@/components/ui/FormGroup";



const AddStaff = () => {
    const { openStaffModal } = useSelector((state) => state.staffs);
    const dispatch = useDispatch();


    const FormValidationSchema = yup
        .object({
            name: yup.string().required("Full name is required"),
            phone: yup.string().required("Phone is required"),
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
        console.log("đ");
        const staff = {
            fullName: data.name,
            phone: data.phone,
        };
        dispatch(pushStaff(staff));
        dispatch(toggleAddModal(false));
        reset();
    };

    return (
        <div>
            <Modal
                title="Add Staff"
                labelclassName="btn-outline-dark"
                activeModal={openStaffModal}
                onClose={() => dispatch(toggleAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <Textinput
                        name="name"
                        label="Full Name"
                        placeholder=""
                        register={register}
                        error={errors.name}
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

export default AddStaff;