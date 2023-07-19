import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushRoom } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormGroup from "@/components/ui/FormGroup";

const styles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, color: "#626262", paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};



const AddRoom = () => {
    const { openRoomModal } = useSelector((state) => state.rooms);
    const dispatch = useDispatch();
    const [dob, setStartDate] = useState(new Date());


    const FormValidationSchema = yup
        .object({
            name: yup.string().required("Full name is required"),
            identity: yup.string().required("Identity card is required"),
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
        const room = {
            fullName: data.name,
            phone: data.phone,
            dob: dob.toISOString().split("T")[0],
            identityCard: data.identity,
        };
        dispatch(pushRoom(room));
        dispatch(toggleAddModal(false));
        reset();
    };

    return (
        <div>
            <Modal
                title="Add Room"
                labelclassName="btn-outline-dark"
                activeModal={openRoomModal}
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

export default AddRoom;