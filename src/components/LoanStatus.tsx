import { FC, useState } from 'react'
import { Button } from './ui/button';
import { LoanStatusData } from '@/types';

interface LoanStatusProps {
  
}

const LoanStatus: FC<LoanStatusProps> = ({}) => {
    const [status, setStatus] = useState<LoanStatusData>({
      client_id: '',
      status: '',
      details: '',});
    const [loading, setLoading] = useState(false);

    const fetchLoanStatus = async (id : string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/loan-status/${id}`
        );
        const data = await response.json();
        setStatus(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loan status:', error);
        setStatus({ client_id: '', status: '', details: '' });
        setLoading(false);
      }
    };

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-lg font-bold mb-4">Loan Status</h1>
      <div className="grid gap-2 sm:grid-cols-2 grid-cols-1">
        <Button onClick={() => fetchLoanStatus('CLIENT001')}>
          Get Loan Status for CLIENT001
        </Button>
        <Button onClick={() => fetchLoanStatus('CLIENT002')}>
          Get Loan Status for CLIENT002
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {status.client_id && (
            <div className='mt-4'>
              <p>Client ID: {status.client_id}</p>
              <p>Status: {status.status}</p>
              <p>Details: {status.details}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LoanStatus