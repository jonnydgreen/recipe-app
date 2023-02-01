export function TextField(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      type={'text'}
      name='answer'
      className='w-full flex-1 rounded-md border-2 border-blue-300 px-3 text-lg leading-loose'
      {...props}
      // aria-invalid={error?.title ? true : undefined}
      // aria-errormessage={error?.title ? 'title-error' : undefined}
    />
  );
}
