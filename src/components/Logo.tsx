import Image from "next/image";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <Image
        src="/Joy_Logo_Wide-MP.png"
        alt="Company Logo"
        width={180}
        height={60}
      />
    </div>
  );
}
