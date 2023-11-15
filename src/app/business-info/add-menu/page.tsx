import AddMenuForm from './add-menu-form';

export default function AddMenu({ id }: { id?: string | undefined }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-2xl rounded-md bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text p-10 text-transparent">
        <h1 className="text-center text-3xl font-bold">
          {' '}
          {id ? 'Update' : 'Create'} digital menu
        </h1>
        <AddMenuForm id={id} />
      </div>
    </div>
  );
}
