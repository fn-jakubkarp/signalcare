import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId);
	const patient = await getPatient(userId);

	if (patient) redirect(`/patients/${userId}/new-appointment`);

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
					<div className="flex items-center mb-12">
						<Image
							src="/assets/icons/logo-icon.svg"
							height={1000}
							width={1000}
							alt="Company logo image"
							className="h-10 w-fit mr-2"
						/>
						<span className="text-2xl font-bold">SignalCare</span>
					</div>

					<RegisterForm user={user} />

					<p className="copyright py-12">© 2024 SignalCare</p>
				</div>
			</section>

			<Image
				src="/assets/images/register-img.png"
				height={1000}
				width={1000}
				alt="patient"
				className="side-img max-w-[390px]"
			/>
		</div>
	);
};

export default Register;
