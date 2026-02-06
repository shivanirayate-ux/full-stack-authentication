// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// export default function Home() {
//   const pathname = usePathname();

//   const linkClass = (path) =>
//     `block px-4 py-2 rounded-lg ${
//       pathname === path
//         ? "bg-blue-600 text-white"
//         : "hover:bg-blue-600 text-slate-700"
//     }`;

//   return (
//     <div className="min-h-screen flex bg-slate-100">
      
//       {/* ================= Sidebar ================= */}
//       <aside className="w-64 bg-white shadow-md">
//         <div className="p-6 border-b">
//         <div className="flex justify-center mb-2 mr-22">
//                     <Image
//                       src="/images/logo%20(1).png"
//                       alt="Logo"
//                       width={150}
//                       height={80}
//                       className="object-cover rounded-lg"
//                     />
//                   </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           <Link href="/dashboard" className={linkClass("/dashboard")}>
//             Dashboard
//           </Link>
// {/* 
//           <Link href="/login" className={linkClass("/login")}>
//             Login
//           </Link> */}

//           <Link href="/register" className={linkClass("/register")}>
//             Register
//           </Link>

//           <Link href="/profile" className={linkClass("/profile")}>
//             Profile
//           </Link>
//         </nav>
//       </aside>

//       {/* ================= Main Section ================= */}
//       <div className="flex-1 flex flex-col">
        
//         {/* Navbar */}
//         <header className="h-16 bg-white shadow flex items-center justify-between px-6">
//           <h2 className="text-lg font-semibold capitalize text-slate-700">
//             {pathname.replace("/", "") || "Dashboard"}
//           </h2>

//           <div className="flex items-center gap-4">
//             <Link
//               href="/login"
//               className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm"
//             >
//               Login
//             </Link>

//             <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
//               👤
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="p-8">
//           <h1 className="text-2xl font-bold mb-2 text-slate-800">
//             Next.js JWT Authentication
//           </h1>
//           <p className="text-slate-600">
//             Use the sidebar to navigate between pages.
//           </p>
//         </main>
//       </div>
//     </div>
//   );
// }


import { redirect } from "next/navigation";

export default function Home() {
  redirect("/register");
}

