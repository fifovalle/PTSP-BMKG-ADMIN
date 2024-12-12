import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const firebaseCredentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    projectId: "ptsp-bmkg-4eee9",
  });
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
