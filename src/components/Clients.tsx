import { ClientData } from '@/types';
import React, { FC } from 'react'

interface ClientsProps {
  
}

const Clients: FC<ClientsProps> = ({}) => {
    const [clientDatas, setClientDatas] = React.useState<
      ClientData[]
    >([]);
    const handleFileUpload = async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/portfolio`,
          {
            method: 'POST',
            body: formData, // Removed Content-Type header for formData to work properly
          }
        );

        if (response.ok) {
          const data = await response.json();
          setClientDatas(data);
        } else {
          throw new Error('Invalid file structure');
        }
      } catch (error: any) {
        console.error('Error uploading file:', error.message);
        alert('Error uploading file: ' + error.message);
      }
    };

    const handleInputChange = (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault(); // It's safe to always call preventDefault first to handle both drag and input changes uniformly.
      let files: FileList | null = null;

      if ('dataTransfer' in event && event.dataTransfer) {
        files = event.dataTransfer.files;
      } else {
        files = (event.target as HTMLInputElement).files;
      }

      if (files && files[0]) {
        handleFileUpload(files[0]);
      }
    };

    const handleDragOver = (
      event: React.DragEvent<HTMLDivElement>
    ) => {
      event.preventDefault(); // Necessary to allow the drop event
    };
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto p-3 py-10">
      <h1 className="text-3xl font-bold mb-3">
        Cargue su cartera de suscripciones
      </h1>
      <p className="mb-3 text-gray-500">
        Cargue su cartera de suscripciones de un año para descubrir el
        monto máximo de anticipo disponible para usted.
      </p>
      <div
        className="flex items-center justify-center w-full"
        onDragOver={handleDragOver}
        onDrop={handleInputChange}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleInputChange}
          />
        </label>
      </div>

      {clientDatas.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Client Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Total MRR
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Loan Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clientDatas.map((clientdata: ClientData) => (
                <tr className="bg-white border-b" key={clientdata.client_id}> 
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {clientdata.client_id}
                  </th>
                  <td className="px-6 py-4">
                    ${clientdata.total_mrr}
                  </td>
                  <td className="px-6 py-4">{clientdata.score}</td>
                  <td className="px-6 py-4">
                    {clientdata.decision === 'Approved' ? (
                      <span className="bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded">
                        {clientdata.decision}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded ">
                        {clientdata.decision}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Clients