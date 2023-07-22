import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { editMember, closeEditModal } from "./store";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";


const FormValidationSchema = yup
  .object({
    fullname: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    identity: yup.string().required("Identity Card is required"),
    dob: yup.string().required("Date of birth is required")

  })
  .required();




const EditMember = () => {
  const { editModal, editItem } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth)
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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    const member = {
      fullName: data.fullname,
      phone : data.phone,
      identityCard : data.identity,
      dob: data.dob,
    }
    dispatch(
      editMember({page: 0, size: 5, requestBody: member, jwt: user.access_token, id:editItem.id})
    );
    dispatch(closeEditModal(false));
    toast.info("Edit Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <Modal
      title="Edit Member"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={`fromGroup  ${errors.fullname ? "has-error" : ""}`}>
          <div className=" relative">
            <label htmlFor="default-picker" className=" form-label">
                Full name
            </label>
            <input
              type="text"
              defaultValue={editItem.fullName}
              {...register("fullname")}
              className="form-control py-2"
            />
            {errors.fullname && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.fullname && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.fullname?.message}
            </div>
          )}
        </div>
        <div className={`fromGroup  ${errors.phone ? "has-error" : ""}`}>
          <div className=" relative">
            <label htmlFor="default-picker" className=" form-label">
                Phone Number
            </label>
            <input
              type="text"
              defaultValue={editItem.phone}
              {...register("phone")}
              className="form-control py-2"
            />
            {errors.phone && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.phone && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.phone?.message}
            </div>
          )}
        </div>
        <div className={`fromGroup  ${errors.identity ? "has-error" : ""}`}>
          <div className=" relative">
            <label htmlFor="default-picker" className=" form-label">
                Identity Card
            </label>
            <input
              type="text"
              defaultValue={editItem.identityCard}
              {...register("identity")}
              className="form-control py-2"
            />
            {errors.identity && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.identity && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.identity?.message}
            </div>
          )}
        </div>
        <div className={`fromGroup  ${errors.dob ? "has-error" : ""}`}>
          <div className=" relative">
            <label htmlFor="default-picker" className=" form-label">
                DOB
            </label>
            <input
              type="text"
              defaultValue={editItem.dob}
              {...register("dob")}
              className="form-control py-2"
            />
            {errors.dob && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.dob && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.dob?.message}
            </div>
          )}
        </div>

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMember;
