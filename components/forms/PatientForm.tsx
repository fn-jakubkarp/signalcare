"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

import { UserFormValidation as formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
	INPUT = "input",
	CHECKBOX = "checkbox",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton"
}

const PatientForm = () => {
	const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: ""
		}
	});

	async function onSubmit({
		name,
		email,
		phone
	}: z.infer<typeof formSchema>) {
		setIsLoading(true);

		try {
			// const userData = { name, email, phone };

            // const user = await createUser(userData);

            // if (user) router.push(`/patients/${user.id}/register`);

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1"
			>
				<section className="mb-12 space-y-4">
					<h1 className="header">Hello! 👋</h1>
					<p className="text-dark-700">Schedule your appointment.</p>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name="name"
					label="Full name"
					placeholder="John Doe"
					iconSrc="/assets/icons/user.svg"
					iconAlt="User logo icon"
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name="email"
					label="Email"
					placeholder="johndoe@example.com"
					iconSrc="/assets/icons/email.svg"
					iconAlt="Email icon"
				/>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.PHONE_INPUT}
					name="phone"
					label="Phone number"
					placeholder="500-555-501"
				/>
				<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
			</form>
		</Form>
	);
};

export default PatientForm;
