import { getTeamMemberBySlug } from "@/app/lib/api";
import Image from "next/image";
import { Phone, Mail } from 'lucide-react';



export default async function TeamMemberPage({ params }) {
  const member = await getTeamMemberBySlug(params.slug);
  console.log("Member by slug:", member);
  
  if (!member) {
    return <p className="text-center py-10">Team member not found</p>;
  }

 return (
   <div className="flex justify-center items-center min-h-screen bg-[#4B2615] px-4">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
    <Image
      src={`http://localhost:1337${member.photo}`}
      alt={member.name}
      width={160}
      height={160}
      className="mx-auto mb-6 rounded-full shadow-md ring-4 ring-brown-500 object-cover"
    />
    <h1 className="text-2xl font-bold text-[#4B2615]">{member.name}</h1>
    <p className="text-gray-500 mb-4">{member.position}</p>
    
    <div className="flex items-center justify-center gap-2 mb-2 text-brown-700">
      <Phone className="w-5 h-5" />
      <span>{member.phone}</span>
    </div>
    
    <div className="flex items-center justify-center gap-2 text-brown-700">
      <Mail className="w-5 h-5" />
      <span>{member.email}</span>
    </div>
  </div>
</div>

  );
}
