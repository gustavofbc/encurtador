import Link from "next/link";
import { Directus } from "@directus/sdk";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface UrlProps {
  id: string;
  url: string;
  status: string;
}

interface HomeProps {
  urls: UrlProps[];
}

export default function HomePage({ urls }: HomeProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:flex-col">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-4">Short link</th>
                <th className="px-6 py-4 hidden sm:table-cell">Destination URL</th>
                <th className="px-6 py-4 hidden sm:table-cell">Status</th>
                <th className="px-6 py-4 hidden sm:table-cell">Visitas</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    <Link href={`/url/${url.id}`} legacyBehavior>
                      <a className="hover:underline">{url.id ?? "-"}</a>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{url.url}</td>
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                    {url.status === "active" ? (
                      <CheckCircleIcon className="h-5 w-5 text-teal-400" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </td>
                  {/* to do: recuperar dados do google analytics */}
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const directusPublic = new Directus("https://floky.cmania.co/");
  const { data } = await directusPublic.items("urls").readByQuery({
    fields: ["id", "url", "status"],
  });

  return {
    props: {
      urls: data,
    },
  };
}