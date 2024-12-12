import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const serviceAccount = process.env.FIREBASE_CREDENTIALS
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS)
  : null;

if (!serviceAccount) {
  throw new Error(
    "Environment variable FIREBASE_CREDENTIALS is not defined or invalid."
  );
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: "ptsp-bmkg-4eee9",
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID tidak ditemukan!" },
        { status: 400 }
      );
    }

    await admin.auth().deleteUser(uid);

    const referensiAdmin = doc(database, "admin", uid);
    await deleteDoc(referensiAdmin);

    return NextResponse.json(
      { message: "Admin berhasil dihapus!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
