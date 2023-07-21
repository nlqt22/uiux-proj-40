import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushStaff } from "./store";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import FormGroup from "@/components/ui/FormGroup";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const AddStaff = () => {
    const { openStaffModal } = useSelector((state) => state.staffs);
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    const roleMappings = {
    3: "SALE_STAFF",
    4: "PT_STAFF",
    };

    const roles = options.map((option) => ({
    value: option.id,
    label: roleMappings[option.id],
    }));

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
        const staff = {
            fullName: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            dob: dob.toISOString().split("T")[0],
            identityCard: data.identity,
            role: selectedOption,
        };
        dispatch(pushStaff(staff));
        dispatch(toggleAddModal(false));
        reset();
    };
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    }
    const [selectedOption, setSelectedOption] = useState(null);
    
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
                                    // value={dob}
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
                    <Select
                        name="role"
                        className="react-select"
                        classNamePrefix="select"
                        options={roles}
                        onChange={handleSelectChange}
                        value={selectedOption}
                        styles={styles}
                        id="options"
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