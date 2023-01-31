export function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className='shadow sm:overflow-hidden sm:rounded-md'>
      <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>{children}</div>
    </div>
  );
}
