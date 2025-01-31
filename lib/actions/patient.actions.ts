"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
	BUCKET_ID,
	DATABASE_ID,
	ENDPOINT,
	PATIENT_COLLECTION_ID,
	PROJECT_ID,
	databases,
	storage,
	users
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newuser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);

		return parseStringify(newuser);
	} catch (error: any) {
		// Check existing user
		if (error && error?.code === 409) {
			const documents = await users.list([
				Query.equal("email", [user.email])
			]);

			return documents.users[0];
		}
		console.error("An error occurred while creating a new user:", error);
	}
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};


export const registerPatient = async ({
	identificationDocument,
	...patient
}: RegisterUserParams) => {
	try {
		let file;
		if (identificationDocument) {
			const inputFile = InputFile.fromBuffer(
				identificationDocument?.get("blobFile") as Blob,
				identificationDocument?.get("fileName") as string
			);

			file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
		}

		const newPatient = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				identificationDocumentId: file?.$id || null,
				identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
				...patient
			}
		);

		return parseStringify(newPatient);
	} catch (error) {
		console.error(error);
	}
};

export const getPatient = (userId: string) => {
	return null;
};
