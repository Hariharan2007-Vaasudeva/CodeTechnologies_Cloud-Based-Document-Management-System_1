import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>DocuSphere</h1>

      <p>
        Cloud Document Management System
      </p>

      <Link href="/login">
        Login
      </Link>
    </div>
  );
}