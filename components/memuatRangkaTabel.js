import React from "react";
import { Typography } from "@material-tailwind/react";

const MemuatRangkaTampilkanTabel = () => {
  return (
    <table className="w-full min-w-max bg-[#eff0f3] rounded-lg table-auto text-left animate-pulse">
      <thead>
        <tr className="text-center">
          <th className="p-4 pt-10">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-20 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-20 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-20 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-20 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="text-center">
          <td className="p-4 pt-2">
            <div className="flex items-center gap-3">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-10 w-10 rounded-full bg-gray-400"
              >
                &nbsp;
              </Typography>
              <div>
                <Typography
                  as="div"
                  variant="h1"
                  className=" mb-2 h-3 w-32 rounded-full bg-gray-400"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-32 rounded-full bg-gray-400"
                >
                  &nbsp;
                </Typography>
              </div>
            </div>
          </td>
          <td className="p-4 pt-2 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-2 h-3 w-32 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2 hidden lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 rounded-full bg-gray-400"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-5 w-5 bg-gray-400"
            >
              &nbsp;
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MemuatRangkaTampilkanTabel;
