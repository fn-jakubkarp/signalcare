"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "./CustomFormField";

import { Form } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";

const PatientForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
		console.log("onSubmit function called with values:", values);
		setIsLoading(true);

		try {
			console.log("Preparing user data");
			const userData = {
				name: values.name,
				email: values.email,
				phone: values.phone
			};

			console.log("Calling createUser with userData:", userData);
			const newUser = await createUser(userData);

			console.log("createUser response:", newUser);

			if (newUser) {
				console.log(
					"New user created successfully, preparing to redirect"
				);
				setTimeout(() => {
					console.log(
						"Attempting to redirect to:",
						`/patients/${newUser.$id}/register`
					);
					router.push(`/patients/${newUser.$id}/register`);
				}, 0);
			} else {
				console.log("createUser didn't return a user object");
			}
		} catch (error) {
			console.error("Error in onSubmit function:", error);
		} finally {
			console.log("Setting isLoading to false");
			setIsLoading(false);
		}
	};

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
