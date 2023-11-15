import AddBusinessForm from './add-business-form';

export default function AddBusiness() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-2xl rounded-md bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text p-10 text-transparent">
        <h1 className="text-center text-3xl font-bold">Create business</h1>
        <AddBusinessForm />
      </div>
    </div>
  );
}
