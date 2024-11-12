import { NextResponse } from "next/server";
import admin from "firebase-admin";
import path from "path";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const serviceAccount = path.resolve(process.cwd(), "services/akses.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
      { message: "Admin berhasil dihapussss!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
