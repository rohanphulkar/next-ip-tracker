export const fetchExcelData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`);
  const data = await response.json();
  return data;
};

const page = async () => {
  const excelData = (await fetchExcelData()) || [];
  return (
    <div className="px-4 mx-auto">
      <div className="border my-12">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Phone
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Issue
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        IP
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        City
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Country
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        State
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Timezone
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        ISP
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        ISP Organization
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Platform
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Browser
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        User Agent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {excelData?.data?.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800 ">
                          {entry.Name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Issue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.IP}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.City}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.State}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Timezone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.ISP}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.ISP_Organization}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Platform}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.Browser}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">
                          {entry.User_Agent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
