import { searchContent } from "@/app/lib/api";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const { services, team } = await searchContent(query);

  return (
    <div className="min-h-screen bg-[#3c1f13] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-brown-800 mb-6">
          Search results for: "<span className="italic">{query}</span>"
        </h1>

        {team.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-brown-700 mb-4">Team Members</h2>
            <ul className="space-y-3">
              {team.map(member => (
                <li key={member.id}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {member.name} <span className="text-sm text-gray-500">- {member.position}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {services.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-brown-700 mb-4">Services</h2>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {team.length === 0 && services.length === 0 && (
          <p className="text-gray-500 italic">No results found.</p>
        )}
      </div>
    </div>
  );
}
