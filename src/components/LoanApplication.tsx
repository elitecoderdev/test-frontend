import { FC, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { PaymentTable } from '@/types';

interface LoanApplicationProps {}

const LoanApplication: FC<LoanApplicationProps> = ({}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(40000);
  const [clientId, setClientId] = useState('CLIENT001');
  const [dataTable, setDataTable] = useState<PaymentTable[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/apply-loan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            requested_amount: Number(amount),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDataTable(data.payment_table);
        setLoading(false);
        toast({
          title: 'Loan applied successfully',
          description: 'Check the repayment schedule table',
        });
      } else {
        setLoading(false);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `${data?.message}`,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
      console.error('Error:', error);
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Dialog onOpenChange={() => setDataTable([])}>
      <DialogTrigger asChild>
        <Button variant="default">Apply for loan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        {dataTable.length > 0 ? (
          <>
            <DialogHeader>
              <DialogTitle>Repayment Schedule</DialogTitle>
              <DialogDescription>
                Monthly Repayment Schedule of the loan
              </DialogDescription>
            </DialogHeader>
            <div className="relative overflow-auto shadow-md sm:rounded-lg mt-5 border w-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Month
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((data: PaymentTable) => (
                    <tr className="bg-white border-b" key={data.month}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {months[data.month - 1]}
                      </th>
                      <td className="px-6 py-4">
                        ${data.payment_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply for a loan</DialogTitle>
              <DialogDescription>
                Enter the amount you want to apply for and only enter
                only these client ids <b>CLIENT001</b> and{' '}
                <b>CLIENT002</b>
              </DialogDescription>
            </DialogHeader>
            <form className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Client ID
                </Label>
                <Input
                  id="client_id"
                  placeholder="Client ID"
                  defaultValue={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Requested Amount
                </Label>
                <Input
                  required
                  id="requested_amount"
                  placeholder="Requested Amount"
                  defaultValue={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                />
              </div>
            </form>
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="default"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Apply'}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanApplication;
