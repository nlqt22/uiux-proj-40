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
import { v4 as uuidv4 } from "uuid";

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



const OptionComponent = ({ data, ...props }) => {

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const AddMember = () => {
  const { openMemberModal } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [dob, setStartDate] = useState(new Date());


  const FormValidationSchema = yup
    .object({
      title: yup.string().required("Title is required"),
      assign: yup.mixed().required("Assignee is required"),
      tags: yup.mixed().required("Tag is required"),
      dob: yup
        .date()
        .required("Date of birth is required")
        .max(new Date(), "Start date must be lower than today"),

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
    console.log("gg");
    const member = {
      id: uuidv4(),
      name: data.title,
      phone: data.phone,
      dob: dob.toISOString().split("T")[0],
      identity: data.identity,
    };
    dispatch(pushMember(member));
    dispatch(toggleAddModal(false));
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
            name="title"
            label="Member Full Name"
            placeholder="Member Full Name"
            register={register}
            error={errors.title}
          />
          <Textinput
            name="phone"
            label="Phone"
            placeholder="0123456789"
            register={register}
            error={errors.title}
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
                    placeholder="yyyy, dd M"
                    value={dob}
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
            placeholder="12345678909"
            register={register}
            error={errors.title}
          />
          
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMember;
