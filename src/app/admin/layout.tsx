import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Krishna Instrumentation",
  description: "Management portal for products, inquiries, datasheets and categories",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0E1726] text-slate-100 font-sans antialiased selection:bg-[#E76F00] selection:text-white overflow-x-hidden w-full max-w-full">
      {children}
    </div>
  );
}
