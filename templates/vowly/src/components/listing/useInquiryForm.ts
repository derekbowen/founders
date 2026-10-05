import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useInbox } from "../../contexts/InboxContext";
import type { Vendor } from "../../types/marketplace";

export interface InquiryValues {
  partnerOne: string;
  partnerTwo: string;
  email: string;
  weddingDate: string;
  guestCount: string;
  budget: string;
  message: string;
}

type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

const TODAY = new Date().toISOString().slice(0, 10);

export function useInquiryForm(vendor: Vendor) {
  const { user } = useAuth();
  const { addInquiry } = useInbox();
  const navigate = useNavigate();
  const [values, setValues] = useState<InquiryValues>({
    partnerOne: user ? `${user.firstName} ${user.lastName}` : "",
    partnerTwo: "",
    email: user?.email ?? "",
    weddingDate: "",
    guestCount: "",
    budget: "",
    message: ""
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField =
  (key: keyof InquiryValues) =>
  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const dateConflict = Boolean(values.weddingDate && vendor.unavailableDates.includes(values.weddingDate));

  const validate = (): InquiryErrors => {
    const errs: InquiryErrors = {};
    if (!values.partnerOne.trim()) errs.partnerOne = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Enter a valid email so the vendor can reply.";
    if (!values.weddingDate) errs.weddingDate = "Choose your wedding date (an estimate is fine).";else
    if (values.weddingDate < TODAY) errs.weddingDate = "Wedding date must be in the future.";
    const guests = Number(values.guestCount);
    if (!values.guestCount || guests < 1 || guests > 2000) errs.guestCount = "Enter an estimated guest count.";
    if (!values.budget) errs.budget = "Select a budget range.";
    if (values.message.trim().length < 20) errs.message = "Tell the vendor a little more (at least 20 characters).";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const firstError = Object.keys(errs)[0];
    if (firstError) {
      document.getElementById(`inq-${firstError}`)?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const id = addInquiry({
        vendorId: vendor.id,
        partnerOne: values.partnerOne,
        partnerTwo: values.partnerTwo,
        email: values.email,
        weddingDate: values.weddingDate,
        guestCount: Number(values.guestCount),
        budget: values.budget,
        message: values.message
      });
      navigate(`/inquiry-sent/${id}`);
    }, 700);
  };

  return { values, errors, setField, handleSubmit, submitting, dateConflict, minDate: TODAY };
}